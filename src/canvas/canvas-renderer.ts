import { palette } from '../palette';
import { Scene } from '../game/scene';
import { Settings } from '../settings';
import { IRenderer } from '../interfaces/renderer';
import { splitRgb } from '../math/color';
import { rgbaString } from '../util/util';
import { drawCircle, drawLine } from './util';

export class CanvasRenderer implements IRenderer {
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  private _fps: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._canvas.width = Settings.resolution[0];
    this._canvas.height = Settings.resolution[1];
    this._ctx = this._canvas.getContext('2d')!;
  }

  set fps(fps: number) {
    this._fps = fps;
  }

  private _renderCelestialBodies(ctx: CanvasRenderingContext2D, scene: Scene) {
    for (let body of scene.celestialBodies ?? []) {
      drawCircle(ctx, body, body.color);
    }
  }

  private _renderPlayer(ctx: CanvasRenderingContext2D, scene: Scene) {
    drawCircle(ctx, scene.player, scene.player.color);
  }

  private _renderDebug(ctx: CanvasRenderingContext2D, scene: Scene) {
    if (scene.attraction) {
      drawLine(
        ctx,
        scene.player.position,
        scene.attraction.position,
        splitRgb(palette[1]),
      );
    }

    ctx.fillStyle = rgbaString(splitRgb(palette[0]), 1);
    ctx.fillRect(10, 10, 45, 13);
    ctx.fillStyle = rgbaString(splitRgb(palette[5]), 1);
    ctx.fillText(`FPS: ${this._fps}`, 12, 20);
  }

  public render(scene: Scene) {
    const ctx = this._ctx;
    ctx.clearRect(0, 0, Settings.resolution[0], Settings.resolution[1]);
    this._renderCelestialBodies(ctx, scene);
    this._renderPlayer(ctx, scene);
    if (Settings.debug) {
      this._renderDebug(ctx, scene);
    }
  }
}
