import { Random } from '../math/random';
import { subtract, Vector2 } from '../math/vector2';
import { RgbColor, UUIDV4 } from '../types';

export function swap<T>(arr: T[], i: number, j: number): void {
  [arr[j], arr[i]] = [arr[i], arr[j]];
}

export function uuidv4(rand: Random): UUIDV4 {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = (rand.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function hasOwnKey<O>(
  obj: O,
  key: string | number | symbol,
): key is keyof O {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export function rgbaString(color: RgbColor, alpha: number): string {
  return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
}

export function rotateVector(out: Vector2, wh: Vector2) {
  subtract(out, wh, out);
}
