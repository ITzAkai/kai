// Lists UI phrases (t('...') calls) that have no English or Arabic translation.
// The keys are the app's internal Portuguese base text, so a missing one would show in Portuguese.
// Usage: node tools/check-i18n.mjs
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const load = async (f) => {
  const p = path.join(root, 'src/js/lib', f);
  return fs.existsSync(p) ? import(pathToFileURL(p).href) : {};
};
const EN = (await load('i18n-en.js')).EN || {};
const AR = (await load('i18n-ar.js')).AR || {};

const used = new Map();
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (p.endsWith('.js') && !/i18n(-en|-ar)?\.js$/.test(p)) {
      const src = fs.readFileSync(p, 'utf8');
      const re = /\bt\(\s*(['"])((?:(?!\1)[^\\]|\\.)*)\1/g;
      let m;
      while ((m = re.exec(src))) used.set(m[2].replace(/\\(['"])/g, '$1'), path.basename(p));
    }
  }
};
walk(path.join(root, 'src/js'));

const noEn = [...used].filter(([k]) => !(k in EN));
const noAr = [...used].filter(([k]) => !(k in AR));
console.log(`phrases used: ${used.size}, missing English: ${noEn.length}, missing Arabic: ${noAr.length}`);
for (const [k, f] of noEn) console.log(`  EN  ${f}: ${k}`);
for (const [k, f] of noAr) console.log(`  AR  ${f}: ${k}`);
process.exit(noEn.length ? 1 : 0);
