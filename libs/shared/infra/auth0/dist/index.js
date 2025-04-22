var uo = Object.defineProperty;
var lo = (e, t, r) => t in e ? uo(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var x = (e, t, r) => lo(e, typeof t != "symbol" ? t + "" : t, r);
import ui from "react";
var gt = {}, er = {}, tr = {}, rr = {}, nr, Ss;
function fo() {
  if (Ss) return nr;
  Ss = 1;
  var e = Object.defineProperty, t = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, n = Object.prototype.hasOwnProperty, s = (m, P) => {
    for (var f in P)
      e(m, f, { get: P[f], enumerable: !0 });
  }, i = (m, P, f, _) => {
    if (P && typeof P == "object" || typeof P == "function")
      for (let A of r(P))
        !n.call(m, A) && A !== f && e(m, A, { get: () => P[A], enumerable: !(_ = t(P, A)) || _.enumerable });
    return m;
  }, a = (m) => i(e({}, "__esModule", { value: !0 }), m), o = {};
  s(o, {
    RequestCookies: () => y,
    ResponseCookies: () => h,
    parseCookie: () => u,
    parseSetCookie: () => d,
    stringifyCookie: () => c
  }), nr = a(o);
  function c(m) {
    var P;
    const f = [
      "path" in m && m.path && `Path=${m.path}`,
      "expires" in m && (m.expires || m.expires === 0) && `Expires=${(typeof m.expires == "number" ? new Date(m.expires) : m.expires).toUTCString()}`,
      "maxAge" in m && typeof m.maxAge == "number" && `Max-Age=${m.maxAge}`,
      "domain" in m && m.domain && `Domain=${m.domain}`,
      "secure" in m && m.secure && "Secure",
      "httpOnly" in m && m.httpOnly && "HttpOnly",
      "sameSite" in m && m.sameSite && `SameSite=${m.sameSite}`,
      "partitioned" in m && m.partitioned && "Partitioned",
      "priority" in m && m.priority && `Priority=${m.priority}`
    ].filter(Boolean), _ = `${m.name}=${encodeURIComponent((P = m.value) != null ? P : "")}`;
    return f.length === 0 ? _ : `${_}; ${f.join("; ")}`;
  }
  function u(m) {
    const P = /* @__PURE__ */ new Map();
    for (const f of m.split(/; */)) {
      if (!f)
        continue;
      const _ = f.indexOf("=");
      if (_ === -1) {
        P.set(f, "true");
        continue;
      }
      const [A, k] = [f.slice(0, _), f.slice(_ + 1)];
      try {
        P.set(A, decodeURIComponent(k ?? "true"));
      } catch {
      }
    }
    return P;
  }
  function d(m) {
    if (!m)
      return;
    const [[P, f], ..._] = u(m), {
      domain: A,
      expires: k,
      httponly: I,
      maxage: O,
      path: j,
      samesite: Y,
      secure: Re,
      partitioned: ve,
      priority: oe
    } = Object.fromEntries(
      _.map(([Te, Ee]) => [
        Te.toLowerCase().replace(/-/g, ""),
        Ee
      ])
    ), ye = {
      name: P,
      value: decodeURIComponent(f),
      domain: A,
      ...k && { expires: new Date(k) },
      ...I && { httpOnly: !0 },
      ...typeof O == "string" && { maxAge: Number(O) },
      path: j,
      ...Y && { sameSite: b(Y) },
      ...Re && { secure: !0 },
      ...oe && { priority: R(oe) },
      ...ve && { partitioned: !0 }
    };
    return p(ye);
  }
  function p(m) {
    const P = {};
    for (const f in m)
      m[f] && (P[f] = m[f]);
    return P;
  }
  var w = ["strict", "lax", "none"];
  function b(m) {
    return m = m.toLowerCase(), w.includes(m) ? m : void 0;
  }
  var S = ["low", "medium", "high"];
  function R(m) {
    return m = m.toLowerCase(), S.includes(m) ? m : void 0;
  }
  function g(m) {
    if (!m)
      return [];
    var P = [], f = 0, _, A, k, I, O;
    function j() {
      for (; f < m.length && /\s/.test(m.charAt(f)); )
        f += 1;
      return f < m.length;
    }
    function Y() {
      return A = m.charAt(f), A !== "=" && A !== ";" && A !== ",";
    }
    for (; f < m.length; ) {
      for (_ = f, O = !1; j(); )
        if (A = m.charAt(f), A === ",") {
          for (k = f, f += 1, j(), I = f; f < m.length && Y(); )
            f += 1;
          f < m.length && m.charAt(f) === "=" ? (O = !0, f = I, P.push(m.substring(_, k)), _ = f) : f = k + 1;
        } else
          f += 1;
      (!O || f >= m.length) && P.push(m.substring(_, m.length));
    }
    return P;
  }
  var y = class {
    constructor(m) {
      this._parsed = /* @__PURE__ */ new Map(), this._headers = m;
      const P = m.get("cookie");
      if (P) {
        const f = u(P);
        for (const [_, A] of f)
          this._parsed.set(_, { name: _, value: A });
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
    get(...m) {
      const P = typeof m[0] == "string" ? m[0] : m[0].name;
      return this._parsed.get(P);
    }
    getAll(...m) {
      var P;
      const f = Array.from(this._parsed);
      if (!m.length)
        return f.map(([A, k]) => k);
      const _ = typeof m[0] == "string" ? m[0] : (P = m[0]) == null ? void 0 : P.name;
      return f.filter(([A]) => A === _).map(([A, k]) => k);
    }
    has(m) {
      return this._parsed.has(m);
    }
    set(...m) {
      const [P, f] = m.length === 1 ? [m[0].name, m[0].value] : m, _ = this._parsed;
      return _.set(P, { name: P, value: f }), this._headers.set(
        "cookie",
        Array.from(_).map(([A, k]) => c(k)).join("; ")
      ), this;
    }
    /**
     * Delete the cookies matching the passed name or names in the request.
     */
    delete(m) {
      const P = this._parsed, f = Array.isArray(m) ? m.map((_) => P.delete(_)) : P.delete(m);
      return this._headers.set(
        "cookie",
        Array.from(P).map(([_, A]) => c(A)).join("; ")
      ), f;
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
      return [...this._parsed.values()].map((m) => `${m.name}=${encodeURIComponent(m.value)}`).join("; ");
    }
  }, h = class {
    constructor(m) {
      this._parsed = /* @__PURE__ */ new Map();
      var P, f, _;
      this._headers = m;
      const A = (_ = (f = (P = m.getSetCookie) == null ? void 0 : P.call(m)) != null ? f : m.get("set-cookie")) != null ? _ : [], k = Array.isArray(A) ? A : g(A);
      for (const I of k) {
        const O = d(I);
        O && this._parsed.set(O.name, O);
      }
    }
    /**
     * {@link https://wicg.github.io/cookie-store/#CookieStore-get CookieStore#get} without the Promise.
     */
    get(...m) {
      const P = typeof m[0] == "string" ? m[0] : m[0].name;
      return this._parsed.get(P);
    }
    /**
     * {@link https://wicg.github.io/cookie-store/#CookieStore-getAll CookieStore#getAll} without the Promise.
     */
    getAll(...m) {
      var P;
      const f = Array.from(this._parsed.values());
      if (!m.length)
        return f;
      const _ = typeof m[0] == "string" ? m[0] : (P = m[0]) == null ? void 0 : P.name;
      return f.filter((A) => A.name === _);
    }
    has(m) {
      return this._parsed.has(m);
    }
    /**
     * {@link https://wicg.github.io/cookie-store/#CookieStore-set CookieStore#set} without the Promise.
     */
    set(...m) {
      const [P, f, _] = m.length === 1 ? [m[0].name, m[0].value, m[0]] : m, A = this._parsed;
      return A.set(P, E({ name: P, value: f, ..._ })), l(A, this._headers), this;
    }
    /**
     * {@link https://wicg.github.io/cookie-store/#CookieStore-delete CookieStore#delete} without the Promise.
     */
    delete(...m) {
      const [P, f] = typeof m[0] == "string" ? [m[0]] : [m[0].name, m[0]];
      return this.set({ ...f, name: P, value: "", expires: /* @__PURE__ */ new Date(0) });
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
      return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
    }
    toString() {
      return [...this._parsed.values()].map(c).join("; ");
    }
  };
  function l(m, P) {
    P.delete("set-cookie");
    for (const [, f] of m) {
      const _ = c(f);
      P.append("set-cookie", _);
    }
  }
  function E(m = { name: "", value: "" }) {
    return typeof m.expires == "number" && (m.expires = new Date(m.expires)), m.maxAge && (m.expires = new Date(Date.now() + m.maxAge * 1e3)), (m.path === null || m.path === void 0) && (m.path = "/"), m;
  }
  return nr;
}
var As;
function bt() {
  return As || (As = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(n, s) {
      for (var i in s) Object.defineProperty(n, i, {
        enumerable: !0,
        get: s[i]
      });
    }
    t(e, {
      RequestCookies: function() {
        return r.RequestCookies;
      },
      ResponseCookies: function() {
        return r.ResponseCookies;
      },
      stringifyCookie: function() {
        return r.stringifyCookie;
      }
    });
    const r = fo();
  }(rr)), rr;
}
var sr = {}, Rs;
function Kn() {
  return Rs || (Rs = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "ReflectAdapter", {
      enumerable: !0,
      get: function() {
        return t;
      }
    });
    class t {
      static get(n, s, i) {
        const a = Reflect.get(n, s, i);
        return typeof a == "function" ? a.bind(n) : a;
      }
      static set(n, s, i, a) {
        return Reflect.set(n, s, i, a);
      }
      static has(n, s) {
        return Reflect.has(n, s);
      }
      static deleteProperty(n, s) {
        return Reflect.deleteProperty(n, s);
      }
    }
  }(sr)), sr;
}
var ar = {}, ir = {}, or = {}, vs;
function jn() {
  return vs || (vs = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(c, u) {
      for (var d in u) Object.defineProperty(c, d, {
        enumerable: !0,
        get: u[d]
      });
    }
    t(e, {
      bindSnapshot: function() {
        return a;
      },
      createAsyncLocalStorage: function() {
        return i;
      },
      createSnapshot: function() {
        return o;
      }
    });
    const r = Object.defineProperty(new Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", {
      value: "E504",
      enumerable: !1,
      configurable: !0
    });
    class n {
      disable() {
        throw r;
      }
      getStore() {
      }
      run() {
        throw r;
      }
      exit() {
        throw r;
      }
      enterWith() {
        throw r;
      }
      static bind(u) {
        return u;
      }
    }
    const s = typeof globalThis < "u" && globalThis.AsyncLocalStorage;
    function i() {
      return s ? new s() : new n();
    }
    function a(c) {
      return s ? s.bind(c) : n.bind(c);
    }
    function o() {
      return s ? s.snapshot() : function(c, ...u) {
        return c(...u);
      };
    }
  }(or)), or;
}
var Ts;
function ho() {
  return Ts || (Ts = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "workAsyncStorageInstance", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const r = (0, jn().createAsyncLocalStorage)();
  }(ir)), ir;
}
var Ps;
function Me() {
  return Ps || (Ps = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "workAsyncStorage", {
      enumerable: !0,
      get: function() {
        return t.workAsyncStorageInstance;
      }
    });
    const t = ho();
  }(ar)), ar;
}
var cr = {}, ur = {}, Os;
function po() {
  return Os || (Os = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "workUnitAsyncStorageInstance", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const r = (0, jn().createAsyncLocalStorage)();
  }(ur)), ur;
}
var Ct = { exports: {} }, Cs;
function mo() {
  return Cs || (Cs = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function r(l, E) {
      for (var m in E) Object.defineProperty(l, m, {
        enumerable: !0,
        get: E[m]
      });
    }
    r(t, {
      ACTION_HEADER: function() {
        return s;
      },
      FLIGHT_HEADERS: function() {
        return w;
      },
      NEXT_DID_POSTPONE_HEADER: function() {
        return R;
      },
      NEXT_HMR_REFRESH_HASH_COOKIE: function() {
        return u;
      },
      NEXT_HMR_REFRESH_HEADER: function() {
        return c;
      },
      NEXT_IS_PRERENDER_HEADER: function() {
        return h;
      },
      NEXT_REWRITTEN_PATH_HEADER: function() {
        return g;
      },
      NEXT_REWRITTEN_QUERY_HEADER: function() {
        return y;
      },
      NEXT_ROUTER_PREFETCH_HEADER: function() {
        return a;
      },
      NEXT_ROUTER_SEGMENT_PREFETCH_HEADER: function() {
        return o;
      },
      NEXT_ROUTER_STALE_TIME_HEADER: function() {
        return S;
      },
      NEXT_ROUTER_STATE_TREE_HEADER: function() {
        return i;
      },
      NEXT_RSC_UNION_QUERY: function() {
        return b;
      },
      NEXT_URL: function() {
        return d;
      },
      RSC_CONTENT_TYPE_HEADER: function() {
        return p;
      },
      RSC_HEADER: function() {
        return n;
      }
    });
    const n = "RSC", s = "Next-Action", i = "Next-Router-State-Tree", a = "Next-Router-Prefetch", o = "Next-Router-Segment-Prefetch", c = "Next-HMR-Refresh", u = "__next_hmr_refresh_hash__", d = "Next-Url", p = "text/x-component", w = [
      n,
      i,
      a,
      c,
      o
    ], b = "_rsc", S = "x-nextjs-stale-time", R = "x-nextjs-postponed", g = "x-nextjs-rewritten-path", y = "x-nextjs-rewritten-query", h = "x-nextjs-prerender";
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Ct, Ct.exports)), Ct.exports;
}
var Is;
function Ye() {
  return Is || (Is = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(d, p) {
      for (var w in p) Object.defineProperty(d, w, {
        enumerable: !0,
        get: p[w]
      });
    }
    t(e, {
      getDraftModeProviderForCacheScope: function() {
        return u;
      },
      getExpectedRequestStore: function() {
        return s;
      },
      getHmrRefreshHash: function() {
        return c;
      },
      getPrerenderResumeDataCache: function() {
        return a;
      },
      getRenderResumeDataCache: function() {
        return o;
      },
      throwForMissingRequestStore: function() {
        return i;
      },
      workUnitAsyncStorage: function() {
        return r.workUnitAsyncStorageInstance;
      }
    });
    const r = po(), n = mo();
    function s(d) {
      const p = r.workUnitAsyncStorageInstance.getStore();
      switch (p || i(d), p.type) {
        case "request":
          return p;
        case "prerender":
        case "prerender-ppr":
        case "prerender-legacy":
          throw Object.defineProperty(new Error(`\`${d}\` cannot be called inside a prerender. This is a bug in Next.js.`), "__NEXT_ERROR_CODE", {
            value: "E401",
            enumerable: !1,
            configurable: !0
          });
        case "cache":
          throw Object.defineProperty(new Error(`\`${d}\` cannot be called inside "use cache". Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
            value: "E37",
            enumerable: !1,
            configurable: !0
          });
        case "unstable-cache":
          throw Object.defineProperty(new Error(`\`${d}\` cannot be called inside unstable_cache. Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
            value: "E69",
            enumerable: !1,
            configurable: !0
          });
        default:
          return p;
      }
    }
    function i(d) {
      throw Object.defineProperty(new Error(`\`${d}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", {
        value: "E251",
        enumerable: !1,
        configurable: !0
      });
    }
    function a(d) {
      return d.type === "prerender" || d.type === "prerender-ppr" ? d.prerenderResumeDataCache : null;
    }
    function o(d) {
      return d.type !== "prerender-legacy" && d.type !== "cache" && d.type !== "unstable-cache" ? d.type === "request" ? d.renderResumeDataCache : d.prerenderResumeDataCache : null;
    }
    function c(d, p) {
      var w;
      if (d.dev)
        return p.type === "cache" || p.type === "prerender" ? p.hmrRefreshHash : p.type === "request" ? (w = p.cookies.get(n.NEXT_HMR_REFRESH_HASH_COOKIE)) == null ? void 0 : w.value : void 0;
    }
    function u(d, p) {
      if (d.isDraftMode)
        switch (p.type) {
          case "cache":
          case "unstable-cache":
          case "request":
            return p.draftMode;
          default:
            return;
        }
    }
  }(cr)), cr;
}
var xs;
function go() {
  return xs || (xs = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(g, y) {
      for (var h in y) Object.defineProperty(g, h, {
        enumerable: !0,
        get: y[h]
      });
    }
    t(e, {
      MutableRequestCookiesAdapter: function() {
        return p;
      },
      ReadonlyRequestCookiesError: function() {
        return a;
      },
      RequestCookiesAdapter: function() {
        return o;
      },
      appendMutableCookies: function() {
        return d;
      },
      areCookiesMutableInCurrentPhase: function() {
        return b;
      },
      getModifiedCookieValues: function() {
        return u;
      },
      responseCookiesToRequestCookies: function() {
        return R;
      },
      wrapWithMutableAccessCheck: function() {
        return w;
      }
    });
    const r = bt(), n = Kn(), s = Me(), i = Ye();
    class a extends Error {
      constructor() {
        super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
      }
      static callable() {
        throw new a();
      }
    }
    class o {
      static seal(y) {
        return new Proxy(y, {
          get(h, l, E) {
            switch (l) {
              case "clear":
              case "delete":
              case "set":
                return a.callable;
              default:
                return n.ReflectAdapter.get(h, l, E);
            }
          }
        });
      }
    }
    const c = Symbol.for("next.mutated.cookies");
    function u(g) {
      const y = g[c];
      return !y || !Array.isArray(y) || y.length === 0 ? [] : y;
    }
    function d(g, y) {
      const h = u(y);
      if (h.length === 0)
        return !1;
      const l = new r.ResponseCookies(g), E = l.getAll();
      for (const m of h)
        l.set(m);
      for (const m of E)
        l.set(m);
      return !0;
    }
    class p {
      static wrap(y, h) {
        const l = new r.ResponseCookies(new Headers());
        for (const _ of y.getAll())
          l.set(_);
        let E = [];
        const m = /* @__PURE__ */ new Set(), P = () => {
          const _ = s.workAsyncStorage.getStore();
          if (_ && (_.pathWasRevalidated = !0), E = l.getAll().filter((k) => m.has(k.name)), h) {
            const k = [];
            for (const I of E) {
              const O = new r.ResponseCookies(new Headers());
              O.set(I), k.push(O.toString());
            }
            h(k);
          }
        }, f = new Proxy(l, {
          get(_, A, k) {
            switch (A) {
              // A special symbol to get the modified cookie values
              case c:
                return E;
              // TODO: Throw error if trying to set a cookie after the response
              // headers have been set.
              case "delete":
                return function(...I) {
                  m.add(typeof I[0] == "string" ? I[0] : I[0].name);
                  try {
                    return _.delete(...I), f;
                  } finally {
                    P();
                  }
                };
              case "set":
                return function(...I) {
                  m.add(typeof I[0] == "string" ? I[0] : I[0].name);
                  try {
                    return _.set(...I), f;
                  } finally {
                    P();
                  }
                };
              default:
                return n.ReflectAdapter.get(_, A, k);
            }
          }
        });
        return f;
      }
    }
    function w(g) {
      const y = new Proxy(g, {
        get(h, l, E) {
          switch (l) {
            case "delete":
              return function(...m) {
                return S("cookies().delete"), h.delete(...m), y;
              };
            case "set":
              return function(...m) {
                return S("cookies().set"), h.set(...m), y;
              };
            default:
              return n.ReflectAdapter.get(h, l, E);
          }
        }
      });
      return y;
    }
    function b(g) {
      return g.phase === "action";
    }
    function S(g) {
      const y = (0, i.getExpectedRequestStore)(g);
      if (!b(y))
        throw new a();
    }
    function R(g) {
      const y = new r.RequestCookies(new Headers());
      for (const h of g.getAll())
        y.set(h);
      return y;
    }
  }(tr)), tr;
}
var lr = {}, It = { exports: {} }, Ns;
function li() {
  return Ns || (Ns = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function r(a, o) {
      for (var c in o) Object.defineProperty(a, c, {
        enumerable: !0,
        get: o[c]
      });
    }
    r(t, {
      DynamicServerError: function() {
        return s;
      },
      isDynamicServerError: function() {
        return i;
      }
    });
    const n = "DYNAMIC_SERVER_USAGE";
    class s extends Error {
      constructor(o) {
        super("Dynamic server usage: " + o), this.description = o, this.digest = n;
      }
    }
    function i(a) {
      return typeof a != "object" || a === null || !("digest" in a) || typeof a.digest != "string" ? !1 : a.digest === n;
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(It, It.exports)), It.exports;
}
var xt = { exports: {} }, ks;
function pt() {
  return ks || (ks = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function r(a, o) {
      for (var c in o) Object.defineProperty(a, c, {
        enumerable: !0,
        get: o[c]
      });
    }
    r(t, {
      StaticGenBailoutError: function() {
        return s;
      },
      isStaticGenBailoutError: function() {
        return i;
      }
    });
    const n = "NEXT_STATIC_GEN_BAILOUT";
    class s extends Error {
      constructor(...o) {
        super(...o), this.code = n;
      }
    }
    function i(a) {
      return typeof a != "object" || a === null || !("code" in a) ? !1 : a.code === n;
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(xt, xt.exports)), xt.exports;
}
var dr = {}, Ds;
function Rt() {
  return Ds || (Ds = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(c, u) {
      for (var d in u) Object.defineProperty(c, d, {
        enumerable: !0,
        get: u[d]
      });
    }
    t(e, {
      isHangingPromiseRejectionError: function() {
        return r;
      },
      makeHangingPromise: function() {
        return a;
      }
    });
    function r(c) {
      return typeof c != "object" || c === null || !("digest" in c) ? !1 : c.digest === n;
    }
    const n = "HANGING_PROMISE_REJECTION";
    class s extends Error {
      constructor(u) {
        super(`During prerendering, ${u} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${u} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context.`), this.expression = u, this.digest = n;
      }
    }
    const i = /* @__PURE__ */ new WeakMap();
    function a(c, u) {
      if (c.aborted)
        return Promise.reject(new s(u));
      {
        const d = new Promise((p, w) => {
          const b = w.bind(null, new s(u));
          let S = i.get(c);
          if (S)
            S.push(b);
          else {
            const R = [
              b
            ];
            i.set(c, R), c.addEventListener("abort", () => {
              for (let g = 0; g < R.length; g++)
                R[g]();
            }, {
              once: !0
            });
          }
        });
        return d.catch(o), d;
      }
    }
    function o() {
    }
  }(dr)), dr;
}
var fr = {}, Us;
function _o() {
  return Us || (Us = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(i, a) {
      for (var o in a) Object.defineProperty(i, o, {
        enumerable: !0,
        get: a[o]
      });
    }
    t(e, {
      METADATA_BOUNDARY_NAME: function() {
        return r;
      },
      OUTLET_BOUNDARY_NAME: function() {
        return s;
      },
      VIEWPORT_BOUNDARY_NAME: function() {
        return n;
      }
    });
    const r = "__next_metadata_boundary__", n = "__next_viewport_boundary__", s = "__next_outlet_boundary__";
  }(fr)), fr;
}
var hr = {}, Ls;
function Jn() {
  return Ls || (Ls = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(a, o) {
      for (var c in o) Object.defineProperty(a, c, {
        enumerable: !0,
        get: o[c]
      });
    }
    t(e, {
      atLeastOneTask: function() {
        return s;
      },
      scheduleImmediate: function() {
        return n;
      },
      scheduleOnNextTick: function() {
        return r;
      },
      waitAtLeastOneReactRenderTask: function() {
        return i;
      }
    });
    const r = (a) => {
      Promise.resolve().then(() => {
        process.env.NEXT_RUNTIME === "edge" ? setTimeout(a, 0) : process.nextTick(a);
      });
    }, n = (a) => {
      process.env.NEXT_RUNTIME === "edge" ? setTimeout(a, 0) : setImmediate(a);
    };
    function s() {
      return new Promise((a) => n(a));
    }
    function i() {
      return process.env.NEXT_RUNTIME === "edge" ? new Promise((a) => setTimeout(a, 0)) : new Promise((a) => setImmediate(a));
    }
  }(hr)), hr;
}
var Hs;
function vt() {
  return Hs || (Hs = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(T, v) {
      for (var C in v) Object.defineProperty(T, C, {
        enumerable: !0,
        get: v[C]
      });
    }
    t(e, {
      Postpone: function() {
        return _;
      },
      abortAndThrowOnSynchronousRequestDataAccess: function() {
        return P;
      },
      abortOnSynchronousPlatformIOAccess: function() {
        return E;
      },
      accessedDynamicData: function() {
        return ve;
      },
      annotateDynamicAccess: function() {
        return tt;
      },
      consumeDynamicAccess: function() {
        return oe;
      },
      createDynamicTrackingState: function() {
        return w;
      },
      createDynamicValidationState: function() {
        return b;
      },
      createHangingInputAbortSignal: function() {
        return Pe;
      },
      createPostponedAbortSignal: function() {
        return Ee;
      },
      formatDynamicAPIAccesses: function() {
        return ye;
      },
      getFirstDynamicReason: function() {
        return S;
      },
      isDynamicPostpone: function() {
        return I;
      },
      isPrerenderInterruptedError: function() {
        return Re;
      },
      markCurrentScopeAsDynamic: function() {
        return R;
      },
      postponeWithTracking: function() {
        return A;
      },
      throwIfDisallowedDynamic: function() {
        return Ke;
      },
      throwToInterruptStaticGeneration: function() {
        return y;
      },
      trackAllowedDynamicAccess: function() {
        return nt;
      },
      trackDynamicDataInDynamicRender: function() {
        return h;
      },
      trackFallbackParamAccessed: function() {
        return g;
      },
      trackSynchronousPlatformIOAccessInDev: function() {
        return m;
      },
      trackSynchronousRequestDataAccessInDev: function() {
        return f;
      },
      useDynamicRouteParams: function() {
        return qe;
      }
    });
    const r = /* @__PURE__ */ d(ui), n = li(), s = pt(), i = Ye(), a = Me(), o = Rt(), c = _o(), u = Jn();
    function d(T) {
      return T && T.__esModule ? T : {
        default: T
      };
    }
    const p = typeof r.default.unstable_postpone == "function";
    function w(T) {
      return {
        isDebugDynamicAccesses: T,
        dynamicAccesses: [],
        syncDynamicExpression: void 0,
        syncDynamicErrorWithStack: null
      };
    }
    function b() {
      return {
        hasSuspendedDynamic: !1,
        hasDynamicMetadata: !1,
        hasDynamicViewport: !1,
        hasSyncDynamicErrors: !1,
        dynamicErrors: []
      };
    }
    function S(T) {
      var v;
      return (v = T.dynamicAccesses[0]) == null ? void 0 : v.expression;
    }
    function R(T, v, C) {
      if (!(v && (v.type === "cache" || v.type === "unstable-cache")) && !(T.forceDynamic || T.forceStatic)) {
        if (T.dynamicShouldError)
          throw Object.defineProperty(new s.StaticGenBailoutError(`Route ${T.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${C}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
            value: "E553",
            enumerable: !1,
            configurable: !0
          });
        if (v)
          if (v.type === "prerender-ppr")
            A(T.route, C, v.dynamicTracking);
          else if (v.type === "prerender-legacy") {
            v.revalidate = 0;
            const W = Object.defineProperty(new n.DynamicServerError(`Route ${T.route} couldn't be rendered statically because it used ${C}. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
              value: "E550",
              enumerable: !1,
              configurable: !0
            });
            throw T.dynamicUsageDescription = C, T.dynamicUsageStack = W.stack, W;
          } else process.env.NODE_ENV === "development" && v && v.type === "request" && (v.usedDynamic = !0);
      }
    }
    function g(T, v) {
      const C = i.workUnitAsyncStorage.getStore();
      !C || C.type !== "prerender-ppr" || A(T.route, v, C.dynamicTracking);
    }
    function y(T, v, C) {
      const W = Object.defineProperty(new n.DynamicServerError(`Route ${v.route} couldn't be rendered statically because it used \`${T}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
        value: "E558",
        enumerable: !1,
        configurable: !0
      });
      throw C.revalidate = 0, v.dynamicUsageDescription = T, v.dynamicUsageStack = W.stack, W;
    }
    function h(T, v) {
      if (v) {
        if (v.type === "cache" || v.type === "unstable-cache")
          return;
        (v.type === "prerender" || v.type === "prerender-legacy") && (v.revalidate = 0), process.env.NODE_ENV === "development" && v.type === "request" && (v.usedDynamic = !0);
      }
    }
    function l(T, v, C) {
      const W = `Route ${T} needs to bail out of prerendering at this point because it used ${v}.`, V = Y(W);
      C.controller.abort(V);
      const U = C.dynamicTracking;
      U && U.dynamicAccesses.push({
        // When we aren't debugging, we don't need to create another error for the
        // stack trace.
        stack: U.isDebugDynamicAccesses ? new Error().stack : void 0,
        expression: v
      });
    }
    function E(T, v, C, W) {
      const V = W.dynamicTracking;
      V && V.syncDynamicErrorWithStack === null && (V.syncDynamicExpression = v, V.syncDynamicErrorWithStack = C), l(T, v, W);
    }
    function m(T) {
      T.prerenderPhase = !1;
    }
    function P(T, v, C, W) {
      if (W.controller.signal.aborted === !1) {
        const U = W.dynamicTracking;
        U && U.syncDynamicErrorWithStack === null && (U.syncDynamicExpression = v, U.syncDynamicErrorWithStack = C, W.validating === !0 && (U.syncDynamicLogged = !0)), l(T, v, W);
      }
      throw Y(`Route ${T} needs to bail out of prerendering at this point because it used ${v}.`);
    }
    const f = m;
    function _({ reason: T, route: v }) {
      const C = i.workUnitAsyncStorage.getStore(), W = C && C.type === "prerender-ppr" ? C.dynamicTracking : null;
      A(v, T, W);
    }
    function A(T, v, C) {
      Te(), C && C.dynamicAccesses.push({
        // When we aren't debugging, we don't need to create another error for the
        // stack trace.
        stack: C.isDebugDynamicAccesses ? new Error().stack : void 0,
        expression: v
      }), r.default.unstable_postpone(k(T, v));
    }
    function k(T, v) {
      return `Route ${T} needs to bail out of prerendering at this point because it used ${v}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
    }
    function I(T) {
      return typeof T == "object" && T !== null && typeof T.message == "string" ? O(T.message) : !1;
    }
    function O(T) {
      return T.includes("needs to bail out of prerendering at this point because it used") && T.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error");
    }
    if (O(k("%%%", "^^^")) === !1)
      throw Object.defineProperty(new Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", {
        value: "E296",
        enumerable: !1,
        configurable: !0
      });
    const j = "NEXT_PRERENDER_INTERRUPTED";
    function Y(T) {
      const v = Object.defineProperty(new Error(T), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: !1,
        configurable: !0
      });
      return v.digest = j, v;
    }
    function Re(T) {
      return typeof T == "object" && T !== null && T.digest === j && "name" in T && "message" in T && T instanceof Error;
    }
    function ve(T) {
      return T.length > 0;
    }
    function oe(T, v) {
      return T.dynamicAccesses.push(...v.dynamicAccesses), T.dynamicAccesses;
    }
    function ye(T) {
      return T.filter((v) => typeof v.stack == "string" && v.stack.length > 0).map(({ expression: v, stack: C }) => (C = C.split(`
`).slice(4).filter((W) => !(W.includes("node_modules/next/") || W.includes(" (<anonymous>)") || W.includes(" (node:"))).join(`
`), `Dynamic API Usage Debug - ${v}:
${C}`));
    }
    function Te() {
      if (!p)
        throw Object.defineProperty(new Error("Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js"), "__NEXT_ERROR_CODE", {
          value: "E224",
          enumerable: !1,
          configurable: !0
        });
    }
    function Ee(T) {
      Te();
      const v = new AbortController();
      try {
        r.default.unstable_postpone(T);
      } catch (C) {
        v.abort(C);
      }
      return v.signal;
    }
    function Pe(T) {
      const v = new AbortController();
      return T.cacheSignal ? T.cacheSignal.inputReady().then(() => {
        v.abort();
      }) : (0, u.scheduleOnNextTick)(() => v.abort()), v.signal;
    }
    function tt(T, v) {
      const C = v.dynamicTracking;
      C && C.dynamicAccesses.push({
        stack: C.isDebugDynamicAccesses ? new Error().stack : void 0,
        expression: T
      });
    }
    function qe(T) {
      const v = a.workAsyncStorage.getStore();
      if (v && v.isStaticGeneration && v.fallbackRouteParams && v.fallbackRouteParams.size > 0) {
        const C = i.workUnitAsyncStorage.getStore();
        C && (C.type === "prerender" ? r.default.use((0, o.makeHangingPromise)(C.renderSignal, T)) : C.type === "prerender-ppr" ? A(v.route, T, C.dynamicTracking) : C.type === "prerender-legacy" && y(T, v, C));
      }
    }
    const We = /\n\s+at Suspense \(<anonymous>\)/, rt = new RegExp(`\\n\\s+at ${c.METADATA_BOUNDARY_NAME}[\\n\\s]`), Oe = new RegExp(`\\n\\s+at ${c.VIEWPORT_BOUNDARY_NAME}[\\n\\s]`), $e = new RegExp(`\\n\\s+at ${c.OUTLET_BOUNDARY_NAME}[\\n\\s]`);
    function nt(T, v, C, W, V) {
      if (!$e.test(v))
        if (rt.test(v)) {
          C.hasDynamicMetadata = !0;
          return;
        } else if (Oe.test(v)) {
          C.hasDynamicViewport = !0;
          return;
        } else if (We.test(v)) {
          C.hasSuspendedDynamic = !0;
          return;
        } else if (W.syncDynamicErrorWithStack || V.syncDynamicErrorWithStack) {
          C.hasSyncDynamicErrors = !0;
          return;
        } else {
          const U = `Route "${T}": A component accessed data, headers, params, searchParams, or a short-lived cache without a Suspense boundary nor a "use cache" above it. We don't have the exact line number added to error messages yet but you can see which component in the stack below. See more info: https://nextjs.org/docs/messages/next-prerender-missing-suspense`, ge = Ce(U, v);
          C.dynamicErrors.push(ge);
          return;
        }
    }
    function Ce(T, v) {
      const C = Object.defineProperty(new Error(T), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: !1,
        configurable: !0
      });
      return C.stack = "Error: " + T + v, C;
    }
    function Ke(T, v, C, W) {
      let V, U, ge;
      if (C.syncDynamicErrorWithStack ? (V = C.syncDynamicErrorWithStack, U = C.syncDynamicExpression, ge = C.syncDynamicLogged === !0) : W.syncDynamicErrorWithStack ? (V = W.syncDynamicErrorWithStack, U = W.syncDynamicExpression, ge = W.syncDynamicLogged === !0) : (V = null, U = void 0, ge = !1), v.hasSyncDynamicErrors && V)
        throw ge || console.error(V), new s.StaticGenBailoutError();
      const _e = v.dynamicErrors;
      if (_e.length) {
        for (let je = 0; je < _e.length; je++)
          console.error(_e[je]);
        throw new s.StaticGenBailoutError();
      }
      if (!v.hasSuspendedDynamic) {
        if (v.hasDynamicMetadata)
          throw V ? (console.error(V), Object.defineProperty(new s.StaticGenBailoutError(`Route "${T}" has a \`generateMetadata\` that could not finish rendering before ${U} was used. Follow the instructions in the error for this expression to resolve.`), "__NEXT_ERROR_CODE", {
            value: "E608",
            enumerable: !1,
            configurable: !0
          })) : Object.defineProperty(new s.StaticGenBailoutError(`Route "${T}" has a \`generateMetadata\` that depends on Request data (\`cookies()\`, etc...) or external data (\`fetch(...)\`, etc...) but the rest of the route was static or only used cached data (\`"use cache"\`). If you expected this route to be prerenderable update your \`generateMetadata\` to not use Request data and only use cached external data. Otherwise, add \`await connection()\` somewhere within this route to indicate explicitly it should not be prerendered.`), "__NEXT_ERROR_CODE", {
            value: "E534",
            enumerable: !1,
            configurable: !0
          });
        if (v.hasDynamicViewport)
          throw V ? (console.error(V), Object.defineProperty(new s.StaticGenBailoutError(`Route "${T}" has a \`generateViewport\` that could not finish rendering before ${U} was used. Follow the instructions in the error for this expression to resolve.`), "__NEXT_ERROR_CODE", {
            value: "E573",
            enumerable: !1,
            configurable: !0
          })) : Object.defineProperty(new s.StaticGenBailoutError(`Route "${T}" has a \`generateViewport\` that depends on Request data (\`cookies()\`, etc...) or external data (\`fetch(...)\`, etc...) but the rest of the route was static or only used cached data (\`"use cache"\`). If you expected this route to be prerenderable update your \`generateViewport\` to not use Request data and only use cached external data. Otherwise, add \`await connection()\` somewhere within this route to indicate explicitly it should not be prerendered.`), "__NEXT_ERROR_CODE", {
            value: "E590",
            enumerable: !1,
            configurable: !0
          });
      }
    }
  }(lr)), lr;
}
var pr = {}, Ms;
function Bn() {
  return Ms || (Ms = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "createDedupedByCallsiteServerErrorLoggerDev", {
      enumerable: !0,
      get: function() {
        return c;
      }
    });
    const t = /* @__PURE__ */ n(ui);
    function r(u) {
      if (typeof WeakMap != "function") return null;
      var d = /* @__PURE__ */ new WeakMap(), p = /* @__PURE__ */ new WeakMap();
      return (r = function(w) {
        return w ? p : d;
      })(u);
    }
    function n(u, d) {
      if (u && u.__esModule)
        return u;
      if (u === null || typeof u != "object" && typeof u != "function")
        return {
          default: u
        };
      var p = r(d);
      if (p && p.has(u))
        return p.get(u);
      var w = {
        __proto__: null
      }, b = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var S in u)
        if (S !== "default" && Object.prototype.hasOwnProperty.call(u, S)) {
          var R = b ? Object.getOwnPropertyDescriptor(u, S) : null;
          R && (R.get || R.set) ? Object.defineProperty(w, S, R) : w[S] = u[S];
        }
      return w.default = u, p && p.set(u, w), w;
    }
    const s = {
      current: null
    }, i = typeof t.cache == "function" ? t.cache : (u) => u, a = process.env.__NEXT_DYNAMIC_IO ? console.error : console.warn, o = i(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- cache key
      (u) => {
        try {
          a(s.current);
        } finally {
          s.current = null;
        }
      }
    );
    function c(u) {
      return function(...p) {
        const w = u(...p);
        if (process.env.NODE_ENV !== "production") {
          var b;
          const S = (b = new Error().stack) == null ? void 0 : b.split(`
`);
          if (S === void 0 || S.length < 4)
            a(w);
          else {
            const R = S[4];
            s.current = w, o(R);
          }
        } else
          a(w);
      };
    }
  }(pr)), pr;
}
var mr = {}, gr = {}, _r = {}, qs;
function yo() {
  return qs || (qs = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "afterTaskAsyncStorageInstance", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const r = (0, jn().createAsyncLocalStorage)();
  }(_r)), _r;
}
var Ws;
function Eo() {
  return Ws || (Ws = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "afterTaskAsyncStorage", {
      enumerable: !0,
      get: function() {
        return t.afterTaskAsyncStorageInstance;
      }
    });
    const t = yo();
  }(gr)), gr;
}
var $s;
function Gn() {
  return $s || ($s = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(c, u) {
      for (var d in u) Object.defineProperty(c, d, {
        enumerable: !0,
        get: u[d]
      });
    }
    t(e, {
      isRequestAPICallableInsideAfter: function() {
        return o;
      },
      throwForSearchParamsAccessInUseCache: function() {
        return a;
      },
      throwWithStaticGenerationBailoutError: function() {
        return s;
      },
      throwWithStaticGenerationBailoutErrorWithDynamicError: function() {
        return i;
      }
    });
    const r = pt(), n = Eo();
    function s(c, u) {
      throw Object.defineProperty(new r.StaticGenBailoutError(`Route ${c} couldn't be rendered statically because it used ${u}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
        value: "E576",
        enumerable: !1,
        configurable: !0
      });
    }
    function i(c, u) {
      throw Object.defineProperty(new r.StaticGenBailoutError(`Route ${c} with \`dynamic = "error"\` couldn't be rendered statically because it used ${u}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
        value: "E543",
        enumerable: !1,
        configurable: !0
      });
    }
    function a(c) {
      const u = Object.defineProperty(new Error(`Route ${c.route} used "searchParams" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "searchParams" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
        value: "E634",
        enumerable: !1,
        configurable: !0
      });
      throw c.invalidUsageError ?? (c.invalidUsageError = u), u;
    }
    function o() {
      const c = n.afterTaskAsyncStorage.getStore();
      return (c == null ? void 0 : c.rootTaskSpawnPhase) === "action";
    }
  }(mr)), mr;
}
var Ks;
function wo() {
  return Ks || (Ks = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "cookies", {
      enumerable: !0,
      get: function() {
        return p;
      }
    });
    const t = go(), r = bt(), n = Me(), s = Ye(), i = vt(), a = pt(), o = Rt(), c = Bn(), u = Jn(), d = Gn();
    function p() {
      const f = "cookies", _ = n.workAsyncStorage.getStore(), A = s.workUnitAsyncStorage.getStore();
      if (_) {
        if (A && A.phase === "after" && !(0, d.isRequestAPICallableInsideAfter)())
          throw Object.defineProperty(new Error(
            // TODO(after): clarify that this only applies to pages?
            `Route ${_.route} used "cookies" inside "after(...)". This is not supported. If you need this data inside an "after" callback, use "cookies" outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`
          ), "__NEXT_ERROR_CODE", {
            value: "E88",
            enumerable: !1,
            configurable: !0
          });
        if (_.forceStatic) {
          const O = w();
          return R(O);
        }
        if (A) {
          if (A.type === "cache")
            throw Object.defineProperty(new Error(`Route ${_.route} used "cookies" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "cookies" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
              value: "E398",
              enumerable: !1,
              configurable: !0
            });
          if (A.type === "unstable-cache")
            throw Object.defineProperty(new Error(`Route ${_.route} used "cookies" inside a function cached with "unstable_cache(...)". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "cookies" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
              value: "E157",
              enumerable: !1,
              configurable: !0
            });
        }
        if (_.dynamicShouldError)
          throw Object.defineProperty(new a.StaticGenBailoutError(`Route ${_.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`cookies\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
            value: "E549",
            enumerable: !1,
            configurable: !0
          });
        if (A) {
          if (A.type === "prerender")
            return S(_.route, A);
          A.type === "prerender-ppr" ? (0, i.postponeWithTracking)(_.route, f, A.dynamicTracking) : A.type === "prerender-legacy" && (0, i.throwToInterruptStaticGeneration)(f, _, A);
        }
        (0, i.trackDynamicDataInDynamicRender)(_, A);
      }
      const k = (0, s.getExpectedRequestStore)(f);
      let I;
      return (0, t.areCookiesMutableInCurrentPhase)(k) ? I = k.userspaceMutableCookies : I = k.cookies, process.env.NODE_ENV === "development" && !(_ != null && _.isPrefetchRequest) ? g(I, _ == null ? void 0 : _.route) : R(I);
    }
    function w() {
      return t.RequestCookiesAdapter.seal(new r.RequestCookies(new Headers({})));
    }
    const b = /* @__PURE__ */ new WeakMap();
    function S(f, _) {
      const A = b.get(_);
      if (A)
        return A;
      const k = (0, o.makeHangingPromise)(_.renderSignal, "`cookies()`");
      return b.set(_, k), Object.defineProperties(k, {
        [Symbol.iterator]: {
          value: function() {
            const I = "`cookies()[Symbol.iterator]()`", O = E(f, I);
            (0, i.abortAndThrowOnSynchronousRequestDataAccess)(f, I, O, _);
          }
        },
        size: {
          get() {
            const I = "`cookies().size`", O = E(f, I);
            (0, i.abortAndThrowOnSynchronousRequestDataAccess)(f, I, O, _);
          }
        },
        get: {
          value: function() {
            let O;
            arguments.length === 0 ? O = "`cookies().get()`" : O = `\`cookies().get(${y(arguments[0])})\``;
            const j = E(f, O);
            (0, i.abortAndThrowOnSynchronousRequestDataAccess)(f, O, j, _);
          }
        },
        getAll: {
          value: function() {
            let O;
            arguments.length === 0 ? O = "`cookies().getAll()`" : O = `\`cookies().getAll(${y(arguments[0])})\``;
            const j = E(f, O);
            (0, i.abortAndThrowOnSynchronousRequestDataAccess)(f, O, j, _);
          }
        },
        has: {
          value: function() {
            let O;
            arguments.length === 0 ? O = "`cookies().has()`" : O = `\`cookies().has(${y(arguments[0])})\``;
            const j = E(f, O);
            (0, i.abortAndThrowOnSynchronousRequestDataAccess)(f, O, j, _);
          }
        },
        set: {
          value: function() {
            let O;
            if (arguments.length === 0)
              O = "`cookies().set()`";
            else {
              const Y = arguments[0];
              Y ? O = `\`cookies().set(${y(Y)}, ...)\`` : O = "`cookies().set(...)`";
            }
            const j = E(f, O);
            (0, i.abortAndThrowOnSynchronousRequestDataAccess)(f, O, j, _);
          }
        },
        delete: {
          value: function() {
            let I;
            arguments.length === 0 ? I = "`cookies().delete()`" : arguments.length === 1 ? I = `\`cookies().delete(${y(arguments[0])})\`` : I = `\`cookies().delete(${y(arguments[0])}, ...)\``;
            const O = E(f, I);
            (0, i.abortAndThrowOnSynchronousRequestDataAccess)(f, I, O, _);
          }
        },
        clear: {
          value: function() {
            const O = "`cookies().clear()`", j = E(f, O);
            (0, i.abortAndThrowOnSynchronousRequestDataAccess)(f, O, j, _);
          }
        },
        toString: {
          value: function() {
            const O = "`cookies().toString()`", j = E(f, O);
            (0, i.abortAndThrowOnSynchronousRequestDataAccess)(f, O, j, _);
          }
        }
      }), k;
    }
    function R(f) {
      const _ = b.get(f);
      if (_)
        return _;
      const A = Promise.resolve(f);
      return b.set(f, A), Object.defineProperties(A, {
        [Symbol.iterator]: {
          value: f[Symbol.iterator] ? f[Symbol.iterator].bind(f) : (
            // We should remove this and unify our cookies types. We could just let this continue to throw lazily
            // but that's already a hard thing to debug so we may as well implement it consistently. The biggest problem with
            // implementing this in this way is the underlying cookie type is a ResponseCookie and not a RequestCookie and so it
            // has extra properties not available on RequestCookie instances.
            m.bind(f)
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
              P.bind(f, A)
            )
          )
        },
        toString: {
          value: f.toString.bind(f)
        }
      }), A;
    }
    function g(f, _) {
      const A = b.get(f);
      if (A)
        return A;
      const k = new Promise((I) => (0, u.scheduleImmediate)(() => I(f)));
      return b.set(f, k), Object.defineProperties(k, {
        [Symbol.iterator]: {
          value: function() {
            return h(_, "`...cookies()` or similar iteration"), f[Symbol.iterator] ? f[Symbol.iterator].apply(f, arguments) : (
              // We should remove this and unify our cookies types. We could just let this continue to throw lazily
              // but that's already a hard thing to debug so we may as well implement it consistently. The biggest problem with
              // implementing this in this way is the underlying cookie type is a ResponseCookie and not a RequestCookie and so it
              // has extra properties not available on RequestCookie instances.
              m.call(f)
            );
          },
          writable: !1
        },
        size: {
          get() {
            return h(_, "`cookies().size`"), f.size;
          }
        },
        get: {
          value: function() {
            let O;
            return arguments.length === 0 ? O = "`cookies().get()`" : O = `\`cookies().get(${y(arguments[0])})\``, h(_, O), f.get.apply(f, arguments);
          },
          writable: !1
        },
        getAll: {
          value: function() {
            let O;
            return arguments.length === 0 ? O = "`cookies().getAll()`" : O = `\`cookies().getAll(${y(arguments[0])})\``, h(_, O), f.getAll.apply(f, arguments);
          },
          writable: !1
        },
        has: {
          value: function() {
            let O;
            return arguments.length === 0 ? O = "`cookies().has()`" : O = `\`cookies().has(${y(arguments[0])})\``, h(_, O), f.has.apply(f, arguments);
          },
          writable: !1
        },
        set: {
          value: function() {
            let O;
            if (arguments.length === 0)
              O = "`cookies().set()`";
            else {
              const j = arguments[0];
              j ? O = `\`cookies().set(${y(j)}, ...)\`` : O = "`cookies().set(...)`";
            }
            return h(_, O), f.set.apply(f, arguments);
          },
          writable: !1
        },
        delete: {
          value: function() {
            let I;
            return arguments.length === 0 ? I = "`cookies().delete()`" : arguments.length === 1 ? I = `\`cookies().delete(${y(arguments[0])})\`` : I = `\`cookies().delete(${y(arguments[0])}, ...)\``, h(_, I), f.delete.apply(f, arguments);
          },
          writable: !1
        },
        clear: {
          value: function() {
            return h(_, "`cookies().clear()`"), typeof f.clear == "function" ? f.clear.apply(f, arguments) : (
              // We should remove this and unify our cookies types. We could just let this continue to throw lazily
              // but that's already a hard thing to debug so we may as well implement it consistently. The biggest problem with
              // implementing this in this way is the underlying cookie type is a ResponseCookie and not a RequestCookie and so it
              // has extra properties not available on RequestCookie instances.
              P.call(f, k)
            );
          },
          writable: !1
        },
        toString: {
          value: function() {
            return h(_, "`cookies().toString()` or implicit casting"), f.toString.apply(f, arguments);
          },
          writable: !1
        }
      }), k;
    }
    function y(f) {
      return typeof f == "object" && f !== null && typeof f.name == "string" ? `'${f.name}'` : typeof f == "string" ? `'${f}'` : "...";
    }
    function h(f, _) {
      const A = s.workUnitAsyncStorage.getStore();
      if (A && A.type === "request" && A.prerenderPhase === !0) {
        const k = A;
        (0, i.trackSynchronousRequestDataAccessInDev)(k);
      }
      l(f, _);
    }
    const l = (0, c.createDedupedByCallsiteServerErrorLoggerDev)(E);
    function E(f, _) {
      const A = f ? `Route "${f}" ` : "This route ";
      return Object.defineProperty(new Error(`${A}used ${_}. \`cookies()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", {
        value: "E223",
        enumerable: !1,
        configurable: !0
      });
    }
    function m() {
      return this.getAll().map((f) => [
        f.name,
        f
      ]).values();
    }
    function P(f) {
      for (const _ of this.getAll())
        this.delete(_.name);
      return f;
    }
  }(er)), er;
}
var yr = {}, Er = {}, js;
function bo() {
  return js || (js = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(i, a) {
      for (var o in a) Object.defineProperty(i, o, {
        enumerable: !0,
        get: a[o]
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
    const r = Kn();
    class n extends Error {
      constructor() {
        super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
      }
      static callable() {
        throw new n();
      }
    }
    class s extends Headers {
      constructor(a) {
        super(), this.headers = new Proxy(a, {
          get(o, c, u) {
            if (typeof c == "symbol")
              return r.ReflectAdapter.get(o, c, u);
            const d = c.toLowerCase(), p = Object.keys(a).find((w) => w.toLowerCase() === d);
            if (!(typeof p > "u"))
              return r.ReflectAdapter.get(o, p, u);
          },
          set(o, c, u, d) {
            if (typeof c == "symbol")
              return r.ReflectAdapter.set(o, c, u, d);
            const p = c.toLowerCase(), w = Object.keys(a).find((b) => b.toLowerCase() === p);
            return r.ReflectAdapter.set(o, w ?? c, u, d);
          },
          has(o, c) {
            if (typeof c == "symbol") return r.ReflectAdapter.has(o, c);
            const u = c.toLowerCase(), d = Object.keys(a).find((p) => p.toLowerCase() === u);
            return typeof d > "u" ? !1 : r.ReflectAdapter.has(o, d);
          },
          deleteProperty(o, c) {
            if (typeof c == "symbol") return r.ReflectAdapter.deleteProperty(o, c);
            const u = c.toLowerCase(), d = Object.keys(a).find((p) => p.toLowerCase() === u);
            return typeof d > "u" ? !0 : r.ReflectAdapter.deleteProperty(o, d);
          }
        });
      }
      /**
      * Seals a Headers instance to prevent modification by throwing an error when
      * any mutating method is called.
      */
      static seal(a) {
        return new Proxy(a, {
          get(o, c, u) {
            switch (c) {
              case "append":
              case "delete":
              case "set":
                return n.callable;
              default:
                return r.ReflectAdapter.get(o, c, u);
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
      merge(a) {
        return Array.isArray(a) ? a.join(", ") : a;
      }
      /**
      * Creates a Headers instance from a plain object or a Headers instance.
      *
      * @param headers a plain object or a Headers instance
      * @returns a headers instance
      */
      static from(a) {
        return a instanceof Headers ? a : new s(a);
      }
      append(a, o) {
        const c = this.headers[a];
        typeof c == "string" ? this.headers[a] = [
          c,
          o
        ] : Array.isArray(c) ? c.push(o) : this.headers[a] = o;
      }
      delete(a) {
        delete this.headers[a];
      }
      get(a) {
        const o = this.headers[a];
        return typeof o < "u" ? this.merge(o) : null;
      }
      has(a) {
        return typeof this.headers[a] < "u";
      }
      set(a, o) {
        this.headers[a] = o;
      }
      forEach(a, o) {
        for (const [c, u] of this.entries())
          a.call(o, u, c, this);
      }
      *entries() {
        for (const a of Object.keys(this.headers)) {
          const o = a.toLowerCase(), c = this.get(o);
          yield [
            o,
            c
          ];
        }
      }
      *keys() {
        for (const a of Object.keys(this.headers))
          yield a.toLowerCase();
      }
      *values() {
        for (const a of Object.keys(this.headers))
          yield this.get(a);
      }
      [Symbol.iterator]() {
        return this.entries();
      }
    }
  }(Er)), Er;
}
var Js;
function So() {
  return Js || (Js = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "headers", {
      enumerable: !0,
      get: function() {
        return d;
      }
    });
    const t = bo(), r = Me(), n = Ye(), s = vt(), i = pt(), a = Rt(), o = Bn(), c = Jn(), u = Gn();
    function d() {
      const l = r.workAsyncStorage.getStore(), E = n.workUnitAsyncStorage.getStore();
      if (l) {
        if (E && E.phase === "after" && !(0, u.isRequestAPICallableInsideAfter)())
          throw Object.defineProperty(new Error(`Route ${l.route} used "headers" inside "after(...)". This is not supported. If you need this data inside an "after" callback, use "headers" outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", {
            value: "E367",
            enumerable: !1,
            configurable: !0
          });
        if (l.forceStatic) {
          const P = t.HeadersAdapter.seal(new Headers({}));
          return b(P);
        }
        if (E) {
          if (E.type === "cache")
            throw Object.defineProperty(new Error(`Route ${l.route} used "headers" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
              value: "E304",
              enumerable: !1,
              configurable: !0
            });
          if (E.type === "unstable-cache")
            throw Object.defineProperty(new Error(`Route ${l.route} used "headers" inside a function cached with "unstable_cache(...)". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
              value: "E127",
              enumerable: !1,
              configurable: !0
            });
        }
        if (l.dynamicShouldError)
          throw Object.defineProperty(new i.StaticGenBailoutError(`Route ${l.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`headers\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
            value: "E525",
            enumerable: !1,
            configurable: !0
          });
        if (E) {
          if (E.type === "prerender")
            return w(l.route, E);
          E.type === "prerender-ppr" ? (0, s.postponeWithTracking)(l.route, "headers", E.dynamicTracking) : E.type === "prerender-legacy" && (0, s.throwToInterruptStaticGeneration)("headers", l, E);
        }
        (0, s.trackDynamicDataInDynamicRender)(l, E);
      }
      const m = (0, n.getExpectedRequestStore)("headers");
      return process.env.NODE_ENV === "development" && !(l != null && l.isPrefetchRequest) ? S(m.headers, l == null ? void 0 : l.route) : b(m.headers);
    }
    const p = /* @__PURE__ */ new WeakMap();
    function w(l, E) {
      const m = p.get(E);
      if (m)
        return m;
      const P = (0, a.makeHangingPromise)(E.renderSignal, "`headers()`");
      return p.set(E, P), Object.defineProperties(P, {
        append: {
          value: function() {
            const _ = `\`headers().append(${R(arguments[0])}, ...)\``, A = h(l, _);
            (0, s.abortAndThrowOnSynchronousRequestDataAccess)(l, _, A, E);
          }
        },
        delete: {
          value: function() {
            const _ = `\`headers().delete(${R(arguments[0])})\``, A = h(l, _);
            (0, s.abortAndThrowOnSynchronousRequestDataAccess)(l, _, A, E);
          }
        },
        get: {
          value: function() {
            const _ = `\`headers().get(${R(arguments[0])})\``, A = h(l, _);
            (0, s.abortAndThrowOnSynchronousRequestDataAccess)(l, _, A, E);
          }
        },
        has: {
          value: function() {
            const _ = `\`headers().has(${R(arguments[0])})\``, A = h(l, _);
            (0, s.abortAndThrowOnSynchronousRequestDataAccess)(l, _, A, E);
          }
        },
        set: {
          value: function() {
            const _ = `\`headers().set(${R(arguments[0])}, ...)\``, A = h(l, _);
            (0, s.abortAndThrowOnSynchronousRequestDataAccess)(l, _, A, E);
          }
        },
        getSetCookie: {
          value: function() {
            const _ = "`headers().getSetCookie()`", A = h(l, _);
            (0, s.abortAndThrowOnSynchronousRequestDataAccess)(l, _, A, E);
          }
        },
        forEach: {
          value: function() {
            const _ = "`headers().forEach(...)`", A = h(l, _);
            (0, s.abortAndThrowOnSynchronousRequestDataAccess)(l, _, A, E);
          }
        },
        keys: {
          value: function() {
            const _ = "`headers().keys()`", A = h(l, _);
            (0, s.abortAndThrowOnSynchronousRequestDataAccess)(l, _, A, E);
          }
        },
        values: {
          value: function() {
            const _ = "`headers().values()`", A = h(l, _);
            (0, s.abortAndThrowOnSynchronousRequestDataAccess)(l, _, A, E);
          }
        },
        entries: {
          value: function() {
            const _ = "`headers().entries()`", A = h(l, _);
            (0, s.abortAndThrowOnSynchronousRequestDataAccess)(l, _, A, E);
          }
        },
        [Symbol.iterator]: {
          value: function() {
            const f = "`headers()[Symbol.iterator]()`", _ = h(l, f);
            (0, s.abortAndThrowOnSynchronousRequestDataAccess)(l, f, _, E);
          }
        }
      }), P;
    }
    function b(l) {
      const E = p.get(l);
      if (E)
        return E;
      const m = Promise.resolve(l);
      return p.set(l, m), Object.defineProperties(m, {
        append: {
          value: l.append.bind(l)
        },
        delete: {
          value: l.delete.bind(l)
        },
        get: {
          value: l.get.bind(l)
        },
        has: {
          value: l.has.bind(l)
        },
        set: {
          value: l.set.bind(l)
        },
        getSetCookie: {
          value: l.getSetCookie.bind(l)
        },
        forEach: {
          value: l.forEach.bind(l)
        },
        keys: {
          value: l.keys.bind(l)
        },
        values: {
          value: l.values.bind(l)
        },
        entries: {
          value: l.entries.bind(l)
        },
        [Symbol.iterator]: {
          value: l[Symbol.iterator].bind(l)
        }
      }), m;
    }
    function S(l, E) {
      const m = p.get(l);
      if (m)
        return m;
      const P = new Promise((f) => (0, c.scheduleImmediate)(() => f(l)));
      return p.set(l, P), Object.defineProperties(P, {
        append: {
          value: function() {
            const _ = `\`headers().append(${R(arguments[0])}, ...)\``;
            return g(E, _), l.append.apply(l, arguments);
          }
        },
        delete: {
          value: function() {
            const _ = `\`headers().delete(${R(arguments[0])})\``;
            return g(E, _), l.delete.apply(l, arguments);
          }
        },
        get: {
          value: function() {
            const _ = `\`headers().get(${R(arguments[0])})\``;
            return g(E, _), l.get.apply(l, arguments);
          }
        },
        has: {
          value: function() {
            const _ = `\`headers().has(${R(arguments[0])})\``;
            return g(E, _), l.has.apply(l, arguments);
          }
        },
        set: {
          value: function() {
            const _ = `\`headers().set(${R(arguments[0])}, ...)\``;
            return g(E, _), l.set.apply(l, arguments);
          }
        },
        getSetCookie: {
          value: function() {
            return g(E, "`headers().getSetCookie()`"), l.getSetCookie.apply(l, arguments);
          }
        },
        forEach: {
          value: function() {
            return g(E, "`headers().forEach(...)`"), l.forEach.apply(l, arguments);
          }
        },
        keys: {
          value: function() {
            return g(E, "`headers().keys()`"), l.keys.apply(l, arguments);
          }
        },
        values: {
          value: function() {
            return g(E, "`headers().values()`"), l.values.apply(l, arguments);
          }
        },
        entries: {
          value: function() {
            return g(E, "`headers().entries()`"), l.entries.apply(l, arguments);
          }
        },
        [Symbol.iterator]: {
          value: function() {
            return g(E, "`...headers()` or similar iteration"), l[Symbol.iterator].apply(l, arguments);
          }
        }
      }), P;
    }
    function R(l) {
      return typeof l == "string" ? `'${l}'` : "...";
    }
    function g(l, E) {
      const m = n.workUnitAsyncStorage.getStore();
      if (m && m.type === "request" && m.prerenderPhase === !0) {
        const P = m;
        (0, s.trackSynchronousRequestDataAccessInDev)(P);
      }
      y(l, E);
    }
    const y = (0, o.createDedupedByCallsiteServerErrorLoggerDev)(h);
    function h(l, E) {
      const m = l ? `Route "${l}" ` : "This route ";
      return Object.defineProperty(new Error(`${m}used ${E}. \`headers()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", {
        value: "E277",
        enumerable: !1,
        configurable: !0
      });
    }
  }(yr)), yr;
}
var wr = {}, Bs;
function Ao() {
  return Bs || (Bs = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "draftMode", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const t = Ye(), r = Me(), n = vt(), s = Bn(), i = pt(), a = li();
    function o() {
      const y = "draftMode", h = r.workAsyncStorage.getStore(), l = t.workUnitAsyncStorage.getStore();
      switch ((!h || !l) && (0, t.throwForMissingRequestStore)(y), l.type) {
        case "request":
          return c(l.draftMode, h);
        case "cache":
        case "unstable-cache":
          const E = (0, t.getDraftModeProviderForCacheScope)(h, l);
          if (E)
            return c(E, h);
        // Otherwise, we fall through to providing an empty draft mode.
        // eslint-disable-next-line no-fallthrough
        case "prerender":
        case "prerender-ppr":
        case "prerender-legacy":
          if (process.env.NODE_ENV === "development" && !(h != null && h.isPrefetchRequest)) {
            const P = h == null ? void 0 : h.route;
            return p(null, P);
          } else
            return d(null);
        default:
          return l;
      }
    }
    function c(y, h) {
      const l = u.get(o);
      if (l)
        return l;
      let E;
      if (process.env.NODE_ENV === "development" && !(h != null && h.isPrefetchRequest)) {
        const m = h == null ? void 0 : h.route;
        E = p(y, m);
      } else
        E = d(y);
      return u.set(y, E), E;
    }
    const u = /* @__PURE__ */ new WeakMap();
    function d(y) {
      const h = new w(y), l = Promise.resolve(h);
      return Object.defineProperty(l, "isEnabled", {
        get() {
          return h.isEnabled;
        },
        set(E) {
          Object.defineProperty(l, "isEnabled", {
            value: E,
            writable: !0,
            enumerable: !0
          });
        },
        enumerable: !0,
        configurable: !0
      }), l.enable = h.enable.bind(h), l.disable = h.disable.bind(h), l;
    }
    function p(y, h) {
      const l = new w(y), E = Promise.resolve(l);
      return Object.defineProperty(E, "isEnabled", {
        get() {
          return b(h, "`draftMode().isEnabled`"), l.isEnabled;
        },
        set(m) {
          Object.defineProperty(E, "isEnabled", {
            value: m,
            writable: !0,
            enumerable: !0
          });
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(E, "enable", {
        value: function() {
          return b(h, "`draftMode().enable()`"), l.enable.apply(l, arguments);
        }
      }), Object.defineProperty(E, "disable", {
        value: function() {
          return b(h, "`draftMode().disable()`"), l.disable.apply(l, arguments);
        }
      }), E;
    }
    class w {
      constructor(h) {
        this._provider = h;
      }
      get isEnabled() {
        return this._provider !== null ? this._provider.isEnabled : !1;
      }
      enable() {
        g("draftMode().enable()"), this._provider !== null && this._provider.enable();
      }
      disable() {
        g("draftMode().disable()"), this._provider !== null && this._provider.disable();
      }
    }
    function b(y, h) {
      const l = t.workUnitAsyncStorage.getStore();
      if (l && l.type === "request" && l.prerenderPhase === !0) {
        const E = l;
        (0, n.trackSynchronousRequestDataAccessInDev)(E);
      }
      S(y, h);
    }
    const S = (0, s.createDedupedByCallsiteServerErrorLoggerDev)(R);
    function R(y, h) {
      const l = y ? `Route "${y}" ` : "This route ";
      return Object.defineProperty(new Error(`${l}used ${h}. \`draftMode()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", {
        value: "E377",
        enumerable: !1,
        configurable: !0
      });
    }
    function g(y) {
      const h = r.workAsyncStorage.getStore(), l = t.workUnitAsyncStorage.getStore();
      if (h) {
        if (l) {
          if (l.type === "cache")
            throw Object.defineProperty(new Error(`Route ${h.route} used "${y}" inside "use cache". The enabled status of draftMode can be read in caches but you must not enable or disable draftMode inside a cache. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
              value: "E246",
              enumerable: !1,
              configurable: !0
            });
          if (l.type === "unstable-cache")
            throw Object.defineProperty(new Error(`Route ${h.route} used "${y}" inside a function cached with "unstable_cache(...)". The enabled status of draftMode can be read in caches but you must not enable or disable draftMode inside a cache. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
              value: "E259",
              enumerable: !1,
              configurable: !0
            });
          if (l.phase === "after")
            throw Object.defineProperty(new Error(`Route ${h.route} used "${y}" inside \`after\`. The enabled status of draftMode can be read inside \`after\` but you cannot enable or disable draftMode. See more info here: https://nextjs.org/docs/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", {
              value: "E348",
              enumerable: !1,
              configurable: !0
            });
        }
        if (h.dynamicShouldError)
          throw Object.defineProperty(new i.StaticGenBailoutError(`Route ${h.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${y}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
            value: "E553",
            enumerable: !1,
            configurable: !0
          });
        if (l)
          if (l.type === "prerender") {
            const E = Object.defineProperty(new Error(`Route ${h.route} used ${y} without first calling \`await connection()\`. See more info here: https://nextjs.org/docs/messages/next-prerender-sync-headers`), "__NEXT_ERROR_CODE", {
              value: "E126",
              enumerable: !1,
              configurable: !0
            });
            (0, n.abortAndThrowOnSynchronousRequestDataAccess)(h.route, y, E, l);
          } else if (l.type === "prerender-ppr")
            (0, n.postponeWithTracking)(h.route, y, l.dynamicTracking);
          else if (l.type === "prerender-legacy") {
            l.revalidate = 0;
            const E = Object.defineProperty(new a.DynamicServerError(`Route ${h.route} couldn't be rendered statically because it used \`${y}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
              value: "E558",
              enumerable: !1,
              configurable: !0
            });
            throw h.dynamicUsageDescription = y, h.dynamicUsageStack = E.stack, E;
          } else process.env.NODE_ENV === "development" && l && l.type === "request" && (l.usedDynamic = !0);
      }
    }
  }(wr)), wr;
}
var Gs;
function Ro() {
  return Gs || (Gs = 1, gt.cookies = wo().cookies, gt.headers = So().headers, gt.draftMode = Ao().draftMode), gt;
}
var _t = Ro(), Nt = { exports: {} }, br = {}, Sr = {}, Ar = {}, Fs;
function vo() {
  return Fs || (Fs = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "detectDomainLocale", {
      enumerable: !0,
      get: function() {
        return t;
      }
    });
    function t(r, n, s) {
      if (r) {
        s && (s = s.toLowerCase());
        for (const o of r) {
          var i, a;
          const c = (i = o.domain) == null ? void 0 : i.split(":", 1)[0].toLowerCase();
          if (n === c || s === o.defaultLocale.toLowerCase() || (a = o.locales) != null && a.some((u) => u.toLowerCase() === s))
            return o;
        }
      }
    }
  }(Ar)), Ar;
}
var Rr = {}, vr = {}, Xs;
function To() {
  return Xs || (Xs = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "removeTrailingSlash", {
      enumerable: !0,
      get: function() {
        return t;
      }
    });
    function t(r) {
      return r.replace(/\/$/, "") || "/";
    }
  }(vr)), vr;
}
var Tr = {}, Pr = {}, zs;
function Fn() {
  return zs || (zs = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "parsePath", {
      enumerable: !0,
      get: function() {
        return t;
      }
    });
    function t(r) {
      const n = r.indexOf("#"), s = r.indexOf("?"), i = s > -1 && (n < 0 || s < n);
      return i || n > -1 ? {
        pathname: r.substring(0, i ? s : n),
        query: i ? r.substring(s, n > -1 ? n : void 0) : "",
        hash: n > -1 ? r.slice(n) : ""
      } : {
        pathname: r,
        query: "",
        hash: ""
      };
    }
  }(Pr)), Pr;
}
var Vs;
function di() {
  return Vs || (Vs = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "addPathPrefix", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const t = Fn();
    function r(n, s) {
      if (!n.startsWith("/") || !s)
        return n;
      const { pathname: i, query: a, hash: o } = (0, t.parsePath)(n);
      return "" + s + i + a + o;
    }
  }(Tr)), Tr;
}
var Or = {}, Ys;
function Po() {
  return Ys || (Ys = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "addPathSuffix", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const t = Fn();
    function r(n, s) {
      if (!n.startsWith("/") || !s)
        return n;
      const { pathname: i, query: a, hash: o } = (0, t.parsePath)(n);
      return "" + i + s + a + o;
    }
  }(Or)), Or;
}
var Cr = {}, Ir = {}, Zs;
function Xn() {
  return Zs || (Zs = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "pathHasPrefix", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const t = Fn();
    function r(n, s) {
      if (typeof n != "string")
        return !1;
      const { pathname: i } = (0, t.parsePath)(n);
      return i === s || i.startsWith(s + "/");
    }
  }(Ir)), Ir;
}
var Qs;
function Oo() {
  return Qs || (Qs = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "addLocale", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const t = di(), r = Xn();
    function n(s, i, a, o) {
      if (!i || i === a) return s;
      const c = s.toLowerCase();
      return !o && ((0, r.pathHasPrefix)(c, "/api") || (0, r.pathHasPrefix)(c, "/" + i.toLowerCase())) ? s : (0, t.addPathPrefix)(s, "/" + i);
    }
  }(Cr)), Cr;
}
var ea;
function Co() {
  return ea || (ea = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "formatNextPathnameInfo", {
      enumerable: !0,
      get: function() {
        return i;
      }
    });
    const t = To(), r = di(), n = Po(), s = Oo();
    function i(a) {
      let o = (0, s.addLocale)(a.pathname, a.locale, a.buildId ? void 0 : a.defaultLocale, a.ignorePrefix);
      return (a.buildId || !a.trailingSlash) && (o = (0, t.removeTrailingSlash)(o)), a.buildId && (o = (0, n.addPathSuffix)((0, r.addPathPrefix)(o, "/_next/data/" + a.buildId), a.pathname === "/" ? "index.json" : ".json")), o = (0, r.addPathPrefix)(o, a.basePath), !a.buildId && a.trailingSlash ? o.endsWith("/") ? o : (0, n.addPathSuffix)(o, "/") : (0, t.removeTrailingSlash)(o);
    }
  }(Rr)), Rr;
}
var xr = {}, ta;
function Io() {
  return ta || (ta = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "getHostname", {
      enumerable: !0,
      get: function() {
        return t;
      }
    });
    function t(r, n) {
      let s;
      if (n != null && n.host && !Array.isArray(n.host))
        s = n.host.toString().split(":", 1)[0];
      else if (r.hostname)
        s = r.hostname;
      else return;
      return s.toLowerCase();
    }
  }(xr)), xr;
}
var Nr = {}, kr = {}, ra;
function xo() {
  return ra || (ra = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "normalizeLocalePath", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const t = /* @__PURE__ */ new WeakMap();
    function r(n, s) {
      if (!s) return {
        pathname: n
      };
      let i = t.get(s);
      i || (i = s.map((d) => d.toLowerCase()), t.set(s, i));
      let a;
      const o = n.split("/", 2);
      if (!o[1]) return {
        pathname: n
      };
      const c = o[1].toLowerCase(), u = i.indexOf(c);
      return u < 0 ? {
        pathname: n
      } : (a = s[u], n = n.slice(a.length + 1) || "/", {
        pathname: n,
        detectedLocale: a
      });
    }
  }(kr)), kr;
}
var Dr = {}, na;
function No() {
  return na || (na = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "removePathPrefix", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const t = Xn();
    function r(n, s) {
      if (!(0, t.pathHasPrefix)(n, s))
        return n;
      const i = n.slice(s.length);
      return i.startsWith("/") ? i : "/" + i;
    }
  }(Dr)), Dr;
}
var sa;
function ko() {
  return sa || (sa = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "getNextPathnameInfo", {
      enumerable: !0,
      get: function() {
        return s;
      }
    });
    const t = xo(), r = No(), n = Xn();
    function s(i, a) {
      var o;
      const { basePath: c, i18n: u, trailingSlash: d } = (o = a.nextConfig) != null ? o : {}, p = {
        pathname: i,
        trailingSlash: i !== "/" ? i.endsWith("/") : d
      };
      c && (0, n.pathHasPrefix)(p.pathname, c) && (p.pathname = (0, r.removePathPrefix)(p.pathname, c), p.basePath = c);
      let w = p.pathname;
      if (p.pathname.startsWith("/_next/data/") && p.pathname.endsWith(".json")) {
        const S = p.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/"), R = S[0];
        p.buildId = R, w = S[1] !== "index" ? "/" + S.slice(1).join("/") : "/", a.parseData === !0 && (p.pathname = w);
      }
      if (u) {
        let S = a.i18nProvider ? a.i18nProvider.analyze(p.pathname) : (0, t.normalizeLocalePath)(p.pathname, u.locales);
        p.locale = S.detectedLocale;
        var b;
        p.pathname = (b = S.pathname) != null ? b : p.pathname, !S.detectedLocale && p.buildId && (S = a.i18nProvider ? a.i18nProvider.analyze(w) : (0, t.normalizeLocalePath)(w, u.locales), S.detectedLocale && (p.locale = S.detectedLocale));
      }
      return p;
    }
  }(Nr)), Nr;
}
var aa;
function fi() {
  return aa || (aa = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "NextURL", {
      enumerable: !0,
      get: function() {
        return c;
      }
    });
    const t = vo(), r = Co(), n = Io(), s = ko(), i = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
    function a(u, d) {
      return new URL(String(u).replace(i, "localhost"), d && String(d).replace(i, "localhost"));
    }
    const o = Symbol("NextURLInternal");
    class c {
      constructor(d, p, w) {
        let b, S;
        typeof p == "object" && "pathname" in p || typeof p == "string" ? (b = p, S = w || {}) : S = w || p || {}, this[o] = {
          url: a(d, b ?? S.base),
          options: S,
          basePath: ""
        }, this.analyze();
      }
      analyze() {
        var d, p, w, b, S;
        const R = (0, s.getNextPathnameInfo)(this[o].url.pathname, {
          nextConfig: this[o].options.nextConfig,
          parseData: !process.env.__NEXT_NO_MIDDLEWARE_URL_NORMALIZE,
          i18nProvider: this[o].options.i18nProvider
        }), g = (0, n.getHostname)(this[o].url, this[o].options.headers);
        this[o].domainLocale = this[o].options.i18nProvider ? this[o].options.i18nProvider.detectDomainLocale(g) : (0, t.detectDomainLocale)((p = this[o].options.nextConfig) == null || (d = p.i18n) == null ? void 0 : d.domains, g);
        const y = ((w = this[o].domainLocale) == null ? void 0 : w.defaultLocale) || ((S = this[o].options.nextConfig) == null || (b = S.i18n) == null ? void 0 : b.defaultLocale);
        this[o].url.pathname = R.pathname, this[o].defaultLocale = y, this[o].basePath = R.basePath ?? "", this[o].buildId = R.buildId, this[o].locale = R.locale ?? y, this[o].trailingSlash = R.trailingSlash;
      }
      formatPathname() {
        return (0, r.formatNextPathnameInfo)({
          basePath: this[o].basePath,
          buildId: this[o].buildId,
          defaultLocale: this[o].options.forceLocale ? void 0 : this[o].defaultLocale,
          locale: this[o].locale,
          pathname: this[o].url.pathname,
          trailingSlash: this[o].trailingSlash
        });
      }
      formatSearch() {
        return this[o].url.search;
      }
      get buildId() {
        return this[o].buildId;
      }
      set buildId(d) {
        this[o].buildId = d;
      }
      get locale() {
        return this[o].locale ?? "";
      }
      set locale(d) {
        var p, w;
        if (!this[o].locale || !(!((w = this[o].options.nextConfig) == null || (p = w.i18n) == null) && p.locales.includes(d)))
          throw Object.defineProperty(new TypeError(`The NextURL configuration includes no locale "${d}"`), "__NEXT_ERROR_CODE", {
            value: "E597",
            enumerable: !1,
            configurable: !0
          });
        this[o].locale = d;
      }
      get defaultLocale() {
        return this[o].defaultLocale;
      }
      get domainLocale() {
        return this[o].domainLocale;
      }
      get searchParams() {
        return this[o].url.searchParams;
      }
      get host() {
        return this[o].url.host;
      }
      set host(d) {
        this[o].url.host = d;
      }
      get hostname() {
        return this[o].url.hostname;
      }
      set hostname(d) {
        this[o].url.hostname = d;
      }
      get port() {
        return this[o].url.port;
      }
      set port(d) {
        this[o].url.port = d;
      }
      get protocol() {
        return this[o].url.protocol;
      }
      set protocol(d) {
        this[o].url.protocol = d;
      }
      get href() {
        const d = this.formatPathname(), p = this.formatSearch();
        return `${this.protocol}//${this.host}${d}${p}${this.hash}`;
      }
      set href(d) {
        this[o].url = a(d), this.analyze();
      }
      get origin() {
        return this[o].url.origin;
      }
      get pathname() {
        return this[o].url.pathname;
      }
      set pathname(d) {
        this[o].url.pathname = d;
      }
      get hash() {
        return this[o].url.hash;
      }
      set hash(d) {
        this[o].url.hash = d;
      }
      get search() {
        return this[o].url.search;
      }
      set search(d) {
        this[o].url.search = d;
      }
      get password() {
        return this[o].url.password;
      }
      set password(d) {
        this[o].url.password = d;
      }
      get username() {
        return this[o].url.username;
      }
      set username(d) {
        this[o].url.username = d;
      }
      get basePath() {
        return this[o].basePath;
      }
      set basePath(d) {
        this[o].basePath = d.startsWith("/") ? d : `/${d}`;
      }
      toString() {
        return this.href;
      }
      toJSON() {
        return this.href;
      }
      [Symbol.for("edge-runtime.inspect.custom")]() {
        return {
          href: this.href,
          origin: this.origin,
          protocol: this.protocol,
          username: this.username,
          password: this.password,
          host: this.host,
          hostname: this.hostname,
          port: this.port,
          pathname: this.pathname,
          search: this.search,
          searchParams: this.searchParams,
          hash: this.hash
        };
      }
      clone() {
        return new c(String(this), this[o].options);
      }
    }
  }(Sr)), Sr;
}
var Ur = {}, Lr = {}, ia;
function Do() {
  return ia || (ia = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(je, st) {
      for (var Ie in st) Object.defineProperty(je, Ie, {
        enumerable: !0,
        get: st[Ie]
      });
    }
    t(e, {
      ACTION_SUFFIX: function() {
        return p;
      },
      APP_DIR_ALIAS: function() {
        return Re;
      },
      CACHE_ONE_YEAR: function() {
        return f;
      },
      DOT_NEXT_ALIAS: function() {
        return j;
      },
      ESLINT_DEFAULT_DIRS: function() {
        return W;
      },
      GSP_NO_RETURNED_VALUE: function() {
        return nt;
      },
      GSSP_COMPONENT_MEMBER_ERROR: function() {
        return T;
      },
      GSSP_NO_RETURNED_VALUE: function() {
        return Ce;
      },
      INFINITE_CACHE: function() {
        return _;
      },
      INSTRUMENTATION_HOOK_FILENAME: function() {
        return I;
      },
      MATCHED_PATH_HEADER: function() {
        return s;
      },
      MIDDLEWARE_FILENAME: function() {
        return A;
      },
      MIDDLEWARE_LOCATION_REGEXP: function() {
        return k;
      },
      NEXT_BODY_SUFFIX: function() {
        return S;
      },
      NEXT_CACHE_IMPLICIT_TAG_ID: function() {
        return P;
      },
      NEXT_CACHE_REVALIDATED_TAGS_HEADER: function() {
        return g;
      },
      NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER: function() {
        return y;
      },
      NEXT_CACHE_SOFT_TAG_MAX_LENGTH: function() {
        return m;
      },
      NEXT_CACHE_TAGS_HEADER: function() {
        return R;
      },
      NEXT_CACHE_TAG_MAX_ITEMS: function() {
        return l;
      },
      NEXT_CACHE_TAG_MAX_LENGTH: function() {
        return E;
      },
      NEXT_DATA_SUFFIX: function() {
        return w;
      },
      NEXT_INTERCEPTION_MARKER_PREFIX: function() {
        return n;
      },
      NEXT_META_SUFFIX: function() {
        return b;
      },
      NEXT_QUERY_PARAM_PREFIX: function() {
        return r;
      },
      NEXT_RESUME_HEADER: function() {
        return h;
      },
      NON_STANDARD_NODE_ENV: function() {
        return v;
      },
      PAGES_DIR_ALIAS: function() {
        return O;
      },
      PRERENDER_REVALIDATE_HEADER: function() {
        return i;
      },
      PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER: function() {
        return a;
      },
      PUBLIC_DIR_MIDDLEWARE_CONFLICT: function() {
        return tt;
      },
      ROOT_DIR_ALIAS: function() {
        return Y;
      },
      RSC_ACTION_CLIENT_WRAPPER_ALIAS: function() {
        return Pe;
      },
      RSC_ACTION_ENCRYPTION_ALIAS: function() {
        return Ee;
      },
      RSC_ACTION_PROXY_ALIAS: function() {
        return ye;
      },
      RSC_ACTION_VALIDATE_ALIAS: function() {
        return oe;
      },
      RSC_CACHE_WRAPPER_ALIAS: function() {
        return Te;
      },
      RSC_MOD_REF_PROXY_ALIAS: function() {
        return ve;
      },
      RSC_PREFETCH_SUFFIX: function() {
        return o;
      },
      RSC_SEGMENTS_DIR_SUFFIX: function() {
        return c;
      },
      RSC_SEGMENT_SUFFIX: function() {
        return u;
      },
      RSC_SUFFIX: function() {
        return d;
      },
      SERVER_PROPS_EXPORT_ERROR: function() {
        return $e;
      },
      SERVER_PROPS_GET_INIT_PROPS_CONFLICT: function() {
        return We;
      },
      SERVER_PROPS_SSG_CONFLICT: function() {
        return rt;
      },
      SERVER_RUNTIME: function() {
        return V;
      },
      SSG_FALLBACK_EXPORT_ERROR: function() {
        return C;
      },
      SSG_GET_INITIAL_PROPS_CONFLICT: function() {
        return qe;
      },
      STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR: function() {
        return Oe;
      },
      UNSTABLE_REVALIDATE_RENAME_ERROR: function() {
        return Ke;
      },
      WEBPACK_LAYERS: function() {
        return ge;
      },
      WEBPACK_RESOURCE_QUERIES: function() {
        return _e;
      }
    });
    const r = "nxtP", n = "nxtI", s = "x-matched-path", i = "x-prerender-revalidate", a = "x-prerender-revalidate-if-generated", o = ".prefetch.rsc", c = ".segments", u = ".segment.rsc", d = ".rsc", p = ".action", w = ".json", b = ".meta", S = ".body", R = "x-next-cache-tags", g = "x-next-revalidated-tags", y = "x-next-revalidate-tag-token", h = "next-resume", l = 128, E = 256, m = 1024, P = "_N_T_", f = 31536e3, _ = 4294967294, A = "middleware", k = `(?:src/)?${A}`, I = "instrumentation", O = "private-next-pages", j = "private-dot-next", Y = "private-next-root-dir", Re = "private-next-app-dir", ve = "private-next-rsc-mod-ref-proxy", oe = "private-next-rsc-action-validate", ye = "private-next-rsc-server-reference", Te = "private-next-rsc-cache-wrapper", Ee = "private-next-rsc-action-encryption", Pe = "private-next-rsc-action-client-wrapper", tt = "You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict", qe = "You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps", We = "You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.", rt = "You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps", Oe = "can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props", $e = "pages with `getServerSideProps` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export", nt = "Your `getStaticProps` function did not return an object. Did you forget to add a `return`?", Ce = "Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?", Ke = "The `unstable_revalidate` property is available for general use.\nPlease use `revalidate` instead.", T = "can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member", v = 'You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env', C = "Pages with `fallback` enabled in `getStaticPaths` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export", W = [
      "app",
      "pages",
      "components",
      "lib",
      "src"
    ], V = {
      edge: "edge",
      experimentalEdge: "experimental-edge",
      nodejs: "nodejs"
    }, U = {
      /**
      * The layer for the shared code between the client and server bundles.
      */
      shared: "shared",
      /**
      * The layer for server-only runtime and picking up `react-server` export conditions.
      * Including app router RSC pages and app router custom routes and metadata routes.
      */
      reactServerComponents: "rsc",
      /**
      * Server Side Rendering layer for app (ssr).
      */
      serverSideRendering: "ssr",
      /**
      * The browser client bundle layer for actions.
      */
      actionBrowser: "action-browser",
      /**
      * The Node.js bundle layer for the API routes.
      */
      apiNode: "api-node",
      /**
      * The Edge Lite bundle layer for the API routes.
      */
      apiEdge: "api-edge",
      /**
      * The layer for the middleware code.
      */
      middleware: "middleware",
      /**
      * The layer for the instrumentation hooks.
      */
      instrument: "instrument",
      /**
      * The layer for assets on the edge.
      */
      edgeAsset: "edge-asset",
      /**
      * The browser client bundle layer for App directory.
      */
      appPagesBrowser: "app-pages-browser",
      /**
      * The browser client bundle layer for Pages directory.
      */
      pagesDirBrowser: "pages-dir-browser",
      /**
      * The Edge Lite bundle layer for Pages directory.
      */
      pagesDirEdge: "pages-dir-edge",
      /**
      * The Node.js bundle layer for Pages directory.
      */
      pagesDirNode: "pages-dir-node"
    }, ge = {
      ...U,
      GROUP: {
        builtinReact: [
          U.reactServerComponents,
          U.actionBrowser
        ],
        serverOnly: [
          U.reactServerComponents,
          U.actionBrowser,
          U.instrument,
          U.middleware
        ],
        neutralTarget: [
          // pages api
          U.apiNode,
          U.apiEdge
        ],
        clientOnly: [
          U.serverSideRendering,
          U.appPagesBrowser
        ],
        bundled: [
          U.reactServerComponents,
          U.actionBrowser,
          U.serverSideRendering,
          U.appPagesBrowser,
          U.shared,
          U.instrument,
          U.middleware
        ],
        appPages: [
          // app router pages and layouts
          U.reactServerComponents,
          U.serverSideRendering,
          U.appPagesBrowser,
          U.actionBrowser
        ]
      }
    }, _e = {
      edgeSSREntry: "__next_edge_ssr_entry__",
      metadata: "__next_metadata__",
      metadataRoute: "__next_metadata_route__",
      metadataImageMeta: "__next_metadata_image_meta__"
    };
  }(Lr)), Lr;
}
var oa;
function hi() {
  return oa || (oa = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(c, u) {
      for (var d in u) Object.defineProperty(c, d, {
        enumerable: !0,
        get: u[d]
      });
    }
    t(e, {
      fromNodeOutgoingHttpHeaders: function() {
        return n;
      },
      normalizeNextQueryParam: function() {
        return o;
      },
      splitCookiesString: function() {
        return s;
      },
      toNodeOutgoingHttpHeaders: function() {
        return i;
      },
      validateURL: function() {
        return a;
      }
    });
    const r = Do();
    function n(c) {
      const u = new Headers();
      for (let [d, p] of Object.entries(c)) {
        const w = Array.isArray(p) ? p : [
          p
        ];
        for (let b of w)
          typeof b > "u" || (typeof b == "number" && (b = b.toString()), u.append(d, b));
      }
      return u;
    }
    function s(c) {
      var u = [], d = 0, p, w, b, S, R;
      function g() {
        for (; d < c.length && /\s/.test(c.charAt(d)); )
          d += 1;
        return d < c.length;
      }
      function y() {
        return w = c.charAt(d), w !== "=" && w !== ";" && w !== ",";
      }
      for (; d < c.length; ) {
        for (p = d, R = !1; g(); )
          if (w = c.charAt(d), w === ",") {
            for (b = d, d += 1, g(), S = d; d < c.length && y(); )
              d += 1;
            d < c.length && c.charAt(d) === "=" ? (R = !0, d = S, u.push(c.substring(p, b)), p = d) : d = b + 1;
          } else
            d += 1;
        (!R || d >= c.length) && u.push(c.substring(p, c.length));
      }
      return u;
    }
    function i(c) {
      const u = {}, d = [];
      if (c)
        for (const [p, w] of c.entries())
          p.toLowerCase() === "set-cookie" ? (d.push(...s(w)), u[p] = d.length === 1 ? d[0] : d) : u[p] = w;
      return u;
    }
    function a(c) {
      try {
        return String(new URL(String(c)));
      } catch (u) {
        throw Object.defineProperty(new Error(`URL is malformed "${String(c)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, {
          cause: u
        }), "__NEXT_ERROR_CODE", {
          value: "E61",
          enumerable: !1,
          configurable: !0
        });
      }
    }
    function o(c) {
      const u = [
        r.NEXT_QUERY_PARAM_PREFIX,
        r.NEXT_INTERCEPTION_MARKER_PREFIX
      ];
      for (const d of u)
        if (c !== d && c.startsWith(d))
          return c.substring(d.length);
      return null;
    }
  }(Ur)), Ur;
}
var Hr = {}, ca;
function Uo() {
  return ca || (ca = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(i, a) {
      for (var o in a) Object.defineProperty(i, o, {
        enumerable: !0,
        get: a[o]
      });
    }
    t(e, {
      PageSignatureError: function() {
        return r;
      },
      RemovedPageError: function() {
        return n;
      },
      RemovedUAError: function() {
        return s;
      }
    });
    class r extends Error {
      constructor({ page: a }) {
        super(`The middleware "${a}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
      }
    }
    class n extends Error {
      constructor() {
        super("The request.page has been deprecated in favour of `URLPattern`.\n  Read more: https://nextjs.org/docs/messages/middleware-request-page\n  ");
      }
    }
    class s extends Error {
      constructor() {
        super("The request.ua has been removed in favour of `userAgent` function.\n  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent\n  ");
      }
    }
  }(Hr)), Hr;
}
var ua;
function Lo() {
  return ua || (ua = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(c, u) {
      for (var d in u) Object.defineProperty(c, d, {
        enumerable: !0,
        get: u[d]
      });
    }
    t(e, {
      INTERNALS: function() {
        return a;
      },
      NextRequest: function() {
        return o;
      }
    });
    const r = fi(), n = hi(), s = Uo(), i = bt(), a = Symbol("internal request");
    class o extends Request {
      constructor(u, d = {}) {
        const p = typeof u != "string" && "url" in u ? u.url : String(u);
        (0, n.validateURL)(p), process.env.NEXT_RUNTIME !== "edge" && d.body && d.duplex !== "half" && (d.duplex = "half"), u instanceof Request ? super(u, d) : super(p, d);
        const w = new r.NextURL(p, {
          headers: (0, n.toNodeOutgoingHttpHeaders)(this.headers),
          nextConfig: d.nextConfig
        });
        this[a] = {
          cookies: new i.RequestCookies(this.headers),
          nextUrl: w,
          url: process.env.__NEXT_NO_MIDDLEWARE_URL_NORMALIZE ? p : w.toString()
        };
      }
      [Symbol.for("edge-runtime.inspect.custom")]() {
        return {
          cookies: this.cookies,
          nextUrl: this.nextUrl,
          url: this.url,
          // rest of props come from Request
          bodyUsed: this.bodyUsed,
          cache: this.cache,
          credentials: this.credentials,
          destination: this.destination,
          headers: Object.fromEntries(this.headers),
          integrity: this.integrity,
          keepalive: this.keepalive,
          method: this.method,
          mode: this.mode,
          redirect: this.redirect,
          referrer: this.referrer,
          referrerPolicy: this.referrerPolicy,
          signal: this.signal
        };
      }
      get cookies() {
        return this[a].cookies;
      }
      get nextUrl() {
        return this[a].nextUrl;
      }
      /**
      * @deprecated
      * `page` has been deprecated in favour of `URLPattern`.
      * Read more: https://nextjs.org/docs/messages/middleware-request-page
      */
      get page() {
        throw new s.RemovedPageError();
      }
      /**
      * @deprecated
      * `ua` has been removed in favour of \`userAgent\` function.
      * Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
      */
      get ua() {
        throw new s.RemovedUAError();
      }
      get url() {
        return this[a].url;
      }
    }
  }(br)), br;
}
var Mr = {}, la;
function Ho() {
  return la || (la = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "NextResponse", {
      enumerable: !0,
      get: function() {
        return u;
      }
    });
    const t = bt(), r = fi(), n = hi(), s = Kn(), i = bt(), a = Symbol("internal response"), o = /* @__PURE__ */ new Set([
      301,
      302,
      303,
      307,
      308
    ]);
    function c(d, p) {
      var w;
      if (!(d == null || (w = d.request) == null) && w.headers) {
        if (!(d.request.headers instanceof Headers))
          throw Object.defineProperty(new Error("request.headers must be an instance of Headers"), "__NEXT_ERROR_CODE", {
            value: "E119",
            enumerable: !1,
            configurable: !0
          });
        const b = [];
        for (const [S, R] of d.request.headers)
          p.set("x-middleware-request-" + S, R), b.push(S);
        p.set("x-middleware-override-headers", b.join(","));
      }
    }
    class u extends Response {
      constructor(p, w = {}) {
        super(p, w);
        const b = this.headers, S = new i.ResponseCookies(b), R = new Proxy(S, {
          get(g, y, h) {
            switch (y) {
              case "delete":
              case "set":
                return (...l) => {
                  const E = Reflect.apply(g[y], g, l), m = new Headers(b);
                  return E instanceof i.ResponseCookies && b.set("x-middleware-set-cookie", E.getAll().map((P) => (0, t.stringifyCookie)(P)).join(",")), c(w, m), E;
                };
              default:
                return s.ReflectAdapter.get(g, y, h);
            }
          }
        });
        this[a] = {
          cookies: R,
          url: w.url ? new r.NextURL(w.url, {
            headers: (0, n.toNodeOutgoingHttpHeaders)(b),
            nextConfig: w.nextConfig
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
        return this[a].cookies;
      }
      static json(p, w) {
        const b = Response.json(p, w);
        return new u(b.body, b);
      }
      static redirect(p, w) {
        const b = typeof w == "number" ? w : (w == null ? void 0 : w.status) ?? 307;
        if (!o.has(b))
          throw Object.defineProperty(new RangeError('Failed to execute "redirect" on "response": Invalid status code'), "__NEXT_ERROR_CODE", {
            value: "E529",
            enumerable: !1,
            configurable: !0
          });
        const S = typeof w == "object" ? w : {}, R = new Headers(S == null ? void 0 : S.headers);
        return R.set("Location", (0, n.validateURL)(p)), new u(null, {
          ...S,
          headers: R,
          status: b
        });
      }
      static rewrite(p, w) {
        const b = new Headers(w == null ? void 0 : w.headers);
        return b.set("x-middleware-rewrite", (0, n.validateURL)(p)), c(w, b), new u(null, {
          ...w,
          headers: b
        });
      }
      static next(p) {
        const w = new Headers(p == null ? void 0 : p.headers);
        return w.set("x-middleware-next", "1"), c(p, w), new u(null, {
          ...p,
          headers: w
        });
      }
    }
  }(Mr)), Mr;
}
var qr = {}, da;
function Mo() {
  return da || (da = 1, function(e) {
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
  }(qr)), qr;
}
var Wr = {}, $r = { exports: {} }, fa;
function qo() {
  return fa || (fa = 1, (() => {
    var e = { 226: function(s, i) {
      (function(a, o) {
        var c = "1.0.35", u = "", d = "?", p = "function", w = "undefined", b = "object", S = "string", R = "major", g = "model", y = "name", h = "type", l = "vendor", E = "version", m = "architecture", P = "console", f = "mobile", _ = "tablet", A = "smarttv", k = "wearable", I = "embedded", O = 350, j = "Amazon", Y = "Apple", Re = "ASUS", ve = "BlackBerry", oe = "Browser", ye = "Chrome", Te = "Edge", Ee = "Firefox", Pe = "Google", tt = "Huawei", qe = "LG", We = "Microsoft", rt = "Motorola", Oe = "Opera", $e = "Samsung", nt = "Sharp", Ce = "Sony", Ke = "Xiaomi", T = "Zebra", v = "Facebook", C = "Chromium OS", W = "Mac OS", V = function(q, J) {
          var H = {};
          for (var G in q)
            J[G] && J[G].length % 2 === 0 ? H[G] = J[G].concat(q[G]) : H[G] = q[G];
          return H;
        }, U = function(q) {
          for (var J = {}, H = 0; H < q.length; H++)
            J[q[H].toUpperCase()] = q[H];
          return J;
        }, ge = function(q, J) {
          return typeof q === S ? _e(J).indexOf(_e(q)) !== -1 : !1;
        }, _e = function(q) {
          return q.toLowerCase();
        }, je = function(q) {
          return typeof q === S ? q.replace(/[^\d\.]/g, u).split(".")[0] : o;
        }, st = function(q, J) {
          if (typeof q === S)
            return q = q.replace(/^\s\s*/, u), typeof J === w ? q : q.substring(0, O);
        }, Ie = function(q, J) {
          for (var H = 0, G, xe, we, K, L, be; H < J.length && !L; ) {
            var Qt = J[H], bs = J[H + 1];
            for (G = xe = 0; G < Qt.length && !L && Qt[G]; )
              if (L = Qt[G++].exec(q), L)
                for (we = 0; we < bs.length; we++)
                  be = L[++xe], K = bs[we], typeof K === b && K.length > 0 ? K.length === 2 ? typeof K[1] == p ? this[K[0]] = K[1].call(this, be) : this[K[0]] = K[1] : K.length === 3 ? typeof K[1] === p && !(K[1].exec && K[1].test) ? this[K[0]] = be ? K[1].call(this, be, K[2]) : o : this[K[0]] = be ? be.replace(K[1], K[2]) : o : K.length === 4 && (this[K[0]] = be ? K[3].call(this, be.replace(K[1], K[2])) : o) : this[K] = be || o;
            H += 2;
          }
        }, Zt = function(q, J) {
          for (var H in J)
            if (typeof J[H] === b && J[H].length > 0) {
              for (var G = 0; G < J[H].length; G++)
                if (ge(J[H][G], q))
                  return H === d ? o : H;
            } else if (ge(J[H], q))
              return H === d ? o : H;
          return q;
        }, co = { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }, Es = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, ws = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [E, [y, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [E, [y, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [y, E], [/opios[\/ ]+([\w\.]+)/i], [E, [y, Oe + " Mini"]], [/\bopr\/([\w\.]+)/i], [E, [y, Oe]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [y, E], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [E, [y, "UC" + oe]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [E, [y, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [E, [y, "WeChat"]], [/konqueror\/([\w\.]+)/i], [E, [y, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [E, [y, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [E, [y, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[y, /(.+)/, "$1 Secure " + oe], E], [/\bfocus\/([\w\.]+)/i], [E, [y, Ee + " Focus"]], [/\bopt\/([\w\.]+)/i], [E, [y, Oe + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [E, [y, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [E, [y, "Dolphin"]], [/coast\/([\w\.]+)/i], [E, [y, Oe + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [E, [y, "MIUI " + oe]], [/fxios\/([-\w\.]+)/i], [E, [y, Ee]], [/\bqihu|(qi?ho?o?|360)browser/i], [[y, "360 " + oe]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[y, /(.+)/, "$1 " + oe], E], [/(comodo_dragon)\/([\w\.]+)/i], [[y, /_/g, " "], E], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [y, E], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [y], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[y, v], E], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [y, E], [/\bgsa\/([\w\.]+) .*safari\//i], [E, [y, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [E, [y, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [E, [y, ye + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[y, ye + " WebView"], E], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [E, [y, "Android " + oe]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [y, E], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [E, [y, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [E, y], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [y, [E, Zt, co]], [/(webkit|khtml)\/([\w\.]+)/i], [y, E], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[y, "Netscape"], E], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [E, [y, Ee + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [y, E], [/(cobalt)\/([\w\.]+)/i], [y, [E, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[m, "amd64"]], [/(ia32(?=;))/i], [[m, _e]], [/((?:i[346]|x)86)[;\)]/i], [[m, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[m, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[m, "armhf"]], [/windows (ce|mobile); ppc;/i], [[m, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[m, /ower/, u, _e]], [/(sun4\w)[;\)]/i], [[m, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[m, _e]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [g, [l, $e], [h, _]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [g, [l, $e], [h, f]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [g, [l, Y], [h, f]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [g, [l, Y], [h, _]], [/(macintosh);/i], [g, [l, Y]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [g, [l, nt], [h, f]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [g, [l, tt], [h, _]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [g, [l, tt], [h, f]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[g, /_/g, " "], [l, Ke], [h, f]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[g, /_/g, " "], [l, Ke], [h, _]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [g, [l, "OPPO"], [h, f]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [g, [l, "Vivo"], [h, f]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [g, [l, "Realme"], [h, f]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [g, [l, rt], [h, f]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [g, [l, rt], [h, _]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [g, [l, qe], [h, _]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [g, [l, qe], [h, f]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [g, [l, "Lenovo"], [h, _]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[g, /_/g, " "], [l, "Nokia"], [h, f]], [/(pixel c)\b/i], [g, [l, Pe], [h, _]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [g, [l, Pe], [h, f]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [g, [l, Ce], [h, f]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[g, "Xperia Tablet"], [l, Ce], [h, _]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [g, [l, "OnePlus"], [h, f]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [g, [l, j], [h, _]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[g, /(.+)/g, "Fire Phone $1"], [l, j], [h, f]], [/(playbook);[-\w\),; ]+(rim)/i], [g, l, [h, _]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [g, [l, ve], [h, f]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [g, [l, Re], [h, _]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [g, [l, Re], [h, f]], [/(nexus 9)/i], [g, [l, "HTC"], [h, _]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [l, [g, /_/g, " "], [h, f]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [g, [l, "Acer"], [h, _]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [g, [l, "Meizu"], [h, f]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [l, g, [h, f]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [l, g, [h, _]], [/(surface duo)/i], [g, [l, We], [h, _]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [g, [l, "Fairphone"], [h, f]], [/(u304aa)/i], [g, [l, "AT&T"], [h, f]], [/\bsie-(\w*)/i], [g, [l, "Siemens"], [h, f]], [/\b(rct\w+) b/i], [g, [l, "RCA"], [h, _]], [/\b(venue[\d ]{2,7}) b/i], [g, [l, "Dell"], [h, _]], [/\b(q(?:mv|ta)\w+) b/i], [g, [l, "Verizon"], [h, _]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [g, [l, "Barnes & Noble"], [h, _]], [/\b(tm\d{3}\w+) b/i], [g, [l, "NuVision"], [h, _]], [/\b(k88) b/i], [g, [l, "ZTE"], [h, _]], [/\b(nx\d{3}j) b/i], [g, [l, "ZTE"], [h, f]], [/\b(gen\d{3}) b.+49h/i], [g, [l, "Swiss"], [h, f]], [/\b(zur\d{3}) b/i], [g, [l, "Swiss"], [h, _]], [/\b((zeki)?tb.*\b) b/i], [g, [l, "Zeki"], [h, _]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[l, "Dragon Touch"], g, [h, _]], [/\b(ns-?\w{0,9}) b/i], [g, [l, "Insignia"], [h, _]], [/\b((nxa|next)-?\w{0,9}) b/i], [g, [l, "NextBook"], [h, _]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[l, "Voice"], g, [h, f]], [/\b(lvtel\-)?(v1[12]) b/i], [[l, "LvTel"], g, [h, f]], [/\b(ph-1) /i], [g, [l, "Essential"], [h, f]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [g, [l, "Envizen"], [h, _]], [/\b(trio[-\w\. ]+) b/i], [g, [l, "MachSpeed"], [h, _]], [/\btu_(1491) b/i], [g, [l, "Rotor"], [h, _]], [/(shield[\w ]+) b/i], [g, [l, "Nvidia"], [h, _]], [/(sprint) (\w+)/i], [l, g, [h, f]], [/(kin\.[onetw]{3})/i], [[g, /\./g, " "], [l, We], [h, f]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [g, [l, T], [h, _]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [g, [l, T], [h, f]], [/smart-tv.+(samsung)/i], [l, [h, A]], [/hbbtv.+maple;(\d+)/i], [[g, /^/, "SmartTV"], [l, $e], [h, A]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[l, qe], [h, A]], [/(apple) ?tv/i], [l, [g, Y + " TV"], [h, A]], [/crkey/i], [[g, ye + "cast"], [l, Pe], [h, A]], [/droid.+aft(\w)( bui|\))/i], [g, [l, j], [h, A]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [g, [l, nt], [h, A]], [/(bravia[\w ]+)( bui|\))/i], [g, [l, Ce], [h, A]], [/(mitv-\w{5}) bui/i], [g, [l, Ke], [h, A]], [/Hbbtv.*(technisat) (.*);/i], [l, g, [h, A]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[l, st], [g, st], [h, A]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[h, A]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [l, g, [h, P]], [/droid.+; (shield) bui/i], [g, [l, "Nvidia"], [h, P]], [/(playstation [345portablevi]+)/i], [g, [l, Ce], [h, P]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [g, [l, We], [h, P]], [/((pebble))app/i], [l, g, [h, k]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [g, [l, Y], [h, k]], [/droid.+; (glass) \d/i], [g, [l, Pe], [h, k]], [/droid.+; (wt63?0{2,3})\)/i], [g, [l, T], [h, k]], [/(quest( 2| pro)?)/i], [g, [l, v], [h, k]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [l, [h, I]], [/(aeobc)\b/i], [g, [l, j], [h, I]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [g, [h, f]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [g, [h, _]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[h, _]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[h, f]], [/(android[-\w\. ]{0,9});.+buil/i], [g, [l, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [E, [y, Te + "HTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [E, [y, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [y, E], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [E, y]], os: [[/microsoft (windows) (vista|xp)/i], [y, E], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [y, [E, Zt, Es]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[y, "Windows"], [E, Zt, Es]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[E, /_/g, "."], [y, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[y, W], [E, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [E, y], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [y, E], [/\(bb(10);/i], [E, [y, ve]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [E, [y, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [E, [y, Ee + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [E, [y, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [E, [y, "watchOS"]], [/crkey\/([\d\.]+)/i], [E, [y, ye + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[y, C], E], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [y, E], [/(sunos) ?([\w\.\d]*)/i], [[y, "Solaris"], E], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [y, E]] }, fe = function(q, J) {
          if (typeof q === b && (J = q, q = o), !(this instanceof fe))
            return new fe(q, J).getResult();
          var H = typeof a !== w && a.navigator ? a.navigator : o, G = q || (H && H.userAgent ? H.userAgent : u), xe = H && H.userAgentData ? H.userAgentData : o, we = J ? V(ws, J) : ws, K = H && H.userAgent == G;
          return this.getBrowser = function() {
            var L = {};
            return L[y] = o, L[E] = o, Ie.call(L, G, we.browser), L[R] = je(L[E]), K && H && H.brave && typeof H.brave.isBrave == p && (L[y] = "Brave"), L;
          }, this.getCPU = function() {
            var L = {};
            return L[m] = o, Ie.call(L, G, we.cpu), L;
          }, this.getDevice = function() {
            var L = {};
            return L[l] = o, L[g] = o, L[h] = o, Ie.call(L, G, we.device), K && !L[h] && xe && xe.mobile && (L[h] = f), K && L[g] == "Macintosh" && H && typeof H.standalone !== w && H.maxTouchPoints && H.maxTouchPoints > 2 && (L[g] = "iPad", L[h] = _), L;
          }, this.getEngine = function() {
            var L = {};
            return L[y] = o, L[E] = o, Ie.call(L, G, we.engine), L;
          }, this.getOS = function() {
            var L = {};
            return L[y] = o, L[E] = o, Ie.call(L, G, we.os), K && !L[y] && xe && xe.platform != "Unknown" && (L[y] = xe.platform.replace(/chrome os/i, C).replace(/macos/i, W)), L;
          }, this.getResult = function() {
            return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
          }, this.getUA = function() {
            return G;
          }, this.setUA = function(L) {
            return G = typeof L === S && L.length > O ? st(L, O) : L, this;
          }, this.setUA(G), this;
        };
        fe.VERSION = c, fe.BROWSER = U([y, E, R]), fe.CPU = U([m]), fe.DEVICE = U([g, l, h, P, f, A, _, k, I]), fe.ENGINE = fe.OS = U([y, E]), typeof i !== w ? (s.exports && (i = s.exports = fe), i.UAParser = fe) : typeof a !== w && (a.UAParser = fe);
        var at = typeof a !== w && (a.jQuery || a.Zepto);
        if (at && !at.ua) {
          var Ot = new fe();
          at.ua = Ot.getResult(), at.ua.get = function() {
            return Ot.getUA();
          }, at.ua.set = function(q) {
            Ot.setUA(q);
            var J = Ot.getResult();
            for (var H in J)
              at.ua[H] = J[H];
          };
        }
      })(typeof window == "object" ? window : this);
    } }, t = {};
    function r(s) {
      var i = t[s];
      if (i !== void 0)
        return i.exports;
      var a = t[s] = { exports: {} }, o = !0;
      try {
        e[s].call(a.exports, a, a.exports, r), o = !1;
      } finally {
        o && delete t[s];
      }
      return a.exports;
    }
    typeof r < "u" && (r.ab = __dirname + "/");
    var n = r(226);
    $r.exports = n;
  })()), $r.exports;
}
var ha;
function pa() {
  return ha || (ha = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(o, c) {
      for (var u in c) Object.defineProperty(o, u, {
        enumerable: !0,
        get: c[u]
      });
    }
    t(e, {
      isBot: function() {
        return s;
      },
      userAgent: function() {
        return a;
      },
      userAgentFromString: function() {
        return i;
      }
    });
    const r = /* @__PURE__ */ n(qo());
    function n(o) {
      return o && o.__esModule ? o : {
        default: o
      };
    }
    function s(o) {
      return /Googlebot|Mediapartners-Google|AdsBot-Google|googleweblight|Storebot-Google|Google-PageRenderer|Google-InspectionTool|Bingbot|BingPreview|Slurp|DuckDuckBot|baiduspider|yandex|sogou|LinkedInBot|bitlybot|tumblr|vkShare|quora link preview|facebookexternalhit|facebookcatalog|Twitterbot|applebot|redditbot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|ia_archiver/i.test(o);
    }
    function i(o) {
      return {
        ...(0, r.default)(o),
        isBot: o === void 0 ? !1 : s(o)
      };
    }
    function a({ headers: o }) {
      return i(o.get("user-agent") || void 0);
    }
  }(Wr)), Wr;
}
var Kr = {}, ma;
function Wo() {
  return ma || (ma = 1, function(e) {
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
  }(Kr)), Kr;
}
var jr = {}, Jr = {}, ga;
function $o() {
  return ga || (ga = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "after", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const t = Me();
    function r(n) {
      const s = t.workAsyncStorage.getStore();
      if (!s)
        throw Object.defineProperty(new Error("`after` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context"), "__NEXT_ERROR_CODE", {
          value: "E468",
          enumerable: !1,
          configurable: !0
        });
      const { afterContext: i } = s;
      return i.after(n);
    }
  }(Jr)), Jr;
}
var _a;
function Ko() {
  return _a || (_a = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), t($o(), e);
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
  }(jr)), jr;
}
var Br = {}, ya;
function jo() {
  return ya || (ya = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "connection", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const t = Me(), r = Ye(), n = vt(), s = pt(), i = Rt(), a = Gn();
    function o() {
      const c = t.workAsyncStorage.getStore(), u = r.workUnitAsyncStorage.getStore();
      if (c) {
        if (u && u.phase === "after" && !(0, a.isRequestAPICallableInsideAfter)())
          throw Object.defineProperty(new Error(`Route ${c.route} used "connection" inside "after(...)". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but "after(...)" executes after the request, so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", {
            value: "E186",
            enumerable: !1,
            configurable: !0
          });
        if (c.forceStatic)
          return Promise.resolve(void 0);
        if (u) {
          if (u.type === "cache")
            throw Object.defineProperty(new Error(`Route ${c.route} used "connection" inside "use cache". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but caches must be able to be produced before a Request so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
              value: "E111",
              enumerable: !1,
              configurable: !0
            });
          if (u.type === "unstable-cache")
            throw Object.defineProperty(new Error(`Route ${c.route} used "connection" inside a function cached with "unstable_cache(...)". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but caches must be able to be produced before a Request so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
              value: "E1",
              enumerable: !1,
              configurable: !0
            });
        }
        if (c.dynamicShouldError)
          throw Object.defineProperty(new s.StaticGenBailoutError(`Route ${c.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`connection\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
            value: "E562",
            enumerable: !1,
            configurable: !0
          });
        if (u) {
          if (u.type === "prerender")
            return (0, i.makeHangingPromise)(u.renderSignal, "`connection()`");
          u.type === "prerender-ppr" ? (0, n.postponeWithTracking)(c.route, "connection", u.dynamicTracking) : u.type === "prerender-legacy" && (0, n.throwToInterruptStaticGeneration)("connection", c, u);
        }
        (0, n.trackDynamicDataInDynamicRender)(c, u);
      }
      return Promise.resolve(void 0);
    }
  }(Br)), Br;
}
var Gr = {}, Fr = {}, Ea;
function Jo() {
  return Ea || (Ea = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "InvariantError", {
      enumerable: !0,
      get: function() {
        return t;
      }
    });
    class t extends Error {
      constructor(n, s) {
        super("Invariant: " + (n.endsWith(".") ? n : n + ".") + " This is a bug in Next.js.", s), this.name = "InvariantError";
      }
    }
  }(Fr)), Fr;
}
var Xr = {}, wa;
function Bo() {
  return wa || (wa = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(a, o) {
      for (var c in o) Object.defineProperty(a, c, {
        enumerable: !0,
        get: o[c]
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
        return i;
      }
    });
    const r = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
    function n(a, o) {
      return r.test(o) ? "`" + a + "." + o + "`" : "`" + a + "[" + JSON.stringify(o) + "]`";
    }
    function s(a, o) {
      const c = JSON.stringify(o);
      return "`Reflect.has(" + a + ", " + c + ")`, `" + c + " in " + a + "`, or similar";
    }
    const i = /* @__PURE__ */ new Set([
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
  }(Xr)), Xr;
}
var ba;
function Go() {
  return ba || (ba = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "unstable_rootParams", {
      enumerable: !0,
      get: function() {
        return c;
      }
    });
    const t = Jo(), r = vt(), n = Me(), s = Ye(), i = Rt(), a = Bo(), o = /* @__PURE__ */ new WeakMap();
    async function c() {
      const p = n.workAsyncStorage.getStore();
      if (!p)
        throw Object.defineProperty(new t.InvariantError("Missing workStore in unstable_rootParams"), "__NEXT_ERROR_CODE", {
          value: "E615",
          enumerable: !1,
          configurable: !0
        });
      const w = s.workUnitAsyncStorage.getStore();
      if (!w)
        throw Object.defineProperty(new Error(`Route ${p.route} used \`unstable_rootParams()\` in Pages Router. This API is only available within App Router.`), "__NEXT_ERROR_CODE", {
          value: "E641",
          enumerable: !1,
          configurable: !0
        });
      switch (w.type) {
        case "unstable-cache":
        case "cache":
          throw Object.defineProperty(new Error(`Route ${p.route} used \`unstable_rootParams()\` inside \`"use cache"\` or \`unstable_cache\`. Support for this API inside cache scopes is planned for a future version of Next.js.`), "__NEXT_ERROR_CODE", {
            value: "E642",
            enumerable: !1,
            configurable: !0
          });
        case "prerender":
        case "prerender-ppr":
        case "prerender-legacy":
          return u(w.rootParams, p, w);
        default:
          return Promise.resolve(w.rootParams);
      }
    }
    function u(p, w, b) {
      const S = w.fallbackRouteParams;
      if (S) {
        let R = !1;
        for (const g in p)
          if (S.has(g)) {
            R = !0;
            break;
          }
        if (R) {
          if (b.type === "prerender") {
            const g = o.get(p);
            if (g)
              return g;
            const y = (0, i.makeHangingPromise)(b.renderSignal, "`unstable_rootParams`");
            return o.set(p, y), y;
          }
          return d(p, S, w, b);
        }
      }
      return Promise.resolve(p);
    }
    function d(p, w, b, S) {
      const R = o.get(p);
      if (R)
        return R;
      const g = {
        ...p
      }, y = Promise.resolve(g);
      return o.set(p, y), Object.keys(p).forEach((h) => {
        a.wellKnownProperties.has(h) || (w.has(h) ? Object.defineProperty(g, h, {
          get() {
            const l = (0, a.describeStringPropertyAccess)("unstable_rootParams", h);
            S.type === "prerender-ppr" ? (0, r.postponeWithTracking)(b.route, l, S.dynamicTracking) : (0, r.throwToInterruptStaticGeneration)(l, b, S);
          },
          enumerable: !0
        }) : y[h] = p[h]);
      }), y;
    }
  }(Gr)), Gr;
}
var Sa;
function Fo() {
  return Sa || (Sa = 1, function(e, t) {
    const r = {
      NextRequest: Lo().NextRequest,
      NextResponse: Ho().NextResponse,
      ImageResponse: Mo().ImageResponse,
      userAgentFromString: pa().userAgentFromString,
      userAgent: pa().userAgent,
      URLPattern: Wo().URLPattern,
      after: Ko().after,
      connection: jo().connection,
      unstable_rootParams: Go().unstable_rootParams
    };
    e.exports = r, t.NextRequest = r.NextRequest, t.NextResponse = r.NextResponse, t.ImageResponse = r.ImageResponse, t.userAgentFromString = r.userAgentFromString, t.userAgent = r.userAgent, t.URLPattern = r.URLPattern, t.after = r.after, t.connection = r.connection, t.unstable_rootParams = r.unstable_rootParams;
  }(Nt, Nt.exports)), Nt.exports;
}
var B = Fo();
class Se extends Error {
}
class kt extends Se {
  constructor({ code: t, message: r }) {
    super(r ?? "An error occured while interacting with the authorization server."), this.name = "OAuth2Error", this.code = t;
  }
}
class Xo extends Se {
  constructor(t) {
    super(t ?? "Discovery failed for the OpenID Connect configuration."), this.code = "discovery_error", this.name = "DiscoveryError";
  }
}
class zo extends Se {
  constructor(t) {
    super(t ?? "The state parameter is missing."), this.code = "missing_state", this.name = "MissingStateError";
  }
}
class Vo extends Se {
  constructor(t) {
    super(t ?? "The state parameter is invalid."), this.code = "invalid_state", this.name = "InvalidStateError";
  }
}
class Aa extends Se {
  constructor({ cause: t, message: r }) {
    super(r ?? "An error occured during the authorization flow."), this.code = "authorization_error", this.cause = t, this.name = "AuthorizationError";
  }
}
class Yo extends Se {
  constructor({ cause: t, message: r }) {
    super(r ?? "An error occured while trying to exchange the authorization code."), this.code = "authorization_code_grant_error", this.cause = t, this.name = "AuthorizationCodeGrantError";
  }
}
class Ne extends Se {
  constructor(t) {
    super(t ?? "An error occured while completing the backchannel logout request."), this.code = "backchannel_logout_error", this.name = "BackchannelLogoutError";
  }
}
var lt;
(function(e) {
  e.MISSING_SESSION = "missing_session", e.MISSING_REFRESH_TOKEN = "missing_refresh_token", e.FAILED_TO_REFRESH_TOKEN = "failed_to_refresh_token";
})(lt || (lt = {}));
class Tn extends Se {
  constructor(t, r) {
    super(r), this.name = "AccessTokenError", this.code = t;
  }
}
var St;
(function(e) {
  e.MISSING_SESSION = "missing_session", e.MISSING_REFRESH_TOKEN = "missing_refresh_token", e.FAILED_TO_EXCHANGE = "failed_to_exchange_refresh_token";
})(St || (St = {}));
class Pn extends Se {
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
var On;
(function(e) {
  e.MISSING_REQUIRED_OPTIONS = "missing_required_options";
})(On || (On = {}));
class Zo extends Se {
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
    r.forEach((i) => {
      i === "clientAuthentication" ? s += `Missing: clientAuthentication: Set either AUTH0_CLIENT_SECRET env var or AUTH0_CLIENT_ASSERTION_SIGNING_KEY env var, or pass clientSecret or clientAssertionSigningKey in options
` : n[i] ? s += `Missing: ${i}: Set ${n[i]} env var or pass ${i} in options
` : s += `Missing: ${i}
`;
    }), super(s.trim()), this.name = "ConfigurationError", this.code = t, this.missingOptions = r;
  }
}
const M = crypto, le = (e) => e instanceof CryptoKey, Qo = async (e, t) => {
  const r = `SHA-${e.slice(-3)}`;
  return new Uint8Array(await M.subtle.digest(r, t));
}, ne = new TextEncoder(), Ze = new TextDecoder(), Mt = 2 ** 32;
function Ae(...e) {
  const t = e.reduce((s, { length: i }) => s + i, 0), r = new Uint8Array(t);
  let n = 0;
  for (const s of e)
    r.set(s, n), n += s.length;
  return r;
}
function ec(e, t) {
  return Ae(ne.encode(e), new Uint8Array([0]), t);
}
function Cn(e, t, r) {
  if (t < 0 || t >= Mt)
    throw new RangeError(`value must be >= 0 and <= ${Mt - 1}. Received ${t}`);
  e.set([t >>> 24, t >>> 16, t >>> 8, t & 255], r);
}
function pi(e) {
  const t = Math.floor(e / Mt), r = e % Mt, n = new Uint8Array(8);
  return Cn(n, t, 0), Cn(n, r, 4), n;
}
function zn(e) {
  const t = new Uint8Array(4);
  return Cn(t, e), t;
}
function zr(e) {
  return Ae(zn(e.length), e);
}
async function tc(e, t, r) {
  const n = Math.ceil((t >> 3) / 32), s = new Uint8Array(n * 32);
  for (let i = 0; i < n; i++) {
    const a = new Uint8Array(4 + e.length + r.length);
    a.set(zn(i + 1)), a.set(e, 4), a.set(r, 4 + e.length), s.set(await Qo("sha256", a), i * 32);
  }
  return s.slice(0, t >> 3);
}
const rc = (e) => {
  let t = e;
  typeof t == "string" && (t = ne.encode(t));
  const r = 32768, n = [];
  for (let s = 0; s < t.length; s += r)
    n.push(String.fromCharCode.apply(null, t.subarray(s, s + r)));
  return btoa(n.join(""));
}, ce = (e) => rc(e).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_"), nc = (e) => {
  const t = atob(e), r = new Uint8Array(t.length);
  for (let n = 0; n < t.length; n++)
    r[n] = t.charCodeAt(n);
  return r;
}, Q = (e) => {
  let t = e;
  t instanceof Uint8Array && (t = Ze.decode(t)), t = t.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
  try {
    return nc(t);
  } catch {
    throw new TypeError("The input to be decoded is not correctly encoded.");
  }
};
class re extends Error {
  constructor(t, r) {
    var n;
    super(t, r), this.code = "ERR_JOSE_GENERIC", this.name = this.constructor.name, (n = Error.captureStackTrace) == null || n.call(Error, this, this.constructor);
  }
}
re.code = "ERR_JOSE_GENERIC";
class ie extends re {
  constructor(t, r, n = "unspecified", s = "unspecified") {
    super(t, { cause: { claim: n, reason: s, payload: r } }), this.code = "ERR_JWT_CLAIM_VALIDATION_FAILED", this.claim = n, this.reason = s, this.payload = r;
  }
}
ie.code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
class In extends re {
  constructor(t, r, n = "unspecified", s = "unspecified") {
    super(t, { cause: { claim: n, reason: s, payload: r } }), this.code = "ERR_JWT_EXPIRED", this.claim = n, this.reason = s, this.payload = r;
  }
}
In.code = "ERR_JWT_EXPIRED";
class qt extends re {
  constructor() {
    super(...arguments), this.code = "ERR_JOSE_ALG_NOT_ALLOWED";
  }
}
qt.code = "ERR_JOSE_ALG_NOT_ALLOWED";
class z extends re {
  constructor() {
    super(...arguments), this.code = "ERR_JOSE_NOT_SUPPORTED";
  }
}
z.code = "ERR_JOSE_NOT_SUPPORTED";
class Wt extends re {
  constructor(t = "decryption operation failed", r) {
    super(t, r), this.code = "ERR_JWE_DECRYPTION_FAILED";
  }
}
Wt.code = "ERR_JWE_DECRYPTION_FAILED";
class N extends re {
  constructor() {
    super(...arguments), this.code = "ERR_JWE_INVALID";
  }
}
N.code = "ERR_JWE_INVALID";
class Z extends re {
  constructor() {
    super(...arguments), this.code = "ERR_JWS_INVALID";
  }
}
Z.code = "ERR_JWS_INVALID";
class Vn extends re {
  constructor() {
    super(...arguments), this.code = "ERR_JWT_INVALID";
  }
}
Vn.code = "ERR_JWT_INVALID";
class sc extends re {
  constructor() {
    super(...arguments), this.code = "ERR_JWK_INVALID";
  }
}
sc.code = "ERR_JWK_INVALID";
class Yn extends re {
  constructor() {
    super(...arguments), this.code = "ERR_JWKS_INVALID";
  }
}
Yn.code = "ERR_JWKS_INVALID";
class Zn extends re {
  constructor(t = "no applicable key found in the JSON Web Key Set", r) {
    super(t, r), this.code = "ERR_JWKS_NO_MATCHING_KEY";
  }
}
Zn.code = "ERR_JWKS_NO_MATCHING_KEY";
class mi extends re {
  constructor(t = "multiple matching keys found in the JSON Web Key Set", r) {
    super(t, r), this.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
  }
}
mi.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
class gi extends re {
  constructor(t = "request timed out", r) {
    super(t, r), this.code = "ERR_JWKS_TIMEOUT";
  }
}
gi.code = "ERR_JWKS_TIMEOUT";
class _i extends re {
  constructor(t = "signature verification failed", r) {
    super(t, r), this.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
  }
}
_i.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
const Qn = M.getRandomValues.bind(M);
function yi(e) {
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
      throw new z(`Unsupported JWE Algorithm: ${e}`);
  }
}
const ac = (e) => Qn(new Uint8Array(yi(e) >> 3)), Ei = (e, t) => {
  if (t.length << 3 !== yi(e))
    throw new N("Invalid Initialization Vector length");
}, $t = (e, t) => {
  const r = e.byteLength << 3;
  if (r !== t)
    throw new N(`Invalid Content Encryption Key length. Expected ${t} bits, got ${r} bits`);
}, ic = (e, t) => {
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
function te(e, t = "algorithm.name") {
  return new TypeError(`CryptoKey does not support this operation, its ${t} must be ${e}`);
}
function Le(e, t) {
  return e.name === t;
}
function Lt(e) {
  return parseInt(e.name.slice(4), 10);
}
function oc(e) {
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
function wi(e, t) {
  if (t.length && !t.some((r) => e.usages.includes(r))) {
    let r = "CryptoKey does not support this operation, its usages must include ";
    if (t.length > 2) {
      const n = t.pop();
      r += `one of ${t.join(", ")}, or ${n}.`;
    } else t.length === 2 ? r += `one of ${t[0]} or ${t[1]}.` : r += `${t[0]}.`;
    throw new TypeError(r);
  }
}
function cc(e, t, ...r) {
  switch (t) {
    case "HS256":
    case "HS384":
    case "HS512": {
      if (!Le(e.algorithm, "HMAC"))
        throw te("HMAC");
      const n = parseInt(t.slice(2), 10);
      if (Lt(e.algorithm.hash) !== n)
        throw te(`SHA-${n}`, "algorithm.hash");
      break;
    }
    case "RS256":
    case "RS384":
    case "RS512": {
      if (!Le(e.algorithm, "RSASSA-PKCS1-v1_5"))
        throw te("RSASSA-PKCS1-v1_5");
      const n = parseInt(t.slice(2), 10);
      if (Lt(e.algorithm.hash) !== n)
        throw te(`SHA-${n}`, "algorithm.hash");
      break;
    }
    case "PS256":
    case "PS384":
    case "PS512": {
      if (!Le(e.algorithm, "RSA-PSS"))
        throw te("RSA-PSS");
      const n = parseInt(t.slice(2), 10);
      if (Lt(e.algorithm.hash) !== n)
        throw te(`SHA-${n}`, "algorithm.hash");
      break;
    }
    case "EdDSA": {
      if (e.algorithm.name !== "Ed25519" && e.algorithm.name !== "Ed448")
        throw te("Ed25519 or Ed448");
      break;
    }
    case "ES256":
    case "ES384":
    case "ES512": {
      if (!Le(e.algorithm, "ECDSA"))
        throw te("ECDSA");
      const n = oc(t);
      if (e.algorithm.namedCurve !== n)
        throw te(n, "algorithm.namedCurve");
      break;
    }
    default:
      throw new TypeError("CryptoKey does not support this operation");
  }
  wi(e, r);
}
function He(e, t, ...r) {
  switch (t) {
    case "A128GCM":
    case "A192GCM":
    case "A256GCM": {
      if (!Le(e.algorithm, "AES-GCM"))
        throw te("AES-GCM");
      const n = parseInt(t.slice(1, 4), 10);
      if (e.algorithm.length !== n)
        throw te(n, "algorithm.length");
      break;
    }
    case "A128KW":
    case "A192KW":
    case "A256KW": {
      if (!Le(e.algorithm, "AES-KW"))
        throw te("AES-KW");
      const n = parseInt(t.slice(1, 4), 10);
      if (e.algorithm.length !== n)
        throw te(n, "algorithm.length");
      break;
    }
    case "ECDH": {
      switch (e.algorithm.name) {
        case "ECDH":
        case "X25519":
        case "X448":
          break;
        default:
          throw te("ECDH, X25519, or X448");
      }
      break;
    }
    case "PBES2-HS256+A128KW":
    case "PBES2-HS384+A192KW":
    case "PBES2-HS512+A256KW":
      if (!Le(e.algorithm, "PBKDF2"))
        throw te("PBKDF2");
      break;
    case "RSA-OAEP":
    case "RSA-OAEP-256":
    case "RSA-OAEP-384":
    case "RSA-OAEP-512": {
      if (!Le(e.algorithm, "RSA-OAEP"))
        throw te("RSA-OAEP");
      const n = parseInt(t.slice(9), 10) || 1;
      if (Lt(e.algorithm.hash) !== n)
        throw te(`SHA-${n}`, "algorithm.hash");
      break;
    }
    default:
      throw new TypeError("CryptoKey does not support this operation");
  }
  wi(e, r);
}
function bi(e, t, ...r) {
  var n;
  if (r = r.filter(Boolean), r.length > 2) {
    const s = r.pop();
    e += `one of type ${r.join(", ")}, or ${s}.`;
  } else r.length === 2 ? e += `one of type ${r[0]} or ${r[1]}.` : e += `of type ${r[0]}.`;
  return t == null ? e += ` Received ${t}` : typeof t == "function" && t.name ? e += ` Received function ${t.name}` : typeof t == "object" && t != null && (n = t.constructor) != null && n.name && (e += ` Received an instance of ${t.constructor.name}`), e;
}
const se = (e, ...t) => bi("Key must be ", e, ...t);
function Si(e, t, ...r) {
  return bi(`Key for the ${e} algorithm must be `, t, ...r);
}
const Ai = (e) => le(e) ? !0 : (e == null ? void 0 : e[Symbol.toStringTag]) === "KeyObject", ae = ["CryptoKey"];
async function uc(e, t, r, n, s, i) {
  if (!(t instanceof Uint8Array))
    throw new TypeError(se(t, "Uint8Array"));
  const a = parseInt(e.slice(1, 4), 10), o = await M.subtle.importKey("raw", t.subarray(a >> 3), "AES-CBC", !1, ["decrypt"]), c = await M.subtle.importKey("raw", t.subarray(0, a >> 3), {
    hash: `SHA-${a << 1}`,
    name: "HMAC"
  }, !1, ["sign"]), u = Ae(i, n, r, pi(i.length << 3)), d = new Uint8Array((await M.subtle.sign("HMAC", c, u)).slice(0, a >> 3));
  let p;
  try {
    p = ic(s, d);
  } catch {
  }
  if (!p)
    throw new Wt();
  let w;
  try {
    w = new Uint8Array(await M.subtle.decrypt({ iv: n, name: "AES-CBC" }, o, r));
  } catch {
  }
  if (!w)
    throw new Wt();
  return w;
}
async function lc(e, t, r, n, s, i) {
  let a;
  t instanceof Uint8Array ? a = await M.subtle.importKey("raw", t, "AES-GCM", !1, ["decrypt"]) : (He(t, e, "decrypt"), a = t);
  try {
    return new Uint8Array(await M.subtle.decrypt({
      additionalData: i,
      iv: n,
      name: "AES-GCM",
      tagLength: 128
    }, a, Ae(r, s)));
  } catch {
    throw new Wt();
  }
}
const Ri = async (e, t, r, n, s, i) => {
  if (!le(t) && !(t instanceof Uint8Array))
    throw new TypeError(se(t, ...ae, "Uint8Array"));
  if (!n)
    throw new N("JWE Initialization Vector missing");
  if (!s)
    throw new N("JWE Authentication Tag missing");
  switch (Ei(e, n), e) {
    case "A128CBC-HS256":
    case "A192CBC-HS384":
    case "A256CBC-HS512":
      return t instanceof Uint8Array && $t(t, parseInt(e.slice(-3), 10)), uc(e, t, r, n, s, i);
    case "A128GCM":
    case "A192GCM":
    case "A256GCM":
      return t instanceof Uint8Array && $t(t, parseInt(e.slice(1, 4), 10)), lc(e, t, r, n, s, i);
    default:
      throw new z("Unsupported JWE Content Encryption Algorithm");
  }
}, es = (...e) => {
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
    for (const i of s) {
      if (r.has(i))
        return !1;
      r.add(i);
    }
  }
  return !0;
};
function dc(e) {
  return typeof e == "object" && e !== null;
}
function ue(e) {
  if (!dc(e) || Object.prototype.toString.call(e) !== "[object Object]")
    return !1;
  if (Object.getPrototypeOf(e) === null)
    return !0;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t;
}
const Xt = [
  { hash: "SHA-256", name: "HMAC" },
  !0,
  ["sign"]
];
function vi(e, t) {
  if (e.algorithm.length !== parseInt(t.slice(1, 4), 10))
    throw new TypeError(`Invalid key size for alg: ${t}`);
}
function Ti(e, t, r) {
  if (le(e))
    return He(e, t, r), e;
  if (e instanceof Uint8Array)
    return M.subtle.importKey("raw", e, "AES-KW", !0, [r]);
  throw new TypeError(se(e, ...ae, "Uint8Array"));
}
const xn = async (e, t, r) => {
  const n = await Ti(t, e, "wrapKey");
  vi(n, e);
  const s = await M.subtle.importKey("raw", r, ...Xt);
  return new Uint8Array(await M.subtle.wrapKey("raw", s, n, "AES-KW"));
}, Nn = async (e, t, r) => {
  const n = await Ti(t, e, "unwrapKey");
  vi(n, e);
  const s = await M.subtle.unwrapKey("raw", r, n, "AES-KW", ...Xt);
  return new Uint8Array(await M.subtle.exportKey("raw", s));
};
async function Pi(e, t, r, n, s = new Uint8Array(0), i = new Uint8Array(0)) {
  if (!le(e))
    throw new TypeError(se(e, ...ae));
  if (He(e, "ECDH"), !le(t))
    throw new TypeError(se(t, ...ae));
  He(t, "ECDH", "deriveBits");
  const a = Ae(zr(ne.encode(r)), zr(s), zr(i), zn(n));
  let o;
  e.algorithm.name === "X25519" ? o = 256 : e.algorithm.name === "X448" ? o = 448 : o = Math.ceil(parseInt(e.algorithm.namedCurve.substr(-3), 10) / 8) << 3;
  const c = new Uint8Array(await M.subtle.deriveBits({
    name: e.algorithm.name,
    public: e
  }, t, o));
  return tc(c, n, a);
}
async function fc(e) {
  if (!le(e))
    throw new TypeError(se(e, ...ae));
  return M.subtle.generateKey(e.algorithm, !0, ["deriveBits"]);
}
function Oi(e) {
  if (!le(e))
    throw new TypeError(se(e, ...ae));
  return ["P-256", "P-384", "P-521"].includes(e.algorithm.namedCurve) || e.algorithm.name === "X25519" || e.algorithm.name === "X448";
}
function hc(e) {
  if (!(e instanceof Uint8Array) || e.length < 8)
    throw new N("PBES2 Salt Input must be 8 or more octets");
}
function pc(e, t) {
  if (e instanceof Uint8Array)
    return M.subtle.importKey("raw", e, "PBKDF2", !1, ["deriveBits"]);
  if (le(e))
    return He(e, t, "deriveBits", "deriveKey"), e;
  throw new TypeError(se(e, ...ae, "Uint8Array"));
}
async function Ci(e, t, r, n) {
  hc(e);
  const s = ec(t, e), i = parseInt(t.slice(13, 16), 10), a = {
    hash: `SHA-${t.slice(8, 11)}`,
    iterations: r,
    name: "PBKDF2",
    salt: s
  }, o = {
    length: i,
    name: "AES-KW"
  }, c = await pc(n, t);
  if (c.usages.includes("deriveBits"))
    return new Uint8Array(await M.subtle.deriveBits(a, c, i));
  if (c.usages.includes("deriveKey"))
    return M.subtle.deriveKey(a, c, o, !1, ["wrapKey", "unwrapKey"]);
  throw new TypeError('PBKDF2 key "usages" must include "deriveBits" or "deriveKey"');
}
const mc = async (e, t, r, n = 2048, s = Qn(new Uint8Array(16))) => {
  const i = await Ci(s, e, n, t);
  return { encryptedKey: await xn(e.slice(-6), i, r), p2c: n, p2s: ce(s) };
}, gc = async (e, t, r, n, s) => {
  const i = await Ci(s, e, n, t);
  return Nn(e.slice(-6), i, r);
};
function Kt(e) {
  switch (e) {
    case "RSA-OAEP":
    case "RSA-OAEP-256":
    case "RSA-OAEP-384":
    case "RSA-OAEP-512":
      return "RSA-OAEP";
    default:
      throw new z(`alg ${e} is not supported either by JOSE or your javascript runtime`);
  }
}
const ts = (e, t) => {
  if (e.startsWith("RS") || e.startsWith("PS")) {
    const { modulusLength: r } = t.algorithm;
    if (typeof r != "number" || r < 2048)
      throw new TypeError(`${e} requires key modulusLength to be 2048 bits or larger`);
  }
}, _c = async (e, t, r) => {
  if (!le(t))
    throw new TypeError(se(t, ...ae));
  if (He(t, e, "encrypt", "wrapKey"), ts(e, t), t.usages.includes("encrypt"))
    return new Uint8Array(await M.subtle.encrypt(Kt(e), t, r));
  if (t.usages.includes("wrapKey")) {
    const n = await M.subtle.importKey("raw", r, ...Xt);
    return new Uint8Array(await M.subtle.wrapKey("raw", n, t, Kt(e)));
  }
  throw new TypeError('RSA-OAEP key "usages" must include "encrypt" or "wrapKey" for this operation');
}, yc = async (e, t, r) => {
  if (!le(t))
    throw new TypeError(se(t, ...ae));
  if (He(t, e, "decrypt", "unwrapKey"), ts(e, t), t.usages.includes("decrypt"))
    return new Uint8Array(await M.subtle.decrypt(Kt(e), t, r));
  if (t.usages.includes("unwrapKey")) {
    const n = await M.subtle.unwrapKey("raw", r, t, Kt(e), ...Xt);
    return new Uint8Array(await M.subtle.exportKey("raw", n));
  }
  throw new TypeError('RSA-OAEP key "usages" must include "decrypt" or "unwrapKey" for this operation');
};
function mt(e) {
  return ue(e) && typeof e.kty == "string";
}
function Ec(e) {
  return e.kty !== "oct" && typeof e.d == "string";
}
function wc(e) {
  return e.kty !== "oct" && typeof e.d > "u";
}
function bc(e) {
  return mt(e) && e.kty === "oct" && typeof e.k == "string";
}
function Sc(e) {
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
          throw new z('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
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
          throw new z('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
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
          throw new z('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    default:
      throw new z('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
  }
  return { algorithm: t, keyUsages: r };
}
const Ii = async (e) => {
  if (!e.alg)
    throw new TypeError('"alg" argument is required when "jwk.alg" is not present');
  const { algorithm: t, keyUsages: r } = Sc(e), n = [
    t,
    e.ext ?? !1,
    e.key_ops ?? r
  ], s = { ...e };
  return delete s.alg, delete s.use, M.subtle.importKey("jwk", s, ...n);
}, xi = (e) => Q(e);
let it, ot;
const Ni = (e) => (e == null ? void 0 : e[Symbol.toStringTag]) === "KeyObject", jt = async (e, t, r, n, s = !1) => {
  let i = e.get(t);
  if (i != null && i[n])
    return i[n];
  const a = await Ii({ ...r, alg: n });
  return s && Object.freeze(t), i ? i[n] = a : e.set(t, { [n]: a }), a;
}, Ac = (e, t) => {
  if (Ni(e)) {
    let r = e.export({ format: "jwk" });
    return delete r.d, delete r.dp, delete r.dq, delete r.p, delete r.q, delete r.qi, r.k ? xi(r.k) : (ot || (ot = /* @__PURE__ */ new WeakMap()), jt(ot, e, r, t));
  }
  return mt(e) ? e.k ? Q(e.k) : (ot || (ot = /* @__PURE__ */ new WeakMap()), jt(ot, e, e, t, !0)) : e;
}, Rc = (e, t) => {
  if (Ni(e)) {
    let r = e.export({ format: "jwk" });
    return r.k ? xi(r.k) : (it || (it = /* @__PURE__ */ new WeakMap()), jt(it, e, r, t));
  }
  return mt(e) ? e.k ? Q(e.k) : (it || (it = /* @__PURE__ */ new WeakMap()), jt(it, e, e, t, !0)) : e;
}, Xe = { normalizePublicKey: Ac, normalizePrivateKey: Rc };
function rs(e) {
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
      throw new z(`Unsupported JWE Algorithm: ${e}`);
  }
}
const ct = (e) => Qn(new Uint8Array(rs(e) >> 3)), ke = (e, t, r = 0) => {
  r === 0 && (t.unshift(t.length), t.unshift(6));
  const n = e.indexOf(t[0], r);
  if (n === -1)
    return !1;
  const s = e.subarray(n, n + t.length);
  return s.length !== t.length ? !1 : s.every((i, a) => i === t[a]) || ke(e, t, n + 1);
}, Ra = (e) => {
  switch (!0) {
    case ke(e, [42, 134, 72, 206, 61, 3, 1, 7]):
      return "P-256";
    case ke(e, [43, 129, 4, 0, 34]):
      return "P-384";
    case ke(e, [43, 129, 4, 0, 35]):
      return "P-521";
    case ke(e, [43, 101, 110]):
      return "X25519";
    case ke(e, [43, 101, 111]):
      return "X448";
    case ke(e, [43, 101, 112]):
      return "Ed25519";
    case ke(e, [43, 101, 113]):
      return "Ed448";
    default:
      throw new z("Invalid or unsupported EC Key Curve or OKP Key Sub Type");
  }
}, vc = async (e, t, r, n, s) => {
  let i, a;
  const o = new Uint8Array(atob(r.replace(e, "")).split("").map((c) => c.charCodeAt(0)));
  switch (n) {
    case "PS256":
    case "PS384":
    case "PS512":
      i = { name: "RSA-PSS", hash: `SHA-${n.slice(-3)}` }, a = ["sign"];
      break;
    case "RS256":
    case "RS384":
    case "RS512":
      i = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${n.slice(-3)}` }, a = ["sign"];
      break;
    case "RSA-OAEP":
    case "RSA-OAEP-256":
    case "RSA-OAEP-384":
    case "RSA-OAEP-512":
      i = {
        name: "RSA-OAEP",
        hash: `SHA-${parseInt(n.slice(-3), 10) || 1}`
      }, a = ["decrypt", "unwrapKey"];
      break;
    case "ES256":
      i = { name: "ECDSA", namedCurve: "P-256" }, a = ["sign"];
      break;
    case "ES384":
      i = { name: "ECDSA", namedCurve: "P-384" }, a = ["sign"];
      break;
    case "ES512":
      i = { name: "ECDSA", namedCurve: "P-521" }, a = ["sign"];
      break;
    case "ECDH-ES":
    case "ECDH-ES+A128KW":
    case "ECDH-ES+A192KW":
    case "ECDH-ES+A256KW": {
      const c = Ra(o);
      i = c.startsWith("P-") ? { name: "ECDH", namedCurve: c } : { name: c }, a = ["deriveBits"];
      break;
    }
    case "EdDSA":
      i = { name: Ra(o) }, a = ["sign"];
      break;
    default:
      throw new z('Invalid or unsupported "alg" (Algorithm) value');
  }
  return M.subtle.importKey(t, o, i, !1, a);
}, Tc = (e, t, r) => vc(/(?:-----(?:BEGIN|END) PRIVATE KEY-----|\s)/g, "pkcs8", e, t);
async function Pc(e, t, r) {
  if (typeof e != "string" || e.indexOf("-----BEGIN PRIVATE KEY-----") !== 0)
    throw new TypeError('"pkcs8" must be PKCS#8 formatted string');
  return Tc(e, t);
}
async function ns(e, t) {
  if (!ue(e))
    throw new TypeError("JWK must be an object");
  switch (t || (t = e.alg), e.kty) {
    case "oct":
      if (typeof e.k != "string" || !e.k)
        throw new TypeError('missing "k" (Key Value) Parameter value');
      return Q(e.k);
    case "RSA":
      if (e.oth !== void 0)
        throw new z('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
    case "EC":
    case "OKP":
      return Ii({ ...e, alg: t });
    default:
      throw new z('Unsupported "kty" (Key Type) Parameter value');
  }
}
const ut = (e) => e == null ? void 0 : e[Symbol.toStringTag], kn = (e, t, r) => {
  var n, s;
  if (t.use !== void 0 && t.use !== "sig")
    throw new TypeError("Invalid key for this operation, when present its use must be sig");
  if (t.key_ops !== void 0 && ((s = (n = t.key_ops).includes) == null ? void 0 : s.call(n, r)) !== !0)
    throw new TypeError(`Invalid key for this operation, when present its key_ops must include ${r}`);
  if (t.alg !== void 0 && t.alg !== e)
    throw new TypeError(`Invalid key for this operation, when present its alg must be ${e}`);
  return !0;
}, Oc = (e, t, r, n) => {
  if (!(t instanceof Uint8Array)) {
    if (n && mt(t)) {
      if (bc(t) && kn(e, t, r))
        return;
      throw new TypeError('JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present');
    }
    if (!Ai(t))
      throw new TypeError(Si(e, t, ...ae, "Uint8Array", n ? "JSON Web Key" : null));
    if (t.type !== "secret")
      throw new TypeError(`${ut(t)} instances for symmetric algorithms must be of type "secret"`);
  }
}, Cc = (e, t, r, n) => {
  if (n && mt(t))
    switch (r) {
      case "sign":
        if (Ec(t) && kn(e, t, r))
          return;
        throw new TypeError("JSON Web Key for this operation be a private JWK");
      case "verify":
        if (wc(t) && kn(e, t, r))
          return;
        throw new TypeError("JSON Web Key for this operation be a public JWK");
    }
  if (!Ai(t))
    throw new TypeError(Si(e, t, ...ae, n ? "JSON Web Key" : null));
  if (t.type === "secret")
    throw new TypeError(`${ut(t)} instances for asymmetric algorithms must not be of type "secret"`);
  if (r === "sign" && t.type === "public")
    throw new TypeError(`${ut(t)} instances for asymmetric algorithm signing must be of type "private"`);
  if (r === "decrypt" && t.type === "public")
    throw new TypeError(`${ut(t)} instances for asymmetric algorithm decryption must be of type "private"`);
  if (t.algorithm && r === "verify" && t.type === "private")
    throw new TypeError(`${ut(t)} instances for asymmetric algorithm verifying must be of type "public"`);
  if (t.algorithm && r === "encrypt" && t.type === "private")
    throw new TypeError(`${ut(t)} instances for asymmetric algorithm encryption must be of type "public"`);
};
function ki(e, t, r, n) {
  t.startsWith("HS") || t === "dir" || t.startsWith("PBES2") || /^A\d{3}(?:GCM)?KW$/.test(t) ? Oc(t, r, n, e) : Cc(t, r, n, e);
}
const Di = ki.bind(void 0, !1), va = ki.bind(void 0, !0);
async function Ic(e, t, r, n, s) {
  if (!(r instanceof Uint8Array))
    throw new TypeError(se(r, "Uint8Array"));
  const i = parseInt(e.slice(1, 4), 10), a = await M.subtle.importKey("raw", r.subarray(i >> 3), "AES-CBC", !1, ["encrypt"]), o = await M.subtle.importKey("raw", r.subarray(0, i >> 3), {
    hash: `SHA-${i << 1}`,
    name: "HMAC"
  }, !1, ["sign"]), c = new Uint8Array(await M.subtle.encrypt({
    iv: n,
    name: "AES-CBC"
  }, a, t)), u = Ae(s, n, c, pi(s.length << 3)), d = new Uint8Array((await M.subtle.sign("HMAC", o, u)).slice(0, i >> 3));
  return { ciphertext: c, tag: d, iv: n };
}
async function xc(e, t, r, n, s) {
  let i;
  r instanceof Uint8Array ? i = await M.subtle.importKey("raw", r, "AES-GCM", !1, ["encrypt"]) : (He(r, e, "encrypt"), i = r);
  const a = new Uint8Array(await M.subtle.encrypt({
    additionalData: s,
    iv: n,
    name: "AES-GCM",
    tagLength: 128
  }, i, t)), o = a.slice(-16);
  return { ciphertext: a.slice(0, -16), tag: o, iv: n };
}
const Ui = async (e, t, r, n, s) => {
  if (!le(r) && !(r instanceof Uint8Array))
    throw new TypeError(se(r, ...ae, "Uint8Array"));
  switch (n ? Ei(e, n) : n = ac(e), e) {
    case "A128CBC-HS256":
    case "A192CBC-HS384":
    case "A256CBC-HS512":
      return r instanceof Uint8Array && $t(r, parseInt(e.slice(-3), 10)), Ic(e, t, r, n, s);
    case "A128GCM":
    case "A192GCM":
    case "A256GCM":
      return r instanceof Uint8Array && $t(r, parseInt(e.slice(1, 4), 10)), xc(e, t, r, n, s);
    default:
      throw new z("Unsupported JWE Content Encryption Algorithm");
  }
};
async function Nc(e, t, r, n) {
  const s = e.slice(0, 7), i = await Ui(s, r, t, n, new Uint8Array(0));
  return {
    encryptedKey: i.ciphertext,
    iv: ce(i.iv),
    tag: ce(i.tag)
  };
}
async function kc(e, t, r, n, s) {
  const i = e.slice(0, 7);
  return Ri(i, t, r, n, s, new Uint8Array(0));
}
async function Dc(e, t, r, n, s) {
  var i;
  switch (Di(e, t, "decrypt"), t = await ((i = Xe.normalizePrivateKey) == null ? void 0 : i.call(Xe, t, e)) || t, e) {
    case "dir": {
      if (r !== void 0)
        throw new N("Encountered unexpected JWE Encrypted Key");
      return t;
    }
    case "ECDH-ES":
      if (r !== void 0)
        throw new N("Encountered unexpected JWE Encrypted Key");
    case "ECDH-ES+A128KW":
    case "ECDH-ES+A192KW":
    case "ECDH-ES+A256KW": {
      if (!ue(n.epk))
        throw new N('JOSE Header "epk" (Ephemeral Public Key) missing or invalid');
      if (!Oi(t))
        throw new z("ECDH with the provided key is not allowed or not supported by your javascript runtime");
      const a = await ns(n.epk, e);
      let o, c;
      if (n.apu !== void 0) {
        if (typeof n.apu != "string")
          throw new N('JOSE Header "apu" (Agreement PartyUInfo) invalid');
        try {
          o = Q(n.apu);
        } catch {
          throw new N("Failed to base64url decode the apu");
        }
      }
      if (n.apv !== void 0) {
        if (typeof n.apv != "string")
          throw new N('JOSE Header "apv" (Agreement PartyVInfo) invalid');
        try {
          c = Q(n.apv);
        } catch {
          throw new N("Failed to base64url decode the apv");
        }
      }
      const u = await Pi(a, t, e === "ECDH-ES" ? n.enc : e, e === "ECDH-ES" ? rs(n.enc) : parseInt(e.slice(-5, -2), 10), o, c);
      if (e === "ECDH-ES")
        return u;
      if (r === void 0)
        throw new N("JWE Encrypted Key missing");
      return Nn(e.slice(-6), u, r);
    }
    case "RSA1_5":
    case "RSA-OAEP":
    case "RSA-OAEP-256":
    case "RSA-OAEP-384":
    case "RSA-OAEP-512": {
      if (r === void 0)
        throw new N("JWE Encrypted Key missing");
      return yc(e, t, r);
    }
    case "PBES2-HS256+A128KW":
    case "PBES2-HS384+A192KW":
    case "PBES2-HS512+A256KW": {
      if (r === void 0)
        throw new N("JWE Encrypted Key missing");
      if (typeof n.p2c != "number")
        throw new N('JOSE Header "p2c" (PBES2 Count) missing or invalid');
      const a = (s == null ? void 0 : s.maxPBES2Count) || 1e4;
      if (n.p2c > a)
        throw new N('JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds');
      if (typeof n.p2s != "string")
        throw new N('JOSE Header "p2s" (PBES2 Salt) missing or invalid');
      let o;
      try {
        o = Q(n.p2s);
      } catch {
        throw new N("Failed to base64url decode the p2s");
      }
      return gc(e, t, r, n.p2c, o);
    }
    case "A128KW":
    case "A192KW":
    case "A256KW": {
      if (r === void 0)
        throw new N("JWE Encrypted Key missing");
      return Nn(e, t, r);
    }
    case "A128GCMKW":
    case "A192GCMKW":
    case "A256GCMKW": {
      if (r === void 0)
        throw new N("JWE Encrypted Key missing");
      if (typeof n.iv != "string")
        throw new N('JOSE Header "iv" (Initialization Vector) missing or invalid');
      if (typeof n.tag != "string")
        throw new N('JOSE Header "tag" (Authentication Tag) missing or invalid');
      let a;
      try {
        a = Q(n.iv);
      } catch {
        throw new N("Failed to base64url decode the iv");
      }
      let o;
      try {
        o = Q(n.tag);
      } catch {
        throw new N("Failed to base64url decode the tag");
      }
      return kc(e, t, r, a, o);
    }
    default:
      throw new z('Invalid or unsupported "alg" (JWE Algorithm) header value');
  }
}
function ss(e, t, r, n, s) {
  if (s.crit !== void 0 && (n == null ? void 0 : n.crit) === void 0)
    throw new e('"crit" (Critical) Header Parameter MUST be integrity protected');
  if (!n || n.crit === void 0)
    return /* @__PURE__ */ new Set();
  if (!Array.isArray(n.crit) || n.crit.length === 0 || n.crit.some((a) => typeof a != "string" || a.length === 0))
    throw new e('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
  let i;
  r !== void 0 ? i = new Map([...Object.entries(r), ...t.entries()]) : i = t;
  for (const a of n.crit) {
    if (!i.has(a))
      throw new z(`Extension Header Parameter "${a}" is not recognized`);
    if (s[a] === void 0)
      throw new e(`Extension Header Parameter "${a}" is missing`);
    if (i.get(a) && n[a] === void 0)
      throw new e(`Extension Header Parameter "${a}" MUST be integrity protected`);
  }
  return new Set(n.crit);
}
const Dn = (e, t) => {
  if (t !== void 0 && (!Array.isArray(t) || t.some((r) => typeof r != "string")))
    throw new TypeError(`"${e}" option must be an array of strings`);
  if (t)
    return new Set(t);
};
async function Uc(e, t, r) {
  if (!ue(e))
    throw new N("Flattened JWE must be an object");
  if (e.protected === void 0 && e.header === void 0 && e.unprotected === void 0)
    throw new N("JOSE Header missing");
  if (e.iv !== void 0 && typeof e.iv != "string")
    throw new N("JWE Initialization Vector incorrect type");
  if (typeof e.ciphertext != "string")
    throw new N("JWE Ciphertext missing or incorrect type");
  if (e.tag !== void 0 && typeof e.tag != "string")
    throw new N("JWE Authentication Tag incorrect type");
  if (e.protected !== void 0 && typeof e.protected != "string")
    throw new N("JWE Protected Header incorrect type");
  if (e.encrypted_key !== void 0 && typeof e.encrypted_key != "string")
    throw new N("JWE Encrypted Key incorrect type");
  if (e.aad !== void 0 && typeof e.aad != "string")
    throw new N("JWE AAD incorrect type");
  if (e.header !== void 0 && !ue(e.header))
    throw new N("JWE Shared Unprotected Header incorrect type");
  if (e.unprotected !== void 0 && !ue(e.unprotected))
    throw new N("JWE Per-Recipient Unprotected Header incorrect type");
  let n;
  if (e.protected)
    try {
      const l = Q(e.protected);
      n = JSON.parse(Ze.decode(l));
    } catch {
      throw new N("JWE Protected Header is invalid");
    }
  if (!es(n, e.header, e.unprotected))
    throw new N("JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint");
  const s = {
    ...n,
    ...e.header,
    ...e.unprotected
  };
  if (ss(N, /* @__PURE__ */ new Map(), r == null ? void 0 : r.crit, n, s), s.zip !== void 0)
    throw new z('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
  const { alg: i, enc: a } = s;
  if (typeof i != "string" || !i)
    throw new N("missing JWE Algorithm (alg) in JWE Header");
  if (typeof a != "string" || !a)
    throw new N("missing JWE Encryption Algorithm (enc) in JWE Header");
  const o = r && Dn("keyManagementAlgorithms", r.keyManagementAlgorithms), c = r && Dn("contentEncryptionAlgorithms", r.contentEncryptionAlgorithms);
  if (o && !o.has(i) || !o && i.startsWith("PBES2"))
    throw new qt('"alg" (Algorithm) Header Parameter value not allowed');
  if (c && !c.has(a))
    throw new qt('"enc" (Encryption Algorithm) Header Parameter value not allowed');
  let u;
  if (e.encrypted_key !== void 0)
    try {
      u = Q(e.encrypted_key);
    } catch {
      throw new N("Failed to base64url decode the encrypted_key");
    }
  let d = !1;
  typeof t == "function" && (t = await t(n, e), d = !0);
  let p;
  try {
    p = await Dc(i, t, u, s, r);
  } catch (l) {
    if (l instanceof TypeError || l instanceof N || l instanceof z)
      throw l;
    p = ct(a);
  }
  let w, b;
  if (e.iv !== void 0)
    try {
      w = Q(e.iv);
    } catch {
      throw new N("Failed to base64url decode the iv");
    }
  if (e.tag !== void 0)
    try {
      b = Q(e.tag);
    } catch {
      throw new N("Failed to base64url decode the tag");
    }
  const S = ne.encode(e.protected ?? "");
  let R;
  e.aad !== void 0 ? R = Ae(S, ne.encode("."), ne.encode(e.aad)) : R = S;
  let g;
  try {
    g = Q(e.ciphertext);
  } catch {
    throw new N("Failed to base64url decode the ciphertext");
  }
  const h = { plaintext: await Ri(a, p, g, w, b, R) };
  if (e.protected !== void 0 && (h.protectedHeader = n), e.aad !== void 0)
    try {
      h.additionalAuthenticatedData = Q(e.aad);
    } catch {
      throw new N("Failed to base64url decode the aad");
    }
  return e.unprotected !== void 0 && (h.sharedUnprotectedHeader = e.unprotected), e.header !== void 0 && (h.unprotectedHeader = e.header), d ? { ...h, key: t } : h;
}
async function Lc(e, t, r) {
  if (e instanceof Uint8Array && (e = Ze.decode(e)), typeof e != "string")
    throw new N("Compact JWE must be a string or Uint8Array");
  const { 0: n, 1: s, 2: i, 3: a, 4: o, length: c } = e.split(".");
  if (c !== 5)
    throw new N("Invalid Compact JWE");
  const u = await Uc({
    ciphertext: a,
    iv: i || void 0,
    protected: n,
    tag: o || void 0,
    encrypted_key: s || void 0
  }, t, r), d = { plaintext: u.plaintext, protectedHeader: u.protectedHeader };
  return typeof t == "function" ? { ...d, key: u.key } : d;
}
const Hc = Symbol(), Mc = async (e) => {
  if (e instanceof Uint8Array)
    return {
      kty: "oct",
      k: ce(e)
    };
  if (!le(e))
    throw new TypeError(se(e, ...ae, "Uint8Array"));
  if (!e.extractable)
    throw new TypeError("non-extractable CryptoKey cannot be exported as a JWK");
  const { ext: t, key_ops: r, alg: n, use: s, ...i } = await M.subtle.exportKey("jwk", e);
  return i;
};
async function qc(e) {
  return Mc(e);
}
async function Wc(e, t, r, n, s = {}) {
  var c;
  let i, a, o;
  switch (Di(e, r, "encrypt"), r = await ((c = Xe.normalizePublicKey) == null ? void 0 : c.call(Xe, r, e)) || r, e) {
    case "dir": {
      o = r;
      break;
    }
    case "ECDH-ES":
    case "ECDH-ES+A128KW":
    case "ECDH-ES+A192KW":
    case "ECDH-ES+A256KW": {
      if (!Oi(r))
        throw new z("ECDH with the provided key is not allowed or not supported by your javascript runtime");
      const { apu: u, apv: d } = s;
      let { epk: p } = s;
      p || (p = (await fc(r)).privateKey);
      const { x: w, y: b, crv: S, kty: R } = await qc(p), g = await Pi(r, p, e === "ECDH-ES" ? t : e, e === "ECDH-ES" ? rs(t) : parseInt(e.slice(-5, -2), 10), u, d);
      if (a = { epk: { x: w, crv: S, kty: R } }, R === "EC" && (a.epk.y = b), u && (a.apu = ce(u)), d && (a.apv = ce(d)), e === "ECDH-ES") {
        o = g;
        break;
      }
      o = n || ct(t);
      const y = e.slice(-6);
      i = await xn(y, g, o);
      break;
    }
    case "RSA1_5":
    case "RSA-OAEP":
    case "RSA-OAEP-256":
    case "RSA-OAEP-384":
    case "RSA-OAEP-512": {
      o = n || ct(t), i = await _c(e, r, o);
      break;
    }
    case "PBES2-HS256+A128KW":
    case "PBES2-HS384+A192KW":
    case "PBES2-HS512+A256KW": {
      o = n || ct(t);
      const { p2c: u, p2s: d } = s;
      ({ encryptedKey: i, ...a } = await mc(e, r, o, u, d));
      break;
    }
    case "A128KW":
    case "A192KW":
    case "A256KW": {
      o = n || ct(t), i = await xn(e, r, o);
      break;
    }
    case "A128GCMKW":
    case "A192GCMKW":
    case "A256GCMKW": {
      o = n || ct(t);
      const { iv: u } = s;
      ({ encryptedKey: i, ...a } = await Nc(e, r, o, u));
      break;
    }
    default:
      throw new z('Invalid or unsupported "alg" (JWE Algorithm) header value');
  }
  return { cek: o, encryptedKey: i, parameters: a };
}
class $c {
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
      throw new N("either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()");
    if (!es(this._protectedHeader, this._unprotectedHeader, this._sharedUnprotectedHeader))
      throw new N("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
    const n = {
      ...this._protectedHeader,
      ...this._unprotectedHeader,
      ...this._sharedUnprotectedHeader
    };
    if (ss(N, /* @__PURE__ */ new Map(), r == null ? void 0 : r.crit, this._protectedHeader, n), n.zip !== void 0)
      throw new z('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
    const { alg: s, enc: i } = n;
    if (typeof s != "string" || !s)
      throw new N('JWE "alg" (Algorithm) Header Parameter missing or invalid');
    if (typeof i != "string" || !i)
      throw new N('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
    let a;
    if (this._cek && (s === "dir" || s === "ECDH-ES"))
      throw new TypeError(`setContentEncryptionKey cannot be called with JWE "alg" (Algorithm) Header ${s}`);
    let o;
    {
      let R;
      ({ cek: o, encryptedKey: a, parameters: R } = await Wc(s, i, t, this._cek, this._keyManagementParameters)), R && (r && Hc in r ? this._unprotectedHeader ? this._unprotectedHeader = { ...this._unprotectedHeader, ...R } : this.setUnprotectedHeader(R) : this._protectedHeader ? this._protectedHeader = { ...this._protectedHeader, ...R } : this.setProtectedHeader(R));
    }
    let c, u, d;
    this._protectedHeader ? u = ne.encode(ce(JSON.stringify(this._protectedHeader))) : u = ne.encode(""), this._aad ? (d = ce(this._aad), c = Ae(u, ne.encode("."), ne.encode(d))) : c = u;
    const { ciphertext: p, tag: w, iv: b } = await Ui(i, this._plaintext, o, this._iv, c), S = {
      ciphertext: ce(p)
    };
    return b && (S.iv = ce(b)), w && (S.tag = ce(w)), a && (S.encrypted_key = ce(a)), d && (S.aad = d), this._protectedHeader && (S.protected = Ze.decode(u)), this._sharedUnprotectedHeader && (S.unprotected = this._sharedUnprotectedHeader), this._unprotectedHeader && (S.header = this._unprotectedHeader), S;
  }
}
function Kc(e, t) {
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
      throw new z(`alg ${e} is not supported either by JOSE or your javascript runtime`);
  }
}
async function jc(e, t, r) {
  if (t = await Xe.normalizePublicKey(t, e), le(t))
    return cc(t, e, r), t;
  if (t instanceof Uint8Array) {
    if (!e.startsWith("HS"))
      throw new TypeError(se(t, ...ae));
    return M.subtle.importKey("raw", t, { hash: `SHA-${e.slice(-3)}`, name: "HMAC" }, !1, [r]);
  }
  throw new TypeError(se(t, ...ae, "Uint8Array", "JSON Web Key"));
}
const Jc = async (e, t, r, n) => {
  const s = await jc(e, t, "verify");
  ts(e, s);
  const i = Kc(e, s.algorithm);
  try {
    return await M.subtle.verify(i, s, r, n);
  } catch {
    return !1;
  }
};
async function Li(e, t, r) {
  if (!ue(e))
    throw new Z("Flattened JWS must be an object");
  if (e.protected === void 0 && e.header === void 0)
    throw new Z('Flattened JWS must have either of the "protected" or "header" members');
  if (e.protected !== void 0 && typeof e.protected != "string")
    throw new Z("JWS Protected Header incorrect type");
  if (e.payload === void 0)
    throw new Z("JWS Payload missing");
  if (typeof e.signature != "string")
    throw new Z("JWS Signature missing or incorrect type");
  if (e.header !== void 0 && !ue(e.header))
    throw new Z("JWS Unprotected Header incorrect type");
  let n = {};
  if (e.protected)
    try {
      const R = Q(e.protected);
      n = JSON.parse(Ze.decode(R));
    } catch {
      throw new Z("JWS Protected Header is invalid");
    }
  if (!es(n, e.header))
    throw new Z("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
  const s = {
    ...n,
    ...e.header
  }, i = ss(Z, /* @__PURE__ */ new Map([["b64", !0]]), r == null ? void 0 : r.crit, n, s);
  let a = !0;
  if (i.has("b64") && (a = n.b64, typeof a != "boolean"))
    throw new Z('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
  const { alg: o } = s;
  if (typeof o != "string" || !o)
    throw new Z('JWS "alg" (Algorithm) Header Parameter missing or invalid');
  const c = r && Dn("algorithms", r.algorithms);
  if (c && !c.has(o))
    throw new qt('"alg" (Algorithm) Header Parameter value not allowed');
  if (a) {
    if (typeof e.payload != "string")
      throw new Z("JWS Payload must be a string");
  } else if (typeof e.payload != "string" && !(e.payload instanceof Uint8Array))
    throw new Z("JWS Payload must be a string or an Uint8Array instance");
  let u = !1;
  typeof t == "function" ? (t = await t(n, e), u = !0, va(o, t, "verify"), mt(t) && (t = await ns(t, o))) : va(o, t, "verify");
  const d = Ae(ne.encode(e.protected ?? ""), ne.encode("."), typeof e.payload == "string" ? ne.encode(e.payload) : e.payload);
  let p;
  try {
    p = Q(e.signature);
  } catch {
    throw new Z("Failed to base64url decode the signature");
  }
  if (!await Jc(o, t, p, d))
    throw new _i();
  let b;
  if (a)
    try {
      b = Q(e.payload);
    } catch {
      throw new Z("Failed to base64url decode the payload");
    }
  else typeof e.payload == "string" ? b = ne.encode(e.payload) : b = e.payload;
  const S = { payload: b };
  return e.protected !== void 0 && (S.protectedHeader = n), e.header !== void 0 && (S.unprotectedHeader = e.header), u ? { ...S, key: t } : S;
}
async function Bc(e, t, r) {
  if (e instanceof Uint8Array && (e = Ze.decode(e)), typeof e != "string")
    throw new Z("Compact JWS must be a string or Uint8Array");
  const { 0: n, 1: s, 2: i, length: a } = e.split(".");
  if (a !== 3)
    throw new Z("Invalid Compact JWS");
  const o = await Li({ payload: s, protected: n, signature: i }, t, r), c = { payload: o.payload, protectedHeader: o.protectedHeader };
  return typeof t == "function" ? { ...c, key: o.key } : c;
}
const De = (e) => Math.floor(e.getTime() / 1e3), Hi = 60, Mi = Hi * 60, as = Mi * 24, Gc = as * 7, Fc = as * 365.25, Xc = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i, yt = (e) => {
  const t = Xc.exec(e);
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
      s = Math.round(r * Hi);
      break;
    case "hour":
    case "hours":
    case "hr":
    case "hrs":
    case "h":
      s = Math.round(r * Mi);
      break;
    case "day":
    case "days":
    case "d":
      s = Math.round(r * as);
      break;
    case "week":
    case "weeks":
    case "w":
      s = Math.round(r * Gc);
      break;
    default:
      s = Math.round(r * Fc);
      break;
  }
  return t[1] === "-" || t[4] === "ago" ? -s : s;
}, Ta = (e) => e.toLowerCase().replace(/^application\//, ""), zc = (e, t) => typeof e == "string" ? t.includes(e) : Array.isArray(e) ? t.some(Set.prototype.has.bind(new Set(e))) : !1, qi = (e, t, r = {}) => {
  let n;
  try {
    n = JSON.parse(Ze.decode(t));
  } catch {
  }
  if (!ue(n))
    throw new Vn("JWT Claims Set must be a top-level JSON object");
  const { typ: s } = r;
  if (s && (typeof e.typ != "string" || Ta(e.typ) !== Ta(s)))
    throw new ie('unexpected "typ" JWT header value', n, "typ", "check_failed");
  const { requiredClaims: i = [], issuer: a, subject: o, audience: c, maxTokenAge: u } = r, d = [...i];
  u !== void 0 && d.push("iat"), c !== void 0 && d.push("aud"), o !== void 0 && d.push("sub"), a !== void 0 && d.push("iss");
  for (const S of new Set(d.reverse()))
    if (!(S in n))
      throw new ie(`missing required "${S}" claim`, n, S, "missing");
  if (a && !(Array.isArray(a) ? a : [a]).includes(n.iss))
    throw new ie('unexpected "iss" claim value', n, "iss", "check_failed");
  if (o && n.sub !== o)
    throw new ie('unexpected "sub" claim value', n, "sub", "check_failed");
  if (c && !zc(n.aud, typeof c == "string" ? [c] : c))
    throw new ie('unexpected "aud" claim value', n, "aud", "check_failed");
  let p;
  switch (typeof r.clockTolerance) {
    case "string":
      p = yt(r.clockTolerance);
      break;
    case "number":
      p = r.clockTolerance;
      break;
    case "undefined":
      p = 0;
      break;
    default:
      throw new TypeError("Invalid clockTolerance option type");
  }
  const { currentDate: w } = r, b = De(w || /* @__PURE__ */ new Date());
  if ((n.iat !== void 0 || u) && typeof n.iat != "number")
    throw new ie('"iat" claim must be a number', n, "iat", "invalid");
  if (n.nbf !== void 0) {
    if (typeof n.nbf != "number")
      throw new ie('"nbf" claim must be a number', n, "nbf", "invalid");
    if (n.nbf > b + p)
      throw new ie('"nbf" claim timestamp check failed', n, "nbf", "check_failed");
  }
  if (n.exp !== void 0) {
    if (typeof n.exp != "number")
      throw new ie('"exp" claim must be a number', n, "exp", "invalid");
    if (n.exp <= b - p)
      throw new In('"exp" claim timestamp check failed', n, "exp", "check_failed");
  }
  if (u) {
    const S = b - n.iat, R = typeof u == "number" ? u : yt(u);
    if (S - p > R)
      throw new In('"iat" claim timestamp check failed (too far in the past)', n, "iat", "check_failed");
    if (S < 0 - p)
      throw new ie('"iat" claim timestamp check failed (it should be in the past)', n, "iat", "check_failed");
  }
  return n;
};
async function Vc(e, t, r) {
  var a;
  const n = await Bc(e, t, r);
  if ((a = n.protectedHeader.crit) != null && a.includes("b64") && n.protectedHeader.b64 === !1)
    throw new Vn("JWTs MUST NOT use unencoded payload");
  const i = { payload: qi(n.protectedHeader, n.payload, r), protectedHeader: n.protectedHeader };
  return typeof t == "function" ? { ...i, key: n.key } : i;
}
async function Yc(e, t, r) {
  const n = await Lc(e, t, r), s = qi(n.protectedHeader, n.plaintext, r), { protectedHeader: i } = n;
  if (i.iss !== void 0 && i.iss !== s.iss)
    throw new ie('replicated "iss" claim header parameter mismatch', s, "iss", "mismatch");
  if (i.sub !== void 0 && i.sub !== s.sub)
    throw new ie('replicated "sub" claim header parameter mismatch', s, "sub", "mismatch");
  if (i.aud !== void 0 && JSON.stringify(i.aud) !== JSON.stringify(s.aud))
    throw new ie('replicated "aud" claim header parameter mismatch', s, "aud", "mismatch");
  const a = { payload: s, protectedHeader: i };
  return typeof t == "function" ? { ...a, key: n.key } : a;
}
class Zc {
  constructor(t) {
    this._flattened = new $c(t);
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
function Je(e, t) {
  if (!Number.isFinite(t))
    throw new TypeError(`Invalid ${e} input`);
  return t;
}
class Qc {
  constructor(t = {}) {
    if (!ue(t))
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
    return typeof t == "number" ? this._payload = { ...this._payload, nbf: Je("setNotBefore", t) } : t instanceof Date ? this._payload = { ...this._payload, nbf: Je("setNotBefore", De(t)) } : this._payload = { ...this._payload, nbf: De(/* @__PURE__ */ new Date()) + yt(t) }, this;
  }
  setExpirationTime(t) {
    return typeof t == "number" ? this._payload = { ...this._payload, exp: Je("setExpirationTime", t) } : t instanceof Date ? this._payload = { ...this._payload, exp: Je("setExpirationTime", De(t)) } : this._payload = { ...this._payload, exp: De(/* @__PURE__ */ new Date()) + yt(t) }, this;
  }
  setIssuedAt(t) {
    return typeof t > "u" ? this._payload = { ...this._payload, iat: De(/* @__PURE__ */ new Date()) } : t instanceof Date ? this._payload = { ...this._payload, iat: Je("setIssuedAt", De(t)) } : typeof t == "string" ? this._payload = {
      ...this._payload,
      iat: Je("setIssuedAt", De(/* @__PURE__ */ new Date()) + yt(t))
    } : this._payload = { ...this._payload, iat: Je("setIssuedAt", t) }, this;
  }
}
class eu extends Qc {
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
    const n = new Zc(ne.encode(JSON.stringify(this._payload)));
    return this._replicateIssuerAsHeader && (this._protectedHeader = { ...this._protectedHeader, iss: this._payload.iss }), this._replicateSubjectAsHeader && (this._protectedHeader = { ...this._protectedHeader, sub: this._payload.sub }), this._replicateAudienceAsHeader && (this._protectedHeader = { ...this._protectedHeader, aud: this._payload.aud }), n.setProtectedHeader(this._protectedHeader), this._iv && n.setInitializationVector(this._iv), this._cek && n.setContentEncryptionKey(this._cek), this._keyManagementParameters && n.setKeyManagementParameters(this._keyManagementParameters), n.encrypt(t, r);
  }
}
function tu(e) {
  switch (typeof e == "string" && e.slice(0, 2)) {
    case "RS":
    case "PS":
      return "RSA";
    case "ES":
      return "EC";
    case "Ed":
      return "OKP";
    default:
      throw new z('Unsupported "alg" value for a JSON Web Key Set');
  }
}
function ru(e) {
  return e && typeof e == "object" && Array.isArray(e.keys) && e.keys.every(nu);
}
function nu(e) {
  return ue(e);
}
function Wi(e) {
  return typeof structuredClone == "function" ? structuredClone(e) : JSON.parse(JSON.stringify(e));
}
class su {
  constructor(t) {
    if (this._cached = /* @__PURE__ */ new WeakMap(), !ru(t))
      throw new Yn("JSON Web Key Set malformed");
    this._jwks = Wi(t);
  }
  async getKey(t, r) {
    const { alg: n, kid: s } = { ...t, ...r == null ? void 0 : r.header }, i = tu(n), a = this._jwks.keys.filter((u) => {
      let d = i === u.kty;
      if (d && typeof s == "string" && (d = s === u.kid), d && typeof u.alg == "string" && (d = n === u.alg), d && typeof u.use == "string" && (d = u.use === "sig"), d && Array.isArray(u.key_ops) && (d = u.key_ops.includes("verify")), d && n === "EdDSA" && (d = u.crv === "Ed25519" || u.crv === "Ed448"), d)
        switch (n) {
          case "ES256":
            d = u.crv === "P-256";
            break;
          case "ES256K":
            d = u.crv === "secp256k1";
            break;
          case "ES384":
            d = u.crv === "P-384";
            break;
          case "ES512":
            d = u.crv === "P-521";
            break;
        }
      return d;
    }), { 0: o, length: c } = a;
    if (c === 0)
      throw new Zn();
    if (c !== 1) {
      const u = new mi(), { _cached: d } = this;
      throw u[Symbol.asyncIterator] = async function* () {
        for (const p of a)
          try {
            yield await Pa(d, p, n);
          } catch {
          }
      }, u;
    }
    return Pa(this._cached, o, n);
  }
}
async function Pa(e, t, r) {
  const n = e.get(t) || e.set(t, {}).get(t);
  if (n[r] === void 0) {
    const s = await ns({ ...t, ext: !0 }, r);
    if (s instanceof Uint8Array || s.type !== "public")
      throw new Yn("JSON Web Key Set members must be public keys");
    n[r] = s;
  }
  return n[r];
}
function Oa(e) {
  const t = new su(e), r = async (n, s) => t.getKey(n, s);
  return Object.defineProperties(r, {
    jwks: {
      value: () => Wi(t._jwks),
      enumerable: !0,
      configurable: !1,
      writable: !1
    }
  }), r;
}
const au = async (e, t, r) => {
  let n, s, i = !1;
  typeof AbortController == "function" && (n = new AbortController(), s = setTimeout(() => {
    i = !0, n.abort();
  }, t));
  const a = await fetch(e.href, {
    signal: n ? n.signal : void 0,
    redirect: "manual",
    headers: r.headers
  }).catch((o) => {
    throw i ? new gi() : o;
  });
  if (s !== void 0 && clearTimeout(s), a.status !== 200)
    throw new re("Expected 200 OK from the JSON Web Key Set HTTP response");
  try {
    return await a.json();
  } catch {
    throw new re("Failed to parse the JSON Web Key Set HTTP response as JSON");
  }
};
function iu() {
  return typeof WebSocketPair < "u" || typeof navigator < "u" && navigator.userAgent === "Cloudflare-Workers" || typeof EdgeRuntime < "u" && EdgeRuntime === "vercel";
}
let Un;
var Dt, oi;
(typeof navigator > "u" || !((oi = (Dt = navigator.userAgent) == null ? void 0 : Dt.startsWith) != null && oi.call(Dt, "Mozilla/5.0 "))) && (Un = "jose/v5.9.6");
const Ht = Symbol();
function ou(e, t) {
  return !(typeof e != "object" || e === null || !("uat" in e) || typeof e.uat != "number" || Date.now() - e.uat >= t || !("jwks" in e) || !ue(e.jwks) || !Array.isArray(e.jwks.keys) || !Array.prototype.every.call(e.jwks.keys, ue));
}
class cu {
  constructor(t, r) {
    if (!(t instanceof URL))
      throw new TypeError("url must be an instance of URL");
    this._url = new URL(t.href), this._options = { agent: r == null ? void 0 : r.agent, headers: r == null ? void 0 : r.headers }, this._timeoutDuration = typeof (r == null ? void 0 : r.timeoutDuration) == "number" ? r == null ? void 0 : r.timeoutDuration : 5e3, this._cooldownDuration = typeof (r == null ? void 0 : r.cooldownDuration) == "number" ? r == null ? void 0 : r.cooldownDuration : 3e4, this._cacheMaxAge = typeof (r == null ? void 0 : r.cacheMaxAge) == "number" ? r == null ? void 0 : r.cacheMaxAge : 6e5, (r == null ? void 0 : r[Ht]) !== void 0 && (this._cache = r == null ? void 0 : r[Ht], ou(r == null ? void 0 : r[Ht], this._cacheMaxAge) && (this._jwksTimestamp = this._cache.uat, this._local = Oa(this._cache.jwks)));
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
      if (n instanceof Zn && this.coolingDown() === !1)
        return await this.reload(), this._local(t, r);
      throw n;
    }
  }
  async reload() {
    this._pendingFetch && iu() && (this._pendingFetch = void 0);
    const t = new Headers(this._options.headers);
    Un && !t.has("User-Agent") && (t.set("User-Agent", Un), this._options.headers = Object.fromEntries(t.entries())), this._pendingFetch || (this._pendingFetch = au(this._url, this._timeoutDuration, this._options).then((r) => {
      this._local = Oa(r), this._cache && (this._cache.uat = Date.now(), this._cache.jwks = r), this._jwksTimestamp = Date.now(), this._pendingFetch = void 0;
    }).catch((r) => {
      throw this._pendingFetch = void 0, r;
    })), await this._pendingFetch;
  }
}
function uu(e, t) {
  const r = new cu(e, t), n = async (s, i) => r.getKey(s, i);
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
const lu = ce;
let Ln;
var Ut, ci;
(typeof navigator > "u" || !((ci = (Ut = navigator.userAgent) == null ? void 0 : Ut.startsWith) != null && ci.call(Ut, "Mozilla/5.0 "))) && (Ln = "oauth4webapi/v3.1.4");
function Tt(e, t) {
  if (e == null)
    return !1;
  try {
    return e instanceof t || Object.getPrototypeOf(e)[Symbol.toStringTag] === t.prototype[Symbol.toStringTag];
  } catch {
    return !1;
  }
}
const pe = "ERR_INVALID_ARG_VALUE", de = "ERR_INVALID_ARG_TYPE";
function X(e, t, r) {
  const n = new TypeError(e, { cause: r });
  return Object.assign(n, { code: t }), n;
}
const Ue = Symbol(), du = Symbol(), fu = Symbol(), Ge = Symbol(), Hn = Symbol(), hu = new TextEncoder(), pu = new TextDecoder();
function dt(e) {
  return typeof e == "string" ? hu.encode(e) : pu.decode(e);
}
const Ca = 32768;
function mu(e) {
  e instanceof ArrayBuffer && (e = new Uint8Array(e));
  const t = [];
  for (let r = 0; r < e.byteLength; r += Ca)
    t.push(String.fromCharCode.apply(null, e.subarray(r, r + Ca)));
  return btoa(t.join("")).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function gu(e) {
  try {
    const t = atob(e.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "")), r = new Uint8Array(t.length);
    for (let n = 0; n < t.length; n++)
      r[n] = t.charCodeAt(n);
    return r;
  } catch (t) {
    throw X("The input to be decoded is not correctly encoded.", pe, t);
  }
}
function ze(e) {
  return typeof e == "string" ? gu(e) : mu(e);
}
class me extends Error {
  constructor(r, n) {
    var s;
    super(r, n);
    x(this, "code");
    this.name = this.constructor.name, this.code = al, (s = Error.captureStackTrace) == null || s.call(Error, this, this.constructor);
  }
}
class _u extends Error {
  constructor(r, n) {
    var s;
    super(r, n);
    x(this, "code");
    this.name = this.constructor.name, n != null && n.code && (this.code = n == null ? void 0 : n.code), (s = Error.captureStackTrace) == null || s.call(Error, this, this.constructor);
  }
}
function D(e, t, r) {
  return new _u(e, { code: t, cause: r });
}
function yu(e, t) {
  if (!(e instanceof CryptoKey))
    throw X(`${t} must be a CryptoKey`, de);
}
function Eu(e, t) {
  if (yu(e, t), e.type !== "private")
    throw X(`${t} must be a private CryptoKey`, pe);
}
function ht(e) {
  return !(e === null || typeof e != "object" || Array.isArray(e));
}
function is(e) {
  Tt(e, Headers) && (e = Object.fromEntries(e.entries()));
  const t = new Headers(e);
  if (Ln && !t.has("user-agent") && t.set("user-agent", Ln), t.has("authorization"))
    throw X('"options.headers" must not include the "authorization" header name', pe);
  if (t.has("dpop"))
    throw X('"options.headers" must not include the "dpop" header name', pe);
  return t;
}
function $i(e) {
  if (typeof e == "function" && (e = e()), !(e instanceof AbortSignal))
    throw X('"options.signal" must return or be an instance of AbortSignal', de);
  return e;
}
async function wu(e, t) {
  if (!(e instanceof URL))
    throw X('"issuerIdentifier" must be an instance of URL', de);
  ji(e, (t == null ? void 0 : t[Ue]) !== !0);
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
      throw X('"options.algorithm" must be "oidc" (default), or "oauth2"', pe);
  }
  const n = is(t == null ? void 0 : t.headers);
  return n.set("accept", "application/json"), ((t == null ? void 0 : t[Ge]) || fetch)(r.href, {
    body: void 0,
    headers: Object.fromEntries(n.entries()),
    method: "GET",
    redirect: "manual",
    signal: t != null && t.signal ? $i(t.signal) : void 0
  });
}
function Et(e, t, r, n, s) {
  try {
    if (typeof e != "number" || !Number.isFinite(e))
      throw X(`${r} must be a number`, de, s);
    if (e > 0)
      return;
    throw X(`${r} must be a positive number`, pe, s);
  } catch (i) {
    throw n ? D(i.message, n, s) : i;
  }
}
function ee(e, t, r, n) {
  try {
    if (typeof e != "string")
      throw X(`${t} must be a string`, de, n);
    if (e.length === 0)
      throw X(`${t} must not be empty`, pe, n);
  } catch (s) {
    throw r ? D(s.message, r, n) : s;
  }
}
async function bu(e, t) {
  if (!(e instanceof URL) && e !== Na)
    throw X('"expectedIssuer" must be an instance of URL', de);
  if (!Tt(t, Response))
    throw X('"response" must be an instance of Response', de);
  if (t.status !== 200)
    throw D('"response" is not a conform Authorization Server Metadata response (unexpected HTTP status code)', fs, t);
  Yt(t), zt(t);
  let r;
  try {
    r = await t.json();
  } catch (n) {
    throw D('failed to parse "response" body as JSON', At, n);
  }
  if (!ht(r))
    throw D('"response" body must be a top level object', $, { body: r });
  if (ee(r.issuer, '"response" body "issuer" property', $, { body: r }), new URL(r.issuer).href !== e.href && e !== Na)
    throw D('"response" body "issuer" property does not match the expected value', ll, { expected: e.href, body: r, attribute: "issuer" });
  return r;
}
function zt(e) {
  Au(e, "application/json");
}
function Su(e, ...t) {
  let r = '"response" content-type must be ';
  if (t.length > 2) {
    const n = t.pop();
    r += `${t.join(", ")}, or ${n}`;
  } else t.length === 2 ? r += `${t[0]} or ${t[1]}` : r += t[0];
  return D(r, ol, e);
}
function Au(e, t) {
  if (Bu(e) !== t)
    throw Su(e, t);
}
function Vt() {
  return ze(crypto.getRandomValues(new Uint8Array(32)));
}
function Ru() {
  return Vt();
}
function vu() {
  return Vt();
}
function Tu() {
  return Vt();
}
async function Pu(e) {
  return ee(e, "codeVerifier"), ze(await crypto.subtle.digest("SHA-256", dt(e)));
}
function Ou(e) {
  return e instanceof CryptoKey ? { key: e } : (e == null ? void 0 : e.key) instanceof CryptoKey ? (e.kid !== void 0 && ee(e.kid, '"kid"'), {
    key: e.key,
    kid: e.kid
  }) : {};
}
function Cu(e) {
  switch (e.algorithm.hash.name) {
    case "SHA-256":
      return "PS256";
    case "SHA-384":
      return "PS384";
    case "SHA-512":
      return "PS512";
    default:
      throw new me("unsupported RsaHashedKeyAlgorithm hash name", {
        cause: e
      });
  }
}
function Iu(e) {
  switch (e.algorithm.hash.name) {
    case "SHA-256":
      return "RS256";
    case "SHA-384":
      return "RS384";
    case "SHA-512":
      return "RS512";
    default:
      throw new me("unsupported RsaHashedKeyAlgorithm hash name", {
        cause: e
      });
  }
}
function xu(e) {
  switch (e.algorithm.namedCurve) {
    case "P-256":
      return "ES256";
    case "P-384":
      return "ES384";
    case "P-521":
      return "ES512";
    default:
      throw new me("unsupported EcKeyAlgorithm namedCurve", { cause: e });
  }
}
function Nu(e) {
  switch (e.algorithm.name) {
    case "RSA-PSS":
      return Cu(e);
    case "RSASSA-PKCS1-v1_5":
      return Iu(e);
    case "ECDSA":
      return xu(e);
    case "Ed25519":
    case "EdDSA":
      return "Ed25519";
    default:
      throw new me("unsupported CryptoKey algorithm name", { cause: e });
  }
}
function os(e) {
  const t = e == null ? void 0 : e[du];
  return typeof t == "number" && Number.isFinite(t) ? t : 0;
}
function Ki(e) {
  const t = e == null ? void 0 : e[fu];
  return typeof t == "number" && Number.isFinite(t) && Math.sign(t) !== -1 ? t : 30;
}
function cs() {
  return Math.floor(Date.now() / 1e3);
}
function Qe(e) {
  if (typeof e != "object" || e === null)
    throw X('"as" must be an object', de);
  ee(e.issuer, '"as.issuer"');
}
function et(e) {
  if (typeof e != "object" || e === null)
    throw X('"client" must be an object', de);
  ee(e.client_id, '"client.client_id"');
}
function ku(e) {
  return ee(e, '"clientSecret"'), (t, r, n, s) => {
    n.set("client_id", r.client_id), n.set("client_secret", e);
  };
}
function Du(e, t) {
  const r = cs() + os(t);
  return {
    jti: Vt(),
    aud: e.issuer,
    exp: r + 60,
    iat: r,
    nbf: r,
    iss: t.client_id,
    sub: t.client_id
  };
}
function Uu(e, t) {
  const { key: r, kid: n } = Ou(e);
  return Eu(r, '"clientPrivateKey.key"'), async (s, i, a, o) => {
    const c = { alg: Nu(r), kid: n }, u = Du(s, i);
    a.set("client_id", i.client_id), a.set("client_assertion_type", "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"), a.set("client_assertion", await Lu(c, u, r));
  };
}
async function Lu(e, t, r) {
  if (!r.usages.includes("sign"))
    throw X('CryptoKey instances used for signing assertions must include "sign" in their "usages"', pe);
  const n = `${ze(dt(JSON.stringify(e)))}.${ze(dt(JSON.stringify(t)))}`, s = ze(await crypto.subtle.sign(gl(r), r, dt(n)));
  return `${n}.${s}`;
}
const Hu = URL.parse ? (e, t) => URL.parse(e, t) : (e, t) => {
  try {
    return new URL(e, t);
  } catch {
    return null;
  }
};
function ji(e, t) {
  if (t && e.protocol !== "https:")
    throw D("only requests to HTTPS are allowed", cl, e);
  if (e.protocol !== "https:" && e.protocol !== "http:")
    throw D("only HTTP and HTTPS requests are allowed", ul, e);
}
function Ia(e, t, r, n) {
  let s;
  if (typeof e != "string" || !(s = Hu(e)))
    throw D(`authorization server metadata does not contain a valid ${r ? `"as.mtls_endpoint_aliases.${t}"` : `"as.${t}"`}`, e === void 0 ? dl : fl, { attribute: r ? `mtls_endpoint_aliases.${t}` : t });
  return ji(s, n), s;
}
function Ji(e, t, r, n) {
  return r && e.mtls_endpoint_aliases && t in e.mtls_endpoint_aliases ? Ia(e.mtls_endpoint_aliases[t], t, r, n) : Ia(e[t], t, r, n);
}
async function Mu(e, t, r, n, s) {
  var u;
  Qe(e), et(t);
  const i = Ji(e, "pushed_authorization_request_endpoint", t.use_mtls_endpoint_aliases, (s == null ? void 0 : s[Ue]) !== !0), a = new URLSearchParams(n);
  a.set("client_id", t.client_id);
  const o = is(s == null ? void 0 : s.headers);
  o.set("accept", "application/json"), (s == null ? void 0 : s.DPoP) !== void 0 && (Xi(s.DPoP), await s.DPoP.addProof(i, o, "POST"));
  const c = await zi(e, t, r, i, a, o, s);
  return (u = s == null ? void 0 : s.DPoP) == null || u.cacheNonce(c), c;
}
class Bi extends Error {
  constructor(r, n) {
    var s;
    super(r, n);
    x(this, "cause");
    x(this, "code");
    x(this, "error");
    x(this, "status");
    x(this, "error_description");
    x(this, "response");
    this.name = this.constructor.name, this.code = sl, this.cause = n.cause, this.error = n.cause.error, this.status = n.response.status, this.error_description = n.cause.error_description, Object.defineProperty(this, "response", { enumerable: !1, value: n.response }), (s = Error.captureStackTrace) == null || s.call(Error, this, this.constructor);
  }
}
class qu extends Error {
  constructor(r, n) {
    var s;
    super(r, n);
    x(this, "cause");
    x(this, "code");
    x(this, "error");
    x(this, "error_description");
    this.name = this.constructor.name, this.code = il, this.cause = n.cause, this.error = n.cause.get("error"), this.error_description = n.cause.get("error_description") ?? void 0, (s = Error.captureStackTrace) == null || s.call(Error, this, this.constructor);
  }
}
class Gi extends Error {
  constructor(r, n) {
    var s;
    super(r, n);
    x(this, "cause");
    x(this, "code");
    x(this, "response");
    x(this, "status");
    this.name = this.constructor.name, this.code = nl, this.cause = n.cause, this.status = n.response.status, this.response = n.response, Object.defineProperty(this, "response", { enumerable: !1 }), (s = Error.captureStackTrace) == null || s.call(Error, this, this.constructor);
  }
}
function Wu(e) {
  return e.length >= 2 && e[0] === '"' && e[e.length - 1] === '"' ? e.slice(1, -1) : e;
}
const $u = /((?:,|, )?[0-9a-zA-Z!#$%&'*+-.^_`|~]+=)/, Ku = /(?:^|, ?)([0-9a-zA-Z!#$%&'*+\-.^_`|~]+)(?=$|[ ,])/g;
function ju(e, t) {
  const r = t.split($u).slice(1);
  if (!r.length)
    return { scheme: e.toLowerCase(), parameters: {} };
  r[r.length - 1] = r[r.length - 1].replace(/,$/, "");
  const n = {};
  for (let s = 1; s < r.length; s += 2) {
    const i = s;
    if (r[i][0] === '"')
      for (; r[i].slice(-1) !== '"' && ++s < r.length; )
        r[i] += r[s];
    const a = r[i - 1].replace(/^(?:, ?)|=$/g, "").toLowerCase();
    n[a] = Wu(r[i]);
  }
  return {
    scheme: e.toLowerCase(),
    parameters: n
  };
}
function Fi(e) {
  if (!Tt(e, Response))
    throw X('"response" must be an instance of Response', de);
  const t = e.headers.get("www-authenticate");
  if (t === null)
    return;
  const r = [];
  for (const { 1: s, index: i } of t.matchAll(Ku))
    r.push([s, i]);
  return r.length ? r.map(([s, i], a, o) => {
    const c = o[a + 1];
    let u;
    return c ? u = t.slice(i, c[1]) : u = t.slice(i), ju(s, u);
  }) : void 0;
}
async function Ju(e, t, r) {
  var a;
  if (Qe(e), et(t), !Tt(r, Response))
    throw X('"response" must be an instance of Response', de);
  let n;
  if (n = Fi(r))
    throw new Gi("server responded with a challenge in the WWW-Authenticate HTTP Header", { cause: n, response: r });
  if (r.status !== 201) {
    let o;
    throw (o = await Zi(r)) ? (await ((a = r.body) == null ? void 0 : a.cancel()), new Bi("server responded with an error in the response body", {
      cause: o,
      response: r
    })) : D('"response" is not a conform Pushed Authorization Request Endpoint response (unexpected HTTP status code)', fs, r);
  }
  Yt(r), zt(r);
  let s;
  try {
    s = await r.json();
  } catch (o) {
    throw D('failed to parse "response" body as JSON', At, o);
  }
  if (!ht(s))
    throw D('"response" body must be a top level object', $, { body: s });
  ee(s.request_uri, '"response" body "request_uri" property', $, {
    body: s
  });
  let i = typeof s.expires_in != "number" ? parseFloat(s.expires_in) : s.expires_in;
  return Et(i, !1, '"response" body "expires_in" property', $, {
    body: s
  }), s.expires_in = i, s;
}
function Xi(e) {
  if (!ds.has(e))
    throw X('"options.DPoP" is not a valid DPoPHandle', pe);
}
function Bu(e) {
  var t;
  return (t = e.headers.get("content-type")) == null ? void 0 : t.split(";")[0];
}
async function zi(e, t, r, n, s, i, a) {
  return await r(e, t, s, i), i.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"), ((a == null ? void 0 : a[Ge]) || fetch)(n.href, {
    body: s,
    headers: Object.fromEntries(i.entries()),
    method: "POST",
    redirect: "manual",
    signal: a != null && a.signal ? $i(a.signal) : void 0
  });
}
async function us(e, t, r, n, s, i) {
  var u;
  const a = Ji(e, "token_endpoint", t.use_mtls_endpoint_aliases, (i == null ? void 0 : i[Ue]) !== !0);
  s.set("grant_type", n);
  const o = is(i == null ? void 0 : i.headers);
  o.set("accept", "application/json"), (i == null ? void 0 : i.DPoP) !== void 0 && (Xi(i.DPoP), await i.DPoP.addProof(a, o, "POST"));
  const c = await zi(e, t, r, a, s, o, i);
  return (u = i == null ? void 0 : i.DPoP) == null || u.cacheNonce(c), c;
}
async function Gu(e, t, r, n, s) {
  Qe(e), et(t), ee(n, '"refreshToken"');
  const i = new URLSearchParams(s == null ? void 0 : s.additionalParameters);
  return i.set("refresh_token", n), us(e, t, r, "refresh_token", i, s);
}
const Vi = /* @__PURE__ */ new WeakMap(), Fu = /* @__PURE__ */ new WeakMap();
function Yi(e) {
  if (!e.id_token)
    return;
  const t = Vi.get(e);
  if (!t)
    throw X('"ref" was already garbage collected or did not resolve from the proper sources', pe);
  return t;
}
async function ls(e, t, r, n, s) {
  var o;
  if (Qe(e), et(t), !Tt(r, Response))
    throw X('"response" must be an instance of Response', de);
  let i;
  if (i = Fi(r))
    throw new Gi("server responded with a challenge in the WWW-Authenticate HTTP Header", { cause: i, response: r });
  if (r.status !== 200) {
    let c;
    throw (c = await Zi(r)) ? (await ((o = r.body) == null ? void 0 : o.cancel()), new Bi("server responded with an error in the response body", {
      cause: c,
      response: r
    })) : D('"response" is not a conform Token Endpoint response (unexpected HTTP status code)', fs, r);
  }
  Yt(r), zt(r);
  let a;
  try {
    a = await r.json();
  } catch (c) {
    throw D('failed to parse "response" body as JSON', At, c);
  }
  if (!ht(a))
    throw D('"response" body must be a top level object', $, { body: a });
  if (ee(a.access_token, '"response" body "access_token" property', $, {
    body: a
  }), ee(a.token_type, '"response" body "token_type" property', $, {
    body: a
  }), a.token_type = a.token_type.toLowerCase(), a.token_type !== "dpop" && a.token_type !== "bearer")
    throw new me("unsupported `token_type` value", { cause: { body: a } });
  if (a.expires_in !== void 0) {
    let c = typeof a.expires_in != "number" ? parseFloat(a.expires_in) : a.expires_in;
    Et(c, !1, '"response" body "expires_in" property', $, {
      body: a
    }), a.expires_in = c;
  }
  if (a.refresh_token !== void 0 && ee(a.refresh_token, '"response" body "refresh_token" property', $, {
    body: a
  }), a.scope !== void 0 && typeof a.scope != "string")
    throw D('"response" body "scope" property must be a string', $, { body: a });
  if (a.id_token !== void 0) {
    ee(a.id_token, '"response" body "id_token" property', $, {
      body: a
    });
    const c = ["aud", "exp", "iat", "iss", "sub"];
    t.require_auth_time === !0 && c.push("auth_time"), t.default_max_age !== void 0 && (Et(t.default_max_age, !1, '"client.default_max_age"'), c.push("auth_time")), n != null && n.length && c.push(...n);
    const { claims: u, jwt: d } = await _l(a.id_token, yl.bind(void 0, t.id_token_signed_response_alg, e.id_token_signing_alg_values_supported, "RS256"), os(t), Ki(t), s == null ? void 0 : s[Hn]).then(el.bind(void 0, c)).then(Vu.bind(void 0, e)).then(zu.bind(void 0, t.client_id));
    if (Array.isArray(u.aud) && u.aud.length !== 1) {
      if (u.azp === void 0)
        throw D('ID Token "aud" (audience) claim includes additional untrusted audiences', Ve, { claims: u, claim: "aud" });
      if (u.azp !== t.client_id)
        throw D('unexpected ID Token "azp" (authorized party) claim value', Ve, { expected: t.client_id, claims: u, claim: "azp" });
    }
    u.auth_time !== void 0 && Et(u.auth_time, !1, 'ID Token "auth_time" (authentication time)', $, { claims: u }), Fu.set(r, d), Vi.set(a, u);
  }
  return a;
}
async function Xu(e, t, r, n) {
  return ls(e, t, r, void 0, n);
}
function zu(e, t) {
  if (Array.isArray(t.claims.aud)) {
    if (!t.claims.aud.includes(e))
      throw D('unexpected JWT "aud" (audience) claim value', Ve, {
        expected: e,
        claims: t.claims,
        claim: "aud"
      });
  } else if (t.claims.aud !== e)
    throw D('unexpected JWT "aud" (audience) claim value', Ve, {
      expected: e,
      claims: t.claims,
      claim: "aud"
    });
  return t;
}
function Vu(e, t) {
  var n;
  const r = ((n = e[Al]) == null ? void 0 : n.call(e, t)) ?? e.issuer;
  if (t.claims.iss !== r)
    throw D('unexpected JWT "iss" (issuer) claim value', Ve, {
      expected: r,
      claims: t.claims,
      claim: "iss"
    });
  return t;
}
const ds = /* @__PURE__ */ new WeakSet();
function Yu(e) {
  return ds.add(e), e;
}
async function Zu(e, t, r, n, s, i, a) {
  if (Qe(e), et(t), !ds.has(n))
    throw X('"callbackParameters" must be an instance of URLSearchParams obtained from "validateAuthResponse()", or "validateJwtAuthResponse()', pe);
  ee(s, '"redirectUri"');
  const o = Be(n, "code");
  if (!o)
    throw D('no authorization code in "callbackParameters"', $);
  const c = new URLSearchParams(a == null ? void 0 : a.additionalParameters);
  return c.set("redirect_uri", s), c.set("code", o), i !== Sl && (ee(i, '"codeVerifier"'), c.set("code_verifier", i)), us(e, t, r, "authorization_code", c, a);
}
const Qu = {
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
function el(e, t) {
  for (const r of e)
    if (t.claims[r] === void 0)
      throw D(`JWT "${r}" (${Qu[r]}) claim missing`, $, {
        claims: t.claims
      });
  return t;
}
const Vr = Symbol(), Yr = Symbol();
async function tl(e, t, r, n) {
  return rl(e, t, r, n.expectedNonce, n.maxAge, {
    [Hn]: n[Hn]
  });
}
async function rl(e, t, r, n, s, i) {
  const a = [];
  switch (n) {
    case void 0:
      n = Vr;
      break;
    case Vr:
      break;
    default:
      ee(n, '"expectedNonce" argument'), a.push("nonce");
  }
  switch (s ?? (s = t.default_max_age), s) {
    case void 0:
      s = Yr;
      break;
    case Yr:
      break;
    default:
      Et(s, !1, '"maxAge" argument'), a.push("auth_time");
  }
  const o = await ls(e, t, r, a, i);
  ee(o.id_token, '"response" body "id_token" property', $, {
    body: o
  });
  const c = Yi(o);
  if (s !== Yr) {
    const u = cs() + os(t), d = Ki(t);
    if (c.auth_time + s < u - d)
      throw D("too much time has elapsed since the last End-User authentication", Mn, { claims: c, now: u, tolerance: d, claim: "auth_time" });
  }
  if (n === Vr) {
    if (c.nonce !== void 0)
      throw D('unexpected ID Token "nonce" claim value', Ve, {
        expected: void 0,
        claims: c,
        claim: "nonce"
      });
  } else if (c.nonce !== n)
    throw D('unexpected ID Token "nonce" claim value', Ve, {
      expected: n,
      claims: c,
      claim: "nonce"
    });
  return o;
}
const nl = "OAUTH_WWW_AUTHENTICATE_CHALLENGE", sl = "OAUTH_RESPONSE_BODY_ERROR", al = "OAUTH_UNSUPPORTED_OPERATION", il = "OAUTH_AUTHORIZATION_RESPONSE_ERROR", At = "OAUTH_PARSE_ERROR", $ = "OAUTH_INVALID_RESPONSE", ol = "OAUTH_RESPONSE_IS_NOT_JSON", fs = "OAUTH_RESPONSE_IS_NOT_CONFORM", cl = "OAUTH_HTTP_REQUEST_FORBIDDEN", ul = "OAUTH_REQUEST_PROTOCOL_FORBIDDEN", Mn = "OAUTH_JWT_TIMESTAMP_CHECK_FAILED", Ve = "OAUTH_JWT_CLAIM_COMPARISON_FAILED", ll = "OAUTH_JSON_ATTRIBUTE_COMPARISON_FAILED", dl = "OAUTH_MISSING_SERVER_METADATA", fl = "OAUTH_INVALID_SERVER_METADATA";
async function hl(e, t, r, n, s, i) {
  return Qe(e), et(t), ee(n, '"grantType"'), us(e, t, r, n, new URLSearchParams(s), i);
}
async function pl(e, t, r, n) {
  return ls(e, t, r, void 0, n);
}
function Yt(e) {
  if (e.bodyUsed)
    throw X('"response" body has been used already', pe);
}
async function Zi(e) {
  if (e.status > 399 && e.status < 500) {
    Yt(e), zt(e);
    try {
      const t = await e.clone().json();
      if (ht(t) && typeof t.error == "string" && t.error.length)
        return t;
    } catch {
    }
  }
}
function xa(e) {
  const { algorithm: t } = e;
  if (typeof t.modulusLength != "number" || t.modulusLength < 2048)
    throw new me(`unsupported ${t.name} modulusLength`, {
      cause: e
    });
}
function ml(e) {
  const { algorithm: t } = e;
  switch (t.namedCurve) {
    case "P-256":
      return "SHA-256";
    case "P-384":
      return "SHA-384";
    case "P-521":
      return "SHA-512";
    default:
      throw new me("unsupported ECDSA namedCurve", { cause: e });
  }
}
function gl(e) {
  switch (e.algorithm.name) {
    case "ECDSA":
      return {
        name: e.algorithm.name,
        hash: ml(e)
      };
    case "RSA-PSS":
      switch (xa(e), e.algorithm.hash.name) {
        case "SHA-256":
        case "SHA-384":
        case "SHA-512":
          return {
            name: e.algorithm.name,
            saltLength: parseInt(e.algorithm.hash.name.slice(-3), 10) >> 3
          };
        default:
          throw new me("unsupported RSA-PSS hash name", { cause: e });
      }
    case "RSASSA-PKCS1-v1_5":
      return xa(e), e.algorithm.name;
    case "Ed25519":
    case "EdDSA":
      return e.algorithm.name;
  }
  throw new me("unsupported CryptoKey algorithm name", { cause: e });
}
async function _l(e, t, r, n, s) {
  let { 0: i, 1: a, length: o } = e.split(".");
  if (o === 5)
    if (s !== void 0)
      e = await s(e), { 0: i, 1: a, length: o } = e.split(".");
    else
      throw new me("JWE decryption is not configured", { cause: e });
  if (o !== 3)
    throw D("Invalid JWT", $, e);
  let c;
  try {
    c = JSON.parse(dt(ze(i)));
  } catch (p) {
    throw D("failed to parse JWT Header body as base64url encoded JSON", At, p);
  }
  if (!ht(c))
    throw D("JWT Header must be a top level object", $, e);
  if (t(c), c.crit !== void 0)
    throw new me('no JWT "crit" header parameter extensions are supported', {
      cause: { header: c }
    });
  let u;
  try {
    u = JSON.parse(dt(ze(a)));
  } catch (p) {
    throw D("failed to parse JWT Payload body as base64url encoded JSON", At, p);
  }
  if (!ht(u))
    throw D("JWT Payload must be a top level object", $, e);
  const d = cs() + r;
  if (u.exp !== void 0) {
    if (typeof u.exp != "number")
      throw D('unexpected JWT "exp" (expiration time) claim type', $, { claims: u });
    if (u.exp <= d - n)
      throw D('unexpected JWT "exp" (expiration time) claim value, expiration is past current timestamp', Mn, { claims: u, now: d, tolerance: n, claim: "exp" });
  }
  if (u.iat !== void 0 && typeof u.iat != "number")
    throw D('unexpected JWT "iat" (issued at) claim type', $, { claims: u });
  if (u.iss !== void 0 && typeof u.iss != "string")
    throw D('unexpected JWT "iss" (issuer) claim type', $, { claims: u });
  if (u.nbf !== void 0) {
    if (typeof u.nbf != "number")
      throw D('unexpected JWT "nbf" (not before) claim type', $, { claims: u });
    if (u.nbf > d + n)
      throw D('unexpected JWT "nbf" (not before) claim value', Mn, {
        claims: u,
        now: d,
        tolerance: n,
        claim: "nbf"
      });
  }
  if (u.aud !== void 0 && typeof u.aud != "string" && !Array.isArray(u.aud))
    throw D('unexpected JWT "aud" (audience) claim type', $, { claims: u });
  return { header: c, claims: u, jwt: e };
}
function yl(e, t, r, n) {
  if (e !== void 0) {
    if (typeof e == "string" ? n.alg !== e : !e.includes(n.alg))
      throw D('unexpected JWT "alg" header parameter', $, {
        header: n,
        expected: e,
        reason: "client configuration"
      });
    return;
  }
  if (Array.isArray(t)) {
    if (!t.includes(n.alg))
      throw D('unexpected JWT "alg" header parameter', $, {
        header: n,
        expected: t,
        reason: "authorization server metadata"
      });
    return;
  }
  if (r !== void 0) {
    if (typeof r == "string" ? n.alg !== r : typeof r == "function" ? !r(n.alg) : !r.includes(n.alg))
      throw D('unexpected JWT "alg" header parameter', $, {
        header: n,
        expected: r,
        reason: "default value"
      });
    return;
  }
  throw D('missing client or server configuration to verify used JWT "alg" header parameter', void 0, { client: e, issuer: t, fallback: r });
}
function Be(e, t) {
  const { 0: r, length: n } = e.getAll(t);
  if (n > 1)
    throw D(`"${t}" parameter must be provided only once`, $);
  return r;
}
const El = Symbol(), wl = Symbol();
function bl(e, t, r, n) {
  if (Qe(e), et(t), r instanceof URL && (r = r.searchParams), !(r instanceof URLSearchParams))
    throw X('"parameters" must be an instance of URLSearchParams, or URL', de);
  if (Be(r, "response"))
    throw D('"parameters" contains a JARM response, use validateJwtAuthResponse() instead of validateAuthResponse()', $, { parameters: r });
  const s = Be(r, "iss"), i = Be(r, "state");
  if (!s && e.authorization_response_iss_parameter_supported)
    throw D('response parameter "iss" (issuer) missing', $, { parameters: r });
  if (s && s !== e.issuer)
    throw D('unexpected "iss" (issuer) response parameter value', $, {
      expected: e.issuer,
      parameters: r
    });
  switch (n) {
    case void 0:
    case wl:
      if (i !== void 0)
        throw D('unexpected "state" response parameter encountered', $, {
          expected: void 0,
          parameters: r
        });
      break;
    case El:
      break;
    default:
      if (ee(n, '"expectedState" argument'), i !== n)
        throw D(i === void 0 ? 'response parameter "state" missing' : 'unexpected "state" response parameter value', $, { expected: n, parameters: r });
  }
  if (Be(r, "error"))
    throw new qu("authorization response from the server is an error", {
      cause: r
    });
  const o = Be(r, "id_token"), c = Be(r, "token");
  if (o !== void 0 || c !== void 0)
    throw new me("implicit and hybrid flows are not supported");
  return Yu(new URLSearchParams(r));
}
const Sl = Symbol(), Na = Symbol(), Al = Symbol(), Rl = "4.4.1", vl = {
  version: Rl
};
function Tl(e) {
  return e && !e.endsWith("/") ? `${e}/` : e;
}
function Pl(e) {
  return e && e.startsWith("/") ? e.substring(1, e.length) : e;
}
const Ol = (e) => e.endsWith("/") ? e.slice(0, -1) : e;
function Cl(e, t) {
  let r;
  try {
    r = new URL(e, t);
  } catch {
    return;
  }
  if (r.origin === t.origin)
    return r.toString();
}
const Il = [
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
function xl(e) {
  return Object.keys(e).reduce((t, r) => (Il.includes(r) && (t[r] = e[r]), t), {});
}
const Nl = [
  "client_id",
  "redirect_uri",
  "response_type",
  "code_challenge",
  "code_challenge_method",
  "state",
  "nonce"
], ka = ["openid", "profile", "email", "offline_access"].join(" "), kl = "urn:auth0:params:oauth:grant-type:token-exchange:federated-connection-access-token", Dl = "urn:ietf:params:oauth:token-type:refresh_token", Ul = "http://auth0.com/oauth/token-type/federated-connection-access-token";
function Zr(e, t) {
  return new URL(Pl(e), Tl(t));
}
class Ll {
  constructor(t) {
    if (this.fetch = t.fetch || fetch, this.jwksCache = t.jwksCache || {}, this.allowInsecureRequests = t.allowInsecureRequests ?? !1, this.httpOptions = () => {
      const n = new Headers(), s = t.enableTelemetry ?? !0, i = t.httpTimeout ?? 5e3;
      if (s) {
        const a = "nextjs-auth0", o = vl.version;
        n.set("User-Agent", `${a}/${o}`), n.set("Auth0-Client", Hl(JSON.stringify({
          name: a,
          version: o
        })));
      }
      return {
        signal: AbortSignal.timeout(i),
        headers: n
      };
    }, this.allowInsecureRequests && process.env.NODE_ENV === "production" && console.warn("allowInsecureRequests is enabled in a production environment. This is not recommended."), this.transactionStore = t.transactionStore, this.sessionStore = t.sessionStore, this.domain = t.domain, this.clientMetadata = { client_id: t.clientId }, this.clientSecret = t.clientSecret, this.authorizationParameters = t.authorizationParameters || {
      scope: ka
    }, this.pushedAuthorizationRequests = t.pushedAuthorizationRequests ?? !1, this.clientAssertionSigningKey = t.clientAssertionSigningKey, this.clientAssertionSigningAlg = t.clientAssertionSigningAlg || "RS256", this.authorizationParameters.scope || (this.authorizationParameters.scope = ka), !this.authorizationParameters.scope.split(" ").map((n) => n.trim()).includes("openid"))
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
    const { pathname: r } = t.nextUrl, n = Ol(r), s = t.method;
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
      const i = B.NextResponse.next(), a = await this.sessionStore.get(t.cookies);
      return a && await this.sessionStore.set(t.cookies, i.cookies, {
        ...a
      }), i;
    }
  }
  async startInteractiveLogin(t = {}) {
    const r = Zr(this.routes.callback, this.appBaseUrl);
    let n = this.signInReturnToPath;
    if (t.returnTo) {
      const R = new URL(this.authorizationParameters.redirect_uri || this.appBaseUrl), g = Cl(t.returnTo, R);
      g && (n = g);
    }
    const s = "S256", i = Ru(), a = await Pu(i), o = vu(), c = Tu(), u = new URLSearchParams();
    u.set("client_id", this.clientMetadata.client_id), u.set("redirect_uri", r.toString()), u.set("response_type", "code"), u.set("code_challenge", a), u.set("code_challenge_method", s), u.set("state", o), u.set("nonce", c);
    const d = {
      // any custom params to forward to /authorize defined as configuration
      ...this.authorizationParameters,
      // custom parameters passed in via the query params to ensure only the confidential client can set them
      ...t.authorizationParameters
    };
    Object.entries(d).forEach(([R, g]) => {
      !Nl.includes(R) && g != null && u.set(R, String(g));
    });
    const p = {
      nonce: c,
      maxAge: this.authorizationParameters.max_age,
      codeVerifier: i,
      responseType: "code",
      state: o,
      returnTo: n
    }, [w, b] = await this.authorizationUrl(u);
    if (w)
      return new B.NextResponse("An error occured while trying to initiate the login request.", {
        status: 500
      });
    const S = B.NextResponse.redirect(b.toString());
    return await this.transactionStore.save(S.cookies, p), S;
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
      return new B.NextResponse("An error occured while trying to initiate the logout request.", {
        status: 500
      });
    const i = t.nextUrl.searchParams.get("returnTo") || this.appBaseUrl;
    if (!s.end_session_endpoint) {
      console.warn("The Auth0 client does not have RP-initiated logout enabled, the user will be redirected to the `/v2/logout` endpoint instead. Learn how to enable it here: https://auth0.com/docs/authenticate/login/logout/log-users-out-of-auth0#enable-endpoint-discovery");
      const c = new URL("/v2/logout", this.issuer);
      c.searchParams.set("returnTo", i), c.searchParams.set("client_id", this.clientMetadata.client_id);
      const u = B.NextResponse.redirect(c);
      return await this.sessionStore.delete(t.cookies, u.cookies), u;
    }
    const a = new URL(s.end_session_endpoint);
    a.searchParams.set("client_id", this.clientMetadata.client_id), a.searchParams.set("post_logout_redirect_uri", i), r != null && r.internal.sid && a.searchParams.set("logout_hint", r.internal.sid);
    const o = B.NextResponse.redirect(a);
    return await this.sessionStore.delete(t.cookies, o.cookies), o;
  }
  async handleCallback(t) {
    const r = t.nextUrl.searchParams.get("state");
    if (!r)
      return this.onCallback(new zo(), {}, null);
    const n = await this.transactionStore.get(t.cookies, r);
    if (!n)
      return this.onCallback(new Vo(), {}, null);
    const s = n.payload, i = {
      returnTo: s.returnTo
    }, [a, o] = await this.discoverAuthorizationServerMetadata();
    if (a)
      return this.onCallback(a, i, null);
    let c;
    try {
      c = bl(o, this.clientMetadata, t.nextUrl.searchParams, s.state);
    } catch (R) {
      return this.onCallback(new Aa({
        cause: new kt({
          code: R.error,
          message: R.error_description
        })
      }), i, null);
    }
    const u = Zr(this.routes.callback, this.appBaseUrl), d = await Zu(o, this.clientMetadata, await this.getClientAuth(), c, u.toString(), s.codeVerifier, {
      ...this.httpOptions(),
      [Ge]: this.fetch,
      [Ue]: this.allowInsecureRequests
    });
    let p;
    try {
      p = await tl(o, this.clientMetadata, d, {
        expectedNonce: s.nonce,
        maxAge: s.maxAge,
        requireIdToken: !0
      });
    } catch (R) {
      return this.onCallback(new Yo({
        cause: new kt({
          code: R.error,
          message: R.error_description
        })
      }), i, null);
    }
    const w = Yi(p);
    let b = {
      user: w,
      tokenSet: {
        accessToken: p.access_token,
        idToken: p.id_token,
        scope: p.scope,
        refreshToken: p.refresh_token,
        expiresAt: Math.floor(Date.now() / 1e3) + Number(p.expires_in)
      },
      internal: {
        sid: w.sid,
        createdAt: Math.floor(Date.now() / 1e3)
      }
    };
    const S = await this.onCallback(null, i, b);
    return this.beforeSessionSaved ? b = {
      ...await this.beforeSessionSaved(b, p.id_token ?? null),
      internal: b.internal
    } : b.user = xl(w), await this.sessionStore.set(t.cookies, S.cookies, b, !0), await this.transactionStore.delete(S.cookies, r), S;
  }
  async handleProfile(t) {
    const r = await this.sessionStore.get(t.cookies);
    return r ? B.NextResponse.json(r == null ? void 0 : r.user) : new B.NextResponse(null, {
      status: 401
    });
  }
  async handleAccessToken(t) {
    const r = await this.sessionStore.get(t.cookies);
    if (!r)
      return B.NextResponse.json({
        error: {
          message: "The user does not have an active session.",
          code: lt.MISSING_SESSION
        }
      }, {
        status: 401
      });
    const [n, s] = await this.getTokenSet(r.tokenSet);
    if (n)
      return B.NextResponse.json({
        error: {
          message: n.message,
          code: n.code
        }
      }, {
        status: 401
      });
    const i = B.NextResponse.json({
      token: s.accessToken,
      scope: s.scope,
      expires_at: s.expiresAt
    });
    return await this.sessionStore.set(t.cookies, i.cookies, {
      ...r,
      tokenSet: s
    }), i;
  }
  async handleBackChannelLogout(t) {
    if (!this.sessionStore.store)
      return new B.NextResponse("A session data store is not configured.", {
        status: 500
      });
    if (!this.sessionStore.store.deleteByLogoutToken)
      return new B.NextResponse("Back-channel logout is not supported by the session data store.", {
        status: 500
      });
    const n = new URLSearchParams(await t.text()).get("logout_token");
    if (!n)
      return new B.NextResponse("Missing `logout_token` in the request body.", {
        status: 400
      });
    const [s, i] = await this.verifyLogoutToken(n);
    return s ? new B.NextResponse(s.message, {
      status: 400
    }) : (await this.sessionStore.store.deleteByLogoutToken(i), new B.NextResponse(null, {
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
        new Tn(lt.MISSING_REFRESH_TOKEN, "The access token has expired and a refresh token was not provided. The user needs to re-authenticate."),
        null
      ];
    if (t.refreshToken && t.expiresAt <= Date.now() / 1e3) {
      const [r, n] = await this.discoverAuthorizationServerMetadata();
      if (r)
        return console.error(r), [r, null];
      const s = await Gu(n, this.clientMetadata, await this.getClientAuth(), t.refreshToken, {
        ...this.httpOptions(),
        [Ge]: this.fetch,
        [Ue]: this.allowInsecureRequests
      });
      let i;
      try {
        i = await Xu(n, this.clientMetadata, s);
      } catch (c) {
        return console.error(c), [
          new Tn(lt.FAILED_TO_REFRESH_TOKEN, "The access token has expired and there was an error while trying to refresh it. Check the server logs for more information."),
          null
        ];
      }
      const a = Math.floor(Date.now() / 1e3) + Number(i.expires_in), o = {
        ...t,
        // contains the existing `iat` claim to maintain the session lifetime
        accessToken: i.access_token,
        idToken: i.id_token,
        expiresAt: a
      };
      return i.refresh_token ? o.refreshToken = i.refresh_token : o.refreshToken = t.refreshToken, [null, o];
    }
    return [null, t];
  }
  async discoverAuthorizationServerMetadata() {
    if (this.authorizationServerMetadata)
      return [null, this.authorizationServerMetadata];
    const t = new URL(this.issuer);
    try {
      const r = await wu(t, {
        ...this.httpOptions(),
        [Ge]: this.fetch,
        [Ue]: this.allowInsecureRequests
      }).then((n) => bu(t, n));
      return this.authorizationServerMetadata = r, [null, r];
    } catch (r) {
      return console.error(`An error occured while performing the discovery request. Please make sure the AUTH0_DOMAIN environment variable is correctly configured — the format must be 'example.us.auth0.com'. issuer=${t.toString()}, error:`, r), [
        new Xo("Discovery failed for the OpenID Connect configuration."),
        null
      ];
    }
  }
  async defaultOnCallback(t, r) {
    return t ? new B.NextResponse(t.message, {
      status: 500
    }) : B.NextResponse.redirect(Zr(r.returnTo || "/", this.appBaseUrl));
  }
  async verifyLogoutToken(t) {
    const [r, n] = await this.discoverAuthorizationServerMetadata();
    if (r)
      return [r, null];
    const s = "RS256", i = uu(new URL(n.jwks_uri), {
      [Ht]: this.jwksCache
    }), { payload: a } = await Vc(t, i, {
      issuer: n.issuer,
      audience: this.clientMetadata.client_id,
      algorithms: [s],
      requiredClaims: ["iat"]
    });
    return !("sid" in a) && !("sub" in a) ? [
      new Ne('either "sid" or "sub" (or both) claims must be present'),
      null
    ] : "sid" in a && typeof a.sid != "string" ? [new Ne('"sid" claim must be a string'), null] : "sub" in a && typeof a.sub != "string" ? [new Ne('"sub" claim must be a string'), null] : "nonce" in a ? [new Ne('"nonce" claim is prohibited'), null] : "events" in a ? typeof a.events != "object" || a.events === null ? [
      new Ne('"events" claim must be an object'),
      null
    ] : "http://schemas.openid.net/event/backchannel-logout" in a.events ? typeof a.events["http://schemas.openid.net/event/backchannel-logout"] != "object" ? [
      new Ne('"http://schemas.openid.net/event/backchannel-logout" member in the "events" claim must be an object'),
      null
    ] : [
      null,
      {
        sid: a.sid,
        sub: a.sub
      }
    ] : [
      new Ne('"http://schemas.openid.net/event/backchannel-logout" member is missing in the "events" claim'),
      null
    ] : [new Ne('"events" claim is missing'), null];
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
      const i = await Mu(n, this.clientMetadata, await this.getClientAuth(), t, {
        ...this.httpOptions(),
        [Ge]: this.fetch,
        [Ue]: this.allowInsecureRequests
      });
      let a;
      try {
        a = await Ju(n, this.clientMetadata, i);
      } catch (o) {
        return [
          new Aa({
            cause: new kt({
              code: o.error,
              message: o.error_description
            }),
            message: "An error occured while pushing the authorization request."
          }),
          null
        ];
      }
      return s.searchParams.set("request_uri", a.request_uri), s.searchParams.set("client_id", this.clientMetadata.client_id), [null, s];
    }
    return s.search = t.toString(), [null, s];
  }
  async getClientAuth() {
    if (!this.clientSecret && !this.clientAssertionSigningKey)
      throw new Error("The client secret or client assertion signing key must be provided.");
    let t = this.clientAssertionSigningKey;
    return t && !(t instanceof CryptoKey) && (t = await Pc(t, this.clientAssertionSigningAlg)), t ? Uu(t) : ku(this.clientSecret);
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
        new Pn(St.MISSING_REFRESH_TOKEN, "A refresh token was not present, Connection Access Token requires a refresh token. The user needs to re-authenticate."),
        null
      ];
    if (t.refreshToken && (!r || r.expiresAt <= Date.now() / 1e3)) {
      const s = new URLSearchParams();
      s.append("connection", n.connection), s.append("subject_token_type", Dl), s.append("subject_token", t.refreshToken), s.append("requested_token_type", Ul), n.login_hint && s.append("login_hint", n.login_hint);
      const [i, a] = await this.discoverAuthorizationServerMetadata();
      if (i)
        return console.error(i), [i, null];
      const o = await hl(a, this.clientMetadata, await this.getClientAuth(), kl, s, {
        [Ge]: this.fetch,
        [Ue]: this.allowInsecureRequests
      });
      let c;
      try {
        c = await pl(a, this.clientMetadata, o);
      } catch (u) {
        return console.error(u), [
          new Pn(St.FAILED_TO_EXCHANGE, "There was an error trying to exchange the refresh token for a connection access token. Check the server logs for more information.", new kt({
            code: u.error,
            message: u.error_description
          })),
          null
        ];
      }
      return [
        null,
        {
          accessToken: c.access_token,
          expiresAt: Math.floor(Date.now() / 1e3) + Number(c.expires_in),
          scope: c.scope,
          connection: n.connection
        }
      ];
    }
    return [null, r];
  }
}
const Hl = (e) => {
  const t = new TextEncoder().encode(e), r = 32768, n = [];
  for (let s = 0; s < t.length; s += r)
    n.push(
      // @ts-expect-error Argument of type 'Uint8Array' is not assignable to parameter of type 'number[]'.
      String.fromCharCode.apply(null, t.subarray(s, s + r))
    );
  return btoa(n.join(""));
};
function Jt(e) {
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
function Qi(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e.split(/; */)) {
    if (!r)
      continue;
    const n = r.indexOf("=");
    if (n === -1) {
      t.set(r, "true");
      continue;
    }
    const [s, i] = [r.slice(0, n), r.slice(n + 1)];
    try {
      t.set(s, decodeURIComponent(i ?? "true"));
    } catch {
    }
  }
  return t;
}
function Ml(e) {
  if (!e)
    return;
  const [[t, r], ...n] = Qi(e), {
    domain: s,
    expires: i,
    httponly: a,
    maxage: o,
    path: c,
    samesite: u,
    secure: d,
    partitioned: p,
    priority: w
  } = Object.fromEntries(
    n.map(([S, R]) => [
      S.toLowerCase().replace(/-/g, ""),
      R
    ])
  ), b = {
    name: t,
    value: decodeURIComponent(r),
    domain: s,
    ...i && { expires: new Date(i) },
    ...a && { httpOnly: !0 },
    ...typeof o == "string" && { maxAge: Number(o) },
    path: c,
    ...u && { sameSite: $l(u) },
    ...d && { secure: !0 },
    ...w && { priority: jl(w) },
    ...p && { partitioned: !0 }
  };
  return ql(b);
}
function ql(e) {
  const t = {};
  for (const r in e)
    e[r] && (t[r] = e[r]);
  return t;
}
var Wl = ["strict", "lax", "none"];
function $l(e) {
  return e = e.toLowerCase(), Wl.includes(e) ? e : void 0;
}
var Kl = ["low", "medium", "high"];
function jl(e) {
  return e = e.toLowerCase(), Kl.includes(e) ? e : void 0;
}
function Jl(e) {
  if (!e)
    return [];
  var t = [], r = 0, n, s, i, a, o;
  function c() {
    for (; r < e.length && /\s/.test(e.charAt(r)); )
      r += 1;
    return r < e.length;
  }
  function u() {
    return s = e.charAt(r), s !== "=" && s !== ";" && s !== ",";
  }
  for (; r < e.length; ) {
    for (n = r, o = !1; c(); )
      if (s = e.charAt(r), s === ",") {
        for (i = r, r += 1, c(), a = r; r < e.length && u(); )
          r += 1;
        r < e.length && e.charAt(r) === "=" ? (o = !0, r = a, t.push(e.substring(n, i)), n = r) : r = i + 1;
      } else
        r += 1;
    (!o || r >= e.length) && t.push(e.substring(n, e.length));
  }
  return t;
}
var Bl = class {
  constructor(e) {
    this._parsed = /* @__PURE__ */ new Map(), this._headers = e;
    const t = e.get("cookie");
    if (t) {
      const r = Qi(t);
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
      return r.map(([s, i]) => i);
    const n = typeof e[0] == "string" ? e[0] : (t = e[0]) == null ? void 0 : t.name;
    return r.filter(([s]) => s === n).map(([s, i]) => i);
  }
  has(e) {
    return this._parsed.has(e);
  }
  set(...e) {
    const [t, r] = e.length === 1 ? [e[0].name, e[0].value] : e, n = this._parsed;
    return n.set(t, { name: t, value: r }), this._headers.set(
      "cookie",
      Array.from(n).map(([s, i]) => Jt(i)).join("; ")
    ), this;
  }
  /**
   * Delete the cookies matching the passed name or names in the request.
   */
  delete(e) {
    const t = this._parsed, r = Array.isArray(e) ? e.map((n) => t.delete(n)) : t.delete(e);
    return this._headers.set(
      "cookie",
      Array.from(t).map(([n, s]) => Jt(s)).join("; ")
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
}, qn = class {
  constructor(e) {
    this._parsed = /* @__PURE__ */ new Map();
    var t, r, n;
    this._headers = e;
    const s = (n = (r = (t = e.getSetCookie) == null ? void 0 : t.call(e)) != null ? r : e.get("set-cookie")) != null ? n : [], i = Array.isArray(s) ? s : Jl(s);
    for (const a of i) {
      const o = Ml(a);
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
    return s.set(t, Fl({ name: t, value: r, ...n })), Gl(s, this._headers), this;
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
    return [...this._parsed.values()].map(Jt).join("; ");
  }
};
function Gl(e, t) {
  t.delete("set-cookie");
  for (const [, r] of e) {
    const n = Jt(r);
    t.append("set-cookie", n);
  }
}
function Fl(e = { name: "", value: "" }) {
  return typeof e.expires == "number" && (e.expires = new Date(e.expires)), e.maxAge && (e.expires = new Date(Date.now() + e.maxAge * 1e3)), (e.path === null || e.path === void 0) && (e.path = "/"), e;
}
const Xl = () => {
  if (typeof globalThis < "u")
    return globalThis;
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  throw new Error("unable to locate global object");
}, zl = async (e, t, r, n, s) => {
  const { crypto: { subtle: i } } = Xl();
  return new Uint8Array(await i.deriveBits({
    name: "HKDF",
    hash: `SHA-${e.substr(3)}`,
    salt: r,
    info: n
  }, await i.importKey("raw", t, "HKDF", !1, ["deriveBits"]), s << 3));
};
function Vl(e) {
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
function hs(e, t) {
  if (typeof e == "string")
    return new TextEncoder().encode(e);
  if (!(e instanceof Uint8Array))
    throw new TypeError(`"${t}"" must be an instance of Uint8Array or a string`);
  return e;
}
function Yl(e) {
  const t = hs(e, "ikm");
  if (!t.byteLength)
    throw new TypeError('"ikm" must be at least one byte in length');
  return t;
}
function Zl(e) {
  const t = hs(e, "info");
  if (t.byteLength > 1024)
    throw TypeError('"info" must not contain more than 1024 bytes');
  return t;
}
function Ql(e, t) {
  if (!Number.isInteger(e) || e < 1)
    throw new TypeError('"keylen" must be a positive integer');
  const r = parseInt(t.substr(3), 10) >> 3 || 20;
  if (e > 255 * r)
    throw new TypeError('"keylen" too large');
  return e;
}
async function ps(e, t, r, n, s) {
  return zl(Vl(e), Yl(t), hs(r, "salt"), Zl(n), Ql(s, e));
}
const ed = "A256GCM", td = "dir", eo = "sha256", ms = 32, to = "JWE CEK";
async function Bt(e, t, r) {
  const n = await ps(eo, t, "", to, ms);
  return (await new eu(e).setProtectedHeader({ enc: ed, alg: td, ...r }).encrypt(n)).toString();
}
async function ft(e, t) {
  const r = await ps(eo, t, "", to, ms);
  return await Yc(e, r, {});
}
const rd = (e) => ps("sha256", e, "", "JWS Cookie Signing", ms);
async function nd(e, t, r) {
  if (!t)
    return;
  const [n, s] = t.split("."), i = {
    protected: lu(JSON.stringify({ alg: "HS256", b64: !1, crit: ["b64"] })),
    payload: `${e}=${n}`,
    signature: s
  }, a = await rd(r);
  try {
    return await Li(i, a, {
      algorithms: ["HS256"]
    }), n;
  } catch {
    return;
  }
}
const Qr = 3500, Gt = "__", sd = new RegExp(`${Gt}(\\d+)$`), en = (e) => {
  const t = sd.exec(e);
  if (t)
    return parseInt(t[1], 10);
}, Ft = (e, t) => {
  const r = new RegExp(`^${t}${Gt}\\d+$`);
  return e.getAll().filter((n) => r.test(n.name));
};
function ad(e, t, r, n, s) {
  if (new TextEncoder().encode(t).length <= Qr) {
    s.set(e, t, r), n.set(e, t), Ft(n, e).forEach((d) => {
      s.delete(d.name), n.delete(d.name);
    });
    return;
  }
  let a = 0, o = 0;
  for (; a < t.length; ) {
    const d = t.slice(a, a + Qr), p = `${e}${Gt}${o}`;
    s.set(p, d, r), n.set(p, d), a += Qr, o++;
  }
  const u = Ft(n, e).length - o;
  if (u > 0)
    for (let d = 0; d < u; d++) {
      const p = o + d, w = `${e}${Gt}${p}`;
      s.delete(w), n.delete(w);
    }
  s.delete(e), n.delete(e);
}
function Da(e, t) {
  const r = t.get(e);
  if (r != null && r.value)
    return r.value;
  const n = Ft(t, e).sort(
    // Extract index from cookie name and sort numerically
    (i, a) => en(i.name) - en(a.name)
  );
  if (n.length === 0)
    return;
  const s = en(n[n.length - 1].name);
  if (n.length !== s + 1) {
    console.warn(`Incomplete chunked cookie '${e}': Found ${n.length} chunks, expected ${s + 1}`);
    return;
  }
  return n.map((i) => i.value).join("");
}
function Ua(e, t, r) {
  r.delete(e), Ft(t, e).forEach((n) => {
    r.delete(n.name);
  });
}
const id = "__session";
class ro {
  constructor({
    secret: t,
    rolling: r = !0,
    absoluteDuration: n = 60 * 60 * 24 * 3,
    // 3 days in seconds
    inactivityDuration: s = 60 * 60 * 24 * 1,
    // 1 day in seconds
    store: i,
    cookieOptions: a
  }) {
    this.secret = t, this.rolling = r, this.absoluteDuration = n, this.inactivityDuration = s, this.store = i, this.sessionCookieName = (a == null ? void 0 : a.name) ?? id, this.cookieConfig = {
      httpOnly: !0,
      sameSite: (a == null ? void 0 : a.sameSite) ?? "lax",
      secure: (a == null ? void 0 : a.secure) ?? !1,
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
const wt = "appSession";
function od(e) {
  if (e.protectedHeader.iat) {
    const t = e;
    return no(t.protectedHeader, t.payload);
  }
  return e.payload;
}
function cd(e) {
  var t;
  if ((t = e.header) != null && t.iat) {
    const r = e;
    return no(r.header, r.data);
  }
  return e;
}
function no(e, t) {
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
const La = () => {
  const e = new Uint8Array(16);
  return crypto.getRandomValues(e), Array.from(e).map((t) => t.toString(16).padStart(2, "0")).join("");
};
class ud extends ro {
  constructor({ secret: t, store: r, rolling: n, absoluteDuration: s, inactivityDuration: i, cookieOptions: a }) {
    super({
      secret: t,
      rolling: n,
      absoluteDuration: s,
      inactivityDuration: i,
      cookieOptions: a
    }), this.store = r;
  }
  async get(t) {
    const r = t.get(this.sessionCookieName) || t.get(wt);
    if (!r || !r.value)
      return null;
    let n = null;
    try {
      const { payload: i } = await ft(r.value, this.secret);
      n = i.id;
    } catch (i) {
      if (i.code === "ERR_JWE_INVALID") {
        const a = await nd(r.name, r.value, this.secret);
        if (!a)
          return null;
        n = a;
      }
    }
    if (!n)
      return null;
    const s = await this.store.get(n);
    return s ? cd(s) : null;
  }
  async set(t, r, n, s = !1) {
    var u;
    let i = null;
    const a = (u = t.get(this.sessionCookieName)) == null ? void 0 : u.value;
    if (a) {
      const { payload: d } = await ft(a, this.secret);
      i = d.id;
    }
    i && s && (await this.store.delete(i), i = La()), i || (i = La());
    const o = await Bt({
      id: i
    }, this.secret), c = this.calculateMaxAge(n.internal.createdAt);
    r.set(this.sessionCookieName, o.toString(), {
      ...this.cookieConfig,
      maxAge: c
    }), await this.store.set(i, n), t.set(this.sessionCookieName, o.toString()), t.has(wt) && r.delete(wt);
  }
  async delete(t, r) {
    var i;
    const n = (i = t.get(this.sessionCookieName)) == null ? void 0 : i.value;
    if (await r.delete(this.sessionCookieName), !n)
      return;
    const { payload: s } = await ft(n, this.secret);
    await this.store.delete(s.id);
  }
}
class ld extends ro {
  constructor({ secret: t, rolling: r, absoluteDuration: n, inactivityDuration: s, cookieOptions: i }) {
    super({
      secret: t,
      rolling: r,
      absoluteDuration: n,
      inactivityDuration: s,
      cookieOptions: i
    }), this.connectionTokenSetsCookieName = "__FC";
  }
  async get(t) {
    const r = Da(this.sessionCookieName, t) ?? Da(wt, t);
    if (!r)
      return null;
    const n = await ft(r, this.secret), s = od(n), i = await Promise.all(this.getConnectionTokenSetsCookies(t).map((a) => ft(a.value, this.secret)));
    return {
      ...s,
      // Ensure that when there are no connection token sets, we omit the property.
      ...i.length ? { connectionTokenSets: i.map((a) => a.payload) } : {}
    };
  }
  /**
   * save adds the encrypted session cookie as a `Set-Cookie` header.
   */
  async set(t, r, n) {
    const { connectionTokenSets: s, ...i } = n, a = await Bt(i, this.secret), o = this.calculateMaxAge(n.internal.createdAt), c = a.toString(), u = {
      ...this.cookieConfig,
      maxAge: o
    };
    ad(this.sessionCookieName, c, u, t, r), s != null && s.length && await Promise.all(s.map((d, p) => this.storeInCookie(t, r, d, `${this.connectionTokenSetsCookieName}_${p}`, o))), Ua(wt, t, r);
  }
  async delete(t, r) {
    Ua(this.sessionCookieName, t, r), this.getConnectionTokenSetsCookies(t).forEach((n) => r.delete(n.name));
  }
  async storeInCookie(t, r, n, s, i) {
    const a = await Bt(n, this.secret), o = a.toString();
    r.set(s, a.toString(), {
      ...this.cookieConfig,
      maxAge: i
    }), t.set(s, o);
    const c = new qn(new Headers());
    c.set(s, o, {
      ...this.cookieConfig,
      maxAge: i
    }), new TextEncoder().encode(c.toString()).length >= 4096 && (s === this.sessionCookieName ? console.warn(`The ${s} cookie size exceeds 4096 bytes, which may cause issues in some browsers. Consider removing any unnecessary custom claims from the access token or the user profile. Alternatively, you can use a stateful session implementation to store the session data in a data store.`) : console.warn(`The ${s} cookie size exceeds 4096 bytes, which may cause issues in some browsers. You can use a stateful session implementation to store the session data in a data store.`));
  }
  getConnectionTokenSetsCookies(t) {
    return t.getAll().filter((r) => r.name.startsWith(this.connectionTokenSetsCookieName));
  }
}
const dd = "__txn_";
class fd {
  constructor({ secret: t, cookieOptions: r }) {
    this.secret = t, this.transactionCookiePrefix = (r == null ? void 0 : r.prefix) ?? dd, this.cookieConfig = {
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
    const n = await Bt(r, this.secret);
    if (!r.state)
      throw new Error("Transaction state is required");
    t.set(this.getTransactionCookieName(r.state), n.toString(), this.cookieConfig);
  }
  async get(t, r) {
    var i;
    const n = this.getTransactionCookieName(r), s = (i = t.get(n)) == null ? void 0 : i.value;
    return s ? ft(s, this.secret) : null;
  }
  async delete(t, r) {
    await t.delete(this.getTransactionCookieName(r));
  }
}
class hd {
  constructor(t = {}) {
    var p, w, b, S, R, g, y, h, l;
    const { domain: r, clientId: n, clientSecret: s, appBaseUrl: i, secret: a, clientAssertionSigningKey: o } = this.validateAndExtractRequiredOptions(t), c = t.clientAssertionSigningAlg || process.env.AUTH0_CLIENT_ASSERTION_SIGNING_ALG, u = {
      name: ((w = (p = t.session) == null ? void 0 : p.cookie) == null ? void 0 : w.name) ?? "__session",
      secure: ((S = (b = t.session) == null ? void 0 : b.cookie) == null ? void 0 : S.secure) ?? !1,
      sameSite: ((g = (R = t.session) == null ? void 0 : R.cookie) == null ? void 0 : g.sameSite) ?? "lax"
    }, d = {
      prefix: ((y = t.transactionCookie) == null ? void 0 : y.prefix) ?? "__txn_",
      secure: ((h = t.transactionCookie) == null ? void 0 : h.secure) ?? !1,
      sameSite: ((l = t.transactionCookie) == null ? void 0 : l.sameSite) ?? "lax"
    };
    if (i) {
      const { protocol: E } = new URL(i);
      E === "https:" && (u.secure = !0, d.secure = !0);
    }
    this.transactionStore = new fd({
      ...t.session,
      secret: a,
      cookieOptions: d
    }), this.sessionStore = t.sessionStore ? new ud({
      ...t.session,
      secret: a,
      store: t.sessionStore,
      cookieOptions: u
    }) : new ld({
      ...t.session,
      secret: a,
      cookieOptions: u
    }), this.authClient = new Ll({
      transactionStore: this.transactionStore,
      sessionStore: this.sessionStore,
      domain: r,
      clientId: n,
      clientSecret: s,
      clientAssertionSigningKey: o,
      clientAssertionSigningAlg: c,
      authorizationParameters: t.authorizationParameters,
      pushedAuthorizationRequests: t.pushedAuthorizationRequests,
      appBaseUrl: i,
      secret: a,
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
    return t ? t instanceof B.NextRequest ? this.sessionStore.get(t.cookies) : this.sessionStore.get(this.createRequestCookies(t)) : this.sessionStore.get(await _t.cookies());
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
      throw new Tn(lt.MISSING_SESSION, "The user does not have an active session.");
    const [s, i] = await this.authClient.getTokenSet(n.tokenSet);
    if (s)
      throw s;
    return (i.accessToken !== n.tokenSet.accessToken || i.expiresAt !== n.tokenSet.expiresAt || i.refreshToken !== n.tokenSet.refreshToken) && await this.saveToSession({
      ...n,
      tokenSet: i
    }, t, r), {
      token: i.accessToken,
      scope: i.scope,
      expiresAt: i.expiresAt
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
    var c, u;
    const s = r ? await this.getSession(r) : await this.getSession();
    if (!s)
      throw new Pn(St.MISSING_SESSION, "The user does not have an active session.");
    const i = (c = s.connectionTokenSets) == null ? void 0 : c.find((d) => d.connection === t.connection), [a, o] = await this.authClient.getConnectionTokenSet(s.tokenSet, i, t);
    if (a !== null)
      throw a;
    if (o && (!i || o.accessToken !== i.accessToken || o.expiresAt !== i.expiresAt || o.scope !== i.scope)) {
      let d;
      i ? d = (u = s.connectionTokenSets) == null ? void 0 : u.map((p) => p.connection === t.connection ? o : p) : d = [...s.connectionTokenSets || [], o], await this.saveToSession({
        ...s,
        connectionTokenSets: d
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
      if (s instanceof B.NextRequest && r instanceof B.NextResponse) {
        const i = await this.getSession(s);
        if (!i)
          throw new Error("The user is not authenticated.");
        await this.sessionStore.set(s.cookies, r.cookies, {
          ...n,
          internal: {
            ...i.internal
          }
        });
      } else {
        const i = await this.getSession(s);
        if (!i)
          throw new Error("The user is not authenticated.");
        const a = new Headers(), o = new qn(a), c = n, u = this.createRequestCookies(s), d = r;
        await this.sessionStore.set(u, o, {
          ...c,
          internal: {
            ...i.internal
          }
        });
        for (const [p, w] of a.entries())
          d.setHeader(p, w);
      }
    } else {
      const s = await this.getSession();
      if (!s)
        throw new Error("The user is not authenticated.");
      const i = t;
      if (!i)
        throw new Error("The session data is missing.");
      await this.sessionStore.set(await _t.cookies(), await _t.cookies(), {
        ...i,
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
    return new Bl(r);
  }
  async startInteractiveLogin(t) {
    return this.authClient.startInteractiveLogin(t);
  }
  async saveToSession(t, r, n) {
    if (r && n)
      if (r instanceof B.NextRequest && n instanceof B.NextResponse)
        await this.sessionStore.set(r.cookies, n.cookies, t);
      else {
        const s = new Headers(), i = new qn(s), a = n;
        await this.sessionStore.set(this.createRequestCookies(r), i, t);
        for (const [o, c] of s.entries())
          a.setHeader(o, c);
      }
    else
      try {
        await this.sessionStore.set(await _t.cookies(), await _t.cookies(), t);
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
    }, n = t.clientSecret ?? process.env.AUTH0_CLIENT_SECRET, s = t.clientAssertionSigningKey ?? process.env.AUTH0_CLIENT_ASSERTION_SIGNING_KEY, i = !!(n || s), a = Object.entries(r).filter(([, c]) => !c).map(([c]) => c);
    if (i || a.push("clientAuthentication"), a.length) {
      const c = {
        domain: "AUTH0_DOMAIN",
        clientId: "AUTH0_CLIENT_ID",
        appBaseUrl: "APP_BASE_URL",
        secret: "AUTH0_SECRET"
      };
      throw new Zo(On.MISSING_REQUIRED_OPTIONS, a, c);
    }
    return {
      ...r,
      clientSecret: n,
      clientAssertionSigningKey: s
    };
  }
}
var tn, Ha;
function Wn() {
  if (Ha) return tn;
  Ha = 1;
  class e extends Error {
    constructor(r, ...n) {
      super(`env-var: ${r}`, ...n), Error.captureStackTrace && Error.captureStackTrace(this, e), this.name = "EnvVarError";
    }
  }
  return tn = e, tn;
}
var rn, Ma;
function Pt() {
  return Ma || (Ma = 1, rn = function(t) {
    return t;
  }), rn;
}
var nn, qa;
function pd() {
  if (qa) return nn;
  qa = 1;
  const e = Pt();
  return nn = function(r, n) {
    return n = n || ",", r.length ? e(r).split(n).filter(Boolean) : [];
  }, nn;
}
var sn, Wa;
function md() {
  return Wa || (Wa = 1, sn = function(t) {
    const r = t.toLowerCase();
    if (r !== "false" && r !== "true")
      throw new Error('should be either "true", "false", "TRUE", or "FALSE"');
    return r !== "false";
  }), sn;
}
var an, $a;
function gd() {
  return $a || ($a = 1, an = function(t) {
    const r = t.toLowerCase();
    if ([
      "false",
      "0",
      "true",
      "1"
    ].indexOf(r) === -1)
      throw new Error('should be either "true", "false", "TRUE", "FALSE", 1, or 0');
    return !(r === "0" || r === "false");
  }), an;
}
var on, Ka;
function gs() {
  return Ka || (Ka = 1, on = function(t) {
    const r = parseInt(t, 10);
    if (isNaN(r) || r.toString(10) !== t)
      throw new Error("should be a valid integer");
    return r;
  }), on;
}
var cn, ja;
function so() {
  if (ja) return cn;
  ja = 1;
  const e = gs();
  return cn = function(r) {
    const n = e(r);
    if (n < 0)
      throw new Error("should be a positive integer");
    return n;
  }, cn;
}
var un, Ja;
function _d() {
  if (Ja) return un;
  Ja = 1;
  const e = so();
  return un = function(r) {
    var n = e(r);
    if (n > 65535)
      throw new Error("cannot assign a port number greater than 65535");
    return n;
  }, un;
}
var ln, Ba;
function yd() {
  if (Ba) return ln;
  Ba = 1;
  const e = Pt();
  return ln = function(r, n) {
    const s = e(r);
    if (n.indexOf(s) < 0)
      throw new Error(`should be one of [${n.join(", ")}]`);
    return s;
  }, ln;
}
var dn, Ga;
function _s() {
  return Ga || (Ga = 1, dn = function(t) {
    const r = parseFloat(t);
    if (isNaN(r) || isNaN(t))
      throw new Error("should be a valid float");
    return r;
  }), dn;
}
var fn, Fa;
function Ed() {
  if (Fa) return fn;
  Fa = 1;
  const e = _s();
  return fn = function(r) {
    const n = e(r);
    if (n > 0)
      throw new Error("should be a negative float");
    return n;
  }, fn;
}
var hn, Xa;
function wd() {
  if (Xa) return hn;
  Xa = 1;
  const e = _s();
  return hn = function(r) {
    const n = e(r);
    if (n < 0)
      throw new Error("should be a positive float");
    return n;
  }, hn;
}
var pn, za;
function bd() {
  if (za) return pn;
  za = 1;
  const e = gs();
  return pn = function(r) {
    const n = e(r);
    if (n > 0)
      throw new Error("should be a negative integer");
    return n;
  }, pn;
}
var mn, Va;
function ys() {
  return Va || (Va = 1, mn = function(t) {
    try {
      return JSON.parse(t);
    } catch {
      throw new Error("should be valid (parseable) JSON");
    }
  }), mn;
}
var gn, Ya;
function Sd() {
  if (Ya) return gn;
  Ya = 1;
  const e = ys();
  return gn = function(r) {
    var n = e(r);
    if (!Array.isArray(n))
      throw new Error("should be a parseable JSON Array");
    return n;
  }, gn;
}
var _n, Za;
function Ad() {
  if (Za) return _n;
  Za = 1;
  const e = ys();
  return _n = function(r) {
    var n = e(r);
    if (Array.isArray(n))
      throw new Error("should be a parseable JSON Object");
    return n;
  }, _n;
}
var yn, Qa;
function Rd() {
  return Qa || (Qa = 1, yn = function(t, r) {
    try {
      RegExp(void 0, r);
    } catch {
      throw new Error("invalid regexp flags");
    }
    try {
      return new RegExp(t, r);
    } catch {
      throw new Error("should be a valid regexp");
    }
  }), yn;
}
var En, ei;
function ao() {
  if (ei) return En;
  ei = 1;
  const e = Pt();
  return En = function(r) {
    const n = e(r);
    try {
      return new URL(n);
    } catch {
      throw new Error("should be a valid URL");
    }
  }, En;
}
var wn, ti;
function vd() {
  if (ti) return wn;
  ti = 1;
  const e = ao();
  return wn = function(r) {
    return e(r).toString();
  }, wn;
}
var bn, ri;
function Td() {
  if (ri) return bn;
  ri = 1;
  const e = Pt(), t = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\u0001-\u0008\u000b\u000c\u000e-\u001f\u0021\u0023-\u005b\u005d-\u007f]|\\[\u0001-\u0009\u000b\u000c\u000e-\u007f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\u0001-\u0008\u000b\u000c\u000e-\u001f\u0021-\u005a\u0053-\u007f]|\\[\u0001-\u0009\u000b\u000c\u000e-\u007f])+)\])$/;
  return bn = function(n) {
    const s = e(n);
    if (!t.test(s))
      throw new Error("should be a valid email address");
    return s;
  }, bn;
}
var Sn, ni;
function io() {
  return ni || (ni = 1, Sn = {
    asArray: pd(),
    asBoolStrict: md(),
    asBool: gd(),
    asPortNumber: _d(),
    asEnum: yd(),
    asFloatNegative: Ed(),
    asFloatPositive: wd(),
    asFloat: _s(),
    asIntNegative: bd(),
    asIntPositive: so(),
    asInt: gs(),
    asJsonArray: Sd(),
    asJsonObject: Ad(),
    asJson: ys(),
    asRegExp: Rd(),
    asString: Pt(),
    asUrlObject: ao(),
    asUrlString: vd(),
    asEmailString: Td()
  }), Sn;
}
var An, si;
function Pd() {
  if (si) return An;
  si = 1;
  const e = Wn(), t = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
  return An = function(n, s, i, a) {
    let o = !1, c = !1, u, d;
    const p = io();
    function w(g) {
      a(s, g);
    }
    function b(g, y) {
      let h = `"${s}" ${y}`;
      throw g && (h = `${h}`), d && (h = `${h}. An example of a valid value would be: ${d}`), new e(h);
    }
    function S(g) {
      return function() {
        let y = n[s];
        if (w(`will be read from the environment using "${g.name}" accessor`), typeof y > "u")
          if (typeof u > "u" && c)
            w("was not found in the environment, but is required to be set"), b(void 0, "is a required variable, but it was not set");
          else if (typeof u < "u")
            w(`was not found in the environment, parsing default value "${u}" instead`), y = u;
          else {
            w("was not found in the environment, but is not required. returning undefined");
            return;
          }
        c && (w("verifying variable value is not an empty string"), y.trim().length === 0 && b(void 0, "is a required variable, but its value was empty")), o && (w("verifying variable is a valid base64 string"), y.match(t) || b(y, "should be a valid base64 string if using convertFromBase64"), w("converting from base64 to utf8 string"), y = Buffer.from(y, "base64").toString());
        const h = [y].concat(Array.prototype.slice.call(arguments));
        try {
          w(`passing value "${y}" to "${g.name}" accessor`);
          const l = g.apply(
            g,
            h
          );
          return w(`parsed successfully, returning ${l}`), l;
        } catch (l) {
          b(y, l.message);
        }
      };
    }
    const R = {
      /**
       * Instructs env-var to first convert the value of the variable from base64
       * when reading it using a function such as asString()
       */
      convertFromBase64: function() {
        return w("marking for base64 conversion"), o = !0, R;
      },
      /**
       * Set a default value for the variable
       * @param {String} value
       */
      default: function(g) {
        if (typeof g == "number")
          u = g.toString();
        else if (Array.isArray(g) || typeof g == "object" && g !== null)
          u = JSON.stringify(g);
        else {
          if (typeof g != "string")
            throw new e("values passed to default() must be of Number, String, Array, or Object type");
          u = g;
        }
        return w(`setting default value to "${u}"`), R;
      },
      /**
       * Ensures a variable is set in the given environment container. Throws an
       * EnvVarError if the variable is not set or a default is not provided
       * @param {Boolean} required
       */
      required: function(g) {
        return typeof g > "u" ? (w("marked as required"), c = !0) : (w(`setting required flag to ${g}`), c = g), R;
      },
      /**
       * Set an example value for this variable. If the variable value is not set
       * or is set to an invalid value this example will be show in error output.
       * @param {String} example
       */
      example: function(g) {
        return d = g, R;
      }
    };
    return Object.entries({
      ...p,
      ...i
    }).forEach(([g, y]) => {
      R[g] = S(y);
    }), R;
  }, An;
}
var Rn, ai;
function Od() {
  return ai || (ai = 1, Rn = function(t, r) {
    return function(s, i) {
      (!r || !r.match(/prod|production/)) && t(`env-var (${s}): ${i}`);
    };
  }), Rn;
}
var vn, ii;
function Cd() {
  if (ii) return vn;
  ii = 1;
  const e = Pd(), t = Wn(), r = (s, i, a) => ({
    from: r,
    /**
     * This is the Error class used to generate exceptions. Can be used to identify
     * exceptions and handle them appropriately.
     */
    EnvVarError: Wn(),
    /**
     * Returns a variable instance with helper functions, or process.env
     * @param  {String} variableName Name of the environment variable requested
     * @return {Object}
     */
    get: function(o) {
      if (!o)
        return s;
      if (arguments.length > 1)
        throw new t("It looks like you passed more than one argument to env.get(). Since env-var@6.0.0 this is no longer supported. To set a default value use env.get(TARGET).default(DEFAULT)");
      return e(s, o, i || {}, a || function() {
      });
    },
    /**
     * Provides access to the functions that env-var uses to parse
     * process.env strings into valid types requested by the API
     */
    accessors: io(),
    /**
     * Provides a default logger that can be used to print logs.
     * This will not print logs in a production environment (checks process.env.NODE_ENV)
     */
    logger: Od()(console.log, s.NODE_ENV)
  });
  function n() {
    try {
      return process.env;
    } catch {
      return {};
    }
  }
  return vn = r(n()), vn;
}
var oo = Cd();
const F = oo.from({
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_E2E_PASSWORD: process.env.AUTH0_E2E_PASSWORD,
  AUTH0_E2E_USERNAME: process.env.AUTH0_E2E_USERNAME,
  AUTH0_SECRET: process.env.AUTH0_SECRET,
  AUTH0_SESSION_AUTO_SAVE: process.env.AUTH0_SESSION_AUTO_SAVE,
  CI: process.env.CI,
  CIRCLE: process.env.CIRCLE,
  E2E: process.env.E2E,
  MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY,
  MAILCHIMP_LIST_ID: process.env.MAILCHIMP_LIST_ID,
  MAILCHIMP_SERVER_PREFIX: process.env.MAILCHIMP_SERVER_PREFIX,
  NEO4J_PASSWORD: process.env.NEO4J_PASSWORD,
  NEO4J_URI: process.env.NEO4J_URI,
  NEO4J_USER: process.env.NEO4J_USER,
  NEXT_PUBLIC_API_HOSTNAME: process.env.NEXT_PUBLIC_API_HOSTNAME,
  NEXT_PUBLIC_API_PORT: process.env.NEXT_PUBLIC_API_PORT,
  NEXT_PUBLIC_BASE_API_PATH: process.env.NEXT_PUBLIC_BASE_API_PATH,
  NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
  NEXT_PUBLIC_HOTJAR_ID: process.env.NEXT_PUBLIC_HOTJAR_ID,
  NEXT_PUBLIC_HOTJAR_VERSION: process.env.NEXT_PUBLIC_HOTJAR_VERSION,
  NEXT_PUBLIC_INTERCOM_APP_ID: process.env.NEXT_PUBLIC_INTERCOM_APP_ID,
  NEXT_PUBLIC_WEB_HOST: process.env.NEXT_PUBLIC_WEB_HOST,
  NODE_ENV: process.env.NODE_ENV
});
class Id {
  constructor(t) {
    x(this, "_audience");
    x(this, "_auth0Domain");
    x(this, "_clientId");
    x(this, "_clientSecret");
    x(this, "_e2eUsername");
    x(this, "_e2ePassword");
    x(this, "_issuerBaseUrl");
    x(this, "_secret");
    x(this, "_sessionAutoSave");
    this.endpoint = t;
  }
  get audience() {
    return this._audience ?? (this._audience = new URL(
      "api/v2/",
      this.issuerBaseUrl
    ).toString());
  }
  get domain() {
    return this._auth0Domain ?? (this._auth0Domain = F.get("AUTH0_DOMAIN").required().asString());
  }
  get clientId() {
    return this._clientId ?? (this._clientId = F.get("AUTH0_CLIENT_ID").required().asString());
  }
  get clientSecret() {
    return this._clientSecret ?? (this._clientSecret = F.get("AUTH0_CLIENT_SECRET").required().asString());
  }
  get auth0Username() {
    return this._e2eUsername ?? (this._e2eUsername = F.get("AUTH0_E2E_USERNAME").required().asString());
  }
  get auth0Password() {
    return this._e2ePassword ?? (this._e2ePassword = F.get("AUTH0_E2E_PASSWORD").required().asString());
  }
  get issuerBaseUrl() {
    const t = new URL("/", `https://${this.domain}`).toString();
    return this._issuerBaseUrl ?? (this._issuerBaseUrl = t);
  }
  get secret() {
    return this._secret ?? (this._secret = F.get("AUTH0_SECRET").required().asString());
  }
  get sessionAutoSave() {
    return this._sessionAutoSave ?? (this._sessionAutoSave = F.get("AUTH0_SESSION_AUTO_SAVE").required().asBool());
  }
  get baseUrl() {
    return this.endpoint.webHost;
  }
}
class xd {
  constructor() {
    // Vercel uses '1'
    // Others may use 'true'
    x(this, "_ci");
    x(this, "_circleCi");
  }
  get ci() {
    return this._ci ?? (this._ci = F.get("CI").default("false").asBool());
  }
  get circleCi() {
    return this._circleCi ?? (this._circleCi = F.get("CIRCLE").default("false").asBool());
  }
}
class Nd {
  constructor() {
    x(this, "_apiHost");
    x(this, "_webHost");
  }
  get admin() {
    const t = `${this.baseApiPath}/admin/export`, r = `${this.baseApiPath}/admin/import`, n = `${this.baseApiPath}/admin/reset-database`, s = `${this.baseApiPath}/admin/setup-dev`;
    return {
      export: new URL(t, this.apiUrl).toString(),
      import: new URL(r, this.apiUrl).toString(),
      resetDatabase: new URL(n, this.apiUrl).toString(),
      setupDev: new URL(s, this.apiUrl).toString()
    };
  }
  /**
   * http://127.0.0.1:4000/api/v1/graphql
   */
  get apiGraphqlUrl() {
    return new URL(`${this.baseApiPath}/graphql`, this.apiHost).toString();
  }
  /**
   * http://127.0.0.1:4000
   */
  get apiHost() {
    if (this._apiHost)
      return this._apiHost;
    const t = F.get("NEXT_PUBLIC_API_PORT").required().asPortNumber(), r = F.get("NEXT_PUBLIC_API_HOSTNAME").required().asUrlObject();
    return this._apiHost = new URL(`${r.origin}:${t}`).toString();
  }
  get apiUrl() {
    return new URL(this.baseApiPath, this.webHost).toString();
  }
  get app() {
    const t = `${this.baseApiPath}/app/export`, r = `${this.baseApiPath}/app/import`;
    return {
      export: new URL(t, this.webHost).toString(),
      import: new URL(r, this.webHost).toString()
    };
  }
  get baseApiPath() {
    return F.get("NEXT_PUBLIC_BASE_API_PATH").required().asString();
  }
  /**
   * URL is protocol + origin
   */
  get canActivateUrl() {
    return new URL(`${this.baseApiPath}/can-activate`, this.webHost).toString();
  }
  get component() {
    const t = `${this.baseApiPath}/component/export`, r = `${this.baseApiPath}/component/import`;
    return {
      export: new URL(t, this.webHost).toString(),
      import: new URL(r, this.webHost).toString()
    };
  }
  get isLocal() {
    return this.webGraphqlUrl.includes("127.0.0.1");
  }
  get regenerate() {
    return new URL(`${this.baseApiPath}/regenerate`, this.apiUrl).toString();
  }
  get user() {
    const t = `${this.baseApiPath}/user/save`;
    return {
      save: new URL(t, this.apiUrl).toString()
    };
  }
  /**
   * URL is protocol + origin
   *
   * This uses the Next.js proxy middleware
   */
  get webGraphqlUrl() {
    return new URL(`${this.baseApiPath}/graphql`, this.webHost).toString();
  }
  /**
   * This is used before module is initialized, so we must access process.env
   */
  get webHost() {
    return this._webHost ?? (this._webHost = F.get("NEXT_PUBLIC_WEB_HOST").required().asString());
  }
}
class kd {
  constructor() {
    x(this, "id");
    this.id = F.get("NEXT_PUBLIC_GOOGLE_ANALYTICS").default("").asString();
  }
}
class Dd {
  constructor() {
    x(this, "id");
    x(this, "version");
    this.id = F.get("NEXT_PUBLIC_HOTJAR_ID").default("0").asInt(), this.version = F.get("NEXT_PUBLIC_HOTJAR_VERSION").default("0").asInt();
  }
}
class Ud {
  constructor() {
    x(this, "appId");
    this.appId = F.get("NEXT_PUBLIC_INTERCOM_APP_ID").default("").asString();
  }
}
class Ld {
  constructor() {
    x(this, "apiKey");
    x(this, "listId");
    x(this, "serverPrefix");
    this.apiKey = F.get("MAILCHIMP_API_KEY").required().asString(), this.listId = F.get("MAILCHIMP_LIST_ID").required().asString(), this.serverPrefix = F.get("MAILCHIMP_SERVER_PREFIX").required().asString();
  }
}
class Hd {
  constructor() {
    x(this, "_password");
    x(this, "_uri");
    x(this, "_user");
  }
  get password() {
    return this._password ?? (this._password = F.get("NEO4J_PASSWORD").required().asString());
  }
  get uri() {
    return this._uri ?? (this._uri = F.get("NEO4J_URI").required().asUrlString());
  }
  get user() {
    return this._user ?? (this._user = F.get("NEO4J_USER").required().asString());
  }
}
class Md {
  constructor() {
    x(this, "_nodeEnv");
  }
  get isCi() {
    return F.get("CI").default("false").asBool();
  }
  get isDevelopment() {
    return this.nodeEnv === "development";
  }
  get isProduction() {
    return this.nodeEnv === "production";
  }
  get isTest() {
    return this.nodeEnv === "test";
  }
  get nodeEnv() {
    return this._nodeEnv ?? (this._nodeEnv = F.get("NODE_ENV").default("development").asEnum(["development", "production", "test"]));
  }
}
class qd {
  constructor() {
    x(this, "key");
    x(this, "url");
    this.key = process.env.NEXT_PUBLIC_SUPABASE_KEY || "", this.url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  }
}
const Fe = class Fe {
  constructor() {
    x(this, "_auth0");
    x(this, "_circleci");
    x(this, "_endpoint");
    x(this, "_googleAnalytics");
    x(this, "_hotjar");
    x(this, "_intercom");
    x(this, "_mailchimp");
    x(this, "_neo4j");
    x(this, "_node");
    x(this, "_supabase");
  }
  static getInstance() {
    return Fe.instance || (Fe.instance = new Fe()), Fe.instance;
  }
  get auth0() {
    return this._auth0 ?? (this._auth0 = new Id(this.endpoint));
  }
  get circleci() {
    return this._circleci ?? (this._circleci = new xd());
  }
  get endpoint() {
    return this._endpoint ?? (this._endpoint = new Nd());
  }
  get googleAnalytics() {
    return this._googleAnalytics ?? (this._googleAnalytics = new kd());
  }
  get hotjar() {
    return this._hotjar ?? (this._hotjar = new Dd());
  }
  get intercom() {
    return this._intercom ?? (this._intercom = new Ud());
  }
  get mailchimp() {
    return this._mailchimp ?? (this._mailchimp = new Ld());
  }
  get neo4j() {
    return this._neo4j ?? (this._neo4j = new Hd());
  }
  get node() {
    return this._node ?? (this._node = new Md());
  }
  get supabase() {
    return this._supabase ?? (this._supabase = new qd());
  }
};
x(Fe, "instance");
let $n = Fe;
const he = () => $n.getInstance(), Kd = new hd({
  appBaseUrl: he().auth0.baseUrl,
  authorizationParameters: {
    audience: he().auth0.audience
  },
  beforeSessionSaved: async (e, t) => ({
    ...e,
    user: {
      ...e.user
    }
  }),
  clientId: he().auth0.clientId,
  clientSecret: he().auth0.clientSecret,
  domain: he().auth0.domain,
  onCallback: async (e, t, r) => {
    var n;
    return e ? B.NextResponse.redirect(
      new URL(`/error?error=${e.message}`, he().auth0.baseUrl)
    ) : oo.get("SETUP_DEV_AFTER_AUTH0_LOGIN").asBool() ? (await fetch(he().endpoint.admin.setupDev, {
      body: JSON.stringify({}),
      headers: {
        Authorization: `Bearer ${r == null ? void 0 : r.tokenSet.accessToken}`
        // 'X-ID-TOKEN': session?.user['idToken'] ?? '',
      },
      method: "POST"
    }), B.NextResponse.redirect(
      new URL(t.returnTo || "/apps", he().auth0.baseUrl)
    )) : (n = process.env.NEXT_PUBLIC_WEB_HOST) != null && n.includes("codelab.app") ? (await fetch(he().endpoint.user.save, {
      body: JSON.stringify({}),
      headers: {
        Authorization: `Bearer ${r == null ? void 0 : r.tokenSet.accessToken}`
        // 'X-ID-TOKEN': session?.user['idToken'] ?? '',
      },
      method: "POST"
    }), B.NextResponse.redirect(
      new URL(t.returnTo || "/apps", he().auth0.baseUrl)
    )) : B.NextResponse.redirect(
      new URL(t.returnTo || "/apps", he().auth0.baseUrl)
    );
  },
  secret: he().auth0.secret,
  session: {},
  signInReturnToPath: "/apps"
});
export {
  Kd as auth0Instance
};
