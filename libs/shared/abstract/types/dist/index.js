var de = /* @__PURE__ */ ((n) => (n.ERROR = "error", n.INFO = "info", n.SUCCESS = "success", n.WARNING = "warning", n))(de || {});
function Fe(n) {
  return R(n) && !S(n) && !Vn(n) && Symbol.asyncIterator in n;
}
function S(n) {
  return Array.isArray(n);
}
function $t(n) {
  return typeof n == "bigint";
}
function Dn(n) {
  return typeof n == "boolean";
}
function Tr(n) {
  return n instanceof globalThis.Date;
}
function Ie(n) {
  return typeof n == "function";
}
function $e(n) {
  return R(n) && !S(n) && !Vn(n) && Symbol.iterator in n;
}
function Oe(n) {
  return n === null;
}
function Y(n) {
  return typeof n == "number";
}
function R(n) {
  return typeof n == "object" && n !== null;
}
function Ot(n) {
  return n instanceof globalThis.RegExp;
}
function b(n) {
  return typeof n == "string";
}
function be(n) {
  return typeof n == "symbol";
}
function Vn(n) {
  return n instanceof globalThis.Uint8Array;
}
function T(n) {
  return n === void 0;
}
function le(n) {
  return n.map((r) => Yn(r));
}
function Re(n) {
  return new Date(n.getTime());
}
function ye(n) {
  return new Uint8Array(n);
}
function Pe(n) {
  return new RegExp(n.source, n.flags);
}
function Te(n) {
  const r = {};
  for (const t of Object.getOwnPropertyNames(n))
    r[t] = Yn(n[t]);
  for (const t of Object.getOwnPropertySymbols(n))
    r[t] = Yn(n[t]);
  return r;
}
function Yn(n) {
  return S(n) ? le(n) : Tr(n) ? Re(n) : Vn(n) ? ye(n) : Ot(n) ? Pe(n) : R(n) ? Te(n) : n;
}
function _(n) {
  return Yn(n);
}
function Ae(n, r) {
  return _(n);
}
function Ue(n) {
  return n !== null && typeof n == "object";
}
function we(n) {
  return Array.isArray(n) && !ArrayBuffer.isView(n);
}
function xe(n) {
  return n === void 0;
}
function Ne(n) {
  return typeof n == "number";
}
var Or;
(function(n) {
  n.InstanceMode = "default", n.ExactOptionalPropertyTypes = !1, n.AllowArrayObject = !1, n.AllowNaN = !1, n.AllowNullVoid = !1;
  function r(c, O) {
    return n.ExactOptionalPropertyTypes ? O in c : c[O] !== void 0;
  }
  n.IsExactOptionalProperty = r;
  function t(c) {
    const O = Ue(c);
    return n.AllowArrayObject ? O : O && !we(c);
  }
  n.IsObjectLike = t;
  function e(c) {
    return t(c) && !(c instanceof Date) && !(c instanceof Uint8Array);
  }
  n.IsRecordLike = e;
  function u(c) {
    return n.AllowNaN ? Ne(c) : Number.isFinite(c);
  }
  n.IsNumberLike = u;
  function s(c) {
    const O = xe(c);
    return n.AllowNullVoid ? O || c === null : O;
  }
  n.IsVoidLike = s;
})(Or || (Or = {}));
function je(n) {
  return globalThis.Object.freeze(n).map((r) => Zn(r));
}
function Me(n) {
  const r = {};
  for (const t of Object.getOwnPropertyNames(n))
    r[t] = Zn(n[t]);
  for (const t of Object.getOwnPropertySymbols(n))
    r[t] = Zn(n[t]);
  return globalThis.Object.freeze(r);
}
function Zn(n) {
  return S(n) ? je(n) : Tr(n) ? n : Vn(n) ? n : Ot(n) ? n : R(n) ? Me(n) : n;
}
function i(n, r) {
  const t = r !== void 0 ? { ...r, ...n } : n;
  switch (Or.InstanceMode) {
    case "freeze":
      return Zn(t);
    case "clone":
      return _(t);
    default:
      return t;
  }
}
class sn extends Error {
  constructor(r) {
    super(r);
  }
}
const J = Symbol.for("TypeBox.Transform"), qn = Symbol.for("TypeBox.Readonly"), h = Symbol.for("TypeBox.Optional"), nr = Symbol.for("TypeBox.Hint"), f = Symbol.for("TypeBox.Kind");
function bt(n) {
  return R(n) && n[qn] === "Readonly";
}
function fn(n) {
  return R(n) && n[h] === "Optional";
}
function lt(n) {
  return m(n, "Any");
}
function _n(n) {
  return m(n, "Array");
}
function Ar(n) {
  return m(n, "AsyncIterator");
}
function Rt(n) {
  return m(n, "BigInt");
}
function yt(n) {
  return m(n, "Boolean");
}
function rn(n) {
  return m(n, "Computed");
}
function Ur(n) {
  return m(n, "Constructor");
}
function Ee(n) {
  return m(n, "Date");
}
function wr(n) {
  return m(n, "Function");
}
function rr(n) {
  return m(n, "Integer");
}
function H(n) {
  return m(n, "Intersect");
}
function xr(n) {
  return m(n, "Iterator");
}
function m(n, r) {
  return R(n) && f in n && n[f] === r;
}
function Pt(n) {
  return Dn(n) || Y(n) || b(n);
}
function zn(n) {
  return m(n, "Literal");
}
function mn(n) {
  return m(n, "MappedKey");
}
function g(n) {
  return m(n, "MappedResult");
}
function Gn(n) {
  return m(n, "Never");
}
function Ke(n) {
  return m(n, "Not");
}
function Le(n) {
  return m(n, "Null");
}
function tr(n) {
  return m(n, "Number");
}
function Q(n) {
  return m(n, "Object");
}
function Nr(n) {
  return m(n, "Promise");
}
function Tt(n) {
  return m(n, "Record");
}
function L(n) {
  return m(n, "Ref");
}
function At(n) {
  return m(n, "RegExp");
}
function jr(n) {
  return m(n, "String");
}
function Ce(n) {
  return m(n, "Symbol");
}
function an(n) {
  return m(n, "TemplateLiteral");
}
function Se(n) {
  return m(n, "This");
}
function Mr(n) {
  return R(n) && J in n;
}
function Rn(n) {
  return m(n, "Tuple");
}
function Be(n) {
  return m(n, "Undefined");
}
function w(n) {
  return m(n, "Union");
}
function ge(n) {
  return m(n, "Uint8Array");
}
function De(n) {
  return m(n, "Unknown");
}
function Ve(n) {
  return m(n, "Unsafe");
}
function qe(n) {
  return m(n, "Void");
}
function _e(n) {
  return R(n) && f in n && b(n[f]);
}
function nn(n) {
  return lt(n) || _n(n) || yt(n) || Rt(n) || Ar(n) || rn(n) || Ur(n) || Ee(n) || wr(n) || rr(n) || H(n) || xr(n) || zn(n) || mn(n) || g(n) || Gn(n) || Ke(n) || Le(n) || tr(n) || Q(n) || Nr(n) || Tt(n) || L(n) || At(n) || jr(n) || Ce(n) || an(n) || Se(n) || Rn(n) || Be(n) || w(n) || ge(n) || De(n) || Ve(n) || qe(n) || _e(n);
}
const ze = [
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
function Ut(n) {
  try {
    return new RegExp(n), !0;
  } catch {
    return !1;
  }
}
function Er(n) {
  if (!b(n))
    return !1;
  for (let r = 0; r < n.length; r++) {
    const t = n.charCodeAt(r);
    if (t >= 7 && t <= 13 || t === 27 || t === 127)
      return !1;
  }
  return !0;
}
function wt(n) {
  return Kr(n) || U(n);
}
function xn(n) {
  return T(n) || $t(n);
}
function F(n) {
  return T(n) || Y(n);
}
function Kr(n) {
  return T(n) || Dn(n);
}
function d(n) {
  return T(n) || b(n);
}
function Ge(n) {
  return T(n) || b(n) && Er(n) && Ut(n);
}
function We(n) {
  return T(n) || b(n) && Er(n);
}
function xt(n) {
  return T(n) || U(n);
}
function hn(n) {
  return R(n) && n[h] === "Optional";
}
function G(n) {
  return a(n, "Any") && d(n.$id);
}
function pn(n) {
  return a(n, "Array") && n.type === "array" && d(n.$id) && U(n.items) && F(n.minItems) && F(n.maxItems) && Kr(n.uniqueItems) && xt(n.contains) && F(n.minContains) && F(n.maxContains);
}
function Lr(n) {
  return a(n, "AsyncIterator") && n.type === "AsyncIterator" && d(n.$id) && U(n.items);
}
function er(n) {
  return a(n, "BigInt") && n.type === "bigint" && d(n.$id) && xn(n.exclusiveMaximum) && xn(n.exclusiveMinimum) && xn(n.maximum) && xn(n.minimum) && xn(n.multipleOf);
}
function dn(n) {
  return a(n, "Boolean") && n.type === "boolean" && d(n.$id);
}
function ke(n) {
  return a(n, "Computed") && b(n.target) && S(n.parameters) && n.parameters.every((r) => U(r));
}
function or(n) {
  return a(n, "Constructor") && n.type === "Constructor" && d(n.$id) && S(n.parameters) && n.parameters.every((r) => U(r)) && U(n.returns);
}
function ur(n) {
  return a(n, "Date") && n.type === "Date" && d(n.$id) && F(n.exclusiveMaximumTimestamp) && F(n.exclusiveMinimumTimestamp) && F(n.maximumTimestamp) && F(n.minimumTimestamp) && F(n.multipleOfTimestamp);
}
function ir(n) {
  return a(n, "Function") && n.type === "Function" && d(n.$id) && S(n.parameters) && n.parameters.every((r) => U(r)) && U(n.returns);
}
function v(n) {
  return a(n, "Integer") && n.type === "integer" && d(n.$id) && F(n.exclusiveMaximum) && F(n.exclusiveMinimum) && F(n.maximum) && F(n.minimum) && F(n.multipleOf);
}
function Nt(n) {
  return R(n) && Object.entries(n).every(([r, t]) => Er(r) && U(t));
}
function Fn(n) {
  return a(n, "Intersect") && !(b(n.type) && n.type !== "object") && S(n.allOf) && n.allOf.every((r) => U(r) && !Ze(r)) && d(n.type) && (Kr(n.unevaluatedProperties) || xt(n.unevaluatedProperties)) && d(n.$id);
}
function Cr(n) {
  return a(n, "Iterator") && n.type === "Iterator" && d(n.$id) && U(n.items);
}
function a(n, r) {
  return R(n) && f in n && n[f] === r;
}
function jt(n) {
  return tn(n) && b(n.const);
}
function Mt(n) {
  return tn(n) && Y(n.const);
}
function Et(n) {
  return tn(n) && Dn(n.const);
}
function tn(n) {
  return a(n, "Literal") && d(n.$id) && He(n.const);
}
function He(n) {
  return Dn(n) || Y(n) || b(n);
}
function Je(n) {
  return a(n, "MappedKey") && S(n.keys) && n.keys.every((r) => Y(r) || b(r));
}
function Qe(n) {
  return a(n, "MappedResult") && Nt(n.properties);
}
function en(n) {
  return a(n, "Never") && R(n.not) && Object.getOwnPropertyNames(n.not).length === 0;
}
function bn(n) {
  return a(n, "Not") && U(n.not);
}
function Sr(n) {
  return a(n, "Null") && n.type === "null" && d(n.$id);
}
function K(n) {
  return a(n, "Number") && n.type === "number" && d(n.$id) && F(n.exclusiveMaximum) && F(n.exclusiveMinimum) && F(n.maximum) && F(n.minimum) && F(n.multipleOf);
}
function $(n) {
  return a(n, "Object") && n.type === "object" && d(n.$id) && Nt(n.properties) && wt(n.additionalProperties) && F(n.minProperties) && F(n.maxProperties);
}
function Br(n) {
  return a(n, "Promise") && n.type === "Promise" && d(n.$id) && U(n.item);
}
function A(n) {
  return a(n, "Record") && n.type === "object" && d(n.$id) && wt(n.additionalProperties) && R(n.patternProperties) && ((r) => {
    const t = Object.getOwnPropertyNames(r.patternProperties);
    return t.length === 1 && Ut(t[0]) && R(r.patternProperties) && U(r.patternProperties[t[0]]);
  })(n);
}
function Xe(n) {
  return a(n, "Ref") && d(n.$id) && b(n.$ref);
}
function jn(n) {
  return a(n, "RegExp") && d(n.$id) && b(n.source) && b(n.flags) && F(n.maxLength) && F(n.minLength);
}
function W(n) {
  return a(n, "String") && n.type === "string" && d(n.$id) && F(n.minLength) && F(n.maxLength) && Ge(n.pattern) && We(n.format);
}
function Mn(n) {
  return a(n, "Symbol") && n.type === "symbol" && d(n.$id);
}
function En(n) {
  return a(n, "TemplateLiteral") && n.type === "string" && b(n.pattern) && n.pattern[0] === "^" && n.pattern[n.pattern.length - 1] === "$";
}
function Ye(n) {
  return a(n, "This") && d(n.$id) && b(n.$ref);
}
function Ze(n) {
  return R(n) && J in n;
}
function cr(n) {
  return a(n, "Tuple") && n.type === "array" && d(n.$id) && Y(n.minItems) && Y(n.maxItems) && n.minItems === n.maxItems && // empty
  (T(n.items) && T(n.additionalItems) && n.minItems === 0 || S(n.items) && n.items.every((r) => U(r)));
}
function cn(n) {
  return a(n, "Undefined") && n.type === "undefined" && d(n.$id);
}
function Z(n) {
  return a(n, "Union") && d(n.$id) && R(n) && S(n.anyOf) && n.anyOf.every((r) => U(r));
}
function Wn(n) {
  return a(n, "Uint8Array") && n.type === "Uint8Array" && d(n.$id) && F(n.minByteLength) && F(n.maxByteLength);
}
function k(n) {
  return a(n, "Unknown") && d(n.$id);
}
function he(n) {
  return a(n, "Unsafe");
}
function sr(n) {
  return a(n, "Void") && n.type === "void" && d(n.$id);
}
function ve(n) {
  return R(n) && f in n && b(n[f]) && !ze.includes(n[f]);
}
function U(n) {
  return R(n) && (G(n) || pn(n) || dn(n) || er(n) || Lr(n) || ke(n) || or(n) || ur(n) || ir(n) || v(n) || Fn(n) || Cr(n) || tn(n) || Je(n) || Qe(n) || en(n) || bn(n) || Sr(n) || K(n) || $(n) || Br(n) || A(n) || Xe(n) || jn(n) || W(n) || Mn(n) || En(n) || Ye(n) || cr(n) || cn(n) || Z(n) || Wn(n) || k(n) || he(n) || sr(n) || ve(n));
}
const no = "(true|false)", Xn = "(0|[1-9][0-9]*)", Kt = "(.*)", ro = "(?!.*)", Kn = `^${Xn}$`, Ln = `^${Kt}$`, to = `^${ro}$`;
function eo(n, r) {
  return n.includes(r);
}
function oo(n) {
  return [...new Set(n)];
}
function uo(n, r) {
  return n.filter((t) => r.includes(t));
}
function io(n, r) {
  return n.reduce((t, e) => uo(t, e), r);
}
function co(n) {
  return n.length === 1 ? n[0] : n.length > 1 ? io(n.slice(1), n[0]) : [];
}
function so(n) {
  const r = [];
  for (const t of n)
    r.push(...t);
  return r;
}
function Cn(n) {
  return i({ [f]: "Any" }, n);
}
function gr(n, r) {
  return i({ [f]: "Array", type: "array", items: n }, r);
}
function Dr(n, r) {
  return i({ [f]: "AsyncIterator", type: "AsyncIterator", items: n }, r);
}
function I(n, r, t) {
  return i({ [f]: "Computed", target: n, parameters: r }, t);
}
function fo(n, r) {
  const { [r]: t, ...e } = n;
  return e;
}
function B(n, r) {
  return r.reduce((t, e) => fo(t, e), n);
}
function M(n) {
  return i({ [f]: "Never", not: {} }, n);
}
function x(n) {
  return i({
    [f]: "MappedResult",
    properties: n
  });
}
function Vr(n, r, t) {
  return i({ [f]: "Constructor", type: "Constructor", parameters: n, returns: r }, t);
}
function kn(n, r, t) {
  return i({ [f]: "Function", type: "Function", parameters: n, returns: r }, t);
}
function br(n, r) {
  return i({ [f]: "Union", anyOf: n }, r);
}
function mo(n) {
  return n.some((r) => fn(r));
}
function ot(n) {
  return n.map((r) => fn(r) ? ao(r) : r);
}
function ao(n) {
  return B(n, [h]);
}
function po(n, r) {
  return mo(n) ? $n(br(ot(n), r)) : br(ot(n), r);
}
function yn(n, r) {
  return n.length === 1 ? i(n[0], r) : n.length === 0 ? M(r) : po(n, r);
}
function N(n, r) {
  return n.length === 0 ? M(r) : n.length === 1 ? i(n[0], r) : br(n, r);
}
class ut extends sn {
}
function Fo(n) {
  return n.replace(/\\\$/g, "$").replace(/\\\*/g, "*").replace(/\\\^/g, "^").replace(/\\\|/g, "|").replace(/\\\(/g, "(").replace(/\\\)/g, ")");
}
function qr(n, r, t) {
  return n[r] === t && n.charCodeAt(r - 1) !== 92;
}
function X(n, r) {
  return qr(n, r, "(");
}
function Sn(n, r) {
  return qr(n, r, ")");
}
function Lt(n, r) {
  return qr(n, r, "|");
}
function Io(n) {
  if (!(X(n, 0) && Sn(n, n.length - 1)))
    return !1;
  let r = 0;
  for (let t = 0; t < n.length; t++)
    if (X(n, t) && (r += 1), Sn(n, t) && (r -= 1), r === 0 && t !== n.length - 1)
      return !1;
  return !0;
}
function $o(n) {
  return n.slice(1, n.length - 1);
}
function Oo(n) {
  let r = 0;
  for (let t = 0; t < n.length; t++)
    if (X(n, t) && (r += 1), Sn(n, t) && (r -= 1), Lt(n, t) && r === 0)
      return !0;
  return !1;
}
function bo(n) {
  for (let r = 0; r < n.length; r++)
    if (X(n, r))
      return !0;
  return !1;
}
function lo(n) {
  let [r, t] = [0, 0];
  const e = [];
  for (let s = 0; s < n.length; s++)
    if (X(n, s) && (r += 1), Sn(n, s) && (r -= 1), Lt(n, s) && r === 0) {
      const c = n.slice(t, s);
      c.length > 0 && e.push(ln(c)), t = s + 1;
    }
  const u = n.slice(t);
  return u.length > 0 && e.push(ln(u)), e.length === 0 ? { type: "const", const: "" } : e.length === 1 ? e[0] : { type: "or", expr: e };
}
function Ro(n) {
  function r(u, s) {
    if (!X(u, s))
      throw new ut("TemplateLiteralParser: Index must point to open parens");
    let c = 0;
    for (let O = s; O < u.length; O++)
      if (X(u, O) && (c += 1), Sn(u, O) && (c -= 1), c === 0)
        return [s, O];
    throw new ut("TemplateLiteralParser: Unclosed group parens in expression");
  }
  function t(u, s) {
    for (let c = s; c < u.length; c++)
      if (X(u, c))
        return [s, c];
    return [s, u.length];
  }
  const e = [];
  for (let u = 0; u < n.length; u++)
    if (X(n, u)) {
      const [s, c] = r(n, u), O = n.slice(s, c + 1);
      e.push(ln(O)), u = c;
    } else {
      const [s, c] = t(n, u), O = n.slice(s, c);
      O.length > 0 && e.push(ln(O)), u = c - 1;
    }
  return e.length === 0 ? { type: "const", const: "" } : e.length === 1 ? e[0] : { type: "and", expr: e };
}
function ln(n) {
  return Io(n) ? ln($o(n)) : Oo(n) ? lo(n) : bo(n) ? Ro(n) : { type: "const", const: Fo(n) };
}
function _r(n) {
  return ln(n.slice(1, n.length - 1));
}
class yo extends sn {
}
function Po(n) {
  return n.type === "or" && n.expr.length === 2 && n.expr[0].type === "const" && n.expr[0].const === "0" && n.expr[1].type === "const" && n.expr[1].const === "[1-9][0-9]*";
}
function To(n) {
  return n.type === "or" && n.expr.length === 2 && n.expr[0].type === "const" && n.expr[0].const === "true" && n.expr[1].type === "const" && n.expr[1].const === "false";
}
function Ao(n) {
  return n.type === "const" && n.const === ".*";
}
function Bn(n) {
  return Po(n) || Ao(n) ? !1 : To(n) ? !0 : n.type === "and" ? n.expr.every((r) => Bn(r)) : n.type === "or" ? n.expr.every((r) => Bn(r)) : n.type === "const" ? !0 : (() => {
    throw new yo("Unknown expression type");
  })();
}
function Uo(n) {
  const r = _r(n.pattern);
  return Bn(r);
}
class wo extends sn {
}
function* Ct(n) {
  if (n.length === 1)
    return yield* n[0];
  for (const r of n[0])
    for (const t of Ct(n.slice(1)))
      yield `${r}${t}`;
}
function* xo(n) {
  return yield* Ct(n.expr.map((r) => [...fr(r)]));
}
function* No(n) {
  for (const r of n.expr)
    yield* fr(r);
}
function* jo(n) {
  return yield n.const;
}
function* fr(n) {
  return n.type === "and" ? yield* xo(n) : n.type === "or" ? yield* No(n) : n.type === "const" ? yield* jo(n) : (() => {
    throw new wo("Unknown expression");
  })();
}
function St(n) {
  const r = _r(n.pattern);
  return Bn(r) ? [...fr(r)] : [];
}
function l(n, r) {
  return i({
    [f]: "Literal",
    const: n,
    type: typeof n
  }, r);
}
function Bt(n) {
  return i({ [f]: "Boolean", type: "boolean" }, n);
}
function zr(n) {
  return i({ [f]: "BigInt", type: "bigint" }, n);
}
function Pn(n) {
  return i({ [f]: "Number", type: "number" }, n);
}
function gn(n) {
  return i({ [f]: "String", type: "string" }, n);
}
function* Mo(n) {
  const r = n.trim().replace(/"|'/g, "");
  return r === "boolean" ? yield Bt() : r === "number" ? yield Pn() : r === "bigint" ? yield zr() : r === "string" ? yield gn() : yield (() => {
    const t = r.split("|").map((e) => l(e.trim()));
    return t.length === 0 ? M() : t.length === 1 ? t[0] : yn(t);
  })();
}
function* Eo(n) {
  if (n[1] !== "{") {
    const r = l("$"), t = lr(n.slice(1));
    return yield* [r, ...t];
  }
  for (let r = 2; r < n.length; r++)
    if (n[r] === "}") {
      const t = Mo(n.slice(2, r)), e = lr(n.slice(r + 1));
      return yield* [...t, ...e];
    }
  yield l(n);
}
function* lr(n) {
  for (let r = 0; r < n.length; r++)
    if (n[r] === "$") {
      const t = l(n.slice(0, r)), e = Eo(n.slice(r));
      return yield* [t, ...e];
    }
  yield l(n);
}
function Ko(n) {
  return [...lr(n)];
}
class Lo extends sn {
}
function Co(n) {
  return n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function gt(n, r) {
  return an(n) ? n.pattern.slice(1, n.pattern.length - 1) : w(n) ? `(${n.anyOf.map((t) => gt(t, r)).join("|")})` : tr(n) ? `${r}${Xn}` : rr(n) ? `${r}${Xn}` : Rt(n) ? `${r}${Xn}` : jr(n) ? `${r}${Kt}` : zn(n) ? `${r}${Co(n.const.toString())}` : yt(n) ? `${r}${no}` : (() => {
    throw new Lo(`Unexpected Kind '${n[f]}'`);
  })();
}
function it(n) {
  return `^${n.map((r) => gt(r, "")).join("")}$`;
}
function vn(n) {
  const t = St(n).map((e) => l(e));
  return yn(t);
}
function Dt(n, r) {
  const t = b(n) ? it(Ko(n)) : it(n);
  return i({ [f]: "TemplateLiteral", type: "string", pattern: t }, r);
}
function So(n) {
  return St(n).map((t) => t.toString());
}
function Bo(n) {
  const r = [];
  for (const t of n)
    r.push(...on(t));
  return r;
}
function go(n) {
  return [n.toString()];
}
function on(n) {
  return [...new Set(an(n) ? So(n) : w(n) ? Bo(n.anyOf) : zn(n) ? go(n.const) : tr(n) ? ["[number]"] : rr(n) ? ["[number]"] : [])];
}
function Do(n, r, t) {
  const e = {};
  for (const u of Object.getOwnPropertyNames(r))
    e[u] = mr(n, on(r[u]), t);
  return e;
}
function Vo(n, r, t) {
  return Do(n, r.properties, t);
}
function qo(n, r, t) {
  const e = Vo(n, r, t);
  return x(e);
}
function Vt(n, r) {
  return n.map((t) => qt(t, r));
}
function _o(n) {
  return n.filter((r) => !Gn(r));
}
function zo(n, r) {
  return Wt(_o(Vt(n, r)));
}
function Go(n) {
  return n.some((r) => Gn(r)) ? [] : n;
}
function Wo(n, r) {
  return yn(Go(Vt(n, r)));
}
function ko(n, r) {
  return r in n ? n[r] : r === "[number]" ? yn(n) : M();
}
function Ho(n, r) {
  return r === "[number]" ? n : M();
}
function Jo(n, r) {
  return r in n ? n[r] : M();
}
function qt(n, r) {
  return H(n) ? zo(n.allOf, r) : w(n) ? Wo(n.anyOf, r) : Rn(n) ? ko(n.items ?? [], r) : _n(n) ? Ho(n.items, r) : Q(n) ? Jo(n.properties, r) : M();
}
function _t(n, r) {
  return r.map((t) => qt(n, t));
}
function ct(n, r) {
  return yn(_t(n, r));
}
function mr(n, r, t) {
  if (L(n) || L(r)) {
    const e = "Index types using Ref parameters require both Type and Key to be of TSchema";
    if (!nn(n) || !nn(r))
      throw new sn(e);
    return I("Index", [n, r]);
  }
  return g(r) ? qo(n, r, t) : mn(r) ? Zo(n, r, t) : i(nn(r) ? ct(n, on(r)) : ct(n, r), t);
}
function Qo(n, r, t) {
  return { [r]: mr(n, [r], _(t)) };
}
function Xo(n, r, t) {
  return r.reduce((e, u) => ({ ...e, ...Qo(n, u, t) }), {});
}
function Yo(n, r, t) {
  return Xo(n, r.keys, t);
}
function Zo(n, r, t) {
  const e = Yo(n, r, t);
  return x(e);
}
function Gr(n, r) {
  return i({ [f]: "Iterator", type: "Iterator", items: n }, r);
}
function ho(n) {
  const r = [];
  for (let t in n)
    fn(n[t]) || r.push(t);
  return r;
}
function vo(n, r) {
  const t = ho(n), e = t.length > 0 ? { [f]: "Object", type: "object", properties: n, required: t } : { [f]: "Object", type: "object", properties: n };
  return i(e, r);
}
var j = vo;
function zt(n, r) {
  return i({ [f]: "Promise", type: "Promise", item: n }, r);
}
function nu(n) {
  return i(B(n, [qn]));
}
function ru(n) {
  return i({ ...n, [qn]: "Readonly" });
}
function tu(n, r) {
  return r === !1 ? nu(n) : ru(n);
}
function In(n, r) {
  const t = r ?? !0;
  return g(n) ? uu(n, t) : tu(n, t);
}
function eu(n, r) {
  const t = {};
  for (const e of globalThis.Object.getOwnPropertyNames(n))
    t[e] = In(n[e], r);
  return t;
}
function ou(n, r) {
  return eu(n.properties, r);
}
function uu(n, r) {
  const t = ou(n, r);
  return x(t);
}
function Tn(n, r) {
  return i(n.length > 0 ? { [f]: "Tuple", type: "array", items: n, additionalItems: !1, minItems: n.length, maxItems: n.length } : { [f]: "Tuple", type: "array", minItems: n.length, maxItems: n.length }, r);
}
function Gt(n, r) {
  return n in r ? D(n, r[n]) : x(r);
}
function iu(n) {
  return { [n]: l(n) };
}
function cu(n) {
  const r = {};
  for (const t of n)
    r[t] = l(t);
  return r;
}
function su(n, r) {
  return eo(r, n) ? iu(n) : cu(r);
}
function fu(n, r) {
  const t = su(n, r);
  return Gt(n, t);
}
function Nn(n, r) {
  return r.map((t) => D(n, t));
}
function mu(n, r) {
  const t = {};
  for (const e of globalThis.Object.getOwnPropertyNames(r))
    t[e] = D(n, r[e]);
  return t;
}
function D(n, r) {
  const t = { ...r };
  return (
    // unevaluated modifier types
    fn(r) ? $n(D(n, B(r, [h]))) : bt(r) ? In(D(n, B(r, [qn]))) : (
      // unevaluated mapped types
      g(r) ? Gt(n, r.properties) : mn(r) ? fu(n, r.keys) : (
        // unevaluated types
        Ur(r) ? Vr(Nn(n, r.parameters), D(n, r.returns), t) : wr(r) ? kn(Nn(n, r.parameters), D(n, r.returns), t) : Ar(r) ? Dr(D(n, r.items), t) : xr(r) ? Gr(D(n, r.items), t) : H(r) ? un(Nn(n, r.allOf), t) : w(r) ? N(Nn(n, r.anyOf), t) : Rn(r) ? Tn(Nn(n, r.items ?? []), t) : Q(r) ? j(mu(n, r.properties), t) : _n(r) ? gr(D(n, r.items), t) : Nr(r) ? zt(D(n, r.item), t) : r
      )
    )
  );
}
function au(n, r) {
  const t = {};
  for (const e of n)
    t[e] = D(e, r);
  return t;
}
function pu(n, r, t) {
  const e = nn(n) ? on(n) : n, u = r({ [f]: "MappedKey", keys: e }), s = au(e, u);
  return j(s, t);
}
function du(n) {
  return i(B(n, [h]));
}
function Fu(n) {
  return i({ ...n, [h]: "Optional" });
}
function Iu(n, r) {
  return r === !1 ? du(n) : Fu(n);
}
function $n(n, r) {
  const t = r ?? !0;
  return g(n) ? bu(n, t) : Iu(n, t);
}
function $u(n, r) {
  const t = {};
  for (const e of globalThis.Object.getOwnPropertyNames(n))
    t[e] = $n(n[e], r);
  return t;
}
function Ou(n, r) {
  return $u(n.properties, r);
}
function bu(n, r) {
  const t = Ou(n, r);
  return x(t);
}
function Rr(n, r = {}) {
  const t = n.every((u) => Q(u)), e = nn(r.unevaluatedProperties) ? { unevaluatedProperties: r.unevaluatedProperties } : {};
  return i(r.unevaluatedProperties === !1 || nn(r.unevaluatedProperties) || t ? { ...e, [f]: "Intersect", type: "object", allOf: n } : { ...e, [f]: "Intersect", allOf: n }, r);
}
function lu(n) {
  return n.every((r) => fn(r));
}
function Ru(n) {
  return B(n, [h]);
}
function st(n) {
  return n.map((r) => fn(r) ? Ru(r) : r);
}
function yu(n, r) {
  return lu(n) ? $n(Rr(st(n), r)) : Rr(st(n), r);
}
function Wt(n, r = {}) {
  if (n.length === 1)
    return i(n[0], r);
  if (n.length === 0)
    return M(r);
  if (n.some((t) => Mr(t)))
    throw new Error("Cannot intersect transform types");
  return yu(n, r);
}
function un(n, r) {
  if (n.length === 1)
    return i(n[0], r);
  if (n.length === 0)
    return M(r);
  if (n.some((t) => Mr(t)))
    throw new Error("Cannot intersect transform types");
  return Rr(n, r);
}
function An(...n) {
  const [r, t] = typeof n[0] == "string" ? [n[0], n[1]] : [n[0].$id, n[1]];
  if (typeof r != "string")
    throw new sn("Ref: $ref must be a string");
  return i({ [f]: "Ref", $ref: r }, t);
}
function Pu(n, r) {
  return I("Awaited", [I(n, r)]);
}
function Tu(n) {
  return I("Awaited", [An(n)]);
}
function Au(n) {
  return un(kt(n));
}
function Uu(n) {
  return N(kt(n));
}
function wu(n) {
  return ar(n);
}
function kt(n) {
  return n.map((r) => ar(r));
}
function ar(n, r) {
  return i(rn(n) ? Pu(n.target, n.parameters) : H(n) ? Au(n.allOf) : w(n) ? Uu(n.anyOf) : Nr(n) ? wu(n.item) : L(n) ? Tu(n.$ref) : n, r);
}
function Ht(n) {
  const r = [];
  for (const t of n)
    r.push(Wr(t));
  return r;
}
function xu(n) {
  const r = Ht(n);
  return so(r);
}
function Nu(n) {
  const r = Ht(n);
  return co(r);
}
function ju(n) {
  return n.map((r, t) => t.toString());
}
function Mu(n) {
  return ["[number]"];
}
function Eu(n) {
  return globalThis.Object.getOwnPropertyNames(n);
}
function Ku(n) {
  return [];
}
function Wr(n) {
  return H(n) ? xu(n.allOf) : w(n) ? Nu(n.anyOf) : Rn(n) ? ju(n.items ?? []) : _n(n) ? Mu(n.items) : Q(n) ? Eu(n.properties) : Tt(n) ? Ku(n.patternProperties) : [];
}
function Lu(n, r) {
  return I("KeyOf", [I(n, r)]);
}
function Cu(n) {
  return I("KeyOf", [An(n)]);
}
function Su(n, r) {
  const t = Wr(n), e = Bu(t), u = yn(e);
  return i(u, r);
}
function Bu(n) {
  return n.map((r) => r === "[number]" ? Pn() : l(r));
}
function kr(n, r) {
  return rn(n) ? Lu(n.target, n.parameters) : L(n) ? Cu(n.$ref) : g(n) ? Vu(n, r) : Su(n, r);
}
function gu(n, r) {
  const t = {};
  for (const e of globalThis.Object.getOwnPropertyNames(n))
    t[e] = kr(n[e], _(r));
  return t;
}
function Du(n, r) {
  return gu(n.properties, r);
}
function Vu(n, r) {
  const t = Du(n, r);
  return x(t);
}
function qu(n) {
  const r = [];
  for (const t of n)
    r.push(...Wr(t));
  return oo(r);
}
function _u(n) {
  return n.filter((r) => !Gn(r));
}
function zu(n, r) {
  const t = [];
  for (const e of n)
    t.push(..._t(e, [r]));
  return _u(t);
}
function Gu(n, r) {
  const t = {};
  for (const e of r)
    t[e] = Wt(zu(n, e));
  return t;
}
function Wu(n, r) {
  const t = qu(n), e = Gu(n, t);
  return j(e, r);
}
function Jt(n) {
  return i({ [f]: "Date", type: "Date" }, n);
}
function Qt(n) {
  return i({ [f]: "Null", type: "null" }, n);
}
function Xt(n) {
  return i({ [f]: "Symbol", type: "symbol" }, n);
}
function Yt(n) {
  return i({ [f]: "Undefined", type: "undefined" }, n);
}
function Zt(n) {
  return i({ [f]: "Uint8Array", type: "Uint8Array" }, n);
}
function Hr(n) {
  return i({ [f]: "Unknown" }, n);
}
function ku(n) {
  return n.map((r) => Jr(r, !1));
}
function Hu(n) {
  const r = {};
  for (const t of globalThis.Object.getOwnPropertyNames(n))
    r[t] = In(Jr(n[t], !1));
  return r;
}
function Qn(n, r) {
  return r === !0 ? n : In(n);
}
function Jr(n, r) {
  return Fe(n) || $e(n) ? Qn(Cn(), r) : S(n) ? In(Tn(ku(n))) : Vn(n) ? Zt() : Tr(n) ? Jt() : R(n) ? Qn(j(Hu(n)), r) : Ie(n) ? Qn(kn([], Hr()), r) : T(n) ? Yt() : Oe(n) ? Qt() : be(n) ? Xt() : $t(n) ? zr() : Y(n) || Dn(n) || b(n) ? l(n) : j({});
}
function Ju(n, r) {
  return i(Jr(n, !0), r);
}
function Qu(n, r) {
  return Tn(n.parameters, r);
}
function Xu(n, r) {
  if (T(n))
    throw new Error("Enum undefined or empty");
  const t = globalThis.Object.getOwnPropertyNames(n).filter((s) => isNaN(s)).map((s) => n[s]), u = [...new Set(t)].map((s) => l(s));
  return N(u, { ...r, [nr]: "Enum" });
}
class Yu extends sn {
}
var o;
(function(n) {
  n[n.Union = 0] = "Union", n[n.True = 1] = "True", n[n.False = 2] = "False";
})(o || (o = {}));
function V(n) {
  return n === o.False ? n : o.True;
}
function Un(n) {
  throw new Yu(n);
}
function y(n) {
  return en(n) || Fn(n) || Z(n) || k(n) || G(n);
}
function P(n, r) {
  return en(r) ? ne() : Fn(r) ? pr(n, r) : Z(r) ? Xr(n, r) : k(r) ? oe() : G(r) ? Qr() : Un("StructuralRight");
}
function Qr(n, r) {
  return o.True;
}
function Zu(n, r) {
  return Fn(r) ? pr(n, r) : Z(r) && r.anyOf.some((t) => G(t) || k(t)) ? o.True : Z(r) ? o.Union : k(r) || G(r) ? o.True : o.Union;
}
function hu(n, r) {
  return k(n) ? o.False : G(n) ? o.Union : en(n) ? o.True : o.False;
}
function vu(n, r) {
  return $(r) && dr(r) ? o.True : y(r) ? P(n, r) : pn(r) ? V(p(n.items, r.items)) : o.False;
}
function ni(n, r) {
  return y(r) ? P(n, r) : Lr(r) ? V(p(n.items, r.items)) : o.False;
}
function ri(n, r) {
  return y(r) ? P(n, r) : $(r) ? E(n, r) : A(r) ? z(n, r) : er(r) ? o.True : o.False;
}
function ht(n, r) {
  return Et(n) || dn(n) ? o.True : o.False;
}
function ti(n, r) {
  return y(r) ? P(n, r) : $(r) ? E(n, r) : A(r) ? z(n, r) : dn(r) ? o.True : o.False;
}
function ei(n, r) {
  return y(r) ? P(n, r) : $(r) ? E(n, r) : or(r) ? n.parameters.length > r.parameters.length ? o.False : n.parameters.every((t, e) => V(p(r.parameters[e], t)) === o.True) ? V(p(n.returns, r.returns)) : o.False : o.False;
}
function oi(n, r) {
  return y(r) ? P(n, r) : $(r) ? E(n, r) : A(r) ? z(n, r) : ur(r) ? o.True : o.False;
}
function ui(n, r) {
  return y(r) ? P(n, r) : $(r) ? E(n, r) : ir(r) ? n.parameters.length > r.parameters.length ? o.False : n.parameters.every((t, e) => V(p(r.parameters[e], t)) === o.True) ? V(p(n.returns, r.returns)) : o.False : o.False;
}
function vt(n, r) {
  return tn(n) && Y(n.const) || K(n) || v(n) ? o.True : o.False;
}
function ii(n, r) {
  return v(r) || K(r) ? o.True : y(r) ? P(n, r) : $(r) ? E(n, r) : A(r) ? z(n, r) : o.False;
}
function pr(n, r) {
  return r.allOf.every((t) => p(n, t) === o.True) ? o.True : o.False;
}
function ci(n, r) {
  return n.allOf.some((t) => p(t, r) === o.True) ? o.True : o.False;
}
function si(n, r) {
  return y(r) ? P(n, r) : Cr(r) ? V(p(n.items, r.items)) : o.False;
}
function fi(n, r) {
  return tn(r) && r.const === n.const ? o.True : y(r) ? P(n, r) : $(r) ? E(n, r) : A(r) ? z(n, r) : W(r) ? ee(n) : K(r) ? re(n) : v(r) ? vt(n) : dn(r) ? ht(n) : o.False;
}
function ne(n, r) {
  return o.False;
}
function mi(n, r) {
  return o.True;
}
function ft(n) {
  let [r, t] = [n, 0];
  for (; bn(r); )
    r = r.not, t += 1;
  return t % 2 === 0 ? r : Hr();
}
function ai(n, r) {
  return bn(n) ? p(ft(n), r) : bn(r) ? p(n, ft(r)) : Un("Invalid fallthrough for Not");
}
function pi(n, r) {
  return y(r) ? P(n, r) : $(r) ? E(n, r) : A(r) ? z(n, r) : Sr(r) ? o.True : o.False;
}
function re(n, r) {
  return Mt(n) || K(n) || v(n) ? o.True : o.False;
}
function di(n, r) {
  return y(r) ? P(n, r) : $(r) ? E(n, r) : A(r) ? z(n, r) : v(r) || K(r) ? o.True : o.False;
}
function C(n, r) {
  return Object.getOwnPropertyNames(n.properties).length === r;
}
function mt(n) {
  return dr(n);
}
function at(n) {
  return C(n, 0) || C(n, 1) && "description" in n.properties && Z(n.properties.description) && n.properties.description.anyOf.length === 2 && (W(n.properties.description.anyOf[0]) && cn(n.properties.description.anyOf[1]) || W(n.properties.description.anyOf[1]) && cn(n.properties.description.anyOf[0]));
}
function $r(n) {
  return C(n, 0);
}
function pt(n) {
  return C(n, 0);
}
function Fi(n) {
  return C(n, 0);
}
function Ii(n) {
  return C(n, 0);
}
function $i(n) {
  return dr(n);
}
function Oi(n) {
  const r = Pn();
  return C(n, 0) || C(n, 1) && "length" in n.properties && V(p(n.properties.length, r)) === o.True;
}
function bi(n) {
  return C(n, 0);
}
function dr(n) {
  const r = Pn();
  return C(n, 0) || C(n, 1) && "length" in n.properties && V(p(n.properties.length, r)) === o.True;
}
function li(n) {
  const r = kn([Cn()], Cn());
  return C(n, 0) || C(n, 1) && "then" in n.properties && V(p(n.properties.then, r)) === o.True;
}
function te(n, r) {
  return p(n, r) === o.False || hn(n) && !hn(r) ? o.False : o.True;
}
function E(n, r) {
  return k(n) ? o.False : G(n) ? o.Union : en(n) || jt(n) && mt(r) || Mt(n) && $r(r) || Et(n) && pt(r) || Mn(n) && at(r) || er(n) && Fi(r) || W(n) && mt(r) || Mn(n) && at(r) || K(n) && $r(r) || v(n) && $r(r) || dn(n) && pt(r) || Wn(n) && $i(r) || ur(n) && Ii(r) || or(n) && bi(r) || ir(n) && Oi(r) ? o.True : A(n) && W(yr(n)) ? r[nr] === "Record" ? o.True : o.False : A(n) && K(yr(n)) ? C(r, 0) ? o.True : o.False : o.False;
}
function Ri(n, r) {
  return y(r) ? P(n, r) : A(r) ? z(n, r) : $(r) ? (() => {
    for (const t of Object.getOwnPropertyNames(r.properties)) {
      if (!(t in n.properties) && !hn(r.properties[t]))
        return o.False;
      if (hn(r.properties[t]))
        return o.True;
      if (te(n.properties[t], r.properties[t]) === o.False)
        return o.False;
    }
    return o.True;
  })() : o.False;
}
function yi(n, r) {
  return y(r) ? P(n, r) : $(r) && li(r) ? o.True : Br(r) ? V(p(n.item, r.item)) : o.False;
}
function yr(n) {
  return Kn in n.patternProperties ? Pn() : Ln in n.patternProperties ? gn() : Un("Unknown record key pattern");
}
function Pr(n) {
  return Kn in n.patternProperties ? n.patternProperties[Kn] : Ln in n.patternProperties ? n.patternProperties[Ln] : Un("Unable to get record value schema");
}
function z(n, r) {
  const [t, e] = [yr(r), Pr(r)];
  return jt(n) && K(t) && V(p(n, e)) === o.True ? o.True : Wn(n) && K(t) || W(n) && K(t) || pn(n) && K(t) ? p(n, e) : $(n) ? (() => {
    for (const u of Object.getOwnPropertyNames(n.properties))
      if (te(e, n.properties[u]) === o.False)
        return o.False;
    return o.True;
  })() : o.False;
}
function Pi(n, r) {
  return y(r) ? P(n, r) : $(r) ? E(n, r) : A(r) ? p(Pr(n), Pr(r)) : o.False;
}
function Ti(n, r) {
  const t = jn(n) ? gn() : n, e = jn(r) ? gn() : r;
  return p(t, e);
}
function ee(n, r) {
  return tn(n) && b(n.const) || W(n) ? o.True : o.False;
}
function Ai(n, r) {
  return y(r) ? P(n, r) : $(r) ? E(n, r) : A(r) ? z(n, r) : W(r) ? o.True : o.False;
}
function Ui(n, r) {
  return y(r) ? P(n, r) : $(r) ? E(n, r) : A(r) ? z(n, r) : Mn(r) ? o.True : o.False;
}
function wi(n, r) {
  return En(n) ? p(vn(n), r) : En(r) ? p(n, vn(r)) : Un("Invalid fallthrough for TemplateLiteral");
}
function xi(n, r) {
  return pn(r) && n.items !== void 0 && n.items.every((t) => p(t, r.items) === o.True);
}
function Ni(n, r) {
  return en(n) ? o.True : k(n) ? o.False : G(n) ? o.Union : o.False;
}
function ji(n, r) {
  return y(r) ? P(n, r) : $(r) && dr(r) || pn(r) && xi(n, r) ? o.True : cr(r) ? T(n.items) && !T(r.items) || !T(n.items) && T(r.items) ? o.False : T(n.items) && !T(r.items) || n.items.every((t, e) => p(t, r.items[e]) === o.True) ? o.True : o.False : o.False;
}
function Mi(n, r) {
  return y(r) ? P(n, r) : $(r) ? E(n, r) : A(r) ? z(n, r) : Wn(r) ? o.True : o.False;
}
function Ei(n, r) {
  return y(r) ? P(n, r) : $(r) ? E(n, r) : A(r) ? z(n, r) : sr(r) ? Ci(n) : cn(r) ? o.True : o.False;
}
function Xr(n, r) {
  return r.anyOf.some((t) => p(n, t) === o.True) ? o.True : o.False;
}
function Ki(n, r) {
  return n.anyOf.every((t) => p(t, r) === o.True) ? o.True : o.False;
}
function oe(n, r) {
  return o.True;
}
function Li(n, r) {
  return en(r) ? ne() : Fn(r) ? pr(n, r) : Z(r) ? Xr(n, r) : G(r) ? Qr() : W(r) ? ee(n) : K(r) ? re(n) : v(r) ? vt(n) : dn(r) ? ht(n) : pn(r) ? hu(n) : cr(r) ? Ni(n) : $(r) ? E(n, r) : k(r) ? o.True : o.False;
}
function Ci(n, r) {
  return cn(n) || cn(n) ? o.True : o.False;
}
function Si(n, r) {
  return Fn(r) ? pr(n, r) : Z(r) ? Xr(n, r) : k(r) ? oe() : G(r) ? Qr() : $(r) ? E(n, r) : sr(r) ? o.True : o.False;
}
function p(n, r) {
  return (
    // resolvable
    En(n) || En(r) ? wi(n, r) : jn(n) || jn(r) ? Ti(n, r) : bn(n) || bn(r) ? ai(n, r) : (
      // standard
      G(n) ? Zu(n, r) : pn(n) ? vu(n, r) : er(n) ? ri(n, r) : dn(n) ? ti(n, r) : Lr(n) ? ni(n, r) : or(n) ? ei(n, r) : ur(n) ? oi(n, r) : ir(n) ? ui(n, r) : v(n) ? ii(n, r) : Fn(n) ? ci(n, r) : Cr(n) ? si(n, r) : tn(n) ? fi(n, r) : en(n) ? mi() : Sr(n) ? pi(n, r) : K(n) ? di(n, r) : $(n) ? Ri(n, r) : A(n) ? Pi(n, r) : W(n) ? Ai(n, r) : Mn(n) ? Ui(n, r) : cr(n) ? ji(n, r) : Br(n) ? yi(n, r) : Wn(n) ? Mi(n, r) : cn(n) ? Ei(n, r) : Z(n) ? Ki(n, r) : k(n) ? Li(n, r) : sr(n) ? Si(n, r) : Un(`Unknown left type operand '${n[f]}'`)
    )
  );
}
function Hn(n, r) {
  return p(n, r);
}
function Bi(n, r, t, e, u) {
  const s = {};
  for (const c of globalThis.Object.getOwnPropertyNames(n))
    s[c] = Yr(n[c], r, t, e, _(u));
  return s;
}
function gi(n, r, t, e, u) {
  return Bi(n.properties, r, t, e, u);
}
function Di(n, r, t, e, u) {
  const s = gi(n, r, t, e, u);
  return x(s);
}
function Vi(n, r, t, e) {
  const u = Hn(n, r);
  return u === o.Union ? N([t, e]) : u === o.True ? t : e;
}
function Yr(n, r, t, e, u) {
  return g(n) ? Di(n, r, t, e, u) : mn(n) ? i(Gi(n, r, t, e, u)) : i(Vi(n, r, t, e), u);
}
function qi(n, r, t, e, u) {
  return {
    [n]: Yr(l(n), r, t, e, _(u))
  };
}
function _i(n, r, t, e, u) {
  return n.reduce((s, c) => ({ ...s, ...qi(c, r, t, e, u) }), {});
}
function zi(n, r, t, e, u) {
  return _i(n.keys, r, t, e, u);
}
function Gi(n, r, t, e, u) {
  const s = zi(n, r, t, e, u);
  return x(s);
}
function Wi(n, r) {
  return Zr(vn(n), r);
}
function ki(n, r) {
  const t = n.filter((e) => Hn(e, r) === o.False);
  return t.length === 1 ? t[0] : N(t);
}
function Zr(n, r, t = {}) {
  return an(n) ? i(Wi(n, r), t) : g(n) ? i(Qi(n, r), t) : i(w(n) ? ki(n.anyOf, r) : Hn(n, r) !== o.False ? M() : n, t);
}
function Hi(n, r) {
  const t = {};
  for (const e of globalThis.Object.getOwnPropertyNames(n))
    t[e] = Zr(n[e], r);
  return t;
}
function Ji(n, r) {
  return Hi(n.properties, r);
}
function Qi(n, r) {
  const t = Ji(n, r);
  return x(t);
}
function Xi(n, r) {
  return hr(vn(n), r);
}
function Yi(n, r) {
  const t = n.filter((e) => Hn(e, r) !== o.False);
  return t.length === 1 ? t[0] : N(t);
}
function hr(n, r, t) {
  return an(n) ? i(Xi(n, r), t) : g(n) ? i(vi(n, r), t) : i(w(n) ? Yi(n.anyOf, r) : Hn(n, r) !== o.False ? n : M(), t);
}
function Zi(n, r) {
  const t = {};
  for (const e of globalThis.Object.getOwnPropertyNames(n))
    t[e] = hr(n[e], r);
  return t;
}
function hi(n, r) {
  return Zi(n.properties, r);
}
function vi(n, r) {
  const t = hi(n, r);
  return x(t);
}
function nc(n, r) {
  return i(n.returns, r);
}
function rc(n) {
  return i({ [f]: "Integer", type: "integer" }, n);
}
function tc(n, r, t) {
  return {
    [n]: wn(l(n), r, _(t))
  };
}
function ec(n, r, t) {
  return n.reduce((u, s) => ({ ...u, ...tc(s, r, t) }), {});
}
function oc(n, r, t) {
  return ec(n.keys, r, t);
}
function uc(n, r, t) {
  const e = oc(n, r, t);
  return x(e);
}
function ic(n) {
  const [r, t] = [n.slice(0, 1), n.slice(1)];
  return [r.toLowerCase(), t].join("");
}
function cc(n) {
  const [r, t] = [n.slice(0, 1), n.slice(1)];
  return [r.toUpperCase(), t].join("");
}
function sc(n) {
  return n.toUpperCase();
}
function fc(n) {
  return n.toLowerCase();
}
function mc(n, r, t) {
  const e = _r(n.pattern);
  if (!Bn(e))
    return { ...n, pattern: ue(n.pattern, r) };
  const c = [...fr(e)].map((pe) => l(pe)), O = ie(c, r), ae = N(O);
  return Dt([ae], t);
}
function ue(n, r) {
  return typeof n == "string" ? r === "Uncapitalize" ? ic(n) : r === "Capitalize" ? cc(n) : r === "Uppercase" ? sc(n) : r === "Lowercase" ? fc(n) : n : n.toString();
}
function ie(n, r) {
  return n.map((t) => wn(t, r));
}
function wn(n, r, t = {}) {
  return (
    // Intrinsic-Mapped-Inference
    mn(n) ? uc(n, r, t) : (
      // Standard-Inference
      an(n) ? mc(n, r, t) : w(n) ? N(ie(n.anyOf, r), t) : zn(n) ? l(ue(n.const, r), t) : (
        // Default Type
        i(n, t)
      )
    )
  );
}
function ac(n, r = {}) {
  return wn(n, "Capitalize", r);
}
function pc(n, r = {}) {
  return wn(n, "Lowercase", r);
}
function dc(n, r = {}) {
  return wn(n, "Uncapitalize", r);
}
function Fc(n, r = {}) {
  return wn(n, "Uppercase", r);
}
function Ic(n, r, t) {
  const e = {};
  for (const u of globalThis.Object.getOwnPropertyNames(n))
    e[u] = Fr(n[u], r, _(t));
  return e;
}
function $c(n, r, t) {
  return Ic(n.properties, r, t);
}
function Oc(n, r, t) {
  const e = $c(n, r, t);
  return x(e);
}
function bc(n, r) {
  return n.map((t) => vr(t, r));
}
function lc(n, r) {
  return n.map((t) => vr(t, r));
}
function Rc(n, r) {
  const { [r]: t, ...e } = n;
  return e;
}
function yc(n, r) {
  return r.reduce((t, e) => Rc(t, e), n);
}
function Pc(n, r) {
  const t = B(n, [J, "$id", "required", "properties"]), e = yc(n.properties, r);
  return j(e, t);
}
function Tc(n) {
  const r = n.reduce((t, e) => Pt(e) ? [...t, l(e)] : t, []);
  return N(r);
}
function vr(n, r) {
  return H(n) ? un(bc(n.allOf, r)) : w(n) ? N(lc(n.anyOf, r)) : Q(n) ? Pc(n, r) : j({});
}
function Fr(n, r, t) {
  const e = S(r) ? Tc(r) : r, u = nn(r) ? on(r) : r, s = L(n), c = L(r);
  return g(n) ? Oc(n, u, t) : mn(r) ? xc(n, r, t) : s && c ? I("Omit", [n, e], t) : !s && c ? I("Omit", [n, e], t) : s && !c ? I("Omit", [n, e], t) : i({ ...vr(n, u), ...t });
}
function Ac(n, r, t) {
  return { [r]: Fr(n, [r], _(t)) };
}
function Uc(n, r, t) {
  return r.reduce((e, u) => ({ ...e, ...Ac(n, u, t) }), {});
}
function wc(n, r, t) {
  return Uc(n, r.keys, t);
}
function xc(n, r, t) {
  const e = wc(n, r, t);
  return x(e);
}
function Nc(n, r, t) {
  const e = {};
  for (const u of globalThis.Object.getOwnPropertyNames(n))
    e[u] = Ir(n[u], r, _(t));
  return e;
}
function jc(n, r, t) {
  return Nc(n.properties, r, t);
}
function Mc(n, r, t) {
  const e = jc(n, r, t);
  return x(e);
}
function Ec(n, r) {
  return n.map((t) => nt(t, r));
}
function Kc(n, r) {
  return n.map((t) => nt(t, r));
}
function Lc(n, r) {
  const t = {};
  for (const e of r)
    e in n && (t[e] = n[e]);
  return t;
}
function Cc(n, r) {
  const t = B(n, [J, "$id", "required", "properties"]), e = Lc(n.properties, r);
  return j(e, t);
}
function Sc(n) {
  const r = n.reduce((t, e) => Pt(e) ? [...t, l(e)] : t, []);
  return N(r);
}
function nt(n, r) {
  return H(n) ? un(Ec(n.allOf, r)) : w(n) ? N(Kc(n.anyOf, r)) : Q(n) ? Cc(n, r) : j({});
}
function Ir(n, r, t) {
  const e = S(r) ? Sc(r) : r, u = nn(r) ? on(r) : r, s = L(n), c = L(r);
  return g(n) ? Mc(n, u, t) : mn(r) ? Vc(n, r, t) : s && c ? I("Pick", [n, e], t) : !s && c ? I("Pick", [n, e], t) : s && !c ? I("Pick", [n, e], t) : i({ ...nt(n, u), ...t });
}
function Bc(n, r, t) {
  return {
    [r]: Ir(n, [r], _(t))
  };
}
function gc(n, r, t) {
  return r.reduce((e, u) => ({ ...e, ...Bc(n, u, t) }), {});
}
function Dc(n, r, t) {
  return gc(n, r.keys, t);
}
function Vc(n, r, t) {
  const e = Dc(n, r, t);
  return x(e);
}
function qc(n, r) {
  return I("Partial", [I(n, r)]);
}
function _c(n) {
  return I("Partial", [An(n)]);
}
function zc(n) {
  const r = {};
  for (const t of globalThis.Object.getOwnPropertyNames(n))
    r[t] = $n(n[t]);
  return r;
}
function Gc(n) {
  const r = B(n, [J, "$id", "required", "properties"]), t = zc(n.properties);
  return j(t, r);
}
function dt(n) {
  return n.map((r) => ce(r));
}
function ce(n) {
  return rn(n) ? qc(n.target, n.parameters) : L(n) ? _c(n.$ref) : H(n) ? un(dt(n.allOf)) : w(n) ? N(dt(n.anyOf)) : Q(n) ? Gc(n) : j({});
}
function rt(n, r) {
  return g(n) ? Hc(n, r) : i({ ...ce(n), ...r });
}
function Wc(n, r) {
  const t = {};
  for (const e of globalThis.Object.getOwnPropertyNames(n))
    t[e] = rt(n[e], _(r));
  return t;
}
function kc(n, r) {
  return Wc(n.properties, r);
}
function Hc(n, r) {
  const t = kc(n, r);
  return x(t);
}
function On(n, r, t) {
  return i({ [f]: "Record", type: "object", patternProperties: { [n]: r } }, t);
}
function tt(n, r, t) {
  const e = {};
  for (const u of n)
    e[u] = r;
  return j(e, { ...t, [nr]: "Record" });
}
function Jc(n, r, t) {
  return Uo(n) ? tt(on(n), r, t) : On(n.pattern, r, t);
}
function Qc(n, r, t) {
  return tt(on(N(n)), r, t);
}
function Xc(n, r, t) {
  return tt([n.toString()], r, t);
}
function Yc(n, r, t) {
  return On(n.source, r, t);
}
function Zc(n, r, t) {
  const e = T(n.pattern) ? Ln : n.pattern;
  return On(e, r, t);
}
function hc(n, r, t) {
  return On(Ln, r, t);
}
function vc(n, r, t) {
  return On(to, r, t);
}
function ns(n, r, t) {
  return On(Kn, r, t);
}
function rs(n, r, t) {
  return On(Kn, r, t);
}
function se(n, r, t = {}) {
  return rn(r) ? I("Record", [n, I(r.target, r.parameters)], t) : rn(n) ? I("Record", [I(r.target, r.parameters), r], t) : L(n) ? I("Record", [An(n.$ref), r]) : w(n) ? Qc(n.anyOf, r, t) : an(n) ? Jc(n, r, t) : zn(n) ? Xc(n.const, r, t) : rr(n) ? ns(n, r, t) : tr(n) ? rs(n, r, t) : At(n) ? Yc(n, r, t) : jr(n) ? Zc(n, r, t) : lt(n) ? hc(n, r, t) : Gn(n) ? vc(n, r, t) : M(t);
}
function ts(n, r) {
  return I("Required", [I(n, r)]);
}
function es(n) {
  return I("Required", [An(n)]);
}
function os(n) {
  const r = {};
  for (const t of globalThis.Object.getOwnPropertyNames(n))
    r[t] = B(n[t], [h]);
  return r;
}
function us(n) {
  const r = B(n, [J, "$id", "required", "properties"]), t = os(n.properties);
  return j(t, r);
}
function Ft(n) {
  return n.map((r) => fe(r));
}
function fe(n) {
  return rn(n) ? ts(n.target, n.parameters) : L(n) ? es(n.$ref) : H(n) ? un(Ft(n.allOf)) : w(n) ? N(Ft(n.anyOf)) : Q(n) ? us(n) : j({});
}
function et(n, r) {
  return g(n) ? ss(n, r) : i({ ...fe(n), ...r });
}
function is(n, r) {
  const t = {};
  for (const e of globalThis.Object.getOwnPropertyNames(n))
    t[e] = et(n[e], r);
  return t;
}
function cs(n, r) {
  return is(n.properties, r);
}
function ss(n, r) {
  const t = cs(n, r);
  return x(t);
}
function fs(n, r) {
  return r.map((t) => L(t) ? me(n, t.$ref) : q(n, t));
}
function me(n, r) {
  return r in n ? L(n[r]) ? me(n, n[r].$ref) : q(n, n[r]) : M();
}
function ms(n) {
  return ar(n[0]);
}
function as(n) {
  return mr(n[0], n[1]);
}
function ps(n) {
  return kr(n[0]);
}
function ds(n) {
  return rt(n[0]);
}
function Fs(n) {
  return Fr(n[0], n[1]);
}
function Is(n) {
  return Ir(n[0], n[1]);
}
function $s(n) {
  return se(n[0], n[1]);
}
function Os(n) {
  return et(n[0]);
}
function bs(n, r, t) {
  const e = fs(n, t);
  return r === "Awaited" ? ms(e) : r === "Index" ? as(e) : r === "KeyOf" ? ps(e) : r === "Partial" ? ds(e) : r === "Omit" ? Fs(e) : r === "Pick" ? Is(e) : r === "Record" ? $s(e) : r === "Required" ? Os(e) : M();
}
function ls(n, r) {
  return j(globalThis.Object.keys(r).reduce((t, e) => ({ ...t, [e]: q(n, r[e]) }), {}));
}
function Rs(n, r, t) {
  return Vr(Jn(n, r), q(n, t));
}
function ys(n, r, t) {
  return kn(Jn(n, r), q(n, t));
}
function Ps(n, r) {
  return Tn(Jn(n, r));
}
function Ts(n, r) {
  return un(Jn(n, r));
}
function As(n, r) {
  return N(Jn(n, r));
}
function Us(n, r) {
  return gr(q(n, r));
}
function ws(n, r) {
  return Dr(q(n, r));
}
function xs(n, r) {
  return Gr(q(n, r));
}
function Jn(n, r) {
  return r.map((t) => q(n, t));
}
function q(n, r) {
  return (
    // Modifier Unwrap - Reapplied via CreateType Options
    fn(r) ? i(q(n, B(r, [h])), r) : bt(r) ? i(q(n, B(r, [qn])), r) : (
      // Traveral
      _n(r) ? i(Us(n, r.items), r) : Ar(r) ? i(ws(n, r.items), r) : rn(r) ? i(bs(n, r.target, r.parameters)) : Ur(r) ? i(Rs(n, r.parameters, r.returns), r) : wr(r) ? i(ys(n, r.parameters, r.returns), r) : H(r) ? i(Ts(n, r.allOf), r) : xr(r) ? i(xs(n, r.items), r) : Q(r) ? i(ls(n, r.properties), r) : Rn(r) ? i(Ps(n, r.items || []), r) : w(r) ? i(As(n, r.anyOf), r) : r
    )
  );
}
function Ns(n, r) {
  return r in n ? q(n, n[r]) : M();
}
function js(n) {
  return globalThis.Object.getOwnPropertyNames(n).reduce((r, t) => ({ ...r, [t]: Ns(n, t) }), {});
}
class Ms {
  constructor(r) {
    const t = js(r), e = this.WithIdentifiers(t);
    this.$defs = e;
  }
  /** `[Json]` Imports a Type by Key. */
  Import(r, t) {
    const e = { ...this.$defs, [r]: i(this.$defs[r], t) };
    return i({ [f]: "Import", $defs: e, $ref: r });
  }
  // prettier-ignore
  WithIdentifiers(r) {
    return globalThis.Object.getOwnPropertyNames(r).reduce((t, e) => ({ ...t, [e]: { ...r[e], $id: e } }), {});
  }
}
function Es(n) {
  return new Ms(n);
}
function Ks(n, r) {
  return i({ [f]: "Not", not: n }, r);
}
function Ls(n, r) {
  return Tn(n.parameters, r);
}
function Cs(n) {
  return In($n(n));
}
let Ss = 0;
function Bs(n, r = {}) {
  T(r.$id) && (r.$id = `T${Ss++}`);
  const t = Ae(n({ [f]: "This", $ref: `${r.$id}` }));
  return t.$id = r.$id, i({ [nr]: "Recursive", ...t }, r);
}
function gs(n, r) {
  const t = b(n) ? new globalThis.RegExp(n) : n;
  return i({ [f]: "RegExp", type: "RegExp", source: t.source, flags: t.flags }, r);
}
function Ds(n) {
  return H(n) ? n.allOf : w(n) ? n.anyOf : Rn(n) ? n.items ?? [] : [];
}
function Vs(n) {
  return Ds(n);
}
function qs(n, r) {
  return i(n.returns, r);
}
class _s {
  constructor(r) {
    this.schema = r;
  }
  Decode(r) {
    return new zs(this.schema, r);
  }
}
class zs {
  constructor(r, t) {
    this.schema = r, this.decode = t;
  }
  EncodeTransform(r, t) {
    const s = { Encode: (c) => t[J].Encode(r(c)), Decode: (c) => this.decode(t[J].Decode(c)) };
    return { ...t, [J]: s };
  }
  EncodeSchema(r, t) {
    const e = { Decode: this.decode, Encode: r };
    return { ...t, [J]: e };
  }
  Encode(r) {
    return Mr(this.schema) ? this.EncodeTransform(r, this.schema) : this.EncodeSchema(r, this.schema);
  }
}
function Gs(n) {
  return new _s(n);
}
function Ws(n = {}) {
  return i({ [f]: n[f] ?? "Unsafe" }, n);
}
function ks(n) {
  return i({ [f]: "Void", type: "void" }, n);
}
const Hs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Any: Cn,
  Array: gr,
  AsyncIterator: Dr,
  Awaited: ar,
  BigInt: zr,
  Boolean: Bt,
  Capitalize: ac,
  Composite: Wu,
  Const: Ju,
  Constructor: Vr,
  ConstructorParameters: Qu,
  Date: Jt,
  Enum: Xu,
  Exclude: Zr,
  Extends: Yr,
  Extract: hr,
  Function: kn,
  Index: mr,
  InstanceType: nc,
  Integer: rc,
  Intersect: un,
  Iterator: Gr,
  KeyOf: kr,
  Literal: l,
  Lowercase: pc,
  Mapped: pu,
  Module: Es,
  Never: M,
  Not: Ks,
  Null: Qt,
  Number: Pn,
  Object: j,
  Omit: Fr,
  Optional: $n,
  Parameters: Ls,
  Partial: rt,
  Pick: Ir,
  Promise: zt,
  Readonly: In,
  ReadonlyOptional: Cs,
  Record: se,
  Recursive: Bs,
  Ref: An,
  RegExp: gs,
  Required: et,
  Rest: Vs,
  ReturnType: qs,
  String: gn,
  Symbol: Xt,
  TemplateLiteral: Dt,
  Transform: Gs,
  Tuple: Tn,
  Uint8Array: Zt,
  Uncapitalize: dc,
  Undefined: Yt,
  Union: N,
  Unknown: Hr,
  Unsafe: Ws,
  Uppercase: Fc,
  Void: ks
}, Symbol.toStringTag, { value: "Module" })), It = Hs, Js = It.Object({
  id: It.String()
});
export {
  Js as EntitySchema,
  de as NotificationType
};
