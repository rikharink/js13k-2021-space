import { Vector2 } from './math/vector2';

export type IDictionary<T> = Partial<{ [key: string]: T }>;

export type Constructor = new (...args: any[]) => {};
export type GConstructor<T = {}> = new (...args: any[]) => T;

export type Milliseconds = number;

export type UUIDV4 = string;
export type Size = [width: number, height: number];
export type Position = [x: number, y: number];

export type RgbColor = [r: number, g: number, b: number];
export type HslColor = [h: number, s: number, l: number];
export type Percentage = number;

export type Seconds = number;
export type Index = number;
export type NormalRange = number;

export type Point2D = Vector2;
