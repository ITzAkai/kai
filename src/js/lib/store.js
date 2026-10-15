// localStorage com JSON e tolerância a falhas, separado por PERFIL.
// Cada perfil tem sua conta Stremio (histórico/biblioteca), addons e preferências pessoais.
// O que é da TV (servidor do PC, chaves de API, rolagem) fica compartilhado entre os perfis.
import { current } from './i18n.js';

const PREFIX = 'kai.';

function rawGet(key, fallback) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

function rawSet(key, value) {
  try {
    if (value === undefined || value === null) window.localStorage.removeItem(PREFIX + key);
    else window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch (e) {
    /* armazenamento cheio ou bloqueado */
  }
}

// ---------- Perfis ----------
export const COLORS = ['#7b5bf5', '#e5508c', '#2bb6a3', '#f0a030', '#3d8bfd', '#e55353', '#8bc34a', '#9e9e9e'];

function profileKey(id, key) {
  return 'p.' + id + '.' + key;
}

// Migração: dados de antes dos perfis viram o primeiro perfil (sem precisar entrar de novo).
function ensureProfiles() {
  let list = rawGet('profiles', null);
  if (list && list.length) return list;
  const id = 'p' + Date.now().toString(36);
  const oldAuth = rawGet('auth', null);
  const email = oldAuth && oldAuth.user && oldAuth.user.email;
  // Instalação nova: o assistente pede o nome (unnamed). Quem já usava: nome vem do e-mail da conta.
  list = [email ? { id: id, name: email.split('@')[0], color: COLORS[0] } : { id: id, name: 'Perfil 1', color: COLORS[0], unnamed: true }];
  ['auth', 'addons', 'library'].forEach((k) => {
    const v = rawGet(k, null);
    if (v !== null) rawSet(profileKey(id, k), v);
    rawSet(k, null);
  });
  const oldSettings = rawGet('settings', null);
  if (oldSettings) {
    const dev = {};
    const prof = {};
    Object.keys(oldSettings).forEach((k) => {
      // O log remoto é só de desenvolvimento e chaves vazias não precisam ser fixadas.
      if (k === 'devlogUrl' || oldSettings[k] === '') return;
      (DEVICE_KEYS.indexOf(k) >= 0 ? dev : prof)[k] = oldSettings[k];
    });
    rawSet('device', dev);
    rawSet(profileKey(id, 'settings'), prof);
    rawSet('settings', null);
  }
  rawSet('profiles', list);
  rawSet('activeProfile', id);
  return list;
}

export function profiles() {
  return ensureProfiles();
}

export function activeProfile() {
  const list = ensureProfiles();
  const id = rawGet('activeProfile', null);
  return list.find((p) => p.id === id) || list[0];
}

export function setActiveProfile(id) {
  rawSet('activeProfile', id);
}

export function addProfile(name, color) {
  const list = ensureProfiles();
  const p = { id: 'p' + Date.now().toString(36), name: name || 'Perfil ' + (list.length + 1), color: color || COLORS[list.length % COLORS.length] };
  list.push(p);
  rawSet('profiles', list);
  return p;
}

export function updateProfile(id, patch) {
  const list = ensureProfiles().map((p) => (p.id === id ? Object.assign({}, p, patch) : p));
  rawSet('profiles', list);
}

export function removeProfile(id) {
  const list = ensureProfiles().filter((p) => p.id !== id);
  if (!list.length) return false;
  ['auth', 'addons', 'library', 'settings'].forEach((k) => rawSet(profileKey(id, k), null));
  rawSet('profiles', list);
  if (rawGet('activeProfile', null) === id) rawSet('activeProfile', list[0].id);
  return true;
}

// Lê/grava dados de um perfil que não é o ativo (ex.: login de outro perfil).
export function getFor(profileId, key, fallback) {
  return rawGet(profileKey(profileId, key), fallback);
}

// ---------- Dados do perfil ativo ----------
export function get(key, fallback) {
  return rawGet(profileKey(activeProfile().id, key), fallback);
}

export function set(key, value) {
  rawSet(profileKey(activeProfile().id, key), value);
}

// ---------- Preferências ----------
// Da TV (iguais para todos os perfis):
const DEVICE_KEYS = ['serverUrl', 'tmdbKey', 'mdblistKey', 'smoothScroll', 'devlogUrl', 'lastUpdateCheck', 'askProfile', 'wizardDone', 'language'];

const DEFAULT_SETTINGS = {
  // TV
  serverUrl: '',
  tmdbKey: typeof __KAI_TMDB__ !== 'undefined' ? __KAI_TMDB__ : '',
  mdblistKey: typeof __KAI_MDBLIST__ !== 'undefined' ? __KAI_MDBLIST__ : '',
  smoothScroll: false, // rolagem animada (mais bonita, mais pesada na TV)
  devlogUrl: typeof __KAI_DEVLOG__ !== 'undefined' ? __KAI_DEVLOG__ : '',
  language: 'auto', // 'auto' (idioma da TV) | 'pt' | 'en'
  askProfile: true, // "Quem está assistindo?" ao abrir, se houver mais de um perfil
  wizardDone: false,
  // Perfil
  heroSource: 'cinemeta',
  oled: false,
  subtitleLangs: ['pob', 'por', 'pt', 'pt-br'],
  audioLangs: [], // vazio = mantém o áudio padrão do arquivo (geralmente o original)
  subtitleSize: 100,
  subtitleFont: 'nata',
  subtitleStyle: 'kai',
  subtitleColor: '#ffffff',
  subtitleBold: true,
  subtitlePosition: 'low',
  skipMode: 'prompt', // prompt | auto | off
  subtitlesAuto: true,
  localAddons: [],
};

export function settings() {
  // Legenda automática padrão segue o idioma do app (quem já escolheu, mantém a escolha).
  const base = Object.assign({}, DEFAULT_SETTINGS, current() === 'en' ? { subtitleLangs: ['eng', 'en'] } : null);
  return Object.assign(base, rawGet('device', {}), get('settings', {}));
}

export function saveSettings(patch) {
  const dev = rawGet('device', {});
  const prof = get('settings', {});
  Object.keys(patch).forEach((k) => ((DEVICE_KEYS.indexOf(k) >= 0 ? dev : prof)[k] = patch[k]));
  rawSet('device', dev);
  set('settings', prof);
  return settings();
}
