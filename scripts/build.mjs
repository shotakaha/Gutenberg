// Compiles the Sass sources to dist/, expanded and compressed (.min).
//
// Replaces the old gulp pipeline. Uses the `sass` package's CLI via a child
// process — no gulp, no gulp-sass, no tilde importer (the one node_modules
// import is resolved with --load-path).
//
// Usage:
//   node scripts/build.mjs            one-shot build
//   node scripts/build.mjs --watch    rebuild on change (expanded only, like the old `watch`)

import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sassBin = resolve(root, 'node_modules/.bin/sass');

// entrypoint (no leading _) -> output basename under dist/
const targets = {
  'scss/gutenberg.scss': 'dist/gutenberg',
  'scss/themes/book.scss': 'dist/themes/book',
  'scss/themes/modern.scss': 'dist/themes/modern',
  'scss/themes/oldstyle.scss': 'dist/themes/oldstyle',
};

const commonArgs = ['--no-source-map', '--load-path=node_modules'];

function sass(extraArgs) {
  execFileSync(sassBin, [...extraArgs, ...commonArgs], { cwd: root, stdio: 'inherit' });
}

const watch = process.argv.includes('--watch');

if (watch) {
  // Expanded only, matching the old gulp `watch` task.
  const pairs = Object.entries(targets).map(([src, out]) => `${src}:${out}.css`);
  sass(['--watch', '--style=expanded', ...pairs]);
} else {
  const expanded = Object.entries(targets).map(([src, out]) => `${src}:${out}.css`);
  const compressed = Object.entries(targets).map(([src, out]) => `${src}:${out}.min.css`);
  sass(['--style=expanded', ...expanded]);
  sass(['--style=compressed', ...compressed]);
  console.log('Built dist/ (expanded + .min).');
}
