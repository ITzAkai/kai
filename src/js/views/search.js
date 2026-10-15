// Busca em todos os catálogos de addons que aceitam "search".
import { h, clear, loadVisibleImages } from '../lib/dom.js';
import * as nav from '../lib/nav.js';
import * as addons from '../api/addons.js';
import { topbar, card, spinnerLine } from '../ui.js';
import * as router from '../router.js';
import { openDetails } from './details.js';

export function SearchView() {
  const el = h('div.view');
  const scroller = h('div.scroll-y', { 'data-scroll-y': '' });
  const bar = topbar('search', router.goTab);
  const input = h('input.input', { type: 'text', placeholder: 'Buscar filmes e séries...', focusable: true, 'data-autofocus': '' });
  const results = h('div.rows');
  scroller.appendChild(bar);
  scroller.appendChild(h('div.search-box', null, input));
  scroller.appendChild(results);
  el.appendChild(scroller);

  let token = 0;
  input.__submit = (q) => run(q);

  function run(q) {
    const query = (q || '').trim();
    clear(results);
    if (query.length < 2) {
      results.appendChild(h('div.hint', { text: 'Digite pelo menos 2 letras e confirme no teclado.' }));
      return;
    }
    const my = ++token;
    results.appendChild(spinnerLine('Buscando "' + query + '"...'));
    addons.load().then(() => {
      if (my !== token) return;
      clear(results);
      const cats = addons.searchCatalogs();
      if (!cats.length) results.appendChild(h('div.hint', { text: 'Nenhum addon com busca instalado.' }));
      let found = 0;
      let pending = cats.length;
      cats.forEach((entry) => {
        const row = h('div.row', { 'data-anchor': '30' });
        const track = h('div.row-track', { 'data-scroll-x': '', 'data-group': '' });
        row.appendChild(h('div.row-title', null, [entry.catalog.name || entry.catalog.id, h('small', { text: addons.catalogTitle(entry).split(' · ').pop() })]));
        row.appendChild(track);
        addons
          .fetchCatalog(entry, { search: query })
          .then((metas) => {
            if (my !== token || !metas.length) return;
            found++;
            metas.slice(0, 30).forEach((m) => track.appendChild(card(m, { onSelect: () => openDetails(m.type || entry.catalog.type, m.id) })));
            results.appendChild(row);
            loadVisibleImages(row);
          })
          .catch(() => {})
          .then(() => {
            pending--;
            if (my === token && pending === 0 && !found) results.appendChild(h('div.hint', { text: 'Nada encontrado para "' + query + '".' }));
          });
      });
    });
  }

  run('');

  return {
    el: el,
    onShow: () => loadVisibleImages(el),
    destroy: () => bar.__destroy && bar.__destroy(),
    focusInput: () => nav.focus(input),
  };
}
