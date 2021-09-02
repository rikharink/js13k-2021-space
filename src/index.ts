import './style/main.css';
import { Game } from './game/game';
import { DEBUG, Settings } from './settings';
import { CanvasRecorder } from './debug/canvas-recorder';
Game.start();

//AUTO SAVE GAME
setInterval(() => {
  Game.dehydrate();
}, 10_000);

window.addEventListener('unload', () => {
  Game.dehydrate();
});

window.addEventListener('keypress', (e: KeyboardEvent) => {
  if (e.key === 'r') {
    Game.resetLevel();
  } else if (e.key === 'm') {
    Settings.muted = !Settings.muted;
  } else if (DEBUG && e.key === 'n') {
    Game.nextLevel();
  } else if (DEBUG && e.key === 'k') {
    Game.reset();
  }
});
