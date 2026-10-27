function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = function __commonJS(cb, mod) {
    return function __require() {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = {
        exports: {}
      }).exports, mod), mod.exports;
    };
  };
  var __copyProps = function __copyProps(to, from, except, desc) {
    if (from && _typeof(from) === "object" || typeof from === "function") {
      var _iterator = _createForOfIteratorHelper(__getOwnPropNames(from)),
        _step;
      try {
        var _loop = function _loop() {
          var key = _step.value;
          if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: function get() {
              return from[key];
            },
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
          });
        };
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    return to;
  };
  var __toESM = function __toESM(mod, isNodeMode, target) {
    return target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
      value: mod,
      enumerable: true
    }) : target, mod);
  };

  // node_modules/core-js/internals/global-this.js
  var require_global_this = __commonJS({
    "node_modules/core-js/internals/global-this.js": function node_modules_coreJs_internals_globalThisJs(exports, module) {
      "use strict";

      var check3 = function check3(it) {
        return it && it.Math === Math && it;
      };
      module.exports =
      // eslint-disable-next-line es/no-global-this -- safe
      check3((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) == "object" && globalThis) || check3((typeof window === "undefined" ? "undefined" : _typeof(window)) == "object" && window) ||
      // eslint-disable-next-line no-restricted-globals -- safe
      check3((typeof self === "undefined" ? "undefined" : _typeof(self)) == "object" && self) || check3((typeof global === "undefined" ? "undefined" : _typeof(global)) == "object" && global) || check3(_typeof(exports) == "object" && exports) ||
      // eslint-disable-next-line no-new-func -- fallback
      /* @__PURE__ */
      function () {
        return this;
      }() || Function("return this")();
    }
  });

  // node_modules/core-js/internals/fails.js
  var require_fails = __commonJS({
    "node_modules/core-js/internals/fails.js": function node_modules_coreJs_internals_failsJs(exports, module) {
      "use strict";

      module.exports = function (exec) {
        try {
          return !!exec();
        } catch (error) {
          return true;
        }
      };
    }
  });

  // node_modules/core-js/internals/descriptors.js
  var require_descriptors = __commonJS({
    "node_modules/core-js/internals/descriptors.js": function node_modules_coreJs_internals_descriptorsJs(exports, module) {
      "use strict";

      var fails = require_fails();
      module.exports = !fails(function () {
        return Object.defineProperty({}, 1, {
          get: function get() {
            return 7;
          }
        })[1] !== 7;
      });
    }
  });

  // node_modules/core-js/internals/function-bind-native.js
  var require_function_bind_native = __commonJS({
    "node_modules/core-js/internals/function-bind-native.js": function node_modules_coreJs_internals_functionBindNativeJs(exports, module) {
      "use strict";

      var fails = require_fails();
      module.exports = !fails(function () {
        var test = function () {}.bind();
        return typeof test != "function" || test.hasOwnProperty("prototype");
      });
    }
  });

  // node_modules/core-js/internals/function-call.js
  var require_function_call = __commonJS({
    "node_modules/core-js/internals/function-call.js": function node_modules_coreJs_internals_functionCallJs(exports, module) {
      "use strict";

      var NATIVE_BIND = require_function_bind_native();
      var call2 = Function.prototype.call;
      module.exports = NATIVE_BIND ? call2.bind(call2) : function () {
        return call2.apply(call2, arguments);
      };
    }
  });

  // node_modules/core-js/internals/object-property-is-enumerable.js
  var require_object_property_is_enumerable = __commonJS({
    "node_modules/core-js/internals/object-property-is-enumerable.js": function node_modules_coreJs_internals_objectPropertyIsEnumerableJs(exports) {
      "use strict";

      var $propertyIsEnumerable = {}.propertyIsEnumerable;
      var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
      var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({
        1: 2
      }, 1);
      exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
        var descriptor = getOwnPropertyDescriptor(this, V);
        return !!descriptor && descriptor.enumerable;
      } : $propertyIsEnumerable;
    }
  });

  // node_modules/core-js/internals/create-property-descriptor.js
  var require_create_property_descriptor = __commonJS({
    "node_modules/core-js/internals/create-property-descriptor.js": function node_modules_coreJs_internals_createPropertyDescriptorJs(exports, module) {
      "use strict";

      module.exports = function (bitmap, value) {
        return {
          enumerable: !(bitmap & 1),
          configurable: !(bitmap & 2),
          writable: !(bitmap & 4),
          value: value
        };
      };
    }
  });

  // node_modules/core-js/internals/function-uncurry-this.js
  var require_function_uncurry_this = __commonJS({
    "node_modules/core-js/internals/function-uncurry-this.js": function node_modules_coreJs_internals_functionUncurryThisJs(exports, module) {
      "use strict";

      var NATIVE_BIND = require_function_bind_native();
      var FunctionPrototype = Function.prototype;
      var call2 = FunctionPrototype.call;
      var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call2, call2);
      module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
        return function () {
          return call2.apply(fn, arguments);
        };
      };
    }
  });

  // node_modules/core-js/internals/classof-raw.js
  var require_classof_raw = __commonJS({
    "node_modules/core-js/internals/classof-raw.js": function node_modules_coreJs_internals_classofRawJs(exports, module) {
      "use strict";

      var uncurryThis = require_function_uncurry_this();
      var toString = uncurryThis({}.toString);
      var stringSlice = uncurryThis("".slice);
      module.exports = function (it) {
        return stringSlice(toString(it), 8, -1);
      };
    }
  });

  // node_modules/core-js/internals/indexed-object.js
  var require_indexed_object = __commonJS({
    "node_modules/core-js/internals/indexed-object.js": function node_modules_coreJs_internals_indexedObjectJs(exports, module) {
      "use strict";

      var uncurryThis = require_function_uncurry_this();
      var fails = require_fails();
      var classof = require_classof_raw();
      var $Object = Object;
      var split = uncurryThis("".split);
      module.exports = fails(function () {
        return !$Object("z").propertyIsEnumerable(0);
      }) ? function (it) {
        return classof(it) === "String" ? split(it, "") : $Object(it);
      } : $Object;
    }
  });

  // node_modules/core-js/internals/is-null-or-undefined.js
  var require_is_null_or_undefined = __commonJS({
    "node_modules/core-js/internals/is-null-or-undefined.js": function node_modules_coreJs_internals_isNullOrUndefinedJs(exports, module) {
      "use strict";

      module.exports = function (it) {
        return it === null || it === void 0;
      };
    }
  });

  // node_modules/core-js/internals/require-object-coercible.js
  var require_require_object_coercible = __commonJS({
    "node_modules/core-js/internals/require-object-coercible.js": function node_modules_coreJs_internals_requireObjectCoercibleJs(exports, module) {
      "use strict";

      var isNullOrUndefined = require_is_null_or_undefined();
      var $TypeError = TypeError;
      module.exports = function (it) {
        if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
        return it;
      };
    }
  });

  // node_modules/core-js/internals/to-indexed-object.js
  var require_to_indexed_object = __commonJS({
    "node_modules/core-js/internals/to-indexed-object.js": function node_modules_coreJs_internals_toIndexedObjectJs(exports, module) {
      "use strict";

      var IndexedObject = require_indexed_object();
      var requireObjectCoercible = require_require_object_coercible();
      module.exports = function (it) {
        return IndexedObject(requireObjectCoercible(it));
      };
    }
  });

  // node_modules/core-js/internals/is-callable.js
  var require_is_callable = __commonJS({
    "node_modules/core-js/internals/is-callable.js": function node_modules_coreJs_internals_isCallableJs(exports, module) {
      "use strict";

      var documentAll = (typeof document === "undefined" ? "undefined" : _typeof(document)) == "object" && document.all;
      module.exports = typeof documentAll == "undefined" && documentAll !== void 0 ? function (argument) {
        return typeof argument == "function" || argument === documentAll;
      } : function (argument) {
        return typeof argument == "function";
      };
    }
  });

  // node_modules/core-js/internals/is-object.js
  var require_is_object = __commonJS({
    "node_modules/core-js/internals/is-object.js": function node_modules_coreJs_internals_isObjectJs(exports, module) {
      "use strict";

      var isCallable = require_is_callable();
      module.exports = function (it) {
        return _typeof(it) == "object" ? it !== null : isCallable(it);
      };
    }
  });

  // node_modules/core-js/internals/get-built-in.js
  var require_get_built_in = __commonJS({
    "node_modules/core-js/internals/get-built-in.js": function node_modules_coreJs_internals_getBuiltInJs(exports, module) {
      "use strict";

      var globalThis2 = require_global_this();
      var isCallable = require_is_callable();
      var aFunction = function aFunction(argument) {
        return isCallable(argument) ? argument : void 0;
      };
      module.exports = function (namespace, method) {
        return arguments.length < 2 ? aFunction(globalThis2[namespace]) : globalThis2[namespace] && globalThis2[namespace][method];
      };
    }
  });

  // node_modules/core-js/internals/object-is-prototype-of.js
  var require_object_is_prototype_of = __commonJS({
    "node_modules/core-js/internals/object-is-prototype-of.js": function node_modules_coreJs_internals_objectIsPrototypeOfJs(exports, module) {
      "use strict";

      var uncurryThis = require_function_uncurry_this();
      module.exports = uncurryThis({}.isPrototypeOf);
    }
  });

  // node_modules/core-js/internals/environment-user-agent.js
  var require_environment_user_agent = __commonJS({
    "node_modules/core-js/internals/environment-user-agent.js": function node_modules_coreJs_internals_environmentUserAgentJs(exports, module) {
      "use strict";

      var globalThis2 = require_global_this();
      var navigator2 = globalThis2.navigator;
      var userAgent = navigator2 && navigator2.userAgent;
      module.exports = userAgent ? String(userAgent) : "";
    }
  });

  // node_modules/core-js/internals/environment-v8-version.js
  var require_environment_v8_version = __commonJS({
    "node_modules/core-js/internals/environment-v8-version.js": function node_modules_coreJs_internals_environmentV8VersionJs(exports, module) {
      "use strict";

      var globalThis2 = require_global_this();
      var userAgent = require_environment_user_agent();
      var process = globalThis2.process;
      var Deno = globalThis2.Deno;
      var versions = process && process.versions || Deno && Deno.version;
      var v8 = versions && versions.v8;
      var match;
      var version;
      if (v8) {
        match = v8.split(".");
        version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
      }
      if (!version && userAgent) {
        match = userAgent.match(/Edge\/(\d+)/);
        if (!match || match[1] >= 74) {
          match = userAgent.match(/Chrome\/(\d+)/);
          if (match) version = +match[1];
        }
      }
      module.exports = version;
    }
  });

  // node_modules/core-js/internals/symbol-constructor-detection.js
  var require_symbol_constructor_detection = __commonJS({
    "node_modules/core-js/internals/symbol-constructor-detection.js": function node_modules_coreJs_internals_symbolConstructorDetectionJs(exports, module) {
      "use strict";

      var V8_VERSION = require_environment_v8_version();
      var fails = require_fails();
      var globalThis2 = require_global_this();
      var $String = globalThis2.String;
      module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
        var symbol = Symbol("symbol detection");
        return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
        // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
        !Symbol.sham && V8_VERSION && V8_VERSION < 41;
      });
    }
  });

  // node_modules/core-js/internals/use-symbol-as-uid.js
  var require_use_symbol_as_uid = __commonJS({
    "node_modules/core-js/internals/use-symbol-as-uid.js": function node_modules_coreJs_internals_useSymbolAsUidJs(exports, module) {
      "use strict";

      var NATIVE_SYMBOL = require_symbol_constructor_detection();
      module.exports = NATIVE_SYMBOL && !Symbol.sham && _typeof(Symbol.iterator) == "symbol";
    }
  });

  // node_modules/core-js/internals/is-symbol.js
  var require_is_symbol = __commonJS({
    "node_modules/core-js/internals/is-symbol.js": function node_modules_coreJs_internals_isSymbolJs(exports, module) {
      "use strict";

      var getBuiltIn = require_get_built_in();
      var isCallable = require_is_callable();
      var isPrototypeOf = require_object_is_prototype_of();
      var USE_SYMBOL_AS_UID = require_use_symbol_as_uid();
      var $Object = Object;
      module.exports = USE_SYMBOL_AS_UID ? function (it) {
        return _typeof(it) == "symbol";
      } : function (it) {
        var $Symbol = getBuiltIn("Symbol");
        return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
      };
    }
  });

  // node_modules/core-js/internals/try-to-string.js
  var require_try_to_string = __commonJS({
    "node_modules/core-js/internals/try-to-string.js": function node_modules_coreJs_internals_tryToStringJs(exports, module) {
      "use strict";

      var $String = String;
      module.exports = function (argument) {
        try {
          return $String(argument);
        } catch (error) {
          return "Object";
        }
      };
    }
  });

  // node_modules/core-js/internals/a-callable.js
  var require_a_callable = __commonJS({
    "node_modules/core-js/internals/a-callable.js": function node_modules_coreJs_internals_aCallableJs(exports, module) {
      "use strict";

      var isCallable = require_is_callable();
      var tryToString = require_try_to_string();
      var $TypeError = TypeError;
      module.exports = function (argument) {
        if (isCallable(argument)) return argument;
        throw new $TypeError(tryToString(argument) + " is not a function");
      };
    }
  });

  // node_modules/core-js/internals/get-method.js
  var require_get_method = __commonJS({
    "node_modules/core-js/internals/get-method.js": function node_modules_coreJs_internals_getMethodJs(exports, module) {
      "use strict";

      var aCallable = require_a_callable();
      var isNullOrUndefined = require_is_null_or_undefined();
      module.exports = function (V, P) {
        var func = V[P];
        return isNullOrUndefined(func) ? void 0 : aCallable(func);
      };
    }
  });

  // node_modules/core-js/internals/ordinary-to-primitive.js
  var require_ordinary_to_primitive = __commonJS({
    "node_modules/core-js/internals/ordinary-to-primitive.js": function node_modules_coreJs_internals_ordinaryToPrimitiveJs(exports, module) {
      "use strict";

      var call2 = require_function_call();
      var isCallable = require_is_callable();
      var isObject = require_is_object();
      var $TypeError = TypeError;
      module.exports = function (input, pref) {
        var fn, val;
        if (pref === "string" && isCallable(fn = input.toString) && !isObject(val = call2(fn, input))) return val;
        if (isCallable(fn = input.valueOf) && !isObject(val = call2(fn, input))) return val;
        if (pref !== "string" && isCallable(fn = input.toString) && !isObject(val = call2(fn, input))) return val;
        throw new $TypeError("Can't convert object to primitive value");
      };
    }
  });

  // node_modules/core-js/internals/is-pure.js
  var require_is_pure = __commonJS({
    "node_modules/core-js/internals/is-pure.js": function node_modules_coreJs_internals_isPureJs(exports, module) {
      "use strict";

      module.exports = false;
    }
  });

  // node_modules/core-js/internals/define-global-property.js
  var require_define_global_property = __commonJS({
    "node_modules/core-js/internals/define-global-property.js": function node_modules_coreJs_internals_defineGlobalPropertyJs(exports, module) {
      "use strict";

      var globalThis2 = require_global_this();
      var defineProperty = Object.defineProperty;
      module.exports = function (key, value) {
        try {
          defineProperty(globalThis2, key, {
            value: value,
            configurable: true,
            writable: true
          });
        } catch (error) {
          globalThis2[key] = value;
        }
        return value;
      };
    }
  });

  // node_modules/core-js/internals/shared-store.js
  var require_shared_store = __commonJS({
    "node_modules/core-js/internals/shared-store.js": function node_modules_coreJs_internals_sharedStoreJs(exports, module) {
      "use strict";

      var IS_PURE = require_is_pure();
      var globalThis2 = require_global_this();
      var defineGlobalProperty = require_define_global_property();
      var SHARED = "__core-js_shared__";
      var store = module.exports = globalThis2[SHARED] || defineGlobalProperty(SHARED, {});
      (store.versions || (store.versions = [])).push({
        version: "3.50.0",
        mode: IS_PURE ? "pure" : "global",
        copyright: "© 2013–2025 Denis Pushkarev (zloirock.ru), 2025–2026 CoreJS Company (core-js.io). All rights reserved.",
        license: "https://github.com/zloirock/core-js/blob/v3.50.0/LICENSE",
        source: "https://github.com/zloirock/core-js"
      });
    }
  });

  // node_modules/core-js/internals/shared.js
  var require_shared = __commonJS({
    "node_modules/core-js/internals/shared.js": function node_modules_coreJs_internals_sharedJs(exports, module) {
      "use strict";

      var store = require_shared_store();
      var create = Object.create || Object;
      module.exports = function (key, value) {
        return store[key] || (store[key] = value || create(null));
      };
    }
  });

  // node_modules/core-js/internals/to-object.js
  var require_to_object = __commonJS({
    "node_modules/core-js/internals/to-object.js": function node_modules_coreJs_internals_toObjectJs(exports, module) {
      "use strict";

      var requireObjectCoercible = require_require_object_coercible();
      var $Object = Object;
      module.exports = function (argument) {
        return $Object(requireObjectCoercible(argument));
      };
    }
  });

  // node_modules/core-js/internals/has-own-property.js
  var require_has_own_property = __commonJS({
    "node_modules/core-js/internals/has-own-property.js": function node_modules_coreJs_internals_hasOwnPropertyJs(exports, module) {
      "use strict";

      var uncurryThis = require_function_uncurry_this();
      var toObject = require_to_object();
      var hasOwnProperty = uncurryThis({}.hasOwnProperty);
      module.exports = Object.hasOwn || function hasOwn(it, key) {
        return hasOwnProperty(toObject(it), key);
      };
    }
  });

  // node_modules/core-js/internals/uid.js
  var require_uid = __commonJS({
    "node_modules/core-js/internals/uid.js": function node_modules_coreJs_internals_uidJs(exports, module) {
      "use strict";

      var uncurryThis = require_function_uncurry_this();
      var id = 0;
      var postfix = Math.random();
      var toString = uncurryThis(1.1.toString);
      module.exports = function (key) {
        return "Symbol(" + (key === void 0 ? "" : key) + ")_" + toString(++id + postfix, 36);
      };
    }
  });

  // node_modules/core-js/internals/well-known-symbol.js
  var require_well_known_symbol = __commonJS({
    "node_modules/core-js/internals/well-known-symbol.js": function node_modules_coreJs_internals_wellKnownSymbolJs(exports, module) {
      "use strict";

      var globalThis2 = require_global_this();
      var shared = require_shared();
      var hasOwn = require_has_own_property();
      var uid = require_uid();
      var NATIVE_SYMBOL = require_symbol_constructor_detection();
      var USE_SYMBOL_AS_UID = require_use_symbol_as_uid();
      var Symbol2 = globalThis2.Symbol;
      var WellKnownSymbolsStore = shared("wks");
      var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol2["for"] || Symbol2 : Symbol2 && Symbol2.withoutSetter || uid;
      module.exports = function (name) {
        if (!hasOwn(WellKnownSymbolsStore, name)) {
          WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol2, name) ? Symbol2[name] : createWellKnownSymbol("Symbol." + name);
        }
        return WellKnownSymbolsStore[name];
      };
    }
  });

  // node_modules/core-js/internals/to-primitive.js
  var require_to_primitive = __commonJS({
    "node_modules/core-js/internals/to-primitive.js": function node_modules_coreJs_internals_toPrimitiveJs(exports, module) {
      "use strict";

      var call2 = require_function_call();
      var isObject = require_is_object();
      var isSymbol = require_is_symbol();
      var getMethod = require_get_method();
      var ordinaryToPrimitive = require_ordinary_to_primitive();
      var wellKnownSymbol = require_well_known_symbol();
      var $TypeError = TypeError;
      var TO_PRIMITIVE = wellKnownSymbol("toPrimitive");
      module.exports = function (input, pref) {
        if (!isObject(input) || isSymbol(input)) return input;
        var exoticToPrim = getMethod(input, TO_PRIMITIVE);
        var result;
        if (exoticToPrim) {
          if (pref === void 0) pref = "default";
          result = call2(exoticToPrim, input, pref);
          if (!isObject(result) || isSymbol(result)) return result;
          throw new $TypeError("Can't convert object to primitive value");
        }
        if (pref === void 0) pref = "number";
        return ordinaryToPrimitive(input, pref);
      };
    }
  });

  // node_modules/core-js/internals/to-property-key.js
  var require_to_property_key = __commonJS({
    "node_modules/core-js/internals/to-property-key.js": function node_modules_coreJs_internals_toPropertyKeyJs(exports, module) {
      "use strict";

      var toPrimitive = require_to_primitive();
      var isSymbol = require_is_symbol();
      module.exports = function (argument) {
        var key = toPrimitive(argument, "string");
        return isSymbol(key) ? key : key + "";
      };
    }
  });

  // node_modules/core-js/internals/document-create-element.js
  var require_document_create_element = __commonJS({
    "node_modules/core-js/internals/document-create-element.js": function node_modules_coreJs_internals_documentCreateElementJs(exports, module) {
      "use strict";

      var globalThis2 = require_global_this();
      var isObject = require_is_object();
      var document2 = globalThis2.document;
      var EXISTS = isObject(document2) && isObject(document2.createElement);
      module.exports = function (it) {
        return EXISTS ? document2.createElement(it) : {};
      };
    }
  });

  // node_modules/core-js/internals/ie8-dom-define.js
  var require_ie8_dom_define = __commonJS({
    "node_modules/core-js/internals/ie8-dom-define.js": function node_modules_coreJs_internals_ie8DomDefineJs(exports, module) {
      "use strict";

      var DESCRIPTORS = require_descriptors();
      var fails = require_fails();
      var createElement = require_document_create_element();
      module.exports = !DESCRIPTORS && !fails(function () {
        return Object.defineProperty(createElement("div"), "a", {
          get: function get() {
            return 7;
          }
        }).a !== 7;
      });
    }
  });

  // node_modules/core-js/internals/object-get-own-property-descriptor.js
  var require_object_get_own_property_descriptor = __commonJS({
    "node_modules/core-js/internals/object-get-own-property-descriptor.js": function node_modules_coreJs_internals_objectGetOwnPropertyDescriptorJs(exports) {
      "use strict";

      var DESCRIPTORS = require_descriptors();
      var call2 = require_function_call();
      var propertyIsEnumerableModule = require_object_property_is_enumerable();
      var createPropertyDescriptor = require_create_property_descriptor();
      var toIndexedObject = require_to_indexed_object();
      var toPropertyKey = require_to_property_key();
      var hasOwn = require_has_own_property();
      var IE8_DOM_DEFINE = require_ie8_dom_define();
      var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
      exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
        O = toIndexedObject(O);
        P = toPropertyKey(P);
        if (IE8_DOM_DEFINE) try {
          return $getOwnPropertyDescriptor(O, P);
        } catch (error) {}
        if (hasOwn(O, P)) return createPropertyDescriptor(!call2(propertyIsEnumerableModule.f, O, P), O[P]);
      };
    }
  });

  // node_modules/core-js/internals/v8-prototype-define-bug.js
  var require_v8_prototype_define_bug = __commonJS({
    "node_modules/core-js/internals/v8-prototype-define-bug.js": function node_modules_coreJs_internals_v8PrototypeDefineBugJs(exports, module) {
      "use strict";

      var DESCRIPTORS = require_descriptors();
      var fails = require_fails();
      module.exports = DESCRIPTORS && fails(function () {
        return Object.defineProperty(function () {}, "prototype", {
          value: 42,
          writable: false
        }).prototype !== 42;
      });
    }
  });

  // node_modules/core-js/internals/an-object.js
  var require_an_object = __commonJS({
    "node_modules/core-js/internals/an-object.js": function node_modules_coreJs_internals_anObjectJs(exports, module) {
      "use strict";

      var isObject = require_is_object();
      var $String = String;
      var $TypeError = TypeError;
      module.exports = function (argument) {
        if (isObject(argument)) return argument;
        throw new $TypeError($String(argument) + " is not an object");
      };
    }
  });

  // node_modules/core-js/internals/object-define-property.js
  var require_object_define_property = __commonJS({
    "node_modules/core-js/internals/object-define-property.js": function node_modules_coreJs_internals_objectDefinePropertyJs(exports) {
      "use strict";

      var DESCRIPTORS = require_descriptors();
      var IE8_DOM_DEFINE = require_ie8_dom_define();
      var V8_PROTOTYPE_DEFINE_BUG = require_v8_prototype_define_bug();
      var anObject = require_an_object();
      var toPropertyKey = require_to_property_key();
      var $TypeError = TypeError;
      var $defineProperty = Object.defineProperty;
      var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
      var ENUMERABLE = "enumerable";
      var CONFIGURABLE = "configurable";
      var WRITABLE = "writable";
      exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
        anObject(O);
        P = toPropertyKey(P);
        anObject(Attributes);
        if (typeof O === "function" && P === "prototype" && "value" in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
          var current3 = $getOwnPropertyDescriptor(O, P);
          if (current3 && current3[WRITABLE]) {
            O[P] = Attributes.value;
            Attributes = {
              configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current3[CONFIGURABLE],
              enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current3[ENUMERABLE],
              writable: false
            };
          }
        }
        return $defineProperty(O, P, Attributes);
      } : $defineProperty : function defineProperty(O, P, Attributes) {
        anObject(O);
        P = toPropertyKey(P);
        anObject(Attributes);
        if (IE8_DOM_DEFINE) try {
          return $defineProperty(O, P, Attributes);
        } catch (error) {}
        if ("get" in Attributes || "set" in Attributes) throw new $TypeError("Accessors not supported");
        if ("value" in Attributes) O[P] = Attributes.value;
        return O;
      };
    }
  });

  // node_modules/core-js/internals/create-non-enumerable-property.js
  var require_create_non_enumerable_property = __commonJS({
    "node_modules/core-js/internals/create-non-enumerable-property.js": function node_modules_coreJs_internals_createNonEnumerablePropertyJs(exports, module) {
      "use strict";

      var DESCRIPTORS = require_descriptors();
      var definePropertyModule = require_object_define_property();
      var createPropertyDescriptor = require_create_property_descriptor();
      module.exports = DESCRIPTORS ? function (object, key, value) {
        return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
      } : function (object, key, value) {
        object[key] = value;
        return object;
      };
    }
  });

  // node_modules/core-js/internals/function-name.js
  var require_function_name = __commonJS({
    "node_modules/core-js/internals/function-name.js": function node_modules_coreJs_internals_functionNameJs(exports, module) {
      "use strict";

      var DESCRIPTORS = require_descriptors();
      var hasOwn = require_has_own_property();
      var FunctionPrototype = Function.prototype;
      var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;
      var EXISTS = hasOwn(FunctionPrototype, "name");
      var PROPER = EXISTS && function something() {}.name === "something";
      var CONFIGURABLE = EXISTS && (!DESCRIPTORS || DESCRIPTORS && getDescriptor(FunctionPrototype, "name").configurable);
      module.exports = {
        EXISTS: EXISTS,
        PROPER: PROPER,
        CONFIGURABLE: CONFIGURABLE
      };
    }
  });

  // node_modules/core-js/internals/inspect-source.js
  var require_inspect_source = __commonJS({
    "node_modules/core-js/internals/inspect-source.js": function node_modules_coreJs_internals_inspectSourceJs(exports, module) {
      "use strict";

      var uncurryThis = require_function_uncurry_this();
      var isCallable = require_is_callable();
      var store = require_shared_store();
      var functionToString = uncurryThis(Function.toString);
      if (!isCallable(store.inspectSource)) {
        store.inspectSource = function (it) {
          return functionToString(it);
        };
      }
      module.exports = store.inspectSource;
    }
  });

  // node_modules/core-js/internals/weak-map-basic-detection.js
  var require_weak_map_basic_detection = __commonJS({
    "node_modules/core-js/internals/weak-map-basic-detection.js": function node_modules_coreJs_internals_weakMapBasicDetectionJs(exports, module) {
      "use strict";

      var globalThis2 = require_global_this();
      var isCallable = require_is_callable();
      var WeakMap = globalThis2.WeakMap;
      module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));
    }
  });

  // node_modules/core-js/internals/shared-key.js
  var require_shared_key = __commonJS({
    "node_modules/core-js/internals/shared-key.js": function node_modules_coreJs_internals_sharedKeyJs(exports, module) {
      "use strict";

      var shared = require_shared();
      var uid = require_uid();
      var keys = shared("keys");
      module.exports = function (key) {
        return keys[key] || (keys[key] = uid(key));
      };
    }
  });

  // node_modules/core-js/internals/hidden-keys.js
  var require_hidden_keys = __commonJS({
    "node_modules/core-js/internals/hidden-keys.js": function node_modules_coreJs_internals_hiddenKeysJs(exports, module) {
      "use strict";

      module.exports = {};
    }
  });

  // node_modules/core-js/internals/internal-state.js
  var require_internal_state = __commonJS({
    "node_modules/core-js/internals/internal-state.js": function node_modules_coreJs_internals_internalStateJs(exports, module) {
      "use strict";

      var NATIVE_WEAK_MAP = require_weak_map_basic_detection();
      var globalThis2 = require_global_this();
      var isObject = require_is_object();
      var createNonEnumerableProperty = require_create_non_enumerable_property();
      var hasOwn = require_has_own_property();
      var shared = require_shared_store();
      var sharedKey = require_shared_key();
      var hiddenKeys = require_hidden_keys();
      var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
      var TypeError2 = globalThis2.TypeError;
      var WeakMap = globalThis2.WeakMap;
      var set2;
      var get2;
      var has;
      var enforce = function enforce(it) {
        return has(it) ? get2(it) : set2(it, {});
      };
      var getterFor = function getterFor(TYPE) {
        return function (it) {
          var state;
          if (!isObject(it) || (state = get2(it)).type !== TYPE) {
            throw new TypeError2("Incompatible receiver, " + TYPE + " required");
          }
          return state;
        };
      };
      if (NATIVE_WEAK_MAP || shared.state) {
        store = shared.state || (shared.state = new WeakMap());
        store.get = store.get;
        store.has = store.has;
        store.set = store.set;
        set2 = function set2(it, metadata) {
          if (store.has(it)) throw new TypeError2(OBJECT_ALREADY_INITIALIZED);
          metadata.facade = it;
          store.set(it, metadata);
          return metadata;
        };
        get2 = function get2(it) {
          return store.get(it) || {};
        };
        has = function has(it) {
          return store.has(it);
        };
      } else {
        STATE = sharedKey("state");
        hiddenKeys[STATE] = true;
        set2 = function set2(it, metadata) {
          if (hasOwn(it, STATE)) throw new TypeError2(OBJECT_ALREADY_INITIALIZED);
          metadata.facade = it;
          createNonEnumerableProperty(it, STATE, metadata);
          return metadata;
        };
        get2 = function get2(it) {
          return hasOwn(it, STATE) ? it[STATE] : {};
        };
        has = function has(it) {
          return hasOwn(it, STATE);
        };
      }
      var store;
      var STATE;
      module.exports = {
        set: set2,
        get: get2,
        has: has,
        enforce: enforce,
        getterFor: getterFor
      };
    }
  });

  // node_modules/core-js/internals/make-built-in.js
  var require_make_built_in = __commonJS({
    "node_modules/core-js/internals/make-built-in.js": function node_modules_coreJs_internals_makeBuiltInJs(exports, module) {
      "use strict";

      var uncurryThis = require_function_uncurry_this();
      var fails = require_fails();
      var isCallable = require_is_callable();
      var hasOwn = require_has_own_property();
      var DESCRIPTORS = require_descriptors();
      var CONFIGURABLE_FUNCTION_NAME = require_function_name().CONFIGURABLE;
      var inspectSource = require_inspect_source();
      var InternalStateModule = require_internal_state();
      var enforceInternalState = InternalStateModule.enforce;
      var getInternalState = InternalStateModule.get;
      var $String = String;
      var defineProperty = Object.defineProperty;
      var stringSlice = uncurryThis("".slice);
      var replace = uncurryThis("".replace);
      var join = uncurryThis([].join);
      var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
        return defineProperty(function () {}, "length", {
          value: 8
        }).length !== 8;
      });
      var TEMPLATE = String(String).split("String");
      var makeBuiltIn = module.exports = function (value, name, options) {
        if (stringSlice($String(name), 0, 7) === "Symbol(") {
          name = "[" + replace($String(name), /^Symbol\(([^)]*)\).*$/, "$1") + "]";
        }
        if (options && options.getter) name = "get " + name;
        if (options && options.setter) name = "set " + name;
        if (!hasOwn(value, "name") || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
          if (DESCRIPTORS) defineProperty(value, "name", {
            value: name,
            configurable: true
          });else value.name = name;
        }
        if (CONFIGURABLE_LENGTH && options && hasOwn(options, "arity") && value.length !== options.arity) {
          defineProperty(value, "length", {
            value: options.arity
          });
        }
        try {
          if (options && hasOwn(options, "constructor") && options.constructor) {
            if (DESCRIPTORS) defineProperty(value, "prototype", {
              writable: false
            });
          } else if (value.prototype) value.prototype = void 0;
        } catch (error) {}
        var state = enforceInternalState(value);
        if (!hasOwn(state, "source")) {
          state.source = join(TEMPLATE, typeof name == "string" ? name : "");
        }
        return value;
      };
      Function.prototype.toString = makeBuiltIn(function toString() {
        return isCallable(this) && getInternalState(this).source || inspectSource(this);
      }, "toString");
    }
  });

  // node_modules/core-js/internals/define-built-in.js
  var require_define_built_in = __commonJS({
    "node_modules/core-js/internals/define-built-in.js": function node_modules_coreJs_internals_defineBuiltInJs(exports, module) {
      "use strict";

      var isCallable = require_is_callable();
      var definePropertyModule = require_object_define_property();
      var makeBuiltIn = require_make_built_in();
      var defineGlobalProperty = require_define_global_property();
      module.exports = function (O, key, value, options) {
        if (!options) options = {};
        var simple = options.enumerable;
        var name = options.name !== void 0 ? options.name : key;
        if (isCallable(value)) makeBuiltIn(value, name, options);
        if (options.global) {
          if (simple) O[key] = value;else defineGlobalProperty(key, value);
        } else {
          try {
            if (!options.unsafe) delete O[key];else if (O[key]) simple = true;
          } catch (error) {}
          if (simple) O[key] = value;else definePropertyModule.f(O, key, {
            value: value,
            enumerable: false,
            configurable: !options.nonConfigurable,
            writable: !options.nonWritable
          });
        }
        return O;
      };
    }
  });

  // node_modules/core-js/internals/math-trunc.js
  var require_math_trunc = __commonJS({
    "node_modules/core-js/internals/math-trunc.js": function node_modules_coreJs_internals_mathTruncJs(exports, module) {
      "use strict";

      var ceil = Math.ceil;
      var floor = Math.floor;
      module.exports = Math.trunc || function trunc(x) {
        var n = +x;
        return (n > 0 ? floor : ceil)(n);
      };
    }
  });

  // node_modules/core-js/internals/to-integer-or-infinity.js
  var require_to_integer_or_infinity = __commonJS({
    "node_modules/core-js/internals/to-integer-or-infinity.js": function node_modules_coreJs_internals_toIntegerOrInfinityJs(exports, module) {
      "use strict";

      var trunc = require_math_trunc();
      module.exports = function (argument) {
        var number = +argument;
        return number !== number || number === 0 ? 0 : trunc(number);
      };
    }
  });

  // node_modules/core-js/internals/to-absolute-index.js
  var require_to_absolute_index = __commonJS({
    "node_modules/core-js/internals/to-absolute-index.js": function node_modules_coreJs_internals_toAbsoluteIndexJs(exports, module) {
      "use strict";

      var toIntegerOrInfinity = require_to_integer_or_infinity();
      var max = Math.max;
      var min = Math.min;
      module.exports = function (index, length) {
        var integer = toIntegerOrInfinity(index);
        return integer < 0 ? max(integer + length, 0) : min(integer, length);
      };
    }
  });

  // node_modules/core-js/internals/to-length.js
  var require_to_length = __commonJS({
    "node_modules/core-js/internals/to-length.js": function node_modules_coreJs_internals_toLengthJs(exports, module) {
      "use strict";

      var toIntegerOrInfinity = require_to_integer_or_infinity();
      var min = Math.min;
      module.exports = function (argument) {
        var len = toIntegerOrInfinity(argument);
        return len > 0 ? min(len, 9007199254740991) : 0;
      };
    }
  });

  // node_modules/core-js/internals/length-of-array-like.js
  var require_length_of_array_like = __commonJS({
    "node_modules/core-js/internals/length-of-array-like.js": function node_modules_coreJs_internals_lengthOfArrayLikeJs(exports, module) {
      "use strict";

      var toLength = require_to_length();
      module.exports = function (obj) {
        return toLength(obj.length);
      };
    }
  });

  // node_modules/core-js/internals/array-includes.js
  var require_array_includes = __commonJS({
    "node_modules/core-js/internals/array-includes.js": function node_modules_coreJs_internals_arrayIncludesJs(exports, module) {
      "use strict";

      var toIndexedObject = require_to_indexed_object();
      var toAbsoluteIndex = require_to_absolute_index();
      var lengthOfArrayLike = require_length_of_array_like();
      var createMethod = function createMethod(IS_INCLUDES) {
        return function ($this, el, fromIndex) {
          var O = toIndexedObject($this);
          var length = lengthOfArrayLike(O);
          if (length === 0) return !IS_INCLUDES && -1;
          var index = toAbsoluteIndex(fromIndex, length);
          var value;
          if (IS_INCLUDES && el !== el) while (length > index) {
            value = O[index++];
            if (value !== value) return true;
          } else for (; length > index; index++) {
            if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
          }
          return !IS_INCLUDES && -1;
        };
      };
      module.exports = {
        // `Array.prototype.includes` method
        // https://tc39.es/ecma262/#sec-array.prototype.includes
        includes: createMethod(true),
        // `Array.prototype.indexOf` method
        // https://tc39.es/ecma262/#sec-array.prototype.indexof
        indexOf: createMethod(false)
      };
    }
  });

  // node_modules/core-js/internals/object-keys-internal.js
  var require_object_keys_internal = __commonJS({
    "node_modules/core-js/internals/object-keys-internal.js": function node_modules_coreJs_internals_objectKeysInternalJs(exports, module) {
      "use strict";

      var uncurryThis = require_function_uncurry_this();
      var hasOwn = require_has_own_property();
      var toIndexedObject = require_to_indexed_object();
      var indexOf = require_array_includes().indexOf;
      var hiddenKeys = require_hidden_keys();
      var push2 = uncurryThis([].push);
      module.exports = function (object, names) {
        var O = toIndexedObject(object);
        var i = 0;
        var result = [];
        var key;
        for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push2(result, key);
        while (names.length > i) if (hasOwn(O, key = names[i++])) {
          ~indexOf(result, key) || push2(result, key);
        }
        return result;
      };
    }
  });

  // node_modules/core-js/internals/enum-bug-keys.js
  var require_enum_bug_keys = __commonJS({
    "node_modules/core-js/internals/enum-bug-keys.js": function node_modules_coreJs_internals_enumBugKeysJs(exports, module) {
      "use strict";

      module.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
    }
  });

  // node_modules/core-js/internals/object-get-own-property-names.js
  var require_object_get_own_property_names = __commonJS({
    "node_modules/core-js/internals/object-get-own-property-names.js": function node_modules_coreJs_internals_objectGetOwnPropertyNamesJs(exports) {
      "use strict";

      var internalObjectKeys = require_object_keys_internal();
      var enumBugKeys = require_enum_bug_keys();
      var hiddenKeys = enumBugKeys.concat("length", "prototype");
      exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
        return internalObjectKeys(O, hiddenKeys);
      };
    }
  });

  // node_modules/core-js/internals/object-get-own-property-symbols.js
  var require_object_get_own_property_symbols = __commonJS({
    "node_modules/core-js/internals/object-get-own-property-symbols.js": function node_modules_coreJs_internals_objectGetOwnPropertySymbolsJs(exports) {
      "use strict";

      exports.f = Object.getOwnPropertySymbols;
    }
  });

  // node_modules/core-js/internals/own-keys.js
  var require_own_keys = __commonJS({
    "node_modules/core-js/internals/own-keys.js": function node_modules_coreJs_internals_ownKeysJs(exports, module) {
      "use strict";

      var getBuiltIn = require_get_built_in();
      var uncurryThis = require_function_uncurry_this();
      var getOwnPropertyNamesModule = require_object_get_own_property_names();
      var getOwnPropertySymbolsModule = require_object_get_own_property_symbols();
      var anObject = require_an_object();
      var concat = uncurryThis([].concat);
      module.exports = getBuiltIn("Reflect", "ownKeys") || function ownKeys(it) {
        var keys = getOwnPropertyNamesModule.f(anObject(it));
        var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
        return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
      };
    }
  });

  // node_modules/core-js/internals/copy-constructor-properties.js
  var require_copy_constructor_properties = __commonJS({
    "node_modules/core-js/internals/copy-constructor-properties.js": function node_modules_coreJs_internals_copyConstructorPropertiesJs(exports, module) {
      "use strict";

      var hasOwn = require_has_own_property();
      var ownKeys = require_own_keys();
      var getOwnPropertyDescriptorModule = require_object_get_own_property_descriptor();
      var definePropertyModule = require_object_define_property();
      module.exports = function (target, source, exceptions) {
        var keys = ownKeys(source);
        var defineProperty = definePropertyModule.f;
        var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
            defineProperty(target, key, getOwnPropertyDescriptor(source, key));
          }
        }
      };
    }
  });

  // node_modules/core-js/internals/is-forced.js
  var require_is_forced = __commonJS({
    "node_modules/core-js/internals/is-forced.js": function node_modules_coreJs_internals_isForcedJs(exports, module) {
      "use strict";

      var fails = require_fails();
      var isCallable = require_is_callable();
      var replacement = /#|\.prototype\./;
      var isForced = function isForced(feature, detection) {
        var value = data[normalize2(feature)];
        return value === POLYFILL ? true : value === NATIVE ? false : isCallable(detection) ? fails(detection) : !!detection;
      };
      var normalize2 = isForced.normalize = function (string) {
        return String(string).replace(replacement, ".").toLowerCase();
      };
      var data = isForced.data = {};
      var NATIVE = isForced.NATIVE = "N";
      var POLYFILL = isForced.POLYFILL = "P";
      module.exports = isForced;
    }
  });

  // node_modules/core-js/internals/export.js
  var require_export = __commonJS({
    "node_modules/core-js/internals/export.js": function node_modules_coreJs_internals_exportJs(exports, module) {
      "use strict";

      var globalThis2 = require_global_this();
      var getOwnPropertyDescriptor = require_object_get_own_property_descriptor().f;
      var createNonEnumerableProperty = require_create_non_enumerable_property();
      var defineBuiltIn = require_define_built_in();
      var defineGlobalProperty = require_define_global_property();
      var copyConstructorProperties = require_copy_constructor_properties();
      var isForced = require_is_forced();
      module.exports = function (options, source) {
        var TARGET = options.target;
        var GLOBAL = options.global;
        var STATIC = options.stat;
        var FORCED, target, key, targetProperty, sourceProperty, descriptor;
        if (GLOBAL) {
          target = globalThis2;
        } else if (STATIC) {
          target = globalThis2[TARGET] || defineGlobalProperty(TARGET, {});
        } else {
          target = globalThis2[TARGET] && globalThis2[TARGET].prototype;
        }
        if (target) for (key in source) {
          sourceProperty = source[key];
          if (options.dontCallGetSet) {
            descriptor = getOwnPropertyDescriptor(target, key);
            targetProperty = descriptor && descriptor.value;
          } else targetProperty = target[key];
          FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
          if (!FORCED && targetProperty !== void 0) {
            if (_typeof(sourceProperty) == _typeof(targetProperty)) continue;
            copyConstructorProperties(sourceProperty, targetProperty);
          }
          if (options.sham || targetProperty && targetProperty.sham) {
            createNonEnumerableProperty(sourceProperty, "sham", true);
          }
          defineBuiltIn(target, key, sourceProperty, options);
        }
      };
    }
  });

  // node_modules/core-js/internals/object-keys.js
  var require_object_keys = __commonJS({
    "node_modules/core-js/internals/object-keys.js": function node_modules_coreJs_internals_objectKeysJs(exports, module) {
      "use strict";

      var internalObjectKeys = require_object_keys_internal();
      var enumBugKeys = require_enum_bug_keys();
      module.exports = Object.keys || function keys(O) {
        return internalObjectKeys(O, enumBugKeys);
      };
    }
  });

  // node_modules/core-js/internals/object-assign.js
  var require_object_assign = __commonJS({
    "node_modules/core-js/internals/object-assign.js": function node_modules_coreJs_internals_objectAssignJs(exports, module) {
      "use strict";

      var DESCRIPTORS = require_descriptors();
      var uncurryThis = require_function_uncurry_this();
      var call2 = require_function_call();
      var fails = require_fails();
      var objectKeys = require_object_keys();
      var getOwnPropertySymbolsModule = require_object_get_own_property_symbols();
      var propertyIsEnumerableModule = require_object_property_is_enumerable();
      var toObject = require_to_object();
      var IndexedObject = require_indexed_object();
      var $assign = Object.assign;
      var defineProperty = Object.defineProperty;
      var concat = uncurryThis([].concat);
      module.exports = !$assign || fails(function () {
        if (DESCRIPTORS && $assign({
          b: 1
        }, $assign(defineProperty({}, "a", {
          enumerable: true,
          get: function get() {
            defineProperty(this, "b", {
              value: 3,
              enumerable: false
            });
          }
        }), {
          b: 2
        })).b !== 1) return true;
        var A = {};
        var B = {};
        var symbol = Symbol("assign detection");
        var alphabet = "abcdefghijklmnopqrst";
        A[symbol] = 7;
        alphabet.split("").forEach(function (chr) {
          B[chr] = chr;
        });
        return $assign({}, A)[symbol] !== 7 || objectKeys($assign({}, B)).join("") !== alphabet;
      }) ? function assign(target, source) {
        var T = toObject(target);
        var argumentsLength = arguments.length;
        var index = 1;
        var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
        var propertyIsEnumerable = propertyIsEnumerableModule.f;
        while (argumentsLength > index) {
          var S = IndexedObject(arguments[index++]);
          var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
          var length = keys.length;
          var j = 0;
          var key;
          while (length > j) {
            key = keys[j++];
            if (!DESCRIPTORS || call2(propertyIsEnumerable, S, key)) T[key] = S[key];
          }
        }
        return T;
      } : $assign;
    }
  });

  // node_modules/core-js/modules/es.object.assign.js
  var require_es_object_assign = __commonJS({
    "node_modules/core-js/modules/es.object.assign.js": function node_modules_coreJs_modules_esObjectAssignJs() {
      "use strict";

      var $ = require_export();
      var assign = require_object_assign();
      $({
        target: "Object",
        stat: true,
        arity: 2,
        forced: Object.assign !== assign
      }, {
        assign: assign
      });
    }
  });

  // node_modules/core-js/internals/path.js
  var require_path = __commonJS({
    "node_modules/core-js/internals/path.js": function node_modules_coreJs_internals_pathJs(exports, module) {
      "use strict";

      var globalThis2 = require_global_this();
      module.exports = globalThis2;
    }
  });

  // node_modules/core-js/es/object/assign.js
  var require_assign = __commonJS({
    "node_modules/core-js/es/object/assign.js": function node_modules_coreJs_es_object_assignJs(exports, module) {
      "use strict";

      require_es_object_assign();
      var path = require_path();
      module.exports = path.Object.assign;
    }
  });

  // node_modules/core-js/internals/correct-prototype-getter.js
  var require_correct_prototype_getter = __commonJS({
    "node_modules/core-js/internals/correct-prototype-getter.js": function node_modules_coreJs_internals_correctPrototypeGetterJs(exports, module) {
      "use strict";

      var fails = require_fails();
      module.exports = !fails(function () {
        function F() {}
        F.prototype.constructor = null;
        return Object.getPrototypeOf(new F()) !== F.prototype;
      });
    }
  });

  // node_modules/core-js/internals/object-get-prototype-of.js
  var require_object_get_prototype_of = __commonJS({
    "node_modules/core-js/internals/object-get-prototype-of.js": function node_modules_coreJs_internals_objectGetPrototypeOfJs(exports, module) {
      "use strict";

      var hasOwn = require_has_own_property();
      var isCallable = require_is_callable();
      var toObject = require_to_object();
      var sharedKey = require_shared_key();
      var CORRECT_PROTOTYPE_GETTER = require_correct_prototype_getter();
      var IE_PROTO = sharedKey("IE_PROTO");
      var $Object = Object;
      var ObjectPrototype = $Object.prototype;
      module.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
        var object = toObject(O);
        if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
        var constructor = object.constructor;
        if (isCallable(constructor) && object instanceof constructor) {
          return constructor.prototype;
        }
        return object instanceof $Object ? ObjectPrototype : null;
      };
    }
  });

  // node_modules/core-js/internals/object-to-array.js
  var require_object_to_array = __commonJS({
    "node_modules/core-js/internals/object-to-array.js": function node_modules_coreJs_internals_objectToArrayJs(exports, module) {
      "use strict";

      var DESCRIPTORS = require_descriptors();
      var fails = require_fails();
      var uncurryThis = require_function_uncurry_this();
      var objectGetPrototypeOf = require_object_get_prototype_of();
      var objectKeys = require_object_keys();
      var toIndexedObject = require_to_indexed_object();
      var $propertyIsEnumerable = require_object_property_is_enumerable().f;
      var propertyIsEnumerable = uncurryThis($propertyIsEnumerable);
      var push2 = uncurryThis([].push);
      var IE_BUG = DESCRIPTORS && fails(function () {
        var O = /* @__PURE__ */Object.create(null);
        O[2] = 2;
        return !propertyIsEnumerable(O, 2);
      });
      var createMethod = function createMethod(TO_ENTRIES) {
        return function (it) {
          var O = toIndexedObject(it);
          var keys = objectKeys(O);
          var IE_WORKAROUND = IE_BUG && objectGetPrototypeOf(O) === null;
          var length = keys.length;
          var i = 0;
          var result = [];
          var key;
          while (length > i) {
            key = keys[i++];
            if (!DESCRIPTORS || (IE_WORKAROUND ? key in O : propertyIsEnumerable(O, key))) {
              push2(result, TO_ENTRIES ? [key, O[key]] : O[key]);
            }
          }
          return result;
        };
      };
      module.exports = {
        // `Object.entries` method
        // https://tc39.es/ecma262/#sec-object.entries
        entries: createMethod(true),
        // `Object.values` method
        // https://tc39.es/ecma262/#sec-object.values
        values: createMethod(false)
      };
    }
  });

  // node_modules/core-js/modules/es.object.entries.js
  var require_es_object_entries = __commonJS({
    "node_modules/core-js/modules/es.object.entries.js": function node_modules_coreJs_modules_esObjectEntriesJs() {
      "use strict";

      var $ = require_export();
      var $entries = require_object_to_array().entries;
      $({
        target: "Object",
        stat: true
      }, {
        entries: function entries(O) {
          return $entries(O);
        }
      });
    }
  });

  // node_modules/core-js/es/object/entries.js
  var require_entries = __commonJS({
    "node_modules/core-js/es/object/entries.js": function node_modules_coreJs_es_object_entriesJs(exports, module) {
      "use strict";

      require_es_object_entries();
      var path = require_path();
      module.exports = path.Object.entries;
    }
  });

  // node_modules/core-js/modules/es.object.values.js
  var require_es_object_values = __commonJS({
    "node_modules/core-js/modules/es.object.values.js": function node_modules_coreJs_modules_esObjectValuesJs() {
      "use strict";

      var $ = require_export();
      var $values = require_object_to_array().values;
      $({
        target: "Object",
        stat: true
      }, {
        values: function values(O) {
          return $values(O);
        }
      });
    }
  });

  // node_modules/core-js/es/object/values.js
  var require_values = __commonJS({
    "node_modules/core-js/es/object/values.js": function node_modules_coreJs_es_object_valuesJs(exports, module) {
      "use strict";

      require_es_object_values();
      var path = require_path();
      module.exports = path.Object.values;
    }
  });

  // node_modules/core-js/internals/to-string-tag-support.js
  var require_to_string_tag_support = __commonJS({
    "node_modules/core-js/internals/to-string-tag-support.js": function node_modules_coreJs_internals_toStringTagSupportJs(exports, module) {
      "use strict";

      var wellKnownSymbol = require_well_known_symbol();
      var TO_STRING_TAG = wellKnownSymbol("toStringTag");
      var test = {};
      test[TO_STRING_TAG] = "z";
      module.exports = String(test) === "[object z]";
    }
  });

  // node_modules/core-js/internals/classof.js
  var require_classof = __commonJS({
    "node_modules/core-js/internals/classof.js": function node_modules_coreJs_internals_classofJs(exports, module) {
      "use strict";

      var TO_STRING_TAG_SUPPORT = require_to_string_tag_support();
      var isCallable = require_is_callable();
      var classofRaw = require_classof_raw();
      var wellKnownSymbol = require_well_known_symbol();
      var TO_STRING_TAG = wellKnownSymbol("toStringTag");
      var $Object = Object;
      var CORRECT_ARGUMENTS = classofRaw(/* @__PURE__ */function () {
        return arguments;
      }()) === "Arguments";
      var tryGet = function tryGet(it, key) {
        try {
          return it[key];
        } catch (error) {}
      };
      module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
        var O, tag, result;
        return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) === "Object" && isCallable(O.callee) ? "Arguments" : result;
      };
    }
  });

  // node_modules/core-js/internals/to-string.js
  var require_to_string = __commonJS({
    "node_modules/core-js/internals/to-string.js": function node_modules_coreJs_internals_toStringJs(exports, module) {
      "use strict";

      var classof = require_classof();
      var $String = String;
      module.exports = function (argument) {
        if (classof(argument) === "Symbol") throw new TypeError("Cannot convert a Symbol value to a string");
        return $String(argument);
      };
    }
  });

  // node_modules/core-js/internals/string-multibyte.js
  var require_string_multibyte = __commonJS({
    "node_modules/core-js/internals/string-multibyte.js": function node_modules_coreJs_internals_stringMultibyteJs(exports, module) {
      "use strict";

      var uncurryThis = require_function_uncurry_this();
      var toIntegerOrInfinity = require_to_integer_or_infinity();
      var toString = require_to_string();
      var requireObjectCoercible = require_require_object_coercible();
      var charAt = uncurryThis("".charAt);
      var charCodeAt = uncurryThis("".charCodeAt);
      var stringSlice = uncurryThis("".slice);
      var createMethod = function createMethod(CONVERT_TO_STRING) {
        return function ($this, pos) {
          var S = toString(requireObjectCoercible($this));
          var position = toIntegerOrInfinity(pos);
          var size = S.length;
          var first, second;
          if (position < 0 || position >= size) return CONVERT_TO_STRING ? "" : void 0;
          first = charCodeAt(S, position);
          return first < 55296 || first > 56319 || position + 1 === size || (second = charCodeAt(S, position + 1)) < 56320 || second > 57343 ? CONVERT_TO_STRING ? charAt(S, position) : first : CONVERT_TO_STRING ? stringSlice(S, position, position + 2) : (first - 55296 << 10) + (second - 56320) + 65536;
        };
      };
      module.exports = {
        // `String.prototype.codePointAt` method
        // https://tc39.es/ecma262/#sec-string.prototype.codepointat
        codeAt: createMethod(false),
        // `String.prototype.at` method
        // https://github.com/mathiasbynens/String.prototype.at
        charAt: createMethod(true)
      };
    }
  });

  // node_modules/core-js/internals/object-define-properties.js
  var require_object_define_properties = __commonJS({
    "node_modules/core-js/internals/object-define-properties.js": function node_modules_coreJs_internals_objectDefinePropertiesJs(exports) {
      "use strict";

      var DESCRIPTORS = require_descriptors();
      var V8_PROTOTYPE_DEFINE_BUG = require_v8_prototype_define_bug();
      var definePropertyModule = require_object_define_property();
      var anObject = require_an_object();
      var toIndexedObject = require_to_indexed_object();
      var objectKeys = require_object_keys();
      exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
        anObject(O);
        var props = toIndexedObject(Properties);
        var keys = objectKeys(Properties);
        var length = keys.length;
        var index = 0;
        var key;
        while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
        return O;
      };
    }
  });

  // node_modules/core-js/internals/html.js
  var require_html = __commonJS({
    "node_modules/core-js/internals/html.js": function node_modules_coreJs_internals_htmlJs(exports, module) {
      "use strict";

      var getBuiltIn = require_get_built_in();
      module.exports = getBuiltIn("document", "documentElement");
    }
  });

  // node_modules/core-js/internals/object-create.js
  var require_object_create = __commonJS({
    "node_modules/core-js/internals/object-create.js": function node_modules_coreJs_internals_objectCreateJs(exports, module) {
      "use strict";

      var anObject = require_an_object();
      var definePropertiesModule = require_object_define_properties();
      var enumBugKeys = require_enum_bug_keys();
      var hiddenKeys = require_hidden_keys();
      var html = require_html();
      var documentCreateElement = require_document_create_element();
      var sharedKey = require_shared_key();
      var GT = ">";
      var LT = "<";
      var PROTOTYPE = "prototype";
      var SCRIPT = "script";
      var IE_PROTO = sharedKey("IE_PROTO");
      var EmptyConstructor = function EmptyConstructor() {};
      var scriptTag = function scriptTag(content) {
        return LT + SCRIPT + GT + content + LT + "/" + SCRIPT + GT;
      };
      var NullProtoObjectViaActiveX = function NullProtoObjectViaActiveX(activeXDocument2) {
        activeXDocument2.write(scriptTag(""));
        activeXDocument2.close();
        var temp = activeXDocument2.parentWindow.Object;
        activeXDocument2 = null;
        return temp;
      };
      var NullProtoObjectViaIFrame = function NullProtoObjectViaIFrame() {
        var iframe = documentCreateElement("iframe");
        var JS = "java" + SCRIPT + ":";
        var iframeDocument;
        iframe.style.display = "none";
        html.appendChild(iframe);
        iframe.src = String(JS);
        iframeDocument = iframe.contentWindow.document;
        iframeDocument.open();
        iframeDocument.write(scriptTag("document.F=Object"));
        iframeDocument.close();
        return iframeDocument.F;
      };
      var activeXDocument;
      var _NullProtoObject = function NullProtoObject() {
        try {
          activeXDocument = new ActiveXObject("htmlfile");
        } catch (error) {}
        _NullProtoObject = typeof document != "undefined" ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument);
        var length = enumBugKeys.length;
        while (length--) delete _NullProtoObject[PROTOTYPE][enumBugKeys[length]];
        return _NullProtoObject();
      };
      hiddenKeys[IE_PROTO] = true;
      module.exports = Object.create || function create(O, Properties) {
        var result;
        if (O !== null) {
          EmptyConstructor[PROTOTYPE] = anObject(O);
          result = new EmptyConstructor();
          EmptyConstructor[PROTOTYPE] = null;
          result[IE_PROTO] = O;
        } else result = _NullProtoObject();
        return Properties === void 0 ? result : definePropertiesModule.f(result, Properties);
      };
    }
  });

  // node_modules/core-js/internals/iterators-core.js
  var require_iterators_core = __commonJS({
    "node_modules/core-js/internals/iterators-core.js": function node_modules_coreJs_internals_iteratorsCoreJs(exports, module) {
      "use strict";

      var fails = require_fails();
      var isCallable = require_is_callable();
      var isObject = require_is_object();
      var create = require_object_create();
      var getPrototypeOf = require_object_get_prototype_of();
      var defineBuiltIn = require_define_built_in();
      var wellKnownSymbol = require_well_known_symbol();
      var IS_PURE = require_is_pure();
      var ITERATOR = wellKnownSymbol("iterator");
      var BUGGY_SAFARI_ITERATORS = false;
      var IteratorPrototype;
      var PrototypeOfArrayIteratorPrototype;
      var arrayIterator;
      if ([].keys) {
        arrayIterator = [].keys();
        if (!("next" in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;else {
          PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
          if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
        }
      }
      var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype) || fails(function () {
        var test = {};
        return IteratorPrototype[ITERATOR].call(test) !== test;
      });
      if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);
      if (!isCallable(IteratorPrototype[ITERATOR])) {
        defineBuiltIn(IteratorPrototype, ITERATOR, function () {
          return this;
        });
      }
      module.exports = {
        IteratorPrototype: IteratorPrototype,
        BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
      };
    }
  });

  // node_modules/core-js/internals/set-to-string-tag.js
  var require_set_to_string_tag = __commonJS({
    "node_modules/core-js/internals/set-to-string-tag.js": function node_modules_coreJs_internals_setToStringTagJs(exports, module) {
      "use strict";

      var defineProperty = require_object_define_property().f;
      var hasOwn = require_has_own_property();
      var wellKnownSymbol = require_well_known_symbol();
      var TO_STRING_TAG = wellKnownSymbol("toStringTag");
      module.exports = function (target, TAG, STATIC) {
        if (target && !STATIC) target = target.prototype;
        if (target && !hasOwn(target, TO_STRING_TAG)) {
          defineProperty(target, TO_STRING_TAG, {
            configurable: true,
            value: TAG
          });
        }
      };
    }
  });

  // node_modules/core-js/internals/iterators.js
  var require_iterators = __commonJS({
    "node_modules/core-js/internals/iterators.js": function node_modules_coreJs_internals_iteratorsJs(exports, module) {
      "use strict";

      module.exports = Object.create ? /* @__PURE__ */Object.create(null) : {};
    }
  });

  // node_modules/core-js/internals/iterator-create-constructor.js
  var require_iterator_create_constructor = __commonJS({
    "node_modules/core-js/internals/iterator-create-constructor.js": function node_modules_coreJs_internals_iteratorCreateConstructorJs(exports, module) {
      "use strict";

      var IteratorPrototype = require_iterators_core().IteratorPrototype;
      var create = require_object_create();
      var createPropertyDescriptor = require_create_property_descriptor();
      var setToStringTag = require_set_to_string_tag();
      var Iterators = require_iterators();
      var returnThis = function returnThis() {
        return this;
      };
      module.exports = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
        var TO_STRING_TAG = NAME + " Iterator";
        IteratorConstructor.prototype = create(IteratorPrototype, {
          next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next)
        });
        setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
        Iterators[TO_STRING_TAG] = returnThis;
        return IteratorConstructor;
      };
    }
  });

  // node_modules/core-js/internals/function-uncurry-this-accessor.js
  var require_function_uncurry_this_accessor = __commonJS({
    "node_modules/core-js/internals/function-uncurry-this-accessor.js": function node_modules_coreJs_internals_functionUncurryThisAccessorJs(exports, module) {
      "use strict";

      var uncurryThis = require_function_uncurry_this();
      var aCallable = require_a_callable();
      module.exports = function (object, key, method) {
        try {
          return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
        } catch (error) {}
      };
    }
  });

  // node_modules/core-js/internals/is-possible-prototype.js
  var require_is_possible_prototype = __commonJS({
    "node_modules/core-js/internals/is-possible-prototype.js": function node_modules_coreJs_internals_isPossiblePrototypeJs(exports, module) {
      "use strict";

      var isObject = require_is_object();
      module.exports = function (argument) {
        return isObject(argument) || argument === null;
      };
    }
  });

  // node_modules/core-js/internals/a-possible-prototype.js
  var require_a_possible_prototype = __commonJS({
    "node_modules/core-js/internals/a-possible-prototype.js": function node_modules_coreJs_internals_aPossiblePrototypeJs(exports, module) {
      "use strict";

      var isPossiblePrototype = require_is_possible_prototype();
      var $String = String;
      var $TypeError = TypeError;
      module.exports = function (argument) {
        if (isPossiblePrototype(argument)) return argument;
        throw new $TypeError("Can't set " + $String(argument) + " as a prototype");
      };
    }
  });

  // node_modules/core-js/internals/object-set-prototype-of.js
  var require_object_set_prototype_of = __commonJS({
    "node_modules/core-js/internals/object-set-prototype-of.js": function node_modules_coreJs_internals_objectSetPrototypeOfJs(exports, module) {
      "use strict";

      var uncurryThisAccessor = require_function_uncurry_this_accessor();
      var isObject = require_is_object();
      var requireObjectCoercible = require_require_object_coercible();
      var aPossiblePrototype = require_a_possible_prototype();
      module.exports = Object.setPrototypeOf || ("__proto__" in {} ? function () {
        var CORRECT_SETTER = false;
        var test = {};
        var setter;
        try {
          setter = uncurryThisAccessor(Object.prototype, "__proto__", "set");
          setter(test, []);
          CORRECT_SETTER = test instanceof Array;
        } catch (error) {}
        return function setPrototypeOf(O, proto) {
          requireObjectCoercible(O);
          aPossiblePrototype(proto);
          if (!isObject(O)) return O;
          if (CORRECT_SETTER) setter(O, proto);else O.__proto__ = proto;
          return O;
        };
      }() : void 0);
    }
  });

  // node_modules/core-js/internals/iterator-define.js
  var require_iterator_define = __commonJS({
    "node_modules/core-js/internals/iterator-define.js": function node_modules_coreJs_internals_iteratorDefineJs(exports, module) {
      "use strict";

      var $ = require_export();
      var call2 = require_function_call();
      var IS_PURE = require_is_pure();
      var FunctionName = require_function_name();
      var isCallable = require_is_callable();
      var createIteratorConstructor = require_iterator_create_constructor();
      var getPrototypeOf = require_object_get_prototype_of();
      var setPrototypeOf = require_object_set_prototype_of();
      var setToStringTag = require_set_to_string_tag();
      var createNonEnumerableProperty = require_create_non_enumerable_property();
      var defineBuiltIn = require_define_built_in();
      var wellKnownSymbol = require_well_known_symbol();
      var Iterators = require_iterators();
      var IteratorsCore = require_iterators_core();
      var PROPER_FUNCTION_NAME = FunctionName.PROPER;
      var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
      var IteratorPrototype = IteratorsCore.IteratorPrototype;
      var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
      var ITERATOR = wellKnownSymbol("iterator");
      var KEYS = "keys";
      var VALUES = "values";
      var ENTRIES = "entries";
      var returnThis = function returnThis() {
        return this;
      };
      module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
        createIteratorConstructor(IteratorConstructor, NAME, next);
        var getIterationMethod = function getIterationMethod(KIND) {
          if (KIND === DEFAULT && defaultIterator) return defaultIterator;
          if (!BUGGY_SAFARI_ITERATORS && KIND && KIND in IterablePrototype) return IterablePrototype[KIND];
          switch (KIND) {
            case KEYS:
              return function keys() {
                return new IteratorConstructor(this, KIND);
              };
            case VALUES:
              return function values() {
                return new IteratorConstructor(this, KIND);
              };
            case ENTRIES:
              return function entries() {
                return new IteratorConstructor(this, KIND);
              };
          }
          return function () {
            return new IteratorConstructor(this);
          };
        };
        var TO_STRING_TAG = NAME + " Iterator";
        var INCORRECT_VALUES_NAME = false;
        var IterablePrototype = Iterable.prototype;
        var nativeIterator = IterablePrototype[ITERATOR] || IterablePrototype["@@iterator"] || DEFAULT && IterablePrototype[DEFAULT];
        var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
        var anyNativeIterator = NAME === "Array" ? IterablePrototype.entries || nativeIterator : nativeIterator;
        var CurrentIteratorPrototype, methods, KEY3;
        if (anyNativeIterator) {
          CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
          if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
            if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
              if (setPrototypeOf) {
                setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
              } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
                defineBuiltIn(CurrentIteratorPrototype, ITERATOR, returnThis);
              }
            }
            setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
            if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
          }
        }
        if (PROPER_FUNCTION_NAME && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
          if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
            createNonEnumerableProperty(IterablePrototype, "name", VALUES);
          } else {
            INCORRECT_VALUES_NAME = true;
            defaultIterator = function values() {
              return call2(nativeIterator, this);
            };
          }
        }
        if (DEFAULT) {
          methods = {
            values: getIterationMethod(VALUES),
            keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
            entries: getIterationMethod(ENTRIES)
          };
          if (FORCED) for (KEY3 in methods) {
            if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY3 in IterablePrototype)) {
              defineBuiltIn(IterablePrototype, KEY3, methods[KEY3]);
            }
          } else $({
            target: NAME,
            proto: true,
            forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME
          }, methods);
        }
        if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
          defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, {
            name: DEFAULT
          });
        }
        Iterators[NAME] = defaultIterator;
        return methods;
      };
    }
  });

  // node_modules/core-js/internals/create-iter-result-object.js
  var require_create_iter_result_object = __commonJS({
    "node_modules/core-js/internals/create-iter-result-object.js": function node_modules_coreJs_internals_createIterResultObjectJs(exports, module) {
      "use strict";

      module.exports = function (value, done) {
        return {
          value: value,
          done: done
        };
      };
    }
  });

  // node_modules/core-js/modules/es.string.iterator.js
  var require_es_string_iterator = __commonJS({
    "node_modules/core-js/modules/es.string.iterator.js": function node_modules_coreJs_modules_esStringIteratorJs() {
      "use strict";

      var charAt = require_string_multibyte().charAt;
      var toString = require_to_string();
      var InternalStateModule = require_internal_state();
      var defineIterator = require_iterator_define();
      var createIterResultObject = require_create_iter_result_object();
      var STRING_ITERATOR = "String Iterator";
      var setInternalState = InternalStateModule.set;
      var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);
      defineIterator(String, "String", function (iterated) {
        setInternalState(this, {
          type: STRING_ITERATOR,
          string: toString(iterated),
          index: 0
        });
      }, function next() {
        var state = getInternalState(this);
        var string = state.string;
        var index = state.index;
        var point;
        if (index >= string.length) return createIterResultObject(void 0, true);
        point = charAt(string, index);
        state.index += point.length;
        return createIterResultObject(point, false);
      });
    }
  });

  // node_modules/core-js/internals/function-uncurry-this-clause.js
  var require_function_uncurry_this_clause = __commonJS({
    "node_modules/core-js/internals/function-uncurry-this-clause.js": function node_modules_coreJs_internals_functionUncurryThisClauseJs(exports, module) {
      "use strict";

      var classofRaw = require_classof_raw();
      var uncurryThis = require_function_uncurry_this();
      module.exports = function (fn) {
        if (classofRaw(fn) === "Function") return uncurryThis(fn);
      };
    }
  });

  // node_modules/core-js/internals/function-bind-context.js
  var require_function_bind_context = __commonJS({
    "node_modules/core-js/internals/function-bind-context.js": function node_modules_coreJs_internals_functionBindContextJs(exports, module) {
      "use strict";

      var uncurryThis = require_function_uncurry_this_clause();
      var aCallable = require_a_callable();
      var NATIVE_BIND = require_function_bind_native();
      var bind = uncurryThis(uncurryThis.bind);
      module.exports = function (fn, that) {
        aCallable(fn);
        return that === void 0 ? fn : NATIVE_BIND ? bind(fn, that) : function () {
          return fn.apply(that, arguments);
        };
      };
    }
  });

  // node_modules/core-js/internals/iterator-close.js
  var require_iterator_close = __commonJS({
    "node_modules/core-js/internals/iterator-close.js": function node_modules_coreJs_internals_iteratorCloseJs(exports, module) {
      "use strict";

      var call2 = require_function_call();
      var anObject = require_an_object();
      var getMethod = require_get_method();
      module.exports = function (iterator, kind, value) {
        var innerResult, innerError;
        anObject(iterator);
        try {
          innerResult = getMethod(iterator, "return");
          if (!innerResult) {
            if (kind === "throw") throw value;
            return value;
          }
          innerResult = call2(innerResult, iterator);
        } catch (error) {
          innerError = true;
          innerResult = error;
        }
        if (kind === "throw") throw value;
        if (innerError) throw innerResult;
        anObject(innerResult);
        return value;
      };
    }
  });

  // node_modules/core-js/internals/call-with-safe-iteration-closing.js
  var require_call_with_safe_iteration_closing = __commonJS({
    "node_modules/core-js/internals/call-with-safe-iteration-closing.js": function node_modules_coreJs_internals_callWithSafeIterationClosingJs(exports, module) {
      "use strict";

      var anObject = require_an_object();
      var iteratorClose = require_iterator_close();
      module.exports = function (iterator, fn, value, ENTRIES) {
        try {
          return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
        } catch (error) {
          iteratorClose(iterator, "throw", error);
        }
      };
    }
  });

  // node_modules/core-js/internals/is-array-iterator-method.js
  var require_is_array_iterator_method = __commonJS({
    "node_modules/core-js/internals/is-array-iterator-method.js": function node_modules_coreJs_internals_isArrayIteratorMethodJs(exports, module) {
      "use strict";

      var wellKnownSymbol = require_well_known_symbol();
      var Iterators = require_iterators();
      var ITERATOR = wellKnownSymbol("iterator");
      var ArrayPrototype = Array.prototype;
      module.exports = function (it) {
        return it !== void 0 && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
      };
    }
  });

  // node_modules/core-js/internals/is-constructor.js
  var require_is_constructor = __commonJS({
    "node_modules/core-js/internals/is-constructor.js": function node_modules_coreJs_internals_isConstructorJs(exports, module) {
      "use strict";

      var uncurryThis = require_function_uncurry_this();
      var fails = require_fails();
      var isCallable = require_is_callable();
      var classof = require_classof();
      var getBuiltIn = require_get_built_in();
      var inspectSource = require_inspect_source();
      var noop = function noop() {};
      var construct = getBuiltIn("Reflect", "construct");
      var constructorRegExp = /^\s*(?:class|function)\b/;
      var exec = uncurryThis(constructorRegExp.exec);
      var INCORRECT_TO_STRING = !constructorRegExp.test(noop);
      var isConstructorModern = function isConstructor(argument) {
        if (!isCallable(argument)) return false;
        try {
          construct(noop, [], argument);
          return true;
        } catch (error) {
          return false;
        }
      };
      var isConstructorLegacy = function isConstructor(argument) {
        if (!isCallable(argument)) return false;
        switch (classof(argument)) {
          case "AsyncFunction":
          case "GeneratorFunction":
          case "AsyncGeneratorFunction":
            return false;
        }
        try {
          return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
        } catch (error) {
          return true;
        }
      };
      isConstructorLegacy.sham = true;
      module.exports = !construct || fails(function () {
        var called;
        return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function () {
          called = true;
        }) || called;
      }) ? isConstructorLegacy : isConstructorModern;
    }
  });

  // node_modules/core-js/internals/create-property.js
  var require_create_property = __commonJS({
    "node_modules/core-js/internals/create-property.js": function node_modules_coreJs_internals_createPropertyJs(exports, module) {
      "use strict";

      var DESCRIPTORS = require_descriptors();
      var definePropertyModule = require_object_define_property();
      var createPropertyDescriptor = require_create_property_descriptor();
      module.exports = function (object, key, value) {
        if (DESCRIPTORS) definePropertyModule.f(object, key, createPropertyDescriptor(0, value));else object[key] = value;
      };
    }
  });

  // node_modules/core-js/internals/is-array.js
  var require_is_array = __commonJS({
    "node_modules/core-js/internals/is-array.js": function node_modules_coreJs_internals_isArrayJs(exports, module) {
      "use strict";

      var classof = require_classof_raw();
      module.exports = Array.isArray || function isArray(argument) {
        return classof(argument) === "Array";
      };
    }
  });

  // node_modules/core-js/internals/array-set-length.js
  var require_array_set_length = __commonJS({
    "node_modules/core-js/internals/array-set-length.js": function node_modules_coreJs_internals_arraySetLengthJs(exports, module) {
      "use strict";

      var DESCRIPTORS = require_descriptors();
      var isArray = require_is_array();
      var $TypeError = TypeError;
      var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
      var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function () {
        if (this !== void 0) return true;
        try {
          Object.defineProperty([], "length", {
            writable: false
          }).length = 1;
        } catch (error) {
          return error instanceof TypeError;
        }
      }();
      module.exports = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
        if (isArray(O) && !getOwnPropertyDescriptor(O, "length").writable) {
          throw new $TypeError("Cannot set read only .length");
        }
        return O.length = length;
      } : function (O, length) {
        return O.length = length;
      };
    }
  });

  // node_modules/core-js/internals/get-iterator-method-internal.js
  var require_get_iterator_method_internal = __commonJS({
    "node_modules/core-js/internals/get-iterator-method-internal.js": function node_modules_coreJs_internals_getIteratorMethodInternalJs(exports, module) {
      "use strict";

      var classof = require_classof_raw();
      var isNullOrUndefined = require_is_null_or_undefined();
      var getMethod = require_get_method();
      var wellKnownSymbol = require_well_known_symbol();
      var ITERATOR = wellKnownSymbol("iterator");
      var ArrayPrototype = Array.prototype;
      module.exports = function (it) {
        if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR) || getMethod(it, "@@iterator") || (classof(it) === "Arguments" ? ArrayPrototype[ITERATOR] : void 0);
      };
    }
  });

  // node_modules/core-js/internals/get-iterator-internal.js
  var require_get_iterator_internal = __commonJS({
    "node_modules/core-js/internals/get-iterator-internal.js": function node_modules_coreJs_internals_getIteratorInternalJs(exports, module) {
      "use strict";

      var call2 = require_function_call();
      var isCallable = require_is_callable();
      var anObject = require_an_object();
      var tryToString = require_try_to_string();
      var getIteratorMethod = require_get_iterator_method_internal();
      var $TypeError = TypeError;
      module.exports = function (argument, usingIterator) {
        var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
        if (isCallable(iteratorMethod)) return anObject(call2(iteratorMethod, argument));
        throw new $TypeError(tryToString(argument) + " is not iterable");
      };
    }
  });

  // node_modules/core-js/internals/does-not-exceed-safe-integer.js
  var require_does_not_exceed_safe_integer = __commonJS({
    "node_modules/core-js/internals/does-not-exceed-safe-integer.js": function node_modules_coreJs_internals_doesNotExceedSafeIntegerJs(exports, module) {
      "use strict";

      var $TypeError = TypeError;
      var MAX_SAFE_INTEGER = 9007199254740991;
      module.exports = function (it) {
        if (it > MAX_SAFE_INTEGER) throw new $TypeError("Maximum allowed index exceeded");
        return it;
      };
    }
  });

  // node_modules/core-js/internals/array-from.js
  var require_array_from = __commonJS({
    "node_modules/core-js/internals/array-from.js": function node_modules_coreJs_internals_arrayFromJs(exports, module) {
      "use strict";

      var bind = require_function_bind_context();
      var call2 = require_function_call();
      var toObject = require_to_object();
      var callWithSafeIterationClosing = require_call_with_safe_iteration_closing();
      var isArrayIteratorMethod = require_is_array_iterator_method();
      var isConstructor = require_is_constructor();
      var lengthOfArrayLike = require_length_of_array_like();
      var createProperty = require_create_property();
      var setArrayLength = require_array_set_length();
      var getIterator = require_get_iterator_internal();
      var getIteratorMethod = require_get_iterator_method_internal();
      var iteratorClose = require_iterator_close();
      var doesNotExceedSafeInteger = require_does_not_exceed_safe_integer();
      var $Array = Array;
      module.exports = function from(arrayLike) {
        var IS_CONSTRUCTOR = isConstructor(this);
        var argumentsLength = arguments.length;
        var mapfn = argumentsLength > 1 ? arguments[1] : void 0;
        var mapping = mapfn !== void 0;
        if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : void 0);
        var O = toObject(arrayLike);
        var iteratorMethod = getIteratorMethod(O);
        var index = 0;
        var length, result, step, iterator, next, value;
        if (iteratorMethod && !(this === $Array && isArrayIteratorMethod(iteratorMethod))) {
          result = IS_CONSTRUCTOR ? new this() : [];
          iterator = getIterator(O, iteratorMethod);
          next = iterator.next;
          for (; !(step = call2(next, iterator)).done; index++) {
            try {
              doesNotExceedSafeInteger(index);
            } catch (error) {
              iteratorClose(iterator, "throw", error);
            }
            value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
            try {
              createProperty(result, index, value);
            } catch (error) {
              iteratorClose(iterator, "throw", error);
            }
          }
        } else {
          length = lengthOfArrayLike(O);
          result = IS_CONSTRUCTOR ? new this(length) : $Array(length);
          for (; length > index; index++) {
            value = mapping ? mapfn(O[index], index) : O[index];
            createProperty(result, index, value);
          }
        }
        setArrayLength(result, index);
        return result;
      };
    }
  });

  // node_modules/core-js/internals/check-correctness-of-iteration.js
  var require_check_correctness_of_iteration = __commonJS({
    "node_modules/core-js/internals/check-correctness-of-iteration.js": function node_modules_coreJs_internals_checkCorrectnessOfIterationJs(exports, module) {
      "use strict";

      var wellKnownSymbol = require_well_known_symbol();
      var ITERATOR = wellKnownSymbol("iterator");
      var SAFE_CLOSING = false;
      try {
        called = 0;
        iteratorWithReturn = {
          next: function next() {
            return {
              done: !!called++
            };
          },
          "return": function _return() {
            SAFE_CLOSING = true;
          }
        };
        iteratorWithReturn[ITERATOR] = function () {
          return this;
        };
        Array.from(iteratorWithReturn, function () {
          throw 2;
        });
      } catch (error) {}
      var called;
      var iteratorWithReturn;
      module.exports = function (exec, SKIP_CLOSING) {
        try {
          if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
        } catch (error) {
          return false;
        }
        var ITERATION_SUPPORT = false;
        try {
          var object = {};
          object[ITERATOR] = function () {
            return {
              next: function next() {
                return {
                  done: ITERATION_SUPPORT = true
                };
              }
            };
          };
          exec(object);
        } catch (error) {}
        return ITERATION_SUPPORT;
      };
    }
  });

  // node_modules/core-js/modules/es.array.from.js
  var require_es_array_from = __commonJS({
    "node_modules/core-js/modules/es.array.from.js": function node_modules_coreJs_modules_esArrayFromJs() {
      "use strict";

      var $ = require_export();
      var from = require_array_from();
      var checkCorrectnessOfIteration = require_check_correctness_of_iteration();
      var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
        Array.from(iterable);
      });
      $({
        target: "Array",
        stat: true,
        forced: INCORRECT_ITERATION
      }, {
        from: from
      });
    }
  });

  // node_modules/core-js/es/array/from.js
  var require_from = __commonJS({
    "node_modules/core-js/es/array/from.js": function node_modules_coreJs_es_array_fromJs(exports, module) {
      "use strict";

      require_es_string_iterator();
      require_es_array_from();
      var path = require_path();
      module.exports = path.Array.from;
    }
  });

  // node_modules/core-js/internals/array-species-constructor.js
  var require_array_species_constructor = __commonJS({
    "node_modules/core-js/internals/array-species-constructor.js": function node_modules_coreJs_internals_arraySpeciesConstructorJs(exports, module) {
      "use strict";

      var isArray = require_is_array();
      var isConstructor = require_is_constructor();
      var isObject = require_is_object();
      var wellKnownSymbol = require_well_known_symbol();
      var SPECIES = wellKnownSymbol("species");
      var $Array = Array;
      module.exports = function (originalArray) {
        var C;
        if (isArray(originalArray)) {
          C = originalArray.constructor;
          if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = void 0;else if (isObject(C)) {
            C = C[SPECIES];
            if (C === null) C = void 0;
          }
        }
        return C === void 0 ? $Array : C;
      };
    }
  });

  // node_modules/core-js/internals/array-species-create.js
  var require_array_species_create = __commonJS({
    "node_modules/core-js/internals/array-species-create.js": function node_modules_coreJs_internals_arraySpeciesCreateJs(exports, module) {
      "use strict";

      var arraySpeciesConstructor = require_array_species_constructor();
      module.exports = function (originalArray, length) {
        return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
      };
    }
  });

  // node_modules/core-js/internals/array-iteration.js
  var require_array_iteration = __commonJS({
    "node_modules/core-js/internals/array-iteration.js": function node_modules_coreJs_internals_arrayIterationJs(exports, module) {
      "use strict";

      var bind = require_function_bind_context();
      var IndexedObject = require_indexed_object();
      var toObject = require_to_object();
      var lengthOfArrayLike = require_length_of_array_like();
      var arraySpeciesCreate = require_array_species_create();
      var createProperty = require_create_property();
      var createMethod = function createMethod(TYPE) {
        var IS_MAP = TYPE === 1;
        var IS_FILTER = TYPE === 2;
        var IS_SOME = TYPE === 3;
        var IS_EVERY = TYPE === 4;
        var IS_FIND_INDEX = TYPE === 6;
        var IS_FILTER_REJECT = TYPE === 7;
        var NO_HOLES = TYPE === 5 || IS_FIND_INDEX;
        return function ($this, callbackfn, that) {
          var O = toObject($this);
          var self2 = IndexedObject(O);
          var length = lengthOfArrayLike(self2);
          var boundFunction = bind(callbackfn, that);
          var index = 0;
          var resIndex = 0;
          var target = IS_MAP ? arraySpeciesCreate($this, length) : IS_FILTER || IS_FILTER_REJECT ? arraySpeciesCreate($this, 0) : void 0;
          var value, result;
          for (; length > index; index++) if (NO_HOLES || index in self2) {
            value = self2[index];
            result = boundFunction(value, index, O);
            if (TYPE) {
              if (IS_MAP) createProperty(target, index, result);else if (result) switch (TYPE) {
                case 3:
                  return true;
                // some
                case 5:
                  return value;
                // find
                case 6:
                  return index;
                // findIndex
                case 2:
                  createProperty(target, resIndex++, value);
              } else switch (TYPE) {
                case 4:
                  return false;
                // every
                case 7:
                  createProperty(target, resIndex++, value);
              }
            }
          }
          return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
        };
      };
      module.exports = {
        // `Array.prototype.forEach` method
        // https://tc39.es/ecma262/#sec-array.prototype.foreach
        forEach: createMethod(0),
        // `Array.prototype.map` method
        // https://tc39.es/ecma262/#sec-array.prototype.map
        map: createMethod(1),
        // `Array.prototype.filter` method
        // https://tc39.es/ecma262/#sec-array.prototype.filter
        filter: createMethod(2),
        // `Array.prototype.some` method
        // https://tc39.es/ecma262/#sec-array.prototype.some
        some: createMethod(3),
        // `Array.prototype.every` method
        // https://tc39.es/ecma262/#sec-array.prototype.every
        every: createMethod(4),
        // `Array.prototype.find` method
        // https://tc39.es/ecma262/#sec-array.prototype.find
        find: createMethod(5),
        // `Array.prototype.findIndex` method
        // https://tc39.es/ecma262/#sec-array.prototype.findIndex
        findIndex: createMethod(6),
        // `Array.prototype.filterReject` method
        // https://github.com/tc39/proposal-array-filtering
        filterReject: createMethod(7)
      };
    }
  });

  // node_modules/core-js/internals/add-to-unscopables.js
  var require_add_to_unscopables = __commonJS({
    "node_modules/core-js/internals/add-to-unscopables.js": function node_modules_coreJs_internals_addToUnscopablesJs(exports, module) {
      "use strict";

      var wellKnownSymbol = require_well_known_symbol();
      var create = require_object_create();
      var defineProperty = require_object_define_property().f;
      var UNSCOPABLES = wellKnownSymbol("unscopables");
      var ArrayPrototype = Array.prototype;
      if (ArrayPrototype[UNSCOPABLES] === void 0) {
        defineProperty(ArrayPrototype, UNSCOPABLES, {
          configurable: true,
          value: create(null)
        });
      }
      module.exports = function (key) {
        ArrayPrototype[UNSCOPABLES][key] = true;
      };
    }
  });

  // node_modules/core-js/modules/es.array.find.js
  var require_es_array_find = __commonJS({
    "node_modules/core-js/modules/es.array.find.js": function node_modules_coreJs_modules_esArrayFindJs() {
      "use strict";

      var $ = require_export();
      var $find = require_array_iteration().find;
      var addToUnscopables = require_add_to_unscopables();
      var FIND = "find";
      var SKIPS_HOLES = true;
      if (FIND in []) Array(1)[FIND](function () {
        SKIPS_HOLES = false;
      });
      $({
        target: "Array",
        proto: true,
        forced: SKIPS_HOLES
      }, {
        find: function find2(callbackfn) {
          return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
        }
      });
      addToUnscopables(FIND);
    }
  });

  // node_modules/core-js/internals/entry-unbind.js
  var require_entry_unbind = __commonJS({
    "node_modules/core-js/internals/entry-unbind.js": function node_modules_coreJs_internals_entryUnbindJs(exports, module) {
      "use strict";

      var globalThis2 = require_global_this();
      var uncurryThis = require_function_uncurry_this();
      module.exports = function (CONSTRUCTOR, METHOD) {
        return uncurryThis(globalThis2[CONSTRUCTOR].prototype[METHOD]);
      };
    }
  });

  // node_modules/core-js/es/array/find.js
  var require_find = __commonJS({
    "node_modules/core-js/es/array/find.js": function node_modules_coreJs_es_array_findJs(exports, module) {
      "use strict";

      require_es_array_find();
      var entryUnbind = require_entry_unbind();
      module.exports = entryUnbind("Array", "find");
    }
  });

  // node_modules/core-js/modules/es.array.find-index.js
  var require_es_array_find_index = __commonJS({
    "node_modules/core-js/modules/es.array.find-index.js": function node_modules_coreJs_modules_esArrayFindIndexJs() {
      "use strict";

      var $ = require_export();
      var $findIndex = require_array_iteration().findIndex;
      var addToUnscopables = require_add_to_unscopables();
      var FIND_INDEX = "findIndex";
      var SKIPS_HOLES = true;
      if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () {
        SKIPS_HOLES = false;
      });
      $({
        target: "Array",
        proto: true,
        forced: SKIPS_HOLES
      }, {
        findIndex: function findIndex(callbackfn) {
          return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
        }
      });
      addToUnscopables(FIND_INDEX);
    }
  });

  // node_modules/core-js/es/array/find-index.js
  var require_find_index = __commonJS({
    "node_modules/core-js/es/array/find-index.js": function node_modules_coreJs_es_array_findIndexJs(exports, module) {
      "use strict";

      require_es_array_find_index();
      var entryUnbind = require_entry_unbind();
      module.exports = entryUnbind("Array", "findIndex");
    }
  });

  // node_modules/core-js/modules/es.array.includes.js
  var require_es_array_includes = __commonJS({
    "node_modules/core-js/modules/es.array.includes.js": function node_modules_coreJs_modules_esArrayIncludesJs() {
      "use strict";

      var $ = require_export();
      var $includes = require_array_includes().includes;
      var fails = require_fails();
      var addToUnscopables = require_add_to_unscopables();
      var BROKEN_ON_SPARSE = fails(function () {
        return !Array(1).includes();
      });
      var BROKEN_ON_SPARSE_WITH_FROM_INDEX = fails(function () {
        return [, 1].includes(void 0, 1);
      });
      $({
        target: "Array",
        proto: true,
        forced: BROKEN_ON_SPARSE || BROKEN_ON_SPARSE_WITH_FROM_INDEX
      }, {
        includes: function includes(el) {
          return $includes(this, el, arguments.length > 1 ? arguments[1] : void 0);
        }
      });
      addToUnscopables("includes");
    }
  });

  // node_modules/core-js/es/array/includes.js
  var require_includes = __commonJS({
    "node_modules/core-js/es/array/includes.js": function node_modules_coreJs_es_array_includesJs(exports, module) {
      "use strict";

      require_es_array_includes();
      var entryUnbind = require_entry_unbind();
      module.exports = entryUnbind("Array", "includes");
    }
  });

  // node_modules/core-js/internals/array-fill.js
  var require_array_fill = __commonJS({
    "node_modules/core-js/internals/array-fill.js": function node_modules_coreJs_internals_arrayFillJs(exports, module) {
      "use strict";

      var toObject = require_to_object();
      var toAbsoluteIndex = require_to_absolute_index();
      var lengthOfArrayLike = require_length_of_array_like();
      module.exports = [].fill || function fill(value) {
        var O = toObject(this);
        var length = lengthOfArrayLike(O);
        var argumentsLength = arguments.length;
        var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : void 0, length);
        var end = argumentsLength > 2 ? arguments[2] : void 0;
        var endPos = end === void 0 ? length : toAbsoluteIndex(end, length);
        while (endPos > index) O[index++] = value;
        return O;
      };
    }
  });

  // node_modules/core-js/modules/es.array.fill.js
  var require_es_array_fill = __commonJS({
    "node_modules/core-js/modules/es.array.fill.js": function node_modules_coreJs_modules_esArrayFillJs() {
      "use strict";

      var $ = require_export();
      var fill = require_array_fill();
      var addToUnscopables = require_add_to_unscopables();
      $({
        target: "Array",
        proto: true
      }, {
        fill: fill
      });
      addToUnscopables("fill");
    }
  });

  // node_modules/core-js/es/array/fill.js
  var require_fill = __commonJS({
    "node_modules/core-js/es/array/fill.js": function node_modules_coreJs_es_array_fillJs(exports, module) {
      "use strict";

      require_es_array_fill();
      var entryUnbind = require_entry_unbind();
      module.exports = entryUnbind("Array", "fill");
    }
  });

  // node_modules/core-js/internals/is-regexp.js
  var require_is_regexp = __commonJS({
    "node_modules/core-js/internals/is-regexp.js": function node_modules_coreJs_internals_isRegexpJs(exports, module) {
      "use strict";

      var isObject = require_is_object();
      var classof = require_classof_raw();
      var wellKnownSymbol = require_well_known_symbol();
      var MATCH = wellKnownSymbol("match");
      module.exports = function (it) {
        var isRegExp;
        return isObject(it) && ((isRegExp = it[MATCH]) !== void 0 ? !!isRegExp : classof(it) === "RegExp");
      };
    }
  });

  // node_modules/core-js/internals/not-a-regexp.js
  var require_not_a_regexp = __commonJS({
    "node_modules/core-js/internals/not-a-regexp.js": function node_modules_coreJs_internals_notARegexpJs(exports, module) {
      "use strict";

      var isRegExp = require_is_regexp();
      var $TypeError = TypeError;
      module.exports = function (it) {
        if (isRegExp(it)) {
          throw new $TypeError("The method doesn't accept regular expressions");
        }
        return it;
      };
    }
  });

  // node_modules/core-js/internals/correct-is-regexp-logic.js
  var require_correct_is_regexp_logic = __commonJS({
    "node_modules/core-js/internals/correct-is-regexp-logic.js": function node_modules_coreJs_internals_correctIsRegexpLogicJs(exports, module) {
      "use strict";

      var wellKnownSymbol = require_well_known_symbol();
      var MATCH = wellKnownSymbol("match");
      module.exports = function (METHOD_NAME) {
        var regexp = /./;
        try {
          "/./"[METHOD_NAME](regexp);
        } catch (error1) {
          try {
            regexp[MATCH] = false;
            return "/./"[METHOD_NAME](regexp);
          } catch (error2) {}
        }
        return false;
      };
    }
  });

  // node_modules/core-js/modules/es.string.includes.js
  var require_es_string_includes = __commonJS({
    "node_modules/core-js/modules/es.string.includes.js": function node_modules_coreJs_modules_esStringIncludesJs() {
      "use strict";

      var $ = require_export();
      var uncurryThis = require_function_uncurry_this();
      var notARegExp = require_not_a_regexp();
      var requireObjectCoercible = require_require_object_coercible();
      var toString = require_to_string();
      var correctIsRegExpLogic = require_correct_is_regexp_logic();
      var stringIndexOf = uncurryThis("".indexOf);
      $({
        target: "String",
        proto: true,
        forced: !correctIsRegExpLogic("includes")
      }, {
        includes: function includes(searchString) {
          return !!~stringIndexOf(toString(requireObjectCoercible(this)), toString(notARegExp(searchString)), arguments.length > 1 ? arguments[1] : void 0);
        }
      });
    }
  });

  // node_modules/core-js/es/string/includes.js
  var require_includes2 = __commonJS({
    "node_modules/core-js/es/string/includes.js": function node_modules_coreJs_es_string_includesJs(exports, module) {
      "use strict";

      require_es_string_includes();
      var entryUnbind = require_entry_unbind();
      module.exports = entryUnbind("String", "includes");
    }
  });

  // node_modules/core-js/modules/es.string.starts-with.js
  var require_es_string_starts_with = __commonJS({
    "node_modules/core-js/modules/es.string.starts-with.js": function node_modules_coreJs_modules_esStringStartsWithJs() {
      "use strict";

      var $ = require_export();
      var uncurryThis = require_function_uncurry_this_clause();
      var getOwnPropertyDescriptor = require_object_get_own_property_descriptor().f;
      var toLength = require_to_length();
      var toString = require_to_string();
      var notARegExp = require_not_a_regexp();
      var requireObjectCoercible = require_require_object_coercible();
      var correctIsRegExpLogic = require_correct_is_regexp_logic();
      var IS_PURE = require_is_pure();
      var stringSlice = uncurryThis("".slice);
      var min = Math.min;
      var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic("startsWith");
      var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
        var descriptor = getOwnPropertyDescriptor(String.prototype, "startsWith");
        return descriptor && !descriptor.writable;
      }();
      $({
        target: "String",
        proto: true,
        forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC
      }, {
        startsWith: function startsWith(searchString) {
          var that = toString(requireObjectCoercible(this));
          notARegExp(searchString);
          var search = toString(searchString);
          var index = toLength(min(arguments.length > 1 ? arguments[1] : void 0, that.length));
          return stringSlice(that, index, index + search.length) === search;
        }
      });
    }
  });

  // node_modules/core-js/es/string/starts-with.js
  var require_starts_with = __commonJS({
    "node_modules/core-js/es/string/starts-with.js": function node_modules_coreJs_es_string_startsWithJs(exports, module) {
      "use strict";

      require_es_string_starts_with();
      var entryUnbind = require_entry_unbind();
      module.exports = entryUnbind("String", "startsWith");
    }
  });

  // node_modules/core-js/modules/es.string.ends-with.js
  var require_es_string_ends_with = __commonJS({
    "node_modules/core-js/modules/es.string.ends-with.js": function node_modules_coreJs_modules_esStringEndsWithJs() {
      "use strict";

      var $ = require_export();
      var uncurryThis = require_function_uncurry_this_clause();
      var getOwnPropertyDescriptor = require_object_get_own_property_descriptor().f;
      var toLength = require_to_length();
      var toString = require_to_string();
      var notARegExp = require_not_a_regexp();
      var requireObjectCoercible = require_require_object_coercible();
      var correctIsRegExpLogic = require_correct_is_regexp_logic();
      var IS_PURE = require_is_pure();
      var slice = uncurryThis("".slice);
      var min = Math.min;
      var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic("endsWith");
      var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
        var descriptor = getOwnPropertyDescriptor(String.prototype, "endsWith");
        return descriptor && !descriptor.writable;
      }();
      $({
        target: "String",
        proto: true,
        forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC
      }, {
        endsWith: function endsWith(searchString) {
          var that = toString(requireObjectCoercible(this));
          notARegExp(searchString);
          var search = toString(searchString);
          var endPosition = arguments.length > 1 ? arguments[1] : void 0;
          var len = that.length;
          var end = endPosition === void 0 ? len : min(toLength(endPosition), len);
          return slice(that, end - search.length, end) === search;
        }
      });
    }
  });

  // node_modules/core-js/es/string/ends-with.js
  var require_ends_with = __commonJS({
    "node_modules/core-js/es/string/ends-with.js": function node_modules_coreJs_es_string_endsWithJs(exports, module) {
      "use strict";

      require_es_string_ends_with();
      var entryUnbind = require_entry_unbind();
      module.exports = entryUnbind("String", "endsWith");
    }
  });

  // node_modules/core-js/internals/string-repeat.js
  var require_string_repeat = __commonJS({
    "node_modules/core-js/internals/string-repeat.js": function node_modules_coreJs_internals_stringRepeatJs(exports, module) {
      "use strict";

      var toIntegerOrInfinity = require_to_integer_or_infinity();
      var toString = require_to_string();
      var requireObjectCoercible = require_require_object_coercible();
      var $RangeError = RangeError;
      var floor = Math.floor;
      module.exports = function repeat(count) {
        var str = toString(requireObjectCoercible(this));
        var result = "";
        var n = toIntegerOrInfinity(count);
        if (n < 0 || n === Infinity) throw new $RangeError("Wrong number of repetitions");
        for (; n > 0; (n = floor(n / 2)) && (str += str)) if (n % 2) result += str;
        return result;
      };
    }
  });

  // node_modules/core-js/internals/string-pad.js
  var require_string_pad = __commonJS({
    "node_modules/core-js/internals/string-pad.js": function node_modules_coreJs_internals_stringPadJs(exports, module) {
      "use strict";

      var uncurryThis = require_function_uncurry_this();
      var toLength = require_to_length();
      var toString = require_to_string();
      var $repeat = require_string_repeat();
      var requireObjectCoercible = require_require_object_coercible();
      var repeat = uncurryThis($repeat);
      var stringSlice = uncurryThis("".slice);
      var ceil = Math.ceil;
      var createMethod = function createMethod(IS_END) {
        return function ($this, maxLength, fillString) {
          var S = toString(requireObjectCoercible($this));
          var intMaxLength = toLength(maxLength);
          var stringLength = S.length;
          if (intMaxLength <= stringLength) return S;
          var fillStr = fillString === void 0 ? " " : toString(fillString);
          var fillLen, stringFiller;
          if (fillStr === "") return S;
          fillLen = intMaxLength - stringLength;
          stringFiller = repeat(fillStr, ceil(fillLen / fillStr.length));
          if (stringFiller.length > fillLen) stringFiller = stringSlice(stringFiller, 0, fillLen);
          return IS_END ? S + stringFiller : stringFiller + S;
        };
      };
      module.exports = {
        // `String.prototype.padStart` method
        // https://tc39.es/ecma262/#sec-string.prototype.padstart
        start: createMethod(false),
        // `String.prototype.padEnd` method
        // https://tc39.es/ecma262/#sec-string.prototype.padend
        end: createMethod(true)
      };
    }
  });

  // node_modules/core-js/internals/string-pad-webkit-bug.js
  var require_string_pad_webkit_bug = __commonJS({
    "node_modules/core-js/internals/string-pad-webkit-bug.js": function node_modules_coreJs_internals_stringPadWebkitBugJs(exports, module) {
      "use strict";

      var userAgent = require_environment_user_agent();
      module.exports = /Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(userAgent);
    }
  });

  // node_modules/core-js/modules/es.string.pad-start.js
  var require_es_string_pad_start = __commonJS({
    "node_modules/core-js/modules/es.string.pad-start.js": function node_modules_coreJs_modules_esStringPadStartJs() {
      "use strict";

      var $ = require_export();
      var $padStart = require_string_pad().start;
      var WEBKIT_BUG = require_string_pad_webkit_bug();
      $({
        target: "String",
        proto: true,
        forced: WEBKIT_BUG
      }, {
        padStart: function padStart(maxLength) {
          return $padStart(this, maxLength, arguments.length > 1 ? arguments[1] : void 0);
        }
      });
    }
  });

  // node_modules/core-js/es/string/pad-start.js
  var require_pad_start = __commonJS({
    "node_modules/core-js/es/string/pad-start.js": function node_modules_coreJs_es_string_padStartJs(exports, module) {
      "use strict";

      require_es_string_pad_start();
      var entryUnbind = require_entry_unbind();
      module.exports = entryUnbind("String", "padStart");
    }
  });

  // node_modules/core-js/modules/es.string.repeat.js
  var require_es_string_repeat = __commonJS({
    "node_modules/core-js/modules/es.string.repeat.js": function node_modules_coreJs_modules_esStringRepeatJs() {
      "use strict";

      var $ = require_export();
      var repeat = require_string_repeat();
      $({
        target: "String",
        proto: true
      }, {
        repeat: repeat
      });
    }
  });

  // node_modules/core-js/es/string/repeat.js
  var require_repeat = __commonJS({
    "node_modules/core-js/es/string/repeat.js": function node_modules_coreJs_es_string_repeatJs(exports, module) {
      "use strict";

      require_es_string_repeat();
      var entryUnbind = require_entry_unbind();
      module.exports = entryUnbind("String", "repeat");
    }
  });

  // node_modules/core-js/internals/number-is-finite.js
  var require_number_is_finite = __commonJS({
    "node_modules/core-js/internals/number-is-finite.js": function node_modules_coreJs_internals_numberIsFiniteJs(exports, module) {
      "use strict";

      var globalThis2 = require_global_this();
      var globalIsFinite = globalThis2.isFinite;
      module.exports = Number.isFinite || function isFinite2(it) {
        return typeof it == "number" && globalIsFinite(it);
      };
    }
  });

  // node_modules/core-js/modules/es.number.is-finite.js
  var require_es_number_is_finite = __commonJS({
    "node_modules/core-js/modules/es.number.is-finite.js": function node_modules_coreJs_modules_esNumberIsFiniteJs() {
      "use strict";

      var $ = require_export();
      var numberIsFinite = require_number_is_finite();
      $({
        target: "Number",
        stat: true
      }, {
        isFinite: numberIsFinite
      });
    }
  });

  // node_modules/core-js/es/number/is-finite.js
  var require_is_finite = __commonJS({
    "node_modules/core-js/es/number/is-finite.js": function node_modules_coreJs_es_number_isFiniteJs(exports, module) {
      "use strict";

      require_es_number_is_finite();
      var path = require_path();
      module.exports = path.Number.isFinite;
    }
  });

  // node_modules/core-js/modules/es.number.is-nan.js
  var require_es_number_is_nan = __commonJS({
    "node_modules/core-js/modules/es.number.is-nan.js": function node_modules_coreJs_modules_esNumberIsNanJs() {
      "use strict";

      var $ = require_export();
      $({
        target: "Number",
        stat: true
      }, {
        isNaN: function isNaN2(number) {
          return number !== number;
        }
      });
    }
  });

  // node_modules/core-js/es/number/is-nan.js
  var require_is_nan = __commonJS({
    "node_modules/core-js/es/number/is-nan.js": function node_modules_coreJs_es_number_isNanJs(exports, module) {
      "use strict";

      require_es_number_is_nan();
      var path = require_path();
      module.exports = path.Number.isNaN;
    }
  });

  // node_modules/qrcode-generator/qrcode.js
  var require_qrcode = __commonJS({
    "node_modules/qrcode-generator/qrcode.js": function node_modules_qrcodeGenerator_qrcodeJs(exports, module) {
      var qrcode2 = function () {
        var qrcode3 = function qrcode3(typeNumber, errorCorrectionLevel) {
          var PAD0 = 236;
          var PAD1 = 17;
          var _typeNumber = typeNumber;
          var _errorCorrectionLevel = QRErrorCorrectionLevel[errorCorrectionLevel];
          var _modules = null;
          var _moduleCount = 0;
          var _dataCache = null;
          var _dataList = [];
          var _this = {};
          var makeImpl = function makeImpl(test, maskPattern) {
            _moduleCount = _typeNumber * 4 + 17;
            _modules = function (moduleCount) {
              var modules = new Array(moduleCount);
              for (var row = 0; row < moduleCount; row += 1) {
                modules[row] = new Array(moduleCount);
                for (var col = 0; col < moduleCount; col += 1) {
                  modules[row][col] = null;
                }
              }
              return modules;
            }(_moduleCount);
            setupPositionProbePattern(0, 0);
            setupPositionProbePattern(_moduleCount - 7, 0);
            setupPositionProbePattern(0, _moduleCount - 7);
            setupPositionAdjustPattern();
            setupTimingPattern();
            setupTypeInfo(test, maskPattern);
            if (_typeNumber >= 7) {
              setupTypeNumber(test);
            }
            if (_dataCache == null) {
              _dataCache = createData(_typeNumber, _errorCorrectionLevel, _dataList);
            }
            mapData(_dataCache, maskPattern);
          };
          var setupPositionProbePattern = function setupPositionProbePattern(row, col) {
            for (var r = -1; r <= 7; r += 1) {
              if (row + r <= -1 || _moduleCount <= row + r) continue;
              for (var c = -1; c <= 7; c += 1) {
                if (col + c <= -1 || _moduleCount <= col + c) continue;
                if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
                  _modules[row + r][col + c] = true;
                } else {
                  _modules[row + r][col + c] = false;
                }
              }
            }
          };
          var getBestMaskPattern = function getBestMaskPattern() {
            var minLostPoint = 0;
            var pattern = 0;
            for (var i = 0; i < 8; i += 1) {
              makeImpl(true, i);
              var lostPoint = QRUtil.getLostPoint(_this);
              if (i == 0 || minLostPoint > lostPoint) {
                minLostPoint = lostPoint;
                pattern = i;
              }
            }
            return pattern;
          };
          var setupTimingPattern = function setupTimingPattern() {
            for (var r = 8; r < _moduleCount - 8; r += 1) {
              if (_modules[r][6] != null) {
                continue;
              }
              _modules[r][6] = r % 2 == 0;
            }
            for (var c = 8; c < _moduleCount - 8; c += 1) {
              if (_modules[6][c] != null) {
                continue;
              }
              _modules[6][c] = c % 2 == 0;
            }
          };
          var setupPositionAdjustPattern = function setupPositionAdjustPattern() {
            var pos = QRUtil.getPatternPosition(_typeNumber);
            for (var i = 0; i < pos.length; i += 1) {
              for (var j = 0; j < pos.length; j += 1) {
                var row = pos[i];
                var col = pos[j];
                if (_modules[row][col] != null) {
                  continue;
                }
                for (var r = -2; r <= 2; r += 1) {
                  for (var c = -2; c <= 2; c += 1) {
                    if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {
                      _modules[row + r][col + c] = true;
                    } else {
                      _modules[row + r][col + c] = false;
                    }
                  }
                }
              }
            }
          };
          var setupTypeNumber = function setupTypeNumber(test) {
            var bits = QRUtil.getBCHTypeNumber(_typeNumber);
            for (var i = 0; i < 18; i += 1) {
              var mod = !test && (bits >> i & 1) == 1;
              _modules[Math.floor(i / 3)][i % 3 + _moduleCount - 8 - 3] = mod;
            }
            for (var i = 0; i < 18; i += 1) {
              var mod = !test && (bits >> i & 1) == 1;
              _modules[i % 3 + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
            }
          };
          var setupTypeInfo = function setupTypeInfo(test, maskPattern) {
            var data = _errorCorrectionLevel << 3 | maskPattern;
            var bits = QRUtil.getBCHTypeInfo(data);
            for (var i = 0; i < 15; i += 1) {
              var mod = !test && (bits >> i & 1) == 1;
              if (i < 6) {
                _modules[i][8] = mod;
              } else if (i < 8) {
                _modules[i + 1][8] = mod;
              } else {
                _modules[_moduleCount - 15 + i][8] = mod;
              }
            }
            for (var i = 0; i < 15; i += 1) {
              var mod = !test && (bits >> i & 1) == 1;
              if (i < 8) {
                _modules[8][_moduleCount - i - 1] = mod;
              } else if (i < 9) {
                _modules[8][15 - i - 1 + 1] = mod;
              } else {
                _modules[8][15 - i - 1] = mod;
              }
            }
            _modules[_moduleCount - 8][8] = !test;
          };
          var mapData = function mapData(data, maskPattern) {
            var inc = -1;
            var row = _moduleCount - 1;
            var bitIndex = 7;
            var byteIndex = 0;
            var maskFunc = QRUtil.getMaskFunction(maskPattern);
            for (var col = _moduleCount - 1; col > 0; col -= 2) {
              if (col == 6) col -= 1;
              while (true) {
                for (var c = 0; c < 2; c += 1) {
                  if (_modules[row][col - c] == null) {
                    var dark = false;
                    if (byteIndex < data.length) {
                      dark = (data[byteIndex] >>> bitIndex & 1) == 1;
                    }
                    var mask = maskFunc(row, col - c);
                    if (mask) {
                      dark = !dark;
                    }
                    _modules[row][col - c] = dark;
                    bitIndex -= 1;
                    if (bitIndex == -1) {
                      byteIndex += 1;
                      bitIndex = 7;
                    }
                  }
                }
                row += inc;
                if (row < 0 || _moduleCount <= row) {
                  row -= inc;
                  inc = -inc;
                  break;
                }
              }
            }
          };
          var createBytes = function createBytes(buffer2, rsBlocks) {
            var offset = 0;
            var maxDcCount = 0;
            var maxEcCount = 0;
            var dcdata = new Array(rsBlocks.length);
            var ecdata = new Array(rsBlocks.length);
            for (var r = 0; r < rsBlocks.length; r += 1) {
              var dcCount = rsBlocks[r].dataCount;
              var ecCount = rsBlocks[r].totalCount - dcCount;
              maxDcCount = Math.max(maxDcCount, dcCount);
              maxEcCount = Math.max(maxEcCount, ecCount);
              dcdata[r] = new Array(dcCount);
              for (var i = 0; i < dcdata[r].length; i += 1) {
                dcdata[r][i] = 255 & buffer2.getBuffer()[i + offset];
              }
              offset += dcCount;
              var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
              var rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1);
              var modPoly = rawPoly.mod(rsPoly);
              ecdata[r] = new Array(rsPoly.getLength() - 1);
              for (var i = 0; i < ecdata[r].length; i += 1) {
                var modIndex = i + modPoly.getLength() - ecdata[r].length;
                ecdata[r][i] = modIndex >= 0 ? modPoly.getAt(modIndex) : 0;
              }
            }
            var totalCodeCount = 0;
            for (var i = 0; i < rsBlocks.length; i += 1) {
              totalCodeCount += rsBlocks[i].totalCount;
            }
            var data = new Array(totalCodeCount);
            var index = 0;
            for (var i = 0; i < maxDcCount; i += 1) {
              for (var r = 0; r < rsBlocks.length; r += 1) {
                if (i < dcdata[r].length) {
                  data[index] = dcdata[r][i];
                  index += 1;
                }
              }
            }
            for (var i = 0; i < maxEcCount; i += 1) {
              for (var r = 0; r < rsBlocks.length; r += 1) {
                if (i < ecdata[r].length) {
                  data[index] = ecdata[r][i];
                  index += 1;
                }
              }
            }
            return data;
          };
          var createData = function createData(typeNumber2, errorCorrectionLevel2, dataList) {
            var rsBlocks = QRRSBlock.getRSBlocks(typeNumber2, errorCorrectionLevel2);
            var buffer2 = qrBitBuffer();
            for (var i = 0; i < dataList.length; i += 1) {
              var data = dataList[i];
              buffer2.put(data.getMode(), 4);
              buffer2.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber2));
              data.write(buffer2);
            }
            var totalDataCount = 0;
            for (var i = 0; i < rsBlocks.length; i += 1) {
              totalDataCount += rsBlocks[i].dataCount;
            }
            if (buffer2.getLengthInBits() > totalDataCount * 8) {
              throw "code length overflow. (" + buffer2.getLengthInBits() + ">" + totalDataCount * 8 + ")";
            }
            if (buffer2.getLengthInBits() + 4 <= totalDataCount * 8) {
              buffer2.put(0, 4);
            }
            while (buffer2.getLengthInBits() % 8 != 0) {
              buffer2.putBit(false);
            }
            while (true) {
              if (buffer2.getLengthInBits() >= totalDataCount * 8) {
                break;
              }
              buffer2.put(PAD0, 8);
              if (buffer2.getLengthInBits() >= totalDataCount * 8) {
                break;
              }
              buffer2.put(PAD1, 8);
            }
            return createBytes(buffer2, rsBlocks);
          };
          _this.addData = function (data, mode) {
            mode = mode || "Byte";
            var newData = null;
            switch (mode) {
              case "Numeric":
                newData = qrNumber(data);
                break;
              case "Alphanumeric":
                newData = qrAlphaNum(data);
                break;
              case "Byte":
                newData = qr8BitByte(data);
                break;
              case "Kanji":
                newData = qrKanji(data);
                break;
              default:
                throw "mode:" + mode;
            }
            _dataList.push(newData);
            _dataCache = null;
          };
          _this.isDark = function (row, col) {
            if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) {
              throw row + "," + col;
            }
            return _modules[row][col];
          };
          _this.getModuleCount = function () {
            return _moduleCount;
          };
          _this.make = function () {
            if (_typeNumber < 1) {
              var typeNumber2 = 1;
              for (; typeNumber2 < 40; typeNumber2++) {
                var rsBlocks = QRRSBlock.getRSBlocks(typeNumber2, _errorCorrectionLevel);
                var buffer2 = qrBitBuffer();
                for (var i = 0; i < _dataList.length; i++) {
                  var data = _dataList[i];
                  buffer2.put(data.getMode(), 4);
                  buffer2.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber2));
                  data.write(buffer2);
                }
                var totalDataCount = 0;
                for (var i = 0; i < rsBlocks.length; i++) {
                  totalDataCount += rsBlocks[i].dataCount;
                }
                if (buffer2.getLengthInBits() <= totalDataCount * 8) {
                  break;
                }
              }
              _typeNumber = typeNumber2;
            }
            makeImpl(false, getBestMaskPattern());
          };
          _this.createTableTag = function (cellSize, margin) {
            cellSize = cellSize || 2;
            margin = typeof margin == "undefined" ? cellSize * 4 : margin;
            var qrHtml = "";
            qrHtml += '<table style="';
            qrHtml += " border-width: 0px; border-style: none;";
            qrHtml += " border-collapse: collapse;";
            qrHtml += " padding: 0px; margin: " + margin + "px;";
            qrHtml += '">';
            qrHtml += "<tbody>";
            for (var r = 0; r < _this.getModuleCount(); r += 1) {
              qrHtml += "<tr>";
              for (var c = 0; c < _this.getModuleCount(); c += 1) {
                qrHtml += '<td style="';
                qrHtml += " border-width: 0px; border-style: none;";
                qrHtml += " border-collapse: collapse;";
                qrHtml += " padding: 0px; margin: 0px;";
                qrHtml += " width: " + cellSize + "px;";
                qrHtml += " height: " + cellSize + "px;";
                qrHtml += " background-color: ";
                qrHtml += _this.isDark(r, c) ? "#000000" : "#ffffff";
                qrHtml += ";";
                qrHtml += '"/>';
              }
              qrHtml += "</tr>";
            }
            qrHtml += "</tbody>";
            qrHtml += "</table>";
            return qrHtml;
          };
          _this.createSvgTag = function (cellSize, margin, alt, title) {
            var opts = {};
            if (_typeof(arguments[0]) == "object") {
              opts = arguments[0];
              cellSize = opts.cellSize;
              margin = opts.margin;
              alt = opts.alt;
              title = opts.title;
            }
            cellSize = cellSize || 2;
            margin = typeof margin == "undefined" ? cellSize * 4 : margin;
            alt = typeof alt === "string" ? {
              text: alt
            } : alt || {};
            alt.text = alt.text || null;
            alt.id = alt.text ? alt.id || "qrcode-description" : null;
            title = typeof title === "string" ? {
              text: title
            } : title || {};
            title.text = title.text || null;
            title.id = title.text ? title.id || "qrcode-title" : null;
            var size = _this.getModuleCount() * cellSize + margin * 2;
            var c,
              mc,
              r,
              mr,
              qrSvg = "",
              rect;
            rect = "l" + cellSize + ",0 0," + cellSize + " -" + cellSize + ",0 0,-" + cellSize + "z ";
            qrSvg += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"';
            qrSvg += !opts.scalable ? ' width="' + size + 'px" height="' + size + 'px"' : "";
            qrSvg += ' viewBox="0 0 ' + size + " " + size + '" ';
            qrSvg += ' preserveAspectRatio="xMinYMin meet"';
            qrSvg += title.text || alt.text ? ' role="img" aria-labelledby="' + escapeXml([title.id, alt.id].join(" ").trim()) + '"' : "";
            qrSvg += ">";
            qrSvg += title.text ? '<title id="' + escapeXml(title.id) + '">' + escapeXml(title.text) + "</title>" : "";
            qrSvg += alt.text ? '<description id="' + escapeXml(alt.id) + '">' + escapeXml(alt.text) + "</description>" : "";
            qrSvg += '<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>';
            qrSvg += '<path d="';
            for (r = 0; r < _this.getModuleCount(); r += 1) {
              mr = r * cellSize + margin;
              for (c = 0; c < _this.getModuleCount(); c += 1) {
                if (_this.isDark(r, c)) {
                  mc = c * cellSize + margin;
                  qrSvg += "M" + mc + "," + mr + rect;
                }
              }
            }
            qrSvg += '" stroke="transparent" fill="black"/>';
            qrSvg += "</svg>";
            return qrSvg;
          };
          _this.createDataURL = function (cellSize, margin) {
            cellSize = cellSize || 2;
            margin = typeof margin == "undefined" ? cellSize * 4 : margin;
            var size = _this.getModuleCount() * cellSize + margin * 2;
            var min = margin;
            var max = size - margin;
            return createDataURL(size, size, function (x, y) {
              if (min <= x && x < max && min <= y && y < max) {
                var c = Math.floor((x - min) / cellSize);
                var r = Math.floor((y - min) / cellSize);
                return _this.isDark(r, c) ? 0 : 1;
              } else {
                return 1;
              }
            });
          };
          _this.createImgTag = function (cellSize, margin, alt) {
            cellSize = cellSize || 2;
            margin = typeof margin == "undefined" ? cellSize * 4 : margin;
            var size = _this.getModuleCount() * cellSize + margin * 2;
            var img = "";
            img += "<img";
            img += ' src="';
            img += _this.createDataURL(cellSize, margin);
            img += '"';
            img += ' width="';
            img += size;
            img += '"';
            img += ' height="';
            img += size;
            img += '"';
            if (alt) {
              img += ' alt="';
              img += escapeXml(alt);
              img += '"';
            }
            img += "/>";
            return img;
          };
          var escapeXml = function escapeXml(s) {
            var escaped = "";
            for (var i = 0; i < s.length; i += 1) {
              var c = s.charAt(i);
              switch (c) {
                case "<":
                  escaped += "&lt;";
                  break;
                case ">":
                  escaped += "&gt;";
                  break;
                case "&":
                  escaped += "&amp;";
                  break;
                case '"':
                  escaped += "&quot;";
                  break;
                default:
                  escaped += c;
                  break;
              }
            }
            return escaped;
          };
          var _createHalfASCII = function _createHalfASCII(margin) {
            var cellSize = 1;
            margin = typeof margin == "undefined" ? cellSize * 2 : margin;
            var size = _this.getModuleCount() * cellSize + margin * 2;
            var min = margin;
            var max = size - margin;
            var y, x, r1, r2, p;
            var blocks = {
              "██": "█",
              "█ ": "▀",
              " █": "▄",
              "  ": " "
            };
            var blocksLastLineNoMargin = {
              "██": "▀",
              "█ ": "▀",
              " █": " ",
              "  ": " "
            };
            var ascii = "";
            for (y = 0; y < size; y += 2) {
              r1 = Math.floor((y - min) / cellSize);
              r2 = Math.floor((y + 1 - min) / cellSize);
              for (x = 0; x < size; x += 1) {
                p = "█";
                if (min <= x && x < max && min <= y && y < max && _this.isDark(r1, Math.floor((x - min) / cellSize))) {
                  p = " ";
                }
                if (min <= x && x < max && min <= y + 1 && y + 1 < max && _this.isDark(r2, Math.floor((x - min) / cellSize))) {
                  p += " ";
                } else {
                  p += "█";
                }
                ascii += margin < 1 && y + 1 >= max ? blocksLastLineNoMargin[p] : blocks[p];
              }
              ascii += "\n";
            }
            if (size % 2 && margin > 0) {
              return ascii.substring(0, ascii.length - size - 1) + Array(size + 1).join("▀");
            }
            return ascii.substring(0, ascii.length - 1);
          };
          _this.createASCII = function (cellSize, margin) {
            cellSize = cellSize || 1;
            if (cellSize < 2) {
              return _createHalfASCII(margin);
            }
            cellSize -= 1;
            margin = typeof margin == "undefined" ? cellSize * 2 : margin;
            var size = _this.getModuleCount() * cellSize + margin * 2;
            var min = margin;
            var max = size - margin;
            var y, x, r, p;
            var white = Array(cellSize + 1).join("██");
            var black = Array(cellSize + 1).join("  ");
            var ascii = "";
            var line = "";
            for (y = 0; y < size; y += 1) {
              r = Math.floor((y - min) / cellSize);
              line = "";
              for (x = 0; x < size; x += 1) {
                p = 1;
                if (min <= x && x < max && min <= y && y < max && _this.isDark(r, Math.floor((x - min) / cellSize))) {
                  p = 0;
                }
                line += p ? white : black;
              }
              for (r = 0; r < cellSize; r += 1) {
                ascii += line + "\n";
              }
            }
            return ascii.substring(0, ascii.length - 1);
          };
          _this.renderTo2dContext = function (context, cellSize) {
            cellSize = cellSize || 2;
            var length = _this.getModuleCount();
            for (var row = 0; row < length; row++) {
              for (var col = 0; col < length; col++) {
                context.fillStyle = _this.isDark(row, col) ? "black" : "white";
                context.fillRect(row * cellSize, col * cellSize, cellSize, cellSize);
              }
            }
          };
          return _this;
        };
        qrcode3.stringToBytesFuncs = {
          "default": function _default(s) {
            var bytes = [];
            for (var i = 0; i < s.length; i += 1) {
              var c = s.charCodeAt(i);
              bytes.push(c & 255);
            }
            return bytes;
          }
        };
        qrcode3.stringToBytes = qrcode3.stringToBytesFuncs["default"];
        qrcode3.createStringToBytes = function (unicodeData, numChars) {
          var unicodeMap = function () {
            var bin = base64DecodeInputStream(unicodeData);
            var read = function read() {
              var b = bin.read();
              if (b == -1) throw "eof";
              return b;
            };
            var count = 0;
            var unicodeMap2 = {};
            while (true) {
              var b0 = bin.read();
              if (b0 == -1) break;
              var b1 = read();
              var b2 = read();
              var b3 = read();
              var k = String.fromCharCode(b0 << 8 | b1);
              var v = b2 << 8 | b3;
              unicodeMap2[k] = v;
              count += 1;
            }
            if (count != numChars) {
              throw count + " != " + numChars;
            }
            return unicodeMap2;
          }();
          var unknownChar = "?".charCodeAt(0);
          return function (s) {
            var bytes = [];
            for (var i = 0; i < s.length; i += 1) {
              var c = s.charCodeAt(i);
              if (c < 128) {
                bytes.push(c);
              } else {
                var b = unicodeMap[s.charAt(i)];
                if (typeof b == "number") {
                  if ((b & 255) == b) {
                    bytes.push(b);
                  } else {
                    bytes.push(b >>> 8);
                    bytes.push(b & 255);
                  }
                } else {
                  bytes.push(unknownChar);
                }
              }
            }
            return bytes;
          };
        };
        var QRMode = {
          MODE_NUMBER: 1 << 0,
          MODE_ALPHA_NUM: 1 << 1,
          MODE_8BIT_BYTE: 1 << 2,
          MODE_KANJI: 1 << 3
        };
        var QRErrorCorrectionLevel = {
          L: 1,
          M: 0,
          Q: 3,
          H: 2
        };
        var QRMaskPattern = {
          PATTERN000: 0,
          PATTERN001: 1,
          PATTERN010: 2,
          PATTERN011: 3,
          PATTERN100: 4,
          PATTERN101: 5,
          PATTERN110: 6,
          PATTERN111: 7
        };
        var QRUtil = function () {
          var PATTERN_POSITION_TABLE = [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]];
          var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
          var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
          var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
          var _this = {};
          var getBCHDigit = function getBCHDigit(data) {
            var digit = 0;
            while (data != 0) {
              digit += 1;
              data >>>= 1;
            }
            return digit;
          };
          _this.getBCHTypeInfo = function (data) {
            var d = data << 10;
            while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {
              d ^= G15 << getBCHDigit(d) - getBCHDigit(G15);
            }
            return (data << 10 | d) ^ G15_MASK;
          };
          _this.getBCHTypeNumber = function (data) {
            var d = data << 12;
            while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {
              d ^= G18 << getBCHDigit(d) - getBCHDigit(G18);
            }
            return data << 12 | d;
          };
          _this.getPatternPosition = function (typeNumber) {
            return PATTERN_POSITION_TABLE[typeNumber - 1];
          };
          _this.getMaskFunction = function (maskPattern) {
            switch (maskPattern) {
              case QRMaskPattern.PATTERN000:
                return function (i, j) {
                  return (i + j) % 2 == 0;
                };
              case QRMaskPattern.PATTERN001:
                return function (i, j) {
                  return i % 2 == 0;
                };
              case QRMaskPattern.PATTERN010:
                return function (i, j) {
                  return j % 3 == 0;
                };
              case QRMaskPattern.PATTERN011:
                return function (i, j) {
                  return (i + j) % 3 == 0;
                };
              case QRMaskPattern.PATTERN100:
                return function (i, j) {
                  return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
                };
              case QRMaskPattern.PATTERN101:
                return function (i, j) {
                  return i * j % 2 + i * j % 3 == 0;
                };
              case QRMaskPattern.PATTERN110:
                return function (i, j) {
                  return (i * j % 2 + i * j % 3) % 2 == 0;
                };
              case QRMaskPattern.PATTERN111:
                return function (i, j) {
                  return (i * j % 3 + (i + j) % 2) % 2 == 0;
                };
              default:
                throw "bad maskPattern:" + maskPattern;
            }
          };
          _this.getErrorCorrectPolynomial = function (errorCorrectLength) {
            var a = qrPolynomial([1], 0);
            for (var i = 0; i < errorCorrectLength; i += 1) {
              a = a.multiply(qrPolynomial([1, QRMath.gexp(i)], 0));
            }
            return a;
          };
          _this.getLengthInBits = function (mode, type) {
            if (1 <= type && type < 10) {
              switch (mode) {
                case QRMode.MODE_NUMBER:
                  return 10;
                case QRMode.MODE_ALPHA_NUM:
                  return 9;
                case QRMode.MODE_8BIT_BYTE:
                  return 8;
                case QRMode.MODE_KANJI:
                  return 8;
                default:
                  throw "mode:" + mode;
              }
            } else if (type < 27) {
              switch (mode) {
                case QRMode.MODE_NUMBER:
                  return 12;
                case QRMode.MODE_ALPHA_NUM:
                  return 11;
                case QRMode.MODE_8BIT_BYTE:
                  return 16;
                case QRMode.MODE_KANJI:
                  return 10;
                default:
                  throw "mode:" + mode;
              }
            } else if (type < 41) {
              switch (mode) {
                case QRMode.MODE_NUMBER:
                  return 14;
                case QRMode.MODE_ALPHA_NUM:
                  return 13;
                case QRMode.MODE_8BIT_BYTE:
                  return 16;
                case QRMode.MODE_KANJI:
                  return 12;
                default:
                  throw "mode:" + mode;
              }
            } else {
              throw "type:" + type;
            }
          };
          _this.getLostPoint = function (qrcode4) {
            var moduleCount = qrcode4.getModuleCount();
            var lostPoint = 0;
            for (var row = 0; row < moduleCount; row += 1) {
              for (var col = 0; col < moduleCount; col += 1) {
                var sameCount = 0;
                var dark = qrcode4.isDark(row, col);
                for (var r = -1; r <= 1; r += 1) {
                  if (row + r < 0 || moduleCount <= row + r) {
                    continue;
                  }
                  for (var c = -1; c <= 1; c += 1) {
                    if (col + c < 0 || moduleCount <= col + c) {
                      continue;
                    }
                    if (r == 0 && c == 0) {
                      continue;
                    }
                    if (dark == qrcode4.isDark(row + r, col + c)) {
                      sameCount += 1;
                    }
                  }
                }
                if (sameCount > 5) {
                  lostPoint += 3 + sameCount - 5;
                }
              }
            }
            ;
            for (var row = 0; row < moduleCount - 1; row += 1) {
              for (var col = 0; col < moduleCount - 1; col += 1) {
                var count = 0;
                if (qrcode4.isDark(row, col)) count += 1;
                if (qrcode4.isDark(row + 1, col)) count += 1;
                if (qrcode4.isDark(row, col + 1)) count += 1;
                if (qrcode4.isDark(row + 1, col + 1)) count += 1;
                if (count == 0 || count == 4) {
                  lostPoint += 3;
                }
              }
            }
            for (var row = 0; row < moduleCount; row += 1) {
              for (var col = 0; col < moduleCount - 6; col += 1) {
                if (qrcode4.isDark(row, col) && !qrcode4.isDark(row, col + 1) && qrcode4.isDark(row, col + 2) && qrcode4.isDark(row, col + 3) && qrcode4.isDark(row, col + 4) && !qrcode4.isDark(row, col + 5) && qrcode4.isDark(row, col + 6)) {
                  lostPoint += 40;
                }
              }
            }
            for (var col = 0; col < moduleCount; col += 1) {
              for (var row = 0; row < moduleCount - 6; row += 1) {
                if (qrcode4.isDark(row, col) && !qrcode4.isDark(row + 1, col) && qrcode4.isDark(row + 2, col) && qrcode4.isDark(row + 3, col) && qrcode4.isDark(row + 4, col) && !qrcode4.isDark(row + 5, col) && qrcode4.isDark(row + 6, col)) {
                  lostPoint += 40;
                }
              }
            }
            var darkCount = 0;
            for (var col = 0; col < moduleCount; col += 1) {
              for (var row = 0; row < moduleCount; row += 1) {
                if (qrcode4.isDark(row, col)) {
                  darkCount += 1;
                }
              }
            }
            var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
            lostPoint += ratio * 10;
            return lostPoint;
          };
          return _this;
        }();
        var QRMath = function () {
          var EXP_TABLE = new Array(256);
          var LOG_TABLE = new Array(256);
          for (var i = 0; i < 8; i += 1) {
            EXP_TABLE[i] = 1 << i;
          }
          for (var i = 8; i < 256; i += 1) {
            EXP_TABLE[i] = EXP_TABLE[i - 4] ^ EXP_TABLE[i - 5] ^ EXP_TABLE[i - 6] ^ EXP_TABLE[i - 8];
          }
          for (var i = 0; i < 255; i += 1) {
            LOG_TABLE[EXP_TABLE[i]] = i;
          }
          var _this = {};
          _this.glog = function (n) {
            if (n < 1) {
              throw "glog(" + n + ")";
            }
            return LOG_TABLE[n];
          };
          _this.gexp = function (n) {
            while (n < 0) {
              n += 255;
            }
            while (n >= 256) {
              n -= 255;
            }
            return EXP_TABLE[n];
          };
          return _this;
        }();
        function qrPolynomial(num, shift) {
          if (typeof num.length == "undefined") {
            throw num.length + "/" + shift;
          }
          var _num = function () {
            var offset = 0;
            while (offset < num.length && num[offset] == 0) {
              offset += 1;
            }
            var _num2 = new Array(num.length - offset + shift);
            for (var i = 0; i < num.length - offset; i += 1) {
              _num2[i] = num[i + offset];
            }
            return _num2;
          }();
          var _this = {};
          _this.getAt = function (index) {
            return _num[index];
          };
          _this.getLength = function () {
            return _num.length;
          };
          _this.multiply = function (e) {
            var num2 = new Array(_this.getLength() + e.getLength() - 1);
            for (var i = 0; i < _this.getLength(); i += 1) {
              for (var j = 0; j < e.getLength(); j += 1) {
                num2[i + j] ^= QRMath.gexp(QRMath.glog(_this.getAt(i)) + QRMath.glog(e.getAt(j)));
              }
            }
            return qrPolynomial(num2, 0);
          };
          _this.mod = function (e) {
            if (_this.getLength() - e.getLength() < 0) {
              return _this;
            }
            var ratio = QRMath.glog(_this.getAt(0)) - QRMath.glog(e.getAt(0));
            var num2 = new Array(_this.getLength());
            for (var i = 0; i < _this.getLength(); i += 1) {
              num2[i] = _this.getAt(i);
            }
            for (var i = 0; i < e.getLength(); i += 1) {
              num2[i] ^= QRMath.gexp(QRMath.glog(e.getAt(i)) + ratio);
            }
            return qrPolynomial(num2, 0).mod(e);
          };
          return _this;
        }
        ;
        var QRRSBlock = function () {
          var RS_BLOCK_TABLE = [
          // L
          // M
          // Q
          // H
          // 1
          [1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9],
          // 2
          [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16],
          // 3
          [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13],
          // 4
          [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9],
          // 5
          [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12],
          // 6
          [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15],
          // 7
          [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14],
          // 8
          [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15],
          // 9
          [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13],
          // 10
          [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16],
          // 11
          [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13],
          // 12
          [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15],
          // 13
          [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12],
          // 14
          [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13],
          // 15
          [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12, 7, 37, 13],
          // 16
          [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16],
          // 17
          [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15],
          // 18
          [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15],
          // 19
          [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14],
          // 20
          [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16],
          // 21
          [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17],
          // 22
          [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13],
          // 23
          [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16],
          // 24
          [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17],
          // 25
          [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16],
          // 26
          [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17],
          // 27
          [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16],
          // 28
          [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16],
          // 29
          [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16],
          // 30
          [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16],
          // 31
          [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16],
          // 32
          [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16],
          // 33
          [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16],
          // 34
          [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17],
          // 35
          [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16],
          // 36
          [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16],
          // 37
          [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16],
          // 38
          [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16],
          // 39
          [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16],
          // 40
          [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]];
          var qrRSBlock = function qrRSBlock(totalCount, dataCount) {
            var _this2 = {};
            _this2.totalCount = totalCount;
            _this2.dataCount = dataCount;
            return _this2;
          };
          var _this = {};
          var getRsBlockTable = function getRsBlockTable(typeNumber, errorCorrectionLevel) {
            switch (errorCorrectionLevel) {
              case QRErrorCorrectionLevel.L:
                return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
              case QRErrorCorrectionLevel.M:
                return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
              case QRErrorCorrectionLevel.Q:
                return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
              case QRErrorCorrectionLevel.H:
                return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
              default:
                return void 0;
            }
          };
          _this.getRSBlocks = function (typeNumber, errorCorrectionLevel) {
            var rsBlock = getRsBlockTable(typeNumber, errorCorrectionLevel);
            if (typeof rsBlock == "undefined") {
              throw "bad rs block @ typeNumber:" + typeNumber + "/errorCorrectionLevel:" + errorCorrectionLevel;
            }
            var length = rsBlock.length / 3;
            var list2 = [];
            for (var i = 0; i < length; i += 1) {
              var count = rsBlock[i * 3 + 0];
              var totalCount = rsBlock[i * 3 + 1];
              var dataCount = rsBlock[i * 3 + 2];
              for (var j = 0; j < count; j += 1) {
                list2.push(qrRSBlock(totalCount, dataCount));
              }
            }
            return list2;
          };
          return _this;
        }();
        var qrBitBuffer = function qrBitBuffer() {
          var _buffer = [];
          var _length = 0;
          var _this = {};
          _this.getBuffer = function () {
            return _buffer;
          };
          _this.getAt = function (index) {
            var bufIndex = Math.floor(index / 8);
            return (_buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
          };
          _this.put = function (num, length) {
            for (var i = 0; i < length; i += 1) {
              _this.putBit((num >>> length - i - 1 & 1) == 1);
            }
          };
          _this.getLengthInBits = function () {
            return _length;
          };
          _this.putBit = function (bit) {
            var bufIndex = Math.floor(_length / 8);
            if (_buffer.length <= bufIndex) {
              _buffer.push(0);
            }
            if (bit) {
              _buffer[bufIndex] |= 128 >>> _length % 8;
            }
            _length += 1;
          };
          return _this;
        };
        var qrNumber = function qrNumber(data) {
          var _mode = QRMode.MODE_NUMBER;
          var _data = data;
          var _this = {};
          _this.getMode = function () {
            return _mode;
          };
          _this.getLength = function (buffer2) {
            return _data.length;
          };
          _this.write = function (buffer2) {
            var data2 = _data;
            var i = 0;
            while (i + 2 < data2.length) {
              buffer2.put(strToNum(data2.substring(i, i + 3)), 10);
              i += 3;
            }
            if (i < data2.length) {
              if (data2.length - i == 1) {
                buffer2.put(strToNum(data2.substring(i, i + 1)), 4);
              } else if (data2.length - i == 2) {
                buffer2.put(strToNum(data2.substring(i, i + 2)), 7);
              }
            }
          };
          var strToNum = function strToNum(s) {
            var num = 0;
            for (var i = 0; i < s.length; i += 1) {
              num = num * 10 + chatToNum(s.charAt(i));
            }
            return num;
          };
          var chatToNum = function chatToNum(c) {
            if ("0" <= c && c <= "9") {
              return c.charCodeAt(0) - "0".charCodeAt(0);
            }
            throw "illegal char :" + c;
          };
          return _this;
        };
        var qrAlphaNum = function qrAlphaNum(data) {
          var _mode = QRMode.MODE_ALPHA_NUM;
          var _data = data;
          var _this = {};
          _this.getMode = function () {
            return _mode;
          };
          _this.getLength = function (buffer2) {
            return _data.length;
          };
          _this.write = function (buffer2) {
            var s = _data;
            var i = 0;
            while (i + 1 < s.length) {
              buffer2.put(getCode(s.charAt(i)) * 45 + getCode(s.charAt(i + 1)), 11);
              i += 2;
            }
            if (i < s.length) {
              buffer2.put(getCode(s.charAt(i)), 6);
            }
          };
          var getCode = function getCode(c) {
            if ("0" <= c && c <= "9") {
              return c.charCodeAt(0) - "0".charCodeAt(0);
            } else if ("A" <= c && c <= "Z") {
              return c.charCodeAt(0) - "A".charCodeAt(0) + 10;
            } else {
              switch (c) {
                case " ":
                  return 36;
                case "$":
                  return 37;
                case "%":
                  return 38;
                case "*":
                  return 39;
                case "+":
                  return 40;
                case "-":
                  return 41;
                case ".":
                  return 42;
                case "/":
                  return 43;
                case ":":
                  return 44;
                default:
                  throw "illegal char :" + c;
              }
            }
          };
          return _this;
        };
        var qr8BitByte = function qr8BitByte(data) {
          var _mode = QRMode.MODE_8BIT_BYTE;
          var _data = data;
          var _bytes = qrcode3.stringToBytes(data);
          var _this = {};
          _this.getMode = function () {
            return _mode;
          };
          _this.getLength = function (buffer2) {
            return _bytes.length;
          };
          _this.write = function (buffer2) {
            for (var i = 0; i < _bytes.length; i += 1) {
              buffer2.put(_bytes[i], 8);
            }
          };
          return _this;
        };
        var qrKanji = function qrKanji(data) {
          var _mode = QRMode.MODE_KANJI;
          var _data = data;
          var stringToBytes = qrcode3.stringToBytesFuncs["SJIS"];
          if (!stringToBytes) {
            throw "sjis not supported.";
          }
          !function (c, code) {
            var test = stringToBytes(c);
            if (test.length != 2 || (test[0] << 8 | test[1]) != code) {
              throw "sjis not supported.";
            }
          }("友", 38726);
          var _bytes = stringToBytes(data);
          var _this = {};
          _this.getMode = function () {
            return _mode;
          };
          _this.getLength = function (buffer2) {
            return ~~(_bytes.length / 2);
          };
          _this.write = function (buffer2) {
            var data2 = _bytes;
            var i = 0;
            while (i + 1 < data2.length) {
              var c = (255 & data2[i]) << 8 | 255 & data2[i + 1];
              if (33088 <= c && c <= 40956) {
                c -= 33088;
              } else if (57408 <= c && c <= 60351) {
                c -= 49472;
              } else {
                throw "illegal char at " + (i + 1) + "/" + c;
              }
              c = (c >>> 8 & 255) * 192 + (c & 255);
              buffer2.put(c, 13);
              i += 2;
            }
            if (i < data2.length) {
              throw "illegal char at " + (i + 1);
            }
          };
          return _this;
        };
        var byteArrayOutputStream = function byteArrayOutputStream() {
          var _bytes = [];
          var _this = {};
          _this.writeByte = function (b) {
            _bytes.push(b & 255);
          };
          _this.writeShort = function (i) {
            _this.writeByte(i);
            _this.writeByte(i >>> 8);
          };
          _this.writeBytes = function (b, off, len) {
            off = off || 0;
            len = len || b.length;
            for (var i = 0; i < len; i += 1) {
              _this.writeByte(b[i + off]);
            }
          };
          _this.writeString = function (s) {
            for (var i = 0; i < s.length; i += 1) {
              _this.writeByte(s.charCodeAt(i));
            }
          };
          _this.toByteArray = function () {
            return _bytes;
          };
          _this.toString = function () {
            var s = "";
            s += "[";
            for (var i = 0; i < _bytes.length; i += 1) {
              if (i > 0) {
                s += ",";
              }
              s += _bytes[i];
            }
            s += "]";
            return s;
          };
          return _this;
        };
        var base64EncodeOutputStream = function base64EncodeOutputStream() {
          var _buffer = 0;
          var _buflen = 0;
          var _length = 0;
          var _base64 = "";
          var _this = {};
          var writeEncoded = function writeEncoded(b) {
            _base64 += String.fromCharCode(encode(b & 63));
          };
          var encode = function encode(n) {
            if (n < 0) {} else if (n < 26) {
              return 65 + n;
            } else if (n < 52) {
              return 97 + (n - 26);
            } else if (n < 62) {
              return 48 + (n - 52);
            } else if (n == 62) {
              return 43;
            } else if (n == 63) {
              return 47;
            }
            throw "n:" + n;
          };
          _this.writeByte = function (n) {
            _buffer = _buffer << 8 | n & 255;
            _buflen += 8;
            _length += 1;
            while (_buflen >= 6) {
              writeEncoded(_buffer >>> _buflen - 6);
              _buflen -= 6;
            }
          };
          _this.flush = function () {
            if (_buflen > 0) {
              writeEncoded(_buffer << 6 - _buflen);
              _buffer = 0;
              _buflen = 0;
            }
            if (_length % 3 != 0) {
              var padlen = 3 - _length % 3;
              for (var i = 0; i < padlen; i += 1) {
                _base64 += "=";
              }
            }
          };
          _this.toString = function () {
            return _base64;
          };
          return _this;
        };
        var base64DecodeInputStream = function base64DecodeInputStream(str) {
          var _str = str;
          var _pos = 0;
          var _buffer = 0;
          var _buflen = 0;
          var _this = {};
          _this.read = function () {
            while (_buflen < 8) {
              if (_pos >= _str.length) {
                if (_buflen == 0) {
                  return -1;
                }
                throw "unexpected end of file./" + _buflen;
              }
              var c = _str.charAt(_pos);
              _pos += 1;
              if (c == "=") {
                _buflen = 0;
                return -1;
              } else if (c.match(/^\s$/)) {
                continue;
              }
              _buffer = _buffer << 6 | decode(c.charCodeAt(0));
              _buflen += 6;
            }
            var n = _buffer >>> _buflen - 8 & 255;
            _buflen -= 8;
            return n;
          };
          var decode = function decode(c) {
            if (65 <= c && c <= 90) {
              return c - 65;
            } else if (97 <= c && c <= 122) {
              return c - 97 + 26;
            } else if (48 <= c && c <= 57) {
              return c - 48 + 52;
            } else if (c == 43) {
              return 62;
            } else if (c == 47) {
              return 63;
            } else {
              throw "c:" + c;
            }
          };
          return _this;
        };
        var gifImage = function gifImage(width, height) {
          var _width = width;
          var _height = height;
          var _data = new Array(width * height);
          var _this = {};
          _this.setPixel = function (x, y, pixel) {
            _data[y * _width + x] = pixel;
          };
          _this.write = function (out) {
            out.writeString("GIF87a");
            out.writeShort(_width);
            out.writeShort(_height);
            out.writeByte(128);
            out.writeByte(0);
            out.writeByte(0);
            out.writeByte(0);
            out.writeByte(0);
            out.writeByte(0);
            out.writeByte(255);
            out.writeByte(255);
            out.writeByte(255);
            out.writeString(",");
            out.writeShort(0);
            out.writeShort(0);
            out.writeShort(_width);
            out.writeShort(_height);
            out.writeByte(0);
            var lzwMinCodeSize = 2;
            var raster = getLZWRaster(lzwMinCodeSize);
            out.writeByte(lzwMinCodeSize);
            var offset = 0;
            while (raster.length - offset > 255) {
              out.writeByte(255);
              out.writeBytes(raster, offset, 255);
              offset += 255;
            }
            out.writeByte(raster.length - offset);
            out.writeBytes(raster, offset, raster.length - offset);
            out.writeByte(0);
            out.writeString(";");
          };
          var bitOutputStream = function bitOutputStream(out) {
            var _out = out;
            var _bitLength = 0;
            var _bitBuffer = 0;
            var _this2 = {};
            _this2.write = function (data, length) {
              if (data >>> length != 0) {
                throw "length over";
              }
              while (_bitLength + length >= 8) {
                _out.writeByte(255 & (data << _bitLength | _bitBuffer));
                length -= 8 - _bitLength;
                data >>>= 8 - _bitLength;
                _bitBuffer = 0;
                _bitLength = 0;
              }
              _bitBuffer = data << _bitLength | _bitBuffer;
              _bitLength = _bitLength + length;
            };
            _this2.flush = function () {
              if (_bitLength > 0) {
                _out.writeByte(_bitBuffer);
              }
            };
            return _this2;
          };
          var getLZWRaster = function getLZWRaster(lzwMinCodeSize) {
            var clearCode = 1 << lzwMinCodeSize;
            var endCode = (1 << lzwMinCodeSize) + 1;
            var bitLength = lzwMinCodeSize + 1;
            var table = lzwTable();
            for (var i = 0; i < clearCode; i += 1) {
              table.add(String.fromCharCode(i));
            }
            table.add(String.fromCharCode(clearCode));
            table.add(String.fromCharCode(endCode));
            var byteOut = byteArrayOutputStream();
            var bitOut = bitOutputStream(byteOut);
            bitOut.write(clearCode, bitLength);
            var dataIndex = 0;
            var s = String.fromCharCode(_data[dataIndex]);
            dataIndex += 1;
            while (dataIndex < _data.length) {
              var c = String.fromCharCode(_data[dataIndex]);
              dataIndex += 1;
              if (table.contains(s + c)) {
                s = s + c;
              } else {
                bitOut.write(table.indexOf(s), bitLength);
                if (table.size() < 4095) {
                  if (table.size() == 1 << bitLength) {
                    bitLength += 1;
                  }
                  table.add(s + c);
                }
                s = c;
              }
            }
            bitOut.write(table.indexOf(s), bitLength);
            bitOut.write(endCode, bitLength);
            bitOut.flush();
            return byteOut.toByteArray();
          };
          var lzwTable = function lzwTable() {
            var _map = {};
            var _size = 0;
            var _this2 = {};
            _this2.add = function (key) {
              if (_this2.contains(key)) {
                throw "dup key:" + key;
              }
              _map[key] = _size;
              _size += 1;
            };
            _this2.size = function () {
              return _size;
            };
            _this2.indexOf = function (key) {
              return _map[key];
            };
            _this2.contains = function (key) {
              return typeof _map[key] != "undefined";
            };
            return _this2;
          };
          return _this;
        };
        var createDataURL = function createDataURL(width, height, getPixel) {
          var gif = gifImage(width, height);
          for (var y = 0; y < height; y += 1) {
            for (var x = 0; x < width; x += 1) {
              gif.setPixel(x, y, getPixel(x, y));
            }
          }
          var b = byteArrayOutputStream();
          gif.write(b);
          var base64 = base64EncodeOutputStream();
          var bytes = b.toByteArray();
          for (var i = 0; i < bytes.length; i += 1) {
            base64.writeByte(bytes[i]);
          }
          base64.flush();
          return "data:image/gif;base64," + base64;
        };
        return qrcode3;
      }();
      !function () {
        qrcode2.stringToBytesFuncs["UTF-8"] = function (s) {
          function toUTF8Array(str) {
            var utf8 = [];
            for (var i = 0; i < str.length; i++) {
              var charcode = str.charCodeAt(i);
              if (charcode < 128) utf8.push(charcode);else if (charcode < 2048) {
                utf8.push(192 | charcode >> 6, 128 | charcode & 63);
              } else if (charcode < 55296 || charcode >= 57344) {
                utf8.push(224 | charcode >> 12, 128 | charcode >> 6 & 63, 128 | charcode & 63);
              } else {
                i++;
                charcode = 65536 + ((charcode & 1023) << 10 | str.charCodeAt(i) & 1023);
                utf8.push(240 | charcode >> 18, 128 | charcode >> 12 & 63, 128 | charcode >> 6 & 63, 128 | charcode & 63);
              }
            }
            return utf8;
          }
          return toUTF8Array(s);
        };
      }();
      (function (factory) {
        if (typeof define === "function" && define.amd) {
          define([], factory);
        } else if (_typeof(exports) === "object") {
          module.exports = factory();
        }
      })(function () {
        return qrcode2;
      });
    }
  });

  // src/js/polyfills.js
  var import_assign = __toESM(require_assign(), 1);
  var import_entries = __toESM(require_entries(), 1);
  var import_values = __toESM(require_values(), 1);
  var import_from = __toESM(require_from(), 1);
  var import_find = __toESM(require_find(), 1);
  var import_find_index = __toESM(require_find_index(), 1);
  var import_includes = __toESM(require_includes(), 1);
  var import_fill = __toESM(require_fill(), 1);
  var import_includes2 = __toESM(require_includes2(), 1);
  var import_starts_with = __toESM(require_starts_with(), 1);
  var import_ends_with = __toESM(require_ends_with(), 1);
  var import_pad_start = __toESM(require_pad_start(), 1);
  var import_repeat = __toESM(require_repeat(), 1);
  var import_is_finite = __toESM(require_is_finite(), 1);
  var import_is_nan = __toESM(require_is_nan(), 1);
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.webkitMatchesSelector;
  }
  if (!Element.prototype.closest) {
    Element.prototype.closest = function (sel) {
      var el = this;
      while (el && el.nodeType === 1) {
        if (el.matches(sel)) return el;
        el = el.parentNode;
      }
      return null;
    };
  }

  // src/js/lib/log.js
  var remoteUrl = "";
  var buffer = [];
  var flushing = false;
  function redact(text) {
    return text.replace(/((?:realdebrid|alldebrid|premiumize|debridlink|easydebrid|offcloud|torbox|putio|apikey|api_key|token|authKey)(?:=|%3D|:))[A-Za-z0-9._-]{8,}/gi, "$1***");
  }
  function send(level, args) {
    var raw = Array.prototype.map.call(args, function (a) {
      if (a instanceof Error) return a.message + (a.stack ? "\n" + a.stack : "");
      if (_typeof(a) === "object") {
        try {
          return JSON.stringify(a);
        } catch (e) {
          return String(a);
        }
      }
      return String(a);
    }).join(" ");
    var text = redact(raw);
    try {
      (console[level] || console.log).call(console, "[kai] " + text);
    } catch (e) {}
    if (!remoteUrl) return;
    buffer.push({
      t: Date.now(),
      level: level,
      text: text
    });
    if (buffer.length > 200) buffer.shift();
    flush();
  }
  function flush() {
    if (flushing || !buffer.length || !remoteUrl) return;
    flushing = true;
    var batch2 = buffer.splice(0, buffer.length);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", remoteUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.timeout = 5e3;
    xhr.onloadend = function () {
      flushing = false;
      if (buffer.length) setTimeout(flush, 200);
    };
    xhr.send(JSON.stringify(batch2));
  }
  var log = {
    info: function info() {
      send("log", arguments);
    },
    warn: function warn() {
      send("warn", arguments);
    },
    error: function error() {
      send("error", arguments);
    },
    setRemote: function setRemote(url2) {
      remoteUrl = url2 || "";
      flush();
    }
  };
  window.onerror = function (msg, src, line, col, err) {
    log.error("ERRO JS:", msg, (src || "") + ":" + line + ":" + col, err && err.stack ? err.stack : "");
  };

  // src/js/lib/i18n-en.js
  var EN = {
    // Navegação e geral
    "Início": "Home",
    "Buscar": "Search",
    "Biblioteca": "Library",
    "Animes": "Anime",
    "Ajustes": "Settings",
    "Cancelar": "Cancel",
    "Voltar": "Back",
    "Continuar": "Continue",
    "Pular": "Skip",
    "Sair": "Exit",
    "Nada por aqui.": "Nothing here.",
    "Carregando...": "Loading...",
    "Ver tudo": "See all",
    "Novos episódios": "New episodes",
    "Séries da sua biblioteca, últimos 7 dias": "Series in your library, last 7 days",
    "Pessoas": "People",
    "Tema de cores": "Colour theme",
    "Cor de destaque do app": "The app's highlight colour",
    "Dourado": "Gold",
    "Assistir agora": "Play now",
    "A seguir": "Up next",
    "Começa em {n}s": "Starts in {n}s",
    "Ligue uma legenda primeiro.": "Turn on subtitles first.",
    "O ajuste funciona com legendas de addons (OpenSubtitles etc.).": "Sync works with add-on subtitles (OpenSubtitles etc.).",
    "Você já tem a versão mais nova.": "You're on the newest version.",
    "Atualização disponível ({date}): {msg}": "Update available ({date}): {msg}",
    "Atualizar agora": "Update now",
    "Atualizando... o app vai recarregar.": "Updating... the app will reload.",
    "A atualização ainda está chegando. Tente de novo em alguns minutos.": "The update is still on its way. Try again in a few minutes.",
    "Atualizações": "Updates",
    "Versão instalada": "Installed version",
    "Versão mais nova no GitHub": "Newest version on GitHub",
    "Verificando...": "Checking...",
    "nova!": "new!",
    "em dia": "up to date",
    "sem conexão": "no connection",
    "Atualização disponível: Ajustes → Procurar atualização": "Update available: Settings → Check for updates",
    "Descrições em árabe, perfis de atores, calendário de filmes, logos e elenco com fotos (grátis em themoviedb.org)": "Arabic descriptions, actor profiles, movie calendar, logos and cast photos (free at themoviedb.org)",
    "Trailer": "Trailer",
    "Voltar fecha o trailer": "Back closes the trailer",
    "Nascimento: {date}": "Born: {date}",
    "Falecimento: {date}": "Died: {date}",
    "{n} anos": "{n} years old",
    "Local de nascimento: {place}": "Birthplace: {place}",
    "Direção": "Directing",
    "Atuação": "Acting",
    "Sem biografia disponível.": "No biography available.",
    "Filmes e séries": "Movies and series",
    "Esse título ainda não tem página no Stremio.": "This title doesn't have a Stremio page yet.",
    "Não foi possível carregar este perfil.": "Couldn't load this profile.",
    "Controle pelo celular": "Phone remote",
    "O controle pelo celular não está rodando. Feche o app e abra de novo pelo TizenBrew.": "The phone remote isn't running. Close the app and open it again from TizenBrew.",
    "Aponte a câmera do celular para o código": "Point your phone's camera at the code",
    "Ou abra no navegador do celular (mesmo Wi-Fi):": "Or open this in your phone's browser (same Wi-Fi):",
    "PIN: {pin}": "PIN: {pin}",
    "Selecione um campo de texto na TV primeiro.": "Select a text box on the TV first.",
    "Árabe quando houver": "Arabic when available",
    "Calendário": "Calendar",
    "Streaming": "Streaming",
    "As datas de streaming dos filmes vêm do TMDB: coloque sua chave grátis do TMDB em Ajustes.": "Movie streaming dates come from TMDB: add your free TMDB key in Settings.",
    "Nenhum filme chega ao streaming neste dia.": "No movies arrive on streaming this day.",
    "Esse filme ainda não tem página no Stremio.": "This movie doesn't have a Stremio page yet.",
    "Escolha inteligente": "Smart Choice",
    "Assistir já toca a melhor fonte; o botão Fontes mostra a lista": "Watch plays the best source right away; the Sources button shows the list",
    "Escolha inteligente: procurando a melhor fonte...": "Smart Choice: finding the best source...",
    "aperte uma seta para escolher você": "press an arrow to choose yourself",
    "Escolha inteligente: nenhuma fonte que a TV toque. Escolha na lista.": "Smart Choice: no source the TV can play. Pick one from the list.",
    "Essa fonte não tocou. Tentando outra...": "That source didn't play. Trying another...",
    "carregando...": "loading...",
    "Sair do Stremio Kai?": "Exit Stremio Kai?",
    "Desconhecido": "Unknown",
    "Desligado": "Off",
    "Desligada": "Off",
    "Automático": "Automatic",
    // Perfis
    "Perfil": "Profile",
    "Perfis": "Profiles",
    "Perfil atual": "Current profile",
    "Trocar para este perfil": "Switch to this profile",
    "+ Adicionar perfil": "+ Add profile",
    "Adicionar perfil": "Add profile",
    "Com outra conta Stremio (histórico separado)": "With another Stremio account (separate history)",
    "Gerenciar perfis": "Manage profiles",
    "Nome, cor, apagar": "Name, color, delete",
    "Quem está assistindo?": "Who's watching?",
    "Cada perfil tem sua própria conta Stremio, com histórico e biblioteca separados.": "Each profile has its own Stremio account, with separate history and library.",
    "Nome do novo perfil": "New profile name",
    "Criar perfil": "Create profile",
    "Ex.: Ana, Pedro, Sala": "E.g.: Anna, Peter, Living room",
    "Digite um nome para o perfil.": "Type a name for the profile.",
    "Já existe um perfil com esse nome.": "A profile with this name already exists.",
    "Nome do perfil": "Profile name",
    "Nome do perfil salvo": "Profile name saved",
    "Este perfil usa a conta Stremio abaixo": "This profile uses the Stremio account below",
    "Cor do perfil": "Profile color",
    "Roxo": "Purple",
    "Rosa": "Pink",
    "Verde-água": "Teal",
    "Laranja": "Orange",
    "Azul": "Blue",
    "Vermelho": "Red",
    "Verde": "Green",
    "Cinza": "Gray",
    "Trocar de perfil": "Switch profile",
    "{n} perfis nesta TV": "{n} profiles on this TV",
    "Para outra pessoa, com outra conta Stremio": "For someone else, with another Stremio account",
    'Perguntar "Quem está assistindo?" ao abrir': "Ask \"Who's watching?\" on launch",
    "Apagar este perfil": "Delete this profile",
    "Remove deste aparelho a conta e as preferências do perfil (a conta Stremio continua existindo)": "Removes the profile's account and preferences from this TV (the Stremio account itself is kept)",
    'Apagar o perfil "{name}" desta TV?': 'Delete profile "{name}" from this TV?',
    "Apagar": "Delete",
    // Assistente
    "PASSO {n} DE {total}": "STEP {n} OF {total}",
    "Bem-vindo! Quem vai usar este perfil?": "Welcome! Who will use this profile?",
    "Dê um nome ao perfil. Depois você pode criar outros perfis, cada um com a própria conta Stremio e histórico.": "Give this profile a name. Later you can create other profiles, each with its own Stremio account and history.",
    "Bem-vindo ao Stremio Kai": "Welcome to Stremio Kai",
    "Você já está conectado à sua conta Stremio. Seus addons e sua biblioteca já estão aqui.": "You're already signed in to Stremio. Your add-ons and library are here.",
    "Entre com a sua conta Stremio para trazer seus addons (Torrentio, debrid, Anime Kitsu...) e a biblioteca.": "Sign in with your Stremio account to bring your add-ons (Torrentio, debrid, Anime Kitsu...) and library.",
    "Entrar na conta": "Sign in",
    "Servidor de torrents no PC": "Torrent server on a PC",
    "Servidor conectado em {url}. Torrents liberados.": "Server connected at {url}. Torrents enabled.",
    "Para tocar torrents, deixe o stremio-service aberto num PC da rede. Links de debrid funcionam sem ele.": "To play torrents, keep stremio-service running on a PC on your network. Debrid links work without it.",
    "Procurar na rede": "Scan network",
    "Procurando o servidor na rede...": "Scanning the network for the server...",
    "Nenhum servidor encontrado. Você pode configurar depois em Ajustes.": "No server found. You can set it up later in Settings.",
    "Servidor encontrado em {ip}": "Server found at {ip}",
    "Servidor do PC conectado": "PC server connected",
    "Não foi possível procurar. Configure depois em Ajustes.": "Couldn't scan. Set it up later in Settings.",
    "Legendas": "Subtitles",
    "Em qual idioma o app deve ligar a legenda sozinho quando o áudio não for no seu idioma?": "Which subtitle language should turn on automatically when the audio is not in your language?",
    "Português (BR)": "Portuguese (BR)",
    "Inglês": "English",
    "Não ligar sozinho": "Don't turn on automatically",
    // Login
    "Gerando código...": "Generating code...",
    "E-mail": "E-mail",
    "Senha": "Password",
    "Entrar": "Sign in",
    "Entrar com o celular": "Sign in with your phone",
    "No celular ou PC, abra <b>link.stremio.com</b> e digite o código:": "On your phone or PC, open <b>link.stremio.com</b> and enter the code:",
    "Ou com e-mail": "Or with e-mail",
    "Use a mesma conta do Stremio. Seus addons e a biblioteca vêm junto.": "Use your Stremio account. Your add-ons and library come along.",
    "Aguardando confirmação...": "Waiting for confirmation...",
    "Não foi possível gerar o código. Use o e-mail ao lado.": "Couldn't generate a code. Use e-mail instead.",
    "Código expirou. Gerando outro...": "Code expired. Generating a new one...",
    "Preencha e-mail e senha.": "Enter your e-mail and password.",
    "Entrando...": "Signing in...",
    "Falha no login": "Sign-in failed",
    "Conectado à conta Stremio": "Signed in to Stremio",
    // Início, busca, biblioteca, calendário
    "Continuar assistindo": "Continue watching",
    "Carregando catálogos...": "Loading catalogs...",
    "Nenhum catálogo. Entre na sua conta em Ajustes.": "No catalogs. Sign in to your account in Settings.",
    "Erro ao carregar addons: {msg}": "Error loading add-ons: {msg}",
    "Filmes": "Movies",
    "Séries": "Series",
    "Canais": "Channels",
    "Assistir": "Watch",
    "Detalhes": "Details",
    "Buscar filmes e séries...": "Search movies and series...",
    "Digite pelo menos 2 letras e confirme no teclado.": "Type at least 2 letters and confirm on the keyboard.",
    'Buscando "{q}"...': 'Searching "{q}"...',
    "Nenhum addon com busca instalado.": "No add-on with search installed.",
    'Nada encontrado para "{q}".': 'Nothing found for "{q}".',
    "Tudo": "All",
    "Sua biblioteca está vazia.": "Your library is empty.",
    "Entre na sua conta em Ajustes para ver a biblioteca.": "Sign in to your account in Settings to see your library.",
    "Carregando biblioteca...": "Loading library...",
    "Hoje": "Today",
    "Amanhã": "Tomorrow",
    "Ontem": "Yesterday",
    "Domingo": "Sunday",
    "Segunda": "Monday",
    "Terça": "Tuesday",
    "Quarta": "Wednesday",
    "Quinta": "Thursday",
    "Sexta": "Friday",
    "Sábado": "Saturday",
    "Buscando lançamentos...": "Loading releases...",
    "Nenhum episódio neste dia.": "No episodes on this day.",
    "Abrindo {name}...": "Opening {name}...",
    "Esse anime não foi encontrado nos seus addons (instale o Anime Kitsu).": "This anime was not found in your add-ons (install Anime Kitsu).",
    "Não foi possível carregar o calendário: {msg}": "Couldn't load the calendar: {msg}",
    // Detalhes e fontes
    "{n} temporadas": "{n} seasons",
    "{n} temporada": "{n} season",
    "Direção: ": "Director: ",
    "Elenco: ": "Cast: ",
    "Na biblioteca": "In library",
    "Removido da biblioteca": "Removed from library",
    "Adicionado à biblioteca": "Added to library",
    "Episódios": "Episodes",
    "Especiais": "Specials",
    "Temporada {n}": "Season {n}",
    "Episódio {n}": "Episode {n}",
    "Episódio": "Episode",
    "parou em {time}": "stopped at {time}",
    "Fontes": "Sources",
    "Todos": "All",
    "Todos ▾": "All ▾",
    "Buscando fontes nos addons...": "Searching add-ons for sources...",
    "Nenhum addon de streams instalado (ex.: Torrentio). Instale pela sua conta Stremio.": "No stream add-on installed (e.g. Torrentio). Install one in your Stremio account.",
    "Servidor do PC não conectado: só links diretos": "PC server not connected: direct links only",
    "{n} addon(s) ainda carregando": "{n} add-on(s) still loading",
    "{n} fontes": "{n} sources",
    "Mostrar fontes de": "Show sources from",
    "Nenhuma fonte encontrada.": "No sources found.",
    "Não suportado na TV": "Not supported on TV",
    "Torrent · via PC": "Torrent · via PC",
    "Torrent · precisa do PC": "Torrent · needs PC",
    "Direto": "Direct",
    "Esse tipo de fonte não abre na TV.": "This kind of source doesn't open on the TV.",
    "Torrent precisa do stremio-service rodando no PC. Configure em Ajustes.": "Torrents need stremio-service running on a PC. Set it up in Settings.",
    "Continuar de onde parou?": "Resume where you left off?",
    "Continuar de {time}": "Resume from {time}",
    "Começar do início": "Start from the beginning",
    "Não foi possível abrir": "Couldn't open",
    "Detalhes não encontrados": "Details not found",
    "Nenhum addon fornece detalhes para {id}": "No add-on provides details for {id}",
    "Público": "Audience",
    // Player
    "Áudio": "Audio",
    "Próximo": "Next",
    "Tocar": "Play",
    "Pausar": "Pause",
    "Pular abertura": "Skip intro",
    "Pular recapitulação": "Skip recap",
    "Próximo episódio": "Next episode",
    "Pular encerramento": "Skip credits",
    "Abertura pulada": "Intro skipped",
    "Recapitulação pulada": "Recap skipped",
    "Encerramento pulado": "Credits skipped",
    "Termina às {time}": "Ends at {time}",
    "O vídeo parou de carregar": "The video stopped loading",
    "Reabre o vídeo em {time}": "Reopens the video at {time}",
    "Tentar de novo": "Try again",
    "Escolher outra fonte": "Choose another source",
    "Reconectando ao vídeo...": "Reconnecting to the video...",
    "A TV não conseguiu tocar este arquivo diretamente.": "The TV couldn't play this file directly.",
    "A TV não conseguiu tocar este arquivo (formato ou codec não suportado).": "The TV couldn't play this file (unsupported format or codec).",
    "Tente outra fonte (de preferência MP4/MKV com H.264 ou HEVC e áudio AAC/AC3).": "Try another source (preferably MP4/MKV with H.264 or HEVC and AAC/AC3 audio).",
    "Converter no PC (experimental)": "Convert on PC (experimental)",
    "O servidor converte para HLS que a TV aceita": "The server converts to HLS the TV accepts",
    "Problema na reprodução": "Playback problem",
    "Troca de áudio indisponível agora.": "Audio switching unavailable right now.",
    "Falha ao trocar áudio: {msg}": "Failed to switch audio: {msg}",
    "Falha na legenda embutida: {msg}": "Embedded subtitle failed: {msg}",
    "Legenda: {lang}": "Subtitle: {lang}",
    "Não foi possível baixar a legenda.": "Couldn't download the subtitle.",
    "Lendo as faixas do arquivo...": "Reading the file's tracks...",
    "{n} canais": "{n} channels",
    "Só uma faixa de áudio.": "Only one audio track.",
    "Para listar as faixas, conecte o servidor do PC em Ajustes.": "To list tracks, connect the PC server in Settings.",
    "Embutida no arquivo": "Embedded in file",
    "Atraso da legenda: {n}s": "Subtitle delay: {n}s",
    "Ajustar sincronia": "Adjust sync",
    "Tamanho: {n}%": "Size: {n}%",
    "Carregando legendas...": "Loading subtitles...",
    "Nenhuma legenda.": "No subtitles.",
    "Atraso da legenda": "Subtitle delay",
    "Legenda aparece antes": "Subtitle shows earlier",
    "Legenda aparece depois": "Subtitle shows later",
    "Sem ajuste": "No adjustment",
    "Tamanho da legenda": "Subtitle size",
    "Essa fonte precisa do servidor do PC.": "This source needs the PC server.",
    "Procurando o próximo episódio...": "Looking for the next episode...",
    // nomes de idiomas
    "Português": "Portuguese",
    "Espanhol": "Spanish",
    "Japonês": "Japanese",
    "Francês": "French",
    "Alemão": "German",
    "Italiano": "Italian",
    "Coreano": "Korean",
    "Chinês": "Chinese",
    "Russo": "Russian",
    "Árabe": "Arabic",
    "Hindi": "Hindi",
    "Indefinido": "Undefined",
    // Ajustes
    "Automático (idioma da TV)": "Automatic (TV language)",
    "Conta Stremio": "Stremio account",
    "Conectado": "Signed in",
    "Addons e biblioteca sincronizados com a conta": "Add-ons and library synced with the account",
    "conta Stremio": "Stremio account",
    "Atualizar addons e biblioteca": "Refresh add-ons and library",
    "Busca de novo a lista de addons instalados": "Reloads the list of installed add-ons",
    "Atualizado": "Updated",
    "Erro: {msg}": "Error: {msg}",
    "Sair da conta": "Sign out",
    "Sair da conta Stremio?": "Sign out of Stremio?",
    "Traz seus addons (Torrentio, debrid...) e a biblioteca": "Brings your add-ons (Torrentio, debrid...) and library",
    "Servidor de streaming (PC)": "Streaming server (PC)",
    "não configurado": "not set",
    "conectado ✓": "connected ✓",
    "sem resposta": "no response",
    "Servidor conectado": "Server connected",
    "Servidor não respondeu em {url}": "Server did not respond at {url}",
    "Endereço do PC": "PC address",
    "Rode o stremio-service no PC (porta 11470). Status: {s}": "Run stremio-service on the PC (port 11470). Status: {s}",
    "Varre a rede local atrás do servidor": "Scans the local network for the server",
    "Procurando servidor na rede...": "Scanning the network for the server...",
    "Nenhum servidor encontrado. Ele está aberto no PC?": "No server found. Is it running on the PC?",
    "Falha na busca: {msg}": "Scan failed: {msg}",
    "Testar conexão": "Test connection",
    "Servidor OK": "Server OK",
    "Sem resposta de {url}": "No response from {url}",
    "Aparência (Kai)": "Appearance (Kai)",
    "Hero Banner": "Hero Banner",
    "Destaques no topo da tela inicial": "Highlights at the top of the home screen",
    "Fonte do Hero Banner": "Hero Banner source",
    "Cinemeta · Populares": "Cinemeta · Popular",
    "Cinemeta · Mais bem avaliados": "Cinemeta · Top rated",
    "MDBList · Tendências (Snoak)": "MDBList · Trending (Snoak)",
    "Tema OLED (preto puro)": "OLED theme (pure black)",
    "Fundo totalmente preto": "Fully black background",
    "Rolagem animada": "Animated scrolling",
    "Mais bonita, porém mais pesada na TV": "Prettier, but heavier on the TV",
    "Legendas e áudio": "Subtitles and audio",
    "Idioma da legenda": "Subtitle language",
    "Escolhida sozinha ao abrir o vídeo": "Picked automatically when a video opens",
    "Português (BR) e Português": "Portuguese (BR) and Portuguese",
    "Nenhum (não ligar sozinho)": "None (don't turn on automatically)",
    "Ligar legenda automaticamente": "Turn on subtitles automatically",
    "Se o áudio não estiver no seu idioma": "If the audio isn't in your language",
    "Áudio preferido": "Preferred audio",
    "Precisa do servidor do PC para ler as faixas": "Needs the PC server to read tracks",
    "Original do arquivo": "File's original",
    "Português (dublado) quando houver": "Portuguese (dubbed) when available",
    "Inglês quando houver": "English when available",
    "Japonês quando houver": "Japanese when available",
    "Aparência da legenda": "Subtitle appearance",
    "Oi. Meu nome é Peter Parker.": "Hi. My name is Peter Parker.",
    "Você não lembra de mim...": "You don't remember me...",
    "Fonte": "Font",
    "Vale para legendas de addons (OpenSubtitles etc.)": "Applies to add-on subtitles (OpenSubtitles etc.)",
    "Estilo": "Style",
    "Contorno, sombra ou caixa de fundo": "Outline, shadow or background box",
    "Cor do texto": "Text color",
    "Tamanho": "Size",
    "Posição": "Position",
    "Distância da borda de baixo": "Distance from the bottom edge",
    "Negrito": "Bold",
    "O Kai usa negrito": "Kai uses bold",
    "Legendas embutidas no arquivo são desenhadas pela própria TV: só cor, tamanho, posição e caixa se aplicam a elas.": "Subtitles embedded in the file are drawn by the TV itself: only color, size, position and box apply to them.",
    "Nata Sans (padrão Kai)": "Nata Sans (Kai default)",
    "Fonte da TV (LG)": "TV font (LG)",
    "Clássica (Arial)": "Classic (Arial)",
    "Contorno fino + sombra (Kai)": "Thin outline + shadow (Kai)",
    "Contorno grosso": "Thick outline",
    "Só sombra": "Shadow only",
    "Caixa de fundo": "Background box",
    "Branco": "White",
    "Amarelo": "Yellow",
    "Cinza claro": "Light gray",
    "Ciano": "Cyan",
    "Baixa": "Low",
    "Média": "Middle",
    "Alta": "High",
    "Player": "Player",
    "Pular abertura e encerramento": "Skip intros and credits",
    "IntroDB (séries e filmes) e AniSkip (animes)": "IntroDB (series and movies) and AniSkip (anime)",
    'Mostrar botão "Pular"': 'Show "Skip" button',
    "Pular automaticamente": "Skip automatically",
    "Mostrar botão": "Show button",
    "Metadados extras (opcional)": "Extra metadata (optional)",
    "Chave salva": "Key saved",
    "Chave removida": "Key removed",
    "Chave TMDB": "TMDB key",
    "Sinopses e títulos em PT-BR, logos e elenco com fotos (grátis em themoviedb.org)": "Localized synopses and titles, logos and cast photos (free at themoviedb.org)",
    "Chave MDBList": "MDBList key",
    "Notas do Rotten Tomatoes, Metacritic, Trakt e Letterboxd (grátis em mdblist.com)": "Rotten Tomatoes, Metacritic, Trakt and Letterboxd ratings (free at mdblist.com)",
    "Addons": "Add-ons",
    "Addons ativos": "Active add-ons",
    "Gerencie pela sua conta em web.stremio.com": "Manage them in your account at web.stremio.com",
    "Sem conta: Cinemeta, OpenSubtitles e os adicionados aqui": "No account: Cinemeta, OpenSubtitles and the ones added here",
    "{n} addon(s)": "{n} add-on(s)",
    "Instalar {name}": "Install {name}",
    "Catálogos e detalhes de animes (usado pelo calendário)": "Anime catalogs and details (used by the calendar)",
    "Legendas em português para quase tudo": "Subtitles for almost everything",
    "Cole a URL do manifest.json do addon": "Paste the add-on's manifest.json URL",
    "o addon": "the add-on",
    "Addon adicionado": "Add-on added",
    "Adicionar addon por URL": "Add add-on by URL",
    "Instala na sua conta Stremio": "Installs into your Stremio account",
    "Fica só nesta TV": "Stays on this TV only",
    "Entre na conta primeiro": "Sign in first",
    "Instalar {name} na sua conta Stremio?": "Install {name} into your Stremio account?",
    "Instalar": "Install",
    "Instalando...": "Installing...",
    "{name} instalado na sua conta": "{name} installed in your account",
    "Não foi possível instalar: {msg}": "Couldn't install: {msg}",
    "Esse addon já está instalado": "This add-on is already installed",
    "Manifest inválido": "Invalid manifest",
    "Sobre e depuração": "About and debugging",
    "Log remoto": "Remote log",
    "npm run logs no PC": "npm run logs on the PC",
    "Log remoto ligado": "Remote log on",
    "Enviando logs para o PC": "Sending logs to the PC",
    "Log remoto desligado": "Remote log off",
    "Versão": "Version",
    "Procurar atualização": "Check for update",
    "Baixa a versão nova do GitHub ({repo})": "Downloads the new version from GitHub ({repo})",
    "Procurando atualização...": "Checking for update...",
    "Você já está na versão mais nova (v{v}).": "You're on the latest version (v{v}).",
    "Versão {v} disponível": "Version {v} available",
    "Versão {v} disponível: Ajustes → Procurar atualização": "Version {v} available: Settings → Check for update",
    "Como atualizar": "How to update",
    "No PC: webOS Dev Manager → instalar o .ipk da release": "On the PC: webOS Dev Manager → install the release's .ipk",
    "Página da release": "Release page",
    "Instalar a versão {v}? O app vai fechar e reabrir.": "Install version {v}? The app will close and reopen.",
    "Atualizar": "Update",
    "Atualizado! Reabrindo...": "Updated! Reopening...",
    "Não foi possível atualizar: {msg}": "Couldn't update: {msg}",
    "Não foi possível verificar: {msg}": "Couldn't check: {msg}",
    "Baixando": "Downloading",
    "Conferindo o arquivo...": "Verifying the file...",
    "Falha na instalação": "Installation failed",
    "Release sem hash SHA-256": "Release has no SHA-256 hash",
    // Erros de rede e da conta
    "Erro da API Stremio": "Stremio API error",
    "Não foi possível gerar o código": "Couldn't generate the code",
    "Falha de rede em {url}": "Network error at {url}",
    "Tempo esgotado em {url}": "Timed out at {url}",
    "JSON inválido de {url}": "Invalid JSON from {url}",
    "HTTP {code} em {url}": "HTTP {code} at {url}",
    "Este link é torrent: configure o servidor do PC": "This link is a torrent: set up the PC server",
    "Magnet inválido": "Invalid magnet link",
    "Tipo de link não suportado na TV": "Link type not supported on the TV"
  };

  // src/js/lib/i18n-ar.js
  var AR = {
    // Navegação e geral
    "Início": "الرئيسية",
    "Buscar": "بحث",
    "Biblioteca": "المكتبة",
    "Animes": "أنمي",
    "Ajustes": "الإعدادات",
    "Cancelar": "إلغاء",
    "Voltar": "رجوع",
    "Continuar": "متابعة",
    "Pular": "تخطي",
    "Sair": "خروج",
    "Nada por aqui.": "لا يوجد شيء هنا.",
    "Carregando...": "جارٍ التحميل...",
    "Ver tudo": "عرض الكل",
    "Novos episódios": "حلقات جديدة",
    "Séries da sua biblioteca, últimos 7 dias": "مسلسلات مكتبتك، آخر 7 أيام",
    "Pessoas": "الأشخاص",
    "Tema de cores": "سمة الألوان",
    "Cor de destaque do app": "لون التمييز في التطبيق",
    "Dourado": "ذهبي",
    "Assistir agora": "شاهد الآن",
    "A seguir": "التالي",
    "Começa em {n}s": "يبدأ خلال {n} ث",
    "Ligue uma legenda primeiro.": "شغّل الترجمة أولًا.",
    "O ajuste funciona com legendas de addons (OpenSubtitles etc.).": "يعمل الضبط مع ترجمات الإضافات (OpenSubtitles وغيرها).",
    "Você já tem a versão mais nova.": "لديك أحدث إصدار.",
    "Atualização disponível ({date}): {msg}": "يتوفر تحديث ({date}): {msg}",
    "Atualizar agora": "تحديث الآن",
    "Atualizando... o app vai recarregar.": "جارٍ التحديث... سيُعاد تحميل التطبيق.",
    "A atualização ainda está chegando. Tente de novo em alguns minutos.": "التحديث لم يصل بعد. حاول مجددًا بعد بضع دقائق.",
    "Atualizações": "التحديثات",
    "Versão instalada": "الإصدار المثبّت",
    "Versão mais nova no GitHub": "أحدث إصدار على GitHub",
    "Verificando...": "جارٍ التحقق...",
    "nova!": "جديد!",
    "em dia": "محدّث",
    "sem conexão": "لا يوجد اتصال",
    "Atualização disponível: Ajustes → Procurar atualização": "يتوفر تحديث: الإعدادات ← البحث عن تحديث",
    "Descrições em árabe, perfis de atores, calendário de filmes, logos e elenco com fotos (grátis em themoviedb.org)": "الأوصاف بالعربية، ملفات الممثلين، تقويم الأفلام، الشعارات وصور طاقم التمثيل (مجانًا من themoviedb.org)",
    "Trailer": "الإعلان",
    "Voltar fecha o trailer": "زر الرجوع يغلق الإعلان",
    "Nascimento: {date}": "تاريخ الميلاد: {date}",
    "Falecimento: {date}": "تاريخ الوفاة: {date}",
    "{n} anos": "{n} سنة",
    "Local de nascimento: {place}": "مكان الميلاد: {place}",
    "Direção": "الإخراج",
    "Atuação": "التمثيل",
    "Sem biografia disponível.": "لا تتوفر سيرة ذاتية.",
    "Filmes e séries": "الأفلام والمسلسلات",
    "Esse título ainda não tem página no Stremio.": "لا توجد صفحة لهذا العنوان في Stremio بعد.",
    "Não foi possível carregar este perfil.": "تعذّر تحميل هذا الملف الشخصي.",
    "Controle pelo celular": "التحكم بالهاتف",
    "O controle pelo celular não está rodando. Feche o app e abra de novo pelo TizenBrew.": "التحكم بالهاتف لا يعمل. أغلق التطبيق وافتحه مرة أخرى من TizenBrew.",
    "Aponte a câmera do celular para o código": "وجّه كاميرا الهاتف نحو الرمز",
    "Ou abra no navegador do celular (mesmo Wi-Fi):": "أو افتح هذا العنوان في متصفح الهاتف (نفس شبكة Wi-Fi):",
    "PIN: {pin}": "الرمز السري: {pin}",
    "Selecione um campo de texto na TV primeiro.": "اختر حقل نص على التلفاز أولًا.",
    "Árabe quando houver": "العربية عند توفرها",
    "Calendário": "التقويم",
    "Streaming": "البث",
    "As datas de streaming dos filmes vêm do TMDB: coloque sua chave grátis do TMDB em Ajustes.": "مواعيد بث الأفلام مصدرها TMDB: أضف مفتاح TMDB المجاني في الإعدادات.",
    "Nenhum filme chega ao streaming neste dia.": "لا توجد أفلام تصل إلى البث في هذا اليوم.",
    "Esse filme ainda não tem página no Stremio.": "هذا الفيلم ليست له صفحة على Stremio بعد.",
    "Escolha inteligente": "الاختيار الذكي",
    "Assistir já toca a melhor fonte; o botão Fontes mostra a lista": "زر مشاهدة يشغّل أفضل مصدر فورًا؛ وزر المصادر يعرض القائمة",
    "Escolha inteligente: procurando a melhor fonte...": "الاختيار الذكي: جارٍ البحث عن أفضل مصدر...",
    "aperte uma seta para escolher você": "اضغط سهمًا لتختار بنفسك",
    "Escolha inteligente: nenhuma fonte que a TV toque. Escolha na lista.": "الاختيار الذكي: لا يوجد مصدر يمكن للتلفاز تشغيله. اختر من القائمة.",
    "Essa fonte não tocou. Tentando outra...": "تعذّر تشغيل هذا المصدر. جارٍ تجربة مصدر آخر...",
    "carregando...": "جارٍ التحميل...",
    "Sair do Stremio Kai?": "الخروج من Stremio Kai؟",
    "Desconhecido": "غير معروف",
    "Desligado": "إيقاف",
    "Desligada": "إيقاف",
    "Automático": "تلقائي",
    // Perfis
    "Perfil": "الملف الشخصي",
    "Perfis": "الملفات الشخصية",
    "Perfil atual": "الملف الحالي",
    "Trocar para este perfil": "التبديل إلى هذا الملف",
    "+ Adicionar perfil": "+ إضافة ملف",
    "Adicionar perfil": "إضافة ملف",
    "Com outra conta Stremio (histórico separado)": "بحساب Stremio آخر (سجل منفصل)",
    "Gerenciar perfis": "إدارة الملفات",
    "Nome, cor, apagar": "الاسم، اللون، الحذف",
    "Quem está assistindo?": "من يشاهد؟",
    "Cada perfil tem sua própria conta Stremio, com histórico e biblioteca separados.": "لكل ملف حساب Stremio خاص به، مع سجل ومكتبة منفصلين.",
    "Nome do novo perfil": "اسم الملف الجديد",
    "Criar perfil": "إنشاء ملف",
    "Ex.: Ana, Pedro, Sala": "مثال: أحمد، سارة، غرفة المعيشة",
    "Digite um nome para o perfil.": "اكتب اسمًا للملف.",
    "Já existe um perfil com esse nome.": "يوجد ملف بهذا الاسم بالفعل.",
    "Nome do perfil": "اسم الملف",
    "Nome do perfil salvo": "تم حفظ اسم الملف",
    "Este perfil usa a conta Stremio abaixo": "يستخدم هذا الملف حساب Stremio أدناه",
    "Cor do perfil": "لون الملف",
    "Roxo": "بنفسجي",
    "Rosa": "وردي",
    "Verde-água": "أزرق مخضر",
    "Laranja": "برتقالي",
    "Azul": "أزرق",
    "Vermelho": "أحمر",
    "Verde": "أخضر",
    "Cinza": "رمادي",
    "Trocar de perfil": "تبديل الملف",
    "{n} perfis nesta TV": "{n} ملفات على هذا التلفاز",
    "Para outra pessoa, com outra conta Stremio": "لشخص آخر، بحساب Stremio آخر",
    'Perguntar "Quem está assistindo?" ao abrir': 'السؤال "من يشاهد؟" عند التشغيل',
    "Apagar este perfil": "حذف هذا الملف",
    "Remove deste aparelho a conta e as preferências do perfil (a conta Stremio continua existindo)": "يزيل حساب الملف وتفضيلاته من هذا التلفاز (يبقى حساب Stremio نفسه)",
    'Apagar o perfil "{name}" desta TV?': 'حذف الملف "{name}" من هذا التلفاز؟',
    "Apagar": "حذف",
    // Assistente
    "PASSO {n} DE {total}": "الخطوة {n} من {total}",
    "Bem-vindo! Quem vai usar este perfil?": "مرحبًا! من سيستخدم هذا الملف؟",
    "Dê um nome ao perfil. Depois você pode criar outros perfis, cada um com a própria conta Stremio e histórico.": "اختر اسمًا لهذا الملف. لاحقًا يمكنك إنشاء ملفات أخرى، لكل منها حساب Stremio وسجل خاص به.",
    "Bem-vindo ao Stremio Kai": "مرحبًا بك في Stremio Kai",
    "Você já está conectado à sua conta Stremio. Seus addons e sua biblioteca já estão aqui.": "أنت مسجّل الدخول إلى Stremio بالفعل. إضافاتك ومكتبتك موجودة هنا.",
    "Entre com a sua conta Stremio para trazer seus addons (Torrentio, debrid, Anime Kitsu...) e a biblioteca.": "سجّل الدخول بحساب Stremio لجلب إضافاتك (Torrentio، debrid، Anime Kitsu...) ومكتبتك.",
    "Entrar na conta": "تسجيل الدخول",
    "Servidor de torrents no PC": "خادم التورنت على الكمبيوتر",
    "Servidor conectado em {url}. Torrents liberados.": "الخادم متصل على {url}. تم تفعيل التورنت.",
    "Para tocar torrents, deixe o stremio-service aberto num PC da rede. Links de debrid funcionam sem ele.": "لتشغيل التورنت، أبقِ stremio-service يعمل على كمبيوتر في شبكتك. روابط debrid تعمل بدونه.",
    "Procurar na rede": "البحث في الشبكة",
    "Procurando o servidor na rede...": "جارٍ البحث عن الخادم في الشبكة...",
    "Nenhum servidor encontrado. Você pode configurar depois em Ajustes.": "لم يُعثر على خادم. يمكنك إعداده لاحقًا من الإعدادات.",
    "Servidor encontrado em {ip}": "تم العثور على الخادم على {ip}",
    "Servidor do PC conectado": "خادم الكمبيوتر متصل",
    "Não foi possível procurar. Configure depois em Ajustes.": "تعذّر البحث. أعدّه لاحقًا من الإعدادات.",
    "Legendas": "الترجمة",
    "Em qual idioma o app deve ligar a legenda sozinho quando o áudio não for no seu idioma?": "ما لغة الترجمة التي تُفعَّل تلقائيًا عندما لا يكون الصوت بلغتك؟",
    "Português (BR)": "البرتغالية (البرازيل)",
    "Inglês": "الإنجليزية",
    "Não ligar sozinho": "عدم التفعيل تلقائيًا",
    // Login
    "Gerando código...": "جارٍ إنشاء الرمز...",
    "E-mail": "البريد الإلكتروني",
    "Senha": "كلمة المرور",
    "Entrar": "تسجيل الدخول",
    "Entrar com o celular": "تسجيل الدخول بالهاتف",
    "No celular ou PC, abra <b>link.stremio.com</b> e digite o código:": "على هاتفك أو الكمبيوتر، افتح <b>link.stremio.com</b> وأدخل الرمز:",
    "Ou com e-mail": "أو بالبريد الإلكتروني",
    "Use a mesma conta do Stremio. Seus addons e a biblioteca vêm junto.": "استخدم حساب Stremio الخاص بك. ستأتي إضافاتك ومكتبتك معه.",
    "Aguardando confirmação...": "في انتظار التأكيد...",
    "Não foi possível gerar o código. Use o e-mail ao lado.": "تعذّر إنشاء الرمز. استخدم البريد الإلكتروني بدلًا من ذلك.",
    "Código expirou. Gerando outro...": "انتهت صلاحية الرمز. جارٍ إنشاء رمز جديد...",
    "Preencha e-mail e senha.": "أدخل البريد الإلكتروني وكلمة المرور.",
    "Entrando...": "جارٍ تسجيل الدخول...",
    "Falha no login": "فشل تسجيل الدخول",
    "Conectado à conta Stremio": "تم تسجيل الدخول إلى Stremio",
    // Início, busca, biblioteca, calendário
    "Continuar assistindo": "متابعة المشاهدة",
    "Carregando catálogos...": "جارٍ تحميل الكتالوجات...",
    "Nenhum catálogo. Entre na sua conta em Ajustes.": "لا توجد كتالوجات. سجّل الدخول إلى حسابك من الإعدادات.",
    "Erro ao carregar addons: {msg}": "خطأ في تحميل الإضافات: {msg}",
    "Filmes": "أفلام",
    "Séries": "مسلسلات",
    "Canais": "القنوات",
    "Assistir": "مشاهدة",
    "Detalhes": "التفاصيل",
    "Buscar filmes e séries...": "ابحث عن أفلام ومسلسلات...",
    "Digite pelo menos 2 letras e confirme no teclado.": "اكتب حرفين على الأقل وأكّد من لوحة المفاتيح.",
    'Buscando "{q}"...': 'جارٍ البحث عن "{q}"...',
    "Nenhum addon com busca instalado.": "لا توجد إضافة بحث مثبّتة.",
    'Nada encontrado para "{q}".': 'لا توجد نتائج لـ "{q}".',
    "Tudo": "الكل",
    "Sua biblioteca está vazia.": "مكتبتك فارغة.",
    "Entre na sua conta em Ajustes para ver a biblioteca.": "سجّل الدخول إلى حسابك من الإعدادات لعرض مكتبتك.",
    "Carregando biblioteca...": "جارٍ تحميل المكتبة...",
    "Hoje": "اليوم",
    "Amanhã": "غدًا",
    "Ontem": "أمس",
    "Domingo": "الأحد",
    "Segunda": "الاثنين",
    "Terça": "الثلاثاء",
    "Quarta": "الأربعاء",
    "Quinta": "الخميس",
    "Sexta": "الجمعة",
    "Sábado": "السبت",
    "Buscando lançamentos...": "جارٍ تحميل الإصدارات...",
    "Nenhum episódio neste dia.": "لا توجد حلقات في هذا اليوم.",
    "Abrindo {name}...": "جارٍ فتح {name}...",
    "Esse anime não foi encontrado nos seus addons (instale o Anime Kitsu).": "لم يُعثر على هذا الأنمي في إضافاتك (ثبّت Anime Kitsu).",
    "Não foi possível carregar o calendário: {msg}": "تعذّر تحميل التقويم: {msg}",
    // Detalhes e fontes
    "{n} temporadas": "{n} مواسم",
    "{n} temporada": "{n} موسم",
    "Direção: ": "الإخراج: ",
    "Elenco: ": "الممثلون: ",
    "Na biblioteca": "في المكتبة",
    "Removido da biblioteca": "أُزيل من المكتبة",
    "Adicionado à biblioteca": "أُضيف إلى المكتبة",
    "Episódios": "الحلقات",
    "Especiais": "حلقات خاصة",
    "Temporada {n}": "الموسم {n}",
    "Episódio {n}": "الحلقة {n}",
    "Episódio": "الحلقة",
    "parou em {time}": "توقف عند {time}",
    "Fontes": "المصادر",
    "Todos": "الكل",
    "Todos ▾": "الكل ▾",
    "Buscando fontes nos addons...": "جارٍ البحث عن مصادر في الإضافات...",
    "Nenhum addon de streams instalado (ex.: Torrentio). Instale pela sua conta Stremio.": "لا توجد إضافة بث مثبّتة (مثل Torrentio). ثبّت واحدة من حساب Stremio.",
    "Servidor do PC não conectado: só links diretos": "خادم الكمبيوتر غير متصل: الروابط المباشرة فقط",
    "{n} addon(s) ainda carregando": "{n} إضافة لا تزال قيد التحميل",
    "{n} fontes": "{n} مصادر",
    "Mostrar fontes de": "عرض المصادر من",
    "Nenhuma fonte encontrada.": "لم يُعثر على مصادر.",
    "Não suportado na TV": "غير مدعوم على التلفاز",
    "Torrent · via PC": "تورنت · عبر الكمبيوتر",
    "Torrent · precisa do PC": "تورنت · يحتاج الكمبيوتر",
    "Direto": "مباشر",
    "Esse tipo de fonte não abre na TV.": "هذا النوع من المصادر لا يعمل على التلفاز.",
    "Torrent precisa do stremio-service rodando no PC. Configure em Ajustes.": "التورنت يحتاج إلى تشغيل stremio-service على الكمبيوتر. أعدّه من الإعدادات.",
    "Continuar de onde parou?": "المتابعة من حيث توقفت؟",
    "Continuar de {time}": "المتابعة من {time}",
    "Começar do início": "البدء من البداية",
    "Não foi possível abrir": "تعذّر الفتح",
    "Detalhes não encontrados": "لم يُعثر على التفاصيل",
    "Nenhum addon fornece detalhes para {id}": "لا توجد إضافة توفّر تفاصيل لـ {id}",
    "Público": "الجمهور",
    // Player
    "Áudio": "الصوت",
    "Próximo": "التالي",
    "Tocar": "تشغيل",
    "Pausar": "إيقاف مؤقت",
    "Pular abertura": "تخطي المقدمة",
    "Pular recapitulação": "تخطي الملخص",
    "Próximo episódio": "الحلقة التالية",
    "Pular encerramento": "تخطي الخاتمة",
    "Abertura pulada": "تم تخطي المقدمة",
    "Recapitulação pulada": "تم تخطي الملخص",
    "Encerramento pulado": "تم تخطي الخاتمة",
    "Termina às {time}": "ينتهي في {time}",
    "O vídeo parou de carregar": "توقف تحميل الفيديو",
    "Reabre o vídeo em {time}": "يعيد فتح الفيديو عند {time}",
    "Tentar de novo": "إعادة المحاولة",
    "Escolher outra fonte": "اختيار مصدر آخر",
    "Reconectando ao vídeo...": "جارٍ إعادة الاتصال بالفيديو...",
    "A TV não conseguiu tocar este arquivo diretamente.": "تعذّر على التلفاز تشغيل هذا الملف مباشرة.",
    "A TV não conseguiu tocar este arquivo (formato ou codec não suportado).": "تعذّر على التلفاز تشغيل هذا الملف (صيغة أو ترميز غير مدعوم).",
    "Tente outra fonte (de preferência MP4/MKV com H.264 ou HEVC e áudio AAC/AC3).": "جرّب مصدرًا آخر (ويُفضَّل MP4/MKV بترميز H.264 أو HEVC وصوت AAC/AC3).",
    "Converter no PC (experimental)": "التحويل على الكمبيوتر (تجريبي)",
    "O servidor converte para HLS que a TV aceita": "يحوّل الخادم الفيديو إلى HLS الذي يقبله التلفاز",
    "Problema na reprodução": "مشكلة في التشغيل",
    "Troca de áudio indisponível agora.": "تبديل الصوت غير متاح الآن.",
    "Falha ao trocar áudio: {msg}": "فشل تبديل الصوت: {msg}",
    "Falha na legenda embutida: {msg}": "فشل الترجمة المدمجة: {msg}",
    "Legenda: {lang}": "الترجمة: {lang}",
    "Não foi possível baixar a legenda.": "تعذّر تنزيل الترجمة.",
    "Lendo as faixas do arquivo...": "جارٍ قراءة مسارات الملف...",
    "{n} canais": "{n} قنوات",
    "Só uma faixa de áudio.": "مسار صوتي واحد فقط.",
    "Para listar as faixas, conecte o servidor do PC em Ajustes.": "لعرض المسارات، اربط خادم الكمبيوتر من الإعدادات.",
    "Embutida no arquivo": "مدمجة في الملف",
    "Atraso da legenda: {n}s": "تأخير الترجمة: {n} ث",
    "Ajustar sincronia": "ضبط المزامنة",
    "Tamanho: {n}%": "الحجم: {n}%",
    "Carregando legendas...": "جارٍ تحميل الترجمات...",
    "Nenhuma legenda.": "لا توجد ترجمات.",
    "Atraso da legenda": "تأخير الترجمة",
    "Legenda aparece antes": "تظهر الترجمة أبكر",
    "Legenda aparece depois": "تظهر الترجمة لاحقًا",
    "Sem ajuste": "بدون ضبط",
    "Tamanho da legenda": "حجم الترجمة",
    "Essa fonte precisa do servidor do PC.": "هذا المصدر يحتاج إلى خادم الكمبيوتر.",
    "Procurando o próximo episódio...": "جارٍ البحث عن الحلقة التالية...",
    // nomes de idiomas
    "Português": "البرتغالية",
    "Espanhol": "الإسبانية",
    "Japonês": "اليابانية",
    "Francês": "الفرنسية",
    "Alemão": "الألمانية",
    "Italiano": "الإيطالية",
    "Coreano": "الكورية",
    "Chinês": "الصينية",
    "Russo": "الروسية",
    "Árabe": "العربية",
    "Hindi": "الهندية",
    "Indefinido": "غير محدد",
    // Ajustes
    "Automático (idioma da TV)": "تلقائي (لغة التلفاز)",
    "Conta Stremio": "حساب Stremio",
    "Conectado": "تم تسجيل الدخول",
    "Addons e biblioteca sincronizados com a conta": "الإضافات والمكتبة متزامنة مع الحساب",
    "conta Stremio": "حساب Stremio",
    "Atualizar addons e biblioteca": "تحديث الإضافات والمكتبة",
    "Busca de novo a lista de addons instalados": "يعيد تحميل قائمة الإضافات المثبّتة",
    "Atualizado": "تم التحديث",
    "Erro: {msg}": "خطأ: {msg}",
    "Sair da conta": "تسجيل الخروج",
    "Sair da conta Stremio?": "تسجيل الخروج من Stremio؟",
    "Traz seus addons (Torrentio, debrid...) e a biblioteca": "يجلب إضافاتك (Torrentio، debrid...) ومكتبتك",
    "Servidor de streaming (PC)": "خادم البث (الكمبيوتر)",
    "não configurado": "غير مُعدّ",
    "conectado ✓": "متصل ✓",
    "sem resposta": "لا استجابة",
    "Servidor conectado": "الخادم متصل",
    "Servidor não respondeu em {url}": "لم يستجب الخادم على {url}",
    "Endereço do PC": "عنوان الكمبيوتر",
    "Rode o stremio-service no PC (porta 11470). Status: {s}": "شغّل stremio-service على الكمبيوتر (المنفذ 11470). الحالة: {s}",
    "Varre a rede local atrás do servidor": "يفحص الشبكة المحلية بحثًا عن الخادم",
    "Procurando servidor na rede...": "جارٍ البحث عن الخادم في الشبكة...",
    "Nenhum servidor encontrado. Ele está aberto no PC?": "لم يُعثر على خادم. هل هو قيد التشغيل على الكمبيوتر؟",
    "Falha na busca: {msg}": "فشل البحث: {msg}",
    "Testar conexão": "اختبار الاتصال",
    "Servidor OK": "الخادم يعمل",
    "Sem resposta de {url}": "لا استجابة من {url}",
    "Aparência (Kai)": "المظهر (Kai)",
    "Hero Banner": "البانر الرئيسي",
    "Destaques no topo da tela inicial": "أبرز العناوين أعلى الشاشة الرئيسية",
    "Fonte do Hero Banner": "مصدر البانر الرئيسي",
    "Cinemeta · Populares": "Cinemeta · الأكثر شعبية",
    "Cinemeta · Mais bem avaliados": "Cinemeta · الأعلى تقييمًا",
    "MDBList · Tendências (Snoak)": "MDBList · الرائج (Snoak)",
    "Tema OLED (preto puro)": "سمة OLED (أسود خالص)",
    "Fundo totalmente preto": "خلفية سوداء بالكامل",
    "Rolagem animada": "تمرير متحرك",
    "Mais bonita, porém mais pesada na TV": "أجمل، لكنها أثقل على التلفاز",
    "Legendas e áudio": "الترجمة والصوت",
    "Idioma da legenda": "لغة الترجمة",
    "Escolhida sozinha ao abrir o vídeo": "تُختار تلقائيًا عند فتح الفيديو",
    "Português (BR) e Português": "البرتغالية (البرازيل) والبرتغالية",
    "Nenhum (não ligar sozinho)": "بدون (عدم التفعيل تلقائيًا)",
    "Ligar legenda automaticamente": "تفعيل الترجمة تلقائيًا",
    "Se o áudio não estiver no seu idioma": "إذا لم يكن الصوت بلغتك",
    "Áudio preferido": "الصوت المفضّل",
    "Precisa do servidor do PC para ler as faixas": "يحتاج إلى خادم الكمبيوتر لقراءة المسارات",
    "Original do arquivo": "الأصلي في الملف",
    "Português (dublado) quando houver": "البرتغالية (مدبلج) عند توفرها",
    "Inglês quando houver": "الإنجليزية عند توفرها",
    "Japonês quando houver": "اليابانية عند توفرها",
    "Aparência da legenda": "مظهر الترجمة",
    "Oi. Meu nome é Peter Parker.": "مرحبًا. اسمي بيتر باركر.",
    "Você não lembra de mim...": "أنت لا تتذكرني...",
    "Fonte": "الخط",
    "Vale para legendas de addons (OpenSubtitles etc.)": "ينطبق على ترجمات الإضافات (OpenSubtitles وغيرها)",
    "Estilo": "النمط",
    "Contorno, sombra ou caixa de fundo": "إطار، ظل أو صندوق خلفية",
    "Cor do texto": "لون النص",
    "Tamanho": "الحجم",
    "Posição": "الموضع",
    "Distância da borda de baixo": "المسافة من الحافة السفلية",
    "Negrito": "عريض",
    "O Kai usa negrito": "يستخدم Kai الخط العريض",
    "Legendas embutidas no arquivo são desenhadas pela própria TV: só cor, tamanho, posição e caixa se aplicam a elas.": "الترجمات المدمجة في الملف يرسمها التلفاز نفسه: لا ينطبق عليها إلا اللون والحجم والموضع والصندوق.",
    "Nata Sans (padrão Kai)": "Nata Sans (افتراضي Kai)",
    "Fonte da TV (LG)": "خط التلفاز (LG)",
    "Clássica (Arial)": "كلاسيكي (Arial)",
    "Contorno fino + sombra (Kai)": "إطار رفيع + ظل (Kai)",
    "Contorno grosso": "إطار سميك",
    "Só sombra": "ظل فقط",
    "Caixa de fundo": "صندوق خلفية",
    "Branco": "أبيض",
    "Amarelo": "أصفر",
    "Cinza claro": "رمادي فاتح",
    "Ciano": "سماوي",
    "Baixa": "منخفض",
    "Média": "متوسط",
    "Alta": "مرتفع",
    "Player": "المشغّل",
    "Pular abertura e encerramento": "تخطي المقدمة والخاتمة",
    "IntroDB (séries e filmes) e AniSkip (animes)": "IntroDB (المسلسلات والأفلام) وAniSkip (الأنمي)",
    'Mostrar botão "Pular"': 'إظهار زر "تخطي"',
    "Pular automaticamente": "التخطي تلقائيًا",
    "Mostrar botão": "إظهار الزر",
    "Metadados extras (opcional)": "بيانات وصفية إضافية (اختياري)",
    "Chave salva": "تم حفظ المفتاح",
    "Chave removida": "تمت إزالة المفتاح",
    "Chave TMDB": "مفتاح TMDB",
    "Sinopses e títulos em PT-BR, logos e elenco com fotos (grátis em themoviedb.org)": "ملخصات وعناوين مترجمة، وشعارات، وصور الممثلين (مجانًا على themoviedb.org)",
    "Chave MDBList": "مفتاح MDBList",
    "Notas do Rotten Tomatoes, Metacritic, Trakt e Letterboxd (grátis em mdblist.com)": "تقييمات Rotten Tomatoes وMetacritic وTrakt وLetterboxd (مجانًا على mdblist.com)",
    "Addons": "الإضافات",
    "Addons ativos": "الإضافات النشطة",
    "Gerencie pela sua conta em web.stremio.com": "أدِرها من حسابك على web.stremio.com",
    "Sem conta: Cinemeta, OpenSubtitles e os adicionados aqui": "بدون حساب: Cinemeta وOpenSubtitles والإضافات المضافة هنا",
    "{n} addon(s)": "{n} إضافة",
    "Instalar {name}": "تثبيت {name}",
    "Catálogos e detalhes de animes (usado pelo calendário)": "كتالوجات وتفاصيل الأنمي (يستخدمها التقويم)",
    "Legendas em português para quase tudo": "ترجمات لكل شيء تقريبًا",
    "Cole a URL do manifest.json do addon": "الصق رابط manifest.json الخاص بالإضافة",
    "o addon": "الإضافة",
    "Addon adicionado": "تمت إضافة الإضافة",
    "Adicionar addon por URL": "إضافة إضافة عبر رابط",
    "Instala na sua conta Stremio": "تُثبَّت في حساب Stremio الخاص بك",
    "Fica só nesta TV": "تبقى على هذا التلفاز فقط",
    "Entre na conta primeiro": "سجّل الدخول أولًا",
    "Instalar {name} na sua conta Stremio?": "تثبيت {name} في حساب Stremio الخاص بك؟",
    "Instalar": "تثبيت",
    "Instalando...": "جارٍ التثبيت...",
    "{name} instalado na sua conta": "تم تثبيت {name} في حسابك",
    "Não foi possível instalar: {msg}": "تعذّر التثبيت: {msg}",
    "Esse addon já está instalado": "هذه الإضافة مثبّتة بالفعل",
    "Manifest inválido": "ملف manifest غير صالح",
    "Sobre e depuração": "حول التطبيق وتصحيح الأخطاء",
    "Log remoto": "السجل عن بُعد",
    "npm run logs no PC": "npm run logs على الكمبيوتر",
    "Log remoto ligado": "السجل عن بُعد مفعّل",
    "Enviando logs para o PC": "جارٍ إرسال السجلات إلى الكمبيوتر",
    "Log remoto desligado": "السجل عن بُعد متوقف",
    "Versão": "الإصدار",
    "Procurar atualização": "البحث عن تحديث",
    "Baixa a versão nova do GitHub ({repo})": "ينزّل الإصدار الجديد من GitHub ({repo})",
    "Procurando atualização...": "جارٍ البحث عن تحديث...",
    "Você já está na versão mais nova (v{v}).": "لديك أحدث إصدار (v{v}).",
    "Versão {v} disponível": "الإصدار {v} متاح",
    "Versão {v} disponível: Ajustes → Procurar atualização": "الإصدار {v} متاح: الإعدادات ← البحث عن تحديث",
    "Como atualizar": "طريقة التحديث",
    "No PC: webOS Dev Manager → instalar o .ipk da release": "على الكمبيوتر: webOS Dev Manager ← ثبّت ملف .ipk الخاص بالإصدار",
    "Página da release": "صفحة الإصدار",
    "Instalar a versão {v}? O app vai fechar e reabrir.": "تثبيت الإصدار {v}؟ سيُغلق التطبيق ثم يُعاد فتحه.",
    "Atualizar": "تحديث",
    "Atualizado! Reabrindo...": "تم التحديث! جارٍ إعادة الفتح...",
    "Não foi possível atualizar: {msg}": "تعذّر التحديث: {msg}",
    "Não foi possível verificar: {msg}": "تعذّر التحقق: {msg}",
    "Baixando": "جارٍ التنزيل",
    "Conferindo o arquivo...": "جارٍ التحقق من الملف...",
    "Falha na instalação": "فشل التثبيت",
    "Release sem hash SHA-256": "الإصدار بدون بصمة SHA-256",
    // Erros de rede e da conta
    "Erro da API Stremio": "خطأ في واجهة Stremio API",
    "Não foi possível gerar o código": "تعذّر إنشاء الرمز",
    "Falha de rede em {url}": "خطأ في الشبكة على {url}",
    "Tempo esgotado em {url}": "انتهت المهلة على {url}",
    "JSON inválido de {url}": "JSON غير صالح من {url}",
    "HTTP {code} em {url}": "HTTP {code} على {url}",
    "Este link é torrent: configure o servidor do PC": "هذا الرابط تورنت: أعدّ خادم الكمبيوتر",
    "Magnet inválido": "رابط magnet غير صالح",
    "Tipo de link não suportado na TV": "نوع الرابط غير مدعوم على التلفاز"
  };

  // src/js/lib/i18n.js
  var lang = "en";
  var TABLES = {
    en: EN,
    ar: AR
  };
  function detect() {
    var nav = window.navigator && (window.navigator.language || window.navigator.userLanguage) || "";
    return /^ar/i.test(nav) ? "ar" : "en";
  }
  function init(setting) {
    lang = setting === "en" || setting === "ar" ? setting : detect();
    var root = document.documentElement;
    root.setAttribute("lang", lang);
    root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    return lang;
  }
  function current() {
    return lang;
  }
  function apiLang() {
    return lang === "ar" ? "ar-SA" : "en-US";
  }
  function t(text, params) {
    var table = TABLES[lang];
    var out = table[text] !== void 0 ? table[text] : EN[text] !== void 0 ? EN[text] : text;
    if (params) {
      Object.keys(params).forEach(function (k) {
        out = out.split("{" + k + "}").join(String(params[k]));
      });
    }
    return out;
  }
  function epLabel(season, episode) {
    return lang === "ar" ? "م" + season + " ح" + episode : "S" + season + " E" + episode;
  }

  // src/js/lib/http.js
  function request(method, url2, body, opts) {
    var o = opts || {};
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open(method, url2, true);
      xhr.timeout = o.timeout || 2e4;
      if (body !== void 0 && body !== null) xhr.setRequestHeader("Content-Type", "application/json");
      if (o.headers) for (var k in o.headers) xhr.setRequestHeader(k, o.headers[k]);
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          if (o.raw) return resolve(xhr.responseText);
          try {
            resolve(xhr.responseText ? JSON.parse(xhr.responseText) : null);
          } catch (e) {
            reject(new Error(t("JSON inválido de {url}", {
              url: url2
            })));
          }
        } else {
          var err = new Error(t("HTTP {code} em {url}", {
            code: xhr.status,
            url: url2
          }));
          err.status = xhr.status;
          reject(err);
        }
      };
      xhr.onerror = function () {
        var err = new Error(t("Falha de rede em {url}", {
          url: url2
        }));
        err.status = 0;
        reject(err);
      };
      xhr.ontimeout = function () {
        var err = new Error(t("Tempo esgotado em {url}", {
          url: url2
        }));
        err.status = 0;
        err.timeout = true;
        reject(err);
      };
      xhr.send(body !== void 0 && body !== null ? JSON.stringify(body) : null);
    }).catch(function (err) {
      if (!o.quiet) log.warn(err.message);
      throw err;
    });
  }
  function getJSON(url2, opts) {
    return request("GET", url2, null, opts);
  }
  function postJSON(url2, body, opts) {
    return request("POST", url2, body, opts);
  }
  function getText(url2, opts) {
    return request("GET", url2, null, Object.assign({
      raw: true
    }, opts));
  }
  var cache = /* @__PURE__ */new Map();
  function cachedJSON(url2, ttlMs, opts) {
    var hit = cache.get(url2);
    var now = Date.now();
    if (hit && now - hit.t < (ttlMs || 6e5)) return hit.p;
    var p = getJSON(url2, opts).catch(function (e) {
      cache.delete(url2);
      throw e;
    });
    cache.set(url2, {
      t: now,
      p: p
    });
    if (cache.size > 60) cache.delete(cache.keys().next().value);
    return p;
  }

  // src/js/lib/img.js
  function smallPoster(url2) {
    if (!url2) return url2;
    return String(url2).replace(/(images\.metahub\.space\/poster\/)(medium|large)\//, "$1small/").replace(/(image\.tmdb\.org\/t\/p\/)[^/]+\//, "$1w185/").replace(/(artworks\.thetvdb\.com\/banners\/(?:[^?]*\/)?posters\/[^/?]+?)(?:_t)?\.(jpg|png)/, "$1_t.$2").replace(/(static\.tvmaze\.com\/uploads\/images\/)(original_untouched|large_landscape|medium_landscape)\//, "$1medium_portrait/").replace(/(kitsu\.app\/anime\/poster_images\/\d+\/)(original|large|medium)\.(jpg|jpeg|png)/, "$1small.jpg");
  }
  function smallBackground(url2) {
    if (!url2) return url2;
    return String(url2).replace(/(images\.metahub\.space\/background\/)(medium|large)\//, "$1small/").replace(/(image\.tmdb\.org\/t\/p\/)[^/]+\//, "$1w300/").replace(/(kitsu\.app\/anime\/(?:poster|cover)_images\/\d+\/)(original|large)\.(jpg|jpeg|png)/, "$1small.jpg").replace(/(artworks\.thetvdb\.com\/banners\/(?:[^?]*\/)?(?:posters|fanart)\/[^/?]+?)(?:_t)?\.(jpg|png)/, "$1_t.$2");
  }
  function smallThumb(url2) {
    if (!url2) return url2;
    return String(url2).replace(/(image\.tmdb\.org\/t\/p\/)[^/]+\//, "$1w300/").replace(/(artworks\.thetvdb\.com\/banners\/(?:[^?]*\/)?episodes\/[^/?]+?)(?:_t)?\.(jpg|png)/, "$1_t.$2");
  }
  var KITSU_RE = /(?:media\.kitsu\.app|kitsu-production-media\.[^/]+)\/anime\/(?:poster_images\/)?(\d+)\/(poster_image|cover_image)\/(?!small-|tiny-|medium-|large-)/;
  var kitsuCache = {};
  var batch = {};
  var batchTimer = null;
  function kitsuInfo(url2) {
    var m = String(url2 || "").match(KITSU_RE);
    return m ? {
      id: m[1],
      kind: m[2] === "cover_image" ? "cover" : "poster"
    } : null;
  }
  function flush2() {
    var ids = Object.keys(batch);
    var waiting = batch;
    batch = {};
    batchTimer = null;
    var _loop2 = function _loop2() {
      var chunk = ids.slice(i, i + 20);
      getJSON("https://kitsu.io/api/edge/anime?filter%5Bid%5D=" + chunk.join(",") + "&fields%5Banime%5D=posterImage,coverImage&page%5Blimit%5D=20", {
        quiet: true,
        timeout: 15e3
      }).then(function (r) {
        var found = {};
        (r && r.data || []).forEach(function (a) {
          return found[a.id] = a.attributes || {};
        });
        chunk.forEach(function (id) {
          var at = found[id] || {};
          var p = at.posterImage || {};
          var c = at.coverImage || {};
          waiting[id].forEach(function (w) {
            return w.resolve(w.kind === "cover" ? c.small || c.tiny || null : p.small || p.tiny || null);
          });
        });
      }).catch(function () {
        return chunk.forEach(function (id) {
          return waiting[id].forEach(function (w) {
            return w.resolve(null);
          });
        });
      });
    };
    for (var i = 0; i < ids.length; i += 20) {
      _loop2();
    }
  }
  function kitsuSmall(info2) {
    var key = info2.id + ":" + info2.kind;
    if (!kitsuCache[key]) {
      kitsuCache[key] = new Promise(function (resolve) {
        (batch[info2.id] = batch[info2.id] || []).push({
          kind: info2.kind,
          resolve: resolve
        });
        if (!batchTimer) batchTimer = setTimeout(flush2, 60);
      });
    }
    return kitsuCache[key];
  }

  // src/js/lib/dom.js
  function h(tag, props, children) {
    var parts = tag.split(/(?=[.#])/);
    var el = document.createElement(parts[0] || "div");
    for (var i = 1; i < parts.length; i++) {
      var p = parts[i];
      if (p[0] === ".") el.classList.add(p.slice(1));else if (p[0] === "#") el.id = p.slice(1);
    }
    if (props) {
      for (var key in props) {
        var val = props[key];
        if (val === void 0 || val === null || val === false) continue;
        if (key === "text") el.textContent = val;else if (key === "html") el.innerHTML = val;else if (key === "style" && _typeof(val) === "object") Object.assign(el.style, val);else if (key === "on") for (var ev in val) el.addEventListener(ev, val[ev]);else if (key === "onSelect") el.__select = val;else if (key === "onFocus") el.__focus = val;else if (key === "focusable") el.setAttribute("data-focus", "");else if (key === "cls") String(val).split(" ").forEach(function (c) {
          return c && el.classList.add(c);
        });else el.setAttribute(key, val === true ? "" : val);
      }
    }
    append(el, children);
    return el;
  }
  function append(el, children) {
    if (children === void 0 || children === null || children === false) return el;
    if (Array.isArray(children)) children.forEach(function (c) {
      return append(el, c);
    });else if (typeof children === "string" || typeof children === "number") el.appendChild(document.createTextNode(String(children)));else el.appendChild(children);
    return el;
  }
  function clear(el) {
    while (el.firstChild) el.removeChild(el.firstChild);
    return el;
  }
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }
  var BLANK = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
  function setOn(el, on) {
    if (on && !el.__on) {
      el.__on = true;
      var url2 = el.getAttribute("data-lazy");
      var kitsu = kitsuInfo(url2);
      if (!kitsu) {
        el.src = url2;
        return;
      }
      kitsuSmall(kitsu).then(function (small) {
        if (!el.__on) return;
        if (small) {
          el.setAttribute("data-lazy", small);
          el.src = small;
        } else if (el.onerror) el.onerror();
      });
    } else if (!on && el.__on) {
      el.__on = false;
      el.src = BLANK;
    }
  }
  function loadVisibleImages(root, margin) {
    var m = margin === void 0 ? 400 : margin;
    var W = window.innerWidth;
    var H = window.innerHeight;
    var isFar = function isFar(r) {
      return r.right < -W * 0.5 || r.left > W * 1.6 || r.bottom < -H * 0.8 || r.top > H * 1.8;
    };
    var handled = [];
    $$("[data-scroll-x]", root).forEach(function (track) {
      if (track.offsetParent === null) return;
      var tr = track.getBoundingClientRect();
      if (tr.bottom < -H * 0.8 || tr.top > H * 1.8) {
        $$("img[data-lazy]", track).forEach(function (el) {
          return setOn(el, false);
        });
        handled.push(track);
      }
    });
    $$("img[data-lazy]", root).forEach(function (el) {
      if (el.offsetParent === null) return;
      for (var i = 0; i < handled.length; i++) if (handled[i].contains(el)) return;
      var r = el.getBoundingClientRect();
      var near = r.right > -m && r.left < W + m && r.bottom > -m && r.top < H + m;
      if (near) setOn(el, true);else if (isFar(r)) setOn(el, false);
    });
  }
  function unloadImages(root) {
    $$("img[data-lazy]", root).forEach(function (el) {
      if (el.__on) {
        el.__on = false;
        el.src = BLANK;
      }
    });
  }

  // src/js/lib/platform.js
  function isTizen() {
    return _typeof(window.tizen) === "object" || /Tizen/i.test(navigator.userAgent || "");
  }
  function registerTizenKeys() {
    var input = window.tizen && window.tizen.tvinputdevice;
    if (!input) return;
    ["MediaPlayPause", "MediaPlay", "MediaPause", "MediaStop", "MediaFastForward", "MediaRewind", "ColorF0Red", "ColorF1Green", "ColorF2Yellow", "ColorF3Blue", "ChannelUp", "ChannelDown"].forEach(function (k) {
      try {
        input.registerKey(k);
      } catch (e) {}
    });
  }

  // src/js/lib/nav.js
  var TIZEN = isTizen();
  var KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    ENTER: 13,
    IME_DONE: 65376,
    // Samsung on-screen keyboard Done (not the remote's OK)
    IME_CANCEL: 65385,
    // Samsung on-screen keyboard Cancel
    BACK: TIZEN ? 10009 : 461,
    // Samsung Return / LG Back
    ESC: 27,
    BACKSPACE: 8,
    PLAY: 415,
    PAUSE: 19,
    PLAYPAUSE: TIZEN ? 10252 : 179,
    STOP: 413,
    FF: 417,
    RW: 412,
    RED: 403,
    GREEN: 404,
    YELLOW: 405,
    BLUE: 406,
    CH_UP: TIZEN ? 427 : 33,
    CH_DOWN: TIZEN ? 428 : 34
  };
  var layers = [];
  var scrollHook = null;
  var pointerMode = false;
  var smooth = false;
  function setSmooth(on) {
    smooth = !!on;
  }
  function top() {
    return layers[layers.length - 1] || null;
  }
  function isVisible(el) {
    if (!el || el.offsetParent === null) return false;
    if (el.hasAttribute("disabled")) return false;
    return true;
  }
  function candidates(root) {
    return $$("[data-focus]", root).filter(isVisible);
  }
  function center(r) {
    return {
      x: (r.left + r.right) / 2,
      y: (r.top + r.bottom) / 2
    };
  }
  function pick(list2, cur, dir) {
    var cr = cur.getBoundingClientRect();
    var cc = center(cr);
    var tol = 8;
    var best = null;
    var bestScore = Infinity;
    for (var i = 0; i < list2.length; i++) {
      var el = list2[i];
      var r = el.getBoundingClientRect();
      var primary = void 0;
      var secondary = void 0;
      if (dir === "right") {
        if (r.left < cr.right - tol && center(r).x <= cc.x + tol) continue;
        if (center(r).x <= cc.x) continue;
        primary = Math.max(0, r.left - cr.right);
        secondary = overlap(r.top, r.bottom, cr.top, cr.bottom) ? 0 : Math.abs(center(r).y - cc.y);
      } else if (dir === "left") {
        if (center(r).x >= cc.x) continue;
        if (r.right > cr.left + tol && center(r).x >= cc.x - tol) continue;
        primary = Math.max(0, cr.left - r.right);
        secondary = overlap(r.top, r.bottom, cr.top, cr.bottom) ? 0 : Math.abs(center(r).y - cc.y);
      } else if (dir === "down") {
        if (r.top < cr.bottom - tol) continue;
        primary = Math.max(0, r.top - cr.bottom);
        secondary = overlap(r.left, r.right, cr.left, cr.right) ? Math.abs(r.left - cr.left) / 10 : Math.abs(center(r).x - cc.x);
      } else {
        if (r.bottom > cr.top + tol) continue;
        primary = Math.max(0, cr.top - r.bottom);
        secondary = overlap(r.left, r.right, cr.left, cr.right) ? Math.abs(r.left - cr.left) / 10 : Math.abs(center(r).x - cc.x);
      }
      var score = primary + secondary * 2.5;
      if (score < bestScore) {
        bestScore = score;
        best = el;
      }
    }
    return best;
  }
  function overlap(a1, a2, b1, b2) {
    return Math.min(a2, b2) - Math.max(a1, b1) > 4;
  }
  function animateScroll(node, prop, target) {
    if (node.__anim) cancelAnimationFrame(node.__anim);
    var start3 = node[prop];
    var delta = target - start3;
    if (!smooth || Math.abs(delta) < 2) {
      node[prop] = target;
      if (scrollHook) scrollHook(node);
      return;
    }
    var dur = 160;
    var t0 = Date.now();
    var _step2 = function step() {
      var k = Math.min(1, (Date.now() - t0) / dur);
      node[prop] = start3 + delta * (1 - Math.pow(1 - k, 3));
      if (k < 1) node.__anim = requestAnimationFrame(_step2);else {
        node.__anim = null;
        if (scrollHook) scrollHook(node);
      }
    };
    node.__anim = requestAnimationFrame(_step2);
  }
  function ensureVisible(el) {
    var node = el.parentNode;
    while (node && node.nodeType === 1) {
      if (node.hasAttribute("data-scroll-x")) {
        var pad = parseInt(node.getAttribute("data-pad") || "96", 10);
        var er = el.getBoundingClientRect();
        var nr = node.getBoundingClientRect();
        var target = node.scrollLeft;
        if (er.left < nr.left + pad) target -= nr.left + pad - er.left;else if (er.right > nr.right - pad) target += er.right - (nr.right - pad);
        target = Math.max(0, Math.min(target, node.scrollWidth - node.clientWidth));
        if (target !== node.scrollLeft) animateScroll(node, "scrollLeft", target);
      }
      if (node.hasAttribute("data-scroll-y")) {
        var _pad = parseInt(node.getAttribute("data-pad-y") || "140", 10);
        var _er = el.getBoundingClientRect();
        var _nr = node.getBoundingClientRect();
        var _target = node.scrollTop;
        var anchor = el.closest("[data-anchor]");
        if (anchor && node.contains(anchor)) {
          var ar = anchor.getBoundingClientRect();
          _target += ar.top - _nr.top - parseInt(anchor.getAttribute("data-anchor") || "0", 10);
        } else if (_er.top < _nr.top + _pad) _target -= _nr.top + _pad - _er.top;else if (_er.bottom > _nr.bottom - _pad) _target += _er.bottom - (_nr.bottom - _pad);
        _target = Math.max(0, Math.min(_target, node.scrollHeight - node.clientHeight));
        if (_target !== node.scrollTop) animateScroll(node, "scrollTop", _target);
      }
      node = node.parentNode;
    }
  }
  function focus(el, opts) {
    var layer = top();
    if (!layer || !el) return;
    var prev = layer.current;
    if (prev && prev !== el) {
      prev.classList.remove("focused");
      if (prev.__blur) prev.__blur();
    }
    layer.current = el;
    el.classList.add("focused");
    var group = el.closest("[data-group]");
    if (group) group.__last = el;
    if (!(opts && opts.noScroll)) ensureVisible(el);
    if (el.__focus && prev !== el) el.__focus(el);
  }
  function current2() {
    var layer = top();
    return layer ? layer.current : null;
  }
  function focusFirst(root) {
    var layer = top();
    if (!layer) return;
    var scope = root || layer.root;
    var pref = $$("[data-autofocus]", scope).filter(isVisible)[0];
    var el = pref || candidates(scope)[0];
    if (el) focus(el);
  }
  function move(dir) {
    var layer = top();
    if (!layer) return false;
    var cur = layer.current;
    if (!cur || !document.body.contains(cur) || !isVisible(cur)) {
      focusFirst();
      return true;
    }
    var group = cur.closest("[data-group]");
    var horizontal = dir === "left" || dir === "right";
    if (group && horizontal === !group.hasAttribute("data-vertical")) {
      var inGroup = candidates(group).filter(function (e) {
        return e !== cur;
      });
      var g = pick(inGroup, cur, dir);
      if (g) {
        focus(g);
        return true;
      }
      if (group.hasAttribute("data-trap")) return false;
    }
    var all2 = candidates(layer.root).filter(function (e) {
      return e !== cur;
    });
    var best = pick(all2, cur, dir);
    if (!best) return false;
    var bg = best.closest("[data-group]");
    if (bg && bg !== group && bg.__last && bg.contains(bg.__last) && isVisible(bg.__last)) best = bg.__last;
    focus(best);
    return true;
  }
  function select(el) {
    var target = el || current2();
    if (!target) return;
    if (target.tagName === "INPUT") {
      target.focus();
      return;
    }
    if (target.__select) target.__select(target);
  }
  function pushLayer(root, handlers) {
    var layer = Object.assign({
      root: root,
      current: null
    }, handlers || {});
    layers.push(layer);
    return layer;
  }
  function popLayer(layer) {
    var i = layers.indexOf(layer);
    if (i >= 0) layers.splice(i, 1);
    var t2 = top();
    if (t2 && t2.current) {
      t2.current.classList.add("focused");
    }
  }
  function topLayer() {
    return top();
  }
  function onScroll(fn) {
    scrollHook = fn;
  }
  function onKeyDown(e) {
    var layer = top();
    if (!layer) return;
    var code = e.keyCode;
    var active = document.activeElement;
    var typing = active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA");
    if (typing) {
      if (code === KEY.ENTER || code === KEY.IME_DONE) {
        if (code === KEY.ENTER) e.preventDefault();
        active.blur();
        if (active.__submit) active.__submit(active.value);
        return;
      } else if (code === KEY.BACK || code === KEY.ESC || code === KEY.IME_CANCEL) {
        if (code !== KEY.IME_CANCEL) e.preventDefault();
        active.blur();
        return;
      } else if (code === KEY.UP || code === KEY.DOWN) {
        active.blur();
      } else return;
    }
    if (code >= 37 && code <= 40 && pointerMode) pointerMode = false;
    if (layer.onKey && layer.onKey(e) === true) {
      e.preventDefault();
      return;
    }
    switch (code) {
      case KEY.LEFT:
        move("left");
        break;
      case KEY.RIGHT:
        move("right");
        break;
      case KEY.UP:
        move("up");
        break;
      case KEY.DOWN:
        move("down");
        break;
      case KEY.ENTER:
        select();
        break;
      case KEY.BACK:
      case KEY.ESC:
      case KEY.BACKSPACE:
        if (layer.onBack) layer.onBack();
        break;
      default:
        return;
    }
    e.preventDefault();
  }
  function onMouseOver(e) {
    var layer = top();
    if (!layer) return;
    pointerMode = true;
    var el = e.target.closest ? e.target.closest("[data-focus]") : null;
    if (el && layer.root.contains(el) && el !== layer.current) focus(el, {
      noScroll: true
    });
  }
  function onClick(e) {
    var layer = top();
    if (!layer) return;
    var el = e.target.closest ? e.target.closest("[data-focus]") : null;
    if (el && layer.root.contains(el)) {
      focus(el, {
        noScroll: true
      });
      select(el);
    }
  }
  var wheelLock = 0;
  function onWheel(e) {
    var now = Date.now();
    if (now - wheelLock < 120) return;
    wheelLock = now;
    move(e.deltaY > 0 ? "down" : "up");
  }
  function install() {
    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("click", onClick);
    document.addEventListener("mousewheel", onWheel);
  }

  // src/js/lib/store.js
  var PREFIX = "kai.";
  function rawGet(key, fallback) {
    try {
      var raw = window.localStorage.getItem(PREFIX + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }
  function rawSet(key, value) {
    try {
      if (value === void 0 || value === null) window.localStorage.removeItem(PREFIX + key);else window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch (e) {}
  }
  var COLORS = ["#7b5bf5", "#e5508c", "#2bb6a3", "#f0a030", "#3d8bfd", "#e55353", "#8bc34a", "#9e9e9e"];
  function profileKey(id, key) {
    return "p." + id + "." + key;
  }
  function ensureProfiles() {
    var list2 = rawGet("profiles", null);
    if (list2 && list2.length) return list2;
    var id = "p" + Date.now().toString(36);
    var oldAuth = rawGet("auth", null);
    var email = oldAuth && oldAuth.user && oldAuth.user.email;
    list2 = [email ? {
      id: id,
      name: email.split("@")[0],
      color: COLORS[0]
    } : {
      id: id,
      name: "Perfil 1",
      color: COLORS[0],
      unnamed: true
    }];
    ["auth", "addons", "library"].forEach(function (k) {
      var v = rawGet(k, null);
      if (v !== null) rawSet(profileKey(id, k), v);
      rawSet(k, null);
    });
    var oldSettings = rawGet("settings", null);
    if (oldSettings) {
      var dev = {};
      var prof = {};
      Object.keys(oldSettings).forEach(function (k) {
        if (k === "devlogUrl" || oldSettings[k] === "") return;
        (DEVICE_KEYS.indexOf(k) >= 0 ? dev : prof)[k] = oldSettings[k];
      });
      rawSet("device", dev);
      rawSet(profileKey(id, "settings"), prof);
      rawSet("settings", null);
    }
    rawSet("profiles", list2);
    rawSet("activeProfile", id);
    return list2;
  }
  function profiles() {
    return ensureProfiles();
  }
  function activeProfile() {
    var list2 = ensureProfiles();
    var id = rawGet("activeProfile", null);
    return list2.find(function (p) {
      return p.id === id;
    }) || list2[0];
  }
  function setActiveProfile(id) {
    rawSet("activeProfile", id);
  }
  function addProfile(name, color) {
    var list2 = ensureProfiles();
    var p = {
      id: "p" + Date.now().toString(36),
      name: name || "Perfil " + (list2.length + 1),
      color: color || COLORS[list2.length % COLORS.length]
    };
    list2.push(p);
    rawSet("profiles", list2);
    return p;
  }
  function updateProfile(id, patch) {
    var list2 = ensureProfiles().map(function (p) {
      return p.id === id ? Object.assign({}, p, patch) : p;
    });
    rawSet("profiles", list2);
  }
  function removeProfile(id) {
    var list2 = ensureProfiles().filter(function (p) {
      return p.id !== id;
    });
    if (!list2.length) return false;
    ["auth", "addons", "library", "settings"].forEach(function (k) {
      return rawSet(profileKey(id, k), null);
    });
    rawSet("profiles", list2);
    if (rawGet("activeProfile", null) === id) rawSet("activeProfile", list2[0].id);
    return true;
  }
  function get(key, fallback) {
    return rawGet(profileKey(activeProfile().id, key), fallback);
  }
  function set(key, value) {
    rawSet(profileKey(activeProfile().id, key), value);
  }
  var DEVICE_KEYS = ["serverUrl", "tmdbKey", "mdblistKey", "smoothScroll", "devlogUrl", "lastUpdateCheck", "askProfile", "wizardDone", "language"];
  var DEFAULT_SETTINGS = {
    // TV
    serverUrl: "",
    tmdbKey: true ? "" : "",
    mdblistKey: true ? "" : "",
    smoothScroll: false,
    // rolagem animada (mais bonita, mais pesada na TV)
    smartChoice: true,
    // Watch picks the best source and plays it
    theme: "purple",
    // see lib/theme.js
    devlogUrl: true ? "" : "",
    language: "auto",
    // 'auto' (TV language: Arabic or English) | 'en' | 'ar'
    askProfile: true,
    // "Quem está assistindo?" ao abrir, se houver mais de um perfil
    wizardDone: false,
    // Perfil
    heroSource: "cinemeta",
    oled: false,
    subtitleLangs: ["eng", "en"],
    audioLangs: [],
    // vazio = mantém o áudio padrão do arquivo (geralmente o original)
    subtitleSize: 100,
    subtitleFont: "nata",
    subtitleStyle: "kai",
    subtitleColor: "#ffffff",
    subtitleBold: true,
    subtitlePosition: "low",
    skipMode: "auto",
    // auto (default) | prompt | off
    subtitlesAuto: true,
    localAddons: []
  };
  function settings() {
    var subs = {
      en: ["eng", "en"],
      ar: ["ara", "ar"]
    }[current()];
    var base = Object.assign({}, DEFAULT_SETTINGS, subs ? {
      subtitleLangs: subs
    } : null);
    return Object.assign(base, rawGet("device", {}), get("settings", {}));
  }
  function saveSettings(patch) {
    var dev = rawGet("device", {});
    var prof = get("settings", {});
    Object.keys(patch).forEach(function (k) {
      return (DEVICE_KEYS.indexOf(k) >= 0 ? dev : prof)[k] = patch[k];
    });
    rawSet("device", dev);
    set("settings", prof);
    return settings();
  }

  // src/js/api/stremio.js
  var API = "https://api.strem.io/api/";
  var LINK = "https://link.stremio.com/api/v2/";
  var auth = get("auth", null);
  function reloadProfile() {
    auth = get("auth", null);
    libMem = null;
  }
  function call(method, body) {
    return postJSON(API + method, body).then(function (res) {
      if (res && res.error) {
        var err = new Error(res.error.message || t("Erro da API Stremio"));
        err.code = res.error.code;
        throw err;
      }
      return res ? res.result : null;
    });
  }
  function isLoggedIn() {
    return !!(auth && auth.authKey);
  }
  function user() {
    return auth ? auth.user : null;
  }
  function authKey() {
    return auth ? auth.authKey : null;
  }
  function saveAuth(result) {
    auth = {
      authKey: result.authKey,
      user: result.user || null
    };
    set("auth", auth);
    return auth;
  }
  function login(email, password) {
    return call("login", {
      type: "Login",
      email: email,
      password: password,
      facebook: false
    }).then(saveAuth);
  }
  function createLinkCode() {
    return getJSON(LINK + "create?type=Create").then(function (res) {
      if (!res || !res.result || !res.result.code) throw new Error(t("Não foi possível gerar o código"));
      return res.result;
    });
  }
  function readLinkCode(code) {
    return getJSON(LINK + "read?type=Read&code=" + encodeURIComponent(code), {
      quiet: true
    }).then(function (res) {
      if (res && res.result && res.result.authKey) {
        saveAuth({
          authKey: res.result.authKey,
          user: null
        });
        return refreshUser().then(function () {
          return true;
        });
      }
      return false;
    });
  }
  function refreshUser() {
    if (!isLoggedIn()) return Promise.resolve(null);
    return call("getUser", {
      type: "GetUser",
      authKey: auth.authKey
    }).then(function (u) {
      auth.user = u;
      set("auth", auth);
      return u;
    }).catch(function (e) {
      if (e.code === 1) logout();
      throw e;
    });
  }
  function logout() {
    var key = authKey();
    auth = null;
    set("auth", null);
    set("addons", null);
    setLibrary([]);
    if (key) call("logout", {
      type: "Logout",
      authKey: key
    }).catch(function () {});
  }
  function getAddonCollection() {
    if (!isLoggedIn()) return Promise.resolve(null);
    return call("addonCollectionGet", {
      type: "AddonCollectionGet",
      authKey: auth.authKey,
      update: true
    }).then(function (r) {
      var addons2 = r && r.addons || [];
      set("addons", addons2);
      return addons2;
    });
  }
  function installAddon(transportUrl) {
    if (!isLoggedIn()) return Promise.reject(new Error(t("Entre na conta primeiro")));
    return getJSON(transportUrl).then(function (manifest) {
      if (!manifest || !manifest.id) throw new Error(t("Manifest inválido"));
      return call("addonCollectionGet", {
        type: "AddonCollectionGet",
        authKey: auth.authKey,
        update: true
      }).then(function (r) {
        var list2 = r && r.addons || [];
        if (list2.some(function (a) {
          return a.transportUrl === transportUrl || a.manifest && a.manifest.id === manifest.id;
        })) {
          throw new Error(t("Esse addon já está instalado"));
        }
        var next = list2.concat([{
          transportUrl: transportUrl,
          transportName: "http",
          manifest: manifest,
          flags: {
            official: false,
            protected: false
          }
        }]);
        return call("addonCollectionSet", {
          type: "AddonCollectionSet",
          authKey: auth.authKey,
          addons: next
        }).then(function () {
          set("addons", next);
          return manifest;
        });
      });
    });
  }
  function cachedAddons() {
    return get("addons", null);
  }
  function getLibrary() {
    if (!isLoggedIn()) return Promise.resolve(cachedLibrary());
    return call("datastoreGet", {
      authKey: auth.authKey,
      collection: "libraryItem",
      ids: [],
      all: true
    }).then(function (items) {
      var list2 = Array.isArray(items) ? items : [];
      setLibrary(list2);
      return list2;
    });
  }
  var libMem = null;
  var libSaveTimer = null;
  function setLibrary(list2) {
    libMem = list2;
    clearTimeout(libSaveTimer);
    libSaveTimer = setTimeout(function () {
      var slim = (libMem || []).filter(function (it) {
        return !it.removed || it.temp || it.state && it.state.timeOffset > 0;
      });
      set("library", slim);
    }, 1500);
  }
  function cachedLibrary() {
    if (!libMem) libMem = get("library", []);
    return libMem;
  }
  function putLibraryItems(items) {
    var lib = cachedLibrary();
    items.forEach(function (it) {
      var i = lib.findIndex(function (x) {
        return x._id === it._id;
      });
      if (i >= 0) lib[i] = it;else lib.push(it);
    });
    setLibrary(lib);
    if (!isLoggedIn()) return Promise.resolve();
    return call("datastorePut", {
      authKey: auth.authKey,
      collection: "libraryItem",
      changes: items
    }).catch(function (e) {
      log.warn("Falha ao salvar na biblioteca", e.message);
    });
  }
  function libraryItem(id) {
    return cachedLibrary().find(function (x) {
      return x._id === id;
    }) || null;
  }
  function nowIso() {
    return (/* @__PURE__ */new Date()).toISOString();
  }
  function newLibraryItem(meta) {
    return {
      _id: meta.id,
      name: meta.name || "",
      type: meta.type,
      poster: meta.poster || null,
      posterShape: meta.posterShape || "poster",
      removed: true,
      temp: true,
      _ctime: nowIso(),
      _mtime: nowIso(),
      state: {
        lastWatched: null,
        timeWatched: 0,
        timeOffset: 0,
        overallTimeWatched: 0,
        timesWatched: 0,
        flaggedWatched: 0,
        duration: 0,
        video_id: null,
        watched: null,
        noNotif: false
      },
      behaviorHints: {
        defaultVideoId: null,
        featuredVideoId: null,
        hasScheduledVideos: false
      }
    };
  }
  function clone(o) {
    return JSON.parse(JSON.stringify(o));
  }
  function setInLibrary(meta, inLibrary) {
    var existing = libraryItem(meta.id);
    var item = existing ? clone(existing) : newLibraryItem(meta);
    item.removed = !inLibrary;
    item.temp = false;
    item._mtime = nowIso();
    return putLibraryItems([item]).then(function () {
      return item;
    });
  }
  function isInLibrary(id) {
    var it = libraryItem(id);
    return !!(it && !it.removed);
  }
  function saveProgress(meta, videoId, timeMs, durationMs, deltaWatchedMs) {
    var existing = libraryItem(meta.id);
    var item = existing ? clone(existing) : newLibraryItem(meta);
    var s = item.state;
    if (s.video_id !== videoId) {
      s.timeWatched = 0;
      s.flaggedWatched = 0;
    }
    s.video_id = videoId;
    s.timeOffset = Math.max(0, Math.round(timeMs));
    s.duration = Math.max(0, Math.round(durationMs));
    s.lastWatched = nowIso();
    s.timeWatched = (s.timeWatched || 0) + Math.max(0, Math.round(deltaWatchedMs));
    s.overallTimeWatched = (s.overallTimeWatched || 0) + Math.max(0, Math.round(deltaWatchedMs));
    if (!s.flaggedWatched && s.duration > 0 && s.timeWatched > s.duration * 0.7) {
      s.flaggedWatched = 1;
      s.timesWatched = (s.timesWatched || 0) + 1;
    }
    if (s.duration > 0 && s.timeOffset > s.duration * 0.95) s.timeOffset = 0;
    if (!item.name && meta.name) item.name = meta.name;
    if (!item.poster && meta.poster) item.poster = meta.poster;
    item._mtime = nowIso();
    return putLibraryItems([item]);
  }
  function continueWatching() {
    return cachedLibrary().filter(function (it) {
      return it.type !== "other" && (!it.removed || it.temp) && it.state && it.state.timeOffset > 0;
    }).sort(function (a, b) {
      return String(b.state.lastWatched || "").localeCompare(String(a.state.lastWatched || ""));
    });
  }

  // src/js/lib/luna.js
  var pending = /* @__PURE__ */new Set();
  function hasLuna() {
    return typeof window.PalmServiceBridge === "function";
  }
  function luna(service, method, params) {
    return new Promise(function (resolve, reject) {
      if (!hasLuna()) return reject(new Error("Luna indisponível"));
      var bridge = new window.PalmServiceBridge();
      pending.add(bridge);
      bridge.onservicecallback = function (msg) {
        pending.delete(bridge);
        var res;
        try {
          res = JSON.parse(msg);
        } catch (e) {
          return reject(new Error("Resposta Luna inválida"));
        }
        if (res && res.returnValue === false) {
          var err = new Error(service + "/" + method + ": " + (res.errorText || res.errorCode || "falhou"));
          err.result = res;
          reject(err);
        } else resolve(res);
      };
      bridge.call(service.replace(/\/$/, "") + "/" + method, JSON.stringify(params || {}));
    });
  }
  function platformBack() {
    try {
      if (window.tizen && window.tizen.application) return window.tizen.application.getCurrentApplication().exit();
      if (window.webOSSystem && window.webOSSystem.platformBack) return window.webOSSystem.platformBack();
      if (window.PalmSystem && window.PalmSystem.platformBack) return window.PalmSystem.platformBack();
    } catch (e) {}
    window.close();
  }
  function getTvIp() {
    if (!hasLuna()) return tizenIp();
    return luna("luna://com.webos.service.connectionmanager", "getStatus", {}).then(function (r) {
      var w = r.wired && r.wired.ipAddress || r.wifi && r.wifi.ipAddress;
      if (!w) throw new Error("Sem IP");
      return w;
    });
  }
  function deviceInfo() {
    var pi = window.webapis && window.webapis.productinfo;
    if (pi) {
      return Promise.resolve({
        modelName: pi.getRealModel ? pi.getRealModel() : pi.getModel(),
        firmwareVersion: pi.getFirmware(),
        sdkVersion: "",
        platform: "Tizen"
      });
    }
    if (isTizen()) return Promise.resolve({
      modelName: "Samsung",
      firmwareVersion: "",
      sdkVersion: ""
    });
    return luna("luna://com.webos.service.tv.systemproperty", "getSystemInfo", {
      keys: ["modelName", "firmwareVersion", "sdkVersion"]
    });
  }
  function tizenIp() {
    try {
      var net = window.webapis && window.webapis.network;
      var ip = net && net.getIp && net.getIp();
      if (ip) return Promise.resolve(ip);
    } catch (e) {}
    var RTC = window.RTCPeerConnection || window.webkitRTCPeerConnection;
    if (!RTC) return Promise.reject(new Error("Sem IP"));
    return new Promise(function (resolve, reject) {
      var pc = new RTC({
        iceServers: []
      });
      var done = function done(fn, v) {
        try {
          pc.close();
        } catch (e) {}
        fn(v);
      };
      var timer = setTimeout(function () {
        return done(reject, new Error("Sem IP"));
      }, 3e3);
      pc.onicecandidate = function (e) {
        var m = e && e.candidate && /(\d+\.\d+\.\d+\.\d+)/.exec(e.candidate.candidate);
        if (m && !/^(0\.|127\.)/.test(m[1])) {
          clearTimeout(timer);
          done(resolve, m[1]);
        }
      };
      pc.createDataChannel("ip");
      pc.createOffer(function (o) {
        return pc.setLocalDescription(o, function () {}, function () {});
      }, function () {});
    });
  }
  var HEAVY = /netflix|youtube|amazon|primevideo|disney|hbo|\.max\b|globoplay|spotify|twitch|plex|crunchyroll|paramount|starplus|appletv/i;
  function closeHeavyBackgroundApps() {
    if (!hasLuna()) return Promise.resolve([]);
    return luna("luna://com.webos.applicationManager", "running", {}).then(function (r) {
      var ids = (r && r.running || []).map(function (a) {
        return a.id;
      }).filter(function (id) {
        return id && HEAVY.test(id);
      });
      return Promise.all(ids.map(function (id) {
        return luna("luna://com.webos.applicationManager", "closeByAppId", {
          id: id
        }).then(function () {
          return id;
        }).catch(function () {
          return null;
        });
      })).then(function (list2) {
        return list2.filter(Boolean);
      });
    }).catch(function () {
      return [];
    });
  }

  // src/js/api/server.js
  var status = {
    ok: false,
    checkedAt: 0,
    url: ""
  };
  function baseUrl() {
    var u = (settings().serverUrl || "").trim();
    if (!u) return "";
    if (!/^https?:\/\//.test(u)) u = "http://" + u;
    if (!/:\d+/.test(u.replace(/^https?:\/\//, ""))) u = u.replace(/\/$/, "") + ":11470";
    return u.replace(/\/$/, "") + "/";
  }
  function check(urlOverride) {
    var u = urlOverride || baseUrl();
    if (!u) {
      status = {
        ok: false,
        checkedAt: Date.now(),
        url: ""
      };
      return Promise.resolve(status);
    }
    return getJSON(u + "settings", {
      timeout: 4e3,
      quiet: true
    }).then(function (r) {
      status = {
        ok: true,
        checkedAt: Date.now(),
        url: u,
        version: r && r.values && r.values.serverVersion
      };
      return status;
    }).catch(function () {
      status = {
        ok: false,
        checkedAt: Date.now(),
        url: u
      };
      return status;
    });
  }
  function isAvailable() {
    return status.ok && status.url === baseUrl();
  }
  function lastStatus() {
    return status;
  }
  function scan(onProgress) {
    return getTvIp().then(function (ip) {
      var prefix = ip.split(".").slice(0, 3).join(".") + ".";
      var hosts = [];
      for (var i = 1; i < 255; i++) if (prefix + i !== ip) hosts.push(prefix + i);
      var found = null;
      var done = 0;
      var batch2 = 24;
      var _runBatch = function runBatch(start3) {
        if (found || start3 >= hosts.length) return Promise.resolve(found);
        var slice = hosts.slice(start3, start3 + batch2);
        return Promise.all(slice.map(function (h2) {
          return getJSON("http://" + h2 + ":11470/settings", {
            timeout: 1500,
            quiet: true
          }).then(function () {
            if (!found) found = h2;
          }).catch(function () {}).then(function () {
            done++;
            if (onProgress) onProgress(done, hosts.length);
          });
        })).then(function () {
          return _runBatch(start3 + batch2);
        });
      };
      return _runBatch(0);
    });
  }
  function parseMagnet(uri) {
    var m = uri.match(/xt=urn:btih:([a-zA-Z0-9]+)/);
    if (!m) return null;
    var hash = m[1];
    if (hash.length === 32) hash = base32ToHex(hash);
    var trackers = [];
    uri.replace(/[?&]tr=([^&]+)/g, function (_, tracker) {
      trackers.push("tracker:" + decodeURIComponent(tracker));
      return "";
    });
    return {
      infoHash: hash.toLowerCase(),
      sources: trackers
    };
  }
  function base32ToHex(s) {
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    var bits = "";
    s.toUpperCase().split("").forEach(function (c) {
      var v = alphabet.indexOf(c);
      if (v >= 0) bits += ("00000" + v.toString(2)).slice(-5);
    });
    var hex = "";
    for (var i = 0; i + 4 <= bits.length; i += 4) hex += parseInt(bits.substr(i, 4), 2).toString(16);
    return hex;
  }
  function torrentUrl(base, infoHash, fileIdx, sources) {
    var u = base + encodeURIComponent(infoHash) + "/" + encodeURIComponent(fileIdx);
    if (sources && sources.length) {
      u += "?" + sources.map(function (s) {
        return "tr=" + encodeURIComponent(s);
      }).join("&");
    }
    return u;
  }
  function createTorrent(base, infoHash, fileIdx, sources, seriesInfo) {
    var hasIdx = fileIdx !== null && fileIdx !== void 0 && isFinite(fileIdx);
    if ((!sources || !sources.length) && hasIdx) return Promise.resolve(torrentUrl(base, infoHash, fileIdx, []));
    var body = {
      torrent: {
        infoHash: infoHash
      }
    };
    if (sources && sources.length) {
      var all2 = ["dht:" + infoHash].concat(sources.map(function (s) {
        return /^(tracker|dht):/.test(s) ? s : "tracker:" + s;
      }));
      body.peerSearch = {
        sources: all2.filter(function (s, i) {
          return all2.indexOf(s) === i;
        }),
        min: 40,
        max: 200
      };
    }
    if (!hasIdx) {
      body.guessFileIdx = {};
      if (seriesInfo && isFinite(seriesInfo.season)) body.guessFileIdx.season = seriesInfo.season;
      if (seriesInfo && isFinite(seriesInfo.episode)) body.guessFileIdx.episode = seriesInfo.episode;
    } else body.guessFileIdx = false;
    return postJSON(base + encodeURIComponent(infoHash) + "/create", body, {
      timeout: 3e4
    }).then(function (r) {
      return torrentUrl(base, infoHash, hasIdx ? fileIdx : r && r.guessedFileIdx, body.peerSearch ? body.peerSearch.sources : []);
    });
  }
  function proxyUrl(base, streamUrl, reqHeaders, resHeaders) {
    var m = streamUrl.match(/^(https?:\/\/[^/?#]+)([^?#]*)(\?[^#]*)?/);
    if (!m) return streamUrl;
    var parts = ["d=" + encodeURIComponent(m[1])];
    Object.keys(reqHeaders || {}).forEach(function (k) {
      return parts.push("h=" + encodeURIComponent(k + ":" + reqHeaders[k]));
    });
    Object.keys(resHeaders || {}).forEach(function (k) {
      return parts.push("r=" + encodeURIComponent(k + ":" + resHeaders[k]));
    });
    return base + "proxy/" + parts.join("&") + (m[2] || "/") + (m[3] || "");
  }
  function corsProxyUrl(url2) {
    var base = isAvailable() ? baseUrl() : "";
    var m = url2.match(/^(https?:\/\/[^/?#]+)(.*)$/);
    if (!base || !m) return null;
    return base + "proxy/d=" + encodeURIComponent(m[1]) + "&r=" + encodeURIComponent("Access-Control-Allow-Origin:*") + (m[2] || "/");
  }
  function getJSONViaProxy(url2, opts) {
    return getJSON(url2, Object.assign({
      quiet: true
    }, opts)).catch(function (e) {
      var p = corsProxyUrl(url2);
      if (!p || e.status && e.status !== 0) throw e;
      return getJSON(p, Object.assign({
        quiet: true
      }, opts));
    });
  }
  function needsServer(stream) {
    if (typeof stream.url === "string") {
      if (stream.url.indexOf("magnet:") === 0) return true;
      return !!(stream.behaviorHints && stream.behaviorHints.proxyHeaders);
    }
    return typeof stream.infoHash === "string";
  }
  function isPlayableType(stream) {
    return typeof stream.url === "string" || typeof stream.infoHash === "string";
  }
  function toPlayable(stream, seriesInfo) {
    var base = baseUrl();
    if (typeof stream.url === "string") {
      if (stream.url.indexOf("magnet:") === 0) {
        if (!base) return Promise.reject(new Error(t("Este link é torrent: configure o servidor do PC")));
        var mg = parseMagnet(stream.url);
        if (!mg) return Promise.reject(new Error(t("Magnet inválido")));
        return createTorrent(base, mg.infoHash, null, mg.sources, seriesInfo).then(function (u) {
          return {
            url: u,
            viaServer: true
          };
        });
      }
      var ph = stream.behaviorHints && stream.behaviorHints.proxyHeaders;
      if (ph && base) {
        return Promise.resolve({
          url: proxyUrl(base, stream.url, ph.request, ph.response),
          viaServer: true
        });
      }
      return Promise.resolve({
        url: stream.url,
        viaServer: false
      });
    }
    if (typeof stream.infoHash === "string") {
      if (!base) return Promise.reject(new Error(t("Este link é torrent: configure o servidor do PC")));
      return createTorrent(base, stream.infoHash.toLowerCase(), stream.fileIdx, stream.sources || [], seriesInfo).then(function (u) {
        return {
          url: u,
          viaServer: true
        };
      });
    }
    return Promise.reject(new Error(t("Tipo de link não suportado na TV")));
  }
  function tracks(mediaUrl) {
    var base = baseUrl();
    if (!base) return Promise.resolve(null);
    return getJSON(base + "tracks/" + encodeURIComponent(mediaUrl), {
      timeout: 2e4,
      quiet: true
    }).then(function (list2) {
      var arr = Array.isArray(list2) ? list2 : [];
      return {
        audio: arr.filter(function (tk) {
          return tk && tk.type === "audio";
        }),
        subs: arr.filter(function (tk) {
          return tk && tk.type === "text";
        })
      };
    });
  }
  function streamProgress(mediaUrl) {
    var m = String(mediaUrl || "").match(/\/([a-f0-9]{40})\/(\d+)/i);
    var base = baseUrl();
    if (!m || !base) return Promise.resolve(null);
    return getJSON(base + m[1] + "/" + m[2] + "/stats.json", {
      timeout: 5e3,
      quiet: true
    }).then(function (r) {
      return r && typeof r.streamProgress === "number" ? r.streamProgress : null;
    }).catch(function () {
      return null;
    });
  }
  function subtitlesProxy(subUrl) {
    var base = baseUrl();
    return base ? base + "subtitles.vtt?from=" + encodeURIComponent(subUrl) : null;
  }

  // src/js/api/addons.js
  var CINEMETA = "https://v3-cinemeta.strem.io/manifest.json";
  var OPENSUBTITLES = "https://opensubtitles-v3.strem.io/manifest.json";
  var addons = null;
  function normalize(list2) {
    return (list2 || []).filter(function (a) {
      return a && a.transportUrl && a.manifest;
    }).filter(function (a) {
      return /^https?:/.test(a.transportUrl);
    }).map(function (a) {
      return {
        transportUrl: a.transportUrl,
        manifest: a.manifest,
        base: a.transportUrl.replace(/\/manifest\.json(\?.*)?$/, ""),
        query: (a.transportUrl.match(/\/manifest\.json(\?.*)$/) || [])[1] || ""
      };
    });
  }
  function defaultAddons() {
    var urls = [CINEMETA, OPENSUBTITLES].concat(settings().localAddons || []);
    return Promise.all(urls.map(function (u) {
      return getJSON(u).then(function (m) {
        return {
          transportUrl: u,
          manifest: m
        };
      }).catch(function () {
        return null;
      });
    })).then(function (list2) {
      return list2.filter(Boolean);
    });
  }
  function load(force) {
    if (addons && !force) return Promise.resolve(addons);
    if (isLoggedIn()) {
      var cached2 = cachedAddons();
      var fresh = getAddonCollection().then(function (list2) {
        return addons = normalize(list2);
      });
      if (cached2 && cached2.length && !force) {
        addons = normalize(cached2);
        fresh.catch(function (e) {
          return log.warn("Addons: usando cache", e.message);
        });
        return Promise.resolve(addons);
      }
      return fresh.catch(function () {
        addons = normalize(cached2 || []);
        return addons;
      });
    }
    return defaultAddons().then(function (list2) {
      return addons = normalize(list2);
    });
  }
  function list() {
    return addons || [];
  }
  function resourceMatch(addon, resource, type, id) {
    var m = addon.manifest;
    var resources = m.resources || [];
    for (var i = 0; i < resources.length; i++) {
      var r = resources[i];
      var name = typeof r === "string" ? r : r.name;
      if (name !== resource) continue;
      var types = _typeof(r) === "object" && r.types || m.types || [];
      if (type && types.length && types.indexOf(type) < 0) continue;
      var prefixes = _typeof(r) === "object" && r.idPrefixes || m.idPrefixes;
      if (id && prefixes && prefixes.length && !prefixes.some(function (p) {
        return id.indexOf(p) === 0;
      })) continue;
      return true;
    }
    return false;
  }
  function withResource(resource, type, id) {
    return list().filter(function (a) {
      return resourceMatch(a, resource, type, id);
    });
  }
  function url(addon, resource, type, id, extra) {
    var path = "/" + resource + "/" + encodeURIComponent(type) + "/" + encodeURIComponent(id);
    if (extra) {
      var parts = Object.keys(extra).filter(function (k) {
        return extra[k] !== void 0 && extra[k] !== null && extra[k] !== "";
      }).map(function (k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(extra[k]);
      });
      if (parts.length) path += "/" + parts.join("&");
    }
    return addon.base + path + ".json" + addon.query;
  }
  function boardCatalogs() {
    var out = [];
    list().forEach(function (addon) {
      (addon.manifest.catalogs || []).forEach(function (cat) {
        var extras = cat.extra || [];
        var required = extras.some(function (e) {
          return e.isRequired;
        }) || cat.extraRequired && cat.extraRequired.length;
        if (required) return;
        out.push({
          addon: addon,
          catalog: cat
        });
      });
    });
    return out;
  }
  function searchCatalogs() {
    var out = [];
    list().forEach(function (addon) {
      (addon.manifest.catalogs || []).forEach(function (cat) {
        var extras = cat.extra || [];
        var supports = extras.some(function (e) {
          return e.name === "search";
        }) || (cat.extraSupported || []).indexOf("search") >= 0;
        if (supports) out.push({
          addon: addon,
          catalog: cat
        });
      });
    });
    return out;
  }
  function catalogTitle(entry) {
    var typeName = {
      movie: t("Filmes"),
      series: t("Séries"),
      anime: t("Animes"),
      channel: t("Canais"),
      tv: "TV"
    }[entry.catalog.type] || entry.catalog.type;
    var name = entry.catalog.name || entry.catalog.id;
    return name + " · " + typeName;
  }
  function fetchCatalog(entry, extra) {
    return cachedJSON(url(entry.addon, "catalog", entry.catalog.type, entry.catalog.id, extra), 15 * 6e4, {
      timeout: 12e3
    }).then(function (r) {
      return r && r.metas || [];
    });
  }
  function fetchMeta(type, id) {
    var sources = withResource("meta", type, id);
    if (!sources.length) return Promise.reject(new Error(t("Nenhum addon fornece detalhes para {id}", {
      id: id
    })));
    var i = 0;
    var _next = function next() {
      if (i >= sources.length) throw new Error(t("Detalhes não encontrados"));
      var a = sources[i++];
      return cachedJSON(url(a, "meta", type, id), 30 * 6e4).then(function (r) {
        if (r && r.meta) return r.meta;
        return _next();
      }).catch(function () {
        return _next();
      });
    };
    return _next();
  }
  function fetchStreams(type, id, onAddon) {
    var sources = withResource("stream", type, id);
    return Promise.all(sources.map(function (a) {
      return getJSON(url(a, "stream", type, id), {
        timeout: 3e4
      }).then(function (r) {
        var streams = (r && r.streams || []).map(function (s) {
          return Object.assign({
            addon: a.manifest.name || a.manifest.id
          }, s);
        });
        if (onAddon) onAddon(a, streams);
        return streams;
      }).catch(function (e) {
        if (onAddon) onAddon(a, [], e);
        return [];
      });
    })).then(function (all2) {
      return all2.reduce(function (acc, x) {
        return acc.concat(x);
      }, []);
    });
  }
  function fetchSubtitles(type, id, extra, onAddon) {
    var sources = withResource("subtitles", type, id);
    return Promise.all(sources.map(function (a) {
      return getJSON(url(a, "subtitles", type, id, extra), {
        timeout: 15e3
      }).then(function (r) {
        return (r && r.subtitles || []).map(function (s) {
          return Object.assign({
            addon: a.manifest.name
          }, s);
        });
      }).catch(function () {
        return [];
      }).then(function (list2) {
        if (onAddon) onAddon(list2);
        return list2;
      });
    })).then(function (all2) {
      return all2.reduce(function (acc, x) {
        return acc.concat(x);
      }, []);
    });
  }

  // src/js/views/profiles.js
  var SESSION_PICKED = "kai.profilePicked";
  var SESSION_NEW = "kai.newProfile";
  function session(key, value) {
    try {
      if (value === void 0) return window.sessionStorage.getItem(key);
      if (value === null) window.sessionStorage.removeItem(key);else window.sessionStorage.setItem(key, value);
    } catch (e) {}
    return null;
  }
  function avatar(p, cls) {
    var initial = String(p.name || "?").trim().charAt(0).toUpperCase() || "?";
    return h("div.avatar", {
      cls: cls || "",
      style: {
        backgroundColor: p.color || COLORS[0]
      },
      text: initial
    });
  }
  function switchProfile(id) {
    setActiveProfile(id);
    session(SESSION_PICKED, "1");
    window.location.reload();
  }
  function askProfileName(title, initial, okLabel, onOk, onCancel) {
    var err = h("div.modal-text.err-text");
    var input = h("input.input", {
      type: "text",
      value: initial || "",
      placeholder: t("Ex.: Ana, Pedro, Sala"),
      maxlength: "20",
      focusable: true,
      "data-autofocus": ""
    });
    var submit = function submit() {
      var name = String(input.value || "").trim();
      if (!name) {
        err.textContent = t("Digite um nome para o perfil.");
        focus(input);
        return;
      }
      var dup = profiles().some(function (p) {
        return p.name.toLowerCase() === name.toLowerCase() && p.name !== initial;
      });
      if (dup) {
        err.textContent = t("Já existe um perfil com esse nome.");
        focus(input);
        return;
      }
      close();
      onOk(name);
    };
    input.__submit = submit;
    var box = h("div.modal-box.center", null, [h("h3", {
      text: title
    }), h("div.modal-text", null, input), err, h("div.modal-actions", {
      "data-group": ""
    }, [h("div.btn.primary", {
      focusable: true,
      text: okLabel || t("Continuar"),
      onSelect: submit
    }), h("div.btn", {
      focusable: true,
      text: t("Cancelar"),
      onSelect: function onSelect() {
        return close(), onCancel && onCancel();
      }
    })])]);
    var modal = h("div.modal", null, box);
    document.getElementById("app").appendChild(modal);
    var layer = pushLayer(modal, {
      onBack: function onBack() {
        return close(), onCancel && onCancel();
      }
    });
    focusFirst(modal);
    function close() {
      popLayer(layer);
      if (modal.parentNode) modal.parentNode.removeChild(modal);
    }
  }
  function createProfile() {
    askProfileName(t("Nome do novo perfil"), "", t("Criar perfil"), function (name) {
      var p = addProfile(name);
      session(SESSION_NEW, p.id);
      switchProfile(p.id);
    });
  }
  function isNewProfilePendingLogin() {
    return session(SESSION_NEW) === activeProfile().id;
  }
  function clearNewProfileFlag() {
    session(SESSION_NEW, null);
  }
  function needsPicker() {
    return profiles().length > 1 && settings().askProfile && !session(SESSION_PICKED);
  }
  function showPicker(onPicked) {
    var list2 = profiles();
    var active = activeProfile();
    var cards = list2.map(function (p) {
      return h("div.profile-card", {
        focusable: true,
        "data-autofocus": p.id === active.id ? "" : null,
        onSelect: function onSelect() {
          return pick2(p.id);
        }
      }, [avatar(p, "big"), h("div.profile-name", {
        text: p.name
      })]);
    });
    cards.push(h("div.profile-card", {
      focusable: true,
      onSelect: function onSelect() {
        return createProfile();
      }
    }, [h("div.avatar.big.add", {
      text: "+"
    }), h("div.profile-name", {
      text: t("Adicionar perfil")
    })]));
    var el = h("div.view.profile-picker", null, [h("div.boot-logo", {
      html: "Stremio <b>Kai</b>"
    }), h("h1", {
      text: t("Quem está assistindo?")
    }), h("div.profile-row", {
      "data-group": ""
    }, cards), h("p.profile-hint", {
      text: t("Cada perfil tem sua própria conta Stremio, com histórico e biblioteca separados.")
    })]);
    document.getElementById("app").appendChild(el);
    var layer = pushLayer(el, {
      onBack: function onBack() {
        return pick2(active.id);
      }
    });
    focusFirst(el);
    function pick2(id) {
      setActiveProfile(id);
      session(SESSION_PICKED, "1");
      popLayer(layer);
      if (el.parentNode) el.parentNode.removeChild(el);
      onPicked();
    }
  }

  // src/js/ui.js
  var toastTimer = null;
  function toast(msg, ms) {
    var el = document.getElementById("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      return el.classList.remove("show");
    }, ms || 3500);
  }
  function menu(title, options, opts) {
    var o = opts || {};
    var list2 = h("div.modal-list", {
      "data-scroll-y": "",
      "data-pad-y": "80"
    });
    options.forEach(function (opt) {
      list2.appendChild(h("div.opt", {
        focusable: true,
        cls: opt.checked ? "checked" : "",
        "data-autofocus": opt.checked ? "" : null,
        onSelect: function onSelect() {
          close();
          if (opt.onSelect) opt.onSelect(opt.value);
          if (o.onPick) o.onPick(opt.value, opt);
        }
      }, [opt.label, opt.sub ? h("small", {
        text: opt.sub
      }) : null]));
    });
    if (!options.length) list2.appendChild(h("div.modal-text", {
      text: o.empty || t("Nada por aqui.")
    }));
    var box = h("div.modal-box", {
      cls: o.center ? "center" : ""
    }, [h("h3", {
      text: title
    }), list2]);
    var modal = h("div.modal", null, box);
    document.getElementById("app").appendChild(modal);
    var layer = pushLayer(modal, {
      onBack: function onBack() {
        return close();
      },
      onKey: o.onKey
    });
    focusFirst(modal);
    var closed = false;
    function close() {
      if (closed) return;
      closed = true;
      popLayer(layer);
      if (modal.parentNode) modal.parentNode.removeChild(modal);
      if (o.onClose) o.onClose();
    }
    return {
      close: close,
      el: modal
    };
  }
  function confirmDialog(text, okLabel, onOk) {
    var box = h("div.modal-box.center", null, [h("h3", {
      text: text
    }), h("div.modal-actions", null, [h("div.btn.primary", {
      focusable: true,
      "data-autofocus": "",
      text: okLabel || "OK",
      onSelect: function onSelect() {
        return close(), onOk && onOk();
      }
    }), h("div.btn", {
      focusable: true,
      text: t("Cancelar"),
      onSelect: function onSelect() {
        return close();
      }
    })])]);
    var modal = h("div.modal", null, box);
    document.getElementById("app").appendChild(modal);
    var layer = pushLayer(modal, {
      onBack: function onBack() {
        return close();
      }
    });
    focusFirst(modal);
    function close() {
      popLayer(layer);
      if (modal.parentNode) modal.parentNode.removeChild(modal);
    }
  }
  var TABS = [{
    id: "home",
    label: "Início"
  }, {
    id: "search",
    label: "Buscar"
  }, {
    id: "library",
    label: "Biblioteca"
  }, {
    id: "calendar",
    label: "Calendário"
  }, {
    id: "settings",
    label: "Ajustes"
  }];
  function topbar(activeId, onTab) {
    var clock = h("div.clock");
    var tick = function tick() {
      return clock.textContent = timeHM(/* @__PURE__ */new Date());
    };
    tick();
    var timer = setInterval(tick, 2e4);
    var bar = h("div.topbar", {
      "data-group": ""
    }, [h("div.brand", {
      html: "Stremio <b>Kai</b>"
    }), TABS.map(function (tab) {
      return h("div.tab", {
        focusable: true,
        cls: tab.id === activeId ? "active" : "",
        text: t(tab.label),
        onSelect: function onSelect() {
          return onTab(tab.id);
        }
      });
    }), h("div.spacer"), profileButton(onTab), clock]);
    bar.__destroy = function () {
      return clearInterval(timer);
    };
    return bar;
  }
  function profileButton(onTab) {
    var chip = h("div.profile-chip", {
      focusable: true,
      onSelect: function onSelect() {
        return profileMenu(onTab);
      }
    });
    fillChip(chip);
    return chip;
  }
  function fillChip(chip) {
    var p = activeProfile();
    clear(chip);
    chip.appendChild(avatar(p, "small"));
    chip.appendChild(h("span", {
      text: p.name
    }));
  }
  function refreshProfileChips() {
    Array.prototype.forEach.call(document.querySelectorAll(".profile-chip"), fillChip);
  }
  function profileMenu(onTab) {
    var active = activeProfile();
    var opts = profiles().map(function (p) {
      return {
        label: p.name,
        sub: p.id === active.id ? t("Perfil atual") : t("Trocar para este perfil"),
        value: p.id,
        checked: p.id === active.id
      };
    });
    opts.push({
      label: t("+ Adicionar perfil"),
      sub: t("Com outra conta Stremio (histórico separado)"),
      value: "__add"
    });
    opts.push({
      label: t("Gerenciar perfis"),
      sub: t("Nome, cor, apagar"),
      value: "__manage"
    });
    menu(t("Perfis"), opts, {
      onPick: function onPick(v) {
        if (v === "__add") createProfile();else if (v === "__manage") onTab("settings");else if (v !== active.id) switchProfile(v);
      }
    });
  }
  function timeHM(d) {
    return ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
  }
  function fmtTime(sec) {
    if (!isFinite(sec) || sec < 0) sec = 0;
    var s = Math.floor(sec % 60);
    var m = Math.floor(sec / 60 % 60);
    var hh = Math.floor(sec / 3600);
    return (hh ? hh + ":" + ("0" + m).slice(-2) : m) + ":" + ("0" + s).slice(-2);
  }
  function card(item, opts) {
    var o = opts || {};
    var wrap = h("div.poster-wrap");
    var src = o.wide ? smallBackground(o.image || item.background || item.poster) : smallPoster(item.poster);
    if (src) {
      var im = h("img", {
        alt: ""
      });
      im.setAttribute("data-lazy", src);
      im.onerror = function () {
        im.style.display = "none";
        wrap.appendChild(h("div.ph", {
          text: item.name || ""
        }));
      };
      wrap.appendChild(im);
    } else wrap.appendChild(h("div.ph", {
      text: item.name || ""
    }));
    if (o.progress) wrap.appendChild(h("div.progress", null, h("i", {
      style: {
        width: Math.round(o.progress * 100) + "%"
      }
    })));
    if (o.badge) wrap.appendChild(h("div.badge", {
      text: o.badge
    }));
    return h("div.card", {
      focusable: true,
      cls: o.wide ? "wide" : "",
      onSelect: o.onSelect,
      onFocus: o.onFocus
    }, [wrap, h("div.name", {
      text: o.title || item.name || ""
    })]);
  }
  function spinnerLine(text) {
    return h("div.loading-line", null, [h("div.spinner.small"), text]);
  }

  // src/js/router.js
  var stack = [];
  var app = function app() {
    return document.getElementById("app");
  };
  var tabs = {};
  function show(view) {
    view.el.classList.remove("hidden");
    if (view.layer) {
      popLayer(view.layer);
    }
    view.layer = pushLayer(view.el, {
      onBack: function onBack() {
        return back();
      },
      onKey: view.onKey
    });
    if (view.restoreFocus && document.body.contains(view.restoreFocus)) focus(view.restoreFocus, {
      noScroll: true
    });else focusFirst(view.el);
    if (view.onShow) view.onShow();
    loadVisibleImages(view.el);
  }
  function hide(view) {
    view.restoreFocus = current2();
    if (view.layer) popLayer(view.layer);
    view.layer = null;
    view.el.classList.add("hidden");
    if (view.onHide) view.onHide();
    unloadImages(view.el);
  }
  function push(view) {
    var prev = stack[stack.length - 1];
    if (prev) hide(prev);
    if (!view.el.parentNode) app().appendChild(view.el);
    stack.push(view);
    show(view);
  }
  function pop() {
    if (stack.length <= 1) return false;
    var view = stack.pop();
    hide(view);
    if (!view.keepAlive) {
      if (view.destroy) view.destroy();
      if (view.el.parentNode) view.el.parentNode.removeChild(view.el);
    }
    show(stack[stack.length - 1]);
    return true;
  }
  function back() {
    var view = stack[stack.length - 1];
    if (view && view.onBack && view.onBack() === true) return;
    if (stack.length > 1) {
      pop();
      return;
    }
    if (view && view.tabId && view.tabId !== "home") {
      goTab("home");
      return;
    }
    confirmDialog(t("Sair do Stremio Kai?"), t("Sair"), function () {
      return platformBack();
    });
  }
  function goTab(id) {
    while (stack.length > 1) pop();
    var cur = stack[0];
    if (cur && cur.tabId === id) return;
    var view = tabs[id];
    if (!view) {
      view = registry[id]();
      view.tabId = id;
      view.keepAlive = true;
      tabs[id] = view;
    }
    if (cur) {
      hide(cur);
      stack.length = 0;
      if (cur.tabId !== "home") dropTab(cur.tabId);
    }
    if (!view.el.parentNode) app().appendChild(view.el);
    stack.push(view);
    show(view);
  }
  var registry = {};
  function registerTab(id, factory) {
    registry[id] = factory;
  }
  function tabView(id) {
    return tabs[id] || null;
  }
  function currentView() {
    return stack[stack.length - 1] || null;
  }
  function dropTab(id) {
    var v = tabs[id];
    if (!v) return;
    delete tabs[id];
    if (v.destroy) v.destroy();
    if (v.el.parentNode && stack.indexOf(v) < 0) v.el.parentNode.removeChild(v.el);
    if (v.layer) popLayer(v.layer);
  }

  // src/js/api/extras.js
  var TMDB = "https://api.themoviedb.org/3/";
  var TMDB_IMG = "https://image.tmdb.org/t/p/";
  var ARM = "https://arm.haglund.dev/api/v2/";
  function imdbOf(id) {
    var m = String(id || "").match(/^tt\d+/);
    return m ? m[0] : null;
  }
  function tmdbKey() {
    return (settings().tmdbKey || "").trim();
  }
  function hasTmdb() {
    return !!tmdbKey();
  }
  function tmdb(path, params) {
    var q = ["api_key=" + encodeURIComponent(tmdbKey())];
    Object.keys(params || {}).forEach(function (k) {
      return q.push(k + "=" + encodeURIComponent(params[k]));
    });
    return cachedJSON(TMDB + path + "?" + q.join("&"), 6 * 36e5, {
      quiet: true
    });
  }
  function digitalReleases(ymd2, region) {
    if (!tmdbKey()) return Promise.resolve(null);
    return tmdb("discover/movie", {
      with_release_type: 4,
      "release_date.gte": ymd2,
      "release_date.lte": ymd2,
      region: region,
      sort_by: "popularity.desc",
      include_adult: "false",
      language: apiLang()
    }).then(function (r) {
      return (r && r.results || []).map(function (m) {
        return {
          tmdb: m.id,
          name: m.title,
          poster: m.poster_path ? TMDB_IMG + "w342" + m.poster_path : null,
          score: m.vote_average ? Math.round(m.vote_average * 10) : 0
        };
      });
    });
  }
  function tmdbFind(imdb) {
    if (!tmdbKey() || !imdb) return Promise.resolve(null);
    return tmdb("find/" + imdb, {
      external_source: "imdb_id",
      language: apiLang()
    }).then(function (r) {
      var m = (r.movie_results || [])[0];
      var tv = (r.tv_results || [])[0];
      var hit = m || tv;
      if (!hit) return null;
      return {
        id: hit.id,
        type: m ? "movie" : "tv",
        overview: hit.overview || "",
        title: hit.title || hit.name || ""
      };
    });
  }
  function pickLogo(logos) {
    var pref = current() === "ar" ? ["ar", "en", null] : ["en", null];
    var _loop3 = function _loop3(i) {
        var l = (logos || []).find(function (x) {
          return x.iso_639_1 === pref[i];
        });
        if (l) return {
          v: TMDB_IMG + "w500" + l.file_path
        };
      },
      _ret;
    for (var i = 0; i < pref.length; i++) {
      _ret = _loop3(i);
      if (_ret) return _ret.v;
    }
    return null;
  }
  function localized(meta) {
    var imdb = imdbOf(meta.id);
    return tmdbFind(imdb).then(function (f) {
      if (!f) return null;
      return tmdb(f.type + "/" + f.id, {
        language: apiLang(),
        append_to_response: "credits,images",
        include_image_language: "en,ar,null"
      }).then(function (d) {
        return {
          tmdbId: f.id,
          tmdbType: f.type,
          title: d.title || d.name || f.title,
          overview: d.overview || f.overview,
          tagline: d.tagline || "",
          logo: pickLogo(d.images && d.images.logos),
          cast: (d.credits && d.credits.cast || []).slice(0, 14).map(function (c) {
            return {
              id: c.id,
              name: c.name,
              character: c.character || "",
              photo: c.profile_path ? TMDB_IMG + "w185" + c.profile_path : null
            };
          })
        };
      });
    });
  }
  function person(id) {
    return tmdb("person/" + id, {
      language: apiLang(),
      append_to_response: "combined_credits"
    }).then(function (p) {
      var bio = p.biography ? Promise.resolve(p.biography) : current() === "ar" ? tmdb("person/" + id, {
        language: "en-US"
      }).then(function (e) {
        return e && e.biography || "";
      }) : Promise.resolve("");
      return bio.then(function (biography) {
        var seen = {};
        var credits = (p.combined_credits && p.combined_credits.cast || []).concat((p.combined_credits && p.combined_credits.crew || []).filter(function (c) {
          return c.job === "Director";
        })).filter(function (c) {
          var key = c.media_type + c.id;
          if (!c.poster_path || seen[key] || c.media_type !== "movie" && c.media_type !== "tv") return false;
          if (c.media_type === "tv" && /^(Self|Himself|Herself|Host)/i.test(c.character || "")) return false;
          seen[key] = true;
          return true;
        }).sort(function (a, b) {
          return (b.popularity || 0) - (a.popularity || 0);
        }).map(function (c) {
          return {
            tmdb: c.id,
            type: c.media_type,
            name: c.title || c.name,
            poster: TMDB_IMG + "w342" + c.poster_path,
            year: String(c.release_date || c.first_air_date || "").slice(0, 4),
            role: c.character || c.job || ""
          };
        });
        return {
          name: p.name,
          photo: p.profile_path ? TMDB_IMG + "h632" + p.profile_path : null,
          birthday: p.birthday,
          deathday: p.deathday,
          place: p.place_of_birth || "",
          department: p.known_for_department || "",
          biography: biography,
          credits: credits
        };
      });
    });
  }
  function searchPeople(query) {
    if (!tmdbKey()) return Promise.resolve([]);
    return tmdb("search/person", {
      query: query,
      include_adult: "false",
      language: apiLang()
    }).then(function (r) {
      return (r && r.results || []).filter(function (p) {
        return p.profile_path && (p.known_for_department === "Acting" || p.known_for_department === "Directing") && p.popularity > 1;
      }).slice(0, 12).map(function (p) {
        return {
          id: p.id,
          name: p.name,
          photo: TMDB_IMG + "w185" + p.profile_path
        };
      });
    });
  }
  function tmdbImdb(type, id) {
    return tmdb(type + "/" + id + "/external_ids", {}).then(function (r) {
      return r && r.imdb_id || null;
    });
  }
  function seasonPt(tmdbId, season) {
    if (!tmdbKey()) return Promise.resolve({});
    return tmdb("tv/" + tmdbId + "/season/" + season, {
      language: apiLang()
    }).then(function (r) {
      var map = {};
      (r.episodes || []).forEach(function (e) {
        map[e.episode_number] = {
          name: e.name,
          overview: e.overview,
          still: e.still_path ? TMDB_IMG + "w300" + e.still_path : null
        };
      });
      return map;
    });
  }
  function mdblist(meta) {
    var key = (settings().mdblistKey || "").trim();
    var imdb = imdbOf(meta.id);
    if (!key || !imdb) return Promise.resolve([]);
    var type = meta.type === "series" ? "show" : "movie";
    return getJSONViaProxy("https://api.mdblist.com/imdb/" + type + "/" + imdb + "?apikey=" + encodeURIComponent(key), {
      timeout: 12e3
    }).then(function (d) {
      var out = [];
      (d.ratings || []).forEach(function (r) {
        var v = r.value;
        if (v === null || v === void 0 || v === 0) return;
        var src = String(r.source || "").toLowerCase();
        if (src === "tomatoes") out.push({
          cls: "rt",
          label: "RT",
          value: v + "%"
        });else if (src === "popcorn" || src === "tomatoesaudience") out.push({
          cls: "rt",
          label: t("Público"),
          value: v + "%"
        });else if (src === "metacritic") out.push({
          cls: "mc",
          label: "MC",
          value: String(v)
        });else if (src === "trakt") out.push({
          cls: "trakt",
          label: "Trakt",
          value: v + "%"
        });else if (src === "letterboxd") out.push({
          cls: "lb",
          label: "LB",
          value: Number(v).toFixed(1)
        });else if (src === "tmdb") out.push({
          cls: "tmdb",
          label: "TMDB",
          value: v + "%"
        });
      });
      return out;
    }).catch(function () {
      return [];
    });
  }
  function anilistScore(meta) {
    var m = String(meta.id).match(/^(kitsu|mal|anilist):(\d+)/);
    var idPromise;
    if (m && m[1] === "anilist") idPromise = Promise.resolve({
      anilist: parseInt(m[2], 10)
    });else if (m) idPromise = getJSON(ARM + "ids?source=" + (m[1] === "mal" ? "myanimelist" : m[1]) + "&id=" + m[2], {
      quiet: true
    });else if (imdbOf(meta.id)) idPromise = getJSON(ARM + "imdb?id=" + imdbOf(meta.id), {
      quiet: true
    }).then(function (l) {
      return Array.isArray(l) && l[0] || null;
    });else return Promise.resolve([]);
    return idPromise.then(function (ids) {
      if (!ids || !ids.anilist) return [];
      return postJSON("https://graphql.anilist.co", {
        query: "query($id:Int){Media(id:$id,type:ANIME){averageScore}}",
        variables: {
          id: ids.anilist
        }
      }, {
        quiet: true
      }).then(function (r) {
        var sc = r && r.data && r.data.Media && r.data.Media.averageScore;
        return sc ? [{
          cls: "al",
          label: "AniList",
          value: sc + "%"
        }] : [];
      });
    }).catch(function () {
      return [];
    });
  }
  function ratings(meta, anime) {
    var base = meta.imdbRating ? [{
      cls: "imdb",
      label: "IMDb",
      value: String(meta.imdbRating)
    }] : [];
    return Promise.all([mdblist(meta), anime ? anilistScore(meta) : Promise.resolve([])]).then(function (r) {
      return base.concat(r[0], r[1]);
    });
  }

  // src/js/api/hero.js
  var SOURCES = [{
    id: "cinemeta",
    name: "Cinemeta · Populares"
  }, {
    id: "cinemeta-featured",
    name: "Cinemeta · Mais bem avaliados"
  }, {
    id: "mdblist",
    name: "MDBList · Tendências (Snoak)"
  }, {
    id: "off",
    name: "Desligado"
  }];
  var CINEMETA2 = "https://cinemeta-catalogs.strem.io/top/catalog/";
  var MDBLIST = {
    movie: "https://mdblist.com/lists/snoak/trending-movies/json",
    series: "https://mdblist.com/lists/snoak/trakt-s-trending-shows/json"
  };
  function background(id) {
    return "https://images.metahub.space/background/medium/" + id + "/img";
  }
  function logo(id) {
    return "https://images.metahub.space/logo/medium/" + id + "/img";
  }
  function fromMeta(m) {
    return {
      id: m.id || m.imdb_id,
      type: m.type,
      name: m.name,
      description: m.description || "",
      year: m.releaseInfo || m.year || "",
      genres: m.genres || m.genre || [],
      rating: m.imdbRating || "",
      runtime: m.runtime || "",
      background: m.background || background(m.id || m.imdb_id),
      logo: m.logo || logo(m.id || m.imdb_id),
      poster: m.poster
    };
  }
  function interleave(a, b) {
    var out = [];
    for (var i = 0; i < Math.max(a.length, b.length); i++) {
      if (a[i]) out.push(a[i]);
      if (b[i]) out.push(b[i]);
    }
    return out;
  }
  function cinemeta(catalogId) {
    return Promise.all(["movie", "series"].map(function (t2) {
      return cachedJSON(CINEMETA2 + t2 + "/" + catalogId + ".json", 36e5).then(function (r) {
        return (r.metas || []).slice(0, 8).map(fromMeta);
      }).catch(function () {
        return [];
      });
    })).then(function (r) {
      return interleave(r[0], r[1]);
    });
  }
  function mdblist2() {
    return Promise.all(["movie", "series"].map(function (t2) {
      return getJSONViaProxy(MDBLIST[t2], {
        timeout: 15e3
      }).then(function (list2) {
        return Promise.all((list2 || []).filter(function (x) {
          return x.imdb_id;
        }).slice(0, 6).map(function (x) {
          return fetchMeta(t2, x.imdb_id).then(fromMeta).catch(function () {
            return null;
          });
        }));
      }).then(function (l) {
        return l.filter(Boolean);
      });
    })).then(function (r) {
      return interleave(r[0], r[1]);
    });
  }
  function localize(items) {
    if (!hasTmdb()) return items;
    return Promise.all(items.map(function (it) {
      return tmdbFind(it.id).then(function (f) {
        if (f && f.overview) it.description = f.overview;
        if (f && f.title) it.name = f.title;
        return it;
      }).catch(function () {
        return it;
      });
    }));
  }
  function load2() {
    return loadRaw().then(function (items) {
      return localize(items.slice(0, 12));
    });
  }
  function loadRaw() {
    var src = settings().heroSource;
    if (src === "off") return Promise.resolve([]);
    if (src === "mdblist") {
      return mdblist2().then(function (l) {
        return l.length ? l : cinemeta("top");
      }).catch(function () {
        return cinemeta("top");
      });
    }
    return cinemeta(src === "cinemeta-featured" ? "imdbRating" : "top");
  }

  // src/js/lib/subs.js
  function toSec(ts) {
    var m = ts.trim().replace(",", ".").match(/(?:(\d+):)?(\d+):(\d+(?:\.\d+)?)/);
    if (!m) return NaN;
    return parseInt(m[1] || "0", 10) * 3600 + parseInt(m[2], 10) * 60 + parseFloat(m[3]);
  }
  function parse(text) {
    var cues = [];
    var blocks = String(text).replace(/^﻿/, "").replace(/\r\n?/g, "\n").split(/\n{2,}/);
    for (var i = 0; i < blocks.length; i++) {
      var lines = blocks[i].split("\n");
      var j = 0;
      while (j < lines.length && lines[j].indexOf("-->") < 0) j++;
      if (j >= lines.length) continue;
      var parts = lines[j].split("-->");
      var start3 = toSec(parts[0]);
      var end = toSec(parts[1].trim().split(/\s+/)[0]);
      if (!isFinite(start3) || !isFinite(end)) continue;
      var body = lines.slice(j + 1).join("\n").replace(/\{\\[^}]*\}/g, "").trim();
      if (body) cues.push({
        start: start3,
        end: end,
        text: sanitize(body)
      });
    }
    cues.sort(function (a, b) {
      return a.start - b.start;
    });
    return cues;
  }
  function sanitize(s) {
    var esc = s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return esc.replace(/&lt;(\/?)(i|b|u)&gt;/gi, "<$1$2>").replace(/&lt;\/?[^&]*&gt;/g, "");
  }
  function load3(url2, fallbackUrl) {
    return getText(url2, {
      timeout: 2e4
    }).catch(function (e) {
      if (fallbackUrl) return getText(fallbackUrl, {
        timeout: 2e4
      });
      throw e;
    }).then(parse);
  }
  function Renderer(el) {
    var cues = [];
    var _offset = 0;
    var lastHtml = "";
    var idx = 0;
    function find2(t2) {
      if (idx >= cues.length || cues[idx] && cues[idx].start > t2) idx = 0;
      while (idx < cues.length && cues[idx].end < t2) idx++;
      var out = [];
      for (var k = idx; k < cues.length && cues[k].start <= t2; k++) {
        if (cues[k].end >= t2) out.push(cues[k].text);
      }
      return out.join("\n");
    }
    return {
      set: function set(c) {
        cues = c || [];
        idx = 0;
        lastHtml = "";
        el.innerHTML = "";
      },
      clear: function clear() {
        cues = [];
        lastHtml = "";
        el.innerHTML = "";
      },
      active: function active() {
        return cues.length > 0;
      },
      setOffset: function setOffset(sec) {
        return _offset = sec;
      },
      offset: function offset() {
        return _offset;
      },
      update: function update(t2) {
        if (!cues.length) return;
        var html = find2(t2 - _offset);
        if (html === lastHtml) return;
        lastHtml = html;
        el.innerHTML = html ? "<span>" + html + "</span>" : "";
      }
    };
  }

  // src/js/lib/substyle.js
  var FONTS = [{
    id: "nata",
    label: "Nata Sans (padrão Kai)",
    css: "'Nata Sans', 'Montserrat', sans-serif"
  }, {
    id: "montserrat",
    label: "Montserrat",
    css: "'Montserrat', sans-serif"
  }, {
    id: "tv",
    label: "Fonte da TV (LG)",
    css: "'LG Display', 'Museo Sans', sans-serif"
  }, {
    id: "classic",
    label: "Clássica (Arial)",
    css: "Arial, Helvetica, sans-serif"
  }];
  var STYLES = [{
    id: "kai",
    label: "Contorno fino + sombra (Kai)"
  }, {
    id: "outline",
    label: "Contorno grosso"
  }, {
    id: "shadow",
    label: "Só sombra"
  }, {
    id: "box",
    label: "Caixa de fundo"
  }];
  var COLORS2 = [{
    id: "#ffffff",
    label: "Branco",
    webos: "white"
  }, {
    id: "#ffe14d",
    label: "Amarelo",
    webos: "yellow"
  }, {
    id: "#dcdcdc",
    label: "Cinza claro",
    webos: "white"
  }, {
    id: "#8ff0ff",
    label: "Ciano",
    webos: "blue"
  }];
  var POSITIONS = [{
    id: "low",
    label: "Baixa",
    bottom: 56,
    webos: -3
  }, {
    id: "mid",
    label: "Média",
    bottom: 120,
    webos: 0
  }, {
    id: "high",
    label: "Alta",
    bottom: 200,
    webos: 2
  }];
  var SIZES = [70, 85, 100, 115, 130, 150];
  var BASE_PX = 64;
  var SHADOWS = {
    kai: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 2px 2px 3px rgba(0,0,0,0.9)",
    outline: "-3px -3px 0 #000, 0 -3px 0 #000, 3px -3px 0 #000, 3px 0 0 #000, 3px 3px 0 #000, 0 3px 0 #000, -3px 3px 0 #000, -3px 0 0 #000, 0 0 8px rgba(0,0,0,0.8)",
    shadow: "3px 3px 6px rgba(0,0,0,0.95), 0 0 10px rgba(0,0,0,0.6)",
    box: "none"
  };
  function find(list2, id) {
    return list2.find(function (x) {
      return x.id === id;
    }) || list2[0];
  }
  function apply(el, s) {
    var font = find(FONTS, s.subtitleFont);
    var pos = find(POSITIONS, s.subtitlePosition);
    el.style.fontFamily = font.css;
    el.style.fontSize = Math.round(BASE_PX * ((s.subtitleSize || 100) / 100)) + "px";
    el.style.fontWeight = s.subtitleBold === false ? "500" : "700";
    el.style.color = s.subtitleColor || "#ffffff";
    el.style.textShadow = SHADOWS[s.subtitleStyle] || SHADOWS.kai;
    el.style.bottom = pos.bottom + "px";
    el.classList.toggle("box", s.subtitleStyle === "box");
  }
  function applyNative(mediaId, s) {
    if (!hasLuna() || !mediaId) return;
    var size = s.subtitleSize || 100;
    var fontSize = size <= 85 ? 0 : size <= 100 ? 1 : size <= 125 ? 2 : size <= 150 ? 3 : 4;
    var color = find(COLORS2, s.subtitleColor).webos;
    var box = s.subtitleStyle === "box";
    var calls = {
      setSubtitleCharacterColor: {
        charColor: color
      },
      setSubtitleFontSize: {
        fontSize: fontSize
      },
      setSubtitlePosition: {
        position: find(POSITIONS, s.subtitlePosition).webos
      },
      setSubtitleBackgroundColor: {
        bgColor: "black"
      },
      setSubtitleBackgroundOpacity: {
        bgOpacity: box ? 190 : 0
      },
      setSubtitleCharacterOpacity: {
        charOpacity: 255
      }
    };
    Object.keys(calls).forEach(function (m) {
      luna("luna://com.webos.media", m, Object.assign({
        mediaId: mediaId
      }, calls[m])).catch(function () {});
    });
  }
  function labels(s) {
    return {
      font: find(FONTS, s.subtitleFont).label,
      style: find(STYLES, s.subtitleStyle).label,
      color: find(COLORS2, s.subtitleColor).label,
      position: find(POSITIONS, s.subtitlePosition).label
    };
  }

  // src/js/api/skip.js
  var INTRODB = "https://api.introdb.app/segments";
  var ANISKIP = "https://api.aniskip.com/v2/skip-times/";
  var ARM2 = "https://arm.haglund.dev/api/v2/";
  function getJSONWithProxy(url2) {
    return getJSONViaProxy(url2, {
      timeout: 1e4
    });
  }
  function fromIntroDb(data) {
    var out = [];
    var map = {
      intro: "intro",
      recap: "recap",
      outro: "outro"
    };
    Object.keys(map).forEach(function (k) {
      var s = data && data[k];
      if (s && isFinite(s.start_sec) && isFinite(s.end_sec) && s.end_sec > s.start_sec) out.push({
        type: map[k],
        start: s.start_sec,
        end: s.end_sec,
        source: "IntroDB"
      });
    });
    return out;
  }
  function fromAniSkip(data) {
    var map = {
      op: "intro",
      "mixed-op": "intro",
      recap: "recap",
      ed: "outro",
      "mixed-ed": "outro"
    };
    return (data && data.found && data.results || []).filter(function (r) {
      return map[r.skipType] && r.interval;
    }).map(function (r) {
      return {
        type: map[r.skipType],
        start: r.interval.startTime,
        end: r.interval.endTime,
        source: "AniSkip"
      };
    });
  }
  function parseAnimeId(videoId) {
    var m = String(videoId).match(/^(kitsu|mal|anilist):(\d+)(?::(\d+))?/);
    return m ? {
      source: m[1] === "mal" ? "myanimelist" : m[1],
      id: m[2],
      episode: m[3] ? parseInt(m[3], 10) : 1
    } : null;
  }
  var malCache = {};
  function malFromAnime(a) {
    if (a.source === "myanimelist") return Promise.resolve(parseInt(a.id, 10));
    var key = a.source + ":" + a.id;
    if (!malCache[key]) malCache[key] = getJSON(ARM2 + "ids?source=" + a.source + "&id=" + a.id, {
      quiet: true
    }).then(function (r) {
      return r && r.myanimelist || null;
    });
    return malCache[key];
  }
  function malFromImdb(imdb, season) {
    var key = imdb + ":" + season;
    if (!malCache[key]) malCache[key] = getJSON(ARM2 + "imdb?id=" + imdb, {
      quiet: true
    }).then(function (list2) {
      var arr = Array.isArray(list2) ? list2 : [];
      var hit = arr.find(function (x) {
        return x.myanimelist && (x["thetvdb-season"] === season || x["themoviedb-season"] === season);
      }) || (arr.length === 1 ? arr[0] : null);
      return hit ? hit.myanimelist : null;
    }).catch(function () {
      return null;
    });
    return malCache[key];
  }
  function isAnime(meta) {
    var g = (meta.genres || meta.genre || []).map(function (x) {
      return String(x).toLowerCase();
    });
    return /^(kitsu|mal|anilist):/.test(meta.id) || g.indexOf("anime") >= 0 || g.indexOf("animation") >= 0 && /japan/i.test(meta.country || "");
  }
  function getSegments(meta, video, durationSec) {
    var anime = parseAnimeId(video.id);
    var imdb = /^tt\d+/.test(meta.id) ? meta.id.match(/^tt\d+/)[0] : null;
    var season = video.season;
    var episode = video.episode;
    var intro = imdb ? getJSONWithProxy(INTRODB + "?imdb_id=" + imdb + (isFinite(season) && isFinite(episode) ? "&season=" + season + "&episode=" + episode : "")).then(fromIntroDb).catch(function () {
      return [];
    }) : Promise.resolve([]);
    return intro.then(function (segs) {
      if (segs.length) return segs;
      var malPromise = null;
      var ep = episode;
      if (anime) {
        malPromise = malFromAnime(anime);
        ep = anime.episode;
      } else if (imdb && isAnime(meta) && isFinite(episode)) malPromise = malFromImdb(imdb, season || 1);
      if (!malPromise) return [];
      return malPromise.then(function (mal) {
        if (!mal || !ep) return [];
        var q = ["op", "ed", "recap", "mixed-op", "mixed-ed"].map(function (t2) {
          return "types%5B%5D=" + t2;
        }).join("&");
        return getJSON(ANISKIP + mal + "/" + ep + "?" + q + "&episodeLength=" + Math.round(durationSec || 0), {
          quiet: true
        }).then(fromAniSkip);
      }).catch(function () {
        return [];
      });
    }).then(function (segs) {
      if (segs.length) log.info("Pular: " + segs.map(function (s) {
        return s.type + " " + s.start.toFixed(0) + "-" + s.end.toFixed(0) + " (" + s.source + ")";
      }).join(", "));
      return segs;
    });
  }

  // src/js/lib/watched.js
  var KEY2 = "watched";
  var DONE = 0.9;
  var MAX = 3e3;
  var cache2 = null;
  var cacheFor = null;
  function all() {
    var id = activeProfile().id;
    if (cacheFor !== id) {
      cache2 = get(KEY2, {}) || {};
      cacheFor = id;
    }
    return cache2;
  }
  function record(videoId, fraction) {
    if (!videoId || !(fraction > 0.02)) return;
    var map = all();
    delete map[videoId];
    map[videoId] = fraction >= DONE ? 1 : Math.round(fraction * 1e3) / 1e3;
    var keys = Object.keys(map);
    for (var i = 0; i < keys.length - MAX; i++) delete map[keys[i]];
    set(KEY2, map);
  }
  function isWatched(videoId) {
    return all()[videoId] === 1;
  }
  function progress(videoId) {
    var v = all()[videoId];
    return v && v < 1 ? v : 0;
  }

  // src/js/lib/phone.js
  var import_qrcode_generator = __toESM(require_qrcode(), 1);
  var PORT = 8095;
  var BASE = "http://127.0.0.1:" + PORT;
  var ENTER = 13;
  var last = 0;
  var started = false;
  function request2(url2, timeout) {
    return new Promise(function (resolve, reject) {
      var x = new XMLHttpRequest();
      x.open("GET", url2);
      x.timeout = timeout;
      x.onload = function () {
        try {
          resolve(x.status === 200 ? JSON.parse(x.responseText) : null);
        } catch (e) {
          reject(e);
        }
      };
      x.onerror = x.ontimeout = function () {
        return reject(new Error("remote service unreachable"));
      };
      x.send();
    });
  }
  function fireKey(code) {
    var e = document.createEvent("Event");
    e.initEvent("keydown", true, true);
    e.keyCode = code;
    e.which = code;
    (document.activeElement || document.body).dispatchEvent(e);
  }
  function typeText(text, submit) {
    var el = document.activeElement;
    if (!el || el.tagName !== "INPUT" && el.tagName !== "TEXTAREA") {
      toast(t("Selecione um campo de texto na TV primeiro."), 4e3);
      return;
    }
    el.value = text;
    var ev = document.createEvent("Event");
    ev.initEvent("input", true, true);
    el.dispatchEvent(ev);
    if (submit) fireKey(ENTER);
  }
  function nowPlaying(state) {
    var x = new XMLHttpRequest();
    x.open("POST", BASE + "/api/state");
    x.onerror = function () {};
    x.send(JSON.stringify(state || null));
  }
  function browse(data) {
    var x = new XMLHttpRequest();
    x.open("POST", BASE + "/api/browse");
    x.onerror = function () {};
    x.send(JSON.stringify(data));
  }
  var openHandler = null;
  function onOpen(fn) {
    openHandler = fn;
  }
  var seekHandler = null;
  function onSeek(fn) {
    seekHandler = fn;
  }
  var searchHandler = null;
  function onSearch(fn) {
    searchHandler = fn;
  }
  function handle(ev) {
    if (ev.type === "key") fireKey(ev.code);else if (ev.type === "text") typeText(ev.text, ev.submit);else if (ev.type === "search" && searchHandler && ev.text) searchHandler(ev.text);else if (ev.type === "seek" && seekHandler) seekHandler(ev.to);else if (ev.type === "open" && openHandler && ev.item) openHandler(ev);
  }
  function poll(wait) {
    setTimeout(function () {
      request2(BASE + "/api/events?since=" + last, 35e3).then(function (r) {
        if (r) {
          (r.events || []).forEach(handle);
          last = r.last || last;
        }
        poll(0);
      }).catch(function () {
        return poll(Math.min((wait || 2e3) * 2, 6e4));
      });
    }, wait);
  }
  function startService() {
    var m = location.pathname.match(/\/module\/([^/]+)\//);
    if (!m || typeof WebSocket === "undefined") return false;
    try {
      var ws = new WebSocket("ws://127.0.0.1:8081");
      ws.onopen = function () {
        ws.send(JSON.stringify({
          type: 6,
          payload: {
            fullName: decodeURIComponent(m[1]),
            serviceFile: "dist/remote-service.js"
          }
        }));
        setTimeout(function () {
          return ws.close();
        }, 1e3);
      };
      ws.onerror = function () {};
      return true;
    } catch (e) {
      return false;
    }
  }
  function start() {
    if (started) return;
    started = true;
    request2(BASE + "/api/info", 3e3).then(function (r) {
      if (r) last = r.last || 0;
    }).catch(function () {
      return startService();
    }).then(function () {
      return poll(0);
    });
  }
  function info() {
    var get2 = function get2() {
      return request2(BASE + "/api/info", 4e3).then(function (r) {
        return r && r.ip ? {
          ip: r.ip,
          port: r.port,
          pin: r.pin,
          url: "http://" + r.ip + ":" + r.port + "/#pin=" + r.pin
        } : null;
      }).catch(function () {
        return null;
      });
    };
    return get2().then(function (i) {
      return i || !startService() ? i : new Promise(function (r) {
        return setTimeout(r, 5e3);
      }).then(get2);
    });
  }
  function qrImage(text, size) {
    var qr = (0, import_qrcode_generator.default)(0, "M");
    qr.addData(text);
    qr.make();
    var cell = Math.max(2, Math.floor(size / (qr.getModuleCount() + 8)));
    return qr.createDataURL(cell, cell * 4);
  }

  // src/js/views/player.js
  var HIDE_MS = 5e3;
  var SAVE_MS = 15e3;
  var LANG_NAMES = {
    por: "Português",
    pob: "Português (BR)",
    pt: "Português",
    "pt-br": "Português (BR)",
    eng: "Inglês",
    en: "Inglês",
    spa: "Espanhol",
    es: "Espanhol",
    jpn: "Japonês",
    ja: "Japonês",
    fre: "Francês",
    fra: "Francês",
    fr: "Francês",
    ger: "Alemão",
    deu: "Alemão",
    de: "Alemão",
    ita: "Italiano",
    it: "Italiano",
    kor: "Coreano",
    ko: "Coreano",
    chi: "Chinês",
    zho: "Chinês",
    rus: "Russo",
    ara: "Árabe",
    hin: "Hindi",
    und: "Indefinido"
  };
  function langName(code) {
    if (!code) return t("Desconhecido");
    var name = LANG_NAMES[String(code).toLowerCase()];
    return name ? t(name) : code;
  }
  function openPlayer(opts) {
    push(PlayerView(opts));
  }
  function PlayerView(opts) {
    var meta = opts.meta;
    var video = opts.video;
    var stream = opts.stream;
    var settings2 = settings();
    var videoEl = h("video", {
      preload: "auto"
    });
    var subsEl = h("div.subs");
    var titleEl = h("div.p-title");
    var clockEl = h("div.p-clock");
    var posEl = h("div.pos");
    var bufEl = h("div.buf");
    var knobEl = h("div.knob");
    var seekLabel = h("div.seek-label");
    var bar = h("div.p-bar", {
      focusable: true,
      onSelect: function onSelect() {
        return togglePlay();
      }
    }, [bufEl, posEl, knobEl, seekLabel]);
    var curTimeEl = h("span");
    var durEl = h("span");
    var playBtn = h("div.btn", {
      focusable: true,
      onSelect: function onSelect() {
        return togglePlay();
      }
    });
    var audioBtn = h("div.btn", {
      focusable: true,
      html: '<span class="ico">♫</span>' + t("Áudio"),
      onSelect: function onSelect() {
        return audioMenu();
      }
    });
    var subsBtn = h("div.btn", {
      focusable: true,
      html: '<span class="ico">≡</span>' + t("Legendas"),
      onSelect: function onSelect() {
        return subsMenu();
      }
    });
    var srcBtn = h("div.btn", {
      focusable: true,
      html: '<span class="ico">⇄</span>' + t("Fontes"),
      onSelect: function onSelect() {
        return sourcesMenu();
      }
    });
    var nextBtn = h("div.btn", {
      focusable: true,
      html: '<span class="ico">⏭</span>' + t("Próximo"),
      onSelect: function onSelect() {
        return playNext();
      }
    });
    var buttons = h("div.p-buttons", {
      "data-group": ""
    }, [playBtn, audioBtn, subsBtn, srcBtn, nextBtn]);
    var spinner = h("div.p-center", null, h("div.spinner"));
    var msgEl = h("div.p-msg");
    var skipFill = h("i");
    var skipBtn = h("div.btn", {
      focusable: true,
      onSelect: function onSelect() {
        return doSkip();
      }
    });
    var skipBox = h("div.p-skip", null, [skipBtn, h("div.bar", null, skipFill)]);
    var overlay = h("div.p-overlay", null, [h("div.p-top", null, [titleEl, clockEl]), h("div.p-bottom", null, [bar, h("div.p-times", null, [curTimeEl, h("div.spacer"), durEl]), buttons])]);
    var upNextTitle = h("div.un-title");
    var upNextCount = h("div.un-count");
    var upNextPlay = h("div.btn.primary", {
      focusable: true,
      onSelect: function onSelect() {
        return upNextGo();
      }
    }, [h("span.ico", {
      text: "▶"
    }), t("Assistir agora")]);
    var upNextCancel = h("div.btn", {
      focusable: true,
      onSelect: function onSelect() {
        return upNextStop(true);
      }
    }, t("Cancelar"));
    var upNextBox = h("div.p-upnext", null, [h("div.un-label", {
      text: t("A seguir")
    }), upNextTitle, upNextCount, h("div.un-buttons", {
      "data-group": ""
    }, [upNextPlay, upNextCancel])]);
    var el = h("div.view.player", null, [videoEl, subsEl, overlay, skipBox, upNextBox, spinner, msgEl]);
    var renderer = Renderer(subsEl);
    apply(subsEl, settings2);
    var alive = true;
    var controlsOn = false;
    var hideTimer = null;
    var ticker = null;
    var saveTimer = null;
    var watchTimer = null;
    var statusTimer = null;
    var mediaUrl = "";
    var viaServer = false;
    var lastTick = 0;
    var watchedDelta = 0;
    var pendingStart = opts.startTime || 0;
    var seekTarget = null;
    var seekCommitTimer = null;
    var seekRepeats = 0;
    var embedded = null;
    var addonSubs = null;
    var currentSub = {
      kind: "off"
    };
    var currentAudio = null;
    var triedTranscode = false;
    var seriesInfo = function seriesInfo() {
      return opts.isSeries ? {
        season: video.season,
        episode: video.episode
      } : null;
    };
    function setTitle() {
      clear(titleEl);
      titleEl.appendChild(document.createTextNode(meta.name || ""));
      if (opts.isSeries) titleEl.appendChild(h("small", {
        text: epLabel(video.season, video.episode) + " · " + (video.name || video.title || "")
      }));
      nextBtn.style.display = opts.isSeries && nextVideo() ? "" : "none";
    }
    function nextVideo() {
      var vids = sortedVideos(meta);
      var i = vids.findIndex(function (v) {
        return v.id === video.id;
      });
      return i >= 0 && i + 1 < vids.length ? vids[i + 1] : null;
    }
    function start3() {
      setTitle();
      showSpinner(true);
      message("");
      embedded = null;
      tracksPromise = null;
      addonSubs = null;
      renderer.clear();
      currentSub = {
        kind: "off"
      };
      segments = [];
      segmentsLoaded = false;
      if (typeof upNextStop === "function") upNextStop(false);
      upNextCancelled = false;
      nativeOffDone = false;
      hideSkip();
      toPlayable(stream, seriesInfo()).then(function (res) {
        if (!alive) return;
        mediaUrl = res.url;
        viaServer = res.viaServer;
        log.info("Tocando", mediaUrl);
        hasPlayed = false;
        videoEl.autoplay = true;
        videoEl.src = mediaUrl;
        freeBackgroundMemory();
        loadSubtitles();
      }).catch(function (e) {
        return fail(e.message);
      });
    }
    var tracksPromise = null;
    function loadEmbeddedTracks() {
      if (!isAvailable()) return Promise.resolve(null);
      if (!tracksPromise) {
        var forUrl = mediaUrl;
        tracksPromise = tracks(mediaUrl).then(function (tracks2) {
          if (!alive || !tracks2 || forUrl !== mediaUrl) return null;
          embedded = tracks2;
          log.info("Faixas embutidas", JSON.stringify(tracks2));
          return tracks2;
        }).catch(function () {
          tracksPromise = null;
          return null;
        });
      }
      return tracksPromise;
    }
    function loadSubtitles() {
      var forVideo = video;
      addonSubs = null;
      fetchSubtitles(meta.type, video.id, {}, function (list2) {
        if (!alive || forVideo !== video) return;
        addonSubs = (addonSubs || []).concat(list2);
        autoPick();
      }).catch(function () {
        if (!addonSubs) addonSubs = [];
      });
    }
    var autoDone = {
      sub: false,
      audio: false
    };
    function autoPick() {
      var prefSubs = (settings2.subtitleLangs || []).map(function (x) {
        return x.toLowerCase();
      });
      var prefAudio = (settings2.audioLangs || []).map(function (x) {
        return x.toLowerCase();
      });
      if (!autoDone.audio && prefAudio.length && embedded && embedded.audio.length > 1) {
        autoDone.audio = true;
        var already = embedded.audio[0] && prefAudio.indexOf(String(embedded.audio[0].lang).toLowerCase()) >= 0;
        if (!already) {
          var idx = embedded.audio.findIndex(function (tr) {
            return prefAudio.indexOf(String(tr.lang).toLowerCase()) >= 0;
          });
          if (idx > 0) selectEmbeddedAudio(idx);
        }
      }
      if (autoDone.sub || !settings2.subtitlesAuto || !prefSubs.length || !addonSubs) return;
      var _loop4 = function _loop4(p) {
          var s = addonSubs.find(function (x) {
            return String(x.lang).toLowerCase() === prefSubs[p];
          });
          if (s) {
            autoDone.sub = true;
            selectAddonSub(s, true);
            return {
              v: void 0
            };
          }
        },
        _ret2;
      for (var p = 0; p < prefSubs.length; p++) {
        _ret2 = _loop4(p);
        if (_ret2) return _ret2.v;
      }
    }
    function scheduleAudioPick() {
      if (!(settings2.audioLangs || []).length || !isAvailable()) return;
      setTimeout(function () {
        if (alive && hasPlayed) loadEmbeddedTracks().then(function () {
          return autoPick();
        });
      }, 2e4);
    }
    videoEl.addEventListener("loadedmetadata", function () {
      if (pendingStart > 0) {
        try {
          videoEl.currentTime = pendingStart / 1e3;
          autoResume = true;
        } catch (e) {}
        pendingStart = 0;
      }
      updateTimes();
      loadSegments();
    });
    videoEl.addEventListener("playing", function () {
      if (!hasPlayed) scheduleAudioPick();
      hasPlayed = true;
      showSpinner(false);
      message("");
      updatePlayBtn();
      scheduleHide();
    });
    videoEl.addEventListener("pause", function () {
      updatePlayBtn();
      showControls();
      saveProgress2();
    });
    videoEl.addEventListener("waiting", function () {
      return showSpinner(true);
    });
    videoEl.addEventListener("canplay", function () {
      return showSpinner(false);
    });
    videoEl.addEventListener("timeupdate", function () {
      var now = Date.now();
      if (!videoEl.paused && lastTick) {
        var d = now - lastTick;
        if (d > 0 && d < 3e3) watchedDelta += d;
      }
      lastTick = now;
      renderer.update(videoEl.currentTime);
      if (controlsOn) updateTimes();
      checkUpNext();
    });
    videoEl.addEventListener("ended", function () {
      saveProgress2();
      record(video.id, 1);
      if (opts.isSeries && nextVideo() && !upNextCancelled) playNext();else pop();
    });
    function sendNowPlaying() {
      var d = videoEl.duration;
      nowPlaying({
        title: meta.name || "",
        episode: opts.isSeries ? epLabel(video.season, video.episode) + (video.name || video.title ? " · " + (video.name || video.title) : "") : "",
        poster: meta.poster || "",
        position: Math.floor(videoEl.currentTime || 0),
        duration: d > 0 && isFinite(d) ? Math.floor(d) : 0,
        paused: videoEl.paused
      });
    }
    onSeek(function (sec) {
      if (!alive || !(videoEl.duration > 0)) return;
      videoEl.currentTime = Math.max(0, Math.min(sec, videoEl.duration - 2));
      showControls();
      sendNowPlaying();
    });
    ["play", "pause", "seeked", "loadedmetadata"].forEach(function (ev) {
      return videoEl.addEventListener(ev, sendNowPlaying);
    });
    var nowTimer = setInterval(function () {
      return alive && !videoEl.paused && sendNowPlaying();
    }, 5e3);
    var UP_NEXT_SECONDS = 25;
    var UP_NEXT_COUNT = 10;
    var upNextTimer = null;
    var upNextLeft = 0;
    var upNextCancelled = false;
    function upNextStart() {
      var outro = segments.find(function (s) {
        return s.type === "outro";
      });
      var d = videoEl.duration;
      return outro ? outro.start : d - UP_NEXT_SECONDS;
    }
    function checkUpNext() {
      if (upNextTimer || upNextCancelled || !opts.isSeries || seekTarget !== null || videoEl.paused) return;
      var d = videoEl.duration;
      var nv = nextVideo();
      if (!nv || !(d > 300) || !isFinite(d) || videoEl.currentTime < upNextStart()) return;
      hideSkip();
      upNextTitle.textContent = epLabel(nv.season, nv.episode) + (nv.name || nv.title ? " · " + (nv.name || nv.title) : "");
      upNextLeft = UP_NEXT_COUNT;
      upNextCount.textContent = t("Começa em {n}s", {
        n: upNextLeft
      });
      upNextBox.classList.add("show");
      focus(upNextPlay, {
        noScroll: true
      });
      upNextTimer = setInterval(function () {
        upNextLeft--;
        upNextCount.textContent = t("Começa em {n}s", {
          n: upNextLeft
        });
        if (upNextLeft <= 0) upNextGo();
      }, 1e3);
    }
    function upNextStop(cancelled) {
      clearInterval(upNextTimer);
      upNextTimer = null;
      upNextBox.classList.remove("show");
      if (cancelled) {
        upNextCancelled = true;
        focus(bar, {
          noScroll: true
        });
      }
    }
    function upNextGo() {
      upNextStop(false);
      record(video.id, 1);
      upNextCancelled = false;
      playNext();
    }
    var SUB_STEP = 0.25;
    var SUB_DELAYS = "subDelays";
    function savedDelay() {
      return (get(SUB_DELAYS, {}) || {})[video.id] || 0;
    }
    function rememberDelay(v) {
      var all2 = get(SUB_DELAYS, {}) || {};
      delete all2[video.id];
      if (v) all2[video.id] = v;
      var keys = Object.keys(all2);
      if (keys.length > 200) delete all2[keys[0]];
      set(SUB_DELAYS, all2);
    }
    function setSubDelay(v) {
      v = Math.round(Math.max(-30, Math.min(30, v)) * 100) / 100;
      renderer.setOffset(v);
      rememberDelay(v);
      return v;
    }
    function nudgeSubs(dir) {
      if (currentSub.kind === "off") return toast(t("Ligue uma legenda primeiro."));
      if (currentSub.kind === "embedded") return toast(t("O ajuste funciona com legendas de addons (OpenSubtitles etc.)."), 4e3);
      var v = setSubDelay(renderer.offset() + dir * SUB_STEP);
      toast(t("Atraso da legenda: {n}s", {
        n: (v > 0 ? "+" : "") + v.toFixed(2)
      }) + "  ·  " + (v < 0 ? t("Legenda aparece antes") : v > 0 ? t("Legenda aparece depois") : t("Sem ajuste")), 1800);
    }
    videoEl.addEventListener("error", function () {
      var err = videoEl.error;
      log.warn("Erro de vídeo", err && err.code, mediaUrl);
      if (!alive) return;
      if (!hasPlayed && opts.fallbacks && opts.fallbacks.length) {
        stream = opts.fallbacks.shift();
        toast(t("Essa fonte não tocou. Tentando outra..."));
        triedTranscode = false;
        autoDone = {
          sub: false,
          audio: false
        };
        start3();
        return;
      }
      if (!triedTranscode && isAvailable()) {
        fail(t("A TV não conseguiu tocar este arquivo diretamente."), true);
      } else fail(t("A TV não conseguiu tocar este arquivo (formato ou codec não suportado)."));
    });
    var segments = [];
    var segmentsLoaded = false;
    var activeSeg = null;
    var doneSegs = {};
    function loadSegments() {
      if (segmentsLoaded || settings().skipMode === "off") return;
      segmentsLoaded = true;
      var forVideo = video;
      getSegments(meta, video, videoEl.duration).then(function (list2) {
        if (alive && forVideo === video) segments = list2;
      }).catch(function () {});
    }
    function segLabel(seg) {
      if (seg.type === "intro") return t("Pular abertura");
      if (seg.type === "recap") return t("Pular recapitulação");
      return opts.isSeries && nextVideo() ? t("Próximo episódio") : t("Pular encerramento");
    }
    function segKey(seg) {
      return video.id + ":" + seg.type + ":" + seg.start;
    }
    function checkSkip() {
      if (!segments.length || seekTarget !== null) return;
      var pos = videoEl.currentTime;
      var seg = segments.find(function (x) {
        return pos >= x.start && pos < x.end - 0.5;
      }) || null;
      if (seg !== activeSeg) {
        activeSeg = seg;
        if (!seg || doneSegs[segKey(seg)]) {
          hideSkip();
          if (seg) activeSeg = null;
          return;
        }
        if (settings().skipMode === "auto" && !(seg.type === "outro" && opts.isSeries && nextVideo())) {
          doSkip();
          return;
        }
        skipBtn.innerHTML = '<span class="ico">⏭</span>' + segLabel(seg);
        skipBox.classList.add("show");
        if (controlsOn) focus(skipBtn, {
          noScroll: true
        });
      }
      if (activeSeg) skipFill.style.width = Math.max(0, Math.min(100, (pos - activeSeg.start) / (activeSeg.end - activeSeg.start) * 100)) + "%";
    }
    function hideSkip() {
      skipBox.classList.remove("show");
      if (current2() === skipBtn) focus(bar, {
        noScroll: true
      });
    }
    function dismissSkip() {
      if (activeSeg) doneSegs[segKey(activeSeg)] = true;
      activeSeg = null;
      hideSkip();
    }
    function doSkip() {
      var seg = activeSeg;
      if (!seg) return;
      doneSegs[segKey(seg)] = true;
      activeSeg = null;
      hideSkip();
      if (seg.type === "outro" && opts.isSeries && nextVideo()) {
        playNext();
        return;
      }
      var d = videoEl.duration;
      try {
        videoEl.currentTime = Math.min(seg.end, isFinite(d) ? d - 1 : seg.end);
      } catch (e) {}
      if (settings().skipMode === "auto") toast(seg.type === "intro" ? t("Abertura pulada") : seg.type === "recap" ? t("Recapitulação pulada") : t("Encerramento pulado"));
    }
    function bufferedInfo() {
      try {
        var b = videoEl.buffered;
        var out = [];
        for (var i = 0; i < b.length; i++) out.push(b.start(i).toFixed(0) + "-" + b.end(i).toFixed(0));
        return out.join(",");
      } catch (e) {
        return "?";
      }
    }
    function diag(ev) {
      log.info("video", ev, "t=" + videoEl.currentTime.toFixed(1), "dur=" + (isFinite(videoEl.duration) ? videoEl.duration.toFixed(0) : "?"), "ready=" + videoEl.readyState, "net=" + videoEl.networkState, "buf=" + bufferedInfo());
    }
    ["waiting", "stalled", "suspend", "abort", "emptied", "seeking", "seeked", "ended", "loadeddata"].forEach(function (ev) {
      return videoEl.addEventListener(ev, function () {
        return diag(ev);
      });
    });
    var lastT = -1;
    var hasPlayed = false;
    var gaveUp = false;
    var autoResume = false;
    videoEl.addEventListener("seeked", function () {
      if (autoResume) {
        autoResume = false;
        var p = videoEl.play();
        if (p && p.catch) p.catch(function () {});
      }
    });
    function stuckMenu(pos) {
      showSpinner(false);
      menu(t("O vídeo parou de carregar"), [{
        label: t("Tentar de novo"),
        sub: t("Reabre o vídeo em {time}", {
          time: fmtTime(pos)
        }),
        value: "retry",
        checked: true
      }, {
        label: t("Escolher outra fonte"),
        value: "src"
      }, {
        label: t("Voltar"),
        value: "back"
      }], {
        center: true,
        onPick: function onPick(v) {
          if (v === "retry") {
            gaveUp = false;
            recoveries = 0;
            reopenAt(pos);
          } else if (v === "src") sourcesMenu();else pop();
        }
      });
    }
    function freeBackgroundMemory() {
      closeHeavyBackgroundApps().then(function (closed) {
        return closed.length && log.info("Apps fechados em segundo plano: " + closed.join(", "));
      });
      var home = tabView("home");
      if (home && home.freeMemory) home.freeMemory();
    }
    var stuckSince = 0;
    var recoveries = 0;
    var lastRecoveryAt = 0;
    function watchdog() {
      if (!alive || gaveUp || !hasPlayed || !mediaUrl || videoEl.paused || seekTarget !== null || videoEl.ended) {
        stuckSince = 0;
        return;
      }
      var pos = videoEl.currentTime;
      if (Math.abs(pos - lastT) > 0.05) {
        lastT = pos;
        stuckSince = 0;
        if (Date.now() - lastRecoveryAt > 12e4) recoveries = 0;
        return;
      }
      if (!stuckSince) {
        stuckSince = Date.now();
        return;
      }
      var stuckFor = Date.now() - stuckSince;
      if (stuckFor > 15e3) {
        stuckSince = 0;
        if (recoveries >= 3) {
          diag("travado-desisti");
          gaveUp = true;
          stuckMenu(pos);
          return;
        }
        recoveries++;
        lastRecoveryAt = Date.now();
        diag("travado-recuperando#" + recoveries);
        reopenAt(pos);
      }
    }
    function reopenAt(pos) {
      showSpinner(true);
      toast(t("Reconectando ao vídeo..."));
      pendingStart = Math.max(0, pos - 1) * 1e3;
      var src = videoEl.currentSrc || mediaUrl;
      try {
        videoEl.pause();
        videoEl.removeAttribute("src");
        videoEl.load();
      } catch (e) {}
      setTimeout(function () {
        if (!alive) return;
        hasPlayed = false;
        videoEl.autoplay = true;
        videoEl.src = src;
        nativeOffDone = false;
        if (currentSub.kind === "embedded" && !currentSub.extracted) {
          var idx = currentSub.index;
          setTimeout(function () {
            return alive && selectEmbeddedSub(idx);
          }, 2500);
        }
      }, 300);
    }
    function fail(text, offerTranscode) {
      showSpinner(false);
      var box = h("div", null, [text, h("small", {
        text: t("Tente outra fonte (de preferência MP4/MKV com H.264 ou HEVC e áudio AAC/AC3).")
      })]);
      clear(msgEl);
      msgEl.appendChild(box);
      var opts2 = [{
        label: t("Escolher outra fonte"),
        value: "src"
      }];
      if (offerTranscode) opts2.unshift({
        label: t("Converter no PC (experimental)"),
        sub: t("O servidor converte para HLS que a TV aceita"),
        value: "hls"
      });
      opts2.push({
        label: t("Voltar"),
        value: "back"
      });
      menu(t("Problema na reprodução"), opts2, {
        center: true,
        onPick: function onPick(v) {
          if (v === "hls") transcode();else if (v === "src") sourcesMenu();else pop();
        }
      });
    }
    function transcode() {
      triedTranscode = true;
      var base = baseUrl();
      var id = Math.random().toString(36).slice(2) + Date.now().toString(36);
      var q = ["mediaURL=" + encodeURIComponent(mediaUrl)];
      ["h264", "h265", "hevc"].forEach(function (c) {
        return q.push("videoCodecs=" + c);
      });
      ["aac", "mp3", "ac3", "eac3"].forEach(function (c) {
        return q.push("audioCodecs=" + c);
      });
      q.push("maxAudioChannels=6");
      var url2 = base + "hlsv2/" + id + "/master.m3u8?" + q.join("&");
      pendingStart = videoEl.currentTime * 1e3 || pendingStart;
      showSpinner(true);
      message("");
      log.info("Transcodificando", url2);
      videoEl.src = url2;
      videoEl.load();
      videoEl.play();
    }
    function togglePlay() {
      if (videoEl.paused) videoEl.play();else videoEl.pause();
      showControls();
    }
    function updatePlayBtn() {
      playBtn.innerHTML = videoEl.paused ? '<span class="ico">▶</span>' + t("Tocar") : '<span class="ico">❚❚</span>' + t("Pausar");
    }
    function updateTimes() {
      var d = videoEl.duration;
      var pos = seekTarget !== null ? seekTarget : videoEl.currentTime;
      var pct = d > 0 && isFinite(d) ? Math.min(100, pos / d * 100) : 0;
      posEl.style.width = pct + "%";
      knobEl.style.left = pct + "%";
      seekLabel.style.left = pct + "%";
      curTimeEl.textContent = fmtTime(pos);
      durEl.textContent = isFinite(d) ? fmtTime(d) : "--:--";
      try {
        var b = videoEl.buffered;
        for (var i = 0; i < b.length; i++) {
          if (b.start(i) <= videoEl.currentTime + 1 && b.end(i) >= videoEl.currentTime) {
            bufEl.style.width = (d > 0 ? Math.min(100, b.end(i) / d * 100) : 0) + "%";
          }
        }
      } catch (e) {}
      var now = /* @__PURE__ */new Date();
      clear(clockEl);
      clockEl.appendChild(document.createTextNode(timeHM(now)));
      if (d > 0 && isFinite(d)) {
        var end = new Date(now.getTime() + Math.max(0, d - videoEl.currentTime) * 1e3);
        clockEl.appendChild(h("small", {
          text: t("Termina às {time}", {
            time: timeHM(end)
          })
        }));
      }
    }
    function showControls(focusEl) {
      if (!controlsOn) {
        controlsOn = true;
        el.classList.add("controls-on");
        updateTimes();
        updatePlayBtn();
        if (!current2() || !overlay.contains(current2())) focus(focusEl || bar);
      } else if (focusEl) focus(focusEl);
      scheduleHide();
    }
    function hideControls() {
      controlsOn = false;
      el.classList.remove("controls-on");
      clearTimeout(hideTimer);
    }
    function scheduleHide() {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(function () {
        if (!videoEl.paused && seekTarget === null && topLayer() && topLayer().root === el) hideControls();
      }, HIDE_MS);
    }
    function showSpinner(on) {
      spinner.style.display = on ? "" : "none";
    }
    function message(text) {
      msgEl.textContent = text;
    }
    function seekBy(dir) {
      var d = videoEl.duration;
      if (!(d > 0) || !isFinite(d)) return;
      if (seekTarget === null) {
        seekTarget = videoEl.currentTime;
        seekRepeats = 0;
      }
      seekRepeats++;
      var step = seekRepeats > 15 ? 60 : seekRepeats > 5 ? 30 : 10;
      seekTarget = Math.max(0, Math.min(d - 2, seekTarget + dir * step));
      bar.classList.add("seeking");
      seekLabel.textContent = fmtTime(seekTarget);
      showControls(bar);
      updateTimes();
      clearTimeout(seekCommitTimer);
      seekCommitTimer = setTimeout(commitSeek, 700);
    }
    function commitSeek() {
      if (seekTarget === null) return;
      try {
        videoEl.currentTime = seekTarget;
      } catch (e) {}
      seekTarget = null;
      bar.classList.remove("seeking");
      if (videoEl.paused) videoEl.play();
      scheduleHide();
    }
    function cancelSeek() {
      clearTimeout(seekCommitTimer);
      seekTarget = null;
      bar.classList.remove("seeking");
      updateTimes();
    }
    function mediaId() {
      var id = String(videoEl.mediaId || "").trim();
      return id && id !== "<invalid mediaId>" ? id : null;
    }
    function selectEmbeddedAudio(index) {
      var native = videoEl.audioTracks;
      if (native && native.length > index) {
        for (var i = 0; i < native.length; i++) native[i].enabled = i === index;
        currentAudio = index;
        return;
      }
      var id = mediaId();
      if (!id || !hasLuna()) return toast(t("Troca de áudio indisponível agora."));
      luna("luna://com.webos.media", "selectTrack", {
        mediaId: id,
        type: "audio",
        index: index
      }).then(function () {
        return currentAudio = index;
      }).catch(function (e) {
        return toast(t("Falha ao trocar áudio: {msg}", {
          msg: e.message
        }));
      });
    }
    var nativeOffDone = false;
    function nativeSubsOff() {
      var id = mediaId();
      if (!id || !hasLuna()) return;
      nativeOffDone = true;
      luna("luna://com.webos.media", "setSubtitleEnable", {
        mediaId: id,
        enable: false
      }).catch(function () {});
    }
    function selectEmbeddedSub(index) {
      renderer.clear();
      streamProgress(mediaUrl).then(function (p) {
        if (!alive) return;
        if (p !== null && p >= 0.999) extractedSub(index);else nativeEmbeddedSub(index);
      });
    }
    function extractedSub(index) {
      nativeSubsOff();
      var cs = {
        kind: "embedded",
        index: index,
        extracted: true,
        sid: "kai" + Math.random().toString(36).slice(2),
        segs: {},
        cues: [],
        busy: false
      };
      currentSub = cs;
      ensureSegments();
    }
    function ensureSegments() {
      var cs = currentSub;
      if (!cs.extracted || cs.busy || !alive) return;
      var n = Math.floor(videoEl.currentTime / 10) + 1;
      var k = !cs.segs[n] ? n : !cs.segs[n + 1] ? n + 1 : 0;
      if (!k) return;
      cs.segs[k] = "loading";
      cs.busy = true;
      var url2 = baseUrl() + "hlsv2/" + cs.sid + "/subtitle" + cs.index + "/segment" + k + ".vtt?mediaURL=" + encodeURIComponent(mediaUrl);
      getText(url2, {
        timeout: 3e4,
        quiet: true
      }).then(function (txt) {
        if (currentSub !== cs) return;
        var seen = {};
        cs.cues.forEach(function (c) {
          return seen[c.start + "|" + c.text] = true;
        });
        parse(txt).forEach(function (c) {
          if (!seen[c.start + "|" + c.text]) cs.cues.push(c);
        });
        cs.cues.sort(function (a, b) {
          return a.start - b.start;
        });
        renderer.set(cs.cues);
        renderer.update(videoEl.currentTime);
      }).catch(function () {
        return delete cs.segs[k];
      }).then(function () {
        return cs.busy = false;
      });
    }
    function nativeEmbeddedSub(index) {
      var id = mediaId();
      if (!id || !hasLuna()) {
        setTimeout(function () {
          return alive && mediaId() && nativeEmbeddedSub(index);
        }, 1200);
        return;
      }
      applyNative(id, settings());
      luna("luna://com.webos.media", "setSubtitleEnable", {
        mediaId: id,
        enable: true
      }).then(function () {
        return luna("luna://com.webos.media", "selectTrack", {
          mediaId: id,
          type: "text",
          index: index
        });
      }).then(function () {
        currentSub = {
          kind: "embedded",
          index: index
        };
      }).catch(function (e) {
        return toast(t("Falha na legenda embutida: {msg}", {
          msg: e.message
        }));
      });
    }
    function disableEmbeddedSubs() {
      var id = mediaId();
      if (id && hasLuna() && currentSub.kind === "embedded" && !currentSub.extracted) {
        luna("luna://com.webos.media", "setSubtitleEnable", {
          mediaId: id,
          enable: false
        }).catch(function () {});
      }
    }
    function selectAddonSub(s, silent) {
      disableEmbeddedSubs();
      currentSub = {
        kind: "addon",
        id: s.id || s.url
      };
      renderer.setOffset(savedDelay());
      load3(s.url, subtitlesProxy(s.url)).then(function (cues) {
        if (!alive || currentSub.id !== (s.id || s.url)) return;
        renderer.set(cues);
        if (!silent) toast(t("Legenda: {lang}", {
          lang: langName(s.lang)
        }));
      }).catch(function () {
        return toast(t("Não foi possível baixar a legenda."));
      });
    }
    function withTracks(open) {
      if (embedded || !isAvailable()) return open();
      toast(t("Lendo as faixas do arquivo..."), 2500);
      loadEmbeddedTracks().then(function () {
        return alive && open();
      });
    }
    function audioMenu() {
      withTracks(openAudioMenu);
    }
    function openAudioMenu() {
      var native = videoEl.audioTracks;
      var list2 = [];
      if (native && native.length) {
        for (var i = 0; i < native.length; i++) {
          list2.push({
            label: langName(native[i].language) + (native[i].label ? " · " + native[i].label : ""),
            value: i,
            checked: native[i].enabled
          });
        }
      } else if (embedded && embedded.audio.length) {
        list2 = embedded.audio.map(function (tr, i) {
          return {
            label: langName(tr.lang) + (tr.label ? " · " + tr.label : ""),
            sub: [tr.codec, tr.channels ? t("{n} canais", {
              n: tr.channels
            }) : ""].filter(Boolean).join(" · "),
            value: i,
            checked: currentAudio === null ? i === 0 : currentAudio === i
          };
        });
      }
      menu(t("Áudio"), list2, {
        empty: isAvailable() ? t("Só uma faixa de áudio.") : t("Para listar as faixas, conecte o servidor do PC em Ajustes."),
        onPick: function onPick(i) {
          return selectEmbeddedAudio(i);
        }
      });
    }
    function subsMenu() {
      withTracks(openSubsMenu);
    }
    function openSubsMenu() {
      var opts2 = [{
        label: t("Desligada"),
        value: {
          kind: "off"
        },
        checked: currentSub.kind === "off"
      }];
      if (embedded && embedded.subs.length) {
        embedded.subs.forEach(function (tr, i) {
          return /PGS|VOBSUB|DVD/i.test(tr.codec || "") ? null : opts2.push({
            label: langName(tr.lang) + (tr.label ? " · " + tr.label : ""),
            sub: t("Embutida no arquivo") + (tr.codec ? " · " + tr.codec : ""),
            value: {
              kind: "embedded",
              index: i
            },
            checked: currentSub.kind === "embedded" && currentSub.index === i
          });
        });
      }
      var pref = (settings2.subtitleLangs || []).map(function (x) {
        return x.toLowerCase();
      });
      var sorted = (addonSubs || []).slice().sort(function (a, b) {
        var ia = pref.indexOf(String(a.lang).toLowerCase());
        var ib = pref.indexOf(String(b.lang).toLowerCase());
        return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
      });
      sorted.slice(0, 60).forEach(function (s) {
        return opts2.push({
          label: langName(s.lang),
          sub: s.addon || "Addon",
          value: {
            kind: "addon",
            sub: s
          },
          checked: currentSub.kind === "addon" && currentSub.id === (s.id || s.url)
        });
      });
      opts2.push({
        label: t("Atraso da legenda: {n}s", {
          n: renderer.offset().toFixed(1)
        }),
        sub: t("Ajustar sincronia"),
        value: {
          kind: "delay"
        }
      });
      opts2.push({
        label: t("Tamanho: {n}%", {
          n: settings().subtitleSize || 100
        }),
        value: {
          kind: "size"
        }
      });
      menu(t("Legendas"), opts2, {
        empty: addonSubs === null ? t("Carregando legendas...") : t("Nenhuma legenda."),
        onPick: function onPick(v) {
          if (v.kind === "off" || v.kind === "embedded" || v.kind === "addon") autoDone.sub = true;
          if (v.kind === "off") {
            disableEmbeddedSubs();
            renderer.clear();
            currentSub = {
              kind: "off"
            };
          } else if (v.kind === "embedded") selectEmbeddedSub(v.index);else if (v.kind === "addon") selectAddonSub(v.sub);else if (v.kind === "delay") delayMenu();else if (v.kind === "size") sizeMenu();
        }
      });
    }
    function delayMenu() {
      var vals = [-5, -3, -2, -1, -0.5, -0.25, 0, 0.25, 0.5, 1, 2, 3, 5];
      menu(t("Atraso da legenda"), vals.map(function (v) {
        return {
          label: (v > 0 ? "+" : "") + v + "s",
          sub: v < 0 ? t("Legenda aparece antes") : v > 0 ? t("Legenda aparece depois") : t("Sem ajuste"),
          value: v,
          checked: renderer.offset() === v
        };
      }), {
        onPick: function onPick(v) {
          return setSubDelay(v);
        }
      });
    }
    function sizeMenu() {
      var vals = [70, 85, 100, 115, 130, 150];
      var cur = settings().subtitleSize || 100;
      menu(t("Tamanho da legenda"), vals.map(function (v) {
        return {
          label: v + "%",
          value: v,
          checked: v === cur
        };
      }), {
        onPick: function onPick(v) {
          var next = saveSettings({
            subtitleSize: v
          });
          apply(subsEl, next);
          if (currentSub.kind === "embedded") applyNative(mediaId(), next);
        }
      });
    }
    function sourcesMenu() {
      var list2 = (opts.streams || []).map(function (s, i) {
        return {
          label: ((s.name || s.addon || "") + "").replace(/\n/g, " "),
          sub: ((s.title || s.description || "") + "").replace(/\n/g, " · "),
          value: i,
          checked: s === stream
        };
      });
      menu(t("Fontes"), list2, {
        onPick: function onPick(i) {
          var s = opts.streams[i];
          if (!s || s === stream) return;
          if (needsServer(s) && !isAvailable()) return toast(t("Essa fonte precisa do servidor do PC."));
          saveProgress2();
          pendingStart = videoEl.currentTime * 1e3;
          stream = s;
          triedTranscode = false;
          autoDone = {
            sub: false,
            audio: false
          };
          start3();
        }
      });
    }
    function playNext() {
      var nv = nextVideo();
      if (!nv) return;
      saveProgress2();
      var group = stream.behaviorHints && stream.behaviorHints.bingeGroup;
      showSpinner(true);
      message(t("Procurando o próximo episódio..."));
      fetchStreams(meta.type, nv.id).then(function (list2) {
        if (!alive) return;
        var match = group ? list2.find(function (s) {
          return s.behaviorHints && s.behaviorHints.bingeGroup === group;
        }) : null;
        if (match && (!needsServer(match) || isAvailable())) {
          video = nv;
          stream = match;
          opts.streams = list2;
          pendingStart = 0;
          triedTranscode = false;
          autoDone = {
            sub: false,
            audio: false
          };
          start3();
        } else {
          pop();
          openDetails(meta.type, meta.id, {
            videoId: nv.id,
            autoStreams: true
          });
        }
      });
    }
    function saveProgress2() {
      var d = videoEl.duration;
      if (!(d > 0) || !isFinite(d) || !videoEl.currentTime) return;
      var delta = watchedDelta;
      watchedDelta = 0;
      record(video.id, videoEl.currentTime / d);
      saveProgress(meta, video.id, videoEl.currentTime * 1e3, d * 1e3, delta);
    }
    function onKey(e) {
      var k = e.keyCode;
      var cur = current2();
      if (upNextTimer && (k === KEY.BACK || k === KEY.ESC || k === KEY.BACKSPACE)) {
        upNextStop(true);
        return true;
      }
      if (upNextTimer && cur && upNextBox.contains(cur)) return false;
      if (k === KEY.CH_UP || k === KEY.YELLOW) {
        nudgeSubs(1);
        return true;
      }
      if (k === KEY.CH_DOWN || k === KEY.BLUE) {
        nudgeSubs(-1);
        return true;
      }
      switch (k) {
        case KEY.PLAY:
          videoEl.play();
          showControls();
          return true;
        case KEY.PAUSE:
          videoEl.pause();
          return true;
        case KEY.PLAYPAUSE:
          togglePlay();
          return true;
        case KEY.STOP:
          close();
          return true;
        case KEY.FF:
          seekBy(1);
          return true;
        case KEY.RW:
          seekBy(-1);
          return true;
        case KEY.BACK:
        case KEY.ESC:
        case KEY.BACKSPACE:
          if (seekTarget !== null) cancelSeek();else if (activeSeg && !controlsOn) dismissSkip();else if (controlsOn && !videoEl.paused) hideControls();else close();
          return true;
      }
      if (!controlsOn && activeSeg) {
        if (k === KEY.ENTER) {
          doSkip();
          return true;
        }
      }
      if (!controlsOn) {
        if (k === KEY.LEFT) seekBy(-1);else if (k === KEY.RIGHT) seekBy(1);else if (k === KEY.ENTER) togglePlay();else if (k === KEY.DOWN) showControls(playBtn);else showControls(bar);
        return true;
      }
      scheduleHide();
      if (cur === bar) {
        if (k === KEY.LEFT) {
          seekBy(-1);
          return true;
        }
        if (k === KEY.RIGHT) {
          seekBy(1);
          return true;
        }
        if (k === KEY.UP) {
          hideControls();
          return true;
        }
      }
      return false;
    }
    function close() {
      saveProgress2();
      pop();
    }
    return {
      el: el,
      onKey: onKey,
      onShow: function onShow() {
        if (!ticker) {
          start3();
          ticker = setInterval(function () {
            if (controlsOn) updateTimes();
            renderer.update(videoEl.currentTime);
            checkSkip();
            if (!nativeOffDone && !(currentSub.kind === "embedded" && !currentSub.extracted)) nativeSubsOff();
            if (currentSub.extracted) ensureSegments();
          }, 250);
          saveTimer = setInterval(function () {
            if (!videoEl.paused) saveProgress2();
          }, SAVE_MS);
          watchTimer = setInterval(watchdog, 2e3);
          if ("") statusTimer = setInterval(function () {
            return !videoEl.paused && diag("status");
          }, 1e4);
        }
        showControls(bar);
      },
      onBack: function onBack() {
        close();
        return true;
      },
      destroy: function destroy() {
        alive = false;
        clearInterval(nowTimer);
        onSeek(null);
        nowPlaying(null);
        clearInterval(ticker);
        clearInterval(saveTimer);
        clearInterval(watchTimer);
        clearInterval(statusTimer);
        clearTimeout(hideTimer);
        clearTimeout(seekCommitTimer);
        disableEmbeddedSubs();
        try {
          videoEl.pause();
          videoEl.removeAttribute("src");
          videoEl.load();
        } catch (e) {}
      }
    };
  }

  // src/js/views/person.js
  function age(birthday, deathday) {
    var b = new Date(birthday);
    if (isNaN(b.getTime())) return null;
    var end = deathday ? new Date(deathday) : /* @__PURE__ */new Date();
    var a = end.getFullYear() - b.getFullYear();
    if (end.getMonth() < b.getMonth() || end.getMonth() === b.getMonth() && end.getDate() < b.getDate()) a--;
    return a;
  }
  function longDate(iso) {
    var d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    try {
      return d.toLocaleDateString(current() === "ar" ? "ar" : "en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    } catch (e) {
      return iso;
    }
  }
  function PersonView(personId, name) {
    var el = h("div.view");
    var scroller = h("div.scroll-y", {
      "data-scroll-y": ""
    });
    var head = h("div.person-head");
    var grid = h("div.grid");
    scroller.appendChild(head);
    scroller.appendChild(grid);
    el.appendChild(scroller);
    head.appendChild(h("div.person-name", {
      text: name || ""
    }));
    head.appendChild(spinnerLine(t("Carregando...")));
    person(personId).then(function (p) {
      clear(head);
      if (p.photo) head.appendChild(h("img.person-photo", {
        src: p.photo,
        alt: ""
      }));
      var facts = [];
      var years = age(p.birthday, p.deathday);
      if (p.birthday) facts.push(t("Nascimento: {date}", {
        date: longDate(p.birthday)
      }) + (years !== null && !p.deathday ? " · " + t("{n} anos", {
        n: years
      }) : ""));
      if (p.deathday) facts.push(t("Falecimento: {date}", {
        date: longDate(p.deathday)
      }) + (years !== null ? " · " + t("{n} anos", {
        n: years
      }) : ""));
      if (p.place) facts.push(t("Local de nascimento: {place}", {
        place: p.place
      }));
      head.appendChild(h("div.person-info", {
        focusable: true
      }, [h("div.person-name", {
        text: p.name
      }), p.department ? h("div.person-dept", {
        text: t(p.department === "Directing" ? "Direção" : "Atuação")
      }) : null, h("div.person-facts", null, facts.map(function (f) {
        return h("div", {
          text: f
        });
      })), p.biography ? h("div.person-bio", {
        text: p.biography
      }) : h("div.person-bio.empty", {
        text: t("Sem biografia disponível.")
      })]));
      if (!p.credits.length) return;
      scroller.insertBefore(h("div.row-title.person-credits", {
        text: t("Filmes e séries")
      }), grid);
      p.credits.forEach(function (c) {
        grid.appendChild(card({
          name: c.name,
          poster: c.poster
        }, {
          title: c.name + (c.year ? " (" + c.year + ")" : ""),
          onSelect: function onSelect() {
            toast(t("Abrindo {name}...", {
              name: c.name
            }), 2e3);
            tmdbImdb(c.type, c.tmdb).then(function (imdb) {
              if (!imdb) return toast(t("Esse título ainda não tem página no Stremio."), 4e3);
              openDetails(c.type === "tv" ? "series" : "movie", imdb);
            });
          }
        }));
      });
      loadVisibleImages(el, 600);
    }).catch(function () {
      clear(head);
      head.appendChild(h("div.hint", {
        text: t("Não foi possível carregar este perfil.")
      }));
    });
    return {
      el: el,
      onShow: function onShow() {
        return loadVisibleImages(el, 600);
      }
    };
  }

  // src/js/views/trailer.js
  function trailerIds(meta) {
    var ids = [];
    (meta.trailerStreams || []).forEach(function (s) {
      return s && s.ytId && ids.push(s.ytId);
    });
    (meta.trailers || []).forEach(function (tr) {
      return tr && tr.source && (!tr.type || tr.type === "Trailer") && ids.push(tr.source);
    });
    return ids.filter(function (id, i) {
      return /^[\w-]{11}$/.test(id) && ids.indexOf(id) === i;
    });
  }
  function openTrailer(ids, title) {
    push(TrailerView(ids, title));
  }
  function TrailerView(ids, title) {
    var index = 0;
    var playing = true;
    var el = h("div.view.trailer");
    var frame = h("iframe.trailer-frame", {
      tabindex: "-1",
      allow: "autoplay; encrypted-media",
      allowfullscreen: "",
      referrerpolicy: "origin"
    });
    var hint = h("div.trailer-hint", {
      text: title + "  ·  " + t("Voltar fecha o trailer")
    });
    el.appendChild(frame);
    el.appendChild(hint);
    el.appendChild(h("div.trailer-focus", {
      focusable: true
    }));
    function load5() {
      var params = "autoplay=1&controls=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&enablejsapi=1&hl=" + current();
      frame.src = "https://www.youtube-nocookie.com/embed/" + ids[index] + "?" + params;
      playing = true;
    }
    function command(func, args) {
      try {
        frame.contentWindow.postMessage(JSON.stringify({
          event: "command",
          func: func,
          args: args || []
        }), "*");
      } catch (e) {}
    }
    var hintTimer = setTimeout(function () {
      return hint.classList.add("faded");
    }, 4e3);
    function showHint() {
      hint.classList.remove("faded");
      clearTimeout(hintTimer);
      hintTimer = setTimeout(function () {
        return hint.classList.add("faded");
      }, 3e3);
    }
    load5();
    return {
      el: el,
      onKey: function onKey(e) {
        var k = e.keyCode;
        showHint();
        if (k === KEY.PLAYPAUSE || k === KEY.PLAY || k === KEY.PAUSE || k === KEY.ENTER) {
          playing = k === KEY.PLAY ? true : k === KEY.PAUSE ? false : !playing;
          command(playing ? "playVideo" : "pauseVideo");
          return true;
        }
        if ((k === KEY.RIGHT || k === KEY.FF) && ids.length > 1) {
          index = (index + 1) % ids.length;
          load5();
          return true;
        }
        if (k === KEY.LEFT || k === KEY.RW) {
          if (ids.length > 1 && k === KEY.LEFT) {
            index = (index - 1 + ids.length) % ids.length;
            load5();
          }
          return true;
        }
        return k === KEY.UP || k === KEY.DOWN;
      },
      destroy: function destroy() {
        clearTimeout(hintTimer);
        frame.src = "about:blank";
      }
    };
  }

  // src/js/views/details.js
  function openDetails(type, id, opts) {
    push(DetailsView(type, id, opts || {}));
  }
  function sortedVideos(meta) {
    return (meta.videos || []).filter(function (v) {
      return v && v.id;
    }).slice().sort(function (a, b) {
      var sa = a.season === 0 ? 9999 : a.season || 0;
      var sb = b.season === 0 ? 9999 : b.season || 0;
      return sa - sb || (a.episode || 0) - (b.episode || 0);
    });
  }
  var SMART_WAIT_MS = 1e4;
  var SMART_FALLBACKS = 4;
  function DetailsView(type, id, opts) {
    var el = h("div.view");
    var bg = h("img.details-bg", {
      alt: ""
    });
    var info2 = h("div.details-info", null, spinnerLine(t("Carregando...")));
    var panel = h("div.details-panel");
    el.appendChild(bg);
    el.appendChild(h("div.details-shade"));
    el.appendChild(info2);
    el.appendChild(panel);
    var meta = null;
    var mode = "none";
    var season = null;
    var streamsVideo = null;
    var alive = true;
    var watchBtn = null;
    var libBtn = null;
    var tmdbInfo = null;
    var isSeries = function isSeries() {
      return meta && sortedVideos(meta).length > 0 && meta.type !== "movie";
    };
    function movieVideoId() {
      return meta.behaviorHints && meta.behaviorHints.defaultVideoId || meta.id;
    }
    function nextUpVideo() {
      var vids = sortedVideos(meta);
      var li = libraryItem(meta.id);
      if (li && li.state && li.state.video_id) {
        var i = vids.findIndex(function (v) {
          return v.id === li.state.video_id;
        });
        if (i >= 0) return vids[i];
      }
      return vids.filter(function (v) {
        return v.season !== 0;
      })[0] || vids[0];
    }
    function renderInfo() {
      clear(info2);
      var logo2 = h("img.details-logo", {
        alt: ""
      });
      var title = h("div.details-title", {
        text: meta.name
      });
      title.style.display = "none";
      logo2.onerror = function () {
        logo2.style.display = "none";
        title.style.display = "";
      };
      logo2.src = meta.logo || logo(meta.id);
      var parts = [];
      if (meta.releaseInfo || meta.year) parts.push(meta.releaseInfo || meta.year);
      if (meta.runtime) parts.push(meta.runtime);
      if (isSeries()) {
        var seasons = uniqueSeasons().filter(function (s) {
          return s !== 0;
        });
        if (seasons.length) parts.push(t(seasons.length > 1 ? "{n} temporadas" : "{n} temporada", {
          n: seasons.length
        }));
      }
      var metaLine = h("div.details-meta", {
        text: parts.join("  ·  ")
      });
      var ratingsEl = h("div.ratings");
      renderRatings(ratingsEl, meta.imdbRating ? [{
        cls: "imdb",
        label: "IMDb",
        value: String(meta.imdbRating)
      }] : []);
      var genres = h("div.details-genres", null, (meta.genres || meta.genre || []).slice(0, 5).map(function (g) {
        return h("span", {
          text: g
        });
      }));
      var desc = h("div.details-desc", {
        text: meta.description || ""
      });
      var cast = (meta.cast || []).slice(0, 5);
      var director = (meta.director || []).slice(0, 2);
      var castLine = h("div.details-cast", null, [director.length ? h("b", {
        text: t("Direção: ")
      }) : null, director.length ? director.join(", ") + "   " : null, cast.length ? h("b", {
        text: t("Elenco: ")
      }) : null, cast.length ? cast.join(", ") : null]);
      watchBtn = h("div.btn.primary", {
        focusable: true,
        "data-autofocus": "",
        onSelect: function onSelect() {
          return onWatch(smartOn());
        }
      });
      libBtn = h("div.btn", {
        focusable: true,
        onSelect: toggleLibrary
      });
      var sourcesBtn = smartOn() ? h("div.btn", {
        focusable: true,
        onSelect: function onSelect() {
          return onWatch(false);
        }
      }, [h("span.ico", {
        text: "☰"
      }), t("Fontes")]) : null;
      var trailers = trailerIds(meta);
      var trailerBtn = trailers.length ? h("div.btn", {
        focusable: true,
        onSelect: function onSelect() {
          return openTrailer(trailers, meta.name);
        }
      }, [h("span.ico", {
        text: "🎬"
      }), t("Trailer")]) : null;
      updateButtons();
      info2.appendChild(logo2);
      info2.appendChild(title);
      info2.appendChild(metaLine);
      info2.appendChild(ratingsEl);
      info2.appendChild(genres);
      info2.appendChild(desc);
      info2.appendChild(castLine);
      info2.appendChild(h("div.details-buttons", {
        "data-group": ""
      }, [watchBtn, sourcesBtn, trailerBtn, libBtn]));
      loadExtras({
        logo: logo2,
        title: title,
        desc: desc,
        castLine: castLine,
        ratingsEl: ratingsEl
      });
    }
    function renderRatings(el2, list2) {
      clear(el2);
      list2.forEach(function (r) {
        return el2.appendChild(h("span.rating", {
          cls: r.cls
        }, [h("b", {
          text: r.label
        }), r.value]));
      });
      el2.style.display = list2.length ? "" : "none";
    }
    function loadExtras(ui) {
      ratings(meta, isAnime(meta)).then(function (list2) {
        return alive && renderRatings(ui.ratingsEl, list2);
      }).catch(function () {});
      if (!hasTmdb()) return;
      localized(meta).then(function (loc) {
        if (!alive || !loc) return;
        tmdbInfo = loc;
        if (loc.overview) ui.desc.textContent = loc.overview;
        if (loc.title) ui.title.textContent = loc.title;
        if (loc.logo) {
          ui.logo.style.display = "";
          ui.title.style.display = "none";
          ui.logo.src = loc.logo;
        }
        if (loc.cast.length) {
          var row = h("div.cast-row", {
            "data-group": ""
          }, loc.cast.slice(0, 7).map(function (c) {
            return h("div.cast", {
              focusable: true,
              onSelect: function onSelect() {
                return push(PersonView(c.id, c.name));
              }
            }, [h("div.ph", null, c.photo ? h("img", {
              src: c.photo,
              alt: ""
            }) : null), h("div.nm", {
              text: c.name
            }), h("div.ch", {
              text: c.character
            })]);
          }));
          ui.castLine.parentNode.replaceChild(row, ui.castLine);
        }
        if (mode === "episodes") localizeEpisodes();
      }).catch(function () {});
    }
    function localizeEpisodes() {
      if (!tmdbInfo || tmdbInfo.tmdbType !== "tv" || season === null) return;
      var forSeason = season;
      seasonPt(tmdbInfo.tmdbId, season).then(function (map) {
        if (!alive || mode !== "episodes" || forSeason !== season) return;
        Array.prototype.forEach.call(panel.querySelectorAll(".episode"), function (row) {
          var ep = map[row.__episode];
          if (!ep) return;
          if (ep.name) row.querySelector(".ep-title").textContent = row.__episode + ". " + ep.name;
          if (ep.overview) row.querySelector(".ep-desc").textContent = ep.overview;
        });
      }).catch(function () {});
    }
    function updateButtons() {
      var li = libraryItem(meta.id);
      var label = t("Assistir");
      if (li && li.state && li.state.timeOffset > 0) {
        var ep = isSeries() ? sortedVideos(meta).find(function (v) {
          return v.id === li.state.video_id;
        }) : null;
        label = t("Continuar") + (ep ? " " + epLabel(ep.season, ep.episode) : "");
      }
      watchBtn.innerHTML = '<span class="ico">▶</span>' + label;
      libBtn.innerHTML = isInLibrary(meta.id) ? '<span class="ico">✓</span>' + t("Na biblioteca") : '<span class="ico">＋</span>' + t("Biblioteca");
    }
    function smartOn() {
      return settings().smartChoice !== false;
    }
    function onWatch(smart) {
      if (isSeries()) {
        var v = nextUpVideo();
        if (v) showStreams(v, true, smart);
      } else {
        showStreams({
          id: movieVideoId(),
          title: meta.name
        }, true, smart);
      }
    }
    function toggleLibrary() {
      var inLib = isInLibrary(meta.id);
      setInLibrary(meta, !inLib).then(function () {
        updateButtons();
        toast(inLib ? t("Removido da biblioteca") : t("Adicionado à biblioteca"));
      });
    }
    function uniqueSeasons() {
      var out = [];
      sortedVideos(meta).forEach(function (v) {
        var s = v.season || 0;
        if (out.indexOf(s) < 0) out.push(s);
      });
      return out;
    }
    function showEpisodes(focusVideoId) {
      mode = "episodes";
      clear(panel);
      var seasons = uniqueSeasons();
      if (season === null) {
        var nu = nextUpVideo();
        season = nu ? nu.season || 0 : seasons[0];
      }
      panel.appendChild(h("div.panel-head", null, h("h2", {
        text: t("Episódios")
      })));
      var chips = h("div.seasons", {
        "data-scroll-x": "",
        "data-group": "",
        "data-pad": "60"
      }, seasons.map(function (s) {
        return h("div.chip", {
          focusable: true,
          cls: s === season ? "active" : "",
          text: s === 0 ? t("Especiais") : t("Temporada {n}", {
            n: s
          }),
          onSelect: function onSelect() {
            season = s;
            showEpisodes();
            var first = panel.querySelector(".episode");
            if (first) focus(first);
          }
        });
      }));
      panel.appendChild(chips);
      var list2 = h("div.list", {
        "data-scroll-y": "",
        "data-pad-y": "120",
        "data-group": "",
        "data-vertical": ""
      });
      list2.style.top = "190px";
      var li = libraryItem(meta.id);
      var focusEl = null;
      sortedVideos(meta).filter(function (v) {
        return (v.season || 0) === season;
      }).forEach(function (v) {
        var thumb = h("div.thumb");
        if (v.thumbnail) {
          var im = h("img", {
            alt: ""
          });
          im.setAttribute("data-lazy", smallThumb(v.thumbnail));
          im.onerror = function () {
            return im.style.display = "none";
          };
          thumb.appendChild(im);
        }
        var sub = t("Episódio {n}", {
          n: v.episode || "?"
        });
        if (v.released) sub += " · " + formatDate(v.released);
        var inProgress = li && li.state && li.state.video_id === v.id && li.state.timeOffset > 0;
        if (inProgress) sub += " · " + t("parou em {time}", {
          time: fmtTime(li.state.timeOffset / 1e3)
        });
        var done = isWatched(v.id);
        var part = done ? 0 : progress(v.id) || (inProgress && li.state.duration ? li.state.timeOffset / li.state.duration : 0);
        if (done) thumb.appendChild(h("div.ep-watched", {
          text: "✓"
        }));else if (part > 0) thumb.appendChild(h("div.progress", null, h("i", {
          style: {
            width: Math.round(part * 100) + "%"
          }
        })));
        var row = h("div.episode", {
          focusable: true,
          cls: done ? "watched" : "",
          onSelect: function onSelect() {
            return showStreams(v, true);
          }
        }, [thumb, h("div.ep-info", null, [h("div.ep-title", {
          text: (v.episode ? v.episode + ". " : "") + (v.name || v.title || t("Episódio"))
        }), h("div.ep-sub", {
          text: sub
        }), h("div.ep-desc", {
          text: v.overview || v.description || ""
        })])]);
        row.__episode = v.episode;
        if (v.id === focusVideoId || !focusVideoId && inProgress) focusEl = row;
        list2.appendChild(row);
      });
      panel.appendChild(list2);
      list2.__last = focusEl || list2.firstChild;
      localizeEpisodes();
      loadVisibleImages(panel, 300);
      if (focusEl && focusVideoId) setTimeout(function () {
        return focus(focusEl);
      }, 0);
    }
    function addonRank(a) {
      var n = (a.manifest.name || "") + " " + a.transportUrl;
      if (/realdebrid|alldebrid|premiumize|debridlink|torbox|easydebrid|offcloud|\bRD\b/i.test(n)) return 0;
      if (/torrentio/i.test(n)) return 1;
      return 2;
    }
    function runtimeMinutes() {
      var r = String(meta.runtime || "");
      var hMatch = r.match(/(\d+)\s*h/i);
      var mMatch = r.match(/(\d+)\s*min/i);
      var mins = (hMatch ? parseInt(hMatch[1], 10) * 60 : 0) + (mMatch ? parseInt(mMatch[1], 10) : 0);
      return mins || (isSeries() ? 45 : 110);
    }
    function streamBadges(s) {
      var text = (s.name || "") + " " + (s.title || s.description || "");
      var out = [];
      if (/2160p|\b4k\b|uhd/i.test(text)) out.push({
        t: "4K"
      });
      if (/dolby.?vision|\bdovi\b|\bdv\b/i.test(text)) out.push({
        t: "Dolby Vision",
        warn: true
      });else if (/hdr/i.test(text)) out.push({
        t: "HDR"
      });
      if (/remux/i.test(text)) out.push({
        t: "REMUX",
        warn: true
      });
      var m = text.match(/(\d+(?:[.,]\d+)?)\s*(GB|MB)\b/i);
      if (m) {
        var mb = parseFloat(m[1].replace(",", ".")) * (m[2].toUpperCase() === "GB" ? 1024 : 1);
        var mbps = Math.round(mb * 8 / (runtimeMinutes() * 60));
        if (mbps > 0) out.push({
          t: "~" + mbps + " Mbps",
          warn: mbps > 30
        });
      }
      return out;
    }
    function showStreams(video, focusFirst2, smart) {
      mode = "streams";
      streamsVideo = video;
      clear(panel);
      var head = isSeries() ? epLabel(video.season, video.episode) + " · " + (video.name || video.title || "") : t("Fontes");
      var filterBtn = h("div.btn.small", {
        focusable: true,
        text: t("Todos ▾"),
        onSelect: function onSelect() {
          return filterMenu();
        }
      });
      panel.appendChild(h("div.panel-head", {
        "data-group": ""
      }, [h("h2", {
        text: head
      }), filterBtn]));
      var sub = h("div.panel-sub");
      var barFill = h("i");
      panel.appendChild(sub);
      panel.appendChild(h("div.load-bar", null, barFill));
      var list2 = h("div.list", {
        "data-scroll-y": "",
        "data-pad-y": "120",
        "data-group": "",
        "data-vertical": ""
      });
      list2.style.top = "178px";
      panel.appendChild(list2);
      var srcs = withResource("stream", meta.type, video.id).map(function (a, i) {
        return {
          a: a,
          i: i
        };
      }).sort(function (x, y) {
        return addonRank(x.a) - addonRank(y.a) || x.i - y.i;
      }).map(function (x) {
        return x.a;
      });
      if (!srcs.length) {
        list2.appendChild(h("div.loading-line", {
          text: t("Nenhum addon de streams instalado (ex.: Torrentio). Instale pela sua conta Stremio.")
        }));
        return;
      }
      var groups = srcs.map(function (a) {
        var el2 = h("div.stream-group");
        list2.appendChild(el2);
        return {
          addon: a,
          el: el2,
          count: 0,
          done: false
        };
      });
      var loadingLine = spinnerLine(t("Buscando fontes nos addons..."));
      list2.appendChild(loadingLine);
      var filter = "all";
      var pendingCount = srcs.length;
      var all2 = [];
      var autoFocused = null;
      var serverOk = isAvailable();
      var smartActive = !!smart;
      var smartTimer = smartActive ? setTimeout(function () {
        return decideSmart(true);
      }, SMART_WAIT_MS) : null;
      function stopSmart() {
        smartActive = false;
        clearTimeout(smartTimer);
      }
      function smartCandidates() {
        var out = [];
        groups.forEach(function (g, gi) {
          (g.streams || []).forEach(function (s, si) {
            if (!isPlayableType(s)) return;
            var needs = needsServer(s);
            if (needs && !serverOk) return;
            var warn = streamBadges(s).some(function (b) {
              return b.warn;
            });
            out.push({
              s: s,
              key: [needs ? 1 : 0, warn ? 1 : 0, gi, si]
            });
          });
        });
        out.sort(function (x, y) {
          for (var i = 0; i < 4; i++) if (x.key[i] !== y.key[i]) return x.key[i] - y.key[i];
          return 0;
        });
        return out.map(function (c) {
          return c.s;
        });
      }
      function decideSmart(timedOut) {
        if (!smartActive || !alive || streamsVideo !== video) return;
        if (focusFirst2 && autoFocused && current2() !== autoFocused) return stopSmart();
        var list3 = smartCandidates();
        var debridPending = groups.some(function (g) {
          return addonRank(g.addon) === 0 && !g.done;
        });
        var best = list3[0];
        var clean = best && !needsServer(best) && !streamBadges(best).some(function (b) {
          return b.warn;
        });
        if (!best) {
          if (pendingCount <= 0 || timedOut) {
            stopSmart();
            if (pendingCount <= 0) toast(t("Escolha inteligente: nenhuma fonte que a TV toque. Escolha na lista."), 5e3);
          }
          return;
        }
        if (pendingCount > 0 && !timedOut && (debridPending || !clean)) return;
        stopSmart();
        play(video, best, all2, list3.slice(1, 1 + SMART_FALLBACKS));
      }
      function status2() {
        if (smartActive) {
          sub.textContent = t("Escolha inteligente: procurando a melhor fonte...") + "  ·  " + t("aperte uma seta para escolher você");
          barFill.style.width = Math.round((srcs.length - pendingCount) / srcs.length * 100) + "%";
          return;
        }
        var srv = serverOk ? t("Servidor do PC conectado") : t("Servidor do PC não conectado: só links diretos");
        sub.textContent = srv + (pendingCount > 0 ? "  ·  " + t("{n} addon(s) ainda carregando", {
          n: pendingCount
        }) : "  ·  " + t("{n} fontes", {
          n: all2.length
        }));
        barFill.style.width = Math.round((srcs.length - pendingCount) / srcs.length * 100) + "%";
        var g = groups.find(function (x) {
          return x.addon.transportUrl === filter;
        });
        filterBtn.textContent = (g ? g.addon.manifest.name : t("Todos")) + " ▾";
      }
      function firstVisibleItem() {
        var items = list2.querySelectorAll(".stream");
        for (var i = 0; i < items.length; i++) if (items[i].offsetParent !== null && !items[i].classList.contains("disabled")) return items[i];
        return null;
      }
      function applyFilter() {
        groups.forEach(function (g) {
          return g.el.style.display = filter === "all" || filter === g.addon.transportUrl ? "" : "none";
        });
        list2.scrollTop = 0;
        status2();
        var first = firstVisibleItem();
        if (first) focus(first);
      }
      function filterMenu() {
        var opts2 = [{
          label: t("Todos"),
          sub: t("{n} fontes", {
            n: all2.length
          }),
          value: "all",
          checked: filter === "all"
        }].concat(groups.map(function (g) {
          return {
            label: g.addon.manifest.name || g.addon.manifest.id,
            sub: g.done ? t("{n} fontes", {
              n: g.count
            }) : t("carregando..."),
            value: g.addon.transportUrl,
            checked: filter === g.addon.transportUrl
          };
        }));
        menu(t("Mostrar fontes de"), opts2, {
          onPick: function onPick(v) {
            filter = v;
            applyFilter();
          }
        });
      }
      status2();
      (serverOk ? Promise.resolve() : check().then(function (r) {
        return serverOk = r.ok;
      })).then(function () {
        status2();
        return fetchStreams(meta.type, video.id, function (addon, streams) {
          if (!alive || streamsVideo !== video) return;
          pendingCount--;
          var g = groups.find(function (x) {
            return x.addon === addon;
          });
          if (g) {
            g.done = true;
            g.count = streams.length;
            g.streams = streams;
            streams.forEach(function (s) {
              all2.push(s);
              g.el.appendChild(streamItem(s, video, serverOk, all2));
            });
          }
          if (focusFirst2 && (!autoFocused || current2() === autoFocused)) {
            var first = firstVisibleItem();
            if (first) {
              autoFocused = first;
              focus(first);
            }
          }
          if (pendingCount <= 0) {
            if (loadingLine.parentNode) list2.removeChild(loadingLine);
            if (!all2.length) list2.appendChild(h("div.loading-line", {
              text: t("Nenhuma fonte encontrada.")
            }));
          }
          status2();
          decideSmart(false);
        });
      }).catch(function () {});
    }
    function streamItem(s, video, serverOk, all2) {
      var playableType = isPlayableType(s);
      var needs = needsServer(s);
      var disabled = !playableType || needs && !serverOk;
      var tags = [];
      if (!playableType) tags.push(h("span.s-tag.warn", {
        text: t("Não suportado na TV")
      }));else if (needs) tags.push(h("span.s-tag", {
        cls: serverOk ? "" : "warn",
        text: serverOk ? t("Torrent · via PC") : t("Torrent · precisa do PC")
      }));else tags.push(h("span.s-tag.ok", {
        text: t("Direto")
      }));
      streamBadges(s).forEach(function (b) {
        return tags.push(h("span.s-tag", {
          cls: b.warn ? "warn" : "",
          text: b.t
        }));
      });
      return h("div.stream", {
        focusable: true,
        cls: disabled ? "disabled" : "",
        onSelect: function onSelect() {
          if (!playableType) return toast(t("Esse tipo de fonte não abre na TV."));
          if (needs && !serverOk) return toast(t("Torrent precisa do stremio-service rodando no PC. Configure em Ajustes."), 5e3);
          play(video, s, all2);
        }
      }, [h("div.s-addon", {
        text: (s.name || s.addon || "").trim()
      }), h("div.s-body", null, [h("div.s-title", {
        text: (s.title || s.description || "").trim()
      }), h("div.s-tags", null, tags)])]);
    }
    function play(video, stream, all2, fallbacks) {
      var li = libraryItem(meta.id);
      var resumeMs = li && li.state && li.state.video_id === video.id ? li.state.timeOffset : 0;
      var start3 = function start3(ms) {
        return openPlayer({
          meta: meta,
          video: video,
          stream: stream,
          streams: all2,
          startTime: ms,
          isSeries: isSeries(),
          fallbacks: fallbacks || []
        });
      };
      if (resumeMs > 3e4) {
        menu(t("Continuar de onde parou?"), [{
          label: t("Continuar de {time}", {
            time: fmtTime(resumeMs / 1e3)
          }),
          value: resumeMs,
          checked: true
        }, {
          label: t("Começar do início"),
          value: 0
        }], {
          center: true,
          onPick: function onPick(v) {
            return start3(v);
          }
        });
      } else start3(0);
    }
    function formatDate(iso) {
      var d = new Date(iso);
      if (isNaN(d.getTime())) return "";
      return ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear();
    }
    load().then(function () {
      return fetchMeta(type, id);
    }).then(function (m) {
      if (!alive) return;
      meta = m;
      if (!meta.type) meta.type = type;
      bg.onerror = function () {
        return bg.style.display = "none";
      };
      bg.setAttribute("data-lazy", meta.background || background(meta.id));
      loadVisibleImages(el);
      renderInfo();
      if (isSeries()) {
        if (opts.videoId) {
          var v = sortedVideos(meta).find(function (x) {
            return x.id === opts.videoId;
          });
          if (v) season = v.season || 0;
          if (v && opts.autoStreams) {
            showStreams(v, true);
            return;
          }
        }
        showEpisodes(opts.videoId);
        if (opts.autoStreams) {
          var _v = nextUpVideo();
          if (_v) showStreams(_v, true);
          return;
        }
      } else {
        showStreams({
          id: movieVideoId(),
          title: meta.name
        }, !!opts.autoStreams);
      }
      if (!opts.autoStreams) focus(watchBtn);
    }).catch(function (e) {
      clear(info2);
      info2.appendChild(h("div.details-title", {
        text: t("Não foi possível abrir")
      }));
      info2.appendChild(h("div.details-desc", {
        text: e.message
      }));
      info2.appendChild(h("div.btn", {
        focusable: true,
        "data-autofocus": "",
        text: t("Voltar"),
        onSelect: function onSelect() {
          return pop();
        }
      }));
      focusFirst(el);
    });
    return {
      el: el,
      onShow: function onShow() {
        if (meta && watchBtn) updateButtons();
        loadVisibleImages(panel, 300);
      },
      onBack: function onBack() {
        if (mode === "streams" && isSeries()) {
          var v = streamsVideo;
          showEpisodes(v && v.id);
          return true;
        }
        return false;
      },
      destroy: function destroy() {
        alive = false;
      }
    };
  }

  // src/js/api/newEpisodes.js
  var DAYS = 7;
  var CHECK = 25;
  var PARALLEL = 1;
  function librarySeries() {
    return cachedLibrary().filter(function (it) {
      return it.type === "series" && (!it.removed || it.state && it.state.timeOffset > 0);
    }).sort(function (a, b) {
      return String(b._mtime || "").localeCompare(String(a._mtime || ""));
    }).slice(0, CHECK);
  }
  function recent(meta, it) {
    var now = Date.now();
    var from = now - DAYS * 864e5;
    return (meta.videos || []).filter(function (v) {
      var t2 = Date.parse(v.released);
      return v.id && v.season && t2 >= from && t2 <= now && !isWatched(v.id);
    }).map(function (v) {
      return {
        seriesId: it._id,
        type: "series",
        name: meta.name || it.name,
        poster: meta.poster || it.poster,
        background: meta.background,
        thumbnail: v.thumbnail,
        videoId: v.id,
        season: v.season,
        episode: v.episode,
        title: v.name || v.title || "",
        released: Date.parse(v.released)
      };
    });
  }
  function cached() {
    return (get("newEpisodes", []) || []).filter(function (e) {
      return !isWatched(e.videoId) && Date.now() - e.released <= DAYS * 864e5;
    });
  }
  function load4() {
    return load().then(scan2).then(function (list2) {
      set("newEpisodes", list2.slice(0, 40));
      return list2;
    });
  }
  function scan2() {
    var series = librarySeries();
    var out = [];
    var i = 0;
    var _worker = function worker() {
      if (i >= series.length) return Promise.resolve();
      var it = series[i++];
      return fetchMeta("series", it._id).then(function (meta) {
        recent(meta, it).forEach(function (e) {
          return out.push(e);
        });
      }).catch(function () {}).then(_worker);
    };
    var workers = [];
    for (var n = 0; n < PARALLEL; n++) workers.push(_worker());
    return Promise.all(workers).then(function () {
      return out.sort(function (a, b) {
        return b.released - a.released;
      });
    });
  }

  // src/js/views/catalog.js
  var PER_ROW = 7;
  function canPage(entry) {
    var c = entry.catalog;
    return (c.extra || []).some(function (e) {
      return e && e.name === "skip";
    }) || (c.extraSupported || []).indexOf("skip") >= 0;
  }
  function CatalogView(entry) {
    var el = h("div.view");
    var scroller = h("div.scroll-y", {
      "data-scroll-y": ""
    });
    var grid = h("div.grid");
    var status2 = h("div.grid-status");
    scroller.appendChild(h("div.row-title.catalog-title", {
      text: catalogTitle(entry)
    }));
    scroller.appendChild(grid);
    scroller.appendChild(status2);
    el.appendChild(scroller);
    var paging = canPage(entry);
    var seen = {};
    var count = 0;
    var loading = false;
    var done = false;
    function add(metas) {
      metas.forEach(function (m) {
        if (!m || seen[m.id]) return;
        seen[m.id] = true;
        var index = count++;
        grid.appendChild(card(m, {
          onSelect: function onSelect() {
            return openDetails(m.type || entry.catalog.type, m.id);
          },
          onFocus: function onFocus() {
            if (count - index <= PER_ROW * 2) more();
          }
        }));
      });
      loadVisibleImages(el, 600);
    }
    function more() {
      if (loading || done) return;
      loading = true;
      clear(status2);
      status2.appendChild(spinnerLine(t("Carregando...")));
      var before = count;
      fetchCatalog(entry, count ? {
        skip: count
      } : null).then(function (metas) {
        add(metas);
        if (!paging || count === before) done = true;
      }).catch(function () {
        done = true;
      }).then(function () {
        loading = false;
        clear(status2);
        if (!count) status2.appendChild(h("div.hint", {
          text: t("Nada por aqui.")
        }));
      });
    }
    more();
    return {
      el: el
    };
  }

  // src/js/views/home.js
  var ROTATE_MS = 8e3;
  function HomeView() {
    var el = h("div.view");
    var scroller = h("div.scroll-y", {
      "data-scroll-y": ""
    });
    var bar = topbar("home", goTab);
    var heroUi = buildHero();
    var cwRow = h("div.row", {
      "data-anchor": "30"
    });
    var neRow = h("div.row", {
      "data-anchor": "30"
    });
    var rows = h("div.rows");
    scroller.appendChild(bar);
    scroller.appendChild(heroUi.el);
    scroller.appendChild(cwRow);
    scroller.appendChild(neRow);
    scroller.appendChild(rows);
    el.appendChild(scroller);
    var loadedBoard = false;
    var lastSync = Date.now();
    function syncContinue() {
      if (!isLoggedIn() || Date.now() - lastSync < 6e4) return;
      lastSync = Date.now();
      var before = JSON.stringify(continueWatching().map(function (it) {
        return [it._id, it.state.video_id, it.state.timeOffset];
      }));
      getLibrary().then(function () {
        var after = JSON.stringify(continueWatching().map(function (it) {
          return [it._id, it.state.video_id, it.state.timeOffset];
        }));
        if (after !== before) {
          renderContinue();
          loadNew(true);
          publishBrowse();
        }
      }).catch(function () {});
    }
    var syncTimer = setInterval(function () {
      if (!el.classList.contains("hidden")) syncContinue();
    }, 3e5);
    var newList = cached();
    var newLoadedAt = 0;
    function loadNew(force) {
      if (!force && Date.now() - newLoadedAt < 30 * 6e4) return;
      newLoadedAt = Date.now();
      load4().then(function (list2) {
        newList = list2;
        renderNew();
        publishBrowse();
      }).catch(function () {});
    }
    function renderNew() {
      clear(neRow);
      if (!newList.length) {
        neRow.style.display = "none";
        return;
      }
      neRow.style.display = "";
      neRow.appendChild(h("div.row-title", null, [t("Novos episódios"), h("small", {
        text: t("Séries da sua biblioteca, últimos 7 dias")
      })]));
      var track = h("div.row-track", {
        "data-scroll-x": "",
        "data-group": ""
      });
      newList.slice(0, 20).forEach(function (e) {
        var c = card({
          name: e.name,
          poster: e.poster
        }, {
          wide: true,
          image: e.thumbnail || e.background || e.poster,
          title: e.name + " · " + epLabel(e.season, e.episode),
          onSelect: function onSelect() {
            return openDetails("series", e.seriesId, {
              videoId: e.videoId,
              autoStreams: true
            });
          }
        });
        c.querySelector(".poster-wrap").appendChild(h("div.badge.new-badge", {
          text: dayLabel(e.released)
        }));
        track.appendChild(c);
      });
      neRow.appendChild(track);
      loadVisibleImages(neRow);
    }
    function dayLabel(ms) {
      var d = new Date(ms);
      var today = /* @__PURE__ */new Date();
      today.setHours(0, 0, 0, 0);
      var day = new Date(d.getTime());
      day.setHours(0, 0, 0, 0);
      var diff = Math.round((today - day) / 864e5);
      if (diff <= 0) return t("Hoje");
      if (diff === 1) return t("Ontem");
      return t(["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"][d.getDay()]);
    }
    function publishBrowse() {
      var cont = continueWatching().slice(0, 20).map(function (it) {
        return {
          type: it.type,
          id: it._id,
          video: it.state.video_id,
          name: it.name,
          sub: episodeLabel(it.state.video_id, it._id),
          poster: it.poster,
          progress: it.state.duration ? Math.round(it.state.timeOffset / it.state.duration * 100) / 100 : 0
        };
      });
      var fresh = newList.slice(0, 20).map(function (e) {
        return {
          type: "series",
          id: e.seriesId,
          video: e.videoId,
          name: e.name,
          sub: epLabel(e.season, e.episode) + (e.title ? " · " + e.title : ""),
          poster: e.poster
        };
      });
      var lib = cachedLibrary().filter(function (it) {
        return !it.removed && it.type !== "other" && it.poster;
      }).sort(function (a, b) {
        return String(b._mtime || "").localeCompare(String(a._mtime || ""));
      }).slice(0, 60).map(function (it) {
        return {
          type: it.type,
          id: it._id,
          name: it.name,
          poster: it.poster
        };
      });
      browse({
        continueWatching: cont,
        newEpisodes: fresh,
        library: lib,
        labels: {
          continueWatching: t("Continuar assistindo"),
          newEpisodes: t("Novos episódios"),
          library: t("Biblioteca")
        }
      });
    }
    function renderContinue() {
      clear(cwRow);
      var items = continueWatching().slice(0, 20);
      if (!items.length) {
        cwRow.style.display = "none";
        return;
      }
      cwRow.style.display = "";
      cwRow.appendChild(h("div.row-title", {
        text: t("Continuar assistindo")
      }));
      var track = h("div.row-track", {
        "data-scroll-x": "",
        "data-group": ""
      });
      items.forEach(function (it) {
        var s = it.state;
        var ep = episodeLabel(s.video_id, it._id);
        var bg = /^tt\d+/.test(it._id) ? background(it._id) : it.poster;
        track.appendChild(card({
          name: it.name,
          poster: it.poster
        }, {
          wide: true,
          image: bg,
          title: it.name + (ep ? " · " + ep : ""),
          progress: s.duration ? s.timeOffset / s.duration : 0,
          onSelect: function onSelect() {
            return openDetails(it.type, it._id, {
              videoId: s.video_id,
              autoStreams: true
            });
          }
        }));
      });
      cwRow.appendChild(track);
      loadVisibleImages(cwRow);
    }
    var pending2 = [];
    var active = 0;
    function loadNearby() {
      if (el.offsetParent === null) return;
      var limit = window.innerHeight * 2.2;
      var _loop5 = function _loop5() {
          var p = pending2[i];
          if (p.state !== "idle") return 0; // continue
          if (!p.row.parentNode) {
            p.state = "done";
            return 0; // continue
          }
          if (p.row.getBoundingClientRect().top > limit) return 1; // break
          p.state = "loading";
          active++;
          p.load().then(function () {
            p.state = "done";
            active--;
            loadNearby();
          });
        },
        _ret3;
      for (var i = 0; i < pending2.length && active < 2; i++) {
        _ret3 = _loop5();
        if (_ret3 === 0) continue;
        if (_ret3 === 1) break;
      }
    }
    function renderBoard() {
      loadedBoard = true;
      pending2 = [];
      clear(rows);
      rows.appendChild(spinnerLine(t("Carregando catálogos...")));
      load().then(function () {
        clear(rows);
        var cats = boardCatalogs();
        if (!cats.length) rows.appendChild(h("div.row-empty", {
          text: t("Nenhum catálogo. Entre na sua conta em Ajustes.")
        }));
        pending2 = cats.map(function (c) {
          return Object.assign(buildRow(c, rows), {
            state: "idle"
          });
        });
        loadNearby();
      }).catch(function (e) {
        clear(rows);
        rows.appendChild(h("div.row-empty", {
          text: t("Erro ao carregar addons: {msg}", {
            msg: e.message
          })
        }));
      });
    }
    heroUi.load();
    var view = {
      el: el,
      onShow: function onShow() {
        renderContinue();
        syncContinue();
        renderNew();
        loadNew(false);
        publishBrowse();
        if (!loadedBoard) renderBoard();
        heroUi.resume();
        loadVisibleImages(el);
      },
      onHide: function onHide() {
        return heroUi.pause();
      },
      onScroll: function onScroll() {
        return loadNearby();
      },
      // Chamado quando um vídeo começa: solta as fileiras (o catálogo volta do cache ao retornar).
      freeMemory: function freeMemory() {
        pending2 = [];
        clear(rows);
        loadedBoard = false;
      },
      onKey: function onKey(e) {
        return heroUi.onKey(e);
      },
      reload: function reload() {
        heroUi.load();
        renderBoard();
      },
      destroy: function destroy() {
        clearInterval(syncTimer);
        heroUi.pause();
        if (bar.__destroy) bar.__destroy();
      }
    };
    return view;
  }
  function episodeLabel(videoId, metaId) {
    if (!videoId || videoId === metaId) return "";
    var m = String(videoId).match(/:(\d+):(\d+)$/);
    return m ? epLabel(m[1], m[2]) : "";
  }
  var ROW_LIMIT = 20;
  function buildRow(entry, parent) {
    var row = h("div.row", {
      "data-anchor": "30"
    });
    var title = h("div.row-title", null, [entry.catalog.name || entry.catalog.id, h("small", {
      text: typeLabel(entry.catalog.type) + " · " + (entry.addon.manifest.name || "")
    })]);
    var track = h("div.row-track.pending", {
      "data-scroll-x": "",
      "data-group": ""
    }, spinnerLine(t("Carregando...")));
    row.appendChild(title);
    row.appendChild(track);
    parent.appendChild(row);
    var load5 = function load5() {
      return fetchCatalog(entry).then(function (metas) {
        clear(track);
        track.classList.remove("pending");
        if (!metas.length) {
          if (row.parentNode) parent.removeChild(row);
          return;
        }
        metas.slice(0, ROW_LIMIT).forEach(function (m) {
          track.appendChild(card(m, {
            onSelect: function onSelect() {
              return openDetails(m.type || entry.catalog.type, m.id);
            }
          }));
        });
        if (metas.length > ROW_LIMIT || canPage(entry)) {
          track.appendChild(h("div.card.see-all", {
            focusable: true,
            onSelect: function onSelect() {
              return push(CatalogView(entry));
            }
          }, [h("div.poster-wrap", null, h("div.see-all-label", null, [h("b", {
            text: "→"
          }), t("Ver tudo")])), h("div.name", {
            text: ""
          })]));
        }
        loadVisibleImages(row);
      }).catch(function () {
        if (row.parentNode) parent.removeChild(row);
      });
    };
    return {
      row: row,
      load: load5
    };
  }
  function typeLabel(type) {
    return {
      movie: t("Filmes"),
      series: t("Séries"),
      anime: t("Animes"),
      channel: t("Canais"),
      tv: "TV"
    }[type] || type;
  }
  function buildHero() {
    var bgA = h("div.hero-bg");
    var bgB = h("div.hero-bg");
    var logo2 = h("img.hero-logo", {
      alt: ""
    });
    var title = h("div.hero-title");
    var meta = h("div.hero-meta");
    var desc = h("div.hero-desc");
    var dots = h("div.hero-dots");
    var watchBtn = h("div.btn.primary", {
      focusable: true,
      html: '<span class="ico">▶</span>' + t("Assistir"),
      onSelect: function onSelect() {
        return open(true);
      }
    });
    var infoBtn = h("div.btn", {
      focusable: true,
      html: '<span class="ico">ⓘ</span>' + t("Detalhes"),
      onSelect: function onSelect() {
        return open(false);
      }
    });
    var buttons = h("div.hero-buttons", {
      "data-group": ""
    }, [watchBtn, infoBtn]);
    buttons.__last = watchBtn;
    var el = h("div.hero", {
      "data-anchor": "0"
    }, [bgA, bgB, h("div.hero-shade-left"), h("div.hero-shade-bottom"), h("div.hero-info", null, [logo2, title, meta, desc, buttons, dots])]);
    var items = [];
    var index = 0;
    var timer = null;
    var front = bgA;
    var paused = true;
    var bgToken = 0;
    function open(play) {
      var it = items[index];
      if (it) openDetails(it.type, it.id, {
        autoStreams: play
      });
    }
    function render() {
      var it = items[index];
      if (!it) {
        el.style.display = "none";
        return;
      }
      el.style.display = "";
      var back2 = front === bgA ? bgB : bgA;
      var pre = new Image();
      var token = ++bgToken;
      pre.onload = function () {
        if (token !== bgToken) return;
        back2.style.backgroundImage = 'url("' + it.background + '")';
        requestAnimationFrame(function () {
          return requestAnimationFrame(function () {
            back2.classList.add("show");
            front.classList.remove("show");
            front = back2;
          });
        });
      };
      pre.src = it.background;
      title.textContent = it.name;
      title.style.display = "none";
      logo2.style.display = "";
      logo2.onerror = function () {
        logo2.style.display = "none";
        title.style.display = "";
      };
      logo2.src = it.logo;
      var parts = [];
      if (it.year) parts.push(it.year);
      if (it.runtime) parts.push(it.runtime);
      if (it.genres && it.genres.length) parts.push(it.genres.slice(0, 3).join(", "));
      meta.innerHTML = (it.rating ? '<span class="imdb">★ ' + escapeHtml(it.rating) + "</span> · " : "") + escapeHtml(parts.join(" · "));
      desc.textContent = it.description || "";
      clear(dots);
      items.forEach(function (_, i) {
        return dots.appendChild(h("span", {
          cls: i === index ? "on" : ""
        }));
      });
      var nx = items[(index + 1) % items.length];
      if (nx) new Image().src = nx.background;
    }
    function schedule() {
      clearTimeout(timer);
      if (paused || items.length < 2) return;
      timer = setTimeout(function () {
        if (el.getBoundingClientRect().bottom > 0) {
          index = (index + 1) % items.length;
          render();
        }
        schedule();
      }, ROTATE_MS);
    }
    function go(delta) {
      if (!items.length) return;
      index = (index + delta + items.length) % items.length;
      render();
      schedule();
    }
    return {
      el: el,
      load: function load() {
        return load2().then(function (list2) {
          items = list2.slice(0, 12);
          index = 0;
          render();
          schedule();
        }).catch(function () {
          items = [];
          render();
        });
      },
      // Fora de vista, o banner solta os fundos (2 imagens 1920x1080 ≈ 16 MB na memória).
      pause: function pause() {
        paused = true;
        clearTimeout(timer);
        bgToken++;
        bgA.style.backgroundImage = "";
        bgB.style.backgroundImage = "";
        bgA.classList.remove("show");
        bgB.classList.remove("show");
      },
      resume: function resume() {
        paused = false;
        if (items.length) render();
        schedule();
      },
      // Esquerda no primeiro botão / direita no último: troca o destaque.
      onKey: function onKey(e) {
        var cur = current2();
        if (!cur || !buttons.contains(cur)) return false;
        if (e.keyCode === KEY.LEFT && cur === watchBtn) {
          go(-1);
          return true;
        }
        if (e.keyCode === KEY.RIGHT && cur === infoBtn) {
          go(1);
          return true;
        }
        return false;
      }
    };
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;"
      }[c];
    });
  }

  // src/js/views/search.js
  function SearchView() {
    var el = h("div.view");
    var scroller = h("div.scroll-y", {
      "data-scroll-y": ""
    });
    var bar = topbar("search", goTab);
    var input = h("input.input", {
      type: "text",
      placeholder: t("Buscar filmes e séries..."),
      focusable: true,
      "data-autofocus": ""
    });
    var results = h("div.rows");
    scroller.appendChild(bar);
    scroller.appendChild(h("div.search-box", null, input));
    scroller.appendChild(results);
    el.appendChild(scroller);
    var token = 0;
    input.__submit = function (q) {
      return run(q);
    };
    function run(q) {
      var query = (q || "").trim();
      clear(results);
      if (query.length < 2) {
        results.appendChild(h("div.hint", {
          text: t("Digite pelo menos 2 letras e confirme no teclado.")
        }));
        return;
      }
      var my = ++token;
      results.appendChild(spinnerLine(t('Buscando "{q}"...', {
        q: query
      })));
      var people = h("div.row.people-row", {
        "data-anchor": "30"
      });
      searchPeople(query).then(function (list2) {
        if (my !== token || !list2.length) return;
        people.appendChild(h("div.row-title", {
          text: t("Pessoas")
        }));
        people.appendChild(h("div.row-track", {
          "data-scroll-x": "",
          "data-group": ""
        }, list2.map(function (p) {
          return h("div.cast.person-card", {
            focusable: true,
            onSelect: function onSelect() {
              return push(PersonView(p.id, p.name));
            }
          }, [h("div.ph", null, h("img", {
            src: p.photo,
            alt: ""
          })), h("div.nm", {
            text: p.name
          })]);
        })));
        results.insertBefore(people, results.firstChild);
      }).catch(function () {});
      load().then(function () {
        if (my !== token) return;
        clear(results);
        if (people.firstChild) results.appendChild(people);
        var cats = searchCatalogs();
        if (!cats.length) results.appendChild(h("div.hint", {
          text: t("Nenhum addon com busca instalado.")
        }));
        var found = 0;
        var pending2 = cats.length;
        cats.forEach(function (entry) {
          var row = h("div.row", {
            "data-anchor": "30"
          });
          var track = h("div.row-track", {
            "data-scroll-x": "",
            "data-group": ""
          });
          row.appendChild(h("div.row-title", null, [entry.catalog.name || entry.catalog.id, h("small", {
            text: catalogTitle(entry).split(" · ").pop()
          })]));
          row.appendChild(track);
          fetchCatalog(entry, {
            search: query
          }).then(function (metas) {
            if (my !== token || !metas.length) return;
            found++;
            metas.slice(0, 30).forEach(function (m) {
              return track.appendChild(card(m, {
                onSelect: function onSelect() {
                  return openDetails(m.type || entry.catalog.type, m.id);
                }
              }));
            });
            results.appendChild(row);
            loadVisibleImages(row);
          }).catch(function () {}).then(function () {
            pending2--;
            if (my === token && pending2 === 0 && !found) results.appendChild(h("div.hint", {
              text: t('Nada encontrado para "{q}".', {
                q: query
              })
            }));
          });
        });
      });
    }
    run("");
    return {
      el: el,
      onShow: function onShow() {
        return loadVisibleImages(el);
      },
      destroy: function destroy() {
        return bar.__destroy && bar.__destroy();
      },
      focusInput: function focusInput() {
        return focus(input);
      },
      // From the phone remote: fill the box and run the search.
      search: function search(q) {
        input.value = q;
        run(q);
      }
    };
  }

  // src/js/views/library.js
  var FILTERS = [{
    id: "all",
    label: "Tudo"
  }, {
    id: "movie",
    label: "Filmes"
  }, {
    id: "series",
    label: "Séries"
  }];
  function LibraryView() {
    var el = h("div.view");
    var scroller = h("div.scroll-y", {
      "data-scroll-y": ""
    });
    var bar = topbar("library", goTab);
    var filters = h("div.filters", {
      "data-group": ""
    });
    var grid = h("div.grid");
    scroller.appendChild(bar);
    scroller.appendChild(filters);
    scroller.appendChild(grid);
    el.appendChild(scroller);
    var filter = "all";
    function renderFilters() {
      clear(filters);
      FILTERS.forEach(function (f) {
        return filters.appendChild(h("div.chip", {
          focusable: true,
          cls: f.id === filter ? "active" : "",
          text: t(f.label),
          onSelect: function onSelect() {
            filter = f.id;
            renderFilters();
            renderGrid();
            focus(filters.children[FILTERS.indexOf(f)]);
          }
        }));
      });
    }
    function renderGrid() {
      clear(grid);
      var items = cachedLibrary().filter(function (it) {
        return !it.removed && (filter === "all" || it.type === filter);
      }).sort(function (a, b) {
        return String(b._mtime || "").localeCompare(String(a._mtime || ""));
      });
      if (!items.length) {
        grid.appendChild(h("div.hint", {
          text: isLoggedIn() ? t("Sua biblioteca está vazia.") : t("Entre na sua conta em Ajustes para ver a biblioteca.")
        }));
        return;
      }
      items.forEach(function (it) {
        return grid.appendChild(card({
          name: it.name,
          poster: it.poster
        }, {
          onSelect: function onSelect() {
            return openDetails(it.type, it._id);
          }
        }));
      });
      loadVisibleImages(el, 400);
    }
    renderFilters();
    grid.appendChild(spinnerLine(t("Carregando biblioteca...")));
    return {
      el: el,
      onShow: function onShow() {
        renderGrid();
        getLibrary().then(function () {
          return renderGrid();
        }).catch(function () {});
      },
      destroy: function destroy() {
        return bar.__destroy && bar.__destroy();
      }
    };
  }

  // src/js/api/update.js
  var REPO = "ITzAkai/stremio-kai-tizen";
  var REPO_URL = "https://github.com/" + REPO;
  var VERSION = "1.2.0-tizen.1";
  var BUILD = "2026-10-27T15:51:00.019Z";
  var RAW = "https://raw.githubusercontent.com/" + REPO + "/main/";
  var CDN = "https://cdn.jsdelivr.net/gh/" + REPO + "/";
  var PURGE = "https://purge.jsdelivr.net/gh/" + REPO + "/";
  var FILES = ["package.json", "dist/index.html", "dist/app.js", "dist/app.css", "dist/remote-service.js", "dist/build.json"];
  function latest() {
    var bust = "?t=" + Date.now();
    return Promise.all([getJSON(RAW + "dist/build.json" + bust, {
      timeout: 15e3,
      quiet: true
    }), getJSON("https://api.github.com/repos/" + REPO + "/commits?per_page=1", {
      timeout: 15e3,
      quiet: true
    }).catch(function () {
      return null;
    })]).then(function (r) {
      var b = r[0] || {};
      var c = r[1] && r[1][0] && r[1][0].commit;
      return {
        build: b.build,
        version: b.version || VERSION,
        message: c ? String(c.message).split("\n")[0] : "",
        date: c && c.committer && c.committer.date || b.build
      };
    });
  }
  function check2() {
    return latest().then(function (info2) {
      saveSettings({
        lastUpdateCheck: Date.now()
      });
      return info2.build && info2.build !== BUILD && Date.parse(info2.build) > Date.parse(BUILD) ? info2 : null;
    });
  }
  function apply2(info2) {
    return Promise.all(FILES.map(function (f) {
      return getJSON(PURGE + f, {
        timeout: 2e4,
        quiet: true
      }).catch(function () {
        return null;
      });
    })).then(function () {
      var tries = 0;
      var _poll = function poll2() {
        return getJSON(CDN + "dist/build.json?t=" + Date.now(), {
          timeout: 15e3,
          quiet: true
        }).catch(function () {
          return {};
        }).then(function (b) {
          if (b.build === info2.build) {
            window.location.reload();
            return true;
          }
          if (++tries >= 6) return false;
          return new Promise(function (r) {
            return setTimeout(r, 1e4);
          }).then(_poll);
        });
      };
      return _poll();
    });
  }
  function shouldAutoCheck() {
    var last2 = settings().lastUpdateCheck || 0;
    return Date.now() - last2 > 24 * 3600 * 1e3;
  }

  // src/js/views/login.js
  function openLogin(onDone) {
    push(LoginView(onDone));
  }
  function LoginView(onDone) {
    var el = h("div.view");
    var codeEl = h("div.code", {
      text: "····"
    });
    var qr = h("img.qr", {
      alt: ""
    });
    var codeStatus = h("p", {
      text: t("Gerando código...")
    });
    var email = h("input.input", {
      type: "email",
      placeholder: t("E-mail"),
      focusable: true
    });
    var pass = h("input.input", {
      type: "password",
      placeholder: t("Senha"),
      focusable: true
    });
    var err = h("div.err");
    var btn = h("div.btn.primary", {
      focusable: true,
      text: t("Entrar"),
      onSelect: function onSelect() {
        return doLogin();
      }
    });
    pass.__submit = function () {
      return doLogin();
    };
    email.__submit = function () {
      return focus(pass);
    };
    el.appendChild(h("div.login", null, h("div.login-card", null, [h("div.login-col", null, [h("h1", {
      text: t("Entrar com o celular")
    }), h("p", {
      html: t("No celular ou PC, abra <b>link.stremio.com</b> e digite o código:")
    }), codeEl, qr, codeStatus]), h("div.login-col", null, [h("h1", {
      text: t("Ou com e-mail")
    }), h("p", {
      text: t("Use a mesma conta do Stremio. Seus addons e a biblioteca vêm junto.")
    }), email, pass, err, h("div", {
      "data-group": ""
    }, [btn, h("div.btn", {
      focusable: true,
      text: t("Cancelar"),
      onSelect: function onSelect() {
        return pop();
      }
    })])])])));
    var alive = true;
    var pollTimer = null;
    var code = null;
    function newCode() {
      createLinkCode().then(function (r) {
        if (!alive) return;
        code = r.code;
        codeEl.textContent = r.code;
        qr.src = r.qrcode;
        codeStatus.textContent = t("Aguardando confirmação...");
        poll2(0);
      }).catch(function () {
        codeStatus.textContent = t("Não foi possível gerar o código. Use o e-mail ao lado.");
      });
    }
    function poll2(n) {
      clearTimeout(pollTimer);
      if (!alive) return;
      if (n > 100) {
        codeStatus.textContent = t("Código expirou. Gerando outro...");
        return newCode();
      }
      pollTimer = setTimeout(function () {
        readLinkCode(code).then(function (ok) {
          return ok ? done() : poll2(n + 1);
        }).catch(function () {
          return poll2(n + 1);
        });
      }, 3e3);
    }
    function doLogin() {
      clear(err);
      if (!email.value || !pass.value) {
        err.textContent = t("Preencha e-mail e senha.");
        return;
      }
      err.textContent = t("Entrando...");
      login(email.value.trim(), pass.value).then(function () {
        return done();
      }).catch(function (e) {
        return err.textContent = e.message || t("Falha no login");
      });
    }
    function done() {
      if (!alive) return;
      alive = false;
      toast(t("Conectado à conta Stremio"));
      pop();
      if (onDone) onDone();
    }
    newCode();
    return {
      el: el,
      destroy: function destroy() {
        alive = false;
        clearTimeout(pollTimer);
      }
    };
  }

  // src/js/lib/theme.js
  var THEMES = [{
    id: "purple",
    label: "Roxo",
    main: "#7b5bf5",
    light: "#9d85ff",
    pale: "#c9bbff"
  }, {
    id: "gold",
    label: "Dourado",
    main: "#c9961a",
    light: "#e0b54a",
    pale: "#f2dca0"
  }, {
    id: "teal",
    label: "Verde-água",
    main: "#14958c",
    light: "#3fc9bf",
    pale: "#a8ebe6"
  }, {
    id: "red",
    label: "Vermelho",
    main: "#d6334a",
    light: "#f0596c",
    pale: "#f7b8c1"
  }, {
    id: "blue",
    label: "Azul",
    main: "#2f6fe0",
    light: "#5b93f5",
    pale: "#b9d0fb"
  }, {
    id: "green",
    label: "Verde",
    main: "#2e9e57",
    light: "#4fc27a",
    pale: "#b6e8c8"
  }];
  var BASE2 = THEMES[0];
  function rgb(hex) {
    var n = parseInt(hex.slice(1), 16);
    return [n >> 16 & 255, n >> 8 & 255, n & 255].join(",");
  }
  function recolor(css, th) {
    var swap = [[BASE2.main, th.main], [BASE2.light, th.light], [BASE2.pale, th.pale], ["rgba(" + rgb(BASE2.main) + ",", "rgba(" + rgb(th.main) + ","], ["rgba(" + rgb(BASE2.light) + ",", "rgba(" + rgb(th.light) + ","], ["#b9a8ff", th.pale]];
    swap.forEach(function (p) {
      css = css.split(p[0]).join(p[1]).split(p[0].toUpperCase()).join(p[1]);
    });
    return css;
  }
  function apply3(id) {
    var old = document.getElementById("theme-css");
    if (old) old.parentNode.removeChild(old);
    var th = THEMES.find(function (x2) {
      return x2.id === id;
    });
    if (!th || th === BASE2) return;
    var x = new XMLHttpRequest();
    x.open("GET", "app.css");
    x.onload = function () {
      if (x.status !== 200) return;
      var style = document.createElement("style");
      style.id = "theme-css";
      style.textContent = recolor(x.responseText, th);
      document.head.appendChild(style);
    };
    x.send();
  }

  // src/js/views/settings.js
  var SUB_LANGS = [{
    label: "Inglês",
    value: ["eng", "en"]
  }, {
    label: "Árabe",
    value: ["ara", "ar"]
  }, {
    label: "Espanhol",
    value: ["spa", "es"]
  }, {
    label: "Nenhum (não ligar sozinho)",
    value: []
  }];
  var AUDIO_LANGS = [{
    label: "Original do arquivo",
    value: []
  }, {
    label: "Inglês quando houver",
    value: ["eng", "en"]
  }, {
    label: "Árabe quando houver",
    value: ["ara", "ar"]
  }, {
    label: "Japonês quando houver",
    value: ["jpn", "ja"]
  }];
  var RECOMMENDED = [{
    id: "community.anime.kitsu",
    name: "Anime Kitsu",
    url: "https://anime-kitsu.strem.fun/manifest.json",
    desc: "Catálogos e detalhes de animes (usado pelo calendário)"
  }, {
    id: "org.stremio.opensubtitlesv3",
    name: "OpenSubtitles v3",
    url: "https://opensubtitles-v3.strem.io/manifest.json",
    desc: "Legendas em português para quase tudo"
  }];
  function SettingsView() {
    var el = h("div.view");
    var scroller = h("div.scroll-y", {
      "data-scroll-y": ""
    });
    var bar = topbar("settings", goTab);
    var body = h("div.settings");
    scroller.appendChild(bar);
    scroller.appendChild(body);
    el.appendChild(scroller);
    var device = "";
    deviceInfo().then(function (d) {
      device = [d.modelName, d.firmwareVersion, d.sdkVersion ? "webOS " + d.sdkVersion : ""].filter(Boolean).join(" · ");
    }).catch(function () {});
    function row(label, sub, value, onSelect, extra) {
      return h("div.set-row", {
        focusable: true,
        onSelect: onSelect
      }, [h("div.label", null, [label, sub ? h("small", {
        text: sub
      }) : null]), extra || h("div.value", {
        text: value || ""
      })]);
    }
    function checkForUpdate() {
      toast(t("Procurando atualização..."));
      check2().then(function (info2) {
        if (!info2) return toast(t("Você já tem a versão mais nova."));
        confirmDialog(t("Atualização disponível ({date}): {msg}", {
          date: shortDate(info2.date),
          msg: info2.message || ""
        }), t("Atualizar agora"), function () {
          toast(t("Atualizando... o app vai recarregar."), 6e4);
          apply2(info2).then(function (ok) {
            if (!ok) toast(t("A atualização ainda está chegando. Tente de novo em alguns minutos."), 6e3);
          });
        });
      }).catch(function (e) {
        return toast(t("Não foi possível verificar: {msg}", {
          msg: e.message
        }), 5e3);
      });
    }
    function shortDate(iso) {
      var d = new Date(iso);
      if (isNaN(d.getTime())) return "";
      return ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    }
    function installFromUrl(url2, name) {
      if (!isLoggedIn()) return toast(t("Entre na conta primeiro"));
      confirmDialog(t("Instalar {name} na sua conta Stremio?", {
        name: name
      }), t("Instalar"), function () {
        toast(t("Instalando..."));
        installAddon(url2).then(function (m) {
          return load(true).then(function () {
            return m;
          });
        }).then(function (m) {
          dropTab("home");
          toast(t("{name} instalado na sua conta", {
            name: m.name || "Addon"
          }));
          render();
        }).catch(function (e) {
          return toast(t("Não foi possível instalar: {msg}", {
            msg: e.message
          }), 5e3);
        });
      });
    }
    function toggle(on) {
      return h("div.toggle", {
        cls: on ? "on" : ""
      }, h("i"));
    }
    function render() {
      var s = settings();
      var keep = current2();
      var keepIndex = keep ? Array.prototype.indexOf.call(body.querySelectorAll(".set-row"), keep) : -1;
      clear(body);
      var LANGS = [{
        id: "auto",
        label: t("Automático (idioma da TV)")
      }, {
        id: "en",
        label: "English"
      }, {
        id: "ar",
        label: "العربية"
      }];
      body.appendChild(h("div.set-section", {
        text: "Language / اللغة"
      }));
      body.appendChild(row("Language / اللغة", "", (LANGS.find(function (l) {
        return l.id === s.language;
      }) || LANGS[0]).label, function () {
        return menu("Language / اللغة", LANGS.map(function (l) {
          return {
            label: l.label,
            value: l.id,
            checked: l.id === s.language
          };
        }), {
          onPick: function onPick(v) {
            if (v === s.language) return;
            saveSettings({
              language: v
            });
            window.location.reload();
          }
        });
      }));
      var prof = activeProfile();
      var allProfiles = profiles();
      body.appendChild(h("div.set-section", {
        text: t("Perfil")
      }));
      var nameInput = h("input.input", {
        type: "text",
        value: prof.name
      });
      nameInput.__submit = function (v) {
        var name = v.trim();
        if (!name) return;
        updateProfile(prof.id, {
          name: name
        });
        refreshProfileChips();
        toast(t("Nome do perfil salvo"));
        render();
      };
      body.appendChild(h("div.set-row", {
        focusable: true,
        onSelect: function onSelect() {
          return select(nameInput);
        }
      }, [h("div.label", null, [avatar(prof, "small"), " " + t("Nome do perfil"), h("small", {
        text: t("Este perfil usa a conta Stremio abaixo")
      })]), nameInput]));
      body.appendChild(row(t("Cor do perfil"), "", "", function () {
        return menu(t("Cor do perfil"), COLORS.map(function (c, i) {
          return {
            label: [t("Roxo"), t("Rosa"), t("Verde-água"), t("Laranja"), t("Azul"), t("Vermelho"), t("Verde"), t("Cinza")][i],
            value: c,
            checked: c === prof.color
          };
        }), {
          onPick: function onPick(c) {
            updateProfile(prof.id, {
              color: c
            });
            refreshProfileChips();
            render();
          }
        });
      }, h("div.avatar.small", {
        style: {
          backgroundColor: prof.color
        },
        text: " "
      })));
      if (allProfiles.length > 1) {
        body.appendChild(row(t("Trocar de perfil"), t("{n} perfis nesta TV", {
          n: allProfiles.length
        }), "", function () {
          return menu(t("Trocar de perfil"), allProfiles.map(function (p) {
            return {
              label: p.name,
              value: p.id,
              checked: p.id === prof.id
            };
          }), {
            onPick: function onPick(id) {
              return id !== prof.id && switchProfile(id);
            }
          });
        }));
      }
      body.appendChild(row(t("Adicionar perfil"), t("Para outra pessoa, com outra conta Stremio"), "", function () {
        return createProfile();
      }));
      if (allProfiles.length > 1) {
        body.appendChild(row(t('Perguntar "Quem está assistindo?" ao abrir'), "", "", function () {
          saveSettings({
            askProfile: !settings().askProfile
          });
          render();
        }, toggle(s.askProfile)));
        body.appendChild(row(t("Apagar este perfil"), t("Remove deste aparelho a conta e as preferências do perfil (a conta Stremio continua existindo)"), "", function () {
          return confirmDialog(t('Apagar o perfil "{name}" desta TV?', {
            name: prof.name
          }), t("Apagar"), function () {
            removeProfile(prof.id);
            switchProfile(activeProfile().id);
          });
        }));
      }
      body.appendChild(h("div.set-section", {
        text: t("Conta Stremio")
      }));
      if (isLoggedIn()) {
        var u = user();
        body.appendChild(row(t("Conectado"), t("Addons e biblioteca sincronizados com a conta"), u && u.email || t("conta Stremio"), null));
        body.appendChild(row(t("Atualizar addons e biblioteca"), t("Busca de novo a lista de addons instalados"), "", function () {
          Promise.all([load(true), getLibrary()]).then(function () {
            toast(t("Atualizado"));
            dropTab("home");
          }).catch(function (e) {
            return toast(t("Erro: {msg}", {
              msg: e.message
            }));
          });
        }));
        body.appendChild(row(t("Sair da conta"), "", "", function () {
          return confirmDialog(t("Sair da conta Stremio?"), t("Sair"), function () {
            logout();
            load(true).then(function () {
              dropTab("home");
              render();
            });
          });
        }));
      } else {
        body.appendChild(row(t("Entrar na conta"), t("Traz seus addons (Torrentio, debrid...) e a biblioteca"), "", function () {
          return openLogin(function () {
            Promise.all([refreshUser().catch(function () {}), load(true), getLibrary()]).then(function () {
              dropTab("home");
              render();
            });
          });
        }));
      }
      body.appendChild(h("div.set-section", {
        text: t("Controle pelo celular")
      }));
      var phoneBox = h("div.set-row.phone-remote", {
        focusable: true
      }, h("div.phone-sub", {
        text: t("Carregando...")
      }));
      body.appendChild(phoneBox);
      info().then(function (i) {
        clear(phoneBox);
        if (!i) {
          phoneBox.appendChild(h("div.phone-sub", {
            text: t("O controle pelo celular não está rodando. Feche o app e abra de novo pelo TizenBrew.")
          }));
          return;
        }
        phoneBox.appendChild(h("img.phone-qr", {
          src: qrImage(i.url, 300),
          alt: ""
        }));
        phoneBox.appendChild(h("div.phone-text", null, [h("div.phone-title", {
          text: t("Aponte a câmera do celular para o código")
        }), h("div.phone-sub", {
          text: t("Ou abra no navegador do celular (mesmo Wi-Fi):")
        }), h("div.phone-url", {
          text: "http://" + i.ip + ":" + i.port
        }), h("div.phone-sub", {
          text: t("PIN: {pin}", {
            pin: i.pin
          })
        })]));
      });
      body.appendChild(h("div.set-section", {
        text: t("Servidor de streaming (PC)")
      }));
      var st = lastStatus();
      var stText = !s.serverUrl ? t("não configurado") : st.ok && st.url === baseUrl() ? t("conectado ✓") : t("sem resposta");
      var urlInput = h("input.input", {
        type: "text",
        value: s.serverUrl || "",
        placeholder: "ex.: 192.168.0.10"
      });
      urlInput.__submit = function (v) {
        saveSettings({
          serverUrl: v.trim()
        });
        check().then(function (r) {
          toast(r.ok ? t("Servidor conectado") : t("Servidor não respondeu em {url}", {
            url: baseUrl()
          }));
          render();
        });
      };
      body.appendChild(h("div.set-row", {
        focusable: true,
        onSelect: function onSelect() {
          return select(urlInput);
        }
      }, [h("div.label", null, [t("Endereço do PC"), h("small", {
        text: t("Rode o stremio-service no PC (porta 11470). Status: {s}", {
          s: stText
        })
      })]), urlInput]));
      body.appendChild(row(t("Procurar na rede"), t("Varre a rede local atrás do servidor"), "", function () {
        toast(t("Procurando servidor na rede..."), 2e4);
        scan().then(function (ip) {
          if (!ip) return toast(t("Nenhum servidor encontrado. Ele está aberto no PC?"));
          saveSettings({
            serverUrl: ip
          });
          return check().then(function () {
            toast(t("Servidor encontrado em {ip}", {
              ip: ip
            }));
            render();
          });
        }).catch(function (e) {
          return toast(t("Falha na busca: {msg}", {
            msg: e.message
          }));
        });
      }));
      body.appendChild(row(t("Testar conexão"), "", "", function () {
        return check().then(function (r) {
          toast(r.ok ? t("Servidor OK") + (r.version ? " (v" + r.version + ")" : "") : t("Sem resposta de {url}", {
            url: baseUrl() || "-"
          }));
          render();
        });
      }));
      body.appendChild(h("div.set-section", {
        text: t("Aparência (Kai)")
      }));
      var heroName = t((SOURCES.find(function (x) {
        return x.id === s.heroSource;
      }) || SOURCES[0]).name);
      body.appendChild(row(t("Hero Banner"), t("Destaques no topo da tela inicial"), heroName, function () {
        return menu(t("Fonte do Hero Banner"), SOURCES.map(function (x) {
          return {
            label: t(x.name),
            value: x.id,
            checked: x.id === s.heroSource
          };
        }), {
          onPick: function onPick(v) {
            saveSettings({
              heroSource: v
            });
            dropTab("home");
            render();
          }
        });
      }));
      var curTheme = THEMES.find(function (x) {
        return x.id === s.theme;
      }) || THEMES[0];
      body.appendChild(row(t("Tema de cores"), t("Cor de destaque do app"), t(curTheme.label), function () {
        return menu(t("Tema de cores"), THEMES.map(function (x) {
          return {
            label: t(x.label),
            value: x.id,
            checked: x.id === curTheme.id
          };
        }), {
          onPick: function onPick(v) {
            saveSettings({
              theme: v
            });
            apply3(v);
            render();
          }
        });
      }));
      body.appendChild(row(t("Tema OLED (preto puro)"), t("Fundo totalmente preto"), "", function () {
        var on = !settings().oled;
        saveSettings({
          oled: on
        });
        document.body.classList.toggle("oled", on);
        render();
      }, toggle(s.oled)));
      body.appendChild(row(t("Escolha inteligente"), t("Assistir já toca a melhor fonte; o botão Fontes mostra a lista"), "", function () {
        saveSettings({
          smartChoice: settings().smartChoice === false
        });
        render();
      }, toggle(s.smartChoice !== false)));
      body.appendChild(row(t("Rolagem animada"), t("Mais bonita, porém mais pesada na TV"), "", function () {
        var on = !settings().smoothScroll;
        saveSettings({
          smoothScroll: on
        });
        setSmooth(on);
        render();
      }, toggle(s.smoothScroll)));
      body.appendChild(h("div.set-section", {
        text: t("Legendas e áudio")
      }));
      var subName = (SUB_LANGS.find(function (x) {
        return JSON.stringify(x.value) === JSON.stringify(s.subtitleLangs);
      }) || {
        label: (s.subtitleLangs || []).join(", ")
      }).label;
      body.appendChild(row(t("Idioma da legenda"), t("Escolhida sozinha ao abrir o vídeo"), t(subName), function () {
        return menu(t("Idioma da legenda"), SUB_LANGS.map(function (x) {
          return {
            label: t(x.label),
            value: x.value,
            checked: x.label === subName
          };
        }), {
          onPick: function onPick(v) {
            saveSettings({
              subtitleLangs: v
            });
            render();
          }
        });
      }));
      body.appendChild(row(t("Ligar legenda automaticamente"), t("Se o áudio não estiver no seu idioma"), "", function () {
        saveSettings({
          subtitlesAuto: !settings().subtitlesAuto
        });
        render();
      }, toggle(s.subtitlesAuto)));
      var audName = (AUDIO_LANGS.find(function (x) {
        return JSON.stringify(x.value) === JSON.stringify(s.audioLangs);
      }) || AUDIO_LANGS[0]).label;
      body.appendChild(row(t("Áudio preferido"), t("Precisa do servidor do PC para ler as faixas"), t(audName), function () {
        return menu(t("Áudio preferido"), AUDIO_LANGS.map(function (x) {
          return {
            label: t(x.label),
            value: x.value,
            checked: x.label === audName
          };
        }), {
          onPick: function onPick(v) {
            saveSettings({
              audioLangs: v
            });
            render();
          }
        });
      }));
      body.appendChild(h("div.set-section", {
        text: t("Aparência da legenda")
      }));
      var preview = h("div.subs", null, h("span", {
        html: t("Oi. Meu nome é Peter Parker.") + "\n<i>" + t("Você não lembra de mim...") + "</i>"
      }));
      apply(preview, s);
      body.appendChild(h("div.sub-preview", null, preview));
      var lb = labels(s);
      var choose = function choose(title, sub, list3, key, value, label) {
        return body.appendChild(row(title, sub, t(String(label)), function () {
          return menu(title, list3.map(function (x) {
            return {
              label: t(String(x.label)),
              value: x.id,
              checked: x.id === value
            };
          }), {
            onPick: function onPick(v) {
              var patch = {};
              patch[key] = v;
              saveSettings(patch);
              render();
            }
          });
        }));
      };
      choose(t("Fonte"), t("Vale para legendas de addons (OpenSubtitles etc.)"), FONTS, "subtitleFont", s.subtitleFont, lb.font);
      choose(t("Estilo"), t("Contorno, sombra ou caixa de fundo"), STYLES, "subtitleStyle", s.subtitleStyle, lb.style);
      choose(t("Cor do texto"), "", COLORS2, "subtitleColor", s.subtitleColor, lb.color);
      choose(t("Tamanho"), "", SIZES.map(function (v) {
        return {
          id: v,
          label: v + "%"
        };
      }), "subtitleSize", s.subtitleSize || 100, (s.subtitleSize || 100) + "%");
      choose(t("Posição"), t("Distância da borda de baixo"), POSITIONS, "subtitlePosition", s.subtitlePosition, lb.position);
      body.appendChild(row(t("Negrito"), t("O Kai usa negrito"), "", function () {
        saveSettings({
          subtitleBold: settings().subtitleBold === false
        });
        render();
      }, toggle(s.subtitleBold !== false)));
      body.appendChild(h("div.hint", {
        style: {
          padding: "6px 4px 0"
        },
        text: t("Legendas embutidas no arquivo são desenhadas pela própria TV: só cor, tamanho, posição e caixa se aplicam a elas.")
      }));
      body.appendChild(h("div.set-section", {
        text: t("Player")
      }));
      choose(t("Pular abertura e encerramento"), t("IntroDB (séries e filmes) e AniSkip (animes)"), [{
        id: "auto",
        label: t("Pular automaticamente")
      }, {
        id: "prompt",
        label: t('Mostrar botão "Pular"')
      }, {
        id: "off",
        label: t("Desligado")
      }], "skipMode", s.skipMode, {
        prompt: t("Mostrar botão"),
        auto: t("Automático"),
        off: t("Desligado")
      }[s.skipMode] || t("Automático"));
      body.appendChild(h("div.set-section", {
        text: t("Metadados extras (opcional)")
      }));
      var keyRow = function keyRow(title, sub, key, placeholder) {
        var input = h("input.input", {
          type: "text",
          value: s[key] || "",
          placeholder: placeholder
        });
        input.__submit = function (v) {
          var patch = {};
          patch[key] = v.trim();
          saveSettings(patch);
          toast(v.trim() ? t("Chave salva") : t("Chave removida"));
          render();
        };
        body.appendChild(h("div.set-row", {
          focusable: true,
          onSelect: function onSelect() {
            return select(input);
          }
        }, [h("div.label", null, [title, h("small", {
          text: sub
        })]), input]));
      };
      keyRow(t("Chave TMDB"), t("Descrições em árabe, perfis de atores, calendário de filmes, logos e elenco com fotos (grátis em themoviedb.org)"), "tmdbKey", "API key (v3)");
      keyRow(t("Chave MDBList"), t("Notas do Rotten Tomatoes, Metacritic, Trakt e Letterboxd (grátis em mdblist.com)"), "mdblistKey", "API key");
      body.appendChild(h("div.set-section", {
        text: t("Addons")
      }));
      var list2 = list();
      body.appendChild(row(t("Addons ativos"), isLoggedIn() ? t("Gerencie pela sua conta em web.stremio.com") : t("Sem conta: Cinemeta, OpenSubtitles e os adicionados aqui"), t("{n} addon(s)", {
        n: list2.length
      }), function () {
        return menu(t("Addons ativos"), list2.map(function (a) {
          return {
            label: a.manifest.name || a.manifest.id,
            sub: a.transportUrl
          };
        }), {});
      }));
      RECOMMENDED.filter(function (r) {
        return !list2.some(function (a) {
          return a.transportUrl === r.url || a.manifest && a.manifest.id === r.id;
        });
      }).forEach(function (r) {
        return body.appendChild(row(t("Instalar {name}", {
          name: r.name
        }), t(r.desc), "", function () {
          return installFromUrl(r.url, r.name);
        }));
      });
      var addInput = h("input.input", {
        type: "text",
        placeholder: "https://.../manifest.json"
      });
      addInput.__submit = function (v) {
        var u = v.trim();
        if (!/^https?:\/\/.+manifest\.json/.test(u)) return toast(t("Cole a URL do manifest.json do addon"));
        if (isLoggedIn()) return installFromUrl(u, t("o addon"));
        var cur = settings().localAddons || [];
        saveSettings({
          localAddons: cur.concat([u])
        });
        load(true).then(function () {
          dropTab("home");
          toast(t("Addon adicionado"));
          render();
        });
      };
      body.appendChild(h("div.set-row", {
        focusable: true,
        onSelect: function onSelect() {
          return select(addInput);
        }
      }, [h("div.label", null, [t("Adicionar addon por URL"), h("small", {
        text: isLoggedIn() ? t("Instala na sua conta Stremio") : t("Fica só nesta TV")
      })]), addInput]));
      body.appendChild(h("div.set-section", {
        text: t("Sobre e depuração")
      }));
      var logInput = h("input.input", {
        type: "text",
        value: s.devlogUrl || "",
        placeholder: "http://IP-DO-PC:8099/log"
      });
      logInput.__submit = function (v) {
        saveSettings({
          devlogUrl: v.trim()
        });
        log.setRemote(v.trim());
        log.info(t("Log remoto ligado"));
        toast(v.trim() ? t("Enviando logs para o PC") : t("Log remoto desligado"));
      };
      body.appendChild(h("div.set-row", {
        focusable: true,
        onSelect: function onSelect() {
          return select(logInput);
        }
      }, [h("div.label", null, [t("Log remoto"), h("small", {
        text: t("npm run logs no PC")
      })]), logInput]));
      body.appendChild(h("div.set-section", {
        text: t("Atualizações")
      }));
      body.appendChild(row(t("Versão instalada"), device || "Stremio Kai", shortDate(BUILD), null));
      var latestRow = row(t("Versão mais nova no GitHub"), REPO, t("Verificando..."), function () {
        return checkForUpdate();
      });
      body.appendChild(latestRow);
      latest().then(function (info2) {
        var v = latestRow.querySelector(".value");
        if (!v) return;
        var newer = info2.build && info2.build !== BUILD && Date.parse(info2.build) > Date.parse(BUILD);
        v.textContent = shortDate(info2.date) + (newer ? "  ·  " + t("nova!") : "  ·  " + t("em dia"));
        if (info2.message) latestRow.querySelector(".label small").textContent = info2.message;
      }).catch(function () {
        var v = latestRow.querySelector(".value");
        if (v) v.textContent = t("sem conexão");
      });
      body.appendChild(row(t("Procurar atualização"), t("Baixa a versão nova do GitHub ({repo})", {
        repo: REPO
      }), "", function () {
        return checkForUpdate();
      }));
      var rows = body.querySelectorAll(".set-row");
      if (keepIndex >= 0 && rows[keepIndex]) focus(rows[keepIndex]);
    }
    render();
    return {
      el: el,
      onShow: function onShow() {
        check().then(function () {
          return render();
        });
      },
      destroy: function destroy() {
        return bar.__destroy && bar.__destroy();
      }
    };
  }

  // src/js/views/calendar.js
  var WEEKDAYS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  var MODES = [{
    id: "anime",
    label: "Animes"
  }, {
    id: "series",
    label: "Séries"
  }, {
    id: "movies",
    label: "Filmes"
  }];
  var MOVIE_REGION = "US";
  var NOT_SERIES = /^(Talk Show|News|Game Show|Variety|Sports|Award Show|Panel Show)$/;
  var COUNTRY_TAG = {
    CN: "CN",
    KR: "KR",
    TW: "TW"
  };
  var ANIME_QUERY = "query($from:Int,$to:Int,$page:Int){Page(page:$page,perPage:50){pageInfo{hasNextPage}airingSchedules(airingAt_greater:$from,airingAt_lesser:$to,sort:TIME){episode airingAt media{id idMal isAdult format countryOfOrigin title{romaji english} coverImage{large} averageScore}}}}";
  function dayStart(offset) {
    var d = /* @__PURE__ */new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + offset);
    return d;
  }
  function ymd(d) {
    return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
  }
  function animeDay(offset) {
    var from = Math.floor(dayStart(offset).getTime() / 1e3) - 1;
    var to = from + 86400 + 1;
    var all2 = [];
    var _page = function page(p) {
      return postJSON("https://graphql.anilist.co", {
        query: ANIME_QUERY,
        variables: {
          from: from,
          to: to,
          page: p
        }
      }, {
        timeout: 15e3
      }).then(function (r) {
        var pg = r && r.data && r.data.Page;
        if (!pg) return all2;
        pg.airingSchedules.forEach(function (s) {
          if (s.media && !s.media.isAdult) all2.push(s);
        });
        return pg.pageInfo.hasNextPage && p < 10 ? _page(p + 1) : all2;
      });
    };
    return _page(1).then(function (list2) {
      return list2.map(function (s) {
        var m = s.media;
        var name = m.title && (m.title.english || m.title.romaji) || "";
        return {
          name: name,
          poster: m.coverImage && m.coverImage.large,
          at: s.airingAt * 1e3,
          slot: timeHM(new Date(s.airingAt * 1e3)) + " · Ep " + s.episode,
          score: m.averageScore,
          tag: COUNTRY_TAG[m.countryOfOrigin],
          open: function open() {
            return resolveAnime(m).then(function (r) {
              return r ? openDetails(r.type, r.id) : notFound(t("Esse anime não foi encontrado nos seus addons (instale o Anime Kitsu)."));
            });
          }
        };
      });
    });
  }
  function resolveAnime(media) {
    return getJSON("https://arm.haglund.dev/api/v2/ids?source=anilist&id=" + media.id, {
      quiet: true
    }).catch(function () {
      return null;
    }).then(function (ids) {
      var movieFirst = media.format === "MOVIE" || ids && ids.media === "MOVIE";
      var types = movieFirst ? ["movie", "series"] : ["series", "movie"];
      var cands = [];
      var add = function add(id) {
        return types.forEach(function (type) {
          return cands.push({
            type: type,
            id: id
          });
        });
      };
      if (ids && ids.kitsu) add("kitsu:" + ids.kitsu);
      if (ids && ids.imdb) add(ids.imdb);
      add("anilist:" + media.id);
      var usable = cands.filter(function (c) {
        return withResource("meta", c.type, c.id).length > 0;
      });
      var i = 0;
      var _next2 = function next() {
        if (i >= usable.length) return null;
        var c = usable[i++];
        return fetchMeta(c.type, c.id).then(function () {
          return c;
        }, _next2);
      };
      return _next2();
    });
  }
  function seriesDay(offset) {
    var date = ymd(dayStart(offset));
    var opt = {
      timeout: 15e3,
      quiet: true
    };
    return Promise.all([getJSON("https://api.tvmaze.com/schedule/web?date=" + date, opt).catch(function () {
      return [];
    }), getJSON("https://api.tvmaze.com/schedule?country=US&date=" + date, opt).catch(function () {
      return [];
    })]).then(function (lists) {
      var seen = {};
      var out = [];
      lists[0].concat(lists[1]).forEach(function (e) {
        var show2 = e.show || e._embedded && e._embedded.show;
        if (!show2 || !show2.externals || !show2.externals.imdb || NOT_SERIES.test(show2.type || "")) return;
        var key = show2.id + ":" + e.season + ":" + e.number;
        if (seen[key]) return;
        seen[key] = true;
        var network = show2.webChannel && show2.webChannel.name || show2.network && show2.network.name || "";
        var at = e.airstamp ? Date.parse(e.airstamp) : 0;
        out.push({
          name: show2.name,
          poster: show2.image && (show2.image.original || show2.image.medium),
          at: at,
          slot: (at ? timeHM(new Date(at)) + " · " : "") + "S" + e.season + " E" + (e.number || "?"),
          score: show2.rating && show2.rating.average ? Math.round(show2.rating.average * 10) : 0,
          tag: network,
          open: function open() {
            return openDetails("series", show2.externals.imdb);
          }
        });
      });
      return out.sort(function (a, b) {
        return a.at - b.at;
      });
    });
  }
  function moviesDay(offset) {
    return digitalReleases(ymd(dayStart(offset)), MOVIE_REGION).then(function (list2) {
      if (list2 === null) return null;
      return list2.map(function (m) {
        return {
          name: m.name,
          poster: m.poster,
          slot: t("Streaming"),
          score: m.score,
          open: function open() {
            return tmdbImdb("movie", m.tmdb).then(function (imdb) {
              return imdb ? openDetails("movie", imdb) : notFound(t("Esse filme ainda não tem página no Stremio."));
            });
          }
        };
      });
    });
  }
  function notFound(msg) {
    toast(msg, 5e3);
  }
  var FETCH = {
    anime: animeDay,
    series: seriesDay,
    movies: moviesDay
  };
  function CalendarView() {
    var el = h("div.view");
    var scroller = h("div.scroll-y", {
      "data-scroll-y": ""
    });
    var bar = topbar("calendar", goTab);
    var modes = h("div.cal-days.cal-modes", {
      "data-group": ""
    });
    var days = h("div.cal-days", {
      "data-group": "",
      "data-scroll-x": ""
    });
    var grid = h("div.grid");
    scroller.appendChild(bar);
    scroller.appendChild(modes);
    scroller.appendChild(days);
    scroller.appendChild(grid);
    el.appendChild(scroller);
    var mode = "anime";
    var current3 = 0;
    var token = 0;
    function label(offset) {
      if (offset === 0) return t("Hoje");
      if (offset === 1) return t("Amanhã");
      if (offset === -1) return t("Ontem");
      return t(WEEKDAYS[dayStart(offset).getDay()]);
    }
    function renderModes() {
      clear(modes);
      MODES.forEach(function (m, i) {
        return modes.appendChild(h("div.chip", {
          focusable: true,
          cls: m.id === mode ? "active" : "",
          text: t(m.label),
          onSelect: function onSelect() {
            mode = m.id;
            renderModes();
            focus(modes.children[i]);
            load5();
          }
        }));
      });
    }
    function renderDays() {
      clear(days);
      var _loop6 = function _loop6() {
        var off = o;
        var d = dayStart(off);
        days.appendChild(h("div.chip", {
          focusable: true,
          cls: off === current3 ? "active" : "",
          text: label(off) + " " + ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2),
          onSelect: function onSelect() {
            current3 = off;
            renderDays();
            focus(days.children[off + 1]);
            load5();
          }
        }));
      };
      for (var o = -1; o <= 6; o++) {
        _loop6();
      }
      days.__last = days.children[current3 + 1];
    }
    function load5() {
      var my = ++token;
      clear(grid);
      grid.appendChild(spinnerLine(t("Buscando lançamentos...")));
      FETCH[mode](current3).then(function (list2) {
        if (my !== token) return;
        clear(grid);
        if (list2 === null) {
          grid.appendChild(h("div.hint", {
            text: t("As datas de streaming dos filmes vêm do TMDB: coloque sua chave grátis do TMDB em Ajustes.")
          }));
          return;
        }
        if (!list2.length) {
          grid.appendChild(h("div.hint", {
            text: mode === "movies" ? t("Nenhum filme chega ao streaming neste dia.") : t("Nenhum episódio neste dia.")
          }));
          return;
        }
        var now = Date.now();
        list2.forEach(function (it) {
          var c = card({
            name: it.name,
            poster: it.poster
          }, {
            title: it.name,
            onSelect: function onSelect() {
              toast(t("Abrindo {name}...", {
                name: it.name
              }), 2e3);
              it.open();
            }
          });
          var wrap = c.querySelector(".poster-wrap");
          wrap.appendChild(h("div.cal-slot", {
            cls: it.at && it.at < now ? "aired" : "",
            text: it.slot
          }));
          if (it.score) wrap.appendChild(h("div.badge.cal-score", {
            text: it.score + "%"
          }));
          if (it.tag) wrap.appendChild(h("div.cal-tag", {
            text: it.tag
          }));
          grid.appendChild(c);
        });
        loadVisibleImages(el, 400);
      }).catch(function (e) {
        if (my !== token) return;
        clear(grid);
        grid.appendChild(h("div.hint", {
          text: t("Não foi possível carregar o calendário: {msg}", {
            msg: e.message
          })
        }));
      });
    }
    renderModes();
    renderDays();
    load5();
    return {
      el: el,
      onShow: function onShow() {
        return loadVisibleImages(el, 400);
      },
      destroy: function destroy() {
        return bar.__destroy && bar.__destroy();
      }
    };
  }

  // src/js/views/wizard.js
  function maybeShowWizard() {
    var s = settings();
    if (s.wizardDone) return;
    if (isLoggedIn() && s.serverUrl) {
      saveSettings({
        wizardDone: true
      });
      return;
    }
    push(WizardView());
  }
  function WizardView() {
    var el = h("div.view");
    var card2 = h("div.wizard-card");
    el.appendChild(h("div.wizard", null, card2));
    var step = 0;
    function finish() {
      saveSettings({
        wizardDone: true
      });
      pop();
      var home = currentView();
      if (home && home.reload) home.reload();
    }
    function btn(label, primary, fn) {
      return h("div.btn", {
        focusable: true,
        cls: primary ? "primary" : "",
        text: label,
        onSelect: fn
      });
    }
    var steps = (activeProfile().unnamed ? [stepName] : []).concat([stepAccount, stepServer, stepSubs]);
    function render() {
      clear(card2);
      card2.appendChild(h("div.wizard-step", {
        text: t("PASSO {n} DE {total}", {
          n: step + 1,
          total: steps.length
        })
      }));
      steps[step]();
      focusFirst(card2);
    }
    function next() {
      step++;
      if (step >= steps.length) finish();else render();
    }
    function stepName() {
      card2.appendChild(h("h1", {
        text: t("Bem-vindo! Quem vai usar este perfil?")
      }));
      card2.appendChild(h("p", {
        text: t("Dê um nome ao perfil. Depois você pode criar outros perfis, cada um com a própria conta Stremio e histórico.")
      }));
      var err = h("div.err-text");
      var input = h("input.input", {
        type: "text",
        placeholder: t("Ex.: Ana, Pedro, Sala"),
        maxlength: "20",
        focusable: true,
        "data-autofocus": ""
      });
      var save = function save() {
        var name = String(input.value || "").trim();
        if (!name) {
          err.textContent = t("Digite um nome para o perfil.");
          return;
        }
        updateProfile(activeProfile().id, {
          name: name,
          unnamed: false
        });
        refreshProfileChips();
        next();
      };
      input.__submit = save;
      card2.appendChild(input);
      card2.appendChild(err);
      card2.appendChild(h("div.actions", {
        "data-group": ""
      }, [btn(t("Continuar"), true, save)]));
    }
    function stepAccount() {
      card2.appendChild(h("h1", {
        text: t("Bem-vindo ao Stremio Kai")
      }));
      if (isLoggedIn()) {
        card2.appendChild(h("p", {
          text: t("Você já está conectado à sua conta Stremio. Seus addons e sua biblioteca já estão aqui.")
        }));
        card2.appendChild(h("div.actions", {
          "data-group": ""
        }, [btn(t("Continuar"), true, next)]));
        return;
      }
      card2.appendChild(h("p", {
        text: t("Entre com a sua conta Stremio para trazer seus addons (Torrentio, debrid, Anime Kitsu...) e a biblioteca.")
      }));
      card2.appendChild(h("div.actions", {
        "data-group": ""
      }, [btn(t("Entrar na conta"), true, function () {
        return openLogin(function () {
          Promise.all([refreshUser().catch(function () {}), load(true), getLibrary()]).then(next, next);
        });
      }), btn(t("Pular"), false, next)]));
    }
    function stepServer() {
      card2.appendChild(h("h1", {
        text: t("Servidor de torrents no PC")
      }));
      var status2 = h("p", {
        text: isAvailable() ? t("Servidor conectado em {url}. Torrents liberados.", {
          url: baseUrl()
        }) : t("Para tocar torrents, deixe o stremio-service aberto num PC da rede. Links de debrid funcionam sem ele.")
      });
      card2.appendChild(status2);
      card2.appendChild(h("div.actions", {
        "data-group": ""
      }, [btn(t("Procurar na rede"), true, function () {
        status2.textContent = t("Procurando o servidor na rede...");
        scan(function (done, total) {
          return status2.textContent = t("Procurando o servidor na rede...") + " " + Math.round(done / total * 100) + "%";
        }).then(function (ip) {
          if (!ip) {
            status2.textContent = t("Nenhum servidor encontrado. Você pode configurar depois em Ajustes.");
            return;
          }
          saveSettings({
            serverUrl: ip
          });
          return check().then(function () {
            status2.textContent = t("Servidor encontrado em {ip}", {
              ip: ip
            }) + "!";
            toast(t("Servidor do PC conectado"));
          });
        }).catch(function () {
          return status2.textContent = t("Não foi possível procurar. Configure depois em Ajustes.");
        });
      }), btn(isAvailable() ? t("Continuar") : t("Pular"), false, next)]));
    }
    function stepSubs() {
      card2.appendChild(h("h1", {
        text: t("Legendas")
      }));
      card2.appendChild(h("p", {
        text: t("Em qual idioma o app deve ligar a legenda sozinho quando o áudio não for no seu idioma?")
      }));
      var ar = {
        label: t("Árabe"),
        value: ["ara", "ar"]
      };
      var en = {
        label: t("Inglês"),
        value: ["eng", "en"]
      };
      var choices = (current() === "ar" ? [ar, en] : [en, ar]).concat([{
        label: t("Não ligar sozinho"),
        value: []
      }]);
      card2.appendChild(h("div.opts", {
        "data-group": "",
        "data-vertical": ""
      }, choices.map(function (c) {
        return h("div.opt", {
          focusable: true,
          text: c.label,
          onSelect: function onSelect() {
            saveSettings({
              subtitleLangs: c.value,
              subtitlesAuto: c.value.length > 0
            });
            finish();
          }
        });
      })));
    }
    render();
    return {
      el: el,
      onBack: function onBack() {
        if (step > 0) {
          step--;
          render();
        } else finish();
        return true;
      }
    };
  }

  // src/js/main.js
  function boot() {
    var s = settings();
    init(s.language);
    if (s.devlogUrl) log.setRemote(s.devlogUrl);
    log.info("Iniciando", navigator.userAgent);
    registerTizenKeys();
    start();
    onOpen(function (ev) {
      goTab("home");
      openDetails(ev.kind, ev.item, ev.video ? {
        videoId: ev.video,
        autoStreams: true
      } : {});
    });
    onSearch(function (q) {
      goTab("search");
      var view = currentView();
      if (view && view.search) view.search(q);
    });
    install();
    setSmooth(s.smoothScroll);
    var scrollTimer = null;
    onScroll(function (node) {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function () {
        var v = currentView();
        loadVisibleImages(v ? v.el : node.closest(".view") || node);
        if (v && v.onScroll) v.onScroll();
      }, 120);
    });
    registerTab("home", HomeView);
    registerTab("search", SearchView);
    registerTab("library", LibraryView);
    registerTab("settings", SettingsView);
    registerTab("calendar", CalendarView);
    if (needsPicker()) {
      var bootEl = document.getElementById("boot");
      if (bootEl) bootEl.style.display = "none";
      showPicker(function () {
        if (bootEl) bootEl.style.display = "";
        start2();
      });
    } else start2();
    document.addEventListener("webOSRelaunch", function () {
      check();
    });
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) check();
    });
  }
  function start2() {
    reloadProfile();
    var s = settings();
    document.body.classList.toggle("oled", !!s.oled);
    apply3(s.theme);
    log.info("Perfil", activeProfile().name);
    if (isLoggedIn()) {
      refreshUser().catch(function () {});
      getLibrary().catch(function () {});
    }
    Promise.all([check(), load().catch(function () {
      return null;
    })]).then(function () {
      var bootEl = document.getElementById("boot");
      if (bootEl) bootEl.parentNode.removeChild(bootEl);
      goTab("home");
      if (isNewProfilePendingLogin() && !isLoggedIn()) {
        clearNewProfileFlag();
        openLogin(function () {
          Promise.all([refreshUser().catch(function () {}), load(true), getLibrary()]).then(function () {
            var home = tabView("home");
            if (home && home.reload) home.reload();
          });
        });
      } else maybeShowWizard();
      if (shouldAutoCheck()) {
        setTimeout(function () {
          check2().then(function (info2) {
            return info2 && toast(t("Atualização disponível: Ajustes → Procurar atualização"), 7e3);
          }).catch(function () {});
        }, 8e3);
      }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);else boot();
})();