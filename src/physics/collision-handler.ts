import {
  copy,
  scale,
} from '../math/vector2';
import { State } from './../game/state';
import { Point2D, Seconds } from './../types';
import { hasCollision } from './collision/circle-collider';

export function handleCollisions(dt: Seconds, state: State): void {
  let check = [state.player, ...state.celestialBodies];
  for (let o1 of check) {
    for (let o2 of check) {
      if (o1 === o2) continue;

      if (hasCollision(o1, o2)) {
        copy(o1.position, o1.previousPosition);
        const pc: Point2D = [
          (o1.position[0] * o2.radius + o2.position[1] * o1.radius) / (o1.radius + o2.radius),
          (o1.position[1] * o2.radius + o2.position[1] * o1.radius) / (o1.radius + o2.radius),
        ];

        let collisiondist = Math.sqrt(
          Math.pow(o2.position[0] - pc[0], 2) +
          Math.pow(o2.position[1] - pc[1], 2),
        );

        let n_x = (o2.position[0] - pc[0]) / collisiondist;
        let n_y = (o2.position[1] - pc[1]) / collisiondist;
        let p =
          (2 * (o1.velocity![0] * n_x + o1.velocity![1] * n_y)) /
          (o1.mass + o2.mass);
        let w_x =
          o1.velocity![0] - p * o1.mass * n_x - p * o2.mass * n_x;
        let w_y =
          o1.velocity![1] - p * o1.mass * n_y - p * o2.mass * n_y;

        o1.velocity = scale(o1.velocity!, [w_x, w_y], o2.bounceDampening);
      }
    }
  }
}
