import { PointerManager } from '../managers/pointer-manager';
import { blend, State } from './state';
import { Milliseconds, Random, Seconds } from '../types';
import { CanvasRenderer } from '../canvas/canvas-renderer';
import { IRenderer } from '../interfaces/renderer';
import { Settings } from '../settings';
import { seedRand } from '../math/random';
import { WebmonetizationManger } from '../managers/webmonetization-manager';
import { generateLevel, Level } from './level';
//@ts-ignore
import level1 from './levels/level1.lvl.json';
import { copy, Vector2 } from '../math/vector2';

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
  private _previousState!: State;
  public currentState!: State;

  public constructor() {
    this.cnvs = <HTMLCanvasElement>document.getElementById(Settings.canvasId);
    this._pointerManager = new PointerManager(this.cnvs);
    this._monetizationManager = new WebmonetizationManger();
    this._rng = seedRand(Settings.seed);
    this._renderer = new CanvasRenderer(this.cnvs, this._rng);

    window.addEventListener('focus', this.start.bind(this));
    window.addEventListener('blur', this.stop.bind(this));
    this.loadLevel(level1);
  }

  public loadLevel(level: Level) {
    this.currentState = State.fromLevel(this._pointerManager, level);
    this._previousState = this.currentState;
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
      const result = this.currentState.step(1 / Settings.tps);
      if (result.hitGoal) {
        //GOAL GOAL GOAL
        const lvl = generateLevel(this._rng, this._level++, <Vector2>Settings.resolution);
        // this.loadLevel(lvl);
        this.currentState.player.victory();
        this.currentState.player.position = copy([0, 0], level1.spawn)!;
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
