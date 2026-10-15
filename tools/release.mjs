// Gera os arquivos de uma release para o GitHub em release/:
//   - com.kai.stremio_<versão>_all.ipk        (o app)
//   - stremio-kai-timeworn.manifest.json      (versão + URL + SHA-256, usado por "Procurar atualização"
//                                              e compatível com o formato de repositório do Homebrew Channel)
// Build limpo: sem log remoto, sem chaves de API, sem atalhos de desenvolvedor.
import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const appinfo = JSON.parse(fs.readFileSync(path.join(root, 'appinfo.json'), 'utf8'));
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const repo = 'creachec/Stremio-Kai-Timeworn';
const tag = 'v' + appinfo.version;
const out = path.join(root, 'release');
const ipkName = `${appinfo.id}_${appinfo.version}_all.ipk`;

const env = { ...process.env };
delete env.KAI_DEVLOG;
delete env.KAI_TMDB;
delete env.KAI_MDBLIST;

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
execFileSync(process.execPath, [path.join(root, 'tools', 'build.mjs')], { stdio: 'inherit', env });

const bundle = fs.readFileSync(path.join(root, 'dist', 'app.js'), 'utf8');
// Procura IPs de rede local reais (o texto de exemplo dos Ajustes é ignorado).
const leftover = bundle.replace(/ex\.: 192\.168\.\d+\.\d+/g, '').match(/\b192\.168\.\d+\.\d+|\b10\.\d+\.\d+\.\d+:\d+/);
if (leftover) {
  console.error('Encontrado no bundle:', leftover[0]);
  throw new Error('O bundle de release contém resto de configuração de desenvolvimento.');
}

execFileSync(process.execPath, [path.join(root, 'node_modules', '@webos-tools', 'cli', 'bin', 'ares-package.js'), path.join(root, 'dist'), '-o', out], {
  stdio: 'pipe',
});
const ipk = fs.readFileSync(path.join(out, ipkName));
const sha256 = crypto.createHash('sha256').update(ipk).digest('hex');

const manifest = {
  id: appinfo.id,
  version: appinfo.version,
  type: 'web',
  title: appinfo.title,
  appDescription: pkg.description,
  iconUri: `https://raw.githubusercontent.com/${repo}/main/src/static/largeIcon.png`,
  sourceUrl: `https://github.com/${repo}`,
  rootRequired: false,
  ipkUrl: `https://github.com/${repo}/releases/download/${tag}/${ipkName}`,
  ipkHash: { sha256: sha256 },
};
fs.writeFileSync(path.join(out, 'stremio-kai-timeworn.manifest.json'), JSON.stringify(manifest, null, 2) + '\n');

console.log(`\nRelease ${tag} pronta em release/:`);
console.log(`  ${ipkName}  (${(ipk.length / 1024).toFixed(0)} KB, sha256 ${sha256})`);
console.log('  stremio-kai-timeworn.manifest.json');
console.log(`\nNo GitHub: crie a release com a tag ${tag} e anexe os dois arquivos.`);
