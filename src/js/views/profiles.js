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

// Pede o nome do perfil num modal (no TV o teclado virtual abre ao confirmar no campo).
export function askProfileName(title, initial, okLabel, onOk, onCancel) {
  const err = h('div.modal-text.err-text');
  const input = h('input.input', { type: 'text', value: initial || '', placeholder: 'Ex.: Ana, Pedro, Sala', maxlength: '20', focusable: true, 'data-autofocus': '' });
  const submit = () => {
    const name = String(input.value || '').trim();
    if (!name) {
      err.textContent = 'Digite um nome para o perfil.';
      nav.focus(input);
      return;
    }
    const dup = store.profiles().some((p) => p.name.toLowerCase() === name.toLowerCase() && p.name !== initial);
    if (dup) {
      err.textContent = 'Já existe um perfil com esse nome.';
      nav.focus(input);
      return;
    }
    close();
    onOk(name);
  };
  input.__submit = submit;
  const box = h('div.modal-box.center', null, [
    h('h3', { text: title }),
    h('div.modal-text', null, input),
    err,
    h('div.modal-actions', { 'data-group': '' }, [
      h('div.btn.primary', { focusable: true, text: okLabel || 'Continuar', onSelect: submit }),
      h('div.btn', { focusable: true, text: 'Cancelar', onSelect: () => (close(), onCancel && onCancel()) }),
    ]),
  ]);
  const modal = h('div.modal', null, box);
  document.getElementById('app').appendChild(modal);
  const layer = nav.pushLayer(modal, { onBack: () => (close(), onCancel && onCancel()) });
  nav.focusFirst(modal);
  function close() {
    nav.popLayer(layer);
    if (modal.parentNode) modal.parentNode.removeChild(modal);
  }
}

// Novo perfil: primeiro o nome (não existe nome padrão), depois o app troca para ele e pede a conta.
export function createProfile() {
  askProfileName('Nome do novo perfil', '', 'Criar perfil', (name) => {
    const p = store.addProfile(name);
    session(SESSION_NEW, p.id);
    switchProfile(p.id);
  });
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
