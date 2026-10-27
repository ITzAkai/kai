// Tela inicial: Hero Banner rotativo (Kai) + "Continuar assistindo" + catálogos dos addons.
import { h, clear, loadVisibleImages } from '../lib/dom.js';
import * as nav from '../lib/nav.js';
import { KEY } from '../lib/nav.js';
import * as addons from '../api/addons.js';
import * as stremio from '../api/stremio.js';
import * as hero from '../api/hero.js';
import { topbar, card, spinnerLine } from '../ui.js';
import * as router from '../router.js';
import { openDetails } from './details.js';
import * as newEpisodes from '../api/newEpisodes.js';
import * as phone from '../lib/phone.js';
import * as store from '../lib/store.js';
import { CatalogView, canPage } from './catalog.js';
import { t, epLabel } from '../lib/i18n.js';

const ROTATE_MS = 8000;

export function HomeView() {
  const el = h('div.view');
  const scroller = h('div.scroll-y', { 'data-scroll-y': '' });
  const bar = topbar('home', router.goTab);
  const heroUi = buildHero();
  const cwRow = h('div.row', { 'data-anchor': '30' });
  const neRow = h('div.row', { 'data-anchor': '30' });
  const rows = h('div.rows');
  scroller.appendChild(bar);
  scroller.appendChild(heroUi.el);
  scroller.appendChild(cwRow);
  scroller.appendChild(neRow);
  scroller.appendChild(rows);
  el.appendChild(scroller);

  let loadedBoard = false;

  // Progress saved on other devices (phone, PC, Fire TV): refetch the account library when the
  // home screen comes back, at most once a minute, and redraw the row if anything changed.
  let lastSync = Date.now();
  function syncContinue() {
    if (!stremio.isLoggedIn() || Date.now() - lastSync < 60000) return;
    lastSync = Date.now();
    const before = JSON.stringify(stremio.continueWatching().map((it) => [it._id, it.state.video_id, it.state.timeOffset]));
    stremio
      .getLibrary()
      .then(() => {
        const after = JSON.stringify(stremio.continueWatching().map((it) => [it._id, it.state.video_id, it.state.timeOffset]));
        if (after !== before) {
          renderContinue();
          loadNew(true);
          publishBrowse();
        }
      })
      .catch(() => {});
  }
  // While the home screen stays open, check every 5 minutes too.
  const syncTimer = setInterval(() => {
    if (!el.classList.contains('hidden') && !perf()) syncContinue();
  }, 300000);

  // ---------- New episodes (series in your library, released this week) ----------
  let newList = perf() ? [] : newEpisodes.cached();
  let newLoadedAt = 0;
  function loadNew(force) {
    if (perf() || (!force && Date.now() - newLoadedAt < 30 * 60000)) return;
    newLoadedAt = Date.now();
    newEpisodes
      .load()
      .then((list) => {
        newList = list;
        renderNew();
        publishBrowse();
      })
      .catch(() => {});
  }

  function renderNew() {
    clear(neRow);
    if (!newList.length) {
      neRow.style.display = 'none';
      return;
    }
    neRow.style.display = '';
    neRow.appendChild(h('div.row-title', null, [t('Novos episódios'), h('small', { text: t('Séries da sua biblioteca, últimos 7 dias') })]));
    const track = h('div.row-track', { 'data-scroll-x': '', 'data-group': '' });
    newList.slice(0, 20).forEach((e) => {
      const c = card(
        { name: e.name, poster: e.poster },
        {
          wide: true,
          image: e.thumbnail || e.background || e.poster,
          title: e.name + ' · ' + epLabel(e.season, e.episode),
          onSelect: () => openDetails('series', e.seriesId, { videoId: e.videoId, autoStreams: true }),
        }
      );
      c.querySelector('.poster-wrap').appendChild(h('div.badge.new-badge', { text: dayLabel(e.released) }));
      track.appendChild(c);
    });
    neRow.appendChild(track);
    loadVisibleImages(neRow);
  }

  function dayLabel(ms) {
    const d = new Date(ms);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const day = new Date(d.getTime());
    day.setHours(0, 0, 0, 0);
    const diff = Math.round((today - day) / 86400000);
    if (diff <= 0) return t('Hoje');
    if (diff === 1) return t('Ontem');
    return t(['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'][d.getDay()]);
  }

  // ---------- Browse on the phone: what the phone remote's Browse tab shows ----------
  function publishBrowse() {
    const cont = stremio.continueWatching().slice(0, 20).map((it) => ({
      type: it.type,
      id: it._id,
      video: it.state.video_id,
      name: it.name,
      sub: episodeLabel(it.state.video_id, it._id),
      poster: it.poster,
      progress: it.state.duration ? Math.round((it.state.timeOffset / it.state.duration) * 100) / 100 : 0,
    }));
    const fresh = newList.slice(0, 20).map((e) => ({
      type: 'series',
      id: e.seriesId,
      video: e.videoId,
      name: e.name,
      sub: epLabel(e.season, e.episode) + (e.title ? ' · ' + e.title : ''),
      poster: e.poster,
    }));
    const lib = stremio
      .cachedLibrary()
      .filter((it) => !it.removed && it.type !== 'other' && it.poster)
      .sort((a, b) => String(b._mtime || '').localeCompare(String(a._mtime || '')))
      .slice(0, 60)
      .map((it) => ({ type: it.type, id: it._id, name: it.name, poster: it.poster }));
    phone.browse({ continueWatching: cont, newEpisodes: fresh, library: lib, labels: { continueWatching: t('Continuar assistindo'), newEpisodes: t('Novos episódios'), library: t('Biblioteca') } });
  }

  function renderContinue() {
    clear(cwRow);
    const items = stremio.continueWatching().slice(0, 20);
    if (!items.length) {
      cwRow.style.display = 'none';
      return;
    }
    cwRow.style.display = '';
    cwRow.appendChild(h('div.row-title', { text: t('Continuar assistindo') }));
    const track = h('div.row-track', { 'data-scroll-x': '', 'data-group': '' });
    items.forEach((it) => {
      const s = it.state;
      const ep = episodeLabel(s.video_id, it._id);
      const bg = /^tt\d+/.test(it._id) ? hero.background(it._id) : it.poster;
      track.appendChild(
        card(
          { name: it.name, poster: it.poster },
          {
            wide: true,
            image: bg,
            title: it.name + (ep ? ' · ' + ep : ''),
            progress: s.duration ? s.timeOffset / s.duration : 0,
            onSelect: () => openDetails(it.type, it._id, { videoId: s.video_id, autoStreams: true }),
          }
        )
      );
    });
    cwRow.appendChild(track);
    loadVisibleImages(cwRow);
  }

  // Fileiras sob demanda: só busca o catálogo quando a fileira chega perto da tela,
  // no máximo 2 ao mesmo tempo. Antes eram todas de uma vez e a TV ficava sem memória.
  let pending = [];
  let active = 0;

  function loadNearby() {
    if (el.offsetParent === null) return;
    const limit = window.innerHeight * 2.2;
    for (let i = 0; i < pending.length && active < 2; i++) {
      const p = pending[i];
      if (p.state !== 'idle') continue;
      if (!p.row.parentNode) {
        p.state = 'done';
        continue;
      }
      if (p.row.getBoundingClientRect().top > limit) break;
      p.state = 'loading';
      active++;
      p.load().then(() => {
        p.state = 'done';
        active--;
        loadNearby();
      });
    }
  }

  function renderBoard() {
    loadedBoard = true;
    pending = [];
    clear(rows);
    rows.appendChild(spinnerLine(t('Carregando catálogos...')));
    addons
      .load()
      .then(() => {
        clear(rows);
        const cats = addons.boardCatalogs();
        if (!cats.length) rows.appendChild(h('div.row-empty', { text: t('Nenhum catálogo. Entre na sua conta em Ajustes.') }));
        pending = cats.map((c) => Object.assign(buildRow(c, rows), { state: 'idle' }));
        loadNearby();
      })
      .catch((e) => {
        clear(rows);
        rows.appendChild(h('div.row-empty', { text: t('Erro ao carregar addons: {msg}', { msg: e.message }) }));
      });
  }

  heroUi.load();

  const view = {
    el: el,
    onShow: () => {
      renderContinue();
      syncContinue();
      renderNew();
      loadNew(false);
      publishBrowse();
      if (!loadedBoard) renderBoard();
      heroUi.resume();
      loadVisibleImages(el);
    },
    onHide: () => heroUi.pause(),
    onScroll: () => loadNearby(),
    // Chamado quando um vídeo começa: solta as fileiras (o catálogo volta do cache ao retornar).
    freeMemory: () => {
      newEpisodes.stop();
      newLoadedAt = 0; // check again once the video is closed
      pending = [];
      clear(rows);
      loadedBoard = false;
    },
    onKey: (e) => heroUi.onKey(e),
    reload: () => {
      heroUi.load();
      renderBoard();
    },
    destroy: () => {
      clearInterval(syncTimer);
      heroUi.pause();
      if (bar.__destroy) bar.__destroy();
    },
  };
  return view;
}

