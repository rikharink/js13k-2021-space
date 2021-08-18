import { Circle } from '../game/circle';
import { State } from '../game/state';
import {
  add,
  copy,
  distance_squared,
  normalize,
  scale,
  subtract,
  Vector2,
} from '../math/vector2';
import { Settings } from '../settings';
import { Milliseconds } from '../types';

export function getGravitationalForce(a: Circle, b: Circle): number {
  const ds = distance_squared(b.position, a.position);
  return ds !== 0 ? Settings.G * (b.mass / ds) : 0;
}

function updateAttractions(state: State): void {
  let mostAttractive: Circle | undefined = undefined;
  let c1: Circle;
  let c2: Circle;
  let checks = [state.player, ...state.celestialBodies];
  for (c1 of checks) {
    let maxF = Number.NEGATIVE_INFINITY;
    for (c2 of state.celestialBodies) {
      if (c1 === c2) continue;

      let f = getGravitationalForce(c1, c2);
      if (f >= maxF) {
        maxF = f;
        mostAttractive = c2;
      }
    }
    c1.attraction = mostAttractive;
  }
}

function semiImplicitEuler(c: Circle, dt: Milliseconds) {
  if (!c.attraction || !c.acceleration) return;

  const tmp: Vector2 = [0, 0];
  copy(c.previousPosition, c.position);
  scale(
    c.acceleration,
    normalize(
      tmp,
      subtract(tmp, c.attraction.position, c.position),
    ),
    getGravitationalForce(c, c.attraction),
  );
  if (!c.velocity) c.velocity = [0, 0];
  add(
    c.velocity,
    c.velocity,
    scale(tmp, c.acceleration, dt),
  );
  add(
    c.position,
    c.position,
    scale(tmp, c.velocity, dt),
  );
}

export function applyPhysics(dt: Milliseconds, state: State) {
  updateAttractions(state);
  let objects = [state.player, ...state.celestialBodies];
  for (let o of objects) {
    semiImplicitEuler(o, dt * Settings.speedScale);
  }
}


