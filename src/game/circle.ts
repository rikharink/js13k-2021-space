import { copy, Vector2 } from '../math/vector2';
import { hasCollision } from '../physics/collision/circle-collider';
import { Point2D } from './../types';
export class Circle {
  public position: Point2D;
  public previousPosition: Vector2 = [0, 0];
  public velocity?: Vector2;
  public acceleration?: Vector2;
  public radius: number;
  public mass: number;
  public bounceDampening: number;
  public attraction?: Circle;

  public constructor(center: Point2D, radius: number, mass: number = 0, velocity?: Vector2, acceleration?: Vector2, bounceDampening: number = 0.8) {
    this.position = center;
    copy(this.previousPosition, this.position);
    this.radius = radius;
    this.mass = mass;
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.bounceDampening = bounceDampening;
  }

  public collidesWith(other: Circle): boolean {
    return hasCollision(this, other);
  }

  public isInside(point: Point2D): boolean {
    const x = point[0] - this.position[0];
    const y = point[1] - this.position[1];
    return x * x + y * y < this.radius * this.radius;
  }

  public clone() {
    return new Circle(copy([0, 0], this.position)!, this.radius, this.mass, copy([0, 0], this.velocity), copy([0, 0], this.acceleration), this.bounceDampening);
  }
}
