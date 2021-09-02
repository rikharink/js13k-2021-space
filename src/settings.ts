export const DEBUG = process.env.NODE_ENV === 'development';

export const Settings = {
  resolution: [1920, 1080],
  tps: 164,
  canvasId: 'g',
  seed: 'HAR-INK-IPTS',
  planetWeightScaling: 3000,
  G: 0.8,
  nrOfBackgroundStars: 2000,
  playerRadius: 5,
  playerMass: 0,
  launchForceMultiplier: 1300,
  speedScale: 1,
  flagmastLength: 45,
  flagLength: 18,
  trailSize: 50,
  futureSize: 125,
  maxAwayCount: 1000,
  safeAreaInsets: [200, 25, 1334, 725],
  localStoragePrefix: 'HAR-INK-IPTS-',
  muted: false,
};
