// Starts the newest build. TizenBrew serves this module from jsDelivr's copy of the repository,
// which can lag GitHub by up to a day (and clearing it is rate-limited). So this asks GitHub for
// the latest commit and loads app.js/app.css pinned to it: a pinned jsDelivr copy is never stale.
// Offline, slow or failing: the copy next to this file. Plain ES5: it runs before any polyfill.
(function () {
  var REPO = 'ITzAkai/stremio-kai-tizen';
  var started = false;

  function start(base) {
    if (started) return;
    started = true;
    window.__KAI_BASE__ = base;
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = base + 'app.css';
    document.head.appendChild(css);
    var js = document.createElement('script');
    js.src = base + 'app.js';
    if (base) {
      js.onerror = function () {
        document.head.removeChild(css);
        document.body.removeChild(js);
        started = false;
        start('');
      };
    }
    document.body.appendChild(js);
  }

  var x = new XMLHttpRequest();
  x.open('GET', 'https://api.github.com/repos/' + REPO + '/commits/main');
  x.setRequestHeader('Accept', 'application/vnd.github.sha');
  x.timeout = 4000;
  x.onload = function () {
    var sha = String(x.responseText || '').replace(/\s/g, '');
    start(x.status === 200 && /^[0-9a-f]{40}$/.test(sha) ? 'https://cdn.jsdelivr.net/gh/' + REPO + '@' + sha + '/dist/' : '');
  };
  x.onerror = x.ontimeout = function () {
    start('');
  };
  x.send();
})();
