import { Rectangle } from './../geometry/rectangle';
import {
  add,
  distance,
  normalize,
  scale,
  subtract,
  Vector2,
} from '../math/vector2';
import { Random } from '../math/random';
import { Point2D } from '../types';
import { ICelestialBody } from './celestial-body';
import { lerp, Radian } from '../math/math';
import { Circle } from '../geometry/circle';
import { hasCircleCircleCollision } from '../geometry/collision-checks';
import { Settings } from '../settings';
import { uuidv4 } from '../util/util';

export interface Level {
  number: number;
  levelSeed: string;
  noStarGenerated: number;
  noMoonsGenerated: number;
  size: Vector2;
  spawn: Point2D;
  bodies: ICelestialBody[];
  spawnPlanet?: ICelestialBody;
  goalPlanet?: ICelestialBody;
}

function generateCelestialBody(rng: Random, level: number): ICelestialBody {
  let radius = rng.getRandomInt(20, 100);
  let mass = radius;
  return {
    id: uuidv4(rng),
    position: [0, 0],
    radius: radius,
    mass: mass,
    moons: new Set<string>(),
    isStar: false,
    isMoon: false,
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
    rng.getRandom(bounds.position[0], bounds.size[0]),
    rng.getRandom(bounds.position[1], bounds.size[1]),
  ];
}

function createSpawnPlanet(
  rng: Random,
  level: number,
  previousGoalPlanet?: ICelestialBody,
): ICelestialBody {
  if (previousGoalPlanet !== undefined) {
    const body: ICelestialBody = {
      id: uuidv4(rng),
      position: [previousGoalPlanet.radius * 2, previousGoalPlanet.position[1]],
      radius: previousGoalPlanet.radius,
      mass: previousGoalPlanet.mass,
      moons: new Set<string>(),
      isStar: false,
      isMoon: false,
    };
    return body;
  }
  const body = generateCelestialBody(rng, level);
  const offsetX = rng.getRandom(0, body.radius);
  const offsetY = rng.getRandom(0, body.radius);
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
    rng.getRandom(size[0] - baseBound * 2, size[0] - baseBound),
    rng.getRandom(baseBound, size[1] - baseBound),
  ];
  return planet;
}

function generateStar(rng: Random, size: Vector2): ICelestialBody {
  const radius = rng.getRandom(105, 175);
  const position = scale([0, 0], size, 0.5);
  const displacement: Vector2 = [
    rng.getRandom(0, radius),
    rng.getRandom(0, radius),
  ];
  add(position, position, displacement);
  let star: ICelestialBody = {
    id: uuidv4(rng),
    position: position,
    radius: radius,
    mass: radius,
    moons: new Set<string>(),
    isStar: true,
    isMoon: false,
  };

  return star;
}

function tryFixStar(
  star: ICelestialBody,
  protectedBodies: ICelestialBody[],
  otherBodies: ICelestialBody[],
): { success: boolean; others?: ICelestialBody[] } {
  const failure = {
    success: false,
  };
  if (isInvalidPlacement(star, protectedBodies)) {
    return failure;
  }
  let result: ICelestialBody[] = [];
  for (let body of otherBodies) {
    const isValid = !isInvalidPlacement(star, [body]);
    if (isValid) {
      result.push(body);
    }
  }

  if (result.length === 0) {
    return failure;
  }

  return {
    success: true,
    others: result,
  };
}

function generateMoon(
  rng: Random,
  level: number,
  planet: ICelestialBody,
): ICelestialBody {
  const moon = generateCelestialBody(rng, level);
  moon.radius = rng.getRandom(10, 25);
  moon.mass = moon.radius;
  moon.isMoon = true;
  const normal = normalize(
    [0, 0],
    subtract([0, 0], moon.position, planet.position),
  );
  scale(normal, normal, planet.radius);
  moon.position = normal;
  return moon;
}

function getMoonMinX(planet: ICelestialBody, moon: ICelestialBody): number {
  const dx = Math.abs(planet.position[0] - moon.position[0]);
  return planet.position[0] + dx + moon.radius * 2;
}

interface PlacementResults {
  bodies: ICelestialBody[];
  noStarGenerated: number;
  noMoonsGenerated: number;
}