function episodeLabel(videoId, metaId) {
  if (!videoId || videoId === metaId) return '';
  const m = String(videoId).match(/:(\d+):(\d+)$/);
  return m ? epLabel(m[1], m[2]) : '';
}

const ROW_LIMIT = 20;

function buildRow(entry, parent) {
  const row = h('div.row', { 'data-anchor': '30' });
  const title = h('div.row-title', null, [entry.catalog.name || entry.catalog.id, h('small', { text: typeLabel(entry.catalog.type) + ' · ' + (entry.addon.manifest.name || '') })]);
  const track = h('div.row-track.pending', { 'data-scroll-x': '', 'data-group': '' }, spinnerLine(t('Carregando...')));
  row.appendChild(title);
  row.appendChild(track);
  parent.appendChild(row);
  const load = () =>
    addons
      .fetchCatalog(entry)
      .then((metas) => {
        clear(track);
        track.classList.remove('pending');
        if (!metas.length) {
          if (row.parentNode) parent.removeChild(row);
          return;
        }
        metas.slice(0, ROW_LIMIT).forEach((m) => {
          track.appendChild(
            card(m, {
              onSelect: () => openDetails(m.type || entry.catalog.type, m.id),
            })
          );
        });
        // "See all" at the end of the row when the catalog has more than the row shows.
        if (metas.length > ROW_LIMIT || canPage(entry)) {
          track.appendChild(
            h('div.card.see-all', { focusable: true, onSelect: () => router.push(CatalogView(entry)) }, [
              h('div.poster-wrap', null, h('div.see-all-label', null, [h('b', { text: '→' }), t('Ver tudo')])),
              h('div.name', { text: '' }),
            ])
          );
        }
        loadVisibleImages(row);
      })
      .catch(() => {
        if (row.parentNode) parent.removeChild(row);
      });
  return { row: row, load: load };
}

