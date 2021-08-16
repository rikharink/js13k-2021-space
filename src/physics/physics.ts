import { Circle } from "../game/circle";
import { Scene } from "../game/scene";
import { add, distance_squared, normalize, scale, subtract, Vector2 } from "../math/vector2";
import { Settings } from "../settings";
import { Milliseconds } from "../types";

function velocityVerlet(dt: Milliseconds, scene: Scene) {
    const tmp: Vector2 = [0, 0];
    const new_pos = add(
        tmp,
        scene.player.position,
        add(
            tmp,
            scale(tmp, scene.player.velocity, dt),
            scale(tmp, scene.player.acceleration, dt * dt * 0.5),
        ),
    );

    const new_acc = scale(tmp, normalize(
        tmp,
        subtract(tmp, scene.attraction.position, scene.player.position),
    ), getGravitationalForce(scene.player, scene.attraction));

    const new_vel = add(
        tmp,
        scene.player.velocity,
        scale(tmp, add(tmp, scene.player.acceleration, new_acc), dt * 0.5),
    );

    scene.player.position = new_pos;
    scene.player.acceleration = new_acc;
    scene.player.velocity = new_vel;
}

function semiImplicitEuler(dt: Milliseconds, scene: Scene) {
    const tmp: Vector2 = [0, 0];
    scale(scene.player.acceleration, normalize(
        tmp,
        subtract(tmp, scene.attraction.position, scene.player.position),
    ), getGravitationalForce(scene.player, scene.attraction));
    add(scene.player.velocity, scene.player.velocity, scale(tmp, scene.player.acceleration, dt));
    add(scene.player.position, scene.player.position, scale(tmp, scene.player.velocity, dt));
}

export function applyPhysics(dt: Milliseconds, scene: Scene) {
    semiImplicitEuler(dt, scene);
}

export function getGravitationalForce(a: Circle, b: Circle): number {
    const ds = distance_squared(b.position, a.position);
    return ds !== 0 ? Settings.G * (b.mass / ds) : 0;
}

