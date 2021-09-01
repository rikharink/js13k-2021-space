import './style/main.css';
import { Game, resetGame } from './game/game';
import { DEBUG } from './settings';
import { CanvasRecorder } from './debug/canvas-recorder';
Game.start();

if (DEBUG) {
  const w = <any>window;
  w.recorder = () =>
    new CanvasRecorder(<HTMLCanvasElement>document.getElementById('g'));
  document.addEventListener('keypress', (e: KeyboardEvent) => {
    if (e.key === 'r') {
      Game.resetLevel();
    } else if (e.key === 'p') {
      Game.isActive ? Game.stop() : Game.start();
    } else if (e.key === 'o') {
      if (!w.recording) {
        w.recording = true;
        w.vcr = w.recorder();
        w.vcr.startRecording();
      } else if (w.recording) {
        w.recording = false;
        w.vcr.stopRecording();
        w.vcr.download('IPTS-demo.webm');
        delete w.vcr;
      }
    } else if (e.key === 'n') {
      Game.nextLevel();
    } else if (e.key === 'k') {
      resetGame();
      Game.start();
    }
  });
}