function perf() {
  return store.settings().perfMode !== false;
}

function typeLabel(type) {
  return { movie: t('Filmes'), series: t('Séries'), anime: t('Animes'), channel: t('Canais'), tv: 'TV' }[type] || type;
}

// ---------- Hero Banner ----------
function buildHero() {
  // Divs com background-image (tamanho fixo): a imagem só aparece pronta, já no tamanho final.
  const bgA = h('div.hero-bg');
  const bgB = h('div.hero-bg');
  const logo = h('img.hero-logo', { alt: '' });
  const title = h('div.hero-title');
  const meta = h('div.hero-meta');
  const desc = h('div.hero-desc');
  const dots = h('div.hero-dots');
  const watchBtn = h('div.btn.primary', { focusable: true, html: '<span class="ico">▶</span>' + t('Assistir'), onSelect: () => open(true) });
  const infoBtn = h('div.btn', { focusable: true, html: '<span class="ico">ⓘ</span>' + t('Detalhes'), onSelect: () => open(false) });
  const buttons = h('div.hero-buttons', { 'data-group': '' }, [watchBtn, infoBtn]);
  buttons.__last = watchBtn; // entrar no banner sempre pelo "Assistir"
  const el = h('div.hero', { 'data-anchor': '0' }, [
    bgA,
    bgB,
    h('div.hero-shade-left'),
    h('div.hero-shade-bottom'),
    h('div.hero-info', null, [logo, title, meta, desc, buttons, dots]),
  ]);

  let items = [];
  let index = 0;
  let timer = null;
  let front = bgA;
  let paused = true;
  let bgToken = 0;

  function open(play) {
    const it = items[index];
    if (it) openDetails(it.type, it.id, { autoStreams: play });
  }

  function render() {
    const it = items[index];
    if (!it) {
      el.style.display = 'none';
      return;
    }
    el.style.display = '';
    const back = front === bgA ? bgB : bgA;
    const pre = new Image();
    const token = ++bgToken;
    pre.onload = () => {
      if (token !== bgToken) return;
      back.style.backgroundImage = 'url("' + it.background + '")';
      // Dois frames para o fundo ser pintado antes do fade.
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          back.classList.add('show');
          front.classList.remove('show');
          front = back;
        })
      );
    };
    pre.src = it.background;
    title.textContent = it.name;
    title.style.display = 'none';
    logo.style.display = '';
    logo.onerror = () => {
      logo.style.display = 'none';
      title.style.display = '';
    };
    logo.src = it.logo;
    const parts = [];
    if (it.year) parts.push(it.year);
    if (it.runtime) parts.push(it.runtime);
    if (it.genres && it.genres.length) parts.push(it.genres.slice(0, 3).join(', '));
    meta.innerHTML = (it.rating ? '<span class="imdb">★ ' + escapeHtml(it.rating) + '</span> · ' : '') + escapeHtml(parts.join(' · '));
    desc.textContent = it.description || '';
    clear(dots);
    items.forEach((_, i) => dots.appendChild(h('span', { cls: i === index ? 'on' : '' })));
    // Pré-carrega o próximo fundo.
    const nx = items[(index + 1) % items.length];
    if (nx) new Image().src = nx.background;
  }

  function schedule() {
    clearTimeout(timer);
    if (paused || items.length < 2 || perf()) return; // Performance mode: changes only with left/right
    timer = setTimeout(() => {
      // Scrolled down to the rows: keep still, a fade there only costs smoothness.
      if (el.getBoundingClientRect().bottom > 0) {
        index = (index + 1) % items.length;
        render();
      }
      schedule();
    }, ROTATE_MS);
  }

  function go(delta) {
    if (!items.length) return;
    index = (index + delta + items.length) % items.length;
    render();
    schedule();
  }

  return {
    el: el,
    load: () =>
      hero
        .load()
        .then((list) => {
          items = list.slice(0, 12);
          index = 0;
          render();
          schedule();
        })
        .catch(() => {
          items = [];
          render();
        }),
    // Fora de vista, o banner solta os fundos (2 imagens 1920x1080 ≈ 16 MB na memória).
    pause: () => {
      paused = true;
      clearTimeout(timer);
      bgToken++;
      bgA.style.backgroundImage = '';
      bgB.style.backgroundImage = '';
      bgA.classList.remove('show');
      bgB.classList.remove('show');
    },
    resume: () => {
      paused = false;
      if (items.length) render();
      schedule();
    },
    // Esquerda no primeiro botão / direita no último: troca o destaque.
    onKey: (e) => {
      const cur = nav.current();
      if (!cur || !buttons.contains(cur)) return false;
      if (e.keyCode === KEY.LEFT && cur === watchBtn) {
        go(-1);
        return true;
      }
      if (e.keyCode === KEY.RIGHT && cur === infoBtn) {
        go(1);
        return true;
      }
      return false;
    },
  };
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
}
