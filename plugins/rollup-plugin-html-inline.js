import { minify } from 'html-minifier';

export const defaultTemplate = (options, script, sourcemap, style) =>
  `${options.meta.join('')}
  <title>${options.title}</title>
  ${options.scripts.map((s) => `<script src="${s}"></script>`).join('')}
<style>${style}</style>
<canvas id="${options.canvasId}"></canvas>
<script>${script.trim()}${
    sourcemap ? '//# sourceMappingURL=' + sourcemap : ''
  }</script>`;

export default function inline(
  options = {
    title: 'js13k-2021-SPACE',
    canvasId: 'g',
    template: undefined,
    sourcemap: undefined,
    delete: false,
    meta: [],
    scripts: [],
  },
) {
  return {
    name: 'rollup-plugin-html-inline',
    generateBundle(_, bundle, isWrite) {
      if (!isWrite) return;
      const renderTemplate = options.template || defaultTemplate;
      const scripts = [];
      const styles = [];

      Object.keys(bundle).forEach((o) => {
        const entry = bundle[o];
        if (entry.fileName.endsWith('js')) {
          scripts.push(entry.type == 'chunk' ? entry.code : entry.source);
        } else if (entry.fileName.endsWith('css')) {
          styles.push(entry.type == 'chunk' ? entry.code : entry.source);
        }
        if (options.delete) {
          delete bundle[o];
        }
      });

      let source = minify(
        renderTemplate(
          options,
          scripts.join(),
          options.sourcemap,
          styles.join(),
        ),
        {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          html5: true,
        },
      );

      const output = {
        fileName: 'index.html',
        name: 'index',
        source: source,
        type: 'asset',
      };
      this.emitFile(output);
    },
  };
}
