import { copy, Vector2 } from '../math/vector2';
import { Point2D } from '../types';
import { Circle } from '../geometry/circle';

export class PhysicsCircle extends Circle {
  public previousPosition: Vector2 = [0, 0];
  public velocity?: Vector2;
  public acceleration?: Vector2;
  public mass: number;
  public bounceDampening: number;
  public attraction?: PhysicsCircle;

  public constructor(position: Point2D, radius: number, mass: number = 0, velocity?: Vector2, acceleration?: Vector2, bounceDampening?: number) {
    super(position, radius);
    copy(this.previousPosition, this.position);
    this.mass = mass;
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.bounceDampening = bounceDampening ?? 0.8;
  }

  public isInside(point: Point2D): boolean {
    const x = point[0] - this.position[0];
    const y = point[1] - this.position[1];
    return x * x + y * y < this.radius * this.radius;
  }

  public clone() {
    return new PhysicsCircle(copy([0, 0], this.position)!, this.radius, this.mass, copy([0, 0], this.velocity), copy([0, 0], this.acceleration), this.bounceDampening);
  }
}
