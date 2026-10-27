// Idiomas do app: português (base), inglês e árabe. A chave é o próprio texto em português;
// t('Olá {nome}', { nome: 'Ana' }) troca os {parâmetros}. Idioma: escolhido nos Ajustes
// ou automático pelo idioma da TV.
import { EN } from './i18n-en.js';
import { AR } from './i18n-ar.js';

let lang = 'en';
const TABLES = { en: EN, ar: AR };

// The app speaks English and Arabic (the Portuguese keys are only the internal base text).
// Automatic: Arabic when the TV is set to Arabic, otherwise English.
export function detect() {
  const nav = (window.navigator && (window.navigator.language || window.navigator.userLanguage)) || '';
  return /^ar/i.test(nav) ? 'ar' : 'en';
}

// setting: 'auto' | 'en' | 'ar' (an old 'pt' setting counts as auto)
export function init(setting) {
  lang = setting === 'en' || setting === 'ar' ? setting : detect();
  const root = document.documentElement;
  root.setAttribute('lang', lang);
  // Right-to-left only for Arabic.
  root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  return lang;
}

export function current() {
  return lang;
}

// Idioma para APIs de metadados (TMDB).
export function apiLang() {
  return lang === 'ar' ? 'ar-SA' : 'en-US';
}

export function t(text, params) {
  const table = TABLES[lang];
  // Arabic falls back to English for any phrase not translated yet, never to Portuguese.
  let out = table[text] !== undefined ? table[text] : EN[text] !== undefined ? EN[text] : text;
  if (params) {
    Object.keys(params).forEach((k) => {
      out = out.split('{' + k + '}').join(String(params[k]));
    });
  }
  return out;
}

// "S1 E3" (Arabic: "م1 ح3", season/episode).
export function epLabel(season, episode) {
  return lang === 'ar' ? 'م' + season + ' ح' + episode : 'S' + season + ' E' + episode;
}
