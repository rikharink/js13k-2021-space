import { UUIDV4, RgbColor } from '../types';
import { IIdentifiable } from '../interfaces/identifiable';
import { PhysicsCircle } from './physics-circle';
import { Point2D } from '../types';
import { uuidv4 } from '../util/util';
import { accent } from '../palette';
import { splitRgb } from '../math/color';
import { Settings } from '../settings';
import { copy, Vector2 } from '../math/vector2';
import { Radian } from '../math/math';
import { OrientedRectangle } from '../geometry/oriented-rectangle';

export interface ICelestialBody {
  id?: UUIDV4;
  position: Point2D;
  radius: number;
  mass: number;
  velocity?: Vector2;
  acceleration?: Vector2;
  bounceDampening?: number;
  goal?: Radian;
}

export class CelestialBody
  extends PhysicsCircle
  implements IIdentifiable, ICelestialBody
{
  public id: UUIDV4;
  public readonly color: RgbColor = splitRgb(accent);
  public goal?: Radian;

  constructor(
    position: Point2D,
    radius: number,
    mass: number,
    id?: UUIDV4,
    velocity?: Vector2,
    acceleration?: Vector2,
    bounceDampening?: number,
    goal?: Radian,
  ) {
    super(
      position,
      radius,
      mass * Settings.planetWeightScaling,
      velocity,
      acceleration,
      bounceDampening,
    );
    this.id = id ?? uuidv4();
    this.goal = goal;
  }

  public get mu(): number {
    return Settings.G * this.mass;
  }

  public orbitalVelocity(radius: number): number {
    return Math.sqrt(this.mu / radius);
  }

  public clone(): CelestialBody {
    let cb = new CelestialBody(
      copy([0, 0], this.position)!,
      this.radius,
      this.mass,
      this.id,
      this.velocity,
      this.acceleration,
      this.bounceDampening,
      this.goal,
    );
    cb.attraction = this.attraction;
    return cb;
  }
}
