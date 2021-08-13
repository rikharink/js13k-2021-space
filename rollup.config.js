import { join } from "path";
import { defineConfig } from "rollup";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
import livereload from "rollup-plugin-livereload";
import dev from "rollup-plugin-dev";
import postcss from "rollup-plugin-postcss";
import image from "@rollup/plugin-image";
import inline, { defaultTemplate } from "./plugins/rollup-plugin-html-inline";
import packageOutput from "./plugins/rollup-plugin-package-js13k";

const env = process.env.NODE_ENV || "production";
const isDev = env === "development";

let plugins = [
  image(),
  postcss({
    extract: true,
    minimize: true,
    path: "./",
    plugins: [],
  }),
  typescript(),
  terser({
    compress: {
      passes: 4,
      unsafe: true,
      unsafe_arrows: true,
      unsafe_comps: true,
      unsafe_math: true,
    },
    ecma: 11,
    mangle: true,
  }),
  inline({
    title: "SPACE",
    canvasId: "g",
    template: defaultTemplate,
    sourcemap: isDev ? "bundle.js.map" : undefined,
    delete: false,
  }),
  packageOutput({
    name: "js13k-2021-space",
    directory: "dist",
    include: ["index.html"],
    notify: isDev,
  }),
];

if (isDev) {
  plugins.push(
    dev({
      dirs: ["dist"],
    })
  );

  plugins.push(
    livereload({
      watch: "dist",
    })
  );
}

export default defineConfig({
  input: join(__dirname, "src", "index.ts"),
  output: {
    file: join(__dirname, "dist", "bundle.js"),
    format: "iife",
    sourcemap: true,
    strict: false,
  },
  plugins: plugins,
});
