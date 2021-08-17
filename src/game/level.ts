import { Vector2 } from "../math/vector2";
import { Point2D } from "../types";
import { ICelestialBody } from "./celestial-body";

export interface Level {
    size: Vector2;
    spawn: Point2D;
    bodies: ICelestialBody[];
}