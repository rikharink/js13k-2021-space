import {
  add,
  add_scalar,
  normalize,
  scale,
  subtract,
  Vector2,
} from '../math/vector2';
import { State } from './../game/state';
import { Point2D, Seconds } from './../types';

export function handleCollisions(dt: Seconds, state: State): void {
  if (state.player.collidesWith(state.attraction)) {
    console.debug('HIT');
    let x1 = state.player.position[0];
    let x2 = state.attraction.position[1];
    let y1 = state.player.position[1];
    let y2 = state.attraction.position[1];
    let r1 = state.player.radius;
    let r2 = state.attraction.radius;
    const pc: Point2D = [
      (x1 * r2 + x2 * r1) / (r1 + r2),
      (y1 * r2 + y2 * r1) / (r1 + r2),
    ];

    let circle1 = state.player;
    let circle2 = state.attraction;

    let collisiondist = Math.sqrt(
      Math.pow(circle2.position[0] - pc[0], 2) +
        Math.pow(circle2.position[1] - pc[1], 2),
    );
    let n_x = (circle2.position[0] - pc[0]) / collisiondist;
    let n_y = (circle2.position[1] - pc[1]) / collisiondist;
    let p =
      (2 * (circle1.velocity[0] * n_x + circle1.velocity[1] * n_y)) /
      (circle1.mass + circle2.mass);
    let w_x =
      circle1.velocity[0] - p * circle1.mass * n_x - p * circle2.mass * n_x;
    let w_y =
      circle1.velocity[1] - p * circle1.mass * n_y - p * circle2.mass * n_y;

    let normal: Vector2 = [0, 0];
    normalize(
      normal,
      subtract(normal, state.player.position, state.attraction.position),
    );
    scale(normal, normal, state.player.radius);
    add(circle1.position, circle1.position, normal);
    circle1.velocity = scale(circle1.velocity, [w_x, w_y], 1 /*dt*/);
  }
}
