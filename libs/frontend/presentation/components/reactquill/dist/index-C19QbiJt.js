import { c as me, g as ni } from "./index-C5VmDawy.js";
import ii from "react";
import oi from "react-dom";
var ke, ur;
function ai() {
  if (ur) return ke;
  ur = 1;
  function M() {
    this.__data__ = [], this.size = 0;
  }
  return ke = M, ke;
}
var Se, sr;
function Vn() {
  if (sr) return Se;
  sr = 1;
  function M(I, w) {
    return I === w || I !== I && w !== w;
  }
  return Se = M, Se;
}
var Ne, fr;
function _e() {
  if (fr) return Ne;
  fr = 1;
  var M = Vn();
  function I(w, c) {
    for (var s = w.length; s--; )
      if (M(w[s][0], c))
        return s;
    return -1;
  }
  return Ne = I, Ne;
}
var qe, cr;
function li() {
  if (cr) return qe;
  cr = 1;
  var M = _e(), I = Array.prototype, w = I.splice;
  function c(s) {
    var A = this.__data__, g = M(A, s);
    if (g < 0)
      return !1;
    var m = A.length - 1;
    return g == m ? A.pop() : w.call(A, g, 1), --this.size, !0;
  }
  return qe = c, qe;
}
var xe, hr;
function ui() {
  if (hr) return xe;
  hr = 1;
  var M = _e();
  function I(w) {
    var c = this.__data__, s = M(c, w);
    return s < 0 ? void 0 : c[s][1];
  }
  return xe = I, xe;
}
var Pe, dr;
function si() {
  if (dr) return Pe;
  dr = 1;
  var M = _e();
  function I(w) {
    return M(this.__data__, w) > -1;
  }
  return Pe = I, Pe;
}
var Re, vr;
function fi() {
  if (vr) return Re;
  vr = 1;
  var M = _e();
  function I(w, c) {
    var s = this.__data__, A = M(s, w);
    return A < 0 ? (++this.size, s.push([w, c])) : s[A][1] = c, this;
  }
  return Re = I, Re;
}
var Le, pr;
function Oe() {
  if (pr) return Le;
  pr = 1;
  var M = ai(), I = li(), w = ui(), c = si(), s = fi();
  function A(g) {
    var m = -1, p = g == null ? 0 : g.length;
    for (this.clear(); ++m < p; ) {
      var y = g[m];
      this.set(y[0], y[1]);
    }
  }
  return A.prototype.clear = M, A.prototype.delete = I, A.prototype.get = w, A.prototype.has = c, A.prototype.set = s, Le = A, Le;
}
var je, yr;
function ci() {
  if (yr) return je;
  yr = 1;
  var M = Oe();
  function I() {
    this.__data__ = new M(), this.size = 0;
  }
  return je = I, je;
}
var Ie, gr;
function hi() {
  if (gr) return Ie;
  gr = 1;
  function M(I) {
    var w = this.__data__, c = w.delete(I);
    return this.size = w.size, c;
  }
  return Ie = M, Ie;
}
var Me, mr;
function di() {
  if (mr) return Me;
  mr = 1;
  function M(I) {
    return this.__data__.get(I);
  }
  return Me = M, Me;
}
var De, br;
function vi() {
  if (br) return De;
  br = 1;
  function M(I) {
    return this.__data__.has(I);
  }
  return De = M, De;
}
var Ce, _r;
function Wn() {
  if (_r) return Ce;
  _r = 1;
  var M = typeof me == "object" && me && me.Object === Object && me;
  return Ce = M, Ce;
}
var Be, Or;
function de() {
  if (Or) return Be;
  Or = 1;
  var M = Wn(), I = typeof self == "object" && self && self.Object === Object && self, w = M || I || Function("return this")();
  return Be = w, Be;
}
var Fe, Er;
function or() {
  if (Er) return Fe;
  Er = 1;
  var M = de(), I = M.Symbol;
  return Fe = I, Fe;
}
var Ue, Ar;
function pi() {
  if (Ar) return Ue;
  Ar = 1;
  var M = or(), I = Object.prototype, w = I.hasOwnProperty, c = I.toString, s = M ? M.toStringTag : void 0;
  function A(g) {
    var m = w.call(g, s), p = g[s];
    try {
      g[s] = void 0;
      var y = !0;
    } catch {
    }
    var h = c.call(g);
    return y && (m ? g[s] = p : delete g[s]), h;
  }
  return Ue = A, Ue;
}
var He, Tr;
function yi() {
  if (Tr) return He;
  Tr = 1;
  var M = Object.prototype, I = M.toString;
  function w(c) {
    return I.call(c);
  }
  return He = w, He;
}
var Ke, wr;
function Ee() {
  if (wr) return Ke;
  wr = 1;
  var M = or(), I = pi(), w = yi(), c = "[object Null]", s = "[object Undefined]", A = M ? M.toStringTag : void 0;
  function g(m) {
    return m == null ? m === void 0 ? s : c : A && A in Object(m) ? I(m) : w(m);
  }
  return Ke = g, Ke;
}
var ze, kr;
function $n() {
  if (kr) return ze;
  kr = 1;
  function M(I) {
    var w = typeof I;
    return I != null && (w == "object" || w == "function");
  }
  return ze = M, ze;
}
var Ge, Sr;
function Zn() {
  if (Sr) return Ge;
  Sr = 1;
  var M = Ee(), I = $n(), w = "[object AsyncFunction]", c = "[object Function]", s = "[object GeneratorFunction]", A = "[object Proxy]";
  function g(m) {
    if (!I(m))
      return !1;
    var p = M(m);
    return p == c || p == s || p == w || p == A;
  }
  return Ge = g, Ge;
}
var Ve, Nr;
function gi() {
  if (Nr) return Ve;
  Nr = 1;
  var M = de(), I = M["__core-js_shared__"];
  return Ve = I, Ve;
}
var We, qr;
function mi() {
  if (qr) return We;
  qr = 1;
  var M = gi(), I = function() {
    var c = /[^.]+$/.exec(M && M.keys && M.keys.IE_PROTO || "");
    return c ? "Symbol(src)_1." + c : "";
  }();
  function w(c) {
    return !!I && I in c;
  }
  return We = w, We;
}
var $e, xr;
function Yn() {
  if (xr) return $e;
  xr = 1;
  var M = Function.prototype, I = M.toString;
  function w(c) {
    if (c != null) {
      try {
        return I.call(c);
      } catch {
      }
      try {
        return c + "";
      } catch {
      }
    }
    return "";
  }
  return $e = w, $e;
}
var Ze, Pr;
function bi() {
  if (Pr) return Ze;
  Pr = 1;
  var M = Zn(), I = mi(), w = $n(), c = Yn(), s = /[\\^$.*+?()[\]{}|]/g, A = /^\[object .+?Constructor\]$/, g = Function.prototype, m = Object.prototype, p = g.toString, y = m.hasOwnProperty, h = RegExp(
    "^" + p.call(y).replace(s, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function n(e) {
    if (!w(e) || I(e))
      return !1;
    var t = M(e) ? h : A;
    return t.test(c(e));
  }
  return Ze = n, Ze;
}
var Ye, Rr;
function _i() {
  if (Rr) return Ye;
  Rr = 1;
  function M(I, w) {
    return I == null ? void 0 : I[w];
  }
  return Ye = M, Ye;
}
var Xe, Lr;
function pe() {
  if (Lr) return Xe;
  Lr = 1;
  var M = bi(), I = _i();
  function w(c, s) {
    var A = I(c, s);
    return M(A) ? A : void 0;
  }
  return Xe = w, Xe;
}
var Qe, jr;
function ar() {
  if (jr) return Qe;
  jr = 1;
  var M = pe(), I = de(), w = M(I, "Map");
  return Qe = w, Qe;
}
var Je, Ir;
function Ae() {
  if (Ir) return Je;
  Ir = 1;
  var M = pe(), I = M(Object, "create");
  return Je = I, Je;
}
var et, Mr;
function Oi() {
  if (Mr) return et;
  Mr = 1;
  var M = Ae();
  function I() {
    this.__data__ = M ? M(null) : {}, this.size = 0;
  }
  return et = I, et;
}
var tt, Dr;
function Ei() {
  if (Dr) return tt;
  Dr = 1;
  function M(I) {
    var w = this.has(I) && delete this.__data__[I];
    return this.size -= w ? 1 : 0, w;
  }
  return tt = M, tt;
}
var rt, Cr;
function Ai() {
  if (Cr) return rt;
  Cr = 1;
  var M = Ae(), I = "__lodash_hash_undefined__", w = Object.prototype, c = w.hasOwnProperty;
  function s(A) {
    var g = this.__data__;
    if (M) {
      var m = g[A];
      return m === I ? void 0 : m;
    }
    return c.call(g, A) ? g[A] : void 0;
  }
  return rt = s, rt;
}
var nt, Br;
function Ti() {
  if (Br) return nt;
  Br = 1;
  var M = Ae(), I = Object.prototype, w = I.hasOwnProperty;
  function c(s) {
    var A = this.__data__;
    return M ? A[s] !== void 0 : w.call(A, s);
  }
  return nt = c, nt;
}
var it, Fr;
function wi() {
  if (Fr) return it;
  Fr = 1;
  var M = Ae(), I = "__lodash_hash_undefined__";
  function w(c, s) {
    var A = this.__data__;
    return this.size += this.has(c) ? 0 : 1, A[c] = M && s === void 0 ? I : s, this;
  }
  return it = w, it;
}
var ot, Ur;
function ki() {
  if (Ur) return ot;
  Ur = 1;
  var M = Oi(), I = Ei(), w = Ai(), c = Ti(), s = wi();
  function A(g) {
    var m = -1, p = g == null ? 0 : g.length;
    for (this.clear(); ++m < p; ) {
      var y = g[m];
      this.set(y[0], y[1]);
    }
  }
  return A.prototype.clear = M, A.prototype.delete = I, A.prototype.get = w, A.prototype.has = c, A.prototype.set = s, ot = A, ot;
}
var at, Hr;
function Si() {
  if (Hr) return at;
  Hr = 1;
  var M = ki(), I = Oe(), w = ar();
  function c() {
    this.size = 0, this.__data__ = {
      hash: new M(),
      map: new (w || I)(),
      string: new M()
    };
  }
  return at = c, at;
}
var lt, Kr;
function Ni() {
  if (Kr) return lt;
  Kr = 1;
  function M(I) {
    var w = typeof I;
    return w == "string" || w == "number" || w == "symbol" || w == "boolean" ? I !== "__proto__" : I === null;
  }
  return lt = M, lt;
}
var ut, zr;
function Te() {
  if (zr) return ut;
  zr = 1;
  var M = Ni();
  function I(w, c) {
    var s = w.__data__;
    return M(c) ? s[typeof c == "string" ? "string" : "hash"] : s.map;
  }
  return ut = I, ut;
}
var st, Gr;
function qi() {
  if (Gr) return st;
  Gr = 1;
  var M = Te();
  function I(w) {
    var c = M(this, w).delete(w);
    return this.size -= c ? 1 : 0, c;
  }
  return st = I, st;
}
var ft, Vr;
function xi() {
  if (Vr) return ft;
  Vr = 1;
  var M = Te();
  function I(w) {
    return M(this, w).get(w);
  }
  return ft = I, ft;
}
var ct, Wr;
function Pi() {
  if (Wr) return ct;
  Wr = 1;
  var M = Te();
  function I(w) {
    return M(this, w).has(w);
  }
  return ct = I, ct;
}
var ht, $r;
function Ri() {
  if ($r) return ht;
  $r = 1;
  var M = Te();
  function I(w, c) {
    var s = M(this, w), A = s.size;
    return s.set(w, c), this.size += s.size == A ? 0 : 1, this;
  }
  return ht = I, ht;
}
var dt, Zr;
function Xn() {
  if (Zr) return dt;
  Zr = 1;
  var M = Si(), I = qi(), w = xi(), c = Pi(), s = Ri();
  function A(g) {
    var m = -1, p = g == null ? 0 : g.length;
    for (this.clear(); ++m < p; ) {
      var y = g[m];
      this.set(y[0], y[1]);
    }
  }
  return A.prototype.clear = M, A.prototype.delete = I, A.prototype.get = w, A.prototype.has = c, A.prototype.set = s, dt = A, dt;
}
var vt, Yr;
function Li() {
  if (Yr) return vt;
  Yr = 1;
  var M = Oe(), I = ar(), w = Xn(), c = 200;
  function s(A, g) {
    var m = this.__data__;
    if (m instanceof M) {
      var p = m.__data__;
      if (!I || p.length < c - 1)
        return p.push([A, g]), this.size = ++m.size, this;
      m = this.__data__ = new w(p);
    }
    return m.set(A, g), this.size = m.size, this;
  }
  return vt = s, vt;
}
var pt, Xr;
function ji() {
  if (Xr) return pt;
  Xr = 1;
  var M = Oe(), I = ci(), w = hi(), c = di(), s = vi(), A = Li();
  function g(m) {
    var p = this.__data__ = new M(m);
    this.size = p.size;
  }
  return g.prototype.clear = I, g.prototype.delete = w, g.prototype.get = c, g.prototype.has = s, g.prototype.set = A, pt = g, pt;
}
var yt, Qr;
function Ii() {
  if (Qr) return yt;
  Qr = 1;
  var M = "__lodash_hash_undefined__";
  function I(w) {
    return this.__data__.set(w, M), this;
  }
  return yt = I, yt;
}
var gt, Jr;
function Mi() {
  if (Jr) return gt;
  Jr = 1;
  function M(I) {
    return this.__data__.has(I);
  }
  return gt = M, gt;
}
var mt, en;
function Di() {
  if (en) return mt;
  en = 1;
  var M = Xn(), I = Ii(), w = Mi();
  function c(s) {
    var A = -1, g = s == null ? 0 : s.length;
    for (this.__data__ = new M(); ++A < g; )
      this.add(s[A]);
  }
  return c.prototype.add = c.prototype.push = I, c.prototype.has = w, mt = c, mt;
}
var bt, tn;
function Ci() {
  if (tn) return bt;
  tn = 1;
  function M(I, w) {
    for (var c = -1, s = I == null ? 0 : I.length; ++c < s; )
      if (w(I[c], c, I))
        return !0;
    return !1;
  }
  return bt = M, bt;
}
var _t, rn;
function Bi() {
  if (rn) return _t;
  rn = 1;
  function M(I, w) {
    return I.has(w);
  }
  return _t = M, _t;
}
var Ot, nn;
function Qn() {
  if (nn) return Ot;
  nn = 1;
  var M = Di(), I = Ci(), w = Bi(), c = 1, s = 2;
  function A(g, m, p, y, h, n) {
    var e = p & c, t = g.length, u = m.length;
    if (t != u && !(e && u > t))
      return !1;
    var a = n.get(g), l = n.get(m);
    if (a && l)
      return a == m && l == g;
    var o = -1, i = !0, f = p & s ? new M() : void 0;
    for (n.set(g, m), n.set(m, g); ++o < t; ) {
      var r = g[o], d = m[o];
      if (y)
        var T = e ? y(d, r, o, m, g, n) : y(r, d, o, g, m, n);
      if (T !== void 0) {
        if (T)
          continue;
        i = !1;
        break;
      }
      if (f) {
        if (!I(m, function(b, E) {
          if (!w(f, E) && (r === b || h(r, b, p, y, n)))
            return f.push(E);
        })) {
          i = !1;
          break;
        }
      } else if (!(r === d || h(r, d, p, y, n))) {
        i = !1;
        break;
      }
    }
    return n.delete(g), n.delete(m), i;
  }
  return Ot = A, Ot;
}
var Et, on;
function Fi() {
  if (on) return Et;
  on = 1;
  var M = de(), I = M.Uint8Array;
  return Et = I, Et;
}
var At, an;
function Ui() {
  if (an) return At;
  an = 1;
  function M(I) {
    var w = -1, c = Array(I.size);
    return I.forEach(function(s, A) {
      c[++w] = [A, s];
    }), c;
  }
  return At = M, At;
}
var Tt, ln;
function Hi() {
  if (ln) return Tt;
  ln = 1;
  function M(I) {
    var w = -1, c = Array(I.size);
    return I.forEach(function(s) {
      c[++w] = s;
    }), c;
  }
  return Tt = M, Tt;
}
var wt, un;
function Ki() {
  if (un) return wt;
  un = 1;
  var M = or(), I = Fi(), w = Vn(), c = Qn(), s = Ui(), A = Hi(), g = 1, m = 2, p = "[object Boolean]", y = "[object Date]", h = "[object Error]", n = "[object Map]", e = "[object Number]", t = "[object RegExp]", u = "[object Set]", a = "[object String]", l = "[object Symbol]", o = "[object ArrayBuffer]", i = "[object DataView]", f = M ? M.prototype : void 0, r = f ? f.valueOf : void 0;
  function d(T, b, E, N, O, v, _) {
    switch (E) {
      case i:
        if (T.byteLength != b.byteLength || T.byteOffset != b.byteOffset)
          return !1;
        T = T.buffer, b = b.buffer;
      case o:
        return !(T.byteLength != b.byteLength || !v(new I(T), new I(b)));
      case p:
      case y:
      case e:
        return w(+T, +b);
      case h:
        return T.name == b.name && T.message == b.message;
      case t:
      case a:
        return T == b + "";
      case n:
        var k = s;
      case u:
        var q = N & g;
        if (k || (k = A), T.size != b.size && !q)
          return !1;
        var R = _.get(T);
        if (R)
          return R == b;
        N |= m, _.set(T, b);
        var F = c(k(T), k(b), N, O, v, _);
        return _.delete(T), F;
      case l:
        if (r)
          return r.call(T) == r.call(b);
    }
    return !1;
  }
  return wt = d, wt;
}
var kt, sn;
function zi() {
  if (sn) return kt;
  sn = 1;
  function M(I, w) {
    for (var c = -1, s = w.length, A = I.length; ++c < s; )
      I[A + c] = w[c];
    return I;
  }
  return kt = M, kt;
}
var St, fn;
function lr() {
  if (fn) return St;
  fn = 1;
  var M = Array.isArray;
  return St = M, St;
}
var Nt, cn;
function Gi() {
  if (cn) return Nt;
  cn = 1;
  var M = zi(), I = lr();
  function w(c, s, A) {
    var g = s(c);
    return I(c) ? g : M(g, A(c));
  }
  return Nt = w, Nt;
}
var qt, hn;
function Vi() {
  if (hn) return qt;
  hn = 1;
  function M(I, w) {
    for (var c = -1, s = I == null ? 0 : I.length, A = 0, g = []; ++c < s; ) {
      var m = I[c];
      w(m, c, I) && (g[A++] = m);
    }
    return g;
  }
  return qt = M, qt;
}
var xt, dn;
function Wi() {
  if (dn) return xt;
  dn = 1;
  function M() {
    return [];
  }
  return xt = M, xt;
}
var Pt, vn;
function $i() {
  if (vn) return Pt;
  vn = 1;
  var M = Vi(), I = Wi(), w = Object.prototype, c = w.propertyIsEnumerable, s = Object.getOwnPropertySymbols, A = s ? function(g) {
    return g == null ? [] : (g = Object(g), M(s(g), function(m) {
      return c.call(g, m);
    }));
  } : I;
  return Pt = A, Pt;
}
var Rt, pn;
function Zi() {
  if (pn) return Rt;
  pn = 1;
  function M(I, w) {
    for (var c = -1, s = Array(I); ++c < I; )
      s[c] = w(c);
    return s;
  }
  return Rt = M, Rt;
}
var Lt, yn;
function we() {
  if (yn) return Lt;
  yn = 1;
  function M(I) {
    return I != null && typeof I == "object";
  }
  return Lt = M, Lt;
}
var jt, gn;
function Yi() {
  if (gn) return jt;
  gn = 1;
  var M = Ee(), I = we(), w = "[object Arguments]";
  function c(s) {
    return I(s) && M(s) == w;
  }
  return jt = c, jt;
}
var It, mn;
function Xi() {
  if (mn) return It;
  mn = 1;
  var M = Yi(), I = we(), w = Object.prototype, c = w.hasOwnProperty, s = w.propertyIsEnumerable, A = M(/* @__PURE__ */ function() {
    return arguments;
  }()) ? M : function(g) {
    return I(g) && c.call(g, "callee") && !s.call(g, "callee");
  };
  return It = A, It;
}
var ye = { exports: {} }, Mt, bn;
function Qi() {
  if (bn) return Mt;
  bn = 1;
  function M() {
    return !1;
  }
  return Mt = M, Mt;
}
ye.exports;
var _n;
function Jn() {
  return _n || (_n = 1, function(M, I) {
    var w = de(), c = Qi(), s = I && !I.nodeType && I, A = s && !0 && M && !M.nodeType && M, g = A && A.exports === s, m = g ? w.Buffer : void 0, p = m ? m.isBuffer : void 0, y = p || c;
    M.exports = y;
  }(ye, ye.exports)), ye.exports;
}
var Dt, On;
function Ji() {
  if (On) return Dt;
  On = 1;
  var M = 9007199254740991, I = /^(?:0|[1-9]\d*)$/;
  function w(c, s) {
    var A = typeof c;
    return s = s ?? M, !!s && (A == "number" || A != "symbol" && I.test(c)) && c > -1 && c % 1 == 0 && c < s;
  }
  return Dt = w, Dt;
}
var Ct, En;
function ei() {
  if (En) return Ct;
  En = 1;
  var M = 9007199254740991;
  function I(w) {
    return typeof w == "number" && w > -1 && w % 1 == 0 && w <= M;
  }
  return Ct = I, Ct;
}
var Bt, An;
function eo() {
  if (An) return Bt;
  An = 1;
  var M = Ee(), I = ei(), w = we(), c = "[object Arguments]", s = "[object Array]", A = "[object Boolean]", g = "[object Date]", m = "[object Error]", p = "[object Function]", y = "[object Map]", h = "[object Number]", n = "[object Object]", e = "[object RegExp]", t = "[object Set]", u = "[object String]", a = "[object WeakMap]", l = "[object ArrayBuffer]", o = "[object DataView]", i = "[object Float32Array]", f = "[object Float64Array]", r = "[object Int8Array]", d = "[object Int16Array]", T = "[object Int32Array]", b = "[object Uint8Array]", E = "[object Uint8ClampedArray]", N = "[object Uint16Array]", O = "[object Uint32Array]", v = {};
  v[i] = v[f] = v[r] = v[d] = v[T] = v[b] = v[E] = v[N] = v[O] = !0, v[c] = v[s] = v[l] = v[A] = v[o] = v[g] = v[m] = v[p] = v[y] = v[h] = v[n] = v[e] = v[t] = v[u] = v[a] = !1;
  function _(k) {
    return w(k) && I(k.length) && !!v[M(k)];
  }
  return Bt = _, Bt;
}
var Ft, Tn;
function to() {
  if (Tn) return Ft;
  Tn = 1;
  function M(I) {
    return function(w) {
      return I(w);
    };
  }
  return Ft = M, Ft;
}
var ge = { exports: {} };
ge.exports;
var wn;
function ro() {
  return wn || (wn = 1, function(M, I) {
    var w = Wn(), c = I && !I.nodeType && I, s = c && !0 && M && !M.nodeType && M, A = s && s.exports === c, g = A && w.process, m = function() {
      try {
        var p = s && s.require && s.require("util").types;
        return p || g && g.binding && g.binding("util");
      } catch {
      }
    }();
    M.exports = m;
  }(ge, ge.exports)), ge.exports;
}
var Ut, kn;
function ti() {
  if (kn) return Ut;
  kn = 1;
  var M = eo(), I = to(), w = ro(), c = w && w.isTypedArray, s = c ? I(c) : M;
  return Ut = s, Ut;
}
var Ht, Sn;
function no() {
  if (Sn) return Ht;
  Sn = 1;
  var M = Zi(), I = Xi(), w = lr(), c = Jn(), s = Ji(), A = ti(), g = Object.prototype, m = g.hasOwnProperty;
  function p(y, h) {
    var n = w(y), e = !n && I(y), t = !n && !e && c(y), u = !n && !e && !t && A(y), a = n || e || t || u, l = a ? M(y.length, String) : [], o = l.length;
    for (var i in y)
      (h || m.call(y, i)) && !(a && // Safari 9 has enumerable `arguments.length` in strict mode.
      (i == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      t && (i == "offset" || i == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      u && (i == "buffer" || i == "byteLength" || i == "byteOffset") || // Skip index properties.
      s(i, o))) && l.push(i);
    return l;
  }
  return Ht = p, Ht;
}
var Kt, Nn;
function io() {
  if (Nn) return Kt;
  Nn = 1;
  var M = Object.prototype;
  function I(w) {
    var c = w && w.constructor, s = typeof c == "function" && c.prototype || M;
    return w === s;
  }
  return Kt = I, Kt;
}
var zt, qn;
function oo() {
  if (qn) return zt;
  qn = 1;
  function M(I, w) {
    return function(c) {
      return I(w(c));
    };
  }
  return zt = M, zt;
}
var Gt, xn;
function ao() {
  if (xn) return Gt;
  xn = 1;
  var M = oo(), I = M(Object.keys, Object);
  return Gt = I, Gt;
}
var Vt, Pn;
function lo() {
  if (Pn) return Vt;
  Pn = 1;
  var M = io(), I = ao(), w = Object.prototype, c = w.hasOwnProperty;
  function s(A) {
    if (!M(A))
      return I(A);
    var g = [];
    for (var m in Object(A))
      c.call(A, m) && m != "constructor" && g.push(m);
    return g;
  }
  return Vt = s, Vt;
}
var Wt, Rn;
function uo() {
  if (Rn) return Wt;
  Rn = 1;
  var M = Zn(), I = ei();
  function w(c) {
    return c != null && I(c.length) && !M(c);
  }
  return Wt = w, Wt;
}
var $t, Ln;
function so() {
  if (Ln) return $t;
  Ln = 1;
  var M = no(), I = lo(), w = uo();
  function c(s) {
    return w(s) ? M(s) : I(s);
  }
  return $t = c, $t;
}
var Zt, jn;
function fo() {
  if (jn) return Zt;
  jn = 1;
  var M = Gi(), I = $i(), w = so();
  function c(s) {
    return M(s, w, I);
  }
  return Zt = c, Zt;
}
var Yt, In;
function co() {
  if (In) return Yt;
  In = 1;
  var M = fo(), I = 1, w = Object.prototype, c = w.hasOwnProperty;
  function s(A, g, m, p, y, h) {
    var n = m & I, e = M(A), t = e.length, u = M(g), a = u.length;
    if (t != a && !n)
      return !1;
    for (var l = t; l--; ) {
      var o = e[l];
      if (!(n ? o in g : c.call(g, o)))
        return !1;
    }
    var i = h.get(A), f = h.get(g);
    if (i && f)
      return i == g && f == A;
    var r = !0;
    h.set(A, g), h.set(g, A);
    for (var d = n; ++l < t; ) {
      o = e[l];
      var T = A[o], b = g[o];
      if (p)
        var E = n ? p(b, T, o, g, A, h) : p(T, b, o, A, g, h);
      if (!(E === void 0 ? T === b || y(T, b, m, p, h) : E)) {
        r = !1;
        break;
      }
      d || (d = o == "constructor");
    }
    if (r && !d) {
      var N = A.constructor, O = g.constructor;
      N != O && "constructor" in A && "constructor" in g && !(typeof N == "function" && N instanceof N && typeof O == "function" && O instanceof O) && (r = !1);
    }
    return h.delete(A), h.delete(g), r;
  }
  return Yt = s, Yt;
}
var Xt, Mn;
function ho() {
  if (Mn) return Xt;
  Mn = 1;
  var M = pe(), I = de(), w = M(I, "DataView");
  return Xt = w, Xt;
}
var Qt, Dn;
function vo() {
  if (Dn) return Qt;
  Dn = 1;
  var M = pe(), I = de(), w = M(I, "Promise");
  return Qt = w, Qt;
}
var Jt, Cn;
function po() {
  if (Cn) return Jt;
  Cn = 1;
  var M = pe(), I = de(), w = M(I, "Set");
  return Jt = w, Jt;
}
var er, Bn;
function yo() {
  if (Bn) return er;
  Bn = 1;
  var M = pe(), I = de(), w = M(I, "WeakMap");
  return er = w, er;
}
var tr, Fn;
function go() {
  if (Fn) return tr;
  Fn = 1;
  var M = ho(), I = ar(), w = vo(), c = po(), s = yo(), A = Ee(), g = Yn(), m = "[object Map]", p = "[object Object]", y = "[object Promise]", h = "[object Set]", n = "[object WeakMap]", e = "[object DataView]", t = g(M), u = g(I), a = g(w), l = g(c), o = g(s), i = A;
  return (M && i(new M(new ArrayBuffer(1))) != e || I && i(new I()) != m || w && i(w.resolve()) != y || c && i(new c()) != h || s && i(new s()) != n) && (i = function(f) {
    var r = A(f), d = r == p ? f.constructor : void 0, T = d ? g(d) : "";
    if (T)
      switch (T) {
        case t:
          return e;
        case u:
          return m;
        case a:
          return y;
        case l:
          return h;
        case o:
          return n;
      }
    return r;
  }), tr = i, tr;
}
var rr, Un;
function mo() {
  if (Un) return rr;
  Un = 1;
  var M = ji(), I = Qn(), w = Ki(), c = co(), s = go(), A = lr(), g = Jn(), m = ti(), p = 1, y = "[object Arguments]", h = "[object Array]", n = "[object Object]", e = Object.prototype, t = e.hasOwnProperty;
  function u(a, l, o, i, f, r) {
    var d = A(a), T = A(l), b = d ? h : s(a), E = T ? h : s(l);
    b = b == y ? n : b, E = E == y ? n : E;
    var N = b == n, O = E == n, v = b == E;
    if (v && g(a)) {
      if (!g(l))
        return !1;
      d = !0, N = !1;
    }
    if (v && !N)
      return r || (r = new M()), d || m(a) ? I(a, l, o, i, f, r) : w(a, l, b, o, i, f, r);
    if (!(o & p)) {
      var _ = N && t.call(a, "__wrapped__"), k = O && t.call(l, "__wrapped__");
      if (_ || k) {
        var q = _ ? a.value() : a, R = k ? l.value() : l;
        return r || (r = new M()), f(q, R, o, i, r);
      }
    }
    return v ? (r || (r = new M()), c(a, l, o, i, f, r)) : !1;
  }
  return rr = u, rr;
}
var nr, Hn;
function bo() {
  if (Hn) return nr;
  Hn = 1;
  var M = mo(), I = we();
  function w(c, s, A, g, m) {
    return c === s ? !0 : c == null || s == null || !I(c) && !I(s) ? c !== c && s !== s : M(c, s, A, g, w, m);
  }
  return nr = w, nr;
}
var ir, Kn;
function _o() {
  if (Kn) return ir;
  Kn = 1;
  var M = bo();
  function I(w, c) {
    return M(w, c);
  }
  return ir = I, ir;
}
var be = { exports: {} };
/*!
 * Quill Editor v1.3.7
 * https://quilljs.com/
 * Copyright (c) 2014, Jason Chen
 * Copyright (c) 2013, salesforce.com
 */
var Oo = be.exports, zn;
function Eo() {
  return zn || (zn = 1, function(M, I) {
    (function(c, s) {
      M.exports = s();
    })(typeof self < "u" ? self : Oo, function() {
      return (
        /******/
        function(w) {
          var c = {};
          function s(A) {
            if (c[A])
              return c[A].exports;
            var g = c[A] = {
              /******/
              i: A,
              /******/
              l: !1,
              /******/
              exports: {}
              /******/
            };
            return w[A].call(g.exports, g, g.exports, s), g.l = !0, g.exports;
          }
          return s.m = w, s.c = c, s.d = function(A, g, m) {
            s.o(A, g) || Object.defineProperty(A, g, {
              /******/
              configurable: !1,
              /******/
              enumerable: !0,
              /******/
              get: m
              /******/
            });
          }, s.n = function(A) {
            var g = A && A.__esModule ? (
              /******/
              function() {
                return A.default;
              }
            ) : (
              /******/
              function() {
                return A;
              }
            );
            return s.d(g, "a", g), g;
          }, s.o = function(A, g) {
            return Object.prototype.hasOwnProperty.call(A, g);
          }, s.p = "", s(s.s = 109);
        }([
          /* 0 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", { value: !0 });
            var A = s(17), g = s(18), m = s(19), p = s(45), y = s(46), h = s(47), n = s(48), e = s(49), t = s(12), u = s(32), a = s(33), l = s(31), o = s(1), i = {
              Scope: o.Scope,
              create: o.create,
              find: o.find,
              query: o.query,
              register: o.register,
              Container: A.default,
              Format: g.default,
              Leaf: m.default,
              Embed: n.default,
              Scroll: p.default,
              Block: h.default,
              Inline: y.default,
              Text: e.default,
              Attributor: {
                Attribute: t.default,
                Class: u.default,
                Style: a.default,
                Store: l.default
              }
            };
            c.default = i;
          },
          /* 1 */
          /***/
          function(w, c, s) {
            var A = this && this.__extends || function() {
              var l = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(o, i) {
                o.__proto__ = i;
              } || function(o, i) {
                for (var f in i) i.hasOwnProperty(f) && (o[f] = i[f]);
              };
              return function(o, i) {
                l(o, i);
                function f() {
                  this.constructor = o;
                }
                o.prototype = i === null ? Object.create(i) : (f.prototype = i.prototype, new f());
              };
            }();
            Object.defineProperty(c, "__esModule", { value: !0 });
            var g = (
              /** @class */
              function(l) {
                A(o, l);
                function o(i) {
                  var f = this;
                  return i = "[Parchment] " + i, f = l.call(this, i) || this, f.message = i, f.name = f.constructor.name, f;
                }
                return o;
              }(Error)
            );
            c.ParchmentError = g;
            var m = {}, p = {}, y = {}, h = {};
            c.DATA_KEY = "__blot";
            var n;
            (function(l) {
              l[l.TYPE = 3] = "TYPE", l[l.LEVEL = 12] = "LEVEL", l[l.ATTRIBUTE = 13] = "ATTRIBUTE", l[l.BLOT = 14] = "BLOT", l[l.INLINE = 7] = "INLINE", l[l.BLOCK = 11] = "BLOCK", l[l.BLOCK_BLOT = 10] = "BLOCK_BLOT", l[l.INLINE_BLOT = 6] = "INLINE_BLOT", l[l.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", l[l.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", l[l.ANY = 15] = "ANY";
            })(n = c.Scope || (c.Scope = {}));
            function e(l, o) {
              var i = u(l);
              if (i == null)
                throw new g("Unable to create " + l + " blot");
              var f = i, r = (
                // @ts-ignore
                l instanceof Node || l.nodeType === Node.TEXT_NODE ? l : f.create(o)
              );
              return new f(r, o);
            }
            c.create = e;
            function t(l, o) {
              return o === void 0 && (o = !1), l == null ? null : l[c.DATA_KEY] != null ? l[c.DATA_KEY].blot : o ? t(l.parentNode, o) : null;
            }
            c.find = t;
            function u(l, o) {
              o === void 0 && (o = n.ANY);
              var i;
              if (typeof l == "string")
                i = h[l] || m[l];
              else if (l instanceof Text || l.nodeType === Node.TEXT_NODE)
                i = h.text;
              else if (typeof l == "number")
                l & n.LEVEL & n.BLOCK ? i = h.block : l & n.LEVEL & n.INLINE && (i = h.inline);
              else if (l instanceof HTMLElement) {
                var f = (l.getAttribute("class") || "").split(/\s+/);
                for (var r in f)
                  if (i = p[f[r]], i)
                    break;
                i = i || y[l.tagName];
              }
              return i == null ? null : o & n.LEVEL & i.scope && o & n.TYPE & i.scope ? i : null;
            }
            c.query = u;
            function a() {
              for (var l = [], o = 0; o < arguments.length; o++)
                l[o] = arguments[o];
              if (l.length > 1)
                return l.map(function(r) {
                  return a(r);
                });
              var i = l[0];
              if (typeof i.blotName != "string" && typeof i.attrName != "string")
                throw new g("Invalid definition");
              if (i.blotName === "abstract")
                throw new g("Cannot register abstract class");
              if (h[i.blotName || i.attrName] = i, typeof i.keyName == "string")
                m[i.keyName] = i;
              else if (i.className != null && (p[i.className] = i), i.tagName != null) {
                Array.isArray(i.tagName) ? i.tagName = i.tagName.map(function(r) {
                  return r.toUpperCase();
                }) : i.tagName = i.tagName.toUpperCase();
                var f = Array.isArray(i.tagName) ? i.tagName : [i.tagName];
                f.forEach(function(r) {
                  (y[r] == null || i.className == null) && (y[r] = i);
                });
              }
              return i;
            }
            c.register = a;
          },
          /* 2 */
          /***/
          function(w, c, s) {
            var A = s(51), g = s(11), m = s(3), p = s(20), y = "\0", h = function(n) {
              Array.isArray(n) ? this.ops = n : n != null && Array.isArray(n.ops) ? this.ops = n.ops : this.ops = [];
            };
            h.prototype.insert = function(n, e) {
              var t = {};
              return n.length === 0 ? this : (t.insert = n, e != null && typeof e == "object" && Object.keys(e).length > 0 && (t.attributes = e), this.push(t));
            }, h.prototype.delete = function(n) {
              return n <= 0 ? this : this.push({ delete: n });
            }, h.prototype.retain = function(n, e) {
              if (n <= 0) return this;
              var t = { retain: n };
              return e != null && typeof e == "object" && Object.keys(e).length > 0 && (t.attributes = e), this.push(t);
            }, h.prototype.push = function(n) {
              var e = this.ops.length, t = this.ops[e - 1];
              if (n = m(!0, {}, n), typeof t == "object") {
                if (typeof n.delete == "number" && typeof t.delete == "number")
                  return this.ops[e - 1] = { delete: t.delete + n.delete }, this;
                if (typeof t.delete == "number" && n.insert != null && (e -= 1, t = this.ops[e - 1], typeof t != "object"))
                  return this.ops.unshift(n), this;
                if (g(n.attributes, t.attributes)) {
                  if (typeof n.insert == "string" && typeof t.insert == "string")
                    return this.ops[e - 1] = { insert: t.insert + n.insert }, typeof n.attributes == "object" && (this.ops[e - 1].attributes = n.attributes), this;
                  if (typeof n.retain == "number" && typeof t.retain == "number")
                    return this.ops[e - 1] = { retain: t.retain + n.retain }, typeof n.attributes == "object" && (this.ops[e - 1].attributes = n.attributes), this;
                }
              }
              return e === this.ops.length ? this.ops.push(n) : this.ops.splice(e, 0, n), this;
            }, h.prototype.chop = function() {
              var n = this.ops[this.ops.length - 1];
              return n && n.retain && !n.attributes && this.ops.pop(), this;
            }, h.prototype.filter = function(n) {
              return this.ops.filter(n);
            }, h.prototype.forEach = function(n) {
              this.ops.forEach(n);
            }, h.prototype.map = function(n) {
              return this.ops.map(n);
            }, h.prototype.partition = function(n) {
              var e = [], t = [];
              return this.forEach(function(u) {
                var a = n(u) ? e : t;
                a.push(u);
              }), [e, t];
            }, h.prototype.reduce = function(n, e) {
              return this.ops.reduce(n, e);
            }, h.prototype.changeLength = function() {
              return this.reduce(function(n, e) {
                return e.insert ? n + p.length(e) : e.delete ? n - e.delete : n;
              }, 0);
            }, h.prototype.length = function() {
              return this.reduce(function(n, e) {
                return n + p.length(e);
              }, 0);
            }, h.prototype.slice = function(n, e) {
              n = n || 0, typeof e != "number" && (e = 1 / 0);
              for (var t = [], u = p.iterator(this.ops), a = 0; a < e && u.hasNext(); ) {
                var l;
                a < n ? l = u.next(n - a) : (l = u.next(e - a), t.push(l)), a += p.length(l);
              }
              return new h(t);
            }, h.prototype.compose = function(n) {
              var e = p.iterator(this.ops), t = p.iterator(n.ops), u = [], a = t.peek();
              if (a != null && typeof a.retain == "number" && a.attributes == null) {
                for (var l = a.retain; e.peekType() === "insert" && e.peekLength() <= l; )
                  l -= e.peekLength(), u.push(e.next());
                a.retain - l > 0 && t.next(a.retain - l);
              }
              for (var o = new h(u); e.hasNext() || t.hasNext(); )
                if (t.peekType() === "insert")
                  o.push(t.next());
                else if (e.peekType() === "delete")
                  o.push(e.next());
                else {
                  var i = Math.min(e.peekLength(), t.peekLength()), f = e.next(i), r = t.next(i);
                  if (typeof r.retain == "number") {
                    var d = {};
                    typeof f.retain == "number" ? d.retain = i : d.insert = f.insert;
                    var T = p.attributes.compose(f.attributes, r.attributes, typeof f.retain == "number");
                    if (T && (d.attributes = T), o.push(d), !t.hasNext() && g(o.ops[o.ops.length - 1], d)) {
                      var b = new h(e.rest());
                      return o.concat(b).chop();
                    }
                  } else typeof r.delete == "number" && typeof f.retain == "number" && o.push(r);
                }
              return o.chop();
            }, h.prototype.concat = function(n) {
              var e = new h(this.ops.slice());
              return n.ops.length > 0 && (e.push(n.ops[0]), e.ops = e.ops.concat(n.ops.slice(1))), e;
            }, h.prototype.diff = function(n, e) {
              if (this.ops === n.ops)
                return new h();
              var t = [this, n].map(function(i) {
                return i.map(function(f) {
                  if (f.insert != null)
                    return typeof f.insert == "string" ? f.insert : y;
                  var r = i === n ? "on" : "with";
                  throw new Error("diff() called " + r + " non-document");
                }).join("");
              }), u = new h(), a = A(t[0], t[1], e), l = p.iterator(this.ops), o = p.iterator(n.ops);
              return a.forEach(function(i) {
                for (var f = i[1].length; f > 0; ) {
                  var r = 0;
                  switch (i[0]) {
                    case A.INSERT:
                      r = Math.min(o.peekLength(), f), u.push(o.next(r));
                      break;
                    case A.DELETE:
                      r = Math.min(f, l.peekLength()), l.next(r), u.delete(r);
                      break;
                    case A.EQUAL:
                      r = Math.min(l.peekLength(), o.peekLength(), f);
                      var d = l.next(r), T = o.next(r);
                      g(d.insert, T.insert) ? u.retain(r, p.attributes.diff(d.attributes, T.attributes)) : u.push(T).delete(r);
                      break;
                  }
                  f -= r;
                }
              }), u.chop();
            }, h.prototype.eachLine = function(n, e) {
              e = e || `
`;
              for (var t = p.iterator(this.ops), u = new h(), a = 0; t.hasNext(); ) {
                if (t.peekType() !== "insert") return;
                var l = t.peek(), o = p.length(l) - t.peekLength(), i = typeof l.insert == "string" ? l.insert.indexOf(e, o) - o : -1;
                if (i < 0)
                  u.push(t.next());
                else if (i > 0)
                  u.push(t.next(i));
                else {
                  if (n(u, t.next(1).attributes || {}, a) === !1)
                    return;
                  a += 1, u = new h();
                }
              }
              u.length() > 0 && n(u, {}, a);
            }, h.prototype.transform = function(n, e) {
              if (e = !!e, typeof n == "number")
                return this.transformPosition(n, e);
              for (var t = p.iterator(this.ops), u = p.iterator(n.ops), a = new h(); t.hasNext() || u.hasNext(); )
                if (t.peekType() === "insert" && (e || u.peekType() !== "insert"))
                  a.retain(p.length(t.next()));
                else if (u.peekType() === "insert")
                  a.push(u.next());
                else {
                  var l = Math.min(t.peekLength(), u.peekLength()), o = t.next(l), i = u.next(l);
                  if (o.delete)
                    continue;
                  i.delete ? a.push(i) : a.retain(l, p.attributes.transform(o.attributes, i.attributes, e));
                }
              return a.chop();
            }, h.prototype.transformPosition = function(n, e) {
              e = !!e;
              for (var t = p.iterator(this.ops), u = 0; t.hasNext() && u <= n; ) {
                var a = t.peekLength(), l = t.peekType();
                if (t.next(), l === "delete") {
                  n -= Math.min(a, n - u);
                  continue;
                } else l === "insert" && (u < n || !e) && (n += a);
                u += a;
              }
              return n;
            }, w.exports = h;
          },
          /* 3 */
          /***/
          function(w, c) {
            var s = Object.prototype.hasOwnProperty, A = Object.prototype.toString, g = Object.defineProperty, m = Object.getOwnPropertyDescriptor, p = function(t) {
              return typeof Array.isArray == "function" ? Array.isArray(t) : A.call(t) === "[object Array]";
            }, y = function(t) {
              if (!t || A.call(t) !== "[object Object]")
                return !1;
              var u = s.call(t, "constructor"), a = t.constructor && t.constructor.prototype && s.call(t.constructor.prototype, "isPrototypeOf");
              if (t.constructor && !u && !a)
                return !1;
              var l;
              for (l in t)
                ;
              return typeof l > "u" || s.call(t, l);
            }, h = function(t, u) {
              g && u.name === "__proto__" ? g(t, u.name, {
                enumerable: !0,
                configurable: !0,
                value: u.newValue,
                writable: !0
              }) : t[u.name] = u.newValue;
            }, n = function(t, u) {
              if (u === "__proto__")
                if (s.call(t, u)) {
                  if (m)
                    return m(t, u).value;
                } else return;
              return t[u];
            };
            w.exports = function e() {
              var t, u, a, l, o, i, f = arguments[0], r = 1, d = arguments.length, T = !1;
              for (typeof f == "boolean" && (T = f, f = arguments[1] || {}, r = 2), (f == null || typeof f != "object" && typeof f != "function") && (f = {}); r < d; ++r)
                if (t = arguments[r], t != null)
                  for (u in t)
                    a = n(f, u), l = n(t, u), f !== l && (T && l && (y(l) || (o = p(l))) ? (o ? (o = !1, i = a && p(a) ? a : []) : i = a && y(a) ? a : {}, h(f, { name: u, newValue: e(T, i, l) })) : typeof l < "u" && h(f, { name: u, newValue: l }));
              return f;
            };
          },
          /* 4 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            }), c.default = c.BlockEmbed = c.bubbleFormats = void 0;
            var A = /* @__PURE__ */ function() {
              function v(_, k) {
                for (var q = 0; q < k.length; q++) {
                  var R = k[q];
                  R.enumerable = R.enumerable || !1, R.configurable = !0, "value" in R && (R.writable = !0), Object.defineProperty(_, R.key, R);
                }
              }
              return function(_, k, q) {
                return k && v(_.prototype, k), q && v(_, q), _;
              };
            }(), g = function v(_, k, q) {
              _ === null && (_ = Function.prototype);
              var R = Object.getOwnPropertyDescriptor(_, k);
              if (R === void 0) {
                var F = Object.getPrototypeOf(_);
                return F === null ? void 0 : v(F, k, q);
              } else {
                if ("value" in R)
                  return R.value;
                var U = R.get;
                return U === void 0 ? void 0 : U.call(q);
              }
            }, m = s(3), p = f(m), y = s(2), h = f(y), n = s(0), e = f(n), t = s(16), u = f(t), a = s(6), l = f(a), o = s(7), i = f(o);
            function f(v) {
              return v && v.__esModule ? v : { default: v };
            }
            function r(v, _) {
              if (!(v instanceof _))
                throw new TypeError("Cannot call a class as a function");
            }
            function d(v, _) {
              if (!v)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return _ && (typeof _ == "object" || typeof _ == "function") ? _ : v;
            }
            function T(v, _) {
              if (typeof _ != "function" && _ !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof _);
              v.prototype = Object.create(_ && _.prototype, { constructor: { value: v, enumerable: !1, writable: !0, configurable: !0 } }), _ && (Object.setPrototypeOf ? Object.setPrototypeOf(v, _) : v.__proto__ = _);
            }
            var b = 1, E = function(v) {
              T(_, v);
              function _() {
                return r(this, _), d(this, (_.__proto__ || Object.getPrototypeOf(_)).apply(this, arguments));
              }
              return A(_, [{
                key: "attach",
                value: function() {
                  g(_.prototype.__proto__ || Object.getPrototypeOf(_.prototype), "attach", this).call(this), this.attributes = new e.default.Attributor.Store(this.domNode);
                }
              }, {
                key: "delta",
                value: function() {
                  return new h.default().insert(this.value(), (0, p.default)(this.formats(), this.attributes.values()));
                }
              }, {
                key: "format",
                value: function(q, R) {
                  var F = e.default.query(q, e.default.Scope.BLOCK_ATTRIBUTE);
                  F != null && this.attributes.attribute(F, R);
                }
              }, {
                key: "formatAt",
                value: function(q, R, F, U) {
                  this.format(F, U);
                }
              }, {
                key: "insertAt",
                value: function(q, R, F) {
                  if (typeof R == "string" && R.endsWith(`
`)) {
                    var U = e.default.create(N.blotName);
                    this.parent.insertBefore(U, q === 0 ? this : this.next), U.insertAt(0, R.slice(0, -1));
                  } else
                    g(_.prototype.__proto__ || Object.getPrototypeOf(_.prototype), "insertAt", this).call(this, q, R, F);
                }
              }]), _;
            }(e.default.Embed);
            E.scope = e.default.Scope.BLOCK_BLOT;
            var N = function(v) {
              T(_, v);
              function _(k) {
                r(this, _);
                var q = d(this, (_.__proto__ || Object.getPrototypeOf(_)).call(this, k));
                return q.cache = {}, q;
              }
              return A(_, [{
                key: "delta",
                value: function() {
                  return this.cache.delta == null && (this.cache.delta = this.descendants(e.default.Leaf).reduce(function(q, R) {
                    return R.length() === 0 ? q : q.insert(R.value(), O(R));
                  }, new h.default()).insert(`
`, O(this))), this.cache.delta;
                }
              }, {
                key: "deleteAt",
                value: function(q, R) {
                  g(_.prototype.__proto__ || Object.getPrototypeOf(_.prototype), "deleteAt", this).call(this, q, R), this.cache = {};
                }
              }, {
                key: "formatAt",
                value: function(q, R, F, U) {
                  R <= 0 || (e.default.query(F, e.default.Scope.BLOCK) ? q + R === this.length() && this.format(F, U) : g(_.prototype.__proto__ || Object.getPrototypeOf(_.prototype), "formatAt", this).call(this, q, Math.min(R, this.length() - q - 1), F, U), this.cache = {});
                }
              }, {
                key: "insertAt",
                value: function(q, R, F) {
                  if (F != null) return g(_.prototype.__proto__ || Object.getPrototypeOf(_.prototype), "insertAt", this).call(this, q, R, F);
                  if (R.length !== 0) {
                    var U = R.split(`
`), $ = U.shift();
                    $.length > 0 && (q < this.length() - 1 || this.children.tail == null ? g(_.prototype.__proto__ || Object.getPrototypeOf(_.prototype), "insertAt", this).call(this, Math.min(q, this.length() - 1), $) : this.children.tail.insertAt(this.children.tail.length(), $), this.cache = {});
                    var C = this;
                    U.reduce(function(j, S) {
                      return C = C.split(j, !0), C.insertAt(0, S), S.length;
                    }, q + $.length);
                  }
                }
              }, {
                key: "insertBefore",
                value: function(q, R) {
                  var F = this.children.head;
                  g(_.prototype.__proto__ || Object.getPrototypeOf(_.prototype), "insertBefore", this).call(this, q, R), F instanceof u.default && F.remove(), this.cache = {};
                }
              }, {
                key: "length",
                value: function() {
                  return this.cache.length == null && (this.cache.length = g(_.prototype.__proto__ || Object.getPrototypeOf(_.prototype), "length", this).call(this) + b), this.cache.length;
                }
              }, {
                key: "moveChildren",
                value: function(q, R) {
                  g(_.prototype.__proto__ || Object.getPrototypeOf(_.prototype), "moveChildren", this).call(this, q, R), this.cache = {};
                }
              }, {
                key: "optimize",
                value: function(q) {
                  g(_.prototype.__proto__ || Object.getPrototypeOf(_.prototype), "optimize", this).call(this, q), this.cache = {};
                }
              }, {
                key: "path",
                value: function(q) {
                  return g(_.prototype.__proto__ || Object.getPrototypeOf(_.prototype), "path", this).call(this, q, !0);
                }
              }, {
                key: "removeChild",
                value: function(q) {
                  g(_.prototype.__proto__ || Object.getPrototypeOf(_.prototype), "removeChild", this).call(this, q), this.cache = {};
                }
              }, {
                key: "split",
                value: function(q) {
                  var R = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
                  if (R && (q === 0 || q >= this.length() - b)) {
                    var F = this.clone();
                    return q === 0 ? (this.parent.insertBefore(F, this), this) : (this.parent.insertBefore(F, this.next), F);
                  } else {
                    var U = g(_.prototype.__proto__ || Object.getPrototypeOf(_.prototype), "split", this).call(this, q, R);
                    return this.cache = {}, U;
                  }
                }
              }]), _;
            }(e.default.Block);
            N.blotName = "block", N.tagName = "P", N.defaultChild = "break", N.allowedChildren = [l.default, e.default.Embed, i.default];
            function O(v) {
              var _ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
              return v == null || (typeof v.formats == "function" && (_ = (0, p.default)(_, v.formats())), v.parent == null || v.parent.blotName == "scroll" || v.parent.statics.scope !== v.statics.scope) ? _ : O(v.parent, _);
            }
            c.bubbleFormats = O, c.BlockEmbed = E, c.default = N;
          },
          /* 5 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            }), c.default = c.overload = c.expandConfig = void 0;
            var A = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(C) {
              return typeof C;
            } : function(C) {
              return C && typeof Symbol == "function" && C.constructor === Symbol && C !== Symbol.prototype ? "symbol" : typeof C;
            }, g = /* @__PURE__ */ function() {
              function C(j, S) {
                var P = [], L = !0, H = !1, B = void 0;
                try {
                  for (var x = j[Symbol.iterator](), D; !(L = (D = x.next()).done) && (P.push(D.value), !(S && P.length === S)); L = !0)
                    ;
                } catch (K) {
                  H = !0, B = K;
                } finally {
                  try {
                    !L && x.return && x.return();
                  } finally {
                    if (H) throw B;
                  }
                }
                return P;
              }
              return function(j, S) {
                if (Array.isArray(j))
                  return j;
                if (Symbol.iterator in Object(j))
                  return C(j, S);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
              };
            }(), m = /* @__PURE__ */ function() {
              function C(j, S) {
                for (var P = 0; P < S.length; P++) {
                  var L = S[P];
                  L.enumerable = L.enumerable || !1, L.configurable = !0, "value" in L && (L.writable = !0), Object.defineProperty(j, L.key, L);
                }
              }
              return function(j, S, P) {
                return S && C(j.prototype, S), P && C(j, P), j;
              };
            }();
            s(50);
            var p = s(2), y = O(p), h = s(14), n = O(h), e = s(8), t = O(e), u = s(9), a = O(u), l = s(0), o = O(l), i = s(15), f = O(i), r = s(3), d = O(r), T = s(10), b = O(T), E = s(34), N = O(E);
            function O(C) {
              return C && C.__esModule ? C : { default: C };
            }
            function v(C, j, S) {
              return j in C ? Object.defineProperty(C, j, { value: S, enumerable: !0, configurable: !0, writable: !0 }) : C[j] = S, C;
            }
            function _(C, j) {
              if (!(C instanceof j))
                throw new TypeError("Cannot call a class as a function");
            }
            var k = (0, b.default)("quill"), q = function() {
              m(C, null, [{
                key: "debug",
                value: function(S) {
                  S === !0 && (S = "log"), b.default.level(S);
                }
              }, {
                key: "find",
                value: function(S) {
                  return S.__quill || o.default.find(S);
                }
              }, {
                key: "import",
                value: function(S) {
                  return this.imports[S] == null && k.error("Cannot import " + S + ". Are you sure it was registered?"), this.imports[S];
                }
              }, {
                key: "register",
                value: function(S, P) {
                  var L = this, H = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
                  if (typeof S != "string") {
                    var B = S.attrName || S.blotName;
                    typeof B == "string" ? this.register("formats/" + B, S, P) : Object.keys(S).forEach(function(x) {
                      L.register(x, S[x], P);
                    });
                  } else
                    this.imports[S] != null && !H && k.warn("Overwriting " + S + " with", P), this.imports[S] = P, (S.startsWith("blots/") || S.startsWith("formats/")) && P.blotName !== "abstract" ? o.default.register(P) : S.startsWith("modules") && typeof P.register == "function" && P.register();
                }
              }]);
              function C(j) {
                var S = this, P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                if (_(this, C), this.options = R(j, P), this.container = this.options.container, this.container == null)
                  return k.error("Invalid Quill container", j);
                this.options.debug && C.debug(this.options.debug);
                var L = this.container.innerHTML.trim();
                this.container.classList.add("ql-container"), this.container.innerHTML = "", this.container.__quill = this, this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.root.setAttribute("data-gramm", !1), this.scrollingContainer = this.options.scrollingContainer || this.root, this.emitter = new t.default(), this.scroll = o.default.create(this.root, {
                  emitter: this.emitter,
                  whitelist: this.options.formats
                }), this.editor = new n.default(this.scroll), this.selection = new f.default(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.theme.init(), this.emitter.on(t.default.events.EDITOR_CHANGE, function(B) {
                  B === t.default.events.TEXT_CHANGE && S.root.classList.toggle("ql-blank", S.editor.isBlank());
                }), this.emitter.on(t.default.events.SCROLL_UPDATE, function(B, x) {
                  var D = S.selection.lastRange, K = D && D.length === 0 ? D.index : void 0;
                  F.call(S, function() {
                    return S.editor.update(null, x, K);
                  }, B);
                });
                var H = this.clipboard.convert(`<div class='ql-editor' style="white-space: normal;">` + L + "<p><br></p></div>");
                this.setContents(H), this.history.clear(), this.options.placeholder && this.root.setAttribute("data-placeholder", this.options.placeholder), this.options.readOnly && this.disable();
              }
              return m(C, [{
                key: "addContainer",
                value: function(S) {
                  var P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
                  if (typeof S == "string") {
                    var L = S;
                    S = document.createElement("div"), S.classList.add(L);
                  }
                  return this.container.insertBefore(S, P), S;
                }
              }, {
                key: "blur",
                value: function() {
                  this.selection.setRange(null);
                }
              }, {
                key: "deleteText",
                value: function(S, P, L) {
                  var H = this, B = U(S, P, L), x = g(B, 4);
                  return S = x[0], P = x[1], L = x[3], F.call(this, function() {
                    return H.editor.deleteText(S, P);
                  }, L, S, -1 * P);
                }
              }, {
                key: "disable",
                value: function() {
                  this.enable(!1);
                }
              }, {
                key: "enable",
                value: function() {
                  var S = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
                  this.scroll.enable(S), this.container.classList.toggle("ql-disabled", !S);
                }
              }, {
                key: "focus",
                value: function() {
                  var S = this.scrollingContainer.scrollTop;
                  this.selection.focus(), this.scrollingContainer.scrollTop = S, this.scrollIntoView();
                }
              }, {
                key: "format",
                value: function(S, P) {
                  var L = this, H = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : t.default.sources.API;
                  return F.call(this, function() {
                    var B = L.getSelection(!0), x = new y.default();
                    if (B == null)
                      return x;
                    if (o.default.query(S, o.default.Scope.BLOCK))
                      x = L.editor.formatLine(B.index, B.length, v({}, S, P));
                    else {
                      if (B.length === 0)
                        return L.selection.format(S, P), x;
                      x = L.editor.formatText(B.index, B.length, v({}, S, P));
                    }
                    return L.setSelection(B, t.default.sources.SILENT), x;
                  }, H);
                }
              }, {
                key: "formatLine",
                value: function(S, P, L, H, B) {
                  var x = this, D = void 0, K = U(S, P, L, H, B), z = g(K, 4);
                  return S = z[0], P = z[1], D = z[2], B = z[3], F.call(this, function() {
                    return x.editor.formatLine(S, P, D);
                  }, B, S, 0);
                }
              }, {
                key: "formatText",
                value: function(S, P, L, H, B) {
                  var x = this, D = void 0, K = U(S, P, L, H, B), z = g(K, 4);
                  return S = z[0], P = z[1], D = z[2], B = z[3], F.call(this, function() {
                    return x.editor.formatText(S, P, D);
                  }, B, S, 0);
                }
              }, {
                key: "getBounds",
                value: function(S) {
                  var P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, L = void 0;
                  typeof S == "number" ? L = this.selection.getBounds(S, P) : L = this.selection.getBounds(S.index, S.length);
                  var H = this.container.getBoundingClientRect();
                  return {
                    bottom: L.bottom - H.top,
                    height: L.height,
                    left: L.left - H.left,
                    right: L.right - H.left,
                    top: L.top - H.top,
                    width: L.width
                  };
                }
              }, {
                key: "getContents",
                value: function() {
                  var S = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.getLength() - S, L = U(S, P), H = g(L, 2);
                  return S = H[0], P = H[1], this.editor.getContents(S, P);
                }
              }, {
                key: "getFormat",
                value: function() {
                  var S = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.getSelection(!0), P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
                  return typeof S == "number" ? this.editor.getFormat(S, P) : this.editor.getFormat(S.index, S.length);
                }
              }, {
                key: "getIndex",
                value: function(S) {
                  return S.offset(this.scroll);
                }
              }, {
                key: "getLength",
                value: function() {
                  return this.scroll.length();
                }
              }, {
                key: "getLeaf",
                value: function(S) {
                  return this.scroll.leaf(S);
                }
              }, {
                key: "getLine",
                value: function(S) {
                  return this.scroll.line(S);
                }
              }, {
                key: "getLines",
                value: function() {
                  var S = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
                  return typeof S != "number" ? this.scroll.lines(S.index, S.length) : this.scroll.lines(S, P);
                }
              }, {
                key: "getModule",
                value: function(S) {
                  return this.theme.modules[S];
                }
              }, {
                key: "getSelection",
                value: function() {
                  var S = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
                  return S && this.focus(), this.update(), this.selection.getRange()[0];
                }
              }, {
                key: "getText",
                value: function() {
                  var S = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.getLength() - S, L = U(S, P), H = g(L, 2);
                  return S = H[0], P = H[1], this.editor.getText(S, P);
                }
              }, {
                key: "hasFocus",
                value: function() {
                  return this.selection.hasFocus();
                }
              }, {
                key: "insertEmbed",
                value: function(S, P, L) {
                  var H = this, B = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : C.sources.API;
                  return F.call(this, function() {
                    return H.editor.insertEmbed(S, P, L);
                  }, B, S);
                }
              }, {
                key: "insertText",
                value: function(S, P, L, H, B) {
                  var x = this, D = void 0, K = U(S, 0, L, H, B), z = g(K, 4);
                  return S = z[0], D = z[2], B = z[3], F.call(this, function() {
                    return x.editor.insertText(S, P, D);
                  }, B, S, P.length);
                }
              }, {
                key: "isEnabled",
                value: function() {
                  return !this.container.classList.contains("ql-disabled");
                }
              }, {
                key: "off",
                value: function() {
                  return this.emitter.off.apply(this.emitter, arguments);
                }
              }, {
                key: "on",
                value: function() {
                  return this.emitter.on.apply(this.emitter, arguments);
                }
              }, {
                key: "once",
                value: function() {
                  return this.emitter.once.apply(this.emitter, arguments);
                }
              }, {
                key: "pasteHTML",
                value: function(S, P, L) {
                  this.clipboard.dangerouslyPasteHTML(S, P, L);
                }
              }, {
                key: "removeFormat",
                value: function(S, P, L) {
                  var H = this, B = U(S, P, L), x = g(B, 4);
                  return S = x[0], P = x[1], L = x[3], F.call(this, function() {
                    return H.editor.removeFormat(S, P);
                  }, L, S);
                }
              }, {
                key: "scrollIntoView",
                value: function() {
                  this.selection.scrollIntoView(this.scrollingContainer);
                }
              }, {
                key: "setContents",
                value: function(S) {
                  var P = this, L = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : t.default.sources.API;
                  return F.call(this, function() {
                    S = new y.default(S);
                    var H = P.getLength(), B = P.editor.deleteText(0, H), x = P.editor.applyDelta(S), D = x.ops[x.ops.length - 1];
                    D != null && typeof D.insert == "string" && D.insert[D.insert.length - 1] === `
` && (P.editor.deleteText(P.getLength() - 1, 1), x.delete(1));
                    var K = B.compose(x);
                    return K;
                  }, L);
                }
              }, {
                key: "setSelection",
                value: function(S, P, L) {
                  if (S == null)
                    this.selection.setRange(null, P || C.sources.API);
                  else {
                    var H = U(S, P, L), B = g(H, 4);
                    S = B[0], P = B[1], L = B[3], this.selection.setRange(new i.Range(S, P), L), L !== t.default.sources.SILENT && this.selection.scrollIntoView(this.scrollingContainer);
                  }
                }
              }, {
                key: "setText",
                value: function(S) {
                  var P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : t.default.sources.API, L = new y.default().insert(S);
                  return this.setContents(L, P);
                }
              }, {
                key: "update",
                value: function() {
                  var S = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : t.default.sources.USER, P = this.scroll.update(S);
                  return this.selection.update(S), P;
                }
              }, {
                key: "updateContents",
                value: function(S) {
                  var P = this, L = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : t.default.sources.API;
                  return F.call(this, function() {
                    return S = new y.default(S), P.editor.applyDelta(S, L);
                  }, L, !0);
                }
              }]), C;
            }();
            q.DEFAULTS = {
              bounds: null,
              formats: null,
              modules: {},
              placeholder: "",
              readOnly: !1,
              scrollingContainer: null,
              strict: !0,
              theme: "default"
            }, q.events = t.default.events, q.sources = t.default.sources, q.version = "1.3.7", q.imports = {
              delta: y.default,
              parchment: o.default,
              "core/module": a.default,
              "core/theme": N.default
            };
            function R(C, j) {
              if (j = (0, d.default)(!0, {
                container: C,
                modules: {
                  clipboard: !0,
                  keyboard: !0,
                  history: !0
                }
              }, j), !j.theme || j.theme === q.DEFAULTS.theme)
                j.theme = N.default;
              else if (j.theme = q.import("themes/" + j.theme), j.theme == null)
                throw new Error("Invalid theme " + j.theme + ". Did you register it?");
              var S = (0, d.default)(!0, {}, j.theme.DEFAULTS);
              [S, j].forEach(function(H) {
                H.modules = H.modules || {}, Object.keys(H.modules).forEach(function(B) {
                  H.modules[B] === !0 && (H.modules[B] = {});
                });
              });
              var P = Object.keys(S.modules).concat(Object.keys(j.modules)), L = P.reduce(function(H, B) {
                var x = q.import("modules/" + B);
                return x == null ? k.error("Cannot load " + B + " module. Are you sure you registered it?") : H[B] = x.DEFAULTS || {}, H;
              }, {});
              return j.modules != null && j.modules.toolbar && j.modules.toolbar.constructor !== Object && (j.modules.toolbar = {
                container: j.modules.toolbar
              }), j = (0, d.default)(!0, {}, q.DEFAULTS, { modules: L }, S, j), ["bounds", "container", "scrollingContainer"].forEach(function(H) {
                typeof j[H] == "string" && (j[H] = document.querySelector(j[H]));
              }), j.modules = Object.keys(j.modules).reduce(function(H, B) {
                return j.modules[B] && (H[B] = j.modules[B]), H;
              }, {}), j;
            }
            function F(C, j, S, P) {
              if (this.options.strict && !this.isEnabled() && j === t.default.sources.USER)
                return new y.default();
              var L = S == null ? null : this.getSelection(), H = this.editor.delta, B = C();
              if (L != null && (S === !0 && (S = L.index), P == null ? L = $(L, B, j) : P !== 0 && (L = $(L, S, P, j)), this.setSelection(L, t.default.sources.SILENT)), B.length() > 0) {
                var x, D = [t.default.events.TEXT_CHANGE, B, H, j];
                if ((x = this.emitter).emit.apply(x, [t.default.events.EDITOR_CHANGE].concat(D)), j !== t.default.sources.SILENT) {
                  var K;
                  (K = this.emitter).emit.apply(K, D);
                }
              }
              return B;
            }
            function U(C, j, S, P, L) {
              var H = {};
              return typeof C.index == "number" && typeof C.length == "number" ? typeof j != "number" ? (L = P, P = S, S = j, j = C.length, C = C.index) : (j = C.length, C = C.index) : typeof j != "number" && (L = P, P = S, S = j, j = 0), (typeof S > "u" ? "undefined" : A(S)) === "object" ? (H = S, L = P) : typeof S == "string" && (P != null ? H[S] = P : L = S), L = L || t.default.sources.API, [C, j, H, L];
            }
            function $(C, j, S, P) {
              if (C == null) return null;
              var L = void 0, H = void 0;
              if (j instanceof y.default) {
                var B = [C.index, C.index + C.length].map(function(z) {
                  return j.transformPosition(z, P !== t.default.sources.USER);
                }), x = g(B, 2);
                L = x[0], H = x[1];
              } else {
                var D = [C.index, C.index + C.length].map(function(z) {
                  return z < j || z === j && P === t.default.sources.USER ? z : S >= 0 ? z + S : Math.max(j, z + S);
                }), K = g(D, 2);
                L = K[0], H = K[1];
              }
              return new i.Range(L, H - L);
            }
            c.expandConfig = R, c.overload = U, c.default = q;
          },
          /* 6 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            });
            var A = /* @__PURE__ */ function() {
              function l(o, i) {
                for (var f = 0; f < i.length; f++) {
                  var r = i[f];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(o, r.key, r);
                }
              }
              return function(o, i, f) {
                return i && l(o.prototype, i), f && l(o, f), o;
              };
            }(), g = function l(o, i, f) {
              o === null && (o = Function.prototype);
              var r = Object.getOwnPropertyDescriptor(o, i);
              if (r === void 0) {
                var d = Object.getPrototypeOf(o);
                return d === null ? void 0 : l(d, i, f);
              } else {
                if ("value" in r)
                  return r.value;
                var T = r.get;
                return T === void 0 ? void 0 : T.call(f);
              }
            }, m = s(7), p = n(m), y = s(0), h = n(y);
            function n(l) {
              return l && l.__esModule ? l : { default: l };
            }
            function e(l, o) {
              if (!(l instanceof o))
                throw new TypeError("Cannot call a class as a function");
            }
            function t(l, o) {
              if (!l)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return o && (typeof o == "object" || typeof o == "function") ? o : l;
            }
            function u(l, o) {
              if (typeof o != "function" && o !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof o);
              l.prototype = Object.create(o && o.prototype, { constructor: { value: l, enumerable: !1, writable: !0, configurable: !0 } }), o && (Object.setPrototypeOf ? Object.setPrototypeOf(l, o) : l.__proto__ = o);
            }
            var a = function(l) {
              u(o, l);
              function o() {
                return e(this, o), t(this, (o.__proto__ || Object.getPrototypeOf(o)).apply(this, arguments));
              }
              return A(o, [{
                key: "formatAt",
                value: function(f, r, d, T) {
                  if (o.compare(this.statics.blotName, d) < 0 && h.default.query(d, h.default.Scope.BLOT)) {
                    var b = this.isolate(f, r);
                    T && b.wrap(d, T);
                  } else
                    g(o.prototype.__proto__ || Object.getPrototypeOf(o.prototype), "formatAt", this).call(this, f, r, d, T);
                }
              }, {
                key: "optimize",
                value: function(f) {
                  if (g(o.prototype.__proto__ || Object.getPrototypeOf(o.prototype), "optimize", this).call(this, f), this.parent instanceof o && o.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
                    var r = this.parent.isolate(this.offset(), this.length());
                    this.moveChildren(r), r.wrap(this);
                  }
                }
              }], [{
                key: "compare",
                value: function(f, r) {
                  var d = o.order.indexOf(f), T = o.order.indexOf(r);
                  return d >= 0 || T >= 0 ? d - T : f === r ? 0 : f < r ? -1 : 1;
                }
              }]), o;
            }(h.default.Inline);
            a.allowedChildren = [a, h.default.Embed, p.default], a.order = [
              "cursor",
              "inline",
              // Must be lower
              "underline",
              "strike",
              "italic",
              "bold",
              "script",
              "link",
              "code"
              // Must be higher
            ], c.default = a;
          },
          /* 7 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            });
            var A = s(0), g = m(A);
            function m(e) {
              return e && e.__esModule ? e : { default: e };
            }
            function p(e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            }
            function y(e, t) {
              if (!e)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return t && (typeof t == "object" || typeof t == "function") ? t : e;
            }
            function h(e, t) {
              if (typeof t != "function" && t !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof t);
              e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
            }
            var n = function(e) {
              h(t, e);
              function t() {
                return p(this, t), y(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
              }
              return t;
            }(g.default.Text);
            c.default = n;
          },
          /* 8 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            });
            var A = /* @__PURE__ */ function() {
              function i(f, r) {
                for (var d = 0; d < r.length; d++) {
                  var T = r[d];
                  T.enumerable = T.enumerable || !1, T.configurable = !0, "value" in T && (T.writable = !0), Object.defineProperty(f, T.key, T);
                }
              }
              return function(f, r, d) {
                return r && i(f.prototype, r), d && i(f, d), f;
              };
            }(), g = function i(f, r, d) {
              f === null && (f = Function.prototype);
              var T = Object.getOwnPropertyDescriptor(f, r);
              if (T === void 0) {
                var b = Object.getPrototypeOf(f);
                return b === null ? void 0 : i(b, r, d);
              } else {
                if ("value" in T)
                  return T.value;
                var E = T.get;
                return E === void 0 ? void 0 : E.call(d);
              }
            }, m = s(54), p = n(m), y = s(10), h = n(y);
            function n(i) {
              return i && i.__esModule ? i : { default: i };
            }
            function e(i, f) {
              if (!(i instanceof f))
                throw new TypeError("Cannot call a class as a function");
            }
            function t(i, f) {
              if (!i)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return f && (typeof f == "object" || typeof f == "function") ? f : i;
            }
            function u(i, f) {
              if (typeof f != "function" && f !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof f);
              i.prototype = Object.create(f && f.prototype, { constructor: { value: i, enumerable: !1, writable: !0, configurable: !0 } }), f && (Object.setPrototypeOf ? Object.setPrototypeOf(i, f) : i.__proto__ = f);
            }
            var a = (0, h.default)("quill:events"), l = ["selectionchange", "mousedown", "mouseup", "click"];
            l.forEach(function(i) {
              document.addEventListener(i, function() {
                for (var f = arguments.length, r = Array(f), d = 0; d < f; d++)
                  r[d] = arguments[d];
                [].slice.call(document.querySelectorAll(".ql-container")).forEach(function(T) {
                  if (T.__quill && T.__quill.emitter) {
                    var b;
                    (b = T.__quill.emitter).handleDOM.apply(b, r);
                  }
                });
              });
            });
            var o = function(i) {
              u(f, i);
              function f() {
                e(this, f);
                var r = t(this, (f.__proto__ || Object.getPrototypeOf(f)).call(this));
                return r.listeners = {}, r.on("error", a.error), r;
              }
              return A(f, [{
                key: "emit",
                value: function() {
                  a.log.apply(a, arguments), g(f.prototype.__proto__ || Object.getPrototypeOf(f.prototype), "emit", this).apply(this, arguments);
                }
              }, {
                key: "handleDOM",
                value: function(d) {
                  for (var T = arguments.length, b = Array(T > 1 ? T - 1 : 0), E = 1; E < T; E++)
                    b[E - 1] = arguments[E];
                  (this.listeners[d.type] || []).forEach(function(N) {
                    var O = N.node, v = N.handler;
                    (d.target === O || O.contains(d.target)) && v.apply(void 0, [d].concat(b));
                  });
                }
              }, {
                key: "listenDOM",
                value: function(d, T, b) {
                  this.listeners[d] || (this.listeners[d] = []), this.listeners[d].push({ node: T, handler: b });
                }
              }]), f;
            }(p.default);
            o.events = {
              EDITOR_CHANGE: "editor-change",
              SCROLL_BEFORE_UPDATE: "scroll-before-update",
              SCROLL_OPTIMIZE: "scroll-optimize",
              SCROLL_UPDATE: "scroll-update",
              SELECTION_CHANGE: "selection-change",
              TEXT_CHANGE: "text-change"
            }, o.sources = {
              API: "api",
              SILENT: "silent",
              USER: "user"
            }, c.default = o;
          },
          /* 9 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            });
            function A(m, p) {
              if (!(m instanceof p))
                throw new TypeError("Cannot call a class as a function");
            }
            var g = function m(p) {
              var y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
              A(this, m), this.quill = p, this.options = y;
            };
            g.DEFAULTS = {}, c.default = g;
          },
          /* 10 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            });
            var A = ["error", "warn", "log", "info"], g = "warn";
            function m(y) {
              if (A.indexOf(y) <= A.indexOf(g)) {
                for (var h, n = arguments.length, e = Array(n > 1 ? n - 1 : 0), t = 1; t < n; t++)
                  e[t - 1] = arguments[t];
                (h = console)[y].apply(h, e);
              }
            }
            function p(y) {
              return A.reduce(function(h, n) {
                return h[n] = m.bind(console, n, y), h;
              }, {});
            }
            m.level = p.level = function(y) {
              g = y;
            }, c.default = p;
          },
          /* 11 */
          /***/
          function(w, c, s) {
            var A = Array.prototype.slice, g = s(52), m = s(53), p = w.exports = function(e, t, u) {
              return u || (u = {}), e === t ? !0 : e instanceof Date && t instanceof Date ? e.getTime() === t.getTime() : !e || !t || typeof e != "object" && typeof t != "object" ? u.strict ? e === t : e == t : n(e, t, u);
            };
            function y(e) {
              return e == null;
            }
            function h(e) {
              return !(!e || typeof e != "object" || typeof e.length != "number" || typeof e.copy != "function" || typeof e.slice != "function" || e.length > 0 && typeof e[0] != "number");
            }
            function n(e, t, u) {
              var a, l;
              if (y(e) || y(t) || e.prototype !== t.prototype) return !1;
              if (m(e))
                return m(t) ? (e = A.call(e), t = A.call(t), p(e, t, u)) : !1;
              if (h(e)) {
                if (!h(t) || e.length !== t.length) return !1;
                for (a = 0; a < e.length; a++)
                  if (e[a] !== t[a]) return !1;
                return !0;
              }
              try {
                var o = g(e), i = g(t);
              } catch {
                return !1;
              }
              if (o.length != i.length)
                return !1;
              for (o.sort(), i.sort(), a = o.length - 1; a >= 0; a--)
                if (o[a] != i[a])
                  return !1;
              for (a = o.length - 1; a >= 0; a--)
                if (l = o[a], !p(e[l], t[l], u)) return !1;
              return typeof e == typeof t;
            }
          },
          /* 12 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", { value: !0 });
            var A = s(1), g = (
              /** @class */
              function() {
                function m(p, y, h) {
                  h === void 0 && (h = {}), this.attrName = p, this.keyName = y;
                  var n = A.Scope.TYPE & A.Scope.ATTRIBUTE;
                  h.scope != null ? this.scope = h.scope & A.Scope.LEVEL | n : this.scope = A.Scope.ATTRIBUTE, h.whitelist != null && (this.whitelist = h.whitelist);
                }
                return m.keys = function(p) {
                  return [].map.call(p.attributes, function(y) {
                    return y.name;
                  });
                }, m.prototype.add = function(p, y) {
                  return this.canAdd(p, y) ? (p.setAttribute(this.keyName, y), !0) : !1;
                }, m.prototype.canAdd = function(p, y) {
                  var h = A.query(p, A.Scope.BLOT & (this.scope | A.Scope.TYPE));
                  return h == null ? !1 : this.whitelist == null ? !0 : typeof y == "string" ? this.whitelist.indexOf(y.replace(/["']/g, "")) > -1 : this.whitelist.indexOf(y) > -1;
                }, m.prototype.remove = function(p) {
                  p.removeAttribute(this.keyName);
                }, m.prototype.value = function(p) {
                  var y = p.getAttribute(this.keyName);
                  return this.canAdd(p, y) && y ? y : "";
                }, m;
              }()
            );
            c.default = g;
          },
          /* 13 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            }), c.default = c.Code = void 0;
            var A = /* @__PURE__ */ function() {
              function E(N, O) {
                var v = [], _ = !0, k = !1, q = void 0;
                try {
                  for (var R = N[Symbol.iterator](), F; !(_ = (F = R.next()).done) && (v.push(F.value), !(O && v.length === O)); _ = !0)
                    ;
                } catch (U) {
                  k = !0, q = U;
                } finally {
                  try {
                    !_ && R.return && R.return();
                  } finally {
                    if (k) throw q;
                  }
                }
                return v;
              }
              return function(N, O) {
                if (Array.isArray(N))
                  return N;
                if (Symbol.iterator in Object(N))
                  return E(N, O);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
              };
            }(), g = /* @__PURE__ */ function() {
              function E(N, O) {
                for (var v = 0; v < O.length; v++) {
                  var _ = O[v];
                  _.enumerable = _.enumerable || !1, _.configurable = !0, "value" in _ && (_.writable = !0), Object.defineProperty(N, _.key, _);
                }
              }
              return function(N, O, v) {
                return O && E(N.prototype, O), v && E(N, v), N;
              };
            }(), m = function E(N, O, v) {
              N === null && (N = Function.prototype);
              var _ = Object.getOwnPropertyDescriptor(N, O);
              if (_ === void 0) {
                var k = Object.getPrototypeOf(N);
                return k === null ? void 0 : E(k, O, v);
              } else {
                if ("value" in _)
                  return _.value;
                var q = _.get;
                return q === void 0 ? void 0 : q.call(v);
              }
            }, p = s(2), y = i(p), h = s(0), n = i(h), e = s(4), t = i(e), u = s(6), a = i(u), l = s(7), o = i(l);
            function i(E) {
              return E && E.__esModule ? E : { default: E };
            }
            function f(E, N) {
              if (!(E instanceof N))
                throw new TypeError("Cannot call a class as a function");
            }
            function r(E, N) {
              if (!E)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return N && (typeof N == "object" || typeof N == "function") ? N : E;
            }
            function d(E, N) {
              if (typeof N != "function" && N !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof N);
              E.prototype = Object.create(N && N.prototype, { constructor: { value: E, enumerable: !1, writable: !0, configurable: !0 } }), N && (Object.setPrototypeOf ? Object.setPrototypeOf(E, N) : E.__proto__ = N);
            }
            var T = function(E) {
              d(N, E);
              function N() {
                return f(this, N), r(this, (N.__proto__ || Object.getPrototypeOf(N)).apply(this, arguments));
              }
              return N;
            }(a.default);
            T.blotName = "code", T.tagName = "CODE";
            var b = function(E) {
              d(N, E);
              function N() {
                return f(this, N), r(this, (N.__proto__ || Object.getPrototypeOf(N)).apply(this, arguments));
              }
              return g(N, [{
                key: "delta",
                value: function() {
                  var v = this, _ = this.domNode.textContent;
                  return _.endsWith(`
`) && (_ = _.slice(0, -1)), _.split(`
`).reduce(function(k, q) {
                    return k.insert(q).insert(`
`, v.formats());
                  }, new y.default());
                }
              }, {
                key: "format",
                value: function(v, _) {
                  if (!(v === this.statics.blotName && _)) {
                    var k = this.descendant(o.default, this.length() - 1), q = A(k, 1), R = q[0];
                    R != null && R.deleteAt(R.length() - 1, 1), m(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "format", this).call(this, v, _);
                  }
                }
              }, {
                key: "formatAt",
                value: function(v, _, k, q) {
                  if (_ !== 0 && !(n.default.query(k, n.default.Scope.BLOCK) == null || k === this.statics.blotName && q === this.statics.formats(this.domNode))) {
                    var R = this.newlineIndex(v);
                    if (!(R < 0 || R >= v + _)) {
                      var F = this.newlineIndex(v, !0) + 1, U = R - F + 1, $ = this.isolate(F, U), C = $.next;
                      $.format(k, q), C instanceof N && C.formatAt(0, v - F + _ - U, k, q);
                    }
                  }
                }
              }, {
                key: "insertAt",
                value: function(v, _, k) {
                  if (k == null) {
                    var q = this.descendant(o.default, v), R = A(q, 2), F = R[0], U = R[1];
                    F.insertAt(U, _);
                  }
                }
              }, {
                key: "length",
                value: function() {
                  var v = this.domNode.textContent.length;
                  return this.domNode.textContent.endsWith(`
`) ? v : v + 1;
                }
              }, {
                key: "newlineIndex",
                value: function(v) {
                  var _ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
                  if (_)
                    return this.domNode.textContent.slice(0, v).lastIndexOf(`
`);
                  var k = this.domNode.textContent.slice(v).indexOf(`
`);
                  return k > -1 ? v + k : -1;
                }
              }, {
                key: "optimize",
                value: function(v) {
                  this.domNode.textContent.endsWith(`
`) || this.appendChild(n.default.create("text", `
`)), m(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "optimize", this).call(this, v);
                  var _ = this.next;
                  _ != null && _.prev === this && _.statics.blotName === this.statics.blotName && this.statics.formats(this.domNode) === _.statics.formats(_.domNode) && (_.optimize(v), _.moveChildren(this), _.remove());
                }
              }, {
                key: "replace",
                value: function(v) {
                  m(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "replace", this).call(this, v), [].slice.call(this.domNode.querySelectorAll("*")).forEach(function(_) {
                    var k = n.default.find(_);
                    k == null ? _.parentNode.removeChild(_) : k instanceof n.default.Embed ? k.remove() : k.unwrap();
                  });
                }
              }], [{
                key: "create",
                value: function(v) {
                  var _ = m(N.__proto__ || Object.getPrototypeOf(N), "create", this).call(this, v);
                  return _.setAttribute("spellcheck", !1), _;
                }
              }, {
                key: "formats",
                value: function() {
                  return !0;
                }
              }]), N;
            }(t.default);
            b.blotName = "code-block", b.tagName = "PRE", b.TAB = "  ", c.Code = T, c.default = b;
          },
          /* 14 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            });
            var A = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(C) {
              return typeof C;
            } : function(C) {
              return C && typeof Symbol == "function" && C.constructor === Symbol && C !== Symbol.prototype ? "symbol" : typeof C;
            }, g = /* @__PURE__ */ function() {
              function C(j, S) {
                var P = [], L = !0, H = !1, B = void 0;
                try {
                  for (var x = j[Symbol.iterator](), D; !(L = (D = x.next()).done) && (P.push(D.value), !(S && P.length === S)); L = !0)
                    ;
                } catch (K) {
                  H = !0, B = K;
                } finally {
                  try {
                    !L && x.return && x.return();
                  } finally {
                    if (H) throw B;
                  }
                }
                return P;
              }
              return function(j, S) {
                if (Array.isArray(j))
                  return j;
                if (Symbol.iterator in Object(j))
                  return C(j, S);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
              };
            }(), m = /* @__PURE__ */ function() {
              function C(j, S) {
                for (var P = 0; P < S.length; P++) {
                  var L = S[P];
                  L.enumerable = L.enumerable || !1, L.configurable = !0, "value" in L && (L.writable = !0), Object.defineProperty(j, L.key, L);
                }
              }
              return function(j, S, P) {
                return S && C(j.prototype, S), P && C(j, P), j;
              };
            }(), p = s(2), y = _(p), h = s(20), n = _(h), e = s(0), t = _(e), u = s(13), a = _(u), l = s(24), o = _(l), i = s(4), f = _(i), r = s(16), d = _(r), T = s(21), b = _(T), E = s(11), N = _(E), O = s(3), v = _(O);
            function _(C) {
              return C && C.__esModule ? C : { default: C };
            }
            function k(C, j, S) {
              return j in C ? Object.defineProperty(C, j, { value: S, enumerable: !0, configurable: !0, writable: !0 }) : C[j] = S, C;
            }
            function q(C, j) {
              if (!(C instanceof j))
                throw new TypeError("Cannot call a class as a function");
            }
            var R = /^[ -~]*$/, F = function() {
              function C(j) {
                q(this, C), this.scroll = j, this.delta = this.getDelta();
              }
              return m(C, [{
                key: "applyDelta",
                value: function(S) {
                  var P = this, L = !1;
                  this.scroll.update();
                  var H = this.scroll.length();
                  return this.scroll.batchStart(), S = $(S), S.reduce(function(B, x) {
                    var D = x.retain || x.delete || x.insert.length || 1, K = x.attributes || {};
                    if (x.insert != null) {
                      if (typeof x.insert == "string") {
                        var z = x.insert;
                        z.endsWith(`
`) && L && (L = !1, z = z.slice(0, -1)), B >= H && !z.endsWith(`
`) && (L = !0), P.scroll.insertAt(B, z);
                        var W = P.scroll.line(B), Q = g(W, 2), J = Q[0], ee = Q[1], ie = (0, v.default)({}, (0, i.bubbleFormats)(J));
                        if (J instanceof f.default) {
                          var oe = J.descendant(t.default.Leaf, ee), se = g(oe, 1), ue = se[0];
                          ie = (0, v.default)(ie, (0, i.bubbleFormats)(ue));
                        }
                        K = n.default.attributes.diff(ie, K) || {};
                      } else if (A(x.insert) === "object") {
                        var G = Object.keys(x.insert)[0];
                        if (G == null) return B;
                        P.scroll.insertAt(B, G, x.insert[G]);
                      }
                      H += D;
                    }
                    return Object.keys(K).forEach(function(V) {
                      P.scroll.formatAt(B, D, V, K[V]);
                    }), B + D;
                  }, 0), S.reduce(function(B, x) {
                    return typeof x.delete == "number" ? (P.scroll.deleteAt(B, x.delete), B) : B + (x.retain || x.insert.length || 1);
                  }, 0), this.scroll.batchEnd(), this.update(S);
                }
              }, {
                key: "deleteText",
                value: function(S, P) {
                  return this.scroll.deleteAt(S, P), this.update(new y.default().retain(S).delete(P));
                }
              }, {
                key: "formatLine",
                value: function(S, P) {
                  var L = this, H = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                  return this.scroll.update(), Object.keys(H).forEach(function(B) {
                    if (!(L.scroll.whitelist != null && !L.scroll.whitelist[B])) {
                      var x = L.scroll.lines(S, Math.max(P, 1)), D = P;
                      x.forEach(function(K) {
                        var z = K.length();
                        if (!(K instanceof a.default))
                          K.format(B, H[B]);
                        else {
                          var W = S - K.offset(L.scroll), Q = K.newlineIndex(W + D) - W + 1;
                          K.formatAt(W, Q, B, H[B]);
                        }
                        D -= z;
                      });
                    }
                  }), this.scroll.optimize(), this.update(new y.default().retain(S).retain(P, (0, b.default)(H)));
                }
              }, {
                key: "formatText",
                value: function(S, P) {
                  var L = this, H = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                  return Object.keys(H).forEach(function(B) {
                    L.scroll.formatAt(S, P, B, H[B]);
                  }), this.update(new y.default().retain(S).retain(P, (0, b.default)(H)));
                }
              }, {
                key: "getContents",
                value: function(S, P) {
                  return this.delta.slice(S, S + P);
                }
              }, {
                key: "getDelta",
                value: function() {
                  return this.scroll.lines().reduce(function(S, P) {
                    return S.concat(P.delta());
                  }, new y.default());
                }
              }, {
                key: "getFormat",
                value: function(S) {
                  var P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, L = [], H = [];
                  P === 0 ? this.scroll.path(S).forEach(function(x) {
                    var D = g(x, 1), K = D[0];
                    K instanceof f.default ? L.push(K) : K instanceof t.default.Leaf && H.push(K);
                  }) : (L = this.scroll.lines(S, P), H = this.scroll.descendants(t.default.Leaf, S, P));
                  var B = [L, H].map(function(x) {
                    if (x.length === 0) return {};
                    for (var D = (0, i.bubbleFormats)(x.shift()); Object.keys(D).length > 0; ) {
                      var K = x.shift();
                      if (K == null) return D;
                      D = U((0, i.bubbleFormats)(K), D);
                    }
                    return D;
                  });
                  return v.default.apply(v.default, B);
                }
              }, {
                key: "getText",
                value: function(S, P) {
                  return this.getContents(S, P).filter(function(L) {
                    return typeof L.insert == "string";
                  }).map(function(L) {
                    return L.insert;
                  }).join("");
                }
              }, {
                key: "insertEmbed",
                value: function(S, P, L) {
                  return this.scroll.insertAt(S, P, L), this.update(new y.default().retain(S).insert(k({}, P, L)));
                }
              }, {
                key: "insertText",
                value: function(S, P) {
                  var L = this, H = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                  return P = P.replace(/\r\n/g, `
`).replace(/\r/g, `
`), this.scroll.insertAt(S, P), Object.keys(H).forEach(function(B) {
                    L.scroll.formatAt(S, P.length, B, H[B]);
                  }), this.update(new y.default().retain(S).insert(P, (0, b.default)(H)));
                }
              }, {
                key: "isBlank",
                value: function() {
                  if (this.scroll.children.length == 0) return !0;
                  if (this.scroll.children.length > 1) return !1;
                  var S = this.scroll.children.head;
                  return S.statics.blotName !== f.default.blotName || S.children.length > 1 ? !1 : S.children.head instanceof d.default;
                }
              }, {
                key: "removeFormat",
                value: function(S, P) {
                  var L = this.getText(S, P), H = this.scroll.line(S + P), B = g(H, 2), x = B[0], D = B[1], K = 0, z = new y.default();
                  x != null && (x instanceof a.default ? K = x.newlineIndex(D) - D + 1 : K = x.length() - D, z = x.delta().slice(D, D + K - 1).insert(`
`));
                  var W = this.getContents(S, P + K), Q = W.diff(new y.default().insert(L).concat(z)), J = new y.default().retain(S).concat(Q);
                  return this.applyDelta(J);
                }
              }, {
                key: "update",
                value: function(S) {
                  var P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], L = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0, H = this.delta;
                  if (P.length === 1 && P[0].type === "characterData" && P[0].target.data.match(R) && t.default.find(P[0].target)) {
                    var B = t.default.find(P[0].target), x = (0, i.bubbleFormats)(B), D = B.offset(this.scroll), K = P[0].oldValue.replace(o.default.CONTENTS, ""), z = new y.default().insert(K), W = new y.default().insert(B.value()), Q = new y.default().retain(D).concat(z.diff(W, L));
                    S = Q.reduce(function(J, ee) {
                      return ee.insert ? J.insert(ee.insert, x) : J.push(ee);
                    }, new y.default()), this.delta = H.compose(S);
                  } else
                    this.delta = this.getDelta(), (!S || !(0, N.default)(H.compose(S), this.delta)) && (S = H.diff(this.delta, L));
                  return S;
                }
              }]), C;
            }();
            function U(C, j) {
              return Object.keys(j).reduce(function(S, P) {
                return C[P] == null || (j[P] === C[P] ? S[P] = j[P] : Array.isArray(j[P]) ? j[P].indexOf(C[P]) < 0 && (S[P] = j[P].concat([C[P]])) : S[P] = [j[P], C[P]]), S;
              }, {});
            }
            function $(C) {
              return C.reduce(function(j, S) {
                if (S.insert === 1) {
                  var P = (0, b.default)(S.attributes);
                  return delete P.image, j.insert({ image: S.attributes.image }, P);
                }
                if (S.attributes != null && (S.attributes.list === !0 || S.attributes.bullet === !0) && (S = (0, b.default)(S), S.attributes.list ? S.attributes.list = "ordered" : (S.attributes.list = "bullet", delete S.attributes.bullet)), typeof S.insert == "string") {
                  var L = S.insert.replace(/\r\n/g, `
`).replace(/\r/g, `
`);
                  return j.insert(L, S.attributes);
                }
                return j.push(S);
              }, new y.default());
            }
            c.default = F;
          },
          /* 15 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            }), c.default = c.Range = void 0;
            var A = /* @__PURE__ */ function() {
              function E(N, O) {
                var v = [], _ = !0, k = !1, q = void 0;
                try {
                  for (var R = N[Symbol.iterator](), F; !(_ = (F = R.next()).done) && (v.push(F.value), !(O && v.length === O)); _ = !0)
                    ;
                } catch (U) {
                  k = !0, q = U;
                } finally {
                  try {
                    !_ && R.return && R.return();
                  } finally {
                    if (k) throw q;
                  }
                }
                return v;
              }
              return function(N, O) {
                if (Array.isArray(N))
                  return N;
                if (Symbol.iterator in Object(N))
                  return E(N, O);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
              };
            }(), g = /* @__PURE__ */ function() {
              function E(N, O) {
                for (var v = 0; v < O.length; v++) {
                  var _ = O[v];
                  _.enumerable = _.enumerable || !1, _.configurable = !0, "value" in _ && (_.writable = !0), Object.defineProperty(N, _.key, _);
                }
              }
              return function(N, O, v) {
                return O && E(N.prototype, O), v && E(N, v), N;
              };
            }(), m = s(0), p = o(m), y = s(21), h = o(y), n = s(11), e = o(n), t = s(8), u = o(t), a = s(10), l = o(a);
            function o(E) {
              return E && E.__esModule ? E : { default: E };
            }
            function i(E) {
              if (Array.isArray(E)) {
                for (var N = 0, O = Array(E.length); N < E.length; N++)
                  O[N] = E[N];
                return O;
              } else
                return Array.from(E);
            }
            function f(E, N) {
              if (!(E instanceof N))
                throw new TypeError("Cannot call a class as a function");
            }
            var r = (0, l.default)("quill:selection"), d = function E(N) {
              var O = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
              f(this, E), this.index = N, this.length = O;
            }, T = function() {
              function E(N, O) {
                var v = this;
                f(this, E), this.emitter = O, this.scroll = N, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = p.default.create("cursor", this), this.lastRange = this.savedRange = new d(0, 0), this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, function() {
                  v.mouseDown || setTimeout(v.update.bind(v, u.default.sources.USER), 1);
                }), this.emitter.on(u.default.events.EDITOR_CHANGE, function(_, k) {
                  _ === u.default.events.TEXT_CHANGE && k.length() > 0 && v.update(u.default.sources.SILENT);
                }), this.emitter.on(u.default.events.SCROLL_BEFORE_UPDATE, function() {
                  if (v.hasFocus()) {
                    var _ = v.getNativeRange();
                    _ != null && _.start.node !== v.cursor.textNode && v.emitter.once(u.default.events.SCROLL_UPDATE, function() {
                      try {
                        v.setNativeRange(_.start.node, _.start.offset, _.end.node, _.end.offset);
                      } catch {
                      }
                    });
                  }
                }), this.emitter.on(u.default.events.SCROLL_OPTIMIZE, function(_, k) {
                  if (k.range) {
                    var q = k.range, R = q.startNode, F = q.startOffset, U = q.endNode, $ = q.endOffset;
                    v.setNativeRange(R, F, U, $);
                  }
                }), this.update(u.default.sources.SILENT);
              }
              return g(E, [{
                key: "handleComposition",
                value: function() {
                  var O = this;
                  this.root.addEventListener("compositionstart", function() {
                    O.composing = !0;
                  }), this.root.addEventListener("compositionend", function() {
                    if (O.composing = !1, O.cursor.parent) {
                      var v = O.cursor.restore();
                      if (!v) return;
                      setTimeout(function() {
                        O.setNativeRange(v.startNode, v.startOffset, v.endNode, v.endOffset);
                      }, 1);
                    }
                  });
                }
              }, {
                key: "handleDragging",
                value: function() {
                  var O = this;
                  this.emitter.listenDOM("mousedown", document.body, function() {
                    O.mouseDown = !0;
                  }), this.emitter.listenDOM("mouseup", document.body, function() {
                    O.mouseDown = !1, O.update(u.default.sources.USER);
                  });
                }
              }, {
                key: "focus",
                value: function() {
                  this.hasFocus() || (this.root.focus(), this.setRange(this.savedRange));
                }
              }, {
                key: "format",
                value: function(O, v) {
                  if (!(this.scroll.whitelist != null && !this.scroll.whitelist[O])) {
                    this.scroll.update();
                    var _ = this.getNativeRange();
                    if (!(_ == null || !_.native.collapsed || p.default.query(O, p.default.Scope.BLOCK))) {
                      if (_.start.node !== this.cursor.textNode) {
                        var k = p.default.find(_.start.node, !1);
                        if (k == null) return;
                        if (k instanceof p.default.Leaf) {
                          var q = k.split(_.start.offset);
                          k.parent.insertBefore(this.cursor, q);
                        } else
                          k.insertBefore(this.cursor, _.start.node);
                        this.cursor.attach();
                      }
                      this.cursor.format(O, v), this.scroll.optimize(), this.setNativeRange(this.cursor.textNode, this.cursor.textNode.data.length), this.update();
                    }
                  }
                }
              }, {
                key: "getBounds",
                value: function(O) {
                  var v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, _ = this.scroll.length();
                  O = Math.min(O, _ - 1), v = Math.min(O + v, _ - 1) - O;
                  var k = void 0, q = this.scroll.leaf(O), R = A(q, 2), F = R[0], U = R[1];
                  if (F == null) return null;
                  var $ = F.position(U, !0), C = A($, 2);
                  k = C[0], U = C[1];
                  var j = document.createRange();
                  if (v > 0) {
                    j.setStart(k, U);
                    var S = this.scroll.leaf(O + v), P = A(S, 2);
                    if (F = P[0], U = P[1], F == null) return null;
                    var L = F.position(U, !0), H = A(L, 2);
                    return k = H[0], U = H[1], j.setEnd(k, U), j.getBoundingClientRect();
                  } else {
                    var B = "left", x = void 0;
                    return k instanceof Text ? (U < k.data.length ? (j.setStart(k, U), j.setEnd(k, U + 1)) : (j.setStart(k, U - 1), j.setEnd(k, U), B = "right"), x = j.getBoundingClientRect()) : (x = F.domNode.getBoundingClientRect(), U > 0 && (B = "right")), {
                      bottom: x.top + x.height,
                      height: x.height,
                      left: x[B],
                      right: x[B],
                      top: x.top,
                      width: 0
                    };
                  }
                }
              }, {
                key: "getNativeRange",
                value: function() {
                  var O = document.getSelection();
                  if (O == null || O.rangeCount <= 0) return null;
                  var v = O.getRangeAt(0);
                  if (v == null) return null;
                  var _ = this.normalizeNative(v);
                  return r.info("getNativeRange", _), _;
                }
              }, {
                key: "getRange",
                value: function() {
                  var O = this.getNativeRange();
                  if (O == null) return [null, null];
                  var v = this.normalizedToRange(O);
                  return [v, O];
                }
              }, {
                key: "hasFocus",
                value: function() {
                  return document.activeElement === this.root;
                }
              }, {
                key: "normalizedToRange",
                value: function(O) {
                  var v = this, _ = [[O.start.node, O.start.offset]];
                  O.native.collapsed || _.push([O.end.node, O.end.offset]);
                  var k = _.map(function(F) {
                    var U = A(F, 2), $ = U[0], C = U[1], j = p.default.find($, !0), S = j.offset(v.scroll);
                    return C === 0 ? S : j instanceof p.default.Container ? S + j.length() : S + j.index($, C);
                  }), q = Math.min(Math.max.apply(Math, i(k)), this.scroll.length() - 1), R = Math.min.apply(Math, [q].concat(i(k)));
                  return new d(R, q - R);
                }
              }, {
                key: "normalizeNative",
                value: function(O) {
                  if (!b(this.root, O.startContainer) || !O.collapsed && !b(this.root, O.endContainer))
                    return null;
                  var v = {
                    start: { node: O.startContainer, offset: O.startOffset },
                    end: { node: O.endContainer, offset: O.endOffset },
                    native: O
                  };
                  return [v.start, v.end].forEach(function(_) {
                    for (var k = _.node, q = _.offset; !(k instanceof Text) && k.childNodes.length > 0; )
                      if (k.childNodes.length > q)
                        k = k.childNodes[q], q = 0;
                      else if (k.childNodes.length === q)
                        k = k.lastChild, q = k instanceof Text ? k.data.length : k.childNodes.length + 1;
                      else
                        break;
                    _.node = k, _.offset = q;
                  }), v;
                }
              }, {
                key: "rangeToNative",
                value: function(O) {
                  var v = this, _ = O.collapsed ? [O.index] : [O.index, O.index + O.length], k = [], q = this.scroll.length();
                  return _.forEach(function(R, F) {
                    R = Math.min(q - 1, R);
                    var U = void 0, $ = v.scroll.leaf(R), C = A($, 2), j = C[0], S = C[1], P = j.position(S, F !== 0), L = A(P, 2);
                    U = L[0], S = L[1], k.push(U, S);
                  }), k.length < 2 && (k = k.concat(k)), k;
                }
              }, {
                key: "scrollIntoView",
                value: function(O) {
                  var v = this.lastRange;
                  if (v != null) {
                    var _ = this.getBounds(v.index, v.length);
                    if (_ != null) {
                      var k = this.scroll.length() - 1, q = this.scroll.line(Math.min(v.index, k)), R = A(q, 1), F = R[0], U = F;
                      if (v.length > 0) {
                        var $ = this.scroll.line(Math.min(v.index + v.length, k)), C = A($, 1);
                        U = C[0];
                      }
                      if (!(F == null || U == null)) {
                        var j = O.getBoundingClientRect();
                        _.top < j.top ? O.scrollTop -= j.top - _.top : _.bottom > j.bottom && (O.scrollTop += _.bottom - j.bottom);
                      }
                    }
                  }
                }
              }, {
                key: "setNativeRange",
                value: function(O, v) {
                  var _ = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : O, k = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : v, q = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
                  if (r.info("setNativeRange", O, v, _, k), !(O != null && (this.root.parentNode == null || O.parentNode == null || _.parentNode == null))) {
                    var R = document.getSelection();
                    if (R != null)
                      if (O != null) {
                        this.hasFocus() || this.root.focus();
                        var F = (this.getNativeRange() || {}).native;
                        if (F == null || q || O !== F.startContainer || v !== F.startOffset || _ !== F.endContainer || k !== F.endOffset) {
                          O.tagName == "BR" && (v = [].indexOf.call(O.parentNode.childNodes, O), O = O.parentNode), _.tagName == "BR" && (k = [].indexOf.call(_.parentNode.childNodes, _), _ = _.parentNode);
                          var U = document.createRange();
                          U.setStart(O, v), U.setEnd(_, k), R.removeAllRanges(), R.addRange(U);
                        }
                      } else
                        R.removeAllRanges(), this.root.blur(), document.body.focus();
                  }
                }
              }, {
                key: "setRange",
                value: function(O) {
                  var v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, _ = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : u.default.sources.API;
                  if (typeof v == "string" && (_ = v, v = !1), r.info("setRange", O), O != null) {
                    var k = this.rangeToNative(O);
                    this.setNativeRange.apply(this, i(k).concat([v]));
                  } else
                    this.setNativeRange(null);
                  this.update(_);
                }
              }, {
                key: "update",
                value: function() {
                  var O = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : u.default.sources.USER, v = this.lastRange, _ = this.getRange(), k = A(_, 2), q = k[0], R = k[1];
                  if (this.lastRange = q, this.lastRange != null && (this.savedRange = this.lastRange), !(0, e.default)(v, this.lastRange)) {
                    var F;
                    !this.composing && R != null && R.native.collapsed && R.start.node !== this.cursor.textNode && this.cursor.restore();
                    var U = [u.default.events.SELECTION_CHANGE, (0, h.default)(this.lastRange), (0, h.default)(v), O];
                    if ((F = this.emitter).emit.apply(F, [u.default.events.EDITOR_CHANGE].concat(U)), O !== u.default.sources.SILENT) {
                      var $;
                      ($ = this.emitter).emit.apply($, U);
                    }
                  }
                }
              }]), E;
            }();
            function b(E, N) {
              try {
                N.parentNode;
              } catch {
                return !1;
              }
              return N instanceof Text && (N = N.parentNode), E.contains(N);
            }
            c.Range = d, c.default = T;
          },
          /* 16 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            });
            var A = /* @__PURE__ */ function() {
              function u(a, l) {
                for (var o = 0; o < l.length; o++) {
                  var i = l[o];
                  i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(a, i.key, i);
                }
              }
              return function(a, l, o) {
                return l && u(a.prototype, l), o && u(a, o), a;
              };
            }(), g = function u(a, l, o) {
              a === null && (a = Function.prototype);
              var i = Object.getOwnPropertyDescriptor(a, l);
              if (i === void 0) {
                var f = Object.getPrototypeOf(a);
                return f === null ? void 0 : u(f, l, o);
              } else {
                if ("value" in i)
                  return i.value;
                var r = i.get;
                return r === void 0 ? void 0 : r.call(o);
              }
            }, m = s(0), p = y(m);
            function y(u) {
              return u && u.__esModule ? u : { default: u };
            }
            function h(u, a) {
              if (!(u instanceof a))
                throw new TypeError("Cannot call a class as a function");
            }
            function n(u, a) {
              if (!u)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return a && (typeof a == "object" || typeof a == "function") ? a : u;
            }
            function e(u, a) {
              if (typeof a != "function" && a !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof a);
              u.prototype = Object.create(a && a.prototype, { constructor: { value: u, enumerable: !1, writable: !0, configurable: !0 } }), a && (Object.setPrototypeOf ? Object.setPrototypeOf(u, a) : u.__proto__ = a);
            }
            var t = function(u) {
              e(a, u);
              function a() {
                return h(this, a), n(this, (a.__proto__ || Object.getPrototypeOf(a)).apply(this, arguments));
              }
              return A(a, [{
                key: "insertInto",
                value: function(o, i) {
                  o.children.length === 0 ? g(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "insertInto", this).call(this, o, i) : this.remove();
                }
              }, {
                key: "length",
                value: function() {
                  return 0;
                }
              }, {
                key: "value",
                value: function() {
                  return "";
                }
              }], [{
                key: "value",
                value: function() {
                }
              }]), a;
            }(p.default.Embed);
            t.blotName = "break", t.tagName = "BR", c.default = t;
          },
          /* 17 */
          /***/
          function(w, c, s) {
            var A = this && this.__extends || function() {
              var n = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
                e.__proto__ = t;
              } || function(e, t) {
                for (var u in t) t.hasOwnProperty(u) && (e[u] = t[u]);
              };
              return function(e, t) {
                n(e, t);
                function u() {
                  this.constructor = e;
                }
                e.prototype = t === null ? Object.create(t) : (u.prototype = t.prototype, new u());
              };
            }();
            Object.defineProperty(c, "__esModule", { value: !0 });
            var g = s(44), m = s(30), p = s(1), y = (
              /** @class */
              function(n) {
                A(e, n);
                function e(t) {
                  var u = n.call(this, t) || this;
                  return u.build(), u;
                }
                return e.prototype.appendChild = function(t) {
                  this.insertBefore(t);
                }, e.prototype.attach = function() {
                  n.prototype.attach.call(this), this.children.forEach(function(t) {
                    t.attach();
                  });
                }, e.prototype.build = function() {
                  var t = this;
                  this.children = new g.default(), [].slice.call(this.domNode.childNodes).reverse().forEach(function(u) {
                    try {
                      var a = h(u);
                      t.insertBefore(a, t.children.head || void 0);
                    } catch (l) {
                      if (l instanceof p.ParchmentError)
                        return;
                      throw l;
                    }
                  });
                }, e.prototype.deleteAt = function(t, u) {
                  if (t === 0 && u === this.length())
                    return this.remove();
                  this.children.forEachAt(t, u, function(a, l, o) {
                    a.deleteAt(l, o);
                  });
                }, e.prototype.descendant = function(t, u) {
                  var a = this.children.find(u), l = a[0], o = a[1];
                  return t.blotName == null && t(l) || t.blotName != null && l instanceof t ? [l, o] : l instanceof e ? l.descendant(t, o) : [null, -1];
                }, e.prototype.descendants = function(t, u, a) {
                  u === void 0 && (u = 0), a === void 0 && (a = Number.MAX_VALUE);
                  var l = [], o = a;
                  return this.children.forEachAt(u, a, function(i, f, r) {
                    (t.blotName == null && t(i) || t.blotName != null && i instanceof t) && l.push(i), i instanceof e && (l = l.concat(i.descendants(t, f, o))), o -= r;
                  }), l;
                }, e.prototype.detach = function() {
                  this.children.forEach(function(t) {
                    t.detach();
                  }), n.prototype.detach.call(this);
                }, e.prototype.formatAt = function(t, u, a, l) {
                  this.children.forEachAt(t, u, function(o, i, f) {
                    o.formatAt(i, f, a, l);
                  });
                }, e.prototype.insertAt = function(t, u, a) {
                  var l = this.children.find(t), o = l[0], i = l[1];
                  if (o)
                    o.insertAt(i, u, a);
                  else {
                    var f = a == null ? p.create("text", u) : p.create(u, a);
                    this.appendChild(f);
                  }
                }, e.prototype.insertBefore = function(t, u) {
                  if (this.statics.allowedChildren != null && !this.statics.allowedChildren.some(function(a) {
                    return t instanceof a;
                  }))
                    throw new p.ParchmentError("Cannot insert " + t.statics.blotName + " into " + this.statics.blotName);
                  t.insertInto(this, u);
                }, e.prototype.length = function() {
                  return this.children.reduce(function(t, u) {
                    return t + u.length();
                  }, 0);
                }, e.prototype.moveChildren = function(t, u) {
                  this.children.forEach(function(a) {
                    t.insertBefore(a, u);
                  });
                }, e.prototype.optimize = function(t) {
                  if (n.prototype.optimize.call(this, t), this.children.length === 0)
                    if (this.statics.defaultChild != null) {
                      var u = p.create(this.statics.defaultChild);
                      this.appendChild(u), u.optimize(t);
                    } else
                      this.remove();
                }, e.prototype.path = function(t, u) {
                  u === void 0 && (u = !1);
                  var a = this.children.find(t, u), l = a[0], o = a[1], i = [[this, t]];
                  return l instanceof e ? i.concat(l.path(o, u)) : (l != null && i.push([l, o]), i);
                }, e.prototype.removeChild = function(t) {
                  this.children.remove(t);
                }, e.prototype.replace = function(t) {
                  t instanceof e && t.moveChildren(this), n.prototype.replace.call(this, t);
                }, e.prototype.split = function(t, u) {
                  if (u === void 0 && (u = !1), !u) {
                    if (t === 0)
                      return this;
                    if (t === this.length())
                      return this.next;
                  }
                  var a = this.clone();
                  return this.parent.insertBefore(a, this.next), this.children.forEachAt(t, this.length(), function(l, o, i) {
                    l = l.split(o, u), a.appendChild(l);
                  }), a;
                }, e.prototype.unwrap = function() {
                  this.moveChildren(this.parent, this.next), this.remove();
                }, e.prototype.update = function(t, u) {
                  var a = this, l = [], o = [];
                  t.forEach(function(i) {
                    i.target === a.domNode && i.type === "childList" && (l.push.apply(l, i.addedNodes), o.push.apply(o, i.removedNodes));
                  }), o.forEach(function(i) {
                    if (!(i.parentNode != null && // @ts-ignore
                    i.tagName !== "IFRAME" && document.body.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_CONTAINED_BY)) {
                      var f = p.find(i);
                      f != null && (f.domNode.parentNode == null || f.domNode.parentNode === a.domNode) && f.detach();
                    }
                  }), l.filter(function(i) {
                    return i.parentNode == a.domNode;
                  }).sort(function(i, f) {
                    return i === f ? 0 : i.compareDocumentPosition(f) & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : -1;
                  }).forEach(function(i) {
                    var f = null;
                    i.nextSibling != null && (f = p.find(i.nextSibling));
                    var r = h(i);
                    (r.next != f || r.next == null) && (r.parent != null && r.parent.removeChild(a), a.insertBefore(r, f || void 0));
                  });
                }, e;
              }(m.default)
            );
            function h(n) {
              var e = p.find(n);
              if (e == null)
                try {
                  e = p.create(n);
                } catch {
                  e = p.create(p.Scope.INLINE), [].slice.call(n.childNodes).forEach(function(u) {
                    e.domNode.appendChild(u);
                  }), n.parentNode && n.parentNode.replaceChild(e.domNode, n), e.attach();
                }
              return e;
            }
            c.default = y;
          },
          /* 18 */
          /***/
          function(w, c, s) {
            var A = this && this.__extends || function() {
              var n = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
                e.__proto__ = t;
              } || function(e, t) {
                for (var u in t) t.hasOwnProperty(u) && (e[u] = t[u]);
              };
              return function(e, t) {
                n(e, t);
                function u() {
                  this.constructor = e;
                }
                e.prototype = t === null ? Object.create(t) : (u.prototype = t.prototype, new u());
              };
            }();
            Object.defineProperty(c, "__esModule", { value: !0 });
            var g = s(12), m = s(31), p = s(17), y = s(1), h = (
              /** @class */
              function(n) {
                A(e, n);
                function e(t) {
                  var u = n.call(this, t) || this;
                  return u.attributes = new m.default(u.domNode), u;
                }
                return e.formats = function(t) {
                  if (typeof this.tagName == "string")
                    return !0;
                  if (Array.isArray(this.tagName))
                    return t.tagName.toLowerCase();
                }, e.prototype.format = function(t, u) {
                  var a = y.query(t);
                  a instanceof g.default ? this.attributes.attribute(a, u) : u && a != null && (t !== this.statics.blotName || this.formats()[t] !== u) && this.replaceWith(t, u);
                }, e.prototype.formats = function() {
                  var t = this.attributes.values(), u = this.statics.formats(this.domNode);
                  return u != null && (t[this.statics.blotName] = u), t;
                }, e.prototype.replaceWith = function(t, u) {
                  var a = n.prototype.replaceWith.call(this, t, u);
                  return this.attributes.copy(a), a;
                }, e.prototype.update = function(t, u) {
                  var a = this;
                  n.prototype.update.call(this, t, u), t.some(function(l) {
                    return l.target === a.domNode && l.type === "attributes";
                  }) && this.attributes.build();
                }, e.prototype.wrap = function(t, u) {
                  var a = n.prototype.wrap.call(this, t, u);
                  return a instanceof e && a.statics.scope === this.statics.scope && this.attributes.move(a), a;
                }, e;
              }(p.default)
            );
            c.default = h;
          },
          /* 19 */
          /***/
          function(w, c, s) {
            var A = this && this.__extends || function() {
              var y = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(h, n) {
                h.__proto__ = n;
              } || function(h, n) {
                for (var e in n) n.hasOwnProperty(e) && (h[e] = n[e]);
              };
              return function(h, n) {
                y(h, n);
                function e() {
                  this.constructor = h;
                }
                h.prototype = n === null ? Object.create(n) : (e.prototype = n.prototype, new e());
              };
            }();
            Object.defineProperty(c, "__esModule", { value: !0 });
            var g = s(30), m = s(1), p = (
              /** @class */
              function(y) {
                A(h, y);
                function h() {
                  return y !== null && y.apply(this, arguments) || this;
                }
                return h.value = function(n) {
                  return !0;
                }, h.prototype.index = function(n, e) {
                  return this.domNode === n || this.domNode.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY ? Math.min(e, 1) : -1;
                }, h.prototype.position = function(n, e) {
                  var t = [].indexOf.call(this.parent.domNode.childNodes, this.domNode);
                  return n > 0 && (t += 1), [this.parent.domNode, t];
                }, h.prototype.value = function() {
                  var n;
                  return n = {}, n[this.statics.blotName] = this.statics.value(this.domNode) || !0, n;
                }, h.scope = m.Scope.INLINE_BLOT, h;
              }(g.default)
            );
            c.default = p;
          },
          /* 20 */
          /***/
          function(w, c, s) {
            var A = s(11), g = s(3), m = {
              attributes: {
                compose: function(y, h, n) {
                  typeof y != "object" && (y = {}), typeof h != "object" && (h = {});
                  var e = g(!0, {}, h);
                  n || (e = Object.keys(e).reduce(function(u, a) {
                    return e[a] != null && (u[a] = e[a]), u;
                  }, {}));
                  for (var t in y)
                    y[t] !== void 0 && h[t] === void 0 && (e[t] = y[t]);
                  return Object.keys(e).length > 0 ? e : void 0;
                },
                diff: function(y, h) {
                  typeof y != "object" && (y = {}), typeof h != "object" && (h = {});
                  var n = Object.keys(y).concat(Object.keys(h)).reduce(function(e, t) {
                    return A(y[t], h[t]) || (e[t] = h[t] === void 0 ? null : h[t]), e;
                  }, {});
                  return Object.keys(n).length > 0 ? n : void 0;
                },
                transform: function(y, h, n) {
                  if (typeof y != "object") return h;
                  if (typeof h == "object") {
                    if (!n) return h;
                    var e = Object.keys(h).reduce(function(t, u) {
                      return y[u] === void 0 && (t[u] = h[u]), t;
                    }, {});
                    return Object.keys(e).length > 0 ? e : void 0;
                  }
                }
              },
              iterator: function(y) {
                return new p(y);
              },
              length: function(y) {
                return typeof y.delete == "number" ? y.delete : typeof y.retain == "number" ? y.retain : typeof y.insert == "string" ? y.insert.length : 1;
              }
            };
            function p(y) {
              this.ops = y, this.index = 0, this.offset = 0;
            }
            p.prototype.hasNext = function() {
              return this.peekLength() < 1 / 0;
            }, p.prototype.next = function(y) {
              y || (y = 1 / 0);
              var h = this.ops[this.index];
              if (h) {
                var n = this.offset, e = m.length(h);
                if (y >= e - n ? (y = e - n, this.index += 1, this.offset = 0) : this.offset += y, typeof h.delete == "number")
                  return { delete: y };
                var t = {};
                return h.attributes && (t.attributes = h.attributes), typeof h.retain == "number" ? t.retain = y : typeof h.insert == "string" ? t.insert = h.insert.substr(n, y) : t.insert = h.insert, t;
              } else
                return { retain: 1 / 0 };
            }, p.prototype.peek = function() {
              return this.ops[this.index];
            }, p.prototype.peekLength = function() {
              return this.ops[this.index] ? m.length(this.ops[this.index]) - this.offset : 1 / 0;
            }, p.prototype.peekType = function() {
              return this.ops[this.index] ? typeof this.ops[this.index].delete == "number" ? "delete" : typeof this.ops[this.index].retain == "number" ? "retain" : "insert" : "retain";
            }, p.prototype.rest = function() {
              if (this.hasNext()) {
                if (this.offset === 0)
                  return this.ops.slice(this.index);
                var y = this.offset, h = this.index, n = this.next(), e = this.ops.slice(this.index);
                return this.offset = y, this.index = h, [n].concat(e);
              } else return [];
            }, w.exports = m;
          },
          /* 21 */
          /***/
          function(w, c) {
            var s = function() {
              function A(a, l) {
                return l != null && a instanceof l;
              }
              var g;
              try {
                g = Map;
              } catch {
                g = function() {
                };
              }
              var m;
              try {
                m = Set;
              } catch {
                m = function() {
                };
              }
              var p;
              try {
                p = Promise;
              } catch {
                p = function() {
                };
              }
              function y(a, l, o, i, f) {
                typeof l == "object" && (o = l.depth, i = l.prototype, f = l.includeNonEnumerable, l = l.circular);
                var r = [], d = [], T = typeof Buffer < "u";
                typeof l > "u" && (l = !0), typeof o > "u" && (o = 1 / 0);
                function b(E, N) {
                  if (E === null)
                    return null;
                  if (N === 0)
                    return E;
                  var O, v;
                  if (typeof E != "object")
                    return E;
                  if (A(E, g))
                    O = new g();
                  else if (A(E, m))
                    O = new m();
                  else if (A(E, p))
                    O = new p(function(j, S) {
                      E.then(function(P) {
                        j(b(P, N - 1));
                      }, function(P) {
                        S(b(P, N - 1));
                      });
                    });
                  else if (y.__isArray(E))
                    O = [];
                  else if (y.__isRegExp(E))
                    O = new RegExp(E.source, u(E)), E.lastIndex && (O.lastIndex = E.lastIndex);
                  else if (y.__isDate(E))
                    O = new Date(E.getTime());
                  else {
                    if (T && Buffer.isBuffer(E))
                      return Buffer.allocUnsafe ? O = Buffer.allocUnsafe(E.length) : O = new Buffer(E.length), E.copy(O), O;
                    A(E, Error) ? O = Object.create(E) : typeof i > "u" ? (v = Object.getPrototypeOf(E), O = Object.create(v)) : (O = Object.create(i), v = i);
                  }
                  if (l) {
                    var _ = r.indexOf(E);
                    if (_ != -1)
                      return d[_];
                    r.push(E), d.push(O);
                  }
                  A(E, g) && E.forEach(function(j, S) {
                    var P = b(S, N - 1), L = b(j, N - 1);
                    O.set(P, L);
                  }), A(E, m) && E.forEach(function(j) {
                    var S = b(j, N - 1);
                    O.add(S);
                  });
                  for (var k in E) {
                    var q;
                    v && (q = Object.getOwnPropertyDescriptor(v, k)), !(q && q.set == null) && (O[k] = b(E[k], N - 1));
                  }
                  if (Object.getOwnPropertySymbols)
                    for (var R = Object.getOwnPropertySymbols(E), k = 0; k < R.length; k++) {
                      var F = R[k], U = Object.getOwnPropertyDescriptor(E, F);
                      U && !U.enumerable && !f || (O[F] = b(E[F], N - 1), U.enumerable || Object.defineProperty(O, F, {
                        enumerable: !1
                      }));
                    }
                  if (f)
                    for (var $ = Object.getOwnPropertyNames(E), k = 0; k < $.length; k++) {
                      var C = $[k], U = Object.getOwnPropertyDescriptor(E, C);
                      U && U.enumerable || (O[C] = b(E[C], N - 1), Object.defineProperty(O, C, {
                        enumerable: !1
                      }));
                    }
                  return O;
                }
                return b(a, o);
              }
              y.clonePrototype = function(l) {
                if (l === null)
                  return null;
                var o = function() {
                };
                return o.prototype = l, new o();
              };
              function h(a) {
                return Object.prototype.toString.call(a);
              }
              y.__objToStr = h;
              function n(a) {
                return typeof a == "object" && h(a) === "[object Date]";
              }
              y.__isDate = n;
              function e(a) {
                return typeof a == "object" && h(a) === "[object Array]";
              }
              y.__isArray = e;
              function t(a) {
                return typeof a == "object" && h(a) === "[object RegExp]";
              }
              y.__isRegExp = t;
              function u(a) {
                var l = "";
                return a.global && (l += "g"), a.ignoreCase && (l += "i"), a.multiline && (l += "m"), l;
              }
              return y.__getRegExpFlags = u, y;
            }();
            typeof w == "object" && w.exports && (w.exports = s);
          },
          /* 22 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            });
            var A = /* @__PURE__ */ function() {
              function O(v, _) {
                var k = [], q = !0, R = !1, F = void 0;
                try {
                  for (var U = v[Symbol.iterator](), $; !(q = ($ = U.next()).done) && (k.push($.value), !(_ && k.length === _)); q = !0)
                    ;
                } catch (C) {
                  R = !0, F = C;
                } finally {
                  try {
                    !q && U.return && U.return();
                  } finally {
                    if (R) throw F;
                  }
                }
                return k;
              }
              return function(v, _) {
                if (Array.isArray(v))
                  return v;
                if (Symbol.iterator in Object(v))
                  return O(v, _);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
              };
            }(), g = /* @__PURE__ */ function() {
              function O(v, _) {
                for (var k = 0; k < _.length; k++) {
                  var q = _[k];
                  q.enumerable = q.enumerable || !1, q.configurable = !0, "value" in q && (q.writable = !0), Object.defineProperty(v, q.key, q);
                }
              }
              return function(v, _, k) {
                return _ && O(v.prototype, _), k && O(v, k), v;
              };
            }(), m = function O(v, _, k) {
              v === null && (v = Function.prototype);
              var q = Object.getOwnPropertyDescriptor(v, _);
              if (q === void 0) {
                var R = Object.getPrototypeOf(v);
                return R === null ? void 0 : O(R, _, k);
              } else {
                if ("value" in q)
                  return q.value;
                var F = q.get;
                return F === void 0 ? void 0 : F.call(k);
              }
            }, p = s(0), y = r(p), h = s(8), n = r(h), e = s(4), t = r(e), u = s(16), a = r(u), l = s(13), o = r(l), i = s(25), f = r(i);
            function r(O) {
              return O && O.__esModule ? O : { default: O };
            }
            function d(O, v) {
              if (!(O instanceof v))
                throw new TypeError("Cannot call a class as a function");
            }
            function T(O, v) {
              if (!O)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return v && (typeof v == "object" || typeof v == "function") ? v : O;
            }
            function b(O, v) {
              if (typeof v != "function" && v !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof v);
              O.prototype = Object.create(v && v.prototype, { constructor: { value: O, enumerable: !1, writable: !0, configurable: !0 } }), v && (Object.setPrototypeOf ? Object.setPrototypeOf(O, v) : O.__proto__ = v);
            }
            function E(O) {
              return O instanceof t.default || O instanceof e.BlockEmbed;
            }
            var N = function(O) {
              b(v, O);
              function v(_, k) {
                d(this, v);
                var q = T(this, (v.__proto__ || Object.getPrototypeOf(v)).call(this, _));
                return q.emitter = k.emitter, Array.isArray(k.whitelist) && (q.whitelist = k.whitelist.reduce(function(R, F) {
                  return R[F] = !0, R;
                }, {})), q.domNode.addEventListener("DOMNodeInserted", function() {
                }), q.optimize(), q.enable(), q;
              }
              return g(v, [{
                key: "batchStart",
                value: function() {
                  this.batch = !0;
                }
              }, {
                key: "batchEnd",
                value: function() {
                  this.batch = !1, this.optimize();
                }
              }, {
                key: "deleteAt",
                value: function(k, q) {
                  var R = this.line(k), F = A(R, 2), U = F[0], $ = F[1], C = this.line(k + q), j = A(C, 1), S = j[0];
                  if (m(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "deleteAt", this).call(this, k, q), S != null && U !== S && $ > 0) {
                    if (U instanceof e.BlockEmbed || S instanceof e.BlockEmbed) {
                      this.optimize();
                      return;
                    }
                    if (U instanceof o.default) {
                      var P = U.newlineIndex(U.length(), !0);
                      if (P > -1 && (U = U.split(P + 1), U === S)) {
                        this.optimize();
                        return;
                      }
                    } else if (S instanceof o.default) {
                      var L = S.newlineIndex(0);
                      L > -1 && S.split(L + 1);
                    }
                    var H = S.children.head instanceof a.default ? null : S.children.head;
                    U.moveChildren(S, H), U.remove();
                  }
                  this.optimize();
                }
              }, {
                key: "enable",
                value: function() {
                  var k = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
                  this.domNode.setAttribute("contenteditable", k);
                }
              }, {
                key: "formatAt",
                value: function(k, q, R, F) {
                  this.whitelist != null && !this.whitelist[R] || (m(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "formatAt", this).call(this, k, q, R, F), this.optimize());
                }
              }, {
                key: "insertAt",
                value: function(k, q, R) {
                  if (!(R != null && this.whitelist != null && !this.whitelist[q])) {
                    if (k >= this.length())
                      if (R == null || y.default.query(q, y.default.Scope.BLOCK) == null) {
                        var F = y.default.create(this.statics.defaultChild);
                        this.appendChild(F), R == null && q.endsWith(`
`) && (q = q.slice(0, -1)), F.insertAt(0, q, R);
                      } else {
                        var U = y.default.create(q, R);
                        this.appendChild(U);
                      }
                    else
                      m(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "insertAt", this).call(this, k, q, R);
                    this.optimize();
                  }
                }
              }, {
                key: "insertBefore",
                value: function(k, q) {
                  if (k.statics.scope === y.default.Scope.INLINE_BLOT) {
                    var R = y.default.create(this.statics.defaultChild);
                    R.appendChild(k), k = R;
                  }
                  m(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "insertBefore", this).call(this, k, q);
                }
              }, {
                key: "leaf",
                value: function(k) {
                  return this.path(k).pop() || [null, -1];
                }
              }, {
                key: "line",
                value: function(k) {
                  return k === this.length() ? this.line(k - 1) : this.descendant(E, k);
                }
              }, {
                key: "lines",
                value: function() {
                  var k = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, q = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE, R = function F(U, $, C) {
                    var j = [], S = C;
                    return U.children.forEachAt($, C, function(P, L, H) {
                      E(P) ? j.push(P) : P instanceof y.default.Container && (j = j.concat(F(P, L, S))), S -= H;
                    }), j;
                  };
                  return R(this, k, q);
                }
              }, {
                key: "optimize",
                value: function() {
                  var k = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], q = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                  this.batch !== !0 && (m(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "optimize", this).call(this, k, q), k.length > 0 && this.emitter.emit(n.default.events.SCROLL_OPTIMIZE, k, q));
                }
              }, {
                key: "path",
                value: function(k) {
                  return m(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "path", this).call(this, k).slice(1);
                }
              }, {
                key: "update",
                value: function(k) {
                  if (this.batch !== !0) {
                    var q = n.default.sources.USER;
                    typeof k == "string" && (q = k), Array.isArray(k) || (k = this.observer.takeRecords()), k.length > 0 && this.emitter.emit(n.default.events.SCROLL_BEFORE_UPDATE, q, k), m(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "update", this).call(this, k.concat([])), k.length > 0 && this.emitter.emit(n.default.events.SCROLL_UPDATE, q, k);
                  }
                }
              }]), v;
            }(y.default.Scroll);
            N.blotName = "scroll", N.className = "ql-editor", N.tagName = "DIV", N.defaultChild = "block", N.allowedChildren = [t.default, e.BlockEmbed, f.default], c.default = N;
          },
          /* 23 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            }), c.SHORTKEY = c.default = void 0;
            var A = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(x) {
              return typeof x;
            } : function(x) {
              return x && typeof Symbol == "function" && x.constructor === Symbol && x !== Symbol.prototype ? "symbol" : typeof x;
            }, g = /* @__PURE__ */ function() {
              function x(D, K) {
                var z = [], W = !0, Q = !1, J = void 0;
                try {
                  for (var ee = D[Symbol.iterator](), ie; !(W = (ie = ee.next()).done) && (z.push(ie.value), !(K && z.length === K)); W = !0)
                    ;
                } catch (oe) {
                  Q = !0, J = oe;
                } finally {
                  try {
                    !W && ee.return && ee.return();
                  } finally {
                    if (Q) throw J;
                  }
                }
                return z;
              }
              return function(D, K) {
                if (Array.isArray(D))
                  return D;
                if (Symbol.iterator in Object(D))
                  return x(D, K);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
              };
            }(), m = /* @__PURE__ */ function() {
              function x(D, K) {
                for (var z = 0; z < K.length; z++) {
                  var W = K[z];
                  W.enumerable = W.enumerable || !1, W.configurable = !0, "value" in W && (W.writable = !0), Object.defineProperty(D, W.key, W);
                }
              }
              return function(D, K, z) {
                return K && x(D.prototype, K), z && x(D, z), D;
              };
            }(), p = s(21), y = O(p), h = s(11), n = O(h), e = s(3), t = O(e), u = s(2), a = O(u), l = s(20), o = O(l), i = s(0), f = O(i), r = s(5), d = O(r), T = s(10), b = O(T), E = s(9), N = O(E);
            function O(x) {
              return x && x.__esModule ? x : { default: x };
            }
            function v(x, D, K) {
              return D in x ? Object.defineProperty(x, D, { value: K, enumerable: !0, configurable: !0, writable: !0 }) : x[D] = K, x;
            }
            function _(x, D) {
              if (!(x instanceof D))
                throw new TypeError("Cannot call a class as a function");
            }
            function k(x, D) {
              if (!x)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return D && (typeof D == "object" || typeof D == "function") ? D : x;
            }
            function q(x, D) {
              if (typeof D != "function" && D !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof D);
              x.prototype = Object.create(D && D.prototype, { constructor: { value: x, enumerable: !1, writable: !0, configurable: !0 } }), D && (Object.setPrototypeOf ? Object.setPrototypeOf(x, D) : x.__proto__ = D);
            }
            var R = (0, b.default)("quill:keyboard"), F = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey", U = function(x) {
              q(D, x), m(D, null, [{
                key: "match",
                value: function(z, W) {
                  return W = B(W), ["altKey", "ctrlKey", "metaKey", "shiftKey"].some(function(Q) {
                    return !!W[Q] !== z[Q] && W[Q] !== null;
                  }) ? !1 : W.key === (z.which || z.keyCode);
                }
              }]);
              function D(K, z) {
                _(this, D);
                var W = k(this, (D.__proto__ || Object.getPrototypeOf(D)).call(this, K, z));
                return W.bindings = {}, Object.keys(W.options.bindings).forEach(function(Q) {
                  Q === "list autofill" && K.scroll.whitelist != null && !K.scroll.whitelist.list || W.options.bindings[Q] && W.addBinding(W.options.bindings[Q]);
                }), W.addBinding({ key: D.keys.ENTER, shiftKey: null }, P), W.addBinding({ key: D.keys.ENTER, metaKey: null, ctrlKey: null, altKey: null }, function() {
                }), /Firefox/i.test(navigator.userAgent) ? (W.addBinding({ key: D.keys.BACKSPACE }, { collapsed: !0 }, C), W.addBinding({ key: D.keys.DELETE }, { collapsed: !0 }, j)) : (W.addBinding({ key: D.keys.BACKSPACE }, { collapsed: !0, prefix: /^.?$/ }, C), W.addBinding({ key: D.keys.DELETE }, { collapsed: !0, suffix: /^.?$/ }, j)), W.addBinding({ key: D.keys.BACKSPACE }, { collapsed: !1 }, S), W.addBinding({ key: D.keys.DELETE }, { collapsed: !1 }, S), W.addBinding({ key: D.keys.BACKSPACE, altKey: null, ctrlKey: null, metaKey: null, shiftKey: null }, { collapsed: !0, offset: 0 }, C), W.listen(), W;
              }
              return m(D, [{
                key: "addBinding",
                value: function(z) {
                  var W = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, Q = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, J = B(z);
                  if (J == null || J.key == null)
                    return R.warn("Attempted to add invalid keyboard binding", J);
                  typeof W == "function" && (W = { handler: W }), typeof Q == "function" && (Q = { handler: Q }), J = (0, t.default)(J, W, Q), this.bindings[J.key] = this.bindings[J.key] || [], this.bindings[J.key].push(J);
                }
              }, {
                key: "listen",
                value: function() {
                  var z = this;
                  this.quill.root.addEventListener("keydown", function(W) {
                    if (!W.defaultPrevented) {
                      var Q = W.which || W.keyCode, J = (z.bindings[Q] || []).filter(function(le) {
                        return D.match(W, le);
                      });
                      if (J.length !== 0) {
                        var ee = z.quill.getSelection();
                        if (!(ee == null || !z.quill.hasFocus())) {
                          var ie = z.quill.getLine(ee.index), oe = g(ie, 2), se = oe[0], ue = oe[1], G = z.quill.getLeaf(ee.index), V = g(G, 2), Y = V[0], X = V[1], Z = ee.length === 0 ? [Y, X] : z.quill.getLeaf(ee.index + ee.length), te = g(Z, 2), re = te[0], ne = te[1], fe = Y instanceof f.default.Text ? Y.value().slice(0, X) : "", he = re instanceof f.default.Text ? re.value().slice(ne) : "", ae = {
                            collapsed: ee.length === 0,
                            empty: ee.length === 0 && se.length() <= 1,
                            format: z.quill.getFormat(ee),
                            offset: ue,
                            prefix: fe,
                            suffix: he
                          }, ri = J.some(function(le) {
                            if (le.collapsed != null && le.collapsed !== ae.collapsed || le.empty != null && le.empty !== ae.empty || le.offset != null && le.offset !== ae.offset) return !1;
                            if (Array.isArray(le.format)) {
                              if (le.format.every(function(ve) {
                                return ae.format[ve] == null;
                              }))
                                return !1;
                            } else if (A(le.format) === "object" && !Object.keys(le.format).every(function(ve) {
                              return le.format[ve] === !0 ? ae.format[ve] != null : le.format[ve] === !1 ? ae.format[ve] == null : (0, n.default)(le.format[ve], ae.format[ve]);
                            }))
                              return !1;
                            return le.prefix != null && !le.prefix.test(ae.prefix) || le.suffix != null && !le.suffix.test(ae.suffix) ? !1 : le.handler.call(z, ee, ae) !== !0;
                          });
                          ri && W.preventDefault();
                        }
                      }
                    }
                  });
                }
              }]), D;
            }(N.default);
            U.keys = {
              BACKSPACE: 8,
              TAB: 9,
              ENTER: 13,
              ESCAPE: 27,
              LEFT: 37,
              UP: 38,
              RIGHT: 39,
              DOWN: 40,
              DELETE: 46
            }, U.DEFAULTS = {
              bindings: {
                bold: H("bold"),
                italic: H("italic"),
                underline: H("underline"),
                indent: {
                  // highlight tab or tab at beginning of list, indent or blockquote
                  key: U.keys.TAB,
                  format: ["blockquote", "indent", "list"],
                  handler: function(D, K) {
                    if (K.collapsed && K.offset !== 0) return !0;
                    this.quill.format("indent", "+1", d.default.sources.USER);
                  }
                },
                outdent: {
                  key: U.keys.TAB,
                  shiftKey: !0,
                  format: ["blockquote", "indent", "list"],
                  // highlight tab or tab at beginning of list, indent or blockquote
                  handler: function(D, K) {
                    if (K.collapsed && K.offset !== 0) return !0;
                    this.quill.format("indent", "-1", d.default.sources.USER);
                  }
                },
                "outdent backspace": {
                  key: U.keys.BACKSPACE,
                  collapsed: !0,
                  shiftKey: null,
                  metaKey: null,
                  ctrlKey: null,
                  altKey: null,
                  format: ["indent", "list"],
                  offset: 0,
                  handler: function(D, K) {
                    K.format.indent != null ? this.quill.format("indent", "-1", d.default.sources.USER) : K.format.list != null && this.quill.format("list", !1, d.default.sources.USER);
                  }
                },
                "indent code-block": L(!0),
                "outdent code-block": L(!1),
                "remove tab": {
                  key: U.keys.TAB,
                  shiftKey: !0,
                  collapsed: !0,
                  prefix: /\t$/,
                  handler: function(D) {
                    this.quill.deleteText(D.index - 1, 1, d.default.sources.USER);
                  }
                },
                tab: {
                  key: U.keys.TAB,
                  handler: function(D) {
                    this.quill.history.cutoff();
                    var K = new a.default().retain(D.index).delete(D.length).insert("	");
                    this.quill.updateContents(K, d.default.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(D.index + 1, d.default.sources.SILENT);
                  }
                },
                "list empty enter": {
                  key: U.keys.ENTER,
                  collapsed: !0,
                  format: ["list"],
                  empty: !0,
                  handler: function(D, K) {
                    this.quill.format("list", !1, d.default.sources.USER), K.format.indent && this.quill.format("indent", !1, d.default.sources.USER);
                  }
                },
                "checklist enter": {
                  key: U.keys.ENTER,
                  collapsed: !0,
                  format: { list: "checked" },
                  handler: function(D) {
                    var K = this.quill.getLine(D.index), z = g(K, 2), W = z[0], Q = z[1], J = (0, t.default)({}, W.formats(), { list: "checked" }), ee = new a.default().retain(D.index).insert(`
`, J).retain(W.length() - Q - 1).retain(1, { list: "unchecked" });
                    this.quill.updateContents(ee, d.default.sources.USER), this.quill.setSelection(D.index + 1, d.default.sources.SILENT), this.quill.scrollIntoView();
                  }
                },
                "header enter": {
                  key: U.keys.ENTER,
                  collapsed: !0,
                  format: ["header"],
                  suffix: /^$/,
                  handler: function(D, K) {
                    var z = this.quill.getLine(D.index), W = g(z, 2), Q = W[0], J = W[1], ee = new a.default().retain(D.index).insert(`
`, K.format).retain(Q.length() - J - 1).retain(1, { header: null });
                    this.quill.updateContents(ee, d.default.sources.USER), this.quill.setSelection(D.index + 1, d.default.sources.SILENT), this.quill.scrollIntoView();
                  }
                },
                "list autofill": {
                  key: " ",
                  collapsed: !0,
                  format: { list: !1 },
                  prefix: /^\s*?(\d+\.|-|\*|\[ ?\]|\[x\])$/,
                  handler: function(D, K) {
                    var z = K.prefix.length, W = this.quill.getLine(D.index), Q = g(W, 2), J = Q[0], ee = Q[1];
                    if (ee > z) return !0;
                    var ie = void 0;
                    switch (K.prefix.trim()) {
                      case "[]":
                      case "[ ]":
                        ie = "unchecked";
                        break;
                      case "[x]":
                        ie = "checked";
                        break;
                      case "-":
                      case "*":
                        ie = "bullet";
                        break;
                      default:
                        ie = "ordered";
                    }
                    this.quill.insertText(D.index, " ", d.default.sources.USER), this.quill.history.cutoff();
                    var oe = new a.default().retain(D.index - ee).delete(z + 1).retain(J.length() - 2 - ee).retain(1, { list: ie });
                    this.quill.updateContents(oe, d.default.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(D.index - z, d.default.sources.SILENT);
                  }
                },
                "code exit": {
                  key: U.keys.ENTER,
                  collapsed: !0,
                  format: ["code-block"],
                  prefix: /\n\n$/,
                  suffix: /^\s+$/,
                  handler: function(D) {
                    var K = this.quill.getLine(D.index), z = g(K, 2), W = z[0], Q = z[1], J = new a.default().retain(D.index + W.length() - Q - 2).retain(1, { "code-block": null }).delete(1);
                    this.quill.updateContents(J, d.default.sources.USER);
                  }
                },
                "embed left": $(U.keys.LEFT, !1),
                "embed left shift": $(U.keys.LEFT, !0),
                "embed right": $(U.keys.RIGHT, !1),
                "embed right shift": $(U.keys.RIGHT, !0)
              }
            };
            function $(x, D) {
              var K, z = x === U.keys.LEFT ? "prefix" : "suffix";
              return K = {
                key: x,
                shiftKey: D,
                altKey: null
              }, v(K, z, /^$/), v(K, "handler", function(Q) {
                var J = Q.index;
                x === U.keys.RIGHT && (J += Q.length + 1);
                var ee = this.quill.getLeaf(J), ie = g(ee, 1), oe = ie[0];
                return oe instanceof f.default.Embed ? (x === U.keys.LEFT ? D ? this.quill.setSelection(Q.index - 1, Q.length + 1, d.default.sources.USER) : this.quill.setSelection(Q.index - 1, d.default.sources.USER) : D ? this.quill.setSelection(Q.index, Q.length + 1, d.default.sources.USER) : this.quill.setSelection(Q.index + Q.length + 1, d.default.sources.USER), !1) : !0;
              }), K;
            }
            function C(x, D) {
              if (!(x.index === 0 || this.quill.getLength() <= 1)) {
                var K = this.quill.getLine(x.index), z = g(K, 1), W = z[0], Q = {};
                if (D.offset === 0) {
                  var J = this.quill.getLine(x.index - 1), ee = g(J, 1), ie = ee[0];
                  if (ie != null && ie.length() > 1) {
                    var oe = W.formats(), se = this.quill.getFormat(x.index - 1, 1);
                    Q = o.default.attributes.diff(oe, se) || {};
                  }
                }
                var ue = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(D.prefix) ? 2 : 1;
                this.quill.deleteText(x.index - ue, ue, d.default.sources.USER), Object.keys(Q).length > 0 && this.quill.formatLine(x.index - ue, ue, Q, d.default.sources.USER), this.quill.focus();
              }
            }
            function j(x, D) {
              var K = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(D.suffix) ? 2 : 1;
              if (!(x.index >= this.quill.getLength() - K)) {
                var z = {}, W = 0, Q = this.quill.getLine(x.index), J = g(Q, 1), ee = J[0];
                if (D.offset >= ee.length() - 1) {
                  var ie = this.quill.getLine(x.index + 1), oe = g(ie, 1), se = oe[0];
                  if (se) {
                    var ue = ee.formats(), G = this.quill.getFormat(x.index, 1);
                    z = o.default.attributes.diff(ue, G) || {}, W = se.length();
                  }
                }
                this.quill.deleteText(x.index, K, d.default.sources.USER), Object.keys(z).length > 0 && this.quill.formatLine(x.index + W - 1, K, z, d.default.sources.USER);
              }
            }
            function S(x) {
              var D = this.quill.getLines(x), K = {};
              if (D.length > 1) {
                var z = D[0].formats(), W = D[D.length - 1].formats();
                K = o.default.attributes.diff(W, z) || {};
              }
              this.quill.deleteText(x, d.default.sources.USER), Object.keys(K).length > 0 && this.quill.formatLine(x.index, 1, K, d.default.sources.USER), this.quill.setSelection(x.index, d.default.sources.SILENT), this.quill.focus();
            }
            function P(x, D) {
              var K = this;
              x.length > 0 && this.quill.scroll.deleteAt(x.index, x.length);
              var z = Object.keys(D.format).reduce(function(W, Q) {
                return f.default.query(Q, f.default.Scope.BLOCK) && !Array.isArray(D.format[Q]) && (W[Q] = D.format[Q]), W;
              }, {});
              this.quill.insertText(x.index, `
`, z, d.default.sources.USER), this.quill.setSelection(x.index + 1, d.default.sources.SILENT), this.quill.focus(), Object.keys(D.format).forEach(function(W) {
                z[W] == null && (Array.isArray(D.format[W]) || W !== "link" && K.quill.format(W, D.format[W], d.default.sources.USER));
              });
            }
            function L(x) {
              return {
                key: U.keys.TAB,
                shiftKey: !x,
                format: { "code-block": !0 },
                handler: function(K) {
                  var z = f.default.query("code-block"), W = K.index, Q = K.length, J = this.quill.scroll.descendant(z, W), ee = g(J, 2), ie = ee[0], oe = ee[1];
                  if (ie != null) {
                    var se = this.quill.getIndex(ie), ue = ie.newlineIndex(oe, !0) + 1, G = ie.newlineIndex(se + oe + Q), V = ie.domNode.textContent.slice(ue, G).split(`
`);
                    oe = 0, V.forEach(function(Y, X) {
                      x ? (ie.insertAt(ue + oe, z.TAB), oe += z.TAB.length, X === 0 ? W += z.TAB.length : Q += z.TAB.length) : Y.startsWith(z.TAB) && (ie.deleteAt(ue + oe, z.TAB.length), oe -= z.TAB.length, X === 0 ? W -= z.TAB.length : Q -= z.TAB.length), oe += Y.length + 1;
                    }), this.quill.update(d.default.sources.USER), this.quill.setSelection(W, Q, d.default.sources.SILENT);
                  }
                }
              };
            }
            function H(x) {
              return {
                key: x[0].toUpperCase(),
                shortKey: !0,
                handler: function(K, z) {
                  this.quill.format(x, !z.format[x], d.default.sources.USER);
                }
              };
            }
            function B(x) {
              if (typeof x == "string" || typeof x == "number")
                return B({ key: x });
              if ((typeof x > "u" ? "undefined" : A(x)) === "object" && (x = (0, y.default)(x, !1)), typeof x.key == "string")
                if (U.keys[x.key.toUpperCase()] != null)
                  x.key = U.keys[x.key.toUpperCase()];
                else if (x.key.length === 1)
                  x.key = x.key.toUpperCase().charCodeAt(0);
                else
                  return null;
              return x.shortKey && (x[F] = x.shortKey, delete x.shortKey), x;
            }
            c.default = U, c.SHORTKEY = F;
          },
          /* 24 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            });
            var A = /* @__PURE__ */ function() {
              function o(i, f) {
                var r = [], d = !0, T = !1, b = void 0;
                try {
                  for (var E = i[Symbol.iterator](), N; !(d = (N = E.next()).done) && (r.push(N.value), !(f && r.length === f)); d = !0)
                    ;
                } catch (O) {
                  T = !0, b = O;
                } finally {
                  try {
                    !d && E.return && E.return();
                  } finally {
                    if (T) throw b;
                  }
                }
                return r;
              }
              return function(i, f) {
                if (Array.isArray(i))
                  return i;
                if (Symbol.iterator in Object(i))
                  return o(i, f);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
              };
            }(), g = function o(i, f, r) {
              i === null && (i = Function.prototype);
              var d = Object.getOwnPropertyDescriptor(i, f);
              if (d === void 0) {
                var T = Object.getPrototypeOf(i);
                return T === null ? void 0 : o(T, f, r);
              } else {
                if ("value" in d)
                  return d.value;
                var b = d.get;
                return b === void 0 ? void 0 : b.call(r);
              }
            }, m = /* @__PURE__ */ function() {
              function o(i, f) {
                for (var r = 0; r < f.length; r++) {
                  var d = f[r];
                  d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(i, d.key, d);
                }
              }
              return function(i, f, r) {
                return f && o(i.prototype, f), r && o(i, r), i;
              };
            }(), p = s(0), y = e(p), h = s(7), n = e(h);
            function e(o) {
              return o && o.__esModule ? o : { default: o };
            }
            function t(o, i) {
              if (!(o instanceof i))
                throw new TypeError("Cannot call a class as a function");
            }
            function u(o, i) {
              if (!o)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return i && (typeof i == "object" || typeof i == "function") ? i : o;
            }
            function a(o, i) {
              if (typeof i != "function" && i !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof i);
              o.prototype = Object.create(i && i.prototype, { constructor: { value: o, enumerable: !1, writable: !0, configurable: !0 } }), i && (Object.setPrototypeOf ? Object.setPrototypeOf(o, i) : o.__proto__ = i);
            }
            var l = function(o) {
              a(i, o), m(i, null, [{
                key: "value",
                value: function() {
                }
              }]);
              function i(f, r) {
                t(this, i);
                var d = u(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, f));
                return d.selection = r, d.textNode = document.createTextNode(i.CONTENTS), d.domNode.appendChild(d.textNode), d._length = 0, d;
              }
              return m(i, [{
                key: "detach",
                value: function() {
                  this.parent != null && this.parent.removeChild(this);
                }
              }, {
                key: "format",
                value: function(r, d) {
                  if (this._length !== 0)
                    return g(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "format", this).call(this, r, d);
                  for (var T = this, b = 0; T != null && T.statics.scope !== y.default.Scope.BLOCK_BLOT; )
                    b += T.offset(T.parent), T = T.parent;
                  T != null && (this._length = i.CONTENTS.length, T.optimize(), T.formatAt(b, i.CONTENTS.length, r, d), this._length = 0);
                }
              }, {
                key: "index",
                value: function(r, d) {
                  return r === this.textNode ? 0 : g(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "index", this).call(this, r, d);
                }
              }, {
                key: "length",
                value: function() {
                  return this._length;
                }
              }, {
                key: "position",
                value: function() {
                  return [this.textNode, this.textNode.data.length];
                }
              }, {
                key: "remove",
                value: function() {
                  g(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "remove", this).call(this), this.parent = null;
                }
              }, {
                key: "restore",
                value: function() {
                  if (!(this.selection.composing || this.parent == null)) {
                    var r = this.textNode, d = this.selection.getNativeRange(), T = void 0, b = void 0, E = void 0;
                    if (d != null && d.start.node === r && d.end.node === r) {
                      var N = [r, d.start.offset, d.end.offset];
                      T = N[0], b = N[1], E = N[2];
                    }
                    for (; this.domNode.lastChild != null && this.domNode.lastChild !== this.textNode; )
                      this.domNode.parentNode.insertBefore(this.domNode.lastChild, this.domNode);
                    if (this.textNode.data !== i.CONTENTS) {
                      var O = this.textNode.data.split(i.CONTENTS).join("");
                      this.next instanceof n.default ? (T = this.next.domNode, this.next.insertAt(0, O), this.textNode.data = i.CONTENTS) : (this.textNode.data = O, this.parent.insertBefore(y.default.create(this.textNode), this), this.textNode = document.createTextNode(i.CONTENTS), this.domNode.appendChild(this.textNode));
                    }
                    if (this.remove(), b != null) {
                      var v = [b, E].map(function(k) {
                        return Math.max(0, Math.min(T.data.length, k - 1));
                      }), _ = A(v, 2);
                      return b = _[0], E = _[1], {
                        startNode: T,
                        startOffset: b,
                        endNode: T,
                        endOffset: E
                      };
                    }
                  }
                }
              }, {
                key: "update",
                value: function(r, d) {
                  var T = this;
                  if (r.some(function(E) {
                    return E.type === "characterData" && E.target === T.textNode;
                  })) {
                    var b = this.restore();
                    b && (d.range = b);
                  }
                }
              }, {
                key: "value",
                value: function() {
                  return "";
                }
              }]), i;
            }(y.default.Embed);
            l.blotName = "cursor", l.className = "ql-cursor", l.tagName = "span", l.CONTENTS = "\uFEFF", c.default = l;
          },
          /* 25 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            });
            var A = s(0), g = y(A), m = s(4), p = y(m);
            function y(u) {
              return u && u.__esModule ? u : { default: u };
            }
            function h(u, a) {
              if (!(u instanceof a))
                throw new TypeError("Cannot call a class as a function");
            }
            function n(u, a) {
              if (!u)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return a && (typeof a == "object" || typeof a == "function") ? a : u;
            }
            function e(u, a) {
              if (typeof a != "function" && a !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof a);
              u.prototype = Object.create(a && a.prototype, { constructor: { value: u, enumerable: !1, writable: !0, configurable: !0 } }), a && (Object.setPrototypeOf ? Object.setPrototypeOf(u, a) : u.__proto__ = a);
            }
            var t = function(u) {
              e(a, u);
              function a() {
                return h(this, a), n(this, (a.__proto__ || Object.getPrototypeOf(a)).apply(this, arguments));
              }
              return a;
            }(g.default.Container);
            t.allowedChildren = [p.default, m.BlockEmbed, t], c.default = t;
          },
          /* 26 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            }), c.ColorStyle = c.ColorClass = c.ColorAttributor = void 0;
            var A = /* @__PURE__ */ function() {
              function l(o, i) {
                for (var f = 0; f < i.length; f++) {
                  var r = i[f];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(o, r.key, r);
                }
              }
              return function(o, i, f) {
                return i && l(o.prototype, i), f && l(o, f), o;
              };
            }(), g = function l(o, i, f) {
              o === null && (o = Function.prototype);
              var r = Object.getOwnPropertyDescriptor(o, i);
              if (r === void 0) {
                var d = Object.getPrototypeOf(o);
                return d === null ? void 0 : l(d, i, f);
              } else {
                if ("value" in r)
                  return r.value;
                var T = r.get;
                return T === void 0 ? void 0 : T.call(f);
              }
            }, m = s(0), p = y(m);
            function y(l) {
              return l && l.__esModule ? l : { default: l };
            }
            function h(l, o) {
              if (!(l instanceof o))
                throw new TypeError("Cannot call a class as a function");
            }
            function n(l, o) {
              if (!l)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return o && (typeof o == "object" || typeof o == "function") ? o : l;
            }
            function e(l, o) {
              if (typeof o != "function" && o !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof o);
              l.prototype = Object.create(o && o.prototype, { constructor: { value: l, enumerable: !1, writable: !0, configurable: !0 } }), o && (Object.setPrototypeOf ? Object.setPrototypeOf(l, o) : l.__proto__ = o);
            }
            var t = function(l) {
              e(o, l);
              function o() {
                return h(this, o), n(this, (o.__proto__ || Object.getPrototypeOf(o)).apply(this, arguments));
              }
              return A(o, [{
                key: "value",
                value: function(f) {
                  var r = g(o.prototype.__proto__ || Object.getPrototypeOf(o.prototype), "value", this).call(this, f);
                  return r.startsWith("rgb(") ? (r = r.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), "#" + r.split(",").map(function(d) {
                    return ("00" + parseInt(d).toString(16)).slice(-2);
                  }).join("")) : r;
                }
              }]), o;
            }(p.default.Attributor.Style), u = new p.default.Attributor.Class("color", "ql-color", {
              scope: p.default.Scope.INLINE
            }), a = new t("color", "color", {
              scope: p.default.Scope.INLINE
            });
            c.ColorAttributor = t, c.ColorClass = u, c.ColorStyle = a;
          },
          /* 27 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            }), c.sanitize = c.default = void 0;
            var A = /* @__PURE__ */ function() {
              function a(l, o) {
                for (var i = 0; i < o.length; i++) {
                  var f = o[i];
                  f.enumerable = f.enumerable || !1, f.configurable = !0, "value" in f && (f.writable = !0), Object.defineProperty(l, f.key, f);
                }
              }
              return function(l, o, i) {
                return o && a(l.prototype, o), i && a(l, i), l;
              };
            }(), g = function a(l, o, i) {
              l === null && (l = Function.prototype);
              var f = Object.getOwnPropertyDescriptor(l, o);
              if (f === void 0) {
                var r = Object.getPrototypeOf(l);
                return r === null ? void 0 : a(r, o, i);
              } else {
                if ("value" in f)
                  return f.value;
                var d = f.get;
                return d === void 0 ? void 0 : d.call(i);
              }
            }, m = s(6), p = y(m);
            function y(a) {
              return a && a.__esModule ? a : { default: a };
            }
            function h(a, l) {
              if (!(a instanceof l))
                throw new TypeError("Cannot call a class as a function");
            }
            function n(a, l) {
              if (!a)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return l && (typeof l == "object" || typeof l == "function") ? l : a;
            }
            function e(a, l) {
              if (typeof l != "function" && l !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof l);
              a.prototype = Object.create(l && l.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), l && (Object.setPrototypeOf ? Object.setPrototypeOf(a, l) : a.__proto__ = l);
            }
            var t = function(a) {
              e(l, a);
              function l() {
                return h(this, l), n(this, (l.__proto__ || Object.getPrototypeOf(l)).apply(this, arguments));
              }
              return A(l, [{
                key: "format",
                value: function(i, f) {
                  if (i !== this.statics.blotName || !f) return g(l.prototype.__proto__ || Object.getPrototypeOf(l.prototype), "format", this).call(this, i, f);
                  f = this.constructor.sanitize(f), this.domNode.setAttribute("href", f);
                }
              }], [{
                key: "create",
                value: function(i) {
                  var f = g(l.__proto__ || Object.getPrototypeOf(l), "create", this).call(this, i);
                  return i = this.sanitize(i), f.setAttribute("href", i), f.setAttribute("rel", "noopener noreferrer"), f.setAttribute("target", "_blank"), f;
                }
              }, {
                key: "formats",
                value: function(i) {
                  return i.getAttribute("href");
                }
              }, {
                key: "sanitize",
                value: function(i) {
                  return u(i, this.PROTOCOL_WHITELIST) ? i : this.SANITIZED_URL;
                }
              }]), l;
            }(p.default);
            t.blotName = "link", t.tagName = "A", t.SANITIZED_URL = "about:blank", t.PROTOCOL_WHITELIST = ["http", "https", "mailto", "tel"];
            function u(a, l) {
              var o = document.createElement("a");
              o.href = a;
              var i = o.href.slice(0, o.href.indexOf(":"));
              return l.indexOf(i) > -1;
            }
            c.default = t, c.sanitize = u;
          },
          /* 28 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            });
            var A = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(l) {
              return typeof l;
            } : function(l) {
              return l && typeof Symbol == "function" && l.constructor === Symbol && l !== Symbol.prototype ? "symbol" : typeof l;
            }, g = /* @__PURE__ */ function() {
              function l(o, i) {
                for (var f = 0; f < i.length; f++) {
                  var r = i[f];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(o, r.key, r);
                }
              }
              return function(o, i, f) {
                return i && l(o.prototype, i), f && l(o, f), o;
              };
            }(), m = s(23), p = n(m), y = s(107), h = n(y);
            function n(l) {
              return l && l.__esModule ? l : { default: l };
            }
            function e(l, o) {
              if (!(l instanceof o))
                throw new TypeError("Cannot call a class as a function");
            }
            var t = 0;
            function u(l, o) {
              l.setAttribute(o, l.getAttribute(o) !== "true");
            }
            var a = function() {
              function l(o) {
                var i = this;
                e(this, l), this.select = o, this.container = document.createElement("span"), this.buildPicker(), this.select.style.display = "none", this.select.parentNode.insertBefore(this.container, this.select), this.label.addEventListener("mousedown", function() {
                  i.togglePicker();
                }), this.label.addEventListener("keydown", function(f) {
                  switch (f.keyCode) {
                    // Allows the "Enter" key to open the picker
                    case p.default.keys.ENTER:
                      i.togglePicker();
                      break;
                    // Allows the "Escape" key to close the picker
                    case p.default.keys.ESCAPE:
                      i.escape(), f.preventDefault();
                      break;
                  }
                }), this.select.addEventListener("change", this.update.bind(this));
              }
              return g(l, [{
                key: "togglePicker",
                value: function() {
                  this.container.classList.toggle("ql-expanded"), u(this.label, "aria-expanded"), u(this.options, "aria-hidden");
                }
              }, {
                key: "buildItem",
                value: function(i) {
                  var f = this, r = document.createElement("span");
                  return r.tabIndex = "0", r.setAttribute("role", "button"), r.classList.add("ql-picker-item"), i.hasAttribute("value") && r.setAttribute("data-value", i.getAttribute("value")), i.textContent && r.setAttribute("data-label", i.textContent), r.addEventListener("click", function() {
                    f.selectItem(r, !0);
                  }), r.addEventListener("keydown", function(d) {
                    switch (d.keyCode) {
                      // Allows the "Enter" key to select an item
                      case p.default.keys.ENTER:
                        f.selectItem(r, !0), d.preventDefault();
                        break;
                      // Allows the "Escape" key to close the picker
                      case p.default.keys.ESCAPE:
                        f.escape(), d.preventDefault();
                        break;
                    }
                  }), r;
                }
              }, {
                key: "buildLabel",
                value: function() {
                  var i = document.createElement("span");
                  return i.classList.add("ql-picker-label"), i.innerHTML = h.default, i.tabIndex = "0", i.setAttribute("role", "button"), i.setAttribute("aria-expanded", "false"), this.container.appendChild(i), i;
                }
              }, {
                key: "buildOptions",
                value: function() {
                  var i = this, f = document.createElement("span");
                  f.classList.add("ql-picker-options"), f.setAttribute("aria-hidden", "true"), f.tabIndex = "-1", f.id = "ql-picker-options-" + t, t += 1, this.label.setAttribute("aria-controls", f.id), this.options = f, [].slice.call(this.select.options).forEach(function(r) {
                    var d = i.buildItem(r);
                    f.appendChild(d), r.selected === !0 && i.selectItem(d);
                  }), this.container.appendChild(f);
                }
              }, {
                key: "buildPicker",
                value: function() {
                  var i = this;
                  [].slice.call(this.select.attributes).forEach(function(f) {
                    i.container.setAttribute(f.name, f.value);
                  }), this.container.classList.add("ql-picker"), this.label = this.buildLabel(), this.buildOptions();
                }
              }, {
                key: "escape",
                value: function() {
                  var i = this;
                  this.close(), setTimeout(function() {
                    return i.label.focus();
                  }, 1);
                }
              }, {
                key: "close",
                value: function() {
                  this.container.classList.remove("ql-expanded"), this.label.setAttribute("aria-expanded", "false"), this.options.setAttribute("aria-hidden", "true");
                }
              }, {
                key: "selectItem",
                value: function(i) {
                  var f = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = this.container.querySelector(".ql-selected");
                  if (i !== r && (r != null && r.classList.remove("ql-selected"), i != null && (i.classList.add("ql-selected"), this.select.selectedIndex = [].indexOf.call(i.parentNode.children, i), i.hasAttribute("data-value") ? this.label.setAttribute("data-value", i.getAttribute("data-value")) : this.label.removeAttribute("data-value"), i.hasAttribute("data-label") ? this.label.setAttribute("data-label", i.getAttribute("data-label")) : this.label.removeAttribute("data-label"), f))) {
                    if (typeof Event == "function")
                      this.select.dispatchEvent(new Event("change"));
                    else if ((typeof Event > "u" ? "undefined" : A(Event)) === "object") {
                      var d = document.createEvent("Event");
                      d.initEvent("change", !0, !0), this.select.dispatchEvent(d);
                    }
                    this.close();
                  }
                }
              }, {
                key: "update",
                value: function() {
                  var i = void 0;
                  if (this.select.selectedIndex > -1) {
                    var f = this.container.querySelector(".ql-picker-options").children[this.select.selectedIndex];
                    i = this.select.options[this.select.selectedIndex], this.selectItem(f);
                  } else
                    this.selectItem(null);
                  var r = i != null && i !== this.select.querySelector("option[selected]");
                  this.label.classList.toggle("ql-active", r);
                }
              }]), l;
            }();
            c.default = a;
          },
          /* 29 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            });
            var A = s(0), g = R(A), m = s(5), p = R(m), y = s(4), h = R(y), n = s(16), e = R(n), t = s(25), u = R(t), a = s(24), l = R(a), o = s(35), i = R(o), f = s(6), r = R(f), d = s(22), T = R(d), b = s(7), E = R(b), N = s(55), O = R(N), v = s(42), _ = R(v), k = s(23), q = R(k);
            function R(F) {
              return F && F.__esModule ? F : { default: F };
            }
            p.default.register({
              "blots/block": h.default,
              "blots/block/embed": y.BlockEmbed,
              "blots/break": e.default,
              "blots/container": u.default,
              "blots/cursor": l.default,
              "blots/embed": i.default,
              "blots/inline": r.default,
              "blots/scroll": T.default,
              "blots/text": E.default,
              "modules/clipboard": O.default,
              "modules/history": _.default,
              "modules/keyboard": q.default
            }), g.default.register(h.default, e.default, l.default, r.default, T.default, E.default), c.default = p.default;
          },
          /* 30 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", { value: !0 });
            var A = s(1), g = (
              /** @class */
              function() {
                function m(p) {
                  this.domNode = p, this.domNode[A.DATA_KEY] = { blot: this };
                }
                return Object.defineProperty(m.prototype, "statics", {
                  // Hack for accessing inherited static methods
                  get: function() {
                    return this.constructor;
                  },
                  enumerable: !0,
                  configurable: !0
                }), m.create = function(p) {
                  if (this.tagName == null)
                    throw new A.ParchmentError("Blot definition missing tagName");
                  var y;
                  return Array.isArray(this.tagName) ? (typeof p == "string" && (p = p.toUpperCase(), parseInt(p).toString() === p && (p = parseInt(p))), typeof p == "number" ? y = document.createElement(this.tagName[p - 1]) : this.tagName.indexOf(p) > -1 ? y = document.createElement(p) : y = document.createElement(this.tagName[0])) : y = document.createElement(this.tagName), this.className && y.classList.add(this.className), y;
                }, m.prototype.attach = function() {
                  this.parent != null && (this.scroll = this.parent.scroll);
                }, m.prototype.clone = function() {
                  var p = this.domNode.cloneNode(!1);
                  return A.create(p);
                }, m.prototype.detach = function() {
                  this.parent != null && this.parent.removeChild(this), delete this.domNode[A.DATA_KEY];
                }, m.prototype.deleteAt = function(p, y) {
                  var h = this.isolate(p, y);
                  h.remove();
                }, m.prototype.formatAt = function(p, y, h, n) {
                  var e = this.isolate(p, y);
                  if (A.query(h, A.Scope.BLOT) != null && n)
                    e.wrap(h, n);
                  else if (A.query(h, A.Scope.ATTRIBUTE) != null) {
                    var t = A.create(this.statics.scope);
                    e.wrap(t), t.format(h, n);
                  }
                }, m.prototype.insertAt = function(p, y, h) {
                  var n = h == null ? A.create("text", y) : A.create(y, h), e = this.split(p);
                  this.parent.insertBefore(n, e);
                }, m.prototype.insertInto = function(p, y) {
                  y === void 0 && (y = null), this.parent != null && this.parent.children.remove(this);
                  var h = null;
                  p.children.insertBefore(this, y), y != null && (h = y.domNode), (this.domNode.parentNode != p.domNode || this.domNode.nextSibling != h) && p.domNode.insertBefore(this.domNode, h), this.parent = p, this.attach();
                }, m.prototype.isolate = function(p, y) {
                  var h = this.split(p);
                  return h.split(y), h;
                }, m.prototype.length = function() {
                  return 1;
                }, m.prototype.offset = function(p) {
                  return p === void 0 && (p = this.parent), this.parent == null || this == p ? 0 : this.parent.children.offset(this) + this.parent.offset(p);
                }, m.prototype.optimize = function(p) {
                  this.domNode[A.DATA_KEY] != null && delete this.domNode[A.DATA_KEY].mutations;
                }, m.prototype.remove = function() {
                  this.domNode.parentNode != null && this.domNode.parentNode.removeChild(this.domNode), this.detach();
                }, m.prototype.replace = function(p) {
                  p.parent != null && (p.parent.insertBefore(this, p.next), p.remove());
                }, m.prototype.replaceWith = function(p, y) {
                  var h = typeof p == "string" ? A.create(p, y) : p;
                  return h.replace(this), h;
                }, m.prototype.split = function(p, y) {
                  return p === 0 ? this : this.next;
                }, m.prototype.update = function(p, y) {
                }, m.prototype.wrap = function(p, y) {
                  var h = typeof p == "string" ? A.create(p, y) : p;
                  return this.parent != null && this.parent.insertBefore(h, this.next), h.appendChild(this), h;
                }, m.blotName = "abstract", m;
              }()
            );
            c.default = g;
          },
          /* 31 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", { value: !0 });
            var A = s(12), g = s(32), m = s(33), p = s(1), y = (
              /** @class */
              function() {
                function h(n) {
                  this.attributes = {}, this.domNode = n, this.build();
                }
                return h.prototype.attribute = function(n, e) {
                  e ? n.add(this.domNode, e) && (n.value(this.domNode) != null ? this.attributes[n.attrName] = n : delete this.attributes[n.attrName]) : (n.remove(this.domNode), delete this.attributes[n.attrName]);
                }, h.prototype.build = function() {
                  var n = this;
                  this.attributes = {};
                  var e = A.default.keys(this.domNode), t = g.default.keys(this.domNode), u = m.default.keys(this.domNode);
                  e.concat(t).concat(u).forEach(function(a) {
                    var l = p.query(a, p.Scope.ATTRIBUTE);
                    l instanceof A.default && (n.attributes[l.attrName] = l);
                  });
                }, h.prototype.copy = function(n) {
                  var e = this;
                  Object.keys(this.attributes).forEach(function(t) {
                    var u = e.attributes[t].value(e.domNode);
                    n.format(t, u);
                  });
                }, h.prototype.move = function(n) {
                  var e = this;
                  this.copy(n), Object.keys(this.attributes).forEach(function(t) {
                    e.attributes[t].remove(e.domNode);
                  }), this.attributes = {};
                }, h.prototype.values = function() {
                  var n = this;
                  return Object.keys(this.attributes).reduce(function(e, t) {
                    return e[t] = n.attributes[t].value(n.domNode), e;
                  }, {});
                }, h;
              }()
            );
            c.default = y;
          },
          /* 32 */
          /***/
          function(w, c, s) {
            var A = this && this.__extends || function() {
              var y = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(h, n) {
                h.__proto__ = n;
              } || function(h, n) {
                for (var e in n) n.hasOwnProperty(e) && (h[e] = n[e]);
              };
              return function(h, n) {
                y(h, n);
                function e() {
                  this.constructor = h;
                }
                h.prototype = n === null ? Object.create(n) : (e.prototype = n.prototype, new e());
              };
            }();
            Object.defineProperty(c, "__esModule", { value: !0 });
            var g = s(12);
            function m(y, h) {
              var n = y.getAttribute("class") || "";
              return n.split(/\s+/).filter(function(e) {
                return e.indexOf(h + "-") === 0;
              });
            }
            var p = (
              /** @class */
              function(y) {
                A(h, y);
                function h() {
                  return y !== null && y.apply(this, arguments) || this;
                }
                return h.keys = function(n) {
                  return (n.getAttribute("class") || "").split(/\s+/).map(function(e) {
                    return e.split("-").slice(0, -1).join("-");
                  });
                }, h.prototype.add = function(n, e) {
                  return this.canAdd(n, e) ? (this.remove(n), n.classList.add(this.keyName + "-" + e), !0) : !1;
                }, h.prototype.remove = function(n) {
                  var e = m(n, this.keyName);
                  e.forEach(function(t) {
                    n.classList.remove(t);
                  }), n.classList.length === 0 && n.removeAttribute("class");
                }, h.prototype.value = function(n) {
                  var e = m(n, this.keyName)[0] || "", t = e.slice(this.keyName.length + 1);
                  return this.canAdd(n, t) ? t : "";
                }, h;
              }(g.default)
            );
            c.default = p;
          },
          /* 33 */
          /***/
          function(w, c, s) {
            var A = this && this.__extends || function() {
              var y = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(h, n) {
                h.__proto__ = n;
              } || function(h, n) {
                for (var e in n) n.hasOwnProperty(e) && (h[e] = n[e]);
              };
              return function(h, n) {
                y(h, n);
                function e() {
                  this.constructor = h;
                }
                h.prototype = n === null ? Object.create(n) : (e.prototype = n.prototype, new e());
              };
            }();
            Object.defineProperty(c, "__esModule", { value: !0 });
            var g = s(12);
            function m(y) {
              var h = y.split("-"), n = h.slice(1).map(function(e) {
                return e[0].toUpperCase() + e.slice(1);
              }).join("");
              return h[0] + n;
            }
            var p = (
              /** @class */
              function(y) {
                A(h, y);
                function h() {
                  return y !== null && y.apply(this, arguments) || this;
                }
                return h.keys = function(n) {
                  return (n.getAttribute("style") || "").split(";").map(function(e) {
                    var t = e.split(":");
                    return t[0].trim();
                  });
                }, h.prototype.add = function(n, e) {
                  return this.canAdd(n, e) ? (n.style[m(this.keyName)] = e, !0) : !1;
                }, h.prototype.remove = function(n) {
                  n.style[m(this.keyName)] = "", n.getAttribute("style") || n.removeAttribute("style");
                }, h.prototype.value = function(n) {
                  var e = n.style[m(this.keyName)];
                  return this.canAdd(n, e) ? e : "";
                }, h;
              }(g.default)
            );
            c.default = p;
          },
          /* 34 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            });
            var A = /* @__PURE__ */ function() {
              function p(y, h) {
                for (var n = 0; n < h.length; n++) {
                  var e = h[n];
                  e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(y, e.key, e);
                }
              }
              return function(y, h, n) {
                return h && p(y.prototype, h), n && p(y, n), y;
              };
            }();
            function g(p, y) {
              if (!(p instanceof y))
                throw new TypeError("Cannot call a class as a function");
            }
            var m = function() {
              function p(y, h) {
                g(this, p), this.quill = y, this.options = h, this.modules = {};
              }
              return A(p, [{
                key: "init",
                value: function() {
                  var h = this;
                  Object.keys(this.options.modules).forEach(function(n) {
                    h.modules[n] == null && h.addModule(n);
                  });
                }
              }, {
                key: "addModule",
                value: function(h) {
                  var n = this.quill.constructor.import("modules/" + h);
                  return this.modules[h] = new n(this.quill, this.options.modules[h] || {}), this.modules[h];
                }
              }]), p;
            }();
            m.DEFAULTS = {
              modules: {}
            }, m.themes = {
              default: m
            }, c.default = m;
          },
          /* 35 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            });
            var A = /* @__PURE__ */ function() {
              function o(i, f) {
                for (var r = 0; r < f.length; r++) {
                  var d = f[r];
                  d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(i, d.key, d);
                }
              }
              return function(i, f, r) {
                return f && o(i.prototype, f), r && o(i, r), i;
              };
            }(), g = function o(i, f, r) {
              i === null && (i = Function.prototype);
              var d = Object.getOwnPropertyDescriptor(i, f);
              if (d === void 0) {
                var T = Object.getPrototypeOf(i);
                return T === null ? void 0 : o(T, f, r);
              } else {
                if ("value" in d)
                  return d.value;
                var b = d.get;
                return b === void 0 ? void 0 : b.call(r);
              }
            }, m = s(0), p = n(m), y = s(7), h = n(y);
            function n(o) {
              return o && o.__esModule ? o : { default: o };
            }
            function e(o, i) {
              if (!(o instanceof i))
                throw new TypeError("Cannot call a class as a function");
            }
            function t(o, i) {
              if (!o)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return i && (typeof i == "object" || typeof i == "function") ? i : o;
            }
            function u(o, i) {
              if (typeof i != "function" && i !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof i);
              o.prototype = Object.create(i && i.prototype, { constructor: { value: o, enumerable: !1, writable: !0, configurable: !0 } }), i && (Object.setPrototypeOf ? Object.setPrototypeOf(o, i) : o.__proto__ = i);
            }
            var a = "\uFEFF", l = function(o) {
              u(i, o);
              function i(f) {
                e(this, i);
                var r = t(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, f));
                return r.contentNode = document.createElement("span"), r.contentNode.setAttribute("contenteditable", !1), [].slice.call(r.domNode.childNodes).forEach(function(d) {
                  r.contentNode.appendChild(d);
                }), r.leftGuard = document.createTextNode(a), r.rightGuard = document.createTextNode(a), r.domNode.appendChild(r.leftGuard), r.domNode.appendChild(r.contentNode), r.domNode.appendChild(r.rightGuard), r;
              }
              return A(i, [{
                key: "index",
                value: function(r, d) {
                  return r === this.leftGuard ? 0 : r === this.rightGuard ? 1 : g(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "index", this).call(this, r, d);
                }
              }, {
                key: "restore",
                value: function(r) {
                  var d = void 0, T = void 0, b = r.data.split(a).join("");
                  if (r === this.leftGuard)
                    if (this.prev instanceof h.default) {
                      var E = this.prev.length();
                      this.prev.insertAt(E, b), d = {
                        startNode: this.prev.domNode,
                        startOffset: E + b.length
                      };
                    } else
                      T = document.createTextNode(b), this.parent.insertBefore(p.default.create(T), this), d = {
                        startNode: T,
                        startOffset: b.length
                      };
                  else r === this.rightGuard && (this.next instanceof h.default ? (this.next.insertAt(0, b), d = {
                    startNode: this.next.domNode,
                    startOffset: b.length
                  }) : (T = document.createTextNode(b), this.parent.insertBefore(p.default.create(T), this.next), d = {
                    startNode: T,
                    startOffset: b.length
                  }));
                  return r.data = a, d;
                }
              }, {
                key: "update",
                value: function(r, d) {
                  var T = this;
                  r.forEach(function(b) {
                    if (b.type === "characterData" && (b.target === T.leftGuard || b.target === T.rightGuard)) {
                      var E = T.restore(b.target);
                      E && (d.range = E);
                    }
                  });
                }
              }]), i;
            }(p.default.Embed);
            c.default = l;
          },
          /* 36 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            }), c.AlignStyle = c.AlignClass = c.AlignAttribute = void 0;
            var A = s(0), g = m(A);
            function m(e) {
              return e && e.__esModule ? e : { default: e };
            }
            var p = {
              scope: g.default.Scope.BLOCK,
              whitelist: ["right", "center", "justify"]
            }, y = new g.default.Attributor.Attribute("align", "align", p), h = new g.default.Attributor.Class("align", "ql-align", p), n = new g.default.Attributor.Style("align", "text-align", p);
            c.AlignAttribute = y, c.AlignClass = h, c.AlignStyle = n;
          },
          /* 37 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            }), c.BackgroundStyle = c.BackgroundClass = void 0;
            var A = s(0), g = p(A), m = s(26);
            function p(n) {
              return n && n.__esModule ? n : { default: n };
            }
            var y = new g.default.Attributor.Class("background", "ql-bg", {
              scope: g.default.Scope.INLINE
            }), h = new m.ColorAttributor("background", "background-color", {
              scope: g.default.Scope.INLINE
            });
            c.BackgroundClass = y, c.BackgroundStyle = h;
          },
          /* 38 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            }), c.DirectionStyle = c.DirectionClass = c.DirectionAttribute = void 0;
            var A = s(0), g = m(A);
            function m(e) {
              return e && e.__esModule ? e : { default: e };
            }
            var p = {
              scope: g.default.Scope.BLOCK,
              whitelist: ["rtl"]
            }, y = new g.default.Attributor.Attribute("direction", "dir", p), h = new g.default.Attributor.Class("direction", "ql-direction", p), n = new g.default.Attributor.Style("direction", "direction", p);
            c.DirectionAttribute = y, c.DirectionClass = h, c.DirectionStyle = n;
          },
          /* 39 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            }), c.FontClass = c.FontStyle = void 0;
            var A = /* @__PURE__ */ function() {
              function o(i, f) {
                for (var r = 0; r < f.length; r++) {
                  var d = f[r];
                  d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(i, d.key, d);
                }
              }
              return function(i, f, r) {
                return f && o(i.prototype, f), r && o(i, r), i;
              };
            }(), g = function o(i, f, r) {
              i === null && (i = Function.prototype);
              var d = Object.getOwnPropertyDescriptor(i, f);
              if (d === void 0) {
                var T = Object.getPrototypeOf(i);
                return T === null ? void 0 : o(T, f, r);
              } else {
                if ("value" in d)
                  return d.value;
                var b = d.get;
                return b === void 0 ? void 0 : b.call(r);
              }
            }, m = s(0), p = y(m);
            function y(o) {
              return o && o.__esModule ? o : { default: o };
            }
            function h(o, i) {
              if (!(o instanceof i))
                throw new TypeError("Cannot call a class as a function");
            }
            function n(o, i) {
              if (!o)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return i && (typeof i == "object" || typeof i == "function") ? i : o;
            }
            function e(o, i) {
              if (typeof i != "function" && i !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof i);
              o.prototype = Object.create(i && i.prototype, { constructor: { value: o, enumerable: !1, writable: !0, configurable: !0 } }), i && (Object.setPrototypeOf ? Object.setPrototypeOf(o, i) : o.__proto__ = i);
            }
            var t = {
              scope: p.default.Scope.INLINE,
              whitelist: ["serif", "monospace"]
            }, u = new p.default.Attributor.Class("font", "ql-font", t), a = function(o) {
              e(i, o);
              function i() {
                return h(this, i), n(this, (i.__proto__ || Object.getPrototypeOf(i)).apply(this, arguments));
              }
              return A(i, [{
                key: "value",
                value: function(r) {
                  return g(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "value", this).call(this, r).replace(/["']/g, "");
                }
              }]), i;
            }(p.default.Attributor.Style), l = new a("font", "font-family", t);
            c.FontStyle = l, c.FontClass = u;
          },
          /* 40 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            }), c.SizeStyle = c.SizeClass = void 0;
            var A = s(0), g = m(A);
            function m(h) {
              return h && h.__esModule ? h : { default: h };
            }
            var p = new g.default.Attributor.Class("size", "ql-size", {
              scope: g.default.Scope.INLINE,
              whitelist: ["small", "large", "huge"]
            }), y = new g.default.Attributor.Style("size", "font-size", {
              scope: g.default.Scope.INLINE,
              whitelist: ["10px", "18px", "32px"]
            });
            c.SizeClass = p, c.SizeStyle = y;
          },
          /* 41 */
          /***/
          function(w, c, s) {
            w.exports = {
              align: {
                "": s(76),
                center: s(77),
                right: s(78),
                justify: s(79)
              },
              background: s(80),
              blockquote: s(81),
              bold: s(82),
              clean: s(83),
              code: s(58),
              "code-block": s(58),
              color: s(84),
              direction: {
                "": s(85),
                rtl: s(86)
              },
              float: {
                center: s(87),
                full: s(88),
                left: s(89),
                right: s(90)
              },
              formula: s(91),
              header: {
                1: s(92),
                2: s(93)
              },
              italic: s(94),
              image: s(95),
              indent: {
                "+1": s(96),
                "-1": s(97)
              },
              link: s(98),
              list: {
                ordered: s(99),
                bullet: s(100),
                check: s(101)
              },
              script: {
                sub: s(102),
                super: s(103)
              },
              strike: s(104),
              underline: s(105),
              video: s(106)
            };
          },
          /* 42 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            }), c.getLastChangeIndex = c.default = void 0;
            var A = /* @__PURE__ */ function() {
              function f(r, d) {
                for (var T = 0; T < d.length; T++) {
                  var b = d[T];
                  b.enumerable = b.enumerable || !1, b.configurable = !0, "value" in b && (b.writable = !0), Object.defineProperty(r, b.key, b);
                }
              }
              return function(r, d, T) {
                return d && f(r.prototype, d), T && f(r, T), r;
              };
            }(), g = s(0), m = e(g), p = s(5), y = e(p), h = s(9), n = e(h);
            function e(f) {
              return f && f.__esModule ? f : { default: f };
            }
            function t(f, r) {
              if (!(f instanceof r))
                throw new TypeError("Cannot call a class as a function");
            }
            function u(f, r) {
              if (!f)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return r && (typeof r == "object" || typeof r == "function") ? r : f;
            }
            function a(f, r) {
              if (typeof r != "function" && r !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof r);
              f.prototype = Object.create(r && r.prototype, { constructor: { value: f, enumerable: !1, writable: !0, configurable: !0 } }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(f, r) : f.__proto__ = r);
            }
            var l = function(f) {
              a(r, f);
              function r(d, T) {
                t(this, r);
                var b = u(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, d, T));
                return b.lastRecorded = 0, b.ignoreChange = !1, b.clear(), b.quill.on(y.default.events.EDITOR_CHANGE, function(E, N, O, v) {
                  E !== y.default.events.TEXT_CHANGE || b.ignoreChange || (!b.options.userOnly || v === y.default.sources.USER ? b.record(N, O) : b.transform(N));
                }), b.quill.keyboard.addBinding({ key: "Z", shortKey: !0 }, b.undo.bind(b)), b.quill.keyboard.addBinding({ key: "Z", shortKey: !0, shiftKey: !0 }, b.redo.bind(b)), /Win/i.test(navigator.platform) && b.quill.keyboard.addBinding({ key: "Y", shortKey: !0 }, b.redo.bind(b)), b;
              }
              return A(r, [{
                key: "change",
                value: function(T, b) {
                  if (this.stack[T].length !== 0) {
                    var E = this.stack[T].pop();
                    this.stack[b].push(E), this.lastRecorded = 0, this.ignoreChange = !0, this.quill.updateContents(E[T], y.default.sources.USER), this.ignoreChange = !1;
                    var N = i(E[T]);
                    this.quill.setSelection(N);
                  }
                }
              }, {
                key: "clear",
                value: function() {
                  this.stack = { undo: [], redo: [] };
                }
              }, {
                key: "cutoff",
                value: function() {
                  this.lastRecorded = 0;
                }
              }, {
                key: "record",
                value: function(T, b) {
                  if (T.ops.length !== 0) {
                    this.stack.redo = [];
                    var E = this.quill.getContents().diff(b), N = Date.now();
                    if (this.lastRecorded + this.options.delay > N && this.stack.undo.length > 0) {
                      var O = this.stack.undo.pop();
                      E = E.compose(O.undo), T = O.redo.compose(T);
                    } else
                      this.lastRecorded = N;
                    this.stack.undo.push({
                      redo: T,
                      undo: E
                    }), this.stack.undo.length > this.options.maxStack && this.stack.undo.shift();
                  }
                }
              }, {
                key: "redo",
                value: function() {
                  this.change("redo", "undo");
                }
              }, {
                key: "transform",
                value: function(T) {
                  this.stack.undo.forEach(function(b) {
                    b.undo = T.transform(b.undo, !0), b.redo = T.transform(b.redo, !0);
                  }), this.stack.redo.forEach(function(b) {
                    b.undo = T.transform(b.undo, !0), b.redo = T.transform(b.redo, !0);
                  });
                }
              }, {
                key: "undo",
                value: function() {
                  this.change("undo", "redo");
                }
              }]), r;
            }(n.default);
            l.DEFAULTS = {
              delay: 1e3,
              maxStack: 100,
              userOnly: !1
            };
            function o(f) {
              var r = f.ops[f.ops.length - 1];
              return r == null ? !1 : r.insert != null ? typeof r.insert == "string" && r.insert.endsWith(`
`) : r.attributes != null ? Object.keys(r.attributes).some(function(d) {
                return m.default.query(d, m.default.Scope.BLOCK) != null;
              }) : !1;
            }
            function i(f) {
              var r = f.reduce(function(T, b) {
                return T += b.delete || 0, T;
              }, 0), d = f.length() - r;
              return o(f) && (d -= 1), d;
            }
            c.default = l, c.getLastChangeIndex = i;
          },
          /* 43 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            }), c.default = c.BaseTooltip = void 0;
            var A = /* @__PURE__ */ function() {
              function P(L, H) {
                for (var B = 0; B < H.length; B++) {
                  var x = H[B];
                  x.enumerable = x.enumerable || !1, x.configurable = !0, "value" in x && (x.writable = !0), Object.defineProperty(L, x.key, x);
                }
              }
              return function(L, H, B) {
                return H && P(L.prototype, H), B && P(L, B), L;
              };
            }(), g = function P(L, H, B) {
              L === null && (L = Function.prototype);
              var x = Object.getOwnPropertyDescriptor(L, H);
              if (x === void 0) {
                var D = Object.getPrototypeOf(L);
                return D === null ? void 0 : P(D, H, B);
              } else {
                if ("value" in x)
                  return x.value;
                var K = x.get;
                return K === void 0 ? void 0 : K.call(B);
              }
            }, m = s(3), p = N(m), y = s(2), h = N(y), n = s(8), e = N(n), t = s(23), u = N(t), a = s(34), l = N(a), o = s(59), i = N(o), f = s(60), r = N(f), d = s(28), T = N(d), b = s(61), E = N(b);
            function N(P) {
              return P && P.__esModule ? P : { default: P };
            }
            function O(P, L) {
              if (!(P instanceof L))
                throw new TypeError("Cannot call a class as a function");
            }
            function v(P, L) {
              if (!P)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return L && (typeof L == "object" || typeof L == "function") ? L : P;
            }
            function _(P, L) {
              if (typeof L != "function" && L !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof L);
              P.prototype = Object.create(L && L.prototype, { constructor: { value: P, enumerable: !1, writable: !0, configurable: !0 } }), L && (Object.setPrototypeOf ? Object.setPrototypeOf(P, L) : P.__proto__ = L);
            }
            var k = [!1, "center", "right", "justify"], q = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"], R = [!1, "serif", "monospace"], F = ["1", "2", "3", !1], U = ["small", !1, "large", "huge"], $ = function(P) {
              _(L, P);
              function L(H, B) {
                O(this, L);
                var x = v(this, (L.__proto__ || Object.getPrototypeOf(L)).call(this, H, B)), D = function K(z) {
                  if (!document.body.contains(H.root))
                    return document.body.removeEventListener("click", K);
                  x.tooltip != null && !x.tooltip.root.contains(z.target) && document.activeElement !== x.tooltip.textbox && !x.quill.hasFocus() && x.tooltip.hide(), x.pickers != null && x.pickers.forEach(function(W) {
                    W.container.contains(z.target) || W.close();
                  });
                };
                return H.emitter.listenDOM("click", document.body, D), x;
              }
              return A(L, [{
                key: "addModule",
                value: function(B) {
                  var x = g(L.prototype.__proto__ || Object.getPrototypeOf(L.prototype), "addModule", this).call(this, B);
                  return B === "toolbar" && this.extendToolbar(x), x;
                }
              }, {
                key: "buildButtons",
                value: function(B, x) {
                  B.forEach(function(D) {
                    var K = D.getAttribute("class") || "";
                    K.split(/\s+/).forEach(function(z) {
                      if (z.startsWith("ql-") && (z = z.slice(3), x[z] != null))
                        if (z === "direction")
                          D.innerHTML = x[z][""] + x[z].rtl;
                        else if (typeof x[z] == "string")
                          D.innerHTML = x[z];
                        else {
                          var W = D.value || "";
                          W != null && x[z][W] && (D.innerHTML = x[z][W]);
                        }
                    });
                  });
                }
              }, {
                key: "buildPickers",
                value: function(B, x) {
                  var D = this;
                  this.pickers = B.map(function(z) {
                    if (z.classList.contains("ql-align"))
                      return z.querySelector("option") == null && S(z, k), new r.default(z, x.align);
                    if (z.classList.contains("ql-background") || z.classList.contains("ql-color")) {
                      var W = z.classList.contains("ql-background") ? "background" : "color";
                      return z.querySelector("option") == null && S(z, q, W === "background" ? "#ffffff" : "#000000"), new i.default(z, x[W]);
                    } else
                      return z.querySelector("option") == null && (z.classList.contains("ql-font") ? S(z, R) : z.classList.contains("ql-header") ? S(z, F) : z.classList.contains("ql-size") && S(z, U)), new T.default(z);
                  });
                  var K = function() {
                    D.pickers.forEach(function(W) {
                      W.update();
                    });
                  };
                  this.quill.on(e.default.events.EDITOR_CHANGE, K);
                }
              }]), L;
            }(l.default);
            $.DEFAULTS = (0, p.default)(!0, {}, l.default.DEFAULTS, {
              modules: {
                toolbar: {
                  handlers: {
                    formula: function() {
                      this.quill.theme.tooltip.edit("formula");
                    },
                    image: function() {
                      var L = this, H = this.container.querySelector("input.ql-image[type=file]");
                      H == null && (H = document.createElement("input"), H.setAttribute("type", "file"), H.setAttribute("accept", "image/png, image/gif, image/jpeg, image/bmp, image/x-icon"), H.classList.add("ql-image"), H.addEventListener("change", function() {
                        if (H.files != null && H.files[0] != null) {
                          var B = new FileReader();
                          B.onload = function(x) {
                            var D = L.quill.getSelection(!0);
                            L.quill.updateContents(new h.default().retain(D.index).delete(D.length).insert({ image: x.target.result }), e.default.sources.USER), L.quill.setSelection(D.index + 1, e.default.sources.SILENT), H.value = "";
                          }, B.readAsDataURL(H.files[0]);
                        }
                      }), this.container.appendChild(H)), H.click();
                    },
                    video: function() {
                      this.quill.theme.tooltip.edit("video");
                    }
                  }
                }
              }
            });
            var C = function(P) {
              _(L, P);
              function L(H, B) {
                O(this, L);
                var x = v(this, (L.__proto__ || Object.getPrototypeOf(L)).call(this, H, B));
                return x.textbox = x.root.querySelector('input[type="text"]'), x.listen(), x;
              }
              return A(L, [{
                key: "listen",
                value: function() {
                  var B = this;
                  this.textbox.addEventListener("keydown", function(x) {
                    u.default.match(x, "enter") ? (B.save(), x.preventDefault()) : u.default.match(x, "escape") && (B.cancel(), x.preventDefault());
                  });
                }
              }, {
                key: "cancel",
                value: function() {
                  this.hide();
                }
              }, {
                key: "edit",
                value: function() {
                  var B = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "link", x = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
                  this.root.classList.remove("ql-hidden"), this.root.classList.add("ql-editing"), x != null ? this.textbox.value = x : B !== this.root.getAttribute("data-mode") && (this.textbox.value = ""), this.position(this.quill.getBounds(this.quill.selection.savedRange)), this.textbox.select(), this.textbox.setAttribute("placeholder", this.textbox.getAttribute("data-" + B) || ""), this.root.setAttribute("data-mode", B);
                }
              }, {
                key: "restoreFocus",
                value: function() {
                  var B = this.quill.scrollingContainer.scrollTop;
                  this.quill.focus(), this.quill.scrollingContainer.scrollTop = B;
                }
              }, {
                key: "save",
                value: function() {
                  var B = this.textbox.value;
                  switch (this.root.getAttribute("data-mode")) {
                    case "link": {
                      var x = this.quill.root.scrollTop;
                      this.linkRange ? (this.quill.formatText(this.linkRange, "link", B, e.default.sources.USER), delete this.linkRange) : (this.restoreFocus(), this.quill.format("link", B, e.default.sources.USER)), this.quill.root.scrollTop = x;
                      break;
                    }
                    case "video":
                      B = j(B);
                    // eslint-disable-next-line no-fallthrough
                    case "formula": {
                      if (!B) break;
                      var D = this.quill.getSelection(!0);
                      if (D != null) {
                        var K = D.index + D.length;
                        this.quill.insertEmbed(K, this.root.getAttribute("data-mode"), B, e.default.sources.USER), this.root.getAttribute("data-mode") === "formula" && this.quill.insertText(K + 1, " ", e.default.sources.USER), this.quill.setSelection(K + 2, e.default.sources.USER);
                      }
                      break;
                    }
                  }
                  this.textbox.value = "", this.hide();
                }
              }]), L;
            }(E.default);
            function j(P) {
              var L = P.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || P.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
              return L ? (L[1] || "https") + "://www.youtube.com/embed/" + L[2] + "?showinfo=0" : (L = P.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) ? (L[1] || "https") + "://player.vimeo.com/video/" + L[2] + "/" : P;
            }
            function S(P, L) {
              var H = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
              L.forEach(function(B) {
                var x = document.createElement("option");
                B === H ? x.setAttribute("selected", "selected") : x.setAttribute("value", B), P.appendChild(x);
              });
            }
            c.BaseTooltip = C, c.default = $;
          },
          /* 44 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", { value: !0 });
            var A = (
              /** @class */
              function() {
                function g() {
                  this.head = this.tail = null, this.length = 0;
                }
                return g.prototype.append = function() {
                  for (var m = [], p = 0; p < arguments.length; p++)
                    m[p] = arguments[p];
                  this.insertBefore(m[0], null), m.length > 1 && this.append.apply(this, m.slice(1));
                }, g.prototype.contains = function(m) {
                  for (var p, y = this.iterator(); p = y(); )
                    if (p === m)
                      return !0;
                  return !1;
                }, g.prototype.insertBefore = function(m, p) {
                  m && (m.next = p, p != null ? (m.prev = p.prev, p.prev != null && (p.prev.next = m), p.prev = m, p === this.head && (this.head = m)) : this.tail != null ? (this.tail.next = m, m.prev = this.tail, this.tail = m) : (m.prev = null, this.head = this.tail = m), this.length += 1);
                }, g.prototype.offset = function(m) {
                  for (var p = 0, y = this.head; y != null; ) {
                    if (y === m)
                      return p;
                    p += y.length(), y = y.next;
                  }
                  return -1;
                }, g.prototype.remove = function(m) {
                  this.contains(m) && (m.prev != null && (m.prev.next = m.next), m.next != null && (m.next.prev = m.prev), m === this.head && (this.head = m.next), m === this.tail && (this.tail = m.prev), this.length -= 1);
                }, g.prototype.iterator = function(m) {
                  return m === void 0 && (m = this.head), function() {
                    var p = m;
                    return m != null && (m = m.next), p;
                  };
                }, g.prototype.find = function(m, p) {
                  p === void 0 && (p = !1);
                  for (var y, h = this.iterator(); y = h(); ) {
                    var n = y.length();
                    if (m < n || p && m === n && (y.next == null || y.next.length() !== 0))
                      return [y, m];
                    m -= n;
                  }
                  return [null, 0];
                }, g.prototype.forEach = function(m) {
                  for (var p, y = this.iterator(); p = y(); )
                    m(p);
                }, g.prototype.forEachAt = function(m, p, y) {
                  if (!(p <= 0))
                    for (var h = this.find(m), n = h[0], e = h[1], t, u = m - e, a = this.iterator(n); (t = a()) && u < m + p; ) {
                      var l = t.length();
                      m > u ? y(t, m - u, Math.min(p, u + l - m)) : y(t, 0, Math.min(l, m + p - u)), u += l;
                    }
                }, g.prototype.map = function(m) {
                  return this.reduce(function(p, y) {
                    return p.push(m(y)), p;
                  }, []);
                }, g.prototype.reduce = function(m, p) {
                  for (var y, h = this.iterator(); y = h(); )
                    p = m(p, y);
                  return p;
                }, g;
              }()
            );
            c.default = A;
          },
          /* 45 */
          /***/
          function(w, c, s) {
            var A = this && this.__extends || function() {
              var n = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
                e.__proto__ = t;
              } || function(e, t) {
                for (var u in t) t.hasOwnProperty(u) && (e[u] = t[u]);
              };
              return function(e, t) {
                n(e, t);
                function u() {
                  this.constructor = e;
                }
                e.prototype = t === null ? Object.create(t) : (u.prototype = t.prototype, new u());
              };
            }();
            Object.defineProperty(c, "__esModule", { value: !0 });
            var g = s(17), m = s(1), p = {
              attributes: !0,
              characterData: !0,
              characterDataOldValue: !0,
              childList: !0,
              subtree: !0
            }, y = 100, h = (
              /** @class */
              function(n) {
                A(e, n);
                function e(t) {
                  var u = n.call(this, t) || this;
                  return u.scroll = u, u.observer = new MutationObserver(function(a) {
                    u.update(a);
                  }), u.observer.observe(u.domNode, p), u.attach(), u;
                }
                return e.prototype.detach = function() {
                  n.prototype.detach.call(this), this.observer.disconnect();
                }, e.prototype.deleteAt = function(t, u) {
                  this.update(), t === 0 && u === this.length() ? this.children.forEach(function(a) {
                    a.remove();
                  }) : n.prototype.deleteAt.call(this, t, u);
                }, e.prototype.formatAt = function(t, u, a, l) {
                  this.update(), n.prototype.formatAt.call(this, t, u, a, l);
                }, e.prototype.insertAt = function(t, u, a) {
                  this.update(), n.prototype.insertAt.call(this, t, u, a);
                }, e.prototype.optimize = function(t, u) {
                  var a = this;
                  t === void 0 && (t = []), u === void 0 && (u = {}), n.prototype.optimize.call(this, u);
                  for (var l = [].slice.call(this.observer.takeRecords()); l.length > 0; )
                    t.push(l.pop());
                  for (var o = function(d, T) {
                    T === void 0 && (T = !0), !(d == null || d === a) && d.domNode.parentNode != null && (d.domNode[m.DATA_KEY].mutations == null && (d.domNode[m.DATA_KEY].mutations = []), T && o(d.parent));
                  }, i = function(d) {
                    // @ts-ignore
                    d.domNode[m.DATA_KEY] == null || // @ts-ignore
                    d.domNode[m.DATA_KEY].mutations == null || (d instanceof g.default && d.children.forEach(i), d.optimize(u));
                  }, f = t, r = 0; f.length > 0; r += 1) {
                    if (r >= y)
                      throw new Error("[Parchment] Maximum optimize iterations reached");
                    for (f.forEach(function(d) {
                      var T = m.find(d.target, !0);
                      T != null && (T.domNode === d.target && (d.type === "childList" ? (o(m.find(d.previousSibling, !1)), [].forEach.call(d.addedNodes, function(b) {
                        var E = m.find(b, !1);
                        o(E, !1), E instanceof g.default && E.children.forEach(function(N) {
                          o(N, !1);
                        });
                      })) : d.type === "attributes" && o(T.prev)), o(T));
                    }), this.children.forEach(i), f = [].slice.call(this.observer.takeRecords()), l = f.slice(); l.length > 0; )
                      t.push(l.pop());
                  }
                }, e.prototype.update = function(t, u) {
                  var a = this;
                  u === void 0 && (u = {}), t = t || this.observer.takeRecords(), t.map(function(l) {
                    var o = m.find(l.target, !0);
                    return o == null ? null : o.domNode[m.DATA_KEY].mutations == null ? (o.domNode[m.DATA_KEY].mutations = [l], o) : (o.domNode[m.DATA_KEY].mutations.push(l), null);
                  }).forEach(function(l) {
                    l == null || l === a || //@ts-ignore
                    l.domNode[m.DATA_KEY] == null || l.update(l.domNode[m.DATA_KEY].mutations || [], u);
                  }), this.domNode[m.DATA_KEY].mutations != null && n.prototype.update.call(this, this.domNode[m.DATA_KEY].mutations, u), this.optimize(t, u);
                }, e.blotName = "scroll", e.defaultChild = "block", e.scope = m.Scope.BLOCK_BLOT, e.tagName = "DIV", e;
              }(g.default)
            );
            c.default = h;
          },
          /* 46 */
          /***/
          function(w, c, s) {
            var A = this && this.__extends || function() {
              var h = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, e) {
                n.__proto__ = e;
              } || function(n, e) {
                for (var t in e) e.hasOwnProperty(t) && (n[t] = e[t]);
              };
              return function(n, e) {
                h(n, e);
                function t() {
                  this.constructor = n;
                }
                n.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
              };
            }();
            Object.defineProperty(c, "__esModule", { value: !0 });
            var g = s(18), m = s(1);
            function p(h, n) {
              if (Object.keys(h).length !== Object.keys(n).length)
                return !1;
              for (var e in h)
                if (h[e] !== n[e])
                  return !1;
              return !0;
            }
            var y = (
              /** @class */
              function(h) {
                A(n, h);
                function n() {
                  return h !== null && h.apply(this, arguments) || this;
                }
                return n.formats = function(e) {
                  if (e.tagName !== n.tagName)
                    return h.formats.call(this, e);
                }, n.prototype.format = function(e, t) {
                  var u = this;
                  e === this.statics.blotName && !t ? (this.children.forEach(function(a) {
                    a instanceof g.default || (a = a.wrap(n.blotName, !0)), u.attributes.copy(a);
                  }), this.unwrap()) : h.prototype.format.call(this, e, t);
                }, n.prototype.formatAt = function(e, t, u, a) {
                  if (this.formats()[u] != null || m.query(u, m.Scope.ATTRIBUTE)) {
                    var l = this.isolate(e, t);
                    l.format(u, a);
                  } else
                    h.prototype.formatAt.call(this, e, t, u, a);
                }, n.prototype.optimize = function(e) {
                  h.prototype.optimize.call(this, e);
                  var t = this.formats();
                  if (Object.keys(t).length === 0)
                    return this.unwrap();
                  var u = this.next;
                  u instanceof n && u.prev === this && p(t, u.formats()) && (u.moveChildren(this), u.remove());
                }, n.blotName = "inline", n.scope = m.Scope.INLINE_BLOT, n.tagName = "SPAN", n;
              }(g.default)
            );
            c.default = y;
          },
          /* 47 */
          /***/
          function(w, c, s) {
            var A = this && this.__extends || function() {
              var y = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(h, n) {
                h.__proto__ = n;
              } || function(h, n) {
                for (var e in n) n.hasOwnProperty(e) && (h[e] = n[e]);
              };
              return function(h, n) {
                y(h, n);
                function e() {
                  this.constructor = h;
                }
                h.prototype = n === null ? Object.create(n) : (e.prototype = n.prototype, new e());
              };
            }();
            Object.defineProperty(c, "__esModule", { value: !0 });
            var g = s(18), m = s(1), p = (
              /** @class */
              function(y) {
                A(h, y);
                function h() {
                  return y !== null && y.apply(this, arguments) || this;
                }
                return h.formats = function(n) {
                  var e = m.query(h.blotName).tagName;
                  if (n.tagName !== e)
                    return y.formats.call(this, n);
                }, h.prototype.format = function(n, e) {
                  m.query(n, m.Scope.BLOCK) != null && (n === this.statics.blotName && !e ? this.replaceWith(h.blotName) : y.prototype.format.call(this, n, e));
                }, h.prototype.formatAt = function(n, e, t, u) {
                  m.query(t, m.Scope.BLOCK) != null ? this.format(t, u) : y.prototype.formatAt.call(this, n, e, t, u);
                }, h.prototype.insertAt = function(n, e, t) {
                  if (t == null || m.query(e, m.Scope.INLINE) != null)
                    y.prototype.insertAt.call(this, n, e, t);
                  else {
                    var u = this.split(n), a = m.create(e, t);
                    u.parent.insertBefore(a, u);
                  }
                }, h.prototype.update = function(n, e) {
                  navigator.userAgent.match(/Trident/) ? this.build() : y.prototype.update.call(this, n, e);
                }, h.blotName = "block", h.scope = m.Scope.BLOCK_BLOT, h.tagName = "P", h;
              }(g.default)
            );
            c.default = p;
          },
          /* 48 */
          /***/
          function(w, c, s) {
            var A = this && this.__extends || function() {
              var p = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(y, h) {
                y.__proto__ = h;
              } || function(y, h) {
                for (var n in h) h.hasOwnProperty(n) && (y[n] = h[n]);
              };
              return function(y, h) {
                p(y, h);
                function n() {
                  this.constructor = y;
                }
                y.prototype = h === null ? Object.create(h) : (n.prototype = h.prototype, new n());
              };
            }();
            Object.defineProperty(c, "__esModule", { value: !0 });
            var g = s(19), m = (
              /** @class */
              function(p) {
                A(y, p);
                function y() {
                  return p !== null && p.apply(this, arguments) || this;
                }
                return y.formats = function(h) {
                }, y.prototype.format = function(h, n) {
                  p.prototype.formatAt.call(this, 0, this.length(), h, n);
                }, y.prototype.formatAt = function(h, n, e, t) {
                  h === 0 && n === this.length() ? this.format(e, t) : p.prototype.formatAt.call(this, h, n, e, t);
                }, y.prototype.formats = function() {
                  return this.statics.formats(this.domNode);
                }, y;
              }(g.default)
            );
            c.default = m;
          },
          /* 49 */
          /***/
          function(w, c, s) {
            var A = this && this.__extends || function() {
              var y = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(h, n) {
                h.__proto__ = n;
              } || function(h, n) {
                for (var e in n) n.hasOwnProperty(e) && (h[e] = n[e]);
              };
              return function(h, n) {
                y(h, n);
                function e() {
                  this.constructor = h;
                }
                h.prototype = n === null ? Object.create(n) : (e.prototype = n.prototype, new e());
              };
            }();
            Object.defineProperty(c, "__esModule", { value: !0 });
            var g = s(19), m = s(1), p = (
              /** @class */
              function(y) {
                A(h, y);
                function h(n) {
                  var e = y.call(this, n) || this;
                  return e.text = e.statics.value(e.domNode), e;
                }
                return h.create = function(n) {
                  return document.createTextNode(n);
                }, h.value = function(n) {
                  var e = n.data;
                  return e.normalize && (e = e.normalize()), e;
                }, h.prototype.deleteAt = function(n, e) {
                  this.domNode.data = this.text = this.text.slice(0, n) + this.text.slice(n + e);
                }, h.prototype.index = function(n, e) {
                  return this.domNode === n ? e : -1;
                }, h.prototype.insertAt = function(n, e, t) {
                  t == null ? (this.text = this.text.slice(0, n) + e + this.text.slice(n), this.domNode.data = this.text) : y.prototype.insertAt.call(this, n, e, t);
                }, h.prototype.length = function() {
                  return this.text.length;
                }, h.prototype.optimize = function(n) {
                  y.prototype.optimize.call(this, n), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof h && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
                }, h.prototype.position = function(n, e) {
                  return [this.domNode, n];
                }, h.prototype.split = function(n, e) {
                  if (e === void 0 && (e = !1), !e) {
                    if (n === 0)
                      return this;
                    if (n === this.length())
                      return this.next;
                  }
                  var t = m.create(this.domNode.splitText(n));
                  return this.parent.insertBefore(t, this.next), this.text = this.statics.value(this.domNode), t;
                }, h.prototype.update = function(n, e) {
                  var t = this;
                  n.some(function(u) {
                    return u.type === "characterData" && u.target === t.domNode;
                  }) && (this.text = this.statics.value(this.domNode));
                }, h.prototype.value = function() {
                  return this.text;
                }, h.blotName = "text", h.scope = m.Scope.INLINE_BLOT, h;
              }(g.default)
            );
            c.default = p;
          },
          /* 50 */
          /***/
          function(w, c, s) {
            var A = document.createElement("div");
            if (A.classList.toggle("test-class", !1), A.classList.contains("test-class")) {
              var g = DOMTokenList.prototype.toggle;
              DOMTokenList.prototype.toggle = function(m, p) {
                return arguments.length > 1 && !this.contains(m) == !p ? p : g.call(this, m);
              };
            }
            String.prototype.startsWith || (String.prototype.startsWith = function(m, p) {
              return p = p || 0, this.substr(p, m.length) === m;
            }), String.prototype.endsWith || (String.prototype.endsWith = function(m, p) {
              var y = this.toString();
              (typeof p != "number" || !isFinite(p) || Math.floor(p) !== p || p > y.length) && (p = y.length), p -= m.length;
              var h = y.indexOf(m, p);
              return h !== -1 && h === p;
            }), Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
              value: function(p) {
                if (this === null)
                  throw new TypeError("Array.prototype.find called on null or undefined");
                if (typeof p != "function")
                  throw new TypeError("predicate must be a function");
                for (var y = Object(this), h = y.length >>> 0, n = arguments[1], e, t = 0; t < h; t++)
                  if (e = y[t], p.call(n, e, t, y))
                    return e;
              }
            }), document.addEventListener("DOMContentLoaded", function() {
              document.execCommand("enableObjectResizing", !1, !1), document.execCommand("autoUrlDetect", !1, !1);
            });
          },
          /* 51 */
          /***/
          function(w, c) {
            var s = -1, A = 1, g = 0;
            function m(r, d, T) {
              if (r == d)
                return r ? [[g, r]] : [];
              (T < 0 || r.length < T) && (T = null);
              var b = n(r, d), E = r.substring(0, b);
              r = r.substring(b), d = d.substring(b), b = e(r, d);
              var N = r.substring(r.length - b);
              r = r.substring(0, r.length - b), d = d.substring(0, d.length - b);
              var O = p(r, d);
              return E && O.unshift([g, E]), N && O.push([g, N]), u(O), T != null && (O = o(O, T)), O = i(O), O;
            }
            function p(r, d) {
              var T;
              if (!r)
                return [[A, d]];
              if (!d)
                return [[s, r]];
              var b = r.length > d.length ? r : d, E = r.length > d.length ? d : r, N = b.indexOf(E);
              if (N != -1)
                return T = [
                  [A, b.substring(0, N)],
                  [g, E],
                  [A, b.substring(N + E.length)]
                ], r.length > d.length && (T[0][0] = T[2][0] = s), T;
              if (E.length == 1)
                return [[s, r], [A, d]];
              var O = t(r, d);
              if (O) {
                var v = O[0], _ = O[1], k = O[2], q = O[3], R = O[4], F = m(v, k), U = m(_, q);
                return F.concat([[g, R]], U);
              }
              return y(r, d);
            }
            function y(r, d) {
              for (var T = r.length, b = d.length, E = Math.ceil((T + b) / 2), N = E, O = 2 * E, v = new Array(O), _ = new Array(O), k = 0; k < O; k++)
                v[k] = -1, _[k] = -1;
              v[N + 1] = 0, _[N + 1] = 0;
              for (var q = T - b, R = q % 2 != 0, F = 0, U = 0, $ = 0, C = 0, j = 0; j < E; j++) {
                for (var S = -j + F; S <= j - U; S += 2) {
                  var P = N + S, L;
                  S == -j || S != j && v[P - 1] < v[P + 1] ? L = v[P + 1] : L = v[P - 1] + 1;
                  for (var H = L - S; L < T && H < b && r.charAt(L) == d.charAt(H); )
                    L++, H++;
                  if (v[P] = L, L > T)
                    U += 2;
                  else if (H > b)
                    F += 2;
                  else if (R) {
                    var B = N + q - S;
                    if (B >= 0 && B < O && _[B] != -1) {
                      var x = T - _[B];
                      if (L >= x)
                        return h(r, d, L, H);
                    }
                  }
                }
                for (var D = -j + $; D <= j - C; D += 2) {
                  var B = N + D, x;
                  D == -j || D != j && _[B - 1] < _[B + 1] ? x = _[B + 1] : x = _[B - 1] + 1;
                  for (var K = x - D; x < T && K < b && r.charAt(T - x - 1) == d.charAt(b - K - 1); )
                    x++, K++;
                  if (_[B] = x, x > T)
                    C += 2;
                  else if (K > b)
                    $ += 2;
                  else if (!R) {
                    var P = N + q - D;
                    if (P >= 0 && P < O && v[P] != -1) {
                      var L = v[P], H = N + L - P;
                      if (x = T - x, L >= x)
                        return h(r, d, L, H);
                    }
                  }
                }
              }
              return [[s, r], [A, d]];
            }
            function h(r, d, T, b) {
              var E = r.substring(0, T), N = d.substring(0, b), O = r.substring(T), v = d.substring(b), _ = m(E, N), k = m(O, v);
              return _.concat(k);
            }
            function n(r, d) {
              if (!r || !d || r.charAt(0) != d.charAt(0))
                return 0;
              for (var T = 0, b = Math.min(r.length, d.length), E = b, N = 0; T < E; )
                r.substring(N, E) == d.substring(N, E) ? (T = E, N = T) : b = E, E = Math.floor((b - T) / 2 + T);
              return E;
            }
            function e(r, d) {
              if (!r || !d || r.charAt(r.length - 1) != d.charAt(d.length - 1))
                return 0;
              for (var T = 0, b = Math.min(r.length, d.length), E = b, N = 0; T < E; )
                r.substring(r.length - E, r.length - N) == d.substring(d.length - E, d.length - N) ? (T = E, N = T) : b = E, E = Math.floor((b - T) / 2 + T);
              return E;
            }
            function t(r, d) {
              var T = r.length > d.length ? r : d, b = r.length > d.length ? d : r;
              if (T.length < 4 || b.length * 2 < T.length)
                return null;
              function E(U, $, C) {
                for (var j = U.substring(C, C + Math.floor(U.length / 4)), S = -1, P = "", L, H, B, x; (S = $.indexOf(j, S + 1)) != -1; ) {
                  var D = n(
                    U.substring(C),
                    $.substring(S)
                  ), K = e(
                    U.substring(0, C),
                    $.substring(0, S)
                  );
                  P.length < K + D && (P = $.substring(S - K, S) + $.substring(S, S + D), L = U.substring(0, C - K), H = U.substring(C + D), B = $.substring(0, S - K), x = $.substring(S + D));
                }
                return P.length * 2 >= U.length ? [
                  L,
                  H,
                  B,
                  x,
                  P
                ] : null;
              }
              var N = E(
                T,
                b,
                Math.ceil(T.length / 4)
              ), O = E(
                T,
                b,
                Math.ceil(T.length / 2)
              ), v;
              if (!N && !O)
                return null;
              O ? N ? v = N[4].length > O[4].length ? N : O : v = O : v = N;
              var _, k, q, R;
              r.length > d.length ? (_ = v[0], k = v[1], q = v[2], R = v[3]) : (q = v[0], R = v[1], _ = v[2], k = v[3]);
              var F = v[4];
              return [_, k, q, R, F];
            }
            function u(r) {
              r.push([g, ""]);
              for (var d = 0, T = 0, b = 0, E = "", N = "", O; d < r.length; )
                switch (r[d][0]) {
                  case A:
                    b++, N += r[d][1], d++;
                    break;
                  case s:
                    T++, E += r[d][1], d++;
                    break;
                  case g:
                    T + b > 1 ? (T !== 0 && b !== 0 && (O = n(N, E), O !== 0 && (d - T - b > 0 && r[d - T - b - 1][0] == g ? r[d - T - b - 1][1] += N.substring(0, O) : (r.splice(0, 0, [
                      g,
                      N.substring(0, O)
                    ]), d++), N = N.substring(O), E = E.substring(O)), O = e(N, E), O !== 0 && (r[d][1] = N.substring(N.length - O) + r[d][1], N = N.substring(0, N.length - O), E = E.substring(0, E.length - O))), T === 0 ? r.splice(
                      d - b,
                      T + b,
                      [A, N]
                    ) : b === 0 ? r.splice(
                      d - T,
                      T + b,
                      [s, E]
                    ) : r.splice(
                      d - T - b,
                      T + b,
                      [s, E],
                      [A, N]
                    ), d = d - T - b + (T ? 1 : 0) + (b ? 1 : 0) + 1) : d !== 0 && r[d - 1][0] == g ? (r[d - 1][1] += r[d][1], r.splice(d, 1)) : d++, b = 0, T = 0, E = "", N = "";
                    break;
                }
              r[r.length - 1][1] === "" && r.pop();
              var v = !1;
              for (d = 1; d < r.length - 1; )
                r[d - 1][0] == g && r[d + 1][0] == g && (r[d][1].substring(r[d][1].length - r[d - 1][1].length) == r[d - 1][1] ? (r[d][1] = r[d - 1][1] + r[d][1].substring(0, r[d][1].length - r[d - 1][1].length), r[d + 1][1] = r[d - 1][1] + r[d + 1][1], r.splice(d - 1, 1), v = !0) : r[d][1].substring(0, r[d + 1][1].length) == r[d + 1][1] && (r[d - 1][1] += r[d + 1][1], r[d][1] = r[d][1].substring(r[d + 1][1].length) + r[d + 1][1], r.splice(d + 1, 1), v = !0)), d++;
              v && u(r);
            }
            var a = m;
            a.INSERT = A, a.DELETE = s, a.EQUAL = g, w.exports = a;
            function l(r, d) {
              if (d === 0)
                return [g, r];
              for (var T = 0, b = 0; b < r.length; b++) {
                var E = r[b];
                if (E[0] === s || E[0] === g) {
                  var N = T + E[1].length;
                  if (d === N)
                    return [b + 1, r];
                  if (d < N) {
                    r = r.slice();
                    var O = d - T, v = [E[0], E[1].slice(0, O)], _ = [E[0], E[1].slice(O)];
                    return r.splice(b, 1, v, _), [b + 1, r];
                  } else
                    T = N;
                }
              }
              throw new Error("cursor_pos is out of bounds!");
            }
            function o(r, d) {
              var T = l(r, d), b = T[1], E = T[0], N = b[E], O = b[E + 1];
              if (N == null)
                return r;
              if (N[0] !== g)
                return r;
              if (O != null && N[1] + O[1] === O[1] + N[1])
                return b.splice(E, 2, O, N), f(b, E, 2);
              if (O != null && O[1].indexOf(N[1]) === 0) {
                b.splice(E, 2, [O[0], N[1]], [0, N[1]]);
                var v = O[1].slice(N[1].length);
                return v.length > 0 && b.splice(E + 2, 0, [O[0], v]), f(b, E, 3);
              } else
                return r;
            }
            function i(r) {
              for (var d = !1, T = function(O) {
                return O.charCodeAt(0) >= 56320 && O.charCodeAt(0) <= 57343;
              }, b = function(O) {
                return O.charCodeAt(O.length - 1) >= 55296 && O.charCodeAt(O.length - 1) <= 56319;
              }, E = 2; E < r.length; E += 1)
                r[E - 2][0] === g && b(r[E - 2][1]) && r[E - 1][0] === s && T(r[E - 1][1]) && r[E][0] === A && T(r[E][1]) && (d = !0, r[E - 1][1] = r[E - 2][1].slice(-1) + r[E - 1][1], r[E][1] = r[E - 2][1].slice(-1) + r[E][1], r[E - 2][1] = r[E - 2][1].slice(0, -1));
              if (!d)
                return r;
              for (var N = [], E = 0; E < r.length; E += 1)
                r[E][1].length > 0 && N.push(r[E]);
              return N;
            }
            function f(r, d, T) {
              for (var b = d + T - 1; b >= 0 && b >= d - 1; b--)
                if (b + 1 < r.length) {
                  var E = r[b], N = r[b + 1];
                  E[0] === N[1] && r.splice(b, 2, [E[0], E[1] + N[1]]);
                }
              return r;
            }
          },
          /* 52 */
          /***/
          function(w, c) {
            c = w.exports = typeof Object.keys == "function" ? Object.keys : s, c.shim = s;
            function s(A) {
              var g = [];
              for (var m in A) g.push(m);
              return g;
            }
          },
          /* 53 */
          /***/
          function(w, c) {
            var s = function() {
              return Object.prototype.toString.call(arguments);
            }() == "[object Arguments]";
            c = w.exports = s ? A : g, c.supported = A;
            function A(m) {
              return Object.prototype.toString.call(m) == "[object Arguments]";
            }
            c.unsupported = g;
            function g(m) {
              return m && typeof m == "object" && typeof m.length == "number" && Object.prototype.hasOwnProperty.call(m, "callee") && !Object.prototype.propertyIsEnumerable.call(m, "callee") || !1;
            }
          },
          /* 54 */
          /***/
          function(w, c) {
            var s = Object.prototype.hasOwnProperty, A = "~";
            function g() {
            }
            Object.create && (g.prototype = /* @__PURE__ */ Object.create(null), new g().__proto__ || (A = !1));
            function m(y, h, n) {
              this.fn = y, this.context = h, this.once = n || !1;
            }
            function p() {
              this._events = new g(), this._eventsCount = 0;
            }
            p.prototype.eventNames = function() {
              var h = [], n, e;
              if (this._eventsCount === 0) return h;
              for (e in n = this._events)
                s.call(n, e) && h.push(A ? e.slice(1) : e);
              return Object.getOwnPropertySymbols ? h.concat(Object.getOwnPropertySymbols(n)) : h;
            }, p.prototype.listeners = function(h, n) {
              var e = A ? A + h : h, t = this._events[e];
              if (n) return !!t;
              if (!t) return [];
              if (t.fn) return [t.fn];
              for (var u = 0, a = t.length, l = new Array(a); u < a; u++)
                l[u] = t[u].fn;
              return l;
            }, p.prototype.emit = function(h, n, e, t, u, a) {
              var l = A ? A + h : h;
              if (!this._events[l]) return !1;
              var o = this._events[l], i = arguments.length, f, r;
              if (o.fn) {
                switch (o.once && this.removeListener(h, o.fn, void 0, !0), i) {
                  case 1:
                    return o.fn.call(o.context), !0;
                  case 2:
                    return o.fn.call(o.context, n), !0;
                  case 3:
                    return o.fn.call(o.context, n, e), !0;
                  case 4:
                    return o.fn.call(o.context, n, e, t), !0;
                  case 5:
                    return o.fn.call(o.context, n, e, t, u), !0;
                  case 6:
                    return o.fn.call(o.context, n, e, t, u, a), !0;
                }
                for (r = 1, f = new Array(i - 1); r < i; r++)
                  f[r - 1] = arguments[r];
                o.fn.apply(o.context, f);
              } else {
                var d = o.length, T;
                for (r = 0; r < d; r++)
                  switch (o[r].once && this.removeListener(h, o[r].fn, void 0, !0), i) {
                    case 1:
                      o[r].fn.call(o[r].context);
                      break;
                    case 2:
                      o[r].fn.call(o[r].context, n);
                      break;
                    case 3:
                      o[r].fn.call(o[r].context, n, e);
                      break;
                    case 4:
                      o[r].fn.call(o[r].context, n, e, t);
                      break;
                    default:
                      if (!f) for (T = 1, f = new Array(i - 1); T < i; T++)
                        f[T - 1] = arguments[T];
                      o[r].fn.apply(o[r].context, f);
                  }
              }
              return !0;
            }, p.prototype.on = function(h, n, e) {
              var t = new m(n, e || this), u = A ? A + h : h;
              return this._events[u] ? this._events[u].fn ? this._events[u] = [this._events[u], t] : this._events[u].push(t) : (this._events[u] = t, this._eventsCount++), this;
            }, p.prototype.once = function(h, n, e) {
              var t = new m(n, e || this, !0), u = A ? A + h : h;
              return this._events[u] ? this._events[u].fn ? this._events[u] = [this._events[u], t] : this._events[u].push(t) : (this._events[u] = t, this._eventsCount++), this;
            }, p.prototype.removeListener = function(h, n, e, t) {
              var u = A ? A + h : h;
              if (!this._events[u]) return this;
              if (!n)
                return --this._eventsCount === 0 ? this._events = new g() : delete this._events[u], this;
              var a = this._events[u];
              if (a.fn)
                a.fn === n && (!t || a.once) && (!e || a.context === e) && (--this._eventsCount === 0 ? this._events = new g() : delete this._events[u]);
              else {
                for (var l = 0, o = [], i = a.length; l < i; l++)
                  (a[l].fn !== n || t && !a[l].once || e && a[l].context !== e) && o.push(a[l]);
                o.length ? this._events[u] = o.length === 1 ? o[0] : o : --this._eventsCount === 0 ? this._events = new g() : delete this._events[u];
              }
              return this;
            }, p.prototype.removeAllListeners = function(h) {
              var n;
              return h ? (n = A ? A + h : h, this._events[n] && (--this._eventsCount === 0 ? this._events = new g() : delete this._events[n])) : (this._events = new g(), this._eventsCount = 0), this;
            }, p.prototype.off = p.prototype.removeListener, p.prototype.addListener = p.prototype.on, p.prototype.setMaxListeners = function() {
              return this;
            }, p.prefixed = A, p.EventEmitter = p, typeof w < "u" && (w.exports = p);
          },
          /* 55 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            }), c.matchText = c.matchSpacing = c.matchNewline = c.matchBlot = c.matchAttributor = c.default = void 0;
            var A = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(G) {
              return typeof G;
            } : function(G) {
              return G && typeof Symbol == "function" && G.constructor === Symbol && G !== Symbol.prototype ? "symbol" : typeof G;
            }, g = /* @__PURE__ */ function() {
              function G(V, Y) {
                var X = [], Z = !0, te = !1, re = void 0;
                try {
                  for (var ne = V[Symbol.iterator](), fe; !(Z = (fe = ne.next()).done) && (X.push(fe.value), !(Y && X.length === Y)); Z = !0)
                    ;
                } catch (he) {
                  te = !0, re = he;
                } finally {
                  try {
                    !Z && ne.return && ne.return();
                  } finally {
                    if (te) throw re;
                  }
                }
                return X;
              }
              return function(V, Y) {
                if (Array.isArray(V))
                  return V;
                if (Symbol.iterator in Object(V))
                  return G(V, Y);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
              };
            }(), m = /* @__PURE__ */ function() {
              function G(V, Y) {
                for (var X = 0; X < Y.length; X++) {
                  var Z = Y[X];
                  Z.enumerable = Z.enumerable || !1, Z.configurable = !0, "value" in Z && (Z.writable = !0), Object.defineProperty(V, Z.key, Z);
                }
              }
              return function(V, Y, X) {
                return Y && G(V.prototype, Y), X && G(V, X), V;
              };
            }(), p = s(3), y = _(p), h = s(2), n = _(h), e = s(0), t = _(e), u = s(5), a = _(u), l = s(10), o = _(l), i = s(9), f = _(i), r = s(36), d = s(37), T = s(13), b = _(T), E = s(26), N = s(38), O = s(39), v = s(40);
            function _(G) {
              return G && G.__esModule ? G : { default: G };
            }
            function k(G, V, Y) {
              return V in G ? Object.defineProperty(G, V, { value: Y, enumerable: !0, configurable: !0, writable: !0 }) : G[V] = Y, G;
            }
            function q(G, V) {
              if (!(G instanceof V))
                throw new TypeError("Cannot call a class as a function");
            }
            function R(G, V) {
              if (!G)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return V && (typeof V == "object" || typeof V == "function") ? V : G;
            }
            function F(G, V) {
              if (typeof V != "function" && V !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof V);
              G.prototype = Object.create(V && V.prototype, { constructor: { value: G, enumerable: !1, writable: !0, configurable: !0 } }), V && (Object.setPrototypeOf ? Object.setPrototypeOf(G, V) : G.__proto__ = V);
            }
            var U = (0, o.default)("quill:clipboard"), $ = "__ql-matcher", C = [[Node.TEXT_NODE, ue], [Node.TEXT_NODE, ie], ["br", Q], [Node.ELEMENT_NODE, ie], [Node.ELEMENT_NODE, W], [Node.ELEMENT_NODE, oe], [Node.ELEMENT_NODE, z], [Node.ELEMENT_NODE, se], ["li", ee], ["b", K.bind(K, "bold")], ["i", K.bind(K, "italic")], ["style", J]], j = [r.AlignAttribute, N.DirectionAttribute].reduce(function(G, V) {
              return G[V.keyName] = V, G;
            }, {}), S = [r.AlignStyle, d.BackgroundStyle, E.ColorStyle, N.DirectionStyle, O.FontStyle, v.SizeStyle].reduce(function(G, V) {
              return G[V.keyName] = V, G;
            }, {}), P = function(G) {
              F(V, G);
              function V(Y, X) {
                q(this, V);
                var Z = R(this, (V.__proto__ || Object.getPrototypeOf(V)).call(this, Y, X));
                return Z.quill.root.addEventListener("paste", Z.onPaste.bind(Z)), Z.container = Z.quill.addContainer("ql-clipboard"), Z.container.setAttribute("contenteditable", !0), Z.container.setAttribute("tabindex", -1), Z.matchers = [], C.concat(Z.options.matchers).forEach(function(te) {
                  var re = g(te, 2), ne = re[0], fe = re[1];
                  !X.matchVisual && fe === oe || Z.addMatcher(ne, fe);
                }), Z;
              }
              return m(V, [{
                key: "addMatcher",
                value: function(X, Z) {
                  this.matchers.push([X, Z]);
                }
              }, {
                key: "convert",
                value: function(X) {
                  if (typeof X == "string")
                    return this.container.innerHTML = X.replace(/\>\r?\n +\</g, "><"), this.convert();
                  var Z = this.quill.getFormat(this.quill.selection.savedRange.index);
                  if (Z[b.default.blotName]) {
                    var te = this.container.innerText;
                    return this.container.innerHTML = "", new n.default().insert(te, k({}, b.default.blotName, Z[b.default.blotName]));
                  }
                  var re = this.prepareMatching(), ne = g(re, 2), fe = ne[0], he = ne[1], ae = D(this.container, fe, he);
                  return B(ae, `
`) && ae.ops[ae.ops.length - 1].attributes == null && (ae = ae.compose(new n.default().retain(ae.length() - 1).delete(1))), U.log("convert", this.container.innerHTML, ae), this.container.innerHTML = "", ae;
                }
              }, {
                key: "dangerouslyPasteHTML",
                value: function(X, Z) {
                  var te = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : a.default.sources.API;
                  if (typeof X == "string")
                    this.quill.setContents(this.convert(X), Z), this.quill.setSelection(0, a.default.sources.SILENT);
                  else {
                    var re = this.convert(Z);
                    this.quill.updateContents(new n.default().retain(X).concat(re), te), this.quill.setSelection(X + re.length(), a.default.sources.SILENT);
                  }
                }
              }, {
                key: "onPaste",
                value: function(X) {
                  var Z = this;
                  if (!(X.defaultPrevented || !this.quill.isEnabled())) {
                    var te = this.quill.getSelection(), re = new n.default().retain(te.index), ne = this.quill.scrollingContainer.scrollTop;
                    this.container.focus(), this.quill.selection.update(a.default.sources.SILENT), setTimeout(function() {
                      re = re.concat(Z.convert()).delete(te.length), Z.quill.updateContents(re, a.default.sources.USER), Z.quill.setSelection(re.length() - te.length, a.default.sources.SILENT), Z.quill.scrollingContainer.scrollTop = ne, Z.quill.focus();
                    }, 1);
                  }
                }
              }, {
                key: "prepareMatching",
                value: function() {
                  var X = this, Z = [], te = [];
                  return this.matchers.forEach(function(re) {
                    var ne = g(re, 2), fe = ne[0], he = ne[1];
                    switch (fe) {
                      case Node.TEXT_NODE:
                        te.push(he);
                        break;
                      case Node.ELEMENT_NODE:
                        Z.push(he);
                        break;
                      default:
                        [].forEach.call(X.container.querySelectorAll(fe), function(ae) {
                          ae[$] = ae[$] || [], ae[$].push(he);
                        });
                        break;
                    }
                  }), [Z, te];
                }
              }]), V;
            }(f.default);
            P.DEFAULTS = {
              matchers: [],
              matchVisual: !0
            };
            function L(G, V, Y) {
              return (typeof V > "u" ? "undefined" : A(V)) === "object" ? Object.keys(V).reduce(function(X, Z) {
                return L(X, Z, V[Z]);
              }, G) : G.reduce(function(X, Z) {
                return Z.attributes && Z.attributes[V] ? X.push(Z) : X.insert(Z.insert, (0, y.default)({}, k({}, V, Y), Z.attributes));
              }, new n.default());
            }
            function H(G) {
              if (G.nodeType !== Node.ELEMENT_NODE) return {};
              var V = "__ql-computed-style";
              return G[V] || (G[V] = window.getComputedStyle(G));
            }
            function B(G, V) {
              for (var Y = "", X = G.ops.length - 1; X >= 0 && Y.length < V.length; --X) {
                var Z = G.ops[X];
                if (typeof Z.insert != "string") break;
                Y = Z.insert + Y;
              }
              return Y.slice(-1 * V.length) === V;
            }
            function x(G) {
              if (G.childNodes.length === 0) return !1;
              var V = H(G);
              return ["block", "list-item"].indexOf(V.display) > -1;
            }
            function D(G, V, Y) {
              return G.nodeType === G.TEXT_NODE ? Y.reduce(function(X, Z) {
                return Z(G, X);
              }, new n.default()) : G.nodeType === G.ELEMENT_NODE ? [].reduce.call(G.childNodes || [], function(X, Z) {
                var te = D(Z, V, Y);
                return Z.nodeType === G.ELEMENT_NODE && (te = V.reduce(function(re, ne) {
                  return ne(Z, re);
                }, te), te = (Z[$] || []).reduce(function(re, ne) {
                  return ne(Z, re);
                }, te)), X.concat(te);
              }, new n.default()) : new n.default();
            }
            function K(G, V, Y) {
              return L(Y, G, !0);
            }
            function z(G, V) {
              var Y = t.default.Attributor.Attribute.keys(G), X = t.default.Attributor.Class.keys(G), Z = t.default.Attributor.Style.keys(G), te = {};
              return Y.concat(X).concat(Z).forEach(function(re) {
                var ne = t.default.query(re, t.default.Scope.ATTRIBUTE);
                ne != null && (te[ne.attrName] = ne.value(G), te[ne.attrName]) || (ne = j[re], ne != null && (ne.attrName === re || ne.keyName === re) && (te[ne.attrName] = ne.value(G) || void 0), ne = S[re], ne != null && (ne.attrName === re || ne.keyName === re) && (ne = S[re], te[ne.attrName] = ne.value(G) || void 0));
              }), Object.keys(te).length > 0 && (V = L(V, te)), V;
            }
            function W(G, V) {
              var Y = t.default.query(G);
              if (Y == null) return V;
              if (Y.prototype instanceof t.default.Embed) {
                var X = {}, Z = Y.value(G);
                Z != null && (X[Y.blotName] = Z, V = new n.default().insert(X, Y.formats(G)));
              } else typeof Y.formats == "function" && (V = L(V, Y.blotName, Y.formats(G)));
              return V;
            }
            function Q(G, V) {
              return B(V, `
`) || V.insert(`
`), V;
            }
            function J() {
              return new n.default();
            }
            function ee(G, V) {
              var Y = t.default.query(G);
              if (Y == null || Y.blotName !== "list-item" || !B(V, `
`))
                return V;
              for (var X = -1, Z = G.parentNode; !Z.classList.contains("ql-clipboard"); )
                (t.default.query(Z) || {}).blotName === "list" && (X += 1), Z = Z.parentNode;
              return X <= 0 ? V : V.compose(new n.default().retain(V.length() - 1).retain(1, { indent: X }));
            }
            function ie(G, V) {
              return B(V, `
`) || (x(G) || V.length() > 0 && G.nextSibling && x(G.nextSibling)) && V.insert(`
`), V;
            }
            function oe(G, V) {
              if (x(G) && G.nextElementSibling != null && !B(V, `

`)) {
                var Y = G.offsetHeight + parseFloat(H(G).marginTop) + parseFloat(H(G).marginBottom);
                G.nextElementSibling.offsetTop > G.offsetTop + Y * 1.5 && V.insert(`
`);
              }
              return V;
            }
            function se(G, V) {
              var Y = {}, X = G.style || {};
              return X.fontStyle && H(G).fontStyle === "italic" && (Y.italic = !0), X.fontWeight && (H(G).fontWeight.startsWith("bold") || parseInt(H(G).fontWeight) >= 700) && (Y.bold = !0), Object.keys(Y).length > 0 && (V = L(V, Y)), parseFloat(X.textIndent || 0) > 0 && (V = new n.default().insert("	").concat(V)), V;
            }
            function ue(G, V) {
              var Y = G.data;
              if (G.parentNode.tagName === "O:P")
                return V.insert(Y.trim());
              if (Y.trim().length === 0 && G.parentNode.classList.contains("ql-clipboard"))
                return V;
              if (!H(G.parentNode).whiteSpace.startsWith("pre")) {
                var X = function(te, re) {
                  return re = re.replace(/[^\u00a0]/g, ""), re.length < 1 && te ? " " : re;
                };
                Y = Y.replace(/\r\n/g, " ").replace(/\n/g, " "), Y = Y.replace(/\s\s+/g, X.bind(X, !0)), (G.previousSibling == null && x(G.parentNode) || G.previousSibling != null && x(G.previousSibling)) && (Y = Y.replace(/^\s+/, X.bind(X, !1))), (G.nextSibling == null && x(G.parentNode) || G.nextSibling != null && x(G.nextSibling)) && (Y = Y.replace(/\s+$/, X.bind(X, !1)));
              }
              return V.insert(Y);
            }
            c.default = P, c.matchAttributor = z, c.matchBlot = W, c.matchNewline = ie, c.matchSpacing = oe, c.matchText = ue;
          },
          /* 56 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            });
            var A = /* @__PURE__ */ function() {
              function u(a, l) {
                for (var o = 0; o < l.length; o++) {
                  var i = l[o];
                  i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(a, i.key, i);
                }
              }
              return function(a, l, o) {
                return l && u(a.prototype, l), o && u(a, o), a;
              };
            }(), g = function u(a, l, o) {
              a === null && (a = Function.prototype);
              var i = Object.getOwnPropertyDescriptor(a, l);
              if (i === void 0) {
                var f = Object.getPrototypeOf(a);
                return f === null ? void 0 : u(f, l, o);
              } else {
                if ("value" in i)
                  return i.value;
                var r = i.get;
                return r === void 0 ? void 0 : r.call(o);
              }
            }, m = s(6), p = y(m);
            function y(u) {
              return u && u.__esModule ? u : { default: u };
            }
            function h(u, a) {
              if (!(u instanceof a))
                throw new TypeError("Cannot call a class as a function");
            }
            function n(u, a) {
              if (!u)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return a && (typeof a == "object" || typeof a == "function") ? a : u;
            }
            function e(u, a) {
              if (typeof a != "function" && a !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof a);
              u.prototype = Object.create(a && a.prototype, { constructor: { value: u, enumerable: !1, writable: !0, configurable: !0 } }), a && (Object.setPrototypeOf ? Object.setPrototypeOf(u, a) : u.__proto__ = a);
            }
            var t = function(u) {
              e(a, u);
              function a() {
                return h(this, a), n(this, (a.__proto__ || Object.getPrototypeOf(a)).apply(this, arguments));
              }
              return A(a, [{
                key: "optimize",
                value: function(o) {
                  g(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "optimize", this).call(this, o), this.domNode.tagName !== this.statics.tagName[0] && this.replaceWith(this.statics.blotName);
                }
              }], [{
                key: "create",
                value: function() {
                  return g(a.__proto__ || Object.getPrototypeOf(a), "create", this).call(this);
                }
              }, {
                key: "formats",
                value: function() {
                  return !0;
                }
              }]), a;
            }(p.default);
            t.blotName = "bold", t.tagName = ["STRONG", "B"], c.default = t;
          },
          /* 57 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            }), c.addControls = c.default = void 0;
            var A = /* @__PURE__ */ function() {
              function v(_, k) {
                var q = [], R = !0, F = !1, U = void 0;
                try {
                  for (var $ = _[Symbol.iterator](), C; !(R = (C = $.next()).done) && (q.push(C.value), !(k && q.length === k)); R = !0)
                    ;
                } catch (j) {
                  F = !0, U = j;
                } finally {
                  try {
                    !R && $.return && $.return();
                  } finally {
                    if (F) throw U;
                  }
                }
                return q;
              }
              return function(_, k) {
                if (Array.isArray(_))
                  return _;
                if (Symbol.iterator in Object(_))
                  return v(_, k);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
              };
            }(), g = /* @__PURE__ */ function() {
              function v(_, k) {
                for (var q = 0; q < k.length; q++) {
                  var R = k[q];
                  R.enumerable = R.enumerable || !1, R.configurable = !0, "value" in R && (R.writable = !0), Object.defineProperty(_, R.key, R);
                }
              }
              return function(_, k, q) {
                return k && v(_.prototype, k), q && v(_, q), _;
              };
            }(), m = s(2), p = o(m), y = s(0), h = o(y), n = s(5), e = o(n), t = s(10), u = o(t), a = s(9), l = o(a);
            function o(v) {
              return v && v.__esModule ? v : { default: v };
            }
            function i(v, _, k) {
              return _ in v ? Object.defineProperty(v, _, { value: k, enumerable: !0, configurable: !0, writable: !0 }) : v[_] = k, v;
            }
            function f(v, _) {
              if (!(v instanceof _))
                throw new TypeError("Cannot call a class as a function");
            }
            function r(v, _) {
              if (!v)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return _ && (typeof _ == "object" || typeof _ == "function") ? _ : v;
            }
            function d(v, _) {
              if (typeof _ != "function" && _ !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof _);
              v.prototype = Object.create(_ && _.prototype, { constructor: { value: v, enumerable: !1, writable: !0, configurable: !0 } }), _ && (Object.setPrototypeOf ? Object.setPrototypeOf(v, _) : v.__proto__ = _);
            }
            var T = (0, u.default)("quill:toolbar"), b = function(v) {
              d(_, v);
              function _(k, q) {
                f(this, _);
                var R = r(this, (_.__proto__ || Object.getPrototypeOf(_)).call(this, k, q));
                if (Array.isArray(R.options.container)) {
                  var F = document.createElement("div");
                  N(F, R.options.container), k.container.parentNode.insertBefore(F, k.container), R.container = F;
                } else typeof R.options.container == "string" ? R.container = document.querySelector(R.options.container) : R.container = R.options.container;
                if (!(R.container instanceof HTMLElement)) {
                  var U;
                  return U = T.error("Container required for toolbar", R.options), r(R, U);
                }
                return R.container.classList.add("ql-toolbar"), R.controls = [], R.handlers = {}, Object.keys(R.options.handlers).forEach(function($) {
                  R.addHandler($, R.options.handlers[$]);
                }), [].forEach.call(R.container.querySelectorAll("button, select"), function($) {
                  R.attach($);
                }), R.quill.on(e.default.events.EDITOR_CHANGE, function($, C) {
                  $ === e.default.events.SELECTION_CHANGE && R.update(C);
                }), R.quill.on(e.default.events.SCROLL_OPTIMIZE, function() {
                  var $ = R.quill.selection.getRange(), C = A($, 1), j = C[0];
                  R.update(j);
                }), R;
              }
              return g(_, [{
                key: "addHandler",
                value: function(q, R) {
                  this.handlers[q] = R;
                }
              }, {
                key: "attach",
                value: function(q) {
                  var R = this, F = [].find.call(q.classList, function($) {
                    return $.indexOf("ql-") === 0;
                  });
                  if (F) {
                    if (F = F.slice(3), q.tagName === "BUTTON" && q.setAttribute("type", "button"), this.handlers[F] == null) {
                      if (this.quill.scroll.whitelist != null && this.quill.scroll.whitelist[F] == null) {
                        T.warn("ignoring attaching to disabled format", F, q);
                        return;
                      }
                      if (h.default.query(F) == null) {
                        T.warn("ignoring attaching to nonexistent format", F, q);
                        return;
                      }
                    }
                    var U = q.tagName === "SELECT" ? "change" : "click";
                    q.addEventListener(U, function($) {
                      var C = void 0;
                      if (q.tagName === "SELECT") {
                        if (q.selectedIndex < 0) return;
                        var j = q.options[q.selectedIndex];
                        j.hasAttribute("selected") ? C = !1 : C = j.value || !1;
                      } else
                        q.classList.contains("ql-active") ? C = !1 : C = q.value || !q.hasAttribute("value"), $.preventDefault();
                      R.quill.focus();
                      var S = R.quill.selection.getRange(), P = A(S, 1), L = P[0];
                      if (R.handlers[F] != null)
                        R.handlers[F].call(R, C);
                      else if (h.default.query(F).prototype instanceof h.default.Embed) {
                        if (C = prompt("Enter " + F), !C) return;
                        R.quill.updateContents(new p.default().retain(L.index).delete(L.length).insert(i({}, F, C)), e.default.sources.USER);
                      } else
                        R.quill.format(F, C, e.default.sources.USER);
                      R.update(L);
                    }), this.controls.push([F, q]);
                  }
                }
              }, {
                key: "update",
                value: function(q) {
                  var R = q == null ? {} : this.quill.getFormat(q);
                  this.controls.forEach(function(F) {
                    var U = A(F, 2), $ = U[0], C = U[1];
                    if (C.tagName === "SELECT") {
                      var j = void 0;
                      if (q == null)
                        j = null;
                      else if (R[$] == null)
                        j = C.querySelector("option[selected]");
                      else if (!Array.isArray(R[$])) {
                        var S = R[$];
                        typeof S == "string" && (S = S.replace(/\"/g, '\\"')), j = C.querySelector('option[value="' + S + '"]');
                      }
                      j == null ? (C.value = "", C.selectedIndex = -1) : j.selected = !0;
                    } else if (q == null)
                      C.classList.remove("ql-active");
                    else if (C.hasAttribute("value")) {
                      var P = R[$] === C.getAttribute("value") || R[$] != null && R[$].toString() === C.getAttribute("value") || R[$] == null && !C.getAttribute("value");
                      C.classList.toggle("ql-active", P);
                    } else
                      C.classList.toggle("ql-active", R[$] != null);
                  });
                }
              }]), _;
            }(l.default);
            b.DEFAULTS = {};
            function E(v, _, k) {
              var q = document.createElement("button");
              q.setAttribute("type", "button"), q.classList.add("ql-" + _), k != null && (q.value = k), v.appendChild(q);
            }
            function N(v, _) {
              Array.isArray(_[0]) || (_ = [_]), _.forEach(function(k) {
                var q = document.createElement("span");
                q.classList.add("ql-formats"), k.forEach(function(R) {
                  if (typeof R == "string")
                    E(q, R);
                  else {
                    var F = Object.keys(R)[0], U = R[F];
                    Array.isArray(U) ? O(q, F, U) : E(q, F, U);
                  }
                }), v.appendChild(q);
              });
            }
            function O(v, _, k) {
              var q = document.createElement("select");
              q.classList.add("ql-" + _), k.forEach(function(R) {
                var F = document.createElement("option");
                R !== !1 ? F.setAttribute("value", R) : F.setAttribute("selected", "selected"), q.appendChild(F);
              }), v.appendChild(q);
            }
            b.DEFAULTS = {
              container: null,
              handlers: {
                clean: function() {
                  var _ = this, k = this.quill.getSelection();
                  if (k != null)
                    if (k.length == 0) {
                      var q = this.quill.getFormat();
                      Object.keys(q).forEach(function(R) {
                        h.default.query(R, h.default.Scope.INLINE) != null && _.quill.format(R, !1);
                      });
                    } else
                      this.quill.removeFormat(k, e.default.sources.USER);
                },
                direction: function(_) {
                  var k = this.quill.getFormat().align;
                  _ === "rtl" && k == null ? this.quill.format("align", "right", e.default.sources.USER) : !_ && k === "right" && this.quill.format("align", !1, e.default.sources.USER), this.quill.format("direction", _, e.default.sources.USER);
                },
                indent: function(_) {
                  var k = this.quill.getSelection(), q = this.quill.getFormat(k), R = parseInt(q.indent || 0);
                  if (_ === "+1" || _ === "-1") {
                    var F = _ === "+1" ? 1 : -1;
                    q.direction === "rtl" && (F *= -1), this.quill.format("indent", R + F, e.default.sources.USER);
                  }
                },
                link: function(_) {
                  _ === !0 && (_ = prompt("Enter link URL:")), this.quill.format("link", _, e.default.sources.USER);
                },
                list: function(_) {
                  var k = this.quill.getSelection(), q = this.quill.getFormat(k);
                  _ === "check" ? q.list === "checked" || q.list === "unchecked" ? this.quill.format("list", !1, e.default.sources.USER) : this.quill.format("list", "unchecked", e.default.sources.USER) : this.quill.format("list", _, e.default.sources.USER);
                }
              }
            }, c.default = b, c.addControls = N;
          },
          /* 58 */
          /***/
          function(w, c) {
            w.exports = '<svg viewbox="0 0 18 18"> <polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"></polyline> <polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"></polyline> <line class=ql-stroke x1=10 x2=8 y1=5 y2=13></line> </svg>';
          },
          /* 59 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            });
            var A = /* @__PURE__ */ function() {
              function u(a, l) {
                for (var o = 0; o < l.length; o++) {
                  var i = l[o];
                  i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(a, i.key, i);
                }
              }
              return function(a, l, o) {
                return l && u(a.prototype, l), o && u(a, o), a;
              };
            }(), g = function u(a, l, o) {
              a === null && (a = Function.prototype);
              var i = Object.getOwnPropertyDescriptor(a, l);
              if (i === void 0) {
                var f = Object.getPrototypeOf(a);
                return f === null ? void 0 : u(f, l, o);
              } else {
                if ("value" in i)
                  return i.value;
                var r = i.get;
                return r === void 0 ? void 0 : r.call(o);
              }
            }, m = s(28), p = y(m);
            function y(u) {
              return u && u.__esModule ? u : { default: u };
            }
            function h(u, a) {
              if (!(u instanceof a))
                throw new TypeError("Cannot call a class as a function");
            }
            function n(u, a) {
              if (!u)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return a && (typeof a == "object" || typeof a == "function") ? a : u;
            }
            function e(u, a) {
              if (typeof a != "function" && a !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof a);
              u.prototype = Object.create(a && a.prototype, { constructor: { value: u, enumerable: !1, writable: !0, configurable: !0 } }), a && (Object.setPrototypeOf ? Object.setPrototypeOf(u, a) : u.__proto__ = a);
            }
            var t = function(u) {
              e(a, u);
              function a(l, o) {
                h(this, a);
                var i = n(this, (a.__proto__ || Object.getPrototypeOf(a)).call(this, l));
                return i.label.innerHTML = o, i.container.classList.add("ql-color-picker"), [].slice.call(i.container.querySelectorAll(".ql-picker-item"), 0, 7).forEach(function(f) {
                  f.classList.add("ql-primary");
                }), i;
              }
              return A(a, [{
                key: "buildItem",
                value: function(o) {
                  var i = g(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "buildItem", this).call(this, o);
                  return i.style.backgroundColor = o.getAttribute("value") || "", i;
                }
              }, {
                key: "selectItem",
                value: function(o, i) {
                  g(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "selectItem", this).call(this, o, i);
                  var f = this.label.querySelector(".ql-color-label"), r = o && o.getAttribute("data-value") || "";
                  f && (f.tagName === "line" ? f.style.stroke = r : f.style.fill = r);
                }
              }]), a;
            }(p.default);
            c.default = t;
          },
          /* 60 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            });
            var A = /* @__PURE__ */ function() {
              function u(a, l) {
                for (var o = 0; o < l.length; o++) {
                  var i = l[o];
                  i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(a, i.key, i);
                }
              }
              return function(a, l, o) {
                return l && u(a.prototype, l), o && u(a, o), a;
              };
            }(), g = function u(a, l, o) {
              a === null && (a = Function.prototype);
              var i = Object.getOwnPropertyDescriptor(a, l);
              if (i === void 0) {
                var f = Object.getPrototypeOf(a);
                return f === null ? void 0 : u(f, l, o);
              } else {
                if ("value" in i)
                  return i.value;
                var r = i.get;
                return r === void 0 ? void 0 : r.call(o);
              }
            }, m = s(28), p = y(m);
            function y(u) {
              return u && u.__esModule ? u : { default: u };
            }
            function h(u, a) {
              if (!(u instanceof a))
                throw new TypeError("Cannot call a class as a function");
            }
            function n(u, a) {
              if (!u)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return a && (typeof a == "object" || typeof a == "function") ? a : u;
            }
            function e(u, a) {
              if (typeof a != "function" && a !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof a);
              u.prototype = Object.create(a && a.prototype, { constructor: { value: u, enumerable: !1, writable: !0, configurable: !0 } }), a && (Object.setPrototypeOf ? Object.setPrototypeOf(u, a) : u.__proto__ = a);
            }
            var t = function(u) {
              e(a, u);
              function a(l, o) {
                h(this, a);
                var i = n(this, (a.__proto__ || Object.getPrototypeOf(a)).call(this, l));
                return i.container.classList.add("ql-icon-picker"), [].forEach.call(i.container.querySelectorAll(".ql-picker-item"), function(f) {
                  f.innerHTML = o[f.getAttribute("data-value") || ""];
                }), i.defaultItem = i.container.querySelector(".ql-selected"), i.selectItem(i.defaultItem), i;
              }
              return A(a, [{
                key: "selectItem",
                value: function(o, i) {
                  g(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "selectItem", this).call(this, o, i), o = o || this.defaultItem, this.label.innerHTML = o.innerHTML;
                }
              }]), a;
            }(p.default);
            c.default = t;
          },
          /* 61 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            });
            var A = /* @__PURE__ */ function() {
              function p(y, h) {
                for (var n = 0; n < h.length; n++) {
                  var e = h[n];
                  e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(y, e.key, e);
                }
              }
              return function(y, h, n) {
                return h && p(y.prototype, h), n && p(y, n), y;
              };
            }();
            function g(p, y) {
              if (!(p instanceof y))
                throw new TypeError("Cannot call a class as a function");
            }
            var m = function() {
              function p(y, h) {
                var n = this;
                g(this, p), this.quill = y, this.boundsContainer = h || document.body, this.root = y.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, this.quill.root === this.quill.scrollingContainer && this.quill.root.addEventListener("scroll", function() {
                  n.root.style.marginTop = -1 * n.quill.root.scrollTop + "px";
                }), this.hide();
              }
              return A(p, [{
                key: "hide",
                value: function() {
                  this.root.classList.add("ql-hidden");
                }
              }, {
                key: "position",
                value: function(h) {
                  var n = h.left + h.width / 2 - this.root.offsetWidth / 2, e = h.bottom + this.quill.root.scrollTop;
                  this.root.style.left = n + "px", this.root.style.top = e + "px", this.root.classList.remove("ql-flip");
                  var t = this.boundsContainer.getBoundingClientRect(), u = this.root.getBoundingClientRect(), a = 0;
                  if (u.right > t.right && (a = t.right - u.right, this.root.style.left = n + a + "px"), u.left < t.left && (a = t.left - u.left, this.root.style.left = n + a + "px"), u.bottom > t.bottom) {
                    var l = u.bottom - u.top, o = h.bottom - h.top + l;
                    this.root.style.top = e - o + "px", this.root.classList.add("ql-flip");
                  }
                  return a;
                }
              }, {
                key: "show",
                value: function() {
                  this.root.classList.remove("ql-editing"), this.root.classList.remove("ql-hidden");
                }
              }]), p;
            }();
            c.default = m;
          },
          /* 62 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            });
            var A = /* @__PURE__ */ function() {
              function O(v, _) {
                var k = [], q = !0, R = !1, F = void 0;
                try {
                  for (var U = v[Symbol.iterator](), $; !(q = ($ = U.next()).done) && (k.push($.value), !(_ && k.length === _)); q = !0)
                    ;
                } catch (C) {
                  R = !0, F = C;
                } finally {
                  try {
                    !q && U.return && U.return();
                  } finally {
                    if (R) throw F;
                  }
                }
                return k;
              }
              return function(v, _) {
                if (Array.isArray(v))
                  return v;
                if (Symbol.iterator in Object(v))
                  return O(v, _);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
              };
            }(), g = function O(v, _, k) {
              v === null && (v = Function.prototype);
              var q = Object.getOwnPropertyDescriptor(v, _);
              if (q === void 0) {
                var R = Object.getPrototypeOf(v);
                return R === null ? void 0 : O(R, _, k);
              } else {
                if ("value" in q)
                  return q.value;
                var F = q.get;
                return F === void 0 ? void 0 : F.call(k);
              }
            }, m = /* @__PURE__ */ function() {
              function O(v, _) {
                for (var k = 0; k < _.length; k++) {
                  var q = _[k];
                  q.enumerable = q.enumerable || !1, q.configurable = !0, "value" in q && (q.writable = !0), Object.defineProperty(v, q.key, q);
                }
              }
              return function(v, _, k) {
                return _ && O(v.prototype, _), k && O(v, k), v;
              };
            }(), p = s(3), y = f(p), h = s(8), n = f(h), e = s(43), t = f(e), u = s(27), a = f(u), l = s(15), o = s(41), i = f(o);
            function f(O) {
              return O && O.__esModule ? O : { default: O };
            }
            function r(O, v) {
              if (!(O instanceof v))
                throw new TypeError("Cannot call a class as a function");
            }
            function d(O, v) {
              if (!O)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return v && (typeof v == "object" || typeof v == "function") ? v : O;
            }
            function T(O, v) {
              if (typeof v != "function" && v !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof v);
              O.prototype = Object.create(v && v.prototype, { constructor: { value: O, enumerable: !1, writable: !0, configurable: !0 } }), v && (Object.setPrototypeOf ? Object.setPrototypeOf(O, v) : O.__proto__ = v);
            }
            var b = [[{ header: ["1", "2", "3", !1] }], ["bold", "italic", "underline", "link"], [{ list: "ordered" }, { list: "bullet" }], ["clean"]], E = function(O) {
              T(v, O);
              function v(_, k) {
                r(this, v), k.modules.toolbar != null && k.modules.toolbar.container == null && (k.modules.toolbar.container = b);
                var q = d(this, (v.__proto__ || Object.getPrototypeOf(v)).call(this, _, k));
                return q.quill.container.classList.add("ql-snow"), q;
              }
              return m(v, [{
                key: "extendToolbar",
                value: function(k) {
                  k.container.classList.add("ql-snow"), this.buildButtons([].slice.call(k.container.querySelectorAll("button")), i.default), this.buildPickers([].slice.call(k.container.querySelectorAll("select")), i.default), this.tooltip = new N(this.quill, this.options.bounds), k.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({ key: "K", shortKey: !0 }, function(q, R) {
                    k.handlers.link.call(k, !R.format.link);
                  });
                }
              }]), v;
            }(t.default);
            E.DEFAULTS = (0, y.default)(!0, {}, t.default.DEFAULTS, {
              modules: {
                toolbar: {
                  handlers: {
                    link: function(v) {
                      if (v) {
                        var _ = this.quill.getSelection();
                        if (_ == null || _.length == 0) return;
                        var k = this.quill.getText(_);
                        /^\S+@\S+\.\S+$/.test(k) && k.indexOf("mailto:") !== 0 && (k = "mailto:" + k);
                        var q = this.quill.theme.tooltip;
                        q.edit("link", k);
                      } else
                        this.quill.format("link", !1);
                    }
                  }
                }
              }
            });
            var N = function(O) {
              T(v, O);
              function v(_, k) {
                r(this, v);
                var q = d(this, (v.__proto__ || Object.getPrototypeOf(v)).call(this, _, k));
                return q.preview = q.root.querySelector("a.ql-preview"), q;
              }
              return m(v, [{
                key: "listen",
                value: function() {
                  var k = this;
                  g(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "listen", this).call(this), this.root.querySelector("a.ql-action").addEventListener("click", function(q) {
                    k.root.classList.contains("ql-editing") ? k.save() : k.edit("link", k.preview.textContent), q.preventDefault();
                  }), this.root.querySelector("a.ql-remove").addEventListener("click", function(q) {
                    if (k.linkRange != null) {
                      var R = k.linkRange;
                      k.restoreFocus(), k.quill.formatText(R, "link", !1, n.default.sources.USER), delete k.linkRange;
                    }
                    q.preventDefault(), k.hide();
                  }), this.quill.on(n.default.events.SELECTION_CHANGE, function(q, R, F) {
                    if (q != null) {
                      if (q.length === 0 && F === n.default.sources.USER) {
                        var U = k.quill.scroll.descendant(a.default, q.index), $ = A(U, 2), C = $[0], j = $[1];
                        if (C != null) {
                          k.linkRange = new l.Range(q.index - j, C.length());
                          var S = a.default.formats(C.domNode);
                          k.preview.textContent = S, k.preview.setAttribute("href", S), k.show(), k.position(k.quill.getBounds(k.linkRange));
                          return;
                        }
                      } else
                        delete k.linkRange;
                      k.hide();
                    }
                  });
                }
              }, {
                key: "show",
                value: function() {
                  g(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "show", this).call(this), this.root.removeAttribute("data-mode");
                }
              }]), v;
            }(e.BaseTooltip);
            N.TEMPLATE = ['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join(""), c.default = E;
          },
          /* 63 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            });
            var A = s(29), g = Z(A), m = s(36), p = s(38), y = s(64), h = s(65), n = Z(h), e = s(66), t = Z(e), u = s(67), a = Z(u), l = s(37), o = s(26), i = s(39), f = s(40), r = s(56), d = Z(r), T = s(68), b = Z(T), E = s(27), N = Z(E), O = s(69), v = Z(O), _ = s(70), k = Z(_), q = s(71), R = Z(q), F = s(72), U = Z(F), $ = s(73), C = Z($), j = s(13), S = Z(j), P = s(74), L = Z(P), H = s(75), B = Z(H), x = s(57), D = Z(x), K = s(41), z = Z(K), W = s(28), Q = Z(W), J = s(59), ee = Z(J), ie = s(60), oe = Z(ie), se = s(61), ue = Z(se), G = s(108), V = Z(G), Y = s(62), X = Z(Y);
            function Z(te) {
              return te && te.__esModule ? te : { default: te };
            }
            g.default.register({
              "attributors/attribute/direction": p.DirectionAttribute,
              "attributors/class/align": m.AlignClass,
              "attributors/class/background": l.BackgroundClass,
              "attributors/class/color": o.ColorClass,
              "attributors/class/direction": p.DirectionClass,
              "attributors/class/font": i.FontClass,
              "attributors/class/size": f.SizeClass,
              "attributors/style/align": m.AlignStyle,
              "attributors/style/background": l.BackgroundStyle,
              "attributors/style/color": o.ColorStyle,
              "attributors/style/direction": p.DirectionStyle,
              "attributors/style/font": i.FontStyle,
              "attributors/style/size": f.SizeStyle
            }, !0), g.default.register({
              "formats/align": m.AlignClass,
              "formats/direction": p.DirectionClass,
              "formats/indent": y.IndentClass,
              "formats/background": l.BackgroundStyle,
              "formats/color": o.ColorStyle,
              "formats/font": i.FontClass,
              "formats/size": f.SizeClass,
              "formats/blockquote": n.default,
              "formats/code-block": S.default,
              "formats/header": t.default,
              "formats/list": a.default,
              "formats/bold": d.default,
              "formats/code": j.Code,
              "formats/italic": b.default,
              "formats/link": N.default,
              "formats/script": v.default,
              "formats/strike": k.default,
              "formats/underline": R.default,
              "formats/image": U.default,
              "formats/video": C.default,
              "formats/list/item": u.ListItem,
              "modules/formula": L.default,
              "modules/syntax": B.default,
              "modules/toolbar": D.default,
              "themes/bubble": V.default,
              "themes/snow": X.default,
              "ui/icons": z.default,
              "ui/picker": Q.default,
              "ui/icon-picker": oe.default,
              "ui/color-picker": ee.default,
              "ui/tooltip": ue.default
            }, !0), c.default = g.default;
          },
          /* 64 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            }), c.IndentClass = void 0;
            var A = /* @__PURE__ */ function() {
              function a(l, o) {
                for (var i = 0; i < o.length; i++) {
                  var f = o[i];
                  f.enumerable = f.enumerable || !1, f.configurable = !0, "value" in f && (f.writable = !0), Object.defineProperty(l, f.key, f);
                }
              }
              return function(l, o, i) {
                return o && a(l.prototype, o), i && a(l, i), l;
              };
            }(), g = function a(l, o, i) {
              l === null && (l = Function.prototype);
              var f = Object.getOwnPropertyDescriptor(l, o);
              if (f === void 0) {
                var r = Object.getPrototypeOf(l);
                return r === null ? void 0 : a(r, o, i);
              } else {
                if ("value" in f)
                  return f.value;
                var d = f.get;
                return d === void 0 ? void 0 : d.call(i);
              }
            }, m = s(0), p = y(m);
            function y(a) {
              return a && a.__esModule ? a : { default: a };
            }
            function h(a, l) {
              if (!(a instanceof l))
                throw new TypeError("Cannot call a class as a function");
            }
            function n(a, l) {
              if (!a)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return l && (typeof l == "object" || typeof l == "function") ? l : a;
            }
            function e(a, l) {
              if (typeof l != "function" && l !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof l);
              a.prototype = Object.create(l && l.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), l && (Object.setPrototypeOf ? Object.setPrototypeOf(a, l) : a.__proto__ = l);
            }
            var t = function(a) {
              e(l, a);
              function l() {
                return h(this, l), n(this, (l.__proto__ || Object.getPrototypeOf(l)).apply(this, arguments));
              }
              return A(l, [{
                key: "add",
                value: function(i, f) {
                  if (f === "+1" || f === "-1") {
                    var r = this.value(i) || 0;
                    f = f === "+1" ? r + 1 : r - 1;
                  }
                  return f === 0 ? (this.remove(i), !0) : g(l.prototype.__proto__ || Object.getPrototypeOf(l.prototype), "add", this).call(this, i, f);
                }
              }, {
                key: "canAdd",
                value: function(i, f) {
                  return g(l.prototype.__proto__ || Object.getPrototypeOf(l.prototype), "canAdd", this).call(this, i, f) || g(l.prototype.__proto__ || Object.getPrototypeOf(l.prototype), "canAdd", this).call(this, i, parseInt(f));
                }
              }, {
                key: "value",
                value: function(i) {
                  return parseInt(g(l.prototype.__proto__ || Object.getPrototypeOf(l.prototype), "value", this).call(this, i)) || void 0;
                }
              }]), l;
            }(p.default.Attributor.Class), u = new t("indent", "ql-indent", {
              scope: p.default.Scope.BLOCK,
              whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
            });
            c.IndentClass = u;
          },
          /* 65 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            });
            var A = s(4), g = m(A);
            function m(e) {
              return e && e.__esModule ? e : { default: e };
            }
            function p(e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            }
            function y(e, t) {
              if (!e)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return t && (typeof t == "object" || typeof t == "function") ? t : e;
            }
            function h(e, t) {
              if (typeof t != "function" && t !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof t);
              e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
            }
            var n = function(e) {
              h(t, e);
              function t() {
                return p(this, t), y(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
              }
              return t;
            }(g.default);
            n.blotName = "blockquote", n.tagName = "blockquote", c.default = n;
          },
          /* 66 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            });
            var A = /* @__PURE__ */ function() {
              function t(u, a) {
                for (var l = 0; l < a.length; l++) {
                  var o = a[l];
                  o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(u, o.key, o);
                }
              }
              return function(u, a, l) {
                return a && t(u.prototype, a), l && t(u, l), u;
              };
            }(), g = s(4), m = p(g);
            function p(t) {
              return t && t.__esModule ? t : { default: t };
            }
            function y(t, u) {
              if (!(t instanceof u))
                throw new TypeError("Cannot call a class as a function");
            }
            function h(t, u) {
              if (!t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return u && (typeof u == "object" || typeof u == "function") ? u : t;
            }
            function n(t, u) {
              if (typeof u != "function" && u !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof u);
              t.prototype = Object.create(u && u.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), u && (Object.setPrototypeOf ? Object.setPrototypeOf(t, u) : t.__proto__ = u);
            }
            var e = function(t) {
              n(u, t);
              function u() {
                return y(this, u), h(this, (u.__proto__ || Object.getPrototypeOf(u)).apply(this, arguments));
              }
              return A(u, null, [{
                key: "formats",
                value: function(l) {
                  return this.tagName.indexOf(l.tagName) + 1;
                }
              }]), u;
            }(m.default);
            e.blotName = "header", e.tagName = ["H1", "H2", "H3", "H4", "H5", "H6"], c.default = e;
          },
          /* 67 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            }), c.default = c.ListItem = void 0;
            var A = /* @__PURE__ */ function() {
              function r(d, T) {
                for (var b = 0; b < T.length; b++) {
                  var E = T[b];
                  E.enumerable = E.enumerable || !1, E.configurable = !0, "value" in E && (E.writable = !0), Object.defineProperty(d, E.key, E);
                }
              }
              return function(d, T, b) {
                return T && r(d.prototype, T), b && r(d, b), d;
              };
            }(), g = function r(d, T, b) {
              d === null && (d = Function.prototype);
              var E = Object.getOwnPropertyDescriptor(d, T);
              if (E === void 0) {
                var N = Object.getPrototypeOf(d);
                return N === null ? void 0 : r(N, T, b);
              } else {
                if ("value" in E)
                  return E.value;
                var O = E.get;
                return O === void 0 ? void 0 : O.call(b);
              }
            }, m = s(0), p = t(m), y = s(4), h = t(y), n = s(25), e = t(n);
            function t(r) {
              return r && r.__esModule ? r : { default: r };
            }
            function u(r, d, T) {
              return d in r ? Object.defineProperty(r, d, { value: T, enumerable: !0, configurable: !0, writable: !0 }) : r[d] = T, r;
            }
            function a(r, d) {
              if (!(r instanceof d))
                throw new TypeError("Cannot call a class as a function");
            }
            function l(r, d) {
              if (!r)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return d && (typeof d == "object" || typeof d == "function") ? d : r;
            }
            function o(r, d) {
              if (typeof d != "function" && d !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof d);
              r.prototype = Object.create(d && d.prototype, { constructor: { value: r, enumerable: !1, writable: !0, configurable: !0 } }), d && (Object.setPrototypeOf ? Object.setPrototypeOf(r, d) : r.__proto__ = d);
            }
            var i = function(r) {
              o(d, r);
              function d() {
                return a(this, d), l(this, (d.__proto__ || Object.getPrototypeOf(d)).apply(this, arguments));
              }
              return A(d, [{
                key: "format",
                value: function(b, E) {
                  b === f.blotName && !E ? this.replaceWith(p.default.create(this.statics.scope)) : g(d.prototype.__proto__ || Object.getPrototypeOf(d.prototype), "format", this).call(this, b, E);
                }
              }, {
                key: "remove",
                value: function() {
                  this.prev == null && this.next == null ? this.parent.remove() : g(d.prototype.__proto__ || Object.getPrototypeOf(d.prototype), "remove", this).call(this);
                }
              }, {
                key: "replaceWith",
                value: function(b, E) {
                  return this.parent.isolate(this.offset(this.parent), this.length()), b === this.parent.statics.blotName ? (this.parent.replaceWith(b, E), this) : (this.parent.unwrap(), g(d.prototype.__proto__ || Object.getPrototypeOf(d.prototype), "replaceWith", this).call(this, b, E));
                }
              }], [{
                key: "formats",
                value: function(b) {
                  return b.tagName === this.tagName ? void 0 : g(d.__proto__ || Object.getPrototypeOf(d), "formats", this).call(this, b);
                }
              }]), d;
            }(h.default);
            i.blotName = "list-item", i.tagName = "LI";
            var f = function(r) {
              o(d, r), A(d, null, [{
                key: "create",
                value: function(b) {
                  var E = b === "ordered" ? "OL" : "UL", N = g(d.__proto__ || Object.getPrototypeOf(d), "create", this).call(this, E);
                  return (b === "checked" || b === "unchecked") && N.setAttribute("data-checked", b === "checked"), N;
                }
              }, {
                key: "formats",
                value: function(b) {
                  if (b.tagName === "OL") return "ordered";
                  if (b.tagName === "UL")
                    return b.hasAttribute("data-checked") ? b.getAttribute("data-checked") === "true" ? "checked" : "unchecked" : "bullet";
                }
              }]);
              function d(T) {
                a(this, d);
                var b = l(this, (d.__proto__ || Object.getPrototypeOf(d)).call(this, T)), E = function(O) {
                  if (O.target.parentNode === T) {
                    var v = b.statics.formats(T), _ = p.default.find(O.target);
                    v === "checked" ? _.format("list", "unchecked") : v === "unchecked" && _.format("list", "checked");
                  }
                };
                return T.addEventListener("touchstart", E), T.addEventListener("mousedown", E), b;
              }
              return A(d, [{
                key: "format",
                value: function(b, E) {
                  this.children.length > 0 && this.children.tail.format(b, E);
                }
              }, {
                key: "formats",
                value: function() {
                  return u({}, this.statics.blotName, this.statics.formats(this.domNode));
                }
              }, {
                key: "insertBefore",
                value: function(b, E) {
                  if (b instanceof i)
                    g(d.prototype.__proto__ || Object.getPrototypeOf(d.prototype), "insertBefore", this).call(this, b, E);
                  else {
                    var N = E == null ? this.length() : E.offset(this), O = this.split(N);
                    O.parent.insertBefore(b, O);
                  }
                }
              }, {
                key: "optimize",
                value: function(b) {
                  g(d.prototype.__proto__ || Object.getPrototypeOf(d.prototype), "optimize", this).call(this, b);
                  var E = this.next;
                  E != null && E.prev === this && E.statics.blotName === this.statics.blotName && E.domNode.tagName === this.domNode.tagName && E.domNode.getAttribute("data-checked") === this.domNode.getAttribute("data-checked") && (E.moveChildren(this), E.remove());
                }
              }, {
                key: "replace",
                value: function(b) {
                  if (b.statics.blotName !== this.statics.blotName) {
                    var E = p.default.create(this.statics.defaultChild);
                    b.moveChildren(E), this.appendChild(E);
                  }
                  g(d.prototype.__proto__ || Object.getPrototypeOf(d.prototype), "replace", this).call(this, b);
                }
              }]), d;
            }(e.default);
            f.blotName = "list", f.scope = p.default.Scope.BLOCK_BLOT, f.tagName = ["OL", "UL"], f.defaultChild = "list-item", f.allowedChildren = [i], c.ListItem = i, c.default = f;
          },
          /* 68 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            });
            var A = s(56), g = m(A);
            function m(e) {
              return e && e.__esModule ? e : { default: e };
            }
            function p(e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            }
            function y(e, t) {
              if (!e)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return t && (typeof t == "object" || typeof t == "function") ? t : e;
            }
            function h(e, t) {
              if (typeof t != "function" && t !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof t);
              e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
            }
            var n = function(e) {
              h(t, e);
              function t() {
                return p(this, t), y(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
              }
              return t;
            }(g.default);
            n.blotName = "italic", n.tagName = ["EM", "I"], c.default = n;
          },
          /* 69 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            });
            var A = /* @__PURE__ */ function() {
              function u(a, l) {
                for (var o = 0; o < l.length; o++) {
                  var i = l[o];
                  i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(a, i.key, i);
                }
              }
              return function(a, l, o) {
                return l && u(a.prototype, l), o && u(a, o), a;
              };
            }(), g = function u(a, l, o) {
              a === null && (a = Function.prototype);
              var i = Object.getOwnPropertyDescriptor(a, l);
              if (i === void 0) {
                var f = Object.getPrototypeOf(a);
                return f === null ? void 0 : u(f, l, o);
              } else {
                if ("value" in i)
                  return i.value;
                var r = i.get;
                return r === void 0 ? void 0 : r.call(o);
              }
            }, m = s(6), p = y(m);
            function y(u) {
              return u && u.__esModule ? u : { default: u };
            }
            function h(u, a) {
              if (!(u instanceof a))
                throw new TypeError("Cannot call a class as a function");
            }
            function n(u, a) {
              if (!u)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return a && (typeof a == "object" || typeof a == "function") ? a : u;
            }
            function e(u, a) {
              if (typeof a != "function" && a !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof a);
              u.prototype = Object.create(a && a.prototype, { constructor: { value: u, enumerable: !1, writable: !0, configurable: !0 } }), a && (Object.setPrototypeOf ? Object.setPrototypeOf(u, a) : u.__proto__ = a);
            }
            var t = function(u) {
              e(a, u);
              function a() {
                return h(this, a), n(this, (a.__proto__ || Object.getPrototypeOf(a)).apply(this, arguments));
              }
              return A(a, null, [{
                key: "create",
                value: function(o) {
                  return o === "super" ? document.createElement("sup") : o === "sub" ? document.createElement("sub") : g(a.__proto__ || Object.getPrototypeOf(a), "create", this).call(this, o);
                }
              }, {
                key: "formats",
                value: function(o) {
                  if (o.tagName === "SUB") return "sub";
                  if (o.tagName === "SUP") return "super";
                }
              }]), a;
            }(p.default);
            t.blotName = "script", t.tagName = ["SUB", "SUP"], c.default = t;
          },
          /* 70 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            });
            var A = s(6), g = m(A);
            function m(e) {
              return e && e.__esModule ? e : { default: e };
            }
            function p(e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            }
            function y(e, t) {
              if (!e)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return t && (typeof t == "object" || typeof t == "function") ? t : e;
            }
            function h(e, t) {
              if (typeof t != "function" && t !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof t);
              e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
            }
            var n = function(e) {
              h(t, e);
              function t() {
                return p(this, t), y(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
              }
              return t;
            }(g.default);
            n.blotName = "strike", n.tagName = "S", c.default = n;
          },
          /* 71 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            });
            var A = s(6), g = m(A);
            function m(e) {
              return e && e.__esModule ? e : { default: e };
            }
            function p(e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            }
            function y(e, t) {
              if (!e)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return t && (typeof t == "object" || typeof t == "function") ? t : e;
            }
            function h(e, t) {
              if (typeof t != "function" && t !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof t);
              e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
            }
            var n = function(e) {
              h(t, e);
              function t() {
                return p(this, t), y(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
              }
              return t;
            }(g.default);
            n.blotName = "underline", n.tagName = "U", c.default = n;
          },
          /* 72 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            });
            var A = /* @__PURE__ */ function() {
              function l(o, i) {
                for (var f = 0; f < i.length; f++) {
                  var r = i[f];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(o, r.key, r);
                }
              }
              return function(o, i, f) {
                return i && l(o.prototype, i), f && l(o, f), o;
              };
            }(), g = function l(o, i, f) {
              o === null && (o = Function.prototype);
              var r = Object.getOwnPropertyDescriptor(o, i);
              if (r === void 0) {
                var d = Object.getPrototypeOf(o);
                return d === null ? void 0 : l(d, i, f);
              } else {
                if ("value" in r)
                  return r.value;
                var T = r.get;
                return T === void 0 ? void 0 : T.call(f);
              }
            }, m = s(0), p = h(m), y = s(27);
            function h(l) {
              return l && l.__esModule ? l : { default: l };
            }
            function n(l, o) {
              if (!(l instanceof o))
                throw new TypeError("Cannot call a class as a function");
            }
            function e(l, o) {
              if (!l)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return o && (typeof o == "object" || typeof o == "function") ? o : l;
            }
            function t(l, o) {
              if (typeof o != "function" && o !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof o);
              l.prototype = Object.create(o && o.prototype, { constructor: { value: l, enumerable: !1, writable: !0, configurable: !0 } }), o && (Object.setPrototypeOf ? Object.setPrototypeOf(l, o) : l.__proto__ = o);
            }
            var u = ["alt", "height", "width"], a = function(l) {
              t(o, l);
              function o() {
                return n(this, o), e(this, (o.__proto__ || Object.getPrototypeOf(o)).apply(this, arguments));
              }
              return A(o, [{
                key: "format",
                value: function(f, r) {
                  u.indexOf(f) > -1 ? r ? this.domNode.setAttribute(f, r) : this.domNode.removeAttribute(f) : g(o.prototype.__proto__ || Object.getPrototypeOf(o.prototype), "format", this).call(this, f, r);
                }
              }], [{
                key: "create",
                value: function(f) {
                  var r = g(o.__proto__ || Object.getPrototypeOf(o), "create", this).call(this, f);
                  return typeof f == "string" && r.setAttribute("src", this.sanitize(f)), r;
                }
              }, {
                key: "formats",
                value: function(f) {
                  return u.reduce(function(r, d) {
                    return f.hasAttribute(d) && (r[d] = f.getAttribute(d)), r;
                  }, {});
                }
              }, {
                key: "match",
                value: function(f) {
                  return /\.(jpe?g|gif|png)$/.test(f) || /^data:image\/.+;base64/.test(f);
                }
              }, {
                key: "sanitize",
                value: function(f) {
                  return (0, y.sanitize)(f, ["http", "https", "data"]) ? f : "//:0";
                }
              }, {
                key: "value",
                value: function(f) {
                  return f.getAttribute("src");
                }
              }]), o;
            }(p.default.Embed);
            a.blotName = "image", a.tagName = "IMG", c.default = a;
          },
          /* 73 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            });
            var A = /* @__PURE__ */ function() {
              function l(o, i) {
                for (var f = 0; f < i.length; f++) {
                  var r = i[f];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(o, r.key, r);
                }
              }
              return function(o, i, f) {
                return i && l(o.prototype, i), f && l(o, f), o;
              };
            }(), g = function l(o, i, f) {
              o === null && (o = Function.prototype);
              var r = Object.getOwnPropertyDescriptor(o, i);
              if (r === void 0) {
                var d = Object.getPrototypeOf(o);
                return d === null ? void 0 : l(d, i, f);
              } else {
                if ("value" in r)
                  return r.value;
                var T = r.get;
                return T === void 0 ? void 0 : T.call(f);
              }
            }, m = s(4), p = s(27), y = h(p);
            function h(l) {
              return l && l.__esModule ? l : { default: l };
            }
            function n(l, o) {
              if (!(l instanceof o))
                throw new TypeError("Cannot call a class as a function");
            }
            function e(l, o) {
              if (!l)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return o && (typeof o == "object" || typeof o == "function") ? o : l;
            }
            function t(l, o) {
              if (typeof o != "function" && o !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof o);
              l.prototype = Object.create(o && o.prototype, { constructor: { value: l, enumerable: !1, writable: !0, configurable: !0 } }), o && (Object.setPrototypeOf ? Object.setPrototypeOf(l, o) : l.__proto__ = o);
            }
            var u = ["height", "width"], a = function(l) {
              t(o, l);
              function o() {
                return n(this, o), e(this, (o.__proto__ || Object.getPrototypeOf(o)).apply(this, arguments));
              }
              return A(o, [{
                key: "format",
                value: function(f, r) {
                  u.indexOf(f) > -1 ? r ? this.domNode.setAttribute(f, r) : this.domNode.removeAttribute(f) : g(o.prototype.__proto__ || Object.getPrototypeOf(o.prototype), "format", this).call(this, f, r);
                }
              }], [{
                key: "create",
                value: function(f) {
                  var r = g(o.__proto__ || Object.getPrototypeOf(o), "create", this).call(this, f);
                  return r.setAttribute("frameborder", "0"), r.setAttribute("allowfullscreen", !0), r.setAttribute("src", this.sanitize(f)), r;
                }
              }, {
                key: "formats",
                value: function(f) {
                  return u.reduce(function(r, d) {
                    return f.hasAttribute(d) && (r[d] = f.getAttribute(d)), r;
                  }, {});
                }
              }, {
                key: "sanitize",
                value: function(f) {
                  return y.default.sanitize(f);
                }
              }, {
                key: "value",
                value: function(f) {
                  return f.getAttribute("src");
                }
              }]), o;
            }(m.BlockEmbed);
            a.blotName = "video", a.className = "ql-video", a.tagName = "IFRAME", c.default = a;
          },
          /* 74 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            }), c.default = c.FormulaBlot = void 0;
            var A = /* @__PURE__ */ function() {
              function f(r, d) {
                for (var T = 0; T < d.length; T++) {
                  var b = d[T];
                  b.enumerable = b.enumerable || !1, b.configurable = !0, "value" in b && (b.writable = !0), Object.defineProperty(r, b.key, b);
                }
              }
              return function(r, d, T) {
                return d && f(r.prototype, d), T && f(r, T), r;
              };
            }(), g = function f(r, d, T) {
              r === null && (r = Function.prototype);
              var b = Object.getOwnPropertyDescriptor(r, d);
              if (b === void 0) {
                var E = Object.getPrototypeOf(r);
                return E === null ? void 0 : f(E, d, T);
              } else {
                if ("value" in b)
                  return b.value;
                var N = b.get;
                return N === void 0 ? void 0 : N.call(T);
              }
            }, m = s(35), p = t(m), y = s(5), h = t(y), n = s(9), e = t(n);
            function t(f) {
              return f && f.__esModule ? f : { default: f };
            }
            function u(f, r) {
              if (!(f instanceof r))
                throw new TypeError("Cannot call a class as a function");
            }
            function a(f, r) {
              if (!f)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return r && (typeof r == "object" || typeof r == "function") ? r : f;
            }
            function l(f, r) {
              if (typeof r != "function" && r !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof r);
              f.prototype = Object.create(r && r.prototype, { constructor: { value: f, enumerable: !1, writable: !0, configurable: !0 } }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(f, r) : f.__proto__ = r);
            }
            var o = function(f) {
              l(r, f);
              function r() {
                return u(this, r), a(this, (r.__proto__ || Object.getPrototypeOf(r)).apply(this, arguments));
              }
              return A(r, null, [{
                key: "create",
                value: function(T) {
                  var b = g(r.__proto__ || Object.getPrototypeOf(r), "create", this).call(this, T);
                  return typeof T == "string" && (window.katex.render(T, b, {
                    throwOnError: !1,
                    errorColor: "#f00"
                  }), b.setAttribute("data-value", T)), b;
                }
              }, {
                key: "value",
                value: function(T) {
                  return T.getAttribute("data-value");
                }
              }]), r;
            }(p.default);
            o.blotName = "formula", o.className = "ql-formula", o.tagName = "SPAN";
            var i = function(f) {
              l(r, f), A(r, null, [{
                key: "register",
                value: function() {
                  h.default.register(o, !0);
                }
              }]);
              function r() {
                u(this, r);
                var d = a(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this));
                if (window.katex == null)
                  throw new Error("Formula module requires KaTeX.");
                return d;
              }
              return r;
            }(e.default);
            c.FormulaBlot = o, c.default = i;
          },
          /* 75 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            }), c.default = c.CodeToken = c.CodeBlock = void 0;
            var A = /* @__PURE__ */ function() {
              function T(b, E) {
                for (var N = 0; N < E.length; N++) {
                  var O = E[N];
                  O.enumerable = O.enumerable || !1, O.configurable = !0, "value" in O && (O.writable = !0), Object.defineProperty(b, O.key, O);
                }
              }
              return function(b, E, N) {
                return E && T(b.prototype, E), N && T(b, N), b;
              };
            }(), g = function T(b, E, N) {
              b === null && (b = Function.prototype);
              var O = Object.getOwnPropertyDescriptor(b, E);
              if (O === void 0) {
                var v = Object.getPrototypeOf(b);
                return v === null ? void 0 : T(v, E, N);
              } else {
                if ("value" in O)
                  return O.value;
                var _ = O.get;
                return _ === void 0 ? void 0 : _.call(N);
              }
            }, m = s(0), p = a(m), y = s(5), h = a(y), n = s(9), e = a(n), t = s(13), u = a(t);
            function a(T) {
              return T && T.__esModule ? T : { default: T };
            }
            function l(T, b) {
              if (!(T instanceof b))
                throw new TypeError("Cannot call a class as a function");
            }
            function o(T, b) {
              if (!T)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return b && (typeof b == "object" || typeof b == "function") ? b : T;
            }
            function i(T, b) {
              if (typeof b != "function" && b !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof b);
              T.prototype = Object.create(b && b.prototype, { constructor: { value: T, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(T, b) : T.__proto__ = b);
            }
            var f = function(T) {
              i(b, T);
              function b() {
                return l(this, b), o(this, (b.__proto__ || Object.getPrototypeOf(b)).apply(this, arguments));
              }
              return A(b, [{
                key: "replaceWith",
                value: function(N) {
                  this.domNode.textContent = this.domNode.textContent, this.attach(), g(b.prototype.__proto__ || Object.getPrototypeOf(b.prototype), "replaceWith", this).call(this, N);
                }
              }, {
                key: "highlight",
                value: function(N) {
                  var O = this.domNode.textContent;
                  this.cachedText !== O && ((O.trim().length > 0 || this.cachedText == null) && (this.domNode.innerHTML = N(O), this.domNode.normalize(), this.attach()), this.cachedText = O);
                }
              }]), b;
            }(u.default);
            f.className = "ql-syntax";
            var r = new p.default.Attributor.Class("token", "hljs", {
              scope: p.default.Scope.INLINE
            }), d = function(T) {
              i(b, T), A(b, null, [{
                key: "register",
                value: function() {
                  h.default.register(r, !0), h.default.register(f, !0);
                }
              }]);
              function b(E, N) {
                l(this, b);
                var O = o(this, (b.__proto__ || Object.getPrototypeOf(b)).call(this, E, N));
                if (typeof O.options.highlight != "function")
                  throw new Error("Syntax module requires highlight.js. Please include the library on the page before Quill.");
                var v = null;
                return O.quill.on(h.default.events.SCROLL_OPTIMIZE, function() {
                  clearTimeout(v), v = setTimeout(function() {
                    O.highlight(), v = null;
                  }, O.options.interval);
                }), O.highlight(), O;
              }
              return A(b, [{
                key: "highlight",
                value: function() {
                  var N = this;
                  if (!this.quill.selection.composing) {
                    this.quill.update(h.default.sources.USER);
                    var O = this.quill.getSelection();
                    this.quill.scroll.descendants(f).forEach(function(v) {
                      v.highlight(N.options.highlight);
                    }), this.quill.update(h.default.sources.SILENT), O != null && this.quill.setSelection(O, h.default.sources.SILENT);
                  }
                }
              }]), b;
            }(e.default);
            d.DEFAULTS = {
              highlight: function() {
                return window.hljs == null ? null : function(T) {
                  var b = window.hljs.highlightAuto(T);
                  return b.value;
                };
              }(),
              interval: 1e3
            }, c.CodeBlock = f, c.CodeToken = r, c.default = d;
          },
          /* 76 */
          /***/
          function(w, c) {
            w.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=13 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=9 y1=4 y2=4></line> </svg>';
          },
          /* 77 */
          /***/
          function(w, c) {
            w.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=14 x2=4 y1=14 y2=14></line> <line class=ql-stroke x1=12 x2=6 y1=4 y2=4></line> </svg>';
          },
          /* 78 */
          /***/
          function(w, c) {
            w.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=5 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=9 y1=4 y2=4></line> </svg>';
          },
          /* 79 */
          /***/
          function(w, c) {
            w.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=3 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=3 y1=4 y2=4></line> </svg>';
          },
          /* 80 */
          /***/
          function(w, c) {
            w.exports = '<svg viewbox="0 0 18 18"> <g class="ql-fill ql-color-label"> <polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"></polygon> <rect height=1 width=1 x=4 y=4></rect> <polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"></polygon> <rect height=1 width=1 x=2 y=6></rect> <rect height=1 width=1 x=3 y=5></rect> <rect height=1 width=1 x=4 y=7></rect> <polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"></polygon> <rect height=1 width=1 x=2 y=12></rect> <rect height=1 width=1 x=2 y=9></rect> <rect height=1 width=1 x=2 y=15></rect> <polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"></polygon> <rect height=1 width=1 x=3 y=8></rect> <path d=M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z></path> <path d=M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z></path> <path d=M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z></path> <rect height=1 width=1 x=12 y=2></rect> <rect height=1 width=1 x=11 y=3></rect> <path d=M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z></path> <rect height=1 width=1 x=2 y=3></rect> <rect height=1 width=1 x=6 y=2></rect> <rect height=1 width=1 x=3 y=2></rect> <rect height=1 width=1 x=5 y=3></rect> <rect height=1 width=1 x=9 y=2></rect> <rect height=1 width=1 x=15 y=14></rect> <polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"></polygon> <rect height=1 width=1 x=13 y=7></rect> <rect height=1 width=1 x=15 y=5></rect> <rect height=1 width=1 x=14 y=6></rect> <rect height=1 width=1 x=15 y=8></rect> <rect height=1 width=1 x=14 y=9></rect> <path d=M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z></path> <rect height=1 width=1 x=14 y=3></rect> <polygon points="12 6.868 12 6 11.62 6 12 6.868"></polygon> <rect height=1 width=1 x=15 y=2></rect> <rect height=1 width=1 x=12 y=5></rect> <rect height=1 width=1 x=13 y=4></rect> <polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"></polygon> <rect height=1 width=1 x=9 y=14></rect> <rect height=1 width=1 x=8 y=15></rect> <path d=M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z></path> <rect height=1 width=1 x=5 y=15></rect> <path d=M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z></path> <rect height=1 width=1 x=11 y=15></rect> <path d=M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z></path> <rect height=1 width=1 x=14 y=15></rect> <rect height=1 width=1 x=15 y=11></rect> </g> <polyline class=ql-stroke points="5.5 13 9 5 12.5 13"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=11 y2=11></line> </svg>';
          },
          /* 81 */
          /***/
          function(w, c) {
            w.exports = '<svg viewbox="0 0 18 18"> <rect class="ql-fill ql-stroke" height=3 width=3 x=4 y=5></rect> <rect class="ql-fill ql-stroke" height=3 width=3 x=11 y=5></rect> <path class="ql-even ql-fill ql-stroke" d=M7,8c0,4.031-3,5-3,5></path> <path class="ql-even ql-fill ql-stroke" d=M14,8c0,4.031-3,5-3,5></path> </svg>';
          },
          /* 82 */
          /***/
          function(w, c) {
            w.exports = '<svg viewbox="0 0 18 18"> <path class=ql-stroke d=M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z></path> <path class=ql-stroke d=M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z></path> </svg>';
          },
          /* 83 */
          /***/
          function(w, c) {
            w.exports = '<svg class="" viewbox="0 0 18 18"> <line class=ql-stroke x1=5 x2=13 y1=3 y2=3></line> <line class=ql-stroke x1=6 x2=9.35 y1=12 y2=3></line> <line class=ql-stroke x1=11 x2=15 y1=11 y2=15></line> <line class=ql-stroke x1=15 x2=11 y1=11 y2=15></line> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=7 x=2 y=14></rect> </svg>';
          },
          /* 84 */
          /***/
          function(w, c) {
            w.exports = '<svg viewbox="0 0 18 18"> <line class="ql-color-label ql-stroke ql-transparent" x1=3 x2=15 y1=15 y2=15></line> <polyline class=ql-stroke points="5.5 11 9 3 12.5 11"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=9 y2=9></line> </svg>';
          },
          /* 85 */
          /***/
          function(w, c) {
            w.exports = '<svg viewbox="0 0 18 18"> <polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"></polygon> <line class="ql-stroke ql-fill" x1=15 x2=11 y1=4 y2=4></line> <path class=ql-fill d=M11,3a3,3,0,0,0,0,6h1V3H11Z></path> <rect class=ql-fill height=11 width=1 x=11 y=4></rect> <rect class=ql-fill height=11 width=1 x=13 y=4></rect> </svg>';
          },
          /* 86 */
          /***/
          function(w, c) {
            w.exports = '<svg viewbox="0 0 18 18"> <polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"></polygon> <line class="ql-stroke ql-fill" x1=9 x2=5 y1=4 y2=4></line> <path class=ql-fill d=M5,3A3,3,0,0,0,5,9H6V3H5Z></path> <rect class=ql-fill height=11 width=1 x=5 y=4></rect> <rect class=ql-fill height=11 width=1 x=7 y=4></rect> </svg>';
          },
          /* 87 */
          /***/
          function(w, c) {
            w.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M14,16H4a1,1,0,0,1,0-2H14A1,1,0,0,1,14,16Z /> <path class=ql-fill d=M14,4H4A1,1,0,0,1,4,2H14A1,1,0,0,1,14,4Z /> <rect class=ql-fill x=3 y=6 width=12 height=6 rx=1 ry=1 /> </svg>';
          },
          /* 88 */
          /***/
          function(w, c) {
            w.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M13,16H5a1,1,0,0,1,0-2h8A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H5A1,1,0,0,1,5,2h8A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=2 y=6 width=14 height=6 rx=1 ry=1 /> </svg>';
          },
          /* 89 */
          /***/
          function(w, c) {
            w.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15,8H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,8Z /> <path class=ql-fill d=M15,12H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,12Z /> <path class=ql-fill d=M15,16H5a1,1,0,0,1,0-2H15A1,1,0,0,1,15,16Z /> <path class=ql-fill d=M15,4H5A1,1,0,0,1,5,2H15A1,1,0,0,1,15,4Z /> <rect class=ql-fill x=2 y=6 width=8 height=6 rx=1 ry=1 /> </svg>';
          },
          /* 90 */
          /***/
          function(w, c) {
            w.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M5,8H3A1,1,0,0,1,3,6H5A1,1,0,0,1,5,8Z /> <path class=ql-fill d=M5,12H3a1,1,0,0,1,0-2H5A1,1,0,0,1,5,12Z /> <path class=ql-fill d=M13,16H3a1,1,0,0,1,0-2H13A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H3A1,1,0,0,1,3,2H13A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=8 y=6 width=8 height=6 rx=1 ry=1 transform="translate(24 18) rotate(-180)"/> </svg>';
          },
          /* 91 */
          /***/
          function(w, c) {
            w.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z></path> <rect class=ql-fill height=1.6 rx=0.8 ry=0.8 width=5 x=5.15 y=6.2></rect> <path class=ql-fill d=M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z></path> </svg>';
          },
          /* 92 */
          /***/
          function(w, c) {
            w.exports = '<svg viewBox="0 0 18 18"> <path class=ql-fill d=M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z /> </svg>';
          },
          /* 93 */
          /***/
          function(w, c) {
            w.exports = '<svg viewBox="0 0 18 18"> <path class=ql-fill d=M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z /> </svg>';
          },
          /* 94 */
          /***/
          function(w, c) {
            w.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=13 y1=4 y2=4></line> <line class=ql-stroke x1=5 x2=11 y1=14 y2=14></line> <line class=ql-stroke x1=8 x2=10 y1=14 y2=4></line> </svg>';
          },
          /* 95 */
          /***/
          function(w, c) {
            w.exports = '<svg viewbox="0 0 18 18"> <rect class=ql-stroke height=10 width=12 x=3 y=4></rect> <circle class=ql-fill cx=6 cy=7 r=1></circle> <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg>';
          },
          /* 96 */
          /***/
          function(w, c) {
            w.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"></polyline> </svg>';
          },
          /* 97 */
          /***/
          function(w, c) {
            w.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points="5 7 5 11 3 9 5 7"></polyline> </svg>';
          },
          /* 98 */
          /***/
          function(w, c) {
            w.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=11 y1=7 y2=11></line> <path class="ql-even ql-stroke" d=M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z></path> <path class="ql-even ql-stroke" d=M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z></path> </svg>';
          },
          /* 99 */
          /***/
          function(w, c) {
            w.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=7 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=7 x2=15 y1=14 y2=14></line> <line class="ql-stroke ql-thin" x1=2.5 x2=4.5 y1=5.5 y2=5.5></line> <path class=ql-fill d=M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z></path> <path class="ql-stroke ql-thin" d=M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156></path> <path class="ql-stroke ql-thin" d=M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109></path> </svg>';
          },
          /* 100 */
          /***/
          function(w, c) {
            w.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=6 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=6 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=6 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=3 y1=4 y2=4></line> <line class=ql-stroke x1=3 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=3 y1=14 y2=14></line> </svg>';
          },
          /* 101 */
          /***/
          function(w, c) {
            w.exports = '<svg class="" viewbox="0 0 18 18"> <line class=ql-stroke x1=9 x2=15 y1=4 y2=4></line> <polyline class=ql-stroke points="3 4 4 5 6 3"></polyline> <line class=ql-stroke x1=9 x2=15 y1=14 y2=14></line> <polyline class=ql-stroke points="3 14 4 15 6 13"></polyline> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points="3 9 4 10 6 8"></polyline> </svg>';
          },
          /* 102 */
          /***/
          function(w, c) {
            w.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z /> <path class=ql-fill d=M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z /> </svg>';
          },
          /* 103 */
          /***/
          function(w, c) {
            w.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z /> <path class=ql-fill d=M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z /> </svg>';
          },
          /* 104 */
          /***/
          function(w, c) {
            w.exports = '<svg viewbox="0 0 18 18"> <line class="ql-stroke ql-thin" x1=15.5 x2=2.5 y1=8.5 y2=9.5></line> <path class=ql-fill d=M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z></path> <path class=ql-fill d=M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z></path> </svg>';
          },
          /* 105 */
          /***/
          function(w, c) {
            w.exports = '<svg viewbox="0 0 18 18"> <path class=ql-stroke d=M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3></path> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=12 x=3 y=15></rect> </svg>';
          },
          /* 106 */
          /***/
          function(w, c) {
            w.exports = '<svg viewbox="0 0 18 18"> <rect class=ql-stroke height=12 width=12 x=3 y=3></rect> <rect class=ql-fill height=12 width=1 x=5 y=3></rect> <rect class=ql-fill height=12 width=1 x=12 y=3></rect> <rect class=ql-fill height=2 width=8 x=5 y=8></rect> <rect class=ql-fill height=1 width=3 x=3 y=5></rect> <rect class=ql-fill height=1 width=3 x=3 y=7></rect> <rect class=ql-fill height=1 width=3 x=3 y=10></rect> <rect class=ql-fill height=1 width=3 x=3 y=12></rect> <rect class=ql-fill height=1 width=3 x=12 y=5></rect> <rect class=ql-fill height=1 width=3 x=12 y=7></rect> <rect class=ql-fill height=1 width=3 x=12 y=10></rect> <rect class=ql-fill height=1 width=3 x=12 y=12></rect> </svg>';
          },
          /* 107 */
          /***/
          function(w, c) {
            w.exports = '<svg viewbox="0 0 18 18"> <polygon class=ql-stroke points="7 11 9 13 11 11 7 11"></polygon> <polygon class=ql-stroke points="7 7 9 5 11 7 7 7"></polygon> </svg>';
          },
          /* 108 */
          /***/
          function(w, c, s) {
            Object.defineProperty(c, "__esModule", {
              value: !0
            }), c.default = c.BubbleTooltip = void 0;
            var A = function b(E, N, O) {
              E === null && (E = Function.prototype);
              var v = Object.getOwnPropertyDescriptor(E, N);
              if (v === void 0) {
                var _ = Object.getPrototypeOf(E);
                return _ === null ? void 0 : b(_, N, O);
              } else {
                if ("value" in v)
                  return v.value;
                var k = v.get;
                return k === void 0 ? void 0 : k.call(O);
              }
            }, g = /* @__PURE__ */ function() {
              function b(E, N) {
                for (var O = 0; O < N.length; O++) {
                  var v = N[O];
                  v.enumerable = v.enumerable || !1, v.configurable = !0, "value" in v && (v.writable = !0), Object.defineProperty(E, v.key, v);
                }
              }
              return function(E, N, O) {
                return N && b(E.prototype, N), O && b(E, O), E;
              };
            }(), m = s(3), p = l(m), y = s(8), h = l(y), n = s(43), e = l(n), t = s(15), u = s(41), a = l(u);
            function l(b) {
              return b && b.__esModule ? b : { default: b };
            }
            function o(b, E) {
              if (!(b instanceof E))
                throw new TypeError("Cannot call a class as a function");
            }
            function i(b, E) {
              if (!b)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return E && (typeof E == "object" || typeof E == "function") ? E : b;
            }
            function f(b, E) {
              if (typeof E != "function" && E !== null)
                throw new TypeError("Super expression must either be null or a function, not " + typeof E);
              b.prototype = Object.create(E && E.prototype, { constructor: { value: b, enumerable: !1, writable: !0, configurable: !0 } }), E && (Object.setPrototypeOf ? Object.setPrototypeOf(b, E) : b.__proto__ = E);
            }
            var r = [["bold", "italic", "link"], [{ header: 1 }, { header: 2 }, "blockquote"]], d = function(b) {
              f(E, b);
              function E(N, O) {
                o(this, E), O.modules.toolbar != null && O.modules.toolbar.container == null && (O.modules.toolbar.container = r);
                var v = i(this, (E.__proto__ || Object.getPrototypeOf(E)).call(this, N, O));
                return v.quill.container.classList.add("ql-bubble"), v;
              }
              return g(E, [{
                key: "extendToolbar",
                value: function(O) {
                  this.tooltip = new T(this.quill, this.options.bounds), this.tooltip.root.appendChild(O.container), this.buildButtons([].slice.call(O.container.querySelectorAll("button")), a.default), this.buildPickers([].slice.call(O.container.querySelectorAll("select")), a.default);
                }
              }]), E;
            }(e.default);
            d.DEFAULTS = (0, p.default)(!0, {}, e.default.DEFAULTS, {
              modules: {
                toolbar: {
                  handlers: {
                    link: function(E) {
                      E ? this.quill.theme.tooltip.edit() : this.quill.format("link", !1);
                    }
                  }
                }
              }
            });
            var T = function(b) {
              f(E, b);
              function E(N, O) {
                o(this, E);
                var v = i(this, (E.__proto__ || Object.getPrototypeOf(E)).call(this, N, O));
                return v.quill.on(h.default.events.EDITOR_CHANGE, function(_, k, q, R) {
                  if (_ === h.default.events.SELECTION_CHANGE)
                    if (k != null && k.length > 0 && R === h.default.sources.USER) {
                      v.show(), v.root.style.left = "0px", v.root.style.width = "", v.root.style.width = v.root.offsetWidth + "px";
                      var F = v.quill.getLines(k.index, k.length);
                      if (F.length === 1)
                        v.position(v.quill.getBounds(k));
                      else {
                        var U = F[F.length - 1], $ = v.quill.getIndex(U), C = Math.min(U.length() - 1, k.index + k.length - $), j = v.quill.getBounds(new t.Range($, C));
                        v.position(j);
                      }
                    } else document.activeElement !== v.textbox && v.quill.hasFocus() && v.hide();
                }), v;
              }
              return g(E, [{
                key: "listen",
                value: function() {
                  var O = this;
                  A(E.prototype.__proto__ || Object.getPrototypeOf(E.prototype), "listen", this).call(this), this.root.querySelector(".ql-close").addEventListener("click", function() {
                    O.root.classList.remove("ql-editing");
                  }), this.quill.on(h.default.events.SCROLL_OPTIMIZE, function() {
                    setTimeout(function() {
                      if (!O.root.classList.contains("ql-hidden")) {
                        var v = O.quill.getSelection();
                        v != null && O.position(O.quill.getBounds(v));
                      }
                    }, 1);
                  });
                }
              }, {
                key: "cancel",
                value: function() {
                  this.show();
                }
              }, {
                key: "position",
                value: function(O) {
                  var v = A(E.prototype.__proto__ || Object.getPrototypeOf(E.prototype), "position", this).call(this, O), _ = this.root.querySelector(".ql-tooltip-arrow");
                  if (_.style.marginLeft = "", v === 0) return v;
                  _.style.marginLeft = -1 * v - _.offsetWidth / 2 + "px";
                }
              }]), E;
            }(n.BaseTooltip);
            T.TEMPLATE = ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join(""), c.BubbleTooltip = T, c.default = d;
          },
          /* 109 */
          /***/
          function(w, c, s) {
            w.exports = s(63);
          }
          /******/
        ]).default
      );
    });
  }(be)), be.exports;
}
var ce, Gn;
function Ao() {
  if (Gn) return ce;
  Gn = 1;
  var M = ce && ce.__extends || /* @__PURE__ */ function() {
    var h = function(n, e) {
      return h = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, u) {
        t.__proto__ = u;
      } || function(t, u) {
        for (var a in u) u.hasOwnProperty(a) && (t[a] = u[a]);
      }, h(n, e);
    };
    return function(n, e) {
      h(n, e);
      function t() {
        this.constructor = n;
      }
      n.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
    };
  }(), I = ce && ce.__assign || function() {
    return I = Object.assign || function(h) {
      for (var n, e = 1, t = arguments.length; e < t; e++) {
        n = arguments[e];
        for (var u in n) Object.prototype.hasOwnProperty.call(n, u) && (h[u] = n[u]);
      }
      return h;
    }, I.apply(this, arguments);
  }, w = ce && ce.__spreadArrays || function() {
    for (var h = 0, n = 0, e = arguments.length; n < e; n++) h += arguments[n].length;
    for (var t = Array(h), u = 0, n = 0; n < e; n++)
      for (var a = arguments[n], l = 0, o = a.length; l < o; l++, u++)
        t[u] = a[l];
    return t;
  }, c = ce && ce.__importDefault || function(h) {
    return h && h.__esModule ? h : { default: h };
  }, s = c(ii), A = c(oi), g = c(_o()), m = c(Eo()), p = (
    /** @class */
    function(h) {
      M(n, h);
      function n(e) {
        var t = h.call(this, e) || this;
        t.dirtyProps = [
          "modules",
          "formats",
          "bounds",
          "theme",
          "children"
        ], t.cleanProps = [
          "id",
          "className",
          "style",
          "placeholder",
          "tabIndex",
          "onChange",
          "onChangeSelection",
          "onFocus",
          "onBlur",
          "onKeyPress",
          "onKeyDown",
          "onKeyUp"
        ], t.state = {
          generation: 0
        }, t.selection = null, t.onEditorChange = function(a, l, o, i) {
          var f, r, d, T;
          a === "text-change" ? (r = (f = t).onEditorChangeText) === null || r === void 0 || r.call(f, t.editor.root.innerHTML, l, i, t.unprivilegedEditor) : a === "selection-change" && ((T = (d = t).onEditorChangeSelection) === null || T === void 0 || T.call(d, l, i, t.unprivilegedEditor));
        };
        var u = t.isControlled() ? e.value : e.defaultValue;
        return t.value = u ?? "", t;
      }
      return n.prototype.validateProps = function(e) {
        var t;
        if (s.default.Children.count(e.children) > 1)
          throw new Error("The Quill editing area can only be composed of a single React element.");
        if (s.default.Children.count(e.children)) {
          var u = s.default.Children.only(e.children);
          if (((t = u) === null || t === void 0 ? void 0 : t.type) === "textarea")
            throw new Error("Quill does not support editing on a <textarea>. Use a <div> instead.");
        }
        if (this.lastDeltaChangeSet && e.value === this.lastDeltaChangeSet)
          throw new Error("You are passing the `delta` object from the `onChange` event back as `value`. You most probably want `editor.getContents()` instead. See: https://github.com/zenoamaro/react-quill#using-deltas");
      }, n.prototype.shouldComponentUpdate = function(e, t) {
        var u = this, a;
        if (this.validateProps(e), !this.editor || this.state.generation !== t.generation)
          return !0;
        if ("value" in e) {
          var l = this.getEditorContents(), o = (a = e.value, a ?? "");
          this.isEqualValue(o, l) || this.setEditorContents(this.editor, o);
        }
        return e.readOnly !== this.props.readOnly && this.setEditorReadOnly(this.editor, e.readOnly), w(this.cleanProps, this.dirtyProps).some(function(i) {
          return !g.default(e[i], u.props[i]);
        });
      }, n.prototype.shouldComponentRegenerate = function(e) {
        var t = this;
        return this.dirtyProps.some(function(u) {
          return !g.default(e[u], t.props[u]);
        });
      }, n.prototype.componentDidMount = function() {
        this.instantiateEditor(), this.setEditorContents(this.editor, this.getEditorContents());
      }, n.prototype.componentWillUnmount = function() {
        this.destroyEditor();
      }, n.prototype.componentDidUpdate = function(e, t) {
        var u = this;
        if (this.editor && this.shouldComponentRegenerate(e)) {
          var a = this.editor.getContents(), l = this.editor.getSelection();
          this.regenerationSnapshot = { delta: a, selection: l }, this.setState({ generation: this.state.generation + 1 }), this.destroyEditor();
        }
        if (this.state.generation !== t.generation) {
          var o = this.regenerationSnapshot, a = o.delta, i = o.selection;
          delete this.regenerationSnapshot, this.instantiateEditor();
          var f = this.editor;
          f.setContents(a), y(function() {
            return u.setEditorSelection(f, i);
          });
        }
      }, n.prototype.instantiateEditor = function() {
        this.editor ? this.hookEditor(this.editor) : this.editor = this.createEditor(this.getEditingArea(), this.getEditorConfig());
      }, n.prototype.destroyEditor = function() {
        this.editor && this.unhookEditor(this.editor);
      }, n.prototype.isControlled = function() {
        return "value" in this.props;
      }, n.prototype.getEditorConfig = function() {
        return {
          bounds: this.props.bounds,
          formats: this.props.formats,
          modules: this.props.modules,
          placeholder: this.props.placeholder,
          readOnly: this.props.readOnly,
          scrollingContainer: this.props.scrollingContainer,
          tabIndex: this.props.tabIndex,
          theme: this.props.theme
        };
      }, n.prototype.getEditor = function() {
        if (!this.editor)
          throw new Error("Accessing non-instantiated editor");
        return this.editor;
      }, n.prototype.createEditor = function(e, t) {
        var u = new m.default(e, t);
        return t.tabIndex != null && this.setEditorTabIndex(u, t.tabIndex), this.hookEditor(u), u;
      }, n.prototype.hookEditor = function(e) {
        this.unprivilegedEditor = this.makeUnprivilegedEditor(e), e.on("editor-change", this.onEditorChange);
      }, n.prototype.unhookEditor = function(e) {
        e.off("editor-change", this.onEditorChange);
      }, n.prototype.getEditorContents = function() {
        return this.value;
      }, n.prototype.getEditorSelection = function() {
        return this.selection;
      }, n.prototype.isDelta = function(e) {
        return e && e.ops;
      }, n.prototype.isEqualValue = function(e, t) {
        return this.isDelta(e) && this.isDelta(t) ? g.default(e.ops, t.ops) : g.default(e, t);
      }, n.prototype.setEditorContents = function(e, t) {
        var u = this;
        this.value = t;
        var a = this.getEditorSelection();
        typeof t == "string" ? e.setContents(e.clipboard.convert(t)) : e.setContents(t), y(function() {
          return u.setEditorSelection(e, a);
        });
      }, n.prototype.setEditorSelection = function(e, t) {
        if (this.selection = t, t) {
          var u = e.getLength();
          t.index = Math.max(0, Math.min(t.index, u - 1)), t.length = Math.max(0, Math.min(t.length, u - 1 - t.index)), e.setSelection(t);
        }
      }, n.prototype.setEditorTabIndex = function(e, t) {
        var u, a;
        !((a = (u = e) === null || u === void 0 ? void 0 : u.scroll) === null || a === void 0) && a.domNode && (e.scroll.domNode.tabIndex = t);
      }, n.prototype.setEditorReadOnly = function(e, t) {
        t ? e.disable() : e.enable();
      }, n.prototype.makeUnprivilegedEditor = function(e) {
        var t = e;
        return {
          getHTML: function() {
            return t.root.innerHTML;
          },
          getLength: t.getLength.bind(t),
          getText: t.getText.bind(t),
          getContents: t.getContents.bind(t),
          getSelection: t.getSelection.bind(t),
          getBounds: t.getBounds.bind(t)
        };
      }, n.prototype.getEditingArea = function() {
        if (!this.editingArea)
          throw new Error("Instantiating on missing editing area");
        var e = A.default.findDOMNode(this.editingArea);
        if (!e)
          throw new Error("Cannot find element for editing area");
        if (e.nodeType === 3)
          throw new Error("Editing area cannot be a text node");
        return e;
      }, n.prototype.renderEditingArea = function() {
        var e = this, t = this.props, u = t.children, a = t.preserveWhitespace, l = this.state.generation, o = {
          key: l,
          ref: function(i) {
            e.editingArea = i;
          }
        };
        return s.default.Children.count(u) ? s.default.cloneElement(s.default.Children.only(u), o) : a ? s.default.createElement("pre", I({}, o)) : s.default.createElement("div", I({}, o));
      }, n.prototype.render = function() {
        var e;
        return s.default.createElement("div", { id: this.props.id, style: this.props.style, key: this.state.generation, className: "quill " + (e = this.props.className, e ?? ""), onKeyPress: this.props.onKeyPress, onKeyDown: this.props.onKeyDown, onKeyUp: this.props.onKeyUp }, this.renderEditingArea());
      }, n.prototype.onEditorChangeText = function(e, t, u, a) {
        var l, o;
        if (this.editor) {
          var i = this.isDelta(this.value) ? a.getContents() : a.getHTML();
          i !== this.getEditorContents() && (this.lastDeltaChangeSet = t, this.value = i, (o = (l = this.props).onChange) === null || o === void 0 || o.call(l, e, t, u, a));
        }
      }, n.prototype.onEditorChangeSelection = function(e, t, u) {
        var a, l, o, i, f, r;
        if (this.editor) {
          var d = this.getEditorSelection(), T = !d && e, b = d && !e;
          g.default(e, d) || (this.selection = e, (l = (a = this.props).onChangeSelection) === null || l === void 0 || l.call(a, e, t, u), T ? (i = (o = this.props).onFocus) === null || i === void 0 || i.call(o, e, t, u) : b && ((r = (f = this.props).onBlur) === null || r === void 0 || r.call(f, d, t, u)));
        }
      }, n.prototype.focus = function() {
        this.editor && this.editor.focus();
      }, n.prototype.blur = function() {
        this.editor && (this.selection = null, this.editor.blur());
      }, n.displayName = "React Quill", n.Quill = m.default, n.defaultProps = {
        theme: "snow",
        modules: {},
        readOnly: !1
      }, n;
    }(s.default.Component)
  );
  function y(h) {
    Promise.resolve().then(h);
  }
  return ce = p, ce;
}
var To = Ao();
const wo = /* @__PURE__ */ ni(To), qo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: wo
}, Symbol.toStringTag, { value: "Module" }));
export {
  qo as i
};
