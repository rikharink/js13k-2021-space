import { scale, add, Vector2, subtract, negate } from './../math/vector2';
import { Scene } from './scene';
import { ITickable } from './../interfaces/tickable';
import { Point2D, RgbColor, Seconds } from './../types';
import { Circle } from './circle';
import { palette } from '../palette';
import { splitRgb } from '../math/color';
import { Planet } from './planet';
import { distance } from '../math/vector2';
import { Game } from '../game';

export class Player extends Circle implements ITickable {
  public readonly color: RgbColor;
  private _scene!: Scene;
  private _attraction!: Planet;

  private _velocity: Vector2 = [0.0, 0.0];
  private _acceleration: Vector2 = [0.0, 0.0];

  private _active: boolean = false;
  private _startPos?: Point2D;
  private _forceVector: Vector2 = [0.0, 0.0];

  constructor() {
    super([10, 10], 5);
    this.color = splitRgb(palette[2]);
  }

  public set currentScene(scene: Scene) {
    this._scene = scene;
  }

  public get isActive(): boolean {
    return this._active;
  }

  public get forceVector(): Vector2 {
    return this._forceVector;
  }

  public updateAttraction(): Planet {
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

  public tick(_t: Seconds, dt: Seconds): void {
    this.physics(dt);
    const active = Game.pointerManager.isActive();
    //START TOUCH
    if (!this._active && active) {
      this._startPos = Game.pointerManager.position;
    }
    //RELEASE TOUCH
    else if (this._active && !active) {
      this._startPos = undefined;
      this._velocity = this._forceVector;
    }
    //MOVE TOUCH
    else if (Game.pointerManager.position && this._startPos) {
      let dydx: Vector2 = [0, 0];
      subtract(dydx, Game.pointerManager.position, this._startPos);
      negate(this._forceVector, dydx);
      add(this._forceVector, this.center, this._forceVector);
    }
    this._active = active;
  }

  private physics(dt: Seconds): void {
    let tmp: Vector2 = [0, 0];
    this._attraction = this.updateAttraction();
    const new_pos = add(
      tmp,
      this._center,
      add(
        tmp,
        scale(tmp, this._velocity, dt),
        scale(tmp, this._acceleration, dt * dt * 0.5),
      ),
    );
    const new_acc = this.applyForces();
    const new_vel = add(
      tmp,
      this._velocity,
      scale(tmp, add(tmp, this._acceleration, new_acc), dt * 0.5),
    );

    this._center = new_pos;
    this._acceleration = new_acc;
    this._velocity = new_vel;
  }

  private applyForces(): Vector2 {
    let result: Vector2 = [0, 0];
    subtract(result, this._attraction.center, this.center);
    return result;
  }
}
