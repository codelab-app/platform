var Hs = Object.defineProperty;
var $s = (e, t, r) => t in e ? Hs(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var j = (e, t, r) => $s(e, typeof t != "symbol" ? t + "" : t, r);
import { r as ht, a as Re, b as He, c as Js, d as Xe, e as Ye, f as At, g as zn, h as Ls, i as qs, j as zs, k as Bs, l as js, m as se, n as Gs } from "./index-iNXnuP3F.js";
import Fs from "react";
var qe = {}, Kt = {}, Wt = {}, Mt = {}, sn;
function Er() {
  return sn || (sn = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "ReflectAdapter", {
      enumerable: !0,
      get: function() {
        return t;
      }
    });
    class t {
      static get(n, s, a) {
        const i = Reflect.get(n, s, a);
        return typeof i == "function" ? i.bind(n) : i;
      }
      static set(n, s, a, i) {
        return Reflect.set(n, s, a, i);
      }
      static has(n, s) {
        return Reflect.has(n, s);
      }
      static deleteProperty(n, s) {
        return Reflect.deleteProperty(n, s);
      }
    }
  }(Mt)), Mt;
}
var an;
function Vs() {
  return an || (an = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(m, p) {
      for (var l in p) Object.defineProperty(m, l, {
        enumerable: !0,
        get: p[l]
      });
    }
    t(e, {
      MutableRequestCookiesAdapter: function() {
        return y;
      },
      ReadonlyRequestCookiesError: function() {
        return i;
      },
      RequestCookiesAdapter: function() {
        return o;
      },
      appendMutableCookies: function() {
        return g;
      },
      areCookiesMutableInCurrentPhase: function() {
        return S;
      },
      getModifiedCookieValues: function() {
        return u;
      },
      responseCookiesToRequestCookies: function() {
        return E;
      },
      wrapWithMutableAccessCheck: function() {
        return b;
      }
    });
    const r = ht(), n = Er(), s = Re(), a = He();
    class i extends Error {
      constructor() {
        super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
      }
      static callable() {
        throw new i();
      }
    }
    class o {
      static seal(p) {
        return new Proxy(p, {
          get(l, c, h) {
            switch (c) {
              case "clear":
              case "delete":
              case "set":
                return i.callable;
              default:
                return n.ReflectAdapter.get(l, c, h);
            }
          }
        });
      }
    }
    const d = Symbol.for("next.mutated.cookies");
    function u(m) {
      const p = m[d];
      return !p || !Array.isArray(p) || p.length === 0 ? [] : p;
    }
    function g(m, p) {
      const l = u(p);
      if (l.length === 0)
        return !1;
      const c = new r.ResponseCookies(m), h = c.getAll();
      for (const R of l)
        c.set(R);
      for (const R of h)
        c.set(R);
      return !0;
    }
    class y {
      static wrap(p, l) {
        const c = new r.ResponseCookies(new Headers());
        for (const w of p.getAll())
          c.set(w);
        let h = [];
        const R = /* @__PURE__ */ new Set(), U = () => {
          const w = s.workAsyncStorage.getStore();
          if (w && (w.pathWasRevalidated = !0), h = c.getAll().filter((W) => R.has(W.name)), l) {
            const W = [];
            for (const k of h) {
              const v = new r.ResponseCookies(new Headers());
              v.set(k), W.push(v.toString());
            }
            l(W);
          }
        }, f = new Proxy(c, {
          get(w, A, W) {
            switch (A) {
              // A special symbol to get the modified cookie values
              case d:
                return h;
              // TODO: Throw error if trying to set a cookie after the response
              // headers have been set.
              case "delete":
                return function(...k) {
                  R.add(typeof k[0] == "string" ? k[0] : k[0].name);
                  try {
                    return w.delete(...k), f;
                  } finally {
                    U();
                  }
                };
              case "set":
                return function(...k) {
                  R.add(typeof k[0] == "string" ? k[0] : k[0].name);
                  try {
                    return w.set(...k), f;
                  } finally {
                    U();
                  }
                };
              default:
                return n.ReflectAdapter.get(w, A, W);
            }
          }
        });
        return f;
      }
    }
    function b(m) {
      const p = new Proxy(m, {
        get(l, c, h) {
          switch (c) {
            case "delete":
              return function(...R) {
                return _("cookies().delete"), l.delete(...R), p;
              };
            case "set":
              return function(...R) {
                return _("cookies().set"), l.set(...R), p;
              };
            default:
              return n.ReflectAdapter.get(l, c, h);
          }
        }
      });
      return p;
    }
    function S(m) {
      return m.phase === "action";
    }
    function _(m) {
      const p = (0, a.getExpectedRequestStore)(m);
      if (!S(p))
        throw new i();
    }
    function E(m) {
      const p = new r.RequestCookies(new Headers());
      for (const l of m.getAll())
        p.set(l);
      return p;
    }
  }(Wt)), Wt;
}
var Ht = {}, on;
function Ar() {
  return on || (on = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "createDedupedByCallsiteServerErrorLoggerDev", {
      enumerable: !0,
      get: function() {
        return d;
      }
    });
    const t = /* @__PURE__ */ n(Fs);
    function r(u) {
      if (typeof WeakMap != "function") return null;
      var g = /* @__PURE__ */ new WeakMap(), y = /* @__PURE__ */ new WeakMap();
      return (r = function(b) {
        return b ? y : g;
      })(u);
    }
    function n(u, g) {
      if (u && u.__esModule)
        return u;
      if (u === null || typeof u != "object" && typeof u != "function")
        return {
          default: u
        };
      var y = r(g);
      if (y && y.has(u))
        return y.get(u);
      var b = {
        __proto__: null
      }, S = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var _ in u)
        if (_ !== "default" && Object.prototype.hasOwnProperty.call(u, _)) {
          var E = S ? Object.getOwnPropertyDescriptor(u, _) : null;
          E && (E.get || E.set) ? Object.defineProperty(b, _, E) : b[_] = u[_];
        }
      return b.default = u, y && y.set(u, b), b;
    }
    const s = {
      current: null
    }, a = typeof t.cache == "function" ? t.cache : (u) => u, i = process.env.__NEXT_DYNAMIC_IO ? console.error : console.warn, o = a(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- cache key
      (u) => {
        try {
          i(s.current);
        } finally {
          s.current = null;
        }
      }
    );
    function d(u) {
      return function(...y) {
        const b = u(...y);
        if (process.env.NODE_ENV !== "production") {
          var S;
          const _ = (S = new Error().stack) == null ? void 0 : S.split(`
`);
          if (_ === void 0 || _.length < 4)
            i(b);
          else {
            const E = _[4];
            s.current = b, o(E);
          }
        } else
          i(b);
      };
    }
  }(Ht)), Ht;
}
var $t = {}, Jt = {}, Lt = {}, cn;
function Xs() {
  return cn || (cn = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "afterTaskAsyncStorageInstance", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const r = (0, Js().createAsyncLocalStorage)();
  }(Lt)), Lt;
}
var un;
function Ys() {
  return un || (un = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "afterTaskAsyncStorage", {
      enumerable: !0,
      get: function() {
        return t.afterTaskAsyncStorageInstance;
      }
    });
    const t = Xs();
  }(Jt)), Jt;
}
var dn;
function vr() {
  return dn || (dn = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(d, u) {
      for (var g in u) Object.defineProperty(d, g, {
        enumerable: !0,
        get: u[g]
      });
    }
    t(e, {
      isRequestAPICallableInsideAfter: function() {
        return o;
      },
      throwForSearchParamsAccessInUseCache: function() {
        return i;
      },
      throwWithStaticGenerationBailoutError: function() {
        return s;
      },
      throwWithStaticGenerationBailoutErrorWithDynamicError: function() {
        return a;
      }
    });
    const r = Xe(), n = Ys();
    function s(d, u) {
      throw Object.defineProperty(new r.StaticGenBailoutError(`Route ${d} couldn't be rendered statically because it used ${u}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
        value: "E576",
        enumerable: !1,
        configurable: !0
      });
    }
    function a(d, u) {
      throw Object.defineProperty(new r.StaticGenBailoutError(`Route ${d} with \`dynamic = "error"\` couldn't be rendered statically because it used ${u}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
        value: "E543",
        enumerable: !1,
        configurable: !0
      });
    }
    function i(d) {
      const u = Object.defineProperty(new Error(`Route ${d.route} used "searchParams" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "searchParams" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
        value: "E634",
        enumerable: !1,
        configurable: !0
      });
      throw d.invalidUsageError ?? (d.invalidUsageError = u), u;
    }
    function o() {
      const d = n.afterTaskAsyncStorage.getStore();
      return (d == null ? void 0 : d.rootTaskSpawnPhase) === "action";
    }
  }($t)), $t;
}
var ln;
function Zs() {
  return ln || (ln = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "cookies", {
      enumerable: !0,
      get: function() {
        return y;
      }
    });
    const t = Vs(), r = ht(), n = Re(), s = He(), a = Ye(), i = Xe(), o = At(), d = Ar(), u = zn(), g = vr();
    function y() {
      const f = "cookies", w = n.workAsyncStorage.getStore(), A = s.workUnitAsyncStorage.getStore();
      if (w) {
        if (A && A.phase === "after" && !(0, g.isRequestAPICallableInsideAfter)())
          throw Object.defineProperty(new Error(
            // TODO(after): clarify that this only applies to pages?
            `Route ${w.route} used "cookies" inside "after(...)". This is not supported. If you need this data inside an "after" callback, use "cookies" outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`
          ), "__NEXT_ERROR_CODE", {
            value: "E88",
            enumerable: !1,
            configurable: !0
          });
        if (w.forceStatic) {
          const v = b();
          return E(v);
        }
        if (A) {
          if (A.type === "cache")
            throw Object.defineProperty(new Error(`Route ${w.route} used "cookies" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "cookies" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
              value: "E398",
              enumerable: !1,
              configurable: !0
            });
          if (A.type === "unstable-cache")
            throw Object.defineProperty(new Error(`Route ${w.route} used "cookies" inside a function cached with "unstable_cache(...)". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "cookies" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
              value: "E157",
              enumerable: !1,
              configurable: !0
            });
        }
        if (w.dynamicShouldError)
          throw Object.defineProperty(new i.StaticGenBailoutError(`Route ${w.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`cookies\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
            value: "E549",
            enumerable: !1,
            configurable: !0
          });
        if (A) {
          if (A.type === "prerender")
            return _(w.route, A);
          A.type === "prerender-ppr" ? (0, a.postponeWithTracking)(w.route, f, A.dynamicTracking) : A.type === "prerender-legacy" && (0, a.throwToInterruptStaticGeneration)(f, w, A);
        }
        (0, a.trackDynamicDataInDynamicRender)(w, A);
      }
      const W = (0, s.getExpectedRequestStore)(f);
      let k;
      return (0, t.areCookiesMutableInCurrentPhase)(W) ? k = W.userspaceMutableCookies : k = W.cookies, process.env.NODE_ENV === "development" && !(w != null && w.isPrefetchRequest) ? m(k, w == null ? void 0 : w.route) : E(k);
    }
    function b() {
      return t.RequestCookiesAdapter.seal(new r.RequestCookies(new Headers({})));
    }
    const S = /* @__PURE__ */ new WeakMap();
    function _(f, w) {
      const A = S.get(w);
      if (A)
        return A;
      const W = (0, o.makeHangingPromise)(w.renderSignal, "`cookies()`");
      return S.set(w, W), Object.defineProperties(W, {
        [Symbol.iterator]: {
          value: function() {
            const k = "`cookies()[Symbol.iterator]()`", v = h(f, k);
            (0, a.abortAndThrowOnSynchronousRequestDataAccess)(f, k, v, w);
          }
        },
        size: {
          get() {
            const k = "`cookies().size`", v = h(f, k);
            (0, a.abortAndThrowOnSynchronousRequestDataAccess)(f, k, v, w);
          }
        },
        get: {
          value: function() {
            let v;
            arguments.length === 0 ? v = "`cookies().get()`" : v = `\`cookies().get(${p(arguments[0])})\``;
            const L = h(f, v);
            (0, a.abortAndThrowOnSynchronousRequestDataAccess)(f, v, L, w);
          }
        },
        getAll: {
          value: function() {
            let v;
            arguments.length === 0 ? v = "`cookies().getAll()`" : v = `\`cookies().getAll(${p(arguments[0])})\``;
            const L = h(f, v);
            (0, a.abortAndThrowOnSynchronousRequestDataAccess)(f, v, L, w);
          }
        },
        has: {
          value: function() {
            let v;
            arguments.length === 0 ? v = "`cookies().has()`" : v = `\`cookies().has(${p(arguments[0])})\``;
            const L = h(f, v);
            (0, a.abortAndThrowOnSynchronousRequestDataAccess)(f, v, L, w);
          }
        },
        set: {
          value: function() {
            let v;
            if (arguments.length === 0)
              v = "`cookies().set()`";
            else {
              const le = arguments[0];
              le ? v = `\`cookies().set(${p(le)}, ...)\`` : v = "`cookies().set(...)`";
            }
            const L = h(f, v);
            (0, a.abortAndThrowOnSynchronousRequestDataAccess)(f, v, L, w);
          }
        },
        delete: {
          value: function() {
            let k;
            arguments.length === 0 ? k = "`cookies().delete()`" : arguments.length === 1 ? k = `\`cookies().delete(${p(arguments[0])})\`` : k = `\`cookies().delete(${p(arguments[0])}, ...)\``;
            const v = h(f, k);
            (0, a.abortAndThrowOnSynchronousRequestDataAccess)(f, k, v, w);
          }
        },
        clear: {
          value: function() {
            const v = "`cookies().clear()`", L = h(f, v);
            (0, a.abortAndThrowOnSynchronousRequestDataAccess)(f, v, L, w);
          }
        },
        toString: {
          value: function() {
            const v = "`cookies().toString()`", L = h(f, v);
            (0, a.abortAndThrowOnSynchronousRequestDataAccess)(f, v, L, w);
          }
        }
      }), W;
    }
    function E(f) {
      const w = S.get(f);
      if (w)
        return w;
      const A = Promise.resolve(f);
      return S.set(f, A), Object.defineProperties(A, {
        [Symbol.iterator]: {
          value: f[Symbol.iterator] ? f[Symbol.iterator].bind(f) : (
            // We should remove this and unify our cookies types. We could just let this continue to throw lazily
            // but that's already a hard thing to debug so we may as well implement it consistently. The biggest problem with
            // implementing this in this way is the underlying cookie type is a ResponseCookie and not a RequestCookie and so it
            // has extra properties not available on RequestCookie instances.
            R.bind(f)
          )
        },
        size: {
          get() {
            return f.size;
          }
        },
        get: {
          value: f.get.bind(f)
        },
        getAll: {
          value: f.getAll.bind(f)
        },
        has: {
          value: f.has.bind(f)
        },
        set: {
          value: f.set.bind(f)
        },
        delete: {
          value: f.delete.bind(f)
        },
        clear: {
          value: (
            // @ts-expect-error clear is defined in RequestCookies implementation but not in the type
            typeof f.clear == "function" ? f.clear.bind(f) : (
              // We should remove this and unify our cookies types. We could just let this continue to throw lazily
              // but that's already a hard thing to debug so we may as well implement it consistently. The biggest problem with
              // implementing this in this way is the underlying cookie type is a ResponseCookie and not a RequestCookie and so it
              // has extra properties not available on RequestCookie instances.
              U.bind(f, A)
            )
          )
        },
        toString: {
          value: f.toString.bind(f)
        }
      }), A;
    }
    function m(f, w) {
      const A = S.get(f);
      if (A)
        return A;
      const W = new Promise((k) => (0, u.scheduleImmediate)(() => k(f)));
      return S.set(f, W), Object.defineProperties(W, {
        [Symbol.iterator]: {
          value: function() {
            return l(w, "`...cookies()` or similar iteration"), f[Symbol.iterator] ? f[Symbol.iterator].apply(f, arguments) : (
              // We should remove this and unify our cookies types. We could just let this continue to throw lazily
              // but that's already a hard thing to debug so we may as well implement it consistently. The biggest problem with
              // implementing this in this way is the underlying cookie type is a ResponseCookie and not a RequestCookie and so it
              // has extra properties not available on RequestCookie instances.
              R.call(f)
            );
          },
          writable: !1
        },
        size: {
          get() {
            return l(w, "`cookies().size`"), f.size;
          }
        },
        get: {
          value: function() {
            let v;
            return arguments.length === 0 ? v = "`cookies().get()`" : v = `\`cookies().get(${p(arguments[0])})\``, l(w, v), f.get.apply(f, arguments);
          },
          writable: !1
        },
        getAll: {
          value: function() {
            let v;
            return arguments.length === 0 ? v = "`cookies().getAll()`" : v = `\`cookies().getAll(${p(arguments[0])})\``, l(w, v), f.getAll.apply(f, arguments);
          },
          writable: !1
        },
        has: {
          value: function() {
            let v;
            return arguments.length === 0 ? v = "`cookies().has()`" : v = `\`cookies().has(${p(arguments[0])})\``, l(w, v), f.has.apply(f, arguments);
          },
          writable: !1
        },
        set: {
          value: function() {
            let v;
            if (arguments.length === 0)
              v = "`cookies().set()`";
            else {
              const L = arguments[0];
              L ? v = `\`cookies().set(${p(L)}, ...)\`` : v = "`cookies().set(...)`";
            }
            return l(w, v), f.set.apply(f, arguments);
          },
          writable: !1
        },
        delete: {
          value: function() {
            let k;
            return arguments.length === 0 ? k = "`cookies().delete()`" : arguments.length === 1 ? k = `\`cookies().delete(${p(arguments[0])})\`` : k = `\`cookies().delete(${p(arguments[0])}, ...)\``, l(w, k), f.delete.apply(f, arguments);
          },
          writable: !1
        },
        clear: {
          value: function() {
            return l(w, "`cookies().clear()`"), typeof f.clear == "function" ? f.clear.apply(f, arguments) : (
              // We should remove this and unify our cookies types. We could just let this continue to throw lazily
              // but that's already a hard thing to debug so we may as well implement it consistently. The biggest problem with
              // implementing this in this way is the underlying cookie type is a ResponseCookie and not a RequestCookie and so it
              // has extra properties not available on RequestCookie instances.
              U.call(f, W)
            );
          },
          writable: !1
        },
        toString: {
          value: function() {
            return l(w, "`cookies().toString()` or implicit casting"), f.toString.apply(f, arguments);
          },
          writable: !1
        }
      }), W;
    }
    function p(f) {
      return typeof f == "object" && f !== null && typeof f.name == "string" ? `'${f.name}'` : typeof f == "string" ? `'${f}'` : "...";
    }
    function l(f, w) {
      const A = s.workUnitAsyncStorage.getStore();
      if (A && A.type === "request" && A.prerenderPhase === !0) {
        const W = A;
        (0, a.trackSynchronousRequestDataAccessInDev)(W);
      }
      c(f, w);
    }
    const c = (0, d.createDedupedByCallsiteServerErrorLoggerDev)(h);
    function h(f, w) {
      const A = f ? `Route "${f}" ` : "This route ";
      return Object.defineProperty(new Error(`${A}used ${w}. \`cookies()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", {
        value: "E223",
        enumerable: !1,
        configurable: !0
      });
    }
    function R() {
      return this.getAll().map((f) => [
        f.name,
        f
      ]).values();
    }
    function U(f) {
      for (const w of this.getAll())
        this.delete(w.name);
      return f;
    }
  }(Kt)), Kt;
}
var qt = {}, zt = {}, hn;
function Qs() {
  return hn || (hn = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(a, i) {
      for (var o in i) Object.defineProperty(a, o, {
        enumerable: !0,
        get: i[o]
      });
    }
    t(e, {
      HeadersAdapter: function() {
        return s;
      },
      ReadonlyHeadersError: function() {
        return n;
      }
    });
    const r = Er();
    class n extends Error {
      constructor() {
        super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
      }
      static callable() {
        throw new n();
      }
    }
    class s extends Headers {
      constructor(i) {
        super(), this.headers = new Proxy(i, {
          get(o, d, u) {
            if (typeof d == "symbol")
              return r.ReflectAdapter.get(o, d, u);
            const g = d.toLowerCase(), y = Object.keys(i).find((b) => b.toLowerCase() === g);
            if (!(typeof y > "u"))
              return r.ReflectAdapter.get(o, y, u);
          },
          set(o, d, u, g) {
            if (typeof d == "symbol")
              return r.ReflectAdapter.set(o, d, u, g);
            const y = d.toLowerCase(), b = Object.keys(i).find((S) => S.toLowerCase() === y);
            return r.ReflectAdapter.set(o, b ?? d, u, g);
          },
          has(o, d) {
            if (typeof d == "symbol") return r.ReflectAdapter.has(o, d);
            const u = d.toLowerCase(), g = Object.keys(i).find((y) => y.toLowerCase() === u);
            return typeof g > "u" ? !1 : r.ReflectAdapter.has(o, g);
          },
          deleteProperty(o, d) {
            if (typeof d == "symbol") return r.ReflectAdapter.deleteProperty(o, d);
            const u = d.toLowerCase(), g = Object.keys(i).find((y) => y.toLowerCase() === u);
            return typeof g > "u" ? !0 : r.ReflectAdapter.deleteProperty(o, g);
          }
        });
      }
      /**
      * Seals a Headers instance to prevent modification by throwing an error when
      * any mutating method is called.
      */
      static seal(i) {
        return new Proxy(i, {
          get(o, d, u) {
            switch (d) {
              case "append":
              case "delete":
              case "set":
                return n.callable;
              default:
                return r.ReflectAdapter.get(o, d, u);
            }
          }
        });
      }
      /**
      * Merges a header value into a string. This stores multiple values as an
      * array, so we need to merge them into a string.
      *
      * @param value a header value
      * @returns a merged header value (a string)
      */
      merge(i) {
        return Array.isArray(i) ? i.join(", ") : i;
      }
      /**
      * Creates a Headers instance from a plain object or a Headers instance.
      *
      * @param headers a plain object or a Headers instance
      * @returns a headers instance
      */
      static from(i) {
        return i instanceof Headers ? i : new s(i);
      }
      append(i, o) {
        const d = this.headers[i];
        typeof d == "string" ? this.headers[i] = [
          d,
          o
        ] : Array.isArray(d) ? d.push(o) : this.headers[i] = o;
      }
      delete(i) {
        delete this.headers[i];
      }
      get(i) {
        const o = this.headers[i];
        return typeof o < "u" ? this.merge(o) : null;
      }
      has(i) {
        return typeof this.headers[i] < "u";
      }
      set(i, o) {
        this.headers[i] = o;
      }
      forEach(i, o) {
        for (const [d, u] of this.entries())
          i.call(o, u, d, this);
      }
      *entries() {
        for (const i of Object.keys(this.headers)) {
          const o = i.toLowerCase(), d = this.get(o);
          yield [
            o,
            d
          ];
        }
      }
      *keys() {
        for (const i of Object.keys(this.headers))
          yield i.toLowerCase();
      }
      *values() {
        for (const i of Object.keys(this.headers))
          yield this.get(i);
      }
      [Symbol.iterator]() {
        return this.entries();
      }
    }
  }(zt)), zt;
}
var fn;
function ea() {
  return fn || (fn = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "headers", {
      enumerable: !0,
      get: function() {
        return g;
      }
    });
    const t = Qs(), r = Re(), n = He(), s = Ye(), a = Xe(), i = At(), o = Ar(), d = zn(), u = vr();
    function g() {
      const c = r.workAsyncStorage.getStore(), h = n.workUnitAsyncStorage.getStore();
      if (c) {
        if (h && h.phase === "after" && !(0, u.isRequestAPICallableInsideAfter)())
          throw Object.defineProperty(new Error(`Route ${c.route} used "headers" inside "after(...)". This is not supported. If you need this data inside an "after" callback, use "headers" outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", {
            value: "E367",
            enumerable: !1,
            configurable: !0
          });
        if (c.forceStatic) {
          const U = t.HeadersAdapter.seal(new Headers({}));
          return S(U);
        }
        if (h) {
          if (h.type === "cache")
            throw Object.defineProperty(new Error(`Route ${c.route} used "headers" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
              value: "E304",
              enumerable: !1,
              configurable: !0
            });
          if (h.type === "unstable-cache")
            throw Object.defineProperty(new Error(`Route ${c.route} used "headers" inside a function cached with "unstable_cache(...)". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
              value: "E127",
              enumerable: !1,
              configurable: !0
            });
        }
        if (c.dynamicShouldError)
          throw Object.defineProperty(new a.StaticGenBailoutError(`Route ${c.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`headers\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
            value: "E525",
            enumerable: !1,
            configurable: !0
          });
        if (h) {
          if (h.type === "prerender")
            return b(c.route, h);
          h.type === "prerender-ppr" ? (0, s.postponeWithTracking)(c.route, "headers", h.dynamicTracking) : h.type === "prerender-legacy" && (0, s.throwToInterruptStaticGeneration)("headers", c, h);
        }
        (0, s.trackDynamicDataInDynamicRender)(c, h);
      }
      const R = (0, n.getExpectedRequestStore)("headers");
      return process.env.NODE_ENV === "development" && !(c != null && c.isPrefetchRequest) ? _(R.headers, c == null ? void 0 : c.route) : S(R.headers);
    }
    const y = /* @__PURE__ */ new WeakMap();
    function b(c, h) {
      const R = y.get(h);
      if (R)
        return R;
      const U = (0, i.makeHangingPromise)(h.renderSignal, "`headers()`");
      return y.set(h, U), Object.defineProperties(U, {
        append: {
          value: function() {
            const w = `\`headers().append(${E(arguments[0])}, ...)\``, A = l(c, w);
            (0, s.abortAndThrowOnSynchronousRequestDataAccess)(c, w, A, h);
          }
        },
        delete: {
          value: function() {
            const w = `\`headers().delete(${E(arguments[0])})\``, A = l(c, w);
            (0, s.abortAndThrowOnSynchronousRequestDataAccess)(c, w, A, h);
          }
        },
        get: {
          value: function() {
            const w = `\`headers().get(${E(arguments[0])})\``, A = l(c, w);
            (0, s.abortAndThrowOnSynchronousRequestDataAccess)(c, w, A, h);
          }
        },
        has: {
          value: function() {
            const w = `\`headers().has(${E(arguments[0])})\``, A = l(c, w);
            (0, s.abortAndThrowOnSynchronousRequestDataAccess)(c, w, A, h);
          }
        },
        set: {
          value: function() {
            const w = `\`headers().set(${E(arguments[0])}, ...)\``, A = l(c, w);
            (0, s.abortAndThrowOnSynchronousRequestDataAccess)(c, w, A, h);
          }
        },
        getSetCookie: {
          value: function() {
            const w = "`headers().getSetCookie()`", A = l(c, w);
            (0, s.abortAndThrowOnSynchronousRequestDataAccess)(c, w, A, h);
          }
        },
        forEach: {
          value: function() {
            const w = "`headers().forEach(...)`", A = l(c, w);
            (0, s.abortAndThrowOnSynchronousRequestDataAccess)(c, w, A, h);
          }
        },
        keys: {
          value: function() {
            const w = "`headers().keys()`", A = l(c, w);
            (0, s.abortAndThrowOnSynchronousRequestDataAccess)(c, w, A, h);
          }
        },
        values: {
          value: function() {
            const w = "`headers().values()`", A = l(c, w);
            (0, s.abortAndThrowOnSynchronousRequestDataAccess)(c, w, A, h);
          }
        },
        entries: {
          value: function() {
            const w = "`headers().entries()`", A = l(c, w);
            (0, s.abortAndThrowOnSynchronousRequestDataAccess)(c, w, A, h);
          }
        },
        [Symbol.iterator]: {
          value: function() {
            const f = "`headers()[Symbol.iterator]()`", w = l(c, f);
            (0, s.abortAndThrowOnSynchronousRequestDataAccess)(c, f, w, h);
          }
        }
      }), U;
    }
    function S(c) {
      const h = y.get(c);
      if (h)
        return h;
      const R = Promise.resolve(c);
      return y.set(c, R), Object.defineProperties(R, {
        append: {
          value: c.append.bind(c)
        },
        delete: {
          value: c.delete.bind(c)
        },
        get: {
          value: c.get.bind(c)
        },
        has: {
          value: c.has.bind(c)
        },
        set: {
          value: c.set.bind(c)
        },
        getSetCookie: {
          value: c.getSetCookie.bind(c)
        },
        forEach: {
          value: c.forEach.bind(c)
        },
        keys: {
          value: c.keys.bind(c)
        },
        values: {
          value: c.values.bind(c)
        },
        entries: {
          value: c.entries.bind(c)
        },
        [Symbol.iterator]: {
          value: c[Symbol.iterator].bind(c)
        }
      }), R;
    }
    function _(c, h) {
      const R = y.get(c);
      if (R)
        return R;
      const U = new Promise((f) => (0, d.scheduleImmediate)(() => f(c)));
      return y.set(c, U), Object.defineProperties(U, {
        append: {
          value: function() {
            const w = `\`headers().append(${E(arguments[0])}, ...)\``;
            return m(h, w), c.append.apply(c, arguments);
          }
        },
        delete: {
          value: function() {
            const w = `\`headers().delete(${E(arguments[0])})\``;
            return m(h, w), c.delete.apply(c, arguments);
          }
        },
        get: {
          value: function() {
            const w = `\`headers().get(${E(arguments[0])})\``;
            return m(h, w), c.get.apply(c, arguments);
          }
        },
        has: {
          value: function() {
            const w = `\`headers().has(${E(arguments[0])})\``;
            return m(h, w), c.has.apply(c, arguments);
          }
        },
        set: {
          value: function() {
            const w = `\`headers().set(${E(arguments[0])}, ...)\``;
            return m(h, w), c.set.apply(c, arguments);
          }
        },
        getSetCookie: {
          value: function() {
            return m(h, "`headers().getSetCookie()`"), c.getSetCookie.apply(c, arguments);
          }
        },
        forEach: {
          value: function() {
            return m(h, "`headers().forEach(...)`"), c.forEach.apply(c, arguments);
          }
        },
        keys: {
          value: function() {
            return m(h, "`headers().keys()`"), c.keys.apply(c, arguments);
          }
        },
        values: {
          value: function() {
            return m(h, "`headers().values()`"), c.values.apply(c, arguments);
          }
        },
        entries: {
          value: function() {
            return m(h, "`headers().entries()`"), c.entries.apply(c, arguments);
          }
        },
        [Symbol.iterator]: {
          value: function() {
            return m(h, "`...headers()` or similar iteration"), c[Symbol.iterator].apply(c, arguments);
          }
        }
      }), U;
    }
    function E(c) {
      return typeof c == "string" ? `'${c}'` : "...";
    }
    function m(c, h) {
      const R = n.workUnitAsyncStorage.getStore();
      if (R && R.type === "request" && R.prerenderPhase === !0) {
        const U = R;
        (0, s.trackSynchronousRequestDataAccessInDev)(U);
      }
      p(c, h);
    }
    const p = (0, o.createDedupedByCallsiteServerErrorLoggerDev)(l);
    function l(c, h) {
      const R = c ? `Route "${c}" ` : "This route ";
      return Object.defineProperty(new Error(`${R}used ${h}. \`headers()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", {
        value: "E277",
        enumerable: !1,
        configurable: !0
      });
    }
  }(qt)), qt;
}
var Bt = {}, pn;
function ta() {
  return pn || (pn = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "draftMode", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const t = He(), r = Re(), n = Ye(), s = Ar(), a = Xe(), i = Ls();
    function o() {
      const p = "draftMode", l = r.workAsyncStorage.getStore(), c = t.workUnitAsyncStorage.getStore();
      switch ((!l || !c) && (0, t.throwForMissingRequestStore)(p), c.type) {
        case "request":
          return d(c.draftMode, l);
        case "cache":
        case "unstable-cache":
          const h = (0, t.getDraftModeProviderForCacheScope)(l, c);
          if (h)
            return d(h, l);
        // Otherwise, we fall through to providing an empty draft mode.
        // eslint-disable-next-line no-fallthrough
        case "prerender":
        case "prerender-ppr":
        case "prerender-legacy":
          if (process.env.NODE_ENV === "development" && !(l != null && l.isPrefetchRequest)) {
            const U = l == null ? void 0 : l.route;
            return y(null, U);
          } else
            return g(null);
        default:
          return c;
      }
    }
    function d(p, l) {
      const c = u.get(o);
      if (c)
        return c;
      let h;
      if (process.env.NODE_ENV === "development" && !(l != null && l.isPrefetchRequest)) {
        const R = l == null ? void 0 : l.route;
        h = y(p, R);
      } else
        h = g(p);
      return u.set(p, h), h;
    }
    const u = /* @__PURE__ */ new WeakMap();
    function g(p) {
      const l = new b(p), c = Promise.resolve(l);
      return Object.defineProperty(c, "isEnabled", {
        get() {
          return l.isEnabled;
        },
        set(h) {
          Object.defineProperty(c, "isEnabled", {
            value: h,
            writable: !0,
            enumerable: !0
          });
        },
        enumerable: !0,
        configurable: !0
      }), c.enable = l.enable.bind(l), c.disable = l.disable.bind(l), c;
    }
    function y(p, l) {
      const c = new b(p), h = Promise.resolve(c);
      return Object.defineProperty(h, "isEnabled", {
        get() {
          return S(l, "`draftMode().isEnabled`"), c.isEnabled;
        },
        set(R) {
          Object.defineProperty(h, "isEnabled", {
            value: R,
            writable: !0,
            enumerable: !0
          });
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(h, "enable", {
        value: function() {
          return S(l, "`draftMode().enable()`"), c.enable.apply(c, arguments);
        }
      }), Object.defineProperty(h, "disable", {
        value: function() {
          return S(l, "`draftMode().disable()`"), c.disable.apply(c, arguments);
        }
      }), h;
    }
    class b {
      constructor(l) {
        this._provider = l;
      }
      get isEnabled() {
        return this._provider !== null ? this._provider.isEnabled : !1;
      }
      enable() {
        m("draftMode().enable()"), this._provider !== null && this._provider.enable();
      }
      disable() {
        m("draftMode().disable()"), this._provider !== null && this._provider.disable();
      }
    }
    function S(p, l) {
      const c = t.workUnitAsyncStorage.getStore();
      if (c && c.type === "request" && c.prerenderPhase === !0) {
        const h = c;
        (0, n.trackSynchronousRequestDataAccessInDev)(h);
      }
      _(p, l);
    }
    const _ = (0, s.createDedupedByCallsiteServerErrorLoggerDev)(E);
    function E(p, l) {
      const c = p ? `Route "${p}" ` : "This route ";
      return Object.defineProperty(new Error(`${c}used ${l}. \`draftMode()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", {
        value: "E377",
        enumerable: !1,
        configurable: !0
      });
    }
    function m(p) {
      const l = r.workAsyncStorage.getStore(), c = t.workUnitAsyncStorage.getStore();
      if (l) {
        if (c) {
          if (c.type === "cache")
            throw Object.defineProperty(new Error(`Route ${l.route} used "${p}" inside "use cache". The enabled status of draftMode can be read in caches but you must not enable or disable draftMode inside a cache. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
              value: "E246",
              enumerable: !1,
              configurable: !0
            });
          if (c.type === "unstable-cache")
            throw Object.defineProperty(new Error(`Route ${l.route} used "${p}" inside a function cached with "unstable_cache(...)". The enabled status of draftMode can be read in caches but you must not enable or disable draftMode inside a cache. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
              value: "E259",
              enumerable: !1,
              configurable: !0
            });
          if (c.phase === "after")
            throw Object.defineProperty(new Error(`Route ${l.route} used "${p}" inside \`after\`. The enabled status of draftMode can be read inside \`after\` but you cannot enable or disable draftMode. See more info here: https://nextjs.org/docs/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", {
              value: "E348",
              enumerable: !1,
              configurable: !0
            });
        }
        if (l.dynamicShouldError)
          throw Object.defineProperty(new a.StaticGenBailoutError(`Route ${l.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${p}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
            value: "E553",
            enumerable: !1,
            configurable: !0
          });
        if (c)
          if (c.type === "prerender") {
            const h = Object.defineProperty(new Error(`Route ${l.route} used ${p} without first calling \`await connection()\`. See more info here: https://nextjs.org/docs/messages/next-prerender-sync-headers`), "__NEXT_ERROR_CODE", {
              value: "E126",
              enumerable: !1,
              configurable: !0
            });
            (0, n.abortAndThrowOnSynchronousRequestDataAccess)(l.route, p, h, c);
          } else if (c.type === "prerender-ppr")
            (0, n.postponeWithTracking)(l.route, p, c.dynamicTracking);
          else if (c.type === "prerender-legacy") {
            c.revalidate = 0;
            const h = Object.defineProperty(new i.DynamicServerError(`Route ${l.route} couldn't be rendered statically because it used \`${p}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
              value: "E558",
              enumerable: !1,
              configurable: !0
            });
            throw l.dynamicUsageDescription = p, l.dynamicUsageStack = h.stack, h;
          } else process.env.NODE_ENV === "development" && c && c.type === "request" && (c.usedDynamic = !0);
      }
    }
  }(Bt)), Bt;
}
var mn;
function ra() {
  return mn || (mn = 1, qe.cookies = Zs().cookies, qe.headers = ea().headers, qe.draftMode = ta().draftMode), qe;
}
var ze = ra(), it = { exports: {} }, jt = {}, wn;
function na() {
  return wn || (wn = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "NextResponse", {
      enumerable: !0,
      get: function() {
        return u;
      }
    });
    const t = ht(), r = qs(), n = zs(), s = Er(), a = ht(), i = Symbol("internal response"), o = /* @__PURE__ */ new Set([
      301,
      302,
      303,
      307,
      308
    ]);
    function d(g, y) {
      var b;
      if (!(g == null || (b = g.request) == null) && b.headers) {
        if (!(g.request.headers instanceof Headers))
          throw Object.defineProperty(new Error("request.headers must be an instance of Headers"), "__NEXT_ERROR_CODE", {
            value: "E119",
            enumerable: !1,
            configurable: !0
          });
        const S = [];
        for (const [_, E] of g.request.headers)
          y.set("x-middleware-request-" + _, E), S.push(_);
        y.set("x-middleware-override-headers", S.join(","));
      }
    }
    class u extends Response {
      constructor(y, b = {}) {
        super(y, b);
        const S = this.headers, _ = new a.ResponseCookies(S), E = new Proxy(_, {
          get(m, p, l) {
            switch (p) {
              case "delete":
              case "set":
                return (...c) => {
                  const h = Reflect.apply(m[p], m, c), R = new Headers(S);
                  return h instanceof a.ResponseCookies && S.set("x-middleware-set-cookie", h.getAll().map((U) => (0, t.stringifyCookie)(U)).join(",")), d(b, R), h;
                };
              default:
                return s.ReflectAdapter.get(m, p, l);
            }
          }
        });
        this[i] = {
          cookies: E,
          url: b.url ? new r.NextURL(b.url, {
            headers: (0, n.toNodeOutgoingHttpHeaders)(S),
            nextConfig: b.nextConfig
          }) : void 0
        };
      }
      [Symbol.for("edge-runtime.inspect.custom")]() {
        return {
          cookies: this.cookies,
          url: this.url,
          // rest of props come from Response
          body: this.body,
          bodyUsed: this.bodyUsed,
          headers: Object.fromEntries(this.headers),
          ok: this.ok,
          redirected: this.redirected,
          status: this.status,
          statusText: this.statusText,
          type: this.type
        };
      }
      get cookies() {
        return this[i].cookies;
      }
      static json(y, b) {
        const S = Response.json(y, b);
        return new u(S.body, S);
      }
      static redirect(y, b) {
        const S = typeof b == "number" ? b : (b == null ? void 0 : b.status) ?? 307;
        if (!o.has(S))
          throw Object.defineProperty(new RangeError('Failed to execute "redirect" on "response": Invalid status code'), "__NEXT_ERROR_CODE", {
            value: "E529",
            enumerable: !1,
            configurable: !0
          });
        const _ = typeof b == "object" ? b : {}, E = new Headers(_ == null ? void 0 : _.headers);
        return E.set("Location", (0, n.validateURL)(y)), new u(null, {
          ..._,
          headers: E,
          status: S
        });
      }
      static rewrite(y, b) {
        const S = new Headers(b == null ? void 0 : b.headers);
        return S.set("x-middleware-rewrite", (0, n.validateURL)(y)), d(b, S), new u(null, {
          ...b,
          headers: S
        });
      }
      static next(y) {
        const b = new Headers(y == null ? void 0 : y.headers);
        return b.set("x-middleware-next", "1"), d(y, b), new u(null, {
          ...y,
          headers: b
        });
      }
    }
  }(jt)), jt;
}
var Gt = {}, yn;
function sa() {
  return yn || (yn = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "ImageResponse", {
      enumerable: !0,
      get: function() {
        return t;
      }
    });
    function t() {
      throw Object.defineProperty(new Error('ImageResponse moved from "next/server" to "next/og" since Next.js 14, please import from "next/og" instead'), "__NEXT_ERROR_CODE", {
        value: "E183",
        enumerable: !1,
        configurable: !0
      });
    }
  }(Gt)), Gt;
}
var Ft = {}, Vt = { exports: {} }, gn;
function aa() {
  return gn || (gn = 1, (() => {
    var e = { 226: function(s, a) {
      (function(i, o) {
        var d = "1.0.35", u = "", g = "?", y = "function", b = "undefined", S = "object", _ = "string", E = "major", m = "model", p = "name", l = "type", c = "vendor", h = "version", R = "architecture", U = "console", f = "mobile", w = "tablet", A = "smarttv", W = "wearable", k = "embedded", v = 350, L = "Amazon", le = "Apple", jr = "ASUS", Gr = "BlackBerry", Pe = "Browser", Qe = "Chrome", Us = "Edge", et = "Firefox", tt = "Google", Fr = "Huawei", xt = "LG", Pt = "Microsoft", Vr = "Motorola", rt = "Opera", Ct = "Samsung", Xr = "Sharp", nt = "Sony", Ot = "Xiaomi", It = "Zebra", Yr = "Facebook", Zr = "Chromium OS", Qr = "Mac OS", Ks = function(I, K) {
          var C = {};
          for (var H in I)
            K[H] && K[H].length % 2 === 0 ? C[H] = K[H].concat(I[H]) : C[H] = I[H];
          return C;
        }, st = function(I) {
          for (var K = {}, C = 0; C < I.length; C++)
            K[I[C].toUpperCase()] = I[C];
          return K;
        }, en = function(I, K) {
          return typeof I === _ ? Je(K).indexOf(Je(I)) !== -1 : !1;
        }, Je = function(I) {
          return I.toLowerCase();
        }, Ws = function(I) {
          return typeof I === _ ? I.replace(/[^\d\.]/g, u).split(".")[0] : o;
        }, Nt = function(I, K) {
          if (typeof I === _)
            return I = I.replace(/^\s\s*/, u), typeof K === b ? I : I.substring(0, v);
        }, Le = function(I, K) {
          for (var C = 0, H, he, oe, D, P, ce; C < K.length && !P; ) {
            var Ut = K[C], nn = K[C + 1];
            for (H = he = 0; H < Ut.length && !P && Ut[H]; )
              if (P = Ut[H++].exec(I), P)
                for (oe = 0; oe < nn.length; oe++)
                  ce = P[++he], D = nn[oe], typeof D === S && D.length > 0 ? D.length === 2 ? typeof D[1] == y ? this[D[0]] = D[1].call(this, ce) : this[D[0]] = D[1] : D.length === 3 ? typeof D[1] === y && !(D[1].exec && D[1].test) ? this[D[0]] = ce ? D[1].call(this, ce, D[2]) : o : this[D[0]] = ce ? ce.replace(D[1], D[2]) : o : D.length === 4 && (this[D[0]] = ce ? D[3].call(this, ce.replace(D[1], D[2])) : o) : this[D] = ce || o;
            C += 2;
          }
        }, Dt = function(I, K) {
          for (var C in K)
            if (typeof K[C] === S && K[C].length > 0) {
              for (var H = 0; H < K[C].length; H++)
                if (en(K[C][H], I))
                  return C === g ? o : C;
            } else if (en(K[C], I))
              return C === g ? o : C;
          return I;
        }, Ms = { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }, tn = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, rn = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [h, [p, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [h, [p, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [p, h], [/opios[\/ ]+([\w\.]+)/i], [h, [p, rt + " Mini"]], [/\bopr\/([\w\.]+)/i], [h, [p, rt]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [p, h], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [h, [p, "UC" + Pe]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [h, [p, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [h, [p, "WeChat"]], [/konqueror\/([\w\.]+)/i], [h, [p, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [h, [p, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [h, [p, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[p, /(.+)/, "$1 Secure " + Pe], h], [/\bfocus\/([\w\.]+)/i], [h, [p, et + " Focus"]], [/\bopt\/([\w\.]+)/i], [h, [p, rt + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [h, [p, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [h, [p, "Dolphin"]], [/coast\/([\w\.]+)/i], [h, [p, rt + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [h, [p, "MIUI " + Pe]], [/fxios\/([-\w\.]+)/i], [h, [p, et]], [/\bqihu|(qi?ho?o?|360)browser/i], [[p, "360 " + Pe]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[p, /(.+)/, "$1 " + Pe], h], [/(comodo_dragon)\/([\w\.]+)/i], [[p, /_/g, " "], h], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [p, h], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [p], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[p, Yr], h], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [p, h], [/\bgsa\/([\w\.]+) .*safari\//i], [h, [p, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [h, [p, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [h, [p, Qe + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[p, Qe + " WebView"], h], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [h, [p, "Android " + Pe]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [p, h], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [h, [p, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [h, p], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [p, [h, Dt, Ms]], [/(webkit|khtml)\/([\w\.]+)/i], [p, h], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[p, "Netscape"], h], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [h, [p, et + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [p, h], [/(cobalt)\/([\w\.]+)/i], [p, [h, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[R, "amd64"]], [/(ia32(?=;))/i], [[R, Je]], [/((?:i[346]|x)86)[;\)]/i], [[R, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[R, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[R, "armhf"]], [/windows (ce|mobile); ppc;/i], [[R, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[R, /ower/, u, Je]], [/(sun4\w)[;\)]/i], [[R, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[R, Je]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [m, [c, Ct], [l, w]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [m, [c, Ct], [l, f]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [m, [c, le], [l, f]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [m, [c, le], [l, w]], [/(macintosh);/i], [m, [c, le]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [m, [c, Xr], [l, f]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [m, [c, Fr], [l, w]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [m, [c, Fr], [l, f]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[m, /_/g, " "], [c, Ot], [l, f]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[m, /_/g, " "], [c, Ot], [l, w]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [m, [c, "OPPO"], [l, f]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [m, [c, "Vivo"], [l, f]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [m, [c, "Realme"], [l, f]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [m, [c, Vr], [l, f]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [m, [c, Vr], [l, w]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [m, [c, xt], [l, w]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [m, [c, xt], [l, f]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [m, [c, "Lenovo"], [l, w]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[m, /_/g, " "], [c, "Nokia"], [l, f]], [/(pixel c)\b/i], [m, [c, tt], [l, w]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [m, [c, tt], [l, f]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [m, [c, nt], [l, f]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[m, "Xperia Tablet"], [c, nt], [l, w]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [m, [c, "OnePlus"], [l, f]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [m, [c, L], [l, w]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[m, /(.+)/g, "Fire Phone $1"], [c, L], [l, f]], [/(playbook);[-\w\),; ]+(rim)/i], [m, c, [l, w]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [m, [c, Gr], [l, f]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [m, [c, jr], [l, w]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [m, [c, jr], [l, f]], [/(nexus 9)/i], [m, [c, "HTC"], [l, w]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [c, [m, /_/g, " "], [l, f]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [m, [c, "Acer"], [l, w]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [m, [c, "Meizu"], [l, f]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [c, m, [l, f]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [c, m, [l, w]], [/(surface duo)/i], [m, [c, Pt], [l, w]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [m, [c, "Fairphone"], [l, f]], [/(u304aa)/i], [m, [c, "AT&T"], [l, f]], [/\bsie-(\w*)/i], [m, [c, "Siemens"], [l, f]], [/\b(rct\w+) b/i], [m, [c, "RCA"], [l, w]], [/\b(venue[\d ]{2,7}) b/i], [m, [c, "Dell"], [l, w]], [/\b(q(?:mv|ta)\w+) b/i], [m, [c, "Verizon"], [l, w]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [m, [c, "Barnes & Noble"], [l, w]], [/\b(tm\d{3}\w+) b/i], [m, [c, "NuVision"], [l, w]], [/\b(k88) b/i], [m, [c, "ZTE"], [l, w]], [/\b(nx\d{3}j) b/i], [m, [c, "ZTE"], [l, f]], [/\b(gen\d{3}) b.+49h/i], [m, [c, "Swiss"], [l, f]], [/\b(zur\d{3}) b/i], [m, [c, "Swiss"], [l, w]], [/\b((zeki)?tb.*\b) b/i], [m, [c, "Zeki"], [l, w]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[c, "Dragon Touch"], m, [l, w]], [/\b(ns-?\w{0,9}) b/i], [m, [c, "Insignia"], [l, w]], [/\b((nxa|next)-?\w{0,9}) b/i], [m, [c, "NextBook"], [l, w]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[c, "Voice"], m, [l, f]], [/\b(lvtel\-)?(v1[12]) b/i], [[c, "LvTel"], m, [l, f]], [/\b(ph-1) /i], [m, [c, "Essential"], [l, f]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [m, [c, "Envizen"], [l, w]], [/\b(trio[-\w\. ]+) b/i], [m, [c, "MachSpeed"], [l, w]], [/\btu_(1491) b/i], [m, [c, "Rotor"], [l, w]], [/(shield[\w ]+) b/i], [m, [c, "Nvidia"], [l, w]], [/(sprint) (\w+)/i], [c, m, [l, f]], [/(kin\.[onetw]{3})/i], [[m, /\./g, " "], [c, Pt], [l, f]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [m, [c, It], [l, w]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [m, [c, It], [l, f]], [/smart-tv.+(samsung)/i], [c, [l, A]], [/hbbtv.+maple;(\d+)/i], [[m, /^/, "SmartTV"], [c, Ct], [l, A]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[c, xt], [l, A]], [/(apple) ?tv/i], [c, [m, le + " TV"], [l, A]], [/crkey/i], [[m, Qe + "cast"], [c, tt], [l, A]], [/droid.+aft(\w)( bui|\))/i], [m, [c, L], [l, A]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [m, [c, Xr], [l, A]], [/(bravia[\w ]+)( bui|\))/i], [m, [c, nt], [l, A]], [/(mitv-\w{5}) bui/i], [m, [c, Ot], [l, A]], [/Hbbtv.*(technisat) (.*);/i], [c, m, [l, A]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[c, Nt], [m, Nt], [l, A]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[l, A]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [c, m, [l, U]], [/droid.+; (shield) bui/i], [m, [c, "Nvidia"], [l, U]], [/(playstation [345portablevi]+)/i], [m, [c, nt], [l, U]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [m, [c, Pt], [l, U]], [/((pebble))app/i], [c, m, [l, W]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [m, [c, le], [l, W]], [/droid.+; (glass) \d/i], [m, [c, tt], [l, W]], [/droid.+; (wt63?0{2,3})\)/i], [m, [c, It], [l, W]], [/(quest( 2| pro)?)/i], [m, [c, Yr], [l, W]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [c, [l, k]], [/(aeobc)\b/i], [m, [c, L], [l, k]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [m, [l, f]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [m, [l, w]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[l, w]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[l, f]], [/(android[-\w\. ]{0,9});.+buil/i], [m, [c, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [h, [p, Us + "HTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [h, [p, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [p, h], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [h, p]], os: [[/microsoft (windows) (vista|xp)/i], [p, h], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [p, [h, Dt, tn]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[p, "Windows"], [h, Dt, tn]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[h, /_/g, "."], [p, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[p, Qr], [h, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [h, p], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [p, h], [/\(bb(10);/i], [h, [p, Gr]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [h, [p, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [h, [p, et + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [h, [p, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [h, [p, "watchOS"]], [/crkey\/([\d\.]+)/i], [h, [p, Qe + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[p, Zr], h], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [p, h], [/(sunos) ?([\w\.\d]*)/i], [[p, "Solaris"], h], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [p, h]] }, ne = function(I, K) {
          if (typeof I === S && (K = I, I = o), !(this instanceof ne))
            return new ne(I, K).getResult();
          var C = typeof i !== b && i.navigator ? i.navigator : o, H = I || (C && C.userAgent ? C.userAgent : u), he = C && C.userAgentData ? C.userAgentData : o, oe = K ? Ks(rn, K) : rn, D = C && C.userAgent == H;
          return this.getBrowser = function() {
            var P = {};
            return P[p] = o, P[h] = o, Le.call(P, H, oe.browser), P[E] = Ws(P[h]), D && C && C.brave && typeof C.brave.isBrave == y && (P[p] = "Brave"), P;
          }, this.getCPU = function() {
            var P = {};
            return P[R] = o, Le.call(P, H, oe.cpu), P;
          }, this.getDevice = function() {
            var P = {};
            return P[c] = o, P[m] = o, P[l] = o, Le.call(P, H, oe.device), D && !P[l] && he && he.mobile && (P[l] = f), D && P[m] == "Macintosh" && C && typeof C.standalone !== b && C.maxTouchPoints && C.maxTouchPoints > 2 && (P[m] = "iPad", P[l] = w), P;
          }, this.getEngine = function() {
            var P = {};
            return P[p] = o, P[h] = o, Le.call(P, H, oe.engine), P;
          }, this.getOS = function() {
            var P = {};
            return P[p] = o, P[h] = o, Le.call(P, H, oe.os), D && !P[p] && he && he.platform != "Unknown" && (P[p] = he.platform.replace(/chrome os/i, Zr).replace(/macos/i, Qr)), P;
          }, this.getResult = function() {
            return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
          }, this.getUA = function() {
            return H;
          }, this.setUA = function(P) {
            return H = typeof P === _ && P.length > v ? Nt(P, v) : P, this;
          }, this.setUA(H), this;
        };
        ne.VERSION = d, ne.BROWSER = st([p, h, E]), ne.CPU = st([R]), ne.DEVICE = st([m, c, l, U, f, A, w, W, k]), ne.ENGINE = ne.OS = st([p, h]), typeof a !== b ? (s.exports && (a = s.exports = ne), a.UAParser = ne) : typeof i !== b && (i.UAParser = ne);
        var Ce = typeof i !== b && (i.jQuery || i.Zepto);
        if (Ce && !Ce.ua) {
          var at = new ne();
          Ce.ua = at.getResult(), Ce.ua.get = function() {
            return at.getUA();
          }, Ce.ua.set = function(I) {
            at.setUA(I);
            var K = at.getResult();
            for (var C in K)
              Ce.ua[C] = K[C];
          };
        }
      })(typeof window == "object" ? window : this);
    } }, t = {};
    function r(s) {
      var a = t[s];
      if (a !== void 0)
        return a.exports;
      var i = t[s] = { exports: {} }, o = !0;
      try {
        e[s].call(i.exports, i, i.exports, r), o = !1;
      } finally {
        o && delete t[s];
      }
      return i.exports;
    }
    typeof r < "u" && (r.ab = __dirname + "/");
    var n = r(226);
    Vt.exports = n;
  })()), Vt.exports;
}
var bn;
function Sn() {
  return bn || (bn = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(o, d) {
      for (var u in d) Object.defineProperty(o, u, {
        enumerable: !0,
        get: d[u]
      });
    }
    t(e, {
      isBot: function() {
        return s;
      },
      userAgent: function() {
        return i;
      },
      userAgentFromString: function() {
        return a;
      }
    });
    const r = /* @__PURE__ */ n(aa());
    function n(o) {
      return o && o.__esModule ? o : {
        default: o
      };
    }
    function s(o) {
      return /Googlebot|Mediapartners-Google|AdsBot-Google|googleweblight|Storebot-Google|Google-PageRenderer|Google-InspectionTool|Bingbot|BingPreview|Slurp|DuckDuckBot|baiduspider|yandex|sogou|LinkedInBot|bitlybot|tumblr|vkShare|quora link preview|facebookexternalhit|facebookcatalog|Twitterbot|applebot|redditbot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|ia_archiver/i.test(o);
    }
    function a(o) {
      return {
        ...(0, r.default)(o),
        isBot: o === void 0 ? !1 : s(o)
      };
    }
    function i({ headers: o }) {
      return a(o.get("user-agent") || void 0);
    }
  }(Ft)), Ft;
}
var Xt = {}, _n;
function ia() {
  return _n || (_n = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "URLPattern", {
      enumerable: !0,
      get: function() {
        return t;
      }
    });
    const t = (
      // @ts-expect-error: URLPattern is not available in Node.js
      typeof URLPattern > "u" ? void 0 : URLPattern
    );
  }(Xt)), Xt;
}
var Yt = {}, Zt = {}, En;
function oa() {
  return En || (En = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "after", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const t = Re();
    function r(n) {
      const s = t.workAsyncStorage.getStore();
      if (!s)
        throw Object.defineProperty(new Error("`after` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context"), "__NEXT_ERROR_CODE", {
          value: "E468",
          enumerable: !1,
          configurable: !0
        });
      const { afterContext: a } = s;
      return a.after(n);
    }
  }(Zt)), Zt;
}
var An;
function ca() {
  return An || (An = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), t(oa(), e);
    function t(r, n) {
      return Object.keys(r).forEach(function(s) {
        s !== "default" && !Object.prototype.hasOwnProperty.call(n, s) && Object.defineProperty(n, s, {
          enumerable: !0,
          get: function() {
            return r[s];
          }
        });
      }), r;
    }
  }(Yt)), Yt;
}
var Qt = {}, vn;
function ua() {
  return vn || (vn = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "connection", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const t = Re(), r = He(), n = Ye(), s = Xe(), a = At(), i = vr();
    function o() {
      const d = t.workAsyncStorage.getStore(), u = r.workUnitAsyncStorage.getStore();
      if (d) {
        if (u && u.phase === "after" && !(0, i.isRequestAPICallableInsideAfter)())
          throw Object.defineProperty(new Error(`Route ${d.route} used "connection" inside "after(...)". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but "after(...)" executes after the request, so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", {
            value: "E186",
            enumerable: !1,
            configurable: !0
          });
        if (d.forceStatic)
          return Promise.resolve(void 0);
        if (u) {
          if (u.type === "cache")
            throw Object.defineProperty(new Error(`Route ${d.route} used "connection" inside "use cache". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but caches must be able to be produced before a Request so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
              value: "E111",
              enumerable: !1,
              configurable: !0
            });
          if (u.type === "unstable-cache")
            throw Object.defineProperty(new Error(`Route ${d.route} used "connection" inside a function cached with "unstable_cache(...)". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but caches must be able to be produced before a Request so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
              value: "E1",
              enumerable: !1,
              configurable: !0
            });
        }
        if (d.dynamicShouldError)
          throw Object.defineProperty(new s.StaticGenBailoutError(`Route ${d.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`connection\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
            value: "E562",
            enumerable: !1,
            configurable: !0
          });
        if (u) {
          if (u.type === "prerender")
            return (0, a.makeHangingPromise)(u.renderSignal, "`connection()`");
          u.type === "prerender-ppr" ? (0, n.postponeWithTracking)(d.route, "connection", u.dynamicTracking) : u.type === "prerender-legacy" && (0, n.throwToInterruptStaticGeneration)("connection", d, u);
        }
        (0, n.trackDynamicDataInDynamicRender)(d, u);
      }
      return Promise.resolve(void 0);
    }
  }(Qt)), Qt;
}
var er = {}, tr = {}, Rn;
function da() {
  return Rn || (Rn = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(i, o) {
      for (var d in o) Object.defineProperty(i, d, {
        enumerable: !0,
        get: o[d]
      });
    }
    t(e, {
      describeHasCheckingStringProperty: function() {
        return s;
      },
      describeStringPropertyAccess: function() {
        return n;
      },
      wellKnownProperties: function() {
        return a;
      }
    });
    const r = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
    function n(i, o) {
      return r.test(o) ? "`" + i + "." + o + "`" : "`" + i + "[" + JSON.stringify(o) + "]`";
    }
    function s(i, o) {
      const d = JSON.stringify(o);
      return "`Reflect.has(" + i + ", " + d + ")`, `" + d + " in " + i + "`, or similar";
    }
    const a = /* @__PURE__ */ new Set([
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "toString",
      "valueOf",
      "toLocaleString",
      // Promise prototype
      // fallthrough
      "then",
      "catch",
      "finally",
      // React Promise extension
      // fallthrough
      "status",
      // React introspection
      "displayName",
      // Common tested properties
      // fallthrough
      "toJSON",
      "$$typeof",
      "__esModule"
    ]);
  }(tr)), tr;
}
var Tn;
function la() {
  return Tn || (Tn = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "unstable_rootParams", {
      enumerable: !0,
      get: function() {
        return d;
      }
    });
    const t = Bs(), r = Ye(), n = Re(), s = He(), a = At(), i = da(), o = /* @__PURE__ */ new WeakMap();
    async function d() {
      const y = n.workAsyncStorage.getStore();
      if (!y)
        throw Object.defineProperty(new t.InvariantError("Missing workStore in unstable_rootParams"), "__NEXT_ERROR_CODE", {
          value: "E615",
          enumerable: !1,
          configurable: !0
        });
      const b = s.workUnitAsyncStorage.getStore();
      if (!b)
        throw Object.defineProperty(new Error(`Route ${y.route} used \`unstable_rootParams()\` in Pages Router. This API is only available within App Router.`), "__NEXT_ERROR_CODE", {
          value: "E641",
          enumerable: !1,
          configurable: !0
        });
      switch (b.type) {
        case "unstable-cache":
        case "cache":
          throw Object.defineProperty(new Error(`Route ${y.route} used \`unstable_rootParams()\` inside \`"use cache"\` or \`unstable_cache\`. Support for this API inside cache scopes is planned for a future version of Next.js.`), "__NEXT_ERROR_CODE", {
            value: "E642",
            enumerable: !1,
            configurable: !0
          });
        case "prerender":
        case "prerender-ppr":
        case "prerender-legacy":
          return u(b.rootParams, y, b);
        default:
          return Promise.resolve(b.rootParams);
      }
    }
    function u(y, b, S) {
      const _ = b.fallbackRouteParams;
      if (_) {
        let E = !1;
        for (const m in y)
          if (_.has(m)) {
            E = !0;
            break;
          }
        if (E) {
          if (S.type === "prerender") {
            const m = o.get(y);
            if (m)
              return m;
            const p = (0, a.makeHangingPromise)(S.renderSignal, "`unstable_rootParams`");
            return o.set(y, p), p;
          }
          return g(y, _, b, S);
        }
      }
      return Promise.resolve(y);
    }
    function g(y, b, S, _) {
      const E = o.get(y);
      if (E)
        return E;
      const m = {
        ...y
      }, p = Promise.resolve(m);
      return o.set(y, p), Object.keys(y).forEach((l) => {
        i.wellKnownProperties.has(l) || (b.has(l) ? Object.defineProperty(m, l, {
          get() {
            const c = (0, i.describeStringPropertyAccess)("unstable_rootParams", l);
            _.type === "prerender-ppr" ? (0, r.postponeWithTracking)(S.route, c, _.dynamicTracking) : (0, r.throwToInterruptStaticGeneration)(c, S, _);
          },
          enumerable: !0
        }) : p[l] = y[l]);
      }), p;
    }
  }(er)), er;
}
var kn;
function ha() {
  return kn || (kn = 1, function(e, t) {
    const r = {
      NextRequest: js().NextRequest,
      NextResponse: na().NextResponse,
      ImageResponse: sa().ImageResponse,
      userAgentFromString: Sn().userAgentFromString,
      userAgent: Sn().userAgent,
      URLPattern: ia().URLPattern,
      after: ca().after,
      connection: ua().connection,
      unstable_rootParams: la().unstable_rootParams
    };
    e.exports = r, t.NextRequest = r.NextRequest, t.NextResponse = r.NextResponse, t.ImageResponse = r.ImageResponse, t.userAgentFromString = r.userAgentFromString, t.userAgent = r.userAgent, t.URLPattern = r.URLPattern, t.after = r.after, t.connection = r.connection, t.unstable_rootParams = r.unstable_rootParams;
  }(it, it.exports)), it.exports;
}
var M = ha();
class ue extends Error {
}
class ot extends ue {
  constructor({ code: t, message: r }) {
    super(r ?? "An error occured while interacting with the authorization server."), this.name = "OAuth2Error", this.code = t;
  }
}
class fa extends ue {
  constructor(t) {
    super(t ?? "Discovery failed for the OpenID Connect configuration."), this.code = "discovery_error", this.name = "DiscoveryError";
  }
}
class pa extends ue {
  constructor(t) {
    super(t ?? "The state parameter is missing."), this.code = "missing_state", this.name = "MissingStateError";
  }
}
class ma extends ue {
  constructor(t) {
    super(t ?? "The state parameter is invalid."), this.code = "invalid_state", this.name = "InvalidStateError";
  }
}
class xn extends ue {
  constructor({ cause: t, message: r }) {
    super(r ?? "An error occured during the authorization flow."), this.code = "authorization_error", this.cause = t, this.name = "AuthorizationError";
  }
}
class wa extends ue {
  constructor({ cause: t, message: r }) {
    super(r ?? "An error occured while trying to exchange the authorization code."), this.code = "authorization_code_grant_error", this.cause = t, this.name = "AuthorizationCodeGrantError";
  }
}
class fe extends ue {
  constructor(t) {
    super(t ?? "An error occured while completing the backchannel logout request."), this.code = "backchannel_logout_error", this.name = "BackchannelLogoutError";
  }
}
var Ue;
(function(e) {
  e.MISSING_SESSION = "missing_session", e.MISSING_REFRESH_TOKEN = "missing_refresh_token", e.FAILED_TO_REFRESH_TOKEN = "failed_to_refresh_token";
})(Ue || (Ue = {}));
class cr extends ue {
  constructor(t, r) {
    super(r), this.name = "AccessTokenError", this.code = t;
  }
}
var Fe;
(function(e) {
  e.MISSING_SESSION = "missing_session", e.MISSING_REFRESH_TOKEN = "missing_refresh_token", e.FAILED_TO_EXCHANGE = "failed_to_exchange_refresh_token";
})(Fe || (Fe = {}));
class ur extends ue {
  /**
   * Constructs a new `AccessTokenForConnectionError` instance.
   *
   * @param code - The error code.
   * @param message - The error message.
   * @param cause - The OAuth2 cause of the error.
   */
  constructor(t, r, n) {
    super(r), this.name = "AccessTokenForConnectionError", this.code = t, this.cause = n;
  }
}
var dr;
(function(e) {
  e.MISSING_REQUIRED_OPTIONS = "missing_required_options";
})(dr || (dr = {}));
class ya extends ue {
  /**
   * Constructs a new `ConfigurationError` instance.
   *
   * @param code - The error code.
   * @param missingOptions - Array of missing configuration option names.
   * @param envVarMapping - Optional mapping of option names to their environment variable names.
   */
  constructor(t, r = [], n = {}) {
    let s = `Not all required options where provided when creating an instance of Auth0Client. Ensure to provide all missing options, either by passing it to the Auth0Client constructor, or by setting the corresponding environment variable.

`;
    r.forEach((a) => {
      a === "clientAuthentication" ? s += `Missing: clientAuthentication: Set either AUTH0_CLIENT_SECRET env var or AUTH0_CLIENT_ASSERTION_SIGNING_KEY env var, or pass clientSecret or clientAssertionSigningKey in options
` : n[a] ? s += `Missing: ${a}: Set ${n[a]} env var or pass ${a} in options
` : s += `Missing: ${a}
`;
    }), super(s.trim()), this.name = "ConfigurationError", this.code = t, this.missingOptions = r;
  }
}
const O = crypto, te = (e) => e instanceof CryptoKey, ga = async (e, t) => {
  const r = `SHA-${e.slice(-3)}`;
  return new Uint8Array(await O.subtle.digest(r, t));
}, V = new TextEncoder(), Te = new TextDecoder(), ft = 2 ** 32;
function de(...e) {
  const t = e.reduce((s, { length: a }) => s + a, 0), r = new Uint8Array(t);
  let n = 0;
  for (const s of e)
    r.set(s, n), n += s.length;
  return r;
}
function ba(e, t) {
  return de(V.encode(e), new Uint8Array([0]), t);
}
function lr(e, t, r) {
  if (t < 0 || t >= ft)
    throw new RangeError(`value must be >= 0 and <= ${ft - 1}. Received ${t}`);
  e.set([t >>> 24, t >>> 16, t >>> 8, t & 255], r);
}
function Bn(e) {
  const t = Math.floor(e / ft), r = e % ft, n = new Uint8Array(8);
  return lr(n, t, 0), lr(n, r, 4), n;
}
function Rr(e) {
  const t = new Uint8Array(4);
  return lr(t, e), t;
}
function rr(e) {
  return de(Rr(e.length), e);
}
async function Sa(e, t, r) {
  const n = Math.ceil((t >> 3) / 32), s = new Uint8Array(n * 32);
  for (let a = 0; a < n; a++) {
    const i = new Uint8Array(4 + e.length + r.length);
    i.set(Rr(a + 1)), i.set(e, 4), i.set(r, 4 + e.length), s.set(await ga("sha256", i), a * 32);
  }
  return s.slice(0, t >> 3);
}
const _a = (e) => {
  let t = e;
  typeof t == "string" && (t = V.encode(t));
  const r = 32768, n = [];
  for (let s = 0; s < t.length; s += r)
    n.push(String.fromCharCode.apply(null, t.subarray(s, s + r)));
  return btoa(n.join(""));
}, Q = (e) => _a(e).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_"), Ea = (e) => {
  const t = atob(e), r = new Uint8Array(t.length);
  for (let n = 0; n < t.length; n++)
    r[n] = t.charCodeAt(n);
  return r;
}, z = (e) => {
  let t = e;
  t instanceof Uint8Array && (t = Te.decode(t)), t = t.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
  try {
    return Ea(t);
  } catch {
    throw new TypeError("The input to be decoded is not correctly encoded.");
  }
};
class F extends Error {
  constructor(t, r) {
    var n;
    super(t, r), this.code = "ERR_JOSE_GENERIC", this.name = this.constructor.name, (n = Error.captureStackTrace) == null || n.call(Error, this, this.constructor);
  }
}
F.code = "ERR_JOSE_GENERIC";
class Z extends F {
  constructor(t, r, n = "unspecified", s = "unspecified") {
    super(t, { cause: { claim: n, reason: s, payload: r } }), this.code = "ERR_JWT_CLAIM_VALIDATION_FAILED", this.claim = n, this.reason = s, this.payload = r;
  }
}
Z.code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
class hr extends F {
  constructor(t, r, n = "unspecified", s = "unspecified") {
    super(t, { cause: { claim: n, reason: s, payload: r } }), this.code = "ERR_JWT_EXPIRED", this.claim = n, this.reason = s, this.payload = r;
  }
}
hr.code = "ERR_JWT_EXPIRED";
class pt extends F {
  constructor() {
    super(...arguments), this.code = "ERR_JOSE_ALG_NOT_ALLOWED";
  }
}
pt.code = "ERR_JOSE_ALG_NOT_ALLOWED";
class J extends F {
  constructor() {
    super(...arguments), this.code = "ERR_JOSE_NOT_SUPPORTED";
  }
}
J.code = "ERR_JOSE_NOT_SUPPORTED";
class mt extends F {
  constructor(t = "decryption operation failed", r) {
    super(t, r), this.code = "ERR_JWE_DECRYPTION_FAILED";
  }
}
mt.code = "ERR_JWE_DECRYPTION_FAILED";
class T extends F {
  constructor() {
    super(...arguments), this.code = "ERR_JWE_INVALID";
  }
}
T.code = "ERR_JWE_INVALID";
class q extends F {
  constructor() {
    super(...arguments), this.code = "ERR_JWS_INVALID";
  }
}
q.code = "ERR_JWS_INVALID";
class Tr extends F {
  constructor() {
    super(...arguments), this.code = "ERR_JWT_INVALID";
  }
}
Tr.code = "ERR_JWT_INVALID";
class Aa extends F {
  constructor() {
    super(...arguments), this.code = "ERR_JWK_INVALID";
  }
}
Aa.code = "ERR_JWK_INVALID";
class kr extends F {
  constructor() {
    super(...arguments), this.code = "ERR_JWKS_INVALID";
  }
}
kr.code = "ERR_JWKS_INVALID";
class xr extends F {
  constructor(t = "no applicable key found in the JSON Web Key Set", r) {
    super(t, r), this.code = "ERR_JWKS_NO_MATCHING_KEY";
  }
}
xr.code = "ERR_JWKS_NO_MATCHING_KEY";
class jn extends F {
  constructor(t = "multiple matching keys found in the JSON Web Key Set", r) {
    super(t, r), this.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
  }
}
jn.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
class Gn extends F {
  constructor(t = "request timed out", r) {
    super(t, r), this.code = "ERR_JWKS_TIMEOUT";
  }
}
Gn.code = "ERR_JWKS_TIMEOUT";
class Fn extends F {
  constructor(t = "signature verification failed", r) {
    super(t, r), this.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
  }
}
Fn.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
const Pr = O.getRandomValues.bind(O);
function Vn(e) {
  switch (e) {
    case "A128GCM":
    case "A128GCMKW":
    case "A192GCM":
    case "A192GCMKW":
    case "A256GCM":
    case "A256GCMKW":
      return 96;
    case "A128CBC-HS256":
    case "A192CBC-HS384":
    case "A256CBC-HS512":
      return 128;
    default:
      throw new J(`Unsupported JWE Algorithm: ${e}`);
  }
}
const va = (e) => Pr(new Uint8Array(Vn(e) >> 3)), Xn = (e, t) => {
  if (t.length << 3 !== Vn(e))
    throw new T("Invalid Initialization Vector length");
}, wt = (e, t) => {
  const r = e.byteLength << 3;
  if (r !== t)
    throw new T(`Invalid Content Encryption Key length. Expected ${t} bits, got ${r} bits`);
}, Ra = (e, t) => {
  if (!(e instanceof Uint8Array))
    throw new TypeError("First argument must be a buffer");
  if (!(t instanceof Uint8Array))
    throw new TypeError("Second argument must be a buffer");
  if (e.length !== t.length)
    throw new TypeError("Input buffers must have the same length");
  const r = e.length;
  let n = 0, s = -1;
  for (; ++s < r; )
    n |= e[s] ^ t[s];
  return n === 0;
};
function G(e, t = "algorithm.name") {
  return new TypeError(`CryptoKey does not support this operation, its ${t} must be ${e}`);
}
function ye(e, t) {
  return e.name === t;
}
function dt(e) {
  return parseInt(e.name.slice(4), 10);
}
function Ta(e) {
  switch (e) {
    case "ES256":
      return "P-256";
    case "ES384":
      return "P-384";
    case "ES512":
      return "P-521";
    default:
      throw new Error("unreachable");
  }
}
function Yn(e, t) {
  if (t.length && !t.some((r) => e.usages.includes(r))) {
    let r = "CryptoKey does not support this operation, its usages must include ";
    if (t.length > 2) {
      const n = t.pop();
      r += `one of ${t.join(", ")}, or ${n}.`;
    } else t.length === 2 ? r += `one of ${t[0]} or ${t[1]}.` : r += `${t[0]}.`;
    throw new TypeError(r);
  }
}
function ka(e, t, ...r) {
  switch (t) {
    case "HS256":
    case "HS384":
    case "HS512": {
      if (!ye(e.algorithm, "HMAC"))
        throw G("HMAC");
      const n = parseInt(t.slice(2), 10);
      if (dt(e.algorithm.hash) !== n)
        throw G(`SHA-${n}`, "algorithm.hash");
      break;
    }
    case "RS256":
    case "RS384":
    case "RS512": {
      if (!ye(e.algorithm, "RSASSA-PKCS1-v1_5"))
        throw G("RSASSA-PKCS1-v1_5");
      const n = parseInt(t.slice(2), 10);
      if (dt(e.algorithm.hash) !== n)
        throw G(`SHA-${n}`, "algorithm.hash");
      break;
    }
    case "PS256":
    case "PS384":
    case "PS512": {
      if (!ye(e.algorithm, "RSA-PSS"))
        throw G("RSA-PSS");
      const n = parseInt(t.slice(2), 10);
      if (dt(e.algorithm.hash) !== n)
        throw G(`SHA-${n}`, "algorithm.hash");
      break;
    }
    case "EdDSA": {
      if (e.algorithm.name !== "Ed25519" && e.algorithm.name !== "Ed448")
        throw G("Ed25519 or Ed448");
      break;
    }
    case "ES256":
    case "ES384":
    case "ES512": {
      if (!ye(e.algorithm, "ECDSA"))
        throw G("ECDSA");
      const n = Ta(t);
      if (e.algorithm.namedCurve !== n)
        throw G(n, "algorithm.namedCurve");
      break;
    }
    default:
      throw new TypeError("CryptoKey does not support this operation");
  }
  Yn(e, r);
}
function ge(e, t, ...r) {
  switch (t) {
    case "A128GCM":
    case "A192GCM":
    case "A256GCM": {
      if (!ye(e.algorithm, "AES-GCM"))
        throw G("AES-GCM");
      const n = parseInt(t.slice(1, 4), 10);
      if (e.algorithm.length !== n)
        throw G(n, "algorithm.length");
      break;
    }
    case "A128KW":
    case "A192KW":
    case "A256KW": {
      if (!ye(e.algorithm, "AES-KW"))
        throw G("AES-KW");
      const n = parseInt(t.slice(1, 4), 10);
      if (e.algorithm.length !== n)
        throw G(n, "algorithm.length");
      break;
    }
    case "ECDH": {
      switch (e.algorithm.name) {
        case "ECDH":
        case "X25519":
        case "X448":
          break;
        default:
          throw G("ECDH, X25519, or X448");
      }
      break;
    }
    case "PBES2-HS256+A128KW":
    case "PBES2-HS384+A192KW":
    case "PBES2-HS512+A256KW":
      if (!ye(e.algorithm, "PBKDF2"))
        throw G("PBKDF2");
      break;
    case "RSA-OAEP":
    case "RSA-OAEP-256":
    case "RSA-OAEP-384":
    case "RSA-OAEP-512": {
      if (!ye(e.algorithm, "RSA-OAEP"))
        throw G("RSA-OAEP");
      const n = parseInt(t.slice(9), 10) || 1;
      if (dt(e.algorithm.hash) !== n)
        throw G(`SHA-${n}`, "algorithm.hash");
      break;
    }
    default:
      throw new TypeError("CryptoKey does not support this operation");
  }
  Yn(e, r);
}
function Zn(e, t, ...r) {
  var n;
  if (r = r.filter(Boolean), r.length > 2) {
    const s = r.pop();
    e += `one of type ${r.join(", ")}, or ${s}.`;
  } else r.length === 2 ? e += `one of type ${r[0]} or ${r[1]}.` : e += `of type ${r[0]}.`;
  return t == null ? e += ` Received ${t}` : typeof t == "function" && t.name ? e += ` Received function ${t.name}` : typeof t == "object" && t != null && (n = t.constructor) != null && n.name && (e += ` Received an instance of ${t.constructor.name}`), e;
}
const X = (e, ...t) => Zn("Key must be ", e, ...t);
function Qn(e, t, ...r) {
  return Zn(`Key for the ${e} algorithm must be `, t, ...r);
}
const es = (e) => te(e) ? !0 : (e == null ? void 0 : e[Symbol.toStringTag]) === "KeyObject", Y = ["CryptoKey"];
async function xa(e, t, r, n, s, a) {
  if (!(t instanceof Uint8Array))
    throw new TypeError(X(t, "Uint8Array"));
  const i = parseInt(e.slice(1, 4), 10), o = await O.subtle.importKey("raw", t.subarray(i >> 3), "AES-CBC", !1, ["decrypt"]), d = await O.subtle.importKey("raw", t.subarray(0, i >> 3), {
    hash: `SHA-${i << 1}`,
    name: "HMAC"
  }, !1, ["sign"]), u = de(a, n, r, Bn(a.length << 3)), g = new Uint8Array((await O.subtle.sign("HMAC", d, u)).slice(0, i >> 3));
  let y;
  try {
    y = Ra(s, g);
  } catch {
  }
  if (!y)
    throw new mt();
  let b;
  try {
    b = new Uint8Array(await O.subtle.decrypt({ iv: n, name: "AES-CBC" }, o, r));
  } catch {
  }
  if (!b)
    throw new mt();
  return b;
}
async function Pa(e, t, r, n, s, a) {
  let i;
  t instanceof Uint8Array ? i = await O.subtle.importKey("raw", t, "AES-GCM", !1, ["decrypt"]) : (ge(t, e, "decrypt"), i = t);
  try {
    return new Uint8Array(await O.subtle.decrypt({
      additionalData: a,
      iv: n,
      name: "AES-GCM",
      tagLength: 128
    }, i, de(r, s)));
  } catch {
    throw new mt();
  }
}
const ts = async (e, t, r, n, s, a) => {
  if (!te(t) && !(t instanceof Uint8Array))
    throw new TypeError(X(t, ...Y, "Uint8Array"));
  if (!n)
    throw new T("JWE Initialization Vector missing");
  if (!s)
    throw new T("JWE Authentication Tag missing");
  switch (Xn(e, n), e) {
    case "A128CBC-HS256":
    case "A192CBC-HS384":
    case "A256CBC-HS512":
      return t instanceof Uint8Array && wt(t, parseInt(e.slice(-3), 10)), xa(e, t, r, n, s, a);
    case "A128GCM":
    case "A192GCM":
    case "A256GCM":
      return t instanceof Uint8Array && wt(t, parseInt(e.slice(1, 4), 10)), Pa(e, t, r, n, s, a);
    default:
      throw new J("Unsupported JWE Content Encryption Algorithm");
  }
}, Cr = (...e) => {
  const t = e.filter(Boolean);
  if (t.length === 0 || t.length === 1)
    return !0;
  let r;
  for (const n of t) {
    const s = Object.keys(n);
    if (!r || r.size === 0) {
      r = new Set(s);
      continue;
    }
    for (const a of s) {
      if (r.has(a))
        return !1;
      r.add(a);
    }
  }
  return !0;
};
function Ca(e) {
  return typeof e == "object" && e !== null;
}
function ee(e) {
  if (!Ca(e) || Object.prototype.toString.call(e) !== "[object Object]")
    return !1;
  if (Object.getPrototypeOf(e) === null)
    return !0;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t;
}
const vt = [
  { hash: "SHA-256", name: "HMAC" },
  !0,
  ["sign"]
];
function rs(e, t) {
  if (e.algorithm.length !== parseInt(t.slice(1, 4), 10))
    throw new TypeError(`Invalid key size for alg: ${t}`);
}
function ns(e, t, r) {
  if (te(e))
    return ge(e, t, r), e;
  if (e instanceof Uint8Array)
    return O.subtle.importKey("raw", e, "AES-KW", !0, [r]);
  throw new TypeError(X(e, ...Y, "Uint8Array"));
}
const fr = async (e, t, r) => {
  const n = await ns(t, e, "wrapKey");
  rs(n, e);
  const s = await O.subtle.importKey("raw", r, ...vt);
  return new Uint8Array(await O.subtle.wrapKey("raw", s, n, "AES-KW"));
}, pr = async (e, t, r) => {
  const n = await ns(t, e, "unwrapKey");
  rs(n, e);
  const s = await O.subtle.unwrapKey("raw", r, n, "AES-KW", ...vt);
  return new Uint8Array(await O.subtle.exportKey("raw", s));
};
async function ss(e, t, r, n, s = new Uint8Array(0), a = new Uint8Array(0)) {
  if (!te(e))
    throw new TypeError(X(e, ...Y));
  if (ge(e, "ECDH"), !te(t))
    throw new TypeError(X(t, ...Y));
  ge(t, "ECDH", "deriveBits");
  const i = de(rr(V.encode(r)), rr(s), rr(a), Rr(n));
  let o;
  e.algorithm.name === "X25519" ? o = 256 : e.algorithm.name === "X448" ? o = 448 : o = Math.ceil(parseInt(e.algorithm.namedCurve.substr(-3), 10) / 8) << 3;
  const d = new Uint8Array(await O.subtle.deriveBits({
    name: e.algorithm.name,
    public: e
  }, t, o));
  return Sa(d, n, i);
}
async function Oa(e) {
  if (!te(e))
    throw new TypeError(X(e, ...Y));
  return O.subtle.generateKey(e.algorithm, !0, ["deriveBits"]);
}
function as(e) {
  if (!te(e))
    throw new TypeError(X(e, ...Y));
  return ["P-256", "P-384", "P-521"].includes(e.algorithm.namedCurve) || e.algorithm.name === "X25519" || e.algorithm.name === "X448";
}
function Ia(e) {
  if (!(e instanceof Uint8Array) || e.length < 8)
    throw new T("PBES2 Salt Input must be 8 or more octets");
}
function Na(e, t) {
  if (e instanceof Uint8Array)
    return O.subtle.importKey("raw", e, "PBKDF2", !1, ["deriveBits"]);
  if (te(e))
    return ge(e, t, "deriveBits", "deriveKey"), e;
  throw new TypeError(X(e, ...Y, "Uint8Array"));
}
async function is(e, t, r, n) {
  Ia(e);
  const s = ba(t, e), a = parseInt(t.slice(13, 16), 10), i = {
    hash: `SHA-${t.slice(8, 11)}`,
    iterations: r,
    name: "PBKDF2",
    salt: s
  }, o = {
    length: a,
    name: "AES-KW"
  }, d = await Na(n, t);
  if (d.usages.includes("deriveBits"))
    return new Uint8Array(await O.subtle.deriveBits(i, d, a));
  if (d.usages.includes("deriveKey"))
    return O.subtle.deriveKey(i, d, o, !1, ["wrapKey", "unwrapKey"]);
  throw new TypeError('PBKDF2 key "usages" must include "deriveBits" or "deriveKey"');
}
const Da = async (e, t, r, n = 2048, s = Pr(new Uint8Array(16))) => {
  const a = await is(s, e, n, t);
  return { encryptedKey: await fr(e.slice(-6), a, r), p2c: n, p2s: Q(s) };
}, Ua = async (e, t, r, n, s) => {
  const a = await is(s, e, n, t);
  return pr(e.slice(-6), a, r);
};
function yt(e) {
  switch (e) {
    case "RSA-OAEP":
    case "RSA-OAEP-256":
    case "RSA-OAEP-384":
    case "RSA-OAEP-512":
      return "RSA-OAEP";
    default:
      throw new J(`alg ${e} is not supported either by JOSE or your javascript runtime`);
  }
}
const Or = (e, t) => {
  if (e.startsWith("RS") || e.startsWith("PS")) {
    const { modulusLength: r } = t.algorithm;
    if (typeof r != "number" || r < 2048)
      throw new TypeError(`${e} requires key modulusLength to be 2048 bits or larger`);
  }
}, Ka = async (e, t, r) => {
  if (!te(t))
    throw new TypeError(X(t, ...Y));
  if (ge(t, e, "encrypt", "wrapKey"), Or(e, t), t.usages.includes("encrypt"))
    return new Uint8Array(await O.subtle.encrypt(yt(e), t, r));
  if (t.usages.includes("wrapKey")) {
    const n = await O.subtle.importKey("raw", r, ...vt);
    return new Uint8Array(await O.subtle.wrapKey("raw", n, t, yt(e)));
  }
  throw new TypeError('RSA-OAEP key "usages" must include "encrypt" or "wrapKey" for this operation');
}, Wa = async (e, t, r) => {
  if (!te(t))
    throw new TypeError(X(t, ...Y));
  if (ge(t, e, "decrypt", "unwrapKey"), Or(e, t), t.usages.includes("decrypt"))
    return new Uint8Array(await O.subtle.decrypt(yt(e), t, r));
  if (t.usages.includes("unwrapKey")) {
    const n = await O.subtle.unwrapKey("raw", r, t, yt(e), ...vt);
    return new Uint8Array(await O.subtle.exportKey("raw", n));
  }
  throw new TypeError('RSA-OAEP key "usages" must include "decrypt" or "unwrapKey" for this operation');
};
function $e(e) {
  return ee(e) && typeof e.kty == "string";
}
function Ma(e) {
  return e.kty !== "oct" && typeof e.d == "string";
}
function Ha(e) {
  return e.kty !== "oct" && typeof e.d > "u";
}
function $a(e) {
  return $e(e) && e.kty === "oct" && typeof e.k == "string";
}
function Ja(e) {
  let t, r;
  switch (e.kty) {
    case "RSA": {
      switch (e.alg) {
        case "PS256":
        case "PS384":
        case "PS512":
          t = { name: "RSA-PSS", hash: `SHA-${e.alg.slice(-3)}` }, r = e.d ? ["sign"] : ["verify"];
          break;
        case "RS256":
        case "RS384":
        case "RS512":
          t = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${e.alg.slice(-3)}` }, r = e.d ? ["sign"] : ["verify"];
          break;
        case "RSA-OAEP":
        case "RSA-OAEP-256":
        case "RSA-OAEP-384":
        case "RSA-OAEP-512":
          t = {
            name: "RSA-OAEP",
            hash: `SHA-${parseInt(e.alg.slice(-3), 10) || 1}`
          }, r = e.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
          break;
        default:
          throw new J('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    case "EC": {
      switch (e.alg) {
        case "ES256":
          t = { name: "ECDSA", namedCurve: "P-256" }, r = e.d ? ["sign"] : ["verify"];
          break;
        case "ES384":
          t = { name: "ECDSA", namedCurve: "P-384" }, r = e.d ? ["sign"] : ["verify"];
          break;
        case "ES512":
          t = { name: "ECDSA", namedCurve: "P-521" }, r = e.d ? ["sign"] : ["verify"];
          break;
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
          t = { name: "ECDH", namedCurve: e.crv }, r = e.d ? ["deriveBits"] : [];
          break;
        default:
          throw new J('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    case "OKP": {
      switch (e.alg) {
        case "EdDSA":
          t = { name: e.crv }, r = e.d ? ["sign"] : ["verify"];
          break;
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
          t = { name: e.crv }, r = e.d ? ["deriveBits"] : [];
          break;
        default:
          throw new J('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    default:
      throw new J('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
  }
  return { algorithm: t, keyUsages: r };
}
const os = async (e) => {
  if (!e.alg)
    throw new TypeError('"alg" argument is required when "jwk.alg" is not present');
  const { algorithm: t, keyUsages: r } = Ja(e), n = [
    t,
    e.ext ?? !1,
    e.key_ops ?? r
  ], s = { ...e };
  return delete s.alg, delete s.use, O.subtle.importKey("jwk", s, ...n);
}, cs = (e) => z(e);
let Oe, Ie;
const us = (e) => (e == null ? void 0 : e[Symbol.toStringTag]) === "KeyObject", gt = async (e, t, r, n, s = !1) => {
  let a = e.get(t);
  if (a != null && a[n])
    return a[n];
  const i = await os({ ...r, alg: n });
  return s && Object.freeze(t), a ? a[n] = i : e.set(t, { [n]: i }), i;
}, La = (e, t) => {
  if (us(e)) {
    let r = e.export({ format: "jwk" });
    return delete r.d, delete r.dp, delete r.dq, delete r.p, delete r.q, delete r.qi, r.k ? cs(r.k) : (Ie || (Ie = /* @__PURE__ */ new WeakMap()), gt(Ie, e, r, t));
  }
  return $e(e) ? e.k ? z(e.k) : (Ie || (Ie = /* @__PURE__ */ new WeakMap()), gt(Ie, e, e, t, !0)) : e;
}, qa = (e, t) => {
  if (us(e)) {
    let r = e.export({ format: "jwk" });
    return r.k ? cs(r.k) : (Oe || (Oe = /* @__PURE__ */ new WeakMap()), gt(Oe, e, r, t));
  }
  return $e(e) ? e.k ? z(e.k) : (Oe || (Oe = /* @__PURE__ */ new WeakMap()), gt(Oe, e, e, t, !0)) : e;
}, Ee = { normalizePublicKey: La, normalizePrivateKey: qa };
function Ir(e) {
  switch (e) {
    case "A128GCM":
      return 128;
    case "A192GCM":
      return 192;
    case "A256GCM":
    case "A128CBC-HS256":
      return 256;
    case "A192CBC-HS384":
      return 384;
    case "A256CBC-HS512":
      return 512;
    default:
      throw new J(`Unsupported JWE Algorithm: ${e}`);
  }
}
const Ne = (e) => Pr(new Uint8Array(Ir(e) >> 3)), pe = (e, t, r = 0) => {
  r === 0 && (t.unshift(t.length), t.unshift(6));
  const n = e.indexOf(t[0], r);
  if (n === -1)
    return !1;
  const s = e.subarray(n, n + t.length);
  return s.length !== t.length ? !1 : s.every((a, i) => a === t[i]) || pe(e, t, n + 1);
}, Pn = (e) => {
  switch (!0) {
    case pe(e, [42, 134, 72, 206, 61, 3, 1, 7]):
      return "P-256";
    case pe(e, [43, 129, 4, 0, 34]):
      return "P-384";
    case pe(e, [43, 129, 4, 0, 35]):
      return "P-521";
    case pe(e, [43, 101, 110]):
      return "X25519";
    case pe(e, [43, 101, 111]):
      return "X448";
    case pe(e, [43, 101, 112]):
      return "Ed25519";
    case pe(e, [43, 101, 113]):
      return "Ed448";
    default:
      throw new J("Invalid or unsupported EC Key Curve or OKP Key Sub Type");
  }
}, za = async (e, t, r, n, s) => {
  let a, i;
  const o = new Uint8Array(atob(r.replace(e, "")).split("").map((d) => d.charCodeAt(0)));
  switch (n) {
    case "PS256":
    case "PS384":
    case "PS512":
      a = { name: "RSA-PSS", hash: `SHA-${n.slice(-3)}` }, i = ["sign"];
      break;
    case "RS256":
    case "RS384":
    case "RS512":
      a = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${n.slice(-3)}` }, i = ["sign"];
      break;
    case "RSA-OAEP":
    case "RSA-OAEP-256":
    case "RSA-OAEP-384":
    case "RSA-OAEP-512":
      a = {
        name: "RSA-OAEP",
        hash: `SHA-${parseInt(n.slice(-3), 10) || 1}`
      }, i = ["decrypt", "unwrapKey"];
      break;
    case "ES256":
      a = { name: "ECDSA", namedCurve: "P-256" }, i = ["sign"];
      break;
    case "ES384":
      a = { name: "ECDSA", namedCurve: "P-384" }, i = ["sign"];
      break;
    case "ES512":
      a = { name: "ECDSA", namedCurve: "P-521" }, i = ["sign"];
      break;
    case "ECDH-ES":
    case "ECDH-ES+A128KW":
    case "ECDH-ES+A192KW":
    case "ECDH-ES+A256KW": {
      const d = Pn(o);
      a = d.startsWith("P-") ? { name: "ECDH", namedCurve: d } : { name: d }, i = ["deriveBits"];
      break;
    }
    case "EdDSA":
      a = { name: Pn(o) }, i = ["sign"];
      break;
    default:
      throw new J('Invalid or unsupported "alg" (Algorithm) value');
  }
  return O.subtle.importKey(t, o, a, !1, i);
}, Ba = (e, t, r) => za(/(?:-----(?:BEGIN|END) PRIVATE KEY-----|\s)/g, "pkcs8", e, t);
async function ja(e, t, r) {
  if (typeof e != "string" || e.indexOf("-----BEGIN PRIVATE KEY-----") !== 0)
    throw new TypeError('"pkcs8" must be PKCS#8 formatted string');
  return Ba(e, t);
}
async function Nr(e, t) {
  if (!ee(e))
    throw new TypeError("JWK must be an object");
  switch (t || (t = e.alg), e.kty) {
    case "oct":
      if (typeof e.k != "string" || !e.k)
        throw new TypeError('missing "k" (Key Value) Parameter value');
      return z(e.k);
    case "RSA":
      if (e.oth !== void 0)
        throw new J('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
    case "EC":
    case "OKP":
      return os({ ...e, alg: t });
    default:
      throw new J('Unsupported "kty" (Key Type) Parameter value');
  }
}
const De = (e) => e == null ? void 0 : e[Symbol.toStringTag], mr = (e, t, r) => {
  var n, s;
  if (t.use !== void 0 && t.use !== "sig")
    throw new TypeError("Invalid key for this operation, when present its use must be sig");
  if (t.key_ops !== void 0 && ((s = (n = t.key_ops).includes) == null ? void 0 : s.call(n, r)) !== !0)
    throw new TypeError(`Invalid key for this operation, when present its key_ops must include ${r}`);
  if (t.alg !== void 0 && t.alg !== e)
    throw new TypeError(`Invalid key for this operation, when present its alg must be ${e}`);
  return !0;
}, Ga = (e, t, r, n) => {
  if (!(t instanceof Uint8Array)) {
    if (n && $e(t)) {
      if ($a(t) && mr(e, t, r))
        return;
      throw new TypeError('JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present');
    }
    if (!es(t))
      throw new TypeError(Qn(e, t, ...Y, "Uint8Array", n ? "JSON Web Key" : null));
    if (t.type !== "secret")
      throw new TypeError(`${De(t)} instances for symmetric algorithms must be of type "secret"`);
  }
}, Fa = (e, t, r, n) => {
  if (n && $e(t))
    switch (r) {
      case "sign":
        if (Ma(t) && mr(e, t, r))
          return;
        throw new TypeError("JSON Web Key for this operation be a private JWK");
      case "verify":
        if (Ha(t) && mr(e, t, r))
          return;
        throw new TypeError("JSON Web Key for this operation be a public JWK");
    }
  if (!es(t))
    throw new TypeError(Qn(e, t, ...Y, n ? "JSON Web Key" : null));
  if (t.type === "secret")
    throw new TypeError(`${De(t)} instances for asymmetric algorithms must not be of type "secret"`);
  if (r === "sign" && t.type === "public")
    throw new TypeError(`${De(t)} instances for asymmetric algorithm signing must be of type "private"`);
  if (r === "decrypt" && t.type === "public")
    throw new TypeError(`${De(t)} instances for asymmetric algorithm decryption must be of type "private"`);
  if (t.algorithm && r === "verify" && t.type === "private")
    throw new TypeError(`${De(t)} instances for asymmetric algorithm verifying must be of type "public"`);
  if (t.algorithm && r === "encrypt" && t.type === "private")
    throw new TypeError(`${De(t)} instances for asymmetric algorithm encryption must be of type "public"`);
};
function ds(e, t, r, n) {
  t.startsWith("HS") || t === "dir" || t.startsWith("PBES2") || /^A\d{3}(?:GCM)?KW$/.test(t) ? Ga(t, r, n, e) : Fa(t, r, n, e);
}
const ls = ds.bind(void 0, !1), Cn = ds.bind(void 0, !0);
async function Va(e, t, r, n, s) {
  if (!(r instanceof Uint8Array))
    throw new TypeError(X(r, "Uint8Array"));
  const a = parseInt(e.slice(1, 4), 10), i = await O.subtle.importKey("raw", r.subarray(a >> 3), "AES-CBC", !1, ["encrypt"]), o = await O.subtle.importKey("raw", r.subarray(0, a >> 3), {
    hash: `SHA-${a << 1}`,
    name: "HMAC"
  }, !1, ["sign"]), d = new Uint8Array(await O.subtle.encrypt({
    iv: n,
    name: "AES-CBC"
  }, i, t)), u = de(s, n, d, Bn(s.length << 3)), g = new Uint8Array((await O.subtle.sign("HMAC", o, u)).slice(0, a >> 3));
  return { ciphertext: d, tag: g, iv: n };
}
async function Xa(e, t, r, n, s) {
  let a;
  r instanceof Uint8Array ? a = await O.subtle.importKey("raw", r, "AES-GCM", !1, ["encrypt"]) : (ge(r, e, "encrypt"), a = r);
  const i = new Uint8Array(await O.subtle.encrypt({
    additionalData: s,
    iv: n,
    name: "AES-GCM",
    tagLength: 128
  }, a, t)), o = i.slice(-16);
  return { ciphertext: i.slice(0, -16), tag: o, iv: n };
}
const hs = async (e, t, r, n, s) => {
  if (!te(r) && !(r instanceof Uint8Array))
    throw new TypeError(X(r, ...Y, "Uint8Array"));
  switch (n ? Xn(e, n) : n = va(e), e) {
    case "A128CBC-HS256":
    case "A192CBC-HS384":
    case "A256CBC-HS512":
      return r instanceof Uint8Array && wt(r, parseInt(e.slice(-3), 10)), Va(e, t, r, n, s);
    case "A128GCM":
    case "A192GCM":
    case "A256GCM":
      return r instanceof Uint8Array && wt(r, parseInt(e.slice(1, 4), 10)), Xa(e, t, r, n, s);
    default:
      throw new J("Unsupported JWE Content Encryption Algorithm");
  }
};
async function Ya(e, t, r, n) {
  const s = e.slice(0, 7), a = await hs(s, r, t, n, new Uint8Array(0));
  return {
    encryptedKey: a.ciphertext,
    iv: Q(a.iv),
    tag: Q(a.tag)
  };
}
async function Za(e, t, r, n, s) {
  const a = e.slice(0, 7);
  return ts(a, t, r, n, s, new Uint8Array(0));
}
async function Qa(e, t, r, n, s) {
  var a;
  switch (ls(e, t, "decrypt"), t = await ((a = Ee.normalizePrivateKey) == null ? void 0 : a.call(Ee, t, e)) || t, e) {
    case "dir": {
      if (r !== void 0)
        throw new T("Encountered unexpected JWE Encrypted Key");
      return t;
    }
    case "ECDH-ES":
      if (r !== void 0)
        throw new T("Encountered unexpected JWE Encrypted Key");
    case "ECDH-ES+A128KW":
    case "ECDH-ES+A192KW":
    case "ECDH-ES+A256KW": {
      if (!ee(n.epk))
        throw new T('JOSE Header "epk" (Ephemeral Public Key) missing or invalid');
      if (!as(t))
        throw new J("ECDH with the provided key is not allowed or not supported by your javascript runtime");
      const i = await Nr(n.epk, e);
      let o, d;
      if (n.apu !== void 0) {
        if (typeof n.apu != "string")
          throw new T('JOSE Header "apu" (Agreement PartyUInfo) invalid');
        try {
          o = z(n.apu);
        } catch {
          throw new T("Failed to base64url decode the apu");
        }
      }
      if (n.apv !== void 0) {
        if (typeof n.apv != "string")
          throw new T('JOSE Header "apv" (Agreement PartyVInfo) invalid');
        try {
          d = z(n.apv);
        } catch {
          throw new T("Failed to base64url decode the apv");
        }
      }
      const u = await ss(i, t, e === "ECDH-ES" ? n.enc : e, e === "ECDH-ES" ? Ir(n.enc) : parseInt(e.slice(-5, -2), 10), o, d);
      if (e === "ECDH-ES")
        return u;
      if (r === void 0)
        throw new T("JWE Encrypted Key missing");
      return pr(e.slice(-6), u, r);
    }
    case "RSA1_5":
    case "RSA-OAEP":
    case "RSA-OAEP-256":
    case "RSA-OAEP-384":
    case "RSA-OAEP-512": {
      if (r === void 0)
        throw new T("JWE Encrypted Key missing");
      return Wa(e, t, r);
    }
    case "PBES2-HS256+A128KW":
    case "PBES2-HS384+A192KW":
    case "PBES2-HS512+A256KW": {
      if (r === void 0)
        throw new T("JWE Encrypted Key missing");
      if (typeof n.p2c != "number")
        throw new T('JOSE Header "p2c" (PBES2 Count) missing or invalid');
      const i = (s == null ? void 0 : s.maxPBES2Count) || 1e4;
      if (n.p2c > i)
        throw new T('JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds');
      if (typeof n.p2s != "string")
        throw new T('JOSE Header "p2s" (PBES2 Salt) missing or invalid');
      let o;
      try {
        o = z(n.p2s);
      } catch {
        throw new T("Failed to base64url decode the p2s");
      }
      return Ua(e, t, r, n.p2c, o);
    }
    case "A128KW":
    case "A192KW":
    case "A256KW": {
      if (r === void 0)
        throw new T("JWE Encrypted Key missing");
      return pr(e, t, r);
    }
    case "A128GCMKW":
    case "A192GCMKW":
    case "A256GCMKW": {
      if (r === void 0)
        throw new T("JWE Encrypted Key missing");
      if (typeof n.iv != "string")
        throw new T('JOSE Header "iv" (Initialization Vector) missing or invalid');
      if (typeof n.tag != "string")
        throw new T('JOSE Header "tag" (Authentication Tag) missing or invalid');
      let i;
      try {
        i = z(n.iv);
      } catch {
        throw new T("Failed to base64url decode the iv");
      }
      let o;
      try {
        o = z(n.tag);
      } catch {
        throw new T("Failed to base64url decode the tag");
      }
      return Za(e, t, r, i, o);
    }
    default:
      throw new J('Invalid or unsupported "alg" (JWE Algorithm) header value');
  }
}
function Dr(e, t, r, n, s) {
  if (s.crit !== void 0 && (n == null ? void 0 : n.crit) === void 0)
    throw new e('"crit" (Critical) Header Parameter MUST be integrity protected');
  if (!n || n.crit === void 0)
    return /* @__PURE__ */ new Set();
  if (!Array.isArray(n.crit) || n.crit.length === 0 || n.crit.some((i) => typeof i != "string" || i.length === 0))
    throw new e('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
  let a;
  r !== void 0 ? a = new Map([...Object.entries(r), ...t.entries()]) : a = t;
  for (const i of n.crit) {
    if (!a.has(i))
      throw new J(`Extension Header Parameter "${i}" is not recognized`);
    if (s[i] === void 0)
      throw new e(`Extension Header Parameter "${i}" is missing`);
    if (a.get(i) && n[i] === void 0)
      throw new e(`Extension Header Parameter "${i}" MUST be integrity protected`);
  }
  return new Set(n.crit);
}
const wr = (e, t) => {
  if (t !== void 0 && (!Array.isArray(t) || t.some((r) => typeof r != "string")))
    throw new TypeError(`"${e}" option must be an array of strings`);
  if (t)
    return new Set(t);
};
async function ei(e, t, r) {
  if (!ee(e))
    throw new T("Flattened JWE must be an object");
  if (e.protected === void 0 && e.header === void 0 && e.unprotected === void 0)
    throw new T("JOSE Header missing");
  if (e.iv !== void 0 && typeof e.iv != "string")
    throw new T("JWE Initialization Vector incorrect type");
  if (typeof e.ciphertext != "string")
    throw new T("JWE Ciphertext missing or incorrect type");
  if (e.tag !== void 0 && typeof e.tag != "string")
    throw new T("JWE Authentication Tag incorrect type");
  if (e.protected !== void 0 && typeof e.protected != "string")
    throw new T("JWE Protected Header incorrect type");
  if (e.encrypted_key !== void 0 && typeof e.encrypted_key != "string")
    throw new T("JWE Encrypted Key incorrect type");
  if (e.aad !== void 0 && typeof e.aad != "string")
    throw new T("JWE AAD incorrect type");
  if (e.header !== void 0 && !ee(e.header))
    throw new T("JWE Shared Unprotected Header incorrect type");
  if (e.unprotected !== void 0 && !ee(e.unprotected))
    throw new T("JWE Per-Recipient Unprotected Header incorrect type");
  let n;
  if (e.protected)
    try {
      const c = z(e.protected);
      n = JSON.parse(Te.decode(c));
    } catch {
      throw new T("JWE Protected Header is invalid");
    }
  if (!Cr(n, e.header, e.unprotected))
    throw new T("JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint");
  const s = {
    ...n,
    ...e.header,
    ...e.unprotected
  };
  if (Dr(T, /* @__PURE__ */ new Map(), r == null ? void 0 : r.crit, n, s), s.zip !== void 0)
    throw new J('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
  const { alg: a, enc: i } = s;
  if (typeof a != "string" || !a)
    throw new T("missing JWE Algorithm (alg) in JWE Header");
  if (typeof i != "string" || !i)
    throw new T("missing JWE Encryption Algorithm (enc) in JWE Header");
  const o = r && wr("keyManagementAlgorithms", r.keyManagementAlgorithms), d = r && wr("contentEncryptionAlgorithms", r.contentEncryptionAlgorithms);
  if (o && !o.has(a) || !o && a.startsWith("PBES2"))
    throw new pt('"alg" (Algorithm) Header Parameter value not allowed');
  if (d && !d.has(i))
    throw new pt('"enc" (Encryption Algorithm) Header Parameter value not allowed');
  let u;
  if (e.encrypted_key !== void 0)
    try {
      u = z(e.encrypted_key);
    } catch {
      throw new T("Failed to base64url decode the encrypted_key");
    }
  let g = !1;
  typeof t == "function" && (t = await t(n, e), g = !0);
  let y;
  try {
    y = await Qa(a, t, u, s, r);
  } catch (c) {
    if (c instanceof TypeError || c instanceof T || c instanceof J)
      throw c;
    y = Ne(i);
  }
  let b, S;
  if (e.iv !== void 0)
    try {
      b = z(e.iv);
    } catch {
      throw new T("Failed to base64url decode the iv");
    }
  if (e.tag !== void 0)
    try {
      S = z(e.tag);
    } catch {
      throw new T("Failed to base64url decode the tag");
    }
  const _ = V.encode(e.protected ?? "");
  let E;
  e.aad !== void 0 ? E = de(_, V.encode("."), V.encode(e.aad)) : E = _;
  let m;
  try {
    m = z(e.ciphertext);
  } catch {
    throw new T("Failed to base64url decode the ciphertext");
  }
  const l = { plaintext: await ts(i, y, m, b, S, E) };
  if (e.protected !== void 0 && (l.protectedHeader = n), e.aad !== void 0)
    try {
      l.additionalAuthenticatedData = z(e.aad);
    } catch {
      throw new T("Failed to base64url decode the aad");
    }
  return e.unprotected !== void 0 && (l.sharedUnprotectedHeader = e.unprotected), e.header !== void 0 && (l.unprotectedHeader = e.header), g ? { ...l, key: t } : l;
}
async function ti(e, t, r) {
  if (e instanceof Uint8Array && (e = Te.decode(e)), typeof e != "string")
    throw new T("Compact JWE must be a string or Uint8Array");
  const { 0: n, 1: s, 2: a, 3: i, 4: o, length: d } = e.split(".");
  if (d !== 5)
    throw new T("Invalid Compact JWE");
  const u = await ei({
    ciphertext: i,
    iv: a || void 0,
    protected: n,
    tag: o || void 0,
    encrypted_key: s || void 0
  }, t, r), g = { plaintext: u.plaintext, protectedHeader: u.protectedHeader };
  return typeof t == "function" ? { ...g, key: u.key } : g;
}
const ri = Symbol(), ni = async (e) => {
  if (e instanceof Uint8Array)
    return {
      kty: "oct",
      k: Q(e)
    };
  if (!te(e))
    throw new TypeError(X(e, ...Y, "Uint8Array"));
  if (!e.extractable)
    throw new TypeError("non-extractable CryptoKey cannot be exported as a JWK");
  const { ext: t, key_ops: r, alg: n, use: s, ...a } = await O.subtle.exportKey("jwk", e);
  return a;
};
async function si(e) {
  return ni(e);
}
async function ai(e, t, r, n, s = {}) {
  var d;
  let a, i, o;
  switch (ls(e, r, "encrypt"), r = await ((d = Ee.normalizePublicKey) == null ? void 0 : d.call(Ee, r, e)) || r, e) {
    case "dir": {
      o = r;
      break;
    }
    case "ECDH-ES":
    case "ECDH-ES+A128KW":
    case "ECDH-ES+A192KW":
    case "ECDH-ES+A256KW": {
      if (!as(r))
        throw new J("ECDH with the provided key is not allowed or not supported by your javascript runtime");
      const { apu: u, apv: g } = s;
      let { epk: y } = s;
      y || (y = (await Oa(r)).privateKey);
      const { x: b, y: S, crv: _, kty: E } = await si(y), m = await ss(r, y, e === "ECDH-ES" ? t : e, e === "ECDH-ES" ? Ir(t) : parseInt(e.slice(-5, -2), 10), u, g);
      if (i = { epk: { x: b, crv: _, kty: E } }, E === "EC" && (i.epk.y = S), u && (i.apu = Q(u)), g && (i.apv = Q(g)), e === "ECDH-ES") {
        o = m;
        break;
      }
      o = n || Ne(t);
      const p = e.slice(-6);
      a = await fr(p, m, o);
      break;
    }
    case "RSA1_5":
    case "RSA-OAEP":
    case "RSA-OAEP-256":
    case "RSA-OAEP-384":
    case "RSA-OAEP-512": {
      o = n || Ne(t), a = await Ka(e, r, o);
      break;
    }
    case "PBES2-HS256+A128KW":
    case "PBES2-HS384+A192KW":
    case "PBES2-HS512+A256KW": {
      o = n || Ne(t);
      const { p2c: u, p2s: g } = s;
      ({ encryptedKey: a, ...i } = await Da(e, r, o, u, g));
      break;
    }
    case "A128KW":
    case "A192KW":
    case "A256KW": {
      o = n || Ne(t), a = await fr(e, r, o);
      break;
    }
    case "A128GCMKW":
    case "A192GCMKW":
    case "A256GCMKW": {
      o = n || Ne(t);
      const { iv: u } = s;
      ({ encryptedKey: a, ...i } = await Ya(e, r, o, u));
      break;
    }
    default:
      throw new J('Invalid or unsupported "alg" (JWE Algorithm) header value');
  }
  return { cek: o, encryptedKey: a, parameters: i };
}
class ii {
  constructor(t) {
    if (!(t instanceof Uint8Array))
      throw new TypeError("plaintext must be an instance of Uint8Array");
    this._plaintext = t;
  }
  setKeyManagementParameters(t) {
    if (this._keyManagementParameters)
      throw new TypeError("setKeyManagementParameters can only be called once");
    return this._keyManagementParameters = t, this;
  }
  setProtectedHeader(t) {
    if (this._protectedHeader)
      throw new TypeError("setProtectedHeader can only be called once");
    return this._protectedHeader = t, this;
  }
  setSharedUnprotectedHeader(t) {
    if (this._sharedUnprotectedHeader)
      throw new TypeError("setSharedUnprotectedHeader can only be called once");
    return this._sharedUnprotectedHeader = t, this;
  }
  setUnprotectedHeader(t) {
    if (this._unprotectedHeader)
      throw new TypeError("setUnprotectedHeader can only be called once");
    return this._unprotectedHeader = t, this;
  }
  setAdditionalAuthenticatedData(t) {
    return this._aad = t, this;
  }
  setContentEncryptionKey(t) {
    if (this._cek)
      throw new TypeError("setContentEncryptionKey can only be called once");
    return this._cek = t, this;
  }
  setInitializationVector(t) {
    if (this._iv)
      throw new TypeError("setInitializationVector can only be called once");
    return this._iv = t, this;
  }
  async encrypt(t, r) {
    if (!this._protectedHeader && !this._unprotectedHeader && !this._sharedUnprotectedHeader)
      throw new T("either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()");
    if (!Cr(this._protectedHeader, this._unprotectedHeader, this._sharedUnprotectedHeader))
      throw new T("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
    const n = {
      ...this._protectedHeader,
      ...this._unprotectedHeader,
      ...this._sharedUnprotectedHeader
    };
    if (Dr(T, /* @__PURE__ */ new Map(), r == null ? void 0 : r.crit, this._protectedHeader, n), n.zip !== void 0)
      throw new J('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
    const { alg: s, enc: a } = n;
    if (typeof s != "string" || !s)
      throw new T('JWE "alg" (Algorithm) Header Parameter missing or invalid');
    if (typeof a != "string" || !a)
      throw new T('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
    let i;
    if (this._cek && (s === "dir" || s === "ECDH-ES"))
      throw new TypeError(`setContentEncryptionKey cannot be called with JWE "alg" (Algorithm) Header ${s}`);
    let o;
    {
      let E;
      ({ cek: o, encryptedKey: i, parameters: E } = await ai(s, a, t, this._cek, this._keyManagementParameters)), E && (r && ri in r ? this._unprotectedHeader ? this._unprotectedHeader = { ...this._unprotectedHeader, ...E } : this.setUnprotectedHeader(E) : this._protectedHeader ? this._protectedHeader = { ...this._protectedHeader, ...E } : this.setProtectedHeader(E));
    }
    let d, u, g;
    this._protectedHeader ? u = V.encode(Q(JSON.stringify(this._protectedHeader))) : u = V.encode(""), this._aad ? (g = Q(this._aad), d = de(u, V.encode("."), V.encode(g))) : d = u;
    const { ciphertext: y, tag: b, iv: S } = await hs(a, this._plaintext, o, this._iv, d), _ = {
      ciphertext: Q(y)
    };
    return S && (_.iv = Q(S)), b && (_.tag = Q(b)), i && (_.encrypted_key = Q(i)), g && (_.aad = g), this._protectedHeader && (_.protected = Te.decode(u)), this._sharedUnprotectedHeader && (_.unprotected = this._sharedUnprotectedHeader), this._unprotectedHeader && (_.header = this._unprotectedHeader), _;
  }
}
function oi(e, t) {
  const r = `SHA-${e.slice(-3)}`;
  switch (e) {
    case "HS256":
    case "HS384":
    case "HS512":
      return { hash: r, name: "HMAC" };
    case "PS256":
    case "PS384":
    case "PS512":
      return { hash: r, name: "RSA-PSS", saltLength: e.slice(-3) >> 3 };
    case "RS256":
    case "RS384":
    case "RS512":
      return { hash: r, name: "RSASSA-PKCS1-v1_5" };
    case "ES256":
    case "ES384":
    case "ES512":
      return { hash: r, name: "ECDSA", namedCurve: t.namedCurve };
    case "EdDSA":
      return { name: t.name };
    default:
      throw new J(`alg ${e} is not supported either by JOSE or your javascript runtime`);
  }
}
async function ci(e, t, r) {
  if (t = await Ee.normalizePublicKey(t, e), te(t))
    return ka(t, e, r), t;
  if (t instanceof Uint8Array) {
    if (!e.startsWith("HS"))
      throw new TypeError(X(t, ...Y));
    return O.subtle.importKey("raw", t, { hash: `SHA-${e.slice(-3)}`, name: "HMAC" }, !1, [r]);
  }
  throw new TypeError(X(t, ...Y, "Uint8Array", "JSON Web Key"));
}
const ui = async (e, t, r, n) => {
  const s = await ci(e, t, "verify");
  Or(e, s);
  const a = oi(e, s.algorithm);
  try {
    return await O.subtle.verify(a, s, r, n);
  } catch {
    return !1;
  }
};
async function fs(e, t, r) {
  if (!ee(e))
    throw new q("Flattened JWS must be an object");
  if (e.protected === void 0 && e.header === void 0)
    throw new q('Flattened JWS must have either of the "protected" or "header" members');
  if (e.protected !== void 0 && typeof e.protected != "string")
    throw new q("JWS Protected Header incorrect type");
  if (e.payload === void 0)
    throw new q("JWS Payload missing");
  if (typeof e.signature != "string")
    throw new q("JWS Signature missing or incorrect type");
  if (e.header !== void 0 && !ee(e.header))
    throw new q("JWS Unprotected Header incorrect type");
  let n = {};
  if (e.protected)
    try {
      const E = z(e.protected);
      n = JSON.parse(Te.decode(E));
    } catch {
      throw new q("JWS Protected Header is invalid");
    }
  if (!Cr(n, e.header))
    throw new q("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
  const s = {
    ...n,
    ...e.header
  }, a = Dr(q, /* @__PURE__ */ new Map([["b64", !0]]), r == null ? void 0 : r.crit, n, s);
  let i = !0;
  if (a.has("b64") && (i = n.b64, typeof i != "boolean"))
    throw new q('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
  const { alg: o } = s;
  if (typeof o != "string" || !o)
    throw new q('JWS "alg" (Algorithm) Header Parameter missing or invalid');
  const d = r && wr("algorithms", r.algorithms);
  if (d && !d.has(o))
    throw new pt('"alg" (Algorithm) Header Parameter value not allowed');
  if (i) {
    if (typeof e.payload != "string")
      throw new q("JWS Payload must be a string");
  } else if (typeof e.payload != "string" && !(e.payload instanceof Uint8Array))
    throw new q("JWS Payload must be a string or an Uint8Array instance");
  let u = !1;
  typeof t == "function" ? (t = await t(n, e), u = !0, Cn(o, t, "verify"), $e(t) && (t = await Nr(t, o))) : Cn(o, t, "verify");
  const g = de(V.encode(e.protected ?? ""), V.encode("."), typeof e.payload == "string" ? V.encode(e.payload) : e.payload);
  let y;
  try {
    y = z(e.signature);
  } catch {
    throw new q("Failed to base64url decode the signature");
  }
  if (!await ui(o, t, y, g))
    throw new Fn();
  let S;
  if (i)
    try {
      S = z(e.payload);
    } catch {
      throw new q("Failed to base64url decode the payload");
    }
  else typeof e.payload == "string" ? S = V.encode(e.payload) : S = e.payload;
  const _ = { payload: S };
  return e.protected !== void 0 && (_.protectedHeader = n), e.header !== void 0 && (_.unprotectedHeader = e.header), u ? { ..._, key: t } : _;
}
async function di(e, t, r) {
  if (e instanceof Uint8Array && (e = Te.decode(e)), typeof e != "string")
    throw new q("Compact JWS must be a string or Uint8Array");
  const { 0: n, 1: s, 2: a, length: i } = e.split(".");
  if (i !== 3)
    throw new q("Invalid Compact JWS");
  const o = await fs({ payload: s, protected: n, signature: a }, t, r), d = { payload: o.payload, protectedHeader: o.protectedHeader };
  return typeof t == "function" ? { ...d, key: o.key } : d;
}
const me = (e) => Math.floor(e.getTime() / 1e3), ps = 60, ms = ps * 60, Ur = ms * 24, li = Ur * 7, hi = Ur * 365.25, fi = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i, Be = (e) => {
  const t = fi.exec(e);
  if (!t || t[4] && t[1])
    throw new TypeError("Invalid time period format");
  const r = parseFloat(t[2]), n = t[3].toLowerCase();
  let s;
  switch (n) {
    case "sec":
    case "secs":
    case "second":
    case "seconds":
    case "s":
      s = Math.round(r);
      break;
    case "minute":
    case "minutes":
    case "min":
    case "mins":
    case "m":
      s = Math.round(r * ps);
      break;
    case "hour":
    case "hours":
    case "hr":
    case "hrs":
    case "h":
      s = Math.round(r * ms);
      break;
    case "day":
    case "days":
    case "d":
      s = Math.round(r * Ur);
      break;
    case "week":
    case "weeks":
    case "w":
      s = Math.round(r * li);
      break;
    default:
      s = Math.round(r * hi);
      break;
  }
  return t[1] === "-" || t[4] === "ago" ? -s : s;
}, On = (e) => e.toLowerCase().replace(/^application\//, ""), pi = (e, t) => typeof e == "string" ? t.includes(e) : Array.isArray(e) ? t.some(Set.prototype.has.bind(new Set(e))) : !1, ws = (e, t, r = {}) => {
  let n;
  try {
    n = JSON.parse(Te.decode(t));
  } catch {
  }
  if (!ee(n))
    throw new Tr("JWT Claims Set must be a top-level JSON object");
  const { typ: s } = r;
  if (s && (typeof e.typ != "string" || On(e.typ) !== On(s)))
    throw new Z('unexpected "typ" JWT header value', n, "typ", "check_failed");
  const { requiredClaims: a = [], issuer: i, subject: o, audience: d, maxTokenAge: u } = r, g = [...a];
  u !== void 0 && g.push("iat"), d !== void 0 && g.push("aud"), o !== void 0 && g.push("sub"), i !== void 0 && g.push("iss");
  for (const _ of new Set(g.reverse()))
    if (!(_ in n))
      throw new Z(`missing required "${_}" claim`, n, _, "missing");
  if (i && !(Array.isArray(i) ? i : [i]).includes(n.iss))
    throw new Z('unexpected "iss" claim value', n, "iss", "check_failed");
  if (o && n.sub !== o)
    throw new Z('unexpected "sub" claim value', n, "sub", "check_failed");
  if (d && !pi(n.aud, typeof d == "string" ? [d] : d))
    throw new Z('unexpected "aud" claim value', n, "aud", "check_failed");
  let y;
  switch (typeof r.clockTolerance) {
    case "string":
      y = Be(r.clockTolerance);
      break;
    case "number":
      y = r.clockTolerance;
      break;
    case "undefined":
      y = 0;
      break;
    default:
      throw new TypeError("Invalid clockTolerance option type");
  }
  const { currentDate: b } = r, S = me(b || /* @__PURE__ */ new Date());
  if ((n.iat !== void 0 || u) && typeof n.iat != "number")
    throw new Z('"iat" claim must be a number', n, "iat", "invalid");
  if (n.nbf !== void 0) {
    if (typeof n.nbf != "number")
      throw new Z('"nbf" claim must be a number', n, "nbf", "invalid");
    if (n.nbf > S + y)
      throw new Z('"nbf" claim timestamp check failed', n, "nbf", "check_failed");
  }
  if (n.exp !== void 0) {
    if (typeof n.exp != "number")
      throw new Z('"exp" claim must be a number', n, "exp", "invalid");
    if (n.exp <= S - y)
      throw new hr('"exp" claim timestamp check failed', n, "exp", "check_failed");
  }
  if (u) {
    const _ = S - n.iat, E = typeof u == "number" ? u : Be(u);
    if (_ - y > E)
      throw new hr('"iat" claim timestamp check failed (too far in the past)', n, "iat", "check_failed");
    if (_ < 0 - y)
      throw new Z('"iat" claim timestamp check failed (it should be in the past)', n, "iat", "check_failed");
  }
  return n;
};
async function mi(e, t, r) {
  var i;
  const n = await di(e, t, r);
  if ((i = n.protectedHeader.crit) != null && i.includes("b64") && n.protectedHeader.b64 === !1)
    throw new Tr("JWTs MUST NOT use unencoded payload");
  const a = { payload: ws(n.protectedHeader, n.payload, r), protectedHeader: n.protectedHeader };
  return typeof t == "function" ? { ...a, key: n.key } : a;
}
async function wi(e, t, r) {
  const n = await ti(e, t, r), s = ws(n.protectedHeader, n.plaintext, r), { protectedHeader: a } = n;
  if (a.iss !== void 0 && a.iss !== s.iss)
    throw new Z('replicated "iss" claim header parameter mismatch', s, "iss", "mismatch");
  if (a.sub !== void 0 && a.sub !== s.sub)
    throw new Z('replicated "sub" claim header parameter mismatch', s, "sub", "mismatch");
  if (a.aud !== void 0 && JSON.stringify(a.aud) !== JSON.stringify(s.aud))
    throw new Z('replicated "aud" claim header parameter mismatch', s, "aud", "mismatch");
  const i = { payload: s, protectedHeader: a };
  return typeof t == "function" ? { ...i, key: n.key } : i;
}
class yi {
  constructor(t) {
    this._flattened = new ii(t);
  }
  setContentEncryptionKey(t) {
    return this._flattened.setContentEncryptionKey(t), this;
  }
  setInitializationVector(t) {
    return this._flattened.setInitializationVector(t), this;
  }
  setProtectedHeader(t) {
    return this._flattened.setProtectedHeader(t), this;
  }
  setKeyManagementParameters(t) {
    return this._flattened.setKeyManagementParameters(t), this;
  }
  async encrypt(t, r) {
    const n = await this._flattened.encrypt(t, r);
    return [n.protected, n.encrypted_key, n.iv, n.ciphertext, n.tag].join(".");
  }
}
function be(e, t) {
  if (!Number.isFinite(t))
    throw new TypeError(`Invalid ${e} input`);
  return t;
}
class gi {
  constructor(t = {}) {
    if (!ee(t))
      throw new TypeError("JWT Claims Set MUST be an object");
    this._payload = t;
  }
  setIssuer(t) {
    return this._payload = { ...this._payload, iss: t }, this;
  }
  setSubject(t) {
    return this._payload = { ...this._payload, sub: t }, this;
  }
  setAudience(t) {
    return this._payload = { ...this._payload, aud: t }, this;
  }
  setJti(t) {
    return this._payload = { ...this._payload, jti: t }, this;
  }
  setNotBefore(t) {
    return typeof t == "number" ? this._payload = { ...this._payload, nbf: be("setNotBefore", t) } : t instanceof Date ? this._payload = { ...this._payload, nbf: be("setNotBefore", me(t)) } : this._payload = { ...this._payload, nbf: me(/* @__PURE__ */ new Date()) + Be(t) }, this;
  }
  setExpirationTime(t) {
    return typeof t == "number" ? this._payload = { ...this._payload, exp: be("setExpirationTime", t) } : t instanceof Date ? this._payload = { ...this._payload, exp: be("setExpirationTime", me(t)) } : this._payload = { ...this._payload, exp: me(/* @__PURE__ */ new Date()) + Be(t) }, this;
  }
  setIssuedAt(t) {
    return typeof t > "u" ? this._payload = { ...this._payload, iat: me(/* @__PURE__ */ new Date()) } : t instanceof Date ? this._payload = { ...this._payload, iat: be("setIssuedAt", me(t)) } : typeof t == "string" ? this._payload = {
      ...this._payload,
      iat: be("setIssuedAt", me(/* @__PURE__ */ new Date()) + Be(t))
    } : this._payload = { ...this._payload, iat: be("setIssuedAt", t) }, this;
  }
}
class bi extends gi {
  setProtectedHeader(t) {
    if (this._protectedHeader)
      throw new TypeError("setProtectedHeader can only be called once");
    return this._protectedHeader = t, this;
  }
  setKeyManagementParameters(t) {
    if (this._keyManagementParameters)
      throw new TypeError("setKeyManagementParameters can only be called once");
    return this._keyManagementParameters = t, this;
  }
  setContentEncryptionKey(t) {
    if (this._cek)
      throw new TypeError("setContentEncryptionKey can only be called once");
    return this._cek = t, this;
  }
  setInitializationVector(t) {
    if (this._iv)
      throw new TypeError("setInitializationVector can only be called once");
    return this._iv = t, this;
  }
  replicateIssuerAsHeader() {
    return this._replicateIssuerAsHeader = !0, this;
  }
  replicateSubjectAsHeader() {
    return this._replicateSubjectAsHeader = !0, this;
  }
  replicateAudienceAsHeader() {
    return this._replicateAudienceAsHeader = !0, this;
  }
  async encrypt(t, r) {
    const n = new yi(V.encode(JSON.stringify(this._payload)));
    return this._replicateIssuerAsHeader && (this._protectedHeader = { ...this._protectedHeader, iss: this._payload.iss }), this._replicateSubjectAsHeader && (this._protectedHeader = { ...this._protectedHeader, sub: this._payload.sub }), this._replicateAudienceAsHeader && (this._protectedHeader = { ...this._protectedHeader, aud: this._payload.aud }), n.setProtectedHeader(this._protectedHeader), this._iv && n.setInitializationVector(this._iv), this._cek && n.setContentEncryptionKey(this._cek), this._keyManagementParameters && n.setKeyManagementParameters(this._keyManagementParameters), n.encrypt(t, r);
  }
}
function Si(e) {
  switch (typeof e == "string" && e.slice(0, 2)) {
    case "RS":
    case "PS":
      return "RSA";
    case "ES":
      return "EC";
    case "Ed":
      return "OKP";
    default:
      throw new J('Unsupported "alg" value for a JSON Web Key Set');
  }
}
function _i(e) {
  return e && typeof e == "object" && Array.isArray(e.keys) && e.keys.every(Ei);
}
function Ei(e) {
  return ee(e);
}
function ys(e) {
  return typeof structuredClone == "function" ? structuredClone(e) : JSON.parse(JSON.stringify(e));
}
class Ai {
  constructor(t) {
    if (this._cached = /* @__PURE__ */ new WeakMap(), !_i(t))
      throw new kr("JSON Web Key Set malformed");
    this._jwks = ys(t);
  }
  async getKey(t, r) {
    const { alg: n, kid: s } = { ...t, ...r == null ? void 0 : r.header }, a = Si(n), i = this._jwks.keys.filter((u) => {
      let g = a === u.kty;
      if (g && typeof s == "string" && (g = s === u.kid), g && typeof u.alg == "string" && (g = n === u.alg), g && typeof u.use == "string" && (g = u.use === "sig"), g && Array.isArray(u.key_ops) && (g = u.key_ops.includes("verify")), g && n === "EdDSA" && (g = u.crv === "Ed25519" || u.crv === "Ed448"), g)
        switch (n) {
          case "ES256":
            g = u.crv === "P-256";
            break;
          case "ES256K":
            g = u.crv === "secp256k1";
            break;
          case "ES384":
            g = u.crv === "P-384";
            break;
          case "ES512":
            g = u.crv === "P-521";
            break;
        }
      return g;
    }), { 0: o, length: d } = i;
    if (d === 0)
      throw new xr();
    if (d !== 1) {
      const u = new jn(), { _cached: g } = this;
      throw u[Symbol.asyncIterator] = async function* () {
        for (const y of i)
          try {
            yield await In(g, y, n);
          } catch {
          }
      }, u;
    }
    return In(this._cached, o, n);
  }
}
async function In(e, t, r) {
  const n = e.get(t) || e.set(t, {}).get(t);
  if (n[r] === void 0) {
    const s = await Nr({ ...t, ext: !0 }, r);
    if (s instanceof Uint8Array || s.type !== "public")
      throw new kr("JSON Web Key Set members must be public keys");
    n[r] = s;
  }
  return n[r];
}
function Nn(e) {
  const t = new Ai(e), r = async (n, s) => t.getKey(n, s);
  return Object.defineProperties(r, {
    jwks: {
      value: () => ys(t._jwks),
      enumerable: !0,
      configurable: !1,
      writable: !1
    }
  }), r;
}
const vi = async (e, t, r) => {
  let n, s, a = !1;
  typeof AbortController == "function" && (n = new AbortController(), s = setTimeout(() => {
    a = !0, n.abort();
  }, t));
  const i = await fetch(e.href, {
    signal: n ? n.signal : void 0,
    redirect: "manual",
    headers: r.headers
  }).catch((o) => {
    throw a ? new Gn() : o;
  });
  if (s !== void 0 && clearTimeout(s), i.status !== 200)
    throw new F("Expected 200 OK from the JSON Web Key Set HTTP response");
  try {
    return await i.json();
  } catch {
    throw new F("Failed to parse the JSON Web Key Set HTTP response as JSON");
  }
};
function Ri() {
  return typeof WebSocketPair < "u" || typeof navigator < "u" && navigator.userAgent === "Cloudflare-Workers" || typeof EdgeRuntime < "u" && EdgeRuntime === "vercel";
}
let yr;
var ct, Ln;
(typeof navigator > "u" || !((Ln = (ct = navigator.userAgent) == null ? void 0 : ct.startsWith) != null && Ln.call(ct, "Mozilla/5.0 "))) && (yr = "jose/v5.9.6");
const lt = Symbol();
function Ti(e, t) {
  return !(typeof e != "object" || e === null || !("uat" in e) || typeof e.uat != "number" || Date.now() - e.uat >= t || !("jwks" in e) || !ee(e.jwks) || !Array.isArray(e.jwks.keys) || !Array.prototype.every.call(e.jwks.keys, ee));
}
class ki {
  constructor(t, r) {
    if (!(t instanceof URL))
      throw new TypeError("url must be an instance of URL");
    this._url = new URL(t.href), this._options = { agent: r == null ? void 0 : r.agent, headers: r == null ? void 0 : r.headers }, this._timeoutDuration = typeof (r == null ? void 0 : r.timeoutDuration) == "number" ? r == null ? void 0 : r.timeoutDuration : 5e3, this._cooldownDuration = typeof (r == null ? void 0 : r.cooldownDuration) == "number" ? r == null ? void 0 : r.cooldownDuration : 3e4, this._cacheMaxAge = typeof (r == null ? void 0 : r.cacheMaxAge) == "number" ? r == null ? void 0 : r.cacheMaxAge : 6e5, (r == null ? void 0 : r[lt]) !== void 0 && (this._cache = r == null ? void 0 : r[lt], Ti(r == null ? void 0 : r[lt], this._cacheMaxAge) && (this._jwksTimestamp = this._cache.uat, this._local = Nn(this._cache.jwks)));
  }
  coolingDown() {
    return typeof this._jwksTimestamp == "number" ? Date.now() < this._jwksTimestamp + this._cooldownDuration : !1;
  }
  fresh() {
    return typeof this._jwksTimestamp == "number" ? Date.now() < this._jwksTimestamp + this._cacheMaxAge : !1;
  }
  async getKey(t, r) {
    (!this._local || !this.fresh()) && await this.reload();
    try {
      return await this._local(t, r);
    } catch (n) {
      if (n instanceof xr && this.coolingDown() === !1)
        return await this.reload(), this._local(t, r);
      throw n;
    }
  }
  async reload() {
    this._pendingFetch && Ri() && (this._pendingFetch = void 0);
    const t = new Headers(this._options.headers);
    yr && !t.has("User-Agent") && (t.set("User-Agent", yr), this._options.headers = Object.fromEntries(t.entries())), this._pendingFetch || (this._pendingFetch = vi(this._url, this._timeoutDuration, this._options).then((r) => {
      this._local = Nn(r), this._cache && (this._cache.uat = Date.now(), this._cache.jwks = r), this._jwksTimestamp = Date.now(), this._pendingFetch = void 0;
    }).catch((r) => {
      throw this._pendingFetch = void 0, r;
    })), await this._pendingFetch;
  }
}
function xi(e, t) {
  const r = new ki(e, t), n = async (s, a) => r.getKey(s, a);
  return Object.defineProperties(n, {
    coolingDown: {
      get: () => r.coolingDown(),
      enumerable: !0,
      configurable: !1
    },
    fresh: {
      get: () => r.fresh(),
      enumerable: !0,
      configurable: !1
    },
    reload: {
      value: () => r.reload(),
      enumerable: !0,
      configurable: !1,
      writable: !1
    },
    reloading: {
      get: () => !!r._pendingFetch,
      enumerable: !0,
      configurable: !1
    },
    jwks: {
      value: () => {
        var s;
        return (s = r._local) == null ? void 0 : s.jwks();
      },
      enumerable: !0,
      configurable: !1,
      writable: !1
    }
  }), n;
}
const Pi = Q;
let gr;
var ut, qn;
(typeof navigator > "u" || !((qn = (ut = navigator.userAgent) == null ? void 0 : ut.startsWith) != null && qn.call(ut, "Mozilla/5.0 "))) && (gr = "oauth4webapi/v3.1.4");
function Ze(e, t) {
  if (e == null)
    return !1;
  try {
    return e instanceof t || Object.getPrototypeOf(e)[Symbol.toStringTag] === t.prototype[Symbol.toStringTag];
  } catch {
    return !1;
  }
}
const ae = "ERR_INVALID_ARG_VALUE", re = "ERR_INVALID_ARG_TYPE";
function $(e, t, r) {
  const n = new TypeError(e, { cause: r });
  return Object.assign(n, { code: t }), n;
}
const we = Symbol(), Ci = Symbol(), Oi = Symbol(), _e = Symbol(), br = Symbol(), Ii = new TextEncoder(), Ni = new TextDecoder();
function Ke(e) {
  return typeof e == "string" ? Ii.encode(e) : Ni.decode(e);
}
const Dn = 32768;
function Di(e) {
  e instanceof ArrayBuffer && (e = new Uint8Array(e));
  const t = [];
  for (let r = 0; r < e.byteLength; r += Dn)
    t.push(String.fromCharCode.apply(null, e.subarray(r, r + Dn)));
  return btoa(t.join("")).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function Ui(e) {
  try {
    const t = atob(e.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "")), r = new Uint8Array(t.length);
    for (let n = 0; n < t.length; n++)
      r[n] = t.charCodeAt(n);
    return r;
  } catch (t) {
    throw $("The input to be decoded is not correctly encoded.", ae, t);
  }
}
function Ae(e) {
  return typeof e == "string" ? Ui(e) : Di(e);
}
class ie extends Error {
  constructor(r, n) {
    var s;
    super(r, n);
    j(this, "code");
    this.name = this.constructor.name, this.code = Ro, (s = Error.captureStackTrace) == null || s.call(Error, this, this.constructor);
  }
}
class Ki extends Error {
  constructor(r, n) {
    var s;
    super(r, n);
    j(this, "code");
    this.name = this.constructor.name, n != null && n.code && (this.code = n == null ? void 0 : n.code), (s = Error.captureStackTrace) == null || s.call(Error, this, this.constructor);
  }
}
function x(e, t, r) {
  return new Ki(e, { code: t, cause: r });
}
function Wi(e, t) {
  if (!(e instanceof CryptoKey))
    throw $(`${t} must be a CryptoKey`, re);
}
function Mi(e, t) {
  if (Wi(e, t), e.type !== "private")
    throw $(`${t} must be a private CryptoKey`, ae);
}
function Me(e) {
  return !(e === null || typeof e != "object" || Array.isArray(e));
}
function Kr(e) {
  Ze(e, Headers) && (e = Object.fromEntries(e.entries()));
  const t = new Headers(e);
  if (gr && !t.has("user-agent") && t.set("user-agent", gr), t.has("authorization"))
    throw $('"options.headers" must not include the "authorization" header name', ae);
  if (t.has("dpop"))
    throw $('"options.headers" must not include the "dpop" header name', ae);
  return t;
}
function gs(e) {
  if (typeof e == "function" && (e = e()), !(e instanceof AbortSignal))
    throw $('"options.signal" must return or be an instance of AbortSignal', re);
  return e;
}
async function Hi(e, t) {
  if (!(e instanceof URL))
    throw $('"issuerIdentifier" must be an instance of URL', re);
  Ss(e, (t == null ? void 0 : t[we]) !== !0);
  const r = new URL(e.href);
  switch (t == null ? void 0 : t.algorithm) {
    case void 0:
    case "oidc":
      r.pathname = `${r.pathname}/.well-known/openid-configuration`.replace("//", "/");
      break;
    case "oauth2":
      r.pathname === "/" ? r.pathname = ".well-known/oauth-authorization-server" : r.pathname = `.well-known/oauth-authorization-server/${r.pathname}`.replace("//", "/");
      break;
    default:
      throw $('"options.algorithm" must be "oidc" (default), or "oauth2"', ae);
  }
  const n = Kr(t == null ? void 0 : t.headers);
  return n.set("accept", "application/json"), ((t == null ? void 0 : t[_e]) || fetch)(r.href, {
    body: void 0,
    headers: Object.fromEntries(n.entries()),
    method: "GET",
    redirect: "manual",
    signal: t != null && t.signal ? gs(t.signal) : void 0
  });
}
function je(e, t, r, n, s) {
  try {
    if (typeof e != "number" || !Number.isFinite(e))
      throw $(`${r} must be a number`, re, s);
    if (e > 0)
      return;
    throw $(`${r} must be a positive number`, ae, s);
  } catch (a) {
    throw n ? x(a.message, n, s) : a;
  }
}
function B(e, t, r, n) {
  try {
    if (typeof e != "string")
      throw $(`${t} must be a string`, re, n);
    if (e.length === 0)
      throw $(`${t} must not be empty`, ae, n);
  } catch (s) {
    throw r ? x(s.message, r, n) : s;
  }
}
async function $i(e, t) {
  if (!(e instanceof URL) && e !== Wn)
    throw $('"expectedIssuer" must be an instance of URL', re);
  if (!Ze(t, Response))
    throw $('"response" must be an instance of Response', re);
  if (t.status !== 200)
    throw x('"response" is not a conform Authorization Server Metadata response (unexpected HTTP status code)', Lr, t);
  kt(t), Rt(t);
  let r;
  try {
    r = await t.json();
  } catch (n) {
    throw x('failed to parse "response" body as JSON', Ve, n);
  }
  if (!Me(r))
    throw x('"response" body must be a top level object', N, { body: r });
  if (B(r.issuer, '"response" body "issuer" property', N, { body: r }), new URL(r.issuer).href !== e.href && e !== Wn)
    throw x('"response" body "issuer" property does not match the expected value', Co, { expected: e.href, body: r, attribute: "issuer" });
  return r;
}
function Rt(e) {
  Li(e, "application/json");
}
function Ji(e, ...t) {
  let r = '"response" content-type must be ';
  if (t.length > 2) {
    const n = t.pop();
    r += `${t.join(", ")}, or ${n}`;
  } else t.length === 2 ? r += `${t[0]} or ${t[1]}` : r += t[0];
  return x(r, ko, e);
}
function Li(e, t) {
  if (lo(e) !== t)
    throw Ji(e, t);
}
function Tt() {
  return Ae(crypto.getRandomValues(new Uint8Array(32)));
}
function qi() {
  return Tt();
}
function zi() {
  return Tt();
}
function Bi() {
  return Tt();
}
async function ji(e) {
  return B(e, "codeVerifier"), Ae(await crypto.subtle.digest("SHA-256", Ke(e)));
}
function Gi(e) {
  return e instanceof CryptoKey ? { key: e } : (e == null ? void 0 : e.key) instanceof CryptoKey ? (e.kid !== void 0 && B(e.kid, '"kid"'), {
    key: e.key,
    kid: e.kid
  }) : {};
}
function Fi(e) {
  switch (e.algorithm.hash.name) {
    case "SHA-256":
      return "PS256";
    case "SHA-384":
      return "PS384";
    case "SHA-512":
      return "PS512";
    default:
      throw new ie("unsupported RsaHashedKeyAlgorithm hash name", {
        cause: e
      });
  }
}
function Vi(e) {
  switch (e.algorithm.hash.name) {
    case "SHA-256":
      return "RS256";
    case "SHA-384":
      return "RS384";
    case "SHA-512":
      return "RS512";
    default:
      throw new ie("unsupported RsaHashedKeyAlgorithm hash name", {
        cause: e
      });
  }
}
function Xi(e) {
  switch (e.algorithm.namedCurve) {
    case "P-256":
      return "ES256";
    case "P-384":
      return "ES384";
    case "P-521":
      return "ES512";
    default:
      throw new ie("unsupported EcKeyAlgorithm namedCurve", { cause: e });
  }
}
function Yi(e) {
  switch (e.algorithm.name) {
    case "RSA-PSS":
      return Fi(e);
    case "RSASSA-PKCS1-v1_5":
      return Vi(e);
    case "ECDSA":
      return Xi(e);
    case "Ed25519":
    case "EdDSA":
      return "Ed25519";
    default:
      throw new ie("unsupported CryptoKey algorithm name", { cause: e });
  }
}
function Wr(e) {
  const t = e == null ? void 0 : e[Ci];
  return typeof t == "number" && Number.isFinite(t) ? t : 0;
}
function bs(e) {
  const t = e == null ? void 0 : e[Oi];
  return typeof t == "number" && Number.isFinite(t) && Math.sign(t) !== -1 ? t : 30;
}
function Mr() {
  return Math.floor(Date.now() / 1e3);
}
function ke(e) {
  if (typeof e != "object" || e === null)
    throw $('"as" must be an object', re);
  B(e.issuer, '"as.issuer"');
}
function xe(e) {
  if (typeof e != "object" || e === null)
    throw $('"client" must be an object', re);
  B(e.client_id, '"client.client_id"');
}
function Zi(e) {
  return B(e, '"clientSecret"'), (t, r, n, s) => {
    n.set("client_id", r.client_id), n.set("client_secret", e);
  };
}
function Qi(e, t) {
  const r = Mr() + Wr(t);
  return {
    jti: Tt(),
    aud: e.issuer,
    exp: r + 60,
    iat: r,
    nbf: r,
    iss: t.client_id,
    sub: t.client_id
  };
}
function eo(e, t) {
  const { key: r, kid: n } = Gi(e);
  return Mi(r, '"clientPrivateKey.key"'), async (s, a, i, o) => {
    const d = { alg: Yi(r), kid: n }, u = Qi(s, a);
    i.set("client_id", a.client_id), i.set("client_assertion_type", "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"), i.set("client_assertion", await to(d, u, r));
  };
}
async function to(e, t, r) {
  if (!r.usages.includes("sign"))
    throw $('CryptoKey instances used for signing assertions must include "sign" in their "usages"', ae);
  const n = `${Ae(Ke(JSON.stringify(e)))}.${Ae(Ke(JSON.stringify(t)))}`, s = Ae(await crypto.subtle.sign(Ko(r), r, Ke(n)));
  return `${n}.${s}`;
}
const ro = URL.parse ? (e, t) => URL.parse(e, t) : (e, t) => {
  try {
    return new URL(e, t);
  } catch {
    return null;
  }
};
function Ss(e, t) {
  if (t && e.protocol !== "https:")
    throw x("only requests to HTTPS are allowed", xo, e);
  if (e.protocol !== "https:" && e.protocol !== "http:")
    throw x("only HTTP and HTTPS requests are allowed", Po, e);
}
function Un(e, t, r, n) {
  let s;
  if (typeof e != "string" || !(s = ro(e)))
    throw x(`authorization server metadata does not contain a valid ${r ? `"as.mtls_endpoint_aliases.${t}"` : `"as.${t}"`}`, e === void 0 ? Oo : Io, { attribute: r ? `mtls_endpoint_aliases.${t}` : t });
  return Ss(s, n), s;
}
function _s(e, t, r, n) {
  return r && e.mtls_endpoint_aliases && t in e.mtls_endpoint_aliases ? Un(e.mtls_endpoint_aliases[t], t, r, n) : Un(e[t], t, r, n);
}
async function no(e, t, r, n, s) {
  var u;
  ke(e), xe(t);
  const a = _s(e, "pushed_authorization_request_endpoint", t.use_mtls_endpoint_aliases, (s == null ? void 0 : s[we]) !== !0), i = new URLSearchParams(n);
  i.set("client_id", t.client_id);
  const o = Kr(s == null ? void 0 : s.headers);
  o.set("accept", "application/json"), (s == null ? void 0 : s.DPoP) !== void 0 && (Rs(s.DPoP), await s.DPoP.addProof(a, o, "POST"));
  const d = await Ts(e, t, r, a, i, o, s);
  return (u = s == null ? void 0 : s.DPoP) == null || u.cacheNonce(d), d;
}
class Es extends Error {
  constructor(r, n) {
    var s;
    super(r, n);
    j(this, "cause");
    j(this, "code");
    j(this, "error");
    j(this, "status");
    j(this, "error_description");
    j(this, "response");
    this.name = this.constructor.name, this.code = vo, this.cause = n.cause, this.error = n.cause.error, this.status = n.response.status, this.error_description = n.cause.error_description, Object.defineProperty(this, "response", { enumerable: !1, value: n.response }), (s = Error.captureStackTrace) == null || s.call(Error, this, this.constructor);
  }
}
class so extends Error {
  constructor(r, n) {
    var s;
    super(r, n);
    j(this, "cause");
    j(this, "code");
    j(this, "error");
    j(this, "error_description");
    this.name = this.constructor.name, this.code = To, this.cause = n.cause, this.error = n.cause.get("error"), this.error_description = n.cause.get("error_description") ?? void 0, (s = Error.captureStackTrace) == null || s.call(Error, this, this.constructor);
  }
}
class As extends Error {
  constructor(r, n) {
    var s;
    super(r, n);
    j(this, "cause");
    j(this, "code");
    j(this, "response");
    j(this, "status");
    this.name = this.constructor.name, this.code = Ao, this.cause = n.cause, this.status = n.response.status, this.response = n.response, Object.defineProperty(this, "response", { enumerable: !1 }), (s = Error.captureStackTrace) == null || s.call(Error, this, this.constructor);
  }
}
function ao(e) {
  return e.length >= 2 && e[0] === '"' && e[e.length - 1] === '"' ? e.slice(1, -1) : e;
}
const io = /((?:,|, )?[0-9a-zA-Z!#$%&'*+-.^_`|~]+=)/, oo = /(?:^|, ?)([0-9a-zA-Z!#$%&'*+\-.^_`|~]+)(?=$|[ ,])/g;
function co(e, t) {
  const r = t.split(io).slice(1);
  if (!r.length)
    return { scheme: e.toLowerCase(), parameters: {} };
  r[r.length - 1] = r[r.length - 1].replace(/,$/, "");
  const n = {};
  for (let s = 1; s < r.length; s += 2) {
    const a = s;
    if (r[a][0] === '"')
      for (; r[a].slice(-1) !== '"' && ++s < r.length; )
        r[a] += r[s];
    const i = r[a - 1].replace(/^(?:, ?)|=$/g, "").toLowerCase();
    n[i] = ao(r[a]);
  }
  return {
    scheme: e.toLowerCase(),
    parameters: n
  };
}
function vs(e) {
  if (!Ze(e, Response))
    throw $('"response" must be an instance of Response', re);
  const t = e.headers.get("www-authenticate");
  if (t === null)
    return;
  const r = [];
  for (const { 1: s, index: a } of t.matchAll(oo))
    r.push([s, a]);
  return r.length ? r.map(([s, a], i, o) => {
    const d = o[i + 1];
    let u;
    return d ? u = t.slice(a, d[1]) : u = t.slice(a), co(s, u);
  }) : void 0;
}
async function uo(e, t, r) {
  var i;
  if (ke(e), xe(t), !Ze(r, Response))
    throw $('"response" must be an instance of Response', re);
  let n;
  if (n = vs(r))
    throw new As("server responded with a challenge in the WWW-Authenticate HTTP Header", { cause: n, response: r });
  if (r.status !== 201) {
    let o;
    throw (o = await Ps(r)) ? (await ((i = r.body) == null ? void 0 : i.cancel()), new Es("server responded with an error in the response body", {
      cause: o,
      response: r
    })) : x('"response" is not a conform Pushed Authorization Request Endpoint response (unexpected HTTP status code)', Lr, r);
  }
  kt(r), Rt(r);
  let s;
  try {
    s = await r.json();
  } catch (o) {
    throw x('failed to parse "response" body as JSON', Ve, o);
  }
  if (!Me(s))
    throw x('"response" body must be a top level object', N, { body: s });
  B(s.request_uri, '"response" body "request_uri" property', N, {
    body: s
  });
  let a = typeof s.expires_in != "number" ? parseFloat(s.expires_in) : s.expires_in;
  return je(a, !1, '"response" body "expires_in" property', N, {
    body: s
  }), s.expires_in = a, s;
}
function Rs(e) {
  if (!Jr.has(e))
    throw $('"options.DPoP" is not a valid DPoPHandle', ae);
}
function lo(e) {
  var t;
  return (t = e.headers.get("content-type")) == null ? void 0 : t.split(";")[0];
}
async function Ts(e, t, r, n, s, a, i) {
  return await r(e, t, s, a), a.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"), ((i == null ? void 0 : i[_e]) || fetch)(n.href, {
    body: s,
    headers: Object.fromEntries(a.entries()),
    method: "POST",
    redirect: "manual",
    signal: i != null && i.signal ? gs(i.signal) : void 0
  });
}
async function Hr(e, t, r, n, s, a) {
  var u;
  const i = _s(e, "token_endpoint", t.use_mtls_endpoint_aliases, (a == null ? void 0 : a[we]) !== !0);
  s.set("grant_type", n);
  const o = Kr(a == null ? void 0 : a.headers);
  o.set("accept", "application/json"), (a == null ? void 0 : a.DPoP) !== void 0 && (Rs(a.DPoP), await a.DPoP.addProof(i, o, "POST"));
  const d = await Ts(e, t, r, i, s, o, a);
  return (u = a == null ? void 0 : a.DPoP) == null || u.cacheNonce(d), d;
}
async function ho(e, t, r, n, s) {
  ke(e), xe(t), B(n, '"refreshToken"');
  const a = new URLSearchParams(s == null ? void 0 : s.additionalParameters);
  return a.set("refresh_token", n), Hr(e, t, r, "refresh_token", a, s);
}
const ks = /* @__PURE__ */ new WeakMap(), fo = /* @__PURE__ */ new WeakMap();
function xs(e) {
  if (!e.id_token)
    return;
  const t = ks.get(e);
  if (!t)
    throw $('"ref" was already garbage collected or did not resolve from the proper sources', ae);
  return t;
}
async function $r(e, t, r, n, s) {
  var o;
  if (ke(e), xe(t), !Ze(r, Response))
    throw $('"response" must be an instance of Response', re);
  let a;
  if (a = vs(r))
    throw new As("server responded with a challenge in the WWW-Authenticate HTTP Header", { cause: a, response: r });
  if (r.status !== 200) {
    let d;
    throw (d = await Ps(r)) ? (await ((o = r.body) == null ? void 0 : o.cancel()), new Es("server responded with an error in the response body", {
      cause: d,
      response: r
    })) : x('"response" is not a conform Token Endpoint response (unexpected HTTP status code)', Lr, r);
  }
  kt(r), Rt(r);
  let i;
  try {
    i = await r.json();
  } catch (d) {
    throw x('failed to parse "response" body as JSON', Ve, d);
  }
  if (!Me(i))
    throw x('"response" body must be a top level object', N, { body: i });
  if (B(i.access_token, '"response" body "access_token" property', N, {
    body: i
  }), B(i.token_type, '"response" body "token_type" property', N, {
    body: i
  }), i.token_type = i.token_type.toLowerCase(), i.token_type !== "dpop" && i.token_type !== "bearer")
    throw new ie("unsupported `token_type` value", { cause: { body: i } });
  if (i.expires_in !== void 0) {
    let d = typeof i.expires_in != "number" ? parseFloat(i.expires_in) : i.expires_in;
    je(d, !1, '"response" body "expires_in" property', N, {
      body: i
    }), i.expires_in = d;
  }
  if (i.refresh_token !== void 0 && B(i.refresh_token, '"response" body "refresh_token" property', N, {
    body: i
  }), i.scope !== void 0 && typeof i.scope != "string")
    throw x('"response" body "scope" property must be a string', N, { body: i });
  if (i.id_token !== void 0) {
    B(i.id_token, '"response" body "id_token" property', N, {
      body: i
    });
    const d = ["aud", "exp", "iat", "iss", "sub"];
    t.require_auth_time === !0 && d.push("auth_time"), t.default_max_age !== void 0 && (je(t.default_max_age, !1, '"client.default_max_age"'), d.push("auth_time")), n != null && n.length && d.push(...n);
    const { claims: u, jwt: g } = await Wo(i.id_token, Mo.bind(void 0, t.id_token_signed_response_alg, e.id_token_signing_alg_values_supported, "RS256"), Wr(t), bs(t), s == null ? void 0 : s[br]).then(So.bind(void 0, d)).then(wo.bind(void 0, e)).then(mo.bind(void 0, t.client_id));
    if (Array.isArray(u.aud) && u.aud.length !== 1) {
      if (u.azp === void 0)
        throw x('ID Token "aud" (audience) claim includes additional untrusted audiences', ve, { claims: u, claim: "aud" });
      if (u.azp !== t.client_id)
        throw x('unexpected ID Token "azp" (authorized party) claim value', ve, { expected: t.client_id, claims: u, claim: "azp" });
    }
    u.auth_time !== void 0 && je(u.auth_time, !1, 'ID Token "auth_time" (authentication time)', N, { claims: u }), fo.set(r, g), ks.set(i, u);
  }
  return i;
}
async function po(e, t, r, n) {
  return $r(e, t, r, void 0, n);
}
function mo(e, t) {
  if (Array.isArray(t.claims.aud)) {
    if (!t.claims.aud.includes(e))
      throw x('unexpected JWT "aud" (audience) claim value', ve, {
        expected: e,
        claims: t.claims,
        claim: "aud"
      });
  } else if (t.claims.aud !== e)
    throw x('unexpected JWT "aud" (audience) claim value', ve, {
      expected: e,
      claims: t.claims,
      claim: "aud"
    });
  return t;
}
function wo(e, t) {
  var n;
  const r = ((n = e[qo]) == null ? void 0 : n.call(e, t)) ?? e.issuer;
  if (t.claims.iss !== r)
    throw x('unexpected JWT "iss" (issuer) claim value', ve, {
      expected: r,
      claims: t.claims,
      claim: "iss"
    });
  return t;
}
const Jr = /* @__PURE__ */ new WeakSet();
function yo(e) {
  return Jr.add(e), e;
}
async function go(e, t, r, n, s, a, i) {
  if (ke(e), xe(t), !Jr.has(n))
    throw $('"callbackParameters" must be an instance of URLSearchParams obtained from "validateAuthResponse()", or "validateJwtAuthResponse()', ae);
  B(s, '"redirectUri"');
  const o = Se(n, "code");
  if (!o)
    throw x('no authorization code in "callbackParameters"', N);
  const d = new URLSearchParams(i == null ? void 0 : i.additionalParameters);
  return d.set("redirect_uri", s), d.set("code", o), a !== Lo && (B(a, '"codeVerifier"'), d.set("code_verifier", a)), Hr(e, t, r, "authorization_code", d, i);
}
const bo = {
  aud: "audience",
  c_hash: "code hash",
  client_id: "client id",
  exp: "expiration time",
  iat: "issued at",
  iss: "issuer",
  jti: "jwt id",
  nonce: "nonce",
  s_hash: "state hash",
  sub: "subject",
  ath: "access token hash",
  htm: "http method",
  htu: "http uri",
  cnf: "confirmation",
  auth_time: "authentication time"
};
function So(e, t) {
  for (const r of e)
    if (t.claims[r] === void 0)
      throw x(`JWT "${r}" (${bo[r]}) claim missing`, N, {
        claims: t.claims
      });
  return t;
}
const nr = Symbol(), sr = Symbol();
async function _o(e, t, r, n) {
  return Eo(e, t, r, n.expectedNonce, n.maxAge, {
    [br]: n[br]
  });
}
async function Eo(e, t, r, n, s, a) {
  const i = [];
  switch (n) {
    case void 0:
      n = nr;
      break;
    case nr:
      break;
    default:
      B(n, '"expectedNonce" argument'), i.push("nonce");
  }
  switch (s ?? (s = t.default_max_age), s) {
    case void 0:
      s = sr;
      break;
    case sr:
      break;
    default:
      je(s, !1, '"maxAge" argument'), i.push("auth_time");
  }
  const o = await $r(e, t, r, i, a);
  B(o.id_token, '"response" body "id_token" property', N, {
    body: o
  });
  const d = xs(o);
  if (s !== sr) {
    const u = Mr() + Wr(t), g = bs(t);
    if (d.auth_time + s < u - g)
      throw x("too much time has elapsed since the last End-User authentication", Sr, { claims: d, now: u, tolerance: g, claim: "auth_time" });
  }
  if (n === nr) {
    if (d.nonce !== void 0)
      throw x('unexpected ID Token "nonce" claim value', ve, {
        expected: void 0,
        claims: d,
        claim: "nonce"
      });
  } else if (d.nonce !== n)
    throw x('unexpected ID Token "nonce" claim value', ve, {
      expected: n,
      claims: d,
      claim: "nonce"
    });
  return o;
}
const Ao = "OAUTH_WWW_AUTHENTICATE_CHALLENGE", vo = "OAUTH_RESPONSE_BODY_ERROR", Ro = "OAUTH_UNSUPPORTED_OPERATION", To = "OAUTH_AUTHORIZATION_RESPONSE_ERROR", Ve = "OAUTH_PARSE_ERROR", N = "OAUTH_INVALID_RESPONSE", ko = "OAUTH_RESPONSE_IS_NOT_JSON", Lr = "OAUTH_RESPONSE_IS_NOT_CONFORM", xo = "OAUTH_HTTP_REQUEST_FORBIDDEN", Po = "OAUTH_REQUEST_PROTOCOL_FORBIDDEN", Sr = "OAUTH_JWT_TIMESTAMP_CHECK_FAILED", ve = "OAUTH_JWT_CLAIM_COMPARISON_FAILED", Co = "OAUTH_JSON_ATTRIBUTE_COMPARISON_FAILED", Oo = "OAUTH_MISSING_SERVER_METADATA", Io = "OAUTH_INVALID_SERVER_METADATA";
async function No(e, t, r, n, s, a) {
  return ke(e), xe(t), B(n, '"grantType"'), Hr(e, t, r, n, new URLSearchParams(s), a);
}
async function Do(e, t, r, n) {
  return $r(e, t, r, void 0, n);
}
function kt(e) {
  if (e.bodyUsed)
    throw $('"response" body has been used already', ae);
}
async function Ps(e) {
  if (e.status > 399 && e.status < 500) {
    kt(e), Rt(e);
    try {
      const t = await e.clone().json();
      if (Me(t) && typeof t.error == "string" && t.error.length)
        return t;
    } catch {
    }
  }
}
function Kn(e) {
  const { algorithm: t } = e;
  if (typeof t.modulusLength != "number" || t.modulusLength < 2048)
    throw new ie(`unsupported ${t.name} modulusLength`, {
      cause: e
    });
}
function Uo(e) {
  const { algorithm: t } = e;
  switch (t.namedCurve) {
    case "P-256":
      return "SHA-256";
    case "P-384":
      return "SHA-384";
    case "P-521":
      return "SHA-512";
    default:
      throw new ie("unsupported ECDSA namedCurve", { cause: e });
  }
}
function Ko(e) {
  switch (e.algorithm.name) {
    case "ECDSA":
      return {
        name: e.algorithm.name,
        hash: Uo(e)
      };
    case "RSA-PSS":
      switch (Kn(e), e.algorithm.hash.name) {
        case "SHA-256":
        case "SHA-384":
        case "SHA-512":
          return {
            name: e.algorithm.name,
            saltLength: parseInt(e.algorithm.hash.name.slice(-3), 10) >> 3
          };
        default:
          throw new ie("unsupported RSA-PSS hash name", { cause: e });
      }
    case "RSASSA-PKCS1-v1_5":
      return Kn(e), e.algorithm.name;
    case "Ed25519":
    case "EdDSA":
      return e.algorithm.name;
  }
  throw new ie("unsupported CryptoKey algorithm name", { cause: e });
}
async function Wo(e, t, r, n, s) {
  let { 0: a, 1: i, length: o } = e.split(".");
  if (o === 5)
    if (s !== void 0)
      e = await s(e), { 0: a, 1: i, length: o } = e.split(".");
    else
      throw new ie("JWE decryption is not configured", { cause: e });
  if (o !== 3)
    throw x("Invalid JWT", N, e);
  let d;
  try {
    d = JSON.parse(Ke(Ae(a)));
  } catch (y) {
    throw x("failed to parse JWT Header body as base64url encoded JSON", Ve, y);
  }
  if (!Me(d))
    throw x("JWT Header must be a top level object", N, e);
  if (t(d), d.crit !== void 0)
    throw new ie('no JWT "crit" header parameter extensions are supported', {
      cause: { header: d }
    });
  let u;
  try {
    u = JSON.parse(Ke(Ae(i)));
  } catch (y) {
    throw x("failed to parse JWT Payload body as base64url encoded JSON", Ve, y);
  }
  if (!Me(u))
    throw x("JWT Payload must be a top level object", N, e);
  const g = Mr() + r;
  if (u.exp !== void 0) {
    if (typeof u.exp != "number")
      throw x('unexpected JWT "exp" (expiration time) claim type', N, { claims: u });
    if (u.exp <= g - n)
      throw x('unexpected JWT "exp" (expiration time) claim value, expiration is past current timestamp', Sr, { claims: u, now: g, tolerance: n, claim: "exp" });
  }
  if (u.iat !== void 0 && typeof u.iat != "number")
    throw x('unexpected JWT "iat" (issued at) claim type', N, { claims: u });
  if (u.iss !== void 0 && typeof u.iss != "string")
    throw x('unexpected JWT "iss" (issuer) claim type', N, { claims: u });
  if (u.nbf !== void 0) {
    if (typeof u.nbf != "number")
      throw x('unexpected JWT "nbf" (not before) claim type', N, { claims: u });
    if (u.nbf > g + n)
      throw x('unexpected JWT "nbf" (not before) claim value', Sr, {
        claims: u,
        now: g,
        tolerance: n,
        claim: "nbf"
      });
  }
  if (u.aud !== void 0 && typeof u.aud != "string" && !Array.isArray(u.aud))
    throw x('unexpected JWT "aud" (audience) claim type', N, { claims: u });
  return { header: d, claims: u, jwt: e };
}
function Mo(e, t, r, n) {
  if (e !== void 0) {
    if (typeof e == "string" ? n.alg !== e : !e.includes(n.alg))
      throw x('unexpected JWT "alg" header parameter', N, {
        header: n,
        expected: e,
        reason: "client configuration"
      });
    return;
  }
  if (Array.isArray(t)) {
    if (!t.includes(n.alg))
      throw x('unexpected JWT "alg" header parameter', N, {
        header: n,
        expected: t,
        reason: "authorization server metadata"
      });
    return;
  }
  if (r !== void 0) {
    if (typeof r == "string" ? n.alg !== r : typeof r == "function" ? !r(n.alg) : !r.includes(n.alg))
      throw x('unexpected JWT "alg" header parameter', N, {
        header: n,
        expected: r,
        reason: "default value"
      });
    return;
  }
  throw x('missing client or server configuration to verify used JWT "alg" header parameter', void 0, { client: e, issuer: t, fallback: r });
}
function Se(e, t) {
  const { 0: r, length: n } = e.getAll(t);
  if (n > 1)
    throw x(`"${t}" parameter must be provided only once`, N);
  return r;
}
const Ho = Symbol(), $o = Symbol();
function Jo(e, t, r, n) {
  if (ke(e), xe(t), r instanceof URL && (r = r.searchParams), !(r instanceof URLSearchParams))
    throw $('"parameters" must be an instance of URLSearchParams, or URL', re);
  if (Se(r, "response"))
    throw x('"parameters" contains a JARM response, use validateJwtAuthResponse() instead of validateAuthResponse()', N, { parameters: r });
  const s = Se(r, "iss"), a = Se(r, "state");
  if (!s && e.authorization_response_iss_parameter_supported)
    throw x('response parameter "iss" (issuer) missing', N, { parameters: r });
  if (s && s !== e.issuer)
    throw x('unexpected "iss" (issuer) response parameter value', N, {
      expected: e.issuer,
      parameters: r
    });
  switch (n) {
    case void 0:
    case $o:
      if (a !== void 0)
        throw x('unexpected "state" response parameter encountered', N, {
          expected: void 0,
          parameters: r
        });
      break;
    case Ho:
      break;
    default:
      if (B(n, '"expectedState" argument'), a !== n)
        throw x(a === void 0 ? 'response parameter "state" missing' : 'unexpected "state" response parameter value', N, { expected: n, parameters: r });
  }
  if (Se(r, "error"))
    throw new so("authorization response from the server is an error", {
      cause: r
    });
  const o = Se(r, "id_token"), d = Se(r, "token");
  if (o !== void 0 || d !== void 0)
    throw new ie("implicit and hybrid flows are not supported");
  return yo(new URLSearchParams(r));
}
const Lo = Symbol(), Wn = Symbol(), qo = Symbol(), zo = "4.4.1", Bo = {
  version: zo
};
function jo(e) {
  return e && !e.endsWith("/") ? `${e}/` : e;
}
function Go(e) {
  return e && e.startsWith("/") ? e.substring(1, e.length) : e;
}
const Fo = (e) => e.endsWith("/") ? e.slice(0, -1) : e;
function Vo(e, t) {
  let r;
  try {
    r = new URL(e, t);
  } catch {
    return;
  }
  if (r.origin === t.origin)
    return r.toString();
}
const Xo = [
  "sub",
  "name",
  "nickname",
  "given_name",
  "family_name",
  "picture",
  "email",
  "email_verified",
  "org_id"
];
function Yo(e) {
  return Object.keys(e).reduce((t, r) => (Xo.includes(r) && (t[r] = e[r]), t), {});
}
const Zo = [
  "client_id",
  "redirect_uri",
  "response_type",
  "code_challenge",
  "code_challenge_method",
  "state",
  "nonce"
], Mn = ["openid", "profile", "email", "offline_access"].join(" "), Qo = "urn:auth0:params:oauth:grant-type:token-exchange:federated-connection-access-token", ec = "urn:ietf:params:oauth:token-type:refresh_token", tc = "http://auth0.com/oauth/token-type/federated-connection-access-token";
function ar(e, t) {
  return new URL(Go(e), jo(t));
}
class rc {
  constructor(t) {
    if (this.fetch = t.fetch || fetch, this.jwksCache = t.jwksCache || {}, this.allowInsecureRequests = t.allowInsecureRequests ?? !1, this.httpOptions = () => {
      const n = new Headers(), s = t.enableTelemetry ?? !0, a = t.httpTimeout ?? 5e3;
      if (s) {
        const i = "nextjs-auth0", o = Bo.version;
        n.set("User-Agent", `${i}/${o}`), n.set("Auth0-Client", nc(JSON.stringify({
          name: i,
          version: o
        })));
      }
      return {
        signal: AbortSignal.timeout(a),
        headers: n
      };
    }, this.allowInsecureRequests && process.env.NODE_ENV === "production" && console.warn("allowInsecureRequests is enabled in a production environment. This is not recommended."), this.transactionStore = t.transactionStore, this.sessionStore = t.sessionStore, this.domain = t.domain, this.clientMetadata = { client_id: t.clientId }, this.clientSecret = t.clientSecret, this.authorizationParameters = t.authorizationParameters || {
      scope: Mn
    }, this.pushedAuthorizationRequests = t.pushedAuthorizationRequests ?? !1, this.clientAssertionSigningKey = t.clientAssertionSigningKey, this.clientAssertionSigningAlg = t.clientAssertionSigningAlg || "RS256", this.authorizationParameters.scope || (this.authorizationParameters.scope = Mn), !this.authorizationParameters.scope.split(" ").map((n) => n.trim()).includes("openid"))
      throw new Error("The 'openid' scope must be included in the set of scopes. See https://auth0.com/docs");
    this.appBaseUrl = t.appBaseUrl, this.signInReturnToPath = t.signInReturnToPath || "/", this.beforeSessionSaved = t.beforeSessionSaved, this.onCallback = t.onCallback || this.defaultOnCallback, this.routes = {
      login: "/auth/login",
      logout: "/auth/logout",
      callback: "/auth/callback",
      backChannelLogout: "/auth/backchannel-logout",
      profile: process.env.NEXT_PUBLIC_PROFILE_ROUTE || "/auth/profile",
      accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN_ROUTE || "/auth/access-token",
      ...t.routes
    }, this.enableAccessTokenEndpoint = t.enableAccessTokenEndpoint ?? !0;
  }
  async handler(t) {
    const { pathname: r } = t.nextUrl, n = Fo(r), s = t.method;
    if (s === "GET" && n === this.routes.login)
      return this.handleLogin(t);
    if (s === "GET" && n === this.routes.logout)
      return this.handleLogout(t);
    if (s === "GET" && n === this.routes.callback)
      return this.handleCallback(t);
    if (s === "GET" && n === this.routes.profile)
      return this.handleProfile(t);
    if (s === "GET" && n === this.routes.accessToken && this.enableAccessTokenEndpoint)
      return this.handleAccessToken(t);
    if (s === "POST" && n === this.routes.backChannelLogout)
      return this.handleBackChannelLogout(t);
    {
      const a = M.NextResponse.next(), i = await this.sessionStore.get(t.cookies);
      return i && await this.sessionStore.set(t.cookies, a.cookies, {
        ...i
      }), a;
    }
  }
  async startInteractiveLogin(t = {}) {
    const r = ar(this.routes.callback, this.appBaseUrl);
    let n = this.signInReturnToPath;
    if (t.returnTo) {
      const E = new URL(this.authorizationParameters.redirect_uri || this.appBaseUrl), m = Vo(t.returnTo, E);
      m && (n = m);
    }
    const s = "S256", a = qi(), i = await ji(a), o = zi(), d = Bi(), u = new URLSearchParams();
    u.set("client_id", this.clientMetadata.client_id), u.set("redirect_uri", r.toString()), u.set("response_type", "code"), u.set("code_challenge", i), u.set("code_challenge_method", s), u.set("state", o), u.set("nonce", d);
    const g = {
      // any custom params to forward to /authorize defined as configuration
      ...this.authorizationParameters,
      // custom parameters passed in via the query params to ensure only the confidential client can set them
      ...t.authorizationParameters
    };
    Object.entries(g).forEach(([E, m]) => {
      !Zo.includes(E) && m != null && u.set(E, String(m));
    });
    const y = {
      nonce: d,
      maxAge: this.authorizationParameters.max_age,
      codeVerifier: a,
      responseType: "code",
      state: o,
      returnTo: n
    }, [b, S] = await this.authorizationUrl(u);
    if (b)
      return new M.NextResponse("An error occured while trying to initiate the login request.", {
        status: 500
      });
    const _ = M.NextResponse.redirect(S.toString());
    return await this.transactionStore.save(_.cookies, y), _;
  }
  async handleLogin(t) {
    const r = Object.fromEntries(t.nextUrl.searchParams.entries()), n = {
      // SECURITY CRITICAL: Only forward query params when PAR is disabled
      authorizationParameters: this.pushedAuthorizationRequests ? {} : r,
      returnTo: r.returnTo
    };
    return this.startInteractiveLogin(n);
  }
  async handleLogout(t) {
    const r = await this.sessionStore.get(t.cookies), [n, s] = await this.discoverAuthorizationServerMetadata();
    if (n)
      return new M.NextResponse("An error occured while trying to initiate the logout request.", {
        status: 500
      });
    const a = t.nextUrl.searchParams.get("returnTo") || this.appBaseUrl;
    if (!s.end_session_endpoint) {
      console.warn("The Auth0 client does not have RP-initiated logout enabled, the user will be redirected to the `/v2/logout` endpoint instead. Learn how to enable it here: https://auth0.com/docs/authenticate/login/logout/log-users-out-of-auth0#enable-endpoint-discovery");
      const d = new URL("/v2/logout", this.issuer);
      d.searchParams.set("returnTo", a), d.searchParams.set("client_id", this.clientMetadata.client_id);
      const u = M.NextResponse.redirect(d);
      return await this.sessionStore.delete(t.cookies, u.cookies), u;
    }
    const i = new URL(s.end_session_endpoint);
    i.searchParams.set("client_id", this.clientMetadata.client_id), i.searchParams.set("post_logout_redirect_uri", a), r != null && r.internal.sid && i.searchParams.set("logout_hint", r.internal.sid);
    const o = M.NextResponse.redirect(i);
    return await this.sessionStore.delete(t.cookies, o.cookies), o;
  }
  async handleCallback(t) {
    const r = t.nextUrl.searchParams.get("state");
    if (!r)
      return this.onCallback(new pa(), {}, null);
    const n = await this.transactionStore.get(t.cookies, r);
    if (!n)
      return this.onCallback(new ma(), {}, null);
    const s = n.payload, a = {
      returnTo: s.returnTo
    }, [i, o] = await this.discoverAuthorizationServerMetadata();
    if (i)
      return this.onCallback(i, a, null);
    let d;
    try {
      d = Jo(o, this.clientMetadata, t.nextUrl.searchParams, s.state);
    } catch (E) {
      return this.onCallback(new xn({
        cause: new ot({
          code: E.error,
          message: E.error_description
        })
      }), a, null);
    }
    const u = ar(this.routes.callback, this.appBaseUrl), g = await go(o, this.clientMetadata, await this.getClientAuth(), d, u.toString(), s.codeVerifier, {
      ...this.httpOptions(),
      [_e]: this.fetch,
      [we]: this.allowInsecureRequests
    });
    let y;
    try {
      y = await _o(o, this.clientMetadata, g, {
        expectedNonce: s.nonce,
        maxAge: s.maxAge,
        requireIdToken: !0
      });
    } catch (E) {
      return this.onCallback(new wa({
        cause: new ot({
          code: E.error,
          message: E.error_description
        })
      }), a, null);
    }
    const b = xs(y);
    let S = {
      user: b,
      tokenSet: {
        accessToken: y.access_token,
        idToken: y.id_token,
        scope: y.scope,
        refreshToken: y.refresh_token,
        expiresAt: Math.floor(Date.now() / 1e3) + Number(y.expires_in)
      },
      internal: {
        sid: b.sid,
        createdAt: Math.floor(Date.now() / 1e3)
      }
    };
    const _ = await this.onCallback(null, a, S);
    return this.beforeSessionSaved ? S = {
      ...await this.beforeSessionSaved(S, y.id_token ?? null),
      internal: S.internal
    } : S.user = Yo(b), await this.sessionStore.set(t.cookies, _.cookies, S, !0), await this.transactionStore.delete(_.cookies, r), _;
  }
  async handleProfile(t) {
    const r = await this.sessionStore.get(t.cookies);
    return r ? M.NextResponse.json(r == null ? void 0 : r.user) : new M.NextResponse(null, {
      status: 401
    });
  }
  async handleAccessToken(t) {
    const r = await this.sessionStore.get(t.cookies);
    if (!r)
      return M.NextResponse.json({
        error: {
          message: "The user does not have an active session.",
          code: Ue.MISSING_SESSION
        }
      }, {
        status: 401
      });
    const [n, s] = await this.getTokenSet(r.tokenSet);
    if (n)
      return M.NextResponse.json({
        error: {
          message: n.message,
          code: n.code
        }
      }, {
        status: 401
      });
    const a = M.NextResponse.json({
      token: s.accessToken,
      scope: s.scope,
      expires_at: s.expiresAt
    });
    return await this.sessionStore.set(t.cookies, a.cookies, {
      ...r,
      tokenSet: s
    }), a;
  }
  async handleBackChannelLogout(t) {
    if (!this.sessionStore.store)
      return new M.NextResponse("A session data store is not configured.", {
        status: 500
      });
    if (!this.sessionStore.store.deleteByLogoutToken)
      return new M.NextResponse("Back-channel logout is not supported by the session data store.", {
        status: 500
      });
    const n = new URLSearchParams(await t.text()).get("logout_token");
    if (!n)
      return new M.NextResponse("Missing `logout_token` in the request body.", {
        status: 400
      });
    const [s, a] = await this.verifyLogoutToken(n);
    return s ? new M.NextResponse(s.message, {
      status: 400
    }) : (await this.sessionStore.store.deleteByLogoutToken(a), new M.NextResponse(null, {
      status: 204
    }));
  }
  /**
   * getTokenSet returns a valid token set. If the access token has expired, it will attempt to
   * refresh it using the refresh token, if available.
   */
  async getTokenSet(t) {
    if (!t.refreshToken && t.expiresAt <= Date.now() / 1e3)
      return [
        new cr(Ue.MISSING_REFRESH_TOKEN, "The access token has expired and a refresh token was not provided. The user needs to re-authenticate."),
        null
      ];
    if (t.refreshToken && t.expiresAt <= Date.now() / 1e3) {
      const [r, n] = await this.discoverAuthorizationServerMetadata();
      if (r)
        return console.error(r), [r, null];
      const s = await ho(n, this.clientMetadata, await this.getClientAuth(), t.refreshToken, {
        ...this.httpOptions(),
        [_e]: this.fetch,
        [we]: this.allowInsecureRequests
      });
      let a;
      try {
        a = await po(n, this.clientMetadata, s);
      } catch (d) {
        return console.error(d), [
          new cr(Ue.FAILED_TO_REFRESH_TOKEN, "The access token has expired and there was an error while trying to refresh it. Check the server logs for more information."),
          null
        ];
      }
      const i = Math.floor(Date.now() / 1e3) + Number(a.expires_in), o = {
        ...t,
        // contains the existing `iat` claim to maintain the session lifetime
        accessToken: a.access_token,
        idToken: a.id_token,
        expiresAt: i
      };
      return a.refresh_token ? o.refreshToken = a.refresh_token : o.refreshToken = t.refreshToken, [null, o];
    }
    return [null, t];
  }
  async discoverAuthorizationServerMetadata() {
    if (this.authorizationServerMetadata)
      return [null, this.authorizationServerMetadata];
    const t = new URL(this.issuer);
    try {
      const r = await Hi(t, {
        ...this.httpOptions(),
        [_e]: this.fetch,
        [we]: this.allowInsecureRequests
      }).then((n) => $i(t, n));
      return this.authorizationServerMetadata = r, [null, r];
    } catch (r) {
      return console.error(`An error occured while performing the discovery request. Please make sure the AUTH0_DOMAIN environment variable is correctly configured — the format must be 'example.us.auth0.com'. issuer=${t.toString()}, error:`, r), [
        new fa("Discovery failed for the OpenID Connect configuration."),
        null
      ];
    }
  }
  async defaultOnCallback(t, r) {
    return t ? new M.NextResponse(t.message, {
      status: 500
    }) : M.NextResponse.redirect(ar(r.returnTo || "/", this.appBaseUrl));
  }
  async verifyLogoutToken(t) {
    const [r, n] = await this.discoverAuthorizationServerMetadata();
    if (r)
      return [r, null];
    const s = "RS256", a = xi(new URL(n.jwks_uri), {
      [lt]: this.jwksCache
    }), { payload: i } = await mi(t, a, {
      issuer: n.issuer,
      audience: this.clientMetadata.client_id,
      algorithms: [s],
      requiredClaims: ["iat"]
    });
    return !("sid" in i) && !("sub" in i) ? [
      new fe('either "sid" or "sub" (or both) claims must be present'),
      null
    ] : "sid" in i && typeof i.sid != "string" ? [new fe('"sid" claim must be a string'), null] : "sub" in i && typeof i.sub != "string" ? [new fe('"sub" claim must be a string'), null] : "nonce" in i ? [new fe('"nonce" claim is prohibited'), null] : "events" in i ? typeof i.events != "object" || i.events === null ? [
      new fe('"events" claim must be an object'),
      null
    ] : "http://schemas.openid.net/event/backchannel-logout" in i.events ? typeof i.events["http://schemas.openid.net/event/backchannel-logout"] != "object" ? [
      new fe('"http://schemas.openid.net/event/backchannel-logout" member in the "events" claim must be an object'),
      null
    ] : [
      null,
      {
        sid: i.sid,
        sub: i.sub
      }
    ] : [
      new fe('"http://schemas.openid.net/event/backchannel-logout" member is missing in the "events" claim'),
      null
    ] : [new fe('"events" claim is missing'), null];
  }
  async authorizationUrl(t) {
    const [r, n] = await this.discoverAuthorizationServerMetadata();
    if (r)
      return [r, null];
    if (this.pushedAuthorizationRequests && !n.pushed_authorization_request_endpoint)
      return console.error("The Auth0 tenant does not have pushed authorization requests enabled. Learn how to enable it here: https://auth0.com/docs/get-started/applications/configure-par"), [
        new Error("The authorization server does not support pushed authorization requests."),
        null
      ];
    const s = new URL(n.authorization_endpoint);
    if (this.pushedAuthorizationRequests) {
      const a = await no(n, this.clientMetadata, await this.getClientAuth(), t, {
        ...this.httpOptions(),
        [_e]: this.fetch,
        [we]: this.allowInsecureRequests
      });
      let i;
      try {
        i = await uo(n, this.clientMetadata, a);
      } catch (o) {
        return [
          new xn({
            cause: new ot({
              code: o.error,
              message: o.error_description
            }),
            message: "An error occured while pushing the authorization request."
          }),
          null
        ];
      }
      return s.searchParams.set("request_uri", i.request_uri), s.searchParams.set("client_id", this.clientMetadata.client_id), [null, s];
    }
    return s.search = t.toString(), [null, s];
  }
  async getClientAuth() {
    if (!this.clientSecret && !this.clientAssertionSigningKey)
      throw new Error("The client secret or client assertion signing key must be provided.");
    let t = this.clientAssertionSigningKey;
    return t && !(t instanceof CryptoKey) && (t = await ja(t, this.clientAssertionSigningAlg)), t ? eo(t) : Zi(this.clientSecret);
  }
  get issuer() {
    return this.domain.startsWith("http://") || this.domain.startsWith("https://") ? this.domain : `https://${this.domain}`;
  }
  /**
   * Exchanges a refresh token for an access token for a connection.
   *
   * This method performs a token exchange using the provided refresh token and connection details.
   * It first checks if the refresh token is present in the `tokenSet`. If not, it returns an error.
   * Then, it constructs the necessary parameters for the token exchange request and performs
   * the request to the authorization server's token endpoint.
   *
   * @returns {Promise<[AccessTokenForConnectionError, null] | [null, ConnectionTokenSet]>} A promise that resolves to a tuple.
   *          The first element is either an `AccessTokenForConnectionError` if an error occurred, or `null` if the request was successful.
   *          The second element is either `null` if an error occurred, or a `ConnectionTokenSet` object
   *          containing the access token, expiration time, and scope if the request was successful.
   *
   * @throws {AccessTokenForConnectionError} If the refresh token is missing or if there is an error during the token exchange process.
   */
  async getConnectionTokenSet(t, r, n) {
    if (!t.refreshToken && (!r || r.expiresAt <= Date.now() / 1e3))
      return [
        new ur(Fe.MISSING_REFRESH_TOKEN, "A refresh token was not present, Connection Access Token requires a refresh token. The user needs to re-authenticate."),
        null
      ];
    if (t.refreshToken && (!r || r.expiresAt <= Date.now() / 1e3)) {
      const s = new URLSearchParams();
      s.append("connection", n.connection), s.append("subject_token_type", ec), s.append("subject_token", t.refreshToken), s.append("requested_token_type", tc), n.login_hint && s.append("login_hint", n.login_hint);
      const [a, i] = await this.discoverAuthorizationServerMetadata();
      if (a)
        return console.error(a), [a, null];
      const o = await No(i, this.clientMetadata, await this.getClientAuth(), Qo, s, {
        [_e]: this.fetch,
        [we]: this.allowInsecureRequests
      });
      let d;
      try {
        d = await Do(i, this.clientMetadata, o);
      } catch (u) {
        return console.error(u), [
          new ur(Fe.FAILED_TO_EXCHANGE, "There was an error trying to exchange the refresh token for a connection access token. Check the server logs for more information.", new ot({
            code: u.error,
            message: u.error_description
          })),
          null
        ];
      }
      return [
        null,
        {
          accessToken: d.access_token,
          expiresAt: Math.floor(Date.now() / 1e3) + Number(d.expires_in),
          scope: d.scope,
          connection: n.connection
        }
      ];
    }
    return [null, r];
  }
}
const nc = (e) => {
  const t = new TextEncoder().encode(e), r = 32768, n = [];
  for (let s = 0; s < t.length; s += r)
    n.push(
      // @ts-expect-error Argument of type 'Uint8Array' is not assignable to parameter of type 'number[]'.
      String.fromCharCode.apply(null, t.subarray(s, s + r))
    );
  return btoa(n.join(""));
};
function bt(e) {
  var t;
  const r = [
    "path" in e && e.path && `Path=${e.path}`,
    "expires" in e && (e.expires || e.expires === 0) && `Expires=${(typeof e.expires == "number" ? new Date(e.expires) : e.expires).toUTCString()}`,
    "maxAge" in e && typeof e.maxAge == "number" && `Max-Age=${e.maxAge}`,
    "domain" in e && e.domain && `Domain=${e.domain}`,
    "secure" in e && e.secure && "Secure",
    "httpOnly" in e && e.httpOnly && "HttpOnly",
    "sameSite" in e && e.sameSite && `SameSite=${e.sameSite}`,
    "partitioned" in e && e.partitioned && "Partitioned",
    "priority" in e && e.priority && `Priority=${e.priority}`
  ].filter(Boolean), n = `${e.name}=${encodeURIComponent((t = e.value) != null ? t : "")}`;
  return r.length === 0 ? n : `${n}; ${r.join("; ")}`;
}
function Cs(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e.split(/; */)) {
    if (!r)
      continue;
    const n = r.indexOf("=");
    if (n === -1) {
      t.set(r, "true");
      continue;
    }
    const [s, a] = [r.slice(0, n), r.slice(n + 1)];
    try {
      t.set(s, decodeURIComponent(a ?? "true"));
    } catch {
    }
  }
  return t;
}
function sc(e) {
  if (!e)
    return;
  const [[t, r], ...n] = Cs(e), {
    domain: s,
    expires: a,
    httponly: i,
    maxage: o,
    path: d,
    samesite: u,
    secure: g,
    partitioned: y,
    priority: b
  } = Object.fromEntries(
    n.map(([_, E]) => [
      _.toLowerCase().replace(/-/g, ""),
      E
    ])
  ), S = {
    name: t,
    value: decodeURIComponent(r),
    domain: s,
    ...a && { expires: new Date(a) },
    ...i && { httpOnly: !0 },
    ...typeof o == "string" && { maxAge: Number(o) },
    path: d,
    ...u && { sameSite: oc(u) },
    ...g && { secure: !0 },
    ...b && { priority: uc(b) },
    ...y && { partitioned: !0 }
  };
  return ac(S);
}
function ac(e) {
  const t = {};
  for (const r in e)
    e[r] && (t[r] = e[r]);
  return t;
}
var ic = ["strict", "lax", "none"];
function oc(e) {
  return e = e.toLowerCase(), ic.includes(e) ? e : void 0;
}
var cc = ["low", "medium", "high"];
function uc(e) {
  return e = e.toLowerCase(), cc.includes(e) ? e : void 0;
}
function dc(e) {
  if (!e)
    return [];
  var t = [], r = 0, n, s, a, i, o;
  function d() {
    for (; r < e.length && /\s/.test(e.charAt(r)); )
      r += 1;
    return r < e.length;
  }
  function u() {
    return s = e.charAt(r), s !== "=" && s !== ";" && s !== ",";
  }
  for (; r < e.length; ) {
    for (n = r, o = !1; d(); )
      if (s = e.charAt(r), s === ",") {
        for (a = r, r += 1, d(), i = r; r < e.length && u(); )
          r += 1;
        r < e.length && e.charAt(r) === "=" ? (o = !0, r = i, t.push(e.substring(n, a)), n = r) : r = a + 1;
      } else
        r += 1;
    (!o || r >= e.length) && t.push(e.substring(n, e.length));
  }
  return t;
}
var lc = class {
  constructor(e) {
    this._parsed = /* @__PURE__ */ new Map(), this._headers = e;
    const t = e.get("cookie");
    if (t) {
      const r = Cs(t);
      for (const [n, s] of r)
        this._parsed.set(n, { name: n, value: s });
    }
  }
  [Symbol.iterator]() {
    return this._parsed[Symbol.iterator]();
  }
  /**
   * The amount of cookies received from the client
   */
  get size() {
    return this._parsed.size;
  }
  get(...e) {
    const t = typeof e[0] == "string" ? e[0] : e[0].name;
    return this._parsed.get(t);
  }
  getAll(...e) {
    var t;
    const r = Array.from(this._parsed);
    if (!e.length)
      return r.map(([s, a]) => a);
    const n = typeof e[0] == "string" ? e[0] : (t = e[0]) == null ? void 0 : t.name;
    return r.filter(([s]) => s === n).map(([s, a]) => a);
  }
  has(e) {
    return this._parsed.has(e);
  }
  set(...e) {
    const [t, r] = e.length === 1 ? [e[0].name, e[0].value] : e, n = this._parsed;
    return n.set(t, { name: t, value: r }), this._headers.set(
      "cookie",
      Array.from(n).map(([s, a]) => bt(a)).join("; ")
    ), this;
  }
  /**
   * Delete the cookies matching the passed name or names in the request.
   */
  delete(e) {
    const t = this._parsed, r = Array.isArray(e) ? e.map((n) => t.delete(n)) : t.delete(e);
    return this._headers.set(
      "cookie",
      Array.from(t).map(([n, s]) => bt(s)).join("; ")
    ), r;
  }
  /**
   * Delete all the cookies in the cookies in the request.
   */
  clear() {
    return this.delete(Array.from(this._parsed.keys())), this;
  }
  /**
   * Format the cookies in the request as a string for logging
   */
  [Symbol.for("edge-runtime.inspect.custom")]() {
    return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
  }
  toString() {
    return [...this._parsed.values()].map((e) => `${e.name}=${encodeURIComponent(e.value)}`).join("; ");
  }
}, _r = class {
  constructor(e) {
    this._parsed = /* @__PURE__ */ new Map();
    var t, r, n;
    this._headers = e;
    const s = (n = (r = (t = e.getSetCookie) == null ? void 0 : t.call(e)) != null ? r : e.get("set-cookie")) != null ? n : [], a = Array.isArray(s) ? s : dc(s);
    for (const i of a) {
      const o = sc(i);
      o && this._parsed.set(o.name, o);
    }
  }
  /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-get CookieStore#get} without the Promise.
   */
  get(...e) {
    const t = typeof e[0] == "string" ? e[0] : e[0].name;
    return this._parsed.get(t);
  }
  /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-getAll CookieStore#getAll} without the Promise.
   */
  getAll(...e) {
    var t;
    const r = Array.from(this._parsed.values());
    if (!e.length)
      return r;
    const n = typeof e[0] == "string" ? e[0] : (t = e[0]) == null ? void 0 : t.name;
    return r.filter((s) => s.name === n);
  }
  has(e) {
    return this._parsed.has(e);
  }
  /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-set CookieStore#set} without the Promise.
   */
  set(...e) {
    const [t, r, n] = e.length === 1 ? [e[0].name, e[0].value, e[0]] : e, s = this._parsed;
    return s.set(t, fc({ name: t, value: r, ...n })), hc(s, this._headers), this;
  }
  /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-delete CookieStore#delete} without the Promise.
   */
  delete(...e) {
    const [t, r] = typeof e[0] == "string" ? [e[0]] : [e[0].name, e[0]];
    return this.set({ ...r, name: t, value: "", expires: /* @__PURE__ */ new Date(0) });
  }
  [Symbol.for("edge-runtime.inspect.custom")]() {
    return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
  }
  toString() {
    return [...this._parsed.values()].map(bt).join("; ");
  }
};
function hc(e, t) {
  t.delete("set-cookie");
  for (const [, r] of e) {
    const n = bt(r);
    t.append("set-cookie", n);
  }
}
function fc(e = { name: "", value: "" }) {
  return typeof e.expires == "number" && (e.expires = new Date(e.expires)), e.maxAge && (e.expires = new Date(Date.now() + e.maxAge * 1e3)), (e.path === null || e.path === void 0) && (e.path = "/"), e;
}
const pc = () => {
  if (typeof globalThis < "u")
    return globalThis;
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  throw new Error("unable to locate global object");
}, mc = async (e, t, r, n, s) => {
  const { crypto: { subtle: a } } = pc();
  return new Uint8Array(await a.deriveBits({
    name: "HKDF",
    hash: `SHA-${e.substr(3)}`,
    salt: r,
    info: n
  }, await a.importKey("raw", t, "HKDF", !1, ["deriveBits"]), s << 3));
};
function wc(e) {
  switch (e) {
    case "sha256":
    case "sha384":
    case "sha512":
    case "sha1":
      return e;
    default:
      throw new TypeError('unsupported "digest" value');
  }
}
function qr(e, t) {
  if (typeof e == "string")
    return new TextEncoder().encode(e);
  if (!(e instanceof Uint8Array))
    throw new TypeError(`"${t}"" must be an instance of Uint8Array or a string`);
  return e;
}
function yc(e) {
  const t = qr(e, "ikm");
  if (!t.byteLength)
    throw new TypeError('"ikm" must be at least one byte in length');
  return t;
}
function gc(e) {
  const t = qr(e, "info");
  if (t.byteLength > 1024)
    throw TypeError('"info" must not contain more than 1024 bytes');
  return t;
}
function bc(e, t) {
  if (!Number.isInteger(e) || e < 1)
    throw new TypeError('"keylen" must be a positive integer');
  const r = parseInt(t.substr(3), 10) >> 3 || 20;
  if (e > 255 * r)
    throw new TypeError('"keylen" too large');
  return e;
}
async function zr(e, t, r, n, s) {
  return mc(wc(e), yc(t), qr(r, "salt"), gc(n), bc(s, e));
}
const Sc = "A256GCM", _c = "dir", Os = "sha256", Br = 32, Is = "JWE CEK";
async function St(e, t, r) {
  const n = await zr(Os, t, "", Is, Br);
  return (await new bi(e).setProtectedHeader({ enc: Sc, alg: _c, ...r }).encrypt(n)).toString();
}
async function We(e, t) {
  const r = await zr(Os, t, "", Is, Br);
  return await wi(e, r, {});
}
const Ec = (e) => zr("sha256", e, "", "JWS Cookie Signing", Br);
async function Ac(e, t, r) {
  if (!t)
    return;
  const [n, s] = t.split("."), a = {
    protected: Pi(JSON.stringify({ alg: "HS256", b64: !1, crit: ["b64"] })),
    payload: `${e}=${n}`,
    signature: s
  }, i = await Ec(r);
  try {
    return await fs(a, i, {
      algorithms: ["HS256"]
    }), n;
  } catch {
    return;
  }
}
const ir = 3500, _t = "__", vc = new RegExp(`${_t}(\\d+)$`), or = (e) => {
  const t = vc.exec(e);
  if (t)
    return parseInt(t[1], 10);
}, Et = (e, t) => {
  const r = new RegExp(`^${t}${_t}\\d+$`);
  return e.getAll().filter((n) => r.test(n.name));
};
function Rc(e, t, r, n, s) {
  if (new TextEncoder().encode(t).length <= ir) {
    s.set(e, t, r), n.set(e, t), Et(n, e).forEach((g) => {
      s.delete(g.name), n.delete(g.name);
    });
    return;
  }
  let i = 0, o = 0;
  for (; i < t.length; ) {
    const g = t.slice(i, i + ir), y = `${e}${_t}${o}`;
    s.set(y, g, r), n.set(y, g), i += ir, o++;
  }
  const u = Et(n, e).length - o;
  if (u > 0)
    for (let g = 0; g < u; g++) {
      const y = o + g, b = `${e}${_t}${y}`;
      s.delete(b), n.delete(b);
    }
  s.delete(e), n.delete(e);
}
function Hn(e, t) {
  const r = t.get(e);
  if (r != null && r.value)
    return r.value;
  const n = Et(t, e).sort(
    // Extract index from cookie name and sort numerically
    (a, i) => or(a.name) - or(i.name)
  );
  if (n.length === 0)
    return;
  const s = or(n[n.length - 1].name);
  if (n.length !== s + 1) {
    console.warn(`Incomplete chunked cookie '${e}': Found ${n.length} chunks, expected ${s + 1}`);
    return;
  }
  return n.map((a) => a.value).join("");
}
function $n(e, t, r) {
  r.delete(e), Et(t, e).forEach((n) => {
    r.delete(n.name);
  });
}
const Tc = "__session";
class Ns {
  constructor({
    secret: t,
    rolling: r = !0,
    absoluteDuration: n = 60 * 60 * 24 * 3,
    // 3 days in seconds
    inactivityDuration: s = 60 * 60 * 24 * 1,
    // 1 day in seconds
    store: a,
    cookieOptions: i
  }) {
    this.secret = t, this.rolling = r, this.absoluteDuration = n, this.inactivityDuration = s, this.store = a, this.sessionCookieName = (i == null ? void 0 : i.name) ?? Tc, this.cookieConfig = {
      httpOnly: !0,
      sameSite: (i == null ? void 0 : i.sameSite) ?? "lax",
      secure: (i == null ? void 0 : i.secure) ?? !1,
      path: "/"
    };
  }
  /**
   * epoch returns the time since unix epoch in seconds.
   */
  epoch() {
    return Date.now() / 1e3 | 0;
  }
  /**
   * calculateMaxAge calculates the max age of the session based on createdAt and the rolling and absolute durations.
   */
  calculateMaxAge(t) {
    if (!this.rolling)
      return this.absoluteDuration;
    const r = this.epoch(), s = Math.min(r + this.inactivityDuration, t + this.absoluteDuration) - this.epoch();
    return s > 0 ? s : 0;
  }
}
const Ge = "appSession";
function kc(e) {
  if (e.protectedHeader.iat) {
    const t = e;
    return Ds(t.protectedHeader, t.payload);
  }
  return e.payload;
}
function xc(e) {
  var t;
  if ((t = e.header) != null && t.iat) {
    const r = e;
    return Ds(r.header, r.data);
  }
  return e;
}
function Ds(e, t) {
  const r = t.user;
  return {
    user: r,
    tokenSet: {
      accessToken: t.accessToken ?? void 0,
      scope: t.accessTokenScope,
      refreshToken: t.refreshToken,
      expiresAt: t.accessTokenExpiresAt
    },
    internal: {
      sid: r.sid,
      createdAt: e.iat
    }
  };
}
const Jn = () => {
  const e = new Uint8Array(16);
  return crypto.getRandomValues(e), Array.from(e).map((t) => t.toString(16).padStart(2, "0")).join("");
};
class Pc extends Ns {
  constructor({ secret: t, store: r, rolling: n, absoluteDuration: s, inactivityDuration: a, cookieOptions: i }) {
    super({
      secret: t,
      rolling: n,
      absoluteDuration: s,
      inactivityDuration: a,
      cookieOptions: i
    }), this.store = r;
  }
  async get(t) {
    const r = t.get(this.sessionCookieName) || t.get(Ge);
    if (!r || !r.value)
      return null;
    let n = null;
    try {
      const { payload: a } = await We(r.value, this.secret);
      n = a.id;
    } catch (a) {
      if (a.code === "ERR_JWE_INVALID") {
        const i = await Ac(r.name, r.value, this.secret);
        if (!i)
          return null;
        n = i;
      }
    }
    if (!n)
      return null;
    const s = await this.store.get(n);
    return s ? xc(s) : null;
  }
  async set(t, r, n, s = !1) {
    var u;
    let a = null;
    const i = (u = t.get(this.sessionCookieName)) == null ? void 0 : u.value;
    if (i) {
      const { payload: g } = await We(i, this.secret);
      a = g.id;
    }
    a && s && (await this.store.delete(a), a = Jn()), a || (a = Jn());
    const o = await St({
      id: a
    }, this.secret), d = this.calculateMaxAge(n.internal.createdAt);
    r.set(this.sessionCookieName, o.toString(), {
      ...this.cookieConfig,
      maxAge: d
    }), await this.store.set(a, n), t.set(this.sessionCookieName, o.toString()), t.has(Ge) && r.delete(Ge);
  }
  async delete(t, r) {
    var a;
    const n = (a = t.get(this.sessionCookieName)) == null ? void 0 : a.value;
    if (await r.delete(this.sessionCookieName), !n)
      return;
    const { payload: s } = await We(n, this.secret);
    await this.store.delete(s.id);
  }
}
class Cc extends Ns {
  constructor({ secret: t, rolling: r, absoluteDuration: n, inactivityDuration: s, cookieOptions: a }) {
    super({
      secret: t,
      rolling: r,
      absoluteDuration: n,
      inactivityDuration: s,
      cookieOptions: a
    }), this.connectionTokenSetsCookieName = "__FC";
  }
  async get(t) {
    const r = Hn(this.sessionCookieName, t) ?? Hn(Ge, t);
    if (!r)
      return null;
    const n = await We(r, this.secret), s = kc(n), a = await Promise.all(this.getConnectionTokenSetsCookies(t).map((i) => We(i.value, this.secret)));
    return {
      ...s,
      // Ensure that when there are no connection token sets, we omit the property.
      ...a.length ? { connectionTokenSets: a.map((i) => i.payload) } : {}
    };
  }
  /**
   * save adds the encrypted session cookie as a `Set-Cookie` header.
   */
  async set(t, r, n) {
    const { connectionTokenSets: s, ...a } = n, i = await St(a, this.secret), o = this.calculateMaxAge(n.internal.createdAt), d = i.toString(), u = {
      ...this.cookieConfig,
      maxAge: o
    };
    Rc(this.sessionCookieName, d, u, t, r), s != null && s.length && await Promise.all(s.map((g, y) => this.storeInCookie(t, r, g, `${this.connectionTokenSetsCookieName}_${y}`, o))), $n(Ge, t, r);
  }
  async delete(t, r) {
    $n(this.sessionCookieName, t, r), this.getConnectionTokenSetsCookies(t).forEach((n) => r.delete(n.name));
  }
  async storeInCookie(t, r, n, s, a) {
    const i = await St(n, this.secret), o = i.toString();
    r.set(s, i.toString(), {
      ...this.cookieConfig,
      maxAge: a
    }), t.set(s, o);
    const d = new _r(new Headers());
    d.set(s, o, {
      ...this.cookieConfig,
      maxAge: a
    }), new TextEncoder().encode(d.toString()).length >= 4096 && (s === this.sessionCookieName ? console.warn(`The ${s} cookie size exceeds 4096 bytes, which may cause issues in some browsers. Consider removing any unnecessary custom claims from the access token or the user profile. Alternatively, you can use a stateful session implementation to store the session data in a data store.`) : console.warn(`The ${s} cookie size exceeds 4096 bytes, which may cause issues in some browsers. You can use a stateful session implementation to store the session data in a data store.`));
  }
  getConnectionTokenSetsCookies(t) {
    return t.getAll().filter((r) => r.name.startsWith(this.connectionTokenSetsCookieName));
  }
}
const Oc = "__txn_";
class Ic {
  constructor({ secret: t, cookieOptions: r }) {
    this.secret = t, this.transactionCookiePrefix = (r == null ? void 0 : r.prefix) ?? Oc, this.cookieConfig = {
      httpOnly: !0,
      sameSite: (r == null ? void 0 : r.sameSite) ?? "lax",
      // required to allow the cookie to be sent on the callback request
      secure: (r == null ? void 0 : r.secure) ?? !1,
      path: "/",
      maxAge: 60 * 60
      // 1 hour in seconds
    };
  }
  /**
   * Returns the name of the cookie used to store the transaction state.
   * The cookie name is derived from the state parameter to prevent collisions
   * between different transactions.
   */
  getTransactionCookieName(t) {
    return `${this.transactionCookiePrefix}${t}`;
  }
  async save(t, r) {
    const n = await St(r, this.secret);
    if (!r.state)
      throw new Error("Transaction state is required");
    t.set(this.getTransactionCookieName(r.state), n.toString(), this.cookieConfig);
  }
  async get(t, r) {
    var a;
    const n = this.getTransactionCookieName(r), s = (a = t.get(n)) == null ? void 0 : a.value;
    return s ? We(s, this.secret) : null;
  }
  async delete(t, r) {
    await t.delete(this.getTransactionCookieName(r));
  }
}
class Nc {
  constructor(t = {}) {
    var y, b, S, _, E, m, p, l, c;
    const { domain: r, clientId: n, clientSecret: s, appBaseUrl: a, secret: i, clientAssertionSigningKey: o } = this.validateAndExtractRequiredOptions(t), d = t.clientAssertionSigningAlg || process.env.AUTH0_CLIENT_ASSERTION_SIGNING_ALG, u = {
      name: ((b = (y = t.session) == null ? void 0 : y.cookie) == null ? void 0 : b.name) ?? "__session",
      secure: ((_ = (S = t.session) == null ? void 0 : S.cookie) == null ? void 0 : _.secure) ?? !1,
      sameSite: ((m = (E = t.session) == null ? void 0 : E.cookie) == null ? void 0 : m.sameSite) ?? "lax"
    }, g = {
      prefix: ((p = t.transactionCookie) == null ? void 0 : p.prefix) ?? "__txn_",
      secure: ((l = t.transactionCookie) == null ? void 0 : l.secure) ?? !1,
      sameSite: ((c = t.transactionCookie) == null ? void 0 : c.sameSite) ?? "lax"
    };
    if (a) {
      const { protocol: h } = new URL(a);
      h === "https:" && (u.secure = !0, g.secure = !0);
    }
    this.transactionStore = new Ic({
      ...t.session,
      secret: i,
      cookieOptions: g
    }), this.sessionStore = t.sessionStore ? new Pc({
      ...t.session,
      secret: i,
      store: t.sessionStore,
      cookieOptions: u
    }) : new Cc({
      ...t.session,
      secret: i,
      cookieOptions: u
    }), this.authClient = new rc({
      transactionStore: this.transactionStore,
      sessionStore: this.sessionStore,
      domain: r,
      clientId: n,
      clientSecret: s,
      clientAssertionSigningKey: o,
      clientAssertionSigningAlg: d,
      authorizationParameters: t.authorizationParameters,
      pushedAuthorizationRequests: t.pushedAuthorizationRequests,
      appBaseUrl: a,
      secret: i,
      signInReturnToPath: t.signInReturnToPath,
      beforeSessionSaved: t.beforeSessionSaved,
      onCallback: t.onCallback,
      routes: t.routes,
      allowInsecureRequests: t.allowInsecureRequests,
      httpTimeout: t.httpTimeout,
      enableTelemetry: t.enableTelemetry,
      enableAccessTokenEndpoint: t.enableAccessTokenEndpoint
    });
  }
  /**
   * middleware mounts the SDK routes to run as a middleware function.
   */
  middleware(t) {
    return this.authClient.handler.bind(this.authClient)(t);
  }
  /**
   * getSession returns the session data for the current request.
   */
  async getSession(t) {
    return t ? t instanceof M.NextRequest ? this.sessionStore.get(t.cookies) : this.sessionStore.get(this.createRequestCookies(t)) : this.sessionStore.get(await ze.cookies());
  }
  /**
   * getAccessToken returns the access token.
   *
   * NOTE: Server Components cannot set cookies. Calling `getAccessToken()` in a Server Component will cause the access token to be refreshed, if it is expired, and the updated token set will not to be persisted.
   * It is recommended to call `getAccessToken(req, res)` in the middleware if you need to retrieve the access token in a Server Component to ensure the updated token set is persisted.
   */
  async getAccessToken(t, r) {
    const n = t ? await this.getSession(t) : await this.getSession();
    if (!n)
      throw new cr(Ue.MISSING_SESSION, "The user does not have an active session.");
    const [s, a] = await this.authClient.getTokenSet(n.tokenSet);
    if (s)
      throw s;
    return (a.accessToken !== n.tokenSet.accessToken || a.expiresAt !== n.tokenSet.expiresAt || a.refreshToken !== n.tokenSet.refreshToken) && await this.saveToSession({
      ...n,
      tokenSet: a
    }, t, r), {
      token: a.accessToken,
      scope: a.scope,
      expiresAt: a.expiresAt
    };
  }
  /**
   * Retrieves an access token for a connection.
   *
   * This method attempts to obtain an access token for a specified connection.
   * It first checks if a session exists, either from the provided request or from cookies.
   * If no session is found, it throws a `AccessTokenForConnectionError` indicating
   * that the user does not have an active session.
   *
   * @param {AccessTokenForConnectionOptions} options - Options for retrieving an access token for a connection.
   * @param {PagesRouterRequest | NextRequest} [req] - An optional request object from which to extract session information.
   * @param {PagesRouterResponse | NextResponse} [res] - An optional response object from which to extract session information.
   *
   * @throws {AccessTokenForConnectionError} If the user does not have an active session.
   * @throws {Error} If there is an error during the token exchange process.
   *
   * @returns {Promise<{ token: string; expiresAt: number; scope?: string }} An object containing the access token and its expiration time.
   */
  async getAccessTokenForConnection(t, r, n) {
    var d, u;
    const s = r ? await this.getSession(r) : await this.getSession();
    if (!s)
      throw new ur(Fe.MISSING_SESSION, "The user does not have an active session.");
    const a = (d = s.connectionTokenSets) == null ? void 0 : d.find((g) => g.connection === t.connection), [i, o] = await this.authClient.getConnectionTokenSet(s.tokenSet, a, t);
    if (i !== null)
      throw i;
    if (o && (!a || o.accessToken !== a.accessToken || o.expiresAt !== a.expiresAt || o.scope !== a.scope)) {
      let g;
      a ? g = (u = s.connectionTokenSets) == null ? void 0 : u.map((y) => y.connection === t.connection ? o : y) : g = [...s.connectionTokenSets || [], o], await this.saveToSession({
        ...s,
        connectionTokenSets: g
      }, r, n);
    }
    return {
      token: o.accessToken,
      scope: o.scope,
      expiresAt: o.expiresAt
    };
  }
  /**
   * updateSession updates the session of the currently authenticated user. If the user does not have a session, an error is thrown.
   */
  async updateSession(t, r, n) {
    if (r) {
      const s = t;
      if (!n)
        throw new Error("The session data is missing.");
      if (s instanceof M.NextRequest && r instanceof M.NextResponse) {
        const a = await this.getSession(s);
        if (!a)
          throw new Error("The user is not authenticated.");
        await this.sessionStore.set(s.cookies, r.cookies, {
          ...n,
          internal: {
            ...a.internal
          }
        });
      } else {
        const a = await this.getSession(s);
        if (!a)
          throw new Error("The user is not authenticated.");
        const i = new Headers(), o = new _r(i), d = n, u = this.createRequestCookies(s), g = r;
        await this.sessionStore.set(u, o, {
          ...d,
          internal: {
            ...a.internal
          }
        });
        for (const [y, b] of i.entries())
          g.setHeader(y, b);
      }
    } else {
      const s = await this.getSession();
      if (!s)
        throw new Error("The user is not authenticated.");
      const a = t;
      if (!a)
        throw new Error("The session data is missing.");
      await this.sessionStore.set(await ze.cookies(), await ze.cookies(), {
        ...a,
        internal: {
          ...s.internal
        }
      });
    }
  }
  createRequestCookies(t) {
    const r = new Headers();
    for (const n in t.headers)
      if (Array.isArray(t.headers[n]))
        for (const s of t.headers[n])
          r.append(n, s);
      else
        r.append(n, t.headers[n] ?? "");
    return new lc(r);
  }
  async startInteractiveLogin(t) {
    return this.authClient.startInteractiveLogin(t);
  }
  async saveToSession(t, r, n) {
    if (r && n)
      if (r instanceof M.NextRequest && n instanceof M.NextResponse)
        await this.sessionStore.set(r.cookies, n.cookies, t);
      else {
        const s = new Headers(), a = new _r(s), i = n;
        await this.sessionStore.set(this.createRequestCookies(r), a, t);
        for (const [o, d] of s.entries())
          i.setHeader(o, d);
      }
    else
      try {
        await this.sessionStore.set(await ze.cookies(), await ze.cookies(), t);
      } catch {
        process.env.NODE_ENV === "development" && console.warn("Failed to persist the updated token set. `getAccessToken()` was likely called from a Server Component which cannot set cookies.");
      }
  }
  /**
   * Validates and extracts required configuration options.
   * @param options The client options
   * @returns The validated required options
   * @throws ConfigurationError if any required option is missing
   */
  validateAndExtractRequiredOptions(t) {
    const r = {
      domain: t.domain ?? process.env.AUTH0_DOMAIN,
      clientId: t.clientId ?? process.env.AUTH0_CLIENT_ID,
      appBaseUrl: t.appBaseUrl ?? process.env.APP_BASE_URL,
      secret: t.secret ?? process.env.AUTH0_SECRET
    }, n = t.clientSecret ?? process.env.AUTH0_CLIENT_SECRET, s = t.clientAssertionSigningKey ?? process.env.AUTH0_CLIENT_ASSERTION_SIGNING_KEY, a = !!(n || s), i = Object.entries(r).filter(([, d]) => !d).map(([d]) => d);
    if (a || i.push("clientAuthentication"), i.length) {
      const d = {
        domain: "AUTH0_DOMAIN",
        clientId: "AUTH0_CLIENT_ID",
        appBaseUrl: "APP_BASE_URL",
        secret: "AUTH0_SECRET"
      };
      throw new ya(dr.MISSING_REQUIRED_OPTIONS, i, d);
    }
    return {
      ...r,
      clientSecret: n,
      clientAssertionSigningKey: s
    };
  }
}
const Wc = new Nc({
  appBaseUrl: se().auth0.baseUrl,
  authorizationParameters: {
    audience: se().auth0.audience
  },
  beforeSessionSaved: async (e, t) => ({
    ...e,
    user: {
      ...e.user
    }
  }),
  clientId: se().auth0.clientId,
  clientSecret: se().auth0.clientSecret,
  domain: se().auth0.domain,
  onCallback: async (e, t, r) => {
    var n;
    return e ? M.NextResponse.redirect(
      new URL(`/error?error=${e.message}`, se().auth0.baseUrl)
    ) : Gs.get("SETUP_DEV_AFTER_AUTH0_LOGIN").asBool() ? (await fetch(se().endpoint.admin.setupDev, {
      body: JSON.stringify({}),
      headers: {
        Authorization: `Bearer ${r == null ? void 0 : r.tokenSet.accessToken}`
        // 'X-ID-TOKEN': session?.user['idToken'] ?? '',
      },
      method: "POST"
    }), M.NextResponse.redirect(
      new URL(t.returnTo || "/apps", se().auth0.baseUrl)
    )) : (n = process.env.NEXT_PUBLIC_WEB_HOST) != null && n.includes("codelab.app") ? (await fetch(se().endpoint.user.save, {
      body: JSON.stringify({}),
      headers: {
        Authorization: `Bearer ${r == null ? void 0 : r.tokenSet.accessToken}`
        // 'X-ID-TOKEN': session?.user['idToken'] ?? '',
      },
      method: "POST"
    }), M.NextResponse.redirect(
      new URL(t.returnTo || "/apps", se().auth0.baseUrl)
    )) : M.NextResponse.redirect(
      new URL(t.returnTo || "/apps", se().auth0.baseUrl)
    );
  },
  secret: se().auth0.secret,
  session: {},
  signInReturnToPath: "/apps"
});
export {
  Wc as auth0Instance
};
