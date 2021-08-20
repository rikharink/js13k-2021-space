import { palette } from '../palette';
import { State } from '../game/state';
import { DEBUG, Settings } from '../settings';
import { IRenderer } from '../interfaces/renderer';
import { splitRgb } from '../math/color';
import { rgbaString } from '../util/util';
import { drawArrow, drawCircle, drawFlag, drawLine } from './util';
import { renderBackground } from '../game/background';
import { Random } from '../types';
import { add, scale, subtract, Vector2, normalize } from '../math/vector2';
import { Line } from '../geometry/line';
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
    let tmp: Vector2 = [0, 0];
    for (let body of state.celestialBodies ?? []) {
      drawCircle(ctx, body, body.color);
      if (body.goal !== undefined) {
        const start = body.getPoint(body.goal);
        const end = add([0, 0], start, scale(tmp, normalize(tmp, subtract(tmp, start, body.position)), Settings.flagmastLength));
        drawFlag(ctx, new Line(start, end), splitRgb(palette[2]));
      }
    }
  }

  private _renderPlayer(ctx: CanvasRenderingContext2D, state: State) {
    drawCircle(ctx, state.player, state.player.color);
    if (state.player.canLaunch && state.player.launchVector && state.player.launchPower) {
      let tmp: Vector2 = [0, 0];
      const start = state.player.position;
      const end = add(tmp, start, scale(tmp, state.player.launchVector, 75 * state.player.launchPower));
      drawArrow(ctx, state.player.position, end, splitRgb(palette[2]));
    }
  }

  private _renderDebug(ctx: CanvasRenderingContext2D, state: State) {
    if (state.player.attraction) {
      drawLine(
        ctx,
        state.player.position,
        state.player.attraction.position,
        splitRgb(palette[1]),
      );
    }
    ctx.fillStyle = rgbaString(splitRgb(palette[0]), 1);
    ctx.fillRect(8, 8, 100, 48);
    ctx.fillStyle = rgbaString(splitRgb(palette[5]), 1);
    ctx.fillText(`FPS: ${this._fps}`, 12, 20);
    ctx.fillText(`TLC: ${state.player.totalLaunches}`, 12, 46);
    ctx.fillText(`SPP: ${state.player.spp}%`, 12, 33);
  }

  public render(state: State) {
    const ctx = this._bufferContext;
    ctx.drawImage(this._background, 0, 0);
    this._renderCelestialBodies(ctx, state);
    this._renderPlayer(ctx, state);
    if (DEBUG) {
      this._renderDebug(ctx, state);
    }
    this._ctx.drawImage(this._bufferContext.canvas, 0, 0);
  }
}
