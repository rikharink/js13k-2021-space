import { State } from '../game/state';

export interface IRenderer {
  render(state: State): void;
}
