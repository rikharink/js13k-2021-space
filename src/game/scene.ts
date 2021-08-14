import { Seconds } from './../types';
import { ITickable } from './../interfaces/tickable';
import { Player } from './player';
import { Planet } from './planet';

interface SceneOptions {
  player: Player;
  planets: Planet[];
}

export class Scene implements ITickable {
  private readonly _planets: Planet[];
  private readonly _player: Player;

  constructor({ player, planets }: SceneOptions) {
    this._player = player;
    this._planets = planets;
  }

  public tick(t?: Seconds, dt?: Seconds): void {
    this._player.tick(t, dt);
  }

  public get player() {
    return this._player;
  }

  public get planets() {
    return this._planets;
  }
}
