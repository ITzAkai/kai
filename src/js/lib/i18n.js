// Idiomas do app: português (base) e inglês. A chave é o próprio texto em português;
// t('Olá {nome}', { nome: 'Ana' }) troca os {parâmetros}. Idioma: escolhido nos Ajustes
// ou automático pelo idioma da TV.
import { EN } from './i18n-en.js';

let lang = 'pt';

export function detect() {
  const nav = (window.navigator && (window.navigator.language || window.navigator.userLanguage)) || 'pt';
  return /^pt/i.test(nav) ? 'pt' : 'en';
}

// setting: 'auto' | 'pt' | 'en'
export function init(setting) {
  lang = setting === 'pt' || setting === 'en' ? setting : detect();
  document.documentElement.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');
  return lang;
}

export function current() {
  return lang;
}

// Idioma para APIs de metadados (TMDB).
export function apiLang() {
  return lang === 'pt' ? 'pt-BR' : 'en-US';
}

export function t(text, params) {
  let out = lang === 'en' && EN[text] !== undefined ? EN[text] : text;
  if (params) {
    Object.keys(params).forEach((k) => {
      out = out.split('{' + k + '}').join(String(params[k]));
    });
  }
  return out;
}
