export const EPSILON = 0.000001;
export const DEGREE_TO_RADIAN = Math.PI / 180;
export const RADIAN_TO_DEGREE = 180 / Math.PI;
export const TAU = Math.PI * 2;

export type Radian = number;
export type Degree = number;

export function range(start: number, end: number) {
  return Array.from("x".repeat(end - start), (_, i) => start + i);
}

export function lerp(v0: number, v1: number, t: number) {
  return v0 + t * (v1 - v0);
}

export function clamp(min: number, max: number, n: number) {
  return Math.max(min, Math.min(max, n));
}

export function normalize(value: number, min: number, max: number): number {
  return (value - min) / (max - min);
}

const DEFAULT_EPSILON = 1e-5;
const MIN_NORMAL = Math.pow(2, -1022);
export function nearlyEqual(a: number, b: number, epsilon?: number) {
  epsilon = epsilon ?? DEFAULT_EPSILON;
  let diff;
  if (a === b) {
    return true;
  }
  diff = Math.abs(a - b);
  if (a === 0 || b === 0 || diff < MIN_NORMAL) {
    return diff < epsilon * MIN_NORMAL;
  } else {
    return diff / (Math.abs(a) + Math.abs(b)) < epsilon;
  }
}