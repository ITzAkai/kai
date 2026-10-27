// Full catalog ("See all"): a poster grid that loads the next page by itself when the
// focus reaches the last rows, so a row never ends in a dead end.
import { h, clear, loadVisibleImages } from '../lib/dom.js';
import * as addons from '../api/addons.js';
import { card, spinnerLine } from '../ui.js';
import { openDetails } from './details.js';
import { t } from '../lib/i18n.js';

// Grid columns at 1920 px (210 px posters plus gaps); loading starts two rows before the end.
const PER_ROW = 7;

export function canPage(entry) {
  const c = entry.catalog;
  return (c.extra || []).some((e) => e && e.name === 'skip') || (c.extraSupported || []).indexOf('skip') >= 0;
}

export function CatalogView(entry) {
  const el = h('div.view');
  const scroller = h('div.scroll-y', { 'data-scroll-y': '' });
  const grid = h('div.grid');
  const status = h('div.grid-status');
  scroller.appendChild(h('div.row-title.catalog-title', { text: addons.catalogTitle(entry) }));
  scroller.appendChild(grid);
  scroller.appendChild(status);
  el.appendChild(scroller);

  const paging = canPage(entry);
  const seen = {};
  let count = 0;
  let loading = false;
  let done = false;

  function add(metas) {
    metas.forEach((m) => {
      if (!m || seen[m.id]) return;
      seen[m.id] = true;
      const index = count++;
      grid.appendChild(
        card(m, {
          onSelect: () => openDetails(m.type || entry.catalog.type, m.id),
          onFocus: () => {
            if (count - index <= PER_ROW * 2) more();
          },
        })
      );
    });
    loadVisibleImages(el, 600);
  }

  function more() {
    if (loading || done) return;
    loading = true;
    clear(status);
    status.appendChild(spinnerLine(t('Carregando...')));
    const before = count;
    addons
      .fetchCatalog(entry, count ? { skip: count } : null)
      .then((metas) => {
        add(metas);
        if (!paging || count === before) done = true;
      })
      .catch(() => {
        done = true;
      })
      .then(() => {
        loading = false;
        clear(status);
        if (!count) status.appendChild(h('div.hint', { text: t('Nada por aqui.') }));
      });
  }

  more();
  return { el: el };
}
