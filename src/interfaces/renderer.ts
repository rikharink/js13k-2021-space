import { Scene } from '../game/scene';
import { Seconds } from './../types';

export interface IRenderer {
  set currentScene(scene: Scene);
  render(t?: Seconds, dt?: Seconds): void;
}
