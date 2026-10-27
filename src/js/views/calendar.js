// Release calendar with three tabs, one week at a time:
// - Anime: every episode AniList lists for the day (Japanese, Chinese and Korean; no adult titles).
// - Series: new episodes from TVmaze (streaming services worldwide and US TV), real series only.
// - Movies: films whose digital release (streaming / rent / buy) falls on the day, from TMDB
//   (needs the free TMDB key in Settings).
import { h, clear, loadVisibleImages } from '../lib/dom.js';
import * as nav from '../lib/nav.js';
import { postJSON, getJSON } from '../lib/http.js';
import * as addons from '../api/addons.js';
import * as extras from '../api/extras.js';
import { topbar, card, spinnerLine, toast, timeHM } from '../ui.js';
import * as router from '../router.js';
import { openDetails } from './details.js';
import { t } from '../lib/i18n.js';

const WEEKDAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const MODES = [
  { id: 'anime', label: 'Animes' },
  { id: 'series', label: 'Séries' },
  { id: 'movies', label: 'Filmes' },
];
// Digital release dates are most complete for the US; most releases are worldwide the same day.
const MOVIE_REGION = 'US';
// TVmaze show types that aren't series in the usual sense.
const NOT_SERIES = /^(Talk Show|News|Game Show|Variety|Sports|Award Show|Panel Show)$/;
const COUNTRY_TAG = { CN: 'CN', KR: 'KR', TW: 'TW' };

const ANIME_QUERY =
  'query($from:Int,$to:Int,$page:Int){Page(page:$page,perPage:50){pageInfo{hasNextPage}' +
  'airingSchedules(airingAt_greater:$from,airingAt_lesser:$to,sort:TIME){episode airingAt ' +
  'media{id idMal isAdult format countryOfOrigin title{romaji english} coverImage{large} averageScore}}}}';

function dayStart(offset) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + offset);
  return d;
}

function ymd(d) {
  return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
}

// ---------- Anime (AniList) ----------
function animeDay(offset) {
  const from = Math.floor(dayStart(offset).getTime() / 1000) - 1;
  const to = from + 86400 + 1;
  const all = [];
  const page = (p) =>
    postJSON('https://graphql.anilist.co', { query: ANIME_QUERY, variables: { from: from, to: to, page: p } }, { timeout: 15000 }).then((r) => {
      const pg = r && r.data && r.data.Page;
      if (!pg) return all;
      pg.airingSchedules.forEach((s) => {
        if (s.media && !s.media.isAdult) all.push(s);
      });
      return pg.pageInfo.hasNextPage && p < 10 ? page(p + 1) : all;
    });
  return page(1).then((list) =>
    list.map((s) => {
      const m = s.media;
      const name = (m.title && (m.title.english || m.title.romaji)) || '';
      return {
        name: name,
        poster: m.coverImage && m.coverImage.large,
        at: s.airingAt * 1000,
        slot: timeHM(new Date(s.airingAt * 1000)) + ' · Ep ' + s.episode,
        score: m.averageScore,
        tag: COUNTRY_TAG[m.countryOfOrigin],
        open: () => resolveAnime(m).then((r) => (r ? openDetails(r.type, r.id) : notFound(t('Esse anime não foi encontrado nos seus addons (instale o Anime Kitsu).')))),
      };
    })
  );
}

// AniList → ID que os addons do usuário entendem (Kitsu se houver addon de anime, senão IMDb).
// O tipo (série/filme) varia entre bases, então testa as combinações até um addon responder.
function resolveAnime(media) {
  return getJSON('https://arm.haglund.dev/api/v2/ids?source=anilist&id=' + media.id, { quiet: true })
    .catch(() => null)
    .then((ids) => {
      const movieFirst = media.format === 'MOVIE' || (ids && ids.media === 'MOVIE');
      const types = movieFirst ? ['movie', 'series'] : ['series', 'movie'];
      const cands = [];
      const add = (id) => types.forEach((type) => cands.push({ type: type, id: id }));
      if (ids && ids.kitsu) add('kitsu:' + ids.kitsu);
      if (ids && ids.imdb) add(ids.imdb);
      add('anilist:' + media.id);
      const usable = cands.filter((c) => addons.withResource('meta', c.type, c.id).length > 0);
      let i = 0;
      const next = () => {
        if (i >= usable.length) return null;
        const c = usable[i++];
        return addons.fetchMeta(c.type, c.id).then(() => c, next);
      };
      return next();
    });
}

