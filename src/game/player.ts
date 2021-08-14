import { Scene } from './scene';
import { ITickable } from './../interfaces/tickable';
import { RgbColor, Seconds } from './../types';
import { Circle } from './circle';
import { palette } from '../palette';
import { splitRgb } from '../math/color';
import { Planet } from './planet';
import { distance } from '../math/vector2';

export class Player extends Circle implements ITickable {
  public readonly color: RgbColor;
  private _scene!: Scene;
  private _attraction!: Planet;

  constructor() {
    super([10, 10], 5);
    this.color = splitRgb(palette[2]);
  }

  public set currentScene(scene: Scene) {
    this._scene = scene;
  }

  public closestPlanet(): Planet {
    let closest: Planet | undefined = undefined;
    let minD = Number.POSITIVE_INFINITY;

    for (let planet of this._scene.planets) {
      let d = distance(planet.center, this._center);
      if (d < minD) {
        minD = d;
        closest = planet;
      }
    }
    return closest!;
  }

  public get attraction(): Planet {
    return this._attraction;
  }

  public tick(t?: Seconds, dt?: Seconds): void {
    this._attraction = this.closestPlanet();
  }
}
