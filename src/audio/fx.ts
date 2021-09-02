//@ts-ignore
import { zzfx } from './zzfx.js';
import { Settings } from '../settings.js';

export function playLaunch() {
  if (!zzfx || Settings.muted) return;
  zzfx(
    ...[
      0.8,
      ,
      250,
      0.01,
      ,
      0.01,
      ,
      0.2,
      -0.2,
      -4,
      -50,
      -0.32,
      0.01,
      ,
      ,
      ,
      0.09,
      0.98,
      0.04,
      0.06,
    ],
  );
}

export function playStarHit() {
  if (!zzfx || Settings.muted) return;
  zzfx(
    ...[
      0.6,
      ,
      438,
      ,
      0.04,
      0.4,
      2,
      1.78,
      ,
      6.8,
      ,
      ,
      ,
      0.3,
      -6.2,
      0.5,
      0.04,
      0.8,
      0.05,
    ],
  );
}

export function playGoalHit() {
  if (!zzfx || Settings.muted) return;
  zzfx(
    ...[
      0.8,
      ,
      158,
      ,
      0.2,
      0.55,
      1,
      1.53,
      0.7,
      3,
      -104,
      0.08,
      0.09,
      ,
      ,
      0.1,
      ,
      0.77,
      0.09,
      0.19,
    ],
  );
}

export function playBounce() {
  if (!zzfx || Settings.muted) return;
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
