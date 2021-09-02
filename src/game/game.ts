import { scale, Vector2 } from './../math/vector2';
import { PointerManager } from '../managers/pointer-manager';
import { blend, State } from './state';
import { Milliseconds, Seconds } from '../types';
import { CanvasRenderer } from '../canvas/canvas-renderer';
import { IRenderer } from '../interfaces/renderer';
import { Settings } from '../settings';
import { Random } from '../math/random';
import { WebmonetizationManger } from '../managers/webmonetization-manager';
import { generateLevel, Level } from './level';
import { copy } from '../math/vector2';
import { playBounce, playGoalHit, playStarHit } from '../audio/fx';
import { Player } from './player';
import { uuidv4 } from '../util/util';

const ALPHA = 0.9;

export interface SerializableGame {
  v: number;
  level: Level;
  totalLaunches: number;
  holeLaunches: number;
  position?: Vector2;
}

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
  private _lastBounce: Milliseconds = 0;

  public constructor() {
    this.cnvs = <HTMLCanvasElement>document.getElementById(Settings.canvasId);
    this._pointerManager = new PointerManager(this.cnvs);
    this._monetizationManager = new WebmonetizationManger();
    this._rng = new Random(Settings.seed);
    this._renderer = new CanvasRenderer(this.cnvs, this._rng);
    window.addEventListener('focus', this.start.bind(this));
    window.addEventListener('blur', this.stop.bind(this));
    if (!this.hydrate()) {
      this.loadLevel(generateLevel(this._rng, this._level, 0, 0));
    }
  }

  public reset() {
    localStorage.removeItem(Settings.localStoragePrefix + 'STATE');
    //@ts-ignore
    this.currentState = undefined;
    this._rng = new Random(Settings.seed);
    this._level = 1;
    this.loadLevel(generateLevel(this._rng, this._level, 0, 0));
  }

  public loadLevel(level: Level) {
    this._rng.reseed(level.levelSeed);
    this._level = level.number;
    this._currentLevel = level;
    const player =
      this.currentState?.player ??
      new Player(this._pointerManager, uuidv4(this._rng));
    this.currentState = State.fromLevel(level, player);
    this._previousState = this.currentState;
  }

  public resetLevel(): void {
    this.currentState.player.velocity = [0, 0];
    this.currentState.player.acceleration = [0, 0];
    copy(
      this.currentState.player.position,
      this.currentState.player.lastStationaryPosition,
    );
  }

  public hydrate(): boolean {
    const stateString = localStorage.getItem(
      Settings.localStoragePrefix + 'STATE',
    );
    if (stateString) {
      try {
        const state = JSON.parse(stateString) as SerializableGame;
        if (state) {
          this.loadLevel(state.level);
          this.currentState.player.totalLaunches = state.totalLaunches;
          this.currentState.player.holeLaunches = state.holeLaunches;
          if (state.position) {
            this.currentState.player.position = state.position;
          }
          return true;
        }
      } catch (er) {
        console.trace(er);
      }
    }
    return false;
  }

  public dehydrate() {
    localStorage.setItem(
      Settings.localStoragePrefix + 'STATE',
      JSON.stringify({
        v: 1,
        level: this._currentLevel,
        holeLaunches: this.currentState.player.holeLaunches,
        totalLaunches: this.currentState.player.totalLaunches,
        position: this.currentState.player.lastStationaryPosition,
      }),
    );
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
    if (this._adt >= 1) {
      this._adt = 0;
    }
    return r;
  }

  public nextLevel() {
    this._nextLevel = generateLevel(
      this._rng,
      ++this._level,
      this._currentLevel.noStarGenerated,
      this._currentLevel.noMoonsGenerated,
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

  public dumpLevel() {
    console.debug(JSON.stringify(this._currentLevel));
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
        const { hitGoal, hitStar, hadCollision } = this.currentState.step(
          1 / Settings.tps,
        );
        if (hitGoal) {
          playGoalHit();
          this.currentState.player.canInput = false;
          copy(this.currentState.player.velocity!, [0, 0]);
          this.dehydrate();
          this.nextLevel();
        } else if (hitStar) {
          playStarHit();
          this.resetLevel();
        } else if (hadCollision) {
          const diff = t - this._lastBounce;
          if (this.currentState.player.isMoving && diff > 0.05) {
            this._lastBounce = t;
            playBounce();
          }
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

let Game = new GameObject();
export { Game };
