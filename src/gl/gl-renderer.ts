import { Scene } from './../game/scene';
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
  private _scene?: Scene;
  private _fps: number = 0;

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

  set fps(fps: number) {
    this._fps = fps;
  }

  render(): void {
    if (this._scene) {
      this._render(this._scene);
    }
  }

  private _render(scene: Scene) {
    this._gl.clearColor(this._bg[0], this._bg[1], this._bg[2], 1.0);
    this._gl.clear(GL_CONSTANTS.COLOR_BUFFER_BIT);
  }
}
