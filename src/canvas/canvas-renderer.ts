import { background, palette } from '../palette';
import { RgbColor, Seconds } from './../types';
import { Scene } from '../game/scene';
import { Settings } from '../settings';
import { IRenderer } from '../interfaces/renderer';
import { splitRgb } from '../math/color';
import { rgbaString } from '../util/util';
import { drawCircle, drawLine } from './util';

export class CanvasRenderer implements IRenderer {
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  private _scene?: Scene;
  private _bg: RgbColor;
  private _fps: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._canvas.width = Settings.resolution[0];
    this._canvas.height = Settings.resolution[1];
    this._ctx = this._canvas.getContext('2d')!;
    this._bg = splitRgb(background);
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

  private _renderStars() {
    const ctx = this._ctx;
    for (let star of this._scene?.stars ?? []) {
      ctx.beginPath();
      ctx.arc(star[0], star[1], star[2], 0, 360);
      ctx.fillStyle = rgbaString(splitRgb(palette[0]), 0.8);
      ctx.fill();
    }
  }

  private _render(scene: Scene) {
    const ctx = this._ctx;
    //DRAW BACKGROUND
    ctx.fillStyle = rgbaString(this._bg, 1);
    ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
    this._renderStars();

    //DRAW SCENE
    for (let planet of scene.planets ?? []) {
      drawCircle(ctx, planet, planet.color);
    }
    drawCircle(ctx, scene.player, scene.player.color);

    if (Settings.debug) {
      if (scene.player.attraction) {
        drawLine(
          ctx,
          scene.player.center,
          scene.player.attraction.center,
          splitRgb(palette[1]),
        );
      }

      ctx.fillStyle = rgbaString(splitRgb(palette[0]), 1);
      ctx.fillRect(10, 10, 45, 13);
      ctx.fillStyle = rgbaString(splitRgb(palette[5]), 1);
      ctx.fillText(`FPS: ${this._fps}`, 12, 20);
    }
  }
}
