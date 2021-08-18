import { Settings } from './../settings';
import { ITickable } from './../interfaces/tickable';
import { PointerManager } from './../managers/pointer-manager';
import { Vector2, subtract, negate, copy, normalize, scale, distance } from './../math/vector2';
import { Point2D, RgbColor } from './../types';
import { Circle } from './circle';
import { palette } from '../palette';
import { splitRgb } from '../math/color';
import { clamp } from '../math/math';

export class Player extends Circle implements ITickable<void> {
  public readonly color: RgbColor = splitRgb(palette[2]);
  public readonly dampening: number = Settings.playerDampening;

  public isInputting: boolean = false;
  public previousPosition: Vector2;
  public launches: number = 0;

  public launchVector?: Vector2;
  public launchPower?: number;
  private _startPos?: Point2D;

  private _pm: PointerManager;

  constructor(pm: PointerManager) {
    super([10, 10], 5, Settings.playerMass);
    this.previousPosition = copy([0, 0], this.position);
    this._pm = pm;
  }

  public tick(): void {
    this.handleInput();
  }

  private handleInput() {
    const active = this._pm.hasInput();
    //START
    if (!this.isInputting && active) {
      this.launchVector = [0, 0];
      this._startPos = this._pm.position;
    }
    //RELEASE
    else if (this.isInputting && !active) {
      this.launches++;
      scale(this.velocity, this.launchVector!, Settings.launchForceMultiplier * this.launchPower!);
      this._startPos = undefined;
      this.launchVector = undefined;
      this.launchPower = undefined;
    }
    //MOVE
    else if (this._pm.position && this._startPos) {
      negate(
        this.launchVector!,
        normalize(this.launchVector!, subtract(this.launchVector!, this._pm.position, this._startPos))
      );
      this.launchPower = clamp(0, 100, distance(this._startPos, this._pm.position)) / 100;
    }
    this.isInputting = active;
  }

  clone(): Player {
    let player = new Player(this._pm);
    player.position = copy([0, 0], this.position);
    player.velocity = copy([0, 0], this.velocity);
    player.acceleration = copy([0, 0], this.acceleration);
    player.isInputting = this.isInputting;
    player.launchVector = this.launchVector ? copy([0, 0], this.launchVector) : undefined;
    player.launchPower = this.launchPower;
    player._startPos = this._startPos
      ? copy([0, 0], this._startPos)
      : undefined;
    return player;
  }
}
