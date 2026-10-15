// Perfis: tela "Quem está assistindo?", avatar e troca de perfil.
// Cada perfil tem sua própria conta Stremio (histórico, biblioteca, addons) e preferências.
import { h } from '../lib/dom.js';
import * as nav from '../lib/nav.js';
import * as store from '../lib/store.js';

const SESSION_PICKED = 'kai.profilePicked';
const SESSION_NEW = 'kai.newProfile';

function session(key, value) {
  try {
    if (value === undefined) return window.sessionStorage.getItem(key);
    if (value === null) window.sessionStorage.removeItem(key);
    else window.sessionStorage.setItem(key, value);
  } catch (e) {
    /* ignore */
  }
  return null;
}

export function avatar(p, cls) {
  const initial = String(p.name || '?').trim().charAt(0).toUpperCase() || '?';
  return h('div.avatar', { cls: cls || '', style: { backgroundColor: p.color || store.COLORS[0] }, text: initial });
}

// Troca de perfil recarregando o app: conta, biblioteca e addons do outro perfil entram limpos.
export function switchProfile(id) {
  store.setActiveProfile(id);
  session(SESSION_PICKED, '1');
  window.location.reload();
}

export function createProfile(name) {
  const p = store.addProfile(name);
  session(SESSION_NEW, p.id);
  switchProfile(p.id);
}

// Perfil recém-criado ainda sem conta: o app abre o login logo na entrada.
export function isNewProfilePendingLogin() {
  return session(SESSION_NEW) === store.activeProfile().id;
}

export function clearNewProfileFlag() {
  session(SESSION_NEW, null);
}

export function needsPicker() {
  return store.profiles().length > 1 && store.settings().askProfile && !session(SESSION_PICKED);
}

// Tela de escolha mostrada antes de o app carregar a conta.
export function showPicker(onPicked) {
  const list = store.profiles();
  const active = store.activeProfile();
  const cards = list.map((p) =>
    h(
      'div.profile-card',
      {
        focusable: true,
        'data-autofocus': p.id === active.id ? '' : null,
        onSelect: () => pick(p.id),
      },
      [avatar(p, 'big'), h('div.profile-name', { text: p.name })]
    )
  );
  cards.push(
    h('div.profile-card', { focusable: true, onSelect: () => createProfile() }, [
      h('div.avatar.big.add', { text: '+' }),
      h('div.profile-name', { text: 'Adicionar perfil' }),
    ])
  );
  const el = h('div.view.profile-picker', null, [
    h('div.boot-logo', { html: 'Stremio <b>Kai</b>' }),
    h('h1', { text: 'Quem está assistindo?' }),
    h('div.profile-row', { 'data-group': '' }, cards),
    h('p.profile-hint', { text: 'Cada perfil tem sua própria conta Stremio, com histórico e biblioteca separados.' }),
  ]);
  document.getElementById('app').appendChild(el);
  const layer = nav.pushLayer(el, { onBack: () => pick(active.id) });
  nav.focusFirst(el);

  function pick(id) {
    store.setActiveProfile(id);
    session(SESSION_PICKED, '1');
    nav.popLayer(layer);
    if (el.parentNode) el.parentNode.removeChild(el);
    onPicked();
  }
}
