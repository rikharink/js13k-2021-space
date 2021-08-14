import { UUIDV4, RgbColor } from './../types';
import { IIdentifiable } from './../interfaces/identifiable';
import { Circle } from './circle';
import { Point2D } from '../types';
import { uuidv4 } from '../util/util';
import { accent } from '../palette';
import { splitRgb } from '../math/color';

export class Planet extends Circle implements IIdentifiable {
  private readonly _id = uuidv4();
  public readonly color: RgbColor;

  constructor(center: Point2D, radius: number) {
    super(center, radius);
    this.color = splitRgb(accent);
  }

  public get id(): UUIDV4 {
    return this._id;
  }
}
