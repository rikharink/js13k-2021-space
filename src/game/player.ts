import { Settings } from './../settings';
import { ITickable } from './../interfaces/tickable';
import { PointerManager } from './../managers/pointer-manager';
import { Vector2, subtract, negate, normalize, copy } from './../math/vector2';
import { Point2D, RgbColor } from './../types';
import { Circle } from './circle';
import { palette } from '../palette';
import { splitRgb } from '../math/color';

export class Player extends Circle implements ITickable<void> {
  public readonly color: RgbColor = splitRgb(palette[2]);

  public velocity: Vector2 = [0, 0];
  public acceleration: Vector2 = [0, 0];
  public isInputting: boolean = false;
  private _launchVector: Vector2 = [0, 0];
  private _startPos?: Point2D;

  private _pm: PointerManager;

  constructor(pm: PointerManager) {
    super([10, 10], 5, Settings.playerMass);
    this._pm = pm;
  }

  public tick(): void {
    this.handleInput();
  }

  private handleInput() {
    const active = this._pm.hasInput();
    //START
    if (!this.isInputting && active) {
      this._startPos = this._pm.position;
    }
    //RELEASE
    else if (this.isInputting && !active) {
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
    this.isInputting = active;
  }

  clone(): Player {
    let player = new Player(this._pm);
    player.position = copy([0, 0], this.position);
    player.velocity = copy([0, 0], this.velocity);
    player.acceleration = copy([0, 0], this.acceleration);
    player.isInputting = this.isInputting;
    player._launchVector = copy([0, 0], this._launchVector);
    player._startPos = this._startPos
      ? copy([0, 0], this._startPos)
      : undefined;
    return player;
  }
}
