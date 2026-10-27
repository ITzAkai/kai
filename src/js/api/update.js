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
const CDN = 'https://cdn.jsdelivr.net/gh/' + REPO + '/';
const PURGE = 'https://purge.jsdelivr.net/gh/' + REPO + '/';
// Everything TizenBrew fetches for this module.
const FILES = ['package.json', 'dist/index.html', 'dist/app.js', 'dist/app.css', 'dist/remote-service.js', 'dist/build.json'];

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

// Clears jsDelivr's cached copy, waits until it serves the new build, then reloads the app.
// Resolves false if jsDelivr still has the old build after a minute (it can lag a little).
export function apply(info) {
  return Promise.all(FILES.map((f) => getJSON(PURGE + f, { timeout: 20000, quiet: true }).catch(() => null))).then(() => {
    let tries = 0;
    const poll = () =>
      getJSON(CDN + 'dist/build.json?t=' + Date.now(), { timeout: 15000, quiet: true })
        .catch(() => ({}))
        .then((b) => {
          if (b.build === info.build) {
            window.location.reload();
            return true;
          }
          if (++tries >= 6) return false;
          return new Promise((r) => setTimeout(r, 10000)).then(poll);
        });
    return poll();
  });
}

// Automatic check at most once a day.
export function shouldAutoCheck() {
  const last = store.settings().lastUpdateCheck || 0;
  return Date.now() - last > 24 * 3600 * 1000;
}
