import { Scene } from '../game/scene';
import { Vector2 } from './../math/vector2';
import { Point2D } from './../types';

interface RaycastResult {
  hit: boolean;
  origin: Point2D;
  direction: Vector2;
  distance?: number;
}
export function raycast2D(
  origin: Point2D,
  direction: Vector2,
  maxDistance = Number.POSITIVE_INFINITY,
  scene: Scene,
): RaycastResult {
  return { hit: false, origin, direction };
}
