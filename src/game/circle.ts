import { hasCollision } from '../physics/collision/circle-collider';
import { Point2D } from './../types';
export class Circle {
  protected _center: Point2D;
  protected _radius: number;

  public constructor(center: Point2D, radius: number) {
    this._center = center;
    this._radius = radius;
  }

  public get center(): Point2D {
    return this._center;
  }

  public get radius(): number {
    return this._radius;
  }

  public collidesWith(other: Circle): boolean {
    return hasCollision(this, other);
  }

  public isInside(point: Point2D): boolean {
    const x = point[0] - this._center[0];
    const y = point[1] - this._center[1];
    return x * x + y * y < this._radius * this._radius;
  }
}
