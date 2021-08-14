import { Circle } from '../../game/circle';

export function hasCollision(a: Circle, b: Circle): boolean {
  const dx = a.center[0] - b.center[0];
  const dy = a.center[1] - b.center[1];
  const dsquared = dx * dx + dy * dy;
  const r = a.radius + b.radius;
  return dsquared < r * r;
}
