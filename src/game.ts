import { PointerManager } from './managers/pointer-manager';
import { Scene } from './game/scene';
import { Milliseconds, Seconds } from './types';
import { CanvasRenderer } from './canvas/canvas-renderer';
import { IRenderer } from './interfaces/renderer';
import { ITickable } from './interfaces/tickable';
import { Planet } from './game/planet';
import { Settings } from './settings';
import { Player } from './game/player';

const ALPHA = 0.9;

class GameObject implements ITickable {
  public readonly pointerManager = new PointerManager();
  public fps: number = 0;
  private _dt: number = 0;
  private _adt: number = 0;
  private _then: number = 0;
  private _renderer: IRenderer;
  private _player: Player;
  private _currentScene!: Scene;
  private _canvas: HTMLCanvasElement;

  public constructor() {
    requestAnimationFrame(this.tick.bind(this));
    this._canvas = <HTMLCanvasElement>(
      document.getElementById(Settings.canvasId)
    );
    this._renderer = new CanvasRenderer(this._canvas);
    this._player = new Player();
    this.currentScene = new Scene({
      player: this._player,
      planets: [
        new Planet(
          [Settings.resolution[0] / 2, Settings.resolution[1] / 2],
          75,
        ),
        new Planet(
          [Settings.resolution[0] / 4, Settings.resolution[1] / 4],
          75,
        ),
      ],
    });
  }

  public set currentScene(scene: Scene) {
    this._currentScene = scene;
    this._player.currentScene = scene;
    this._renderer.currentScene = scene;
  }

  public get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  public start() {}

  tick(t: Milliseconds): void {
    requestAnimationFrame(this.tick.bind(this));
    t = this._updateTimes(t);
    this._updateFPS(t);
    this._renderer.render(t, this._dt);
    this._currentScene.tick(t, this._dt);
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
    if (this._adt >= 1) {
      this._adt = 0;
    }
  }
}

export const Game = new GameObject();
