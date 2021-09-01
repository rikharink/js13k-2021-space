import { Circle } from './../geometry/circle';
import { RgbColor } from '../types';
import { IIdentifiable } from '../interfaces/identifiable';
import { PhysicsCircle } from './physics-circle';
import { Point2D } from '../types';
import { accent } from '../palette';
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
import { uuidv4 } from '../util/util';

export interface ICelestialBody {
  id?: string;
  position: Point2D;
  radius: number;
  mass: number;
  velocity?: Vector2;
  acceleration?: Vector2;
  bounceDampening?: number;
  goal?: Radian;
  moons: string[];
}

export class CelestialBody
  extends PhysicsCircle
  implements IIdentifiable, ICelestialBody
{
  public id: string;
  public readonly color: RgbColor = splitRgb(accent);
  public goal?: Radian;
  public moons: string[];

  constructor(
    position: Point2D,
    radius: number,
    mass: number,
    id?: string,
    velocity?: Vector2,
    acceleration?: Vector2,
    bounceDampening?: number,
    goal?: Radian,
    moons?: string[],
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
    this.moons = moons ?? [];
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
    this.moons.push(cb.id);
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
    cb.moons = [...this.moons];
    return cb;
  }
}
