import { ITickable } from './interfaces/tickable';
import { InputManager } from './managers/input-manager';

export class Game implements ITickable {
  public inputManager = new InputManager();

  public constructor() {
    requestAnimationFrame(this.tick.bind(this));
  }

  tick(delta?: number): void {
    console.debug(delta);
  }
}
