// Navegação espacial pelo controle remoto (setas/OK/voltar) e pelo ponteiro do Magic Remote.
// Elementos navegáveis têm [data-focus]. Fileiras usam [data-group] para lembrar a última posição.
// Contêineres com [data-scroll-x] / [data-scroll-y] rolam para manter o foco visível.
import { $$ } from './dom.js';
import { isTizen } from './platform.js';

const TIZEN = isTizen();

export const KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  ENTER: 13,
  IME_DONE: 65376, // Samsung on-screen keyboard Done (not the remote's OK)
  IME_CANCEL: 65385, // Samsung on-screen keyboard Cancel
  BACK: TIZEN ? 10009 : 461, // Samsung Return / LG Back
  ESC: 27,
  BACKSPACE: 8,
  PLAY: 415,
  PAUSE: 19,
  PLAYPAUSE: TIZEN ? 10252 : 179,
  STOP: 413,
  FF: 417,
  RW: 412,
  RED: 403,
  GREEN: 404,
  YELLOW: 405,
  BLUE: 406,
  CH_UP: TIZEN ? 427 : 33,
  CH_DOWN: TIZEN ? 428 : 34,
};

const layers = [];
let scrollHook = null;
let pointerMode = false;
// Rolagem animada redesenha a tela a cada quadro (caro no Chromium 38 da TV); padrão: instantânea.
let smooth = false;

export function setSmooth(on) {
  smooth = !!on;
}

function top() {
  return layers[layers.length - 1] || null;
}

function isVisible(el) {
  if (!el || el.offsetParent === null) return false;
  if (el.hasAttribute('disabled')) return false;
  return true;
}

function candidates(root) {
  return $$('[data-focus]', root).filter(isVisible);
}

function center(r) {
  return { x: (r.left + r.right) / 2, y: (r.top + r.bottom) / 2 };
}

function pick(list, cur, dir) {
  const cr = cur.getBoundingClientRect();
  const cc = center(cr);
  const tol = 8;
  let best = null;
  let bestScore = Infinity;
  for (let i = 0; i < list.length; i++) {
    const el = list[i];
    const r = el.getBoundingClientRect();
    let primary;
    let secondary;
    if (dir === 'right') {
      if (r.left < cr.right - tol && center(r).x <= cc.x + tol) continue;
      if (center(r).x <= cc.x) continue;
      primary = Math.max(0, r.left - cr.right);
      secondary = overlap(r.top, r.bottom, cr.top, cr.bottom) ? 0 : Math.abs(center(r).y - cc.y);
    } else if (dir === 'left') {
      if (center(r).x >= cc.x) continue;
      if (r.right > cr.left + tol && center(r).x >= cc.x - tol) continue;
      primary = Math.max(0, cr.left - r.right);
      secondary = overlap(r.top, r.bottom, cr.top, cr.bottom) ? 0 : Math.abs(center(r).y - cc.y);
    } else if (dir === 'down') {
      if (r.top < cr.bottom - tol) continue;
      primary = Math.max(0, r.top - cr.bottom);
      secondary = overlap(r.left, r.right, cr.left, cr.right) ? Math.abs(r.left - cr.left) / 10 : Math.abs(center(r).x - cc.x);
    } else {
      if (r.bottom > cr.top + tol) continue;
      primary = Math.max(0, cr.top - r.bottom);
      secondary = overlap(r.left, r.right, cr.left, cr.right) ? Math.abs(r.left - cr.left) / 10 : Math.abs(center(r).x - cc.x);
    }
    const score = primary + secondary * 2.5;
    if (score < bestScore) {
      bestScore = score;
      best = el;
    }
  }
  return best;
}

function overlap(a1, a2, b1, b2) {
  return Math.min(a2, b2) - Math.max(a1, b1) > 4;
}

// Rolagem curta animada; cancela a anterior no mesmo contêiner.
function animateScroll(node, prop, target) {
  if (node.__anim) cancelAnimationFrame(node.__anim);
  const start = node[prop];
  const delta = target - start;
  if (!smooth || Math.abs(delta) < 2) {
    node[prop] = target;
    if (scrollHook) scrollHook(node);
    return;
  }
  const dur = 160;
  const t0 = Date.now();
  const step = () => {
    const k = Math.min(1, (Date.now() - t0) / dur);
    node[prop] = start + delta * (1 - Math.pow(1 - k, 3));
    if (k < 1) node.__anim = requestAnimationFrame(step);
    else {
      node.__anim = null;
      if (scrollHook) scrollHook(node);
    }
  };
  node.__anim = requestAnimationFrame(step);
}

export function ensureVisible(el) {
  let node = el.parentNode;
  while (node && node.nodeType === 1) {
    if (node.hasAttribute('data-scroll-x')) {
      const pad = parseInt(node.getAttribute('data-pad') || '96', 10);
      const er = el.getBoundingClientRect();
      const nr = node.getBoundingClientRect();
      let target = node.scrollLeft;
      if (er.left < nr.left + pad) target -= nr.left + pad - er.left;
      else if (er.right > nr.right - pad) target += er.right - (nr.right - pad);
      target = Math.max(0, Math.min(target, node.scrollWidth - node.clientWidth));
      if (target !== node.scrollLeft) animateScroll(node, 'scrollLeft', target);
    }
    if (node.hasAttribute('data-scroll-y')) {
      const pad = parseInt(node.getAttribute('data-pad-y') || '140', 10);
      const er = el.getBoundingClientRect();
      const nr = node.getBoundingClientRect();
      let target = node.scrollTop;
      const anchor = el.closest('[data-anchor]');
      if (anchor && node.contains(anchor)) {
        // Fileiras: alinha o topo da fileira, como na tela inicial do Stremio.
        const ar = anchor.getBoundingClientRect();
        target += ar.top - nr.top - parseInt(anchor.getAttribute('data-anchor') || '0', 10);
      } else if (er.top < nr.top + pad) target -= nr.top + pad - er.top;
      else if (er.bottom > nr.bottom - pad) target += er.bottom - (nr.bottom - pad);
      target = Math.max(0, Math.min(target, node.scrollHeight - node.clientHeight));
      if (target !== node.scrollTop) animateScroll(node, 'scrollTop', target);
    }
    node = node.parentNode;
  }
}

