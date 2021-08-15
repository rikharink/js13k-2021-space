import { PointerManager } from './managers/pointer-manager';
import { Scene } from './game/scene';
import { Milliseconds, Random, Seconds } from './types';
import { CanvasRenderer } from './canvas/canvas-renderer';
import { IRenderer } from './interfaces/renderer';
import { ITickable } from './interfaces/tickable';
import { Planet } from './game/planet';
import { Settings } from './settings';
import { Player } from './game/player';
import { seedRand } from './math/random';

const ALPHA = 0.9;

class GameObject {
  public fps: number = 60;
  private readonly _pointerManager;
  private _dt: number = 0;
  private _adt: number = 0;
  private _then: number = 0;
  private _renderer: IRenderer;
  private _player: Player;
  private _canvas: HTMLCanvasElement;
  private _rng: Random;
  private _currentScene!: Scene;
  private _accumulator: number = 0;
  private _raf?: number;

  public constructor() {
    this._rng = seedRand(Settings.seed);
    this._canvas = <HTMLCanvasElement>(
      document.getElementById(Settings.canvasId)
    );
    this._pointerManager = new PointerManager(this._canvas);
    this._renderer = new CanvasRenderer(this._canvas);
    this._player = new Player(this._pointerManager);
    this.currentScene = new Scene({
      rng: this._rng,
      width: this._canvas.offsetWidth,
      height: this._canvas.offsetHeight,
      player: this._player,
      numberOfStars: 2000,
      planets: [
        new Planet(
          [Settings.resolution[0] / 2, Settings.resolution[1] / 2],
          75,
          75000000,
        ),
      ],
    });

    window.addEventListener('focus', this.start.bind(this));
    window.addEventListener('blur', this.stop.bind(this));
  }

  public set currentScene(scene: Scene) {
    this._currentScene = scene;
    this._player.currentScene = scene;
    this._renderer.currentScene = scene;
  }

  public get canvas(): HTMLCanvasElement {
    return this._canvas;
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
    t *= 0.001;
    this._dt = t - this._then;
    this._then = t;
    this._adt += this._dt;
    return t;
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
    if (this._dt > 1e3) {
      return;
    }
    this._accumulator += this._dt;
    while (this._accumulator >= 1 / Settings.tps) {
      this._currentScene.tick(t, 1 / Settings.tps);
      this._accumulator -= 1 / Settings.tps;
    }
    this._renderer.render();
  }
}

export const Game = new GameObject();
