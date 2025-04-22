var XS = Object.defineProperty;
var QS = (e, n, t) => n in e ? XS(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var Jg = (e, n, t) => QS(e, typeof n != "symbol" ? n + "" : n, t);
import { Component as ZS } from "react";
const dP = "{{", eR = /\{\{/g, fP = "}}", nR = /}}/g, Sq = /\{\{(?!(.+)?}})/g, pP = /\{\{.*?\}\}/gs, tR = typeof window > "u";
function rR(e, n, t) {
  let r = (i) => e(i, ...n);
  return t === void 0 ? r : Object.assign(r, { lazy: t, lazyArgs: n });
}
function lP(e, n, t) {
  let r = e.length - n.length;
  if (r === 0) return e(...n);
  if (r === 1) return rR(e, n, t);
  throw new Error("Wrong number of arguments");
}
function kl(e) {
  if (typeof e != "object" || e === null) return !1;
  let n = Object.getPrototypeOf(e);
  return n === null || n === Object.prototype;
}
function iR(...e) {
  return lP(Object.keys, e);
}
function Wl(e) {
  return typeof e == "string";
}
function Yg(e) {
  return Array.isArray(e);
}
function oR(...e) {
  return lP(Object.entries, e);
}
var aR = {
  0: "Invalid value for configuration 'enforceActions', expected 'never', 'always' or 'observed'",
  1: function(n, t) {
    return "Cannot apply '" + n + "' to '" + t.toString() + "': Field not found.";
  },
  /*
  2(prop) {
      return `invalid decorator for '${prop.toString()}'`
  },
  3(prop) {
      return `Cannot decorate '${prop.toString()}': action can only be used on properties with a function value.`
  },
  4(prop) {
      return `Cannot decorate '${prop.toString()}': computed can only be used on getter properties.`
  },
  */
  5: "'keys()' can only be used on observable objects, arrays, sets and maps",
  6: "'values()' can only be used on observable objects, arrays, sets and maps",
  7: "'entries()' can only be used on observable objects, arrays and maps",
  8: "'set()' can only be used on observable objects, arrays and maps",
  9: "'remove()' can only be used on observable objects, arrays and maps",
  10: "'has()' can only be used on observable objects, arrays and maps",
  11: "'get()' can only be used on observable objects, arrays and maps",
  12: "Invalid annotation",
  13: "Dynamic observable objects cannot be frozen. If you're passing observables to 3rd party component/function that calls Object.freeze, pass copy instead: toJS(observable)",
  14: "Intercept handlers should return nothing or a change object",
  15: "Observable arrays cannot be frozen. If you're passing observables to 3rd party component/function that calls Object.freeze, pass copy instead: toJS(observable)",
  16: "Modification exception: the internal structure of an observable array was changed.",
  17: function(n, t) {
    return "[mobx.array] Index out of bounds, " + n + " is larger than " + t;
  },
  18: "mobx.map requires Map polyfill for the current browser. Check babel-polyfill or core-js/es6/map.js",
  19: function(n) {
    return "Cannot initialize from classes that inherit from Map: " + n.constructor.name;
  },
  20: function(n) {
    return "Cannot initialize map from " + n;
  },
  21: function(n) {
    return "Cannot convert to map from '" + n + "'";
  },
  22: "mobx.set requires Set polyfill for the current browser. Check babel-polyfill or core-js/es6/set.js",
  23: "It is not possible to get index atoms from arrays",
  24: function(n) {
    return "Cannot obtain administration from " + n;
  },
  25: function(n, t) {
    return "the entry '" + n + "' does not exist in the observable map '" + t + "'";
  },
  26: "please specify a property",
  27: function(n, t) {
    return "no observable property '" + n.toString() + "' found on the observable object '" + t + "'";
  },
  28: function(n) {
    return "Cannot obtain atom from " + n;
  },
  29: "Expecting some object",
  30: "invalid action stack. did you forget to finish an action?",
  31: "missing option for computed: get",
  32: function(n, t) {
    return "Cycle detected in computation " + n + ": " + t;
  },
  33: function(n) {
    return "The setter of computed value '" + n + "' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?";
  },
  34: function(n) {
    return "[ComputedValue '" + n + "'] It is not possible to assign a new value to a computed value.";
  },
  35: "There are multiple, different versions of MobX active. Make sure MobX is loaded only once or use `configure({ isolateGlobalState: true })`",
  36: "isolateGlobalState should be called before MobX is running any reactions",
  37: function(n) {
    return "[mobx] `observableArray." + n + "()` mutates the array in-place, which is not allowed inside a derivation. Use `array.slice()." + n + "()` instead";
  },
  38: "'ownKeys()' can only be used on observable objects",
  39: "'defineProperty()' can only be used on observable objects"
}, sR = process.env.NODE_ENV !== "production" ? aR : {};
function te(e) {
  for (var n = arguments.length, t = new Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++)
    t[r - 1] = arguments[r];
  if (process.env.NODE_ENV !== "production") {
    var i = typeof e == "string" ? e : sR[e];
    throw typeof i == "function" && (i = i.apply(null, t)), new Error("[MobX] " + i);
  }
  throw new Error(typeof e == "number" ? "[MobX] minified error nr: " + e + (t.length ? " " + t.map(String).join(",") : "") + ". Find the full error at: https://github.com/mobxjs/mobx/blob/main/packages/mobx/src/errors.ts" : "[MobX] " + e);
}
var uR = {};
function op() {
  return typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : uR;
}
var yP = Object.assign, xf = Object.getOwnPropertyDescriptor, Tr = Object.defineProperty, Vu = Object.prototype, Ff = [];
Object.freeze(Ff);
var Ey = {};
Object.freeze(Ey);
var cR = typeof Proxy < "u", dR = /* @__PURE__ */ Object.toString();
function mP() {
  cR || te(process.env.NODE_ENV !== "production" ? "`Proxy` objects are not available in the current environment. Please configure MobX to enable a fallback implementation.`" : "Proxy not available");
}
function iu(e) {
  process.env.NODE_ENV !== "production" && ee.verifyProxies && te("MobX is currently configured to be able to run in ES5 mode, but in ES5 MobX won't be able to " + e);
}
function _t() {
  return ++ee.mobxGuid;
}
function $y(e) {
  var n = !1;
  return function() {
    if (!n)
      return n = !0, e.apply(this, arguments);
  };
}
var fs = function() {
};
function tn(e) {
  return typeof e == "function";
}
function br(e) {
  var n = typeof e;
  switch (n) {
    case "string":
    case "symbol":
    case "number":
      return !0;
  }
  return !1;
}
function ap(e) {
  return e !== null && typeof e == "object";
}
function et(e) {
  if (!ap(e))
    return !1;
  var n = Object.getPrototypeOf(e);
  if (n == null)
    return !0;
  var t = Object.hasOwnProperty.call(n, "constructor") && n.constructor;
  return typeof t == "function" && t.toString() === dR;
}
function gP(e) {
  var n = e == null ? void 0 : e.constructor;
  return n ? n.name === "GeneratorFunction" || n.displayName === "GeneratorFunction" : !1;
}
function qu(e, n, t) {
  Tr(e, n, {
    enumerable: !1,
    writable: !0,
    configurable: !0,
    value: t
  });
}
function TP(e, n, t) {
  Tr(e, n, {
    enumerable: !1,
    writable: !1,
    configurable: !0,
    value: t
  });
}
function yi(e, n) {
  var t = "isMobX" + e;
  return n.prototype[t] = !0, function(r) {
    return ap(r) && r[t] === !0;
  };
}
function Bs(e) {
  return e != null && Object.prototype.toString.call(e) === "[object Map]";
}
function fR(e) {
  var n = Object.getPrototypeOf(e), t = Object.getPrototypeOf(n), r = Object.getPrototypeOf(t);
  return r === null;
}
function Vr(e) {
  return e != null && Object.prototype.toString.call(e) === "[object Set]";
}
var _P = typeof Object.getOwnPropertySymbols < "u";
function pR(e) {
  var n = Object.keys(e);
  if (!_P)
    return n;
  var t = Object.getOwnPropertySymbols(e);
  return t.length ? [].concat(n, t.filter(function(r) {
    return Vu.propertyIsEnumerable.call(e, r);
  })) : n;
}
var _s = typeof Reflect < "u" && Reflect.ownKeys ? Reflect.ownKeys : _P ? function(e) {
  return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
} : (
  /* istanbul ignore next */
  Object.getOwnPropertyNames
);
function zl(e) {
  return typeof e == "string" ? e : typeof e == "symbol" ? e.toString() : new String(e).toString();
}
function bP(e) {
  return e === null ? null : typeof e == "object" ? "" + e : e;
}
function dt(e, n) {
  return Vu.hasOwnProperty.call(e, n);
}
var lR = Object.getOwnPropertyDescriptors || function(n) {
  var t = {};
  return _s(n).forEach(function(r) {
    t[r] = xf(n, r);
  }), t;
};
function ut(e, n) {
  return !!(e & n);
}
function ct(e, n, t) {
  return t ? e |= n : e &= ~n, e;
}
function Xg(e, n) {
  (n == null || n > e.length) && (n = e.length);
  for (var t = 0, r = Array(n); t < n; t++) r[t] = e[t];
  return r;
}
function yR(e, n) {
  for (var t = 0; t < n.length; t++) {
    var r = n[t];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, gR(r.key), r);
  }
}
function js(e, n, t) {
  return n && yR(e.prototype, n), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function ps(e, n) {
  var t = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (t) return (t = t.call(e)).next.bind(t);
  if (Array.isArray(e) || (t = TR(e)) || n) {
    t && (e = t);
    var r = 0;
    return function() {
      return r >= e.length ? {
        done: !0
      } : {
        done: !1,
        value: e[r++]
      };
    };
  }
  throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function hr() {
  return hr = Object.assign ? Object.assign.bind() : function(e) {
    for (var n = 1; n < arguments.length; n++) {
      var t = arguments[n];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (e[r] = t[r]);
    }
    return e;
  }, hr.apply(null, arguments);
}
function hP(e, n) {
  e.prototype = Object.create(n.prototype), e.prototype.constructor = e, Jl(e, n);
}
function Jl(e, n) {
  return Jl = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, r) {
    return t.__proto__ = r, t;
  }, Jl(e, n);
}
function mR(e, n) {
  if (typeof e != "object" || !e) return e;
  var t = e[Symbol.toPrimitive];
  if (t !== void 0) {
    var r = t.call(e, n);
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function gR(e) {
  var n = mR(e, "string");
  return typeof n == "symbol" ? n : n + "";
}
function TR(e, n) {
  if (e) {
    if (typeof e == "string") return Xg(e, n);
    var t = {}.toString.call(e).slice(8, -1);
    return t === "Object" && e.constructor && (t = e.constructor.name), t === "Map" || t === "Set" ? Array.from(e) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? Xg(e, n) : void 0;
  }
}
var Jn = /* @__PURE__ */ Symbol("mobx-stored-annotations");
function Jt(e) {
  function n(t, r) {
    if (Gu(r))
      return e.decorate_20223_(t, r);
    Ku(t, r, e);
  }
  return Object.assign(n, e);
}
function Ku(e, n, t) {
  if (dt(e, Jn) || qu(e, Jn, hr({}, e[Jn])), process.env.NODE_ENV !== "production" && Nf(t) && !dt(e[Jn], n)) {
    var r = e.constructor.name + ".prototype." + n.toString();
    te("'" + r + "' is decorated with 'override', but no such decorated member was found on prototype.");
  }
  _R(e, t, n), Nf(t) || (e[Jn][n] = t);
}
function _R(e, n, t) {
  if (process.env.NODE_ENV !== "production" && !Nf(n) && dt(e[Jn], t)) {
    var r = e.constructor.name + ".prototype." + t.toString(), i = e[Jn][t].annotationType_, o = n.annotationType_;
    te("Cannot apply '@" + o + "' to '" + r + "':" + (`
The field is already decorated with '@` + i + "'.") + `
Re-decorating fields is not allowed.
Use '@override' decorator for methods overridden by subclass.`);
  }
}
function bR(e) {
  return dt(e, Jn) || qu(e, Jn, hr({}, e[Jn])), e[Jn];
}
function Gu(e) {
  return typeof e == "object" && typeof e.kind == "string";
}
function sp(e, n) {
  process.env.NODE_ENV !== "production" && !n.includes(e.kind) && te("The decorator applied to '" + String(e.name) + "' cannot be used on a " + e.kind + " element");
}
var me = /* @__PURE__ */ Symbol("mobx administration"), mi = /* @__PURE__ */ function() {
  function e(t) {
    t === void 0 && (t = process.env.NODE_ENV !== "production" ? "Atom@" + _t() : "Atom"), this.name_ = void 0, this.flags_ = 0, this.observers_ = /* @__PURE__ */ new Set(), this.lastAccessedBy_ = 0, this.lowestObserverState_ = Ue.NOT_TRACKING_, this.onBOL = void 0, this.onBUOL = void 0, this.name_ = t;
  }
  var n = e.prototype;
  return n.onBO = function() {
    this.onBOL && this.onBOL.forEach(function(r) {
      return r();
    });
  }, n.onBUO = function() {
    this.onBUOL && this.onBUOL.forEach(function(r) {
      return r();
    });
  }, n.reportObserved = function() {
    return DP(this);
  }, n.reportChanged = function() {
    Yn(), UP(this), Xn();
  }, n.toString = function() {
    return this.name_;
  }, js(e, [{
    key: "isBeingObserved",
    get: function() {
      return ut(this.flags_, e.isBeingObservedMask_);
    },
    set: function(r) {
      this.flags_ = ct(this.flags_, e.isBeingObservedMask_, r);
    }
  }, {
    key: "isPendingUnobservation",
    get: function() {
      return ut(this.flags_, e.isPendingUnobservationMask_);
    },
    set: function(r) {
      this.flags_ = ct(this.flags_, e.isPendingUnobservationMask_, r);
    }
  }, {
    key: "diffValue",
    get: function() {
      return ut(this.flags_, e.diffValueMask_) ? 1 : 0;
    },
    set: function(r) {
      this.flags_ = ct(this.flags_, e.diffValueMask_, r === 1);
    }
  }]);
}();
mi.isBeingObservedMask_ = 1;
mi.isPendingUnobservationMask_ = 2;
mi.diffValueMask_ = 4;
var My = /* @__PURE__ */ yi("Atom", mi);
function Qr(e, n, t) {
  n === void 0 && (n = fs), t === void 0 && (t = fs);
  var r = new mi(e);
  return n !== fs && JP(r, n), t !== fs && Ny(r, t), r;
}
function hR(e, n) {
  return e === n;
}
function IR(e, n) {
  return Gy(e, n);
}
function OR(e, n) {
  return Gy(e, n, 1);
}
function PR(e, n) {
  return Object.is ? Object.is(e, n) : e === n ? e !== 0 || 1 / e === 1 / n : e !== e && n !== n;
}
var Ra = {
  identity: hR,
  structural: IR,
  default: PR,
  shallow: OR
};
function Ea(e, n, t) {
  return mt(e) ? e : Array.isArray(e) ? Ve.array(e, {
    name: t
  }) : et(e) ? Ve.object(e, void 0, {
    name: t
  }) : Bs(e) ? Ve.map(e, {
    name: t
  }) : Vr(e) ? Ve.set(e, {
    name: t
  }) : typeof e == "function" && !Ca(e) && !hs(e) ? gP(e) ? Ba(e) : bs(t, e) : e;
}
function AR(e, n, t) {
  if (e == null || Qe(e) || wn(e) || ln(e) || un(e))
    return e;
  if (Array.isArray(e))
    return Ve.array(e, {
      name: t,
      deep: !1
    });
  if (et(e))
    return Ve.object(e, void 0, {
      name: t,
      deep: !1
    });
  if (Bs(e))
    return Ve.map(e, {
      name: t,
      deep: !1
    });
  if (Vr(e))
    return Ve.set(e, {
      name: t,
      deep: !1
    });
  process.env.NODE_ENV !== "production" && te("The shallow modifier / decorator can only used in combination with arrays, objects, maps and sets");
}
function up(e) {
  return e;
}
function wR(e, n) {
  return process.env.NODE_ENV !== "production" && mt(e) && te("observable.struct should not be used with observable values"), Gy(e, n) ? n : e;
}
var IP = "override", vR = /* @__PURE__ */ Jt({
  annotationType_: IP,
  make_: SR,
  extend_: RR,
  decorate_20223_: ER
});
function Nf(e) {
  return e.annotationType_ === IP;
}
function SR(e, n) {
  return process.env.NODE_ENV !== "production" && e.isPlainObject_ && te("Cannot apply '" + this.annotationType_ + "' to '" + e.name_ + "." + n.toString() + "':" + (`
'` + this.annotationType_ + "' cannot be used on plain objects.")), process.env.NODE_ENV !== "production" && !dt(e.appliedAnnotations_, n) && te("'" + e.name_ + "." + n.toString() + "' is annotated with '" + this.annotationType_ + "', but no such annotated member was found on prototype."), 0;
}
function RR(e, n, t, r) {
  te("'" + this.annotationType_ + "' can only be used with 'makeObservable'");
}
function ER(e, n) {
  console.warn("'" + this.annotationType_ + "' cannot be used with decorators - this is a no-op");
}
function Hu(e, n) {
  return {
    annotationType_: e,
    options_: n,
    make_: $R,
    extend_: MR,
    decorate_20223_: CR
  };
}
function $R(e, n, t, r) {
  var i;
  if ((i = this.options_) != null && i.bound)
    return this.extend_(e, n, t, !1) === null ? 0 : 1;
  if (r === e.target_)
    return this.extend_(e, n, t, !1) === null ? 0 : 2;
  if (Ca(t.value))
    return 1;
  var o = OP(e, this, n, t, !1);
  return Tr(r, n, o), 2;
}
function MR(e, n, t, r) {
  var i = OP(e, this, n, t);
  return e.defineProperty_(n, i, r);
}
function CR(e, n) {
  process.env.NODE_ENV !== "production" && sp(n, ["method", "field"]);
  var t = n.kind, r = n.name, i = n.addInitializer, o = this, a = function(u) {
    var f, d, p, T;
    return di((f = (d = o.options_) == null ? void 0 : d.name) != null ? f : r.toString(), u, (p = (T = o.options_) == null ? void 0 : T.autoAction) != null ? p : !1);
  };
  if (t == "field")
    return function(c) {
      var u, f = c;
      return Ca(f) || (f = a(f)), (u = o.options_) != null && u.bound && (f = f.bind(this), f.isMobxAction = !0), f;
    };
  if (t == "method") {
    var s;
    return Ca(e) || (e = a(e)), (s = this.options_) != null && s.bound && i(function() {
      var c = this, u = c[r].bind(c);
      u.isMobxAction = !0, c[r] = u;
    }), e;
  }
  te("Cannot apply '" + o.annotationType_ + "' to '" + String(r) + "' (kind: " + t + "):" + (`
'` + o.annotationType_ + "' can only be used on properties with a function value."));
}
function BR(e, n, t, r) {
  var i = n.annotationType_, o = r.value;
  process.env.NODE_ENV !== "production" && !tn(o) && te("Cannot apply '" + i + "' to '" + e.name_ + "." + t.toString() + "':" + (`
'` + i + "' can only be used on properties with a function value."));
}
function OP(e, n, t, r, i) {
  var o, a, s, c, u, f, d;
  i === void 0 && (i = ee.safeDescriptors), BR(e, n, t, r);
  var p = r.value;
  if ((o = n.options_) != null && o.bound) {
    var T;
    p = p.bind((T = e.proxy_) != null ? T : e.target_);
  }
  return {
    value: di(
      (a = (s = n.options_) == null ? void 0 : s.name) != null ? a : t.toString(),
      p,
      (c = (u = n.options_) == null ? void 0 : u.autoAction) != null ? c : !1,
      // https://github.com/mobxjs/mobx/discussions/3140
      (f = n.options_) != null && f.bound ? (d = e.proxy_) != null ? d : e.target_ : void 0
    ),
    // Non-configurable for classes
    // prevents accidental field redefinition in subclass
    configurable: i ? e.isPlainObject_ : !0,
    // https://github.com/mobxjs/mobx/pull/2641#issuecomment-737292058
    enumerable: !1,
    // Non-obsevable, therefore non-writable
    // Also prevents rewriting in subclass constructor
    writable: !i
  };
}
function PP(e, n) {
  return {
    annotationType_: e,
    options_: n,
    make_: jR,
    extend_: xR,
    decorate_20223_: FR
  };
}
function jR(e, n, t, r) {
  var i;
  if (r === e.target_)
    return this.extend_(e, n, t, !1) === null ? 0 : 2;
  if ((i = this.options_) != null && i.bound && (!dt(e.target_, n) || !hs(e.target_[n])) && this.extend_(e, n, t, !1) === null)
    return 0;
  if (hs(t.value))
    return 1;
  var o = AP(e, this, n, t, !1, !1);
  return Tr(r, n, o), 2;
}
function xR(e, n, t, r) {
  var i, o = AP(e, this, n, t, (i = this.options_) == null ? void 0 : i.bound);
  return e.defineProperty_(n, o, r);
}
function FR(e, n) {
  var t;
  process.env.NODE_ENV !== "production" && sp(n, ["method"]);
  var r = n.name, i = n.addInitializer;
  return hs(e) || (e = Ba(e)), (t = this.options_) != null && t.bound && i(function() {
    var o = this, a = o[r].bind(o);
    a.isMobXFlow = !0, o[r] = a;
  }), e;
}
function NR(e, n, t, r) {
  var i = n.annotationType_, o = r.value;
  process.env.NODE_ENV !== "production" && !tn(o) && te("Cannot apply '" + i + "' to '" + e.name_ + "." + t.toString() + "':" + (`
'` + i + "' can only be used on properties with a generator function value."));
}
function AP(e, n, t, r, i, o) {
  o === void 0 && (o = ee.safeDescriptors), NR(e, n, t, r);
  var a = r.value;
  if (hs(a) || (a = Ba(a)), i) {
    var s;
    a = a.bind((s = e.proxy_) != null ? s : e.target_), a.isMobXFlow = !0;
  }
  return {
    value: a,
    // Non-configurable for classes
    // prevents accidental field redefinition in subclass
    configurable: o ? e.isPlainObject_ : !0,
    // https://github.com/mobxjs/mobx/pull/2641#issuecomment-737292058
    enumerable: !1,
    // Non-obsevable, therefore non-writable
    // Also prevents rewriting in subclass constructor
    writable: !o
  };
}
function Cy(e, n) {
  return {
    annotationType_: e,
    options_: n,
    make_: DR,
    extend_: UR,
    decorate_20223_: LR
  };
}
function DR(e, n, t) {
  return this.extend_(e, n, t, !1) === null ? 0 : 1;
}
function UR(e, n, t, r) {
  return VR(e, this, n, t), e.defineComputedProperty_(n, hr({}, this.options_, {
    get: t.get,
    set: t.set
  }), r);
}
function LR(e, n) {
  process.env.NODE_ENV !== "production" && sp(n, ["getter"]);
  var t = this, r = n.name, i = n.addInitializer;
  return i(function() {
    var o = Va(this)[me], a = hr({}, t.options_, {
      get: e,
      context: this
    });
    a.name || (a.name = process.env.NODE_ENV !== "production" ? o.name_ + "." + r.toString() : "ObservableObject." + r.toString()), o.values_.set(r, new $t(a));
  }), function() {
    return this[me].getObservablePropValue_(r);
  };
}
function VR(e, n, t, r) {
  var i = n.annotationType_, o = r.get;
  process.env.NODE_ENV !== "production" && !o && te("Cannot apply '" + i + "' to '" + e.name_ + "." + t.toString() + "':" + (`
'` + i + "' can only be used on getter(+setter) properties."));
}
function cp(e, n) {
  return {
    annotationType_: e,
    options_: n,
    make_: qR,
    extend_: KR,
    decorate_20223_: GR
  };
}
function qR(e, n, t) {
  return this.extend_(e, n, t, !1) === null ? 0 : 1;
}
function KR(e, n, t, r) {
  var i, o;
  return HR(e, this, n, t), e.defineObservableProperty_(n, t.value, (i = (o = this.options_) == null ? void 0 : o.enhancer) != null ? i : Ea, r);
}
function GR(e, n) {
  if (process.env.NODE_ENV !== "production") {
    if (n.kind === "field")
      throw te("Please use `@observable accessor " + String(n.name) + "` instead of `@observable " + String(n.name) + "`");
    sp(n, ["accessor"]);
  }
  var t = this, r = n.kind, i = n.name, o = /* @__PURE__ */ new WeakSet();
  function a(s, c) {
    var u, f, d = Va(s)[me], p = new ui(c, (u = (f = t.options_) == null ? void 0 : f.enhancer) != null ? u : Ea, process.env.NODE_ENV !== "production" ? d.name_ + "." + i.toString() : "ObservableObject." + i.toString(), !1);
    d.values_.set(i, p), o.add(s);
  }
  if (r == "accessor")
    return {
      get: function() {
        return o.has(this) || a(this, e.get.call(this)), this[me].getObservablePropValue_(i);
      },
      set: function(c) {
        return o.has(this) || a(this, c), this[me].setObservablePropValue_(i, c);
      },
      init: function(c) {
        return o.has(this) || a(this, c), c;
      }
    };
}
function HR(e, n, t, r) {
  var i = n.annotationType_;
  process.env.NODE_ENV !== "production" && !("value" in r) && te("Cannot apply '" + i + "' to '" + e.name_ + "." + t.toString() + "':" + (`
'` + i + "' cannot be used on getter/setter properties"));
}
var kR = "true", WR = /* @__PURE__ */ wP();
function wP(e) {
  return {
    annotationType_: kR,
    options_: e,
    make_: zR,
    extend_: JR,
    decorate_20223_: YR
  };
}
function zR(e, n, t, r) {
  var i, o;
  if (t.get)
    return dn.make_(e, n, t, r);
  if (t.set) {
    var a = di(n.toString(), t.set);
    return r === e.target_ ? e.defineProperty_(n, {
      configurable: ee.safeDescriptors ? e.isPlainObject_ : !0,
      set: a
    }) === null ? 0 : 2 : (Tr(r, n, {
      configurable: !0,
      set: a
    }), 2);
  }
  if (r !== e.target_ && typeof t.value == "function") {
    var s;
    if (gP(t.value)) {
      var c, u = (c = this.options_) != null && c.autoBind ? Ba.bound : Ba;
      return u.make_(e, n, t, r);
    }
    var f = (s = this.options_) != null && s.autoBind ? bs.bound : bs;
    return f.make_(e, n, t, r);
  }
  var d = ((i = this.options_) == null ? void 0 : i.deep) === !1 ? Ve.ref : Ve;
  if (typeof t.value == "function" && (o = this.options_) != null && o.autoBind) {
    var p;
    t.value = t.value.bind((p = e.proxy_) != null ? p : e.target_);
  }
  return d.make_(e, n, t, r);
}
function JR(e, n, t, r) {
  var i, o;
  if (t.get)
    return dn.extend_(e, n, t, r);
  if (t.set)
    return e.defineProperty_(n, {
      configurable: ee.safeDescriptors ? e.isPlainObject_ : !0,
      set: di(n.toString(), t.set)
    }, r);
  if (typeof t.value == "function" && (i = this.options_) != null && i.autoBind) {
    var a;
    t.value = t.value.bind((a = e.proxy_) != null ? a : e.target_);
  }
  var s = ((o = this.options_) == null ? void 0 : o.deep) === !1 ? Ve.ref : Ve;
  return s.extend_(e, n, t, r);
}
function YR(e, n) {
  te("'" + this.annotationType_ + "' cannot be used as a decorator");
}
var XR = "observable", QR = "observable.ref", ZR = "observable.shallow", eE = "observable.struct", vP = {
  deep: !0,
  name: void 0,
  defaultDecorator: void 0,
  proxy: !0
};
Object.freeze(vP);
function Rc(e) {
  return e || vP;
}
var Yl = /* @__PURE__ */ cp(XR), nE = /* @__PURE__ */ cp(QR, {
  enhancer: up
}), tE = /* @__PURE__ */ cp(ZR, {
  enhancer: AR
}), rE = /* @__PURE__ */ cp(eE, {
  enhancer: wR
}), SP = /* @__PURE__ */ Jt(Yl);
function Ec(e) {
  return e.deep === !0 ? Ea : e.deep === !1 ? up : oE(e.defaultDecorator);
}
function iE(e) {
  var n;
  return e ? (n = e.defaultDecorator) != null ? n : wP(e) : void 0;
}
function oE(e) {
  var n, t;
  return e && (n = (t = e.options_) == null ? void 0 : t.enhancer) != null ? n : Ea;
}
function RP(e, n, t) {
  if (Gu(n))
    return Yl.decorate_20223_(e, n);
  if (br(n)) {
    Ku(e, n, Yl);
    return;
  }
  return mt(e) ? e : et(e) ? Ve.object(e, n, t) : Array.isArray(e) ? Ve.array(e, n) : Bs(e) ? Ve.map(e, n) : Vr(e) ? Ve.set(e, n) : typeof e == "object" && e !== null ? e : Ve.box(e, n);
}
yP(RP, SP);
var aE = {
  box: function(n, t) {
    var r = Rc(t);
    return new ui(n, Ec(r), r.name, !0, r.equals);
  },
  array: function(n, t) {
    var r = Rc(t);
    return (ee.useProxies === !1 || r.proxy === !1 ? h$ : d$)(n, Ec(r), r.name);
  },
  map: function(n, t) {
    var r = Rc(t);
    return new Vy(n, Ec(r), r.name);
  },
  set: function(n, t) {
    var r = Rc(t);
    return new qy(n, Ec(r), r.name);
  },
  object: function(n, t, r) {
    return gi(function() {
      return Dy(ee.useProxies === !1 || (r == null ? void 0 : r.proxy) === !1 ? Va({}, r) : o$({}, r), n, t);
    });
  },
  ref: /* @__PURE__ */ Jt(nE),
  shallow: /* @__PURE__ */ Jt(tE),
  deep: SP,
  struct: /* @__PURE__ */ Jt(rE)
}, Ve = /* @__PURE__ */ yP(RP, aE), EP = "computed", sE = "computed.struct", Xl = /* @__PURE__ */ Cy(EP), uE = /* @__PURE__ */ Cy(sE, {
  equals: Ra.structural
}), dn = function(n, t) {
  if (Gu(t))
    return Xl.decorate_20223_(n, t);
  if (br(t))
    return Ku(n, t, Xl);
  if (et(n))
    return Jt(Cy(EP, n));
  process.env.NODE_ENV !== "production" && (tn(n) || te("First argument to `computed` should be an expression."), tn(t) && te("A setter as second argument is no longer supported, use `{ set: fn }` option instead"));
  var r = et(t) ? t : {};
  return r.get = n, r.name || (r.name = n.name || ""), new $t(r);
};
Object.assign(dn, Xl);
dn.struct = /* @__PURE__ */ Jt(uE);
var Qg, Zg, Df = 0, cE = 1, dE = (Qg = (Zg = /* @__PURE__ */ xf(function() {
}, "name")) == null ? void 0 : Zg.configurable) != null ? Qg : !1, eT = {
  value: "action",
  configurable: !0,
  writable: !1,
  enumerable: !1
};
function di(e, n, t, r) {
  t === void 0 && (t = !1), process.env.NODE_ENV !== "production" && (tn(n) || te("`action` can only be invoked on functions"), (typeof e != "string" || !e) && te("actions should have valid names, got: '" + e + "'"));
  function i() {
    return $P(e, t, n, r || this, arguments);
  }
  return i.isMobxAction = !0, i.toString = function() {
    return n.toString();
  }, dE && (eT.value = e, Tr(i, "name", eT)), i;
}
function $P(e, n, t, r, i) {
  var o = MP(e, n, r, i);
  try {
    return t.apply(r, i);
  } catch (a) {
    throw o.error_ = a, a;
  } finally {
    CP(o);
  }
}
function MP(e, n, t, r) {
  var i = process.env.NODE_ENV !== "production" && Rn() && !!e, o = 0;
  if (process.env.NODE_ENV !== "production" && i) {
    o = Date.now();
    var a = r ? Array.from(r) : Ff;
    ft({
      type: xy,
      name: e,
      object: t,
      arguments: a
    });
  }
  var s = ee.trackingDerivation, c = !n || !s;
  Yn();
  var u = ee.allowStateChanges;
  c && (La(), u = dp(!0));
  var f = lp(!0), d = {
    runAsAction_: c,
    prevDerivation_: s,
    prevAllowStateChanges_: u,
    prevAllowStateReads_: f,
    notifySpy_: i,
    startTime_: o,
    actionId_: cE++,
    parentActionId_: Df
  };
  return Df = d.actionId_, d;
}
function CP(e) {
  Df !== e.actionId_ && te(30), Df = e.parentActionId_, e.error_ !== void 0 && (ee.suppressReactionErrors = !0), fp(e.prevAllowStateChanges_), ys(e.prevAllowStateReads_), Xn(), e.runAsAction_ && Gr(e.prevDerivation_), process.env.NODE_ENV !== "production" && e.notifySpy_ && pt({
    time: Date.now() - e.startTime_
  }), ee.suppressReactionErrors = !1;
}
function By(e, n) {
  var t = dp(e);
  try {
    return n();
  } finally {
    fp(t);
  }
}
function dp(e) {
  var n = ee.allowStateChanges;
  return ee.allowStateChanges = e, n;
}
function fp(e) {
  ee.allowStateChanges = e;
}
var fE = "create", ui = /* @__PURE__ */ function(e) {
  function n(r, i, o, a, s) {
    var c;
    return o === void 0 && (o = process.env.NODE_ENV !== "production" ? "ObservableValue@" + _t() : "ObservableValue"), a === void 0 && (a = !0), s === void 0 && (s = Ra.default), c = e.call(this, o) || this, c.enhancer = void 0, c.name_ = void 0, c.equals = void 0, c.hasUnreportedChange_ = !1, c.interceptors_ = void 0, c.changeListeners_ = void 0, c.value_ = void 0, c.dehancer = void 0, c.enhancer = i, c.name_ = o, c.equals = s, c.value_ = i(r, void 0, o), process.env.NODE_ENV !== "production" && a && Rn() && Ma({
      type: fE,
      object: c,
      observableKind: "value",
      debugObjectName: c.name_,
      newValue: "" + c.value_
    }), c;
  }
  hP(n, e);
  var t = n.prototype;
  return t.dehanceValue = function(i) {
    return this.dehancer !== void 0 ? this.dehancer(i) : i;
  }, t.set = function(i) {
    var o = this.value_;
    if (i = this.prepareNewValue_(i), i !== ee.UNCHANGED) {
      var a = Rn();
      process.env.NODE_ENV !== "production" && a && ft({
        type: zt,
        object: this,
        observableKind: "value",
        debugObjectName: this.name_,
        newValue: i,
        oldValue: o
      }), this.setNewValue_(i), process.env.NODE_ENV !== "production" && a && pt();
    }
  }, t.prepareNewValue_ = function(i) {
    if (mr(this), vt(this)) {
      var o = St(this, {
        object: this,
        type: zt,
        newValue: i
      });
      if (!o)
        return ee.UNCHANGED;
      i = o.newValue;
    }
    return i = this.enhancer(i, this.value_, this.name_), this.equals(this.value_, i) ? ee.UNCHANGED : i;
  }, t.setNewValue_ = function(i) {
    var o = this.value_;
    this.value_ = i, this.reportChanged(), Yt(this) && Xt(this, {
      type: zt,
      object: this,
      newValue: i,
      oldValue: o
    });
  }, t.get = function() {
    return this.reportObserved(), this.dehanceValue(this.value_);
  }, t.intercept_ = function(i) {
    return ku(this, i);
  }, t.observe_ = function(i, o) {
    return o && i({
      observableKind: "value",
      debugObjectName: this.name_,
      object: this,
      type: zt,
      newValue: this.value_,
      oldValue: void 0
    }), Wu(this, i);
  }, t.raw = function() {
    return this.value_;
  }, t.toJSON = function() {
    return this.get();
  }, t.toString = function() {
    return this.name_ + "[" + this.value_ + "]";
  }, t.valueOf = function() {
    return bP(this.get());
  }, t[Symbol.toPrimitive] = function() {
    return this.valueOf();
  }, n;
}(mi), jy = /* @__PURE__ */ yi("ObservableValue", ui), $t = /* @__PURE__ */ function() {
  function e(t) {
    this.dependenciesState_ = Ue.NOT_TRACKING_, this.observing_ = [], this.newObserving_ = null, this.observers_ = /* @__PURE__ */ new Set(), this.runId_ = 0, this.lastAccessedBy_ = 0, this.lowestObserverState_ = Ue.UP_TO_DATE_, this.unboundDepsCount_ = 0, this.value_ = new Uf(null), this.name_ = void 0, this.triggeredBy_ = void 0, this.flags_ = 0, this.derivation = void 0, this.setter_ = void 0, this.isTracing_ = Et.NONE, this.scope_ = void 0, this.equals_ = void 0, this.requiresReaction_ = void 0, this.keepAlive_ = void 0, this.onBOL = void 0, this.onBUOL = void 0, t.get || te(31), this.derivation = t.get, this.name_ = t.name || (process.env.NODE_ENV !== "production" ? "ComputedValue@" + _t() : "ComputedValue"), t.set && (this.setter_ = di(process.env.NODE_ENV !== "production" ? this.name_ + "-setter" : "ComputedValue-setter", t.set)), this.equals_ = t.equals || (t.compareStructural || t.struct ? Ra.structural : Ra.default), this.scope_ = t.context, this.requiresReaction_ = t.requiresReaction, this.keepAlive_ = !!t.keepAlive;
  }
  var n = e.prototype;
  return n.onBecomeStale_ = function() {
    AE(this);
  }, n.onBO = function() {
    this.onBOL && this.onBOL.forEach(function(r) {
      return r();
    });
  }, n.onBUO = function() {
    this.onBUOL && this.onBUOL.forEach(function(r) {
      return r();
    });
  }, n.get = function() {
    if (this.isComputing && te(32, this.name_, this.derivation), ee.inBatch === 0 && // !globalState.trackingDerivatpion &&
    this.observers_.size === 0 && !this.keepAlive_)
      Ql(this) && (this.warnAboutUntrackedRead_(), Yn(), this.value_ = this.computeValue_(!1), Xn());
    else if (DP(this), Ql(this)) {
      var r = ee.trackingContext;
      this.keepAlive_ && !r && (ee.trackingContext = this), this.trackAndCompute() && PE(this), ee.trackingContext = r;
    }
    var i = this.value_;
    if (Rf(i))
      throw i.cause;
    return i;
  }, n.set = function(r) {
    if (this.setter_) {
      this.isRunningSetter && te(33, this.name_), this.isRunningSetter = !0;
      try {
        this.setter_.call(this.scope_, r);
      } finally {
        this.isRunningSetter = !1;
      }
    } else
      te(34, this.name_);
  }, n.trackAndCompute = function() {
    var r = this.value_, i = (
      /* see #1208 */
      this.dependenciesState_ === Ue.NOT_TRACKING_
    ), o = this.computeValue_(!0), a = i || Rf(r) || Rf(o) || !this.equals_(r, o);
    return a && (this.value_ = o, process.env.NODE_ENV !== "production" && Rn() && Ma({
      observableKind: "computed",
      debugObjectName: this.name_,
      object: this.scope_,
      type: "update",
      oldValue: r,
      newValue: o
    })), a;
  }, n.computeValue_ = function(r) {
    this.isComputing = !0;
    var i = dp(!1), o;
    if (r)
      o = BP(this, this.derivation, this.scope_);
    else if (ee.disableErrorBoundaries === !0)
      o = this.derivation.call(this.scope_);
    else
      try {
        o = this.derivation.call(this.scope_);
      } catch (a) {
        o = new Uf(a);
      }
    return fp(i), this.isComputing = !1, o;
  }, n.suspend_ = function() {
    this.keepAlive_ || (Zl(this), this.value_ = void 0, process.env.NODE_ENV !== "production" && this.isTracing_ !== Et.NONE && console.log("[mobx.trace] Computed value '" + this.name_ + "' was suspended and it will recompute on the next access."));
  }, n.observe_ = function(r, i) {
    var o = this, a = !0, s = void 0;
    return Fy(function() {
      var c = o.get();
      if (!a || i) {
        var u = La();
        r({
          observableKind: "computed",
          debugObjectName: o.name_,
          type: zt,
          object: o,
          newValue: c,
          oldValue: s
        }), Gr(u);
      }
      a = !1, s = c;
    });
  }, n.warnAboutUntrackedRead_ = function() {
    process.env.NODE_ENV !== "production" && (this.isTracing_ !== Et.NONE && console.log("[mobx.trace] Computed value '" + this.name_ + "' is being read outside a reactive context. Doing a full recompute."), (typeof this.requiresReaction_ == "boolean" ? this.requiresReaction_ : ee.computedRequiresReaction) && console.warn("[mobx] Computed value '" + this.name_ + "' is being read outside a reactive context. Doing a full recompute."));
  }, n.toString = function() {
    return this.name_ + "[" + this.derivation.toString() + "]";
  }, n.valueOf = function() {
    return bP(this.get());
  }, n[Symbol.toPrimitive] = function() {
    return this.valueOf();
  }, js(e, [{
    key: "isComputing",
    get: function() {
      return ut(this.flags_, e.isComputingMask_);
    },
    set: function(r) {
      this.flags_ = ct(this.flags_, e.isComputingMask_, r);
    }
  }, {
    key: "isRunningSetter",
    get: function() {
      return ut(this.flags_, e.isRunningSetterMask_);
    },
    set: function(r) {
      this.flags_ = ct(this.flags_, e.isRunningSetterMask_, r);
    }
  }, {
    key: "isBeingObserved",
    get: function() {
      return ut(this.flags_, e.isBeingObservedMask_);
    },
    set: function(r) {
      this.flags_ = ct(this.flags_, e.isBeingObservedMask_, r);
    }
  }, {
    key: "isPendingUnobservation",
    get: function() {
      return ut(this.flags_, e.isPendingUnobservationMask_);
    },
    set: function(r) {
      this.flags_ = ct(this.flags_, e.isPendingUnobservationMask_, r);
    }
  }, {
    key: "diffValue",
    get: function() {
      return ut(this.flags_, e.diffValueMask_) ? 1 : 0;
    },
    set: function(r) {
      this.flags_ = ct(this.flags_, e.diffValueMask_, r === 1);
    }
  }]);
}();
$t.isComputingMask_ = 1;
$t.isRunningSetterMask_ = 2;
$t.isBeingObservedMask_ = 4;
$t.isPendingUnobservationMask_ = 8;
$t.diffValueMask_ = 16;
var $a = /* @__PURE__ */ yi("ComputedValue", $t), Ue;
(function(e) {
  e[e.NOT_TRACKING_ = -1] = "NOT_TRACKING_", e[e.UP_TO_DATE_ = 0] = "UP_TO_DATE_", e[e.POSSIBLY_STALE_ = 1] = "POSSIBLY_STALE_", e[e.STALE_ = 2] = "STALE_";
})(Ue || (Ue = {}));
var Et;
(function(e) {
  e[e.NONE = 0] = "NONE", e[e.LOG = 1] = "LOG", e[e.BREAK = 2] = "BREAK";
})(Et || (Et = {}));
var Uf = function(n) {
  this.cause = void 0, this.cause = n;
};
function Rf(e) {
  return e instanceof Uf;
}
function Ql(e) {
  switch (e.dependenciesState_) {
    case Ue.UP_TO_DATE_:
      return !1;
    case Ue.NOT_TRACKING_:
    case Ue.STALE_:
      return !0;
    case Ue.POSSIBLY_STALE_: {
      for (var n = lp(!0), t = La(), r = e.observing_, i = r.length, o = 0; o < i; o++) {
        var a = r[o];
        if ($a(a)) {
          if (ee.disableErrorBoundaries)
            a.get();
          else
            try {
              a.get();
            } catch {
              return Gr(t), ys(n), !0;
            }
          if (e.dependenciesState_ === Ue.STALE_)
            return Gr(t), ys(n), !0;
        }
      }
      return jP(e), Gr(t), ys(n), !1;
    }
  }
}
function pE() {
  return ee.trackingDerivation !== null;
}
function mr(e) {
  if (process.env.NODE_ENV !== "production") {
    var n = e.observers_.size > 0;
    !ee.allowStateChanges && (n || ee.enforceActions === "always") && console.warn("[MobX] " + (ee.enforceActions ? "Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed. Tried to modify: " : "Side effects like changing state are not allowed at this point. Are you trying to modify state from, for example, a computed value or the render function of a React component? You can wrap side effects in 'runInAction' (or decorate functions with 'action') if needed. Tried to modify: ") + e.name_);
  }
}
function lE(e) {
  process.env.NODE_ENV !== "production" && !ee.allowStateReads && ee.observableRequiresReaction && console.warn("[mobx] Observable '" + e.name_ + "' being read outside a reactive context.");
}
function BP(e, n, t) {
  var r = lp(!0);
  jP(e), e.newObserving_ = new Array(
    // Reserve constant space for initial dependencies, dynamic space otherwise.
    // See https://github.com/mobxjs/mobx/pull/3833
    e.runId_ === 0 ? 100 : e.observing_.length
  ), e.unboundDepsCount_ = 0, e.runId_ = ++ee.runId;
  var i = ee.trackingDerivation;
  ee.trackingDerivation = e, ee.inBatch++;
  var o;
  if (ee.disableErrorBoundaries === !0)
    o = n.call(t);
  else
    try {
      o = n.call(t);
    } catch (a) {
      o = new Uf(a);
    }
  return ee.inBatch--, ee.trackingDerivation = i, mE(e), yE(e), ys(r), o;
}
function yE(e) {
  process.env.NODE_ENV !== "production" && e.observing_.length === 0 && (typeof e.requiresObservable_ == "boolean" ? e.requiresObservable_ : ee.reactionRequiresObservable) && console.warn("[mobx] Derivation '" + e.name_ + "' is created/updated without reading any observable value.");
}
function mE(e) {
  for (var n = e.observing_, t = e.observing_ = e.newObserving_, r = Ue.UP_TO_DATE_, i = 0, o = e.unboundDepsCount_, a = 0; a < o; a++) {
    var s = t[a];
    s.diffValue === 0 && (s.diffValue = 1, i !== a && (t[i] = s), i++), s.dependenciesState_ > r && (r = s.dependenciesState_);
  }
  for (t.length = i, e.newObserving_ = null, o = n.length; o--; ) {
    var c = n[o];
    c.diffValue === 0 && FP(c, e), c.diffValue = 0;
  }
  for (; i--; ) {
    var u = t[i];
    u.diffValue === 1 && (u.diffValue = 0, OE(u, e));
  }
  r !== Ue.UP_TO_DATE_ && (e.dependenciesState_ = r, e.onBecomeStale_());
}
function Zl(e) {
  var n = e.observing_;
  e.observing_ = [];
  for (var t = n.length; t--; )
    FP(n[t], e);
  e.dependenciesState_ = Ue.NOT_TRACKING_;
}
function pp(e) {
  var n = La();
  try {
    return e();
  } finally {
    Gr(n);
  }
}
function La() {
  var e = ee.trackingDerivation;
  return ee.trackingDerivation = null, e;
}
function Gr(e) {
  ee.trackingDerivation = e;
}
function lp(e) {
  var n = ee.allowStateReads;
  return ee.allowStateReads = e, n;
}
function ys(e) {
  ee.allowStateReads = e;
}
function jP(e) {
  if (e.dependenciesState_ !== Ue.UP_TO_DATE_) {
    e.dependenciesState_ = Ue.UP_TO_DATE_;
    for (var n = e.observing_, t = n.length; t--; )
      n[t].lowestObserverState_ = Ue.UP_TO_DATE_;
  }
}
var gE = ["mobxGuid", "spyListeners", "enforceActions", "computedRequiresReaction", "reactionRequiresObservable", "observableRequiresReaction", "allowStateReads", "disableErrorBoundaries", "runId", "UNCHANGED", "useProxies"], Pu = function() {
  this.version = 6, this.UNCHANGED = {}, this.trackingDerivation = null, this.trackingContext = null, this.runId = 0, this.mobxGuid = 0, this.inBatch = 0, this.pendingUnobservations = [], this.pendingReactions = [], this.isRunningReactions = !1, this.allowStateChanges = !1, this.allowStateReads = !0, this.enforceActions = !0, this.spyListeners = [], this.globalReactionErrorHandlers = [], this.computedRequiresReaction = !1, this.reactionRequiresObservable = !1, this.observableRequiresReaction = !1, this.disableErrorBoundaries = !1, this.suppressReactionErrors = !1, this.useProxies = !0, this.verifyProxies = !1, this.safeDescriptors = !0;
}, Ef = !0, xP = !1, ee = /* @__PURE__ */ function() {
  var e = /* @__PURE__ */ op();
  return e.__mobxInstanceCount > 0 && !e.__mobxGlobals && (Ef = !1), e.__mobxGlobals && e.__mobxGlobals.version !== new Pu().version && (Ef = !1), Ef ? e.__mobxGlobals ? (e.__mobxInstanceCount += 1, e.__mobxGlobals.UNCHANGED || (e.__mobxGlobals.UNCHANGED = {}), e.__mobxGlobals) : (e.__mobxInstanceCount = 1, e.__mobxGlobals = /* @__PURE__ */ new Pu()) : (setTimeout(function() {
    xP || te(35);
  }, 1), new Pu());
}();
function TE() {
  if ((ee.pendingReactions.length || ee.inBatch || ee.isRunningReactions) && te(36), xP = !0, Ef) {
    var e = op();
    --e.__mobxInstanceCount === 0 && (e.__mobxGlobals = void 0), ee = new Pu();
  }
}
function _E() {
  return ee;
}
function bE() {
  var e = new Pu();
  for (var n in e)
    gE.indexOf(n) === -1 && (ee[n] = e[n]);
  ee.allowStateChanges = !ee.enforceActions;
}
function hE(e) {
  return e.observers_ && e.observers_.size > 0;
}
function IE(e) {
  return e.observers_;
}
function OE(e, n) {
  e.observers_.add(n), e.lowestObserverState_ > n.dependenciesState_ && (e.lowestObserverState_ = n.dependenciesState_);
}
function FP(e, n) {
  e.observers_.delete(n), e.observers_.size === 0 && NP(e);
}
function NP(e) {
  e.isPendingUnobservation === !1 && (e.isPendingUnobservation = !0, ee.pendingUnobservations.push(e));
}
function Yn() {
  ee.inBatch++;
}
function Xn() {
  if (--ee.inBatch === 0) {
    qP();
    for (var e = ee.pendingUnobservations, n = 0; n < e.length; n++) {
      var t = e[n];
      t.isPendingUnobservation = !1, t.observers_.size === 0 && (t.isBeingObserved && (t.isBeingObserved = !1, t.onBUO()), t instanceof $t && t.suspend_());
    }
    ee.pendingUnobservations = [];
  }
}
function DP(e) {
  lE(e);
  var n = ee.trackingDerivation;
  return n !== null ? (n.runId_ !== e.lastAccessedBy_ && (e.lastAccessedBy_ = n.runId_, n.newObserving_[n.unboundDepsCount_++] = e, !e.isBeingObserved && ee.trackingContext && (e.isBeingObserved = !0, e.onBO())), e.isBeingObserved) : (e.observers_.size === 0 && ee.inBatch > 0 && NP(e), !1);
}
function UP(e) {
  e.lowestObserverState_ !== Ue.STALE_ && (e.lowestObserverState_ = Ue.STALE_, e.observers_.forEach(function(n) {
    n.dependenciesState_ === Ue.UP_TO_DATE_ && (process.env.NODE_ENV !== "production" && n.isTracing_ !== Et.NONE && LP(n, e), n.onBecomeStale_()), n.dependenciesState_ = Ue.STALE_;
  }));
}
function PE(e) {
  e.lowestObserverState_ !== Ue.STALE_ && (e.lowestObserverState_ = Ue.STALE_, e.observers_.forEach(function(n) {
    n.dependenciesState_ === Ue.POSSIBLY_STALE_ ? (n.dependenciesState_ = Ue.STALE_, process.env.NODE_ENV !== "production" && n.isTracing_ !== Et.NONE && LP(n, e)) : n.dependenciesState_ === Ue.UP_TO_DATE_ && (e.lowestObserverState_ = Ue.UP_TO_DATE_);
  }));
}
function AE(e) {
  e.lowestObserverState_ === Ue.UP_TO_DATE_ && (e.lowestObserverState_ = Ue.POSSIBLY_STALE_, e.observers_.forEach(function(n) {
    n.dependenciesState_ === Ue.UP_TO_DATE_ && (n.dependenciesState_ = Ue.POSSIBLY_STALE_, n.onBecomeStale_());
  }));
}
function LP(e, n) {
  if (console.log("[mobx.trace] '" + e.name_ + "' is invalidated due to a change in: '" + n.name_ + "'"), e.isTracing_ === Et.BREAK) {
    var t = [];
    VP(XP(e), t, 1), new Function(`debugger;
/*
Tracing '` + e.name_ + `'

You are entering this break point because derivation '` + e.name_ + "' is being traced and '" + n.name_ + `' is now forcing it to update.
Just follow the stacktrace you should now see in the devtools to see precisely what piece of your code is causing this update
The stackframe you are looking for is at least ~6-8 stack-frames up.

` + (e instanceof $t ? e.derivation.toString().replace(/[*]\//g, "/") : "") + `

The dependencies for this derivation are:

` + t.join(`
`) + `
*/
    `)();
  }
}
function VP(e, n, t) {
  if (n.length >= 1e3) {
    n.push("(and many more)");
    return;
  }
  n.push("" + "	".repeat(t - 1) + e.name), e.dependencies && e.dependencies.forEach(function(r) {
    return VP(r, n, t + 1);
  });
}
var Ir = /* @__PURE__ */ function() {
  function e(t, r, i, o) {
    t === void 0 && (t = process.env.NODE_ENV !== "production" ? "Reaction@" + _t() : "Reaction"), this.name_ = void 0, this.onInvalidate_ = void 0, this.errorHandler_ = void 0, this.requiresObservable_ = void 0, this.observing_ = [], this.newObserving_ = [], this.dependenciesState_ = Ue.NOT_TRACKING_, this.runId_ = 0, this.unboundDepsCount_ = 0, this.flags_ = 0, this.isTracing_ = Et.NONE, this.name_ = t, this.onInvalidate_ = r, this.errorHandler_ = i, this.requiresObservable_ = o;
  }
  var n = e.prototype;
  return n.onBecomeStale_ = function() {
    this.schedule_();
  }, n.schedule_ = function() {
    this.isScheduled || (this.isScheduled = !0, ee.pendingReactions.push(this), qP());
  }, n.runReaction_ = function() {
    if (!this.isDisposed) {
      Yn(), this.isScheduled = !1;
      var r = ee.trackingContext;
      if (ee.trackingContext = this, Ql(this)) {
        this.isTrackPending = !0;
        try {
          this.onInvalidate_(), process.env.NODE_ENV !== "production" && this.isTrackPending && Rn() && Ma({
            name: this.name_,
            type: "scheduled-reaction"
          });
        } catch (i) {
          this.reportExceptionInDerivation_(i);
        }
      }
      ee.trackingContext = r, Xn();
    }
  }, n.track = function(r) {
    if (!this.isDisposed) {
      Yn();
      var i = Rn(), o;
      process.env.NODE_ENV !== "production" && i && (o = Date.now(), ft({
        name: this.name_,
        type: "reaction"
      })), this.isRunning = !0;
      var a = ee.trackingContext;
      ee.trackingContext = this;
      var s = BP(this, r, void 0);
      ee.trackingContext = a, this.isRunning = !1, this.isTrackPending = !1, this.isDisposed && Zl(this), Rf(s) && this.reportExceptionInDerivation_(s.cause), process.env.NODE_ENV !== "production" && i && pt({
        time: Date.now() - o
      }), Xn();
    }
  }, n.reportExceptionInDerivation_ = function(r) {
    var i = this;
    if (this.errorHandler_) {
      this.errorHandler_(r, this);
      return;
    }
    if (ee.disableErrorBoundaries)
      throw r;
    var o = process.env.NODE_ENV !== "production" ? "[mobx] Encountered an uncaught exception that was thrown by a reaction or observer component, in: '" + this + "'" : "[mobx] uncaught error in '" + this + "'";
    ee.suppressReactionErrors ? process.env.NODE_ENV !== "production" && console.warn("[mobx] (error in reaction '" + this.name_ + "' suppressed, fix error of causing action below)") : console.error(o, r), process.env.NODE_ENV !== "production" && Rn() && Ma({
      type: "error",
      name: this.name_,
      message: o,
      error: "" + r
    }), ee.globalReactionErrorHandlers.forEach(function(a) {
      return a(r, i);
    });
  }, n.dispose = function() {
    this.isDisposed || (this.isDisposed = !0, this.isRunning || (Yn(), Zl(this), Xn()));
  }, n.getDisposer_ = function(r) {
    var i = this, o = function a() {
      i.dispose(), r == null || r.removeEventListener == null || r.removeEventListener("abort", a);
    };
    return r == null || r.addEventListener == null || r.addEventListener("abort", o), o[me] = this, o;
  }, n.toString = function() {
    return "Reaction[" + this.name_ + "]";
  }, n.trace = function(r) {
    r === void 0 && (r = !1), oA(this, r);
  }, js(e, [{
    key: "isDisposed",
    get: function() {
      return ut(this.flags_, e.isDisposedMask_);
    },
    set: function(r) {
      this.flags_ = ct(this.flags_, e.isDisposedMask_, r);
    }
  }, {
    key: "isScheduled",
    get: function() {
      return ut(this.flags_, e.isScheduledMask_);
    },
    set: function(r) {
      this.flags_ = ct(this.flags_, e.isScheduledMask_, r);
    }
  }, {
    key: "isTrackPending",
    get: function() {
      return ut(this.flags_, e.isTrackPendingMask_);
    },
    set: function(r) {
      this.flags_ = ct(this.flags_, e.isTrackPendingMask_, r);
    }
  }, {
    key: "isRunning",
    get: function() {
      return ut(this.flags_, e.isRunningMask_);
    },
    set: function(r) {
      this.flags_ = ct(this.flags_, e.isRunningMask_, r);
    }
  }, {
    key: "diffValue",
    get: function() {
      return ut(this.flags_, e.diffValueMask_) ? 1 : 0;
    },
    set: function(r) {
      this.flags_ = ct(this.flags_, e.diffValueMask_, r === 1);
    }
  }]);
}();
Ir.isDisposedMask_ = 1;
Ir.isScheduledMask_ = 2;
Ir.isTrackPendingMask_ = 4;
Ir.isRunningMask_ = 8;
Ir.diffValueMask_ = 16;
function wE(e) {
  return ee.globalReactionErrorHandlers.push(e), function() {
    var n = ee.globalReactionErrorHandlers.indexOf(e);
    n >= 0 && ee.globalReactionErrorHandlers.splice(n, 1);
  };
}
var nT = 100, ey = function(n) {
  return n();
};
function qP() {
  ee.inBatch > 0 || ee.isRunningReactions || ey(vE);
}
function vE() {
  ee.isRunningReactions = !0;
  for (var e = ee.pendingReactions, n = 0; e.length > 0; ) {
    ++n === nT && (console.error(process.env.NODE_ENV !== "production" ? "Reaction doesn't converge to a stable state after " + nT + " iterations." + (" Probably there is a cycle in the reactive function: " + e[0]) : "[mobx] cycle in reaction: " + e[0]), e.splice(0));
    for (var t = e.splice(0), r = 0, i = t.length; r < i; r++)
      t[r].runReaction_();
  }
  ee.isRunningReactions = !1;
}
var Lf = /* @__PURE__ */ yi("Reaction", Ir);
function SE(e) {
  var n = ey;
  ey = function(r) {
    return e(function() {
      return n(r);
    });
  };
}
function Rn() {
  return process.env.NODE_ENV !== "production" && !!ee.spyListeners.length;
}
function Ma(e) {
  if (process.env.NODE_ENV !== "production" && ee.spyListeners.length)
    for (var n = ee.spyListeners, t = 0, r = n.length; t < r; t++)
      n[t](e);
}
function ft(e) {
  if (process.env.NODE_ENV !== "production") {
    var n = hr({}, e, {
      spyReportStart: !0
    });
    Ma(n);
  }
}
var RE = {
  type: "report-end",
  spyReportEnd: !0
};
function pt(e) {
  process.env.NODE_ENV !== "production" && Ma(e ? hr({}, e, {
    type: "report-end",
    spyReportEnd: !0
  }) : RE);
}
function KP(e) {
  return process.env.NODE_ENV === "production" ? (console.warn("[mobx.spy] Is a no-op in production builds"), function() {
  }) : (ee.spyListeners.push(e), $y(function() {
    ee.spyListeners = ee.spyListeners.filter(function(n) {
      return n !== e;
    });
  }));
}
var xy = "action", EE = "action.bound", GP = "autoAction", $E = "autoAction.bound", HP = "<unnamed action>", ny = /* @__PURE__ */ Hu(xy), ME = /* @__PURE__ */ Hu(EE, {
  bound: !0
}), ty = /* @__PURE__ */ Hu(GP, {
  autoAction: !0
}), CE = /* @__PURE__ */ Hu($E, {
  autoAction: !0,
  bound: !0
});
function kP(e) {
  var n = function(r, i) {
    if (tn(r))
      return di(r.name || HP, r, e);
    if (tn(i))
      return di(r, i, e);
    if (Gu(i))
      return (e ? ty : ny).decorate_20223_(r, i);
    if (br(i))
      return Ku(r, i, e ? ty : ny);
    if (br(r))
      return Jt(Hu(e ? GP : xy, {
        name: r,
        autoAction: e
      }));
    process.env.NODE_ENV !== "production" && te("Invalid arguments for `action`");
  };
  return n;
}
var Oe = /* @__PURE__ */ kP(!1);
Object.assign(Oe, ny);
var bs = /* @__PURE__ */ kP(!0);
Object.assign(bs, ty);
Oe.bound = /* @__PURE__ */ Jt(ME);
bs.bound = /* @__PURE__ */ Jt(CE);
function ry(e) {
  return $P(e.name || HP, !1, e, this, void 0);
}
function Ca(e) {
  return tn(e) && e.isMobxAction === !0;
}
function Fy(e, n) {
  var t, r, i, o;
  n === void 0 && (n = Ey), process.env.NODE_ENV !== "production" && (tn(e) || te("Autorun expects a function as first argument"), Ca(e) && te("Autorun does not accept actions since actions are untrackable"));
  var a = (t = (r = n) == null ? void 0 : r.name) != null ? t : process.env.NODE_ENV !== "production" ? e.name || "Autorun@" + _t() : "Autorun", s = !n.scheduler && !n.delay, c;
  if (s)
    c = new Ir(a, function() {
      this.track(d);
    }, n.onError, n.requiresObservable);
  else {
    var u = WP(n), f = !1;
    c = new Ir(a, function() {
      f || (f = !0, u(function() {
        f = !1, c.isDisposed || c.track(d);
      }));
    }, n.onError, n.requiresObservable);
  }
  function d() {
    e(c);
  }
  return (i = n) != null && (i = i.signal) != null && i.aborted || c.schedule_(), c.getDisposer_((o = n) == null ? void 0 : o.signal);
}
var BE = function(n) {
  return n();
};
function WP(e) {
  return e.scheduler ? e.scheduler : e.delay ? function(n) {
    return setTimeout(n, e.delay);
  } : BE;
}
function zP(e, n, t) {
  var r, i, o;
  t === void 0 && (t = Ey), process.env.NODE_ENV !== "production" && ((!tn(e) || !tn(n)) && te("First and second argument to reaction should be functions"), et(t) || te("Third argument of reactions should be an object"));
  var a = (r = t.name) != null ? r : process.env.NODE_ENV !== "production" ? "Reaction@" + _t() : "Reaction", s = Oe(a, t.onError ? jE(t.onError, n) : n), c = !t.scheduler && !t.delay, u = WP(t), f = !0, d = !1, p, T = t.compareStructural ? Ra.structural : t.equals || Ra.default, b = new Ir(a, function() {
    f || c ? O() : d || (d = !0, u(O));
  }, t.onError, t.requiresObservable);
  function O() {
    if (d = !1, !b.isDisposed) {
      var F = !1, E = p;
      b.track(function() {
        var M = By(!1, function() {
          return e(b);
        });
        F = f || !T(p, M), p = M;
      }), (f && t.fireImmediately || !f && F) && s(p, E, b), f = !1;
    }
  }
  return (i = t) != null && (i = i.signal) != null && i.aborted || b.schedule_(), b.getDisposer_((o = t) == null ? void 0 : o.signal);
}
function jE(e, n) {
  return function() {
    try {
      return n.apply(this, arguments);
    } catch (t) {
      e.call(this, t);
    }
  };
}
var xE = "onBO", FE = "onBUO";
function JP(e, n, t) {
  return YP(xE, e, n, t);
}
function Ny(e, n, t) {
  return YP(FE, e, n, t);
}
function YP(e, n, t, r) {
  var i = typeof r == "function" ? er(n, t) : er(n), o = tn(r) ? r : t, a = e + "L";
  return i[a] ? i[a].add(o) : i[a] = /* @__PURE__ */ new Set([o]), function() {
    var s = i[a];
    s && (s.delete(o), s.size === 0 && delete i[a]);
  };
}
var NE = "never", $c = "always", DE = "observed";
function UE(e) {
  e.isolateGlobalState === !0 && TE();
  var n = e.useProxies, t = e.enforceActions;
  if (n !== void 0 && (ee.useProxies = n === $c ? !0 : n === NE ? !1 : typeof Proxy < "u"), n === "ifavailable" && (ee.verifyProxies = !0), t !== void 0) {
    var r = t === $c ? $c : t === DE;
    ee.enforceActions = r, ee.allowStateChanges = !(r === !0 || r === $c);
  }
  ["computedRequiresReaction", "reactionRequiresObservable", "observableRequiresReaction", "disableErrorBoundaries", "safeDescriptors"].forEach(function(i) {
    i in e && (ee[i] = !!e[i]);
  }), ee.allowStateReads = !ee.observableRequiresReaction, process.env.NODE_ENV !== "production" && ee.disableErrorBoundaries === !0 && console.warn("WARNING: Debug feature only. MobX will NOT recover from errors when `disableErrorBoundaries` is enabled."), e.reactionScheduler && SE(e.reactionScheduler);
}
function Dy(e, n, t, r) {
  process.env.NODE_ENV !== "production" && (arguments.length > 4 && te("'extendObservable' expected 2-4 arguments"), typeof e != "object" && te("'extendObservable' expects an object as first argument"), ln(e) && te("'extendObservable' should not be used on maps, use map.merge instead"), et(n) || te("'extendObservable' only accepts plain objects as second argument"), (mt(n) || mt(t)) && te("Extending an object with another observable (object) is not supported"));
  var i = lR(n);
  return gi(function() {
    var o = Va(e, r)[me];
    _s(i).forEach(function(a) {
      o.extend_(
        a,
        i[a],
        // must pass "undefined" for { key: undefined }
        t && a in t ? t[a] : !0
      );
    });
  }), e;
}
function XP(e, n) {
  return QP(er(e, n));
}
function QP(e) {
  var n = {
    name: e.name_
  };
  return e.observing_ && e.observing_.length > 0 && (n.dependencies = VE(e.observing_).map(QP)), n;
}
function LE(e, n) {
  return ZP(er(e, n));
}
function ZP(e) {
  var n = {
    name: e.name_
  };
  return hE(e) && (n.observers = Array.from(IE(e)).map(ZP)), n;
}
function VE(e) {
  return Array.from(new Set(e));
}
var qE = 0;
function yp() {
  this.message = "FLOW_CANCELLED";
}
yp.prototype = /* @__PURE__ */ Object.create(Error.prototype);
function KE(e) {
  return e instanceof yp;
}
var gl = /* @__PURE__ */ PP("flow"), GE = /* @__PURE__ */ PP("flow.bound", {
  bound: !0
}), Ba = /* @__PURE__ */ Object.assign(function(n, t) {
  if (Gu(t))
    return gl.decorate_20223_(n, t);
  if (br(t))
    return Ku(n, t, gl);
  process.env.NODE_ENV !== "production" && arguments.length !== 1 && te("Flow expects single argument with generator function");
  var r = n, i = r.name || "<unnamed flow>", o = function() {
    var s = this, c = arguments, u = ++qE, f = Oe(i + " - runid: " + u + " - init", r).apply(s, c), d, p = void 0, T = new Promise(function(b, O) {
      var F = 0;
      d = O;
      function E(w) {
        p = void 0;
        var _;
        try {
          _ = Oe(i + " - runid: " + u + " - yield " + F++, f.next).call(f, w);
        } catch (B) {
          return O(B);
        }
        N(_);
      }
      function M(w) {
        p = void 0;
        var _;
        try {
          _ = Oe(i + " - runid: " + u + " - yield " + F++, f.throw).call(f, w);
        } catch (B) {
          return O(B);
        }
        N(_);
      }
      function N(w) {
        if (tn(w == null ? void 0 : w.then)) {
          w.then(N, O);
          return;
        }
        return w.done ? b(w.value) : (p = Promise.resolve(w.value), p.then(E, M));
      }
      E(void 0);
    });
    return T.cancel = Oe(i + " - runid: " + u + " - cancel", function() {
      try {
        p && tT(p);
        var b = f.return(void 0), O = Promise.resolve(b.value);
        O.then(fs, fs), tT(O), d(new yp());
      } catch (F) {
        d(F);
      }
    }), T;
  };
  return o.isMobXFlow = !0, o;
}, gl);
Ba.bound = /* @__PURE__ */ Jt(GE);
function tT(e) {
  tn(e.cancel) && e.cancel();
}
function HE(e) {
  return e;
}
function hs(e) {
  return (e == null ? void 0 : e.isMobXFlow) === !0;
}
function kE(e, n, t) {
  var r;
  if (ln(e) || wn(e) || jy(e))
    r = Or(e);
  else if (Qe(e)) {
    if (process.env.NODE_ENV !== "production" && !br(n))
      return te("InterceptReads can only be used with a specific property, not with an object in general");
    r = Or(e, n);
  } else if (process.env.NODE_ENV !== "production")
    return te("Expected observable map, object or array as first array");
  return process.env.NODE_ENV !== "production" && r.dehancer !== void 0 ? te("An intercept reader was already established") : (r.dehancer = typeof n == "function" ? n : t, function() {
    r.dehancer = void 0;
  });
}
function mp(e, n, t) {
  return tn(t) ? zE(e, n, t) : WE(e, n);
}
function WE(e, n) {
  return Or(e).intercept_(n);
}
function zE(e, n, t) {
  return Or(e, n).intercept_(t);
}
function eA(e, n) {
  if (n === void 0)
    return $a(e);
  if (Qe(e) === !1 || !e[me].values_.has(n))
    return !1;
  var t = er(e, n);
  return $a(t);
}
function JE(e) {
  return process.env.NODE_ENV !== "production" && arguments.length > 1 ? te("isComputed expects only 1 argument. Use isComputedProp to inspect the observability of a property") : eA(e);
}
function YE(e, n) {
  return process.env.NODE_ENV !== "production" && !br(n) ? te("isComputed expected a property name as second argument") : eA(e, n);
}
function nA(e, n) {
  return e ? n !== void 0 ? process.env.NODE_ENV !== "production" && (ln(e) || wn(e)) ? te("isObservable(object, propertyName) is not supported for arrays and maps. Use map.has or array.length instead.") : Qe(e) ? e[me].values_.has(n) : !1 : Qe(e) || !!e[me] || My(e) || Lf(e) || $a(e) : !1;
}
function mt(e) {
  return process.env.NODE_ENV !== "production" && arguments.length !== 1 && te("isObservable expects only 1 argument. Use isObservableProp to inspect the observability of a property"), nA(e);
}
function XE(e, n) {
  return process.env.NODE_ENV !== "production" && !br(n) ? te("expected a property name as second argument") : nA(e, n);
}
function ja(e) {
  if (Qe(e))
    return e[me].keys_();
  if (ln(e) || un(e))
    return Array.from(e.keys());
  if (wn(e))
    return e.map(function(n, t) {
      return t;
    });
  te(5);
}
function Vf(e) {
  if (Qe(e))
    return ja(e).map(function(n) {
      return e[n];
    });
  if (ln(e))
    return ja(e).map(function(n) {
      return e.get(n);
    });
  if (un(e))
    return Array.from(e.values());
  if (wn(e))
    return e.slice();
  te(6);
}
function tA(e) {
  if (Qe(e))
    return ja(e).map(function(n) {
      return [n, e[n]];
    });
  if (ln(e))
    return ja(e).map(function(n) {
      return [n, e.get(n)];
    });
  if (un(e))
    return Array.from(e.entries());
  if (wn(e))
    return e.map(function(n, t) {
      return [t, n];
    });
  te(7);
}
function Zr(e, n, t) {
  if (arguments.length === 2 && !un(e)) {
    Yn();
    var r = n;
    try {
      for (var i in r)
        Zr(e, i, r[i]);
    } finally {
      Xn();
    }
    return;
  }
  Qe(e) ? e[me].set_(n, t) : ln(e) ? e.set(n, t) : un(e) ? e.add(n) : wn(e) ? (typeof n != "number" && (n = parseInt(n, 10)), n < 0 && te("Invalid index: '" + n + "'"), Yn(), n >= e.length && (e.length = n + 1), e[n] = t, Xn()) : te(8);
}
function Zt(e, n) {
  Qe(e) ? e[me].delete_(n) : ln(e) || un(e) ? e.delete(n) : wn(e) ? (typeof n != "number" && (n = parseInt(n, 10)), e.splice(n, 1)) : te(9);
}
function Uy(e, n) {
  if (Qe(e))
    return e[me].has_(n);
  if (ln(e))
    return e.has(n);
  if (un(e))
    return e.has(n);
  if (wn(e))
    return n >= 0 && n < e.length;
  te(10);
}
function rA(e, n) {
  if (Uy(e, n)) {
    if (Qe(e))
      return e[me].get_(n);
    if (ln(e))
      return e.get(n);
    if (wn(e))
      return e[n];
    te(11);
  }
}
function QE(e, n, t) {
  if (Qe(e))
    return e[me].defineProperty_(n, t);
  te(39);
}
function iA(e) {
  if (Qe(e))
    return e[me].ownKeys_();
  te(38);
}
function gp(e, n, t, r) {
  return tn(t) ? e$(e, n, t, r) : ZE(e, n, t);
}
function ZE(e, n, t) {
  return Or(e).observe_(n, t);
}
function e$(e, n, t, r) {
  return Or(e, n).observe_(t, r);
}
function Mc(e, n, t) {
  return e.set(n, t), t;
}
function ds(e, n) {
  if (e == null || typeof e != "object" || e instanceof Date || !mt(e))
    return e;
  if (jy(e) || $a(e))
    return ds(e.get(), n);
  if (n.has(e))
    return n.get(e);
  if (wn(e)) {
    var t = Mc(n, e, new Array(e.length));
    return e.forEach(function(a, s) {
      t[s] = ds(a, n);
    }), t;
  }
  if (un(e)) {
    var r = Mc(n, e, /* @__PURE__ */ new Set());
    return e.forEach(function(a) {
      r.add(ds(a, n));
    }), r;
  }
  if (ln(e)) {
    var i = Mc(n, e, /* @__PURE__ */ new Map());
    return e.forEach(function(a, s) {
      i.set(s, ds(a, n));
    }), i;
  } else {
    var o = Mc(n, e, {});
    return iA(e).forEach(function(a) {
      Vu.propertyIsEnumerable.call(e, a) && (o[a] = ds(e[a], n));
    }), o;
  }
}
function qf(e, n) {
  return process.env.NODE_ENV !== "production" && n && te("toJS no longer supports options"), ds(e, /* @__PURE__ */ new Map());
}
function oA() {
  if (process.env.NODE_ENV !== "production") {
    for (var e = !1, n = arguments.length, t = new Array(n), r = 0; r < n; r++)
      t[r] = arguments[r];
    typeof t[t.length - 1] == "boolean" && (e = t.pop());
    var i = n$(t);
    if (!i)
      return te("'trace(break?)' can only be used inside a tracked computed value or a Reaction. Consider passing in the computed value or reaction explicitly");
    i.isTracing_ === Et.NONE && console.log("[mobx.trace] '" + i.name_ + "' tracing enabled"), i.isTracing_ = e ? Et.BREAK : Et.LOG;
  }
}
function n$(e) {
  switch (e.length) {
    case 0:
      return ee.trackingDerivation;
    case 1:
      return er(e[0]);
    case 2:
      return er(e[0], e[1]);
  }
}
function Wt(e, n) {
  n === void 0 && (n = void 0), Yn();
  try {
    return e.apply(n);
  } finally {
    Xn();
  }
}
function t$(e, n, t) {
  return arguments.length === 1 || n && typeof n == "object" ? r$(e, n) : aA(e, n, t || {});
}
function aA(e, n, t) {
  var r;
  if (typeof t.timeout == "number") {
    var i = new Error("WHEN_TIMEOUT");
    r = setTimeout(function() {
      if (!a[me].isDisposed)
        if (a(), t.onError)
          t.onError(i);
        else
          throw i;
    }, t.timeout);
  }
  t.name = process.env.NODE_ENV !== "production" ? t.name || "When@" + _t() : "When";
  var o = di(process.env.NODE_ENV !== "production" ? t.name + "-effect" : "When-effect", n), a = Fy(function(s) {
    var c = By(!1, e);
    c && (s.dispose(), r && clearTimeout(r), o());
  }, t);
  return a;
}
function r$(e, n) {
  var t;
  if (process.env.NODE_ENV !== "production" && n && n.onError)
    return te("the options 'onError' and 'promise' cannot be combined");
  if (n != null && (t = n.signal) != null && t.aborted)
    return Object.assign(Promise.reject(new Error("WHEN_ABORTED")), {
      cancel: function() {
        return null;
      }
    });
  var r, i, o = new Promise(function(a, s) {
    var c, u = aA(e, a, hr({}, n, {
      onError: s
    }));
    r = function() {
      u(), s(new Error("WHEN_CANCELLED"));
    }, i = function() {
      u(), s(new Error("WHEN_ABORTED"));
    }, n == null || (c = n.signal) == null || c.addEventListener == null || c.addEventListener("abort", i);
  }).finally(function() {
    var a;
    return n == null || (a = n.signal) == null || a.removeEventListener == null ? void 0 : a.removeEventListener("abort", i);
  });
  return o.cancel = r, o;
}
function Si(e) {
  return e[me];
}
var i$ = {
  has: function(n, t) {
    return process.env.NODE_ENV !== "production" && ee.trackingDerivation && iu("detect new properties using the 'in' operator. Use 'has' from 'mobx' instead."), Si(n).has_(t);
  },
  get: function(n, t) {
    return Si(n).get_(t);
  },
  set: function(n, t, r) {
    var i;
    return br(t) ? (process.env.NODE_ENV !== "production" && !Si(n).values_.has(t) && iu("add a new observable property through direct assignment. Use 'set' from 'mobx' instead."), (i = Si(n).set_(t, r, !0)) != null ? i : !0) : !1;
  },
  deleteProperty: function(n, t) {
    var r;
    return process.env.NODE_ENV !== "production" && iu("delete properties from an observable object. Use 'remove' from 'mobx' instead."), br(t) ? (r = Si(n).delete_(t, !0)) != null ? r : !0 : !1;
  },
  defineProperty: function(n, t, r) {
    var i;
    return process.env.NODE_ENV !== "production" && iu("define property on an observable object. Use 'defineProperty' from 'mobx' instead."), (i = Si(n).defineProperty_(t, r)) != null ? i : !0;
  },
  ownKeys: function(n) {
    return process.env.NODE_ENV !== "production" && ee.trackingDerivation && iu("iterate keys to detect added / removed properties. Use 'keys' from 'mobx' instead."), Si(n).ownKeys_();
  },
  preventExtensions: function(n) {
    te(13);
  }
};
function o$(e, n) {
  var t, r;
  return mP(), e = Va(e, n), (r = (t = e[me]).proxy_) != null ? r : t.proxy_ = new Proxy(e, i$);
}
function vt(e) {
  return e.interceptors_ !== void 0 && e.interceptors_.length > 0;
}
function ku(e, n) {
  var t = e.interceptors_ || (e.interceptors_ = []);
  return t.push(n), $y(function() {
    var r = t.indexOf(n);
    r !== -1 && t.splice(r, 1);
  });
}
function St(e, n) {
  var t = La();
  try {
    for (var r = [].concat(e.interceptors_ || []), i = 0, o = r.length; i < o && (n = r[i](n), n && !n.type && te(14), !!n); i++)
      ;
    return n;
  } finally {
    Gr(t);
  }
}
function Yt(e) {
  return e.changeListeners_ !== void 0 && e.changeListeners_.length > 0;
}
function Wu(e, n) {
  var t = e.changeListeners_ || (e.changeListeners_ = []);
  return t.push(n), $y(function() {
    var r = t.indexOf(n);
    r !== -1 && t.splice(r, 1);
  });
}
function Xt(e, n) {
  var t = La(), r = e.changeListeners_;
  if (r) {
    r = r.slice();
    for (var i = 0, o = r.length; i < o; i++)
      r[i](n);
    Gr(t);
  }
}
function a$(e, n, t) {
  return gi(function() {
    var r, i = Va(e, t)[me];
    process.env.NODE_ENV !== "production" && n && e[Jn] && te("makeObservable second arg must be nullish when using decorators. Mixing @decorator syntax with annotations is not supported."), (r = n) != null || (n = bR(e)), _s(n).forEach(function(o) {
      return i.make_(o, n[o]);
    });
  }), e;
}
var Tl = /* @__PURE__ */ Symbol("mobx-keys");
function s$(e, n, t) {
  return process.env.NODE_ENV !== "production" && (!et(e) && !et(Object.getPrototypeOf(e)) && te("'makeAutoObservable' can only be used for classes that don't have a superclass"), Qe(e) && te("makeAutoObservable can only be used on objects not already made observable")), et(e) ? Dy(e, e, n, t) : (gi(function() {
    var r = Va(e, t)[me];
    if (!e[Tl]) {
      var i = Object.getPrototypeOf(e), o = new Set([].concat(_s(e), _s(i)));
      o.delete("constructor"), o.delete(me), qu(i, Tl, o);
    }
    e[Tl].forEach(function(a) {
      return r.make_(
        a,
        // must pass "undefined" for { key: undefined }
        n && a in n ? n[a] : !0
      );
    });
  }), e);
}
var rT = "splice", zt = "update", u$ = 1e4, c$ = {
  get: function(n, t) {
    var r = n[me];
    return t === me ? r : t === "length" ? r.getArrayLength_() : typeof t == "string" && !isNaN(t) ? r.get_(parseInt(t)) : dt(Kf, t) ? Kf[t] : n[t];
  },
  set: function(n, t, r) {
    var i = n[me];
    return t === "length" && i.setArrayLength_(r), typeof t == "symbol" || isNaN(t) ? n[t] = r : i.set_(parseInt(t), r), !0;
  },
  preventExtensions: function() {
    te(15);
  }
}, Ly = /* @__PURE__ */ function() {
  function e(t, r, i, o) {
    t === void 0 && (t = process.env.NODE_ENV !== "production" ? "ObservableArray@" + _t() : "ObservableArray"), this.owned_ = void 0, this.legacyMode_ = void 0, this.atom_ = void 0, this.values_ = [], this.interceptors_ = void 0, this.changeListeners_ = void 0, this.enhancer_ = void 0, this.dehancer = void 0, this.proxy_ = void 0, this.lastKnownLength_ = 0, this.owned_ = i, this.legacyMode_ = o, this.atom_ = new mi(t), this.enhancer_ = function(a, s) {
      return r(a, s, process.env.NODE_ENV !== "production" ? t + "[..]" : "ObservableArray[..]");
    };
  }
  var n = e.prototype;
  return n.dehanceValue_ = function(r) {
    return this.dehancer !== void 0 ? this.dehancer(r) : r;
  }, n.dehanceValues_ = function(r) {
    return this.dehancer !== void 0 && r.length > 0 ? r.map(this.dehancer) : r;
  }, n.intercept_ = function(r) {
    return ku(this, r);
  }, n.observe_ = function(r, i) {
    return i === void 0 && (i = !1), i && r({
      observableKind: "array",
      object: this.proxy_,
      debugObjectName: this.atom_.name_,
      type: "splice",
      index: 0,
      added: this.values_.slice(),
      addedCount: this.values_.length,
      removed: [],
      removedCount: 0
    }), Wu(this, r);
  }, n.getArrayLength_ = function() {
    return this.atom_.reportObserved(), this.values_.length;
  }, n.setArrayLength_ = function(r) {
    (typeof r != "number" || isNaN(r) || r < 0) && te("Out of range: " + r);
    var i = this.values_.length;
    if (r !== i)
      if (r > i) {
        for (var o = new Array(r - i), a = 0; a < r - i; a++)
          o[a] = void 0;
        this.spliceWithArray_(i, 0, o);
      } else
        this.spliceWithArray_(r, i - r);
  }, n.updateArrayLength_ = function(r, i) {
    r !== this.lastKnownLength_ && te(16), this.lastKnownLength_ += i, this.legacyMode_ && i > 0 && dA(r + i + 1);
  }, n.spliceWithArray_ = function(r, i, o) {
    var a = this;
    mr(this.atom_);
    var s = this.values_.length;
    if (r === void 0 ? r = 0 : r > s ? r = s : r < 0 && (r = Math.max(0, s + r)), arguments.length === 1 ? i = s - r : i == null ? i = 0 : i = Math.max(0, Math.min(i, s - r)), o === void 0 && (o = Ff), vt(this)) {
      var c = St(this, {
        object: this.proxy_,
        type: rT,
        index: r,
        removedCount: i,
        added: o
      });
      if (!c)
        return Ff;
      i = c.removedCount, o = c.added;
    }
    if (o = o.length === 0 ? o : o.map(function(d) {
      return a.enhancer_(d, void 0);
    }), this.legacyMode_ || process.env.NODE_ENV !== "production") {
      var u = o.length - i;
      this.updateArrayLength_(s, u);
    }
    var f = this.spliceItemsIntoValues_(r, i, o);
    return (i !== 0 || o.length !== 0) && this.notifyArraySplice_(r, o, f), this.dehanceValues_(f);
  }, n.spliceItemsIntoValues_ = function(r, i, o) {
    if (o.length < u$) {
      var a;
      return (a = this.values_).splice.apply(a, [r, i].concat(o));
    } else {
      var s = this.values_.slice(r, r + i), c = this.values_.slice(r + i);
      this.values_.length += o.length - i;
      for (var u = 0; u < o.length; u++)
        this.values_[r + u] = o[u];
      for (var f = 0; f < c.length; f++)
        this.values_[r + o.length + f] = c[f];
      return s;
    }
  }, n.notifyArrayChildUpdate_ = function(r, i, o) {
    var a = !this.owned_ && Rn(), s = Yt(this), c = s || a ? {
      observableKind: "array",
      object: this.proxy_,
      type: zt,
      debugObjectName: this.atom_.name_,
      index: r,
      newValue: i,
      oldValue: o
    } : null;
    process.env.NODE_ENV !== "production" && a && ft(c), this.atom_.reportChanged(), s && Xt(this, c), process.env.NODE_ENV !== "production" && a && pt();
  }, n.notifyArraySplice_ = function(r, i, o) {
    var a = !this.owned_ && Rn(), s = Yt(this), c = s || a ? {
      observableKind: "array",
      object: this.proxy_,
      debugObjectName: this.atom_.name_,
      type: rT,
      index: r,
      removed: o,
      added: i,
      removedCount: o.length,
      addedCount: i.length
    } : null;
    process.env.NODE_ENV !== "production" && a && ft(c), this.atom_.reportChanged(), s && Xt(this, c), process.env.NODE_ENV !== "production" && a && pt();
  }, n.get_ = function(r) {
    if (this.legacyMode_ && r >= this.values_.length) {
      console.warn(process.env.NODE_ENV !== "production" ? "[mobx.array] Attempt to read an array index (" + r + ") that is out of bounds (" + this.values_.length + "). Please check length first. Out of bound indices will not be tracked by MobX" : "[mobx] Out of bounds read: " + r);
      return;
    }
    return this.atom_.reportObserved(), this.dehanceValue_(this.values_[r]);
  }, n.set_ = function(r, i) {
    var o = this.values_;
    if (this.legacyMode_ && r > o.length && te(17, r, o.length), r < o.length) {
      mr(this.atom_);
      var a = o[r];
      if (vt(this)) {
        var s = St(this, {
          type: zt,
          object: this.proxy_,
          // since "this" is the real array we need to pass its proxy
          index: r,
          newValue: i
        });
        if (!s)
          return;
        i = s.newValue;
      }
      i = this.enhancer_(i, a);
      var c = i !== a;
      c && (o[r] = i, this.notifyArrayChildUpdate_(r, i, a));
    } else {
      for (var u = new Array(r + 1 - o.length), f = 0; f < u.length - 1; f++)
        u[f] = void 0;
      u[u.length - 1] = i, this.spliceWithArray_(o.length, 0, u);
    }
  }, e;
}();
function d$(e, n, t, r) {
  return t === void 0 && (t = process.env.NODE_ENV !== "production" ? "ObservableArray@" + _t() : "ObservableArray"), r === void 0 && (r = !1), mP(), gi(function() {
    var i = new Ly(t, n, r, !1);
    TP(i.values_, me, i);
    var o = new Proxy(i.values_, c$);
    return i.proxy_ = o, e && e.length && i.spliceWithArray_(0, 0, e), o;
  });
}
var Kf = {
  clear: function() {
    return this.splice(0);
  },
  replace: function(n) {
    var t = this[me];
    return t.spliceWithArray_(0, t.values_.length, n);
  },
  // Used by JSON.stringify
  toJSON: function() {
    return this.slice();
  },
  /*
   * functions that do alter the internal structure of the array, (based on lib.es6.d.ts)
   * since these functions alter the inner structure of the array, the have side effects.
   * Because the have side effects, they should not be used in computed function,
   * and for that reason the do not call dependencyState.notifyObserved
   */
  splice: function(n, t) {
    for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), o = 2; o < r; o++)
      i[o - 2] = arguments[o];
    var a = this[me];
    switch (arguments.length) {
      case 0:
        return [];
      case 1:
        return a.spliceWithArray_(n);
      case 2:
        return a.spliceWithArray_(n, t);
    }
    return a.spliceWithArray_(n, t, i);
  },
  spliceWithArray: function(n, t, r) {
    return this[me].spliceWithArray_(n, t, r);
  },
  push: function() {
    for (var n = this[me], t = arguments.length, r = new Array(t), i = 0; i < t; i++)
      r[i] = arguments[i];
    return n.spliceWithArray_(n.values_.length, 0, r), n.values_.length;
  },
  pop: function() {
    return this.splice(Math.max(this[me].values_.length - 1, 0), 1)[0];
  },
  shift: function() {
    return this.splice(0, 1)[0];
  },
  unshift: function() {
    for (var n = this[me], t = arguments.length, r = new Array(t), i = 0; i < t; i++)
      r[i] = arguments[i];
    return n.spliceWithArray_(0, 0, r), n.values_.length;
  },
  reverse: function() {
    return ee.trackingDerivation && te(37, "reverse"), this.replace(this.slice().reverse()), this;
  },
  sort: function() {
    ee.trackingDerivation && te(37, "sort");
    var n = this.slice();
    return n.sort.apply(n, arguments), this.replace(n), this;
  },
  remove: function(n) {
    var t = this[me], r = t.dehanceValues_(t.values_).indexOf(n);
    return r > -1 ? (this.splice(r, 1), !0) : !1;
  }
};
ze("at", bt);
ze("concat", bt);
ze("flat", bt);
ze("includes", bt);
ze("indexOf", bt);
ze("join", bt);
ze("lastIndexOf", bt);
ze("slice", bt);
ze("toString", bt);
ze("toLocaleString", bt);
ze("toSorted", bt);
ze("toSpliced", bt);
ze("with", bt);
ze("every", ur);
ze("filter", ur);
ze("find", ur);
ze("findIndex", ur);
ze("findLast", ur);
ze("findLastIndex", ur);
ze("flatMap", ur);
ze("forEach", ur);
ze("map", ur);
ze("some", ur);
ze("toReversed", ur);
ze("reduce", sA);
ze("reduceRight", sA);
function ze(e, n) {
  typeof Array.prototype[e] == "function" && (Kf[e] = n(e));
}
function bt(e) {
  return function() {
    var n = this[me];
    n.atom_.reportObserved();
    var t = n.dehanceValues_(n.values_);
    return t[e].apply(t, arguments);
  };
}
function ur(e) {
  return function(n, t) {
    var r = this, i = this[me];
    i.atom_.reportObserved();
    var o = i.dehanceValues_(i.values_);
    return o[e](function(a, s) {
      return n.call(t, a, s, r);
    });
  };
}
function sA(e) {
  return function() {
    var n = this, t = this[me];
    t.atom_.reportObserved();
    var r = t.dehanceValues_(t.values_), i = arguments[0];
    return arguments[0] = function(o, a, s) {
      return i(o, a, s, n);
    }, r[e].apply(r, arguments);
  };
}
var f$ = /* @__PURE__ */ yi("ObservableArrayAdministration", Ly);
function wn(e) {
  return ap(e) && f$(e[me]);
}
var p$ = {}, si = "add", Gf = "delete", Vy = /* @__PURE__ */ function() {
  function e(t, r, i) {
    var o = this;
    r === void 0 && (r = Ea), i === void 0 && (i = process.env.NODE_ENV !== "production" ? "ObservableMap@" + _t() : "ObservableMap"), this.enhancer_ = void 0, this.name_ = void 0, this[me] = p$, this.data_ = void 0, this.hasMap_ = void 0, this.keysAtom_ = void 0, this.interceptors_ = void 0, this.changeListeners_ = void 0, this.dehancer = void 0, this.enhancer_ = r, this.name_ = i, tn(Map) || te(18), gi(function() {
      o.keysAtom_ = Qr(process.env.NODE_ENV !== "production" ? o.name_ + ".keys()" : "ObservableMap.keys()"), o.data_ = /* @__PURE__ */ new Map(), o.hasMap_ = /* @__PURE__ */ new Map(), t && o.merge(t);
    });
  }
  var n = e.prototype;
  return n.has_ = function(r) {
    return this.data_.has(r);
  }, n.has = function(r) {
    var i = this;
    if (!ee.trackingDerivation)
      return this.has_(r);
    var o = this.hasMap_.get(r);
    if (!o) {
      var a = o = new ui(this.has_(r), up, process.env.NODE_ENV !== "production" ? this.name_ + "." + zl(r) + "?" : "ObservableMap.key?", !1);
      this.hasMap_.set(r, a), Ny(a, function() {
        return i.hasMap_.delete(r);
      });
    }
    return o.get();
  }, n.set = function(r, i) {
    var o = this.has_(r);
    if (vt(this)) {
      var a = St(this, {
        type: o ? zt : si,
        object: this,
        newValue: i,
        name: r
      });
      if (!a)
        return this;
      i = a.newValue;
    }
    return o ? this.updateValue_(r, i) : this.addValue_(r, i), this;
  }, n.delete = function(r) {
    var i = this;
    if (mr(this.keysAtom_), vt(this)) {
      var o = St(this, {
        type: Gf,
        object: this,
        name: r
      });
      if (!o)
        return !1;
    }
    if (this.has_(r)) {
      var a = Rn(), s = Yt(this), c = s || a ? {
        observableKind: "map",
        debugObjectName: this.name_,
        type: Gf,
        object: this,
        oldValue: this.data_.get(r).value_,
        name: r
      } : null;
      return process.env.NODE_ENV !== "production" && a && ft(c), Wt(function() {
        var u;
        i.keysAtom_.reportChanged(), (u = i.hasMap_.get(r)) == null || u.setNewValue_(!1);
        var f = i.data_.get(r);
        f.setNewValue_(void 0), i.data_.delete(r);
      }), s && Xt(this, c), process.env.NODE_ENV !== "production" && a && pt(), !0;
    }
    return !1;
  }, n.updateValue_ = function(r, i) {
    var o = this.data_.get(r);
    if (i = o.prepareNewValue_(i), i !== ee.UNCHANGED) {
      var a = Rn(), s = Yt(this), c = s || a ? {
        observableKind: "map",
        debugObjectName: this.name_,
        type: zt,
        object: this,
        oldValue: o.value_,
        name: r,
        newValue: i
      } : null;
      process.env.NODE_ENV !== "production" && a && ft(c), o.setNewValue_(i), s && Xt(this, c), process.env.NODE_ENV !== "production" && a && pt();
    }
  }, n.addValue_ = function(r, i) {
    var o = this;
    mr(this.keysAtom_), Wt(function() {
      var u, f = new ui(i, o.enhancer_, process.env.NODE_ENV !== "production" ? o.name_ + "." + zl(r) : "ObservableMap.key", !1);
      o.data_.set(r, f), i = f.value_, (u = o.hasMap_.get(r)) == null || u.setNewValue_(!0), o.keysAtom_.reportChanged();
    });
    var a = Rn(), s = Yt(this), c = s || a ? {
      observableKind: "map",
      debugObjectName: this.name_,
      type: si,
      object: this,
      name: r,
      newValue: i
    } : null;
    process.env.NODE_ENV !== "production" && a && ft(c), s && Xt(this, c), process.env.NODE_ENV !== "production" && a && pt();
  }, n.get = function(r) {
    return this.has(r) ? this.dehanceValue_(this.data_.get(r).get()) : this.dehanceValue_(void 0);
  }, n.dehanceValue_ = function(r) {
    return this.dehancer !== void 0 ? this.dehancer(r) : r;
  }, n.keys = function() {
    return this.keysAtom_.reportObserved(), this.data_.keys();
  }, n.values = function() {
    var r = this, i = this.keys();
    return iT({
      next: function() {
        var a = i.next(), s = a.done, c = a.value;
        return {
          done: s,
          value: s ? void 0 : r.get(c)
        };
      }
    });
  }, n.entries = function() {
    var r = this, i = this.keys();
    return iT({
      next: function() {
        var a = i.next(), s = a.done, c = a.value;
        return {
          done: s,
          value: s ? void 0 : [c, r.get(c)]
        };
      }
    });
  }, n[Symbol.iterator] = function() {
    return this.entries();
  }, n.forEach = function(r, i) {
    for (var o = ps(this), a; !(a = o()).done; ) {
      var s = a.value, c = s[0], u = s[1];
      r.call(i, u, c, this);
    }
  }, n.merge = function(r) {
    var i = this;
    return ln(r) && (r = new Map(r)), Wt(function() {
      et(r) ? pR(r).forEach(function(o) {
        return i.set(o, r[o]);
      }) : Array.isArray(r) ? r.forEach(function(o) {
        var a = o[0], s = o[1];
        return i.set(a, s);
      }) : Bs(r) ? (fR(r) || te(19, r), r.forEach(function(o, a) {
        return i.set(a, o);
      })) : r != null && te(20, r);
    }), this;
  }, n.clear = function() {
    var r = this;
    Wt(function() {
      pp(function() {
        for (var i = ps(r.keys()), o; !(o = i()).done; ) {
          var a = o.value;
          r.delete(a);
        }
      });
    });
  }, n.replace = function(r) {
    var i = this;
    return Wt(function() {
      for (var o = l$(r), a = /* @__PURE__ */ new Map(), s = !1, c = ps(i.data_.keys()), u; !(u = c()).done; ) {
        var f = u.value;
        if (!o.has(f)) {
          var d = i.delete(f);
          if (d)
            s = !0;
          else {
            var p = i.data_.get(f);
            a.set(f, p);
          }
        }
      }
      for (var T = ps(o.entries()), b; !(b = T()).done; ) {
        var O = b.value, F = O[0], E = O[1], M = i.data_.has(F);
        if (i.set(F, E), i.data_.has(F)) {
          var N = i.data_.get(F);
          a.set(F, N), M || (s = !0);
        }
      }
      if (!s)
        if (i.data_.size !== a.size)
          i.keysAtom_.reportChanged();
        else
          for (var w = i.data_.keys(), _ = a.keys(), B = w.next(), m = _.next(); !B.done; ) {
            if (B.value !== m.value) {
              i.keysAtom_.reportChanged();
              break;
            }
            B = w.next(), m = _.next();
          }
      i.data_ = a;
    }), this;
  }, n.toString = function() {
    return "[object ObservableMap]";
  }, n.toJSON = function() {
    return Array.from(this);
  }, n.observe_ = function(r, i) {
    return process.env.NODE_ENV !== "production" && i === !0 && te("`observe` doesn't support fireImmediately=true in combination with maps."), Wu(this, r);
  }, n.intercept_ = function(r) {
    return ku(this, r);
  }, js(e, [{
    key: "size",
    get: function() {
      return this.keysAtom_.reportObserved(), this.data_.size;
    }
  }, {
    key: Symbol.toStringTag,
    get: function() {
      return "Map";
    }
  }]);
}(), ln = /* @__PURE__ */ yi("ObservableMap", Vy);
function iT(e) {
  return e[Symbol.toStringTag] = "MapIterator", Hy(e);
}
function l$(e) {
  if (Bs(e) || ln(e))
    return e;
  if (Array.isArray(e))
    return new Map(e);
  if (et(e)) {
    var n = /* @__PURE__ */ new Map();
    for (var t in e)
      n.set(t, e[t]);
    return n;
  } else
    return te(21, e);
}
var y$ = {}, qy = /* @__PURE__ */ function() {
  function e(t, r, i) {
    var o = this;
    r === void 0 && (r = Ea), i === void 0 && (i = process.env.NODE_ENV !== "production" ? "ObservableSet@" + _t() : "ObservableSet"), this.name_ = void 0, this[me] = y$, this.data_ = /* @__PURE__ */ new Set(), this.atom_ = void 0, this.changeListeners_ = void 0, this.interceptors_ = void 0, this.dehancer = void 0, this.enhancer_ = void 0, this.name_ = i, tn(Set) || te(22), this.enhancer_ = function(a, s) {
      return r(a, s, i);
    }, gi(function() {
      o.atom_ = Qr(o.name_), t && o.replace(t);
    });
  }
  var n = e.prototype;
  return n.dehanceValue_ = function(r) {
    return this.dehancer !== void 0 ? this.dehancer(r) : r;
  }, n.clear = function() {
    var r = this;
    Wt(function() {
      pp(function() {
        for (var i = ps(r.data_.values()), o; !(o = i()).done; ) {
          var a = o.value;
          r.delete(a);
        }
      });
    });
  }, n.forEach = function(r, i) {
    for (var o = ps(this), a; !(a = o()).done; ) {
      var s = a.value;
      r.call(i, s, s, this);
    }
  }, n.add = function(r) {
    var i = this;
    if (mr(this.atom_), vt(this)) {
      var o = St(this, {
        type: si,
        object: this,
        newValue: r
      });
      if (!o)
        return this;
      r = o.newValue;
    }
    if (!this.has(r)) {
      Wt(function() {
        i.data_.add(i.enhancer_(r, void 0)), i.atom_.reportChanged();
      });
      var a = process.env.NODE_ENV !== "production" && Rn(), s = Yt(this), c = s || a ? {
        observableKind: "set",
        debugObjectName: this.name_,
        type: si,
        object: this,
        newValue: r
      } : null;
      a && process.env.NODE_ENV !== "production" && ft(c), s && Xt(this, c), a && process.env.NODE_ENV !== "production" && pt();
    }
    return this;
  }, n.delete = function(r) {
    var i = this;
    if (vt(this)) {
      var o = St(this, {
        type: Gf,
        object: this,
        oldValue: r
      });
      if (!o)
        return !1;
    }
    if (this.has(r)) {
      var a = process.env.NODE_ENV !== "production" && Rn(), s = Yt(this), c = s || a ? {
        observableKind: "set",
        debugObjectName: this.name_,
        type: Gf,
        object: this,
        oldValue: r
      } : null;
      return a && process.env.NODE_ENV !== "production" && ft(c), Wt(function() {
        i.atom_.reportChanged(), i.data_.delete(r);
      }), s && Xt(this, c), a && process.env.NODE_ENV !== "production" && pt(), !0;
    }
    return !1;
  }, n.has = function(r) {
    return this.atom_.reportObserved(), this.data_.has(this.dehanceValue_(r));
  }, n.entries = function() {
    var r = this.values();
    return oT({
      next: function() {
        var o = r.next(), a = o.value, s = o.done;
        return s ? {
          value: void 0,
          done: s
        } : {
          value: [a, a],
          done: s
        };
      }
    });
  }, n.keys = function() {
    return this.values();
  }, n.values = function() {
    this.atom_.reportObserved();
    var r = this, i = this.data_.values();
    return oT({
      next: function() {
        var a = i.next(), s = a.value, c = a.done;
        return c ? {
          value: void 0,
          done: c
        } : {
          value: r.dehanceValue_(s),
          done: c
        };
      }
    });
  }, n.intersection = function(r) {
    if (Vr(r) && !un(r))
      return r.intersection(this);
    var i = new Set(this);
    return i.intersection(r);
  }, n.union = function(r) {
    if (Vr(r) && !un(r))
      return r.union(this);
    var i = new Set(this);
    return i.union(r);
  }, n.difference = function(r) {
    return new Set(this).difference(r);
  }, n.symmetricDifference = function(r) {
    if (Vr(r) && !un(r))
      return r.symmetricDifference(this);
    var i = new Set(this);
    return i.symmetricDifference(r);
  }, n.isSubsetOf = function(r) {
    return new Set(this).isSubsetOf(r);
  }, n.isSupersetOf = function(r) {
    return new Set(this).isSupersetOf(r);
  }, n.isDisjointFrom = function(r) {
    if (Vr(r) && !un(r))
      return r.isDisjointFrom(this);
    var i = new Set(this);
    return i.isDisjointFrom(r);
  }, n.replace = function(r) {
    var i = this;
    return un(r) && (r = new Set(r)), Wt(function() {
      Array.isArray(r) ? (i.clear(), r.forEach(function(o) {
        return i.add(o);
      })) : Vr(r) ? (i.clear(), r.forEach(function(o) {
        return i.add(o);
      })) : r != null && te("Cannot initialize set from " + r);
    }), this;
  }, n.observe_ = function(r, i) {
    return process.env.NODE_ENV !== "production" && i === !0 && te("`observe` doesn't support fireImmediately=true in combination with sets."), Wu(this, r);
  }, n.intercept_ = function(r) {
    return ku(this, r);
  }, n.toJSON = function() {
    return Array.from(this);
  }, n.toString = function() {
    return "[object ObservableSet]";
  }, n[Symbol.iterator] = function() {
    return this.values();
  }, js(e, [{
    key: "size",
    get: function() {
      return this.atom_.reportObserved(), this.data_.size;
    }
  }, {
    key: Symbol.toStringTag,
    get: function() {
      return "Set";
    }
  }]);
}(), un = /* @__PURE__ */ yi("ObservableSet", qy);
function oT(e) {
  return e[Symbol.toStringTag] = "SetIterator", Hy(e);
}
var aT = /* @__PURE__ */ Object.create(null), sT = "remove", iy = /* @__PURE__ */ function() {
  function e(t, r, i, o) {
    r === void 0 && (r = /* @__PURE__ */ new Map()), o === void 0 && (o = WR), this.target_ = void 0, this.values_ = void 0, this.name_ = void 0, this.defaultAnnotation_ = void 0, this.keysAtom_ = void 0, this.changeListeners_ = void 0, this.interceptors_ = void 0, this.proxy_ = void 0, this.isPlainObject_ = void 0, this.appliedAnnotations_ = void 0, this.pendingKeys_ = void 0, this.target_ = t, this.values_ = r, this.name_ = i, this.defaultAnnotation_ = o, this.keysAtom_ = new mi(process.env.NODE_ENV !== "production" ? this.name_ + ".keys" : "ObservableObject.keys"), this.isPlainObject_ = et(this.target_), process.env.NODE_ENV !== "production" && !fA(this.defaultAnnotation_) && te("defaultAnnotation must be valid annotation"), process.env.NODE_ENV !== "production" && (this.appliedAnnotations_ = {});
  }
  var n = e.prototype;
  return n.getObservablePropValue_ = function(r) {
    return this.values_.get(r).get();
  }, n.setObservablePropValue_ = function(r, i) {
    var o = this.values_.get(r);
    if (o instanceof $t)
      return o.set(i), !0;
    if (vt(this)) {
      var a = St(this, {
        type: zt,
        object: this.proxy_ || this.target_,
        name: r,
        newValue: i
      });
      if (!a)
        return null;
      i = a.newValue;
    }
    if (i = o.prepareNewValue_(i), i !== ee.UNCHANGED) {
      var s = Yt(this), c = process.env.NODE_ENV !== "production" && Rn(), u = s || c ? {
        type: zt,
        observableKind: "object",
        debugObjectName: this.name_,
        object: this.proxy_ || this.target_,
        oldValue: o.value_,
        name: r,
        newValue: i
      } : null;
      process.env.NODE_ENV !== "production" && c && ft(u), o.setNewValue_(i), s && Xt(this, u), process.env.NODE_ENV !== "production" && c && pt();
    }
    return !0;
  }, n.get_ = function(r) {
    return ee.trackingDerivation && !dt(this.target_, r) && this.has_(r), this.target_[r];
  }, n.set_ = function(r, i, o) {
    return o === void 0 && (o = !1), dt(this.target_, r) ? this.values_.has(r) ? this.setObservablePropValue_(r, i) : o ? Reflect.set(this.target_, r, i) : (this.target_[r] = i, !0) : this.extend_(r, {
      value: i,
      enumerable: !0,
      writable: !0,
      configurable: !0
    }, this.defaultAnnotation_, o);
  }, n.has_ = function(r) {
    if (!ee.trackingDerivation)
      return r in this.target_;
    this.pendingKeys_ || (this.pendingKeys_ = /* @__PURE__ */ new Map());
    var i = this.pendingKeys_.get(r);
    return i || (i = new ui(r in this.target_, up, process.env.NODE_ENV !== "production" ? this.name_ + "." + zl(r) + "?" : "ObservableObject.key?", !1), this.pendingKeys_.set(r, i)), i.get();
  }, n.make_ = function(r, i) {
    if (i === !0 && (i = this.defaultAnnotation_), i !== !1) {
      if (dT(this, i, r), !(r in this.target_)) {
        var o;
        if ((o = this.target_[Jn]) != null && o[r])
          return;
        te(1, i.annotationType_, this.name_ + "." + r.toString());
      }
      for (var a = this.target_; a && a !== Vu; ) {
        var s = xf(a, r);
        if (s) {
          var c = i.make_(this, r, s, a);
          if (c === 0)
            return;
          if (c === 1)
            break;
        }
        a = Object.getPrototypeOf(a);
      }
      cT(this, i, r);
    }
  }, n.extend_ = function(r, i, o, a) {
    if (a === void 0 && (a = !1), o === !0 && (o = this.defaultAnnotation_), o === !1)
      return this.defineProperty_(r, i, a);
    dT(this, o, r);
    var s = o.extend_(this, r, i, a);
    return s && cT(this, o, r), s;
  }, n.defineProperty_ = function(r, i, o) {
    o === void 0 && (o = !1), mr(this.keysAtom_);
    try {
      Yn();
      var a = this.delete_(r);
      if (!a)
        return a;
      if (vt(this)) {
        var s = St(this, {
          object: this.proxy_ || this.target_,
          name: r,
          type: si,
          newValue: i.value
        });
        if (!s)
          return null;
        var c = s.newValue;
        i.value !== c && (i = hr({}, i, {
          value: c
        }));
      }
      if (o) {
        if (!Reflect.defineProperty(this.target_, r, i))
          return !1;
      } else
        Tr(this.target_, r, i);
      this.notifyPropertyAddition_(r, i.value);
    } finally {
      Xn();
    }
    return !0;
  }, n.defineObservableProperty_ = function(r, i, o, a) {
    a === void 0 && (a = !1), mr(this.keysAtom_);
    try {
      Yn();
      var s = this.delete_(r);
      if (!s)
        return s;
      if (vt(this)) {
        var c = St(this, {
          object: this.proxy_ || this.target_,
          name: r,
          type: si,
          newValue: i
        });
        if (!c)
          return null;
        i = c.newValue;
      }
      var u = uT(r), f = {
        configurable: ee.safeDescriptors ? this.isPlainObject_ : !0,
        enumerable: !0,
        get: u.get,
        set: u.set
      };
      if (a) {
        if (!Reflect.defineProperty(this.target_, r, f))
          return !1;
      } else
        Tr(this.target_, r, f);
      var d = new ui(i, o, process.env.NODE_ENV !== "production" ? this.name_ + "." + r.toString() : "ObservableObject.key", !1);
      this.values_.set(r, d), this.notifyPropertyAddition_(r, d.value_);
    } finally {
      Xn();
    }
    return !0;
  }, n.defineComputedProperty_ = function(r, i, o) {
    o === void 0 && (o = !1), mr(this.keysAtom_);
    try {
      Yn();
      var a = this.delete_(r);
      if (!a)
        return a;
      if (vt(this)) {
        var s = St(this, {
          object: this.proxy_ || this.target_,
          name: r,
          type: si,
          newValue: void 0
        });
        if (!s)
          return null;
      }
      i.name || (i.name = process.env.NODE_ENV !== "production" ? this.name_ + "." + r.toString() : "ObservableObject.key"), i.context = this.proxy_ || this.target_;
      var c = uT(r), u = {
        configurable: ee.safeDescriptors ? this.isPlainObject_ : !0,
        enumerable: !1,
        get: c.get,
        set: c.set
      };
      if (o) {
        if (!Reflect.defineProperty(this.target_, r, u))
          return !1;
      } else
        Tr(this.target_, r, u);
      this.values_.set(r, new $t(i)), this.notifyPropertyAddition_(r, void 0);
    } finally {
      Xn();
    }
    return !0;
  }, n.delete_ = function(r, i) {
    if (i === void 0 && (i = !1), mr(this.keysAtom_), !dt(this.target_, r))
      return !0;
    if (vt(this)) {
      var o = St(this, {
        object: this.proxy_ || this.target_,
        name: r,
        type: sT
      });
      if (!o)
        return null;
    }
    try {
      var a;
      Yn();
      var s = Yt(this), c = process.env.NODE_ENV !== "production" && Rn(), u = this.values_.get(r), f = void 0;
      if (!u && (s || c)) {
        var d;
        f = (d = xf(this.target_, r)) == null ? void 0 : d.value;
      }
      if (i) {
        if (!Reflect.deleteProperty(this.target_, r))
          return !1;
      } else
        delete this.target_[r];
      if (process.env.NODE_ENV !== "production" && delete this.appliedAnnotations_[r], u && (this.values_.delete(r), u instanceof ui && (f = u.value_), UP(u)), this.keysAtom_.reportChanged(), (a = this.pendingKeys_) == null || (a = a.get(r)) == null || a.set(r in this.target_), s || c) {
        var p = {
          type: sT,
          observableKind: "object",
          object: this.proxy_ || this.target_,
          debugObjectName: this.name_,
          oldValue: f,
          name: r
        };
        process.env.NODE_ENV !== "production" && c && ft(p), s && Xt(this, p), process.env.NODE_ENV !== "production" && c && pt();
      }
    } finally {
      Xn();
    }
    return !0;
  }, n.observe_ = function(r, i) {
    return process.env.NODE_ENV !== "production" && i === !0 && te("`observe` doesn't support the fire immediately property for observable objects."), Wu(this, r);
  }, n.intercept_ = function(r) {
    return ku(this, r);
  }, n.notifyPropertyAddition_ = function(r, i) {
    var o, a = Yt(this), s = process.env.NODE_ENV !== "production" && Rn();
    if (a || s) {
      var c = a || s ? {
        type: si,
        observableKind: "object",
        debugObjectName: this.name_,
        object: this.proxy_ || this.target_,
        name: r,
        newValue: i
      } : null;
      process.env.NODE_ENV !== "production" && s && ft(c), a && Xt(this, c), process.env.NODE_ENV !== "production" && s && pt();
    }
    (o = this.pendingKeys_) == null || (o = o.get(r)) == null || o.set(!0), this.keysAtom_.reportChanged();
  }, n.ownKeys_ = function() {
    return this.keysAtom_.reportObserved(), _s(this.target_);
  }, n.keys_ = function() {
    return this.keysAtom_.reportObserved(), Object.keys(this.target_);
  }, e;
}();
function Va(e, n) {
  var t;
  if (process.env.NODE_ENV !== "production" && n && Qe(e) && te("Options can't be provided for already observable objects."), dt(e, me))
    return process.env.NODE_ENV !== "production" && !(Or(e) instanceof iy) && te("Cannot convert '" + vu(e) + `' into observable object:
The target is already observable of different type.
Extending builtins is not supported.`), e;
  process.env.NODE_ENV !== "production" && !Object.isExtensible(e) && te("Cannot make the designated object observable; it is not extensible");
  var r = (t = n == null ? void 0 : n.name) != null ? t : process.env.NODE_ENV !== "production" ? (et(e) ? "ObservableObject" : e.constructor.name) + "@" + _t() : "ObservableObject", i = new iy(e, /* @__PURE__ */ new Map(), String(r), iE(n));
  return qu(e, me, i), e;
}
var m$ = /* @__PURE__ */ yi("ObservableObjectAdministration", iy);
function uT(e) {
  return aT[e] || (aT[e] = {
    get: function() {
      return this[me].getObservablePropValue_(e);
    },
    set: function(t) {
      return this[me].setObservablePropValue_(e, t);
    }
  });
}
function Qe(e) {
  return ap(e) ? m$(e[me]) : !1;
}
function cT(e, n, t) {
  var r;
  process.env.NODE_ENV !== "production" && (e.appliedAnnotations_[t] = n), (r = e.target_[Jn]) == null || delete r[t];
}
function dT(e, n, t) {
  if (process.env.NODE_ENV !== "production" && !fA(n) && te("Cannot annotate '" + e.name_ + "." + t.toString() + "': Invalid annotation."), process.env.NODE_ENV !== "production" && !Nf(n) && dt(e.appliedAnnotations_, t)) {
    var r = e.name_ + "." + t.toString(), i = e.appliedAnnotations_[t].annotationType_, o = n.annotationType_;
    te("Cannot apply '" + o + "' to '" + r + "':" + (`
The field is already annotated with '` + i + "'.") + `
Re-annotating fields is not allowed.
Use 'override' annotation for methods overridden by subclass.`);
  }
}
var g$ = /* @__PURE__ */ cA(0), T$ = /* @__PURE__ */ function() {
  var e = !1, n = {};
  return Object.defineProperty(n, "0", {
    set: function() {
      e = !0;
    }
  }), Object.create(n)[0] = 1, e === !1;
}(), _l = 0, uA = function() {
};
function _$(e, n) {
  Object.setPrototypeOf ? Object.setPrototypeOf(e.prototype, n) : e.prototype.__proto__ !== void 0 ? e.prototype.__proto__ = n : e.prototype = n;
}
_$(uA, Array.prototype);
var Ky = /* @__PURE__ */ function(e) {
  function n(r, i, o, a) {
    var s;
    return o === void 0 && (o = process.env.NODE_ENV !== "production" ? "ObservableArray@" + _t() : "ObservableArray"), a === void 0 && (a = !1), s = e.call(this) || this, gi(function() {
      var c = new Ly(o, i, a, !0);
      c.proxy_ = s, TP(s, me, c), r && r.length && s.spliceWithArray(0, 0, r), T$ && Object.defineProperty(s, "0", g$);
    }), s;
  }
  hP(n, e);
  var t = n.prototype;
  return t.concat = function() {
    this[me].atom_.reportObserved();
    for (var i = arguments.length, o = new Array(i), a = 0; a < i; a++)
      o[a] = arguments[a];
    return Array.prototype.concat.apply(
      this.slice(),
      //@ts-ignore
      o.map(function(s) {
        return wn(s) ? s.slice() : s;
      })
    );
  }, t[Symbol.iterator] = function() {
    var r = this, i = 0;
    return Hy({
      next: function() {
        return i < r.length ? {
          value: r[i++],
          done: !1
        } : {
          done: !0,
          value: void 0
        };
      }
    });
  }, js(n, [{
    key: "length",
    get: function() {
      return this[me].getArrayLength_();
    },
    set: function(i) {
      this[me].setArrayLength_(i);
    }
  }, {
    key: Symbol.toStringTag,
    get: function() {
      return "Array";
    }
  }]);
}(uA);
Object.entries(Kf).forEach(function(e) {
  var n = e[0], t = e[1];
  n !== "concat" && qu(Ky.prototype, n, t);
});
function cA(e) {
  return {
    enumerable: !1,
    configurable: !0,
    get: function() {
      return this[me].get_(e);
    },
    set: function(t) {
      this[me].set_(e, t);
    }
  };
}
function b$(e) {
  Tr(Ky.prototype, "" + e, cA(e));
}
function dA(e) {
  if (e > _l) {
    for (var n = _l; n < e + 100; n++)
      b$(n);
    _l = e;
  }
}
dA(1e3);
function h$(e, n, t) {
  return new Ky(e, n, t);
}
function er(e, n) {
  if (typeof e == "object" && e !== null) {
    if (wn(e))
      return n !== void 0 && te(23), e[me].atom_;
    if (un(e))
      return e.atom_;
    if (ln(e)) {
      if (n === void 0)
        return e.keysAtom_;
      var t = e.data_.get(n) || e.hasMap_.get(n);
      return t || te(25, n, vu(e)), t;
    }
    if (Qe(e)) {
      if (!n)
        return te(26);
      var r = e[me].values_.get(n);
      return r || te(27, n, vu(e)), r;
    }
    if (My(e) || $a(e) || Lf(e))
      return e;
  } else if (tn(e) && Lf(e[me]))
    return e[me];
  te(28);
}
function Or(e, n) {
  if (e || te(29), n !== void 0)
    return Or(er(e, n));
  if (My(e) || $a(e) || Lf(e) || ln(e) || un(e))
    return e;
  if (e[me])
    return e[me];
  te(24, e);
}
function vu(e, n) {
  var t;
  if (n !== void 0)
    t = er(e, n);
  else {
    if (Ca(e))
      return e.name;
    Qe(e) || ln(e) || un(e) ? t = Or(e) : t = er(e);
  }
  return t.name_;
}
function gi(e) {
  var n = La(), t = dp(!0);
  Yn();
  try {
    return e();
  } finally {
    Xn(), fp(t), Gr(n);
  }
}
var fT = Vu.toString;
function Gy(e, n, t) {
  return t === void 0 && (t = -1), oy(e, n, t);
}
function oy(e, n, t, r, i) {
  if (e === n)
    return e !== 0 || 1 / e === 1 / n;
  if (e == null || n == null)
    return !1;
  if (e !== e)
    return n !== n;
  var o = typeof e;
  if (o !== "function" && o !== "object" && typeof n != "object")
    return !1;
  var a = fT.call(e);
  if (a !== fT.call(n))
    return !1;
  switch (a) {
    // Strings, numbers, regular expressions, dates, and booleans are compared by value.
    case "[object RegExp]":
    // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
    case "[object String]":
      return "" + e == "" + n;
    case "[object Number]":
      return +e != +e ? +n != +n : +e == 0 ? 1 / +e === 1 / n : +e == +n;
    case "[object Date]":
    case "[object Boolean]":
      return +e == +n;
    case "[object Symbol]":
      return typeof Symbol < "u" && Symbol.valueOf.call(e) === Symbol.valueOf.call(n);
    case "[object Map]":
    case "[object Set]":
      t >= 0 && t++;
      break;
  }
  e = pT(e), n = pT(n);
  var s = a === "[object Array]";
  if (!s) {
    if (typeof e != "object" || typeof n != "object")
      return !1;
    var c = e.constructor, u = n.constructor;
    if (c !== u && !(tn(c) && c instanceof c && tn(u) && u instanceof u) && "constructor" in e && "constructor" in n)
      return !1;
  }
  if (t === 0)
    return !1;
  t < 0 && (t = -1), r = r || [], i = i || [];
  for (var f = r.length; f--; )
    if (r[f] === e)
      return i[f] === n;
  if (r.push(e), i.push(n), s) {
    if (f = e.length, f !== n.length)
      return !1;
    for (; f--; )
      if (!oy(e[f], n[f], t - 1, r, i))
        return !1;
  } else {
    var d = Object.keys(e), p = d.length;
    if (Object.keys(n).length !== p)
      return !1;
    for (var T = 0; T < p; T++) {
      var b = d[T];
      if (!(dt(n, b) && oy(e[b], n[b], t - 1, r, i)))
        return !1;
    }
  }
  return r.pop(), i.pop(), !0;
}
function pT(e) {
  return wn(e) ? e.slice() : Bs(e) || ln(e) || Vr(e) || un(e) ? Array.from(e.entries()) : e;
}
var lT, I$ = ((lT = op().Iterator) == null ? void 0 : lT.prototype) || {};
function Hy(e) {
  return e[Symbol.iterator] = O$, Object.assign(Object.create(I$), e);
}
function O$() {
  return this;
}
function fA(e) {
  return (
    // Can be function
    e instanceof Object && typeof e.annotationType_ == "string" && tn(e.make_) && tn(e.extend_)
  );
}
["Symbol", "Map", "Set"].forEach(function(e) {
  var n = op();
  typeof n[e] > "u" && te("MobX requires global '" + e + "' to be available or polyfilled");
});
typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ == "object" && __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({
  spy: KP,
  extras: {
    getDebugName: vu
  },
  $mobx: me
});
const P$ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  $mobx: me,
  FlowCancellationError: yp,
  ObservableMap: Vy,
  ObservableSet: qy,
  Reaction: Ir,
  _allowStateChanges: By,
  _allowStateChangesInsideComputed: ry,
  _allowStateReadsEnd: ys,
  _allowStateReadsStart: lp,
  _autoAction: bs,
  _endAction: CP,
  _getAdministration: Or,
  _getGlobalState: _E,
  _interceptReads: kE,
  _isComputingDerivation: pE,
  _resetGlobalState: bE,
  _startAction: MP,
  action: Oe,
  autorun: Fy,
  comparer: Ra,
  computed: dn,
  configure: UE,
  createAtom: Qr,
  defineProperty: QE,
  entries: tA,
  extendObservable: Dy,
  flow: Ba,
  flowResult: HE,
  get: rA,
  getAtom: er,
  getDebugName: vu,
  getDependencyTree: XP,
  getObserverTree: LE,
  has: Uy,
  intercept: mp,
  isAction: Ca,
  isBoxedObservable: jy,
  isComputed: JE,
  isComputedProp: YE,
  isFlow: hs,
  isFlowCancellationError: KE,
  isObservable: mt,
  isObservableArray: wn,
  isObservableMap: ln,
  isObservableObject: Qe,
  isObservableProp: XE,
  isObservableSet: un,
  keys: ja,
  makeAutoObservable: s$,
  makeObservable: a$,
  observable: Ve,
  observe: gp,
  onBecomeObserved: JP,
  onBecomeUnobserved: Ny,
  onReactionError: wE,
  override: vR,
  ownKeys: iA,
  reaction: zP,
  remove: Zt,
  runInAction: ry,
  set: Zr,
  spy: KP,
  toJS: qf,
  trace: oA,
  transaction: Wt,
  untracked: pp,
  values: Vf,
  when: t$
}, Symbol.toStringTag, { value: "Module" }));
var A$ = Object.defineProperty, w$ = (e, n, t) => n in e ? A$(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, fe = (e, n, t) => w$(e, typeof n != "symbol" ? n + "" : n, t), pA, yT, mT, gT, TT, _T, bT, hT, IT, OT;
const v$ = /* @__PURE__ */ new Map();
function S$(e, n, t) {
  v$.set(e, {
    modelClass: n,
    fnName: t
  });
}
var Gn;
(function(e) {
  e.ApplyPatches = "$$applyPatches", e.ApplySnapshot = "$$applySnapshot", e.Detach = "$$detach", e.ApplySet = "$$applySet", e.ApplyDelete = "$$applyDelete", e.ApplyMethodCall = "$$applyMethodCall";
})(Gn || (Gn = {}));
new Set(Object.values(Gn));
var Mt;
(function(e) {
  e.Sync = "sync", e.Async = "async";
})(Mt || (Mt = {}));
var PT;
(function(e) {
  e.Spawn = "spawn", e.Return = "return", e.Resume = "resume", e.ResumeError = "resumeError", e.Throw = "throw";
})(PT || (PT = {}));
let lA;
function Tp() {
  return lA;
}
function AT(e) {
  lA = e;
}
const yA = Symbol("modelAction");
function ky(e) {
  return typeof e == "function" && yA in e;
}
const Le = "$modelType", lt = "$modelId";
function mA(e) {
  return e === Le;
}
class Wy extends Error {
  constructor(n) {
    super(n), Object.setPrototypeOf(this, Wy.prototype);
  }
}
function Z(e) {
  return new Wy(e);
}
const R$ = {
  enumerable: !1,
  writable: !0,
  configurable: !1,
  value: void 0
};
function gA(e, n, t, r = !0) {
  r ? (Object.defineProperty(e, n, R$), e[n] = t) : Object.defineProperty(e, n, {
    enumerable: !1,
    writable: r,
    configurable: !0,
    value: t
  });
}
function TA(e, n, t) {
  const r = Object.getOwnPropertyDescriptor(e, n);
  r && (r.enumerable = t, r.get ? delete r.set : r.writable = !1, Object.defineProperty(e, n, r));
}
function _r(e) {
  if (!Ct(e))
    return !1;
  const n = Object.getPrototypeOf(e);
  return n === Object.prototype || n === null;
}
function Ct(e) {
  return e !== null && typeof e == "object";
}
function vn(e) {
  switch (typeof e) {
    case "number":
    case "string":
    case "boolean":
    case "undefined":
    case "bigint":
      return !0;
    default:
      return e === null;
  }
}
function _p(e) {
  return e instanceof Map || ln(e);
}
function bp(e) {
  return e instanceof Set || un(e);
}
function Fn(e) {
  return Array.isArray(e) || wn(e);
}
const Nn = process.env.NODE_ENV !== "production";
function xs(e, n) {
  if (!Ct(e))
    throw Z(`${n} must be an object`);
}
function _A(e, n) {
  if (typeof e != "function")
    throw Z(`${n} must be a function`);
}
function E$(e, n) {
  if (!vn(e))
    throw Z(`${n} must be a primitive`);
}
const bA = Symbol("runAfterNew"), $$ = Symbol("runBeforeOnInit");
function hA(e, n, t) {
  let r = e[n];
  r && Object.prototype.hasOwnProperty.call(e, n) || (r = r ? r.slice() : [], gA(e, n, r)), r.push(t);
}
function Hf(e, n) {
  const t = e[n];
  if (t)
    for (const r of t)
      r(e);
}
const wT = /* @__PURE__ */ new Set();
function IA(e, n, t) {
  if (t) {
    if (wT.has(t))
      return;
    wT.add(t);
  }
  switch (n = "[mobx-keystone] " + n, e) {
    case "warn":
      console.warn(n);
      break;
    case "error":
      console.error(n);
      break;
    default:
      throw Z(`unknown log type - ${e}`);
  }
}
function Ft(e) {
  let n, t = !1;
  return (...r) => (t || (n = e(...r), t = !0), n);
}
const nr = (e) => e, kf = {
  makeObservable: P$.makeObservable
};
function M$(e) {
  return `set${e[0].toUpperCase()}${e.slice(1)}`;
}
function zy() {
  return kf.makeObservable ? 6 : 5;
}
const zu = "mobx-keystone", Wf = Symbol("propsType"), vT = Symbol("fromSnapshotOverrideType"), ST = Symbol("toSnapshotOverrideType"), Jy = Symbol("modelInitialized"), $f = {}, yt = /* @__PURE__ */ new WeakMap();
function Ju(e) {
  return $f[e];
}
function tr(e, n, t) {
  let r = e.get(n);
  return r === void 0 && (r = t(), e.set(n, r)), r;
}
const ay = /* @__PURE__ */ new WeakMap(), OA = /* @__PURE__ */ new WeakMap();
function C$(e, n) {
  return e || n ? e && n ? e.parent === n.parent && e.path === n.path : !1 : !0;
}
function B$() {
  return Qr("parentAtom");
}
function j$(e) {
  tr(OA, e, B$).reportObserved();
}
function RT(e) {
  var n;
  (n = OA.get(e)) == null || n.reportChanged();
}
const Fs = /* @__PURE__ */ new WeakMap();
function Is(e) {
  const n = Fs.get(e);
  return n ?? e;
}
function Su(e) {
  return En(e) ? e.$ : e;
}
const xa = /* @__PURE__ */ new WeakMap();
function rr(e, n) {
  return !n && Fs.has(e) ? !1 : xa.has(e);
}
function sy(e) {
  return !vn(e) && rr(e, !1);
}
function cn(e, n, t = !1) {
  if (!t && Fs.has(e))
    throw Z(`${n} must be the model object instance instead of the '$' sub-object`);
  if (vn(e) || !rr(e, !0))
    throw Z(`${n} must be a tree node (usually a model or a shallow / deep child part of a model 'data' object)`);
}
function x$(e, n = "argument") {
  cn(e, n, !1);
}
let Au = !1;
function F$(e) {
  const n = Au;
  Au = !0;
  try {
    ry(() => {
      e();
    });
  } finally {
    Au = n;
  }
}
const Ru = Symbol("modelMetadata"), bl = Symbol("modelUnwrappedClass"), uy = Symbol("runAfterModelDecorator"), PA = Symbol("modelProperties");
function Yu(e) {
  return e[PA];
}
function N$(e, n) {
  e[PA] = n;
}
const In = Symbol("noDefaultValue"), Yy = {
  _setter: !1,
  _isId: !0,
  withSetter(e) {
    const n = Object.create(this);
    return n._setter = e ?? !0, n;
  },
  typedAs() {
    return Yy;
  }
}, ET = {
  _defaultFn: In,
  _defaultValue: In,
  _typeChecker: void 0,
  _setter: !1,
  _isId: !1,
  _transform: void 0,
  _fromSnapshotProcessor: void 0,
  _toSnapshotProcessor: void 0,
  withSetter(e) {
    const n = Object.create(this);
    return n._setter = e ?? !0, n;
  },
  withTransform(e) {
    const n = Object.create(this);
    return n._transform = U$(e), n;
  },
  withSnapshotProcessor({ fromSnapshot: e, toSnapshot: n }) {
    let t;
    if (this._fromSnapshotProcessor && e) {
      const o = this._fromSnapshotProcessor, a = e;
      t = (s) => o(a(s));
    } else e ? t = e : t = this._fromSnapshotProcessor;
    let r;
    if (this._toSnapshotProcessor && n) {
      const o = this._toSnapshotProcessor, a = n;
      r = (s) => a(o(s));
    } else n ? r = n : r = this._toSnapshotProcessor;
    const i = Object.create(this);
    return i._fromSnapshotProcessor = t, i._toSnapshotProcessor = r, i;
  }
};
function cy(e) {
  if (!(arguments.length > 0))
    return ET;
  let t = $T.get(e);
  return t || (t = Object.create(ET), typeof e == "function" ? t._defaultFn = e : t._defaultValue = e, $T.set(e, t)), t;
}
const $T = /* @__PURE__ */ new Map();
let dy = !1;
const D$ = () => {
  dy = !0;
};
function U$(e) {
  const n = /* @__PURE__ */ new WeakMap(), t = (i) => i.originalValue == null ? i.originalValue : e.transform(i), r = (i) => i.transformedValue == null ? i.transformedValue : e.untransform(i);
  return {
    transform(i, o, a, s) {
      const c = tr(n, o, () => /* @__PURE__ */ new Map());
      let u = c.get(a);
      (u == null ? void 0 : u.originalValue) !== i && (c.delete(a), u = void 0);
      const f = t({
        originalValue: i,
        cachedTransformedValue: u == null ? void 0 : u.transformedValue,
        setOriginalValue: s
      });
      return c.set(a, {
        originalValue: i,
        transformedValue: f
      }), f;
    },
    untransform(i, o, a) {
      const s = tr(n, o, () => /* @__PURE__ */ new Map());
      dy = !1;
      const c = r({
        transformedValue: i,
        cacheTransformedValue: D$
      });
      return dy ? s.set(a, { originalValue: c, transformedValue: i }) : s.delete(a), c;
    }
  };
}
function Eu(e) {
  return e._defaultFn !== In ? e._defaultFn() : e._defaultValue !== In ? e._defaultValue : In;
}
let L$ = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", V$ = (e = 21) => {
  let n = "", t = e | 0;
  for (; t--; )
    n += L$[Math.random() * 64 | 0];
  return n;
};
var ms;
(function(e) {
  e.DevModeOnly = "devModeOnly", e.AlwaysOn = "alwaysOn", e.AlwaysOff = "alwaysOff";
})(ms || (ms = {}));
let MT = 0;
const q$ = V$();
function K$() {
  const e = MT.toString(36) + "-" + q$;
  return MT++, e;
}
let AA = {
  modelAutoTypeChecking: ms.DevModeOnly,
  modelIdGenerator: K$,
  allowUndefinedArrayElements: !1,
  showDuplicateModelNameWarnings: !0
};
function wA() {
  return AA;
}
function Xu() {
  switch (wA().modelAutoTypeChecking) {
    case ms.DevModeOnly:
      return Nn;
    case ms.AlwaysOff:
      return !1;
    case ms.AlwaysOn:
      return !0;
    default:
      throw Z(`invalid 'modelAutoTypeChecking' config value - ${AA.modelAutoTypeChecking}`);
  }
}
const CT = /* @__PURE__ */ new WeakMap();
function Ns(e) {
  let n = CT.get(e);
  return n || (n = {
    shallow: /* @__PURE__ */ new Set(),
    shallowAtom: void 0,
    // will be created when first observed
    deep: /* @__PURE__ */ new Set(),
    deepDirty: !0,
    deepAtom: void 0,
    // will be created when first observed
    extensionsData: EA()
  }, CT.set(e, n)), n;
}
function hp(e) {
  const n = Ns(e);
  return n.shallowAtom || (n.shallowAtom = Qr("shallowChildrenAtom")), n.shallowAtom.reportObserved(), n.shallow;
}
function G$(e) {
  const n = Ns(e);
  return n.deepDirty && vA(e), n.deepAtom || (n.deepAtom = Qr("deepChildrenAtom")), n.deepAtom.reportObserved(), n;
}
function BT(e, n) {
  n.deep.add(e), Xy.forEach((t, r) => {
    t.addNode(e, n.extensionsData.get(r));
  });
}
const vA = Oe((e) => {
  var n;
  const t = Ns(e);
  if (!t.deepDirty)
    return t;
  t.deep = /* @__PURE__ */ new Set(), t.extensionsData = EA();
  const r = t.shallow.values();
  let i = r.next();
  for (; !i.done; ) {
    BT(i.value, t);
    const a = vA(i.value).deep.values();
    let s = a.next();
    for (; !s.done; )
      BT(s.value, t), s = a.next();
    i = r.next();
  }
  return t.deepDirty = !1, (n = t.deepAtom) == null || n.reportChanged(), t;
}), H$ = Oe((e, n) => {
  var t;
  const r = Ns(e);
  r.shallow.add(n), (t = r.shallowAtom) == null || t.reportChanged(), SA(e, r);
}), k$ = Oe((e, n) => {
  var t;
  const r = Ns(e);
  r.shallow.delete(n), (t = r.shallowAtom) == null || t.reportChanged(), SA(e, r);
});
function SA(e, n) {
  var t;
  let r = e, i = n;
  for (; r; )
    i.deepDirty = !0, (t = i.deepAtom) == null || t.reportChanged(), r = As(r, !1), r && (i = Ns(r));
}
const Xy = /* @__PURE__ */ new Map();
function RA(e) {
  const n = {};
  return Xy.set(n, e), (t) => t.extensionsData.get(n);
}
function EA() {
  const e = /* @__PURE__ */ new WeakMap();
  return Xy.forEach((n, t) => {
    e.set(t, n.initData());
  }), e;
}
function W$() {
  return !!Tp();
}
function $A() {
  if (!W$())
    throw Z("data changes must be performed inside model actions");
}
const fy = [];
function MA() {
  return !!Tp();
}
function z$(e) {
  MA() ? fy.push(e) : e();
}
let hl = !1;
function J$() {
  if (!(MA() || hl)) {
    hl = !0;
    try {
      for (; fy.length > 0; )
        fy.shift()();
    } finally {
      hl = !1;
    }
  }
}
function Fa(e) {
  if (En(e))
    return e.constructor[Ru];
  if (Zu(e))
    return e[Ru];
  throw Z("modelClassOrInstance must be a model class or instance");
}
const Y$ = /* @__PURE__ */ new WeakMap();
function Na(e) {
  return tr(Y$, e, () => Fa(e).modelIdProperty);
}
var Da;
(function(e) {
  e.OnInit = "$$onInit", e.OnLazyInit = "$$onLazyInit", e.OnAttachedToRootStore = "$$onAttachedToRootStore", e.OnAttachedToRootStoreDisposer = "$$onAttachedToRootStoreDisposer";
})(Da || (Da = {}));
new Set(Object.values(Da));
var $u;
(function(e) {
  e.ParentFirst = "parentFirst", e.ChildrenFirst = "childrenFirst";
})($u || ($u = {}));
function CA(e, n, t) {
  return cn(e, "root"), t === $u.ParentFirst ? X$(e, n) : BA(e, n);
}
function X$(e, n) {
  const t = [e];
  for (; t.length > 0; ) {
    const r = t.pop(), i = n(r);
    if (i !== void 0)
      return i;
    const o = hp(r);
    t.length += o.size;
    let a = t.length - 1;
    const s = o.values();
    let c = s.next();
    for (; !c.done; )
      t[a--] = c.value, c = s.next();
  }
}
function BA(e, n) {
  const t = hp(e).values();
  let r = t.next();
  for (; !r.done; ) {
    const o = BA(r.value, n);
    if (o !== void 0)
      return o;
    r = t.next();
  }
  const i = n(e);
  if (i !== void 0)
    return i;
}
function jA(e, n, t) {
  let r = e.get(t);
  return r || (r = dn(() => Z$(t, n, (i) => jA(e, n, i))), e.set(t, r)), r.get();
}
function Q$(e) {
  const n = /* @__PURE__ */ new WeakMap();
  return {
    walk: (t) => jA(n, e, t)
  };
}
function Z$(e, n, t) {
  let r;
  const i = n(e), o = hp(e), a = o.values();
  let s = a.next();
  if (i === void 0 && o.size === 1)
    return t(s.value);
  for (; !s.done; ) {
    const c = t(s.value);
    if (c) {
      r || (r = /* @__PURE__ */ new Map());
      const u = c.keys();
      let f = u.next();
      for (; !f.done; ) {
        const d = f.value, p = c.get(d);
        r.set(d, p), f = u.next();
      }
    }
    s = a.next();
  }
  return i !== void 0 && (r || (r = /* @__PURE__ */ new Map()), r.set(i, e)), r;
}
const py = /* @__PURE__ */ new WeakMap(), ly = /* @__PURE__ */ new WeakSet(), xA = Oe("attachToRootStore", (e, n) => {
  const t = [];
  CA(n, (i) => {
    ly.has(i) || (ly.add(i), i instanceof Qt && i.onAttachedToRootStore && (by(i, "onAttachedToRootStore", Da.OnAttachedToRootStore), t.push(i)));
  }, $u.ParentFirst);
  const r = t.length;
  for (let i = 0; i < r; i++) {
    const o = t[i], a = o.onAttachedToRootStore(e);
    a && py.set(o, a);
  }
}), FA = Oe("detachFromRootStore", (e) => {
  const n = [];
  CA(e, (r) => {
    if (!ly.delete(r))
      return;
    const i = py.get(r);
    if (i) {
      const o = wr({
        nameOrNameFn: Da.OnAttachedToRootStoreDisposer,
        fn: i,
        actionType: Mt.Sync
      }).bind(r);
      py.delete(r), n.push(o);
    }
  }, $u.ChildrenFirst);
  const t = n.length;
  for (let r = 0; r < t; r++)
    n[r]();
}), NA = /* @__PURE__ */ new WeakMap();
function eM() {
  return {
    atom: void 0,
    // will be created when first observed
    is: !1
  };
}
const Qy = (e) => tr(NA, e, eM);
Oe("registerRootStore", (e) => {
  var n;
  cn(e, "node");
  const t = Qy(e);
  if (t.is)
    throw Z("object already registered as root store");
  if (!j0(e))
    throw Z("a root store must not have a parent");
  return t.is = !0, xA(e, e), (n = t.atom) == null || n.reportChanged(), e;
});
Oe("unregisterRootStore", (e) => {
  var n;
  if (!nM(e))
    throw Z("not a root store");
  const t = Qy(e);
  t.is = !1, FA(e), (n = t.atom) == null || n.reportChanged();
});
function nM(e) {
  cn(e, "node");
  const n = Qy(e);
  return n.atom || (n.atom = Qr("rootStore")), n.atom.reportObserved(), n.is;
}
function Il(e) {
  var n;
  return !!((n = NA.get(e)) != null && n.is);
}
class Bt {
  /**
   * Creates an instance of TypeError.
   * @param path Sub-path (where the root is the value being type checked) where the error occured.
   * @param expectedTypeName Name of the expected type.
   * @param actualValue Actual value.
   * @param typeCheckedValue The value where the type check was invoked.
   */
  constructor(n, t, r, i) {
    fe(this, "path"), fe(this, "expectedTypeName"), fe(this, "actualValue"), fe(this, "typeCheckedValue"), fe(this, "message"), this.path = n, this.expectedTypeName = t, this.actualValue = r, this.typeCheckedValue = i;
    let o = [];
    this.typeCheckedValue && rr(this.typeCheckedValue, !0) && (o = B0(this.typeCheckedValue, !1).path);
    const a = rr(this.actualValue, !0) ? Hn(this.actualValue) : this.actualValue;
    this.message = `TypeCheckError: [/${[...o, ...this.path].join("/")}] Expected a value of type <${this.expectedTypeName}> but got the value <${JSON.stringify(a)}> instead`;
  }
  /**
   * Throws the type check error as an actual error.
   */
  throw() {
    throw Z(this.message);
  }
}
const tM = [], yy = /* @__PURE__ */ new WeakMap();
var On;
(function(e) {
  e.Object = "object", e.Array = "array", e.Primitive = "primitive", e.Any = "any";
})(On || (On = {}));
function rM(e) {
  return Fn(e) ? On.Array : Ct(e) ? On.Object : vn(e) ? On.Primitive : On.Any;
}
function iM(e) {
  let n = e;
  for (; n; ) {
    const t = yy.get(n);
    t && (yy.delete(n), t.forEach((r) => {
      r.invalidateCachedResult(n);
    })), n = C0(n, !1);
  }
}
const my = /* @__PURE__ */ new WeakMap();
function oM(e) {
  const n = my.get(e);
  n && (n.forEach((t) => {
    t.invalidateSnapshotProcessorCachedResult(e);
  }), my.delete(e));
}
class kn {
  constructor(n, t, r, i, o, a, s) {
    fe(this, "baseType"), fe(this, "_check"), fe(this, "getTypeName"), fe(this, "typeInfoGen"), fe(this, "snapshotType"), fe(this, "_fromSnapshotProcessor"), fe(this, "_toSnapshotProcessor"), fe(this, "checkResultCache"), fe(this, "unchecked"), fe(this, "_cachedTypeInfoGen"), fe(this, "fromSnapshotProcessor", (c) => this._fromSnapshotProcessor(c)), fe(this, "_toSnapshotProcessorCache", /* @__PURE__ */ new WeakMap()), fe(this, "toSnapshotProcessor", (c) => {
      if (typeof c != "object" || c === null)
        return this._toSnapshotProcessor(c);
      if (this._toSnapshotProcessorCache.has(c))
        return this._toSnapshotProcessorCache.get(c);
      const u = this._toSnapshotProcessor(c);
      return this._toSnapshotProcessorCache.set(c, u), tr(my, c, () => /* @__PURE__ */ new Set()).add(this), u;
    }), this.baseType = n, this._check = t, this.getTypeName = r, this.typeInfoGen = i, this.snapshotType = o, this._fromSnapshotProcessor = a, this._toSnapshotProcessor = s, this.unchecked = !t, this._cachedTypeInfoGen = Ft(i);
  }
  createCacheIfNeeded() {
    return this.checkResultCache || (this.checkResultCache = /* @__PURE__ */ new WeakMap()), this.checkResultCache;
  }
  setCachedResult(n, t) {
    this.createCacheIfNeeded().set(n, t), tr(yy, n, () => /* @__PURE__ */ new Set()).add(this);
  }
  invalidateCachedResult(n) {
    var t;
    (t = this.checkResultCache) == null || t.delete(n);
  }
  getCachedResult(n) {
    var t;
    return (t = this.checkResultCache) == null ? void 0 : t.get(n);
  }
  check(n, t, r) {
    if (this.unchecked)
      return null;
    if (!rr(n, !0))
      return this._check(n, t, r);
    let i = this.getCachedResult(n);
    return i === void 0 && (i = this._check(n, tM, void 0), this.setCachedResult(n, i)), i ? new Bt([...t, ...i.path], i.expectedTypeName, i.actualValue, r) : null;
  }
  get typeInfo() {
    return this._cachedTypeInfoGen(this);
  }
  invalidateSnapshotProcessorCachedResult(n) {
    this._toSnapshotProcessorCache.delete(n);
  }
}
const DA = Symbol("lateTypeCheker");
function Wr(e, n) {
  let t;
  const r = () => t || (t = e(), t);
  r[DA] = !0;
  const i = Ft(n);
  return Object.defineProperty(r, "typeInfo", {
    enumerable: !0,
    configurable: !1,
    get() {
      return i(r);
    }
  }), r;
}
function Zy(e) {
  return typeof e == "function" && DA in e;
}
class Nt {
  constructor(n) {
    fe(this, "thisType"), this.thisType = n;
  }
}
const em = /* @__PURE__ */ new WeakMap(), va = /* @__PURE__ */ new WeakMap();
function Dt(e) {
  return em.get(e);
}
function aM(e, n) {
  if (!(n && e))
    return;
  const t = Dt(n.parent);
  if (t)
    return {
      parentSnapshot: t,
      parentPath: n
    };
}
const sM = Oe("unsetInternalSnapshot", (e) => {
  var n;
  const t = Dt(e);
  t && (em.delete(e), (n = t.atom) == null || n.reportChanged());
}), nm = Oe("setNewInternalSnapshot", (e, n, t, r = !1) => {
  var i;
  const o = t ? t(n) : n, a = {
    untransformed: n,
    transformFn: t,
    transformed: o,
    atom: void 0
    // will be created when first observed
  };
  va.set(n, r), o !== void 0 && o !== n && va.set(o, r), em.set(e, a), (i = a.atom) == null || i.reportChanged();
}), tm = Oe("updateInternalSnapshot", (e, n) => {
  var t;
  const r = Dt(e);
  let i = r.untransformed;
  va.get(i) ? Array.isArray(i) ? i = i.slice() : i = Object.assign({}, i) : oM(i), n(i), r.untransformed = i, r.transformed = r.transformFn ? r.transformFn(i) : i, va.set(r.untransformed, !1), r.transformed !== void 0 && va.set(r.transformed, !1), (t = r.atom) == null || t.reportChanged();
  const a = aM(r, Ar(e, !1));
  if (a) {
    const { parentSnapshot: s, parentPath: c } = a;
    if (s) {
      const u = c.path;
      tm(c.parent, (f) => {
        f[u] = r.transformed;
      });
    }
  }
});
function uM(e) {
  e.atom || (e.atom = Qr("snapshot")), e.atom.reportObserved();
}
function Qn(e) {
  if (vn(e))
    return e;
  const n = va.get(e);
  if (n === void 0 || n)
    return e;
  if (Array.isArray(e))
    for (let t = 0; t < e.length; t++)
      Qn(e[t]);
  else {
    const t = Object.keys(e);
    for (let r = 0; r < t.length; r++)
      Qn(e[t[r]]);
  }
  return va.set(e, !0), e;
}
const Cc = [];
class UA {
  constructor() {
    fe(this, "patches", Cc), fe(this, "invPatches", Cc);
  }
  reset() {
    this.patches = Cc, this.invPatches = Cc;
  }
  record(n, t) {
    this.patches = n, this.invPatches = t;
  }
  emit(n) {
    LA(n, this.patches, this.invPatches), this.reset();
  }
}
function LA(e, n, t) {
  (n.length > 0 || t.length > 0) && (dM(e, n, t), fM(e, n, t));
}
const cM = /* @__PURE__ */ new WeakMap(), jT = [];
function dM(e, n, t) {
  for (let r = 0; r < jT.length; r++) {
    const i = jT[r];
    i(e, n, t);
  }
}
function xT(e, n, t, r) {
  const i = cM.get(e);
  if (!i || i.length === 0)
    return;
  const o = (c) => r.length > 0 ? c.map((u) => pM(u, r)) : c, a = o(n), s = o(t);
  for (let c = 0; c < i.length; c++) {
    const u = i[c];
    u(a, s);
  }
}
function fM(e, n, t) {
  const r = [];
  xT(e, n, t, r);
  let i = Ar(e, !1);
  for (; i; )
    r.unshift(i.path), xT(i.parent, n, t, r), i = Ar(i.parent, !1);
}
function pM(e, n) {
  return {
    ...e,
    path: [...n, ...e.path]
  };
}
const FT = (e) => {
  if (vn(e))
    return e;
  const n = Dt(e);
  return n ? Qn(n.transformed) : e;
};
function es(e, n, t) {
  return t === void 0 ? { op: "remove", path: e } : n === void 0 ? {
    op: "add",
    path: e,
    value: FT(t)
  } : {
    op: "replace",
    path: e,
    value: FT(t)
  };
}
function Pn(e, n, t) {
  (e[n] !== t || !(n in e)) && Zr(e, n, t);
}
function lM(e, n, t) {
  return e[n] !== t || !(n in e) ? (Zr(e, n, t), !0) : !1;
}
var Os;
(function(e) {
  e[e.Model = 0] = "Model", e[e.Array = 1] = "Array", e[e.PlainObject = 2] = "PlainObject", e[e.Frozen = 3] = "Frozen";
})(Os || (Os = {}));
function yM(e, n, t = 0) {
  const r = mM(e, n, t);
  return r ? r.parent : void 0;
}
function mM(e, n, t = 0) {
  cn(e, "child");
  const r = [];
  let i = e, o = 0, a;
  for (; a = Ar(i, !0); ) {
    if (r.unshift(a.path), i = a.parent, n(i))
      return {
        parent: i,
        path: r
      };
    if (o++, t > 0 && o === t)
      break;
  }
}
let Mf = !0;
function rm(e) {
  const n = Mf;
  Mf = !1;
  try {
    e();
  } finally {
    Mf = n;
  }
}
function gM() {
  return Mf;
}
var Pr;
(function(e) {
  e[e.Array = 0] = "Array", e[e.Frozen = 1] = "Frozen", e[e.Model = 2] = "Model", e[e.PlainObject = 3] = "PlainObject";
})(Pr || (Pr = {}));
function TM(e, n, t) {
  if (!Fn(e))
    return Sa(n);
  const r = Hn(e);
  return rm(() => {
    e.length > n.length && e.splice(n.length, e.length - n.length);
    for (let i = 0; i < e.length; i++) {
      const o = e[i], a = qr(o, n[i], t, e);
      Jf(a, o, t), Pn(e, i, a);
    }
    for (let i = e.length; i < n.length; i++) {
      const o = qr(void 0, n[i], t, e);
      Jf(o, void 0, t), e.push(o);
    }
  }), Qu(e, void 0, r), e;
}
function _M() {
  Ip(Pr.Array, (e, n, t) => {
    if (Fn(n))
      return TM(e, n, t);
  });
}
var gs;
(function(e) {
  e.DevModeOnly = "devModeOnly", e.On = "on", e.Off = "off";
})(gs || (gs = {}));
const VA = "$frozen";
class im {
  /**
   * Creates an instance of Frozen.
   * Do not use directly, use `frozen` instead.
   *
   * @param dataToFreeze
   * @param checkMode
   */
  constructor(n, t = gs.DevModeOnly) {
    fe(this, "data"), mt(n) && (n = qf(n));
    const r = t === gs.On || Nn && t === gs.DevModeOnly;
    r && Cf(n), this.data = n, r && Object.freeze(this.data), Rt(this, void 0);
  }
}
function qA(e, n = gs.DevModeOnly) {
  return new im(e, n);
}
function Cf(e) {
  if (!vn(e)) {
    if (Array.isArray(e)) {
      const n = e.length;
      for (let t = 0; t < n; t++) {
        const r = e[t];
        if (r === void 0)
          throw Z("undefined is not supported inside arrays since it is not serializable in JSON, consider using null instead");
        Cf(r);
      }
      Object.freeze(e);
      return;
    }
    if (_r(e)) {
      const n = Object.keys(e), t = n.length;
      for (let r = 0; r < t; r++) {
        const i = n[r], o = e[i];
        Cf(i), Cf(o);
      }
      Object.freeze(e);
      return;
    }
    throw Z(`frozen data must be plainly serializable to JSON, but ${e} is not`);
  }
}
function om(e) {
  return _r(e) && VA in e;
}
function bM(e, n) {
  return e instanceof im && e.data === n.data ? e : qA(n.data);
}
function hM() {
  Ip(Pr.Frozen, (e, n) => {
    if (om(n))
      return bM(e, n);
  });
}
function IM(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ol, NT;
function OM() {
  return NT || (NT = 1, Ol = function e(n, t) {
    if (n === t) return !0;
    if (n && t && typeof n == "object" && typeof t == "object") {
      if (n.constructor !== t.constructor) return !1;
      var r, i, o;
      if (Array.isArray(n)) {
        if (r = n.length, r != t.length) return !1;
        for (i = r; i-- !== 0; )
          if (!e(n[i], t[i])) return !1;
        return !0;
      }
      if (n instanceof Map && t instanceof Map) {
        if (n.size !== t.size) return !1;
        for (i of n.entries())
          if (!t.has(i[0])) return !1;
        for (i of n.entries())
          if (!e(i[1], t.get(i[0]))) return !1;
        return !0;
      }
      if (n instanceof Set && t instanceof Set) {
        if (n.size !== t.size) return !1;
        for (i of n.entries())
          if (!t.has(i[0])) return !1;
        return !0;
      }
      if (ArrayBuffer.isView(n) && ArrayBuffer.isView(t)) {
        if (r = n.length, r != t.length) return !1;
        for (i = r; i-- !== 0; )
          if (n[i] !== t[i]) return !1;
        return !0;
      }
      if (n.constructor === RegExp) return n.source === t.source && n.flags === t.flags;
      if (n.valueOf !== Object.prototype.valueOf) return n.valueOf() === t.valueOf();
      if (n.toString !== Object.prototype.toString) return n.toString() === t.toString();
      if (o = Object.keys(n), r = o.length, r !== Object.keys(t).length) return !1;
      for (i = r; i-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(t, o[i])) return !1;
      for (i = r; i-- !== 0; ) {
        var a = o[i];
        if (!e(n[a], t[a])) return !1;
      }
      return !0;
    }
    return n !== n && t !== t;
  }), Ol;
}
var PM = OM();
const AM = /* @__PURE__ */ IM(PM);
function KA(e, n) {
  return e + " " + n;
}
class GA {
  constructor(n) {
    fe(this, "pool");
    var t;
    n = (t = Fs.get(n)) != null ? t : n, this.pool = wM(G$(n));
  }
  findModelByTypeAndId(n, t) {
    return t ? this.pool.get(KA(n, t)) : void 0;
  }
  findModelForSnapshot(n) {
    if (!vp(n))
      return;
    const t = n[Le], r = Ju(t), i = Na(r.class);
    return i ? this.findModelByTypeAndId(t, n[i]) : void 0;
  }
}
const wM = RA({
  initData() {
    return /* @__PURE__ */ new Map();
  },
  addNode(e, n) {
    if (En(e)) {
      const t = e[lt];
      t && n.set(KA(e[Le], t), e);
    }
  }
});
function gy(e, n) {
  cn(e, "node"), xs(n, "snapshot"), vM().call(e, n);
}
function HA(e) {
  const n = this, t = () => {
    const r = new GA(n), i = qr(n, e, r, void 0);
    if (Nn && i !== n)
      throw Z("assertion failed: reconciled object has to be the same");
  };
  if (Fn(e)) {
    if (!Fn(n))
      throw Z("if the snapshot is an array the target must be an array too");
    t();
    return;
  }
  if (om(e))
    throw Z("applySnapshot cannot be used over frozen objects");
  if (_r(e) && e[Le] === void 0 && En(n)) {
    const r = yt.get(n.constructor);
    e = { ...e, [Le]: r.name };
  }
  if (vp(e)) {
    const r = e[Le], i = Ju(r);
    if (!i)
      throw Z(`model with name "${r}" not found in the registry`);
    if (!En(n))
      throw Z("the target for a model snapshot must be a model instance");
    if (n[Le] !== r)
      throw Z(`snapshot model type '${r}' does not match target model type '${n[Le]}'`);
    const o = Na(i.class);
    if (o) {
      const a = e[o];
      if (n[lt] !== a)
        throw Z(`snapshot model id '${a}' does not match target model id '${n[lt]}'`);
    }
    t();
    return;
  }
  if (_r(e)) {
    if (!(_r(n) || Qe(n)))
      throw Z("if the snapshot is an object the target must be an object too");
    t();
    return;
  }
  throw _p(e) ? Z("a snapshot must not contain maps") : bp(e) ? Z("a snapshot must not contain sets") : Z(`unsupported snapshot - ${e}`);
}
const vM = Ft(() => wr({
  nameOrNameFn: Gn.ApplySnapshot,
  fn: HA,
  actionType: Mt.Sync
}));
function Ty(e, n) {
  return e === n ? !0 : (sy(e) ? e = Hn(e) : mt(e) && (e = qf(e, DT)), sy(n) ? n = Hn(n) : mt(n) && (n = qf(n, DT)), AM(e, n));
}
const DT = zy() >= 6 ? void 0 : {};
function SM(e, n, t, r) {
  const i = n[Le], o = Ju(i);
  if (!o)
    throw Z(`model with name "${i}" not found in the registry`);
  const a = t.findModelForSnapshot(n);
  if (a && (e = a), !En(e) || e[Le] !== i)
    return Sa(n);
  const s = o.class, c = Yu(s), u = Na(s);
  if (u) {
    const p = n[u];
    if (e[lt] !== p)
      return Sa(n);
  } else if (Fn(r) && !Ty(e, n))
    return Sa(n);
  const f = e, d = Hn(f);
  return rm(() => {
    const p = f.constructor, T = p.fromSnapshotProcessor ? p.fromSnapshotProcessor(n) : n, b = f.$, O = Object.keys(b), F = O.length;
    for (let N = 0; N < F; N++) {
      const w = O[N];
      if (!(w in T)) {
        const _ = c[w], B = _ ? Eu(_) : In;
        B === In ? Zt(b, w) : Pn(b, w, B);
      }
    }
    const E = Object.keys(T), M = E.length;
    for (let N = 0; N < M; N++) {
      const w = E[N];
      if (!mA(w)) {
        const _ = T[w], B = b[w];
        let m = qr(B, _, t, f);
        if (m == null) {
          const P = c[w], R = P ? Eu(P) : In;
          R !== In && (m = R);
        }
        Jf(m, B, t), Pn(b, w, m);
      }
    }
  }), Qu(f, void 0, d), f;
}
function RM() {
  Ip(Pr.Model, (e, n, t, r) => {
    if (vp(n))
      return SM(e, n, t, r);
  });
}
function EM(e, n, t) {
  if (!(_r(e) || Qe(e)))
    return Sa(n);
  const r = e, i = Hn(r);
  return rm(() => {
    const o = Object.keys(r), a = o.length;
    for (let u = 0; u < a; u++) {
      const f = o[u];
      f in n || Zt(r, f);
    }
    const s = Object.keys(n), c = s.length;
    for (let u = 0; u < c; u++) {
      const f = s[u], d = n[f], p = r[f], T = qr(p, d, t, r);
      Jf(T, p, t), Pn(r, f, T);
    }
  }), Qu(r, void 0, i), r;
}
function $M() {
  Ip(Pr.PlainObject, (e, n, t) => {
    if (_r(n))
      return EM(e, n, t);
  });
}
let UT = !1;
function MM() {
  UT || (UT = !0, _M(), hM(), RM(), $M());
}
const zf = [];
function Ip(e, n) {
  zf.push({ priority: e, reconciler: n }), zf.sort((t, r) => t.priority - r.priority);
}
function qr(e, n, t, r) {
  if (vn(n))
    return n;
  if (Hn(e) === n)
    return e;
  MM();
  const i = zf.length;
  for (let o = 0; o < i; o++) {
    const { reconciler: a } = zf[o], s = a(e, n, t, r);
    if (s !== void 0)
      return s;
  }
  throw _p(n) ? Z("a snapshot must not contain maps") : bp(n) ? Z("a snapshot must not contain sets") : Z(`unsupported snapshot - ${n}`);
}
function Jf(e, n, t) {
  if (e !== n && En(e) && t.findModelByTypeAndId(e[Le], e[lt])) {
    const r = ym(e, !1);
    r && Zr(r.parent, r.path, null);
  }
}
function Mu(e, n, t = !1) {
  cn(e, "node"), !(n.length <= 0) && CM().call(e, n, t);
}
function kA(e, n = !1) {
  const t = this, r = new GA(t);
  if (n) {
    let i = e.length;
    for (; i--; ) {
      const o = e[i];
      if (Fn(o)) {
        let a = o.length;
        for (; a--; )
          Bc(t, o[a], r);
      } else
        Bc(t, o, r);
    }
  } else {
    const i = e.length;
    for (let o = 0; o < i; o++) {
      const a = e[o];
      if (Fn(a)) {
        const s = a.length;
        for (let c = 0; c < s; c++)
          Bc(t, a[c], r);
      } else
        Bc(t, a, r);
    }
  }
}
const CM = Ft(() => wr({
  nameOrNameFn: Gn.ApplyPatches,
  fn: kA,
  actionType: Mt.Sync
}));
function Bc(e, n, t) {
  const { target: r, prop: i } = BM(e, n.path);
  if (Fn(r))
    switch (n.op) {
      case "add": {
        const o = +i, a = qr(void 0, n.value, t, r);
        o < 0 ? r.push(a) : r.splice(o, 0, a);
        break;
      }
      case "remove": {
        const o = +i;
        r.splice(o, 1);
        break;
      }
      case "replace": {
        if (i === "length")
          r.length = n.value;
        else {
          const o = +i, a = qr(r[o], n.value, t, r);
          Pn(r, o, a);
        }
        break;
      }
      default:
        throw Z(`unsupported patch operation: ${n.op}`);
    }
  else
    switch (n.op) {
      case "add": {
        const o = qr(void 0, n.value, t, r);
        Pn(r, i, o);
        break;
      }
      case "remove": {
        Zt(r, i);
        break;
      }
      case "replace": {
        const o = qr(r[i], n.value, t, r);
        Pn(r, i, o);
        break;
      }
      default:
        throw Z(`unsupported patch operation: ${n.op}`);
    }
}
function BM(e, n) {
  if (Nn && !Fn(n))
    throw Z(`invalid path: ${n}`);
  let t = Su(e);
  if (n.length === 0)
    return {
      target: t
    };
  for (let r = 0; r <= n.length - 2; r++)
    t = Su(t[n[r]]);
  return {
    target: t,
    prop: n[n.length - 1]
  };
}
function Qu(e, n, t) {
  if (gM() && (iM(e), Xu())) {
    const r = jM(e);
    if (r) {
      const i = r.typeCheck();
      i && (F$(() => {
        n ? kA.call(e, n.invPatches, !0) : t && HA.call(e, t);
      }), i.throw());
    }
  }
}
function jM(e) {
  const n = Is(e);
  return e !== n && (e = n, En(e) && Fa(e).dataType) ? e : yM(e, (t) => En(t) && !!Fa(t).dataType);
}
function WA(e, n, t) {
  const r = e, i = r.length, o = wn(r) ? r : Ve.array(void 0, GM);
  o !== r && (o.length = r.length);
  let a, s;
  const c = () => {
    a(), s();
  };
  xa.set(o, c), zr(
    o,
    // value
    n,
    !1,
    // indexChangeAllowed
    !1,
    // isDataObject
    // arrays shouldn't be cloned anyway
    !1
    // cloneIfApplicable
  );
  const u = [];
  u.length = i;
  for (let f = 0; f < i; f++) {
    const d = r[f];
    if (vn(d))
      t || Pn(o, f, d), u[f] = d;
    else {
      const p = { parent: o, path: f };
      let T;
      t ? (T = d, zr(
        T,
        // value
        p,
        // parentPath
        !1,
        // indexChangeAllowed
        !1,
        // isDataObject
        // the value is already a new value (the result of a fromSnapshot)
        !1
        // cloneIfApplicable
      )) : (T = Rt(d, p), Pn(o, f, T));
      const b = Dt(T);
      u[f] = b.transformed;
    }
  }
  return nm(o, u, void 0), a = mp(o, LM.bind(void 0, o)), s = gp(o, NM), o;
}
function xM(e, n, t) {
  t[e] = n;
}
function FM(e, n, t, r) {
  r.splice(e, n, ...t);
}
const wu = new UA();
function NM(e) {
  const n = e.object, t = Dt(n).untransformed;
  wu.reset();
  let r;
  switch (e.type) {
    case "splice":
      r = UM(e, t);
      break;
    case "update":
      r = DM(e, t);
      break;
  }
  Qu(n, wu), !Au && r && (tm(n, r), wu.emit(n));
}
const zA = "undefined is not supported inside arrays since it is not serializable in JSON, consider using null instead";
function DM(e, n) {
  const t = e.index, r = e.newValue, i = n[t];
  let o;
  vn(r) ? o = r : o = Dt(r).transformed;
  const a = xM.bind(void 0, t, o), s = [t];
  return wu.record([
    {
      op: "replace",
      path: s,
      value: Qn(o)
    }
  ], [
    {
      op: "replace",
      path: s,
      value: Qn(i)
    }
  ]), a;
}
function UM(e, n) {
  const t = e.index, r = e.addedCount, i = e.removedCount, o = [];
  o.length = r;
  for (let f = 0; f < r; f++) {
    const d = e.added[f];
    vn(d) ? o[f] = d : o[f] = Dt(d).transformed;
  }
  const a = n.length, s = FM.bind(void 0, t, i, o), c = [], u = [];
  if (r === i) {
    const f = [], d = [];
    let p = 0;
    for (let T = 0; T < r; T++) {
      const b = t + T, O = LT(n, b, t, i, o), F = n[b];
      if (O !== F) {
        const E = [b - p];
        c.push({
          op: "remove",
          path: E
        }), u.push({
          op: "remove",
          path: E
        }), p++;
        const M = [b];
        f.push({
          op: "add",
          path: M,
          value: Qn(O)
        }), d.push({
          op: "add",
          path: M,
          value: Qn(F)
        });
      }
    }
    c.push(...f), u.push(...d), u.reverse();
  } else {
    const f = a - i;
    if (i > 0) {
      const d = t >= f;
      d && c.push({
        op: "replace",
        path: ["length"],
        value: f
      });
      for (let p = i - 1; p >= 0; p--) {
        const T = t + p, b = [T];
        d || c.push({
          op: "remove",
          path: b
        }), u.push({
          op: "add",
          path: b,
          value: Qn(n[T])
        });
      }
    }
    if (r > 0) {
      const d = t >= f;
      d && u.push({
        op: "replace",
        path: ["length"],
        value: f
      });
      for (let p = 0; p < r; p++) {
        const T = t + p, b = [T];
        c.push({
          op: "add",
          path: b,
          value: Qn(LT(n, T, t, i, o))
        }), d || u.push({
          op: "remove",
          path: b
        });
      }
    }
  }
  return wu.record(c, u), s;
}
function LM(e, n) {
  switch ($A(), n.type) {
    case "splice":
      qM(n);
      break;
    case "update":
      VM(n, e);
      break;
  }
  return n;
}
function VM(e, n) {
  if (Nn && e.newValue === void 0)
    throw Z(zA);
  const t = n[e.index];
  Rt(t, void 0), e.newValue = Rt(e.newValue, { parent: n, path: e.index });
}
function qM(e) {
  if (Nn) {
    const r = e.added.length;
    for (let i = 0; i < r; i++)
      if (e.added[i] === void 0)
        throw Z(zA);
  }
  for (let r = 0; r < e.removedCount; r++) {
    const i = e.object[e.index + r];
    Rt(i, void 0);
  }
  for (let r = 0; r < e.added.length; r++)
    e.added[r] = Rt(e.added[r], {
      parent: e.object,
      path: e.index + r
    });
  const n = e.index + e.removedCount, t = e.index + e.added.length;
  if (n !== t)
    for (let r = n, i = t; r < e.object.length; r++, i++)
      zr(
        e.object[r],
        // value
        {
          parent: e.object,
          path: i
        },
        // parentPath
        !0,
        // indexChangeAllowed
        !1,
        // isDataObject
        // just re-indexing
        !1
        // cloneIfApplicable
      );
}
function KM() {
  Ap(Os.Array, (e, n) => {
    if (Fn(e))
      return WA(e, n, !1);
  });
}
const GM = {
  deep: !1
};
function LT(e, n, t, r, i) {
  const o = n - t;
  return o < 0 ? e[n] : o < i.length ? i[o] : e[n - i.length + r];
}
function HM(e, n) {
  const t = Ve.array([], sm), r = e.length;
  for (let i = 0; i < r; i++)
    t.push(Pp(e[i], n));
  return WA(t, void 0, !0);
}
function kM() {
  Op(Pr.Array, (e, n) => {
    if (Fn(e))
      return HM(e, n);
  });
}
function WM() {
  Op(Pr.Frozen, (e) => {
    if (om(e))
      return qA(e.data);
  });
}
function zM(e, n) {
  const t = e[Le];
  if (!t)
    throw Z(`a model snapshot must contain a type key (${Le}), but none was found`);
  const r = Ju(t);
  if (!r)
    throw Z(`model with name "${t}" not found in the registry`);
  const i = Na(r.class);
  if (i && e[i] === void 0)
    throw Z(`a model snapshot of type '${t}' must contain an id key (${i}), but none was found`);
  return new r.class(void 0, {
    snapshotInitialData: {
      unprocessedSnapshot: e,
      unprocessedModelType: typeof n.untypedSnapshot == "object" && n.untypedSnapshot && Le in n.untypedSnapshot ? n.untypedSnapshot[Le] : void 0,
      snapshotToInitialData: n.snapshotToInitialData
    },
    generateNewIds: n.options.generateNewIds
  });
}
function JM() {
  Op(Pr.Model, (e, n) => {
    if (vp(e))
      return zM(e, n);
  });
}
function am(e, n, t, r, i) {
  const o = e, a = Qe(o) ? o : Ve.object({}, void 0, YM);
  let s, c;
  const u = () => {
    s(), c();
  };
  xa.set(a, u), zr(
    a,
    // value
    n,
    !1,
    // indexChangeAllowed
    i,
    // an object shouldn't be cloned
    !1
    // cloneIfApplicable
  );
  const f = {}, d = Object.keys(o), p = d.length;
  for (let b = 0; b < p; b++) {
    const O = d[b], F = o[O];
    if (vn(F))
      r || Pn(a, O, F), f[O] = F;
    else {
      const E = { parent: a, path: O };
      let M;
      r ? (M = F, zr(
        M,
        // value
        E,
        // parentPath
        !1,
        // indexChangeAllowed
        !1,
        // isDataObject
        // the value is already a new value (the result of a fromSnapshot)
        !1
        // cloneIfApplicable
      )) : (M = Rt(F, E), Pn(a, O, M));
      const N = Dt(M);
      f[O] = N.transformed;
    }
  }
  let T;
  if (t) {
    f[Le] = t;
    const b = Ju(t);
    if (!b)
      throw Z(`model with name "${t}" not found in the registry`);
    const O = b.class.toSnapshotProcessor;
    O && (T = (F) => O(F, Is(a)));
  }
  return nm(i ? Is(a) : a, f, T), s = mp(a, t0), c = gp(a, ZM), a;
}
const YM = {
  deep: !1
};
function XM(e, n, t) {
  t[e] = n;
}
function QM(e, n) {
  delete n[e];
}
const Ts = new UA();
function ZM(e) {
  const n = e.object, t = Is(n), r = Dt(t).untransformed;
  Ts.reset();
  let i;
  switch (e.type) {
    case "add":
    case "update":
      i = n0(e, r);
      break;
    case "remove":
      i = e0(e, r);
      break;
    default:
      throw Z("assertion error: unsupported object change type");
  }
  Qu(n, Ts), Au || (tm(t, i), Ts.emit(t));
}
function e0(e, n) {
  const t = e.name, r = n[t], i = QM.bind(void 0, t), o = [t];
  return Ts.record([
    {
      op: "remove",
      path: o
    }
  ], [
    {
      op: "add",
      path: o,
      value: Qn(r)
    }
  ]), i;
}
function n0(e, n) {
  const t = e.name, r = e.newValue, i = n[t];
  let o;
  vn(r) ? o = r : o = Dt(r).transformed;
  const a = XM.bind(void 0, t, o), s = [t];
  return e.type === "add" ? Ts.record([
    {
      op: "add",
      path: s,
      value: Qn(o)
    }
  ], [
    {
      op: "remove",
      path: s
    }
  ]) : Ts.record([
    {
      op: "replace",
      path: s,
      value: Qn(o)
    }
  ], [
    {
      op: "replace",
      path: s,
      value: Qn(i)
    }
  ]), a;
}
function t0(e) {
  if ($A(), typeof e.name == "symbol")
    throw Z("symbol properties are not supported");
  switch (e.type) {
    case "add":
      e.newValue = Rt(e.newValue, {
        parent: e.object,
        path: String(e.name)
      });
      break;
    case "remove": {
      Rt(e.object[e.name], void 0);
      break;
    }
    case "update": {
      const n = e.object[e.name], t = e.newValue;
      t !== n && (Rt(n, void 0), e.newValue = Rt(t, {
        parent: e.object,
        path: String(e.name)
      }));
      break;
    }
    default:
      throw Z("assertion error: unsupported object change type");
  }
  return e;
}
function r0() {
  Ap(Os.PlainObject, (e, n) => {
    if (Qe(e) || _r(e))
      return am(e, n, void 0, !1, !1);
  });
}
function i0(e, n) {
  const t = Ve.object({}, void 0, sm), r = Object.keys(e), i = r.length;
  for (let o = 0; o < i; o++) {
    const a = r[o], s = e[a];
    Zr(t, a, Pp(s, n));
  }
  return am(t, void 0, void 0, !0, !1);
}
function o0() {
  Op(Pr.PlainObject, (e, n) => {
    if (_r(e))
      return i0(e, n);
  });
}
let VT = !1;
function a0() {
  VT || (VT = !0, kM(), WM(), JM(), o0());
}
const Yf = [];
function Op(e, n) {
  Yf.push({ priority: e, snapshotter: n }), Yf.sort((t, r) => t.priority - r.priority);
}
function Sa(e, n, t) {
  let r, i, o;
  if (Zy(e) || e instanceof kn || Zu(e)) {
    const a = Sn(e);
    i = n, r = a.fromSnapshotProcessor(i), o = t;
  } else
    r = e, i = r, o = n;
  return s0(r, i, o);
}
const s0 = Oe("fromSnapshot", (e, n, t) => {
  const i = {
    options: {
      generateNewIds: !1,
      overrideRootModelId: void 0,
      ...t
    },
    untypedSnapshot: n
  };
  return i.snapshotToInitialData = u0.bind(void 0, i), Pp(e, i);
});
function Pp(e, n) {
  if (vn(e))
    return e;
  a0();
  const t = Yf.length;
  for (let r = 0; r < t; r++) {
    const { snapshotter: i } = Yf[r], o = i(e, n);
    if (o !== void 0)
      return o;
  }
  throw _p(e) ? Z("a snapshot must not contain maps") : bp(e) ? Z("a snapshot must not contain sets") : Z(`unsupported snapshot - ${e}`);
}
function u0(e, n) {
  const t = Ve.object({}, void 0, sm), r = Object.keys(n), i = r.length;
  for (let o = 0; o < i; o++) {
    const a = r[o];
    if (!mA(a)) {
      const s = n[a];
      Zr(t, a, Pp(s, e));
    }
  }
  return t;
}
const sm = {
  deep: !1
};
function c0(e, n) {
  cn(e, "node");
  const t = {
    generateNewIds: !0,
    ...n
  }, r = Hn(e);
  return Sa(r, t);
}
const zr = Oe("setParent", (e, n, t, r, i) => {
  if (vn(e))
    return e;
  if (Nn) {
    if (t && i)
      throw Z("assertion failed: 'indexChangeAllowed' and 'cloneIfApplicable' cannot be set at the same time");
    if (typeof e == "function" || typeof e == "symbol")
      throw Z("assertion failed: value cannot be a function or a symbol");
    if (!rr(e, !0))
      throw Z("assertion failed: value is not ready to take a parent");
    if (n && !rr(n.parent, !0))
      throw Z("assertion failed: parent is not ready to take children");
  }
  let o = Ar(e, !1);
  if (C$(o, n))
    return e;
  if (Il(e))
    throw Z("root stores cannot be attached to any parents");
  if (r)
    return Fs.set(e, n.parent), e;
  if (n) {
    const f = Is(n.parent);
    n.parent !== f && (n = {
      parent: f,
      path: n.path
    });
  }
  if (i && (n != null && n.parent) && (o != null && o.parent) && En(e) && Fa(e).valueType && (e = c0(e, { generateNewIds: !0 }), o = Ar(e, !1)), o && n) {
    if (o.parent === n.parent && t)
      return ay.set(e, n), RT(e), e;
    throw Z("an object cannot be assigned a new parent when it already has one");
  }
  const a = n ? void 0 : g0(e), s = e instanceof Qt;
  let c, u;
  if (s && (c = Qf(e, !1), u = Il(c) ? c : void 0), o != null && o.parent && k$(o.parent, e), ay.set(e, n), n != null && n.parent && H$(n.parent, e), RT(e), s) {
    const f = Qf(e, !1), d = Il(f) ? f : void 0;
    u !== d && (u || d) && z$(() => {
      u && FA(e), d && xA(d, e);
    });
  }
  return a == null || a(), e;
});
function um(e, n) {
  const t = Sn(e);
  return t.unchecked ? null : t.check(n, [], n);
}
function d0(e, n) {
  return xa.set(e, void 0), zr(
    e,
    // value
    n,
    !1,
    // indexChangeAllowed
    !1,
    // isDataObject
    // a frozen is not a value-type
    !1
    // cloneIfApplicable
  ), nm(e, { [VA]: !0, data: e.data }, void 0, !0), e;
}
function f0() {
  Ap(Os.Frozen, (e, n) => {
    if (e instanceof im)
      return d0(e, n);
  });
}
function JA(e, n) {
  return xa.set(e, void 0), zr(
    e,
    n,
    !1,
    // indexChangeAllowed
    !1,
    // isDataObject
    !0
    // cloneIfApplicable
  ), e;
}
function p0() {
  Ap(Os.Model, (e, n) => {
    if (En(e))
      return JA(e, n);
  });
}
let qT = !1;
function l0() {
  qT || (qT = !0, KM(), f0(), p0(), r0());
}
function y0(e, n) {
  let t, r, i;
  if (arguments.length === 1 ? (i = !1, t = e) : (r = e, i = !0, t = n), !Ct(t))
    throw Z("only objects can be turned into tree nodes");
  if (i && Xu()) {
    const o = um(r, t);
    o && o.throw();
  }
  return rr(t, !0) ? t : Rt(t, void 0);
}
const Xf = [];
function Ap(e, n) {
  Xf.push({ priority: e, tweaker: n }), Xf.sort((t, r) => t.priority - r.priority);
}
function m0(e, n) {
  if (vn(e))
    return e;
  if (rr(e, !0))
    return e = zr(
      e,
      n,
      !1,
      // indexChangeAllowed
      !1,
      // isDataObject
      !0
      // cloneIfApplicable
    ), e;
  if (cm(e))
    throw Z("data models are not directly supported. you may insert the data in the tree instead ('$' property).");
  l0();
  const t = Xf.length;
  for (let r = 0; r < t; r++) {
    const { tweaker: i } = Xf[r], o = i(e, n);
    if (o !== void 0)
      return o;
  }
  throw _p(e) ? Z("maps are not directly supported. consider using 'ObjectMap' / 'asMap' instead.") : bp(e) ? Z("sets are not directly supported. consider using 'ArraySet' / 'asSet' instead.") : Z(`tweak can only work over models, observable objects/arrays, or primitives, but got ${e} instead`);
}
const Rt = Oe("tweak", m0);
function g0(e) {
  if (vn(e))
    return;
  if (Nn && !As(e, !1))
    throw Z("assertion failed: object cannot be untweaked if it does not have a parent");
  const n = xa.get(e);
  if (!n)
    return;
  const t = Array.from(hp(e).values());
  for (let r = 0; r < t.length; r++)
    zr(
      t[r],
      // value
      void 0,
      // parentPath
      !1,
      // indexChangeAllowed
      !1,
      // isDataObject
      // no need to clone if unsetting the parent
      !1
      // cloneIfApplicable
    );
  return () => {
    n(), xa.delete(e), sM(e);
  };
}
const _y = Symbol("modelInitializers");
function T0(e) {
  return e[_y];
}
function YA(e, n) {
  const t = T0(e);
  if (t) {
    const r = t.length;
    for (let i = 0; i < r; i++)
      t[i](n);
  }
}
const _0 = Oe("newModel", (e, n, t) => {
  const { modelClass: r } = t, i = r;
  Nn && h0(i, "modelClass");
  const o = e;
  if (!yt.get(i))
    throw Z(`no model info for class ${i.name} could be found - did you forget to add the @model decorator?`);
  if (o.$ = n, Nn && TA(o, "$", !0), YA(i, o), Xu() && XA(i).dataType) {
    const s = o.typeCheck();
    s && s.throw();
  }
  return o;
}), b0 = /* @__PURE__ */ new WeakMap();
pA = Wf;
class ci {
  /**
   * Creates an instance of a data model.
   */
  constructor(n) {
    if (fe(this, pA), fe(this, "$"), !Ct(n))
      throw Z("data models can only work over data objects");
    const { modelClass: t } = arguments[1], r = t;
    let i;
    if (sy(n))
      i = n;
    else {
      if (!yt.get(r))
        throw Z(`no model info for class ${r.name} could be found - did you forget to add the @model decorator?`);
      const u = Yu(r), f = Object.assign({}, n), d = Object.keys(u);
      for (let p = 0; p < d.length; p++) {
        const T = d[p], b = u[T];
        let O = f[T], F = !1;
        b._transform && (F = !0, O = b._transform.untransform(O, this, T)), O == null && (b._defaultFn !== In ? (F = !0, O = b._defaultFn()) : b._defaultValue !== In && (F = !0, O = b._defaultValue)), F && (f[T] = O);
      }
      i = y0(f);
    }
    const o = tr(b0, r, () => /* @__PURE__ */ new WeakMap()), a = o.get(i);
    if (a)
      return a;
    o.set(i, this), Object.setPrototypeOf(this, r.prototype);
    const s = this;
    delete s[Wf], _0(this, i, {
      modelClass: r
    });
  }
  /**
   * Performs a type check over the model instance.
   * For this to work a data type has to be declared as part of the model properties.
   *
   * @returns A `TypeCheckError` or `null` if there is no error.
   */
  typeCheck() {
    const n = dm(this.constructor);
    return um(n, this.$);
  }
  toString(n) {
    const t = {
      withData: !0,
      ...n
    }, r = yt.get(this.constructor), i = `${this.constructor.name}#${r.name}`;
    return t.withData ? `[${i} ${JSON.stringify(Hn(this))}]` : `[${i}]`;
  }
}
function cm(e) {
  return e instanceof ci;
}
function Ps(e) {
  return !(typeof e != "function" || e !== ci && !(e.prototype instanceof ci));
}
function h0(e, n) {
  if (typeof e != "function")
    throw Z(`${n} must be a class`);
  if (e !== ci && !(e.prototype instanceof ci))
    throw Z(`${n} must extend DataModel`);
}
function XA(e) {
  if (cm(e))
    return e.constructor[Ru];
  if (Ps(e))
    return e[Ru];
  throw Z("modelClassOrInstance must be a model class or instance");
}
function qa(e) {
  const t = Ka(e).typeInfo;
  if (!t)
    throw Z(`type info not found for ${e}`);
  return t;
}
const KT = /* @__PURE__ */ new WeakMap();
function dm(e) {
  if (!Ps(e) && typeof e == "function") {
    const n = e;
    return Wr(() => dm(n()), (r) => new GT(r, n()));
  } else {
    const n = e, t = KT.get(n);
    if (t)
      return t;
    const r = (o) => new GT(o, n), i = Wr(() => {
      const o = yt.get(n), a = `DataModelData(${o.name})`, s = XA(n).dataType;
      if (!s)
        throw Z(`type checking cannot be performed over data model data of type '${o.name}' since that model type has no data type declared, consider adding a data type or using types.unchecked() instead`);
      const c = Sn(s), u = new kn(On.Object, (f, d, p) => c.check(f, d, p), () => a, r, (f) => c.snapshotType(f) ? u : null, (f) => c.fromSnapshotProcessor(f), (f) => c.toSnapshotProcessor(f));
      return u;
    }, r);
    return KT.set(n, i), i;
  }
}
class GT extends Nt {
  constructor(n, t) {
    super(n), fe(this, "modelClass"), fe(this, "_props", Ft(() => {
      const r = Yu(this.modelClass), i = {};
      return Object.keys(r).forEach((o) => {
        const a = r[o], s = a._typeChecker;
        let c;
        s && (c = qa(s));
        let u = !1, f;
        a._defaultFn !== In ? (f = a._defaultFn, u = !0) : a._defaultValue !== In && (f = a._defaultValue, u = !0), i[o] = {
          type: s,
          typeInfo: c,
          hasDefault: u,
          default: f
        };
      }), i;
    })), this.modelClass = t;
  }
  get props() {
    return this._props();
  }
  get modelType() {
    return yt.get(this.modelClass).name;
  }
}
function I0() {
  lm((e) => Ps(e) ? dm(e) : void 0);
}
const HT = /* @__PURE__ */ new WeakMap();
function fm(e) {
  if (!Zu(e) && typeof e == "function") {
    const n = e;
    return Wr(() => fm(n()), (r) => new kT(r, n()));
  } else {
    const n = e, t = HT.get(n);
    if (t)
      return t;
    const r = (o) => new kT(o, n), i = Wr(() => {
      const o = yt.get(n), a = `Model(${o.name})`, s = Fa(n).dataType, c = s ? Sn(s) : void 0, u = new kn(On.Object, (f, d, p) => f instanceof n ? c ? c.check(f.$, d, p) : null : new Bt(d, a, f, p), () => a, r, (f) => Ct(f) ? f[Le] !== void 0 ? f[Le] === o.name ? u : null : c && c.snapshotType(f) ? u : null : null, (f) => f[Le] ? f : {
        ...f,
        [Le]: o.name
      }, (f) => f);
      return u;
    }, r);
    return HT.set(n, i), i;
  }
}
class kT extends Nt {
  constructor(n, t) {
    super(n), fe(this, "modelClass"), fe(this, "_props", Ft(() => {
      const r = Yu(this.modelClass), i = {};
      return Object.keys(r).forEach((o) => {
        const a = r[o], s = a._typeChecker;
        let c;
        s && (c = qa(s));
        let u = !1, f;
        a._defaultFn !== In ? (f = a._defaultFn, u = !0) : a._defaultValue !== In && (f = a._defaultValue, u = !0), i[o] = {
          type: s,
          typeInfo: c,
          hasDefault: u,
          default: f
        };
      }), i;
    })), this.modelClass = t;
  }
  get props() {
    return this._props();
  }
  get modelType() {
    return yt.get(this.modelClass).name;
  }
}
function O0() {
  lm((e) => Zu(e) ? fm(e) : void 0);
}
const Ds = [];
function QA(e) {
  E$(e, "literal");
  let n;
  switch (e) {
    case void 0:
      n = "undefined";
      break;
    case null:
      n = "null";
      break;
    default:
      n = JSON.stringify(e);
      break;
  }
  const t = (i) => new P0(i, e), r = new kn(On.Primitive, (i, o, a) => i === e ? null : new Bt(o, n, i, a), () => n, t, (i) => i === e ? r : null, nr, nr);
  return r;
}
class P0 extends Nt {
  constructor(n, t) {
    super(n), fe(this, "literal"), this.literal = t;
  }
}
const ZA = QA(void 0);
Ds.push((e) => e === void 0 ? ZA : void 0);
const ew = QA(null);
Ds.push((e) => e === null ? ew : void 0);
const pm = new kn(On.Primitive, (e, n, t) => typeof e == "boolean" ? null : new Bt(n, "boolean", e, t), () => "boolean", (e) => new A0(e), (e) => typeof e == "boolean" ? pm : null, nr, nr);
Ds.push((e) => e === Boolean ? pm : void 0);
class A0 extends Nt {
}
const wp = new kn(On.Primitive, (e, n, t) => typeof e == "number" ? null : new Bt(n, "number", e, t), () => "number", (e) => new w0(e), (e) => typeof e == "number" ? wp : null, nr, nr);
Ds.push((e) => e === Number ? wp : void 0);
class w0 extends Nt {
}
const Us = new kn(On.Primitive, (e, n, t) => typeof e == "string" ? null : new Bt(n, "string", e, t), () => "string", (e) => new v0(e), (e) => typeof e == "string" ? Us : null, nr, nr);
Ds.push((e) => e === String ? Us : void 0);
class v0 extends Nt {
}
function S0() {
  Ds.forEach((e) => {
    lm(e);
  });
}
let WT = !1;
function R0() {
  WT || (WT = !0, O0(), I0(), S0());
}
const nw = [];
function lm(e) {
  nw.push(e);
}
function tw(e) {
  R0();
  for (const n of nw) {
    const t = n(e);
    if (t)
      return t;
  }
}
function Sn(e) {
  let n = e;
  for (; ; ) {
    if (n instanceof kn)
      return n;
    if (Zy(n))
      n = n();
    else {
      const t = tw(e);
      if (t)
        return Sn(t);
      throw Z("type checker could not be resolved");
    }
  }
}
function rw(e) {
  if (e instanceof kn || Zy(e))
    return e;
  {
    const n = tw(e);
    return n || void 0;
  }
}
function Ka(e) {
  const n = rw(e);
  if (n)
    return n;
  throw Z("standard type could not be resolved");
}
function Hn(e, n) {
  let t = nr, r;
  if (arguments.length >= 2 ? (t = Sn(e).toSnapshotProcessor, r = n) : r = e, vn(r))
    return t(r);
  cn(r, "nodeOrPrimitive");
  const i = Dt(r);
  if (!i)
    throw Z("getSnapshot is not supported for this kind of object");
  return Qn(i.transformed), uM(i), t(i.transformed);
}
const E0 = Oe("newModel", (e, n, t) => {
  Nn && aw(t, "modelClass");
  const { modelInfo: r, modelIdPropertyName: i, modelProps: o, modelIdPropData: a } = iw(t);
  if (i && a) {
    let u;
    n[i] ? u = n[i] : u = a._defaultFn(), Pn(n, i, u);
  }
  const s = e;
  s[Le] = r.name;
  const c = Object.keys(o);
  for (let u = 0; u < c.length; u++) {
    const f = c[u];
    if (f === i)
      continue;
    const d = o[f];
    let T = n[f], b = !1;
    if (d._transform && (b = !0, T = d._transform.untransform(T, s, f)), T == null) {
      const O = Eu(d);
      O !== In ? (b = !0, T = O) : f in n || (b = !0);
    }
    b && Zr(n, f, T);
  }
  if (ow(s, n, t), Xu() && Fa(t).dataType) {
    const u = s.typeCheck();
    u && u.throw();
  }
}), $0 = Oe("fromSnapshotModel", (e, n, t, r) => {
  Nn && aw(t, "modelClass");
  const { modelInfo: i, modelIdPropertyName: o, modelProps: a, modelIdPropData: s } = iw(t);
  let c, u = n.unprocessedSnapshot;
  s && o && (r ? c = s._defaultFn() : c = u[o]), t.fromSnapshotProcessor && (u = t.fromSnapshotProcessor(u));
  const f = n.snapshotToInitialData(u), d = e;
  d[Le] = i.name;
  const p = [], T = [];
  if (o) {
    const E = f[o];
    if (lM(f, o, c)) {
      const N = [o];
      p.push(es(N, E, c)), T.push(es(N, c, E));
    }
  }
  const b = Object.keys(a);
  for (let E = 0; E < b.length; E++) {
    const M = b[E];
    if (M === o)
      continue;
    const N = a[M], w = f[M];
    let _ = w, B = !1;
    if (_ == null) {
      const m = Eu(N);
      m !== In ? (B = !0, _ = m) : M in f || (B = !0);
    }
    if (B && (Zr(f, M, _), _ !== w)) {
      const m = [M];
      p.push(es(m, w, _)), T.push(es(m, _, w));
    }
  }
  const O = n == null ? void 0 : n.unprocessedModelType, F = i.name;
  if (O !== F) {
    const E = [Le];
    p.push(es(E, O, F)), T.push(es(E, F, O));
  }
  if (ow(d, f, t), LA(d, p, T), Xu() && Fa(t).dataType) {
    const E = d.typeCheck();
    E && E.throw();
  }
});
function iw(e) {
  const n = yt.get(e);
  if (!n)
    throw Z(`no model info for class ${e.name} could be found - did you forget to add the @model decorator?`);
  const t = Na(e), r = Yu(e), i = t ? r[t] : void 0;
  return { modelInfo: n, modelIdPropertyName: t, modelProps: r, modelIdPropData: i };
}
function ow(e, n, t) {
  JA(e, void 0), e.$ = am(n, { parent: e, path: "$" }, e[Le], !1, !0), Nn && TA(e, "$", !0), YA(t, e);
}
const zT = Symbol("modelIdPropertyName");
class Qt {
  /**
   * Creates an instance of a model.
   */
  constructor(n) {
    fe(this, _T), fe(this, TT), fe(this, gT), fe(this, mT), fe(this, yT), fe(this, "$");
    const t = n, { snapshotInitialData: r, modelClass: i, generateNewIds: o } = arguments[1];
    Object.setPrototypeOf(this, i.prototype);
    const a = this;
    delete a[Wf], delete a[vT], delete a[ST], delete a[zT], r ? $0(this, r, i, !!o) : (xs(t, "initialData"), E0(this, Ve.object(t, void 0, { deep: !1 }), i));
  }
  /**
   * Model internal id. Can be modified inside a model action.
   * It will return `undefined` if there's no id prop set.
   */
  get [(_T = Wf, TT = vT, gT = ST, mT = zT, yT = Le, lt)]() {
    const n = Na(this.constructor);
    return n ? this.$[n] : void 0;
  }
  set [lt](n) {
    const t = Na(this.constructor);
    if (!t)
      throw Z("$modelId cannot be set when there is no idProp set in the model");
    this.$[t] = n;
  }
  /**
   * Can be overridden to offer a reference id to be used in reference resolution.
   * By default it will use the `idProp` if available or return `undefined` otherwise.
   */
  getRefId() {
    return this[lt];
  }
  /**
   * Performs a type check over the model instance.
   * For this to work a data type has to be declared as part of the model properties.
   *
   * @returns A `TypeCheckError` or `null` if there is no error.
   */
  typeCheck() {
    const n = fm(this.constructor);
    return um(n, this);
  }
  toString(n) {
    const t = {
      withData: !0,
      ...n
    }, r = `${this.constructor.name}#${this[Le]}`;
    return t.withData ? `[${r} ${JSON.stringify(Hn(this))}]` : `[${r}]`;
  }
}
const M0 = /* @__PURE__ */ new Set([
  Le,
  lt,
  "onInit",
  "$",
  "getRefId",
  "onAttachedToRootStore",
  "typeCheck"
]);
function En(e) {
  return e instanceof Qt;
}
function Zu(e) {
  return !(typeof e != "function" || e !== Qt && !(e.prototype instanceof Qt));
}
function aw(e, n) {
  if (typeof e != "function")
    throw Z(`${n} must be a class`);
  if (e !== Qt && !(e.prototype instanceof Qt))
    throw Z(`${n} must extend Model`);
}
function vp(e) {
  return _r(e) && Le in e;
}
function Ar(e, n) {
  return n && j$(e), ay.get(e);
}
function ym(e, n) {
  const t = Fs.get(e);
  if (t)
    return { parent: t, path: "$" };
  const r = Ar(e, n);
  return r && En(r.parent) ? { parent: r.parent.$, path: r.path } : r;
}
function As(e, n) {
  var t;
  return (t = Ar(e, n)) == null ? void 0 : t.parent;
}
function C0(e, n) {
  var t;
  return (t = ym(e, n)) == null ? void 0 : t.parent;
}
function B0(e, n) {
  let t = e;
  const r = [], i = [e];
  let o;
  for (; o = Ar(t, n); )
    t = o.parent, r.unshift(o.path), i.unshift(o.parent);
  return { root: t, path: r, pathObjects: i };
}
function Qf(e, n) {
  let t = e, r;
  for (; r = Ar(t, n); )
    t = r.parent;
  return t;
}
function j0(e) {
  return cn(e, "value"), !As(e, !0);
}
const Pl = { resolved: !1 };
function Al(e, n) {
  let t = e;
  const r = n.length;
  for (let i = 0; i < r; i++) {
    if (!Ct(t))
      return Pl;
    const o = n[i];
    if (Fn(t) && +o >= t.length)
      return Pl;
    if (En(t)) {
      const a = Su(t);
      if (o in a)
        t = a;
      else if (!(o in t))
        return Pl;
    }
    t = t[o];
  }
  return { resolved: !0, value: t };
}
const sw = Symbol("skipIdChecking");
function wl(e, n, t) {
  var r;
  let i = Su(e);
  const o = n.length;
  for (let a = 0; a < o; a++) {
    if (!Ct(i))
      return { resolved: !1 };
    const s = n[a];
    if (Fn(i) && +s >= i.length)
      return { resolved: !1 };
    const c = i[s];
    i = Su(c);
    const u = t[a];
    if (u !== sw) {
      const f = En(c) && (r = c[lt]) != null ? r : null;
      if (u !== f)
        return { resolved: !1 };
    }
  }
  return { resolved: !0, value: Is(i) };
}
const x0 = /* @__PURE__ */ new WeakMap();
function F0(e) {
  const n = [];
  let t = e;
  for (; t; ) {
    const r = x0.get(t);
    r && r.length > 0 && n.push(r), t = As(t, !1);
  }
  return n;
}
function wr({ nameOrNameFn: e, fn: n, actionType: t, overrideContext: r, isFlowFinisher: i = !1 }) {
  let o = !1;
  const a = function(...s) {
    const c = typeof e == "function" ? e() : e;
    o || (o = !0, n = Oe(c, n));
    const u = Tp(), f = {
      actionName: c,
      type: t,
      target: this,
      args: s,
      parentContext: u,
      data: {},
      rootContext: void 0
      // will be set after the override
    };
    r && r(f, this), f.rootContext || (f.previousAsyncStepContext ? f.rootContext = f.previousAsyncStepContext.rootContext : f.parentContext ? f.rootContext = f.parentContext.rootContext : f.rootContext = f), AT(f);
    const d = F0(f.target);
    let p = d.length - 1, T = 0;
    const b = () => {
      const O = d[p];
      if (!O)
        return n.apply(this, s);
      const F = O[T];
      return T++, T >= O.length && (T = 0, p--), (F.filter ? F.filter(f) : !0) ? F.middleware(f, b) : b();
    };
    try {
      const O = b();
      if (i) {
        const F = O, E = F.value;
        return F.resolution === "accept" ? F.accepter(E) : F.rejecter(E), E;
      } else
        return O;
    } finally {
      AT(f.parentContext), J$();
    }
  };
  return a[yA] = !0, a;
}
function by(e, n, t) {
  const r = e[n];
  if (ky(r))
    return;
  const i = wr({
    nameOrNameFn: t,
    fn: r,
    actionType: Mt.Sync
  }), o = Object.getPrototypeOf(e);
  o[n] === r ? o[n] = i : e[n] = i;
}
function N0(e) {
  cn(e, "node"), D0().call(e);
}
const D0 = Ft(() => wr({
  nameOrNameFn: Gn.Detach,
  fn: U0,
  actionType: Mt.Sync
}));
function U0() {
  const n = ym(this, !1);
  if (!n)
    return;
  const { parent: t, path: r } = n;
  if (wn(t))
    t.splice(+r, 1);
  else if (Qe(t))
    Zt(t, String(r));
  else
    throw Z("parent must be an observable object or an observable array");
}
const vl = Symbol("unboundMethod"), JT = (e, n) => {
  const t = vl in e ? e[vl] : e, r = t.bind(n);
  return Object.getOwnPropertySymbols(t).forEach((i) => {
    r[i] = t[i];
  }), r[vl] = t, r;
};
function L0(e, n, t) {
  if (typeof n[1] != "object") {
    const r = n[0], i = n[1], o = n[2];
    Rl(e, r), YT("transaction", i, !1);
    const a = Sl(r, i, !0), s = () => {
      hA(r, bA, (c) => {
        const u = t(a, c[i]);
        c[i] = JT(u, c);
      });
    };
    if (o) {
      if (o.get !== void 0)
        throw Z(`@${e} cannot be used with getters`);
      if (o.value)
        return {
          enumerable: !1,
          writable: !0,
          configurable: !0,
          value: t(a, o.value)
        };
      s();
    } else
      s();
  } else {
    const r = n[1];
    switch (YT(e, r.name, r.static), r.kind) {
      case "method": {
        const i = n[0], o = r.name;
        let a = !1;
        r.addInitializer(function() {
          if (a)
            return;
          a = !0;
          const s = this;
          Rl(e, s);
          let c = this, u = Object.getPrototypeOf(c);
          for (; u && u[o] === i; )
            c = u, u = Object.getPrototypeOf(c);
          c[o] = t(Sl(s, o, !1), c[o]);
        });
        break;
      }
      case "field": {
        const i = r.name;
        let o;
        return function(a) {
          const s = this;
          o || (Rl(e, s), o = Sl(s, i, !1));
          const c = t(o, a);
          return JT(c, s);
        };
      }
      default:
        throw Z(`@${e} can only be used on fields or methods}`);
    }
  }
}
function YT(e, n, t) {
  if (Nn) {
    if (typeof n != "string")
      throw Z(`@${e} cannot decorate symbol properties`);
    if (t)
      throw Z(`@${e} cannot be used with static fields or methods`);
  }
}
const V0 = (e, n) => {
  e.target = n.$;
};
function Sl(e, n, t) {
  if (Ps(e) || cm(e)) {
    const r = Ps(e) ? e : e.constructor;
    let i;
    const o = (a) => {
      const s = yt.get(a);
      i = `fn::${s.name}::${n}`, S$(i, s.class, n);
    };
    return t ? hA(r, uy, o) : o(r), {
      actionName: () => i,
      overrideContext: V0
    };
  } else
    return { actionName: n, overrideContext: void 0 };
}
function Rl(e, n) {
  if (!Nn)
    return;
  const t = `@${e} must be used over model classes or instances`;
  if (!n)
    throw Z(t);
  if (!(n instanceof Qt || n === Qt || n.prototype instanceof Qt || n instanceof ci || n === ci || n.prototype instanceof ci))
    throw Z(t);
}
const q0 = Symbol("modelFlow");
function K0(e) {
  return typeof e == "function" && q0 in e;
}
const XT = /* @__PURE__ */ new Map();
function G0(e, n, t) {
  if (_A(n, e), XT.has(e) && IA("warn", `an standalone action with name "${e}" already exists (if you are using hot-reloading you may safely ignore this warning)`, `duplicateActionName - ${e}`), ky(n))
    throw Z("the standalone action must not be previously marked as an action");
  if (K0(n))
    throw Z("the standalone action must not be previously marked as a flow action");
  const r = wr({
    nameOrNameFn: e,
    fn: n,
    actionType: Mt.Sync
  }), i = (o, ...a) => (x$(o, "target"), r.call(o, o, ...a));
  return XT.set(e, i), i;
}
function H0(e, n) {
  cn(e, "node", !0), W0().call(e, n);
}
function k0(e) {
  Zt(this, String(e));
}
const W0 = Ft(() => wr({
  nameOrNameFn: Gn.ApplyDelete,
  fn: k0,
  actionType: Mt.Sync
}));
function z0(e, n, ...t) {
  return cn(e, "node"), Y0().call(e, n, t);
}
function J0(e, n) {
  return this[e](...n);
}
const Y0 = Ft(() => wr({
  nameOrNameFn: Gn.ApplyMethodCall,
  fn: J0,
  actionType: Mt.Sync
}));
function mm(e, n, t) {
  cn(e, "node", !0), Q0().call(e, n, t);
}
function X0(e, n) {
  !En(this) && mt(this) ? Pn(this, e, n) : this[e] = n;
}
const Q0 = Ft(() => wr({
  nameOrNameFn: Gn.ApplySet,
  fn: X0,
  actionType: Mt.Sync
}));
Gn.ApplySnapshot + "", Gn.ApplyPatches + "", Gn.Detach + "", Gn.ApplySet + "", Gn.ApplyDelete + "", Gn.ApplyMethodCall + "";
function Ut(...e) {
  return L0("modelAction", e, (n, t) => {
    if (ky(t))
      return t;
    if (typeof t != "function")
      throw Z("modelAction has to be used over functions");
    return wr({
      nameOrNameFn: n.actionName,
      fn: t,
      actionType: Mt.Sync,
      overrideContext: n.overrideContext
    });
  });
}
function Z0(e, n) {
  var t;
  const r = [];
  let i = e;
  for (let o = 0; o < n.length; o++) {
    i = i[n[o]];
    const a = En(i) && (t = i[lt]) != null ? t : null;
    r.push(a);
  }
  return r;
}
var QT;
(function(e) {
  e.Return = "return", e.Throw = "throw";
})(QT || (QT = {}));
function je(e, n, t, r) {
  var i = arguments.length, o = i < 3 ? n : r === null ? r = Object.getOwnPropertyDescriptor(n, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o = Reflect.decorate(e, n, t, r);
  else for (var s = e.length - 1; s >= 0; s--) (a = e[s]) && (o = (i < 3 ? a(o) : i > 3 ? a(n, t, o) : a(n, t)) || o);
  return i > 3 && o && Object.defineProperty(n, t, o), o;
}
function eC(e, n, t) {
  return _A(e, "objFn"), Wr(() => {
    const r = e();
    xs(r, "objectSchema");
    const i = Object.entries(r), o = (...c) => {
      const u = [];
      for (const [f, d] of i) {
        const p = Sn(d);
        let T = "...";
        c.includes(p) || (T = p.getTypeName(...c, p)), u.push(`${f}: ${T};`);
      }
      return `{ ${u.join(" ")} }`;
    }, a = (c, u) => {
      const f = {}, d = Object.keys(c);
      for (let p = 0; p < d.length; p++) {
        const T = d[p], b = r[T];
        if (b) {
          const O = Sn(b);
          f[T] = u === "from" ? O.fromSnapshotProcessor(c[T]) : O.toSnapshotProcessor(c[T]);
        } else
          f[T] = c[T];
      }
      return f;
    }, s = new kn(On.Object, (c, u, f) => {
      if (!Ct(c) || n)
        return new Bt(u, o(s), c, f);
      for (const [d, p] of i) {
        const T = Sn(p), b = c[d], O = T.check(b, [...u, d], f);
        if (O)
          return O;
      }
      return null;
    }, o, t, (c) => {
      if (!Ct(c))
        return null;
      for (const [u, f] of i) {
        const d = Sn(f), p = c[u];
        if (!d.snapshotType(p))
          return null;
      }
      return s;
    }, (c) => a(c, "from"), (c) => a(c, "to"));
    return s;
  }, t);
}
function nC(e) {
  return eC(e, !1, (t) => new tC(t, e));
}
class tC extends Nt {
  constructor(n, t) {
    super(n), fe(this, "_objTypeFn"), fe(this, "_props", Ft(() => {
      const r = this._objTypeFn(), i = {};
      return Object.keys(r).forEach((o) => {
        const a = Ka(r[o]);
        i[o] = { type: a, typeInfo: qa(a) };
      }), i;
    })), this._objTypeFn = t;
  }
  get props() {
    return this._props();
  }
}
const uw = new kn(On.Any, null, () => "any", (e) => new rC(e), () => uw, nr, nr);
function ws() {
  return uw;
}
class rC extends Nt {
}
function iC(e, ...n) {
  const t = n.slice();
  let r;
  const i = rw(e);
  if (i)
    t.unshift(i);
  else {
    const a = e;
    r = (s) => {
      const c = a(s);
      return Sn(c);
    };
  }
  if (t.length <= 0)
    throw Z("or type must have at least 1 possible type");
  const o = (a) => new oC(a, t.map(Ka));
  return Wr(() => {
    const a = t.map(Sn);
    if (a.some((f) => f.unchecked))
      return ws();
    const s = (...f) => a.map((p) => f.includes(p) ? "..." : p.getTypeName(...f, p)).join(" | ");
    let c;
    a.some((f) => f.baseType !== a[0].baseType) ? c = On.Any : c = a[0].baseType;
    const u = new kn(c, (f, d, p) => a.some((b) => !b.check(f, d, p)) ? null : new Bt(d, s(u), f, p), s, o, (f) => {
      const d = rM(f), p = a.filter((T) => T.baseType === d || T.baseType === On.Any);
      if (p.length === 1 && p[0].baseType === d)
        return p[0];
      for (let T = 0; T < p.length; T++) {
        const b = p[T].snapshotType(f);
        if (b)
          return b;
      }
      return null;
    }, (f) => {
      const d = r ? r(f) : u.snapshotType(f);
      if (!d)
        throw Z(`snapshot '${JSON.stringify(f)}' does not match the following type: ${s(u)}`);
      return d.fromSnapshotProcessor(f);
    }, (f) => {
      const d = r ? r(f) : u.snapshotType(f);
      if (!d)
        throw Z(`snapshot '${JSON.stringify(f)}' does not match the following type: ${s(u)}`);
      return d.toSnapshotProcessor(f);
    });
    return u;
  }, o);
}
class oC extends Nt {
  constructor(n, t) {
    super(n), fe(this, "orTypes"), fe(this, "_orTypeInfos", Ft(() => this.orTypes.map(qa))), this.orTypes = t;
  }
  get orTypeInfos() {
    return this._orTypeInfos();
  }
}
const aC = Symbol("noDefaultValue"), ZT = /* @__PURE__ */ new WeakMap();
function sC(e, n, t) {
  let r = ZT.get(e);
  r || (r = /* @__PURE__ */ new Map(), ZT.set(e, r));
  let i = r.get(n);
  return i || (i = t(), r.set(n, i)), i;
}
function Hr(e, n) {
  switch (typeof e) {
    case "string":
      return Hr(Us, e);
    case "number":
      return Hr(wp, e);
    case "boolean":
      return Hr(pm, e);
  }
  const t = arguments.length >= 2, r = Ka(e);
  return sC(r, t ? n : aC, () => {
    const i = t ? iC(r, ZA, ew) : r, o = Object.create(t ? cy(n) : cy());
    return Object.assign(o, {
      _typeChecker: r,
      _fromSnapshotProcessor: uC.bind(void 0, i),
      _toSnapshotProcessor: cC.bind(void 0, r)
    }), o;
  });
}
function uC(e, n) {
  const t = Sn(e).fromSnapshotProcessor;
  return t ? t(n) : n;
}
function cC(e, n) {
  const t = Sn(e).toSnapshotProcessor;
  return t ? t(n) : n;
}
function e_(...e) {
  const n = e.filter((r) => !!r);
  return n.length <= 0 ? void 0 : (r, ...i) => {
    let o = r;
    for (let a = 0; a < n.length; a++)
      o = n[a](o, ...i);
    return o;
  };
}
function dC(e, n) {
  var t;
  const r = (t = e._transform) == null ? void 0 : t.transform;
  if (!r)
    return function() {
      return this.$[n];
    };
  const i = (o, a) => r(a, o, n, (s) => {
    mm(o.$, n, s);
  });
  return function() {
    const o = this.$[n];
    return i(this, o);
  };
}
const cw = (e, n, t, r) => {
  if (e._setter === "assign" && !Tp()) {
    mm(t, n, r);
    return;
  }
  let i = e._transform ? e._transform.untransform(r, t, n) : r;
  if (i == null) {
    const o = Eu(e);
    o !== In && (i = o);
  }
  t.$[n] = i;
}, fC = (e, n, t, r) => t[Jy] ? (cw(e, n, t, r), !0) : !1, dw = () => wA().modelIdGenerator(), fw = Hr(Us, dw);
fw._isId = !0;
const pw = cy(dw);
pw._isId = !0;
function pC({ modelProps: e, baseModel: n, type: t, valueType: r, fromSnapshotProcessor: i, toSnapshotProcessor: o }) {
  xs(e, "modelProps"), e = Object.assign(/* @__PURE__ */ Object.create(null), e);
  const a = e, s = Object.keys(a).filter((N) => a[N]._isId);
  if (s.length > 1)
    throw Z(`expected at most one idProp but got many: ${JSON.stringify(s)}`);
  const c = Object.values(a).some((N) => !!N._typeChecker);
  let u;
  if (s.length > 0) {
    u = s[0];
    const N = a[u];
    let w = c ? fw : pw;
    switch (N._setter) {
      case !0:
        w = w.withSetter();
        break;
      case "assign":
        w = w.withSetter("assign");
        break;
    }
    a[u] = w;
  }
  let f;
  if (c) {
    const N = {};
    for (const [w, _] of Object.entries(a))
      N[w] = _._typeChecker ? _._typeChecker : ws();
    f = nC(() => N);
  }
  const d = Qt, p = M0;
  let T;
  function b(N, w) {
    var _;
    const B = (_ = w == null ? void 0 : w.modelClass) != null ? _ : this.constructor, m = new d(N, {
      ...w,
      modelClass: B
    });
    return gA(m, Jy, !1, !0), T || (T = Object.keys(e).filter((P) => !p.has(P) && Object.hasOwn(m, P))), T.forEach((P) => {
      delete m[P];
    }), m;
  }
  Object.assign(b, d);
  const O = d[_y];
  O && (b[_y] = O.slice()), N$(b, a);
  {
    const N = {
      dataType: f,
      modelIdProperty: u,
      valueType: r
    };
    b[Ru] = N;
  }
  b.prototype = Object.create(d.prototype), b.prototype.constructor = b;
  let F = (N, w, _, B) => {
    fC(N, w, _, B) && (F = cw);
  };
  for (const [N, w] of Object.entries(e)) {
    if (!p.has(N)) {
      const _ = dC(w, N);
      Object.defineProperty(b.prototype, N, {
        get: _,
        set(B) {
          F(w, N, this, B);
        },
        enumerable: !0,
        configurable: !1
      });
    }
    if (w._setter === !0) {
      const _ = M$(N);
      if (!p.has(_)) {
        const B = Ut(b.prototype, _, {
          value: function(m) {
            this[N] = m;
          },
          writable: !0,
          enumerable: !1,
          configurable: !1
        });
        Object.defineProperty(b.prototype, _, B);
      }
    }
  }
  const E = lC(a), M = yC(a);
  return b.fromSnapshotProcessor = e_(i, E), b.toSnapshotProcessor = e_(M, o), b;
}
function lC(e) {
  const n = Object.entries(e).filter(([t, r]) => r._fromSnapshotProcessor);
  if (!(n.length <= 0))
    return (t) => {
      const r = { ...t };
      for (const [i, o] of n)
        o._fromSnapshotProcessor && (r[i] = o._fromSnapshotProcessor(t[i]));
      return r;
    };
}
function yC(e) {
  const n = Object.entries(e).filter(([t, r]) => r._toSnapshotProcessor);
  if (!(n.length <= 0))
    return (t) => {
      const r = { ...t };
      for (const [i, o] of n)
        o._toSnapshotProcessor && (r[i] = o._toSnapshotProcessor(t[i]));
      return r;
    };
}
function Sp(e, n) {
  const t = typeof e == "function" ? e() : e;
  return mC(t, void 0);
}
function mC(e, n, t) {
  var r;
  return pC({
    modelProps: e,
    baseModel: n,
    type: "class",
    valueType: (r = void 0) != null ? r : !1,
    fromSnapshotProcessor: void 0,
    toSnapshotProcessor: void 0
  });
}
const Rp = (e) => (n, ...t) => {
  const r = typeof t[1] == "object" ? t[1] : void 0;
  return TC(e, n, r == null ? void 0 : r.addInitializer);
}, lw = /* @__PURE__ */ new WeakMap(), yw = (e, n) => {
  Hf(n, bA);
  const t = lw.get(e);
  if (t.needsMakeObservable)
    kf.makeObservable(n);
  else if (t.needsMakeObservable === void 0)
    if (zy() >= 6)
      try {
        kf.makeObservable(n), t.needsMakeObservable = !0;
      } catch (r) {
        const i = r;
        if (i.message !== "[MobX] No annotations were passed to makeObservable, but no decorator members have been found either" && i.message !== "[MobX] No annotations were passed to makeObservable, but no decorated members have been found either")
          throw i;
        t.needsMakeObservable = !1;
      }
    else
      t.needsMakeObservable = !1;
  n[Jy] = !0, Hf(n, $$), t.type === "class" && n.onInit && (by(n, "onInit", Da.OnInit), n.onInit()), t.type === "data" && n.onLazyInit && (by(n, "onLazyInit", Da.OnLazyInit), n.onLazyInit());
}, gC = {
  construct(e, n) {
    const t = new e(...n);
    return yw(e, t), t;
  }
}, TC = (e, n, t) => {
  const r = Zu(n) ? "class" : Ps(n) ? "data" : void 0;
  if (!r)
    throw Z("clazz must be a class that extends from Model/DataModel");
  if ($f[e] && IA("warn", `a model with name "${e}" already exists (if you are using hot-reloading you may safely ignore this warning)`, `duplicateModelName - ${e}`), bl in n && n[bl] === n)
    throw Z("a class already decorated with `@model` cannot be re-decorated");
  if (n.toString = () => `class ${n.name}#${e}`, r === "class" && (n[Le] = e), lw.set(n, { needsMakeObservable: void 0, type: r }), t) {
    t(function() {
      yw(n, this);
    });
    const i = {
      name: e,
      class: n
    };
    $f[e] = i, yt.set(n, i), Hf(n, uy);
    return;
  } else {
    const i = new Proxy(n, gC);
    i.prototype.constructor = i, i[bl] = n;
    const o = {
      name: e,
      class: i
    };
    return $f[e] = o, yt.set(i, o), yt.set(n, o), Hf(n, uy), i;
  }
};
function hy(e) {
  const n = (t) => new _C(t, Ka(e));
  return Wr(() => {
    const t = Sn(e), r = (...o) => `Array<${t.getTypeName(...o, t)}>`, i = new kn(On.Array, (o, a, s) => {
      if (!Fn(o))
        return new Bt(a, r(i), o, s);
      if (!t.unchecked)
        for (let c = 0; c < o.length; c++) {
          const u = t.check(o[c], [...a, c], s);
          if (u)
            return u;
        }
      return null;
    }, r, n, (o) => {
      if (!Fn(o))
        return null;
      if (!t.unchecked) {
        for (let a = 0; a < o.length; a++)
          if (!t.snapshotType(o[a]))
            return null;
      }
      return i;
    }, (o) => t.unchecked ? o : o.map((a) => t.fromSnapshotProcessor(a)), (o) => t.unchecked ? o : o.map((a) => t.toSnapshotProcessor(a)));
    return i;
  }, n);
}
class _C extends Nt {
  constructor(n, t) {
    super(n), fe(this, "itemType"), this.itemType = t;
  }
  get itemTypeInfo() {
    return qa(this.itemType);
  }
}
var Zf;
(function(e) {
  e.Single = "single", e.Group = "group";
})(Zf || (Zf = {}));
function ep(e, n) {
  if (e.type === Zf.Single)
    return [e];
  {
    const t = [];
    for (const r of e.events)
      n ? t.unshift(...ep(r, !0)) : t.push(...ep(r, !1));
    return t;
  }
}
let fi = class extends Sp({
  // TODO: add proper type checking to undo store
  undoEvents: Hr(hy(ws()), () => []),
  redoEvents: Hr(hy(ws()), () => [])
}) {
  constructor() {
    super(...arguments), fe(this, "_groupStack", []);
  }
  /**
   * @ignore
   */
  _clearUndo() {
    Pa(() => {
      this.undoEvents.length = 0;
    });
  }
  /**
   * @ignore
   */
  _clearRedo() {
    Pa(() => {
      this.redoEvents.length = 0;
    });
  }
  /**
   * @ignore
   */
  enforceMaxLevels({ maxUndoLevels: n, maxRedoLevels: t }) {
    if (n !== void 0)
      for (; this.undoEvents.length > n; )
        this.undoEvents.shift();
    if (t !== void 0)
      for (; this.redoEvents.length > t; )
        this.redoEvents.shift();
  }
  /**
   * @ignore
   */
  _undo({ maxRedoLevels: n }) {
    Pa(() => {
      const t = this.undoEvents.pop();
      this.redoEvents.push(t), this.enforceMaxLevels({ maxRedoLevels: n });
    });
  }
  /**
   * @ignore
   */
  _redo({ maxUndoLevels: n }) {
    Pa(() => {
      const t = this.redoEvents.pop();
      this.undoEvents.push(t), this.enforceMaxLevels({ maxUndoLevels: n });
    });
  }
  /**
   * @ignore
   */
  _addUndo({ event: n, maxUndoLevels: t }) {
    Pa(() => {
      this.undoEvents.push(n), this.redoEvents.length = 0, this.enforceMaxLevels({ maxUndoLevels: t });
    });
  }
  /**
   * @ignore
   */
  _addUndoToParentGroup(n, t) {
    n.events.push(t);
  }
  /**
   * @ignore
   */
  get _currentGroup() {
    return this._groupStack[this._groupStack.length - 1];
  }
  /**
   * @ignore
   */
  _startGroup(n, t, r) {
    var i;
    let o = !1, a = !1;
    const s = this._currentGroup, c = {
      type: Zf.Group,
      groupName: n,
      events: []
    }, u = s || (i = r == null ? void 0 : r.attachedState) == null ? void 0 : i.save(), f = {
      pause: () => {
        if (a)
          throw Z("cannot pause a group when it is already ended");
        if (!o)
          throw Z("cannot pause a group when it is not running");
        if (this._currentGroup !== c)
          throw Z("group out of order");
        this._groupStack.pop(), o = !1;
      },
      resume: () => {
        if (a)
          throw Z("cannot resume a group when it is already ended");
        if (o)
          throw Z("cannot resume a group when it is already running");
        this._groupStack.push(c), o = !0;
      },
      end: () => {
        var d;
        o && f.pause(), a = !0, s ? this._addUndoToParentGroup(s, c) : this._addUndo({
          event: {
            ...c,
            attachedState: {
              beforeEvent: u,
              afterEvent: (d = r == null ? void 0 : r.attachedState) == null ? void 0 : d.save()
            }
          },
          maxUndoLevels: r == null ? void 0 : r.maxUndoLevels
        });
      }
    };
    return t && f.resume(), f;
  }
};
je([
  Ut
], fi.prototype, "_clearUndo", null);
je([
  Ut
], fi.prototype, "_clearRedo", null);
je([
  Ut
], fi.prototype, "_undo", null);
je([
  Ut
], fi.prototype, "_redo", null);
je([
  Ut
], fi.prototype, "_addUndo", null);
fi = je([
  Rp(`${zu}/UndoStore`)
], fi);
class vr {
  /**
   * Creates an instance of `UndoManager`.
   * Do not use directly, use `undoMiddleware` instead.
   *
   * @param disposer
   * @param subtreeRoot
   * @param [store]
   */
  constructor(n, t, r, i) {
    fe(this, "disposer"), fe(this, "subtreeRoot"), fe(this, "options"), fe(this, "store"), fe(this, "_isUndoRecordingDisabled", !1), this.disposer = n, this.subtreeRoot = t, this.options = i, zy() >= 6 && kf.makeObservable(this), this.store = r ?? new fi({});
  }
  /**
   * The undo stack, where the first operation to undo will be the last of the array.
   * Do not manipulate this array directly.
   */
  get undoQueue() {
    return this.store.undoEvents;
  }
  /**
   * The redo stack, where the first operation to redo will be the last of the array.
   * Do not manipulate this array directly.
   */
  get redoQueue() {
    return this.store.redoEvents;
  }
  /**
   * The number of undo actions available.
   */
  get undoLevels() {
    return this.undoQueue.length;
  }
  /**
   * If undo can be performed (if there is at least one undo action available).
   */
  get canUndo() {
    return this.undoLevels > 0;
  }
  /**
   * Clears the undo queue.
   */
  clearUndo() {
    this.store._clearUndo();
  }
  /**
   * The number of redo actions available.
   */
  get redoLevels() {
    return this.redoQueue.length;
  }
  /**
   * If redo can be performed (if there is at least one redo action available)
   */
  get canRedo() {
    return this.redoLevels > 0;
  }
  /**
   * Clears the redo queue.
   */
  clearRedo() {
    this.store._clearRedo();
  }
  /**
   * Undoes the last action.
   * Will throw if there is no action to undo.
   */
  undo() {
    var n;
    if (!this.canUndo)
      throw Z("nothing to undo");
    const t = this.undoQueue[this.undoQueue.length - 1];
    Pa(() => {
      var r, i, o;
      ep(t, !0).forEach((a) => {
        Mu(this.subtreeRoot, a.inversePatches, !0);
      }), (r = t.attachedState) != null && r.beforeEvent && ((o = (i = this.options) == null ? void 0 : i.attachedState) == null || o.restore(t.attachedState.beforeEvent));
    }), this.store._undo({ maxRedoLevels: (n = this.options) == null ? void 0 : n.maxRedoLevels });
  }
  /**
   * Redoes the previous action.
   * Will throw if there is no action to redo.
   */
  redo() {
    var n;
    if (!this.canRedo)
      throw Z("nothing to redo");
    const t = this.redoQueue[this.redoQueue.length - 1];
    Pa(() => {
      var r, i, o;
      ep(t, !1).forEach((a) => {
        Mu(this.subtreeRoot, a.patches);
      }), (r = t.attachedState) != null && r.afterEvent && ((o = (i = this.options) == null ? void 0 : i.attachedState) == null || o.restore(t.attachedState.afterEvent));
    }), this.store._redo({ maxUndoLevels: (n = this.options) == null ? void 0 : n.maxUndoLevels });
  }
  /**
   * Disposes the undo middleware.
   */
  dispose() {
    this.disposer();
  }
  /**
   * Returns if undo recording is currently disabled or not for this particular `UndoManager`.
   */
  get isUndoRecordingDisabled() {
    return this._isUndoRecordingDisabled;
  }
  /**
   * Skips the undo recording mechanism for the code block that gets run synchronously inside.
   *
   * @typeparam T Code block return type.
   * @param fn Code block to run.
   * @returns The value returned by the code block.
   */
  withoutUndo(n) {
    const t = this._isUndoRecordingDisabled;
    this._isUndoRecordingDisabled = !0;
    try {
      return n();
    } finally {
      this._isUndoRecordingDisabled = t;
    }
  }
  /**
   * Creates a custom group that can be continued multiple times and then ended.
   * @param groupName Optional group name.
   * @returns An API to continue/end the group.
   */
  createGroup(n) {
    const t = this.store._startGroup(n, !1, this.options);
    return {
      continue(r) {
        t.resume();
        try {
          return r();
        } finally {
          t.pause();
        }
      },
      end() {
        t.end();
      }
    };
  }
  withGroup(n, t) {
    let r, i;
    typeof n == "string" ? (r = n, i = t) : i = n;
    const o = this.store._startGroup(r, !0, this.options);
    try {
      return i();
    } finally {
      o.end();
    }
  }
  withGroupFlow(n, t) {
    let r, i;
    typeof n == "string" ? (r = n, i = t) : i = n;
    const o = i(), a = this.store._startGroup(r, !1, this.options), s = o.next.bind(o), c = o.throw.bind(o);
    return new Promise((f, d) => {
      function p(O) {
        a.resume();
        let F;
        try {
          F = s(O);
        } catch (E) {
          a.end(), d(E);
          return;
        }
        a.pause(), b(F);
      }
      function T(O) {
        a.resume();
        let F;
        try {
          F = c(O);
        } catch (E) {
          a.end(), d(E);
          return;
        }
        a.pause(), b(F);
      }
      function b(O) {
        O && typeof O.then == "function" ? O.then(b, d) : O.done ? (a.end(), f(O.value)) : Promise.resolve(O.value).then(p, T);
      }
      p(void 0);
    });
  }
}
je([
  dn
], vr.prototype, "undoQueue", null);
je([
  dn
], vr.prototype, "redoQueue", null);
je([
  dn
], vr.prototype, "undoLevels", null);
je([
  dn
], vr.prototype, "canUndo", null);
je([
  Oe
], vr.prototype, "clearUndo", null);
je([
  dn
], vr.prototype, "redoLevels", null);
je([
  dn
], vr.prototype, "canRedo", null);
je([
  Oe
], vr.prototype, "clearRedo", null);
je([
  Oe
], vr.prototype, "undo", null);
je([
  Oe
], vr.prototype, "redo", null);
let El = !1;
function Pa(e) {
  const n = El;
  El = !0;
  try {
    return e();
  } finally {
    El = n;
  }
}
function $l(e) {
  return e.type === "value" ? e.value : e.value.get();
}
const bC = () => Qr("contextValue");
class hC {
  constructor(n) {
    fe(this, "defaultContextValue", Ve.box(void 0, { deep: !1 })), fe(this, "overrideContextValue", Ve.box(void 0, {
      deep: !1
    })), fe(this, "nodeContextValue", /* @__PURE__ */ new WeakMap()), fe(this, "nodeAtom", /* @__PURE__ */ new WeakMap()), fe(this, "setDefault", Oe((t) => {
      this.defaultContextValue.set({
        type: "value",
        value: t
      });
    })), fe(this, "setDefaultComputed", Oe((t) => {
      this.defaultContextValue.set({
        type: "computed",
        value: dn(t)
      });
    })), fe(this, "set", Oe((t, r) => {
      cn(t, "node"), this.nodeContextValue.set(t, {
        type: "value",
        value: r
      }), this.reportNodeAtomChanged(t);
    })), fe(this, "setComputed", Oe((t, r) => {
      this._setComputed(t, dn(r));
    })), fe(this, "unset", Oe((t) => {
      cn(t, "node"), this.nodeContextValue.delete(t), this.reportNodeAtomChanged(t);
    })), fe(this, "apply", Oe((t, r) => {
      const i = this.overrideContextValue.get();
      this.overrideContextValue.set({
        type: "value",
        value: r
      });
      try {
        const o = t();
        return rr(o, !0) && this.set(o, r), o;
      } finally {
        this.overrideContextValue.set(i);
      }
    })), fe(this, "applyComputed", Oe((t, r) => {
      const i = dn(r), o = this.overrideContextValue.get();
      this.overrideContextValue.set({
        type: "computed",
        value: i
      });
      try {
        const a = t();
        return rr(a, !0) && this._setComputed(a, i), a;
      } finally {
        this.overrideContextValue.set(o);
      }
    })), this.setDefault(n);
  }
  reportNodeAtomObserved(n) {
    tr(this.nodeAtom, n, bC).reportObserved();
  }
  reportNodeAtomChanged(n) {
    var t;
    (t = this.nodeAtom.get(n)) == null || t.reportChanged();
  }
  fastGet(n, t) {
    t && this.reportNodeAtomObserved(n);
    const r = this.nodeContextValue.get(n);
    if (r)
      return $l(r);
    const i = As(n, t);
    if (!i) {
      const o = this.overrideContextValue.get();
      return o ? $l(o) : this.getDefault();
    }
    return this.fastGet(i, t);
  }
  get(n) {
    return cn(n, "node"), this.fastGet(n, !0);
  }
  fastGetProviderNode(n, t) {
    if (t && this.reportNodeAtomObserved(n), this.nodeContextValue.get(n))
      return n;
    const i = As(n, t);
    if (i)
      return this.fastGetProviderNode(i, t);
  }
  getProviderNode(n) {
    return cn(n, "node"), this.fastGetProviderNode(n, !0);
  }
  getDefault() {
    return $l(this.defaultContextValue.get());
  }
  _setComputed(n, t) {
    cn(n, "node"), this.nodeContextValue.set(n, { type: "computed", value: t }), this.reportNodeAtomChanged(n);
  }
}
function mw(e) {
  return new hC(e);
}
mw(!1);
let ec = class extends Sp({
  /**
   * Reference id.
   */
  id: Hr(Us)
}) {
  /**
   * The object this reference points to, or `undefined` if the reference is currently invalid.
   */
  get maybeCurrent() {
    return this.resolve();
  }
  /**
   * If the reference is currently valid.
   */
  get isValid() {
    return !!this.maybeCurrent;
  }
  /**
   * The object this reference points to, or throws if invalid.
   */
  get current() {
    const n = this.maybeCurrent;
    if (!n)
      throw Z(`a reference of type '${this[Le]}' could not resolve an object with id '${this.id}'`);
    return n;
  }
};
je([
  dn
], ec.prototype, "maybeCurrent", null);
je([
  dn
], ec.prototype, "isValid", null);
je([
  dn
], ec.prototype, "current", null);
const n_ = /* @__PURE__ */ new WeakMap();
function gw(e, n, t, r) {
  let i = class extends ec {
    constructor() {
      super(...arguments), fe(this, "resolver"), fe(this, "savedOldTarget");
    }
    resolve() {
      return this.resolver || (this.resolver = n(this)), this.resolver(this);
    }
    internalForceUpdateBackRefs(c) {
      const u = this.savedOldTarget;
      this.savedOldTarget = c, PC(this, a, c, u);
    }
    forceUpdateBackRefs() {
      this.internalForceUpdateBackRefs(this.maybeCurrent);
    }
    onInit() {
      let c, u = !0;
      zP(() => this.maybeCurrent, (f) => {
        this.internalForceUpdateBackRefs(f);
        const d = c, p = u;
        c = f, u = !1, !p && r && f !== d && r(this, f, d);
      }, { fireImmediately: !0 });
    }
  };
  je([
    Oe
  ], i.prototype, "forceUpdateBackRefs", null), i = je([
    Rp(e)
  ], i);
  const o = (s) => {
    let c;
    if (typeof s == "string" ? c = s : (xs(s, "target"), c = t(s)), typeof c != "string")
      throw Z("ref target object must have an id of string type");
    return new i({
      id: c
    });
  };
  o.refClass = i;
  const a = o;
  return a;
}
function gm(e) {
  if (En(e)) {
    const n = e.getRefId();
    if (n !== void 0 && typeof n != "string")
      throw Z("'getRefId()' must return a string or undefined when present");
    return n;
  }
}
const IC = /* @__PURE__ */ new WeakMap();
function OC(e, n, t = gm) {
  const i = tr(IC, t, () => Q$((o) => t(o))).walk(e);
  return i ? i.get(n) : void 0;
}
function jc(e, n) {
  let t = n_.get(e);
  if (t || (t = {
    all: Ve.set(void 0, { deep: !1 }),
    byType: /* @__PURE__ */ new WeakMap()
  }, n_.set(e, t)), n) {
    let r = t.byType.get(n);
    return r || (r = Ve.set(void 0, { deep: !1 }), t.byType.set(n, r)), r;
  } else
    return t.all;
}
const PC = Oe("updateBackRefs", (e, n, t, r) => {
  t !== r && (r && (jc(r).delete(e), jc(r, n).delete(e)), t && (jc(t).add(e), jc(t, n).add(e)));
});
RA({
  initData() {
    return {
      all: /* @__PURE__ */ new Set(),
      byType: /* @__PURE__ */ new WeakMap()
    };
  },
  addNode(e, n) {
    e instanceof ec && (n.all.add(e), tr(n.byType, e.constructor, () => /* @__PURE__ */ new Set()).add(e));
  }
});
Oe("customRef", (e, n) => {
  var t;
  const r = (t = n.getId) != null ? t : gm;
  return gw(e, () => n.resolve, r, n.onResolvedValueChange);
});
Oe("rootRef", (e, n) => {
  var t;
  const r = (t = n == null ? void 0 : n.getId) != null ? t : gm, i = n == null ? void 0 : n.onResolvedValueChange;
  return gw(e, (a) => {
    let s;
    return () => {
      const c = Qf(a, !0);
      if (AC(a, c, s, r))
        return s;
      const u = OC(c, a.id, r);
      return u && (s = u), u;
    };
  }, r, i);
});
function AC(e, n, t, r) {
  return !(!t || e.id !== r(t) || n !== Qf(t, !0));
}
function Tn(e, n) {
  return G0(e, n);
}
function wC(e, ...n) {
  return e.splice(...n);
}
const Kn = `${zu}/arrayActions`;
Tn(`${Kn}::set`, (e, n, t) => {
  Pn(e, n, t);
}), Tn(`${Kn}::delete`, (e, n) => Zt(e, String(n))), Tn(`${Kn}::setLength`, (e, n) => {
  e.length = n;
}), Tn(`${Kn}::concat`, (e, ...n) => e.concat(...n)), Tn(`${Kn}::copyWithin`, (e, n, t, r) => e.copyWithin(n, t, r)), Tn(`${Kn}::fill`, (e, n, t, r) => e.fill(n, t, r)), Tn(`${Kn}::pop`, (e) => e.pop()), Tn(`${Kn}::push`, (e, ...n) => e.push(...n)), Tn(`${Kn}::reverse`, (e) => e.reverse()), Tn(`${Kn}::shift`, (e) => e.shift()), Tn(`${Kn}::slice`, (e, n, t) => e.slice(n, t)), Tn(`${Kn}::sort`, (e, n) => e.sort(n)), Tn(`${Kn}::splice`, wC), Tn(`${Kn}::unshift`, (e, ...n) => e.unshift(...n)), Tn(`${Kn}::swap`, (e, n, t) => {
  if (n < 0 || t < 0 || n >= e.length || t >= e.length)
    return !1;
  t < n && ([n, t] = [t, n]);
  const [r] = e.splice(n, 1), [i] = e.splice(t - 1, 1);
  return e.splice(n, 0, i), e.splice(t, 0, r), !0;
});
const xc = `${zu}/objectActions`;
Tn(`${xc}::set`, (e, n, t) => {
  mt(e) ? Pn(e, n, t) : e[n] = t;
}), Tn(`${xc}::assign`, (e, n) => {
  xs(n, "partialObject");
  const t = Object.keys(n);
  if (mt(e))
    for (const r of t) {
      const i = n[r];
      Pn(e, r, i);
    }
  else
    for (const r of t)
      e[r] = n[r];
}), Tn(`${xc}::delete`, (e, n) => Zt(e, n)), Tn(`${xc}::call`, (e, n, ...t) => e[n](...t));
Oe((e) => {
  if (Nn && !Qe(e))
    throw Z("assertion failed: expected an observable object");
  const n = Wt(() => pp(() => {
    const i = Ve.map(), o = Object.keys(e);
    for (let a = 0; a < o.length; a++) {
      const s = o[a];
      i.set(s, e[s]);
    }
    return i;
  }));
  n.dataObject = e;
  let t = !1, r = !1;
  return gp(e, Oe((i) => {
    if (!t) {
      r = !0;
      try {
        switch (i.type) {
          case "add":
          case "update": {
            n.set(i.name, i.newValue);
            break;
          }
          case "remove": {
            n.delete(i.name);
            break;
          }
          default:
            throw Z("assertion error: unsupported object change type");
        }
      } finally {
        r = !1;
      }
    }
  })), mp(n, Oe((i) => {
    if (t)
      return null;
    if (r)
      return i;
    t = !0;
    try {
      switch (i.type) {
        case "add":
        case "update": {
          Pn(e, i.name, i.newValue);
          break;
        }
        case "delete": {
          Zt(e, i.name);
          break;
        }
        default:
          throw Z("assertion error: unsupported map change type");
      }
      return i;
    } finally {
      t = !1;
    }
  })), n;
});
class Ls {
  /**
   * Creates an instance of Draft.
   * Do not use directly, use `draft` instead.
   *
   * @param original
   */
  constructor(n) {
    fe(this, "data"), fe(this, "originalData"), cn(n, "original"), this.originalData = n, this.data = Sa(this.originalSnapshot, { generateNewIds: !1 });
  }
  /**
   * Commits current draft changes to the original object.
   */
  commit() {
    gy(this.originalData, Hn(this.data));
  }
  /**
   * Partially commits current draft changes to the original object.
   * If the path cannot be resolved in either the draft or the original object it will throw.
   * Note that model IDs are checked to be the same when resolving the paths.
   *
   * @param path Path to commit.
   */
  commitByPath(n) {
    const t = Al(this.data, n);
    if (!t.resolved)
      throw Z(`path ${JSON.stringify(n)} could not be resolved in draft object`);
    const r = Ml(this.data, n);
    if (!wl(this.originalData, n, r).resolved)
      throw Z(`path ${JSON.stringify(n)} could not be resolved in original object`);
    Mu(this.originalData, [
      {
        path: n,
        op: "replace",
        value: Hn(t.value)
      }
    ]);
  }
  /**
   * Resets the draft to be an exact copy of the current state of the original object.
   */
  reset() {
    gy(this.data, this.originalSnapshot);
  }
  /**
   * Partially resets current draft changes to be the same as the original object.
   * If the path cannot be resolved in either the draft or the original object it will throw.
   * Note that model IDs are checked to be the same when resolving the paths.
   *
   * @param path Path to reset.
   */
  resetByPath(n) {
    const t = Al(this.originalData, n);
    if (!t.resolved)
      throw Z(`path ${JSON.stringify(n)} could not be resolved in original object`);
    const r = Ml(this.originalData, n);
    if (!wl(this.data, n, r).resolved)
      throw Z(`path ${JSON.stringify(n)} could not be resolved in draft object`);
    Mu(this.data, [
      {
        path: n,
        op: "replace",
        value: Hn(t.value)
      }
    ]);
  }
  /**
   * Returns `true` if the draft has changed compared to the original object, `false` otherwise.
   */
  get isDirty() {
    return !Ty(Hn(this.data), this.originalSnapshot);
  }
  /**
   * Returns `true` if the value at the given path of the draft has changed compared to the original object.
   * If the path cannot be resolved in the draft it will throw.
   * If the path cannot be resolved in the original object it will return `true`.
   * Note that model IDs are checked to be the same when resolving the paths.
   *
   * @param path Path to check.
   */
  isDirtyByPath(n) {
    const t = Al(this.data, n);
    if (!t.resolved)
      throw Z(`path ${JSON.stringify(n)} could not be resolved in draft object`);
    const r = Ml(this.data, n), i = wl(this.originalData, n, r);
    return i.resolved ? !Ty(t.value, i.value) : !0;
  }
  get originalSnapshot() {
    return Hn(this.originalData);
  }
}
je([
  Oe
], Ls.prototype, "commit", null);
je([
  Oe
], Ls.prototype, "commitByPath", null);
je([
  Oe
], Ls.prototype, "reset", null);
je([
  Oe
], Ls.prototype, "resetByPath", null);
je([
  dn
], Ls.prototype, "isDirty", null);
je([
  dn
], Ls.prototype, "originalSnapshot", null);
function Ml(e, n) {
  const t = Z0(e, n);
  return t.length > 0 && (t[t.length - 1] = sw), t;
}
mw();
let Cu = class extends Sp({
  [lt]: Yy,
  items: Hr(hy(ws()), () => [])
  // will be properly checked by types.arraySet(subType)
}) {
  constructor() {
    super(...arguments), fe(this, bT, "ArraySet");
  }
  add(n) {
    const t = this.items;
    return t.includes(n) || t.push(n), this;
  }
  clear() {
    this.items.length = 0;
  }
  delete(n) {
    const t = this.items, r = t.findIndex((i) => i === n);
    return r >= 0 ? (t.splice(r, 1), !0) : !1;
  }
  forEach(n, t) {
    const r = this.items, i = r.length;
    for (let o = 0; o < i; o++) {
      const a = r[o];
      n.call(t, a, a, this);
    }
  }
  has(n) {
    return this.items.includes(n);
  }
  get size() {
    return this.items.length;
  }
  *keys() {
    for (const n of Vf(this.items))
      yield n;
  }
  *values() {
    for (const n of Vf(this.items))
      yield n;
  }
  *entries() {
    for (const n of this.items)
      yield [n, n];
  }
  [(hT = Symbol.iterator, bT = Symbol.toStringTag, hT)]() {
    return this.values();
  }
  union(n) {
    return new Set(this).union(n);
  }
  intersection(n) {
    return new Set(this).intersection(n);
  }
  difference(n) {
    return new Set(this).difference(n);
  }
  symmetricDifference(n) {
    return new Set(this).symmetricDifference(n);
  }
  isSubsetOf(n) {
    return new Set(this).isSubsetOf(n);
  }
  isSupersetOf(n) {
    return new Set(this).isSupersetOf(n);
  }
  isDisjointFrom(n) {
    return new Set(this).isDisjointFrom(n);
  }
};
je([
  Ut
], Cu.prototype, "add", null);
je([
  Ut
], Cu.prototype, "clear", null);
je([
  Ut
], Cu.prototype, "delete", null);
Cu = je([
  Rp(`${zu}/ArraySet`)
], Cu);
function vC(e) {
  const n = (t) => new SC(t, Ka(e));
  return Wr(() => {
    const t = Sn(e), r = (...a) => `Record<${t.getTypeName(...a, t)}>`, i = (a, s) => {
      if (t.unchecked)
        return a;
      const c = {}, u = Object.keys(a);
      for (let f = 0; f < u.length; f++) {
        const d = u[f], p = s === "from" ? t.fromSnapshotProcessor(a[d]) : t.toSnapshotProcessor(a[d]);
        c[d] = p;
      }
      return c;
    }, o = new kn(On.Object, (a, s, c) => {
      if (!Ct(a))
        return new Bt(s, r(o), a, c);
      if (!t.unchecked) {
        const u = Object.keys(a);
        for (let f = 0; f < u.length; f++) {
          const d = u[f], p = a[d], T = t.check(p, [...s, d], c);
          if (T)
            return T;
        }
      }
      return null;
    }, r, n, (a) => {
      if (!Ct(a))
        return null;
      if (!t.unchecked) {
        const s = Object.keys(a);
        for (let c = 0; c < s.length; c++) {
          const u = s[c], f = a[u];
          if (!t.snapshotType(f))
            return null;
        }
      }
      return o;
    }, (a) => i(a, "from"), (a) => i(a, "to"));
    return o;
  }, n);
}
class SC extends Nt {
  constructor(n, t) {
    super(n), fe(this, "valueType"), this.valueType = t;
  }
  get valueTypeInfo() {
    return qa(this.valueType);
  }
}
let Bu = class extends Sp({
  [lt]: Yy,
  items: Hr(vC(ws()), () => ({}))
  // will be properly checked by types.objectMap(subType)
}) {
  constructor() {
    super(...arguments), fe(this, IT, "ObjectMap");
  }
  clear() {
    const n = this.items, t = Object.keys(n), r = t.length;
    for (let i = 0; i < r; i++) {
      const o = t[i];
      Zt(n, o);
    }
  }
  delete(n) {
    return this.has(n) ? (Zt(this.items, n), !0) : !1;
  }
  forEach(n, t) {
    const r = this.items, i = Object.keys(r), o = i.length;
    for (let a = 0; a < o; a++) {
      const s = i[a];
      n.call(t, r[s], s, this);
    }
  }
  get(n) {
    return rA(this.items, n);
  }
  has(n) {
    return Uy(this.items, n);
  }
  set(n, t) {
    return Pn(this.items, n, t), this;
  }
  get size() {
    return ja(this.items).length;
  }
  *keys() {
    for (const n of ja(this.items))
      yield n;
  }
  *values() {
    for (const n of Vf(this.items))
      yield n;
  }
  *entries() {
    for (const n of tA(this.items))
      yield n;
  }
  [(OT = Symbol.iterator, IT = Symbol.toStringTag, OT)]() {
    return this.entries();
  }
};
je([
  Ut
], Bu.prototype, "clear", null);
je([
  Ut
], Bu.prototype, "delete", null);
je([
  Ut
], Bu.prototype, "set", null);
Bu = je([
  Rp(`${zu}/ObjectMap`)
], Bu);
function Tw(e, n, t) {
  const r = (i) => new RC(i, Ka(e), n, t);
  return Wr(() => {
    const i = Sn(e), o = (...s) => {
      const c = i.getTypeName(...s, i);
      return `${t || "refinementOf"}<${c}>`;
    }, a = new kn(
      i.baseType,
      (s, c, u) => {
        const f = i.check(s, c, u);
        if (f)
          return f;
        const d = n(s);
        return d === !0 || d == null ? null : d === !1 ? new Bt(c, o(a), s, u) : new Bt(d.path, d.expectedTypeName, d.actualValue, u);
      },
      o,
      r,
      // we cannot check refinement here since it checks data instances, not snapshots
      (s) => i.snapshotType(s),
      (s) => i.fromSnapshotProcessor(s),
      (s) => i.toSnapshotProcessor(s)
    );
    return a;
  }, r);
}
class RC extends Nt {
  constructor(n, t, r, i) {
    super(n), fe(this, "baseType"), fe(this, "checkFunction"), fe(this, "typeName"), this.baseType = t, this.checkFunction = r, this.typeName = i;
  }
  get baseTypeInfo() {
    return qa(this.baseType);
  }
}
Tw(wp, (e) => Number.isInteger(e), "integer");
Tw(Us, (e) => e !== "", "nonEmpty");
const EC = (e) => e instanceof ZS, $C = (e) => !!(e != null && e.$$typeof), MC = (e) => !!(e != null && e[Le]), CC = (e) => tR ? !1 : e instanceof HTMLElement, BC = (e) => kl(e) && $C(e) || MC(e) || CC(e) || EC(e), Iy = (e, n, t = (i, o) => o, r = "") => (e = n(e, r), BC(e) ? e : Yg(e) ? e.map(
  (i, o) => Iy(i, n, t, o)
) : kl(e) ? oR(e).map(([i, o]) => {
  const a = t(o, i);
  let s;
  return kl(o) || Yg(o) ? s = Iy(o, n, t, a) : s = n(o, i), {
    [a.toString()]: s
  };
}).reduce((i, o) => ({ ...i, ...o }), {}) : e);
function jC(e) {
  return pn(e) && !it(e) && !tc(e) && Symbol.asyncIterator in e;
}
function it(e) {
  return Array.isArray(e);
}
function _w(e) {
  return typeof e == "bigint";
}
function nc(e) {
  return typeof e == "boolean";
}
function Tm(e) {
  return e instanceof globalThis.Date;
}
function xC(e) {
  return typeof e == "function";
}
function FC(e) {
  return pn(e) && !it(e) && !tc(e) && Symbol.iterator in e;
}
function NC(e) {
  return e === null;
}
function Jr(e) {
  return typeof e == "number";
}
function pn(e) {
  return typeof e == "object" && e !== null;
}
function bw(e) {
  return e instanceof globalThis.RegExp;
}
function an(e) {
  return typeof e == "string";
}
function DC(e) {
  return typeof e == "symbol";
}
function tc(e) {
  return e instanceof globalThis.Uint8Array;
}
function _n(e) {
  return e === void 0;
}
function UC(e) {
  return e.map((n) => np(n));
}
function LC(e) {
  return new Date(e.getTime());
}
function VC(e) {
  return new Uint8Array(e);
}
function qC(e) {
  return new RegExp(e.source, e.flags);
}
function KC(e) {
  const n = {};
  for (const t of Object.getOwnPropertyNames(e))
    n[t] = np(e[t]);
  for (const t of Object.getOwnPropertySymbols(e))
    n[t] = np(e[t]);
  return n;
}
function np(e) {
  return it(e) ? UC(e) : Tm(e) ? LC(e) : tc(e) ? VC(e) : bw(e) ? qC(e) : pn(e) ? KC(e) : e;
}
function Lt(e) {
  return np(e);
}
function GC(e, n) {
  return Lt(e);
}
function HC(e) {
  return rc(e) && Symbol.asyncIterator in e;
}
function kC(e) {
  return rc(e) && Symbol.iterator in e;
}
function WC(e) {
  return e instanceof Promise;
}
function _m(e) {
  return e instanceof Date && Number.isFinite(e.getTime());
}
function zC(e) {
  return e instanceof globalThis.Map;
}
function JC(e) {
  return e instanceof globalThis.Set;
}
function YC(e) {
  return ArrayBuffer.isView(e);
}
function hw(e) {
  return e instanceof globalThis.Uint8Array;
}
function Be(e, n) {
  return n in e;
}
function rc(e) {
  return e !== null && typeof e == "object";
}
function ic(e) {
  return Array.isArray(e) && !ArrayBuffer.isView(e);
}
function Ep(e) {
  return e === void 0;
}
function bm(e) {
  return e === null;
}
function hm(e) {
  return typeof e == "boolean";
}
function wa(e) {
  return typeof e == "number";
}
function XC(e) {
  return Number.isInteger(e);
}
function Im(e) {
  return typeof e == "bigint";
}
function oc(e) {
  return typeof e == "string";
}
function Iw(e) {
  return typeof e == "function";
}
function Om(e) {
  return typeof e == "symbol";
}
function QC(e) {
  return Im(e) || hm(e) || bm(e) || wa(e) || oc(e) || Om(e) || Ep(e);
}
var Yr;
(function(e) {
  e.InstanceMode = "default", e.ExactOptionalPropertyTypes = !1, e.AllowArrayObject = !1, e.AllowNaN = !1, e.AllowNullVoid = !1;
  function n(a, s) {
    return e.ExactOptionalPropertyTypes ? s in a : a[s] !== void 0;
  }
  e.IsExactOptionalProperty = n;
  function t(a) {
    const s = rc(a);
    return e.AllowArrayObject ? s : s && !ic(a);
  }
  e.IsObjectLike = t;
  function r(a) {
    return t(a) && !(a instanceof Date) && !(a instanceof Uint8Array);
  }
  e.IsRecordLike = r;
  function i(a) {
    return e.AllowNaN ? wa(a) : Number.isFinite(a);
  }
  e.IsNumberLike = i;
  function o(a) {
    const s = Ep(a);
    return e.AllowNullVoid ? s || a === null : s;
  }
  e.IsVoidLike = o;
})(Yr || (Yr = {}));
function ZC(e) {
  return globalThis.Object.freeze(e).map((n) => tp(n));
}
function eB(e) {
  const n = {};
  for (const t of Object.getOwnPropertyNames(e))
    n[t] = tp(e[t]);
  for (const t of Object.getOwnPropertySymbols(e))
    n[t] = tp(e[t]);
  return globalThis.Object.freeze(n);
}
function tp(e) {
  return it(e) ? ZC(e) : Tm(e) ? e : tc(e) ? e : bw(e) ? e : pn(e) ? eB(e) : e;
}
function ce(e, n) {
  const t = n !== void 0 ? { ...n, ...e } : e;
  switch (Yr.InstanceMode) {
    case "freeze":
      return tp(t);
    case "clone":
      return Lt(t);
    default:
      return t;
  }
}
class cr extends Error {
  constructor(n) {
    super(n);
  }
}
const gr = Symbol.for("TypeBox.Transform"), ac = Symbol.for("TypeBox.Readonly"), ei = Symbol.for("TypeBox.Optional"), $p = Symbol.for("TypeBox.Hint"), se = Symbol.for("TypeBox.Kind");
function Ow(e) {
  return pn(e) && e[ac] === "Readonly";
}
function Ga(e) {
  return pn(e) && e[ei] === "Optional";
}
function Pw(e) {
  return xe(e, "Any");
}
function sc(e) {
  return xe(e, "Array");
}
function Pm(e) {
  return xe(e, "AsyncIterator");
}
function Aw(e) {
  return xe(e, "BigInt");
}
function ww(e) {
  return xe(e, "Boolean");
}
function pi(e) {
  return xe(e, "Computed");
}
function Am(e) {
  return xe(e, "Constructor");
}
function nB(e) {
  return xe(e, "Date");
}
function wm(e) {
  return xe(e, "Function");
}
function Mp(e) {
  return xe(e, "Integer");
}
function dr(e) {
  return xe(e, "Intersect");
}
function vm(e) {
  return xe(e, "Iterator");
}
function xe(e, n) {
  return pn(e) && se in e && e[se] === n;
}
function vw(e) {
  return nc(e) || Jr(e) || an(e);
}
function uc(e) {
  return xe(e, "Literal");
}
function Ha(e) {
  return xe(e, "MappedKey");
}
function ht(e) {
  return xe(e, "MappedResult");
}
function cc(e) {
  return xe(e, "Never");
}
function tB(e) {
  return xe(e, "Not");
}
function rB(e) {
  return xe(e, "Null");
}
function Cp(e) {
  return xe(e, "Number");
}
function Sr(e) {
  return xe(e, "Object");
}
function Sm(e) {
  return xe(e, "Promise");
}
function Sw(e) {
  return xe(e, "Record");
}
function nt(e) {
  return xe(e, "Ref");
}
function Rw(e) {
  return xe(e, "RegExp");
}
function Rm(e) {
  return xe(e, "String");
}
function iB(e) {
  return xe(e, "Symbol");
}
function ka(e) {
  return xe(e, "TemplateLiteral");
}
function oB(e) {
  return xe(e, "This");
}
function Em(e) {
  return pn(e) && gr in e;
}
function Vs(e) {
  return xe(e, "Tuple");
}
function aB(e) {
  return xe(e, "Undefined");
}
function Cn(e) {
  return xe(e, "Union");
}
function sB(e) {
  return xe(e, "Uint8Array");
}
function uB(e) {
  return xe(e, "Unknown");
}
function cB(e) {
  return xe(e, "Unsafe");
}
function dB(e) {
  return xe(e, "Void");
}
function fB(e) {
  return pn(e) && se in e && an(e[se]);
}
function kr(e) {
  return Pw(e) || sc(e) || ww(e) || Aw(e) || Pm(e) || pi(e) || Am(e) || nB(e) || wm(e) || Mp(e) || dr(e) || vm(e) || uc(e) || Ha(e) || ht(e) || cc(e) || tB(e) || rB(e) || Cp(e) || Sr(e) || Sm(e) || Sw(e) || nt(e) || Rw(e) || Rm(e) || iB(e) || ka(e) || oB(e) || Vs(e) || aB(e) || Cn(e) || sB(e) || uB(e) || cB(e) || dB(e) || fB(e);
}
const pB = [
  "Any",
  "Array",
  "AsyncIterator",
  "BigInt",
  "Boolean",
  "Computed",
  "Constructor",
  "Date",
  "Enum",
  "Function",
  "Integer",
  "Intersect",
  "Iterator",
  "Literal",
  "MappedKey",
  "MappedResult",
  "Not",
  "Null",
  "Number",
  "Object",
  "Promise",
  "Record",
  "Ref",
  "RegExp",
  "String",
  "Symbol",
  "TemplateLiteral",
  "This",
  "Tuple",
  "Undefined",
  "Union",
  "Uint8Array",
  "Unknown",
  "Void"
];
function Ew(e) {
  try {
    return new RegExp(e), !0;
  } catch {
    return !1;
  }
}
function $m(e) {
  if (!an(e))
    return !1;
  for (let n = 0; n < e.length; n++) {
    const t = e.charCodeAt(n);
    if (t >= 7 && t <= 13 || t === 27 || t === 127)
      return !1;
  }
  return !0;
}
function $w(e) {
  return Mm(e) || Mn(e);
}
function ou(e) {
  return _n(e) || _w(e);
}
function ke(e) {
  return _n(e) || Jr(e);
}
function Mm(e) {
  return _n(e) || nc(e);
}
function Ke(e) {
  return _n(e) || an(e);
}
function lB(e) {
  return _n(e) || an(e) && $m(e) && Ew(e);
}
function yB(e) {
  return _n(e) || an(e) && $m(e);
}
function Mw(e) {
  return _n(e) || Mn(e);
}
function rp(e) {
  return pn(e) && e[ei] === "Optional";
}
function ir(e) {
  return Fe(e, "Any") && Ke(e.$id);
}
function Wa(e) {
  return Fe(e, "Array") && e.type === "array" && Ke(e.$id) && Mn(e.items) && ke(e.minItems) && ke(e.maxItems) && Mm(e.uniqueItems) && Mw(e.contains) && ke(e.minContains) && ke(e.maxContains);
}
function Cm(e) {
  return Fe(e, "AsyncIterator") && e.type === "AsyncIterator" && Ke(e.$id) && Mn(e.items);
}
function Bp(e) {
  return Fe(e, "BigInt") && e.type === "bigint" && Ke(e.$id) && ou(e.exclusiveMaximum) && ou(e.exclusiveMinimum) && ou(e.maximum) && ou(e.minimum) && ou(e.multipleOf);
}
function za(e) {
  return Fe(e, "Boolean") && e.type === "boolean" && Ke(e.$id);
}
function mB(e) {
  return Fe(e, "Computed") && an(e.target) && it(e.parameters) && e.parameters.every((n) => Mn(n));
}
function jp(e) {
  return Fe(e, "Constructor") && e.type === "Constructor" && Ke(e.$id) && it(e.parameters) && e.parameters.every((n) => Mn(n)) && Mn(e.returns);
}
function xp(e) {
  return Fe(e, "Date") && e.type === "Date" && Ke(e.$id) && ke(e.exclusiveMaximumTimestamp) && ke(e.exclusiveMinimumTimestamp) && ke(e.maximumTimestamp) && ke(e.minimumTimestamp) && ke(e.multipleOfTimestamp);
}
function Fp(e) {
  return Fe(e, "Function") && e.type === "Function" && Ke(e.$id) && it(e.parameters) && e.parameters.every((n) => Mn(n)) && Mn(e.returns);
}
function ni(e) {
  return Fe(e, "Integer") && e.type === "integer" && Ke(e.$id) && ke(e.exclusiveMaximum) && ke(e.exclusiveMinimum) && ke(e.maximum) && ke(e.minimum) && ke(e.multipleOf);
}
function Cw(e) {
  return pn(e) && Object.entries(e).every(([n, t]) => $m(n) && Mn(t));
}
function Ja(e) {
  return Fe(e, "Intersect") && !(an(e.type) && e.type !== "object") && it(e.allOf) && e.allOf.every((n) => Mn(n) && !IB(n)) && Ke(e.type) && (Mm(e.unevaluatedProperties) || Mw(e.unevaluatedProperties)) && Ke(e.$id);
}
function Bm(e) {
  return Fe(e, "Iterator") && e.type === "Iterator" && Ke(e.$id) && Mn(e.items);
}
function Fe(e, n) {
  return pn(e) && se in e && e[se] === n;
}
function Bw(e) {
  return Ti(e) && an(e.const);
}
function jw(e) {
  return Ti(e) && Jr(e.const);
}
function xw(e) {
  return Ti(e) && nc(e.const);
}
function Ti(e) {
  return Fe(e, "Literal") && Ke(e.$id) && gB(e.const);
}
function gB(e) {
  return nc(e) || Jr(e) || an(e);
}
function TB(e) {
  return Fe(e, "MappedKey") && it(e.keys) && e.keys.every((n) => Jr(n) || an(n));
}
function _B(e) {
  return Fe(e, "MappedResult") && Cw(e.properties);
}
function _i(e) {
  return Fe(e, "Never") && pn(e.not) && Object.getOwnPropertyNames(e.not).length === 0;
}
function vs(e) {
  return Fe(e, "Not") && Mn(e.not);
}
function jm(e) {
  return Fe(e, "Null") && e.type === "null" && Ke(e.$id);
}
function Zn(e) {
  return Fe(e, "Number") && e.type === "number" && Ke(e.$id) && ke(e.exclusiveMaximum) && ke(e.exclusiveMinimum) && ke(e.maximum) && ke(e.minimum) && ke(e.multipleOf);
}
function rn(e) {
  return Fe(e, "Object") && e.type === "object" && Ke(e.$id) && Cw(e.properties) && $w(e.additionalProperties) && ke(e.minProperties) && ke(e.maxProperties);
}
function xm(e) {
  return Fe(e, "Promise") && e.type === "Promise" && Ke(e.$id) && Mn(e.item);
}
function $n(e) {
  return Fe(e, "Record") && e.type === "object" && Ke(e.$id) && $w(e.additionalProperties) && pn(e.patternProperties) && ((n) => {
    const t = Object.getOwnPropertyNames(n.patternProperties);
    return t.length === 1 && Ew(t[0]) && pn(n.patternProperties) && Mn(n.patternProperties[t[0]]);
  })(e);
}
function bB(e) {
  return Fe(e, "Ref") && Ke(e.$id) && an(e.$ref);
}
function ju(e) {
  return Fe(e, "RegExp") && Ke(e.$id) && an(e.source) && an(e.flags) && ke(e.maxLength) && ke(e.minLength);
}
function or(e) {
  return Fe(e, "String") && e.type === "string" && Ke(e.$id) && ke(e.minLength) && ke(e.maxLength) && lB(e.pattern) && yB(e.format);
}
function xu(e) {
  return Fe(e, "Symbol") && e.type === "symbol" && Ke(e.$id);
}
function Fu(e) {
  return Fe(e, "TemplateLiteral") && e.type === "string" && an(e.pattern) && e.pattern[0] === "^" && e.pattern[e.pattern.length - 1] === "$";
}
function hB(e) {
  return Fe(e, "This") && Ke(e.$id) && an(e.$ref);
}
function IB(e) {
  return pn(e) && gr in e;
}
function Np(e) {
  return Fe(e, "Tuple") && e.type === "array" && Ke(e.$id) && Jr(e.minItems) && Jr(e.maxItems) && e.minItems === e.maxItems && // empty
  (_n(e.items) && _n(e.additionalItems) && e.minItems === 0 || it(e.items) && e.items.every((n) => Mn(n)));
}
function Ua(e) {
  return Fe(e, "Undefined") && e.type === "undefined" && Ke(e.$id);
}
function Xr(e) {
  return Fe(e, "Union") && Ke(e.$id) && pn(e) && it(e.anyOf) && e.anyOf.every((n) => Mn(n));
}
function dc(e) {
  return Fe(e, "Uint8Array") && e.type === "Uint8Array" && Ke(e.$id) && ke(e.minByteLength) && ke(e.maxByteLength);
}
function ar(e) {
  return Fe(e, "Unknown") && Ke(e.$id);
}
function OB(e) {
  return Fe(e, "Unsafe");
}
function Dp(e) {
  return Fe(e, "Void") && e.type === "void" && Ke(e.$id);
}
function PB(e) {
  return pn(e) && se in e && an(e[se]) && !pB.includes(e[se]);
}
function Mn(e) {
  return pn(e) && (ir(e) || Wa(e) || za(e) || Bp(e) || Cm(e) || mB(e) || jp(e) || xp(e) || Fp(e) || ni(e) || Ja(e) || Bm(e) || Ti(e) || TB(e) || _B(e) || _i(e) || vs(e) || jm(e) || Zn(e) || rn(e) || xm(e) || $n(e) || bB(e) || ju(e) || or(e) || xu(e) || Fu(e) || hB(e) || Np(e) || Ua(e) || Xr(e) || dc(e) || ar(e) || OB(e) || Dp(e) || PB(e));
}
const AB = "(true|false)", Bf = "(0|[1-9][0-9]*)", Fw = "(.*)", wB = "(?!.*)", Ss = `^${Bf}$`, Rs = `^${Fw}$`, vB = `^${wB}$`, Fm = /* @__PURE__ */ new Map();
function SB(e) {
  return Fm.has(e);
}
function RB(e, n) {
  Fm.set(e, n);
}
function EB(e) {
  return Fm.get(e);
}
const Nm = /* @__PURE__ */ new Map();
function Up(e) {
  return Nm.has(e);
}
function $B(e, n) {
  Nm.set(e, n);
}
function MB(e) {
  return Nm.get(e);
}
function CB(e, n) {
  return e.includes(n);
}
function BB(e) {
  return [...new Set(e)];
}
function jB(e, n) {
  return e.filter((t) => n.includes(t));
}
function xB(e, n) {
  return e.reduce((t, r) => jB(t, r), n);
}
function FB(e) {
  return e.length === 1 ? e[0] : e.length > 1 ? xB(e.slice(1), e[0]) : [];
}
function NB(e) {
  const n = [];
  for (const t of e)
    n.push(...t);
  return n;
}
function Nu(e) {
  return ce({ [se]: "Any" }, e);
}
function Dm(e, n) {
  return ce({ [se]: "Array", type: "array", items: e }, n);
}
function Um(e, n) {
  return ce({ [se]: "AsyncIterator", type: "AsyncIterator", items: e }, n);
}
function Ze(e, n, t) {
  return ce({ [se]: "Computed", target: e, parameters: n }, t);
}
function DB(e, n) {
  const { [n]: t, ...r } = e;
  return r;
}
function gt(e, n) {
  return n.reduce((t, r) => DB(t, r), e);
}
function Bn(e) {
  return ce({ [se]: "Never", not: {} }, e);
}
function jn(e) {
  return ce({
    [se]: "MappedResult",
    properties: e
  });
}
function Lm(e, n, t) {
  return ce({ [se]: "Constructor", type: "Constructor", parameters: e, returns: n }, t);
}
function fc(e, n, t) {
  return ce({ [se]: "Function", type: "Function", parameters: e, returns: n }, t);
}
function Oy(e, n) {
  return ce({ [se]: "Union", anyOf: e }, n);
}
function UB(e) {
  return e.some((n) => Ga(n));
}
function t_(e) {
  return e.map((n) => Ga(n) ? LB(n) : n);
}
function LB(e) {
  return gt(e, [ei]);
}
function VB(e, n) {
  return UB(e) ? Xa(Oy(t_(e), n)) : Oy(t_(e), n);
}
function qs(e, n) {
  return e.length === 1 ? ce(e[0], n) : e.length === 0 ? Bn(n) : VB(e, n);
}
function xn(e, n) {
  return e.length === 0 ? Bn(n) : e.length === 1 ? ce(e[0], n) : Oy(e, n);
}
class r_ extends cr {
}
function qB(e) {
  return e.replace(/\\\$/g, "$").replace(/\\\*/g, "*").replace(/\\\^/g, "^").replace(/\\\|/g, "|").replace(/\\\(/g, "(").replace(/\\\)/g, ")");
}
function Vm(e, n, t) {
  return e[n] === t && e.charCodeAt(n - 1) !== 92;
}
function Kr(e, n) {
  return Vm(e, n, "(");
}
function Du(e, n) {
  return Vm(e, n, ")");
}
function Nw(e, n) {
  return Vm(e, n, "|");
}
function KB(e) {
  if (!(Kr(e, 0) && Du(e, e.length - 1)))
    return !1;
  let n = 0;
  for (let t = 0; t < e.length; t++)
    if (Kr(e, t) && (n += 1), Du(e, t) && (n -= 1), n === 0 && t !== e.length - 1)
      return !1;
  return !0;
}
function GB(e) {
  return e.slice(1, e.length - 1);
}
function HB(e) {
  let n = 0;
  for (let t = 0; t < e.length; t++)
    if (Kr(e, t) && (n += 1), Du(e, t) && (n -= 1), Nw(e, t) && n === 0)
      return !0;
  return !1;
}
function kB(e) {
  for (let n = 0; n < e.length; n++)
    if (Kr(e, n))
      return !0;
  return !1;
}
function WB(e) {
  let [n, t] = [0, 0];
  const r = [];
  for (let o = 0; o < e.length; o++)
    if (Kr(e, o) && (n += 1), Du(e, o) && (n -= 1), Nw(e, o) && n === 0) {
      const a = e.slice(t, o);
      a.length > 0 && r.push(Es(a)), t = o + 1;
    }
  const i = e.slice(t);
  return i.length > 0 && r.push(Es(i)), r.length === 0 ? { type: "const", const: "" } : r.length === 1 ? r[0] : { type: "or", expr: r };
}
function zB(e) {
  function n(i, o) {
    if (!Kr(i, o))
      throw new r_("TemplateLiteralParser: Index must point to open parens");
    let a = 0;
    for (let s = o; s < i.length; s++)
      if (Kr(i, s) && (a += 1), Du(i, s) && (a -= 1), a === 0)
        return [o, s];
    throw new r_("TemplateLiteralParser: Unclosed group parens in expression");
  }
  function t(i, o) {
    for (let a = o; a < i.length; a++)
      if (Kr(i, a))
        return [o, a];
    return [o, i.length];
  }
  const r = [];
  for (let i = 0; i < e.length; i++)
    if (Kr(e, i)) {
      const [o, a] = n(e, i), s = e.slice(o, a + 1);
      r.push(Es(s)), i = a;
    } else {
      const [o, a] = t(e, i), s = e.slice(o, a);
      s.length > 0 && r.push(Es(s)), i = a - 1;
    }
  return r.length === 0 ? { type: "const", const: "" } : r.length === 1 ? r[0] : { type: "and", expr: r };
}
function Es(e) {
  return KB(e) ? Es(GB(e)) : HB(e) ? WB(e) : kB(e) ? zB(e) : { type: "const", const: qB(e) };
}
function qm(e) {
  return Es(e.slice(1, e.length - 1));
}
class JB extends cr {
}
function YB(e) {
  return e.type === "or" && e.expr.length === 2 && e.expr[0].type === "const" && e.expr[0].const === "0" && e.expr[1].type === "const" && e.expr[1].const === "[1-9][0-9]*";
}
function XB(e) {
  return e.type === "or" && e.expr.length === 2 && e.expr[0].type === "const" && e.expr[0].const === "true" && e.expr[1].type === "const" && e.expr[1].const === "false";
}
function QB(e) {
  return e.type === "const" && e.const === ".*";
}
function Uu(e) {
  return YB(e) || QB(e) ? !1 : XB(e) ? !0 : e.type === "and" ? e.expr.every((n) => Uu(n)) : e.type === "or" ? e.expr.every((n) => Uu(n)) : e.type === "const" ? !0 : (() => {
    throw new JB("Unknown expression type");
  })();
}
function Dw(e) {
  const n = qm(e.pattern);
  return Uu(n);
}
class ZB extends cr {
}
function* Uw(e) {
  if (e.length === 1)
    return yield* e[0];
  for (const n of e[0])
    for (const t of Uw(e.slice(1)))
      yield `${n}${t}`;
}
function* ej(e) {
  return yield* Uw(e.expr.map((n) => [...Lp(n)]));
}
function* nj(e) {
  for (const n of e.expr)
    yield* Lp(n);
}
function* tj(e) {
  return yield e.const;
}
function* Lp(e) {
  return e.type === "and" ? yield* ej(e) : e.type === "or" ? yield* nj(e) : e.type === "const" ? yield* tj(e) : (() => {
    throw new ZB("Unknown expression");
  })();
}
function Km(e) {
  const n = qm(e.pattern);
  return Uu(n) ? [...Lp(n)] : [];
}
function fn(e, n) {
  return ce({
    [se]: "Literal",
    const: e,
    type: typeof e
  }, n);
}
function Lw(e) {
  return ce({ [se]: "Boolean", type: "boolean" }, e);
}
function Gm(e) {
  return ce({ [se]: "BigInt", type: "bigint" }, e);
}
function Ks(e) {
  return ce({ [se]: "Number", type: "number" }, e);
}
function Lu(e) {
  return ce({ [se]: "String", type: "string" }, e);
}
function* rj(e) {
  const n = e.trim().replace(/"|'/g, "");
  return n === "boolean" ? yield Lw() : n === "number" ? yield Ks() : n === "bigint" ? yield Gm() : n === "string" ? yield Lu() : yield (() => {
    const t = n.split("|").map((r) => fn(r.trim()));
    return t.length === 0 ? Bn() : t.length === 1 ? t[0] : qs(t);
  })();
}
function* ij(e) {
  if (e[1] !== "{") {
    const n = fn("$"), t = Py(e.slice(1));
    return yield* [n, ...t];
  }
  for (let n = 2; n < e.length; n++)
    if (e[n] === "}") {
      const t = rj(e.slice(2, n)), r = Py(e.slice(n + 1));
      return yield* [...t, ...r];
    }
  yield fn(e);
}
function* Py(e) {
  for (let n = 0; n < e.length; n++)
    if (e[n] === "$") {
      const t = fn(e.slice(0, n)), r = ij(e.slice(n));
      return yield* [t, ...r];
    }
  yield fn(e);
}
function oj(e) {
  return [...Py(e)];
}
class aj extends cr {
}
function sj(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Vw(e, n) {
  return ka(e) ? e.pattern.slice(1, e.pattern.length - 1) : Cn(e) ? `(${e.anyOf.map((t) => Vw(t, n)).join("|")})` : Cp(e) ? `${n}${Bf}` : Mp(e) ? `${n}${Bf}` : Aw(e) ? `${n}${Bf}` : Rm(e) ? `${n}${Fw}` : uc(e) ? `${n}${sj(e.const.toString())}` : ww(e) ? `${n}${AB}` : (() => {
    throw new aj(`Unexpected Kind '${e[se]}'`);
  })();
}
function i_(e) {
  return `^${e.map((n) => Vw(n, "")).join("")}$`;
}
function ip(e) {
  const t = Km(e).map((r) => fn(r));
  return qs(t);
}
function qw(e, n) {
  const t = an(e) ? i_(oj(e)) : i_(e);
  return ce({ [se]: "TemplateLiteral", type: "string", pattern: t }, n);
}
function uj(e) {
  return Km(e).map((t) => t.toString());
}
function cj(e) {
  const n = [];
  for (const t of e)
    n.push(...bi(t));
  return n;
}
function dj(e) {
  return [e.toString()];
}
function bi(e) {
  return [...new Set(ka(e) ? uj(e) : Cn(e) ? cj(e.anyOf) : uc(e) ? dj(e.const) : Cp(e) ? ["[number]"] : Mp(e) ? ["[number]"] : [])];
}
function fj(e, n, t) {
  const r = {};
  for (const i of Object.getOwnPropertyNames(n))
    r[i] = Vp(e, bi(n[i]), t);
  return r;
}
function pj(e, n, t) {
  return fj(e, n.properties, t);
}
function lj(e, n, t) {
  const r = pj(e, n, t);
  return jn(r);
}
function Kw(e, n) {
  return e.map((t) => Gw(t, n));
}
function yj(e) {
  return e.filter((n) => !cc(n));
}
function mj(e, n) {
  return zw(yj(Kw(e, n)));
}
function gj(e) {
  return e.some((n) => cc(n)) ? [] : e;
}
function Tj(e, n) {
  return qs(gj(Kw(e, n)));
}
function _j(e, n) {
  return n in e ? e[n] : n === "[number]" ? qs(e) : Bn();
}
function bj(e, n) {
  return n === "[number]" ? e : Bn();
}
function hj(e, n) {
  return n in e ? e[n] : Bn();
}
function Gw(e, n) {
  return dr(e) ? mj(e.allOf, n) : Cn(e) ? Tj(e.anyOf, n) : Vs(e) ? _j(e.items ?? [], n) : sc(e) ? bj(e.items, n) : Sr(e) ? hj(e.properties, n) : Bn();
}
function Hw(e, n) {
  return n.map((t) => Gw(e, t));
}
function o_(e, n) {
  return qs(Hw(e, n));
}
function Vp(e, n, t) {
  if (nt(e) || nt(n)) {
    const r = "Index types using Ref parameters require both Type and Key to be of TSchema";
    if (!kr(e) || !kr(n))
      throw new cr(r);
    return Ze("Index", [e, n]);
  }
  return ht(n) ? lj(e, n, t) : Ha(n) ? Aj(e, n, t) : ce(kr(n) ? o_(e, bi(n)) : o_(e, n), t);
}
function Ij(e, n, t) {
  return { [n]: Vp(e, [n], Lt(t)) };
}
function Oj(e, n, t) {
  return n.reduce((r, i) => ({ ...r, ...Ij(e, i, t) }), {});
}
function Pj(e, n, t) {
  return Oj(e, n.keys, t);
}
function Aj(e, n, t) {
  const r = Pj(e, n, t);
  return jn(r);
}
function Hm(e, n) {
  return ce({ [se]: "Iterator", type: "Iterator", items: e }, n);
}
function wj(e) {
  const n = [];
  for (let t in e)
    Ga(e[t]) || n.push(t);
  return n;
}
function vj(e, n) {
  const t = wj(e), r = t.length > 0 ? { [se]: "Object", type: "object", properties: e, required: t } : { [se]: "Object", type: "object", properties: e };
  return ce(r, n);
}
var Dn = vj;
function kw(e, n) {
  return ce({ [se]: "Promise", type: "Promise", item: e }, n);
}
function Sj(e) {
  return ce(gt(e, [ac]));
}
function Rj(e) {
  return ce({ ...e, [ac]: "Readonly" });
}
function Ej(e, n) {
  return n === !1 ? Sj(e) : Rj(e);
}
function Ya(e, n) {
  const t = n ?? !0;
  return ht(e) ? Cj(e, t) : Ej(e, t);
}
function $j(e, n) {
  const t = {};
  for (const r of globalThis.Object.getOwnPropertyNames(e))
    t[r] = Ya(e[r], n);
  return t;
}
function Mj(e, n) {
  return $j(e.properties, n);
}
function Cj(e, n) {
  const t = Mj(e, n);
  return jn(t);
}
function Gs(e, n) {
  return ce(e.length > 0 ? { [se]: "Tuple", type: "array", items: e, additionalItems: !1, minItems: e.length, maxItems: e.length } : { [se]: "Tuple", type: "array", minItems: e.length, maxItems: e.length }, n);
}
function Ww(e, n) {
  return e in n ? wt(e, n[e]) : jn(n);
}
function Bj(e) {
  return { [e]: fn(e) };
}
function jj(e) {
  const n = {};
  for (const t of e)
    n[t] = fn(t);
  return n;
}
function xj(e, n) {
  return CB(n, e) ? Bj(e) : jj(n);
}
function Fj(e, n) {
  const t = xj(e, n);
  return Ww(e, t);
}
function au(e, n) {
  return n.map((t) => wt(e, t));
}
function Nj(e, n) {
  const t = {};
  for (const r of globalThis.Object.getOwnPropertyNames(n))
    t[r] = wt(e, n[r]);
  return t;
}
function wt(e, n) {
  const t = { ...n };
  return (
    // unevaluated modifier types
    Ga(n) ? Xa(wt(e, gt(n, [ei]))) : Ow(n) ? Ya(wt(e, gt(n, [ac]))) : (
      // unevaluated mapped types
      ht(n) ? Ww(e, n.properties) : Ha(n) ? Fj(e, n.keys) : (
        // unevaluated types
        Am(n) ? Lm(au(e, n.parameters), wt(e, n.returns), t) : wm(n) ? fc(au(e, n.parameters), wt(e, n.returns), t) : Pm(n) ? Um(wt(e, n.items), t) : vm(n) ? Hm(wt(e, n.items), t) : dr(n) ? hi(au(e, n.allOf), t) : Cn(n) ? xn(au(e, n.anyOf), t) : Vs(n) ? Gs(au(e, n.items ?? []), t) : Sr(n) ? Dn(Nj(e, n.properties), t) : sc(n) ? Dm(wt(e, n.items), t) : Sm(n) ? kw(wt(e, n.item), t) : n
      )
    )
  );
}
function Dj(e, n) {
  const t = {};
  for (const r of e)
    t[r] = wt(r, n);
  return t;
}
function Uj(e, n, t) {
  const r = kr(e) ? bi(e) : e, i = n({ [se]: "MappedKey", keys: r }), o = Dj(r, i);
  return Dn(o, t);
}
function Lj(e) {
  return ce(gt(e, [ei]));
}
function Vj(e) {
  return ce({ ...e, [ei]: "Optional" });
}
function qj(e, n) {
  return n === !1 ? Lj(e) : Vj(e);
}
function Xa(e, n) {
  const t = n ?? !0;
  return ht(e) ? Hj(e, t) : qj(e, t);
}
function Kj(e, n) {
  const t = {};
  for (const r of globalThis.Object.getOwnPropertyNames(e))
    t[r] = Xa(e[r], n);
  return t;
}
function Gj(e, n) {
  return Kj(e.properties, n);
}
function Hj(e, n) {
  const t = Gj(e, n);
  return jn(t);
}
function Ay(e, n = {}) {
  const t = e.every((i) => Sr(i)), r = kr(n.unevaluatedProperties) ? { unevaluatedProperties: n.unevaluatedProperties } : {};
  return ce(n.unevaluatedProperties === !1 || kr(n.unevaluatedProperties) || t ? { ...r, [se]: "Intersect", type: "object", allOf: e } : { ...r, [se]: "Intersect", allOf: e }, n);
}
function kj(e) {
  return e.every((n) => Ga(n));
}
function Wj(e) {
  return gt(e, [ei]);
}
function a_(e) {
  return e.map((n) => Ga(n) ? Wj(n) : n);
}
function zj(e, n) {
  return kj(e) ? Xa(Ay(a_(e), n)) : Ay(a_(e), n);
}
function zw(e, n = {}) {
  if (e.length === 1)
    return ce(e[0], n);
  if (e.length === 0)
    return Bn(n);
  if (e.some((t) => Em(t)))
    throw new Error("Cannot intersect transform types");
  return zj(e, n);
}
function hi(e, n) {
  if (e.length === 1)
    return ce(e[0], n);
  if (e.length === 0)
    return Bn(n);
  if (e.some((t) => Em(t)))
    throw new Error("Cannot intersect transform types");
  return Ay(e, n);
}
function Hs(...e) {
  const [n, t] = typeof e[0] == "string" ? [e[0], e[1]] : [e[0].$id, e[1]];
  if (typeof n != "string")
    throw new cr("Ref: $ref must be a string");
  return ce({ [se]: "Ref", $ref: n }, t);
}
function Jj(e, n) {
  return Ze("Awaited", [Ze(e, n)]);
}
function Yj(e) {
  return Ze("Awaited", [Hs(e)]);
}
function Xj(e) {
  return hi(Jw(e));
}
function Qj(e) {
  return xn(Jw(e));
}
function Zj(e) {
  return qp(e);
}
function Jw(e) {
  return e.map((n) => qp(n));
}
function qp(e, n) {
  return ce(pi(e) ? Jj(e.target, e.parameters) : dr(e) ? Xj(e.allOf) : Cn(e) ? Qj(e.anyOf) : Sm(e) ? Zj(e.item) : nt(e) ? Yj(e.$ref) : e, n);
}
function Yw(e) {
  const n = [];
  for (const t of e)
    n.push(Kp(t));
  return n;
}
function ex(e) {
  const n = Yw(e);
  return NB(n);
}
function nx(e) {
  const n = Yw(e);
  return FB(n);
}
function tx(e) {
  return e.map((n, t) => t.toString());
}
function rx(e) {
  return ["[number]"];
}
function ix(e) {
  return globalThis.Object.getOwnPropertyNames(e);
}
function ox(e) {
  return wy ? globalThis.Object.getOwnPropertyNames(e).map((t) => t[0] === "^" && t[t.length - 1] === "$" ? t.slice(1, t.length - 1) : t) : [];
}
function Kp(e) {
  return dr(e) ? ex(e.allOf) : Cn(e) ? nx(e.anyOf) : Vs(e) ? tx(e.items ?? []) : sc(e) ? rx(e.items) : Sr(e) ? ix(e.properties) : Sw(e) ? ox(e.patternProperties) : [];
}
let wy = !1;
function s_(e) {
  wy = !0;
  const n = Kp(e);
  return wy = !1, `^(${n.map((r) => `(${r})`).join("|")})$`;
}
function ax(e, n) {
  return Ze("KeyOf", [Ze(e, n)]);
}
function sx(e) {
  return Ze("KeyOf", [Hs(e)]);
}
function ux(e, n) {
  const t = Kp(e), r = cx(t), i = qs(r);
  return ce(i, n);
}
function cx(e) {
  return e.map((n) => n === "[number]" ? Ks() : fn(n));
}
function km(e, n) {
  return pi(e) ? ax(e.target, e.parameters) : nt(e) ? sx(e.$ref) : ht(e) ? px(e, n) : ux(e, n);
}
function dx(e, n) {
  const t = {};
  for (const r of globalThis.Object.getOwnPropertyNames(e))
    t[r] = km(e[r], Lt(n));
  return t;
}
function fx(e, n) {
  return dx(e.properties, n);
}
function px(e, n) {
  const t = fx(e, n);
  return jn(t);
}
function lx(e) {
  const n = [];
  for (const t of e)
    n.push(...Kp(t));
  return BB(n);
}
function yx(e) {
  return e.filter((n) => !cc(n));
}
function mx(e, n) {
  const t = [];
  for (const r of e)
    t.push(...Hw(r, [n]));
  return yx(t);
}
function gx(e, n) {
  const t = {};
  for (const r of n)
    t[r] = zw(mx(e, r));
  return t;
}
function Tx(e, n) {
  const t = lx(e), r = gx(e, t);
  return Dn(r, n);
}
function Xw(e) {
  return ce({ [se]: "Date", type: "Date" }, e);
}
function Qw(e) {
  return ce({ [se]: "Null", type: "null" }, e);
}
function Zw(e) {
  return ce({ [se]: "Symbol", type: "symbol" }, e);
}
function ev(e) {
  return ce({ [se]: "Undefined", type: "undefined" }, e);
}
function nv(e) {
  return ce({ [se]: "Uint8Array", type: "Uint8Array" }, e);
}
function Wm(e) {
  return ce({ [se]: "Unknown" }, e);
}
function _x(e) {
  return e.map((n) => zm(n, !1));
}
function bx(e) {
  const n = {};
  for (const t of globalThis.Object.getOwnPropertyNames(e))
    n[t] = Ya(zm(e[t], !1));
  return n;
}
function Fc(e, n) {
  return n === !0 ? e : Ya(e);
}
function zm(e, n) {
  return jC(e) || FC(e) ? Fc(Nu(), n) : it(e) ? Ya(Gs(_x(e))) : tc(e) ? nv() : Tm(e) ? Xw() : pn(e) ? Fc(Dn(bx(e)), n) : xC(e) ? Fc(fc([], Wm()), n) : _n(e) ? ev() : NC(e) ? Qw() : DC(e) ? Zw() : _w(e) ? Gm() : Jr(e) || nc(e) || an(e) ? fn(e) : Dn({});
}
function hx(e, n) {
  return ce(zm(e, !0), n);
}
function Ix(e, n) {
  return Gs(e.parameters, n);
}
function Ox(e, n) {
  if (_n(e))
    throw new Error("Enum undefined or empty");
  const t = globalThis.Object.getOwnPropertyNames(e).filter((o) => isNaN(o)).map((o) => e[o]), i = [...new Set(t)].map((o) => fn(o));
  return xn(i, { ...n, [$p]: "Enum" });
}
class Px extends cr {
}
var W;
(function(e) {
  e[e.Union = 0] = "Union", e[e.True = 1] = "True", e[e.False = 2] = "False";
})(W || (W = {}));
function jt(e) {
  return e === W.False ? e : W.True;
}
function ks(e) {
  throw new Px(e);
}
function yn(e) {
  return _i(e) || Ja(e) || Xr(e) || ar(e) || ir(e);
}
function mn(e, n) {
  return _i(n) ? iv() : Ja(n) ? Gp(e, n) : Xr(n) ? Ym(e, n) : ar(n) ? uv() : ir(n) ? Jm() : ks("StructuralRight");
}
function Jm(e, n) {
  return W.True;
}
function Ax(e, n) {
  return Ja(n) ? Gp(e, n) : Xr(n) && n.anyOf.some((t) => ir(t) || ar(t)) ? W.True : Xr(n) ? W.Union : ar(n) || ir(n) ? W.True : W.Union;
}
function wx(e, n) {
  return ar(e) ? W.False : ir(e) ? W.Union : _i(e) ? W.True : W.False;
}
function vx(e, n) {
  return rn(n) && Hp(n) ? W.True : yn(n) ? mn(e, n) : Wa(n) ? jt(qe(e.items, n.items)) : W.False;
}
function Sx(e, n) {
  return yn(n) ? mn(e, n) : Cm(n) ? jt(qe(e.items, n.items)) : W.False;
}
function Rx(e, n) {
  return yn(n) ? mn(e, n) : rn(n) ? Ln(e, n) : $n(n) ? Vt(e, n) : Bp(n) ? W.True : W.False;
}
function tv(e, n) {
  return xw(e) || za(e) ? W.True : W.False;
}
function Ex(e, n) {
  return yn(n) ? mn(e, n) : rn(n) ? Ln(e, n) : $n(n) ? Vt(e, n) : za(n) ? W.True : W.False;
}
function $x(e, n) {
  return yn(n) ? mn(e, n) : rn(n) ? Ln(e, n) : jp(n) ? e.parameters.length > n.parameters.length ? W.False : e.parameters.every((t, r) => jt(qe(n.parameters[r], t)) === W.True) ? jt(qe(e.returns, n.returns)) : W.False : W.False;
}
function Mx(e, n) {
  return yn(n) ? mn(e, n) : rn(n) ? Ln(e, n) : $n(n) ? Vt(e, n) : xp(n) ? W.True : W.False;
}
function Cx(e, n) {
  return yn(n) ? mn(e, n) : rn(n) ? Ln(e, n) : Fp(n) ? e.parameters.length > n.parameters.length ? W.False : e.parameters.every((t, r) => jt(qe(n.parameters[r], t)) === W.True) ? jt(qe(e.returns, n.returns)) : W.False : W.False;
}
function rv(e, n) {
  return Ti(e) && Jr(e.const) || Zn(e) || ni(e) ? W.True : W.False;
}
function Bx(e, n) {
  return ni(n) || Zn(n) ? W.True : yn(n) ? mn(e, n) : rn(n) ? Ln(e, n) : $n(n) ? Vt(e, n) : W.False;
}
function Gp(e, n) {
  return n.allOf.every((t) => qe(e, t) === W.True) ? W.True : W.False;
}
function jx(e, n) {
  return e.allOf.some((t) => qe(t, n) === W.True) ? W.True : W.False;
}
function xx(e, n) {
  return yn(n) ? mn(e, n) : Bm(n) ? jt(qe(e.items, n.items)) : W.False;
}
function Fx(e, n) {
  return Ti(n) && n.const === e.const ? W.True : yn(n) ? mn(e, n) : rn(n) ? Ln(e, n) : $n(n) ? Vt(e, n) : or(n) ? sv(e) : Zn(n) ? ov(e) : ni(n) ? rv(e) : za(n) ? tv(e) : W.False;
}
function iv(e, n) {
  return W.False;
}
function Nx(e, n) {
  return W.True;
}
function u_(e) {
  let [n, t] = [e, 0];
  for (; vs(n); )
    n = n.not, t += 1;
  return t % 2 === 0 ? n : Wm();
}
function Dx(e, n) {
  return vs(e) ? qe(u_(e), n) : vs(n) ? qe(e, u_(n)) : ks("Invalid fallthrough for Not");
}
function Ux(e, n) {
  return yn(n) ? mn(e, n) : rn(n) ? Ln(e, n) : $n(n) ? Vt(e, n) : jm(n) ? W.True : W.False;
}
function ov(e, n) {
  return jw(e) || Zn(e) || ni(e) ? W.True : W.False;
}
function Lx(e, n) {
  return yn(n) ? mn(e, n) : rn(n) ? Ln(e, n) : $n(n) ? Vt(e, n) : ni(n) || Zn(n) ? W.True : W.False;
}
function tt(e, n) {
  return Object.getOwnPropertyNames(e.properties).length === n;
}
function c_(e) {
  return Hp(e);
}
function d_(e) {
  return tt(e, 0) || tt(e, 1) && "description" in e.properties && Xr(e.properties.description) && e.properties.description.anyOf.length === 2 && (or(e.properties.description.anyOf[0]) && Ua(e.properties.description.anyOf[1]) || or(e.properties.description.anyOf[1]) && Ua(e.properties.description.anyOf[0]));
}
function Cl(e) {
  return tt(e, 0);
}
function f_(e) {
  return tt(e, 0);
}
function Vx(e) {
  return tt(e, 0);
}
function qx(e) {
  return tt(e, 0);
}
function Kx(e) {
  return Hp(e);
}
function Gx(e) {
  const n = Ks();
  return tt(e, 0) || tt(e, 1) && "length" in e.properties && jt(qe(e.properties.length, n)) === W.True;
}
function Hx(e) {
  return tt(e, 0);
}
function Hp(e) {
  const n = Ks();
  return tt(e, 0) || tt(e, 1) && "length" in e.properties && jt(qe(e.properties.length, n)) === W.True;
}
function kx(e) {
  const n = fc([Nu()], Nu());
  return tt(e, 0) || tt(e, 1) && "then" in e.properties && jt(qe(e.properties.then, n)) === W.True;
}
function av(e, n) {
  return qe(e, n) === W.False || rp(e) && !rp(n) ? W.False : W.True;
}
function Ln(e, n) {
  return ar(e) ? W.False : ir(e) ? W.Union : _i(e) || Bw(e) && c_(n) || jw(e) && Cl(n) || xw(e) && f_(n) || xu(e) && d_(n) || Bp(e) && Vx(n) || or(e) && c_(n) || xu(e) && d_(n) || Zn(e) && Cl(n) || ni(e) && Cl(n) || za(e) && f_(n) || dc(e) && Kx(n) || xp(e) && qx(n) || jp(e) && Hx(n) || Fp(e) && Gx(n) ? W.True : $n(e) && or(vy(e)) ? n[$p] === "Record" ? W.True : W.False : $n(e) && Zn(vy(e)) ? tt(n, 0) ? W.True : W.False : W.False;
}
function Wx(e, n) {
  return yn(n) ? mn(e, n) : $n(n) ? Vt(e, n) : rn(n) ? (() => {
    for (const t of Object.getOwnPropertyNames(n.properties)) {
      if (!(t in e.properties) && !rp(n.properties[t]))
        return W.False;
      if (rp(n.properties[t]))
        return W.True;
      if (av(e.properties[t], n.properties[t]) === W.False)
        return W.False;
    }
    return W.True;
  })() : W.False;
}
function zx(e, n) {
  return yn(n) ? mn(e, n) : rn(n) && kx(n) ? W.True : xm(n) ? jt(qe(e.item, n.item)) : W.False;
}
function vy(e) {
  return Ss in e.patternProperties ? Ks() : Rs in e.patternProperties ? Lu() : ks("Unknown record key pattern");
}
function Sy(e) {
  return Ss in e.patternProperties ? e.patternProperties[Ss] : Rs in e.patternProperties ? e.patternProperties[Rs] : ks("Unable to get record value schema");
}
function Vt(e, n) {
  const [t, r] = [vy(n), Sy(n)];
  return Bw(e) && Zn(t) && jt(qe(e, r)) === W.True ? W.True : dc(e) && Zn(t) || or(e) && Zn(t) || Wa(e) && Zn(t) ? qe(e, r) : rn(e) ? (() => {
    for (const i of Object.getOwnPropertyNames(e.properties))
      if (av(r, e.properties[i]) === W.False)
        return W.False;
    return W.True;
  })() : W.False;
}
function Jx(e, n) {
  return yn(n) ? mn(e, n) : rn(n) ? Ln(e, n) : $n(n) ? qe(Sy(e), Sy(n)) : W.False;
}
function Yx(e, n) {
  const t = ju(e) ? Lu() : e, r = ju(n) ? Lu() : n;
  return qe(t, r);
}
function sv(e, n) {
  return Ti(e) && an(e.const) || or(e) ? W.True : W.False;
}
function Xx(e, n) {
  return yn(n) ? mn(e, n) : rn(n) ? Ln(e, n) : $n(n) ? Vt(e, n) : or(n) ? W.True : W.False;
}
function Qx(e, n) {
  return yn(n) ? mn(e, n) : rn(n) ? Ln(e, n) : $n(n) ? Vt(e, n) : xu(n) ? W.True : W.False;
}
function Zx(e, n) {
  return Fu(e) ? qe(ip(e), n) : Fu(n) ? qe(e, ip(n)) : ks("Invalid fallthrough for TemplateLiteral");
}
function eF(e, n) {
  return Wa(n) && e.items !== void 0 && e.items.every((t) => qe(t, n.items) === W.True);
}
function nF(e, n) {
  return _i(e) ? W.True : ar(e) ? W.False : ir(e) ? W.Union : W.False;
}
function tF(e, n) {
  return yn(n) ? mn(e, n) : rn(n) && Hp(n) || Wa(n) && eF(e, n) ? W.True : Np(n) ? _n(e.items) && !_n(n.items) || !_n(e.items) && _n(n.items) ? W.False : _n(e.items) && !_n(n.items) || e.items.every((t, r) => qe(t, n.items[r]) === W.True) ? W.True : W.False : W.False;
}
function rF(e, n) {
  return yn(n) ? mn(e, n) : rn(n) ? Ln(e, n) : $n(n) ? Vt(e, n) : dc(n) ? W.True : W.False;
}
function iF(e, n) {
  return yn(n) ? mn(e, n) : rn(n) ? Ln(e, n) : $n(n) ? Vt(e, n) : Dp(n) ? sF(e) : Ua(n) ? W.True : W.False;
}
function Ym(e, n) {
  return n.anyOf.some((t) => qe(e, t) === W.True) ? W.True : W.False;
}
function oF(e, n) {
  return e.anyOf.every((t) => qe(t, n) === W.True) ? W.True : W.False;
}
function uv(e, n) {
  return W.True;
}
function aF(e, n) {
  return _i(n) ? iv() : Ja(n) ? Gp(e, n) : Xr(n) ? Ym(e, n) : ir(n) ? Jm() : or(n) ? sv(e) : Zn(n) ? ov(e) : ni(n) ? rv(e) : za(n) ? tv(e) : Wa(n) ? wx(e) : Np(n) ? nF(e) : rn(n) ? Ln(e, n) : ar(n) ? W.True : W.False;
}
function sF(e, n) {
  return Ua(e) || Ua(e) ? W.True : W.False;
}
function uF(e, n) {
  return Ja(n) ? Gp(e, n) : Xr(n) ? Ym(e, n) : ar(n) ? uv() : ir(n) ? Jm() : rn(n) ? Ln(e, n) : Dp(n) ? W.True : W.False;
}
function qe(e, n) {
  return (
    // resolvable
    Fu(e) || Fu(n) ? Zx(e, n) : ju(e) || ju(n) ? Yx(e, n) : vs(e) || vs(n) ? Dx(e, n) : (
      // standard
      ir(e) ? Ax(e, n) : Wa(e) ? vx(e, n) : Bp(e) ? Rx(e, n) : za(e) ? Ex(e, n) : Cm(e) ? Sx(e, n) : jp(e) ? $x(e, n) : xp(e) ? Mx(e, n) : Fp(e) ? Cx(e, n) : ni(e) ? Bx(e, n) : Ja(e) ? jx(e, n) : Bm(e) ? xx(e, n) : Ti(e) ? Fx(e, n) : _i(e) ? Nx() : jm(e) ? Ux(e, n) : Zn(e) ? Lx(e, n) : rn(e) ? Wx(e, n) : $n(e) ? Jx(e, n) : or(e) ? Xx(e, n) : xu(e) ? Qx(e, n) : Np(e) ? tF(e, n) : xm(e) ? zx(e, n) : dc(e) ? rF(e, n) : Ua(e) ? iF(e, n) : Xr(e) ? oF(e, n) : ar(e) ? aF(e, n) : Dp(e) ? uF(e, n) : ks(`Unknown left type operand '${e[se]}'`)
    )
  );
}
function pc(e, n) {
  return qe(e, n);
}
function cF(e, n, t, r, i) {
  const o = {};
  for (const a of globalThis.Object.getOwnPropertyNames(e))
    o[a] = Xm(e[a], n, t, r, Lt(i));
  return o;
}
function dF(e, n, t, r, i) {
  return cF(e.properties, n, t, r, i);
}
function fF(e, n, t, r, i) {
  const o = dF(e, n, t, r, i);
  return jn(o);
}
function pF(e, n, t, r) {
  const i = pc(e, n);
  return i === W.Union ? xn([t, r]) : i === W.True ? t : r;
}
function Xm(e, n, t, r, i) {
  return ht(e) ? fF(e, n, t, r, i) : Ha(e) ? ce(gF(e, n, t, r, i)) : ce(pF(e, n, t, r), i);
}
function lF(e, n, t, r, i) {
  return {
    [e]: Xm(fn(e), n, t, r, Lt(i))
  };
}
function yF(e, n, t, r, i) {
  return e.reduce((o, a) => ({ ...o, ...lF(a, n, t, r, i) }), {});
}
function mF(e, n, t, r, i) {
  return yF(e.keys, n, t, r, i);
}
function gF(e, n, t, r, i) {
  const o = mF(e, n, t, r, i);
  return jn(o);
}
function TF(e) {
  return e.allOf.every((n) => kp(n));
}
function _F(e) {
  return e.anyOf.some((n) => kp(n));
}
function bF(e) {
  return !kp(e.not);
}
function kp(e) {
  return e[se] === "Intersect" ? TF(e) : e[se] === "Union" ? _F(e) : e[se] === "Not" ? bF(e) : e[se] === "Undefined";
}
function hF(e, n) {
  return Qm(ip(e), n);
}
function IF(e, n) {
  const t = e.filter((r) => pc(r, n) === W.False);
  return t.length === 1 ? t[0] : xn(t);
}
function Qm(e, n, t = {}) {
  return ka(e) ? ce(hF(e, n), t) : ht(e) ? ce(AF(e, n), t) : ce(Cn(e) ? IF(e.anyOf, n) : pc(e, n) !== W.False ? Bn() : e, t);
}
function OF(e, n) {
  const t = {};
  for (const r of globalThis.Object.getOwnPropertyNames(e))
    t[r] = Qm(e[r], n);
  return t;
}
function PF(e, n) {
  return OF(e.properties, n);
}
function AF(e, n) {
  const t = PF(e, n);
  return jn(t);
}
function wF(e, n) {
  return Zm(ip(e), n);
}
function vF(e, n) {
  const t = e.filter((r) => pc(r, n) !== W.False);
  return t.length === 1 ? t[0] : xn(t);
}
function Zm(e, n, t) {
  return ka(e) ? ce(wF(e, n), t) : ht(e) ? ce(EF(e, n), t) : ce(Cn(e) ? vF(e.anyOf, n) : pc(e, n) !== W.False ? e : Bn(), t);
}
function SF(e, n) {
  const t = {};
  for (const r of globalThis.Object.getOwnPropertyNames(e))
    t[r] = Zm(e[r], n);
  return t;
}
function RF(e, n) {
  return SF(e.properties, n);
}
function EF(e, n) {
  const t = RF(e, n);
  return jn(t);
}
function $F(e, n) {
  return ce(e.returns, n);
}
function MF(e) {
  return ce({ [se]: "Integer", type: "integer" }, e);
}
function CF(e, n, t) {
  return {
    [e]: Ws(fn(e), n, Lt(t))
  };
}
function BF(e, n, t) {
  return e.reduce((i, o) => ({ ...i, ...CF(o, n, t) }), {});
}
function jF(e, n, t) {
  return BF(e.keys, n, t);
}
function xF(e, n, t) {
  const r = jF(e, n, t);
  return jn(r);
}
function FF(e) {
  const [n, t] = [e.slice(0, 1), e.slice(1)];
  return [n.toLowerCase(), t].join("");
}
function NF(e) {
  const [n, t] = [e.slice(0, 1), e.slice(1)];
  return [n.toUpperCase(), t].join("");
}
function DF(e) {
  return e.toUpperCase();
}
function UF(e) {
  return e.toLowerCase();
}
function LF(e, n, t) {
  const r = qm(e.pattern);
  if (!Uu(r))
    return { ...e, pattern: cv(e.pattern, n) };
  const a = [...Lp(r)].map((u) => fn(u)), s = dv(a, n), c = xn(s);
  return qw([c], t);
}
function cv(e, n) {
  return typeof e == "string" ? n === "Uncapitalize" ? FF(e) : n === "Capitalize" ? NF(e) : n === "Uppercase" ? DF(e) : n === "Lowercase" ? UF(e) : e : e.toString();
}
function dv(e, n) {
  return e.map((t) => Ws(t, n));
}
function Ws(e, n, t = {}) {
  return (
    // Intrinsic-Mapped-Inference
    Ha(e) ? xF(e, n, t) : (
      // Standard-Inference
      ka(e) ? LF(e, n, t) : Cn(e) ? xn(dv(e.anyOf, n), t) : uc(e) ? fn(cv(e.const, n), t) : (
        // Default Type
        ce(e, t)
      )
    )
  );
}
function VF(e, n = {}) {
  return Ws(e, "Capitalize", n);
}
function qF(e, n = {}) {
  return Ws(e, "Lowercase", n);
}
function KF(e, n = {}) {
  return Ws(e, "Uncapitalize", n);
}
function GF(e, n = {}) {
  return Ws(e, "Uppercase", n);
}
function HF(e, n, t) {
  const r = {};
  for (const i of globalThis.Object.getOwnPropertyNames(e))
    r[i] = Wp(e[i], n, Lt(t));
  return r;
}
function kF(e, n, t) {
  return HF(e.properties, n, t);
}
function WF(e, n, t) {
  const r = kF(e, n, t);
  return jn(r);
}
function zF(e, n) {
  return e.map((t) => eg(t, n));
}
function JF(e, n) {
  return e.map((t) => eg(t, n));
}
function YF(e, n) {
  const { [n]: t, ...r } = e;
  return r;
}
function XF(e, n) {
  return n.reduce((t, r) => YF(t, r), e);
}
function QF(e, n) {
  const t = gt(e, [gr, "$id", "required", "properties"]), r = XF(e.properties, n);
  return Dn(r, t);
}
function ZF(e) {
  const n = e.reduce((t, r) => vw(r) ? [...t, fn(r)] : t, []);
  return xn(n);
}
function eg(e, n) {
  return dr(e) ? hi(zF(e.allOf, n)) : Cn(e) ? xn(JF(e.anyOf, n)) : Sr(e) ? QF(e, n) : Dn({});
}
function Wp(e, n, t) {
  const r = it(n) ? ZF(n) : n, i = kr(n) ? bi(n) : n, o = nt(e), a = nt(n);
  return ht(e) ? WF(e, i, t) : Ha(n) ? r1(e, n, t) : o && a ? Ze("Omit", [e, r], t) : !o && a ? Ze("Omit", [e, r], t) : o && !a ? Ze("Omit", [e, r], t) : ce({ ...eg(e, i), ...t });
}
function e1(e, n, t) {
  return { [n]: Wp(e, [n], Lt(t)) };
}
function n1(e, n, t) {
  return n.reduce((r, i) => ({ ...r, ...e1(e, i, t) }), {});
}
function t1(e, n, t) {
  return n1(e, n.keys, t);
}
function r1(e, n, t) {
  const r = t1(e, n, t);
  return jn(r);
}
function i1(e, n, t) {
  const r = {};
  for (const i of globalThis.Object.getOwnPropertyNames(e))
    r[i] = zp(e[i], n, Lt(t));
  return r;
}
function o1(e, n, t) {
  return i1(e.properties, n, t);
}
function a1(e, n, t) {
  const r = o1(e, n, t);
  return jn(r);
}
function s1(e, n) {
  return e.map((t) => ng(t, n));
}
function u1(e, n) {
  return e.map((t) => ng(t, n));
}
function c1(e, n) {
  const t = {};
  for (const r of n)
    r in e && (t[r] = e[r]);
  return t;
}
function d1(e, n) {
  const t = gt(e, [gr, "$id", "required", "properties"]), r = c1(e.properties, n);
  return Dn(r, t);
}
function f1(e) {
  const n = e.reduce((t, r) => vw(r) ? [...t, fn(r)] : t, []);
  return xn(n);
}
function ng(e, n) {
  return dr(e) ? hi(s1(e.allOf, n)) : Cn(e) ? xn(u1(e.anyOf, n)) : Sr(e) ? d1(e, n) : Dn({});
}
function zp(e, n, t) {
  const r = it(n) ? f1(n) : n, i = kr(n) ? bi(n) : n, o = nt(e), a = nt(n);
  return ht(e) ? a1(e, i, t) : Ha(n) ? m1(e, n, t) : o && a ? Ze("Pick", [e, r], t) : !o && a ? Ze("Pick", [e, r], t) : o && !a ? Ze("Pick", [e, r], t) : ce({ ...ng(e, i), ...t });
}
function p1(e, n, t) {
  return {
    [n]: zp(e, [n], Lt(t))
  };
}
function l1(e, n, t) {
  return n.reduce((r, i) => ({ ...r, ...p1(e, i, t) }), {});
}
function y1(e, n, t) {
  return l1(e, n.keys, t);
}
function m1(e, n, t) {
  const r = y1(e, n, t);
  return jn(r);
}
function g1(e, n) {
  return Ze("Partial", [Ze(e, n)]);
}
function T1(e) {
  return Ze("Partial", [Hs(e)]);
}
function _1(e) {
  const n = {};
  for (const t of globalThis.Object.getOwnPropertyNames(e))
    n[t] = Xa(e[t]);
  return n;
}
function b1(e) {
  const n = gt(e, [gr, "$id", "required", "properties"]), t = _1(e.properties);
  return Dn(t, n);
}
function p_(e) {
  return e.map((n) => fv(n));
}
function fv(e) {
  return pi(e) ? g1(e.target, e.parameters) : nt(e) ? T1(e.$ref) : dr(e) ? hi(p_(e.allOf)) : Cn(e) ? xn(p_(e.anyOf)) : Sr(e) ? b1(e) : Dn({});
}
function tg(e, n) {
  return ht(e) ? O1(e, n) : ce({ ...fv(e), ...n });
}
function h1(e, n) {
  const t = {};
  for (const r of globalThis.Object.getOwnPropertyNames(e))
    t[r] = tg(e[r], Lt(n));
  return t;
}
function I1(e, n) {
  return h1(e.properties, n);
}
function O1(e, n) {
  const t = I1(e, n);
  return jn(t);
}
function Qa(e, n, t) {
  return ce({ [se]: "Record", type: "object", patternProperties: { [e]: n } }, t);
}
function rg(e, n, t) {
  const r = {};
  for (const i of e)
    r[i] = n;
  return Dn(r, { ...t, [$p]: "Record" });
}
function P1(e, n, t) {
  return Dw(e) ? rg(bi(e), n, t) : Qa(e.pattern, n, t);
}
function A1(e, n, t) {
  return rg(bi(xn(e)), n, t);
}
function w1(e, n, t) {
  return rg([e.toString()], n, t);
}
function v1(e, n, t) {
  return Qa(e.source, n, t);
}
function S1(e, n, t) {
  const r = _n(e.pattern) ? Rs : e.pattern;
  return Qa(r, n, t);
}
function R1(e, n, t) {
  return Qa(Rs, n, t);
}
function E1(e, n, t) {
  return Qa(vB, n, t);
}
function $1(e, n, t) {
  return Qa(Ss, n, t);
}
function M1(e, n, t) {
  return Qa(Ss, n, t);
}
function pv(e, n, t = {}) {
  return pi(n) ? Ze("Record", [e, Ze(n.target, n.parameters)], t) : pi(e) ? Ze("Record", [Ze(n.target, n.parameters), n], t) : nt(e) ? Ze("Record", [Hs(e.$ref), n]) : Cn(e) ? A1(e.anyOf, n, t) : ka(e) ? P1(e, n, t) : uc(e) ? w1(e.const, n, t) : Mp(e) ? $1(e, n, t) : Cp(e) ? M1(e, n, t) : Rw(e) ? v1(e, n, t) : Rm(e) ? S1(e, n, t) : Pw(e) ? R1(e, n, t) : cc(e) ? E1(e, n, t) : Bn(t);
}
function C1(e, n) {
  return Ze("Required", [Ze(e, n)]);
}
function B1(e) {
  return Ze("Required", [Hs(e)]);
}
function j1(e) {
  const n = {};
  for (const t of globalThis.Object.getOwnPropertyNames(e))
    n[t] = gt(e[t], [ei]);
  return n;
}
function x1(e) {
  const n = gt(e, [gr, "$id", "required", "properties"]), t = j1(e.properties);
  return Dn(t, n);
}
function l_(e) {
  return e.map((n) => lv(n));
}
function lv(e) {
  return pi(e) ? C1(e.target, e.parameters) : nt(e) ? B1(e.$ref) : dr(e) ? hi(l_(e.allOf)) : Cn(e) ? xn(l_(e.anyOf)) : Sr(e) ? x1(e) : Dn({});
}
function ig(e, n) {
  return ht(e) ? D1(e, n) : ce({ ...lv(e), ...n });
}
function F1(e, n) {
  const t = {};
  for (const r of globalThis.Object.getOwnPropertyNames(e))
    t[r] = ig(e[r], n);
  return t;
}
function N1(e, n) {
  return F1(e.properties, n);
}
function D1(e, n) {
  const t = N1(e, n);
  return jn(t);
}
function U1(e, n) {
  return n.map((t) => nt(t) ? yv(e, t.$ref) : xt(e, t));
}
function yv(e, n) {
  return n in e ? nt(e[n]) ? yv(e, e[n].$ref) : xt(e, e[n]) : Bn();
}
function L1(e) {
  return qp(e[0]);
}
function V1(e) {
  return Vp(e[0], e[1]);
}
function q1(e) {
  return km(e[0]);
}
function K1(e) {
  return tg(e[0]);
}
function G1(e) {
  return Wp(e[0], e[1]);
}
function H1(e) {
  return zp(e[0], e[1]);
}
function k1(e) {
  return pv(e[0], e[1]);
}
function W1(e) {
  return ig(e[0]);
}
function z1(e, n, t) {
  const r = U1(e, t);
  return n === "Awaited" ? L1(r) : n === "Index" ? V1(r) : n === "KeyOf" ? q1(r) : n === "Partial" ? K1(r) : n === "Omit" ? G1(r) : n === "Pick" ? H1(r) : n === "Record" ? k1(r) : n === "Required" ? W1(r) : Bn();
}
function J1(e, n) {
  return Dn(globalThis.Object.keys(n).reduce((t, r) => ({ ...t, [r]: xt(e, n[r]) }), {}));
}
function Y1(e, n, t) {
  return Lm(lc(e, n), xt(e, t));
}
function X1(e, n, t) {
  return fc(lc(e, n), xt(e, t));
}
function Q1(e, n) {
  return Gs(lc(e, n));
}
function Z1(e, n) {
  return hi(lc(e, n));
}
function eN(e, n) {
  return xn(lc(e, n));
}
function nN(e, n) {
  return Dm(xt(e, n));
}
function tN(e, n) {
  return Um(xt(e, n));
}
function rN(e, n) {
  return Hm(xt(e, n));
}
function lc(e, n) {
  return n.map((t) => xt(e, t));
}
function xt(e, n) {
  return (
    // Modifier Unwrap - Reapplied via CreateType Options
    Ga(n) ? ce(xt(e, gt(n, [ei])), n) : Ow(n) ? ce(xt(e, gt(n, [ac])), n) : (
      // Traveral
      sc(n) ? ce(nN(e, n.items), n) : Pm(n) ? ce(tN(e, n.items), n) : pi(n) ? ce(z1(e, n.target, n.parameters)) : Am(n) ? ce(Y1(e, n.parameters, n.returns), n) : wm(n) ? ce(X1(e, n.parameters, n.returns), n) : dr(n) ? ce(Z1(e, n.allOf), n) : vm(n) ? ce(rN(e, n.items), n) : Sr(n) ? ce(J1(e, n.properties), n) : Vs(n) ? ce(Q1(e, n.items || []), n) : Cn(n) ? ce(eN(e, n.anyOf), n) : n
    )
  );
}
function iN(e, n) {
  return n in e ? xt(e, e[n]) : Bn();
}
function oN(e) {
  return globalThis.Object.getOwnPropertyNames(e).reduce((n, t) => ({ ...n, [t]: iN(e, t) }), {});
}
class aN {
  constructor(n) {
    const t = oN(n), r = this.WithIdentifiers(t);
    this.$defs = r;
  }
  /** `[Json]` Imports a Type by Key. */
  Import(n, t) {
    const r = { ...this.$defs, [n]: ce(this.$defs[n], t) };
    return ce({ [se]: "Import", $defs: r, $ref: n });
  }
  // prettier-ignore
  WithIdentifiers(n) {
    return globalThis.Object.getOwnPropertyNames(n).reduce((t, r) => ({ ...t, [r]: { ...n[r], $id: r } }), {});
  }
}
function sN(e) {
  return new aN(e);
}
function uN(e, n) {
  return ce({ [se]: "Not", not: e }, n);
}
function cN(e, n) {
  return Gs(e.parameters, n);
}
function dN(e) {
  return Ya(Xa(e));
}
let fN = 0;
function pN(e, n = {}) {
  _n(n.$id) && (n.$id = `T${fN++}`);
  const t = GC(e({ [se]: "This", $ref: `${n.$id}` }));
  return t.$id = n.$id, ce({ [$p]: "Recursive", ...t }, n);
}
function lN(e, n) {
  const t = an(e) ? new globalThis.RegExp(e) : e;
  return ce({ [se]: "RegExp", type: "RegExp", source: t.source, flags: t.flags }, n);
}
function yN(e) {
  return dr(e) ? e.allOf : Cn(e) ? e.anyOf : Vs(e) ? e.items ?? [] : [];
}
function mN(e) {
  return yN(e);
}
function gN(e, n) {
  return ce(e.returns, n);
}
class TN {
  constructor(n) {
    this.schema = n;
  }
  Decode(n) {
    return new _N(this.schema, n);
  }
}
class _N {
  constructor(n, t) {
    this.schema = n, this.decode = t;
  }
  EncodeTransform(n, t) {
    const o = { Encode: (a) => t[gr].Encode(n(a)), Decode: (a) => this.decode(t[gr].Decode(a)) };
    return { ...t, [gr]: o };
  }
  EncodeSchema(n, t) {
    const r = { Decode: this.decode, Encode: n };
    return { ...t, [gr]: r };
  }
  Encode(n) {
    return Em(this.schema) ? this.EncodeTransform(n, this.schema) : this.EncodeSchema(n, this.schema);
  }
}
function bN(e) {
  return new TN(e);
}
function hN(e = {}) {
  return ce({ [se]: e[se] ?? "Unsafe" }, e);
}
function IN(e) {
  return ce({ [se]: "Void", type: "void" }, e);
}
const ON = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Any: Nu,
  Array: Dm,
  AsyncIterator: Um,
  Awaited: qp,
  BigInt: Gm,
  Boolean: Lw,
  Capitalize: VF,
  Composite: Tx,
  Const: hx,
  Constructor: Lm,
  ConstructorParameters: Ix,
  Date: Xw,
  Enum: Ox,
  Exclude: Qm,
  Extends: Xm,
  Extract: Zm,
  Function: fc,
  Index: Vp,
  InstanceType: $F,
  Integer: MF,
  Intersect: hi,
  Iterator: Hm,
  KeyOf: km,
  Literal: fn,
  Lowercase: qF,
  Mapped: Uj,
  Module: sN,
  Never: Bn,
  Not: uN,
  Null: Qw,
  Number: Ks,
  Object: Dn,
  Omit: Wp,
  Optional: Xa,
  Parameters: cN,
  Partial: tg,
  Pick: zp,
  Promise: kw,
  Readonly: Ya,
  ReadonlyOptional: dN,
  Record: pv,
  Recursive: pN,
  Ref: Hs,
  RegExp: lN,
  Required: ig,
  Rest: mN,
  ReturnType: gN,
  String: Lu,
  Symbol: Zw,
  TemplateLiteral: qw,
  Transform: bN,
  Tuple: Gs,
  Uint8Array: nv,
  Uncapitalize: KF,
  Undefined: ev,
  Union: xn,
  Unknown: Wm,
  Unsafe: hN,
  Uppercase: GF,
  Void: IN
}, Symbol.toStringTag, { value: "Module" })), S = ON, PN = (e) => se in e && e[se] === "Union", AN = (e) => S.Optional(S.Union([e, S.Null()])), wN = (e) => S.Omit(e, ["owner"]);
var vN = {
  /**
   * Object.keys, but with nice typing (`Array<keyof T>`)
   */
  keys: Object.keys,
  /**
   * Object.values, but with nice typing (`Array<ValueOf<T>>`)
   * @deprecated - Built-in Object.values appears to have decent typing, and accounts for Arrays/ArrayLikes
   * (TS 4.4.2 - typing is: values<T>(yourObject: { [s: string]: T } | ArrayLike<T>): T[];)
   */
  values: Object.values,
  /**
   * Object.entries, but with nice typing
   */
  entries: Object.entries,
  /**
   * Object.fromEntries, but with nice typing
   */
  fromEntries: Object.fromEntries
};
const SN = (e, n) => {
  const t = n.properties, r = S.Omit(e, vN.keys(t));
  return S.Composite([r, n]);
};
Yr.ExactOptionalPropertyTypes = !0;
const mv = {
  [se]: "@codelab/Ref"
}, og = S.Object({
  id: S.String()
}), RN = (e) => S.Composite([
  S.Object({
    __typename: S.Literal(`${e}`)
  }),
  S.Object({
    // Add this for easier debugging
    name: S.Optional(S.String())
  }),
  og
]), EN = S.Object({
  $modelType: S.Literal("serialized")
}), $N = (e) => S.Composite([EN, e]), MN = {
  [se]: "@codelab/All"
}, CN = S.Array(S.Not(S.Undefined()), { minItems: 1 }), BN = {
  [se]: "@codelab/Defined"
}, li = S.Not(
  S.Union([S.Null(), S.Undefined()])
), jN = {
  [se]: "@codelab/AllOrNone"
}, xN = S.Union([
  S.Array(li),
  S.Array(S.Not(li))
]), FN = {
  [se]: "@codelab/AtLeastOne"
}, NN = S.Array(S.Any(), {
  contains: li,
  minContains: 1
}), DN = {
  [se]: "@codelab/AtMostOne"
}, UN = S.Array(
  S.Union([li, S.Not(li)]),
  {
    validate: (e) => e.filter((t) => !!t).length <= 1
  }
), LN = {
  [se]: "@codelab/ExactlyOne"
}, VN = S.Array(S.Any(), {
  contains: li,
  minContains: 1,
  maxContains: 1
}), qN = {
  [se]: "@codelab/Ipv4"
}, KN = S.String({
  format: "ipv4"
}), GN = /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/, HN = (e) => GN.test(e), kN = {
  [se]: "@codelab/None"
}, WN = S.Array(S.Not(li));
class zN extends cr {
  constructor(n) {
    super(`Unable to dereference schema with $id '${n.$ref}'`), this.schema = n;
  }
}
function JN(e, n) {
  const t = n.find((r) => r.$id === e.$ref);
  if (t === void 0)
    throw new zN(e);
  return yc(t, n);
}
function gv(e, n) {
  return !oc(e.$id) || n.some((t) => t.$id === e.$id) || n.push(e), n;
}
function yc(e, n) {
  return e[se] === "This" || e[se] === "Ref" ? JN(e, n) : e;
}
class YN extends cr {
  constructor(n) {
    super("Unable to hash value"), this.value = n;
  }
}
var Tt;
(function(e) {
  e[e.Undefined = 0] = "Undefined", e[e.Null = 1] = "Null", e[e.Boolean = 2] = "Boolean", e[e.Number = 3] = "Number", e[e.String = 4] = "String", e[e.Object = 5] = "Object", e[e.Array = 6] = "Array", e[e.Date = 7] = "Date", e[e.Uint8Array = 8] = "Uint8Array", e[e.Symbol = 9] = "Symbol", e[e.BigInt = 10] = "BigInt";
})(Tt || (Tt = {}));
let ls = BigInt("14695981039346656037");
const [XN, QN] = [BigInt("1099511628211"), BigInt(
  "18446744073709551616"
  /* 2 ^ 64 */
)], ZN = Array.from({ length: 256 }).map((e, n) => BigInt(n)), Tv = new Float64Array(1), _v = new DataView(Tv.buffer), bv = new Uint8Array(Tv.buffer);
function* eD(e) {
  const n = e === 0 ? 1 : Math.ceil(Math.floor(Math.log2(e) + 1) / 8);
  for (let t = 0; t < n; t++)
    yield e >> 8 * (n - 1 - t) & 255;
}
function nD(e) {
  Un(Tt.Array);
  for (const n of e)
    $s(n);
}
function tD(e) {
  Un(Tt.Boolean), Un(e ? 1 : 0);
}
function rD(e) {
  Un(Tt.BigInt), _v.setBigInt64(0, e);
  for (const n of bv)
    Un(n);
}
function iD(e) {
  Un(Tt.Date), $s(e.getTime());
}
function oD(e) {
  Un(Tt.Null);
}
function aD(e) {
  Un(Tt.Number), _v.setFloat64(0, e);
  for (const n of bv)
    Un(n);
}
function sD(e) {
  Un(Tt.Object);
  for (const n of globalThis.Object.getOwnPropertyNames(e).sort())
    $s(n), $s(e[n]);
}
function uD(e) {
  Un(Tt.String);
  for (let n = 0; n < e.length; n++)
    for (const t of eD(e.charCodeAt(n)))
      Un(t);
}
function cD(e) {
  Un(Tt.Symbol), $s(e.description);
}
function dD(e) {
  Un(Tt.Uint8Array);
  for (let n = 0; n < e.length; n++)
    Un(e[n]);
}
function fD(e) {
  return Un(Tt.Undefined);
}
function $s(e) {
  if (ic(e))
    return nD(e);
  if (hm(e))
    return tD(e);
  if (Im(e))
    return rD(e);
  if (_m(e))
    return iD(e);
  if (bm(e))
    return oD();
  if (wa(e))
    return aD(e);
  if (rc(e))
    return sD(e);
  if (oc(e))
    return uD(e);
  if (Om(e))
    return cD(e);
  if (hw(e))
    return dD(e);
  if (Ep(e))
    return fD();
  throw new YN(e);
}
function Un(e) {
  ls = ls ^ ZN[e], ls = ls * XN % QN;
}
function pD(e) {
  return ls = BigInt("14695981039346656037"), $s(e), ls;
}
class lD extends cr {
  constructor(n) {
    super("Unknown type"), this.schema = n;
  }
}
function yD(e) {
  return e[se] === "Any" || e[se] === "Unknown";
}
function Se(e) {
  return e !== void 0;
}
function mD(e, n, t) {
  return !0;
}
function gD(e, n, t) {
  if (!ic(t) || Se(e.minItems) && !(t.length >= e.minItems) || Se(e.maxItems) && !(t.length <= e.maxItems) || !t.every((o) => An(e.items, n, o)) || e.uniqueItems === !0 && !function() {
    const o = /* @__PURE__ */ new Set();
    for (const a of t) {
      const s = pD(a);
      if (o.has(s))
        return !1;
      o.add(s);
    }
    return !0;
  }())
    return !1;
  if (!(Se(e.contains) || wa(e.minContains) || wa(e.maxContains)))
    return !0;
  const r = Se(e.contains) ? e.contains : Bn(), i = t.reduce((o, a) => An(r, n, a) ? o + 1 : o, 0);
  return !(i === 0 || wa(e.minContains) && i < e.minContains || wa(e.maxContains) && i > e.maxContains);
}
function TD(e, n, t) {
  return HC(t);
}
function _D(e, n, t) {
  return !(!Im(t) || Se(e.exclusiveMaximum) && !(t < e.exclusiveMaximum) || Se(e.exclusiveMinimum) && !(t > e.exclusiveMinimum) || Se(e.maximum) && !(t <= e.maximum) || Se(e.minimum) && !(t >= e.minimum) || Se(e.multipleOf) && t % e.multipleOf !== BigInt(0));
}
function bD(e, n, t) {
  return hm(t);
}
function hD(e, n, t) {
  return An(e.returns, n, t.prototype);
}
function ID(e, n, t) {
  return !(!_m(t) || Se(e.exclusiveMaximumTimestamp) && !(t.getTime() < e.exclusiveMaximumTimestamp) || Se(e.exclusiveMinimumTimestamp) && !(t.getTime() > e.exclusiveMinimumTimestamp) || Se(e.maximumTimestamp) && !(t.getTime() <= e.maximumTimestamp) || Se(e.minimumTimestamp) && !(t.getTime() >= e.minimumTimestamp) || Se(e.multipleOfTimestamp) && t.getTime() % e.multipleOfTimestamp !== 0);
}
function OD(e, n, t) {
  return Iw(t);
}
function PD(e, n, t) {
  const r = globalThis.Object.values(e.$defs), i = e.$defs[e.$ref];
  return An(i, [...n, ...r], t);
}
function AD(e, n, t) {
  return !(!XC(t) || Se(e.exclusiveMaximum) && !(t < e.exclusiveMaximum) || Se(e.exclusiveMinimum) && !(t > e.exclusiveMinimum) || Se(e.maximum) && !(t <= e.maximum) || Se(e.minimum) && !(t >= e.minimum) || Se(e.multipleOf) && t % e.multipleOf !== 0);
}
function wD(e, n, t) {
  const r = e.allOf.every((i) => An(i, n, t));
  if (e.unevaluatedProperties === !1) {
    const i = new RegExp(s_(e)), o = Object.getOwnPropertyNames(t).every((a) => i.test(a));
    return r && o;
  } else if (kr(e.unevaluatedProperties)) {
    const i = new RegExp(s_(e)), o = Object.getOwnPropertyNames(t).every((a) => i.test(a) || An(e.unevaluatedProperties, n, t[a]));
    return r && o;
  } else
    return r;
}
function vD(e, n, t) {
  return kC(t);
}
function SD(e, n, t) {
  return t === e.const;
}
function RD(e, n, t) {
  return !1;
}
function ED(e, n, t) {
  return !An(e.not, n, t);
}
function $D(e, n, t) {
  return bm(t);
}
function MD(e, n, t) {
  return !(!Yr.IsNumberLike(t) || Se(e.exclusiveMaximum) && !(t < e.exclusiveMaximum) || Se(e.exclusiveMinimum) && !(t > e.exclusiveMinimum) || Se(e.minimum) && !(t >= e.minimum) || Se(e.maximum) && !(t <= e.maximum) || Se(e.multipleOf) && t % e.multipleOf !== 0);
}
function CD(e, n, t) {
  if (!Yr.IsObjectLike(t) || Se(e.minProperties) && !(Object.getOwnPropertyNames(t).length >= e.minProperties) || Se(e.maxProperties) && !(Object.getOwnPropertyNames(t).length <= e.maxProperties))
    return !1;
  const r = Object.getOwnPropertyNames(e.properties);
  for (const i of r) {
    const o = e.properties[i];
    if (e.required && e.required.includes(i)) {
      if (!An(o, n, t[i]) || (kp(o) || yD(o)) && !(i in t))
        return !1;
    } else if (Yr.IsExactOptionalProperty(t, i) && !An(o, n, t[i]))
      return !1;
  }
  if (e.additionalProperties === !1) {
    const i = Object.getOwnPropertyNames(t);
    return e.required && e.required.length === r.length && i.length === r.length ? !0 : i.every((o) => r.includes(o));
  } else return typeof e.additionalProperties == "object" ? Object.getOwnPropertyNames(t).every((o) => r.includes(o) || An(e.additionalProperties, n, t[o])) : !0;
}
function BD(e, n, t) {
  return WC(t);
}
function jD(e, n, t) {
  if (!Yr.IsRecordLike(t) || Se(e.minProperties) && !(Object.getOwnPropertyNames(t).length >= e.minProperties) || Se(e.maxProperties) && !(Object.getOwnPropertyNames(t).length <= e.maxProperties))
    return !1;
  const [r, i] = Object.entries(e.patternProperties)[0], o = new RegExp(r), a = Object.entries(t).every(([u, f]) => o.test(u) ? An(i, n, f) : !0), s = typeof e.additionalProperties == "object" ? Object.entries(t).every(([u, f]) => o.test(u) ? !0 : An(e.additionalProperties, n, f)) : !0, c = e.additionalProperties === !1 ? Object.getOwnPropertyNames(t).every((u) => o.test(u)) : !0;
  return a && s && c;
}
function xD(e, n, t) {
  return An(yc(e, n), n, t);
}
function FD(e, n, t) {
  const r = new RegExp(e.source, e.flags);
  return Se(e.minLength) && !(t.length >= e.minLength) || Se(e.maxLength) && !(t.length <= e.maxLength) ? !1 : r.test(t);
}
function ND(e, n, t) {
  return !oc(t) || Se(e.minLength) && !(t.length >= e.minLength) || Se(e.maxLength) && !(t.length <= e.maxLength) || Se(e.pattern) && !new RegExp(e.pattern).test(t) ? !1 : Se(e.format) ? SB(e.format) ? EB(e.format)(t) : !1 : !0;
}
function DD(e, n, t) {
  return Om(t);
}
function UD(e, n, t) {
  return oc(t) && new RegExp(e.pattern).test(t);
}
function LD(e, n, t) {
  return An(yc(e, n), n, t);
}
function VD(e, n, t) {
  if (!ic(t) || e.items === void 0 && t.length !== 0 || t.length !== e.maxItems)
    return !1;
  if (!e.items)
    return !0;
  for (let r = 0; r < e.items.length; r++)
    if (!An(e.items[r], n, t[r]))
      return !1;
  return !0;
}
function qD(e, n, t) {
  return Ep(t);
}
function KD(e, n, t) {
  return e.anyOf.some((r) => An(r, n, t));
}
function GD(e, n, t) {
  return !(!hw(t) || Se(e.maxByteLength) && !(t.length <= e.maxByteLength) || Se(e.minByteLength) && !(t.length >= e.minByteLength));
}
function HD(e, n, t) {
  return !0;
}
function kD(e, n, t) {
  return Yr.IsVoidLike(t);
}
function WD(e, n, t) {
  return Up(e[se]) ? MB(e[se])(e, t) : !1;
}
function An(e, n, t) {
  const r = Se(e.$id) ? gv(e, n) : n, i = e;
  switch (i[se]) {
    case "Any":
      return mD();
    case "Array":
      return gD(i, r, t);
    case "AsyncIterator":
      return TD(i, r, t);
    case "BigInt":
      return _D(i, r, t);
    case "Boolean":
      return bD(i, r, t);
    case "Constructor":
      return hD(i, r, t);
    case "Date":
      return ID(i, r, t);
    case "Function":
      return OD(i, r, t);
    case "Import":
      return PD(i, r, t);
    case "Integer":
      return AD(i, r, t);
    case "Intersect":
      return wD(i, r, t);
    case "Iterator":
      return vD(i, r, t);
    case "Literal":
      return SD(i, r, t);
    case "Never":
      return RD();
    case "Not":
      return ED(i, r, t);
    case "Null":
      return $D(i, r, t);
    case "Number":
      return MD(i, r, t);
    case "Object":
      return CD(i, r, t);
    case "Promise":
      return BD(i, r, t);
    case "Record":
      return jD(i, r, t);
    case "Ref":
      return xD(i, r, t);
    case "RegExp":
      return FD(i, r, t);
    case "String":
      return ND(i, r, t);
    case "Symbol":
      return DD(i, r, t);
    case "TemplateLiteral":
      return UD(i, r, t);
    case "This":
      return LD(i, r, t);
    case "Tuple":
      return VD(i, r, t);
    case "Undefined":
      return qD(i, r, t);
    case "Union":
      return KD(i, r, t);
    case "Uint8Array":
      return GD(i, r, t);
    case "Unknown":
      return HD();
    case "Void":
      return kD(i, r, t);
    default:
      if (!Up(i[se]))
        throw new lD(i);
      return WD(i, r, t);
  }
}
function hv(...e) {
  return e.length === 3 ? An(e[0], e[1], e[2]) : An(e[0], [], e[1]);
}
function zD(e) {
  const n = {};
  for (const t of Object.getOwnPropertyNames(e))
    n[t] = Ms(e[t]);
  for (const t of Object.getOwnPropertySymbols(e))
    n[t] = Ms(e[t]);
  return n;
}
function JD(e) {
  return e.map((n) => Ms(n));
}
function YD(e) {
  return e.slice();
}
function XD(e) {
  return new Map(Ms([...e.entries()]));
}
function QD(e) {
  return new Set(Ms([...e.entries()]));
}
function ZD(e) {
  return new Date(e.toISOString());
}
function Ms(e) {
  if (ic(e))
    return JD(e);
  if (_m(e))
    return ZD(e);
  if (YC(e))
    return YD(e);
  if (zC(e))
    return XD(e);
  if (JC(e))
    return QD(e);
  if (rc(e))
    return zD(e);
  if (QC(e))
    return e;
  throw new Error("ValueClone: Unable to clone value");
}
class sr extends cr {
  constructor(n, t) {
    super(t), this.schema = n;
  }
}
function Ne(e) {
  return Iw(e) ? e() : Ms(e);
}
function eU(e, n) {
  return Be(e, "default") ? Ne(e.default) : {};
}
function nU(e, n) {
  if (e.uniqueItems === !0 && !Be(e, "default"))
    throw new sr(e, "Array with the uniqueItems constraint requires a default value");
  if ("contains" in e && !Be(e, "default"))
    throw new sr(e, "Array with the contains constraint requires a default value");
  return "default" in e ? Ne(e.default) : e.minItems !== void 0 ? Array.from({ length: e.minItems }).map((t) => rt(e.items, n)) : [];
}
function tU(e, n) {
  return Be(e, "default") ? Ne(e.default) : async function* () {
  }();
}
function rU(e, n) {
  return Be(e, "default") ? Ne(e.default) : BigInt(0);
}
function iU(e, n) {
  return Be(e, "default") ? Ne(e.default) : !1;
}
function oU(e, n) {
  if (Be(e, "default"))
    return Ne(e.default);
  {
    const t = rt(e.returns, n);
    return typeof t == "object" && !Array.isArray(t) ? class {
      constructor() {
        for (const [r, i] of Object.entries(t)) {
          const o = this;
          o[r] = i;
        }
      }
    } : class {
    };
  }
}
function aU(e, n) {
  return Be(e, "default") ? Ne(e.default) : e.minimumTimestamp !== void 0 ? new Date(e.minimumTimestamp) : /* @__PURE__ */ new Date();
}
function sU(e, n) {
  return Be(e, "default") ? Ne(e.default) : () => rt(e.returns, n);
}
function uU(e, n) {
  const t = globalThis.Object.values(e.$defs), r = e.$defs[e.$ref];
  return rt(r, [...n, ...t]);
}
function cU(e, n) {
  return Be(e, "default") ? Ne(e.default) : e.minimum !== void 0 ? e.minimum : 0;
}
function dU(e, n) {
  if (Be(e, "default"))
    return Ne(e.default);
  {
    const t = e.allOf.reduce((r, i) => {
      const o = rt(i, n);
      return typeof o == "object" ? { ...r, ...o } : o;
    }, {});
    if (!hv(e, n, t))
      throw new sr(e, "Intersect produced invalid value. Consider using a default value.");
    return t;
  }
}
function fU(e, n) {
  return Be(e, "default") ? Ne(e.default) : function* () {
  }();
}
function pU(e, n) {
  return Be(e, "default") ? Ne(e.default) : e.const;
}
function lU(e, n) {
  if (Be(e, "default"))
    return Ne(e.default);
  throw new sr(e, "Never types cannot be created. Consider using a default value.");
}
function yU(e, n) {
  if (Be(e, "default"))
    return Ne(e.default);
  throw new sr(e, "Not types must have a default value");
}
function mU(e, n) {
  return Be(e, "default") ? Ne(e.default) : null;
}
function gU(e, n) {
  return Be(e, "default") ? Ne(e.default) : e.minimum !== void 0 ? e.minimum : 0;
}
function TU(e, n) {
  if (Be(e, "default"))
    return Ne(e.default);
  {
    const t = new Set(e.required), r = {};
    for (const [i, o] of Object.entries(e.properties))
      t.has(i) && (r[i] = rt(o, n));
    return r;
  }
}
function _U(e, n) {
  return Be(e, "default") ? Ne(e.default) : Promise.resolve(rt(e.item, n));
}
function bU(e, n) {
  const [t, r] = Object.entries(e.patternProperties)[0];
  if (Be(e, "default"))
    return Ne(e.default);
  if (t === Rs || t === Ss)
    return {};
  {
    const i = t.slice(1, t.length - 1).split("|"), o = {};
    for (const a of i)
      o[a] = rt(r, n);
    return o;
  }
}
function hU(e, n) {
  return Be(e, "default") ? Ne(e.default) : rt(yc(e, n), n);
}
function IU(e, n) {
  if (Be(e, "default"))
    return Ne(e.default);
  throw new sr(e, "RegExp types cannot be created. Consider using a default value.");
}
function OU(e, n) {
  if (e.pattern !== void 0) {
    if (Be(e, "default"))
      return Ne(e.default);
    throw new sr(e, "String types with patterns must specify a default value");
  } else if (e.format !== void 0) {
    if (Be(e, "default"))
      return Ne(e.default);
    throw new sr(e, "String types with formats must specify a default value");
  } else
    return Be(e, "default") ? Ne(e.default) : e.minLength !== void 0 ? Array.from({ length: e.minLength }).map(() => " ").join("") : "";
}
function PU(e, n) {
  return Be(e, "default") ? Ne(e.default) : "value" in e ? Symbol.for(e.value) : Symbol();
}
function AU(e, n) {
  if (Be(e, "default"))
    return Ne(e.default);
  if (!Dw(e))
    throw new sr(e, "Can only create template literals that produce a finite variants. Consider using a default value.");
  return Km(e)[0];
}
function wU(e, n) {
  if (Iv++ > BU)
    throw new sr(e, "Cannot create recursive type as it appears possibly infinite. Consider using a default.");
  return Be(e, "default") ? Ne(e.default) : rt(yc(e, n), n);
}
function vU(e, n) {
  return Be(e, "default") ? Ne(e.default) : e.items === void 0 ? [] : Array.from({ length: e.minItems }).map((t, r) => rt(e.items[r], n));
}
function SU(e, n) {
  if (Be(e, "default"))
    return Ne(e.default);
}
function RU(e, n) {
  if (Be(e, "default"))
    return Ne(e.default);
  if (e.anyOf.length === 0)
    throw new Error("ValueCreate.Union: Cannot create Union with zero variants");
  return rt(e.anyOf[0], n);
}
function EU(e, n) {
  return Be(e, "default") ? Ne(e.default) : e.minByteLength !== void 0 ? new Uint8Array(e.minByteLength) : new Uint8Array(0);
}
function $U(e, n) {
  return Be(e, "default") ? Ne(e.default) : {};
}
function MU(e, n) {
  if (Be(e, "default"))
    return Ne(e.default);
}
function CU(e, n) {
  if (Be(e, "default"))
    return Ne(e.default);
  throw new Error("User defined types must specify a default value");
}
function rt(e, n) {
  const t = gv(e, n), r = e;
  switch (r[se]) {
    case "Any":
      return eU(r);
    case "Array":
      return nU(r, t);
    case "AsyncIterator":
      return tU(r);
    case "BigInt":
      return rU(r);
    case "Boolean":
      return iU(r);
    case "Constructor":
      return oU(r, t);
    case "Date":
      return aU(r);
    case "Function":
      return sU(r, t);
    case "Import":
      return uU(r, t);
    case "Integer":
      return cU(r);
    case "Intersect":
      return dU(r, t);
    case "Iterator":
      return fU(r);
    case "Literal":
      return pU(r);
    case "Never":
      return lU(r);
    case "Not":
      return yU(r);
    case "Null":
      return mU(r);
    case "Number":
      return gU(r);
    case "Object":
      return TU(r, t);
    case "Promise":
      return _U(r, t);
    case "Record":
      return bU(r, t);
    case "Ref":
      return hU(r, t);
    case "RegExp":
      return IU(r);
    case "String":
      return OU(r);
    case "Symbol":
      return PU(r);
    case "TemplateLiteral":
      return AU(r);
    case "This":
      return wU(r, t);
    case "Tuple":
      return vU(r, t);
    case "Undefined":
      return SU(r);
    case "Union":
      return RU(r, t);
    case "Uint8Array":
      return EU(r);
    case "Unknown":
      return $U(r);
    case "Void":
      return MU(r);
    default:
      if (!Up(r[se]))
        throw new sr(r, "Unknown type");
      return CU(r);
  }
}
const BU = 512;
let Iv = 0;
function Ov(...e) {
  return Iv = 0, e.length === 2 ? rt(e[0], e[1]) : rt(e[0], []);
}
var Ri = {}, su = {}, Ei = {}, $i = {}, lr = {}, Mi = {}, uu = {}, Ci = {}, ve = {}, y_;
function ag() {
  if (y_) return ve;
  y_ = 1, Object.defineProperty(ve, "__esModule", { value: !0 }), ve.IsAsyncIterator = e, ve.IsIterator = n, ve.IsStandardObject = t, ve.IsInstanceObject = r, ve.IsPromise = i, ve.IsDate = o, ve.IsMap = a, ve.IsSet = s, ve.IsRegExp = c, ve.IsTypedArray = u, ve.IsInt8Array = f, ve.IsUint8Array = d, ve.IsUint8ClampedArray = p, ve.IsInt16Array = T, ve.IsUint16Array = b, ve.IsInt32Array = O, ve.IsUint32Array = F, ve.IsFloat32Array = E, ve.IsFloat64Array = M, ve.IsBigInt64Array = N, ve.IsBigUint64Array = w, ve.HasPropertyKey = _, ve.IsObject = B, ve.IsArray = m, ve.IsUndefined = P, ve.IsNull = R, ve.IsBoolean = y, ve.IsNumber = $, ve.IsInteger = C, ve.IsBigInt = V, ve.IsString = G, ve.IsFunction = z, ve.IsSymbol = ie, ve.IsValueType = ae;
  function e(k) {
    return B(k) && Symbol.asyncIterator in k;
  }
  function n(k) {
    return B(k) && Symbol.iterator in k;
  }
  function t(k) {
    return B(k) && (Object.getPrototypeOf(k) === Object.prototype || Object.getPrototypeOf(k) === null);
  }
  function r(k) {
    return B(k) && !m(k) && z(k.constructor) && k.constructor.name !== "Object";
  }
  function i(k) {
    return k instanceof Promise;
  }
  function o(k) {
    return k instanceof Date && Number.isFinite(k.getTime());
  }
  function a(k) {
    return k instanceof globalThis.Map;
  }
  function s(k) {
    return k instanceof globalThis.Set;
  }
  function c(k) {
    return k instanceof globalThis.RegExp;
  }
  function u(k) {
    return ArrayBuffer.isView(k);
  }
  function f(k) {
    return k instanceof globalThis.Int8Array;
  }
  function d(k) {
    return k instanceof globalThis.Uint8Array;
  }
  function p(k) {
    return k instanceof globalThis.Uint8ClampedArray;
  }
  function T(k) {
    return k instanceof globalThis.Int16Array;
  }
  function b(k) {
    return k instanceof globalThis.Uint16Array;
  }
  function O(k) {
    return k instanceof globalThis.Int32Array;
  }
  function F(k) {
    return k instanceof globalThis.Uint32Array;
  }
  function E(k) {
    return k instanceof globalThis.Float32Array;
  }
  function M(k) {
    return k instanceof globalThis.Float64Array;
  }
  function N(k) {
    return k instanceof globalThis.BigInt64Array;
  }
  function w(k) {
    return k instanceof globalThis.BigUint64Array;
  }
  function _(k, $e) {
    return $e in k;
  }
  function B(k) {
    return k !== null && typeof k == "object";
  }
  function m(k) {
    return Array.isArray(k) && !ArrayBuffer.isView(k);
  }
  function P(k) {
    return k === void 0;
  }
  function R(k) {
    return k === null;
  }
  function y(k) {
    return typeof k == "boolean";
  }
  function $(k) {
    return typeof k == "number";
  }
  function C(k) {
    return Number.isInteger(k);
  }
  function V(k) {
    return typeof k == "bigint";
  }
  function G(k) {
    return typeof k == "string";
  }
  function z(k) {
    return typeof k == "function";
  }
  function ie(k) {
    return typeof k == "symbol";
  }
  function ae(k) {
    return V(k) || y(k) || R(k) || $(k) || G(k) || ie(k) || P(k);
  }
  return ve;
}
var m_;
function bn() {
  return m_ || (m_ = 1, function(e) {
    var n = Ci && Ci.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Ci && Ci.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ ag(), e);
  }(Ci)), Ci;
}
var g_;
function Jp() {
  if (g_) return uu;
  g_ = 1, Object.defineProperty(uu, "__esModule", { value: !0 }), uu.TypeSystemPolicy = void 0;
  const e = /* @__PURE__ */ bn();
  var n;
  return function(t) {
    t.InstanceMode = "default", t.ExactOptionalPropertyTypes = !1, t.AllowArrayObject = !1, t.AllowNaN = !1, t.AllowNullVoid = !1;
    function r(c, u) {
      return t.ExactOptionalPropertyTypes ? u in c : c[u] !== void 0;
    }
    t.IsExactOptionalProperty = r;
    function i(c) {
      const u = (0, e.IsObject)(c);
      return t.AllowArrayObject ? u : u && !(0, e.IsArray)(c);
    }
    t.IsObjectLike = i;
    function o(c) {
      return i(c) && !(c instanceof Date) && !(c instanceof Uint8Array);
    }
    t.IsRecordLike = o;
    function a(c) {
      return t.AllowNaN ? (0, e.IsNumber)(c) : Number.isFinite(c);
    }
    t.IsNumberLike = a;
    function s(c) {
      const u = (0, e.IsUndefined)(c);
      return t.AllowNullVoid ? u || c === null : u;
    }
    t.IsVoidLike = s;
  }(n || (uu.TypeSystemPolicy = n = {})), uu;
}
var Mr = {}, Bi = {}, Cr = {}, T_;
function jU() {
  if (T_) return Cr;
  T_ = 1, Object.defineProperty(Cr, "__esModule", { value: !0 }), Cr.Entries = n, Cr.Clear = t, Cr.Delete = r, Cr.Has = i, Cr.Set = o, Cr.Get = a;
  const e = /* @__PURE__ */ new Map();
  function n() {
    return new Map(e);
  }
  function t() {
    return e.clear();
  }
  function r(s) {
    return e.delete(s);
  }
  function i(s) {
    return e.has(s);
  }
  function o(s, c) {
    e.set(s, c);
  }
  function a(s) {
    return e.get(s);
  }
  return Cr;
}
var Br = {}, __;
function xU() {
  if (__) return Br;
  __ = 1, Object.defineProperty(Br, "__esModule", { value: !0 }), Br.Entries = n, Br.Clear = t, Br.Delete = r, Br.Has = i, Br.Set = o, Br.Get = a;
  const e = /* @__PURE__ */ new Map();
  function n() {
    return new Map(e);
  }
  function t() {
    return e.clear();
  }
  function r(s) {
    return e.delete(s);
  }
  function i(s) {
    return e.has(s);
  }
  function o(s, c) {
    e.set(s, c);
  }
  function a(s) {
    return e.get(s);
  }
  return Br;
}
var b_;
function zs() {
  return b_ || (b_ = 1, Object.defineProperty(Bi, "__esModule", { value: !0 }), Bi.TypeRegistry = Bi.FormatRegistry = void 0, Bi.FormatRegistry = jU(), Bi.TypeRegistry = xU()), Bi;
}
var ji = {}, Nc = {}, Dc = {}, Uc = {}, gn = {}, h_;
function It() {
  if (h_) return gn;
  h_ = 1, Object.defineProperty(gn, "__esModule", { value: !0 }), gn.HasPropertyKey = e, gn.IsAsyncIterator = n, gn.IsArray = t, gn.IsBigInt = r, gn.IsBoolean = i, gn.IsDate = o, gn.IsFunction = a, gn.IsIterator = s, gn.IsNull = c, gn.IsNumber = u, gn.IsObject = f, gn.IsRegExp = d, gn.IsString = p, gn.IsSymbol = T, gn.IsUint8Array = b, gn.IsUndefined = O;
  function e(F, E) {
    return E in F;
  }
  function n(F) {
    return f(F) && !t(F) && !b(F) && Symbol.asyncIterator in F;
  }
  function t(F) {
    return Array.isArray(F);
  }
  function r(F) {
    return typeof F == "bigint";
  }
  function i(F) {
    return typeof F == "boolean";
  }
  function o(F) {
    return F instanceof globalThis.Date;
  }
  function a(F) {
    return typeof F == "function";
  }
  function s(F) {
    return f(F) && !t(F) && !b(F) && Symbol.iterator in F;
  }
  function c(F) {
    return F === null;
  }
  function u(F) {
    return typeof F == "number";
  }
  function f(F) {
    return typeof F == "object" && F !== null;
  }
  function d(F) {
    return F instanceof globalThis.RegExp;
  }
  function p(F) {
    return typeof F == "string";
  }
  function T(F) {
    return typeof F == "symbol";
  }
  function b(F) {
    return F instanceof globalThis.Uint8Array;
  }
  function O(F) {
    return F === void 0;
  }
  return gn;
}
var I_;
function FU() {
  if (I_) return Uc;
  I_ = 1, Object.defineProperty(Uc, "__esModule", { value: !0 }), Uc.Immutable = a;
  const e = /* @__PURE__ */ It();
  function n(s) {
    return globalThis.Object.freeze(s).map((c) => a(c));
  }
  function t(s) {
    return s;
  }
  function r(s) {
    return s;
  }
  function i(s) {
    return s;
  }
  function o(s) {
    const c = {};
    for (const u of Object.getOwnPropertyNames(s))
      c[u] = a(s[u]);
    for (const u of Object.getOwnPropertySymbols(s))
      c[u] = a(s[u]);
    return globalThis.Object.freeze(c);
  }
  function a(s) {
    return e.IsArray(s) ? n(s) : e.IsDate(s) ? s : e.IsUint8Array(s) ? s : e.IsRegExp(s) ? s : e.IsObject(s) ? o(s) : s;
  }
  return Uc;
}
var Lc = {}, O_;
function Ot() {
  if (O_) return Lc;
  O_ = 1, Object.defineProperty(Lc, "__esModule", { value: !0 }), Lc.Clone = s;
  const e = /* @__PURE__ */ It();
  function n(c) {
    return c.map((u) => a(u));
  }
  function t(c) {
    return new Date(c.getTime());
  }
  function r(c) {
    return new Uint8Array(c);
  }
  function i(c) {
    return new RegExp(c.source, c.flags);
  }
  function o(c) {
    const u = {};
    for (const f of Object.getOwnPropertyNames(c))
      u[f] = a(c[f]);
    for (const f of Object.getOwnPropertySymbols(c))
      u[f] = a(c[f]);
    return u;
  }
  function a(c) {
    return e.IsArray(c) ? n(c) : e.IsDate(c) ? t(c) : e.IsUint8Array(c) ? r(c) : e.IsRegExp(c) ? i(c) : e.IsObject(c) ? o(c) : c;
  }
  function s(c) {
    return a(c);
  }
  return Lc;
}
var P_;
function he() {
  if (P_) return Dc;
  P_ = 1, Object.defineProperty(Dc, "__esModule", { value: !0 }), Dc.CreateType = r;
  const e = /* @__PURE__ */ Jp(), n = /* @__PURE__ */ FU(), t = /* @__PURE__ */ Ot();
  function r(i, o) {
    const a = o !== void 0 ? { ...o, ...i } : i;
    switch (e.TypeSystemPolicy.InstanceMode) {
      case "freeze":
        return (0, n.Immutable)(a);
      case "clone":
        return (0, t.Clone)(a);
      default:
        return a;
    }
  }
  return Dc;
}
var xi = {}, at = {}, A_;
function Yp() {
  return A_ || (A_ = 1, Object.defineProperty(at, "__esModule", { value: !0 }), at.Kind = at.Hint = at.OptionalKind = at.ReadonlyKind = at.TransformKind = void 0, at.TransformKind = Symbol.for("TypeBox.Transform"), at.ReadonlyKind = Symbol.for("TypeBox.Readonly"), at.OptionalKind = Symbol.for("TypeBox.Optional"), at.Hint = Symbol.for("TypeBox.Hint"), at.Kind = Symbol.for("TypeBox.Kind")), at;
}
var w_;
function le() {
  return w_ || (w_ = 1, function(e) {
    var n = xi && xi.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = xi && xi.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ Yp(), e);
  }(xi)), xi;
}
var v_;
function NU() {
  if (v_) return Nc;
  v_ = 1, Object.defineProperty(Nc, "__esModule", { value: !0 }), Nc.Unsafe = t;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ le();
  function t(r = {}) {
    return (0, e.CreateType)({ [n.Kind]: r[n.Kind] ?? "Unsafe" }, r);
  }
  return Nc;
}
var S_;
function Xp() {
  return S_ || (S_ = 1, function(e) {
    var n = ji && ji.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = ji && ji.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ NU(), e);
  }(ji)), ji;
}
var Fi = {}, cu = {}, R_;
function Pv() {
  if (R_) return cu;
  R_ = 1, Object.defineProperty(cu, "__esModule", { value: !0 }), cu.TypeBoxError = void 0;
  class e extends Error {
    constructor(t) {
      super(t);
    }
  }
  return cu.TypeBoxError = e, cu;
}
var E_;
function on() {
  return E_ || (E_ = 1, function(e) {
    var n = Fi && Fi.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Fi && Fi.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ Pv(), e);
  }(Fi)), Fi;
}
var $_;
function DU() {
  if ($_) return Mr;
  $_ = 1, Object.defineProperty(Mr, "__esModule", { value: !0 }), Mr.TypeSystem = Mr.TypeSystemDuplicateFormat = Mr.TypeSystemDuplicateTypeKind = void 0;
  const e = /* @__PURE__ */ zs(), n = /* @__PURE__ */ Xp(), t = /* @__PURE__ */ le(), r = /* @__PURE__ */ on();
  class i extends r.TypeBoxError {
    constructor(c) {
      super(`Duplicate type kind '${c}' detected`);
    }
  }
  Mr.TypeSystemDuplicateTypeKind = i;
  class o extends r.TypeBoxError {
    constructor(c) {
      super(`Duplicate string format '${c}' detected`);
    }
  }
  Mr.TypeSystemDuplicateFormat = o;
  var a;
  return function(s) {
    function c(f, d) {
      if (e.TypeRegistry.Has(f))
        throw new i(f);
      return e.TypeRegistry.Set(f, d), (p = {}) => (0, n.Unsafe)({ ...p, [t.Kind]: f });
    }
    s.Type = c;
    function u(f, d) {
      if (e.FormatRegistry.Has(f))
        throw new o(f);
      return e.FormatRegistry.Set(f, d), f;
    }
    s.Format = u;
  }(a || (Mr.TypeSystem = a = {})), Mr;
}
var M_;
function sg() {
  return M_ || (M_ = 1, function(e) {
    var n = Mi && Mi.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Mi && Mi.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ Jp(), e), t(/* @__PURE__ */ DU(), e);
  }(Mi)), Mi;
}
var Ni = {}, Vc = {}, Di = {}, qc = {}, C_;
function UU() {
  if (C_) return qc;
  C_ = 1, Object.defineProperty(qc, "__esModule", { value: !0 }), qc.MappedKey = t;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ le();
  function t(r) {
    return (0, e.CreateType)({
      [n.Kind]: "MappedKey",
      keys: r
    });
  }
  return qc;
}
var Kc = {}, B_;
function Av() {
  if (B_) return Kc;
  B_ = 1, Object.defineProperty(Kc, "__esModule", { value: !0 }), Kc.MappedResult = t;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ le();
  function t(r) {
    return (0, e.CreateType)({
      [n.Kind]: "MappedResult",
      properties: r
    });
  }
  return Kc;
}
var du = {}, Ui = {}, Gc = {}, j_;
function ug() {
  if (j_) return Gc;
  j_ = 1, Object.defineProperty(Gc, "__esModule", { value: !0 }), Gc.Discard = n;
  function e(t, r) {
    const { [r]: i, ...o } = t;
    return o;
  }
  function n(t, r) {
    return r.reduce((i, o) => e(i, o), t);
  }
  return Gc;
}
var x_;
function Ii() {
  return x_ || (x_ = 1, function(e) {
    var n = Ui && Ui.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Ui && Ui.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ ug(), e);
  }(Ui)), Ui;
}
var Li = {}, Hc = {}, F_;
function LU() {
  if (F_) return Hc;
  F_ = 1, Object.defineProperty(Hc, "__esModule", { value: !0 }), Hc.Array = t;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ le();
  function t(r, i) {
    return (0, e.CreateType)({ [n.Kind]: "Array", type: "array", items: r }, i);
  }
  return Hc;
}
var N_;
function mc() {
  return N_ || (N_ = 1, function(e) {
    var n = Li && Li.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Li && Li.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ LU(), e);
  }(Li)), Li;
}
var Vi = {}, kc = {}, D_;
function VU() {
  if (D_) return kc;
  D_ = 1, Object.defineProperty(kc, "__esModule", { value: !0 }), kc.AsyncIterator = t;
  const e = /* @__PURE__ */ le(), n = /* @__PURE__ */ he();
  function t(r, i) {
    return (0, n.CreateType)({ [e.Kind]: "AsyncIterator", type: "AsyncIterator", items: r }, i);
  }
  return kc;
}
var U_;
function gc() {
  return U_ || (U_ = 1, function(e) {
    var n = Vi && Vi.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Vi && Vi.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ VU(), e);
  }(Vi)), Vi;
}
var qi = {}, Wc = {}, L_;
function qU() {
  if (L_) return Wc;
  L_ = 1, Object.defineProperty(Wc, "__esModule", { value: !0 }), Wc.Constructor = t;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ le();
  function t(r, i, o) {
    return (0, e.CreateType)({ [n.Kind]: "Constructor", type: "Constructor", parameters: r, returns: i }, o);
  }
  return Wc;
}
var V_;
function Tc() {
  return V_ || (V_ = 1, function(e) {
    var n = qi && qi.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = qi && qi.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ qU(), e);
  }(qi)), qi;
}
var Ki = {}, zc = {}, q_;
function KU() {
  if (q_) return zc;
  q_ = 1, Object.defineProperty(zc, "__esModule", { value: !0 }), zc.Function = t;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ le();
  function t(r, i, o) {
    return (0, e.CreateType)({ [n.Kind]: "Function", type: "Function", parameters: r, returns: i }, o);
  }
  return zc;
}
var K_;
function Za() {
  return K_ || (K_ = 1, function(e) {
    var n = Ki && Ki.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Ki && Ki.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ KU(), e);
  }(Ki)), Ki;
}
var Gi = {}, Jc = {}, Hi = {}, ki = {}, Yc = {}, Wi = {}, G_;
function Oi() {
  return G_ || (G_ = 1, function(e) {
    var n = Wi && Wi.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Wi && Wi.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ he(), e);
  }(Wi)), Wi;
}
var H_;
function GU() {
  if (H_) return Yc;
  H_ = 1, Object.defineProperty(Yc, "__esModule", { value: !0 }), Yc.Computed = t;
  const e = /* @__PURE__ */ Oi(), n = /* @__PURE__ */ Yp();
  function t(r, i, o) {
    return (0, e.CreateType)({ [n.Kind]: "Computed", target: r, parameters: i }, o);
  }
  return Yc;
}
var k_;
function Pi() {
  return k_ || (k_ = 1, function(e) {
    var n = ki && ki.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = ki && ki.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ GU(), e);
  }(ki)), ki;
}
var zi = {}, Xc = {}, W_;
function HU() {
  if (W_) return Xc;
  W_ = 1, Object.defineProperty(Xc, "__esModule", { value: !0 }), Xc.Never = t;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ le();
  function t(r) {
    return (0, e.CreateType)({ [n.Kind]: "Never", not: {} }, r);
  }
  return Xc;
}
var z_;
function Vn() {
  return z_ || (z_ = 1, function(e) {
    var n = zi && zi.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = zi && zi.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ HU(), e);
  }(zi)), zi;
}
var Ji = {}, Qc = {}, Yi = {}, Zc = {}, ed = {}, be = {}, J_;
function De() {
  if (J_) return be;
  J_ = 1, Object.defineProperty(be, "__esModule", { value: !0 }), be.IsReadonly = t, be.IsOptional = r, be.IsAny = i, be.IsArray = o, be.IsAsyncIterator = a, be.IsBigInt = s, be.IsBoolean = c, be.IsComputed = u, be.IsConstructor = f, be.IsDate = d, be.IsFunction = p, be.IsImport = T, be.IsInteger = b, be.IsProperties = O, be.IsIntersect = F, be.IsIterator = E, be.IsKindOf = M, be.IsLiteralString = N, be.IsLiteralNumber = w, be.IsLiteralBoolean = _, be.IsLiteralValue = B, be.IsLiteral = m, be.IsMappedKey = P, be.IsMappedResult = R, be.IsNever = y, be.IsNot = $, be.IsNull = C, be.IsNumber = V, be.IsObject = G, be.IsPromise = z, be.IsRecord = ie, be.IsRecursive = ae, be.IsRef = k, be.IsRegExp = $e, be.IsString = He, be.IsSymbol = Je, be.IsTemplateLiteral = We, be.IsThis = Ye, be.IsTransform = Me, be.IsTuple = en, be.IsUndefined = Q, be.IsUnion = re, be.IsUint8Array = Ae, be.IsUnknown = Re, be.IsUnsafe = ne, be.IsVoid = Y, be.IsKind = D, be.IsSchema = g;
  const e = /* @__PURE__ */ It(), n = /* @__PURE__ */ le();
  function t(h) {
    return e.IsObject(h) && h[n.ReadonlyKind] === "Readonly";
  }
  function r(h) {
    return e.IsObject(h) && h[n.OptionalKind] === "Optional";
  }
  function i(h) {
    return M(h, "Any");
  }
  function o(h) {
    return M(h, "Array");
  }
  function a(h) {
    return M(h, "AsyncIterator");
  }
  function s(h) {
    return M(h, "BigInt");
  }
  function c(h) {
    return M(h, "Boolean");
  }
  function u(h) {
    return M(h, "Computed");
  }
  function f(h) {
    return M(h, "Constructor");
  }
  function d(h) {
    return M(h, "Date");
  }
  function p(h) {
    return M(h, "Function");
  }
  function T(h) {
    return M(h, "Import");
  }
  function b(h) {
    return M(h, "Integer");
  }
  function O(h) {
    return e.IsObject(h);
  }
  function F(h) {
    return M(h, "Intersect");
  }
  function E(h) {
    return M(h, "Iterator");
  }
  function M(h, j) {
    return e.IsObject(h) && n.Kind in h && h[n.Kind] === j;
  }
  function N(h) {
    return m(h) && e.IsString(h.const);
  }
  function w(h) {
    return m(h) && e.IsNumber(h.const);
  }
  function _(h) {
    return m(h) && e.IsBoolean(h.const);
  }
  function B(h) {
    return e.IsBoolean(h) || e.IsNumber(h) || e.IsString(h);
  }
  function m(h) {
    return M(h, "Literal");
  }
  function P(h) {
    return M(h, "MappedKey");
  }
  function R(h) {
    return M(h, "MappedResult");
  }
  function y(h) {
    return M(h, "Never");
  }
  function $(h) {
    return M(h, "Not");
  }
  function C(h) {
    return M(h, "Null");
  }
  function V(h) {
    return M(h, "Number");
  }
  function G(h) {
    return M(h, "Object");
  }
  function z(h) {
    return M(h, "Promise");
  }
  function ie(h) {
    return M(h, "Record");
  }
  function ae(h) {
    return e.IsObject(h) && n.Hint in h && h[n.Hint] === "Recursive";
  }
  function k(h) {
    return M(h, "Ref");
  }
  function $e(h) {
    return M(h, "RegExp");
  }
  function He(h) {
    return M(h, "String");
  }
  function Je(h) {
    return M(h, "Symbol");
  }
  function We(h) {
    return M(h, "TemplateLiteral");
  }
  function Ye(h) {
    return M(h, "This");
  }
  function Me(h) {
    return e.IsObject(h) && n.TransformKind in h;
  }
  function en(h) {
    return M(h, "Tuple");
  }
  function Q(h) {
    return M(h, "Undefined");
  }
  function re(h) {
    return M(h, "Union");
  }
  function Ae(h) {
    return M(h, "Uint8Array");
  }
  function Re(h) {
    return M(h, "Unknown");
  }
  function ne(h) {
    return M(h, "Unsafe");
  }
  function Y(h) {
    return M(h, "Void");
  }
  function D(h) {
    return e.IsObject(h) && n.Kind in h && e.IsString(h[n.Kind]);
  }
  function g(h) {
    return i(h) || o(h) || c(h) || s(h) || a(h) || u(h) || f(h) || d(h) || p(h) || b(h) || F(h) || E(h) || m(h) || P(h) || R(h) || y(h) || $(h) || C(h) || V(h) || G(h) || z(h) || ie(h) || k(h) || $e(h) || He(h) || Je(h) || We(h) || Ye(h) || en(h) || Q(h) || re(h) || Ae(h) || Re(h) || ne(h) || Y(h) || D(h);
  }
  return be;
}
var Y_;
function wv() {
  if (Y_) return ed;
  Y_ = 1, Object.defineProperty(ed, "__esModule", { value: !0 }), ed.Optional = c;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ le(), t = /* @__PURE__ */ Ii(), r = /* @__PURE__ */ vv(), i = /* @__PURE__ */ De();
  function o(u) {
    return (0, e.CreateType)((0, t.Discard)(u, [n.OptionalKind]));
  }
  function a(u) {
    return (0, e.CreateType)({ ...u, [n.OptionalKind]: "Optional" });
  }
  function s(u, f) {
    return f === !1 ? o(u) : a(u);
  }
  function c(u, f) {
    const d = f ?? !0;
    return (0, i.IsMappedResult)(u) ? (0, r.OptionalFromMappedResult)(u, d) : s(u, d);
  }
  return ed;
}
var X_;
function vv() {
  if (X_) return Zc;
  X_ = 1, Object.defineProperty(Zc, "__esModule", { value: !0 }), Zc.OptionalFromMappedResult = i;
  const e = /* @__PURE__ */ hn(), n = /* @__PURE__ */ wv();
  function t(o, a) {
    const s = {};
    for (const c of globalThis.Object.getOwnPropertyNames(o))
      s[c] = (0, n.Optional)(o[c], a);
    return s;
  }
  function r(o, a) {
    return t(o.properties, a);
  }
  function i(o, a) {
    const s = r(o, a);
    return (0, e.MappedResult)(s);
  }
  return Zc;
}
var Q_;
function Ai() {
  return Q_ || (Q_ = 1, function(e) {
    var n = Yi && Yi.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Yi && Yi.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ vv(), e), t(/* @__PURE__ */ wv(), e);
  }(Yi)), Yi;
}
var nd = {}, Z_;
function Sv() {
  if (Z_) return nd;
  Z_ = 1, Object.defineProperty(nd, "__esModule", { value: !0 }), nd.IntersectCreate = r;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ le(), t = /* @__PURE__ */ De();
  function r(i, o = {}) {
    const a = i.every((c) => (0, t.IsObject)(c)), s = (0, t.IsSchema)(o.unevaluatedProperties) ? { unevaluatedProperties: o.unevaluatedProperties } : {};
    return (0, e.CreateType)(o.unevaluatedProperties === !1 || (0, t.IsSchema)(o.unevaluatedProperties) || a ? { ...s, [n.Kind]: "Intersect", type: "object", allOf: i } : { ...s, [n.Kind]: "Intersect", allOf: i }, o);
  }
  return nd;
}
var eb;
function kU() {
  if (eb) return Qc;
  eb = 1, Object.defineProperty(Qc, "__esModule", { value: !0 }), Qc.IntersectEvaluated = d;
  const e = /* @__PURE__ */ le(), n = /* @__PURE__ */ he(), t = /* @__PURE__ */ Ii(), r = /* @__PURE__ */ Vn(), i = /* @__PURE__ */ Ai(), o = /* @__PURE__ */ Sv(), a = /* @__PURE__ */ De();
  function s(p) {
    return p.every((T) => (0, a.IsOptional)(T));
  }
  function c(p) {
    return (0, t.Discard)(p, [e.OptionalKind]);
  }
  function u(p) {
    return p.map((T) => (0, a.IsOptional)(T) ? c(T) : T);
  }
  function f(p, T) {
    return s(p) ? (0, i.Optional)((0, o.IntersectCreate)(u(p), T)) : (0, o.IntersectCreate)(u(p), T);
  }
  function d(p, T = {}) {
    if (p.length === 1)
      return (0, n.CreateType)(p[0], T);
    if (p.length === 0)
      return (0, r.Never)(T);
    if (p.some((b) => (0, a.IsTransform)(b)))
      throw new Error("Cannot intersect transform types");
    return f(p, T);
  }
  return Qc;
}
var Bl = {}, nb;
function WU() {
  return nb || (nb = 1, Object.defineProperty(Bl, "__esModule", { value: !0 })), Bl;
}
var td = {}, tb;
function zU() {
  if (tb) return td;
  tb = 1, Object.defineProperty(td, "__esModule", { value: !0 }), td.Intersect = i;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ Vn(), t = /* @__PURE__ */ Sv(), r = /* @__PURE__ */ De();
  function i(o, a) {
    if (o.length === 1)
      return (0, e.CreateType)(o[0], a);
    if (o.length === 0)
      return (0, n.Never)(a);
    if (o.some((s) => (0, r.IsTransform)(s)))
      throw new Error("Cannot intersect transform types");
    return (0, t.IntersectCreate)(o, a);
  }
  return td;
}
var rb;
function qt() {
  return rb || (rb = 1, function(e) {
    var n = Ji && Ji.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Ji && Ji.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ kU(), e), t(/* @__PURE__ */ WU(), e), t(/* @__PURE__ */ zU(), e);
  }(Ji)), Ji;
}
var Xi = {}, rd = {}, id = {}, ib;
function Rv() {
  if (ib) return id;
  ib = 1, Object.defineProperty(id, "__esModule", { value: !0 }), id.UnionCreate = t;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ le();
  function t(r, i) {
    return (0, e.CreateType)({ [n.Kind]: "Union", anyOf: r }, i);
  }
  return id;
}
var ob;
function JU() {
  if (ob) return rd;
  ob = 1, Object.defineProperty(rd, "__esModule", { value: !0 }), rd.UnionEvaluated = d;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ le(), t = /* @__PURE__ */ Ii(), r = /* @__PURE__ */ Vn(), i = /* @__PURE__ */ Ai(), o = /* @__PURE__ */ Rv(), a = /* @__PURE__ */ De();
  function s(p) {
    return p.some((T) => (0, a.IsOptional)(T));
  }
  function c(p) {
    return p.map((T) => (0, a.IsOptional)(T) ? u(T) : T);
  }
  function u(p) {
    return (0, t.Discard)(p, [n.OptionalKind]);
  }
  function f(p, T) {
    return s(p) ? (0, i.Optional)((0, o.UnionCreate)(c(p), T)) : (0, o.UnionCreate)(c(p), T);
  }
  function d(p, T) {
    return p.length === 1 ? (0, e.CreateType)(p[0], T) : p.length === 0 ? (0, r.Never)(T) : f(p, T);
  }
  return rd;
}
var jl = {}, ab;
function YU() {
  return ab || (ab = 1, Object.defineProperty(jl, "__esModule", { value: !0 })), jl;
}
var od = {}, sb;
function XU() {
  if (sb) return od;
  sb = 1, Object.defineProperty(od, "__esModule", { value: !0 }), od.Union = r;
  const e = /* @__PURE__ */ Vn(), n = /* @__PURE__ */ he(), t = /* @__PURE__ */ Rv();
  function r(i, o) {
    return i.length === 0 ? (0, e.Never)(o) : i.length === 1 ? (0, n.CreateType)(i[0], o) : (0, t.UnionCreate)(i, o);
  }
  return od;
}
var ub;
function sn() {
  return ub || (ub = 1, function(e) {
    var n = Xi && Xi.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Xi && Xi.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ JU(), e), t(/* @__PURE__ */ YU(), e), t(/* @__PURE__ */ XU(), e);
  }(Xi)), Xi;
}
var ad = {}, Qi = {}, Zi = {}, eo = {}, cb;
function cg() {
  if (cb) return eo;
  cb = 1, Object.defineProperty(eo, "__esModule", { value: !0 }), eo.TemplateLiteralParserError = void 0, eo.TemplateLiteralParse = T, eo.TemplateLiteralParseExact = b;
  const e = /* @__PURE__ */ on();
  class n extends e.TypeBoxError {
  }
  eo.TemplateLiteralParserError = n;
  function t(O) {
    return O.replace(/\\\$/g, "$").replace(/\\\*/g, "*").replace(/\\\^/g, "^").replace(/\\\|/g, "|").replace(/\\\(/g, "(").replace(/\\\)/g, ")");
  }
  function r(O, F, E) {
    return O[F] === E && O.charCodeAt(F - 1) !== 92;
  }
  function i(O, F) {
    return r(O, F, "(");
  }
  function o(O, F) {
    return r(O, F, ")");
  }
  function a(O, F) {
    return r(O, F, "|");
  }
  function s(O) {
    if (!(i(O, 0) && o(O, O.length - 1)))
      return !1;
    let F = 0;
    for (let E = 0; E < O.length; E++)
      if (i(O, E) && (F += 1), o(O, E) && (F -= 1), F === 0 && E !== O.length - 1)
        return !1;
    return !0;
  }
  function c(O) {
    return O.slice(1, O.length - 1);
  }
  function u(O) {
    let F = 0;
    for (let E = 0; E < O.length; E++)
      if (i(O, E) && (F += 1), o(O, E) && (F -= 1), a(O, E) && F === 0)
        return !0;
    return !1;
  }
  function f(O) {
    for (let F = 0; F < O.length; F++)
      if (i(O, F))
        return !0;
    return !1;
  }
  function d(O) {
    let [F, E] = [0, 0];
    const M = [];
    for (let w = 0; w < O.length; w++)
      if (i(O, w) && (F += 1), o(O, w) && (F -= 1), a(O, w) && F === 0) {
        const _ = O.slice(E, w);
        _.length > 0 && M.push(T(_)), E = w + 1;
      }
    const N = O.slice(E);
    return N.length > 0 && M.push(T(N)), M.length === 0 ? { type: "const", const: "" } : M.length === 1 ? M[0] : { type: "or", expr: M };
  }
  function p(O) {
    function F(N, w) {
      if (!i(N, w))
        throw new n("TemplateLiteralParser: Index must point to open parens");
      let _ = 0;
      for (let B = w; B < N.length; B++)
        if (i(N, B) && (_ += 1), o(N, B) && (_ -= 1), _ === 0)
          return [w, B];
      throw new n("TemplateLiteralParser: Unclosed group parens in expression");
    }
    function E(N, w) {
      for (let _ = w; _ < N.length; _++)
        if (i(N, _))
          return [w, _];
      return [w, N.length];
    }
    const M = [];
    for (let N = 0; N < O.length; N++)
      if (i(O, N)) {
        const [w, _] = F(O, N), B = O.slice(w, _ + 1);
        M.push(T(B)), N = _;
      } else {
        const [w, _] = E(O, N), B = O.slice(w, _);
        B.length > 0 && M.push(T(B)), N = _ - 1;
      }
    return M.length === 0 ? { type: "const", const: "" } : M.length === 1 ? M[0] : { type: "and", expr: M };
  }
  function T(O) {
    return s(O) ? T(c(O)) : u(O) ? d(O) : f(O) ? p(O) : { type: "const", const: t(O) };
  }
  function b(O) {
    return T(O.slice(1, O.length - 1));
  }
  return eo;
}
var db;
function Ev() {
  if (db) return Zi;
  db = 1, Object.defineProperty(Zi, "__esModule", { value: !0 }), Zi.TemplateLiteralFiniteError = void 0, Zi.IsTemplateLiteralExpressionFinite = a, Zi.IsTemplateLiteralFinite = s;
  const e = /* @__PURE__ */ cg(), n = /* @__PURE__ */ on();
  class t extends n.TypeBoxError {
  }
  Zi.TemplateLiteralFiniteError = t;
  function r(c) {
    return c.type === "or" && c.expr.length === 2 && c.expr[0].type === "const" && c.expr[0].const === "0" && c.expr[1].type === "const" && c.expr[1].const === "[1-9][0-9]*";
  }
  function i(c) {
    return c.type === "or" && c.expr.length === 2 && c.expr[0].type === "const" && c.expr[0].const === "true" && c.expr[1].type === "const" && c.expr[1].const === "false";
  }
  function o(c) {
    return c.type === "const" && c.const === ".*";
  }
  function a(c) {
    return r(c) || o(c) ? !1 : i(c) ? !0 : c.type === "and" ? c.expr.every((u) => a(u)) : c.type === "or" ? c.expr.every((u) => a(u)) : c.type === "const" ? !0 : (() => {
      throw new t("Unknown expression type");
    })();
  }
  function s(c) {
    const u = (0, e.TemplateLiteralParseExact)(c.pattern);
    return a(u);
  }
  return Zi;
}
var no = {}, fb;
function $v() {
  if (fb) return no;
  fb = 1, Object.defineProperty(no, "__esModule", { value: !0 }), no.TemplateLiteralGenerateError = void 0, no.TemplateLiteralExpressionGenerate = c, no.TemplateLiteralGenerate = u;
  const e = /* @__PURE__ */ Ev(), n = /* @__PURE__ */ cg(), t = /* @__PURE__ */ on();
  class r extends t.TypeBoxError {
  }
  no.TemplateLiteralGenerateError = r;
  function* i(f) {
    if (f.length === 1)
      return yield* f[0];
    for (const d of f[0])
      for (const p of i(f.slice(1)))
        yield `${d}${p}`;
  }
  function* o(f) {
    return yield* i(f.expr.map((d) => [...c(d)]));
  }
  function* a(f) {
    for (const d of f.expr)
      yield* c(d);
  }
  function* s(f) {
    return yield f.const;
  }
  function* c(f) {
    return f.type === "and" ? yield* o(f) : f.type === "or" ? yield* a(f) : f.type === "const" ? yield* s(f) : (() => {
      throw new r("Unknown expression");
    })();
  }
  function u(f) {
    const d = (0, n.TemplateLiteralParseExact)(f.pattern);
    return (0, e.IsTemplateLiteralExpressionFinite)(d) ? [...c(d)] : [];
  }
  return no;
}
var sd = {}, to = {}, ud = {}, pb;
function QU() {
  if (pb) return ud;
  pb = 1, Object.defineProperty(ud, "__esModule", { value: !0 }), ud.Literal = t;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ le();
  function t(r, i) {
    return (0, e.CreateType)({
      [n.Kind]: "Literal",
      const: r,
      type: typeof r
    }, i);
  }
  return ud;
}
var lb;
function Wn() {
  return lb || (lb = 1, function(e) {
    var n = to && to.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = to && to.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ QU(), e);
  }(to)), to;
}
var ro = {}, cd = {}, yb;
function ZU() {
  if (yb) return cd;
  yb = 1, Object.defineProperty(cd, "__esModule", { value: !0 }), cd.Boolean = t;
  const e = /* @__PURE__ */ le(), n = /* @__PURE__ */ Oi();
  function t(r) {
    return (0, n.CreateType)({ [e.Kind]: "Boolean", type: "boolean" }, r);
  }
  return cd;
}
var mb;
function Qp() {
  return mb || (mb = 1, function(e) {
    var n = ro && ro.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = ro && ro.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ ZU(), e);
  }(ro)), ro;
}
var io = {}, dd = {}, gb;
function eL() {
  if (gb) return dd;
  gb = 1, Object.defineProperty(dd, "__esModule", { value: !0 }), dd.BigInt = t;
  const e = /* @__PURE__ */ le(), n = /* @__PURE__ */ Oi();
  function t(r) {
    return (0, n.CreateType)({ [e.Kind]: "BigInt", type: "bigint" }, r);
  }
  return dd;
}
var Tb;
function _c() {
  return Tb || (Tb = 1, function(e) {
    var n = io && io.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = io && io.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ eL(), e);
  }(io)), io;
}
var oo = {}, fd = {}, _b;
function nL() {
  if (_b) return fd;
  _b = 1, Object.defineProperty(fd, "__esModule", { value: !0 }), fd.Number = t;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ le();
  function t(r) {
    return (0, e.CreateType)({ [n.Kind]: "Number", type: "number" }, r);
  }
  return fd;
}
var bb;
function Js() {
  return bb || (bb = 1, function(e) {
    var n = oo && oo.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = oo && oo.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ nL(), e);
  }(oo)), oo;
}
var ao = {}, pd = {}, hb;
function tL() {
  if (hb) return pd;
  hb = 1, Object.defineProperty(pd, "__esModule", { value: !0 }), pd.String = t;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ le();
  function t(r) {
    return (0, e.CreateType)({ [n.Kind]: "String", type: "string" }, r);
  }
  return pd;
}
var Ib;
function Ys() {
  return Ib || (Ib = 1, function(e) {
    var n = ao && ao.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = ao && ao.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ tL(), e);
  }(ao)), ao;
}
var Ob;
function Mv() {
  if (Ob) return sd;
  Ob = 1, Object.defineProperty(sd, "__esModule", { value: !0 }), sd.TemplateLiteralSyntax = f;
  const e = /* @__PURE__ */ Wn(), n = /* @__PURE__ */ Qp(), t = /* @__PURE__ */ _c(), r = /* @__PURE__ */ Js(), i = /* @__PURE__ */ Ys(), o = /* @__PURE__ */ sn(), a = /* @__PURE__ */ Vn();
  function* s(d) {
    const p = d.trim().replace(/"|'/g, "");
    return p === "boolean" ? yield (0, n.Boolean)() : p === "number" ? yield (0, r.Number)() : p === "bigint" ? yield (0, t.BigInt)() : p === "string" ? yield (0, i.String)() : yield (() => {
      const T = p.split("|").map((b) => (0, e.Literal)(b.trim()));
      return T.length === 0 ? (0, a.Never)() : T.length === 1 ? T[0] : (0, o.UnionEvaluated)(T);
    })();
  }
  function* c(d) {
    if (d[1] !== "{") {
      const p = (0, e.Literal)("$"), T = u(d.slice(1));
      return yield* [p, ...T];
    }
    for (let p = 2; p < d.length; p++)
      if (d[p] === "}") {
        const T = s(d.slice(2, p)), b = u(d.slice(p + 1));
        return yield* [...T, ...b];
      }
    yield (0, e.Literal)(d);
  }
  function* u(d) {
    for (let p = 0; p < d.length; p++)
      if (d[p] === "$") {
        const T = (0, e.Literal)(d.slice(0, p)), b = c(d.slice(p));
        return yield* [T, ...b];
      }
    yield (0, e.Literal)(d);
  }
  function f(d) {
    return [...u(d)];
  }
  return sd;
}
var ns = {}, so = {}, xl = {}, Pb;
function rL() {
  return Pb || (Pb = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.PatternNeverExact = e.PatternStringExact = e.PatternNumberExact = e.PatternBooleanExact = e.PatternNever = e.PatternString = e.PatternNumber = e.PatternBoolean = void 0, e.PatternBoolean = "(true|false)", e.PatternNumber = "(0|[1-9][0-9]*)", e.PatternString = "(.*)", e.PatternNever = "(?!.*)", e.PatternBooleanExact = `^${e.PatternBoolean}$`, e.PatternNumberExact = `^${e.PatternNumber}$`, e.PatternStringExact = `^${e.PatternString}$`, e.PatternNeverExact = `^${e.PatternNever}$`;
  }(xl)), xl;
}
var Ab;
function bc() {
  return Ab || (Ab = 1, function(e) {
    var n = so && so.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = so && so.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ rL(), e);
  }(so)), so;
}
var wb;
function Cv() {
  if (wb) return ns;
  wb = 1, Object.defineProperty(ns, "__esModule", { value: !0 }), ns.TemplateLiteralPatternError = void 0, ns.TemplateLiteralPattern = s;
  const e = /* @__PURE__ */ bc(), n = /* @__PURE__ */ le(), t = /* @__PURE__ */ on(), r = /* @__PURE__ */ De();
  class i extends t.TypeBoxError {
  }
  ns.TemplateLiteralPatternError = i;
  function o(c) {
    return c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  function a(c, u) {
    return (0, r.IsTemplateLiteral)(c) ? c.pattern.slice(1, c.pattern.length - 1) : (0, r.IsUnion)(c) ? `(${c.anyOf.map((f) => a(f, u)).join("|")})` : (0, r.IsNumber)(c) ? `${u}${e.PatternNumber}` : (0, r.IsInteger)(c) ? `${u}${e.PatternNumber}` : (0, r.IsBigInt)(c) ? `${u}${e.PatternNumber}` : (0, r.IsString)(c) ? `${u}${e.PatternString}` : (0, r.IsLiteral)(c) ? `${u}${o(c.const.toString())}` : (0, r.IsBoolean)(c) ? `${u}${e.PatternBoolean}` : (() => {
      throw new i(`Unexpected Kind '${c[n.Kind]}'`);
    })();
  }
  function s(c) {
    return `^${c.map((u) => a(u, "")).join("")}$`;
  }
  return ns;
}
var ld = {}, vb;
function iL() {
  if (vb) return ld;
  vb = 1, Object.defineProperty(ld, "__esModule", { value: !0 }), ld.TemplateLiteralToUnion = r;
  const e = /* @__PURE__ */ sn(), n = /* @__PURE__ */ Wn(), t = /* @__PURE__ */ $v();
  function r(i) {
    const a = (0, t.TemplateLiteralGenerate)(i).map((s) => (0, n.Literal)(s));
    return (0, e.UnionEvaluated)(a);
  }
  return ld;
}
var yd = {}, Sb;
function oL() {
  if (Sb) return yd;
  Sb = 1, Object.defineProperty(yd, "__esModule", { value: !0 }), yd.TemplateLiteral = o;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ Mv(), t = /* @__PURE__ */ Cv(), r = /* @__PURE__ */ It(), i = /* @__PURE__ */ le();
  function o(a, s) {
    const c = (0, r.IsString)(a) ? (0, t.TemplateLiteralPattern)((0, n.TemplateLiteralSyntax)(a)) : (0, t.TemplateLiteralPattern)(a);
    return (0, e.CreateType)({ [i.Kind]: "TemplateLiteral", type: "string", pattern: c }, s);
  }
  return yd;
}
var Rb;
function Rr() {
  return Rb || (Rb = 1, function(e) {
    var n = Qi && Qi.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Qi && Qi.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ Ev(), e), t(/* @__PURE__ */ $v(), e), t(/* @__PURE__ */ Mv(), e), t(/* @__PURE__ */ cg(), e), t(/* @__PURE__ */ Cv(), e), t(/* @__PURE__ */ iL(), e), t(/* @__PURE__ */ oL(), e);
  }(Qi)), Qi;
}
var Eb;
function dg() {
  if (Eb) return ad;
  Eb = 1, Object.defineProperty(ad, "__esModule", { value: !0 }), ad.IndexPropertyKeys = o;
  const e = /* @__PURE__ */ Rr(), n = /* @__PURE__ */ De();
  function t(a) {
    return (0, e.TemplateLiteralGenerate)(a).map((c) => c.toString());
  }
  function r(a) {
    const s = [];
    for (const c of a)
      s.push(...o(c));
    return s;
  }
  function i(a) {
    return [a.toString()];
  }
  function o(a) {
    return [...new Set((0, n.IsTemplateLiteral)(a) ? t(a) : (0, n.IsUnion)(a) ? r(a.anyOf) : (0, n.IsLiteral)(a) ? i(a.const) : (0, n.IsNumber)(a) ? ["[number]"] : (0, n.IsInteger)(a) ? ["[number]"] : [])];
  }
  return ad;
}
var md = {}, $b;
function Bv() {
  if ($b) return md;
  $b = 1, Object.defineProperty(md, "__esModule", { value: !0 }), md.IndexFromMappedResult = o;
  const e = /* @__PURE__ */ hn(), n = /* @__PURE__ */ dg(), t = /* @__PURE__ */ Er();
  function r(a, s, c) {
    const u = {};
    for (const f of Object.getOwnPropertyNames(s))
      u[f] = (0, t.Index)(a, (0, n.IndexPropertyKeys)(s[f]), c);
    return u;
  }
  function i(a, s, c) {
    return r(a, s.properties, c);
  }
  function o(a, s, c) {
    const u = i(a, s, c);
    return (0, e.MappedResult)(u);
  }
  return md;
}
var Mb;
function fg() {
  if (Mb) return Hi;
  Mb = 1, Object.defineProperty(Hi, "__esModule", { value: !0 }), Hi.IndexFromPropertyKey = M, Hi.IndexFromPropertyKeys = N, Hi.IndexFromComputed = _, Hi.Index = B;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ on(), t = /* @__PURE__ */ Pi(), r = /* @__PURE__ */ Vn(), i = /* @__PURE__ */ qt(), o = /* @__PURE__ */ sn(), a = /* @__PURE__ */ dg(), s = /* @__PURE__ */ jv(), c = /* @__PURE__ */ Bv(), u = /* @__PURE__ */ De();
  function f(m, P) {
    return m.map((R) => M(R, P));
  }
  function d(m) {
    return m.filter((P) => !(0, u.IsNever)(P));
  }
  function p(m, P) {
    return (0, i.IntersectEvaluated)(d(f(m, P)));
  }
  function T(m) {
    return m.some((P) => (0, u.IsNever)(P)) ? [] : m;
  }
  function b(m, P) {
    return (0, o.UnionEvaluated)(T(f(m, P)));
  }
  function O(m, P) {
    return P in m ? m[P] : P === "[number]" ? (0, o.UnionEvaluated)(m) : (0, r.Never)();
  }
  function F(m, P) {
    return P === "[number]" ? m : (0, r.Never)();
  }
  function E(m, P) {
    return P in m ? m[P] : (0, r.Never)();
  }
  function M(m, P) {
    return (0, u.IsIntersect)(m) ? p(m.allOf, P) : (0, u.IsUnion)(m) ? b(m.anyOf, P) : (0, u.IsTuple)(m) ? O(m.items ?? [], P) : (0, u.IsArray)(m) ? F(m.items, P) : (0, u.IsObject)(m) ? E(m.properties, P) : (0, r.Never)();
  }
  function N(m, P) {
    return P.map((R) => M(m, R));
  }
  function w(m, P) {
    return (0, o.UnionEvaluated)(N(m, P));
  }
  function _(m, P) {
    return (0, t.Computed)("Index", [m, P]);
  }
  function B(m, P, R) {
    if ((0, u.IsRef)(m) || (0, u.IsRef)(P)) {
      const y = "Index types using Ref parameters require both Type and Key to be of TSchema";
      if (!(0, u.IsSchema)(m) || !(0, u.IsSchema)(P))
        throw new n.TypeBoxError(y);
      return (0, t.Computed)("Index", [m, P]);
    }
    return (0, u.IsMappedResult)(P) ? (0, c.IndexFromMappedResult)(m, P, R) : (0, u.IsMappedKey)(P) ? (0, s.IndexFromMappedKey)(m, P, R) : (0, e.CreateType)((0, u.IsSchema)(P) ? w(m, (0, a.IndexPropertyKeys)(P)) : w(m, P), R);
  }
  return Hi;
}
var Cb;
function jv() {
  if (Cb) return Jc;
  Cb = 1, Object.defineProperty(Jc, "__esModule", { value: !0 }), Jc.IndexFromMappedKey = a;
  const e = /* @__PURE__ */ fg(), n = /* @__PURE__ */ hn(), t = /* @__PURE__ */ Ot();
  function r(s, c, u) {
    return { [c]: (0, e.Index)(s, [c], (0, t.Clone)(u)) };
  }
  function i(s, c, u) {
    return c.reduce((f, d) => ({ ...f, ...r(s, d, u) }), {});
  }
  function o(s, c, u) {
    return i(s, c.keys, u);
  }
  function a(s, c, u) {
    const f = o(s, c, u);
    return (0, n.MappedResult)(f);
  }
  return Jc;
}
var Bb;
function Er() {
  return Bb || (Bb = 1, function(e) {
    var n = Gi && Gi.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Gi && Gi.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ jv(), e), t(/* @__PURE__ */ Bv(), e), t(/* @__PURE__ */ dg(), e), t(/* @__PURE__ */ fg(), e);
  }(Gi)), Gi;
}
var uo = {}, gd = {}, jb;
function aL() {
  if (jb) return gd;
  jb = 1, Object.defineProperty(gd, "__esModule", { value: !0 }), gd.Iterator = t;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ le();
  function t(r, i) {
    return (0, e.CreateType)({ [n.Kind]: "Iterator", type: "Iterator", items: r }, i);
  }
  return gd;
}
var xb;
function hc() {
  return xb || (xb = 1, function(e) {
    var n = uo && uo.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = uo && uo.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ aL(), e);
  }(uo)), uo;
}
var co = {}, fu = {}, Fb;
function sL() {
  if (Fb) return fu;
  Fb = 1, Object.defineProperty(fu, "__esModule", { value: !0 }), fu.Object = void 0;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ le(), t = /* @__PURE__ */ De();
  function r(o) {
    const a = [];
    for (let s in o)
      (0, t.IsOptional)(o[s]) || a.push(s);
    return a;
  }
  function i(o, a) {
    const s = r(o), c = s.length > 0 ? { [n.Kind]: "Object", type: "object", properties: o, required: s } : { [n.Kind]: "Object", type: "object", properties: o };
    return (0, e.CreateType)(c, a);
  }
  return fu.Object = i, fu;
}
var Nb;
function Pt() {
  return Nb || (Nb = 1, function(e) {
    var n = co && co.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = co && co.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ sL(), e);
  }(co)), co;
}
var fo = {}, Td = {}, Db;
function uL() {
  if (Db) return Td;
  Db = 1, Object.defineProperty(Td, "__esModule", { value: !0 }), Td.Promise = t;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ le();
  function t(r, i) {
    return (0, e.CreateType)({ [n.Kind]: "Promise", type: "Promise", item: r }, i);
  }
  return Td;
}
var Ub;
function Zp() {
  return Ub || (Ub = 1, function(e) {
    var n = fo && fo.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = fo && fo.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ uL(), e);
  }(fo)), fo;
}
var po = {}, _d = {}, bd = {}, Lb;
function xv() {
  if (Lb) return bd;
  Lb = 1, Object.defineProperty(bd, "__esModule", { value: !0 }), bd.Readonly = c;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ le(), t = /* @__PURE__ */ Ii(), r = /* @__PURE__ */ Fv(), i = /* @__PURE__ */ De();
  function o(u) {
    return (0, e.CreateType)((0, t.Discard)(u, [n.ReadonlyKind]));
  }
  function a(u) {
    return (0, e.CreateType)({ ...u, [n.ReadonlyKind]: "Readonly" });
  }
  function s(u, f) {
    return f === !1 ? o(u) : a(u);
  }
  function c(u, f) {
    const d = f ?? !0;
    return (0, i.IsMappedResult)(u) ? (0, r.ReadonlyFromMappedResult)(u, d) : s(u, d);
  }
  return bd;
}
var Vb;
function Fv() {
  if (Vb) return _d;
  Vb = 1, Object.defineProperty(_d, "__esModule", { value: !0 }), _d.ReadonlyFromMappedResult = i;
  const e = /* @__PURE__ */ hn(), n = /* @__PURE__ */ xv();
  function t(o, a) {
    const s = {};
    for (const c of globalThis.Object.getOwnPropertyNames(o))
      s[c] = (0, n.Readonly)(o[c], a);
    return s;
  }
  function r(o, a) {
    return t(o.properties, a);
  }
  function i(o, a) {
    const s = r(o, a);
    return (0, e.MappedResult)(s);
  }
  return _d;
}
var qb;
function Xs() {
  return qb || (qb = 1, function(e) {
    var n = po && po.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = po && po.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ Fv(), e), t(/* @__PURE__ */ xv(), e);
  }(po)), po;
}
var lo = {}, hd = {}, Kb;
function cL() {
  if (Kb) return hd;
  Kb = 1, Object.defineProperty(hd, "__esModule", { value: !0 }), hd.Tuple = t;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ le();
  function t(r, i) {
    return (0, e.CreateType)(r.length > 0 ? { [n.Kind]: "Tuple", type: "array", items: r, additionalItems: !1, minItems: r.length, maxItems: r.length } : { [n.Kind]: "Tuple", type: "array", minItems: r.length, maxItems: r.length }, i);
  }
  return hd;
}
var Gb;
function wi() {
  return Gb || (Gb = 1, function(e) {
    var n = lo && lo.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = lo && lo.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ cL(), e);
  }(lo)), lo;
}
var yo = {}, kt = {}, Hb;
function dL() {
  if (Hb) return kt;
  Hb = 1, Object.defineProperty(kt, "__esModule", { value: !0 }), kt.SetIncludes = e, kt.SetIsSubset = n, kt.SetDistinct = t, kt.SetIntersect = r, kt.SetUnion = i, kt.SetComplement = o, kt.SetIntersectMany = s, kt.SetUnionMany = c;
  function e(u, f) {
    return u.includes(f);
  }
  function n(u, f) {
    return u.every((d) => e(f, d));
  }
  function t(u) {
    return [...new Set(u)];
  }
  function r(u, f) {
    return u.filter((d) => f.includes(d));
  }
  function i(u, f) {
    return [...u, ...f];
  }
  function o(u, f) {
    return u.filter((d) => !f.includes(d));
  }
  function a(u, f) {
    return u.reduce((d, p) => r(d, p), f);
  }
  function s(u) {
    return u.length === 1 ? u[0] : u.length > 1 ? a(u.slice(1), u[0]) : [];
  }
  function c(u) {
    const f = [];
    for (const d of u)
      f.push(...d);
    return f;
  }
  return kt;
}
var kb;
function el() {
  return kb || (kb = 1, function(e) {
    var n = yo && yo.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = yo && yo.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ dL(), e);
  }(yo)), yo;
}
var Wb;
function fL() {
  if (Wb) return du;
  Wb = 1, Object.defineProperty(du, "__esModule", { value: !0 }), du.MappedFunctionReturnType = $, du.Mapped = C;
  const e = /* @__PURE__ */ le(), n = /* @__PURE__ */ Ii(), t = /* @__PURE__ */ mc(), r = /* @__PURE__ */ gc(), i = /* @__PURE__ */ Tc(), o = /* @__PURE__ */ Za(), a = /* @__PURE__ */ Er(), s = /* @__PURE__ */ qt(), c = /* @__PURE__ */ hc(), u = /* @__PURE__ */ Wn(), f = /* @__PURE__ */ Pt(), d = /* @__PURE__ */ Ai(), p = /* @__PURE__ */ Zp(), T = /* @__PURE__ */ Xs(), b = /* @__PURE__ */ wi(), O = /* @__PURE__ */ sn(), F = /* @__PURE__ */ el(), E = /* @__PURE__ */ Av(), M = /* @__PURE__ */ De();
  function N(V, G) {
    return V in G ? y(V, G[V]) : (0, E.MappedResult)(G);
  }
  function w(V) {
    return { [V]: (0, u.Literal)(V) };
  }
  function _(V) {
    const G = {};
    for (const z of V)
      G[z] = (0, u.Literal)(z);
    return G;
  }
  function B(V, G) {
    return (0, F.SetIncludes)(G, V) ? w(V) : _(G);
  }
  function m(V, G) {
    const z = B(V, G);
    return N(V, z);
  }
  function P(V, G) {
    return G.map((z) => y(V, z));
  }
  function R(V, G) {
    const z = {};
    for (const ie of globalThis.Object.getOwnPropertyNames(G))
      z[ie] = y(V, G[ie]);
    return z;
  }
  function y(V, G) {
    const z = { ...G };
    return (
      // unevaluated modifier types
      (0, M.IsOptional)(G) ? (0, d.Optional)(y(V, (0, n.Discard)(G, [e.OptionalKind]))) : (0, M.IsReadonly)(G) ? (0, T.Readonly)(y(V, (0, n.Discard)(G, [e.ReadonlyKind]))) : (
        // unevaluated mapped types
        (0, M.IsMappedResult)(G) ? N(V, G.properties) : (0, M.IsMappedKey)(G) ? m(V, G.keys) : (
          // unevaluated types
          (0, M.IsConstructor)(G) ? (0, i.Constructor)(P(V, G.parameters), y(V, G.returns), z) : (0, M.IsFunction)(G) ? (0, o.Function)(P(V, G.parameters), y(V, G.returns), z) : (0, M.IsAsyncIterator)(G) ? (0, r.AsyncIterator)(y(V, G.items), z) : (0, M.IsIterator)(G) ? (0, c.Iterator)(y(V, G.items), z) : (0, M.IsIntersect)(G) ? (0, s.Intersect)(P(V, G.allOf), z) : (0, M.IsUnion)(G) ? (0, O.Union)(P(V, G.anyOf), z) : (0, M.IsTuple)(G) ? (0, b.Tuple)(P(V, G.items ?? []), z) : (0, M.IsObject)(G) ? (0, f.Object)(R(V, G.properties), z) : (0, M.IsArray)(G) ? (0, t.Array)(y(V, G.items), z) : (0, M.IsPromise)(G) ? (0, p.Promise)(y(V, G.item), z) : G
        )
      )
    );
  }
  function $(V, G) {
    const z = {};
    for (const ie of V)
      z[ie] = y(ie, G);
    return z;
  }
  function C(V, G, z) {
    const ie = (0, M.IsSchema)(V) ? (0, a.IndexPropertyKeys)(V) : V, ae = G({ [e.Kind]: "MappedKey", keys: ie }), k = $(ie, ae);
    return (0, f.Object)(k, z);
  }
  return du;
}
var zb;
function hn() {
  return zb || (zb = 1, function(e) {
    var n = Di && Di.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Di && Di.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ UU(), e), t(/* @__PURE__ */ Av(), e), t(/* @__PURE__ */ fL(), e);
  }(Di)), Di;
}
var pu = {}, mo = {}, Id = {}, Jb;
function pL() {
  if (Jb) return Id;
  Jb = 1, Object.defineProperty(Id, "__esModule", { value: !0 }), Id.Ref = r;
  const e = /* @__PURE__ */ on(), n = /* @__PURE__ */ he(), t = /* @__PURE__ */ le();
  function r(...i) {
    const [o, a] = typeof i[0] == "string" ? [i[0], i[1]] : [i[0].$id, i[1]];
    if (typeof o != "string")
      throw new e.TypeBoxError("Ref: $ref must be a string");
    return (0, n.CreateType)({ [t.Kind]: "Ref", $ref: o }, a);
  }
  return Id;
}
var Yb;
function ti() {
  return Yb || (Yb = 1, function(e) {
    var n = mo && mo.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = mo && mo.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ pL(), e);
  }(mo)), mo;
}
var lu = {}, Xb;
function pg() {
  if (Xb) return lu;
  Xb = 1, Object.defineProperty(lu, "__esModule", { value: !0 }), lu.KeyOfPropertyKeys = u, lu.KeyOfPattern = d;
  const e = /* @__PURE__ */ el(), n = /* @__PURE__ */ De();
  function t(p) {
    const T = [];
    for (const b of p)
      T.push(u(b));
    return T;
  }
  function r(p) {
    const T = t(p);
    return (0, e.SetUnionMany)(T);
  }
  function i(p) {
    const T = t(p);
    return (0, e.SetIntersectMany)(T);
  }
  function o(p) {
    return p.map((T, b) => b.toString());
  }
  function a(p) {
    return ["[number]"];
  }
  function s(p) {
    return globalThis.Object.getOwnPropertyNames(p);
  }
  function c(p) {
    return f ? globalThis.Object.getOwnPropertyNames(p).map((b) => b[0] === "^" && b[b.length - 1] === "$" ? b.slice(1, b.length - 1) : b) : [];
  }
  function u(p) {
    return (0, n.IsIntersect)(p) ? r(p.allOf) : (0, n.IsUnion)(p) ? i(p.anyOf) : (0, n.IsTuple)(p) ? o(p.items ?? []) : (0, n.IsArray)(p) ? a(p.items) : (0, n.IsObject)(p) ? s(p.properties) : (0, n.IsRecord)(p) ? c(p.patternProperties) : [];
  }
  let f = !1;
  function d(p) {
    f = !0;
    const T = u(p);
    return f = !1, `^(${T.map((O) => `(${O})`).join("|")})$`;
  }
  return lu;
}
var Qb;
function Nv() {
  if (Qb) return pu;
  Qb = 1, Object.defineProperty(pu, "__esModule", { value: !0 }), pu.KeyOfPropertyKeysToRest = p, pu.KeyOf = T;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ Wn(), t = /* @__PURE__ */ Js(), r = /* @__PURE__ */ Pi(), i = /* @__PURE__ */ ti(), o = /* @__PURE__ */ pg(), a = /* @__PURE__ */ sn(), s = /* @__PURE__ */ Dv(), c = /* @__PURE__ */ De();
  function u(b, O) {
    return (0, r.Computed)("KeyOf", [(0, r.Computed)(b, O)]);
  }
  function f(b) {
    return (0, r.Computed)("KeyOf", [(0, i.Ref)(b)]);
  }
  function d(b, O) {
    const F = (0, o.KeyOfPropertyKeys)(b), E = p(F), M = (0, a.UnionEvaluated)(E);
    return (0, e.CreateType)(M, O);
  }
  function p(b) {
    return b.map((O) => O === "[number]" ? (0, t.Number)() : (0, n.Literal)(O));
  }
  function T(b, O) {
    return (0, c.IsComputed)(b) ? u(b.target, b.parameters) : (0, c.IsRef)(b) ? f(b.$ref) : (0, c.IsMappedResult)(b) ? (0, s.KeyOfFromMappedResult)(b, O) : d(b, O);
  }
  return pu;
}
var Zb;
function Dv() {
  if (Zb) return Vc;
  Zb = 1, Object.defineProperty(Vc, "__esModule", { value: !0 }), Vc.KeyOfFromMappedResult = o;
  const e = /* @__PURE__ */ hn(), n = /* @__PURE__ */ Nv(), t = /* @__PURE__ */ Ot();
  function r(a, s) {
    const c = {};
    for (const u of globalThis.Object.getOwnPropertyNames(a))
      c[u] = (0, n.KeyOf)(a[u], (0, t.Clone)(s));
    return c;
  }
  function i(a, s) {
    return r(a.properties, s);
  }
  function o(a, s) {
    const c = i(a, s);
    return (0, e.MappedResult)(c);
  }
  return Vc;
}
var Od = {}, eh;
function lL() {
  if (eh) return Od;
  eh = 1, Object.defineProperty(Od, "__esModule", { value: !0 }), Od.KeyOfPropertyEntries = t;
  const e = /* @__PURE__ */ fg(), n = /* @__PURE__ */ pg();
  function t(r) {
    const i = (0, n.KeyOfPropertyKeys)(r), o = (0, e.IndexFromPropertyKeys)(r, i);
    return i.map((a, s) => [i[s], o[s]]);
  }
  return Od;
}
var nh;
function fr() {
  return nh || (nh = 1, function(e) {
    var n = Ni && Ni.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Ni && Ni.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ Dv(), e), t(/* @__PURE__ */ lL(), e), t(/* @__PURE__ */ pg(), e), t(/* @__PURE__ */ Nv(), e);
  }(Ni)), Ni;
}
var Pd = {}, th;
function lg() {
  if (th) return Pd;
  th = 1, Object.defineProperty(Pd, "__esModule", { value: !0 }), Pd.ExtendsUndefinedCheck = i;
  const e = /* @__PURE__ */ le();
  function n(o) {
    return o.allOf.every((a) => i(a));
  }
  function t(o) {
    return o.anyOf.some((a) => i(a));
  }
  function r(o) {
    return !i(o.not);
  }
  function i(o) {
    return o[e.Kind] === "Intersect" ? n(o) : o[e.Kind] === "Union" ? t(o) : o[e.Kind] === "Not" ? r(o) : o[e.Kind] === "Undefined";
  }
  return Pd;
}
var ts = {}, rh;
function Uv() {
  if (rh) return ts;
  rh = 1, Object.defineProperty(ts, "__esModule", { value: !0 }), ts.DefaultErrorFunction = t, ts.SetErrorFunction = i, ts.GetErrorFunction = o;
  const e = /* @__PURE__ */ le(), n = /* @__PURE__ */ kv();
  function t(a) {
    switch (a.errorType) {
      case n.ValueErrorType.ArrayContains:
        return "Expected array to contain at least one matching value";
      case n.ValueErrorType.ArrayMaxContains:
        return `Expected array to contain no more than ${a.schema.maxContains} matching values`;
      case n.ValueErrorType.ArrayMinContains:
        return `Expected array to contain at least ${a.schema.minContains} matching values`;
      case n.ValueErrorType.ArrayMaxItems:
        return `Expected array length to be less or equal to ${a.schema.maxItems}`;
      case n.ValueErrorType.ArrayMinItems:
        return `Expected array length to be greater or equal to ${a.schema.minItems}`;
      case n.ValueErrorType.ArrayUniqueItems:
        return "Expected array elements to be unique";
      case n.ValueErrorType.Array:
        return "Expected array";
      case n.ValueErrorType.AsyncIterator:
        return "Expected AsyncIterator";
      case n.ValueErrorType.BigIntExclusiveMaximum:
        return `Expected bigint to be less than ${a.schema.exclusiveMaximum}`;
      case n.ValueErrorType.BigIntExclusiveMinimum:
        return `Expected bigint to be greater than ${a.schema.exclusiveMinimum}`;
      case n.ValueErrorType.BigIntMaximum:
        return `Expected bigint to be less or equal to ${a.schema.maximum}`;
      case n.ValueErrorType.BigIntMinimum:
        return `Expected bigint to be greater or equal to ${a.schema.minimum}`;
      case n.ValueErrorType.BigIntMultipleOf:
        return `Expected bigint to be a multiple of ${a.schema.multipleOf}`;
      case n.ValueErrorType.BigInt:
        return "Expected bigint";
      case n.ValueErrorType.Boolean:
        return "Expected boolean";
      case n.ValueErrorType.DateExclusiveMinimumTimestamp:
        return `Expected Date timestamp to be greater than ${a.schema.exclusiveMinimumTimestamp}`;
      case n.ValueErrorType.DateExclusiveMaximumTimestamp:
        return `Expected Date timestamp to be less than ${a.schema.exclusiveMaximumTimestamp}`;
      case n.ValueErrorType.DateMinimumTimestamp:
        return `Expected Date timestamp to be greater or equal to ${a.schema.minimumTimestamp}`;
      case n.ValueErrorType.DateMaximumTimestamp:
        return `Expected Date timestamp to be less or equal to ${a.schema.maximumTimestamp}`;
      case n.ValueErrorType.DateMultipleOfTimestamp:
        return `Expected Date timestamp to be a multiple of ${a.schema.multipleOfTimestamp}`;
      case n.ValueErrorType.Date:
        return "Expected Date";
      case n.ValueErrorType.Function:
        return "Expected function";
      case n.ValueErrorType.IntegerExclusiveMaximum:
        return `Expected integer to be less than ${a.schema.exclusiveMaximum}`;
      case n.ValueErrorType.IntegerExclusiveMinimum:
        return `Expected integer to be greater than ${a.schema.exclusiveMinimum}`;
      case n.ValueErrorType.IntegerMaximum:
        return `Expected integer to be less or equal to ${a.schema.maximum}`;
      case n.ValueErrorType.IntegerMinimum:
        return `Expected integer to be greater or equal to ${a.schema.minimum}`;
      case n.ValueErrorType.IntegerMultipleOf:
        return `Expected integer to be a multiple of ${a.schema.multipleOf}`;
      case n.ValueErrorType.Integer:
        return "Expected integer";
      case n.ValueErrorType.IntersectUnevaluatedProperties:
        return "Unexpected property";
      case n.ValueErrorType.Intersect:
        return "Expected all values to match";
      case n.ValueErrorType.Iterator:
        return "Expected Iterator";
      case n.ValueErrorType.Literal:
        return `Expected ${typeof a.schema.const == "string" ? `'${a.schema.const}'` : a.schema.const}`;
      case n.ValueErrorType.Never:
        return "Never";
      case n.ValueErrorType.Not:
        return "Value should not match";
      case n.ValueErrorType.Null:
        return "Expected null";
      case n.ValueErrorType.NumberExclusiveMaximum:
        return `Expected number to be less than ${a.schema.exclusiveMaximum}`;
      case n.ValueErrorType.NumberExclusiveMinimum:
        return `Expected number to be greater than ${a.schema.exclusiveMinimum}`;
      case n.ValueErrorType.NumberMaximum:
        return `Expected number to be less or equal to ${a.schema.maximum}`;
      case n.ValueErrorType.NumberMinimum:
        return `Expected number to be greater or equal to ${a.schema.minimum}`;
      case n.ValueErrorType.NumberMultipleOf:
        return `Expected number to be a multiple of ${a.schema.multipleOf}`;
      case n.ValueErrorType.Number:
        return "Expected number";
      case n.ValueErrorType.Object:
        return "Expected object";
      case n.ValueErrorType.ObjectAdditionalProperties:
        return "Unexpected property";
      case n.ValueErrorType.ObjectMaxProperties:
        return `Expected object to have no more than ${a.schema.maxProperties} properties`;
      case n.ValueErrorType.ObjectMinProperties:
        return `Expected object to have at least ${a.schema.minProperties} properties`;
      case n.ValueErrorType.ObjectRequiredProperty:
        return "Expected required property";
      case n.ValueErrorType.Promise:
        return "Expected Promise";
      case n.ValueErrorType.RegExp:
        return "Expected string to match regular expression";
      case n.ValueErrorType.StringFormatUnknown:
        return `Unknown format '${a.schema.format}'`;
      case n.ValueErrorType.StringFormat:
        return `Expected string to match '${a.schema.format}' format`;
      case n.ValueErrorType.StringMaxLength:
        return `Expected string length less or equal to ${a.schema.maxLength}`;
      case n.ValueErrorType.StringMinLength:
        return `Expected string length greater or equal to ${a.schema.minLength}`;
      case n.ValueErrorType.StringPattern:
        return `Expected string to match '${a.schema.pattern}'`;
      case n.ValueErrorType.String:
        return "Expected string";
      case n.ValueErrorType.Symbol:
        return "Expected symbol";
      case n.ValueErrorType.TupleLength:
        return `Expected tuple to have ${a.schema.maxItems || 0} elements`;
      case n.ValueErrorType.Tuple:
        return "Expected tuple";
      case n.ValueErrorType.Uint8ArrayMaxByteLength:
        return `Expected byte length less or equal to ${a.schema.maxByteLength}`;
      case n.ValueErrorType.Uint8ArrayMinByteLength:
        return `Expected byte length greater or equal to ${a.schema.minByteLength}`;
      case n.ValueErrorType.Uint8Array:
        return "Expected Uint8Array";
      case n.ValueErrorType.Undefined:
        return "Expected undefined";
      case n.ValueErrorType.Union:
        return "Expected union value";
      case n.ValueErrorType.Void:
        return "Expected void";
      case n.ValueErrorType.Kind:
        return `Expected kind '${a.schema[e.Kind]}'`;
      default:
        return "Unknown error type";
    }
  }
  let r = t;
  function i(a) {
    r = a;
  }
  function o() {
    return r;
  }
  return ts;
}
var go = {}, To = {}, ih;
function yL() {
  if (ih) return To;
  ih = 1, Object.defineProperty(To, "__esModule", { value: !0 }), To.TypeDereferenceError = void 0, To.Pushref = o, To.Deref = a;
  const e = /* @__PURE__ */ on(), n = /* @__PURE__ */ le(), t = /* @__PURE__ */ ag();
  class r extends e.TypeBoxError {
    constructor(c) {
      super(`Unable to dereference schema with $id '${c.$ref}'`), this.schema = c;
    }
  }
  To.TypeDereferenceError = r;
  function i(s, c) {
    const u = c.find((f) => f.$id === s.$ref);
    if (u === void 0)
      throw new r(s);
    return a(u, c);
  }
  function o(s, c) {
    return !(0, t.IsString)(s.$id) || c.some((u) => u.$id === s.$id) || c.push(s), c;
  }
  function a(s, c) {
    return s[n.Kind] === "This" || s[n.Kind] === "Ref" ? i(s, c) : s;
  }
  return To;
}
var oh;
function pr() {
  return oh || (oh = 1, function(e) {
    var n = go && go.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = go && go.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ yL(), e);
  }(go)), go;
}
var _o = {}, rs = {}, ah;
function mL() {
  if (ah) return rs;
  ah = 1, Object.defineProperty(rs, "__esModule", { value: !0 }), rs.ValueHashError = void 0, rs.Hash = R;
  const e = /* @__PURE__ */ bn(), n = /* @__PURE__ */ on();
  class t extends n.TypeBoxError {
    constructor($) {
      super("Unable to hash value"), this.value = $;
    }
  }
  rs.ValueHashError = t;
  var r;
  (function(y) {
    y[y.Undefined = 0] = "Undefined", y[y.Null = 1] = "Null", y[y.Boolean = 2] = "Boolean", y[y.Number = 3] = "Number", y[y.String = 4] = "String", y[y.Object = 5] = "Object", y[y.Array = 6] = "Array", y[y.Date = 7] = "Date", y[y.Uint8Array = 8] = "Uint8Array", y[y.Symbol = 9] = "Symbol", y[y.BigInt = 10] = "BigInt";
  })(r || (r = {}));
  let i = BigInt("14695981039346656037");
  const [o, a] = [BigInt("1099511628211"), BigInt(
    "18446744073709551616"
    /* 2 ^ 64 */
  )], s = Array.from({ length: 256 }).map((y, $) => BigInt($)), c = new Float64Array(1), u = new DataView(c.buffer), f = new Uint8Array(c.buffer);
  function* d(y) {
    const $ = y === 0 ? 1 : Math.ceil(Math.floor(Math.log2(y) + 1) / 8);
    for (let C = 0; C < $; C++)
      yield y >> 8 * ($ - 1 - C) & 255;
  }
  function p(y) {
    P(r.Array);
    for (const $ of y)
      m($);
  }
  function T(y) {
    P(r.Boolean), P(y ? 1 : 0);
  }
  function b(y) {
    P(r.BigInt), u.setBigInt64(0, y);
    for (const $ of f)
      P($);
  }
  function O(y) {
    P(r.Date), m(y.getTime());
  }
  function F(y) {
    P(r.Null);
  }
  function E(y) {
    P(r.Number), u.setFloat64(0, y);
    for (const $ of f)
      P($);
  }
  function M(y) {
    P(r.Object);
    for (const $ of globalThis.Object.getOwnPropertyNames(y).sort())
      m($), m(y[$]);
  }
  function N(y) {
    P(r.String);
    for (let $ = 0; $ < y.length; $++)
      for (const C of d(y.charCodeAt($)))
        P(C);
  }
  function w(y) {
    P(r.Symbol), m(y.description);
  }
  function _(y) {
    P(r.Uint8Array);
    for (let $ = 0; $ < y.length; $++)
      P(y[$]);
  }
  function B(y) {
    return P(r.Undefined);
  }
  function m(y) {
    if ((0, e.IsArray)(y))
      return p(y);
    if ((0, e.IsBoolean)(y))
      return T(y);
    if ((0, e.IsBigInt)(y))
      return b(y);
    if ((0, e.IsDate)(y))
      return O(y);
    if ((0, e.IsNull)(y))
      return F();
    if ((0, e.IsNumber)(y))
      return E(y);
    if ((0, e.IsObject)(y))
      return M(y);
    if ((0, e.IsString)(y))
      return N(y);
    if ((0, e.IsSymbol)(y))
      return w(y);
    if ((0, e.IsUint8Array)(y))
      return _(y);
    if ((0, e.IsUndefined)(y))
      return B();
    throw new t(y);
  }
  function P(y) {
    i = i ^ s[y], i = i * o % a;
  }
  function R(y) {
    return i = BigInt("14695981039346656037"), m(y), i;
  }
  return rs;
}
var sh;
function Ic() {
  return sh || (sh = 1, function(e) {
    var n = _o && _o.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = _o && _o.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ mL(), e);
  }(_o)), _o;
}
var bo = {}, is = {}, ho = {}, ri = {}, Io = {}, Ad = {}, uh;
function gL() {
  if (uh) return Ad;
  uh = 1, Object.defineProperty(Ad, "__esModule", { value: !0 }), Ad.Any = t;
  const e = /* @__PURE__ */ Oi(), n = /* @__PURE__ */ le();
  function t(r) {
    return (0, e.CreateType)({ [n.Kind]: "Any" }, r);
  }
  return Ad;
}
var ch;
function Oc() {
  return ch || (ch = 1, function(e) {
    var n = Io && Io.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Io && Io.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ gL(), e);
  }(Io)), Io;
}
var Oo = {}, wd = {}, dh;
function TL() {
  if (dh) return wd;
  dh = 1, Object.defineProperty(wd, "__esModule", { value: !0 }), wd.Unknown = t;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ le();
  function t(r) {
    return (0, e.CreateType)({ [n.Kind]: "Unknown" }, r);
  }
  return wd;
}
var fh;
function Qs() {
  return fh || (fh = 1, function(e) {
    var n = Oo && Oo.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Oo && Oo.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ TL(), e);
  }(Oo)), Oo;
}
var jr = {}, _e = {}, ph;
function Lv() {
  if (ph) return _e;
  ph = 1, Object.defineProperty(_e, "__esModule", { value: !0 }), _e.TypeGuardUnknownTypeError = void 0, _e.IsReadonly = O, _e.IsOptional = F, _e.IsAny = E, _e.IsArray = M, _e.IsAsyncIterator = N, _e.IsBigInt = w, _e.IsBoolean = _, _e.IsComputed = B, _e.IsConstructor = m, _e.IsDate = P, _e.IsFunction = R, _e.IsImport = y, _e.IsInteger = $, _e.IsProperties = C, _e.IsIntersect = V, _e.IsIterator = G, _e.IsKindOf = z, _e.IsLiteralString = ie, _e.IsLiteralNumber = ae, _e.IsLiteralBoolean = k, _e.IsLiteral = $e, _e.IsLiteralValue = He, _e.IsMappedKey = Je, _e.IsMappedResult = We, _e.IsNever = Ye, _e.IsNot = Me, _e.IsNull = en, _e.IsNumber = Q, _e.IsObject = re, _e.IsPromise = Ae, _e.IsRecord = Re, _e.IsRecursive = ne, _e.IsRef = Y, _e.IsRegExp = D, _e.IsString = g, _e.IsSymbol = h, _e.IsTemplateLiteral = j, _e.IsThis = H, _e.IsTransform = l, _e.IsTuple = X, _e.IsUndefined = q, _e.IsUnionLiteral = x, _e.IsUnion = de, _e.IsUint8Array = oe, _e.IsUnknown = ge, _e.IsUnsafe = Te, _e.IsVoid = Xe, _e.IsKind = Gt, _e.IsSchema = nn;
  const e = /* @__PURE__ */ It(), n = /* @__PURE__ */ le(), t = /* @__PURE__ */ on();
  class r extends t.TypeBoxError {
  }
  _e.TypeGuardUnknownTypeError = r;
  const i = [
    "Any",
    "Array",
    "AsyncIterator",
    "BigInt",
    "Boolean",
    "Computed",
    "Constructor",
    "Date",
    "Enum",
    "Function",
    "Integer",
    "Intersect",
    "Iterator",
    "Literal",
    "MappedKey",
    "MappedResult",
    "Not",
    "Null",
    "Number",
    "Object",
    "Promise",
    "Record",
    "Ref",
    "RegExp",
    "String",
    "Symbol",
    "TemplateLiteral",
    "This",
    "Tuple",
    "Undefined",
    "Union",
    "Uint8Array",
    "Unknown",
    "Void"
  ];
  function o(A) {
    try {
      return new RegExp(A), !0;
    } catch {
      return !1;
    }
  }
  function a(A) {
    if (!e.IsString(A))
      return !1;
    for (let Ce = 0; Ce < A.length; Ce++) {
      const zn = A.charCodeAt(Ce);
      if (zn >= 7 && zn <= 13 || zn === 27 || zn === 127)
        return !1;
    }
    return !0;
  }
  function s(A) {
    return f(A) || nn(A);
  }
  function c(A) {
    return e.IsUndefined(A) || e.IsBigInt(A);
  }
  function u(A) {
    return e.IsUndefined(A) || e.IsNumber(A);
  }
  function f(A) {
    return e.IsUndefined(A) || e.IsBoolean(A);
  }
  function d(A) {
    return e.IsUndefined(A) || e.IsString(A);
  }
  function p(A) {
    return e.IsUndefined(A) || e.IsString(A) && a(A) && o(A);
  }
  function T(A) {
    return e.IsUndefined(A) || e.IsString(A) && a(A);
  }
  function b(A) {
    return e.IsUndefined(A) || nn(A);
  }
  function O(A) {
    return e.IsObject(A) && A[n.ReadonlyKind] === "Readonly";
  }
  function F(A) {
    return e.IsObject(A) && A[n.OptionalKind] === "Optional";
  }
  function E(A) {
    return z(A, "Any") && d(A.$id);
  }
  function M(A) {
    return z(A, "Array") && A.type === "array" && d(A.$id) && nn(A.items) && u(A.minItems) && u(A.maxItems) && f(A.uniqueItems) && b(A.contains) && u(A.minContains) && u(A.maxContains);
  }
  function N(A) {
    return z(A, "AsyncIterator") && A.type === "AsyncIterator" && d(A.$id) && nn(A.items);
  }
  function w(A) {
    return z(A, "BigInt") && A.type === "bigint" && d(A.$id) && c(A.exclusiveMaximum) && c(A.exclusiveMinimum) && c(A.maximum) && c(A.minimum) && c(A.multipleOf);
  }
  function _(A) {
    return z(A, "Boolean") && A.type === "boolean" && d(A.$id);
  }
  function B(A) {
    return z(A, "Computed") && e.IsString(A.target) && e.IsArray(A.parameters) && A.parameters.every((Ce) => nn(Ce));
  }
  function m(A) {
    return z(A, "Constructor") && A.type === "Constructor" && d(A.$id) && e.IsArray(A.parameters) && A.parameters.every((Ce) => nn(Ce)) && nn(A.returns);
  }
  function P(A) {
    return z(A, "Date") && A.type === "Date" && d(A.$id) && u(A.exclusiveMaximumTimestamp) && u(A.exclusiveMinimumTimestamp) && u(A.maximumTimestamp) && u(A.minimumTimestamp) && u(A.multipleOfTimestamp);
  }
  function R(A) {
    return z(A, "Function") && A.type === "Function" && d(A.$id) && e.IsArray(A.parameters) && A.parameters.every((Ce) => nn(Ce)) && nn(A.returns);
  }
  function y(A) {
    return z(A, "Import") && e.HasPropertyKey(A, "$defs") && e.IsObject(A.$defs) && C(A.$defs) && e.HasPropertyKey(A, "$ref") && e.IsString(A.$ref) && A.$ref in A.$defs;
  }
  function $(A) {
    return z(A, "Integer") && A.type === "integer" && d(A.$id) && u(A.exclusiveMaximum) && u(A.exclusiveMinimum) && u(A.maximum) && u(A.minimum) && u(A.multipleOf);
  }
  function C(A) {
    return e.IsObject(A) && Object.entries(A).every(([Ce, zn]) => a(Ce) && nn(zn));
  }
  function V(A) {
    return z(A, "Intersect") && !(e.IsString(A.type) && A.type !== "object") && e.IsArray(A.allOf) && A.allOf.every((Ce) => nn(Ce) && !l(Ce)) && d(A.type) && (f(A.unevaluatedProperties) || b(A.unevaluatedProperties)) && d(A.$id);
  }
  function G(A) {
    return z(A, "Iterator") && A.type === "Iterator" && d(A.$id) && nn(A.items);
  }
  function z(A, Ce) {
    return e.IsObject(A) && n.Kind in A && A[n.Kind] === Ce;
  }
  function ie(A) {
    return $e(A) && e.IsString(A.const);
  }
  function ae(A) {
    return $e(A) && e.IsNumber(A.const);
  }
  function k(A) {
    return $e(A) && e.IsBoolean(A.const);
  }
  function $e(A) {
    return z(A, "Literal") && d(A.$id) && He(A.const);
  }
  function He(A) {
    return e.IsBoolean(A) || e.IsNumber(A) || e.IsString(A);
  }
  function Je(A) {
    return z(A, "MappedKey") && e.IsArray(A.keys) && A.keys.every((Ce) => e.IsNumber(Ce) || e.IsString(Ce));
  }
  function We(A) {
    return z(A, "MappedResult") && C(A.properties);
  }
  function Ye(A) {
    return z(A, "Never") && e.IsObject(A.not) && Object.getOwnPropertyNames(A.not).length === 0;
  }
  function Me(A) {
    return z(A, "Not") && nn(A.not);
  }
  function en(A) {
    return z(A, "Null") && A.type === "null" && d(A.$id);
  }
  function Q(A) {
    return z(A, "Number") && A.type === "number" && d(A.$id) && u(A.exclusiveMaximum) && u(A.exclusiveMinimum) && u(A.maximum) && u(A.minimum) && u(A.multipleOf);
  }
  function re(A) {
    return z(A, "Object") && A.type === "object" && d(A.$id) && C(A.properties) && s(A.additionalProperties) && u(A.minProperties) && u(A.maxProperties);
  }
  function Ae(A) {
    return z(A, "Promise") && A.type === "Promise" && d(A.$id) && nn(A.item);
  }
  function Re(A) {
    return z(A, "Record") && A.type === "object" && d(A.$id) && s(A.additionalProperties) && e.IsObject(A.patternProperties) && ((Ce) => {
      const zn = Object.getOwnPropertyNames(Ce.patternProperties);
      return zn.length === 1 && o(zn[0]) && e.IsObject(Ce.patternProperties) && nn(Ce.patternProperties[zn[0]]);
    })(A);
  }
  function ne(A) {
    return e.IsObject(A) && n.Hint in A && A[n.Hint] === "Recursive";
  }
  function Y(A) {
    return z(A, "Ref") && d(A.$id) && e.IsString(A.$ref);
  }
  function D(A) {
    return z(A, "RegExp") && d(A.$id) && e.IsString(A.source) && e.IsString(A.flags) && u(A.maxLength) && u(A.minLength);
  }
  function g(A) {
    return z(A, "String") && A.type === "string" && d(A.$id) && u(A.minLength) && u(A.maxLength) && p(A.pattern) && T(A.format);
  }
  function h(A) {
    return z(A, "Symbol") && A.type === "symbol" && d(A.$id);
  }
  function j(A) {
    return z(A, "TemplateLiteral") && A.type === "string" && e.IsString(A.pattern) && A.pattern[0] === "^" && A.pattern[A.pattern.length - 1] === "$";
  }
  function H(A) {
    return z(A, "This") && d(A.$id) && e.IsString(A.$ref);
  }
  function l(A) {
    return e.IsObject(A) && n.TransformKind in A;
  }
  function X(A) {
    return z(A, "Tuple") && A.type === "array" && d(A.$id) && e.IsNumber(A.minItems) && e.IsNumber(A.maxItems) && A.minItems === A.maxItems && // empty
    (e.IsUndefined(A.items) && e.IsUndefined(A.additionalItems) && A.minItems === 0 || e.IsArray(A.items) && A.items.every((Ce) => nn(Ce)));
  }
  function q(A) {
    return z(A, "Undefined") && A.type === "undefined" && d(A.$id);
  }
  function x(A) {
    return de(A) && A.anyOf.every((Ce) => ie(Ce) || ae(Ce));
  }
  function de(A) {
    return z(A, "Union") && d(A.$id) && e.IsObject(A) && e.IsArray(A.anyOf) && A.anyOf.every((Ce) => nn(Ce));
  }
  function oe(A) {
    return z(A, "Uint8Array") && A.type === "Uint8Array" && d(A.$id) && u(A.minByteLength) && u(A.maxByteLength);
  }
  function ge(A) {
    return z(A, "Unknown") && d(A.$id);
  }
  function Te(A) {
    return z(A, "Unsafe");
  }
  function Xe(A) {
    return z(A, "Void") && A.type === "void" && d(A.$id);
  }
  function Gt(A) {
    return e.IsObject(A) && n.Kind in A && e.IsString(A[n.Kind]) && !i.includes(A[n.Kind]);
  }
  function nn(A) {
    return e.IsObject(A) && (E(A) || M(A) || _(A) || w(A) || N(A) || B(A) || m(A) || P(A) || R(A) || $(A) || V(A) || G(A) || $e(A) || Je(A) || We(A) || Ye(A) || Me(A) || en(A) || Q(A) || re(A) || Ae(A) || Re(A) || Y(A) || D(A) || g(A) || h(A) || j(A) || H(A) || X(A) || q(A) || de(A) || oe(A) || ge(A) || Te(A) || Xe(A) || Gt(A));
  }
  return _e;
}
var lh;
function Vv() {
  return lh || (lh = 1, Object.defineProperty(jr, "__esModule", { value: !0 }), jr.ValueGuard = jr.TypeGuard = jr.KindGuard = void 0, jr.KindGuard = /* @__PURE__ */ De(), jr.TypeGuard = /* @__PURE__ */ Lv(), jr.ValueGuard = /* @__PURE__ */ It()), jr;
}
var yh;
function qv() {
  if (yh) return ri;
  yh = 1, Object.defineProperty(ri, "__esModule", { value: !0 }), ri.ExtendsResult = ri.ExtendsResolverError = void 0, ri.ExtendsCheck = Ht;
  const e = /* @__PURE__ */ Oc(), n = /* @__PURE__ */ Za(), t = /* @__PURE__ */ Js(), r = /* @__PURE__ */ Ys(), i = /* @__PURE__ */ Qs(), o = /* @__PURE__ */ Rr(), a = /* @__PURE__ */ bc(), s = /* @__PURE__ */ le(), c = /* @__PURE__ */ on(), u = /* @__PURE__ */ Vv();
  class f extends c.TypeBoxError {
  }
  ri.ExtendsResolverError = f;
  var d;
  (function(I) {
    I[I.Union = 0] = "Union", I[I.True = 1] = "True", I[I.False = 2] = "False";
  })(d || (ri.ExtendsResult = d = {}));
  function p(I) {
    return I === d.False ? I : d.True;
  }
  function T(I) {
    throw new f(I);
  }
  function b(I) {
    return u.TypeGuard.IsNever(I) || u.TypeGuard.IsIntersect(I) || u.TypeGuard.IsUnion(I) || u.TypeGuard.IsUnknown(I) || u.TypeGuard.IsAny(I);
  }
  function O(I, v) {
    return u.TypeGuard.IsNever(v) ? ae() : u.TypeGuard.IsIntersect(v) ? V(I, v) : u.TypeGuard.IsUnion(v) ? ue(I, v) : u.TypeGuard.IsUnknown(v) ? Ie() : u.TypeGuard.IsAny(v) ? F() : T("StructuralRight");
  }
  function F(I, v) {
    return d.True;
  }
  function E(I, v) {
    return u.TypeGuard.IsIntersect(v) ? V(I, v) : u.TypeGuard.IsUnion(v) && v.anyOf.some((we) => u.TypeGuard.IsAny(we) || u.TypeGuard.IsUnknown(we)) ? d.True : u.TypeGuard.IsUnion(v) ? d.Union : u.TypeGuard.IsUnknown(v) || u.TypeGuard.IsAny(v) ? d.True : d.Union;
  }
  function M(I, v) {
    return u.TypeGuard.IsUnknown(I) ? d.False : u.TypeGuard.IsAny(I) ? d.Union : u.TypeGuard.IsNever(I) ? d.True : d.False;
  }
  function N(I, v) {
    return u.TypeGuard.IsObject(v) && h(v) ? d.True : b(v) ? O(I, v) : u.TypeGuard.IsArray(v) ? p(Pe(I.items, v.items)) : d.False;
  }
  function w(I, v) {
    return b(v) ? O(I, v) : u.TypeGuard.IsAsyncIterator(v) ? p(Pe(I.items, v.items)) : d.False;
  }
  function _(I, v) {
    return b(v) ? O(I, v) : u.TypeGuard.IsObject(v) ? l(I, v) : u.TypeGuard.IsRecord(v) ? oe(I, v) : u.TypeGuard.IsBigInt(v) ? d.True : d.False;
  }
  function B(I, v) {
    return u.TypeGuard.IsLiteralBoolean(I) || u.TypeGuard.IsBoolean(I) ? d.True : d.False;
  }
  function m(I, v) {
    return b(v) ? O(I, v) : u.TypeGuard.IsObject(v) ? l(I, v) : u.TypeGuard.IsRecord(v) ? oe(I, v) : u.TypeGuard.IsBoolean(v) ? d.True : d.False;
  }
  function P(I, v) {
    return b(v) ? O(I, v) : u.TypeGuard.IsObject(v) ? l(I, v) : u.TypeGuard.IsConstructor(v) ? I.parameters.length > v.parameters.length ? d.False : I.parameters.every((we, qn) => p(Pe(v.parameters[qn], we)) === d.True) ? p(Pe(I.returns, v.returns)) : d.False : d.False;
  }
  function R(I, v) {
    return b(v) ? O(I, v) : u.TypeGuard.IsObject(v) ? l(I, v) : u.TypeGuard.IsRecord(v) ? oe(I, v) : u.TypeGuard.IsDate(v) ? d.True : d.False;
  }
  function y(I, v) {
    return b(v) ? O(I, v) : u.TypeGuard.IsObject(v) ? l(I, v) : u.TypeGuard.IsFunction(v) ? I.parameters.length > v.parameters.length ? d.False : I.parameters.every((we, qn) => p(Pe(v.parameters[qn], we)) === d.True) ? p(Pe(I.returns, v.returns)) : d.False : d.False;
  }
  function $(I, v) {
    return u.TypeGuard.IsLiteral(I) && u.ValueGuard.IsNumber(I.const) || u.TypeGuard.IsNumber(I) || u.TypeGuard.IsInteger(I) ? d.True : d.False;
  }
  function C(I, v) {
    return u.TypeGuard.IsInteger(v) || u.TypeGuard.IsNumber(v) ? d.True : b(v) ? O(I, v) : u.TypeGuard.IsObject(v) ? l(I, v) : u.TypeGuard.IsRecord(v) ? oe(I, v) : d.False;
  }
  function V(I, v) {
    return v.allOf.every((we) => Pe(I, we) === d.True) ? d.True : d.False;
  }
  function G(I, v) {
    return I.allOf.some((we) => Pe(we, v) === d.True) ? d.True : d.False;
  }
  function z(I, v) {
    return b(v) ? O(I, v) : u.TypeGuard.IsIterator(v) ? p(Pe(I.items, v.items)) : d.False;
  }
  function ie(I, v) {
    return u.TypeGuard.IsLiteral(v) && v.const === I.const ? d.True : b(v) ? O(I, v) : u.TypeGuard.IsObject(v) ? l(I, v) : u.TypeGuard.IsRecord(v) ? oe(I, v) : u.TypeGuard.IsString(v) ? Xe(I) : u.TypeGuard.IsNumber(v) ? We(I) : u.TypeGuard.IsInteger(v) ? $(I) : u.TypeGuard.IsBoolean(v) ? B(I) : d.False;
  }
  function ae(I, v) {
    return d.False;
  }
  function k(I, v) {
    return d.True;
  }
  function $e(I) {
    let [v, we] = [I, 0];
    for (; u.TypeGuard.IsNot(v); )
      v = v.not, we += 1;
    return we % 2 === 0 ? v : (0, i.Unknown)();
  }
  function He(I, v) {
    return u.TypeGuard.IsNot(I) ? Pe($e(I), v) : u.TypeGuard.IsNot(v) ? Pe(I, $e(v)) : T("Invalid fallthrough for Not");
  }
  function Je(I, v) {
    return b(v) ? O(I, v) : u.TypeGuard.IsObject(v) ? l(I, v) : u.TypeGuard.IsRecord(v) ? oe(I, v) : u.TypeGuard.IsNull(v) ? d.True : d.False;
  }
  function We(I, v) {
    return u.TypeGuard.IsLiteralNumber(I) || u.TypeGuard.IsNumber(I) || u.TypeGuard.IsInteger(I) ? d.True : d.False;
  }
  function Ye(I, v) {
    return b(v) ? O(I, v) : u.TypeGuard.IsObject(v) ? l(I, v) : u.TypeGuard.IsRecord(v) ? oe(I, v) : u.TypeGuard.IsInteger(v) || u.TypeGuard.IsNumber(v) ? d.True : d.False;
  }
  function Me(I, v) {
    return Object.getOwnPropertyNames(I.properties).length === v;
  }
  function en(I) {
    return h(I);
  }
  function Q(I) {
    return Me(I, 0) || Me(I, 1) && "description" in I.properties && u.TypeGuard.IsUnion(I.properties.description) && I.properties.description.anyOf.length === 2 && (u.TypeGuard.IsString(I.properties.description.anyOf[0]) && u.TypeGuard.IsUndefined(I.properties.description.anyOf[1]) || u.TypeGuard.IsString(I.properties.description.anyOf[1]) && u.TypeGuard.IsUndefined(I.properties.description.anyOf[0]));
  }
  function re(I) {
    return Me(I, 0);
  }
  function Ae(I) {
    return Me(I, 0);
  }
  function Re(I) {
    return Me(I, 0);
  }
  function ne(I) {
    return Me(I, 0);
  }
  function Y(I) {
    return h(I);
  }
  function D(I) {
    const v = (0, t.Number)();
    return Me(I, 0) || Me(I, 1) && "length" in I.properties && p(Pe(I.properties.length, v)) === d.True;
  }
  function g(I) {
    return Me(I, 0);
  }
  function h(I) {
    const v = (0, t.Number)();
    return Me(I, 0) || Me(I, 1) && "length" in I.properties && p(Pe(I.properties.length, v)) === d.True;
  }
  function j(I) {
    const v = (0, n.Function)([(0, e.Any)()], (0, e.Any)());
    return Me(I, 0) || Me(I, 1) && "then" in I.properties && p(Pe(I.properties.then, v)) === d.True;
  }
  function H(I, v) {
    return Pe(I, v) === d.False || u.TypeGuard.IsOptional(I) && !u.TypeGuard.IsOptional(v) ? d.False : d.True;
  }
  function l(I, v) {
    return u.TypeGuard.IsUnknown(I) ? d.False : u.TypeGuard.IsAny(I) ? d.Union : u.TypeGuard.IsNever(I) || u.TypeGuard.IsLiteralString(I) && en(v) || u.TypeGuard.IsLiteralNumber(I) && re(v) || u.TypeGuard.IsLiteralBoolean(I) && Ae(v) || u.TypeGuard.IsSymbol(I) && Q(v) || u.TypeGuard.IsBigInt(I) && Re(v) || u.TypeGuard.IsString(I) && en(v) || u.TypeGuard.IsSymbol(I) && Q(v) || u.TypeGuard.IsNumber(I) && re(v) || u.TypeGuard.IsInteger(I) && re(v) || u.TypeGuard.IsBoolean(I) && Ae(v) || u.TypeGuard.IsUint8Array(I) && Y(v) || u.TypeGuard.IsDate(I) && ne(v) || u.TypeGuard.IsConstructor(I) && g(v) || u.TypeGuard.IsFunction(I) && D(v) ? d.True : u.TypeGuard.IsRecord(I) && u.TypeGuard.IsString(x(I)) ? v[s.Hint] === "Record" ? d.True : d.False : u.TypeGuard.IsRecord(I) && u.TypeGuard.IsNumber(x(I)) ? Me(v, 0) ? d.True : d.False : d.False;
  }
  function X(I, v) {
    return b(v) ? O(I, v) : u.TypeGuard.IsRecord(v) ? oe(I, v) : u.TypeGuard.IsObject(v) ? (() => {
      for (const we of Object.getOwnPropertyNames(v.properties)) {
        if (!(we in I.properties) && !u.TypeGuard.IsOptional(v.properties[we]))
          return d.False;
        if (u.TypeGuard.IsOptional(v.properties[we]))
          return d.True;
        if (H(I.properties[we], v.properties[we]) === d.False)
          return d.False;
      }
      return d.True;
    })() : d.False;
  }
  function q(I, v) {
    return b(v) ? O(I, v) : u.TypeGuard.IsObject(v) && j(v) ? d.True : u.TypeGuard.IsPromise(v) ? p(Pe(I.item, v.item)) : d.False;
  }
  function x(I) {
    return a.PatternNumberExact in I.patternProperties ? (0, t.Number)() : a.PatternStringExact in I.patternProperties ? (0, r.String)() : T("Unknown record key pattern");
  }
  function de(I) {
    return a.PatternNumberExact in I.patternProperties ? I.patternProperties[a.PatternNumberExact] : a.PatternStringExact in I.patternProperties ? I.patternProperties[a.PatternStringExact] : T("Unable to get record value schema");
  }
  function oe(I, v) {
    const [we, qn] = [x(v), de(v)];
    return u.TypeGuard.IsLiteralString(I) && u.TypeGuard.IsNumber(we) && p(Pe(I, qn)) === d.True ? d.True : u.TypeGuard.IsUint8Array(I) && u.TypeGuard.IsNumber(we) || u.TypeGuard.IsString(I) && u.TypeGuard.IsNumber(we) || u.TypeGuard.IsArray(I) && u.TypeGuard.IsNumber(we) ? Pe(I, qn) : u.TypeGuard.IsObject(I) ? (() => {
      for (const ml of Object.getOwnPropertyNames(I.properties))
        if (H(qn, I.properties[ml]) === d.False)
          return d.False;
      return d.True;
    })() : d.False;
  }
  function ge(I, v) {
    return b(v) ? O(I, v) : u.TypeGuard.IsObject(v) ? l(I, v) : u.TypeGuard.IsRecord(v) ? Pe(de(I), de(v)) : d.False;
  }
  function Te(I, v) {
    const we = u.TypeGuard.IsRegExp(I) ? (0, r.String)() : I, qn = u.TypeGuard.IsRegExp(v) ? (0, r.String)() : v;
    return Pe(we, qn);
  }
  function Xe(I, v) {
    return u.TypeGuard.IsLiteral(I) && u.ValueGuard.IsString(I.const) || u.TypeGuard.IsString(I) ? d.True : d.False;
  }
  function Gt(I, v) {
    return b(v) ? O(I, v) : u.TypeGuard.IsObject(v) ? l(I, v) : u.TypeGuard.IsRecord(v) ? oe(I, v) : u.TypeGuard.IsString(v) ? d.True : d.False;
  }
  function nn(I, v) {
    return b(v) ? O(I, v) : u.TypeGuard.IsObject(v) ? l(I, v) : u.TypeGuard.IsRecord(v) ? oe(I, v) : u.TypeGuard.IsSymbol(v) ? d.True : d.False;
  }
  function A(I, v) {
    return u.TypeGuard.IsTemplateLiteral(I) ? Pe((0, o.TemplateLiteralToUnion)(I), v) : u.TypeGuard.IsTemplateLiteral(v) ? Pe(I, (0, o.TemplateLiteralToUnion)(v)) : T("Invalid fallthrough for TemplateLiteral");
  }
  function Ce(I, v) {
    return u.TypeGuard.IsArray(v) && I.items !== void 0 && I.items.every((we) => Pe(we, v.items) === d.True);
  }
  function zn(I, v) {
    return u.TypeGuard.IsNever(I) ? d.True : u.TypeGuard.IsUnknown(I) ? d.False : u.TypeGuard.IsAny(I) ? d.Union : d.False;
  }
  function Sc(I, v) {
    return b(v) ? O(I, v) : u.TypeGuard.IsObject(v) && h(v) || u.TypeGuard.IsArray(v) && Ce(I, v) ? d.True : u.TypeGuard.IsTuple(v) ? u.ValueGuard.IsUndefined(I.items) && !u.ValueGuard.IsUndefined(v.items) || !u.ValueGuard.IsUndefined(I.items) && u.ValueGuard.IsUndefined(v.items) ? d.False : u.ValueGuard.IsUndefined(I.items) && !u.ValueGuard.IsUndefined(v.items) || I.items.every((we, qn) => Pe(we, v.items[qn]) === d.True) ? d.True : d.False : d.False;
  }
  function yl(I, v) {
    return b(v) ? O(I, v) : u.TypeGuard.IsObject(v) ? l(I, v) : u.TypeGuard.IsRecord(v) ? oe(I, v) : u.TypeGuard.IsUint8Array(v) ? d.True : d.False;
  }
  function U(I, v) {
    return b(v) ? O(I, v) : u.TypeGuard.IsObject(v) ? l(I, v) : u.TypeGuard.IsRecord(v) ? oe(I, v) : u.TypeGuard.IsVoid(v) ? ye(I) : u.TypeGuard.IsUndefined(v) ? d.True : d.False;
  }
  function ue(I, v) {
    return v.anyOf.some((we) => Pe(I, we) === d.True) ? d.True : d.False;
  }
  function K(I, v) {
    return I.anyOf.every((we) => Pe(we, v) === d.True) ? d.True : d.False;
  }
  function Ie(I, v) {
    return d.True;
  }
  function pe(I, v) {
    return u.TypeGuard.IsNever(v) ? ae() : u.TypeGuard.IsIntersect(v) ? V(I, v) : u.TypeGuard.IsUnion(v) ? ue(I, v) : u.TypeGuard.IsAny(v) ? F() : u.TypeGuard.IsString(v) ? Xe(I) : u.TypeGuard.IsNumber(v) ? We(I) : u.TypeGuard.IsInteger(v) ? $(I) : u.TypeGuard.IsBoolean(v) ? B(I) : u.TypeGuard.IsArray(v) ? M(I) : u.TypeGuard.IsTuple(v) ? zn(I) : u.TypeGuard.IsObject(v) ? l(I, v) : u.TypeGuard.IsUnknown(v) ? d.True : d.False;
  }
  function ye(I, v) {
    return u.TypeGuard.IsUndefined(I) || u.TypeGuard.IsUndefined(I) ? d.True : d.False;
  }
  function Ge(I, v) {
    return u.TypeGuard.IsIntersect(v) ? V(I, v) : u.TypeGuard.IsUnion(v) ? ue(I, v) : u.TypeGuard.IsUnknown(v) ? Ie() : u.TypeGuard.IsAny(v) ? F() : u.TypeGuard.IsObject(v) ? l(I, v) : u.TypeGuard.IsVoid(v) ? d.True : d.False;
  }
  function Pe(I, v) {
    return (
      // resolvable
      u.TypeGuard.IsTemplateLiteral(I) || u.TypeGuard.IsTemplateLiteral(v) ? A(I, v) : u.TypeGuard.IsRegExp(I) || u.TypeGuard.IsRegExp(v) ? Te(I, v) : u.TypeGuard.IsNot(I) || u.TypeGuard.IsNot(v) ? He(I, v) : (
        // standard
        u.TypeGuard.IsAny(I) ? E(I, v) : u.TypeGuard.IsArray(I) ? N(I, v) : u.TypeGuard.IsBigInt(I) ? _(I, v) : u.TypeGuard.IsBoolean(I) ? m(I, v) : u.TypeGuard.IsAsyncIterator(I) ? w(I, v) : u.TypeGuard.IsConstructor(I) ? P(I, v) : u.TypeGuard.IsDate(I) ? R(I, v) : u.TypeGuard.IsFunction(I) ? y(I, v) : u.TypeGuard.IsInteger(I) ? C(I, v) : u.TypeGuard.IsIntersect(I) ? G(I, v) : u.TypeGuard.IsIterator(I) ? z(I, v) : u.TypeGuard.IsLiteral(I) ? ie(I, v) : u.TypeGuard.IsNever(I) ? k() : u.TypeGuard.IsNull(I) ? Je(I, v) : u.TypeGuard.IsNumber(I) ? Ye(I, v) : u.TypeGuard.IsObject(I) ? X(I, v) : u.TypeGuard.IsRecord(I) ? ge(I, v) : u.TypeGuard.IsString(I) ? Gt(I, v) : u.TypeGuard.IsSymbol(I) ? nn(I, v) : u.TypeGuard.IsTuple(I) ? Sc(I, v) : u.TypeGuard.IsPromise(I) ? q(I, v) : u.TypeGuard.IsUint8Array(I) ? yl(I, v) : u.TypeGuard.IsUndefined(I) ? U(I, v) : u.TypeGuard.IsUnion(I) ? K(I, v) : u.TypeGuard.IsUnknown(I) ? pe(I, v) : u.TypeGuard.IsVoid(I) ? Ge(I, v) : T(`Unknown left type operand '${I[s.Kind]}'`)
      )
    );
  }
  function Ht(I, v) {
    return Pe(I, v);
  }
  return ri;
}
var vd = {}, Sd = {}, Rd = {}, mh;
function Kv() {
  if (mh) return Rd;
  mh = 1, Object.defineProperty(Rd, "__esModule", { value: !0 }), Rd.ExtendsFromMappedResult = o;
  const e = /* @__PURE__ */ hn(), n = /* @__PURE__ */ yg(), t = /* @__PURE__ */ Ot();
  function r(a, s, c, u, f) {
    const d = {};
    for (const p of globalThis.Object.getOwnPropertyNames(a))
      d[p] = (0, n.Extends)(a[p], s, c, u, (0, t.Clone)(f));
    return d;
  }
  function i(a, s, c, u, f) {
    return r(a.properties, s, c, u, f);
  }
  function o(a, s, c, u, f) {
    const d = i(a, s, c, u, f);
    return (0, e.MappedResult)(d);
  }
  return Rd;
}
var gh;
function yg() {
  if (gh) return Sd;
  gh = 1, Object.defineProperty(Sd, "__esModule", { value: !0 }), Sd.Extends = s;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ sn(), t = /* @__PURE__ */ qv(), r = /* @__PURE__ */ Gv(), i = /* @__PURE__ */ Kv(), o = /* @__PURE__ */ De();
  function a(c, u, f, d) {
    const p = (0, t.ExtendsCheck)(c, u);
    return p === t.ExtendsResult.Union ? (0, n.Union)([f, d]) : p === t.ExtendsResult.True ? f : d;
  }
  function s(c, u, f, d, p) {
    return (0, o.IsMappedResult)(c) ? (0, i.ExtendsFromMappedResult)(c, u, f, d, p) : (0, o.IsMappedKey)(c) ? (0, e.CreateType)((0, r.ExtendsFromMappedKey)(c, u, f, d, p)) : (0, e.CreateType)(a(c, u, f, d), p);
  }
  return Sd;
}
var Th;
function Gv() {
  if (Th) return vd;
  Th = 1, Object.defineProperty(vd, "__esModule", { value: !0 }), vd.ExtendsFromMappedKey = s;
  const e = /* @__PURE__ */ hn(), n = /* @__PURE__ */ Wn(), t = /* @__PURE__ */ yg(), r = /* @__PURE__ */ Ot();
  function i(c, u, f, d, p) {
    return {
      [c]: (0, t.Extends)((0, n.Literal)(c), u, f, d, (0, r.Clone)(p))
    };
  }
  function o(c, u, f, d, p) {
    return c.reduce((T, b) => ({ ...T, ...i(b, u, f, d, p) }), {});
  }
  function a(c, u, f, d, p) {
    return o(c.keys, u, f, d, p);
  }
  function s(c, u, f, d, p) {
    const T = a(c, u, f, d, p);
    return (0, e.MappedResult)(T);
  }
  return vd;
}
var _h;
function Zs() {
  return _h || (_h = 1, function(e) {
    var n = ho && ho.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = ho && ho.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ qv(), e), t(/* @__PURE__ */ Gv(), e), t(/* @__PURE__ */ Kv(), e), t(/* @__PURE__ */ lg(), e), t(/* @__PURE__ */ yg(), e);
  }(ho)), ho;
}
var bh;
function Hv() {
  if (bh) return is;
  bh = 1, Object.defineProperty(is, "__esModule", { value: !0 }), is.ValueCheckUnknownTypeError = void 0, is.Check = D;
  const e = /* @__PURE__ */ sg(), n = /* @__PURE__ */ pr(), t = /* @__PURE__ */ Ic(), r = /* @__PURE__ */ le(), i = /* @__PURE__ */ fr(), o = /* @__PURE__ */ Zs(), a = /* @__PURE__ */ zs(), s = /* @__PURE__ */ on(), c = /* @__PURE__ */ Vn(), u = /* @__PURE__ */ bn(), f = /* @__PURE__ */ De();
  class d extends s.TypeBoxError {
    constructor(h) {
      super("Unknown type"), this.schema = h;
    }
  }
  is.ValueCheckUnknownTypeError = d;
  function p(g) {
    return g[r.Kind] === "Any" || g[r.Kind] === "Unknown";
  }
  function T(g) {
    return g !== void 0;
  }
  function b(g, h, j) {
    return !0;
  }
  function O(g, h, j) {
    if (!(0, u.IsArray)(j) || T(g.minItems) && !(j.length >= g.minItems) || T(g.maxItems) && !(j.length <= g.maxItems) || !j.every((X) => Y(g.items, h, X)) || g.uniqueItems === !0 && !function() {
      const X = /* @__PURE__ */ new Set();
      for (const q of j) {
        const x = (0, t.Hash)(q);
        if (X.has(x))
          return !1;
        X.add(x);
      }
      return !0;
    }())
      return !1;
    if (!(T(g.contains) || (0, u.IsNumber)(g.minContains) || (0, u.IsNumber)(g.maxContains)))
      return !0;
    const H = T(g.contains) ? g.contains : (0, c.Never)(), l = j.reduce((X, q) => Y(H, h, q) ? X + 1 : X, 0);
    return !(l === 0 || (0, u.IsNumber)(g.minContains) && l < g.minContains || (0, u.IsNumber)(g.maxContains) && l > g.maxContains);
  }
  function F(g, h, j) {
    return (0, u.IsAsyncIterator)(j);
  }
  function E(g, h, j) {
    return !(!(0, u.IsBigInt)(j) || T(g.exclusiveMaximum) && !(j < g.exclusiveMaximum) || T(g.exclusiveMinimum) && !(j > g.exclusiveMinimum) || T(g.maximum) && !(j <= g.maximum) || T(g.minimum) && !(j >= g.minimum) || T(g.multipleOf) && j % g.multipleOf !== BigInt(0));
  }
  function M(g, h, j) {
    return (0, u.IsBoolean)(j);
  }
  function N(g, h, j) {
    return Y(g.returns, h, j.prototype);
  }
  function w(g, h, j) {
    return !(!(0, u.IsDate)(j) || T(g.exclusiveMaximumTimestamp) && !(j.getTime() < g.exclusiveMaximumTimestamp) || T(g.exclusiveMinimumTimestamp) && !(j.getTime() > g.exclusiveMinimumTimestamp) || T(g.maximumTimestamp) && !(j.getTime() <= g.maximumTimestamp) || T(g.minimumTimestamp) && !(j.getTime() >= g.minimumTimestamp) || T(g.multipleOfTimestamp) && j.getTime() % g.multipleOfTimestamp !== 0);
  }
  function _(g, h, j) {
    return (0, u.IsFunction)(j);
  }
  function B(g, h, j) {
    const H = globalThis.Object.values(g.$defs), l = g.$defs[g.$ref];
    return Y(l, [...h, ...H], j);
  }
  function m(g, h, j) {
    return !(!(0, u.IsInteger)(j) || T(g.exclusiveMaximum) && !(j < g.exclusiveMaximum) || T(g.exclusiveMinimum) && !(j > g.exclusiveMinimum) || T(g.maximum) && !(j <= g.maximum) || T(g.minimum) && !(j >= g.minimum) || T(g.multipleOf) && j % g.multipleOf !== 0);
  }
  function P(g, h, j) {
    const H = g.allOf.every((l) => Y(l, h, j));
    if (g.unevaluatedProperties === !1) {
      const l = new RegExp((0, i.KeyOfPattern)(g)), X = Object.getOwnPropertyNames(j).every((q) => l.test(q));
      return H && X;
    } else if ((0, f.IsSchema)(g.unevaluatedProperties)) {
      const l = new RegExp((0, i.KeyOfPattern)(g)), X = Object.getOwnPropertyNames(j).every((q) => l.test(q) || Y(g.unevaluatedProperties, h, j[q]));
      return H && X;
    } else
      return H;
  }
  function R(g, h, j) {
    return (0, u.IsIterator)(j);
  }
  function y(g, h, j) {
    return j === g.const;
  }
  function $(g, h, j) {
    return !1;
  }
  function C(g, h, j) {
    return !Y(g.not, h, j);
  }
  function V(g, h, j) {
    return (0, u.IsNull)(j);
  }
  function G(g, h, j) {
    return !(!e.TypeSystemPolicy.IsNumberLike(j) || T(g.exclusiveMaximum) && !(j < g.exclusiveMaximum) || T(g.exclusiveMinimum) && !(j > g.exclusiveMinimum) || T(g.minimum) && !(j >= g.minimum) || T(g.maximum) && !(j <= g.maximum) || T(g.multipleOf) && j % g.multipleOf !== 0);
  }
  function z(g, h, j) {
    if (!e.TypeSystemPolicy.IsObjectLike(j) || T(g.minProperties) && !(Object.getOwnPropertyNames(j).length >= g.minProperties) || T(g.maxProperties) && !(Object.getOwnPropertyNames(j).length <= g.maxProperties))
      return !1;
    const H = Object.getOwnPropertyNames(g.properties);
    for (const l of H) {
      const X = g.properties[l];
      if (g.required && g.required.includes(l)) {
        if (!Y(X, h, j[l]) || ((0, o.ExtendsUndefinedCheck)(X) || p(X)) && !(l in j))
          return !1;
      } else if (e.TypeSystemPolicy.IsExactOptionalProperty(j, l) && !Y(X, h, j[l]))
        return !1;
    }
    if (g.additionalProperties === !1) {
      const l = Object.getOwnPropertyNames(j);
      return g.required && g.required.length === H.length && l.length === H.length ? !0 : l.every((X) => H.includes(X));
    } else return typeof g.additionalProperties == "object" ? Object.getOwnPropertyNames(j).every((X) => H.includes(X) || Y(g.additionalProperties, h, j[X])) : !0;
  }
  function ie(g, h, j) {
    return (0, u.IsPromise)(j);
  }
  function ae(g, h, j) {
    if (!e.TypeSystemPolicy.IsRecordLike(j) || T(g.minProperties) && !(Object.getOwnPropertyNames(j).length >= g.minProperties) || T(g.maxProperties) && !(Object.getOwnPropertyNames(j).length <= g.maxProperties))
      return !1;
    const [H, l] = Object.entries(g.patternProperties)[0], X = new RegExp(H), q = Object.entries(j).every(([oe, ge]) => X.test(oe) ? Y(l, h, ge) : !0), x = typeof g.additionalProperties == "object" ? Object.entries(j).every(([oe, ge]) => X.test(oe) ? !0 : Y(g.additionalProperties, h, ge)) : !0, de = g.additionalProperties === !1 ? Object.getOwnPropertyNames(j).every((oe) => X.test(oe)) : !0;
    return q && x && de;
  }
  function k(g, h, j) {
    return Y((0, n.Deref)(g, h), h, j);
  }
  function $e(g, h, j) {
    const H = new RegExp(g.source, g.flags);
    return T(g.minLength) && !(j.length >= g.minLength) || T(g.maxLength) && !(j.length <= g.maxLength) ? !1 : H.test(j);
  }
  function He(g, h, j) {
    return !(0, u.IsString)(j) || T(g.minLength) && !(j.length >= g.minLength) || T(g.maxLength) && !(j.length <= g.maxLength) || T(g.pattern) && !new RegExp(g.pattern).test(j) ? !1 : T(g.format) ? a.FormatRegistry.Has(g.format) ? a.FormatRegistry.Get(g.format)(j) : !1 : !0;
  }
  function Je(g, h, j) {
    return (0, u.IsSymbol)(j);
  }
  function We(g, h, j) {
    return (0, u.IsString)(j) && new RegExp(g.pattern).test(j);
  }
  function Ye(g, h, j) {
    return Y((0, n.Deref)(g, h), h, j);
  }
  function Me(g, h, j) {
    if (!(0, u.IsArray)(j) || g.items === void 0 && j.length !== 0 || j.length !== g.maxItems)
      return !1;
    if (!g.items)
      return !0;
    for (let H = 0; H < g.items.length; H++)
      if (!Y(g.items[H], h, j[H]))
        return !1;
    return !0;
  }
  function en(g, h, j) {
    return (0, u.IsUndefined)(j);
  }
  function Q(g, h, j) {
    return g.anyOf.some((H) => Y(H, h, j));
  }
  function re(g, h, j) {
    return !(!(0, u.IsUint8Array)(j) || T(g.maxByteLength) && !(j.length <= g.maxByteLength) || T(g.minByteLength) && !(j.length >= g.minByteLength));
  }
  function Ae(g, h, j) {
    return !0;
  }
  function Re(g, h, j) {
    return e.TypeSystemPolicy.IsVoidLike(j);
  }
  function ne(g, h, j) {
    return a.TypeRegistry.Has(g[r.Kind]) ? a.TypeRegistry.Get(g[r.Kind])(g, j) : !1;
  }
  function Y(g, h, j) {
    const H = T(g.$id) ? (0, n.Pushref)(g, h) : h, l = g;
    switch (l[r.Kind]) {
      case "Any":
        return b();
      case "Array":
        return O(l, H, j);
      case "AsyncIterator":
        return F(l, H, j);
      case "BigInt":
        return E(l, H, j);
      case "Boolean":
        return M(l, H, j);
      case "Constructor":
        return N(l, H, j);
      case "Date":
        return w(l, H, j);
      case "Function":
        return _(l, H, j);
      case "Import":
        return B(l, H, j);
      case "Integer":
        return m(l, H, j);
      case "Intersect":
        return P(l, H, j);
      case "Iterator":
        return R(l, H, j);
      case "Literal":
        return y(l, H, j);
      case "Never":
        return $();
      case "Not":
        return C(l, H, j);
      case "Null":
        return V(l, H, j);
      case "Number":
        return G(l, H, j);
      case "Object":
        return z(l, H, j);
      case "Promise":
        return ie(l, H, j);
      case "Record":
        return ae(l, H, j);
      case "Ref":
        return k(l, H, j);
      case "RegExp":
        return $e(l, H, j);
      case "String":
        return He(l, H, j);
      case "Symbol":
        return Je(l, H, j);
      case "TemplateLiteral":
        return We(l, H, j);
      case "This":
        return Ye(l, H, j);
      case "Tuple":
        return Me(l, H, j);
      case "Undefined":
        return en(l, H, j);
      case "Union":
        return Q(l, H, j);
      case "Uint8Array":
        return re(l, H, j);
      case "Unknown":
        return Ae();
      case "Void":
        return Re(l, H, j);
      default:
        if (!a.TypeRegistry.Has(l[r.Kind]))
          throw new d(l);
        return ne(l, H, j);
    }
  }
  function D(...g) {
    return g.length === 3 ? Y(g[0], g[1], g[2]) : Y(g[0], [], g[1]);
  }
  return is;
}
var hh;
function Kt() {
  return hh || (hh = 1, function(e) {
    var n = bo && bo.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = bo && bo.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ Hv(), e);
  }(bo)), bo;
}
var Ih;
function kv() {
  if (Ih) return lr;
  Ih = 1, Object.defineProperty(lr, "__esModule", { value: !0 }), lr.ValueErrorIterator = lr.ValueErrorsUnknownTypeError = lr.ValueErrorType = void 0, lr.Errors = H;
  const e = /* @__PURE__ */ sg(), n = /* @__PURE__ */ fr(), t = /* @__PURE__ */ zs(), r = /* @__PURE__ */ lg(), i = /* @__PURE__ */ Uv(), o = /* @__PURE__ */ on(), a = /* @__PURE__ */ pr(), s = /* @__PURE__ */ Ic(), c = /* @__PURE__ */ Kt(), u = /* @__PURE__ */ le(), f = /* @__PURE__ */ Vn(), d = /* @__PURE__ */ bn();
  var p;
  (function(l) {
    l[l.ArrayContains = 0] = "ArrayContains", l[l.ArrayMaxContains = 1] = "ArrayMaxContains", l[l.ArrayMaxItems = 2] = "ArrayMaxItems", l[l.ArrayMinContains = 3] = "ArrayMinContains", l[l.ArrayMinItems = 4] = "ArrayMinItems", l[l.ArrayUniqueItems = 5] = "ArrayUniqueItems", l[l.Array = 6] = "Array", l[l.AsyncIterator = 7] = "AsyncIterator", l[l.BigIntExclusiveMaximum = 8] = "BigIntExclusiveMaximum", l[l.BigIntExclusiveMinimum = 9] = "BigIntExclusiveMinimum", l[l.BigIntMaximum = 10] = "BigIntMaximum", l[l.BigIntMinimum = 11] = "BigIntMinimum", l[l.BigIntMultipleOf = 12] = "BigIntMultipleOf", l[l.BigInt = 13] = "BigInt", l[l.Boolean = 14] = "Boolean", l[l.DateExclusiveMaximumTimestamp = 15] = "DateExclusiveMaximumTimestamp", l[l.DateExclusiveMinimumTimestamp = 16] = "DateExclusiveMinimumTimestamp", l[l.DateMaximumTimestamp = 17] = "DateMaximumTimestamp", l[l.DateMinimumTimestamp = 18] = "DateMinimumTimestamp", l[l.DateMultipleOfTimestamp = 19] = "DateMultipleOfTimestamp", l[l.Date = 20] = "Date", l[l.Function = 21] = "Function", l[l.IntegerExclusiveMaximum = 22] = "IntegerExclusiveMaximum", l[l.IntegerExclusiveMinimum = 23] = "IntegerExclusiveMinimum", l[l.IntegerMaximum = 24] = "IntegerMaximum", l[l.IntegerMinimum = 25] = "IntegerMinimum", l[l.IntegerMultipleOf = 26] = "IntegerMultipleOf", l[l.Integer = 27] = "Integer", l[l.IntersectUnevaluatedProperties = 28] = "IntersectUnevaluatedProperties", l[l.Intersect = 29] = "Intersect", l[l.Iterator = 30] = "Iterator", l[l.Kind = 31] = "Kind", l[l.Literal = 32] = "Literal", l[l.Never = 33] = "Never", l[l.Not = 34] = "Not", l[l.Null = 35] = "Null", l[l.NumberExclusiveMaximum = 36] = "NumberExclusiveMaximum", l[l.NumberExclusiveMinimum = 37] = "NumberExclusiveMinimum", l[l.NumberMaximum = 38] = "NumberMaximum", l[l.NumberMinimum = 39] = "NumberMinimum", l[l.NumberMultipleOf = 40] = "NumberMultipleOf", l[l.Number = 41] = "Number", l[l.ObjectAdditionalProperties = 42] = "ObjectAdditionalProperties", l[l.ObjectMaxProperties = 43] = "ObjectMaxProperties", l[l.ObjectMinProperties = 44] = "ObjectMinProperties", l[l.ObjectRequiredProperty = 45] = "ObjectRequiredProperty", l[l.Object = 46] = "Object", l[l.Promise = 47] = "Promise", l[l.RegExp = 48] = "RegExp", l[l.StringFormatUnknown = 49] = "StringFormatUnknown", l[l.StringFormat = 50] = "StringFormat", l[l.StringMaxLength = 51] = "StringMaxLength", l[l.StringMinLength = 52] = "StringMinLength", l[l.StringPattern = 53] = "StringPattern", l[l.String = 54] = "String", l[l.Symbol = 55] = "Symbol", l[l.TupleLength = 56] = "TupleLength", l[l.Tuple = 57] = "Tuple", l[l.Uint8ArrayMaxByteLength = 58] = "Uint8ArrayMaxByteLength", l[l.Uint8ArrayMinByteLength = 59] = "Uint8ArrayMinByteLength", l[l.Uint8Array = 60] = "Uint8Array", l[l.Undefined = 61] = "Undefined", l[l.Union = 62] = "Union", l[l.Void = 63] = "Void";
  })(p || (lr.ValueErrorType = p = {}));
  class T extends o.TypeBoxError {
    constructor(X) {
      super("Unknown type"), this.schema = X;
    }
  }
  lr.ValueErrorsUnknownTypeError = T;
  function b(l) {
    return l.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  function O(l) {
    return l !== void 0;
  }
  class F {
    constructor(X) {
      this.iterator = X;
    }
    [Symbol.iterator]() {
      return this.iterator;
    }
    /** Returns the first value error or undefined if no errors */
    First() {
      const X = this.iterator.next();
      return X.done ? void 0 : X.value;
    }
  }
  lr.ValueErrorIterator = F;
  function E(l, X, q, x, de = []) {
    return {
      type: l,
      schema: X,
      path: q,
      value: x,
      message: (0, i.GetErrorFunction)()({ errorType: l, path: q, schema: X, value: x, errors: de }),
      errors: de
    };
  }
  function* M(l, X, q, x) {
  }
  function* N(l, X, q, x) {
    if (!(0, d.IsArray)(x))
      return yield E(p.Array, l, q, x);
    O(l.minItems) && !(x.length >= l.minItems) && (yield E(p.ArrayMinItems, l, q, x)), O(l.maxItems) && !(x.length <= l.maxItems) && (yield E(p.ArrayMaxItems, l, q, x));
    for (let ge = 0; ge < x.length; ge++)
      yield* j(l.items, X, `${q}/${ge}`, x[ge]);
    if (l.uniqueItems === !0 && !function() {
      const ge = /* @__PURE__ */ new Set();
      for (const Te of x) {
        const Xe = (0, s.Hash)(Te);
        if (ge.has(Xe))
          return !1;
        ge.add(Xe);
      }
      return !0;
    }() && (yield E(p.ArrayUniqueItems, l, q, x)), !(O(l.contains) || O(l.minContains) || O(l.maxContains)))
      return;
    const de = O(l.contains) ? l.contains : (0, f.Never)(), oe = x.reduce((ge, Te, Xe) => j(de, X, `${q}${Xe}`, Te).next().done === !0 ? ge + 1 : ge, 0);
    oe === 0 && (yield E(p.ArrayContains, l, q, x)), (0, d.IsNumber)(l.minContains) && oe < l.minContains && (yield E(p.ArrayMinContains, l, q, x)), (0, d.IsNumber)(l.maxContains) && oe > l.maxContains && (yield E(p.ArrayMaxContains, l, q, x));
  }
  function* w(l, X, q, x) {
    (0, d.IsAsyncIterator)(x) || (yield E(p.AsyncIterator, l, q, x));
  }
  function* _(l, X, q, x) {
    if (!(0, d.IsBigInt)(x))
      return yield E(p.BigInt, l, q, x);
    O(l.exclusiveMaximum) && !(x < l.exclusiveMaximum) && (yield E(p.BigIntExclusiveMaximum, l, q, x)), O(l.exclusiveMinimum) && !(x > l.exclusiveMinimum) && (yield E(p.BigIntExclusiveMinimum, l, q, x)), O(l.maximum) && !(x <= l.maximum) && (yield E(p.BigIntMaximum, l, q, x)), O(l.minimum) && !(x >= l.minimum) && (yield E(p.BigIntMinimum, l, q, x)), O(l.multipleOf) && x % l.multipleOf !== BigInt(0) && (yield E(p.BigIntMultipleOf, l, q, x));
  }
  function* B(l, X, q, x) {
    (0, d.IsBoolean)(x) || (yield E(p.Boolean, l, q, x));
  }
  function* m(l, X, q, x) {
    yield* j(l.returns, X, q, x.prototype);
  }
  function* P(l, X, q, x) {
    if (!(0, d.IsDate)(x))
      return yield E(p.Date, l, q, x);
    O(l.exclusiveMaximumTimestamp) && !(x.getTime() < l.exclusiveMaximumTimestamp) && (yield E(p.DateExclusiveMaximumTimestamp, l, q, x)), O(l.exclusiveMinimumTimestamp) && !(x.getTime() > l.exclusiveMinimumTimestamp) && (yield E(p.DateExclusiveMinimumTimestamp, l, q, x)), O(l.maximumTimestamp) && !(x.getTime() <= l.maximumTimestamp) && (yield E(p.DateMaximumTimestamp, l, q, x)), O(l.minimumTimestamp) && !(x.getTime() >= l.minimumTimestamp) && (yield E(p.DateMinimumTimestamp, l, q, x)), O(l.multipleOfTimestamp) && x.getTime() % l.multipleOfTimestamp !== 0 && (yield E(p.DateMultipleOfTimestamp, l, q, x));
  }
  function* R(l, X, q, x) {
    (0, d.IsFunction)(x) || (yield E(p.Function, l, q, x));
  }
  function* y(l, X, q, x) {
    const de = globalThis.Object.values(l.$defs), oe = l.$defs[l.$ref];
    yield* j(oe, [...X, ...de], q, x);
  }
  function* $(l, X, q, x) {
    if (!(0, d.IsInteger)(x))
      return yield E(p.Integer, l, q, x);
    O(l.exclusiveMaximum) && !(x < l.exclusiveMaximum) && (yield E(p.IntegerExclusiveMaximum, l, q, x)), O(l.exclusiveMinimum) && !(x > l.exclusiveMinimum) && (yield E(p.IntegerExclusiveMinimum, l, q, x)), O(l.maximum) && !(x <= l.maximum) && (yield E(p.IntegerMaximum, l, q, x)), O(l.minimum) && !(x >= l.minimum) && (yield E(p.IntegerMinimum, l, q, x)), O(l.multipleOf) && x % l.multipleOf !== 0 && (yield E(p.IntegerMultipleOf, l, q, x));
  }
  function* C(l, X, q, x) {
    let de = !1;
    for (const oe of l.allOf)
      for (const ge of j(oe, X, q, x))
        de = !0, yield ge;
    if (de)
      return yield E(p.Intersect, l, q, x);
    if (l.unevaluatedProperties === !1) {
      const oe = new RegExp((0, n.KeyOfPattern)(l));
      for (const ge of Object.getOwnPropertyNames(x))
        oe.test(ge) || (yield E(p.IntersectUnevaluatedProperties, l, `${q}/${ge}`, x));
    }
    if (typeof l.unevaluatedProperties == "object") {
      const oe = new RegExp((0, n.KeyOfPattern)(l));
      for (const ge of Object.getOwnPropertyNames(x))
        if (!oe.test(ge)) {
          const Te = j(l.unevaluatedProperties, X, `${q}/${ge}`, x[ge]).next();
          Te.done || (yield Te.value);
        }
    }
  }
  function* V(l, X, q, x) {
    (0, d.IsIterator)(x) || (yield E(p.Iterator, l, q, x));
  }
  function* G(l, X, q, x) {
    x !== l.const && (yield E(p.Literal, l, q, x));
  }
  function* z(l, X, q, x) {
    yield E(p.Never, l, q, x);
  }
  function* ie(l, X, q, x) {
    j(l.not, X, q, x).next().done === !0 && (yield E(p.Not, l, q, x));
  }
  function* ae(l, X, q, x) {
    (0, d.IsNull)(x) || (yield E(p.Null, l, q, x));
  }
  function* k(l, X, q, x) {
    if (!e.TypeSystemPolicy.IsNumberLike(x))
      return yield E(p.Number, l, q, x);
    O(l.exclusiveMaximum) && !(x < l.exclusiveMaximum) && (yield E(p.NumberExclusiveMaximum, l, q, x)), O(l.exclusiveMinimum) && !(x > l.exclusiveMinimum) && (yield E(p.NumberExclusiveMinimum, l, q, x)), O(l.maximum) && !(x <= l.maximum) && (yield E(p.NumberMaximum, l, q, x)), O(l.minimum) && !(x >= l.minimum) && (yield E(p.NumberMinimum, l, q, x)), O(l.multipleOf) && x % l.multipleOf !== 0 && (yield E(p.NumberMultipleOf, l, q, x));
  }
  function* $e(l, X, q, x) {
    if (!e.TypeSystemPolicy.IsObjectLike(x))
      return yield E(p.Object, l, q, x);
    O(l.minProperties) && !(Object.getOwnPropertyNames(x).length >= l.minProperties) && (yield E(p.ObjectMinProperties, l, q, x)), O(l.maxProperties) && !(Object.getOwnPropertyNames(x).length <= l.maxProperties) && (yield E(p.ObjectMaxProperties, l, q, x));
    const de = Array.isArray(l.required) ? l.required : [], oe = Object.getOwnPropertyNames(l.properties), ge = Object.getOwnPropertyNames(x);
    for (const Te of de)
      ge.includes(Te) || (yield E(p.ObjectRequiredProperty, l.properties[Te], `${q}/${b(Te)}`, void 0));
    if (l.additionalProperties === !1)
      for (const Te of ge)
        oe.includes(Te) || (yield E(p.ObjectAdditionalProperties, l, `${q}/${b(Te)}`, x[Te]));
    if (typeof l.additionalProperties == "object")
      for (const Te of ge)
        oe.includes(Te) || (yield* j(l.additionalProperties, X, `${q}/${b(Te)}`, x[Te]));
    for (const Te of oe) {
      const Xe = l.properties[Te];
      l.required && l.required.includes(Te) ? (yield* j(Xe, X, `${q}/${b(Te)}`, x[Te]), (0, r.ExtendsUndefinedCheck)(l) && !(Te in x) && (yield E(p.ObjectRequiredProperty, Xe, `${q}/${b(Te)}`, void 0))) : e.TypeSystemPolicy.IsExactOptionalProperty(x, Te) && (yield* j(Xe, X, `${q}/${b(Te)}`, x[Te]));
    }
  }
  function* He(l, X, q, x) {
    (0, d.IsPromise)(x) || (yield E(p.Promise, l, q, x));
  }
  function* Je(l, X, q, x) {
    if (!e.TypeSystemPolicy.IsRecordLike(x))
      return yield E(p.Object, l, q, x);
    O(l.minProperties) && !(Object.getOwnPropertyNames(x).length >= l.minProperties) && (yield E(p.ObjectMinProperties, l, q, x)), O(l.maxProperties) && !(Object.getOwnPropertyNames(x).length <= l.maxProperties) && (yield E(p.ObjectMaxProperties, l, q, x));
    const [de, oe] = Object.entries(l.patternProperties)[0], ge = new RegExp(de);
    for (const [Te, Xe] of Object.entries(x))
      ge.test(Te) && (yield* j(oe, X, `${q}/${b(Te)}`, Xe));
    if (typeof l.additionalProperties == "object")
      for (const [Te, Xe] of Object.entries(x))
        ge.test(Te) || (yield* j(l.additionalProperties, X, `${q}/${b(Te)}`, Xe));
    if (l.additionalProperties === !1) {
      for (const [Te, Xe] of Object.entries(x))
        if (!ge.test(Te))
          return yield E(p.ObjectAdditionalProperties, l, `${q}/${b(Te)}`, Xe);
    }
  }
  function* We(l, X, q, x) {
    yield* j((0, a.Deref)(l, X), X, q, x);
  }
  function* Ye(l, X, q, x) {
    if (!(0, d.IsString)(x))
      return yield E(p.String, l, q, x);
    if (O(l.minLength) && !(x.length >= l.minLength) && (yield E(p.StringMinLength, l, q, x)), O(l.maxLength) && !(x.length <= l.maxLength) && (yield E(p.StringMaxLength, l, q, x)), !new RegExp(l.source, l.flags).test(x))
      return yield E(p.RegExp, l, q, x);
  }
  function* Me(l, X, q, x) {
    if (!(0, d.IsString)(x))
      return yield E(p.String, l, q, x);
    O(l.minLength) && !(x.length >= l.minLength) && (yield E(p.StringMinLength, l, q, x)), O(l.maxLength) && !(x.length <= l.maxLength) && (yield E(p.StringMaxLength, l, q, x)), (0, d.IsString)(l.pattern) && (new RegExp(l.pattern).test(x) || (yield E(p.StringPattern, l, q, x))), (0, d.IsString)(l.format) && (t.FormatRegistry.Has(l.format) ? t.FormatRegistry.Get(l.format)(x) || (yield E(p.StringFormat, l, q, x)) : yield E(p.StringFormatUnknown, l, q, x));
  }
  function* en(l, X, q, x) {
    (0, d.IsSymbol)(x) || (yield E(p.Symbol, l, q, x));
  }
  function* Q(l, X, q, x) {
    if (!(0, d.IsString)(x))
      return yield E(p.String, l, q, x);
    new RegExp(l.pattern).test(x) || (yield E(p.StringPattern, l, q, x));
  }
  function* re(l, X, q, x) {
    yield* j((0, a.Deref)(l, X), X, q, x);
  }
  function* Ae(l, X, q, x) {
    if (!(0, d.IsArray)(x))
      return yield E(p.Tuple, l, q, x);
    if (l.items === void 0 && x.length !== 0)
      return yield E(p.TupleLength, l, q, x);
    if (x.length !== l.maxItems)
      return yield E(p.TupleLength, l, q, x);
    if (l.items)
      for (let de = 0; de < l.items.length; de++)
        yield* j(l.items[de], X, `${q}/${de}`, x[de]);
  }
  function* Re(l, X, q, x) {
    (0, d.IsUndefined)(x) || (yield E(p.Undefined, l, q, x));
  }
  function* ne(l, X, q, x) {
    if ((0, c.Check)(l, X, x))
      return;
    const de = l.anyOf.map((oe) => new F(j(oe, X, q, x)));
    yield E(p.Union, l, q, x, de);
  }
  function* Y(l, X, q, x) {
    if (!(0, d.IsUint8Array)(x))
      return yield E(p.Uint8Array, l, q, x);
    O(l.maxByteLength) && !(x.length <= l.maxByteLength) && (yield E(p.Uint8ArrayMaxByteLength, l, q, x)), O(l.minByteLength) && !(x.length >= l.minByteLength) && (yield E(p.Uint8ArrayMinByteLength, l, q, x));
  }
  function* D(l, X, q, x) {
  }
  function* g(l, X, q, x) {
    e.TypeSystemPolicy.IsVoidLike(x) || (yield E(p.Void, l, q, x));
  }
  function* h(l, X, q, x) {
    t.TypeRegistry.Get(l[u.Kind])(l, x) || (yield E(p.Kind, l, q, x));
  }
  function* j(l, X, q, x) {
    const de = O(l.$id) ? [...X, l] : X, oe = l;
    switch (oe[u.Kind]) {
      case "Any":
        return yield* M();
      case "Array":
        return yield* N(oe, de, q, x);
      case "AsyncIterator":
        return yield* w(oe, de, q, x);
      case "BigInt":
        return yield* _(oe, de, q, x);
      case "Boolean":
        return yield* B(oe, de, q, x);
      case "Constructor":
        return yield* m(oe, de, q, x);
      case "Date":
        return yield* P(oe, de, q, x);
      case "Function":
        return yield* R(oe, de, q, x);
      case "Import":
        return yield* y(oe, de, q, x);
      case "Integer":
        return yield* $(oe, de, q, x);
      case "Intersect":
        return yield* C(oe, de, q, x);
      case "Iterator":
        return yield* V(oe, de, q, x);
      case "Literal":
        return yield* G(oe, de, q, x);
      case "Never":
        return yield* z(oe, de, q, x);
      case "Not":
        return yield* ie(oe, de, q, x);
      case "Null":
        return yield* ae(oe, de, q, x);
      case "Number":
        return yield* k(oe, de, q, x);
      case "Object":
        return yield* $e(oe, de, q, x);
      case "Promise":
        return yield* He(oe, de, q, x);
      case "Record":
        return yield* Je(oe, de, q, x);
      case "Ref":
        return yield* We(oe, de, q, x);
      case "RegExp":
        return yield* Ye(oe, de, q, x);
      case "String":
        return yield* Me(oe, de, q, x);
      case "Symbol":
        return yield* en(oe, de, q, x);
      case "TemplateLiteral":
        return yield* Q(oe, de, q, x);
      case "This":
        return yield* re(oe, de, q, x);
      case "Tuple":
        return yield* Ae(oe, de, q, x);
      case "Undefined":
        return yield* Re(oe, de, q, x);
      case "Union":
        return yield* ne(oe, de, q, x);
      case "Uint8Array":
        return yield* Y(oe, de, q, x);
      case "Unknown":
        return yield* D();
      case "Void":
        return yield* g(oe, de, q, x);
      default:
        if (!t.TypeRegistry.Has(oe[u.Kind]))
          throw new T(l);
        return yield* h(oe, de, q, x);
    }
  }
  function H(...l) {
    const X = l.length === 3 ? j(l[0], l[1], "", l[2]) : j(l[0], [], "", l[1]);
    return new F(X);
  }
  return lr;
}
var Oh;
function vi() {
  return Oh || (Oh = 1, function(e) {
    var n = $i && $i.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = $i && $i.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ kv(), e), t(/* @__PURE__ */ Uv(), e);
  }($i)), $i;
}
var Po = {}, yr = {}, Ph;
function _L() {
  if (Ph) return yr;
  Ph = 1;
  var e = yr && yr.__classPrivateFieldSet || function(d, p, T, b, O) {
    if (b === "m") throw new TypeError("Private method is not writable");
    if (b === "a" && !O) throw new TypeError("Private accessor was defined without a setter");
    if (typeof p == "function" ? d !== p || !O : !p.has(d)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return b === "a" ? O.call(d, T) : O ? O.value = T : p.set(d, T), T;
  }, n = yr && yr.__classPrivateFieldGet || function(d, p, T, b) {
    if (T === "a" && !b) throw new TypeError("Private accessor was defined without a getter");
    if (typeof p == "function" ? d !== p || !b : !p.has(d)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return T === "m" ? b : T === "a" ? b.call(d) : b ? b.value : p.get(d);
  }, t, r, i;
  Object.defineProperty(yr, "__esModule", { value: !0 }), yr.AssertError = void 0, yr.Assert = f;
  const o = /* @__PURE__ */ vi(), a = /* @__PURE__ */ Pv(), s = /* @__PURE__ */ Hv();
  class c extends a.TypeBoxError {
    constructor(p) {
      const T = p.First();
      super(T === void 0 ? "Invalid Value" : T.message), t.add(this), r.set(this, void 0), e(this, r, p, "f"), this.error = T;
    }
    /** Returns an iterator for each error in this value. */
    Errors() {
      return new o.ValueErrorIterator(n(this, t, "m", i).call(this));
    }
  }
  yr.AssertError = c, r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakSet(), i = function* () {
    this.error && (yield this.error), yield* n(this, r, "f");
  };
  function u(d, p, T) {
    if (!(0, s.Check)(d, p, T))
      throw new c((0, o.Errors)(d, p, T));
  }
  function f(...d) {
    return d.length === 3 ? u(d[0], d[1], d[2]) : u(d[0], [], d[1]);
  }
  return yr;
}
var Ah;
function mg() {
  return Ah || (Ah = 1, function(e) {
    var n = Po && Po.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Po && Po.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ _L(), e);
  }(Po)), Po;
}
var Ao = {}, os = {}, wo = {}, as = {}, vo = {}, Ed = {}, wh;
function bL() {
  if (wh) return Ed;
  wh = 1, Object.defineProperty(Ed, "__esModule", { value: !0 }), Ed.Clone = c;
  const e = /* @__PURE__ */ bn();
  function n(u) {
    const f = {};
    for (const d of Object.getOwnPropertyNames(u))
      f[d] = c(u[d]);
    for (const d of Object.getOwnPropertySymbols(u))
      f[d] = c(u[d]);
    return f;
  }
  function t(u) {
    return u.map((f) => c(f));
  }
  function r(u) {
    return u.slice();
  }
  function i(u) {
    return new Map(c([...u.entries()]));
  }
  function o(u) {
    return new Set(c([...u.entries()]));
  }
  function a(u) {
    return new Date(u.toISOString());
  }
  function s(u) {
    return u;
  }
  function c(u) {
    if ((0, e.IsArray)(u))
      return t(u);
    if ((0, e.IsDate)(u))
      return a(u);
    if ((0, e.IsTypedArray)(u))
      return r(u);
    if ((0, e.IsMap)(u))
      return i(u);
    if ((0, e.IsSet)(u))
      return o(u);
    if ((0, e.IsObject)(u))
      return n(u);
    if ((0, e.IsValueType)(u))
      return u;
    throw new Error("ValueClone: Unable to clone value");
  }
  return Ed;
}
var vh;
function $r() {
  return vh || (vh = 1, function(e) {
    var n = vo && vo.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = vo && vo.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ bL(), e);
  }(vo)), vo;
}
var Sh;
function hL() {
  if (Sh) return as;
  Sh = 1, Object.defineProperty(as, "__esModule", { value: !0 }), as.ValueCreateError = void 0, as.Create = D;
  const e = /* @__PURE__ */ bn(), n = /* @__PURE__ */ Kt(), t = /* @__PURE__ */ $r(), r = /* @__PURE__ */ pr(), i = /* @__PURE__ */ Rr(), o = /* @__PURE__ */ bc(), a = /* @__PURE__ */ zs(), s = /* @__PURE__ */ le(), c = /* @__PURE__ */ on(), u = /* @__PURE__ */ ag();
  class f extends c.TypeBoxError {
    constructor(h, j) {
      super(j), this.schema = h;
    }
  }
  as.ValueCreateError = f;
  function d(g) {
    return (0, u.IsFunction)(g) ? g() : (0, t.Clone)(g);
  }
  function p(g, h) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : {};
  }
  function T(g, h) {
    if (g.uniqueItems === !0 && !(0, e.HasPropertyKey)(g, "default"))
      throw new f(g, "Array with the uniqueItems constraint requires a default value");
    if ("contains" in g && !(0, e.HasPropertyKey)(g, "default"))
      throw new f(g, "Array with the contains constraint requires a default value");
    return "default" in g ? d(g.default) : g.minItems !== void 0 ? Array.from({ length: g.minItems }).map((j) => Re(g.items, h)) : [];
  }
  function b(g, h) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : async function* () {
    }();
  }
  function O(g, h) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : BigInt(0);
  }
  function F(g, h) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : !1;
  }
  function E(g, h) {
    if ((0, e.HasPropertyKey)(g, "default"))
      return d(g.default);
    {
      const j = Re(g.returns, h);
      return typeof j == "object" && !Array.isArray(j) ? class {
        constructor() {
          for (const [H, l] of Object.entries(j)) {
            const X = this;
            X[H] = l;
          }
        }
      } : class {
      };
    }
  }
  function M(g, h) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : g.minimumTimestamp !== void 0 ? new Date(g.minimumTimestamp) : /* @__PURE__ */ new Date();
  }
  function N(g, h) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : () => Re(g.returns, h);
  }
  function w(g, h) {
    const j = globalThis.Object.values(g.$defs), H = g.$defs[g.$ref];
    return Re(H, [...h, ...j]);
  }
  function _(g, h) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : g.minimum !== void 0 ? g.minimum : 0;
  }
  function B(g, h) {
    if ((0, e.HasPropertyKey)(g, "default"))
      return d(g.default);
    {
      const j = g.allOf.reduce((H, l) => {
        const X = Re(l, h);
        return typeof X == "object" ? { ...H, ...X } : X;
      }, {});
      if (!(0, n.Check)(g, h, j))
        throw new f(g, "Intersect produced invalid value. Consider using a default value.");
      return j;
    }
  }
  function m(g, h) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : function* () {
    }();
  }
  function P(g, h) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : g.const;
  }
  function R(g, h) {
    if ((0, e.HasPropertyKey)(g, "default"))
      return d(g.default);
    throw new f(g, "Never types cannot be created. Consider using a default value.");
  }
  function y(g, h) {
    if ((0, e.HasPropertyKey)(g, "default"))
      return d(g.default);
    throw new f(g, "Not types must have a default value");
  }
  function $(g, h) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : null;
  }
  function C(g, h) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : g.minimum !== void 0 ? g.minimum : 0;
  }
  function V(g, h) {
    if ((0, e.HasPropertyKey)(g, "default"))
      return d(g.default);
    {
      const j = new Set(g.required), H = {};
      for (const [l, X] of Object.entries(g.properties))
        j.has(l) && (H[l] = Re(X, h));
      return H;
    }
  }
  function G(g, h) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : Promise.resolve(Re(g.item, h));
  }
  function z(g, h) {
    const [j, H] = Object.entries(g.patternProperties)[0];
    if ((0, e.HasPropertyKey)(g, "default"))
      return d(g.default);
    if (j === o.PatternStringExact || j === o.PatternNumberExact)
      return {};
    {
      const l = j.slice(1, j.length - 1).split("|"), X = {};
      for (const q of l)
        X[q] = Re(H, h);
      return X;
    }
  }
  function ie(g, h) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : Re((0, r.Deref)(g, h), h);
  }
  function ae(g, h) {
    if ((0, e.HasPropertyKey)(g, "default"))
      return d(g.default);
    throw new f(g, "RegExp types cannot be created. Consider using a default value.");
  }
  function k(g, h) {
    if (g.pattern !== void 0) {
      if ((0, e.HasPropertyKey)(g, "default"))
        return d(g.default);
      throw new f(g, "String types with patterns must specify a default value");
    } else if (g.format !== void 0) {
      if ((0, e.HasPropertyKey)(g, "default"))
        return d(g.default);
      throw new f(g, "String types with formats must specify a default value");
    } else
      return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : g.minLength !== void 0 ? Array.from({ length: g.minLength }).map(() => " ").join("") : "";
  }
  function $e(g, h) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : "value" in g ? Symbol.for(g.value) : Symbol();
  }
  function He(g, h) {
    if ((0, e.HasPropertyKey)(g, "default"))
      return d(g.default);
    if (!(0, i.IsTemplateLiteralFinite)(g))
      throw new f(g, "Can only create template literals that produce a finite variants. Consider using a default value.");
    return (0, i.TemplateLiteralGenerate)(g)[0];
  }
  function Je(g, h) {
    if (Y++ > ne)
      throw new f(g, "Cannot create recursive type as it appears possibly infinite. Consider using a default.");
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : Re((0, r.Deref)(g, h), h);
  }
  function We(g, h) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : g.items === void 0 ? [] : Array.from({ length: g.minItems }).map((j, H) => Re(g.items[H], h));
  }
  function Ye(g, h) {
    if ((0, e.HasPropertyKey)(g, "default"))
      return d(g.default);
  }
  function Me(g, h) {
    if ((0, e.HasPropertyKey)(g, "default"))
      return d(g.default);
    if (g.anyOf.length === 0)
      throw new Error("ValueCreate.Union: Cannot create Union with zero variants");
    return Re(g.anyOf[0], h);
  }
  function en(g, h) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : g.minByteLength !== void 0 ? new Uint8Array(g.minByteLength) : new Uint8Array(0);
  }
  function Q(g, h) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : {};
  }
  function re(g, h) {
    if ((0, e.HasPropertyKey)(g, "default"))
      return d(g.default);
  }
  function Ae(g, h) {
    if ((0, e.HasPropertyKey)(g, "default"))
      return d(g.default);
    throw new Error("User defined types must specify a default value");
  }
  function Re(g, h) {
    const j = (0, r.Pushref)(g, h), H = g;
    switch (H[s.Kind]) {
      case "Any":
        return p(H);
      case "Array":
        return T(H, j);
      case "AsyncIterator":
        return b(H);
      case "BigInt":
        return O(H);
      case "Boolean":
        return F(H);
      case "Constructor":
        return E(H, j);
      case "Date":
        return M(H);
      case "Function":
        return N(H, j);
      case "Import":
        return w(H, j);
      case "Integer":
        return _(H);
      case "Intersect":
        return B(H, j);
      case "Iterator":
        return m(H);
      case "Literal":
        return P(H);
      case "Never":
        return R(H);
      case "Not":
        return y(H);
      case "Null":
        return $(H);
      case "Number":
        return C(H);
      case "Object":
        return V(H, j);
      case "Promise":
        return G(H, j);
      case "Record":
        return z(H, j);
      case "Ref":
        return ie(H, j);
      case "RegExp":
        return ae(H);
      case "String":
        return k(H);
      case "Symbol":
        return $e(H);
      case "TemplateLiteral":
        return He(H);
      case "This":
        return Je(H, j);
      case "Tuple":
        return We(H, j);
      case "Undefined":
        return Ye(H);
      case "Union":
        return Me(H, j);
      case "Uint8Array":
        return en(H);
      case "Unknown":
        return Q(H);
      case "Void":
        return re(H);
      default:
        if (!a.TypeRegistry.Has(H[s.Kind]))
          throw new f(H, "Unknown type");
        return Ae(H);
    }
  }
  const ne = 512;
  let Y = 0;
  function D(...g) {
    return Y = 0, g.length === 2 ? Re(g[0], g[1]) : Re(g[0], []);
  }
  return as;
}
var Rh;
function gg() {
  return Rh || (Rh = 1, function(e) {
    var n = wo && wo.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = wo && wo.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ hL(), e);
  }(wo)), wo;
}
var Eh;
function IL() {
  if (Eh) return os;
  Eh = 1, Object.defineProperty(os, "__esModule", { value: !0 }), os.ValueCastError = void 0, os.Cast = R;
  const e = /* @__PURE__ */ bn(), n = /* @__PURE__ */ on(), t = /* @__PURE__ */ le(), r = /* @__PURE__ */ gg(), i = /* @__PURE__ */ Kt(), o = /* @__PURE__ */ $r(), a = /* @__PURE__ */ pr();
  class s extends n.TypeBoxError {
    constructor($, C) {
      super(C), this.schema = $;
    }
  }
  os.ValueCastError = s;
  function c(y, $, C) {
    if (y[t.Kind] === "Object" && typeof C == "object" && !(0, e.IsNull)(C)) {
      const V = y, G = Object.getOwnPropertyNames(C), z = Object.entries(V.properties), [ie, ae] = [1 / z.length, z.length];
      return z.reduce((k, [$e, He]) => {
        const Je = He[t.Kind] === "Literal" && He.const === C[$e] ? ae : 0, We = (0, i.Check)(He, $, C[$e]) ? ie : 0, Ye = G.includes($e) ? ie : 0;
        return k + (Je + We + Ye);
      }, 0);
    } else
      return (0, i.Check)(y, $, C) ? 1 : 0;
  }
  function u(y, $, C) {
    const V = y.anyOf.map((ie) => (0, a.Deref)(ie, $));
    let [G, z] = [V[0], 0];
    for (const ie of V) {
      const ae = c(ie, $, C);
      ae > z && (G = ie, z = ae);
    }
    return G;
  }
  function f(y, $, C) {
    if ("default" in y)
      return typeof C == "function" ? y.default : (0, o.Clone)(y.default);
    {
      const V = u(y, $, C);
      return R(V, $, C);
    }
  }
  function d(y, $, C) {
    return (0, i.Check)(y, $, C) ? (0, o.Clone)(C) : (0, r.Create)(y, $);
  }
  function p(y, $, C) {
    return (0, i.Check)(y, $, C) ? C : (0, r.Create)(y, $);
  }
  function T(y, $, C) {
    if ((0, i.Check)(y, $, C))
      return (0, o.Clone)(C);
    const V = (0, e.IsArray)(C) ? (0, o.Clone)(C) : (0, r.Create)(y, $), G = (0, e.IsNumber)(y.minItems) && V.length < y.minItems ? [...V, ...Array.from({ length: y.minItems - V.length }, () => null)] : V, ie = ((0, e.IsNumber)(y.maxItems) && G.length > y.maxItems ? G.slice(0, y.maxItems) : G).map((k) => P(y.items, $, k));
    if (y.uniqueItems !== !0)
      return ie;
    const ae = [...new Set(ie)];
    if (!(0, i.Check)(y, $, ae))
      throw new s(y, "Array cast produced invalid data due to uniqueItems constraint");
    return ae;
  }
  function b(y, $, C) {
    if ((0, i.Check)(y, $, C))
      return (0, r.Create)(y, $);
    const V = new Set(y.returns.required || []), G = function() {
    };
    for (const [z, ie] of Object.entries(y.returns.properties))
      !V.has(z) && C.prototype[z] === void 0 || (G.prototype[z] = P(ie, $, C.prototype[z]));
    return G;
  }
  function O(y, $, C) {
    const V = globalThis.Object.values(y.$defs), G = y.$defs[y.$ref];
    return P(G, [...$, ...V], C);
  }
  function F(y, $, C) {
    const V = (0, r.Create)(y, $), G = (0, e.IsObject)(V) && (0, e.IsObject)(C) ? { ...V, ...C } : C;
    return (0, i.Check)(y, $, G) ? G : (0, r.Create)(y, $);
  }
  function E(y, $, C) {
    throw new s(y, "Never types cannot be cast");
  }
  function M(y, $, C) {
    if ((0, i.Check)(y, $, C))
      return C;
    if (C === null || typeof C != "object")
      return (0, r.Create)(y, $);
    const V = new Set(y.required || []), G = {};
    for (const [z, ie] of Object.entries(y.properties))
      !V.has(z) && C[z] === void 0 || (G[z] = P(ie, $, C[z]));
    if (typeof y.additionalProperties == "object") {
      const z = Object.getOwnPropertyNames(y.properties);
      for (const ie of Object.getOwnPropertyNames(C))
        z.includes(ie) || (G[ie] = P(y.additionalProperties, $, C[ie]));
    }
    return G;
  }
  function N(y, $, C) {
    if ((0, i.Check)(y, $, C))
      return (0, o.Clone)(C);
    if (C === null || typeof C != "object" || Array.isArray(C) || C instanceof Date)
      return (0, r.Create)(y, $);
    const V = Object.getOwnPropertyNames(y.patternProperties)[0], G = y.patternProperties[V], z = {};
    for (const [ie, ae] of Object.entries(C))
      z[ie] = P(G, $, ae);
    return z;
  }
  function w(y, $, C) {
    return P((0, a.Deref)(y, $), $, C);
  }
  function _(y, $, C) {
    return P((0, a.Deref)(y, $), $, C);
  }
  function B(y, $, C) {
    return (0, i.Check)(y, $, C) ? (0, o.Clone)(C) : (0, e.IsArray)(C) ? y.items === void 0 ? [] : y.items.map((V, G) => P(V, $, C[G])) : (0, r.Create)(y, $);
  }
  function m(y, $, C) {
    return (0, i.Check)(y, $, C) ? (0, o.Clone)(C) : f(y, $, C);
  }
  function P(y, $, C) {
    const V = (0, e.IsString)(y.$id) ? (0, a.Pushref)(y, $) : $, G = y;
    switch (y[t.Kind]) {
      // --------------------------------------------------------------
      // Structural
      // --------------------------------------------------------------
      case "Array":
        return T(G, V, C);
      case "Constructor":
        return b(G, V, C);
      case "Import":
        return O(G, V, C);
      case "Intersect":
        return F(G, V, C);
      case "Never":
        return E(G);
      case "Object":
        return M(G, V, C);
      case "Record":
        return N(G, V, C);
      case "Ref":
        return w(G, V, C);
      case "This":
        return _(G, V, C);
      case "Tuple":
        return B(G, V, C);
      case "Union":
        return m(G, V, C);
      // --------------------------------------------------------------
      // DefaultClone
      // --------------------------------------------------------------
      case "Date":
      case "Symbol":
      case "Uint8Array":
        return d(y, $, C);
      // --------------------------------------------------------------
      // Default
      // --------------------------------------------------------------
      default:
        return p(G, V, C);
    }
  }
  function R(...y) {
    return y.length === 3 ? P(y[0], y[1], y[2]) : P(y[0], [], y[1]);
  }
  return os;
}
var $h;
function Wv() {
  return $h || ($h = 1, function(e) {
    var n = Ao && Ao.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Ao && Ao.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ IL(), e);
  }(Ao)), Ao;
}
var So = {}, $d = {}, Mh;
function OL() {
  if (Mh) return $d;
  Mh = 1, Object.defineProperty($d, "__esModule", { value: !0 }), $d.Clean = M;
  const e = /* @__PURE__ */ fr(), n = /* @__PURE__ */ Kt(), t = /* @__PURE__ */ $r(), r = /* @__PURE__ */ pr(), i = /* @__PURE__ */ le(), o = /* @__PURE__ */ bn(), a = /* @__PURE__ */ De();
  function s(N) {
    return (0, a.IsKind)(N) && N[i.Kind] !== "Unsafe";
  }
  function c(N, w, _) {
    return (0, o.IsArray)(_) ? _.map((B) => E(N.items, w, B)) : _;
  }
  function u(N, w, _) {
    const B = globalThis.Object.values(N.$defs), m = N.$defs[N.$ref];
    return E(m, [...w, ...B], _);
  }
  function f(N, w, _) {
    const B = N.unevaluatedProperties, P = N.allOf.map((y) => E(y, w, (0, t.Clone)(_))).reduce((y, $) => (0, o.IsObject)($) ? { ...y, ...$ } : $, {});
    if (!(0, o.IsObject)(_) || !(0, o.IsObject)(P) || !(0, a.IsKind)(B))
      return P;
    const R = (0, e.KeyOfPropertyKeys)(N);
    for (const y of Object.getOwnPropertyNames(_))
      R.includes(y) || (0, n.Check)(B, w, _[y]) && (P[y] = E(B, w, _[y]));
    return P;
  }
  function d(N, w, _) {
    if (!(0, o.IsObject)(_) || (0, o.IsArray)(_))
      return _;
    const B = N.additionalProperties;
    for (const m of Object.getOwnPropertyNames(_)) {
      if ((0, o.HasPropertyKey)(N.properties, m)) {
        _[m] = E(N.properties[m], w, _[m]);
        continue;
      }
      if ((0, a.IsKind)(B) && (0, n.Check)(B, w, _[m])) {
        _[m] = E(B, w, _[m]);
        continue;
      }
      delete _[m];
    }
    return _;
  }
  function p(N, w, _) {
    if (!(0, o.IsObject)(_))
      return _;
    const B = N.additionalProperties, m = Object.getOwnPropertyNames(_), [P, R] = Object.entries(N.patternProperties)[0], y = new RegExp(P);
    for (const $ of m) {
      if (y.test($)) {
        _[$] = E(R, w, _[$]);
        continue;
      }
      if ((0, a.IsKind)(B) && (0, n.Check)(B, w, _[$])) {
        _[$] = E(B, w, _[$]);
        continue;
      }
      delete _[$];
    }
    return _;
  }
  function T(N, w, _) {
    return E((0, r.Deref)(N, w), w, _);
  }
  function b(N, w, _) {
    return E((0, r.Deref)(N, w), w, _);
  }
  function O(N, w, _) {
    if (!(0, o.IsArray)(_))
      return _;
    if ((0, o.IsUndefined)(N.items))
      return [];
    const B = Math.min(_.length, N.items.length);
    for (let m = 0; m < B; m++)
      _[m] = E(N.items[m], w, _[m]);
    return _.length > B ? _.slice(0, B) : _;
  }
  function F(N, w, _) {
    for (const B of N.anyOf)
      if (s(B) && (0, n.Check)(B, w, _))
        return E(B, w, _);
    return _;
  }
  function E(N, w, _) {
    const B = (0, o.IsString)(N.$id) ? (0, r.Pushref)(N, w) : w, m = N;
    switch (m[i.Kind]) {
      case "Array":
        return c(m, B, _);
      case "Import":
        return u(m, B, _);
      case "Intersect":
        return f(m, B, _);
      case "Object":
        return d(m, B, _);
      case "Record":
        return p(m, B, _);
      case "Ref":
        return T(m, B, _);
      case "This":
        return b(m, B, _);
      case "Tuple":
        return O(m, B, _);
      case "Union":
        return F(m, B, _);
      default:
        return _;
    }
  }
  function M(...N) {
    return N.length === 3 ? E(N[0], N[1], N[2]) : E(N[0], [], N[1]);
  }
  return $d;
}
var Ch;
function Tg() {
  return Ch || (Ch = 1, function(e) {
    var n = So && So.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = So && So.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ OL(), e);
  }(So)), So;
}
var Ro = {}, Md = {}, Bh;
function PL() {
  if (Bh) return Md;
  Bh = 1, Object.defineProperty(Md, "__esModule", { value: !0 }), Md.Convert = Y;
  const e = /* @__PURE__ */ $r(), n = /* @__PURE__ */ Kt(), t = /* @__PURE__ */ pr(), r = /* @__PURE__ */ le(), i = /* @__PURE__ */ bn();
  function o(D) {
    return (0, i.IsString)(D) && !isNaN(D) && !isNaN(parseFloat(D));
  }
  function a(D) {
    return (0, i.IsBigInt)(D) || (0, i.IsBoolean)(D) || (0, i.IsNumber)(D);
  }
  function s(D) {
    return D === !0 || (0, i.IsNumber)(D) && D === 1 || (0, i.IsBigInt)(D) && D === BigInt("1") || (0, i.IsString)(D) && (D.toLowerCase() === "true" || D === "1");
  }
  function c(D) {
    return D === !1 || (0, i.IsNumber)(D) && (D === 0 || Object.is(D, -0)) || (0, i.IsBigInt)(D) && D === BigInt("0") || (0, i.IsString)(D) && (D.toLowerCase() === "false" || D === "0" || D === "-0");
  }
  function u(D) {
    return (0, i.IsString)(D) && /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test(D);
  }
  function f(D) {
    return (0, i.IsString)(D) && /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test(D);
  }
  function d(D) {
    return (0, i.IsString)(D) && /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test(D);
  }
  function p(D) {
    return (0, i.IsString)(D) && /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test(D);
  }
  function T(D) {
    return (0, i.IsString)(D) && /^\d\d\d\d-[0-1]\d-[0-3]\d$/i.test(D);
  }
  function b(D, g) {
    const h = w(D);
    return h === g ? h : D;
  }
  function O(D, g) {
    const h = _(D);
    return h === g ? h : D;
  }
  function F(D, g) {
    const h = M(D);
    return h === g ? h : D;
  }
  function E(D, g) {
    return (0, i.IsString)(D.const) ? b(g, D.const) : (0, i.IsNumber)(D.const) ? O(g, D.const) : (0, i.IsBoolean)(D.const) ? F(g, D.const) : g;
  }
  function M(D) {
    return s(D) ? !0 : c(D) ? !1 : D;
  }
  function N(D) {
    const g = (h) => h.split(".")[0];
    return o(D) ? BigInt(g(D)) : (0, i.IsNumber)(D) ? BigInt(Math.trunc(D)) : c(D) ? BigInt(0) : s(D) ? BigInt(1) : D;
  }
  function w(D) {
    return (0, i.IsSymbol)(D) && D.description !== void 0 ? D.description.toString() : a(D) ? D.toString() : D;
  }
  function _(D) {
    return o(D) ? parseFloat(D) : s(D) ? 1 : c(D) ? 0 : D;
  }
  function B(D) {
    return o(D) ? parseInt(D) : (0, i.IsNumber)(D) ? D | 0 : s(D) ? 1 : c(D) ? 0 : D;
  }
  function m(D) {
    return (0, i.IsString)(D) && D.toLowerCase() === "null" ? null : D;
  }
  function P(D) {
    return (0, i.IsString)(D) && D === "undefined" ? void 0 : D;
  }
  function R(D) {
    return (0, i.IsDate)(D) ? D : (0, i.IsNumber)(D) ? new Date(D) : s(D) ? /* @__PURE__ */ new Date(1) : c(D) ? /* @__PURE__ */ new Date(0) : o(D) ? new Date(parseInt(D)) : f(D) ? /* @__PURE__ */ new Date(`1970-01-01T${D}.000Z`) : u(D) ? /* @__PURE__ */ new Date(`1970-01-01T${D}`) : p(D) ? /* @__PURE__ */ new Date(`${D}.000Z`) : d(D) ? new Date(D) : T(D) ? /* @__PURE__ */ new Date(`${D}T00:00:00.000Z`) : D;
  }
  function y(D) {
    return D;
  }
  function $(D, g, h) {
    return ((0, i.IsArray)(h) ? h : [h]).map((H) => ne(D.items, g, H));
  }
  function C(D, g, h) {
    return N(h);
  }
  function V(D, g, h) {
    return M(h);
  }
  function G(D, g, h) {
    return R(h);
  }
  function z(D, g, h) {
    const j = globalThis.Object.values(D.$defs), H = D.$defs[D.$ref];
    return ne(H, [...g, ...j], h);
  }
  function ie(D, g, h) {
    return B(h);
  }
  function ae(D, g, h) {
    return D.allOf.reduce((j, H) => ne(H, g, j), h);
  }
  function k(D, g, h) {
    return E(D, h);
  }
  function $e(D, g, h) {
    return m(h);
  }
  function He(D, g, h) {
    return _(h);
  }
  function Je(D, g, h) {
    if (!(0, i.IsObject)(h))
      return h;
    for (const j of Object.getOwnPropertyNames(D.properties))
      (0, i.HasPropertyKey)(h, j) && (h[j] = ne(D.properties[j], g, h[j]));
    return h;
  }
  function We(D, g, h) {
    if (!(0, i.IsObject)(h))
      return h;
    const H = Object.getOwnPropertyNames(D.patternProperties)[0], l = D.patternProperties[H];
    for (const [X, q] of Object.entries(h))
      h[X] = ne(l, g, q);
    return h;
  }
  function Ye(D, g, h) {
    return ne((0, t.Deref)(D, g), g, h);
  }
  function Me(D, g, h) {
    return w(h);
  }
  function en(D, g, h) {
    return (0, i.IsString)(h) || (0, i.IsNumber)(h) ? Symbol(h) : h;
  }
  function Q(D, g, h) {
    return ne((0, t.Deref)(D, g), g, h);
  }
  function re(D, g, h) {
    return (0, i.IsArray)(h) && !(0, i.IsUndefined)(D.items) ? h.map((H, l) => l < D.items.length ? ne(D.items[l], g, H) : H) : h;
  }
  function Ae(D, g, h) {
    return P(h);
  }
  function Re(D, g, h) {
    for (const j of D.anyOf) {
      const H = ne(j, g, (0, e.Clone)(h));
      if ((0, n.Check)(j, g, H))
        return H;
    }
    return h;
  }
  function ne(D, g, h) {
    const j = (0, t.Pushref)(D, g), H = D;
    switch (D[r.Kind]) {
      case "Array":
        return $(H, j, h);
      case "BigInt":
        return C(H, j, h);
      case "Boolean":
        return V(H, j, h);
      case "Date":
        return G(H, j, h);
      case "Import":
        return z(H, j, h);
      case "Integer":
        return ie(H, j, h);
      case "Intersect":
        return ae(H, j, h);
      case "Literal":
        return k(H, j, h);
      case "Null":
        return $e(H, j, h);
      case "Number":
        return He(H, j, h);
      case "Object":
        return Je(H, j, h);
      case "Record":
        return We(H, j, h);
      case "Ref":
        return Ye(H, j, h);
      case "String":
        return Me(H, j, h);
      case "Symbol":
        return en(H, j, h);
      case "This":
        return Q(H, j, h);
      case "Tuple":
        return re(H, j, h);
      case "Undefined":
        return Ae(H, j, h);
      case "Union":
        return Re(H, j, h);
      default:
        return h;
    }
  }
  function Y(...D) {
    return D.length === 3 ? ne(D[0], D[1], D[2]) : ne(D[0], [], D[1]);
  }
  return Md;
}
var jh;
function _g() {
  return jh || (jh = 1, function(e) {
    var n = Ro && Ro.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Ro && Ro.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ PL(), e);
  }(Ro)), Ro;
}
var Eo = {}, Cd = {}, $o = {}, ii = {}, xh;
function AL() {
  if (xh) return ii;
  xh = 1, Object.defineProperty(ii, "__esModule", { value: !0 }), ii.TransformDecodeError = ii.TransformDecodeCheckError = void 0, ii.TransformDecode = B;
  const e = /* @__PURE__ */ Jp(), n = /* @__PURE__ */ le(), t = /* @__PURE__ */ on(), r = /* @__PURE__ */ fr(), i = /* @__PURE__ */ pr(), o = /* @__PURE__ */ Kt(), a = /* @__PURE__ */ bn(), s = /* @__PURE__ */ De();
  class c extends t.TypeBoxError {
    constructor(P, R, y) {
      super("Unable to decode value as it does not match the expected schema"), this.schema = P, this.value = R, this.error = y;
    }
  }
  ii.TransformDecodeCheckError = c;
  class u extends t.TypeBoxError {
    constructor(P, R, y, $) {
      super($ instanceof Error ? $.message : "Unknown error"), this.schema = P, this.path = R, this.value = y, this.error = $;
    }
  }
  ii.TransformDecodeError = u;
  function f(m, P, R) {
    try {
      return (0, s.IsTransform)(m) ? m[n.TransformKind].Decode(R) : R;
    } catch (y) {
      throw new u(m, P, R, y);
    }
  }
  function d(m, P, R, y) {
    return (0, a.IsArray)(y) ? f(m, R, y.map(($, C) => _(m.items, P, `${R}/${C}`, $))) : f(m, R, y);
  }
  function p(m, P, R, y) {
    if (!(0, a.IsObject)(y) || (0, a.IsValueType)(y))
      return f(m, R, y);
    const $ = (0, r.KeyOfPropertyEntries)(m), C = $.map((ae) => ae[0]), V = { ...y };
    for (const [ae, k] of $)
      ae in V && (V[ae] = _(k, P, `${R}/${ae}`, V[ae]));
    if (!(0, s.IsTransform)(m.unevaluatedProperties))
      return f(m, R, V);
    const G = Object.getOwnPropertyNames(V), z = m.unevaluatedProperties, ie = { ...V };
    for (const ae of G)
      C.includes(ae) || (ie[ae] = f(z, `${R}/${ae}`, ie[ae]));
    return f(m, R, ie);
  }
  function T(m, P, R, y) {
    const $ = globalThis.Object.values(m.$defs), C = m.$defs[m.$ref], V = m[n.TransformKind], G = { [n.TransformKind]: V, ...C };
    return _(G, [...P, ...$], R, y);
  }
  function b(m, P, R, y) {
    return f(m, R, _(m.not, P, R, y));
  }
  function O(m, P, R, y) {
    if (!(0, a.IsObject)(y))
      return f(m, R, y);
    const $ = (0, r.KeyOfPropertyKeys)(m), C = { ...y };
    for (const ie of $)
      (0, a.HasPropertyKey)(C, ie) && ((0, a.IsUndefined)(C[ie]) && (!(0, s.IsUndefined)(m.properties[ie]) || e.TypeSystemPolicy.IsExactOptionalProperty(C, ie)) || (C[ie] = _(m.properties[ie], P, `${R}/${ie}`, C[ie])));
    if (!(0, s.IsSchema)(m.additionalProperties))
      return f(m, R, C);
    const V = Object.getOwnPropertyNames(C), G = m.additionalProperties, z = { ...C };
    for (const ie of V)
      $.includes(ie) || (z[ie] = f(G, `${R}/${ie}`, z[ie]));
    return f(m, R, z);
  }
  function F(m, P, R, y) {
    if (!(0, a.IsObject)(y))
      return f(m, R, y);
    const $ = Object.getOwnPropertyNames(m.patternProperties)[0], C = new RegExp($), V = { ...y };
    for (const ae of Object.getOwnPropertyNames(y))
      C.test(ae) && (V[ae] = _(m.patternProperties[$], P, `${R}/${ae}`, V[ae]));
    if (!(0, s.IsSchema)(m.additionalProperties))
      return f(m, R, V);
    const G = Object.getOwnPropertyNames(V), z = m.additionalProperties, ie = { ...V };
    for (const ae of G)
      C.test(ae) || (ie[ae] = f(z, `${R}/${ae}`, ie[ae]));
    return f(m, R, ie);
  }
  function E(m, P, R, y) {
    const $ = (0, i.Deref)(m, P);
    return f(m, R, _($, P, R, y));
  }
  function M(m, P, R, y) {
    const $ = (0, i.Deref)(m, P);
    return f(m, R, _($, P, R, y));
  }
  function N(m, P, R, y) {
    return (0, a.IsArray)(y) && (0, a.IsArray)(m.items) ? f(m, R, m.items.map(($, C) => _($, P, `${R}/${C}`, y[C]))) : f(m, R, y);
  }
  function w(m, P, R, y) {
    for (const $ of m.anyOf) {
      if (!(0, o.Check)($, P, y))
        continue;
      const C = _($, P, R, y);
      return f(m, R, C);
    }
    return f(m, R, y);
  }
  function _(m, P, R, y) {
    const $ = (0, i.Pushref)(m, P), C = m;
    switch (m[n.Kind]) {
      case "Array":
        return d(C, $, R, y);
      case "Import":
        return T(C, $, R, y);
      case "Intersect":
        return p(C, $, R, y);
      case "Not":
        return b(C, $, R, y);
      case "Object":
        return O(C, $, R, y);
      case "Record":
        return F(C, $, R, y);
      case "Ref":
        return E(C, $, R, y);
      case "Symbol":
        return f(C, R, y);
      case "This":
        return M(C, $, R, y);
      case "Tuple":
        return N(C, $, R, y);
      case "Union":
        return w(C, $, R, y);
      default:
        return f(C, R, y);
    }
  }
  function B(m, P, R) {
    return _(m, P, "", R);
  }
  return ii;
}
var oi = {}, Fh;
function wL() {
  if (Fh) return oi;
  Fh = 1, Object.defineProperty(oi, "__esModule", { value: !0 }), oi.TransformEncodeError = oi.TransformEncodeCheckError = void 0, oi.TransformEncode = B;
  const e = /* @__PURE__ */ Jp(), n = /* @__PURE__ */ le(), t = /* @__PURE__ */ on(), r = /* @__PURE__ */ fr(), i = /* @__PURE__ */ pr(), o = /* @__PURE__ */ Kt(), a = /* @__PURE__ */ bn(), s = /* @__PURE__ */ De();
  class c extends t.TypeBoxError {
    constructor(P, R, y) {
      super("The encoded value does not match the expected schema"), this.schema = P, this.value = R, this.error = y;
    }
  }
  oi.TransformEncodeCheckError = c;
  class u extends t.TypeBoxError {
    constructor(P, R, y, $) {
      super(`${$ instanceof Error ? $.message : "Unknown error"}`), this.schema = P, this.path = R, this.value = y, this.error = $;
    }
  }
  oi.TransformEncodeError = u;
  function f(m, P, R) {
    try {
      return (0, s.IsTransform)(m) ? m[n.TransformKind].Encode(R) : R;
    } catch (y) {
      throw new u(m, P, R, y);
    }
  }
  function d(m, P, R, y) {
    const $ = f(m, R, y);
    return (0, a.IsArray)($) ? $.map((C, V) => _(m.items, P, `${R}/${V}`, C)) : $;
  }
  function p(m, P, R, y) {
    const $ = globalThis.Object.values(m.$defs), C = m.$defs[m.$ref], V = m[n.TransformKind], G = { [n.TransformKind]: V, ...C };
    return _(G, [...P, ...$], R, y);
  }
  function T(m, P, R, y) {
    const $ = f(m, R, y);
    if (!(0, a.IsObject)(y) || (0, a.IsValueType)(y))
      return $;
    const C = (0, r.KeyOfPropertyEntries)(m), V = C.map((k) => k[0]), G = { ...$ };
    for (const [k, $e] of C)
      k in G && (G[k] = _($e, P, `${R}/${k}`, G[k]));
    if (!(0, s.IsTransform)(m.unevaluatedProperties))
      return G;
    const z = Object.getOwnPropertyNames(G), ie = m.unevaluatedProperties, ae = { ...G };
    for (const k of z)
      V.includes(k) || (ae[k] = f(ie, `${R}/${k}`, ae[k]));
    return ae;
  }
  function b(m, P, R, y) {
    return f(m.not, R, f(m, R, y));
  }
  function O(m, P, R, y) {
    const $ = f(m, R, y);
    if (!(0, a.IsObject)($))
      return $;
    const C = (0, r.KeyOfPropertyKeys)(m), V = { ...$ };
    for (const ae of C)
      (0, a.HasPropertyKey)(V, ae) && ((0, a.IsUndefined)(V[ae]) && (!(0, s.IsUndefined)(m.properties[ae]) || e.TypeSystemPolicy.IsExactOptionalProperty(V, ae)) || (V[ae] = _(m.properties[ae], P, `${R}/${ae}`, V[ae])));
    if (!(0, s.IsSchema)(m.additionalProperties))
      return V;
    const G = Object.getOwnPropertyNames(V), z = m.additionalProperties, ie = { ...V };
    for (const ae of G)
      C.includes(ae) || (ie[ae] = f(z, `${R}/${ae}`, ie[ae]));
    return ie;
  }
  function F(m, P, R, y) {
    const $ = f(m, R, y);
    if (!(0, a.IsObject)(y))
      return $;
    const C = Object.getOwnPropertyNames(m.patternProperties)[0], V = new RegExp(C), G = { ...$ };
    for (const k of Object.getOwnPropertyNames(y))
      V.test(k) && (G[k] = _(m.patternProperties[C], P, `${R}/${k}`, G[k]));
    if (!(0, s.IsSchema)(m.additionalProperties))
      return G;
    const z = Object.getOwnPropertyNames(G), ie = m.additionalProperties, ae = { ...G };
    for (const k of z)
      V.test(k) || (ae[k] = f(ie, `${R}/${k}`, ae[k]));
    return ae;
  }
  function E(m, P, R, y) {
    const $ = (0, i.Deref)(m, P), C = _($, P, R, y);
    return f(m, R, C);
  }
  function M(m, P, R, y) {
    const $ = (0, i.Deref)(m, P), C = _($, P, R, y);
    return f(m, R, C);
  }
  function N(m, P, R, y) {
    const $ = f(m, R, y);
    return (0, a.IsArray)(m.items) ? m.items.map((C, V) => _(C, P, `${R}/${V}`, $[V])) : [];
  }
  function w(m, P, R, y) {
    for (const $ of m.anyOf) {
      if (!(0, o.Check)($, P, y))
        continue;
      const C = _($, P, R, y);
      return f(m, R, C);
    }
    for (const $ of m.anyOf) {
      const C = _($, P, R, y);
      if ((0, o.Check)(m, P, C))
        return f(m, R, C);
    }
    return f(m, R, y);
  }
  function _(m, P, R, y) {
    const $ = (0, i.Pushref)(m, P), C = m;
    switch (m[n.Kind]) {
      case "Array":
        return d(C, $, R, y);
      case "Import":
        return p(C, $, R, y);
      case "Intersect":
        return T(C, $, R, y);
      case "Not":
        return b(C, $, R, y);
      case "Object":
        return O(C, $, R, y);
      case "Record":
        return F(C, $, R, y);
      case "Ref":
        return E(C, $, R, y);
      case "This":
        return M(C, $, R, y);
      case "Tuple":
        return N(C, $, R, y);
      case "Union":
        return w(C, $, R, y);
      default:
        return f(C, R, y);
    }
  }
  function B(m, P, R) {
    return _(m, P, "", R);
  }
  return oi;
}
var Bd = {}, Nh;
function vL() {
  if (Nh) return Bd;
  Nh = 1, Object.defineProperty(Bd, "__esModule", { value: !0 }), Bd.HasTransform = w;
  const e = /* @__PURE__ */ pr(), n = /* @__PURE__ */ le(), t = /* @__PURE__ */ De(), r = /* @__PURE__ */ bn();
  function i(_, B) {
    return (0, t.IsTransform)(_) || M(_.items, B);
  }
  function o(_, B) {
    return (0, t.IsTransform)(_) || M(_.items, B);
  }
  function a(_, B) {
    return (0, t.IsTransform)(_) || M(_.returns, B) || _.parameters.some((m) => M(m, B));
  }
  function s(_, B) {
    return (0, t.IsTransform)(_) || M(_.returns, B) || _.parameters.some((m) => M(m, B));
  }
  function c(_, B) {
    return (0, t.IsTransform)(_) || (0, t.IsTransform)(_.unevaluatedProperties) || _.allOf.some((m) => M(m, B));
  }
  function u(_, B) {
    return (0, t.IsTransform)(_) || M(_.items, B);
  }
  function f(_, B) {
    return (0, t.IsTransform)(_) || M(_.not, B);
  }
  function d(_, B) {
    return (0, t.IsTransform)(_) || Object.values(_.properties).some((m) => M(m, B)) || (0, t.IsSchema)(_.additionalProperties) && M(_.additionalProperties, B);
  }
  function p(_, B) {
    return (0, t.IsTransform)(_) || M(_.item, B);
  }
  function T(_, B) {
    const m = Object.getOwnPropertyNames(_.patternProperties)[0], P = _.patternProperties[m];
    return (0, t.IsTransform)(_) || M(P, B) || (0, t.IsSchema)(_.additionalProperties) && (0, t.IsTransform)(_.additionalProperties);
  }
  function b(_, B) {
    return (0, t.IsTransform)(_) ? !0 : M((0, e.Deref)(_, B), B);
  }
  function O(_, B) {
    return (0, t.IsTransform)(_) ? !0 : M((0, e.Deref)(_, B), B);
  }
  function F(_, B) {
    return (0, t.IsTransform)(_) || !(0, r.IsUndefined)(_.items) && _.items.some((m) => M(m, B));
  }
  function E(_, B) {
    return (0, t.IsTransform)(_) || _.anyOf.some((m) => M(m, B));
  }
  function M(_, B) {
    const m = (0, e.Pushref)(_, B), P = _;
    if (_.$id && N.has(_.$id))
      return !1;
    switch (_.$id && N.add(_.$id), _[n.Kind]) {
      case "Array":
        return i(P, m);
      case "AsyncIterator":
        return o(P, m);
      case "Constructor":
        return a(P, m);
      case "Function":
        return s(P, m);
      case "Intersect":
        return c(P, m);
      case "Iterator":
        return u(P, m);
      case "Not":
        return f(P, m);
      case "Object":
        return d(P, m);
      case "Promise":
        return p(P, m);
      case "Record":
        return T(P, m);
      case "Ref":
        return b(P, m);
      case "This":
        return O(P, m);
      case "Tuple":
        return F(P, m);
      case "Union":
        return E(P, m);
      default:
        return (0, t.IsTransform)(_);
    }
  }
  const N = /* @__PURE__ */ new Set();
  function w(_, B) {
    return N.clear(), M(_, B);
  }
  return Bd;
}
var Dh;
function Pc() {
  return Dh || (Dh = 1, function(e) {
    var n = $o && $o.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = $o && $o.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ AL(), e), t(/* @__PURE__ */ wL(), e), t(/* @__PURE__ */ vL(), e);
  }($o)), $o;
}
var Uh;
function SL() {
  if (Uh) return Cd;
  Uh = 1, Object.defineProperty(Cd, "__esModule", { value: !0 }), Cd.Decode = r;
  const e = /* @__PURE__ */ Pc(), n = /* @__PURE__ */ Kt(), t = /* @__PURE__ */ vi();
  function r(...i) {
    const [o, a, s] = i.length === 3 ? [i[0], i[1], i[2]] : [i[0], [], i[1]];
    if (!(0, n.Check)(o, a, s))
      throw new e.TransformDecodeCheckError(o, s, (0, t.Errors)(o, a, s).First());
    return (0, e.HasTransform)(o, a) ? (0, e.TransformDecode)(o, a, s) : s;
  }
  return Cd;
}
var Lh;
function zv() {
  return Lh || (Lh = 1, function(e) {
    var n = Eo && Eo.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Eo && Eo.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ SL(), e);
  }(Eo)), Eo;
}
var Mo = {}, jd = {}, Vh;
function RL() {
  if (Vh) return jd;
  Vh = 1, Object.defineProperty(jd, "__esModule", { value: !0 }), jd.Default = N;
  const e = /* @__PURE__ */ Kt(), n = /* @__PURE__ */ $r(), t = /* @__PURE__ */ pr(), r = /* @__PURE__ */ le(), i = /* @__PURE__ */ bn(), o = /* @__PURE__ */ De();
  function a(w, _) {
    const B = (0, i.HasPropertyKey)(w, "default") ? w.default : void 0, m = (0, i.IsFunction)(B) ? B() : (0, n.Clone)(B);
    return (0, i.IsUndefined)(_) ? m : (0, i.IsObject)(_) && (0, i.IsObject)(m) ? Object.assign(m, _) : _;
  }
  function s(w) {
    return (0, o.IsKind)(w) && "default" in w;
  }
  function c(w, _, B) {
    if ((0, i.IsArray)(B)) {
      for (let P = 0; P < B.length; P++)
        B[P] = M(w.items, _, B[P]);
      return B;
    }
    const m = a(w, B);
    if (!(0, i.IsArray)(m))
      return m;
    for (let P = 0; P < m.length; P++)
      m[P] = M(w.items, _, m[P]);
    return m;
  }
  function u(w, _, B) {
    return (0, i.IsDate)(B) ? B : a(w, B);
  }
  function f(w, _, B) {
    const m = globalThis.Object.values(w.$defs), P = w.$defs[w.$ref];
    return M(P, [..._, ...m], B);
  }
  function d(w, _, B) {
    const m = a(w, B);
    return w.allOf.reduce((P, R) => {
      const y = M(R, _, m);
      return (0, i.IsObject)(y) ? { ...P, ...y } : y;
    }, {});
  }
  function p(w, _, B) {
    const m = a(w, B);
    if (!(0, i.IsObject)(m))
      return m;
    const P = Object.getOwnPropertyNames(w.properties);
    for (const R of P) {
      const y = M(w.properties[R], _, m[R]);
      (0, i.IsUndefined)(y) || (m[R] = M(w.properties[R], _, m[R]));
    }
    if (!s(w.additionalProperties))
      return m;
    for (const R of Object.getOwnPropertyNames(m))
      P.includes(R) || (m[R] = M(w.additionalProperties, _, m[R]));
    return m;
  }
  function T(w, _, B) {
    const m = a(w, B);
    if (!(0, i.IsObject)(m))
      return m;
    const P = w.additionalProperties, [R, y] = Object.entries(w.patternProperties)[0], $ = new RegExp(R);
    for (const C of Object.getOwnPropertyNames(m))
      $.test(C) && s(y) && (m[C] = M(y, _, m[C]));
    if (!s(P))
      return m;
    for (const C of Object.getOwnPropertyNames(m))
      $.test(C) || (m[C] = M(P, _, m[C]));
    return m;
  }
  function b(w, _, B) {
    return M((0, t.Deref)(w, _), _, a(w, B));
  }
  function O(w, _, B) {
    return M((0, t.Deref)(w, _), _, B);
  }
  function F(w, _, B) {
    const m = a(w, B);
    if (!(0, i.IsArray)(m) || (0, i.IsUndefined)(w.items))
      return m;
    const [P, R] = [w.items, Math.max(w.items.length, m.length)];
    for (let y = 0; y < R; y++)
      y < P.length && (m[y] = M(P[y], _, m[y]));
    return m;
  }
  function E(w, _, B) {
    const m = a(w, B);
    for (const P of w.anyOf) {
      const R = M(P, _, (0, n.Clone)(m));
      if ((0, e.Check)(P, _, R))
        return R;
    }
    return m;
  }
  function M(w, _, B) {
    const m = (0, t.Pushref)(w, _), P = w;
    switch (P[r.Kind]) {
      case "Array":
        return c(P, m, B);
      case "Date":
        return u(P, m, B);
      case "Import":
        return f(P, m, B);
      case "Intersect":
        return d(P, m, B);
      case "Object":
        return p(P, m, B);
      case "Record":
        return T(P, m, B);
      case "Ref":
        return b(P, m, B);
      case "This":
        return O(P, m, B);
      case "Tuple":
        return F(P, m, B);
      case "Union":
        return E(P, m, B);
      default:
        return a(P, B);
    }
  }
  function N(...w) {
    return w.length === 3 ? M(w[0], w[1], w[2]) : M(w[0], [], w[1]);
  }
  return jd;
}
var qh;
function bg() {
  return qh || (qh = 1, function(e) {
    var n = Mo && Mo.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Mo && Mo.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ RL(), e);
  }(Mo)), Mo;
}
var Co = {}, Fl = {}, yu = {}, At = {}, Kh;
function EL() {
  if (Kh) return At;
  Kh = 1, Object.defineProperty(At, "__esModule", { value: !0 }), At.ValuePointerRootDeleteError = At.ValuePointerRootSetError = void 0, At.Format = i, At.Set = o, At.Delete = a, At.Has = s, At.Get = c;
  const e = /* @__PURE__ */ on();
  class n extends e.TypeBoxError {
    constructor(f, d, p) {
      super("Cannot set root value"), this.value = f, this.path = d, this.update = p;
    }
  }
  At.ValuePointerRootSetError = n;
  class t extends e.TypeBoxError {
    constructor(f, d) {
      super("Cannot delete root value"), this.value = f, this.path = d;
    }
  }
  At.ValuePointerRootDeleteError = t;
  function r(u) {
    return u.indexOf("~") === -1 ? u : u.replace(/~1/g, "/").replace(/~0/g, "~");
  }
  function* i(u) {
    if (u === "")
      return;
    let [f, d] = [0, 0];
    for (let p = 0; p < u.length; p++)
      u.charAt(p) === "/" ? (p === 0 || (d = p, yield r(u.slice(f, d))), f = p + 1) : d = p;
    yield r(u.slice(f));
  }
  function o(u, f, d) {
    if (f === "")
      throw new n(u, f, d);
    let [p, T, b] = [null, u, ""];
    for (const O of i(f))
      T[O] === void 0 && (T[O] = {}), p = T, T = T[O], b = O;
    p[b] = d;
  }
  function a(u, f) {
    if (f === "")
      throw new t(u, f);
    let [d, p, T] = [null, u, ""];
    for (const b of i(f)) {
      if (p[b] === void 0 || p[b] === null)
        return;
      d = p, p = p[b], T = b;
    }
    if (Array.isArray(d)) {
      const b = parseInt(T);
      d.splice(b, 1);
    } else
      delete d[T];
  }
  function s(u, f) {
    if (f === "")
      return !0;
    let [d, p, T] = [null, u, ""];
    for (const b of i(f)) {
      if (p[b] === void 0)
        return !1;
      d = p, p = p[b], T = b;
    }
    return Object.getOwnPropertyNames(d).includes(T);
  }
  function c(u, f) {
    if (f === "")
      return u;
    let d = u;
    for (const p of i(f)) {
      if (d[p] === void 0)
        return;
      d = d[p];
    }
    return d;
  }
  return At;
}
var Gh;
function hg() {
  return Gh || (Gh = 1, Object.defineProperty(yu, "__esModule", { value: !0 }), yu.ValuePointer = void 0, yu.ValuePointer = /* @__PURE__ */ EL()), yu;
}
var xd = {}, Hh;
function Jv() {
  if (Hh) return xd;
  Hh = 1, Object.defineProperty(xd, "__esModule", { value: !0 }), xd.Equal = a;
  const e = /* @__PURE__ */ bn();
  function n(s, c) {
    if (!(0, e.IsObject)(c))
      return !1;
    const u = [...Object.keys(s), ...Object.getOwnPropertySymbols(s)], f = [...Object.keys(c), ...Object.getOwnPropertySymbols(c)];
    return u.length !== f.length ? !1 : u.every((d) => a(s[d], c[d]));
  }
  function t(s, c) {
    return (0, e.IsDate)(c) && s.getTime() === c.getTime();
  }
  function r(s, c) {
    return !(0, e.IsArray)(c) || s.length !== c.length ? !1 : s.every((u, f) => a(u, c[f]));
  }
  function i(s, c) {
    return !(0, e.IsTypedArray)(c) || s.length !== c.length || Object.getPrototypeOf(s).constructor.name !== Object.getPrototypeOf(c).constructor.name ? !1 : s.every((u, f) => a(u, c[f]));
  }
  function o(s, c) {
    return s === c;
  }
  function a(s, c) {
    if ((0, e.IsDate)(s))
      return t(s, c);
    if ((0, e.IsTypedArray)(s))
      return i(s, c);
    if ((0, e.IsArray)(s))
      return r(s, c);
    if ((0, e.IsObject)(s))
      return n(s, c);
    if ((0, e.IsValueType)(s))
      return o(s, c);
    throw new Error("ValueEquals: Unable to compare value");
  }
  return xd;
}
var kh;
function $L() {
  return kh || (kh = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueDiffError = e.Edit = e.Delete = e.Update = e.Insert = void 0, e.Diff = _, e.Patch = P;
    const n = /* @__PURE__ */ bn(), t = /* @__PURE__ */ hg(), r = /* @__PURE__ */ $r(), i = /* @__PURE__ */ Jv(), o = /* @__PURE__ */ on(), a = /* @__PURE__ */ Wn(), s = /* @__PURE__ */ Pt(), c = /* @__PURE__ */ Ys(), u = /* @__PURE__ */ Qs(), f = /* @__PURE__ */ sn();
    e.Insert = (0, s.Object)({
      type: (0, a.Literal)("insert"),
      path: (0, c.String)(),
      value: (0, u.Unknown)()
    }), e.Update = (0, s.Object)({
      type: (0, a.Literal)("update"),
      path: (0, c.String)(),
      value: (0, u.Unknown)()
    }), e.Delete = (0, s.Object)({
      type: (0, a.Literal)("delete"),
      path: (0, c.String)()
    }), e.Edit = (0, f.Union)([e.Insert, e.Update, e.Delete]);
    class d extends o.TypeBoxError {
      constructor(y, $) {
        super($), this.value = y;
      }
    }
    e.ValueDiffError = d;
    function p(R, y) {
      return { type: "update", path: R, value: y };
    }
    function T(R, y) {
      return { type: "insert", path: R, value: y };
    }
    function b(R) {
      return { type: "delete", path: R };
    }
    function O(R) {
      if (globalThis.Object.getOwnPropertySymbols(R).length > 0)
        throw new d(R, "Cannot diff objects with symbols");
    }
    function* F(R, y, $) {
      if (O(y), O($), !(0, n.IsStandardObject)($))
        return yield p(R, $);
      const C = globalThis.Object.getOwnPropertyNames(y), V = globalThis.Object.getOwnPropertyNames($);
      for (const G of V)
        (0, n.HasPropertyKey)(y, G) || (yield T(`${R}/${G}`, $[G]));
      for (const G of C)
        (0, n.HasPropertyKey)($, G) && ((0, i.Equal)(y, $) || (yield* w(`${R}/${G}`, y[G], $[G])));
      for (const G of C)
        (0, n.HasPropertyKey)($, G) || (yield b(`${R}/${G}`));
    }
    function* E(R, y, $) {
      if (!(0, n.IsArray)($))
        return yield p(R, $);
      for (let C = 0; C < Math.min(y.length, $.length); C++)
        yield* w(`${R}/${C}`, y[C], $[C]);
      for (let C = 0; C < $.length; C++)
        C < y.length || (yield T(`${R}/${C}`, $[C]));
      for (let C = y.length - 1; C >= 0; C--)
        C < $.length || (yield b(`${R}/${C}`));
    }
    function* M(R, y, $) {
      if (!(0, n.IsTypedArray)($) || y.length !== $.length || globalThis.Object.getPrototypeOf(y).constructor.name !== globalThis.Object.getPrototypeOf($).constructor.name)
        return yield p(R, $);
      for (let C = 0; C < Math.min(y.length, $.length); C++)
        yield* w(`${R}/${C}`, y[C], $[C]);
    }
    function* N(R, y, $) {
      y !== $ && (yield p(R, $));
    }
    function* w(R, y, $) {
      if ((0, n.IsStandardObject)(y))
        return yield* F(R, y, $);
      if ((0, n.IsArray)(y))
        return yield* E(R, y, $);
      if ((0, n.IsTypedArray)(y))
        return yield* M(R, y, $);
      if ((0, n.IsValueType)(y))
        return yield* N(R, y, $);
      throw new d(y, "Unable to diff value");
    }
    function _(R, y) {
      return [...w("", R, y)];
    }
    function B(R) {
      return R.length > 0 && R[0].path === "" && R[0].type === "update";
    }
    function m(R) {
      return R.length === 0;
    }
    function P(R, y) {
      if (B(y))
        return (0, r.Clone)(y[0].value);
      if (m(y))
        return (0, r.Clone)(R);
      const $ = (0, r.Clone)(R);
      for (const C of y)
        switch (C.type) {
          case "insert": {
            t.ValuePointer.Set($, C.path, C.value);
            break;
          }
          case "update": {
            t.ValuePointer.Set($, C.path, C.value);
            break;
          }
          case "delete": {
            t.ValuePointer.Delete($, C.path);
            break;
          }
        }
      return $;
    }
  }(Fl)), Fl;
}
var Wh;
function Yv() {
  return Wh || (Wh = 1, function(e) {
    var n = Co && Co.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Co && Co.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ $L(), e);
  }(Co)), Co;
}
var Bo = {}, Fd = {}, zh;
function ML() {
  if (zh) return Fd;
  zh = 1, Object.defineProperty(Fd, "__esModule", { value: !0 }), Fd.Encode = r;
  const e = /* @__PURE__ */ Pc(), n = /* @__PURE__ */ Kt(), t = /* @__PURE__ */ vi();
  function r(...i) {
    const [o, a, s] = i.length === 3 ? [i[0], i[1], i[2]] : [i[0], [], i[1]], c = (0, e.HasTransform)(o, a) ? (0, e.TransformEncode)(o, a, s) : s;
    if (!(0, n.Check)(o, a, c))
      throw new e.TransformEncodeCheckError(o, c, (0, t.Errors)(o, a, c).First());
    return c;
  }
  return Fd;
}
var Jh;
function Xv() {
  return Jh || (Jh = 1, function(e) {
    var n = Bo && Bo.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Bo && Bo.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ ML(), e);
  }(Bo)), Bo;
}
var jo = {}, Yh;
function Qv() {
  return Yh || (Yh = 1, function(e) {
    var n = jo && jo.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = jo && jo.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ Jv(), e);
  }(jo)), jo;
}
var xo = {}, ss = {}, Xh;
function CL() {
  if (Xh) return ss;
  Xh = 1, Object.defineProperty(ss, "__esModule", { value: !0 }), ss.ValueMutateError = void 0, ss.Mutate = T;
  const e = /* @__PURE__ */ bn(), n = /* @__PURE__ */ hg(), t = /* @__PURE__ */ $r(), r = /* @__PURE__ */ on();
  function i(b) {
    return (0, e.IsObject)(b) && !(0, e.IsArray)(b);
  }
  class o extends r.TypeBoxError {
    constructor(O) {
      super(O);
    }
  }
  ss.ValueMutateError = o;
  function a(b, O, F, E) {
    if (!i(F))
      n.ValuePointer.Set(b, O, (0, t.Clone)(E));
    else {
      const M = Object.getOwnPropertyNames(F), N = Object.getOwnPropertyNames(E);
      for (const w of M)
        N.includes(w) || delete F[w];
      for (const w of N)
        M.includes(w) || (F[w] = null);
      for (const w of N)
        f(b, `${O}/${w}`, F[w], E[w]);
    }
  }
  function s(b, O, F, E) {
    if (!(0, e.IsArray)(F))
      n.ValuePointer.Set(b, O, (0, t.Clone)(E));
    else {
      for (let M = 0; M < E.length; M++)
        f(b, `${O}/${M}`, F[M], E[M]);
      F.splice(E.length);
    }
  }
  function c(b, O, F, E) {
    if ((0, e.IsTypedArray)(F) && F.length === E.length)
      for (let M = 0; M < F.length; M++)
        F[M] = E[M];
    else
      n.ValuePointer.Set(b, O, (0, t.Clone)(E));
  }
  function u(b, O, F, E) {
    F !== E && n.ValuePointer.Set(b, O, E);
  }
  function f(b, O, F, E) {
    if ((0, e.IsArray)(E))
      return s(b, O, F, E);
    if ((0, e.IsTypedArray)(E))
      return c(b, O, F, E);
    if (i(E))
      return a(b, O, F, E);
    if ((0, e.IsValueType)(E))
      return u(b, O, F, E);
  }
  function d(b) {
    return (0, e.IsTypedArray)(b) || (0, e.IsValueType)(b);
  }
  function p(b, O) {
    return i(b) && (0, e.IsArray)(O) || (0, e.IsArray)(b) && i(O);
  }
  function T(b, O) {
    if (d(b) || d(O))
      throw new o("Only object and array types can be mutated at the root level");
    if (p(b, O))
      throw new o("Cannot assign due type mismatch of assignable values");
    f(b, "", b, O);
  }
  return ss;
}
var Qh;
function Zv() {
  return Qh || (Qh = 1, function(e) {
    var n = xo && xo.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = xo && xo.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ CL(), e);
  }(xo)), xo;
}
var Fo = {}, Nl = {}, Zh;
function BL() {
  return Zh || (Zh = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ParseDefault = e.ParseRegistry = e.ParseError = void 0, e.Parse = p;
    const n = /* @__PURE__ */ on(), t = /* @__PURE__ */ Pc(), r = /* @__PURE__ */ mg(), i = /* @__PURE__ */ bg(), o = /* @__PURE__ */ _g(), a = /* @__PURE__ */ Tg(), s = /* @__PURE__ */ $r(), c = /* @__PURE__ */ bn();
    class u extends n.TypeBoxError {
      constructor(b) {
        super(b);
      }
    }
    e.ParseError = u;
    var f;
    (function(T) {
      const b = /* @__PURE__ */ new Map([
        ["Clone", (M, N, w) => (0, s.Clone)(w)],
        ["Clean", (M, N, w) => (0, a.Clean)(M, N, w)],
        ["Default", (M, N, w) => (0, i.Default)(M, N, w)],
        ["Convert", (M, N, w) => (0, o.Convert)(M, N, w)],
        ["Assert", (M, N, w) => ((0, r.Assert)(M, N, w), w)],
        ["Decode", (M, N, w) => (0, t.HasTransform)(M, N) ? (0, t.TransformDecode)(M, N, w) : w],
        ["Encode", (M, N, w) => (0, t.HasTransform)(M, N) ? (0, t.TransformEncode)(M, N, w) : w]
      ]);
      function O(M) {
        b.delete(M);
      }
      T.Delete = O;
      function F(M, N) {
        b.set(M, N);
      }
      T.Set = F;
      function E(M) {
        return b.get(M);
      }
      T.Get = E;
    })(f || (e.ParseRegistry = f = {})), e.ParseDefault = [
      "Clone",
      "Clean",
      "Default",
      "Convert",
      "Assert",
      "Decode"
    ];
    function d(T, b, O, F) {
      return T.reduce((E, M) => {
        const N = f.Get(M);
        if ((0, c.IsUndefined)(N))
          throw new u(`Unable to find Parse operation '${M}'`);
        return N(b, O, E);
      }, F);
    }
    function p(...T) {
      const [b, O, F, E] = T.length === 4 ? [T[0], T[1], T[2], T[3]] : T.length === 3 ? (0, c.IsArray)(T[0]) ? [T[0], T[1], [], T[2]] : [e.ParseDefault, T[0], T[1], T[2]] : T.length === 2 ? [e.ParseDefault, T[0], [], T[1]] : (() => {
        throw new u("Invalid Arguments");
      })();
      return d(b, O, F, E);
    }
  }(Nl)), Nl;
}
var eI;
function eS() {
  return eI || (eI = 1, function(e) {
    var n = Fo && Fo.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Fo && Fo.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ BL(), e);
  }(Fo)), Fo;
}
var mu = {}, Dl = {}, nI;
function jL() {
  return nI || (nI = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.Parse = e.Mutate = e.Hash = e.Equal = e.Encode = e.Edit = e.Patch = e.Diff = e.Default = e.Decode = e.Create = e.Convert = e.Clone = e.Clean = e.Check = e.Cast = e.Assert = e.ValueErrorIterator = e.Errors = void 0;
    var n = /* @__PURE__ */ vi();
    Object.defineProperty(e, "Errors", { enumerable: !0, get: function() {
      return n.Errors;
    } }), Object.defineProperty(e, "ValueErrorIterator", { enumerable: !0, get: function() {
      return n.ValueErrorIterator;
    } });
    var t = /* @__PURE__ */ mg();
    Object.defineProperty(e, "Assert", { enumerable: !0, get: function() {
      return t.Assert;
    } });
    var r = /* @__PURE__ */ Wv();
    Object.defineProperty(e, "Cast", { enumerable: !0, get: function() {
      return r.Cast;
    } });
    var i = /* @__PURE__ */ Kt();
    Object.defineProperty(e, "Check", { enumerable: !0, get: function() {
      return i.Check;
    } });
    var o = /* @__PURE__ */ Tg();
    Object.defineProperty(e, "Clean", { enumerable: !0, get: function() {
      return o.Clean;
    } });
    var a = /* @__PURE__ */ $r();
    Object.defineProperty(e, "Clone", { enumerable: !0, get: function() {
      return a.Clone;
    } });
    var s = /* @__PURE__ */ _g();
    Object.defineProperty(e, "Convert", { enumerable: !0, get: function() {
      return s.Convert;
    } });
    var c = /* @__PURE__ */ gg();
    Object.defineProperty(e, "Create", { enumerable: !0, get: function() {
      return c.Create;
    } });
    var u = /* @__PURE__ */ zv();
    Object.defineProperty(e, "Decode", { enumerable: !0, get: function() {
      return u.Decode;
    } });
    var f = /* @__PURE__ */ bg();
    Object.defineProperty(e, "Default", { enumerable: !0, get: function() {
      return f.Default;
    } });
    var d = /* @__PURE__ */ Yv();
    Object.defineProperty(e, "Diff", { enumerable: !0, get: function() {
      return d.Diff;
    } }), Object.defineProperty(e, "Patch", { enumerable: !0, get: function() {
      return d.Patch;
    } }), Object.defineProperty(e, "Edit", { enumerable: !0, get: function() {
      return d.Edit;
    } });
    var p = /* @__PURE__ */ Xv();
    Object.defineProperty(e, "Encode", { enumerable: !0, get: function() {
      return p.Encode;
    } });
    var T = /* @__PURE__ */ Qv();
    Object.defineProperty(e, "Equal", { enumerable: !0, get: function() {
      return T.Equal;
    } });
    var b = /* @__PURE__ */ Ic();
    Object.defineProperty(e, "Hash", { enumerable: !0, get: function() {
      return b.Hash;
    } });
    var O = /* @__PURE__ */ Zv();
    Object.defineProperty(e, "Mutate", { enumerable: !0, get: function() {
      return O.Mutate;
    } });
    var F = /* @__PURE__ */ eS();
    Object.defineProperty(e, "Parse", { enumerable: !0, get: function() {
      return F.Parse;
    } });
  }(Dl)), Dl;
}
var tI;
function xL() {
  return tI || (tI = 1, Object.defineProperty(mu, "__esModule", { value: !0 }), mu.Value = void 0, mu.Value = /* @__PURE__ */ jL()), mu;
}
var rI;
function Ac() {
  return rI || (rI = 1, function(e) {
    var n = Ei && Ei.__createBinding || (Object.create ? function(o, a, s, c) {
      c === void 0 && (c = s);
      var u = Object.getOwnPropertyDescriptor(a, s);
      (!u || ("get" in u ? !a.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return a[s];
      } }), Object.defineProperty(o, c, u);
    } : function(o, a, s, c) {
      c === void 0 && (c = s), o[c] = a[s];
    }), t = Ei && Ei.__exportStar || function(o, a) {
      for (var s in o) s !== "default" && !Object.prototype.hasOwnProperty.call(a, s) && n(a, o, s);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.Value = e.ValueErrorIterator = e.ValueErrorType = void 0;
    var r = /* @__PURE__ */ vi();
    Object.defineProperty(e, "ValueErrorType", { enumerable: !0, get: function() {
      return r.ValueErrorType;
    } }), Object.defineProperty(e, "ValueErrorIterator", { enumerable: !0, get: function() {
      return r.ValueErrorIterator;
    } }), t(/* @__PURE__ */ bn(), e), t(/* @__PURE__ */ mg(), e), t(/* @__PURE__ */ Wv(), e), t(/* @__PURE__ */ Kt(), e), t(/* @__PURE__ */ Tg(), e), t(/* @__PURE__ */ $r(), e), t(/* @__PURE__ */ _g(), e), t(/* @__PURE__ */ gg(), e), t(/* @__PURE__ */ zv(), e), t(/* @__PURE__ */ bg(), e), t(/* @__PURE__ */ Yv(), e), t(/* @__PURE__ */ Xv(), e), t(/* @__PURE__ */ Qv(), e), t(/* @__PURE__ */ Ic(), e), t(/* @__PURE__ */ Zv(), e), t(/* @__PURE__ */ eS(), e), t(/* @__PURE__ */ hg(), e), t(/* @__PURE__ */ Pc(), e);
    var i = /* @__PURE__ */ xL();
    Object.defineProperty(e, "Value", { enumerable: !0, get: function() {
      return i.Value;
    } });
  }(Ei)), Ei;
}
var Ul = {}, No = {}, Do = {}, gu = {}, iI;
function nS() {
  if (iI) return gu;
  iI = 1, Object.defineProperty(gu, "__esModule", { value: !0 }), gu.CloneRest = n, gu.CloneType = t;
  const e = /* @__PURE__ */ Ot();
  function n(r) {
    return r.map((i) => t(i));
  }
  function t(r, i) {
    return i === void 0 ? (0, e.Clone)(r) : (0, e.Clone)({ ...i, ...r });
  }
  return gu;
}
var oI;
function FL() {
  return oI || (oI = 1, function(e) {
    var n = Do && Do.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Do && Do.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ nS(), e), t(/* @__PURE__ */ Ot(), e);
  }(Do)), Do;
}
var Uo = {}, Nd = {}, aI;
function NL() {
  if (aI) return Nd;
  aI = 1, Object.defineProperty(Nd, "__esModule", { value: !0 }), Nd.Increment = e;
  function e(n) {
    return (parseInt(n) + 1).toString();
  }
  return Nd;
}
var sI;
function DL() {
  return sI || (sI = 1, function(e) {
    var n = Uo && Uo.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Uo && Uo.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ NL(), e);
  }(Uo)), Uo;
}
var Lo = {}, Dd = {}, uI;
function UL() {
  if (uI) return Dd;
  uI = 1, Object.defineProperty(Dd, "__esModule", { value: !0 }), Dd.Awaited = p;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ Pi(), t = /* @__PURE__ */ qt(), r = /* @__PURE__ */ sn(), i = /* @__PURE__ */ ti(), o = /* @__PURE__ */ De();
  function a(T, b) {
    return (0, n.Computed)("Awaited", [(0, n.Computed)(T, b)]);
  }
  function s(T) {
    return (0, n.Computed)("Awaited", [(0, i.Ref)(T)]);
  }
  function c(T) {
    return (0, t.Intersect)(d(T));
  }
  function u(T) {
    return (0, r.Union)(d(T));
  }
  function f(T) {
    return p(T);
  }
  function d(T) {
    return T.map((b) => p(b));
  }
  function p(T, b) {
    return (0, e.CreateType)((0, o.IsComputed)(T) ? a(T.target, T.parameters) : (0, o.IsIntersect)(T) ? c(T.allOf) : (0, o.IsUnion)(T) ? u(T.anyOf) : (0, o.IsPromise)(T) ? f(T.item) : (0, o.IsRef)(T) ? s(T.$ref) : T, b);
  }
  return Dd;
}
var cI;
function nl() {
  return cI || (cI = 1, function(e) {
    var n = Lo && Lo.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Lo && Lo.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ UL(), e);
  }(Lo)), Lo;
}
var Vo = {}, Ud = {}, dI;
function LL() {
  if (dI) return Ud;
  dI = 1, Object.defineProperty(Ud, "__esModule", { value: !0 }), Ud.Composite = f;
  const e = /* @__PURE__ */ qt(), n = /* @__PURE__ */ Er(), t = /* @__PURE__ */ fr(), r = /* @__PURE__ */ Pt(), i = /* @__PURE__ */ el(), o = /* @__PURE__ */ De();
  function a(d) {
    const p = [];
    for (const T of d)
      p.push(...(0, t.KeyOfPropertyKeys)(T));
    return (0, i.SetDistinct)(p);
  }
  function s(d) {
    return d.filter((p) => !(0, o.IsNever)(p));
  }
  function c(d, p) {
    const T = [];
    for (const b of d)
      T.push(...(0, n.IndexFromPropertyKeys)(b, [p]));
    return s(T);
  }
  function u(d, p) {
    const T = {};
    for (const b of p)
      T[b] = (0, e.IntersectEvaluated)(c(d, b));
    return T;
  }
  function f(d, p) {
    const T = a(d), b = u(d, T);
    return (0, r.Object)(b, p);
  }
  return Ud;
}
var fI;
function Ig() {
  return fI || (fI = 1, function(e) {
    var n = Vo && Vo.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Vo && Vo.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ LL(), e);
  }(Vo)), Vo;
}
var qo = {}, Ld = {}, Ko = {}, Vd = {}, pI;
function VL() {
  if (pI) return Vd;
  pI = 1, Object.defineProperty(Vd, "__esModule", { value: !0 }), Vd.Date = t;
  const e = /* @__PURE__ */ le(), n = /* @__PURE__ */ he();
  function t(r) {
    return (0, n.CreateType)({ [e.Kind]: "Date", type: "Date" }, r);
  }
  return Vd;
}
var lI;
function tl() {
  return lI || (lI = 1, function(e) {
    var n = Ko && Ko.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Ko && Ko.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ VL(), e);
  }(Ko)), Ko;
}
var Go = {}, qd = {}, yI;
function qL() {
  if (yI) return qd;
  yI = 1, Object.defineProperty(qd, "__esModule", { value: !0 }), qd.Null = t;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ le();
  function t(r) {
    return (0, e.CreateType)({ [n.Kind]: "Null", type: "null" }, r);
  }
  return qd;
}
var mI;
function rl() {
  return mI || (mI = 1, function(e) {
    var n = Go && Go.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Go && Go.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ qL(), e);
  }(Go)), Go;
}
var Ho = {}, Kd = {}, gI;
function KL() {
  if (gI) return Kd;
  gI = 1, Object.defineProperty(Kd, "__esModule", { value: !0 }), Kd.Symbol = t;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ le();
  function t(r) {
    return (0, e.CreateType)({ [n.Kind]: "Symbol", type: "symbol" }, r);
  }
  return Kd;
}
var TI;
function il() {
  return TI || (TI = 1, function(e) {
    var n = Ho && Ho.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Ho && Ho.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ KL(), e);
  }(Ho)), Ho;
}
var ko = {}, Gd = {}, _I;
function GL() {
  if (_I) return Gd;
  _I = 1, Object.defineProperty(Gd, "__esModule", { value: !0 }), Gd.Undefined = t;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ le();
  function t(r) {
    return (0, e.CreateType)({ [n.Kind]: "Undefined", type: "undefined" }, r);
  }
  return Gd;
}
var bI;
function ol() {
  return bI || (bI = 1, function(e) {
    var n = ko && ko.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = ko && ko.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ GL(), e);
  }(ko)), ko;
}
var Wo = {}, Hd = {}, hI;
function HL() {
  if (hI) return Hd;
  hI = 1, Object.defineProperty(Hd, "__esModule", { value: !0 }), Hd.Uint8Array = t;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ le();
  function t(r) {
    return (0, e.CreateType)({ [n.Kind]: "Uint8Array", type: "Uint8Array" }, r);
  }
  return Hd;
}
var II;
function al() {
  return II || (II = 1, function(e) {
    var n = Wo && Wo.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Wo && Wo.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ HL(), e);
  }(Wo)), Wo;
}
var OI;
function kL() {
  if (OI) return Ld;
  OI = 1, Object.defineProperty(Ld, "__esModule", { value: !0 }), Ld.Const = N;
  const e = /* @__PURE__ */ Oc(), n = /* @__PURE__ */ _c(), t = /* @__PURE__ */ tl(), r = /* @__PURE__ */ Za(), i = /* @__PURE__ */ Wn(), o = /* @__PURE__ */ rl(), a = /* @__PURE__ */ Pt(), s = /* @__PURE__ */ il(), c = /* @__PURE__ */ wi(), u = /* @__PURE__ */ Xs(), f = /* @__PURE__ */ ol(), d = /* @__PURE__ */ al(), p = /* @__PURE__ */ Qs(), T = /* @__PURE__ */ Oi(), b = /* @__PURE__ */ It();
  function O(w) {
    return w.map((_) => M(_, !1));
  }
  function F(w) {
    const _ = {};
    for (const B of globalThis.Object.getOwnPropertyNames(w))
      _[B] = (0, u.Readonly)(M(w[B], !1));
    return _;
  }
  function E(w, _) {
    return _ === !0 ? w : (0, u.Readonly)(w);
  }
  function M(w, _) {
    return (0, b.IsAsyncIterator)(w) || (0, b.IsIterator)(w) ? E((0, e.Any)(), _) : (0, b.IsArray)(w) ? (0, u.Readonly)((0, c.Tuple)(O(w))) : (0, b.IsUint8Array)(w) ? (0, d.Uint8Array)() : (0, b.IsDate)(w) ? (0, t.Date)() : (0, b.IsObject)(w) ? E((0, a.Object)(F(w)), _) : (0, b.IsFunction)(w) ? E((0, r.Function)([], (0, p.Unknown)()), _) : (0, b.IsUndefined)(w) ? (0, f.Undefined)() : (0, b.IsNull)(w) ? (0, o.Null)() : (0, b.IsSymbol)(w) ? (0, s.Symbol)() : (0, b.IsBigInt)(w) ? (0, n.BigInt)() : (0, b.IsNumber)(w) || (0, b.IsBoolean)(w) || (0, b.IsString)(w) ? (0, i.Literal)(w) : (0, a.Object)({});
  }
  function N(w, _) {
    return (0, T.CreateType)(M(w, !0), _);
  }
  return Ld;
}
var PI;
function Og() {
  return PI || (PI = 1, function(e) {
    var n = qo && qo.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = qo && qo.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ kL(), e);
  }(qo)), qo;
}
var zo = {}, kd = {}, AI;
function WL() {
  if (AI) return kd;
  AI = 1, Object.defineProperty(kd, "__esModule", { value: !0 }), kd.ConstructorParameters = n;
  const e = /* @__PURE__ */ wi();
  function n(t, r) {
    return (0, e.Tuple)(t.parameters, r);
  }
  return kd;
}
var wI;
function Pg() {
  return wI || (wI = 1, function(e) {
    var n = zo && zo.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = zo && zo.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ WL(), e);
  }(zo)), zo;
}
var Jo = {}, Wd = {}, vI;
function zL() {
  if (vI) return Wd;
  vI = 1, Object.defineProperty(Wd, "__esModule", { value: !0 }), Wd.Enum = i;
  const e = /* @__PURE__ */ Wn(), n = /* @__PURE__ */ le(), t = /* @__PURE__ */ sn(), r = /* @__PURE__ */ It();
  function i(o, a) {
    if ((0, r.IsUndefined)(o))
      throw new Error("Enum undefined or empty");
    const s = globalThis.Object.getOwnPropertyNames(o).filter((f) => isNaN(f)).map((f) => o[f]), u = [...new Set(s)].map((f) => (0, e.Literal)(f));
    return (0, t.Union)(u, { ...a, [n.Hint]: "Enum" });
  }
  return Wd;
}
var SI;
function Ag() {
  return SI || (SI = 1, function(e) {
    var n = Jo && Jo.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Jo && Jo.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ zL(), e);
  }(Jo)), Jo;
}
var Yo = {}, zd = {}, Jd = {}, Yd = {}, RI;
function tS() {
  if (RI) return Yd;
  RI = 1, Object.defineProperty(Yd, "__esModule", { value: !0 }), Yd.ExcludeFromTemplateLiteral = t;
  const e = /* @__PURE__ */ wg(), n = /* @__PURE__ */ Rr();
  function t(r, i) {
    return (0, e.Exclude)((0, n.TemplateLiteralToUnion)(r), i);
  }
  return Yd;
}
var EI;
function wg() {
  if (EI) return Jd;
  EI = 1, Object.defineProperty(Jd, "__esModule", { value: !0 }), Jd.Exclude = c;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ sn(), t = /* @__PURE__ */ Vn(), r = /* @__PURE__ */ Zs(), i = /* @__PURE__ */ rS(), o = /* @__PURE__ */ tS(), a = /* @__PURE__ */ De();
  function s(u, f) {
    const d = u.filter((p) => (0, r.ExtendsCheck)(p, f) === r.ExtendsResult.False);
    return d.length === 1 ? d[0] : (0, n.Union)(d);
  }
  function c(u, f, d = {}) {
    return (0, a.IsTemplateLiteral)(u) ? (0, e.CreateType)((0, o.ExcludeFromTemplateLiteral)(u, f), d) : (0, a.IsMappedResult)(u) ? (0, e.CreateType)((0, i.ExcludeFromMappedResult)(u, f), d) : (0, e.CreateType)((0, a.IsUnion)(u) ? s(u.anyOf, f) : (0, r.ExtendsCheck)(u, f) !== r.ExtendsResult.False ? (0, t.Never)() : u, d);
  }
  return Jd;
}
var $I;
function rS() {
  if ($I) return zd;
  $I = 1, Object.defineProperty(zd, "__esModule", { value: !0 }), zd.ExcludeFromMappedResult = i;
  const e = /* @__PURE__ */ hn(), n = /* @__PURE__ */ wg();
  function t(o, a) {
    const s = {};
    for (const c of globalThis.Object.getOwnPropertyNames(o))
      s[c] = (0, n.Exclude)(o[c], a);
    return s;
  }
  function r(o, a) {
    return t(o.properties, a);
  }
  function i(o, a) {
    const s = r(o, a);
    return (0, e.MappedResult)(s);
  }
  return zd;
}
var MI;
function vg() {
  return MI || (MI = 1, function(e) {
    var n = Yo && Yo.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Yo && Yo.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ rS(), e), t(/* @__PURE__ */ tS(), e), t(/* @__PURE__ */ wg(), e);
  }(Yo)), Yo;
}
var Xo = {}, Xd = {}, Qd = {}, Zd = {}, CI;
function iS() {
  if (CI) return Zd;
  CI = 1, Object.defineProperty(Zd, "__esModule", { value: !0 }), Zd.ExtractFromTemplateLiteral = t;
  const e = /* @__PURE__ */ Sg(), n = /* @__PURE__ */ Rr();
  function t(r, i) {
    return (0, e.Extract)((0, n.TemplateLiteralToUnion)(r), i);
  }
  return Zd;
}
var BI;
function Sg() {
  if (BI) return Qd;
  BI = 1, Object.defineProperty(Qd, "__esModule", { value: !0 }), Qd.Extract = c;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ sn(), t = /* @__PURE__ */ Vn(), r = /* @__PURE__ */ Zs(), i = /* @__PURE__ */ oS(), o = /* @__PURE__ */ iS(), a = /* @__PURE__ */ De();
  function s(u, f) {
    const d = u.filter((p) => (0, r.ExtendsCheck)(p, f) !== r.ExtendsResult.False);
    return d.length === 1 ? d[0] : (0, n.Union)(d);
  }
  function c(u, f, d) {
    return (0, a.IsTemplateLiteral)(u) ? (0, e.CreateType)((0, o.ExtractFromTemplateLiteral)(u, f), d) : (0, a.IsMappedResult)(u) ? (0, e.CreateType)((0, i.ExtractFromMappedResult)(u, f), d) : (0, e.CreateType)((0, a.IsUnion)(u) ? s(u.anyOf, f) : (0, r.ExtendsCheck)(u, f) !== r.ExtendsResult.False ? u : (0, t.Never)(), d);
  }
  return Qd;
}
var jI;
function oS() {
  if (jI) return Xd;
  jI = 1, Object.defineProperty(Xd, "__esModule", { value: !0 }), Xd.ExtractFromMappedResult = i;
  const e = /* @__PURE__ */ hn(), n = /* @__PURE__ */ Sg();
  function t(o, a) {
    const s = {};
    for (const c of globalThis.Object.getOwnPropertyNames(o))
      s[c] = (0, n.Extract)(o[c], a);
    return s;
  }
  function r(o, a) {
    return t(o.properties, a);
  }
  function i(o, a) {
    const s = r(o, a);
    return (0, e.MappedResult)(s);
  }
  return Xd;
}
var xI;
function Rg() {
  return xI || (xI = 1, function(e) {
    var n = Xo && Xo.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Xo && Xo.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ oS(), e), t(/* @__PURE__ */ iS(), e), t(/* @__PURE__ */ Sg(), e);
  }(Xo)), Xo;
}
var Qo = {}, ef = {}, FI;
function JL() {
  if (FI) return ef;
  FI = 1, Object.defineProperty(ef, "__esModule", { value: !0 }), ef.InstanceType = n;
  const e = /* @__PURE__ */ he();
  function n(t, r) {
    return (0, e.CreateType)(t.returns, r);
  }
  return ef;
}
var NI;
function Eg() {
  return NI || (NI = 1, function(e) {
    var n = Qo && Qo.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Qo && Qo.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ JL(), e);
  }(Qo)), Qo;
}
var Zo = {}, nf = {}, DI;
function YL() {
  if (DI) return nf;
  DI = 1, Object.defineProperty(nf, "__esModule", { value: !0 }), nf.Integer = t;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ le();
  function t(r) {
    return (0, e.CreateType)({ [n.Kind]: "Integer", type: "integer" }, r);
  }
  return nf;
}
var UI;
function $g() {
  return UI || (UI = 1, function(e) {
    var n = Zo && Zo.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Zo && Zo.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ YL(), e);
  }(Zo)), Zo;
}
var ea = {}, tf = {}, rf = {}, of = {}, LI;
function aS() {
  if (LI) return of;
  LI = 1, Object.defineProperty(of, "__esModule", { value: !0 }), of.IntrinsicFromMappedKey = s;
  const e = /* @__PURE__ */ hn(), n = /* @__PURE__ */ eu(), t = /* @__PURE__ */ Wn(), r = /* @__PURE__ */ Ot();
  function i(c, u, f) {
    return {
      [c]: (0, n.Intrinsic)((0, t.Literal)(c), u, (0, r.Clone)(f))
    };
  }
  function o(c, u, f) {
    return c.reduce((p, T) => ({ ...p, ...i(T, u, f) }), {});
  }
  function a(c, u, f) {
    return o(c.keys, u, f);
  }
  function s(c, u, f) {
    const d = a(c, u, f);
    return (0, e.MappedResult)(d);
  }
  return of;
}
var VI;
function eu() {
  if (VI) return rf;
  VI = 1, Object.defineProperty(rf, "__esModule", { value: !0 }), rf.Intrinsic = T;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ Rr(), t = /* @__PURE__ */ aS(), r = /* @__PURE__ */ Wn(), i = /* @__PURE__ */ sn(), o = /* @__PURE__ */ De();
  function a(b) {
    const [O, F] = [b.slice(0, 1), b.slice(1)];
    return [O.toLowerCase(), F].join("");
  }
  function s(b) {
    const [O, F] = [b.slice(0, 1), b.slice(1)];
    return [O.toUpperCase(), F].join("");
  }
  function c(b) {
    return b.toUpperCase();
  }
  function u(b) {
    return b.toLowerCase();
  }
  function f(b, O, F) {
    const E = (0, n.TemplateLiteralParseExact)(b.pattern);
    if (!(0, n.IsTemplateLiteralExpressionFinite)(E))
      return { ...b, pattern: d(b.pattern, O) };
    const w = [...(0, n.TemplateLiteralExpressionGenerate)(E)].map((m) => (0, r.Literal)(m)), _ = p(w, O), B = (0, i.Union)(_);
    return (0, n.TemplateLiteral)([B], F);
  }
  function d(b, O) {
    return typeof b == "string" ? O === "Uncapitalize" ? a(b) : O === "Capitalize" ? s(b) : O === "Uppercase" ? c(b) : O === "Lowercase" ? u(b) : b : b.toString();
  }
  function p(b, O) {
    return b.map((F) => T(F, O));
  }
  function T(b, O, F = {}) {
    return (
      // Intrinsic-Mapped-Inference
      (0, o.IsMappedKey)(b) ? (0, t.IntrinsicFromMappedKey)(b, O, F) : (
        // Standard-Inference
        (0, o.IsTemplateLiteral)(b) ? f(b, O, F) : (0, o.IsUnion)(b) ? (0, i.Union)(p(b.anyOf, O), F) : (0, o.IsLiteral)(b) ? (0, r.Literal)(d(b.const, O), F) : (
          // Default Type
          (0, e.CreateType)(b, F)
        )
      )
    );
  }
  return rf;
}
var qI;
function XL() {
  if (qI) return tf;
  qI = 1, Object.defineProperty(tf, "__esModule", { value: !0 }), tf.Capitalize = n;
  const e = /* @__PURE__ */ eu();
  function n(t, r = {}) {
    return (0, e.Intrinsic)(t, "Capitalize", r);
  }
  return tf;
}
var af = {}, KI;
function QL() {
  if (KI) return af;
  KI = 1, Object.defineProperty(af, "__esModule", { value: !0 }), af.Lowercase = n;
  const e = /* @__PURE__ */ eu();
  function n(t, r = {}) {
    return (0, e.Intrinsic)(t, "Lowercase", r);
  }
  return af;
}
var sf = {}, GI;
function ZL() {
  if (GI) return sf;
  GI = 1, Object.defineProperty(sf, "__esModule", { value: !0 }), sf.Uncapitalize = n;
  const e = /* @__PURE__ */ eu();
  function n(t, r = {}) {
    return (0, e.Intrinsic)(t, "Uncapitalize", r);
  }
  return sf;
}
var uf = {}, HI;
function eV() {
  if (HI) return uf;
  HI = 1, Object.defineProperty(uf, "__esModule", { value: !0 }), uf.Uppercase = n;
  const e = /* @__PURE__ */ eu();
  function n(t, r = {}) {
    return (0, e.Intrinsic)(t, "Uppercase", r);
  }
  return uf;
}
var kI;
function Mg() {
  return kI || (kI = 1, function(e) {
    var n = ea && ea.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = ea && ea.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ XL(), e), t(/* @__PURE__ */ aS(), e), t(/* @__PURE__ */ eu(), e), t(/* @__PURE__ */ QL(), e), t(/* @__PURE__ */ ZL(), e), t(/* @__PURE__ */ eV(), e);
  }(ea)), ea;
}
var na = {}, us = {}, cs = {}, ta = {}, cf = {}, df = {}, ff = {}, WI;
function sS() {
  if (WI) return ff;
  WI = 1, Object.defineProperty(ff, "__esModule", { value: !0 }), ff.OmitFromMappedResult = o;
  const e = /* @__PURE__ */ hn(), n = /* @__PURE__ */ Cg(), t = /* @__PURE__ */ Ot();
  function r(a, s, c) {
    const u = {};
    for (const f of globalThis.Object.getOwnPropertyNames(a))
      u[f] = (0, n.Omit)(a[f], s, (0, t.Clone)(c));
    return u;
  }
  function i(a, s, c) {
    return r(a.properties, s, c);
  }
  function o(a, s, c) {
    const u = i(a, s, c);
    return (0, e.MappedResult)(u);
  }
  return ff;
}
var zI;
function Cg() {
  if (zI) return df;
  zI = 1, Object.defineProperty(df, "__esModule", { value: !0 }), df.Omit = w;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ ug(), t = /* @__PURE__ */ Yp(), r = /* @__PURE__ */ Pi(), i = /* @__PURE__ */ Wn(), o = /* @__PURE__ */ Er(), a = /* @__PURE__ */ qt(), s = /* @__PURE__ */ sn(), c = /* @__PURE__ */ Pt(), u = /* @__PURE__ */ uS(), f = /* @__PURE__ */ sS(), d = /* @__PURE__ */ De(), p = /* @__PURE__ */ It();
  function T(_, B) {
    return _.map((m) => N(m, B));
  }
  function b(_, B) {
    return _.map((m) => N(m, B));
  }
  function O(_, B) {
    const { [B]: m, ...P } = _;
    return P;
  }
  function F(_, B) {
    return B.reduce((m, P) => O(m, P), _);
  }
  function E(_, B) {
    const m = (0, n.Discard)(_, [t.TransformKind, "$id", "required", "properties"]), P = F(_.properties, B);
    return (0, c.Object)(P, m);
  }
  function M(_) {
    const B = _.reduce((m, P) => (0, d.IsLiteralValue)(P) ? [...m, (0, i.Literal)(P)] : m, []);
    return (0, s.Union)(B);
  }
  function N(_, B) {
    return (0, d.IsIntersect)(_) ? (0, a.Intersect)(T(_.allOf, B)) : (0, d.IsUnion)(_) ? (0, s.Union)(b(_.anyOf, B)) : (0, d.IsObject)(_) ? E(_, B) : (0, c.Object)({});
  }
  function w(_, B, m) {
    const P = (0, p.IsArray)(B) ? M(B) : B, R = (0, d.IsSchema)(B) ? (0, o.IndexPropertyKeys)(B) : B, y = (0, d.IsRef)(_), $ = (0, d.IsRef)(B);
    return (0, d.IsMappedResult)(_) ? (0, f.OmitFromMappedResult)(_, R, m) : (0, d.IsMappedKey)(B) ? (0, u.OmitFromMappedKey)(_, B, m) : y && $ ? (0, r.Computed)("Omit", [_, P], m) : !y && $ ? (0, r.Computed)("Omit", [_, P], m) : y && !$ ? (0, r.Computed)("Omit", [_, P], m) : (0, e.CreateType)({ ...N(_, R), ...m });
  }
  return df;
}
var JI;
function uS() {
  if (JI) return cf;
  JI = 1, Object.defineProperty(cf, "__esModule", { value: !0 }), cf.OmitFromMappedKey = a;
  const e = /* @__PURE__ */ hn(), n = /* @__PURE__ */ Cg(), t = /* @__PURE__ */ Ot();
  function r(s, c, u) {
    return { [c]: (0, n.Omit)(s, [c], (0, t.Clone)(u)) };
  }
  function i(s, c, u) {
    return c.reduce((f, d) => ({ ...f, ...r(s, d, u) }), {});
  }
  function o(s, c, u) {
    return i(s, c.keys, u);
  }
  function a(s, c, u) {
    const f = o(s, c, u);
    return (0, e.MappedResult)(f);
  }
  return cf;
}
var YI;
function sl() {
  return YI || (YI = 1, function(e) {
    var n = ta && ta.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = ta && ta.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ uS(), e), t(/* @__PURE__ */ sS(), e), t(/* @__PURE__ */ Cg(), e);
  }(ta)), ta;
}
var ra = {}, pf = {}, lf = {}, yf = {}, XI;
function cS() {
  if (XI) return yf;
  XI = 1, Object.defineProperty(yf, "__esModule", { value: !0 }), yf.PickFromMappedResult = o;
  const e = /* @__PURE__ */ hn(), n = /* @__PURE__ */ Bg(), t = /* @__PURE__ */ Ot();
  function r(a, s, c) {
    const u = {};
    for (const f of globalThis.Object.getOwnPropertyNames(a))
      u[f] = (0, n.Pick)(a[f], s, (0, t.Clone)(c));
    return u;
  }
  function i(a, s, c) {
    return r(a.properties, s, c);
  }
  function o(a, s, c) {
    const u = i(a, s, c);
    return (0, e.MappedResult)(u);
  }
  return yf;
}
var QI;
function Bg() {
  if (QI) return lf;
  QI = 1, Object.defineProperty(lf, "__esModule", { value: !0 }), lf.Pick = N;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ ug(), t = /* @__PURE__ */ Pi(), r = /* @__PURE__ */ qt(), i = /* @__PURE__ */ Wn(), o = /* @__PURE__ */ Pt(), a = /* @__PURE__ */ sn(), s = /* @__PURE__ */ Er(), c = /* @__PURE__ */ Yp(), u = /* @__PURE__ */ De(), f = /* @__PURE__ */ It(), d = /* @__PURE__ */ dS(), p = /* @__PURE__ */ cS();
  function T(w, _) {
    return w.map((B) => M(B, _));
  }
  function b(w, _) {
    return w.map((B) => M(B, _));
  }
  function O(w, _) {
    const B = {};
    for (const m of _)
      m in w && (B[m] = w[m]);
    return B;
  }
  function F(w, _) {
    const B = (0, n.Discard)(w, [c.TransformKind, "$id", "required", "properties"]), m = O(w.properties, _);
    return (0, o.Object)(m, B);
  }
  function E(w) {
    const _ = w.reduce((B, m) => (0, u.IsLiteralValue)(m) ? [...B, (0, i.Literal)(m)] : B, []);
    return (0, a.Union)(_);
  }
  function M(w, _) {
    return (0, u.IsIntersect)(w) ? (0, r.Intersect)(T(w.allOf, _)) : (0, u.IsUnion)(w) ? (0, a.Union)(b(w.anyOf, _)) : (0, u.IsObject)(w) ? F(w, _) : (0, o.Object)({});
  }
  function N(w, _, B) {
    const m = (0, f.IsArray)(_) ? E(_) : _, P = (0, u.IsSchema)(_) ? (0, s.IndexPropertyKeys)(_) : _, R = (0, u.IsRef)(w), y = (0, u.IsRef)(_);
    return (0, u.IsMappedResult)(w) ? (0, p.PickFromMappedResult)(w, P, B) : (0, u.IsMappedKey)(_) ? (0, d.PickFromMappedKey)(w, _, B) : R && y ? (0, t.Computed)("Pick", [w, m], B) : !R && y ? (0, t.Computed)("Pick", [w, m], B) : R && !y ? (0, t.Computed)("Pick", [w, m], B) : (0, e.CreateType)({ ...M(w, P), ...B });
  }
  return lf;
}
var ZI;
function dS() {
  if (ZI) return pf;
  ZI = 1, Object.defineProperty(pf, "__esModule", { value: !0 }), pf.PickFromMappedKey = a;
  const e = /* @__PURE__ */ hn(), n = /* @__PURE__ */ Bg(), t = /* @__PURE__ */ Ot();
  function r(s, c, u) {
    return {
      [c]: (0, n.Pick)(s, [c], (0, t.Clone)(u))
    };
  }
  function i(s, c, u) {
    return c.reduce((f, d) => ({ ...f, ...r(s, d, u) }), {});
  }
  function o(s, c, u) {
    return i(s, c.keys, u);
  }
  function a(s, c, u) {
    const f = o(s, c, u);
    return (0, e.MappedResult)(f);
  }
  return pf;
}
var eO;
function ul() {
  return eO || (eO = 1, function(e) {
    var n = ra && ra.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = ra && ra.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ dS(), e), t(/* @__PURE__ */ cS(), e), t(/* @__PURE__ */ Bg(), e);
  }(ra)), ra;
}
var ia = {}, mf = {}, gf = {}, nO;
function fS() {
  if (nO) return gf;
  nO = 1, Object.defineProperty(gf, "__esModule", { value: !0 }), gf.Partial = E;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ Pi(), t = /* @__PURE__ */ Ai(), r = /* @__PURE__ */ Pt(), i = /* @__PURE__ */ qt(), o = /* @__PURE__ */ sn(), a = /* @__PURE__ */ ti(), s = /* @__PURE__ */ Ii(), c = /* @__PURE__ */ le(), u = /* @__PURE__ */ pS(), f = /* @__PURE__ */ De();
  function d(M, N) {
    return (0, n.Computed)("Partial", [(0, n.Computed)(M, N)]);
  }
  function p(M) {
    return (0, n.Computed)("Partial", [(0, a.Ref)(M)]);
  }
  function T(M) {
    const N = {};
    for (const w of globalThis.Object.getOwnPropertyNames(M))
      N[w] = (0, t.Optional)(M[w]);
    return N;
  }
  function b(M) {
    const N = (0, s.Discard)(M, [c.TransformKind, "$id", "required", "properties"]), w = T(M.properties);
    return (0, r.Object)(w, N);
  }
  function O(M) {
    return M.map((N) => F(N));
  }
  function F(M) {
    return (0, f.IsComputed)(M) ? d(M.target, M.parameters) : (0, f.IsRef)(M) ? p(M.$ref) : (0, f.IsIntersect)(M) ? (0, i.Intersect)(O(M.allOf)) : (0, f.IsUnion)(M) ? (0, o.Union)(O(M.anyOf)) : (0, f.IsObject)(M) ? b(M) : (0, r.Object)({});
  }
  function E(M, N) {
    return (0, f.IsMappedResult)(M) ? (0, u.PartialFromMappedResult)(M, N) : (0, e.CreateType)({ ...F(M), ...N });
  }
  return gf;
}
var tO;
function pS() {
  if (tO) return mf;
  tO = 1, Object.defineProperty(mf, "__esModule", { value: !0 }), mf.PartialFromMappedResult = o;
  const e = /* @__PURE__ */ hn(), n = /* @__PURE__ */ fS(), t = /* @__PURE__ */ Ot();
  function r(a, s) {
    const c = {};
    for (const u of globalThis.Object.getOwnPropertyNames(a))
      c[u] = (0, n.Partial)(a[u], (0, t.Clone)(s));
    return c;
  }
  function i(a, s) {
    return r(a.properties, s);
  }
  function o(a, s) {
    const c = i(a, s);
    return (0, e.MappedResult)(c);
  }
  return mf;
}
var rO;
function cl() {
  return rO || (rO = 1, function(e) {
    var n = ia && ia.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = ia && ia.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ pS(), e), t(/* @__PURE__ */ fS(), e);
  }(ia)), ia;
}
var oa = {}, Tf = {}, iO;
function nV() {
  if (iO) return Tf;
  iO = 1, Object.defineProperty(Tf, "__esModule", { value: !0 }), Tf.Record = m;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ le(), t = /* @__PURE__ */ Pi(), r = /* @__PURE__ */ Vn(), i = /* @__PURE__ */ Pt(), o = /* @__PURE__ */ ti(), a = /* @__PURE__ */ sn(), s = /* @__PURE__ */ Rr(), c = /* @__PURE__ */ bc(), u = /* @__PURE__ */ Er(), f = /* @__PURE__ */ It(), d = /* @__PURE__ */ De();
  function p(P, R, y) {
    return (0, e.CreateType)({ [n.Kind]: "Record", type: "object", patternProperties: { [P]: R } }, y);
  }
  function T(P, R, y) {
    const $ = {};
    for (const C of P)
      $[C] = R;
    return (0, i.Object)($, { ...y, [n.Hint]: "Record" });
  }
  function b(P, R, y) {
    return (0, s.IsTemplateLiteralFinite)(P) ? T((0, u.IndexPropertyKeys)(P), R, y) : p(P.pattern, R, y);
  }
  function O(P, R, y) {
    return T((0, u.IndexPropertyKeys)((0, a.Union)(P)), R, y);
  }
  function F(P, R, y) {
    return T([P.toString()], R, y);
  }
  function E(P, R, y) {
    return p(P.source, R, y);
  }
  function M(P, R, y) {
    const $ = (0, f.IsUndefined)(P.pattern) ? c.PatternStringExact : P.pattern;
    return p($, R, y);
  }
  function N(P, R, y) {
    return p(c.PatternStringExact, R, y);
  }
  function w(P, R, y) {
    return p(c.PatternNeverExact, R, y);
  }
  function _(P, R, y) {
    return p(c.PatternNumberExact, R, y);
  }
  function B(P, R, y) {
    return p(c.PatternNumberExact, R, y);
  }
  function m(P, R, y = {}) {
    return (0, d.IsComputed)(R) ? (0, t.Computed)("Record", [P, (0, t.Computed)(R.target, R.parameters)], y) : (0, d.IsComputed)(P) ? (0, t.Computed)("Record", [(0, t.Computed)(R.target, R.parameters), R], y) : (0, d.IsRef)(P) ? (0, t.Computed)("Record", [(0, o.Ref)(P.$ref), R]) : (0, d.IsUnion)(P) ? O(P.anyOf, R, y) : (0, d.IsTemplateLiteral)(P) ? b(P, R, y) : (0, d.IsLiteral)(P) ? F(P.const, R, y) : (0, d.IsInteger)(P) ? _(P, R, y) : (0, d.IsNumber)(P) ? B(P, R, y) : (0, d.IsRegExp)(P) ? E(P, R, y) : (0, d.IsString)(P) ? M(P, R, y) : (0, d.IsAny)(P) ? N(P, R, y) : (0, d.IsNever)(P) ? w(P, R, y) : (0, r.Never)(y);
  }
  return Tf;
}
var oO;
function dl() {
  return oO || (oO = 1, function(e) {
    var n = oa && oa.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = oa && oa.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ nV(), e);
  }(oa)), oa;
}
var aa = {}, _f = {}, bf = {}, aO;
function lS() {
  if (aO) return bf;
  aO = 1, Object.defineProperty(bf, "__esModule", { value: !0 }), bf.Required = F;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ Pi(), t = /* @__PURE__ */ Pt(), r = /* @__PURE__ */ qt(), i = /* @__PURE__ */ sn(), o = /* @__PURE__ */ ti(), a = /* @__PURE__ */ le(), s = /* @__PURE__ */ Ii(), c = /* @__PURE__ */ yS(), u = /* @__PURE__ */ De();
  function f(E, M) {
    return (0, n.Computed)("Required", [(0, n.Computed)(E, M)]);
  }
  function d(E) {
    return (0, n.Computed)("Required", [(0, o.Ref)(E)]);
  }
  function p(E) {
    const M = {};
    for (const N of globalThis.Object.getOwnPropertyNames(E))
      M[N] = (0, s.Discard)(E[N], [a.OptionalKind]);
    return M;
  }
  function T(E) {
    const M = (0, s.Discard)(E, [a.TransformKind, "$id", "required", "properties"]), N = p(E.properties);
    return (0, t.Object)(N, M);
  }
  function b(E) {
    return E.map((M) => O(M));
  }
  function O(E) {
    return (0, u.IsComputed)(E) ? f(E.target, E.parameters) : (0, u.IsRef)(E) ? d(E.$ref) : (0, u.IsIntersect)(E) ? (0, r.Intersect)(b(E.allOf)) : (0, u.IsUnion)(E) ? (0, i.Union)(b(E.anyOf)) : (0, u.IsObject)(E) ? T(E) : (0, t.Object)({});
  }
  function F(E, M) {
    return (0, u.IsMappedResult)(E) ? (0, c.RequiredFromMappedResult)(E, M) : (0, e.CreateType)({ ...O(E), ...M });
  }
  return bf;
}
var sO;
function yS() {
  if (sO) return _f;
  sO = 1, Object.defineProperty(_f, "__esModule", { value: !0 }), _f.RequiredFromMappedResult = i;
  const e = /* @__PURE__ */ hn(), n = /* @__PURE__ */ lS();
  function t(o, a) {
    const s = {};
    for (const c of globalThis.Object.getOwnPropertyNames(o))
      s[c] = (0, n.Required)(o[c], a);
    return s;
  }
  function r(o, a) {
    return t(o.properties, a);
  }
  function i(o, a) {
    const s = r(o, a);
    return (0, e.MappedResult)(s);
  }
  return _f;
}
var uO;
function fl() {
  return uO || (uO = 1, function(e) {
    var n = aa && aa.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = aa && aa.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ yS(), e), t(/* @__PURE__ */ lS(), e);
  }(aa)), aa;
}
var cO;
function tV() {
  if (cO) return cs;
  cO = 1, Object.defineProperty(cs, "__esModule", { value: !0 }), cs.FromType = re, cs.ComputeType = Ae, cs.ComputeModuleProperties = Re;
  const e = /* @__PURE__ */ Oi(), n = /* @__PURE__ */ Ii(), t = /* @__PURE__ */ mc(), r = /* @__PURE__ */ nl(), i = /* @__PURE__ */ gc(), o = /* @__PURE__ */ Tc(), a = /* @__PURE__ */ Er(), s = /* @__PURE__ */ Za(), c = /* @__PURE__ */ qt(), u = /* @__PURE__ */ hc(), f = /* @__PURE__ */ fr(), d = /* @__PURE__ */ Pt(), p = /* @__PURE__ */ sl(), T = /* @__PURE__ */ ul(), b = /* @__PURE__ */ Vn(), O = /* @__PURE__ */ cl(), F = /* @__PURE__ */ dl(), E = /* @__PURE__ */ fl(), M = /* @__PURE__ */ wi(), N = /* @__PURE__ */ sn(), w = /* @__PURE__ */ le(), _ = /* @__PURE__ */ De();
  function B(ne, Y) {
    return Y.map((D) => _.IsRef(D) ? m(ne, D.$ref) : re(ne, D));
  }
  function m(ne, Y) {
    return Y in ne ? _.IsRef(ne[Y]) ? m(ne, ne[Y].$ref) : re(ne, ne[Y]) : (0, b.Never)();
  }
  function P(ne) {
    return (0, r.Awaited)(ne[0]);
  }
  function R(ne) {
    return (0, a.Index)(ne[0], ne[1]);
  }
  function y(ne) {
    return (0, f.KeyOf)(ne[0]);
  }
  function $(ne) {
    return (0, O.Partial)(ne[0]);
  }
  function C(ne) {
    return (0, p.Omit)(ne[0], ne[1]);
  }
  function V(ne) {
    return (0, T.Pick)(ne[0], ne[1]);
  }
  function G(ne) {
    return (0, F.Record)(ne[0], ne[1]);
  }
  function z(ne) {
    return (0, E.Required)(ne[0]);
  }
  function ie(ne, Y, D) {
    const g = B(ne, D);
    return Y === "Awaited" ? P(g) : Y === "Index" ? R(g) : Y === "KeyOf" ? y(g) : Y === "Partial" ? $(g) : Y === "Omit" ? C(g) : Y === "Pick" ? V(g) : Y === "Record" ? G(g) : Y === "Required" ? z(g) : (0, b.Never)();
  }
  function ae(ne, Y) {
    return (0, d.Object)(globalThis.Object.keys(Y).reduce((D, g) => ({ ...D, [g]: re(ne, Y[g]) }), {}));
  }
  function k(ne, Y, D) {
    return (0, o.Constructor)(Q(ne, Y), re(ne, D));
  }
  function $e(ne, Y, D) {
    return (0, s.Function)(Q(ne, Y), re(ne, D));
  }
  function He(ne, Y) {
    return (0, M.Tuple)(Q(ne, Y));
  }
  function Je(ne, Y) {
    return (0, c.Intersect)(Q(ne, Y));
  }
  function We(ne, Y) {
    return (0, N.Union)(Q(ne, Y));
  }
  function Ye(ne, Y) {
    return (0, t.Array)(re(ne, Y));
  }
  function Me(ne, Y) {
    return (0, i.AsyncIterator)(re(ne, Y));
  }
  function en(ne, Y) {
    return (0, u.Iterator)(re(ne, Y));
  }
  function Q(ne, Y) {
    return Y.map((D) => re(ne, D));
  }
  function re(ne, Y) {
    return (
      // Modifier Unwrap - Reapplied via CreateType Options
      _.IsOptional(Y) ? (0, e.CreateType)(re(ne, (0, n.Discard)(Y, [w.OptionalKind])), Y) : _.IsReadonly(Y) ? (0, e.CreateType)(re(ne, (0, n.Discard)(Y, [w.ReadonlyKind])), Y) : (
        // Traveral
        _.IsArray(Y) ? (0, e.CreateType)(Ye(ne, Y.items), Y) : _.IsAsyncIterator(Y) ? (0, e.CreateType)(Me(ne, Y.items), Y) : _.IsComputed(Y) ? (0, e.CreateType)(ie(ne, Y.target, Y.parameters)) : _.IsConstructor(Y) ? (0, e.CreateType)(k(ne, Y.parameters, Y.returns), Y) : _.IsFunction(Y) ? (0, e.CreateType)($e(ne, Y.parameters, Y.returns), Y) : _.IsIntersect(Y) ? (0, e.CreateType)(Je(ne, Y.allOf), Y) : _.IsIterator(Y) ? (0, e.CreateType)(en(ne, Y.items), Y) : _.IsObject(Y) ? (0, e.CreateType)(ae(ne, Y.properties), Y) : _.IsTuple(Y) ? (0, e.CreateType)(He(ne, Y.items || []), Y) : _.IsUnion(Y) ? (0, e.CreateType)(We(ne, Y.anyOf), Y) : Y
      )
    );
  }
  function Ae(ne, Y) {
    return Y in ne ? re(ne, ne[Y]) : (0, b.Never)();
  }
  function Re(ne) {
    return globalThis.Object.getOwnPropertyNames(ne).reduce((Y, D) => ({ ...Y, [D]: Ae(ne, D) }), {});
  }
  return cs;
}
var dO;
function rV() {
  if (dO) return us;
  dO = 1, Object.defineProperty(us, "__esModule", { value: !0 }), us.TModule = void 0, us.Module = i;
  const e = /* @__PURE__ */ Oi(), n = /* @__PURE__ */ le(), t = /* @__PURE__ */ tV();
  class r {
    constructor(a) {
      const s = (0, t.ComputeModuleProperties)(a), c = this.WithIdentifiers(s);
      this.$defs = c;
    }
    /** `[Json]` Imports a Type by Key. */
    Import(a, s) {
      const c = { ...this.$defs, [a]: (0, e.CreateType)(this.$defs[a], s) };
      return (0, e.CreateType)({ [n.Kind]: "Import", $defs: c, $ref: a });
    }
    // prettier-ignore
    WithIdentifiers(a) {
      return globalThis.Object.getOwnPropertyNames(a).reduce((s, c) => ({ ...s, [c]: { ...a[c], $id: c } }), {});
    }
  }
  us.TModule = r;
  function i(o) {
    return new r(o);
  }
  return us;
}
var fO;
function jg() {
  return fO || (fO = 1, function(e) {
    var n = na && na.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = na && na.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ rV(), e);
  }(na)), na;
}
var sa = {}, hf = {}, pO;
function iV() {
  if (pO) return hf;
  pO = 1, Object.defineProperty(hf, "__esModule", { value: !0 }), hf.Not = t;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ le();
  function t(r, i) {
    return (0, e.CreateType)({ [n.Kind]: "Not", not: r }, i);
  }
  return hf;
}
var lO;
function xg() {
  return lO || (lO = 1, function(e) {
    var n = sa && sa.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = sa && sa.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ iV(), e);
  }(sa)), sa;
}
var ua = {}, If = {}, yO;
function oV() {
  if (yO) return If;
  yO = 1, Object.defineProperty(If, "__esModule", { value: !0 }), If.Parameters = n;
  const e = /* @__PURE__ */ wi();
  function n(t, r) {
    return (0, e.Tuple)(t.parameters, r);
  }
  return If;
}
var mO;
function Fg() {
  return mO || (mO = 1, function(e) {
    var n = ua && ua.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = ua && ua.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ oV(), e);
  }(ua)), ua;
}
var ca = {}, Of = {}, gO;
function aV() {
  if (gO) return Of;
  gO = 1, Object.defineProperty(Of, "__esModule", { value: !0 }), Of.ReadonlyOptional = t;
  const e = /* @__PURE__ */ Xs(), n = /* @__PURE__ */ Ai();
  function t(r) {
    return (0, e.Readonly)((0, n.Optional)(r));
  }
  return Of;
}
var TO;
function Ng() {
  return TO || (TO = 1, function(e) {
    var n = ca && ca.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = ca && ca.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ aV(), e);
  }(ca)), ca;
}
var da = {}, Pf = {}, _O;
function sV() {
  if (_O) return Pf;
  _O = 1, Object.defineProperty(Pf, "__esModule", { value: !0 }), Pf.Recursive = o;
  const e = /* @__PURE__ */ nS(), n = /* @__PURE__ */ he(), t = /* @__PURE__ */ It(), r = /* @__PURE__ */ le();
  let i = 0;
  function o(a, s = {}) {
    (0, t.IsUndefined)(s.$id) && (s.$id = `T${i++}`);
    const c = (0, e.CloneType)(a({ [r.Kind]: "This", $ref: `${s.$id}` }));
    return c.$id = s.$id, (0, n.CreateType)({ [r.Hint]: "Recursive", ...c }, s);
  }
  return Pf;
}
var bO;
function Dg() {
  return bO || (bO = 1, function(e) {
    var n = da && da.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = da && da.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ sV(), e);
  }(da)), da;
}
var fa = {}, Af = {}, hO;
function uV() {
  if (hO) return Af;
  hO = 1, Object.defineProperty(Af, "__esModule", { value: !0 }), Af.RegExp = r;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ It(), t = /* @__PURE__ */ le();
  function r(i, o) {
    const a = (0, n.IsString)(i) ? new globalThis.RegExp(i) : i;
    return (0, e.CreateType)({ [t.Kind]: "RegExp", type: "RegExp", source: a.source, flags: a.flags }, o);
  }
  return Af;
}
var IO;
function Ug() {
  return IO || (IO = 1, function(e) {
    var n = fa && fa.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = fa && fa.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ uV(), e);
  }(fa)), fa;
}
var pa = {}, wf = {}, OO;
function cV() {
  if (OO) return wf;
  OO = 1, Object.defineProperty(wf, "__esModule", { value: !0 }), wf.Rest = t;
  const e = /* @__PURE__ */ De();
  function n(r) {
    return (0, e.IsIntersect)(r) ? r.allOf : (0, e.IsUnion)(r) ? r.anyOf : (0, e.IsTuple)(r) ? r.items ?? [] : [];
  }
  function t(r) {
    return n(r);
  }
  return wf;
}
var PO;
function Lg() {
  return PO || (PO = 1, function(e) {
    var n = pa && pa.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = pa && pa.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ cV(), e);
  }(pa)), pa;
}
var la = {}, vf = {}, AO;
function dV() {
  if (AO) return vf;
  AO = 1, Object.defineProperty(vf, "__esModule", { value: !0 }), vf.ReturnType = n;
  const e = /* @__PURE__ */ he();
  function n(t, r) {
    return (0, e.CreateType)(t.returns, r);
  }
  return vf;
}
var wO;
function Vg() {
  return wO || (wO = 1, function(e) {
    var n = la && la.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = la && la.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ dV(), e);
  }(la)), la;
}
var ya = {}, Ll = {}, vO;
function fV() {
  return vO || (vO = 1, Object.defineProperty(Ll, "__esModule", { value: !0 })), Ll;
}
var Vl = {}, SO;
function pV() {
  return SO || (SO = 1, Object.defineProperty(Vl, "__esModule", { value: !0 })), Vl;
}
var RO;
function lV() {
  return RO || (RO = 1, function(e) {
    var n = ya && ya.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = ya && ya.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ fV(), e), t(/* @__PURE__ */ pV(), e);
  }(ya)), ya;
}
var ma = {}, ql = {}, EO;
function yV() {
  return EO || (EO = 1, Object.defineProperty(ql, "__esModule", { value: !0 })), ql;
}
var $O;
function mV() {
  return $O || ($O = 1, function(e) {
    var n = ma && ma.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = ma && ma.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ yV(), e);
  }(ma)), ma;
}
var ga = {}, ai = {}, MO;
function gV() {
  if (MO) return ai;
  MO = 1, Object.defineProperty(ai, "__esModule", { value: !0 }), ai.TransformEncodeBuilder = ai.TransformDecodeBuilder = void 0, ai.Transform = i;
  const e = /* @__PURE__ */ le(), n = /* @__PURE__ */ De();
  class t {
    constructor(a) {
      this.schema = a;
    }
    Decode(a) {
      return new r(this.schema, a);
    }
  }
  ai.TransformDecodeBuilder = t;
  class r {
    constructor(a, s) {
      this.schema = a, this.decode = s;
    }
    EncodeTransform(a, s) {
      const f = { Encode: (d) => s[e.TransformKind].Encode(a(d)), Decode: (d) => this.decode(s[e.TransformKind].Decode(d)) };
      return { ...s, [e.TransformKind]: f };
    }
    EncodeSchema(a, s) {
      const c = { Decode: this.decode, Encode: a };
      return { ...s, [e.TransformKind]: c };
    }
    Encode(a) {
      return (0, n.IsTransform)(this.schema) ? this.EncodeTransform(a, this.schema) : this.EncodeSchema(a, this.schema);
    }
  }
  ai.TransformEncodeBuilder = r;
  function i(o) {
    return new t(o);
  }
  return ai;
}
var CO;
function qg() {
  return CO || (CO = 1, function(e) {
    var n = ga && ga.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = ga && ga.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ gV(), e);
  }(ga)), ga;
}
var Ta = {}, Sf = {}, BO;
function TV() {
  if (BO) return Sf;
  BO = 1, Object.defineProperty(Sf, "__esModule", { value: !0 }), Sf.Void = t;
  const e = /* @__PURE__ */ he(), n = /* @__PURE__ */ le();
  function t(r) {
    return (0, e.CreateType)({ [n.Kind]: "Void", type: "void" }, r);
  }
  return Sf;
}
var jO;
function Kg() {
  return jO || (jO = 1, function(e) {
    var n = Ta && Ta.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Ta && Ta.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ TV(), e);
  }(Ta)), Ta;
}
var Kl = {}, Tu = {}, xO;
function mS() {
  if (xO) return Tu;
  xO = 1, Object.defineProperty(Tu, "__esModule", { value: !0 }), Tu.JsonTypeBuilder = void 0;
  const e = /* @__PURE__ */ Oc(), n = /* @__PURE__ */ mc(), t = /* @__PURE__ */ Qp(), r = /* @__PURE__ */ Ig(), i = /* @__PURE__ */ Og(), o = /* @__PURE__ */ Ag(), a = /* @__PURE__ */ vg(), s = /* @__PURE__ */ Zs(), c = /* @__PURE__ */ Rg(), u = /* @__PURE__ */ Er(), f = /* @__PURE__ */ $g(), d = /* @__PURE__ */ qt(), p = /* @__PURE__ */ Mg(), T = /* @__PURE__ */ fr(), b = /* @__PURE__ */ Wn(), O = /* @__PURE__ */ hn(), F = /* @__PURE__ */ Vn(), E = /* @__PURE__ */ xg(), M = /* @__PURE__ */ rl(), N = /* @__PURE__ */ jg(), w = /* @__PURE__ */ Js(), _ = /* @__PURE__ */ Pt(), B = /* @__PURE__ */ sl(), m = /* @__PURE__ */ Ai(), P = /* @__PURE__ */ cl(), R = /* @__PURE__ */ ul(), y = /* @__PURE__ */ Xs(), $ = /* @__PURE__ */ Ng(), C = /* @__PURE__ */ dl(), V = /* @__PURE__ */ Dg(), G = /* @__PURE__ */ ti(), z = /* @__PURE__ */ fl(), ie = /* @__PURE__ */ Lg(), ae = /* @__PURE__ */ Ys(), k = /* @__PURE__ */ Rr(), $e = /* @__PURE__ */ qg(), He = /* @__PURE__ */ wi(), Je = /* @__PURE__ */ sn(), We = /* @__PURE__ */ Qs(), Ye = /* @__PURE__ */ Xp();
  class Me {
    // ------------------------------------------------------------------------
    // Modifiers
    // ------------------------------------------------------------------------
    /** `[Json]` Creates a Readonly and Optional property */
    ReadonlyOptional(Q) {
      return (0, $.ReadonlyOptional)(Q);
    }
    /** `[Json]` Creates a Readonly property */
    Readonly(Q, re) {
      return (0, y.Readonly)(Q, re ?? !0);
    }
    /** `[Json]` Creates a Optional property */
    Optional(Q, re) {
      return (0, m.Optional)(Q, re ?? !0);
    }
    // ------------------------------------------------------------------------
    // Types
    // ------------------------------------------------------------------------
    /** `[Json]` Creates an Any type */
    Any(Q) {
      return (0, e.Any)(Q);
    }
    /** `[Json]` Creates an Array type */
    Array(Q, re) {
      return (0, n.Array)(Q, re);
    }
    /** `[Json]` Creates a Boolean type */
    Boolean(Q) {
      return (0, t.Boolean)(Q);
    }
    /** `[Json]` Intrinsic function to Capitalize LiteralString types */
    Capitalize(Q, re) {
      return (0, p.Capitalize)(Q, re);
    }
    /** `[Json]` Creates a Composite object type */
    Composite(Q, re) {
      return (0, r.Composite)(Q, re);
    }
    /** `[JavaScript]` Creates a readonly const type from the given value. */
    Const(Q, re) {
      return (0, i.Const)(Q, re);
    }
    /** `[Json]` Creates a Enum type */
    Enum(Q, re) {
      return (0, o.Enum)(Q, re);
    }
    /** `[Json]` Constructs a type by excluding from unionType all union members that are assignable to excludedMembers */
    Exclude(Q, re, Ae) {
      return (0, a.Exclude)(Q, re, Ae);
    }
    /** `[Json]` Creates a Conditional type */
    Extends(Q, re, Ae, Re, ne) {
      return (0, s.Extends)(Q, re, Ae, Re, ne);
    }
    /** `[Json]` Constructs a type by extracting from type all union members that are assignable to union */
    Extract(Q, re, Ae) {
      return (0, c.Extract)(Q, re, Ae);
    }
    /** `[Json]` Returns an Indexed property type for the given keys */
    Index(Q, re, Ae) {
      return (0, u.Index)(Q, re, Ae);
    }
    /** `[Json]` Creates an Integer type */
    Integer(Q) {
      return (0, f.Integer)(Q);
    }
    /** `[Json]` Creates an Intersect type */
    Intersect(Q, re) {
      return (0, d.Intersect)(Q, re);
    }
    /** `[Json]` Creates a KeyOf type */
    KeyOf(Q, re) {
      return (0, T.KeyOf)(Q, re);
    }
    /** `[Json]` Creates a Literal type */
    Literal(Q, re) {
      return (0, b.Literal)(Q, re);
    }
    /** `[Json]` Intrinsic function to Lowercase LiteralString types */
    Lowercase(Q, re) {
      return (0, p.Lowercase)(Q, re);
    }
    /** `[Json]` Creates a Mapped object type */
    Mapped(Q, re, Ae) {
      return (0, O.Mapped)(Q, re, Ae);
    }
    /** `[Json]` Creates a Type Definition Module. */
    Module(Q) {
      return (0, N.Module)(Q);
    }
    /** `[Json]` Creates a Never type */
    Never(Q) {
      return (0, F.Never)(Q);
    }
    /** `[Json]` Creates a Not type */
    Not(Q, re) {
      return (0, E.Not)(Q, re);
    }
    /** `[Json]` Creates a Null type */
    Null(Q) {
      return (0, M.Null)(Q);
    }
    /** `[Json]` Creates a Number type */
    Number(Q) {
      return (0, w.Number)(Q);
    }
    /** `[Json]` Creates an Object type */
    Object(Q, re) {
      return (0, _.Object)(Q, re);
    }
    /** `[Json]` Constructs a type whose keys are omitted from the given type */
    Omit(Q, re, Ae) {
      return (0, B.Omit)(Q, re, Ae);
    }
    /** `[Json]` Constructs a type where all properties are optional */
    Partial(Q, re) {
      return (0, P.Partial)(Q, re);
    }
    /** `[Json]` Constructs a type whose keys are picked from the given type */
    Pick(Q, re, Ae) {
      return (0, R.Pick)(Q, re, Ae);
    }
    /** `[Json]` Creates a Record type */
    Record(Q, re, Ae) {
      return (0, C.Record)(Q, re, Ae);
    }
    /** `[Json]` Creates a Recursive type */
    Recursive(Q, re) {
      return (0, V.Recursive)(Q, re);
    }
    /** `[Json]` Creates a Ref type. The referenced type must contain a $id */
    Ref(...Q) {
      return (0, G.Ref)(Q[0], Q[1]);
    }
    /** `[Json]` Constructs a type where all properties are required */
    Required(Q, re) {
      return (0, z.Required)(Q, re);
    }
    /** `[Json]` Extracts interior Rest elements from Tuple, Intersect and Union types */
    Rest(Q) {
      return (0, ie.Rest)(Q);
    }
    /** `[Json]` Creates a String type */
    String(Q) {
      return (0, ae.String)(Q);
    }
    /** `[Json]` Creates a TemplateLiteral type */
    TemplateLiteral(Q, re) {
      return (0, k.TemplateLiteral)(Q, re);
    }
    /** `[Json]` Creates a Transform type */
    Transform(Q) {
      return (0, $e.Transform)(Q);
    }
    /** `[Json]` Creates a Tuple type */
    Tuple(Q, re) {
      return (0, He.Tuple)(Q, re);
    }
    /** `[Json]` Intrinsic function to Uncapitalize LiteralString types */
    Uncapitalize(Q, re) {
      return (0, p.Uncapitalize)(Q, re);
    }
    /** `[Json]` Creates a Union type */
    Union(Q, re) {
      return (0, Je.Union)(Q, re);
    }
    /** `[Json]` Creates an Unknown type */
    Unknown(Q) {
      return (0, We.Unknown)(Q);
    }
    /** `[Json]` Creates a Unsafe type that will infers as the generic argument T */
    Unsafe(Q) {
      return (0, Ye.Unsafe)(Q);
    }
    /** `[Json]` Intrinsic function to Uppercase LiteralString types */
    Uppercase(Q, re) {
      return (0, p.Uppercase)(Q, re);
    }
  }
  return Tu.JsonTypeBuilder = Me, Tu;
}
var Gl = {}, FO;
function _V() {
  return FO || (FO = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.String = e.ReturnType = e.Rest = e.Required = e.RegExp = e.Ref = e.Recursive = e.Record = e.ReadonlyOptional = e.Readonly = e.Promise = e.Pick = e.Partial = e.Parameters = e.Optional = e.Omit = e.Object = e.Number = e.Null = e.Not = e.Never = e.Module = e.Mapped = e.Literal = e.KeyOf = e.Iterator = e.Uppercase = e.Lowercase = e.Uncapitalize = e.Capitalize = e.Intersect = e.Integer = e.InstanceType = e.Index = e.Function = e.Extract = e.Extends = e.Exclude = e.Enum = e.Date = e.ConstructorParameters = e.Constructor = e.Const = e.Composite = e.Boolean = e.BigInt = e.Awaited = e.AsyncIterator = e.Array = e.Any = void 0, e.Void = e.Unsafe = e.Unknown = e.Union = e.Undefined = e.Uint8Array = e.Tuple = e.Transform = e.TemplateLiteral = e.Symbol = void 0;
    var n = /* @__PURE__ */ Oc();
    Object.defineProperty(e, "Any", { enumerable: !0, get: function() {
      return n.Any;
    } });
    var t = /* @__PURE__ */ mc();
    Object.defineProperty(e, "Array", { enumerable: !0, get: function() {
      return t.Array;
    } });
    var r = /* @__PURE__ */ gc();
    Object.defineProperty(e, "AsyncIterator", { enumerable: !0, get: function() {
      return r.AsyncIterator;
    } });
    var i = /* @__PURE__ */ nl();
    Object.defineProperty(e, "Awaited", { enumerable: !0, get: function() {
      return i.Awaited;
    } });
    var o = /* @__PURE__ */ _c();
    Object.defineProperty(e, "BigInt", { enumerable: !0, get: function() {
      return o.BigInt;
    } });
    var a = /* @__PURE__ */ Qp();
    Object.defineProperty(e, "Boolean", { enumerable: !0, get: function() {
      return a.Boolean;
    } });
    var s = /* @__PURE__ */ Ig();
    Object.defineProperty(e, "Composite", { enumerable: !0, get: function() {
      return s.Composite;
    } });
    var c = /* @__PURE__ */ Og();
    Object.defineProperty(e, "Const", { enumerable: !0, get: function() {
      return c.Const;
    } });
    var u = /* @__PURE__ */ Tc();
    Object.defineProperty(e, "Constructor", { enumerable: !0, get: function() {
      return u.Constructor;
    } });
    var f = /* @__PURE__ */ Pg();
    Object.defineProperty(e, "ConstructorParameters", { enumerable: !0, get: function() {
      return f.ConstructorParameters;
    } });
    var d = /* @__PURE__ */ tl();
    Object.defineProperty(e, "Date", { enumerable: !0, get: function() {
      return d.Date;
    } });
    var p = /* @__PURE__ */ Ag();
    Object.defineProperty(e, "Enum", { enumerable: !0, get: function() {
      return p.Enum;
    } });
    var T = /* @__PURE__ */ vg();
    Object.defineProperty(e, "Exclude", { enumerable: !0, get: function() {
      return T.Exclude;
    } });
    var b = /* @__PURE__ */ Zs();
    Object.defineProperty(e, "Extends", { enumerable: !0, get: function() {
      return b.Extends;
    } });
    var O = /* @__PURE__ */ Rg();
    Object.defineProperty(e, "Extract", { enumerable: !0, get: function() {
      return O.Extract;
    } });
    var F = /* @__PURE__ */ Za();
    Object.defineProperty(e, "Function", { enumerable: !0, get: function() {
      return F.Function;
    } });
    var E = /* @__PURE__ */ Er();
    Object.defineProperty(e, "Index", { enumerable: !0, get: function() {
      return E.Index;
    } });
    var M = /* @__PURE__ */ Eg();
    Object.defineProperty(e, "InstanceType", { enumerable: !0, get: function() {
      return M.InstanceType;
    } });
    var N = /* @__PURE__ */ $g();
    Object.defineProperty(e, "Integer", { enumerable: !0, get: function() {
      return N.Integer;
    } });
    var w = /* @__PURE__ */ qt();
    Object.defineProperty(e, "Intersect", { enumerable: !0, get: function() {
      return w.Intersect;
    } });
    var _ = /* @__PURE__ */ Mg();
    Object.defineProperty(e, "Capitalize", { enumerable: !0, get: function() {
      return _.Capitalize;
    } }), Object.defineProperty(e, "Uncapitalize", { enumerable: !0, get: function() {
      return _.Uncapitalize;
    } }), Object.defineProperty(e, "Lowercase", { enumerable: !0, get: function() {
      return _.Lowercase;
    } }), Object.defineProperty(e, "Uppercase", { enumerable: !0, get: function() {
      return _.Uppercase;
    } });
    var B = /* @__PURE__ */ hc();
    Object.defineProperty(e, "Iterator", { enumerable: !0, get: function() {
      return B.Iterator;
    } });
    var m = /* @__PURE__ */ fr();
    Object.defineProperty(e, "KeyOf", { enumerable: !0, get: function() {
      return m.KeyOf;
    } });
    var P = /* @__PURE__ */ Wn();
    Object.defineProperty(e, "Literal", { enumerable: !0, get: function() {
      return P.Literal;
    } });
    var R = /* @__PURE__ */ hn();
    Object.defineProperty(e, "Mapped", { enumerable: !0, get: function() {
      return R.Mapped;
    } });
    var y = /* @__PURE__ */ jg();
    Object.defineProperty(e, "Module", { enumerable: !0, get: function() {
      return y.Module;
    } });
    var $ = /* @__PURE__ */ Vn();
    Object.defineProperty(e, "Never", { enumerable: !0, get: function() {
      return $.Never;
    } });
    var C = /* @__PURE__ */ xg();
    Object.defineProperty(e, "Not", { enumerable: !0, get: function() {
      return C.Not;
    } });
    var V = /* @__PURE__ */ rl();
    Object.defineProperty(e, "Null", { enumerable: !0, get: function() {
      return V.Null;
    } });
    var G = /* @__PURE__ */ Js();
    Object.defineProperty(e, "Number", { enumerable: !0, get: function() {
      return G.Number;
    } });
    var z = /* @__PURE__ */ Pt();
    Object.defineProperty(e, "Object", { enumerable: !0, get: function() {
      return z.Object;
    } });
    var ie = /* @__PURE__ */ sl();
    Object.defineProperty(e, "Omit", { enumerable: !0, get: function() {
      return ie.Omit;
    } });
    var ae = /* @__PURE__ */ Ai();
    Object.defineProperty(e, "Optional", { enumerable: !0, get: function() {
      return ae.Optional;
    } });
    var k = /* @__PURE__ */ Fg();
    Object.defineProperty(e, "Parameters", { enumerable: !0, get: function() {
      return k.Parameters;
    } });
    var $e = /* @__PURE__ */ cl();
    Object.defineProperty(e, "Partial", { enumerable: !0, get: function() {
      return $e.Partial;
    } });
    var He = /* @__PURE__ */ ul();
    Object.defineProperty(e, "Pick", { enumerable: !0, get: function() {
      return He.Pick;
    } });
    var Je = /* @__PURE__ */ Zp();
    Object.defineProperty(e, "Promise", { enumerable: !0, get: function() {
      return Je.Promise;
    } });
    var We = /* @__PURE__ */ Xs();
    Object.defineProperty(e, "Readonly", { enumerable: !0, get: function() {
      return We.Readonly;
    } });
    var Ye = /* @__PURE__ */ Ng();
    Object.defineProperty(e, "ReadonlyOptional", { enumerable: !0, get: function() {
      return Ye.ReadonlyOptional;
    } });
    var Me = /* @__PURE__ */ dl();
    Object.defineProperty(e, "Record", { enumerable: !0, get: function() {
      return Me.Record;
    } });
    var en = /* @__PURE__ */ Dg();
    Object.defineProperty(e, "Recursive", { enumerable: !0, get: function() {
      return en.Recursive;
    } });
    var Q = /* @__PURE__ */ ti();
    Object.defineProperty(e, "Ref", { enumerable: !0, get: function() {
      return Q.Ref;
    } });
    var re = /* @__PURE__ */ Ug();
    Object.defineProperty(e, "RegExp", { enumerable: !0, get: function() {
      return re.RegExp;
    } });
    var Ae = /* @__PURE__ */ fl();
    Object.defineProperty(e, "Required", { enumerable: !0, get: function() {
      return Ae.Required;
    } });
    var Re = /* @__PURE__ */ Lg();
    Object.defineProperty(e, "Rest", { enumerable: !0, get: function() {
      return Re.Rest;
    } });
    var ne = /* @__PURE__ */ Vg();
    Object.defineProperty(e, "ReturnType", { enumerable: !0, get: function() {
      return ne.ReturnType;
    } });
    var Y = /* @__PURE__ */ Ys();
    Object.defineProperty(e, "String", { enumerable: !0, get: function() {
      return Y.String;
    } });
    var D = /* @__PURE__ */ il();
    Object.defineProperty(e, "Symbol", { enumerable: !0, get: function() {
      return D.Symbol;
    } });
    var g = /* @__PURE__ */ Rr();
    Object.defineProperty(e, "TemplateLiteral", { enumerable: !0, get: function() {
      return g.TemplateLiteral;
    } });
    var h = /* @__PURE__ */ qg();
    Object.defineProperty(e, "Transform", { enumerable: !0, get: function() {
      return h.Transform;
    } });
    var j = /* @__PURE__ */ wi();
    Object.defineProperty(e, "Tuple", { enumerable: !0, get: function() {
      return j.Tuple;
    } });
    var H = /* @__PURE__ */ al();
    Object.defineProperty(e, "Uint8Array", { enumerable: !0, get: function() {
      return H.Uint8Array;
    } });
    var l = /* @__PURE__ */ ol();
    Object.defineProperty(e, "Undefined", { enumerable: !0, get: function() {
      return l.Undefined;
    } });
    var X = /* @__PURE__ */ sn();
    Object.defineProperty(e, "Union", { enumerable: !0, get: function() {
      return X.Union;
    } });
    var q = /* @__PURE__ */ Qs();
    Object.defineProperty(e, "Unknown", { enumerable: !0, get: function() {
      return q.Unknown;
    } });
    var x = /* @__PURE__ */ Xp();
    Object.defineProperty(e, "Unsafe", { enumerable: !0, get: function() {
      return x.Unsafe;
    } });
    var de = /* @__PURE__ */ Kg();
    Object.defineProperty(e, "Void", { enumerable: !0, get: function() {
      return de.Void;
    } });
  }(Gl)), Gl;
}
var _u = {}, NO;
function bV() {
  if (NO) return _u;
  NO = 1, Object.defineProperty(_u, "__esModule", { value: !0 }), _u.JavaScriptTypeBuilder = void 0;
  const e = /* @__PURE__ */ mS(), n = /* @__PURE__ */ gc(), t = /* @__PURE__ */ nl(), r = /* @__PURE__ */ _c(), i = /* @__PURE__ */ Tc(), o = /* @__PURE__ */ Pg(), a = /* @__PURE__ */ tl(), s = /* @__PURE__ */ Za(), c = /* @__PURE__ */ Eg(), u = /* @__PURE__ */ hc(), f = /* @__PURE__ */ Fg(), d = /* @__PURE__ */ Zp(), p = /* @__PURE__ */ Ug(), T = /* @__PURE__ */ Vg(), b = /* @__PURE__ */ il(), O = /* @__PURE__ */ al(), F = /* @__PURE__ */ ol(), E = /* @__PURE__ */ Kg();
  class M extends e.JsonTypeBuilder {
    /** `[JavaScript]` Creates a AsyncIterator type */
    AsyncIterator(w, _) {
      return (0, n.AsyncIterator)(w, _);
    }
    /** `[JavaScript]` Constructs a type by recursively unwrapping Promise types */
    Awaited(w, _) {
      return (0, t.Awaited)(w, _);
    }
    /** `[JavaScript]` Creates a BigInt type */
    BigInt(w) {
      return (0, r.BigInt)(w);
    }
    /** `[JavaScript]` Extracts the ConstructorParameters from the given Constructor type */
    ConstructorParameters(w, _) {
      return (0, o.ConstructorParameters)(w, _);
    }
    /** `[JavaScript]` Creates a Constructor type */
    Constructor(w, _, B) {
      return (0, i.Constructor)(w, _, B);
    }
    /** `[JavaScript]` Creates a Date type */
    Date(w = {}) {
      return (0, a.Date)(w);
    }
    /** `[JavaScript]` Creates a Function type */
    Function(w, _, B) {
      return (0, s.Function)(w, _, B);
    }
    /** `[JavaScript]` Extracts the InstanceType from the given Constructor type */
    InstanceType(w, _) {
      return (0, c.InstanceType)(w, _);
    }
    /** `[JavaScript]` Creates an Iterator type */
    Iterator(w, _) {
      return (0, u.Iterator)(w, _);
    }
    /** `[JavaScript]` Extracts the Parameters from the given Function type */
    Parameters(w, _) {
      return (0, f.Parameters)(w, _);
    }
    /** `[JavaScript]` Creates a Promise type */
    Promise(w, _) {
      return (0, d.Promise)(w, _);
    }
    /** `[JavaScript]` Creates a RegExp type */
    RegExp(w, _) {
      return (0, p.RegExp)(w, _);
    }
    /** `[JavaScript]` Extracts the ReturnType from the given Function type */
    ReturnType(w, _) {
      return (0, T.ReturnType)(w, _);
    }
    /** `[JavaScript]` Creates a Symbol type */
    Symbol(w) {
      return (0, b.Symbol)(w);
    }
    /** `[JavaScript]` Creates a Undefined type */
    Undefined(w) {
      return (0, F.Undefined)(w);
    }
    /** `[JavaScript]` Creates a Uint8Array type */
    Uint8Array(w) {
      return (0, O.Uint8Array)(w);
    }
    /** `[JavaScript]` Creates a Void type */
    Void(w) {
      return (0, E.Void)(w);
    }
  }
  return _u.JavaScriptTypeBuilder = M, _u;
}
var DO;
function hV() {
  return DO || (DO = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.Type = e.JavaScriptTypeBuilder = e.JsonTypeBuilder = void 0;
    var n = /* @__PURE__ */ mS();
    Object.defineProperty(e, "JsonTypeBuilder", { enumerable: !0, get: function() {
      return n.JsonTypeBuilder;
    } });
    const t = /* @__PURE__ */ _V(), r = /* @__PURE__ */ bV();
    Object.defineProperty(e, "JavaScriptTypeBuilder", { enumerable: !0, get: function() {
      return r.JavaScriptTypeBuilder;
    } });
    const i = t;
    e.Type = i;
  }(Kl)), Kl;
}
var UO;
function gS() {
  return UO || (UO = 1, function(e) {
    var n = No && No.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = No && No.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ FL(), e), t(/* @__PURE__ */ Oi(), e), t(/* @__PURE__ */ on(), e), t(/* @__PURE__ */ Vv(), e), t(/* @__PURE__ */ DL(), e), t(/* @__PURE__ */ bc(), e), t(/* @__PURE__ */ zs(), e), t(/* @__PURE__ */ el(), e), t(/* @__PURE__ */ le(), e), t(/* @__PURE__ */ Oc(), e), t(/* @__PURE__ */ mc(), e), t(/* @__PURE__ */ gc(), e), t(/* @__PURE__ */ nl(), e), t(/* @__PURE__ */ _c(), e), t(/* @__PURE__ */ Qp(), e), t(/* @__PURE__ */ Ig(), e), t(/* @__PURE__ */ Og(), e), t(/* @__PURE__ */ Tc(), e), t(/* @__PURE__ */ Pg(), e), t(/* @__PURE__ */ tl(), e), t(/* @__PURE__ */ Ag(), e), t(/* @__PURE__ */ vg(), e), t(/* @__PURE__ */ Zs(), e), t(/* @__PURE__ */ Rg(), e), t(/* @__PURE__ */ Za(), e), t(/* @__PURE__ */ Er(), e), t(/* @__PURE__ */ Eg(), e), t(/* @__PURE__ */ $g(), e), t(/* @__PURE__ */ qt(), e), t(/* @__PURE__ */ hc(), e), t(/* @__PURE__ */ Mg(), e), t(/* @__PURE__ */ fr(), e), t(/* @__PURE__ */ Wn(), e), t(/* @__PURE__ */ jg(), e), t(/* @__PURE__ */ hn(), e), t(/* @__PURE__ */ Vn(), e), t(/* @__PURE__ */ xg(), e), t(/* @__PURE__ */ rl(), e), t(/* @__PURE__ */ Js(), e), t(/* @__PURE__ */ Pt(), e), t(/* @__PURE__ */ sl(), e), t(/* @__PURE__ */ Ai(), e), t(/* @__PURE__ */ Fg(), e), t(/* @__PURE__ */ cl(), e), t(/* @__PURE__ */ ul(), e), t(/* @__PURE__ */ Zp(), e), t(/* @__PURE__ */ Xs(), e), t(/* @__PURE__ */ Ng(), e), t(/* @__PURE__ */ dl(), e), t(/* @__PURE__ */ Dg(), e), t(/* @__PURE__ */ ti(), e), t(/* @__PURE__ */ Ug(), e), t(/* @__PURE__ */ fl(), e), t(/* @__PURE__ */ Lg(), e), t(/* @__PURE__ */ Vg(), e), t(/* @__PURE__ */ lV(), e), t(/* @__PURE__ */ mV(), e), t(/* @__PURE__ */ Ys(), e), t(/* @__PURE__ */ il(), e), t(/* @__PURE__ */ Rr(), e), t(/* @__PURE__ */ qg(), e), t(/* @__PURE__ */ wi(), e), t(/* @__PURE__ */ al(), e), t(/* @__PURE__ */ ol(), e), t(/* @__PURE__ */ sn(), e), t(/* @__PURE__ */ Qs(), e), t(/* @__PURE__ */ Xp(), e), t(/* @__PURE__ */ Kg(), e), t(/* @__PURE__ */ hV(), e);
  }(No)), No;
}
var bu = {}, LO;
function TS() {
  if (LO) return bu;
  LO = 1, Object.defineProperty(bu, "__esModule", { value: !0 }), bu.ValidationException = void 0;
  class e {
    /**
     * @param message Overall error message
     * @param details The individual validation errors
     */
    constructor(t, r = []) {
      this.message = t, this.details = r;
    }
    /**
     * Returns a string representation of the error. Provides the overall
     * error message, followed by the specific error messages, one per line.
     * @returns a string representation of the error.
     */
    toString() {
      let t = this.message;
      if (this.details.length > 0) {
        t.endsWith(":") || (t += ":");
        for (const r of this.details)
          t += `
 * ` + e.errorToString(r);
      }
      return t;
    }
    /**
     * Returns a string representation of a validation error, which precedes
     * the error with its reference path if it occurs in an object.
     */
    static errorToString(t) {
      return t.path != "" ? `${t.path.substring(1)} - ${t.message}` : t.message;
    }
  }
  return bu.ValidationException = e, bu;
}
var VO;
function nu() {
  return VO || (VO = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.throwInvalidValidate = e.throwInvalidAssert = e.createUnionTypeErrorIterable = e.createUnionTypeError = e.createErrorsIterable = e.adjustErrorMessage = e.DEFAULT_UNKNOWN_TYPE_MESSAGE = e.DEFAULT_OVERALL_MESSAGE = void 0;
    const n = /* @__PURE__ */ gS(), t = /* @__PURE__ */ vi(), r = TS();
    e.DEFAULT_OVERALL_MESSAGE = "Invalid value", e.DEFAULT_UNKNOWN_TYPE_MESSAGE = "Object type not recognized";
    const i = "Expected required property";
    function o(d) {
      return d.schema.errorMessage !== void 0 && (d.message = d.schema.errorMessage), d;
    }
    e.adjustErrorMessage = o;
    function a(d) {
      return {
        [Symbol.iterator]: function* () {
          const p = d[Symbol.iterator]();
          let T = p.next(), b = "???";
          for (; T.value !== void 0; ) {
            const O = T.value, F = O.message;
            O.path !== b && (o(O), O.message != F ? (b = O.path, yield O) : (
              // drop 'required' errors for values that have constraints
              (O.message != i || ["Any", "Unknown"].includes(O.schema[n.Kind])) && (yield O)
            )), T = p.next();
          }
        }
      };
    }
    e.createErrorsIterable = a;
    function s(d, p) {
      var T;
      return {
        type: t.ValueErrorType.Union,
        path: "",
        schema: d,
        value: p,
        message: (T = d.errorMessage) !== null && T !== void 0 ? T : e.DEFAULT_UNKNOWN_TYPE_MESSAGE
      };
    }
    e.createUnionTypeError = s;
    function c(d) {
      return {
        [Symbol.iterator]: function* () {
          yield d;
        }
      };
    }
    e.createUnionTypeErrorIterable = c;
    function u(d, p) {
      throw o(p), new r.ValidationException(d === void 0 ? e.DEFAULT_OVERALL_MESSAGE : d.replace("{error}", r.ValidationException.errorToString(p)), [p]);
    }
    e.throwInvalidAssert = u;
    function f(d, p) {
      throw new r.ValidationException(d ?? e.DEFAULT_OVERALL_MESSAGE, p instanceof t.ValueErrorIterator ? [...a(p)] : [p]);
    }
    e.throwInvalidValidate = f;
  }(Ul)), Ul;
}
var qO;
function Gg() {
  if (qO) return su;
  qO = 1, Object.defineProperty(su, "__esModule", { value: !0 }), su.AbstractValidator = void 0;
  const e = /* @__PURE__ */ Ac(), n = nu();
  class t {
    /**
     * @param schema JSON schema against which to validate values. When a schema
     *  provides an `errorMessage` string option, all errors occurring for that
     *  schema (but not for nested schemas) collapse into a single error having
     *  this message. The `errorMessage` option allows you to provide a custom
     *  error message for a schema. For example, an `errorMessage` on a schema
     *  for a property of an object replaces TypeBox's built-in error messages
     *  for errors that occur on that property.
     */
    constructor(i) {
      this.schema = i;
    }
    /**
     * Tests whether a value conforms to the schema, returning an iterable whose
     * iterator yields the validation errors, or returning `null` if there are no
     * validation errors. This method is equivalent to calling `test()` and then
     * `errors()` and exists only for convenience. The method does not throw
     * `ValidationException` and does not clean values of unrecognized properties.
     *
     * @param value Value to validate against the schema.
     * @returns An iteratable yielding all validation errors, if any, otherwise
     *  `null`. Upon detecting one or more errors for a particular schema
     *  (possibly a nested schema), if the schema provides an `errorMessage`
     *  property, only a single error is reported for the schema, and the
     *  `message` property of this error is set to `errorMessage`'s value. Also,
     *  the TypeBox error "Expected required property" is dropped when at least
     *  one other error is reported for the property. Consequently, only the
     *  `Type.Any` and `Type.Unknown` schemas can yield "Expected required
     *  property" errors.
     */
    testReturningErrors(i) {
      return this.test(i) ? null : this.errors(i);
    }
    /**
     * Tests whether a value conforms to the schema, returning the first error,
     * or returning `null` if there is no error. This method is equivalent to
     * calling `test()` and then `firstError()` and exists only for convenience.
     * The method does not throw `ValidationException` and does not clean values
     * of unrecognized properties.
     *
     * @param value Value to validate against the schema.
     * @returns The first validation error, if there is a validation error,
     *  otherwise `null`.
     */
    testReturningFirstError(i) {
      const o = this.testReturningErrors(i);
      if (o === null)
        return null;
      const a = o[Symbol.iterator]().next();
      return a.done ? null : a.value;
    }
    /**
     * Validates a value against the schema and returns the first error,
     * returning `null` if there is no error. No validation is performed beyond
     * the first error, allowing you to protect the server from wasting time and
     * memory validating excessively long strings. It is equivalent to calling
     * `next()` exactly once on the iterator returned by `errors()`, serving
     * only as a convenience method. For performance reasons, it is best to call
     * `test()` before calling this method. This method does not throw
     * `ValidationException` and does not clean values of unrecognized properties.
     *
     * @param value Value to validate against the schema.
     * @returns The first validation error, if there is a validation error,
     *  otherwise `null`.
     */
    firstError(i) {
      const a = this.errors(i)[Symbol.iterator]().next();
      return a.done ? null : a.value;
    }
    cleanCopyOfValue(i, o) {
      if (i.type === "object" && typeof o == "object") {
        const a = {};
        return Object.keys(i.properties).forEach((s) => {
          a[s] = o[s];
        }), a;
      }
      return o;
    }
    cleanValue(i, o) {
      if (i.type === "object" && typeof o == "object") {
        const a = Object.keys(i.properties);
        Object.getOwnPropertyNames(o).forEach((s) => {
          a.includes(s) || delete o[s];
        });
      }
    }
    uncompiledAssert(i, o, a) {
      e.Value.Check(i, o) || (0, n.throwInvalidAssert)(a, e.Value.Errors(i, o).First());
    }
    uncompiledValidate(i, o, a) {
      e.Value.Check(i, o) || (0, n.throwInvalidValidate)(a, e.Value.Errors(i, o));
    }
  }
  return su.AbstractValidator = t, su;
}
var hu = {}, KO;
function Hg() {
  if (KO) return hu;
  KO = 1, Object.defineProperty(hu, "__esModule", { value: !0 }), hu.AbstractStandardValidator = void 0;
  const e = Gg();
  class n extends e.AbstractValidator {
    /** @inheritdoc */
    constructor(r) {
      super(r);
    }
    /** @inheritdoc */
    assertAndClean(r, i) {
      this.assert(r, i), this.cleanValue(this.schema, r);
    }
    /** @inheritdoc */
    assertAndCleanCopy(r, i) {
      return this.assert(r, i), this.cleanCopyOfValue(this.schema, r);
    }
    /** @inheritdoc */
    validateAndClean(r, i) {
      this.validate(r, i), this.cleanValue(this.schema, r);
    }
    /** @inheritdoc */
    validateAndCleanCopy(r, i) {
      return this.validate(r, i), this.cleanCopyOfValue(this.schema, r);
    }
  }
  return hu.AbstractStandardValidator = n, hu;
}
var _a = {}, GO;
function wc() {
  if (GO) return _a;
  GO = 1, Object.defineProperty(_a, "__esModule", { value: !0 }), _a.AbstractTypedUnionValidator = _a.DEFAULT_DISCRIMINANT_KEY = void 0;
  const e = Gg();
  _a.DEFAULT_DISCRIMINANT_KEY = "kind";
  class n extends e.AbstractValidator {
    constructor(r) {
      super(r);
    }
    /** @inheritdoc */
    assert(r, i) {
      this.assertReturningSchema(r, i);
    }
    /** @inheritdoc */
    assertAndClean(r, i) {
      const o = this.assertReturningSchema(r, i);
      this.cleanValue(o, r);
    }
    /** @inheritdoc */
    assertAndCleanCopy(r, i) {
      const o = this.assertReturningSchema(r, i);
      return this.cleanCopyOfValue(o, r);
    }
    /** @inheritdoc */
    validate(r, i) {
      this.validateReturningSchema(r, i);
    }
    /** @inheritdoc */
    validateAndClean(r, i) {
      const o = this.validateReturningSchema(r, i);
      this.cleanValue(o, r);
    }
    /** @inheritdoc */
    validateAndCleanCopy(r, i) {
      const o = this.validateReturningSchema(r, i);
      return this.cleanCopyOfValue(o, r);
    }
    toValueKeyDereference(r) {
      return /^[a-zA-Z_$][a-zA-Z_$0-9]*$/.test(r) ? `value.${r}` : `value['${r.replace(/'/g, "\\'")}']`;
    }
  }
  return _a.AbstractTypedUnionValidator = n, _a;
}
var ba = {}, Iu = {}, HO;
function IV() {
  if (HO) return Iu;
  HO = 1, Object.defineProperty(Iu, "__esModule", { value: !0 }), Iu.StandardValidator = void 0;
  const e = Hg(), n = /* @__PURE__ */ Ac(), t = nu();
  class r extends e.AbstractStandardValidator {
    /** @inheritdoc */
    constructor(o) {
      super(o);
    }
    /** @inheritdoc */
    test(o) {
      return n.Value.Check(this.schema, o);
    }
    /** @inheritdoc */
    assert(o, a) {
      this.uncompiledAssert(this.schema, o, a);
    }
    /** @inheritdoc */
    validate(o, a) {
      this.uncompiledValidate(this.schema, o, a);
    }
    /** @inheritdoc */
    errors(o) {
      return (0, t.createErrorsIterable)(n.Value.Errors(this.schema, o));
    }
  }
  return Iu.StandardValidator = r, Iu;
}
var xr = {}, ha = {}, st = {}, kO;
function OV() {
  if (kO) return st;
  kO = 1, Object.defineProperty(st, "__esModule", { value: !0 }), st.TypeCompiler = st.Policy = st.TypeCompilerTypeGuardError = st.TypeCompilerUnknownTypeError = st.TypeCheck = void 0;
  const e = /* @__PURE__ */ Pc(), n = /* @__PURE__ */ vi(), t = /* @__PURE__ */ sg(), r = /* @__PURE__ */ on(), i = /* @__PURE__ */ pr(), o = /* @__PURE__ */ Ic(), a = /* @__PURE__ */ le(), s = /* @__PURE__ */ zs(), c = /* @__PURE__ */ fr(), u = /* @__PURE__ */ lg(), f = /* @__PURE__ */ Vn(), d = /* @__PURE__ */ ti(), p = /* @__PURE__ */ bn(), T = /* @__PURE__ */ Lv();
  class b {
    constructor(P, R, y, $) {
      this.schema = P, this.references = R, this.checkFunc = y, this.code = $, this.hasTransform = (0, e.HasTransform)(P, R);
    }
    /** Returns the generated assertion code used to validate this type. */
    Code() {
      return this.code;
    }
    /** Returns the schema type used to validate */
    Schema() {
      return this.schema;
    }
    /** Returns reference types used to validate */
    References() {
      return this.references;
    }
    /** Returns an iterator for each error in this value. */
    Errors(P) {
      return (0, n.Errors)(this.schema, this.references, P);
    }
    /** Returns true if the value matches the compiled type. */
    Check(P) {
      return this.checkFunc(P);
    }
    /** Decodes a value or throws if error */
    Decode(P) {
      if (!this.checkFunc(P))
        throw new e.TransformDecodeCheckError(this.schema, P, this.Errors(P).First());
      return this.hasTransform ? (0, e.TransformDecode)(this.schema, this.references, P) : P;
    }
    /** Encodes a value or throws if error */
    Encode(P) {
      const R = this.hasTransform ? (0, e.TransformEncode)(this.schema, this.references, P) : P;
      if (!this.checkFunc(R))
        throw new e.TransformEncodeCheckError(this.schema, P, this.Errors(P).First());
      return R;
    }
  }
  st.TypeCheck = b;
  var O;
  (function(m) {
    function P(C) {
      return C === 36;
    }
    m.DollarSign = P;
    function R(C) {
      return C === 95;
    }
    m.IsUnderscore = R;
    function y(C) {
      return C >= 65 && C <= 90 || C >= 97 && C <= 122;
    }
    m.IsAlpha = y;
    function $(C) {
      return C >= 48 && C <= 57;
    }
    m.IsNumeric = $;
  })(O || (O = {}));
  var F;
  (function(m) {
    function P(C) {
      return C.length === 0 ? !1 : O.IsNumeric(C.charCodeAt(0));
    }
    function R(C) {
      if (P(C))
        return !1;
      for (let V = 0; V < C.length; V++) {
        const G = C.charCodeAt(V);
        if (!(O.IsAlpha(G) || O.IsNumeric(G) || O.DollarSign(G) || O.IsUnderscore(G)))
          return !1;
      }
      return !0;
    }
    function y(C) {
      return C.replace(/'/g, "\\'");
    }
    function $(C, V) {
      return R(V) ? `${C}.${V}` : `${C}['${y(V)}']`;
    }
    m.Encode = $;
  })(F || (F = {}));
  var E;
  (function(m) {
    function P(R) {
      const y = [];
      for (let $ = 0; $ < R.length; $++) {
        const C = R.charCodeAt($);
        O.IsNumeric(C) || O.IsAlpha(C) ? y.push(R.charAt($)) : y.push(`_${C}_`);
      }
      return y.join("").replace(/__/g, "_");
    }
    m.Encode = P;
  })(E || (E = {}));
  var M;
  (function(m) {
    function P(R) {
      return R.replace(/'/g, "\\'");
    }
    m.Escape = P;
  })(M || (M = {}));
  class N extends r.TypeBoxError {
    constructor(P) {
      super("Unknown type"), this.schema = P;
    }
  }
  st.TypeCompilerUnknownTypeError = N;
  class w extends r.TypeBoxError {
    constructor(P) {
      super("Preflight validation check failed to guard for the given schema"), this.schema = P;
    }
  }
  st.TypeCompilerTypeGuardError = w;
  var _;
  (function(m) {
    function P(V, G, z) {
      return t.TypeSystemPolicy.ExactOptionalPropertyTypes ? `('${G}' in ${V} ? ${z} : true)` : `(${F.Encode(V, G)} !== undefined ? ${z} : true)`;
    }
    m.IsExactOptionalProperty = P;
    function R(V) {
      return t.TypeSystemPolicy.AllowArrayObject ? `(typeof ${V} === 'object' && ${V} !== null)` : `(typeof ${V} === 'object' && ${V} !== null && !Array.isArray(${V}))`;
    }
    m.IsObjectLike = R;
    function y(V) {
      return t.TypeSystemPolicy.AllowArrayObject ? `(typeof ${V} === 'object' && ${V} !== null && !(${V} instanceof Date) && !(${V} instanceof Uint8Array))` : `(typeof ${V} === 'object' && ${V} !== null && !Array.isArray(${V}) && !(${V} instanceof Date) && !(${V} instanceof Uint8Array))`;
    }
    m.IsRecordLike = y;
    function $(V) {
      return t.TypeSystemPolicy.AllowNaN ? `typeof ${V} === 'number'` : `Number.isFinite(${V})`;
    }
    m.IsNumberLike = $;
    function C(V) {
      return t.TypeSystemPolicy.AllowNullVoid ? `(${V} === undefined || ${V} === null)` : `${V} === undefined`;
    }
    m.IsVoidLike = C;
  })(_ || (st.Policy = _ = {}));
  var B;
  return function(m) {
    function P(U) {
      return U[a.Kind] === "Any" || U[a.Kind] === "Unknown";
    }
    function* R(U, ue, K) {
      yield "true";
    }
    function* y(U, ue, K) {
      yield `Array.isArray(${K})`;
      const [Ie, pe] = [A("value", "any"), A("acc", "number")];
      (0, p.IsNumber)(U.maxItems) && (yield `${K}.length <= ${U.maxItems}`), (0, p.IsNumber)(U.minItems) && (yield `${K}.length >= ${U.minItems}`);
      const ye = Te(U.items, ue, "value");
      if (yield `${K}.every((${Ie}) => ${ye})`, (0, T.IsSchema)(U.contains) || (0, p.IsNumber)(U.minContains) || (0, p.IsNumber)(U.maxContains)) {
        const Ge = (0, T.IsSchema)(U.contains) ? U.contains : (0, f.Never)(), Pe = Te(Ge, ue, "value"), Ht = (0, p.IsNumber)(U.minContains) ? [`(count >= ${U.minContains})`] : [], I = (0, p.IsNumber)(U.maxContains) ? [`(count <= ${U.maxContains})`] : [], v = `const count = value.reduce((${pe}, ${Ie}) => ${Pe} ? acc + 1 : acc, 0)`, we = ["(count > 0)", ...Ht, ...I].join(" && ");
        yield `((${Ie}) => { ${v}; return ${we}})(${K})`;
      }
      U.uniqueItems === !0 && (yield `((${Ie}) => { const set = new Set(); for(const element of value) { const hashed = hash(element); if(set.has(hashed)) { return false } else { set.add(hashed) } } return true } )(${K})`);
    }
    function* $(U, ue, K) {
      yield `(typeof value === 'object' && Symbol.asyncIterator in ${K})`;
    }
    function* C(U, ue, K) {
      yield `(typeof ${K} === 'bigint')`, (0, p.IsBigInt)(U.exclusiveMaximum) && (yield `${K} < BigInt(${U.exclusiveMaximum})`), (0, p.IsBigInt)(U.exclusiveMinimum) && (yield `${K} > BigInt(${U.exclusiveMinimum})`), (0, p.IsBigInt)(U.maximum) && (yield `${K} <= BigInt(${U.maximum})`), (0, p.IsBigInt)(U.minimum) && (yield `${K} >= BigInt(${U.minimum})`), (0, p.IsBigInt)(U.multipleOf) && (yield `(${K} % BigInt(${U.multipleOf})) === 0`);
    }
    function* V(U, ue, K) {
      yield `(typeof ${K} === 'boolean')`;
    }
    function* G(U, ue, K) {
      yield* oe(U.returns, ue, `${K}.prototype`);
    }
    function* z(U, ue, K) {
      yield `(${K} instanceof Date) && Number.isFinite(${K}.getTime())`, (0, p.IsNumber)(U.exclusiveMaximumTimestamp) && (yield `${K}.getTime() < ${U.exclusiveMaximumTimestamp}`), (0, p.IsNumber)(U.exclusiveMinimumTimestamp) && (yield `${K}.getTime() > ${U.exclusiveMinimumTimestamp}`), (0, p.IsNumber)(U.maximumTimestamp) && (yield `${K}.getTime() <= ${U.maximumTimestamp}`), (0, p.IsNumber)(U.minimumTimestamp) && (yield `${K}.getTime() >= ${U.minimumTimestamp}`), (0, p.IsNumber)(U.multipleOfTimestamp) && (yield `(${K}.getTime() % ${U.multipleOfTimestamp}) === 0`);
    }
    function* ie(U, ue, K) {
      yield `(typeof ${K} === 'function')`;
    }
    function* ae(U, ue, K) {
      const Ie = globalThis.Object.getOwnPropertyNames(U.$defs).reduce((pe, ye) => [...pe, U.$defs[ye]], []);
      yield* oe((0, d.Ref)(U.$ref), [...ue, ...Ie], K);
    }
    function* k(U, ue, K) {
      yield `Number.isInteger(${K})`, (0, p.IsNumber)(U.exclusiveMaximum) && (yield `${K} < ${U.exclusiveMaximum}`), (0, p.IsNumber)(U.exclusiveMinimum) && (yield `${K} > ${U.exclusiveMinimum}`), (0, p.IsNumber)(U.maximum) && (yield `${K} <= ${U.maximum}`), (0, p.IsNumber)(U.minimum) && (yield `${K} >= ${U.minimum}`), (0, p.IsNumber)(U.multipleOf) && (yield `(${K} % ${U.multipleOf}) === 0`);
    }
    function* $e(U, ue, K) {
      const Ie = U.allOf.map((pe) => Te(pe, ue, K)).join(" && ");
      if (U.unevaluatedProperties === !1) {
        const pe = Gt(`${new RegExp((0, c.KeyOfPattern)(U))};`), ye = `Object.getOwnPropertyNames(${K}).every(key => ${pe}.test(key))`;
        yield `(${Ie} && ${ye})`;
      } else if ((0, T.IsSchema)(U.unevaluatedProperties)) {
        const pe = Gt(`${new RegExp((0, c.KeyOfPattern)(U))};`), ye = `Object.getOwnPropertyNames(${K}).every(key => ${pe}.test(key) || ${Te(U.unevaluatedProperties, ue, `${K}[key]`)})`;
        yield `(${Ie} && ${ye})`;
      } else
        yield `(${Ie})`;
    }
    function* He(U, ue, K) {
      yield `(typeof value === 'object' && Symbol.iterator in ${K})`;
    }
    function* Je(U, ue, K) {
      typeof U.const == "number" || typeof U.const == "boolean" ? yield `(${K} === ${U.const})` : yield `(${K} === '${M.Escape(U.const)}')`;
    }
    function* We(U, ue, K) {
      yield "false";
    }
    function* Ye(U, ue, K) {
      yield `(!${Te(U.not, ue, K)})`;
    }
    function* Me(U, ue, K) {
      yield `(${K} === null)`;
    }
    function* en(U, ue, K) {
      yield _.IsNumberLike(K), (0, p.IsNumber)(U.exclusiveMaximum) && (yield `${K} < ${U.exclusiveMaximum}`), (0, p.IsNumber)(U.exclusiveMinimum) && (yield `${K} > ${U.exclusiveMinimum}`), (0, p.IsNumber)(U.maximum) && (yield `${K} <= ${U.maximum}`), (0, p.IsNumber)(U.minimum) && (yield `${K} >= ${U.minimum}`), (0, p.IsNumber)(U.multipleOf) && (yield `(${K} % ${U.multipleOf}) === 0`);
    }
    function* Q(U, ue, K) {
      yield _.IsObjectLike(K), (0, p.IsNumber)(U.minProperties) && (yield `Object.getOwnPropertyNames(${K}).length >= ${U.minProperties}`), (0, p.IsNumber)(U.maxProperties) && (yield `Object.getOwnPropertyNames(${K}).length <= ${U.maxProperties}`);
      const Ie = Object.getOwnPropertyNames(U.properties);
      for (const pe of Ie) {
        const ye = F.Encode(K, pe), Ge = U.properties[pe];
        if (U.required && U.required.includes(pe))
          yield* oe(Ge, ue, ye), ((0, u.ExtendsUndefinedCheck)(Ge) || P(Ge)) && (yield `('${pe}' in ${K})`);
        else {
          const Pe = Te(Ge, ue, ye);
          yield _.IsExactOptionalProperty(K, pe, Pe);
        }
      }
      if (U.additionalProperties === !1)
        if (U.required && U.required.length === Ie.length)
          yield `Object.getOwnPropertyNames(${K}).length === ${Ie.length}`;
        else {
          const pe = `[${Ie.map((ye) => `'${ye}'`).join(", ")}]`;
          yield `Object.getOwnPropertyNames(${K}).every(key => ${pe}.includes(key))`;
        }
      if (typeof U.additionalProperties == "object") {
        const pe = Te(U.additionalProperties, ue, `${K}[key]`), ye = `[${Ie.map((Ge) => `'${Ge}'`).join(", ")}]`;
        yield `(Object.getOwnPropertyNames(${K}).every(key => ${ye}.includes(key) || ${pe}))`;
      }
    }
    function* re(U, ue, K) {
      yield `(typeof value === 'object' && typeof ${K}.then === 'function')`;
    }
    function* Ae(U, ue, K) {
      yield _.IsRecordLike(K), (0, p.IsNumber)(U.minProperties) && (yield `Object.getOwnPropertyNames(${K}).length >= ${U.minProperties}`), (0, p.IsNumber)(U.maxProperties) && (yield `Object.getOwnPropertyNames(${K}).length <= ${U.maxProperties}`);
      const [Ie, pe] = Object.entries(U.patternProperties)[0], ye = Gt(`${new RegExp(Ie)}`), Ge = Te(pe, ue, "value"), Pe = (0, T.IsSchema)(U.additionalProperties) ? Te(U.additionalProperties, ue, K) : U.additionalProperties === !1 ? "false" : "true", Ht = `(${ye}.test(key) ? ${Ge} : ${Pe})`;
      yield `(Object.entries(${K}).every(([key, value]) => ${Ht}))`;
    }
    function* Re(U, ue, K) {
      const Ie = (0, i.Deref)(U, ue);
      if (ge.functions.has(U.$ref))
        return yield `${Xe(U.$ref)}(${K})`;
      yield* oe(Ie, ue, K);
    }
    function* ne(U, ue, K) {
      const Ie = Gt(`${new RegExp(U.source, U.flags)};`);
      yield `(typeof ${K} === 'string')`, (0, p.IsNumber)(U.maxLength) && (yield `${K}.length <= ${U.maxLength}`), (0, p.IsNumber)(U.minLength) && (yield `${K}.length >= ${U.minLength}`), yield `${Ie}.test(${K})`;
    }
    function* Y(U, ue, K) {
      yield `(typeof ${K} === 'string')`, (0, p.IsNumber)(U.maxLength) && (yield `${K}.length <= ${U.maxLength}`), (0, p.IsNumber)(U.minLength) && (yield `${K}.length >= ${U.minLength}`), U.pattern !== void 0 && (yield `${Gt(`${new RegExp(U.pattern)};`)}.test(${K})`), U.format !== void 0 && (yield `format('${U.format}', ${K})`);
    }
    function* D(U, ue, K) {
      yield `(typeof ${K} === 'symbol')`;
    }
    function* g(U, ue, K) {
      yield `(typeof ${K} === 'string')`, yield `${Gt(`${new RegExp(U.pattern)};`)}.test(${K})`;
    }
    function* h(U, ue, K) {
      yield `${Xe(U.$ref)}(${K})`;
    }
    function* j(U, ue, K) {
      if (yield `Array.isArray(${K})`, U.items === void 0)
        return yield `${K}.length === 0`;
      yield `(${K}.length === ${U.maxItems})`;
      for (let Ie = 0; Ie < U.items.length; Ie++)
        yield `${Te(U.items[Ie], ue, `${K}[${Ie}]`)}`;
    }
    function* H(U, ue, K) {
      yield `${K} === undefined`;
    }
    function* l(U, ue, K) {
      yield `(${U.anyOf.map((pe) => Te(pe, ue, K)).join(" || ")})`;
    }
    function* X(U, ue, K) {
      yield `${K} instanceof Uint8Array`, (0, p.IsNumber)(U.maxByteLength) && (yield `(${K}.length <= ${U.maxByteLength})`), (0, p.IsNumber)(U.minByteLength) && (yield `(${K}.length >= ${U.minByteLength})`);
    }
    function* q(U, ue, K) {
      yield "true";
    }
    function* x(U, ue, K) {
      yield _.IsVoidLike(K);
    }
    function* de(U, ue, K) {
      const Ie = ge.instances.size;
      ge.instances.set(Ie, U), yield `kind('${U[a.Kind]}', ${Ie}, ${K})`;
    }
    function* oe(U, ue, K, Ie = !0) {
      const pe = (0, p.IsString)(U.$id) ? [...ue, U] : ue, ye = U;
      if (Ie && (0, p.IsString)(U.$id)) {
        const Ge = Xe(U.$id);
        if (ge.functions.has(Ge))
          return yield `${Ge}(${K})`;
        {
          ge.functions.set(Ge, "<deferred>");
          const Pe = nn(Ge, U, ue, "value", !1);
          return ge.functions.set(Ge, Pe), yield `${Ge}(${K})`;
        }
      }
      switch (ye[a.Kind]) {
        case "Any":
          return yield* R();
        case "Array":
          return yield* y(ye, pe, K);
        case "AsyncIterator":
          return yield* $(ye, pe, K);
        case "BigInt":
          return yield* C(ye, pe, K);
        case "Boolean":
          return yield* V(ye, pe, K);
        case "Constructor":
          return yield* G(ye, pe, K);
        case "Date":
          return yield* z(ye, pe, K);
        case "Function":
          return yield* ie(ye, pe, K);
        case "Import":
          return yield* ae(ye, pe, K);
        case "Integer":
          return yield* k(ye, pe, K);
        case "Intersect":
          return yield* $e(ye, pe, K);
        case "Iterator":
          return yield* He(ye, pe, K);
        case "Literal":
          return yield* Je(ye, pe, K);
        case "Never":
          return yield* We();
        case "Not":
          return yield* Ye(ye, pe, K);
        case "Null":
          return yield* Me(ye, pe, K);
        case "Number":
          return yield* en(ye, pe, K);
        case "Object":
          return yield* Q(ye, pe, K);
        case "Promise":
          return yield* re(ye, pe, K);
        case "Record":
          return yield* Ae(ye, pe, K);
        case "Ref":
          return yield* Re(ye, pe, K);
        case "RegExp":
          return yield* ne(ye, pe, K);
        case "String":
          return yield* Y(ye, pe, K);
        case "Symbol":
          return yield* D(ye, pe, K);
        case "TemplateLiteral":
          return yield* g(ye, pe, K);
        case "This":
          return yield* h(ye, pe, K);
        case "Tuple":
          return yield* j(ye, pe, K);
        case "Undefined":
          return yield* H(ye, pe, K);
        case "Union":
          return yield* l(ye, pe, K);
        case "Uint8Array":
          return yield* X(ye, pe, K);
        case "Unknown":
          return yield* q();
        case "Void":
          return yield* x(ye, pe, K);
        default:
          if (!s.TypeRegistry.Has(ye[a.Kind]))
            throw new N(U);
          return yield* de(ye, pe, K);
      }
    }
    const ge = {
      language: "javascript",
      // target language
      functions: /* @__PURE__ */ new Map(),
      // local functions
      variables: /* @__PURE__ */ new Map(),
      // local variables
      instances: /* @__PURE__ */ new Map()
      // exterior kind instances
    };
    function Te(U, ue, K, Ie = !0) {
      return `(${[...oe(U, ue, K, Ie)].join(" && ")})`;
    }
    function Xe(U) {
      return `check_${E.Encode(U)}`;
    }
    function Gt(U) {
      const ue = `local_${ge.variables.size}`;
      return ge.variables.set(ue, `const ${ue} = ${U}`), ue;
    }
    function nn(U, ue, K, Ie, pe = !0) {
      const [ye, Ge] = [`
`, (v) => "".padStart(v, " ")], Pe = A("value", "any"), Ht = Ce("boolean"), I = [...oe(ue, K, Ie, pe)].map((v) => `${Ge(4)}${v}`).join(` &&${ye}`);
      return `function ${U}(${Pe})${Ht} {${ye}${Ge(2)}return (${ye}${I}${ye}${Ge(2)})
}`;
    }
    function A(U, ue) {
      const K = ge.language === "typescript" ? `: ${ue}` : "";
      return `${U}${K}`;
    }
    function Ce(U) {
      return ge.language === "typescript" ? `: ${U}` : "";
    }
    function zn(U, ue, K) {
      const Ie = nn("check", U, ue, "value"), pe = A("value", "any"), ye = Ce("boolean"), Ge = [...ge.functions.values()], Pe = [...ge.variables.values()], Ht = (0, p.IsString)(U.$id) ? `return function check(${pe})${ye} {
  return ${Xe(U.$id)}(value)
}` : `return ${Ie}`;
      return [...Pe, ...Ge, Ht].join(`
`);
    }
    function Sc(...U) {
      const ue = { language: "javascript" }, [K, Ie, pe] = U.length === 2 && (0, p.IsArray)(U[1]) ? [U[0], U[1], ue] : U.length === 2 && !(0, p.IsArray)(U[1]) ? [U[0], [], U[1]] : U.length === 3 ? [U[0], U[1], U[2]] : U.length === 1 ? [U[0], [], ue] : [null, [], ue];
      if (ge.language = pe.language, ge.variables.clear(), ge.functions.clear(), ge.instances.clear(), !(0, T.IsSchema)(K))
        throw new w(K);
      for (const ye of Ie)
        if (!(0, T.IsSchema)(ye))
          throw new w(ye);
      return zn(K, Ie);
    }
    m.Code = Sc;
    function yl(U, ue = []) {
      const K = Sc(U, ue, { language: "javascript" }), Ie = globalThis.Function("kind", "format", "hash", K), pe = new Map(ge.instances);
      function ye(I, v, we) {
        if (!s.TypeRegistry.Has(I) || !pe.has(v))
          return !1;
        const qn = s.TypeRegistry.Get(I), ml = pe.get(v);
        return qn(ml, we);
      }
      function Ge(I, v) {
        return s.FormatRegistry.Has(I) ? s.FormatRegistry.Get(I)(v) : !1;
      }
      function Pe(I) {
        return (0, o.Hash)(I);
      }
      const Ht = Ie(ye, Ge, Pe);
      return new b(U, ue, Ht, K);
    }
    m.Compile = yl;
  }(B || (st.TypeCompiler = B = {})), st;
}
var WO;
function _S() {
  return WO || (WO = 1, function(e) {
    var n = ha && ha.__createBinding || (Object.create ? function(i, o, a, s) {
      s === void 0 && (s = a);
      var c = Object.getOwnPropertyDescriptor(o, a);
      (!c || ("get" in c ? !o.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return o[a];
      } }), Object.defineProperty(i, s, c);
    } : function(i, o, a, s) {
      s === void 0 && (s = a), i[s] = o[a];
    }), t = ha && ha.__exportStar || function(i, o) {
      for (var a in i) a !== "default" && !Object.prototype.hasOwnProperty.call(o, a) && n(o, i, a);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueErrorIterator = e.ValueErrorType = void 0;
    var r = /* @__PURE__ */ vi();
    Object.defineProperty(e, "ValueErrorType", { enumerable: !0, get: function() {
      return r.ValueErrorType;
    } }), Object.defineProperty(e, "ValueErrorIterator", { enumerable: !0, get: function() {
      return r.ValueErrorIterator;
    } }), t(/* @__PURE__ */ OV(), e);
  }(ha)), ha;
}
var zO;
function PV() {
  if (zO) return xr;
  zO = 1;
  var e = xr && xr.__classPrivateFieldGet || function(s, c, u, f) {
    if (u === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof c == "function" ? s !== c || !f : !c.has(s)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return u === "m" ? f : u === "a" ? f.call(s) : f ? f.value : c.get(s);
  }, n = xr && xr.__classPrivateFieldSet || function(s, c, u, f, d) {
    if (f === "m") throw new TypeError("Private method is not writable");
    if (f === "a" && !d) throw new TypeError("Private accessor was defined without a setter");
    if (typeof c == "function" ? s !== c || !d : !c.has(s)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return f === "a" ? d.call(s, u) : d ? d.value = u : c.set(s, u), u;
  }, t;
  Object.defineProperty(xr, "__esModule", { value: !0 }), xr.CompilingStandardValidator = void 0;
  const r = /* @__PURE__ */ _S(), i = Hg(), o = nu();
  class a extends i.AbstractStandardValidator {
    /** @inheritdoc */
    constructor(c) {
      super(c), t.set(this, void 0);
    }
    /** @inheritdoc */
    test(c) {
      return this.getCompiledType().Check(c);
    }
    /** @inheritdoc */
    assert(c, u) {
      const f = this.getCompiledType();
      f.Check(c) || (0, o.throwInvalidAssert)(u, f.Errors(c).First());
    }
    /** @inheritdoc */
    validate(c, u) {
      const f = this.getCompiledType();
      f.Check(c) || (0, o.throwInvalidValidate)(u, f.Errors(c));
    }
    /** @inheritdoc */
    errors(c) {
      const u = this.getCompiledType();
      return (0, o.createErrorsIterable)(u.Errors(c));
    }
    getCompiledType() {
      return e(this, t, "f") === void 0 && n(this, t, r.TypeCompiler.Compile(this.schema), "f"), e(this, t, "f");
    }
  }
  return xr.CompilingStandardValidator = a, t = /* @__PURE__ */ new WeakMap(), xr;
}
var JO;
function AV() {
  return JO || (JO = 1, function(e) {
    var n = ba && ba.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = ba && ba.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(IV(), e), t(PV(), e);
  }(ba)), ba;
}
var Ia = {}, Fr = {}, Hl = {}, YO;
function bS() {
  return YO || (YO = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.TypeIdentifyingKeyIndex = e.MESSAGE_MEMBERS_MISSING_KEY = e.MESSAGE_MULTIPLE_MEMBERS_WITH_SAME_KEY = e.MESSAGE_MEMBER_WITH_MULTIPLE_KEYS = e.MESSAGE_OPTIONAL_TYPE_ID_KEY = void 0;
    const n = /* @__PURE__ */ gS();
    e.MESSAGE_OPTIONAL_TYPE_ID_KEY = "Type identifying key cannot be optional", e.MESSAGE_MEMBER_WITH_MULTIPLE_KEYS = "Union has member with multiple identifying keys", e.MESSAGE_MULTIPLE_MEMBERS_WITH_SAME_KEY = "Union has multiple members with same identifying key", e.MESSAGE_MEMBERS_MISSING_KEY = "Union has members missing identifying keys";
    class t {
      constructor(i) {
        this.schema = i;
      }
      cacheKeys() {
        const i = this.schema.anyOf.length, o = /* @__PURE__ */ new Set();
        this.keyByMemberIndex = new Array(i);
        for (let a = 0; a < i; ++a) {
          const s = this.schema.anyOf[a];
          for (const [c, u] of Object.entries(s.properties))
            if (u.typeIdentifyingKey) {
              if (u[n.Optional] == "Optional")
                throw Error(e.MESSAGE_OPTIONAL_TYPE_ID_KEY);
              if (this.keyByMemberIndex[a] !== void 0)
                throw Error(e.MESSAGE_MEMBER_WITH_MULTIPLE_KEYS);
              if (o.has(c))
                throw Error(e.MESSAGE_MULTIPLE_MEMBERS_WITH_SAME_KEY);
              this.keyByMemberIndex[a] = c, o.add(c);
            }
        }
        if (o.size < i)
          throw this.keyByMemberIndex = void 0, Error(e.MESSAGE_MEMBERS_MISSING_KEY);
      }
    }
    e.TypeIdentifyingKeyIndex = t;
  }(Hl)), Hl;
}
var XO;
function wV() {
  if (XO) return Fr;
  XO = 1;
  var e = Fr && Fr.__classPrivateFieldSet || function(c, u, f, d, p) {
    if (d === "m") throw new TypeError("Private method is not writable");
    if (d === "a" && !p) throw new TypeError("Private accessor was defined without a setter");
    if (typeof u == "function" ? c !== u || !p : !u.has(c)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return d === "a" ? p.call(c, f) : p ? p.value = f : u.set(c, f), f;
  }, n = Fr && Fr.__classPrivateFieldGet || function(c, u, f, d) {
    if (f === "a" && !d) throw new TypeError("Private accessor was defined without a getter");
    if (typeof u == "function" ? c !== u || !d : !u.has(c)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return f === "m" ? d : f === "a" ? d.call(c) : d ? d.value : u.get(c);
  }, t;
  Object.defineProperty(Fr, "__esModule", { value: !0 }), Fr.HeterogeneousUnionValidator = void 0;
  const r = /* @__PURE__ */ Ac(), i = wc(), o = nu(), a = bS();
  class s extends i.AbstractTypedUnionValidator {
    /** @inheritdoc */
    constructor(u) {
      super(u), t.set(this, void 0), e(this, t, new a.TypeIdentifyingKeyIndex(u), "f");
    }
    /** @inheritdoc */
    test(u) {
      const f = this.findSchemaMemberIndex(u);
      return typeof f != "number" ? !1 : r.Value.Check(this.schema.anyOf[f], u);
    }
    /** @inheritdoc */
    errors(u) {
      const f = this.findSchemaMemberIndex(u);
      if (typeof f != "number")
        return (0, o.createUnionTypeErrorIterable)(f);
      const d = this.schema.anyOf[f];
      return (0, o.createErrorsIterable)(r.Value.Errors(d, u));
    }
    assertReturningSchema(u, f) {
      const d = this.findSchemaMemberIndex(u);
      typeof d != "number" && (0, o.throwInvalidAssert)(f, d);
      const p = this.schema.anyOf[d];
      return this.uncompiledAssert(p, u, f), p;
    }
    validateReturningSchema(u, f) {
      const d = this.findSchemaMemberIndex(u);
      typeof d != "number" && (0, o.throwInvalidValidate)(f, d);
      const p = this.schema.anyOf[d];
      return this.uncompiledValidate(p, u, f), p;
    }
    findSchemaMemberIndex(u) {
      if (n(this, t, "f").keyByMemberIndex === void 0 && n(this, t, "f").cacheKeys(), typeof u == "object" && u !== null)
        for (let f = 0; f < this.schema.anyOf.length; ++f) {
          const d = n(this, t, "f").keyByMemberIndex[f];
          if (u[d] !== void 0)
            return f;
        }
      return (0, o.createUnionTypeError)(this.schema, u);
    }
  }
  return Fr.HeterogeneousUnionValidator = s, t = /* @__PURE__ */ new WeakMap(), Fr;
}
var Nr = {}, Dr = {}, QO;
function hS() {
  if (QO) return Dr;
  QO = 1;
  var e = Dr && Dr.__classPrivateFieldSet || function(c, u, f, d, p) {
    if (d === "m") throw new TypeError("Private method is not writable");
    if (d === "a" && !p) throw new TypeError("Private accessor was defined without a setter");
    if (typeof u == "function" ? c !== u || !p : !u.has(c)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return d === "a" ? p.call(c, f) : p ? p.value = f : u.set(c, f), f;
  }, n = Dr && Dr.__classPrivateFieldGet || function(c, u, f, d) {
    if (f === "a" && !d) throw new TypeError("Private accessor was defined without a getter");
    if (typeof u == "function" ? c !== u || !d : !u.has(c)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return f === "m" ? d : f === "a" ? d.call(c) : d ? d.value : u.get(c);
  }, t;
  Object.defineProperty(Dr, "__esModule", { value: !0 }), Dr.AbstractCompilingTypedUnionValidator = void 0;
  const r = /* @__PURE__ */ Ac(), i = /* @__PURE__ */ _S(), o = wc(), a = nu();
  class s extends o.AbstractTypedUnionValidator {
    /** @inheritdoc */
    constructor(u) {
      super(u), t.set(this, void 0), e(this, t, new Array(u.anyOf.length), "f");
    }
    /** @inheritdoc */
    test(u) {
      const f = this.compiledFindSchemaMemberIndex(u);
      return this.compiledSchemaMemberTest(f, u);
    }
    /** @inheritdoc */
    errors(u) {
      const f = this.compiledFindSchemaMemberIndexOrError(u);
      return typeof f != "number" ? (0, a.createUnionTypeErrorIterable)(f) : (0, a.createErrorsIterable)(r.Value.Errors(this.schema.anyOf[f], u));
    }
    assertReturningSchema(u, f) {
      const d = this.compiledFindSchemaMemberIndexOrError(u);
      typeof d != "number" && (0, a.throwInvalidAssert)(f, d);
      const p = this.schema.anyOf[d];
      return this.compiledSchemaMemberTest(d, u) || (0, a.throwInvalidAssert)(f, r.Value.Errors(p, u).First()), p;
    }
    validateReturningSchema(u, f) {
      const d = this.compiledFindSchemaMemberIndexOrError(u);
      typeof d != "number" && (0, a.throwInvalidValidate)(f, d);
      const p = this.schema.anyOf[d];
      return this.compiledSchemaMemberTest(d, u) || (0, a.throwInvalidValidate)(f, r.Value.Errors(p, u)), p;
    }
    compiledFindSchemaMemberIndexOrError(u) {
      const f = this.compiledFindSchemaMemberIndex(u);
      return f === null ? (0, a.createUnionTypeError)(this.schema, u) : f;
    }
    compiledSchemaMemberTest(u, f) {
      if (u === null)
        return !1;
      if (n(this, t, "f")[u] === void 0) {
        let d = i.TypeCompiler.Compile(this.schema.anyOf[u]).Code();
        d = d.replace("(typeof value === 'object' && value !== null && !Array.isArray(value)) &&", "");
        const p = d.indexOf("function"), T = d.indexOf("return", p);
        d = "return " + d.substring(d.indexOf("(", T), d.length - 1), n(this, t, "f")[u] = new Function("value", d);
      }
      return n(this, t, "f")[u](f);
    }
  }
  return Dr.AbstractCompilingTypedUnionValidator = s, t = /* @__PURE__ */ new WeakMap(), Dr;
}
var ZO;
function vV() {
  if (ZO) return Nr;
  ZO = 1;
  var e = Nr && Nr.__classPrivateFieldSet || function(s, c, u, f, d) {
    if (f === "m") throw new TypeError("Private method is not writable");
    if (f === "a" && !d) throw new TypeError("Private accessor was defined without a setter");
    if (typeof c == "function" ? s !== c || !d : !c.has(s)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return f === "a" ? d.call(s, u) : d ? d.value = u : c.set(s, u), u;
  }, n = Nr && Nr.__classPrivateFieldGet || function(s, c, u, f) {
    if (u === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof c == "function" ? s !== c || !f : !c.has(s)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return u === "m" ? f : u === "a" ? f.call(s) : f ? f.value : c.get(s);
  }, t, r;
  Object.defineProperty(Nr, "__esModule", { value: !0 }), Nr.CompilingHeterogeneousUnionValidator = void 0;
  const i = hS(), o = bS();
  class a extends i.AbstractCompilingTypedUnionValidator {
    /** @inheritdoc */
    constructor(c) {
      super(c), t.set(this, void 0), r.set(this, void 0), e(this, t, new o.TypeIdentifyingKeyIndex(c), "f");
    }
    compiledFindSchemaMemberIndex(c) {
      if (n(this, r, "f") === void 0) {
        n(this, t, "f").cacheKeys();
        const u = [
          "return ((typeof value !== 'object' || value === null || Array.isArray(value)) ? null : "
        ];
        for (let f = 0; f < this.schema.anyOf.length; ++f) {
          const d = n(this, t, "f").keyByMemberIndex[f];
          u.push(`${this.toValueKeyDereference(d)} !== undefined ? ${f} : `);
        }
        e(this, r, new Function("value", u.join("") + "null)"), "f");
      }
      return n(this, r, "f").call(this, c);
    }
  }
  return Nr.CompilingHeterogeneousUnionValidator = a, t = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap(), Nr;
}
var Ou = {}, eP;
function SV() {
  if (eP) return Ou;
  eP = 1, Object.defineProperty(Ou, "__esModule", { value: !0 }), Ou.TypeIdentifyingKey = void 0;
  function e(n) {
    return Object.assign(Object.assign({}, n), { typeIdentifyingKey: !0 });
  }
  return Ou.TypeIdentifyingKey = e, Ou;
}
var nP;
function RV() {
  return nP || (nP = 1, function(e) {
    var n = Ia && Ia.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Ia && Ia.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(wV(), e), t(vV(), e), t(SV(), e);
  }(Ia)), Ia;
}
var Oa = {}, Ur = {}, tP;
function EV() {
  if (tP) return Ur;
  tP = 1;
  var e = Ur && Ur.__classPrivateFieldGet || function(s, c, u, f) {
    if (u === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof c == "function" ? s !== c || !f : !c.has(s)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return u === "m" ? f : u === "a" ? f.call(s) : f ? f.value : c.get(s);
  }, n = Ur && Ur.__classPrivateFieldSet || function(s, c, u, f, d) {
    if (f === "m") throw new TypeError("Private method is not writable");
    if (f === "a" && !d) throw new TypeError("Private accessor was defined without a setter");
    if (typeof c == "function" ? s !== c || !d : !c.has(s)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return f === "a" ? d.call(s, u) : d ? d.value = u : c.set(s, u), u;
  }, t;
  Object.defineProperty(Ur, "__esModule", { value: !0 }), Ur.DiscriminatedUnionValidator = void 0;
  const r = /* @__PURE__ */ Ac(), i = wc(), o = nu();
  class a extends i.AbstractTypedUnionValidator {
    /** @inheritdoc */
    constructor(c) {
      var u;
      super(c), t.set(this, !1), this.discriminantKey = (u = this.schema.discriminantKey) !== null && u !== void 0 ? u : i.DEFAULT_DISCRIMINANT_KEY;
    }
    /** @inheritdoc */
    test(c) {
      const u = this.findSchemaMemberIndex(c);
      return typeof u != "number" ? !1 : r.Value.Check(this.schema.anyOf[u], c);
    }
    /** @inheritdoc */
    errors(c) {
      const u = this.findSchemaMemberIndex(c);
      if (typeof u != "number")
        return (0, o.createUnionTypeErrorIterable)(u);
      const f = this.schema.anyOf[u];
      return (0, o.createErrorsIterable)(r.Value.Errors(f, c));
    }
    assertReturningSchema(c, u) {
      const f = this.findSchemaMemberIndex(c);
      typeof f != "number" && (0, o.throwInvalidAssert)(u, f);
      const d = this.schema.anyOf[f];
      return this.uncompiledAssert(d, c, u), d;
    }
    validateReturningSchema(c, u) {
      const f = this.findSchemaMemberIndex(c);
      typeof f != "number" && (0, o.throwInvalidValidate)(u, f);
      const d = this.schema.anyOf[f];
      return this.uncompiledValidate(d, c, u), d;
    }
    findSchemaMemberIndex(c) {
      if (!e(this, t, "f")) {
        for (const u of this.schema.anyOf)
          if (u.properties[this.discriminantKey] === void 0)
            throw Error(`Discriminant key '${this.discriminantKey}' not present in all members of discriminated union`);
        n(this, t, !0, "f");
      }
      if (typeof c == "object" && c !== null) {
        const u = c[this.discriminantKey];
        if (u !== void 0)
          for (let f = 0; f < this.schema.anyOf.length; ++f) {
            const d = this.schema.anyOf[f].properties[this.discriminantKey];
            if (d !== void 0 && d.const === u)
              return f;
          }
      }
      return (0, o.createUnionTypeError)(this.schema, c);
    }
  }
  return Ur.DiscriminatedUnionValidator = a, t = /* @__PURE__ */ new WeakMap(), Ur;
}
var Lr = {}, rP;
function $V() {
  if (rP) return Lr;
  rP = 1;
  var e = Lr && Lr.__classPrivateFieldSet || function(s, c, u, f, d) {
    if (f === "m") throw new TypeError("Private method is not writable");
    if (f === "a" && !d) throw new TypeError("Private accessor was defined without a setter");
    if (typeof c == "function" ? s !== c || !d : !c.has(s)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return f === "a" ? d.call(s, u) : d ? d.value = u : c.set(s, u), u;
  }, n = Lr && Lr.__classPrivateFieldGet || function(s, c, u, f) {
    if (u === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof c == "function" ? s !== c || !f : !c.has(s)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return u === "m" ? f : u === "a" ? f.call(s) : f ? f.value : c.get(s);
  }, t, r;
  Object.defineProperty(Lr, "__esModule", { value: !0 }), Lr.CompilingDiscriminatedUnionValidator = void 0;
  const i = wc(), o = hS();
  class a extends o.AbstractCompilingTypedUnionValidator {
    /** @inheritdoc */
    constructor(c) {
      var u;
      super(c), t.set(this, void 0), r.set(this, void 0), e(this, t, (u = this.schema.discriminantKey) !== null && u !== void 0 ? u : i.DEFAULT_DISCRIMINANT_KEY, "f");
    }
    compiledFindSchemaMemberIndex(c) {
      if (n(this, r, "f") === void 0) {
        const u = [
          `if (typeof value !== 'object' || value === null || Array.isArray(value)) return null;
          switch (${this.toValueKeyDereference(n(this, t, "f"))}) {
`
        ];
        for (let d = 0; d < this.schema.anyOf.length; ++d) {
          const p = this.schema.anyOf[d].properties[n(this, t, "f")];
          if (p === void 0)
            throw Error(`Discriminant key '${n(this, t, "f")}' not present in all members of discriminated union`);
          const T = p.const;
          typeof T == "string" ? u.push(`case '${T.replace(/'/g, "\\'")}': return ${d};
`) : u.push(`case ${T}: return ${d};
`);
        }
        const f = u.join("") + "default: return null; }";
        e(this, r, new Function("value", f), "f");
      }
      return n(this, r, "f").call(this, c);
    }
  }
  return Lr.CompilingDiscriminatedUnionValidator = a, t = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap(), Lr;
}
var iP;
function IS() {
  return iP || (iP = 1, function(e) {
    var n = Oa && Oa.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Oa && Oa.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(EV(), e), t($V(), e);
  }(Oa)), Oa;
}
var oP;
function MV() {
  return oP || (oP = 1, function(e) {
    var n = Ri && Ri.__createBinding || (Object.create ? function(r, i, o, a) {
      a === void 0 && (a = o);
      var s = Object.getOwnPropertyDescriptor(i, o);
      (!s || ("get" in s ? !i.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return i[o];
      } }), Object.defineProperty(r, a, s);
    } : function(r, i, o, a) {
      a === void 0 && (a = o), r[a] = i[o];
    }), t = Ri && Ri.__exportStar || function(r, i) {
      for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(i, o) && n(i, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(Gg(), e), t(Hg(), e), t(wc(), e), t(AV(), e), t(RV(), e), t(IS(), e), t(TS(), e);
  }(Ri)), Ri;
}
MV();
IS();
const Aa = class Aa {
  constructor(n) {
    this.config = n, this.registerFormats(), this.registerTypes();
  }
  static getInstance(n) {
    return Aa.instance || (Aa.instance = new Aa(n)), Aa.instance;
  }
  assertHasRegistry(n) {
    if (!Up(n[se]))
      throw new Error(`Please register @codelab/${n} to Typebox first`);
  }
  tSchema(n) {
    const t = this.config.schemaKindMap.find(([r]) => r === n);
    if (!t)
      throw console.error("Failed to find schema for kind:", n), console.error(
        "Available schemas:",
        this.config.schemaKindMap.map(([r]) => r)
      ), new Error("Schema not found");
    return t[1];
  }
  registerFormat(n, t) {
    RB(n, t);
  }
  registerFormats() {
    for (const [n, t] of this.config.formatMap)
      this.registerFormat(n, t);
  }
  registerType(n, t) {
    $B(n[se], (r, i) => hv(t, i));
  }
  registerTypes() {
    for (const [n, t] of this.config.schemaKindMap)
      this.registerType(n, t);
  }
};
Jg(Aa, "instance");
let Ry = Aa;
const CV = [
  [FN, NN],
  [mv, og],
  [LN, VN],
  [jN, xN],
  [DN, UN],
  [MN, CN],
  [BN, li],
  [kN, WN],
  [qN, KN]
], BV = [["ipv4", HN]];
Ry.getInstance({
  formatMap: BV,
  schemaKindMap: CV
});
const J = {
  DiscriminatedRef: RN,
  IsUnion: PN,
  Nullish: AN,
  OmitOwner: wN,
  Overwrite: SN,
  RefSchema: og,
  Serialized: $N,
  TRef: mv
}, tu = S.Object({
  data: S.String(),
  id: S.String()
});
var jV = Object.defineProperty, xV = (e, n, t) => n in e ? jV(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, FV = (e, n, t) => xV(e, n + "", t), ru = /* @__PURE__ */ ((e) => (e.ApiAction = "ApiAction", e.CodeAction = "CodeAction", e))(ru || {}), kg = /* @__PURE__ */ ((e) => (e.AntDesignAffix = "AntDesignAffix", e.AntDesignAlert = "AntDesignAlert", e.AntDesignAnchor = "AntDesignAnchor", e.AntDesignAutoComplete = "AntDesignAutoComplete", e.AntDesignAvatar = "AntDesignAvatar", e.AntDesignBackTop = "AntDesignBackTop", e.AntDesignBadge = "AntDesignBadge", e.AntDesignBreadcrumb = "AntDesignBreadcrumb", e.AntDesignButton = "AntDesignButton", e.AntDesignCalendar = "AntDesignCalendar", e.AntDesignCard = "AntDesignCard", e.AntDesignCardMeta = "AntDesignCardMeta", e.AntDesignCarousel = "AntDesignCarousel", e.AntDesignCascader = "AntDesignCascader", e.AntDesignCheckbox = "AntDesignCheckbox", e.AntDesignCheckboxGroup = "AntDesignCheckboxGroup", e.AntDesignCollapse = "AntDesignCollapse", e.AntDesignConfigProvider = "AntDesignConfigProvider", e.AntDesignDatePicker = "AntDesignDatePicker", e.AntDesignDescriptions = "AntDesignDescriptions", e.AntDesignDivider = "AntDesignDivider", e.AntDesignDrawer = "AntDesignDrawer", e.AntDesignDropdown = "AntDesignDropdown", e.AntDesignDropdownButton = "AntDesignDropdownButton", e.AntDesignEmpty = "AntDesignEmpty", e.AntDesignForm = "AntDesignForm", e.AntDesignFormErrorList = "AntDesignFormErrorList", e.AntDesignFormItem = "AntDesignFormItem", e.AntDesignFormList = "AntDesignFormList", e.AntDesignFormProvider = "AntDesignFormProvider", e.AntDesignGridCol = "AntDesignGridCol", e.AntDesignGridRow = "AntDesignGridRow", e.AntDesignIcon = "AntDesignIcon", e.AntDesignImage = "AntDesignImage", e.AntDesignInput = "AntDesignInput", e.AntDesignInputNumber = "AntDesignInputNumber", e.AntDesignInputSearch = "AntDesignInputSearch", e.AntDesignInputTextArea = "AntDesignInputTextArea", e.AntDesignLayout = "AntDesignLayout", e.AntDesignLayoutContent = "AntDesignLayoutContent", e.AntDesignLayoutFooter = "AntDesignLayoutFooter", e.AntDesignLayoutHeader = "AntDesignLayoutHeader", e.AntDesignLayoutSider = "AntDesignLayoutSider", e.AntDesignList = "AntDesignList", e.AntDesignListItem = "AntDesignListItem", e.AntDesignListItemMeta = "AntDesignListItemMeta", e.AntDesignMentions = "AntDesignMentions", e.AntDesignMenu = "AntDesignMenu", e.AntDesignMessage = "AntDesignMessage", e.AntDesignModal = "AntDesignModal", e.AntDesignNotification = "AntDesignNotification", e.AntDesignPagination = "AntDesignPagination", e.AntDesignPopconfirm = "AntDesignPopconfirm", e.AntDesignPopover = "AntDesignPopover", e.AntDesignProgress = "AntDesignProgress", e.AntDesignRadioGroup = "AntDesignRadioGroup", e.AntDesignRate = "AntDesignRate", e.AntDesignResult = "AntDesignResult", e.AntDesignSegmented = "AntDesignSegmented", e.AntDesignSelect = "AntDesignSelect", e.AntDesignSkeleton = "AntDesignSkeleton", e.AntDesignSlider = "AntDesignSlider", e.AntDesignSpace = "AntDesignSpace", e.AntDesignSpin = "AntDesignSpin", e.AntDesignStatistic = "AntDesignStatistic", e.AntDesignSteps = "AntDesignSteps", e.AntDesignSwitch = "AntDesignSwitch", e.AntDesignTable = "AntDesignTable", e.AntDesignTabs = "AntDesignTabs", e.AntDesignTag = "AntDesignTag", e.AntDesignTimePicker = "AntDesignTimePicker", e.AntDesignTimeline = "AntDesignTimeline", e.AntDesignTooltip = "AntDesignTooltip", e.AntDesignTransfer = "AntDesignTransfer", e.AntDesignTree = "AntDesignTree", e.AntDesignTreeSelect = "AntDesignTreeSelect", e.AntDesignTypographyParagraph = "AntDesignTypographyParagraph", e.AntDesignTypographyText = "AntDesignTypographyText", e.AntDesignTypographyTitle = "AntDesignTypographyTitle", e.AntDesignUpload = "AntDesignUpload", e.ExternalComponent = "ExternalComponent", e.GridLayout = "GridLayout", e.HookGraphqlMutation = "HookGraphqlMutation", e.HookGraphqlQuery = "HookGraphqlQuery", e.HookQueryConfig = "HookQueryConfig", e.HookQueryLambda = "HookQueryLambda", e.HookQueryPage = "HookQueryPage", e.HookQueryPages = "HookQueryPages", e.HookRecoilState = "HookRecoilState", e.HookRouter = "HookRouter", e.HtmlA = "HtmlA", e.HtmlAbbr = "HtmlAbbr", e.HtmlArea = "HtmlArea", e.HtmlArticle = "HtmlArticle", e.HtmlAside = "HtmlAside", e.HtmlAudio = "HtmlAudio", e.HtmlB = "HtmlB", e.HtmlBase = "HtmlBase", e.HtmlBdo = "HtmlBdo", e.HtmlBlockquote = "HtmlBlockquote", e.HtmlBr = "HtmlBr", e.HtmlButton = "HtmlButton", e.HtmlCanvas = "HtmlCanvas", e.HtmlCaption = "HtmlCaption", e.HtmlCite = "HtmlCite", e.HtmlCode = "HtmlCode", e.HtmlCol = "HtmlCol", e.HtmlData = "HtmlData", e.HtmlDatalist = "HtmlDatalist", e.HtmlDetails = "HtmlDetails", e.HtmlDfn = "HtmlDfn", e.HtmlDialog = "HtmlDialog", e.HtmlDiv = "HtmlDiv", e.HtmlDl = "HtmlDl", e.HtmlEm = "HtmlEm", e.HtmlEmbed = "HtmlEmbed", e.HtmlFieldset = "HtmlFieldset", e.HtmlFooter = "HtmlFooter", e.HtmlForm = "HtmlForm", e.HtmlH1 = "HtmlH1", e.HtmlH2 = "HtmlH2", e.HtmlH3 = "HtmlH3", e.HtmlH4 = "HtmlH4", e.HtmlH5 = "HtmlH5", e.HtmlH6 = "HtmlH6", e.HtmlHead = "HtmlHead", e.HtmlHeader = "HtmlHeader", e.HtmlHr = "HtmlHr", e.HtmlI = "HtmlI", e.HtmlIframe = "HtmlIframe", e.HtmlImg = "HtmlImg", e.HtmlInput = "HtmlInput", e.HtmlKbd = "HtmlKbd", e.HtmlLabel = "HtmlLabel", e.HtmlLegend = "HtmlLegend", e.HtmlLi = "HtmlLi", e.HtmlLink = "HtmlLink", e.HtmlMain = "HtmlMain", e.HtmlMap = "HtmlMap", e.HtmlMark = "HtmlMark", e.HtmlMath = "HtmlMath", e.HtmlMeta = "HtmlMeta", e.HtmlMeter = "HtmlMeter", e.HtmlNav = "HtmlNav", e.HtmlNoscript = "HtmlNoscript", e.HtmlObject = "HtmlObject", e.HtmlOl = "HtmlOl", e.HtmlOptgroup = "HtmlOptgroup", e.HtmlOption = "HtmlOption", e.HtmlOutput = "HtmlOutput", e.HtmlP = "HtmlP", e.HtmlPicture = "HtmlPicture", e.HtmlPre = "HtmlPre", e.HtmlProgress = "HtmlProgress", e.HtmlQ = "HtmlQ", e.HtmlRuby = "HtmlRuby", e.HtmlS = "HtmlS", e.HtmlSamp = "HtmlSamp", e.HtmlScript = "HtmlScript", e.HtmlSection = "HtmlSection", e.HtmlSelect = "HtmlSelect", e.HtmlSmall = "HtmlSmall", e.HtmlSource = "HtmlSource", e.HtmlSpan = "HtmlSpan", e.HtmlStrong = "HtmlStrong", e.HtmlStyle = "HtmlStyle", e.HtmlSub = "HtmlSub", e.HtmlSup = "HtmlSup", e.HtmlTable = "HtmlTable", e.HtmlTd = "HtmlTd", e.HtmlTextarea = "HtmlTextarea", e.HtmlTh = "HtmlTh", e.HtmlTime = "HtmlTime", e.HtmlTitle = "HtmlTitle", e.HtmlTr = "HtmlTr", e.HtmlTrack = "HtmlTrack", e.HtmlU = "HtmlU", e.HtmlUl = "HtmlUl", e.HtmlVar = "HtmlVar", e.HtmlVideo = "HtmlVideo", e.HtmlWbr = "HtmlWbr", e.LexicalEditor = "LexicalEditor", e.MuiAccordion = "MuiAccordion", e.MuiAccordionActions = "MuiAccordionActions", e.MuiAccordionDetails = "MuiAccordionDetails", e.MuiAccordionSummary = "MuiAccordionSummary", e.MuiAlert = "MuiAlert", e.MuiAlertTitle = "MuiAlertTitle", e.MuiAppBar = "MuiAppBar", e.MuiAutocomplete = "MuiAutocomplete", e.MuiAvatar = "MuiAvatar", e.MuiAvatarGroup = "MuiAvatarGroup", e.MuiBackdrop = "MuiBackdrop", e.MuiBadge = "MuiBadge", e.MuiBadgeUnstyled = "MuiBadgeUnstyled", e.MuiBottomNavigation = "MuiBottomNavigation", e.MuiBottomNavigationAction = "MuiBottomNavigationAction", e.MuiBox = "MuiBox", e.MuiBreadcrumbs = "MuiBreadcrumbs", e.MuiButton = "MuiButton", e.MuiButtonBase = "MuiButtonBase", e.MuiButtonGroup = "MuiButtonGroup", e.MuiButtonUnstyled = "MuiButtonUnstyled", e.MuiCalendarPicker = "MuiCalendarPicker", e.MuiCalendarPickerSkeleton = "MuiCalendarPickerSkeleton", e.MuiCard = "MuiCard", e.MuiCardActionArea = "MuiCardActionArea", e.MuiCardActions = "MuiCardActions", e.MuiCardContent = "MuiCardContent", e.MuiCardHeader = "MuiCardHeader", e.MuiCardMedia = "MuiCardMedia", e.MuiCheckbox = "MuiCheckbox", e.MuiChip = "MuiChip", e.MuiCircularProgress = "MuiCircularProgress", e.MuiClickAwayListener = "MuiClickAwayListener", e.MuiClockPicker = "MuiClockPicker", e.MuiCollapse = "MuiCollapse", e.MuiContainer = "MuiContainer", e.MuiCssBaseline = "MuiCssBaseline", e.MuiDataGrid = "MuiDataGrid", e.MuiDatePicker = "MuiDatePicker", e.MuiDateRangePicker = "MuiDateRangePicker", e.MuiDateRangePickerDay = "MuiDateRangePickerDay", e.MuiDateTimePicker = "MuiDateTimePicker", e.MuiDesktopDatePicker = "MuiDesktopDatePicker", e.MuiDesktopDateRangePicker = "MuiDesktopDateRangePicker", e.MuiDesktopDateTimePicker = "MuiDesktopDateTimePicker", e.MuiDesktopTimePicker = "MuiDesktopTimePicker", e.MuiDialog = "MuiDialog", e.MuiDialogActions = "MuiDialogActions", e.MuiDialogContent = "MuiDialogContent", e.MuiDialogContentText = "MuiDialogContentText", e.MuiDialogTitle = "MuiDialogTitle", e.MuiDivider = "MuiDivider", e.MuiDrawer = "MuiDrawer", e.MuiFab = "MuiFab", e.MuiFade = "MuiFade", e.MuiFilledInput = "MuiFilledInput", e.MuiFormControl = "MuiFormControl", e.MuiFormControlLabel = "MuiFormControlLabel", e.MuiFormControlUnstyled = "MuiFormControlUnstyled", e.MuiFormGroup = "MuiFormGroup", e.MuiFormHelperText = "MuiFormHelperText", e.MuiFormLabel = "MuiFormLabel", e.MuiGlobalStyles = "MuiGlobalStyles", e.MuiGrid = "MuiGrid", e.MuiGridColDef = "MuiGridColDef", e.MuiGrow = "MuiGrow", e.MuiHidden = "MuiHidden", e.MuiIcon = "MuiIcon", e.MuiIconButton = "MuiIconButton", e.MuiImageList = "MuiImageList", e.MuiImageListItem = "MuiImageListItem", e.MuiImageListItemBar = "MuiImageListItemBar", e.MuiInput = "MuiInput", e.MuiInputAdornment = "MuiInputAdornment", e.MuiInputBase = "MuiInputBase", e.MuiInputLabel = "MuiInputLabel", e.MuiLinearProgress = "MuiLinearProgress", e.MuiLink = "MuiLink", e.MuiList = "MuiList", e.MuiListItem = "MuiListItem", e.MuiListItemAvatar = "MuiListItemAvatar", e.MuiListItemButton = "MuiListItemButton", e.MuiListItemIcon = "MuiListItemIcon", e.MuiListItemSecondaryAction = "MuiListItemSecondaryAction", e.MuiListItemText = "MuiListItemText", e.MuiListSubheader = "MuiListSubheader", e.MuiLoadingButton = "MuiLoadingButton", e.MuiMasonry = "MuiMasonry", e.MuiMasonryItem = "MuiMasonryItem", e.MuiMenu = "MuiMenu", e.MuiMenuItem = "MuiMenuItem", e.MuiMenuList = "MuiMenuList", e.MuiMobileDatePicker = "MuiMobileDatePicker", e.MuiMobileDateRangePicker = "MuiMobileDateRangePicker", e.MuiMobileDateTimePicker = "MuiMobileDateTimePicker", e.MuiMobileStepper = "MuiMobileStepper", e.MuiMobileTimePicker = "MuiMobileTimePicker", e.MuiModal = "MuiModal", e.MuiModalUnstyled = "MuiModalUnstyled", e.MuiMonthPicker = "MuiMonthPicker", e.MuiNativeSelect = "MuiNativeSelect", e.MuiNoSsr = "MuiNoSsr", e.MuiOutlinedInput = "MuiOutlinedInput", e.MuiPagination = "MuiPagination", e.MuiPaginationItem = "MuiPaginationItem", e.MuiPaper = "MuiPaper", e.MuiPickersDay = "MuiPickersDay", e.MuiPopover = "MuiPopover", e.MuiPopper = "MuiPopper", e.MuiPortal = "MuiPortal", e.MuiRadio = "MuiRadio", e.MuiRadioGroup = "MuiRadioGroup", e.MuiRating = "MuiRating", e.MuiScopedCssBaseline = "MuiScopedCssBaseline", e.MuiSelect = "MuiSelect", e.MuiSkeleton = "MuiSkeleton", e.MuiSlide = "MuiSlide", e.MuiSlider = "MuiSlider", e.MuiSliderUnstyled = "MuiSliderUnstyled", e.MuiSnackbar = "MuiSnackbar", e.MuiSnackbarContent = "MuiSnackbarContent", e.MuiSpeedDial = "MuiSpeedDial", e.MuiSpeedDialAction = "MuiSpeedDialAction", e.MuiSpeedDialIcon = "MuiSpeedDialIcon", e.MuiStack = "MuiStack", e.MuiStaticDatePicker = "MuiStaticDatePicker", e.MuiStaticDateRangePicker = "MuiStaticDateRangePicker", e.MuiStaticDateTimePicker = "MuiStaticDateTimePicker", e.MuiStaticTimePicker = "MuiStaticTimePicker", e.MuiStep = "MuiStep", e.MuiStepButton = "MuiStepButton", e.MuiStepConnector = "MuiStepConnector", e.MuiStepContent = "MuiStepContent", e.MuiStepIcon = "MuiStepIcon", e.MuiStepLabel = "MuiStepLabel", e.MuiStepper = "MuiStepper", e.MuiSvgIcon = "MuiSvgIcon", e.MuiSwipeableDrawer = "MuiSwipeableDrawer", e.MuiSwitch = "MuiSwitch", e.MuiSwitchUnstyled = "MuiSwitchUnstyled", e.MuiTab = "MuiTab", e.MuiTabContext = "MuiTabContext", e.MuiTabList = "MuiTabList", e.MuiTabPanel = "MuiTabPanel", e.MuiTabScrollButton = "MuiTabScrollButton", e.MuiTable = "MuiTable", e.MuiTableBody = "MuiTableBody", e.MuiTableCell = "MuiTableCell", e.MuiTableContainer = "MuiTableContainer", e.MuiTableFooter = "MuiTableFooter", e.MuiTableHead = "MuiTableHead", e.MuiTablePagination = "MuiTablePagination", e.MuiTableRow = "MuiTableRow", e.MuiTableSortLabel = "MuiTableSortLabel", e.MuiTabs = "MuiTabs", e.MuiTextField = "MuiTextField", e.MuiTextareaAutosize = "MuiTextareaAutosize", e.MuiTimePicker = "MuiTimePicker", e.MuiTimeline = "MuiTimeline", e.MuiTimelineConnector = "MuiTimelineConnector", e.MuiTimelineContent = "MuiTimelineContent", e.MuiTimelineDot = "MuiTimelineDot", e.MuiTimelineItem = "MuiTimelineItem", e.MuiTimelineOppositeContent = "MuiTimelineOppositeContent", e.MuiTimelineSeparator = "MuiTimelineSeparator", e.MuiToggleButton = "MuiToggleButton", e.MuiToggleButtonGroup = "MuiToggleButtonGroup", e.MuiToolbar = "MuiToolbar", e.MuiTooltip = "MuiTooltip", e.MuiTreeItem = "MuiTreeItem", e.MuiTreeView = "MuiTreeView", e.MuiTypography = "MuiTypography", e.MuiUnstableTrapFocus = "MuiUnstableTrapFocus", e.MuiYearPicker = "MuiYearPicker", e.MuiZoom = "MuiZoom", e.NextLink = "NextLink", e.Query = "Query", e.ReactFragment = "ReactFragment", e.Script = "Script", e.State = "State", e.Text = "Text", e.TextList = "TextList", e))(kg || {}), OS = /* @__PURE__ */ ((e) => (e.Desktop = "Desktop", e.MobileLandscape = "MobileLandscape", e.MobilePortrait = "MobilePortrait", e.Tablet = "Tablet", e))(OS || {}), PS = /* @__PURE__ */ ((e) => (e.Css = "Css", e.CssInJs = "CssInJs", e.Graphql = "Graphql", e.Javascript = "Javascript", e.Json = "Json", e.Typescript = "Typescript", e))(PS || {}), AS = /* @__PURE__ */ ((e) => (e.Css = "CSS", e.Component = "Component", e.Node = "Node", e.Page = "Page", e.Props = "Props", e.PropsInspector = "PropsInspector", e.PropsMap = "PropsMap", e.PropsTransformation = "PropsTransformation", e))(AS || {}), wS = /* @__PURE__ */ ((e) => (e.AllElements = "AllElements", e.ChildrenOnly = "ChildrenOnly", e.DescendantsOnly = "DescendantsOnly", e.ExcludeDescendantsElements = "ExcludeDescendantsElements", e))(wS || {}), vS = /* @__PURE__ */ ((e) => (e.InternalServerError = "InternalServerError", e.NotFound = "NotFound", e.Provider = "Provider", e.Regular = "Regular", e))(vS || {}), SS = /* @__PURE__ */ ((e) => (e.Boolean = "Boolean", e.Integer = "Integer", e.Number = "Number", e.String = "String", e))(SS || {}), RS = /* @__PURE__ */ ((e) => (e.Page = "Page", e.Url = "Url", e))(RS || {}), Wg = /* @__PURE__ */ ((e) => (e.GraphQl = "GraphQl", e.Rest = "Rest", e))(Wg || {}), ES = /* @__PURE__ */ ((e) => (e.Admin = "Admin", e.User = "User", e))(ES || {}), Ee = /* @__PURE__ */ ((e) => (e.ActionType = "ActionType", e.AppType = "AppType", e.ArrayType = "ArrayType", e.CodeMirrorType = "CodeMirrorType", e.ElementType = "ElementType", e.EnumType = "EnumType", e.InterfaceType = "InterfaceType", e.LambdaType = "LambdaType", e.PageType = "PageType", e.PrimitiveType = "PrimitiveType", e.ReactNodeType = "ReactNodeType", e.RenderPropType = "RenderPropType", e.RichTextType = "RichTextType", e.UnionType = "UnionType", e))(Ee || {});
class L extends String {
  constructor(n, t) {
    super(n), FV(this, "__apiType"), this.value = n, this.__meta__ = t;
  }
  toString() {
    return this.value;
  }
}
new L(`
    fragment Domain on Domain {
  app {
    id
  }
  domainConfig {
    misconfigured
  }
  id
  name
}
    `, { fragmentName: "Domain" });
new L(`
    fragment Owner on User {
  id
}
    `, { fragmentName: "Owner" });
new L(`
    fragment PagePreview on Page {
  app {
    id
  }
  id
  kind
  name
  rootElement {
    id
  }
  elements {
    id
  }
  store {
    id
  }
  urlPattern
}
    `, { fragmentName: "PagePreview" });
new L(`
    fragment AppPreview on App {
  domains {
    ...Domain
  }
  id
  name
  owner {
    ...Owner
  }
  pages {
    ...PagePreview
  }
  slug
}
    fragment Domain on Domain {
  app {
    id
  }
  domainConfig {
    misconfigured
  }
  id
  name
}
fragment PagePreview on Page {
  app {
    id
  }
  id
  kind
  name
  rootElement {
    id
  }
  elements {
    id
  }
  store {
    id
  }
  urlPattern
}
fragment Owner on User {
  id
}`, { fragmentName: "AppPreview" });
new L(`
    fragment Prop on Prop {
  data
  id
}
    `, { fragmentName: "Prop" });
new L(`
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
    `, { fragmentName: "BaseType" });
new L(`
    fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: "Field" });
new L(`
    fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}`, { fragmentName: "InterfaceType" });
new L(`
    fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
    `, { fragmentName: "TagPreview" });
new L(`
    fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
    fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}`, { fragmentName: "AtomBuilder" });
new L(`
    fragment ElementRenderType on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomBuilder
  }
  ... on Component {
    __typename
    id
  }
}
    fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}`, { fragmentName: "ElementRenderType" });
new L(`
    fragment Element on Element {
  __typename
  compositeKey
  childMapperComponent {
    id
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderActions {
    id
    type
  }
  preRenderActions {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ...ElementRenderType
  }
  style
  tailwindClassNames
}
    fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment ElementRenderType on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomBuilder
  }
  ... on Component {
    __typename
    id
  }
}
fragment Prop on Prop {
  data
  id
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}`, { fragmentName: "Element" });
new L(`
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
    `, { fragmentName: "BaseAction" });
new L(`
    fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}`, { fragmentName: "CodeAction" });
new L(`
    fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
    fragment Prop on Prop {
  data
  id
}`, { fragmentName: "Resource" });
new L(`
    fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}`, { fragmentName: "ApiAction" });
new L(`
    fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}`, { fragmentName: "Action" });
new L(`
    fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}`, { fragmentName: "Store" });
new L(`
    fragment ActionType on ActionType {
  ...BaseType
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: "ActionType" });
new L(`
    fragment AppType on AppType {
  ...BaseType
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: "AppType" });
new L(`
    fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: "ArrayType" });
new L(`
    fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: "CodeMirrorType" });
new L(`
    fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: "ElementType" });
new L(`
    fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
    `, { fragmentName: "EnumTypeValue" });
new L(`
    fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}`, { fragmentName: "EnumType" });
new L(`
    fragment LambdaType on LambdaType {
  ...BaseType
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: "LambdaType" });
new L(`
    fragment PageType on PageType {
  ...BaseType
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: "PageType" });
new L(`
    fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: "PrimitiveType" });
new L(`
    fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: "ReactNodeType" });
new L(`
    fragment RenderPropType on RenderPropType {
  ...BaseType
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: "RenderPropType" });
new L(`
    fragment RichTextType on RichTextType {
  ...BaseType
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: "RichTextType" });
new L(`
    fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`, { fragmentName: "UnionType" });
new L(`
    fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`, { fragmentName: "Type" });
new L(`
    fragment Page on Page {
  app {
    id
  }
  elements {
    ...Element
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  store {
    ...Store
  }
  urlPattern
  dependantTypes {
    ...Type
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment ElementRenderType on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomBuilder
  }
  ... on Component {
    __typename
    id
  }
}
fragment Element on Element {
  __typename
  compositeKey
  childMapperComponent {
    id
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderActions {
    id
    type
  }
  preRenderActions {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ...ElementRenderType
  }
  style
  tailwindClassNames
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`, { fragmentName: "Page" });
new L(`
    fragment App on App {
  domains {
    ...Domain
  }
  id
  name
  owner {
    ...Owner
  }
  pages {
    ...Page
  }
  slug
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment Domain on Domain {
  app {
    id
  }
  domainConfig {
    misconfigured
  }
  id
  name
}
fragment ElementRenderType on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomBuilder
  }
  ... on Component {
    __typename
    id
  }
}
fragment Element on Element {
  __typename
  compositeKey
  childMapperComponent {
    id
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderActions {
    id
    type
  }
  preRenderActions {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ...ElementRenderType
  }
  style
  tailwindClassNames
}
fragment Page on Page {
  app {
    id
  }
  elements {
    ...Element
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  store {
    ...Store
  }
  urlPattern
  dependantTypes {
    ...Type
  }
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment Owner on User {
  id
}`, { fragmentName: "App" });
new L(`
    fragment PageDevelopment on Page {
  app {
    id
  }
  elements {
    ...Element
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  store {
    ...Store
  }
  urlPattern
  dependantTypes {
    ...Type
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment ElementRenderType on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomBuilder
  }
  ... on Component {
    __typename
    id
  }
}
fragment Element on Element {
  __typename
  compositeKey
  childMapperComponent {
    id
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderActions {
    id
    type
  }
  preRenderActions {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ...ElementRenderType
  }
  style
  tailwindClassNames
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`, { fragmentName: "PageDevelopment" });
new L(`
    fragment AppBuilder on App {
  id
  name
  owner {
    ...Owner
  }
  pages(
    where: {OR: [{id_IN: $pageIds}, {kind: Provider}, {kind: NotFound}, {kind: InternalServerError}, {kind: Regular}]}
  ) {
    ...PageDevelopment
  }
  slug
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment ElementRenderType on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomBuilder
  }
  ... on Component {
    __typename
    id
  }
}
fragment Element on Element {
  __typename
  compositeKey
  childMapperComponent {
    id
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderActions {
    id
    type
  }
  preRenderActions {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ...ElementRenderType
  }
  style
  tailwindClassNames
}
fragment PageDevelopment on Page {
  app {
    id
  }
  elements {
    ...Element
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  store {
    ...Store
  }
  urlPattern
  dependantTypes {
    ...Type
  }
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment Owner on User {
  id
}`, { fragmentName: "AppBuilder" });
new L(`
    fragment AtomProduction on Atom {
  __typename
  externalCssSource
  externalJsSource
  externalSourceType
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  type
}
    `, { fragmentName: "AtomProduction" });
new L(`
    fragment ElementRenderTypeProduction on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomProduction
  }
  ... on Component {
    __typename
    id
  }
}
    fragment AtomProduction on Atom {
  __typename
  externalCssSource
  externalJsSource
  externalSourceType
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  type
}`, { fragmentName: "ElementRenderTypeProduction" });
new L(`
    fragment ElementProduction on Element {
  __typename
  childMapperComponent {
    id
    name
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderActions {
    id
    type
  }
  preRenderActions {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ...ElementRenderTypeProduction
  }
  style
  tailwindClassNames
}
    fragment AtomProduction on Atom {
  __typename
  externalCssSource
  externalJsSource
  externalSourceType
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  type
}
fragment ElementRenderTypeProduction on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomProduction
  }
  ... on Component {
    __typename
    id
  }
}
fragment Prop on Prop {
  data
  id
}`, { fragmentName: "ElementProduction" });
new L(`
    fragment PageProduction on Page {
  app {
    id
  }
  elements {
    ...ElementProduction
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  slug
  store {
    ...Store
  }
  urlPattern
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AtomProduction on Atom {
  __typename
  externalCssSource
  externalJsSource
  externalSourceType
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  type
}
fragment ElementRenderTypeProduction on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomProduction
  }
  ... on Component {
    __typename
    id
  }
}
fragment ElementProduction on Element {
  __typename
  childMapperComponent {
    id
    name
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderActions {
    id
    type
  }
  preRenderActions {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ...ElementRenderTypeProduction
  }
  style
  tailwindClassNames
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}`, { fragmentName: "PageProduction" });
new L(`
    fragment AppProduction on App {
  id
  name
  owner {
    ...Owner
  }
  pages(where: {OR: [{urlPattern: $pageUrlPattern}, {kind: Provider}]}) {
    ...PageProduction
  }
  slug
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AtomProduction on Atom {
  __typename
  externalCssSource
  externalJsSource
  externalSourceType
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  type
}
fragment ElementRenderTypeProduction on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomProduction
  }
  ... on Component {
    __typename
    id
  }
}
fragment ElementProduction on Element {
  __typename
  childMapperComponent {
    id
    name
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderActions {
    id
    type
  }
  preRenderActions {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ...ElementRenderTypeProduction
  }
  style
  tailwindClassNames
}
fragment PageProduction on Page {
  app {
    id
  }
  elements {
    ...ElementProduction
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  slug
  store {
    ...Store
  }
  urlPattern
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment Owner on User {
  id
}`, { fragmentName: "AppProduction" });
new L(`
    fragment Atom on Atom {
  __typename
  api {
    ...InterfaceType
  }
  externalCssSource
  externalJsSource
  externalSourceType
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
    fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}`, { fragmentName: "Atom" });
new L(`
    fragment Component on Component {
  __typename
  api {
    __typename
    id
  }
  id
  name
  compositeKey
  owner {
    ...Owner
  }
  props {
    ...Prop
  }
  rootElement {
    id
  }
  store {
    ...Store
  }
  dependantTypes {
    ...Type
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment Owner on User {
  id
}`, { fragmentName: "Component" });
new L(`
    fragment ComponentBuilder on Component {
  __typename
  api {
    ...InterfaceType
  }
  elements {
    ...Element
  }
  id
  name
  compositeKey
  owner {
    ...Owner
  }
  props {
    ...Prop
  }
  rootElement {
    id
    name
  }
  store {
    ...Store
  }
  dependantTypes {
    ...Type
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment ElementRenderType on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomBuilder
  }
  ... on Component {
    __typename
    id
  }
}
fragment Element on Element {
  __typename
  compositeKey
  childMapperComponent {
    id
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderActions {
    id
    type
  }
  preRenderActions {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ...ElementRenderType
  }
  style
  tailwindClassNames
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment Owner on User {
  id
}`, { fragmentName: "ComponentBuilder" });
new L(`
    fragment ComponentProduction on Component {
  id
  name
  compositeKey
  owner {
    ...Owner
  }
  props {
    ...Prop
  }
  rootElement {
    id
    name
  }
  store {
    ...Store
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment Owner on User {
  id
}`, { fragmentName: "ComponentProduction" });
new L(`
    fragment HookProp on Prop {
  data
  id
}
    `, { fragmentName: "HookProp" });
new L(`
    fragment Hook on Hook {
  config {
    ...HookProp
  }
  element {
    id
    name
  }
  id
  type
}
    fragment HookProp on Prop {
  data
  id
}`, { fragmentName: "Hook" });
new L(`
    fragment AuthGuard on AuthGuard {
  config {
    ...Prop
  }
  id
  name
  resource {
    ...Resource
  }
  responseTransformer
  owner {
    id
  }
}
    fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}`, { fragmentName: "AuthGuard" });
new L(`
    fragment Redirect on Redirect {
  authGuard {
    ...AuthGuard
  }
  id
  source {
    id
  }
  targetPage {
    ...PagePreview
  }
  targetType
  targetUrl
}
    fragment AuthGuard on AuthGuard {
  config {
    ...Prop
  }
  id
  name
  resource {
    ...Resource
  }
  responseTransformer
  owner {
    id
  }
}
fragment PagePreview on Page {
  app {
    id
  }
  id
  kind
  name
  rootElement {
    id
  }
  elements {
    id
  }
  store {
    id
  }
  urlPattern
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}`, { fragmentName: "Redirect" });
new L(`
    fragment RedirectPreview on Redirect {
  authGuard {
    id
  }
  id
  source {
    id
  }
  targetPage {
    id
  }
  targetType
  targetUrl
}
    `, { fragmentName: "RedirectPreview" });
new L(`
    fragment ProductionStore on Store {
  actions {
    ...Action
  }
  id
  name
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}`, { fragmentName: "ProductionStore" });
new L(`
    fragment Tag on Tag {
  children {
    id
    name
    owner {
      id
    }
  }
  descendants {
    id
    name
  }
  id
  name
  owner {
    id
  }
  parent {
    id
    name
  }
}
    `, { fragmentName: "Tag" });
new L(`
    fragment Preference on Preference {
  id
  builderBreakpointType
  builderWidth
  activeConfigPaneTab
  owner {
    id
  }
}
    `, { fragmentName: "Preference" });
new L(`
    fragment User on User {
  apps {
    id
  }
  auth0Id
  email
  id
  preferences {
    ...Preference
  }
  roles
  username
  name
  picture
}
    fragment Preference on Preference {
  id
  builderBreakpointType
  builderWidth
  activeConfigPaneTab
  owner {
    id
  }
}`, { fragmentName: "User" });
new L(`
    query GetPageBuilder($appId: ID!, $pageIds: [ID!]) {
  actionTypes {
    ...ActionType
  }
  apps(where: {id: $appId}) {
    ...AppBuilder
  }
  atoms {
    ...AtomBuilder
  }
  authGuards {
    ...AuthGuard
  }
  codeMirrorTypes {
    ...CodeMirrorType
  }
  components {
    ...ComponentBuilder
  }
  primitiveTypes {
    ...PrimitiveType
  }
  reactNodeTypes {
    ...ReactNodeType
  }
  redirects(where: {source: {app: {id: $appId}}}) {
    ...Redirect
  }
  renderPropTypes {
    ...RenderPropType
  }
  resources {
    ...Resource
  }
  richTextTypes {
    ...RichTextType
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AppBuilder on App {
  id
  name
  owner {
    ...Owner
  }
  pages(
    where: {OR: [{id_IN: $pageIds}, {kind: Provider}, {kind: NotFound}, {kind: InternalServerError}, {kind: Regular}]}
  ) {
    ...PageDevelopment
  }
  slug
}
fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment AuthGuard on AuthGuard {
  config {
    ...Prop
  }
  id
  name
  resource {
    ...Resource
  }
  responseTransformer
  owner {
    id
  }
}
fragment ComponentBuilder on Component {
  __typename
  api {
    ...InterfaceType
  }
  elements {
    ...Element
  }
  id
  name
  compositeKey
  owner {
    ...Owner
  }
  props {
    ...Prop
  }
  rootElement {
    id
    name
  }
  store {
    ...Store
  }
  dependantTypes {
    ...Type
  }
}
fragment ElementRenderType on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomBuilder
  }
  ... on Component {
    __typename
    id
  }
}
fragment Element on Element {
  __typename
  compositeKey
  childMapperComponent {
    id
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderActions {
    id
    type
  }
  preRenderActions {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ...ElementRenderType
  }
  style
  tailwindClassNames
}
fragment PagePreview on Page {
  app {
    id
  }
  id
  kind
  name
  rootElement {
    id
  }
  elements {
    id
  }
  store {
    id
  }
  urlPattern
}
fragment PageDevelopment on Page {
  app {
    id
  }
  elements {
    ...Element
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  store {
    ...Store
  }
  urlPattern
  dependantTypes {
    ...Type
  }
}
fragment Prop on Prop {
  data
  id
}
fragment Redirect on Redirect {
  authGuard {
    ...AuthGuard
  }
  id
  source {
    id
  }
  targetPage {
    ...PagePreview
  }
  targetType
  targetUrl
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment Owner on User {
  id
}`);
new L(`
    query GetComponentBuilder($componentId: ID!) {
  actionTypes {
    ...ActionType
  }
  atoms(where: {type: ReactFragment}) {
    ...AtomBuilder
  }
  codeMirrorTypes {
    ...CodeMirrorType
  }
  components(where: {id: $componentId}) {
    ...ComponentBuilder
  }
  primitiveTypes {
    ...PrimitiveType
  }
  reactNodeTypes {
    ...ReactNodeType
  }
  renderPropTypes {
    ...RenderPropType
  }
  resources {
    ...Resource
  }
  richTextTypes {
    ...RichTextType
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment ComponentBuilder on Component {
  __typename
  api {
    ...InterfaceType
  }
  elements {
    ...Element
  }
  id
  name
  compositeKey
  owner {
    ...Owner
  }
  props {
    ...Prop
  }
  rootElement {
    id
    name
  }
  store {
    ...Store
  }
  dependantTypes {
    ...Type
  }
}
fragment ElementRenderType on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomBuilder
  }
  ... on Component {
    __typename
    id
  }
}
fragment Element on Element {
  __typename
  compositeKey
  childMapperComponent {
    id
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderActions {
    id
    type
  }
  preRenderActions {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ...ElementRenderType
  }
  style
  tailwindClassNames
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment Owner on User {
  id
}`);
new L(`
    mutation CreateApps($input: [AppCreateInput!]!) {
  createApps(input: $input) {
    apps {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation UpdateApps($where: AppWhere!, $update: AppUpdateInput!) {
  updateApps(update: $update, where: $where) {
    apps {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation DeleteApps($where: AppWhere!, $delete: AppDeleteInput) {
  deleteApps(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `);
new L(`
    query AppListPreview($options: AppOptions, $where: AppWhere) {
  aggregate: appsAggregate(where: $where) {
    count
  }
  items: apps(options: $options, where: $where) {
    ...AppPreview
  }
}
    fragment AppPreview on App {
  domains {
    ...Domain
  }
  id
  name
  owner {
    ...Owner
  }
  pages {
    ...PagePreview
  }
  slug
}
fragment Domain on Domain {
  app {
    id
  }
  domainConfig {
    misconfigured
  }
  id
  name
}
fragment PagePreview on Page {
  app {
    id
  }
  id
  kind
  name
  rootElement {
    id
  }
  elements {
    id
  }
  store {
    id
  }
  urlPattern
}
fragment Owner on User {
  id
}`);
new L(`
    query AppList($options: AppOptions, $where: AppWhere) {
  items: apps(options: $options, where: $where) {
    ...App
  }
  aggregate: appsAggregate(where: $where) {
    count
  }
  atoms(where: {type: ReactFragment}) {
    ...AtomBuilder
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment App on App {
  domains {
    ...Domain
  }
  id
  name
  owner {
    ...Owner
  }
  pages {
    ...Page
  }
  slug
}
fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment Domain on Domain {
  app {
    id
  }
  domainConfig {
    misconfigured
  }
  id
  name
}
fragment ElementRenderType on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomBuilder
  }
  ... on Component {
    __typename
    id
  }
}
fragment Element on Element {
  __typename
  compositeKey
  childMapperComponent {
    id
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderActions {
    id
    type
  }
  preRenderActions {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ...ElementRenderType
  }
  style
  tailwindClassNames
}
fragment Page on Page {
  app {
    id
  }
  elements {
    ...Element
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  store {
    ...Store
  }
  urlPattern
  dependantTypes {
    ...Type
  }
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment Owner on User {
  id
}`);
new L(`
    query GetAppProduction($domain: String!, $pageUrlPattern: String!) {
  apps(where: {domains_SOME: {name_IN: [$domain]}}) {
    ...AppProduction
  }
  atoms(where: {type: ReactFragment}) {
    ...AtomProduction
  }
  resources {
    ...Resource
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AppProduction on App {
  id
  name
  owner {
    ...Owner
  }
  pages(where: {OR: [{urlPattern: $pageUrlPattern}, {kind: Provider}]}) {
    ...PageProduction
  }
  slug
}
fragment AtomProduction on Atom {
  __typename
  externalCssSource
  externalJsSource
  externalSourceType
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  type
}
fragment ElementRenderTypeProduction on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomProduction
  }
  ... on Component {
    __typename
    id
  }
}
fragment ElementProduction on Element {
  __typename
  childMapperComponent {
    id
    name
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderActions {
    id
    type
  }
  preRenderActions {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ...ElementRenderTypeProduction
  }
  style
  tailwindClassNames
}
fragment PageProduction on Page {
  app {
    id
  }
  elements {
    ...ElementProduction
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  slug
  store {
    ...Store
  }
  urlPattern
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment Owner on User {
  id
}`);
new L(`
    mutation CreateAtoms($input: [AtomCreateInput!]!) {
  createAtoms(input: $input) {
    atoms {
      __typename
      id
    }
    info {
      nodesCreated
      relationshipsCreated
    }
  }
}
    `);
new L(`
    mutation DeleteAtoms($where: AtomWhere!, $delete: AtomDeleteInput) {
  deleteAtoms(where: $where, delete: $delete) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new L(`
    query AtomList($where: AtomWhere, $options: AtomOptions) {
  aggregate: atomsAggregate(where: $where) {
    count
  }
  items: atoms(options: $options, where: $where) {
    ...Atom
  }
}
    fragment Atom on Atom {
  __typename
  api {
    ...InterfaceType
  }
  externalCssSource
  externalJsSource
  externalSourceType
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}`);
new L(`
    mutation UpdateAtoms($where: AtomWhere, $update: AtomUpdateInput) {
  updateAtoms(update: $update, where: $where) {
    atoms {
      __typename
      id
    }
  }
}
    `);
new L(`
    query GetAuthGuards($options: AuthGuardOptions, $where: AuthGuardWhere) {
  aggregate: authGuardsAggregate(where: $where) {
    count
  }
  items: authGuards(options: $options, where: $where) {
    ...AuthGuard
  }
}
    fragment AuthGuard on AuthGuard {
  config {
    ...Prop
  }
  id
  name
  resource {
    ...Resource
  }
  responseTransformer
  owner {
    id
  }
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}`);
new L(`
    mutation CreateAuthGuards($input: [AuthGuardCreateInput!]!) {
  createAuthGuards(input: $input) {
    authGuards {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation UpdateAuthGuard($where: AuthGuardWhere, $update: AuthGuardUpdateInput) {
  updateAuthGuards(update: $update, where: $where) {
    authGuards {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation DeleteAuthGuards($where: AuthGuardWhere, $delete: AuthGuardDeleteInput) {
  deleteAuthGuards(where: $where, delete: $delete) {
    nodesDeleted
  }
}
    `);
new L(`
    mutation CreateComponents($input: [ComponentCreateInput!]!) {
  createComponents(input: $input) {
    components {
      __typename
      id
      store {
        id
      }
      rootElement {
        id
      }
    }
  }
}
    `);
new L(`
    mutation DeleteComponents($where: ComponentWhere, $delete: ComponentDeleteInput) {
  deleteComponents(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `);
new L(`
    mutation UpdateComponents($where: ComponentWhere, $update: ComponentUpdateInput) {
  updateComponents(update: $update, where: $where) {
    components {
      __typename
      id
    }
  }
}
    `);
new L(`
    query ComponentList($options: ComponentOptions, $where: ComponentWhere) {
  aggregate: componentsAggregate(where: $where) {
    count
  }
  items: components(options: $options, where: $where) {
    ...Component
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment Component on Component {
  __typename
  api {
    __typename
    id
  }
  id
  name
  compositeKey
  owner {
    ...Owner
  }
  props {
    ...Prop
  }
  rootElement {
    id
  }
  store {
    ...Store
  }
  dependantTypes {
    ...Type
  }
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment Owner on User {
  id
}`);
new L(`
    query DomainList($options: DomainOptions, $where: DomainWhere) {
  aggregate: domainsAggregate(where: $where) {
    count
  }
  items: domains(options: $options, where: $where) {
    ...Domain
  }
}
    fragment Domain on Domain {
  app {
    id
  }
  domainConfig {
    misconfigured
  }
  id
  name
}`);
new L(`
    mutation CreateDomains($input: [DomainCreateInput!]!) {
  createDomains(input: $input) {
    domains {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation UpdateDomains($where: DomainWhere!, $update: DomainUpdateInput!) {
  updateDomains(update: $update, where: $where) {
    domains {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation DeleteDomains($where: DomainWhere!) {
  deleteDomains(where: $where) {
    nodesDeleted
  }
}
    `);
new L(`
    mutation CreateElements($input: [ElementCreateInput!]!) {
  createElements(input: $input) {
    elements {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation DeleteElements($where: ElementWhere!, $delete: ElementDeleteInput) {
  deleteElements(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `);
new L(`
    mutation UpdateElements($where: ElementWhere, $update: ElementUpdateInput) {
  updateElements(update: $update, where: $where) {
    elements {
      __typename
      id
    }
  }
}
    `);
new L(`
    query ElementList($options: ElementOptions, $where: ElementWhere) {
  aggregate: elementsAggregate(where: $where) {
    count
  }
  items: elements(options: $options, where: $where) {
    ...Element
  }
}
    fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment ElementRenderType on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomBuilder
  }
  ... on Component {
    __typename
    id
  }
}
fragment Element on Element {
  __typename
  compositeKey
  childMapperComponent {
    id
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderActions {
    id
    type
  }
  preRenderActions {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ...ElementRenderType
  }
  style
  tailwindClassNames
}
fragment Prop on Prop {
  data
  id
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}`);
new L(`
    mutation CreateHooks($input: [HookCreateInput!]!) {
  createHooks(input: $input) {
    hooks {
      ...Hook
    }
  }
}
    fragment HookProp on Prop {
  data
  id
}
fragment Hook on Hook {
  config {
    ...HookProp
  }
  element {
    id
    name
  }
  id
  type
}`);
new L(`
    mutation DeleteHooks($where: HookWhere!) {
  deleteHooks(where: $where) {
    nodesDeleted
  }
}
    `);
new L(`
    mutation CreateFields($input: [FieldCreateInput!]!) {
  createFields(input: $input) {
    fields {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation UpdateFields($where: FieldWhere!, $update: FieldUpdateInput!) {
  updateFields(update: $update, where: $where) {
    fields {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation DeleteFields($where: FieldWhere!) {
  deleteFields(where: $where) {
    nodesDeleted
  }
}
    `);
new L(`
    query GetFields($where: FieldWhere, $options: FieldOptions) {
  aggregate: fieldsAggregate(where: $where) {
    count
  }
  items: fields(options: $options, where: $where) {
    ...Field
  }
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}`);
new L(`
    mutation CreatePages($input: [PageCreateInput!]!) {
  createPages(input: $input) {
    pages {
      __typename
      id
      rootElement {
        id
      }
    }
  }
}
    `);
new L(`
    mutation DeletePages($where: PageWhere, $delete: PageDeleteInput) {
  deletePages(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `);
new L(`
    mutation UpdatePages($where: PageWhere, $update: PageUpdateInput) {
  updatePages(update: $update, where: $where) {
    pages {
      __typename
      id
    }
  }
}
    `);
new L(`
    query PageList($options: PageOptions, $where: PageWhere) {
  aggregate: pagesAggregate(where: $where) {
    count
  }
  items: pages(options: $options, where: $where) {
    ...Page
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment ElementRenderType on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomBuilder
  }
  ... on Component {
    __typename
    id
  }
}
fragment Element on Element {
  __typename
  compositeKey
  childMapperComponent {
    id
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderActions {
    id
    type
  }
  preRenderActions {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ...ElementRenderType
  }
  style
  tailwindClassNames
}
fragment Page on Page {
  app {
    id
  }
  elements {
    ...Element
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  store {
    ...Store
  }
  urlPattern
  dependantTypes {
    ...Type
  }
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`);
new L(`
    query GetRenderedPage($pageId: ID!) {
  pages(where: {id: $pageId}) {
    ...PageDevelopment
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment AtomBuilder on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...TagPreview
  }
  type
  owner {
    id
  }
}
fragment ElementRenderType on ElementRenderType {
  ... on Atom {
    __typename
    ...AtomBuilder
  }
  ... on Component {
    __typename
    id
  }
}
fragment Element on Element {
  __typename
  compositeKey
  childMapperComponent {
    id
  }
  childMapperPreviousSibling {
    id
  }
  childMapperPropKey
  firstChild {
    id
  }
  id
  name
  nextSibling {
    id
  }
  page {
    id
  }
  parentComponent {
    id
  }
  parentElement {
    id
  }
  postRenderActions {
    id
    type
  }
  preRenderActions {
    id
    type
  }
  prevSibling {
    id
  }
  props {
    ...Prop
  }
  renderForEachPropKey
  renderIfExpression
  renderType {
    ...ElementRenderType
  }
  style
  tailwindClassNames
}
fragment PageDevelopment on Page {
  app {
    id
  }
  elements {
    ...Element
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  store {
    ...Store
  }
  urlPattern
  dependantTypes {
    ...Type
  }
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`);
new L(`
    mutation CreatePreferences($input: [PreferenceCreateInput!]!) {
  createPreferences(input: $input) {
    info {
      nodesCreated
      relationshipsCreated
    }
    preferences {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation DeletePreferences($where: PreferenceWhere, $delete: PreferenceDeleteInput) {
  deletePreferences(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `);
new L(`
    query GetPreferences($where: PreferenceWhere, $options: PreferenceOptions) {
  aggregate: preferencesAggregate(where: $where) {
    count
  }
  items: preferences(options: $options, where: $where) {
    ...Preference
  }
}
    fragment Preference on Preference {
  id
  builderBreakpointType
  builderWidth
  activeConfigPaneTab
  owner {
    id
  }
}`);
new L(`
    mutation UpdatePreferences($where: PreferenceWhere, $update: PreferenceUpdateInput) {
  updatePreferences(update: $update, where: $where) {
    preferences {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation CreateProps($input: [PropCreateInput!]!) {
  createProps(input: $input) {
    props {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation UpdateProps($where: PropWhere, $update: PropUpdateInput) {
  updateProps(update: $update, where: $where) {
    props {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation DeleteProps($where: PropWhere!) {
  deleteProps(where: $where) {
    nodesDeleted
  }
}
    `);
new L(`
    query GetProps($options: PropOptions, $where: PropWhere) {
  aggregate: propsAggregate(where: $where) {
    count
  }
  items: props(options: $options, where: $where) {
    ...Prop
  }
}
    fragment Prop on Prop {
  data
  id
}`);
new L(`
    mutation CreateRedirects($input: [RedirectCreateInput!]!) {
  createRedirects(input: $input) {
    redirects {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation DeleteRedirects($where: RedirectWhere, $delete: RedirectDeleteInput) {
  deleteRedirects(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `);
new L(`
    mutation UpdateRedirects($where: RedirectWhere, $update: RedirectUpdateInput) {
  updateRedirects(update: $update, where: $where) {
    redirects {
      __typename
      id
    }
  }
}
    `);
new L(`
    query GetRedirects($options: RedirectOptions, $where: RedirectWhere) {
  aggregate: redirectsAggregate(where: $where) {
    count
  }
  items: redirects(options: $options, where: $where) {
    ...Redirect
  }
}
    fragment AuthGuard on AuthGuard {
  config {
    ...Prop
  }
  id
  name
  resource {
    ...Resource
  }
  responseTransformer
  owner {
    id
  }
}
fragment PagePreview on Page {
  app {
    id
  }
  id
  kind
  name
  rootElement {
    id
  }
  elements {
    id
  }
  store {
    id
  }
  urlPattern
}
fragment Prop on Prop {
  data
  id
}
fragment Redirect on Redirect {
  authGuard {
    ...AuthGuard
  }
  id
  source {
    id
  }
  targetPage {
    ...PagePreview
  }
  targetType
  targetUrl
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}`);
new L(`
    query GetRedirectsPreview($options: RedirectOptions, $where: RedirectWhere) {
  aggregate: redirectsAggregate(where: $where) {
    count
  }
  items: redirects(options: $options, where: $where) {
    ...RedirectPreview
  }
}
    fragment RedirectPreview on Redirect {
  authGuard {
    id
  }
  id
  source {
    id
  }
  targetPage {
    id
  }
  targetType
  targetUrl
}`);
new L(`
    query ResourceList($options: ResourceOptions, $where: ResourceWhere) {
  aggregate: resourcesAggregate(where: $where) {
    count
  }
  items: resources(options: $options, where: $where) {
    ...Resource
  }
}
    fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}`);
new L(`
    mutation CreateResources($input: [ResourceCreateInput!]!) {
  createResources(input: $input) {
    resources {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation UpdateResources($where: ResourceWhere, $update: ResourceUpdateInput) {
  updateResources(update: $update, where: $where) {
    resources {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation DeleteResources($where: ResourceWhere, $delete: ResourceDeleteInput) {
  deleteResources(where: $where, delete: $delete) {
    nodesDeleted
  }
}
    `);
new L(`
    mutation CreateCodeActions($input: [CodeActionCreateInput!]!) {
  createCodeActions(input: $input) {
    codeActions {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation CreateApiActions($input: [ApiActionCreateInput!]!) {
  createApiActions(input: $input) {
    apiActions {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation DeleteCodeActions($where: CodeActionWhere!, $delete: CodeActionDeleteInput) {
  deleteCodeActions(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new L(`
    mutation DeleteApiActions($where: ApiActionWhere!, $delete: ApiActionDeleteInput) {
  deleteApiActions(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new L(`
    query GetActions($codeActionWhere: CodeActionWhere, $apiActionWhere: ApiActionWhere, $codeActionOptions: CodeActionOptions, $apiActionOptions: ApiActionOptions) {
  apiActions(where: $apiActionWhere, options: $apiActionOptions) {
    ...Action
  }
  codeActions(where: $codeActionWhere, options: $codeActionOptions) {
    ...Action
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}`);
new L(`
    mutation CreateStores($input: [StoreCreateInput!]!) {
  createStores(input: $input) {
    info {
      nodesCreated
      relationshipsCreated
    }
    stores {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation DeleteStores($where: StoreWhere, $delete: StoreDeleteInput) {
  deleteStores(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `);
new L(`
    query GetStores($where: StoreWhere, $options: StoreOptions) {
  aggregate: storesAggregate(where: $where) {
    count
  }
  items: stores(options: $options, where: $where) {
    ...Store
  }
}
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  type
  store {
    id
    name
  }
}
fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
fragment Prop on Prop {
  data
  id
}
fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
  owner {
    id
  }
}
fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}`);
new L(`
    mutation UpdateStores($where: StoreWhere, $update: StoreUpdateInput) {
  updateStores(update: $update, where: $where) {
    stores {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation UpdateCodeActions($update: CodeActionUpdateInput, $where: CodeActionWhere) {
  updateCodeActions(update: $update, where: $where) {
    codeActions {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation UpdateApiActions($update: ApiActionUpdateInput, $where: ApiActionWhere) {
  updateApiActions(update: $update, where: $where) {
    apiActions {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation CreateTags($input: [TagCreateInput!]!) {
  createTags(input: $input) {
    tags {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation UpdateTags($where: TagWhere!, $update: TagUpdateInput!) {
  updateTags(update: $update, where: $where) {
    tags {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation DeleteTags($where: TagWhere!) {
  deleteTags(where: $where) {
    nodesDeleted
  }
}
    `);
new L(`
    query GetTags($options: TagOptions, $where: TagWhere) {
  aggregate: tagsAggregate(where: $where) {
    count
  }
  items: tags(options: $options, where: $where) {
    ...Tag
  }
}
    fragment Tag on Tag {
  children {
    id
    name
    owner {
      id
    }
  }
  descendants {
    id
    name
  }
  id
  name
  owner {
    id
  }
  parent {
    id
    name
  }
}`);
new L(`
    mutation CreatePrimitiveTypes($input: [PrimitiveTypeCreateInput!]!) {
  types: createPrimitiveTypes(input: $input) {
    types: primitiveTypes {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation CreateArrayTypes($input: [ArrayTypeCreateInput!]!) {
  types: createArrayTypes(input: $input) {
    types: arrayTypes {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation CreateUnionTypes($input: [UnionTypeCreateInput!]!) {
  types: createUnionTypes(input: $input) {
    types: unionTypes {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation CreateInterfaceTypes($input: [InterfaceTypeCreateInput!]!) {
  types: createInterfaceTypes(input: $input) {
    types: interfaceTypes {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation CreateElementTypes($input: [ElementTypeCreateInput!]!) {
  types: createElementTypes(input: $input) {
    types: elementTypes {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation CreateRenderPropTypes($input: [RenderPropTypeCreateInput!]!) {
  types: createRenderPropTypes(input: $input) {
    types: renderPropTypes {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation CreateReactNodeTypes($input: [ReactNodeTypeCreateInput!]!) {
  types: createReactNodeTypes(input: $input) {
    types: reactNodeTypes {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation CreateEnumTypes($input: [EnumTypeCreateInput!]!) {
  types: createEnumTypes(input: $input) {
    types: enumTypes {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation CreateLambdaTypes($input: [LambdaTypeCreateInput!]!) {
  types: createLambdaTypes(input: $input) {
    types: lambdaTypes {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation CreatePageTypes($input: [PageTypeCreateInput!]!) {
  types: createPageTypes(input: $input) {
    types: pageTypes {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation CreateAppTypes($input: [AppTypeCreateInput!]!) {
  types: createAppTypes(input: $input) {
    types: appTypes {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation CreateRichTextTypes($input: [RichTextTypeCreateInput!]!) {
  types: createRichTextTypes(input: $input) {
    types: richTextTypes {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation CreateActionTypes($input: [ActionTypeCreateInput!]!) {
  types: createActionTypes(input: $input) {
    types: actionTypes {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation CreateCodeMirrorTypes($input: [CodeMirrorTypeCreateInput!]!) {
  types: createCodeMirrorTypes(input: $input) {
    types: codeMirrorTypes {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation DeletePrimitiveTypes($delete: PrimitiveTypeDeleteInput, $where: PrimitiveTypeWhere) {
  deletePrimitiveTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new L(`
    mutation DeleteArrayTypes($delete: ArrayTypeDeleteInput, $where: ArrayTypeWhere) {
  deleteArrayTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new L(`
    mutation DeleteReactNodeTypes($delete: ReactNodeTypeDeleteInput, $where: ReactNodeTypeWhere) {
  deleteReactNodeTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new L(`
    mutation DeleteUnionTypes($delete: UnionTypeDeleteInput, $where: UnionTypeWhere) {
  deleteUnionTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new L(`
    mutation DeleteInterfaceTypes($delete: InterfaceTypeDeleteInput, $where: InterfaceTypeWhere) {
  deleteInterfaceTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new L(`
    mutation DeleteElementTypes($delete: ElementTypeDeleteInput, $where: ElementTypeWhere) {
  deleteElementTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new L(`
    mutation DeleteRenderPropTypes($delete: RenderPropTypeDeleteInput, $where: RenderPropTypeWhere) {
  deleteRenderPropTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new L(`
    mutation DeleteRichTextTypes($delete: RichTextTypeDeleteInput, $where: RichTextTypeWhere) {
  deleteRichTextTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new L(`
    mutation DeleteEnumTypes($delete: EnumTypeDeleteInput, $where: EnumTypeWhere) {
  deleteEnumTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
  deleteEnumTypeValues(where: {enumTypeConnection: {node: $where}}) {
    nodesDeleted
  }
}
    `);
new L(`
    mutation DeleteLambdaTypes($delete: LambdaTypeDeleteInput, $where: LambdaTypeWhere) {
  deleteLambdaTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new L(`
    mutation DeletePageTypes($delete: PageTypeDeleteInput, $where: PageTypeWhere) {
  deletePageTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new L(`
    mutation DeleteAppTypes($delete: AppTypeDeleteInput, $where: AppTypeWhere) {
  deleteAppTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new L(`
    mutation DeleteActionTypes($delete: ActionTypeDeleteInput, $where: ActionTypeWhere) {
  deleteActionTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new L(`
    mutation DeleteCodeMirrorTypes($delete: CodeMirrorTypeDeleteInput, $where: CodeMirrorTypeWhere) {
  deleteCodeMirrorTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new L(`
    query GetBaseTypes($where: IBaseTypeWhere, $options: IBaseTypeOptions) {
  iBaseTypes(where: $where, options: $options) {
    ...BaseType
  }
  aggregate: iBaseTypesAggregate(where: $where) {
    count
  }
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}`);
new L(`
    query GetTypes($ids: [ID!]) {
  actionTypes(where: {id_IN: $ids}) {
    ...Type
  }
  appTypes(where: {id_IN: $ids}) {
    ...Type
  }
  arrayTypes(where: {id_IN: $ids}) {
    ...Type
  }
  codeMirrorTypes(where: {id_IN: $ids}) {
    ...Type
  }
  elementTypes(where: {id_IN: $ids}) {
    ...Type
  }
  enumTypes(where: {id_IN: $ids}) {
    ...Type
  }
  interfaceTypes(where: {id_IN: $ids}) {
    ...Type
  }
  lambdaTypes(where: {id_IN: $ids}) {
    ...Type
  }
  pageTypes(where: {id_IN: $ids}) {
    ...Type
  }
  primitiveTypes(where: {id_IN: $ids}) {
    ...Type
  }
  reactNodeTypes(where: {id_IN: $ids}) {
    ...Type
  }
  renderPropTypes(where: {id_IN: $ids}) {
    ...Type
  }
  richTextTypes(where: {id_IN: $ids}) {
    ...Type
  }
  unionTypes(where: {id_IN: $ids}) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`);
new L(`
    query GetDescendants($ids: [ID!]) {
  arrayTypes(where: {id_IN: $ids}) {
    descendantTypesIds
  }
  interfaceTypes(where: {id_IN: $ids}) {
    descendantTypesIds
  }
  unionTypes(where: {id_IN: $ids}) {
    descendantTypesIds
  }
}
    `);
new L(`
    query GetPrimitiveTypes($options: PrimitiveTypeOptions, $where: PrimitiveTypeWhere) {
  types: primitiveTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`);
new L(`
    query GetArrayTypes($options: ArrayTypeOptions, $where: ArrayTypeWhere) {
  types: arrayTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`);
new L(`
    query GetUnionTypes($options: UnionTypeOptions, $where: UnionTypeWhere) {
  types: unionTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`);
new L(`
    query GetInterfaceTypes($options: InterfaceTypeOptions, $where: InterfaceTypeWhere) {
  types: interfaceTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`);
new L(`
    query GetElementTypes($options: ElementTypeOptions, $where: ElementTypeWhere) {
  types: elementTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`);
new L(`
    query GetRenderPropTypes($options: RenderPropTypeOptions, $where: RenderPropTypeWhere) {
  types: renderPropTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`);
new L(`
    query GetReactNodeTypes($options: ReactNodeTypeOptions, $where: ReactNodeTypeWhere) {
  types: reactNodeTypes(options: $options, where: $where) {
    ...ReactNodeType
  }
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}`);
new L(`
    query GetRichTextTypes($options: RichTextTypeOptions, $where: RichTextTypeWhere) {
  types: richTextTypes(options: $options, where: $where) {
    ...RichTextType
  }
}
    fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment RichTextType on RichTextType {
  ...BaseType
}`);
new L(`
    query GetEnumTypes($options: EnumTypeOptions, $where: EnumTypeWhere) {
  types: enumTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`);
new L(`
    query GetLambdaTypes($options: LambdaTypeOptions, $where: LambdaTypeWhere) {
  types: lambdaTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`);
new L(`
    query GetPageTypes($options: PageTypeOptions, $where: PageTypeWhere) {
  types: pageTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`);
new L(`
    query GetAppTypes($options: AppTypeOptions, $where: AppTypeWhere) {
  types: appTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`);
new L(`
    query GetActionTypes($options: ActionTypeOptions, $where: ActionTypeWhere) {
  types: actionTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`);
new L(`
    query GetCodeMirrorTypes($options: CodeMirrorTypeOptions, $where: CodeMirrorTypeWhere) {
  types: codeMirrorTypes(options: $options, where: $where) {
    ...Type
  }
}
    fragment ActionType on ActionType {
  ...BaseType
}
fragment AppType on AppType {
  ...BaseType
}
fragment ArrayType on ArrayType {
  ...BaseType
  itemType {
    ... on IBaseType {
      ...BaseType
    }
  }
}
fragment BaseType on IBaseType {
  __typename
  id
  kind
  name
  owner {
    id
  }
}
fragment CodeMirrorType on CodeMirrorType {
  ...BaseType
  language
}
fragment ElementType on ElementType {
  ...BaseType
  elementKind
}
fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
fragment EnumType on EnumType {
  ...BaseType
  allowedValues {
    ...EnumTypeValue
  }
}
fragment Field on Field {
  __typename
  api {
    ... on InterfaceType {
      ...BaseType
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      ...BaseType
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
fragment InterfaceType on InterfaceType {
  ...BaseType
  fields {
    ...Field
  }
}
fragment LambdaType on LambdaType {
  ...BaseType
}
fragment PageType on PageType {
  ...BaseType
}
fragment PrimitiveType on PrimitiveType {
  ...BaseType
  primitiveKind
}
fragment ReactNodeType on ReactNodeType {
  ...BaseType
}
fragment RenderPropType on RenderPropType {
  ...BaseType
}
fragment RichTextType on RichTextType {
  ...BaseType
}
fragment Type on IBaseType {
  ...ActionType
  ...AppType
  ...ArrayType
  ...CodeMirrorType
  ...ElementType
  ...EnumType
  ...InterfaceType
  ...LambdaType
  ...PageType
  ...PrimitiveType
  ...ReactNodeType
  ...RenderPropType
  ...RichTextType
  ...UnionType
}
fragment UnionType on UnionType {
  ...BaseType
  typesOfUnionType {
    ... on IBaseType {
      ...BaseType
    }
  }
}`);
new L(`
    query InterfaceForm_GetApps($options: AppOptions, $where: AppWhere) {
  apps(options: $options, where: $where) {
    id
    name
  }
}
    `);
new L(`
    query InterfaceForm_GetAtoms($options: AtomOptions, $where: AtomWhere) {
  atoms(options: $options, where: $where) {
    id
    name
    type
  }
}
    `);
new L(`
    query InterfaceForm_GetActions($appId: ID) {
  apiActions {
    id
    name
  }
  codeActions {
    id
    name
  }
}
    `);
new L(`
    query InterfaceForm_GetStores($options: StoreOptions, $where: StoreWhere) {
  stores(options: $options, where: $where) {
    id
    name
  }
}
    `);
new L(`
    query InterfaceForm_GetResource($options: ResourceOptions, $where: ResourceWhere) {
  resources(options: $options, where: $where) {
    id
    name
  }
}
    `);
new L(`
    query InterfaceForm_GetPages($options: PageOptions, $where: PageWhere) {
  pages(options: $options, where: $where) {
    id
    name
  }
}
    `);
new L(`
    query IsTypeDescendantOf($descendantTypeId: ID!, $parentTypeId: ID!) {
  isTypeDescendantOf(
    descendantTypeId: $descendantTypeId
    parentTypeId: $parentTypeId
  )
}
    `);
new L(`
    query GetTypeReferences($typeId: ID!) {
  getTypeReferences(typeId: $typeId) {
    label
    name
  }
}
    `);
new L(`
    mutation UpdatePrimitiveTypes($update: PrimitiveTypeUpdateInput, $where: PrimitiveTypeWhere) {
  types: updatePrimitiveTypes(update: $update, where: $where) {
    types: primitiveTypes {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation UpdateArrayTypes($update: ArrayTypeUpdateInput, $where: ArrayTypeWhere) {
  types: updateArrayTypes(update: $update, where: $where) {
    types: arrayTypes {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation UpdateUnionTypes($update: UnionTypeUpdateInput, $where: UnionTypeWhere) {
  types: updateUnionTypes(update: $update, where: $where) {
    types: unionTypes {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation UpdateInterfaceTypes($update: InterfaceTypeUpdateInput, $where: InterfaceTypeWhere) {
  types: updateInterfaceTypes(update: $update, where: $where) {
    types: interfaceTypes {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation UpdateReactNodeTypes($update: ReactNodeTypeUpdateInput, $where: ReactNodeTypeWhere) {
  types: updateReactNodeTypes(update: $update, where: $where) {
    types: reactNodeTypes {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation UpdateElementTypes($update: ElementTypeUpdateInput, $where: ElementTypeWhere) {
  types: updateElementTypes(update: $update, where: $where) {
    types: elementTypes {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation UpdateRenderPropTypes($update: RenderPropTypeUpdateInput, $where: RenderPropTypeWhere) {
  types: updateRenderPropTypes(update: $update, where: $where) {
    types: renderPropTypes {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation UpdateEnumTypes($update: EnumTypeUpdateInput, $where: EnumTypeWhere) {
  types: updateEnumTypes(update: $update, where: $where) {
    types: enumTypes {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation UpdateLambdaTypes($update: LambdaTypeUpdateInput, $where: LambdaTypeWhere) {
  types: updateLambdaTypes(update: $update, where: $where) {
    types: lambdaTypes {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation UpdatePageTypes($update: PageTypeUpdateInput, $where: PageTypeWhere) {
  types: updatePageTypes(update: $update, where: $where) {
    types: pageTypes {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation UpdateAppTypes($update: AppTypeUpdateInput, $where: AppTypeWhere) {
  types: updateAppTypes(update: $update, where: $where) {
    types: appTypes {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation UpdateRichTextTypes($update: RichTextTypeUpdateInput, $where: RichTextTypeWhere) {
  types: updateRichTextTypes(update: $update, where: $where) {
    types: richTextTypes {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation UpdateActionTypes($update: ActionTypeUpdateInput, $where: ActionTypeWhere) {
  types: updateActionTypes(update: $update, where: $where) {
    types: actionTypes {
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation UpdateCodeMirrorTypes($update: CodeMirrorTypeUpdateInput, $where: CodeMirrorTypeWhere) {
  types: updateCodeMirrorTypes(update: $update, where: $where) {
    types: codeMirrorTypes {
      __typename
      id
    }
  }
}
    `);
new L(`
    query GetUsers($where: UserWhere) {
  aggregate: usersAggregate(where: $where) {
    count
  }
  items: users(where: $where) {
    ...User
  }
}
    fragment Preference on Preference {
  id
  builderBreakpointType
  builderWidth
  activeConfigPaneTab
  owner {
    id
  }
}
fragment User on User {
  apps {
    id
  }
  auth0Id
  email
  id
  preferences {
    ...Preference
  }
  roles
  username
  name
  picture
}`);
new L(`
    mutation CreateUser($input: [UserCreateInput!]!) {
  createUsers(input: $input) {
    users {
      email
      __typename
      id
    }
  }
}
    `);
new L(`
    mutation DeleteUsers($where: UserWhere!) {
  deleteUsers(where: $where) {
    nodesDeleted
  }
}
    `);
new L(`
    mutation UpdateUsers($where: UserWhere!, $update: UserUpdateInput!) {
  updateUsers(update: $update, where: $where) {
    users {
      __typename
      id
    }
  }
}
    `);
const NV = J.DiscriminatedRef(ru.ApiAction), DV = J.DiscriminatedRef(ru.CodeAction), aP = S.Union([
  NV,
  DV
]), $S = S.Object({
  id: S.String(),
  name: S.String(),
  store: J.RefSchema,
  type: S.Enum(ru)
}), MS = S.Composite([
  $S,
  S.Object({
    __typename: S.Literal(`${ru.ApiAction}`),
    config: tu,
    errorAction: J.Nullish(aP),
    resource: J.RefSchema,
    successAction: J.Nullish(aP)
  })
]), UV = MS, CS = S.Composite([
  $S,
  S.Object({
    __typename: S.Literal(`${ru.CodeAction}`),
    code: S.String()
  })
]), LV = CS;
S.Union(
  [MS, CS],
  {
    discriminantKey: "__typename",
    errorMessage: "Unknown action type name"
  }
);
const VV = S.Union([UV, LV], {
  discriminantKey: "__typename",
  errorMessage: "Unknown action type name"
}), pl = S.Object({
  api: J.Nullish(J.RefSchema),
  // Sync with dto since some nested may need to match for extending
  data: S.Record(S.String(), S.Any()),
  id: S.String()
});
var vc = /* @__PURE__ */ ((e) => (e.Atom = "Atom", e.Component = "Component", e))(vc || {});
const qV = S.Union(
  [
    J.DiscriminatedRef(
      "Atom"
      /* Atom */
    ),
    J.DiscriminatedRef(
      "Component"
      /* Component */
    )
  ],
  { discriminantKey: "__typename" }
), ll = S.Object({
  childMapperComponent: J.Nullish(J.RefSchema),
  childMapperPreviousSibling: J.Nullish(J.RefSchema),
  childMapperPropKey: J.Nullish(S.String()),
  /**
   * For frontend models we can compute from Mobx, but for backend we would map the data in
   *
   * This is not used for creation, but rather a computed value
   *
   * `Page` or `Component`
   *
   * Used for composite key, could be `Page` or `Component` type. This key is only needed for creation so we know how to make the connection
   *
   * Instead of mapping value in, we put together in dto structure
   */
  closestContainerNode: J.RefSchema,
  compositeKey: J.Nullish(S.String()),
  firstChild: J.Nullish(J.RefSchema),
  id: S.String(),
  name: S.String(),
  nextSibling: J.Nullish(J.RefSchema),
  page: J.Nullish(J.RefSchema),
  parentComponent: J.Nullish(J.RefSchema),
  parentElement: J.Nullish(J.RefSchema),
  postRenderActions: J.Nullish(S.Array(J.RefSchema)),
  preRenderActions: J.Nullish(S.Array(J.RefSchema)),
  prevSibling: J.Nullish(J.RefSchema),
  // Treat element as aggregate, so we include prop data here
  props: tu,
  renderForEachPropKey: J.Nullish(S.String()),
  renderIfExpression: J.Nullish(S.String()),
  renderType: S.Omit(qV, ["name"]),
  style: J.Nullish(S.String()),
  tailwindClassNames: J.Nullish(S.Array(S.String()))
});
S.Composite([
  S.Object({
    /**
     * We have renderType here
     */
    // Can't use `IAtomType` due to circular import issue
    atom: S.Optional(S.Enum(kg)),
    // Name of the Component
    component: S.Optional(S.String()),
    propsData: S.Optional(S.Object({}))
  }),
  S.Pick(ll, [
    "childMapperComponent",
    "childMapperPreviousSibling",
    "childMapperPropKey",
    "id",
    "name",
    "page",
    "parentComponent",
    "parentElement",
    "postRenderActions",
    "preRenderActions",
    "prevSibling"
  ])
]);
const KV = S.Object({
  ...ll.properties,
  props: tu
});
S.Object({
  ...ll.properties,
  props: pl
});
const GV = S.Object({
  activeConfigPaneTab: S.Enum(AS),
  builderBreakpointType: S.Enum(OS),
  builderWidth: S.Number(),
  id: S.String()
});
S.Object({
  apps: S.Optional(S.Array(J.RefSchema)),
  auth0Id: S.String(),
  email: S.String(),
  id: S.String(),
  name: S.String(),
  picture: S.String(),
  preferences: GV,
  roles: S.Array(S.Enum(ES)),
  username: S.String()
});
const BS = S.Object({
  owner: J.RefSchema
}), HV = S.Composite([
  BS,
  S.Object({
    __typename: S.Literal(`${vc.Atom}`),
    api: J.RefSchema,
    externalCssSource: J.Nullish(S.String()),
    externalJsSource: J.Nullish(S.String()),
    externalSourceType: J.Nullish(S.String()),
    icon: J.Nullish(S.String()),
    id: S.String(),
    name: S.String(),
    requiredParents: S.Optional(S.Array(J.RefSchema)),
    suggestedChildren: S.Optional(S.Array(J.RefSchema)),
    tags: S.Optional(S.Array(J.RefSchema)),
    type: S.Enum(kg)
  })
]), kV = S.Literal(
  `${Ee}`
);
S.Transform(kV).Decode((e) => Ee[e]).Encode((e) => e);
S.Object({
  __typename: S.String(),
  id: S.String(),
  kind: S.Enum(Ee),
  name: S.String()
});
const ot = (e) => S.Object({
  /**
   * Needs to be optional since our Neo4j OGM returns only optional
   */
  __typename: S.Literal(e),
  id: S.String(),
  kind: S.Enum(Ee),
  name: S.String(),
  owner: J.RefSchema
}), WV = ot(`${Ee.ActionType}`), jS = S.Union(
  [
    J.DiscriminatedRef(`${Ee.ActionType}`),
    J.DiscriminatedRef(`${Ee.AppType}`),
    J.DiscriminatedRef(`${Ee.ArrayType}`),
    J.DiscriminatedRef(`${Ee.CodeMirrorType}`),
    J.DiscriminatedRef(`${Ee.ElementType}`),
    J.DiscriminatedRef(`${Ee.EnumType}`),
    J.DiscriminatedRef(`${Ee.InterfaceType}`),
    J.DiscriminatedRef(`${Ee.LambdaType}`),
    J.DiscriminatedRef(`${Ee.PageType}`),
    J.DiscriminatedRef(`${Ee.PrimitiveType}`),
    J.DiscriminatedRef(`${Ee.ReactNodeType}`),
    J.DiscriminatedRef(`${Ee.RenderPropType}`),
    J.DiscriminatedRef(`${Ee.RichTextType}`),
    J.DiscriminatedRef(`${Ee.UnionType}`)
  ],
  { discriminantKey: "__typename", errorMessage: "Unknown type" }
), zV = ot(`${Ee.AppType}`), JV = S.Composite([
  ot(`${Ee.ArrayType}`),
  S.Object({
    itemType: S.Optional(jS)
  })
]);
S.Object({
  __typename: S.Literal(`${Ee}`),
  id: S.String(),
  kind: S.Enum(Ee),
  name: S.String(),
  owner: J.RefSchema
});
const YV = S.Composite([
  ot(`${Ee.CodeMirrorType}`),
  S.Object({
    language: S.Enum(PS)
  })
]), XV = S.Composite([
  ot(`${Ee.ElementType}`),
  S.Object({
    elementKind: S.Enum(wS)
  })
]), QV = S.Object({
  id: S.String(),
  key: S.String(),
  value: S.String()
}), ZV = S.Composite([
  ot(`${Ee.EnumType}`),
  S.Object({
    allowedValues: S.Array(QV)
  })
]), xS = S.Composite([
  ot(`${Ee.InterfaceType}`),
  S.Object({
    fields: S.Optional(S.Array(J.RefSchema, { default: [] }))
  })
]);
J.DiscriminatedRef(
  Ee.InterfaceType
);
const eq = S.Composite([
  ot(`${Ee.LambdaType}`)
]), nq = S.Composite([
  ot(`${Ee.PageType}`)
]), tq = S.Composite([
  ot(`${Ee.PrimitiveType}`),
  S.Object({
    primitiveKind: S.Enum(SS)
  })
]), rq = S.Composite([
  ot(`${Ee.ReactNodeType}`)
]), iq = S.Composite([
  ot(`${Ee.RenderPropType}`)
]), oq = S.Composite([
  ot(`${Ee.RichTextType}`)
]), aq = S.Composite([
  ot(`${Ee.UnionType}`),
  S.Object({
    typesOfUnionType: S.Array(jS)
  })
]), FS = [
  WV,
  zV,
  JV,
  YV,
  XV,
  ZV,
  xS,
  eq,
  nq,
  tq,
  rq,
  iq,
  oq,
  aq
];
S.Union(FS, {
  discriminantKey: "__typename",
  errorMessage: "Unknown type"
});
const Cs = (e) => S.Omit(e, ["owner"]), NS = S.Union(
  FS.map(Cs),
  {
    discriminantKey: "__typename",
    errorMessage: "Unknown type"
  }
), DS = S.Object({
  api: J.RefSchema,
  defaultValues: J.Nullish(S.Any()),
  description: J.Nullish(S.String()),
  fieldType: J.RefSchema,
  id: S.String(),
  key: S.String(),
  name: J.Nullish(S.String()),
  nextSibling: J.Nullish(J.RefSchema),
  prevSibling: J.Nullish(J.RefSchema),
  validationRules: J.Nullish(S.Any())
});
S.Omit(DS, ["owner"]);
const sq = S.Composite([
  S.Omit(xS, ["fields"]),
  S.Object({
    fields: S.Array(DS)
  })
]), zg = S.Composite([
  S.Object({
    types: S.Array(NS)
  }),
  Cs(sq)
]), uq = S.Composite([
  S.Object({
    __typename: S.Literal(`${vc.Atom}`)
  }),
  HV
]), cq = S.Object({
  api: zg,
  atom: Cs(uq)
}), dq = S.Object({
  actions: S.Optional(S.Array(J.RefSchema)),
  api: J.RefSchema,
  component: J.Nullish(J.RefSchema),
  id: S.String(),
  name: S.String(),
  page: J.Nullish(J.RefSchema)
}), fq = S.Composite([
  S.Omit(dq, ["component", "page"]),
  S.Object({
    actions: S.Array(J.RefSchema),
    api: J.RefSchema
  })
]), US = S.Object({
  actions: S.Array(VV),
  api: zg,
  store: fq
}), LS = S.Object({
  __typename: S.Literal(`${vc.Component}`),
  api: J.RefSchema,
  id: S.String(),
  name: S.String(),
  owner: J.RefSchema,
  props: tu,
  rootElement: J.RefSchema,
  store: J.RefSchema
}), VS = S.Object({
  api: zg,
  component: Cs(LS),
  elements: S.Array(ll),
  store: US
});
S.Object({
  ...LS.properties,
  __typename: S.Literal(`${vc.Component}`),
  props: pl,
  slug: S.String()
});
const qS = S.Object({
  children: S.Optional(S.Array(J.RefSchema)),
  // This is computed property
  descendants: S.Optional(S.Array(J.RefSchema)),
  id: S.String(),
  name: S.String(),
  owner: J.RefSchema,
  parent: J.Nullish(J.RefSchema)
}), pq = qS;
S.Omit(qS, ["owner"]);
S.Object({
  atoms: S.Array(cq),
  components: S.Array(VS),
  // resources: Array<IResourceOutputDto>
  systemTypes: S.Array(NS),
  tags: S.Array(pq)
});
const KS = S.Object({
  adminDataPath: S.String({
    default: "./data/export-v3"
  }),
  download: S.Optional(
    S.Boolean({
      default: !1
      // description: 'Saves to codebase if not downloading',
    })
  )
  // includeAdminData: Type.Optional(Type.Boolean({ default: true })),
  // includeUserData: Type.Optional(Type.Boolean()),
  // userDataPath: Type.Optional(Type.String()),
});
Ov(KS);
const lq = S.Pick(KS, ["adminDataPath"]);
Ov(lq);
const yq = S.Object({
  app: J.RefSchema,
  /**
   * https://stackoverflow.com/a/74650249/2159920
   *
   * domainConfig: { misconfigured: boolean } | undefined
   */
  domainConfig: S.Union([
    S.Object({
      misconfigured: S.Boolean()
    }),
    S.Undefined()
  ]),
  id: S.String(),
  name: S.String()
}), GS = yq, HS = S.Object({
  app: J.RefSchema,
  /**
   * a pre-computed descendant elements ids
   */
  elements: S.Optional(S.Array(J.RefSchema)),
  id: S.String(),
  kind: S.Enum(vS),
  name: S.String(),
  // The container element of the page
  pageContentContainer: J.Nullish(J.RefSchema),
  redirect: J.Nullish(J.RefSchema),
  rootElement: J.RefSchema,
  store: J.RefSchema,
  urlPattern: S.String()
}), mq = S.Object({
  elements: S.Array(KV),
  page: HS,
  store: US
}), gq = S.Composite([
  HS,
  S.Object({
    slug: S.String()
  })
]), kS = S.Object({
  config: tu,
  id: S.String(),
  name: S.String(),
  owner: J.RefSchema,
  type: S.Enum(Wg)
});
S.Object({
  config: pl,
  id: S.String(),
  name: S.String(),
  owner: J.RefSchema,
  type: S.Enum(Wg)
});
const Tq = S.Object({
  headers: S.Optional(S.String()),
  url: S.String()
});
S.Object({
  ...kS.properties,
  config: Tq
});
var WS = /* @__PURE__ */ ((e) => (e.DELETE = "DELETE", e.GET = "GET", e.HEAD = "HEAD", e.OPTION = "OPTION", e.PATCH = "PATCH", e.POST = "POST", e.PUT = "PUT", e))(WS || {}), zS = /* @__PURE__ */ ((e) => (e.ArrayBuffer = "arraybuffer", e.Blob = "blob", e.Document = "document", e.Json = "json", e.Stream = "stream", e.Text = "text", e))(zS || {});
const _q = S.Object({
  body: J.Nullish(S.String()),
  headers: J.Nullish(S.String()),
  method: S.Enum(WS),
  queryParams: J.Nullish(S.String()),
  responseType: S.Enum(zS),
  urlSegment: S.String()
}), bq = S.Object({
  headers: J.Nullish(S.String()),
  query: S.String(),
  variables: J.Nullish(S.String())
});
S.Object({
  data: J.Nullish(S.Any()),
  error: J.Nullish(S.Any()),
  headers: J.Nullish(S.Record(S.String(), S.Any())),
  status: J.Nullish(S.Number()),
  statusText: J.Nullish(S.String())
});
S.Union([
  _q,
  bq
]);
const JS = S.Object({
  ...BS.properties,
  domains: S.Optional(S.Array(J.RefSchema)),
  id: S.String(),
  name: S.String(),
  pages: S.Optional(S.Array(J.RefSchema))
});
S.Object({
  app: Cs(JS),
  components: S.Array(VS),
  domains: S.Array(GS),
  pages: S.Array(mq),
  resources: S.Array(Cs(kS))
});
S.Object({
  ...JS.properties,
  domains: S.Optional(S.Array(GS)),
  pages: S.Optional(S.Array(gq))
});
const hq = S.Object({
  config: tu,
  id: S.String(),
  name: S.String(),
  owner: J.RefSchema,
  resource: J.RefSchema,
  responseTransformer: S.String()
});
S.Object({
  ...hq.properties,
  config: pl
});
S.Object({
  authGuard: J.RefSchema,
  id: S.String(),
  source: J.RefSchema,
  targetPage: J.Nullish(J.RefSchema),
  targetType: S.Enum(RS),
  targetUrl: J.Nullish(S.String())
});
S.Object({
  authorization: J.Nullish(S.String()),
  domain: S.String(),
  pageUrlPattern: S.String()
});
var jf = { exports: {} }, Iq = jf.exports, sP;
function Oq() {
  return sP || (sP = 1, function(e, n) {
    (function(t, r, i) {
      e.exports = i(), e.exports.default = i();
    })("slugify", Iq, function() {
      var t = JSON.parse(`{"$":"dollar","%":"percent","&":"and","<":"less",">":"greater","|":"or","¢":"cent","£":"pound","¤":"currency","¥":"yen","©":"(c)","ª":"a","®":"(r)","º":"o","À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","þ":"th","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Č":"C","č":"c","Ď":"D","ď":"d","Đ":"DJ","đ":"dj","Ē":"E","ē":"e","Ė":"E","ė":"e","Ę":"e","ę":"e","Ě":"E","ě":"e","Ğ":"G","ğ":"g","Ģ":"G","ģ":"g","Ĩ":"I","ĩ":"i","Ī":"i","ī":"i","Į":"I","į":"i","İ":"I","ı":"i","Ķ":"k","ķ":"k","Ļ":"L","ļ":"l","Ľ":"L","ľ":"l","Ł":"L","ł":"l","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","Ō":"O","ō":"o","Ő":"O","ő":"o","Œ":"OE","œ":"oe","Ŕ":"R","ŕ":"r","Ř":"R","ř":"r","Ś":"S","ś":"s","Ş":"S","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","Ť":"T","ť":"t","Ũ":"U","ũ":"u","Ū":"u","ū":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","Ə":"E","ƒ":"f","Ơ":"O","ơ":"o","Ư":"U","ư":"u","ǈ":"LJ","ǉ":"lj","ǋ":"NJ","ǌ":"nj","Ș":"S","ș":"s","Ț":"T","ț":"t","ə":"e","˚":"o","Ά":"A","Έ":"E","Ή":"H","Ί":"I","Ό":"O","Ύ":"Y","Ώ":"W","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ϊ":"I","Ϋ":"Y","ά":"a","έ":"e","ή":"h","ί":"i","ΰ":"y","α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","ς":"s","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ϊ":"i","ϋ":"y","ό":"o","ύ":"y","ώ":"w","Ё":"Yo","Ђ":"DJ","Є":"Ye","І":"I","Ї":"Yi","Ј":"J","Љ":"LJ","Њ":"NJ","Ћ":"C","Џ":"DZ","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"U","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya","а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sh","ъ":"u","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","ё":"yo","ђ":"dj","є":"ye","і":"i","ї":"yi","ј":"j","љ":"lj","њ":"nj","ћ":"c","ѝ":"u","џ":"dz","Ґ":"G","ґ":"g","Ғ":"GH","ғ":"gh","Қ":"KH","қ":"kh","Ң":"NG","ң":"ng","Ү":"UE","ү":"ue","Ұ":"U","ұ":"u","Һ":"H","һ":"h","Ә":"AE","ә":"ae","Ө":"OE","ө":"oe","Ա":"A","Բ":"B","Գ":"G","Դ":"D","Ե":"E","Զ":"Z","Է":"E'","Ը":"Y'","Թ":"T'","Ժ":"JH","Ի":"I","Լ":"L","Խ":"X","Ծ":"C'","Կ":"K","Հ":"H","Ձ":"D'","Ղ":"GH","Ճ":"TW","Մ":"M","Յ":"Y","Ն":"N","Շ":"SH","Չ":"CH","Պ":"P","Ջ":"J","Ռ":"R'","Ս":"S","Վ":"V","Տ":"T","Ր":"R","Ց":"C","Փ":"P'","Ք":"Q'","Օ":"O''","Ֆ":"F","և":"EV","ء":"a","آ":"aa","أ":"a","ؤ":"u","إ":"i","ئ":"e","ا":"a","ب":"b","ة":"h","ت":"t","ث":"th","ج":"j","ح":"h","خ":"kh","د":"d","ذ":"th","ر":"r","ز":"z","س":"s","ش":"sh","ص":"s","ض":"dh","ط":"t","ظ":"z","ع":"a","غ":"gh","ف":"f","ق":"q","ك":"k","ل":"l","م":"m","ن":"n","ه":"h","و":"w","ى":"a","ي":"y","ً":"an","ٌ":"on","ٍ":"en","َ":"a","ُ":"u","ِ":"e","ْ":"","٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","پ":"p","چ":"ch","ژ":"zh","ک":"k","گ":"g","ی":"y","۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9","฿":"baht","ა":"a","ბ":"b","გ":"g","დ":"d","ე":"e","ვ":"v","ზ":"z","თ":"t","ი":"i","კ":"k","ლ":"l","მ":"m","ნ":"n","ო":"o","პ":"p","ჟ":"zh","რ":"r","ს":"s","ტ":"t","უ":"u","ფ":"f","ქ":"k","ღ":"gh","ყ":"q","შ":"sh","ჩ":"ch","ც":"ts","ძ":"dz","წ":"ts","ჭ":"ch","ხ":"kh","ჯ":"j","ჰ":"h","Ṣ":"S","ṣ":"s","Ẁ":"W","ẁ":"w","Ẃ":"W","ẃ":"w","Ẅ":"W","ẅ":"w","ẞ":"SS","Ạ":"A","ạ":"a","Ả":"A","ả":"a","Ấ":"A","ấ":"a","Ầ":"A","ầ":"a","Ẩ":"A","ẩ":"a","Ẫ":"A","ẫ":"a","Ậ":"A","ậ":"a","Ắ":"A","ắ":"a","Ằ":"A","ằ":"a","Ẳ":"A","ẳ":"a","Ẵ":"A","ẵ":"a","Ặ":"A","ặ":"a","Ẹ":"E","ẹ":"e","Ẻ":"E","ẻ":"e","Ẽ":"E","ẽ":"e","Ế":"E","ế":"e","Ề":"E","ề":"e","Ể":"E","ể":"e","Ễ":"E","ễ":"e","Ệ":"E","ệ":"e","Ỉ":"I","ỉ":"i","Ị":"I","ị":"i","Ọ":"O","ọ":"o","Ỏ":"O","ỏ":"o","Ố":"O","ố":"o","Ồ":"O","ồ":"o","Ổ":"O","ổ":"o","Ỗ":"O","ỗ":"o","Ộ":"O","ộ":"o","Ớ":"O","ớ":"o","Ờ":"O","ờ":"o","Ở":"O","ở":"o","Ỡ":"O","ỡ":"o","Ợ":"O","ợ":"o","Ụ":"U","ụ":"u","Ủ":"U","ủ":"u","Ứ":"U","ứ":"u","Ừ":"U","ừ":"u","Ử":"U","ử":"u","Ữ":"U","ữ":"u","Ự":"U","ự":"u","Ỳ":"Y","ỳ":"y","Ỵ":"Y","ỵ":"y","Ỷ":"Y","ỷ":"y","Ỹ":"Y","ỹ":"y","–":"-","‘":"'","’":"'","“":"\\"","”":"\\"","„":"\\"","†":"+","•":"*","…":"...","₠":"ecu","₢":"cruzeiro","₣":"french franc","₤":"lira","₥":"mill","₦":"naira","₧":"peseta","₨":"rupee","₩":"won","₪":"new shequel","₫":"dong","€":"euro","₭":"kip","₮":"tugrik","₯":"drachma","₰":"penny","₱":"peso","₲":"guarani","₳":"austral","₴":"hryvnia","₵":"cedi","₸":"kazakhstani tenge","₹":"indian rupee","₺":"turkish lira","₽":"russian ruble","₿":"bitcoin","℠":"sm","™":"tm","∂":"d","∆":"delta","∑":"sum","∞":"infinity","♥":"love","元":"yuan","円":"yen","﷼":"rial","ﻵ":"laa","ﻷ":"laa","ﻹ":"lai","ﻻ":"la"}`), r = JSON.parse('{"bg":{"Й":"Y","Ц":"Ts","Щ":"Sht","Ъ":"A","Ь":"Y","й":"y","ц":"ts","щ":"sht","ъ":"a","ь":"y"},"de":{"Ä":"AE","ä":"ae","Ö":"OE","ö":"oe","Ü":"UE","ü":"ue","ß":"ss","%":"prozent","&":"und","|":"oder","∑":"summe","∞":"unendlich","♥":"liebe"},"es":{"%":"por ciento","&":"y","<":"menor que",">":"mayor que","|":"o","¢":"centavos","£":"libras","¤":"moneda","₣":"francos","∑":"suma","∞":"infinito","♥":"amor"},"fr":{"%":"pourcent","&":"et","<":"plus petit",">":"plus grand","|":"ou","¢":"centime","£":"livre","¤":"devise","₣":"franc","∑":"somme","∞":"infini","♥":"amour"},"pt":{"%":"porcento","&":"e","<":"menor",">":"maior","|":"ou","¢":"centavo","∑":"soma","£":"libra","∞":"infinito","♥":"amor"},"uk":{"И":"Y","и":"y","Й":"Y","й":"y","Ц":"Ts","ц":"ts","Х":"Kh","х":"kh","Щ":"Shch","щ":"shch","Г":"H","г":"h"},"vi":{"Đ":"D","đ":"d"},"da":{"Ø":"OE","ø":"oe","Å":"AA","å":"aa","%":"procent","&":"og","|":"eller","$":"dollar","<":"mindre end",">":"større end"},"nb":{"&":"og","Å":"AA","Æ":"AE","Ø":"OE","å":"aa","æ":"ae","ø":"oe"},"it":{"&":"e"},"nl":{"&":"en"},"sv":{"&":"och","Å":"AA","Ä":"AE","Ö":"OE","å":"aa","ä":"ae","ö":"oe"}}');
      function i(o, a) {
        if (typeof o != "string")
          throw new Error("slugify: string argument expected");
        a = typeof a == "string" ? { replacement: a } : a || {};
        var s = r[a.locale] || {}, c = a.replacement === void 0 ? "-" : a.replacement, u = a.trim === void 0 ? !0 : a.trim, f = o.normalize().split("").reduce(function(d, p) {
          var T = s[p];
          return T === void 0 && (T = t[p]), T === void 0 && (T = p), T === c && (T = " "), d + T.replace(a.remove || /[^\w\s$*_+~.()'"!\-:@]+/g, "");
        }, "");
        return a.strict && (f = f.replace(/[^A-Za-z0-9\s]/g, "")), u && (f = f.trim()), f = f.replace(/\s+/g, c), a.lower && (f = f.toLowerCase()), f;
      }
      return i.extend = function(o) {
        Object.assign(t, o);
      }, i;
    });
  }(jf)), jf.exports;
}
Oq();
const Pq = (e) => Wl(e) && e.includes(dP) && e.includes(fP), Bq = (e, n) => Iy(
  e,
  // value mapper
  (t) => Wl(t) ? uP(t, n) : t,
  // key mapper
  (t, r) => Wl(r) ? uP(r, n) : r
), YS = (e) => {
  var n, t;
  return e.startsWith(dP) && e.endsWith(fP) && ((n = e.match(eR)) == null ? void 0 : n.length) === 1 && ((t = e.match(nR)) == null ? void 0 : t.length) === 1;
}, Aq = (e) => YS(e) ? e.substring(2, e.length - 2).trim() : e.replace(
  pP,
  (n) => n.substring(2, n.length - 2).trim()
), uP = (e, n) => Pq(e) ? YS(e) ? cP(e, n) : e.replace(
  pP,
  (r) => cP(r, n)
) : e, cP = (e, n) => {
  try {
    const t = `return ${Aq(e)}`, r = iR(n).sort();
    return new Function(...r, t)(
      ...r.map((i) => n[i])
    );
  } catch (t) {
    return console.log(t), e;
  }
};
export {
  fP as EXP_PATH_TEMPLATE_END,
  nR as EXP_PATH_TEMPLATE_END_REGEX,
  pP as EXP_PATH_TEMPLATE_REGEX,
  dP as EXP_PATH_TEMPLATE_START,
  Sq as EXP_PATH_TEMPLATE_START_OPEN_REGEX,
  eR as EXP_PATH_TEMPLATE_START_REGEX,
  cP as evaluateExpression,
  Bq as evaluateObject,
  Pq as hasExpression,
  YS as isSingleExpression,
  Aq as stripExpression
};
