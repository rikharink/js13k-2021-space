import { State } from '../game/state';
import { background } from './../palette';
import { normalizeRgb, splitRgb } from '../math/color';
import { Settings } from '../settings';
import { RgbColor } from '../types';
import { IRenderer } from './../interfaces/renderer';
import { GL_CONSTANTS } from './gl-constants';

export class GLRenderer implements IRenderer {
  private _canvas: HTMLCanvasElement;
  private _gl: WebGL2RenderingContext;
  private _bg: RgbColor;
  private _state?: State;
  private _fps: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._canvas.width = Settings.resolution[0];
    this._canvas.height = Settings.resolution[1];
    this._gl = this._canvas.getContext('webgl2')!;
    this._bg = normalizeRgb(splitRgb(background));
  }

  set currentstate(state: State) {
    this._state = state;
  }

  set fps(fps: number) {
    this._fps = fps;
  }

  render(): void {
    if (this._state) {
      this._render(this._state);
    }
  }

  private _render(state: State) {
    this._gl.clearColor(this._bg[0], this._bg[1], this._bg[2], 1.0);
    this._gl.clear(GL_CONSTANTS.COLOR_BUFFER_BIT);
  }
}
