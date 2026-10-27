// Colour themes. The stylesheet is written in the purple theme; another theme fetches it once,
// swaps the purple shades for the theme's and adds the result after the original.
export const THEMES = [
  { id: 'purple', label: 'Roxo', main: '#7b5bf5', light: '#9d85ff', pale: '#c9bbff' },
  { id: 'gold', label: 'Dourado', main: '#c9961a', light: '#e0b54a', pale: '#f2dca0' },
  { id: 'teal', label: 'Verde-água', main: '#14958c', light: '#3fc9bf', pale: '#a8ebe6' },
  { id: 'red', label: 'Vermelho', main: '#d6334a', light: '#f0596c', pale: '#f7b8c1' },
  { id: 'blue', label: 'Azul', main: '#2f6fe0', light: '#5b93f5', pale: '#b9d0fb' },
  { id: 'green', label: 'Verde', main: '#2e9e57', light: '#4fc27a', pale: '#b6e8c8' },
];

const BASE = THEMES[0];

function rgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(',');
}

function recolor(css, th) {
  const swap = [
    [BASE.main, th.main],
    [BASE.light, th.light],
    [BASE.pale, th.pale],
    ['rgba(' + rgb(BASE.main) + ',', 'rgba(' + rgb(th.main) + ','],
    ['rgba(' + rgb(BASE.light) + ',', 'rgba(' + rgb(th.light) + ','],
    ['#b9a8ff', th.pale],
  ];
  swap.forEach((p) => {
    css = css.split(p[0]).join(p[1]).split(p[0].toUpperCase()).join(p[1]);
  });
  return css;
}

export function apply(id) {
  const old = document.getElementById('theme-css');
  if (old) old.parentNode.removeChild(old);
  const th = THEMES.find((x) => x.id === id);
  if (!th || th === BASE) return;
  const x = new XMLHttpRequest();
  x.open('GET', 'app.css');
  x.onload = () => {
    if (x.status !== 200) return;
    const style = document.createElement('style');
    style.id = 'theme-css';
    style.textContent = recolor(x.responseText, th);
    document.head.appendChild(style);
  };
  x.send();
}
