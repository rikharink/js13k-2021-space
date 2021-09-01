import {
  add,
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
import { hasCircleCircleCollision } from '../physics/collision/collision-checks';
import { Settings } from '../settings';
import { uuidv4 } from '../util/util';

export interface Level {
  number: number;
  size: Vector2;
  spawn: Point2D;
  bodies: ICelestialBody[];
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

function hasCollision(body: ICelestialBody, others: ICelestialBody[]): boolean {
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

function isInvalidPlacement(
  body: ICelestialBody,
  bodies: ICelestialBody[],
): boolean {
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

function leftPlanet(bodies: ICelestialBody[]): ICelestialBody {
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

function rightPlanet(bodies: ICelestialBody[]): ICelestialBody {
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

function placeSpawn(bodies: ICelestialBody[], rng: Random) {
  const spawnPlanet = leftPlanet(bodies);
  const spawnAngle = getRandomAngle(rng);
  const spawn = new Circle(spawnPlanet.position, spawnPlanet.radius).getPoint(
    spawnAngle,
  );
  const normal = normalize(
    [0, 0],
    subtract([0, 0], spawn, spawnPlanet.position),
  );
  add(spawn, spawn, scale([0, 0], normal, Settings.playerRadius));
  return spawn;
}

function placeGoal(bodies: ICelestialBody[], rng: Random) {
  const goal = rightPlanet(bodies);
  goal.goal = getRandomAngle(rng);
}

export function generateLevel(
  rng: Random,
  level: number,
  size: Vector2,
): Level {
  const bodies = placeCelestialBodies(rng, size, level);
  addMoons(rng, bodies, level);
  placeGoal(bodies, rng);
  return {
    number: level,
    size: size,
    spawn: placeSpawn(bodies, rng),
    bodies: bodies,
  };
}
