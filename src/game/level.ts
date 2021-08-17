import { Point2D } from "../types";
import { ICelestialBody } from "./celestial-body";

export interface Level {
    width: number;
    height: number;
    spawn: Point2D;
    bodies: ICelestialBody[];
}