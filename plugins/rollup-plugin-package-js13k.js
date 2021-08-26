import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { execFile } from 'child_process';
import notifier from 'node-notifier';
import filesize from 'filesize';
import zipstats from 'zipstats';
import ect from 'ect-bin';
import chalk from 'chalk';

async function pack(data) {
  const inputs = [
    {
      data: data,
      type: 'text',
      action: 'write',
    },
  ];
  const options = {
    maxMemoryMB: 150,
  };
  const packer = new Packer(inputs, options);
  await packer.optimize();
  const packed = packer.makeDecoder();
  return packed.firstLine + '\n' + packed.secondLine;
}

function notifyFilesize(title, path, notify) {
  const stat = fs.statSync(path);
  const size = filesize(stat.size);
  const percentage = ((stat.size / 13312) * 100).toFixed(2);
  console.log(zipstats(path));
  const message = `total zipsize: ${size} [${percentage}%]\n`;
  console.log(
    percentage <= 100 ? chalk.blue.bold(message) : chalk.red.bold(message),
  );

  if (notify) {
    notifier.notify({
      title: title,
      message: `${size} [${percentage}%]`,
      wait: false,
      sound: false,
    });
  }
}

export default function packageJs13k(
  options = {
    name: '',
    directory: '',
    notify: false,
    include: undefined,
    exclude: undefined,
  },
) {
  return {
    name: 'rollup-plugin-package-js13k',
    writeBundle(_, bundle) {
      return new Promise((resolve, reject) => {
        const archive = archiver('zip', {
          zlib: { level: 9 }, // Sets the compression level.
        });
        const outputPath = path.join(options.directory, `${options.name}.zip`);
        const output = fs.createWriteStream(outputPath);
        output.on('close', () => {
          execFile(ect, ['-9', outputPath], (err) => {
            if (err) {
              reject(err);
            } else {
              notifyFilesize('Archive Size', outputPath, options.notify);
              resolve();
            }
          });
        });
        archive.pipe(output);

        Object.keys(bundle).forEach((k) => {
          const entry = bundle[k];
          const include =
            !options.include || options.include.includes(entry.fileName);
          const exclude =
            !options.exclude || !options.include.includes(entry.fileName);
          const process = include && exclude;
          if (process) {
            if (entry.type === 'asset') {
              const { source } = entry;
              if (source) {
                const buffer = Buffer.from(source, 'utf8');
                archive.append(buffer, { name: entry.fileName });
              }
            } else {
              const { code } = entry;
              if (code) {
                const buffer = Buffer.from(code, 'utf8');
                archive.append(buffer, { name: entry.fileName });
              }
            }
          }
        });
        archive.finalize();
      });
    },
  };
}
