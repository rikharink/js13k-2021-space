import { OrientedRectangle } from './../geometry/oriented-rectangle';
import { Settings } from '../settings';
import { CelestialBody } from './celestial-body';
import {
  abs,
  add,
  normalize,
  perpendicular,
  scale,
  subtract,
  Vector2,
} from '../math/vector2';
import { Line } from '../geometry/line';

export function getGoalHitbox(cb: CelestialBody): OrientedRectangle {
  const orientation = cb.goal!;
  let tmp: Vector2 = [0, 0];
  const p1 = cb.getPoint(orientation);
  const p2 = add(
    [0, 0],
    p1,
    scale(
      tmp,
      normalize(tmp, subtract(tmp, p1, cb.position)),
      Settings.flagmastLength,
    ),
  );
  const vec = perpendicular([0, 0], subtract(tmp, p1, p2));
  scale(vec, vec, Settings.flagLength);
  const p3 = add([0, 0], p2, vec);
  const l = new Line(p1, p3);
  const mp = l.midpoint;
  return new OrientedRectangle(
    mp,
    [Settings.flagmastLength / 2, Settings.flagLength / 2],
    orientation,
  );
}
