import { Scene } from '../game/scene';

export interface IRenderer {
  set currentScene(scene: Scene);
  set fps(fps: number);
  render(): void;
}
