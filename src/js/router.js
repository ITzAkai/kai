// Pilha de telas. Cada tela: { el, layer, onShow, onHide, onBack, destroy }.
import * as nav from './lib/nav.js';
import { platformBack } from './lib/luna.js';
import { confirmDialog } from './ui.js';
import { loadVisibleImages, unloadImages } from './lib/dom.js';

const stack = [];
const app = () => document.getElementById('app');
const tabs = {}; // telas principais reutilizadas (início, busca, biblioteca, ajustes)

function show(view) {
  view.el.classList.remove('hidden');
  if (view.layer) {
    nav.popLayer(view.layer);
  }
  view.layer = nav.pushLayer(view.el, {
    onBack: () => back(),
    onKey: view.onKey,
  });
  if (view.restoreFocus && document.body.contains(view.restoreFocus)) nav.focus(view.restoreFocus, { noScroll: true });
  else nav.focusFirst(view.el);
  if (view.onShow) view.onShow();
  loadVisibleImages(view.el);
}

function hide(view) {
  view.restoreFocus = nav.current();
  if (view.layer) nav.popLayer(view.layer);
  view.layer = null;
  view.el.classList.add('hidden');
  if (view.onHide) view.onHide();
  // Tela fora de vista não segura imagens na memória (a TV tem pouca RAM).
  unloadImages(view.el);
}

export function push(view) {
  const prev = stack[stack.length - 1];
  if (prev) hide(prev);
  if (!view.el.parentNode) app().appendChild(view.el);
  stack.push(view);
  show(view);
}

export function pop() {
  if (stack.length <= 1) return false;
  const view = stack.pop();
  hide(view);
  if (!view.keepAlive) {
    if (view.destroy) view.destroy();
    if (view.el.parentNode) view.el.parentNode.removeChild(view.el);
  }
  show(stack[stack.length - 1]);
  return true;
}

export function back() {
  const view = stack[stack.length - 1];
  if (view && view.onBack && view.onBack() === true) return;
  if (stack.length > 1) {
    pop();
    return;
  }
  if (view && view.tabId && view.tabId !== 'home') {
    goTab('home');
    return;
  }
  confirmDialog('Sair do Stremio Kai?', 'Sair', () => platformBack());
}

// Troca de aba principal: limpa a pilha e mostra a aba (mantida viva).
export function goTab(id) {
  while (stack.length > 1) pop();
  const cur = stack[0];
  if (cur && cur.tabId === id) return;
  let view = tabs[id];
  if (!view) {
    view = registry[id]();
    view.tabId = id;
    view.keepAlive = true;
    tabs[id] = view;
  }
  if (cur) {
    hide(cur);
    stack.length = 0;
    // Só a tela inicial fica viva; as outras abas são recriadas ao voltar (economiza memória).
    if (cur.tabId !== 'home') dropTab(cur.tabId);
  }
  if (!view.el.parentNode) app().appendChild(view.el);
  stack.push(view);
  show(view);
}

const registry = {};
export function registerTab(id, factory) {
  registry[id] = factory;
}

export function tabView(id) {
  return tabs[id] || null;
}

export function currentView() {
  return stack[stack.length - 1] || null;
}

export function dropTab(id) {
  const v = tabs[id];
  if (!v) return;
  delete tabs[id];
  if (v.destroy) v.destroy();
  if (v.el.parentNode && stack.indexOf(v) < 0) v.el.parentNode.removeChild(v.el);
  if (v.layer) nav.popLayer(v.layer);
}
