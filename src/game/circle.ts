import { Vector2 } from '../math/vector2';
import { hasCollision } from '../physics/collision/circle-collider';
import { Point2D } from './../types';
export class Circle {
  public position: Point2D;
  public velocity: Vector2;
  public acceleration: Vector2;
  public radius: number;
  public mass: number;

  public constructor(center: Point2D, radius: number, mass: number = 0, velocity: Vector2 = [0, 0], acceleration: Vector2 = [0, 0]) {
    this.position = center;
    this.radius = radius;
    this.mass = mass;
    this.velocity = velocity;
    this.acceleration = acceleration;
  }

  public collidesWith(other: Circle): boolean {
    return hasCollision(this, other);
  }

  public isInside(point: Point2D): boolean {
    const x = point[0] - this.position[0];
    const y = point[1] - this.position[1];
    return x * x + y * y < this.radius * this.radius;
  }
}
