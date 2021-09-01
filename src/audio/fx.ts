import { whiteNoise } from './util';

//@ts-ignore
import { zzfx } from './zzfx.js';

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

export function playGolfBounce() {
  if (!zzfx) return;
  zzfx(
    ...[
      ,
      0.15,
      261.6256,
      0.03,
      ,
      0.08,
      ,
      1.2,
      -0.2,
      -0.1,
      -50,
      ,
      -0.01,
      -0.2,
      ,
      ,
      ,
      1.1,
      ,
      0.17,
    ],
  );
}
