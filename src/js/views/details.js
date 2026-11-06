// Detalhes: informações à esquerda; à direita, episódios (séries) ou fontes (streams).
import { h, clear, loadVisibleImages } from '../lib/dom.js';
import * as nav from '../lib/nav.js';
import * as addons from '../api/addons.js';
import * as stremio from '../api/stremio.js';
import * as store from '../lib/store.js';
import * as server from '../api/server.js';
import * as hero from '../api/hero.js';
import { toast, spinnerLine, menu, fmtTime } from '../ui.js';
import * as router from '../router.js';
import { openPlayer } from './player.js';
import { PersonView } from './person.js';
import * as watched from '../lib/watched.js';
import { trailerIds, openTrailer } from './trailer.js';
import * as extras from '../api/extras.js';
import { smallThumb } from '../lib/img.js';
import { isAnime } from '../api/skip.js';
import { t, epLabel } from '../lib/i18n.js';

export function openDetails(type, id, opts) {
  router.push(DetailsView(type, id, opts || {}));
}

export function sortedVideos(meta) {
  return (meta.videos || [])
    .filter((v) => v && v.id)
    .slice()
    .sort((a, b) => {
      const sa = a.season === 0 ? 9999 : a.season || 0;
      const sb = b.season === 0 ? 9999 : b.season || 0;
      return sa - sb || (a.episode || 0) - (b.episode || 0);
    });
}

// Smart Choice waits at most this long for slower add-ons, and keeps this many runners-up
// for the player to fall back on if a source won't play.
const SMART_WAIT_MS = 10000;
const SMART_FALLBACKS = 4;

