import { UUIDV4, RgbColor } from '../types';
import { IIdentifiable } from '../interfaces/identifiable';
import { Circle } from './circle';
import { Point2D } from '../types';
import { uuidv4 } from '../util/util';
import { accent } from '../palette';
import { splitRgb } from '../math/color';
import { Settings } from '../settings';
import { copy } from '../math/vector2';

export interface ICelestialBody {
  id?: UUIDV4;
  position: Point2D;
  radius: number;
  mass: number;
}

export class CelestialBody extends Circle implements IIdentifiable, ICelestialBody {
  public id;
  public readonly color: RgbColor = splitRgb(accent);

  constructor(position: Point2D, radius: number, mass: number, id?: UUIDV4) {
    super(position, radius, mass * Settings.planetWeightScaling);
    this.id = id ?? uuidv4();
  }

  clone(): CelestialBody {
    return new CelestialBody(
      copy([0, 0], this.position),
      this.radius,
      this.mass,
      this.id,
    );
  }
}
