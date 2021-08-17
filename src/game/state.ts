import { IStepable } from './../interfaces/stepable';
import { Seconds } from '../types';
import { Player } from './player';
import { CelestialBody } from './celestial-body';
import { applyPhysics, getGravitationalForce } from '../physics/physics';
import { add as vadd, copy, scale } from '../math/vector2';
import { handleCollisions } from '../physics/collision-handler';
import { Level } from './level';
import { PointerManager } from '../managers/pointer-manager';

interface StateOptions {
  width: number;
  height: number;
  player: Player;
  celestialBodies: CelestialBody[];
}

export class State implements IStepable<void> {
  public celestialBodies: CelestialBody[];
  public player: Player;
  public width: number;
  public height: number;
  public attraction!: CelestialBody;

  constructor({ width, height, player, celestialBodies }: StateOptions) {
    this.width = width;
    this.height = height;
    this.player = player;
    this.celestialBodies = celestialBodies;
  }

  public static fromLevel(pm: PointerManager, level: Level): State {
    let player = new Player(pm);
    copy(player.position, level.spawn);
    console.debug(level);
    return new State({
      width: level.width,
      height: level.height,
      player: player,
      celestialBodies: level.bodies.map(c => new CelestialBody(c.position, c.radius, c.mass, c.id))
    });
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

  public step(dt: Seconds) {
    this.player.tick();
    this.attraction = this.updateAttraction();
    applyPhysics(dt, this);
    handleCollisions(dt, this);
  }

  public clone(): State {
    let state = new State({
      width: this.width,
      height: this.height,
      player: this.player.clone(),
      celestialBodies: this.celestialBodies.map((cb) => cb.clone()),
    });
    state.attraction = this.attraction?.clone();
    return state;
  }
}

function add(a: State, b: State): State {
  let s = b.clone();
  vadd(s.player.position, a.player.position, b.player.position);
  vadd(s.player.acceleration, a.player.acceleration, b.player.acceleration);
  vadd(s.player.velocity, a.player.velocity, b.player.velocity);
  s.updateAttraction();
  return s;
}

function mul(state: State, n: number): State {
  let s = state.clone();
  scale(s.player.position, s.player.position, n);
  scale(s.player.acceleration, s.player.acceleration, n);
  scale(s.player.velocity, s.player.velocity, n);
  s.updateAttraction();
  return s;
}

export function blend(previous: State, current: State, alpha: number): State {
  return add(mul(current, alpha), mul(previous, 1 - alpha));
}
