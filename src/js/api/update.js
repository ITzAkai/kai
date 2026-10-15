// Atualização pelo GitHub: lê a última release e, em TVs com Homebrew Channel (root), instala o .ipk
// pelo próprio serviço do Homebrew Channel, que confere o SHA-256 antes de instalar.
import { getJSON } from '../lib/http.js';
import { luna, hasLuna } from '../lib/luna.js';
import * as store from '../lib/store.js';
import { t } from '../lib/i18n.js';

export const REPO = 'creachec/Stremio-Kai-Timeworn';
export const REPO_URL = 'https://github.com/' + REPO;
export const VERSION = __KAI_VERSION__;

function parts(v) {
  return String(v || '0')
    .replace(/^v/i, '')
    .split('.')
    .map((x) => parseInt(x, 10) || 0);
}

export function isNewer(remote, local) {
  const a = parts(remote);
  const b = parts(local);
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if ((a[i] || 0) !== (b[i] || 0)) return (a[i] || 0) > (b[i] || 0);
  }
  return false;
}

// { version, notes, ipkUrl, sha256, pageUrl } da última release (ou null se não houver).
export function latest() {
  return getJSON('https://api.github.com/repos/' + REPO + '/releases/latest', { timeout: 15000, quiet: true }).then((rel) => {
    const assets = (rel && rel.assets) || [];
    const manifest = assets.find((a) => /\.manifest\.json$/.test(a.name));
    const ipk = assets.find((a) => /\.ipk$/.test(a.name));
    if (!manifest || !ipk) return null;
    return getJSON(manifest.browser_download_url, { timeout: 15000, quiet: true }).then((m) => ({
      version: m.version || rel.tag_name,
      notes: rel.body || '',
      ipkUrl: m.ipkUrl || ipk.browser_download_url,
      sha256: m.ipkHash && m.ipkHash.sha256,
      pageUrl: rel.html_url || REPO_URL + '/releases',
    }));
  });
}

export function check() {
  return latest().then((info) => {
    store.saveSettings({ lastUpdateCheck: Date.now() });
    return info && isNewer(info.version, VERSION) ? info : null;
  });
}

// O Homebrew Channel só existe em TVs com root. Sem ele, a atualização é pelo PC (webOS Dev Manager).
export function canSelfUpdate() {
  if (!hasLuna()) return Promise.resolve(false);
  return luna('luna://org.webosbrew.hbchannel.service', 'getConfiguration', {})
    .then(() => true)
    .catch(() => false);
}

// Instala pelo Homebrew Channel; onStatus recebe "Baixando 40%", "Instalando..." etc.
export function install(info, onStatus) {
  return new Promise((resolve, reject) => {
    if (!info.sha256) return reject(new Error(t('Release sem hash SHA-256')));
    const bridge = new window.PalmServiceBridge();
    bridge.onservicecallback = (msg) => {
      let r = {};
      try {
        r = JSON.parse(msg);
      } catch (e) {
        return;
      }
      if (r.returnValue === false) return reject(new Error(r.errorText || t('Falha na instalação')));
      const st = String(r.statusText || '');
      if (onStatus) {
        if (/Download/i.test(st)) onStatus(t('Baixando') + (isFinite(r.progress) ? ' ' + Math.round(r.progress) + '%' : '...'));
        else if (/Verif/i.test(st)) onStatus(t('Conferindo o arquivo...'));
        else if (/Install/i.test(st)) onStatus(t('Instalando...'));
      }
      if (r.finished || /succeeded|Nothing changed/i.test(st)) resolve(st);
    };
    window.__kaiUpdateBridge = bridge; // mantém a referência viva até o fim
    bridge.call(
      'luna://org.webosbrew.hbchannel.service/install',
      JSON.stringify({ id: 'com.kai.stremio', ipkUrl: info.ipkUrl, ipkHash: info.sha256, subscribe: true })
    );
  });
}

// Verificação automática no máximo uma vez por dia.
export function shouldAutoCheck() {
  const last = store.settings().lastUpdateCheck || 0;
  return Date.now() - last > 24 * 3600 * 1000;
}
