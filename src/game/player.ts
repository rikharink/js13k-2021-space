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
import { IStepable } from '../interfaces/stepable';
import { hasCircleRectangleCollision } from '../geometry/collision-checks';
import { Rectangle } from '../geometry/rectangle';
import { playLaunch } from '../audio/fx';

export class Player
  extends PhysicsCircle
  implements ITickable<void>, IStepable<void>
{
  public readonly color: RgbColor = splitRgb(palette[2]);
  public id: UUIDV4;
  public isInputting: boolean = false;
  public launches: number = 0;
  public totalLaunches: number = 0;
  public holeLaunches: number = 0;
  public launchVector?: Vector2;
  public startPos?: Point2D;
  public launchPower?: number;
  public maxLaunches: number = 3;
  public readonly maxSp: number = Settings.tps * 2;
  public sp: number = Settings.tps * 2;
  public hasSlowmotion = false;
  public positions: Vector2[] = [];
  public lastStationaryPosition?: Point2D;
  public awayCount: number = 0;
  public oob: boolean = false;
  public isMoving: boolean = false;

  public sc: number = 0;
  private _lc: number = 0;
  private _pm: PointerManager;
  public canInput: boolean = true;

  constructor(pm: PointerManager, id: UUIDV4) {
    super([10, 10], Settings.playerRadius, Settings.playerMass, [0, 0], [0, 0]);
    this.id = id;
    this._pm = pm;
  }

  public tick(): void {
    this.handleInput();
  }

  public step(): void {
    if (this.stationary) {
      this.sc++;
    }

    if (this.sc > 30) {
      this.sc = 0;
      this._lc = 0;
      this.launches = 0;
      this.lastStationaryPosition = copy([0, 0], this.position)!;
      this.isMoving = false;
    }

    if (this.launches === this.maxLaunches) {
      this._lc++;
    }
    if (this._lc > Settings.tps * 3) {
      this.launches = Math.min(0, this.launches - 1);
      this._lc = 0;
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
      this.attraction &&
      !hasCircleRectangleCollision(
        this,
        new Rectangle([0, 0], Settings.resolution as Vector2),
      )
    ) {
      this.oob = true;
      const vec = normalize(
        [0, 0],
        subtract([0, 0], this.position, this.attraction.position),
      );

      if (dot(normalize([0, 0], this.velocity!), vec) > 0) {
        this.awayCount++;
      } else {
        this.awayCount = 0;
      }
    } else {
      this.awayCount = 0;
      this.oob = false;
    }
    if (this.awayCount > Settings.maxAwayCount) {
      this.awayCount = 0;
      copy(this.position, this.lastStationaryPosition);
      this.velocity = [0, 0];
    }
  }

  public victory(): void {
    this.totalLaunches += this.holeLaunches;
    this.holeLaunches = 0;
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

  public saveCurrentPosition(hasTrail?: boolean) {
    if (!(hasTrail ?? true)) {
      this.positions = [
        copy([0, 0], this.position)!,
        copy([0, 0], this.position)!,
      ];
      return;
    }

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
      this.startPos = copy([0, 0], this._pm.position);
      if (this.launches >= 1) {
        Settings.speedScale = 0.1;
        this.hasSlowmotion = true;
      }
    }
    //RELEASE
    else if (this.isInputting && !active) {
      this.launch();
      playLaunch();
    }
    //MOVE
    else if (this._pm.position && this.startPos) {
      negate(
        this.launchVector!,
        normalize(
          this.launchVector!,
          subtract(this.launchVector!, this._pm.position, this.startPos),
        ),
      );
      this.launchPower =
        clamp(0, 100, distance(this.startPos, this._pm.position)) / 100;
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
    this.startPos = undefined;
    this.launchVector = undefined;
    this.launchPower = undefined;
    this.launches++;
    this.holeLaunches++;
    this.hasSlowmotion = false;
    this.isMoving = true;
  }

  public clone(): Player {
    let player = new Player(this._pm, this.id);
    player.attraction = this.attraction?.clone();
    player.position = copy([0, 0], this.position)!;
    player.previousPosition = copy([0, 0], this.previousPosition)!;
    player.velocity = copy([0, 0], this.velocity!);
    player.acceleration = copy([0, 0], this.acceleration!);
    player.isInputting = this.isInputting;
    player.launchVector = copy([0, 0], this.launchVector);
    player.launchPower = this.launchPower;
    player.totalLaunches = this.totalLaunches;
    player.holeLaunches = this.holeLaunches;
    player.launches = this.launches;
    player.startPos = copy([0, 0], this.startPos);
    player.maxLaunches = this.maxLaunches;
    player.sp = this.sp;
    player.positions = this.positions.map((op) => copy([0, 0], op)!);
    player.oob = this.oob;
    player.awayCount = this.awayCount;
    player.canInput = this.canInput;
    player.isMoving = this.isMoving;
    return player;
  }
}
