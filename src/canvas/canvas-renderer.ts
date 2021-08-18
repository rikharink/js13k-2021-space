import { palette } from '../palette';
import { State } from '../game/state';
import { Settings } from '../settings';
import { IRenderer } from '../interfaces/renderer';
import { splitRgb } from '../math/color';
import { rgbaString } from '../util/util';
import { drawCircle, drawLine } from './util';
import { renderBackground } from '../game/background';
import { F, Random } from '../types';
import { DEGREE_TO_RADIAN } from '../math/math';
export class CanvasRenderer implements IRenderer {
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  private _fps: number = 0;
  private _background: HTMLCanvasElement;
  private _rng: Random;
  private _bufferContext: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement, rng: Random) {
    this._canvas = canvas;
    this._bufferContext = document.createElement('canvas').getContext('2d')!;
    this._setSize();

    this._ctx = this._canvas.getContext('2d')!;
    this._rng = rng;

    this._background =
      renderBackground(
        Settings.resolution[0],
        Settings.resolution[1],
        this._rng,
        Settings.nrOfBackgroundStars,
      );
  }

  set fps(fps: number) {
    this._fps = fps;
  }

  private _setSize() {
    this._canvas.width = Settings.resolution[0];
    this._canvas.height = Settings.resolution[1];
    this._bufferContext.canvas.width = Settings.resolution[0];
    this._bufferContext.canvas.height = Settings.resolution[1];
  }

  private _renderCelestialBodies(ctx: CanvasRenderingContext2D, state: State) {
    for (let body of state.celestialBodies ?? []) {
      drawCircle(ctx, body, body.color);
    }
  }

  private _renderPlayer(ctx: CanvasRenderingContext2D, state: State) {
    drawCircle(ctx, state.player, state.player.color);
  }

  private _renderDebug(ctx: CanvasRenderingContext2D, state: State) {
    if (state.attraction) {
      drawLine(
        ctx,
        state.player.position,
        state.attraction.position,
        splitRgb(palette[1]),
      );
    }
    ctx.fillStyle = rgbaString(splitRgb(palette[0]), 1);
    ctx.fillRect(10, 10, 45, 13);
    ctx.fillStyle = rgbaString(splitRgb(palette[5]), 1);
    ctx.fillText(`FPS: ${this._fps}`, 12, 20);
  }

  public render(state: State) {
    const ctx = this._bufferContext;
    ctx.drawImage(this._background, 0, 0);
    this._renderCelestialBodies(ctx, state);
    this._renderPlayer(ctx, state);
    if (Settings.debug) {
      this._renderDebug(ctx, state);
    }
    this._ctx.drawImage(this._bufferContext.canvas, 0, 0);
  }
}
