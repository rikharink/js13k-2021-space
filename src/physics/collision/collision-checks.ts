import { Circle } from '../../geometry/circle';
import { Line } from '../../geometry/line';
import { OrientedRectangle } from '../../geometry/oriented-rectangle';
import { Rectangle } from '../../geometry/rectangle';
import {
  create,
  from_rotation,
  Matrix2D,
  transform_point,
} from '../../math/matrix2d';
import { add, scale, subtract } from '../../math/vector2';

export function hasCircleCircleCollision(a: Circle, b: Circle): boolean {
  const dx = a.position[0] - b.position[0];
  const dy = a.position[1] - b.position[1];
  const dsquared = dx * dx + dy * dy;
  const r = a.radius + b.radius;
  return dsquared < r * r;
}

export function hasCircleRectangleCollision(
  circle: Circle,
  rect: Rectangle,
): boolean {
  const [cx, cy] = circle.position;
  const [rx, ry] = rect.position;
  const [rw, rh] = rect.size;
  let testX = cx;
  let testY = cy;
  if (cx < rx) testX = rx;
  else if (cx > rx + rw) testX = rx + rw;
  if (cy < ry) testY = ry;
  else if (cy > ry + rh) testY = ry + rh;
  let l = new Line([cx, cy], [testX, testY]);
  return l.length_squared <= circle.radius * circle.radius;
}

export function hasCircleOrientedRectangleCollision(
  circle: Circle,
  rect: OrientedRectangle,
): boolean {
  const r = subtract([0, 0], circle.position, rect.position);
  const theta = -rect.orientation;
  const rotation: Matrix2D = create();
  from_rotation(rotation, theta);
  transform_point(r, r, rotation);
  const lCircle = new Circle(add([0, 0], r, rect.halfExtends), circle.radius);
  const lRect = new Rectangle([0, 0], scale([0, 0], rect.halfExtends, 2));

  return hasCircleRectangleCollision(lCircle, lRect);
}
