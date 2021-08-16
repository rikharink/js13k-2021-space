import { PointerManager } from './managers/pointer-manager';
import { blend, Scene } from './game/scene';
import { Milliseconds, Random, Seconds } from './types';
import { CanvasRenderer } from './canvas/canvas-renderer';
import { IRenderer } from './interfaces/renderer';
import { CelestialBody } from './game/celestial-body';
import { Settings } from './settings';
import { Player } from './game/player';
import { seedRand } from './math/random';
import { renderBackground } from './game/background';

const ALPHA = 0.9;

class GameObject {
  public fps: number = 60;
  private readonly _pointerManager;
  private _dt: number = 0;
  private _adt: number = 0;
  private _then: number = 0;
  private _renderer: IRenderer;
  private _player: Player;
  public cnvs: HTMLCanvasElement;
  private _rng: Random;
  private _previousState?: Scene;
  private _currentState!: Scene;
  private _accumulator: number = 0;
  private _raf?: number;

  public constructor() {
    this._rng = seedRand(Settings.seed);
    this.cnvs = <HTMLCanvasElement>(
      document.getElementById(Settings.canvasId)
    );
    document.body.appendChild(renderBackground(Settings.resolution[0], Settings.resolution[1], this._rng, Settings.nrOfBackgroundStars));
    this._pointerManager = new PointerManager(this.cnvs);
    this._renderer = new CanvasRenderer(this.cnvs);
    this._player = new Player(this._pointerManager);
    this._currentState = new Scene({
      width: Settings.resolution[0],
      height: Settings.resolution[1],
      player: this._player,
      celestialBodies: [
        new CelestialBody(
          [Settings.resolution[0] / 2, Settings.resolution[1] / 2],
          75,
          75,
        ),
      ],
    });

    window.addEventListener('focus', this.start.bind(this));
    window.addEventListener('blur', this.stop.bind(this));
  }

  public start() {
    this._raf = requestAnimationFrame(this._loop.bind(this));
  }

  public stop() {
    if (this._raf) {
      cancelAnimationFrame(this._raf);
    }
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
      this._currentState.tick(t, 1 / Settings.tps);
      this._accumulator -= 1 / Settings.tps;
      t += this._dt;
    }
    this._renderer.render(blend(this._previousState, this._currentState, this._accumulator / this._dt));
  }
}

export const Game = new GameObject();
