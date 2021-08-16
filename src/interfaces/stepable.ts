import { Seconds } from '../types';

export interface IStepable<T> {
  step(dt: Seconds): T;
}
