import { Circle } from '../game/circle';
import { State } from '../game/state';
import {
  add,
  copy,
  distance_squared,
  normalize,
  scale,
  subtract,
  Vector2,
} from '../math/vector2';
import { Settings } from '../settings';
import { Milliseconds } from '../types';

function semiImplicitEuler(dt: Milliseconds, state: State) {
  const tmp: Vector2 = [0, 0];
  copy(state.player.previousPosition, state.player.position);
  scale(
    state.player.acceleration,
    normalize(
      tmp,
      subtract(tmp, state.attraction.position, state.player.position),
    ),
    getGravitationalForce(state.player, state.attraction),
  );
  add(
    state.player.velocity,
    state.player.velocity,
    scale(tmp, state.player.acceleration, dt),
  );
  add(
    state.player.position,
    state.player.position,
    scale(tmp, state.player.velocity, dt),
  );
}

export function applyPhysics(dt: Milliseconds, state: State) {
  semiImplicitEuler(dt, state);
}

export function getGravitationalForce(a: Circle, b: Circle): number {
  const ds = distance_squared(b.position, a.position);
  return ds !== 0 ? Settings.G * (b.mass / ds) : 0;
}
