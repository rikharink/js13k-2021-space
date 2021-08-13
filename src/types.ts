import {
  KeyboardInput,
  PointerInput,
  MouseInput,
  GamepadInput,
} from './interfaces/game-input';

export type IDictionary<T> = Partial<{ [key: string]: T }>;

export type Constructor = new (...args: any[]) => {};
export type GConstructor<T = {}> = new (...args: any[]) => T;

export type Milliseconds = number;

export type UUIDV4 = string;
export type Random = () => number;
export type Size = [width: number, height: number];
export type Position = [x: number, y: number];

export type RgbColor = [r: number, g: number, b: number];
export type HslColor = [h: number, s: number, l: number];
export type Percentage = number;

export type GamepadButtonType = 'gamepadbuttondown' | 'gamepadbuttonup';
export type GamepadAxisType = 'gamepadaxischanged';
export type GamepadEventType = GamepadButtonType | GamepadAxisType;
export type Action = string;
export type KeyboardEventType = 'keyup' | 'keydown' | 'keypress';
export type MouseEventType =
  | 'mousedown'
  | 'mouseenter'
  | 'mouseleave'
  | 'mousemove'
  | 'mouseup'
  | 'mouseover'
  | 'mouseout'
  | 'mousewheel';
export type PointerEventType =
  | 'pointercancel'
  | 'pointerdown'
  | 'pointerenter'
  | 'pointerleave'
  | 'pointermove'
  | 'pointerout'
  | 'pointerover'
  | 'pointerup';
export type EventTypes =
  | KeyboardEventType
  | MouseEventType
  | PointerEventType
  | GamepadEventType;
export type Input = KeyboardInput | PointerInput | MouseInput | GamepadInput;

export type SoundContext = AudioContext | OfflineAudioContext;
export const A = 0;
type A = 0;
export const As = 1;
type As = 1;
export const Bf = 1;
type Bf = 1;
export const B = 2;
type B = 2;
export const C = 3;
type C = 3;
export const Cs = 4;
type Cs = 4;
export const Df = 4;
type Df = 4;
export const D = 5;
type D = 5;
export const Ds = 6;
type Ds = 6;
export const E = 7;
type E = 7;
export const F = 8;
type F = 8;
export const Fs = 9;
type Fs = 9;
export const Gf = 9;
type Gf = 9;
export const G = 10;
type G = 10;
export const Gs = 11;
type Gs = 11;
export const Af = 11;
type Af = 11;

export type Note =
  | A
  | As
  | Bf
  | B
  | C
  | Cs
  | Df
  | D
  | Ds
  | E
  | F
  | Fs
  | Gf
  | G
  | Gs
  | Af;

export type Octave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type Tone = { note: Note; octave: Octave };
export type Chord = Tone[];
export type Mode = 'major' | 'minor';
export type Frequency = number;
export type Seconds = number;
export type Index = number;
export type NormalRange = number;