function placeCelestialBodies(
  rng: Random,
  size: Vector2,
  level: number,
  noStarGenerated: number,
  noMoonsGenerated: number,
  previousGoalPlanet?: ICelestialBody,
): PlacementResults {
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

    // //SEE IF WE GENERATE MOONS
    // let moon: ICelestialBody | undefined;
    // if (
    //   rng.random() <
    //   lerp(
    //     lerp(0.05, 0.15, noMoonsGenerated / 20),
    //     0.15,
    //     Math.min(level, 50) / 50,
    //   )
    // ) {
    //   noMoonsGenerated = 0;
    //   console.debug('MAKING A MOON');
    //   moon = generateMoon(rng, level, planet);
    //   planet.moons = new Set([moon.id]);
    // } else {
    //   noMoonsGenerated = Math.min(20, ++noMoonsGenerated);
    // }
    // if (moon) {
    //   minX = getMoonMinX(planet, moon);
    //   otherPlanets.push(planet, moon);
    // } else {
    //   minX = planet.position[0] + planet.radius * 2;
    //   otherPlanets.push(planet);
    // }
    minX = planet.position[0] + planet.radius * 2;
    otherPlanets.push(planet);
  } while (minX < goalPlanet.position[0]);

  //SEE IF WE GENERATE A STAR
  if (
    rng.random() <
    lerp(lerp(0.1, 0.5, noStarGenerated / 10), 0.5, Math.min(level, 100) / 100)
  ) {
    noStarGenerated = 0;
    let star = generateStar(rng, size);
    let result = tryFixStar(star, [spawnPlanet, goalPlanet], otherPlanets);
    if (result.success) {
      return {
        noMoonsGenerated: noMoonsGenerated,
        noStarGenerated: noStarGenerated,
        bodies: [spawnPlanet, ...result.others!, star, goalPlanet],
      };
    }
  }
  noStarGenerated = Math.min(10, ++noStarGenerated);
  return {
    noMoonsGenerated: noMoonsGenerated,
    noStarGenerated: noStarGenerated,
    bodies: [spawnPlanet, ...otherPlanets, goalPlanet],
  };
}

function placeSpawn(
  rng: Random,
  bodies: ICelestialBody[],
  angle?: Radian,
): { spawnPlanet: ICelestialBody; spawnLocation: Vector2 } {
  const sp = bodies[0];
  const spc = new Circle(sp.position, sp.radius);
  let spawn: Vector2;
  const spawnAngle = angle ?? rng.getRandomAngle();
  spawn = spc.getPoint(spawnAngle);
  const normal = normalize([0, 0], subtract([0, 0], spawn, sp.position));
  add(spawn, spawn, scale([0, 0], normal, Settings.playerRadius));
  return { spawnPlanet: sp, spawnLocation: spawn };
}

function placeGoal(rng: Random, bodies: ICelestialBody[]): ICelestialBody {
  const gp = bodies[bodies.length - 1];
  const gpc = new Circle(gp.position, gp.radius);
  const goalTop: Vector2 = [0, 0];
  gp.goal = rng.getRandomAngle();
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
  noStarGenerated: number,
  noMoonsGenerated: number,
  previousGoalPlanet?: ICelestialBody,
): Level {
  let levelSeed = `${Settings.seed}-${level}`;
  rng.reseed(levelSeed);
  const size = <Vector2>Settings.resolution;
  const {
    noStarGenerated: nsg,
    noMoonsGenerated: nmg,
    bodies,
  } = placeCelestialBodies(
    rng,
    size,
    level,
    noStarGenerated,
    noMoonsGenerated,
    previousGoalPlanet,
  );
  const { spawnPlanet, spawnLocation } = placeSpawn(
    rng,
    bodies,
    previousGoalPlanet?.goal,
  );
  const result: Level = {
    number: level,
    levelSeed: levelSeed,
    noStarGenerated: nsg,
    noMoonsGenerated: nmg,
    size: size,
    spawn: spawnLocation,
    bodies: bodies,
    spawnPlanet: spawnPlanet,
    goalPlanet: placeGoal(rng, bodies),
  };
  return result;
}
