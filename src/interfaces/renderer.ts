import { State } from '../game/state';

export interface IRenderer {
  set fps(fps: number);
  render(state: State): void;
}
