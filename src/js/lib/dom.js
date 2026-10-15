// h('div.card#id', { attrs, on }, children) — helper minimalista para montar DOM.
import { kitsuInfo, kitsuSmall } from './img.js';
export function h(tag, props, children) {
  const parts = tag.split(/(?=[.#])/);
  const el = document.createElement(parts[0] || 'div');
  for (let i = 1; i < parts.length; i++) {
    const p = parts[i];
    if (p[0] === '.') el.classList.add(p.slice(1));
    else if (p[0] === '#') el.id = p.slice(1);
  }
  if (props) {
    for (const key in props) {
      const val = props[key];
      if (val === undefined || val === null || val === false) continue;
      if (key === 'text') el.textContent = val;
      else if (key === 'html') el.innerHTML = val;
      else if (key === 'style' && typeof val === 'object') Object.assign(el.style, val);
      else if (key === 'on') for (const ev in val) el.addEventListener(ev, val[ev]);
      else if (key === 'onSelect') el.__select = val;
      else if (key === 'onFocus') el.__focus = val;
      else if (key === 'focusable') el.setAttribute('data-focus', '');
      else if (key === 'cls') String(val).split(' ').forEach((c) => c && el.classList.add(c));
      else el.setAttribute(key, val === true ? '' : val);
    }
  }
  append(el, children);
  return el;
}

export function append(el, children) {
  if (children === undefined || children === null || children === false) return el;
  if (Array.isArray(children)) children.forEach((c) => append(el, c));
  else if (typeof children === 'string' || typeof children === 'number') el.appendChild(document.createTextNode(String(children)));
  else el.appendChild(children);
  return el;
}

export function clear(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
  return el;
}

export function $(sel, root) {
  return (root || document).querySelector(sel);
}

export function $$(sel, root) {
  return Array.prototype.slice.call((root || document).querySelectorAll(sel));
}

// Imagens sob demanda: <img data-lazy="url">. Carrega as que estão perto da tela e
// DESCARREGA as que ficaram longe, para a TV (≈180 MB livres) não entrar em swap.
const BLANK = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

export function lazyImg(url, cls) {
  const el = h('img', { cls: cls, alt: '' });
  if (url) el.setAttribute('data-lazy', url);
  return el;
}

function setOn(el, on) {
  if (on && !el.__on) {
    el.__on = true;
    const url = el.getAttribute('data-lazy');
    const kitsu = kitsuInfo(url);
    if (!kitsu) {
      el.src = url;
      return;
    }
    // Original do Kitsu (até 41 MB decodificado): troca pela versão "small" antes de carregar.
    kitsuSmall(kitsu).then((small) => {
      if (!el.__on) return;
      if (small) {
        el.setAttribute('data-lazy', small);
        el.src = small;
      } else if (el.onerror) el.onerror();
    });
  } else if (!on && el.__on) {
    el.__on = false;
    el.src = BLANK;
  }
}

export function loadVisibleImages(root, margin) {
  const m = margin === undefined ? 400 : margin;
  const W = window.innerWidth;
  const H = window.innerHeight;
  // Margem curta: só ~1 tela além da visível fica na memória.
  const isFar = (r) => r.right < -W * 0.5 || r.left > W * 1.6 || r.bottom < -H * 0.8 || r.top > H * 1.8;
  const handled = [];
  // Fileiras inteiras longe da tela: descarrega sem medir imagem por imagem.
  $$('[data-scroll-x]', root).forEach((track) => {
    if (track.offsetParent === null) return;
    const tr = track.getBoundingClientRect();
    if (tr.bottom < -H * 0.8 || tr.top > H * 1.8) {
      $$('img[data-lazy]', track).forEach((el) => setOn(el, false));
      handled.push(track);
    }
  });
  $$('img[data-lazy]', root).forEach((el) => {
    if (el.offsetParent === null) return; // oculta (display:none)
    for (let i = 0; i < handled.length; i++) if (handled[i].contains(el)) return;
    const r = el.getBoundingClientRect();
    const near = r.right > -m && r.left < W + m && r.bottom > -m && r.top < H + m;
    if (near) setOn(el, true);
    else if (isFar(r)) setOn(el, false);
  });
}

// Libera todas as imagens de uma tela que saiu de vista.
export function unloadImages(root) {
  $$('img[data-lazy]', root).forEach((el) => {
    if (el.__on) {
      el.__on = false;
      el.src = BLANK;
    }
  });
}

export function debounce(fn, ms) {
  let t = null;
  return function () {
    const args = arguments;
    const self = this;
    clearTimeout(t);
    t = setTimeout(() => fn.apply(self, args), ms);
  };
}
