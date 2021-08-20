import { Settings } from "../settings";
import { CelestialBody } from "./celestial-body";
import { Rectangle } from "../geometry/rectangle";

export function getGoalBoundingBox(cb: CelestialBody): Rectangle | undefined {
    if (!cb.goal) return;
    //TODO;
}