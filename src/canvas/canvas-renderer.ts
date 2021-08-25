import { Player } from './../game/player';
import { palette } from '../palette';
import { State } from '../game/state';
import { DEBUG, Settings } from '../settings';
import { IRenderer } from '../interfaces/renderer';
import { splitRgb } from '../math/color';
import { rgbaString } from '../util/util';
import {
  drawArrow,
  drawCircle,
  drawFlag,
  drawLine,
  drawPercentagebar,
} from './util';
import { renderBackground } from '../game/background';
import { Random } from '../types';
import { add, scale, subtract, Vector2, normalize } from '../math/vector2';
import { Line } from '../geometry/line';
import { Circle } from '../geometry/circle';

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
        drawFlag(ctx, new Line(start, end), splitRgb(palette[2]));
      }
    }
  }

  private _renderPlayer(ctx: CanvasRenderingContext2D, state: State) {
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
      state.player.launchPower
    ) {
      let tmp: Vector2 = [0, 0];
      const start = state.player.position;
      const end = add(
        tmp,
        start,
        scale(tmp, state.player.launchVector, 100 * state.player.launchPower),
      );
      drawArrow(
        ctx,
        new Line(state.player.position, end),
        splitRgb(palette[2]),
      );
      this._renderFuture(ctx, state);
    }
  }

  private _renderFuture(ctx: CanvasRenderingContext2D, state: State) {
    for (let pos of state.future) {
      drawCircle(ctx, new Circle(pos, 1), splitRgb(palette[0]));
    }
  }

  private _renderUi(ctx: CanvasRenderingContext2D, state: State) {
    const txt = splitRgb(palette[0]);
    const colors = {
      foreground: splitRgb(palette[1]),
      background: splitRgb(palette[3]),
      text: txt,
    };

    ctx.font = 'normal 32px sans-serif';
    ctx.fillStyle = rgbaString(txt, 1);
    const totalLaunchesText = `${state.player.totalLaunches}`;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.strokeText(totalLaunchesText, 8, 32);
    ctx.fillText(totalLaunchesText, 8, 32);

    if (state.player.holeLaunches > 0) {
      const m = ctx.measureText(totalLaunchesText);
      const holeLaunchesText = `${state.player.holeLaunches > 0 ? '+' : ''}${
        state.player.holeLaunches
      }`;
      ctx.strokeText(holeLaunchesText, m.width + 24, 32);
      ctx.fillText(holeLaunchesText, m.width + 24, 32);
    }
    let x = 8;
    let y = Settings.resolution[1] - 28;
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
  }

  public render(state: State) {
    const ctx = this._bufferContext;
    ctx.drawImage(this._background, 0, 0);
    this._renderCelestialBodies(ctx, state);
    this._renderPlayer(ctx, state);
    this._renderUi(ctx, state);
    this._ctx.drawImage(this._bufferContext.canvas, 0, 0);
  }
}
