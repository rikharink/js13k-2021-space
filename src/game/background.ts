import { splitRgb } from '../math/color';
import { Vector3 } from '../math/vector3';
import { palette } from '../palette';
import { Random } from '../types';
import { rgbaString } from '../util/util';

export function renderBackground(
  width: number,
  height: number,
  rng: Random,
  stars: number,
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.id = 'bg';
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  const backgroundStars: Vector3[] = [];
  for (; stars > 0; stars--) {
    backgroundStars.push([rng() * width, rng() * height, rng() * 1.2]);
  }

  ctx.fillStyle = rgbaString(splitRgb(palette[5]), 1);
  ctx.fillRect(0, 0, width, height);
  for (let star of backgroundStars ?? []) {
    ctx.beginPath();
    ctx.arc(star[0], star[1], star[2], 0, 360);
    ctx.fillStyle = rgbaString(splitRgb(palette[0]), 0.8);
    ctx.fill();
  }
  return canvas;
}
