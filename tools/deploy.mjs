// Instala o .ipk na TV com root (Homebrew Channel) via SSH e abre o app.
// Uso: TV_IP=192.168.x.y npm run deploy
// Requer: Homebrew Channel com SSH ligado e sua chave pública em /home/root/.ssh/authorized_keys da TV.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tv = process.env.TV_IP;
if (!tv) {
  console.error('Defina o IP da TV: TV_IP=192.168.x.y npm run deploy');
  process.exit(1);
}
const key = process.env.TV_KEY || path.join(os.homedir(), '.ssh', 'webos_tv');
const appinfo = JSON.parse(fs.readFileSync(path.join(root, 'appinfo.json'), 'utf8'));
const ipkName = `${appinfo.id}_${appinfo.version}_all.ipk`;
const ipk = path.join(root, 'out', ipkName);
const sshOpts = ['-i', key, '-o', 'BatchMode=yes', '-o', 'ConnectTimeout=10', '-o', 'StrictHostKeyChecking=accept-new'];
// O luna-send da TV só imprime respostas com um terminal (TTY) alocado.
const sshTty = ['-tt', ...sshOpts];

function run(cmd, args, opts) {
  console.log('$', cmd, args.filter((a) => a !== key).join(' '));
  return execFileSync(cmd, args, { stdio: opts && opts.capture ? 'pipe' : 'inherit', encoding: 'utf8' });
}

execFileSync(process.execPath, [path.join(root, 'tools', 'build.mjs')], { stdio: 'inherit' });
const aresPackage = path.join(root, 'node_modules', '@webos-tools', 'cli', 'bin', 'ares-package.js');
run(process.execPath, [aresPackage, path.join(root, 'dist'), '-o', path.join(root, 'out')], { capture: true });
if (!fs.existsSync(ipk)) throw new Error('IPK não encontrado: ' + ipk);

run('scp', [...sshOpts, ipk, `root@${tv}:/tmp/${ipkName}`]);
// Instalação pelo serviço de dev da TV; espera o "installed" na assinatura.
const install =
  `luna-send -n 40 -w 120000 'luna://com.webos.appInstallService/dev/install' ` +
  `'{"id":"com.ares.defaultName","ipkUrl":"/tmp/${ipkName}","subscribe":true}' | ` +
  `grep -m1 -E '"state": ?"(installed|install failed|failed)"|errorText|"returnValue": ?false'; rm -f /tmp/${ipkName}; exit`;
const out = run('ssh', [...sshTty, `root@${tv}`, install], { capture: true });
const state = (out.match(/"state":\s*"([^"]+)"/) || [])[1] || out.trim().slice(0, 300);
console.log('Estado da instalação:', state);
if (!/^installed$/.test(state)) {
  console.error('A instalação não confirmou "installed".');
  process.exit(1);
}
// Fecha a versão antiga, se estiver aberta, e abre a nova.
run('ssh', [...sshTty, `root@${tv}`, `luna-send -n 1 'luna://com.webos.applicationManager/closeByAppId' '{"id":"${appinfo.id}"}' >/dev/null; sleep 1; luna-send -n 1 'luna://com.webos.applicationManager/launch' '{"id":"${appinfo.id}"}'; exit`]);
console.log(`\nInstalado e aberto na TV ${tv}.`);
