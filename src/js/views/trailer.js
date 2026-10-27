// Full-screen YouTube trailer. The embed is never focused, so the remote stays with the app:
// Return closes it and the media keys drive the player through the YouTube iframe API.
import { h } from '../lib/dom.js';
import { KEY } from '../lib/nav.js';
import * as router from '../router.js';
import { t, current } from '../lib/i18n.js';

// Trailer YouTube ids from Stremio's meta (Cinemeta), the official trailers first.
export function trailerIds(meta) {
  const ids = [];
  (meta.trailerStreams || []).forEach((s) => s && s.ytId && ids.push(s.ytId));
  (meta.trailers || []).forEach((tr) => tr && tr.source && (!tr.type || tr.type === 'Trailer') && ids.push(tr.source));
  return ids.filter((id, i) => /^[\w-]{11}$/.test(id) && ids.indexOf(id) === i);
}

export function openTrailer(ids, title) {
  router.push(TrailerView(ids, title));
}

function TrailerView(ids, title) {
  let index = 0;
  let playing = true;
  const el = h('div.view.trailer');
  const frame = h('iframe.trailer-frame', { tabindex: '-1', allow: 'autoplay; encrypted-media', allowfullscreen: '', referrerpolicy: 'origin' });
  const hint = h('div.trailer-hint', { text: title + '  ·  ' + t('Voltar fecha o trailer') });
  el.appendChild(frame);
  el.appendChild(hint);
  // The focus target the router lands on: keeps key events in the app, not in the iframe.
  el.appendChild(h('div.trailer-focus', { focusable: true }));

  function load() {
    const params = 'autoplay=1&controls=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&enablejsapi=1&hl=' + current();
    frame.src = 'https://www.youtube-nocookie.com/embed/' + ids[index] + '?' + params;
    playing = true;
  }

  function command(func, args) {
    try {
      frame.contentWindow.postMessage(JSON.stringify({ event: 'command', func: func, args: args || [] }), '*');
    } catch (e) {
      /* player not ready yet */
    }
  }

  let hintTimer = setTimeout(() => hint.classList.add('faded'), 4000);
  function showHint() {
    hint.classList.remove('faded');
    clearTimeout(hintTimer);
    hintTimer = setTimeout(() => hint.classList.add('faded'), 3000);
  }

  load();

  return {
    el: el,
    onKey: (e) => {
      const k = e.keyCode;
      showHint();
      if (k === KEY.PLAYPAUSE || k === KEY.PLAY || k === KEY.PAUSE || k === KEY.ENTER) {
        playing = k === KEY.PLAY ? true : k === KEY.PAUSE ? false : !playing;
        command(playing ? 'playVideo' : 'pauseVideo');
        return true;
      }
      // Right / Fast-forward: next trailer when there are several.
      if ((k === KEY.RIGHT || k === KEY.FF) && ids.length > 1) {
        index = (index + 1) % ids.length;
        load();
        return true;
      }
      if (k === KEY.LEFT || k === KEY.RW) {
        if (ids.length > 1 && k === KEY.LEFT) {
          index = (index - 1 + ids.length) % ids.length;
          load();
        }
        return true;
      }
      return k === KEY.UP || k === KEY.DOWN; // nothing to move to here
    },
    destroy: () => {
      clearTimeout(hintTimer);
      frame.src = 'about:blank'; // stops the sound right away
    },
  };
}
