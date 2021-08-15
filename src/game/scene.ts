import { Vector3 } from './../math/vector3';
import { Seconds, Random } from './../types';
import { ITickable } from './../interfaces/tickable';
import { Player } from './player';
import { Planet } from './planet';

interface SceneOptions {
  width: number;
  height: number;
  player: Player;
  planets: Planet[];
  numberOfStars?: number;
  rng: Random;
}

export class Scene implements ITickable {
  private readonly _planets: Planet[];
  private readonly _stars: Vector3[] = [];
  private readonly _player: Player;

  constructor({
    width,
    height,
    player,
    planets,
    numberOfStars = 200,
    rng,
  }: SceneOptions) {
    this._player = player;
    this._planets = planets;
    for (; numberOfStars > 0; numberOfStars--) {
      this._stars.push([rng() * width, rng() * height, rng() * 1.2]);
    }
  }

  public tick(t: Seconds, dt: Seconds): void {
    this._player.tick(t, dt);
  }

  public get player() {
    return this._player;
  }

  public get planets() {
    return this._planets;
  }

  public get stars() {
    return this._stars;
  }
}
