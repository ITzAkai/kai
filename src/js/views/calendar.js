// Calendário de lançamentos de anime (como o "daily schedule" do Kai), via AniList.
import { h, clear, loadVisibleImages } from '../lib/dom.js';
import * as nav from '../lib/nav.js';
import { postJSON, getJSON } from '../lib/http.js';
import * as addons from '../api/addons.js';
import { topbar, card, spinnerLine, toast, timeHM } from '../ui.js';
import * as router from '../router.js';
import { openDetails } from './details.js';

const WEEKDAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const QUERY =
  'query($from:Int,$to:Int,$page:Int){Page(page:$page,perPage:50){pageInfo{hasNextPage}' +
  'airingSchedules(airingAt_greater:$from,airingAt_lesser:$to,sort:TIME){episode airingAt ' +
  'media{id idMal isAdult format countryOfOrigin title{romaji english} coverImage{large} averageScore}}}}';

function dayStart(offset) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + offset);
  return d;
}

function fetchDay(offset) {
  const from = Math.floor(dayStart(offset).getTime() / 1000) - 1;
  const to = from + 86400 + 1;
  const all = [];
  const page = (p) =>
    postJSON('https://graphql.anilist.co', { query: QUERY, variables: { from: from, to: to, page: p } }, { timeout: 15000 }).then((r) => {
      const pg = r && r.data && r.data.Page;
      if (!pg) return all;
      pg.airingSchedules.forEach((s) => {
        if (s.media && !s.media.isAdult && s.media.countryOfOrigin === 'JP') all.push(s);
      });
      return pg.pageInfo.hasNextPage && p < 4 ? page(p + 1) : all;
    });
  return page(1);
}

// AniList → ID que os addons do usuário entendem (Kitsu se houver addon de anime, senão IMDb).
// O tipo (série/filme) varia entre bases, então testa as combinações até um addon responder.
function resolve(media) {
  return getJSON('https://arm.haglund.dev/api/v2/ids?source=anilist&id=' + media.id, { quiet: true })
    .catch(() => null)
    .then((ids) => {
      const movieFirst = media.format === 'MOVIE' || (ids && ids.media === 'MOVIE');
      const types = movieFirst ? ['movie', 'series'] : ['series', 'movie'];
      const cands = [];
      const add = (id) => types.forEach((t) => cands.push({ type: t, id: id }));
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

export function CalendarView() {
  const el = h('div.view');
  const scroller = h('div.scroll-y', { 'data-scroll-y': '' });
  const bar = topbar('calendar', router.goTab);
  const days = h('div.cal-days', { 'data-group': '', 'data-scroll-x': '' });
  const grid = h('div.grid');
  scroller.appendChild(bar);
  scroller.appendChild(days);
  scroller.appendChild(grid);
  el.appendChild(scroller);

  let current = 0;
  let token = 0;

  function label(offset) {
    if (offset === 0) return 'Hoje';
    if (offset === 1) return 'Amanhã';
    if (offset === -1) return 'Ontem';
    return WEEKDAYS[dayStart(offset).getDay()];
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
    grid.appendChild(spinnerLine('Buscando lançamentos...'));
    fetchDay(current)
      .then((list) => {
        if (my !== token) return;
        clear(grid);
        if (!list.length) {
          grid.appendChild(h('div.hint', { text: 'Nenhum episódio neste dia.' }));
          return;
        }
        const now = Date.now() / 1000;
        list.forEach((s) => {
          const m = s.media;
          const name = (m.title && (m.title.english || m.title.romaji)) || '';
          const c = card(
            { name: name, poster: m.coverImage && m.coverImage.large },
            {
              title: name,
              onSelect: () => {
                toast('Abrindo ' + name + '...', 2000);
                resolve(m).then((r) => {
                  if (!r) return toast('Esse anime não foi encontrado nos seus addons (instale o Anime Kitsu).', 5000);
                  openDetails(r.type, r.id);
                });
              },
            }
          );
          const time = timeHM(new Date(s.airingAt * 1000));
          c.querySelector('.poster-wrap').appendChild(h('div.cal-slot', { cls: s.airingAt < now ? 'aired' : '', text: time + ' · Ep ' + s.episode }));
          if (m.averageScore) c.querySelector('.poster-wrap').appendChild(h('div.badge', { text: m.averageScore + '%' }));
          grid.appendChild(c);
        });
        loadVisibleImages(el, 400);
      })
      .catch((e) => {
        if (my !== token) return;
        clear(grid);
        grid.appendChild(h('div.hint', { text: 'Não foi possível carregar o calendário: ' + e.message }));
      });
  }

  renderDays();
  load();

  return {
    el: el,
    onShow: () => loadVisibleImages(el, 400),
    destroy: () => bar.__destroy && bar.__destroy(),
  };
}
