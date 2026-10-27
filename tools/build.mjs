// Build: esbuild junta os módulos, Babel reescreve para Chromium 38 (webOS 3.x).
import { build, context } from 'esbuild';
import { transformAsync } from '@babel/core';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'src');
const dist = path.join(root, 'dist');
const watch = process.argv.includes('--watch');

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, entry.name);
    const b = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(a, b);
    else fs.copyFileSync(a, b);
  }
}

async function downlevel(code) {
  const out = await transformAsync(code, {
    babelrc: false,
    configFile: false,
    sourceType: 'script',
    compact: false,
    presets: [['@babel/preset-env', { targets: { chrome: '38' }, modules: false, bugfixes: true }]],
  });
  return out.code;
}

const esbuildOptions = {
  entryPoints: [path.join(src, 'js', 'main.js')],
  bundle: true,
  format: 'iife',
  target: 'es2020',
  write: false,
  charset: 'utf8',
  legalComments: 'none',
  // KAI_DEVLOG=http://IP-DO-PC:8099/log liga o log remoto já no build (útil no deploy).
  // KAI_TMDB / KAI_MDBLIST: chaves de API opcionais embutidas no build (evita digitar na TV).
  define: {
    __KAI_DEVLOG__: JSON.stringify(process.env.KAI_DEVLOG || ''),
    __KAI_TMDB__: JSON.stringify(process.env.KAI_TMDB || ''),
    __KAI_MDBLIST__: JSON.stringify(process.env.KAI_MDBLIST || ''),
    __KAI_VERSION__: JSON.stringify(JSON.parse(fs.readFileSync(path.join(root, 'appinfo.json'), 'utf8')).version),
  },
  logLevel: 'warning',
};

async function emit(result) {
  fs.rmSync(dist, { recursive: true, force: true });
  fs.mkdirSync(dist, { recursive: true });
  copyDir(path.join(src, 'static'), dist);
  fs.copyFileSync(path.join(root, 'appinfo.json'), path.join(dist, 'appinfo.json'));
  const fonts = path.join(root, 'node_modules', '@fontsource', 'montserrat', 'files');
  fs.mkdirSync(path.join(dist, 'fonts'), { recursive: true });
  for (const w of [400, 600, 700, 800]) {
    for (const sub of ['latin', 'latin-ext']) {
      for (const ext of ['woff2', 'woff']) {
        const f = `montserrat-${sub}-${w}-normal.${ext}`;
        fs.copyFileSync(path.join(fonts, f), path.join(dist, 'fonts', f));
      }
    }
  }
  // Nata Sans: fonte de legenda do Kai (mpv.conf: sub-font='Nata Sans', sub-bold=yes).
  const nata = path.join(root, 'node_modules', '@fontsource', 'nata-sans', 'files');
  for (const w of [500, 700]) {
    for (const sub of ['latin', 'latin-ext']) {
      for (const ext of ['woff2', 'woff']) {
        const f = `nata-sans-${sub}-${w}-normal.${ext}`;
        fs.copyFileSync(path.join(nata, f), path.join(dist, 'fonts', f));
      }
    }
  }
  const code = await downlevel(result.outputFiles[0].text);
  fs.writeFileSync(path.join(dist, 'app.js'), code);
  // Guarda simples: nada de sintaxe que o Chromium 38 não entende pode sobrar.
  for (const bad of ['=>', 'async function']) {
    if (code.includes(bad)) {
      const i = code.indexOf(bad);
      console.warn(`[aviso] "${bad}" ainda aparece no bundle perto de: ${code.slice(i - 60, i + 40).replace(/\n/g, ' ')}`);
    }
  }
  console.log(`[build] dist/app.js ${(code.length / 1024).toFixed(0)} KB`);
  // Phone remote: the TizenBrew service (Node 4 on the TV) with the phone page built in.
  const page = fs.readFileSync(path.join(src, 'remote', 'remote.html'), 'utf8');
  const service = fs.readFileSync(path.join(root, 'service', 'remote-service.js'), 'utf8');
  fs.writeFileSync(path.join(dist, 'remote-service.js'), 'var REMOTE_PAGE = ' + JSON.stringify(page) + ';\n' + service);
  console.log('[build] dist/remote-service.js (phone remote service)');
}

if (watch) {
  const ctx = await context({
    ...esbuildOptions,
    plugins: [{ name: 'emit', setup(b) { b.onEnd((r) => { if (!r.errors.length) emit(r).catch(console.error); }); } }],
  });
  await ctx.watch();
  console.log('[build] observando src/ ...');
} else {
  await emit(await build(esbuildOptions));
}
