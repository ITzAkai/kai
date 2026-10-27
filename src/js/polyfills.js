// Só o que falta no Chromium 38 e o app realmente usa.
import 'core-js/es/object/assign';
import 'core-js/es/object/entries';
import 'core-js/es/object/values';
import 'core-js/es/array/from';
import 'core-js/es/array/find';
import 'core-js/es/array/find-index';
import 'core-js/es/array/includes';
import 'core-js/es/array/fill';
import 'core-js/es/string/includes';
import 'core-js/es/string/starts-with';
import 'core-js/es/string/ends-with';
import 'core-js/es/string/pad-start';
import 'core-js/es/string/repeat';
import 'core-js/es/number/is-finite';
import 'core-js/es/number/is-nan';

if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.webkitMatchesSelector;
}
if (!Element.prototype.closest) {
  Element.prototype.closest = function (sel) {
    let el = this;
    while (el && el.nodeType === 1) {
      if (el.matches(sel)) return el;
      el = el.parentNode;
    }
    return null;
  };
}