export function focus(el, opts) {
  const layer = top();
  if (!layer || !el) return;
  const prev = layer.current;
  if (prev && prev !== el) {
    prev.classList.remove('focused');
    if (prev.__blur) prev.__blur();
  }
  layer.current = el;
  el.classList.add('focused');
  const group = el.closest('[data-group]');
  if (group) group.__last = el;
  if (!(opts && opts.noScroll)) ensureVisible(el);
  if (el.__focus && prev !== el) el.__focus(el);
}

export function current() {
  const layer = top();
  return layer ? layer.current : null;
}

export function focusFirst(root) {
  const layer = top();
  if (!layer) return;
  const scope = root || layer.root;
  const pref = $$('[data-autofocus]', scope).filter(isVisible)[0];
  const el = pref || candidates(scope)[0];
  if (el) focus(el);
}

export function move(dir) {
  const layer = top();
  if (!layer) return false;
  const cur = layer.current;
  if (!cur || !document.body.contains(cur) || !isVisible(cur)) {
    focusFirst();
    return true;
  }
  const group = cur.closest('[data-group]');
  const horizontal = dir === 'left' || dir === 'right';
  if (group && horizontal === !group.hasAttribute('data-vertical')) {
    const inGroup = candidates(group).filter((e) => e !== cur);
    const g = pick(inGroup, cur, dir);
    if (g) {
      focus(g);
      return true;
    }
    if (group.hasAttribute('data-trap')) return false;
  }
  const all = candidates(layer.root).filter((e) => e !== cur);
  let best = pick(all, cur, dir);
  if (!best) return false;
  const bg = best.closest('[data-group]');
  if (bg && bg !== group && bg.__last && bg.contains(bg.__last) && isVisible(bg.__last)) best = bg.__last;
  focus(best);
  return true;
}

export function select(el) {
  const target = el || current();
  if (!target) return;
  if (target.tagName === 'INPUT') {
    target.focus();
    return;
  }
  if (target.__select) target.__select(target);
}

// Camadas: cada tela/modal empilha a sua; o foco fica preso na de cima.
export function pushLayer(root, handlers) {
  const layer = Object.assign({ root: root, current: null }, handlers || {});
  layers.push(layer);
  return layer;
}

export function popLayer(layer) {
  const i = layers.indexOf(layer);
  if (i >= 0) layers.splice(i, 1);
  const t = top();
  if (t && t.current) {
    t.current.classList.add('focused');
  }
}

export function topLayer() {
  return top();
}

export function onScroll(fn) {
  scrollHook = fn;
}

export function isPointerMode() {
  return pointerMode;
}

function onKeyDown(e) {
  const layer = top();
  if (!layer) return;
  const code = e.keyCode;
  const active = document.activeElement;
  const typing = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA');
  if (typing) {
    if (code === KEY.ENTER || code === KEY.IME_DONE) {
      // Let the keyboard finish its own Done action so the typed text is kept.
      if (code === KEY.ENTER) e.preventDefault();
      active.blur();
      if (active.__submit) active.__submit(active.value);
      return;
    } else if (code === KEY.BACK || code === KEY.ESC || code === KEY.IME_CANCEL) {
      if (code !== KEY.IME_CANCEL) e.preventDefault();
      active.blur();
      return;
    } else if (code === KEY.UP || code === KEY.DOWN) {
      active.blur();
    } else return;
  }
  if (code >= 37 && code <= 40 && pointerMode) pointerMode = false;
  if (layer.onKey && layer.onKey(e) === true) {
    e.preventDefault();
    return;
  }
  switch (code) {
    case KEY.LEFT:
      move('left');
      break;
    case KEY.RIGHT:
      move('right');
      break;
    case KEY.UP:
      move('up');
      break;
    case KEY.DOWN:
      move('down');
      break;
    case KEY.ENTER:
      select();
      break;
    case KEY.BACK:
    case KEY.ESC:
    case KEY.BACKSPACE:
      if (layer.onBack) layer.onBack();
      break;
    default:
      return;
  }
  e.preventDefault();
}

function onMouseOver(e) {
  const layer = top();
  if (!layer) return;
  pointerMode = true;
  const el = e.target.closest ? e.target.closest('[data-focus]') : null;
  if (el && layer.root.contains(el) && el !== layer.current) focus(el, { noScroll: true });
}

function onClick(e) {
  const layer = top();
  if (!layer) return;
  const el = e.target.closest ? e.target.closest('[data-focus]') : null;
  if (el && layer.root.contains(el)) {
    focus(el, { noScroll: true });
    select(el);
  }
}

let wheelLock = 0;
function onWheel(e) {
  const now = Date.now();
  if (now - wheelLock < 120) return;
  wheelLock = now;
  move(e.deltaY > 0 ? 'down' : 'up');
}

export function install() {
  document.addEventListener('keydown', onKeyDown, true);
  document.addEventListener('mouseover', onMouseOver);
  document.addEventListener('click', onClick);
  document.addEventListener('mousewheel', onWheel);
}
