var nb = Object.defineProperty;
var tb = (e, n, r) => n in e ? nb(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[n] = r;
var dp = (e, n, r) => tb(e, typeof n != "symbol" ? n + "" : n, r);
import "react";
const rb = (e) => JSON.stringify(e, null, 2);
function ib(e) {
  return Ze(e) && !An(e) && !Qo(e) && Symbol.asyncIterator in e;
}
function An(e) {
  return Array.isArray(e);
}
function OT(e) {
  return typeof e == "bigint";
}
function Zo(e) {
  return typeof e == "boolean";
}
function Cc(e) {
  return e instanceof globalThis.Date;
}
function ob(e) {
  return typeof e == "function";
}
function ab(e) {
  return Ze(e) && !An(e) && !Qo(e) && Symbol.iterator in e;
}
function ub(e) {
  return e === null;
}
function Tt(e) {
  return typeof e == "number";
}
function Ze(e) {
  return typeof e == "object" && e !== null;
}
function AT(e) {
  return e instanceof globalThis.RegExp;
}
function ke(e) {
  return typeof e == "string";
}
function sb(e) {
  return typeof e == "symbol";
}
function Qo(e) {
  return e instanceof globalThis.Uint8Array;
}
function nn(e) {
  return e === void 0;
}
function cb(e) {
  return e.map((n) => gs(n));
}
function db(e) {
  return new Date(e.getTime());
}
function pb(e) {
  return new Uint8Array(e);
}
function fb(e) {
  return new RegExp(e.source, e.flags);
}
function yb(e) {
  const n = {};
  for (const r of Object.getOwnPropertyNames(e))
    n[r] = gs(e[r]);
  for (const r of Object.getOwnPropertySymbols(e))
    n[r] = gs(e[r]);
  return n;
}
function gs(e) {
  return An(e) ? cb(e) : Cc(e) ? db(e) : Qo(e) ? pb(e) : AT(e) ? fb(e) : Ze(e) ? yb(e) : e;
}
function Dn(e) {
  return gs(e);
}
function lb(e, n) {
  return Dn(e);
}
function mb(e) {
  return Xo(e) && Symbol.asyncIterator in e;
}
function Tb(e) {
  return Xo(e) && Symbol.iterator in e;
}
function gb(e) {
  return e instanceof Promise;
}
function jc(e) {
  return e instanceof Date && Number.isFinite(e.getTime());
}
function _b(e) {
  return e instanceof globalThis.Map;
}
function bb(e) {
  return e instanceof globalThis.Set;
}
function Ib(e) {
  return ArrayBuffer.isView(e);
}
function wT(e) {
  return e instanceof globalThis.Uint8Array;
}
function Se(e, n) {
  return n in e;
}
function Xo(e) {
  return e !== null && typeof e == "object";
}
function ea(e) {
  return Array.isArray(e) && !ArrayBuffer.isView(e);
}
function Ps(e) {
  return e === void 0;
}
function Fc(e) {
  return e === null;
}
function xc(e) {
  return typeof e == "boolean";
}
function ji(e) {
  return typeof e == "number";
}
function Pb(e) {
  return Number.isInteger(e);
}
function Uc(e) {
  return typeof e == "bigint";
}
function na(e) {
  return typeof e == "string";
}
function RT(e) {
  return typeof e == "function";
}
function Dc(e) {
  return typeof e == "symbol";
}
function Ob(e) {
  return Uc(e) || xc(e) || Fc(e) || ji(e) || na(e) || Dc(e) || Ps(e);
}
var gt;
(function(e) {
  e.InstanceMode = "default", e.ExactOptionalPropertyTypes = !1, e.AllowArrayObject = !1, e.AllowNaN = !1, e.AllowNullVoid = !1;
  function n(a, u) {
    return e.ExactOptionalPropertyTypes ? u in a : a[u] !== void 0;
  }
  e.IsExactOptionalProperty = n;
  function r(a) {
    const u = Xo(a);
    return e.AllowArrayObject ? u : u && !ea(a);
  }
  e.IsObjectLike = r;
  function i(a) {
    return r(a) && !(a instanceof Date) && !(a instanceof Uint8Array);
  }
  e.IsRecordLike = i;
  function o(a) {
    return e.AllowNaN ? ji(a) : Number.isFinite(a);
  }
  e.IsNumberLike = o;
  function t(a) {
    const u = Ps(a);
    return e.AllowNullVoid ? u || a === null : u;
  }
  e.IsVoidLike = t;
})(gt || (gt = {}));
function Ab(e) {
  return globalThis.Object.freeze(e).map((n) => _s(n));
}
function wb(e) {
  const n = {};
  for (const r of Object.getOwnPropertyNames(e))
    n[r] = _s(e[r]);
  for (const r of Object.getOwnPropertySymbols(e))
    n[r] = _s(e[r]);
  return globalThis.Object.freeze(n);
}
function _s(e) {
  return An(e) ? Ab(e) : Cc(e) ? e : Qo(e) ? e : AT(e) ? e : Ze(e) ? wb(e) : e;
}
function ue(e, n) {
  const r = n !== void 0 ? { ...n, ...e } : e;
  switch (gt.InstanceMode) {
    case "freeze":
      return _s(r);
    case "clone":
      return Dn(r);
    default:
      return r;
  }
}
class zn extends Error {
  constructor(n) {
    super(n);
  }
}
const Xn = Symbol.for("TypeBox.Transform"), ta = Symbol.for("TypeBox.Readonly"), bt = Symbol.for("TypeBox.Optional"), Os = Symbol.for("TypeBox.Hint"), ie = Symbol.for("TypeBox.Kind");
function $T(e) {
  return Ze(e) && e[ta] === "Readonly";
}
function xi(e) {
  return Ze(e) && e[bt] === "Optional";
}
function hT(e) {
  return Ee(e, "Any");
}
function ra(e) {
  return Ee(e, "Array");
}
function vc(e) {
  return Ee(e, "AsyncIterator");
}
function BT(e) {
  return Ee(e, "BigInt");
}
function MT(e) {
  return Ee(e, "Boolean");
}
function $t(e) {
  return Ee(e, "Computed");
}
function Nc(e) {
  return Ee(e, "Constructor");
}
function Rb(e) {
  return Ee(e, "Date");
}
function qc(e) {
  return Ee(e, "Function");
}
function As(e) {
  return Ee(e, "Integer");
}
function kn(e) {
  return Ee(e, "Intersect");
}
function Lc(e) {
  return Ee(e, "Iterator");
}
function Ee(e, n) {
  return Ze(e) && ie in e && e[ie] === n;
}
function ST(e) {
  return Zo(e) || Tt(e) || ke(e);
}
function ia(e) {
  return Ee(e, "Literal");
}
function Ui(e) {
  return Ee(e, "MappedKey");
}
function Mn(e) {
  return Ee(e, "MappedResult");
}
function oa(e) {
  return Ee(e, "Never");
}
function $b(e) {
  return Ee(e, "Not");
}
function hb(e) {
  return Ee(e, "Null");
}
function ws(e) {
  return Ee(e, "Number");
}
function et(e) {
  return Ee(e, "Object");
}
function Kc(e) {
  return Ee(e, "Promise");
}
function ET(e) {
  return Ee(e, "Record");
}
function In(e) {
  return Ee(e, "Ref");
}
function CT(e) {
  return Ee(e, "RegExp");
}
function Vc(e) {
  return Ee(e, "String");
}
function Bb(e) {
  return Ee(e, "Symbol");
}
function Di(e) {
  return Ee(e, "TemplateLiteral");
}
function Mb(e) {
  return Ee(e, "This");
}
function Gc(e) {
  return Ze(e) && Xn in e;
}
function so(e) {
  return Ee(e, "Tuple");
}
function Sb(e) {
  return Ee(e, "Undefined");
}
function cn(e) {
  return Ee(e, "Union");
}
function Eb(e) {
  return Ee(e, "Uint8Array");
}
function Cb(e) {
  return Ee(e, "Unknown");
}
function jb(e) {
  return Ee(e, "Unsafe");
}
function Fb(e) {
  return Ee(e, "Void");
}
function xb(e) {
  return Ze(e) && ie in e && ke(e[ie]);
}
function mt(e) {
  return hT(e) || ra(e) || MT(e) || BT(e) || vc(e) || $t(e) || Nc(e) || Rb(e) || qc(e) || As(e) || kn(e) || Lc(e) || ia(e) || Ui(e) || Mn(e) || oa(e) || $b(e) || hb(e) || ws(e) || et(e) || Kc(e) || ET(e) || In(e) || CT(e) || Vc(e) || Bb(e) || Di(e) || Mb(e) || so(e) || Sb(e) || cn(e) || Eb(e) || Cb(e) || jb(e) || Fb(e) || xb(e);
}
const Ub = [
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
function jT(e) {
  try {
    return new RegExp(e), !0;
  } catch {
    return !1;
  }
}
function Hc(e) {
  if (!ke(e))
    return !1;
  for (let n = 0; n < e.length; n++) {
    const r = e.charCodeAt(n);
    if (r >= 7 && r <= 13 || r === 27 || r === 127)
      return !1;
  }
  return !0;
}
function FT(e) {
  return Wc(e) || sn(e);
}
function $o(e) {
  return nn(e) || OT(e);
}
function Ve(e) {
  return nn(e) || Tt(e);
}
function Wc(e) {
  return nn(e) || Zo(e);
}
function ve(e) {
  return nn(e) || ke(e);
}
function Db(e) {
  return nn(e) || ke(e) && Hc(e) && jT(e);
}
function vb(e) {
  return nn(e) || ke(e) && Hc(e);
}
function xT(e) {
  return nn(e) || sn(e);
}
function bs(e) {
  return Ze(e) && e[bt] === "Optional";
}
function Vn(e) {
  return Ce(e, "Any") && ve(e.$id);
}
function vi(e) {
  return Ce(e, "Array") && e.type === "array" && ve(e.$id) && sn(e.items) && Ve(e.minItems) && Ve(e.maxItems) && Wc(e.uniqueItems) && xT(e.contains) && Ve(e.minContains) && Ve(e.maxContains);
}
function zc(e) {
  return Ce(e, "AsyncIterator") && e.type === "AsyncIterator" && ve(e.$id) && sn(e.items);
}
function Rs(e) {
  return Ce(e, "BigInt") && e.type === "bigint" && ve(e.$id) && $o(e.exclusiveMaximum) && $o(e.exclusiveMinimum) && $o(e.maximum) && $o(e.minimum) && $o(e.multipleOf);
}
function Ni(e) {
  return Ce(e, "Boolean") && e.type === "boolean" && ve(e.$id);
}
function Nb(e) {
  return Ce(e, "Computed") && ke(e.target) && An(e.parameters) && e.parameters.every((n) => sn(n));
}
function $s(e) {
  return Ce(e, "Constructor") && e.type === "Constructor" && ve(e.$id) && An(e.parameters) && e.parameters.every((n) => sn(n)) && sn(e.returns);
}
function hs(e) {
  return Ce(e, "Date") && e.type === "Date" && ve(e.$id) && Ve(e.exclusiveMaximumTimestamp) && Ve(e.exclusiveMinimumTimestamp) && Ve(e.maximumTimestamp) && Ve(e.minimumTimestamp) && Ve(e.multipleOfTimestamp);
}
function Bs(e) {
  return Ce(e, "Function") && e.type === "Function" && ve(e.$id) && An(e.parameters) && e.parameters.every((n) => sn(n)) && sn(e.returns);
}
function It(e) {
  return Ce(e, "Integer") && e.type === "integer" && ve(e.$id) && Ve(e.exclusiveMaximum) && Ve(e.exclusiveMinimum) && Ve(e.maximum) && Ve(e.minimum) && Ve(e.multipleOf);
}
function UT(e) {
  return Ze(e) && Object.entries(e).every(([n, r]) => Hc(n) && sn(r));
}
function qi(e) {
  return Ce(e, "Intersect") && !(ke(e.type) && e.type !== "object") && An(e.allOf) && e.allOf.every((n) => sn(n) && !Hb(n)) && ve(e.type) && (Wc(e.unevaluatedProperties) || xT(e.unevaluatedProperties)) && ve(e.$id);
}
function kc(e) {
  return Ce(e, "Iterator") && e.type === "Iterator" && ve(e.$id) && sn(e.items);
}
function Ce(e, n) {
  return Ze(e) && ie in e && e[ie] === n;
}
function DT(e) {
  return Bt(e) && ke(e.const);
}
function vT(e) {
  return Bt(e) && Tt(e.const);
}
function NT(e) {
  return Bt(e) && Zo(e.const);
}
function Bt(e) {
  return Ce(e, "Literal") && ve(e.$id) && qb(e.const);
}
function qb(e) {
  return Zo(e) || Tt(e) || ke(e);
}
function Lb(e) {
  return Ce(e, "MappedKey") && An(e.keys) && e.keys.every((n) => Tt(n) || ke(n));
}
function Kb(e) {
  return Ce(e, "MappedResult") && UT(e.properties);
}
function Mt(e) {
  return Ce(e, "Never") && Ze(e.not) && Object.getOwnPropertyNames(e.not).length === 0;
}
function no(e) {
  return Ce(e, "Not") && sn(e.not);
}
function Yc(e) {
  return Ce(e, "Null") && e.type === "null" && ve(e.$id);
}
function bn(e) {
  return Ce(e, "Number") && e.type === "number" && ve(e.$id) && Ve(e.exclusiveMaximum) && Ve(e.exclusiveMinimum) && Ve(e.maximum) && Ve(e.minimum) && Ve(e.multipleOf);
}
function We(e) {
  return Ce(e, "Object") && e.type === "object" && ve(e.$id) && UT(e.properties) && FT(e.additionalProperties) && Ve(e.minProperties) && Ve(e.maxProperties);
}
function Jc(e) {
  return Ce(e, "Promise") && e.type === "Promise" && ve(e.$id) && sn(e.item);
}
function un(e) {
  return Ce(e, "Record") && e.type === "object" && ve(e.$id) && FT(e.additionalProperties) && Ze(e.patternProperties) && ((n) => {
    const r = Object.getOwnPropertyNames(n.patternProperties);
    return r.length === 1 && jT(r[0]) && Ze(n.patternProperties) && sn(n.patternProperties[r[0]]);
  })(e);
}
function Vb(e) {
  return Ce(e, "Ref") && ve(e.$id) && ke(e.$ref);
}
function Go(e) {
  return Ce(e, "RegExp") && ve(e.$id) && ke(e.source) && ke(e.flags) && Ve(e.maxLength) && Ve(e.minLength);
}
function Gn(e) {
  return Ce(e, "String") && e.type === "string" && ve(e.$id) && Ve(e.minLength) && Ve(e.maxLength) && Db(e.pattern) && vb(e.format);
}
function Ho(e) {
  return Ce(e, "Symbol") && e.type === "symbol" && ve(e.$id);
}
function Wo(e) {
  return Ce(e, "TemplateLiteral") && e.type === "string" && ke(e.pattern) && e.pattern[0] === "^" && e.pattern[e.pattern.length - 1] === "$";
}
function Gb(e) {
  return Ce(e, "This") && ve(e.$id) && ke(e.$ref);
}
function Hb(e) {
  return Ze(e) && Xn in e;
}
function Ms(e) {
  return Ce(e, "Tuple") && e.type === "array" && ve(e.$id) && Tt(e.minItems) && Tt(e.maxItems) && e.minItems === e.maxItems && // empty
  (nn(e.items) && nn(e.additionalItems) && e.minItems === 0 || An(e.items) && e.items.every((n) => sn(n)));
}
function Fi(e) {
  return Ce(e, "Undefined") && e.type === "undefined" && ve(e.$id);
}
function _t(e) {
  return Ce(e, "Union") && ve(e.$id) && Ze(e) && An(e.anyOf) && e.anyOf.every((n) => sn(n));
}
function aa(e) {
  return Ce(e, "Uint8Array") && e.type === "Uint8Array" && ve(e.$id) && Ve(e.minByteLength) && Ve(e.maxByteLength);
}
function Hn(e) {
  return Ce(e, "Unknown") && ve(e.$id);
}
function Wb(e) {
  return Ce(e, "Unsafe");
}
function Ss(e) {
  return Ce(e, "Void") && e.type === "void" && ve(e.$id);
}
function zb(e) {
  return Ze(e) && ie in e && ke(e[ie]) && !Ub.includes(e[ie]);
}
function sn(e) {
  return Ze(e) && (Vn(e) || vi(e) || Ni(e) || Rs(e) || zc(e) || Nb(e) || $s(e) || hs(e) || Bs(e) || It(e) || qi(e) || kc(e) || Bt(e) || Lb(e) || Kb(e) || Mt(e) || no(e) || Yc(e) || bn(e) || We(e) || Jc(e) || un(e) || Vb(e) || Go(e) || Gn(e) || Ho(e) || Wo(e) || Gb(e) || Ms(e) || Fi(e) || _t(e) || aa(e) || Hn(e) || Wb(e) || Ss(e) || zb(e));
}
const kb = "(true|false)", ms = "(0|[1-9][0-9]*)", qT = "(.*)", Yb = "(?!.*)", to = `^${ms}$`, ro = `^${qT}$`, Jb = `^${Yb}$`, Zc = /* @__PURE__ */ new Map();
function Zb(e) {
  return Zc.has(e);
}
function Qb(e, n) {
  Zc.set(e, n);
}
function Xb(e) {
  return Zc.get(e);
}
const Qc = /* @__PURE__ */ new Map();
function Es(e) {
  return Qc.has(e);
}
function eI(e, n) {
  Qc.set(e, n);
}
function nI(e) {
  return Qc.get(e);
}
function tI(e, n) {
  return e.includes(n);
}
function rI(e) {
  return [...new Set(e)];
}
function iI(e, n) {
  return e.filter((r) => n.includes(r));
}
function oI(e, n) {
  return e.reduce((r, i) => iI(r, i), n);
}
function aI(e) {
  return e.length === 1 ? e[0] : e.length > 1 ? oI(e.slice(1), e[0]) : [];
}
function uI(e) {
  const n = [];
  for (const r of e)
    n.push(...r);
  return n;
}
function zo(e) {
  return ue({ [ie]: "Any" }, e);
}
function Xc(e, n) {
  return ue({ [ie]: "Array", type: "array", items: e }, n);
}
function ed(e, n) {
  return ue({ [ie]: "AsyncIterator", type: "AsyncIterator", items: e }, n);
}
function He(e, n, r) {
  return ue({ [ie]: "Computed", target: e, parameters: n }, r);
}
function sI(e, n) {
  const { [n]: r, ...i } = e;
  return i;
}
function hn(e, n) {
  return n.reduce((r, i) => sI(r, i), e);
}
function dn(e) {
  return ue({ [ie]: "Never", not: {} }, e);
}
function pn(e) {
  return ue({
    [ie]: "MappedResult",
    properties: e
  });
}
function nd(e, n, r) {
  return ue({ [ie]: "Constructor", type: "Constructor", parameters: e, returns: n }, r);
}
function ua(e, n, r) {
  return ue({ [ie]: "Function", type: "Function", parameters: e, returns: n }, r);
}
function Rc(e, n) {
  return ue({ [ie]: "Union", anyOf: e }, n);
}
function cI(e) {
  return e.some((n) => xi(n));
}
function pp(e) {
  return e.map((n) => xi(n) ? dI(n) : n);
}
function dI(e) {
  return hn(e, [bt]);
}
function pI(e, n) {
  return cI(e) ? Ki(Rc(pp(e), n)) : Rc(pp(e), n);
}
function co(e, n) {
  return e.length === 1 ? ue(e[0], n) : e.length === 0 ? dn(n) : pI(e, n);
}
function fn(e, n) {
  return e.length === 0 ? dn(n) : e.length === 1 ? ue(e[0], n) : Rc(e, n);
}
class fp extends zn {
}
function fI(e) {
  return e.replace(/\\\$/g, "$").replace(/\\\*/g, "*").replace(/\\\^/g, "^").replace(/\\\|/g, "|").replace(/\\\(/g, "(").replace(/\\\)/g, ")");
}
function td(e, n, r) {
  return e[n] === r && e.charCodeAt(n - 1) !== 92;
}
function lt(e, n) {
  return td(e, n, "(");
}
function ko(e, n) {
  return td(e, n, ")");
}
function LT(e, n) {
  return td(e, n, "|");
}
function yI(e) {
  if (!(lt(e, 0) && ko(e, e.length - 1)))
    return !1;
  let n = 0;
  for (let r = 0; r < e.length; r++)
    if (lt(e, r) && (n += 1), ko(e, r) && (n -= 1), n === 0 && r !== e.length - 1)
      return !1;
  return !0;
}
function lI(e) {
  return e.slice(1, e.length - 1);
}
function mI(e) {
  let n = 0;
  for (let r = 0; r < e.length; r++)
    if (lt(e, r) && (n += 1), ko(e, r) && (n -= 1), LT(e, r) && n === 0)
      return !0;
  return !1;
}
function TI(e) {
  for (let n = 0; n < e.length; n++)
    if (lt(e, n))
      return !0;
  return !1;
}
function gI(e) {
  let [n, r] = [0, 0];
  const i = [];
  for (let t = 0; t < e.length; t++)
    if (lt(e, t) && (n += 1), ko(e, t) && (n -= 1), LT(e, t) && n === 0) {
      const a = e.slice(r, t);
      a.length > 0 && i.push(io(a)), r = t + 1;
    }
  const o = e.slice(r);
  return o.length > 0 && i.push(io(o)), i.length === 0 ? { type: "const", const: "" } : i.length === 1 ? i[0] : { type: "or", expr: i };
}
function _I(e) {
  function n(o, t) {
    if (!lt(o, t))
      throw new fp("TemplateLiteralParser: Index must point to open parens");
    let a = 0;
    for (let u = t; u < o.length; u++)
      if (lt(o, u) && (a += 1), ko(o, u) && (a -= 1), a === 0)
        return [t, u];
    throw new fp("TemplateLiteralParser: Unclosed group parens in expression");
  }
  function r(o, t) {
    for (let a = t; a < o.length; a++)
      if (lt(o, a))
        return [t, a];
    return [t, o.length];
  }
  const i = [];
  for (let o = 0; o < e.length; o++)
    if (lt(e, o)) {
      const [t, a] = n(e, o), u = e.slice(t, a + 1);
      i.push(io(u)), o = a;
    } else {
      const [t, a] = r(e, o), u = e.slice(t, a);
      u.length > 0 && i.push(io(u)), o = a - 1;
    }
  return i.length === 0 ? { type: "const", const: "" } : i.length === 1 ? i[0] : { type: "and", expr: i };
}
function io(e) {
  return yI(e) ? io(lI(e)) : mI(e) ? gI(e) : TI(e) ? _I(e) : { type: "const", const: fI(e) };
}
function rd(e) {
  return io(e.slice(1, e.length - 1));
}
class bI extends zn {
}
function II(e) {
  return e.type === "or" && e.expr.length === 2 && e.expr[0].type === "const" && e.expr[0].const === "0" && e.expr[1].type === "const" && e.expr[1].const === "[1-9][0-9]*";
}
function PI(e) {
  return e.type === "or" && e.expr.length === 2 && e.expr[0].type === "const" && e.expr[0].const === "true" && e.expr[1].type === "const" && e.expr[1].const === "false";
}
function OI(e) {
  return e.type === "const" && e.const === ".*";
}
function Yo(e) {
  return II(e) || OI(e) ? !1 : PI(e) ? !0 : e.type === "and" ? e.expr.every((n) => Yo(n)) : e.type === "or" ? e.expr.every((n) => Yo(n)) : e.type === "const" ? !0 : (() => {
    throw new bI("Unknown expression type");
  })();
}
function KT(e) {
  const n = rd(e.pattern);
  return Yo(n);
}
class AI extends zn {
}
function* VT(e) {
  if (e.length === 1)
    return yield* e[0];
  for (const n of e[0])
    for (const r of VT(e.slice(1)))
      yield `${n}${r}`;
}
function* wI(e) {
  return yield* VT(e.expr.map((n) => [...Cs(n)]));
}
function* RI(e) {
  for (const n of e.expr)
    yield* Cs(n);
}
function* $I(e) {
  return yield e.const;
}
function* Cs(e) {
  return e.type === "and" ? yield* wI(e) : e.type === "or" ? yield* RI(e) : e.type === "const" ? yield* $I(e) : (() => {
    throw new AI("Unknown expression");
  })();
}
function id(e) {
  const n = rd(e.pattern);
  return Yo(n) ? [...Cs(n)] : [];
}
function Je(e, n) {
  return ue({
    [ie]: "Literal",
    const: e,
    type: typeof e
  }, n);
}
function GT(e) {
  return ue({ [ie]: "Boolean", type: "boolean" }, e);
}
function od(e) {
  return ue({ [ie]: "BigInt", type: "bigint" }, e);
}
function po(e) {
  return ue({ [ie]: "Number", type: "number" }, e);
}
function Jo(e) {
  return ue({ [ie]: "String", type: "string" }, e);
}
function* hI(e) {
  const n = e.trim().replace(/"|'/g, "");
  return n === "boolean" ? yield GT() : n === "number" ? yield po() : n === "bigint" ? yield od() : n === "string" ? yield Jo() : yield (() => {
    const r = n.split("|").map((i) => Je(i.trim()));
    return r.length === 0 ? dn() : r.length === 1 ? r[0] : co(r);
  })();
}
function* BI(e) {
  if (e[1] !== "{") {
    const n = Je("$"), r = $c(e.slice(1));
    return yield* [n, ...r];
  }
  for (let n = 2; n < e.length; n++)
    if (e[n] === "}") {
      const r = hI(e.slice(2, n)), i = $c(e.slice(n + 1));
      return yield* [...r, ...i];
    }
  yield Je(e);
}
function* $c(e) {
  for (let n = 0; n < e.length; n++)
    if (e[n] === "$") {
      const r = Je(e.slice(0, n)), i = BI(e.slice(n));
      return yield* [r, ...i];
    }
  yield Je(e);
}
function MI(e) {
  return [...$c(e)];
}
class SI extends zn {
}
function EI(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function HT(e, n) {
  return Di(e) ? e.pattern.slice(1, e.pattern.length - 1) : cn(e) ? `(${e.anyOf.map((r) => HT(r, n)).join("|")})` : ws(e) ? `${n}${ms}` : As(e) ? `${n}${ms}` : BT(e) ? `${n}${ms}` : Vc(e) ? `${n}${qT}` : ia(e) ? `${n}${EI(e.const.toString())}` : MT(e) ? `${n}${kb}` : (() => {
    throw new SI(`Unexpected Kind '${e[ie]}'`);
  })();
}
function yp(e) {
  return `^${e.map((n) => HT(n, "")).join("")}$`;
}
function Is(e) {
  const r = id(e).map((i) => Je(i));
  return co(r);
}
function WT(e, n) {
  const r = ke(e) ? yp(MI(e)) : yp(e);
  return ue({ [ie]: "TemplateLiteral", type: "string", pattern: r }, n);
}
function CI(e) {
  return id(e).map((r) => r.toString());
}
function jI(e) {
  const n = [];
  for (const r of e)
    n.push(...St(r));
  return n;
}
function FI(e) {
  return [e.toString()];
}
function St(e) {
  return [...new Set(Di(e) ? CI(e) : cn(e) ? jI(e.anyOf) : ia(e) ? FI(e.const) : ws(e) ? ["[number]"] : As(e) ? ["[number]"] : [])];
}
function xI(e, n, r) {
  const i = {};
  for (const o of Object.getOwnPropertyNames(n))
    i[o] = js(e, St(n[o]), r);
  return i;
}
function UI(e, n, r) {
  return xI(e, n.properties, r);
}
function DI(e, n, r) {
  const i = UI(e, n, r);
  return pn(i);
}
function zT(e, n) {
  return e.map((r) => kT(r, n));
}
function vI(e) {
  return e.filter((n) => !oa(n));
}
function NI(e, n) {
  return QT(vI(zT(e, n)));
}
function qI(e) {
  return e.some((n) => oa(n)) ? [] : e;
}
function LI(e, n) {
  return co(qI(zT(e, n)));
}
function KI(e, n) {
  return n in e ? e[n] : n === "[number]" ? co(e) : dn();
}
function VI(e, n) {
  return n === "[number]" ? e : dn();
}
function GI(e, n) {
  return n in e ? e[n] : dn();
}
function kT(e, n) {
  return kn(e) ? NI(e.allOf, n) : cn(e) ? LI(e.anyOf, n) : so(e) ? KI(e.items ?? [], n) : ra(e) ? VI(e.items, n) : et(e) ? GI(e.properties, n) : dn();
}
function YT(e, n) {
  return n.map((r) => kT(e, r));
}
function lp(e, n) {
  return co(YT(e, n));
}
function js(e, n, r) {
  if (In(e) || In(n)) {
    const i = "Index types using Ref parameters require both Type and Key to be of TSchema";
    if (!mt(e) || !mt(n))
      throw new zn(i);
    return He("Index", [e, n]);
  }
  return Mn(n) ? DI(e, n, r) : Ui(n) ? kI(e, n, r) : ue(mt(n) ? lp(e, St(n)) : lp(e, n), r);
}
function HI(e, n, r) {
  return { [n]: js(e, [n], Dn(r)) };
}
function WI(e, n, r) {
  return n.reduce((i, o) => ({ ...i, ...HI(e, o, r) }), {});
}
function zI(e, n, r) {
  return WI(e, n.keys, r);
}
function kI(e, n, r) {
  const i = zI(e, n, r);
  return pn(i);
}
function ad(e, n) {
  return ue({ [ie]: "Iterator", type: "Iterator", items: e }, n);
}
function YI(e) {
  const n = [];
  for (let r in e)
    xi(e[r]) || n.push(r);
  return n;
}
function JI(e, n) {
  const r = YI(e), i = r.length > 0 ? { [ie]: "Object", type: "object", properties: e, required: r } : { [ie]: "Object", type: "object", properties: e };
  return ue(i, n);
}
var yn = JI;
function JT(e, n) {
  return ue({ [ie]: "Promise", type: "Promise", item: e }, n);
}
function ZI(e) {
  return ue(hn(e, [ta]));
}
function QI(e) {
  return ue({ ...e, [ta]: "Readonly" });
}
function XI(e, n) {
  return n === !1 ? ZI(e) : QI(e);
}
function Li(e, n) {
  const r = n ?? !0;
  return Mn(e) ? tP(e, r) : XI(e, r);
}
function eP(e, n) {
  const r = {};
  for (const i of globalThis.Object.getOwnPropertyNames(e))
    r[i] = Li(e[i], n);
  return r;
}
function nP(e, n) {
  return eP(e.properties, n);
}
function tP(e, n) {
  const r = nP(e, n);
  return pn(r);
}
function fo(e, n) {
  return ue(e.length > 0 ? { [ie]: "Tuple", type: "array", items: e, additionalItems: !1, minItems: e.length, maxItems: e.length } : { [ie]: "Tuple", type: "array", minItems: e.length, maxItems: e.length }, n);
}
function ZT(e, n) {
  return e in n ? Fn(e, n[e]) : pn(n);
}
function rP(e) {
  return { [e]: Je(e) };
}
function iP(e) {
  const n = {};
  for (const r of e)
    n[r] = Je(r);
  return n;
}
function oP(e, n) {
  return tI(n, e) ? rP(e) : iP(n);
}
function aP(e, n) {
  const r = oP(e, n);
  return ZT(e, r);
}
function ho(e, n) {
  return n.map((r) => Fn(e, r));
}
function uP(e, n) {
  const r = {};
  for (const i of globalThis.Object.getOwnPropertyNames(n))
    r[i] = Fn(e, n[i]);
  return r;
}
function Fn(e, n) {
  const r = { ...n };
  return (
    // unevaluated modifier types
    xi(n) ? Ki(Fn(e, hn(n, [bt]))) : $T(n) ? Li(Fn(e, hn(n, [ta]))) : (
      // unevaluated mapped types
      Mn(n) ? ZT(e, n.properties) : Ui(n) ? aP(e, n.keys) : (
        // unevaluated types
        Nc(n) ? nd(ho(e, n.parameters), Fn(e, n.returns), r) : qc(n) ? ua(ho(e, n.parameters), Fn(e, n.returns), r) : vc(n) ? ed(Fn(e, n.items), r) : Lc(n) ? ad(Fn(e, n.items), r) : kn(n) ? Et(ho(e, n.allOf), r) : cn(n) ? fn(ho(e, n.anyOf), r) : so(n) ? fo(ho(e, n.items ?? []), r) : et(n) ? yn(uP(e, n.properties), r) : ra(n) ? Xc(Fn(e, n.items), r) : Kc(n) ? JT(Fn(e, n.item), r) : n
      )
    )
  );
}
function sP(e, n) {
  const r = {};
  for (const i of e)
    r[i] = Fn(i, n);
  return r;
}
function cP(e, n, r) {
  const i = mt(e) ? St(e) : e, o = n({ [ie]: "MappedKey", keys: i }), t = sP(i, o);
  return yn(t, r);
}
function dP(e) {
  return ue(hn(e, [bt]));
}
function pP(e) {
  return ue({ ...e, [bt]: "Optional" });
}
function fP(e, n) {
  return n === !1 ? dP(e) : pP(e);
}
function Ki(e, n) {
  const r = n ?? !0;
  return Mn(e) ? mP(e, r) : fP(e, r);
}
function yP(e, n) {
  const r = {};
  for (const i of globalThis.Object.getOwnPropertyNames(e))
    r[i] = Ki(e[i], n);
  return r;
}
function lP(e, n) {
  return yP(e.properties, n);
}
function mP(e, n) {
  const r = lP(e, n);
  return pn(r);
}
function hc(e, n = {}) {
  const r = e.every((o) => et(o)), i = mt(n.unevaluatedProperties) ? { unevaluatedProperties: n.unevaluatedProperties } : {};
  return ue(n.unevaluatedProperties === !1 || mt(n.unevaluatedProperties) || r ? { ...i, [ie]: "Intersect", type: "object", allOf: e } : { ...i, [ie]: "Intersect", allOf: e }, n);
}
function TP(e) {
  return e.every((n) => xi(n));
}
function gP(e) {
  return hn(e, [bt]);
}
function mp(e) {
  return e.map((n) => xi(n) ? gP(n) : n);
}
function _P(e, n) {
  return TP(e) ? Ki(hc(mp(e), n)) : hc(mp(e), n);
}
function QT(e, n = {}) {
  if (e.length === 1)
    return ue(e[0], n);
  if (e.length === 0)
    return dn(n);
  if (e.some((r) => Gc(r)))
    throw new Error("Cannot intersect transform types");
  return _P(e, n);
}
function Et(e, n) {
  if (e.length === 1)
    return ue(e[0], n);
  if (e.length === 0)
    return dn(n);
  if (e.some((r) => Gc(r)))
    throw new Error("Cannot intersect transform types");
  return hc(e, n);
}
function yo(...e) {
  const [n, r] = typeof e[0] == "string" ? [e[0], e[1]] : [e[0].$id, e[1]];
  if (typeof n != "string")
    throw new zn("Ref: $ref must be a string");
  return ue({ [ie]: "Ref", $ref: n }, r);
}
function bP(e, n) {
  return He("Awaited", [He(e, n)]);
}
function IP(e) {
  return He("Awaited", [yo(e)]);
}
function PP(e) {
  return Et(XT(e));
}
function OP(e) {
  return fn(XT(e));
}
function AP(e) {
  return Fs(e);
}
function XT(e) {
  return e.map((n) => Fs(n));
}
function Fs(e, n) {
  return ue($t(e) ? bP(e.target, e.parameters) : kn(e) ? PP(e.allOf) : cn(e) ? OP(e.anyOf) : Kc(e) ? AP(e.item) : In(e) ? IP(e.$ref) : e, n);
}
function eg(e) {
  const n = [];
  for (const r of e)
    n.push(xs(r));
  return n;
}
function wP(e) {
  const n = eg(e);
  return uI(n);
}
function RP(e) {
  const n = eg(e);
  return aI(n);
}
function $P(e) {
  return e.map((n, r) => r.toString());
}
function hP(e) {
  return ["[number]"];
}
function BP(e) {
  return globalThis.Object.getOwnPropertyNames(e);
}
function MP(e) {
  return Bc ? globalThis.Object.getOwnPropertyNames(e).map((r) => r[0] === "^" && r[r.length - 1] === "$" ? r.slice(1, r.length - 1) : r) : [];
}
function xs(e) {
  return kn(e) ? wP(e.allOf) : cn(e) ? RP(e.anyOf) : so(e) ? $P(e.items ?? []) : ra(e) ? hP(e.items) : et(e) ? BP(e.properties) : ET(e) ? MP(e.patternProperties) : [];
}
let Bc = !1;
function Tp(e) {
  Bc = !0;
  const n = xs(e);
  return Bc = !1, `^(${n.map((i) => `(${i})`).join("|")})$`;
}
function SP(e, n) {
  return He("KeyOf", [He(e, n)]);
}
function EP(e) {
  return He("KeyOf", [yo(e)]);
}
function CP(e, n) {
  const r = xs(e), i = jP(r), o = co(i);
  return ue(o, n);
}
function jP(e) {
  return e.map((n) => n === "[number]" ? po() : Je(n));
}
function ud(e, n) {
  return $t(e) ? SP(e.target, e.parameters) : In(e) ? EP(e.$ref) : Mn(e) ? UP(e, n) : CP(e, n);
}
function FP(e, n) {
  const r = {};
  for (const i of globalThis.Object.getOwnPropertyNames(e))
    r[i] = ud(e[i], Dn(n));
  return r;
}
function xP(e, n) {
  return FP(e.properties, n);
}
function UP(e, n) {
  const r = xP(e, n);
  return pn(r);
}
function DP(e) {
  const n = [];
  for (const r of e)
    n.push(...xs(r));
  return rI(n);
}
function vP(e) {
  return e.filter((n) => !oa(n));
}
function NP(e, n) {
  const r = [];
  for (const i of e)
    r.push(...YT(i, [n]));
  return vP(r);
}
function qP(e, n) {
  const r = {};
  for (const i of n)
    r[i] = QT(NP(e, i));
  return r;
}
function LP(e, n) {
  const r = DP(e), i = qP(e, r);
  return yn(i, n);
}
function ng(e) {
  return ue({ [ie]: "Date", type: "Date" }, e);
}
function tg(e) {
  return ue({ [ie]: "Null", type: "null" }, e);
}
function rg(e) {
  return ue({ [ie]: "Symbol", type: "symbol" }, e);
}
function ig(e) {
  return ue({ [ie]: "Undefined", type: "undefined" }, e);
}
function og(e) {
  return ue({ [ie]: "Uint8Array", type: "Uint8Array" }, e);
}
function sd(e) {
  return ue({ [ie]: "Unknown" }, e);
}
function KP(e) {
  return e.map((n) => cd(n, !1));
}
function VP(e) {
  const n = {};
  for (const r of globalThis.Object.getOwnPropertyNames(e))
    n[r] = Li(cd(e[r], !1));
  return n;
}
function wa(e, n) {
  return n === !0 ? e : Li(e);
}
function cd(e, n) {
  return ib(e) || ab(e) ? wa(zo(), n) : An(e) ? Li(fo(KP(e))) : Qo(e) ? og() : Cc(e) ? ng() : Ze(e) ? wa(yn(VP(e)), n) : ob(e) ? wa(ua([], sd()), n) : nn(e) ? ig() : ub(e) ? tg() : sb(e) ? rg() : OT(e) ? od() : Tt(e) || Zo(e) || ke(e) ? Je(e) : yn({});
}
function GP(e, n) {
  return ue(cd(e, !0), n);
}
function HP(e, n) {
  return fo(e.parameters, n);
}
function WP(e, n) {
  if (nn(e))
    throw new Error("Enum undefined or empty");
  const r = globalThis.Object.getOwnPropertyNames(e).filter((t) => isNaN(t)).map((t) => e[t]), o = [...new Set(r)].map((t) => Je(t));
  return fn(o, { ...n, [Os]: "Enum" });
}
class zP extends zn {
}
var z;
(function(e) {
  e[e.Union = 0] = "Union", e[e.True = 1] = "True", e[e.False = 2] = "False";
})(z || (z = {}));
function xn(e) {
  return e === z.False ? e : z.True;
}
function lo(e) {
  throw new zP(e);
}
function Qe(e) {
  return Mt(e) || qi(e) || _t(e) || Hn(e) || Vn(e);
}
function Xe(e, n) {
  return Mt(n) ? sg() : qi(n) ? Us(e, n) : _t(n) ? pd(e, n) : Hn(n) ? fg() : Vn(n) ? dd() : lo("StructuralRight");
}
function dd(e, n) {
  return z.True;
}
function kP(e, n) {
  return qi(n) ? Us(e, n) : _t(n) && n.anyOf.some((r) => Vn(r) || Hn(r)) ? z.True : _t(n) ? z.Union : Hn(n) || Vn(n) ? z.True : z.Union;
}
function YP(e, n) {
  return Hn(e) ? z.False : Vn(e) ? z.Union : Mt(e) ? z.True : z.False;
}
function JP(e, n) {
  return We(n) && Ds(n) ? z.True : Qe(n) ? Xe(e, n) : vi(n) ? xn(De(e.items, n.items)) : z.False;
}
function ZP(e, n) {
  return Qe(n) ? Xe(e, n) : zc(n) ? xn(De(e.items, n.items)) : z.False;
}
function QP(e, n) {
  return Qe(n) ? Xe(e, n) : We(n) ? mn(e, n) : un(n) ? vn(e, n) : Rs(n) ? z.True : z.False;
}
function ag(e, n) {
  return NT(e) || Ni(e) ? z.True : z.False;
}
function XP(e, n) {
  return Qe(n) ? Xe(e, n) : We(n) ? mn(e, n) : un(n) ? vn(e, n) : Ni(n) ? z.True : z.False;
}
function eO(e, n) {
  return Qe(n) ? Xe(e, n) : We(n) ? mn(e, n) : $s(n) ? e.parameters.length > n.parameters.length ? z.False : e.parameters.every((r, i) => xn(De(n.parameters[i], r)) === z.True) ? xn(De(e.returns, n.returns)) : z.False : z.False;
}
function nO(e, n) {
  return Qe(n) ? Xe(e, n) : We(n) ? mn(e, n) : un(n) ? vn(e, n) : hs(n) ? z.True : z.False;
}
function tO(e, n) {
  return Qe(n) ? Xe(e, n) : We(n) ? mn(e, n) : Bs(n) ? e.parameters.length > n.parameters.length ? z.False : e.parameters.every((r, i) => xn(De(n.parameters[i], r)) === z.True) ? xn(De(e.returns, n.returns)) : z.False : z.False;
}
function ug(e, n) {
  return Bt(e) && Tt(e.const) || bn(e) || It(e) ? z.True : z.False;
}
function rO(e, n) {
  return It(n) || bn(n) ? z.True : Qe(n) ? Xe(e, n) : We(n) ? mn(e, n) : un(n) ? vn(e, n) : z.False;
}
function Us(e, n) {
  return n.allOf.every((r) => De(e, r) === z.True) ? z.True : z.False;
}
function iO(e, n) {
  return e.allOf.some((r) => De(r, n) === z.True) ? z.True : z.False;
}
function oO(e, n) {
  return Qe(n) ? Xe(e, n) : kc(n) ? xn(De(e.items, n.items)) : z.False;
}
function aO(e, n) {
  return Bt(n) && n.const === e.const ? z.True : Qe(n) ? Xe(e, n) : We(n) ? mn(e, n) : un(n) ? vn(e, n) : Gn(n) ? pg(e) : bn(n) ? cg(e) : It(n) ? ug(e) : Ni(n) ? ag(e) : z.False;
}
function sg(e, n) {
  return z.False;
}
function uO(e, n) {
  return z.True;
}
function gp(e) {
  let [n, r] = [e, 0];
  for (; no(n); )
    n = n.not, r += 1;
  return r % 2 === 0 ? n : sd();
}
function sO(e, n) {
  return no(e) ? De(gp(e), n) : no(n) ? De(e, gp(n)) : lo("Invalid fallthrough for Not");
}
function cO(e, n) {
  return Qe(n) ? Xe(e, n) : We(n) ? mn(e, n) : un(n) ? vn(e, n) : Yc(n) ? z.True : z.False;
}
function cg(e, n) {
  return vT(e) || bn(e) || It(e) ? z.True : z.False;
}
function dO(e, n) {
  return Qe(n) ? Xe(e, n) : We(n) ? mn(e, n) : un(n) ? vn(e, n) : It(n) || bn(n) ? z.True : z.False;
}
function Pn(e, n) {
  return Object.getOwnPropertyNames(e.properties).length === n;
}
function _p(e) {
  return Ds(e);
}
function bp(e) {
  return Pn(e, 0) || Pn(e, 1) && "description" in e.properties && _t(e.properties.description) && e.properties.description.anyOf.length === 2 && (Gn(e.properties.description.anyOf[0]) && Fi(e.properties.description.anyOf[1]) || Gn(e.properties.description.anyOf[1]) && Fi(e.properties.description.anyOf[0]));
}
function sc(e) {
  return Pn(e, 0);
}
function Ip(e) {
  return Pn(e, 0);
}
function pO(e) {
  return Pn(e, 0);
}
function fO(e) {
  return Pn(e, 0);
}
function yO(e) {
  return Ds(e);
}
function lO(e) {
  const n = po();
  return Pn(e, 0) || Pn(e, 1) && "length" in e.properties && xn(De(e.properties.length, n)) === z.True;
}
function mO(e) {
  return Pn(e, 0);
}
function Ds(e) {
  const n = po();
  return Pn(e, 0) || Pn(e, 1) && "length" in e.properties && xn(De(e.properties.length, n)) === z.True;
}
function TO(e) {
  const n = ua([zo()], zo());
  return Pn(e, 0) || Pn(e, 1) && "then" in e.properties && xn(De(e.properties.then, n)) === z.True;
}
function dg(e, n) {
  return De(e, n) === z.False || bs(e) && !bs(n) ? z.False : z.True;
}
function mn(e, n) {
  return Hn(e) ? z.False : Vn(e) ? z.Union : Mt(e) || DT(e) && _p(n) || vT(e) && sc(n) || NT(e) && Ip(n) || Ho(e) && bp(n) || Rs(e) && pO(n) || Gn(e) && _p(n) || Ho(e) && bp(n) || bn(e) && sc(n) || It(e) && sc(n) || Ni(e) && Ip(n) || aa(e) && yO(n) || hs(e) && fO(n) || $s(e) && mO(n) || Bs(e) && lO(n) ? z.True : un(e) && Gn(Mc(e)) ? n[Os] === "Record" ? z.True : z.False : un(e) && bn(Mc(e)) ? Pn(n, 0) ? z.True : z.False : z.False;
}
function gO(e, n) {
  return Qe(n) ? Xe(e, n) : un(n) ? vn(e, n) : We(n) ? (() => {
    for (const r of Object.getOwnPropertyNames(n.properties)) {
      if (!(r in e.properties) && !bs(n.properties[r]))
        return z.False;
      if (bs(n.properties[r]))
        return z.True;
      if (dg(e.properties[r], n.properties[r]) === z.False)
        return z.False;
    }
    return z.True;
  })() : z.False;
}
function _O(e, n) {
  return Qe(n) ? Xe(e, n) : We(n) && TO(n) ? z.True : Jc(n) ? xn(De(e.item, n.item)) : z.False;
}
function Mc(e) {
  return to in e.patternProperties ? po() : ro in e.patternProperties ? Jo() : lo("Unknown record key pattern");
}
function Sc(e) {
  return to in e.patternProperties ? e.patternProperties[to] : ro in e.patternProperties ? e.patternProperties[ro] : lo("Unable to get record value schema");
}
function vn(e, n) {
  const [r, i] = [Mc(n), Sc(n)];
  return DT(e) && bn(r) && xn(De(e, i)) === z.True ? z.True : aa(e) && bn(r) || Gn(e) && bn(r) || vi(e) && bn(r) ? De(e, i) : We(e) ? (() => {
    for (const o of Object.getOwnPropertyNames(e.properties))
      if (dg(i, e.properties[o]) === z.False)
        return z.False;
    return z.True;
  })() : z.False;
}
function bO(e, n) {
  return Qe(n) ? Xe(e, n) : We(n) ? mn(e, n) : un(n) ? De(Sc(e), Sc(n)) : z.False;
}
function IO(e, n) {
  const r = Go(e) ? Jo() : e, i = Go(n) ? Jo() : n;
  return De(r, i);
}
function pg(e, n) {
  return Bt(e) && ke(e.const) || Gn(e) ? z.True : z.False;
}
function PO(e, n) {
  return Qe(n) ? Xe(e, n) : We(n) ? mn(e, n) : un(n) ? vn(e, n) : Gn(n) ? z.True : z.False;
}
function OO(e, n) {
  return Qe(n) ? Xe(e, n) : We(n) ? mn(e, n) : un(n) ? vn(e, n) : Ho(n) ? z.True : z.False;
}
function AO(e, n) {
  return Wo(e) ? De(Is(e), n) : Wo(n) ? De(e, Is(n)) : lo("Invalid fallthrough for TemplateLiteral");
}
function wO(e, n) {
  return vi(n) && e.items !== void 0 && e.items.every((r) => De(r, n.items) === z.True);
}
function RO(e, n) {
  return Mt(e) ? z.True : Hn(e) ? z.False : Vn(e) ? z.Union : z.False;
}
function $O(e, n) {
  return Qe(n) ? Xe(e, n) : We(n) && Ds(n) || vi(n) && wO(e, n) ? z.True : Ms(n) ? nn(e.items) && !nn(n.items) || !nn(e.items) && nn(n.items) ? z.False : nn(e.items) && !nn(n.items) || e.items.every((r, i) => De(r, n.items[i]) === z.True) ? z.True : z.False : z.False;
}
function hO(e, n) {
  return Qe(n) ? Xe(e, n) : We(n) ? mn(e, n) : un(n) ? vn(e, n) : aa(n) ? z.True : z.False;
}
function BO(e, n) {
  return Qe(n) ? Xe(e, n) : We(n) ? mn(e, n) : un(n) ? vn(e, n) : Ss(n) ? EO(e) : Fi(n) ? z.True : z.False;
}
function pd(e, n) {
  return n.anyOf.some((r) => De(e, r) === z.True) ? z.True : z.False;
}
function MO(e, n) {
  return e.anyOf.every((r) => De(r, n) === z.True) ? z.True : z.False;
}
function fg(e, n) {
  return z.True;
}
function SO(e, n) {
  return Mt(n) ? sg() : qi(n) ? Us(e, n) : _t(n) ? pd(e, n) : Vn(n) ? dd() : Gn(n) ? pg(e) : bn(n) ? cg(e) : It(n) ? ug(e) : Ni(n) ? ag(e) : vi(n) ? YP(e) : Ms(n) ? RO(e) : We(n) ? mn(e, n) : Hn(n) ? z.True : z.False;
}
function EO(e, n) {
  return Fi(e) || Fi(e) ? z.True : z.False;
}
function CO(e, n) {
  return qi(n) ? Us(e, n) : _t(n) ? pd(e, n) : Hn(n) ? fg() : Vn(n) ? dd() : We(n) ? mn(e, n) : Ss(n) ? z.True : z.False;
}
function De(e, n) {
  return (
    // resolvable
    Wo(e) || Wo(n) ? AO(e, n) : Go(e) || Go(n) ? IO(e, n) : no(e) || no(n) ? sO(e, n) : (
      // standard
      Vn(e) ? kP(e, n) : vi(e) ? JP(e, n) : Rs(e) ? QP(e, n) : Ni(e) ? XP(e, n) : zc(e) ? ZP(e, n) : $s(e) ? eO(e, n) : hs(e) ? nO(e, n) : Bs(e) ? tO(e, n) : It(e) ? rO(e, n) : qi(e) ? iO(e, n) : kc(e) ? oO(e, n) : Bt(e) ? aO(e, n) : Mt(e) ? uO() : Yc(e) ? cO(e, n) : bn(e) ? dO(e, n) : We(e) ? gO(e, n) : un(e) ? bO(e, n) : Gn(e) ? PO(e, n) : Ho(e) ? OO(e, n) : Ms(e) ? $O(e, n) : Jc(e) ? _O(e, n) : aa(e) ? hO(e, n) : Fi(e) ? BO(e, n) : _t(e) ? MO(e, n) : Hn(e) ? SO(e, n) : Ss(e) ? CO(e, n) : lo(`Unknown left type operand '${e[ie]}'`)
    )
  );
}
function sa(e, n) {
  return De(e, n);
}
function jO(e, n, r, i, o) {
  const t = {};
  for (const a of globalThis.Object.getOwnPropertyNames(e))
    t[a] = fd(e[a], n, r, i, Dn(o));
  return t;
}
function FO(e, n, r, i, o) {
  return jO(e.properties, n, r, i, o);
}
function xO(e, n, r, i, o) {
  const t = FO(e, n, r, i, o);
  return pn(t);
}
function UO(e, n, r, i) {
  const o = sa(e, n);
  return o === z.Union ? fn([r, i]) : o === z.True ? r : i;
}
function fd(e, n, r, i, o) {
  return Mn(e) ? xO(e, n, r, i, o) : Ui(e) ? ue(qO(e, n, r, i, o)) : ue(UO(e, n, r, i), o);
}
function DO(e, n, r, i, o) {
  return {
    [e]: fd(Je(e), n, r, i, Dn(o))
  };
}
function vO(e, n, r, i, o) {
  return e.reduce((t, a) => ({ ...t, ...DO(a, n, r, i, o) }), {});
}
function NO(e, n, r, i, o) {
  return vO(e.keys, n, r, i, o);
}
function qO(e, n, r, i, o) {
  const t = NO(e, n, r, i, o);
  return pn(t);
}
function LO(e) {
  return e.allOf.every((n) => vs(n));
}
function KO(e) {
  return e.anyOf.some((n) => vs(n));
}
function VO(e) {
  return !vs(e.not);
}
function vs(e) {
  return e[ie] === "Intersect" ? LO(e) : e[ie] === "Union" ? KO(e) : e[ie] === "Not" ? VO(e) : e[ie] === "Undefined";
}
function GO(e, n) {
  return yd(Is(e), n);
}
function HO(e, n) {
  const r = e.filter((i) => sa(i, n) === z.False);
  return r.length === 1 ? r[0] : fn(r);
}
function yd(e, n, r = {}) {
  return Di(e) ? ue(GO(e, n), r) : Mn(e) ? ue(kO(e, n), r) : ue(cn(e) ? HO(e.anyOf, n) : sa(e, n) !== z.False ? dn() : e, r);
}
function WO(e, n) {
  const r = {};
  for (const i of globalThis.Object.getOwnPropertyNames(e))
    r[i] = yd(e[i], n);
  return r;
}
function zO(e, n) {
  return WO(e.properties, n);
}
function kO(e, n) {
  const r = zO(e, n);
  return pn(r);
}
function YO(e, n) {
  return ld(Is(e), n);
}
function JO(e, n) {
  const r = e.filter((i) => sa(i, n) !== z.False);
  return r.length === 1 ? r[0] : fn(r);
}
function ld(e, n, r) {
  return Di(e) ? ue(YO(e, n), r) : Mn(e) ? ue(XO(e, n), r) : ue(cn(e) ? JO(e.anyOf, n) : sa(e, n) !== z.False ? e : dn(), r);
}
function ZO(e, n) {
  const r = {};
  for (const i of globalThis.Object.getOwnPropertyNames(e))
    r[i] = ld(e[i], n);
  return r;
}
function QO(e, n) {
  return ZO(e.properties, n);
}
function XO(e, n) {
  const r = QO(e, n);
  return pn(r);
}
function eA(e, n) {
  return ue(e.returns, n);
}
function nA(e) {
  return ue({ [ie]: "Integer", type: "integer" }, e);
}
function tA(e, n, r) {
  return {
    [e]: mo(Je(e), n, Dn(r))
  };
}
function rA(e, n, r) {
  return e.reduce((o, t) => ({ ...o, ...tA(t, n, r) }), {});
}
function iA(e, n, r) {
  return rA(e.keys, n, r);
}
function oA(e, n, r) {
  const i = iA(e, n, r);
  return pn(i);
}
function aA(e) {
  const [n, r] = [e.slice(0, 1), e.slice(1)];
  return [n.toLowerCase(), r].join("");
}
function uA(e) {
  const [n, r] = [e.slice(0, 1), e.slice(1)];
  return [n.toUpperCase(), r].join("");
}
function sA(e) {
  return e.toUpperCase();
}
function cA(e) {
  return e.toLowerCase();
}
function dA(e, n, r) {
  const i = rd(e.pattern);
  if (!Yo(i))
    return { ...e, pattern: yg(e.pattern, n) };
  const a = [...Cs(i)].map((s) => Je(s)), u = lg(a, n), d = fn(u);
  return WT([d], r);
}
function yg(e, n) {
  return typeof e == "string" ? n === "Uncapitalize" ? aA(e) : n === "Capitalize" ? uA(e) : n === "Uppercase" ? sA(e) : n === "Lowercase" ? cA(e) : e : e.toString();
}
function lg(e, n) {
  return e.map((r) => mo(r, n));
}
function mo(e, n, r = {}) {
  return (
    // Intrinsic-Mapped-Inference
    Ui(e) ? oA(e, n, r) : (
      // Standard-Inference
      Di(e) ? dA(e, n, r) : cn(e) ? fn(lg(e.anyOf, n), r) : ia(e) ? Je(yg(e.const, n), r) : (
        // Default Type
        ue(e, r)
      )
    )
  );
}
function pA(e, n = {}) {
  return mo(e, "Capitalize", n);
}
function fA(e, n = {}) {
  return mo(e, "Lowercase", n);
}
function yA(e, n = {}) {
  return mo(e, "Uncapitalize", n);
}
function lA(e, n = {}) {
  return mo(e, "Uppercase", n);
}
function mA(e, n, r) {
  const i = {};
  for (const o of globalThis.Object.getOwnPropertyNames(e))
    i[o] = Ns(e[o], n, Dn(r));
  return i;
}
function TA(e, n, r) {
  return mA(e.properties, n, r);
}
function gA(e, n, r) {
  const i = TA(e, n, r);
  return pn(i);
}
function _A(e, n) {
  return e.map((r) => md(r, n));
}
function bA(e, n) {
  return e.map((r) => md(r, n));
}
function IA(e, n) {
  const { [n]: r, ...i } = e;
  return i;
}
function PA(e, n) {
  return n.reduce((r, i) => IA(r, i), e);
}
function OA(e, n) {
  const r = hn(e, [Xn, "$id", "required", "properties"]), i = PA(e.properties, n);
  return yn(i, r);
}
function AA(e) {
  const n = e.reduce((r, i) => ST(i) ? [...r, Je(i)] : r, []);
  return fn(n);
}
function md(e, n) {
  return kn(e) ? Et(_A(e.allOf, n)) : cn(e) ? fn(bA(e.anyOf, n)) : et(e) ? OA(e, n) : yn({});
}
function Ns(e, n, r) {
  const i = An(n) ? AA(n) : n, o = mt(n) ? St(n) : n, t = In(e), a = In(n);
  return Mn(e) ? gA(e, o, r) : Ui(n) ? hA(e, n, r) : t && a ? He("Omit", [e, i], r) : !t && a ? He("Omit", [e, i], r) : t && !a ? He("Omit", [e, i], r) : ue({ ...md(e, o), ...r });
}
function wA(e, n, r) {
  return { [n]: Ns(e, [n], Dn(r)) };
}
function RA(e, n, r) {
  return n.reduce((i, o) => ({ ...i, ...wA(e, o, r) }), {});
}
function $A(e, n, r) {
  return RA(e, n.keys, r);
}
function hA(e, n, r) {
  const i = $A(e, n, r);
  return pn(i);
}
function BA(e, n, r) {
  const i = {};
  for (const o of globalThis.Object.getOwnPropertyNames(e))
    i[o] = qs(e[o], n, Dn(r));
  return i;
}
function MA(e, n, r) {
  return BA(e.properties, n, r);
}
function SA(e, n, r) {
  const i = MA(e, n, r);
  return pn(i);
}
function EA(e, n) {
  return e.map((r) => Td(r, n));
}
function CA(e, n) {
  return e.map((r) => Td(r, n));
}
function jA(e, n) {
  const r = {};
  for (const i of n)
    i in e && (r[i] = e[i]);
  return r;
}
function FA(e, n) {
  const r = hn(e, [Xn, "$id", "required", "properties"]), i = jA(e.properties, n);
  return yn(i, r);
}
function xA(e) {
  const n = e.reduce((r, i) => ST(i) ? [...r, Je(i)] : r, []);
  return fn(n);
}
function Td(e, n) {
  return kn(e) ? Et(EA(e.allOf, n)) : cn(e) ? fn(CA(e.anyOf, n)) : et(e) ? FA(e, n) : yn({});
}
function qs(e, n, r) {
  const i = An(n) ? xA(n) : n, o = mt(n) ? St(n) : n, t = In(e), a = In(n);
  return Mn(e) ? SA(e, o, r) : Ui(n) ? NA(e, n, r) : t && a ? He("Pick", [e, i], r) : !t && a ? He("Pick", [e, i], r) : t && !a ? He("Pick", [e, i], r) : ue({ ...Td(e, o), ...r });
}
function UA(e, n, r) {
  return {
    [n]: qs(e, [n], Dn(r))
  };
}
function DA(e, n, r) {
  return n.reduce((i, o) => ({ ...i, ...UA(e, o, r) }), {});
}
function vA(e, n, r) {
  return DA(e, n.keys, r);
}
function NA(e, n, r) {
  const i = vA(e, n, r);
  return pn(i);
}
function qA(e, n) {
  return He("Partial", [He(e, n)]);
}
function LA(e) {
  return He("Partial", [yo(e)]);
}
function KA(e) {
  const n = {};
  for (const r of globalThis.Object.getOwnPropertyNames(e))
    n[r] = Ki(e[r]);
  return n;
}
function VA(e) {
  const n = hn(e, [Xn, "$id", "required", "properties"]), r = KA(e.properties);
  return yn(r, n);
}
function Pp(e) {
  return e.map((n) => mg(n));
}
function mg(e) {
  return $t(e) ? qA(e.target, e.parameters) : In(e) ? LA(e.$ref) : kn(e) ? Et(Pp(e.allOf)) : cn(e) ? fn(Pp(e.anyOf)) : et(e) ? VA(e) : yn({});
}
function gd(e, n) {
  return Mn(e) ? WA(e, n) : ue({ ...mg(e), ...n });
}
function GA(e, n) {
  const r = {};
  for (const i of globalThis.Object.getOwnPropertyNames(e))
    r[i] = gd(e[i], Dn(n));
  return r;
}
function HA(e, n) {
  return GA(e.properties, n);
}
function WA(e, n) {
  const r = HA(e, n);
  return pn(r);
}
function Vi(e, n, r) {
  return ue({ [ie]: "Record", type: "object", patternProperties: { [e]: n } }, r);
}
function _d(e, n, r) {
  const i = {};
  for (const o of e)
    i[o] = n;
  return yn(i, { ...r, [Os]: "Record" });
}
function zA(e, n, r) {
  return KT(e) ? _d(St(e), n, r) : Vi(e.pattern, n, r);
}
function kA(e, n, r) {
  return _d(St(fn(e)), n, r);
}
function YA(e, n, r) {
  return _d([e.toString()], n, r);
}
function JA(e, n, r) {
  return Vi(e.source, n, r);
}
function ZA(e, n, r) {
  const i = nn(e.pattern) ? ro : e.pattern;
  return Vi(i, n, r);
}
function QA(e, n, r) {
  return Vi(ro, n, r);
}
function XA(e, n, r) {
  return Vi(Jb, n, r);
}
function ew(e, n, r) {
  return Vi(to, n, r);
}
function nw(e, n, r) {
  return Vi(to, n, r);
}
function Tg(e, n, r = {}) {
  return $t(n) ? He("Record", [e, He(n.target, n.parameters)], r) : $t(e) ? He("Record", [He(n.target, n.parameters), n], r) : In(e) ? He("Record", [yo(e.$ref), n]) : cn(e) ? kA(e.anyOf, n, r) : Di(e) ? zA(e, n, r) : ia(e) ? YA(e.const, n, r) : As(e) ? ew(e, n, r) : ws(e) ? nw(e, n, r) : CT(e) ? JA(e, n, r) : Vc(e) ? ZA(e, n, r) : hT(e) ? QA(e, n, r) : oa(e) ? XA(e, n, r) : dn(r);
}
function tw(e, n) {
  return He("Required", [He(e, n)]);
}
function rw(e) {
  return He("Required", [yo(e)]);
}
function iw(e) {
  const n = {};
  for (const r of globalThis.Object.getOwnPropertyNames(e))
    n[r] = hn(e[r], [bt]);
  return n;
}
function ow(e) {
  const n = hn(e, [Xn, "$id", "required", "properties"]), r = iw(e.properties);
  return yn(r, n);
}
function Op(e) {
  return e.map((n) => gg(n));
}
function gg(e) {
  return $t(e) ? tw(e.target, e.parameters) : In(e) ? rw(e.$ref) : kn(e) ? Et(Op(e.allOf)) : cn(e) ? fn(Op(e.anyOf)) : et(e) ? ow(e) : yn({});
}
function bd(e, n) {
  return Mn(e) ? sw(e, n) : ue({ ...gg(e), ...n });
}
function aw(e, n) {
  const r = {};
  for (const i of globalThis.Object.getOwnPropertyNames(e))
    r[i] = bd(e[i], n);
  return r;
}
function uw(e, n) {
  return aw(e.properties, n);
}
function sw(e, n) {
  const r = uw(e, n);
  return pn(r);
}
function cw(e, n) {
  return n.map((r) => In(r) ? _g(e, r.$ref) : Un(e, r));
}
function _g(e, n) {
  return n in e ? In(e[n]) ? _g(e, e[n].$ref) : Un(e, e[n]) : dn();
}
function dw(e) {
  return Fs(e[0]);
}
function pw(e) {
  return js(e[0], e[1]);
}
function fw(e) {
  return ud(e[0]);
}
function yw(e) {
  return gd(e[0]);
}
function lw(e) {
  return Ns(e[0], e[1]);
}
function mw(e) {
  return qs(e[0], e[1]);
}
function Tw(e) {
  return Tg(e[0], e[1]);
}
function gw(e) {
  return bd(e[0]);
}
function _w(e, n, r) {
  const i = cw(e, r);
  return n === "Awaited" ? dw(i) : n === "Index" ? pw(i) : n === "KeyOf" ? fw(i) : n === "Partial" ? yw(i) : n === "Omit" ? lw(i) : n === "Pick" ? mw(i) : n === "Record" ? Tw(i) : n === "Required" ? gw(i) : dn();
}
function bw(e, n) {
  return yn(globalThis.Object.keys(n).reduce((r, i) => ({ ...r, [i]: Un(e, n[i]) }), {}));
}
function Iw(e, n, r) {
  return nd(ca(e, n), Un(e, r));
}
function Pw(e, n, r) {
  return ua(ca(e, n), Un(e, r));
}
function Ow(e, n) {
  return fo(ca(e, n));
}
function Aw(e, n) {
  return Et(ca(e, n));
}
function ww(e, n) {
  return fn(ca(e, n));
}
function Rw(e, n) {
  return Xc(Un(e, n));
}
function $w(e, n) {
  return ed(Un(e, n));
}
function hw(e, n) {
  return ad(Un(e, n));
}
function ca(e, n) {
  return n.map((r) => Un(e, r));
}
function Un(e, n) {
  return (
    // Modifier Unwrap - Reapplied via CreateType Options
    xi(n) ? ue(Un(e, hn(n, [bt])), n) : $T(n) ? ue(Un(e, hn(n, [ta])), n) : (
      // Traveral
      ra(n) ? ue(Rw(e, n.items), n) : vc(n) ? ue($w(e, n.items), n) : $t(n) ? ue(_w(e, n.target, n.parameters)) : Nc(n) ? ue(Iw(e, n.parameters, n.returns), n) : qc(n) ? ue(Pw(e, n.parameters, n.returns), n) : kn(n) ? ue(Aw(e, n.allOf), n) : Lc(n) ? ue(hw(e, n.items), n) : et(n) ? ue(bw(e, n.properties), n) : so(n) ? ue(Ow(e, n.items || []), n) : cn(n) ? ue(ww(e, n.anyOf), n) : n
    )
  );
}
function Bw(e, n) {
  return n in e ? Un(e, e[n]) : dn();
}
function Mw(e) {
  return globalThis.Object.getOwnPropertyNames(e).reduce((n, r) => ({ ...n, [r]: Bw(e, r) }), {});
}
class Sw {
  constructor(n) {
    const r = Mw(n), i = this.WithIdentifiers(r);
    this.$defs = i;
  }
  /** `[Json]` Imports a Type by Key. */
  Import(n, r) {
    const i = { ...this.$defs, [n]: ue(this.$defs[n], r) };
    return ue({ [ie]: "Import", $defs: i, $ref: n });
  }
  // prettier-ignore
  WithIdentifiers(n) {
    return globalThis.Object.getOwnPropertyNames(n).reduce((r, i) => ({ ...r, [i]: { ...n[i], $id: i } }), {});
  }
}
function Ew(e) {
  return new Sw(e);
}
function Cw(e, n) {
  return ue({ [ie]: "Not", not: e }, n);
}
function jw(e, n) {
  return fo(e.parameters, n);
}
function Fw(e) {
  return Li(Ki(e));
}
let xw = 0;
function Uw(e, n = {}) {
  nn(n.$id) && (n.$id = `T${xw++}`);
  const r = lb(e({ [ie]: "This", $ref: `${n.$id}` }));
  return r.$id = n.$id, ue({ [Os]: "Recursive", ...r }, n);
}
function Dw(e, n) {
  const r = ke(e) ? new globalThis.RegExp(e) : e;
  return ue({ [ie]: "RegExp", type: "RegExp", source: r.source, flags: r.flags }, n);
}
function vw(e) {
  return kn(e) ? e.allOf : cn(e) ? e.anyOf : so(e) ? e.items ?? [] : [];
}
function Nw(e) {
  return vw(e);
}
function qw(e, n) {
  return ue(e.returns, n);
}
class Lw {
  constructor(n) {
    this.schema = n;
  }
  Decode(n) {
    return new Kw(this.schema, n);
  }
}
class Kw {
  constructor(n, r) {
    this.schema = n, this.decode = r;
  }
  EncodeTransform(n, r) {
    const t = { Encode: (a) => r[Xn].Encode(n(a)), Decode: (a) => this.decode(r[Xn].Decode(a)) };
    return { ...r, [Xn]: t };
  }
  EncodeSchema(n, r) {
    const i = { Decode: this.decode, Encode: n };
    return { ...r, [Xn]: i };
  }
  Encode(n) {
    return Gc(this.schema) ? this.EncodeTransform(n, this.schema) : this.EncodeSchema(n, this.schema);
  }
}
function Vw(e) {
  return new Lw(e);
}
function Gw(e = {}) {
  return ue({ [ie]: e[ie] ?? "Unsafe" }, e);
}
function Hw(e) {
  return ue({ [ie]: "Void", type: "void" }, e);
}
const Ww = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Any: zo,
  Array: Xc,
  AsyncIterator: ed,
  Awaited: Fs,
  BigInt: od,
  Boolean: GT,
  Capitalize: pA,
  Composite: LP,
  Const: GP,
  Constructor: nd,
  ConstructorParameters: HP,
  Date: ng,
  Enum: WP,
  Exclude: yd,
  Extends: fd,
  Extract: ld,
  Function: ua,
  Index: js,
  InstanceType: eA,
  Integer: nA,
  Intersect: Et,
  Iterator: ad,
  KeyOf: ud,
  Literal: Je,
  Lowercase: fA,
  Mapped: cP,
  Module: Ew,
  Never: dn,
  Not: Cw,
  Null: tg,
  Number: po,
  Object: yn,
  Omit: Ns,
  Optional: Ki,
  Parameters: jw,
  Partial: gd,
  Pick: qs,
  Promise: JT,
  Readonly: Li,
  ReadonlyOptional: Fw,
  Record: Tg,
  Recursive: Uw,
  Ref: yo,
  RegExp: Dw,
  Required: bd,
  Rest: Nw,
  ReturnType: qw,
  String: Jo,
  Symbol: rg,
  TemplateLiteral: WT,
  Transform: Vw,
  Tuple: fo,
  Uint8Array: og,
  Uncapitalize: yA,
  Undefined: ig,
  Union: fn,
  Unknown: sd,
  Unsafe: Gw,
  Uppercase: lA,
  Void: Hw
}, Symbol.toStringTag, { value: "Module" })), A = Ww, zw = (e) => ie in e && e[ie] === "Union", kw = (e) => A.Optional(A.Union([e, A.Null()])), Yw = (e) => A.Omit(e, ["owner"]);
var Jw = {
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
const Zw = (e, n) => {
  const r = n.properties, i = A.Omit(e, Jw.keys(r));
  return A.Composite([i, n]);
};
gt.ExactOptionalPropertyTypes = !0;
const bg = {
  [ie]: "@codelab/Ref"
}, Id = A.Object({
  id: A.String()
}), Qw = (e) => A.Composite([
  A.Object({
    __typename: A.Literal(`${e}`)
  }),
  A.Object({
    // Add this for easier debugging
    name: A.Optional(A.String())
  }),
  Id
]), Xw = A.Object({
  $modelType: A.Literal("serialized")
}), eR = (e) => A.Composite([Xw, e]), nR = {
  [ie]: "@codelab/All"
}, tR = A.Array(A.Not(A.Undefined()), { minItems: 1 }), rR = {
  [ie]: "@codelab/Defined"
}, ht = A.Not(
  A.Union([A.Null(), A.Undefined()])
), iR = {
  [ie]: "@codelab/AllOrNone"
}, oR = A.Union([
  A.Array(ht),
  A.Array(A.Not(ht))
]), aR = {
  [ie]: "@codelab/AtLeastOne"
}, uR = A.Array(A.Any(), {
  contains: ht,
  minContains: 1
}), sR = {
  [ie]: "@codelab/AtMostOne"
}, cR = A.Array(
  A.Union([ht, A.Not(ht)]),
  {
    validate: (e) => e.filter((r) => !!r).length <= 1
  }
), dR = {
  [ie]: "@codelab/ExactlyOne"
}, pR = A.Array(A.Any(), {
  contains: ht,
  minContains: 1,
  maxContains: 1
}), fR = {
  [ie]: "@codelab/Ipv4"
}, yR = A.String({
  format: "ipv4"
}), lR = /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/, mR = (e) => lR.test(e), TR = {
  [ie]: "@codelab/None"
}, gR = A.Array(A.Not(ht));
class _R extends zn {
  constructor(n) {
    super(`Unable to dereference schema with $id '${n.$ref}'`), this.schema = n;
  }
}
function bR(e, n) {
  const r = n.find((i) => i.$id === e.$ref);
  if (r === void 0)
    throw new _R(e);
  return da(r, n);
}
function Ig(e, n) {
  return !na(e.$id) || n.some((r) => r.$id === e.$id) || n.push(e), n;
}
function da(e, n) {
  return e[ie] === "This" || e[ie] === "Ref" ? bR(e, n) : e;
}
class IR extends zn {
  constructor(n) {
    super("Unable to hash value"), this.value = n;
  }
}
var Bn;
(function(e) {
  e[e.Undefined = 0] = "Undefined", e[e.Null = 1] = "Null", e[e.Boolean = 2] = "Boolean", e[e.Number = 3] = "Number", e[e.String = 4] = "String", e[e.Object = 5] = "Object", e[e.Array = 6] = "Array", e[e.Date = 7] = "Date", e[e.Uint8Array = 8] = "Uint8Array", e[e.Symbol = 9] = "Symbol", e[e.BigInt = 10] = "BigInt";
})(Bn || (Bn = {}));
let eo = BigInt("14695981039346656037");
const [PR, OR] = [BigInt("1099511628211"), BigInt(
  "18446744073709551616"
  /* 2 ^ 64 */
)], AR = Array.from({ length: 256 }).map((e, n) => BigInt(n)), Pg = new Float64Array(1), Og = new DataView(Pg.buffer), Ag = new Uint8Array(Pg.buffer);
function* wR(e) {
  const n = e === 0 ? 1 : Math.ceil(Math.floor(Math.log2(e) + 1) / 8);
  for (let r = 0; r < n; r++)
    yield e >> 8 * (n - 1 - r) & 255;
}
function RR(e) {
  ln(Bn.Array);
  for (const n of e)
    oo(n);
}
function $R(e) {
  ln(Bn.Boolean), ln(e ? 1 : 0);
}
function hR(e) {
  ln(Bn.BigInt), Og.setBigInt64(0, e);
  for (const n of Ag)
    ln(n);
}
function BR(e) {
  ln(Bn.Date), oo(e.getTime());
}
function MR(e) {
  ln(Bn.Null);
}
function SR(e) {
  ln(Bn.Number), Og.setFloat64(0, e);
  for (const n of Ag)
    ln(n);
}
function ER(e) {
  ln(Bn.Object);
  for (const n of globalThis.Object.getOwnPropertyNames(e).sort())
    oo(n), oo(e[n]);
}
function CR(e) {
  ln(Bn.String);
  for (let n = 0; n < e.length; n++)
    for (const r of wR(e.charCodeAt(n)))
      ln(r);
}
function jR(e) {
  ln(Bn.Symbol), oo(e.description);
}
function FR(e) {
  ln(Bn.Uint8Array);
  for (let n = 0; n < e.length; n++)
    ln(e[n]);
}
function xR(e) {
  return ln(Bn.Undefined);
}
function oo(e) {
  if (ea(e))
    return RR(e);
  if (xc(e))
    return $R(e);
  if (Uc(e))
    return hR(e);
  if (jc(e))
    return BR(e);
  if (Fc(e))
    return MR();
  if (ji(e))
    return SR(e);
  if (Xo(e))
    return ER(e);
  if (na(e))
    return CR(e);
  if (Dc(e))
    return jR(e);
  if (wT(e))
    return FR(e);
  if (Ps(e))
    return xR();
  throw new IR(e);
}
function ln(e) {
  eo = eo ^ AR[e], eo = eo * PR % OR;
}
function UR(e) {
  return eo = BigInt("14695981039346656037"), oo(e), eo;
}
class DR extends zn {
  constructor(n) {
    super("Unknown type"), this.schema = n;
  }
}
function vR(e) {
  return e[ie] === "Any" || e[ie] === "Unknown";
}
function he(e) {
  return e !== void 0;
}
function NR(e, n, r) {
  return !0;
}
function qR(e, n, r) {
  if (!ea(r) || he(e.minItems) && !(r.length >= e.minItems) || he(e.maxItems) && !(r.length <= e.maxItems) || !r.every((t) => on(e.items, n, t)) || e.uniqueItems === !0 && !function() {
    const t = /* @__PURE__ */ new Set();
    for (const a of r) {
      const u = UR(a);
      if (t.has(u))
        return !1;
      t.add(u);
    }
    return !0;
  }())
    return !1;
  if (!(he(e.contains) || ji(e.minContains) || ji(e.maxContains)))
    return !0;
  const i = he(e.contains) ? e.contains : dn(), o = r.reduce((t, a) => on(i, n, a) ? t + 1 : t, 0);
  return !(o === 0 || ji(e.minContains) && o < e.minContains || ji(e.maxContains) && o > e.maxContains);
}
function LR(e, n, r) {
  return mb(r);
}
function KR(e, n, r) {
  return !(!Uc(r) || he(e.exclusiveMaximum) && !(r < e.exclusiveMaximum) || he(e.exclusiveMinimum) && !(r > e.exclusiveMinimum) || he(e.maximum) && !(r <= e.maximum) || he(e.minimum) && !(r >= e.minimum) || he(e.multipleOf) && r % e.multipleOf !== BigInt(0));
}
function VR(e, n, r) {
  return xc(r);
}
function GR(e, n, r) {
  return on(e.returns, n, r.prototype);
}
function HR(e, n, r) {
  return !(!jc(r) || he(e.exclusiveMaximumTimestamp) && !(r.getTime() < e.exclusiveMaximumTimestamp) || he(e.exclusiveMinimumTimestamp) && !(r.getTime() > e.exclusiveMinimumTimestamp) || he(e.maximumTimestamp) && !(r.getTime() <= e.maximumTimestamp) || he(e.minimumTimestamp) && !(r.getTime() >= e.minimumTimestamp) || he(e.multipleOfTimestamp) && r.getTime() % e.multipleOfTimestamp !== 0);
}
function WR(e, n, r) {
  return RT(r);
}
function zR(e, n, r) {
  const i = globalThis.Object.values(e.$defs), o = e.$defs[e.$ref];
  return on(o, [...n, ...i], r);
}
function kR(e, n, r) {
  return !(!Pb(r) || he(e.exclusiveMaximum) && !(r < e.exclusiveMaximum) || he(e.exclusiveMinimum) && !(r > e.exclusiveMinimum) || he(e.maximum) && !(r <= e.maximum) || he(e.minimum) && !(r >= e.minimum) || he(e.multipleOf) && r % e.multipleOf !== 0);
}
function YR(e, n, r) {
  const i = e.allOf.every((o) => on(o, n, r));
  if (e.unevaluatedProperties === !1) {
    const o = new RegExp(Tp(e)), t = Object.getOwnPropertyNames(r).every((a) => o.test(a));
    return i && t;
  } else if (mt(e.unevaluatedProperties)) {
    const o = new RegExp(Tp(e)), t = Object.getOwnPropertyNames(r).every((a) => o.test(a) || on(e.unevaluatedProperties, n, r[a]));
    return i && t;
  } else
    return i;
}
function JR(e, n, r) {
  return Tb(r);
}
function ZR(e, n, r) {
  return r === e.const;
}
function QR(e, n, r) {
  return !1;
}
function XR(e, n, r) {
  return !on(e.not, n, r);
}
function e$(e, n, r) {
  return Fc(r);
}
function n$(e, n, r) {
  return !(!gt.IsNumberLike(r) || he(e.exclusiveMaximum) && !(r < e.exclusiveMaximum) || he(e.exclusiveMinimum) && !(r > e.exclusiveMinimum) || he(e.minimum) && !(r >= e.minimum) || he(e.maximum) && !(r <= e.maximum) || he(e.multipleOf) && r % e.multipleOf !== 0);
}
function t$(e, n, r) {
  if (!gt.IsObjectLike(r) || he(e.minProperties) && !(Object.getOwnPropertyNames(r).length >= e.minProperties) || he(e.maxProperties) && !(Object.getOwnPropertyNames(r).length <= e.maxProperties))
    return !1;
  const i = Object.getOwnPropertyNames(e.properties);
  for (const o of i) {
    const t = e.properties[o];
    if (e.required && e.required.includes(o)) {
      if (!on(t, n, r[o]) || (vs(t) || vR(t)) && !(o in r))
        return !1;
    } else if (gt.IsExactOptionalProperty(r, o) && !on(t, n, r[o]))
      return !1;
  }
  if (e.additionalProperties === !1) {
    const o = Object.getOwnPropertyNames(r);
    return e.required && e.required.length === i.length && o.length === i.length ? !0 : o.every((t) => i.includes(t));
  } else return typeof e.additionalProperties == "object" ? Object.getOwnPropertyNames(r).every((t) => i.includes(t) || on(e.additionalProperties, n, r[t])) : !0;
}
function r$(e, n, r) {
  return gb(r);
}
function i$(e, n, r) {
  if (!gt.IsRecordLike(r) || he(e.minProperties) && !(Object.getOwnPropertyNames(r).length >= e.minProperties) || he(e.maxProperties) && !(Object.getOwnPropertyNames(r).length <= e.maxProperties))
    return !1;
  const [i, o] = Object.entries(e.patternProperties)[0], t = new RegExp(i), a = Object.entries(r).every(([s, f]) => t.test(s) ? on(o, n, f) : !0), u = typeof e.additionalProperties == "object" ? Object.entries(r).every(([s, f]) => t.test(s) ? !0 : on(e.additionalProperties, n, f)) : !0, d = e.additionalProperties === !1 ? Object.getOwnPropertyNames(r).every((s) => t.test(s)) : !0;
  return a && u && d;
}
function o$(e, n, r) {
  return on(da(e, n), n, r);
}
function a$(e, n, r) {
  const i = new RegExp(e.source, e.flags);
  return he(e.minLength) && !(r.length >= e.minLength) || he(e.maxLength) && !(r.length <= e.maxLength) ? !1 : i.test(r);
}
function u$(e, n, r) {
  return !na(r) || he(e.minLength) && !(r.length >= e.minLength) || he(e.maxLength) && !(r.length <= e.maxLength) || he(e.pattern) && !new RegExp(e.pattern).test(r) ? !1 : he(e.format) ? Zb(e.format) ? Xb(e.format)(r) : !1 : !0;
}
function s$(e, n, r) {
  return Dc(r);
}
function c$(e, n, r) {
  return na(r) && new RegExp(e.pattern).test(r);
}
function d$(e, n, r) {
  return on(da(e, n), n, r);
}
function p$(e, n, r) {
  if (!ea(r) || e.items === void 0 && r.length !== 0 || r.length !== e.maxItems)
    return !1;
  if (!e.items)
    return !0;
  for (let i = 0; i < e.items.length; i++)
    if (!on(e.items[i], n, r[i]))
      return !1;
  return !0;
}
function f$(e, n, r) {
  return Ps(r);
}
function y$(e, n, r) {
  return e.anyOf.some((i) => on(i, n, r));
}
function l$(e, n, r) {
  return !(!wT(r) || he(e.maxByteLength) && !(r.length <= e.maxByteLength) || he(e.minByteLength) && !(r.length >= e.minByteLength));
}
function m$(e, n, r) {
  return !0;
}
function T$(e, n, r) {
  return gt.IsVoidLike(r);
}
function g$(e, n, r) {
  return Es(e[ie]) ? nI(e[ie])(e, r) : !1;
}
function on(e, n, r) {
  const i = he(e.$id) ? Ig(e, n) : n, o = e;
  switch (o[ie]) {
    case "Any":
      return NR();
    case "Array":
      return qR(o, i, r);
    case "AsyncIterator":
      return LR(o, i, r);
    case "BigInt":
      return KR(o, i, r);
    case "Boolean":
      return VR(o, i, r);
    case "Constructor":
      return GR(o, i, r);
    case "Date":
      return HR(o, i, r);
    case "Function":
      return WR(o, i, r);
    case "Import":
      return zR(o, i, r);
    case "Integer":
      return kR(o, i, r);
    case "Intersect":
      return YR(o, i, r);
    case "Iterator":
      return JR(o, i, r);
    case "Literal":
      return ZR(o, i, r);
    case "Never":
      return QR();
    case "Not":
      return XR(o, i, r);
    case "Null":
      return e$(o, i, r);
    case "Number":
      return n$(o, i, r);
    case "Object":
      return t$(o, i, r);
    case "Promise":
      return r$(o, i, r);
    case "Record":
      return i$(o, i, r);
    case "Ref":
      return o$(o, i, r);
    case "RegExp":
      return a$(o, i, r);
    case "String":
      return u$(o, i, r);
    case "Symbol":
      return s$(o, i, r);
    case "TemplateLiteral":
      return c$(o, i, r);
    case "This":
      return d$(o, i, r);
    case "Tuple":
      return p$(o, i, r);
    case "Undefined":
      return f$(o, i, r);
    case "Union":
      return y$(o, i, r);
    case "Uint8Array":
      return l$(o, i, r);
    case "Unknown":
      return m$();
    case "Void":
      return T$(o, i, r);
    default:
      if (!Es(o[ie]))
        throw new DR(o);
      return g$(o, i, r);
  }
}
function wg(...e) {
  return e.length === 3 ? on(e[0], e[1], e[2]) : on(e[0], [], e[1]);
}
function _$(e) {
  const n = {};
  for (const r of Object.getOwnPropertyNames(e))
    n[r] = ao(e[r]);
  for (const r of Object.getOwnPropertySymbols(e))
    n[r] = ao(e[r]);
  return n;
}
function b$(e) {
  return e.map((n) => ao(n));
}
function I$(e) {
  return e.slice();
}
function P$(e) {
  return new Map(ao([...e.entries()]));
}
function O$(e) {
  return new Set(ao([...e.entries()]));
}
function A$(e) {
  return new Date(e.toISOString());
}
function ao(e) {
  if (ea(e))
    return b$(e);
  if (jc(e))
    return A$(e);
  if (Ib(e))
    return I$(e);
  if (_b(e))
    return P$(e);
  if (bb(e))
    return O$(e);
  if (Xo(e))
    return _$(e);
  if (Ob(e))
    return e;
  throw new Error("ValueClone: Unable to clone value");
}
class Wn extends zn {
  constructor(n, r) {
    super(r), this.schema = n;
  }
}
function je(e) {
  return RT(e) ? e() : ao(e);
}
function w$(e, n) {
  return Se(e, "default") ? je(e.default) : {};
}
function R$(e, n) {
  if (e.uniqueItems === !0 && !Se(e, "default"))
    throw new Wn(e, "Array with the uniqueItems constraint requires a default value");
  if ("contains" in e && !Se(e, "default"))
    throw new Wn(e, "Array with the contains constraint requires a default value");
  return "default" in e ? je(e.default) : e.minItems !== void 0 ? Array.from({ length: e.minItems }).map((r) => On(e.items, n)) : [];
}
function $$(e, n) {
  return Se(e, "default") ? je(e.default) : async function* () {
  }();
}
function h$(e, n) {
  return Se(e, "default") ? je(e.default) : BigInt(0);
}
function B$(e, n) {
  return Se(e, "default") ? je(e.default) : !1;
}
function M$(e, n) {
  if (Se(e, "default"))
    return je(e.default);
  {
    const r = On(e.returns, n);
    return typeof r == "object" && !Array.isArray(r) ? class {
      constructor() {
        for (const [i, o] of Object.entries(r)) {
          const t = this;
          t[i] = o;
        }
      }
    } : class {
    };
  }
}
function S$(e, n) {
  return Se(e, "default") ? je(e.default) : e.minimumTimestamp !== void 0 ? new Date(e.minimumTimestamp) : /* @__PURE__ */ new Date();
}
function E$(e, n) {
  return Se(e, "default") ? je(e.default) : () => On(e.returns, n);
}
function C$(e, n) {
  const r = globalThis.Object.values(e.$defs), i = e.$defs[e.$ref];
  return On(i, [...n, ...r]);
}
function j$(e, n) {
  return Se(e, "default") ? je(e.default) : e.minimum !== void 0 ? e.minimum : 0;
}
function F$(e, n) {
  if (Se(e, "default"))
    return je(e.default);
  {
    const r = e.allOf.reduce((i, o) => {
      const t = On(o, n);
      return typeof t == "object" ? { ...i, ...t } : t;
    }, {});
    if (!wg(e, n, r))
      throw new Wn(e, "Intersect produced invalid value. Consider using a default value.");
    return r;
  }
}
function x$(e, n) {
  return Se(e, "default") ? je(e.default) : function* () {
  }();
}
function U$(e, n) {
  return Se(e, "default") ? je(e.default) : e.const;
}
function D$(e, n) {
  if (Se(e, "default"))
    return je(e.default);
  throw new Wn(e, "Never types cannot be created. Consider using a default value.");
}
function v$(e, n) {
  if (Se(e, "default"))
    return je(e.default);
  throw new Wn(e, "Not types must have a default value");
}
function N$(e, n) {
  return Se(e, "default") ? je(e.default) : null;
}
function q$(e, n) {
  return Se(e, "default") ? je(e.default) : e.minimum !== void 0 ? e.minimum : 0;
}
function L$(e, n) {
  if (Se(e, "default"))
    return je(e.default);
  {
    const r = new Set(e.required), i = {};
    for (const [o, t] of Object.entries(e.properties))
      r.has(o) && (i[o] = On(t, n));
    return i;
  }
}
function K$(e, n) {
  return Se(e, "default") ? je(e.default) : Promise.resolve(On(e.item, n));
}
function V$(e, n) {
  const [r, i] = Object.entries(e.patternProperties)[0];
  if (Se(e, "default"))
    return je(e.default);
  if (r === ro || r === to)
    return {};
  {
    const o = r.slice(1, r.length - 1).split("|"), t = {};
    for (const a of o)
      t[a] = On(i, n);
    return t;
  }
}
function G$(e, n) {
  return Se(e, "default") ? je(e.default) : On(da(e, n), n);
}
function H$(e, n) {
  if (Se(e, "default"))
    return je(e.default);
  throw new Wn(e, "RegExp types cannot be created. Consider using a default value.");
}
function W$(e, n) {
  if (e.pattern !== void 0) {
    if (Se(e, "default"))
      return je(e.default);
    throw new Wn(e, "String types with patterns must specify a default value");
  } else if (e.format !== void 0) {
    if (Se(e, "default"))
      return je(e.default);
    throw new Wn(e, "String types with formats must specify a default value");
  } else
    return Se(e, "default") ? je(e.default) : e.minLength !== void 0 ? Array.from({ length: e.minLength }).map(() => " ").join("") : "";
}
function z$(e, n) {
  return Se(e, "default") ? je(e.default) : "value" in e ? Symbol.for(e.value) : Symbol();
}
function k$(e, n) {
  if (Se(e, "default"))
    return je(e.default);
  if (!KT(e))
    throw new Wn(e, "Can only create template literals that produce a finite variants. Consider using a default value.");
  return id(e)[0];
}
function Y$(e, n) {
  if (Rg++ > rh)
    throw new Wn(e, "Cannot create recursive type as it appears possibly infinite. Consider using a default.");
  return Se(e, "default") ? je(e.default) : On(da(e, n), n);
}
function J$(e, n) {
  return Se(e, "default") ? je(e.default) : e.items === void 0 ? [] : Array.from({ length: e.minItems }).map((r, i) => On(e.items[i], n));
}
function Z$(e, n) {
  if (Se(e, "default"))
    return je(e.default);
}
function Q$(e, n) {
  if (Se(e, "default"))
    return je(e.default);
  if (e.anyOf.length === 0)
    throw new Error("ValueCreate.Union: Cannot create Union with zero variants");
  return On(e.anyOf[0], n);
}
function X$(e, n) {
  return Se(e, "default") ? je(e.default) : e.minByteLength !== void 0 ? new Uint8Array(e.minByteLength) : new Uint8Array(0);
}
function eh(e, n) {
  return Se(e, "default") ? je(e.default) : {};
}
function nh(e, n) {
  if (Se(e, "default"))
    return je(e.default);
}
function th(e, n) {
  if (Se(e, "default"))
    return je(e.default);
  throw new Error("User defined types must specify a default value");
}
function On(e, n) {
  const r = Ig(e, n), i = e;
  switch (i[ie]) {
    case "Any":
      return w$(i);
    case "Array":
      return R$(i, r);
    case "AsyncIterator":
      return $$(i);
    case "BigInt":
      return h$(i);
    case "Boolean":
      return B$(i);
    case "Constructor":
      return M$(i, r);
    case "Date":
      return S$(i);
    case "Function":
      return E$(i, r);
    case "Import":
      return C$(i, r);
    case "Integer":
      return j$(i);
    case "Intersect":
      return F$(i, r);
    case "Iterator":
      return x$(i);
    case "Literal":
      return U$(i);
    case "Never":
      return D$(i);
    case "Not":
      return v$(i);
    case "Null":
      return N$(i);
    case "Number":
      return q$(i);
    case "Object":
      return L$(i, r);
    case "Promise":
      return K$(i, r);
    case "Record":
      return V$(i, r);
    case "Ref":
      return G$(i, r);
    case "RegExp":
      return H$(i);
    case "String":
      return W$(i);
    case "Symbol":
      return z$(i);
    case "TemplateLiteral":
      return k$(i);
    case "This":
      return Y$(i, r);
    case "Tuple":
      return J$(i, r);
    case "Undefined":
      return Z$(i);
    case "Union":
      return Q$(i, r);
    case "Uint8Array":
      return X$(i);
    case "Unknown":
      return eh(i);
    case "Void":
      return nh(i);
    default:
      if (!Es(i[ie]))
        throw new Wn(i, "Unknown type");
      return th(i);
  }
}
const rh = 512;
let Rg = 0;
function $g(...e) {
  return Rg = 0, e.length === 2 ? On(e[0], e[1]) : On(e[0], []);
}
function ih(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function oh(e) {
  if (e.__esModule) return e;
  var n = e.default;
  if (typeof n == "function") {
    var r = function i() {
      return this instanceof i ? Reflect.construct(n, arguments, this.constructor) : n.apply(this, arguments);
    };
    r.prototype = n.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(e).forEach(function(i) {
    var o = Object.getOwnPropertyDescriptor(e, i);
    Object.defineProperty(r, i, o.get ? o : {
      enumerable: !0,
      get: function() {
        return e[i];
      }
    });
  }), r;
}
var vt = {}, Bo = {}, Nt = {}, qt = {}, Zn = {}, Lt = {}, Mo = {}, Kt = {}, $e = {}, Ap;
function Pd() {
  if (Ap) return $e;
  Ap = 1, Object.defineProperty($e, "__esModule", { value: !0 }), $e.IsAsyncIterator = e, $e.IsIterator = n, $e.IsStandardObject = r, $e.IsInstanceObject = i, $e.IsPromise = o, $e.IsDate = t, $e.IsMap = a, $e.IsSet = u, $e.IsRegExp = d, $e.IsTypedArray = s, $e.IsInt8Array = f, $e.IsUint8Array = c, $e.IsUint8ClampedArray = y, $e.IsInt16Array = w, $e.IsUint16Array = h, $e.IsInt32Array = M, $e.IsUint32Array = U, $e.IsFloat32Array = F, $e.IsFloat64Array = C, $e.IsBigInt64Array = G, $e.IsBigUint64Array = $, $e.HasPropertyKey = _, $e.IsObject = x, $e.IsArray = T, $e.IsUndefined = P, $e.IsNull = R, $e.IsBoolean = l, $e.IsNumber = B, $e.IsInteger = S, $e.IsBigInt = q, $e.IsString = V, $e.IsFunction = k, $e.IsSymbol = ne, $e.IsValueType = re;
  function e(W) {
    return x(W) && Symbol.asyncIterator in W;
  }
  function n(W) {
    return x(W) && Symbol.iterator in W;
  }
  function r(W) {
    return x(W) && (Object.getPrototypeOf(W) === Object.prototype || Object.getPrototypeOf(W) === null);
  }
  function i(W) {
    return x(W) && !T(W) && k(W.constructor) && W.constructor.name !== "Object";
  }
  function o(W) {
    return W instanceof Promise;
  }
  function t(W) {
    return W instanceof Date && Number.isFinite(W.getTime());
  }
  function a(W) {
    return W instanceof globalThis.Map;
  }
  function u(W) {
    return W instanceof globalThis.Set;
  }
  function d(W) {
    return W instanceof globalThis.RegExp;
  }
  function s(W) {
    return ArrayBuffer.isView(W);
  }
  function f(W) {
    return W instanceof globalThis.Int8Array;
  }
  function c(W) {
    return W instanceof globalThis.Uint8Array;
  }
  function y(W) {
    return W instanceof globalThis.Uint8ClampedArray;
  }
  function w(W) {
    return W instanceof globalThis.Int16Array;
  }
  function h(W) {
    return W instanceof globalThis.Uint16Array;
  }
  function M(W) {
    return W instanceof globalThis.Int32Array;
  }
  function U(W) {
    return W instanceof globalThis.Uint32Array;
  }
  function F(W) {
    return W instanceof globalThis.Float32Array;
  }
  function C(W) {
    return W instanceof globalThis.Float64Array;
  }
  function G(W) {
    return W instanceof globalThis.BigInt64Array;
  }
  function $(W) {
    return W instanceof globalThis.BigUint64Array;
  }
  function _(W, we) {
    return we in W;
  }
  function x(W) {
    return W !== null && typeof W == "object";
  }
  function T(W) {
    return Array.isArray(W) && !ArrayBuffer.isView(W);
  }
  function P(W) {
    return W === void 0;
  }
  function R(W) {
    return W === null;
  }
  function l(W) {
    return typeof W == "boolean";
  }
  function B(W) {
    return typeof W == "number";
  }
  function S(W) {
    return Number.isInteger(W);
  }
  function q(W) {
    return typeof W == "bigint";
  }
  function V(W) {
    return typeof W == "string";
  }
  function k(W) {
    return typeof W == "function";
  }
  function ne(W) {
    return typeof W == "symbol";
  }
  function re(W) {
    return q(W) || l(W) || R(W) || B(W) || V(W) || ne(W) || P(W);
  }
  return $e;
}
var wp;
function tn() {
  return wp || (wp = 1, function(e) {
    var n = Kt && Kt.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Kt && Kt.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Pd(), e);
  }(Kt)), Kt;
}
var Rp;
function Ls() {
  if (Rp) return Mo;
  Rp = 1, Object.defineProperty(Mo, "__esModule", { value: !0 }), Mo.TypeSystemPolicy = void 0;
  const e = /* @__PURE__ */ tn();
  var n;
  return function(r) {
    r.InstanceMode = "default", r.ExactOptionalPropertyTypes = !1, r.AllowArrayObject = !1, r.AllowNaN = !1, r.AllowNullVoid = !1;
    function i(d, s) {
      return r.ExactOptionalPropertyTypes ? s in d : d[s] !== void 0;
    }
    r.IsExactOptionalProperty = i;
    function o(d) {
      const s = (0, e.IsObject)(d);
      return r.AllowArrayObject ? s : s && !(0, e.IsArray)(d);
    }
    r.IsObjectLike = o;
    function t(d) {
      return o(d) && !(d instanceof Date) && !(d instanceof Uint8Array);
    }
    r.IsRecordLike = t;
    function a(d) {
      return r.AllowNaN ? (0, e.IsNumber)(d) : Number.isFinite(d);
    }
    r.IsNumberLike = a;
    function u(d) {
      const s = (0, e.IsUndefined)(d);
      return r.AllowNullVoid ? s || d === null : s;
    }
    r.IsVoidLike = u;
  }(n || (Mo.TypeSystemPolicy = n = {})), Mo;
}
var it = {}, Vt = {}, ot = {}, $p;
function ah() {
  if ($p) return ot;
  $p = 1, Object.defineProperty(ot, "__esModule", { value: !0 }), ot.Entries = n, ot.Clear = r, ot.Delete = i, ot.Has = o, ot.Set = t, ot.Get = a;
  const e = /* @__PURE__ */ new Map();
  function n() {
    return new Map(e);
  }
  function r() {
    return e.clear();
  }
  function i(u) {
    return e.delete(u);
  }
  function o(u) {
    return e.has(u);
  }
  function t(u, d) {
    e.set(u, d);
  }
  function a(u) {
    return e.get(u);
  }
  return ot;
}
var at = {}, hp;
function uh() {
  if (hp) return at;
  hp = 1, Object.defineProperty(at, "__esModule", { value: !0 }), at.Entries = n, at.Clear = r, at.Delete = i, at.Has = o, at.Set = t, at.Get = a;
  const e = /* @__PURE__ */ new Map();
  function n() {
    return new Map(e);
  }
  function r() {
    return e.clear();
  }
  function i(u) {
    return e.delete(u);
  }
  function o(u) {
    return e.has(u);
  }
  function t(u, d) {
    e.set(u, d);
  }
  function a(u) {
    return e.get(u);
  }
  return at;
}
var Bp;
function To() {
  return Bp || (Bp = 1, Object.defineProperty(Vt, "__esModule", { value: !0 }), Vt.TypeRegistry = Vt.FormatRegistry = void 0, Vt.FormatRegistry = ah(), Vt.TypeRegistry = uh()), Vt;
}
var Gt = {}, Ra = {}, $a = {}, ha = {}, en = {}, Mp;
function Sn() {
  if (Mp) return en;
  Mp = 1, Object.defineProperty(en, "__esModule", { value: !0 }), en.HasPropertyKey = e, en.IsAsyncIterator = n, en.IsArray = r, en.IsBigInt = i, en.IsBoolean = o, en.IsDate = t, en.IsFunction = a, en.IsIterator = u, en.IsNull = d, en.IsNumber = s, en.IsObject = f, en.IsRegExp = c, en.IsString = y, en.IsSymbol = w, en.IsUint8Array = h, en.IsUndefined = M;
  function e(U, F) {
    return F in U;
  }
  function n(U) {
    return f(U) && !r(U) && !h(U) && Symbol.asyncIterator in U;
  }
  function r(U) {
    return Array.isArray(U);
  }
  function i(U) {
    return typeof U == "bigint";
  }
  function o(U) {
    return typeof U == "boolean";
  }
  function t(U) {
    return U instanceof globalThis.Date;
  }
  function a(U) {
    return typeof U == "function";
  }
  function u(U) {
    return f(U) && !r(U) && !h(U) && Symbol.iterator in U;
  }
  function d(U) {
    return U === null;
  }
  function s(U) {
    return typeof U == "number";
  }
  function f(U) {
    return typeof U == "object" && U !== null;
  }
  function c(U) {
    return U instanceof globalThis.RegExp;
  }
  function y(U) {
    return typeof U == "string";
  }
  function w(U) {
    return typeof U == "symbol";
  }
  function h(U) {
    return U instanceof globalThis.Uint8Array;
  }
  function M(U) {
    return U === void 0;
  }
  return en;
}
var Sp;
function sh() {
  if (Sp) return ha;
  Sp = 1, Object.defineProperty(ha, "__esModule", { value: !0 }), ha.Immutable = a;
  const e = /* @__PURE__ */ Sn();
  function n(u) {
    return globalThis.Object.freeze(u).map((d) => a(d));
  }
  function r(u) {
    return u;
  }
  function i(u) {
    return u;
  }
  function o(u) {
    return u;
  }
  function t(u) {
    const d = {};
    for (const s of Object.getOwnPropertyNames(u))
      d[s] = a(u[s]);
    for (const s of Object.getOwnPropertySymbols(u))
      d[s] = a(u[s]);
    return globalThis.Object.freeze(d);
  }
  function a(u) {
    return e.IsArray(u) ? n(u) : e.IsDate(u) ? u : e.IsUint8Array(u) ? u : e.IsRegExp(u) ? u : e.IsObject(u) ? t(u) : u;
  }
  return ha;
}
var Ba = {}, Ep;
function En() {
  if (Ep) return Ba;
  Ep = 1, Object.defineProperty(Ba, "__esModule", { value: !0 }), Ba.Clone = u;
  const e = /* @__PURE__ */ Sn();
  function n(d) {
    return d.map((s) => a(s));
  }
  function r(d) {
    return new Date(d.getTime());
  }
  function i(d) {
    return new Uint8Array(d);
  }
  function o(d) {
    return new RegExp(d.source, d.flags);
  }
  function t(d) {
    const s = {};
    for (const f of Object.getOwnPropertyNames(d))
      s[f] = a(d[f]);
    for (const f of Object.getOwnPropertySymbols(d))
      s[f] = a(d[f]);
    return s;
  }
  function a(d) {
    return e.IsArray(d) ? n(d) : e.IsDate(d) ? r(d) : e.IsUint8Array(d) ? i(d) : e.IsRegExp(d) ? o(d) : e.IsObject(d) ? t(d) : d;
  }
  function u(d) {
    return a(d);
  }
  return Ba;
}
var Cp;
function me() {
  if (Cp) return $a;
  Cp = 1, Object.defineProperty($a, "__esModule", { value: !0 }), $a.CreateType = i;
  const e = /* @__PURE__ */ Ls(), n = /* @__PURE__ */ sh(), r = /* @__PURE__ */ En();
  function i(o, t) {
    const a = t !== void 0 ? { ...t, ...o } : o;
    switch (e.TypeSystemPolicy.InstanceMode) {
      case "freeze":
        return (0, n.Immutable)(a);
      case "clone":
        return (0, r.Clone)(a);
      default:
        return a;
    }
  }
  return $a;
}
var Ht = {}, Rn = {}, jp;
function Ks() {
  return jp || (jp = 1, Object.defineProperty(Rn, "__esModule", { value: !0 }), Rn.Kind = Rn.Hint = Rn.OptionalKind = Rn.ReadonlyKind = Rn.TransformKind = void 0, Rn.TransformKind = Symbol.for("TypeBox.Transform"), Rn.ReadonlyKind = Symbol.for("TypeBox.Readonly"), Rn.OptionalKind = Symbol.for("TypeBox.Optional"), Rn.Hint = Symbol.for("TypeBox.Hint"), Rn.Kind = Symbol.for("TypeBox.Kind")), Rn;
}
var Fp;
function de() {
  return Fp || (Fp = 1, function(e) {
    var n = Ht && Ht.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Ht && Ht.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Ks(), e);
  }(Ht)), Ht;
}
var xp;
function ch() {
  if (xp) return Ra;
  xp = 1, Object.defineProperty(Ra, "__esModule", { value: !0 }), Ra.Unsafe = r;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ de();
  function r(i = {}) {
    return (0, e.CreateType)({ [n.Kind]: i[n.Kind] ?? "Unsafe" }, i);
  }
  return Ra;
}
var Up;
function Vs() {
  return Up || (Up = 1, function(e) {
    var n = Gt && Gt.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Gt && Gt.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ ch(), e);
  }(Gt)), Gt;
}
var Wt = {}, So = {}, Dp;
function hg() {
  if (Dp) return So;
  Dp = 1, Object.defineProperty(So, "__esModule", { value: !0 }), So.TypeBoxError = void 0;
  class e extends Error {
    constructor(r) {
      super(r);
    }
  }
  return So.TypeBoxError = e, So;
}
var vp;
function ze() {
  return vp || (vp = 1, function(e) {
    var n = Wt && Wt.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Wt && Wt.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ hg(), e);
  }(Wt)), Wt;
}
var Np;
function dh() {
  if (Np) return it;
  Np = 1, Object.defineProperty(it, "__esModule", { value: !0 }), it.TypeSystem = it.TypeSystemDuplicateFormat = it.TypeSystemDuplicateTypeKind = void 0;
  const e = /* @__PURE__ */ To(), n = /* @__PURE__ */ Vs(), r = /* @__PURE__ */ de(), i = /* @__PURE__ */ ze();
  class o extends i.TypeBoxError {
    constructor(d) {
      super(`Duplicate type kind '${d}' detected`);
    }
  }
  it.TypeSystemDuplicateTypeKind = o;
  class t extends i.TypeBoxError {
    constructor(d) {
      super(`Duplicate string format '${d}' detected`);
    }
  }
  it.TypeSystemDuplicateFormat = t;
  var a;
  return function(u) {
    function d(f, c) {
      if (e.TypeRegistry.Has(f))
        throw new o(f);
      return e.TypeRegistry.Set(f, c), (y = {}) => (0, n.Unsafe)({ ...y, [r.Kind]: f });
    }
    u.Type = d;
    function s(f, c) {
      if (e.FormatRegistry.Has(f))
        throw new t(f);
      return e.FormatRegistry.Set(f, c), f;
    }
    u.Format = s;
  }(a || (it.TypeSystem = a = {})), it;
}
var qp;
function Od() {
  return qp || (qp = 1, function(e) {
    var n = Lt && Lt.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Lt && Lt.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Ls(), e), r(/* @__PURE__ */ dh(), e);
  }(Lt)), Lt;
}
var zt = {}, Ma = {}, kt = {}, Sa = {}, Lp;
function ph() {
  if (Lp) return Sa;
  Lp = 1, Object.defineProperty(Sa, "__esModule", { value: !0 }), Sa.MappedKey = r;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ de();
  function r(i) {
    return (0, e.CreateType)({
      [n.Kind]: "MappedKey",
      keys: i
    });
  }
  return Sa;
}
var Ea = {}, Kp;
function Bg() {
  if (Kp) return Ea;
  Kp = 1, Object.defineProperty(Ea, "__esModule", { value: !0 }), Ea.MappedResult = r;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ de();
  function r(i) {
    return (0, e.CreateType)({
      [n.Kind]: "MappedResult",
      properties: i
    });
  }
  return Ea;
}
var Eo = {}, Yt = {}, Ca = {}, Vp;
function Ad() {
  if (Vp) return Ca;
  Vp = 1, Object.defineProperty(Ca, "__esModule", { value: !0 }), Ca.Discard = n;
  function e(r, i) {
    const { [i]: o, ...t } = r;
    return t;
  }
  function n(r, i) {
    return i.reduce((o, t) => e(o, t), r);
  }
  return Ca;
}
var Gp;
function Ct() {
  return Gp || (Gp = 1, function(e) {
    var n = Yt && Yt.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Yt && Yt.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Ad(), e);
  }(Yt)), Yt;
}
var Jt = {}, ja = {}, Hp;
function fh() {
  if (Hp) return ja;
  Hp = 1, Object.defineProperty(ja, "__esModule", { value: !0 }), ja.Array = r;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ de();
  function r(i, o) {
    return (0, e.CreateType)({ [n.Kind]: "Array", type: "array", items: i }, o);
  }
  return ja;
}
var Wp;
function pa() {
  return Wp || (Wp = 1, function(e) {
    var n = Jt && Jt.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Jt && Jt.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ fh(), e);
  }(Jt)), Jt;
}
var Zt = {}, Fa = {}, zp;
function yh() {
  if (zp) return Fa;
  zp = 1, Object.defineProperty(Fa, "__esModule", { value: !0 }), Fa.AsyncIterator = r;
  const e = /* @__PURE__ */ de(), n = /* @__PURE__ */ me();
  function r(i, o) {
    return (0, n.CreateType)({ [e.Kind]: "AsyncIterator", type: "AsyncIterator", items: i }, o);
  }
  return Fa;
}
var kp;
function fa() {
  return kp || (kp = 1, function(e) {
    var n = Zt && Zt.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Zt && Zt.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ yh(), e);
  }(Zt)), Zt;
}
var Qt = {}, xa = {}, Yp;
function lh() {
  if (Yp) return xa;
  Yp = 1, Object.defineProperty(xa, "__esModule", { value: !0 }), xa.Constructor = r;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ de();
  function r(i, o, t) {
    return (0, e.CreateType)({ [n.Kind]: "Constructor", type: "Constructor", parameters: i, returns: o }, t);
  }
  return xa;
}
var Jp;
function ya() {
  return Jp || (Jp = 1, function(e) {
    var n = Qt && Qt.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Qt && Qt.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ lh(), e);
  }(Qt)), Qt;
}
var Xt = {}, Ua = {}, Zp;
function mh() {
  if (Zp) return Ua;
  Zp = 1, Object.defineProperty(Ua, "__esModule", { value: !0 }), Ua.Function = r;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ de();
  function r(i, o, t) {
    return (0, e.CreateType)({ [n.Kind]: "Function", type: "Function", parameters: i, returns: o }, t);
  }
  return Ua;
}
var Qp;
function Gi() {
  return Qp || (Qp = 1, function(e) {
    var n = Xt && Xt.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Xt && Xt.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ mh(), e);
  }(Xt)), Xt;
}
var er = {}, Da = {}, nr = {}, tr = {}, va = {}, rr = {}, Xp;
function jt() {
  return Xp || (Xp = 1, function(e) {
    var n = rr && rr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = rr && rr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ me(), e);
  }(rr)), rr;
}
var ef;
function Th() {
  if (ef) return va;
  ef = 1, Object.defineProperty(va, "__esModule", { value: !0 }), va.Computed = r;
  const e = /* @__PURE__ */ jt(), n = /* @__PURE__ */ Ks();
  function r(i, o, t) {
    return (0, e.CreateType)({ [n.Kind]: "Computed", target: i, parameters: o }, t);
  }
  return va;
}
var nf;
function Ft() {
  return nf || (nf = 1, function(e) {
    var n = tr && tr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = tr && tr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Th(), e);
  }(tr)), tr;
}
var ir = {}, Na = {}, tf;
function gh() {
  if (tf) return Na;
  tf = 1, Object.defineProperty(Na, "__esModule", { value: !0 }), Na.Never = r;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ de();
  function r(i) {
    return (0, e.CreateType)({ [n.Kind]: "Never", not: {} }, i);
  }
  return Na;
}
var rf;
function Tn() {
  return rf || (rf = 1, function(e) {
    var n = ir && ir.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = ir && ir.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ gh(), e);
  }(ir)), ir;
}
var or = {}, qa = {}, ar = {}, La = {}, Ka = {}, le = {}, of;
function Fe() {
  if (of) return le;
  of = 1, Object.defineProperty(le, "__esModule", { value: !0 }), le.IsReadonly = r, le.IsOptional = i, le.IsAny = o, le.IsArray = t, le.IsAsyncIterator = a, le.IsBigInt = u, le.IsBoolean = d, le.IsComputed = s, le.IsConstructor = f, le.IsDate = c, le.IsFunction = y, le.IsImport = w, le.IsInteger = h, le.IsProperties = M, le.IsIntersect = U, le.IsIterator = F, le.IsKindOf = C, le.IsLiteralString = G, le.IsLiteralNumber = $, le.IsLiteralBoolean = _, le.IsLiteralValue = x, le.IsLiteral = T, le.IsMappedKey = P, le.IsMappedResult = R, le.IsNever = l, le.IsNot = B, le.IsNull = S, le.IsNumber = q, le.IsObject = V, le.IsPromise = k, le.IsRecord = ne, le.IsRecursive = re, le.IsRef = W, le.IsRegExp = we, le.IsString = xe, le.IsSymbol = Le, le.IsTemplateLiteral = Ne, le.IsThis = Ke, le.IsTransform = Re, le.IsTuple = Ge, le.IsUndefined = Q, le.IsUnion = ee, le.IsUint8Array = Ie, le.IsUnknown = Ae, le.IsUnsafe = X, le.IsVoid = J, le.IsKind = D, le.IsSchema = m;
  const e = /* @__PURE__ */ Sn(), n = /* @__PURE__ */ de();
  function r(g) {
    return e.IsObject(g) && g[n.ReadonlyKind] === "Readonly";
  }
  function i(g) {
    return e.IsObject(g) && g[n.OptionalKind] === "Optional";
  }
  function o(g) {
    return C(g, "Any");
  }
  function t(g) {
    return C(g, "Array");
  }
  function a(g) {
    return C(g, "AsyncIterator");
  }
  function u(g) {
    return C(g, "BigInt");
  }
  function d(g) {
    return C(g, "Boolean");
  }
  function s(g) {
    return C(g, "Computed");
  }
  function f(g) {
    return C(g, "Constructor");
  }
  function c(g) {
    return C(g, "Date");
  }
  function y(g) {
    return C(g, "Function");
  }
  function w(g) {
    return C(g, "Import");
  }
  function h(g) {
    return C(g, "Integer");
  }
  function M(g) {
    return e.IsObject(g);
  }
  function U(g) {
    return C(g, "Intersect");
  }
  function F(g) {
    return C(g, "Iterator");
  }
  function C(g, E) {
    return e.IsObject(g) && n.Kind in g && g[n.Kind] === E;
  }
  function G(g) {
    return T(g) && e.IsString(g.const);
  }
  function $(g) {
    return T(g) && e.IsNumber(g.const);
  }
  function _(g) {
    return T(g) && e.IsBoolean(g.const);
  }
  function x(g) {
    return e.IsBoolean(g) || e.IsNumber(g) || e.IsString(g);
  }
  function T(g) {
    return C(g, "Literal");
  }
  function P(g) {
    return C(g, "MappedKey");
  }
  function R(g) {
    return C(g, "MappedResult");
  }
  function l(g) {
    return C(g, "Never");
  }
  function B(g) {
    return C(g, "Not");
  }
  function S(g) {
    return C(g, "Null");
  }
  function q(g) {
    return C(g, "Number");
  }
  function V(g) {
    return C(g, "Object");
  }
  function k(g) {
    return C(g, "Promise");
  }
  function ne(g) {
    return C(g, "Record");
  }
  function re(g) {
    return e.IsObject(g) && n.Hint in g && g[n.Hint] === "Recursive";
  }
  function W(g) {
    return C(g, "Ref");
  }
  function we(g) {
    return C(g, "RegExp");
  }
  function xe(g) {
    return C(g, "String");
  }
  function Le(g) {
    return C(g, "Symbol");
  }
  function Ne(g) {
    return C(g, "TemplateLiteral");
  }
  function Ke(g) {
    return C(g, "This");
  }
  function Re(g) {
    return e.IsObject(g) && n.TransformKind in g;
  }
  function Ge(g) {
    return C(g, "Tuple");
  }
  function Q(g) {
    return C(g, "Undefined");
  }
  function ee(g) {
    return C(g, "Union");
  }
  function Ie(g) {
    return C(g, "Uint8Array");
  }
  function Ae(g) {
    return C(g, "Unknown");
  }
  function X(g) {
    return C(g, "Unsafe");
  }
  function J(g) {
    return C(g, "Void");
  }
  function D(g) {
    return e.IsObject(g) && n.Kind in g && e.IsString(g[n.Kind]);
  }
  function m(g) {
    return o(g) || t(g) || d(g) || u(g) || a(g) || s(g) || f(g) || c(g) || y(g) || h(g) || U(g) || F(g) || T(g) || P(g) || R(g) || l(g) || B(g) || S(g) || q(g) || V(g) || k(g) || ne(g) || W(g) || we(g) || xe(g) || Le(g) || Ne(g) || Ke(g) || Ge(g) || Q(g) || ee(g) || Ie(g) || Ae(g) || X(g) || J(g) || D(g);
  }
  return le;
}
var af;
function Mg() {
  if (af) return Ka;
  af = 1, Object.defineProperty(Ka, "__esModule", { value: !0 }), Ka.Optional = d;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ de(), r = /* @__PURE__ */ Ct(), i = /* @__PURE__ */ Sg(), o = /* @__PURE__ */ Fe();
  function t(s) {
    return (0, e.CreateType)((0, r.Discard)(s, [n.OptionalKind]));
  }
  function a(s) {
    return (0, e.CreateType)({ ...s, [n.OptionalKind]: "Optional" });
  }
  function u(s, f) {
    return f === !1 ? t(s) : a(s);
  }
  function d(s, f) {
    const c = f ?? !0;
    return (0, o.IsMappedResult)(s) ? (0, i.OptionalFromMappedResult)(s, c) : u(s, c);
  }
  return Ka;
}
var uf;
function Sg() {
  if (uf) return La;
  uf = 1, Object.defineProperty(La, "__esModule", { value: !0 }), La.OptionalFromMappedResult = o;
  const e = /* @__PURE__ */ rn(), n = /* @__PURE__ */ Mg();
  function r(t, a) {
    const u = {};
    for (const d of globalThis.Object.getOwnPropertyNames(t))
      u[d] = (0, n.Optional)(t[d], a);
    return u;
  }
  function i(t, a) {
    return r(t.properties, a);
  }
  function o(t, a) {
    const u = i(t, a);
    return (0, e.MappedResult)(u);
  }
  return La;
}
var sf;
function xt() {
  return sf || (sf = 1, function(e) {
    var n = ar && ar.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = ar && ar.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Sg(), e), r(/* @__PURE__ */ Mg(), e);
  }(ar)), ar;
}
var Va = {}, cf;
function Eg() {
  if (cf) return Va;
  cf = 1, Object.defineProperty(Va, "__esModule", { value: !0 }), Va.IntersectCreate = i;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ de(), r = /* @__PURE__ */ Fe();
  function i(o, t = {}) {
    const a = o.every((d) => (0, r.IsObject)(d)), u = (0, r.IsSchema)(t.unevaluatedProperties) ? { unevaluatedProperties: t.unevaluatedProperties } : {};
    return (0, e.CreateType)(t.unevaluatedProperties === !1 || (0, r.IsSchema)(t.unevaluatedProperties) || a ? { ...u, [n.Kind]: "Intersect", type: "object", allOf: o } : { ...u, [n.Kind]: "Intersect", allOf: o }, t);
  }
  return Va;
}
var df;
function _h() {
  if (df) return qa;
  df = 1, Object.defineProperty(qa, "__esModule", { value: !0 }), qa.IntersectEvaluated = c;
  const e = /* @__PURE__ */ de(), n = /* @__PURE__ */ me(), r = /* @__PURE__ */ Ct(), i = /* @__PURE__ */ Tn(), o = /* @__PURE__ */ xt(), t = /* @__PURE__ */ Eg(), a = /* @__PURE__ */ Fe();
  function u(y) {
    return y.every((w) => (0, a.IsOptional)(w));
  }
  function d(y) {
    return (0, r.Discard)(y, [e.OptionalKind]);
  }
  function s(y) {
    return y.map((w) => (0, a.IsOptional)(w) ? d(w) : w);
  }
  function f(y, w) {
    return u(y) ? (0, o.Optional)((0, t.IntersectCreate)(s(y), w)) : (0, t.IntersectCreate)(s(y), w);
  }
  function c(y, w = {}) {
    if (y.length === 1)
      return (0, n.CreateType)(y[0], w);
    if (y.length === 0)
      return (0, i.Never)(w);
    if (y.some((h) => (0, a.IsTransform)(h)))
      throw new Error("Cannot intersect transform types");
    return f(y, w);
  }
  return qa;
}
var cc = {}, pf;
function bh() {
  return pf || (pf = 1, Object.defineProperty(cc, "__esModule", { value: !0 })), cc;
}
var Ga = {}, ff;
function Ih() {
  if (ff) return Ga;
  ff = 1, Object.defineProperty(Ga, "__esModule", { value: !0 }), Ga.Intersect = o;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ Tn(), r = /* @__PURE__ */ Eg(), i = /* @__PURE__ */ Fe();
  function o(t, a) {
    if (t.length === 1)
      return (0, e.CreateType)(t[0], a);
    if (t.length === 0)
      return (0, n.Never)(a);
    if (t.some((u) => (0, i.IsTransform)(u)))
      throw new Error("Cannot intersect transform types");
    return (0, r.IntersectCreate)(t, a);
  }
  return Ga;
}
var yf;
function Nn() {
  return yf || (yf = 1, function(e) {
    var n = or && or.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = or && or.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ _h(), e), r(/* @__PURE__ */ bh(), e), r(/* @__PURE__ */ Ih(), e);
  }(or)), or;
}
var ur = {}, Ha = {}, Wa = {}, lf;
function Cg() {
  if (lf) return Wa;
  lf = 1, Object.defineProperty(Wa, "__esModule", { value: !0 }), Wa.UnionCreate = r;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ de();
  function r(i, o) {
    return (0, e.CreateType)({ [n.Kind]: "Union", anyOf: i }, o);
  }
  return Wa;
}
var mf;
function Ph() {
  if (mf) return Ha;
  mf = 1, Object.defineProperty(Ha, "__esModule", { value: !0 }), Ha.UnionEvaluated = c;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ de(), r = /* @__PURE__ */ Ct(), i = /* @__PURE__ */ Tn(), o = /* @__PURE__ */ xt(), t = /* @__PURE__ */ Cg(), a = /* @__PURE__ */ Fe();
  function u(y) {
    return y.some((w) => (0, a.IsOptional)(w));
  }
  function d(y) {
    return y.map((w) => (0, a.IsOptional)(w) ? s(w) : w);
  }
  function s(y) {
    return (0, r.Discard)(y, [n.OptionalKind]);
  }
  function f(y, w) {
    return u(y) ? (0, o.Optional)((0, t.UnionCreate)(d(y), w)) : (0, t.UnionCreate)(d(y), w);
  }
  function c(y, w) {
    return y.length === 1 ? (0, e.CreateType)(y[0], w) : y.length === 0 ? (0, i.Never)(w) : f(y, w);
  }
  return Ha;
}
var dc = {}, Tf;
function Oh() {
  return Tf || (Tf = 1, Object.defineProperty(dc, "__esModule", { value: !0 })), dc;
}
var za = {}, gf;
function Ah() {
  if (gf) return za;
  gf = 1, Object.defineProperty(za, "__esModule", { value: !0 }), za.Union = i;
  const e = /* @__PURE__ */ Tn(), n = /* @__PURE__ */ me(), r = /* @__PURE__ */ Cg();
  function i(o, t) {
    return o.length === 0 ? (0, e.Never)(t) : o.length === 1 ? (0, n.CreateType)(o[0], t) : (0, r.UnionCreate)(o, t);
  }
  return za;
}
var _f;
function Ye() {
  return _f || (_f = 1, function(e) {
    var n = ur && ur.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = ur && ur.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Ph(), e), r(/* @__PURE__ */ Oh(), e), r(/* @__PURE__ */ Ah(), e);
  }(ur)), ur;
}
var ka = {}, sr = {}, cr = {}, dr = {}, bf;
function wd() {
  if (bf) return dr;
  bf = 1, Object.defineProperty(dr, "__esModule", { value: !0 }), dr.TemplateLiteralParserError = void 0, dr.TemplateLiteralParse = w, dr.TemplateLiteralParseExact = h;
  const e = /* @__PURE__ */ ze();
  class n extends e.TypeBoxError {
  }
  dr.TemplateLiteralParserError = n;
  function r(M) {
    return M.replace(/\\\$/g, "$").replace(/\\\*/g, "*").replace(/\\\^/g, "^").replace(/\\\|/g, "|").replace(/\\\(/g, "(").replace(/\\\)/g, ")");
  }
  function i(M, U, F) {
    return M[U] === F && M.charCodeAt(U - 1) !== 92;
  }
  function o(M, U) {
    return i(M, U, "(");
  }
  function t(M, U) {
    return i(M, U, ")");
  }
  function a(M, U) {
    return i(M, U, "|");
  }
  function u(M) {
    if (!(o(M, 0) && t(M, M.length - 1)))
      return !1;
    let U = 0;
    for (let F = 0; F < M.length; F++)
      if (o(M, F) && (U += 1), t(M, F) && (U -= 1), U === 0 && F !== M.length - 1)
        return !1;
    return !0;
  }
  function d(M) {
    return M.slice(1, M.length - 1);
  }
  function s(M) {
    let U = 0;
    for (let F = 0; F < M.length; F++)
      if (o(M, F) && (U += 1), t(M, F) && (U -= 1), a(M, F) && U === 0)
        return !0;
    return !1;
  }
  function f(M) {
    for (let U = 0; U < M.length; U++)
      if (o(M, U))
        return !0;
    return !1;
  }
  function c(M) {
    let [U, F] = [0, 0];
    const C = [];
    for (let $ = 0; $ < M.length; $++)
      if (o(M, $) && (U += 1), t(M, $) && (U -= 1), a(M, $) && U === 0) {
        const _ = M.slice(F, $);
        _.length > 0 && C.push(w(_)), F = $ + 1;
      }
    const G = M.slice(F);
    return G.length > 0 && C.push(w(G)), C.length === 0 ? { type: "const", const: "" } : C.length === 1 ? C[0] : { type: "or", expr: C };
  }
  function y(M) {
    function U(G, $) {
      if (!o(G, $))
        throw new n("TemplateLiteralParser: Index must point to open parens");
      let _ = 0;
      for (let x = $; x < G.length; x++)
        if (o(G, x) && (_ += 1), t(G, x) && (_ -= 1), _ === 0)
          return [$, x];
      throw new n("TemplateLiteralParser: Unclosed group parens in expression");
    }
    function F(G, $) {
      for (let _ = $; _ < G.length; _++)
        if (o(G, _))
          return [$, _];
      return [$, G.length];
    }
    const C = [];
    for (let G = 0; G < M.length; G++)
      if (o(M, G)) {
        const [$, _] = U(M, G), x = M.slice($, _ + 1);
        C.push(w(x)), G = _;
      } else {
        const [$, _] = F(M, G), x = M.slice($, _);
        x.length > 0 && C.push(w(x)), G = _ - 1;
      }
    return C.length === 0 ? { type: "const", const: "" } : C.length === 1 ? C[0] : { type: "and", expr: C };
  }
  function w(M) {
    return u(M) ? w(d(M)) : s(M) ? c(M) : f(M) ? y(M) : { type: "const", const: r(M) };
  }
  function h(M) {
    return w(M.slice(1, M.length - 1));
  }
  return dr;
}
var If;
function jg() {
  if (If) return cr;
  If = 1, Object.defineProperty(cr, "__esModule", { value: !0 }), cr.TemplateLiteralFiniteError = void 0, cr.IsTemplateLiteralExpressionFinite = a, cr.IsTemplateLiteralFinite = u;
  const e = /* @__PURE__ */ wd(), n = /* @__PURE__ */ ze();
  class r extends n.TypeBoxError {
  }
  cr.TemplateLiteralFiniteError = r;
  function i(d) {
    return d.type === "or" && d.expr.length === 2 && d.expr[0].type === "const" && d.expr[0].const === "0" && d.expr[1].type === "const" && d.expr[1].const === "[1-9][0-9]*";
  }
  function o(d) {
    return d.type === "or" && d.expr.length === 2 && d.expr[0].type === "const" && d.expr[0].const === "true" && d.expr[1].type === "const" && d.expr[1].const === "false";
  }
  function t(d) {
    return d.type === "const" && d.const === ".*";
  }
  function a(d) {
    return i(d) || t(d) ? !1 : o(d) ? !0 : d.type === "and" ? d.expr.every((s) => a(s)) : d.type === "or" ? d.expr.every((s) => a(s)) : d.type === "const" ? !0 : (() => {
      throw new r("Unknown expression type");
    })();
  }
  function u(d) {
    const s = (0, e.TemplateLiteralParseExact)(d.pattern);
    return a(s);
  }
  return cr;
}
var pr = {}, Pf;
function Fg() {
  if (Pf) return pr;
  Pf = 1, Object.defineProperty(pr, "__esModule", { value: !0 }), pr.TemplateLiteralGenerateError = void 0, pr.TemplateLiteralExpressionGenerate = d, pr.TemplateLiteralGenerate = s;
  const e = /* @__PURE__ */ jg(), n = /* @__PURE__ */ wd(), r = /* @__PURE__ */ ze();
  class i extends r.TypeBoxError {
  }
  pr.TemplateLiteralGenerateError = i;
  function* o(f) {
    if (f.length === 1)
      return yield* f[0];
    for (const c of f[0])
      for (const y of o(f.slice(1)))
        yield `${c}${y}`;
  }
  function* t(f) {
    return yield* o(f.expr.map((c) => [...d(c)]));
  }
  function* a(f) {
    for (const c of f.expr)
      yield* d(c);
  }
  function* u(f) {
    return yield f.const;
  }
  function* d(f) {
    return f.type === "and" ? yield* t(f) : f.type === "or" ? yield* a(f) : f.type === "const" ? yield* u(f) : (() => {
      throw new i("Unknown expression");
    })();
  }
  function s(f) {
    const c = (0, n.TemplateLiteralParseExact)(f.pattern);
    return (0, e.IsTemplateLiteralExpressionFinite)(c) ? [...d(c)] : [];
  }
  return pr;
}
var Ya = {}, fr = {}, Ja = {}, Of;
function wh() {
  if (Of) return Ja;
  Of = 1, Object.defineProperty(Ja, "__esModule", { value: !0 }), Ja.Literal = r;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ de();
  function r(i, o) {
    return (0, e.CreateType)({
      [n.Kind]: "Literal",
      const: i,
      type: typeof i
    }, o);
  }
  return Ja;
}
var Af;
function _n() {
  return Af || (Af = 1, function(e) {
    var n = fr && fr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = fr && fr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ wh(), e);
  }(fr)), fr;
}
var yr = {}, Za = {}, wf;
function Rh() {
  if (wf) return Za;
  wf = 1, Object.defineProperty(Za, "__esModule", { value: !0 }), Za.Boolean = r;
  const e = /* @__PURE__ */ de(), n = /* @__PURE__ */ jt();
  function r(i) {
    return (0, n.CreateType)({ [e.Kind]: "Boolean", type: "boolean" }, i);
  }
  return Za;
}
var Rf;
function Gs() {
  return Rf || (Rf = 1, function(e) {
    var n = yr && yr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = yr && yr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Rh(), e);
  }(yr)), yr;
}
var lr = {}, Qa = {}, $f;
function $h() {
  if ($f) return Qa;
  $f = 1, Object.defineProperty(Qa, "__esModule", { value: !0 }), Qa.BigInt = r;
  const e = /* @__PURE__ */ de(), n = /* @__PURE__ */ jt();
  function r(i) {
    return (0, n.CreateType)({ [e.Kind]: "BigInt", type: "bigint" }, i);
  }
  return Qa;
}
var hf;
function la() {
  return hf || (hf = 1, function(e) {
    var n = lr && lr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = lr && lr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ $h(), e);
  }(lr)), lr;
}
var mr = {}, Xa = {}, Bf;
function hh() {
  if (Bf) return Xa;
  Bf = 1, Object.defineProperty(Xa, "__esModule", { value: !0 }), Xa.Number = r;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ de();
  function r(i) {
    return (0, e.CreateType)({ [n.Kind]: "Number", type: "number" }, i);
  }
  return Xa;
}
var Mf;
function go() {
  return Mf || (Mf = 1, function(e) {
    var n = mr && mr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = mr && mr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ hh(), e);
  }(mr)), mr;
}
var Tr = {}, eu = {}, Sf;
function Bh() {
  if (Sf) return eu;
  Sf = 1, Object.defineProperty(eu, "__esModule", { value: !0 }), eu.String = r;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ de();
  function r(i) {
    return (0, e.CreateType)({ [n.Kind]: "String", type: "string" }, i);
  }
  return eu;
}
var Ef;
function _o() {
  return Ef || (Ef = 1, function(e) {
    var n = Tr && Tr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Tr && Tr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Bh(), e);
  }(Tr)), Tr;
}
var Cf;
function xg() {
  if (Cf) return Ya;
  Cf = 1, Object.defineProperty(Ya, "__esModule", { value: !0 }), Ya.TemplateLiteralSyntax = f;
  const e = /* @__PURE__ */ _n(), n = /* @__PURE__ */ Gs(), r = /* @__PURE__ */ la(), i = /* @__PURE__ */ go(), o = /* @__PURE__ */ _o(), t = /* @__PURE__ */ Ye(), a = /* @__PURE__ */ Tn();
  function* u(c) {
    const y = c.trim().replace(/"|'/g, "");
    return y === "boolean" ? yield (0, n.Boolean)() : y === "number" ? yield (0, i.Number)() : y === "bigint" ? yield (0, r.BigInt)() : y === "string" ? yield (0, o.String)() : yield (() => {
      const w = y.split("|").map((h) => (0, e.Literal)(h.trim()));
      return w.length === 0 ? (0, a.Never)() : w.length === 1 ? w[0] : (0, t.UnionEvaluated)(w);
    })();
  }
  function* d(c) {
    if (c[1] !== "{") {
      const y = (0, e.Literal)("$"), w = s(c.slice(1));
      return yield* [y, ...w];
    }
    for (let y = 2; y < c.length; y++)
      if (c[y] === "}") {
        const w = u(c.slice(2, y)), h = s(c.slice(y + 1));
        return yield* [...w, ...h];
      }
    yield (0, e.Literal)(c);
  }
  function* s(c) {
    for (let y = 0; y < c.length; y++)
      if (c[y] === "$") {
        const w = (0, e.Literal)(c.slice(0, y)), h = d(c.slice(y));
        return yield* [w, ...h];
      }
    yield (0, e.Literal)(c);
  }
  function f(c) {
    return [...s(c)];
  }
  return Ya;
}
var Hi = {}, gr = {}, pc = {}, jf;
function Mh() {
  return jf || (jf = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.PatternNeverExact = e.PatternStringExact = e.PatternNumberExact = e.PatternBooleanExact = e.PatternNever = e.PatternString = e.PatternNumber = e.PatternBoolean = void 0, e.PatternBoolean = "(true|false)", e.PatternNumber = "(0|[1-9][0-9]*)", e.PatternString = "(.*)", e.PatternNever = "(?!.*)", e.PatternBooleanExact = `^${e.PatternBoolean}$`, e.PatternNumberExact = `^${e.PatternNumber}$`, e.PatternStringExact = `^${e.PatternString}$`, e.PatternNeverExact = `^${e.PatternNever}$`;
  }(pc)), pc;
}
var Ff;
function ma() {
  return Ff || (Ff = 1, function(e) {
    var n = gr && gr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = gr && gr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Mh(), e);
  }(gr)), gr;
}
var xf;
function Ug() {
  if (xf) return Hi;
  xf = 1, Object.defineProperty(Hi, "__esModule", { value: !0 }), Hi.TemplateLiteralPatternError = void 0, Hi.TemplateLiteralPattern = u;
  const e = /* @__PURE__ */ ma(), n = /* @__PURE__ */ de(), r = /* @__PURE__ */ ze(), i = /* @__PURE__ */ Fe();
  class o extends r.TypeBoxError {
  }
  Hi.TemplateLiteralPatternError = o;
  function t(d) {
    return d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  function a(d, s) {
    return (0, i.IsTemplateLiteral)(d) ? d.pattern.slice(1, d.pattern.length - 1) : (0, i.IsUnion)(d) ? `(${d.anyOf.map((f) => a(f, s)).join("|")})` : (0, i.IsNumber)(d) ? `${s}${e.PatternNumber}` : (0, i.IsInteger)(d) ? `${s}${e.PatternNumber}` : (0, i.IsBigInt)(d) ? `${s}${e.PatternNumber}` : (0, i.IsString)(d) ? `${s}${e.PatternString}` : (0, i.IsLiteral)(d) ? `${s}${t(d.const.toString())}` : (0, i.IsBoolean)(d) ? `${s}${e.PatternBoolean}` : (() => {
      throw new o(`Unexpected Kind '${d[n.Kind]}'`);
    })();
  }
  function u(d) {
    return `^${d.map((s) => a(s, "")).join("")}$`;
  }
  return Hi;
}
var nu = {}, Uf;
function Sh() {
  if (Uf) return nu;
  Uf = 1, Object.defineProperty(nu, "__esModule", { value: !0 }), nu.TemplateLiteralToUnion = i;
  const e = /* @__PURE__ */ Ye(), n = /* @__PURE__ */ _n(), r = /* @__PURE__ */ Fg();
  function i(o) {
    const a = (0, r.TemplateLiteralGenerate)(o).map((u) => (0, n.Literal)(u));
    return (0, e.UnionEvaluated)(a);
  }
  return nu;
}
var tu = {}, Df;
function Eh() {
  if (Df) return tu;
  Df = 1, Object.defineProperty(tu, "__esModule", { value: !0 }), tu.TemplateLiteral = t;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ xg(), r = /* @__PURE__ */ Ug(), i = /* @__PURE__ */ Sn(), o = /* @__PURE__ */ de();
  function t(a, u) {
    const d = (0, i.IsString)(a) ? (0, r.TemplateLiteralPattern)((0, n.TemplateLiteralSyntax)(a)) : (0, r.TemplateLiteralPattern)(a);
    return (0, e.CreateType)({ [o.Kind]: "TemplateLiteral", type: "string", pattern: d }, u);
  }
  return tu;
}
var vf;
function nt() {
  return vf || (vf = 1, function(e) {
    var n = sr && sr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = sr && sr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ jg(), e), r(/* @__PURE__ */ Fg(), e), r(/* @__PURE__ */ xg(), e), r(/* @__PURE__ */ wd(), e), r(/* @__PURE__ */ Ug(), e), r(/* @__PURE__ */ Sh(), e), r(/* @__PURE__ */ Eh(), e);
  }(sr)), sr;
}
var Nf;
function Rd() {
  if (Nf) return ka;
  Nf = 1, Object.defineProperty(ka, "__esModule", { value: !0 }), ka.IndexPropertyKeys = t;
  const e = /* @__PURE__ */ nt(), n = /* @__PURE__ */ Fe();
  function r(a) {
    return (0, e.TemplateLiteralGenerate)(a).map((d) => d.toString());
  }
  function i(a) {
    const u = [];
    for (const d of a)
      u.push(...t(d));
    return u;
  }
  function o(a) {
    return [a.toString()];
  }
  function t(a) {
    return [...new Set((0, n.IsTemplateLiteral)(a) ? r(a) : (0, n.IsUnion)(a) ? i(a.anyOf) : (0, n.IsLiteral)(a) ? o(a.const) : (0, n.IsNumber)(a) ? ["[number]"] : (0, n.IsInteger)(a) ? ["[number]"] : [])];
  }
  return ka;
}
var ru = {}, qf;
function Dg() {
  if (qf) return ru;
  qf = 1, Object.defineProperty(ru, "__esModule", { value: !0 }), ru.IndexFromMappedResult = t;
  const e = /* @__PURE__ */ rn(), n = /* @__PURE__ */ Rd(), r = /* @__PURE__ */ tt();
  function i(a, u, d) {
    const s = {};
    for (const f of Object.getOwnPropertyNames(u))
      s[f] = (0, r.Index)(a, (0, n.IndexPropertyKeys)(u[f]), d);
    return s;
  }
  function o(a, u, d) {
    return i(a, u.properties, d);
  }
  function t(a, u, d) {
    const s = o(a, u, d);
    return (0, e.MappedResult)(s);
  }
  return ru;
}
var Lf;
function $d() {
  if (Lf) return nr;
  Lf = 1, Object.defineProperty(nr, "__esModule", { value: !0 }), nr.IndexFromPropertyKey = C, nr.IndexFromPropertyKeys = G, nr.IndexFromComputed = _, nr.Index = x;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ ze(), r = /* @__PURE__ */ Ft(), i = /* @__PURE__ */ Tn(), o = /* @__PURE__ */ Nn(), t = /* @__PURE__ */ Ye(), a = /* @__PURE__ */ Rd(), u = /* @__PURE__ */ vg(), d = /* @__PURE__ */ Dg(), s = /* @__PURE__ */ Fe();
  function f(T, P) {
    return T.map((R) => C(R, P));
  }
  function c(T) {
    return T.filter((P) => !(0, s.IsNever)(P));
  }
  function y(T, P) {
    return (0, o.IntersectEvaluated)(c(f(T, P)));
  }
  function w(T) {
    return T.some((P) => (0, s.IsNever)(P)) ? [] : T;
  }
  function h(T, P) {
    return (0, t.UnionEvaluated)(w(f(T, P)));
  }
  function M(T, P) {
    return P in T ? T[P] : P === "[number]" ? (0, t.UnionEvaluated)(T) : (0, i.Never)();
  }
  function U(T, P) {
    return P === "[number]" ? T : (0, i.Never)();
  }
  function F(T, P) {
    return P in T ? T[P] : (0, i.Never)();
  }
  function C(T, P) {
    return (0, s.IsIntersect)(T) ? y(T.allOf, P) : (0, s.IsUnion)(T) ? h(T.anyOf, P) : (0, s.IsTuple)(T) ? M(T.items ?? [], P) : (0, s.IsArray)(T) ? U(T.items, P) : (0, s.IsObject)(T) ? F(T.properties, P) : (0, i.Never)();
  }
  function G(T, P) {
    return P.map((R) => C(T, R));
  }
  function $(T, P) {
    return (0, t.UnionEvaluated)(G(T, P));
  }
  function _(T, P) {
    return (0, r.Computed)("Index", [T, P]);
  }
  function x(T, P, R) {
    if ((0, s.IsRef)(T) || (0, s.IsRef)(P)) {
      const l = "Index types using Ref parameters require both Type and Key to be of TSchema";
      if (!(0, s.IsSchema)(T) || !(0, s.IsSchema)(P))
        throw new n.TypeBoxError(l);
      return (0, r.Computed)("Index", [T, P]);
    }
    return (0, s.IsMappedResult)(P) ? (0, d.IndexFromMappedResult)(T, P, R) : (0, s.IsMappedKey)(P) ? (0, u.IndexFromMappedKey)(T, P, R) : (0, e.CreateType)((0, s.IsSchema)(P) ? $(T, (0, a.IndexPropertyKeys)(P)) : $(T, P), R);
  }
  return nr;
}
var Kf;
function vg() {
  if (Kf) return Da;
  Kf = 1, Object.defineProperty(Da, "__esModule", { value: !0 }), Da.IndexFromMappedKey = a;
  const e = /* @__PURE__ */ $d(), n = /* @__PURE__ */ rn(), r = /* @__PURE__ */ En();
  function i(u, d, s) {
    return { [d]: (0, e.Index)(u, [d], (0, r.Clone)(s)) };
  }
  function o(u, d, s) {
    return d.reduce((f, c) => ({ ...f, ...i(u, c, s) }), {});
  }
  function t(u, d, s) {
    return o(u, d.keys, s);
  }
  function a(u, d, s) {
    const f = t(u, d, s);
    return (0, n.MappedResult)(f);
  }
  return Da;
}
var Vf;
function tt() {
  return Vf || (Vf = 1, function(e) {
    var n = er && er.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = er && er.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ vg(), e), r(/* @__PURE__ */ Dg(), e), r(/* @__PURE__ */ Rd(), e), r(/* @__PURE__ */ $d(), e);
  }(er)), er;
}
var _r = {}, iu = {}, Gf;
function Ch() {
  if (Gf) return iu;
  Gf = 1, Object.defineProperty(iu, "__esModule", { value: !0 }), iu.Iterator = r;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ de();
  function r(i, o) {
    return (0, e.CreateType)({ [n.Kind]: "Iterator", type: "Iterator", items: i }, o);
  }
  return iu;
}
var Hf;
function Ta() {
  return Hf || (Hf = 1, function(e) {
    var n = _r && _r.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = _r && _r.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Ch(), e);
  }(_r)), _r;
}
var br = {}, Co = {}, Wf;
function jh() {
  if (Wf) return Co;
  Wf = 1, Object.defineProperty(Co, "__esModule", { value: !0 }), Co.Object = void 0;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ de(), r = /* @__PURE__ */ Fe();
  function i(t) {
    const a = [];
    for (let u in t)
      (0, r.IsOptional)(t[u]) || a.push(u);
    return a;
  }
  function o(t, a) {
    const u = i(t), d = u.length > 0 ? { [n.Kind]: "Object", type: "object", properties: t, required: u } : { [n.Kind]: "Object", type: "object", properties: t };
    return (0, e.CreateType)(d, a);
  }
  return Co.Object = o, Co;
}
var zf;
function Cn() {
  return zf || (zf = 1, function(e) {
    var n = br && br.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = br && br.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ jh(), e);
  }(br)), br;
}
var Ir = {}, ou = {}, kf;
function Fh() {
  if (kf) return ou;
  kf = 1, Object.defineProperty(ou, "__esModule", { value: !0 }), ou.Promise = r;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ de();
  function r(i, o) {
    return (0, e.CreateType)({ [n.Kind]: "Promise", type: "Promise", item: i }, o);
  }
  return ou;
}
var Yf;
function Hs() {
  return Yf || (Yf = 1, function(e) {
    var n = Ir && Ir.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Ir && Ir.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Fh(), e);
  }(Ir)), Ir;
}
var Pr = {}, au = {}, uu = {}, Jf;
function Ng() {
  if (Jf) return uu;
  Jf = 1, Object.defineProperty(uu, "__esModule", { value: !0 }), uu.Readonly = d;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ de(), r = /* @__PURE__ */ Ct(), i = /* @__PURE__ */ qg(), o = /* @__PURE__ */ Fe();
  function t(s) {
    return (0, e.CreateType)((0, r.Discard)(s, [n.ReadonlyKind]));
  }
  function a(s) {
    return (0, e.CreateType)({ ...s, [n.ReadonlyKind]: "Readonly" });
  }
  function u(s, f) {
    return f === !1 ? t(s) : a(s);
  }
  function d(s, f) {
    const c = f ?? !0;
    return (0, o.IsMappedResult)(s) ? (0, i.ReadonlyFromMappedResult)(s, c) : u(s, c);
  }
  return uu;
}
var Zf;
function qg() {
  if (Zf) return au;
  Zf = 1, Object.defineProperty(au, "__esModule", { value: !0 }), au.ReadonlyFromMappedResult = o;
  const e = /* @__PURE__ */ rn(), n = /* @__PURE__ */ Ng();
  function r(t, a) {
    const u = {};
    for (const d of globalThis.Object.getOwnPropertyNames(t))
      u[d] = (0, n.Readonly)(t[d], a);
    return u;
  }
  function i(t, a) {
    return r(t.properties, a);
  }
  function o(t, a) {
    const u = i(t, a);
    return (0, e.MappedResult)(u);
  }
  return au;
}
var Qf;
function bo() {
  return Qf || (Qf = 1, function(e) {
    var n = Pr && Pr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Pr && Pr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ qg(), e), r(/* @__PURE__ */ Ng(), e);
  }(Pr)), Pr;
}
var Or = {}, su = {}, Xf;
function xh() {
  if (Xf) return su;
  Xf = 1, Object.defineProperty(su, "__esModule", { value: !0 }), su.Tuple = r;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ de();
  function r(i, o) {
    return (0, e.CreateType)(i.length > 0 ? { [n.Kind]: "Tuple", type: "array", items: i, additionalItems: !1, minItems: i.length, maxItems: i.length } : { [n.Kind]: "Tuple", type: "array", minItems: i.length, maxItems: i.length }, o);
  }
  return su;
}
var ey;
function Ut() {
  return ey || (ey = 1, function(e) {
    var n = Or && Or.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Or && Or.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ xh(), e);
  }(Or)), Or;
}
var Ar = {}, Kn = {}, ny;
function Uh() {
  if (ny) return Kn;
  ny = 1, Object.defineProperty(Kn, "__esModule", { value: !0 }), Kn.SetIncludes = e, Kn.SetIsSubset = n, Kn.SetDistinct = r, Kn.SetIntersect = i, Kn.SetUnion = o, Kn.SetComplement = t, Kn.SetIntersectMany = u, Kn.SetUnionMany = d;
  function e(s, f) {
    return s.includes(f);
  }
  function n(s, f) {
    return s.every((c) => e(f, c));
  }
  function r(s) {
    return [...new Set(s)];
  }
  function i(s, f) {
    return s.filter((c) => f.includes(c));
  }
  function o(s, f) {
    return [...s, ...f];
  }
  function t(s, f) {
    return s.filter((c) => !f.includes(c));
  }
  function a(s, f) {
    return s.reduce((c, y) => i(c, y), f);
  }
  function u(s) {
    return s.length === 1 ? s[0] : s.length > 1 ? a(s.slice(1), s[0]) : [];
  }
  function d(s) {
    const f = [];
    for (const c of s)
      f.push(...c);
    return f;
  }
  return Kn;
}
var ty;
function Ws() {
  return ty || (ty = 1, function(e) {
    var n = Ar && Ar.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Ar && Ar.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Uh(), e);
  }(Ar)), Ar;
}
var ry;
function Dh() {
  if (ry) return Eo;
  ry = 1, Object.defineProperty(Eo, "__esModule", { value: !0 }), Eo.MappedFunctionReturnType = B, Eo.Mapped = S;
  const e = /* @__PURE__ */ de(), n = /* @__PURE__ */ Ct(), r = /* @__PURE__ */ pa(), i = /* @__PURE__ */ fa(), o = /* @__PURE__ */ ya(), t = /* @__PURE__ */ Gi(), a = /* @__PURE__ */ tt(), u = /* @__PURE__ */ Nn(), d = /* @__PURE__ */ Ta(), s = /* @__PURE__ */ _n(), f = /* @__PURE__ */ Cn(), c = /* @__PURE__ */ xt(), y = /* @__PURE__ */ Hs(), w = /* @__PURE__ */ bo(), h = /* @__PURE__ */ Ut(), M = /* @__PURE__ */ Ye(), U = /* @__PURE__ */ Ws(), F = /* @__PURE__ */ Bg(), C = /* @__PURE__ */ Fe();
  function G(q, V) {
    return q in V ? l(q, V[q]) : (0, F.MappedResult)(V);
  }
  function $(q) {
    return { [q]: (0, s.Literal)(q) };
  }
  function _(q) {
    const V = {};
    for (const k of q)
      V[k] = (0, s.Literal)(k);
    return V;
  }
  function x(q, V) {
    return (0, U.SetIncludes)(V, q) ? $(q) : _(V);
  }
  function T(q, V) {
    const k = x(q, V);
    return G(q, k);
  }
  function P(q, V) {
    return V.map((k) => l(q, k));
  }
  function R(q, V) {
    const k = {};
    for (const ne of globalThis.Object.getOwnPropertyNames(V))
      k[ne] = l(q, V[ne]);
    return k;
  }
  function l(q, V) {
    const k = { ...V };
    return (
      // unevaluated modifier types
      (0, C.IsOptional)(V) ? (0, c.Optional)(l(q, (0, n.Discard)(V, [e.OptionalKind]))) : (0, C.IsReadonly)(V) ? (0, w.Readonly)(l(q, (0, n.Discard)(V, [e.ReadonlyKind]))) : (
        // unevaluated mapped types
        (0, C.IsMappedResult)(V) ? G(q, V.properties) : (0, C.IsMappedKey)(V) ? T(q, V.keys) : (
          // unevaluated types
          (0, C.IsConstructor)(V) ? (0, o.Constructor)(P(q, V.parameters), l(q, V.returns), k) : (0, C.IsFunction)(V) ? (0, t.Function)(P(q, V.parameters), l(q, V.returns), k) : (0, C.IsAsyncIterator)(V) ? (0, i.AsyncIterator)(l(q, V.items), k) : (0, C.IsIterator)(V) ? (0, d.Iterator)(l(q, V.items), k) : (0, C.IsIntersect)(V) ? (0, u.Intersect)(P(q, V.allOf), k) : (0, C.IsUnion)(V) ? (0, M.Union)(P(q, V.anyOf), k) : (0, C.IsTuple)(V) ? (0, h.Tuple)(P(q, V.items ?? []), k) : (0, C.IsObject)(V) ? (0, f.Object)(R(q, V.properties), k) : (0, C.IsArray)(V) ? (0, r.Array)(l(q, V.items), k) : (0, C.IsPromise)(V) ? (0, y.Promise)(l(q, V.item), k) : V
        )
      )
    );
  }
  function B(q, V) {
    const k = {};
    for (const ne of q)
      k[ne] = l(ne, V);
    return k;
  }
  function S(q, V, k) {
    const ne = (0, C.IsSchema)(q) ? (0, a.IndexPropertyKeys)(q) : q, re = V({ [e.Kind]: "MappedKey", keys: ne }), W = B(ne, re);
    return (0, f.Object)(W, k);
  }
  return Eo;
}
var iy;
function rn() {
  return iy || (iy = 1, function(e) {
    var n = kt && kt.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = kt && kt.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ ph(), e), r(/* @__PURE__ */ Bg(), e), r(/* @__PURE__ */ Dh(), e);
  }(kt)), kt;
}
var jo = {}, wr = {}, cu = {}, oy;
function vh() {
  if (oy) return cu;
  oy = 1, Object.defineProperty(cu, "__esModule", { value: !0 }), cu.Ref = i;
  const e = /* @__PURE__ */ ze(), n = /* @__PURE__ */ me(), r = /* @__PURE__ */ de();
  function i(...o) {
    const [t, a] = typeof o[0] == "string" ? [o[0], o[1]] : [o[0].$id, o[1]];
    if (typeof t != "string")
      throw new e.TypeBoxError("Ref: $ref must be a string");
    return (0, n.CreateType)({ [r.Kind]: "Ref", $ref: t }, a);
  }
  return cu;
}
var ay;
function Pt() {
  return ay || (ay = 1, function(e) {
    var n = wr && wr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = wr && wr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ vh(), e);
  }(wr)), wr;
}
var Fo = {}, uy;
function hd() {
  if (uy) return Fo;
  uy = 1, Object.defineProperty(Fo, "__esModule", { value: !0 }), Fo.KeyOfPropertyKeys = s, Fo.KeyOfPattern = c;
  const e = /* @__PURE__ */ Ws(), n = /* @__PURE__ */ Fe();
  function r(y) {
    const w = [];
    for (const h of y)
      w.push(s(h));
    return w;
  }
  function i(y) {
    const w = r(y);
    return (0, e.SetUnionMany)(w);
  }
  function o(y) {
    const w = r(y);
    return (0, e.SetIntersectMany)(w);
  }
  function t(y) {
    return y.map((w, h) => h.toString());
  }
  function a(y) {
    return ["[number]"];
  }
  function u(y) {
    return globalThis.Object.getOwnPropertyNames(y);
  }
  function d(y) {
    return f ? globalThis.Object.getOwnPropertyNames(y).map((h) => h[0] === "^" && h[h.length - 1] === "$" ? h.slice(1, h.length - 1) : h) : [];
  }
  function s(y) {
    return (0, n.IsIntersect)(y) ? i(y.allOf) : (0, n.IsUnion)(y) ? o(y.anyOf) : (0, n.IsTuple)(y) ? t(y.items ?? []) : (0, n.IsArray)(y) ? a(y.items) : (0, n.IsObject)(y) ? u(y.properties) : (0, n.IsRecord)(y) ? d(y.patternProperties) : [];
  }
  let f = !1;
  function c(y) {
    f = !0;
    const w = s(y);
    return f = !1, `^(${w.map((M) => `(${M})`).join("|")})$`;
  }
  return Fo;
}
var sy;
function Lg() {
  if (sy) return jo;
  sy = 1, Object.defineProperty(jo, "__esModule", { value: !0 }), jo.KeyOfPropertyKeysToRest = y, jo.KeyOf = w;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ _n(), r = /* @__PURE__ */ go(), i = /* @__PURE__ */ Ft(), o = /* @__PURE__ */ Pt(), t = /* @__PURE__ */ hd(), a = /* @__PURE__ */ Ye(), u = /* @__PURE__ */ Kg(), d = /* @__PURE__ */ Fe();
  function s(h, M) {
    return (0, i.Computed)("KeyOf", [(0, i.Computed)(h, M)]);
  }
  function f(h) {
    return (0, i.Computed)("KeyOf", [(0, o.Ref)(h)]);
  }
  function c(h, M) {
    const U = (0, t.KeyOfPropertyKeys)(h), F = y(U), C = (0, a.UnionEvaluated)(F);
    return (0, e.CreateType)(C, M);
  }
  function y(h) {
    return h.map((M) => M === "[number]" ? (0, r.Number)() : (0, n.Literal)(M));
  }
  function w(h, M) {
    return (0, d.IsComputed)(h) ? s(h.target, h.parameters) : (0, d.IsRef)(h) ? f(h.$ref) : (0, d.IsMappedResult)(h) ? (0, u.KeyOfFromMappedResult)(h, M) : c(h, M);
  }
  return jo;
}
var cy;
function Kg() {
  if (cy) return Ma;
  cy = 1, Object.defineProperty(Ma, "__esModule", { value: !0 }), Ma.KeyOfFromMappedResult = t;
  const e = /* @__PURE__ */ rn(), n = /* @__PURE__ */ Lg(), r = /* @__PURE__ */ En();
  function i(a, u) {
    const d = {};
    for (const s of globalThis.Object.getOwnPropertyNames(a))
      d[s] = (0, n.KeyOf)(a[s], (0, r.Clone)(u));
    return d;
  }
  function o(a, u) {
    return i(a.properties, u);
  }
  function t(a, u) {
    const d = o(a, u);
    return (0, e.MappedResult)(d);
  }
  return Ma;
}
var du = {}, dy;
function Nh() {
  if (dy) return du;
  dy = 1, Object.defineProperty(du, "__esModule", { value: !0 }), du.KeyOfPropertyEntries = r;
  const e = /* @__PURE__ */ $d(), n = /* @__PURE__ */ hd();
  function r(i) {
    const o = (0, n.KeyOfPropertyKeys)(i), t = (0, e.IndexFromPropertyKeys)(i, o);
    return o.map((a, u) => [o[u], t[u]]);
  }
  return du;
}
var py;
function Yn() {
  return py || (py = 1, function(e) {
    var n = zt && zt.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = zt && zt.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Kg(), e), r(/* @__PURE__ */ Nh(), e), r(/* @__PURE__ */ hd(), e), r(/* @__PURE__ */ Lg(), e);
  }(zt)), zt;
}
var pu = {}, fy;
function Bd() {
  if (fy) return pu;
  fy = 1, Object.defineProperty(pu, "__esModule", { value: !0 }), pu.ExtendsUndefinedCheck = o;
  const e = /* @__PURE__ */ de();
  function n(t) {
    return t.allOf.every((a) => o(a));
  }
  function r(t) {
    return t.anyOf.some((a) => o(a));
  }
  function i(t) {
    return !o(t.not);
  }
  function o(t) {
    return t[e.Kind] === "Intersect" ? n(t) : t[e.Kind] === "Union" ? r(t) : t[e.Kind] === "Not" ? i(t) : t[e.Kind] === "Undefined";
  }
  return pu;
}
var Wi = {}, yy;
function Vg() {
  if (yy) return Wi;
  yy = 1, Object.defineProperty(Wi, "__esModule", { value: !0 }), Wi.DefaultErrorFunction = r, Wi.SetErrorFunction = o, Wi.GetErrorFunction = t;
  const e = /* @__PURE__ */ de(), n = /* @__PURE__ */ Jg();
  function r(a) {
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
  let i = r;
  function o(a) {
    i = a;
  }
  function t() {
    return i;
  }
  return Wi;
}
var Rr = {}, $r = {}, ly;
function qh() {
  if (ly) return $r;
  ly = 1, Object.defineProperty($r, "__esModule", { value: !0 }), $r.TypeDereferenceError = void 0, $r.Pushref = t, $r.Deref = a;
  const e = /* @__PURE__ */ ze(), n = /* @__PURE__ */ de(), r = /* @__PURE__ */ Pd();
  class i extends e.TypeBoxError {
    constructor(d) {
      super(`Unable to dereference schema with $id '${d.$ref}'`), this.schema = d;
    }
  }
  $r.TypeDereferenceError = i;
  function o(u, d) {
    const s = d.find((f) => f.$id === u.$ref);
    if (s === void 0)
      throw new i(u);
    return a(s, d);
  }
  function t(u, d) {
    return !(0, r.IsString)(u.$id) || d.some((s) => s.$id === u.$id) || d.push(u), d;
  }
  function a(u, d) {
    return u[n.Kind] === "This" || u[n.Kind] === "Ref" ? o(u, d) : u;
  }
  return $r;
}
var my;
function Jn() {
  return my || (my = 1, function(e) {
    var n = Rr && Rr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Rr && Rr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ qh(), e);
  }(Rr)), Rr;
}
var hr = {}, zi = {}, Ty;
function Lh() {
  if (Ty) return zi;
  Ty = 1, Object.defineProperty(zi, "__esModule", { value: !0 }), zi.ValueHashError = void 0, zi.Hash = R;
  const e = /* @__PURE__ */ tn(), n = /* @__PURE__ */ ze();
  class r extends n.TypeBoxError {
    constructor(B) {
      super("Unable to hash value"), this.value = B;
    }
  }
  zi.ValueHashError = r;
  var i;
  (function(l) {
    l[l.Undefined = 0] = "Undefined", l[l.Null = 1] = "Null", l[l.Boolean = 2] = "Boolean", l[l.Number = 3] = "Number", l[l.String = 4] = "String", l[l.Object = 5] = "Object", l[l.Array = 6] = "Array", l[l.Date = 7] = "Date", l[l.Uint8Array = 8] = "Uint8Array", l[l.Symbol = 9] = "Symbol", l[l.BigInt = 10] = "BigInt";
  })(i || (i = {}));
  let o = BigInt("14695981039346656037");
  const [t, a] = [BigInt("1099511628211"), BigInt(
    "18446744073709551616"
    /* 2 ^ 64 */
  )], u = Array.from({ length: 256 }).map((l, B) => BigInt(B)), d = new Float64Array(1), s = new DataView(d.buffer), f = new Uint8Array(d.buffer);
  function* c(l) {
    const B = l === 0 ? 1 : Math.ceil(Math.floor(Math.log2(l) + 1) / 8);
    for (let S = 0; S < B; S++)
      yield l >> 8 * (B - 1 - S) & 255;
  }
  function y(l) {
    P(i.Array);
    for (const B of l)
      T(B);
  }
  function w(l) {
    P(i.Boolean), P(l ? 1 : 0);
  }
  function h(l) {
    P(i.BigInt), s.setBigInt64(0, l);
    for (const B of f)
      P(B);
  }
  function M(l) {
    P(i.Date), T(l.getTime());
  }
  function U(l) {
    P(i.Null);
  }
  function F(l) {
    P(i.Number), s.setFloat64(0, l);
    for (const B of f)
      P(B);
  }
  function C(l) {
    P(i.Object);
    for (const B of globalThis.Object.getOwnPropertyNames(l).sort())
      T(B), T(l[B]);
  }
  function G(l) {
    P(i.String);
    for (let B = 0; B < l.length; B++)
      for (const S of c(l.charCodeAt(B)))
        P(S);
  }
  function $(l) {
    P(i.Symbol), T(l.description);
  }
  function _(l) {
    P(i.Uint8Array);
    for (let B = 0; B < l.length; B++)
      P(l[B]);
  }
  function x(l) {
    return P(i.Undefined);
  }
  function T(l) {
    if ((0, e.IsArray)(l))
      return y(l);
    if ((0, e.IsBoolean)(l))
      return w(l);
    if ((0, e.IsBigInt)(l))
      return h(l);
    if ((0, e.IsDate)(l))
      return M(l);
    if ((0, e.IsNull)(l))
      return U();
    if ((0, e.IsNumber)(l))
      return F(l);
    if ((0, e.IsObject)(l))
      return C(l);
    if ((0, e.IsString)(l))
      return G(l);
    if ((0, e.IsSymbol)(l))
      return $(l);
    if ((0, e.IsUint8Array)(l))
      return _(l);
    if ((0, e.IsUndefined)(l))
      return x();
    throw new r(l);
  }
  function P(l) {
    o = o ^ u[l], o = o * t % a;
  }
  function R(l) {
    return o = BigInt("14695981039346656037"), T(l), o;
  }
  return zi;
}
var gy;
function ga() {
  return gy || (gy = 1, function(e) {
    var n = hr && hr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = hr && hr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Lh(), e);
  }(hr)), hr;
}
var Br = {}, ki = {}, Mr = {}, Ot = {}, Sr = {}, fu = {}, _y;
function Kh() {
  if (_y) return fu;
  _y = 1, Object.defineProperty(fu, "__esModule", { value: !0 }), fu.Any = r;
  const e = /* @__PURE__ */ jt(), n = /* @__PURE__ */ de();
  function r(i) {
    return (0, e.CreateType)({ [n.Kind]: "Any" }, i);
  }
  return fu;
}
var by;
function _a() {
  return by || (by = 1, function(e) {
    var n = Sr && Sr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Sr && Sr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Kh(), e);
  }(Sr)), Sr;
}
var Er = {}, yu = {}, Iy;
function Vh() {
  if (Iy) return yu;
  Iy = 1, Object.defineProperty(yu, "__esModule", { value: !0 }), yu.Unknown = r;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ de();
  function r(i) {
    return (0, e.CreateType)({ [n.Kind]: "Unknown" }, i);
  }
  return yu;
}
var Py;
function Io() {
  return Py || (Py = 1, function(e) {
    var n = Er && Er.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Er && Er.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Vh(), e);
  }(Er)), Er;
}
var ut = {}, ye = {}, Oy;
function Gg() {
  if (Oy) return ye;
  Oy = 1, Object.defineProperty(ye, "__esModule", { value: !0 }), ye.TypeGuardUnknownTypeError = void 0, ye.IsReadonly = M, ye.IsOptional = U, ye.IsAny = F, ye.IsArray = C, ye.IsAsyncIterator = G, ye.IsBigInt = $, ye.IsBoolean = _, ye.IsComputed = x, ye.IsConstructor = T, ye.IsDate = P, ye.IsFunction = R, ye.IsImport = l, ye.IsInteger = B, ye.IsProperties = S, ye.IsIntersect = q, ye.IsIterator = V, ye.IsKindOf = k, ye.IsLiteralString = ne, ye.IsLiteralNumber = re, ye.IsLiteralBoolean = W, ye.IsLiteral = we, ye.IsLiteralValue = xe, ye.IsMappedKey = Le, ye.IsMappedResult = Ne, ye.IsNever = Ke, ye.IsNot = Re, ye.IsNull = Ge, ye.IsNumber = Q, ye.IsObject = ee, ye.IsPromise = Ie, ye.IsRecord = Ae, ye.IsRecursive = X, ye.IsRef = J, ye.IsRegExp = D, ye.IsString = m, ye.IsSymbol = g, ye.IsTemplateLiteral = E, ye.IsThis = H, ye.IsTransform = p, ye.IsTuple = Z, ye.IsUndefined = L, ye.IsUnionLiteral = j, ye.IsUnion = se, ye.IsUint8Array = te, ye.IsUnknown = fe, ye.IsUnsafe = oe, ye.IsVoid = be, ye.IsKind = Ue, ye.IsSchema = Me;
  const e = /* @__PURE__ */ Sn(), n = /* @__PURE__ */ de(), r = /* @__PURE__ */ ze();
  class i extends r.TypeBoxError {
  }
  ye.TypeGuardUnknownTypeError = i;
  const o = [
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
  function t(b) {
    try {
      return new RegExp(b), !0;
    } catch {
      return !1;
    }
  }
  function a(b) {
    if (!e.IsString(b))
      return !1;
    for (let Pe = 0; Pe < b.length; Pe++) {
      const an = b.charCodeAt(Pe);
      if (an >= 7 && an <= 13 || an === 27 || an === 127)
        return !1;
    }
    return !0;
  }
  function u(b) {
    return f(b) || Me(b);
  }
  function d(b) {
    return e.IsUndefined(b) || e.IsBigInt(b);
  }
  function s(b) {
    return e.IsUndefined(b) || e.IsNumber(b);
  }
  function f(b) {
    return e.IsUndefined(b) || e.IsBoolean(b);
  }
  function c(b) {
    return e.IsUndefined(b) || e.IsString(b);
  }
  function y(b) {
    return e.IsUndefined(b) || e.IsString(b) && a(b) && t(b);
  }
  function w(b) {
    return e.IsUndefined(b) || e.IsString(b) && a(b);
  }
  function h(b) {
    return e.IsUndefined(b) || Me(b);
  }
  function M(b) {
    return e.IsObject(b) && b[n.ReadonlyKind] === "Readonly";
  }
  function U(b) {
    return e.IsObject(b) && b[n.OptionalKind] === "Optional";
  }
  function F(b) {
    return k(b, "Any") && c(b.$id);
  }
  function C(b) {
    return k(b, "Array") && b.type === "array" && c(b.$id) && Me(b.items) && s(b.minItems) && s(b.maxItems) && f(b.uniqueItems) && h(b.contains) && s(b.minContains) && s(b.maxContains);
  }
  function G(b) {
    return k(b, "AsyncIterator") && b.type === "AsyncIterator" && c(b.$id) && Me(b.items);
  }
  function $(b) {
    return k(b, "BigInt") && b.type === "bigint" && c(b.$id) && d(b.exclusiveMaximum) && d(b.exclusiveMinimum) && d(b.maximum) && d(b.minimum) && d(b.multipleOf);
  }
  function _(b) {
    return k(b, "Boolean") && b.type === "boolean" && c(b.$id);
  }
  function x(b) {
    return k(b, "Computed") && e.IsString(b.target) && e.IsArray(b.parameters) && b.parameters.every((Pe) => Me(Pe));
  }
  function T(b) {
    return k(b, "Constructor") && b.type === "Constructor" && c(b.$id) && e.IsArray(b.parameters) && b.parameters.every((Pe) => Me(Pe)) && Me(b.returns);
  }
  function P(b) {
    return k(b, "Date") && b.type === "Date" && c(b.$id) && s(b.exclusiveMaximumTimestamp) && s(b.exclusiveMinimumTimestamp) && s(b.maximumTimestamp) && s(b.minimumTimestamp) && s(b.multipleOfTimestamp);
  }
  function R(b) {
    return k(b, "Function") && b.type === "Function" && c(b.$id) && e.IsArray(b.parameters) && b.parameters.every((Pe) => Me(Pe)) && Me(b.returns);
  }
  function l(b) {
    return k(b, "Import") && e.HasPropertyKey(b, "$defs") && e.IsObject(b.$defs) && S(b.$defs) && e.HasPropertyKey(b, "$ref") && e.IsString(b.$ref) && b.$ref in b.$defs;
  }
  function B(b) {
    return k(b, "Integer") && b.type === "integer" && c(b.$id) && s(b.exclusiveMaximum) && s(b.exclusiveMinimum) && s(b.maximum) && s(b.minimum) && s(b.multipleOf);
  }
  function S(b) {
    return e.IsObject(b) && Object.entries(b).every(([Pe, an]) => a(Pe) && Me(an));
  }
  function q(b) {
    return k(b, "Intersect") && !(e.IsString(b.type) && b.type !== "object") && e.IsArray(b.allOf) && b.allOf.every((Pe) => Me(Pe) && !p(Pe)) && c(b.type) && (f(b.unevaluatedProperties) || h(b.unevaluatedProperties)) && c(b.$id);
  }
  function V(b) {
    return k(b, "Iterator") && b.type === "Iterator" && c(b.$id) && Me(b.items);
  }
  function k(b, Pe) {
    return e.IsObject(b) && n.Kind in b && b[n.Kind] === Pe;
  }
  function ne(b) {
    return we(b) && e.IsString(b.const);
  }
  function re(b) {
    return we(b) && e.IsNumber(b.const);
  }
  function W(b) {
    return we(b) && e.IsBoolean(b.const);
  }
  function we(b) {
    return k(b, "Literal") && c(b.$id) && xe(b.const);
  }
  function xe(b) {
    return e.IsBoolean(b) || e.IsNumber(b) || e.IsString(b);
  }
  function Le(b) {
    return k(b, "MappedKey") && e.IsArray(b.keys) && b.keys.every((Pe) => e.IsNumber(Pe) || e.IsString(Pe));
  }
  function Ne(b) {
    return k(b, "MappedResult") && S(b.properties);
  }
  function Ke(b) {
    return k(b, "Never") && e.IsObject(b.not) && Object.getOwnPropertyNames(b.not).length === 0;
  }
  function Re(b) {
    return k(b, "Not") && Me(b.not);
  }
  function Ge(b) {
    return k(b, "Null") && b.type === "null" && c(b.$id);
  }
  function Q(b) {
    return k(b, "Number") && b.type === "number" && c(b.$id) && s(b.exclusiveMaximum) && s(b.exclusiveMinimum) && s(b.maximum) && s(b.minimum) && s(b.multipleOf);
  }
  function ee(b) {
    return k(b, "Object") && b.type === "object" && c(b.$id) && S(b.properties) && u(b.additionalProperties) && s(b.minProperties) && s(b.maxProperties);
  }
  function Ie(b) {
    return k(b, "Promise") && b.type === "Promise" && c(b.$id) && Me(b.item);
  }
  function Ae(b) {
    return k(b, "Record") && b.type === "object" && c(b.$id) && u(b.additionalProperties) && e.IsObject(b.patternProperties) && ((Pe) => {
      const an = Object.getOwnPropertyNames(Pe.patternProperties);
      return an.length === 1 && t(an[0]) && e.IsObject(Pe.patternProperties) && Me(Pe.patternProperties[an[0]]);
    })(b);
  }
  function X(b) {
    return e.IsObject(b) && n.Hint in b && b[n.Hint] === "Recursive";
  }
  function J(b) {
    return k(b, "Ref") && c(b.$id) && e.IsString(b.$ref);
  }
  function D(b) {
    return k(b, "RegExp") && c(b.$id) && e.IsString(b.source) && e.IsString(b.flags) && s(b.maxLength) && s(b.minLength);
  }
  function m(b) {
    return k(b, "String") && b.type === "string" && c(b.$id) && s(b.minLength) && s(b.maxLength) && y(b.pattern) && w(b.format);
  }
  function g(b) {
    return k(b, "Symbol") && b.type === "symbol" && c(b.$id);
  }
  function E(b) {
    return k(b, "TemplateLiteral") && b.type === "string" && e.IsString(b.pattern) && b.pattern[0] === "^" && b.pattern[b.pattern.length - 1] === "$";
  }
  function H(b) {
    return k(b, "This") && c(b.$id) && e.IsString(b.$ref);
  }
  function p(b) {
    return e.IsObject(b) && n.TransformKind in b;
  }
  function Z(b) {
    return k(b, "Tuple") && b.type === "array" && c(b.$id) && e.IsNumber(b.minItems) && e.IsNumber(b.maxItems) && b.minItems === b.maxItems && // empty
    (e.IsUndefined(b.items) && e.IsUndefined(b.additionalItems) && b.minItems === 0 || e.IsArray(b.items) && b.items.every((Pe) => Me(Pe)));
  }
  function L(b) {
    return k(b, "Undefined") && b.type === "undefined" && c(b.$id);
  }
  function j(b) {
    return se(b) && b.anyOf.every((Pe) => ne(Pe) || re(Pe));
  }
  function se(b) {
    return k(b, "Union") && c(b.$id) && e.IsObject(b) && e.IsArray(b.anyOf) && b.anyOf.every((Pe) => Me(Pe));
  }
  function te(b) {
    return k(b, "Uint8Array") && b.type === "Uint8Array" && c(b.$id) && s(b.minByteLength) && s(b.maxByteLength);
  }
  function fe(b) {
    return k(b, "Unknown") && c(b.$id);
  }
  function oe(b) {
    return k(b, "Unsafe");
  }
  function be(b) {
    return k(b, "Void") && b.type === "void" && c(b.$id);
  }
  function Ue(b) {
    return e.IsObject(b) && n.Kind in b && e.IsString(b[n.Kind]) && !o.includes(b[n.Kind]);
  }
  function Me(b) {
    return e.IsObject(b) && (F(b) || C(b) || _(b) || $(b) || G(b) || x(b) || T(b) || P(b) || R(b) || B(b) || q(b) || V(b) || we(b) || Le(b) || Ne(b) || Ke(b) || Re(b) || Ge(b) || Q(b) || ee(b) || Ie(b) || Ae(b) || J(b) || D(b) || m(b) || g(b) || E(b) || H(b) || Z(b) || L(b) || se(b) || te(b) || fe(b) || oe(b) || be(b) || Ue(b));
  }
  return ye;
}
var Ay;
function Hg() {
  return Ay || (Ay = 1, Object.defineProperty(ut, "__esModule", { value: !0 }), ut.ValueGuard = ut.TypeGuard = ut.KindGuard = void 0, ut.KindGuard = /* @__PURE__ */ Fe(), ut.TypeGuard = /* @__PURE__ */ Gg(), ut.ValueGuard = /* @__PURE__ */ Sn()), ut;
}
var wy;
function Wg() {
  if (wy) return Ot;
  wy = 1, Object.defineProperty(Ot, "__esModule", { value: !0 }), Ot.ExtendsResult = Ot.ExtendsResolverError = void 0, Ot.ExtendsCheck = Ln;
  const e = /* @__PURE__ */ _a(), n = /* @__PURE__ */ Gi(), r = /* @__PURE__ */ go(), i = /* @__PURE__ */ _o(), o = /* @__PURE__ */ Io(), t = /* @__PURE__ */ nt(), a = /* @__PURE__ */ ma(), u = /* @__PURE__ */ de(), d = /* @__PURE__ */ ze(), s = /* @__PURE__ */ Hg();
  class f extends d.TypeBoxError {
  }
  Ot.ExtendsResolverError = f;
  var c;
  (function(I) {
    I[I.Union = 0] = "Union", I[I.True = 1] = "True", I[I.False = 2] = "False";
  })(c || (Ot.ExtendsResult = c = {}));
  function y(I) {
    return I === c.False ? I : c.True;
  }
  function w(I) {
    throw new f(I);
  }
  function h(I) {
    return s.TypeGuard.IsNever(I) || s.TypeGuard.IsIntersect(I) || s.TypeGuard.IsUnion(I) || s.TypeGuard.IsUnknown(I) || s.TypeGuard.IsAny(I);
  }
  function M(I, O) {
    return s.TypeGuard.IsNever(O) ? re() : s.TypeGuard.IsIntersect(O) ? q(I, O) : s.TypeGuard.IsUnion(O) ? ae(I, O) : s.TypeGuard.IsUnknown(O) ? Te() : s.TypeGuard.IsAny(O) ? U() : w("StructuralRight");
  }
  function U(I, O) {
    return c.True;
  }
  function F(I, O) {
    return s.TypeGuard.IsIntersect(O) ? q(I, O) : s.TypeGuard.IsUnion(O) && O.anyOf.some((Oe) => s.TypeGuard.IsAny(Oe) || s.TypeGuard.IsUnknown(Oe)) ? c.True : s.TypeGuard.IsUnion(O) ? c.Union : s.TypeGuard.IsUnknown(O) || s.TypeGuard.IsAny(O) ? c.True : c.Union;
  }
  function C(I, O) {
    return s.TypeGuard.IsUnknown(I) ? c.False : s.TypeGuard.IsAny(I) ? c.Union : s.TypeGuard.IsNever(I) ? c.True : c.False;
  }
  function G(I, O) {
    return s.TypeGuard.IsObject(O) && g(O) ? c.True : h(O) ? M(I, O) : s.TypeGuard.IsArray(O) ? y(_e(I.items, O.items)) : c.False;
  }
  function $(I, O) {
    return h(O) ? M(I, O) : s.TypeGuard.IsAsyncIterator(O) ? y(_e(I.items, O.items)) : c.False;
  }
  function _(I, O) {
    return h(O) ? M(I, O) : s.TypeGuard.IsObject(O) ? p(I, O) : s.TypeGuard.IsRecord(O) ? te(I, O) : s.TypeGuard.IsBigInt(O) ? c.True : c.False;
  }
  function x(I, O) {
    return s.TypeGuard.IsLiteralBoolean(I) || s.TypeGuard.IsBoolean(I) ? c.True : c.False;
  }
  function T(I, O) {
    return h(O) ? M(I, O) : s.TypeGuard.IsObject(O) ? p(I, O) : s.TypeGuard.IsRecord(O) ? te(I, O) : s.TypeGuard.IsBoolean(O) ? c.True : c.False;
  }
  function P(I, O) {
    return h(O) ? M(I, O) : s.TypeGuard.IsObject(O) ? p(I, O) : s.TypeGuard.IsConstructor(O) ? I.parameters.length > O.parameters.length ? c.False : I.parameters.every((Oe, gn) => y(_e(O.parameters[gn], Oe)) === c.True) ? y(_e(I.returns, O.returns)) : c.False : c.False;
  }
  function R(I, O) {
    return h(O) ? M(I, O) : s.TypeGuard.IsObject(O) ? p(I, O) : s.TypeGuard.IsRecord(O) ? te(I, O) : s.TypeGuard.IsDate(O) ? c.True : c.False;
  }
  function l(I, O) {
    return h(O) ? M(I, O) : s.TypeGuard.IsObject(O) ? p(I, O) : s.TypeGuard.IsFunction(O) ? I.parameters.length > O.parameters.length ? c.False : I.parameters.every((Oe, gn) => y(_e(O.parameters[gn], Oe)) === c.True) ? y(_e(I.returns, O.returns)) : c.False : c.False;
  }
  function B(I, O) {
    return s.TypeGuard.IsLiteral(I) && s.ValueGuard.IsNumber(I.const) || s.TypeGuard.IsNumber(I) || s.TypeGuard.IsInteger(I) ? c.True : c.False;
  }
  function S(I, O) {
    return s.TypeGuard.IsInteger(O) || s.TypeGuard.IsNumber(O) ? c.True : h(O) ? M(I, O) : s.TypeGuard.IsObject(O) ? p(I, O) : s.TypeGuard.IsRecord(O) ? te(I, O) : c.False;
  }
  function q(I, O) {
    return O.allOf.every((Oe) => _e(I, Oe) === c.True) ? c.True : c.False;
  }
  function V(I, O) {
    return I.allOf.some((Oe) => _e(Oe, O) === c.True) ? c.True : c.False;
  }
  function k(I, O) {
    return h(O) ? M(I, O) : s.TypeGuard.IsIterator(O) ? y(_e(I.items, O.items)) : c.False;
  }
  function ne(I, O) {
    return s.TypeGuard.IsLiteral(O) && O.const === I.const ? c.True : h(O) ? M(I, O) : s.TypeGuard.IsObject(O) ? p(I, O) : s.TypeGuard.IsRecord(O) ? te(I, O) : s.TypeGuard.IsString(O) ? be(I) : s.TypeGuard.IsNumber(O) ? Ne(I) : s.TypeGuard.IsInteger(O) ? B(I) : s.TypeGuard.IsBoolean(O) ? x(I) : c.False;
  }
  function re(I, O) {
    return c.False;
  }
  function W(I, O) {
    return c.True;
  }
  function we(I) {
    let [O, Oe] = [I, 0];
    for (; s.TypeGuard.IsNot(O); )
      O = O.not, Oe += 1;
    return Oe % 2 === 0 ? O : (0, o.Unknown)();
  }
  function xe(I, O) {
    return s.TypeGuard.IsNot(I) ? _e(we(I), O) : s.TypeGuard.IsNot(O) ? _e(I, we(O)) : w("Invalid fallthrough for Not");
  }
  function Le(I, O) {
    return h(O) ? M(I, O) : s.TypeGuard.IsObject(O) ? p(I, O) : s.TypeGuard.IsRecord(O) ? te(I, O) : s.TypeGuard.IsNull(O) ? c.True : c.False;
  }
  function Ne(I, O) {
    return s.TypeGuard.IsLiteralNumber(I) || s.TypeGuard.IsNumber(I) || s.TypeGuard.IsInteger(I) ? c.True : c.False;
  }
  function Ke(I, O) {
    return h(O) ? M(I, O) : s.TypeGuard.IsObject(O) ? p(I, O) : s.TypeGuard.IsRecord(O) ? te(I, O) : s.TypeGuard.IsInteger(O) || s.TypeGuard.IsNumber(O) ? c.True : c.False;
  }
  function Re(I, O) {
    return Object.getOwnPropertyNames(I.properties).length === O;
  }
  function Ge(I) {
    return g(I);
  }
  function Q(I) {
    return Re(I, 0) || Re(I, 1) && "description" in I.properties && s.TypeGuard.IsUnion(I.properties.description) && I.properties.description.anyOf.length === 2 && (s.TypeGuard.IsString(I.properties.description.anyOf[0]) && s.TypeGuard.IsUndefined(I.properties.description.anyOf[1]) || s.TypeGuard.IsString(I.properties.description.anyOf[1]) && s.TypeGuard.IsUndefined(I.properties.description.anyOf[0]));
  }
  function ee(I) {
    return Re(I, 0);
  }
  function Ie(I) {
    return Re(I, 0);
  }
  function Ae(I) {
    return Re(I, 0);
  }
  function X(I) {
    return Re(I, 0);
  }
  function J(I) {
    return g(I);
  }
  function D(I) {
    const O = (0, r.Number)();
    return Re(I, 0) || Re(I, 1) && "length" in I.properties && y(_e(I.properties.length, O)) === c.True;
  }
  function m(I) {
    return Re(I, 0);
  }
  function g(I) {
    const O = (0, r.Number)();
    return Re(I, 0) || Re(I, 1) && "length" in I.properties && y(_e(I.properties.length, O)) === c.True;
  }
  function E(I) {
    const O = (0, n.Function)([(0, e.Any)()], (0, e.Any)());
    return Re(I, 0) || Re(I, 1) && "then" in I.properties && y(_e(I.properties.then, O)) === c.True;
  }
  function H(I, O) {
    return _e(I, O) === c.False || s.TypeGuard.IsOptional(I) && !s.TypeGuard.IsOptional(O) ? c.False : c.True;
  }
  function p(I, O) {
    return s.TypeGuard.IsUnknown(I) ? c.False : s.TypeGuard.IsAny(I) ? c.Union : s.TypeGuard.IsNever(I) || s.TypeGuard.IsLiteralString(I) && Ge(O) || s.TypeGuard.IsLiteralNumber(I) && ee(O) || s.TypeGuard.IsLiteralBoolean(I) && Ie(O) || s.TypeGuard.IsSymbol(I) && Q(O) || s.TypeGuard.IsBigInt(I) && Ae(O) || s.TypeGuard.IsString(I) && Ge(O) || s.TypeGuard.IsSymbol(I) && Q(O) || s.TypeGuard.IsNumber(I) && ee(O) || s.TypeGuard.IsInteger(I) && ee(O) || s.TypeGuard.IsBoolean(I) && Ie(O) || s.TypeGuard.IsUint8Array(I) && J(O) || s.TypeGuard.IsDate(I) && X(O) || s.TypeGuard.IsConstructor(I) && m(O) || s.TypeGuard.IsFunction(I) && D(O) ? c.True : s.TypeGuard.IsRecord(I) && s.TypeGuard.IsString(j(I)) ? O[u.Hint] === "Record" ? c.True : c.False : s.TypeGuard.IsRecord(I) && s.TypeGuard.IsNumber(j(I)) ? Re(O, 0) ? c.True : c.False : c.False;
  }
  function Z(I, O) {
    return h(O) ? M(I, O) : s.TypeGuard.IsRecord(O) ? te(I, O) : s.TypeGuard.IsObject(O) ? (() => {
      for (const Oe of Object.getOwnPropertyNames(O.properties)) {
        if (!(Oe in I.properties) && !s.TypeGuard.IsOptional(O.properties[Oe]))
          return c.False;
        if (s.TypeGuard.IsOptional(O.properties[Oe]))
          return c.True;
        if (H(I.properties[Oe], O.properties[Oe]) === c.False)
          return c.False;
      }
      return c.True;
    })() : c.False;
  }
  function L(I, O) {
    return h(O) ? M(I, O) : s.TypeGuard.IsObject(O) && E(O) ? c.True : s.TypeGuard.IsPromise(O) ? y(_e(I.item, O.item)) : c.False;
  }
  function j(I) {
    return a.PatternNumberExact in I.patternProperties ? (0, r.Number)() : a.PatternStringExact in I.patternProperties ? (0, i.String)() : w("Unknown record key pattern");
  }
  function se(I) {
    return a.PatternNumberExact in I.patternProperties ? I.patternProperties[a.PatternNumberExact] : a.PatternStringExact in I.patternProperties ? I.patternProperties[a.PatternStringExact] : w("Unable to get record value schema");
  }
  function te(I, O) {
    const [Oe, gn] = [j(O), se(O)];
    return s.TypeGuard.IsLiteralString(I) && s.TypeGuard.IsNumber(Oe) && y(_e(I, gn)) === c.True ? c.True : s.TypeGuard.IsUint8Array(I) && s.TypeGuard.IsNumber(Oe) || s.TypeGuard.IsString(I) && s.TypeGuard.IsNumber(Oe) || s.TypeGuard.IsArray(I) && s.TypeGuard.IsNumber(Oe) ? _e(I, gn) : s.TypeGuard.IsObject(I) ? (() => {
      for (const uc of Object.getOwnPropertyNames(I.properties))
        if (H(gn, I.properties[uc]) === c.False)
          return c.False;
      return c.True;
    })() : c.False;
  }
  function fe(I, O) {
    return h(O) ? M(I, O) : s.TypeGuard.IsObject(O) ? p(I, O) : s.TypeGuard.IsRecord(O) ? _e(se(I), se(O)) : c.False;
  }
  function oe(I, O) {
    const Oe = s.TypeGuard.IsRegExp(I) ? (0, i.String)() : I, gn = s.TypeGuard.IsRegExp(O) ? (0, i.String)() : O;
    return _e(Oe, gn);
  }
  function be(I, O) {
    return s.TypeGuard.IsLiteral(I) && s.ValueGuard.IsString(I.const) || s.TypeGuard.IsString(I) ? c.True : c.False;
  }
  function Ue(I, O) {
    return h(O) ? M(I, O) : s.TypeGuard.IsObject(O) ? p(I, O) : s.TypeGuard.IsRecord(O) ? te(I, O) : s.TypeGuard.IsString(O) ? c.True : c.False;
  }
  function Me(I, O) {
    return h(O) ? M(I, O) : s.TypeGuard.IsObject(O) ? p(I, O) : s.TypeGuard.IsRecord(O) ? te(I, O) : s.TypeGuard.IsSymbol(O) ? c.True : c.False;
  }
  function b(I, O) {
    return s.TypeGuard.IsTemplateLiteral(I) ? _e((0, t.TemplateLiteralToUnion)(I), O) : s.TypeGuard.IsTemplateLiteral(O) ? _e(I, (0, t.TemplateLiteralToUnion)(O)) : w("Invalid fallthrough for TemplateLiteral");
  }
  function Pe(I, O) {
    return s.TypeGuard.IsArray(O) && I.items !== void 0 && I.items.every((Oe) => _e(Oe, O.items) === c.True);
  }
  function an(I, O) {
    return s.TypeGuard.IsNever(I) ? c.True : s.TypeGuard.IsUnknown(I) ? c.False : s.TypeGuard.IsAny(I) ? c.Union : c.False;
  }
  function Aa(I, O) {
    return h(O) ? M(I, O) : s.TypeGuard.IsObject(O) && g(O) || s.TypeGuard.IsArray(O) && Pe(I, O) ? c.True : s.TypeGuard.IsTuple(O) ? s.ValueGuard.IsUndefined(I.items) && !s.ValueGuard.IsUndefined(O.items) || !s.ValueGuard.IsUndefined(I.items) && s.ValueGuard.IsUndefined(O.items) ? c.False : s.ValueGuard.IsUndefined(I.items) && !s.ValueGuard.IsUndefined(O.items) || I.items.every((Oe, gn) => _e(Oe, O.items[gn]) === c.True) ? c.True : c.False : c.False;
  }
  function ac(I, O) {
    return h(O) ? M(I, O) : s.TypeGuard.IsObject(O) ? p(I, O) : s.TypeGuard.IsRecord(O) ? te(I, O) : s.TypeGuard.IsUint8Array(O) ? c.True : c.False;
  }
  function v(I, O) {
    return h(O) ? M(I, O) : s.TypeGuard.IsObject(O) ? p(I, O) : s.TypeGuard.IsRecord(O) ? te(I, O) : s.TypeGuard.IsVoid(O) ? pe(I) : s.TypeGuard.IsUndefined(O) ? c.True : c.False;
  }
  function ae(I, O) {
    return O.anyOf.some((Oe) => _e(I, Oe) === c.True) ? c.True : c.False;
  }
  function K(I, O) {
    return I.anyOf.every((Oe) => _e(Oe, O) === c.True) ? c.True : c.False;
  }
  function Te(I, O) {
    return c.True;
  }
  function ce(I, O) {
    return s.TypeGuard.IsNever(O) ? re() : s.TypeGuard.IsIntersect(O) ? q(I, O) : s.TypeGuard.IsUnion(O) ? ae(I, O) : s.TypeGuard.IsAny(O) ? U() : s.TypeGuard.IsString(O) ? be(I) : s.TypeGuard.IsNumber(O) ? Ne(I) : s.TypeGuard.IsInteger(O) ? B(I) : s.TypeGuard.IsBoolean(O) ? x(I) : s.TypeGuard.IsArray(O) ? C(I) : s.TypeGuard.IsTuple(O) ? an(I) : s.TypeGuard.IsObject(O) ? p(I, O) : s.TypeGuard.IsUnknown(O) ? c.True : c.False;
  }
  function pe(I, O) {
    return s.TypeGuard.IsUndefined(I) || s.TypeGuard.IsUndefined(I) ? c.True : c.False;
  }
  function qe(I, O) {
    return s.TypeGuard.IsIntersect(O) ? q(I, O) : s.TypeGuard.IsUnion(O) ? ae(I, O) : s.TypeGuard.IsUnknown(O) ? Te() : s.TypeGuard.IsAny(O) ? U() : s.TypeGuard.IsObject(O) ? p(I, O) : s.TypeGuard.IsVoid(O) ? c.True : c.False;
  }
  function _e(I, O) {
    return (
      // resolvable
      s.TypeGuard.IsTemplateLiteral(I) || s.TypeGuard.IsTemplateLiteral(O) ? b(I, O) : s.TypeGuard.IsRegExp(I) || s.TypeGuard.IsRegExp(O) ? oe(I, O) : s.TypeGuard.IsNot(I) || s.TypeGuard.IsNot(O) ? xe(I, O) : (
        // standard
        s.TypeGuard.IsAny(I) ? F(I, O) : s.TypeGuard.IsArray(I) ? G(I, O) : s.TypeGuard.IsBigInt(I) ? _(I, O) : s.TypeGuard.IsBoolean(I) ? T(I, O) : s.TypeGuard.IsAsyncIterator(I) ? $(I, O) : s.TypeGuard.IsConstructor(I) ? P(I, O) : s.TypeGuard.IsDate(I) ? R(I, O) : s.TypeGuard.IsFunction(I) ? l(I, O) : s.TypeGuard.IsInteger(I) ? S(I, O) : s.TypeGuard.IsIntersect(I) ? V(I, O) : s.TypeGuard.IsIterator(I) ? k(I, O) : s.TypeGuard.IsLiteral(I) ? ne(I, O) : s.TypeGuard.IsNever(I) ? W() : s.TypeGuard.IsNull(I) ? Le(I, O) : s.TypeGuard.IsNumber(I) ? Ke(I, O) : s.TypeGuard.IsObject(I) ? Z(I, O) : s.TypeGuard.IsRecord(I) ? fe(I, O) : s.TypeGuard.IsString(I) ? Ue(I, O) : s.TypeGuard.IsSymbol(I) ? Me(I, O) : s.TypeGuard.IsTuple(I) ? Aa(I, O) : s.TypeGuard.IsPromise(I) ? L(I, O) : s.TypeGuard.IsUint8Array(I) ? ac(I, O) : s.TypeGuard.IsUndefined(I) ? v(I, O) : s.TypeGuard.IsUnion(I) ? K(I, O) : s.TypeGuard.IsUnknown(I) ? ce(I, O) : s.TypeGuard.IsVoid(I) ? qe(I, O) : w(`Unknown left type operand '${I[u.Kind]}'`)
      )
    );
  }
  function Ln(I, O) {
    return _e(I, O);
  }
  return Ot;
}
var lu = {}, mu = {}, Tu = {}, Ry;
function zg() {
  if (Ry) return Tu;
  Ry = 1, Object.defineProperty(Tu, "__esModule", { value: !0 }), Tu.ExtendsFromMappedResult = t;
  const e = /* @__PURE__ */ rn(), n = /* @__PURE__ */ Md(), r = /* @__PURE__ */ En();
  function i(a, u, d, s, f) {
    const c = {};
    for (const y of globalThis.Object.getOwnPropertyNames(a))
      c[y] = (0, n.Extends)(a[y], u, d, s, (0, r.Clone)(f));
    return c;
  }
  function o(a, u, d, s, f) {
    return i(a.properties, u, d, s, f);
  }
  function t(a, u, d, s, f) {
    const c = o(a, u, d, s, f);
    return (0, e.MappedResult)(c);
  }
  return Tu;
}
var $y;
function Md() {
  if ($y) return mu;
  $y = 1, Object.defineProperty(mu, "__esModule", { value: !0 }), mu.Extends = u;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ Ye(), r = /* @__PURE__ */ Wg(), i = /* @__PURE__ */ kg(), o = /* @__PURE__ */ zg(), t = /* @__PURE__ */ Fe();
  function a(d, s, f, c) {
    const y = (0, r.ExtendsCheck)(d, s);
    return y === r.ExtendsResult.Union ? (0, n.Union)([f, c]) : y === r.ExtendsResult.True ? f : c;
  }
  function u(d, s, f, c, y) {
    return (0, t.IsMappedResult)(d) ? (0, o.ExtendsFromMappedResult)(d, s, f, c, y) : (0, t.IsMappedKey)(d) ? (0, e.CreateType)((0, i.ExtendsFromMappedKey)(d, s, f, c, y)) : (0, e.CreateType)(a(d, s, f, c), y);
  }
  return mu;
}
var hy;
function kg() {
  if (hy) return lu;
  hy = 1, Object.defineProperty(lu, "__esModule", { value: !0 }), lu.ExtendsFromMappedKey = u;
  const e = /* @__PURE__ */ rn(), n = /* @__PURE__ */ _n(), r = /* @__PURE__ */ Md(), i = /* @__PURE__ */ En();
  function o(d, s, f, c, y) {
    return {
      [d]: (0, r.Extends)((0, n.Literal)(d), s, f, c, (0, i.Clone)(y))
    };
  }
  function t(d, s, f, c, y) {
    return d.reduce((w, h) => ({ ...w, ...o(h, s, f, c, y) }), {});
  }
  function a(d, s, f, c, y) {
    return t(d.keys, s, f, c, y);
  }
  function u(d, s, f, c, y) {
    const w = a(d, s, f, c, y);
    return (0, e.MappedResult)(w);
  }
  return lu;
}
var By;
function Po() {
  return By || (By = 1, function(e) {
    var n = Mr && Mr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Mr && Mr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Wg(), e), r(/* @__PURE__ */ kg(), e), r(/* @__PURE__ */ zg(), e), r(/* @__PURE__ */ Bd(), e), r(/* @__PURE__ */ Md(), e);
  }(Mr)), Mr;
}
var My;
function Yg() {
  if (My) return ki;
  My = 1, Object.defineProperty(ki, "__esModule", { value: !0 }), ki.ValueCheckUnknownTypeError = void 0, ki.Check = D;
  const e = /* @__PURE__ */ Od(), n = /* @__PURE__ */ Jn(), r = /* @__PURE__ */ ga(), i = /* @__PURE__ */ de(), o = /* @__PURE__ */ Yn(), t = /* @__PURE__ */ Po(), a = /* @__PURE__ */ To(), u = /* @__PURE__ */ ze(), d = /* @__PURE__ */ Tn(), s = /* @__PURE__ */ tn(), f = /* @__PURE__ */ Fe();
  class c extends u.TypeBoxError {
    constructor(g) {
      super("Unknown type"), this.schema = g;
    }
  }
  ki.ValueCheckUnknownTypeError = c;
  function y(m) {
    return m[i.Kind] === "Any" || m[i.Kind] === "Unknown";
  }
  function w(m) {
    return m !== void 0;
  }
  function h(m, g, E) {
    return !0;
  }
  function M(m, g, E) {
    if (!(0, s.IsArray)(E) || w(m.minItems) && !(E.length >= m.minItems) || w(m.maxItems) && !(E.length <= m.maxItems) || !E.every((Z) => J(m.items, g, Z)) || m.uniqueItems === !0 && !function() {
      const Z = /* @__PURE__ */ new Set();
      for (const L of E) {
        const j = (0, r.Hash)(L);
        if (Z.has(j))
          return !1;
        Z.add(j);
      }
      return !0;
    }())
      return !1;
    if (!(w(m.contains) || (0, s.IsNumber)(m.minContains) || (0, s.IsNumber)(m.maxContains)))
      return !0;
    const H = w(m.contains) ? m.contains : (0, d.Never)(), p = E.reduce((Z, L) => J(H, g, L) ? Z + 1 : Z, 0);
    return !(p === 0 || (0, s.IsNumber)(m.minContains) && p < m.minContains || (0, s.IsNumber)(m.maxContains) && p > m.maxContains);
  }
  function U(m, g, E) {
    return (0, s.IsAsyncIterator)(E);
  }
  function F(m, g, E) {
    return !(!(0, s.IsBigInt)(E) || w(m.exclusiveMaximum) && !(E < m.exclusiveMaximum) || w(m.exclusiveMinimum) && !(E > m.exclusiveMinimum) || w(m.maximum) && !(E <= m.maximum) || w(m.minimum) && !(E >= m.minimum) || w(m.multipleOf) && E % m.multipleOf !== BigInt(0));
  }
  function C(m, g, E) {
    return (0, s.IsBoolean)(E);
  }
  function G(m, g, E) {
    return J(m.returns, g, E.prototype);
  }
  function $(m, g, E) {
    return !(!(0, s.IsDate)(E) || w(m.exclusiveMaximumTimestamp) && !(E.getTime() < m.exclusiveMaximumTimestamp) || w(m.exclusiveMinimumTimestamp) && !(E.getTime() > m.exclusiveMinimumTimestamp) || w(m.maximumTimestamp) && !(E.getTime() <= m.maximumTimestamp) || w(m.minimumTimestamp) && !(E.getTime() >= m.minimumTimestamp) || w(m.multipleOfTimestamp) && E.getTime() % m.multipleOfTimestamp !== 0);
  }
  function _(m, g, E) {
    return (0, s.IsFunction)(E);
  }
  function x(m, g, E) {
    const H = globalThis.Object.values(m.$defs), p = m.$defs[m.$ref];
    return J(p, [...g, ...H], E);
  }
  function T(m, g, E) {
    return !(!(0, s.IsInteger)(E) || w(m.exclusiveMaximum) && !(E < m.exclusiveMaximum) || w(m.exclusiveMinimum) && !(E > m.exclusiveMinimum) || w(m.maximum) && !(E <= m.maximum) || w(m.minimum) && !(E >= m.minimum) || w(m.multipleOf) && E % m.multipleOf !== 0);
  }
  function P(m, g, E) {
    const H = m.allOf.every((p) => J(p, g, E));
    if (m.unevaluatedProperties === !1) {
      const p = new RegExp((0, o.KeyOfPattern)(m)), Z = Object.getOwnPropertyNames(E).every((L) => p.test(L));
      return H && Z;
    } else if ((0, f.IsSchema)(m.unevaluatedProperties)) {
      const p = new RegExp((0, o.KeyOfPattern)(m)), Z = Object.getOwnPropertyNames(E).every((L) => p.test(L) || J(m.unevaluatedProperties, g, E[L]));
      return H && Z;
    } else
      return H;
  }
  function R(m, g, E) {
    return (0, s.IsIterator)(E);
  }
  function l(m, g, E) {
    return E === m.const;
  }
  function B(m, g, E) {
    return !1;
  }
  function S(m, g, E) {
    return !J(m.not, g, E);
  }
  function q(m, g, E) {
    return (0, s.IsNull)(E);
  }
  function V(m, g, E) {
    return !(!e.TypeSystemPolicy.IsNumberLike(E) || w(m.exclusiveMaximum) && !(E < m.exclusiveMaximum) || w(m.exclusiveMinimum) && !(E > m.exclusiveMinimum) || w(m.minimum) && !(E >= m.minimum) || w(m.maximum) && !(E <= m.maximum) || w(m.multipleOf) && E % m.multipleOf !== 0);
  }
  function k(m, g, E) {
    if (!e.TypeSystemPolicy.IsObjectLike(E) || w(m.minProperties) && !(Object.getOwnPropertyNames(E).length >= m.minProperties) || w(m.maxProperties) && !(Object.getOwnPropertyNames(E).length <= m.maxProperties))
      return !1;
    const H = Object.getOwnPropertyNames(m.properties);
    for (const p of H) {
      const Z = m.properties[p];
      if (m.required && m.required.includes(p)) {
        if (!J(Z, g, E[p]) || ((0, t.ExtendsUndefinedCheck)(Z) || y(Z)) && !(p in E))
          return !1;
      } else if (e.TypeSystemPolicy.IsExactOptionalProperty(E, p) && !J(Z, g, E[p]))
        return !1;
    }
    if (m.additionalProperties === !1) {
      const p = Object.getOwnPropertyNames(E);
      return m.required && m.required.length === H.length && p.length === H.length ? !0 : p.every((Z) => H.includes(Z));
    } else return typeof m.additionalProperties == "object" ? Object.getOwnPropertyNames(E).every((Z) => H.includes(Z) || J(m.additionalProperties, g, E[Z])) : !0;
  }
  function ne(m, g, E) {
    return (0, s.IsPromise)(E);
  }
  function re(m, g, E) {
    if (!e.TypeSystemPolicy.IsRecordLike(E) || w(m.minProperties) && !(Object.getOwnPropertyNames(E).length >= m.minProperties) || w(m.maxProperties) && !(Object.getOwnPropertyNames(E).length <= m.maxProperties))
      return !1;
    const [H, p] = Object.entries(m.patternProperties)[0], Z = new RegExp(H), L = Object.entries(E).every(([te, fe]) => Z.test(te) ? J(p, g, fe) : !0), j = typeof m.additionalProperties == "object" ? Object.entries(E).every(([te, fe]) => Z.test(te) ? !0 : J(m.additionalProperties, g, fe)) : !0, se = m.additionalProperties === !1 ? Object.getOwnPropertyNames(E).every((te) => Z.test(te)) : !0;
    return L && j && se;
  }
  function W(m, g, E) {
    return J((0, n.Deref)(m, g), g, E);
  }
  function we(m, g, E) {
    const H = new RegExp(m.source, m.flags);
    return w(m.minLength) && !(E.length >= m.minLength) || w(m.maxLength) && !(E.length <= m.maxLength) ? !1 : H.test(E);
  }
  function xe(m, g, E) {
    return !(0, s.IsString)(E) || w(m.minLength) && !(E.length >= m.minLength) || w(m.maxLength) && !(E.length <= m.maxLength) || w(m.pattern) && !new RegExp(m.pattern).test(E) ? !1 : w(m.format) ? a.FormatRegistry.Has(m.format) ? a.FormatRegistry.Get(m.format)(E) : !1 : !0;
  }
  function Le(m, g, E) {
    return (0, s.IsSymbol)(E);
  }
  function Ne(m, g, E) {
    return (0, s.IsString)(E) && new RegExp(m.pattern).test(E);
  }
  function Ke(m, g, E) {
    return J((0, n.Deref)(m, g), g, E);
  }
  function Re(m, g, E) {
    if (!(0, s.IsArray)(E) || m.items === void 0 && E.length !== 0 || E.length !== m.maxItems)
      return !1;
    if (!m.items)
      return !0;
    for (let H = 0; H < m.items.length; H++)
      if (!J(m.items[H], g, E[H]))
        return !1;
    return !0;
  }
  function Ge(m, g, E) {
    return (0, s.IsUndefined)(E);
  }
  function Q(m, g, E) {
    return m.anyOf.some((H) => J(H, g, E));
  }
  function ee(m, g, E) {
    return !(!(0, s.IsUint8Array)(E) || w(m.maxByteLength) && !(E.length <= m.maxByteLength) || w(m.minByteLength) && !(E.length >= m.minByteLength));
  }
  function Ie(m, g, E) {
    return !0;
  }
  function Ae(m, g, E) {
    return e.TypeSystemPolicy.IsVoidLike(E);
  }
  function X(m, g, E) {
    return a.TypeRegistry.Has(m[i.Kind]) ? a.TypeRegistry.Get(m[i.Kind])(m, E) : !1;
  }
  function J(m, g, E) {
    const H = w(m.$id) ? (0, n.Pushref)(m, g) : g, p = m;
    switch (p[i.Kind]) {
      case "Any":
        return h();
      case "Array":
        return M(p, H, E);
      case "AsyncIterator":
        return U(p, H, E);
      case "BigInt":
        return F(p, H, E);
      case "Boolean":
        return C(p, H, E);
      case "Constructor":
        return G(p, H, E);
      case "Date":
        return $(p, H, E);
      case "Function":
        return _(p, H, E);
      case "Import":
        return x(p, H, E);
      case "Integer":
        return T(p, H, E);
      case "Intersect":
        return P(p, H, E);
      case "Iterator":
        return R(p, H, E);
      case "Literal":
        return l(p, H, E);
      case "Never":
        return B();
      case "Not":
        return S(p, H, E);
      case "Null":
        return q(p, H, E);
      case "Number":
        return V(p, H, E);
      case "Object":
        return k(p, H, E);
      case "Promise":
        return ne(p, H, E);
      case "Record":
        return re(p, H, E);
      case "Ref":
        return W(p, H, E);
      case "RegExp":
        return we(p, H, E);
      case "String":
        return xe(p, H, E);
      case "Symbol":
        return Le(p, H, E);
      case "TemplateLiteral":
        return Ne(p, H, E);
      case "This":
        return Ke(p, H, E);
      case "Tuple":
        return Re(p, H, E);
      case "Undefined":
        return Ge(p, H, E);
      case "Union":
        return Q(p, H, E);
      case "Uint8Array":
        return ee(p, H, E);
      case "Unknown":
        return Ie();
      case "Void":
        return Ae(p, H, E);
      default:
        if (!a.TypeRegistry.Has(p[i.Kind]))
          throw new c(p);
        return X(p, H, E);
    }
  }
  function D(...m) {
    return m.length === 3 ? J(m[0], m[1], m[2]) : J(m[0], [], m[1]);
  }
  return ki;
}
var Sy;
function qn() {
  return Sy || (Sy = 1, function(e) {
    var n = Br && Br.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Br && Br.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Yg(), e);
  }(Br)), Br;
}
var Ey;
function Jg() {
  if (Ey) return Zn;
  Ey = 1, Object.defineProperty(Zn, "__esModule", { value: !0 }), Zn.ValueErrorIterator = Zn.ValueErrorsUnknownTypeError = Zn.ValueErrorType = void 0, Zn.Errors = H;
  const e = /* @__PURE__ */ Od(), n = /* @__PURE__ */ Yn(), r = /* @__PURE__ */ To(), i = /* @__PURE__ */ Bd(), o = /* @__PURE__ */ Vg(), t = /* @__PURE__ */ ze(), a = /* @__PURE__ */ Jn(), u = /* @__PURE__ */ ga(), d = /* @__PURE__ */ qn(), s = /* @__PURE__ */ de(), f = /* @__PURE__ */ Tn(), c = /* @__PURE__ */ tn();
  var y;
  (function(p) {
    p[p.ArrayContains = 0] = "ArrayContains", p[p.ArrayMaxContains = 1] = "ArrayMaxContains", p[p.ArrayMaxItems = 2] = "ArrayMaxItems", p[p.ArrayMinContains = 3] = "ArrayMinContains", p[p.ArrayMinItems = 4] = "ArrayMinItems", p[p.ArrayUniqueItems = 5] = "ArrayUniqueItems", p[p.Array = 6] = "Array", p[p.AsyncIterator = 7] = "AsyncIterator", p[p.BigIntExclusiveMaximum = 8] = "BigIntExclusiveMaximum", p[p.BigIntExclusiveMinimum = 9] = "BigIntExclusiveMinimum", p[p.BigIntMaximum = 10] = "BigIntMaximum", p[p.BigIntMinimum = 11] = "BigIntMinimum", p[p.BigIntMultipleOf = 12] = "BigIntMultipleOf", p[p.BigInt = 13] = "BigInt", p[p.Boolean = 14] = "Boolean", p[p.DateExclusiveMaximumTimestamp = 15] = "DateExclusiveMaximumTimestamp", p[p.DateExclusiveMinimumTimestamp = 16] = "DateExclusiveMinimumTimestamp", p[p.DateMaximumTimestamp = 17] = "DateMaximumTimestamp", p[p.DateMinimumTimestamp = 18] = "DateMinimumTimestamp", p[p.DateMultipleOfTimestamp = 19] = "DateMultipleOfTimestamp", p[p.Date = 20] = "Date", p[p.Function = 21] = "Function", p[p.IntegerExclusiveMaximum = 22] = "IntegerExclusiveMaximum", p[p.IntegerExclusiveMinimum = 23] = "IntegerExclusiveMinimum", p[p.IntegerMaximum = 24] = "IntegerMaximum", p[p.IntegerMinimum = 25] = "IntegerMinimum", p[p.IntegerMultipleOf = 26] = "IntegerMultipleOf", p[p.Integer = 27] = "Integer", p[p.IntersectUnevaluatedProperties = 28] = "IntersectUnevaluatedProperties", p[p.Intersect = 29] = "Intersect", p[p.Iterator = 30] = "Iterator", p[p.Kind = 31] = "Kind", p[p.Literal = 32] = "Literal", p[p.Never = 33] = "Never", p[p.Not = 34] = "Not", p[p.Null = 35] = "Null", p[p.NumberExclusiveMaximum = 36] = "NumberExclusiveMaximum", p[p.NumberExclusiveMinimum = 37] = "NumberExclusiveMinimum", p[p.NumberMaximum = 38] = "NumberMaximum", p[p.NumberMinimum = 39] = "NumberMinimum", p[p.NumberMultipleOf = 40] = "NumberMultipleOf", p[p.Number = 41] = "Number", p[p.ObjectAdditionalProperties = 42] = "ObjectAdditionalProperties", p[p.ObjectMaxProperties = 43] = "ObjectMaxProperties", p[p.ObjectMinProperties = 44] = "ObjectMinProperties", p[p.ObjectRequiredProperty = 45] = "ObjectRequiredProperty", p[p.Object = 46] = "Object", p[p.Promise = 47] = "Promise", p[p.RegExp = 48] = "RegExp", p[p.StringFormatUnknown = 49] = "StringFormatUnknown", p[p.StringFormat = 50] = "StringFormat", p[p.StringMaxLength = 51] = "StringMaxLength", p[p.StringMinLength = 52] = "StringMinLength", p[p.StringPattern = 53] = "StringPattern", p[p.String = 54] = "String", p[p.Symbol = 55] = "Symbol", p[p.TupleLength = 56] = "TupleLength", p[p.Tuple = 57] = "Tuple", p[p.Uint8ArrayMaxByteLength = 58] = "Uint8ArrayMaxByteLength", p[p.Uint8ArrayMinByteLength = 59] = "Uint8ArrayMinByteLength", p[p.Uint8Array = 60] = "Uint8Array", p[p.Undefined = 61] = "Undefined", p[p.Union = 62] = "Union", p[p.Void = 63] = "Void";
  })(y || (Zn.ValueErrorType = y = {}));
  class w extends t.TypeBoxError {
    constructor(Z) {
      super("Unknown type"), this.schema = Z;
    }
  }
  Zn.ValueErrorsUnknownTypeError = w;
  function h(p) {
    return p.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  function M(p) {
    return p !== void 0;
  }
  class U {
    constructor(Z) {
      this.iterator = Z;
    }
    [Symbol.iterator]() {
      return this.iterator;
    }
    /** Returns the first value error or undefined if no errors */
    First() {
      const Z = this.iterator.next();
      return Z.done ? void 0 : Z.value;
    }
  }
  Zn.ValueErrorIterator = U;
  function F(p, Z, L, j, se = []) {
    return {
      type: p,
      schema: Z,
      path: L,
      value: j,
      message: (0, o.GetErrorFunction)()({ errorType: p, path: L, schema: Z, value: j, errors: se }),
      errors: se
    };
  }
  function* C(p, Z, L, j) {
  }
  function* G(p, Z, L, j) {
    if (!(0, c.IsArray)(j))
      return yield F(y.Array, p, L, j);
    M(p.minItems) && !(j.length >= p.minItems) && (yield F(y.ArrayMinItems, p, L, j)), M(p.maxItems) && !(j.length <= p.maxItems) && (yield F(y.ArrayMaxItems, p, L, j));
    for (let fe = 0; fe < j.length; fe++)
      yield* E(p.items, Z, `${L}/${fe}`, j[fe]);
    if (p.uniqueItems === !0 && !function() {
      const fe = /* @__PURE__ */ new Set();
      for (const oe of j) {
        const be = (0, u.Hash)(oe);
        if (fe.has(be))
          return !1;
        fe.add(be);
      }
      return !0;
    }() && (yield F(y.ArrayUniqueItems, p, L, j)), !(M(p.contains) || M(p.minContains) || M(p.maxContains)))
      return;
    const se = M(p.contains) ? p.contains : (0, f.Never)(), te = j.reduce((fe, oe, be) => E(se, Z, `${L}${be}`, oe).next().done === !0 ? fe + 1 : fe, 0);
    te === 0 && (yield F(y.ArrayContains, p, L, j)), (0, c.IsNumber)(p.minContains) && te < p.minContains && (yield F(y.ArrayMinContains, p, L, j)), (0, c.IsNumber)(p.maxContains) && te > p.maxContains && (yield F(y.ArrayMaxContains, p, L, j));
  }
  function* $(p, Z, L, j) {
    (0, c.IsAsyncIterator)(j) || (yield F(y.AsyncIterator, p, L, j));
  }
  function* _(p, Z, L, j) {
    if (!(0, c.IsBigInt)(j))
      return yield F(y.BigInt, p, L, j);
    M(p.exclusiveMaximum) && !(j < p.exclusiveMaximum) && (yield F(y.BigIntExclusiveMaximum, p, L, j)), M(p.exclusiveMinimum) && !(j > p.exclusiveMinimum) && (yield F(y.BigIntExclusiveMinimum, p, L, j)), M(p.maximum) && !(j <= p.maximum) && (yield F(y.BigIntMaximum, p, L, j)), M(p.minimum) && !(j >= p.minimum) && (yield F(y.BigIntMinimum, p, L, j)), M(p.multipleOf) && j % p.multipleOf !== BigInt(0) && (yield F(y.BigIntMultipleOf, p, L, j));
  }
  function* x(p, Z, L, j) {
    (0, c.IsBoolean)(j) || (yield F(y.Boolean, p, L, j));
  }
  function* T(p, Z, L, j) {
    yield* E(p.returns, Z, L, j.prototype);
  }
  function* P(p, Z, L, j) {
    if (!(0, c.IsDate)(j))
      return yield F(y.Date, p, L, j);
    M(p.exclusiveMaximumTimestamp) && !(j.getTime() < p.exclusiveMaximumTimestamp) && (yield F(y.DateExclusiveMaximumTimestamp, p, L, j)), M(p.exclusiveMinimumTimestamp) && !(j.getTime() > p.exclusiveMinimumTimestamp) && (yield F(y.DateExclusiveMinimumTimestamp, p, L, j)), M(p.maximumTimestamp) && !(j.getTime() <= p.maximumTimestamp) && (yield F(y.DateMaximumTimestamp, p, L, j)), M(p.minimumTimestamp) && !(j.getTime() >= p.minimumTimestamp) && (yield F(y.DateMinimumTimestamp, p, L, j)), M(p.multipleOfTimestamp) && j.getTime() % p.multipleOfTimestamp !== 0 && (yield F(y.DateMultipleOfTimestamp, p, L, j));
  }
  function* R(p, Z, L, j) {
    (0, c.IsFunction)(j) || (yield F(y.Function, p, L, j));
  }
  function* l(p, Z, L, j) {
    const se = globalThis.Object.values(p.$defs), te = p.$defs[p.$ref];
    yield* E(te, [...Z, ...se], L, j);
  }
  function* B(p, Z, L, j) {
    if (!(0, c.IsInteger)(j))
      return yield F(y.Integer, p, L, j);
    M(p.exclusiveMaximum) && !(j < p.exclusiveMaximum) && (yield F(y.IntegerExclusiveMaximum, p, L, j)), M(p.exclusiveMinimum) && !(j > p.exclusiveMinimum) && (yield F(y.IntegerExclusiveMinimum, p, L, j)), M(p.maximum) && !(j <= p.maximum) && (yield F(y.IntegerMaximum, p, L, j)), M(p.minimum) && !(j >= p.minimum) && (yield F(y.IntegerMinimum, p, L, j)), M(p.multipleOf) && j % p.multipleOf !== 0 && (yield F(y.IntegerMultipleOf, p, L, j));
  }
  function* S(p, Z, L, j) {
    let se = !1;
    for (const te of p.allOf)
      for (const fe of E(te, Z, L, j))
        se = !0, yield fe;
    if (se)
      return yield F(y.Intersect, p, L, j);
    if (p.unevaluatedProperties === !1) {
      const te = new RegExp((0, n.KeyOfPattern)(p));
      for (const fe of Object.getOwnPropertyNames(j))
        te.test(fe) || (yield F(y.IntersectUnevaluatedProperties, p, `${L}/${fe}`, j));
    }
    if (typeof p.unevaluatedProperties == "object") {
      const te = new RegExp((0, n.KeyOfPattern)(p));
      for (const fe of Object.getOwnPropertyNames(j))
        if (!te.test(fe)) {
          const oe = E(p.unevaluatedProperties, Z, `${L}/${fe}`, j[fe]).next();
          oe.done || (yield oe.value);
        }
    }
  }
  function* q(p, Z, L, j) {
    (0, c.IsIterator)(j) || (yield F(y.Iterator, p, L, j));
  }
  function* V(p, Z, L, j) {
    j !== p.const && (yield F(y.Literal, p, L, j));
  }
  function* k(p, Z, L, j) {
    yield F(y.Never, p, L, j);
  }
  function* ne(p, Z, L, j) {
    E(p.not, Z, L, j).next().done === !0 && (yield F(y.Not, p, L, j));
  }
  function* re(p, Z, L, j) {
    (0, c.IsNull)(j) || (yield F(y.Null, p, L, j));
  }
  function* W(p, Z, L, j) {
    if (!e.TypeSystemPolicy.IsNumberLike(j))
      return yield F(y.Number, p, L, j);
    M(p.exclusiveMaximum) && !(j < p.exclusiveMaximum) && (yield F(y.NumberExclusiveMaximum, p, L, j)), M(p.exclusiveMinimum) && !(j > p.exclusiveMinimum) && (yield F(y.NumberExclusiveMinimum, p, L, j)), M(p.maximum) && !(j <= p.maximum) && (yield F(y.NumberMaximum, p, L, j)), M(p.minimum) && !(j >= p.minimum) && (yield F(y.NumberMinimum, p, L, j)), M(p.multipleOf) && j % p.multipleOf !== 0 && (yield F(y.NumberMultipleOf, p, L, j));
  }
  function* we(p, Z, L, j) {
    if (!e.TypeSystemPolicy.IsObjectLike(j))
      return yield F(y.Object, p, L, j);
    M(p.minProperties) && !(Object.getOwnPropertyNames(j).length >= p.minProperties) && (yield F(y.ObjectMinProperties, p, L, j)), M(p.maxProperties) && !(Object.getOwnPropertyNames(j).length <= p.maxProperties) && (yield F(y.ObjectMaxProperties, p, L, j));
    const se = Array.isArray(p.required) ? p.required : [], te = Object.getOwnPropertyNames(p.properties), fe = Object.getOwnPropertyNames(j);
    for (const oe of se)
      fe.includes(oe) || (yield F(y.ObjectRequiredProperty, p.properties[oe], `${L}/${h(oe)}`, void 0));
    if (p.additionalProperties === !1)
      for (const oe of fe)
        te.includes(oe) || (yield F(y.ObjectAdditionalProperties, p, `${L}/${h(oe)}`, j[oe]));
    if (typeof p.additionalProperties == "object")
      for (const oe of fe)
        te.includes(oe) || (yield* E(p.additionalProperties, Z, `${L}/${h(oe)}`, j[oe]));
    for (const oe of te) {
      const be = p.properties[oe];
      p.required && p.required.includes(oe) ? (yield* E(be, Z, `${L}/${h(oe)}`, j[oe]), (0, i.ExtendsUndefinedCheck)(p) && !(oe in j) && (yield F(y.ObjectRequiredProperty, be, `${L}/${h(oe)}`, void 0))) : e.TypeSystemPolicy.IsExactOptionalProperty(j, oe) && (yield* E(be, Z, `${L}/${h(oe)}`, j[oe]));
    }
  }
  function* xe(p, Z, L, j) {
    (0, c.IsPromise)(j) || (yield F(y.Promise, p, L, j));
  }
  function* Le(p, Z, L, j) {
    if (!e.TypeSystemPolicy.IsRecordLike(j))
      return yield F(y.Object, p, L, j);
    M(p.minProperties) && !(Object.getOwnPropertyNames(j).length >= p.minProperties) && (yield F(y.ObjectMinProperties, p, L, j)), M(p.maxProperties) && !(Object.getOwnPropertyNames(j).length <= p.maxProperties) && (yield F(y.ObjectMaxProperties, p, L, j));
    const [se, te] = Object.entries(p.patternProperties)[0], fe = new RegExp(se);
    for (const [oe, be] of Object.entries(j))
      fe.test(oe) && (yield* E(te, Z, `${L}/${h(oe)}`, be));
    if (typeof p.additionalProperties == "object")
      for (const [oe, be] of Object.entries(j))
        fe.test(oe) || (yield* E(p.additionalProperties, Z, `${L}/${h(oe)}`, be));
    if (p.additionalProperties === !1) {
      for (const [oe, be] of Object.entries(j))
        if (!fe.test(oe))
          return yield F(y.ObjectAdditionalProperties, p, `${L}/${h(oe)}`, be);
    }
  }
  function* Ne(p, Z, L, j) {
    yield* E((0, a.Deref)(p, Z), Z, L, j);
  }
  function* Ke(p, Z, L, j) {
    if (!(0, c.IsString)(j))
      return yield F(y.String, p, L, j);
    if (M(p.minLength) && !(j.length >= p.minLength) && (yield F(y.StringMinLength, p, L, j)), M(p.maxLength) && !(j.length <= p.maxLength) && (yield F(y.StringMaxLength, p, L, j)), !new RegExp(p.source, p.flags).test(j))
      return yield F(y.RegExp, p, L, j);
  }
  function* Re(p, Z, L, j) {
    if (!(0, c.IsString)(j))
      return yield F(y.String, p, L, j);
    M(p.minLength) && !(j.length >= p.minLength) && (yield F(y.StringMinLength, p, L, j)), M(p.maxLength) && !(j.length <= p.maxLength) && (yield F(y.StringMaxLength, p, L, j)), (0, c.IsString)(p.pattern) && (new RegExp(p.pattern).test(j) || (yield F(y.StringPattern, p, L, j))), (0, c.IsString)(p.format) && (r.FormatRegistry.Has(p.format) ? r.FormatRegistry.Get(p.format)(j) || (yield F(y.StringFormat, p, L, j)) : yield F(y.StringFormatUnknown, p, L, j));
  }
  function* Ge(p, Z, L, j) {
    (0, c.IsSymbol)(j) || (yield F(y.Symbol, p, L, j));
  }
  function* Q(p, Z, L, j) {
    if (!(0, c.IsString)(j))
      return yield F(y.String, p, L, j);
    new RegExp(p.pattern).test(j) || (yield F(y.StringPattern, p, L, j));
  }
  function* ee(p, Z, L, j) {
    yield* E((0, a.Deref)(p, Z), Z, L, j);
  }
  function* Ie(p, Z, L, j) {
    if (!(0, c.IsArray)(j))
      return yield F(y.Tuple, p, L, j);
    if (p.items === void 0 && j.length !== 0)
      return yield F(y.TupleLength, p, L, j);
    if (j.length !== p.maxItems)
      return yield F(y.TupleLength, p, L, j);
    if (p.items)
      for (let se = 0; se < p.items.length; se++)
        yield* E(p.items[se], Z, `${L}/${se}`, j[se]);
  }
  function* Ae(p, Z, L, j) {
    (0, c.IsUndefined)(j) || (yield F(y.Undefined, p, L, j));
  }
  function* X(p, Z, L, j) {
    if ((0, d.Check)(p, Z, j))
      return;
    const se = p.anyOf.map((te) => new U(E(te, Z, L, j)));
    yield F(y.Union, p, L, j, se);
  }
  function* J(p, Z, L, j) {
    if (!(0, c.IsUint8Array)(j))
      return yield F(y.Uint8Array, p, L, j);
    M(p.maxByteLength) && !(j.length <= p.maxByteLength) && (yield F(y.Uint8ArrayMaxByteLength, p, L, j)), M(p.minByteLength) && !(j.length >= p.minByteLength) && (yield F(y.Uint8ArrayMinByteLength, p, L, j));
  }
  function* D(p, Z, L, j) {
  }
  function* m(p, Z, L, j) {
    e.TypeSystemPolicy.IsVoidLike(j) || (yield F(y.Void, p, L, j));
  }
  function* g(p, Z, L, j) {
    r.TypeRegistry.Get(p[s.Kind])(p, j) || (yield F(y.Kind, p, L, j));
  }
  function* E(p, Z, L, j) {
    const se = M(p.$id) ? [...Z, p] : Z, te = p;
    switch (te[s.Kind]) {
      case "Any":
        return yield* C();
      case "Array":
        return yield* G(te, se, L, j);
      case "AsyncIterator":
        return yield* $(te, se, L, j);
      case "BigInt":
        return yield* _(te, se, L, j);
      case "Boolean":
        return yield* x(te, se, L, j);
      case "Constructor":
        return yield* T(te, se, L, j);
      case "Date":
        return yield* P(te, se, L, j);
      case "Function":
        return yield* R(te, se, L, j);
      case "Import":
        return yield* l(te, se, L, j);
      case "Integer":
        return yield* B(te, se, L, j);
      case "Intersect":
        return yield* S(te, se, L, j);
      case "Iterator":
        return yield* q(te, se, L, j);
      case "Literal":
        return yield* V(te, se, L, j);
      case "Never":
        return yield* k(te, se, L, j);
      case "Not":
        return yield* ne(te, se, L, j);
      case "Null":
        return yield* re(te, se, L, j);
      case "Number":
        return yield* W(te, se, L, j);
      case "Object":
        return yield* we(te, se, L, j);
      case "Promise":
        return yield* xe(te, se, L, j);
      case "Record":
        return yield* Le(te, se, L, j);
      case "Ref":
        return yield* Ne(te, se, L, j);
      case "RegExp":
        return yield* Ke(te, se, L, j);
      case "String":
        return yield* Re(te, se, L, j);
      case "Symbol":
        return yield* Ge(te, se, L, j);
      case "TemplateLiteral":
        return yield* Q(te, se, L, j);
      case "This":
        return yield* ee(te, se, L, j);
      case "Tuple":
        return yield* Ie(te, se, L, j);
      case "Undefined":
        return yield* Ae(te, se, L, j);
      case "Union":
        return yield* X(te, se, L, j);
      case "Uint8Array":
        return yield* J(te, se, L, j);
      case "Unknown":
        return yield* D();
      case "Void":
        return yield* m(te, se, L, j);
      default:
        if (!r.TypeRegistry.Has(te[s.Kind]))
          throw new w(p);
        return yield* g(te, se, L, j);
    }
  }
  function H(...p) {
    const Z = p.length === 3 ? E(p[0], p[1], "", p[2]) : E(p[0], [], "", p[1]);
    return new U(Z);
  }
  return Zn;
}
var Cy;
function Dt() {
  return Cy || (Cy = 1, function(e) {
    var n = qt && qt.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = qt && qt.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Jg(), e), r(/* @__PURE__ */ Vg(), e);
  }(qt)), qt;
}
var Cr = {}, Qn = {}, jy;
function Gh() {
  if (jy) return Qn;
  jy = 1;
  var e = Qn && Qn.__classPrivateFieldSet || function(c, y, w, h, M) {
    if (h === "m") throw new TypeError("Private method is not writable");
    if (h === "a" && !M) throw new TypeError("Private accessor was defined without a setter");
    if (typeof y == "function" ? c !== y || !M : !y.has(c)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return h === "a" ? M.call(c, w) : M ? M.value = w : y.set(c, w), w;
  }, n = Qn && Qn.__classPrivateFieldGet || function(c, y, w, h) {
    if (w === "a" && !h) throw new TypeError("Private accessor was defined without a getter");
    if (typeof y == "function" ? c !== y || !h : !y.has(c)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return w === "m" ? h : w === "a" ? h.call(c) : h ? h.value : y.get(c);
  }, r, i, o;
  Object.defineProperty(Qn, "__esModule", { value: !0 }), Qn.AssertError = void 0, Qn.Assert = f;
  const t = /* @__PURE__ */ Dt(), a = /* @__PURE__ */ hg(), u = /* @__PURE__ */ Yg();
  class d extends a.TypeBoxError {
    constructor(y) {
      const w = y.First();
      super(w === void 0 ? "Invalid Value" : w.message), r.add(this), i.set(this, void 0), e(this, i, y, "f"), this.error = w;
    }
    /** Returns an iterator for each error in this value. */
    Errors() {
      return new t.ValueErrorIterator(n(this, r, "m", o).call(this));
    }
  }
  Qn.AssertError = d, i = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakSet(), o = function* () {
    this.error && (yield this.error), yield* n(this, i, "f");
  };
  function s(c, y, w) {
    if (!(0, u.Check)(c, y, w))
      throw new d((0, t.Errors)(c, y, w));
  }
  function f(...c) {
    return c.length === 3 ? s(c[0], c[1], c[2]) : s(c[0], [], c[1]);
  }
  return Qn;
}
var Fy;
function Sd() {
  return Fy || (Fy = 1, function(e) {
    var n = Cr && Cr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Cr && Cr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Gh(), e);
  }(Cr)), Cr;
}
var jr = {}, Yi = {}, Fr = {}, Ji = {}, xr = {}, gu = {}, xy;
function Hh() {
  if (xy) return gu;
  xy = 1, Object.defineProperty(gu, "__esModule", { value: !0 }), gu.Clone = d;
  const e = /* @__PURE__ */ tn();
  function n(s) {
    const f = {};
    for (const c of Object.getOwnPropertyNames(s))
      f[c] = d(s[c]);
    for (const c of Object.getOwnPropertySymbols(s))
      f[c] = d(s[c]);
    return f;
  }
  function r(s) {
    return s.map((f) => d(f));
  }
  function i(s) {
    return s.slice();
  }
  function o(s) {
    return new Map(d([...s.entries()]));
  }
  function t(s) {
    return new Set(d([...s.entries()]));
  }
  function a(s) {
    return new Date(s.toISOString());
  }
  function u(s) {
    return s;
  }
  function d(s) {
    if ((0, e.IsArray)(s))
      return r(s);
    if ((0, e.IsDate)(s))
      return a(s);
    if ((0, e.IsTypedArray)(s))
      return i(s);
    if ((0, e.IsMap)(s))
      return o(s);
    if ((0, e.IsSet)(s))
      return t(s);
    if ((0, e.IsObject)(s))
      return n(s);
    if ((0, e.IsValueType)(s))
      return s;
    throw new Error("ValueClone: Unable to clone value");
  }
  return gu;
}
var Uy;
function rt() {
  return Uy || (Uy = 1, function(e) {
    var n = xr && xr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = xr && xr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Hh(), e);
  }(xr)), xr;
}
var Dy;
function Wh() {
  if (Dy) return Ji;
  Dy = 1, Object.defineProperty(Ji, "__esModule", { value: !0 }), Ji.ValueCreateError = void 0, Ji.Create = D;
  const e = /* @__PURE__ */ tn(), n = /* @__PURE__ */ qn(), r = /* @__PURE__ */ rt(), i = /* @__PURE__ */ Jn(), o = /* @__PURE__ */ nt(), t = /* @__PURE__ */ ma(), a = /* @__PURE__ */ To(), u = /* @__PURE__ */ de(), d = /* @__PURE__ */ ze(), s = /* @__PURE__ */ Pd();
  class f extends d.TypeBoxError {
    constructor(g, E) {
      super(E), this.schema = g;
    }
  }
  Ji.ValueCreateError = f;
  function c(m) {
    return (0, s.IsFunction)(m) ? m() : (0, r.Clone)(m);
  }
  function y(m, g) {
    return (0, e.HasPropertyKey)(m, "default") ? c(m.default) : {};
  }
  function w(m, g) {
    if (m.uniqueItems === !0 && !(0, e.HasPropertyKey)(m, "default"))
      throw new f(m, "Array with the uniqueItems constraint requires a default value");
    if ("contains" in m && !(0, e.HasPropertyKey)(m, "default"))
      throw new f(m, "Array with the contains constraint requires a default value");
    return "default" in m ? c(m.default) : m.minItems !== void 0 ? Array.from({ length: m.minItems }).map((E) => Ae(m.items, g)) : [];
  }
  function h(m, g) {
    return (0, e.HasPropertyKey)(m, "default") ? c(m.default) : async function* () {
    }();
  }
  function M(m, g) {
    return (0, e.HasPropertyKey)(m, "default") ? c(m.default) : BigInt(0);
  }
  function U(m, g) {
    return (0, e.HasPropertyKey)(m, "default") ? c(m.default) : !1;
  }
  function F(m, g) {
    if ((0, e.HasPropertyKey)(m, "default"))
      return c(m.default);
    {
      const E = Ae(m.returns, g);
      return typeof E == "object" && !Array.isArray(E) ? class {
        constructor() {
          for (const [H, p] of Object.entries(E)) {
            const Z = this;
            Z[H] = p;
          }
        }
      } : class {
      };
    }
  }
  function C(m, g) {
    return (0, e.HasPropertyKey)(m, "default") ? c(m.default) : m.minimumTimestamp !== void 0 ? new Date(m.minimumTimestamp) : /* @__PURE__ */ new Date();
  }
  function G(m, g) {
    return (0, e.HasPropertyKey)(m, "default") ? c(m.default) : () => Ae(m.returns, g);
  }
  function $(m, g) {
    const E = globalThis.Object.values(m.$defs), H = m.$defs[m.$ref];
    return Ae(H, [...g, ...E]);
  }
  function _(m, g) {
    return (0, e.HasPropertyKey)(m, "default") ? c(m.default) : m.minimum !== void 0 ? m.minimum : 0;
  }
  function x(m, g) {
    if ((0, e.HasPropertyKey)(m, "default"))
      return c(m.default);
    {
      const E = m.allOf.reduce((H, p) => {
        const Z = Ae(p, g);
        return typeof Z == "object" ? { ...H, ...Z } : Z;
      }, {});
      if (!(0, n.Check)(m, g, E))
        throw new f(m, "Intersect produced invalid value. Consider using a default value.");
      return E;
    }
  }
  function T(m, g) {
    return (0, e.HasPropertyKey)(m, "default") ? c(m.default) : function* () {
    }();
  }
  function P(m, g) {
    return (0, e.HasPropertyKey)(m, "default") ? c(m.default) : m.const;
  }
  function R(m, g) {
    if ((0, e.HasPropertyKey)(m, "default"))
      return c(m.default);
    throw new f(m, "Never types cannot be created. Consider using a default value.");
  }
  function l(m, g) {
    if ((0, e.HasPropertyKey)(m, "default"))
      return c(m.default);
    throw new f(m, "Not types must have a default value");
  }
  function B(m, g) {
    return (0, e.HasPropertyKey)(m, "default") ? c(m.default) : null;
  }
  function S(m, g) {
    return (0, e.HasPropertyKey)(m, "default") ? c(m.default) : m.minimum !== void 0 ? m.minimum : 0;
  }
  function q(m, g) {
    if ((0, e.HasPropertyKey)(m, "default"))
      return c(m.default);
    {
      const E = new Set(m.required), H = {};
      for (const [p, Z] of Object.entries(m.properties))
        E.has(p) && (H[p] = Ae(Z, g));
      return H;
    }
  }
  function V(m, g) {
    return (0, e.HasPropertyKey)(m, "default") ? c(m.default) : Promise.resolve(Ae(m.item, g));
  }
  function k(m, g) {
    const [E, H] = Object.entries(m.patternProperties)[0];
    if ((0, e.HasPropertyKey)(m, "default"))
      return c(m.default);
    if (E === t.PatternStringExact || E === t.PatternNumberExact)
      return {};
    {
      const p = E.slice(1, E.length - 1).split("|"), Z = {};
      for (const L of p)
        Z[L] = Ae(H, g);
      return Z;
    }
  }
  function ne(m, g) {
    return (0, e.HasPropertyKey)(m, "default") ? c(m.default) : Ae((0, i.Deref)(m, g), g);
  }
  function re(m, g) {
    if ((0, e.HasPropertyKey)(m, "default"))
      return c(m.default);
    throw new f(m, "RegExp types cannot be created. Consider using a default value.");
  }
  function W(m, g) {
    if (m.pattern !== void 0) {
      if ((0, e.HasPropertyKey)(m, "default"))
        return c(m.default);
      throw new f(m, "String types with patterns must specify a default value");
    } else if (m.format !== void 0) {
      if ((0, e.HasPropertyKey)(m, "default"))
        return c(m.default);
      throw new f(m, "String types with formats must specify a default value");
    } else
      return (0, e.HasPropertyKey)(m, "default") ? c(m.default) : m.minLength !== void 0 ? Array.from({ length: m.minLength }).map(() => " ").join("") : "";
  }
  function we(m, g) {
    return (0, e.HasPropertyKey)(m, "default") ? c(m.default) : "value" in m ? Symbol.for(m.value) : Symbol();
  }
  function xe(m, g) {
    if ((0, e.HasPropertyKey)(m, "default"))
      return c(m.default);
    if (!(0, o.IsTemplateLiteralFinite)(m))
      throw new f(m, "Can only create template literals that produce a finite variants. Consider using a default value.");
    return (0, o.TemplateLiteralGenerate)(m)[0];
  }
  function Le(m, g) {
    if (J++ > X)
      throw new f(m, "Cannot create recursive type as it appears possibly infinite. Consider using a default.");
    return (0, e.HasPropertyKey)(m, "default") ? c(m.default) : Ae((0, i.Deref)(m, g), g);
  }
  function Ne(m, g) {
    return (0, e.HasPropertyKey)(m, "default") ? c(m.default) : m.items === void 0 ? [] : Array.from({ length: m.minItems }).map((E, H) => Ae(m.items[H], g));
  }
  function Ke(m, g) {
    if ((0, e.HasPropertyKey)(m, "default"))
      return c(m.default);
  }
  function Re(m, g) {
    if ((0, e.HasPropertyKey)(m, "default"))
      return c(m.default);
    if (m.anyOf.length === 0)
      throw new Error("ValueCreate.Union: Cannot create Union with zero variants");
    return Ae(m.anyOf[0], g);
  }
  function Ge(m, g) {
    return (0, e.HasPropertyKey)(m, "default") ? c(m.default) : m.minByteLength !== void 0 ? new Uint8Array(m.minByteLength) : new Uint8Array(0);
  }
  function Q(m, g) {
    return (0, e.HasPropertyKey)(m, "default") ? c(m.default) : {};
  }
  function ee(m, g) {
    if ((0, e.HasPropertyKey)(m, "default"))
      return c(m.default);
  }
  function Ie(m, g) {
    if ((0, e.HasPropertyKey)(m, "default"))
      return c(m.default);
    throw new Error("User defined types must specify a default value");
  }
  function Ae(m, g) {
    const E = (0, i.Pushref)(m, g), H = m;
    switch (H[u.Kind]) {
      case "Any":
        return y(H);
      case "Array":
        return w(H, E);
      case "AsyncIterator":
        return h(H);
      case "BigInt":
        return M(H);
      case "Boolean":
        return U(H);
      case "Constructor":
        return F(H, E);
      case "Date":
        return C(H);
      case "Function":
        return G(H, E);
      case "Import":
        return $(H, E);
      case "Integer":
        return _(H);
      case "Intersect":
        return x(H, E);
      case "Iterator":
        return T(H);
      case "Literal":
        return P(H);
      case "Never":
        return R(H);
      case "Not":
        return l(H);
      case "Null":
        return B(H);
      case "Number":
        return S(H);
      case "Object":
        return q(H, E);
      case "Promise":
        return V(H, E);
      case "Record":
        return k(H, E);
      case "Ref":
        return ne(H, E);
      case "RegExp":
        return re(H);
      case "String":
        return W(H);
      case "Symbol":
        return we(H);
      case "TemplateLiteral":
        return xe(H);
      case "This":
        return Le(H, E);
      case "Tuple":
        return Ne(H, E);
      case "Undefined":
        return Ke(H);
      case "Union":
        return Re(H, E);
      case "Uint8Array":
        return Ge(H);
      case "Unknown":
        return Q(H);
      case "Void":
        return ee(H);
      default:
        if (!a.TypeRegistry.Has(H[u.Kind]))
          throw new f(H, "Unknown type");
        return Ie(H);
    }
  }
  const X = 512;
  let J = 0;
  function D(...m) {
    return J = 0, m.length === 2 ? Ae(m[0], m[1]) : Ae(m[0], []);
  }
  return Ji;
}
var vy;
function Ed() {
  return vy || (vy = 1, function(e) {
    var n = Fr && Fr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Fr && Fr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Wh(), e);
  }(Fr)), Fr;
}
var Ny;
function zh() {
  if (Ny) return Yi;
  Ny = 1, Object.defineProperty(Yi, "__esModule", { value: !0 }), Yi.ValueCastError = void 0, Yi.Cast = R;
  const e = /* @__PURE__ */ tn(), n = /* @__PURE__ */ ze(), r = /* @__PURE__ */ de(), i = /* @__PURE__ */ Ed(), o = /* @__PURE__ */ qn(), t = /* @__PURE__ */ rt(), a = /* @__PURE__ */ Jn();
  class u extends n.TypeBoxError {
    constructor(B, S) {
      super(S), this.schema = B;
    }
  }
  Yi.ValueCastError = u;
  function d(l, B, S) {
    if (l[r.Kind] === "Object" && typeof S == "object" && !(0, e.IsNull)(S)) {
      const q = l, V = Object.getOwnPropertyNames(S), k = Object.entries(q.properties), [ne, re] = [1 / k.length, k.length];
      return k.reduce((W, [we, xe]) => {
        const Le = xe[r.Kind] === "Literal" && xe.const === S[we] ? re : 0, Ne = (0, o.Check)(xe, B, S[we]) ? ne : 0, Ke = V.includes(we) ? ne : 0;
        return W + (Le + Ne + Ke);
      }, 0);
    } else
      return (0, o.Check)(l, B, S) ? 1 : 0;
  }
  function s(l, B, S) {
    const q = l.anyOf.map((ne) => (0, a.Deref)(ne, B));
    let [V, k] = [q[0], 0];
    for (const ne of q) {
      const re = d(ne, B, S);
      re > k && (V = ne, k = re);
    }
    return V;
  }
  function f(l, B, S) {
    if ("default" in l)
      return typeof S == "function" ? l.default : (0, t.Clone)(l.default);
    {
      const q = s(l, B, S);
      return R(q, B, S);
    }
  }
  function c(l, B, S) {
    return (0, o.Check)(l, B, S) ? (0, t.Clone)(S) : (0, i.Create)(l, B);
  }
  function y(l, B, S) {
    return (0, o.Check)(l, B, S) ? S : (0, i.Create)(l, B);
  }
  function w(l, B, S) {
    if ((0, o.Check)(l, B, S))
      return (0, t.Clone)(S);
    const q = (0, e.IsArray)(S) ? (0, t.Clone)(S) : (0, i.Create)(l, B), V = (0, e.IsNumber)(l.minItems) && q.length < l.minItems ? [...q, ...Array.from({ length: l.minItems - q.length }, () => null)] : q, ne = ((0, e.IsNumber)(l.maxItems) && V.length > l.maxItems ? V.slice(0, l.maxItems) : V).map((W) => P(l.items, B, W));
    if (l.uniqueItems !== !0)
      return ne;
    const re = [...new Set(ne)];
    if (!(0, o.Check)(l, B, re))
      throw new u(l, "Array cast produced invalid data due to uniqueItems constraint");
    return re;
  }
  function h(l, B, S) {
    if ((0, o.Check)(l, B, S))
      return (0, i.Create)(l, B);
    const q = new Set(l.returns.required || []), V = function() {
    };
    for (const [k, ne] of Object.entries(l.returns.properties))
      !q.has(k) && S.prototype[k] === void 0 || (V.prototype[k] = P(ne, B, S.prototype[k]));
    return V;
  }
  function M(l, B, S) {
    const q = globalThis.Object.values(l.$defs), V = l.$defs[l.$ref];
    return P(V, [...B, ...q], S);
  }
  function U(l, B, S) {
    const q = (0, i.Create)(l, B), V = (0, e.IsObject)(q) && (0, e.IsObject)(S) ? { ...q, ...S } : S;
    return (0, o.Check)(l, B, V) ? V : (0, i.Create)(l, B);
  }
  function F(l, B, S) {
    throw new u(l, "Never types cannot be cast");
  }
  function C(l, B, S) {
    if ((0, o.Check)(l, B, S))
      return S;
    if (S === null || typeof S != "object")
      return (0, i.Create)(l, B);
    const q = new Set(l.required || []), V = {};
    for (const [k, ne] of Object.entries(l.properties))
      !q.has(k) && S[k] === void 0 || (V[k] = P(ne, B, S[k]));
    if (typeof l.additionalProperties == "object") {
      const k = Object.getOwnPropertyNames(l.properties);
      for (const ne of Object.getOwnPropertyNames(S))
        k.includes(ne) || (V[ne] = P(l.additionalProperties, B, S[ne]));
    }
    return V;
  }
  function G(l, B, S) {
    if ((0, o.Check)(l, B, S))
      return (0, t.Clone)(S);
    if (S === null || typeof S != "object" || Array.isArray(S) || S instanceof Date)
      return (0, i.Create)(l, B);
    const q = Object.getOwnPropertyNames(l.patternProperties)[0], V = l.patternProperties[q], k = {};
    for (const [ne, re] of Object.entries(S))
      k[ne] = P(V, B, re);
    return k;
  }
  function $(l, B, S) {
    return P((0, a.Deref)(l, B), B, S);
  }
  function _(l, B, S) {
    return P((0, a.Deref)(l, B), B, S);
  }
  function x(l, B, S) {
    return (0, o.Check)(l, B, S) ? (0, t.Clone)(S) : (0, e.IsArray)(S) ? l.items === void 0 ? [] : l.items.map((q, V) => P(q, B, S[V])) : (0, i.Create)(l, B);
  }
  function T(l, B, S) {
    return (0, o.Check)(l, B, S) ? (0, t.Clone)(S) : f(l, B, S);
  }
  function P(l, B, S) {
    const q = (0, e.IsString)(l.$id) ? (0, a.Pushref)(l, B) : B, V = l;
    switch (l[r.Kind]) {
      // --------------------------------------------------------------
      // Structural
      // --------------------------------------------------------------
      case "Array":
        return w(V, q, S);
      case "Constructor":
        return h(V, q, S);
      case "Import":
        return M(V, q, S);
      case "Intersect":
        return U(V, q, S);
      case "Never":
        return F(V);
      case "Object":
        return C(V, q, S);
      case "Record":
        return G(V, q, S);
      case "Ref":
        return $(V, q, S);
      case "This":
        return _(V, q, S);
      case "Tuple":
        return x(V, q, S);
      case "Union":
        return T(V, q, S);
      // --------------------------------------------------------------
      // DefaultClone
      // --------------------------------------------------------------
      case "Date":
      case "Symbol":
      case "Uint8Array":
        return c(l, B, S);
      // --------------------------------------------------------------
      // Default
      // --------------------------------------------------------------
      default:
        return y(V, q, S);
    }
  }
  function R(...l) {
    return l.length === 3 ? P(l[0], l[1], l[2]) : P(l[0], [], l[1]);
  }
  return Yi;
}
var qy;
function Zg() {
  return qy || (qy = 1, function(e) {
    var n = jr && jr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = jr && jr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ zh(), e);
  }(jr)), jr;
}
var Ur = {}, _u = {}, Ly;
function kh() {
  if (Ly) return _u;
  Ly = 1, Object.defineProperty(_u, "__esModule", { value: !0 }), _u.Clean = C;
  const e = /* @__PURE__ */ Yn(), n = /* @__PURE__ */ qn(), r = /* @__PURE__ */ rt(), i = /* @__PURE__ */ Jn(), o = /* @__PURE__ */ de(), t = /* @__PURE__ */ tn(), a = /* @__PURE__ */ Fe();
  function u(G) {
    return (0, a.IsKind)(G) && G[o.Kind] !== "Unsafe";
  }
  function d(G, $, _) {
    return (0, t.IsArray)(_) ? _.map((x) => F(G.items, $, x)) : _;
  }
  function s(G, $, _) {
    const x = globalThis.Object.values(G.$defs), T = G.$defs[G.$ref];
    return F(T, [...$, ...x], _);
  }
  function f(G, $, _) {
    const x = G.unevaluatedProperties, P = G.allOf.map((l) => F(l, $, (0, r.Clone)(_))).reduce((l, B) => (0, t.IsObject)(B) ? { ...l, ...B } : B, {});
    if (!(0, t.IsObject)(_) || !(0, t.IsObject)(P) || !(0, a.IsKind)(x))
      return P;
    const R = (0, e.KeyOfPropertyKeys)(G);
    for (const l of Object.getOwnPropertyNames(_))
      R.includes(l) || (0, n.Check)(x, $, _[l]) && (P[l] = F(x, $, _[l]));
    return P;
  }
  function c(G, $, _) {
    if (!(0, t.IsObject)(_) || (0, t.IsArray)(_))
      return _;
    const x = G.additionalProperties;
    for (const T of Object.getOwnPropertyNames(_)) {
      if ((0, t.HasPropertyKey)(G.properties, T)) {
        _[T] = F(G.properties[T], $, _[T]);
        continue;
      }
      if ((0, a.IsKind)(x) && (0, n.Check)(x, $, _[T])) {
        _[T] = F(x, $, _[T]);
        continue;
      }
      delete _[T];
    }
    return _;
  }
  function y(G, $, _) {
    if (!(0, t.IsObject)(_))
      return _;
    const x = G.additionalProperties, T = Object.getOwnPropertyNames(_), [P, R] = Object.entries(G.patternProperties)[0], l = new RegExp(P);
    for (const B of T) {
      if (l.test(B)) {
        _[B] = F(R, $, _[B]);
        continue;
      }
      if ((0, a.IsKind)(x) && (0, n.Check)(x, $, _[B])) {
        _[B] = F(x, $, _[B]);
        continue;
      }
      delete _[B];
    }
    return _;
  }
  function w(G, $, _) {
    return F((0, i.Deref)(G, $), $, _);
  }
  function h(G, $, _) {
    return F((0, i.Deref)(G, $), $, _);
  }
  function M(G, $, _) {
    if (!(0, t.IsArray)(_))
      return _;
    if ((0, t.IsUndefined)(G.items))
      return [];
    const x = Math.min(_.length, G.items.length);
    for (let T = 0; T < x; T++)
      _[T] = F(G.items[T], $, _[T]);
    return _.length > x ? _.slice(0, x) : _;
  }
  function U(G, $, _) {
    for (const x of G.anyOf)
      if (u(x) && (0, n.Check)(x, $, _))
        return F(x, $, _);
    return _;
  }
  function F(G, $, _) {
    const x = (0, t.IsString)(G.$id) ? (0, i.Pushref)(G, $) : $, T = G;
    switch (T[o.Kind]) {
      case "Array":
        return d(T, x, _);
      case "Import":
        return s(T, x, _);
      case "Intersect":
        return f(T, x, _);
      case "Object":
        return c(T, x, _);
      case "Record":
        return y(T, x, _);
      case "Ref":
        return w(T, x, _);
      case "This":
        return h(T, x, _);
      case "Tuple":
        return M(T, x, _);
      case "Union":
        return U(T, x, _);
      default:
        return _;
    }
  }
  function C(...G) {
    return G.length === 3 ? F(G[0], G[1], G[2]) : F(G[0], [], G[1]);
  }
  return _u;
}
var Ky;
function Cd() {
  return Ky || (Ky = 1, function(e) {
    var n = Ur && Ur.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Ur && Ur.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ kh(), e);
  }(Ur)), Ur;
}
var Dr = {}, bu = {}, Vy;
function Yh() {
  if (Vy) return bu;
  Vy = 1, Object.defineProperty(bu, "__esModule", { value: !0 }), bu.Convert = J;
  const e = /* @__PURE__ */ rt(), n = /* @__PURE__ */ qn(), r = /* @__PURE__ */ Jn(), i = /* @__PURE__ */ de(), o = /* @__PURE__ */ tn();
  function t(D) {
    return (0, o.IsString)(D) && !isNaN(D) && !isNaN(parseFloat(D));
  }
  function a(D) {
    return (0, o.IsBigInt)(D) || (0, o.IsBoolean)(D) || (0, o.IsNumber)(D);
  }
  function u(D) {
    return D === !0 || (0, o.IsNumber)(D) && D === 1 || (0, o.IsBigInt)(D) && D === BigInt("1") || (0, o.IsString)(D) && (D.toLowerCase() === "true" || D === "1");
  }
  function d(D) {
    return D === !1 || (0, o.IsNumber)(D) && (D === 0 || Object.is(D, -0)) || (0, o.IsBigInt)(D) && D === BigInt("0") || (0, o.IsString)(D) && (D.toLowerCase() === "false" || D === "0" || D === "-0");
  }
  function s(D) {
    return (0, o.IsString)(D) && /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test(D);
  }
  function f(D) {
    return (0, o.IsString)(D) && /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test(D);
  }
  function c(D) {
    return (0, o.IsString)(D) && /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test(D);
  }
  function y(D) {
    return (0, o.IsString)(D) && /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test(D);
  }
  function w(D) {
    return (0, o.IsString)(D) && /^\d\d\d\d-[0-1]\d-[0-3]\d$/i.test(D);
  }
  function h(D, m) {
    const g = $(D);
    return g === m ? g : D;
  }
  function M(D, m) {
    const g = _(D);
    return g === m ? g : D;
  }
  function U(D, m) {
    const g = C(D);
    return g === m ? g : D;
  }
  function F(D, m) {
    return (0, o.IsString)(D.const) ? h(m, D.const) : (0, o.IsNumber)(D.const) ? M(m, D.const) : (0, o.IsBoolean)(D.const) ? U(m, D.const) : m;
  }
  function C(D) {
    return u(D) ? !0 : d(D) ? !1 : D;
  }
  function G(D) {
    const m = (g) => g.split(".")[0];
    return t(D) ? BigInt(m(D)) : (0, o.IsNumber)(D) ? BigInt(Math.trunc(D)) : d(D) ? BigInt(0) : u(D) ? BigInt(1) : D;
  }
  function $(D) {
    return (0, o.IsSymbol)(D) && D.description !== void 0 ? D.description.toString() : a(D) ? D.toString() : D;
  }
  function _(D) {
    return t(D) ? parseFloat(D) : u(D) ? 1 : d(D) ? 0 : D;
  }
  function x(D) {
    return t(D) ? parseInt(D) : (0, o.IsNumber)(D) ? D | 0 : u(D) ? 1 : d(D) ? 0 : D;
  }
  function T(D) {
    return (0, o.IsString)(D) && D.toLowerCase() === "null" ? null : D;
  }
  function P(D) {
    return (0, o.IsString)(D) && D === "undefined" ? void 0 : D;
  }
  function R(D) {
    return (0, o.IsDate)(D) ? D : (0, o.IsNumber)(D) ? new Date(D) : u(D) ? /* @__PURE__ */ new Date(1) : d(D) ? /* @__PURE__ */ new Date(0) : t(D) ? new Date(parseInt(D)) : f(D) ? /* @__PURE__ */ new Date(`1970-01-01T${D}.000Z`) : s(D) ? /* @__PURE__ */ new Date(`1970-01-01T${D}`) : y(D) ? /* @__PURE__ */ new Date(`${D}.000Z`) : c(D) ? new Date(D) : w(D) ? /* @__PURE__ */ new Date(`${D}T00:00:00.000Z`) : D;
  }
  function l(D) {
    return D;
  }
  function B(D, m, g) {
    return ((0, o.IsArray)(g) ? g : [g]).map((H) => X(D.items, m, H));
  }
  function S(D, m, g) {
    return G(g);
  }
  function q(D, m, g) {
    return C(g);
  }
  function V(D, m, g) {
    return R(g);
  }
  function k(D, m, g) {
    const E = globalThis.Object.values(D.$defs), H = D.$defs[D.$ref];
    return X(H, [...m, ...E], g);
  }
  function ne(D, m, g) {
    return x(g);
  }
  function re(D, m, g) {
    return D.allOf.reduce((E, H) => X(H, m, E), g);
  }
  function W(D, m, g) {
    return F(D, g);
  }
  function we(D, m, g) {
    return T(g);
  }
  function xe(D, m, g) {
    return _(g);
  }
  function Le(D, m, g) {
    if (!(0, o.IsObject)(g))
      return g;
    for (const E of Object.getOwnPropertyNames(D.properties))
      (0, o.HasPropertyKey)(g, E) && (g[E] = X(D.properties[E], m, g[E]));
    return g;
  }
  function Ne(D, m, g) {
    if (!(0, o.IsObject)(g))
      return g;
    const H = Object.getOwnPropertyNames(D.patternProperties)[0], p = D.patternProperties[H];
    for (const [Z, L] of Object.entries(g))
      g[Z] = X(p, m, L);
    return g;
  }
  function Ke(D, m, g) {
    return X((0, r.Deref)(D, m), m, g);
  }
  function Re(D, m, g) {
    return $(g);
  }
  function Ge(D, m, g) {
    return (0, o.IsString)(g) || (0, o.IsNumber)(g) ? Symbol(g) : g;
  }
  function Q(D, m, g) {
    return X((0, r.Deref)(D, m), m, g);
  }
  function ee(D, m, g) {
    return (0, o.IsArray)(g) && !(0, o.IsUndefined)(D.items) ? g.map((H, p) => p < D.items.length ? X(D.items[p], m, H) : H) : g;
  }
  function Ie(D, m, g) {
    return P(g);
  }
  function Ae(D, m, g) {
    for (const E of D.anyOf) {
      const H = X(E, m, (0, e.Clone)(g));
      if ((0, n.Check)(E, m, H))
        return H;
    }
    return g;
  }
  function X(D, m, g) {
    const E = (0, r.Pushref)(D, m), H = D;
    switch (D[i.Kind]) {
      case "Array":
        return B(H, E, g);
      case "BigInt":
        return S(H, E, g);
      case "Boolean":
        return q(H, E, g);
      case "Date":
        return V(H, E, g);
      case "Import":
        return k(H, E, g);
      case "Integer":
        return ne(H, E, g);
      case "Intersect":
        return re(H, E, g);
      case "Literal":
        return W(H, E, g);
      case "Null":
        return we(H, E, g);
      case "Number":
        return xe(H, E, g);
      case "Object":
        return Le(H, E, g);
      case "Record":
        return Ne(H, E, g);
      case "Ref":
        return Ke(H, E, g);
      case "String":
        return Re(H, E, g);
      case "Symbol":
        return Ge(H, E, g);
      case "This":
        return Q(H, E, g);
      case "Tuple":
        return ee(H, E, g);
      case "Undefined":
        return Ie(H, E, g);
      case "Union":
        return Ae(H, E, g);
      default:
        return g;
    }
  }
  function J(...D) {
    return D.length === 3 ? X(D[0], D[1], D[2]) : X(D[0], [], D[1]);
  }
  return bu;
}
var Gy;
function jd() {
  return Gy || (Gy = 1, function(e) {
    var n = Dr && Dr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Dr && Dr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Yh(), e);
  }(Dr)), Dr;
}
var vr = {}, Iu = {}, Nr = {}, At = {}, Hy;
function Jh() {
  if (Hy) return At;
  Hy = 1, Object.defineProperty(At, "__esModule", { value: !0 }), At.TransformDecodeError = At.TransformDecodeCheckError = void 0, At.TransformDecode = x;
  const e = /* @__PURE__ */ Ls(), n = /* @__PURE__ */ de(), r = /* @__PURE__ */ ze(), i = /* @__PURE__ */ Yn(), o = /* @__PURE__ */ Jn(), t = /* @__PURE__ */ qn(), a = /* @__PURE__ */ tn(), u = /* @__PURE__ */ Fe();
  class d extends r.TypeBoxError {
    constructor(P, R, l) {
      super("Unable to decode value as it does not match the expected schema"), this.schema = P, this.value = R, this.error = l;
    }
  }
  At.TransformDecodeCheckError = d;
  class s extends r.TypeBoxError {
    constructor(P, R, l, B) {
      super(B instanceof Error ? B.message : "Unknown error"), this.schema = P, this.path = R, this.value = l, this.error = B;
    }
  }
  At.TransformDecodeError = s;
  function f(T, P, R) {
    try {
      return (0, u.IsTransform)(T) ? T[n.TransformKind].Decode(R) : R;
    } catch (l) {
      throw new s(T, P, R, l);
    }
  }
  function c(T, P, R, l) {
    return (0, a.IsArray)(l) ? f(T, R, l.map((B, S) => _(T.items, P, `${R}/${S}`, B))) : f(T, R, l);
  }
  function y(T, P, R, l) {
    if (!(0, a.IsObject)(l) || (0, a.IsValueType)(l))
      return f(T, R, l);
    const B = (0, i.KeyOfPropertyEntries)(T), S = B.map((re) => re[0]), q = { ...l };
    for (const [re, W] of B)
      re in q && (q[re] = _(W, P, `${R}/${re}`, q[re]));
    if (!(0, u.IsTransform)(T.unevaluatedProperties))
      return f(T, R, q);
    const V = Object.getOwnPropertyNames(q), k = T.unevaluatedProperties, ne = { ...q };
    for (const re of V)
      S.includes(re) || (ne[re] = f(k, `${R}/${re}`, ne[re]));
    return f(T, R, ne);
  }
  function w(T, P, R, l) {
    const B = globalThis.Object.values(T.$defs), S = T.$defs[T.$ref], q = T[n.TransformKind], V = { [n.TransformKind]: q, ...S };
    return _(V, [...P, ...B], R, l);
  }
  function h(T, P, R, l) {
    return f(T, R, _(T.not, P, R, l));
  }
  function M(T, P, R, l) {
    if (!(0, a.IsObject)(l))
      return f(T, R, l);
    const B = (0, i.KeyOfPropertyKeys)(T), S = { ...l };
    for (const ne of B)
      (0, a.HasPropertyKey)(S, ne) && ((0, a.IsUndefined)(S[ne]) && (!(0, u.IsUndefined)(T.properties[ne]) || e.TypeSystemPolicy.IsExactOptionalProperty(S, ne)) || (S[ne] = _(T.properties[ne], P, `${R}/${ne}`, S[ne])));
    if (!(0, u.IsSchema)(T.additionalProperties))
      return f(T, R, S);
    const q = Object.getOwnPropertyNames(S), V = T.additionalProperties, k = { ...S };
    for (const ne of q)
      B.includes(ne) || (k[ne] = f(V, `${R}/${ne}`, k[ne]));
    return f(T, R, k);
  }
  function U(T, P, R, l) {
    if (!(0, a.IsObject)(l))
      return f(T, R, l);
    const B = Object.getOwnPropertyNames(T.patternProperties)[0], S = new RegExp(B), q = { ...l };
    for (const re of Object.getOwnPropertyNames(l))
      S.test(re) && (q[re] = _(T.patternProperties[B], P, `${R}/${re}`, q[re]));
    if (!(0, u.IsSchema)(T.additionalProperties))
      return f(T, R, q);
    const V = Object.getOwnPropertyNames(q), k = T.additionalProperties, ne = { ...q };
    for (const re of V)
      S.test(re) || (ne[re] = f(k, `${R}/${re}`, ne[re]));
    return f(T, R, ne);
  }
  function F(T, P, R, l) {
    const B = (0, o.Deref)(T, P);
    return f(T, R, _(B, P, R, l));
  }
  function C(T, P, R, l) {
    const B = (0, o.Deref)(T, P);
    return f(T, R, _(B, P, R, l));
  }
  function G(T, P, R, l) {
    return (0, a.IsArray)(l) && (0, a.IsArray)(T.items) ? f(T, R, T.items.map((B, S) => _(B, P, `${R}/${S}`, l[S]))) : f(T, R, l);
  }
  function $(T, P, R, l) {
    for (const B of T.anyOf) {
      if (!(0, t.Check)(B, P, l))
        continue;
      const S = _(B, P, R, l);
      return f(T, R, S);
    }
    return f(T, R, l);
  }
  function _(T, P, R, l) {
    const B = (0, o.Pushref)(T, P), S = T;
    switch (T[n.Kind]) {
      case "Array":
        return c(S, B, R, l);
      case "Import":
        return w(S, B, R, l);
      case "Intersect":
        return y(S, B, R, l);
      case "Not":
        return h(S, B, R, l);
      case "Object":
        return M(S, B, R, l);
      case "Record":
        return U(S, B, R, l);
      case "Ref":
        return F(S, B, R, l);
      case "Symbol":
        return f(S, R, l);
      case "This":
        return C(S, B, R, l);
      case "Tuple":
        return G(S, B, R, l);
      case "Union":
        return $(S, B, R, l);
      default:
        return f(S, R, l);
    }
  }
  function x(T, P, R) {
    return _(T, P, "", R);
  }
  return At;
}
var wt = {}, Wy;
function Zh() {
  if (Wy) return wt;
  Wy = 1, Object.defineProperty(wt, "__esModule", { value: !0 }), wt.TransformEncodeError = wt.TransformEncodeCheckError = void 0, wt.TransformEncode = x;
  const e = /* @__PURE__ */ Ls(), n = /* @__PURE__ */ de(), r = /* @__PURE__ */ ze(), i = /* @__PURE__ */ Yn(), o = /* @__PURE__ */ Jn(), t = /* @__PURE__ */ qn(), a = /* @__PURE__ */ tn(), u = /* @__PURE__ */ Fe();
  class d extends r.TypeBoxError {
    constructor(P, R, l) {
      super("The encoded value does not match the expected schema"), this.schema = P, this.value = R, this.error = l;
    }
  }
  wt.TransformEncodeCheckError = d;
  class s extends r.TypeBoxError {
    constructor(P, R, l, B) {
      super(`${B instanceof Error ? B.message : "Unknown error"}`), this.schema = P, this.path = R, this.value = l, this.error = B;
    }
  }
  wt.TransformEncodeError = s;
  function f(T, P, R) {
    try {
      return (0, u.IsTransform)(T) ? T[n.TransformKind].Encode(R) : R;
    } catch (l) {
      throw new s(T, P, R, l);
    }
  }
  function c(T, P, R, l) {
    const B = f(T, R, l);
    return (0, a.IsArray)(B) ? B.map((S, q) => _(T.items, P, `${R}/${q}`, S)) : B;
  }
  function y(T, P, R, l) {
    const B = globalThis.Object.values(T.$defs), S = T.$defs[T.$ref], q = T[n.TransformKind], V = { [n.TransformKind]: q, ...S };
    return _(V, [...P, ...B], R, l);
  }
  function w(T, P, R, l) {
    const B = f(T, R, l);
    if (!(0, a.IsObject)(l) || (0, a.IsValueType)(l))
      return B;
    const S = (0, i.KeyOfPropertyEntries)(T), q = S.map((W) => W[0]), V = { ...B };
    for (const [W, we] of S)
      W in V && (V[W] = _(we, P, `${R}/${W}`, V[W]));
    if (!(0, u.IsTransform)(T.unevaluatedProperties))
      return V;
    const k = Object.getOwnPropertyNames(V), ne = T.unevaluatedProperties, re = { ...V };
    for (const W of k)
      q.includes(W) || (re[W] = f(ne, `${R}/${W}`, re[W]));
    return re;
  }
  function h(T, P, R, l) {
    return f(T.not, R, f(T, R, l));
  }
  function M(T, P, R, l) {
    const B = f(T, R, l);
    if (!(0, a.IsObject)(B))
      return B;
    const S = (0, i.KeyOfPropertyKeys)(T), q = { ...B };
    for (const re of S)
      (0, a.HasPropertyKey)(q, re) && ((0, a.IsUndefined)(q[re]) && (!(0, u.IsUndefined)(T.properties[re]) || e.TypeSystemPolicy.IsExactOptionalProperty(q, re)) || (q[re] = _(T.properties[re], P, `${R}/${re}`, q[re])));
    if (!(0, u.IsSchema)(T.additionalProperties))
      return q;
    const V = Object.getOwnPropertyNames(q), k = T.additionalProperties, ne = { ...q };
    for (const re of V)
      S.includes(re) || (ne[re] = f(k, `${R}/${re}`, ne[re]));
    return ne;
  }
  function U(T, P, R, l) {
    const B = f(T, R, l);
    if (!(0, a.IsObject)(l))
      return B;
    const S = Object.getOwnPropertyNames(T.patternProperties)[0], q = new RegExp(S), V = { ...B };
    for (const W of Object.getOwnPropertyNames(l))
      q.test(W) && (V[W] = _(T.patternProperties[S], P, `${R}/${W}`, V[W]));
    if (!(0, u.IsSchema)(T.additionalProperties))
      return V;
    const k = Object.getOwnPropertyNames(V), ne = T.additionalProperties, re = { ...V };
    for (const W of k)
      q.test(W) || (re[W] = f(ne, `${R}/${W}`, re[W]));
    return re;
  }
  function F(T, P, R, l) {
    const B = (0, o.Deref)(T, P), S = _(B, P, R, l);
    return f(T, R, S);
  }
  function C(T, P, R, l) {
    const B = (0, o.Deref)(T, P), S = _(B, P, R, l);
    return f(T, R, S);
  }
  function G(T, P, R, l) {
    const B = f(T, R, l);
    return (0, a.IsArray)(T.items) ? T.items.map((S, q) => _(S, P, `${R}/${q}`, B[q])) : [];
  }
  function $(T, P, R, l) {
    for (const B of T.anyOf) {
      if (!(0, t.Check)(B, P, l))
        continue;
      const S = _(B, P, R, l);
      return f(T, R, S);
    }
    for (const B of T.anyOf) {
      const S = _(B, P, R, l);
      if ((0, t.Check)(T, P, S))
        return f(T, R, S);
    }
    return f(T, R, l);
  }
  function _(T, P, R, l) {
    const B = (0, o.Pushref)(T, P), S = T;
    switch (T[n.Kind]) {
      case "Array":
        return c(S, B, R, l);
      case "Import":
        return y(S, B, R, l);
      case "Intersect":
        return w(S, B, R, l);
      case "Not":
        return h(S, B, R, l);
      case "Object":
        return M(S, B, R, l);
      case "Record":
        return U(S, B, R, l);
      case "Ref":
        return F(S, B, R, l);
      case "This":
        return C(S, B, R, l);
      case "Tuple":
        return G(S, B, R, l);
      case "Union":
        return $(S, B, R, l);
      default:
        return f(S, R, l);
    }
  }
  function x(T, P, R) {
    return _(T, P, "", R);
  }
  return wt;
}
var Pu = {}, zy;
function Qh() {
  if (zy) return Pu;
  zy = 1, Object.defineProperty(Pu, "__esModule", { value: !0 }), Pu.HasTransform = $;
  const e = /* @__PURE__ */ Jn(), n = /* @__PURE__ */ de(), r = /* @__PURE__ */ Fe(), i = /* @__PURE__ */ tn();
  function o(_, x) {
    return (0, r.IsTransform)(_) || C(_.items, x);
  }
  function t(_, x) {
    return (0, r.IsTransform)(_) || C(_.items, x);
  }
  function a(_, x) {
    return (0, r.IsTransform)(_) || C(_.returns, x) || _.parameters.some((T) => C(T, x));
  }
  function u(_, x) {
    return (0, r.IsTransform)(_) || C(_.returns, x) || _.parameters.some((T) => C(T, x));
  }
  function d(_, x) {
    return (0, r.IsTransform)(_) || (0, r.IsTransform)(_.unevaluatedProperties) || _.allOf.some((T) => C(T, x));
  }
  function s(_, x) {
    return (0, r.IsTransform)(_) || C(_.items, x);
  }
  function f(_, x) {
    return (0, r.IsTransform)(_) || C(_.not, x);
  }
  function c(_, x) {
    return (0, r.IsTransform)(_) || Object.values(_.properties).some((T) => C(T, x)) || (0, r.IsSchema)(_.additionalProperties) && C(_.additionalProperties, x);
  }
  function y(_, x) {
    return (0, r.IsTransform)(_) || C(_.item, x);
  }
  function w(_, x) {
    const T = Object.getOwnPropertyNames(_.patternProperties)[0], P = _.patternProperties[T];
    return (0, r.IsTransform)(_) || C(P, x) || (0, r.IsSchema)(_.additionalProperties) && (0, r.IsTransform)(_.additionalProperties);
  }
  function h(_, x) {
    return (0, r.IsTransform)(_) ? !0 : C((0, e.Deref)(_, x), x);
  }
  function M(_, x) {
    return (0, r.IsTransform)(_) ? !0 : C((0, e.Deref)(_, x), x);
  }
  function U(_, x) {
    return (0, r.IsTransform)(_) || !(0, i.IsUndefined)(_.items) && _.items.some((T) => C(T, x));
  }
  function F(_, x) {
    return (0, r.IsTransform)(_) || _.anyOf.some((T) => C(T, x));
  }
  function C(_, x) {
    const T = (0, e.Pushref)(_, x), P = _;
    if (_.$id && G.has(_.$id))
      return !1;
    switch (_.$id && G.add(_.$id), _[n.Kind]) {
      case "Array":
        return o(P, T);
      case "AsyncIterator":
        return t(P, T);
      case "Constructor":
        return a(P, T);
      case "Function":
        return u(P, T);
      case "Intersect":
        return d(P, T);
      case "Iterator":
        return s(P, T);
      case "Not":
        return f(P, T);
      case "Object":
        return c(P, T);
      case "Promise":
        return y(P, T);
      case "Record":
        return w(P, T);
      case "Ref":
        return h(P, T);
      case "This":
        return M(P, T);
      case "Tuple":
        return U(P, T);
      case "Union":
        return F(P, T);
      default:
        return (0, r.IsTransform)(_);
    }
  }
  const G = /* @__PURE__ */ new Set();
  function $(_, x) {
    return G.clear(), C(_, x);
  }
  return Pu;
}
var ky;
function ba() {
  return ky || (ky = 1, function(e) {
    var n = Nr && Nr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Nr && Nr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Jh(), e), r(/* @__PURE__ */ Zh(), e), r(/* @__PURE__ */ Qh(), e);
  }(Nr)), Nr;
}
var Yy;
function Xh() {
  if (Yy) return Iu;
  Yy = 1, Object.defineProperty(Iu, "__esModule", { value: !0 }), Iu.Decode = i;
  const e = /* @__PURE__ */ ba(), n = /* @__PURE__ */ qn(), r = /* @__PURE__ */ Dt();
  function i(...o) {
    const [t, a, u] = o.length === 3 ? [o[0], o[1], o[2]] : [o[0], [], o[1]];
    if (!(0, n.Check)(t, a, u))
      throw new e.TransformDecodeCheckError(t, u, (0, r.Errors)(t, a, u).First());
    return (0, e.HasTransform)(t, a) ? (0, e.TransformDecode)(t, a, u) : u;
  }
  return Iu;
}
var Jy;
function Qg() {
  return Jy || (Jy = 1, function(e) {
    var n = vr && vr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = vr && vr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Xh(), e);
  }(vr)), vr;
}
var qr = {}, Ou = {}, Zy;
function eB() {
  if (Zy) return Ou;
  Zy = 1, Object.defineProperty(Ou, "__esModule", { value: !0 }), Ou.Default = G;
  const e = /* @__PURE__ */ qn(), n = /* @__PURE__ */ rt(), r = /* @__PURE__ */ Jn(), i = /* @__PURE__ */ de(), o = /* @__PURE__ */ tn(), t = /* @__PURE__ */ Fe();
  function a($, _) {
    const x = (0, o.HasPropertyKey)($, "default") ? $.default : void 0, T = (0, o.IsFunction)(x) ? x() : (0, n.Clone)(x);
    return (0, o.IsUndefined)(_) ? T : (0, o.IsObject)(_) && (0, o.IsObject)(T) ? Object.assign(T, _) : _;
  }
  function u($) {
    return (0, t.IsKind)($) && "default" in $;
  }
  function d($, _, x) {
    if ((0, o.IsArray)(x)) {
      for (let P = 0; P < x.length; P++)
        x[P] = C($.items, _, x[P]);
      return x;
    }
    const T = a($, x);
    if (!(0, o.IsArray)(T))
      return T;
    for (let P = 0; P < T.length; P++)
      T[P] = C($.items, _, T[P]);
    return T;
  }
  function s($, _, x) {
    return (0, o.IsDate)(x) ? x : a($, x);
  }
  function f($, _, x) {
    const T = globalThis.Object.values($.$defs), P = $.$defs[$.$ref];
    return C(P, [..._, ...T], x);
  }
  function c($, _, x) {
    const T = a($, x);
    return $.allOf.reduce((P, R) => {
      const l = C(R, _, T);
      return (0, o.IsObject)(l) ? { ...P, ...l } : l;
    }, {});
  }
  function y($, _, x) {
    const T = a($, x);
    if (!(0, o.IsObject)(T))
      return T;
    const P = Object.getOwnPropertyNames($.properties);
    for (const R of P) {
      const l = C($.properties[R], _, T[R]);
      (0, o.IsUndefined)(l) || (T[R] = C($.properties[R], _, T[R]));
    }
    if (!u($.additionalProperties))
      return T;
    for (const R of Object.getOwnPropertyNames(T))
      P.includes(R) || (T[R] = C($.additionalProperties, _, T[R]));
    return T;
  }
  function w($, _, x) {
    const T = a($, x);
    if (!(0, o.IsObject)(T))
      return T;
    const P = $.additionalProperties, [R, l] = Object.entries($.patternProperties)[0], B = new RegExp(R);
    for (const S of Object.getOwnPropertyNames(T))
      B.test(S) && u(l) && (T[S] = C(l, _, T[S]));
    if (!u(P))
      return T;
    for (const S of Object.getOwnPropertyNames(T))
      B.test(S) || (T[S] = C(P, _, T[S]));
    return T;
  }
  function h($, _, x) {
    return C((0, r.Deref)($, _), _, a($, x));
  }
  function M($, _, x) {
    return C((0, r.Deref)($, _), _, x);
  }
  function U($, _, x) {
    const T = a($, x);
    if (!(0, o.IsArray)(T) || (0, o.IsUndefined)($.items))
      return T;
    const [P, R] = [$.items, Math.max($.items.length, T.length)];
    for (let l = 0; l < R; l++)
      l < P.length && (T[l] = C(P[l], _, T[l]));
    return T;
  }
  function F($, _, x) {
    const T = a($, x);
    for (const P of $.anyOf) {
      const R = C(P, _, (0, n.Clone)(T));
      if ((0, e.Check)(P, _, R))
        return R;
    }
    return T;
  }
  function C($, _, x) {
    const T = (0, r.Pushref)($, _), P = $;
    switch (P[i.Kind]) {
      case "Array":
        return d(P, T, x);
      case "Date":
        return s(P, T, x);
      case "Import":
        return f(P, T, x);
      case "Intersect":
        return c(P, T, x);
      case "Object":
        return y(P, T, x);
      case "Record":
        return w(P, T, x);
      case "Ref":
        return h(P, T, x);
      case "This":
        return M(P, T, x);
      case "Tuple":
        return U(P, T, x);
      case "Union":
        return F(P, T, x);
      default:
        return a(P, x);
    }
  }
  function G(...$) {
    return $.length === 3 ? C($[0], $[1], $[2]) : C($[0], [], $[1]);
  }
  return Ou;
}
var Qy;
function Fd() {
  return Qy || (Qy = 1, function(e) {
    var n = qr && qr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = qr && qr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ eB(), e);
  }(qr)), qr;
}
var Lr = {}, fc = {}, xo = {}, jn = {}, Xy;
function nB() {
  if (Xy) return jn;
  Xy = 1, Object.defineProperty(jn, "__esModule", { value: !0 }), jn.ValuePointerRootDeleteError = jn.ValuePointerRootSetError = void 0, jn.Format = o, jn.Set = t, jn.Delete = a, jn.Has = u, jn.Get = d;
  const e = /* @__PURE__ */ ze();
  class n extends e.TypeBoxError {
    constructor(f, c, y) {
      super("Cannot set root value"), this.value = f, this.path = c, this.update = y;
    }
  }
  jn.ValuePointerRootSetError = n;
  class r extends e.TypeBoxError {
    constructor(f, c) {
      super("Cannot delete root value"), this.value = f, this.path = c;
    }
  }
  jn.ValuePointerRootDeleteError = r;
  function i(s) {
    return s.indexOf("~") === -1 ? s : s.replace(/~1/g, "/").replace(/~0/g, "~");
  }
  function* o(s) {
    if (s === "")
      return;
    let [f, c] = [0, 0];
    for (let y = 0; y < s.length; y++)
      s.charAt(y) === "/" ? (y === 0 || (c = y, yield i(s.slice(f, c))), f = y + 1) : c = y;
    yield i(s.slice(f));
  }
  function t(s, f, c) {
    if (f === "")
      throw new n(s, f, c);
    let [y, w, h] = [null, s, ""];
    for (const M of o(f))
      w[M] === void 0 && (w[M] = {}), y = w, w = w[M], h = M;
    y[h] = c;
  }
  function a(s, f) {
    if (f === "")
      throw new r(s, f);
    let [c, y, w] = [null, s, ""];
    for (const h of o(f)) {
      if (y[h] === void 0 || y[h] === null)
        return;
      c = y, y = y[h], w = h;
    }
    if (Array.isArray(c)) {
      const h = parseInt(w);
      c.splice(h, 1);
    } else
      delete c[w];
  }
  function u(s, f) {
    if (f === "")
      return !0;
    let [c, y, w] = [null, s, ""];
    for (const h of o(f)) {
      if (y[h] === void 0)
        return !1;
      c = y, y = y[h], w = h;
    }
    return Object.getOwnPropertyNames(c).includes(w);
  }
  function d(s, f) {
    if (f === "")
      return s;
    let c = s;
    for (const y of o(f)) {
      if (c[y] === void 0)
        return;
      c = c[y];
    }
    return c;
  }
  return jn;
}
var el;
function xd() {
  return el || (el = 1, Object.defineProperty(xo, "__esModule", { value: !0 }), xo.ValuePointer = void 0, xo.ValuePointer = /* @__PURE__ */ nB()), xo;
}
var Au = {}, nl;
function Xg() {
  if (nl) return Au;
  nl = 1, Object.defineProperty(Au, "__esModule", { value: !0 }), Au.Equal = a;
  const e = /* @__PURE__ */ tn();
  function n(u, d) {
    if (!(0, e.IsObject)(d))
      return !1;
    const s = [...Object.keys(u), ...Object.getOwnPropertySymbols(u)], f = [...Object.keys(d), ...Object.getOwnPropertySymbols(d)];
    return s.length !== f.length ? !1 : s.every((c) => a(u[c], d[c]));
  }
  function r(u, d) {
    return (0, e.IsDate)(d) && u.getTime() === d.getTime();
  }
  function i(u, d) {
    return !(0, e.IsArray)(d) || u.length !== d.length ? !1 : u.every((s, f) => a(s, d[f]));
  }
  function o(u, d) {
    return !(0, e.IsTypedArray)(d) || u.length !== d.length || Object.getPrototypeOf(u).constructor.name !== Object.getPrototypeOf(d).constructor.name ? !1 : u.every((s, f) => a(s, d[f]));
  }
  function t(u, d) {
    return u === d;
  }
  function a(u, d) {
    if ((0, e.IsDate)(u))
      return r(u, d);
    if ((0, e.IsTypedArray)(u))
      return o(u, d);
    if ((0, e.IsArray)(u))
      return i(u, d);
    if ((0, e.IsObject)(u))
      return n(u, d);
    if ((0, e.IsValueType)(u))
      return t(u, d);
    throw new Error("ValueEquals: Unable to compare value");
  }
  return Au;
}
var tl;
function tB() {
  return tl || (tl = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueDiffError = e.Edit = e.Delete = e.Update = e.Insert = void 0, e.Diff = _, e.Patch = P;
    const n = /* @__PURE__ */ tn(), r = /* @__PURE__ */ xd(), i = /* @__PURE__ */ rt(), o = /* @__PURE__ */ Xg(), t = /* @__PURE__ */ ze(), a = /* @__PURE__ */ _n(), u = /* @__PURE__ */ Cn(), d = /* @__PURE__ */ _o(), s = /* @__PURE__ */ Io(), f = /* @__PURE__ */ Ye();
    e.Insert = (0, u.Object)({
      type: (0, a.Literal)("insert"),
      path: (0, d.String)(),
      value: (0, s.Unknown)()
    }), e.Update = (0, u.Object)({
      type: (0, a.Literal)("update"),
      path: (0, d.String)(),
      value: (0, s.Unknown)()
    }), e.Delete = (0, u.Object)({
      type: (0, a.Literal)("delete"),
      path: (0, d.String)()
    }), e.Edit = (0, f.Union)([e.Insert, e.Update, e.Delete]);
    class c extends t.TypeBoxError {
      constructor(l, B) {
        super(B), this.value = l;
      }
    }
    e.ValueDiffError = c;
    function y(R, l) {
      return { type: "update", path: R, value: l };
    }
    function w(R, l) {
      return { type: "insert", path: R, value: l };
    }
    function h(R) {
      return { type: "delete", path: R };
    }
    function M(R) {
      if (globalThis.Object.getOwnPropertySymbols(R).length > 0)
        throw new c(R, "Cannot diff objects with symbols");
    }
    function* U(R, l, B) {
      if (M(l), M(B), !(0, n.IsStandardObject)(B))
        return yield y(R, B);
      const S = globalThis.Object.getOwnPropertyNames(l), q = globalThis.Object.getOwnPropertyNames(B);
      for (const V of q)
        (0, n.HasPropertyKey)(l, V) || (yield w(`${R}/${V}`, B[V]));
      for (const V of S)
        (0, n.HasPropertyKey)(B, V) && ((0, o.Equal)(l, B) || (yield* $(`${R}/${V}`, l[V], B[V])));
      for (const V of S)
        (0, n.HasPropertyKey)(B, V) || (yield h(`${R}/${V}`));
    }
    function* F(R, l, B) {
      if (!(0, n.IsArray)(B))
        return yield y(R, B);
      for (let S = 0; S < Math.min(l.length, B.length); S++)
        yield* $(`${R}/${S}`, l[S], B[S]);
      for (let S = 0; S < B.length; S++)
        S < l.length || (yield w(`${R}/${S}`, B[S]));
      for (let S = l.length - 1; S >= 0; S--)
        S < B.length || (yield h(`${R}/${S}`));
    }
    function* C(R, l, B) {
      if (!(0, n.IsTypedArray)(B) || l.length !== B.length || globalThis.Object.getPrototypeOf(l).constructor.name !== globalThis.Object.getPrototypeOf(B).constructor.name)
        return yield y(R, B);
      for (let S = 0; S < Math.min(l.length, B.length); S++)
        yield* $(`${R}/${S}`, l[S], B[S]);
    }
    function* G(R, l, B) {
      l !== B && (yield y(R, B));
    }
    function* $(R, l, B) {
      if ((0, n.IsStandardObject)(l))
        return yield* U(R, l, B);
      if ((0, n.IsArray)(l))
        return yield* F(R, l, B);
      if ((0, n.IsTypedArray)(l))
        return yield* C(R, l, B);
      if ((0, n.IsValueType)(l))
        return yield* G(R, l, B);
      throw new c(l, "Unable to diff value");
    }
    function _(R, l) {
      return [...$("", R, l)];
    }
    function x(R) {
      return R.length > 0 && R[0].path === "" && R[0].type === "update";
    }
    function T(R) {
      return R.length === 0;
    }
    function P(R, l) {
      if (x(l))
        return (0, i.Clone)(l[0].value);
      if (T(l))
        return (0, i.Clone)(R);
      const B = (0, i.Clone)(R);
      for (const S of l)
        switch (S.type) {
          case "insert": {
            r.ValuePointer.Set(B, S.path, S.value);
            break;
          }
          case "update": {
            r.ValuePointer.Set(B, S.path, S.value);
            break;
          }
          case "delete": {
            r.ValuePointer.Delete(B, S.path);
            break;
          }
        }
      return B;
    }
  }(fc)), fc;
}
var rl;
function e_() {
  return rl || (rl = 1, function(e) {
    var n = Lr && Lr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Lr && Lr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ tB(), e);
  }(Lr)), Lr;
}
var Kr = {}, wu = {}, il;
function rB() {
  if (il) return wu;
  il = 1, Object.defineProperty(wu, "__esModule", { value: !0 }), wu.Encode = i;
  const e = /* @__PURE__ */ ba(), n = /* @__PURE__ */ qn(), r = /* @__PURE__ */ Dt();
  function i(...o) {
    const [t, a, u] = o.length === 3 ? [o[0], o[1], o[2]] : [o[0], [], o[1]], d = (0, e.HasTransform)(t, a) ? (0, e.TransformEncode)(t, a, u) : u;
    if (!(0, n.Check)(t, a, d))
      throw new e.TransformEncodeCheckError(t, d, (0, r.Errors)(t, a, d).First());
    return d;
  }
  return wu;
}
var ol;
function n_() {
  return ol || (ol = 1, function(e) {
    var n = Kr && Kr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Kr && Kr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ rB(), e);
  }(Kr)), Kr;
}
var Vr = {}, al;
function t_() {
  return al || (al = 1, function(e) {
    var n = Vr && Vr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Vr && Vr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Xg(), e);
  }(Vr)), Vr;
}
var Gr = {}, Zi = {}, ul;
function iB() {
  if (ul) return Zi;
  ul = 1, Object.defineProperty(Zi, "__esModule", { value: !0 }), Zi.ValueMutateError = void 0, Zi.Mutate = w;
  const e = /* @__PURE__ */ tn(), n = /* @__PURE__ */ xd(), r = /* @__PURE__ */ rt(), i = /* @__PURE__ */ ze();
  function o(h) {
    return (0, e.IsObject)(h) && !(0, e.IsArray)(h);
  }
  class t extends i.TypeBoxError {
    constructor(M) {
      super(M);
    }
  }
  Zi.ValueMutateError = t;
  function a(h, M, U, F) {
    if (!o(U))
      n.ValuePointer.Set(h, M, (0, r.Clone)(F));
    else {
      const C = Object.getOwnPropertyNames(U), G = Object.getOwnPropertyNames(F);
      for (const $ of C)
        G.includes($) || delete U[$];
      for (const $ of G)
        C.includes($) || (U[$] = null);
      for (const $ of G)
        f(h, `${M}/${$}`, U[$], F[$]);
    }
  }
  function u(h, M, U, F) {
    if (!(0, e.IsArray)(U))
      n.ValuePointer.Set(h, M, (0, r.Clone)(F));
    else {
      for (let C = 0; C < F.length; C++)
        f(h, `${M}/${C}`, U[C], F[C]);
      U.splice(F.length);
    }
  }
  function d(h, M, U, F) {
    if ((0, e.IsTypedArray)(U) && U.length === F.length)
      for (let C = 0; C < U.length; C++)
        U[C] = F[C];
    else
      n.ValuePointer.Set(h, M, (0, r.Clone)(F));
  }
  function s(h, M, U, F) {
    U !== F && n.ValuePointer.Set(h, M, F);
  }
  function f(h, M, U, F) {
    if ((0, e.IsArray)(F))
      return u(h, M, U, F);
    if ((0, e.IsTypedArray)(F))
      return d(h, M, U, F);
    if (o(F))
      return a(h, M, U, F);
    if ((0, e.IsValueType)(F))
      return s(h, M, U, F);
  }
  function c(h) {
    return (0, e.IsTypedArray)(h) || (0, e.IsValueType)(h);
  }
  function y(h, M) {
    return o(h) && (0, e.IsArray)(M) || (0, e.IsArray)(h) && o(M);
  }
  function w(h, M) {
    if (c(h) || c(M))
      throw new t("Only object and array types can be mutated at the root level");
    if (y(h, M))
      throw new t("Cannot assign due type mismatch of assignable values");
    f(h, "", h, M);
  }
  return Zi;
}
var sl;
function r_() {
  return sl || (sl = 1, function(e) {
    var n = Gr && Gr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Gr && Gr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ iB(), e);
  }(Gr)), Gr;
}
var Hr = {}, yc = {}, cl;
function oB() {
  return cl || (cl = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ParseDefault = e.ParseRegistry = e.ParseError = void 0, e.Parse = y;
    const n = /* @__PURE__ */ ze(), r = /* @__PURE__ */ ba(), i = /* @__PURE__ */ Sd(), o = /* @__PURE__ */ Fd(), t = /* @__PURE__ */ jd(), a = /* @__PURE__ */ Cd(), u = /* @__PURE__ */ rt(), d = /* @__PURE__ */ tn();
    class s extends n.TypeBoxError {
      constructor(h) {
        super(h);
      }
    }
    e.ParseError = s;
    var f;
    (function(w) {
      const h = /* @__PURE__ */ new Map([
        ["Clone", (C, G, $) => (0, u.Clone)($)],
        ["Clean", (C, G, $) => (0, a.Clean)(C, G, $)],
        ["Default", (C, G, $) => (0, o.Default)(C, G, $)],
        ["Convert", (C, G, $) => (0, t.Convert)(C, G, $)],
        ["Assert", (C, G, $) => ((0, i.Assert)(C, G, $), $)],
        ["Decode", (C, G, $) => (0, r.HasTransform)(C, G) ? (0, r.TransformDecode)(C, G, $) : $],
        ["Encode", (C, G, $) => (0, r.HasTransform)(C, G) ? (0, r.TransformEncode)(C, G, $) : $]
      ]);
      function M(C) {
        h.delete(C);
      }
      w.Delete = M;
      function U(C, G) {
        h.set(C, G);
      }
      w.Set = U;
      function F(C) {
        return h.get(C);
      }
      w.Get = F;
    })(f || (e.ParseRegistry = f = {})), e.ParseDefault = [
      "Clone",
      "Clean",
      "Default",
      "Convert",
      "Assert",
      "Decode"
    ];
    function c(w, h, M, U) {
      return w.reduce((F, C) => {
        const G = f.Get(C);
        if ((0, d.IsUndefined)(G))
          throw new s(`Unable to find Parse operation '${C}'`);
        return G(h, M, F);
      }, U);
    }
    function y(...w) {
      const [h, M, U, F] = w.length === 4 ? [w[0], w[1], w[2], w[3]] : w.length === 3 ? (0, d.IsArray)(w[0]) ? [w[0], w[1], [], w[2]] : [e.ParseDefault, w[0], w[1], w[2]] : w.length === 2 ? [e.ParseDefault, w[0], [], w[1]] : (() => {
        throw new s("Invalid Arguments");
      })();
      return c(h, M, U, F);
    }
  }(yc)), yc;
}
var dl;
function i_() {
  return dl || (dl = 1, function(e) {
    var n = Hr && Hr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Hr && Hr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ oB(), e);
  }(Hr)), Hr;
}
var Uo = {}, lc = {}, pl;
function aB() {
  return pl || (pl = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.Parse = e.Mutate = e.Hash = e.Equal = e.Encode = e.Edit = e.Patch = e.Diff = e.Default = e.Decode = e.Create = e.Convert = e.Clone = e.Clean = e.Check = e.Cast = e.Assert = e.ValueErrorIterator = e.Errors = void 0;
    var n = /* @__PURE__ */ Dt();
    Object.defineProperty(e, "Errors", { enumerable: !0, get: function() {
      return n.Errors;
    } }), Object.defineProperty(e, "ValueErrorIterator", { enumerable: !0, get: function() {
      return n.ValueErrorIterator;
    } });
    var r = /* @__PURE__ */ Sd();
    Object.defineProperty(e, "Assert", { enumerable: !0, get: function() {
      return r.Assert;
    } });
    var i = /* @__PURE__ */ Zg();
    Object.defineProperty(e, "Cast", { enumerable: !0, get: function() {
      return i.Cast;
    } });
    var o = /* @__PURE__ */ qn();
    Object.defineProperty(e, "Check", { enumerable: !0, get: function() {
      return o.Check;
    } });
    var t = /* @__PURE__ */ Cd();
    Object.defineProperty(e, "Clean", { enumerable: !0, get: function() {
      return t.Clean;
    } });
    var a = /* @__PURE__ */ rt();
    Object.defineProperty(e, "Clone", { enumerable: !0, get: function() {
      return a.Clone;
    } });
    var u = /* @__PURE__ */ jd();
    Object.defineProperty(e, "Convert", { enumerable: !0, get: function() {
      return u.Convert;
    } });
    var d = /* @__PURE__ */ Ed();
    Object.defineProperty(e, "Create", { enumerable: !0, get: function() {
      return d.Create;
    } });
    var s = /* @__PURE__ */ Qg();
    Object.defineProperty(e, "Decode", { enumerable: !0, get: function() {
      return s.Decode;
    } });
    var f = /* @__PURE__ */ Fd();
    Object.defineProperty(e, "Default", { enumerable: !0, get: function() {
      return f.Default;
    } });
    var c = /* @__PURE__ */ e_();
    Object.defineProperty(e, "Diff", { enumerable: !0, get: function() {
      return c.Diff;
    } }), Object.defineProperty(e, "Patch", { enumerable: !0, get: function() {
      return c.Patch;
    } }), Object.defineProperty(e, "Edit", { enumerable: !0, get: function() {
      return c.Edit;
    } });
    var y = /* @__PURE__ */ n_();
    Object.defineProperty(e, "Encode", { enumerable: !0, get: function() {
      return y.Encode;
    } });
    var w = /* @__PURE__ */ t_();
    Object.defineProperty(e, "Equal", { enumerable: !0, get: function() {
      return w.Equal;
    } });
    var h = /* @__PURE__ */ ga();
    Object.defineProperty(e, "Hash", { enumerable: !0, get: function() {
      return h.Hash;
    } });
    var M = /* @__PURE__ */ r_();
    Object.defineProperty(e, "Mutate", { enumerable: !0, get: function() {
      return M.Mutate;
    } });
    var U = /* @__PURE__ */ i_();
    Object.defineProperty(e, "Parse", { enumerable: !0, get: function() {
      return U.Parse;
    } });
  }(lc)), lc;
}
var fl;
function uB() {
  return fl || (fl = 1, Object.defineProperty(Uo, "__esModule", { value: !0 }), Uo.Value = void 0, Uo.Value = /* @__PURE__ */ aB()), Uo;
}
var yl;
function Ia() {
  return yl || (yl = 1, function(e) {
    var n = Nt && Nt.__createBinding || (Object.create ? function(t, a, u, d) {
      d === void 0 && (d = u);
      var s = Object.getOwnPropertyDescriptor(a, u);
      (!s || ("get" in s ? !a.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return a[u];
      } }), Object.defineProperty(t, d, s);
    } : function(t, a, u, d) {
      d === void 0 && (d = u), t[d] = a[u];
    }), r = Nt && Nt.__exportStar || function(t, a) {
      for (var u in t) u !== "default" && !Object.prototype.hasOwnProperty.call(a, u) && n(a, t, u);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.Value = e.ValueErrorIterator = e.ValueErrorType = void 0;
    var i = /* @__PURE__ */ Dt();
    Object.defineProperty(e, "ValueErrorType", { enumerable: !0, get: function() {
      return i.ValueErrorType;
    } }), Object.defineProperty(e, "ValueErrorIterator", { enumerable: !0, get: function() {
      return i.ValueErrorIterator;
    } }), r(/* @__PURE__ */ tn(), e), r(/* @__PURE__ */ Sd(), e), r(/* @__PURE__ */ Zg(), e), r(/* @__PURE__ */ qn(), e), r(/* @__PURE__ */ Cd(), e), r(/* @__PURE__ */ rt(), e), r(/* @__PURE__ */ jd(), e), r(/* @__PURE__ */ Ed(), e), r(/* @__PURE__ */ Qg(), e), r(/* @__PURE__ */ Fd(), e), r(/* @__PURE__ */ e_(), e), r(/* @__PURE__ */ n_(), e), r(/* @__PURE__ */ t_(), e), r(/* @__PURE__ */ ga(), e), r(/* @__PURE__ */ r_(), e), r(/* @__PURE__ */ i_(), e), r(/* @__PURE__ */ xd(), e), r(/* @__PURE__ */ ba(), e);
    var o = /* @__PURE__ */ uB();
    Object.defineProperty(e, "Value", { enumerable: !0, get: function() {
      return o.Value;
    } });
  }(Nt)), Nt;
}
var mc = {}, Wr = {}, zr = {}, Do = {}, ll;
function o_() {
  if (ll) return Do;
  ll = 1, Object.defineProperty(Do, "__esModule", { value: !0 }), Do.CloneRest = n, Do.CloneType = r;
  const e = /* @__PURE__ */ En();
  function n(i) {
    return i.map((o) => r(o));
  }
  function r(i, o) {
    return o === void 0 ? (0, e.Clone)(i) : (0, e.Clone)({ ...o, ...i });
  }
  return Do;
}
var ml;
function sB() {
  return ml || (ml = 1, function(e) {
    var n = zr && zr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = zr && zr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ o_(), e), r(/* @__PURE__ */ En(), e);
  }(zr)), zr;
}
var kr = {}, Ru = {}, Tl;
function cB() {
  if (Tl) return Ru;
  Tl = 1, Object.defineProperty(Ru, "__esModule", { value: !0 }), Ru.Increment = e;
  function e(n) {
    return (parseInt(n) + 1).toString();
  }
  return Ru;
}
var gl;
function dB() {
  return gl || (gl = 1, function(e) {
    var n = kr && kr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = kr && kr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ cB(), e);
  }(kr)), kr;
}
var Yr = {}, $u = {}, _l;
function pB() {
  if (_l) return $u;
  _l = 1, Object.defineProperty($u, "__esModule", { value: !0 }), $u.Awaited = y;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ Ft(), r = /* @__PURE__ */ Nn(), i = /* @__PURE__ */ Ye(), o = /* @__PURE__ */ Pt(), t = /* @__PURE__ */ Fe();
  function a(w, h) {
    return (0, n.Computed)("Awaited", [(0, n.Computed)(w, h)]);
  }
  function u(w) {
    return (0, n.Computed)("Awaited", [(0, o.Ref)(w)]);
  }
  function d(w) {
    return (0, r.Intersect)(c(w));
  }
  function s(w) {
    return (0, i.Union)(c(w));
  }
  function f(w) {
    return y(w);
  }
  function c(w) {
    return w.map((h) => y(h));
  }
  function y(w, h) {
    return (0, e.CreateType)((0, t.IsComputed)(w) ? a(w.target, w.parameters) : (0, t.IsIntersect)(w) ? d(w.allOf) : (0, t.IsUnion)(w) ? s(w.anyOf) : (0, t.IsPromise)(w) ? f(w.item) : (0, t.IsRef)(w) ? u(w.$ref) : w, h);
  }
  return $u;
}
var bl;
function zs() {
  return bl || (bl = 1, function(e) {
    var n = Yr && Yr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Yr && Yr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ pB(), e);
  }(Yr)), Yr;
}
var Jr = {}, hu = {}, Il;
function fB() {
  if (Il) return hu;
  Il = 1, Object.defineProperty(hu, "__esModule", { value: !0 }), hu.Composite = f;
  const e = /* @__PURE__ */ Nn(), n = /* @__PURE__ */ tt(), r = /* @__PURE__ */ Yn(), i = /* @__PURE__ */ Cn(), o = /* @__PURE__ */ Ws(), t = /* @__PURE__ */ Fe();
  function a(c) {
    const y = [];
    for (const w of c)
      y.push(...(0, r.KeyOfPropertyKeys)(w));
    return (0, o.SetDistinct)(y);
  }
  function u(c) {
    return c.filter((y) => !(0, t.IsNever)(y));
  }
  function d(c, y) {
    const w = [];
    for (const h of c)
      w.push(...(0, n.IndexFromPropertyKeys)(h, [y]));
    return u(w);
  }
  function s(c, y) {
    const w = {};
    for (const h of y)
      w[h] = (0, e.IntersectEvaluated)(d(c, h));
    return w;
  }
  function f(c, y) {
    const w = a(c), h = s(c, w);
    return (0, i.Object)(h, y);
  }
  return hu;
}
var Pl;
function Ud() {
  return Pl || (Pl = 1, function(e) {
    var n = Jr && Jr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Jr && Jr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ fB(), e);
  }(Jr)), Jr;
}
var Zr = {}, Bu = {}, Qr = {}, Mu = {}, Ol;
function yB() {
  if (Ol) return Mu;
  Ol = 1, Object.defineProperty(Mu, "__esModule", { value: !0 }), Mu.Date = r;
  const e = /* @__PURE__ */ de(), n = /* @__PURE__ */ me();
  function r(i) {
    return (0, n.CreateType)({ [e.Kind]: "Date", type: "Date" }, i);
  }
  return Mu;
}
var Al;
function ks() {
  return Al || (Al = 1, function(e) {
    var n = Qr && Qr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Qr && Qr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ yB(), e);
  }(Qr)), Qr;
}
var Xr = {}, Su = {}, wl;
function lB() {
  if (wl) return Su;
  wl = 1, Object.defineProperty(Su, "__esModule", { value: !0 }), Su.Null = r;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ de();
  function r(i) {
    return (0, e.CreateType)({ [n.Kind]: "Null", type: "null" }, i);
  }
  return Su;
}
var Rl;
function Ys() {
  return Rl || (Rl = 1, function(e) {
    var n = Xr && Xr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Xr && Xr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ lB(), e);
  }(Xr)), Xr;
}
var ei = {}, Eu = {}, $l;
function mB() {
  if ($l) return Eu;
  $l = 1, Object.defineProperty(Eu, "__esModule", { value: !0 }), Eu.Symbol = r;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ de();
  function r(i) {
    return (0, e.CreateType)({ [n.Kind]: "Symbol", type: "symbol" }, i);
  }
  return Eu;
}
var hl;
function Js() {
  return hl || (hl = 1, function(e) {
    var n = ei && ei.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = ei && ei.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ mB(), e);
  }(ei)), ei;
}
var ni = {}, Cu = {}, Bl;
function TB() {
  if (Bl) return Cu;
  Bl = 1, Object.defineProperty(Cu, "__esModule", { value: !0 }), Cu.Undefined = r;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ de();
  function r(i) {
    return (0, e.CreateType)({ [n.Kind]: "Undefined", type: "undefined" }, i);
  }
  return Cu;
}
var Ml;
function Zs() {
  return Ml || (Ml = 1, function(e) {
    var n = ni && ni.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = ni && ni.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ TB(), e);
  }(ni)), ni;
}
var ti = {}, ju = {}, Sl;
function gB() {
  if (Sl) return ju;
  Sl = 1, Object.defineProperty(ju, "__esModule", { value: !0 }), ju.Uint8Array = r;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ de();
  function r(i) {
    return (0, e.CreateType)({ [n.Kind]: "Uint8Array", type: "Uint8Array" }, i);
  }
  return ju;
}
var El;
function Qs() {
  return El || (El = 1, function(e) {
    var n = ti && ti.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = ti && ti.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ gB(), e);
  }(ti)), ti;
}
var Cl;
function _B() {
  if (Cl) return Bu;
  Cl = 1, Object.defineProperty(Bu, "__esModule", { value: !0 }), Bu.Const = G;
  const e = /* @__PURE__ */ _a(), n = /* @__PURE__ */ la(), r = /* @__PURE__ */ ks(), i = /* @__PURE__ */ Gi(), o = /* @__PURE__ */ _n(), t = /* @__PURE__ */ Ys(), a = /* @__PURE__ */ Cn(), u = /* @__PURE__ */ Js(), d = /* @__PURE__ */ Ut(), s = /* @__PURE__ */ bo(), f = /* @__PURE__ */ Zs(), c = /* @__PURE__ */ Qs(), y = /* @__PURE__ */ Io(), w = /* @__PURE__ */ jt(), h = /* @__PURE__ */ Sn();
  function M($) {
    return $.map((_) => C(_, !1));
  }
  function U($) {
    const _ = {};
    for (const x of globalThis.Object.getOwnPropertyNames($))
      _[x] = (0, s.Readonly)(C($[x], !1));
    return _;
  }
  function F($, _) {
    return _ === !0 ? $ : (0, s.Readonly)($);
  }
  function C($, _) {
    return (0, h.IsAsyncIterator)($) || (0, h.IsIterator)($) ? F((0, e.Any)(), _) : (0, h.IsArray)($) ? (0, s.Readonly)((0, d.Tuple)(M($))) : (0, h.IsUint8Array)($) ? (0, c.Uint8Array)() : (0, h.IsDate)($) ? (0, r.Date)() : (0, h.IsObject)($) ? F((0, a.Object)(U($)), _) : (0, h.IsFunction)($) ? F((0, i.Function)([], (0, y.Unknown)()), _) : (0, h.IsUndefined)($) ? (0, f.Undefined)() : (0, h.IsNull)($) ? (0, t.Null)() : (0, h.IsSymbol)($) ? (0, u.Symbol)() : (0, h.IsBigInt)($) ? (0, n.BigInt)() : (0, h.IsNumber)($) || (0, h.IsBoolean)($) || (0, h.IsString)($) ? (0, o.Literal)($) : (0, a.Object)({});
  }
  function G($, _) {
    return (0, w.CreateType)(C($, !0), _);
  }
  return Bu;
}
var jl;
function Dd() {
  return jl || (jl = 1, function(e) {
    var n = Zr && Zr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Zr && Zr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ _B(), e);
  }(Zr)), Zr;
}
var ri = {}, Fu = {}, Fl;
function bB() {
  if (Fl) return Fu;
  Fl = 1, Object.defineProperty(Fu, "__esModule", { value: !0 }), Fu.ConstructorParameters = n;
  const e = /* @__PURE__ */ Ut();
  function n(r, i) {
    return (0, e.Tuple)(r.parameters, i);
  }
  return Fu;
}
var xl;
function vd() {
  return xl || (xl = 1, function(e) {
    var n = ri && ri.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = ri && ri.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ bB(), e);
  }(ri)), ri;
}
var ii = {}, xu = {}, Ul;
function IB() {
  if (Ul) return xu;
  Ul = 1, Object.defineProperty(xu, "__esModule", { value: !0 }), xu.Enum = o;
  const e = /* @__PURE__ */ _n(), n = /* @__PURE__ */ de(), r = /* @__PURE__ */ Ye(), i = /* @__PURE__ */ Sn();
  function o(t, a) {
    if ((0, i.IsUndefined)(t))
      throw new Error("Enum undefined or empty");
    const u = globalThis.Object.getOwnPropertyNames(t).filter((f) => isNaN(f)).map((f) => t[f]), s = [...new Set(u)].map((f) => (0, e.Literal)(f));
    return (0, r.Union)(s, { ...a, [n.Hint]: "Enum" });
  }
  return xu;
}
var Dl;
function Nd() {
  return Dl || (Dl = 1, function(e) {
    var n = ii && ii.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = ii && ii.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ IB(), e);
  }(ii)), ii;
}
var oi = {}, Uu = {}, Du = {}, vu = {}, vl;
function a_() {
  if (vl) return vu;
  vl = 1, Object.defineProperty(vu, "__esModule", { value: !0 }), vu.ExcludeFromTemplateLiteral = r;
  const e = /* @__PURE__ */ qd(), n = /* @__PURE__ */ nt();
  function r(i, o) {
    return (0, e.Exclude)((0, n.TemplateLiteralToUnion)(i), o);
  }
  return vu;
}
var Nl;
function qd() {
  if (Nl) return Du;
  Nl = 1, Object.defineProperty(Du, "__esModule", { value: !0 }), Du.Exclude = d;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ Ye(), r = /* @__PURE__ */ Tn(), i = /* @__PURE__ */ Po(), o = /* @__PURE__ */ u_(), t = /* @__PURE__ */ a_(), a = /* @__PURE__ */ Fe();
  function u(s, f) {
    const c = s.filter((y) => (0, i.ExtendsCheck)(y, f) === i.ExtendsResult.False);
    return c.length === 1 ? c[0] : (0, n.Union)(c);
  }
  function d(s, f, c = {}) {
    return (0, a.IsTemplateLiteral)(s) ? (0, e.CreateType)((0, t.ExcludeFromTemplateLiteral)(s, f), c) : (0, a.IsMappedResult)(s) ? (0, e.CreateType)((0, o.ExcludeFromMappedResult)(s, f), c) : (0, e.CreateType)((0, a.IsUnion)(s) ? u(s.anyOf, f) : (0, i.ExtendsCheck)(s, f) !== i.ExtendsResult.False ? (0, r.Never)() : s, c);
  }
  return Du;
}
var ql;
function u_() {
  if (ql) return Uu;
  ql = 1, Object.defineProperty(Uu, "__esModule", { value: !0 }), Uu.ExcludeFromMappedResult = o;
  const e = /* @__PURE__ */ rn(), n = /* @__PURE__ */ qd();
  function r(t, a) {
    const u = {};
    for (const d of globalThis.Object.getOwnPropertyNames(t))
      u[d] = (0, n.Exclude)(t[d], a);
    return u;
  }
  function i(t, a) {
    return r(t.properties, a);
  }
  function o(t, a) {
    const u = i(t, a);
    return (0, e.MappedResult)(u);
  }
  return Uu;
}
var Ll;
function Ld() {
  return Ll || (Ll = 1, function(e) {
    var n = oi && oi.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = oi && oi.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ u_(), e), r(/* @__PURE__ */ a_(), e), r(/* @__PURE__ */ qd(), e);
  }(oi)), oi;
}
var ai = {}, Nu = {}, qu = {}, Lu = {}, Kl;
function s_() {
  if (Kl) return Lu;
  Kl = 1, Object.defineProperty(Lu, "__esModule", { value: !0 }), Lu.ExtractFromTemplateLiteral = r;
  const e = /* @__PURE__ */ Kd(), n = /* @__PURE__ */ nt();
  function r(i, o) {
    return (0, e.Extract)((0, n.TemplateLiteralToUnion)(i), o);
  }
  return Lu;
}
var Vl;
function Kd() {
  if (Vl) return qu;
  Vl = 1, Object.defineProperty(qu, "__esModule", { value: !0 }), qu.Extract = d;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ Ye(), r = /* @__PURE__ */ Tn(), i = /* @__PURE__ */ Po(), o = /* @__PURE__ */ c_(), t = /* @__PURE__ */ s_(), a = /* @__PURE__ */ Fe();
  function u(s, f) {
    const c = s.filter((y) => (0, i.ExtendsCheck)(y, f) !== i.ExtendsResult.False);
    return c.length === 1 ? c[0] : (0, n.Union)(c);
  }
  function d(s, f, c) {
    return (0, a.IsTemplateLiteral)(s) ? (0, e.CreateType)((0, t.ExtractFromTemplateLiteral)(s, f), c) : (0, a.IsMappedResult)(s) ? (0, e.CreateType)((0, o.ExtractFromMappedResult)(s, f), c) : (0, e.CreateType)((0, a.IsUnion)(s) ? u(s.anyOf, f) : (0, i.ExtendsCheck)(s, f) !== i.ExtendsResult.False ? s : (0, r.Never)(), c);
  }
  return qu;
}
var Gl;
function c_() {
  if (Gl) return Nu;
  Gl = 1, Object.defineProperty(Nu, "__esModule", { value: !0 }), Nu.ExtractFromMappedResult = o;
  const e = /* @__PURE__ */ rn(), n = /* @__PURE__ */ Kd();
  function r(t, a) {
    const u = {};
    for (const d of globalThis.Object.getOwnPropertyNames(t))
      u[d] = (0, n.Extract)(t[d], a);
    return u;
  }
  function i(t, a) {
    return r(t.properties, a);
  }
  function o(t, a) {
    const u = i(t, a);
    return (0, e.MappedResult)(u);
  }
  return Nu;
}
var Hl;
function Vd() {
  return Hl || (Hl = 1, function(e) {
    var n = ai && ai.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = ai && ai.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ c_(), e), r(/* @__PURE__ */ s_(), e), r(/* @__PURE__ */ Kd(), e);
  }(ai)), ai;
}
var ui = {}, Ku = {}, Wl;
function PB() {
  if (Wl) return Ku;
  Wl = 1, Object.defineProperty(Ku, "__esModule", { value: !0 }), Ku.InstanceType = n;
  const e = /* @__PURE__ */ me();
  function n(r, i) {
    return (0, e.CreateType)(r.returns, i);
  }
  return Ku;
}
var zl;
function Gd() {
  return zl || (zl = 1, function(e) {
    var n = ui && ui.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = ui && ui.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ PB(), e);
  }(ui)), ui;
}
var si = {}, Vu = {}, kl;
function OB() {
  if (kl) return Vu;
  kl = 1, Object.defineProperty(Vu, "__esModule", { value: !0 }), Vu.Integer = r;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ de();
  function r(i) {
    return (0, e.CreateType)({ [n.Kind]: "Integer", type: "integer" }, i);
  }
  return Vu;
}
var Yl;
function Hd() {
  return Yl || (Yl = 1, function(e) {
    var n = si && si.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = si && si.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ OB(), e);
  }(si)), si;
}
var ci = {}, Gu = {}, Hu = {}, Wu = {}, Jl;
function d_() {
  if (Jl) return Wu;
  Jl = 1, Object.defineProperty(Wu, "__esModule", { value: !0 }), Wu.IntrinsicFromMappedKey = u;
  const e = /* @__PURE__ */ rn(), n = /* @__PURE__ */ Oo(), r = /* @__PURE__ */ _n(), i = /* @__PURE__ */ En();
  function o(d, s, f) {
    return {
      [d]: (0, n.Intrinsic)((0, r.Literal)(d), s, (0, i.Clone)(f))
    };
  }
  function t(d, s, f) {
    return d.reduce((y, w) => ({ ...y, ...o(w, s, f) }), {});
  }
  function a(d, s, f) {
    return t(d.keys, s, f);
  }
  function u(d, s, f) {
    const c = a(d, s, f);
    return (0, e.MappedResult)(c);
  }
  return Wu;
}
var Zl;
function Oo() {
  if (Zl) return Hu;
  Zl = 1, Object.defineProperty(Hu, "__esModule", { value: !0 }), Hu.Intrinsic = w;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ nt(), r = /* @__PURE__ */ d_(), i = /* @__PURE__ */ _n(), o = /* @__PURE__ */ Ye(), t = /* @__PURE__ */ Fe();
  function a(h) {
    const [M, U] = [h.slice(0, 1), h.slice(1)];
    return [M.toLowerCase(), U].join("");
  }
  function u(h) {
    const [M, U] = [h.slice(0, 1), h.slice(1)];
    return [M.toUpperCase(), U].join("");
  }
  function d(h) {
    return h.toUpperCase();
  }
  function s(h) {
    return h.toLowerCase();
  }
  function f(h, M, U) {
    const F = (0, n.TemplateLiteralParseExact)(h.pattern);
    if (!(0, n.IsTemplateLiteralExpressionFinite)(F))
      return { ...h, pattern: c(h.pattern, M) };
    const $ = [...(0, n.TemplateLiteralExpressionGenerate)(F)].map((T) => (0, i.Literal)(T)), _ = y($, M), x = (0, o.Union)(_);
    return (0, n.TemplateLiteral)([x], U);
  }
  function c(h, M) {
    return typeof h == "string" ? M === "Uncapitalize" ? a(h) : M === "Capitalize" ? u(h) : M === "Uppercase" ? d(h) : M === "Lowercase" ? s(h) : h : h.toString();
  }
  function y(h, M) {
    return h.map((U) => w(U, M));
  }
  function w(h, M, U = {}) {
    return (
      // Intrinsic-Mapped-Inference
      (0, t.IsMappedKey)(h) ? (0, r.IntrinsicFromMappedKey)(h, M, U) : (
        // Standard-Inference
        (0, t.IsTemplateLiteral)(h) ? f(h, M, U) : (0, t.IsUnion)(h) ? (0, o.Union)(y(h.anyOf, M), U) : (0, t.IsLiteral)(h) ? (0, i.Literal)(c(h.const, M), U) : (
          // Default Type
          (0, e.CreateType)(h, U)
        )
      )
    );
  }
  return Hu;
}
var Ql;
function AB() {
  if (Ql) return Gu;
  Ql = 1, Object.defineProperty(Gu, "__esModule", { value: !0 }), Gu.Capitalize = n;
  const e = /* @__PURE__ */ Oo();
  function n(r, i = {}) {
    return (0, e.Intrinsic)(r, "Capitalize", i);
  }
  return Gu;
}
var zu = {}, Xl;
function wB() {
  if (Xl) return zu;
  Xl = 1, Object.defineProperty(zu, "__esModule", { value: !0 }), zu.Lowercase = n;
  const e = /* @__PURE__ */ Oo();
  function n(r, i = {}) {
    return (0, e.Intrinsic)(r, "Lowercase", i);
  }
  return zu;
}
var ku = {}, em;
function RB() {
  if (em) return ku;
  em = 1, Object.defineProperty(ku, "__esModule", { value: !0 }), ku.Uncapitalize = n;
  const e = /* @__PURE__ */ Oo();
  function n(r, i = {}) {
    return (0, e.Intrinsic)(r, "Uncapitalize", i);
  }
  return ku;
}
var Yu = {}, nm;
function $B() {
  if (nm) return Yu;
  nm = 1, Object.defineProperty(Yu, "__esModule", { value: !0 }), Yu.Uppercase = n;
  const e = /* @__PURE__ */ Oo();
  function n(r, i = {}) {
    return (0, e.Intrinsic)(r, "Uppercase", i);
  }
  return Yu;
}
var tm;
function Wd() {
  return tm || (tm = 1, function(e) {
    var n = ci && ci.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = ci && ci.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ AB(), e), r(/* @__PURE__ */ d_(), e), r(/* @__PURE__ */ Oo(), e), r(/* @__PURE__ */ wB(), e), r(/* @__PURE__ */ RB(), e), r(/* @__PURE__ */ $B(), e);
  }(ci)), ci;
}
var di = {}, Qi = {}, Xi = {}, pi = {}, Ju = {}, Zu = {}, Qu = {}, rm;
function p_() {
  if (rm) return Qu;
  rm = 1, Object.defineProperty(Qu, "__esModule", { value: !0 }), Qu.OmitFromMappedResult = t;
  const e = /* @__PURE__ */ rn(), n = /* @__PURE__ */ zd(), r = /* @__PURE__ */ En();
  function i(a, u, d) {
    const s = {};
    for (const f of globalThis.Object.getOwnPropertyNames(a))
      s[f] = (0, n.Omit)(a[f], u, (0, r.Clone)(d));
    return s;
  }
  function o(a, u, d) {
    return i(a.properties, u, d);
  }
  function t(a, u, d) {
    const s = o(a, u, d);
    return (0, e.MappedResult)(s);
  }
  return Qu;
}
var im;
function zd() {
  if (im) return Zu;
  im = 1, Object.defineProperty(Zu, "__esModule", { value: !0 }), Zu.Omit = $;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ Ad(), r = /* @__PURE__ */ Ks(), i = /* @__PURE__ */ Ft(), o = /* @__PURE__ */ _n(), t = /* @__PURE__ */ tt(), a = /* @__PURE__ */ Nn(), u = /* @__PURE__ */ Ye(), d = /* @__PURE__ */ Cn(), s = /* @__PURE__ */ f_(), f = /* @__PURE__ */ p_(), c = /* @__PURE__ */ Fe(), y = /* @__PURE__ */ Sn();
  function w(_, x) {
    return _.map((T) => G(T, x));
  }
  function h(_, x) {
    return _.map((T) => G(T, x));
  }
  function M(_, x) {
    const { [x]: T, ...P } = _;
    return P;
  }
  function U(_, x) {
    return x.reduce((T, P) => M(T, P), _);
  }
  function F(_, x) {
    const T = (0, n.Discard)(_, [r.TransformKind, "$id", "required", "properties"]), P = U(_.properties, x);
    return (0, d.Object)(P, T);
  }
  function C(_) {
    const x = _.reduce((T, P) => (0, c.IsLiteralValue)(P) ? [...T, (0, o.Literal)(P)] : T, []);
    return (0, u.Union)(x);
  }
  function G(_, x) {
    return (0, c.IsIntersect)(_) ? (0, a.Intersect)(w(_.allOf, x)) : (0, c.IsUnion)(_) ? (0, u.Union)(h(_.anyOf, x)) : (0, c.IsObject)(_) ? F(_, x) : (0, d.Object)({});
  }
  function $(_, x, T) {
    const P = (0, y.IsArray)(x) ? C(x) : x, R = (0, c.IsSchema)(x) ? (0, t.IndexPropertyKeys)(x) : x, l = (0, c.IsRef)(_), B = (0, c.IsRef)(x);
    return (0, c.IsMappedResult)(_) ? (0, f.OmitFromMappedResult)(_, R, T) : (0, c.IsMappedKey)(x) ? (0, s.OmitFromMappedKey)(_, x, T) : l && B ? (0, i.Computed)("Omit", [_, P], T) : !l && B ? (0, i.Computed)("Omit", [_, P], T) : l && !B ? (0, i.Computed)("Omit", [_, P], T) : (0, e.CreateType)({ ...G(_, R), ...T });
  }
  return Zu;
}
var om;
function f_() {
  if (om) return Ju;
  om = 1, Object.defineProperty(Ju, "__esModule", { value: !0 }), Ju.OmitFromMappedKey = a;
  const e = /* @__PURE__ */ rn(), n = /* @__PURE__ */ zd(), r = /* @__PURE__ */ En();
  function i(u, d, s) {
    return { [d]: (0, n.Omit)(u, [d], (0, r.Clone)(s)) };
  }
  function o(u, d, s) {
    return d.reduce((f, c) => ({ ...f, ...i(u, c, s) }), {});
  }
  function t(u, d, s) {
    return o(u, d.keys, s);
  }
  function a(u, d, s) {
    const f = t(u, d, s);
    return (0, e.MappedResult)(f);
  }
  return Ju;
}
var am;
function Xs() {
  return am || (am = 1, function(e) {
    var n = pi && pi.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = pi && pi.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ f_(), e), r(/* @__PURE__ */ p_(), e), r(/* @__PURE__ */ zd(), e);
  }(pi)), pi;
}
var fi = {}, Xu = {}, es = {}, ns = {}, um;
function y_() {
  if (um) return ns;
  um = 1, Object.defineProperty(ns, "__esModule", { value: !0 }), ns.PickFromMappedResult = t;
  const e = /* @__PURE__ */ rn(), n = /* @__PURE__ */ kd(), r = /* @__PURE__ */ En();
  function i(a, u, d) {
    const s = {};
    for (const f of globalThis.Object.getOwnPropertyNames(a))
      s[f] = (0, n.Pick)(a[f], u, (0, r.Clone)(d));
    return s;
  }
  function o(a, u, d) {
    return i(a.properties, u, d);
  }
  function t(a, u, d) {
    const s = o(a, u, d);
    return (0, e.MappedResult)(s);
  }
  return ns;
}
var sm;
function kd() {
  if (sm) return es;
  sm = 1, Object.defineProperty(es, "__esModule", { value: !0 }), es.Pick = G;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ Ad(), r = /* @__PURE__ */ Ft(), i = /* @__PURE__ */ Nn(), o = /* @__PURE__ */ _n(), t = /* @__PURE__ */ Cn(), a = /* @__PURE__ */ Ye(), u = /* @__PURE__ */ tt(), d = /* @__PURE__ */ Ks(), s = /* @__PURE__ */ Fe(), f = /* @__PURE__ */ Sn(), c = /* @__PURE__ */ l_(), y = /* @__PURE__ */ y_();
  function w($, _) {
    return $.map((x) => C(x, _));
  }
  function h($, _) {
    return $.map((x) => C(x, _));
  }
  function M($, _) {
    const x = {};
    for (const T of _)
      T in $ && (x[T] = $[T]);
    return x;
  }
  function U($, _) {
    const x = (0, n.Discard)($, [d.TransformKind, "$id", "required", "properties"]), T = M($.properties, _);
    return (0, t.Object)(T, x);
  }
  function F($) {
    const _ = $.reduce((x, T) => (0, s.IsLiteralValue)(T) ? [...x, (0, o.Literal)(T)] : x, []);
    return (0, a.Union)(_);
  }
  function C($, _) {
    return (0, s.IsIntersect)($) ? (0, i.Intersect)(w($.allOf, _)) : (0, s.IsUnion)($) ? (0, a.Union)(h($.anyOf, _)) : (0, s.IsObject)($) ? U($, _) : (0, t.Object)({});
  }
  function G($, _, x) {
    const T = (0, f.IsArray)(_) ? F(_) : _, P = (0, s.IsSchema)(_) ? (0, u.IndexPropertyKeys)(_) : _, R = (0, s.IsRef)($), l = (0, s.IsRef)(_);
    return (0, s.IsMappedResult)($) ? (0, y.PickFromMappedResult)($, P, x) : (0, s.IsMappedKey)(_) ? (0, c.PickFromMappedKey)($, _, x) : R && l ? (0, r.Computed)("Pick", [$, T], x) : !R && l ? (0, r.Computed)("Pick", [$, T], x) : R && !l ? (0, r.Computed)("Pick", [$, T], x) : (0, e.CreateType)({ ...C($, P), ...x });
  }
  return es;
}
var cm;
function l_() {
  if (cm) return Xu;
  cm = 1, Object.defineProperty(Xu, "__esModule", { value: !0 }), Xu.PickFromMappedKey = a;
  const e = /* @__PURE__ */ rn(), n = /* @__PURE__ */ kd(), r = /* @__PURE__ */ En();
  function i(u, d, s) {
    return {
      [d]: (0, n.Pick)(u, [d], (0, r.Clone)(s))
    };
  }
  function o(u, d, s) {
    return d.reduce((f, c) => ({ ...f, ...i(u, c, s) }), {});
  }
  function t(u, d, s) {
    return o(u, d.keys, s);
  }
  function a(u, d, s) {
    const f = t(u, d, s);
    return (0, e.MappedResult)(f);
  }
  return Xu;
}
var dm;
function ec() {
  return dm || (dm = 1, function(e) {
    var n = fi && fi.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = fi && fi.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ l_(), e), r(/* @__PURE__ */ y_(), e), r(/* @__PURE__ */ kd(), e);
  }(fi)), fi;
}
var yi = {}, ts = {}, rs = {}, pm;
function m_() {
  if (pm) return rs;
  pm = 1, Object.defineProperty(rs, "__esModule", { value: !0 }), rs.Partial = F;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ Ft(), r = /* @__PURE__ */ xt(), i = /* @__PURE__ */ Cn(), o = /* @__PURE__ */ Nn(), t = /* @__PURE__ */ Ye(), a = /* @__PURE__ */ Pt(), u = /* @__PURE__ */ Ct(), d = /* @__PURE__ */ de(), s = /* @__PURE__ */ T_(), f = /* @__PURE__ */ Fe();
  function c(C, G) {
    return (0, n.Computed)("Partial", [(0, n.Computed)(C, G)]);
  }
  function y(C) {
    return (0, n.Computed)("Partial", [(0, a.Ref)(C)]);
  }
  function w(C) {
    const G = {};
    for (const $ of globalThis.Object.getOwnPropertyNames(C))
      G[$] = (0, r.Optional)(C[$]);
    return G;
  }
  function h(C) {
    const G = (0, u.Discard)(C, [d.TransformKind, "$id", "required", "properties"]), $ = w(C.properties);
    return (0, i.Object)($, G);
  }
  function M(C) {
    return C.map((G) => U(G));
  }
  function U(C) {
    return (0, f.IsComputed)(C) ? c(C.target, C.parameters) : (0, f.IsRef)(C) ? y(C.$ref) : (0, f.IsIntersect)(C) ? (0, o.Intersect)(M(C.allOf)) : (0, f.IsUnion)(C) ? (0, t.Union)(M(C.anyOf)) : (0, f.IsObject)(C) ? h(C) : (0, i.Object)({});
  }
  function F(C, G) {
    return (0, f.IsMappedResult)(C) ? (0, s.PartialFromMappedResult)(C, G) : (0, e.CreateType)({ ...U(C), ...G });
  }
  return rs;
}
var fm;
function T_() {
  if (fm) return ts;
  fm = 1, Object.defineProperty(ts, "__esModule", { value: !0 }), ts.PartialFromMappedResult = t;
  const e = /* @__PURE__ */ rn(), n = /* @__PURE__ */ m_(), r = /* @__PURE__ */ En();
  function i(a, u) {
    const d = {};
    for (const s of globalThis.Object.getOwnPropertyNames(a))
      d[s] = (0, n.Partial)(a[s], (0, r.Clone)(u));
    return d;
  }
  function o(a, u) {
    return i(a.properties, u);
  }
  function t(a, u) {
    const d = o(a, u);
    return (0, e.MappedResult)(d);
  }
  return ts;
}
var ym;
function nc() {
  return ym || (ym = 1, function(e) {
    var n = yi && yi.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = yi && yi.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ T_(), e), r(/* @__PURE__ */ m_(), e);
  }(yi)), yi;
}
var li = {}, is = {}, lm;
function hB() {
  if (lm) return is;
  lm = 1, Object.defineProperty(is, "__esModule", { value: !0 }), is.Record = T;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ de(), r = /* @__PURE__ */ Ft(), i = /* @__PURE__ */ Tn(), o = /* @__PURE__ */ Cn(), t = /* @__PURE__ */ Pt(), a = /* @__PURE__ */ Ye(), u = /* @__PURE__ */ nt(), d = /* @__PURE__ */ ma(), s = /* @__PURE__ */ tt(), f = /* @__PURE__ */ Sn(), c = /* @__PURE__ */ Fe();
  function y(P, R, l) {
    return (0, e.CreateType)({ [n.Kind]: "Record", type: "object", patternProperties: { [P]: R } }, l);
  }
  function w(P, R, l) {
    const B = {};
    for (const S of P)
      B[S] = R;
    return (0, o.Object)(B, { ...l, [n.Hint]: "Record" });
  }
  function h(P, R, l) {
    return (0, u.IsTemplateLiteralFinite)(P) ? w((0, s.IndexPropertyKeys)(P), R, l) : y(P.pattern, R, l);
  }
  function M(P, R, l) {
    return w((0, s.IndexPropertyKeys)((0, a.Union)(P)), R, l);
  }
  function U(P, R, l) {
    return w([P.toString()], R, l);
  }
  function F(P, R, l) {
    return y(P.source, R, l);
  }
  function C(P, R, l) {
    const B = (0, f.IsUndefined)(P.pattern) ? d.PatternStringExact : P.pattern;
    return y(B, R, l);
  }
  function G(P, R, l) {
    return y(d.PatternStringExact, R, l);
  }
  function $(P, R, l) {
    return y(d.PatternNeverExact, R, l);
  }
  function _(P, R, l) {
    return y(d.PatternNumberExact, R, l);
  }
  function x(P, R, l) {
    return y(d.PatternNumberExact, R, l);
  }
  function T(P, R, l = {}) {
    return (0, c.IsComputed)(R) ? (0, r.Computed)("Record", [P, (0, r.Computed)(R.target, R.parameters)], l) : (0, c.IsComputed)(P) ? (0, r.Computed)("Record", [(0, r.Computed)(R.target, R.parameters), R], l) : (0, c.IsRef)(P) ? (0, r.Computed)("Record", [(0, t.Ref)(P.$ref), R]) : (0, c.IsUnion)(P) ? M(P.anyOf, R, l) : (0, c.IsTemplateLiteral)(P) ? h(P, R, l) : (0, c.IsLiteral)(P) ? U(P.const, R, l) : (0, c.IsInteger)(P) ? _(P, R, l) : (0, c.IsNumber)(P) ? x(P, R, l) : (0, c.IsRegExp)(P) ? F(P, R, l) : (0, c.IsString)(P) ? C(P, R, l) : (0, c.IsAny)(P) ? G(P, R, l) : (0, c.IsNever)(P) ? $(P, R, l) : (0, i.Never)(l);
  }
  return is;
}
var mm;
function tc() {
  return mm || (mm = 1, function(e) {
    var n = li && li.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = li && li.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ hB(), e);
  }(li)), li;
}
var mi = {}, os = {}, as = {}, Tm;
function g_() {
  if (Tm) return as;
  Tm = 1, Object.defineProperty(as, "__esModule", { value: !0 }), as.Required = U;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ Ft(), r = /* @__PURE__ */ Cn(), i = /* @__PURE__ */ Nn(), o = /* @__PURE__ */ Ye(), t = /* @__PURE__ */ Pt(), a = /* @__PURE__ */ de(), u = /* @__PURE__ */ Ct(), d = /* @__PURE__ */ __(), s = /* @__PURE__ */ Fe();
  function f(F, C) {
    return (0, n.Computed)("Required", [(0, n.Computed)(F, C)]);
  }
  function c(F) {
    return (0, n.Computed)("Required", [(0, t.Ref)(F)]);
  }
  function y(F) {
    const C = {};
    for (const G of globalThis.Object.getOwnPropertyNames(F))
      C[G] = (0, u.Discard)(F[G], [a.OptionalKind]);
    return C;
  }
  function w(F) {
    const C = (0, u.Discard)(F, [a.TransformKind, "$id", "required", "properties"]), G = y(F.properties);
    return (0, r.Object)(G, C);
  }
  function h(F) {
    return F.map((C) => M(C));
  }
  function M(F) {
    return (0, s.IsComputed)(F) ? f(F.target, F.parameters) : (0, s.IsRef)(F) ? c(F.$ref) : (0, s.IsIntersect)(F) ? (0, i.Intersect)(h(F.allOf)) : (0, s.IsUnion)(F) ? (0, o.Union)(h(F.anyOf)) : (0, s.IsObject)(F) ? w(F) : (0, r.Object)({});
  }
  function U(F, C) {
    return (0, s.IsMappedResult)(F) ? (0, d.RequiredFromMappedResult)(F, C) : (0, e.CreateType)({ ...M(F), ...C });
  }
  return as;
}
var gm;
function __() {
  if (gm) return os;
  gm = 1, Object.defineProperty(os, "__esModule", { value: !0 }), os.RequiredFromMappedResult = o;
  const e = /* @__PURE__ */ rn(), n = /* @__PURE__ */ g_();
  function r(t, a) {
    const u = {};
    for (const d of globalThis.Object.getOwnPropertyNames(t))
      u[d] = (0, n.Required)(t[d], a);
    return u;
  }
  function i(t, a) {
    return r(t.properties, a);
  }
  function o(t, a) {
    const u = i(t, a);
    return (0, e.MappedResult)(u);
  }
  return os;
}
var _m;
function rc() {
  return _m || (_m = 1, function(e) {
    var n = mi && mi.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = mi && mi.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ __(), e), r(/* @__PURE__ */ g_(), e);
  }(mi)), mi;
}
var bm;
function BB() {
  if (bm) return Xi;
  bm = 1, Object.defineProperty(Xi, "__esModule", { value: !0 }), Xi.FromType = ee, Xi.ComputeType = Ie, Xi.ComputeModuleProperties = Ae;
  const e = /* @__PURE__ */ jt(), n = /* @__PURE__ */ Ct(), r = /* @__PURE__ */ pa(), i = /* @__PURE__ */ zs(), o = /* @__PURE__ */ fa(), t = /* @__PURE__ */ ya(), a = /* @__PURE__ */ tt(), u = /* @__PURE__ */ Gi(), d = /* @__PURE__ */ Nn(), s = /* @__PURE__ */ Ta(), f = /* @__PURE__ */ Yn(), c = /* @__PURE__ */ Cn(), y = /* @__PURE__ */ Xs(), w = /* @__PURE__ */ ec(), h = /* @__PURE__ */ Tn(), M = /* @__PURE__ */ nc(), U = /* @__PURE__ */ tc(), F = /* @__PURE__ */ rc(), C = /* @__PURE__ */ Ut(), G = /* @__PURE__ */ Ye(), $ = /* @__PURE__ */ de(), _ = /* @__PURE__ */ Fe();
  function x(X, J) {
    return J.map((D) => _.IsRef(D) ? T(X, D.$ref) : ee(X, D));
  }
  function T(X, J) {
    return J in X ? _.IsRef(X[J]) ? T(X, X[J].$ref) : ee(X, X[J]) : (0, h.Never)();
  }
  function P(X) {
    return (0, i.Awaited)(X[0]);
  }
  function R(X) {
    return (0, a.Index)(X[0], X[1]);
  }
  function l(X) {
    return (0, f.KeyOf)(X[0]);
  }
  function B(X) {
    return (0, M.Partial)(X[0]);
  }
  function S(X) {
    return (0, y.Omit)(X[0], X[1]);
  }
  function q(X) {
    return (0, w.Pick)(X[0], X[1]);
  }
  function V(X) {
    return (0, U.Record)(X[0], X[1]);
  }
  function k(X) {
    return (0, F.Required)(X[0]);
  }
  function ne(X, J, D) {
    const m = x(X, D);
    return J === "Awaited" ? P(m) : J === "Index" ? R(m) : J === "KeyOf" ? l(m) : J === "Partial" ? B(m) : J === "Omit" ? S(m) : J === "Pick" ? q(m) : J === "Record" ? V(m) : J === "Required" ? k(m) : (0, h.Never)();
  }
  function re(X, J) {
    return (0, c.Object)(globalThis.Object.keys(J).reduce((D, m) => ({ ...D, [m]: ee(X, J[m]) }), {}));
  }
  function W(X, J, D) {
    return (0, t.Constructor)(Q(X, J), ee(X, D));
  }
  function we(X, J, D) {
    return (0, u.Function)(Q(X, J), ee(X, D));
  }
  function xe(X, J) {
    return (0, C.Tuple)(Q(X, J));
  }
  function Le(X, J) {
    return (0, d.Intersect)(Q(X, J));
  }
  function Ne(X, J) {
    return (0, G.Union)(Q(X, J));
  }
  function Ke(X, J) {
    return (0, r.Array)(ee(X, J));
  }
  function Re(X, J) {
    return (0, o.AsyncIterator)(ee(X, J));
  }
  function Ge(X, J) {
    return (0, s.Iterator)(ee(X, J));
  }
  function Q(X, J) {
    return J.map((D) => ee(X, D));
  }
  function ee(X, J) {
    return (
      // Modifier Unwrap - Reapplied via CreateType Options
      _.IsOptional(J) ? (0, e.CreateType)(ee(X, (0, n.Discard)(J, [$.OptionalKind])), J) : _.IsReadonly(J) ? (0, e.CreateType)(ee(X, (0, n.Discard)(J, [$.ReadonlyKind])), J) : (
        // Traveral
        _.IsArray(J) ? (0, e.CreateType)(Ke(X, J.items), J) : _.IsAsyncIterator(J) ? (0, e.CreateType)(Re(X, J.items), J) : _.IsComputed(J) ? (0, e.CreateType)(ne(X, J.target, J.parameters)) : _.IsConstructor(J) ? (0, e.CreateType)(W(X, J.parameters, J.returns), J) : _.IsFunction(J) ? (0, e.CreateType)(we(X, J.parameters, J.returns), J) : _.IsIntersect(J) ? (0, e.CreateType)(Le(X, J.allOf), J) : _.IsIterator(J) ? (0, e.CreateType)(Ge(X, J.items), J) : _.IsObject(J) ? (0, e.CreateType)(re(X, J.properties), J) : _.IsTuple(J) ? (0, e.CreateType)(xe(X, J.items || []), J) : _.IsUnion(J) ? (0, e.CreateType)(Ne(X, J.anyOf), J) : J
      )
    );
  }
  function Ie(X, J) {
    return J in X ? ee(X, X[J]) : (0, h.Never)();
  }
  function Ae(X) {
    return globalThis.Object.getOwnPropertyNames(X).reduce((J, D) => ({ ...J, [D]: Ie(X, D) }), {});
  }
  return Xi;
}
var Im;
function MB() {
  if (Im) return Qi;
  Im = 1, Object.defineProperty(Qi, "__esModule", { value: !0 }), Qi.TModule = void 0, Qi.Module = o;
  const e = /* @__PURE__ */ jt(), n = /* @__PURE__ */ de(), r = /* @__PURE__ */ BB();
  class i {
    constructor(a) {
      const u = (0, r.ComputeModuleProperties)(a), d = this.WithIdentifiers(u);
      this.$defs = d;
    }
    /** `[Json]` Imports a Type by Key. */
    Import(a, u) {
      const d = { ...this.$defs, [a]: (0, e.CreateType)(this.$defs[a], u) };
      return (0, e.CreateType)({ [n.Kind]: "Import", $defs: d, $ref: a });
    }
    // prettier-ignore
    WithIdentifiers(a) {
      return globalThis.Object.getOwnPropertyNames(a).reduce((u, d) => ({ ...u, [d]: { ...a[d], $id: d } }), {});
    }
  }
  Qi.TModule = i;
  function o(t) {
    return new i(t);
  }
  return Qi;
}
var Pm;
function Yd() {
  return Pm || (Pm = 1, function(e) {
    var n = di && di.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = di && di.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ MB(), e);
  }(di)), di;
}
var Ti = {}, us = {}, Om;
function SB() {
  if (Om) return us;
  Om = 1, Object.defineProperty(us, "__esModule", { value: !0 }), us.Not = r;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ de();
  function r(i, o) {
    return (0, e.CreateType)({ [n.Kind]: "Not", not: i }, o);
  }
  return us;
}
var Am;
function Jd() {
  return Am || (Am = 1, function(e) {
    var n = Ti && Ti.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Ti && Ti.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ SB(), e);
  }(Ti)), Ti;
}
var gi = {}, ss = {}, wm;
function EB() {
  if (wm) return ss;
  wm = 1, Object.defineProperty(ss, "__esModule", { value: !0 }), ss.Parameters = n;
  const e = /* @__PURE__ */ Ut();
  function n(r, i) {
    return (0, e.Tuple)(r.parameters, i);
  }
  return ss;
}
var Rm;
function Zd() {
  return Rm || (Rm = 1, function(e) {
    var n = gi && gi.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = gi && gi.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ EB(), e);
  }(gi)), gi;
}
var _i = {}, cs = {}, $m;
function CB() {
  if ($m) return cs;
  $m = 1, Object.defineProperty(cs, "__esModule", { value: !0 }), cs.ReadonlyOptional = r;
  const e = /* @__PURE__ */ bo(), n = /* @__PURE__ */ xt();
  function r(i) {
    return (0, e.Readonly)((0, n.Optional)(i));
  }
  return cs;
}
var hm;
function Qd() {
  return hm || (hm = 1, function(e) {
    var n = _i && _i.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = _i && _i.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ CB(), e);
  }(_i)), _i;
}
var bi = {}, ds = {}, Bm;
function jB() {
  if (Bm) return ds;
  Bm = 1, Object.defineProperty(ds, "__esModule", { value: !0 }), ds.Recursive = t;
  const e = /* @__PURE__ */ o_(), n = /* @__PURE__ */ me(), r = /* @__PURE__ */ Sn(), i = /* @__PURE__ */ de();
  let o = 0;
  function t(a, u = {}) {
    (0, r.IsUndefined)(u.$id) && (u.$id = `T${o++}`);
    const d = (0, e.CloneType)(a({ [i.Kind]: "This", $ref: `${u.$id}` }));
    return d.$id = u.$id, (0, n.CreateType)({ [i.Hint]: "Recursive", ...d }, u);
  }
  return ds;
}
var Mm;
function Xd() {
  return Mm || (Mm = 1, function(e) {
    var n = bi && bi.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = bi && bi.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ jB(), e);
  }(bi)), bi;
}
var Ii = {}, ps = {}, Sm;
function FB() {
  if (Sm) return ps;
  Sm = 1, Object.defineProperty(ps, "__esModule", { value: !0 }), ps.RegExp = i;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ Sn(), r = /* @__PURE__ */ de();
  function i(o, t) {
    const a = (0, n.IsString)(o) ? new globalThis.RegExp(o) : o;
    return (0, e.CreateType)({ [r.Kind]: "RegExp", type: "RegExp", source: a.source, flags: a.flags }, t);
  }
  return ps;
}
var Em;
function ep() {
  return Em || (Em = 1, function(e) {
    var n = Ii && Ii.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Ii && Ii.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ FB(), e);
  }(Ii)), Ii;
}
var Pi = {}, fs = {}, Cm;
function xB() {
  if (Cm) return fs;
  Cm = 1, Object.defineProperty(fs, "__esModule", { value: !0 }), fs.Rest = r;
  const e = /* @__PURE__ */ Fe();
  function n(i) {
    return (0, e.IsIntersect)(i) ? i.allOf : (0, e.IsUnion)(i) ? i.anyOf : (0, e.IsTuple)(i) ? i.items ?? [] : [];
  }
  function r(i) {
    return n(i);
  }
  return fs;
}
var jm;
function np() {
  return jm || (jm = 1, function(e) {
    var n = Pi && Pi.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Pi && Pi.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ xB(), e);
  }(Pi)), Pi;
}
var Oi = {}, ys = {}, Fm;
function UB() {
  if (Fm) return ys;
  Fm = 1, Object.defineProperty(ys, "__esModule", { value: !0 }), ys.ReturnType = n;
  const e = /* @__PURE__ */ me();
  function n(r, i) {
    return (0, e.CreateType)(r.returns, i);
  }
  return ys;
}
var xm;
function tp() {
  return xm || (xm = 1, function(e) {
    var n = Oi && Oi.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Oi && Oi.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ UB(), e);
  }(Oi)), Oi;
}
var Ai = {}, Tc = {}, Um;
function DB() {
  return Um || (Um = 1, Object.defineProperty(Tc, "__esModule", { value: !0 })), Tc;
}
var gc = {}, Dm;
function vB() {
  return Dm || (Dm = 1, Object.defineProperty(gc, "__esModule", { value: !0 })), gc;
}
var vm;
function NB() {
  return vm || (vm = 1, function(e) {
    var n = Ai && Ai.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Ai && Ai.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ DB(), e), r(/* @__PURE__ */ vB(), e);
  }(Ai)), Ai;
}
var wi = {}, _c = {}, Nm;
function qB() {
  return Nm || (Nm = 1, Object.defineProperty(_c, "__esModule", { value: !0 })), _c;
}
var qm;
function LB() {
  return qm || (qm = 1, function(e) {
    var n = wi && wi.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = wi && wi.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ qB(), e);
  }(wi)), wi;
}
var Ri = {}, Rt = {}, Lm;
function KB() {
  if (Lm) return Rt;
  Lm = 1, Object.defineProperty(Rt, "__esModule", { value: !0 }), Rt.TransformEncodeBuilder = Rt.TransformDecodeBuilder = void 0, Rt.Transform = o;
  const e = /* @__PURE__ */ de(), n = /* @__PURE__ */ Fe();
  class r {
    constructor(a) {
      this.schema = a;
    }
    Decode(a) {
      return new i(this.schema, a);
    }
  }
  Rt.TransformDecodeBuilder = r;
  class i {
    constructor(a, u) {
      this.schema = a, this.decode = u;
    }
    EncodeTransform(a, u) {
      const f = { Encode: (c) => u[e.TransformKind].Encode(a(c)), Decode: (c) => this.decode(u[e.TransformKind].Decode(c)) };
      return { ...u, [e.TransformKind]: f };
    }
    EncodeSchema(a, u) {
      const d = { Decode: this.decode, Encode: a };
      return { ...u, [e.TransformKind]: d };
    }
    Encode(a) {
      return (0, n.IsTransform)(this.schema) ? this.EncodeTransform(a, this.schema) : this.EncodeSchema(a, this.schema);
    }
  }
  Rt.TransformEncodeBuilder = i;
  function o(t) {
    return new r(t);
  }
  return Rt;
}
var Km;
function rp() {
  return Km || (Km = 1, function(e) {
    var n = Ri && Ri.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Ri && Ri.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ KB(), e);
  }(Ri)), Ri;
}
var $i = {}, ls = {}, Vm;
function VB() {
  if (Vm) return ls;
  Vm = 1, Object.defineProperty(ls, "__esModule", { value: !0 }), ls.Void = r;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ de();
  function r(i) {
    return (0, e.CreateType)({ [n.Kind]: "Void", type: "void" }, i);
  }
  return ls;
}
var Gm;
function ip() {
  return Gm || (Gm = 1, function(e) {
    var n = $i && $i.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = $i && $i.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ VB(), e);
  }($i)), $i;
}
var bc = {}, vo = {}, Hm;
function b_() {
  if (Hm) return vo;
  Hm = 1, Object.defineProperty(vo, "__esModule", { value: !0 }), vo.JsonTypeBuilder = void 0;
  const e = /* @__PURE__ */ _a(), n = /* @__PURE__ */ pa(), r = /* @__PURE__ */ Gs(), i = /* @__PURE__ */ Ud(), o = /* @__PURE__ */ Dd(), t = /* @__PURE__ */ Nd(), a = /* @__PURE__ */ Ld(), u = /* @__PURE__ */ Po(), d = /* @__PURE__ */ Vd(), s = /* @__PURE__ */ tt(), f = /* @__PURE__ */ Hd(), c = /* @__PURE__ */ Nn(), y = /* @__PURE__ */ Wd(), w = /* @__PURE__ */ Yn(), h = /* @__PURE__ */ _n(), M = /* @__PURE__ */ rn(), U = /* @__PURE__ */ Tn(), F = /* @__PURE__ */ Jd(), C = /* @__PURE__ */ Ys(), G = /* @__PURE__ */ Yd(), $ = /* @__PURE__ */ go(), _ = /* @__PURE__ */ Cn(), x = /* @__PURE__ */ Xs(), T = /* @__PURE__ */ xt(), P = /* @__PURE__ */ nc(), R = /* @__PURE__ */ ec(), l = /* @__PURE__ */ bo(), B = /* @__PURE__ */ Qd(), S = /* @__PURE__ */ tc(), q = /* @__PURE__ */ Xd(), V = /* @__PURE__ */ Pt(), k = /* @__PURE__ */ rc(), ne = /* @__PURE__ */ np(), re = /* @__PURE__ */ _o(), W = /* @__PURE__ */ nt(), we = /* @__PURE__ */ rp(), xe = /* @__PURE__ */ Ut(), Le = /* @__PURE__ */ Ye(), Ne = /* @__PURE__ */ Io(), Ke = /* @__PURE__ */ Vs();
  class Re {
    // ------------------------------------------------------------------------
    // Modifiers
    // ------------------------------------------------------------------------
    /** `[Json]` Creates a Readonly and Optional property */
    ReadonlyOptional(Q) {
      return (0, B.ReadonlyOptional)(Q);
    }
    /** `[Json]` Creates a Readonly property */
    Readonly(Q, ee) {
      return (0, l.Readonly)(Q, ee ?? !0);
    }
    /** `[Json]` Creates a Optional property */
    Optional(Q, ee) {
      return (0, T.Optional)(Q, ee ?? !0);
    }
    // ------------------------------------------------------------------------
    // Types
    // ------------------------------------------------------------------------
    /** `[Json]` Creates an Any type */
    Any(Q) {
      return (0, e.Any)(Q);
    }
    /** `[Json]` Creates an Array type */
    Array(Q, ee) {
      return (0, n.Array)(Q, ee);
    }
    /** `[Json]` Creates a Boolean type */
    Boolean(Q) {
      return (0, r.Boolean)(Q);
    }
    /** `[Json]` Intrinsic function to Capitalize LiteralString types */
    Capitalize(Q, ee) {
      return (0, y.Capitalize)(Q, ee);
    }
    /** `[Json]` Creates a Composite object type */
    Composite(Q, ee) {
      return (0, i.Composite)(Q, ee);
    }
    /** `[JavaScript]` Creates a readonly const type from the given value. */
    Const(Q, ee) {
      return (0, o.Const)(Q, ee);
    }
    /** `[Json]` Creates a Enum type */
    Enum(Q, ee) {
      return (0, t.Enum)(Q, ee);
    }
    /** `[Json]` Constructs a type by excluding from unionType all union members that are assignable to excludedMembers */
    Exclude(Q, ee, Ie) {
      return (0, a.Exclude)(Q, ee, Ie);
    }
    /** `[Json]` Creates a Conditional type */
    Extends(Q, ee, Ie, Ae, X) {
      return (0, u.Extends)(Q, ee, Ie, Ae, X);
    }
    /** `[Json]` Constructs a type by extracting from type all union members that are assignable to union */
    Extract(Q, ee, Ie) {
      return (0, d.Extract)(Q, ee, Ie);
    }
    /** `[Json]` Returns an Indexed property type for the given keys */
    Index(Q, ee, Ie) {
      return (0, s.Index)(Q, ee, Ie);
    }
    /** `[Json]` Creates an Integer type */
    Integer(Q) {
      return (0, f.Integer)(Q);
    }
    /** `[Json]` Creates an Intersect type */
    Intersect(Q, ee) {
      return (0, c.Intersect)(Q, ee);
    }
    /** `[Json]` Creates a KeyOf type */
    KeyOf(Q, ee) {
      return (0, w.KeyOf)(Q, ee);
    }
    /** `[Json]` Creates a Literal type */
    Literal(Q, ee) {
      return (0, h.Literal)(Q, ee);
    }
    /** `[Json]` Intrinsic function to Lowercase LiteralString types */
    Lowercase(Q, ee) {
      return (0, y.Lowercase)(Q, ee);
    }
    /** `[Json]` Creates a Mapped object type */
    Mapped(Q, ee, Ie) {
      return (0, M.Mapped)(Q, ee, Ie);
    }
    /** `[Json]` Creates a Type Definition Module. */
    Module(Q) {
      return (0, G.Module)(Q);
    }
    /** `[Json]` Creates a Never type */
    Never(Q) {
      return (0, U.Never)(Q);
    }
    /** `[Json]` Creates a Not type */
    Not(Q, ee) {
      return (0, F.Not)(Q, ee);
    }
    /** `[Json]` Creates a Null type */
    Null(Q) {
      return (0, C.Null)(Q);
    }
    /** `[Json]` Creates a Number type */
    Number(Q) {
      return (0, $.Number)(Q);
    }
    /** `[Json]` Creates an Object type */
    Object(Q, ee) {
      return (0, _.Object)(Q, ee);
    }
    /** `[Json]` Constructs a type whose keys are omitted from the given type */
    Omit(Q, ee, Ie) {
      return (0, x.Omit)(Q, ee, Ie);
    }
    /** `[Json]` Constructs a type where all properties are optional */
    Partial(Q, ee) {
      return (0, P.Partial)(Q, ee);
    }
    /** `[Json]` Constructs a type whose keys are picked from the given type */
    Pick(Q, ee, Ie) {
      return (0, R.Pick)(Q, ee, Ie);
    }
    /** `[Json]` Creates a Record type */
    Record(Q, ee, Ie) {
      return (0, S.Record)(Q, ee, Ie);
    }
    /** `[Json]` Creates a Recursive type */
    Recursive(Q, ee) {
      return (0, q.Recursive)(Q, ee);
    }
    /** `[Json]` Creates a Ref type. The referenced type must contain a $id */
    Ref(...Q) {
      return (0, V.Ref)(Q[0], Q[1]);
    }
    /** `[Json]` Constructs a type where all properties are required */
    Required(Q, ee) {
      return (0, k.Required)(Q, ee);
    }
    /** `[Json]` Extracts interior Rest elements from Tuple, Intersect and Union types */
    Rest(Q) {
      return (0, ne.Rest)(Q);
    }
    /** `[Json]` Creates a String type */
    String(Q) {
      return (0, re.String)(Q);
    }
    /** `[Json]` Creates a TemplateLiteral type */
    TemplateLiteral(Q, ee) {
      return (0, W.TemplateLiteral)(Q, ee);
    }
    /** `[Json]` Creates a Transform type */
    Transform(Q) {
      return (0, we.Transform)(Q);
    }
    /** `[Json]` Creates a Tuple type */
    Tuple(Q, ee) {
      return (0, xe.Tuple)(Q, ee);
    }
    /** `[Json]` Intrinsic function to Uncapitalize LiteralString types */
    Uncapitalize(Q, ee) {
      return (0, y.Uncapitalize)(Q, ee);
    }
    /** `[Json]` Creates a Union type */
    Union(Q, ee) {
      return (0, Le.Union)(Q, ee);
    }
    /** `[Json]` Creates an Unknown type */
    Unknown(Q) {
      return (0, Ne.Unknown)(Q);
    }
    /** `[Json]` Creates a Unsafe type that will infers as the generic argument T */
    Unsafe(Q) {
      return (0, Ke.Unsafe)(Q);
    }
    /** `[Json]` Intrinsic function to Uppercase LiteralString types */
    Uppercase(Q, ee) {
      return (0, y.Uppercase)(Q, ee);
    }
  }
  return vo.JsonTypeBuilder = Re, vo;
}
var Ic = {}, Wm;
function GB() {
  return Wm || (Wm = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.String = e.ReturnType = e.Rest = e.Required = e.RegExp = e.Ref = e.Recursive = e.Record = e.ReadonlyOptional = e.Readonly = e.Promise = e.Pick = e.Partial = e.Parameters = e.Optional = e.Omit = e.Object = e.Number = e.Null = e.Not = e.Never = e.Module = e.Mapped = e.Literal = e.KeyOf = e.Iterator = e.Uppercase = e.Lowercase = e.Uncapitalize = e.Capitalize = e.Intersect = e.Integer = e.InstanceType = e.Index = e.Function = e.Extract = e.Extends = e.Exclude = e.Enum = e.Date = e.ConstructorParameters = e.Constructor = e.Const = e.Composite = e.Boolean = e.BigInt = e.Awaited = e.AsyncIterator = e.Array = e.Any = void 0, e.Void = e.Unsafe = e.Unknown = e.Union = e.Undefined = e.Uint8Array = e.Tuple = e.Transform = e.TemplateLiteral = e.Symbol = void 0;
    var n = /* @__PURE__ */ _a();
    Object.defineProperty(e, "Any", { enumerable: !0, get: function() {
      return n.Any;
    } });
    var r = /* @__PURE__ */ pa();
    Object.defineProperty(e, "Array", { enumerable: !0, get: function() {
      return r.Array;
    } });
    var i = /* @__PURE__ */ fa();
    Object.defineProperty(e, "AsyncIterator", { enumerable: !0, get: function() {
      return i.AsyncIterator;
    } });
    var o = /* @__PURE__ */ zs();
    Object.defineProperty(e, "Awaited", { enumerable: !0, get: function() {
      return o.Awaited;
    } });
    var t = /* @__PURE__ */ la();
    Object.defineProperty(e, "BigInt", { enumerable: !0, get: function() {
      return t.BigInt;
    } });
    var a = /* @__PURE__ */ Gs();
    Object.defineProperty(e, "Boolean", { enumerable: !0, get: function() {
      return a.Boolean;
    } });
    var u = /* @__PURE__ */ Ud();
    Object.defineProperty(e, "Composite", { enumerable: !0, get: function() {
      return u.Composite;
    } });
    var d = /* @__PURE__ */ Dd();
    Object.defineProperty(e, "Const", { enumerable: !0, get: function() {
      return d.Const;
    } });
    var s = /* @__PURE__ */ ya();
    Object.defineProperty(e, "Constructor", { enumerable: !0, get: function() {
      return s.Constructor;
    } });
    var f = /* @__PURE__ */ vd();
    Object.defineProperty(e, "ConstructorParameters", { enumerable: !0, get: function() {
      return f.ConstructorParameters;
    } });
    var c = /* @__PURE__ */ ks();
    Object.defineProperty(e, "Date", { enumerable: !0, get: function() {
      return c.Date;
    } });
    var y = /* @__PURE__ */ Nd();
    Object.defineProperty(e, "Enum", { enumerable: !0, get: function() {
      return y.Enum;
    } });
    var w = /* @__PURE__ */ Ld();
    Object.defineProperty(e, "Exclude", { enumerable: !0, get: function() {
      return w.Exclude;
    } });
    var h = /* @__PURE__ */ Po();
    Object.defineProperty(e, "Extends", { enumerable: !0, get: function() {
      return h.Extends;
    } });
    var M = /* @__PURE__ */ Vd();
    Object.defineProperty(e, "Extract", { enumerable: !0, get: function() {
      return M.Extract;
    } });
    var U = /* @__PURE__ */ Gi();
    Object.defineProperty(e, "Function", { enumerable: !0, get: function() {
      return U.Function;
    } });
    var F = /* @__PURE__ */ tt();
    Object.defineProperty(e, "Index", { enumerable: !0, get: function() {
      return F.Index;
    } });
    var C = /* @__PURE__ */ Gd();
    Object.defineProperty(e, "InstanceType", { enumerable: !0, get: function() {
      return C.InstanceType;
    } });
    var G = /* @__PURE__ */ Hd();
    Object.defineProperty(e, "Integer", { enumerable: !0, get: function() {
      return G.Integer;
    } });
    var $ = /* @__PURE__ */ Nn();
    Object.defineProperty(e, "Intersect", { enumerable: !0, get: function() {
      return $.Intersect;
    } });
    var _ = /* @__PURE__ */ Wd();
    Object.defineProperty(e, "Capitalize", { enumerable: !0, get: function() {
      return _.Capitalize;
    } }), Object.defineProperty(e, "Uncapitalize", { enumerable: !0, get: function() {
      return _.Uncapitalize;
    } }), Object.defineProperty(e, "Lowercase", { enumerable: !0, get: function() {
      return _.Lowercase;
    } }), Object.defineProperty(e, "Uppercase", { enumerable: !0, get: function() {
      return _.Uppercase;
    } });
    var x = /* @__PURE__ */ Ta();
    Object.defineProperty(e, "Iterator", { enumerable: !0, get: function() {
      return x.Iterator;
    } });
    var T = /* @__PURE__ */ Yn();
    Object.defineProperty(e, "KeyOf", { enumerable: !0, get: function() {
      return T.KeyOf;
    } });
    var P = /* @__PURE__ */ _n();
    Object.defineProperty(e, "Literal", { enumerable: !0, get: function() {
      return P.Literal;
    } });
    var R = /* @__PURE__ */ rn();
    Object.defineProperty(e, "Mapped", { enumerable: !0, get: function() {
      return R.Mapped;
    } });
    var l = /* @__PURE__ */ Yd();
    Object.defineProperty(e, "Module", { enumerable: !0, get: function() {
      return l.Module;
    } });
    var B = /* @__PURE__ */ Tn();
    Object.defineProperty(e, "Never", { enumerable: !0, get: function() {
      return B.Never;
    } });
    var S = /* @__PURE__ */ Jd();
    Object.defineProperty(e, "Not", { enumerable: !0, get: function() {
      return S.Not;
    } });
    var q = /* @__PURE__ */ Ys();
    Object.defineProperty(e, "Null", { enumerable: !0, get: function() {
      return q.Null;
    } });
    var V = /* @__PURE__ */ go();
    Object.defineProperty(e, "Number", { enumerable: !0, get: function() {
      return V.Number;
    } });
    var k = /* @__PURE__ */ Cn();
    Object.defineProperty(e, "Object", { enumerable: !0, get: function() {
      return k.Object;
    } });
    var ne = /* @__PURE__ */ Xs();
    Object.defineProperty(e, "Omit", { enumerable: !0, get: function() {
      return ne.Omit;
    } });
    var re = /* @__PURE__ */ xt();
    Object.defineProperty(e, "Optional", { enumerable: !0, get: function() {
      return re.Optional;
    } });
    var W = /* @__PURE__ */ Zd();
    Object.defineProperty(e, "Parameters", { enumerable: !0, get: function() {
      return W.Parameters;
    } });
    var we = /* @__PURE__ */ nc();
    Object.defineProperty(e, "Partial", { enumerable: !0, get: function() {
      return we.Partial;
    } });
    var xe = /* @__PURE__ */ ec();
    Object.defineProperty(e, "Pick", { enumerable: !0, get: function() {
      return xe.Pick;
    } });
    var Le = /* @__PURE__ */ Hs();
    Object.defineProperty(e, "Promise", { enumerable: !0, get: function() {
      return Le.Promise;
    } });
    var Ne = /* @__PURE__ */ bo();
    Object.defineProperty(e, "Readonly", { enumerable: !0, get: function() {
      return Ne.Readonly;
    } });
    var Ke = /* @__PURE__ */ Qd();
    Object.defineProperty(e, "ReadonlyOptional", { enumerable: !0, get: function() {
      return Ke.ReadonlyOptional;
    } });
    var Re = /* @__PURE__ */ tc();
    Object.defineProperty(e, "Record", { enumerable: !0, get: function() {
      return Re.Record;
    } });
    var Ge = /* @__PURE__ */ Xd();
    Object.defineProperty(e, "Recursive", { enumerable: !0, get: function() {
      return Ge.Recursive;
    } });
    var Q = /* @__PURE__ */ Pt();
    Object.defineProperty(e, "Ref", { enumerable: !0, get: function() {
      return Q.Ref;
    } });
    var ee = /* @__PURE__ */ ep();
    Object.defineProperty(e, "RegExp", { enumerable: !0, get: function() {
      return ee.RegExp;
    } });
    var Ie = /* @__PURE__ */ rc();
    Object.defineProperty(e, "Required", { enumerable: !0, get: function() {
      return Ie.Required;
    } });
    var Ae = /* @__PURE__ */ np();
    Object.defineProperty(e, "Rest", { enumerable: !0, get: function() {
      return Ae.Rest;
    } });
    var X = /* @__PURE__ */ tp();
    Object.defineProperty(e, "ReturnType", { enumerable: !0, get: function() {
      return X.ReturnType;
    } });
    var J = /* @__PURE__ */ _o();
    Object.defineProperty(e, "String", { enumerable: !0, get: function() {
      return J.String;
    } });
    var D = /* @__PURE__ */ Js();
    Object.defineProperty(e, "Symbol", { enumerable: !0, get: function() {
      return D.Symbol;
    } });
    var m = /* @__PURE__ */ nt();
    Object.defineProperty(e, "TemplateLiteral", { enumerable: !0, get: function() {
      return m.TemplateLiteral;
    } });
    var g = /* @__PURE__ */ rp();
    Object.defineProperty(e, "Transform", { enumerable: !0, get: function() {
      return g.Transform;
    } });
    var E = /* @__PURE__ */ Ut();
    Object.defineProperty(e, "Tuple", { enumerable: !0, get: function() {
      return E.Tuple;
    } });
    var H = /* @__PURE__ */ Qs();
    Object.defineProperty(e, "Uint8Array", { enumerable: !0, get: function() {
      return H.Uint8Array;
    } });
    var p = /* @__PURE__ */ Zs();
    Object.defineProperty(e, "Undefined", { enumerable: !0, get: function() {
      return p.Undefined;
    } });
    var Z = /* @__PURE__ */ Ye();
    Object.defineProperty(e, "Union", { enumerable: !0, get: function() {
      return Z.Union;
    } });
    var L = /* @__PURE__ */ Io();
    Object.defineProperty(e, "Unknown", { enumerable: !0, get: function() {
      return L.Unknown;
    } });
    var j = /* @__PURE__ */ Vs();
    Object.defineProperty(e, "Unsafe", { enumerable: !0, get: function() {
      return j.Unsafe;
    } });
    var se = /* @__PURE__ */ ip();
    Object.defineProperty(e, "Void", { enumerable: !0, get: function() {
      return se.Void;
    } });
  }(Ic)), Ic;
}
var No = {}, zm;
function HB() {
  if (zm) return No;
  zm = 1, Object.defineProperty(No, "__esModule", { value: !0 }), No.JavaScriptTypeBuilder = void 0;
  const e = /* @__PURE__ */ b_(), n = /* @__PURE__ */ fa(), r = /* @__PURE__ */ zs(), i = /* @__PURE__ */ la(), o = /* @__PURE__ */ ya(), t = /* @__PURE__ */ vd(), a = /* @__PURE__ */ ks(), u = /* @__PURE__ */ Gi(), d = /* @__PURE__ */ Gd(), s = /* @__PURE__ */ Ta(), f = /* @__PURE__ */ Zd(), c = /* @__PURE__ */ Hs(), y = /* @__PURE__ */ ep(), w = /* @__PURE__ */ tp(), h = /* @__PURE__ */ Js(), M = /* @__PURE__ */ Qs(), U = /* @__PURE__ */ Zs(), F = /* @__PURE__ */ ip();
  class C extends e.JsonTypeBuilder {
    /** `[JavaScript]` Creates a AsyncIterator type */
    AsyncIterator($, _) {
      return (0, n.AsyncIterator)($, _);
    }
    /** `[JavaScript]` Constructs a type by recursively unwrapping Promise types */
    Awaited($, _) {
      return (0, r.Awaited)($, _);
    }
    /** `[JavaScript]` Creates a BigInt type */
    BigInt($) {
      return (0, i.BigInt)($);
    }
    /** `[JavaScript]` Extracts the ConstructorParameters from the given Constructor type */
    ConstructorParameters($, _) {
      return (0, t.ConstructorParameters)($, _);
    }
    /** `[JavaScript]` Creates a Constructor type */
    Constructor($, _, x) {
      return (0, o.Constructor)($, _, x);
    }
    /** `[JavaScript]` Creates a Date type */
    Date($ = {}) {
      return (0, a.Date)($);
    }
    /** `[JavaScript]` Creates a Function type */
    Function($, _, x) {
      return (0, u.Function)($, _, x);
    }
    /** `[JavaScript]` Extracts the InstanceType from the given Constructor type */
    InstanceType($, _) {
      return (0, d.InstanceType)($, _);
    }
    /** `[JavaScript]` Creates an Iterator type */
    Iterator($, _) {
      return (0, s.Iterator)($, _);
    }
    /** `[JavaScript]` Extracts the Parameters from the given Function type */
    Parameters($, _) {
      return (0, f.Parameters)($, _);
    }
    /** `[JavaScript]` Creates a Promise type */
    Promise($, _) {
      return (0, c.Promise)($, _);
    }
    /** `[JavaScript]` Creates a RegExp type */
    RegExp($, _) {
      return (0, y.RegExp)($, _);
    }
    /** `[JavaScript]` Extracts the ReturnType from the given Function type */
    ReturnType($, _) {
      return (0, w.ReturnType)($, _);
    }
    /** `[JavaScript]` Creates a Symbol type */
    Symbol($) {
      return (0, h.Symbol)($);
    }
    /** `[JavaScript]` Creates a Undefined type */
    Undefined($) {
      return (0, U.Undefined)($);
    }
    /** `[JavaScript]` Creates a Uint8Array type */
    Uint8Array($) {
      return (0, M.Uint8Array)($);
    }
    /** `[JavaScript]` Creates a Void type */
    Void($) {
      return (0, F.Void)($);
    }
  }
  return No.JavaScriptTypeBuilder = C, No;
}
var km;
function WB() {
  return km || (km = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.Type = e.JavaScriptTypeBuilder = e.JsonTypeBuilder = void 0;
    var n = /* @__PURE__ */ b_();
    Object.defineProperty(e, "JsonTypeBuilder", { enumerable: !0, get: function() {
      return n.JsonTypeBuilder;
    } });
    const r = /* @__PURE__ */ GB(), i = /* @__PURE__ */ HB();
    Object.defineProperty(e, "JavaScriptTypeBuilder", { enumerable: !0, get: function() {
      return i.JavaScriptTypeBuilder;
    } });
    const o = r;
    e.Type = o;
  }(bc)), bc;
}
var Ym;
function I_() {
  return Ym || (Ym = 1, function(e) {
    var n = Wr && Wr.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Wr && Wr.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ sB(), e), r(/* @__PURE__ */ jt(), e), r(/* @__PURE__ */ ze(), e), r(/* @__PURE__ */ Hg(), e), r(/* @__PURE__ */ dB(), e), r(/* @__PURE__ */ ma(), e), r(/* @__PURE__ */ To(), e), r(/* @__PURE__ */ Ws(), e), r(/* @__PURE__ */ de(), e), r(/* @__PURE__ */ _a(), e), r(/* @__PURE__ */ pa(), e), r(/* @__PURE__ */ fa(), e), r(/* @__PURE__ */ zs(), e), r(/* @__PURE__ */ la(), e), r(/* @__PURE__ */ Gs(), e), r(/* @__PURE__ */ Ud(), e), r(/* @__PURE__ */ Dd(), e), r(/* @__PURE__ */ ya(), e), r(/* @__PURE__ */ vd(), e), r(/* @__PURE__ */ ks(), e), r(/* @__PURE__ */ Nd(), e), r(/* @__PURE__ */ Ld(), e), r(/* @__PURE__ */ Po(), e), r(/* @__PURE__ */ Vd(), e), r(/* @__PURE__ */ Gi(), e), r(/* @__PURE__ */ tt(), e), r(/* @__PURE__ */ Gd(), e), r(/* @__PURE__ */ Hd(), e), r(/* @__PURE__ */ Nn(), e), r(/* @__PURE__ */ Ta(), e), r(/* @__PURE__ */ Wd(), e), r(/* @__PURE__ */ Yn(), e), r(/* @__PURE__ */ _n(), e), r(/* @__PURE__ */ Yd(), e), r(/* @__PURE__ */ rn(), e), r(/* @__PURE__ */ Tn(), e), r(/* @__PURE__ */ Jd(), e), r(/* @__PURE__ */ Ys(), e), r(/* @__PURE__ */ go(), e), r(/* @__PURE__ */ Cn(), e), r(/* @__PURE__ */ Xs(), e), r(/* @__PURE__ */ xt(), e), r(/* @__PURE__ */ Zd(), e), r(/* @__PURE__ */ nc(), e), r(/* @__PURE__ */ ec(), e), r(/* @__PURE__ */ Hs(), e), r(/* @__PURE__ */ bo(), e), r(/* @__PURE__ */ Qd(), e), r(/* @__PURE__ */ tc(), e), r(/* @__PURE__ */ Xd(), e), r(/* @__PURE__ */ Pt(), e), r(/* @__PURE__ */ ep(), e), r(/* @__PURE__ */ rc(), e), r(/* @__PURE__ */ np(), e), r(/* @__PURE__ */ tp(), e), r(/* @__PURE__ */ NB(), e), r(/* @__PURE__ */ LB(), e), r(/* @__PURE__ */ _o(), e), r(/* @__PURE__ */ Js(), e), r(/* @__PURE__ */ nt(), e), r(/* @__PURE__ */ rp(), e), r(/* @__PURE__ */ Ut(), e), r(/* @__PURE__ */ Qs(), e), r(/* @__PURE__ */ Zs(), e), r(/* @__PURE__ */ Ye(), e), r(/* @__PURE__ */ Io(), e), r(/* @__PURE__ */ Vs(), e), r(/* @__PURE__ */ ip(), e), r(/* @__PURE__ */ WB(), e);
  }(Wr)), Wr;
}
var qo = {}, Jm;
function P_() {
  if (Jm) return qo;
  Jm = 1, Object.defineProperty(qo, "__esModule", { value: !0 }), qo.ValidationException = void 0;
  class e {
    /**
     * @param message Overall error message
     * @param details The individual validation errors
     */
    constructor(r, i = []) {
      this.message = r, this.details = i;
    }
    /**
     * Returns a string representation of the error. Provides the overall
     * error message, followed by the specific error messages, one per line.
     * @returns a string representation of the error.
     */
    toString() {
      let r = this.message;
      if (this.details.length > 0) {
        r.endsWith(":") || (r += ":");
        for (const i of this.details)
          r += `
 * ` + e.errorToString(i);
      }
      return r;
    }
    /**
     * Returns a string representation of a validation error, which precedes
     * the error with its reference path if it occurs in an object.
     */
    static errorToString(r) {
      return r.path != "" ? `${r.path.substring(1)} - ${r.message}` : r.message;
    }
  }
  return qo.ValidationException = e, qo;
}
var Zm;
function Ao() {
  return Zm || (Zm = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.throwInvalidValidate = e.throwInvalidAssert = e.createUnionTypeErrorIterable = e.createUnionTypeError = e.createErrorsIterable = e.adjustErrorMessage = e.DEFAULT_UNKNOWN_TYPE_MESSAGE = e.DEFAULT_OVERALL_MESSAGE = void 0;
    const n = /* @__PURE__ */ I_(), r = /* @__PURE__ */ Dt(), i = P_();
    e.DEFAULT_OVERALL_MESSAGE = "Invalid value", e.DEFAULT_UNKNOWN_TYPE_MESSAGE = "Object type not recognized";
    const o = "Expected required property";
    function t(c) {
      return c.schema.errorMessage !== void 0 && (c.message = c.schema.errorMessage), c;
    }
    e.adjustErrorMessage = t;
    function a(c) {
      return {
        [Symbol.iterator]: function* () {
          const y = c[Symbol.iterator]();
          let w = y.next(), h = "???";
          for (; w.value !== void 0; ) {
            const M = w.value, U = M.message;
            M.path !== h && (t(M), M.message != U ? (h = M.path, yield M) : (
              // drop 'required' errors for values that have constraints
              (M.message != o || ["Any", "Unknown"].includes(M.schema[n.Kind])) && (yield M)
            )), w = y.next();
          }
        }
      };
    }
    e.createErrorsIterable = a;
    function u(c, y) {
      var w;
      return {
        type: r.ValueErrorType.Union,
        path: "",
        schema: c,
        value: y,
        message: (w = c.errorMessage) !== null && w !== void 0 ? w : e.DEFAULT_UNKNOWN_TYPE_MESSAGE
      };
    }
    e.createUnionTypeError = u;
    function d(c) {
      return {
        [Symbol.iterator]: function* () {
          yield c;
        }
      };
    }
    e.createUnionTypeErrorIterable = d;
    function s(c, y) {
      throw t(y), new i.ValidationException(c === void 0 ? e.DEFAULT_OVERALL_MESSAGE : c.replace("{error}", i.ValidationException.errorToString(y)), [y]);
    }
    e.throwInvalidAssert = s;
    function f(c, y) {
      throw new i.ValidationException(c ?? e.DEFAULT_OVERALL_MESSAGE, y instanceof r.ValueErrorIterator ? [...a(y)] : [y]);
    }
    e.throwInvalidValidate = f;
  }(mc)), mc;
}
var Qm;
function op() {
  if (Qm) return Bo;
  Qm = 1, Object.defineProperty(Bo, "__esModule", { value: !0 }), Bo.AbstractValidator = void 0;
  const e = /* @__PURE__ */ Ia(), n = Ao();
  class r {
    /**
     * @param schema JSON schema against which to validate values. When a schema
     *  provides an `errorMessage` string option, all errors occurring for that
     *  schema (but not for nested schemas) collapse into a single error having
     *  this message. The `errorMessage` option allows you to provide a custom
     *  error message for a schema. For example, an `errorMessage` on a schema
     *  for a property of an object replaces TypeBox's built-in error messages
     *  for errors that occur on that property.
     */
    constructor(o) {
      this.schema = o;
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
    testReturningErrors(o) {
      return this.test(o) ? null : this.errors(o);
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
    testReturningFirstError(o) {
      const t = this.testReturningErrors(o);
      if (t === null)
        return null;
      const a = t[Symbol.iterator]().next();
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
    firstError(o) {
      const a = this.errors(o)[Symbol.iterator]().next();
      return a.done ? null : a.value;
    }
    cleanCopyOfValue(o, t) {
      if (o.type === "object" && typeof t == "object") {
        const a = {};
        return Object.keys(o.properties).forEach((u) => {
          a[u] = t[u];
        }), a;
      }
      return t;
    }
    cleanValue(o, t) {
      if (o.type === "object" && typeof t == "object") {
        const a = Object.keys(o.properties);
        Object.getOwnPropertyNames(t).forEach((u) => {
          a.includes(u) || delete t[u];
        });
      }
    }
    uncompiledAssert(o, t, a) {
      e.Value.Check(o, t) || (0, n.throwInvalidAssert)(a, e.Value.Errors(o, t).First());
    }
    uncompiledValidate(o, t, a) {
      e.Value.Check(o, t) || (0, n.throwInvalidValidate)(a, e.Value.Errors(o, t));
    }
  }
  return Bo.AbstractValidator = r, Bo;
}
var Lo = {}, Xm;
function ap() {
  if (Xm) return Lo;
  Xm = 1, Object.defineProperty(Lo, "__esModule", { value: !0 }), Lo.AbstractStandardValidator = void 0;
  const e = op();
  class n extends e.AbstractValidator {
    /** @inheritdoc */
    constructor(i) {
      super(i);
    }
    /** @inheritdoc */
    assertAndClean(i, o) {
      this.assert(i, o), this.cleanValue(this.schema, i);
    }
    /** @inheritdoc */
    assertAndCleanCopy(i, o) {
      return this.assert(i, o), this.cleanCopyOfValue(this.schema, i);
    }
    /** @inheritdoc */
    validateAndClean(i, o) {
      this.validate(i, o), this.cleanValue(this.schema, i);
    }
    /** @inheritdoc */
    validateAndCleanCopy(i, o) {
      return this.validate(i, o), this.cleanCopyOfValue(this.schema, i);
    }
  }
  return Lo.AbstractStandardValidator = n, Lo;
}
var hi = {}, eT;
function Pa() {
  if (eT) return hi;
  eT = 1, Object.defineProperty(hi, "__esModule", { value: !0 }), hi.AbstractTypedUnionValidator = hi.DEFAULT_DISCRIMINANT_KEY = void 0;
  const e = op();
  hi.DEFAULT_DISCRIMINANT_KEY = "kind";
  class n extends e.AbstractValidator {
    constructor(i) {
      super(i);
    }
    /** @inheritdoc */
    assert(i, o) {
      this.assertReturningSchema(i, o);
    }
    /** @inheritdoc */
    assertAndClean(i, o) {
      const t = this.assertReturningSchema(i, o);
      this.cleanValue(t, i);
    }
    /** @inheritdoc */
    assertAndCleanCopy(i, o) {
      const t = this.assertReturningSchema(i, o);
      return this.cleanCopyOfValue(t, i);
    }
    /** @inheritdoc */
    validate(i, o) {
      this.validateReturningSchema(i, o);
    }
    /** @inheritdoc */
    validateAndClean(i, o) {
      const t = this.validateReturningSchema(i, o);
      this.cleanValue(t, i);
    }
    /** @inheritdoc */
    validateAndCleanCopy(i, o) {
      const t = this.validateReturningSchema(i, o);
      return this.cleanCopyOfValue(t, i);
    }
    toValueKeyDereference(i) {
      return /^[a-zA-Z_$][a-zA-Z_$0-9]*$/.test(i) ? `value.${i}` : `value['${i.replace(/'/g, "\\'")}']`;
    }
  }
  return hi.AbstractTypedUnionValidator = n, hi;
}
var Bi = {}, Ko = {}, nT;
function zB() {
  if (nT) return Ko;
  nT = 1, Object.defineProperty(Ko, "__esModule", { value: !0 }), Ko.StandardValidator = void 0;
  const e = ap(), n = /* @__PURE__ */ Ia(), r = Ao();
  class i extends e.AbstractStandardValidator {
    /** @inheritdoc */
    constructor(t) {
      super(t);
    }
    /** @inheritdoc */
    test(t) {
      return n.Value.Check(this.schema, t);
    }
    /** @inheritdoc */
    assert(t, a) {
      this.uncompiledAssert(this.schema, t, a);
    }
    /** @inheritdoc */
    validate(t, a) {
      this.uncompiledValidate(this.schema, t, a);
    }
    /** @inheritdoc */
    errors(t) {
      return (0, r.createErrorsIterable)(n.Value.Errors(this.schema, t));
    }
  }
  return Ko.StandardValidator = i, Ko;
}
var st = {}, Mi = {}, $n = {}, tT;
function kB() {
  if (tT) return $n;
  tT = 1, Object.defineProperty($n, "__esModule", { value: !0 }), $n.TypeCompiler = $n.Policy = $n.TypeCompilerTypeGuardError = $n.TypeCompilerUnknownTypeError = $n.TypeCheck = void 0;
  const e = /* @__PURE__ */ ba(), n = /* @__PURE__ */ Dt(), r = /* @__PURE__ */ Od(), i = /* @__PURE__ */ ze(), o = /* @__PURE__ */ Jn(), t = /* @__PURE__ */ ga(), a = /* @__PURE__ */ de(), u = /* @__PURE__ */ To(), d = /* @__PURE__ */ Yn(), s = /* @__PURE__ */ Bd(), f = /* @__PURE__ */ Tn(), c = /* @__PURE__ */ Pt(), y = /* @__PURE__ */ tn(), w = /* @__PURE__ */ Gg();
  class h {
    constructor(P, R, l, B) {
      this.schema = P, this.references = R, this.checkFunc = l, this.code = B, this.hasTransform = (0, e.HasTransform)(P, R);
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
  $n.TypeCheck = h;
  var M;
  (function(T) {
    function P(S) {
      return S === 36;
    }
    T.DollarSign = P;
    function R(S) {
      return S === 95;
    }
    T.IsUnderscore = R;
    function l(S) {
      return S >= 65 && S <= 90 || S >= 97 && S <= 122;
    }
    T.IsAlpha = l;
    function B(S) {
      return S >= 48 && S <= 57;
    }
    T.IsNumeric = B;
  })(M || (M = {}));
  var U;
  (function(T) {
    function P(S) {
      return S.length === 0 ? !1 : M.IsNumeric(S.charCodeAt(0));
    }
    function R(S) {
      if (P(S))
        return !1;
      for (let q = 0; q < S.length; q++) {
        const V = S.charCodeAt(q);
        if (!(M.IsAlpha(V) || M.IsNumeric(V) || M.DollarSign(V) || M.IsUnderscore(V)))
          return !1;
      }
      return !0;
    }
    function l(S) {
      return S.replace(/'/g, "\\'");
    }
    function B(S, q) {
      return R(q) ? `${S}.${q}` : `${S}['${l(q)}']`;
    }
    T.Encode = B;
  })(U || (U = {}));
  var F;
  (function(T) {
    function P(R) {
      const l = [];
      for (let B = 0; B < R.length; B++) {
        const S = R.charCodeAt(B);
        M.IsNumeric(S) || M.IsAlpha(S) ? l.push(R.charAt(B)) : l.push(`_${S}_`);
      }
      return l.join("").replace(/__/g, "_");
    }
    T.Encode = P;
  })(F || (F = {}));
  var C;
  (function(T) {
    function P(R) {
      return R.replace(/'/g, "\\'");
    }
    T.Escape = P;
  })(C || (C = {}));
  class G extends i.TypeBoxError {
    constructor(P) {
      super("Unknown type"), this.schema = P;
    }
  }
  $n.TypeCompilerUnknownTypeError = G;
  class $ extends i.TypeBoxError {
    constructor(P) {
      super("Preflight validation check failed to guard for the given schema"), this.schema = P;
    }
  }
  $n.TypeCompilerTypeGuardError = $;
  var _;
  (function(T) {
    function P(q, V, k) {
      return r.TypeSystemPolicy.ExactOptionalPropertyTypes ? `('${V}' in ${q} ? ${k} : true)` : `(${U.Encode(q, V)} !== undefined ? ${k} : true)`;
    }
    T.IsExactOptionalProperty = P;
    function R(q) {
      return r.TypeSystemPolicy.AllowArrayObject ? `(typeof ${q} === 'object' && ${q} !== null)` : `(typeof ${q} === 'object' && ${q} !== null && !Array.isArray(${q}))`;
    }
    T.IsObjectLike = R;
    function l(q) {
      return r.TypeSystemPolicy.AllowArrayObject ? `(typeof ${q} === 'object' && ${q} !== null && !(${q} instanceof Date) && !(${q} instanceof Uint8Array))` : `(typeof ${q} === 'object' && ${q} !== null && !Array.isArray(${q}) && !(${q} instanceof Date) && !(${q} instanceof Uint8Array))`;
    }
    T.IsRecordLike = l;
    function B(q) {
      return r.TypeSystemPolicy.AllowNaN ? `typeof ${q} === 'number'` : `Number.isFinite(${q})`;
    }
    T.IsNumberLike = B;
    function S(q) {
      return r.TypeSystemPolicy.AllowNullVoid ? `(${q} === undefined || ${q} === null)` : `${q} === undefined`;
    }
    T.IsVoidLike = S;
  })(_ || ($n.Policy = _ = {}));
  var x;
  return function(T) {
    function P(v) {
      return v[a.Kind] === "Any" || v[a.Kind] === "Unknown";
    }
    function* R(v, ae, K) {
      yield "true";
    }
    function* l(v, ae, K) {
      yield `Array.isArray(${K})`;
      const [Te, ce] = [b("value", "any"), b("acc", "number")];
      (0, y.IsNumber)(v.maxItems) && (yield `${K}.length <= ${v.maxItems}`), (0, y.IsNumber)(v.minItems) && (yield `${K}.length >= ${v.minItems}`);
      const pe = oe(v.items, ae, "value");
      if (yield `${K}.every((${Te}) => ${pe})`, (0, w.IsSchema)(v.contains) || (0, y.IsNumber)(v.minContains) || (0, y.IsNumber)(v.maxContains)) {
        const qe = (0, w.IsSchema)(v.contains) ? v.contains : (0, f.Never)(), _e = oe(qe, ae, "value"), Ln = (0, y.IsNumber)(v.minContains) ? [`(count >= ${v.minContains})`] : [], I = (0, y.IsNumber)(v.maxContains) ? [`(count <= ${v.maxContains})`] : [], O = `const count = value.reduce((${ce}, ${Te}) => ${_e} ? acc + 1 : acc, 0)`, Oe = ["(count > 0)", ...Ln, ...I].join(" && ");
        yield `((${Te}) => { ${O}; return ${Oe}})(${K})`;
      }
      v.uniqueItems === !0 && (yield `((${Te}) => { const set = new Set(); for(const element of value) { const hashed = hash(element); if(set.has(hashed)) { return false } else { set.add(hashed) } } return true } )(${K})`);
    }
    function* B(v, ae, K) {
      yield `(typeof value === 'object' && Symbol.asyncIterator in ${K})`;
    }
    function* S(v, ae, K) {
      yield `(typeof ${K} === 'bigint')`, (0, y.IsBigInt)(v.exclusiveMaximum) && (yield `${K} < BigInt(${v.exclusiveMaximum})`), (0, y.IsBigInt)(v.exclusiveMinimum) && (yield `${K} > BigInt(${v.exclusiveMinimum})`), (0, y.IsBigInt)(v.maximum) && (yield `${K} <= BigInt(${v.maximum})`), (0, y.IsBigInt)(v.minimum) && (yield `${K} >= BigInt(${v.minimum})`), (0, y.IsBigInt)(v.multipleOf) && (yield `(${K} % BigInt(${v.multipleOf})) === 0`);
    }
    function* q(v, ae, K) {
      yield `(typeof ${K} === 'boolean')`;
    }
    function* V(v, ae, K) {
      yield* te(v.returns, ae, `${K}.prototype`);
    }
    function* k(v, ae, K) {
      yield `(${K} instanceof Date) && Number.isFinite(${K}.getTime())`, (0, y.IsNumber)(v.exclusiveMaximumTimestamp) && (yield `${K}.getTime() < ${v.exclusiveMaximumTimestamp}`), (0, y.IsNumber)(v.exclusiveMinimumTimestamp) && (yield `${K}.getTime() > ${v.exclusiveMinimumTimestamp}`), (0, y.IsNumber)(v.maximumTimestamp) && (yield `${K}.getTime() <= ${v.maximumTimestamp}`), (0, y.IsNumber)(v.minimumTimestamp) && (yield `${K}.getTime() >= ${v.minimumTimestamp}`), (0, y.IsNumber)(v.multipleOfTimestamp) && (yield `(${K}.getTime() % ${v.multipleOfTimestamp}) === 0`);
    }
    function* ne(v, ae, K) {
      yield `(typeof ${K} === 'function')`;
    }
    function* re(v, ae, K) {
      const Te = globalThis.Object.getOwnPropertyNames(v.$defs).reduce((ce, pe) => [...ce, v.$defs[pe]], []);
      yield* te((0, c.Ref)(v.$ref), [...ae, ...Te], K);
    }
    function* W(v, ae, K) {
      yield `Number.isInteger(${K})`, (0, y.IsNumber)(v.exclusiveMaximum) && (yield `${K} < ${v.exclusiveMaximum}`), (0, y.IsNumber)(v.exclusiveMinimum) && (yield `${K} > ${v.exclusiveMinimum}`), (0, y.IsNumber)(v.maximum) && (yield `${K} <= ${v.maximum}`), (0, y.IsNumber)(v.minimum) && (yield `${K} >= ${v.minimum}`), (0, y.IsNumber)(v.multipleOf) && (yield `(${K} % ${v.multipleOf}) === 0`);
    }
    function* we(v, ae, K) {
      const Te = v.allOf.map((ce) => oe(ce, ae, K)).join(" && ");
      if (v.unevaluatedProperties === !1) {
        const ce = Ue(`${new RegExp((0, d.KeyOfPattern)(v))};`), pe = `Object.getOwnPropertyNames(${K}).every(key => ${ce}.test(key))`;
        yield `(${Te} && ${pe})`;
      } else if ((0, w.IsSchema)(v.unevaluatedProperties)) {
        const ce = Ue(`${new RegExp((0, d.KeyOfPattern)(v))};`), pe = `Object.getOwnPropertyNames(${K}).every(key => ${ce}.test(key) || ${oe(v.unevaluatedProperties, ae, `${K}[key]`)})`;
        yield `(${Te} && ${pe})`;
      } else
        yield `(${Te})`;
    }
    function* xe(v, ae, K) {
      yield `(typeof value === 'object' && Symbol.iterator in ${K})`;
    }
    function* Le(v, ae, K) {
      typeof v.const == "number" || typeof v.const == "boolean" ? yield `(${K} === ${v.const})` : yield `(${K} === '${C.Escape(v.const)}')`;
    }
    function* Ne(v, ae, K) {
      yield "false";
    }
    function* Ke(v, ae, K) {
      yield `(!${oe(v.not, ae, K)})`;
    }
    function* Re(v, ae, K) {
      yield `(${K} === null)`;
    }
    function* Ge(v, ae, K) {
      yield _.IsNumberLike(K), (0, y.IsNumber)(v.exclusiveMaximum) && (yield `${K} < ${v.exclusiveMaximum}`), (0, y.IsNumber)(v.exclusiveMinimum) && (yield `${K} > ${v.exclusiveMinimum}`), (0, y.IsNumber)(v.maximum) && (yield `${K} <= ${v.maximum}`), (0, y.IsNumber)(v.minimum) && (yield `${K} >= ${v.minimum}`), (0, y.IsNumber)(v.multipleOf) && (yield `(${K} % ${v.multipleOf}) === 0`);
    }
    function* Q(v, ae, K) {
      yield _.IsObjectLike(K), (0, y.IsNumber)(v.minProperties) && (yield `Object.getOwnPropertyNames(${K}).length >= ${v.minProperties}`), (0, y.IsNumber)(v.maxProperties) && (yield `Object.getOwnPropertyNames(${K}).length <= ${v.maxProperties}`);
      const Te = Object.getOwnPropertyNames(v.properties);
      for (const ce of Te) {
        const pe = U.Encode(K, ce), qe = v.properties[ce];
        if (v.required && v.required.includes(ce))
          yield* te(qe, ae, pe), ((0, s.ExtendsUndefinedCheck)(qe) || P(qe)) && (yield `('${ce}' in ${K})`);
        else {
          const _e = oe(qe, ae, pe);
          yield _.IsExactOptionalProperty(K, ce, _e);
        }
      }
      if (v.additionalProperties === !1)
        if (v.required && v.required.length === Te.length)
          yield `Object.getOwnPropertyNames(${K}).length === ${Te.length}`;
        else {
          const ce = `[${Te.map((pe) => `'${pe}'`).join(", ")}]`;
          yield `Object.getOwnPropertyNames(${K}).every(key => ${ce}.includes(key))`;
        }
      if (typeof v.additionalProperties == "object") {
        const ce = oe(v.additionalProperties, ae, `${K}[key]`), pe = `[${Te.map((qe) => `'${qe}'`).join(", ")}]`;
        yield `(Object.getOwnPropertyNames(${K}).every(key => ${pe}.includes(key) || ${ce}))`;
      }
    }
    function* ee(v, ae, K) {
      yield `(typeof value === 'object' && typeof ${K}.then === 'function')`;
    }
    function* Ie(v, ae, K) {
      yield _.IsRecordLike(K), (0, y.IsNumber)(v.minProperties) && (yield `Object.getOwnPropertyNames(${K}).length >= ${v.minProperties}`), (0, y.IsNumber)(v.maxProperties) && (yield `Object.getOwnPropertyNames(${K}).length <= ${v.maxProperties}`);
      const [Te, ce] = Object.entries(v.patternProperties)[0], pe = Ue(`${new RegExp(Te)}`), qe = oe(ce, ae, "value"), _e = (0, w.IsSchema)(v.additionalProperties) ? oe(v.additionalProperties, ae, K) : v.additionalProperties === !1 ? "false" : "true", Ln = `(${pe}.test(key) ? ${qe} : ${_e})`;
      yield `(Object.entries(${K}).every(([key, value]) => ${Ln}))`;
    }
    function* Ae(v, ae, K) {
      const Te = (0, o.Deref)(v, ae);
      if (fe.functions.has(v.$ref))
        return yield `${be(v.$ref)}(${K})`;
      yield* te(Te, ae, K);
    }
    function* X(v, ae, K) {
      const Te = Ue(`${new RegExp(v.source, v.flags)};`);
      yield `(typeof ${K} === 'string')`, (0, y.IsNumber)(v.maxLength) && (yield `${K}.length <= ${v.maxLength}`), (0, y.IsNumber)(v.minLength) && (yield `${K}.length >= ${v.minLength}`), yield `${Te}.test(${K})`;
    }
    function* J(v, ae, K) {
      yield `(typeof ${K} === 'string')`, (0, y.IsNumber)(v.maxLength) && (yield `${K}.length <= ${v.maxLength}`), (0, y.IsNumber)(v.minLength) && (yield `${K}.length >= ${v.minLength}`), v.pattern !== void 0 && (yield `${Ue(`${new RegExp(v.pattern)};`)}.test(${K})`), v.format !== void 0 && (yield `format('${v.format}', ${K})`);
    }
    function* D(v, ae, K) {
      yield `(typeof ${K} === 'symbol')`;
    }
    function* m(v, ae, K) {
      yield `(typeof ${K} === 'string')`, yield `${Ue(`${new RegExp(v.pattern)};`)}.test(${K})`;
    }
    function* g(v, ae, K) {
      yield `${be(v.$ref)}(${K})`;
    }
    function* E(v, ae, K) {
      if (yield `Array.isArray(${K})`, v.items === void 0)
        return yield `${K}.length === 0`;
      yield `(${K}.length === ${v.maxItems})`;
      for (let Te = 0; Te < v.items.length; Te++)
        yield `${oe(v.items[Te], ae, `${K}[${Te}]`)}`;
    }
    function* H(v, ae, K) {
      yield `${K} === undefined`;
    }
    function* p(v, ae, K) {
      yield `(${v.anyOf.map((ce) => oe(ce, ae, K)).join(" || ")})`;
    }
    function* Z(v, ae, K) {
      yield `${K} instanceof Uint8Array`, (0, y.IsNumber)(v.maxByteLength) && (yield `(${K}.length <= ${v.maxByteLength})`), (0, y.IsNumber)(v.minByteLength) && (yield `(${K}.length >= ${v.minByteLength})`);
    }
    function* L(v, ae, K) {
      yield "true";
    }
    function* j(v, ae, K) {
      yield _.IsVoidLike(K);
    }
    function* se(v, ae, K) {
      const Te = fe.instances.size;
      fe.instances.set(Te, v), yield `kind('${v[a.Kind]}', ${Te}, ${K})`;
    }
    function* te(v, ae, K, Te = !0) {
      const ce = (0, y.IsString)(v.$id) ? [...ae, v] : ae, pe = v;
      if (Te && (0, y.IsString)(v.$id)) {
        const qe = be(v.$id);
        if (fe.functions.has(qe))
          return yield `${qe}(${K})`;
        {
          fe.functions.set(qe, "<deferred>");
          const _e = Me(qe, v, ae, "value", !1);
          return fe.functions.set(qe, _e), yield `${qe}(${K})`;
        }
      }
      switch (pe[a.Kind]) {
        case "Any":
          return yield* R();
        case "Array":
          return yield* l(pe, ce, K);
        case "AsyncIterator":
          return yield* B(pe, ce, K);
        case "BigInt":
          return yield* S(pe, ce, K);
        case "Boolean":
          return yield* q(pe, ce, K);
        case "Constructor":
          return yield* V(pe, ce, K);
        case "Date":
          return yield* k(pe, ce, K);
        case "Function":
          return yield* ne(pe, ce, K);
        case "Import":
          return yield* re(pe, ce, K);
        case "Integer":
          return yield* W(pe, ce, K);
        case "Intersect":
          return yield* we(pe, ce, K);
        case "Iterator":
          return yield* xe(pe, ce, K);
        case "Literal":
          return yield* Le(pe, ce, K);
        case "Never":
          return yield* Ne();
        case "Not":
          return yield* Ke(pe, ce, K);
        case "Null":
          return yield* Re(pe, ce, K);
        case "Number":
          return yield* Ge(pe, ce, K);
        case "Object":
          return yield* Q(pe, ce, K);
        case "Promise":
          return yield* ee(pe, ce, K);
        case "Record":
          return yield* Ie(pe, ce, K);
        case "Ref":
          return yield* Ae(pe, ce, K);
        case "RegExp":
          return yield* X(pe, ce, K);
        case "String":
          return yield* J(pe, ce, K);
        case "Symbol":
          return yield* D(pe, ce, K);
        case "TemplateLiteral":
          return yield* m(pe, ce, K);
        case "This":
          return yield* g(pe, ce, K);
        case "Tuple":
          return yield* E(pe, ce, K);
        case "Undefined":
          return yield* H(pe, ce, K);
        case "Union":
          return yield* p(pe, ce, K);
        case "Uint8Array":
          return yield* Z(pe, ce, K);
        case "Unknown":
          return yield* L();
        case "Void":
          return yield* j(pe, ce, K);
        default:
          if (!u.TypeRegistry.Has(pe[a.Kind]))
            throw new G(v);
          return yield* se(pe, ce, K);
      }
    }
    const fe = {
      language: "javascript",
      // target language
      functions: /* @__PURE__ */ new Map(),
      // local functions
      variables: /* @__PURE__ */ new Map(),
      // local variables
      instances: /* @__PURE__ */ new Map()
      // exterior kind instances
    };
    function oe(v, ae, K, Te = !0) {
      return `(${[...te(v, ae, K, Te)].join(" && ")})`;
    }
    function be(v) {
      return `check_${F.Encode(v)}`;
    }
    function Ue(v) {
      const ae = `local_${fe.variables.size}`;
      return fe.variables.set(ae, `const ${ae} = ${v}`), ae;
    }
    function Me(v, ae, K, Te, ce = !0) {
      const [pe, qe] = [`
`, (O) => "".padStart(O, " ")], _e = b("value", "any"), Ln = Pe("boolean"), I = [...te(ae, K, Te, ce)].map((O) => `${qe(4)}${O}`).join(` &&${pe}`);
      return `function ${v}(${_e})${Ln} {${pe}${qe(2)}return (${pe}${I}${pe}${qe(2)})
}`;
    }
    function b(v, ae) {
      const K = fe.language === "typescript" ? `: ${ae}` : "";
      return `${v}${K}`;
    }
    function Pe(v) {
      return fe.language === "typescript" ? `: ${v}` : "";
    }
    function an(v, ae, K) {
      const Te = Me("check", v, ae, "value"), ce = b("value", "any"), pe = Pe("boolean"), qe = [...fe.functions.values()], _e = [...fe.variables.values()], Ln = (0, y.IsString)(v.$id) ? `return function check(${ce})${pe} {
  return ${be(v.$id)}(value)
}` : `return ${Te}`;
      return [..._e, ...qe, Ln].join(`
`);
    }
    function Aa(...v) {
      const ae = { language: "javascript" }, [K, Te, ce] = v.length === 2 && (0, y.IsArray)(v[1]) ? [v[0], v[1], ae] : v.length === 2 && !(0, y.IsArray)(v[1]) ? [v[0], [], v[1]] : v.length === 3 ? [v[0], v[1], v[2]] : v.length === 1 ? [v[0], [], ae] : [null, [], ae];
      if (fe.language = ce.language, fe.variables.clear(), fe.functions.clear(), fe.instances.clear(), !(0, w.IsSchema)(K))
        throw new $(K);
      for (const pe of Te)
        if (!(0, w.IsSchema)(pe))
          throw new $(pe);
      return an(K, Te);
    }
    T.Code = Aa;
    function ac(v, ae = []) {
      const K = Aa(v, ae, { language: "javascript" }), Te = globalThis.Function("kind", "format", "hash", K), ce = new Map(fe.instances);
      function pe(I, O, Oe) {
        if (!u.TypeRegistry.Has(I) || !ce.has(O))
          return !1;
        const gn = u.TypeRegistry.Get(I), uc = ce.get(O);
        return gn(uc, Oe);
      }
      function qe(I, O) {
        return u.FormatRegistry.Has(I) ? u.FormatRegistry.Get(I)(O) : !1;
      }
      function _e(I) {
        return (0, t.Hash)(I);
      }
      const Ln = Te(pe, qe, _e);
      return new h(v, ae, Ln, K);
    }
    T.Compile = ac;
  }(x || ($n.TypeCompiler = x = {})), $n;
}
var rT;
function O_() {
  return rT || (rT = 1, function(e) {
    var n = Mi && Mi.__createBinding || (Object.create ? function(o, t, a, u) {
      u === void 0 && (u = a);
      var d = Object.getOwnPropertyDescriptor(t, a);
      (!d || ("get" in d ? !t.__esModule : d.writable || d.configurable)) && (d = { enumerable: !0, get: function() {
        return t[a];
      } }), Object.defineProperty(o, u, d);
    } : function(o, t, a, u) {
      u === void 0 && (u = a), o[u] = t[a];
    }), r = Mi && Mi.__exportStar || function(o, t) {
      for (var a in o) a !== "default" && !Object.prototype.hasOwnProperty.call(t, a) && n(t, o, a);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueErrorIterator = e.ValueErrorType = void 0;
    var i = /* @__PURE__ */ Dt();
    Object.defineProperty(e, "ValueErrorType", { enumerable: !0, get: function() {
      return i.ValueErrorType;
    } }), Object.defineProperty(e, "ValueErrorIterator", { enumerable: !0, get: function() {
      return i.ValueErrorIterator;
    } }), r(/* @__PURE__ */ kB(), e);
  }(Mi)), Mi;
}
var iT;
function YB() {
  if (iT) return st;
  iT = 1;
  var e = st && st.__classPrivateFieldGet || function(u, d, s, f) {
    if (s === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof d == "function" ? u !== d || !f : !d.has(u)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return s === "m" ? f : s === "a" ? f.call(u) : f ? f.value : d.get(u);
  }, n = st && st.__classPrivateFieldSet || function(u, d, s, f, c) {
    if (f === "m") throw new TypeError("Private method is not writable");
    if (f === "a" && !c) throw new TypeError("Private accessor was defined without a setter");
    if (typeof d == "function" ? u !== d || !c : !d.has(u)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return f === "a" ? c.call(u, s) : c ? c.value = s : d.set(u, s), s;
  }, r;
  Object.defineProperty(st, "__esModule", { value: !0 }), st.CompilingStandardValidator = void 0;
  const i = /* @__PURE__ */ O_(), o = ap(), t = Ao();
  class a extends o.AbstractStandardValidator {
    /** @inheritdoc */
    constructor(d) {
      super(d), r.set(this, void 0);
    }
    /** @inheritdoc */
    test(d) {
      return this.getCompiledType().Check(d);
    }
    /** @inheritdoc */
    assert(d, s) {
      const f = this.getCompiledType();
      f.Check(d) || (0, t.throwInvalidAssert)(s, f.Errors(d).First());
    }
    /** @inheritdoc */
    validate(d, s) {
      const f = this.getCompiledType();
      f.Check(d) || (0, t.throwInvalidValidate)(s, f.Errors(d));
    }
    /** @inheritdoc */
    errors(d) {
      const s = this.getCompiledType();
      return (0, t.createErrorsIterable)(s.Errors(d));
    }
    getCompiledType() {
      return e(this, r, "f") === void 0 && n(this, r, i.TypeCompiler.Compile(this.schema), "f"), e(this, r, "f");
    }
  }
  return st.CompilingStandardValidator = a, r = /* @__PURE__ */ new WeakMap(), st;
}
var oT;
function JB() {
  return oT || (oT = 1, function(e) {
    var n = Bi && Bi.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Bi && Bi.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(zB(), e), r(YB(), e);
  }(Bi)), Bi;
}
var Si = {}, ct = {}, Pc = {}, aT;
function A_() {
  return aT || (aT = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.TypeIdentifyingKeyIndex = e.MESSAGE_MEMBERS_MISSING_KEY = e.MESSAGE_MULTIPLE_MEMBERS_WITH_SAME_KEY = e.MESSAGE_MEMBER_WITH_MULTIPLE_KEYS = e.MESSAGE_OPTIONAL_TYPE_ID_KEY = void 0;
    const n = /* @__PURE__ */ I_();
    e.MESSAGE_OPTIONAL_TYPE_ID_KEY = "Type identifying key cannot be optional", e.MESSAGE_MEMBER_WITH_MULTIPLE_KEYS = "Union has member with multiple identifying keys", e.MESSAGE_MULTIPLE_MEMBERS_WITH_SAME_KEY = "Union has multiple members with same identifying key", e.MESSAGE_MEMBERS_MISSING_KEY = "Union has members missing identifying keys";
    class r {
      constructor(o) {
        this.schema = o;
      }
      cacheKeys() {
        const o = this.schema.anyOf.length, t = /* @__PURE__ */ new Set();
        this.keyByMemberIndex = new Array(o);
        for (let a = 0; a < o; ++a) {
          const u = this.schema.anyOf[a];
          for (const [d, s] of Object.entries(u.properties))
            if (s.typeIdentifyingKey) {
              if (s[n.Optional] == "Optional")
                throw Error(e.MESSAGE_OPTIONAL_TYPE_ID_KEY);
              if (this.keyByMemberIndex[a] !== void 0)
                throw Error(e.MESSAGE_MEMBER_WITH_MULTIPLE_KEYS);
              if (t.has(d))
                throw Error(e.MESSAGE_MULTIPLE_MEMBERS_WITH_SAME_KEY);
              this.keyByMemberIndex[a] = d, t.add(d);
            }
        }
        if (t.size < o)
          throw this.keyByMemberIndex = void 0, Error(e.MESSAGE_MEMBERS_MISSING_KEY);
      }
    }
    e.TypeIdentifyingKeyIndex = r;
  }(Pc)), Pc;
}
var uT;
function ZB() {
  if (uT) return ct;
  uT = 1;
  var e = ct && ct.__classPrivateFieldSet || function(d, s, f, c, y) {
    if (c === "m") throw new TypeError("Private method is not writable");
    if (c === "a" && !y) throw new TypeError("Private accessor was defined without a setter");
    if (typeof s == "function" ? d !== s || !y : !s.has(d)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return c === "a" ? y.call(d, f) : y ? y.value = f : s.set(d, f), f;
  }, n = ct && ct.__classPrivateFieldGet || function(d, s, f, c) {
    if (f === "a" && !c) throw new TypeError("Private accessor was defined without a getter");
    if (typeof s == "function" ? d !== s || !c : !s.has(d)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return f === "m" ? c : f === "a" ? c.call(d) : c ? c.value : s.get(d);
  }, r;
  Object.defineProperty(ct, "__esModule", { value: !0 }), ct.HeterogeneousUnionValidator = void 0;
  const i = /* @__PURE__ */ Ia(), o = Pa(), t = Ao(), a = A_();
  class u extends o.AbstractTypedUnionValidator {
    /** @inheritdoc */
    constructor(s) {
      super(s), r.set(this, void 0), e(this, r, new a.TypeIdentifyingKeyIndex(s), "f");
    }
    /** @inheritdoc */
    test(s) {
      const f = this.findSchemaMemberIndex(s);
      return typeof f != "number" ? !1 : i.Value.Check(this.schema.anyOf[f], s);
    }
    /** @inheritdoc */
    errors(s) {
      const f = this.findSchemaMemberIndex(s);
      if (typeof f != "number")
        return (0, t.createUnionTypeErrorIterable)(f);
      const c = this.schema.anyOf[f];
      return (0, t.createErrorsIterable)(i.Value.Errors(c, s));
    }
    assertReturningSchema(s, f) {
      const c = this.findSchemaMemberIndex(s);
      typeof c != "number" && (0, t.throwInvalidAssert)(f, c);
      const y = this.schema.anyOf[c];
      return this.uncompiledAssert(y, s, f), y;
    }
    validateReturningSchema(s, f) {
      const c = this.findSchemaMemberIndex(s);
      typeof c != "number" && (0, t.throwInvalidValidate)(f, c);
      const y = this.schema.anyOf[c];
      return this.uncompiledValidate(y, s, f), y;
    }
    findSchemaMemberIndex(s) {
      if (n(this, r, "f").keyByMemberIndex === void 0 && n(this, r, "f").cacheKeys(), typeof s == "object" && s !== null)
        for (let f = 0; f < this.schema.anyOf.length; ++f) {
          const c = n(this, r, "f").keyByMemberIndex[f];
          if (s[c] !== void 0)
            return f;
        }
      return (0, t.createUnionTypeError)(this.schema, s);
    }
  }
  return ct.HeterogeneousUnionValidator = u, r = /* @__PURE__ */ new WeakMap(), ct;
}
var dt = {}, pt = {}, sT;
function w_() {
  if (sT) return pt;
  sT = 1;
  var e = pt && pt.__classPrivateFieldSet || function(d, s, f, c, y) {
    if (c === "m") throw new TypeError("Private method is not writable");
    if (c === "a" && !y) throw new TypeError("Private accessor was defined without a setter");
    if (typeof s == "function" ? d !== s || !y : !s.has(d)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return c === "a" ? y.call(d, f) : y ? y.value = f : s.set(d, f), f;
  }, n = pt && pt.__classPrivateFieldGet || function(d, s, f, c) {
    if (f === "a" && !c) throw new TypeError("Private accessor was defined without a getter");
    if (typeof s == "function" ? d !== s || !c : !s.has(d)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return f === "m" ? c : f === "a" ? c.call(d) : c ? c.value : s.get(d);
  }, r;
  Object.defineProperty(pt, "__esModule", { value: !0 }), pt.AbstractCompilingTypedUnionValidator = void 0;
  const i = /* @__PURE__ */ Ia(), o = /* @__PURE__ */ O_(), t = Pa(), a = Ao();
  class u extends t.AbstractTypedUnionValidator {
    /** @inheritdoc */
    constructor(s) {
      super(s), r.set(this, void 0), e(this, r, new Array(s.anyOf.length), "f");
    }
    /** @inheritdoc */
    test(s) {
      const f = this.compiledFindSchemaMemberIndex(s);
      return this.compiledSchemaMemberTest(f, s);
    }
    /** @inheritdoc */
    errors(s) {
      const f = this.compiledFindSchemaMemberIndexOrError(s);
      return typeof f != "number" ? (0, a.createUnionTypeErrorIterable)(f) : (0, a.createErrorsIterable)(i.Value.Errors(this.schema.anyOf[f], s));
    }
    assertReturningSchema(s, f) {
      const c = this.compiledFindSchemaMemberIndexOrError(s);
      typeof c != "number" && (0, a.throwInvalidAssert)(f, c);
      const y = this.schema.anyOf[c];
      return this.compiledSchemaMemberTest(c, s) || (0, a.throwInvalidAssert)(f, i.Value.Errors(y, s).First()), y;
    }
    validateReturningSchema(s, f) {
      const c = this.compiledFindSchemaMemberIndexOrError(s);
      typeof c != "number" && (0, a.throwInvalidValidate)(f, c);
      const y = this.schema.anyOf[c];
      return this.compiledSchemaMemberTest(c, s) || (0, a.throwInvalidValidate)(f, i.Value.Errors(y, s)), y;
    }
    compiledFindSchemaMemberIndexOrError(s) {
      const f = this.compiledFindSchemaMemberIndex(s);
      return f === null ? (0, a.createUnionTypeError)(this.schema, s) : f;
    }
    compiledSchemaMemberTest(s, f) {
      if (s === null)
        return !1;
      if (n(this, r, "f")[s] === void 0) {
        let c = o.TypeCompiler.Compile(this.schema.anyOf[s]).Code();
        c = c.replace("(typeof value === 'object' && value !== null && !Array.isArray(value)) &&", "");
        const y = c.indexOf("function"), w = c.indexOf("return", y);
        c = "return " + c.substring(c.indexOf("(", w), c.length - 1), n(this, r, "f")[s] = new Function("value", c);
      }
      return n(this, r, "f")[s](f);
    }
  }
  return pt.AbstractCompilingTypedUnionValidator = u, r = /* @__PURE__ */ new WeakMap(), pt;
}
var cT;
function QB() {
  if (cT) return dt;
  cT = 1;
  var e = dt && dt.__classPrivateFieldSet || function(u, d, s, f, c) {
    if (f === "m") throw new TypeError("Private method is not writable");
    if (f === "a" && !c) throw new TypeError("Private accessor was defined without a setter");
    if (typeof d == "function" ? u !== d || !c : !d.has(u)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return f === "a" ? c.call(u, s) : c ? c.value = s : d.set(u, s), s;
  }, n = dt && dt.__classPrivateFieldGet || function(u, d, s, f) {
    if (s === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof d == "function" ? u !== d || !f : !d.has(u)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return s === "m" ? f : s === "a" ? f.call(u) : f ? f.value : d.get(u);
  }, r, i;
  Object.defineProperty(dt, "__esModule", { value: !0 }), dt.CompilingHeterogeneousUnionValidator = void 0;
  const o = w_(), t = A_();
  class a extends o.AbstractCompilingTypedUnionValidator {
    /** @inheritdoc */
    constructor(d) {
      super(d), r.set(this, void 0), i.set(this, void 0), e(this, r, new t.TypeIdentifyingKeyIndex(d), "f");
    }
    compiledFindSchemaMemberIndex(d) {
      if (n(this, i, "f") === void 0) {
        n(this, r, "f").cacheKeys();
        const s = [
          "return ((typeof value !== 'object' || value === null || Array.isArray(value)) ? null : "
        ];
        for (let f = 0; f < this.schema.anyOf.length; ++f) {
          const c = n(this, r, "f").keyByMemberIndex[f];
          s.push(`${this.toValueKeyDereference(c)} !== undefined ? ${f} : `);
        }
        e(this, i, new Function("value", s.join("") + "null)"), "f");
      }
      return n(this, i, "f").call(this, d);
    }
  }
  return dt.CompilingHeterogeneousUnionValidator = a, r = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap(), dt;
}
var Vo = {}, dT;
function XB() {
  if (dT) return Vo;
  dT = 1, Object.defineProperty(Vo, "__esModule", { value: !0 }), Vo.TypeIdentifyingKey = void 0;
  function e(n) {
    return Object.assign(Object.assign({}, n), { typeIdentifyingKey: !0 });
  }
  return Vo.TypeIdentifyingKey = e, Vo;
}
var pT;
function eM() {
  return pT || (pT = 1, function(e) {
    var n = Si && Si.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Si && Si.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(ZB(), e), r(QB(), e), r(XB(), e);
  }(Si)), Si;
}
var Ei = {}, ft = {}, fT;
function nM() {
  if (fT) return ft;
  fT = 1;
  var e = ft && ft.__classPrivateFieldGet || function(u, d, s, f) {
    if (s === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof d == "function" ? u !== d || !f : !d.has(u)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return s === "m" ? f : s === "a" ? f.call(u) : f ? f.value : d.get(u);
  }, n = ft && ft.__classPrivateFieldSet || function(u, d, s, f, c) {
    if (f === "m") throw new TypeError("Private method is not writable");
    if (f === "a" && !c) throw new TypeError("Private accessor was defined without a setter");
    if (typeof d == "function" ? u !== d || !c : !d.has(u)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return f === "a" ? c.call(u, s) : c ? c.value = s : d.set(u, s), s;
  }, r;
  Object.defineProperty(ft, "__esModule", { value: !0 }), ft.DiscriminatedUnionValidator = void 0;
  const i = /* @__PURE__ */ Ia(), o = Pa(), t = Ao();
  class a extends o.AbstractTypedUnionValidator {
    /** @inheritdoc */
    constructor(d) {
      var s;
      super(d), r.set(this, !1), this.discriminantKey = (s = this.schema.discriminantKey) !== null && s !== void 0 ? s : o.DEFAULT_DISCRIMINANT_KEY;
    }
    /** @inheritdoc */
    test(d) {
      const s = this.findSchemaMemberIndex(d);
      return typeof s != "number" ? !1 : i.Value.Check(this.schema.anyOf[s], d);
    }
    /** @inheritdoc */
    errors(d) {
      const s = this.findSchemaMemberIndex(d);
      if (typeof s != "number")
        return (0, t.createUnionTypeErrorIterable)(s);
      const f = this.schema.anyOf[s];
      return (0, t.createErrorsIterable)(i.Value.Errors(f, d));
    }
    assertReturningSchema(d, s) {
      const f = this.findSchemaMemberIndex(d);
      typeof f != "number" && (0, t.throwInvalidAssert)(s, f);
      const c = this.schema.anyOf[f];
      return this.uncompiledAssert(c, d, s), c;
    }
    validateReturningSchema(d, s) {
      const f = this.findSchemaMemberIndex(d);
      typeof f != "number" && (0, t.throwInvalidValidate)(s, f);
      const c = this.schema.anyOf[f];
      return this.uncompiledValidate(c, d, s), c;
    }
    findSchemaMemberIndex(d) {
      if (!e(this, r, "f")) {
        for (const s of this.schema.anyOf)
          if (s.properties[this.discriminantKey] === void 0)
            throw Error(`Discriminant key '${this.discriminantKey}' not present in all members of discriminated union`);
        n(this, r, !0, "f");
      }
      if (typeof d == "object" && d !== null) {
        const s = d[this.discriminantKey];
        if (s !== void 0)
          for (let f = 0; f < this.schema.anyOf.length; ++f) {
            const c = this.schema.anyOf[f].properties[this.discriminantKey];
            if (c !== void 0 && c.const === s)
              return f;
          }
      }
      return (0, t.createUnionTypeError)(this.schema, d);
    }
  }
  return ft.DiscriminatedUnionValidator = a, r = /* @__PURE__ */ new WeakMap(), ft;
}
var yt = {}, yT;
function tM() {
  if (yT) return yt;
  yT = 1;
  var e = yt && yt.__classPrivateFieldSet || function(u, d, s, f, c) {
    if (f === "m") throw new TypeError("Private method is not writable");
    if (f === "a" && !c) throw new TypeError("Private accessor was defined without a setter");
    if (typeof d == "function" ? u !== d || !c : !d.has(u)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return f === "a" ? c.call(u, s) : c ? c.value = s : d.set(u, s), s;
  }, n = yt && yt.__classPrivateFieldGet || function(u, d, s, f) {
    if (s === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof d == "function" ? u !== d || !f : !d.has(u)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return s === "m" ? f : s === "a" ? f.call(u) : f ? f.value : d.get(u);
  }, r, i;
  Object.defineProperty(yt, "__esModule", { value: !0 }), yt.CompilingDiscriminatedUnionValidator = void 0;
  const o = Pa(), t = w_();
  class a extends t.AbstractCompilingTypedUnionValidator {
    /** @inheritdoc */
    constructor(d) {
      var s;
      super(d), r.set(this, void 0), i.set(this, void 0), e(this, r, (s = this.schema.discriminantKey) !== null && s !== void 0 ? s : o.DEFAULT_DISCRIMINANT_KEY, "f");
    }
    compiledFindSchemaMemberIndex(d) {
      if (n(this, i, "f") === void 0) {
        const s = [
          `if (typeof value !== 'object' || value === null || Array.isArray(value)) return null;
          switch (${this.toValueKeyDereference(n(this, r, "f"))}) {
`
        ];
        for (let c = 0; c < this.schema.anyOf.length; ++c) {
          const y = this.schema.anyOf[c].properties[n(this, r, "f")];
          if (y === void 0)
            throw Error(`Discriminant key '${n(this, r, "f")}' not present in all members of discriminated union`);
          const w = y.const;
          typeof w == "string" ? s.push(`case '${w.replace(/'/g, "\\'")}': return ${c};
`) : s.push(`case ${w}: return ${c};
`);
        }
        const f = s.join("") + "default: return null; }";
        e(this, i, new Function("value", f), "f");
      }
      return n(this, i, "f").call(this, d);
    }
  }
  return yt.CompilingDiscriminatedUnionValidator = a, r = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap(), yt;
}
var lT;
function R_() {
  return lT || (lT = 1, function(e) {
    var n = Ei && Ei.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = Ei && Ei.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(nM(), e), r(tM(), e);
  }(Ei)), Ei;
}
var mT;
function rM() {
  return mT || (mT = 1, function(e) {
    var n = vt && vt.__createBinding || (Object.create ? function(i, o, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(o, t);
      (!u || ("get" in u ? !o.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return o[t];
      } }), Object.defineProperty(i, a, u);
    } : function(i, o, t, a) {
      a === void 0 && (a = t), i[a] = o[t];
    }), r = vt && vt.__exportStar || function(i, o) {
      for (var t in i) t !== "default" && !Object.prototype.hasOwnProperty.call(o, t) && n(o, i, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(op(), e), r(ap(), e), r(Pa(), e), r(JB(), e), r(eM(), e), r(R_(), e), r(P_(), e);
  }(vt)), vt;
}
rM();
R_();
const Ci = class Ci {
  constructor(n) {
    this.config = n, this.registerFormats(), this.registerTypes();
  }
  static getInstance(n) {
    return Ci.instance || (Ci.instance = new Ci(n)), Ci.instance;
  }
  assertHasRegistry(n) {
    if (!Es(n[ie]))
      throw new Error(`Please register @codelab/${n} to Typebox first`);
  }
  tSchema(n) {
    const r = this.config.schemaKindMap.find(([i]) => i === n);
    if (!r)
      throw console.error("Failed to find schema for kind:", n), console.error(
        "Available schemas:",
        this.config.schemaKindMap.map(([i]) => i)
      ), new Error("Schema not found");
    return r[1];
  }
  registerFormat(n, r) {
    Qb(n, r);
  }
  registerFormats() {
    for (const [n, r] of this.config.formatMap)
      this.registerFormat(n, r);
  }
  registerType(n, r) {
    eI(n[ie], (i, o) => wg(r, o));
  }
  registerTypes() {
    for (const [n, r] of this.config.schemaKindMap)
      this.registerType(n, r);
  }
};
dp(Ci, "instance");
let Ec = Ci;
const iM = [
  [aR, uR],
  [bg, Id],
  [dR, pR],
  [iR, oR],
  [sR, cR],
  [nR, tR],
  [rR, ht],
  [TR, gR],
  [fR, yR]
], oM = [["ipv4", mR]];
Ec.getInstance({
  formatMap: oM,
  schemaKindMap: iM
});
const Y = {
  DiscriminatedRef: Qw,
  IsUnion: zw,
  Nullish: kw,
  OmitOwner: Yw,
  Overwrite: Zw,
  RefSchema: Id,
  Serialized: eR,
  TRef: bg
}, wo = A.Object({
  data: A.String(),
  id: A.String()
});
var aM = Object.defineProperty, uM = (e, n, r) => n in e ? aM(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[n] = r, sM = (e, n, r) => uM(e, n + "", r), Ro = /* @__PURE__ */ ((e) => (e.ApiAction = "ApiAction", e.CodeAction = "CodeAction", e))(Ro || {}), up = /* @__PURE__ */ ((e) => (e.AntDesignAffix = "AntDesignAffix", e.AntDesignAlert = "AntDesignAlert", e.AntDesignAnchor = "AntDesignAnchor", e.AntDesignAutoComplete = "AntDesignAutoComplete", e.AntDesignAvatar = "AntDesignAvatar", e.AntDesignBackTop = "AntDesignBackTop", e.AntDesignBadge = "AntDesignBadge", e.AntDesignBreadcrumb = "AntDesignBreadcrumb", e.AntDesignButton = "AntDesignButton", e.AntDesignCalendar = "AntDesignCalendar", e.AntDesignCard = "AntDesignCard", e.AntDesignCardMeta = "AntDesignCardMeta", e.AntDesignCarousel = "AntDesignCarousel", e.AntDesignCascader = "AntDesignCascader", e.AntDesignCheckbox = "AntDesignCheckbox", e.AntDesignCheckboxGroup = "AntDesignCheckboxGroup", e.AntDesignCollapse = "AntDesignCollapse", e.AntDesignConfigProvider = "AntDesignConfigProvider", e.AntDesignDatePicker = "AntDesignDatePicker", e.AntDesignDescriptions = "AntDesignDescriptions", e.AntDesignDivider = "AntDesignDivider", e.AntDesignDrawer = "AntDesignDrawer", e.AntDesignDropdown = "AntDesignDropdown", e.AntDesignDropdownButton = "AntDesignDropdownButton", e.AntDesignEmpty = "AntDesignEmpty", e.AntDesignForm = "AntDesignForm", e.AntDesignFormErrorList = "AntDesignFormErrorList", e.AntDesignFormItem = "AntDesignFormItem", e.AntDesignFormList = "AntDesignFormList", e.AntDesignFormProvider = "AntDesignFormProvider", e.AntDesignGridCol = "AntDesignGridCol", e.AntDesignGridRow = "AntDesignGridRow", e.AntDesignIcon = "AntDesignIcon", e.AntDesignImage = "AntDesignImage", e.AntDesignInput = "AntDesignInput", e.AntDesignInputNumber = "AntDesignInputNumber", e.AntDesignInputSearch = "AntDesignInputSearch", e.AntDesignInputTextArea = "AntDesignInputTextArea", e.AntDesignLayout = "AntDesignLayout", e.AntDesignLayoutContent = "AntDesignLayoutContent", e.AntDesignLayoutFooter = "AntDesignLayoutFooter", e.AntDesignLayoutHeader = "AntDesignLayoutHeader", e.AntDesignLayoutSider = "AntDesignLayoutSider", e.AntDesignList = "AntDesignList", e.AntDesignListItem = "AntDesignListItem", e.AntDesignListItemMeta = "AntDesignListItemMeta", e.AntDesignMentions = "AntDesignMentions", e.AntDesignMenu = "AntDesignMenu", e.AntDesignMessage = "AntDesignMessage", e.AntDesignModal = "AntDesignModal", e.AntDesignNotification = "AntDesignNotification", e.AntDesignPagination = "AntDesignPagination", e.AntDesignPopconfirm = "AntDesignPopconfirm", e.AntDesignPopover = "AntDesignPopover", e.AntDesignProgress = "AntDesignProgress", e.AntDesignRadioGroup = "AntDesignRadioGroup", e.AntDesignRate = "AntDesignRate", e.AntDesignResult = "AntDesignResult", e.AntDesignSegmented = "AntDesignSegmented", e.AntDesignSelect = "AntDesignSelect", e.AntDesignSkeleton = "AntDesignSkeleton", e.AntDesignSlider = "AntDesignSlider", e.AntDesignSpace = "AntDesignSpace", e.AntDesignSpin = "AntDesignSpin", e.AntDesignStatistic = "AntDesignStatistic", e.AntDesignSteps = "AntDesignSteps", e.AntDesignSwitch = "AntDesignSwitch", e.AntDesignTable = "AntDesignTable", e.AntDesignTabs = "AntDesignTabs", e.AntDesignTag = "AntDesignTag", e.AntDesignTimePicker = "AntDesignTimePicker", e.AntDesignTimeline = "AntDesignTimeline", e.AntDesignTooltip = "AntDesignTooltip", e.AntDesignTransfer = "AntDesignTransfer", e.AntDesignTree = "AntDesignTree", e.AntDesignTreeSelect = "AntDesignTreeSelect", e.AntDesignTypographyParagraph = "AntDesignTypographyParagraph", e.AntDesignTypographyText = "AntDesignTypographyText", e.AntDesignTypographyTitle = "AntDesignTypographyTitle", e.AntDesignUpload = "AntDesignUpload", e.ExternalComponent = "ExternalComponent", e.GridLayout = "GridLayout", e.HookGraphqlMutation = "HookGraphqlMutation", e.HookGraphqlQuery = "HookGraphqlQuery", e.HookQueryConfig = "HookQueryConfig", e.HookQueryLambda = "HookQueryLambda", e.HookQueryPage = "HookQueryPage", e.HookQueryPages = "HookQueryPages", e.HookRecoilState = "HookRecoilState", e.HookRouter = "HookRouter", e.HtmlA = "HtmlA", e.HtmlAbbr = "HtmlAbbr", e.HtmlArea = "HtmlArea", e.HtmlArticle = "HtmlArticle", e.HtmlAside = "HtmlAside", e.HtmlAudio = "HtmlAudio", e.HtmlB = "HtmlB", e.HtmlBase = "HtmlBase", e.HtmlBdo = "HtmlBdo", e.HtmlBlockquote = "HtmlBlockquote", e.HtmlBr = "HtmlBr", e.HtmlButton = "HtmlButton", e.HtmlCanvas = "HtmlCanvas", e.HtmlCaption = "HtmlCaption", e.HtmlCite = "HtmlCite", e.HtmlCode = "HtmlCode", e.HtmlCol = "HtmlCol", e.HtmlData = "HtmlData", e.HtmlDatalist = "HtmlDatalist", e.HtmlDetails = "HtmlDetails", e.HtmlDfn = "HtmlDfn", e.HtmlDialog = "HtmlDialog", e.HtmlDiv = "HtmlDiv", e.HtmlDl = "HtmlDl", e.HtmlEm = "HtmlEm", e.HtmlEmbed = "HtmlEmbed", e.HtmlFieldset = "HtmlFieldset", e.HtmlFooter = "HtmlFooter", e.HtmlForm = "HtmlForm", e.HtmlH1 = "HtmlH1", e.HtmlH2 = "HtmlH2", e.HtmlH3 = "HtmlH3", e.HtmlH4 = "HtmlH4", e.HtmlH5 = "HtmlH5", e.HtmlH6 = "HtmlH6", e.HtmlHead = "HtmlHead", e.HtmlHeader = "HtmlHeader", e.HtmlHr = "HtmlHr", e.HtmlI = "HtmlI", e.HtmlIframe = "HtmlIframe", e.HtmlImg = "HtmlImg", e.HtmlInput = "HtmlInput", e.HtmlKbd = "HtmlKbd", e.HtmlLabel = "HtmlLabel", e.HtmlLegend = "HtmlLegend", e.HtmlLi = "HtmlLi", e.HtmlLink = "HtmlLink", e.HtmlMain = "HtmlMain", e.HtmlMap = "HtmlMap", e.HtmlMark = "HtmlMark", e.HtmlMath = "HtmlMath", e.HtmlMeta = "HtmlMeta", e.HtmlMeter = "HtmlMeter", e.HtmlNav = "HtmlNav", e.HtmlNoscript = "HtmlNoscript", e.HtmlObject = "HtmlObject", e.HtmlOl = "HtmlOl", e.HtmlOptgroup = "HtmlOptgroup", e.HtmlOption = "HtmlOption", e.HtmlOutput = "HtmlOutput", e.HtmlP = "HtmlP", e.HtmlPicture = "HtmlPicture", e.HtmlPre = "HtmlPre", e.HtmlProgress = "HtmlProgress", e.HtmlQ = "HtmlQ", e.HtmlRuby = "HtmlRuby", e.HtmlS = "HtmlS", e.HtmlSamp = "HtmlSamp", e.HtmlScript = "HtmlScript", e.HtmlSection = "HtmlSection", e.HtmlSelect = "HtmlSelect", e.HtmlSmall = "HtmlSmall", e.HtmlSource = "HtmlSource", e.HtmlSpan = "HtmlSpan", e.HtmlStrong = "HtmlStrong", e.HtmlStyle = "HtmlStyle", e.HtmlSub = "HtmlSub", e.HtmlSup = "HtmlSup", e.HtmlTable = "HtmlTable", e.HtmlTd = "HtmlTd", e.HtmlTextarea = "HtmlTextarea", e.HtmlTh = "HtmlTh", e.HtmlTime = "HtmlTime", e.HtmlTitle = "HtmlTitle", e.HtmlTr = "HtmlTr", e.HtmlTrack = "HtmlTrack", e.HtmlU = "HtmlU", e.HtmlUl = "HtmlUl", e.HtmlVar = "HtmlVar", e.HtmlVideo = "HtmlVideo", e.HtmlWbr = "HtmlWbr", e.LexicalEditor = "LexicalEditor", e.MuiAccordion = "MuiAccordion", e.MuiAccordionActions = "MuiAccordionActions", e.MuiAccordionDetails = "MuiAccordionDetails", e.MuiAccordionSummary = "MuiAccordionSummary", e.MuiAlert = "MuiAlert", e.MuiAlertTitle = "MuiAlertTitle", e.MuiAppBar = "MuiAppBar", e.MuiAutocomplete = "MuiAutocomplete", e.MuiAvatar = "MuiAvatar", e.MuiAvatarGroup = "MuiAvatarGroup", e.MuiBackdrop = "MuiBackdrop", e.MuiBadge = "MuiBadge", e.MuiBadgeUnstyled = "MuiBadgeUnstyled", e.MuiBottomNavigation = "MuiBottomNavigation", e.MuiBottomNavigationAction = "MuiBottomNavigationAction", e.MuiBox = "MuiBox", e.MuiBreadcrumbs = "MuiBreadcrumbs", e.MuiButton = "MuiButton", e.MuiButtonBase = "MuiButtonBase", e.MuiButtonGroup = "MuiButtonGroup", e.MuiButtonUnstyled = "MuiButtonUnstyled", e.MuiCalendarPicker = "MuiCalendarPicker", e.MuiCalendarPickerSkeleton = "MuiCalendarPickerSkeleton", e.MuiCard = "MuiCard", e.MuiCardActionArea = "MuiCardActionArea", e.MuiCardActions = "MuiCardActions", e.MuiCardContent = "MuiCardContent", e.MuiCardHeader = "MuiCardHeader", e.MuiCardMedia = "MuiCardMedia", e.MuiCheckbox = "MuiCheckbox", e.MuiChip = "MuiChip", e.MuiCircularProgress = "MuiCircularProgress", e.MuiClickAwayListener = "MuiClickAwayListener", e.MuiClockPicker = "MuiClockPicker", e.MuiCollapse = "MuiCollapse", e.MuiContainer = "MuiContainer", e.MuiCssBaseline = "MuiCssBaseline", e.MuiDataGrid = "MuiDataGrid", e.MuiDatePicker = "MuiDatePicker", e.MuiDateRangePicker = "MuiDateRangePicker", e.MuiDateRangePickerDay = "MuiDateRangePickerDay", e.MuiDateTimePicker = "MuiDateTimePicker", e.MuiDesktopDatePicker = "MuiDesktopDatePicker", e.MuiDesktopDateRangePicker = "MuiDesktopDateRangePicker", e.MuiDesktopDateTimePicker = "MuiDesktopDateTimePicker", e.MuiDesktopTimePicker = "MuiDesktopTimePicker", e.MuiDialog = "MuiDialog", e.MuiDialogActions = "MuiDialogActions", e.MuiDialogContent = "MuiDialogContent", e.MuiDialogContentText = "MuiDialogContentText", e.MuiDialogTitle = "MuiDialogTitle", e.MuiDivider = "MuiDivider", e.MuiDrawer = "MuiDrawer", e.MuiFab = "MuiFab", e.MuiFade = "MuiFade", e.MuiFilledInput = "MuiFilledInput", e.MuiFormControl = "MuiFormControl", e.MuiFormControlLabel = "MuiFormControlLabel", e.MuiFormControlUnstyled = "MuiFormControlUnstyled", e.MuiFormGroup = "MuiFormGroup", e.MuiFormHelperText = "MuiFormHelperText", e.MuiFormLabel = "MuiFormLabel", e.MuiGlobalStyles = "MuiGlobalStyles", e.MuiGrid = "MuiGrid", e.MuiGridColDef = "MuiGridColDef", e.MuiGrow = "MuiGrow", e.MuiHidden = "MuiHidden", e.MuiIcon = "MuiIcon", e.MuiIconButton = "MuiIconButton", e.MuiImageList = "MuiImageList", e.MuiImageListItem = "MuiImageListItem", e.MuiImageListItemBar = "MuiImageListItemBar", e.MuiInput = "MuiInput", e.MuiInputAdornment = "MuiInputAdornment", e.MuiInputBase = "MuiInputBase", e.MuiInputLabel = "MuiInputLabel", e.MuiLinearProgress = "MuiLinearProgress", e.MuiLink = "MuiLink", e.MuiList = "MuiList", e.MuiListItem = "MuiListItem", e.MuiListItemAvatar = "MuiListItemAvatar", e.MuiListItemButton = "MuiListItemButton", e.MuiListItemIcon = "MuiListItemIcon", e.MuiListItemSecondaryAction = "MuiListItemSecondaryAction", e.MuiListItemText = "MuiListItemText", e.MuiListSubheader = "MuiListSubheader", e.MuiLoadingButton = "MuiLoadingButton", e.MuiMasonry = "MuiMasonry", e.MuiMasonryItem = "MuiMasonryItem", e.MuiMenu = "MuiMenu", e.MuiMenuItem = "MuiMenuItem", e.MuiMenuList = "MuiMenuList", e.MuiMobileDatePicker = "MuiMobileDatePicker", e.MuiMobileDateRangePicker = "MuiMobileDateRangePicker", e.MuiMobileDateTimePicker = "MuiMobileDateTimePicker", e.MuiMobileStepper = "MuiMobileStepper", e.MuiMobileTimePicker = "MuiMobileTimePicker", e.MuiModal = "MuiModal", e.MuiModalUnstyled = "MuiModalUnstyled", e.MuiMonthPicker = "MuiMonthPicker", e.MuiNativeSelect = "MuiNativeSelect", e.MuiNoSsr = "MuiNoSsr", e.MuiOutlinedInput = "MuiOutlinedInput", e.MuiPagination = "MuiPagination", e.MuiPaginationItem = "MuiPaginationItem", e.MuiPaper = "MuiPaper", e.MuiPickersDay = "MuiPickersDay", e.MuiPopover = "MuiPopover", e.MuiPopper = "MuiPopper", e.MuiPortal = "MuiPortal", e.MuiRadio = "MuiRadio", e.MuiRadioGroup = "MuiRadioGroup", e.MuiRating = "MuiRating", e.MuiScopedCssBaseline = "MuiScopedCssBaseline", e.MuiSelect = "MuiSelect", e.MuiSkeleton = "MuiSkeleton", e.MuiSlide = "MuiSlide", e.MuiSlider = "MuiSlider", e.MuiSliderUnstyled = "MuiSliderUnstyled", e.MuiSnackbar = "MuiSnackbar", e.MuiSnackbarContent = "MuiSnackbarContent", e.MuiSpeedDial = "MuiSpeedDial", e.MuiSpeedDialAction = "MuiSpeedDialAction", e.MuiSpeedDialIcon = "MuiSpeedDialIcon", e.MuiStack = "MuiStack", e.MuiStaticDatePicker = "MuiStaticDatePicker", e.MuiStaticDateRangePicker = "MuiStaticDateRangePicker", e.MuiStaticDateTimePicker = "MuiStaticDateTimePicker", e.MuiStaticTimePicker = "MuiStaticTimePicker", e.MuiStep = "MuiStep", e.MuiStepButton = "MuiStepButton", e.MuiStepConnector = "MuiStepConnector", e.MuiStepContent = "MuiStepContent", e.MuiStepIcon = "MuiStepIcon", e.MuiStepLabel = "MuiStepLabel", e.MuiStepper = "MuiStepper", e.MuiSvgIcon = "MuiSvgIcon", e.MuiSwipeableDrawer = "MuiSwipeableDrawer", e.MuiSwitch = "MuiSwitch", e.MuiSwitchUnstyled = "MuiSwitchUnstyled", e.MuiTab = "MuiTab", e.MuiTabContext = "MuiTabContext", e.MuiTabList = "MuiTabList", e.MuiTabPanel = "MuiTabPanel", e.MuiTabScrollButton = "MuiTabScrollButton", e.MuiTable = "MuiTable", e.MuiTableBody = "MuiTableBody", e.MuiTableCell = "MuiTableCell", e.MuiTableContainer = "MuiTableContainer", e.MuiTableFooter = "MuiTableFooter", e.MuiTableHead = "MuiTableHead", e.MuiTablePagination = "MuiTablePagination", e.MuiTableRow = "MuiTableRow", e.MuiTableSortLabel = "MuiTableSortLabel", e.MuiTabs = "MuiTabs", e.MuiTextField = "MuiTextField", e.MuiTextareaAutosize = "MuiTextareaAutosize", e.MuiTimePicker = "MuiTimePicker", e.MuiTimeline = "MuiTimeline", e.MuiTimelineConnector = "MuiTimelineConnector", e.MuiTimelineContent = "MuiTimelineContent", e.MuiTimelineDot = "MuiTimelineDot", e.MuiTimelineItem = "MuiTimelineItem", e.MuiTimelineOppositeContent = "MuiTimelineOppositeContent", e.MuiTimelineSeparator = "MuiTimelineSeparator", e.MuiToggleButton = "MuiToggleButton", e.MuiToggleButtonGroup = "MuiToggleButtonGroup", e.MuiToolbar = "MuiToolbar", e.MuiTooltip = "MuiTooltip", e.MuiTreeItem = "MuiTreeItem", e.MuiTreeView = "MuiTreeView", e.MuiTypography = "MuiTypography", e.MuiUnstableTrapFocus = "MuiUnstableTrapFocus", e.MuiYearPicker = "MuiYearPicker", e.MuiZoom = "MuiZoom", e.NextLink = "NextLink", e.Query = "Query", e.ReactFragment = "ReactFragment", e.Script = "Script", e.State = "State", e.Text = "Text", e.TextList = "TextList", e))(up || {}), $_ = /* @__PURE__ */ ((e) => (e.Desktop = "Desktop", e.MobileLandscape = "MobileLandscape", e.MobilePortrait = "MobilePortrait", e.Tablet = "Tablet", e))($_ || {}), h_ = /* @__PURE__ */ ((e) => (e.Css = "Css", e.CssInJs = "CssInJs", e.Graphql = "Graphql", e.Javascript = "Javascript", e.Json = "Json", e.Typescript = "Typescript", e))(h_ || {}), B_ = /* @__PURE__ */ ((e) => (e.Css = "CSS", e.Component = "Component", e.Node = "Node", e.Page = "Page", e.Props = "Props", e.PropsInspector = "PropsInspector", e.PropsMap = "PropsMap", e.PropsTransformation = "PropsTransformation", e))(B_ || {}), M_ = /* @__PURE__ */ ((e) => (e.AllElements = "AllElements", e.ChildrenOnly = "ChildrenOnly", e.DescendantsOnly = "DescendantsOnly", e.ExcludeDescendantsElements = "ExcludeDescendantsElements", e))(M_ || {}), S_ = /* @__PURE__ */ ((e) => (e.InternalServerError = "InternalServerError", e.NotFound = "NotFound", e.Provider = "Provider", e.Regular = "Regular", e))(S_ || {}), E_ = /* @__PURE__ */ ((e) => (e.Boolean = "Boolean", e.Integer = "Integer", e.Number = "Number", e.String = "String", e))(E_ || {}), C_ = /* @__PURE__ */ ((e) => (e.Page = "Page", e.Url = "Url", e))(C_ || {}), sp = /* @__PURE__ */ ((e) => (e.GraphQl = "GraphQl", e.Rest = "Rest", e))(sp || {}), j_ = /* @__PURE__ */ ((e) => (e.Admin = "Admin", e.User = "User", e))(j_ || {}), Be = /* @__PURE__ */ ((e) => (e.ActionType = "ActionType", e.AppType = "AppType", e.ArrayType = "ArrayType", e.CodeMirrorType = "CodeMirrorType", e.ElementType = "ElementType", e.EnumType = "EnumType", e.InterfaceType = "InterfaceType", e.LambdaType = "LambdaType", e.PageType = "PageType", e.PrimitiveType = "PrimitiveType", e.ReactNodeType = "ReactNodeType", e.RenderPropType = "RenderPropType", e.RichTextType = "RichTextType", e.UnionType = "UnionType", e))(Be || {});
class N extends String {
  constructor(n, r) {
    super(n), sM(this, "__apiType"), this.value = n, this.__meta__ = r;
  }
  toString() {
    return this.value;
  }
}
new N(`
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
new N(`
    fragment Owner on User {
  id
}
    `, { fragmentName: "Owner" });
new N(`
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
new N(`
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
new N(`
    fragment Prop on Prop {
  data
  id
}
    `, { fragmentName: "Prop" });
new N(`
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
new N(`
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
new N(`
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
new N(`
    fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
    `, { fragmentName: "TagPreview" });
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
    fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
    `, { fragmentName: "EnumTypeValue" });
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
    fragment HookProp on Prop {
  data
  id
}
    `, { fragmentName: "HookProp" });
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
    mutation CreateApps($input: [AppCreateInput!]!) {
  createApps(input: $input) {
    apps {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation UpdateApps($where: AppWhere!, $update: AppUpdateInput!) {
  updateApps(update: $update, where: $where) {
    apps {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation DeleteApps($where: AppWhere!, $delete: AppDeleteInput) {
  deleteApps(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `);
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
    mutation DeleteAtoms($where: AtomWhere!, $delete: AtomDeleteInput) {
  deleteAtoms(where: $where, delete: $delete) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new N(`
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
new N(`
    mutation UpdateAtoms($where: AtomWhere, $update: AtomUpdateInput) {
  updateAtoms(update: $update, where: $where) {
    atoms {
      __typename
      id
    }
  }
}
    `);
new N(`
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
new N(`
    mutation CreateAuthGuards($input: [AuthGuardCreateInput!]!) {
  createAuthGuards(input: $input) {
    authGuards {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation UpdateAuthGuard($where: AuthGuardWhere, $update: AuthGuardUpdateInput) {
  updateAuthGuards(update: $update, where: $where) {
    authGuards {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation DeleteAuthGuards($where: AuthGuardWhere, $delete: AuthGuardDeleteInput) {
  deleteAuthGuards(where: $where, delete: $delete) {
    nodesDeleted
  }
}
    `);
new N(`
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
new N(`
    mutation DeleteComponents($where: ComponentWhere, $delete: ComponentDeleteInput) {
  deleteComponents(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `);
new N(`
    mutation UpdateComponents($where: ComponentWhere, $update: ComponentUpdateInput) {
  updateComponents(update: $update, where: $where) {
    components {
      __typename
      id
    }
  }
}
    `);
new N(`
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
new N(`
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
new N(`
    mutation CreateDomains($input: [DomainCreateInput!]!) {
  createDomains(input: $input) {
    domains {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation UpdateDomains($where: DomainWhere!, $update: DomainUpdateInput!) {
  updateDomains(update: $update, where: $where) {
    domains {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation DeleteDomains($where: DomainWhere!) {
  deleteDomains(where: $where) {
    nodesDeleted
  }
}
    `);
new N(`
    mutation CreateElements($input: [ElementCreateInput!]!) {
  createElements(input: $input) {
    elements {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation DeleteElements($where: ElementWhere!, $delete: ElementDeleteInput) {
  deleteElements(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `);
new N(`
    mutation UpdateElements($where: ElementWhere, $update: ElementUpdateInput) {
  updateElements(update: $update, where: $where) {
    elements {
      __typename
      id
    }
  }
}
    `);
new N(`
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
new N(`
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
new N(`
    mutation DeleteHooks($where: HookWhere!) {
  deleteHooks(where: $where) {
    nodesDeleted
  }
}
    `);
new N(`
    mutation CreateFields($input: [FieldCreateInput!]!) {
  createFields(input: $input) {
    fields {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation UpdateFields($where: FieldWhere!, $update: FieldUpdateInput!) {
  updateFields(update: $update, where: $where) {
    fields {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation DeleteFields($where: FieldWhere!) {
  deleteFields(where: $where) {
    nodesDeleted
  }
}
    `);
new N(`
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
new N(`
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
new N(`
    mutation DeletePages($where: PageWhere, $delete: PageDeleteInput) {
  deletePages(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `);
new N(`
    mutation UpdatePages($where: PageWhere, $update: PageUpdateInput) {
  updatePages(update: $update, where: $where) {
    pages {
      __typename
      id
    }
  }
}
    `);
new N(`
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
new N(`
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
new N(`
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
new N(`
    mutation DeletePreferences($where: PreferenceWhere, $delete: PreferenceDeleteInput) {
  deletePreferences(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `);
new N(`
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
new N(`
    mutation UpdatePreferences($where: PreferenceWhere, $update: PreferenceUpdateInput) {
  updatePreferences(update: $update, where: $where) {
    preferences {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation CreateProps($input: [PropCreateInput!]!) {
  createProps(input: $input) {
    props {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation UpdateProps($where: PropWhere, $update: PropUpdateInput) {
  updateProps(update: $update, where: $where) {
    props {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation DeleteProps($where: PropWhere!) {
  deleteProps(where: $where) {
    nodesDeleted
  }
}
    `);
new N(`
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
new N(`
    mutation CreateRedirects($input: [RedirectCreateInput!]!) {
  createRedirects(input: $input) {
    redirects {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation DeleteRedirects($where: RedirectWhere, $delete: RedirectDeleteInput) {
  deleteRedirects(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `);
new N(`
    mutation UpdateRedirects($where: RedirectWhere, $update: RedirectUpdateInput) {
  updateRedirects(update: $update, where: $where) {
    redirects {
      __typename
      id
    }
  }
}
    `);
new N(`
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
new N(`
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
new N(`
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
new N(`
    mutation CreateResources($input: [ResourceCreateInput!]!) {
  createResources(input: $input) {
    resources {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation UpdateResources($where: ResourceWhere, $update: ResourceUpdateInput) {
  updateResources(update: $update, where: $where) {
    resources {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation DeleteResources($where: ResourceWhere, $delete: ResourceDeleteInput) {
  deleteResources(where: $where, delete: $delete) {
    nodesDeleted
  }
}
    `);
new N(`
    mutation CreateCodeActions($input: [CodeActionCreateInput!]!) {
  createCodeActions(input: $input) {
    codeActions {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation CreateApiActions($input: [ApiActionCreateInput!]!) {
  createApiActions(input: $input) {
    apiActions {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation DeleteCodeActions($where: CodeActionWhere!, $delete: CodeActionDeleteInput) {
  deleteCodeActions(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new N(`
    mutation DeleteApiActions($where: ApiActionWhere!, $delete: ApiActionDeleteInput) {
  deleteApiActions(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new N(`
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
new N(`
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
new N(`
    mutation DeleteStores($where: StoreWhere, $delete: StoreDeleteInput) {
  deleteStores(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `);
new N(`
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
new N(`
    mutation UpdateStores($where: StoreWhere, $update: StoreUpdateInput) {
  updateStores(update: $update, where: $where) {
    stores {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation UpdateCodeActions($update: CodeActionUpdateInput, $where: CodeActionWhere) {
  updateCodeActions(update: $update, where: $where) {
    codeActions {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation UpdateApiActions($update: ApiActionUpdateInput, $where: ApiActionWhere) {
  updateApiActions(update: $update, where: $where) {
    apiActions {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation CreateTags($input: [TagCreateInput!]!) {
  createTags(input: $input) {
    tags {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation UpdateTags($where: TagWhere!, $update: TagUpdateInput!) {
  updateTags(update: $update, where: $where) {
    tags {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation DeleteTags($where: TagWhere!) {
  deleteTags(where: $where) {
    nodesDeleted
  }
}
    `);
new N(`
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
new N(`
    mutation CreatePrimitiveTypes($input: [PrimitiveTypeCreateInput!]!) {
  types: createPrimitiveTypes(input: $input) {
    types: primitiveTypes {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation CreateArrayTypes($input: [ArrayTypeCreateInput!]!) {
  types: createArrayTypes(input: $input) {
    types: arrayTypes {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation CreateUnionTypes($input: [UnionTypeCreateInput!]!) {
  types: createUnionTypes(input: $input) {
    types: unionTypes {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation CreateInterfaceTypes($input: [InterfaceTypeCreateInput!]!) {
  types: createInterfaceTypes(input: $input) {
    types: interfaceTypes {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation CreateElementTypes($input: [ElementTypeCreateInput!]!) {
  types: createElementTypes(input: $input) {
    types: elementTypes {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation CreateRenderPropTypes($input: [RenderPropTypeCreateInput!]!) {
  types: createRenderPropTypes(input: $input) {
    types: renderPropTypes {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation CreateReactNodeTypes($input: [ReactNodeTypeCreateInput!]!) {
  types: createReactNodeTypes(input: $input) {
    types: reactNodeTypes {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation CreateEnumTypes($input: [EnumTypeCreateInput!]!) {
  types: createEnumTypes(input: $input) {
    types: enumTypes {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation CreateLambdaTypes($input: [LambdaTypeCreateInput!]!) {
  types: createLambdaTypes(input: $input) {
    types: lambdaTypes {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation CreatePageTypes($input: [PageTypeCreateInput!]!) {
  types: createPageTypes(input: $input) {
    types: pageTypes {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation CreateAppTypes($input: [AppTypeCreateInput!]!) {
  types: createAppTypes(input: $input) {
    types: appTypes {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation CreateRichTextTypes($input: [RichTextTypeCreateInput!]!) {
  types: createRichTextTypes(input: $input) {
    types: richTextTypes {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation CreateActionTypes($input: [ActionTypeCreateInput!]!) {
  types: createActionTypes(input: $input) {
    types: actionTypes {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation CreateCodeMirrorTypes($input: [CodeMirrorTypeCreateInput!]!) {
  types: createCodeMirrorTypes(input: $input) {
    types: codeMirrorTypes {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation DeletePrimitiveTypes($delete: PrimitiveTypeDeleteInput, $where: PrimitiveTypeWhere) {
  deletePrimitiveTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new N(`
    mutation DeleteArrayTypes($delete: ArrayTypeDeleteInput, $where: ArrayTypeWhere) {
  deleteArrayTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new N(`
    mutation DeleteReactNodeTypes($delete: ReactNodeTypeDeleteInput, $where: ReactNodeTypeWhere) {
  deleteReactNodeTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new N(`
    mutation DeleteUnionTypes($delete: UnionTypeDeleteInput, $where: UnionTypeWhere) {
  deleteUnionTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new N(`
    mutation DeleteInterfaceTypes($delete: InterfaceTypeDeleteInput, $where: InterfaceTypeWhere) {
  deleteInterfaceTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new N(`
    mutation DeleteElementTypes($delete: ElementTypeDeleteInput, $where: ElementTypeWhere) {
  deleteElementTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new N(`
    mutation DeleteRenderPropTypes($delete: RenderPropTypeDeleteInput, $where: RenderPropTypeWhere) {
  deleteRenderPropTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new N(`
    mutation DeleteRichTextTypes($delete: RichTextTypeDeleteInput, $where: RichTextTypeWhere) {
  deleteRichTextTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new N(`
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
new N(`
    mutation DeleteLambdaTypes($delete: LambdaTypeDeleteInput, $where: LambdaTypeWhere) {
  deleteLambdaTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new N(`
    mutation DeletePageTypes($delete: PageTypeDeleteInput, $where: PageTypeWhere) {
  deletePageTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new N(`
    mutation DeleteAppTypes($delete: AppTypeDeleteInput, $where: AppTypeWhere) {
  deleteAppTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new N(`
    mutation DeleteActionTypes($delete: ActionTypeDeleteInput, $where: ActionTypeWhere) {
  deleteActionTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new N(`
    mutation DeleteCodeMirrorTypes($delete: CodeMirrorTypeDeleteInput, $where: CodeMirrorTypeWhere) {
  deleteCodeMirrorTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
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
new N(`
    query InterfaceForm_GetApps($options: AppOptions, $where: AppWhere) {
  apps(options: $options, where: $where) {
    id
    name
  }
}
    `);
new N(`
    query InterfaceForm_GetAtoms($options: AtomOptions, $where: AtomWhere) {
  atoms(options: $options, where: $where) {
    id
    name
    type
  }
}
    `);
new N(`
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
new N(`
    query InterfaceForm_GetStores($options: StoreOptions, $where: StoreWhere) {
  stores(options: $options, where: $where) {
    id
    name
  }
}
    `);
new N(`
    query InterfaceForm_GetResource($options: ResourceOptions, $where: ResourceWhere) {
  resources(options: $options, where: $where) {
    id
    name
  }
}
    `);
new N(`
    query InterfaceForm_GetPages($options: PageOptions, $where: PageWhere) {
  pages(options: $options, where: $where) {
    id
    name
  }
}
    `);
new N(`
    query IsTypeDescendantOf($descendantTypeId: ID!, $parentTypeId: ID!) {
  isTypeDescendantOf(
    descendantTypeId: $descendantTypeId
    parentTypeId: $parentTypeId
  )
}
    `);
new N(`
    query GetTypeReferences($typeId: ID!) {
  getTypeReferences(typeId: $typeId) {
    label
    name
  }
}
    `);
new N(`
    mutation UpdatePrimitiveTypes($update: PrimitiveTypeUpdateInput, $where: PrimitiveTypeWhere) {
  types: updatePrimitiveTypes(update: $update, where: $where) {
    types: primitiveTypes {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation UpdateArrayTypes($update: ArrayTypeUpdateInput, $where: ArrayTypeWhere) {
  types: updateArrayTypes(update: $update, where: $where) {
    types: arrayTypes {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation UpdateUnionTypes($update: UnionTypeUpdateInput, $where: UnionTypeWhere) {
  types: updateUnionTypes(update: $update, where: $where) {
    types: unionTypes {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation UpdateInterfaceTypes($update: InterfaceTypeUpdateInput, $where: InterfaceTypeWhere) {
  types: updateInterfaceTypes(update: $update, where: $where) {
    types: interfaceTypes {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation UpdateReactNodeTypes($update: ReactNodeTypeUpdateInput, $where: ReactNodeTypeWhere) {
  types: updateReactNodeTypes(update: $update, where: $where) {
    types: reactNodeTypes {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation UpdateElementTypes($update: ElementTypeUpdateInput, $where: ElementTypeWhere) {
  types: updateElementTypes(update: $update, where: $where) {
    types: elementTypes {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation UpdateRenderPropTypes($update: RenderPropTypeUpdateInput, $where: RenderPropTypeWhere) {
  types: updateRenderPropTypes(update: $update, where: $where) {
    types: renderPropTypes {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation UpdateEnumTypes($update: EnumTypeUpdateInput, $where: EnumTypeWhere) {
  types: updateEnumTypes(update: $update, where: $where) {
    types: enumTypes {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation UpdateLambdaTypes($update: LambdaTypeUpdateInput, $where: LambdaTypeWhere) {
  types: updateLambdaTypes(update: $update, where: $where) {
    types: lambdaTypes {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation UpdatePageTypes($update: PageTypeUpdateInput, $where: PageTypeWhere) {
  types: updatePageTypes(update: $update, where: $where) {
    types: pageTypes {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation UpdateAppTypes($update: AppTypeUpdateInput, $where: AppTypeWhere) {
  types: updateAppTypes(update: $update, where: $where) {
    types: appTypes {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation UpdateRichTextTypes($update: RichTextTypeUpdateInput, $where: RichTextTypeWhere) {
  types: updateRichTextTypes(update: $update, where: $where) {
    types: richTextTypes {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation UpdateActionTypes($update: ActionTypeUpdateInput, $where: ActionTypeWhere) {
  types: updateActionTypes(update: $update, where: $where) {
    types: actionTypes {
      __typename
      id
    }
  }
}
    `);
new N(`
    mutation UpdateCodeMirrorTypes($update: CodeMirrorTypeUpdateInput, $where: CodeMirrorTypeWhere) {
  types: updateCodeMirrorTypes(update: $update, where: $where) {
    types: codeMirrorTypes {
      __typename
      id
    }
  }
}
    `);
new N(`
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
new N(`
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
new N(`
    mutation DeleteUsers($where: UserWhere!) {
  deleteUsers(where: $where) {
    nodesDeleted
  }
}
    `);
new N(`
    mutation UpdateUsers($where: UserWhere!, $update: UserUpdateInput!) {
  updateUsers(update: $update, where: $where) {
    users {
      __typename
      id
    }
  }
}
    `);
const cM = Y.DiscriminatedRef(Ro.ApiAction), dM = Y.DiscriminatedRef(Ro.CodeAction), TT = A.Union([
  cM,
  dM
]), F_ = A.Object({
  id: A.String(),
  name: A.String(),
  store: Y.RefSchema,
  type: A.Enum(Ro)
}), x_ = A.Composite([
  F_,
  A.Object({
    __typename: A.Literal(`${Ro.ApiAction}`),
    config: wo,
    errorAction: Y.Nullish(TT),
    resource: Y.RefSchema,
    successAction: Y.Nullish(TT)
  })
]), pM = x_, U_ = A.Composite([
  F_,
  A.Object({
    __typename: A.Literal(`${Ro.CodeAction}`),
    code: A.String()
  })
]), fM = U_;
A.Union(
  [x_, U_],
  {
    discriminantKey: "__typename",
    errorMessage: "Unknown action type name"
  }
);
const yM = A.Union([pM, fM], {
  discriminantKey: "__typename",
  errorMessage: "Unknown action type name"
}), ic = A.Object({
  api: Y.Nullish(Y.RefSchema),
  // Sync with dto since some nested may need to match for extending
  data: A.Record(A.String(), A.Any()),
  id: A.String()
});
var Oa = /* @__PURE__ */ ((e) => (e.Atom = "Atom", e.Component = "Component", e))(Oa || {});
const lM = A.Union(
  [
    Y.DiscriminatedRef(
      "Atom"
      /* Atom */
    ),
    Y.DiscriminatedRef(
      "Component"
      /* Component */
    )
  ],
  { discriminantKey: "__typename" }
), oc = A.Object({
  childMapperComponent: Y.Nullish(Y.RefSchema),
  childMapperPreviousSibling: Y.Nullish(Y.RefSchema),
  childMapperPropKey: Y.Nullish(A.String()),
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
  closestContainerNode: Y.RefSchema,
  compositeKey: Y.Nullish(A.String()),
  firstChild: Y.Nullish(Y.RefSchema),
  id: A.String(),
  name: A.String(),
  nextSibling: Y.Nullish(Y.RefSchema),
  page: Y.Nullish(Y.RefSchema),
  parentComponent: Y.Nullish(Y.RefSchema),
  parentElement: Y.Nullish(Y.RefSchema),
  postRenderActions: Y.Nullish(A.Array(Y.RefSchema)),
  preRenderActions: Y.Nullish(A.Array(Y.RefSchema)),
  prevSibling: Y.Nullish(Y.RefSchema),
  // Treat element as aggregate, so we include prop data here
  props: wo,
  renderForEachPropKey: Y.Nullish(A.String()),
  renderIfExpression: Y.Nullish(A.String()),
  renderType: A.Omit(lM, ["name"]),
  style: Y.Nullish(A.String()),
  tailwindClassNames: Y.Nullish(A.Array(A.String()))
});
A.Composite([
  A.Object({
    /**
     * We have renderType here
     */
    // Can't use `IAtomType` due to circular import issue
    atom: A.Optional(A.Enum(up)),
    // Name of the Component
    component: A.Optional(A.String()),
    propsData: A.Optional(A.Object({}))
  }),
  A.Pick(oc, [
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
const mM = A.Object({
  ...oc.properties,
  props: wo
});
A.Object({
  ...oc.properties,
  props: ic
});
const TM = A.Object({
  activeConfigPaneTab: A.Enum(B_),
  builderBreakpointType: A.Enum($_),
  builderWidth: A.Number(),
  id: A.String()
});
A.Object({
  apps: A.Optional(A.Array(Y.RefSchema)),
  auth0Id: A.String(),
  email: A.String(),
  id: A.String(),
  name: A.String(),
  picture: A.String(),
  preferences: TM,
  roles: A.Array(A.Enum(j_)),
  username: A.String()
});
const D_ = A.Object({
  owner: Y.RefSchema
}), gM = A.Composite([
  D_,
  A.Object({
    __typename: A.Literal(`${Oa.Atom}`),
    api: Y.RefSchema,
    externalCssSource: Y.Nullish(A.String()),
    externalJsSource: Y.Nullish(A.String()),
    externalSourceType: Y.Nullish(A.String()),
    icon: Y.Nullish(A.String()),
    id: A.String(),
    name: A.String(),
    requiredParents: A.Optional(A.Array(Y.RefSchema)),
    suggestedChildren: A.Optional(A.Array(Y.RefSchema)),
    tags: A.Optional(A.Array(Y.RefSchema)),
    type: A.Enum(up)
  })
]), _M = A.Literal(
  `${Be}`
);
A.Transform(_M).Decode((e) => Be[e]).Encode((e) => e);
A.Object({
  __typename: A.String(),
  id: A.String(),
  kind: A.Enum(Be),
  name: A.String()
});
const wn = (e) => A.Object({
  /**
   * Needs to be optional since our Neo4j OGM returns only optional
   */
  __typename: A.Literal(e),
  id: A.String(),
  kind: A.Enum(Be),
  name: A.String(),
  owner: Y.RefSchema
}), bM = wn(`${Be.ActionType}`), v_ = A.Union(
  [
    Y.DiscriminatedRef(`${Be.ActionType}`),
    Y.DiscriminatedRef(`${Be.AppType}`),
    Y.DiscriminatedRef(`${Be.ArrayType}`),
    Y.DiscriminatedRef(`${Be.CodeMirrorType}`),
    Y.DiscriminatedRef(`${Be.ElementType}`),
    Y.DiscriminatedRef(`${Be.EnumType}`),
    Y.DiscriminatedRef(`${Be.InterfaceType}`),
    Y.DiscriminatedRef(`${Be.LambdaType}`),
    Y.DiscriminatedRef(`${Be.PageType}`),
    Y.DiscriminatedRef(`${Be.PrimitiveType}`),
    Y.DiscriminatedRef(`${Be.ReactNodeType}`),
    Y.DiscriminatedRef(`${Be.RenderPropType}`),
    Y.DiscriminatedRef(`${Be.RichTextType}`),
    Y.DiscriminatedRef(`${Be.UnionType}`)
  ],
  { discriminantKey: "__typename", errorMessage: "Unknown type" }
), IM = wn(`${Be.AppType}`), PM = A.Composite([
  wn(`${Be.ArrayType}`),
  A.Object({
    itemType: A.Optional(v_)
  })
]);
A.Object({
  __typename: A.Literal(`${Be}`),
  id: A.String(),
  kind: A.Enum(Be),
  name: A.String(),
  owner: Y.RefSchema
});
const OM = A.Composite([
  wn(`${Be.CodeMirrorType}`),
  A.Object({
    language: A.Enum(h_)
  })
]), AM = A.Composite([
  wn(`${Be.ElementType}`),
  A.Object({
    elementKind: A.Enum(M_)
  })
]), wM = A.Object({
  id: A.String(),
  key: A.String(),
  value: A.String()
}), RM = A.Composite([
  wn(`${Be.EnumType}`),
  A.Object({
    allowedValues: A.Array(wM)
  })
]), N_ = A.Composite([
  wn(`${Be.InterfaceType}`),
  A.Object({
    fields: A.Optional(A.Array(Y.RefSchema, { default: [] }))
  })
]);
Y.DiscriminatedRef(
  Be.InterfaceType
);
const $M = A.Composite([
  wn(`${Be.LambdaType}`)
]), hM = A.Composite([
  wn(`${Be.PageType}`)
]), BM = A.Composite([
  wn(`${Be.PrimitiveType}`),
  A.Object({
    primitiveKind: A.Enum(E_)
  })
]), MM = A.Composite([
  wn(`${Be.ReactNodeType}`)
]), SM = A.Composite([
  wn(`${Be.RenderPropType}`)
]), EM = A.Composite([
  wn(`${Be.RichTextType}`)
]), CM = A.Composite([
  wn(`${Be.UnionType}`),
  A.Object({
    typesOfUnionType: A.Array(v_)
  })
]), q_ = [
  bM,
  IM,
  PM,
  OM,
  AM,
  RM,
  N_,
  $M,
  hM,
  BM,
  MM,
  SM,
  EM,
  CM
];
A.Union(q_, {
  discriminantKey: "__typename",
  errorMessage: "Unknown type"
});
const uo = (e) => A.Omit(e, ["owner"]), L_ = A.Union(
  q_.map(uo),
  {
    discriminantKey: "__typename",
    errorMessage: "Unknown type"
  }
), K_ = A.Object({
  api: Y.RefSchema,
  defaultValues: Y.Nullish(A.Any()),
  description: Y.Nullish(A.String()),
  fieldType: Y.RefSchema,
  id: A.String(),
  key: A.String(),
  name: Y.Nullish(A.String()),
  nextSibling: Y.Nullish(Y.RefSchema),
  prevSibling: Y.Nullish(Y.RefSchema),
  validationRules: Y.Nullish(A.Any())
});
A.Omit(K_, ["owner"]);
const jM = A.Composite([
  A.Omit(N_, ["fields"]),
  A.Object({
    fields: A.Array(K_)
  })
]), cp = A.Composite([
  A.Object({
    types: A.Array(L_)
  }),
  uo(jM)
]), FM = A.Composite([
  A.Object({
    __typename: A.Literal(`${Oa.Atom}`)
  }),
  gM
]), xM = A.Object({
  api: cp,
  atom: uo(FM)
}), UM = A.Object({
  actions: A.Optional(A.Array(Y.RefSchema)),
  api: Y.RefSchema,
  component: Y.Nullish(Y.RefSchema),
  id: A.String(),
  name: A.String(),
  page: Y.Nullish(Y.RefSchema)
}), DM = A.Composite([
  A.Omit(UM, ["component", "page"]),
  A.Object({
    actions: A.Array(Y.RefSchema),
    api: Y.RefSchema
  })
]), V_ = A.Object({
  actions: A.Array(yM),
  api: cp,
  store: DM
}), G_ = A.Object({
  __typename: A.Literal(`${Oa.Component}`),
  api: Y.RefSchema,
  id: A.String(),
  name: A.String(),
  owner: Y.RefSchema,
  props: wo,
  rootElement: Y.RefSchema,
  store: Y.RefSchema
}), H_ = A.Object({
  api: cp,
  component: uo(G_),
  elements: A.Array(oc),
  store: V_
});
A.Object({
  ...G_.properties,
  __typename: A.Literal(`${Oa.Component}`),
  props: ic,
  slug: A.String()
});
const W_ = A.Object({
  children: A.Optional(A.Array(Y.RefSchema)),
  // This is computed property
  descendants: A.Optional(A.Array(Y.RefSchema)),
  id: A.String(),
  name: A.String(),
  owner: Y.RefSchema,
  parent: Y.Nullish(Y.RefSchema)
}), vM = W_;
A.Omit(W_, ["owner"]);
A.Object({
  atoms: A.Array(xM),
  components: A.Array(H_),
  // resources: Array<IResourceOutputDto>
  systemTypes: A.Array(L_),
  tags: A.Array(vM)
});
const z_ = A.Object({
  adminDataPath: A.String({
    default: "./data/export-v3"
  }),
  download: A.Optional(
    A.Boolean({
      default: !1
      // description: 'Saves to codebase if not downloading',
    })
  )
  // includeAdminData: Type.Optional(Type.Boolean({ default: true })),
  // includeUserData: Type.Optional(Type.Boolean()),
  // userDataPath: Type.Optional(Type.String()),
});
$g(z_);
const NM = A.Pick(z_, ["adminDataPath"]);
$g(NM);
const qM = A.Object({
  app: Y.RefSchema,
  /**
   * https://stackoverflow.com/a/74650249/2159920
   *
   * domainConfig: { misconfigured: boolean } | undefined
   */
  domainConfig: A.Union([
    A.Object({
      misconfigured: A.Boolean()
    }),
    A.Undefined()
  ]),
  id: A.String(),
  name: A.String()
}), k_ = qM, Y_ = A.Object({
  app: Y.RefSchema,
  /**
   * a pre-computed descendant elements ids
   */
  elements: A.Optional(A.Array(Y.RefSchema)),
  id: A.String(),
  kind: A.Enum(S_),
  name: A.String(),
  // The container element of the page
  pageContentContainer: Y.Nullish(Y.RefSchema),
  redirect: Y.Nullish(Y.RefSchema),
  rootElement: Y.RefSchema,
  store: Y.RefSchema,
  urlPattern: A.String()
}), LM = A.Object({
  elements: A.Array(mM),
  page: Y_,
  store: V_
}), KM = A.Composite([
  Y_,
  A.Object({
    slug: A.String()
  })
]), J_ = A.Object({
  config: wo,
  id: A.String(),
  name: A.String(),
  owner: Y.RefSchema,
  type: A.Enum(sp)
});
A.Object({
  config: ic,
  id: A.String(),
  name: A.String(),
  owner: Y.RefSchema,
  type: A.Enum(sp)
});
const VM = A.Object({
  headers: A.Optional(A.String()),
  url: A.String()
});
A.Object({
  ...J_.properties,
  config: VM
});
var Z_ = /* @__PURE__ */ ((e) => (e.DELETE = "DELETE", e.GET = "GET", e.HEAD = "HEAD", e.OPTION = "OPTION", e.PATCH = "PATCH", e.POST = "POST", e.PUT = "PUT", e))(Z_ || {}), Q_ = /* @__PURE__ */ ((e) => (e.ArrayBuffer = "arraybuffer", e.Blob = "blob", e.Document = "document", e.Json = "json", e.Stream = "stream", e.Text = "text", e))(Q_ || {});
const GM = A.Object({
  body: Y.Nullish(A.String()),
  headers: Y.Nullish(A.String()),
  method: A.Enum(Z_),
  queryParams: Y.Nullish(A.String()),
  responseType: A.Enum(Q_),
  urlSegment: A.String()
}), HM = A.Object({
  headers: Y.Nullish(A.String()),
  query: A.String(),
  variables: Y.Nullish(A.String())
});
A.Object({
  data: Y.Nullish(A.Any()),
  error: Y.Nullish(A.Any()),
  headers: Y.Nullish(A.Record(A.String(), A.Any())),
  status: Y.Nullish(A.Number()),
  statusText: Y.Nullish(A.String())
});
A.Union([
  GM,
  HM
]);
const X_ = A.Object({
  ...D_.properties,
  domains: A.Optional(A.Array(Y.RefSchema)),
  id: A.String(),
  name: A.String(),
  pages: A.Optional(A.Array(Y.RefSchema))
});
A.Object({
  app: uo(X_),
  components: A.Array(H_),
  domains: A.Array(k_),
  pages: A.Array(LM),
  resources: A.Array(uo(J_))
});
A.Object({
  ...X_.properties,
  domains: A.Optional(A.Array(k_)),
  pages: A.Optional(A.Array(KM))
});
const WM = A.Object({
  config: wo,
  id: A.String(),
  name: A.String(),
  owner: Y.RefSchema,
  resource: Y.RefSchema,
  responseTransformer: A.String()
});
A.Object({
  ...WM.properties,
  config: ic
});
A.Object({
  authGuard: Y.RefSchema,
  id: A.String(),
  source: Y.RefSchema,
  targetPage: Y.Nullish(Y.RefSchema),
  targetType: A.Enum(C_),
  targetUrl: Y.Nullish(A.String())
});
A.Object({
  authorization: Y.Nullish(A.String()),
  domain: A.String(),
  pageUrlPattern: A.String()
});
var Ts = { exports: {} }, zM = Ts.exports, gT;
function kM() {
  return gT || (gT = 1, function(e, n) {
    (function(r, i, o) {
      e.exports = o(), e.exports.default = o();
    })("slugify", zM, function() {
      var r = JSON.parse(`{"$":"dollar","%":"percent","&":"and","<":"less",">":"greater","|":"or","¢":"cent","£":"pound","¤":"currency","¥":"yen","©":"(c)","ª":"a","®":"(r)","º":"o","À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","þ":"th","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Č":"C","č":"c","Ď":"D","ď":"d","Đ":"DJ","đ":"dj","Ē":"E","ē":"e","Ė":"E","ė":"e","Ę":"e","ę":"e","Ě":"E","ě":"e","Ğ":"G","ğ":"g","Ģ":"G","ģ":"g","Ĩ":"I","ĩ":"i","Ī":"i","ī":"i","Į":"I","į":"i","İ":"I","ı":"i","Ķ":"k","ķ":"k","Ļ":"L","ļ":"l","Ľ":"L","ľ":"l","Ł":"L","ł":"l","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","Ō":"O","ō":"o","Ő":"O","ő":"o","Œ":"OE","œ":"oe","Ŕ":"R","ŕ":"r","Ř":"R","ř":"r","Ś":"S","ś":"s","Ş":"S","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","Ť":"T","ť":"t","Ũ":"U","ũ":"u","Ū":"u","ū":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","Ə":"E","ƒ":"f","Ơ":"O","ơ":"o","Ư":"U","ư":"u","ǈ":"LJ","ǉ":"lj","ǋ":"NJ","ǌ":"nj","Ș":"S","ș":"s","Ț":"T","ț":"t","ə":"e","˚":"o","Ά":"A","Έ":"E","Ή":"H","Ί":"I","Ό":"O","Ύ":"Y","Ώ":"W","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ϊ":"I","Ϋ":"Y","ά":"a","έ":"e","ή":"h","ί":"i","ΰ":"y","α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","ς":"s","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ϊ":"i","ϋ":"y","ό":"o","ύ":"y","ώ":"w","Ё":"Yo","Ђ":"DJ","Є":"Ye","І":"I","Ї":"Yi","Ј":"J","Љ":"LJ","Њ":"NJ","Ћ":"C","Џ":"DZ","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"U","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya","а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sh","ъ":"u","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","ё":"yo","ђ":"dj","є":"ye","і":"i","ї":"yi","ј":"j","љ":"lj","њ":"nj","ћ":"c","ѝ":"u","џ":"dz","Ґ":"G","ґ":"g","Ғ":"GH","ғ":"gh","Қ":"KH","қ":"kh","Ң":"NG","ң":"ng","Ү":"UE","ү":"ue","Ұ":"U","ұ":"u","Һ":"H","һ":"h","Ә":"AE","ә":"ae","Ө":"OE","ө":"oe","Ա":"A","Բ":"B","Գ":"G","Դ":"D","Ե":"E","Զ":"Z","Է":"E'","Ը":"Y'","Թ":"T'","Ժ":"JH","Ի":"I","Լ":"L","Խ":"X","Ծ":"C'","Կ":"K","Հ":"H","Ձ":"D'","Ղ":"GH","Ճ":"TW","Մ":"M","Յ":"Y","Ն":"N","Շ":"SH","Չ":"CH","Պ":"P","Ջ":"J","Ռ":"R'","Ս":"S","Վ":"V","Տ":"T","Ր":"R","Ց":"C","Փ":"P'","Ք":"Q'","Օ":"O''","Ֆ":"F","և":"EV","ء":"a","آ":"aa","أ":"a","ؤ":"u","إ":"i","ئ":"e","ا":"a","ب":"b","ة":"h","ت":"t","ث":"th","ج":"j","ح":"h","خ":"kh","د":"d","ذ":"th","ر":"r","ز":"z","س":"s","ش":"sh","ص":"s","ض":"dh","ط":"t","ظ":"z","ع":"a","غ":"gh","ف":"f","ق":"q","ك":"k","ل":"l","م":"m","ن":"n","ه":"h","و":"w","ى":"a","ي":"y","ً":"an","ٌ":"on","ٍ":"en","َ":"a","ُ":"u","ِ":"e","ْ":"","٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","پ":"p","چ":"ch","ژ":"zh","ک":"k","گ":"g","ی":"y","۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9","฿":"baht","ა":"a","ბ":"b","გ":"g","დ":"d","ე":"e","ვ":"v","ზ":"z","თ":"t","ი":"i","კ":"k","ლ":"l","მ":"m","ნ":"n","ო":"o","პ":"p","ჟ":"zh","რ":"r","ს":"s","ტ":"t","უ":"u","ფ":"f","ქ":"k","ღ":"gh","ყ":"q","შ":"sh","ჩ":"ch","ც":"ts","ძ":"dz","წ":"ts","ჭ":"ch","ხ":"kh","ჯ":"j","ჰ":"h","Ṣ":"S","ṣ":"s","Ẁ":"W","ẁ":"w","Ẃ":"W","ẃ":"w","Ẅ":"W","ẅ":"w","ẞ":"SS","Ạ":"A","ạ":"a","Ả":"A","ả":"a","Ấ":"A","ấ":"a","Ầ":"A","ầ":"a","Ẩ":"A","ẩ":"a","Ẫ":"A","ẫ":"a","Ậ":"A","ậ":"a","Ắ":"A","ắ":"a","Ằ":"A","ằ":"a","Ẳ":"A","ẳ":"a","Ẵ":"A","ẵ":"a","Ặ":"A","ặ":"a","Ẹ":"E","ẹ":"e","Ẻ":"E","ẻ":"e","Ẽ":"E","ẽ":"e","Ế":"E","ế":"e","Ề":"E","ề":"e","Ể":"E","ể":"e","Ễ":"E","ễ":"e","Ệ":"E","ệ":"e","Ỉ":"I","ỉ":"i","Ị":"I","ị":"i","Ọ":"O","ọ":"o","Ỏ":"O","ỏ":"o","Ố":"O","ố":"o","Ồ":"O","ồ":"o","Ổ":"O","ổ":"o","Ỗ":"O","ỗ":"o","Ộ":"O","ộ":"o","Ớ":"O","ớ":"o","Ờ":"O","ờ":"o","Ở":"O","ở":"o","Ỡ":"O","ỡ":"o","Ợ":"O","ợ":"o","Ụ":"U","ụ":"u","Ủ":"U","ủ":"u","Ứ":"U","ứ":"u","Ừ":"U","ừ":"u","Ử":"U","ử":"u","Ữ":"U","ữ":"u","Ự":"U","ự":"u","Ỳ":"Y","ỳ":"y","Ỵ":"Y","ỵ":"y","Ỷ":"Y","ỷ":"y","Ỹ":"Y","ỹ":"y","–":"-","‘":"'","’":"'","“":"\\"","”":"\\"","„":"\\"","†":"+","•":"*","…":"...","₠":"ecu","₢":"cruzeiro","₣":"french franc","₤":"lira","₥":"mill","₦":"naira","₧":"peseta","₨":"rupee","₩":"won","₪":"new shequel","₫":"dong","€":"euro","₭":"kip","₮":"tugrik","₯":"drachma","₰":"penny","₱":"peso","₲":"guarani","₳":"austral","₴":"hryvnia","₵":"cedi","₸":"kazakhstani tenge","₹":"indian rupee","₺":"turkish lira","₽":"russian ruble","₿":"bitcoin","℠":"sm","™":"tm","∂":"d","∆":"delta","∑":"sum","∞":"infinity","♥":"love","元":"yuan","円":"yen","﷼":"rial","ﻵ":"laa","ﻷ":"laa","ﻹ":"lai","ﻻ":"la"}`), i = JSON.parse('{"bg":{"Й":"Y","Ц":"Ts","Щ":"Sht","Ъ":"A","Ь":"Y","й":"y","ц":"ts","щ":"sht","ъ":"a","ь":"y"},"de":{"Ä":"AE","ä":"ae","Ö":"OE","ö":"oe","Ü":"UE","ü":"ue","ß":"ss","%":"prozent","&":"und","|":"oder","∑":"summe","∞":"unendlich","♥":"liebe"},"es":{"%":"por ciento","&":"y","<":"menor que",">":"mayor que","|":"o","¢":"centavos","£":"libras","¤":"moneda","₣":"francos","∑":"suma","∞":"infinito","♥":"amor"},"fr":{"%":"pourcent","&":"et","<":"plus petit",">":"plus grand","|":"ou","¢":"centime","£":"livre","¤":"devise","₣":"franc","∑":"somme","∞":"infini","♥":"amour"},"pt":{"%":"porcento","&":"e","<":"menor",">":"maior","|":"ou","¢":"centavo","∑":"soma","£":"libra","∞":"infinito","♥":"amor"},"uk":{"И":"Y","и":"y","Й":"Y","й":"y","Ц":"Ts","ц":"ts","Х":"Kh","х":"kh","Щ":"Shch","щ":"shch","Г":"H","г":"h"},"vi":{"Đ":"D","đ":"d"},"da":{"Ø":"OE","ø":"oe","Å":"AA","å":"aa","%":"procent","&":"og","|":"eller","$":"dollar","<":"mindre end",">":"større end"},"nb":{"&":"og","Å":"AA","Æ":"AE","Ø":"OE","å":"aa","æ":"ae","ø":"oe"},"it":{"&":"e"},"nl":{"&":"en"},"sv":{"&":"och","Å":"AA","Ä":"AE","Ö":"OE","å":"aa","ä":"ae","ö":"oe"}}');
      function o(t, a) {
        if (typeof t != "string")
          throw new Error("slugify: string argument expected");
        a = typeof a == "string" ? { replacement: a } : a || {};
        var u = i[a.locale] || {}, d = a.replacement === void 0 ? "-" : a.replacement, s = a.trim === void 0 ? !0 : a.trim, f = t.normalize().split("").reduce(function(c, y) {
          var w = u[y];
          return w === void 0 && (w = r[y]), w === void 0 && (w = y), w === d && (w = " "), c + w.replace(a.remove || /[^\w\s$*_+~.()'"!\-:@]+/g, "");
        }, "");
        return a.strict && (f = f.replace(/[^A-Za-z0-9\s]/g, "")), s && (f = f.trim()), f = f.replace(/\s+/g, d), a.lower && (f = f.toLowerCase()), f;
      }
      return o.extend = function(t) {
        Object.assign(r, t);
      }, o;
    });
  }(Ts)), Ts.exports;
}
kM();
var Oc = {}, _T;
function YM() {
  if (_T) return Oc;
  _T = 1;
  const e = [
    { regex: /^\s+/, tokenType: "WHITESPACE" },
    { regex: /^[{}]/, tokenType: "BRACE" },
    { regex: /^[[\]]/, tokenType: "BRACKET" },
    { regex: /^:/, tokenType: "COLON" },
    { regex: /^,/, tokenType: "COMMA" },
    { regex: /^-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/i, tokenType: "NUMBER_LITERAL" },
    { regex: /^"(?:\\.|[^"\\])*"(?=\s*:)/, tokenType: "STRING_KEY" },
    { regex: /^"(?:\\.|[^"\\])*"/, tokenType: "STRING_LITERAL" },
    { regex: /^true|^false/, tokenType: "BOOLEAN_LITERAL" },
    { regex: /^null/, tokenType: "NULL_LITERAL" }
  ];
  Oc.getTokens = function(i, o = {}) {
    let t;
    if (o.pretty) {
      const d = typeof i == "string" ? JSON.parse(i) : i;
      t = JSON.stringify(d, null, 2);
    } else
      t = typeof i == "string" ? i : JSON.stringify(i);
    let a = [], u;
    do {
      u = !1;
      for (let d = 0; d < e.length; d++) {
        const s = e[d].regex.exec(t);
        if (s) {
          a.push({ type: e[d].tokenType, value: s[0] }), t = t.substring(s[0].length), u = !0;
          break;
        }
      }
    } while (n(t, u));
    return a;
  };
  function n(r, i) {
    return (r || {}).length > 0 && i;
  }
  return Oc;
}
var Ac = {}, ge = {};
const eb = {}, JM = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: eb
}, Symbol.toStringTag, { value: "Module" })), ZM = /* @__PURE__ */ oh(JM);
var bT;
function QM() {
  if (bT) return ge;
  bT = 1, Object.defineProperty(ge, "__esModule", { value: !0 });
  var e = ZM;
  function n(oe) {
    if (oe && oe.__esModule) return oe;
    var be = /* @__PURE__ */ Object.create(null);
    return oe && Object.keys(oe).forEach(function(Ue) {
      if (Ue !== "default") {
        var Me = Object.getOwnPropertyDescriptor(oe, Ue);
        Object.defineProperty(be, Ue, Me.get ? Me : {
          enumerable: !0,
          get: function() {
            return oe[Ue];
          }
        });
      }
    }), be.default = oe, Object.freeze(be);
  }
  var r = /* @__PURE__ */ n(e);
  const {
    env: i = {},
    argv: o = [],
    platform: t = ""
  } = typeof process > "u" ? {} : process, a = "NO_COLOR" in i || o.includes("--no-color"), u = "FORCE_COLOR" in i || o.includes("--color"), d = t === "win32", s = i.TERM === "dumb", f = r && r.isatty && r.isatty(1) && i.TERM && !s, c = "CI" in i && ("GITHUB_ACTIONS" in i || "GITLAB_CI" in i || "CIRCLECI" in i), y = !a && (u || d && !s || f || c), w = (oe, be, Ue, Me, b = be.substring(0, oe) + Me, Pe = be.substring(oe + Ue.length), an = Pe.indexOf(Ue)) => b + (an < 0 ? Pe : w(an, Pe, Ue, Me)), h = (oe, be, Ue, Me, b) => oe < 0 ? Ue + be + Me : Ue + w(oe, be, Me, b) + Me, M = (oe, be, Ue = oe, Me = oe.length + 1) => (b) => b || !(b === "" || b === void 0) ? h(
    ("" + b).indexOf(be, Me),
    b,
    oe,
    be,
    Ue
  ) : "", U = (oe, be, Ue) => M(`\x1B[${oe}m`, `\x1B[${be}m`, Ue), F = {
    reset: U(0, 0),
    bold: U(1, 22, "\x1B[22m\x1B[1m"),
    dim: U(2, 22, "\x1B[22m\x1B[2m"),
    italic: U(3, 23),
    underline: U(4, 24),
    inverse: U(7, 27),
    hidden: U(8, 28),
    strikethrough: U(9, 29),
    black: U(30, 39),
    red: U(31, 39),
    green: U(32, 39),
    yellow: U(33, 39),
    blue: U(34, 39),
    magenta: U(35, 39),
    cyan: U(36, 39),
    white: U(37, 39),
    gray: U(90, 39),
    bgBlack: U(40, 49),
    bgRed: U(41, 49),
    bgGreen: U(42, 49),
    bgYellow: U(43, 49),
    bgBlue: U(44, 49),
    bgMagenta: U(45, 49),
    bgCyan: U(46, 49),
    bgWhite: U(47, 49),
    blackBright: U(90, 39),
    redBright: U(91, 39),
    greenBright: U(92, 39),
    yellowBright: U(93, 39),
    blueBright: U(94, 39),
    magentaBright: U(95, 39),
    cyanBright: U(96, 39),
    whiteBright: U(97, 39),
    bgBlackBright: U(100, 49),
    bgRedBright: U(101, 49),
    bgGreenBright: U(102, 49),
    bgYellowBright: U(103, 49),
    bgBlueBright: U(104, 49),
    bgMagentaBright: U(105, 49),
    bgCyanBright: U(106, 49),
    bgWhiteBright: U(107, 49)
  }, C = ({ useColor: oe = y } = {}) => oe ? F : Object.keys(F).reduce(
    (be, Ue) => ({ ...be, [Ue]: String }),
    {}
  ), {
    reset: G,
    bold: $,
    dim: _,
    italic: x,
    underline: T,
    inverse: P,
    hidden: R,
    strikethrough: l,
    black: B,
    red: S,
    green: q,
    yellow: V,
    blue: k,
    magenta: ne,
    cyan: re,
    white: W,
    gray: we,
    bgBlack: xe,
    bgRed: Le,
    bgGreen: Ne,
    bgYellow: Ke,
    bgBlue: Re,
    bgMagenta: Ge,
    bgCyan: Q,
    bgWhite: ee,
    blackBright: Ie,
    redBright: Ae,
    greenBright: X,
    yellowBright: J,
    blueBright: D,
    magentaBright: m,
    cyanBright: g,
    whiteBright: E,
    bgBlackBright: H,
    bgRedBright: p,
    bgGreenBright: Z,
    bgYellowBright: L,
    bgBlueBright: j,
    bgMagentaBright: se,
    bgCyanBright: te,
    bgWhiteBright: fe
  } = C();
  return ge.bgBlack = xe, ge.bgBlackBright = H, ge.bgBlue = Re, ge.bgBlueBright = j, ge.bgCyan = Q, ge.bgCyanBright = te, ge.bgGreen = Ne, ge.bgGreenBright = Z, ge.bgMagenta = Ge, ge.bgMagentaBright = se, ge.bgRed = Le, ge.bgRedBright = p, ge.bgWhite = ee, ge.bgWhiteBright = fe, ge.bgYellow = Ke, ge.bgYellowBright = L, ge.black = B, ge.blackBright = Ie, ge.blue = k, ge.blueBright = D, ge.bold = $, ge.createColors = C, ge.cyan = re, ge.cyanBright = g, ge.dim = _, ge.gray = we, ge.green = q, ge.greenBright = X, ge.hidden = R, ge.inverse = P, ge.isColorSupported = y, ge.italic = x, ge.magenta = ne, ge.magentaBright = m, ge.red = S, ge.redBright = Ae, ge.reset = G, ge.strikethrough = l, ge.underline = T, ge.white = W, ge.whiteBright = E, ge.yellow = V, ge.yellowBright = J, ge;
}
var IT;
function XM() {
  if (IT) return Ac;
  IT = 1;
  const e = QM(), n = {
    BRACE: "greenBright",
    BRACKET: "blueBright",
    COLON: "gray",
    COMMA: "gray",
    STRING_KEY: "redBright",
    STRING_LITERAL: "greenBright",
    NUMBER_LITERAL: "yellow",
    BOOLEAN_LITERAL: "cyan",
    NULL_LITERAL: "white"
  };
  return Ac.colorize = function(i, o = {}) {
    const t = o.colors || {};
    return i.reduce((a, u) => {
      const d = t[u.type] || n[u.type], s = d && e[d];
      return a + (s ? s(u.value) : u.value);
    }, "");
  }, Ac;
}
var wc, PT;
function eS() {
  if (PT) return wc;
  PT = 1;
  const e = YM(), n = XM();
  return wc = function(i, o) {
    return n.colorize(e.getTokens(i, o), o);
  }, wc;
}
var nS = eS();
const tS = /* @__PURE__ */ ih(nS), sS = (e) => {
  if (typeof e != "number")
    throw new Error("Timestamp needs to be type number");
  return new Date(e).toLocaleString("en-US", {
    day: "2-digit",
    hour: "numeric",
    hour12: !0,
    minute: "2-digit",
    month: "2-digit",
    second: "2-digit",
    year: "numeric"
  });
}, cS = (e) => {
  const n = typeof e == "object" ? rb(e) : e;
  return tS(n, {
    colors: {
      BOOLEAN_LITERAL: "white",
      BRACE: "white",
      BRACKET: "white",
      COLON: "white",
      COMMA: "white",
      NULL_LITERAL: "white",
      NUMBER_LITERAL: "white",
      STRING_KEY: "white",
      STRING_LITERAL: "green"
    }
  });
}, dS = (e, n = "", r) => {
  if (r) {
    console.debug(`[${e}]:`, n, eb.inspect(r, !1, null, !0));
    return;
  }
  console.debug(`[${e}]:`, n);
}, pS = (e) => {
  console.log("---------------------"), console.log(`${e}...`), console.log("---------------------");
};
class rS {
  info(...n) {
    const r = this.formatMessage(...n);
    console.info(...r);
  }
  error(...n) {
    const r = this.formatMessage(...n);
    console.error(...r);
  }
  warn(...n) {
    const r = this.formatMessage(...n);
    console.warn(...r);
  }
  debug(...n) {
    const r = this.formatMessage(...n);
    console.debug(...r);
  }
  /**
   * Format messages without stringifying complex objects to avoid circular reference errors
   */
  formatMessage(...n) {
    return n.map((r) => {
      if (r && typeof r == "object")
        try {
          return JSON.stringify(r, null, 2);
        } catch {
          return r;
        }
      return r;
    });
  }
}
const fS = new rS(), iS = () => new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  hour12: !0,
  minute: "2-digit",
  second: "2-digit",
  timeZone: "Asia/Hong_Kong"
}).format(/* @__PURE__ */ new Date()), oS = () => new Intl.DateTimeFormat("en-US", {
  fractionalSecondDigits: 2,
  hour: "numeric",
  hour12: !0,
  minute: "2-digit",
  second: "2-digit",
  timeZone: "Asia/Hong_Kong"
}).format(/* @__PURE__ */ new Date()), yS = (e) => {
  console.log(`[${iS()}] ${e}`);
}, lS = (e) => {
  console.log(`[${oS()}] ${e}`);
};
export {
  cS as colorize,
  sS as formatNestLikeDate,
  iS as getTimestamp,
  oS as getTimestampMs,
  pS as logSection,
  dS as logTask,
  yS as logTimestamp,
  lS as logTimestampMs,
  fS as logger
};
