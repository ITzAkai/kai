// Legendas externas (SRT/VTT) desenhadas pelo próprio app, sincronizadas com o <video>.
import { getText } from './http.js';

function toSec(ts) {
  const m = ts.trim().replace(',', '.').match(/(?:(\d+):)?(\d+):(\d+(?:\.\d+)?)/);
  if (!m) return NaN;
  return (parseInt(m[1] || '0', 10) * 3600) + parseInt(m[2], 10) * 60 + parseFloat(m[3]);
}

export function parse(text) {
  const cues = [];
  const blocks = String(text)
    .replace(/^﻿/, '')
    .replace(/\r\n?/g, '\n')
    .split(/\n{2,}/);
  for (let i = 0; i < blocks.length; i++) {
    const lines = blocks[i].split('\n');
    let j = 0;
    while (j < lines.length && lines[j].indexOf('-->') < 0) j++;
    if (j >= lines.length) continue;
    const parts = lines[j].split('-->');
    const start = toSec(parts[0]);
    const end = toSec(parts[1].trim().split(/\s+/)[0]);
    if (!isFinite(start) || !isFinite(end)) continue;
    const body = lines
      .slice(j + 1)
      .join('\n')
      .replace(/\{\\[^}]*\}/g, '')
      .trim();
    if (body) cues.push({ start: start, end: end, text: sanitize(body) });
  }
  cues.sort((a, b) => a.start - b.start);
  return cues;
}

// Mantém só <i>, <b>, <u>; o resto vira texto.
function sanitize(s) {
  const esc = s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return esc.replace(/&lt;(\/?)(i|b|u)&gt;/gi, '<$1$2>').replace(/&lt;\/?[^&]*&gt;/g, '');
}

export function load(url, fallbackUrl) {
  return getText(url, { timeout: 20000 })
    .catch((e) => {
      if (fallbackUrl) return getText(fallbackUrl, { timeout: 20000 });
      throw e;
    })
    .then(parse);
}

// Renderizador: chame update(tempoEmSegundos) a cada timeupdate/intervalo.
export function Renderer(el) {
  let cues = [];
  let offset = 0;
  let lastHtml = '';
  let idx = 0;

  function find(t) {
    // Busca a partir do último índice (o vídeo quase sempre avança).
    if (idx >= cues.length || (cues[idx] && cues[idx].start > t)) idx = 0;
    while (idx < cues.length && cues[idx].end < t) idx++;
    const out = [];
    for (let k = idx; k < cues.length && cues[k].start <= t; k++) {
      if (cues[k].end >= t) out.push(cues[k].text);
    }
    return out.join('\n');
  }

  return {
    set: (c) => {
      cues = c || [];
      idx = 0;
      lastHtml = '';
      el.innerHTML = '';
    },
    clear: () => {
      cues = [];
      lastHtml = '';
      el.innerHTML = '';
    },
    active: () => cues.length > 0,
    setOffset: (sec) => (offset = sec),
    offset: () => offset,
    update: (t) => {
      if (!cues.length) return;
      const html = find(t - offset);
      if (html === lastHtml) return;
      lastHtml = html;
      el.innerHTML = html ? '<span>' + html + '</span>' : '';
    },
  };
}
