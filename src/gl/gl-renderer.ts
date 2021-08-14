import { background } from './../palette';
import { normalizeRgb, splitRgb } from '../math/color';
import { Settings } from '../settings';
import { RgbColor } from '../types';
import { IRenderer } from './../interfaces/renderer';
import { GL_CONSTANTS } from './gl-constants';
import { Scene } from '../game/scene';

export class GLRenderer implements IRenderer {
  private _canvas: HTMLCanvasElement;
  private _gl: WebGL2RenderingContext;
  private _bg: RgbColor;
  private _scene?: Scene;

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._canvas.width = Settings.resolution[0];
    this._canvas.height = Settings.resolution[1];
    this._gl = this._canvas.getContext('webgl2')!;
    this._bg = normalizeRgb(splitRgb(background));
  }

  set currentScene(scene: Scene) {
    this._scene = scene;
  }

  render(t?: number): void {
    this._gl.clearColor(this._bg[0], this._bg[1], this._bg[2], 1.0);
    this._gl.clear(GL_CONSTANTS.COLOR_BUFFER_BIT);
  }
}
