// Actor profile (TMDB): photo, age, birthplace, biography and a grid of their films and series.
import { h, clear, loadVisibleImages } from '../lib/dom.js';
import * as extras from '../api/extras.js';
import { card, spinnerLine, toast } from '../ui.js';
import { openDetails } from './details.js';
import { t, current } from '../lib/i18n.js';

function age(birthday, deathday) {
  const b = new Date(birthday);
  if (isNaN(b.getTime())) return null;
  const end = deathday ? new Date(deathday) : new Date();
  let a = end.getFullYear() - b.getFullYear();
  if (end.getMonth() < b.getMonth() || (end.getMonth() === b.getMonth() && end.getDate() < b.getDate())) a--;
  return a;
}

function longDate(iso) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  try {
    return d.toLocaleDateString(current() === 'ar' ? 'ar' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch (e) {
    return iso;
  }
}

export function PersonView(personId, name) {
  const el = h('div.view');
  const scroller = h('div.scroll-y', { 'data-scroll-y': '' });
  const head = h('div.person-head');
  const grid = h('div.grid');
  scroller.appendChild(head);
  scroller.appendChild(grid);
  el.appendChild(scroller);
  head.appendChild(h('div.person-name', { text: name || '' }));
  head.appendChild(spinnerLine(t('Carregando...')));

  extras
    .person(personId)
    .then((p) => {
      clear(head);
      if (p.photo) head.appendChild(h('img.person-photo', { src: p.photo, alt: '' }));
      const facts = [];
      const years = age(p.birthday, p.deathday);
      if (p.birthday) facts.push(t('Nascimento: {date}', { date: longDate(p.birthday) }) + (years !== null && !p.deathday ? ' · ' + t('{n} anos', { n: years }) : ''));
      if (p.deathday) facts.push(t('Falecimento: {date}', { date: longDate(p.deathday) }) + (years !== null ? ' · ' + t('{n} anos', { n: years }) : ''));
      if (p.place) facts.push(t('Local de nascimento: {place}', { place: p.place }));
      // A focusable info block, so the remote can reach (and scroll past) the biography.
      head.appendChild(
        h('div.person-info', { focusable: true }, [
          h('div.person-name', { text: p.name }),
          p.department ? h('div.person-dept', { text: t(p.department === 'Directing' ? 'Direção' : 'Atuação') }) : null,
          h('div.person-facts', null, facts.map((f) => h('div', { text: f }))),
          p.biography ? h('div.person-bio', { text: p.biography }) : h('div.person-bio.empty', { text: t('Sem biografia disponível.') }),
        ])
      );
      if (!p.credits.length) return;
      scroller.insertBefore(h('div.row-title.person-credits', { text: t('Filmes e séries') }), grid);
      p.credits.forEach((c) => {
        grid.appendChild(
          card(
            { name: c.name, poster: c.poster },
            {
              title: c.name + (c.year ? ' (' + c.year + ')' : ''),
              onSelect: () => {
                toast(t('Abrindo {name}...', { name: c.name }), 2000);
                extras.tmdbImdb(c.type, c.tmdb).then((imdb) => {
                  if (!imdb) return toast(t('Esse título ainda não tem página no Stremio.'), 4000);
                  openDetails(c.type === 'tv' ? 'series' : 'movie', imdb);
                });
              },
            }
          )
        );
      });
      loadVisibleImages(el, 600);
    })
    .catch(() => {
      clear(head);
      head.appendChild(h('div.hint', { text: t('Não foi possível carregar este perfil.') }));
    });

  return { el: el, onShow: () => loadVisibleImages(el, 600) };
}
