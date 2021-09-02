import { RgbColor } from '../types';
import { IIdentifiable } from '../interfaces/identifiable';
import { PhysicsCircle } from './physics-circle';
import { Point2D } from '../types';
import { accent, palette } from '../palette';
import { splitRgb } from '../math/color';
import { Settings } from '../settings';
import {
  abs,
  copy,
  distance,
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
  velocity?: Vector2;
  acceleration?: Vector2;
  bounceDampening?: number;
  goal?: Radian;
  isStar: boolean;
  isMoon: boolean;
  moons: string[];
}

export class CelestialBody
  extends PhysicsCircle
  implements IIdentifiable, ICelestialBody
{
  public id: string;
  public goal?: Radian;
  public isStar: boolean;
  public isMoon: boolean;
  public moons: string[];

  constructor(
    position: Point2D,
    radius: number,
    id: string,
    velocity?: Vector2,
    acceleration?: Vector2,
    bounceDampening?: number,
    goal?: Radian,
    moons?: string[],
    isStar?: boolean,
    isMoon?: boolean,
  ) {
    super(
      position,
      radius,
      radius * radius * Math.PI * Settings.planetWeightScaling,
      velocity,
      acceleration,
      bounceDampening,
      isStar,
      isMoon,
    );
    this.id = id;
    this.goal = goal;
    this.moons = moons ?? [];
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

  public addMoon(cb: CelestialBody, clockwise?: boolean): void {
    let tmp: Vector2 = [0, 0];
    const perp: Vector2 = perpendicular(
      [0, 0],
      abs(tmp, subtract(tmp, cb.position, this.position)),
      clockwise,
    );
    cb.attraction = this;
    cb.acceleration = [0, 0];
    cb.velocity = [0, 0];
    copy(
      cb.velocity,
      scale(
        tmp,
        perp,
        Math.sqrt(
          (Settings.G * this.mass) / distance(cb.position, this.position),
        ),
      ),
    );
  }

  public clone(): CelestialBody {
    let cb = new CelestialBody(
      copy([0, 0], this.position)!,
      this.radius,
      this.id,
      this.velocity,
      this.acceleration,
      this.bounceDampening,
      this.goal,
      [...this.moons],
      this.isStar,
    );
    cb.attraction = this.attraction;
    return cb;
  }
}
