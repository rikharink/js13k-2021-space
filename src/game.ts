import { RgbColor } from './types';
import { Settings } from './settings';
import { ITickable } from './interfaces/tickable';
import { InputManager } from './managers/input-manager';
import { background } from './palette';
import { splitRgb, normalizeRgb } from './math/color';

const ALPHA = 0.9;

export class Game implements ITickable {
  public inputManager = new InputManager();
  public fps: number = 0;
  private _dt: number = 0;
  private _then: number = 0;
  private _canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext;
  private _bg: RgbColor;

  public constructor() {
    requestAnimationFrame(this.tick.bind(this));
    this._canvas = <HTMLCanvasElement>document.getElementById('g');
    this._canvas.width = Settings.resolution[0];
    this._canvas.height = Settings.resolution[1];
    this.gl = this._canvas.getContext('webgl2')!;
    this._bg = normalizeRgb(splitRgb(background));
  }

  tick(t: number): void {
    requestAnimationFrame(this.tick.bind(this));
    t = this._updateFPS(t);
    this.inputManager.tick();
    this._render(t);
  }

  private _render(t: number) {
    const gl = this.gl;
    gl.clearColor(this._bg[0], this._bg[1], this._bg[2], 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  private _updateFPS(t: number) {
    t *= 0.001;
    let dt = t - this._then;
    this._then = t;
    this._dt += dt;
    this.fps = ALPHA * this.fps + (1.0 - ALPHA) * (1 / dt);
    if (this._dt >= 1) {
      dt = 0;
    }
    return t;
  }
}
