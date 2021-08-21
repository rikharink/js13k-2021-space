import { IStepable } from './../interfaces/stepable';
import { Seconds } from '../types';
import { Player } from './player';
import { CelestialBody } from './celestial-body';
import { applyPhysics } from '../physics/physics';
import { add as vadd, copy, scale, Vector2 } from '../math/vector2';
import {
  CollisionResult,
  handleCollisions,
} from '../physics/collision-handler';
import { Level } from './level';
import { PointerManager } from '../managers/pointer-manager';

interface StateOptions {
  size: Vector2;
  player: Player;
  celestialBodies: CelestialBody[];
}

export class State implements IStepable<CollisionResult> {
  public celestialBodies: CelestialBody[];
  public player: Player;
  public size: Vector2;

  constructor({ size, player, celestialBodies }: StateOptions) {
    this.size = size;
    this.player = player;
    this.celestialBodies = celestialBodies;
  }

  public static fromLevel(pm: PointerManager, level: Level): State {
    let player = new Player(pm);
    copy(player.position, level.spawn);
    return new State({
      size: level.size,
      player: player,
      celestialBodies: level.bodies.map(
        (c) =>
          new CelestialBody(
            copy([0, 0], c.position)!,
            c.radius,
            c.mass,
            c.id,
            copy([0, 0], c.velocity)!,
            copy([0, 0], c.acceleration)!,
            c.bounceDampening,
            c.goal,
          ),
      ),
    });
  }

  public step(dt: Seconds): CollisionResult {
    this.player.step();
    applyPhysics(dt, this);
    const result = handleCollisions(dt, this);
    this.player.saveCurrentPosition();
    return result;
  }

  public clone(): State {
    let state = new State({
      size: copy([0, 0], this.size)!,
      player: this.player.clone(),
      celestialBodies: this.celestialBodies.map((cb) => cb.clone()),
    });
    return state;
  }
}

function add(a: State, b: State): State {
  let s = b.clone();
  vadd(s.player.position, a.player.position, b.player.position);
  vadd(s.player.acceleration!, a.player.acceleration!, b.player.acceleration!);
  vadd(s.player.velocity!, a.player.velocity!, b.player.velocity!);
  return s;
}

function mul(state: State, n: number): State {
  let s = state.clone();
  scale(s.player.position, s.player.position, n);
  scale(s.player.acceleration!, s.player.acceleration!, n);
  scale(s.player.velocity!, s.player.velocity!, n);
  return s;
}

export function blend(previous: State, current: State, alpha: number): State {
  return add(mul(current, alpha), mul(previous, 1 - alpha));
}
