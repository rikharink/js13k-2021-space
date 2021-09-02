import { swap } from '../util/util';
import { mergeRgb } from './color';
import { TAU, Radian } from './math';

//ADAPTED FROM: https://github.com/straker/kontra/blob/main/src/helpers.js
/*
The MIT License (MIT)
Copyright (c) 2015 Steven Lambert

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
type Rand = () => number;

export class Random {
  private _currentSeed!: number;

  constructor(seed: string) {
    this.reseed(seed);
  }

  public reseed(seed: string): void {
    this._currentSeed = this.getSeed(seed);
    this.random();
  }

  private getSeed(seed: string): number {
    for (var i = 0, h = 2166136261 >>> 0; i < seed.length; i++) {
      h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
    }
    h += h << 13;
    h ^= h >>> 7;
    h += h << 3;
    h ^= h >>> 17;
    return (h += h << 5) >>> 0;
  }

  public random() {
    if (!this) console.trace();
    this._currentSeed = Math.imul(48271, this._currentSeed);
    return ((2 ** 31 - 1) & this._currentSeed) / 2 ** 31;
  }

  public get currentSeed(): number {
    return this._currentSeed;
  }

  public set currentSeed(seed: number) {
    this._currentSeed = seed;
  }

  public getRandom(min: number, max: number): number {
    return this.random() * (max - min + 1) + min;
  }

  public getRandomInt(min: number, max: number): number {
    return Math.floor(this.getRandom(Math.ceil(min), Math.floor(max)));
  }

  public getDie(max: number): Rand {
    return () => this.getRandomInt(1, max);
  }

  public shuffle<T>(arr: Array<T>): void {
    for (let i = 0; i < arr.length - 2; i++) {
      swap(arr, i, this.getRandomInt(i, arr.length - 1));
    }
  }

  public getRandomElement<T>(arr: Array<T>): T {
    return arr[this.getRandomInt(0, arr.length)];
  }

  public getRandomColor(): number {
    const r = this.getRandomInt(0, 255);
    const g = this.getRandomInt(0, 255);
    const b = this.getRandomInt(0, 255);
    return mergeRgb([r, g, b]);
  }

  public getRandomAngle(): Radian {
    return this.getRandom(0, TAU);
  }
}
