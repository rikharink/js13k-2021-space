import { PointerManager } from './../managers/pointer-manager';
import {
  scale,
  add,
  Vector2,
  subtract,
  negate,
  normalize,
  distance_squared,
} from './../math/vector2';
import { Scene } from './scene';
import { ITickable } from './../interfaces/tickable';
import { Point2D, RgbColor, Seconds } from './../types';
import { Circle } from './circle';
import { palette } from '../palette';
import { splitRgb } from '../math/color';
import { Planet } from './planet';
import { clamp } from '../math/math';

export class Player extends Circle implements ITickable {
  public readonly color: RgbColor;
  private _scene!: Scene;
  private _attraction!: Planet;

  private _velocity: Vector2 = [0, 0];
  private _acceleration: Vector2 = [0, 0];

  private _launchVector: Vector2 = [0, 0];
  private _active: boolean = false;
  private _startPos?: Point2D;

  private _pm: PointerManager;

  constructor(pm: PointerManager) {
    super([10, 10], 5);
    this._pm = pm;
    this.color = splitRgb(palette[2]);
  }

  public set currentScene(scene: Scene) {
    this._scene = scene;
  }

  public get isActive(): boolean {
    return this._active;
  }

  public updateAttraction(): Planet {
    let mostAttractive: Planet | undefined = undefined;
    let maxF = Number.NEGATIVE_INFINITY;

    for (let planet of this._scene.planets) {
      let f = this.getForce(planet);
      if (f >= maxF) {
        maxF = f;
        mostAttractive = planet;
      }
    }
    return mostAttractive!;
  }

  public get attraction(): Planet {
    return this._attraction;
  }

  public tick(_t: Seconds, dt: Seconds): void {
    this.handleInput();
    this.physics(dt);
  }

  private handleInput() {
    const active = this._pm.isActive();
    //START
    if (!this._active && active) {
      this._startPos = this._pm.position;
    }
    //RELEASE
    else if (this._active && !active) {
      this._startPos = undefined;
      // this._velocity = this._forceVector;
    }
    //MOVE
    else if (this._pm.position && this._startPos) {
      negate(
        this._launchVector,
        normalize(
          this._launchVector,
          subtract(this._launchVector, this._pm.position, this._startPos),
        ),
      );
    }
    this._active = active;
  }

  private physics(dt: Seconds): void {
    this._attraction = this.updateAttraction();
    let tmp: Vector2 = [0, 0];
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

  private getForce(planet: Planet): number {
    const ds = distance_squared(planet.center, this.center);
    return ds !== 0 ? planet.mass / ds : 0;
  }

  private applyForces(): Vector2 {
    const gravity: Vector2 = [0, 0];
    const F = this.getForce(this._attraction);
    const direction = normalize(
      gravity,
      subtract(gravity, this._attraction.center, this.center),
    );
    return scale(gravity, direction, F);
  }
}
