// In-app updater. TizenBrew loads this app from jsDelivr's copy of the GitHub repository, which can
// lag the repository by hours. Each build writes dist/build.json with its build id; the app compares
// its own id with the one on GitHub, and "update" clears jsDelivr's copy so a reload gets the new one.
import { getJSON } from '../lib/http.js';
import * as store from '../lib/store.js';

export const REPO = 'ITzAkai/stremio-kai-tizen';
export const REPO_URL = 'https://github.com/' + REPO;
export const VERSION = __KAI_VERSION__;
export const BUILD = __KAI_BUILD__; // ISO time of this build

const RAW = 'https://raw.githubusercontent.com/' + REPO + '/main/';
const PURGE = 'https://purge.jsdelivr.net/gh/' + REPO + '/';
// Everything TizenBrew fetches for this module.
const FILES = ['package.json', 'dist/index.html', 'dist/loader.js', 'dist/app.js', 'dist/app.css', 'dist/remote-service.js', 'dist/build.json'];

// { build, version, message, date } of the newest build on GitHub.
export function latest() {
  const bust = '?t=' + Date.now();
  return Promise.all([
    getJSON(RAW + 'dist/build.json' + bust, { timeout: 15000, quiet: true }),
    getJSON('https://api.github.com/repos/' + REPO + '/commits?per_page=1', { timeout: 15000, quiet: true }).catch(() => null),
  ]).then((r) => {
    const b = r[0] || {};
    const c = r[1] && r[1][0] && r[1][0].commit;
    return {
      build: b.build,
      version: b.version || VERSION,
      message: c ? String(c.message).split('\n')[0] : '',
      date: (c && c.committer && c.committer.date) || b.build,
    };
  });
}

// The newest build when it differs from (and is newer than) the running one, else null.
export function check() {
  return latest().then((info) => {
    store.saveSettings({ lastUpdateCheck: Date.now() });
    return info.build && info.build !== BUILD && Date.parse(info.build) > Date.parse(BUILD) ? info : null;
  });
}

// loader.js starts the newest commit by itself, so a reload is the update. Clearing jsDelivr
// still helps TizenBrew's own copies (start page, phone remote service); it's rate-limited, so
// failures don't matter.
export function apply() {
  return Promise.all(FILES.map((f) => getJSON(PURGE + f, { timeout: 8000, quiet: true }).catch(() => null))).then(() => {
    window.location.reload();
    return true;
  });
}

// Automatic check at most once a day.
export function shouldAutoCheck() {
  const last = store.settings().lastUpdateCheck || 0;
  return Date.now() - last > 24 * 3600 * 1000;
}
