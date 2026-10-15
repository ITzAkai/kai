// localStorage com JSON e tolerância a falhas.
const PREFIX = 'kai.';

export function get(key, fallback) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

export function set(key, value) {
  try {
    if (value === undefined || value === null) window.localStorage.removeItem(PREFIX + key);
    else window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch (e) {
    /* armazenamento cheio ou bloqueado */
  }
}

const DEFAULT_SETTINGS = {
  serverUrl: '',
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
  tmdbKey: typeof __KAI_TMDB__ !== 'undefined' ? __KAI_TMDB__ : '',
  mdblistKey: typeof __KAI_MDBLIST__ !== 'undefined' ? __KAI_MDBLIST__ : '',
  wizardDone: false,
  smoothScroll: false, // rolagem animada (mais bonita, mais pesada na TV)
  subtitlesAuto: true,
  devlogUrl: typeof __KAI_DEVLOG__ !== 'undefined' ? __KAI_DEVLOG__ : '',
  localAddons: [],
};

export function settings() {
  return Object.assign({}, DEFAULT_SETTINGS, get('settings', {}));
}

export function saveSettings(patch) {
  const next = Object.assign(settings(), patch);
  set('settings', next);
  return next;
}
