import './style/main.css';
import { Game } from './game';
import { Settings } from './settings';
import { CanvasRecorder } from './debug/canvas-recorder';
//@ts-ignore
import level1 from './game/levels/level1.lvl.json';

Game.start();

if (Settings.debug) {
    const w = <any>window;
    w.recorder = () => new CanvasRecorder(<HTMLCanvasElement>document.getElementById('g'));
    document.addEventListener('keypress', (e: KeyboardEvent) => {
        if (e.key === 'r') {
            Game.loadLevel(level1);
        }
        else if (e.key === 'p') {
            Game.isActive ? Game.stop() : Game.start();
        }
        else if (e.key === 'o') {
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
        }
    });
}
