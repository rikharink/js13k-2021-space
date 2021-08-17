import { MonetizationObject } from '@webmonetization/types'

/* IMAGES */
declare module '*.svg' {
  const ref: string;
  export default ref;
}

declare module '*.bmp' {
  const ref: string;
  export default ref;
}

declare module '*.gif' {
  const ref: string;
  export default ref;
}

declare module '*.jpg' {
  const ref: string;
  export default ref;
}

declare module '*.jpeg' {
  const ref: string;
  export default ref;
}

declare module '*.png' {
  const ref: string;
  export default ref;
}

/* SHADERS */
declare module '*.vert.glsl' {
  const ref: string;
  export default ref;
}

declare module '*.frag.glsl' {
  const ref: string;
  export default ref;
}

/* AUDIO */
declare module '*.awlet' {
  const ref: string;
  export default ref;
}

/* LEVELS */
declare module '*.lvl.json' {
  const ref: Level;
  export default ref;
}

declare global {
  interface Document {
    monetization?: MonetizationObject
  }
}
