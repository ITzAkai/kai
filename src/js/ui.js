// Componentes compartilhados: toast, menus modais, barra superior, cartões.
import { h, clear } from './lib/dom.js';
import * as nav from './lib/nav.js';
import { smallPoster, smallBackground } from './lib/img.js';
import * as store from './lib/store.js';
import { avatar, switchProfile, createProfile } from './views/profiles.js';

let toastTimer = null;
export function toast(msg, ms) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), ms || 3500);
}

// Menu de opções (lista) num modal. options: [{ label, sub, checked, value, onSelect }]
export function menu(title, options, opts) {
  const o = opts || {};
  const list = h('div.modal-list', { 'data-scroll-y': '', 'data-pad-y': '80' });
  options.forEach((opt) => {
    list.appendChild(
      h(
        'div.opt',
        {
          focusable: true,
          cls: opt.checked ? 'checked' : '',
          'data-autofocus': opt.checked ? '' : null,
          onSelect: () => {
            close();
            if (opt.onSelect) opt.onSelect(opt.value);
            if (o.onPick) o.onPick(opt.value, opt);
          },
        },
        [opt.label, opt.sub ? h('small', { text: opt.sub }) : null]
      )
    );
  });
  if (!options.length) list.appendChild(h('div.modal-text', { text: o.empty || 'Nada por aqui.' }));
  const box = h('div.modal-box', { cls: o.center ? 'center' : '' }, [h('h3', { text: title }), list]);
  const modal = h('div.modal', null, box);
  document.getElementById('app').appendChild(modal);
  const layer = nav.pushLayer(modal, {
    onBack: () => close(),
    onKey: o.onKey,
  });
  nav.focusFirst(modal);
  let closed = false;
  function close() {
    if (closed) return;
    closed = true;
    nav.popLayer(layer);
    if (modal.parentNode) modal.parentNode.removeChild(modal);
    if (o.onClose) o.onClose();
  }
  return { close: close, el: modal };
}

export function confirmDialog(text, okLabel, onOk) {
  const box = h('div.modal-box.center', null, [
    h('h3', { text: text }),
    h('div.modal-actions', null, [
      h('div.btn.primary', { focusable: true, 'data-autofocus': '', text: okLabel || 'OK', onSelect: () => (close(), onOk && onOk()) }),
      h('div.btn', { focusable: true, text: 'Cancelar', onSelect: () => close() }),
    ]),
  ]);
  const modal = h('div.modal', null, box);
  document.getElementById('app').appendChild(modal);
  const layer = nav.pushLayer(modal, { onBack: () => close() });
  nav.focusFirst(modal);
  function close() {
    nav.popLayer(layer);
    if (modal.parentNode) modal.parentNode.removeChild(modal);
  }
}

// Barra superior com as abas principais.
export const TABS = [
  { id: 'home', label: 'Início' },
  { id: 'search', label: 'Buscar' },
  { id: 'library', label: 'Biblioteca' },
  { id: 'calendar', label: 'Animes' },
  { id: 'settings', label: 'Ajustes' },
];

export function topbar(activeId, onTab) {
  const clock = h('div.clock');
  const tick = () => (clock.textContent = timeHM(new Date()));
  tick();
  const timer = setInterval(tick, 20000);
  const bar = h('div.topbar', { 'data-group': '' }, [
    h('div.brand', { html: 'Stremio <b>Kai</b>' }),
    TABS.map((t) =>
      h('div.tab', {
        focusable: true,
        cls: t.id === activeId ? 'active' : '',
        text: t.label,
        onSelect: () => onTab(t.id),
      })
    ),
    h('div.spacer'),
    profileButton(onTab),
    clock,
  ]);
  bar.__destroy = () => clearInterval(timer);
  return bar;
}

// Avatar do perfil ativo na barra superior: troca rápida de perfil.
function profileButton(onTab) {
  const p = store.activeProfile();
  return h('div.profile-chip', { focusable: true, onSelect: () => profileMenu(onTab) }, [avatar(p, 'small'), h('span', { text: p.name })]);
}

function profileMenu(onTab) {
  const active = store.activeProfile();
  const opts = store.profiles().map((p) => ({ label: p.name, sub: p.id === active.id ? 'Perfil atual' : 'Trocar para este perfil', value: p.id, checked: p.id === active.id }));
  opts.push({ label: '+ Adicionar perfil', sub: 'Com outra conta Stremio (histórico separado)', value: '__add' });
  opts.push({ label: 'Gerenciar perfis', sub: 'Nome, cor, apagar', value: '__manage' });
  menu('Perfis', opts, {
    onPick: (v) => {
      if (v === '__add') createProfile();
      else if (v === '__manage') onTab('settings');
      else if (v !== active.id) switchProfile(v);
    },
  });
}

export function timeHM(d) {
  return ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
}

export function fmtTime(sec) {
  if (!isFinite(sec) || sec < 0) sec = 0;
  const s = Math.floor(sec % 60);
  const m = Math.floor((sec / 60) % 60);
  const hh = Math.floor(sec / 3600);
  return (hh ? hh + ':' + ('0' + m).slice(-2) : m) + ':' + ('0' + s).slice(-2);
}

// Cartão de pôster (ou largo, para "continuar assistindo").
export function card(item, opts) {
  const o = opts || {};
  const wrap = h('div.poster-wrap');
  // Versões pequenas das imagens (o cartão tem 210x315 / 380x214).
  const src = o.wide ? smallBackground(o.image || item.background || item.poster) : smallPoster(item.poster);
  if (src) {
    const im = h('img', { alt: '' });
    im.setAttribute('data-lazy', src);
    im.onerror = () => {
      im.style.display = 'none';
      wrap.appendChild(h('div.ph', { text: item.name || '' }));
    };
    wrap.appendChild(im);
  } else wrap.appendChild(h('div.ph', { text: item.name || '' }));
  if (o.progress) wrap.appendChild(h('div.progress', null, h('i', { style: { width: Math.round(o.progress * 100) + '%' } })));
  if (o.badge) wrap.appendChild(h('div.badge', { text: o.badge }));
  return h('div.card', { focusable: true, cls: o.wide ? 'wide' : '', onSelect: o.onSelect, onFocus: o.onFocus }, [
    wrap,
    h('div.name', { text: o.title || item.name || '' }),
  ]);
}

export function spinnerLine(text) {
  return h('div.loading-line', null, [h('div.spinner.small'), text]);
}

export { clear };
