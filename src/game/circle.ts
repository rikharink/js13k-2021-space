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
}
