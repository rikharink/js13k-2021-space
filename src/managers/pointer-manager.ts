import { Game } from '../game';
import { Point2D } from './../types';
export class PointerManager {
  private _position?: Point2D;
  private _state: boolean = false;

  constructor() {
    window.addEventListener('pointerdown', this._handlePointerEvent.bind(this));
    window.addEventListener('pointermove', this._handlePointerEvent.bind(this));
    window.addEventListener('pointerup', this._handlePointerEvent.bind(this));
    window.addEventListener('blur', this._clearState.bind(this));
  }

  public get position(): Point2D | undefined {
    return this._position;
  }

  private _clearState() {
    this._state = false;
  }

  private _handlePointerEvent(ev: PointerEvent) {
    this._position = this.scalePosition(Game.canvas, [ev.clientX, ev.clientY]);
    this._state = !!ev.buttons;
  }

  private scalePosition(canvas: HTMLCanvasElement, pos: Point2D): Point2D {
    let rect = canvas.getBoundingClientRect(),
      scaleX = canvas.width / rect.width,
      scaleY = canvas.height / rect.height;
    return [(pos[0] - rect.left) * scaleX, (pos[1] - rect.top) * scaleY];
  }

  public isActive(): boolean {
    return this._state;
  }
}
