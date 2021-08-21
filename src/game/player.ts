import { Settings } from './../settings';
import { ITickable } from './../interfaces/tickable';
import { PointerManager } from './../managers/pointer-manager';
import {
  Vector2,
  subtract,
  negate,
  copy,
  normalize,
  scale,
  distance,
  nearlyEqual,
} from './../math/vector2';
import { Percentage, Point2D, RgbColor, UUIDV4 } from './../types';
import { PhysicsCircle } from './physics-circle';
import { palette } from '../palette';
import { splitRgb } from '../math/color';
import { clamp } from '../math/math';
import { uuidv4 } from '../util/util';
import { IStepable } from '../interfaces/stepable';

export class Player
  extends PhysicsCircle
  implements ITickable<void>, IStepable<void>
{
  public readonly color: RgbColor = splitRgb(palette[2]);
  public id: UUIDV4;
  public isInputting: boolean = false;
  public launches: number = 0;
  public totalLaunches: number = 0;
  public launchVector?: Vector2;
  public launchPower?: number;
  public maxLaunches: number = 2;
  public readonly maxSp: number = Settings.tps * 2;
  public sp: number = Settings.tps * 2;
  public hasSlowmotion = false;

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
  }

  public step(): void {
    if (this.stationary) {
      this._sc++;
    }
    if (this._sc > 30) {
      this._sc = 0;
      this.launches = 0;
    }

    if (this.hasSlowmotion) {
      if (this.sp <= 0) {
        this.hasSlowmotion = false;
        Settings.speedScale = 1;
      }
      this.sp--;
    } else {
      if (this.sp < this.maxSp) {
        this.sp += 0.1;
      }
    }
  }

  public get spp(): Percentage {
    return ~~((this.sp / this.maxSp) * 100);
  }

  public get stationary(): boolean {
    return nearlyEqual(this.position, this.previousPosition);
  }

  public get canLaunch(): boolean {
    return this.launches < this.maxLaunches;
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
        this.hasSlowmotion = true;
      }
    }
    //RELEASE
    else if (this.isInputting && !active) {
      scale(
        this.velocity!,
        this.launchVector!,
        Settings.launchForceMultiplier * this.launchPower!,
      );
      this._startPos = undefined;
      this.launchVector = undefined;
      this.launchPower = undefined;
      this.launches++;
      this.totalLaunches++;
      Settings.speedScale = 1;
      this.hasSlowmotion = false;
    }
    //MOVE
    else if (this._pm.position && this._startPos) {
      negate(
        this.launchVector!,
        normalize(
          this.launchVector!,
          subtract(this.launchVector!, this._pm.position, this._startPos),
        ),
      );
      this.launchPower =
        clamp(0, 100, distance(this._startPos, this._pm.position)) / 100;
    }
    this.isInputting = active;
  }

  clone(): Player {
    let player = new Player(this._pm);
    player.id = this.id;
    player.attraction = this.attraction?.clone();
    player.position = copy([0, 0], this.position)!;
    player.previousPosition = copy([0, 0], this.previousPosition)!;
    player.velocity = copy([0, 0], this.velocity!);
    player.acceleration = copy([0, 0], this.acceleration!);
    player.isInputting = this.isInputting;
    player.launchVector = copy([0, 0], this.launchVector);
    player.launchPower = this.launchPower;
    player.totalLaunches = this.totalLaunches;
    player.launches = this.launches;
    player._startPos = copy([0, 0], this._startPos);
    player.maxLaunches = this.maxLaunches;
    player.sp = this.sp;
    return player;
  }
}
