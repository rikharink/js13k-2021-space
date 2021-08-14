import { PointerManager } from './../managers/pointer-manager';
import { TAU } from './../math/math';
import { background, palette } from '../palette';
import { RgbColor, Point2D, Seconds } from './../types';
import { Scene } from '../game/scene';
import { Settings } from '../settings';
import { IRenderer } from '../interfaces/renderer';
import { splitRgb } from '../math/color';
import { Circle } from '../game/circle';
import { Game } from '../game';

export class CanvasRenderer implements IRenderer {
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  private _scene?: Scene;
  private _bg: RgbColor;

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._canvas.width = Settings.resolution[0];
    this._canvas.height = Settings.resolution[1];
    this._ctx = this._canvas.getContext('2d')!;
    this._bg = splitRgb(background);
  }

  set currentScene(scene: Scene) {
    this._scene = scene;
  }

  rgbaString(color: RgbColor, alpha: number): string {
    return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
  }

  private drawCircle(circle: Circle, color: RgbColor) {
    const ctx = this._ctx;
    ctx.fillStyle = this.rgbaString(color, 1);
    ctx.beginPath();
    ctx.arc(circle.center[0], circle.center[1], circle.radius, 0, TAU);
    ctx.closePath();
    ctx.fill();
  }

  private drawLine(start: Point2D, end: Point2D, color: RgbColor) {
    const ctx = this._ctx;
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    ctx.strokeStyle = this.rgbaString(color, 1);
    ctx.beginPath();
    ctx.moveTo(start[0], start[1]);
    ctx.lineTo(end[0], end[1]);
    ctx.closePath();
    ctx.stroke();
  }

  render(t?: Seconds, dt?: Seconds): void {
    const ctx = this._ctx;
    //DRAW BACKGROUND
    ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    ctx.fillStyle = this.rgbaString(this._bg, 1);
    ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);

    //DRAW SCENE
    if (this._scene) {
      for (let planet of this._scene.planets ?? []) {
        this.drawCircle(planet, planet.color);
      }
      this.drawCircle(this._scene.player, this._scene.player.color);

      if (this._scene.player.attraction) {
        this.drawLine(
          this._scene.player.center,
          this._scene.player.attraction.center,
          splitRgb(palette[1]),
        );
      }
    }

    // if (Settings.debug && Game.pointerManager.position) {
    //   this.drawCircle(
    //     new Circle(Game.pointerManager.position, 10),
    //     splitRgb(palette[0]),
    //   );
    // }
  }
}
