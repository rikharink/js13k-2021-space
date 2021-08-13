import { createFilter } from '@rollup/pluginutils';
import { minify as terse } from 'terser';
import * as fs from 'fs';
import path from 'path';

function formatCode(code) {
  return `export default ${JSON.stringify(code)};`;
}

export default function workerPlugin(
  options = {
    minify,
  },
) {
  const filter = createFilter(/\.(?:awlet|worker)$/);

  return {
    name: 'rollup-plugin-worker',
    async transform(code, id) {
      if (!filter(id)) return;
      let configPath = path.join(process.cwd(), 'terser.config.json');
      let config = await fs.promises.readFile(configPath, 'utf8');
      let terserOptions = JSON.parse(config);
      if (options.minify) {
        const minified = await terse(code, terserOptions);
        return {
          code: formatCode(minified.code),
          map: { mappings: minified.map },
        };
      } else {
        return {
          code: formatCode(code),
          map: { mappings: '' },
        };
      }
    },
  };
}
