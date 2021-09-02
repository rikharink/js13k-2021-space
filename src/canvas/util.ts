import { DEGREE_TO_RADIAN, Radian } from './../math/math';
import { Point2D, RgbColor } from './../types';
import { OrientedRectangle } from './../geometry/oriented-rectangle';
import { Circle } from '../geometry/circle';
import { Line } from '../geometry/line';
import { TAU } from '../math/math';
import {
  length,
  add,
  normalize,
  perpendicular,
  scale,
  subtract,
  Vector2,
} from '../math/vector2';
import { Settings } from '../settings';
import { rgbaString } from '../util/util';
import { create, from_rotation, transform_point } from '../math/matrix2d';
import { splitRgb } from '../math/color';
import { palette } from '../palette';
import { PhysicsCircle } from '../game/physics-circle';

export function drawCircle(
  ctx: CanvasRenderingContext2D,
  circle: Circle,
  color: RgbColor,
  alpha: number = 1,
): void {
  ctx.fillStyle = rgbaString(color, alpha);
  ctx.beginPath();
  ctx.arc(circle.position[0], circle.position[1], circle.radius, 0, TAU);
  ctx.closePath();
  ctx.fill();
}

export function drawLine(
  ctx: CanvasRenderingContext2D,
  line: Line,
  color: RgbColor,
  lineWidth: number = 1,
): void {
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.strokeStyle = rgbaString(color, 1);
  ctx.beginPath();
  ctx.moveTo(line.start[0], line.start[1]);
  ctx.lineTo(line.end[0], line.end[1]);
  ctx.closePath();
  ctx.stroke();
}

export function drawArrow(
  ctx: CanvasRenderingContext2D,
  line: Line,
  color: RgbColor,
  lineWidth: number,
) {
  drawCircle(ctx, new Circle(line.start, lineWidth), color);
  const v = normalize([0, 0], subtract([0, 0], line.end, line.start));
  const rot1 = from_rotation(create(), 135 * DEGREE_TO_RADIAN);
  const rot2 = from_rotation(create(), -135 * DEGREE_TO_RADIAN);
  const v1 = transform_point([0, 0], v, rot1);
  const v2 = transform_point([0, 0], v, rot2);
  scale(v1, v1, 10);
  scale(v2, v2, 10);
  const arrowOne = new Line(line.end, add([0, 0], line.end, v1));
  const arrowTwo = new Line(line.end, add([0, 0], line.end, v2));
  drawLine(ctx, line, color, lineWidth);
  drawLine(ctx, arrowOne, color, lineWidth);
  drawLine(ctx, arrowTwo, color, lineWidth);
}

export function drawFlag(
  ctx: CanvasRenderingContext2D,
  text: string,
  line: Line,
  angle: Radian,
  color: RgbColor,
) {
  if (Settings.flagmastLength === 0) {
    return;
  }
  drawLine(ctx, line, color);
  let tmp: Vector2 = [0, 0];
  ctx.save();
  ctx.font = 'bold 16px sans-serif';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  text = `  ${text}  `;
  const textMeasure = ctx.measureText(text);
  ctx.restore();
  line.lengthen(-Settings.flagLength);
  let mp = line.midpoint;
  let vec = perpendicular(
    [0, 0],
    normalize(tmp, subtract(tmp, line.start, line.end)),
  );
  let tip = add(
    [0, 0],
    mp,
    scale(tmp, vec, Settings.flagLength / 1.5 + textMeasure.width),
  );

  let startTip = add([0, 0], line.start, scale(tmp, vec, textMeasure.width));
  let endTip = add([0, 0], line.end, scale(tmp, vec, textMeasure.width));
  ctx.fillStyle = rgbaString(splitRgb(palette[1]), 1);
  ctx.beginPath();
  ctx.moveTo(line.start[0], line.start[1]);
  ctx.lineTo(startTip[0], startTip[1]);
  ctx.lineTo(tip[0], tip[1]);
  ctx.lineTo(endTip[0], endTip[1]);
  ctx.lineTo(line.end[0], line.end[1]);
  ctx.closePath();
  ctx.fill();

  ctx.save();
  const mp2 = new Line(mp, new Line(startTip, endTip).midpoint).midpoint;
  ctx.translate(mp2[0], mp2[1]);
  ctx.rotate(0.5 * Math.PI + angle);
  ctx.translate(-mp2[0], -mp2[1]);
  ctx.font = 'bold 18px sans-serif';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, mp2[0], mp2[1]);
  ctx.restore();
}

export function drawOrientedRectangle(
  ctx: CanvasRenderingContext2D,
  rect: OrientedRectangle,
  color: RgbColor,
  dashed: boolean = false,
) {
  const rotationMatrix = from_rotation(create(), rect.orientation);
  const o: Vector2 = [0, 0];
  const hx = rect.halfExtends[0];
  const hy = rect.halfExtends[1];
  let tmp: Vector2 = [0, 0];
  const p1 = add(
    [0, 0],
    rect.position,
    transform_point(tmp, add(tmp, o, [-hx, -hy]), rotationMatrix),
  );
  const p2 = add(
    [0, 0],
    rect.position,
    transform_point(tmp, add(tmp, o, [-hx, hy]), rotationMatrix),
  );

  const p3 = add(
    [0, 0],
    transform_point(tmp, add(tmp, o, [hx, hy]), rotationMatrix),
    rect.position,
  );
  const p4 = add(
    [0, 0],
    transform_point(tmp, add(tmp, o, [hx, -hy]), rotationMatrix),
    rect.position,
  );

  ctx.lineCap = 'round';
  ctx.strokeStyle = rgbaString(color, 1);
  dashed && ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(p1[0], p1[1]);
  ctx.lineTo(p2[0], p2[1]);
  ctx.lineTo(p3[0], p3[1]);
  ctx.lineTo(p4[0], p4[1]);
  ctx.closePath();
  ctx.stroke();
}

interface ColorSettings {
  background: RgbColor;
  foreground: RgbColor;
  text: RgbColor;
}

export function drawPercentagebar(
  ctx: CanvasRenderingContext2D,
  percentage: number,
  label: string,
  position: Point2D,
  { foreground, background, text }: ColorSettings,
) {
  ctx.font = 'normal 12px sans-serif';
  ctx.fillStyle = rgbaString(background, 1);
  ctx.fillRect(position[0], position[1], 100, 20);
  ctx.fillStyle = rgbaString(foreground, 1);
  ctx.fillRect(position[0], position[1], percentage, 20);
  ctx.fillStyle = rgbaString(text, 1);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.strokeText(label, position[0] + 108, position[1] + 14);
  ctx.fillText(label, position[0] + 108, position[1] + 14);
}

export function drawIconButton(ctx: CanvasRenderingContext2D, label: string) {
  ctx.save();
  ctx.restore();
}

export function drawVelocity(ctx: CanvasRenderingContext2D, o: PhysicsCircle) {
  if (!o.velocity) return;
  const normalizedVelocity = normalize([0, 0], o.velocity);
  const line = new Line(
    o.position,
    add(
      [0, 0],
      o.position,
      scale([0, 0], normalizedVelocity, 100 * length(normalizedVelocity)),
    ),
  );
  drawArrow(ctx, line, splitRgb(palette[0]), 2);
}
