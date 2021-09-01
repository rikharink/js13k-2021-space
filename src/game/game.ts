import { PointerManager } from '../managers/pointer-manager';
import { blend, State } from './state';
import { Milliseconds, Random, Seconds } from '../types';
import { CanvasRenderer } from '../canvas/canvas-renderer';
import { IRenderer } from '../interfaces/renderer';
import { Settings } from '../settings';
import { seedRand } from '../math/random';
import { WebmonetizationManger } from '../managers/webmonetization-manager';
import { generateLevel, Level } from './level';
import { copy } from '../math/vector2';

const ALPHA = 0.9;

class GameObject {
  public fps: number = 60;
  public isActive: boolean = false;
  private readonly _pointerManager;
  private readonly _monetizationManager;
  private _dt: number = 0;
  private _adt: number = 0;
  private _then: number = 0;
  private _renderer: IRenderer;
  public cnvs: HTMLCanvasElement;
  private _rng: Random;
  private _accumulator: number = 0;
  private _raf?: number;

  private _level: number = 1;
  private _currentLevel!: Level;
  private _previousState!: State;
  public currentState!: State;
  private _victoryCallback?: (level: Level) => void = undefined;
  private _nextLevel?: Level = undefined;
  private _playerAnimationDone: boolean = false;
  private _flagAnimationDone: boolean = false;

  public constructor() {
    this.cnvs = <HTMLCanvasElement>document.getElementById(Settings.canvasId);
    this._pointerManager = new PointerManager(this.cnvs);
    this._monetizationManager = new WebmonetizationManger();
    this._rng = seedRand(Settings.seed);
    this._renderer = new CanvasRenderer(this.cnvs, this._rng);
    window.addEventListener('focus', this.start.bind(this));
    window.addEventListener('blur', this.stop.bind(this));
    this.loadLevel(generateLevel(this._rng, this._level));
  }

  public loadLevel(level: Level) {
    this._currentLevel = level;
    this.currentState = State.fromLevel(
      this._pointerManager,
      level,
      this.currentState?.player,
    );
    this._previousState = this.currentState;
  }

  public resetLevel(): void {
    this.currentState.player.velocity = [0, 0];
    this.currentState.player.acceleration = [0, 0];
    this.loadLevel(this._currentLevel);
  }

  public start() {
    if (this._raf !== undefined) return;
    this._raf = requestAnimationFrame(this._loop.bind(this));
    this.isActive = true;
  }

  public stop() {
    if (this._raf) {
      cancelAnimationFrame(this._raf);
    }
    this._raf = undefined;
    this.isActive = false;
  }

  private _updateTimes(t: Milliseconds): Seconds {
    let r = t * 0.001;
    this._dt = r - this._then;
    this._then = r;
    this._adt += this._dt;
    this.fps = ALPHA * this.fps + (1.0 - ALPHA) * (1 / this._dt);
    this._renderer.fps = ~~this.fps;
    if (this._adt >= 1) {
      this._adt = 0;
    }
    return r;
  }

  public nextLevel() {
    this._nextLevel = generateLevel(
      this._rng,
      ++this._level,
      this._currentLevel.goalPlanet,
    );
    this._victoryCallback = ((level: Level) => {
      this._playerAnimationDone = false;
      this._flagAnimationDone = false;
      this._victoryCallback = undefined;
      this._nextLevel = undefined;
      this.currentState.player.victory();
      this.currentState.player.position = copy([0, 0], level.spawn)!;
      this.currentState.player.canInput = true;
      Settings.flagmastLength = 45;
      this.loadLevel(level);
    }).bind(this);
  }

  private _animatePlayer(): void {
    this.currentState.step(1 / Settings.tps);
    this._playerAnimationDone = this.currentState.player.stationary;
  }

  private _animateFlag(): void {
    Settings.flagmastLength--;
    if (Settings.flagmastLength <= 0) {
      this._flagAnimationDone = true;
    }
  }

  private _animatePositions(): void {
    const goalX =
      this.currentState.celestialBodies[
        this.currentState.celestialBodies.length - 1
      ].position[0];

    const spawnX = this._nextLevel!.spawnPlanet!.position[0];
    if (goalX <= spawnX) {
      this._victoryCallback!(this._nextLevel!);
      return;
    }

    this.currentState.player.position[0] =
      this.currentState.player.position[0] - 3;
    this.currentState.player.saveCurrentPosition(false);
    this.currentState.celestialBodies.forEach(
      (cb) => (cb.position[0] = ~~(cb.position[0] - 3)),
    );
  }

  private _loop(t: Milliseconds): void {
    this._raf = requestAnimationFrame(this._loop.bind(this));
    t = this._updateTimes(t);
    if (this._dt > 1) {
      return;
    }

    this.currentState.player.tick();
    this._accumulator += this._dt;
    this._accumulator += this._dt;
    while (this._accumulator >= 1 / Settings.tps) {
      this._previousState = this.currentState.clone();
      if (this._victoryCallback && this._nextLevel) {
        if (!this._playerAnimationDone) {
          this._animatePlayer();
        } else if (!this._flagAnimationDone) {
          this._animateFlag();
        } else {
          this._animatePositions();
        }
      } else {
        const { hitGoal } = this.currentState.step(1 / Settings.tps);
        if (hitGoal) {
          this.currentState.player.canInput = false;
          copy(this.currentState.player.velocity!, [0, 0]);
          this.nextLevel();
        }
      }
      this._accumulator -= 1 / Settings.tps;
      t += this._dt;
    }

    this._renderer.render(
      blend(
        this._previousState,
        this.currentState,
        this._accumulator / this._dt,
      ),
    );
  }
}

export const Game = new GameObject();
