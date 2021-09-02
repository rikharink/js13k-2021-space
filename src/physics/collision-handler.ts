import { PhysicsCircle } from './../game/physics-circle';
import { getGoalHitbox } from '../game/goal';
import {
  copy,
  scale,
  subtract,
  Vector2,
  add,
  dot,
  normalize,
} from '../math/vector2';
import { State } from './../game/state';
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
    const d = normalize([0, 0], subtract(tmp, o1.position, o2.position));
    copy(
      o1.position,
      add([0, 0], o2.position, scale(tmp, d, o1.radius + o2.radius)),
    );

    const v = subtract([0, 0], o2.velocity ?? [0, 0], o1.velocity);
    const dotdv = dot(d, v);
    if (dotdv >= 0) {
      const tm = (o1.mass = o2.mass);
      const c = scale([0, 0], d, (2 * dotdv) / tm);
      copy(
        o1.velocity,
        scale(
          [0, 0],
          add(tmp, o1.velocity, scale(tmp, c, o2.mass)),
          o2.bounceDampening,
        ),
      );
    }
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
