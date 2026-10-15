// Conta Stremio: login, addons instalados e biblioteca (mesma API do app oficial).
import { postJSON, getJSON } from '../lib/http.js';
import * as store from '../lib/store.js';
import { log } from '../lib/log.js';
import { t } from '../lib/i18n.js';

const API = 'https://api.strem.io/api/';
const LINK = 'https://link.stremio.com/api/v2/';

let auth = store.get('auth', null); // { authKey, user } do perfil ativo

// Recarrega conta e biblioteca do perfil ativo (chamado ao escolher o perfil na abertura).
export function reloadProfile() {
  auth = store.get('auth', null);
  libMem = null;
}

function call(method, body) {
  return postJSON(API + method, body).then((res) => {
    if (res && res.error) {
      const err = new Error(res.error.message || t('Erro da API Stremio'));
      err.code = res.error.code;
      throw err;
    }
    return res ? res.result : null;
  });
}

export function isLoggedIn() {
  return !!(auth && auth.authKey);
}

export function user() {
  return auth ? auth.user : null;
}

export function authKey() {
  return auth ? auth.authKey : null;
}

function saveAuth(result) {
  auth = { authKey: result.authKey, user: result.user || null };
  store.set('auth', auth);
  return auth;
}

export function login(email, password) {
  return call('login', { type: 'Login', email: email, password: password, facebook: false }).then(saveAuth);
}

// Login por código: o usuário abre link.stremio.com no celular e digita o código.
export function createLinkCode() {
  return getJSON(LINK + 'create?type=Create').then((res) => {
    if (!res || !res.result || !res.result.code) throw new Error(t('Não foi possível gerar o código'));
    return res.result;
  });
}

export function readLinkCode(code) {
  return getJSON(LINK + 'read?type=Read&code=' + encodeURIComponent(code), { quiet: true }).then((res) => {
    if (res && res.result && res.result.authKey) {
      saveAuth({ authKey: res.result.authKey, user: null });
      return refreshUser().then(() => true);
    }
    return false;
  });
}

export function refreshUser() {
  if (!isLoggedIn()) return Promise.resolve(null);
  return call('getUser', { type: 'GetUser', authKey: auth.authKey })
    .then((u) => {
      auth.user = u;
      store.set('auth', auth);
      return u;
    })
    .catch((e) => {
      if (e.code === 1) logout();
      throw e;
    });
}

export function logout() {
  const key = authKey();
  auth = null;
  store.set('auth', null);
  store.set('addons', null);
  setLibrary([]);
  if (key) call('logout', { type: 'Logout', authKey: key }).catch(() => {});
}

// ---- Addons ----
export function getAddonCollection() {
  if (!isLoggedIn()) return Promise.resolve(null);
  return call('addonCollectionGet', { type: 'AddonCollectionGet', authKey: auth.authKey, update: true }).then((r) => {
    const addons = (r && r.addons) || [];
    store.set('addons', addons);
    return addons;
  });
}

// Instala um addon na conta (mesmo formato do app oficial: a coleção inteira é regravada).
export function installAddon(transportUrl) {
  if (!isLoggedIn()) return Promise.reject(new Error(t('Entre na conta primeiro')));
  return getJSON(transportUrl).then((manifest) => {
    if (!manifest || !manifest.id) throw new Error(t('Manifest inválido'));
    return call('addonCollectionGet', { type: 'AddonCollectionGet', authKey: auth.authKey, update: true }).then((r) => {
      const list = (r && r.addons) || [];
      if (list.some((a) => a.transportUrl === transportUrl || (a.manifest && a.manifest.id === manifest.id))) {
        throw new Error(t('Esse addon já está instalado'));
      }
      const next = list.concat([{ transportUrl: transportUrl, transportName: 'http', manifest: manifest, flags: { official: false, protected: false } }]);
      return call('addonCollectionSet', { type: 'AddonCollectionSet', authKey: auth.authKey, addons: next }).then(() => {
        store.set('addons', next);
        return manifest;
      });
    });
  });
}

export function cachedAddons() {
  return store.get('addons', null);
}

// ---- Biblioteca ----
export function getLibrary() {
  if (!isLoggedIn()) return Promise.resolve(cachedLibrary());
  return call('datastoreGet', { authKey: auth.authKey, collection: 'libraryItem', ids: [], all: true }).then((items) => {
    const list = Array.isArray(items) ? items : [];
    setLibrary(list);
    return list;
  });
}

