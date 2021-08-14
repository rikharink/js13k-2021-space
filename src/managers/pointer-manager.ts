import { Game } from '../game';
import { Point2D } from './../types';
export class PointerManager {
  private _position?: Point2D;

  constructor() {
    document.addEventListener(
      'pointermove',
      this._handlePointerMove.bind(this),
    );
  }

  public get position(): Point2D | undefined {
    return this._position;
  }

  private _handlePointerMove(ev: PointerEvent) {
    this._position = this.scalePosition(Game.canvas, [ev.clientX, ev.clientY]);
  }

  private scalePosition(canvas: HTMLCanvasElement, pos: Point2D): Point2D {
    let rect = canvas.getBoundingClientRect(),
      scaleX = canvas.width / rect.width,
      scaleY = canvas.height / rect.height;
    return [(pos[0] - rect.left) * scaleX, (pos[1] - rect.top) * scaleY];
  }
}
