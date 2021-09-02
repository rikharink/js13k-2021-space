import { IStepable } from './../interfaces/stepable';
import { Point2D, Seconds } from '../types';
import { Player } from './player';
import { CelestialBody, ICelestialBody } from './celestial-body';
import { applyPhysics, predictFuture } from '../physics/physics';
import {
  add as vadd,
  copy,
  normalize,
  scale,
  subtract,
  Vector2,
} from '../math/vector2';
import {
  CollisionResult,
  handleCollisions,
} from '../physics/collision-handler';
import { Level } from './level';
import { Settings } from '../settings';

interface StateOptions {
  size: Vector2;
  player: Player;
  celestialBodies: CelestialBody[];
  currentLevel?: number;
  spawnPlanet: CelestialBody;
  goalPlanet: CelestialBody;
}

export class State implements IStepable<CollisionResult> {
  public celestialBodies: CelestialBody[];
  public player: Player;
  public size: Vector2;
  public future: Point2D[] = [];
  public currentLevel: number;
  public spawnPlanet: CelestialBody;
  public goalPlanet: CelestialBody;
  private _lastBounce: number = 0;

  private constructor({
    size,
    player,
    celestialBodies,
    currentLevel,
    spawnPlanet,
    goalPlanet,
  }: StateOptions) {
    this.size = size;
    this.player = player;
    this.celestialBodies = celestialBodies;
    this.currentLevel = currentLevel ?? 1;
    this.spawnPlanet = spawnPlanet;
    this.goalPlanet = goalPlanet;
  }

  public static createCelestialBody(c: ICelestialBody): CelestialBody {
    return new CelestialBody(
      copy([0, 0], c.position)!,
      c.radius,
      c.id,
      copy([0, 0], c.velocity)!,
      copy([0, 0], c.acceleration)!,
      c.bounceDampening,
      c.goal,
      c.moons,
      c.isStar,
      c.isMoon,
    );
  }

  public getGoalTop() {
    const goal = this.goalPlanet.getPoint(this.goalPlanet.goal!);
    return vadd(
      goal,
      goal,
      scale(
        [0, 0],
        normalize([0, 0], subtract([0, 0], goal, this.goalPlanet.position)),
        Settings.flagmastLength,
      ),
    );
  }

  public static fromLevel(level: Level, player: Player): State {
    copy(player.position, level.spawn);
    const state = new State({
      currentLevel: level.number,
      size: level.size,
      player: player,
      celestialBodies: level.bodies.map(State.createCelestialBody),
      spawnPlanet: State.createCelestialBody(
        level.spawnPlanet ?? level.bodies[0],
      ),
      goalPlanet: State.createCelestialBody(
        level.goalPlanet ?? level.bodies[level.bodies.length - 1],
      ),
    });

    for (let cb of state.celestialBodies) {
      try {
        for (let moonId of cb.moons) {
          const moon = state.celestialBodies.find((i) => i.id === moonId);
          if (moon) {
            cb.addMoon(moon);
          }
        }
      } catch {}
    }
    return state;
  }

  public step(dt: Seconds): CollisionResult {
    this.player.step();
    applyPhysics(dt, this);
    const result = handleCollisions(this);
    this.player.saveCurrentPosition();
    this.future = predictFuture(this, dt);
    return result;
  }

  public clone(): State {
    let state = new State({
      size: copy([0, 0], this.size)!,
      player: this.player.clone(),
      celestialBodies: this.celestialBodies.map((cb) => cb.clone()),
      currentLevel: this.currentLevel,
      spawnPlanet: this.spawnPlanet.clone(),
      goalPlanet: this.goalPlanet.clone(),
    });
    state.future = [...this.future.map((f) => copy([0, 0], f)!)];
    state._lastBounce = this._lastBounce;
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
