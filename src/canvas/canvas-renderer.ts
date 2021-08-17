import { palette } from '../palette';
import { State } from '../game/state';
import { Settings } from '../settings';
import { IRenderer } from '../interfaces/renderer';
import { splitRgb } from '../math/color';
import { rgbaString } from '../util/util';
import { drawCircle, drawLine } from './util';
import { normalize, negate, subtract, Vector2 } from '../math/vector2';
import { renderBackground } from '../game/background';
import { Random } from '../types';

export class CanvasRenderer implements IRenderer {
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  private _fps: number = 0;
  private _background: HTMLCanvasElement;
  private _rng: Random;

  constructor(canvas: HTMLCanvasElement, rng: Random) {
    this._canvas = canvas;
    this._canvas.width = Settings.resolution[0];
    this._canvas.height = Settings.resolution[1];
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

    let tmp: Vector2 = [0, 0];
    normalize(
      tmp,
      negate(
        tmp,
        subtract(tmp, state.player.position, state.attraction.position),
      ),
    );


    ctx.fillStyle = rgbaString(splitRgb(palette[0]), 1);
    ctx.fillRect(10, 10, 45, 13);
    ctx.fillStyle = rgbaString(splitRgb(palette[5]), 1);
    ctx.fillText(`FPS: ${this._fps}`, 12, 20);
  }

  public render(state: State) {
    const ctx = this._ctx;
    ctx.drawImage(this._background, 0, 0);
    this._renderCelestialBodies(ctx, state);
    this._renderPlayer(ctx, state);
    if (Settings.debug) {
      this._renderDebug(ctx, state);
    }
  }
}
