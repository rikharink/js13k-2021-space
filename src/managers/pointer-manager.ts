import { EventEmitter } from './../util/event-emitter';
import { Point2D } from './../types';
export class PointerManager extends EventEmitter<boolean> {
  private _canvas: HTMLCanvasElement;
  public position?: Point2D;
  private _state: boolean = false;

  constructor(canvas: HTMLCanvasElement) {
    super();
    this._canvas = canvas;
    window.addEventListener('pointerdown', this._handlePointerEvent.bind(this));
    window.addEventListener('pointermove', this._handlePointerEvent.bind(this));
    window.addEventListener('pointerup', this._handlePointerEvent.bind(this));
    window.addEventListener('blur', this._clearState.bind(this));
  }

  private _clearState() {
    this._state = false;
  }

  private _handlePointerEvent(ev: PointerEvent) {
    this.position = this.scalePosition(this._canvas, [ev.clientX, ev.clientY]);
    this._state = !!ev.buttons;
    
    this.emit(this._state);
  }

  private scalePosition(canvas: HTMLCanvasElement, pos: Point2D): Point2D {
    let rect = canvas.getBoundingClientRect(),
      scaleX = canvas.width / rect.width,
      scaleY = canvas.height / rect.height;
    return [(pos[0] - rect.left) * scaleX, (pos[1] - rect.top) * scaleY];
  }

  public hasInput(): boolean {
    return this._state;
  }
}
