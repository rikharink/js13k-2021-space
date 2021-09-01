import './style/main.css';
import { Game } from './game/game';
import { DEBUG, Settings } from './settings';
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
    } else if (e.key === 's') {
      Settings.speedScale = Settings.speedScale < 1 ? 1 : 0.05;
    } else if (e.key === 'b') {
      Game.currentState.celestialBodies.forEach((cb) => {
        cb.mass = -(cb.mass * 10);
        cb.acceleration = [0, 0];
      });
    } else if (e.key === 'n') {
      Game.nextLevel();
    }
  });
}
