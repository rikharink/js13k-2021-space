import { CelestialBody } from './../game/celestial-body';
import { PhysicsCircle } from './../game/physics-circle';
import { getGoalHitbox } from '../game/goal';
import { copy, distance, scale, subtract, Vector2 } from '../math/vector2';
import { State } from './../game/state';
import { Point2D } from './../types';
import {
  hasCircleCircleCollision,
  hasCircleOrientedRectangleCollision,
} from '../geometry/collision-checks';
import { OrientedRectangle } from '../geometry/oriented-rectangle';

export interface CollisionResult {
  hadCollision: boolean;
  hitGoal: boolean;
  hitStar: boolean;
}

export function handleCircleCircleCollision(
  o1: PhysicsCircle,
  o2: PhysicsCircle,
  isStar: boolean,
): boolean {
  if (o1 === o2) return false;
  if (!o1.velocity) return false;

  if (hasCircleCircleCollision(o1, o2)) {
    if (isStar) {
      return true;
    }
    let tmp: Vector2 = [0, 0];
    copy(o1.position, o1.previousPosition);
    const pc: Point2D = [
      (o1.position[0] * o2.radius + o2.position[1] * o1.radius) /
        (o1.radius + o2.radius),
      (o1.position[1] * o2.radius + o2.position[1] * o1.radius) /
        (o1.radius + o2.radius),
    ];

    let n: Vector2 = [0, 0];
    scale(n, subtract(tmp, o2.position, pc), 1 / distance(pc, o2.position));
    let p =
      (2 * (o1.velocity![0] * n[0] + o1.velocity![1] * n[1])) /
      (o1.mass + o2.mass);
    let w_x = o1.velocity![0] - p * o1.mass * n[0] - p * o2.mass * n[0];
    let w_y = o1.velocity![1] - p * o1.mass * n[1] - p * o2.mass * n[1];

    o1.velocity = scale(o1.velocity!, [w_x, w_y], o2.bounceDampening);
    return true;
  }
  return false;
}

export function handleCircleOrientedRectangleCollision(
  o1: PhysicsCircle,
  o2: OrientedRectangle,
): boolean {
  if (hasCircleOrientedRectangleCollision(o1, o2)) {
    o1.velocity = [0, 0];
    return true;
  }
  return false;
}

export function handleCollisions(state: State): CollisionResult {
  let hadCollision = false;
  let hitGoal = false;
  let hitStar = false;
  let o1 = state.player;
  let check = state.celestialBodies;
  for (let o2 of check) {
    if (handleCircleCircleCollision(o1, o2, o2.isStar)) {
      hadCollision = true;
      if (o2.isStar) {
        hitStar = true;
      }
    }
  }

  let goalBodies = state.celestialBodies.filter((cb) => cb.goal !== undefined);
  for (let gb of goalBodies) {
    hitGoal = handleCircleOrientedRectangleCollision(
      state.player,
      getGoalHitbox(gb),
    );
    if (hitGoal) {
      hadCollision = true;
    }
  }

  return {
    hadCollision,
    hitGoal,
    hitStar,
  };
}
