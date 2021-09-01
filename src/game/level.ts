import { Rectangle } from './../geometry/rectangle';
import {
  add,
  distance,
  normalize,
  scale,
  subtract,
  Vector2,
} from '../math/vector2';
import { getRandom, getRandomAngle, getRandomInt } from '../math/random';
import { Point2D } from '../types';
import { ICelestialBody } from './celestial-body';
import { Random } from '../types';
import { Radian, TAU } from '../math/math';
import { Circle } from '../geometry/circle';
import { hasCircleCircleCollision } from '../geometry/collision-checks';
import { Settings } from '../settings';
import { uuidv4 } from '../util/util';

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
      if (d - o.radius < minDistance) {
        return true;
      }
    }
    return false;
  }

  let others = bodies.filter((cb) => cb.id !== body.id);
  return hasCollision(body, others) || isToClose(body, others);
}

function placeCelestialBody(
  rng: Random,
  body: ICelestialBody,
  bounds: Rectangle,
) {
  body.position = [
    getRandom(rng, bounds.position[0], bounds.size[0]),
    getRandom(rng, bounds.position[1], bounds.size[1]),
  ];
}

function createSpawnPlanet(
  rng: Random,
  level: number,
  previousGoalPlanet?: ICelestialBody,
): ICelestialBody {
  if (previousGoalPlanet !== undefined) {
    const body: ICelestialBody = {
      position: [previousGoalPlanet.radius * 2, previousGoalPlanet.position[1]],
      radius: previousGoalPlanet.radius,
      mass: previousGoalPlanet.mass,
      moons: [...previousGoalPlanet.moons],
    };
    return body;
  }
  const body = generateCelestialBody(rng, level);
  const offsetX = getRandom(rng, 0, body.radius);
  const offsetY = getRandom(rng, 0, body.radius);
  body.position = [body.radius * 2 + offsetX, body.radius * 2 + offsetY];
  return body;
}

function createGoalPlanet(
  rng: Random,
  level: number,
  size: Vector2,
): ICelestialBody {
  const planet = generateCelestialBody(rng, level);
  const baseBound = planet.radius + Settings.flagmastLength;
  planet.position = [
    getRandom(rng, size[0] - baseBound * 2, size[0] - baseBound),
    getRandom(rng, baseBound, size[1] - baseBound),
  ];
  return planet;
}

function placeCelestialBodies(
  rng: Random,
  size: Vector2,
  level: number,
  previousGoalPlanet?: ICelestialBody,
): ICelestialBody[] {
  const spawnPlanet = createSpawnPlanet(rng, level, previousGoalPlanet);
  const goalPlanet = createGoalPlanet(rng, level, size);
  let minX = spawnPlanet.position[0] + spawnPlanet.radius * 2;
  let otherPlanets: ICelestialBody[] = [];
  do {
    let planet: ICelestialBody;
    do {
      planet = generateCelestialBody(rng, level);
      const maxX = Math.min(
        minX + planet.radius * 4,
        goalPlanet.position[0] - goalPlanet.radius,
      );
      const bounds = new Rectangle(
        [minX, planet.radius * 2],
        [maxX, size[1] - planet.radius * 2],
      );
      placeCelestialBody(rng, planet, bounds);
    } while (
      isInvalidPlacement(planet, [spawnPlanet, ...otherPlanets, goalPlanet])
    );
    minX = planet.position[0] + planet.radius * 2;
    otherPlanets.push(planet);
  } while (minX < goalPlanet.position[0]);
  return [spawnPlanet, ...otherPlanets, goalPlanet];
}

function placeSpawn(
  rng: Random,
  bodies: ICelestialBody[],
  angle?: Radian,
): { spawnPlanet: ICelestialBody; spawnLocation: Vector2 } {
  const sp = bodies[0];
  const spc = new Circle(sp.position, sp.radius);
  let spawn: Vector2;
  const spawnAngle = angle ?? getRandomAngle(rng);
  spawn = spc.getPoint(spawnAngle);
  const normal = normalize([0, 0], subtract([0, 0], spawn, sp.position));
  add(spawn, spawn, scale([0, 0], normal, Settings.playerRadius));
  return { spawnPlanet: sp, spawnLocation: spawn };
}

function placeGoal(rng: Random, bodies: ICelestialBody[]): ICelestialBody {
  const gp = bodies[bodies.length - 1];
  const gpc = new Circle(gp.position, gp.radius);
  const goalTop: Vector2 = [0, 0];
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
  return gp;
}

export function generateLevel(
  rng: Random,
  level: number,
  previousGoalPlanet?: ICelestialBody,
): Level {
  const size = <Vector2>Settings.resolution;
  const bodies = placeCelestialBodies(rng, size, level, previousGoalPlanet);
  const { spawnPlanet, spawnLocation } = placeSpawn(
    rng,
    bodies,
    previousGoalPlanet?.goal,
  );
  const result: Level = {
    number: level,
    size: size,
    spawn: spawnLocation,
    bodies: bodies,
    spawnPlanet: spawnPlanet,
    goalPlanet: placeGoal(rng, bodies),
  };
  return result;
}
