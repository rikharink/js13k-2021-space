import { Vector2 } from "../math/vector2";
import { getRandom, getRandomInt } from "../math/random";
import { Point2D } from "../types";
import { ICelestialBody } from "./celestial-body";
import { Random } from "../types";
import { TAU } from "../math/math";
import { Circle } from "../geometry/circle";
import { Rectangle } from "../geometry/rectangle";
import { hasCircleCircleCollision, hasCircleRectangleCollision } from "../physics/collision/collision-checks";
export interface Level {
    size: Vector2;
    spawn: Point2D;
    bodies: ICelestialBody[];
}

function generateCelestialBody(rng: Random, level: number): ICelestialBody {
  let radius = getRandomInt(rng, 20, 100);
  let mass = radius;
  return {
    position: [0, 0],
    radius: radius,
    mass: mass,
    moons: [],
  }
}


function hasCollision(body: ICelestialBody, bodies: ICelestialBody[]): boolean{
  const c1 = new Circle(body.position, body.radius);
  for(let b of bodies){
    const c2 = new Circle(b.position, b.radius);
    if( hasCircleCircleCollision(c1, c2)){
      return true;
    }
  }
  return false;
}

function isOutOfBounds(body: ICelestialBody, bounds: Rectangle){
  const c1 = new Circle(body.position, body.radius);
  return hasCircleRectangleCollision(c1, bounds);
}

function placeCelestialBodies(rng: Random, size: Vector2, bodies: ICelestialBody[]): void {
  const bounds = new Rectangle([0,0], size);
  const minX = 0;
  const maxX = size[0];
  const minY = 0;
  const maxY = size[1];
  for(let body of bodies){
    do {
      body.position = [getRandom(rng, minX, maxX),  getRandom(rng, minY, maxY)];
    } while(hasCollision(body, bodies) || isOutOfBounds(body, bounds))
  }
}

function addMoons(rng: Random, bodies: ICelestialBody[], level: number): void {

}

function leftPlanet(bodies: ICelestialBody[]): ICelestialBody {
  let minX = Number.MAX_VALUE;
  let result: ICelestialBody;
  for(let b of bodies){
    if(b.position[0] < minX) {
      minX = b.position[0];
      result = b;
    }
  }
  return result!;
}

function rightPlanet(bodies: ICelestialBody[]): ICelestialBody {
  let maxX = Number.MIN_VALUE;
  let result: ICelestialBody;
  for(let b of bodies){
    if(b.position[0] > maxX) {
      maxX = b.position[0];
      result = b;
    }
  }
  return result!;
}

function getRandomAngle(rng: Random): number {
  return getRandom(rng, 0, TAU);
}

export function generateLevel(rng: Random, level: number, size: Vector2): Level {
  const nrPlanets = getRandomInt(rng, 2, 4);
  const bodies: ICelestialBody[] = [];
  for(let i = 0; i < nrPlanets; i++){
    bodies.push(generateCelestialBody(rng, level));
  }

  placeCelestialBodies(rng, size, bodies);
  addMoons(rng, bodies, level);
  
  const spawnPlanet = leftPlanet(bodies);
  const spawnAngle = getRandomAngle(rng);
  const spawn = new Circle(spawnPlanet.position, spawnPlanet.radius).getPoint(spawnAngle);
  const goal = rightPlanet(bodies);
  goal.goal = getRandomAngle(rng);

  return {
    size: size,
    spawn: spawn,
    bodies: bodies
  };
}
