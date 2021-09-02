import { RgbColor } from '../types';
import { IIdentifiable } from '../interfaces/identifiable';
import { PhysicsCircle } from './physics-circle';
import { Point2D } from '../types';
import { accent, palette } from '../palette';
import { splitRgb } from '../math/color';
import { Settings } from '../settings';
import {
  copy,
  distance,
  normalize,
  perpendicular,
  scale,
  subtract,
  Vector2,
} from '../math/vector2';
import { Radian } from '../math/math';

export interface ICelestialBody {
  id: string;
  position: Point2D;
  radius: number;
  mass: number;
  velocity?: Vector2;
  acceleration?: Vector2;
  bounceDampening?: number;
  goal?: Radian;
  isStar: boolean;
  isMoon: boolean;
  moons: Set<string>;
}

export class CelestialBody
  extends PhysicsCircle
  implements IIdentifiable, ICelestialBody
{
  public id: string;
  public goal?: Radian;
  public isStar: boolean;
  public isMoon: boolean;
  public moons: Set<string>;

  constructor(
    position: Point2D,
    radius: number,
    mass: number,
    id: string,
    velocity?: Vector2,
    acceleration?: Vector2,
    bounceDampening?: number,
    goal?: Radian,
    moons?: Set<string>,
    isStar?: boolean,
    isMoon?: boolean,
  ) {
    super(
      position,
      radius,
      mass * Settings.planetWeightScaling,
      velocity,
      acceleration,
      bounceDampening,
      isStar,
      isMoon,
    );
    this.id = id;
    this.goal = goal;
    this.moons = moons ?? new Set();
    this.isStar = isStar ?? false;
    this.isMoon = isMoon ?? false;
  }

  public get color(): RgbColor {
    if (this.isStar) {
      return splitRgb(palette[1]);
    } else if (this.isMoon) {
      return splitRgb(palette[4]);
    } else {
      return splitRgb(accent);
    }
  }

  public get mu(): number {
    return Settings.G * this.mass;
  }

  public addMoon(cb: CelestialBody, clockwise?: boolean): void {
    let tmp: Vector2 = [0, 0];
    const dir = normalize(tmp, subtract(tmp, this.position, cb.position));
    const perp = perpendicular(tmp, dir, clockwise ?? true);
    cb.acceleration = [0, 0];
    cb.velocity = [0, 0];
    copy(
      cb.velocity,
      scale(
        tmp,
        perp,
        Math.sqrt(this.mu / distance(cb.position, this.position)),
      ),
    );
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
      Object.entries(this.moons).length === 0
        ? new Set()
        : new Set([...this.moons]),
      this.isStar,
    );
    cb.attraction = this.attraction;
    return cb;
  }
}
