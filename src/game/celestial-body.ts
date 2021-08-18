import { UUIDV4, RgbColor } from '../types';
import { IIdentifiable } from '../interfaces/identifiable';
import { Circle } from './circle';
import { Point2D } from '../types';
import { uuidv4 } from '../util/util';
import { accent } from '../palette';
import { splitRgb } from '../math/color';
import { Settings } from '../settings';
import { copy, Vector2 } from '../math/vector2';

export interface ICelestialBody {
  id?: UUIDV4;
  position: Point2D;
  radius: number;
  mass: number;
  velocity?: Vector2;
  acceleration?: Vector2;
  bounceDampening?: number;
}

export class CelestialBody extends Circle implements IIdentifiable, ICelestialBody {
  public id;
  public readonly color: RgbColor = splitRgb(accent);

  constructor(position: Point2D, radius: number, mass: number, id?: UUIDV4, velocity?: Vector2, acceleration?: Vector2, bounceDampening?: number) {
    super(position, radius, mass * Settings.planetWeightScaling, velocity, acceleration, bounceDampening);
    this.id = id ?? uuidv4();
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
    );
    cb.attraction = this.attraction;
    return cb;
  }
}
