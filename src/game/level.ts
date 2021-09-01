import { Rectangle } from './../geometry/rectangle';
import {
  add,
  copy,
  distance,
  normalize,
  scale,
  subtract,
  Vector2,
} from '../math/vector2';
import { getRandom, getRandomInt } from '../math/random';
import { Point2D } from '../types';
import { ICelestialBody } from './celestial-body';
import { Random } from '../types';
import { TAU } from '../math/math';
import { Circle } from '../geometry/circle';
import { hasCircleCircleCollision } from '../geometry/collision-checks';
import { Settings } from '../settings';
import { uuidv4 } from '../util/util';
import { Line } from '../geometry/line';
import { lineCircleIntersection } from '../geometry/line-intersection';
import { pointInRectangle } from '../geometry/point-containment';

export interface Level {
  number: number;
  size: Vector2;
  spawn: Point2D;
  bodies: ICelestialBody[];
  spawnPlanet?: ICelestialBody;
  goalPlanet?: ICelestialBody;
}

function generateCelestialBody(rng: Random, level: number): ICelestialBody {
  let radius = getRandomInt(rng, 20, 100);
  let mass = radius;
  return {
    id: uuidv4(rng),
    position: [0, 0],
    radius: radius,
    mass: mass,
    moons: [],
  };
}

function isInvalidPlacement(
  body: ICelestialBody,
  bodies: ICelestialBody[],
): boolean {
  function hasCollision(
    body: ICelestialBody,
    others: ICelestialBody[],
  ): boolean {
    const c1 = new Circle(body.position, body.radius);
    for (let o of others) {
      const c2 = new Circle(o.position, o.radius);
      if (hasCircleCircleCollision(c1, c2)) {
        return true;
      }
    }
    return false;
  }

  function isToClose(body: ICelestialBody, others: ICelestialBody[]): boolean {
    let minDistance = body.radius * 3;
    for (let o of others) {
      let d = distance(body.position, o.position);
      if (d < minDistance) {
        return true;
      }
    }
    return false;
  }

  let others = bodies.filter((cb) => cb.id !== body.id);
  return hasCollision(body, others) || isToClose(body, others);
}

function placeCelestialBody(rng: Random, size: Vector2, body: ICelestialBody) {
  const [maxX, maxY] = subtract([0, 0], size, [body.radius, body.radius]);
  body.position = [
    getRandom(rng, body.radius, maxX),
    getRandom(rng, body.radius, maxY),
  ];
}

function placeCelestialBodies(
  rng: Random,
  size: Vector2,
  level: number,
): ICelestialBody[] {
  const nrPlanets = getRandomInt(rng, 2, 4);
  const bodies: ICelestialBody[] = [];
  for (let i = 0; i < nrPlanets; i++) {
    bodies.push(generateCelestialBody(rng, level));
  }
  for (let body of bodies) {
    placeCelestialBody(rng, size, body);
  }
  let invalidPlacements = bodies.filter((cb) => isInvalidPlacement(cb, bodies));
  while (invalidPlacements.length > 0) {
    for (let invalid of invalidPlacements) {
      placeCelestialBody(rng, size, invalid);
    }
    invalidPlacements = bodies.filter((cb) => isInvalidPlacement(cb, bodies));
  }

  return bodies;
}

function addMoons(rng: Random, bodies: ICelestialBody[], level: number): void {}

export function spawnPlanet(bodies: ICelestialBody[]): ICelestialBody {
  let minX = Number.MAX_VALUE;
  let result: ICelestialBody;
  for (let b of bodies) {
    if (b.position[0] < minX) {
      minX = b.position[0];
      result = b;
    }
  }
  return result!;
}

export function goalPlanet(bodies: ICelestialBody[]): ICelestialBody {
  let maxX = Number.MIN_VALUE;
  let result: ICelestialBody;
  for (let b of bodies) {
    if (b.position[0] > maxX) {
      maxX = b.position[0];
      result = b;
    }
  }
  return result!;
}

function getRandomAngle(rng: Random): number {
  return getRandom(rng, 0, TAU);
}

function placeSpawn(
  rng: Random,
  bodies: ICelestialBody[],
  bounds: Rectangle,
): { spawnPlanet: ICelestialBody; spawnLocation: Vector2 } {
  const sp = spawnPlanet(bodies);
  const spc = new Circle(sp.position, sp.radius);
  let spawn: Vector2;
  do {
    const spawnAngle = getRandomAngle(rng);
    spawn = spc.getPoint(spawnAngle);
    const normal = normalize([0, 0], subtract([0, 0], spawn, sp.position));
    add(spawn, spawn, scale([0, 0], normal, Settings.playerRadius));
  } while (!pointInRectangle(spawn, bounds));
  return { spawnPlanet: sp, spawnLocation: spawn };
}

function placeGoal(
  rng: Random,
  bodies: ICelestialBody[],
  bounds: Rectangle,
): ICelestialBody {
  const gp = goalPlanet(bodies);
  const gpc = new Circle(gp.position, gp.radius);
  const goalTop: Vector2 = [0, 0];
  do {
    gp.goal = getRandomAngle(rng);
    const goal = gpc.getPoint(gp.goal!);
    add(
      goalTop,
      goal,
      scale(
        [0, 0],
        normalize([0, 0], subtract([0, 0], goal, gp.position)),
        Settings.flagmastLength,
      ),
    );
  } while (!pointInRectangle(goalTop, bounds));

  return gp;
}

function difficultyHeuristic(level: Level): number {
  const sp = spawnPlanet(level.bodies);
  const gp = goalPlanet(level.bodies);
  const gpc = new Circle(gp.position, gp.radius);
  const goal = gpc.getPoint(gp.goal!);
  add(
    goal,
    goal,
    scale(
      [0, 0],
      normalize([0, 0], subtract([0, 0], goal, gp.position)),
      Settings.flagmastLength,
    ),
  );
  const spawn = copy([0, 0], level.spawn)!;
  add(
    spawn,
    spawn,
    scale(
      [0, 0],
      normalize([0, 0], subtract([0, 0], spawn, sp.position)),
      Settings.playerRadius,
    ),
  );
  let line = new Line(spawn, goal);
  let collisions = level.bodies.filter((o) =>
    lineCircleIntersection(line, new Circle(o.position, o.radius)),
  ).length;
  return collisions / level.bodies.length;
}

export function generateLevel(
  rng: Random,
  level: number,
  size: Vector2,
): Level {
  const bounds = new Rectangle([0, 0], size);
  const bodies = placeCelestialBodies(rng, size, level);
  addMoons(rng, bodies, level);
  const { spawnPlanet, spawnLocation } = placeSpawn(rng, bodies, bounds);
  const goalPlanet = placeGoal(rng, bodies, bounds);
  const result: Level = {
    number: level,
    size: size,
    spawn: spawnLocation,
    bodies: bodies,
    spawnPlanet: spawnPlanet,
    goalPlanet: goalPlanet,
  };
  const difficulty = difficultyHeuristic(result);
  console.debug('Difficulty heuristic', difficulty);
  return result;
}