// ---------- Series (TVmaze) ----------
function seriesDay(offset) {
  const date = ymd(dayStart(offset));
  const opt = { timeout: 15000, quiet: true };
  return Promise.all([
    getJSON('https://api.tvmaze.com/schedule/web?date=' + date, opt).catch(() => []),
    getJSON('https://api.tvmaze.com/schedule?country=US&date=' + date, opt).catch(() => []),
  ]).then((lists) => {
    const seen = {};
    const out = [];
    lists[0].concat(lists[1]).forEach((e) => {
      const show = e.show || (e._embedded && e._embedded.show);
      if (!show || !show.externals || !show.externals.imdb || NOT_SERIES.test(show.type || '')) return;
      const key = show.id + ':' + e.season + ':' + e.number;
      if (seen[key]) return;
      seen[key] = true;
      const network = (show.webChannel && show.webChannel.name) || (show.network && show.network.name) || '';
      const at = e.airstamp ? Date.parse(e.airstamp) : 0;
      out.push({
        name: show.name,
        poster: show.image && (show.image.original || show.image.medium),
        at: at,
        slot: (at ? timeHM(new Date(at)) + ' · ' : '') + 'S' + e.season + ' E' + (e.number || '?'),
        score: show.rating && show.rating.average ? Math.round(show.rating.average * 10) : 0,
        tag: network,
        open: () => openDetails('series', show.externals.imdb),
      });
    });
    return out.sort((a, b) => a.at - b.at);
  });
}

// ---------- Movies (TMDB digital releases) ----------
function moviesDay(offset) {
  return extras.digitalReleases(ymd(dayStart(offset)), MOVIE_REGION).then((list) => {
    if (list === null) return null; // no TMDB key
    return list.map((m) => ({
      name: m.name,
      poster: m.poster,
      slot: t('Streaming'),
      score: m.score,
      open: () => extras.tmdbImdb('movie', m.tmdb).then((imdb) => (imdb ? openDetails('movie', imdb) : notFound(t('Esse filme ainda não tem página no Stremio.')))),
    }));
  });
}

function notFound(msg) {
  toast(msg, 5000);
}

const FETCH = { anime: animeDay, series: seriesDay, movies: moviesDay };

export function CalendarView() {
  const el = h('div.view');
  const scroller = h('div.scroll-y', { 'data-scroll-y': '' });
  const bar = topbar('calendar', router.goTab);
  const modes = h('div.cal-days.cal-modes', { 'data-group': '' });
  const days = h('div.cal-days', { 'data-group': '', 'data-scroll-x': '' });
  const grid = h('div.grid');
  scroller.appendChild(bar);
  scroller.appendChild(modes);
  scroller.appendChild(days);
  scroller.appendChild(grid);
  el.appendChild(scroller);

  let mode = 'anime';
  let current = 0;
  let token = 0;

  function label(offset) {
    if (offset === 0) return t('Hoje');
    if (offset === 1) return t('Amanhã');
    if (offset === -1) return t('Ontem');
    return t(WEEKDAYS[dayStart(offset).getDay()]);
  }

  function renderModes() {
    clear(modes);
    MODES.forEach((m, i) =>
      modes.appendChild(
        h('div.chip', {
          focusable: true,
          cls: m.id === mode ? 'active' : '',
          text: t(m.label),
          onSelect: () => {
            mode = m.id;
            renderModes();
            nav.focus(modes.children[i]);
            load();
          },
        })
      )
    );
  }

  function renderDays() {
    clear(days);
    for (let o = -1; o <= 6; o++) {
      const off = o;
      const d = dayStart(off);
      days.appendChild(
        h('div.chip', {
          focusable: true,
          cls: off === current ? 'active' : '',
          text: label(off) + ' ' + ('0' + d.getDate()).slice(-2) + '/' + ('0' + (d.getMonth() + 1)).slice(-2),
          onSelect: () => {
            current = off;
            renderDays();
            nav.focus(days.children[off + 1]);
            load();
          },
        })
      );
    }
    days.__last = days.children[current + 1];
  }

  function load() {
    const my = ++token;
    clear(grid);
    grid.appendChild(spinnerLine(t('Buscando lançamentos...')));
    FETCH[mode](current)
      .then((list) => {
        if (my !== token) return;
        clear(grid);
        if (list === null) {
          grid.appendChild(h('div.hint', { text: t('As datas de streaming dos filmes vêm do TMDB: coloque sua chave grátis do TMDB em Ajustes.') }));
          return;
        }
        if (!list.length) {
          grid.appendChild(h('div.hint', { text: mode === 'movies' ? t('Nenhum filme chega ao streaming neste dia.') : t('Nenhum episódio neste dia.') }));
          return;
        }
        const now = Date.now();
        list.forEach((it) => {
          const c = card(
            { name: it.name, poster: it.poster },
            {
              title: it.name,
              onSelect: () => {
                toast(t('Abrindo {name}...', { name: it.name }), 2000);
                it.open();
              },
            }
          );
          const wrap = c.querySelector('.poster-wrap');
          wrap.appendChild(h('div.cal-slot', { cls: it.at && it.at < now ? 'aired' : '', text: it.slot }));
          if (it.score) wrap.appendChild(h('div.badge.cal-score', { text: it.score + '%' }));
          if (it.tag) wrap.appendChild(h('div.cal-tag', { text: it.tag }));
          grid.appendChild(c);
        });
        loadVisibleImages(el, 400);
      })
      .catch((e) => {
        if (my !== token) return;
        clear(grid);
        grid.appendChild(h('div.hint', { text: t('Não foi possível carregar o calendário: {msg}', { msg: e.message }) }));
      });
  }

  renderModes();
  renderDays();
  load();

  return {
    el: el,
    onShow: () => loadVisibleImages(el, 400),
    destroy: () => bar.__destroy && bar.__destroy(),
  };
}
