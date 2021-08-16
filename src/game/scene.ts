import { Seconds, Random } from './../types';
import { ITickable } from './../interfaces/tickable';
import { Player } from './player';
import { CelestialBody } from './celestial-body';
import { applyPhysics, getGravitationalForce } from '../physics/physics';
import { add as vadd, scale } from '../math/vector2';

interface SceneOptions {
  width: number;
  height: number;
  player: Player;
  celestialBodies: CelestialBody[];
}
export class Scene implements ITickable<void> {
  public readonly celestialBodies: CelestialBody[];
  public readonly player: Player;
  public readonly width: number;
  public readonly height: number;
  public attraction!: CelestialBody;

  constructor({
    width,
    height,
    player,
    celestialBodies,
  }: SceneOptions) {
    this.width = width;
    this.height = height;
    this.player = player;
    this.celestialBodies = celestialBodies;
  }

  public clone(): Scene {
    let scene = new Scene({ width: this.width, height: this.height, player: this.player.clone(), celestialBodies: this.celestialBodies.map(cb => cb.clone()) });
    scene.attraction = this.attraction?.clone();
    return scene;
  }

  public updateAttraction(): CelestialBody {
    let mostAttractive: CelestialBody | undefined = undefined;
    let maxF = Number.NEGATIVE_INFINITY;

    for (let planet of this.celestialBodies) {
      let f = getGravitationalForce(this.player, planet);
      if (f >= maxF) {
        maxF = f;
        mostAttractive = planet;
      }
    }
    return mostAttractive!;
  }

  public tick(t: Seconds, dt: Seconds) {
    this.player.tick(t, dt);
    this.attraction = this.updateAttraction();
    applyPhysics(dt, this);
  }
}

function add(a: Scene, b: Scene): Scene {
  let s = b.clone();
  vadd(s.player.position, a.player.position, b.player.position);
  vadd(s.player.acceleration, a.player.acceleration, b.player.acceleration);
  vadd(s.player.velocity, a.player.velocity, b.player.velocity);
  s.updateAttraction();
  return s
}

function mul(scene: Scene, n: number): Scene {
  let s = scene.clone();
  scale(s.player.position, s.player.position, n);
  scale(s.player.acceleration, s.player.acceleration, n);
  scale(s.player.velocity, s.player.velocity, n);
  s.updateAttraction();
  return s;
}

export function blend(previous: Scene | undefined, current: Scene, alpha: number): Scene {
  if (!previous) return current;
  return add(mul(current, alpha), mul(previous, 1 - alpha));
}