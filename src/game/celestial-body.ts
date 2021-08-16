import { UUIDV4, RgbColor } from '../types';
import { IIdentifiable } from '../interfaces/identifiable';
import { Circle } from './circle';
import { Point2D } from '../types';
import { uuidv4 } from '../util/util';
import { accent } from '../palette';
import { splitRgb } from '../math/color';
import { Settings } from '../settings';
import { copy } from '../math/vector2';

export class CelestialBody extends Circle implements IIdentifiable {
  public readonly id;
  public mass: number;
  public readonly color: RgbColor;

  constructor(center: Point2D, radius: number, mass: number, id?: UUIDV4) {
    super(center, radius);
    this.id = id ?? uuidv4();
    this.color = splitRgb(accent);
    this.mass = mass * Settings.planetWeightScaling;
  }

  clone(): CelestialBody {
    return new CelestialBody(copy([0, 0], this.position), this.radius, this.mass, this.id);
  }
}
