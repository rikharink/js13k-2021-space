import { palette } from '../palette';
import { State } from '../game/state';
import { DEBUG, Settings } from '../settings';
import { IRenderer } from '../interfaces/renderer';
import { splitRgb } from '../math/color';
import { rgbaString } from '../util/util';
import { drawArrow, drawCircle, drawFlag, drawPercentagebar } from './util';
import { renderBackground } from '../game/background';
import { add, scale, subtract, Vector2, normalize } from '../math/vector2';
import { Line } from '../geometry/line';
import { Circle } from '../geometry/circle';
import { Random } from '../math/random';

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

    this._background = renderBackground(
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
    ctx.save();
    let tmp: Vector2 = [0, 0];
    for (let body of state.celestialBodies ?? []) {
      drawCircle(ctx, body, body.color);
      if (body.goal !== undefined) {
        const start = body.getPoint(body.goal);
        const end = add(
          [0, 0],
          start,
          scale(
            tmp,
            normalize(tmp, subtract(tmp, start, body.position)),
            Settings.flagmastLength,
          ),
        );
        drawFlag(
          ctx,
          `${state.currentLevel}`,
          new Line(start, end),
          body.goal,
          splitRgb(palette[2]),
        );
      }
    }
    ctx.restore();
  }

  private _renderPlayer(ctx: CanvasRenderingContext2D, state: State) {
    ctx.save();
    for (let i = state.player.positions.length - 1; i > 0; i--) {
      const p = i / (state.player.positions.length - 1);
      drawCircle(
        ctx,
        new Circle(state.player.positions[i], state.player.radius),
        state.player.color,
        p,
      );
    }
    if (
      state.player.canLaunch &&
      state.player.launchVector &&
      state.player.launchPower &&
      state.player.startPos
    ) {
      let tmp: Vector2 = [0, 0];
      const start = state.player.startPos;
      const end = add(
        tmp,
        start,
        scale(tmp, state.player.launchVector, 200 * state.player.launchPower),
      );
      drawArrow(ctx, new Line(start, end), splitRgb(palette[0]), 3);
      this._renderFuture(ctx, state);
    }
    ctx.restore();
  }

  private _renderFuture(ctx: CanvasRenderingContext2D, state: State) {
    ctx.save();
    for (let pos of state.future) {
      drawCircle(ctx, new Circle(pos, 1), splitRgb(palette[0]));
    }
    ctx.restore();
  }

  private _renderUi(ctx: CanvasRenderingContext2D, state: State) {
    ctx.save();
    const txt = splitRgb(palette[0]);
    const colors = {
      foreground: splitRgb(palette[1]),
      background: splitRgb(palette[3]),
      text: txt,
    };

    ctx.font = 'normal 32px sans-serif';
    ctx.fillStyle = rgbaString(txt, 1);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    let m: TextMetrics;
    let x = Settings.resolution[0] / 2;
    let y = 24;
    const totalLaunchesText = `${state.player.totalLaunches}`;
    m = ctx.measureText(totalLaunchesText);
    ctx.strokeText(totalLaunchesText, x, y);
    ctx.fillText(totalLaunchesText, x, y);
    x += m.width + 24;

    if (state.player.holeLaunches > 0) {
      const holeLaunchesText = `${state.player.holeLaunches > 0 ? '+' : ''}${
        state.player.holeLaunches
      }`;
      ctx.strokeText(holeLaunchesText, x, y);
      ctx.fillText(holeLaunchesText, x, y);
    }

    ctx.restore();
    ctx.save();
    x = 8;
    y = Settings.resolution[1] - 28;
    drawPercentagebar(ctx, state.player.spp, 'slo-mo', [x, y], colors);
    y -= 26;

    drawPercentagebar(
      ctx,
      100 - (state.player.launches / state.player.maxLaunches) * 100,
      'launches',
      [x, y],
      colors,
    );
    y -= 26;

    const awayPercentage = ~~(
      100 -
      (state.player.awayCount / Settings.maxAwayCount) * 100
    );
    if (awayPercentage < 100) {
      drawPercentagebar(ctx, awayPercentage, 'respawn', [x, y], colors);
    }
    ctx.restore();
  }

  private _renderDebug(ctx: CanvasRenderingContext2D, state: State) {
    ctx.save();
    ctx.restore();
  }

  public render(state: State) {
    const ctx = this._bufferContext;
    ctx.save();
    ctx.drawImage(this._background, 0, 0);
    this._renderCelestialBodies(ctx, state);
    this._renderPlayer(ctx, state);
    this._renderUi(ctx, state);
    if (DEBUG) {
      this._renderDebug(ctx, state);
    }
    this._ctx.drawImage(this._bufferContext.canvas, 0, 0);
    ctx.restore();
  }
}