function DetailsView(type, id, opts) {
  const el = h('div.view');
  const bg = h('img.details-bg', { alt: '' });
  const info = h('div.details-info', null, spinnerLine(t('Carregando...')));
  const panel = h('div.details-panel');
  el.appendChild(bg);
  el.appendChild(h('div.details-shade'));
  el.appendChild(info);
  el.appendChild(panel);

  let meta = null;
  let mode = 'none';
  let season = null;
  let streamsVideo = null;
  let alive = true;
  let watchBtn = null;
  let libBtn = null;
  let tmdbInfo = null;

  const isSeries = () => meta && sortedVideos(meta).length > 0 && meta.type !== 'movie';

  function movieVideoId() {
    return (meta.behaviorHints && meta.behaviorHints.defaultVideoId) || meta.id;
  }

  function nextUpVideo() {
    const vids = sortedVideos(meta);
    const li = stremio.libraryItem(meta.id);
    if (li && li.state && li.state.video_id) {
      const i = vids.findIndex((v) => v.id === li.state.video_id);
      if (i >= 0) return vids[i];
    }
    return vids.filter((v) => v.season !== 0)[0] || vids[0];
  }

  function renderInfo() {
    clear(info);
    const logo = h('img.details-logo', { alt: '' });
    const title = h('div.details-title', { text: meta.name });
    title.style.display = 'none';
    logo.onerror = () => {
      logo.style.display = 'none';
      title.style.display = '';
    };
    logo.src = meta.logo || hero.logo(meta.id);
    const parts = [];
    if (meta.releaseInfo || meta.year) parts.push(meta.releaseInfo || meta.year);
    if (meta.runtime) parts.push(meta.runtime);
    if (isSeries()) {
      const seasons = uniqueSeasons().filter((s) => s !== 0);
      if (seasons.length) parts.push(t(seasons.length > 1 ? '{n} temporadas' : '{n} temporada', { n: seasons.length }));
    }
    const metaLine = h('div.details-meta', { text: parts.join('  ·  ') });
    const ratingsEl = h('div.ratings');
    renderRatings(ratingsEl, meta.imdbRating ? [{ cls: 'imdb', label: 'IMDb', value: String(meta.imdbRating) }] : []);
    const genres = h(
      'div.details-genres',
      null,
      (meta.genres || meta.genre || []).slice(0, 5).map((g) => h('span', { text: g }))
    );
    const desc = h('div.details-desc', { text: meta.description || '' });
    const cast = (meta.cast || []).slice(0, 5);
    const director = (meta.director || []).slice(0, 2);
    // Texto vindo do addon entra como texto, nunca como HTML (um addon malicioso não injeta código).
    const castLine = h('div.details-cast', null, [
      director.length ? h('b', { text: t('Direção: ') }) : null,
      director.length ? director.join(', ') + '   ' : null,
      cast.length ? h('b', { text: t('Elenco: ') }) : null,
      cast.length ? cast.join(', ') : null,
    ]);

    watchBtn = h('div.btn.primary', { focusable: true, 'data-autofocus': '', onSelect: () => onWatch(smartOn()) });
    libBtn = h('div.btn', { focusable: true, onSelect: toggleLibrary });
    // With Smart Choice on, Watch plays straight away; this opens the full source list instead.
    const sourcesBtn = smartOn() ? h('div.btn', { focusable: true, onSelect: () => onWatch(false) }, [h('span.ico', { text: '☰' }), t('Fontes')]) : null;
    const trailers = trailerIds(meta);
    const trailerBtn = trailers.length
      ? h('div.btn', { focusable: true, onSelect: () => openTrailer(trailers, meta.name) }, [h('span.ico', { text: '🎬' }), t('Trailer')])
      : null;
    updateButtons();
    info.appendChild(logo);
    info.appendChild(title);
    info.appendChild(metaLine);
    info.appendChild(ratingsEl);
    info.appendChild(genres);
    info.appendChild(desc);
    info.appendChild(castLine);
    info.appendChild(h('div.details-buttons', { 'data-group': '' }, [watchBtn, sourcesBtn, trailerBtn, libBtn]));
    loadExtras({ logo: logo, title: title, desc: desc, castLine: castLine, ratingsEl: ratingsEl });
  }

  function renderRatings(el, list) {
    clear(el);
    list.forEach((r) => el.appendChild(h('span.rating', { cls: r.cls }, [h('b', { text: r.label }), r.value])));
    el.style.display = list.length ? '' : 'none';
  }

  // Notas extras e dados em PT-BR (TMDB/MDBList opcionais, AniList sem chave).
  function loadExtras(ui) {
    extras
      .ratings(meta, isAnime(meta))
      .then((list) => alive && renderRatings(ui.ratingsEl, list))
      .catch(() => {});
    if (!extras.hasTmdb()) return;
    extras
      .localized(meta)
      .then((loc) => {
        if (!alive || !loc) return;
        tmdbInfo = loc;
        if (loc.overview) ui.desc.textContent = loc.overview;
        if (loc.title) ui.title.textContent = loc.title;
        if (loc.logo) {
          ui.logo.style.display = '';
          ui.title.style.display = 'none';
          ui.logo.src = loc.logo;
        }
        if (loc.cast.length) {
          // Each cast member opens their profile (photo, biography, films and series).
          const row = h(
            'div.cast-row',
            { 'data-group': '' },
            loc.cast.slice(0, 7).map((c) =>
              h('div.cast', { focusable: true, onSelect: () => router.push(PersonView(c.id, c.name)) }, [
                h('div.ph', null, c.photo ? h('img', { src: c.photo, alt: '' }) : null),
                h('div.nm', { text: c.name }),
                h('div.ch', { text: c.character }),
              ])
            )
          );
          ui.castLine.parentNode.replaceChild(row, ui.castLine);
        }
        if (mode === 'episodes') localizeEpisodes();
      })
      .catch(() => {});
  }

  // Troca títulos/sinopses dos episódios visíveis pelos do TMDB em PT-BR.
  function localizeEpisodes() {
    if (!tmdbInfo || tmdbInfo.tmdbType !== 'tv' || season === null) return;
    const forSeason = season;
    extras
      .seasonPt(tmdbInfo.tmdbId, season)
      .then((map) => {
        if (!alive || mode !== 'episodes' || forSeason !== season) return;
        Array.prototype.forEach.call(panel.querySelectorAll('.episode'), (row) => {
          const ep = map[row.__episode];
          if (!ep) return;
          if (ep.name) row.querySelector('.ep-title').textContent = row.__episode + '. ' + ep.name;
          if (ep.overview) row.querySelector('.ep-desc').textContent = ep.overview;
        });
      })
      .catch(() => {});
  }

  function updateButtons() {
    const li = stremio.libraryItem(meta.id);
    let label = t('Assistir');
    if (li && li.state && li.state.timeOffset > 0) {
      const ep = isSeries() ? sortedVideos(meta).find((v) => v.id === li.state.video_id) : null;
      label = t('Continuar') + (ep ? ' ' + epLabel(ep.season, ep.episode) : '');
    }
    watchBtn.innerHTML = '<span class="ico">▶</span>' + label;
    libBtn.innerHTML = stremio.isInLibrary(meta.id) ? '<span class="ico">✓</span>' + t('Na biblioteca') : '<span class="ico">＋</span>' + t('Biblioteca');
  }

  function smartOn() {
    return store.settings().smartChoice !== false;
  }

  function onWatch(smart) {
    if (isSeries()) {
      const v = nextUpVideo();
      if (v) showStreams(v, true, smart);
    } else {
      showStreams({ id: movieVideoId(), title: meta.name }, true, smart);
    }
  }

  function toggleLibrary() {
    const inLib = stremio.isInLibrary(meta.id);
    stremio.setInLibrary(meta, !inLib).then(() => {
      updateButtons();
      toast(inLib ? t('Removido da biblioteca') : t('Adicionado à biblioteca'));
    });
  }

  function uniqueSeasons() {
    const out = [];
    sortedVideos(meta).forEach((v) => {
      const s = v.season || 0;
      if (out.indexOf(s) < 0) out.push(s);
    });
    return out;
  }

  // ---------- Episódios ----------
  function showEpisodes(focusVideoId) {
    mode = 'episodes';
    clear(panel);
    const seasons = uniqueSeasons();
    if (season === null) {
      const nu = nextUpVideo();
      season = nu ? nu.season || 0 : seasons[0];
    }
    panel.appendChild(h('div.panel-head', null, h('h2', { text: t('Episódios') })));
    const chips = h(
      'div.seasons',
      { 'data-scroll-x': '', 'data-group': '', 'data-pad': '60' },
      seasons.map((s) =>
        h('div.chip', {
          focusable: true,
          cls: s === season ? 'active' : '',
          text: s === 0 ? t('Especiais') : t('Temporada {n}', { n: s }),
          onSelect: () => {
            season = s;
            showEpisodes();
            const first = panel.querySelector('.episode');
            if (first) nav.focus(first);
          },
        })
      )
    );
    panel.appendChild(chips);
    const list = h('div.list', { 'data-scroll-y': '', 'data-pad-y': '120', 'data-group': '', 'data-vertical': '' });
    list.style.top = '190px';
    const li = stremio.libraryItem(meta.id);
    let focusEl = null;
    sortedVideos(meta)
      .filter((v) => (v.season || 0) === season)
      .forEach((v) => {
        const thumb = h('div.thumb');
        if (v.thumbnail) {
          const im = h('img', { alt: '' });
          im.setAttribute('data-lazy', smallThumb(v.thumbnail));
          im.onerror = () => (im.style.display = 'none');
          thumb.appendChild(im);
        }
        let sub = t('Episódio {n}', { n: v.episode || '?' });
        if (v.released) sub += ' · ' + formatDate(v.released);
        const inProgress = li && li.state && li.state.video_id === v.id && li.state.timeOffset > 0;
        if (inProgress) sub += ' · ' + t('parou em {time}', { time: fmtTime(li.state.timeOffset / 1000) });
        // Watched markers: a check on finished episodes, a bar on half-watched ones.
        const done = watched.isWatched(v.id);
        const part = done ? 0 : watched.progress(v.id) || (inProgress && li.state.duration ? li.state.timeOffset / li.state.duration : 0);
        if (done) thumb.appendChild(h('div.ep-watched', { text: '✓' }));
        else if (part > 0) thumb.appendChild(h('div.progress', null, h('i', { style: { width: Math.round(part * 100) + '%' } })));
        const row = h('div.episode', { focusable: true, cls: done ? 'watched' : '', onSelect: () => showStreams(v, true) }, [
          thumb,
          h('div.ep-info', null, [
            h('div.ep-title', { text: (v.episode ? v.episode + '. ' : '') + (v.name || v.title || t('Episódio')) }),
            h('div.ep-sub', { text: sub }),
            h('div.ep-desc', { text: v.overview || v.description || '' }),
          ]),
        ]);
        row.__episode = v.episode;
        if (v.id === focusVideoId || (!focusVideoId && inProgress)) focusEl = row;
        list.appendChild(row);
      });
    panel.appendChild(list);
    // Ao entrar na lista, cai no episódio em andamento (ou no primeiro), não no mais próximo.
    list.__last = focusEl || list.firstChild;
    localizeEpisodes();
    loadVisibleImages(panel, 300);
    if (focusEl && focusVideoId) setTimeout(() => nav.focus(focusEl), 0);
  }

  // ---------- Fontes (como no Kai do PC: filtro por addon, debrid primeiro) ----------
  function addonRank(a) {
    const n = (a.manifest.name || '') + ' ' + a.transportUrl;
    if (/realdebrid|alldebrid|premiumize|debridlink|torbox|easydebrid|offcloud|\bRD\b/i.test(n)) return 0;
    if (/torrentio/i.test(n)) return 1;
    return 2;
  }

  function runtimeMinutes() {
    const r = String(meta.runtime || '');
    const hMatch = r.match(/(\d+)\s*h/i);
    const mMatch = r.match(/(\d+)\s*min/i);
    const mins = (hMatch ? parseInt(hMatch[1], 10) * 60 : 0) + (mMatch ? parseInt(mMatch[1], 10) : 0);
    return mins || (isSeries() ? 45 : 110);
  }

  // Estimativa da taxa do arquivo (tamanho ÷ duração): avisa o que pesa no Wi-Fi da TV (~34 Mbps medidos).
  function streamBadges(s) {
    const text = (s.name || '') + ' ' + (s.title || s.description || '');
    const out = [];
    if (/2160p|\b4k\b|uhd/i.test(text)) out.push({ t: '4K' });
    if (/dolby.?vision|\bdovi\b|\bdv\b/i.test(text)) out.push({ t: 'Dolby Vision', warn: true });
    else if (/hdr/i.test(text)) out.push({ t: 'HDR' });
    if (/remux/i.test(text)) out.push({ t: 'REMUX', warn: true });
    const m = text.match(/(\d+(?:[.,]\d+)?)\s*(GB|MB)\b/i);
    if (m) {
      const mb = parseFloat(m[1].replace(',', '.')) * (m[2].toUpperCase() === 'GB' ? 1024 : 1);
      const mbps = Math.round((mb * 8) / (runtimeMinutes() * 60));
      if (mbps > 0) out.push({ t: '~' + mbps + ' Mbps', warn: mbps > 30 });
    }
    return out;
  }

  function showStreams(video, focusFirst, smart) {
    mode = 'streams';
    streamsVideo = video;
    clear(panel);
    const head = isSeries() ? epLabel(video.season, video.episode) + ' · ' + (video.name || video.title || '') : t('Fontes');
    const filterBtn = h('div.btn.small', { focusable: true, text: t('Todos ▾'), onSelect: () => filterMenu() });
    panel.appendChild(h('div.panel-head', { 'data-group': '' }, [h('h2', { text: head }), filterBtn]));
    const sub = h('div.panel-sub');
    const barFill = h('i');
    panel.appendChild(sub);
    panel.appendChild(h('div.load-bar', null, barFill));
    const list = h('div.list', { 'data-scroll-y': '', 'data-pad-y': '120', 'data-group': '', 'data-vertical': '' });
    list.style.top = '178px';
    panel.appendChild(list);
    const srcs = addons
      .withResource('stream', meta.type, video.id)
      .map((a, i) => ({ a: a, i: i }))
      .sort((x, y) => addonRank(x.a) - addonRank(y.a) || x.i - y.i)
      .map((x) => x.a);
    if (!srcs.length) {
      list.appendChild(h('div.loading-line', { text: t('Nenhum addon de streams instalado (ex.: Torrentio). Instale pela sua conta Stremio.') }));
      return;
    }
    // Um grupo por addon, já na ordem de prioridade; os streams entram no grupo certo ao chegar.
    const groups = srcs.map((a) => {
      const el = h('div.stream-group');
      list.appendChild(el);
      return { addon: a, el: el, count: 0, done: false };
    });
    const loadingLine = spinnerLine(t('Buscando fontes nos addons...'));
    list.appendChild(loadingLine);
    let filter = 'all';
    let pendingCount = srcs.length;
    const all = [];
    let autoFocused = null;
    let serverOk = server.isAvailable();
    // Smart Choice: picks a source once the debrid add-ons answer (or after SMART_WAIT_MS),
    // unless the user moves the focus first.
    let smartActive = !!smart;
    const smartTimer = smartActive ? setTimeout(() => decideSmart(true), SMART_WAIT_MS) : null;

    function stopSmart() {
      smartActive = false;
      clearTimeout(smartTimer);
    }

    // Candidates in list order (add-on priority, then each add-on's own order), with the ones
    // that play best on the TV first: direct links before torrents, then Dolby Vision, REMUX and
    // very high bitrates (the badges marked as warnings) last, and 4K/HDR after 1080p (over Wi-Fi
    // the 2017 TVs break up on them).
    function smartCandidates() {
      const out = [];
      groups.forEach((g, gi) => {
        (g.streams || []).forEach((s, si) => {
          if (!server.isPlayableType(s)) return;
          const needs = server.needsServer(s);
          if (needs && !serverOk) return;
          const badges = streamBadges(s);
          const warn = badges.some((b) => b.warn);
          const heavy = badges.some((b) => b.t === '4K' || b.t === 'HDR');
          out.push({ s: s, key: [needs ? 1 : 0, warn ? 1 : 0, heavy ? 1 : 0, gi, si] });
        });
      });
      out.sort((x, y) => {
        for (let i = 0; i < 5; i++) if (x.key[i] !== y.key[i]) return x.key[i] - y.key[i];
        return 0;
      });
      return out.map((c) => c.s);
    }

    function decideSmart(timedOut) {
      if (!smartActive || !alive || streamsVideo !== video) return;
      if (focusFirst && autoFocused && nav.current() !== autoFocused) return stopSmart(); // user took over
      const list = smartCandidates();
      const debridPending = groups.some((g) => addonRank(g.addon) === 0 && !g.done);
      const best = list[0];
      const clean = best && !server.needsServer(best) && !streamBadges(best).some((b) => b.warn);
      if (!best) {
        if (pendingCount <= 0 || timedOut) {
          stopSmart();
          if (pendingCount <= 0) toast(t('Escolha inteligente: nenhuma fonte que a TV toque. Escolha na lista.'), 5000);
        }
        return;
      }
      if (pendingCount > 0 && !timedOut && (debridPending || !clean)) return;
      stopSmart();
      play(video, best, all, list.slice(1, 1 + SMART_FALLBACKS));
    }

    function status() {
      if (smartActive) {
        sub.textContent = t('Escolha inteligente: procurando a melhor fonte...') + '  ·  ' + t('aperte uma seta para escolher você');
        barFill.style.width = Math.round(((srcs.length - pendingCount) / srcs.length) * 100) + '%';
        return;
      }
      const srv = serverOk ? t('Servidor do PC conectado') : t('Servidor do PC não conectado: só links diretos');
      sub.textContent = srv + (pendingCount > 0 ? '  ·  ' + t('{n} addon(s) ainda carregando', { n: pendingCount }) : '  ·  ' + t('{n} fontes', { n: all.length }));
      barFill.style.width = Math.round(((srcs.length - pendingCount) / srcs.length) * 100) + '%';
      const g = groups.find((x) => x.addon.transportUrl === filter);
      filterBtn.textContent = (g ? g.addon.manifest.name : t('Todos')) + ' ▾';
    }

    function firstVisibleItem() {
      const items = list.querySelectorAll('.stream');
      for (let i = 0; i < items.length; i++) if (items[i].offsetParent !== null && !items[i].classList.contains('disabled')) return items[i];
      return null;
    }

    function applyFilter() {
      groups.forEach((g) => (g.el.style.display = filter === 'all' || filter === g.addon.transportUrl ? '' : 'none'));
      list.scrollTop = 0;
      status();
      const first = firstVisibleItem();
      if (first) nav.focus(first);
    }

    function filterMenu() {
      const opts = [{ label: t('Todos'), sub: t('{n} fontes', { n: all.length }), value: 'all', checked: filter === 'all' }].concat(
        groups.map((g) => ({
          label: g.addon.manifest.name || g.addon.manifest.id,
          sub: g.done ? t('{n} fontes', { n: g.count }) : t('carregando...'),
          value: g.addon.transportUrl,
          checked: filter === g.addon.transportUrl,
        }))
      );
      menu(t('Mostrar fontes de'), opts, {
        onPick: (v) => {
          filter = v;
          applyFilter();
        },
      });
    }

    status();
    (serverOk ? Promise.resolve() : server.check().then((r) => (serverOk = r.ok)))
      .then(() => {
        status();
        return addons.fetchStreams(meta.type, video.id, (addon, streams) => {
          if (!alive || streamsVideo !== video) return;
          pendingCount--;
          const g = groups.find((x) => x.addon === addon);
          if (g) {
            g.done = true;
            g.count = streams.length;
            g.streams = streams;
            streams.forEach((s) => {
              all.push(s);
              g.el.appendChild(streamItem(s, video, serverOk, all));
            });
          }
          // Mantém o foco na primeira fonte (a de maior prioridade) enquanto o usuário não mexer.
          if (focusFirst && (!autoFocused || nav.current() === autoFocused)) {
            const first = firstVisibleItem();
            if (first) {
              autoFocused = first;
              nav.focus(first);
            }
          }
          if (pendingCount <= 0) {
            if (loadingLine.parentNode) list.removeChild(loadingLine);
            if (!all.length) list.appendChild(h('div.loading-line', { text: t('Nenhuma fonte encontrada.') }));
          }
          status();
          decideSmart(false);
        });
      })
      .catch(() => {});
  }

  function streamItem(s, video, serverOk, all) {
    const playableType = server.isPlayableType(s);
    const needs = server.needsServer(s);
    const disabled = !playableType || (needs && !serverOk);
    const tags = [];
    if (!playableType) tags.push(h('span.s-tag.warn', { text: t('Não suportado na TV') }));
    else if (needs) tags.push(h('span.s-tag', { cls: serverOk ? '' : 'warn', text: serverOk ? t('Torrent · via PC') : t('Torrent · precisa do PC') }));
    else tags.push(h('span.s-tag.ok', { text: t('Direto') }));
    streamBadges(s).forEach((b) => tags.push(h('span.s-tag', { cls: b.warn ? 'warn' : '', text: b.t })));
    return h(
      'div.stream',
      {
        focusable: true,
        cls: disabled ? 'disabled' : '',
        onSelect: () => {
          if (!playableType) return toast(t('Esse tipo de fonte não abre na TV.'));
          if (needs && !serverOk) return toast(t('Torrent precisa do stremio-service rodando no PC. Configure em Ajustes.'), 5000);
          play(video, s, all);
        },
      },
      [
        h('div.s-addon', { text: (s.name || s.addon || '').trim() }),
        h('div.s-body', null, [h('div.s-title', { text: (s.title || s.description || '').trim() }), h('div.s-tags', null, tags)]),
      ]
    );
  }

  function play(video, stream, all, fallbacks) {
    const li = stremio.libraryItem(meta.id);
    const resumeMs = li && li.state && li.state.video_id === video.id ? li.state.timeOffset : 0;
    const start = (ms) =>
      openPlayer({ meta: meta, video: video, stream: stream, streams: all, startTime: ms, isSeries: isSeries(), fallbacks: fallbacks || [] });
    if (resumeMs > 30000) {
      menu(
        t('Continuar de onde parou?'),
        [
          { label: t('Continuar de {time}', { time: fmtTime(resumeMs / 1000) }), value: resumeMs, checked: true },
          { label: t('Começar do início'), value: 0 },
        ],
        { center: true, onPick: (v) => start(v) }
      );
    } else start(0);
  }

  function formatDate(iso) {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    return ('0' + d.getDate()).slice(-2) + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + '/' + d.getFullYear();
  }

  addons
    .load()
    .then(() => addons.fetchMeta(type, id))
    .then((m) => {
      if (!alive) return;
      meta = m;
      if (!meta.type) meta.type = type;
      bg.onerror = () => (bg.style.display = 'none');
      // Fundo como imagem sob demanda: é liberado quando o player abre por cima.
      bg.setAttribute('data-lazy', meta.background || hero.background(meta.id));
      loadVisibleImages(el);
      renderInfo();
      if (isSeries()) {
        if (opts.videoId) {
          const v = sortedVideos(meta).find((x) => x.id === opts.videoId);
          if (v) season = v.season || 0;
          if (v && opts.autoStreams) {
            showStreams(v, true);
            return;
          }
        }
        showEpisodes(opts.videoId);
        if (opts.autoStreams) {
          const v = nextUpVideo();
          if (v) showStreams(v, true);
          return;
        }
      } else {
        showStreams({ id: movieVideoId(), title: meta.name }, !!opts.autoStreams);
      }
      if (!opts.autoStreams) nav.focus(watchBtn);
    })
    .catch((e) => {
      clear(info);
      info.appendChild(h('div.details-title', { text: t('Não foi possível abrir') }));
      info.appendChild(h('div.details-desc', { text: e.message }));
      info.appendChild(h('div.btn', { focusable: true, 'data-autofocus': '', text: t('Voltar'), onSelect: () => router.pop() }));
      nav.focusFirst(el);
    });

  return {
    el: el,
    onShow: () => {
      if (meta && watchBtn) updateButtons();
      loadVisibleImages(panel, 300);
    },
    onBack: () => {
      if (mode === 'streams' && isSeries()) {
        const v = streamsVideo;
        showEpisodes(v && v.id);
        return true;
      }
      return false;
    },
    destroy: () => {
      alive = false;
    },
  };
}
