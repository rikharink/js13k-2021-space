import { Circle } from '../../game/circle';

export function hasCollision(a: Circle, b: Circle): boolean {
  const dx = a.position[0] - b.position[0];
  const dy = a.position[1] - b.position[1];
  const dsquared = dx * dx + dy * dy;
  const r = a.radius + b.radius;
  return dsquared < r * r;
}