// Biblioteca em memória (reler e converter o JSON a cada consulta pesava na TV);
// o armazenamento local só é gravado com atraso, e só os itens que o app usa.
let libMem = null;
let libSaveTimer = null;

function setLibrary(list) {
  libMem = list;
  clearTimeout(libSaveTimer);
  libSaveTimer = setTimeout(() => {
    // Guarda só o que importa (não removidos ou em andamento) para caber no localStorage.
    const slim = (libMem || []).filter((it) => !it.removed || it.temp || (it.state && it.state.timeOffset > 0));
    store.set('library', slim);
  }, 1500);
}

export function cachedLibrary() {
  if (!libMem) libMem = store.get('library', []);
  return libMem;
}

export function putLibraryItems(items) {
  // Atualiza o cache local mesmo sem conta, para o "continuar assistindo" funcionar offline.
  const lib = cachedLibrary();
  items.forEach((it) => {
    const i = lib.findIndex((x) => x._id === it._id);
    if (i >= 0) lib[i] = it;
    else lib.push(it);
  });
  setLibrary(lib);
  if (!isLoggedIn()) return Promise.resolve();
  return call('datastorePut', { authKey: auth.authKey, collection: 'libraryItem', changes: items }).catch((e) => {
    log.warn('Falha ao salvar na biblioteca', e.message);
  });
}

export function libraryItem(id) {
  return cachedLibrary().find((x) => x._id === id) || null;
}

function nowIso() {
  return new Date().toISOString();
}

// Mesmo formato do stremio-core (LibraryItem), para não corromper a biblioteca da conta.
export function newLibraryItem(meta) {
  return {
    _id: meta.id,
    name: meta.name || '',
    type: meta.type,
    poster: meta.poster || null,
    posterShape: meta.posterShape || 'poster',
    removed: true,
    temp: true,
    _ctime: nowIso(),
    _mtime: nowIso(),
    state: {
      lastWatched: null,
      timeWatched: 0,
      timeOffset: 0,
      overallTimeWatched: 0,
      timesWatched: 0,
      flaggedWatched: 0,
      duration: 0,
      video_id: null,
      watched: null,
      noNotif: false,
    },
    behaviorHints: { defaultVideoId: null, featuredVideoId: null, hasScheduledVideos: false },
  };
}

function clone(o) {
  return JSON.parse(JSON.stringify(o));
}

export function setInLibrary(meta, inLibrary) {
  const existing = libraryItem(meta.id);
  const item = existing ? clone(existing) : newLibraryItem(meta);
  item.removed = !inLibrary;
  item.temp = false;
  item._mtime = nowIso();
  return putLibraryItems([item]).then(() => item);
}

export function isInLibrary(id) {
  const it = libraryItem(id);
  return !!(it && !it.removed);
}

// Progresso de reprodução: chamado pelo player periodicamente.
export function saveProgress(meta, videoId, timeMs, durationMs, deltaWatchedMs) {
  const existing = libraryItem(meta.id);
  const item = existing ? clone(existing) : newLibraryItem(meta);
  const s = item.state;
  if (s.video_id !== videoId) {
    s.timeWatched = 0;
    s.flaggedWatched = 0;
  }
  s.video_id = videoId;
  s.timeOffset = Math.max(0, Math.round(timeMs));
  s.duration = Math.max(0, Math.round(durationMs));
  s.lastWatched = nowIso();
  s.timeWatched = (s.timeWatched || 0) + Math.max(0, Math.round(deltaWatchedMs));
  s.overallTimeWatched = (s.overallTimeWatched || 0) + Math.max(0, Math.round(deltaWatchedMs));
  if (!s.flaggedWatched && s.duration > 0 && s.timeWatched > s.duration * 0.7) {
    s.flaggedWatched = 1;
    s.timesWatched = (s.timesWatched || 0) + 1;
  }
  // Perto do fim: tira do "continuar assistindo".
  if (s.duration > 0 && s.timeOffset > s.duration * 0.95) s.timeOffset = 0;
  if (!item.name && meta.name) item.name = meta.name;
  if (!item.poster && meta.poster) item.poster = meta.poster;
  item._mtime = nowIso();
  return putLibraryItems([item]);
}

export function continueWatching() {
  return cachedLibrary()
    .filter((it) => it.type !== 'other' && (!it.removed || it.temp) && it.state && it.state.timeOffset > 0)
    .sort((a, b) => String(b.state.lastWatched || '').localeCompare(String(a.state.lastWatched || '')));
}
