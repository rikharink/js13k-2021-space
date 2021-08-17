import { PointerManager } from './managers/pointer-manager';
import { blend, State } from './game/state';
import { Milliseconds, Random, Seconds } from './types';
import { CanvasRenderer } from './canvas/canvas-renderer';
import { IRenderer } from './interfaces/renderer';
import { Settings } from './settings';
import { Player } from './game/player';
import { seedRand } from './math/random';
import { WebmonetizationManger } from './managers/webmonetization-manager';

//@ts-ignore
import level1 from './game/levels/level1.lvl.json';

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

  private _player!: Player;
  private _previousState!: State;
  private _currentState!: State;

  public constructor() {
    this.cnvs = <HTMLCanvasElement>document.getElementById(Settings.canvasId);
    this._pointerManager = new PointerManager(this.cnvs);
    this._monetizationManager = new WebmonetizationManger();
    this._rng = seedRand(Settings.seed);
    this._renderer = new CanvasRenderer(this.cnvs, this._rng);

    window.addEventListener('focus', this.start.bind(this));
    window.addEventListener('blur', this.stop.bind(this));
    this.initState();
  }

  public initState() {
    this._player = new Player(this._pointerManager);
    this._currentState = State.fromLevel(this._pointerManager, level1);
  }

  public start() {
    this._raf = requestAnimationFrame(this._loop.bind(this));
    this.isActive = true;
  }

  public stop() {
    if (this._raf) {
      cancelAnimationFrame(this._raf);
    }
    this.isActive = false;
  }

  private _updateTimes(t: Milliseconds): Seconds {
    let r = t * 0.001;
    this._dt = r - this._then;
    this._then = r;
    this._adt += this._dt;
    return r;
  }

  private _updateFPS(t: Seconds) {
    this._then = t;
    this._adt += this._dt;
    this.fps = ALPHA * this.fps + (1.0 - ALPHA) * (1 / this._dt);
    this._renderer.fps = ~~this.fps;
    if (this._adt >= 1) {
      this._adt = 0;
    }
  }

  private _loop(t: Milliseconds): void {
    this._raf = requestAnimationFrame(this._loop.bind(this));
    t = this._updateTimes(t);
    this._updateFPS(t);
    if (this._dt > 1) {
      return;
    }
    this._accumulator += this._dt;
    this._accumulator += this._dt;
    while (this._accumulator >= 1 / Settings.tps) {
      this._previousState = this._currentState.clone();
      this._currentState.step(1 / Settings.tps);
      this._accumulator -= 1 / Settings.tps;
      t += this._dt;
    }
    this._renderer.render(
      blend(
        this._previousState,
        this._currentState,
        this._accumulator / this._dt,
      ),
    );
  }
}

export const Game = new GameObject();
