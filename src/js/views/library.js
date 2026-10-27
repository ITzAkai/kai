// Biblioteca da conta Stremio, com filtro por tipo.
import { h, clear, loadVisibleImages } from '../lib/dom.js';
import * as nav from '../lib/nav.js';
import * as stremio from '../api/stremio.js';
import { topbar, card, spinnerLine } from '../ui.js';
import * as router from '../router.js';
import { openDetails } from './details.js';
import { t } from '../lib/i18n.js';

const FILTERS = [
  { id: 'all', label: 'Tudo' },
  { id: 'movie', label: 'Filmes' },
  { id: 'series', label: 'Séries' },
];

export function LibraryView() {
  const el = h('div.view');
  const scroller = h('div.scroll-y', { 'data-scroll-y': '' });
  const bar = topbar('library', router.goTab);
  const filters = h('div.filters', { 'data-group': '' });
  const grid = h('div.grid');
  scroller.appendChild(bar);
  scroller.appendChild(filters);
  scroller.appendChild(grid);
  el.appendChild(scroller);

  let filter = 'all';

  function renderFilters() {
    clear(filters);
    FILTERS.forEach((f) =>
      filters.appendChild(
        h('div.chip', {
          focusable: true,
          cls: f.id === filter ? 'active' : '',
          text: t(f.label),
          onSelect: () => {
            filter = f.id;
            renderFilters();
            renderGrid();
            nav.focus(filters.children[FILTERS.indexOf(f)]);
          },
        })
      )
    );
  }

  function renderGrid() {
    clear(grid);
    const items = stremio
      .cachedLibrary()
      .filter((it) => !it.removed && (filter === 'all' || it.type === filter))
      .sort((a, b) => String(b._mtime || '').localeCompare(String(a._mtime || '')));
    if (!items.length) {
      grid.appendChild(h('div.hint', { text: stremio.isLoggedIn() ? t('Sua biblioteca está vazia.') : t('Entre na sua conta em Ajustes para ver a biblioteca.') }));
      return;
    }
    items.forEach((it) => grid.appendChild(card({ name: it.name, poster: it.poster }, { onSelect: () => openDetails(it.type, it._id) })));
    loadVisibleImages(el, 400);
  }

  renderFilters();
  grid.appendChild(spinnerLine(t('Carregando biblioteca...')));

  return {
    el: el,
    onShow: () => {
      renderGrid();
      stremio
        .getLibrary()
        .then(() => renderGrid())
        .catch(() => {});
    },
    destroy: () => bar.__destroy && bar.__destroy(),
  };
}
