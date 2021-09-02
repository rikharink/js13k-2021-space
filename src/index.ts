import './style/main.css';
import { Game } from './game/game';
import { DEBUG } from './settings';
import { CanvasRecorder } from './debug/canvas-recorder';
Game.start();

//AUTO SAVE GAME
setInterval(() => {
  Game.dehydrate();
}, 10_000);

window.addEventListener('unload', () => {
  Game.dehydrate();
});

if (DEBUG) {
  window.addEventListener('keypress', (e: KeyboardEvent) => {
    if (e.key === 'r') {
      Game.resetLevel();
    } else if (e.key === 'p') {
      Game.isActive ? Game.stop() : Game.start();
    } else if (e.key === 'n') {
      Game.nextLevel();
    } else if (e.key === 'k') {
      Game.reset();
    } else if (e.key === 'd') {
      Game.dumpLevel();
    }
  });
}
