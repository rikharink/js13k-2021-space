import { Scene } from '../game/scene';

export interface IRenderer {
  set fps(fps: number);
  render(scene: Scene): void;
}
