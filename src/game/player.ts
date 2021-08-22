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
  dot,
} from './../math/vector2';
import { Percentage, Point2D, RgbColor, UUIDV4 } from './../types';
import { PhysicsCircle } from './physics-circle';
import { palette } from '../palette';
import { splitRgb } from '../math/color';
import { clamp } from '../math/math';
import { uuidv4 } from '../util/util';
import { IStepable } from '../interfaces/stepable';
import { hasCircleRectangleCollision } from '../physics/collision/collision-checks';
import { Rectangle } from '../geometry/rectangle';

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
  public positions: Vector2[] = [];
  public lastStationaryPosition?: Point2D;
  public awayCount: number = 0;

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
      this.lastStationaryPosition = copy([0, 0], this.position)!;
    }

    if (this.hasSlowmotion) {
      if (this.sp <= 0) {
        this.hasSlowmotion = false;
        Settings.speedScale = 1;
      }
      this.sp--;
    } else {
      Settings.speedScale = 1;
      if (this.sp < this.maxSp) {
        this.sp += 0.1;
      }
    }

    if (
      !hasCircleRectangleCollision(
        this,
        new Rectangle([0, 0], Settings.resolution as Vector2),
      )
    ) {
      const vec = normalize(
        [0, 0],
        subtract([0, 0], this.position, this.attraction!.position),
      );

      if (dot(normalize([0, 0], this.velocity!), vec) > 0) {
        this.awayCount++;
      } else {
        this.awayCount = 0;
      }
    }
    if (this.awayCount > Settings.maxAwayCount) {
      this.awayCount = 0;
      copy(this.position, this.lastStationaryPosition);
      this.velocity = [0, 0];
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

  public saveCurrentPosition() {
    this.positions.push(copy([0, 0], this.position)!);
    if (this.positions.length > Settings.trailSize) {
      this.positions.shift();
    }
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
      this.launch();
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

  public launch(): void {
    scale(
      this.velocity!,
      this.launchVector!,
      Settings.launchForceMultiplier *
        this.launchPower! *
        (this.hasSlowmotion ? 0.5 : 1),
    );
    this._startPos = undefined;
    this.launchVector = undefined;
    this.launchPower = undefined;
    this.launches++;
    this.totalLaunches++;
    this.hasSlowmotion = false;
  }

  public clone(): Player {
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
    player.positions = this.positions.map((op) => copy([0, 0], op)!);
    player.awayCount = this.awayCount;
    return player;
  }
}
