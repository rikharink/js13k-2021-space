import { whiteNoise } from './util';

export function playLaunch(ctx: AudioContext) {
  const noise = whiteNoise(ctx);
  noise.connect(ctx.destination);
  noise.start(ctx.currentTime);
  noise.stop(ctx.currentTime + 1000);
}
