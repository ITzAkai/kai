// Publica uma versão nova no GitHub de uma vez:
//   node tools/publish.mjs 1.0.1 [release/NOTES.md]
// 1) atualiza a versão em appinfo.json e package.json   2) gera release/ (.ipk + manifesto SHA-256)
// 3) commit + tag vX.Y.Z + push                          4) cria a release no GitHub com os arquivos
// Requer o GitHub CLI autenticado (gh auth login). As TVs com Homebrew Channel recebem o aviso de
// atualização em Ajustes → Procurar atualização.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const version = process.argv[2];
const notesFile = process.argv[3] || path.join(root, 'release', 'NOTES.md');
if (!/^\d+\.\d+\.\d+$/.test(version || '')) {
  console.error('Uso: node tools/publish.mjs X.Y.Z [arquivo-de-notas.md]');
  process.exit(1);
}

const gh = fs.existsSync('C:\\Program Files\\GitHub CLI\\gh.exe') ? 'C:\\Program Files\\GitHub CLI\\gh.exe' : 'gh';
const run = (cmd, args, opts) => execFileSync(cmd, args, { cwd: root, stdio: 'inherit', ...opts });
const out = (cmd, args) => execFileSync(cmd, args, { cwd: root, encoding: 'utf8' }).trim();

if (out('git', ['status', '--porcelain', '--untracked-files=no'])) {
  console.error('Há alterações não commitadas. Faça o commit das mudanças antes de publicar.');
  process.exit(1);
}
const tag = 'v' + version;
if (out('git', ['tag', '--list', tag])) {
  console.error(`A tag ${tag} já existe.`);
  process.exit(1);
}

// 1) versão
for (const f of ['appinfo.json', 'package.json']) {
  const p = path.join(root, f);
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  j.version = version;
  fs.writeFileSync(p, JSON.stringify(j, null, 2) + '\n');
}

// 2) artefatos (as notas ficam fora de release/, que é recriada pelo build)
const notes = fs.existsSync(notesFile) ? fs.readFileSync(notesFile, 'utf8') : `Stremio Kai Timeworn ${version}`;
run(process.execPath, [path.join(root, 'tools', 'release.mjs')]);
const notesTmp = path.join(root, 'release', 'NOTES.md');
fs.writeFileSync(notesTmp, notes);

// 3) commit + tag + push
run('git', ['add', 'appinfo.json', 'package.json']);
run('git', ['commit', '-m', `Release ${tag}\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`]);
run('git', ['tag', '-a', tag, '-m', `Stremio Kai Timeworn ${version}`]);
run('git', ['push', 'origin', 'HEAD', '--follow-tags']);

// 4) release no GitHub
const files = fs.readdirSync(path.join(root, 'release')).filter((f) => /\.ipk$|\.manifest\.json$/.test(f));
run(gh, ['release', 'create', tag, ...files.map((f) => path.join('release', f)), '--title', `Stremio Kai Timeworn ${version}`, '--notes-file', notesTmp]);
console.log(`\nPublicado: https://github.com/creachec/Stremio-Kai-Timeworn/releases/tag/${tag}`);
