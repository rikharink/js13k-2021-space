import { Circle } from '../geometry/circle';
import { Line } from '../geometry/line';
import { TAU } from '../math/math';
import { add, normalize, perpendicular, scale, subtract, Vector2 } from '../math/vector2';
import { Settings } from '../settings';
import { Point2D, RgbColor } from '../types';
import { rgbaString } from '../util/util';

export function drawCircle(
  ctx: CanvasRenderingContext2D,
  circle: Circle,
  color: RgbColor,
): void {
  ctx.fillStyle = rgbaString(color, 1);
  ctx.beginPath();
  ctx.arc(circle.position[0], circle.position[1], circle.radius, 0, TAU);
  ctx.closePath();
  ctx.fill();
}

export function drawLine(
  ctx: CanvasRenderingContext2D,
  start: Point2D,
  end: Point2D,
  color: RgbColor,
): void {
  ctx.lineWidth = 1;
  ctx.lineCap = 'round';
  ctx.strokeStyle = rgbaString(color, 1);
  ctx.beginPath();
  ctx.moveTo(start[0], start[1]);
  ctx.lineTo(end[0], end[1]);
  ctx.closePath();
  ctx.stroke();
}

export function drawArrow(ctx: CanvasRenderingContext2D, start: Point2D, end: Point2D, color: RgbColor) {
  drawLine(ctx, start, end, color);
}

export function drawFlag(ctx: CanvasRenderingContext2D, line: Line, color: RgbColor) {
  drawLine(ctx, line.start, line.end, color);
  let tmp: Vector2 = [0, 0];
  line.lengthen(-Settings.flagLength);
  let mp = line.midpoint();
  let vec = perpendicular([0, 0], normalize(tmp, subtract(tmp, line.start, line.end)));
  let tip = add([0, 0], mp, scale(tmp, vec, Settings.flagLength));
  ctx.fillStyle = rgbaString(color, 1);
  ctx.beginPath();
  ctx.moveTo(line.start[0], line.start[1]);
  ctx.lineTo(tip[0], tip[1]);
  ctx.lineTo(line.end[0], line.end[1]);
  ctx.lineTo(line.start[0], line.start[1]);
  ctx.closePath();
  ctx.fill();
}