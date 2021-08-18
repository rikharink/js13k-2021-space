import { Settings } from './../settings';
import { ITickable } from './../interfaces/tickable';
import { PointerManager } from './../managers/pointer-manager';
import { Vector2, subtract, negate, copy, normalize, scale, distance, nearlyEqual } from './../math/vector2';
import { Point2D, RgbColor, UUIDV4 } from './../types';
import { Circle } from './circle';
import { palette } from '../palette';
import { splitRgb } from '../math/color';
import { clamp } from '../math/math';
import { uuidv4 } from '../util/util';

export class Player extends Circle implements ITickable<void> {
  public readonly color: RgbColor = splitRgb(palette[2]);
  public id: UUIDV4;
  public isInputting: boolean = false;
  public launches: number = 0;
  public totalLaunches: number = 0;
  public launchVector?: Vector2;
  public launchPower?: number;

  private _sc: number = 0;
  private _startPos?: Point2D;

  private _pm: PointerManager;

  constructor(pm: PointerManager, id?: UUIDV4) {
    super([10, 10], 5, Settings.playerMass, [0, 0], [0, 0]);
    this.id = id ?? uuidv4();
    this._pm = pm;
  }

  public tick(): void {
    this.handleInput();
    if (this.stationary) {
      this._sc++;
    }
    if (this._sc > 30) {
      this._sc = 0;
      this.launches = 0;
    }
  }

  public get stationary(): boolean {
    return nearlyEqual(this.position, this.previousPosition)
  }

  public get canLaunch(): boolean {
    return this.launches < 2;
  }

  private handleInput() {
    if (!this.canLaunch) {
      Settings.speedScale = 1;
      return;
    }
    const active = this._pm.hasInput();
    //START
    if (!this.isInputting && active) {
      this.launchVector = [0, 0];
      this._startPos = this._pm.position;
      if (this.launches >= 1) {
        Settings.speedScale = 0.1;
      }
    }
    //RELEASE
    else if (this.isInputting && !active) {
      scale(this.velocity!, this.launchVector!, Settings.launchForceMultiplier * this.launchPower!);
      this._startPos = undefined;
      this.launchVector = undefined;
      this.launchPower = undefined;
      this.launches++;
      this.totalLaunches++;
      Settings.speedScale = 1;
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
    player.id = this.id;
    player.attraction = this.attraction?.clone();;
    player.position = copy([0, 0], this.position)!;
    player.previousPosition = copy([0, 0], this.previousPosition)!;
    player.velocity = copy([0, 0], this.velocity!);
    player.acceleration = copy([0, 0], this.acceleration!);
    player.isInputting = this.isInputting;
    player.launchVector = copy([0, 0], this.launchVector);
    player.launchPower = this.launchPower;
    player.totalLaunches = this.totalLaunches;
    player.launches = this.launches;
    player._startPos = copy([0, 0], this._startPos)
    return player;
  }
}
