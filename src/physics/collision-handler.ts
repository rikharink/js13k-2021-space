import { getGoalHitbox } from '../game/goal';
import { copy, distance, scale, subtract, Vector2 } from '../math/vector2';
import { State } from './../game/state';
import { Point2D, Seconds } from './../types';
import {
  hasCircleCircleCollision,
  hasCircleOrientedRectangleCollision,
} from './collision/collision-checks';

export interface CollisionResult {
  hadCollision: boolean;
  hitGoal: boolean;
}

export function handleCollisions(dt: Seconds, state: State): CollisionResult {
  let hadCollision = false;
  let isGoal = false;
  let tmp: Vector2 = [0, 0];
  let check = [state.player, ...state.celestialBodies];
  for (let o1 of check) {
    for (let o2 of check) {
      if (o1 === o2) continue;

      if (hasCircleCircleCollision(o1, o2)) {
        hadCollision = true;
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
      }
    }
  }
  let goalBodies = state.celestialBodies.filter((cb) => cb.goal !== undefined);
  for (let gb of goalBodies) {
    if (hasCircleOrientedRectangleCollision(state.player, getGoalHitbox(gb))) {
      hadCollision = isGoal = true;
      state.player.velocity = [0, 0];
    }
  }

  return {
    hadCollision,
    hitGoal: isGoal,
  };
}
