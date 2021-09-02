import { PhysicsCircle } from '../game/physics-circle';
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
import { Milliseconds, Point2D } from '../types';
import { handleCircleCircleCollision } from './collision-handler';

export function getGravitationalForce(
  a: PhysicsCircle,
  b: PhysicsCircle,
): number {
  const ds = distance_squared(a.position, b.position);
  return ds !== 0 ? Settings.G * (b.mass / ds) : 0;
}

function updateAttractions(checks: PhysicsCircle[], state: State): void {
  let mostAttractive: PhysicsCircle | undefined = undefined;
  let c1: PhysicsCircle;
  let c2: PhysicsCircle;
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
    if (!c1.isFixedAttraction || c1.attraction === undefined) {
      c1.attraction = mostAttractive;
    }
  }
}

function semiImplicitEuler(c: PhysicsCircle, dt: Milliseconds) {
  if (!c.attraction || !c.acceleration) return;

  const tmp: Vector2 = [0, 0];
  copy(c.previousPosition, c.position);
  scale(
    c.acceleration,
    normalize(tmp, subtract(tmp, c.attraction.position, c.position)),
    getGravitationalForce(c, c.attraction),
  );
  if (!c.velocity) c.velocity = [0, 0];
  add(c.velocity, c.velocity, scale(tmp, c.acceleration, dt));
  add(c.position, c.position, scale(tmp, c.velocity, dt));
}

export function predictFuture(state: State, dt: Milliseconds): Point2D[] {
  if (!state.player.launchVector) return [];

  let p = state.player.clone();
  p.launch();
  let result: Point2D[] = [];
  for (let i = 0; i < Settings.futureSize; i++) {
    updateAttractions([p], state);
    semiImplicitEuler(p, dt);
    const collision = handleCircleCircleCollision(
      p,
      p.attraction!,
      p.attraction!.isDeadly,
    );
    if (collision && p.attraction!.isDeadly) {
      break;
    }
    result.push([p.position[0], p.position[1]]);
  }
  return result;
}

export function applyPhysics(dt: Milliseconds, state: State) {
  updateAttractions([state.player, ...state.celestialBodies], state);
  let objects = [state.player, ...state.celestialBodies];
  for (let o of objects) {
    semiImplicitEuler(o, dt * Settings.speedScale);
  }
}
