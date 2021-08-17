import { Circle } from '../game/circle';
import { TAU } from '../math/math';
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

export function drawArrow(ctx: CanvasRenderingContext2D, start: Point2D, end: Point2D) {
}

