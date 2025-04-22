import jn, { jsx as Ln } from "react/jsx-runtime";
import * as w from "react";
import ne, { version as Dn, useContext as Ge } from "react";
var Ma = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Fr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var st = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
var rr;
function Hn() {
  return rr || (rr = 1, function(e) {
    (function() {
      var t = {}.hasOwnProperty;
      function r() {
        for (var i = "", a = 0; a < arguments.length; a++) {
          var c = arguments[a];
          c && (i = o(i, n(c)));
        }
        return i;
      }
      function n(i) {
        if (typeof i == "string" || typeof i == "number")
          return i;
        if (typeof i != "object")
          return "";
        if (Array.isArray(i))
          return r.apply(null, i);
        if (i.toString !== Object.prototype.toString && !i.toString.toString().includes("[native code]"))
          return i.toString();
        var a = "";
        for (var c in i)
          t.call(i, c) && i[c] && (a = o(a, c));
        return a;
      }
      function o(i, a) {
        return a ? i ? i + " " + a : i + a : i;
      }
      e.exports ? (r.default = r, e.exports = r) : window.classNames = r;
    })();
  }(st)), st.exports;
}
var zn = Hn();
const ie = /* @__PURE__ */ Fr(zn);
function xt() {
  return xt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, xt.apply(null, arguments);
}
function Y(e) {
  "@babel/helpers - typeof";
  return Y = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Y(e);
}
var Ct = {}, qt = [], Nn = function(t) {
  qt.push(t);
};
function Gt(e, t) {
  if (process.env.NODE_ENV !== "production" && !e && console !== void 0) {
    var r = qt.reduce(function(n, o) {
      return o(n ?? "", "warning");
    }, t);
    r && console.error("Warning: ".concat(r));
  }
}
function Fn(e, t) {
  if (process.env.NODE_ENV !== "production" && !e && console !== void 0) {
    var r = qt.reduce(function(n, o) {
      return o(n ?? "", "note");
    }, t);
    r && console.warn("Note: ".concat(r));
  }
}
function Br() {
  Ct = {};
}
function Vr(e, t, r) {
  !t && !Ct[r] && (e(!1, r), Ct[r] = !0);
}
function Se(e, t) {
  Vr(Gt, e, t);
}
function Bn(e, t) {
  Vr(Fn, e, t);
}
Se.preMessage = Nn;
Se.resetWarned = Br;
Se.noteOnce = Bn;
function Vn(e, t) {
  if (Y(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Y(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Xr(e) {
  var t = Vn(e, "string");
  return Y(t) == "symbol" ? t : t + "";
}
function O(e, t, r) {
  return (t = Xr(t)) in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}
function nr(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function $(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? nr(Object(r), !0).forEach(function(n) {
      O(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : nr(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
var je = { exports: {} }, k = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var or;
function Xn() {
  if (or) return k;
  or = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), a = Symbol.for("react.context"), c = Symbol.for("react.server_context"), s = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), m;
  m = Symbol.for("react.module.reference");
  function p(u) {
    if (typeof u == "object" && u !== null) {
      var y = u.$$typeof;
      switch (y) {
        case e:
          switch (u = u.type, u) {
            case r:
            case o:
            case n:
            case l:
            case f:
              return u;
            default:
              switch (u = u && u.$$typeof, u) {
                case c:
                case a:
                case s:
                case d:
                case h:
                case i:
                  return u;
                default:
                  return y;
              }
          }
        case t:
          return y;
      }
    }
  }
  return k.ContextConsumer = a, k.ContextProvider = i, k.Element = e, k.ForwardRef = s, k.Fragment = r, k.Lazy = d, k.Memo = h, k.Portal = t, k.Profiler = o, k.StrictMode = n, k.Suspense = l, k.SuspenseList = f, k.isAsyncMode = function() {
    return !1;
  }, k.isConcurrentMode = function() {
    return !1;
  }, k.isContextConsumer = function(u) {
    return p(u) === a;
  }, k.isContextProvider = function(u) {
    return p(u) === i;
  }, k.isElement = function(u) {
    return typeof u == "object" && u !== null && u.$$typeof === e;
  }, k.isForwardRef = function(u) {
    return p(u) === s;
  }, k.isFragment = function(u) {
    return p(u) === r;
  }, k.isLazy = function(u) {
    return p(u) === d;
  }, k.isMemo = function(u) {
    return p(u) === h;
  }, k.isPortal = function(u) {
    return p(u) === t;
  }, k.isProfiler = function(u) {
    return p(u) === o;
  }, k.isStrictMode = function(u) {
    return p(u) === n;
  }, k.isSuspense = function(u) {
    return p(u) === l;
  }, k.isSuspenseList = function(u) {
    return p(u) === f;
  }, k.isValidElementType = function(u) {
    return typeof u == "string" || typeof u == "function" || u === r || u === o || u === n || u === l || u === f || u === v || typeof u == "object" && u !== null && (u.$$typeof === d || u.$$typeof === h || u.$$typeof === i || u.$$typeof === a || u.$$typeof === s || u.$$typeof === m || u.getModuleId !== void 0);
  }, k.typeOf = p, k;
}
var I = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ir;
function qn() {
  return ir || (ir = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), a = Symbol.for("react.context"), c = Symbol.for("react.server_context"), s = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), m = !1, p = !1, u = !1, y = !1, b = !1, _;
    _ = Symbol.for("react.module.reference");
    function x(T) {
      return !!(typeof T == "string" || typeof T == "function" || T === r || T === o || b || T === n || T === l || T === f || y || T === v || m || p || u || typeof T == "object" && T !== null && (T.$$typeof === d || T.$$typeof === h || T.$$typeof === i || T.$$typeof === a || T.$$typeof === s || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      T.$$typeof === _ || T.getModuleId !== void 0));
    }
    function g(T) {
      if (typeof T == "object" && T !== null) {
        var at = T.$$typeof;
        switch (at) {
          case e:
            var $e = T.type;
            switch ($e) {
              case r:
              case o:
              case n:
              case l:
              case f:
                return $e;
              default:
                var tr = $e && $e.$$typeof;
                switch (tr) {
                  case c:
                  case a:
                  case s:
                  case d:
                  case h:
                  case i:
                    return tr;
                  default:
                    return at;
                }
            }
          case t:
            return at;
        }
      }
    }
    var C = a, S = i, E = e, M = s, P = r, U = d, L = h, D = t, A = o, R = n, B = l, V = f, H = !1, z = !1;
    function G(T) {
      return H || (H = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function te(T) {
      return z || (z = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function W(T) {
      return g(T) === a;
    }
    function N(T) {
      return g(T) === i;
    }
    function Z(T) {
      return typeof T == "object" && T !== null && T.$$typeof === e;
    }
    function pe(T) {
      return g(T) === s;
    }
    function rt(T) {
      return g(T) === r;
    }
    function ae(T) {
      return g(T) === d;
    }
    function nt(T) {
      return g(T) === h;
    }
    function ke(T) {
      return g(T) === t;
    }
    function Ie(T) {
      return g(T) === o;
    }
    function ot(T) {
      return g(T) === n;
    }
    function it(T) {
      return g(T) === l;
    }
    function Re(T) {
      return g(T) === f;
    }
    I.ContextConsumer = C, I.ContextProvider = S, I.Element = E, I.ForwardRef = M, I.Fragment = P, I.Lazy = U, I.Memo = L, I.Portal = D, I.Profiler = A, I.StrictMode = R, I.Suspense = B, I.SuspenseList = V, I.isAsyncMode = G, I.isConcurrentMode = te, I.isContextConsumer = W, I.isContextProvider = N, I.isElement = Z, I.isForwardRef = pe, I.isFragment = rt, I.isLazy = ae, I.isMemo = nt, I.isPortal = ke, I.isProfiler = Ie, I.isStrictMode = ot, I.isSuspense = it, I.isSuspenseList = Re, I.isValidElementType = x, I.typeOf = g;
  }()), I;
}
var ar;
function Gn() {
  return ar || (ar = 1, process.env.NODE_ENV === "production" ? je.exports = Xn() : je.exports = qn()), je.exports;
}
Gn();
Number(Dn.split(".")[0]);
function ue(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function Wn(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Xr(n.key), n);
  }
}
function le(e, t, r) {
  return t && Wn(e.prototype, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _t(e, t) {
  return _t = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
    return r.__proto__ = n, r;
  }, _t(e, t);
}
function qr(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && _t(e, t);
}
function We(e) {
  return We = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, We(e);
}
function Gr() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Gr = function() {
    return !!e;
  })();
}
function Te(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Un(e, t) {
  if (t && (Y(t) == "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return Te(e);
}
function Wr(e) {
  var t = Gr();
  return function() {
    var r, n = We(e);
    if (t) {
      var o = We(this).constructor;
      r = Reflect.construct(n, arguments, o);
    } else r = n.apply(this, arguments);
    return Un(this, r);
  };
}
function Et(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function Yn(e) {
  if (Array.isArray(e)) return Et(e);
}
function Kn(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Ur(e, t) {
  if (e) {
    if (typeof e == "string") return Et(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Et(e, t) : void 0;
  }
}
function Qn() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function he(e) {
  return Yn(e) || Kn(e) || Ur(e) || Qn();
}
function Zn(e) {
  if (Array.isArray(e)) return e;
}
function Jn(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, o, i, a, c = [], s = !0, l = !1;
    try {
      if (i = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        s = !1;
      } else for (; !(s = (n = i.call(r)).done) && (c.push(n.value), c.length !== t); s = !0) ;
    } catch (f) {
      l = !0, o = f;
    } finally {
      try {
        if (!s && r.return != null && (a = r.return(), Object(a) !== a)) return;
      } finally {
        if (l) throw o;
      }
    }
    return c;
  }
}
function eo() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function j(e, t) {
  return Zn(e) || Jn(e, t) || Ur(e, t) || eo();
}
function Me(e) {
  for (var t = 0, r, n = 0, o = e.length; o >= 4; ++n, o -= 4)
    r = e.charCodeAt(n) & 255 | (e.charCodeAt(++n) & 255) << 8 | (e.charCodeAt(++n) & 255) << 16 | (e.charCodeAt(++n) & 255) << 24, r = /* Math.imul(k, m): */
    (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16), r ^= /* k >>> r: */
    r >>> 24, t = /* Math.imul(k, m): */
    (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  switch (o) {
    case 3:
      t ^= (e.charCodeAt(n + 2) & 255) << 16;
    case 2:
      t ^= (e.charCodeAt(n + 1) & 255) << 8;
    case 1:
      t ^= e.charCodeAt(n) & 255, t = /* Math.imul(h, m): */
      (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  }
  return t ^= t >>> 13, t = /* Math.imul(h, m): */
  (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), ((t ^ t >>> 15) >>> 0).toString(36);
}
function Ae() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
function to(e, t) {
  if (!e)
    return !1;
  if (e.contains)
    return e.contains(t);
  for (var r = t; r; ) {
    if (r === e)
      return !0;
    r = r.parentNode;
  }
  return !1;
}
var sr = "data-rc-order", cr = "data-rc-priority", ro = "rc-util-key", Tt = /* @__PURE__ */ new Map();
function Yr() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = e.mark;
  return t ? t.startsWith("data-") ? t : "data-".concat(t) : ro;
}
function Ze(e) {
  if (e.attachTo)
    return e.attachTo;
  var t = document.querySelector("head");
  return t || document.body;
}
function no(e) {
  return e === "queue" ? "prependQueue" : e ? "prepend" : "append";
}
function Wt(e) {
  return Array.from((Tt.get(e) || e).children).filter(function(t) {
    return t.tagName === "STYLE";
  });
}
function Kr(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!Ae())
    return null;
  var r = t.csp, n = t.prepend, o = t.priority, i = o === void 0 ? 0 : o, a = no(n), c = a === "prependQueue", s = document.createElement("style");
  s.setAttribute(sr, a), c && i && s.setAttribute(cr, "".concat(i)), r != null && r.nonce && (s.nonce = r == null ? void 0 : r.nonce), s.innerHTML = e;
  var l = Ze(t), f = l.firstChild;
  if (n) {
    if (c) {
      var h = (t.styles || Wt(l)).filter(function(d) {
        if (!["prepend", "prependQueue"].includes(d.getAttribute(sr)))
          return !1;
        var v = Number(d.getAttribute(cr) || 0);
        return i >= v;
      });
      if (h.length)
        return l.insertBefore(s, h[h.length - 1].nextSibling), s;
    }
    l.insertBefore(s, f);
  } else
    l.appendChild(s);
  return s;
}
function Qr(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = Ze(t);
  return (t.styles || Wt(r)).find(function(n) {
    return n.getAttribute(Yr(t)) === e;
  });
}
function Zr(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = Qr(e, t);
  if (r) {
    var n = Ze(t);
    n.removeChild(r);
  }
}
function oo(e, t) {
  var r = Tt.get(e);
  if (!r || !to(document, r)) {
    var n = Kr("", t), o = n.parentNode;
    Tt.set(e, o), e.removeChild(n);
  }
}
function we(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, n = Ze(r), o = Wt(n), i = $($({}, r), {}, {
    styles: o
  });
  oo(n, i);
  var a = Qr(t, i);
  if (a) {
    var c, s;
    if ((c = i.csp) !== null && c !== void 0 && c.nonce && a.nonce !== ((s = i.csp) === null || s === void 0 ? void 0 : s.nonce)) {
      var l;
      a.nonce = (l = i.csp) === null || l === void 0 ? void 0 : l.nonce;
    }
    return a.innerHTML !== e && (a.innerHTML = e), a;
  }
  var f = Kr(e, i);
  return f.setAttribute(Yr(i), t), f;
}
var io = "%";
function wt(e) {
  return e.join(io);
}
var ao = /* @__PURE__ */ function() {
  function e(t) {
    ue(this, e), O(this, "instanceId", void 0), O(this, "cache", /* @__PURE__ */ new Map()), this.instanceId = t;
  }
  return le(e, [{
    key: "get",
    value: function(r) {
      return this.opGet(wt(r));
    }
    /** A fast get cache with `get` concat. */
  }, {
    key: "opGet",
    value: function(r) {
      return this.cache.get(r) || null;
    }
  }, {
    key: "update",
    value: function(r, n) {
      return this.opUpdate(wt(r), n);
    }
    /** A fast get cache with `get` concat. */
  }, {
    key: "opUpdate",
    value: function(r, n) {
      var o = this.cache.get(r), i = n(o);
      i === null ? this.cache.delete(r) : this.cache.set(r, i);
    }
  }]), e;
}(), ve = "data-token-hash", J = "data-css-hash", so = "data-cache-path", se = "__cssinjs_instance__";
function co() {
  var e = Math.random().toString(12).slice(2);
  if (typeof document < "u" && document.head && document.body) {
    var t = document.body.querySelectorAll("style[".concat(J, "]")) || [], r = document.head.firstChild;
    Array.from(t).forEach(function(o) {
      o[se] = o[se] || e, o[se] === e && document.head.insertBefore(o, r);
    });
    var n = {};
    Array.from(document.querySelectorAll("style[".concat(J, "]"))).forEach(function(o) {
      var i = o.getAttribute(J);
      if (n[i]) {
        if (o[se] === e) {
          var a;
          (a = o.parentNode) === null || a === void 0 || a.removeChild(o);
        }
      } else
        n[i] = !0;
    });
  }
  return new ao(e);
}
var Je = /* @__PURE__ */ w.createContext({
  hashPriority: "low",
  cache: co(),
  defaultCache: !0
});
function uo(e, t) {
  if (e.length !== t.length)
    return !1;
  for (var r = 0; r < e.length; r++)
    if (e[r] !== t[r])
      return !1;
  return !0;
}
var Ut = /* @__PURE__ */ function() {
  function e() {
    ue(this, e), O(this, "cache", void 0), O(this, "keys", void 0), O(this, "cacheCallTimes", void 0), this.cache = /* @__PURE__ */ new Map(), this.keys = [], this.cacheCallTimes = 0;
  }
  return le(e, [{
    key: "size",
    value: function() {
      return this.keys.length;
    }
  }, {
    key: "internalGet",
    value: function(r) {
      var n, o, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, a = {
        map: this.cache
      };
      return r.forEach(function(c) {
        if (!a)
          a = void 0;
        else {
          var s;
          a = (s = a) === null || s === void 0 || (s = s.map) === null || s === void 0 ? void 0 : s.get(c);
        }
      }), (n = a) !== null && n !== void 0 && n.value && i && (a.value[1] = this.cacheCallTimes++), (o = a) === null || o === void 0 ? void 0 : o.value;
    }
  }, {
    key: "get",
    value: function(r) {
      var n;
      return (n = this.internalGet(r, !0)) === null || n === void 0 ? void 0 : n[0];
    }
  }, {
    key: "has",
    value: function(r) {
      return !!this.internalGet(r);
    }
  }, {
    key: "set",
    value: function(r, n) {
      var o = this;
      if (!this.has(r)) {
        if (this.size() + 1 > e.MAX_CACHE_SIZE + e.MAX_CACHE_OFFSET) {
          var i = this.keys.reduce(function(l, f) {
            var h = j(l, 2), d = h[1];
            return o.internalGet(f)[1] < d ? [f, o.internalGet(f)[1]] : l;
          }, [this.keys[0], this.cacheCallTimes]), a = j(i, 1), c = a[0];
          this.delete(c);
        }
        this.keys.push(r);
      }
      var s = this.cache;
      r.forEach(function(l, f) {
        if (f === r.length - 1)
          s.set(l, {
            value: [n, o.cacheCallTimes++]
          });
        else {
          var h = s.get(l);
          h ? h.map || (h.map = /* @__PURE__ */ new Map()) : s.set(l, {
            map: /* @__PURE__ */ new Map()
          }), s = s.get(l).map;
        }
      });
    }
  }, {
    key: "deleteByPath",
    value: function(r, n) {
      var o = r.get(n[0]);
      if (n.length === 1) {
        var i;
        return o.map ? r.set(n[0], {
          map: o.map
        }) : r.delete(n[0]), (i = o.value) === null || i === void 0 ? void 0 : i[0];
      }
      var a = this.deleteByPath(o.map, n.slice(1));
      return (!o.map || o.map.size === 0) && !o.value && r.delete(n[0]), a;
    }
  }, {
    key: "delete",
    value: function(r) {
      if (this.has(r))
        return this.keys = this.keys.filter(function(n) {
          return !uo(n, r);
        }), this.deleteByPath(this.cache, r);
    }
  }]), e;
}();
O(Ut, "MAX_CACHE_SIZE", 20);
O(Ut, "MAX_CACHE_OFFSET", 5);
var ur = 0, Jr = /* @__PURE__ */ function() {
  function e(t) {
    ue(this, e), O(this, "derivatives", void 0), O(this, "id", void 0), this.derivatives = Array.isArray(t) ? t : [t], this.id = ur, t.length === 0 && Gt(t.length > 0, "[Ant Design CSS-in-JS] Theme should have at least one derivative function."), ur += 1;
  }
  return le(e, [{
    key: "getDerivativeToken",
    value: function(r) {
      return this.derivatives.reduce(function(n, o) {
        return o(r, n);
      }, void 0);
    }
  }]), e;
}(), ct = new Ut();
function lo(e) {
  var t = Array.isArray(e) ? e : [e];
  return ct.has(t) || ct.set(t, new Jr(t)), ct.get(t);
}
var fo = /* @__PURE__ */ new WeakMap(), ut = {};
function ho(e, t) {
  for (var r = fo, n = 0; n < t.length; n += 1) {
    var o = t[n];
    r.has(o) || r.set(o, /* @__PURE__ */ new WeakMap()), r = r.get(o);
  }
  return r.has(ut) || r.set(ut, e()), r.get(ut);
}
var lr = /* @__PURE__ */ new WeakMap();
function Oe(e) {
  var t = lr.get(e) || "";
  return t || (Object.keys(e).forEach(function(r) {
    var n = e[r];
    t += r, n instanceof Jr ? t += n.id : n && Y(n) === "object" ? t += Oe(n) : t += n;
  }), t = Me(t), lr.set(e, t)), t;
}
function fr(e, t) {
  return Me("".concat(t, "_").concat(Oe(e)));
}
var Ot = Ae();
function dr(e) {
  return typeof e == "number" ? "".concat(e, "px") : e;
}
function Ue(e, t, r) {
  var n, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
  if (i)
    return e;
  var a = $($({}, o), {}, (n = {}, O(n, ve, t), O(n, J, r), n)), c = Object.keys(a).map(function(s) {
    var l = a[s];
    return l ? "".concat(s, '="').concat(l, '"') : null;
  }).filter(function(s) {
    return s;
  }).join(" ");
  return "<style ".concat(c, ">").concat(e, "</style>");
}
var Fe = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  return "--".concat(r ? "".concat(r, "-") : "").concat(t).replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, "$1-$2").replace(/([a-z])([A-Z0-9])/g, "$1-$2").toLowerCase();
}, po = function(t, r, n) {
  return Object.keys(t).length ? ".".concat(r).concat(n != null && n.scope ? ".".concat(n.scope) : "", "{").concat(Object.entries(t).map(function(o) {
    var i = j(o, 2), a = i[0], c = i[1];
    return "".concat(a, ":").concat(c, ";");
  }).join(""), "}") : "";
}, en = function(t, r, n) {
  var o = {}, i = {};
  return Object.entries(t).forEach(function(a) {
    var c, s, l = j(a, 2), f = l[0], h = l[1];
    if (n != null && (c = n.preserve) !== null && c !== void 0 && c[f])
      i[f] = h;
    else if ((typeof h == "string" || typeof h == "number") && !(n != null && (s = n.ignore) !== null && s !== void 0 && s[f])) {
      var d, v = Fe(f, n == null ? void 0 : n.prefix);
      o[v] = typeof h == "number" && !(n != null && (d = n.unitless) !== null && d !== void 0 && d[f]) ? "".concat(h, "px") : String(h), i[f] = "var(".concat(v, ")");
    }
  }), [i, po(o, r, {
    scope: n == null ? void 0 : n.scope
  })];
}, hr = process.env.NODE_ENV !== "test" && Ae() ? w.useLayoutEffect : w.useEffect, tn = function(t, r) {
  var n = w.useRef(!0);
  hr(function() {
    return t(n.current);
  }, r), hr(function() {
    return n.current = !1, function() {
      n.current = !0;
    };
  }, []);
}, go = $({}, w), pr = go.useInsertionEffect, mo = function(t, r, n) {
  w.useMemo(t, n), tn(function() {
    return r(!0);
  }, n);
}, vo = pr ? function(e, t, r) {
  return pr(function() {
    return e(), t();
  }, r);
} : mo, yo = $({}, w), bo = yo.useInsertionEffect, So = function(t) {
  var r = [], n = !1;
  function o(i) {
    if (n) {
      process.env.NODE_ENV !== "production" && Gt(!1, "[Ant Design CSS-in-JS] You are registering a cleanup function after unmount, which will not have any effect.");
      return;
    }
    r.push(i);
  }
  return w.useEffect(function() {
    return n = !1, function() {
      n = !0, r.length && r.forEach(function(i) {
        return i();
      });
    };
  }, t), o;
}, xo = function() {
  return function(t) {
    t();
  };
}, Co = typeof bo < "u" ? So : xo;
function _o() {
  return !1;
}
var Mt = !1;
function Eo() {
  return Mt;
}
const To = process.env.NODE_ENV === "production" ? _o : Eo;
if (process.env.NODE_ENV !== "production" && typeof module < "u" && module && module.hot && typeof window < "u") {
  var Le = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : null;
  if (Le && typeof Le.webpackHotUpdate == "function") {
    var wo = Le.webpackHotUpdate;
    Le.webpackHotUpdate = function() {
      return Mt = !0, setTimeout(function() {
        Mt = !1;
      }, 0), wo.apply(void 0, arguments);
    };
  }
}
function Yt(e, t, r, n, o) {
  var i = w.useContext(Je), a = i.cache, c = [e].concat(he(t)), s = wt(c), l = Co([s]), f = To(), h = function(p) {
    a.opUpdate(s, function(u) {
      var y = u || [void 0, void 0], b = j(y, 2), _ = b[0], x = _ === void 0 ? 0 : _, g = b[1], C = g;
      process.env.NODE_ENV !== "production" && g && f && (n == null || n(C, f), C = null);
      var S = C || r(), E = [x, S];
      return p ? p(E) : E;
    });
  };
  w.useMemo(
    function() {
      h();
    },
    /* eslint-disable react-hooks/exhaustive-deps */
    [s]
    /* eslint-enable */
  );
  var d = a.opGet(s);
  process.env.NODE_ENV !== "production" && !d && (h(), d = a.opGet(s));
  var v = d[1];
  return vo(function() {
    o == null || o(v);
  }, function(m) {
    return h(function(p) {
      var u = j(p, 2), y = u[0], b = u[1];
      return m && y === 0 && (o == null || o(v)), [y + 1, b];
    }), function() {
      a.opUpdate(s, function(p) {
        var u = p || [], y = j(u, 2), b = y[0], _ = b === void 0 ? 0 : b, x = y[1], g = _ - 1;
        return g === 0 ? (l(function() {
          (m || !a.opGet(s)) && (n == null || n(x, !1));
        }), null) : [_ - 1, x];
      });
    };
  }, [s]), v;
}
var Oo = {}, Mo = process.env.NODE_ENV !== "production" ? "css-dev-only-do-not-override" : "css", fe = /* @__PURE__ */ new Map();
function Po(e) {
  fe.set(e, (fe.get(e) || 0) + 1);
}
function Ao(e, t) {
  if (typeof document < "u") {
    var r = document.querySelectorAll("style[".concat(ve, '="').concat(e, '"]'));
    r.forEach(function(n) {
      if (n[se] === t) {
        var o;
        (o = n.parentNode) === null || o === void 0 || o.removeChild(n);
      }
    });
  }
}
var ko = 0;
function Io(e, t) {
  fe.set(e, (fe.get(e) || 0) - 1);
  var r = Array.from(fe.keys()), n = r.filter(function(o) {
    var i = fe.get(o) || 0;
    return i <= 0;
  });
  r.length - n.length > ko && n.forEach(function(o) {
    Ao(o, t), fe.delete(o);
  });
}
var Ro = function(t, r, n, o) {
  var i = n.getDerivativeToken(t), a = $($({}, i), r);
  return o && (a = o(a)), a;
}, rn = "token";
function $o(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, n = Ge(Je), o = n.cache.instanceId, i = n.container, a = r.salt, c = a === void 0 ? "" : a, s = r.override, l = s === void 0 ? Oo : s, f = r.formatToken, h = r.getComputedToken, d = r.cssVar, v = ho(function() {
    return Object.assign.apply(Object, [{}].concat(he(t)));
  }, t), m = Oe(v), p = Oe(l), u = d ? Oe(d) : "", y = Yt(rn, [c, e.id, m, p, u], function() {
    var b, _ = h ? h(v, l, e) : Ro(v, l, e, f), x = $({}, _), g = "";
    if (d) {
      var C = en(_, d.key, {
        prefix: d.prefix,
        ignore: d.ignore,
        unitless: d.unitless,
        preserve: d.preserve
      }), S = j(C, 2);
      _ = S[0], g = S[1];
    }
    var E = fr(_, c);
    _._tokenKey = E, x._tokenKey = fr(x, c);
    var M = (b = d == null ? void 0 : d.key) !== null && b !== void 0 ? b : E;
    _._themeKey = M, Po(M);
    var P = "".concat(Mo, "-").concat(Me(E));
    return _._hashId = P, [_, P, x, g, (d == null ? void 0 : d.key) || ""];
  }, function(b) {
    Io(b[0]._themeKey, o);
  }, function(b) {
    var _ = j(b, 4), x = _[0], g = _[3];
    if (d && g) {
      var C = we(g, Me("css-variables-".concat(x._themeKey)), {
        mark: J,
        prepend: "queue",
        attachTo: i,
        priority: -999
      });
      C[se] = o, C.setAttribute(ve, x._themeKey);
    }
  });
  return y;
}
var jo = function(t, r, n) {
  var o = j(t, 5), i = o[2], a = o[3], c = o[4], s = n || {}, l = s.plain;
  if (!a)
    return null;
  var f = i._tokenKey, h = -999, d = {
    "data-rc-order": "prependQueue",
    "data-rc-priority": "".concat(h)
  }, v = Ue(a, c, f, d, l);
  return [h, f, v];
}, Lo = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
}, nn = "comm", on = "rule", an = "decl", Do = "@import", Ho = "@namespace", zo = "@keyframes", No = "@layer", sn = Math.abs, Kt = String.fromCharCode;
function cn(e) {
  return e.trim();
}
function Be(e, t, r) {
  return e.replace(t, r);
}
function Fo(e, t, r) {
  return e.indexOf(t, r);
}
function me(e, t) {
  return e.charCodeAt(t) | 0;
}
function ye(e, t, r) {
  return e.slice(t, r);
}
function re(e) {
  return e.length;
}
function Bo(e) {
  return e.length;
}
function De(e, t) {
  return t.push(e), e;
}
var et = 1, be = 1, un = 0, Q = 0, F = 0, xe = "";
function Qt(e, t, r, n, o, i, a, c) {
  return { value: e, root: t, parent: r, type: n, props: o, children: i, line: et, column: be, length: a, return: "", siblings: c };
}
function Vo() {
  return F;
}
function Xo() {
  return F = Q > 0 ? me(xe, --Q) : 0, be--, F === 10 && (be = 1, et--), F;
}
function ee() {
  return F = Q < un ? me(xe, Q++) : 0, be++, F === 10 && (be = 1, et++), F;
}
function ce() {
  return me(xe, Q);
}
function Ve() {
  return Q;
}
function tt(e, t) {
  return ye(xe, e, t);
}
function Pe(e) {
  switch (e) {
    // \0 \t \n \r \s whitespace token
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    // ! + , / > @ ~ isolate token
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    // ; { } breakpoint token
    case 59:
    case 123:
    case 125:
      return 4;
    // : accompanied token
    case 58:
      return 3;
    // " ' ( [ opening delimit token
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    // ) ] closing delimit token
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function qo(e) {
  return et = be = 1, un = re(xe = e), Q = 0, [];
}
function Go(e) {
  return xe = "", e;
}
function lt(e) {
  return cn(tt(Q - 1, Pt(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Wo(e) {
  for (; (F = ce()) && F < 33; )
    ee();
  return Pe(e) > 2 || Pe(F) > 3 ? "" : " ";
}
function Uo(e, t) {
  for (; --t && ee() && !(F < 48 || F > 102 || F > 57 && F < 65 || F > 70 && F < 97); )
    ;
  return tt(e, Ve() + (t < 6 && ce() == 32 && ee() == 32));
}
function Pt(e) {
  for (; ee(); )
    switch (F) {
      // ] ) " '
      case e:
        return Q;
      // " '
      case 34:
      case 39:
        e !== 34 && e !== 39 && Pt(F);
        break;
      // (
      case 40:
        e === 41 && Pt(e);
        break;
      // \
      case 92:
        ee();
        break;
    }
  return Q;
}
function Yo(e, t) {
  for (; ee() && e + F !== 57; )
    if (e + F === 84 && ce() === 47)
      break;
  return "/*" + tt(t, Q - 1) + "*" + Kt(e === 47 ? e : ee());
}
function Ko(e) {
  for (; !Pe(ce()); )
    ee();
  return tt(e, Q);
}
function Qo(e) {
  return Go(Xe("", null, null, null, [""], e = qo(e), 0, [0], e));
}
function Xe(e, t, r, n, o, i, a, c, s) {
  for (var l = 0, f = 0, h = a, d = 0, v = 0, m = 0, p = 1, u = 1, y = 1, b = 0, _ = "", x = o, g = i, C = n, S = _; u; )
    switch (m = b, b = ee()) {
      // (
      case 40:
        if (m != 108 && me(S, h - 1) == 58) {
          Fo(S += Be(lt(b), "&", "&\f"), "&\f", sn(l ? c[l - 1] : 0)) != -1 && (y = -1);
          break;
        }
      // " ' [
      case 34:
      case 39:
      case 91:
        S += lt(b);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        S += Wo(m);
        break;
      // \
      case 92:
        S += Uo(Ve() - 1, 7);
        continue;
      // /
      case 47:
        switch (ce()) {
          case 42:
          case 47:
            De(Zo(Yo(ee(), Ve()), t, r, s), s), (Pe(m || 1) == 5 || Pe(ce() || 1) == 5) && re(S) && ye(S, -1, void 0) !== " " && (S += " ");
            break;
          default:
            S += "/";
        }
        break;
      // {
      case 123 * p:
        c[l++] = re(S) * y;
      // } ; \0
      case 125 * p:
      case 59:
      case 0:
        switch (b) {
          // \0 }
          case 0:
          case 125:
            u = 0;
          // ;
          case 59 + f:
            y == -1 && (S = Be(S, /\f/g, "")), v > 0 && (re(S) - h || p === 0 && m === 47) && De(v > 32 ? mr(S + ";", n, r, h - 1, s) : mr(Be(S, " ", "") + ";", n, r, h - 2, s), s);
            break;
          // @ ;
          case 59:
            S += ";";
          // { rule/at-rule
          default:
            if (De(C = gr(S, t, r, l, f, o, c, _, x = [], g = [], h, i), i), b === 123)
              if (f === 0)
                Xe(S, t, C, C, x, i, h, c, g);
              else {
                switch (d) {
                  // c(ontainer)
                  case 99:
                    if (me(S, 3) === 110) break;
                  // l(ayer)
                  case 108:
                    if (me(S, 2) === 97) break;
                  default:
                    f = 0;
                  // d(ocument) m(edia) s(upports)
                  case 100:
                  case 109:
                  case 115:
                }
                f ? Xe(e, C, C, n && De(gr(e, C, C, 0, 0, o, c, _, o, x = [], h, g), g), o, g, h, c, n ? x : g) : Xe(S, C, C, C, [""], g, 0, c, g);
              }
        }
        l = f = v = 0, p = y = 1, _ = S = "", h = a;
        break;
      // :
      case 58:
        h = 1 + re(S), v = m;
      default:
        if (p < 1) {
          if (b == 123)
            --p;
          else if (b == 125 && p++ == 0 && Xo() == 125)
            continue;
        }
        switch (S += Kt(b), b * p) {
          // &
          case 38:
            y = f > 0 ? 1 : (S += "\f", -1);
            break;
          // ,
          case 44:
            c[l++] = (re(S) - 1) * y, y = 1;
            break;
          // @
          case 64:
            ce() === 45 && (S += lt(ee())), d = ce(), f = h = re(_ = S += Ko(Ve())), b++;
            break;
          // -
          case 45:
            m === 45 && re(S) == 2 && (p = 0);
        }
    }
  return i;
}
function gr(e, t, r, n, o, i, a, c, s, l, f, h) {
  for (var d = o - 1, v = o === 0 ? i : [""], m = Bo(v), p = 0, u = 0, y = 0; p < n; ++p)
    for (var b = 0, _ = ye(e, d + 1, d = sn(u = a[p])), x = e; b < m; ++b)
      (x = cn(u > 0 ? v[b] + " " + _ : Be(_, /&\f/g, v[b]))) && (s[y++] = x);
  return Qt(e, t, r, o === 0 ? on : c, s, l, f, h);
}
function Zo(e, t, r, n) {
  return Qt(e, t, r, nn, Kt(Vo()), ye(e, 2, -2), 0, n);
}
function mr(e, t, r, n, o) {
  return Qt(e, t, r, an, ye(e, 0, n), ye(e, n + 1, -1), n, o);
}
function At(e, t) {
  for (var r = "", n = 0; n < e.length; n++)
    r += t(e[n], n, e, t) || "";
  return r;
}
function Jo(e, t, r, n) {
  switch (e.type) {
    case No:
      if (e.children.length) break;
    case Do:
    case Ho:
    case an:
      return e.return = e.return || e.value;
    case nn:
      return "";
    case zo:
      return e.return = e.value + "{" + At(e.children, n) + "}";
    case on:
      if (!re(e.value = e.props.join(","))) return "";
  }
  return re(r = At(e.children, n)) ? e.return = e.value + "{" + r + "}" : "";
}
function ln(e, t) {
  var r = t.path, n = t.parentSelectors;
  Se(!1, "[Ant Design CSS-in-JS] ".concat(r ? "Error in ".concat(r, ": ") : "").concat(e).concat(n.length ? " Selector: ".concat(n.join(" | ")) : ""));
}
var ei = function(t, r, n) {
  if (t === "content") {
    var o = /(attr|counters?|url|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/, i = ["normal", "none", "initial", "inherit", "unset"];
    (typeof r != "string" || i.indexOf(r) === -1 && !o.test(r) && (r.charAt(0) !== r.charAt(r.length - 1) || r.charAt(0) !== '"' && r.charAt(0) !== "'")) && ln("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"".concat(r, "\"'`."), n);
  }
}, ti = function(t, r, n) {
  t === "animation" && n.hashId && r !== "none" && ln("You seem to be using hashed animation '".concat(r, "', in which case 'animationName' with Keyframe as value is recommended."), n);
}, vr = "data-ant-cssinjs-cache-path", fn = "_FILE_STYLE__", de, dn = !0;
function ri() {
  if (!de && (de = {}, Ae())) {
    var e = document.createElement("div");
    e.className = vr, e.style.position = "fixed", e.style.visibility = "hidden", e.style.top = "-9999px", document.body.appendChild(e);
    var t = getComputedStyle(e).content || "";
    t = t.replace(/^"/, "").replace(/"$/, ""), t.split(";").forEach(function(o) {
      var i = o.split(":"), a = j(i, 2), c = a[0], s = a[1];
      de[c] = s;
    });
    var r = document.querySelector("style[".concat(vr, "]"));
    if (r) {
      var n;
      dn = !1, (n = r.parentNode) === null || n === void 0 || n.removeChild(r);
    }
    document.body.removeChild(e);
  }
}
function ni(e) {
  return ri(), !!de[e];
}
function oi(e) {
  var t = de[e], r = null;
  if (t && Ae())
    if (dn)
      r = fn;
    else {
      var n = document.querySelector("style[".concat(J, '="').concat(de[e], '"]'));
      n ? r = n.innerHTML : delete de[e];
    }
  return [r, t];
}
var hn = "_skip_check_", pn = "_multi_value_";
function qe(e) {
  var t = At(Qo(e), Jo);
  return t.replace(/\{%%%\:[^;];}/g, ";");
}
function ii(e) {
  return Y(e) === "object" && e && (hn in e || pn in e);
}
function yr(e, t, r) {
  if (!t)
    return e;
  var n = ".".concat(t), o = r === "low" ? ":where(".concat(n, ")") : n, i = e.split(",").map(function(a) {
    var c, s = a.trim().split(/\s+/), l = s[0] || "", f = ((c = l.match(/^\w+/)) === null || c === void 0 ? void 0 : c[0]) || "";
    return l = "".concat(f).concat(o).concat(l.slice(f.length)), [l].concat(he(s.slice(1))).join(" ");
  });
  return i.join(",");
}
var ai = function e(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    root: !0,
    parentSelectors: []
  }, o = n.root, i = n.injectHash, a = n.parentSelectors, c = r.hashId, s = r.layer, l = r.path, f = r.hashPriority, h = r.transformers, d = h === void 0 ? [] : h, v = r.linters, m = v === void 0 ? [] : v, p = "", u = {};
  function y(x) {
    var g = x.getName(c);
    if (!u[g]) {
      var C = e(x.style, r, {
        root: !1,
        parentSelectors: a
      }), S = j(C, 1), E = S[0];
      u[g] = "@keyframes ".concat(x.getName(c)).concat(E);
    }
  }
  function b(x) {
    var g = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    return x.forEach(function(C) {
      Array.isArray(C) ? b(C, g) : C && g.push(C);
    }), g;
  }
  var _ = b(Array.isArray(t) ? t : [t]);
  return _.forEach(function(x) {
    var g = typeof x == "string" && !o ? {} : x;
    if (typeof g == "string")
      p += "".concat(g, `
`);
    else if (g._keyframe)
      y(g);
    else {
      var C = d.reduce(function(S, E) {
        var M;
        return (E == null || (M = E.visit) === null || M === void 0 ? void 0 : M.call(E, S)) || S;
      }, g);
      Object.keys(C).forEach(function(S) {
        var E = C[S];
        if (Y(E) === "object" && E && (S !== "animationName" || !E._keyframe) && !ii(E)) {
          var M = !1, P = S.trim(), U = !1;
          (o || i) && c ? P.startsWith("@") ? M = !0 : P === "&" ? P = yr("", c, f) : P = yr(S, c, f) : o && !c && (P === "&" || P === "") && (P = "", U = !0);
          var L = e(E, r, {
            root: U,
            injectHash: M,
            parentSelectors: [].concat(he(a), [P])
          }), D = j(L, 2), A = D[0], R = D[1];
          u = $($({}, u), R), p += "".concat(P).concat(A);
        } else {
          let H = function(z, G) {
            process.env.NODE_ENV !== "production" && (Y(E) !== "object" || !(E != null && E[hn])) && [ei, ti].concat(he(m)).forEach(function(N) {
              return N(z, G, {
                path: l,
                hashId: c,
                parentSelectors: a
              });
            });
            var te = z.replace(/[A-Z]/g, function(N) {
              return "-".concat(N.toLowerCase());
            }), W = G;
            !Lo[z] && typeof W == "number" && W !== 0 && (W = "".concat(W, "px")), z === "animationName" && G !== null && G !== void 0 && G._keyframe && (y(G), W = G.getName(c)), p += "".concat(te, ":").concat(W, ";");
          };
          var B, V = (B = E == null ? void 0 : E.value) !== null && B !== void 0 ? B : E;
          Y(E) === "object" && E !== null && E !== void 0 && E[pn] && Array.isArray(V) ? V.forEach(function(z) {
            H(S, z);
          }) : H(S, V);
        }
      });
    }
  }), o ? s && (p && (p = "@layer ".concat(s.name, " {").concat(p, "}")), s.dependencies && (u["@layer ".concat(s.name)] = s.dependencies.map(function(x) {
    return "@layer ".concat(x, ", ").concat(s.name, ";");
  }).join(`
`))) : p = "{".concat(p, "}"), [p, u];
};
function gn(e, t) {
  return Me("".concat(e.join("%")).concat(t));
}
function si() {
  return null;
}
var mn = "style";
function br(e, t) {
  var r = e.token, n = e.path, o = e.hashId, i = e.layer, a = e.nonce, c = e.clientOnly, s = e.order, l = s === void 0 ? 0 : s, f = w.useContext(Je), h = f.autoClear, d = f.mock, v = f.defaultCache, m = f.hashPriority, p = f.container, u = f.ssrInline, y = f.transformers, b = f.linters, _ = f.cache, x = f.layer, g = r._tokenKey, C = [g];
  x && C.push("layer"), C.push.apply(C, he(n));
  var S = Ot;
  process.env.NODE_ENV !== "production" && d !== void 0 && (S = d === "client");
  var E = Yt(
    mn,
    C,
    // Create cache if needed
    function() {
      var D = C.join("|");
      if (ni(D)) {
        var A = oi(D), R = j(A, 2), B = R[0], V = R[1];
        if (B)
          return [B, g, V, {}, c, l];
      }
      var H = t(), z = ai(H, {
        hashId: o,
        hashPriority: m,
        layer: x ? i : void 0,
        path: n.join("-"),
        transformers: y,
        linters: b
      }), G = j(z, 2), te = G[0], W = G[1], N = qe(te), Z = gn(C, N);
      return [N, g, Z, W, c, l];
    },
    // Remove cache if no need
    function(D, A) {
      var R = j(D, 3), B = R[2];
      (A || h) && Ot && Zr(B, {
        mark: J
      });
    },
    // Effect: Inject style here
    function(D) {
      var A = j(D, 4), R = A[0];
      A[1];
      var B = A[2], V = A[3];
      if (S && R !== fn) {
        var H = {
          mark: J,
          prepend: x ? !1 : "queue",
          attachTo: p,
          priority: l
        }, z = typeof a == "function" ? a() : a;
        z && (H.csp = {
          nonce: z
        });
        var G = [], te = [];
        Object.keys(V).forEach(function(N) {
          N.startsWith("@layer") ? G.push(N) : te.push(N);
        }), G.forEach(function(N) {
          we(qe(V[N]), "_layer-".concat(N), $($({}, H), {}, {
            prepend: !0
          }));
        });
        var W = we(R, B, H);
        W[se] = _.instanceId, W.setAttribute(ve, g), process.env.NODE_ENV !== "production" && W.setAttribute(so, C.join("|")), te.forEach(function(N) {
          we(qe(V[N]), "_effect-".concat(N), H);
        });
      }
    }
  ), M = j(E, 3), P = M[0], U = M[1], L = M[2];
  return function(D) {
    var A;
    if (!u || S || !v)
      A = /* @__PURE__ */ w.createElement(si, null);
    else {
      var R;
      A = /* @__PURE__ */ w.createElement("style", xt({}, (R = {}, O(R, ve, U), O(R, J, L), R), {
        dangerouslySetInnerHTML: {
          __html: P
        }
      }));
    }
    return /* @__PURE__ */ w.createElement(w.Fragment, null, A, D);
  };
}
var ci = function(t, r, n) {
  var o = j(t, 6), i = o[0], a = o[1], c = o[2], s = o[3], l = o[4], f = o[5], h = n || {}, d = h.plain;
  if (l)
    return null;
  var v = i, m = {
    "data-rc-order": "prependQueue",
    "data-rc-priority": "".concat(f)
  };
  return v = Ue(i, a, c, m, d), s && Object.keys(s).forEach(function(p) {
    if (!r[p]) {
      r[p] = !0;
      var u = qe(s[p]), y = Ue(u, a, "_effect-".concat(p), m, d);
      p.startsWith("@layer") ? v = y + v : v += y;
    }
  }), [f, c, v];
}, vn = "cssVar", ui = function(t, r) {
  var n = t.key, o = t.prefix, i = t.unitless, a = t.ignore, c = t.token, s = t.scope, l = s === void 0 ? "" : s, f = Ge(Je), h = f.cache.instanceId, d = f.container, v = c._tokenKey, m = [].concat(he(t.path), [n, l, v]), p = Yt(vn, m, function() {
    var u = r(), y = en(u, n, {
      prefix: o,
      unitless: i,
      ignore: a,
      scope: l
    }), b = j(y, 2), _ = b[0], x = b[1], g = gn(m, x);
    return [_, x, g, n];
  }, function(u) {
    var y = j(u, 3), b = y[2];
    Ot && Zr(b, {
      mark: J
    });
  }, function(u) {
    var y = j(u, 3), b = y[1], _ = y[2];
    if (b) {
      var x = we(b, _, {
        mark: J,
        prepend: "queue",
        attachTo: d,
        priority: -999
      });
      x[se] = h, x.setAttribute(ve, n);
    }
  });
  return p;
}, li = function(t, r, n) {
  var o = j(t, 4), i = o[1], a = o[2], c = o[3], s = n || {}, l = s.plain;
  if (!i)
    return null;
  var f = -999, h = {
    "data-rc-order": "prependQueue",
    "data-rc-priority": "".concat(f)
  }, d = Ue(i, c, a, h, l);
  return [f, a, d];
}, Ce;
Ce = {}, O(Ce, mn, ci), O(Ce, rn, jo), O(Ce, vn, li);
var yn = /* @__PURE__ */ function() {
  function e(t, r) {
    ue(this, e), O(this, "name", void 0), O(this, "style", void 0), O(this, "_keyframe", !0), this.name = t, this.style = r;
  }
  return le(e, [{
    key: "getName",
    value: function() {
      var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      return r ? "".concat(r, "-").concat(this.name) : this.name;
    }
  }]), e;
}();
function ge(e) {
  return e.notSplit = !0, e;
}
ge(["borderTop", "borderBottom"]), ge(["borderTop"]), ge(["borderBottom"]), ge(["borderLeft", "borderRight"]), ge(["borderLeft"]), ge(["borderRight"]);
function bn() {
}
let oe = null;
function fi() {
  oe = null, Br();
}
let Sn = bn;
process.env.NODE_ENV !== "production" && (Sn = (e, t, r) => {
  Se(e, `[antd: ${t}] ${r}`), process.env.NODE_ENV === "test" && fi();
});
const di = /* @__PURE__ */ w.createContext({}), hi = process.env.NODE_ENV !== "production" ? (e) => {
  const {
    strict: t
  } = w.useContext(di), r = (n, o, i) => {
    if (!n)
      if (t === !1 && o === "deprecated") {
        const a = oe;
        oe || (oe = {}), oe[e] = oe[e] || [], oe[e].includes(i || "") || oe[e].push(i || ""), a || console.warn("[antd] There exists deprecated usage in your code:", oe);
      } else
        process.env.NODE_ENV !== "production" && Sn(n, e, i);
  };
  return r.deprecated = (n, o, i, a) => {
    r(n, "deprecated", `\`${o}\` is deprecated. Please use \`${i}\` instead.${a ? ` ${a}` : ""}`);
  }, r;
} : () => {
  const e = () => {
  };
  return e.deprecated = bn, e;
}, xn = {
  blue: "#1677FF",
  purple: "#722ED1",
  cyan: "#13C2C2",
  green: "#52C41A",
  magenta: "#EB2F96",
  /**
   * @deprecated Use magenta instead
   */
  pink: "#EB2F96",
  red: "#F5222D",
  orange: "#FA8C16",
  yellow: "#FADB14",
  volcano: "#FA541C",
  geekblue: "#2F54EB",
  gold: "#FAAD14",
  lime: "#A0D911"
}, Ye = Object.assign(Object.assign({}, xn), {
  // Color
  colorPrimary: "#1677ff",
  colorSuccess: "#52c41a",
  colorWarning: "#faad14",
  colorError: "#ff4d4f",
  colorInfo: "#1677ff",
  colorLink: "",
  colorTextBase: "",
  colorBgBase: "",
  // Font
  fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
'Noto Color Emoji'`,
  fontFamilyCode: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
  fontSize: 14,
  // Line
  lineWidth: 1,
  lineType: "solid",
  // Motion
  motionUnit: 0.1,
  motionBase: 0,
  motionEaseOutCirc: "cubic-bezier(0.08, 0.82, 0.17, 1)",
  motionEaseInOutCirc: "cubic-bezier(0.78, 0.14, 0.15, 0.86)",
  motionEaseOut: "cubic-bezier(0.215, 0.61, 0.355, 1)",
  motionEaseInOut: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  motionEaseOutBack: "cubic-bezier(0.12, 0.4, 0.29, 1.46)",
  motionEaseInBack: "cubic-bezier(0.71, -0.46, 0.88, 0.6)",
  motionEaseInQuint: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
  motionEaseOutQuint: "cubic-bezier(0.23, 1, 0.32, 1)",
  // Radius
  borderRadius: 6,
  // Size
  sizeUnit: 4,
  sizeStep: 4,
  sizePopupArrow: 16,
  // Control Base
  controlHeight: 32,
  // zIndex
  zIndexBase: 0,
  zIndexPopupBase: 1e3,
  // Image
  opacityImage: 1,
  // Wireframe
  wireframe: !1,
  // Motion
  motion: !0
}), X = Math.round;
function ft(e, t) {
  const r = e.replace(/^[^(]*\((.*)/, "$1").replace(/\).*/, "").match(/\d*\.?\d+%?/g) || [], n = r.map((o) => parseFloat(o));
  for (let o = 0; o < 3; o += 1)
    n[o] = t(n[o] || 0, r[o] || "", o);
  return r[3] ? n[3] = r[3].includes("%") ? n[3] / 100 : n[3] : n[3] = 1, n;
}
const Sr = (e, t, r) => r === 0 ? e : e / 100;
function _e(e, t) {
  const r = t || 255;
  return e > r ? r : e < 0 ? 0 : e;
}
class q {
  constructor(t) {
    O(this, "isValid", !0), O(this, "r", 0), O(this, "g", 0), O(this, "b", 0), O(this, "a", 1), O(this, "_h", void 0), O(this, "_s", void 0), O(this, "_l", void 0), O(this, "_v", void 0), O(this, "_max", void 0), O(this, "_min", void 0), O(this, "_brightness", void 0);
    function r(n) {
      return n[0] in t && n[1] in t && n[2] in t;
    }
    if (t) if (typeof t == "string") {
      let o = function(i) {
        return n.startsWith(i);
      };
      const n = t.trim();
      /^#?[A-F\d]{3,8}$/i.test(n) ? this.fromHexString(n) : o("rgb") ? this.fromRgbString(n) : o("hsl") ? this.fromHslString(n) : (o("hsv") || o("hsb")) && this.fromHsvString(n);
    } else if (t instanceof q)
      this.r = t.r, this.g = t.g, this.b = t.b, this.a = t.a, this._h = t._h, this._s = t._s, this._l = t._l, this._v = t._v;
    else if (r("rgb"))
      this.r = _e(t.r), this.g = _e(t.g), this.b = _e(t.b), this.a = typeof t.a == "number" ? _e(t.a, 1) : 1;
    else if (r("hsl"))
      this.fromHsl(t);
    else if (r("hsv"))
      this.fromHsv(t);
    else
      throw new Error("@ant-design/fast-color: unsupported input " + JSON.stringify(t));
  }
  // ======================= Setter =======================
  setR(t) {
    return this._sc("r", t);
  }
  setG(t) {
    return this._sc("g", t);
  }
  setB(t) {
    return this._sc("b", t);
  }
  setA(t) {
    return this._sc("a", t, 1);
  }
  setHue(t) {
    const r = this.toHsv();
    return r.h = t, this._c(r);
  }
  // ======================= Getter =======================
  /**
   * Returns the perceived luminance of a color, from 0-1.
   * @see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
   */
  getLuminance() {
    function t(i) {
      const a = i / 255;
      return a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
    }
    const r = t(this.r), n = t(this.g), o = t(this.b);
    return 0.2126 * r + 0.7152 * n + 0.0722 * o;
  }
  getHue() {
    if (typeof this._h > "u") {
      const t = this.getMax() - this.getMin();
      t === 0 ? this._h = 0 : this._h = X(60 * (this.r === this.getMax() ? (this.g - this.b) / t + (this.g < this.b ? 6 : 0) : this.g === this.getMax() ? (this.b - this.r) / t + 2 : (this.r - this.g) / t + 4));
    }
    return this._h;
  }
  getSaturation() {
    if (typeof this._s > "u") {
      const t = this.getMax() - this.getMin();
      t === 0 ? this._s = 0 : this._s = t / this.getMax();
    }
    return this._s;
  }
  getLightness() {
    return typeof this._l > "u" && (this._l = (this.getMax() + this.getMin()) / 510), this._l;
  }
  getValue() {
    return typeof this._v > "u" && (this._v = this.getMax() / 255), this._v;
  }
  /**
   * Returns the perceived brightness of the color, from 0-255.
   * Note: this is not the b of HSB
   * @see http://www.w3.org/TR/AERT#color-contrast
   */
  getBrightness() {
    return typeof this._brightness > "u" && (this._brightness = (this.r * 299 + this.g * 587 + this.b * 114) / 1e3), this._brightness;
  }
  // ======================== Func ========================
  darken(t = 10) {
    const r = this.getHue(), n = this.getSaturation();
    let o = this.getLightness() - t / 100;
    return o < 0 && (o = 0), this._c({
      h: r,
      s: n,
      l: o,
      a: this.a
    });
  }
  lighten(t = 10) {
    const r = this.getHue(), n = this.getSaturation();
    let o = this.getLightness() + t / 100;
    return o > 1 && (o = 1), this._c({
      h: r,
      s: n,
      l: o,
      a: this.a
    });
  }
  /**
   * Mix the current color a given amount with another color, from 0 to 100.
   * 0 means no mixing (return current color).
   */
  mix(t, r = 50) {
    const n = this._c(t), o = r / 100, i = (c) => (n[c] - this[c]) * o + this[c], a = {
      r: X(i("r")),
      g: X(i("g")),
      b: X(i("b")),
      a: X(i("a") * 100) / 100
    };
    return this._c(a);
  }
  /**
   * Mix the color with pure white, from 0 to 100.
   * Providing 0 will do nothing, providing 100 will always return white.
   */
  tint(t = 10) {
    return this.mix({
      r: 255,
      g: 255,
      b: 255,
      a: 1
    }, t);
  }
  /**
   * Mix the color with pure black, from 0 to 100.
   * Providing 0 will do nothing, providing 100 will always return black.
   */
  shade(t = 10) {
    return this.mix({
      r: 0,
      g: 0,
      b: 0,
      a: 1
    }, t);
  }
  onBackground(t) {
    const r = this._c(t), n = this.a + r.a * (1 - this.a), o = (i) => X((this[i] * this.a + r[i] * r.a * (1 - this.a)) / n);
    return this._c({
      r: o("r"),
      g: o("g"),
      b: o("b"),
      a: n
    });
  }
  // ======================= Status =======================
  isDark() {
    return this.getBrightness() < 128;
  }
  isLight() {
    return this.getBrightness() >= 128;
  }
  // ======================== MISC ========================
  equals(t) {
    return this.r === t.r && this.g === t.g && this.b === t.b && this.a === t.a;
  }
  clone() {
    return this._c(this);
  }
  // ======================= Format =======================
  toHexString() {
    let t = "#";
    const r = (this.r || 0).toString(16);
    t += r.length === 2 ? r : "0" + r;
    const n = (this.g || 0).toString(16);
    t += n.length === 2 ? n : "0" + n;
    const o = (this.b || 0).toString(16);
    if (t += o.length === 2 ? o : "0" + o, typeof this.a == "number" && this.a >= 0 && this.a < 1) {
      const i = X(this.a * 255).toString(16);
      t += i.length === 2 ? i : "0" + i;
    }
    return t;
  }
  /** CSS support color pattern */
  toHsl() {
    return {
      h: this.getHue(),
      s: this.getSaturation(),
      l: this.getLightness(),
      a: this.a
    };
  }
  /** CSS support color pattern */
  toHslString() {
    const t = this.getHue(), r = X(this.getSaturation() * 100), n = X(this.getLightness() * 100);
    return this.a !== 1 ? `hsla(${t},${r}%,${n}%,${this.a})` : `hsl(${t},${r}%,${n}%)`;
  }
  /** Same as toHsb */
  toHsv() {
    return {
      h: this.getHue(),
      s: this.getSaturation(),
      v: this.getValue(),
      a: this.a
    };
  }
  toRgb() {
    return {
      r: this.r,
      g: this.g,
      b: this.b,
      a: this.a
    };
  }
  toRgbString() {
    return this.a !== 1 ? `rgba(${this.r},${this.g},${this.b},${this.a})` : `rgb(${this.r},${this.g},${this.b})`;
  }
  toString() {
    return this.toRgbString();
  }
  // ====================== Privates ======================
  /** Return a new FastColor object with one channel changed */
  _sc(t, r, n) {
    const o = this.clone();
    return o[t] = _e(r, n), o;
  }
  _c(t) {
    return new this.constructor(t);
  }
  getMax() {
    return typeof this._max > "u" && (this._max = Math.max(this.r, this.g, this.b)), this._max;
  }
  getMin() {
    return typeof this._min > "u" && (this._min = Math.min(this.r, this.g, this.b)), this._min;
  }
  fromHexString(t) {
    const r = t.replace("#", "");
    function n(o, i) {
      return parseInt(r[o] + r[i || o], 16);
    }
    r.length < 6 ? (this.r = n(0), this.g = n(1), this.b = n(2), this.a = r[3] ? n(3) / 255 : 1) : (this.r = n(0, 1), this.g = n(2, 3), this.b = n(4, 5), this.a = r[6] ? n(6, 7) / 255 : 1);
  }
  fromHsl({
    h: t,
    s: r,
    l: n,
    a: o
  }) {
    if (this._h = t % 360, this._s = r, this._l = n, this.a = typeof o == "number" ? o : 1, r <= 0) {
      const d = X(n * 255);
      this.r = d, this.g = d, this.b = d;
    }
    let i = 0, a = 0, c = 0;
    const s = t / 60, l = (1 - Math.abs(2 * n - 1)) * r, f = l * (1 - Math.abs(s % 2 - 1));
    s >= 0 && s < 1 ? (i = l, a = f) : s >= 1 && s < 2 ? (i = f, a = l) : s >= 2 && s < 3 ? (a = l, c = f) : s >= 3 && s < 4 ? (a = f, c = l) : s >= 4 && s < 5 ? (i = f, c = l) : s >= 5 && s < 6 && (i = l, c = f);
    const h = n - l / 2;
    this.r = X((i + h) * 255), this.g = X((a + h) * 255), this.b = X((c + h) * 255);
  }
  fromHsv({
    h: t,
    s: r,
    v: n,
    a: o
  }) {
    this._h = t % 360, this._s = r, this._v = n, this.a = typeof o == "number" ? o : 1;
    const i = X(n * 255);
    if (this.r = i, this.g = i, this.b = i, r <= 0)
      return;
    const a = t / 60, c = Math.floor(a), s = a - c, l = X(n * (1 - r) * 255), f = X(n * (1 - r * s) * 255), h = X(n * (1 - r * (1 - s)) * 255);
    switch (c) {
      case 0:
        this.g = h, this.b = l;
        break;
      case 1:
        this.r = f, this.b = l;
        break;
      case 2:
        this.r = l, this.b = h;
        break;
      case 3:
        this.r = l, this.g = f;
        break;
      case 4:
        this.r = h, this.g = l;
        break;
      case 5:
      default:
        this.g = l, this.b = f;
        break;
    }
  }
  fromHsvString(t) {
    const r = ft(t, Sr);
    this.fromHsv({
      h: r[0],
      s: r[1],
      v: r[2],
      a: r[3]
    });
  }
  fromHslString(t) {
    const r = ft(t, Sr);
    this.fromHsl({
      h: r[0],
      s: r[1],
      l: r[2],
      a: r[3]
    });
  }
  fromRgbString(t) {
    const r = ft(t, (n, o) => (
      // Convert percentage to number. e.g. 50% -> 128
      o.includes("%") ? X(n / 100 * 255) : n
    ));
    this.r = r[0], this.g = r[1], this.b = r[2], this.a = r[3];
  }
}
var He = 2, xr = 0.16, pi = 0.05, gi = 0.05, mi = 0.15, Cn = 5, _n = 4, vi = [{
  index: 7,
  amount: 15
}, {
  index: 6,
  amount: 25
}, {
  index: 5,
  amount: 30
}, {
  index: 5,
  amount: 45
}, {
  index: 5,
  amount: 65
}, {
  index: 5,
  amount: 85
}, {
  index: 4,
  amount: 90
}, {
  index: 3,
  amount: 95
}, {
  index: 2,
  amount: 97
}, {
  index: 1,
  amount: 98
}];
function Cr(e, t, r) {
  var n;
  return Math.round(e.h) >= 60 && Math.round(e.h) <= 240 ? n = r ? Math.round(e.h) - He * t : Math.round(e.h) + He * t : n = r ? Math.round(e.h) + He * t : Math.round(e.h) - He * t, n < 0 ? n += 360 : n >= 360 && (n -= 360), n;
}
function _r(e, t, r) {
  if (e.h === 0 && e.s === 0)
    return e.s;
  var n;
  return r ? n = e.s - xr * t : t === _n ? n = e.s + xr : n = e.s + pi * t, n > 1 && (n = 1), r && t === Cn && n > 0.1 && (n = 0.1), n < 0.06 && (n = 0.06), Math.round(n * 100) / 100;
}
function Er(e, t, r) {
  var n;
  return r ? n = e.v + gi * t : n = e.v - mi * t, n = Math.max(0, Math.min(1, n)), Math.round(n * 100) / 100;
}
function En(e) {
  for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = [], n = new q(e), o = n.toHsv(), i = Cn; i > 0; i -= 1) {
    var a = new q({
      h: Cr(o, i, !0),
      s: _r(o, i, !0),
      v: Er(o, i, !0)
    });
    r.push(a);
  }
  r.push(n);
  for (var c = 1; c <= _n; c += 1) {
    var s = new q({
      h: Cr(o, c),
      s: _r(o, c),
      v: Er(o, c)
    });
    r.push(s);
  }
  return t.theme === "dark" ? vi.map(function(l) {
    var f = l.index, h = l.amount;
    return new q(t.backgroundColor || "#141414").mix(r[f], h).toHexString();
  }) : r.map(function(l) {
    return l.toHexString();
  });
}
var dt = {
  red: "#F5222D",
  volcano: "#FA541C",
  orange: "#FA8C16",
  gold: "#FAAD14",
  yellow: "#FADB14",
  lime: "#A0D911",
  green: "#52C41A",
  cyan: "#13C2C2",
  blue: "#1677FF",
  geekblue: "#2F54EB",
  purple: "#722ED1",
  magenta: "#EB2F96",
  grey: "#666666"
}, kt = ["#fff1f0", "#ffccc7", "#ffa39e", "#ff7875", "#ff4d4f", "#f5222d", "#cf1322", "#a8071a", "#820014", "#5c0011"];
kt.primary = kt[5];
var It = ["#fff2e8", "#ffd8bf", "#ffbb96", "#ff9c6e", "#ff7a45", "#fa541c", "#d4380d", "#ad2102", "#871400", "#610b00"];
It.primary = It[5];
var Rt = ["#fff7e6", "#ffe7ba", "#ffd591", "#ffc069", "#ffa940", "#fa8c16", "#d46b08", "#ad4e00", "#873800", "#612500"];
Rt.primary = Rt[5];
var $t = ["#fffbe6", "#fff1b8", "#ffe58f", "#ffd666", "#ffc53d", "#faad14", "#d48806", "#ad6800", "#874d00", "#613400"];
$t.primary = $t[5];
var jt = ["#feffe6", "#ffffb8", "#fffb8f", "#fff566", "#ffec3d", "#fadb14", "#d4b106", "#ad8b00", "#876800", "#614700"];
jt.primary = jt[5];
var Lt = ["#fcffe6", "#f4ffb8", "#eaff8f", "#d3f261", "#bae637", "#a0d911", "#7cb305", "#5b8c00", "#3f6600", "#254000"];
Lt.primary = Lt[5];
var Dt = ["#f6ffed", "#d9f7be", "#b7eb8f", "#95de64", "#73d13d", "#52c41a", "#389e0d", "#237804", "#135200", "#092b00"];
Dt.primary = Dt[5];
var Ht = ["#e6fffb", "#b5f5ec", "#87e8de", "#5cdbd3", "#36cfc9", "#13c2c2", "#08979c", "#006d75", "#00474f", "#002329"];
Ht.primary = Ht[5];
var zt = ["#e6f4ff", "#bae0ff", "#91caff", "#69b1ff", "#4096ff", "#1677ff", "#0958d9", "#003eb3", "#002c8c", "#001d66"];
zt.primary = zt[5];
var Nt = ["#f0f5ff", "#d6e4ff", "#adc6ff", "#85a5ff", "#597ef7", "#2f54eb", "#1d39c4", "#10239e", "#061178", "#030852"];
Nt.primary = Nt[5];
var Ft = ["#f9f0ff", "#efdbff", "#d3adf7", "#b37feb", "#9254de", "#722ed1", "#531dab", "#391085", "#22075e", "#120338"];
Ft.primary = Ft[5];
var Bt = ["#fff0f6", "#ffd6e7", "#ffadd2", "#ff85c0", "#f759ab", "#eb2f96", "#c41d7f", "#9e1068", "#780650", "#520339"];
Bt.primary = Bt[5];
var Vt = ["#a6a6a6", "#999999", "#8c8c8c", "#808080", "#737373", "#666666", "#404040", "#1a1a1a", "#000000", "#000000"];
Vt.primary = Vt[5];
var ht = {
  red: kt,
  volcano: It,
  orange: Rt,
  gold: $t,
  yellow: jt,
  lime: Lt,
  green: Dt,
  cyan: Ht,
  blue: zt,
  geekblue: Nt,
  purple: Ft,
  magenta: Bt,
  grey: Vt
};
function yi(e, t) {
  let {
    generateColorPalettes: r,
    generateNeutralColorPalettes: n
  } = t;
  const {
    colorSuccess: o,
    colorWarning: i,
    colorError: a,
    colorInfo: c,
    colorPrimary: s,
    colorBgBase: l,
    colorTextBase: f
  } = e, h = r(s), d = r(o), v = r(i), m = r(a), p = r(c), u = n(l, f), y = e.colorLink || e.colorInfo, b = r(y), _ = new q(m[1]).mix(new q(m[3]), 50).toHexString();
  return Object.assign(Object.assign({}, u), {
    colorPrimaryBg: h[1],
    colorPrimaryBgHover: h[2],
    colorPrimaryBorder: h[3],
    colorPrimaryBorderHover: h[4],
    colorPrimaryHover: h[5],
    colorPrimary: h[6],
    colorPrimaryActive: h[7],
    colorPrimaryTextHover: h[8],
    colorPrimaryText: h[9],
    colorPrimaryTextActive: h[10],
    colorSuccessBg: d[1],
    colorSuccessBgHover: d[2],
    colorSuccessBorder: d[3],
    colorSuccessBorderHover: d[4],
    colorSuccessHover: d[4],
    colorSuccess: d[6],
    colorSuccessActive: d[7],
    colorSuccessTextHover: d[8],
    colorSuccessText: d[9],
    colorSuccessTextActive: d[10],
    colorErrorBg: m[1],
    colorErrorBgHover: m[2],
    colorErrorBgFilledHover: _,
    colorErrorBgActive: m[3],
    colorErrorBorder: m[3],
    colorErrorBorderHover: m[4],
    colorErrorHover: m[5],
    colorError: m[6],
    colorErrorActive: m[7],
    colorErrorTextHover: m[8],
    colorErrorText: m[9],
    colorErrorTextActive: m[10],
    colorWarningBg: v[1],
    colorWarningBgHover: v[2],
    colorWarningBorder: v[3],
    colorWarningBorderHover: v[4],
    colorWarningHover: v[4],
    colorWarning: v[6],
    colorWarningActive: v[7],
    colorWarningTextHover: v[8],
    colorWarningText: v[9],
    colorWarningTextActive: v[10],
    colorInfoBg: p[1],
    colorInfoBgHover: p[2],
    colorInfoBorder: p[3],
    colorInfoBorderHover: p[4],
    colorInfoHover: p[4],
    colorInfo: p[6],
    colorInfoActive: p[7],
    colorInfoTextHover: p[8],
    colorInfoText: p[9],
    colorInfoTextActive: p[10],
    colorLinkHover: b[4],
    colorLink: b[6],
    colorLinkActive: b[7],
    colorBgMask: new q("#000").setA(0.45).toRgbString(),
    colorWhite: "#fff"
  });
}
const bi = (e) => {
  let t = e, r = e, n = e, o = e;
  return e < 6 && e >= 5 ? t = e + 1 : e < 16 && e >= 6 ? t = e + 2 : e >= 16 && (t = 16), e < 7 && e >= 5 ? r = 4 : e < 8 && e >= 7 ? r = 5 : e < 14 && e >= 8 ? r = 6 : e < 16 && e >= 14 ? r = 7 : e >= 16 && (r = 8), e < 6 && e >= 2 ? n = 1 : e >= 6 && (n = 2), e > 4 && e < 8 ? o = 4 : e >= 8 && (o = 6), {
    borderRadius: e,
    borderRadiusXS: n,
    borderRadiusSM: r,
    borderRadiusLG: t,
    borderRadiusOuter: o
  };
};
function Si(e) {
  const {
    motionUnit: t,
    motionBase: r,
    borderRadius: n,
    lineWidth: o
  } = e;
  return Object.assign({
    // motion
    motionDurationFast: `${(r + t).toFixed(1)}s`,
    motionDurationMid: `${(r + t * 2).toFixed(1)}s`,
    motionDurationSlow: `${(r + t * 3).toFixed(1)}s`,
    // line
    lineWidthBold: o + 1
  }, bi(n));
}
const xi = (e) => {
  const {
    controlHeight: t
  } = e;
  return {
    controlHeightSM: t * 0.75,
    controlHeightXS: t * 0.5,
    controlHeightLG: t * 1.25
  };
};
function Ci(e) {
  return (e + 8) / e;
}
function _i(e) {
  const t = Array.from({
    length: 10
  }).map((r, n) => {
    const o = n - 1, i = e * Math.pow(Math.E, o / 5), a = n > 1 ? Math.floor(i) : Math.ceil(i);
    return Math.floor(a / 2) * 2;
  });
  return t[1] = e, t.map((r) => ({
    size: r,
    lineHeight: Ci(r)
  }));
}
const Ei = (e) => {
  const t = _i(e), r = t.map((f) => f.size), n = t.map((f) => f.lineHeight), o = r[1], i = r[0], a = r[2], c = n[1], s = n[0], l = n[2];
  return {
    fontSizeSM: i,
    fontSize: o,
    fontSizeLG: a,
    fontSizeXL: r[3],
    fontSizeHeading1: r[6],
    fontSizeHeading2: r[5],
    fontSizeHeading3: r[4],
    fontSizeHeading4: r[3],
    fontSizeHeading5: r[2],
    lineHeight: c,
    lineHeightLG: l,
    lineHeightSM: s,
    fontHeight: Math.round(c * o),
    fontHeightLG: Math.round(l * a),
    fontHeightSM: Math.round(s * i),
    lineHeightHeading1: n[6],
    lineHeightHeading2: n[5],
    lineHeightHeading3: n[4],
    lineHeightHeading4: n[3],
    lineHeightHeading5: n[2]
  };
};
function Ti(e) {
  const {
    sizeUnit: t,
    sizeStep: r
  } = e;
  return {
    sizeXXL: t * (r + 8),
    // 48
    sizeXL: t * (r + 4),
    // 32
    sizeLG: t * (r + 2),
    // 24
    sizeMD: t * (r + 1),
    // 20
    sizeMS: t * r,
    // 16
    size: t * r,
    // 16
    sizeSM: t * (r - 1),
    // 12
    sizeXS: t * (r - 2),
    // 8
    sizeXXS: t * (r - 3)
    // 4
  };
}
const K = (e, t) => new q(e).setA(t).toRgbString(), Ee = (e, t) => new q(e).darken(t).toHexString(), wi = (e) => {
  const t = En(e);
  return {
    1: t[0],
    2: t[1],
    3: t[2],
    4: t[3],
    5: t[4],
    6: t[5],
    7: t[6],
    8: t[4],
    9: t[5],
    10: t[6]
    // 8: colors[7],
    // 9: colors[8],
    // 10: colors[9],
  };
}, Oi = (e, t) => {
  const r = e || "#fff", n = t || "#000";
  return {
    colorBgBase: r,
    colorTextBase: n,
    colorText: K(n, 0.88),
    colorTextSecondary: K(n, 0.65),
    colorTextTertiary: K(n, 0.45),
    colorTextQuaternary: K(n, 0.25),
    colorFill: K(n, 0.15),
    colorFillSecondary: K(n, 0.06),
    colorFillTertiary: K(n, 0.04),
    colorFillQuaternary: K(n, 0.02),
    colorBgSolid: K(n, 1),
    colorBgSolidHover: K(n, 0.75),
    colorBgSolidActive: K(n, 0.95),
    colorBgLayout: Ee(r, 4),
    colorBgContainer: Ee(r, 0),
    colorBgElevated: Ee(r, 0),
    colorBgSpotlight: K(n, 0.85),
    colorBgBlur: "transparent",
    colorBorder: Ee(r, 15),
    colorBorderSecondary: Ee(r, 6)
  };
};
function Mi(e) {
  dt.pink = dt.magenta, ht.pink = ht.magenta;
  const t = Object.keys(xn).map((r) => {
    const n = e[r] === dt[r] ? ht[r] : En(e[r]);
    return Array.from({
      length: 10
    }, () => 1).reduce((o, i, a) => (o[`${r}-${a + 1}`] = n[a], o[`${r}${a + 1}`] = n[a], o), {});
  }).reduce((r, n) => (r = Object.assign(Object.assign({}, r), n), r), {});
  return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, e), t), yi(e, {
    generateColorPalettes: wi,
    generateNeutralColorPalettes: Oi
  })), Ei(e.fontSize)), Ti(e)), xi(e)), Si(e));
}
const Pi = lo(Mi), Ai = {
  token: Ye,
  override: {
    override: Ye
  },
  hashed: !0
}, ki = /* @__PURE__ */ ne.createContext(Ai), Tr = "ant", Tn = "anticon", Ii = (e, t) => t || (e ? `${Tr}-${e}` : Tr), Ke = /* @__PURE__ */ w.createContext({
  // We provide a default function for Context without provider
  getPrefixCls: Ii,
  iconPrefixCls: Tn
}), {
  Consumer: Pa
} = Ke, wr = {};
function Ri(e) {
  const t = w.useContext(Ke), {
    getPrefixCls: r,
    direction: n,
    getPopupContainer: o
  } = t, i = t[e];
  return Object.assign(Object.assign({
    classNames: wr,
    styles: wr
  }, i), {
    getPrefixCls: r,
    direction: n,
    getPopupContainer: o
  });
}
var wn = /* @__PURE__ */ le(function e() {
  ue(this, e);
}), On = "CALC_UNIT", $i = new RegExp(On, "g");
function pt(e) {
  return typeof e == "number" ? "".concat(e).concat(On) : e;
}
var ji = /* @__PURE__ */ function(e) {
  qr(r, e);
  var t = Wr(r);
  function r(n, o) {
    var i;
    ue(this, r), i = t.call(this), O(Te(i), "result", ""), O(Te(i), "unitlessCssVar", void 0), O(Te(i), "lowPriority", void 0);
    var a = Y(n);
    return i.unitlessCssVar = o, n instanceof r ? i.result = "(".concat(n.result, ")") : a === "number" ? i.result = pt(n) : a === "string" && (i.result = n), i;
  }
  return le(r, [{
    key: "add",
    value: function(o) {
      return o instanceof r ? this.result = "".concat(this.result, " + ").concat(o.getResult()) : (typeof o == "number" || typeof o == "string") && (this.result = "".concat(this.result, " + ").concat(pt(o))), this.lowPriority = !0, this;
    }
  }, {
    key: "sub",
    value: function(o) {
      return o instanceof r ? this.result = "".concat(this.result, " - ").concat(o.getResult()) : (typeof o == "number" || typeof o == "string") && (this.result = "".concat(this.result, " - ").concat(pt(o))), this.lowPriority = !0, this;
    }
  }, {
    key: "mul",
    value: function(o) {
      return this.lowPriority && (this.result = "(".concat(this.result, ")")), o instanceof r ? this.result = "".concat(this.result, " * ").concat(o.getResult(!0)) : (typeof o == "number" || typeof o == "string") && (this.result = "".concat(this.result, " * ").concat(o)), this.lowPriority = !1, this;
    }
  }, {
    key: "div",
    value: function(o) {
      return this.lowPriority && (this.result = "(".concat(this.result, ")")), o instanceof r ? this.result = "".concat(this.result, " / ").concat(o.getResult(!0)) : (typeof o == "number" || typeof o == "string") && (this.result = "".concat(this.result, " / ").concat(o)), this.lowPriority = !1, this;
    }
  }, {
    key: "getResult",
    value: function(o) {
      return this.lowPriority || o ? "(".concat(this.result, ")") : this.result;
    }
  }, {
    key: "equal",
    value: function(o) {
      var i = this, a = o || {}, c = a.unit, s = !0;
      return typeof c == "boolean" ? s = c : Array.from(this.unitlessCssVar).some(function(l) {
        return i.result.includes(l);
      }) && (s = !1), this.result = this.result.replace($i, s ? "px" : ""), typeof this.lowPriority < "u" ? "calc(".concat(this.result, ")") : this.result;
    }
  }]), r;
}(wn), Li = /* @__PURE__ */ function(e) {
  qr(r, e);
  var t = Wr(r);
  function r(n) {
    var o;
    return ue(this, r), o = t.call(this), O(Te(o), "result", 0), n instanceof r ? o.result = n.result : typeof n == "number" && (o.result = n), o;
  }
  return le(r, [{
    key: "add",
    value: function(o) {
      return o instanceof r ? this.result += o.result : typeof o == "number" && (this.result += o), this;
    }
  }, {
    key: "sub",
    value: function(o) {
      return o instanceof r ? this.result -= o.result : typeof o == "number" && (this.result -= o), this;
    }
  }, {
    key: "mul",
    value: function(o) {
      return o instanceof r ? this.result *= o.result : typeof o == "number" && (this.result *= o), this;
    }
  }, {
    key: "div",
    value: function(o) {
      return o instanceof r ? this.result /= o.result : typeof o == "number" && (this.result /= o), this;
    }
  }, {
    key: "equal",
    value: function() {
      return this.result;
    }
  }]), r;
}(wn), Di = function(t, r) {
  var n = t === "css" ? ji : Li;
  return function(o) {
    return new n(o, r);
  };
}, Or = function(t, r) {
  return "".concat([r, t.replace(/([A-Z]+)([A-Z][a-z]+)/g, "$1-$2").replace(/([a-z])([A-Z])/g, "$1-$2")].filter(Boolean).join("-"));
};
function Mr(e, t, r, n) {
  var o = $({}, t[e]);
  if (n != null && n.deprecatedTokens) {
    var i = n.deprecatedTokens;
    i.forEach(function(c) {
      var s = j(c, 2), l = s[0], f = s[1];
      if (process.env.NODE_ENV !== "production" && Se(!(o != null && o[l]), "Component Token `".concat(String(l), "` of ").concat(String(e), " is deprecated. Please use `").concat(String(f), "` instead.")), o != null && o[l] || o != null && o[f]) {
        var h;
        (h = o[f]) !== null && h !== void 0 || (o[f] = o == null ? void 0 : o[l]);
      }
    });
  }
  var a = $($({}, r), o);
  return Object.keys(a).forEach(function(c) {
    a[c] === t[c] && delete a[c];
  }), a;
}
var Mn = process.env.NODE_ENV !== "production" || typeof CSSINJS_STATISTIC < "u", Xt = !0;
function Zt() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  if (!Mn)
    return Object.assign.apply(Object, [{}].concat(t));
  Xt = !1;
  var n = {};
  return t.forEach(function(o) {
    if (Y(o) === "object") {
      var i = Object.keys(o);
      i.forEach(function(a) {
        Object.defineProperty(n, a, {
          configurable: !0,
          enumerable: !0,
          get: function() {
            return o[a];
          }
        });
      });
    }
  }), Xt = !0, n;
}
var Pr = {};
function Hi() {
}
var zi = function(t) {
  var r, n = t, o = Hi;
  return Mn && typeof Proxy < "u" && (r = /* @__PURE__ */ new Set(), n = new Proxy(t, {
    get: function(a, c) {
      if (Xt) {
        var s;
        (s = r) === null || s === void 0 || s.add(c);
      }
      return a[c];
    }
  }), o = function(a, c) {
    var s;
    Pr[a] = {
      global: Array.from(r),
      component: $($({}, (s = Pr[a]) === null || s === void 0 ? void 0 : s.component), c)
    };
  }), {
    token: n,
    keys: r,
    flush: o
  };
};
function Ar(e, t, r) {
  if (typeof r == "function") {
    var n;
    return r(Zt(t, (n = t[e]) !== null && n !== void 0 ? n : {}));
  }
  return r ?? {};
}
function Ni(e) {
  return e === "js" ? {
    max: Math.max,
    min: Math.min
  } : {
    max: function() {
      for (var r = arguments.length, n = new Array(r), o = 0; o < r; o++)
        n[o] = arguments[o];
      return "max(".concat(n.map(function(i) {
        return dr(i);
      }).join(","), ")");
    },
    min: function() {
      for (var r = arguments.length, n = new Array(r), o = 0; o < r; o++)
        n[o] = arguments[o];
      return "min(".concat(n.map(function(i) {
        return dr(i);
      }).join(","), ")");
    }
  };
}
var Fi = 1e3 * 60 * 10, Bi = /* @__PURE__ */ function() {
  function e() {
    ue(this, e), O(this, "map", /* @__PURE__ */ new Map()), O(this, "objectIDMap", /* @__PURE__ */ new WeakMap()), O(this, "nextID", 0), O(this, "lastAccessBeat", /* @__PURE__ */ new Map()), O(this, "accessBeat", 0);
  }
  return le(e, [{
    key: "set",
    value: function(r, n) {
      this.clear();
      var o = this.getCompositeKey(r);
      this.map.set(o, n), this.lastAccessBeat.set(o, Date.now());
    }
  }, {
    key: "get",
    value: function(r) {
      var n = this.getCompositeKey(r), o = this.map.get(n);
      return this.lastAccessBeat.set(n, Date.now()), this.accessBeat += 1, o;
    }
  }, {
    key: "getCompositeKey",
    value: function(r) {
      var n = this, o = r.map(function(i) {
        return i && Y(i) === "object" ? "obj_".concat(n.getObjectID(i)) : "".concat(Y(i), "_").concat(i);
      });
      return o.join("|");
    }
  }, {
    key: "getObjectID",
    value: function(r) {
      if (this.objectIDMap.has(r))
        return this.objectIDMap.get(r);
      var n = this.nextID;
      return this.objectIDMap.set(r, n), this.nextID += 1, n;
    }
  }, {
    key: "clear",
    value: function() {
      var r = this;
      if (this.accessBeat > 1e4) {
        var n = Date.now();
        this.lastAccessBeat.forEach(function(o, i) {
          n - o > Fi && (r.map.delete(i), r.lastAccessBeat.delete(i));
        }), this.accessBeat = 0;
      }
    }
  }]), e;
}(), kr = new Bi();
function Vi(e, t) {
  return ne.useMemo(function() {
    var r = kr.get(t);
    if (r)
      return r;
    var n = e();
    return kr.set(t, n), n;
  }, t);
}
var Xi = function() {
  return {};
};
function qi(e) {
  var t = e.useCSP, r = t === void 0 ? Xi : t, n = e.useToken, o = e.usePrefix, i = e.getResetStyles, a = e.getCommonStyle, c = e.getCompUnitless;
  function s(d, v, m, p) {
    var u = Array.isArray(d) ? d[0] : d;
    function y(E) {
      return "".concat(String(u)).concat(E.slice(0, 1).toUpperCase()).concat(E.slice(1));
    }
    var b = (p == null ? void 0 : p.unitless) || {}, _ = typeof c == "function" ? c(d) : {}, x = $($({}, _), {}, O({}, y("zIndexPopup"), !0));
    Object.keys(b).forEach(function(E) {
      x[y(E)] = b[E];
    });
    var g = $($({}, p), {}, {
      unitless: x,
      prefixToken: y
    }), C = f(d, v, m, g), S = l(u, m, g);
    return function(E) {
      var M = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : E, P = C(E, M), U = j(P, 2), L = U[1], D = S(M), A = j(D, 2), R = A[0], B = A[1];
      return [R, L, B];
    };
  }
  function l(d, v, m) {
    var p = m.unitless, u = m.injectStyle, y = u === void 0 ? !0 : u, b = m.prefixToken, _ = m.ignore, x = function(S) {
      var E = S.rootCls, M = S.cssVar, P = M === void 0 ? {} : M, U = n(), L = U.realToken;
      return ui({
        path: [d],
        prefix: P.prefix,
        key: P.key,
        unitless: p,
        ignore: _,
        token: L,
        scope: E
      }, function() {
        var D = Ar(d, L, v), A = Mr(d, L, D, {
          deprecatedTokens: m == null ? void 0 : m.deprecatedTokens
        });
        return Object.keys(D).forEach(function(R) {
          A[b(R)] = A[R], delete A[R];
        }), A;
      }), null;
    }, g = function(S) {
      var E = n(), M = E.cssVar;
      return [function(P) {
        return y && M ? /* @__PURE__ */ ne.createElement(ne.Fragment, null, /* @__PURE__ */ ne.createElement(x, {
          rootCls: S,
          cssVar: M,
          component: d
        }), P) : P;
      }, M == null ? void 0 : M.key];
    };
    return g;
  }
  function f(d, v, m) {
    var p = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, u = Array.isArray(d) ? d : [d, d], y = j(u, 1), b = y[0], _ = u.join("-"), x = e.layer || {
      name: "antd"
    };
    return function(g) {
      var C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : g, S = n(), E = S.theme, M = S.realToken, P = S.hashId, U = S.token, L = S.cssVar, D = o(), A = D.rootPrefixCls, R = D.iconPrefixCls, B = r(), V = L ? "css" : "js", H = Vi(function() {
        var Z = /* @__PURE__ */ new Set();
        return L && Object.keys(p.unitless || {}).forEach(function(pe) {
          Z.add(Fe(pe, L.prefix)), Z.add(Fe(pe, Or(b, L.prefix)));
        }), Di(V, Z);
      }, [V, b, L == null ? void 0 : L.prefix]), z = Ni(V), G = z.max, te = z.min, W = {
        theme: E,
        token: U,
        hashId: P,
        nonce: function() {
          return B.nonce;
        },
        clientOnly: p.clientOnly,
        layer: x,
        // antd is always at top of styles
        order: p.order || -999
      };
      typeof i == "function" && br($($({}, W), {}, {
        clientOnly: !1,
        path: ["Shared", A]
      }), function() {
        return i(U, {
          prefix: {
            rootPrefixCls: A,
            iconPrefixCls: R
          },
          csp: B
        });
      });
      var N = br($($({}, W), {}, {
        path: [_, g, R]
      }), function() {
        if (p.injectStyle === !1)
          return [];
        var Z = zi(U), pe = Z.token, rt = Z.flush, ae = Ar(b, M, m), nt = ".".concat(g), ke = Mr(b, M, ae, {
          deprecatedTokens: p.deprecatedTokens
        });
        L && ae && Y(ae) === "object" && Object.keys(ae).forEach(function(Re) {
          ae[Re] = "var(".concat(Fe(Re, Or(b, L.prefix)), ")");
        });
        var Ie = Zt(pe, {
          componentCls: nt,
          prefixCls: g,
          iconCls: ".".concat(R),
          antCls: ".".concat(A),
          calc: H,
          // @ts-ignore
          max: G,
          // @ts-ignore
          min: te
        }, L ? ae : ke), ot = v(Ie, {
          hashId: P,
          prefixCls: g,
          rootPrefixCls: A,
          iconPrefixCls: R
        });
        rt(b, ke);
        var it = typeof a == "function" ? a(Ie, g, C, p.resetFont) : null;
        return [p.resetStyle === !1 ? null : it, ot];
      });
      return [N, P];
    };
  }
  function h(d, v, m) {
    var p = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, u = f(d, v, m, $({
      resetStyle: !1,
      // Sub Style should default after root one
      order: -998
    }, p)), y = function(_) {
      var x = _.prefixCls, g = _.rootCls, C = g === void 0 ? x : g;
      return u(x, C), null;
    };
    return process.env.NODE_ENV !== "production" && (y.displayName = "SubStyle_".concat(String(Array.isArray(d) ? d.join(".") : d))), y;
  }
  return {
    genStyleHooks: s,
    genSubStyleComponent: h,
    genComponentStyleHook: f
  };
}
const Gi = "5.24.5";
function gt(e) {
  return e >= 0 && e <= 255;
}
function ze(e, t) {
  const {
    r,
    g: n,
    b: o,
    a: i
  } = new q(e).toRgb();
  if (i < 1)
    return e;
  const {
    r: a,
    g: c,
    b: s
  } = new q(t).toRgb();
  for (let l = 0.01; l <= 1; l += 0.01) {
    const f = Math.round((r - a * (1 - l)) / l), h = Math.round((n - c * (1 - l)) / l), d = Math.round((o - s * (1 - l)) / l);
    if (gt(f) && gt(h) && gt(d))
      return new q({
        r: f,
        g: h,
        b: d,
        a: Math.round(l * 100) / 100
      }).toRgbString();
  }
  return new q({
    r,
    g: n,
    b: o,
    a: 1
  }).toRgbString();
}
var Wi = function(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var o = 0, n = Object.getOwnPropertySymbols(e); o < n.length; o++)
    t.indexOf(n[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[o]) && (r[n[o]] = e[n[o]]);
  return r;
};
function Pn(e) {
  const {
    override: t
  } = e, r = Wi(e, ["override"]), n = Object.assign({}, t);
  Object.keys(Ye).forEach((d) => {
    delete n[d];
  });
  const o = Object.assign(Object.assign({}, r), n), i = 480, a = 576, c = 768, s = 992, l = 1200, f = 1600;
  if (o.motion === !1) {
    const d = "0s";
    o.motionDurationFast = d, o.motionDurationMid = d, o.motionDurationSlow = d;
  }
  return Object.assign(Object.assign(Object.assign({}, o), {
    // ============== Background ============== //
    colorFillContent: o.colorFillSecondary,
    colorFillContentHover: o.colorFill,
    colorFillAlter: o.colorFillQuaternary,
    colorBgContainerDisabled: o.colorFillTertiary,
    // ============== Split ============== //
    colorBorderBg: o.colorBgContainer,
    colorSplit: ze(o.colorBorderSecondary, o.colorBgContainer),
    // ============== Text ============== //
    colorTextPlaceholder: o.colorTextQuaternary,
    colorTextDisabled: o.colorTextQuaternary,
    colorTextHeading: o.colorText,
    colorTextLabel: o.colorTextSecondary,
    colorTextDescription: o.colorTextTertiary,
    colorTextLightSolid: o.colorWhite,
    colorHighlight: o.colorError,
    colorBgTextHover: o.colorFillSecondary,
    colorBgTextActive: o.colorFill,
    colorIcon: o.colorTextTertiary,
    colorIconHover: o.colorText,
    colorErrorOutline: ze(o.colorErrorBg, o.colorBgContainer),
    colorWarningOutline: ze(o.colorWarningBg, o.colorBgContainer),
    // Font
    fontSizeIcon: o.fontSizeSM,
    // Line
    lineWidthFocus: o.lineWidth * 3,
    // Control
    lineWidth: o.lineWidth,
    controlOutlineWidth: o.lineWidth * 2,
    // Checkbox size and expand icon size
    controlInteractiveSize: o.controlHeight / 2,
    controlItemBgHover: o.colorFillTertiary,
    controlItemBgActive: o.colorPrimaryBg,
    controlItemBgActiveHover: o.colorPrimaryBgHover,
    controlItemBgActiveDisabled: o.colorFill,
    controlTmpOutline: o.colorFillQuaternary,
    controlOutline: ze(o.colorPrimaryBg, o.colorBgContainer),
    lineType: o.lineType,
    borderRadius: o.borderRadius,
    borderRadiusXS: o.borderRadiusXS,
    borderRadiusSM: o.borderRadiusSM,
    borderRadiusLG: o.borderRadiusLG,
    fontWeightStrong: 600,
    opacityLoading: 0.65,
    linkDecoration: "none",
    linkHoverDecoration: "none",
    linkFocusDecoration: "none",
    controlPaddingHorizontal: 12,
    controlPaddingHorizontalSM: 8,
    paddingXXS: o.sizeXXS,
    paddingXS: o.sizeXS,
    paddingSM: o.sizeSM,
    padding: o.size,
    paddingMD: o.sizeMD,
    paddingLG: o.sizeLG,
    paddingXL: o.sizeXL,
    paddingContentHorizontalLG: o.sizeLG,
    paddingContentVerticalLG: o.sizeMS,
    paddingContentHorizontal: o.sizeMS,
    paddingContentVertical: o.sizeSM,
    paddingContentHorizontalSM: o.size,
    paddingContentVerticalSM: o.sizeXS,
    marginXXS: o.sizeXXS,
    marginXS: o.sizeXS,
    marginSM: o.sizeSM,
    margin: o.size,
    marginMD: o.sizeMD,
    marginLG: o.sizeLG,
    marginXL: o.sizeXL,
    marginXXL: o.sizeXXL,
    boxShadow: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowSecondary: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowTertiary: `
      0 1px 2px 0 rgba(0, 0, 0, 0.03),
      0 1px 6px -1px rgba(0, 0, 0, 0.02),
      0 2px 4px 0 rgba(0, 0, 0, 0.02)
    `,
    screenXS: i,
    screenXSMin: i,
    screenXSMax: a - 1,
    screenSM: a,
    screenSMMin: a,
    screenSMMax: c - 1,
    screenMD: c,
    screenMDMin: c,
    screenMDMax: s - 1,
    screenLG: s,
    screenLGMin: s,
    screenLGMax: l - 1,
    screenXL: l,
    screenXLMin: l,
    screenXLMax: f - 1,
    screenXXL: f,
    screenXXLMin: f,
    boxShadowPopoverArrow: "2px 2px 5px rgba(0, 0, 0, 0.05)",
    boxShadowCard: `
      0 1px 2px -2px ${new q("rgba(0, 0, 0, 0.16)").toRgbString()},
      0 3px 6px 0 ${new q("rgba(0, 0, 0, 0.12)").toRgbString()},
      0 5px 12px 4px ${new q("rgba(0, 0, 0, 0.09)").toRgbString()}
    `,
    boxShadowDrawerRight: `
      -6px 0 16px 0 rgba(0, 0, 0, 0.08),
      -3px 0 6px -4px rgba(0, 0, 0, 0.12),
      -9px 0 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowDrawerLeft: `
      6px 0 16px 0 rgba(0, 0, 0, 0.08),
      3px 0 6px -4px rgba(0, 0, 0, 0.12),
      9px 0 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowDrawerUp: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowDrawerDown: `
      0 -6px 16px 0 rgba(0, 0, 0, 0.08),
      0 -3px 6px -4px rgba(0, 0, 0, 0.12),
      0 -9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowTabsOverflowLeft: "inset 10px 0 8px -8px rgba(0, 0, 0, 0.08)",
    boxShadowTabsOverflowRight: "inset -10px 0 8px -8px rgba(0, 0, 0, 0.08)",
    boxShadowTabsOverflowTop: "inset 0 10px 8px -8px rgba(0, 0, 0, 0.08)",
    boxShadowTabsOverflowBottom: "inset 0 -10px 8px -8px rgba(0, 0, 0, 0.08)"
  }), n);
}
var Ir = function(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var o = 0, n = Object.getOwnPropertySymbols(e); o < n.length; o++)
    t.indexOf(n[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[o]) && (r[n[o]] = e[n[o]]);
  return r;
};
const An = {
  lineHeight: !0,
  lineHeightSM: !0,
  lineHeightLG: !0,
  lineHeightHeading1: !0,
  lineHeightHeading2: !0,
  lineHeightHeading3: !0,
  lineHeightHeading4: !0,
  lineHeightHeading5: !0,
  opacityLoading: !0,
  fontWeightStrong: !0,
  zIndexPopupBase: !0,
  zIndexBase: !0,
  opacityImage: !0
}, Ui = {
  size: !0,
  sizeSM: !0,
  sizeLG: !0,
  sizeMD: !0,
  sizeXS: !0,
  sizeXXS: !0,
  sizeMS: !0,
  sizeXL: !0,
  sizeXXL: !0,
  sizeUnit: !0,
  sizeStep: !0,
  motionBase: !0,
  motionUnit: !0
}, Yi = {
  screenXS: !0,
  screenXSMin: !0,
  screenXSMax: !0,
  screenSM: !0,
  screenSMMin: !0,
  screenSMMax: !0,
  screenMD: !0,
  screenMDMin: !0,
  screenMDMax: !0,
  screenLG: !0,
  screenLGMin: !0,
  screenLGMax: !0,
  screenXL: !0,
  screenXLMin: !0,
  screenXLMax: !0,
  screenXXL: !0,
  screenXXLMin: !0
}, kn = (e, t, r) => {
  const n = r.getDerivativeToken(e), {
    override: o
  } = t, i = Ir(t, ["override"]);
  let a = Object.assign(Object.assign({}, n), {
    override: o
  });
  return a = Pn(a), i && Object.entries(i).forEach((c) => {
    let [s, l] = c;
    const {
      theme: f
    } = l, h = Ir(l, ["theme"]);
    let d = h;
    f && (d = kn(Object.assign(Object.assign({}, a), h), {
      override: h
    }, f)), a[s] = d;
  }), a;
};
function Ki() {
  const {
    token: e,
    hashed: t,
    theme: r,
    override: n,
    cssVar: o
  } = ne.useContext(ki), i = `${Gi}-${t || ""}`, a = r || Pi, [c, s, l] = $o(a, [Ye, e], {
    salt: i,
    override: n,
    getComputedToken: kn,
    // formatToken will not be consumed after 1.15.0 with getComputedToken.
    // But token will break if @ant-design/cssinjs is under 1.15.0 without it
    formatToken: Pn,
    cssVar: o && {
      prefix: o.prefix,
      key: o.key,
      unitless: An,
      ignore: Ui,
      preserve: Yi
    }
  });
  return [a, l, t ? s : "", c, o];
}
const Qi = function(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  return {
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
    color: e.colorText,
    fontSize: e.fontSize,
    // font-variant: @font-variant-base;
    lineHeight: e.lineHeight,
    listStyle: "none",
    // font-feature-settings: @font-feature-settings-base;
    fontFamily: t ? "inherit" : e.fontFamily
  };
}, Zi = () => ({
  display: "inline-flex",
  alignItems: "center",
  color: "inherit",
  fontStyle: "normal",
  lineHeight: 0,
  textAlign: "center",
  textTransform: "none",
  // for SVG icon, see https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4
  verticalAlign: "-0.125em",
  textRendering: "optimizeLegibility",
  "-webkit-font-smoothing": "antialiased",
  "-moz-osx-font-smoothing": "grayscale",
  "> *": {
    lineHeight: 1
  },
  svg: {
    display: "inline-block"
  }
}), Ji = (e) => ({
  a: {
    color: e.colorLink,
    textDecoration: e.linkDecoration,
    backgroundColor: "transparent",
    // remove the gray background on active links in IE 10.
    outline: "none",
    cursor: "pointer",
    transition: `color ${e.motionDurationSlow}`,
    "-webkit-text-decoration-skip": "objects",
    // remove gaps in links underline in iOS 8+ and Safari 8+.
    "&:hover": {
      color: e.colorLinkHover
    },
    "&:active": {
      color: e.colorLinkActive
    },
    "&:active, &:hover": {
      textDecoration: e.linkHoverDecoration,
      outline: 0
    },
    // https://github.com/ant-design/ant-design/issues/22503
    "&:focus": {
      textDecoration: e.linkFocusDecoration,
      outline: 0
    },
    "&[disabled]": {
      color: e.colorTextDisabled,
      cursor: "not-allowed"
    }
  }
}), ea = (e, t, r, n) => {
  const o = `[class^="${t}"], [class*=" ${t}"]`, i = r ? `.${r}` : o, a = {
    boxSizing: "border-box",
    "&::before, &::after": {
      boxSizing: "border-box"
    }
  };
  let c = {};
  return n !== !1 && (c = {
    fontFamily: e.fontFamily,
    fontSize: e.fontSize
  }), {
    [i]: Object.assign(Object.assign(Object.assign({}, c), a), {
      [o]: a
    })
  };
}, ta = (e) => ({
  [`.${e}`]: Object.assign(Object.assign({}, Zi()), {
    [`.${e} .${e}-icon`]: {
      display: "block"
    }
  })
}), {
  genStyleHooks: ra
} = qi({
  usePrefix: () => {
    const {
      getPrefixCls: e,
      iconPrefixCls: t
    } = Ge(Ke);
    return {
      rootPrefixCls: e(),
      iconPrefixCls: t
    };
  },
  useToken: () => {
    const [e, t, r, n, o] = Ki();
    return {
      theme: e,
      realToken: t,
      hashId: r,
      token: n,
      cssVar: o
    };
  },
  useCSP: () => {
    const {
      csp: e
    } = Ge(Ke);
    return e ?? {};
  },
  getResetStyles: (e, t) => {
    var r;
    const n = Ji(e);
    return [n, {
      "&": n
    }, ta((r = t == null ? void 0 : t.prefix.iconPrefixCls) !== null && r !== void 0 ? r : Tn)];
  },
  getCommonStyle: ea,
  getCompUnitless: () => An
}), na = (e, t, r) => /* @__PURE__ */ ne.isValidElement(e) ? /* @__PURE__ */ ne.cloneElement(e, typeof r == "function" ? r(e.props || {}) : r) : t;
function oa(e, t) {
  return na(e, e, t);
}
function ia(e, t, r) {
  var n = r || {}, o = n.noTrailing, i = o === void 0 ? !1 : o, a = n.noLeading, c = a === void 0 ? !1 : a, s = n.debounceMode, l = s === void 0 ? void 0 : s, f, h = !1, d = 0;
  function v() {
    f && clearTimeout(f);
  }
  function m(u) {
    var y = u || {}, b = y.upcomingOnly, _ = b === void 0 ? !1 : b;
    v(), h = !_;
  }
  function p() {
    for (var u = arguments.length, y = new Array(u), b = 0; b < u; b++)
      y[b] = arguments[b];
    var _ = this, x = Date.now() - d;
    if (h)
      return;
    function g() {
      d = Date.now(), t.apply(_, y);
    }
    function C() {
      f = void 0;
    }
    !c && l && !f && g(), v(), l === void 0 && x > e ? c ? (d = Date.now(), i || (f = setTimeout(l ? C : g, e))) : g() : i !== !0 && (f = setTimeout(l ? C : g, l === void 0 ? e - x : e));
  }
  return p.cancel = m, p;
}
function aa(e, t, r) {
  var n = {}, o = n.atBegin, i = o === void 0 ? !1 : o;
  return ia(e, t, {
    debounceMode: i !== !1
  });
}
const Qe = 100, In = Qe / 5, Rn = Qe / 2 - In / 2, mt = Rn * 2 * Math.PI, Rr = 50, $r = (e) => {
  const {
    dotClassName: t,
    style: r,
    hasCircleCls: n
  } = e;
  return /* @__PURE__ */ w.createElement("circle", {
    className: ie(`${t}-circle`, {
      [`${t}-circle-bg`]: n
    }),
    r: Rn,
    cx: Rr,
    cy: Rr,
    strokeWidth: In,
    style: r
  });
}, sa = (e) => {
  let {
    percent: t,
    prefixCls: r
  } = e;
  const n = `${r}-dot`, o = `${n}-holder`, i = `${o}-hidden`, [a, c] = w.useState(!1);
  tn(() => {
    t !== 0 && c(!0);
  }, [t !== 0]);
  const s = Math.max(Math.min(t, 100), 0);
  if (!a)
    return null;
  const l = {
    strokeDashoffset: `${mt / 4}`,
    strokeDasharray: `${mt * s / 100} ${mt * (100 - s) / 100}`
  };
  return /* @__PURE__ */ w.createElement("span", {
    className: ie(o, `${n}-progress`, s <= 0 && i)
  }, /* @__PURE__ */ w.createElement("svg", {
    viewBox: `0 0 ${Qe} ${Qe}`,
    // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: progressbar could be readonly
    role: "progressbar",
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    "aria-valuenow": s
  }, /* @__PURE__ */ w.createElement($r, {
    dotClassName: n,
    hasCircleCls: !0
  }), /* @__PURE__ */ w.createElement($r, {
    dotClassName: n,
    style: l
  })));
};
function ca(e) {
  const {
    prefixCls: t,
    percent: r = 0
  } = e, n = `${t}-dot`, o = `${n}-holder`, i = `${o}-hidden`;
  return /* @__PURE__ */ w.createElement(w.Fragment, null, /* @__PURE__ */ w.createElement("span", {
    className: ie(o, r > 0 && i)
  }, /* @__PURE__ */ w.createElement("span", {
    className: ie(n, `${t}-dot-spin`)
  }, [1, 2, 3, 4].map((a) => /* @__PURE__ */ w.createElement("i", {
    className: `${t}-dot-item`,
    key: a
  })))), /* @__PURE__ */ w.createElement(sa, {
    prefixCls: t,
    percent: r
  }));
}
function ua(e) {
  const {
    prefixCls: t,
    indicator: r,
    percent: n
  } = e, o = `${t}-dot`;
  return r && /* @__PURE__ */ w.isValidElement(r) ? oa(r, {
    className: ie(r.props.className, o),
    percent: n
  }) : /* @__PURE__ */ w.createElement(ca, {
    prefixCls: t,
    percent: n
  });
}
const la = new yn("antSpinMove", {
  to: {
    opacity: 1
  }
}), fa = new yn("antRotate", {
  to: {
    transform: "rotate(405deg)"
  }
}), da = (e) => {
  const {
    componentCls: t,
    calc: r
  } = e;
  return {
    [t]: Object.assign(Object.assign({}, Qi(e)), {
      position: "absolute",
      display: "none",
      color: e.colorPrimary,
      fontSize: 0,
      textAlign: "center",
      verticalAlign: "middle",
      opacity: 0,
      transition: `transform ${e.motionDurationSlow} ${e.motionEaseInOutCirc}`,
      "&-spinning": {
        position: "relative",
        display: "inline-block",
        opacity: 1
      },
      [`${t}-text`]: {
        fontSize: e.fontSize,
        paddingTop: r(r(e.dotSize).sub(e.fontSize)).div(2).add(2).equal()
      },
      "&-fullscreen": {
        position: "fixed",
        width: "100vw",
        height: "100vh",
        backgroundColor: e.colorBgMask,
        zIndex: e.zIndexPopupBase,
        inset: 0,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        opacity: 0,
        visibility: "hidden",
        transition: `all ${e.motionDurationMid}`,
        "&-show": {
          opacity: 1,
          visibility: "visible"
        },
        [t]: {
          [`${t}-dot-holder`]: {
            color: e.colorWhite
          },
          [`${t}-text`]: {
            color: e.colorTextLightSolid
          }
        }
      },
      "&-nested-loading": {
        position: "relative",
        [`> div > ${t}`]: {
          position: "absolute",
          top: 0,
          insetInlineStart: 0,
          zIndex: 4,
          display: "block",
          width: "100%",
          height: "100%",
          maxHeight: e.contentHeight,
          [`${t}-dot`]: {
            position: "absolute",
            top: "50%",
            insetInlineStart: "50%",
            margin: r(e.dotSize).mul(-1).div(2).equal()
          },
          [`${t}-text`]: {
            position: "absolute",
            top: "50%",
            width: "100%",
            textShadow: `0 1px 2px ${e.colorBgContainer}`
            // FIXME: shadow
          },
          [`&${t}-show-text ${t}-dot`]: {
            marginTop: r(e.dotSize).div(2).mul(-1).sub(10).equal()
          },
          "&-sm": {
            [`${t}-dot`]: {
              margin: r(e.dotSizeSM).mul(-1).div(2).equal()
            },
            [`${t}-text`]: {
              paddingTop: r(r(e.dotSizeSM).sub(e.fontSize)).div(2).add(2).equal()
            },
            [`&${t}-show-text ${t}-dot`]: {
              marginTop: r(e.dotSizeSM).div(2).mul(-1).sub(10).equal()
            }
          },
          "&-lg": {
            [`${t}-dot`]: {
              margin: r(e.dotSizeLG).mul(-1).div(2).equal()
            },
            [`${t}-text`]: {
              paddingTop: r(r(e.dotSizeLG).sub(e.fontSize)).div(2).add(2).equal()
            },
            [`&${t}-show-text ${t}-dot`]: {
              marginTop: r(e.dotSizeLG).div(2).mul(-1).sub(10).equal()
            }
          }
        },
        [`${t}-container`]: {
          position: "relative",
          transition: `opacity ${e.motionDurationSlow}`,
          "&::after": {
            position: "absolute",
            top: 0,
            insetInlineEnd: 0,
            bottom: 0,
            insetInlineStart: 0,
            zIndex: 10,
            width: "100%",
            height: "100%",
            background: e.colorBgContainer,
            opacity: 0,
            transition: `all ${e.motionDurationSlow}`,
            content: '""',
            pointerEvents: "none"
          }
        },
        [`${t}-blur`]: {
          clear: "both",
          opacity: 0.5,
          userSelect: "none",
          pointerEvents: "none",
          "&::after": {
            opacity: 0.4,
            pointerEvents: "auto"
          }
        }
      },
      // tip
      // ------------------------------
      "&-tip": {
        color: e.spinDotDefault
      },
      // holder
      // ------------------------------
      [`${t}-dot-holder`]: {
        width: "1em",
        height: "1em",
        fontSize: e.dotSize,
        display: "inline-block",
        transition: `transform ${e.motionDurationSlow} ease, opacity ${e.motionDurationSlow} ease`,
        transformOrigin: "50% 50%",
        lineHeight: 1,
        color: e.colorPrimary,
        "&-hidden": {
          transform: "scale(0.3)",
          opacity: 0
        }
      },
      // progress
      // ------------------------------
      [`${t}-dot-progress`]: {
        position: "absolute",
        inset: 0
      },
      // dots
      // ------------------------------
      [`${t}-dot`]: {
        position: "relative",
        display: "inline-block",
        fontSize: e.dotSize,
        width: "1em",
        height: "1em",
        "&-item": {
          position: "absolute",
          display: "block",
          width: r(e.dotSize).sub(r(e.marginXXS).div(2)).div(2).equal(),
          height: r(e.dotSize).sub(r(e.marginXXS).div(2)).div(2).equal(),
          background: "currentColor",
          borderRadius: "100%",
          transform: "scale(0.75)",
          transformOrigin: "50% 50%",
          opacity: 0.3,
          animationName: la,
          animationDuration: "1s",
          animationIterationCount: "infinite",
          animationTimingFunction: "linear",
          animationDirection: "alternate",
          "&:nth-child(1)": {
            top: 0,
            insetInlineStart: 0,
            animationDelay: "0s"
          },
          "&:nth-child(2)": {
            top: 0,
            insetInlineEnd: 0,
            animationDelay: "0.4s"
          },
          "&:nth-child(3)": {
            insetInlineEnd: 0,
            bottom: 0,
            animationDelay: "0.8s"
          },
          "&:nth-child(4)": {
            bottom: 0,
            insetInlineStart: 0,
            animationDelay: "1.2s"
          }
        },
        "&-spin": {
          transform: "rotate(45deg)",
          animationName: fa,
          animationDuration: "1.2s",
          animationIterationCount: "infinite",
          animationTimingFunction: "linear"
        },
        "&-circle": {
          strokeLinecap: "round",
          transition: ["stroke-dashoffset", "stroke-dasharray", "stroke", "stroke-width", "opacity"].map((n) => `${n} ${e.motionDurationSlow} ease`).join(","),
          fillOpacity: 0,
          stroke: "currentcolor"
        },
        "&-circle-bg": {
          stroke: e.colorFillSecondary
        }
      },
      // small
      [`&-sm ${t}-dot`]: {
        "&, &-holder": {
          fontSize: e.dotSizeSM
        }
      },
      [`&-sm ${t}-dot-holder`]: {
        i: {
          width: r(r(e.dotSizeSM).sub(r(e.marginXXS).div(2))).div(2).equal(),
          height: r(r(e.dotSizeSM).sub(r(e.marginXXS).div(2))).div(2).equal()
        }
      },
      // large
      [`&-lg ${t}-dot`]: {
        "&, &-holder": {
          fontSize: e.dotSizeLG
        }
      },
      [`&-lg ${t}-dot-holder`]: {
        i: {
          width: r(r(e.dotSizeLG).sub(e.marginXXS)).div(2).equal(),
          height: r(r(e.dotSizeLG).sub(e.marginXXS)).div(2).equal()
        }
      },
      [`&${t}-show-text ${t}-text`]: {
        display: "block"
      }
    })
  };
}, ha = (e) => {
  const {
    controlHeightLG: t,
    controlHeight: r
  } = e;
  return {
    contentHeight: 400,
    dotSize: t / 2,
    dotSizeSM: t * 0.35,
    dotSizeLG: r
  };
}, pa = ra("Spin", (e) => {
  const t = Zt(e, {
    spinDotDefault: e.colorTextDescription
  });
  return [da(t)];
}, ha), ga = 200, jr = [[30, 0.05], [70, 0.03], [96, 0.01]];
function ma(e, t) {
  const [r, n] = w.useState(0), o = w.useRef(null), i = t === "auto";
  return w.useEffect(() => (i && e && (n(0), o.current = setInterval(() => {
    n((a) => {
      const c = 100 - a;
      for (let s = 0; s < jr.length; s += 1) {
        const [l, f] = jr[s];
        if (a <= l)
          return a + c * f;
      }
      return a;
    });
  }, ga)), () => {
    clearInterval(o.current);
  }), [i, e]), i ? r : t;
}
var va = function(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var o = 0, n = Object.getOwnPropertySymbols(e); o < n.length; o++)
    t.indexOf(n[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[o]) && (r[n[o]] = e[n[o]]);
  return r;
};
let $n;
function ya(e, t) {
  return !!e && !!t && !Number.isNaN(Number(t));
}
const Jt = (e) => {
  var t;
  const {
    prefixCls: r,
    spinning: n = !0,
    delay: o = 0,
    className: i,
    rootClassName: a,
    size: c = "default",
    tip: s,
    wrapperClassName: l,
    style: f,
    children: h,
    fullscreen: d = !1,
    indicator: v,
    percent: m
  } = e, p = va(e, ["prefixCls", "spinning", "delay", "className", "rootClassName", "size", "tip", "wrapperClassName", "style", "children", "fullscreen", "indicator", "percent"]), {
    getPrefixCls: u,
    direction: y,
    className: b,
    style: _,
    indicator: x
  } = Ri("spin"), g = u("spin", r), [C, S, E] = pa(g), [M, P] = w.useState(() => n && !ya(n, o)), U = ma(M, m);
  w.useEffect(() => {
    if (n) {
      const H = aa(o, () => {
        P(!0);
      });
      return H(), () => {
        var z;
        (z = H == null ? void 0 : H.cancel) === null || z === void 0 || z.call(H);
      };
    }
    P(!1);
  }, [o, n]);
  const L = w.useMemo(() => typeof h < "u" && !d, [h, d]);
  if (process.env.NODE_ENV !== "production") {
    const H = hi("Spin");
    process.env.NODE_ENV !== "production" && H(!s || L || d, "usage", "`tip` only work in nest or fullscreen pattern.");
  }
  const D = ie(g, b, {
    [`${g}-sm`]: c === "small",
    [`${g}-lg`]: c === "large",
    [`${g}-spinning`]: M,
    [`${g}-show-text`]: !!s,
    [`${g}-rtl`]: y === "rtl"
  }, i, !d && a, S, E), A = ie(`${g}-container`, {
    [`${g}-blur`]: M
  }), R = (t = v ?? x) !== null && t !== void 0 ? t : $n, B = Object.assign(Object.assign({}, _), f), V = /* @__PURE__ */ w.createElement("div", Object.assign({}, p, {
    style: B,
    className: D,
    "aria-live": "polite",
    "aria-busy": M
  }), /* @__PURE__ */ w.createElement(ua, {
    prefixCls: g,
    indicator: R,
    percent: U
  }), s && (L || d) ? /* @__PURE__ */ w.createElement("div", {
    className: `${g}-text`
  }, s) : null);
  return C(L ? /* @__PURE__ */ w.createElement("div", Object.assign({}, p, {
    className: ie(`${g}-nested-loading`, l, S, E)
  }), M && /* @__PURE__ */ w.createElement("div", {
    key: "loading"
  }, V), /* @__PURE__ */ w.createElement("div", {
    className: A,
    key: "container"
  }, h)) : d ? /* @__PURE__ */ w.createElement("div", {
    className: ie(`${g}-fullscreen`, {
      [`${g}-fullscreen-show`]: M
    }, a, S, E)
  }, V) : V);
};
Jt.setDefaultIndicator = (e) => {
  $n = e;
};
process.env.NODE_ENV !== "production" && (Jt.displayName = "Spin");
var Ne = { exports: {} }, vt = {}, Lr;
function er() {
  if (Lr) return vt;
  Lr = 1;
  function e(t) {
    return t && t.__esModule ? t : { default: t };
  }
  return vt._ = e, vt;
}
function ba(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var yt = {}, bt = {}, Dr;
function Sa() {
  return Dr || (Dr = 1, function(e) {
    "use client";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "LoadableContext", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const n = (/* @__PURE__ */ (/* @__PURE__ */ er())._(ne)).default.createContext(null);
    process.env.NODE_ENV !== "production" && (n.displayName = "LoadableContext");
  }(bt)), bt;
}
var Hr;
function xa() {
  return Hr || (Hr = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return v;
      }
    });
    const r = /* @__PURE__ */ (/* @__PURE__ */ er())._(ne), n = Sa();
    function o(m) {
      return m && m.default ? m.default : m;
    }
    const i = [], a = [];
    let c = !1;
    function s(m) {
      let p = m(), u = {
        loading: !0,
        loaded: null,
        error: null
      };
      return u.promise = p.then((y) => (u.loading = !1, u.loaded = y, y)).catch((y) => {
        throw u.loading = !1, u.error = y, y;
      }), u;
    }
    function l(m, p) {
      let u = Object.assign({
        loader: null,
        loading: null,
        delay: 200,
        timeout: null,
        webpack: null,
        modules: null
      }, p), y = null;
      function b() {
        if (!y) {
          const g = new f(m, u);
          y = {
            getCurrentValue: g.getCurrentValue.bind(g),
            subscribe: g.subscribe.bind(g),
            retry: g.retry.bind(g),
            promise: g.promise.bind(g)
          };
        }
        return y.promise();
      }
      if (typeof window > "u" && i.push(b), !c && typeof window < "u") {
        const g = u.webpack && typeof ba.resolveWeak == "function" ? u.webpack() : u.modules;
        g && a.push((C) => {
          for (const S of g)
            if (C.includes(S))
              return b();
        });
      }
      function _() {
        b();
        const g = r.default.useContext(n.LoadableContext);
        g && Array.isArray(u.modules) && u.modules.forEach((C) => {
          g(C);
        });
      }
      function x(g, C) {
        _();
        const S = r.default.useSyncExternalStore(y.subscribe, y.getCurrentValue, y.getCurrentValue);
        return r.default.useImperativeHandle(C, () => ({
          retry: y.retry
        }), []), r.default.useMemo(() => S.loading || S.error ? /* @__PURE__ */ r.default.createElement(u.loading, {
          isLoading: S.loading,
          pastDelay: S.pastDelay,
          timedOut: S.timedOut,
          error: S.error,
          retry: y.retry
        }) : S.loaded ? /* @__PURE__ */ r.default.createElement(o(S.loaded), g) : null, [
          g,
          S
        ]);
      }
      return x.preload = () => b(), x.displayName = "LoadableComponent", /* @__PURE__ */ r.default.forwardRef(x);
    }
    class f {
      promise() {
        return this._res.promise;
      }
      retry() {
        this._clearTimeouts(), this._res = this._loadFn(this._opts.loader), this._state = {
          pastDelay: !1,
          timedOut: !1
        };
        const { _res: p, _opts: u } = this;
        p.loading && (typeof u.delay == "number" && (u.delay === 0 ? this._state.pastDelay = !0 : this._delay = setTimeout(() => {
          this._update({
            pastDelay: !0
          });
        }, u.delay)), typeof u.timeout == "number" && (this._timeout = setTimeout(() => {
          this._update({
            timedOut: !0
          });
        }, u.timeout))), this._res.promise.then(() => {
          this._update({}), this._clearTimeouts();
        }).catch((y) => {
          this._update({}), this._clearTimeouts();
        }), this._update({});
      }
      _update(p) {
        this._state = {
          ...this._state,
          error: this._res.error,
          loaded: this._res.loaded,
          loading: this._res.loading,
          ...p
        }, this._callbacks.forEach((u) => u());
      }
      _clearTimeouts() {
        clearTimeout(this._delay), clearTimeout(this._timeout);
      }
      getCurrentValue() {
        return this._state;
      }
      subscribe(p) {
        return this._callbacks.add(p), () => {
          this._callbacks.delete(p);
        };
      }
      constructor(p, u) {
        this._loadFn = p, this._opts = u, this._callbacks = /* @__PURE__ */ new Set(), this._delay = null, this._timeout = null, this.retry();
      }
    }
    function h(m) {
      return l(s, m);
    }
    function d(m, p) {
      let u = [];
      for (; m.length; ) {
        let y = m.pop();
        u.push(y(p));
      }
      return Promise.all(u).then(() => {
        if (m.length)
          return d(m, p);
      });
    }
    h.preloadAll = () => new Promise((m, p) => {
      d(i).then(m, p);
    }), h.preloadReady = (m) => (m === void 0 && (m = []), new Promise((p) => {
      const u = () => (c = !0, p());
      d(a, m).then(u, u);
    })), typeof window < "u" && (window.__NEXT_PRELOADREADY = h.preloadReady);
    const v = h;
  }(yt)), yt;
}
var zr;
function Ca() {
  return zr || (zr = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function r(f, h) {
      for (var d in h) Object.defineProperty(f, d, {
        enumerable: !0,
        get: h[d]
      });
    }
    r(t, {
      /**
      * This function lets you dynamically import a component.
      * It uses [React.lazy()](https://react.dev/reference/react/lazy) with [Suspense](https://react.dev/reference/react/Suspense) under the hood.
      *
      * Read more: [Next.js Docs: `next/dynamic`](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading#nextdynamic)
      */
      default: function() {
        return l;
      },
      noSSR: function() {
        return s;
      }
    });
    const n = /* @__PURE__ */ er(), o = jn, i = /* @__PURE__ */ n._(xa()), a = typeof window > "u";
    function c(f) {
      return {
        default: (f == null ? void 0 : f.default) || f
      };
    }
    function s(f, h) {
      if (delete h.webpack, delete h.modules, !a)
        return f(h);
      const d = h.loading;
      return () => /* @__PURE__ */ (0, o.jsx)(d, {
        error: null,
        isLoading: !0,
        pastDelay: !1,
        timedOut: !1
      });
    }
    function l(f, h) {
      let d = i.default, v = {
        // A loading component is not required, so we default it
        loading: (u) => {
          let { error: y, isLoading: b, pastDelay: _ } = u;
          if (!_) return null;
          if (process.env.NODE_ENV !== "production") {
            if (b)
              return null;
            if (y)
              return /* @__PURE__ */ (0, o.jsxs)("p", {
                children: [
                  y.message,
                  /* @__PURE__ */ (0, o.jsx)("br", {}),
                  y.stack
                ]
              });
          }
          return null;
        }
      };
      f instanceof Promise ? v.loader = () => f : typeof f == "function" ? v.loader = f : typeof f == "object" && (v = {
        ...v,
        ...f
      }), v = {
        ...v,
        ...h
      };
      const m = v.loader, p = () => m != null ? m().then(c) : Promise.resolve(c(() => null));
      return v.loadableGenerated && (v = {
        ...v,
        ...v.loadableGenerated
      }, delete v.loadableGenerated), typeof v.ssr == "boolean" && !v.ssr ? (delete v.webpack, delete v.modules, s(d, v)) : d({
        ...v,
        loader: p
      });
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Ne, Ne.exports)), Ne.exports;
}
var St, Nr;
function _a() {
  return Nr || (Nr = 1, St = Ca()), St;
}
var Ea = _a();
const Ta = /* @__PURE__ */ Fr(Ea), Aa = Ta(
  async () => {
    const { default: e } = await import("./index-C19QbiJt.js").then((t) => t.i);
    return e;
  },
  {
    loading: () => /* @__PURE__ */ Ln(Jt, {}),
    ssr: !1
  }
);
export {
  Aa as R,
  Ma as c,
  Fr as g
};
