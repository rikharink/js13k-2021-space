import { State } from '../game/state';

export interface IRenderer {
  render(state: State, tutorialDone: boolean): void;
}
