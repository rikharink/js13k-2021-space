import { whiteNoise } from './util';

export function playLaunch(ctx: AudioContext, power: number) {
  const noise = whiteNoise(ctx);
  const filter = ctx.createBiquadFilter();
  const duration = 0.2 * power;
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1000, ctx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(
    2000,
    ctx.currentTime + duration / 4,
  );
  noise.connect(filter);
  filter.connect(ctx.destination);
  noise.start(ctx.currentTime);
  noise.stop(ctx.currentTime + duration);
}
