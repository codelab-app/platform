var Qb = Object.defineProperty;
var Xb = (e, r, t) => r in e ? Qb(e, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[r] = t;
var Vs = (e, r, t) => Xb(e, typeof r != "symbol" ? r + "" : r, t);
function kb(e) {
  return Ge(e) && !yr(e) && !Bo(e) && Symbol.asyncIterator in e;
}
function yr(e) {
  return Array.isArray(e);
}
function Gm(e) {
  return typeof e == "bigint";
}
function vo(e) {
  return typeof e == "boolean";
}
function la(e) {
  return e instanceof globalThis.Date;
}
function eI(e) {
  return typeof e == "function";
}
function rI(e) {
  return Ge(e) && !yr(e) && !Bo(e) && Symbol.iterator in e;
}
function nI(e) {
  return e === null;
}
function cn(e) {
  return typeof e == "number";
}
function Ge(e) {
  return typeof e == "object" && e !== null;
}
function Hm(e) {
  return e instanceof globalThis.RegExp;
}
function De(e) {
  return typeof e == "string";
}
function tI(e) {
  return typeof e == "symbol";
}
function Bo(e) {
  return e instanceof globalThis.Uint8Array;
}
function Ye(e) {
  return e === void 0;
}
function iI(e) {
  return e.map((r) => kc(r));
}
function oI(e) {
  return new Date(e.getTime());
}
function uI(e) {
  return new Uint8Array(e);
}
function cI(e) {
  return new RegExp(e.source, e.flags);
}
function sI(e) {
  const r = {};
  for (const t of Object.getOwnPropertyNames(e))
    r[t] = kc(e[t]);
  for (const t of Object.getOwnPropertySymbols(e))
    r[t] = kc(e[t]);
  return r;
}
function kc(e) {
  return yr(e) ? iI(e) : la(e) ? oI(e) : Bo(e) ? uI(e) : Hm(e) ? cI(e) : Ge(e) ? sI(e) : e;
}
function xr(e) {
  return kc(e);
}
function aI(e, r) {
  return xr(e);
}
function fI(e) {
  return ts(e) && Symbol.asyncIterator in e;
}
function dI(e) {
  return ts(e) && Symbol.iterator in e;
}
function lI(e) {
  return e instanceof Promise;
}
function zm(e) {
  return e instanceof Date && Number.isFinite(e.getTime());
}
function Wm(e) {
  return e instanceof globalThis.Uint8Array;
}
function ts(e) {
  return e !== null && typeof e == "object";
}
function is(e) {
  return Array.isArray(e) && !ArrayBuffer.isView(e);
}
function pa(e) {
  return e === void 0;
}
function Ym(e) {
  return e === null;
}
function Jm(e) {
  return typeof e == "boolean";
}
function Hi(e) {
  return typeof e == "number";
}
function pI(e) {
  return Number.isInteger(e);
}
function Zm(e) {
  return typeof e == "bigint";
}
function os(e) {
  return typeof e == "string";
}
function yI(e) {
  return typeof e == "function";
}
function Qm(e) {
  return typeof e == "symbol";
}
var sn;
(function(e) {
  e.InstanceMode = "default", e.ExactOptionalPropertyTypes = !1, e.AllowArrayObject = !1, e.AllowNaN = !1, e.AllowNullVoid = !1;
  function r(u, c) {
    return e.ExactOptionalPropertyTypes ? c in u : u[c] !== void 0;
  }
  e.IsExactOptionalProperty = r;
  function t(u) {
    const c = ts(u);
    return e.AllowArrayObject ? c : c && !is(u);
  }
  e.IsObjectLike = t;
  function o(u) {
    return t(u) && !(u instanceof Date) && !(u instanceof Uint8Array);
  }
  e.IsRecordLike = o;
  function i(u) {
    return e.AllowNaN ? Hi(u) : Number.isFinite(u);
  }
  e.IsNumberLike = i;
  function n(u) {
    const c = pa(u);
    return e.AllowNullVoid ? c || u === null : c;
  }
  e.IsVoidLike = n;
})(sn || (sn = {}));
function mI(e) {
  return globalThis.Object.freeze(e).map((r) => es(r));
}
function _I(e) {
  const r = {};
  for (const t of Object.getOwnPropertyNames(e))
    r[t] = es(e[t]);
  for (const t of Object.getOwnPropertySymbols(e))
    r[t] = es(e[t]);
  return globalThis.Object.freeze(r);
}
function es(e) {
  return yr(e) ? mI(e) : la(e) ? e : Bo(e) ? e : Hm(e) ? e : Ge(e) ? _I(e) : e;
}
function te(e, r) {
  const t = r !== void 0 ? { ...r, ...e } : e;
  switch (sn.InstanceMode) {
    case "freeze":
      return es(t);
    case "clone":
      return xr(t);
    default:
      return t;
  }
}
class Vr extends Error {
  constructor(r) {
    super(r);
  }
}
const Lr = Symbol.for("TypeBox.Transform"), Do = Symbol.for("TypeBox.Readonly"), dn = Symbol.for("TypeBox.Optional"), us = Symbol.for("TypeBox.Hint"), re = Symbol.for("TypeBox.Kind");
function Xm(e) {
  return Ge(e) && e[Do] === "Readonly";
}
function wi(e) {
  return Ge(e) && e[dn] === "Optional";
}
function km(e) {
  return $e(e, "Any");
}
function Lo(e) {
  return $e(e, "Array");
}
function ya(e) {
  return $e(e, "AsyncIterator");
}
function e_(e) {
  return $e(e, "BigInt");
}
function r_(e) {
  return $e(e, "Boolean");
}
function In(e) {
  return $e(e, "Computed");
}
function ma(e) {
  return $e(e, "Constructor");
}
function bI(e) {
  return $e(e, "Date");
}
function _a(e) {
  return $e(e, "Function");
}
function cs(e) {
  return $e(e, "Integer");
}
function hr(e) {
  return $e(e, "Intersect");
}
function ba(e) {
  return $e(e, "Iterator");
}
function $e(e, r) {
  return Ge(e) && re in e && e[re] === r;
}
function n_(e) {
  return vo(e) || cn(e) || De(e);
}
function Vo(e) {
  return $e(e, "Literal");
}
function xi(e) {
  return $e(e, "MappedKey");
}
function Or(e) {
  return $e(e, "MappedResult");
}
function Go(e) {
  return $e(e, "Never");
}
function II(e) {
  return $e(e, "Not");
}
function OI(e) {
  return $e(e, "Null");
}
function ss(e) {
  return $e(e, "Number");
}
function Gr(e) {
  return $e(e, "Object");
}
function Ia(e) {
  return $e(e, "Promise");
}
function t_(e) {
  return $e(e, "Record");
}
function lr(e) {
  return $e(e, "Ref");
}
function i_(e) {
  return $e(e, "RegExp");
}
function Oa(e) {
  return $e(e, "String");
}
function gI(e) {
  return $e(e, "Symbol");
}
function Ri(e) {
  return $e(e, "TemplateLiteral");
}
function PI(e) {
  return $e(e, "This");
}
function ga(e) {
  return Ge(e) && Lr in e;
}
function Zi(e) {
  return $e(e, "Tuple");
}
function jI(e) {
  return $e(e, "Undefined");
}
function er(e) {
  return $e(e, "Union");
}
function TI(e) {
  return $e(e, "Uint8Array");
}
function $I(e) {
  return $e(e, "Unknown");
}
function FI(e) {
  return $e(e, "Unsafe");
}
function wI(e) {
  return $e(e, "Void");
}
function xI(e) {
  return Ge(e) && re in e && De(e[re]);
}
function un(e) {
  return km(e) || Lo(e) || r_(e) || e_(e) || ya(e) || In(e) || ma(e) || bI(e) || _a(e) || cs(e) || hr(e) || ba(e) || Vo(e) || xi(e) || Or(e) || Go(e) || II(e) || OI(e) || ss(e) || Gr(e) || Ia(e) || t_(e) || lr(e) || i_(e) || Oa(e) || gI(e) || Ri(e) || PI(e) || Zi(e) || jI(e) || er(e) || TI(e) || $I(e) || FI(e) || wI(e) || xI(e);
}
const RI = [
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
function o_(e) {
  try {
    return new RegExp(e), !0;
  } catch {
    return !1;
  }
}
function Pa(e) {
  if (!De(e))
    return !1;
  for (let r = 0; r < e.length; r++) {
    const t = e.charCodeAt(r);
    if (t >= 7 && t <= 13 || t === 27 || t === 127)
      return !1;
  }
  return !0;
}
function u_(e) {
  return ja(e) || ke(e);
}
function lo(e) {
  return Ye(e) || Gm(e);
}
function Ee(e) {
  return Ye(e) || cn(e);
}
function ja(e) {
  return Ye(e) || vo(e);
}
function Re(e) {
  return Ye(e) || De(e);
}
function MI(e) {
  return Ye(e) || De(e) && Pa(e) && o_(e);
}
function SI(e) {
  return Ye(e) || De(e) && Pa(e);
}
function c_(e) {
  return Ye(e) || ke(e);
}
function rs(e) {
  return Ge(e) && e[dn] === "Optional";
}
function Ur(e) {
  return Fe(e, "Any") && Re(e.$id);
}
function Mi(e) {
  return Fe(e, "Array") && e.type === "array" && Re(e.$id) && ke(e.items) && Ee(e.minItems) && Ee(e.maxItems) && ja(e.uniqueItems) && c_(e.contains) && Ee(e.minContains) && Ee(e.maxContains);
}
function Ta(e) {
  return Fe(e, "AsyncIterator") && e.type === "AsyncIterator" && Re(e.$id) && ke(e.items);
}
function as(e) {
  return Fe(e, "BigInt") && e.type === "bigint" && Re(e.$id) && lo(e.exclusiveMaximum) && lo(e.exclusiveMinimum) && lo(e.maximum) && lo(e.minimum) && lo(e.multipleOf);
}
function Si(e) {
  return Fe(e, "Boolean") && e.type === "boolean" && Re(e.$id);
}
function EI(e) {
  return Fe(e, "Computed") && De(e.target) && yr(e.parameters) && e.parameters.every((r) => ke(r));
}
function fs(e) {
  return Fe(e, "Constructor") && e.type === "Constructor" && Re(e.$id) && yr(e.parameters) && e.parameters.every((r) => ke(r)) && ke(e.returns);
}
function ds(e) {
  return Fe(e, "Date") && e.type === "Date" && Re(e.$id) && Ee(e.exclusiveMaximumTimestamp) && Ee(e.exclusiveMinimumTimestamp) && Ee(e.maximumTimestamp) && Ee(e.minimumTimestamp) && Ee(e.multipleOfTimestamp);
}
function ls(e) {
  return Fe(e, "Function") && e.type === "Function" && Re(e.$id) && yr(e.parameters) && e.parameters.every((r) => ke(r)) && ke(e.returns);
}
function ln(e) {
  return Fe(e, "Integer") && e.type === "integer" && Re(e.$id) && Ee(e.exclusiveMaximum) && Ee(e.exclusiveMinimum) && Ee(e.maximum) && Ee(e.minimum) && Ee(e.multipleOf);
}
function s_(e) {
  return Ge(e) && Object.entries(e).every(([r, t]) => Pa(r) && ke(t));
}
function Ei(e) {
  return Fe(e, "Intersect") && !(De(e.type) && e.type !== "object") && yr(e.allOf) && e.allOf.every((r) => ke(r) && !hI(r)) && Re(e.type) && (ja(e.unevaluatedProperties) || c_(e.unevaluatedProperties)) && Re(e.$id);
}
function $a(e) {
  return Fe(e, "Iterator") && e.type === "Iterator" && Re(e.$id) && ke(e.items);
}
function Fe(e, r) {
  return Ge(e) && re in e && e[re] === r;
}
function a_(e) {
  return On(e) && De(e.const);
}
function f_(e) {
  return On(e) && cn(e.const);
}
function d_(e) {
  return On(e) && vo(e.const);
}
function On(e) {
  return Fe(e, "Literal") && Re(e.$id) && AI(e.const);
}
function AI(e) {
  return vo(e) || cn(e) || De(e);
}
function CI(e) {
  return Fe(e, "MappedKey") && yr(e.keys) && e.keys.every((r) => cn(r) || De(r));
}
function UI(e) {
  return Fe(e, "MappedResult") && s_(e.properties);
}
function gn(e) {
  return Fe(e, "Never") && Ge(e.not) && Object.getOwnPropertyNames(e.not).length === 0;
}
function Wi(e) {
  return Fe(e, "Not") && ke(e.not);
}
function Fa(e) {
  return Fe(e, "Null") && e.type === "null" && Re(e.$id);
}
function dr(e) {
  return Fe(e, "Number") && e.type === "number" && Re(e.$id) && Ee(e.exclusiveMaximum) && Ee(e.exclusiveMinimum) && Ee(e.maximum) && Ee(e.minimum) && Ee(e.multipleOf);
}
function ve(e) {
  return Fe(e, "Object") && e.type === "object" && Re(e.$id) && s_(e.properties) && u_(e.additionalProperties) && Ee(e.minProperties) && Ee(e.maxProperties);
}
function wa(e) {
  return Fe(e, "Promise") && e.type === "Promise" && Re(e.$id) && ke(e.item);
}
function Xe(e) {
  return Fe(e, "Record") && e.type === "object" && Re(e.$id) && u_(e.additionalProperties) && Ge(e.patternProperties) && ((r) => {
    const t = Object.getOwnPropertyNames(r.patternProperties);
    return t.length === 1 && o_(t[0]) && Ge(r.patternProperties) && ke(r.patternProperties[t[0]]);
  })(e);
}
function qI(e) {
  return Fe(e, "Ref") && Re(e.$id) && De(e.$ref);
}
function So(e) {
  return Fe(e, "RegExp") && Re(e.$id) && De(e.source) && De(e.flags) && Ee(e.maxLength) && Ee(e.minLength);
}
function qr(e) {
  return Fe(e, "String") && e.type === "string" && Re(e.$id) && Ee(e.minLength) && Ee(e.maxLength) && MI(e.pattern) && SI(e.format);
}
function Eo(e) {
  return Fe(e, "Symbol") && e.type === "symbol" && Re(e.$id);
}
function Ao(e) {
  return Fe(e, "TemplateLiteral") && e.type === "string" && De(e.pattern) && e.pattern[0] === "^" && e.pattern[e.pattern.length - 1] === "$";
}
function NI(e) {
  return Fe(e, "This") && Re(e.$id) && De(e.$ref);
}
function hI(e) {
  return Ge(e) && Lr in e;
}
function ps(e) {
  return Fe(e, "Tuple") && e.type === "array" && Re(e.$id) && cn(e.minItems) && cn(e.maxItems) && e.minItems === e.maxItems && // empty
  (Ye(e.items) && Ye(e.additionalItems) && e.minItems === 0 || yr(e.items) && e.items.every((r) => ke(r)));
}
function Fi(e) {
  return Fe(e, "Undefined") && e.type === "undefined" && Re(e.$id);
}
function an(e) {
  return Fe(e, "Union") && Re(e.$id) && Ge(e) && yr(e.anyOf) && e.anyOf.every((r) => ke(r));
}
function Ho(e) {
  return Fe(e, "Uint8Array") && e.type === "Uint8Array" && Re(e.$id) && Ee(e.minByteLength) && Ee(e.maxByteLength);
}
function Nr(e) {
  return Fe(e, "Unknown") && Re(e.$id);
}
function KI(e) {
  return Fe(e, "Unsafe");
}
function ys(e) {
  return Fe(e, "Void") && e.type === "void" && Re(e.$id);
}
function vI(e) {
  return Ge(e) && re in e && De(e[re]) && !RI.includes(e[re]);
}
function ke(e) {
  return Ge(e) && (Ur(e) || Mi(e) || Si(e) || as(e) || Ta(e) || EI(e) || fs(e) || ds(e) || ls(e) || ln(e) || Ei(e) || $a(e) || On(e) || CI(e) || UI(e) || gn(e) || Wi(e) || Fa(e) || dr(e) || ve(e) || wa(e) || Xe(e) || qI(e) || So(e) || qr(e) || Eo(e) || Ao(e) || NI(e) || ps(e) || Fi(e) || an(e) || Ho(e) || Nr(e) || KI(e) || ys(e) || vI(e));
}
const BI = "(true|false)", Xc = "(0|[1-9][0-9]*)", l_ = "(.*)", DI = "(?!.*)", Co = `^${Xc}$`, Uo = `^${l_}$`, LI = `^${DI}$`, xa = /* @__PURE__ */ new Map();
function VI(e) {
  return xa.has(e);
}
function GI(e, r) {
  xa.set(e, r);
}
function HI(e) {
  return xa.get(e);
}
const Ra = /* @__PURE__ */ new Map();
function Ma(e) {
  return Ra.has(e);
}
function zI(e, r) {
  Ra.set(e, r);
}
function WI(e) {
  return Ra.get(e);
}
function YI(e, r) {
  return e.includes(r);
}
function JI(e) {
  return [...new Set(e)];
}
function ZI(e, r) {
  return e.filter((t) => r.includes(t));
}
function QI(e, r) {
  return e.reduce((t, o) => ZI(t, o), r);
}
function XI(e) {
  return e.length === 1 ? e[0] : e.length > 1 ? QI(e.slice(1), e[0]) : [];
}
function kI(e) {
  const r = [];
  for (const t of e)
    r.push(...t);
  return r;
}
function qo(e) {
  return te({ [re]: "Any" }, e);
}
function Sa(e, r) {
  return te({ [re]: "Array", type: "array", items: e }, r);
}
function Ea(e, r) {
  return te({ [re]: "AsyncIterator", type: "AsyncIterator", items: e }, r);
}
function Ne(e, r, t) {
  return te({ [re]: "Computed", target: e, parameters: r }, t);
}
function eO(e, r) {
  const { [r]: t, ...o } = e;
  return o;
}
function br(e, r) {
  return r.reduce((t, o) => eO(t, o), e);
}
function rr(e) {
  return te({ [re]: "Never", not: {} }, e);
}
function nr(e) {
  return te({
    [re]: "MappedResult",
    properties: e
  });
}
function Aa(e, r, t) {
  return te({ [re]: "Constructor", type: "Constructor", parameters: e, returns: r }, t);
}
function zo(e, r, t) {
  return te({ [re]: "Function", type: "Function", parameters: e, returns: r }, t);
}
function ia(e, r) {
  return te({ [re]: "Union", anyOf: e }, r);
}
function rO(e) {
  return e.some((r) => wi(r));
}
function vf(e) {
  return e.map((r) => wi(r) ? nO(r) : r);
}
function nO(e) {
  return br(e, [dn]);
}
function tO(e, r) {
  return rO(e) ? Ci(ia(vf(e), r)) : ia(vf(e), r);
}
function Qi(e, r) {
  return e.length === 1 ? te(e[0], r) : e.length === 0 ? rr(r) : tO(e, r);
}
function tr(e, r) {
  return e.length === 0 ? rr(r) : e.length === 1 ? te(e[0], r) : ia(e, r);
}
class Bf extends Vr {
}
function iO(e) {
  return e.replace(/\\\$/g, "$").replace(/\\\*/g, "*").replace(/\\\^/g, "^").replace(/\\\|/g, "|").replace(/\\\(/g, "(").replace(/\\\)/g, ")");
}
function Ca(e, r, t) {
  return e[r] === t && e.charCodeAt(r - 1) !== 92;
}
function on(e, r) {
  return Ca(e, r, "(");
}
function No(e, r) {
  return Ca(e, r, ")");
}
function p_(e, r) {
  return Ca(e, r, "|");
}
function oO(e) {
  if (!(on(e, 0) && No(e, e.length - 1)))
    return !1;
  let r = 0;
  for (let t = 0; t < e.length; t++)
    if (on(e, t) && (r += 1), No(e, t) && (r -= 1), r === 0 && t !== e.length - 1)
      return !1;
  return !0;
}
function uO(e) {
  return e.slice(1, e.length - 1);
}
function cO(e) {
  let r = 0;
  for (let t = 0; t < e.length; t++)
    if (on(e, t) && (r += 1), No(e, t) && (r -= 1), p_(e, t) && r === 0)
      return !0;
  return !1;
}
function sO(e) {
  for (let r = 0; r < e.length; r++)
    if (on(e, r))
      return !0;
  return !1;
}
function aO(e) {
  let [r, t] = [0, 0];
  const o = [];
  for (let n = 0; n < e.length; n++)
    if (on(e, n) && (r += 1), No(e, n) && (r -= 1), p_(e, n) && r === 0) {
      const u = e.slice(t, n);
      u.length > 0 && o.push(Yi(u)), t = n + 1;
    }
  const i = e.slice(t);
  return i.length > 0 && o.push(Yi(i)), o.length === 0 ? { type: "const", const: "" } : o.length === 1 ? o[0] : { type: "or", expr: o };
}
function fO(e) {
  function r(i, n) {
    if (!on(i, n))
      throw new Bf("TemplateLiteralParser: Index must point to open parens");
    let u = 0;
    for (let c = n; c < i.length; c++)
      if (on(i, c) && (u += 1), No(i, c) && (u -= 1), u === 0)
        return [n, c];
    throw new Bf("TemplateLiteralParser: Unclosed group parens in expression");
  }
  function t(i, n) {
    for (let u = n; u < i.length; u++)
      if (on(i, u))
        return [n, u];
    return [n, i.length];
  }
  const o = [];
  for (let i = 0; i < e.length; i++)
    if (on(e, i)) {
      const [n, u] = r(e, i), c = e.slice(n, u + 1);
      o.push(Yi(c)), i = u;
    } else {
      const [n, u] = t(e, i), c = e.slice(n, u);
      c.length > 0 && o.push(Yi(c)), i = u - 1;
    }
  return o.length === 0 ? { type: "const", const: "" } : o.length === 1 ? o[0] : { type: "and", expr: o };
}
function Yi(e) {
  return oO(e) ? Yi(uO(e)) : cO(e) ? aO(e) : sO(e) ? fO(e) : { type: "const", const: iO(e) };
}
function Ua(e) {
  return Yi(e.slice(1, e.length - 1));
}
class dO extends Vr {
}
function lO(e) {
  return e.type === "or" && e.expr.length === 2 && e.expr[0].type === "const" && e.expr[0].const === "0" && e.expr[1].type === "const" && e.expr[1].const === "[1-9][0-9]*";
}
function pO(e) {
  return e.type === "or" && e.expr.length === 2 && e.expr[0].type === "const" && e.expr[0].const === "true" && e.expr[1].type === "const" && e.expr[1].const === "false";
}
function yO(e) {
  return e.type === "const" && e.const === ".*";
}
function ho(e) {
  return lO(e) || yO(e) ? !1 : pO(e) ? !0 : e.type === "and" ? e.expr.every((r) => ho(r)) : e.type === "or" ? e.expr.every((r) => ho(r)) : e.type === "const" ? !0 : (() => {
    throw new dO("Unknown expression type");
  })();
}
function mO(e) {
  const r = Ua(e.pattern);
  return ho(r);
}
class _O extends Vr {
}
function* y_(e) {
  if (e.length === 1)
    return yield* e[0];
  for (const r of e[0])
    for (const t of y_(e.slice(1)))
      yield `${r}${t}`;
}
function* bO(e) {
  return yield* y_(e.expr.map((r) => [...ms(r)]));
}
function* IO(e) {
  for (const r of e.expr)
    yield* ms(r);
}
function* OO(e) {
  return yield e.const;
}
function* ms(e) {
  return e.type === "and" ? yield* bO(e) : e.type === "or" ? yield* IO(e) : e.type === "const" ? yield* OO(e) : (() => {
    throw new _O("Unknown expression");
  })();
}
function m_(e) {
  const r = Ua(e.pattern);
  return ho(r) ? [...ms(r)] : [];
}
function Ve(e, r) {
  return te({
    [re]: "Literal",
    const: e,
    type: typeof e
  }, r);
}
function __(e) {
  return te({ [re]: "Boolean", type: "boolean" }, e);
}
function qa(e) {
  return te({ [re]: "BigInt", type: "bigint" }, e);
}
function Xi(e) {
  return te({ [re]: "Number", type: "number" }, e);
}
function Ko(e) {
  return te({ [re]: "String", type: "string" }, e);
}
function* gO(e) {
  const r = e.trim().replace(/"|'/g, "");
  return r === "boolean" ? yield __() : r === "number" ? yield Xi() : r === "bigint" ? yield qa() : r === "string" ? yield Ko() : yield (() => {
    const t = r.split("|").map((o) => Ve(o.trim()));
    return t.length === 0 ? rr() : t.length === 1 ? t[0] : Qi(t);
  })();
}
function* PO(e) {
  if (e[1] !== "{") {
    const r = Ve("$"), t = oa(e.slice(1));
    return yield* [r, ...t];
  }
  for (let r = 2; r < e.length; r++)
    if (e[r] === "}") {
      const t = gO(e.slice(2, r)), o = oa(e.slice(r + 1));
      return yield* [...t, ...o];
    }
  yield Ve(e);
}
function* oa(e) {
  for (let r = 0; r < e.length; r++)
    if (e[r] === "$") {
      const t = Ve(e.slice(0, r)), o = PO(e.slice(r));
      return yield* [t, ...o];
    }
  yield Ve(e);
}
function jO(e) {
  return [...oa(e)];
}
class TO extends Vr {
}
function $O(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function b_(e, r) {
  return Ri(e) ? e.pattern.slice(1, e.pattern.length - 1) : er(e) ? `(${e.anyOf.map((t) => b_(t, r)).join("|")})` : ss(e) ? `${r}${Xc}` : cs(e) ? `${r}${Xc}` : e_(e) ? `${r}${Xc}` : Oa(e) ? `${r}${l_}` : Vo(e) ? `${r}${$O(e.const.toString())}` : r_(e) ? `${r}${BI}` : (() => {
    throw new TO(`Unexpected Kind '${e[re]}'`);
  })();
}
function Df(e) {
  return `^${e.map((r) => b_(r, "")).join("")}$`;
}
function ns(e) {
  const t = m_(e).map((o) => Ve(o));
  return Qi(t);
}
function I_(e, r) {
  const t = De(e) ? Df(jO(e)) : Df(e);
  return te({ [re]: "TemplateLiteral", type: "string", pattern: t }, r);
}
function FO(e) {
  return m_(e).map((t) => t.toString());
}
function wO(e) {
  const r = [];
  for (const t of e)
    r.push(...Pn(t));
  return r;
}
function xO(e) {
  return [e.toString()];
}
function Pn(e) {
  return [...new Set(Ri(e) ? FO(e) : er(e) ? wO(e.anyOf) : Vo(e) ? xO(e.const) : ss(e) ? ["[number]"] : cs(e) ? ["[number]"] : [])];
}
function RO(e, r, t) {
  const o = {};
  for (const i of Object.getOwnPropertyNames(r))
    o[i] = _s(e, Pn(r[i]), t);
  return o;
}
function MO(e, r, t) {
  return RO(e, r.properties, t);
}
function SO(e, r, t) {
  const o = MO(e, r, t);
  return nr(o);
}
function O_(e, r) {
  return e.map((t) => g_(t, r));
}
function EO(e) {
  return e.filter((r) => !Go(r));
}
function AO(e, r) {
  return $_(EO(O_(e, r)));
}
function CO(e) {
  return e.some((r) => Go(r)) ? [] : e;
}
function UO(e, r) {
  return Qi(CO(O_(e, r)));
}
function qO(e, r) {
  return r in e ? e[r] : r === "[number]" ? Qi(e) : rr();
}
function NO(e, r) {
  return r === "[number]" ? e : rr();
}
function hO(e, r) {
  return r in e ? e[r] : rr();
}
function g_(e, r) {
  return hr(e) ? AO(e.allOf, r) : er(e) ? UO(e.anyOf, r) : Zi(e) ? qO(e.items ?? [], r) : Lo(e) ? NO(e.items, r) : Gr(e) ? hO(e.properties, r) : rr();
}
function P_(e, r) {
  return r.map((t) => g_(e, t));
}
function Lf(e, r) {
  return Qi(P_(e, r));
}
function _s(e, r, t) {
  if (lr(e) || lr(r)) {
    const o = "Index types using Ref parameters require both Type and Key to be of TSchema";
    if (!un(e) || !un(r))
      throw new Vr(o);
    return Ne("Index", [e, r]);
  }
  return Or(r) ? SO(e, r, t) : xi(r) ? DO(e, r, t) : te(un(r) ? Lf(e, Pn(r)) : Lf(e, r), t);
}
function KO(e, r, t) {
  return { [r]: _s(e, [r], xr(t)) };
}
function vO(e, r, t) {
  return r.reduce((o, i) => ({ ...o, ...KO(e, i, t) }), {});
}
function BO(e, r, t) {
  return vO(e, r.keys, t);
}
function DO(e, r, t) {
  const o = BO(e, r, t);
  return nr(o);
}
function Na(e, r) {
  return te({ [re]: "Iterator", type: "Iterator", items: e }, r);
}
function LO(e) {
  const r = [];
  for (let t in e)
    wi(e[t]) || r.push(t);
  return r;
}
function VO(e, r) {
  const t = LO(e), o = t.length > 0 ? { [re]: "Object", type: "object", properties: e, required: t } : { [re]: "Object", type: "object", properties: e };
  return te(o, r);
}
var ir = VO;
function j_(e, r) {
  return te({ [re]: "Promise", type: "Promise", item: e }, r);
}
function GO(e) {
  return te(br(e, [Do]));
}
function HO(e) {
  return te({ ...e, [Do]: "Readonly" });
}
function zO(e, r) {
  return r === !1 ? GO(e) : HO(e);
}
function Ai(e, r) {
  const t = r ?? !0;
  return Or(e) ? JO(e, t) : zO(e, t);
}
function WO(e, r) {
  const t = {};
  for (const o of globalThis.Object.getOwnPropertyNames(e))
    t[o] = Ai(e[o], r);
  return t;
}
function YO(e, r) {
  return WO(e.properties, r);
}
function JO(e, r) {
  const t = YO(e, r);
  return nr(t);
}
function ki(e, r) {
  return te(e.length > 0 ? { [re]: "Tuple", type: "array", items: e, additionalItems: !1, minItems: e.length, maxItems: e.length } : { [re]: "Tuple", type: "array", minItems: e.length, maxItems: e.length }, r);
}
function T_(e, r) {
  return e in r ? $r(e, r[e]) : nr(r);
}
function ZO(e) {
  return { [e]: Ve(e) };
}
function QO(e) {
  const r = {};
  for (const t of e)
    r[t] = Ve(t);
  return r;
}
function XO(e, r) {
  return YI(r, e) ? ZO(e) : QO(r);
}
function kO(e, r) {
  const t = XO(e, r);
  return T_(e, t);
}
function po(e, r) {
  return r.map((t) => $r(e, t));
}
function eg(e, r) {
  const t = {};
  for (const o of globalThis.Object.getOwnPropertyNames(r))
    t[o] = $r(e, r[o]);
  return t;
}
function $r(e, r) {
  const t = { ...r };
  return (
    // unevaluated modifier types
    wi(r) ? Ci($r(e, br(r, [dn]))) : Xm(r) ? Ai($r(e, br(r, [Do]))) : (
      // unevaluated mapped types
      Or(r) ? T_(e, r.properties) : xi(r) ? kO(e, r.keys) : (
        // unevaluated types
        ma(r) ? Aa(po(e, r.parameters), $r(e, r.returns), t) : _a(r) ? zo(po(e, r.parameters), $r(e, r.returns), t) : ya(r) ? Ea($r(e, r.items), t) : ba(r) ? Na($r(e, r.items), t) : hr(r) ? jn(po(e, r.allOf), t) : er(r) ? tr(po(e, r.anyOf), t) : Zi(r) ? ki(po(e, r.items ?? []), t) : Gr(r) ? ir(eg(e, r.properties), t) : Lo(r) ? Sa($r(e, r.items), t) : Ia(r) ? j_($r(e, r.item), t) : r
      )
    )
  );
}
function rg(e, r) {
  const t = {};
  for (const o of e)
    t[o] = $r(o, r);
  return t;
}
function ng(e, r, t) {
  const o = un(e) ? Pn(e) : e, i = r({ [re]: "MappedKey", keys: o }), n = rg(o, i);
  return ir(n, t);
}
function tg(e) {
  return te(br(e, [dn]));
}
function ig(e) {
  return te({ ...e, [dn]: "Optional" });
}
function og(e, r) {
  return r === !1 ? tg(e) : ig(e);
}
function Ci(e, r) {
  const t = r ?? !0;
  return Or(e) ? sg(e, t) : og(e, t);
}
function ug(e, r) {
  const t = {};
  for (const o of globalThis.Object.getOwnPropertyNames(e))
    t[o] = Ci(e[o], r);
  return t;
}
function cg(e, r) {
  return ug(e.properties, r);
}
function sg(e, r) {
  const t = cg(e, r);
  return nr(t);
}
function ua(e, r = {}) {
  const t = e.every((i) => Gr(i)), o = un(r.unevaluatedProperties) ? { unevaluatedProperties: r.unevaluatedProperties } : {};
  return te(r.unevaluatedProperties === !1 || un(r.unevaluatedProperties) || t ? { ...o, [re]: "Intersect", type: "object", allOf: e } : { ...o, [re]: "Intersect", allOf: e }, r);
}
function ag(e) {
  return e.every((r) => wi(r));
}
function fg(e) {
  return br(e, [dn]);
}
function Vf(e) {
  return e.map((r) => wi(r) ? fg(r) : r);
}
function dg(e, r) {
  return ag(e) ? Ci(ua(Vf(e), r)) : ua(Vf(e), r);
}
function $_(e, r = {}) {
  if (e.length === 1)
    return te(e[0], r);
  if (e.length === 0)
    return rr(r);
  if (e.some((t) => ga(t)))
    throw new Error("Cannot intersect transform types");
  return dg(e, r);
}
function jn(e, r) {
  if (e.length === 1)
    return te(e[0], r);
  if (e.length === 0)
    return rr(r);
  if (e.some((t) => ga(t)))
    throw new Error("Cannot intersect transform types");
  return ua(e, r);
}
function eo(...e) {
  const [r, t] = typeof e[0] == "string" ? [e[0], e[1]] : [e[0].$id, e[1]];
  if (typeof r != "string")
    throw new Vr("Ref: $ref must be a string");
  return te({ [re]: "Ref", $ref: r }, t);
}
function lg(e, r) {
  return Ne("Awaited", [Ne(e, r)]);
}
function pg(e) {
  return Ne("Awaited", [eo(e)]);
}
function yg(e) {
  return jn(F_(e));
}
function mg(e) {
  return tr(F_(e));
}
function _g(e) {
  return bs(e);
}
function F_(e) {
  return e.map((r) => bs(r));
}
function bs(e, r) {
  return te(In(e) ? lg(e.target, e.parameters) : hr(e) ? yg(e.allOf) : er(e) ? mg(e.anyOf) : Ia(e) ? _g(e.item) : lr(e) ? pg(e.$ref) : e, r);
}
function w_(e) {
  const r = [];
  for (const t of e)
    r.push(Is(t));
  return r;
}
function bg(e) {
  const r = w_(e);
  return kI(r);
}
function Ig(e) {
  const r = w_(e);
  return XI(r);
}
function Og(e) {
  return e.map((r, t) => t.toString());
}
function gg(e) {
  return ["[number]"];
}
function Pg(e) {
  return globalThis.Object.getOwnPropertyNames(e);
}
function jg(e) {
  return ca ? globalThis.Object.getOwnPropertyNames(e).map((t) => t[0] === "^" && t[t.length - 1] === "$" ? t.slice(1, t.length - 1) : t) : [];
}
function Is(e) {
  return hr(e) ? bg(e.allOf) : er(e) ? Ig(e.anyOf) : Zi(e) ? Og(e.items ?? []) : Lo(e) ? gg(e.items) : Gr(e) ? Pg(e.properties) : t_(e) ? jg(e.patternProperties) : [];
}
let ca = !1;
function Gf(e) {
  ca = !0;
  const r = Is(e);
  return ca = !1, `^(${r.map((o) => `(${o})`).join("|")})$`;
}
function Tg(e, r) {
  return Ne("KeyOf", [Ne(e, r)]);
}
function $g(e) {
  return Ne("KeyOf", [eo(e)]);
}
function Fg(e, r) {
  const t = Is(e), o = wg(t), i = Qi(o);
  return te(i, r);
}
function wg(e) {
  return e.map((r) => r === "[number]" ? Xi() : Ve(r));
}
function ha(e, r) {
  return In(e) ? Tg(e.target, e.parameters) : lr(e) ? $g(e.$ref) : Or(e) ? Mg(e, r) : Fg(e, r);
}
function xg(e, r) {
  const t = {};
  for (const o of globalThis.Object.getOwnPropertyNames(e))
    t[o] = ha(e[o], xr(r));
  return t;
}
function Rg(e, r) {
  return xg(e.properties, r);
}
function Mg(e, r) {
  const t = Rg(e, r);
  return nr(t);
}
function Sg(e) {
  const r = [];
  for (const t of e)
    r.push(...Is(t));
  return JI(r);
}
function Eg(e) {
  return e.filter((r) => !Go(r));
}
function Ag(e, r) {
  const t = [];
  for (const o of e)
    t.push(...P_(o, [r]));
  return Eg(t);
}
function Cg(e, r) {
  const t = {};
  for (const o of r)
    t[o] = $_(Ag(e, o));
  return t;
}
function Ug(e, r) {
  const t = Sg(e), o = Cg(e, t);
  return ir(o, r);
}
function x_(e) {
  return te({ [re]: "Date", type: "Date" }, e);
}
function R_(e) {
  return te({ [re]: "Null", type: "null" }, e);
}
function M_(e) {
  return te({ [re]: "Symbol", type: "symbol" }, e);
}
function S_(e) {
  return te({ [re]: "Undefined", type: "undefined" }, e);
}
function E_(e) {
  return te({ [re]: "Uint8Array", type: "Uint8Array" }, e);
}
function Ka(e) {
  return te({ [re]: "Unknown" }, e);
}
function qg(e) {
  return e.map((r) => va(r, !1));
}
function Ng(e) {
  const r = {};
  for (const t of globalThis.Object.getOwnPropertyNames(e))
    r[t] = Ai(va(e[t], !1));
  return r;
}
function cu(e, r) {
  return r === !0 ? e : Ai(e);
}
function va(e, r) {
  return kb(e) || rI(e) ? cu(qo(), r) : yr(e) ? Ai(ki(qg(e))) : Bo(e) ? E_() : la(e) ? x_() : Ge(e) ? cu(ir(Ng(e)), r) : eI(e) ? cu(zo([], Ka()), r) : Ye(e) ? S_() : nI(e) ? R_() : tI(e) ? M_() : Gm(e) ? qa() : cn(e) || vo(e) || De(e) ? Ve(e) : ir({});
}
function hg(e, r) {
  return te(va(e, !0), r);
}
function Kg(e, r) {
  return ki(e.parameters, r);
}
function vg(e, r) {
  if (Ye(e))
    throw new Error("Enum undefined or empty");
  const t = globalThis.Object.getOwnPropertyNames(e).filter((n) => isNaN(n)).map((n) => e[n]), i = [...new Set(t)].map((n) => Ve(n));
  return tr(i, { ...r, [us]: "Enum" });
}
class Bg extends Vr {
}
var H;
(function(e) {
  e[e.Union = 0] = "Union", e[e.True = 1] = "True", e[e.False = 2] = "False";
})(H || (H = {}));
function Fr(e) {
  return e === H.False ? e : H.True;
}
function ro(e) {
  throw new Bg(e);
}
function He(e) {
  return gn(e) || Ei(e) || an(e) || Nr(e) || Ur(e);
}
function ze(e, r) {
  return gn(r) ? U_() : Ei(r) ? Os(e, r) : an(r) ? Da(e, r) : Nr(r) ? K_() : Ur(r) ? Ba() : ro("StructuralRight");
}
function Ba(e, r) {
  return H.True;
}
function Dg(e, r) {
  return Ei(r) ? Os(e, r) : an(r) && r.anyOf.some((t) => Ur(t) || Nr(t)) ? H.True : an(r) ? H.Union : Nr(r) || Ur(r) ? H.True : H.Union;
}
function Lg(e, r) {
  return Nr(e) ? H.False : Ur(e) ? H.Union : gn(e) ? H.True : H.False;
}
function Vg(e, r) {
  return ve(r) && gs(r) ? H.True : He(r) ? ze(e, r) : Mi(r) ? Fr(xe(e.items, r.items)) : H.False;
}
function Gg(e, r) {
  return He(r) ? ze(e, r) : Ta(r) ? Fr(xe(e.items, r.items)) : H.False;
}
function Hg(e, r) {
  return He(r) ? ze(e, r) : ve(r) ? ur(e, r) : Xe(r) ? Rr(e, r) : as(r) ? H.True : H.False;
}
function A_(e, r) {
  return d_(e) || Si(e) ? H.True : H.False;
}
function zg(e, r) {
  return He(r) ? ze(e, r) : ve(r) ? ur(e, r) : Xe(r) ? Rr(e, r) : Si(r) ? H.True : H.False;
}
function Wg(e, r) {
  return He(r) ? ze(e, r) : ve(r) ? ur(e, r) : fs(r) ? e.parameters.length > r.parameters.length ? H.False : e.parameters.every((t, o) => Fr(xe(r.parameters[o], t)) === H.True) ? Fr(xe(e.returns, r.returns)) : H.False : H.False;
}
function Yg(e, r) {
  return He(r) ? ze(e, r) : ve(r) ? ur(e, r) : Xe(r) ? Rr(e, r) : ds(r) ? H.True : H.False;
}
function Jg(e, r) {
  return He(r) ? ze(e, r) : ve(r) ? ur(e, r) : ls(r) ? e.parameters.length > r.parameters.length ? H.False : e.parameters.every((t, o) => Fr(xe(r.parameters[o], t)) === H.True) ? Fr(xe(e.returns, r.returns)) : H.False : H.False;
}
function C_(e, r) {
  return On(e) && cn(e.const) || dr(e) || ln(e) ? H.True : H.False;
}
function Zg(e, r) {
  return ln(r) || dr(r) ? H.True : He(r) ? ze(e, r) : ve(r) ? ur(e, r) : Xe(r) ? Rr(e, r) : H.False;
}
function Os(e, r) {
  return r.allOf.every((t) => xe(e, t) === H.True) ? H.True : H.False;
}
function Qg(e, r) {
  return e.allOf.some((t) => xe(t, r) === H.True) ? H.True : H.False;
}
function Xg(e, r) {
  return He(r) ? ze(e, r) : $a(r) ? Fr(xe(e.items, r.items)) : H.False;
}
function kg(e, r) {
  return On(r) && r.const === e.const ? H.True : He(r) ? ze(e, r) : ve(r) ? ur(e, r) : Xe(r) ? Rr(e, r) : qr(r) ? h_(e) : dr(r) ? q_(e) : ln(r) ? C_(e) : Si(r) ? A_(e) : H.False;
}
function U_(e, r) {
  return H.False;
}
function eP(e, r) {
  return H.True;
}
function Hf(e) {
  let [r, t] = [e, 0];
  for (; Wi(r); )
    r = r.not, t += 1;
  return t % 2 === 0 ? r : Ka();
}
function rP(e, r) {
  return Wi(e) ? xe(Hf(e), r) : Wi(r) ? xe(e, Hf(r)) : ro("Invalid fallthrough for Not");
}
function nP(e, r) {
  return He(r) ? ze(e, r) : ve(r) ? ur(e, r) : Xe(r) ? Rr(e, r) : Fa(r) ? H.True : H.False;
}
function q_(e, r) {
  return f_(e) || dr(e) || ln(e) ? H.True : H.False;
}
function tP(e, r) {
  return He(r) ? ze(e, r) : ve(r) ? ur(e, r) : Xe(r) ? Rr(e, r) : ln(r) || dr(r) ? H.True : H.False;
}
function pr(e, r) {
  return Object.getOwnPropertyNames(e.properties).length === r;
}
function zf(e) {
  return gs(e);
}
function Wf(e) {
  return pr(e, 0) || pr(e, 1) && "description" in e.properties && an(e.properties.description) && e.properties.description.anyOf.length === 2 && (qr(e.properties.description.anyOf[0]) && Fi(e.properties.description.anyOf[1]) || qr(e.properties.description.anyOf[1]) && Fi(e.properties.description.anyOf[0]));
}
function Gs(e) {
  return pr(e, 0);
}
function Yf(e) {
  return pr(e, 0);
}
function iP(e) {
  return pr(e, 0);
}
function oP(e) {
  return pr(e, 0);
}
function uP(e) {
  return gs(e);
}
function cP(e) {
  const r = Xi();
  return pr(e, 0) || pr(e, 1) && "length" in e.properties && Fr(xe(e.properties.length, r)) === H.True;
}
function sP(e) {
  return pr(e, 0);
}
function gs(e) {
  const r = Xi();
  return pr(e, 0) || pr(e, 1) && "length" in e.properties && Fr(xe(e.properties.length, r)) === H.True;
}
function aP(e) {
  const r = zo([qo()], qo());
  return pr(e, 0) || pr(e, 1) && "then" in e.properties && Fr(xe(e.properties.then, r)) === H.True;
}
function N_(e, r) {
  return xe(e, r) === H.False || rs(e) && !rs(r) ? H.False : H.True;
}
function ur(e, r) {
  return Nr(e) ? H.False : Ur(e) ? H.Union : gn(e) || a_(e) && zf(r) || f_(e) && Gs(r) || d_(e) && Yf(r) || Eo(e) && Wf(r) || as(e) && iP(r) || qr(e) && zf(r) || Eo(e) && Wf(r) || dr(e) && Gs(r) || ln(e) && Gs(r) || Si(e) && Yf(r) || Ho(e) && uP(r) || ds(e) && oP(r) || fs(e) && sP(r) || ls(e) && cP(r) ? H.True : Xe(e) && qr(sa(e)) ? r[us] === "Record" ? H.True : H.False : Xe(e) && dr(sa(e)) ? pr(r, 0) ? H.True : H.False : H.False;
}
function fP(e, r) {
  return He(r) ? ze(e, r) : Xe(r) ? Rr(e, r) : ve(r) ? (() => {
    for (const t of Object.getOwnPropertyNames(r.properties)) {
      if (!(t in e.properties) && !rs(r.properties[t]))
        return H.False;
      if (rs(r.properties[t]))
        return H.True;
      if (N_(e.properties[t], r.properties[t]) === H.False)
        return H.False;
    }
    return H.True;
  })() : H.False;
}
function dP(e, r) {
  return He(r) ? ze(e, r) : ve(r) && aP(r) ? H.True : wa(r) ? Fr(xe(e.item, r.item)) : H.False;
}
function sa(e) {
  return Co in e.patternProperties ? Xi() : Uo in e.patternProperties ? Ko() : ro("Unknown record key pattern");
}
function aa(e) {
  return Co in e.patternProperties ? e.patternProperties[Co] : Uo in e.patternProperties ? e.patternProperties[Uo] : ro("Unable to get record value schema");
}
function Rr(e, r) {
  const [t, o] = [sa(r), aa(r)];
  return a_(e) && dr(t) && Fr(xe(e, o)) === H.True ? H.True : Ho(e) && dr(t) || qr(e) && dr(t) || Mi(e) && dr(t) ? xe(e, o) : ve(e) ? (() => {
    for (const i of Object.getOwnPropertyNames(e.properties))
      if (N_(o, e.properties[i]) === H.False)
        return H.False;
    return H.True;
  })() : H.False;
}
function lP(e, r) {
  return He(r) ? ze(e, r) : ve(r) ? ur(e, r) : Xe(r) ? xe(aa(e), aa(r)) : H.False;
}
function pP(e, r) {
  const t = So(e) ? Ko() : e, o = So(r) ? Ko() : r;
  return xe(t, o);
}
function h_(e, r) {
  return On(e) && De(e.const) || qr(e) ? H.True : H.False;
}
function yP(e, r) {
  return He(r) ? ze(e, r) : ve(r) ? ur(e, r) : Xe(r) ? Rr(e, r) : qr(r) ? H.True : H.False;
}
function mP(e, r) {
  return He(r) ? ze(e, r) : ve(r) ? ur(e, r) : Xe(r) ? Rr(e, r) : Eo(r) ? H.True : H.False;
}
function _P(e, r) {
  return Ao(e) ? xe(ns(e), r) : Ao(r) ? xe(e, ns(r)) : ro("Invalid fallthrough for TemplateLiteral");
}
function bP(e, r) {
  return Mi(r) && e.items !== void 0 && e.items.every((t) => xe(t, r.items) === H.True);
}
function IP(e, r) {
  return gn(e) ? H.True : Nr(e) ? H.False : Ur(e) ? H.Union : H.False;
}
function OP(e, r) {
  return He(r) ? ze(e, r) : ve(r) && gs(r) || Mi(r) && bP(e, r) ? H.True : ps(r) ? Ye(e.items) && !Ye(r.items) || !Ye(e.items) && Ye(r.items) ? H.False : Ye(e.items) && !Ye(r.items) || e.items.every((t, o) => xe(t, r.items[o]) === H.True) ? H.True : H.False : H.False;
}
function gP(e, r) {
  return He(r) ? ze(e, r) : ve(r) ? ur(e, r) : Xe(r) ? Rr(e, r) : Ho(r) ? H.True : H.False;
}
function PP(e, r) {
  return He(r) ? ze(e, r) : ve(r) ? ur(e, r) : Xe(r) ? Rr(e, r) : ys(r) ? $P(e) : Fi(r) ? H.True : H.False;
}
function Da(e, r) {
  return r.anyOf.some((t) => xe(e, t) === H.True) ? H.True : H.False;
}
function jP(e, r) {
  return e.anyOf.every((t) => xe(t, r) === H.True) ? H.True : H.False;
}
function K_(e, r) {
  return H.True;
}
function TP(e, r) {
  return gn(r) ? U_() : Ei(r) ? Os(e, r) : an(r) ? Da(e, r) : Ur(r) ? Ba() : qr(r) ? h_(e) : dr(r) ? q_(e) : ln(r) ? C_(e) : Si(r) ? A_(e) : Mi(r) ? Lg(e) : ps(r) ? IP(e) : ve(r) ? ur(e, r) : Nr(r) ? H.True : H.False;
}
function $P(e, r) {
  return Fi(e) || Fi(e) ? H.True : H.False;
}
function FP(e, r) {
  return Ei(r) ? Os(e, r) : an(r) ? Da(e, r) : Nr(r) ? K_() : Ur(r) ? Ba() : ve(r) ? ur(e, r) : ys(r) ? H.True : H.False;
}
function xe(e, r) {
  return (
    // resolvable
    Ao(e) || Ao(r) ? _P(e, r) : So(e) || So(r) ? pP(e, r) : Wi(e) || Wi(r) ? rP(e, r) : (
      // standard
      Ur(e) ? Dg(e, r) : Mi(e) ? Vg(e, r) : as(e) ? Hg(e, r) : Si(e) ? zg(e, r) : Ta(e) ? Gg(e, r) : fs(e) ? Wg(e, r) : ds(e) ? Yg(e, r) : ls(e) ? Jg(e, r) : ln(e) ? Zg(e, r) : Ei(e) ? Qg(e, r) : $a(e) ? Xg(e, r) : On(e) ? kg(e, r) : gn(e) ? eP() : Fa(e) ? nP(e, r) : dr(e) ? tP(e, r) : ve(e) ? fP(e, r) : Xe(e) ? lP(e, r) : qr(e) ? yP(e, r) : Eo(e) ? mP(e, r) : ps(e) ? OP(e, r) : wa(e) ? dP(e, r) : Ho(e) ? gP(e, r) : Fi(e) ? PP(e, r) : an(e) ? jP(e, r) : Nr(e) ? TP(e, r) : ys(e) ? FP(e, r) : ro(`Unknown left type operand '${e[re]}'`)
    )
  );
}
function Wo(e, r) {
  return xe(e, r);
}
function wP(e, r, t, o, i) {
  const n = {};
  for (const u of globalThis.Object.getOwnPropertyNames(e))
    n[u] = La(e[u], r, t, o, xr(i));
  return n;
}
function xP(e, r, t, o, i) {
  return wP(e.properties, r, t, o, i);
}
function RP(e, r, t, o, i) {
  const n = xP(e, r, t, o, i);
  return nr(n);
}
function MP(e, r, t, o) {
  const i = Wo(e, r);
  return i === H.Union ? tr([t, o]) : i === H.True ? t : o;
}
function La(e, r, t, o, i) {
  return Or(e) ? RP(e, r, t, o, i) : xi(e) ? te(CP(e, r, t, o, i)) : te(MP(e, r, t, o), i);
}
function SP(e, r, t, o, i) {
  return {
    [e]: La(Ve(e), r, t, o, xr(i))
  };
}
function EP(e, r, t, o, i) {
  return e.reduce((n, u) => ({ ...n, ...SP(u, r, t, o, i) }), {});
}
function AP(e, r, t, o, i) {
  return EP(e.keys, r, t, o, i);
}
function CP(e, r, t, o, i) {
  const n = AP(e, r, t, o, i);
  return nr(n);
}
function UP(e) {
  return e.allOf.every((r) => Ps(r));
}
function qP(e) {
  return e.anyOf.some((r) => Ps(r));
}
function NP(e) {
  return !Ps(e.not);
}
function Ps(e) {
  return e[re] === "Intersect" ? UP(e) : e[re] === "Union" ? qP(e) : e[re] === "Not" ? NP(e) : e[re] === "Undefined";
}
function hP(e, r) {
  return Va(ns(e), r);
}
function KP(e, r) {
  const t = e.filter((o) => Wo(o, r) === H.False);
  return t.length === 1 ? t[0] : tr(t);
}
function Va(e, r, t = {}) {
  return Ri(e) ? te(hP(e, r), t) : Or(e) ? te(DP(e, r), t) : te(er(e) ? KP(e.anyOf, r) : Wo(e, r) !== H.False ? rr() : e, t);
}
function vP(e, r) {
  const t = {};
  for (const o of globalThis.Object.getOwnPropertyNames(e))
    t[o] = Va(e[o], r);
  return t;
}
function BP(e, r) {
  return vP(e.properties, r);
}
function DP(e, r) {
  const t = BP(e, r);
  return nr(t);
}
function LP(e, r) {
  return Ga(ns(e), r);
}
function VP(e, r) {
  const t = e.filter((o) => Wo(o, r) !== H.False);
  return t.length === 1 ? t[0] : tr(t);
}
function Ga(e, r, t) {
  return Ri(e) ? te(LP(e, r), t) : Or(e) ? te(zP(e, r), t) : te(er(e) ? VP(e.anyOf, r) : Wo(e, r) !== H.False ? e : rr(), t);
}
function GP(e, r) {
  const t = {};
  for (const o of globalThis.Object.getOwnPropertyNames(e))
    t[o] = Ga(e[o], r);
  return t;
}
function HP(e, r) {
  return GP(e.properties, r);
}
function zP(e, r) {
  const t = HP(e, r);
  return nr(t);
}
function WP(e, r) {
  return te(e.returns, r);
}
function YP(e) {
  return te({ [re]: "Integer", type: "integer" }, e);
}
function JP(e, r, t) {
  return {
    [e]: no(Ve(e), r, xr(t))
  };
}
function ZP(e, r, t) {
  return e.reduce((i, n) => ({ ...i, ...JP(n, r, t) }), {});
}
function QP(e, r, t) {
  return ZP(e.keys, r, t);
}
function XP(e, r, t) {
  const o = QP(e, r, t);
  return nr(o);
}
function kP(e) {
  const [r, t] = [e.slice(0, 1), e.slice(1)];
  return [r.toLowerCase(), t].join("");
}
function e0(e) {
  const [r, t] = [e.slice(0, 1), e.slice(1)];
  return [r.toUpperCase(), t].join("");
}
function r0(e) {
  return e.toUpperCase();
}
function n0(e) {
  return e.toLowerCase();
}
function t0(e, r, t) {
  const o = Ua(e.pattern);
  if (!ho(o))
    return { ...e, pattern: v_(e.pattern, r) };
  const u = [...ms(o)].map((s) => Ve(s)), c = B_(u, r), f = tr(c);
  return I_([f], t);
}
function v_(e, r) {
  return typeof e == "string" ? r === "Uncapitalize" ? kP(e) : r === "Capitalize" ? e0(e) : r === "Uppercase" ? r0(e) : r === "Lowercase" ? n0(e) : e : e.toString();
}
function B_(e, r) {
  return e.map((t) => no(t, r));
}
function no(e, r, t = {}) {
  return (
    // Intrinsic-Mapped-Inference
    xi(e) ? XP(e, r, t) : (
      // Standard-Inference
      Ri(e) ? t0(e, r, t) : er(e) ? tr(B_(e.anyOf, r), t) : Vo(e) ? Ve(v_(e.const, r), t) : (
        // Default Type
        te(e, t)
      )
    )
  );
}
function i0(e, r = {}) {
  return no(e, "Capitalize", r);
}
function o0(e, r = {}) {
  return no(e, "Lowercase", r);
}
function u0(e, r = {}) {
  return no(e, "Uncapitalize", r);
}
function c0(e, r = {}) {
  return no(e, "Uppercase", r);
}
function s0(e, r, t) {
  const o = {};
  for (const i of globalThis.Object.getOwnPropertyNames(e))
    o[i] = js(e[i], r, xr(t));
  return o;
}
function a0(e, r, t) {
  return s0(e.properties, r, t);
}
function f0(e, r, t) {
  const o = a0(e, r, t);
  return nr(o);
}
function d0(e, r) {
  return e.map((t) => Ha(t, r));
}
function l0(e, r) {
  return e.map((t) => Ha(t, r));
}
function p0(e, r) {
  const { [r]: t, ...o } = e;
  return o;
}
function y0(e, r) {
  return r.reduce((t, o) => p0(t, o), e);
}
function m0(e, r) {
  const t = br(e, [Lr, "$id", "required", "properties"]), o = y0(e.properties, r);
  return ir(o, t);
}
function _0(e) {
  const r = e.reduce((t, o) => n_(o) ? [...t, Ve(o)] : t, []);
  return tr(r);
}
function Ha(e, r) {
  return hr(e) ? jn(d0(e.allOf, r)) : er(e) ? tr(l0(e.anyOf, r)) : Gr(e) ? m0(e, r) : ir({});
}
function js(e, r, t) {
  const o = yr(r) ? _0(r) : r, i = un(r) ? Pn(r) : r, n = lr(e), u = lr(r);
  return Or(e) ? f0(e, i, t) : xi(r) ? g0(e, r, t) : n && u ? Ne("Omit", [e, o], t) : !n && u ? Ne("Omit", [e, o], t) : n && !u ? Ne("Omit", [e, o], t) : te({ ...Ha(e, i), ...t });
}
function b0(e, r, t) {
  return { [r]: js(e, [r], xr(t)) };
}
function I0(e, r, t) {
  return r.reduce((o, i) => ({ ...o, ...b0(e, i, t) }), {});
}
function O0(e, r, t) {
  return I0(e, r.keys, t);
}
function g0(e, r, t) {
  const o = O0(e, r, t);
  return nr(o);
}
function P0(e, r, t) {
  const o = {};
  for (const i of globalThis.Object.getOwnPropertyNames(e))
    o[i] = Ts(e[i], r, xr(t));
  return o;
}
function j0(e, r, t) {
  return P0(e.properties, r, t);
}
function T0(e, r, t) {
  const o = j0(e, r, t);
  return nr(o);
}
function $0(e, r) {
  return e.map((t) => za(t, r));
}
function F0(e, r) {
  return e.map((t) => za(t, r));
}
function w0(e, r) {
  const t = {};
  for (const o of r)
    o in e && (t[o] = e[o]);
  return t;
}
function x0(e, r) {
  const t = br(e, [Lr, "$id", "required", "properties"]), o = w0(e.properties, r);
  return ir(o, t);
}
function R0(e) {
  const r = e.reduce((t, o) => n_(o) ? [...t, Ve(o)] : t, []);
  return tr(r);
}
function za(e, r) {
  return hr(e) ? jn($0(e.allOf, r)) : er(e) ? tr(F0(e.anyOf, r)) : Gr(e) ? x0(e, r) : ir({});
}
function Ts(e, r, t) {
  const o = yr(r) ? R0(r) : r, i = un(r) ? Pn(r) : r, n = lr(e), u = lr(r);
  return Or(e) ? T0(e, i, t) : xi(r) ? A0(e, r, t) : n && u ? Ne("Pick", [e, o], t) : !n && u ? Ne("Pick", [e, o], t) : n && !u ? Ne("Pick", [e, o], t) : te({ ...za(e, i), ...t });
}
function M0(e, r, t) {
  return {
    [r]: Ts(e, [r], xr(t))
  };
}
function S0(e, r, t) {
  return r.reduce((o, i) => ({ ...o, ...M0(e, i, t) }), {});
}
function E0(e, r, t) {
  return S0(e, r.keys, t);
}
function A0(e, r, t) {
  const o = E0(e, r, t);
  return nr(o);
}
function C0(e, r) {
  return Ne("Partial", [Ne(e, r)]);
}
function U0(e) {
  return Ne("Partial", [eo(e)]);
}
function q0(e) {
  const r = {};
  for (const t of globalThis.Object.getOwnPropertyNames(e))
    r[t] = Ci(e[t]);
  return r;
}
function N0(e) {
  const r = br(e, [Lr, "$id", "required", "properties"]), t = q0(e.properties);
  return ir(t, r);
}
function Jf(e) {
  return e.map((r) => D_(r));
}
function D_(e) {
  return In(e) ? C0(e.target, e.parameters) : lr(e) ? U0(e.$ref) : hr(e) ? jn(Jf(e.allOf)) : er(e) ? tr(Jf(e.anyOf)) : Gr(e) ? N0(e) : ir({});
}
function Wa(e, r) {
  return Or(e) ? v0(e, r) : te({ ...D_(e), ...r });
}
function h0(e, r) {
  const t = {};
  for (const o of globalThis.Object.getOwnPropertyNames(e))
    t[o] = Wa(e[o], xr(r));
  return t;
}
function K0(e, r) {
  return h0(e.properties, r);
}
function v0(e, r) {
  const t = K0(e, r);
  return nr(t);
}
function Ui(e, r, t) {
  return te({ [re]: "Record", type: "object", patternProperties: { [e]: r } }, t);
}
function Ya(e, r, t) {
  const o = {};
  for (const i of e)
    o[i] = r;
  return ir(o, { ...t, [us]: "Record" });
}
function B0(e, r, t) {
  return mO(e) ? Ya(Pn(e), r, t) : Ui(e.pattern, r, t);
}
function D0(e, r, t) {
  return Ya(Pn(tr(e)), r, t);
}
function L0(e, r, t) {
  return Ya([e.toString()], r, t);
}
function V0(e, r, t) {
  return Ui(e.source, r, t);
}
function G0(e, r, t) {
  const o = Ye(e.pattern) ? Uo : e.pattern;
  return Ui(o, r, t);
}
function H0(e, r, t) {
  return Ui(Uo, r, t);
}
function z0(e, r, t) {
  return Ui(LI, r, t);
}
function W0(e, r, t) {
  return Ui(Co, r, t);
}
function Y0(e, r, t) {
  return Ui(Co, r, t);
}
function L_(e, r, t = {}) {
  return In(r) ? Ne("Record", [e, Ne(r.target, r.parameters)], t) : In(e) ? Ne("Record", [Ne(r.target, r.parameters), r], t) : lr(e) ? Ne("Record", [eo(e.$ref), r]) : er(e) ? D0(e.anyOf, r, t) : Ri(e) ? B0(e, r, t) : Vo(e) ? L0(e.const, r, t) : cs(e) ? W0(e, r, t) : ss(e) ? Y0(e, r, t) : i_(e) ? V0(e, r, t) : Oa(e) ? G0(e, r, t) : km(e) ? H0(e, r, t) : Go(e) ? z0(e, r, t) : rr(t);
}
function J0(e, r) {
  return Ne("Required", [Ne(e, r)]);
}
function Z0(e) {
  return Ne("Required", [eo(e)]);
}
function Q0(e) {
  const r = {};
  for (const t of globalThis.Object.getOwnPropertyNames(e))
    r[t] = br(e[t], [dn]);
  return r;
}
function X0(e) {
  const r = br(e, [Lr, "$id", "required", "properties"]), t = Q0(e.properties);
  return ir(t, r);
}
function Zf(e) {
  return e.map((r) => V_(r));
}
function V_(e) {
  return In(e) ? J0(e.target, e.parameters) : lr(e) ? Z0(e.$ref) : hr(e) ? jn(Zf(e.allOf)) : er(e) ? tr(Zf(e.anyOf)) : Gr(e) ? X0(e) : ir({});
}
function Ja(e, r) {
  return Or(e) ? r1(e, r) : te({ ...V_(e), ...r });
}
function k0(e, r) {
  const t = {};
  for (const o of globalThis.Object.getOwnPropertyNames(e))
    t[o] = Ja(e[o], r);
  return t;
}
function e1(e, r) {
  return k0(e.properties, r);
}
function r1(e, r) {
  const t = e1(e, r);
  return nr(t);
}
function n1(e, r) {
  return r.map((t) => lr(t) ? G_(e, t.$ref) : wr(e, t));
}
function G_(e, r) {
  return r in e ? lr(e[r]) ? G_(e, e[r].$ref) : wr(e, e[r]) : rr();
}
function t1(e) {
  return bs(e[0]);
}
function i1(e) {
  return _s(e[0], e[1]);
}
function o1(e) {
  return ha(e[0]);
}
function u1(e) {
  return Wa(e[0]);
}
function c1(e) {
  return js(e[0], e[1]);
}
function s1(e) {
  return Ts(e[0], e[1]);
}
function a1(e) {
  return L_(e[0], e[1]);
}
function f1(e) {
  return Ja(e[0]);
}
function d1(e, r, t) {
  const o = n1(e, t);
  return r === "Awaited" ? t1(o) : r === "Index" ? i1(o) : r === "KeyOf" ? o1(o) : r === "Partial" ? u1(o) : r === "Omit" ? c1(o) : r === "Pick" ? s1(o) : r === "Record" ? a1(o) : r === "Required" ? f1(o) : rr();
}
function l1(e, r) {
  return ir(globalThis.Object.keys(r).reduce((t, o) => ({ ...t, [o]: wr(e, r[o]) }), {}));
}
function p1(e, r, t) {
  return Aa(Yo(e, r), wr(e, t));
}
function y1(e, r, t) {
  return zo(Yo(e, r), wr(e, t));
}
function m1(e, r) {
  return ki(Yo(e, r));
}
function _1(e, r) {
  return jn(Yo(e, r));
}
function b1(e, r) {
  return tr(Yo(e, r));
}
function I1(e, r) {
  return Sa(wr(e, r));
}
function O1(e, r) {
  return Ea(wr(e, r));
}
function g1(e, r) {
  return Na(wr(e, r));
}
function Yo(e, r) {
  return r.map((t) => wr(e, t));
}
function wr(e, r) {
  return (
    // Modifier Unwrap - Reapplied via CreateType Options
    wi(r) ? te(wr(e, br(r, [dn])), r) : Xm(r) ? te(wr(e, br(r, [Do])), r) : (
      // Traveral
      Lo(r) ? te(I1(e, r.items), r) : ya(r) ? te(O1(e, r.items), r) : In(r) ? te(d1(e, r.target, r.parameters)) : ma(r) ? te(p1(e, r.parameters, r.returns), r) : _a(r) ? te(y1(e, r.parameters, r.returns), r) : hr(r) ? te(_1(e, r.allOf), r) : ba(r) ? te(g1(e, r.items), r) : Gr(r) ? te(l1(e, r.properties), r) : Zi(r) ? te(m1(e, r.items || []), r) : er(r) ? te(b1(e, r.anyOf), r) : r
    )
  );
}
function P1(e, r) {
  return r in e ? wr(e, e[r]) : rr();
}
function j1(e) {
  return globalThis.Object.getOwnPropertyNames(e).reduce((r, t) => ({ ...r, [t]: P1(e, t) }), {});
}
class T1 {
  constructor(r) {
    const t = j1(r), o = this.WithIdentifiers(t);
    this.$defs = o;
  }
  /** `[Json]` Imports a Type by Key. */
  Import(r, t) {
    const o = { ...this.$defs, [r]: te(this.$defs[r], t) };
    return te({ [re]: "Import", $defs: o, $ref: r });
  }
  // prettier-ignore
  WithIdentifiers(r) {
    return globalThis.Object.getOwnPropertyNames(r).reduce((t, o) => ({ ...t, [o]: { ...r[o], $id: o } }), {});
  }
}
function $1(e) {
  return new T1(e);
}
function F1(e, r) {
  return te({ [re]: "Not", not: e }, r);
}
function w1(e, r) {
  return ki(e.parameters, r);
}
function x1(e) {
  return Ai(Ci(e));
}
let R1 = 0;
function M1(e, r = {}) {
  Ye(r.$id) && (r.$id = `T${R1++}`);
  const t = aI(e({ [re]: "This", $ref: `${r.$id}` }));
  return t.$id = r.$id, te({ [us]: "Recursive", ...t }, r);
}
function S1(e, r) {
  const t = De(e) ? new globalThis.RegExp(e) : e;
  return te({ [re]: "RegExp", type: "RegExp", source: t.source, flags: t.flags }, r);
}
function E1(e) {
  return hr(e) ? e.allOf : er(e) ? e.anyOf : Zi(e) ? e.items ?? [] : [];
}
function A1(e) {
  return E1(e);
}
function C1(e, r) {
  return te(e.returns, r);
}
class U1 {
  constructor(r) {
    this.schema = r;
  }
  Decode(r) {
    return new q1(this.schema, r);
  }
}
class q1 {
  constructor(r, t) {
    this.schema = r, this.decode = t;
  }
  EncodeTransform(r, t) {
    const n = { Encode: (u) => t[Lr].Encode(r(u)), Decode: (u) => this.decode(t[Lr].Decode(u)) };
    return { ...t, [Lr]: n };
  }
  EncodeSchema(r, t) {
    const o = { Decode: this.decode, Encode: r };
    return { ...t, [Lr]: o };
  }
  Encode(r) {
    return ga(this.schema) ? this.EncodeTransform(r, this.schema) : this.EncodeSchema(r, this.schema);
  }
}
function N1(e) {
  return new U1(e);
}
function h1(e = {}) {
  return te({ [re]: e[re] ?? "Unsafe" }, e);
}
function K1(e) {
  return te({ [re]: "Void", type: "void" }, e);
}
const v1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Any: qo,
  Array: Sa,
  AsyncIterator: Ea,
  Awaited: bs,
  BigInt: qa,
  Boolean: __,
  Capitalize: i0,
  Composite: Ug,
  Const: hg,
  Constructor: Aa,
  ConstructorParameters: Kg,
  Date: x_,
  Enum: vg,
  Exclude: Va,
  Extends: La,
  Extract: Ga,
  Function: zo,
  Index: _s,
  InstanceType: WP,
  Integer: YP,
  Intersect: jn,
  Iterator: Na,
  KeyOf: ha,
  Literal: Ve,
  Lowercase: o0,
  Mapped: ng,
  Module: $1,
  Never: rr,
  Not: F1,
  Null: R_,
  Number: Xi,
  Object: ir,
  Omit: js,
  Optional: Ci,
  Parameters: w1,
  Partial: Wa,
  Pick: Ts,
  Promise: j_,
  Readonly: Ai,
  ReadonlyOptional: x1,
  Record: L_,
  Recursive: M1,
  Ref: eo,
  RegExp: S1,
  Required: Ja,
  Rest: A1,
  ReturnType: C1,
  String: Ko,
  Symbol: M_,
  TemplateLiteral: I_,
  Transform: N1,
  Tuple: ki,
  Uint8Array: E_,
  Uncapitalize: u0,
  Undefined: S_,
  Union: tr,
  Unknown: Ka,
  Unsafe: h1,
  Uppercase: c0,
  Void: K1
}, Symbol.toStringTag, { value: "Module" })), be = v1, H_ = (e) => re in e && e[re] === "Union", B1 = (e) => be.Optional(be.Union([e, be.Null()])), D1 = (e) => be.Omit(e, ["owner"]);
var L1 = {
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
const V1 = (e, r) => {
  const t = r.properties, o = be.Omit(e, L1.keys(t));
  return be.Composite([o, r]);
};
sn.ExactOptionalPropertyTypes = !0;
const z_ = {
  [re]: "@codelab/Ref"
}, Za = be.Object({
  id: be.String()
}), G1 = (e) => be.Composite([
  be.Object({
    __typename: be.Literal(`${e}`)
  }),
  be.Object({
    // Add this for easier debugging
    name: be.Optional(be.String())
  }),
  Za
]), H1 = be.Object({
  $modelType: be.Literal("serialized")
}), z1 = (e) => be.Composite([H1, e]), W1 = {
  [re]: "@codelab/All"
}, Y1 = be.Array(be.Not(be.Undefined()), { minItems: 1 }), W_ = {
  [re]: "@codelab/Defined"
}, fn = be.Not(
  be.Union([be.Null(), be.Undefined()])
), J1 = {
  [re]: "@codelab/AllOrNone"
}, Z1 = be.Union([
  be.Array(fn),
  be.Array(be.Not(fn))
]), Q1 = {
  [re]: "@codelab/AtLeastOne"
}, X1 = be.Array(be.Any(), {
  contains: fn,
  minContains: 1
}), k1 = {
  [re]: "@codelab/AtMostOne"
}, ej = be.Array(
  be.Union([fn, be.Not(fn)]),
  {
    validate: (e) => e.filter((t) => !!t).length <= 1
  }
), rj = {
  [re]: "@codelab/ExactlyOne"
}, nj = be.Array(be.Any(), {
  contains: fn,
  minContains: 1,
  maxContains: 1
}), tj = {
  [re]: "@codelab/Ipv4"
}, ij = be.String({
  format: "ipv4"
}), oj = /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/, uj = (e) => oj.test(e), cj = {
  [re]: "@codelab/None"
}, sj = be.Array(be.Not(fn));
class aj extends Vr {
  constructor(r) {
    super(`Unable to dereference schema with $id '${r.$ref}'`), this.schema = r;
  }
}
function fj(e, r) {
  const t = r.find((o) => o.$id === e.$ref);
  if (t === void 0)
    throw new aj(e);
  return Qa(t, r);
}
function dj(e, r) {
  return !os(e.$id) || r.some((t) => t.$id === e.$id) || r.push(e), r;
}
function Qa(e, r) {
  return e[re] === "This" || e[re] === "Ref" ? fj(e, r) : e;
}
class lj extends Vr {
  constructor(r) {
    super("Unable to hash value"), this.value = r;
  }
}
var Ir;
(function(e) {
  e[e.Undefined = 0] = "Undefined", e[e.Null = 1] = "Null", e[e.Boolean = 2] = "Boolean", e[e.Number = 3] = "Number", e[e.String = 4] = "String", e[e.Object = 5] = "Object", e[e.Array = 6] = "Array", e[e.Date = 7] = "Date", e[e.Uint8Array = 8] = "Uint8Array", e[e.Symbol = 9] = "Symbol", e[e.BigInt = 10] = "BigInt";
})(Ir || (Ir = {}));
let zi = BigInt("14695981039346656037");
const [pj, yj] = [BigInt("1099511628211"), BigInt(
  "18446744073709551616"
  /* 2 ^ 64 */
)], mj = Array.from({ length: 256 }).map((e, r) => BigInt(r)), Y_ = new Float64Array(1), J_ = new DataView(Y_.buffer), Z_ = new Uint8Array(Y_.buffer);
function* _j(e) {
  const r = e === 0 ? 1 : Math.ceil(Math.floor(Math.log2(e) + 1) / 8);
  for (let t = 0; t < r; t++)
    yield e >> 8 * (r - 1 - t) & 255;
}
function bj(e) {
  or(Ir.Array);
  for (const r of e)
    Ji(r);
}
function Ij(e) {
  or(Ir.Boolean), or(e ? 1 : 0);
}
function Oj(e) {
  or(Ir.BigInt), J_.setBigInt64(0, e);
  for (const r of Z_)
    or(r);
}
function gj(e) {
  or(Ir.Date), Ji(e.getTime());
}
function Pj(e) {
  or(Ir.Null);
}
function jj(e) {
  or(Ir.Number), J_.setFloat64(0, e);
  for (const r of Z_)
    or(r);
}
function Tj(e) {
  or(Ir.Object);
  for (const r of globalThis.Object.getOwnPropertyNames(e).sort())
    Ji(r), Ji(e[r]);
}
function $j(e) {
  or(Ir.String);
  for (let r = 0; r < e.length; r++)
    for (const t of _j(e.charCodeAt(r)))
      or(t);
}
function Fj(e) {
  or(Ir.Symbol), Ji(e.description);
}
function wj(e) {
  or(Ir.Uint8Array);
  for (let r = 0; r < e.length; r++)
    or(e[r]);
}
function xj(e) {
  return or(Ir.Undefined);
}
function Ji(e) {
  if (is(e))
    return bj(e);
  if (Jm(e))
    return Ij(e);
  if (Zm(e))
    return Oj(e);
  if (zm(e))
    return gj(e);
  if (Ym(e))
    return Pj();
  if (Hi(e))
    return jj(e);
  if (ts(e))
    return Tj(e);
  if (os(e))
    return $j(e);
  if (Qm(e))
    return Fj(e);
  if (Wm(e))
    return wj(e);
  if (pa(e))
    return xj();
  throw new lj(e);
}
function or(e) {
  zi = zi ^ mj[e], zi = zi * pj % yj;
}
function Rj(e) {
  return zi = BigInt("14695981039346656037"), Ji(e), zi;
}
class Mj extends Vr {
  constructor(r) {
    super("Unknown type"), this.schema = r;
  }
}
function Sj(e) {
  return e[re] === "Any" || e[re] === "Unknown";
}
function Oe(e) {
  return e !== void 0;
}
function Ej(e, r, t) {
  return !0;
}
function Aj(e, r, t) {
  if (!is(t) || Oe(e.minItems) && !(t.length >= e.minItems) || Oe(e.maxItems) && !(t.length <= e.maxItems) || !t.every((n) => Qe(e.items, r, n)) || e.uniqueItems === !0 && !function() {
    const n = /* @__PURE__ */ new Set();
    for (const u of t) {
      const c = Rj(u);
      if (n.has(c))
        return !1;
      n.add(c);
    }
    return !0;
  }())
    return !1;
  if (!(Oe(e.contains) || Hi(e.minContains) || Hi(e.maxContains)))
    return !0;
  const o = Oe(e.contains) ? e.contains : rr(), i = t.reduce((n, u) => Qe(o, r, u) ? n + 1 : n, 0);
  return !(i === 0 || Hi(e.minContains) && i < e.minContains || Hi(e.maxContains) && i > e.maxContains);
}
function Cj(e, r, t) {
  return fI(t);
}
function Uj(e, r, t) {
  return !(!Zm(t) || Oe(e.exclusiveMaximum) && !(t < e.exclusiveMaximum) || Oe(e.exclusiveMinimum) && !(t > e.exclusiveMinimum) || Oe(e.maximum) && !(t <= e.maximum) || Oe(e.minimum) && !(t >= e.minimum) || Oe(e.multipleOf) && t % e.multipleOf !== BigInt(0));
}
function qj(e, r, t) {
  return Jm(t);
}
function Nj(e, r, t) {
  return Qe(e.returns, r, t.prototype);
}
function hj(e, r, t) {
  return !(!zm(t) || Oe(e.exclusiveMaximumTimestamp) && !(t.getTime() < e.exclusiveMaximumTimestamp) || Oe(e.exclusiveMinimumTimestamp) && !(t.getTime() > e.exclusiveMinimumTimestamp) || Oe(e.maximumTimestamp) && !(t.getTime() <= e.maximumTimestamp) || Oe(e.minimumTimestamp) && !(t.getTime() >= e.minimumTimestamp) || Oe(e.multipleOfTimestamp) && t.getTime() % e.multipleOfTimestamp !== 0);
}
function Kj(e, r, t) {
  return yI(t);
}
function vj(e, r, t) {
  const o = globalThis.Object.values(e.$defs), i = e.$defs[e.$ref];
  return Qe(i, [...r, ...o], t);
}
function Bj(e, r, t) {
  return !(!pI(t) || Oe(e.exclusiveMaximum) && !(t < e.exclusiveMaximum) || Oe(e.exclusiveMinimum) && !(t > e.exclusiveMinimum) || Oe(e.maximum) && !(t <= e.maximum) || Oe(e.minimum) && !(t >= e.minimum) || Oe(e.multipleOf) && t % e.multipleOf !== 0);
}
function Dj(e, r, t) {
  const o = e.allOf.every((i) => Qe(i, r, t));
  if (e.unevaluatedProperties === !1) {
    const i = new RegExp(Gf(e)), n = Object.getOwnPropertyNames(t).every((u) => i.test(u));
    return o && n;
  } else if (un(e.unevaluatedProperties)) {
    const i = new RegExp(Gf(e)), n = Object.getOwnPropertyNames(t).every((u) => i.test(u) || Qe(e.unevaluatedProperties, r, t[u]));
    return o && n;
  } else
    return o;
}
function Lj(e, r, t) {
  return dI(t);
}
function Vj(e, r, t) {
  return t === e.const;
}
function Gj(e, r, t) {
  return !1;
}
function Hj(e, r, t) {
  return !Qe(e.not, r, t);
}
function zj(e, r, t) {
  return Ym(t);
}
function Wj(e, r, t) {
  return !(!sn.IsNumberLike(t) || Oe(e.exclusiveMaximum) && !(t < e.exclusiveMaximum) || Oe(e.exclusiveMinimum) && !(t > e.exclusiveMinimum) || Oe(e.minimum) && !(t >= e.minimum) || Oe(e.maximum) && !(t <= e.maximum) || Oe(e.multipleOf) && t % e.multipleOf !== 0);
}
function Yj(e, r, t) {
  if (!sn.IsObjectLike(t) || Oe(e.minProperties) && !(Object.getOwnPropertyNames(t).length >= e.minProperties) || Oe(e.maxProperties) && !(Object.getOwnPropertyNames(t).length <= e.maxProperties))
    return !1;
  const o = Object.getOwnPropertyNames(e.properties);
  for (const i of o) {
    const n = e.properties[i];
    if (e.required && e.required.includes(i)) {
      if (!Qe(n, r, t[i]) || (Ps(n) || Sj(n)) && !(i in t))
        return !1;
    } else if (sn.IsExactOptionalProperty(t, i) && !Qe(n, r, t[i]))
      return !1;
  }
  if (e.additionalProperties === !1) {
    const i = Object.getOwnPropertyNames(t);
    return e.required && e.required.length === o.length && i.length === o.length ? !0 : i.every((n) => o.includes(n));
  } else return typeof e.additionalProperties == "object" ? Object.getOwnPropertyNames(t).every((n) => o.includes(n) || Qe(e.additionalProperties, r, t[n])) : !0;
}
function Jj(e, r, t) {
  return lI(t);
}
function Zj(e, r, t) {
  if (!sn.IsRecordLike(t) || Oe(e.minProperties) && !(Object.getOwnPropertyNames(t).length >= e.minProperties) || Oe(e.maxProperties) && !(Object.getOwnPropertyNames(t).length <= e.maxProperties))
    return !1;
  const [o, i] = Object.entries(e.patternProperties)[0], n = new RegExp(o), u = Object.entries(t).every(([s, l]) => n.test(s) ? Qe(i, r, l) : !0), c = typeof e.additionalProperties == "object" ? Object.entries(t).every(([s, l]) => n.test(s) ? !0 : Qe(e.additionalProperties, r, l)) : !0, f = e.additionalProperties === !1 ? Object.getOwnPropertyNames(t).every((s) => n.test(s)) : !0;
  return u && c && f;
}
function Qj(e, r, t) {
  return Qe(Qa(e, r), r, t);
}
function Xj(e, r, t) {
  const o = new RegExp(e.source, e.flags);
  return Oe(e.minLength) && !(t.length >= e.minLength) || Oe(e.maxLength) && !(t.length <= e.maxLength) ? !1 : o.test(t);
}
function kj(e, r, t) {
  return !os(t) || Oe(e.minLength) && !(t.length >= e.minLength) || Oe(e.maxLength) && !(t.length <= e.maxLength) || Oe(e.pattern) && !new RegExp(e.pattern).test(t) ? !1 : Oe(e.format) ? VI(e.format) ? HI(e.format)(t) : !1 : !0;
}
function eT(e, r, t) {
  return Qm(t);
}
function rT(e, r, t) {
  return os(t) && new RegExp(e.pattern).test(t);
}
function nT(e, r, t) {
  return Qe(Qa(e, r), r, t);
}
function tT(e, r, t) {
  if (!is(t) || e.items === void 0 && t.length !== 0 || t.length !== e.maxItems)
    return !1;
  if (!e.items)
    return !0;
  for (let o = 0; o < e.items.length; o++)
    if (!Qe(e.items[o], r, t[o]))
      return !1;
  return !0;
}
function iT(e, r, t) {
  return pa(t);
}
function oT(e, r, t) {
  return e.anyOf.some((o) => Qe(o, r, t));
}
function uT(e, r, t) {
  return !(!Wm(t) || Oe(e.maxByteLength) && !(t.length <= e.maxByteLength) || Oe(e.minByteLength) && !(t.length >= e.minByteLength));
}
function cT(e, r, t) {
  return !0;
}
function sT(e, r, t) {
  return sn.IsVoidLike(t);
}
function aT(e, r, t) {
  return Ma(e[re]) ? WI(e[re])(e, t) : !1;
}
function Qe(e, r, t) {
  const o = Oe(e.$id) ? dj(e, r) : r, i = e;
  switch (i[re]) {
    case "Any":
      return Ej();
    case "Array":
      return Aj(i, o, t);
    case "AsyncIterator":
      return Cj(i, o, t);
    case "BigInt":
      return Uj(i, o, t);
    case "Boolean":
      return qj(i, o, t);
    case "Constructor":
      return Nj(i, o, t);
    case "Date":
      return hj(i, o, t);
    case "Function":
      return Kj(i, o, t);
    case "Import":
      return vj(i, o, t);
    case "Integer":
      return Bj(i, o, t);
    case "Intersect":
      return Dj(i, o, t);
    case "Iterator":
      return Lj(i, o, t);
    case "Literal":
      return Vj(i, o, t);
    case "Never":
      return Gj();
    case "Not":
      return Hj(i, o, t);
    case "Null":
      return zj(i, o, t);
    case "Number":
      return Wj(i, o, t);
    case "Object":
      return Yj(i, o, t);
    case "Promise":
      return Jj(i, o, t);
    case "Record":
      return Zj(i, o, t);
    case "Ref":
      return Qj(i, o, t);
    case "RegExp":
      return Xj(i, o, t);
    case "String":
      return kj(i, o, t);
    case "Symbol":
      return eT(i, o, t);
    case "TemplateLiteral":
      return rT(i, o, t);
    case "This":
      return nT(i, o, t);
    case "Tuple":
      return tT(i, o, t);
    case "Undefined":
      return iT(i, o, t);
    case "Union":
      return oT(i, o, t);
    case "Uint8Array":
      return uT(i, o, t);
    case "Unknown":
      return cT();
    case "Void":
      return sT(i, o, t);
    default:
      if (!Ma(i[re]))
        throw new Mj(i);
      return aT(i, o, t);
  }
}
function Q_(...e) {
  return e.length === 3 ? Qe(e[0], e[1], e[2]) : Qe(e[0], [], e[1]);
}
var Mn = {}, yo = {}, Sn = {}, En = {}, Br = {}, An = {}, mo = {}, Cn = {}, Ie = {}, Qf;
function Xa() {
  if (Qf) return Ie;
  Qf = 1, Object.defineProperty(Ie, "__esModule", { value: !0 }), Ie.IsAsyncIterator = e, Ie.IsIterator = r, Ie.IsStandardObject = t, Ie.IsInstanceObject = o, Ie.IsPromise = i, Ie.IsDate = n, Ie.IsMap = u, Ie.IsSet = c, Ie.IsRegExp = f, Ie.IsTypedArray = s, Ie.IsInt8Array = l, Ie.IsUint8Array = a, Ie.IsUint8ClampedArray = p, Ie.IsInt16Array = $, Ie.IsUint16Array = w, Ie.IsInt32Array = R, Ie.IsUint32Array = v, Ie.IsFloat32Array = C, Ie.IsFloat64Array = A, Ie.IsBigInt64Array = L, Ie.IsBigUint64Array = F, Ie.HasPropertyKey = I, Ie.IsObject = U, Ie.IsArray = _, Ie.IsUndefined = P, Ie.IsNull = T, Ie.IsBoolean = y, Ie.IsNumber = x, Ie.IsInteger = M, Ie.IsBigInt = h, Ie.IsString = D, Ie.IsFunction = z, Ie.IsSymbol = X, Ie.IsValueType = ee;
  function e(G) {
    return U(G) && Symbol.asyncIterator in G;
  }
  function r(G) {
    return U(G) && Symbol.iterator in G;
  }
  function t(G) {
    return U(G) && (Object.getPrototypeOf(G) === Object.prototype || Object.getPrototypeOf(G) === null);
  }
  function o(G) {
    return U(G) && !_(G) && z(G.constructor) && G.constructor.name !== "Object";
  }
  function i(G) {
    return G instanceof Promise;
  }
  function n(G) {
    return G instanceof Date && Number.isFinite(G.getTime());
  }
  function u(G) {
    return G instanceof globalThis.Map;
  }
  function c(G) {
    return G instanceof globalThis.Set;
  }
  function f(G) {
    return G instanceof globalThis.RegExp;
  }
  function s(G) {
    return ArrayBuffer.isView(G);
  }
  function l(G) {
    return G instanceof globalThis.Int8Array;
  }
  function a(G) {
    return G instanceof globalThis.Uint8Array;
  }
  function p(G) {
    return G instanceof globalThis.Uint8ClampedArray;
  }
  function $(G) {
    return G instanceof globalThis.Int16Array;
  }
  function w(G) {
    return G instanceof globalThis.Uint16Array;
  }
  function R(G) {
    return G instanceof globalThis.Int32Array;
  }
  function v(G) {
    return G instanceof globalThis.Uint32Array;
  }
  function C(G) {
    return G instanceof globalThis.Float32Array;
  }
  function A(G) {
    return G instanceof globalThis.Float64Array;
  }
  function L(G) {
    return G instanceof globalThis.BigInt64Array;
  }
  function F(G) {
    return G instanceof globalThis.BigUint64Array;
  }
  function I(G, Pe) {
    return Pe in G;
  }
  function U(G) {
    return G !== null && typeof G == "object";
  }
  function _(G) {
    return Array.isArray(G) && !ArrayBuffer.isView(G);
  }
  function P(G) {
    return G === void 0;
  }
  function T(G) {
    return G === null;
  }
  function y(G) {
    return typeof G == "boolean";
  }
  function x(G) {
    return typeof G == "number";
  }
  function M(G) {
    return Number.isInteger(G);
  }
  function h(G) {
    return typeof G == "bigint";
  }
  function D(G) {
    return typeof G == "string";
  }
  function z(G) {
    return typeof G == "function";
  }
  function X(G) {
    return typeof G == "symbol";
  }
  function ee(G) {
    return h(G) || y(G) || T(G) || x(G) || D(G) || X(G) || P(G);
  }
  return Ie;
}
var Xf;
function Je() {
  return Xf || (Xf = 1, function(e) {
    var r = Cn && Cn.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Cn && Cn.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ Xa(), e);
  }(Cn)), Cn;
}
var kf;
function $s() {
  if (kf) return mo;
  kf = 1, Object.defineProperty(mo, "__esModule", { value: !0 }), mo.TypeSystemPolicy = void 0;
  const e = /* @__PURE__ */ Je();
  var r;
  return function(t) {
    t.InstanceMode = "default", t.ExactOptionalPropertyTypes = !1, t.AllowArrayObject = !1, t.AllowNaN = !1, t.AllowNullVoid = !1;
    function o(f, s) {
      return t.ExactOptionalPropertyTypes ? s in f : f[s] !== void 0;
    }
    t.IsExactOptionalProperty = o;
    function i(f) {
      const s = (0, e.IsObject)(f);
      return t.AllowArrayObject ? s : s && !(0, e.IsArray)(f);
    }
    t.IsObjectLike = i;
    function n(f) {
      return i(f) && !(f instanceof Date) && !(f instanceof Uint8Array);
    }
    t.IsRecordLike = n;
    function u(f) {
      return t.AllowNaN ? (0, e.IsNumber)(f) : Number.isFinite(f);
    }
    t.IsNumberLike = u;
    function c(f) {
      const s = (0, e.IsUndefined)(f);
      return t.AllowNullVoid ? s || f === null : s;
    }
    t.IsVoidLike = c;
  }(r || (mo.TypeSystemPolicy = r = {})), mo;
}
var Yr = {}, Un = {}, Jr = {}, ed;
function fT() {
  if (ed) return Jr;
  ed = 1, Object.defineProperty(Jr, "__esModule", { value: !0 }), Jr.Entries = r, Jr.Clear = t, Jr.Delete = o, Jr.Has = i, Jr.Set = n, Jr.Get = u;
  const e = /* @__PURE__ */ new Map();
  function r() {
    return new Map(e);
  }
  function t() {
    return e.clear();
  }
  function o(c) {
    return e.delete(c);
  }
  function i(c) {
    return e.has(c);
  }
  function n(c, f) {
    e.set(c, f);
  }
  function u(c) {
    return e.get(c);
  }
  return Jr;
}
var Zr = {}, rd;
function dT() {
  if (rd) return Zr;
  rd = 1, Object.defineProperty(Zr, "__esModule", { value: !0 }), Zr.Entries = r, Zr.Clear = t, Zr.Delete = o, Zr.Has = i, Zr.Set = n, Zr.Get = u;
  const e = /* @__PURE__ */ new Map();
  function r() {
    return new Map(e);
  }
  function t() {
    return e.clear();
  }
  function o(c) {
    return e.delete(c);
  }
  function i(c) {
    return e.has(c);
  }
  function n(c, f) {
    e.set(c, f);
  }
  function u(c) {
    return e.get(c);
  }
  return Zr;
}
var nd;
function to() {
  return nd || (nd = 1, Object.defineProperty(Un, "__esModule", { value: !0 }), Un.TypeRegistry = Un.FormatRegistry = void 0, Un.FormatRegistry = fT(), Un.TypeRegistry = dT()), Un;
}
var qn = {}, su = {}, au = {}, fu = {}, We = {}, td;
function gr() {
  if (td) return We;
  td = 1, Object.defineProperty(We, "__esModule", { value: !0 }), We.HasPropertyKey = e, We.IsAsyncIterator = r, We.IsArray = t, We.IsBigInt = o, We.IsBoolean = i, We.IsDate = n, We.IsFunction = u, We.IsIterator = c, We.IsNull = f, We.IsNumber = s, We.IsObject = l, We.IsRegExp = a, We.IsString = p, We.IsSymbol = $, We.IsUint8Array = w, We.IsUndefined = R;
  function e(v, C) {
    return C in v;
  }
  function r(v) {
    return l(v) && !t(v) && !w(v) && Symbol.asyncIterator in v;
  }
  function t(v) {
    return Array.isArray(v);
  }
  function o(v) {
    return typeof v == "bigint";
  }
  function i(v) {
    return typeof v == "boolean";
  }
  function n(v) {
    return v instanceof globalThis.Date;
  }
  function u(v) {
    return typeof v == "function";
  }
  function c(v) {
    return l(v) && !t(v) && !w(v) && Symbol.iterator in v;
  }
  function f(v) {
    return v === null;
  }
  function s(v) {
    return typeof v == "number";
  }
  function l(v) {
    return typeof v == "object" && v !== null;
  }
  function a(v) {
    return v instanceof globalThis.RegExp;
  }
  function p(v) {
    return typeof v == "string";
  }
  function $(v) {
    return typeof v == "symbol";
  }
  function w(v) {
    return v instanceof globalThis.Uint8Array;
  }
  function R(v) {
    return v === void 0;
  }
  return We;
}
var id;
function lT() {
  if (id) return fu;
  id = 1, Object.defineProperty(fu, "__esModule", { value: !0 }), fu.Immutable = u;
  const e = /* @__PURE__ */ gr();
  function r(c) {
    return globalThis.Object.freeze(c).map((f) => u(f));
  }
  function t(c) {
    return c;
  }
  function o(c) {
    return c;
  }
  function i(c) {
    return c;
  }
  function n(c) {
    const f = {};
    for (const s of Object.getOwnPropertyNames(c))
      f[s] = u(c[s]);
    for (const s of Object.getOwnPropertySymbols(c))
      f[s] = u(c[s]);
    return globalThis.Object.freeze(f);
  }
  function u(c) {
    return e.IsArray(c) ? r(c) : e.IsDate(c) ? c : e.IsUint8Array(c) ? c : e.IsRegExp(c) ? c : e.IsObject(c) ? n(c) : c;
  }
  return fu;
}
var du = {}, od;
function Pr() {
  if (od) return du;
  od = 1, Object.defineProperty(du, "__esModule", { value: !0 }), du.Clone = c;
  const e = /* @__PURE__ */ gr();
  function r(f) {
    return f.map((s) => u(s));
  }
  function t(f) {
    return new Date(f.getTime());
  }
  function o(f) {
    return new Uint8Array(f);
  }
  function i(f) {
    return new RegExp(f.source, f.flags);
  }
  function n(f) {
    const s = {};
    for (const l of Object.getOwnPropertyNames(f))
      s[l] = u(f[l]);
    for (const l of Object.getOwnPropertySymbols(f))
      s[l] = u(f[l]);
    return s;
  }
  function u(f) {
    return e.IsArray(f) ? r(f) : e.IsDate(f) ? t(f) : e.IsUint8Array(f) ? o(f) : e.IsRegExp(f) ? i(f) : e.IsObject(f) ? n(f) : f;
  }
  function c(f) {
    return u(f);
  }
  return du;
}
var ud;
function le() {
  if (ud) return au;
  ud = 1, Object.defineProperty(au, "__esModule", { value: !0 }), au.CreateType = o;
  const e = /* @__PURE__ */ $s(), r = /* @__PURE__ */ lT(), t = /* @__PURE__ */ Pr();
  function o(i, n) {
    const u = n !== void 0 ? { ...n, ...i } : i;
    switch (e.TypeSystemPolicy.InstanceMode) {
      case "freeze":
        return (0, r.Immutable)(u);
      case "clone":
        return (0, t.Clone)(u);
      default:
        return u;
    }
  }
  return au;
}
var Nn = {}, mr = {}, cd;
function Fs() {
  return cd || (cd = 1, Object.defineProperty(mr, "__esModule", { value: !0 }), mr.Kind = mr.Hint = mr.OptionalKind = mr.ReadonlyKind = mr.TransformKind = void 0, mr.TransformKind = Symbol.for("TypeBox.Transform"), mr.ReadonlyKind = Symbol.for("TypeBox.Readonly"), mr.OptionalKind = Symbol.for("TypeBox.Optional"), mr.Hint = Symbol.for("TypeBox.Hint"), mr.Kind = Symbol.for("TypeBox.Kind")), mr;
}
var sd;
function ue() {
  return sd || (sd = 1, function(e) {
    var r = Nn && Nn.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Nn && Nn.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ Fs(), e);
  }(Nn)), Nn;
}
var ad;
function pT() {
  if (ad) return su;
  ad = 1, Object.defineProperty(su, "__esModule", { value: !0 }), su.Unsafe = t;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ ue();
  function t(o = {}) {
    return (0, e.CreateType)({ [r.Kind]: o[r.Kind] ?? "Unsafe" }, o);
  }
  return su;
}
var fd;
function ws() {
  return fd || (fd = 1, function(e) {
    var r = qn && qn.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = qn && qn.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ pT(), e);
  }(qn)), qn;
}
var hn = {}, _o = {}, dd;
function X_() {
  if (dd) return _o;
  dd = 1, Object.defineProperty(_o, "__esModule", { value: !0 }), _o.TypeBoxError = void 0;
  class e extends Error {
    constructor(t) {
      super(t);
    }
  }
  return _o.TypeBoxError = e, _o;
}
var ld;
function Be() {
  return ld || (ld = 1, function(e) {
    var r = hn && hn.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = hn && hn.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ X_(), e);
  }(hn)), hn;
}
var pd;
function yT() {
  if (pd) return Yr;
  pd = 1, Object.defineProperty(Yr, "__esModule", { value: !0 }), Yr.TypeSystem = Yr.TypeSystemDuplicateFormat = Yr.TypeSystemDuplicateTypeKind = void 0;
  const e = /* @__PURE__ */ to(), r = /* @__PURE__ */ ws(), t = /* @__PURE__ */ ue(), o = /* @__PURE__ */ Be();
  class i extends o.TypeBoxError {
    constructor(f) {
      super(`Duplicate type kind '${f}' detected`);
    }
  }
  Yr.TypeSystemDuplicateTypeKind = i;
  class n extends o.TypeBoxError {
    constructor(f) {
      super(`Duplicate string format '${f}' detected`);
    }
  }
  Yr.TypeSystemDuplicateFormat = n;
  var u;
  return function(c) {
    function f(l, a) {
      if (e.TypeRegistry.Has(l))
        throw new i(l);
      return e.TypeRegistry.Set(l, a), (p = {}) => (0, r.Unsafe)({ ...p, [t.Kind]: l });
    }
    c.Type = f;
    function s(l, a) {
      if (e.FormatRegistry.Has(l))
        throw new n(l);
      return e.FormatRegistry.Set(l, a), l;
    }
    c.Format = s;
  }(u || (Yr.TypeSystem = u = {})), Yr;
}
var yd;
function ka() {
  return yd || (yd = 1, function(e) {
    var r = An && An.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = An && An.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ $s(), e), t(/* @__PURE__ */ yT(), e);
  }(An)), An;
}
var Kn = {}, lu = {}, vn = {}, pu = {}, md;
function mT() {
  if (md) return pu;
  md = 1, Object.defineProperty(pu, "__esModule", { value: !0 }), pu.MappedKey = t;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ ue();
  function t(o) {
    return (0, e.CreateType)({
      [r.Kind]: "MappedKey",
      keys: o
    });
  }
  return pu;
}
var yu = {}, _d;
function k_() {
  if (_d) return yu;
  _d = 1, Object.defineProperty(yu, "__esModule", { value: !0 }), yu.MappedResult = t;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ ue();
  function t(o) {
    return (0, e.CreateType)({
      [r.Kind]: "MappedResult",
      properties: o
    });
  }
  return yu;
}
var bo = {}, Bn = {}, mu = {}, bd;
function ef() {
  if (bd) return mu;
  bd = 1, Object.defineProperty(mu, "__esModule", { value: !0 }), mu.Discard = r;
  function e(t, o) {
    const { [o]: i, ...n } = t;
    return n;
  }
  function r(t, o) {
    return o.reduce((i, n) => e(i, n), t);
  }
  return mu;
}
var Id;
function Tn() {
  return Id || (Id = 1, function(e) {
    var r = Bn && Bn.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Bn && Bn.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ ef(), e);
  }(Bn)), Bn;
}
var Dn = {}, _u = {}, Od;
function _T() {
  if (Od) return _u;
  Od = 1, Object.defineProperty(_u, "__esModule", { value: !0 }), _u.Array = t;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ ue();
  function t(o, i) {
    return (0, e.CreateType)({ [r.Kind]: "Array", type: "array", items: o }, i);
  }
  return _u;
}
var gd;
function Jo() {
  return gd || (gd = 1, function(e) {
    var r = Dn && Dn.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Dn && Dn.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ _T(), e);
  }(Dn)), Dn;
}
var Ln = {}, bu = {}, Pd;
function bT() {
  if (Pd) return bu;
  Pd = 1, Object.defineProperty(bu, "__esModule", { value: !0 }), bu.AsyncIterator = t;
  const e = /* @__PURE__ */ ue(), r = /* @__PURE__ */ le();
  function t(o, i) {
    return (0, r.CreateType)({ [e.Kind]: "AsyncIterator", type: "AsyncIterator", items: o }, i);
  }
  return bu;
}
var jd;
function Zo() {
  return jd || (jd = 1, function(e) {
    var r = Ln && Ln.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Ln && Ln.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ bT(), e);
  }(Ln)), Ln;
}
var Vn = {}, Iu = {}, Td;
function IT() {
  if (Td) return Iu;
  Td = 1, Object.defineProperty(Iu, "__esModule", { value: !0 }), Iu.Constructor = t;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ ue();
  function t(o, i, n) {
    return (0, e.CreateType)({ [r.Kind]: "Constructor", type: "Constructor", parameters: o, returns: i }, n);
  }
  return Iu;
}
var $d;
function Qo() {
  return $d || ($d = 1, function(e) {
    var r = Vn && Vn.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Vn && Vn.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ IT(), e);
  }(Vn)), Vn;
}
var Gn = {}, Ou = {}, Fd;
function OT() {
  if (Fd) return Ou;
  Fd = 1, Object.defineProperty(Ou, "__esModule", { value: !0 }), Ou.Function = t;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ ue();
  function t(o, i, n) {
    return (0, e.CreateType)({ [r.Kind]: "Function", type: "Function", parameters: o, returns: i }, n);
  }
  return Ou;
}
var wd;
function qi() {
  return wd || (wd = 1, function(e) {
    var r = Gn && Gn.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Gn && Gn.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ OT(), e);
  }(Gn)), Gn;
}
var Hn = {}, gu = {}, zn = {}, Wn = {}, Pu = {}, Yn = {}, xd;
function $n() {
  return xd || (xd = 1, function(e) {
    var r = Yn && Yn.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Yn && Yn.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ le(), e);
  }(Yn)), Yn;
}
var Rd;
function gT() {
  if (Rd) return Pu;
  Rd = 1, Object.defineProperty(Pu, "__esModule", { value: !0 }), Pu.Computed = t;
  const e = /* @__PURE__ */ $n(), r = /* @__PURE__ */ Fs();
  function t(o, i, n) {
    return (0, e.CreateType)({ [r.Kind]: "Computed", target: o, parameters: i }, n);
  }
  return Pu;
}
var Md;
function Fn() {
  return Md || (Md = 1, function(e) {
    var r = Wn && Wn.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Wn && Wn.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ gT(), e);
  }(Wn)), Wn;
}
var Jn = {}, ju = {}, Sd;
function PT() {
  if (Sd) return ju;
  Sd = 1, Object.defineProperty(ju, "__esModule", { value: !0 }), ju.Never = t;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ ue();
  function t(o) {
    return (0, e.CreateType)({ [r.Kind]: "Never", not: {} }, o);
  }
  return ju;
}
var Ed;
function cr() {
  return Ed || (Ed = 1, function(e) {
    var r = Jn && Jn.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Jn && Jn.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ PT(), e);
  }(Jn)), Jn;
}
var Zn = {}, Tu = {}, Qn = {}, $u = {}, Fu = {}, de = {}, Ad;
function we() {
  if (Ad) return de;
  Ad = 1, Object.defineProperty(de, "__esModule", { value: !0 }), de.IsReadonly = t, de.IsOptional = o, de.IsAny = i, de.IsArray = n, de.IsAsyncIterator = u, de.IsBigInt = c, de.IsBoolean = f, de.IsComputed = s, de.IsConstructor = l, de.IsDate = a, de.IsFunction = p, de.IsImport = $, de.IsInteger = w, de.IsProperties = R, de.IsIntersect = v, de.IsIterator = C, de.IsKindOf = A, de.IsLiteralString = L, de.IsLiteralNumber = F, de.IsLiteralBoolean = I, de.IsLiteralValue = U, de.IsLiteral = _, de.IsMappedKey = P, de.IsMappedResult = T, de.IsNever = y, de.IsNot = x, de.IsNull = M, de.IsNumber = h, de.IsObject = D, de.IsPromise = z, de.IsRecord = X, de.IsRecursive = ee, de.IsRef = G, de.IsRegExp = Pe, de.IsString = Se, de.IsSymbol = Ce, de.IsTemplateLiteral = Ae, de.IsThis = Ue, de.IsTransform = je, de.IsTuple = he, de.IsUndefined = J, de.IsUnion = Q, de.IsUint8Array = me, de.IsUnknown = ge, de.IsUnsafe = Z, de.IsVoid = W, de.IsKind = q, de.IsSchema = m;
  const e = /* @__PURE__ */ gr(), r = /* @__PURE__ */ ue();
  function t(b) {
    return e.IsObject(b) && b[r.ReadonlyKind] === "Readonly";
  }
  function o(b) {
    return e.IsObject(b) && b[r.OptionalKind] === "Optional";
  }
  function i(b) {
    return A(b, "Any");
  }
  function n(b) {
    return A(b, "Array");
  }
  function u(b) {
    return A(b, "AsyncIterator");
  }
  function c(b) {
    return A(b, "BigInt");
  }
  function f(b) {
    return A(b, "Boolean");
  }
  function s(b) {
    return A(b, "Computed");
  }
  function l(b) {
    return A(b, "Constructor");
  }
  function a(b) {
    return A(b, "Date");
  }
  function p(b) {
    return A(b, "Function");
  }
  function $(b) {
    return A(b, "Import");
  }
  function w(b) {
    return A(b, "Integer");
  }
  function R(b) {
    return e.IsObject(b);
  }
  function v(b) {
    return A(b, "Intersect");
  }
  function C(b) {
    return A(b, "Iterator");
  }
  function A(b, S) {
    return e.IsObject(b) && r.Kind in b && b[r.Kind] === S;
  }
  function L(b) {
    return _(b) && e.IsString(b.const);
  }
  function F(b) {
    return _(b) && e.IsNumber(b.const);
  }
  function I(b) {
    return _(b) && e.IsBoolean(b.const);
  }
  function U(b) {
    return e.IsBoolean(b) || e.IsNumber(b) || e.IsString(b);
  }
  function _(b) {
    return A(b, "Literal");
  }
  function P(b) {
    return A(b, "MappedKey");
  }
  function T(b) {
    return A(b, "MappedResult");
  }
  function y(b) {
    return A(b, "Never");
  }
  function x(b) {
    return A(b, "Not");
  }
  function M(b) {
    return A(b, "Null");
  }
  function h(b) {
    return A(b, "Number");
  }
  function D(b) {
    return A(b, "Object");
  }
  function z(b) {
    return A(b, "Promise");
  }
  function X(b) {
    return A(b, "Record");
  }
  function ee(b) {
    return e.IsObject(b) && r.Hint in b && b[r.Hint] === "Recursive";
  }
  function G(b) {
    return A(b, "Ref");
  }
  function Pe(b) {
    return A(b, "RegExp");
  }
  function Se(b) {
    return A(b, "String");
  }
  function Ce(b) {
    return A(b, "Symbol");
  }
  function Ae(b) {
    return A(b, "TemplateLiteral");
  }
  function Ue(b) {
    return A(b, "This");
  }
  function je(b) {
    return e.IsObject(b) && r.TransformKind in b;
  }
  function he(b) {
    return A(b, "Tuple");
  }
  function J(b) {
    return A(b, "Undefined");
  }
  function Q(b) {
    return A(b, "Union");
  }
  function me(b) {
    return A(b, "Uint8Array");
  }
  function ge(b) {
    return A(b, "Unknown");
  }
  function Z(b) {
    return A(b, "Unsafe");
  }
  function W(b) {
    return A(b, "Void");
  }
  function q(b) {
    return e.IsObject(b) && r.Kind in b && e.IsString(b[r.Kind]);
  }
  function m(b) {
    return i(b) || n(b) || f(b) || c(b) || u(b) || s(b) || l(b) || a(b) || p(b) || w(b) || v(b) || C(b) || _(b) || P(b) || T(b) || y(b) || x(b) || M(b) || h(b) || D(b) || z(b) || X(b) || G(b) || Pe(b) || Se(b) || Ce(b) || Ae(b) || Ue(b) || he(b) || J(b) || Q(b) || me(b) || ge(b) || Z(b) || W(b) || q(b);
  }
  return de;
}
var Cd;
function eb() {
  if (Cd) return Fu;
  Cd = 1, Object.defineProperty(Fu, "__esModule", { value: !0 }), Fu.Optional = f;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ ue(), t = /* @__PURE__ */ Tn(), o = /* @__PURE__ */ rb(), i = /* @__PURE__ */ we();
  function n(s) {
    return (0, e.CreateType)((0, t.Discard)(s, [r.OptionalKind]));
  }
  function u(s) {
    return (0, e.CreateType)({ ...s, [r.OptionalKind]: "Optional" });
  }
  function c(s, l) {
    return l === !1 ? n(s) : u(s);
  }
  function f(s, l) {
    const a = l ?? !0;
    return (0, i.IsMappedResult)(s) ? (0, o.OptionalFromMappedResult)(s, a) : c(s, a);
  }
  return Fu;
}
var Ud;
function rb() {
  if (Ud) return $u;
  Ud = 1, Object.defineProperty($u, "__esModule", { value: !0 }), $u.OptionalFromMappedResult = i;
  const e = /* @__PURE__ */ Ze(), r = /* @__PURE__ */ eb();
  function t(n, u) {
    const c = {};
    for (const f of globalThis.Object.getOwnPropertyNames(n))
      c[f] = (0, r.Optional)(n[f], u);
    return c;
  }
  function o(n, u) {
    return t(n.properties, u);
  }
  function i(n, u) {
    const c = o(n, u);
    return (0, e.MappedResult)(c);
  }
  return $u;
}
var qd;
function wn() {
  return qd || (qd = 1, function(e) {
    var r = Qn && Qn.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Qn && Qn.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ rb(), e), t(/* @__PURE__ */ eb(), e);
  }(Qn)), Qn;
}
var wu = {}, Nd;
function nb() {
  if (Nd) return wu;
  Nd = 1, Object.defineProperty(wu, "__esModule", { value: !0 }), wu.IntersectCreate = o;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ ue(), t = /* @__PURE__ */ we();
  function o(i, n = {}) {
    const u = i.every((f) => (0, t.IsObject)(f)), c = (0, t.IsSchema)(n.unevaluatedProperties) ? { unevaluatedProperties: n.unevaluatedProperties } : {};
    return (0, e.CreateType)(n.unevaluatedProperties === !1 || (0, t.IsSchema)(n.unevaluatedProperties) || u ? { ...c, [r.Kind]: "Intersect", type: "object", allOf: i } : { ...c, [r.Kind]: "Intersect", allOf: i }, n);
  }
  return wu;
}
var hd;
function jT() {
  if (hd) return Tu;
  hd = 1, Object.defineProperty(Tu, "__esModule", { value: !0 }), Tu.IntersectEvaluated = a;
  const e = /* @__PURE__ */ ue(), r = /* @__PURE__ */ le(), t = /* @__PURE__ */ Tn(), o = /* @__PURE__ */ cr(), i = /* @__PURE__ */ wn(), n = /* @__PURE__ */ nb(), u = /* @__PURE__ */ we();
  function c(p) {
    return p.every(($) => (0, u.IsOptional)($));
  }
  function f(p) {
    return (0, t.Discard)(p, [e.OptionalKind]);
  }
  function s(p) {
    return p.map(($) => (0, u.IsOptional)($) ? f($) : $);
  }
  function l(p, $) {
    return c(p) ? (0, i.Optional)((0, n.IntersectCreate)(s(p), $)) : (0, n.IntersectCreate)(s(p), $);
  }
  function a(p, $ = {}) {
    if (p.length === 1)
      return (0, r.CreateType)(p[0], $);
    if (p.length === 0)
      return (0, o.Never)($);
    if (p.some((w) => (0, u.IsTransform)(w)))
      throw new Error("Cannot intersect transform types");
    return l(p, $);
  }
  return Tu;
}
var Hs = {}, Kd;
function TT() {
  return Kd || (Kd = 1, Object.defineProperty(Hs, "__esModule", { value: !0 })), Hs;
}
var xu = {}, vd;
function $T() {
  if (vd) return xu;
  vd = 1, Object.defineProperty(xu, "__esModule", { value: !0 }), xu.Intersect = i;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ cr(), t = /* @__PURE__ */ nb(), o = /* @__PURE__ */ we();
  function i(n, u) {
    if (n.length === 1)
      return (0, e.CreateType)(n[0], u);
    if (n.length === 0)
      return (0, r.Never)(u);
    if (n.some((c) => (0, o.IsTransform)(c)))
      throw new Error("Cannot intersect transform types");
    return (0, t.IntersectCreate)(n, u);
  }
  return xu;
}
var Bd;
function Mr() {
  return Bd || (Bd = 1, function(e) {
    var r = Zn && Zn.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Zn && Zn.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ jT(), e), t(/* @__PURE__ */ TT(), e), t(/* @__PURE__ */ $T(), e);
  }(Zn)), Zn;
}
var Xn = {}, Ru = {}, Mu = {}, Dd;
function tb() {
  if (Dd) return Mu;
  Dd = 1, Object.defineProperty(Mu, "__esModule", { value: !0 }), Mu.UnionCreate = t;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ ue();
  function t(o, i) {
    return (0, e.CreateType)({ [r.Kind]: "Union", anyOf: o }, i);
  }
  return Mu;
}
var Ld;
function FT() {
  if (Ld) return Ru;
  Ld = 1, Object.defineProperty(Ru, "__esModule", { value: !0 }), Ru.UnionEvaluated = a;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ ue(), t = /* @__PURE__ */ Tn(), o = /* @__PURE__ */ cr(), i = /* @__PURE__ */ wn(), n = /* @__PURE__ */ tb(), u = /* @__PURE__ */ we();
  function c(p) {
    return p.some(($) => (0, u.IsOptional)($));
  }
  function f(p) {
    return p.map(($) => (0, u.IsOptional)($) ? s($) : $);
  }
  function s(p) {
    return (0, t.Discard)(p, [r.OptionalKind]);
  }
  function l(p, $) {
    return c(p) ? (0, i.Optional)((0, n.UnionCreate)(f(p), $)) : (0, n.UnionCreate)(f(p), $);
  }
  function a(p, $) {
    return p.length === 1 ? (0, e.CreateType)(p[0], $) : p.length === 0 ? (0, o.Never)($) : l(p, $);
  }
  return Ru;
}
var zs = {}, Vd;
function wT() {
  return Vd || (Vd = 1, Object.defineProperty(zs, "__esModule", { value: !0 })), zs;
}
var Su = {}, Gd;
function xT() {
  if (Gd) return Su;
  Gd = 1, Object.defineProperty(Su, "__esModule", { value: !0 }), Su.Union = o;
  const e = /* @__PURE__ */ cr(), r = /* @__PURE__ */ le(), t = /* @__PURE__ */ tb();
  function o(i, n) {
    return i.length === 0 ? (0, e.Never)(n) : i.length === 1 ? (0, r.CreateType)(i[0], n) : (0, t.UnionCreate)(i, n);
  }
  return Su;
}
var Hd;
function Le() {
  return Hd || (Hd = 1, function(e) {
    var r = Xn && Xn.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Xn && Xn.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ FT(), e), t(/* @__PURE__ */ wT(), e), t(/* @__PURE__ */ xT(), e);
  }(Xn)), Xn;
}
var Eu = {}, kn = {}, et = {}, rt = {}, zd;
function rf() {
  if (zd) return rt;
  zd = 1, Object.defineProperty(rt, "__esModule", { value: !0 }), rt.TemplateLiteralParserError = void 0, rt.TemplateLiteralParse = $, rt.TemplateLiteralParseExact = w;
  const e = /* @__PURE__ */ Be();
  class r extends e.TypeBoxError {
  }
  rt.TemplateLiteralParserError = r;
  function t(R) {
    return R.replace(/\\\$/g, "$").replace(/\\\*/g, "*").replace(/\\\^/g, "^").replace(/\\\|/g, "|").replace(/\\\(/g, "(").replace(/\\\)/g, ")");
  }
  function o(R, v, C) {
    return R[v] === C && R.charCodeAt(v - 1) !== 92;
  }
  function i(R, v) {
    return o(R, v, "(");
  }
  function n(R, v) {
    return o(R, v, ")");
  }
  function u(R, v) {
    return o(R, v, "|");
  }
  function c(R) {
    if (!(i(R, 0) && n(R, R.length - 1)))
      return !1;
    let v = 0;
    for (let C = 0; C < R.length; C++)
      if (i(R, C) && (v += 1), n(R, C) && (v -= 1), v === 0 && C !== R.length - 1)
        return !1;
    return !0;
  }
  function f(R) {
    return R.slice(1, R.length - 1);
  }
  function s(R) {
    let v = 0;
    for (let C = 0; C < R.length; C++)
      if (i(R, C) && (v += 1), n(R, C) && (v -= 1), u(R, C) && v === 0)
        return !0;
    return !1;
  }
  function l(R) {
    for (let v = 0; v < R.length; v++)
      if (i(R, v))
        return !0;
    return !1;
  }
  function a(R) {
    let [v, C] = [0, 0];
    const A = [];
    for (let F = 0; F < R.length; F++)
      if (i(R, F) && (v += 1), n(R, F) && (v -= 1), u(R, F) && v === 0) {
        const I = R.slice(C, F);
        I.length > 0 && A.push($(I)), C = F + 1;
      }
    const L = R.slice(C);
    return L.length > 0 && A.push($(L)), A.length === 0 ? { type: "const", const: "" } : A.length === 1 ? A[0] : { type: "or", expr: A };
  }
  function p(R) {
    function v(L, F) {
      if (!i(L, F))
        throw new r("TemplateLiteralParser: Index must point to open parens");
      let I = 0;
      for (let U = F; U < L.length; U++)
        if (i(L, U) && (I += 1), n(L, U) && (I -= 1), I === 0)
          return [F, U];
      throw new r("TemplateLiteralParser: Unclosed group parens in expression");
    }
    function C(L, F) {
      for (let I = F; I < L.length; I++)
        if (i(L, I))
          return [F, I];
      return [F, L.length];
    }
    const A = [];
    for (let L = 0; L < R.length; L++)
      if (i(R, L)) {
        const [F, I] = v(R, L), U = R.slice(F, I + 1);
        A.push($(U)), L = I;
      } else {
        const [F, I] = C(R, L), U = R.slice(F, I);
        U.length > 0 && A.push($(U)), L = I - 1;
      }
    return A.length === 0 ? { type: "const", const: "" } : A.length === 1 ? A[0] : { type: "and", expr: A };
  }
  function $(R) {
    return c(R) ? $(f(R)) : s(R) ? a(R) : l(R) ? p(R) : { type: "const", const: t(R) };
  }
  function w(R) {
    return $(R.slice(1, R.length - 1));
  }
  return rt;
}
var Wd;
function ib() {
  if (Wd) return et;
  Wd = 1, Object.defineProperty(et, "__esModule", { value: !0 }), et.TemplateLiteralFiniteError = void 0, et.IsTemplateLiteralExpressionFinite = u, et.IsTemplateLiteralFinite = c;
  const e = /* @__PURE__ */ rf(), r = /* @__PURE__ */ Be();
  class t extends r.TypeBoxError {
  }
  et.TemplateLiteralFiniteError = t;
  function o(f) {
    return f.type === "or" && f.expr.length === 2 && f.expr[0].type === "const" && f.expr[0].const === "0" && f.expr[1].type === "const" && f.expr[1].const === "[1-9][0-9]*";
  }
  function i(f) {
    return f.type === "or" && f.expr.length === 2 && f.expr[0].type === "const" && f.expr[0].const === "true" && f.expr[1].type === "const" && f.expr[1].const === "false";
  }
  function n(f) {
    return f.type === "const" && f.const === ".*";
  }
  function u(f) {
    return o(f) || n(f) ? !1 : i(f) ? !0 : f.type === "and" ? f.expr.every((s) => u(s)) : f.type === "or" ? f.expr.every((s) => u(s)) : f.type === "const" ? !0 : (() => {
      throw new t("Unknown expression type");
    })();
  }
  function c(f) {
    const s = (0, e.TemplateLiteralParseExact)(f.pattern);
    return u(s);
  }
  return et;
}
var nt = {}, Yd;
function ob() {
  if (Yd) return nt;
  Yd = 1, Object.defineProperty(nt, "__esModule", { value: !0 }), nt.TemplateLiteralGenerateError = void 0, nt.TemplateLiteralExpressionGenerate = f, nt.TemplateLiteralGenerate = s;
  const e = /* @__PURE__ */ ib(), r = /* @__PURE__ */ rf(), t = /* @__PURE__ */ Be();
  class o extends t.TypeBoxError {
  }
  nt.TemplateLiteralGenerateError = o;
  function* i(l) {
    if (l.length === 1)
      return yield* l[0];
    for (const a of l[0])
      for (const p of i(l.slice(1)))
        yield `${a}${p}`;
  }
  function* n(l) {
    return yield* i(l.expr.map((a) => [...f(a)]));
  }
  function* u(l) {
    for (const a of l.expr)
      yield* f(a);
  }
  function* c(l) {
    return yield l.const;
  }
  function* f(l) {
    return l.type === "and" ? yield* n(l) : l.type === "or" ? yield* u(l) : l.type === "const" ? yield* c(l) : (() => {
      throw new o("Unknown expression");
    })();
  }
  function s(l) {
    const a = (0, r.TemplateLiteralParseExact)(l.pattern);
    return (0, e.IsTemplateLiteralExpressionFinite)(a) ? [...f(a)] : [];
  }
  return nt;
}
var Au = {}, tt = {}, Cu = {}, Jd;
function RT() {
  if (Jd) return Cu;
  Jd = 1, Object.defineProperty(Cu, "__esModule", { value: !0 }), Cu.Literal = t;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ ue();
  function t(o, i) {
    return (0, e.CreateType)({
      [r.Kind]: "Literal",
      const: o,
      type: typeof o
    }, i);
  }
  return Cu;
}
var Zd;
function ar() {
  return Zd || (Zd = 1, function(e) {
    var r = tt && tt.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = tt && tt.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ RT(), e);
  }(tt)), tt;
}
var it = {}, Uu = {}, Qd;
function MT() {
  if (Qd) return Uu;
  Qd = 1, Object.defineProperty(Uu, "__esModule", { value: !0 }), Uu.Boolean = t;
  const e = /* @__PURE__ */ ue(), r = /* @__PURE__ */ $n();
  function t(o) {
    return (0, r.CreateType)({ [e.Kind]: "Boolean", type: "boolean" }, o);
  }
  return Uu;
}
var Xd;
function xs() {
  return Xd || (Xd = 1, function(e) {
    var r = it && it.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = it && it.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ MT(), e);
  }(it)), it;
}
var ot = {}, qu = {}, kd;
function ST() {
  if (kd) return qu;
  kd = 1, Object.defineProperty(qu, "__esModule", { value: !0 }), qu.BigInt = t;
  const e = /* @__PURE__ */ ue(), r = /* @__PURE__ */ $n();
  function t(o) {
    return (0, r.CreateType)({ [e.Kind]: "BigInt", type: "bigint" }, o);
  }
  return qu;
}
var el;
function Xo() {
  return el || (el = 1, function(e) {
    var r = ot && ot.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = ot && ot.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ ST(), e);
  }(ot)), ot;
}
var ut = {}, Nu = {}, rl;
function ET() {
  if (rl) return Nu;
  rl = 1, Object.defineProperty(Nu, "__esModule", { value: !0 }), Nu.Number = t;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ ue();
  function t(o) {
    return (0, e.CreateType)({ [r.Kind]: "Number", type: "number" }, o);
  }
  return Nu;
}
var nl;
function io() {
  return nl || (nl = 1, function(e) {
    var r = ut && ut.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = ut && ut.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ ET(), e);
  }(ut)), ut;
}
var ct = {}, hu = {}, tl;
function AT() {
  if (tl) return hu;
  tl = 1, Object.defineProperty(hu, "__esModule", { value: !0 }), hu.String = t;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ ue();
  function t(o) {
    return (0, e.CreateType)({ [r.Kind]: "String", type: "string" }, o);
  }
  return hu;
}
var il;
function oo() {
  return il || (il = 1, function(e) {
    var r = ct && ct.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = ct && ct.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ AT(), e);
  }(ct)), ct;
}
var ol;
function ub() {
  if (ol) return Au;
  ol = 1, Object.defineProperty(Au, "__esModule", { value: !0 }), Au.TemplateLiteralSyntax = l;
  const e = /* @__PURE__ */ ar(), r = /* @__PURE__ */ xs(), t = /* @__PURE__ */ Xo(), o = /* @__PURE__ */ io(), i = /* @__PURE__ */ oo(), n = /* @__PURE__ */ Le(), u = /* @__PURE__ */ cr();
  function* c(a) {
    const p = a.trim().replace(/"|'/g, "");
    return p === "boolean" ? yield (0, r.Boolean)() : p === "number" ? yield (0, o.Number)() : p === "bigint" ? yield (0, t.BigInt)() : p === "string" ? yield (0, i.String)() : yield (() => {
      const $ = p.split("|").map((w) => (0, e.Literal)(w.trim()));
      return $.length === 0 ? (0, u.Never)() : $.length === 1 ? $[0] : (0, n.UnionEvaluated)($);
    })();
  }
  function* f(a) {
    if (a[1] !== "{") {
      const p = (0, e.Literal)("$"), $ = s(a.slice(1));
      return yield* [p, ...$];
    }
    for (let p = 2; p < a.length; p++)
      if (a[p] === "}") {
        const $ = c(a.slice(2, p)), w = s(a.slice(p + 1));
        return yield* [...$, ...w];
      }
    yield (0, e.Literal)(a);
  }
  function* s(a) {
    for (let p = 0; p < a.length; p++)
      if (a[p] === "$") {
        const $ = (0, e.Literal)(a.slice(0, p)), w = f(a.slice(p));
        return yield* [$, ...w];
      }
    yield (0, e.Literal)(a);
  }
  function l(a) {
    return [...s(a)];
  }
  return Au;
}
var Ni = {}, st = {}, Ws = {}, ul;
function CT() {
  return ul || (ul = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.PatternNeverExact = e.PatternStringExact = e.PatternNumberExact = e.PatternBooleanExact = e.PatternNever = e.PatternString = e.PatternNumber = e.PatternBoolean = void 0, e.PatternBoolean = "(true|false)", e.PatternNumber = "(0|[1-9][0-9]*)", e.PatternString = "(.*)", e.PatternNever = "(?!.*)", e.PatternBooleanExact = `^${e.PatternBoolean}$`, e.PatternNumberExact = `^${e.PatternNumber}$`, e.PatternStringExact = `^${e.PatternString}$`, e.PatternNeverExact = `^${e.PatternNever}$`;
  }(Ws)), Ws;
}
var cl;
function ko() {
  return cl || (cl = 1, function(e) {
    var r = st && st.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = st && st.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ CT(), e);
  }(st)), st;
}
var sl;
function cb() {
  if (sl) return Ni;
  sl = 1, Object.defineProperty(Ni, "__esModule", { value: !0 }), Ni.TemplateLiteralPatternError = void 0, Ni.TemplateLiteralPattern = c;
  const e = /* @__PURE__ */ ko(), r = /* @__PURE__ */ ue(), t = /* @__PURE__ */ Be(), o = /* @__PURE__ */ we();
  class i extends t.TypeBoxError {
  }
  Ni.TemplateLiteralPatternError = i;
  function n(f) {
    return f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  function u(f, s) {
    return (0, o.IsTemplateLiteral)(f) ? f.pattern.slice(1, f.pattern.length - 1) : (0, o.IsUnion)(f) ? `(${f.anyOf.map((l) => u(l, s)).join("|")})` : (0, o.IsNumber)(f) ? `${s}${e.PatternNumber}` : (0, o.IsInteger)(f) ? `${s}${e.PatternNumber}` : (0, o.IsBigInt)(f) ? `${s}${e.PatternNumber}` : (0, o.IsString)(f) ? `${s}${e.PatternString}` : (0, o.IsLiteral)(f) ? `${s}${n(f.const.toString())}` : (0, o.IsBoolean)(f) ? `${s}${e.PatternBoolean}` : (() => {
      throw new i(`Unexpected Kind '${f[r.Kind]}'`);
    })();
  }
  function c(f) {
    return `^${f.map((s) => u(s, "")).join("")}$`;
  }
  return Ni;
}
var Ku = {}, al;
function UT() {
  if (al) return Ku;
  al = 1, Object.defineProperty(Ku, "__esModule", { value: !0 }), Ku.TemplateLiteralToUnion = o;
  const e = /* @__PURE__ */ Le(), r = /* @__PURE__ */ ar(), t = /* @__PURE__ */ ob();
  function o(i) {
    const u = (0, t.TemplateLiteralGenerate)(i).map((c) => (0, r.Literal)(c));
    return (0, e.UnionEvaluated)(u);
  }
  return Ku;
}
var vu = {}, fl;
function qT() {
  if (fl) return vu;
  fl = 1, Object.defineProperty(vu, "__esModule", { value: !0 }), vu.TemplateLiteral = n;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ ub(), t = /* @__PURE__ */ cb(), o = /* @__PURE__ */ gr(), i = /* @__PURE__ */ ue();
  function n(u, c) {
    const f = (0, o.IsString)(u) ? (0, t.TemplateLiteralPattern)((0, r.TemplateLiteralSyntax)(u)) : (0, t.TemplateLiteralPattern)(u);
    return (0, e.CreateType)({ [i.Kind]: "TemplateLiteral", type: "string", pattern: f }, c);
  }
  return vu;
}
var dl;
function Hr() {
  return dl || (dl = 1, function(e) {
    var r = kn && kn.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = kn && kn.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ ib(), e), t(/* @__PURE__ */ ob(), e), t(/* @__PURE__ */ ub(), e), t(/* @__PURE__ */ rf(), e), t(/* @__PURE__ */ cb(), e), t(/* @__PURE__ */ UT(), e), t(/* @__PURE__ */ qT(), e);
  }(kn)), kn;
}
var ll;
function nf() {
  if (ll) return Eu;
  ll = 1, Object.defineProperty(Eu, "__esModule", { value: !0 }), Eu.IndexPropertyKeys = n;
  const e = /* @__PURE__ */ Hr(), r = /* @__PURE__ */ we();
  function t(u) {
    return (0, e.TemplateLiteralGenerate)(u).map((f) => f.toString());
  }
  function o(u) {
    const c = [];
    for (const f of u)
      c.push(...n(f));
    return c;
  }
  function i(u) {
    return [u.toString()];
  }
  function n(u) {
    return [...new Set((0, r.IsTemplateLiteral)(u) ? t(u) : (0, r.IsUnion)(u) ? o(u.anyOf) : (0, r.IsLiteral)(u) ? i(u.const) : (0, r.IsNumber)(u) ? ["[number]"] : (0, r.IsInteger)(u) ? ["[number]"] : [])];
  }
  return Eu;
}
var Bu = {}, pl;
function sb() {
  if (pl) return Bu;
  pl = 1, Object.defineProperty(Bu, "__esModule", { value: !0 }), Bu.IndexFromMappedResult = n;
  const e = /* @__PURE__ */ Ze(), r = /* @__PURE__ */ nf(), t = /* @__PURE__ */ zr();
  function o(u, c, f) {
    const s = {};
    for (const l of Object.getOwnPropertyNames(c))
      s[l] = (0, t.Index)(u, (0, r.IndexPropertyKeys)(c[l]), f);
    return s;
  }
  function i(u, c, f) {
    return o(u, c.properties, f);
  }
  function n(u, c, f) {
    const s = i(u, c, f);
    return (0, e.MappedResult)(s);
  }
  return Bu;
}
var yl;
function tf() {
  if (yl) return zn;
  yl = 1, Object.defineProperty(zn, "__esModule", { value: !0 }), zn.IndexFromPropertyKey = A, zn.IndexFromPropertyKeys = L, zn.IndexFromComputed = I, zn.Index = U;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ Be(), t = /* @__PURE__ */ Fn(), o = /* @__PURE__ */ cr(), i = /* @__PURE__ */ Mr(), n = /* @__PURE__ */ Le(), u = /* @__PURE__ */ nf(), c = /* @__PURE__ */ ab(), f = /* @__PURE__ */ sb(), s = /* @__PURE__ */ we();
  function l(_, P) {
    return _.map((T) => A(T, P));
  }
  function a(_) {
    return _.filter((P) => !(0, s.IsNever)(P));
  }
  function p(_, P) {
    return (0, i.IntersectEvaluated)(a(l(_, P)));
  }
  function $(_) {
    return _.some((P) => (0, s.IsNever)(P)) ? [] : _;
  }
  function w(_, P) {
    return (0, n.UnionEvaluated)($(l(_, P)));
  }
  function R(_, P) {
    return P in _ ? _[P] : P === "[number]" ? (0, n.UnionEvaluated)(_) : (0, o.Never)();
  }
  function v(_, P) {
    return P === "[number]" ? _ : (0, o.Never)();
  }
  function C(_, P) {
    return P in _ ? _[P] : (0, o.Never)();
  }
  function A(_, P) {
    return (0, s.IsIntersect)(_) ? p(_.allOf, P) : (0, s.IsUnion)(_) ? w(_.anyOf, P) : (0, s.IsTuple)(_) ? R(_.items ?? [], P) : (0, s.IsArray)(_) ? v(_.items, P) : (0, s.IsObject)(_) ? C(_.properties, P) : (0, o.Never)();
  }
  function L(_, P) {
    return P.map((T) => A(_, T));
  }
  function F(_, P) {
    return (0, n.UnionEvaluated)(L(_, P));
  }
  function I(_, P) {
    return (0, t.Computed)("Index", [_, P]);
  }
  function U(_, P, T) {
    if ((0, s.IsRef)(_) || (0, s.IsRef)(P)) {
      const y = "Index types using Ref parameters require both Type and Key to be of TSchema";
      if (!(0, s.IsSchema)(_) || !(0, s.IsSchema)(P))
        throw new r.TypeBoxError(y);
      return (0, t.Computed)("Index", [_, P]);
    }
    return (0, s.IsMappedResult)(P) ? (0, f.IndexFromMappedResult)(_, P, T) : (0, s.IsMappedKey)(P) ? (0, c.IndexFromMappedKey)(_, P, T) : (0, e.CreateType)((0, s.IsSchema)(P) ? F(_, (0, u.IndexPropertyKeys)(P)) : F(_, P), T);
  }
  return zn;
}
var ml;
function ab() {
  if (ml) return gu;
  ml = 1, Object.defineProperty(gu, "__esModule", { value: !0 }), gu.IndexFromMappedKey = u;
  const e = /* @__PURE__ */ tf(), r = /* @__PURE__ */ Ze(), t = /* @__PURE__ */ Pr();
  function o(c, f, s) {
    return { [f]: (0, e.Index)(c, [f], (0, t.Clone)(s)) };
  }
  function i(c, f, s) {
    return f.reduce((l, a) => ({ ...l, ...o(c, a, s) }), {});
  }
  function n(c, f, s) {
    return i(c, f.keys, s);
  }
  function u(c, f, s) {
    const l = n(c, f, s);
    return (0, r.MappedResult)(l);
  }
  return gu;
}
var _l;
function zr() {
  return _l || (_l = 1, function(e) {
    var r = Hn && Hn.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Hn && Hn.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ ab(), e), t(/* @__PURE__ */ sb(), e), t(/* @__PURE__ */ nf(), e), t(/* @__PURE__ */ tf(), e);
  }(Hn)), Hn;
}
var at = {}, Du = {}, bl;
function NT() {
  if (bl) return Du;
  bl = 1, Object.defineProperty(Du, "__esModule", { value: !0 }), Du.Iterator = t;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ ue();
  function t(o, i) {
    return (0, e.CreateType)({ [r.Kind]: "Iterator", type: "Iterator", items: o }, i);
  }
  return Du;
}
var Il;
function eu() {
  return Il || (Il = 1, function(e) {
    var r = at && at.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = at && at.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ NT(), e);
  }(at)), at;
}
var ft = {}, Io = {}, Ol;
function hT() {
  if (Ol) return Io;
  Ol = 1, Object.defineProperty(Io, "__esModule", { value: !0 }), Io.Object = void 0;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ ue(), t = /* @__PURE__ */ we();
  function o(n) {
    const u = [];
    for (let c in n)
      (0, t.IsOptional)(n[c]) || u.push(c);
    return u;
  }
  function i(n, u) {
    const c = o(n), f = c.length > 0 ? { [r.Kind]: "Object", type: "object", properties: n, required: c } : { [r.Kind]: "Object", type: "object", properties: n };
    return (0, e.CreateType)(f, u);
  }
  return Io.Object = i, Io;
}
var gl;
function jr() {
  return gl || (gl = 1, function(e) {
    var r = ft && ft.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = ft && ft.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ hT(), e);
  }(ft)), ft;
}
var dt = {}, Lu = {}, Pl;
function KT() {
  if (Pl) return Lu;
  Pl = 1, Object.defineProperty(Lu, "__esModule", { value: !0 }), Lu.Promise = t;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ ue();
  function t(o, i) {
    return (0, e.CreateType)({ [r.Kind]: "Promise", type: "Promise", item: o }, i);
  }
  return Lu;
}
var jl;
function Rs() {
  return jl || (jl = 1, function(e) {
    var r = dt && dt.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = dt && dt.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ KT(), e);
  }(dt)), dt;
}
var lt = {}, Vu = {}, Gu = {}, Tl;
function fb() {
  if (Tl) return Gu;
  Tl = 1, Object.defineProperty(Gu, "__esModule", { value: !0 }), Gu.Readonly = f;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ ue(), t = /* @__PURE__ */ Tn(), o = /* @__PURE__ */ db(), i = /* @__PURE__ */ we();
  function n(s) {
    return (0, e.CreateType)((0, t.Discard)(s, [r.ReadonlyKind]));
  }
  function u(s) {
    return (0, e.CreateType)({ ...s, [r.ReadonlyKind]: "Readonly" });
  }
  function c(s, l) {
    return l === !1 ? n(s) : u(s);
  }
  function f(s, l) {
    const a = l ?? !0;
    return (0, i.IsMappedResult)(s) ? (0, o.ReadonlyFromMappedResult)(s, a) : c(s, a);
  }
  return Gu;
}
var $l;
function db() {
  if ($l) return Vu;
  $l = 1, Object.defineProperty(Vu, "__esModule", { value: !0 }), Vu.ReadonlyFromMappedResult = i;
  const e = /* @__PURE__ */ Ze(), r = /* @__PURE__ */ fb();
  function t(n, u) {
    const c = {};
    for (const f of globalThis.Object.getOwnPropertyNames(n))
      c[f] = (0, r.Readonly)(n[f], u);
    return c;
  }
  function o(n, u) {
    return t(n.properties, u);
  }
  function i(n, u) {
    const c = o(n, u);
    return (0, e.MappedResult)(c);
  }
  return Vu;
}
var Fl;
function uo() {
  return Fl || (Fl = 1, function(e) {
    var r = lt && lt.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = lt && lt.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ db(), e), t(/* @__PURE__ */ fb(), e);
  }(lt)), lt;
}
var pt = {}, Hu = {}, wl;
function vT() {
  if (wl) return Hu;
  wl = 1, Object.defineProperty(Hu, "__esModule", { value: !0 }), Hu.Tuple = t;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ ue();
  function t(o, i) {
    return (0, e.CreateType)(o.length > 0 ? { [r.Kind]: "Tuple", type: "array", items: o, additionalItems: !1, minItems: o.length, maxItems: o.length } : { [r.Kind]: "Tuple", type: "array", minItems: o.length, maxItems: o.length }, i);
  }
  return Hu;
}
var xl;
function xn() {
  return xl || (xl = 1, function(e) {
    var r = pt && pt.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = pt && pt.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ vT(), e);
  }(pt)), pt;
}
var yt = {}, Cr = {}, Rl;
function BT() {
  if (Rl) return Cr;
  Rl = 1, Object.defineProperty(Cr, "__esModule", { value: !0 }), Cr.SetIncludes = e, Cr.SetIsSubset = r, Cr.SetDistinct = t, Cr.SetIntersect = o, Cr.SetUnion = i, Cr.SetComplement = n, Cr.SetIntersectMany = c, Cr.SetUnionMany = f;
  function e(s, l) {
    return s.includes(l);
  }
  function r(s, l) {
    return s.every((a) => e(l, a));
  }
  function t(s) {
    return [...new Set(s)];
  }
  function o(s, l) {
    return s.filter((a) => l.includes(a));
  }
  function i(s, l) {
    return [...s, ...l];
  }
  function n(s, l) {
    return s.filter((a) => !l.includes(a));
  }
  function u(s, l) {
    return s.reduce((a, p) => o(a, p), l);
  }
  function c(s) {
    return s.length === 1 ? s[0] : s.length > 1 ? u(s.slice(1), s[0]) : [];
  }
  function f(s) {
    const l = [];
    for (const a of s)
      l.push(...a);
    return l;
  }
  return Cr;
}
var Ml;
function Ms() {
  return Ml || (Ml = 1, function(e) {
    var r = yt && yt.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = yt && yt.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ BT(), e);
  }(yt)), yt;
}
var Sl;
function DT() {
  if (Sl) return bo;
  Sl = 1, Object.defineProperty(bo, "__esModule", { value: !0 }), bo.MappedFunctionReturnType = x, bo.Mapped = M;
  const e = /* @__PURE__ */ ue(), r = /* @__PURE__ */ Tn(), t = /* @__PURE__ */ Jo(), o = /* @__PURE__ */ Zo(), i = /* @__PURE__ */ Qo(), n = /* @__PURE__ */ qi(), u = /* @__PURE__ */ zr(), c = /* @__PURE__ */ Mr(), f = /* @__PURE__ */ eu(), s = /* @__PURE__ */ ar(), l = /* @__PURE__ */ jr(), a = /* @__PURE__ */ wn(), p = /* @__PURE__ */ Rs(), $ = /* @__PURE__ */ uo(), w = /* @__PURE__ */ xn(), R = /* @__PURE__ */ Le(), v = /* @__PURE__ */ Ms(), C = /* @__PURE__ */ k_(), A = /* @__PURE__ */ we();
  function L(h, D) {
    return h in D ? y(h, D[h]) : (0, C.MappedResult)(D);
  }
  function F(h) {
    return { [h]: (0, s.Literal)(h) };
  }
  function I(h) {
    const D = {};
    for (const z of h)
      D[z] = (0, s.Literal)(z);
    return D;
  }
  function U(h, D) {
    return (0, v.SetIncludes)(D, h) ? F(h) : I(D);
  }
  function _(h, D) {
    const z = U(h, D);
    return L(h, z);
  }
  function P(h, D) {
    return D.map((z) => y(h, z));
  }
  function T(h, D) {
    const z = {};
    for (const X of globalThis.Object.getOwnPropertyNames(D))
      z[X] = y(h, D[X]);
    return z;
  }
  function y(h, D) {
    const z = { ...D };
    return (
      // unevaluated modifier types
      (0, A.IsOptional)(D) ? (0, a.Optional)(y(h, (0, r.Discard)(D, [e.OptionalKind]))) : (0, A.IsReadonly)(D) ? (0, $.Readonly)(y(h, (0, r.Discard)(D, [e.ReadonlyKind]))) : (
        // unevaluated mapped types
        (0, A.IsMappedResult)(D) ? L(h, D.properties) : (0, A.IsMappedKey)(D) ? _(h, D.keys) : (
          // unevaluated types
          (0, A.IsConstructor)(D) ? (0, i.Constructor)(P(h, D.parameters), y(h, D.returns), z) : (0, A.IsFunction)(D) ? (0, n.Function)(P(h, D.parameters), y(h, D.returns), z) : (0, A.IsAsyncIterator)(D) ? (0, o.AsyncIterator)(y(h, D.items), z) : (0, A.IsIterator)(D) ? (0, f.Iterator)(y(h, D.items), z) : (0, A.IsIntersect)(D) ? (0, c.Intersect)(P(h, D.allOf), z) : (0, A.IsUnion)(D) ? (0, R.Union)(P(h, D.anyOf), z) : (0, A.IsTuple)(D) ? (0, w.Tuple)(P(h, D.items ?? []), z) : (0, A.IsObject)(D) ? (0, l.Object)(T(h, D.properties), z) : (0, A.IsArray)(D) ? (0, t.Array)(y(h, D.items), z) : (0, A.IsPromise)(D) ? (0, p.Promise)(y(h, D.item), z) : D
        )
      )
    );
  }
  function x(h, D) {
    const z = {};
    for (const X of h)
      z[X] = y(X, D);
    return z;
  }
  function M(h, D, z) {
    const X = (0, A.IsSchema)(h) ? (0, u.IndexPropertyKeys)(h) : h, ee = D({ [e.Kind]: "MappedKey", keys: X }), G = x(X, ee);
    return (0, l.Object)(G, z);
  }
  return bo;
}
var El;
function Ze() {
  return El || (El = 1, function(e) {
    var r = vn && vn.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = vn && vn.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ mT(), e), t(/* @__PURE__ */ k_(), e), t(/* @__PURE__ */ DT(), e);
  }(vn)), vn;
}
var Oo = {}, mt = {}, zu = {}, Al;
function LT() {
  if (Al) return zu;
  Al = 1, Object.defineProperty(zu, "__esModule", { value: !0 }), zu.Ref = o;
  const e = /* @__PURE__ */ Be(), r = /* @__PURE__ */ le(), t = /* @__PURE__ */ ue();
  function o(...i) {
    const [n, u] = typeof i[0] == "string" ? [i[0], i[1]] : [i[0].$id, i[1]];
    if (typeof n != "string")
      throw new e.TypeBoxError("Ref: $ref must be a string");
    return (0, r.CreateType)({ [t.Kind]: "Ref", $ref: n }, u);
  }
  return zu;
}
var Cl;
function pn() {
  return Cl || (Cl = 1, function(e) {
    var r = mt && mt.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = mt && mt.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ LT(), e);
  }(mt)), mt;
}
var go = {}, Ul;
function of() {
  if (Ul) return go;
  Ul = 1, Object.defineProperty(go, "__esModule", { value: !0 }), go.KeyOfPropertyKeys = s, go.KeyOfPattern = a;
  const e = /* @__PURE__ */ Ms(), r = /* @__PURE__ */ we();
  function t(p) {
    const $ = [];
    for (const w of p)
      $.push(s(w));
    return $;
  }
  function o(p) {
    const $ = t(p);
    return (0, e.SetUnionMany)($);
  }
  function i(p) {
    const $ = t(p);
    return (0, e.SetIntersectMany)($);
  }
  function n(p) {
    return p.map(($, w) => w.toString());
  }
  function u(p) {
    return ["[number]"];
  }
  function c(p) {
    return globalThis.Object.getOwnPropertyNames(p);
  }
  function f(p) {
    return l ? globalThis.Object.getOwnPropertyNames(p).map((w) => w[0] === "^" && w[w.length - 1] === "$" ? w.slice(1, w.length - 1) : w) : [];
  }
  function s(p) {
    return (0, r.IsIntersect)(p) ? o(p.allOf) : (0, r.IsUnion)(p) ? i(p.anyOf) : (0, r.IsTuple)(p) ? n(p.items ?? []) : (0, r.IsArray)(p) ? u(p.items) : (0, r.IsObject)(p) ? c(p.properties) : (0, r.IsRecord)(p) ? f(p.patternProperties) : [];
  }
  let l = !1;
  function a(p) {
    l = !0;
    const $ = s(p);
    return l = !1, `^(${$.map((R) => `(${R})`).join("|")})$`;
  }
  return go;
}
var ql;
function lb() {
  if (ql) return Oo;
  ql = 1, Object.defineProperty(Oo, "__esModule", { value: !0 }), Oo.KeyOfPropertyKeysToRest = p, Oo.KeyOf = $;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ ar(), t = /* @__PURE__ */ io(), o = /* @__PURE__ */ Fn(), i = /* @__PURE__ */ pn(), n = /* @__PURE__ */ of(), u = /* @__PURE__ */ Le(), c = /* @__PURE__ */ pb(), f = /* @__PURE__ */ we();
  function s(w, R) {
    return (0, o.Computed)("KeyOf", [(0, o.Computed)(w, R)]);
  }
  function l(w) {
    return (0, o.Computed)("KeyOf", [(0, i.Ref)(w)]);
  }
  function a(w, R) {
    const v = (0, n.KeyOfPropertyKeys)(w), C = p(v), A = (0, u.UnionEvaluated)(C);
    return (0, e.CreateType)(A, R);
  }
  function p(w) {
    return w.map((R) => R === "[number]" ? (0, t.Number)() : (0, r.Literal)(R));
  }
  function $(w, R) {
    return (0, f.IsComputed)(w) ? s(w.target, w.parameters) : (0, f.IsRef)(w) ? l(w.$ref) : (0, f.IsMappedResult)(w) ? (0, c.KeyOfFromMappedResult)(w, R) : a(w, R);
  }
  return Oo;
}
var Nl;
function pb() {
  if (Nl) return lu;
  Nl = 1, Object.defineProperty(lu, "__esModule", { value: !0 }), lu.KeyOfFromMappedResult = n;
  const e = /* @__PURE__ */ Ze(), r = /* @__PURE__ */ lb(), t = /* @__PURE__ */ Pr();
  function o(u, c) {
    const f = {};
    for (const s of globalThis.Object.getOwnPropertyNames(u))
      f[s] = (0, r.KeyOf)(u[s], (0, t.Clone)(c));
    return f;
  }
  function i(u, c) {
    return o(u.properties, c);
  }
  function n(u, c) {
    const f = i(u, c);
    return (0, e.MappedResult)(f);
  }
  return lu;
}
var Wu = {}, hl;
function VT() {
  if (hl) return Wu;
  hl = 1, Object.defineProperty(Wu, "__esModule", { value: !0 }), Wu.KeyOfPropertyEntries = t;
  const e = /* @__PURE__ */ tf(), r = /* @__PURE__ */ of();
  function t(o) {
    const i = (0, r.KeyOfPropertyKeys)(o), n = (0, e.IndexFromPropertyKeys)(o, i);
    return i.map((u, c) => [i[c], n[c]]);
  }
  return Wu;
}
var Kl;
function Kr() {
  return Kl || (Kl = 1, function(e) {
    var r = Kn && Kn.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Kn && Kn.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ pb(), e), t(/* @__PURE__ */ VT(), e), t(/* @__PURE__ */ of(), e), t(/* @__PURE__ */ lb(), e);
  }(Kn)), Kn;
}
var Yu = {}, vl;
function uf() {
  if (vl) return Yu;
  vl = 1, Object.defineProperty(Yu, "__esModule", { value: !0 }), Yu.ExtendsUndefinedCheck = i;
  const e = /* @__PURE__ */ ue();
  function r(n) {
    return n.allOf.every((u) => i(u));
  }
  function t(n) {
    return n.anyOf.some((u) => i(u));
  }
  function o(n) {
    return !i(n.not);
  }
  function i(n) {
    return n[e.Kind] === "Intersect" ? r(n) : n[e.Kind] === "Union" ? t(n) : n[e.Kind] === "Not" ? o(n) : n[e.Kind] === "Undefined";
  }
  return Yu;
}
var hi = {}, Bl;
function yb() {
  if (Bl) return hi;
  Bl = 1, Object.defineProperty(hi, "__esModule", { value: !0 }), hi.DefaultErrorFunction = t, hi.SetErrorFunction = i, hi.GetErrorFunction = n;
  const e = /* @__PURE__ */ ue(), r = /* @__PURE__ */ Pb();
  function t(u) {
    switch (u.errorType) {
      case r.ValueErrorType.ArrayContains:
        return "Expected array to contain at least one matching value";
      case r.ValueErrorType.ArrayMaxContains:
        return `Expected array to contain no more than ${u.schema.maxContains} matching values`;
      case r.ValueErrorType.ArrayMinContains:
        return `Expected array to contain at least ${u.schema.minContains} matching values`;
      case r.ValueErrorType.ArrayMaxItems:
        return `Expected array length to be less or equal to ${u.schema.maxItems}`;
      case r.ValueErrorType.ArrayMinItems:
        return `Expected array length to be greater or equal to ${u.schema.minItems}`;
      case r.ValueErrorType.ArrayUniqueItems:
        return "Expected array elements to be unique";
      case r.ValueErrorType.Array:
        return "Expected array";
      case r.ValueErrorType.AsyncIterator:
        return "Expected AsyncIterator";
      case r.ValueErrorType.BigIntExclusiveMaximum:
        return `Expected bigint to be less than ${u.schema.exclusiveMaximum}`;
      case r.ValueErrorType.BigIntExclusiveMinimum:
        return `Expected bigint to be greater than ${u.schema.exclusiveMinimum}`;
      case r.ValueErrorType.BigIntMaximum:
        return `Expected bigint to be less or equal to ${u.schema.maximum}`;
      case r.ValueErrorType.BigIntMinimum:
        return `Expected bigint to be greater or equal to ${u.schema.minimum}`;
      case r.ValueErrorType.BigIntMultipleOf:
        return `Expected bigint to be a multiple of ${u.schema.multipleOf}`;
      case r.ValueErrorType.BigInt:
        return "Expected bigint";
      case r.ValueErrorType.Boolean:
        return "Expected boolean";
      case r.ValueErrorType.DateExclusiveMinimumTimestamp:
        return `Expected Date timestamp to be greater than ${u.schema.exclusiveMinimumTimestamp}`;
      case r.ValueErrorType.DateExclusiveMaximumTimestamp:
        return `Expected Date timestamp to be less than ${u.schema.exclusiveMaximumTimestamp}`;
      case r.ValueErrorType.DateMinimumTimestamp:
        return `Expected Date timestamp to be greater or equal to ${u.schema.minimumTimestamp}`;
      case r.ValueErrorType.DateMaximumTimestamp:
        return `Expected Date timestamp to be less or equal to ${u.schema.maximumTimestamp}`;
      case r.ValueErrorType.DateMultipleOfTimestamp:
        return `Expected Date timestamp to be a multiple of ${u.schema.multipleOfTimestamp}`;
      case r.ValueErrorType.Date:
        return "Expected Date";
      case r.ValueErrorType.Function:
        return "Expected function";
      case r.ValueErrorType.IntegerExclusiveMaximum:
        return `Expected integer to be less than ${u.schema.exclusiveMaximum}`;
      case r.ValueErrorType.IntegerExclusiveMinimum:
        return `Expected integer to be greater than ${u.schema.exclusiveMinimum}`;
      case r.ValueErrorType.IntegerMaximum:
        return `Expected integer to be less or equal to ${u.schema.maximum}`;
      case r.ValueErrorType.IntegerMinimum:
        return `Expected integer to be greater or equal to ${u.schema.minimum}`;
      case r.ValueErrorType.IntegerMultipleOf:
        return `Expected integer to be a multiple of ${u.schema.multipleOf}`;
      case r.ValueErrorType.Integer:
        return "Expected integer";
      case r.ValueErrorType.IntersectUnevaluatedProperties:
        return "Unexpected property";
      case r.ValueErrorType.Intersect:
        return "Expected all values to match";
      case r.ValueErrorType.Iterator:
        return "Expected Iterator";
      case r.ValueErrorType.Literal:
        return `Expected ${typeof u.schema.const == "string" ? `'${u.schema.const}'` : u.schema.const}`;
      case r.ValueErrorType.Never:
        return "Never";
      case r.ValueErrorType.Not:
        return "Value should not match";
      case r.ValueErrorType.Null:
        return "Expected null";
      case r.ValueErrorType.NumberExclusiveMaximum:
        return `Expected number to be less than ${u.schema.exclusiveMaximum}`;
      case r.ValueErrorType.NumberExclusiveMinimum:
        return `Expected number to be greater than ${u.schema.exclusiveMinimum}`;
      case r.ValueErrorType.NumberMaximum:
        return `Expected number to be less or equal to ${u.schema.maximum}`;
      case r.ValueErrorType.NumberMinimum:
        return `Expected number to be greater or equal to ${u.schema.minimum}`;
      case r.ValueErrorType.NumberMultipleOf:
        return `Expected number to be a multiple of ${u.schema.multipleOf}`;
      case r.ValueErrorType.Number:
        return "Expected number";
      case r.ValueErrorType.Object:
        return "Expected object";
      case r.ValueErrorType.ObjectAdditionalProperties:
        return "Unexpected property";
      case r.ValueErrorType.ObjectMaxProperties:
        return `Expected object to have no more than ${u.schema.maxProperties} properties`;
      case r.ValueErrorType.ObjectMinProperties:
        return `Expected object to have at least ${u.schema.minProperties} properties`;
      case r.ValueErrorType.ObjectRequiredProperty:
        return "Expected required property";
      case r.ValueErrorType.Promise:
        return "Expected Promise";
      case r.ValueErrorType.RegExp:
        return "Expected string to match regular expression";
      case r.ValueErrorType.StringFormatUnknown:
        return `Unknown format '${u.schema.format}'`;
      case r.ValueErrorType.StringFormat:
        return `Expected string to match '${u.schema.format}' format`;
      case r.ValueErrorType.StringMaxLength:
        return `Expected string length less or equal to ${u.schema.maxLength}`;
      case r.ValueErrorType.StringMinLength:
        return `Expected string length greater or equal to ${u.schema.minLength}`;
      case r.ValueErrorType.StringPattern:
        return `Expected string to match '${u.schema.pattern}'`;
      case r.ValueErrorType.String:
        return "Expected string";
      case r.ValueErrorType.Symbol:
        return "Expected symbol";
      case r.ValueErrorType.TupleLength:
        return `Expected tuple to have ${u.schema.maxItems || 0} elements`;
      case r.ValueErrorType.Tuple:
        return "Expected tuple";
      case r.ValueErrorType.Uint8ArrayMaxByteLength:
        return `Expected byte length less or equal to ${u.schema.maxByteLength}`;
      case r.ValueErrorType.Uint8ArrayMinByteLength:
        return `Expected byte length greater or equal to ${u.schema.minByteLength}`;
      case r.ValueErrorType.Uint8Array:
        return "Expected Uint8Array";
      case r.ValueErrorType.Undefined:
        return "Expected undefined";
      case r.ValueErrorType.Union:
        return "Expected union value";
      case r.ValueErrorType.Void:
        return "Expected void";
      case r.ValueErrorType.Kind:
        return `Expected kind '${u.schema[e.Kind]}'`;
      default:
        return "Unknown error type";
    }
  }
  let o = t;
  function i(u) {
    o = u;
  }
  function n() {
    return o;
  }
  return hi;
}
var _t = {}, bt = {}, Dl;
function GT() {
  if (Dl) return bt;
  Dl = 1, Object.defineProperty(bt, "__esModule", { value: !0 }), bt.TypeDereferenceError = void 0, bt.Pushref = n, bt.Deref = u;
  const e = /* @__PURE__ */ Be(), r = /* @__PURE__ */ ue(), t = /* @__PURE__ */ Xa();
  class o extends e.TypeBoxError {
    constructor(f) {
      super(`Unable to dereference schema with $id '${f.$ref}'`), this.schema = f;
    }
  }
  bt.TypeDereferenceError = o;
  function i(c, f) {
    const s = f.find((l) => l.$id === c.$ref);
    if (s === void 0)
      throw new o(c);
    return u(s, f);
  }
  function n(c, f) {
    return !(0, t.IsString)(c.$id) || f.some((s) => s.$id === c.$id) || f.push(c), f;
  }
  function u(c, f) {
    return c[r.Kind] === "This" || c[r.Kind] === "Ref" ? i(c, f) : c;
  }
  return bt;
}
var Ll;
function vr() {
  return Ll || (Ll = 1, function(e) {
    var r = _t && _t.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = _t && _t.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ GT(), e);
  }(_t)), _t;
}
var It = {}, Ki = {}, Vl;
function HT() {
  if (Vl) return Ki;
  Vl = 1, Object.defineProperty(Ki, "__esModule", { value: !0 }), Ki.ValueHashError = void 0, Ki.Hash = T;
  const e = /* @__PURE__ */ Je(), r = /* @__PURE__ */ Be();
  class t extends r.TypeBoxError {
    constructor(x) {
      super("Unable to hash value"), this.value = x;
    }
  }
  Ki.ValueHashError = t;
  var o;
  (function(y) {
    y[y.Undefined = 0] = "Undefined", y[y.Null = 1] = "Null", y[y.Boolean = 2] = "Boolean", y[y.Number = 3] = "Number", y[y.String = 4] = "String", y[y.Object = 5] = "Object", y[y.Array = 6] = "Array", y[y.Date = 7] = "Date", y[y.Uint8Array = 8] = "Uint8Array", y[y.Symbol = 9] = "Symbol", y[y.BigInt = 10] = "BigInt";
  })(o || (o = {}));
  let i = BigInt("14695981039346656037");
  const [n, u] = [BigInt("1099511628211"), BigInt(
    "18446744073709551616"
    /* 2 ^ 64 */
  )], c = Array.from({ length: 256 }).map((y, x) => BigInt(x)), f = new Float64Array(1), s = new DataView(f.buffer), l = new Uint8Array(f.buffer);
  function* a(y) {
    const x = y === 0 ? 1 : Math.ceil(Math.floor(Math.log2(y) + 1) / 8);
    for (let M = 0; M < x; M++)
      yield y >> 8 * (x - 1 - M) & 255;
  }
  function p(y) {
    P(o.Array);
    for (const x of y)
      _(x);
  }
  function $(y) {
    P(o.Boolean), P(y ? 1 : 0);
  }
  function w(y) {
    P(o.BigInt), s.setBigInt64(0, y);
    for (const x of l)
      P(x);
  }
  function R(y) {
    P(o.Date), _(y.getTime());
  }
  function v(y) {
    P(o.Null);
  }
  function C(y) {
    P(o.Number), s.setFloat64(0, y);
    for (const x of l)
      P(x);
  }
  function A(y) {
    P(o.Object);
    for (const x of globalThis.Object.getOwnPropertyNames(y).sort())
      _(x), _(y[x]);
  }
  function L(y) {
    P(o.String);
    for (let x = 0; x < y.length; x++)
      for (const M of a(y.charCodeAt(x)))
        P(M);
  }
  function F(y) {
    P(o.Symbol), _(y.description);
  }
  function I(y) {
    P(o.Uint8Array);
    for (let x = 0; x < y.length; x++)
      P(y[x]);
  }
  function U(y) {
    return P(o.Undefined);
  }
  function _(y) {
    if ((0, e.IsArray)(y))
      return p(y);
    if ((0, e.IsBoolean)(y))
      return $(y);
    if ((0, e.IsBigInt)(y))
      return w(y);
    if ((0, e.IsDate)(y))
      return R(y);
    if ((0, e.IsNull)(y))
      return v();
    if ((0, e.IsNumber)(y))
      return C(y);
    if ((0, e.IsObject)(y))
      return A(y);
    if ((0, e.IsString)(y))
      return L(y);
    if ((0, e.IsSymbol)(y))
      return F(y);
    if ((0, e.IsUint8Array)(y))
      return I(y);
    if ((0, e.IsUndefined)(y))
      return U();
    throw new t(y);
  }
  function P(y) {
    i = i ^ c[y], i = i * n % u;
  }
  function T(y) {
    return i = BigInt("14695981039346656037"), _(y), i;
  }
  return Ki;
}
var Gl;
function ru() {
  return Gl || (Gl = 1, function(e) {
    var r = It && It.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = It && It.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ HT(), e);
  }(It)), It;
}
var Ot = {}, vi = {}, gt = {}, yn = {}, Pt = {}, Ju = {}, Hl;
function zT() {
  if (Hl) return Ju;
  Hl = 1, Object.defineProperty(Ju, "__esModule", { value: !0 }), Ju.Any = t;
  const e = /* @__PURE__ */ $n(), r = /* @__PURE__ */ ue();
  function t(o) {
    return (0, e.CreateType)({ [r.Kind]: "Any" }, o);
  }
  return Ju;
}
var zl;
function nu() {
  return zl || (zl = 1, function(e) {
    var r = Pt && Pt.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Pt && Pt.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ zT(), e);
  }(Pt)), Pt;
}
var jt = {}, Zu = {}, Wl;
function WT() {
  if (Wl) return Zu;
  Wl = 1, Object.defineProperty(Zu, "__esModule", { value: !0 }), Zu.Unknown = t;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ ue();
  function t(o) {
    return (0, e.CreateType)({ [r.Kind]: "Unknown" }, o);
  }
  return Zu;
}
var Yl;
function co() {
  return Yl || (Yl = 1, function(e) {
    var r = jt && jt.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = jt && jt.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ WT(), e);
  }(jt)), jt;
}
var Qr = {}, fe = {}, Jl;
function mb() {
  if (Jl) return fe;
  Jl = 1, Object.defineProperty(fe, "__esModule", { value: !0 }), fe.TypeGuardUnknownTypeError = void 0, fe.IsReadonly = R, fe.IsOptional = v, fe.IsAny = C, fe.IsArray = A, fe.IsAsyncIterator = L, fe.IsBigInt = F, fe.IsBoolean = I, fe.IsComputed = U, fe.IsConstructor = _, fe.IsDate = P, fe.IsFunction = T, fe.IsImport = y, fe.IsInteger = x, fe.IsProperties = M, fe.IsIntersect = h, fe.IsIterator = D, fe.IsKindOf = z, fe.IsLiteralString = X, fe.IsLiteralNumber = ee, fe.IsLiteralBoolean = G, fe.IsLiteral = Pe, fe.IsLiteralValue = Se, fe.IsMappedKey = Ce, fe.IsMappedResult = Ae, fe.IsNever = Ue, fe.IsNot = je, fe.IsNull = he, fe.IsNumber = J, fe.IsObject = Q, fe.IsPromise = me, fe.IsRecord = ge, fe.IsRecursive = Z, fe.IsRef = W, fe.IsRegExp = q, fe.IsString = m, fe.IsSymbol = b, fe.IsTemplateLiteral = S, fe.IsThis = V, fe.IsTransform = d, fe.IsTuple = Y, fe.IsUndefined = K, fe.IsUnionLiteral = E, fe.IsUnion = ie, fe.IsUint8Array = k, fe.IsUnknown = se, fe.IsUnsafe = ae, fe.IsVoid = qe, fe.IsKind = Er, fe.IsSchema = Ke;
  const e = /* @__PURE__ */ gr(), r = /* @__PURE__ */ ue(), t = /* @__PURE__ */ Be();
  class o extends t.TypeBoxError {
  }
  fe.TypeGuardUnknownTypeError = o;
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
  function n(g) {
    try {
      return new RegExp(g), !0;
    } catch {
      return !1;
    }
  }
  function u(g) {
    if (!e.IsString(g))
      return !1;
    for (let Te = 0; Te < g.length; Te++) {
      const fr = g.charCodeAt(Te);
      if (fr >= 7 && fr <= 13 || fr === 27 || fr === 127)
        return !1;
    }
    return !0;
  }
  function c(g) {
    return l(g) || Ke(g);
  }
  function f(g) {
    return e.IsUndefined(g) || e.IsBigInt(g);
  }
  function s(g) {
    return e.IsUndefined(g) || e.IsNumber(g);
  }
  function l(g) {
    return e.IsUndefined(g) || e.IsBoolean(g);
  }
  function a(g) {
    return e.IsUndefined(g) || e.IsString(g);
  }
  function p(g) {
    return e.IsUndefined(g) || e.IsString(g) && u(g) && n(g);
  }
  function $(g) {
    return e.IsUndefined(g) || e.IsString(g) && u(g);
  }
  function w(g) {
    return e.IsUndefined(g) || Ke(g);
  }
  function R(g) {
    return e.IsObject(g) && g[r.ReadonlyKind] === "Readonly";
  }
  function v(g) {
    return e.IsObject(g) && g[r.OptionalKind] === "Optional";
  }
  function C(g) {
    return z(g, "Any") && a(g.$id);
  }
  function A(g) {
    return z(g, "Array") && g.type === "array" && a(g.$id) && Ke(g.items) && s(g.minItems) && s(g.maxItems) && l(g.uniqueItems) && w(g.contains) && s(g.minContains) && s(g.maxContains);
  }
  function L(g) {
    return z(g, "AsyncIterator") && g.type === "AsyncIterator" && a(g.$id) && Ke(g.items);
  }
  function F(g) {
    return z(g, "BigInt") && g.type === "bigint" && a(g.$id) && f(g.exclusiveMaximum) && f(g.exclusiveMinimum) && f(g.maximum) && f(g.minimum) && f(g.multipleOf);
  }
  function I(g) {
    return z(g, "Boolean") && g.type === "boolean" && a(g.$id);
  }
  function U(g) {
    return z(g, "Computed") && e.IsString(g.target) && e.IsArray(g.parameters) && g.parameters.every((Te) => Ke(Te));
  }
  function _(g) {
    return z(g, "Constructor") && g.type === "Constructor" && a(g.$id) && e.IsArray(g.parameters) && g.parameters.every((Te) => Ke(Te)) && Ke(g.returns);
  }
  function P(g) {
    return z(g, "Date") && g.type === "Date" && a(g.$id) && s(g.exclusiveMaximumTimestamp) && s(g.exclusiveMinimumTimestamp) && s(g.maximumTimestamp) && s(g.minimumTimestamp) && s(g.multipleOfTimestamp);
  }
  function T(g) {
    return z(g, "Function") && g.type === "Function" && a(g.$id) && e.IsArray(g.parameters) && g.parameters.every((Te) => Ke(Te)) && Ke(g.returns);
  }
  function y(g) {
    return z(g, "Import") && e.HasPropertyKey(g, "$defs") && e.IsObject(g.$defs) && M(g.$defs) && e.HasPropertyKey(g, "$ref") && e.IsString(g.$ref) && g.$ref in g.$defs;
  }
  function x(g) {
    return z(g, "Integer") && g.type === "integer" && a(g.$id) && s(g.exclusiveMaximum) && s(g.exclusiveMinimum) && s(g.maximum) && s(g.minimum) && s(g.multipleOf);
  }
  function M(g) {
    return e.IsObject(g) && Object.entries(g).every(([Te, fr]) => u(Te) && Ke(fr));
  }
  function h(g) {
    return z(g, "Intersect") && !(e.IsString(g.type) && g.type !== "object") && e.IsArray(g.allOf) && g.allOf.every((Te) => Ke(Te) && !d(Te)) && a(g.type) && (l(g.unevaluatedProperties) || w(g.unevaluatedProperties)) && a(g.$id);
  }
  function D(g) {
    return z(g, "Iterator") && g.type === "Iterator" && a(g.$id) && Ke(g.items);
  }
  function z(g, Te) {
    return e.IsObject(g) && r.Kind in g && g[r.Kind] === Te;
  }
  function X(g) {
    return Pe(g) && e.IsString(g.const);
  }
  function ee(g) {
    return Pe(g) && e.IsNumber(g.const);
  }
  function G(g) {
    return Pe(g) && e.IsBoolean(g.const);
  }
  function Pe(g) {
    return z(g, "Literal") && a(g.$id) && Se(g.const);
  }
  function Se(g) {
    return e.IsBoolean(g) || e.IsNumber(g) || e.IsString(g);
  }
  function Ce(g) {
    return z(g, "MappedKey") && e.IsArray(g.keys) && g.keys.every((Te) => e.IsNumber(Te) || e.IsString(Te));
  }
  function Ae(g) {
    return z(g, "MappedResult") && M(g.properties);
  }
  function Ue(g) {
    return z(g, "Never") && e.IsObject(g.not) && Object.getOwnPropertyNames(g.not).length === 0;
  }
  function je(g) {
    return z(g, "Not") && Ke(g.not);
  }
  function he(g) {
    return z(g, "Null") && g.type === "null" && a(g.$id);
  }
  function J(g) {
    return z(g, "Number") && g.type === "number" && a(g.$id) && s(g.exclusiveMaximum) && s(g.exclusiveMinimum) && s(g.maximum) && s(g.minimum) && s(g.multipleOf);
  }
  function Q(g) {
    return z(g, "Object") && g.type === "object" && a(g.$id) && M(g.properties) && c(g.additionalProperties) && s(g.minProperties) && s(g.maxProperties);
  }
  function me(g) {
    return z(g, "Promise") && g.type === "Promise" && a(g.$id) && Ke(g.item);
  }
  function ge(g) {
    return z(g, "Record") && g.type === "object" && a(g.$id) && c(g.additionalProperties) && e.IsObject(g.patternProperties) && ((Te) => {
      const fr = Object.getOwnPropertyNames(Te.patternProperties);
      return fr.length === 1 && n(fr[0]) && e.IsObject(Te.patternProperties) && Ke(Te.patternProperties[fr[0]]);
    })(g);
  }
  function Z(g) {
    return e.IsObject(g) && r.Hint in g && g[r.Hint] === "Recursive";
  }
  function W(g) {
    return z(g, "Ref") && a(g.$id) && e.IsString(g.$ref);
  }
  function q(g) {
    return z(g, "RegExp") && a(g.$id) && e.IsString(g.source) && e.IsString(g.flags) && s(g.maxLength) && s(g.minLength);
  }
  function m(g) {
    return z(g, "String") && g.type === "string" && a(g.$id) && s(g.minLength) && s(g.maxLength) && p(g.pattern) && $(g.format);
  }
  function b(g) {
    return z(g, "Symbol") && g.type === "symbol" && a(g.$id);
  }
  function S(g) {
    return z(g, "TemplateLiteral") && g.type === "string" && e.IsString(g.pattern) && g.pattern[0] === "^" && g.pattern[g.pattern.length - 1] === "$";
  }
  function V(g) {
    return z(g, "This") && a(g.$id) && e.IsString(g.$ref);
  }
  function d(g) {
    return e.IsObject(g) && r.TransformKind in g;
  }
  function Y(g) {
    return z(g, "Tuple") && g.type === "array" && a(g.$id) && e.IsNumber(g.minItems) && e.IsNumber(g.maxItems) && g.minItems === g.maxItems && // empty
    (e.IsUndefined(g.items) && e.IsUndefined(g.additionalItems) && g.minItems === 0 || e.IsArray(g.items) && g.items.every((Te) => Ke(Te)));
  }
  function K(g) {
    return z(g, "Undefined") && g.type === "undefined" && a(g.$id);
  }
  function E(g) {
    return ie(g) && g.anyOf.every((Te) => X(Te) || ee(Te));
  }
  function ie(g) {
    return z(g, "Union") && a(g.$id) && e.IsObject(g) && e.IsArray(g.anyOf) && g.anyOf.every((Te) => Ke(Te));
  }
  function k(g) {
    return z(g, "Uint8Array") && g.type === "Uint8Array" && a(g.$id) && s(g.minByteLength) && s(g.maxByteLength);
  }
  function se(g) {
    return z(g, "Unknown") && a(g.$id);
  }
  function ae(g) {
    return z(g, "Unsafe");
  }
  function qe(g) {
    return z(g, "Void") && g.type === "void" && a(g.$id);
  }
  function Er(g) {
    return e.IsObject(g) && r.Kind in g && e.IsString(g[r.Kind]) && !i.includes(g[r.Kind]);
  }
  function Ke(g) {
    return e.IsObject(g) && (C(g) || A(g) || I(g) || F(g) || L(g) || U(g) || _(g) || P(g) || T(g) || x(g) || h(g) || D(g) || Pe(g) || Ce(g) || Ae(g) || Ue(g) || je(g) || he(g) || J(g) || Q(g) || me(g) || ge(g) || W(g) || q(g) || m(g) || b(g) || S(g) || V(g) || Y(g) || K(g) || ie(g) || k(g) || se(g) || ae(g) || qe(g) || Er(g));
  }
  return fe;
}
var Zl;
function _b() {
  return Zl || (Zl = 1, Object.defineProperty(Qr, "__esModule", { value: !0 }), Qr.ValueGuard = Qr.TypeGuard = Qr.KindGuard = void 0, Qr.KindGuard = /* @__PURE__ */ we(), Qr.TypeGuard = /* @__PURE__ */ mb(), Qr.ValueGuard = /* @__PURE__ */ gr()), Qr;
}
var Ql;
function bb() {
  if (Ql) return yn;
  Ql = 1, Object.defineProperty(yn, "__esModule", { value: !0 }), yn.ExtendsResult = yn.ExtendsResolverError = void 0, yn.ExtendsCheck = Ar;
  const e = /* @__PURE__ */ nu(), r = /* @__PURE__ */ qi(), t = /* @__PURE__ */ io(), o = /* @__PURE__ */ oo(), i = /* @__PURE__ */ co(), n = /* @__PURE__ */ Hr(), u = /* @__PURE__ */ ko(), c = /* @__PURE__ */ ue(), f = /* @__PURE__ */ Be(), s = /* @__PURE__ */ _b();
  class l extends f.TypeBoxError {
  }
  yn.ExtendsResolverError = l;
  var a;
  (function(O) {
    O[O.Union = 0] = "Union", O[O.True = 1] = "True", O[O.False = 2] = "False";
  })(a || (yn.ExtendsResult = a = {}));
  function p(O) {
    return O === a.False ? O : a.True;
  }
  function $(O) {
    throw new l(O);
  }
  function w(O) {
    return s.TypeGuard.IsNever(O) || s.TypeGuard.IsIntersect(O) || s.TypeGuard.IsUnion(O) || s.TypeGuard.IsUnknown(O) || s.TypeGuard.IsAny(O);
  }
  function R(O, j) {
    return s.TypeGuard.IsNever(j) ? ee() : s.TypeGuard.IsIntersect(j) ? h(O, j) : s.TypeGuard.IsUnion(j) ? ne(O, j) : s.TypeGuard.IsUnknown(j) ? pe() : s.TypeGuard.IsAny(j) ? v() : $("StructuralRight");
  }
  function v(O, j) {
    return a.True;
  }
  function C(O, j) {
    return s.TypeGuard.IsIntersect(j) ? h(O, j) : s.TypeGuard.IsUnion(j) && j.anyOf.some((_e) => s.TypeGuard.IsAny(_e) || s.TypeGuard.IsUnknown(_e)) ? a.True : s.TypeGuard.IsUnion(j) ? a.Union : s.TypeGuard.IsUnknown(j) || s.TypeGuard.IsAny(j) ? a.True : a.Union;
  }
  function A(O, j) {
    return s.TypeGuard.IsUnknown(O) ? a.False : s.TypeGuard.IsAny(O) ? a.Union : s.TypeGuard.IsNever(O) ? a.True : a.False;
  }
  function L(O, j) {
    return s.TypeGuard.IsObject(j) && b(j) ? a.True : w(j) ? R(O, j) : s.TypeGuard.IsArray(j) ? p(ye(O.items, j.items)) : a.False;
  }
  function F(O, j) {
    return w(j) ? R(O, j) : s.TypeGuard.IsAsyncIterator(j) ? p(ye(O.items, j.items)) : a.False;
  }
  function I(O, j) {
    return w(j) ? R(O, j) : s.TypeGuard.IsObject(j) ? d(O, j) : s.TypeGuard.IsRecord(j) ? k(O, j) : s.TypeGuard.IsBigInt(j) ? a.True : a.False;
  }
  function U(O, j) {
    return s.TypeGuard.IsLiteralBoolean(O) || s.TypeGuard.IsBoolean(O) ? a.True : a.False;
  }
  function _(O, j) {
    return w(j) ? R(O, j) : s.TypeGuard.IsObject(j) ? d(O, j) : s.TypeGuard.IsRecord(j) ? k(O, j) : s.TypeGuard.IsBoolean(j) ? a.True : a.False;
  }
  function P(O, j) {
    return w(j) ? R(O, j) : s.TypeGuard.IsObject(j) ? d(O, j) : s.TypeGuard.IsConstructor(j) ? O.parameters.length > j.parameters.length ? a.False : O.parameters.every((_e, sr) => p(ye(j.parameters[sr], _e)) === a.True) ? p(ye(O.returns, j.returns)) : a.False : a.False;
  }
  function T(O, j) {
    return w(j) ? R(O, j) : s.TypeGuard.IsObject(j) ? d(O, j) : s.TypeGuard.IsRecord(j) ? k(O, j) : s.TypeGuard.IsDate(j) ? a.True : a.False;
  }
  function y(O, j) {
    return w(j) ? R(O, j) : s.TypeGuard.IsObject(j) ? d(O, j) : s.TypeGuard.IsFunction(j) ? O.parameters.length > j.parameters.length ? a.False : O.parameters.every((_e, sr) => p(ye(j.parameters[sr], _e)) === a.True) ? p(ye(O.returns, j.returns)) : a.False : a.False;
  }
  function x(O, j) {
    return s.TypeGuard.IsLiteral(O) && s.ValueGuard.IsNumber(O.const) || s.TypeGuard.IsNumber(O) || s.TypeGuard.IsInteger(O) ? a.True : a.False;
  }
  function M(O, j) {
    return s.TypeGuard.IsInteger(j) || s.TypeGuard.IsNumber(j) ? a.True : w(j) ? R(O, j) : s.TypeGuard.IsObject(j) ? d(O, j) : s.TypeGuard.IsRecord(j) ? k(O, j) : a.False;
  }
  function h(O, j) {
    return j.allOf.every((_e) => ye(O, _e) === a.True) ? a.True : a.False;
  }
  function D(O, j) {
    return O.allOf.some((_e) => ye(_e, j) === a.True) ? a.True : a.False;
  }
  function z(O, j) {
    return w(j) ? R(O, j) : s.TypeGuard.IsIterator(j) ? p(ye(O.items, j.items)) : a.False;
  }
  function X(O, j) {
    return s.TypeGuard.IsLiteral(j) && j.const === O.const ? a.True : w(j) ? R(O, j) : s.TypeGuard.IsObject(j) ? d(O, j) : s.TypeGuard.IsRecord(j) ? k(O, j) : s.TypeGuard.IsString(j) ? qe(O) : s.TypeGuard.IsNumber(j) ? Ae(O) : s.TypeGuard.IsInteger(j) ? x(O) : s.TypeGuard.IsBoolean(j) ? U(O) : a.False;
  }
  function ee(O, j) {
    return a.False;
  }
  function G(O, j) {
    return a.True;
  }
  function Pe(O) {
    let [j, _e] = [O, 0];
    for (; s.TypeGuard.IsNot(j); )
      j = j.not, _e += 1;
    return _e % 2 === 0 ? j : (0, i.Unknown)();
  }
  function Se(O, j) {
    return s.TypeGuard.IsNot(O) ? ye(Pe(O), j) : s.TypeGuard.IsNot(j) ? ye(O, Pe(j)) : $("Invalid fallthrough for Not");
  }
  function Ce(O, j) {
    return w(j) ? R(O, j) : s.TypeGuard.IsObject(j) ? d(O, j) : s.TypeGuard.IsRecord(j) ? k(O, j) : s.TypeGuard.IsNull(j) ? a.True : a.False;
  }
  function Ae(O, j) {
    return s.TypeGuard.IsLiteralNumber(O) || s.TypeGuard.IsNumber(O) || s.TypeGuard.IsInteger(O) ? a.True : a.False;
  }
  function Ue(O, j) {
    return w(j) ? R(O, j) : s.TypeGuard.IsObject(j) ? d(O, j) : s.TypeGuard.IsRecord(j) ? k(O, j) : s.TypeGuard.IsInteger(j) || s.TypeGuard.IsNumber(j) ? a.True : a.False;
  }
  function je(O, j) {
    return Object.getOwnPropertyNames(O.properties).length === j;
  }
  function he(O) {
    return b(O);
  }
  function J(O) {
    return je(O, 0) || je(O, 1) && "description" in O.properties && s.TypeGuard.IsUnion(O.properties.description) && O.properties.description.anyOf.length === 2 && (s.TypeGuard.IsString(O.properties.description.anyOf[0]) && s.TypeGuard.IsUndefined(O.properties.description.anyOf[1]) || s.TypeGuard.IsString(O.properties.description.anyOf[1]) && s.TypeGuard.IsUndefined(O.properties.description.anyOf[0]));
  }
  function Q(O) {
    return je(O, 0);
  }
  function me(O) {
    return je(O, 0);
  }
  function ge(O) {
    return je(O, 0);
  }
  function Z(O) {
    return je(O, 0);
  }
  function W(O) {
    return b(O);
  }
  function q(O) {
    const j = (0, t.Number)();
    return je(O, 0) || je(O, 1) && "length" in O.properties && p(ye(O.properties.length, j)) === a.True;
  }
  function m(O) {
    return je(O, 0);
  }
  function b(O) {
    const j = (0, t.Number)();
    return je(O, 0) || je(O, 1) && "length" in O.properties && p(ye(O.properties.length, j)) === a.True;
  }
  function S(O) {
    const j = (0, r.Function)([(0, e.Any)()], (0, e.Any)());
    return je(O, 0) || je(O, 1) && "then" in O.properties && p(ye(O.properties.then, j)) === a.True;
  }
  function V(O, j) {
    return ye(O, j) === a.False || s.TypeGuard.IsOptional(O) && !s.TypeGuard.IsOptional(j) ? a.False : a.True;
  }
  function d(O, j) {
    return s.TypeGuard.IsUnknown(O) ? a.False : s.TypeGuard.IsAny(O) ? a.Union : s.TypeGuard.IsNever(O) || s.TypeGuard.IsLiteralString(O) && he(j) || s.TypeGuard.IsLiteralNumber(O) && Q(j) || s.TypeGuard.IsLiteralBoolean(O) && me(j) || s.TypeGuard.IsSymbol(O) && J(j) || s.TypeGuard.IsBigInt(O) && ge(j) || s.TypeGuard.IsString(O) && he(j) || s.TypeGuard.IsSymbol(O) && J(j) || s.TypeGuard.IsNumber(O) && Q(j) || s.TypeGuard.IsInteger(O) && Q(j) || s.TypeGuard.IsBoolean(O) && me(j) || s.TypeGuard.IsUint8Array(O) && W(j) || s.TypeGuard.IsDate(O) && Z(j) || s.TypeGuard.IsConstructor(O) && m(j) || s.TypeGuard.IsFunction(O) && q(j) ? a.True : s.TypeGuard.IsRecord(O) && s.TypeGuard.IsString(E(O)) ? j[c.Hint] === "Record" ? a.True : a.False : s.TypeGuard.IsRecord(O) && s.TypeGuard.IsNumber(E(O)) ? je(j, 0) ? a.True : a.False : a.False;
  }
  function Y(O, j) {
    return w(j) ? R(O, j) : s.TypeGuard.IsRecord(j) ? k(O, j) : s.TypeGuard.IsObject(j) ? (() => {
      for (const _e of Object.getOwnPropertyNames(j.properties)) {
        if (!(_e in O.properties) && !s.TypeGuard.IsOptional(j.properties[_e]))
          return a.False;
        if (s.TypeGuard.IsOptional(j.properties[_e]))
          return a.True;
        if (V(O.properties[_e], j.properties[_e]) === a.False)
          return a.False;
      }
      return a.True;
    })() : a.False;
  }
  function K(O, j) {
    return w(j) ? R(O, j) : s.TypeGuard.IsObject(j) && S(j) ? a.True : s.TypeGuard.IsPromise(j) ? p(ye(O.item, j.item)) : a.False;
  }
  function E(O) {
    return u.PatternNumberExact in O.patternProperties ? (0, t.Number)() : u.PatternStringExact in O.patternProperties ? (0, o.String)() : $("Unknown record key pattern");
  }
  function ie(O) {
    return u.PatternNumberExact in O.patternProperties ? O.patternProperties[u.PatternNumberExact] : u.PatternStringExact in O.patternProperties ? O.patternProperties[u.PatternStringExact] : $("Unable to get record value schema");
  }
  function k(O, j) {
    const [_e, sr] = [E(j), ie(j)];
    return s.TypeGuard.IsLiteralString(O) && s.TypeGuard.IsNumber(_e) && p(ye(O, sr)) === a.True ? a.True : s.TypeGuard.IsUint8Array(O) && s.TypeGuard.IsNumber(_e) || s.TypeGuard.IsString(O) && s.TypeGuard.IsNumber(_e) || s.TypeGuard.IsArray(O) && s.TypeGuard.IsNumber(_e) ? ye(O, sr) : s.TypeGuard.IsObject(O) ? (() => {
      for (const Ls of Object.getOwnPropertyNames(O.properties))
        if (V(sr, O.properties[Ls]) === a.False)
          return a.False;
      return a.True;
    })() : a.False;
  }
  function se(O, j) {
    return w(j) ? R(O, j) : s.TypeGuard.IsObject(j) ? d(O, j) : s.TypeGuard.IsRecord(j) ? ye(ie(O), ie(j)) : a.False;
  }
  function ae(O, j) {
    const _e = s.TypeGuard.IsRegExp(O) ? (0, o.String)() : O, sr = s.TypeGuard.IsRegExp(j) ? (0, o.String)() : j;
    return ye(_e, sr);
  }
  function qe(O, j) {
    return s.TypeGuard.IsLiteral(O) && s.ValueGuard.IsString(O.const) || s.TypeGuard.IsString(O) ? a.True : a.False;
  }
  function Er(O, j) {
    return w(j) ? R(O, j) : s.TypeGuard.IsObject(j) ? d(O, j) : s.TypeGuard.IsRecord(j) ? k(O, j) : s.TypeGuard.IsString(j) ? a.True : a.False;
  }
  function Ke(O, j) {
    return w(j) ? R(O, j) : s.TypeGuard.IsObject(j) ? d(O, j) : s.TypeGuard.IsRecord(j) ? k(O, j) : s.TypeGuard.IsSymbol(j) ? a.True : a.False;
  }
  function g(O, j) {
    return s.TypeGuard.IsTemplateLiteral(O) ? ye((0, n.TemplateLiteralToUnion)(O), j) : s.TypeGuard.IsTemplateLiteral(j) ? ye(O, (0, n.TemplateLiteralToUnion)(j)) : $("Invalid fallthrough for TemplateLiteral");
  }
  function Te(O, j) {
    return s.TypeGuard.IsArray(j) && O.items !== void 0 && O.items.every((_e) => ye(_e, j.items) === a.True);
  }
  function fr(O, j) {
    return s.TypeGuard.IsNever(O) ? a.True : s.TypeGuard.IsUnknown(O) ? a.False : s.TypeGuard.IsAny(O) ? a.Union : a.False;
  }
  function uu(O, j) {
    return w(j) ? R(O, j) : s.TypeGuard.IsObject(j) && b(j) || s.TypeGuard.IsArray(j) && Te(O, j) ? a.True : s.TypeGuard.IsTuple(j) ? s.ValueGuard.IsUndefined(O.items) && !s.ValueGuard.IsUndefined(j.items) || !s.ValueGuard.IsUndefined(O.items) && s.ValueGuard.IsUndefined(j.items) ? a.False : s.ValueGuard.IsUndefined(O.items) && !s.ValueGuard.IsUndefined(j.items) || O.items.every((_e, sr) => ye(_e, j.items[sr]) === a.True) ? a.True : a.False : a.False;
  }
  function Ds(O, j) {
    return w(j) ? R(O, j) : s.TypeGuard.IsObject(j) ? d(O, j) : s.TypeGuard.IsRecord(j) ? k(O, j) : s.TypeGuard.IsUint8Array(j) ? a.True : a.False;
  }
  function N(O, j) {
    return w(j) ? R(O, j) : s.TypeGuard.IsObject(j) ? d(O, j) : s.TypeGuard.IsRecord(j) ? k(O, j) : s.TypeGuard.IsVoid(j) ? ce(O) : s.TypeGuard.IsUndefined(j) ? a.True : a.False;
  }
  function ne(O, j) {
    return j.anyOf.some((_e) => ye(O, _e) === a.True) ? a.True : a.False;
  }
  function B(O, j) {
    return O.anyOf.every((_e) => ye(_e, j) === a.True) ? a.True : a.False;
  }
  function pe(O, j) {
    return a.True;
  }
  function oe(O, j) {
    return s.TypeGuard.IsNever(j) ? ee() : s.TypeGuard.IsIntersect(j) ? h(O, j) : s.TypeGuard.IsUnion(j) ? ne(O, j) : s.TypeGuard.IsAny(j) ? v() : s.TypeGuard.IsString(j) ? qe(O) : s.TypeGuard.IsNumber(j) ? Ae(O) : s.TypeGuard.IsInteger(j) ? x(O) : s.TypeGuard.IsBoolean(j) ? U(O) : s.TypeGuard.IsArray(j) ? A(O) : s.TypeGuard.IsTuple(j) ? fr(O) : s.TypeGuard.IsObject(j) ? d(O, j) : s.TypeGuard.IsUnknown(j) ? a.True : a.False;
  }
  function ce(O, j) {
    return s.TypeGuard.IsUndefined(O) || s.TypeGuard.IsUndefined(O) ? a.True : a.False;
  }
  function Me(O, j) {
    return s.TypeGuard.IsIntersect(j) ? h(O, j) : s.TypeGuard.IsUnion(j) ? ne(O, j) : s.TypeGuard.IsUnknown(j) ? pe() : s.TypeGuard.IsAny(j) ? v() : s.TypeGuard.IsObject(j) ? d(O, j) : s.TypeGuard.IsVoid(j) ? a.True : a.False;
  }
  function ye(O, j) {
    return (
      // resolvable
      s.TypeGuard.IsTemplateLiteral(O) || s.TypeGuard.IsTemplateLiteral(j) ? g(O, j) : s.TypeGuard.IsRegExp(O) || s.TypeGuard.IsRegExp(j) ? ae(O, j) : s.TypeGuard.IsNot(O) || s.TypeGuard.IsNot(j) ? Se(O, j) : (
        // standard
        s.TypeGuard.IsAny(O) ? C(O, j) : s.TypeGuard.IsArray(O) ? L(O, j) : s.TypeGuard.IsBigInt(O) ? I(O, j) : s.TypeGuard.IsBoolean(O) ? _(O, j) : s.TypeGuard.IsAsyncIterator(O) ? F(O, j) : s.TypeGuard.IsConstructor(O) ? P(O, j) : s.TypeGuard.IsDate(O) ? T(O, j) : s.TypeGuard.IsFunction(O) ? y(O, j) : s.TypeGuard.IsInteger(O) ? M(O, j) : s.TypeGuard.IsIntersect(O) ? D(O, j) : s.TypeGuard.IsIterator(O) ? z(O, j) : s.TypeGuard.IsLiteral(O) ? X(O, j) : s.TypeGuard.IsNever(O) ? G() : s.TypeGuard.IsNull(O) ? Ce(O, j) : s.TypeGuard.IsNumber(O) ? Ue(O, j) : s.TypeGuard.IsObject(O) ? Y(O, j) : s.TypeGuard.IsRecord(O) ? se(O, j) : s.TypeGuard.IsString(O) ? Er(O, j) : s.TypeGuard.IsSymbol(O) ? Ke(O, j) : s.TypeGuard.IsTuple(O) ? uu(O, j) : s.TypeGuard.IsPromise(O) ? K(O, j) : s.TypeGuard.IsUint8Array(O) ? Ds(O, j) : s.TypeGuard.IsUndefined(O) ? N(O, j) : s.TypeGuard.IsUnion(O) ? B(O, j) : s.TypeGuard.IsUnknown(O) ? oe(O, j) : s.TypeGuard.IsVoid(O) ? Me(O, j) : $(`Unknown left type operand '${O[c.Kind]}'`)
      )
    );
  }
  function Ar(O, j) {
    return ye(O, j);
  }
  return yn;
}
var Qu = {}, Xu = {}, ku = {}, Xl;
function Ib() {
  if (Xl) return ku;
  Xl = 1, Object.defineProperty(ku, "__esModule", { value: !0 }), ku.ExtendsFromMappedResult = n;
  const e = /* @__PURE__ */ Ze(), r = /* @__PURE__ */ cf(), t = /* @__PURE__ */ Pr();
  function o(u, c, f, s, l) {
    const a = {};
    for (const p of globalThis.Object.getOwnPropertyNames(u))
      a[p] = (0, r.Extends)(u[p], c, f, s, (0, t.Clone)(l));
    return a;
  }
  function i(u, c, f, s, l) {
    return o(u.properties, c, f, s, l);
  }
  function n(u, c, f, s, l) {
    const a = i(u, c, f, s, l);
    return (0, e.MappedResult)(a);
  }
  return ku;
}
var kl;
function cf() {
  if (kl) return Xu;
  kl = 1, Object.defineProperty(Xu, "__esModule", { value: !0 }), Xu.Extends = c;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ Le(), t = /* @__PURE__ */ bb(), o = /* @__PURE__ */ Ob(), i = /* @__PURE__ */ Ib(), n = /* @__PURE__ */ we();
  function u(f, s, l, a) {
    const p = (0, t.ExtendsCheck)(f, s);
    return p === t.ExtendsResult.Union ? (0, r.Union)([l, a]) : p === t.ExtendsResult.True ? l : a;
  }
  function c(f, s, l, a, p) {
    return (0, n.IsMappedResult)(f) ? (0, i.ExtendsFromMappedResult)(f, s, l, a, p) : (0, n.IsMappedKey)(f) ? (0, e.CreateType)((0, o.ExtendsFromMappedKey)(f, s, l, a, p)) : (0, e.CreateType)(u(f, s, l, a), p);
  }
  return Xu;
}
var ep;
function Ob() {
  if (ep) return Qu;
  ep = 1, Object.defineProperty(Qu, "__esModule", { value: !0 }), Qu.ExtendsFromMappedKey = c;
  const e = /* @__PURE__ */ Ze(), r = /* @__PURE__ */ ar(), t = /* @__PURE__ */ cf(), o = /* @__PURE__ */ Pr();
  function i(f, s, l, a, p) {
    return {
      [f]: (0, t.Extends)((0, r.Literal)(f), s, l, a, (0, o.Clone)(p))
    };
  }
  function n(f, s, l, a, p) {
    return f.reduce(($, w) => ({ ...$, ...i(w, s, l, a, p) }), {});
  }
  function u(f, s, l, a, p) {
    return n(f.keys, s, l, a, p);
  }
  function c(f, s, l, a, p) {
    const $ = u(f, s, l, a, p);
    return (0, e.MappedResult)($);
  }
  return Qu;
}
var rp;
function so() {
  return rp || (rp = 1, function(e) {
    var r = gt && gt.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = gt && gt.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ bb(), e), t(/* @__PURE__ */ Ob(), e), t(/* @__PURE__ */ Ib(), e), t(/* @__PURE__ */ uf(), e), t(/* @__PURE__ */ cf(), e);
  }(gt)), gt;
}
var np;
function gb() {
  if (np) return vi;
  np = 1, Object.defineProperty(vi, "__esModule", { value: !0 }), vi.ValueCheckUnknownTypeError = void 0, vi.Check = q;
  const e = /* @__PURE__ */ ka(), r = /* @__PURE__ */ vr(), t = /* @__PURE__ */ ru(), o = /* @__PURE__ */ ue(), i = /* @__PURE__ */ Kr(), n = /* @__PURE__ */ so(), u = /* @__PURE__ */ to(), c = /* @__PURE__ */ Be(), f = /* @__PURE__ */ cr(), s = /* @__PURE__ */ Je(), l = /* @__PURE__ */ we();
  class a extends c.TypeBoxError {
    constructor(b) {
      super("Unknown type"), this.schema = b;
    }
  }
  vi.ValueCheckUnknownTypeError = a;
  function p(m) {
    return m[o.Kind] === "Any" || m[o.Kind] === "Unknown";
  }
  function $(m) {
    return m !== void 0;
  }
  function w(m, b, S) {
    return !0;
  }
  function R(m, b, S) {
    if (!(0, s.IsArray)(S) || $(m.minItems) && !(S.length >= m.minItems) || $(m.maxItems) && !(S.length <= m.maxItems) || !S.every((Y) => W(m.items, b, Y)) || m.uniqueItems === !0 && !function() {
      const Y = /* @__PURE__ */ new Set();
      for (const K of S) {
        const E = (0, t.Hash)(K);
        if (Y.has(E))
          return !1;
        Y.add(E);
      }
      return !0;
    }())
      return !1;
    if (!($(m.contains) || (0, s.IsNumber)(m.minContains) || (0, s.IsNumber)(m.maxContains)))
      return !0;
    const V = $(m.contains) ? m.contains : (0, f.Never)(), d = S.reduce((Y, K) => W(V, b, K) ? Y + 1 : Y, 0);
    return !(d === 0 || (0, s.IsNumber)(m.minContains) && d < m.minContains || (0, s.IsNumber)(m.maxContains) && d > m.maxContains);
  }
  function v(m, b, S) {
    return (0, s.IsAsyncIterator)(S);
  }
  function C(m, b, S) {
    return !(!(0, s.IsBigInt)(S) || $(m.exclusiveMaximum) && !(S < m.exclusiveMaximum) || $(m.exclusiveMinimum) && !(S > m.exclusiveMinimum) || $(m.maximum) && !(S <= m.maximum) || $(m.minimum) && !(S >= m.minimum) || $(m.multipleOf) && S % m.multipleOf !== BigInt(0));
  }
  function A(m, b, S) {
    return (0, s.IsBoolean)(S);
  }
  function L(m, b, S) {
    return W(m.returns, b, S.prototype);
  }
  function F(m, b, S) {
    return !(!(0, s.IsDate)(S) || $(m.exclusiveMaximumTimestamp) && !(S.getTime() < m.exclusiveMaximumTimestamp) || $(m.exclusiveMinimumTimestamp) && !(S.getTime() > m.exclusiveMinimumTimestamp) || $(m.maximumTimestamp) && !(S.getTime() <= m.maximumTimestamp) || $(m.minimumTimestamp) && !(S.getTime() >= m.minimumTimestamp) || $(m.multipleOfTimestamp) && S.getTime() % m.multipleOfTimestamp !== 0);
  }
  function I(m, b, S) {
    return (0, s.IsFunction)(S);
  }
  function U(m, b, S) {
    const V = globalThis.Object.values(m.$defs), d = m.$defs[m.$ref];
    return W(d, [...b, ...V], S);
  }
  function _(m, b, S) {
    return !(!(0, s.IsInteger)(S) || $(m.exclusiveMaximum) && !(S < m.exclusiveMaximum) || $(m.exclusiveMinimum) && !(S > m.exclusiveMinimum) || $(m.maximum) && !(S <= m.maximum) || $(m.minimum) && !(S >= m.minimum) || $(m.multipleOf) && S % m.multipleOf !== 0);
  }
  function P(m, b, S) {
    const V = m.allOf.every((d) => W(d, b, S));
    if (m.unevaluatedProperties === !1) {
      const d = new RegExp((0, i.KeyOfPattern)(m)), Y = Object.getOwnPropertyNames(S).every((K) => d.test(K));
      return V && Y;
    } else if ((0, l.IsSchema)(m.unevaluatedProperties)) {
      const d = new RegExp((0, i.KeyOfPattern)(m)), Y = Object.getOwnPropertyNames(S).every((K) => d.test(K) || W(m.unevaluatedProperties, b, S[K]));
      return V && Y;
    } else
      return V;
  }
  function T(m, b, S) {
    return (0, s.IsIterator)(S);
  }
  function y(m, b, S) {
    return S === m.const;
  }
  function x(m, b, S) {
    return !1;
  }
  function M(m, b, S) {
    return !W(m.not, b, S);
  }
  function h(m, b, S) {
    return (0, s.IsNull)(S);
  }
  function D(m, b, S) {
    return !(!e.TypeSystemPolicy.IsNumberLike(S) || $(m.exclusiveMaximum) && !(S < m.exclusiveMaximum) || $(m.exclusiveMinimum) && !(S > m.exclusiveMinimum) || $(m.minimum) && !(S >= m.minimum) || $(m.maximum) && !(S <= m.maximum) || $(m.multipleOf) && S % m.multipleOf !== 0);
  }
  function z(m, b, S) {
    if (!e.TypeSystemPolicy.IsObjectLike(S) || $(m.minProperties) && !(Object.getOwnPropertyNames(S).length >= m.minProperties) || $(m.maxProperties) && !(Object.getOwnPropertyNames(S).length <= m.maxProperties))
      return !1;
    const V = Object.getOwnPropertyNames(m.properties);
    for (const d of V) {
      const Y = m.properties[d];
      if (m.required && m.required.includes(d)) {
        if (!W(Y, b, S[d]) || ((0, n.ExtendsUndefinedCheck)(Y) || p(Y)) && !(d in S))
          return !1;
      } else if (e.TypeSystemPolicy.IsExactOptionalProperty(S, d) && !W(Y, b, S[d]))
        return !1;
    }
    if (m.additionalProperties === !1) {
      const d = Object.getOwnPropertyNames(S);
      return m.required && m.required.length === V.length && d.length === V.length ? !0 : d.every((Y) => V.includes(Y));
    } else return typeof m.additionalProperties == "object" ? Object.getOwnPropertyNames(S).every((Y) => V.includes(Y) || W(m.additionalProperties, b, S[Y])) : !0;
  }
  function X(m, b, S) {
    return (0, s.IsPromise)(S);
  }
  function ee(m, b, S) {
    if (!e.TypeSystemPolicy.IsRecordLike(S) || $(m.minProperties) && !(Object.getOwnPropertyNames(S).length >= m.minProperties) || $(m.maxProperties) && !(Object.getOwnPropertyNames(S).length <= m.maxProperties))
      return !1;
    const [V, d] = Object.entries(m.patternProperties)[0], Y = new RegExp(V), K = Object.entries(S).every(([k, se]) => Y.test(k) ? W(d, b, se) : !0), E = typeof m.additionalProperties == "object" ? Object.entries(S).every(([k, se]) => Y.test(k) ? !0 : W(m.additionalProperties, b, se)) : !0, ie = m.additionalProperties === !1 ? Object.getOwnPropertyNames(S).every((k) => Y.test(k)) : !0;
    return K && E && ie;
  }
  function G(m, b, S) {
    return W((0, r.Deref)(m, b), b, S);
  }
  function Pe(m, b, S) {
    const V = new RegExp(m.source, m.flags);
    return $(m.minLength) && !(S.length >= m.minLength) || $(m.maxLength) && !(S.length <= m.maxLength) ? !1 : V.test(S);
  }
  function Se(m, b, S) {
    return !(0, s.IsString)(S) || $(m.minLength) && !(S.length >= m.minLength) || $(m.maxLength) && !(S.length <= m.maxLength) || $(m.pattern) && !new RegExp(m.pattern).test(S) ? !1 : $(m.format) ? u.FormatRegistry.Has(m.format) ? u.FormatRegistry.Get(m.format)(S) : !1 : !0;
  }
  function Ce(m, b, S) {
    return (0, s.IsSymbol)(S);
  }
  function Ae(m, b, S) {
    return (0, s.IsString)(S) && new RegExp(m.pattern).test(S);
  }
  function Ue(m, b, S) {
    return W((0, r.Deref)(m, b), b, S);
  }
  function je(m, b, S) {
    if (!(0, s.IsArray)(S) || m.items === void 0 && S.length !== 0 || S.length !== m.maxItems)
      return !1;
    if (!m.items)
      return !0;
    for (let V = 0; V < m.items.length; V++)
      if (!W(m.items[V], b, S[V]))
        return !1;
    return !0;
  }
  function he(m, b, S) {
    return (0, s.IsUndefined)(S);
  }
  function J(m, b, S) {
    return m.anyOf.some((V) => W(V, b, S));
  }
  function Q(m, b, S) {
    return !(!(0, s.IsUint8Array)(S) || $(m.maxByteLength) && !(S.length <= m.maxByteLength) || $(m.minByteLength) && !(S.length >= m.minByteLength));
  }
  function me(m, b, S) {
    return !0;
  }
  function ge(m, b, S) {
    return e.TypeSystemPolicy.IsVoidLike(S);
  }
  function Z(m, b, S) {
    return u.TypeRegistry.Has(m[o.Kind]) ? u.TypeRegistry.Get(m[o.Kind])(m, S) : !1;
  }
  function W(m, b, S) {
    const V = $(m.$id) ? (0, r.Pushref)(m, b) : b, d = m;
    switch (d[o.Kind]) {
      case "Any":
        return w();
      case "Array":
        return R(d, V, S);
      case "AsyncIterator":
        return v(d, V, S);
      case "BigInt":
        return C(d, V, S);
      case "Boolean":
        return A(d, V, S);
      case "Constructor":
        return L(d, V, S);
      case "Date":
        return F(d, V, S);
      case "Function":
        return I(d, V, S);
      case "Import":
        return U(d, V, S);
      case "Integer":
        return _(d, V, S);
      case "Intersect":
        return P(d, V, S);
      case "Iterator":
        return T(d, V, S);
      case "Literal":
        return y(d, V, S);
      case "Never":
        return x();
      case "Not":
        return M(d, V, S);
      case "Null":
        return h(d, V, S);
      case "Number":
        return D(d, V, S);
      case "Object":
        return z(d, V, S);
      case "Promise":
        return X(d, V, S);
      case "Record":
        return ee(d, V, S);
      case "Ref":
        return G(d, V, S);
      case "RegExp":
        return Pe(d, V, S);
      case "String":
        return Se(d, V, S);
      case "Symbol":
        return Ce(d, V, S);
      case "TemplateLiteral":
        return Ae(d, V, S);
      case "This":
        return Ue(d, V, S);
      case "Tuple":
        return je(d, V, S);
      case "Undefined":
        return he(d, V, S);
      case "Union":
        return J(d, V, S);
      case "Uint8Array":
        return Q(d, V, S);
      case "Unknown":
        return me();
      case "Void":
        return ge(d, V, S);
      default:
        if (!u.TypeRegistry.Has(d[o.Kind]))
          throw new a(d);
        return Z(d, V, S);
    }
  }
  function q(...m) {
    return m.length === 3 ? W(m[0], m[1], m[2]) : W(m[0], [], m[1]);
  }
  return vi;
}
var tp;
function Sr() {
  return tp || (tp = 1, function(e) {
    var r = Ot && Ot.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Ot && Ot.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ gb(), e);
  }(Ot)), Ot;
}
var ip;
function Pb() {
  if (ip) return Br;
  ip = 1, Object.defineProperty(Br, "__esModule", { value: !0 }), Br.ValueErrorIterator = Br.ValueErrorsUnknownTypeError = Br.ValueErrorType = void 0, Br.Errors = V;
  const e = /* @__PURE__ */ ka(), r = /* @__PURE__ */ Kr(), t = /* @__PURE__ */ to(), o = /* @__PURE__ */ uf(), i = /* @__PURE__ */ yb(), n = /* @__PURE__ */ Be(), u = /* @__PURE__ */ vr(), c = /* @__PURE__ */ ru(), f = /* @__PURE__ */ Sr(), s = /* @__PURE__ */ ue(), l = /* @__PURE__ */ cr(), a = /* @__PURE__ */ Je();
  var p;
  (function(d) {
    d[d.ArrayContains = 0] = "ArrayContains", d[d.ArrayMaxContains = 1] = "ArrayMaxContains", d[d.ArrayMaxItems = 2] = "ArrayMaxItems", d[d.ArrayMinContains = 3] = "ArrayMinContains", d[d.ArrayMinItems = 4] = "ArrayMinItems", d[d.ArrayUniqueItems = 5] = "ArrayUniqueItems", d[d.Array = 6] = "Array", d[d.AsyncIterator = 7] = "AsyncIterator", d[d.BigIntExclusiveMaximum = 8] = "BigIntExclusiveMaximum", d[d.BigIntExclusiveMinimum = 9] = "BigIntExclusiveMinimum", d[d.BigIntMaximum = 10] = "BigIntMaximum", d[d.BigIntMinimum = 11] = "BigIntMinimum", d[d.BigIntMultipleOf = 12] = "BigIntMultipleOf", d[d.BigInt = 13] = "BigInt", d[d.Boolean = 14] = "Boolean", d[d.DateExclusiveMaximumTimestamp = 15] = "DateExclusiveMaximumTimestamp", d[d.DateExclusiveMinimumTimestamp = 16] = "DateExclusiveMinimumTimestamp", d[d.DateMaximumTimestamp = 17] = "DateMaximumTimestamp", d[d.DateMinimumTimestamp = 18] = "DateMinimumTimestamp", d[d.DateMultipleOfTimestamp = 19] = "DateMultipleOfTimestamp", d[d.Date = 20] = "Date", d[d.Function = 21] = "Function", d[d.IntegerExclusiveMaximum = 22] = "IntegerExclusiveMaximum", d[d.IntegerExclusiveMinimum = 23] = "IntegerExclusiveMinimum", d[d.IntegerMaximum = 24] = "IntegerMaximum", d[d.IntegerMinimum = 25] = "IntegerMinimum", d[d.IntegerMultipleOf = 26] = "IntegerMultipleOf", d[d.Integer = 27] = "Integer", d[d.IntersectUnevaluatedProperties = 28] = "IntersectUnevaluatedProperties", d[d.Intersect = 29] = "Intersect", d[d.Iterator = 30] = "Iterator", d[d.Kind = 31] = "Kind", d[d.Literal = 32] = "Literal", d[d.Never = 33] = "Never", d[d.Not = 34] = "Not", d[d.Null = 35] = "Null", d[d.NumberExclusiveMaximum = 36] = "NumberExclusiveMaximum", d[d.NumberExclusiveMinimum = 37] = "NumberExclusiveMinimum", d[d.NumberMaximum = 38] = "NumberMaximum", d[d.NumberMinimum = 39] = "NumberMinimum", d[d.NumberMultipleOf = 40] = "NumberMultipleOf", d[d.Number = 41] = "Number", d[d.ObjectAdditionalProperties = 42] = "ObjectAdditionalProperties", d[d.ObjectMaxProperties = 43] = "ObjectMaxProperties", d[d.ObjectMinProperties = 44] = "ObjectMinProperties", d[d.ObjectRequiredProperty = 45] = "ObjectRequiredProperty", d[d.Object = 46] = "Object", d[d.Promise = 47] = "Promise", d[d.RegExp = 48] = "RegExp", d[d.StringFormatUnknown = 49] = "StringFormatUnknown", d[d.StringFormat = 50] = "StringFormat", d[d.StringMaxLength = 51] = "StringMaxLength", d[d.StringMinLength = 52] = "StringMinLength", d[d.StringPattern = 53] = "StringPattern", d[d.String = 54] = "String", d[d.Symbol = 55] = "Symbol", d[d.TupleLength = 56] = "TupleLength", d[d.Tuple = 57] = "Tuple", d[d.Uint8ArrayMaxByteLength = 58] = "Uint8ArrayMaxByteLength", d[d.Uint8ArrayMinByteLength = 59] = "Uint8ArrayMinByteLength", d[d.Uint8Array = 60] = "Uint8Array", d[d.Undefined = 61] = "Undefined", d[d.Union = 62] = "Union", d[d.Void = 63] = "Void";
  })(p || (Br.ValueErrorType = p = {}));
  class $ extends n.TypeBoxError {
    constructor(Y) {
      super("Unknown type"), this.schema = Y;
    }
  }
  Br.ValueErrorsUnknownTypeError = $;
  function w(d) {
    return d.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  function R(d) {
    return d !== void 0;
  }
  class v {
    constructor(Y) {
      this.iterator = Y;
    }
    [Symbol.iterator]() {
      return this.iterator;
    }
    /** Returns the first value error or undefined if no errors */
    First() {
      const Y = this.iterator.next();
      return Y.done ? void 0 : Y.value;
    }
  }
  Br.ValueErrorIterator = v;
  function C(d, Y, K, E, ie = []) {
    return {
      type: d,
      schema: Y,
      path: K,
      value: E,
      message: (0, i.GetErrorFunction)()({ errorType: d, path: K, schema: Y, value: E, errors: ie }),
      errors: ie
    };
  }
  function* A(d, Y, K, E) {
  }
  function* L(d, Y, K, E) {
    if (!(0, a.IsArray)(E))
      return yield C(p.Array, d, K, E);
    R(d.minItems) && !(E.length >= d.minItems) && (yield C(p.ArrayMinItems, d, K, E)), R(d.maxItems) && !(E.length <= d.maxItems) && (yield C(p.ArrayMaxItems, d, K, E));
    for (let se = 0; se < E.length; se++)
      yield* S(d.items, Y, `${K}/${se}`, E[se]);
    if (d.uniqueItems === !0 && !function() {
      const se = /* @__PURE__ */ new Set();
      for (const ae of E) {
        const qe = (0, c.Hash)(ae);
        if (se.has(qe))
          return !1;
        se.add(qe);
      }
      return !0;
    }() && (yield C(p.ArrayUniqueItems, d, K, E)), !(R(d.contains) || R(d.minContains) || R(d.maxContains)))
      return;
    const ie = R(d.contains) ? d.contains : (0, l.Never)(), k = E.reduce((se, ae, qe) => S(ie, Y, `${K}${qe}`, ae).next().done === !0 ? se + 1 : se, 0);
    k === 0 && (yield C(p.ArrayContains, d, K, E)), (0, a.IsNumber)(d.minContains) && k < d.minContains && (yield C(p.ArrayMinContains, d, K, E)), (0, a.IsNumber)(d.maxContains) && k > d.maxContains && (yield C(p.ArrayMaxContains, d, K, E));
  }
  function* F(d, Y, K, E) {
    (0, a.IsAsyncIterator)(E) || (yield C(p.AsyncIterator, d, K, E));
  }
  function* I(d, Y, K, E) {
    if (!(0, a.IsBigInt)(E))
      return yield C(p.BigInt, d, K, E);
    R(d.exclusiveMaximum) && !(E < d.exclusiveMaximum) && (yield C(p.BigIntExclusiveMaximum, d, K, E)), R(d.exclusiveMinimum) && !(E > d.exclusiveMinimum) && (yield C(p.BigIntExclusiveMinimum, d, K, E)), R(d.maximum) && !(E <= d.maximum) && (yield C(p.BigIntMaximum, d, K, E)), R(d.minimum) && !(E >= d.minimum) && (yield C(p.BigIntMinimum, d, K, E)), R(d.multipleOf) && E % d.multipleOf !== BigInt(0) && (yield C(p.BigIntMultipleOf, d, K, E));
  }
  function* U(d, Y, K, E) {
    (0, a.IsBoolean)(E) || (yield C(p.Boolean, d, K, E));
  }
  function* _(d, Y, K, E) {
    yield* S(d.returns, Y, K, E.prototype);
  }
  function* P(d, Y, K, E) {
    if (!(0, a.IsDate)(E))
      return yield C(p.Date, d, K, E);
    R(d.exclusiveMaximumTimestamp) && !(E.getTime() < d.exclusiveMaximumTimestamp) && (yield C(p.DateExclusiveMaximumTimestamp, d, K, E)), R(d.exclusiveMinimumTimestamp) && !(E.getTime() > d.exclusiveMinimumTimestamp) && (yield C(p.DateExclusiveMinimumTimestamp, d, K, E)), R(d.maximumTimestamp) && !(E.getTime() <= d.maximumTimestamp) && (yield C(p.DateMaximumTimestamp, d, K, E)), R(d.minimumTimestamp) && !(E.getTime() >= d.minimumTimestamp) && (yield C(p.DateMinimumTimestamp, d, K, E)), R(d.multipleOfTimestamp) && E.getTime() % d.multipleOfTimestamp !== 0 && (yield C(p.DateMultipleOfTimestamp, d, K, E));
  }
  function* T(d, Y, K, E) {
    (0, a.IsFunction)(E) || (yield C(p.Function, d, K, E));
  }
  function* y(d, Y, K, E) {
    const ie = globalThis.Object.values(d.$defs), k = d.$defs[d.$ref];
    yield* S(k, [...Y, ...ie], K, E);
  }
  function* x(d, Y, K, E) {
    if (!(0, a.IsInteger)(E))
      return yield C(p.Integer, d, K, E);
    R(d.exclusiveMaximum) && !(E < d.exclusiveMaximum) && (yield C(p.IntegerExclusiveMaximum, d, K, E)), R(d.exclusiveMinimum) && !(E > d.exclusiveMinimum) && (yield C(p.IntegerExclusiveMinimum, d, K, E)), R(d.maximum) && !(E <= d.maximum) && (yield C(p.IntegerMaximum, d, K, E)), R(d.minimum) && !(E >= d.minimum) && (yield C(p.IntegerMinimum, d, K, E)), R(d.multipleOf) && E % d.multipleOf !== 0 && (yield C(p.IntegerMultipleOf, d, K, E));
  }
  function* M(d, Y, K, E) {
    let ie = !1;
    for (const k of d.allOf)
      for (const se of S(k, Y, K, E))
        ie = !0, yield se;
    if (ie)
      return yield C(p.Intersect, d, K, E);
    if (d.unevaluatedProperties === !1) {
      const k = new RegExp((0, r.KeyOfPattern)(d));
      for (const se of Object.getOwnPropertyNames(E))
        k.test(se) || (yield C(p.IntersectUnevaluatedProperties, d, `${K}/${se}`, E));
    }
    if (typeof d.unevaluatedProperties == "object") {
      const k = new RegExp((0, r.KeyOfPattern)(d));
      for (const se of Object.getOwnPropertyNames(E))
        if (!k.test(se)) {
          const ae = S(d.unevaluatedProperties, Y, `${K}/${se}`, E[se]).next();
          ae.done || (yield ae.value);
        }
    }
  }
  function* h(d, Y, K, E) {
    (0, a.IsIterator)(E) || (yield C(p.Iterator, d, K, E));
  }
  function* D(d, Y, K, E) {
    E !== d.const && (yield C(p.Literal, d, K, E));
  }
  function* z(d, Y, K, E) {
    yield C(p.Never, d, K, E);
  }
  function* X(d, Y, K, E) {
    S(d.not, Y, K, E).next().done === !0 && (yield C(p.Not, d, K, E));
  }
  function* ee(d, Y, K, E) {
    (0, a.IsNull)(E) || (yield C(p.Null, d, K, E));
  }
  function* G(d, Y, K, E) {
    if (!e.TypeSystemPolicy.IsNumberLike(E))
      return yield C(p.Number, d, K, E);
    R(d.exclusiveMaximum) && !(E < d.exclusiveMaximum) && (yield C(p.NumberExclusiveMaximum, d, K, E)), R(d.exclusiveMinimum) && !(E > d.exclusiveMinimum) && (yield C(p.NumberExclusiveMinimum, d, K, E)), R(d.maximum) && !(E <= d.maximum) && (yield C(p.NumberMaximum, d, K, E)), R(d.minimum) && !(E >= d.minimum) && (yield C(p.NumberMinimum, d, K, E)), R(d.multipleOf) && E % d.multipleOf !== 0 && (yield C(p.NumberMultipleOf, d, K, E));
  }
  function* Pe(d, Y, K, E) {
    if (!e.TypeSystemPolicy.IsObjectLike(E))
      return yield C(p.Object, d, K, E);
    R(d.minProperties) && !(Object.getOwnPropertyNames(E).length >= d.minProperties) && (yield C(p.ObjectMinProperties, d, K, E)), R(d.maxProperties) && !(Object.getOwnPropertyNames(E).length <= d.maxProperties) && (yield C(p.ObjectMaxProperties, d, K, E));
    const ie = Array.isArray(d.required) ? d.required : [], k = Object.getOwnPropertyNames(d.properties), se = Object.getOwnPropertyNames(E);
    for (const ae of ie)
      se.includes(ae) || (yield C(p.ObjectRequiredProperty, d.properties[ae], `${K}/${w(ae)}`, void 0));
    if (d.additionalProperties === !1)
      for (const ae of se)
        k.includes(ae) || (yield C(p.ObjectAdditionalProperties, d, `${K}/${w(ae)}`, E[ae]));
    if (typeof d.additionalProperties == "object")
      for (const ae of se)
        k.includes(ae) || (yield* S(d.additionalProperties, Y, `${K}/${w(ae)}`, E[ae]));
    for (const ae of k) {
      const qe = d.properties[ae];
      d.required && d.required.includes(ae) ? (yield* S(qe, Y, `${K}/${w(ae)}`, E[ae]), (0, o.ExtendsUndefinedCheck)(d) && !(ae in E) && (yield C(p.ObjectRequiredProperty, qe, `${K}/${w(ae)}`, void 0))) : e.TypeSystemPolicy.IsExactOptionalProperty(E, ae) && (yield* S(qe, Y, `${K}/${w(ae)}`, E[ae]));
    }
  }
  function* Se(d, Y, K, E) {
    (0, a.IsPromise)(E) || (yield C(p.Promise, d, K, E));
  }
  function* Ce(d, Y, K, E) {
    if (!e.TypeSystemPolicy.IsRecordLike(E))
      return yield C(p.Object, d, K, E);
    R(d.minProperties) && !(Object.getOwnPropertyNames(E).length >= d.minProperties) && (yield C(p.ObjectMinProperties, d, K, E)), R(d.maxProperties) && !(Object.getOwnPropertyNames(E).length <= d.maxProperties) && (yield C(p.ObjectMaxProperties, d, K, E));
    const [ie, k] = Object.entries(d.patternProperties)[0], se = new RegExp(ie);
    for (const [ae, qe] of Object.entries(E))
      se.test(ae) && (yield* S(k, Y, `${K}/${w(ae)}`, qe));
    if (typeof d.additionalProperties == "object")
      for (const [ae, qe] of Object.entries(E))
        se.test(ae) || (yield* S(d.additionalProperties, Y, `${K}/${w(ae)}`, qe));
    if (d.additionalProperties === !1) {
      for (const [ae, qe] of Object.entries(E))
        if (!se.test(ae))
          return yield C(p.ObjectAdditionalProperties, d, `${K}/${w(ae)}`, qe);
    }
  }
  function* Ae(d, Y, K, E) {
    yield* S((0, u.Deref)(d, Y), Y, K, E);
  }
  function* Ue(d, Y, K, E) {
    if (!(0, a.IsString)(E))
      return yield C(p.String, d, K, E);
    if (R(d.minLength) && !(E.length >= d.minLength) && (yield C(p.StringMinLength, d, K, E)), R(d.maxLength) && !(E.length <= d.maxLength) && (yield C(p.StringMaxLength, d, K, E)), !new RegExp(d.source, d.flags).test(E))
      return yield C(p.RegExp, d, K, E);
  }
  function* je(d, Y, K, E) {
    if (!(0, a.IsString)(E))
      return yield C(p.String, d, K, E);
    R(d.minLength) && !(E.length >= d.minLength) && (yield C(p.StringMinLength, d, K, E)), R(d.maxLength) && !(E.length <= d.maxLength) && (yield C(p.StringMaxLength, d, K, E)), (0, a.IsString)(d.pattern) && (new RegExp(d.pattern).test(E) || (yield C(p.StringPattern, d, K, E))), (0, a.IsString)(d.format) && (t.FormatRegistry.Has(d.format) ? t.FormatRegistry.Get(d.format)(E) || (yield C(p.StringFormat, d, K, E)) : yield C(p.StringFormatUnknown, d, K, E));
  }
  function* he(d, Y, K, E) {
    (0, a.IsSymbol)(E) || (yield C(p.Symbol, d, K, E));
  }
  function* J(d, Y, K, E) {
    if (!(0, a.IsString)(E))
      return yield C(p.String, d, K, E);
    new RegExp(d.pattern).test(E) || (yield C(p.StringPattern, d, K, E));
  }
  function* Q(d, Y, K, E) {
    yield* S((0, u.Deref)(d, Y), Y, K, E);
  }
  function* me(d, Y, K, E) {
    if (!(0, a.IsArray)(E))
      return yield C(p.Tuple, d, K, E);
    if (d.items === void 0 && E.length !== 0)
      return yield C(p.TupleLength, d, K, E);
    if (E.length !== d.maxItems)
      return yield C(p.TupleLength, d, K, E);
    if (d.items)
      for (let ie = 0; ie < d.items.length; ie++)
        yield* S(d.items[ie], Y, `${K}/${ie}`, E[ie]);
  }
  function* ge(d, Y, K, E) {
    (0, a.IsUndefined)(E) || (yield C(p.Undefined, d, K, E));
  }
  function* Z(d, Y, K, E) {
    if ((0, f.Check)(d, Y, E))
      return;
    const ie = d.anyOf.map((k) => new v(S(k, Y, K, E)));
    yield C(p.Union, d, K, E, ie);
  }
  function* W(d, Y, K, E) {
    if (!(0, a.IsUint8Array)(E))
      return yield C(p.Uint8Array, d, K, E);
    R(d.maxByteLength) && !(E.length <= d.maxByteLength) && (yield C(p.Uint8ArrayMaxByteLength, d, K, E)), R(d.minByteLength) && !(E.length >= d.minByteLength) && (yield C(p.Uint8ArrayMinByteLength, d, K, E));
  }
  function* q(d, Y, K, E) {
  }
  function* m(d, Y, K, E) {
    e.TypeSystemPolicy.IsVoidLike(E) || (yield C(p.Void, d, K, E));
  }
  function* b(d, Y, K, E) {
    t.TypeRegistry.Get(d[s.Kind])(d, E) || (yield C(p.Kind, d, K, E));
  }
  function* S(d, Y, K, E) {
    const ie = R(d.$id) ? [...Y, d] : Y, k = d;
    switch (k[s.Kind]) {
      case "Any":
        return yield* A();
      case "Array":
        return yield* L(k, ie, K, E);
      case "AsyncIterator":
        return yield* F(k, ie, K, E);
      case "BigInt":
        return yield* I(k, ie, K, E);
      case "Boolean":
        return yield* U(k, ie, K, E);
      case "Constructor":
        return yield* _(k, ie, K, E);
      case "Date":
        return yield* P(k, ie, K, E);
      case "Function":
        return yield* T(k, ie, K, E);
      case "Import":
        return yield* y(k, ie, K, E);
      case "Integer":
        return yield* x(k, ie, K, E);
      case "Intersect":
        return yield* M(k, ie, K, E);
      case "Iterator":
        return yield* h(k, ie, K, E);
      case "Literal":
        return yield* D(k, ie, K, E);
      case "Never":
        return yield* z(k, ie, K, E);
      case "Not":
        return yield* X(k, ie, K, E);
      case "Null":
        return yield* ee(k, ie, K, E);
      case "Number":
        return yield* G(k, ie, K, E);
      case "Object":
        return yield* Pe(k, ie, K, E);
      case "Promise":
        return yield* Se(k, ie, K, E);
      case "Record":
        return yield* Ce(k, ie, K, E);
      case "Ref":
        return yield* Ae(k, ie, K, E);
      case "RegExp":
        return yield* Ue(k, ie, K, E);
      case "String":
        return yield* je(k, ie, K, E);
      case "Symbol":
        return yield* he(k, ie, K, E);
      case "TemplateLiteral":
        return yield* J(k, ie, K, E);
      case "This":
        return yield* Q(k, ie, K, E);
      case "Tuple":
        return yield* me(k, ie, K, E);
      case "Undefined":
        return yield* ge(k, ie, K, E);
      case "Union":
        return yield* Z(k, ie, K, E);
      case "Uint8Array":
        return yield* W(k, ie, K, E);
      case "Unknown":
        return yield* q();
      case "Void":
        return yield* m(k, ie, K, E);
      default:
        if (!t.TypeRegistry.Has(k[s.Kind]))
          throw new $(d);
        return yield* b(k, ie, K, E);
    }
  }
  function V(...d) {
    const Y = d.length === 3 ? S(d[0], d[1], "", d[2]) : S(d[0], [], "", d[1]);
    return new v(Y);
  }
  return Br;
}
var op;
function Rn() {
  return op || (op = 1, function(e) {
    var r = En && En.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = En && En.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ Pb(), e), t(/* @__PURE__ */ yb(), e);
  }(En)), En;
}
var Tt = {}, Dr = {}, up;
function YT() {
  if (up) return Dr;
  up = 1;
  var e = Dr && Dr.__classPrivateFieldSet || function(a, p, $, w, R) {
    if (w === "m") throw new TypeError("Private method is not writable");
    if (w === "a" && !R) throw new TypeError("Private accessor was defined without a setter");
    if (typeof p == "function" ? a !== p || !R : !p.has(a)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return w === "a" ? R.call(a, $) : R ? R.value = $ : p.set(a, $), $;
  }, r = Dr && Dr.__classPrivateFieldGet || function(a, p, $, w) {
    if ($ === "a" && !w) throw new TypeError("Private accessor was defined without a getter");
    if (typeof p == "function" ? a !== p || !w : !p.has(a)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return $ === "m" ? w : $ === "a" ? w.call(a) : w ? w.value : p.get(a);
  }, t, o, i;
  Object.defineProperty(Dr, "__esModule", { value: !0 }), Dr.AssertError = void 0, Dr.Assert = l;
  const n = /* @__PURE__ */ Rn(), u = /* @__PURE__ */ X_(), c = /* @__PURE__ */ gb();
  class f extends u.TypeBoxError {
    constructor(p) {
      const $ = p.First();
      super($ === void 0 ? "Invalid Value" : $.message), t.add(this), o.set(this, void 0), e(this, o, p, "f"), this.error = $;
    }
    /** Returns an iterator for each error in this value. */
    Errors() {
      return new n.ValueErrorIterator(r(this, t, "m", i).call(this));
    }
  }
  Dr.AssertError = f, o = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakSet(), i = function* () {
    this.error && (yield this.error), yield* r(this, o, "f");
  };
  function s(a, p, $) {
    if (!(0, c.Check)(a, p, $))
      throw new f((0, n.Errors)(a, p, $));
  }
  function l(...a) {
    return a.length === 3 ? s(a[0], a[1], a[2]) : s(a[0], [], a[1]);
  }
  return Dr;
}
var cp;
function sf() {
  return cp || (cp = 1, function(e) {
    var r = Tt && Tt.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Tt && Tt.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ YT(), e);
  }(Tt)), Tt;
}
var $t = {}, Bi = {}, Ft = {}, Di = {}, wt = {}, ec = {}, sp;
function JT() {
  if (sp) return ec;
  sp = 1, Object.defineProperty(ec, "__esModule", { value: !0 }), ec.Clone = f;
  const e = /* @__PURE__ */ Je();
  function r(s) {
    const l = {};
    for (const a of Object.getOwnPropertyNames(s))
      l[a] = f(s[a]);
    for (const a of Object.getOwnPropertySymbols(s))
      l[a] = f(s[a]);
    return l;
  }
  function t(s) {
    return s.map((l) => f(l));
  }
  function o(s) {
    return s.slice();
  }
  function i(s) {
    return new Map(f([...s.entries()]));
  }
  function n(s) {
    return new Set(f([...s.entries()]));
  }
  function u(s) {
    return new Date(s.toISOString());
  }
  function c(s) {
    return s;
  }
  function f(s) {
    if ((0, e.IsArray)(s))
      return t(s);
    if ((0, e.IsDate)(s))
      return u(s);
    if ((0, e.IsTypedArray)(s))
      return o(s);
    if ((0, e.IsMap)(s))
      return i(s);
    if ((0, e.IsSet)(s))
      return n(s);
    if ((0, e.IsObject)(s))
      return r(s);
    if ((0, e.IsValueType)(s))
      return s;
    throw new Error("ValueClone: Unable to clone value");
  }
  return ec;
}
var ap;
function Wr() {
  return ap || (ap = 1, function(e) {
    var r = wt && wt.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = wt && wt.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ JT(), e);
  }(wt)), wt;
}
var fp;
function ZT() {
  if (fp) return Di;
  fp = 1, Object.defineProperty(Di, "__esModule", { value: !0 }), Di.ValueCreateError = void 0, Di.Create = q;
  const e = /* @__PURE__ */ Je(), r = /* @__PURE__ */ Sr(), t = /* @__PURE__ */ Wr(), o = /* @__PURE__ */ vr(), i = /* @__PURE__ */ Hr(), n = /* @__PURE__ */ ko(), u = /* @__PURE__ */ to(), c = /* @__PURE__ */ ue(), f = /* @__PURE__ */ Be(), s = /* @__PURE__ */ Xa();
  class l extends f.TypeBoxError {
    constructor(b, S) {
      super(S), this.schema = b;
    }
  }
  Di.ValueCreateError = l;
  function a(m) {
    return (0, s.IsFunction)(m) ? m() : (0, t.Clone)(m);
  }
  function p(m, b) {
    return (0, e.HasPropertyKey)(m, "default") ? a(m.default) : {};
  }
  function $(m, b) {
    if (m.uniqueItems === !0 && !(0, e.HasPropertyKey)(m, "default"))
      throw new l(m, "Array with the uniqueItems constraint requires a default value");
    if ("contains" in m && !(0, e.HasPropertyKey)(m, "default"))
      throw new l(m, "Array with the contains constraint requires a default value");
    return "default" in m ? a(m.default) : m.minItems !== void 0 ? Array.from({ length: m.minItems }).map((S) => ge(m.items, b)) : [];
  }
  function w(m, b) {
    return (0, e.HasPropertyKey)(m, "default") ? a(m.default) : async function* () {
    }();
  }
  function R(m, b) {
    return (0, e.HasPropertyKey)(m, "default") ? a(m.default) : BigInt(0);
  }
  function v(m, b) {
    return (0, e.HasPropertyKey)(m, "default") ? a(m.default) : !1;
  }
  function C(m, b) {
    if ((0, e.HasPropertyKey)(m, "default"))
      return a(m.default);
    {
      const S = ge(m.returns, b);
      return typeof S == "object" && !Array.isArray(S) ? class {
        constructor() {
          for (const [V, d] of Object.entries(S)) {
            const Y = this;
            Y[V] = d;
          }
        }
      } : class {
      };
    }
  }
  function A(m, b) {
    return (0, e.HasPropertyKey)(m, "default") ? a(m.default) : m.minimumTimestamp !== void 0 ? new Date(m.minimumTimestamp) : /* @__PURE__ */ new Date();
  }
  function L(m, b) {
    return (0, e.HasPropertyKey)(m, "default") ? a(m.default) : () => ge(m.returns, b);
  }
  function F(m, b) {
    const S = globalThis.Object.values(m.$defs), V = m.$defs[m.$ref];
    return ge(V, [...b, ...S]);
  }
  function I(m, b) {
    return (0, e.HasPropertyKey)(m, "default") ? a(m.default) : m.minimum !== void 0 ? m.minimum : 0;
  }
  function U(m, b) {
    if ((0, e.HasPropertyKey)(m, "default"))
      return a(m.default);
    {
      const S = m.allOf.reduce((V, d) => {
        const Y = ge(d, b);
        return typeof Y == "object" ? { ...V, ...Y } : Y;
      }, {});
      if (!(0, r.Check)(m, b, S))
        throw new l(m, "Intersect produced invalid value. Consider using a default value.");
      return S;
    }
  }
  function _(m, b) {
    return (0, e.HasPropertyKey)(m, "default") ? a(m.default) : function* () {
    }();
  }
  function P(m, b) {
    return (0, e.HasPropertyKey)(m, "default") ? a(m.default) : m.const;
  }
  function T(m, b) {
    if ((0, e.HasPropertyKey)(m, "default"))
      return a(m.default);
    throw new l(m, "Never types cannot be created. Consider using a default value.");
  }
  function y(m, b) {
    if ((0, e.HasPropertyKey)(m, "default"))
      return a(m.default);
    throw new l(m, "Not types must have a default value");
  }
  function x(m, b) {
    return (0, e.HasPropertyKey)(m, "default") ? a(m.default) : null;
  }
  function M(m, b) {
    return (0, e.HasPropertyKey)(m, "default") ? a(m.default) : m.minimum !== void 0 ? m.minimum : 0;
  }
  function h(m, b) {
    if ((0, e.HasPropertyKey)(m, "default"))
      return a(m.default);
    {
      const S = new Set(m.required), V = {};
      for (const [d, Y] of Object.entries(m.properties))
        S.has(d) && (V[d] = ge(Y, b));
      return V;
    }
  }
  function D(m, b) {
    return (0, e.HasPropertyKey)(m, "default") ? a(m.default) : Promise.resolve(ge(m.item, b));
  }
  function z(m, b) {
    const [S, V] = Object.entries(m.patternProperties)[0];
    if ((0, e.HasPropertyKey)(m, "default"))
      return a(m.default);
    if (S === n.PatternStringExact || S === n.PatternNumberExact)
      return {};
    {
      const d = S.slice(1, S.length - 1).split("|"), Y = {};
      for (const K of d)
        Y[K] = ge(V, b);
      return Y;
    }
  }
  function X(m, b) {
    return (0, e.HasPropertyKey)(m, "default") ? a(m.default) : ge((0, o.Deref)(m, b), b);
  }
  function ee(m, b) {
    if ((0, e.HasPropertyKey)(m, "default"))
      return a(m.default);
    throw new l(m, "RegExp types cannot be created. Consider using a default value.");
  }
  function G(m, b) {
    if (m.pattern !== void 0) {
      if ((0, e.HasPropertyKey)(m, "default"))
        return a(m.default);
      throw new l(m, "String types with patterns must specify a default value");
    } else if (m.format !== void 0) {
      if ((0, e.HasPropertyKey)(m, "default"))
        return a(m.default);
      throw new l(m, "String types with formats must specify a default value");
    } else
      return (0, e.HasPropertyKey)(m, "default") ? a(m.default) : m.minLength !== void 0 ? Array.from({ length: m.minLength }).map(() => " ").join("") : "";
  }
  function Pe(m, b) {
    return (0, e.HasPropertyKey)(m, "default") ? a(m.default) : "value" in m ? Symbol.for(m.value) : Symbol();
  }
  function Se(m, b) {
    if ((0, e.HasPropertyKey)(m, "default"))
      return a(m.default);
    if (!(0, i.IsTemplateLiteralFinite)(m))
      throw new l(m, "Can only create template literals that produce a finite variants. Consider using a default value.");
    return (0, i.TemplateLiteralGenerate)(m)[0];
  }
  function Ce(m, b) {
    if (W++ > Z)
      throw new l(m, "Cannot create recursive type as it appears possibly infinite. Consider using a default.");
    return (0, e.HasPropertyKey)(m, "default") ? a(m.default) : ge((0, o.Deref)(m, b), b);
  }
  function Ae(m, b) {
    return (0, e.HasPropertyKey)(m, "default") ? a(m.default) : m.items === void 0 ? [] : Array.from({ length: m.minItems }).map((S, V) => ge(m.items[V], b));
  }
  function Ue(m, b) {
    if ((0, e.HasPropertyKey)(m, "default"))
      return a(m.default);
  }
  function je(m, b) {
    if ((0, e.HasPropertyKey)(m, "default"))
      return a(m.default);
    if (m.anyOf.length === 0)
      throw new Error("ValueCreate.Union: Cannot create Union with zero variants");
    return ge(m.anyOf[0], b);
  }
  function he(m, b) {
    return (0, e.HasPropertyKey)(m, "default") ? a(m.default) : m.minByteLength !== void 0 ? new Uint8Array(m.minByteLength) : new Uint8Array(0);
  }
  function J(m, b) {
    return (0, e.HasPropertyKey)(m, "default") ? a(m.default) : {};
  }
  function Q(m, b) {
    if ((0, e.HasPropertyKey)(m, "default"))
      return a(m.default);
  }
  function me(m, b) {
    if ((0, e.HasPropertyKey)(m, "default"))
      return a(m.default);
    throw new Error("User defined types must specify a default value");
  }
  function ge(m, b) {
    const S = (0, o.Pushref)(m, b), V = m;
    switch (V[c.Kind]) {
      case "Any":
        return p(V);
      case "Array":
        return $(V, S);
      case "AsyncIterator":
        return w(V);
      case "BigInt":
        return R(V);
      case "Boolean":
        return v(V);
      case "Constructor":
        return C(V, S);
      case "Date":
        return A(V);
      case "Function":
        return L(V, S);
      case "Import":
        return F(V, S);
      case "Integer":
        return I(V);
      case "Intersect":
        return U(V, S);
      case "Iterator":
        return _(V);
      case "Literal":
        return P(V);
      case "Never":
        return T(V);
      case "Not":
        return y(V);
      case "Null":
        return x(V);
      case "Number":
        return M(V);
      case "Object":
        return h(V, S);
      case "Promise":
        return D(V, S);
      case "Record":
        return z(V, S);
      case "Ref":
        return X(V, S);
      case "RegExp":
        return ee(V);
      case "String":
        return G(V);
      case "Symbol":
        return Pe(V);
      case "TemplateLiteral":
        return Se(V);
      case "This":
        return Ce(V, S);
      case "Tuple":
        return Ae(V, S);
      case "Undefined":
        return Ue(V);
      case "Union":
        return je(V, S);
      case "Uint8Array":
        return he(V);
      case "Unknown":
        return J(V);
      case "Void":
        return Q(V);
      default:
        if (!u.TypeRegistry.Has(V[c.Kind]))
          throw new l(V, "Unknown type");
        return me(V);
    }
  }
  const Z = 512;
  let W = 0;
  function q(...m) {
    return W = 0, m.length === 2 ? ge(m[0], m[1]) : ge(m[0], []);
  }
  return Di;
}
var dp;
function af() {
  return dp || (dp = 1, function(e) {
    var r = Ft && Ft.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Ft && Ft.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ ZT(), e);
  }(Ft)), Ft;
}
var lp;
function QT() {
  if (lp) return Bi;
  lp = 1, Object.defineProperty(Bi, "__esModule", { value: !0 }), Bi.ValueCastError = void 0, Bi.Cast = T;
  const e = /* @__PURE__ */ Je(), r = /* @__PURE__ */ Be(), t = /* @__PURE__ */ ue(), o = /* @__PURE__ */ af(), i = /* @__PURE__ */ Sr(), n = /* @__PURE__ */ Wr(), u = /* @__PURE__ */ vr();
  class c extends r.TypeBoxError {
    constructor(x, M) {
      super(M), this.schema = x;
    }
  }
  Bi.ValueCastError = c;
  function f(y, x, M) {
    if (y[t.Kind] === "Object" && typeof M == "object" && !(0, e.IsNull)(M)) {
      const h = y, D = Object.getOwnPropertyNames(M), z = Object.entries(h.properties), [X, ee] = [1 / z.length, z.length];
      return z.reduce((G, [Pe, Se]) => {
        const Ce = Se[t.Kind] === "Literal" && Se.const === M[Pe] ? ee : 0, Ae = (0, i.Check)(Se, x, M[Pe]) ? X : 0, Ue = D.includes(Pe) ? X : 0;
        return G + (Ce + Ae + Ue);
      }, 0);
    } else
      return (0, i.Check)(y, x, M) ? 1 : 0;
  }
  function s(y, x, M) {
    const h = y.anyOf.map((X) => (0, u.Deref)(X, x));
    let [D, z] = [h[0], 0];
    for (const X of h) {
      const ee = f(X, x, M);
      ee > z && (D = X, z = ee);
    }
    return D;
  }
  function l(y, x, M) {
    if ("default" in y)
      return typeof M == "function" ? y.default : (0, n.Clone)(y.default);
    {
      const h = s(y, x, M);
      return T(h, x, M);
    }
  }
  function a(y, x, M) {
    return (0, i.Check)(y, x, M) ? (0, n.Clone)(M) : (0, o.Create)(y, x);
  }
  function p(y, x, M) {
    return (0, i.Check)(y, x, M) ? M : (0, o.Create)(y, x);
  }
  function $(y, x, M) {
    if ((0, i.Check)(y, x, M))
      return (0, n.Clone)(M);
    const h = (0, e.IsArray)(M) ? (0, n.Clone)(M) : (0, o.Create)(y, x), D = (0, e.IsNumber)(y.minItems) && h.length < y.minItems ? [...h, ...Array.from({ length: y.minItems - h.length }, () => null)] : h, X = ((0, e.IsNumber)(y.maxItems) && D.length > y.maxItems ? D.slice(0, y.maxItems) : D).map((G) => P(y.items, x, G));
    if (y.uniqueItems !== !0)
      return X;
    const ee = [...new Set(X)];
    if (!(0, i.Check)(y, x, ee))
      throw new c(y, "Array cast produced invalid data due to uniqueItems constraint");
    return ee;
  }
  function w(y, x, M) {
    if ((0, i.Check)(y, x, M))
      return (0, o.Create)(y, x);
    const h = new Set(y.returns.required || []), D = function() {
    };
    for (const [z, X] of Object.entries(y.returns.properties))
      !h.has(z) && M.prototype[z] === void 0 || (D.prototype[z] = P(X, x, M.prototype[z]));
    return D;
  }
  function R(y, x, M) {
    const h = globalThis.Object.values(y.$defs), D = y.$defs[y.$ref];
    return P(D, [...x, ...h], M);
  }
  function v(y, x, M) {
    const h = (0, o.Create)(y, x), D = (0, e.IsObject)(h) && (0, e.IsObject)(M) ? { ...h, ...M } : M;
    return (0, i.Check)(y, x, D) ? D : (0, o.Create)(y, x);
  }
  function C(y, x, M) {
    throw new c(y, "Never types cannot be cast");
  }
  function A(y, x, M) {
    if ((0, i.Check)(y, x, M))
      return M;
    if (M === null || typeof M != "object")
      return (0, o.Create)(y, x);
    const h = new Set(y.required || []), D = {};
    for (const [z, X] of Object.entries(y.properties))
      !h.has(z) && M[z] === void 0 || (D[z] = P(X, x, M[z]));
    if (typeof y.additionalProperties == "object") {
      const z = Object.getOwnPropertyNames(y.properties);
      for (const X of Object.getOwnPropertyNames(M))
        z.includes(X) || (D[X] = P(y.additionalProperties, x, M[X]));
    }
    return D;
  }
  function L(y, x, M) {
    if ((0, i.Check)(y, x, M))
      return (0, n.Clone)(M);
    if (M === null || typeof M != "object" || Array.isArray(M) || M instanceof Date)
      return (0, o.Create)(y, x);
    const h = Object.getOwnPropertyNames(y.patternProperties)[0], D = y.patternProperties[h], z = {};
    for (const [X, ee] of Object.entries(M))
      z[X] = P(D, x, ee);
    return z;
  }
  function F(y, x, M) {
    return P((0, u.Deref)(y, x), x, M);
  }
  function I(y, x, M) {
    return P((0, u.Deref)(y, x), x, M);
  }
  function U(y, x, M) {
    return (0, i.Check)(y, x, M) ? (0, n.Clone)(M) : (0, e.IsArray)(M) ? y.items === void 0 ? [] : y.items.map((h, D) => P(h, x, M[D])) : (0, o.Create)(y, x);
  }
  function _(y, x, M) {
    return (0, i.Check)(y, x, M) ? (0, n.Clone)(M) : l(y, x, M);
  }
  function P(y, x, M) {
    const h = (0, e.IsString)(y.$id) ? (0, u.Pushref)(y, x) : x, D = y;
    switch (y[t.Kind]) {
      // --------------------------------------------------------------
      // Structural
      // --------------------------------------------------------------
      case "Array":
        return $(D, h, M);
      case "Constructor":
        return w(D, h, M);
      case "Import":
        return R(D, h, M);
      case "Intersect":
        return v(D, h, M);
      case "Never":
        return C(D);
      case "Object":
        return A(D, h, M);
      case "Record":
        return L(D, h, M);
      case "Ref":
        return F(D, h, M);
      case "This":
        return I(D, h, M);
      case "Tuple":
        return U(D, h, M);
      case "Union":
        return _(D, h, M);
      // --------------------------------------------------------------
      // DefaultClone
      // --------------------------------------------------------------
      case "Date":
      case "Symbol":
      case "Uint8Array":
        return a(y, x, M);
      // --------------------------------------------------------------
      // Default
      // --------------------------------------------------------------
      default:
        return p(D, h, M);
    }
  }
  function T(...y) {
    return y.length === 3 ? P(y[0], y[1], y[2]) : P(y[0], [], y[1]);
  }
  return Bi;
}
var pp;
function jb() {
  return pp || (pp = 1, function(e) {
    var r = $t && $t.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = $t && $t.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ QT(), e);
  }($t)), $t;
}
var xt = {}, rc = {}, yp;
function XT() {
  if (yp) return rc;
  yp = 1, Object.defineProperty(rc, "__esModule", { value: !0 }), rc.Clean = A;
  const e = /* @__PURE__ */ Kr(), r = /* @__PURE__ */ Sr(), t = /* @__PURE__ */ Wr(), o = /* @__PURE__ */ vr(), i = /* @__PURE__ */ ue(), n = /* @__PURE__ */ Je(), u = /* @__PURE__ */ we();
  function c(L) {
    return (0, u.IsKind)(L) && L[i.Kind] !== "Unsafe";
  }
  function f(L, F, I) {
    return (0, n.IsArray)(I) ? I.map((U) => C(L.items, F, U)) : I;
  }
  function s(L, F, I) {
    const U = globalThis.Object.values(L.$defs), _ = L.$defs[L.$ref];
    return C(_, [...F, ...U], I);
  }
  function l(L, F, I) {
    const U = L.unevaluatedProperties, P = L.allOf.map((y) => C(y, F, (0, t.Clone)(I))).reduce((y, x) => (0, n.IsObject)(x) ? { ...y, ...x } : x, {});
    if (!(0, n.IsObject)(I) || !(0, n.IsObject)(P) || !(0, u.IsKind)(U))
      return P;
    const T = (0, e.KeyOfPropertyKeys)(L);
    for (const y of Object.getOwnPropertyNames(I))
      T.includes(y) || (0, r.Check)(U, F, I[y]) && (P[y] = C(U, F, I[y]));
    return P;
  }
  function a(L, F, I) {
    if (!(0, n.IsObject)(I) || (0, n.IsArray)(I))
      return I;
    const U = L.additionalProperties;
    for (const _ of Object.getOwnPropertyNames(I)) {
      if ((0, n.HasPropertyKey)(L.properties, _)) {
        I[_] = C(L.properties[_], F, I[_]);
        continue;
      }
      if ((0, u.IsKind)(U) && (0, r.Check)(U, F, I[_])) {
        I[_] = C(U, F, I[_]);
        continue;
      }
      delete I[_];
    }
    return I;
  }
  function p(L, F, I) {
    if (!(0, n.IsObject)(I))
      return I;
    const U = L.additionalProperties, _ = Object.getOwnPropertyNames(I), [P, T] = Object.entries(L.patternProperties)[0], y = new RegExp(P);
    for (const x of _) {
      if (y.test(x)) {
        I[x] = C(T, F, I[x]);
        continue;
      }
      if ((0, u.IsKind)(U) && (0, r.Check)(U, F, I[x])) {
        I[x] = C(U, F, I[x]);
        continue;
      }
      delete I[x];
    }
    return I;
  }
  function $(L, F, I) {
    return C((0, o.Deref)(L, F), F, I);
  }
  function w(L, F, I) {
    return C((0, o.Deref)(L, F), F, I);
  }
  function R(L, F, I) {
    if (!(0, n.IsArray)(I))
      return I;
    if ((0, n.IsUndefined)(L.items))
      return [];
    const U = Math.min(I.length, L.items.length);
    for (let _ = 0; _ < U; _++)
      I[_] = C(L.items[_], F, I[_]);
    return I.length > U ? I.slice(0, U) : I;
  }
  function v(L, F, I) {
    for (const U of L.anyOf)
      if (c(U) && (0, r.Check)(U, F, I))
        return C(U, F, I);
    return I;
  }
  function C(L, F, I) {
    const U = (0, n.IsString)(L.$id) ? (0, o.Pushref)(L, F) : F, _ = L;
    switch (_[i.Kind]) {
      case "Array":
        return f(_, U, I);
      case "Import":
        return s(_, U, I);
      case "Intersect":
        return l(_, U, I);
      case "Object":
        return a(_, U, I);
      case "Record":
        return p(_, U, I);
      case "Ref":
        return $(_, U, I);
      case "This":
        return w(_, U, I);
      case "Tuple":
        return R(_, U, I);
      case "Union":
        return v(_, U, I);
      default:
        return I;
    }
  }
  function A(...L) {
    return L.length === 3 ? C(L[0], L[1], L[2]) : C(L[0], [], L[1]);
  }
  return rc;
}
var mp;
function ff() {
  return mp || (mp = 1, function(e) {
    var r = xt && xt.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = xt && xt.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ XT(), e);
  }(xt)), xt;
}
var Rt = {}, nc = {}, _p;
function kT() {
  if (_p) return nc;
  _p = 1, Object.defineProperty(nc, "__esModule", { value: !0 }), nc.Convert = W;
  const e = /* @__PURE__ */ Wr(), r = /* @__PURE__ */ Sr(), t = /* @__PURE__ */ vr(), o = /* @__PURE__ */ ue(), i = /* @__PURE__ */ Je();
  function n(q) {
    return (0, i.IsString)(q) && !isNaN(q) && !isNaN(parseFloat(q));
  }
  function u(q) {
    return (0, i.IsBigInt)(q) || (0, i.IsBoolean)(q) || (0, i.IsNumber)(q);
  }
  function c(q) {
    return q === !0 || (0, i.IsNumber)(q) && q === 1 || (0, i.IsBigInt)(q) && q === BigInt("1") || (0, i.IsString)(q) && (q.toLowerCase() === "true" || q === "1");
  }
  function f(q) {
    return q === !1 || (0, i.IsNumber)(q) && (q === 0 || Object.is(q, -0)) || (0, i.IsBigInt)(q) && q === BigInt("0") || (0, i.IsString)(q) && (q.toLowerCase() === "false" || q === "0" || q === "-0");
  }
  function s(q) {
    return (0, i.IsString)(q) && /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test(q);
  }
  function l(q) {
    return (0, i.IsString)(q) && /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test(q);
  }
  function a(q) {
    return (0, i.IsString)(q) && /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test(q);
  }
  function p(q) {
    return (0, i.IsString)(q) && /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test(q);
  }
  function $(q) {
    return (0, i.IsString)(q) && /^\d\d\d\d-[0-1]\d-[0-3]\d$/i.test(q);
  }
  function w(q, m) {
    const b = F(q);
    return b === m ? b : q;
  }
  function R(q, m) {
    const b = I(q);
    return b === m ? b : q;
  }
  function v(q, m) {
    const b = A(q);
    return b === m ? b : q;
  }
  function C(q, m) {
    return (0, i.IsString)(q.const) ? w(m, q.const) : (0, i.IsNumber)(q.const) ? R(m, q.const) : (0, i.IsBoolean)(q.const) ? v(m, q.const) : m;
  }
  function A(q) {
    return c(q) ? !0 : f(q) ? !1 : q;
  }
  function L(q) {
    const m = (b) => b.split(".")[0];
    return n(q) ? BigInt(m(q)) : (0, i.IsNumber)(q) ? BigInt(Math.trunc(q)) : f(q) ? BigInt(0) : c(q) ? BigInt(1) : q;
  }
  function F(q) {
    return (0, i.IsSymbol)(q) && q.description !== void 0 ? q.description.toString() : u(q) ? q.toString() : q;
  }
  function I(q) {
    return n(q) ? parseFloat(q) : c(q) ? 1 : f(q) ? 0 : q;
  }
  function U(q) {
    return n(q) ? parseInt(q) : (0, i.IsNumber)(q) ? q | 0 : c(q) ? 1 : f(q) ? 0 : q;
  }
  function _(q) {
    return (0, i.IsString)(q) && q.toLowerCase() === "null" ? null : q;
  }
  function P(q) {
    return (0, i.IsString)(q) && q === "undefined" ? void 0 : q;
  }
  function T(q) {
    return (0, i.IsDate)(q) ? q : (0, i.IsNumber)(q) ? new Date(q) : c(q) ? /* @__PURE__ */ new Date(1) : f(q) ? /* @__PURE__ */ new Date(0) : n(q) ? new Date(parseInt(q)) : l(q) ? /* @__PURE__ */ new Date(`1970-01-01T${q}.000Z`) : s(q) ? /* @__PURE__ */ new Date(`1970-01-01T${q}`) : p(q) ? /* @__PURE__ */ new Date(`${q}.000Z`) : a(q) ? new Date(q) : $(q) ? /* @__PURE__ */ new Date(`${q}T00:00:00.000Z`) : q;
  }
  function y(q) {
    return q;
  }
  function x(q, m, b) {
    return ((0, i.IsArray)(b) ? b : [b]).map((V) => Z(q.items, m, V));
  }
  function M(q, m, b) {
    return L(b);
  }
  function h(q, m, b) {
    return A(b);
  }
  function D(q, m, b) {
    return T(b);
  }
  function z(q, m, b) {
    const S = globalThis.Object.values(q.$defs), V = q.$defs[q.$ref];
    return Z(V, [...m, ...S], b);
  }
  function X(q, m, b) {
    return U(b);
  }
  function ee(q, m, b) {
    return q.allOf.reduce((S, V) => Z(V, m, S), b);
  }
  function G(q, m, b) {
    return C(q, b);
  }
  function Pe(q, m, b) {
    return _(b);
  }
  function Se(q, m, b) {
    return I(b);
  }
  function Ce(q, m, b) {
    if (!(0, i.IsObject)(b))
      return b;
    for (const S of Object.getOwnPropertyNames(q.properties))
      (0, i.HasPropertyKey)(b, S) && (b[S] = Z(q.properties[S], m, b[S]));
    return b;
  }
  function Ae(q, m, b) {
    if (!(0, i.IsObject)(b))
      return b;
    const V = Object.getOwnPropertyNames(q.patternProperties)[0], d = q.patternProperties[V];
    for (const [Y, K] of Object.entries(b))
      b[Y] = Z(d, m, K);
    return b;
  }
  function Ue(q, m, b) {
    return Z((0, t.Deref)(q, m), m, b);
  }
  function je(q, m, b) {
    return F(b);
  }
  function he(q, m, b) {
    return (0, i.IsString)(b) || (0, i.IsNumber)(b) ? Symbol(b) : b;
  }
  function J(q, m, b) {
    return Z((0, t.Deref)(q, m), m, b);
  }
  function Q(q, m, b) {
    return (0, i.IsArray)(b) && !(0, i.IsUndefined)(q.items) ? b.map((V, d) => d < q.items.length ? Z(q.items[d], m, V) : V) : b;
  }
  function me(q, m, b) {
    return P(b);
  }
  function ge(q, m, b) {
    for (const S of q.anyOf) {
      const V = Z(S, m, (0, e.Clone)(b));
      if ((0, r.Check)(S, m, V))
        return V;
    }
    return b;
  }
  function Z(q, m, b) {
    const S = (0, t.Pushref)(q, m), V = q;
    switch (q[o.Kind]) {
      case "Array":
        return x(V, S, b);
      case "BigInt":
        return M(V, S, b);
      case "Boolean":
        return h(V, S, b);
      case "Date":
        return D(V, S, b);
      case "Import":
        return z(V, S, b);
      case "Integer":
        return X(V, S, b);
      case "Intersect":
        return ee(V, S, b);
      case "Literal":
        return G(V, S, b);
      case "Null":
        return Pe(V, S, b);
      case "Number":
        return Se(V, S, b);
      case "Object":
        return Ce(V, S, b);
      case "Record":
        return Ae(V, S, b);
      case "Ref":
        return Ue(V, S, b);
      case "String":
        return je(V, S, b);
      case "Symbol":
        return he(V, S, b);
      case "This":
        return J(V, S, b);
      case "Tuple":
        return Q(V, S, b);
      case "Undefined":
        return me(V, S, b);
      case "Union":
        return ge(V, S, b);
      default:
        return b;
    }
  }
  function W(...q) {
    return q.length === 3 ? Z(q[0], q[1], q[2]) : Z(q[0], [], q[1]);
  }
  return nc;
}
var bp;
function df() {
  return bp || (bp = 1, function(e) {
    var r = Rt && Rt.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Rt && Rt.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ kT(), e);
  }(Rt)), Rt;
}
var Mt = {}, tc = {}, St = {}, mn = {}, Ip;
function e$() {
  if (Ip) return mn;
  Ip = 1, Object.defineProperty(mn, "__esModule", { value: !0 }), mn.TransformDecodeError = mn.TransformDecodeCheckError = void 0, mn.TransformDecode = U;
  const e = /* @__PURE__ */ $s(), r = /* @__PURE__ */ ue(), t = /* @__PURE__ */ Be(), o = /* @__PURE__ */ Kr(), i = /* @__PURE__ */ vr(), n = /* @__PURE__ */ Sr(), u = /* @__PURE__ */ Je(), c = /* @__PURE__ */ we();
  class f extends t.TypeBoxError {
    constructor(P, T, y) {
      super("Unable to decode value as it does not match the expected schema"), this.schema = P, this.value = T, this.error = y;
    }
  }
  mn.TransformDecodeCheckError = f;
  class s extends t.TypeBoxError {
    constructor(P, T, y, x) {
      super(x instanceof Error ? x.message : "Unknown error"), this.schema = P, this.path = T, this.value = y, this.error = x;
    }
  }
  mn.TransformDecodeError = s;
  function l(_, P, T) {
    try {
      return (0, c.IsTransform)(_) ? _[r.TransformKind].Decode(T) : T;
    } catch (y) {
      throw new s(_, P, T, y);
    }
  }
  function a(_, P, T, y) {
    return (0, u.IsArray)(y) ? l(_, T, y.map((x, M) => I(_.items, P, `${T}/${M}`, x))) : l(_, T, y);
  }
  function p(_, P, T, y) {
    if (!(0, u.IsObject)(y) || (0, u.IsValueType)(y))
      return l(_, T, y);
    const x = (0, o.KeyOfPropertyEntries)(_), M = x.map((ee) => ee[0]), h = { ...y };
    for (const [ee, G] of x)
      ee in h && (h[ee] = I(G, P, `${T}/${ee}`, h[ee]));
    if (!(0, c.IsTransform)(_.unevaluatedProperties))
      return l(_, T, h);
    const D = Object.getOwnPropertyNames(h), z = _.unevaluatedProperties, X = { ...h };
    for (const ee of D)
      M.includes(ee) || (X[ee] = l(z, `${T}/${ee}`, X[ee]));
    return l(_, T, X);
  }
  function $(_, P, T, y) {
    const x = globalThis.Object.values(_.$defs), M = _.$defs[_.$ref], h = _[r.TransformKind], D = { [r.TransformKind]: h, ...M };
    return I(D, [...P, ...x], T, y);
  }
  function w(_, P, T, y) {
    return l(_, T, I(_.not, P, T, y));
  }
  function R(_, P, T, y) {
    if (!(0, u.IsObject)(y))
      return l(_, T, y);
    const x = (0, o.KeyOfPropertyKeys)(_), M = { ...y };
    for (const X of x)
      (0, u.HasPropertyKey)(M, X) && ((0, u.IsUndefined)(M[X]) && (!(0, c.IsUndefined)(_.properties[X]) || e.TypeSystemPolicy.IsExactOptionalProperty(M, X)) || (M[X] = I(_.properties[X], P, `${T}/${X}`, M[X])));
    if (!(0, c.IsSchema)(_.additionalProperties))
      return l(_, T, M);
    const h = Object.getOwnPropertyNames(M), D = _.additionalProperties, z = { ...M };
    for (const X of h)
      x.includes(X) || (z[X] = l(D, `${T}/${X}`, z[X]));
    return l(_, T, z);
  }
  function v(_, P, T, y) {
    if (!(0, u.IsObject)(y))
      return l(_, T, y);
    const x = Object.getOwnPropertyNames(_.patternProperties)[0], M = new RegExp(x), h = { ...y };
    for (const ee of Object.getOwnPropertyNames(y))
      M.test(ee) && (h[ee] = I(_.patternProperties[x], P, `${T}/${ee}`, h[ee]));
    if (!(0, c.IsSchema)(_.additionalProperties))
      return l(_, T, h);
    const D = Object.getOwnPropertyNames(h), z = _.additionalProperties, X = { ...h };
    for (const ee of D)
      M.test(ee) || (X[ee] = l(z, `${T}/${ee}`, X[ee]));
    return l(_, T, X);
  }
  function C(_, P, T, y) {
    const x = (0, i.Deref)(_, P);
    return l(_, T, I(x, P, T, y));
  }
  function A(_, P, T, y) {
    const x = (0, i.Deref)(_, P);
    return l(_, T, I(x, P, T, y));
  }
  function L(_, P, T, y) {
    return (0, u.IsArray)(y) && (0, u.IsArray)(_.items) ? l(_, T, _.items.map((x, M) => I(x, P, `${T}/${M}`, y[M]))) : l(_, T, y);
  }
  function F(_, P, T, y) {
    for (const x of _.anyOf) {
      if (!(0, n.Check)(x, P, y))
        continue;
      const M = I(x, P, T, y);
      return l(_, T, M);
    }
    return l(_, T, y);
  }
  function I(_, P, T, y) {
    const x = (0, i.Pushref)(_, P), M = _;
    switch (_[r.Kind]) {
      case "Array":
        return a(M, x, T, y);
      case "Import":
        return $(M, x, T, y);
      case "Intersect":
        return p(M, x, T, y);
      case "Not":
        return w(M, x, T, y);
      case "Object":
        return R(M, x, T, y);
      case "Record":
        return v(M, x, T, y);
      case "Ref":
        return C(M, x, T, y);
      case "Symbol":
        return l(M, T, y);
      case "This":
        return A(M, x, T, y);
      case "Tuple":
        return L(M, x, T, y);
      case "Union":
        return F(M, x, T, y);
      default:
        return l(M, T, y);
    }
  }
  function U(_, P, T) {
    return I(_, P, "", T);
  }
  return mn;
}
var _n = {}, Op;
function r$() {
  if (Op) return _n;
  Op = 1, Object.defineProperty(_n, "__esModule", { value: !0 }), _n.TransformEncodeError = _n.TransformEncodeCheckError = void 0, _n.TransformEncode = U;
  const e = /* @__PURE__ */ $s(), r = /* @__PURE__ */ ue(), t = /* @__PURE__ */ Be(), o = /* @__PURE__ */ Kr(), i = /* @__PURE__ */ vr(), n = /* @__PURE__ */ Sr(), u = /* @__PURE__ */ Je(), c = /* @__PURE__ */ we();
  class f extends t.TypeBoxError {
    constructor(P, T, y) {
      super("The encoded value does not match the expected schema"), this.schema = P, this.value = T, this.error = y;
    }
  }
  _n.TransformEncodeCheckError = f;
  class s extends t.TypeBoxError {
    constructor(P, T, y, x) {
      super(`${x instanceof Error ? x.message : "Unknown error"}`), this.schema = P, this.path = T, this.value = y, this.error = x;
    }
  }
  _n.TransformEncodeError = s;
  function l(_, P, T) {
    try {
      return (0, c.IsTransform)(_) ? _[r.TransformKind].Encode(T) : T;
    } catch (y) {
      throw new s(_, P, T, y);
    }
  }
  function a(_, P, T, y) {
    const x = l(_, T, y);
    return (0, u.IsArray)(x) ? x.map((M, h) => I(_.items, P, `${T}/${h}`, M)) : x;
  }
  function p(_, P, T, y) {
    const x = globalThis.Object.values(_.$defs), M = _.$defs[_.$ref], h = _[r.TransformKind], D = { [r.TransformKind]: h, ...M };
    return I(D, [...P, ...x], T, y);
  }
  function $(_, P, T, y) {
    const x = l(_, T, y);
    if (!(0, u.IsObject)(y) || (0, u.IsValueType)(y))
      return x;
    const M = (0, o.KeyOfPropertyEntries)(_), h = M.map((G) => G[0]), D = { ...x };
    for (const [G, Pe] of M)
      G in D && (D[G] = I(Pe, P, `${T}/${G}`, D[G]));
    if (!(0, c.IsTransform)(_.unevaluatedProperties))
      return D;
    const z = Object.getOwnPropertyNames(D), X = _.unevaluatedProperties, ee = { ...D };
    for (const G of z)
      h.includes(G) || (ee[G] = l(X, `${T}/${G}`, ee[G]));
    return ee;
  }
  function w(_, P, T, y) {
    return l(_.not, T, l(_, T, y));
  }
  function R(_, P, T, y) {
    const x = l(_, T, y);
    if (!(0, u.IsObject)(x))
      return x;
    const M = (0, o.KeyOfPropertyKeys)(_), h = { ...x };
    for (const ee of M)
      (0, u.HasPropertyKey)(h, ee) && ((0, u.IsUndefined)(h[ee]) && (!(0, c.IsUndefined)(_.properties[ee]) || e.TypeSystemPolicy.IsExactOptionalProperty(h, ee)) || (h[ee] = I(_.properties[ee], P, `${T}/${ee}`, h[ee])));
    if (!(0, c.IsSchema)(_.additionalProperties))
      return h;
    const D = Object.getOwnPropertyNames(h), z = _.additionalProperties, X = { ...h };
    for (const ee of D)
      M.includes(ee) || (X[ee] = l(z, `${T}/${ee}`, X[ee]));
    return X;
  }
  function v(_, P, T, y) {
    const x = l(_, T, y);
    if (!(0, u.IsObject)(y))
      return x;
    const M = Object.getOwnPropertyNames(_.patternProperties)[0], h = new RegExp(M), D = { ...x };
    for (const G of Object.getOwnPropertyNames(y))
      h.test(G) && (D[G] = I(_.patternProperties[M], P, `${T}/${G}`, D[G]));
    if (!(0, c.IsSchema)(_.additionalProperties))
      return D;
    const z = Object.getOwnPropertyNames(D), X = _.additionalProperties, ee = { ...D };
    for (const G of z)
      h.test(G) || (ee[G] = l(X, `${T}/${G}`, ee[G]));
    return ee;
  }
  function C(_, P, T, y) {
    const x = (0, i.Deref)(_, P), M = I(x, P, T, y);
    return l(_, T, M);
  }
  function A(_, P, T, y) {
    const x = (0, i.Deref)(_, P), M = I(x, P, T, y);
    return l(_, T, M);
  }
  function L(_, P, T, y) {
    const x = l(_, T, y);
    return (0, u.IsArray)(_.items) ? _.items.map((M, h) => I(M, P, `${T}/${h}`, x[h])) : [];
  }
  function F(_, P, T, y) {
    for (const x of _.anyOf) {
      if (!(0, n.Check)(x, P, y))
        continue;
      const M = I(x, P, T, y);
      return l(_, T, M);
    }
    for (const x of _.anyOf) {
      const M = I(x, P, T, y);
      if ((0, n.Check)(_, P, M))
        return l(_, T, M);
    }
    return l(_, T, y);
  }
  function I(_, P, T, y) {
    const x = (0, i.Pushref)(_, P), M = _;
    switch (_[r.Kind]) {
      case "Array":
        return a(M, x, T, y);
      case "Import":
        return p(M, x, T, y);
      case "Intersect":
        return $(M, x, T, y);
      case "Not":
        return w(M, x, T, y);
      case "Object":
        return R(M, x, T, y);
      case "Record":
        return v(M, x, T, y);
      case "Ref":
        return C(M, x, T, y);
      case "This":
        return A(M, x, T, y);
      case "Tuple":
        return L(M, x, T, y);
      case "Union":
        return F(M, x, T, y);
      default:
        return l(M, T, y);
    }
  }
  function U(_, P, T) {
    return I(_, P, "", T);
  }
  return _n;
}
var ic = {}, gp;
function n$() {
  if (gp) return ic;
  gp = 1, Object.defineProperty(ic, "__esModule", { value: !0 }), ic.HasTransform = F;
  const e = /* @__PURE__ */ vr(), r = /* @__PURE__ */ ue(), t = /* @__PURE__ */ we(), o = /* @__PURE__ */ Je();
  function i(I, U) {
    return (0, t.IsTransform)(I) || A(I.items, U);
  }
  function n(I, U) {
    return (0, t.IsTransform)(I) || A(I.items, U);
  }
  function u(I, U) {
    return (0, t.IsTransform)(I) || A(I.returns, U) || I.parameters.some((_) => A(_, U));
  }
  function c(I, U) {
    return (0, t.IsTransform)(I) || A(I.returns, U) || I.parameters.some((_) => A(_, U));
  }
  function f(I, U) {
    return (0, t.IsTransform)(I) || (0, t.IsTransform)(I.unevaluatedProperties) || I.allOf.some((_) => A(_, U));
  }
  function s(I, U) {
    return (0, t.IsTransform)(I) || A(I.items, U);
  }
  function l(I, U) {
    return (0, t.IsTransform)(I) || A(I.not, U);
  }
  function a(I, U) {
    return (0, t.IsTransform)(I) || Object.values(I.properties).some((_) => A(_, U)) || (0, t.IsSchema)(I.additionalProperties) && A(I.additionalProperties, U);
  }
  function p(I, U) {
    return (0, t.IsTransform)(I) || A(I.item, U);
  }
  function $(I, U) {
    const _ = Object.getOwnPropertyNames(I.patternProperties)[0], P = I.patternProperties[_];
    return (0, t.IsTransform)(I) || A(P, U) || (0, t.IsSchema)(I.additionalProperties) && (0, t.IsTransform)(I.additionalProperties);
  }
  function w(I, U) {
    return (0, t.IsTransform)(I) ? !0 : A((0, e.Deref)(I, U), U);
  }
  function R(I, U) {
    return (0, t.IsTransform)(I) ? !0 : A((0, e.Deref)(I, U), U);
  }
  function v(I, U) {
    return (0, t.IsTransform)(I) || !(0, o.IsUndefined)(I.items) && I.items.some((_) => A(_, U));
  }
  function C(I, U) {
    return (0, t.IsTransform)(I) || I.anyOf.some((_) => A(_, U));
  }
  function A(I, U) {
    const _ = (0, e.Pushref)(I, U), P = I;
    if (I.$id && L.has(I.$id))
      return !1;
    switch (I.$id && L.add(I.$id), I[r.Kind]) {
      case "Array":
        return i(P, _);
      case "AsyncIterator":
        return n(P, _);
      case "Constructor":
        return u(P, _);
      case "Function":
        return c(P, _);
      case "Intersect":
        return f(P, _);
      case "Iterator":
        return s(P, _);
      case "Not":
        return l(P, _);
      case "Object":
        return a(P, _);
      case "Promise":
        return p(P, _);
      case "Record":
        return $(P, _);
      case "Ref":
        return w(P, _);
      case "This":
        return R(P, _);
      case "Tuple":
        return v(P, _);
      case "Union":
        return C(P, _);
      default:
        return (0, t.IsTransform)(I);
    }
  }
  const L = /* @__PURE__ */ new Set();
  function F(I, U) {
    return L.clear(), A(I, U);
  }
  return ic;
}
var Pp;
function tu() {
  return Pp || (Pp = 1, function(e) {
    var r = St && St.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = St && St.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ e$(), e), t(/* @__PURE__ */ r$(), e), t(/* @__PURE__ */ n$(), e);
  }(St)), St;
}
var jp;
function t$() {
  if (jp) return tc;
  jp = 1, Object.defineProperty(tc, "__esModule", { value: !0 }), tc.Decode = o;
  const e = /* @__PURE__ */ tu(), r = /* @__PURE__ */ Sr(), t = /* @__PURE__ */ Rn();
  function o(...i) {
    const [n, u, c] = i.length === 3 ? [i[0], i[1], i[2]] : [i[0], [], i[1]];
    if (!(0, r.Check)(n, u, c))
      throw new e.TransformDecodeCheckError(n, c, (0, t.Errors)(n, u, c).First());
    return (0, e.HasTransform)(n, u) ? (0, e.TransformDecode)(n, u, c) : c;
  }
  return tc;
}
var Tp;
function Tb() {
  return Tp || (Tp = 1, function(e) {
    var r = Mt && Mt.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Mt && Mt.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ t$(), e);
  }(Mt)), Mt;
}
var Et = {}, oc = {}, $p;
function i$() {
  if ($p) return oc;
  $p = 1, Object.defineProperty(oc, "__esModule", { value: !0 }), oc.Default = L;
  const e = /* @__PURE__ */ Sr(), r = /* @__PURE__ */ Wr(), t = /* @__PURE__ */ vr(), o = /* @__PURE__ */ ue(), i = /* @__PURE__ */ Je(), n = /* @__PURE__ */ we();
  function u(F, I) {
    const U = (0, i.HasPropertyKey)(F, "default") ? F.default : void 0, _ = (0, i.IsFunction)(U) ? U() : (0, r.Clone)(U);
    return (0, i.IsUndefined)(I) ? _ : (0, i.IsObject)(I) && (0, i.IsObject)(_) ? Object.assign(_, I) : I;
  }
  function c(F) {
    return (0, n.IsKind)(F) && "default" in F;
  }
  function f(F, I, U) {
    if ((0, i.IsArray)(U)) {
      for (let P = 0; P < U.length; P++)
        U[P] = A(F.items, I, U[P]);
      return U;
    }
    const _ = u(F, U);
    if (!(0, i.IsArray)(_))
      return _;
    for (let P = 0; P < _.length; P++)
      _[P] = A(F.items, I, _[P]);
    return _;
  }
  function s(F, I, U) {
    return (0, i.IsDate)(U) ? U : u(F, U);
  }
  function l(F, I, U) {
    const _ = globalThis.Object.values(F.$defs), P = F.$defs[F.$ref];
    return A(P, [...I, ..._], U);
  }
  function a(F, I, U) {
    const _ = u(F, U);
    return F.allOf.reduce((P, T) => {
      const y = A(T, I, _);
      return (0, i.IsObject)(y) ? { ...P, ...y } : y;
    }, {});
  }
  function p(F, I, U) {
    const _ = u(F, U);
    if (!(0, i.IsObject)(_))
      return _;
    const P = Object.getOwnPropertyNames(F.properties);
    for (const T of P) {
      const y = A(F.properties[T], I, _[T]);
      (0, i.IsUndefined)(y) || (_[T] = A(F.properties[T], I, _[T]));
    }
    if (!c(F.additionalProperties))
      return _;
    for (const T of Object.getOwnPropertyNames(_))
      P.includes(T) || (_[T] = A(F.additionalProperties, I, _[T]));
    return _;
  }
  function $(F, I, U) {
    const _ = u(F, U);
    if (!(0, i.IsObject)(_))
      return _;
    const P = F.additionalProperties, [T, y] = Object.entries(F.patternProperties)[0], x = new RegExp(T);
    for (const M of Object.getOwnPropertyNames(_))
      x.test(M) && c(y) && (_[M] = A(y, I, _[M]));
    if (!c(P))
      return _;
    for (const M of Object.getOwnPropertyNames(_))
      x.test(M) || (_[M] = A(P, I, _[M]));
    return _;
  }
  function w(F, I, U) {
    return A((0, t.Deref)(F, I), I, u(F, U));
  }
  function R(F, I, U) {
    return A((0, t.Deref)(F, I), I, U);
  }
  function v(F, I, U) {
    const _ = u(F, U);
    if (!(0, i.IsArray)(_) || (0, i.IsUndefined)(F.items))
      return _;
    const [P, T] = [F.items, Math.max(F.items.length, _.length)];
    for (let y = 0; y < T; y++)
      y < P.length && (_[y] = A(P[y], I, _[y]));
    return _;
  }
  function C(F, I, U) {
    const _ = u(F, U);
    for (const P of F.anyOf) {
      const T = A(P, I, (0, r.Clone)(_));
      if ((0, e.Check)(P, I, T))
        return T;
    }
    return _;
  }
  function A(F, I, U) {
    const _ = (0, t.Pushref)(F, I), P = F;
    switch (P[o.Kind]) {
      case "Array":
        return f(P, _, U);
      case "Date":
        return s(P, _, U);
      case "Import":
        return l(P, _, U);
      case "Intersect":
        return a(P, _, U);
      case "Object":
        return p(P, _, U);
      case "Record":
        return $(P, _, U);
      case "Ref":
        return w(P, _, U);
      case "This":
        return R(P, _, U);
      case "Tuple":
        return v(P, _, U);
      case "Union":
        return C(P, _, U);
      default:
        return u(P, U);
    }
  }
  function L(...F) {
    return F.length === 3 ? A(F[0], F[1], F[2]) : A(F[0], [], F[1]);
  }
  return oc;
}
var Fp;
function lf() {
  return Fp || (Fp = 1, function(e) {
    var r = Et && Et.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Et && Et.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ i$(), e);
  }(Et)), Et;
}
var At = {}, Ys = {}, Po = {}, Tr = {}, wp;
function o$() {
  if (wp) return Tr;
  wp = 1, Object.defineProperty(Tr, "__esModule", { value: !0 }), Tr.ValuePointerRootDeleteError = Tr.ValuePointerRootSetError = void 0, Tr.Format = i, Tr.Set = n, Tr.Delete = u, Tr.Has = c, Tr.Get = f;
  const e = /* @__PURE__ */ Be();
  class r extends e.TypeBoxError {
    constructor(l, a, p) {
      super("Cannot set root value"), this.value = l, this.path = a, this.update = p;
    }
  }
  Tr.ValuePointerRootSetError = r;
  class t extends e.TypeBoxError {
    constructor(l, a) {
      super("Cannot delete root value"), this.value = l, this.path = a;
    }
  }
  Tr.ValuePointerRootDeleteError = t;
  function o(s) {
    return s.indexOf("~") === -1 ? s : s.replace(/~1/g, "/").replace(/~0/g, "~");
  }
  function* i(s) {
    if (s === "")
      return;
    let [l, a] = [0, 0];
    for (let p = 0; p < s.length; p++)
      s.charAt(p) === "/" ? (p === 0 || (a = p, yield o(s.slice(l, a))), l = p + 1) : a = p;
    yield o(s.slice(l));
  }
  function n(s, l, a) {
    if (l === "")
      throw new r(s, l, a);
    let [p, $, w] = [null, s, ""];
    for (const R of i(l))
      $[R] === void 0 && ($[R] = {}), p = $, $ = $[R], w = R;
    p[w] = a;
  }
  function u(s, l) {
    if (l === "")
      throw new t(s, l);
    let [a, p, $] = [null, s, ""];
    for (const w of i(l)) {
      if (p[w] === void 0 || p[w] === null)
        return;
      a = p, p = p[w], $ = w;
    }
    if (Array.isArray(a)) {
      const w = parseInt($);
      a.splice(w, 1);
    } else
      delete a[$];
  }
  function c(s, l) {
    if (l === "")
      return !0;
    let [a, p, $] = [null, s, ""];
    for (const w of i(l)) {
      if (p[w] === void 0)
        return !1;
      a = p, p = p[w], $ = w;
    }
    return Object.getOwnPropertyNames(a).includes($);
  }
  function f(s, l) {
    if (l === "")
      return s;
    let a = s;
    for (const p of i(l)) {
      if (a[p] === void 0)
        return;
      a = a[p];
    }
    return a;
  }
  return Tr;
}
var xp;
function pf() {
  return xp || (xp = 1, Object.defineProperty(Po, "__esModule", { value: !0 }), Po.ValuePointer = void 0, Po.ValuePointer = /* @__PURE__ */ o$()), Po;
}
var uc = {}, Rp;
function $b() {
  if (Rp) return uc;
  Rp = 1, Object.defineProperty(uc, "__esModule", { value: !0 }), uc.Equal = u;
  const e = /* @__PURE__ */ Je();
  function r(c, f) {
    if (!(0, e.IsObject)(f))
      return !1;
    const s = [...Object.keys(c), ...Object.getOwnPropertySymbols(c)], l = [...Object.keys(f), ...Object.getOwnPropertySymbols(f)];
    return s.length !== l.length ? !1 : s.every((a) => u(c[a], f[a]));
  }
  function t(c, f) {
    return (0, e.IsDate)(f) && c.getTime() === f.getTime();
  }
  function o(c, f) {
    return !(0, e.IsArray)(f) || c.length !== f.length ? !1 : c.every((s, l) => u(s, f[l]));
  }
  function i(c, f) {
    return !(0, e.IsTypedArray)(f) || c.length !== f.length || Object.getPrototypeOf(c).constructor.name !== Object.getPrototypeOf(f).constructor.name ? !1 : c.every((s, l) => u(s, f[l]));
  }
  function n(c, f) {
    return c === f;
  }
  function u(c, f) {
    if ((0, e.IsDate)(c))
      return t(c, f);
    if ((0, e.IsTypedArray)(c))
      return i(c, f);
    if ((0, e.IsArray)(c))
      return o(c, f);
    if ((0, e.IsObject)(c))
      return r(c, f);
    if ((0, e.IsValueType)(c))
      return n(c, f);
    throw new Error("ValueEquals: Unable to compare value");
  }
  return uc;
}
var Mp;
function u$() {
  return Mp || (Mp = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueDiffError = e.Edit = e.Delete = e.Update = e.Insert = void 0, e.Diff = I, e.Patch = P;
    const r = /* @__PURE__ */ Je(), t = /* @__PURE__ */ pf(), o = /* @__PURE__ */ Wr(), i = /* @__PURE__ */ $b(), n = /* @__PURE__ */ Be(), u = /* @__PURE__ */ ar(), c = /* @__PURE__ */ jr(), f = /* @__PURE__ */ oo(), s = /* @__PURE__ */ co(), l = /* @__PURE__ */ Le();
    e.Insert = (0, c.Object)({
      type: (0, u.Literal)("insert"),
      path: (0, f.String)(),
      value: (0, s.Unknown)()
    }), e.Update = (0, c.Object)({
      type: (0, u.Literal)("update"),
      path: (0, f.String)(),
      value: (0, s.Unknown)()
    }), e.Delete = (0, c.Object)({
      type: (0, u.Literal)("delete"),
      path: (0, f.String)()
    }), e.Edit = (0, l.Union)([e.Insert, e.Update, e.Delete]);
    class a extends n.TypeBoxError {
      constructor(y, x) {
        super(x), this.value = y;
      }
    }
    e.ValueDiffError = a;
    function p(T, y) {
      return { type: "update", path: T, value: y };
    }
    function $(T, y) {
      return { type: "insert", path: T, value: y };
    }
    function w(T) {
      return { type: "delete", path: T };
    }
    function R(T) {
      if (globalThis.Object.getOwnPropertySymbols(T).length > 0)
        throw new a(T, "Cannot diff objects with symbols");
    }
    function* v(T, y, x) {
      if (R(y), R(x), !(0, r.IsStandardObject)(x))
        return yield p(T, x);
      const M = globalThis.Object.getOwnPropertyNames(y), h = globalThis.Object.getOwnPropertyNames(x);
      for (const D of h)
        (0, r.HasPropertyKey)(y, D) || (yield $(`${T}/${D}`, x[D]));
      for (const D of M)
        (0, r.HasPropertyKey)(x, D) && ((0, i.Equal)(y, x) || (yield* F(`${T}/${D}`, y[D], x[D])));
      for (const D of M)
        (0, r.HasPropertyKey)(x, D) || (yield w(`${T}/${D}`));
    }
    function* C(T, y, x) {
      if (!(0, r.IsArray)(x))
        return yield p(T, x);
      for (let M = 0; M < Math.min(y.length, x.length); M++)
        yield* F(`${T}/${M}`, y[M], x[M]);
      for (let M = 0; M < x.length; M++)
        M < y.length || (yield $(`${T}/${M}`, x[M]));
      for (let M = y.length - 1; M >= 0; M--)
        M < x.length || (yield w(`${T}/${M}`));
    }
    function* A(T, y, x) {
      if (!(0, r.IsTypedArray)(x) || y.length !== x.length || globalThis.Object.getPrototypeOf(y).constructor.name !== globalThis.Object.getPrototypeOf(x).constructor.name)
        return yield p(T, x);
      for (let M = 0; M < Math.min(y.length, x.length); M++)
        yield* F(`${T}/${M}`, y[M], x[M]);
    }
    function* L(T, y, x) {
      y !== x && (yield p(T, x));
    }
    function* F(T, y, x) {
      if ((0, r.IsStandardObject)(y))
        return yield* v(T, y, x);
      if ((0, r.IsArray)(y))
        return yield* C(T, y, x);
      if ((0, r.IsTypedArray)(y))
        return yield* A(T, y, x);
      if ((0, r.IsValueType)(y))
        return yield* L(T, y, x);
      throw new a(y, "Unable to diff value");
    }
    function I(T, y) {
      return [...F("", T, y)];
    }
    function U(T) {
      return T.length > 0 && T[0].path === "" && T[0].type === "update";
    }
    function _(T) {
      return T.length === 0;
    }
    function P(T, y) {
      if (U(y))
        return (0, o.Clone)(y[0].value);
      if (_(y))
        return (0, o.Clone)(T);
      const x = (0, o.Clone)(T);
      for (const M of y)
        switch (M.type) {
          case "insert": {
            t.ValuePointer.Set(x, M.path, M.value);
            break;
          }
          case "update": {
            t.ValuePointer.Set(x, M.path, M.value);
            break;
          }
          case "delete": {
            t.ValuePointer.Delete(x, M.path);
            break;
          }
        }
      return x;
    }
  }(Ys)), Ys;
}
var Sp;
function Fb() {
  return Sp || (Sp = 1, function(e) {
    var r = At && At.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = At && At.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ u$(), e);
  }(At)), At;
}
var Ct = {}, cc = {}, Ep;
function c$() {
  if (Ep) return cc;
  Ep = 1, Object.defineProperty(cc, "__esModule", { value: !0 }), cc.Encode = o;
  const e = /* @__PURE__ */ tu(), r = /* @__PURE__ */ Sr(), t = /* @__PURE__ */ Rn();
  function o(...i) {
    const [n, u, c] = i.length === 3 ? [i[0], i[1], i[2]] : [i[0], [], i[1]], f = (0, e.HasTransform)(n, u) ? (0, e.TransformEncode)(n, u, c) : c;
    if (!(0, r.Check)(n, u, f))
      throw new e.TransformEncodeCheckError(n, f, (0, t.Errors)(n, u, f).First());
    return f;
  }
  return cc;
}
var Ap;
function wb() {
  return Ap || (Ap = 1, function(e) {
    var r = Ct && Ct.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Ct && Ct.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ c$(), e);
  }(Ct)), Ct;
}
var Ut = {}, Cp;
function xb() {
  return Cp || (Cp = 1, function(e) {
    var r = Ut && Ut.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Ut && Ut.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ $b(), e);
  }(Ut)), Ut;
}
var qt = {}, Li = {}, Up;
function s$() {
  if (Up) return Li;
  Up = 1, Object.defineProperty(Li, "__esModule", { value: !0 }), Li.ValueMutateError = void 0, Li.Mutate = $;
  const e = /* @__PURE__ */ Je(), r = /* @__PURE__ */ pf(), t = /* @__PURE__ */ Wr(), o = /* @__PURE__ */ Be();
  function i(w) {
    return (0, e.IsObject)(w) && !(0, e.IsArray)(w);
  }
  class n extends o.TypeBoxError {
    constructor(R) {
      super(R);
    }
  }
  Li.ValueMutateError = n;
  function u(w, R, v, C) {
    if (!i(v))
      r.ValuePointer.Set(w, R, (0, t.Clone)(C));
    else {
      const A = Object.getOwnPropertyNames(v), L = Object.getOwnPropertyNames(C);
      for (const F of A)
        L.includes(F) || delete v[F];
      for (const F of L)
        A.includes(F) || (v[F] = null);
      for (const F of L)
        l(w, `${R}/${F}`, v[F], C[F]);
    }
  }
  function c(w, R, v, C) {
    if (!(0, e.IsArray)(v))
      r.ValuePointer.Set(w, R, (0, t.Clone)(C));
    else {
      for (let A = 0; A < C.length; A++)
        l(w, `${R}/${A}`, v[A], C[A]);
      v.splice(C.length);
    }
  }
  function f(w, R, v, C) {
    if ((0, e.IsTypedArray)(v) && v.length === C.length)
      for (let A = 0; A < v.length; A++)
        v[A] = C[A];
    else
      r.ValuePointer.Set(w, R, (0, t.Clone)(C));
  }
  function s(w, R, v, C) {
    v !== C && r.ValuePointer.Set(w, R, C);
  }
  function l(w, R, v, C) {
    if ((0, e.IsArray)(C))
      return c(w, R, v, C);
    if ((0, e.IsTypedArray)(C))
      return f(w, R, v, C);
    if (i(C))
      return u(w, R, v, C);
    if ((0, e.IsValueType)(C))
      return s(w, R, v, C);
  }
  function a(w) {
    return (0, e.IsTypedArray)(w) || (0, e.IsValueType)(w);
  }
  function p(w, R) {
    return i(w) && (0, e.IsArray)(R) || (0, e.IsArray)(w) && i(R);
  }
  function $(w, R) {
    if (a(w) || a(R))
      throw new n("Only object and array types can be mutated at the root level");
    if (p(w, R))
      throw new n("Cannot assign due type mismatch of assignable values");
    l(w, "", w, R);
  }
  return Li;
}
var qp;
function Rb() {
  return qp || (qp = 1, function(e) {
    var r = qt && qt.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = qt && qt.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ s$(), e);
  }(qt)), qt;
}
var Nt = {}, Js = {}, Np;
function a$() {
  return Np || (Np = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ParseDefault = e.ParseRegistry = e.ParseError = void 0, e.Parse = p;
    const r = /* @__PURE__ */ Be(), t = /* @__PURE__ */ tu(), o = /* @__PURE__ */ sf(), i = /* @__PURE__ */ lf(), n = /* @__PURE__ */ df(), u = /* @__PURE__ */ ff(), c = /* @__PURE__ */ Wr(), f = /* @__PURE__ */ Je();
    class s extends r.TypeBoxError {
      constructor(w) {
        super(w);
      }
    }
    e.ParseError = s;
    var l;
    (function($) {
      const w = /* @__PURE__ */ new Map([
        ["Clone", (A, L, F) => (0, c.Clone)(F)],
        ["Clean", (A, L, F) => (0, u.Clean)(A, L, F)],
        ["Default", (A, L, F) => (0, i.Default)(A, L, F)],
        ["Convert", (A, L, F) => (0, n.Convert)(A, L, F)],
        ["Assert", (A, L, F) => ((0, o.Assert)(A, L, F), F)],
        ["Decode", (A, L, F) => (0, t.HasTransform)(A, L) ? (0, t.TransformDecode)(A, L, F) : F],
        ["Encode", (A, L, F) => (0, t.HasTransform)(A, L) ? (0, t.TransformEncode)(A, L, F) : F]
      ]);
      function R(A) {
        w.delete(A);
      }
      $.Delete = R;
      function v(A, L) {
        w.set(A, L);
      }
      $.Set = v;
      function C(A) {
        return w.get(A);
      }
      $.Get = C;
    })(l || (e.ParseRegistry = l = {})), e.ParseDefault = [
      "Clone",
      "Clean",
      "Default",
      "Convert",
      "Assert",
      "Decode"
    ];
    function a($, w, R, v) {
      return $.reduce((C, A) => {
        const L = l.Get(A);
        if ((0, f.IsUndefined)(L))
          throw new s(`Unable to find Parse operation '${A}'`);
        return L(w, R, C);
      }, v);
    }
    function p(...$) {
      const [w, R, v, C] = $.length === 4 ? [$[0], $[1], $[2], $[3]] : $.length === 3 ? (0, f.IsArray)($[0]) ? [$[0], $[1], [], $[2]] : [e.ParseDefault, $[0], $[1], $[2]] : $.length === 2 ? [e.ParseDefault, $[0], [], $[1]] : (() => {
        throw new s("Invalid Arguments");
      })();
      return a(w, R, v, C);
    }
  }(Js)), Js;
}
var hp;
function Mb() {
  return hp || (hp = 1, function(e) {
    var r = Nt && Nt.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Nt && Nt.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ a$(), e);
  }(Nt)), Nt;
}
var jo = {}, Zs = {}, Kp;
function f$() {
  return Kp || (Kp = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.Parse = e.Mutate = e.Hash = e.Equal = e.Encode = e.Edit = e.Patch = e.Diff = e.Default = e.Decode = e.Create = e.Convert = e.Clone = e.Clean = e.Check = e.Cast = e.Assert = e.ValueErrorIterator = e.Errors = void 0;
    var r = /* @__PURE__ */ Rn();
    Object.defineProperty(e, "Errors", { enumerable: !0, get: function() {
      return r.Errors;
    } }), Object.defineProperty(e, "ValueErrorIterator", { enumerable: !0, get: function() {
      return r.ValueErrorIterator;
    } });
    var t = /* @__PURE__ */ sf();
    Object.defineProperty(e, "Assert", { enumerable: !0, get: function() {
      return t.Assert;
    } });
    var o = /* @__PURE__ */ jb();
    Object.defineProperty(e, "Cast", { enumerable: !0, get: function() {
      return o.Cast;
    } });
    var i = /* @__PURE__ */ Sr();
    Object.defineProperty(e, "Check", { enumerable: !0, get: function() {
      return i.Check;
    } });
    var n = /* @__PURE__ */ ff();
    Object.defineProperty(e, "Clean", { enumerable: !0, get: function() {
      return n.Clean;
    } });
    var u = /* @__PURE__ */ Wr();
    Object.defineProperty(e, "Clone", { enumerable: !0, get: function() {
      return u.Clone;
    } });
    var c = /* @__PURE__ */ df();
    Object.defineProperty(e, "Convert", { enumerable: !0, get: function() {
      return c.Convert;
    } });
    var f = /* @__PURE__ */ af();
    Object.defineProperty(e, "Create", { enumerable: !0, get: function() {
      return f.Create;
    } });
    var s = /* @__PURE__ */ Tb();
    Object.defineProperty(e, "Decode", { enumerable: !0, get: function() {
      return s.Decode;
    } });
    var l = /* @__PURE__ */ lf();
    Object.defineProperty(e, "Default", { enumerable: !0, get: function() {
      return l.Default;
    } });
    var a = /* @__PURE__ */ Fb();
    Object.defineProperty(e, "Diff", { enumerable: !0, get: function() {
      return a.Diff;
    } }), Object.defineProperty(e, "Patch", { enumerable: !0, get: function() {
      return a.Patch;
    } }), Object.defineProperty(e, "Edit", { enumerable: !0, get: function() {
      return a.Edit;
    } });
    var p = /* @__PURE__ */ wb();
    Object.defineProperty(e, "Encode", { enumerable: !0, get: function() {
      return p.Encode;
    } });
    var $ = /* @__PURE__ */ xb();
    Object.defineProperty(e, "Equal", { enumerable: !0, get: function() {
      return $.Equal;
    } });
    var w = /* @__PURE__ */ ru();
    Object.defineProperty(e, "Hash", { enumerable: !0, get: function() {
      return w.Hash;
    } });
    var R = /* @__PURE__ */ Rb();
    Object.defineProperty(e, "Mutate", { enumerable: !0, get: function() {
      return R.Mutate;
    } });
    var v = /* @__PURE__ */ Mb();
    Object.defineProperty(e, "Parse", { enumerable: !0, get: function() {
      return v.Parse;
    } });
  }(Zs)), Zs;
}
var vp;
function d$() {
  return vp || (vp = 1, Object.defineProperty(jo, "__esModule", { value: !0 }), jo.Value = void 0, jo.Value = /* @__PURE__ */ f$()), jo;
}
var Bp;
function iu() {
  return Bp || (Bp = 1, function(e) {
    var r = Sn && Sn.__createBinding || (Object.create ? function(n, u, c, f) {
      f === void 0 && (f = c);
      var s = Object.getOwnPropertyDescriptor(u, c);
      (!s || ("get" in s ? !u.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return u[c];
      } }), Object.defineProperty(n, f, s);
    } : function(n, u, c, f) {
      f === void 0 && (f = c), n[f] = u[c];
    }), t = Sn && Sn.__exportStar || function(n, u) {
      for (var c in n) c !== "default" && !Object.prototype.hasOwnProperty.call(u, c) && r(u, n, c);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.Value = e.ValueErrorIterator = e.ValueErrorType = void 0;
    var o = /* @__PURE__ */ Rn();
    Object.defineProperty(e, "ValueErrorType", { enumerable: !0, get: function() {
      return o.ValueErrorType;
    } }), Object.defineProperty(e, "ValueErrorIterator", { enumerable: !0, get: function() {
      return o.ValueErrorIterator;
    } }), t(/* @__PURE__ */ Je(), e), t(/* @__PURE__ */ sf(), e), t(/* @__PURE__ */ jb(), e), t(/* @__PURE__ */ Sr(), e), t(/* @__PURE__ */ ff(), e), t(/* @__PURE__ */ Wr(), e), t(/* @__PURE__ */ df(), e), t(/* @__PURE__ */ af(), e), t(/* @__PURE__ */ Tb(), e), t(/* @__PURE__ */ lf(), e), t(/* @__PURE__ */ Fb(), e), t(/* @__PURE__ */ wb(), e), t(/* @__PURE__ */ xb(), e), t(/* @__PURE__ */ ru(), e), t(/* @__PURE__ */ Rb(), e), t(/* @__PURE__ */ Mb(), e), t(/* @__PURE__ */ pf(), e), t(/* @__PURE__ */ tu(), e);
    var i = /* @__PURE__ */ d$();
    Object.defineProperty(e, "Value", { enumerable: !0, get: function() {
      return i.Value;
    } });
  }(Sn)), Sn;
}
var Qs = {}, ht = {}, Kt = {}, To = {}, Dp;
function Sb() {
  if (Dp) return To;
  Dp = 1, Object.defineProperty(To, "__esModule", { value: !0 }), To.CloneRest = r, To.CloneType = t;
  const e = /* @__PURE__ */ Pr();
  function r(o) {
    return o.map((i) => t(i));
  }
  function t(o, i) {
    return i === void 0 ? (0, e.Clone)(o) : (0, e.Clone)({ ...i, ...o });
  }
  return To;
}
var Lp;
function l$() {
  return Lp || (Lp = 1, function(e) {
    var r = Kt && Kt.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Kt && Kt.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ Sb(), e), t(/* @__PURE__ */ Pr(), e);
  }(Kt)), Kt;
}
var vt = {}, sc = {}, Vp;
function p$() {
  if (Vp) return sc;
  Vp = 1, Object.defineProperty(sc, "__esModule", { value: !0 }), sc.Increment = e;
  function e(r) {
    return (parseInt(r) + 1).toString();
  }
  return sc;
}
var Gp;
function y$() {
  return Gp || (Gp = 1, function(e) {
    var r = vt && vt.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = vt && vt.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ p$(), e);
  }(vt)), vt;
}
var Bt = {}, ac = {}, Hp;
function m$() {
  if (Hp) return ac;
  Hp = 1, Object.defineProperty(ac, "__esModule", { value: !0 }), ac.Awaited = p;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ Fn(), t = /* @__PURE__ */ Mr(), o = /* @__PURE__ */ Le(), i = /* @__PURE__ */ pn(), n = /* @__PURE__ */ we();
  function u($, w) {
    return (0, r.Computed)("Awaited", [(0, r.Computed)($, w)]);
  }
  function c($) {
    return (0, r.Computed)("Awaited", [(0, i.Ref)($)]);
  }
  function f($) {
    return (0, t.Intersect)(a($));
  }
  function s($) {
    return (0, o.Union)(a($));
  }
  function l($) {
    return p($);
  }
  function a($) {
    return $.map((w) => p(w));
  }
  function p($, w) {
    return (0, e.CreateType)((0, n.IsComputed)($) ? u($.target, $.parameters) : (0, n.IsIntersect)($) ? f($.allOf) : (0, n.IsUnion)($) ? s($.anyOf) : (0, n.IsPromise)($) ? l($.item) : (0, n.IsRef)($) ? c($.$ref) : $, w);
  }
  return ac;
}
var zp;
function Ss() {
  return zp || (zp = 1, function(e) {
    var r = Bt && Bt.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Bt && Bt.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ m$(), e);
  }(Bt)), Bt;
}
var Dt = {}, fc = {}, Wp;
function _$() {
  if (Wp) return fc;
  Wp = 1, Object.defineProperty(fc, "__esModule", { value: !0 }), fc.Composite = l;
  const e = /* @__PURE__ */ Mr(), r = /* @__PURE__ */ zr(), t = /* @__PURE__ */ Kr(), o = /* @__PURE__ */ jr(), i = /* @__PURE__ */ Ms(), n = /* @__PURE__ */ we();
  function u(a) {
    const p = [];
    for (const $ of a)
      p.push(...(0, t.KeyOfPropertyKeys)($));
    return (0, i.SetDistinct)(p);
  }
  function c(a) {
    return a.filter((p) => !(0, n.IsNever)(p));
  }
  function f(a, p) {
    const $ = [];
    for (const w of a)
      $.push(...(0, r.IndexFromPropertyKeys)(w, [p]));
    return c($);
  }
  function s(a, p) {
    const $ = {};
    for (const w of p)
      $[w] = (0, e.IntersectEvaluated)(f(a, w));
    return $;
  }
  function l(a, p) {
    const $ = u(a), w = s(a, $);
    return (0, o.Object)(w, p);
  }
  return fc;
}
var Yp;
function yf() {
  return Yp || (Yp = 1, function(e) {
    var r = Dt && Dt.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Dt && Dt.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ _$(), e);
  }(Dt)), Dt;
}
var Lt = {}, dc = {}, Vt = {}, lc = {}, Jp;
function b$() {
  if (Jp) return lc;
  Jp = 1, Object.defineProperty(lc, "__esModule", { value: !0 }), lc.Date = t;
  const e = /* @__PURE__ */ ue(), r = /* @__PURE__ */ le();
  function t(o) {
    return (0, r.CreateType)({ [e.Kind]: "Date", type: "Date" }, o);
  }
  return lc;
}
var Zp;
function Es() {
  return Zp || (Zp = 1, function(e) {
    var r = Vt && Vt.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Vt && Vt.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ b$(), e);
  }(Vt)), Vt;
}
var Gt = {}, pc = {}, Qp;
function I$() {
  if (Qp) return pc;
  Qp = 1, Object.defineProperty(pc, "__esModule", { value: !0 }), pc.Null = t;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ ue();
  function t(o) {
    return (0, e.CreateType)({ [r.Kind]: "Null", type: "null" }, o);
  }
  return pc;
}
var Xp;
function As() {
  return Xp || (Xp = 1, function(e) {
    var r = Gt && Gt.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Gt && Gt.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ I$(), e);
  }(Gt)), Gt;
}
var Ht = {}, yc = {}, kp;
function O$() {
  if (kp) return yc;
  kp = 1, Object.defineProperty(yc, "__esModule", { value: !0 }), yc.Symbol = t;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ ue();
  function t(o) {
    return (0, e.CreateType)({ [r.Kind]: "Symbol", type: "symbol" }, o);
  }
  return yc;
}
var ey;
function Cs() {
  return ey || (ey = 1, function(e) {
    var r = Ht && Ht.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Ht && Ht.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ O$(), e);
  }(Ht)), Ht;
}
var zt = {}, mc = {}, ry;
function g$() {
  if (ry) return mc;
  ry = 1, Object.defineProperty(mc, "__esModule", { value: !0 }), mc.Undefined = t;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ ue();
  function t(o) {
    return (0, e.CreateType)({ [r.Kind]: "Undefined", type: "undefined" }, o);
  }
  return mc;
}
var ny;
function Us() {
  return ny || (ny = 1, function(e) {
    var r = zt && zt.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = zt && zt.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ g$(), e);
  }(zt)), zt;
}
var Wt = {}, _c = {}, ty;
function P$() {
  if (ty) return _c;
  ty = 1, Object.defineProperty(_c, "__esModule", { value: !0 }), _c.Uint8Array = t;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ ue();
  function t(o) {
    return (0, e.CreateType)({ [r.Kind]: "Uint8Array", type: "Uint8Array" }, o);
  }
  return _c;
}
var iy;
function qs() {
  return iy || (iy = 1, function(e) {
    var r = Wt && Wt.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Wt && Wt.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ P$(), e);
  }(Wt)), Wt;
}
var oy;
function j$() {
  if (oy) return dc;
  oy = 1, Object.defineProperty(dc, "__esModule", { value: !0 }), dc.Const = L;
  const e = /* @__PURE__ */ nu(), r = /* @__PURE__ */ Xo(), t = /* @__PURE__ */ Es(), o = /* @__PURE__ */ qi(), i = /* @__PURE__ */ ar(), n = /* @__PURE__ */ As(), u = /* @__PURE__ */ jr(), c = /* @__PURE__ */ Cs(), f = /* @__PURE__ */ xn(), s = /* @__PURE__ */ uo(), l = /* @__PURE__ */ Us(), a = /* @__PURE__ */ qs(), p = /* @__PURE__ */ co(), $ = /* @__PURE__ */ $n(), w = /* @__PURE__ */ gr();
  function R(F) {
    return F.map((I) => A(I, !1));
  }
  function v(F) {
    const I = {};
    for (const U of globalThis.Object.getOwnPropertyNames(F))
      I[U] = (0, s.Readonly)(A(F[U], !1));
    return I;
  }
  function C(F, I) {
    return I === !0 ? F : (0, s.Readonly)(F);
  }
  function A(F, I) {
    return (0, w.IsAsyncIterator)(F) || (0, w.IsIterator)(F) ? C((0, e.Any)(), I) : (0, w.IsArray)(F) ? (0, s.Readonly)((0, f.Tuple)(R(F))) : (0, w.IsUint8Array)(F) ? (0, a.Uint8Array)() : (0, w.IsDate)(F) ? (0, t.Date)() : (0, w.IsObject)(F) ? C((0, u.Object)(v(F)), I) : (0, w.IsFunction)(F) ? C((0, o.Function)([], (0, p.Unknown)()), I) : (0, w.IsUndefined)(F) ? (0, l.Undefined)() : (0, w.IsNull)(F) ? (0, n.Null)() : (0, w.IsSymbol)(F) ? (0, c.Symbol)() : (0, w.IsBigInt)(F) ? (0, r.BigInt)() : (0, w.IsNumber)(F) || (0, w.IsBoolean)(F) || (0, w.IsString)(F) ? (0, i.Literal)(F) : (0, u.Object)({});
  }
  function L(F, I) {
    return (0, $.CreateType)(A(F, !0), I);
  }
  return dc;
}
var uy;
function mf() {
  return uy || (uy = 1, function(e) {
    var r = Lt && Lt.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Lt && Lt.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ j$(), e);
  }(Lt)), Lt;
}
var Yt = {}, bc = {}, cy;
function T$() {
  if (cy) return bc;
  cy = 1, Object.defineProperty(bc, "__esModule", { value: !0 }), bc.ConstructorParameters = r;
  const e = /* @__PURE__ */ xn();
  function r(t, o) {
    return (0, e.Tuple)(t.parameters, o);
  }
  return bc;
}
var sy;
function _f() {
  return sy || (sy = 1, function(e) {
    var r = Yt && Yt.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Yt && Yt.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ T$(), e);
  }(Yt)), Yt;
}
var Jt = {}, Ic = {}, ay;
function $$() {
  if (ay) return Ic;
  ay = 1, Object.defineProperty(Ic, "__esModule", { value: !0 }), Ic.Enum = i;
  const e = /* @__PURE__ */ ar(), r = /* @__PURE__ */ ue(), t = /* @__PURE__ */ Le(), o = /* @__PURE__ */ gr();
  function i(n, u) {
    if ((0, o.IsUndefined)(n))
      throw new Error("Enum undefined or empty");
    const c = globalThis.Object.getOwnPropertyNames(n).filter((l) => isNaN(l)).map((l) => n[l]), s = [...new Set(c)].map((l) => (0, e.Literal)(l));
    return (0, t.Union)(s, { ...u, [r.Hint]: "Enum" });
  }
  return Ic;
}
var fy;
function bf() {
  return fy || (fy = 1, function(e) {
    var r = Jt && Jt.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Jt && Jt.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ $$(), e);
  }(Jt)), Jt;
}
var Zt = {}, Oc = {}, gc = {}, Pc = {}, dy;
function Eb() {
  if (dy) return Pc;
  dy = 1, Object.defineProperty(Pc, "__esModule", { value: !0 }), Pc.ExcludeFromTemplateLiteral = t;
  const e = /* @__PURE__ */ If(), r = /* @__PURE__ */ Hr();
  function t(o, i) {
    return (0, e.Exclude)((0, r.TemplateLiteralToUnion)(o), i);
  }
  return Pc;
}
var ly;
function If() {
  if (ly) return gc;
  ly = 1, Object.defineProperty(gc, "__esModule", { value: !0 }), gc.Exclude = f;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ Le(), t = /* @__PURE__ */ cr(), o = /* @__PURE__ */ so(), i = /* @__PURE__ */ Ab(), n = /* @__PURE__ */ Eb(), u = /* @__PURE__ */ we();
  function c(s, l) {
    const a = s.filter((p) => (0, o.ExtendsCheck)(p, l) === o.ExtendsResult.False);
    return a.length === 1 ? a[0] : (0, r.Union)(a);
  }
  function f(s, l, a = {}) {
    return (0, u.IsTemplateLiteral)(s) ? (0, e.CreateType)((0, n.ExcludeFromTemplateLiteral)(s, l), a) : (0, u.IsMappedResult)(s) ? (0, e.CreateType)((0, i.ExcludeFromMappedResult)(s, l), a) : (0, e.CreateType)((0, u.IsUnion)(s) ? c(s.anyOf, l) : (0, o.ExtendsCheck)(s, l) !== o.ExtendsResult.False ? (0, t.Never)() : s, a);
  }
  return gc;
}
var py;
function Ab() {
  if (py) return Oc;
  py = 1, Object.defineProperty(Oc, "__esModule", { value: !0 }), Oc.ExcludeFromMappedResult = i;
  const e = /* @__PURE__ */ Ze(), r = /* @__PURE__ */ If();
  function t(n, u) {
    const c = {};
    for (const f of globalThis.Object.getOwnPropertyNames(n))
      c[f] = (0, r.Exclude)(n[f], u);
    return c;
  }
  function o(n, u) {
    return t(n.properties, u);
  }
  function i(n, u) {
    const c = o(n, u);
    return (0, e.MappedResult)(c);
  }
  return Oc;
}
var yy;
function Of() {
  return yy || (yy = 1, function(e) {
    var r = Zt && Zt.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Zt && Zt.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ Ab(), e), t(/* @__PURE__ */ Eb(), e), t(/* @__PURE__ */ If(), e);
  }(Zt)), Zt;
}
var Qt = {}, jc = {}, Tc = {}, $c = {}, my;
function Cb() {
  if (my) return $c;
  my = 1, Object.defineProperty($c, "__esModule", { value: !0 }), $c.ExtractFromTemplateLiteral = t;
  const e = /* @__PURE__ */ gf(), r = /* @__PURE__ */ Hr();
  function t(o, i) {
    return (0, e.Extract)((0, r.TemplateLiteralToUnion)(o), i);
  }
  return $c;
}
var _y;
function gf() {
  if (_y) return Tc;
  _y = 1, Object.defineProperty(Tc, "__esModule", { value: !0 }), Tc.Extract = f;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ Le(), t = /* @__PURE__ */ cr(), o = /* @__PURE__ */ so(), i = /* @__PURE__ */ Ub(), n = /* @__PURE__ */ Cb(), u = /* @__PURE__ */ we();
  function c(s, l) {
    const a = s.filter((p) => (0, o.ExtendsCheck)(p, l) !== o.ExtendsResult.False);
    return a.length === 1 ? a[0] : (0, r.Union)(a);
  }
  function f(s, l, a) {
    return (0, u.IsTemplateLiteral)(s) ? (0, e.CreateType)((0, n.ExtractFromTemplateLiteral)(s, l), a) : (0, u.IsMappedResult)(s) ? (0, e.CreateType)((0, i.ExtractFromMappedResult)(s, l), a) : (0, e.CreateType)((0, u.IsUnion)(s) ? c(s.anyOf, l) : (0, o.ExtendsCheck)(s, l) !== o.ExtendsResult.False ? s : (0, t.Never)(), a);
  }
  return Tc;
}
var by;
function Ub() {
  if (by) return jc;
  by = 1, Object.defineProperty(jc, "__esModule", { value: !0 }), jc.ExtractFromMappedResult = i;
  const e = /* @__PURE__ */ Ze(), r = /* @__PURE__ */ gf();
  function t(n, u) {
    const c = {};
    for (const f of globalThis.Object.getOwnPropertyNames(n))
      c[f] = (0, r.Extract)(n[f], u);
    return c;
  }
  function o(n, u) {
    return t(n.properties, u);
  }
  function i(n, u) {
    const c = o(n, u);
    return (0, e.MappedResult)(c);
  }
  return jc;
}
var Iy;
function Pf() {
  return Iy || (Iy = 1, function(e) {
    var r = Qt && Qt.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Qt && Qt.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ Ub(), e), t(/* @__PURE__ */ Cb(), e), t(/* @__PURE__ */ gf(), e);
  }(Qt)), Qt;
}
var Xt = {}, Fc = {}, Oy;
function F$() {
  if (Oy) return Fc;
  Oy = 1, Object.defineProperty(Fc, "__esModule", { value: !0 }), Fc.InstanceType = r;
  const e = /* @__PURE__ */ le();
  function r(t, o) {
    return (0, e.CreateType)(t.returns, o);
  }
  return Fc;
}
var gy;
function jf() {
  return gy || (gy = 1, function(e) {
    var r = Xt && Xt.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Xt && Xt.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ F$(), e);
  }(Xt)), Xt;
}
var kt = {}, wc = {}, Py;
function w$() {
  if (Py) return wc;
  Py = 1, Object.defineProperty(wc, "__esModule", { value: !0 }), wc.Integer = t;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ ue();
  function t(o) {
    return (0, e.CreateType)({ [r.Kind]: "Integer", type: "integer" }, o);
  }
  return wc;
}
var jy;
function Tf() {
  return jy || (jy = 1, function(e) {
    var r = kt && kt.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = kt && kt.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ w$(), e);
  }(kt)), kt;
}
var ei = {}, xc = {}, Rc = {}, Mc = {}, Ty;
function qb() {
  if (Ty) return Mc;
  Ty = 1, Object.defineProperty(Mc, "__esModule", { value: !0 }), Mc.IntrinsicFromMappedKey = c;
  const e = /* @__PURE__ */ Ze(), r = /* @__PURE__ */ ao(), t = /* @__PURE__ */ ar(), o = /* @__PURE__ */ Pr();
  function i(f, s, l) {
    return {
      [f]: (0, r.Intrinsic)((0, t.Literal)(f), s, (0, o.Clone)(l))
    };
  }
  function n(f, s, l) {
    return f.reduce((p, $) => ({ ...p, ...i($, s, l) }), {});
  }
  function u(f, s, l) {
    return n(f.keys, s, l);
  }
  function c(f, s, l) {
    const a = u(f, s, l);
    return (0, e.MappedResult)(a);
  }
  return Mc;
}
var $y;
function ao() {
  if ($y) return Rc;
  $y = 1, Object.defineProperty(Rc, "__esModule", { value: !0 }), Rc.Intrinsic = $;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ Hr(), t = /* @__PURE__ */ qb(), o = /* @__PURE__ */ ar(), i = /* @__PURE__ */ Le(), n = /* @__PURE__ */ we();
  function u(w) {
    const [R, v] = [w.slice(0, 1), w.slice(1)];
    return [R.toLowerCase(), v].join("");
  }
  function c(w) {
    const [R, v] = [w.slice(0, 1), w.slice(1)];
    return [R.toUpperCase(), v].join("");
  }
  function f(w) {
    return w.toUpperCase();
  }
  function s(w) {
    return w.toLowerCase();
  }
  function l(w, R, v) {
    const C = (0, r.TemplateLiteralParseExact)(w.pattern);
    if (!(0, r.IsTemplateLiteralExpressionFinite)(C))
      return { ...w, pattern: a(w.pattern, R) };
    const F = [...(0, r.TemplateLiteralExpressionGenerate)(C)].map((_) => (0, o.Literal)(_)), I = p(F, R), U = (0, i.Union)(I);
    return (0, r.TemplateLiteral)([U], v);
  }
  function a(w, R) {
    return typeof w == "string" ? R === "Uncapitalize" ? u(w) : R === "Capitalize" ? c(w) : R === "Uppercase" ? f(w) : R === "Lowercase" ? s(w) : w : w.toString();
  }
  function p(w, R) {
    return w.map((v) => $(v, R));
  }
  function $(w, R, v = {}) {
    return (
      // Intrinsic-Mapped-Inference
      (0, n.IsMappedKey)(w) ? (0, t.IntrinsicFromMappedKey)(w, R, v) : (
        // Standard-Inference
        (0, n.IsTemplateLiteral)(w) ? l(w, R, v) : (0, n.IsUnion)(w) ? (0, i.Union)(p(w.anyOf, R), v) : (0, n.IsLiteral)(w) ? (0, o.Literal)(a(w.const, R), v) : (
          // Default Type
          (0, e.CreateType)(w, v)
        )
      )
    );
  }
  return Rc;
}
var Fy;
function x$() {
  if (Fy) return xc;
  Fy = 1, Object.defineProperty(xc, "__esModule", { value: !0 }), xc.Capitalize = r;
  const e = /* @__PURE__ */ ao();
  function r(t, o = {}) {
    return (0, e.Intrinsic)(t, "Capitalize", o);
  }
  return xc;
}
var Sc = {}, wy;
function R$() {
  if (wy) return Sc;
  wy = 1, Object.defineProperty(Sc, "__esModule", { value: !0 }), Sc.Lowercase = r;
  const e = /* @__PURE__ */ ao();
  function r(t, o = {}) {
    return (0, e.Intrinsic)(t, "Lowercase", o);
  }
  return Sc;
}
var Ec = {}, xy;
function M$() {
  if (xy) return Ec;
  xy = 1, Object.defineProperty(Ec, "__esModule", { value: !0 }), Ec.Uncapitalize = r;
  const e = /* @__PURE__ */ ao();
  function r(t, o = {}) {
    return (0, e.Intrinsic)(t, "Uncapitalize", o);
  }
  return Ec;
}
var Ac = {}, Ry;
function S$() {
  if (Ry) return Ac;
  Ry = 1, Object.defineProperty(Ac, "__esModule", { value: !0 }), Ac.Uppercase = r;
  const e = /* @__PURE__ */ ao();
  function r(t, o = {}) {
    return (0, e.Intrinsic)(t, "Uppercase", o);
  }
  return Ac;
}
var My;
function $f() {
  return My || (My = 1, function(e) {
    var r = ei && ei.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = ei && ei.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ x$(), e), t(/* @__PURE__ */ qb(), e), t(/* @__PURE__ */ ao(), e), t(/* @__PURE__ */ R$(), e), t(/* @__PURE__ */ M$(), e), t(/* @__PURE__ */ S$(), e);
  }(ei)), ei;
}
var ri = {}, Vi = {}, Gi = {}, ni = {}, Cc = {}, Uc = {}, qc = {}, Sy;
function Nb() {
  if (Sy) return qc;
  Sy = 1, Object.defineProperty(qc, "__esModule", { value: !0 }), qc.OmitFromMappedResult = n;
  const e = /* @__PURE__ */ Ze(), r = /* @__PURE__ */ Ff(), t = /* @__PURE__ */ Pr();
  function o(u, c, f) {
    const s = {};
    for (const l of globalThis.Object.getOwnPropertyNames(u))
      s[l] = (0, r.Omit)(u[l], c, (0, t.Clone)(f));
    return s;
  }
  function i(u, c, f) {
    return o(u.properties, c, f);
  }
  function n(u, c, f) {
    const s = i(u, c, f);
    return (0, e.MappedResult)(s);
  }
  return qc;
}
var Ey;
function Ff() {
  if (Ey) return Uc;
  Ey = 1, Object.defineProperty(Uc, "__esModule", { value: !0 }), Uc.Omit = F;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ ef(), t = /* @__PURE__ */ Fs(), o = /* @__PURE__ */ Fn(), i = /* @__PURE__ */ ar(), n = /* @__PURE__ */ zr(), u = /* @__PURE__ */ Mr(), c = /* @__PURE__ */ Le(), f = /* @__PURE__ */ jr(), s = /* @__PURE__ */ hb(), l = /* @__PURE__ */ Nb(), a = /* @__PURE__ */ we(), p = /* @__PURE__ */ gr();
  function $(I, U) {
    return I.map((_) => L(_, U));
  }
  function w(I, U) {
    return I.map((_) => L(_, U));
  }
  function R(I, U) {
    const { [U]: _, ...P } = I;
    return P;
  }
  function v(I, U) {
    return U.reduce((_, P) => R(_, P), I);
  }
  function C(I, U) {
    const _ = (0, r.Discard)(I, [t.TransformKind, "$id", "required", "properties"]), P = v(I.properties, U);
    return (0, f.Object)(P, _);
  }
  function A(I) {
    const U = I.reduce((_, P) => (0, a.IsLiteralValue)(P) ? [..._, (0, i.Literal)(P)] : _, []);
    return (0, c.Union)(U);
  }
  function L(I, U) {
    return (0, a.IsIntersect)(I) ? (0, u.Intersect)($(I.allOf, U)) : (0, a.IsUnion)(I) ? (0, c.Union)(w(I.anyOf, U)) : (0, a.IsObject)(I) ? C(I, U) : (0, f.Object)({});
  }
  function F(I, U, _) {
    const P = (0, p.IsArray)(U) ? A(U) : U, T = (0, a.IsSchema)(U) ? (0, n.IndexPropertyKeys)(U) : U, y = (0, a.IsRef)(I), x = (0, a.IsRef)(U);
    return (0, a.IsMappedResult)(I) ? (0, l.OmitFromMappedResult)(I, T, _) : (0, a.IsMappedKey)(U) ? (0, s.OmitFromMappedKey)(I, U, _) : y && x ? (0, o.Computed)("Omit", [I, P], _) : !y && x ? (0, o.Computed)("Omit", [I, P], _) : y && !x ? (0, o.Computed)("Omit", [I, P], _) : (0, e.CreateType)({ ...L(I, T), ..._ });
  }
  return Uc;
}
var Ay;
function hb() {
  if (Ay) return Cc;
  Ay = 1, Object.defineProperty(Cc, "__esModule", { value: !0 }), Cc.OmitFromMappedKey = u;
  const e = /* @__PURE__ */ Ze(), r = /* @__PURE__ */ Ff(), t = /* @__PURE__ */ Pr();
  function o(c, f, s) {
    return { [f]: (0, r.Omit)(c, [f], (0, t.Clone)(s)) };
  }
  function i(c, f, s) {
    return f.reduce((l, a) => ({ ...l, ...o(c, a, s) }), {});
  }
  function n(c, f, s) {
    return i(c, f.keys, s);
  }
  function u(c, f, s) {
    const l = n(c, f, s);
    return (0, e.MappedResult)(l);
  }
  return Cc;
}
var Cy;
function Ns() {
  return Cy || (Cy = 1, function(e) {
    var r = ni && ni.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = ni && ni.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ hb(), e), t(/* @__PURE__ */ Nb(), e), t(/* @__PURE__ */ Ff(), e);
  }(ni)), ni;
}
var ti = {}, Nc = {}, hc = {}, Kc = {}, Uy;
function Kb() {
  if (Uy) return Kc;
  Uy = 1, Object.defineProperty(Kc, "__esModule", { value: !0 }), Kc.PickFromMappedResult = n;
  const e = /* @__PURE__ */ Ze(), r = /* @__PURE__ */ wf(), t = /* @__PURE__ */ Pr();
  function o(u, c, f) {
    const s = {};
    for (const l of globalThis.Object.getOwnPropertyNames(u))
      s[l] = (0, r.Pick)(u[l], c, (0, t.Clone)(f));
    return s;
  }
  function i(u, c, f) {
    return o(u.properties, c, f);
  }
  function n(u, c, f) {
    const s = i(u, c, f);
    return (0, e.MappedResult)(s);
  }
  return Kc;
}
var qy;
function wf() {
  if (qy) return hc;
  qy = 1, Object.defineProperty(hc, "__esModule", { value: !0 }), hc.Pick = L;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ ef(), t = /* @__PURE__ */ Fn(), o = /* @__PURE__ */ Mr(), i = /* @__PURE__ */ ar(), n = /* @__PURE__ */ jr(), u = /* @__PURE__ */ Le(), c = /* @__PURE__ */ zr(), f = /* @__PURE__ */ Fs(), s = /* @__PURE__ */ we(), l = /* @__PURE__ */ gr(), a = /* @__PURE__ */ vb(), p = /* @__PURE__ */ Kb();
  function $(F, I) {
    return F.map((U) => A(U, I));
  }
  function w(F, I) {
    return F.map((U) => A(U, I));
  }
  function R(F, I) {
    const U = {};
    for (const _ of I)
      _ in F && (U[_] = F[_]);
    return U;
  }
  function v(F, I) {
    const U = (0, r.Discard)(F, [f.TransformKind, "$id", "required", "properties"]), _ = R(F.properties, I);
    return (0, n.Object)(_, U);
  }
  function C(F) {
    const I = F.reduce((U, _) => (0, s.IsLiteralValue)(_) ? [...U, (0, i.Literal)(_)] : U, []);
    return (0, u.Union)(I);
  }
  function A(F, I) {
    return (0, s.IsIntersect)(F) ? (0, o.Intersect)($(F.allOf, I)) : (0, s.IsUnion)(F) ? (0, u.Union)(w(F.anyOf, I)) : (0, s.IsObject)(F) ? v(F, I) : (0, n.Object)({});
  }
  function L(F, I, U) {
    const _ = (0, l.IsArray)(I) ? C(I) : I, P = (0, s.IsSchema)(I) ? (0, c.IndexPropertyKeys)(I) : I, T = (0, s.IsRef)(F), y = (0, s.IsRef)(I);
    return (0, s.IsMappedResult)(F) ? (0, p.PickFromMappedResult)(F, P, U) : (0, s.IsMappedKey)(I) ? (0, a.PickFromMappedKey)(F, I, U) : T && y ? (0, t.Computed)("Pick", [F, _], U) : !T && y ? (0, t.Computed)("Pick", [F, _], U) : T && !y ? (0, t.Computed)("Pick", [F, _], U) : (0, e.CreateType)({ ...A(F, P), ...U });
  }
  return hc;
}
var Ny;
function vb() {
  if (Ny) return Nc;
  Ny = 1, Object.defineProperty(Nc, "__esModule", { value: !0 }), Nc.PickFromMappedKey = u;
  const e = /* @__PURE__ */ Ze(), r = /* @__PURE__ */ wf(), t = /* @__PURE__ */ Pr();
  function o(c, f, s) {
    return {
      [f]: (0, r.Pick)(c, [f], (0, t.Clone)(s))
    };
  }
  function i(c, f, s) {
    return f.reduce((l, a) => ({ ...l, ...o(c, a, s) }), {});
  }
  function n(c, f, s) {
    return i(c, f.keys, s);
  }
  function u(c, f, s) {
    const l = n(c, f, s);
    return (0, e.MappedResult)(l);
  }
  return Nc;
}
var hy;
function hs() {
  return hy || (hy = 1, function(e) {
    var r = ti && ti.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = ti && ti.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ vb(), e), t(/* @__PURE__ */ Kb(), e), t(/* @__PURE__ */ wf(), e);
  }(ti)), ti;
}
var ii = {}, vc = {}, Bc = {}, Ky;
function Bb() {
  if (Ky) return Bc;
  Ky = 1, Object.defineProperty(Bc, "__esModule", { value: !0 }), Bc.Partial = C;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ Fn(), t = /* @__PURE__ */ wn(), o = /* @__PURE__ */ jr(), i = /* @__PURE__ */ Mr(), n = /* @__PURE__ */ Le(), u = /* @__PURE__ */ pn(), c = /* @__PURE__ */ Tn(), f = /* @__PURE__ */ ue(), s = /* @__PURE__ */ Db(), l = /* @__PURE__ */ we();
  function a(A, L) {
    return (0, r.Computed)("Partial", [(0, r.Computed)(A, L)]);
  }
  function p(A) {
    return (0, r.Computed)("Partial", [(0, u.Ref)(A)]);
  }
  function $(A) {
    const L = {};
    for (const F of globalThis.Object.getOwnPropertyNames(A))
      L[F] = (0, t.Optional)(A[F]);
    return L;
  }
  function w(A) {
    const L = (0, c.Discard)(A, [f.TransformKind, "$id", "required", "properties"]), F = $(A.properties);
    return (0, o.Object)(F, L);
  }
  function R(A) {
    return A.map((L) => v(L));
  }
  function v(A) {
    return (0, l.IsComputed)(A) ? a(A.target, A.parameters) : (0, l.IsRef)(A) ? p(A.$ref) : (0, l.IsIntersect)(A) ? (0, i.Intersect)(R(A.allOf)) : (0, l.IsUnion)(A) ? (0, n.Union)(R(A.anyOf)) : (0, l.IsObject)(A) ? w(A) : (0, o.Object)({});
  }
  function C(A, L) {
    return (0, l.IsMappedResult)(A) ? (0, s.PartialFromMappedResult)(A, L) : (0, e.CreateType)({ ...v(A), ...L });
  }
  return Bc;
}
var vy;
function Db() {
  if (vy) return vc;
  vy = 1, Object.defineProperty(vc, "__esModule", { value: !0 }), vc.PartialFromMappedResult = n;
  const e = /* @__PURE__ */ Ze(), r = /* @__PURE__ */ Bb(), t = /* @__PURE__ */ Pr();
  function o(u, c) {
    const f = {};
    for (const s of globalThis.Object.getOwnPropertyNames(u))
      f[s] = (0, r.Partial)(u[s], (0, t.Clone)(c));
    return f;
  }
  function i(u, c) {
    return o(u.properties, c);
  }
  function n(u, c) {
    const f = i(u, c);
    return (0, e.MappedResult)(f);
  }
  return vc;
}
var By;
function Ks() {
  return By || (By = 1, function(e) {
    var r = ii && ii.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = ii && ii.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ Db(), e), t(/* @__PURE__ */ Bb(), e);
  }(ii)), ii;
}
var oi = {}, Dc = {}, Dy;
function E$() {
  if (Dy) return Dc;
  Dy = 1, Object.defineProperty(Dc, "__esModule", { value: !0 }), Dc.Record = _;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ ue(), t = /* @__PURE__ */ Fn(), o = /* @__PURE__ */ cr(), i = /* @__PURE__ */ jr(), n = /* @__PURE__ */ pn(), u = /* @__PURE__ */ Le(), c = /* @__PURE__ */ Hr(), f = /* @__PURE__ */ ko(), s = /* @__PURE__ */ zr(), l = /* @__PURE__ */ gr(), a = /* @__PURE__ */ we();
  function p(P, T, y) {
    return (0, e.CreateType)({ [r.Kind]: "Record", type: "object", patternProperties: { [P]: T } }, y);
  }
  function $(P, T, y) {
    const x = {};
    for (const M of P)
      x[M] = T;
    return (0, i.Object)(x, { ...y, [r.Hint]: "Record" });
  }
  function w(P, T, y) {
    return (0, c.IsTemplateLiteralFinite)(P) ? $((0, s.IndexPropertyKeys)(P), T, y) : p(P.pattern, T, y);
  }
  function R(P, T, y) {
    return $((0, s.IndexPropertyKeys)((0, u.Union)(P)), T, y);
  }
  function v(P, T, y) {
    return $([P.toString()], T, y);
  }
  function C(P, T, y) {
    return p(P.source, T, y);
  }
  function A(P, T, y) {
    const x = (0, l.IsUndefined)(P.pattern) ? f.PatternStringExact : P.pattern;
    return p(x, T, y);
  }
  function L(P, T, y) {
    return p(f.PatternStringExact, T, y);
  }
  function F(P, T, y) {
    return p(f.PatternNeverExact, T, y);
  }
  function I(P, T, y) {
    return p(f.PatternNumberExact, T, y);
  }
  function U(P, T, y) {
    return p(f.PatternNumberExact, T, y);
  }
  function _(P, T, y = {}) {
    return (0, a.IsComputed)(T) ? (0, t.Computed)("Record", [P, (0, t.Computed)(T.target, T.parameters)], y) : (0, a.IsComputed)(P) ? (0, t.Computed)("Record", [(0, t.Computed)(T.target, T.parameters), T], y) : (0, a.IsRef)(P) ? (0, t.Computed)("Record", [(0, n.Ref)(P.$ref), T]) : (0, a.IsUnion)(P) ? R(P.anyOf, T, y) : (0, a.IsTemplateLiteral)(P) ? w(P, T, y) : (0, a.IsLiteral)(P) ? v(P.const, T, y) : (0, a.IsInteger)(P) ? I(P, T, y) : (0, a.IsNumber)(P) ? U(P, T, y) : (0, a.IsRegExp)(P) ? C(P, T, y) : (0, a.IsString)(P) ? A(P, T, y) : (0, a.IsAny)(P) ? L(P, T, y) : (0, a.IsNever)(P) ? F(P, T, y) : (0, o.Never)(y);
  }
  return Dc;
}
var Ly;
function vs() {
  return Ly || (Ly = 1, function(e) {
    var r = oi && oi.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = oi && oi.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ E$(), e);
  }(oi)), oi;
}
var ui = {}, Lc = {}, Vc = {}, Vy;
function Lb() {
  if (Vy) return Vc;
  Vy = 1, Object.defineProperty(Vc, "__esModule", { value: !0 }), Vc.Required = v;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ Fn(), t = /* @__PURE__ */ jr(), o = /* @__PURE__ */ Mr(), i = /* @__PURE__ */ Le(), n = /* @__PURE__ */ pn(), u = /* @__PURE__ */ ue(), c = /* @__PURE__ */ Tn(), f = /* @__PURE__ */ Vb(), s = /* @__PURE__ */ we();
  function l(C, A) {
    return (0, r.Computed)("Required", [(0, r.Computed)(C, A)]);
  }
  function a(C) {
    return (0, r.Computed)("Required", [(0, n.Ref)(C)]);
  }
  function p(C) {
    const A = {};
    for (const L of globalThis.Object.getOwnPropertyNames(C))
      A[L] = (0, c.Discard)(C[L], [u.OptionalKind]);
    return A;
  }
  function $(C) {
    const A = (0, c.Discard)(C, [u.TransformKind, "$id", "required", "properties"]), L = p(C.properties);
    return (0, t.Object)(L, A);
  }
  function w(C) {
    return C.map((A) => R(A));
  }
  function R(C) {
    return (0, s.IsComputed)(C) ? l(C.target, C.parameters) : (0, s.IsRef)(C) ? a(C.$ref) : (0, s.IsIntersect)(C) ? (0, o.Intersect)(w(C.allOf)) : (0, s.IsUnion)(C) ? (0, i.Union)(w(C.anyOf)) : (0, s.IsObject)(C) ? $(C) : (0, t.Object)({});
  }
  function v(C, A) {
    return (0, s.IsMappedResult)(C) ? (0, f.RequiredFromMappedResult)(C, A) : (0, e.CreateType)({ ...R(C), ...A });
  }
  return Vc;
}
var Gy;
function Vb() {
  if (Gy) return Lc;
  Gy = 1, Object.defineProperty(Lc, "__esModule", { value: !0 }), Lc.RequiredFromMappedResult = i;
  const e = /* @__PURE__ */ Ze(), r = /* @__PURE__ */ Lb();
  function t(n, u) {
    const c = {};
    for (const f of globalThis.Object.getOwnPropertyNames(n))
      c[f] = (0, r.Required)(n[f], u);
    return c;
  }
  function o(n, u) {
    return t(n.properties, u);
  }
  function i(n, u) {
    const c = o(n, u);
    return (0, e.MappedResult)(c);
  }
  return Lc;
}
var Hy;
function Bs() {
  return Hy || (Hy = 1, function(e) {
    var r = ui && ui.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = ui && ui.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ Vb(), e), t(/* @__PURE__ */ Lb(), e);
  }(ui)), ui;
}
var zy;
function A$() {
  if (zy) return Gi;
  zy = 1, Object.defineProperty(Gi, "__esModule", { value: !0 }), Gi.FromType = Q, Gi.ComputeType = me, Gi.ComputeModuleProperties = ge;
  const e = /* @__PURE__ */ $n(), r = /* @__PURE__ */ Tn(), t = /* @__PURE__ */ Jo(), o = /* @__PURE__ */ Ss(), i = /* @__PURE__ */ Zo(), n = /* @__PURE__ */ Qo(), u = /* @__PURE__ */ zr(), c = /* @__PURE__ */ qi(), f = /* @__PURE__ */ Mr(), s = /* @__PURE__ */ eu(), l = /* @__PURE__ */ Kr(), a = /* @__PURE__ */ jr(), p = /* @__PURE__ */ Ns(), $ = /* @__PURE__ */ hs(), w = /* @__PURE__ */ cr(), R = /* @__PURE__ */ Ks(), v = /* @__PURE__ */ vs(), C = /* @__PURE__ */ Bs(), A = /* @__PURE__ */ xn(), L = /* @__PURE__ */ Le(), F = /* @__PURE__ */ ue(), I = /* @__PURE__ */ we();
  function U(Z, W) {
    return W.map((q) => I.IsRef(q) ? _(Z, q.$ref) : Q(Z, q));
  }
  function _(Z, W) {
    return W in Z ? I.IsRef(Z[W]) ? _(Z, Z[W].$ref) : Q(Z, Z[W]) : (0, w.Never)();
  }
  function P(Z) {
    return (0, o.Awaited)(Z[0]);
  }
  function T(Z) {
    return (0, u.Index)(Z[0], Z[1]);
  }
  function y(Z) {
    return (0, l.KeyOf)(Z[0]);
  }
  function x(Z) {
    return (0, R.Partial)(Z[0]);
  }
  function M(Z) {
    return (0, p.Omit)(Z[0], Z[1]);
  }
  function h(Z) {
    return (0, $.Pick)(Z[0], Z[1]);
  }
  function D(Z) {
    return (0, v.Record)(Z[0], Z[1]);
  }
  function z(Z) {
    return (0, C.Required)(Z[0]);
  }
  function X(Z, W, q) {
    const m = U(Z, q);
    return W === "Awaited" ? P(m) : W === "Index" ? T(m) : W === "KeyOf" ? y(m) : W === "Partial" ? x(m) : W === "Omit" ? M(m) : W === "Pick" ? h(m) : W === "Record" ? D(m) : W === "Required" ? z(m) : (0, w.Never)();
  }
  function ee(Z, W) {
    return (0, a.Object)(globalThis.Object.keys(W).reduce((q, m) => ({ ...q, [m]: Q(Z, W[m]) }), {}));
  }
  function G(Z, W, q) {
    return (0, n.Constructor)(J(Z, W), Q(Z, q));
  }
  function Pe(Z, W, q) {
    return (0, c.Function)(J(Z, W), Q(Z, q));
  }
  function Se(Z, W) {
    return (0, A.Tuple)(J(Z, W));
  }
  function Ce(Z, W) {
    return (0, f.Intersect)(J(Z, W));
  }
  function Ae(Z, W) {
    return (0, L.Union)(J(Z, W));
  }
  function Ue(Z, W) {
    return (0, t.Array)(Q(Z, W));
  }
  function je(Z, W) {
    return (0, i.AsyncIterator)(Q(Z, W));
  }
  function he(Z, W) {
    return (0, s.Iterator)(Q(Z, W));
  }
  function J(Z, W) {
    return W.map((q) => Q(Z, q));
  }
  function Q(Z, W) {
    return (
      // Modifier Unwrap - Reapplied via CreateType Options
      I.IsOptional(W) ? (0, e.CreateType)(Q(Z, (0, r.Discard)(W, [F.OptionalKind])), W) : I.IsReadonly(W) ? (0, e.CreateType)(Q(Z, (0, r.Discard)(W, [F.ReadonlyKind])), W) : (
        // Traveral
        I.IsArray(W) ? (0, e.CreateType)(Ue(Z, W.items), W) : I.IsAsyncIterator(W) ? (0, e.CreateType)(je(Z, W.items), W) : I.IsComputed(W) ? (0, e.CreateType)(X(Z, W.target, W.parameters)) : I.IsConstructor(W) ? (0, e.CreateType)(G(Z, W.parameters, W.returns), W) : I.IsFunction(W) ? (0, e.CreateType)(Pe(Z, W.parameters, W.returns), W) : I.IsIntersect(W) ? (0, e.CreateType)(Ce(Z, W.allOf), W) : I.IsIterator(W) ? (0, e.CreateType)(he(Z, W.items), W) : I.IsObject(W) ? (0, e.CreateType)(ee(Z, W.properties), W) : I.IsTuple(W) ? (0, e.CreateType)(Se(Z, W.items || []), W) : I.IsUnion(W) ? (0, e.CreateType)(Ae(Z, W.anyOf), W) : W
      )
    );
  }
  function me(Z, W) {
    return W in Z ? Q(Z, Z[W]) : (0, w.Never)();
  }
  function ge(Z) {
    return globalThis.Object.getOwnPropertyNames(Z).reduce((W, q) => ({ ...W, [q]: me(Z, q) }), {});
  }
  return Gi;
}
var Wy;
function C$() {
  if (Wy) return Vi;
  Wy = 1, Object.defineProperty(Vi, "__esModule", { value: !0 }), Vi.TModule = void 0, Vi.Module = i;
  const e = /* @__PURE__ */ $n(), r = /* @__PURE__ */ ue(), t = /* @__PURE__ */ A$();
  class o {
    constructor(u) {
      const c = (0, t.ComputeModuleProperties)(u), f = this.WithIdentifiers(c);
      this.$defs = f;
    }
    /** `[Json]` Imports a Type by Key. */
    Import(u, c) {
      const f = { ...this.$defs, [u]: (0, e.CreateType)(this.$defs[u], c) };
      return (0, e.CreateType)({ [r.Kind]: "Import", $defs: f, $ref: u });
    }
    // prettier-ignore
    WithIdentifiers(u) {
      return globalThis.Object.getOwnPropertyNames(u).reduce((c, f) => ({ ...c, [f]: { ...u[f], $id: f } }), {});
    }
  }
  Vi.TModule = o;
  function i(n) {
    return new o(n);
  }
  return Vi;
}
var Yy;
function xf() {
  return Yy || (Yy = 1, function(e) {
    var r = ri && ri.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = ri && ri.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ C$(), e);
  }(ri)), ri;
}
var ci = {}, Gc = {}, Jy;
function U$() {
  if (Jy) return Gc;
  Jy = 1, Object.defineProperty(Gc, "__esModule", { value: !0 }), Gc.Not = t;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ ue();
  function t(o, i) {
    return (0, e.CreateType)({ [r.Kind]: "Not", not: o }, i);
  }
  return Gc;
}
var Zy;
function Rf() {
  return Zy || (Zy = 1, function(e) {
    var r = ci && ci.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = ci && ci.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ U$(), e);
  }(ci)), ci;
}
var si = {}, Hc = {}, Qy;
function q$() {
  if (Qy) return Hc;
  Qy = 1, Object.defineProperty(Hc, "__esModule", { value: !0 }), Hc.Parameters = r;
  const e = /* @__PURE__ */ xn();
  function r(t, o) {
    return (0, e.Tuple)(t.parameters, o);
  }
  return Hc;
}
var Xy;
function Mf() {
  return Xy || (Xy = 1, function(e) {
    var r = si && si.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = si && si.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ q$(), e);
  }(si)), si;
}
var ai = {}, zc = {}, ky;
function N$() {
  if (ky) return zc;
  ky = 1, Object.defineProperty(zc, "__esModule", { value: !0 }), zc.ReadonlyOptional = t;
  const e = /* @__PURE__ */ uo(), r = /* @__PURE__ */ wn();
  function t(o) {
    return (0, e.Readonly)((0, r.Optional)(o));
  }
  return zc;
}
var em;
function Sf() {
  return em || (em = 1, function(e) {
    var r = ai && ai.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = ai && ai.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ N$(), e);
  }(ai)), ai;
}
var fi = {}, Wc = {}, rm;
function h$() {
  if (rm) return Wc;
  rm = 1, Object.defineProperty(Wc, "__esModule", { value: !0 }), Wc.Recursive = n;
  const e = /* @__PURE__ */ Sb(), r = /* @__PURE__ */ le(), t = /* @__PURE__ */ gr(), o = /* @__PURE__ */ ue();
  let i = 0;
  function n(u, c = {}) {
    (0, t.IsUndefined)(c.$id) && (c.$id = `T${i++}`);
    const f = (0, e.CloneType)(u({ [o.Kind]: "This", $ref: `${c.$id}` }));
    return f.$id = c.$id, (0, r.CreateType)({ [o.Hint]: "Recursive", ...f }, c);
  }
  return Wc;
}
var nm;
function Ef() {
  return nm || (nm = 1, function(e) {
    var r = fi && fi.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = fi && fi.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ h$(), e);
  }(fi)), fi;
}
var di = {}, Yc = {}, tm;
function K$() {
  if (tm) return Yc;
  tm = 1, Object.defineProperty(Yc, "__esModule", { value: !0 }), Yc.RegExp = o;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ gr(), t = /* @__PURE__ */ ue();
  function o(i, n) {
    const u = (0, r.IsString)(i) ? new globalThis.RegExp(i) : i;
    return (0, e.CreateType)({ [t.Kind]: "RegExp", type: "RegExp", source: u.source, flags: u.flags }, n);
  }
  return Yc;
}
var im;
function Af() {
  return im || (im = 1, function(e) {
    var r = di && di.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = di && di.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ K$(), e);
  }(di)), di;
}
var li = {}, Jc = {}, om;
function v$() {
  if (om) return Jc;
  om = 1, Object.defineProperty(Jc, "__esModule", { value: !0 }), Jc.Rest = t;
  const e = /* @__PURE__ */ we();
  function r(o) {
    return (0, e.IsIntersect)(o) ? o.allOf : (0, e.IsUnion)(o) ? o.anyOf : (0, e.IsTuple)(o) ? o.items ?? [] : [];
  }
  function t(o) {
    return r(o);
  }
  return Jc;
}
var um;
function Cf() {
  return um || (um = 1, function(e) {
    var r = li && li.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = li && li.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ v$(), e);
  }(li)), li;
}
var pi = {}, Zc = {}, cm;
function B$() {
  if (cm) return Zc;
  cm = 1, Object.defineProperty(Zc, "__esModule", { value: !0 }), Zc.ReturnType = r;
  const e = /* @__PURE__ */ le();
  function r(t, o) {
    return (0, e.CreateType)(t.returns, o);
  }
  return Zc;
}
var sm;
function Uf() {
  return sm || (sm = 1, function(e) {
    var r = pi && pi.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = pi && pi.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ B$(), e);
  }(pi)), pi;
}
var yi = {}, Xs = {}, am;
function D$() {
  return am || (am = 1, Object.defineProperty(Xs, "__esModule", { value: !0 })), Xs;
}
var ks = {}, fm;
function L$() {
  return fm || (fm = 1, Object.defineProperty(ks, "__esModule", { value: !0 })), ks;
}
var dm;
function V$() {
  return dm || (dm = 1, function(e) {
    var r = yi && yi.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = yi && yi.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ D$(), e), t(/* @__PURE__ */ L$(), e);
  }(yi)), yi;
}
var mi = {}, ea = {}, lm;
function G$() {
  return lm || (lm = 1, Object.defineProperty(ea, "__esModule", { value: !0 })), ea;
}
var pm;
function H$() {
  return pm || (pm = 1, function(e) {
    var r = mi && mi.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = mi && mi.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ G$(), e);
  }(mi)), mi;
}
var _i = {}, bn = {}, ym;
function z$() {
  if (ym) return bn;
  ym = 1, Object.defineProperty(bn, "__esModule", { value: !0 }), bn.TransformEncodeBuilder = bn.TransformDecodeBuilder = void 0, bn.Transform = i;
  const e = /* @__PURE__ */ ue(), r = /* @__PURE__ */ we();
  class t {
    constructor(u) {
      this.schema = u;
    }
    Decode(u) {
      return new o(this.schema, u);
    }
  }
  bn.TransformDecodeBuilder = t;
  class o {
    constructor(u, c) {
      this.schema = u, this.decode = c;
    }
    EncodeTransform(u, c) {
      const l = { Encode: (a) => c[e.TransformKind].Encode(u(a)), Decode: (a) => this.decode(c[e.TransformKind].Decode(a)) };
      return { ...c, [e.TransformKind]: l };
    }
    EncodeSchema(u, c) {
      const f = { Decode: this.decode, Encode: u };
      return { ...c, [e.TransformKind]: f };
    }
    Encode(u) {
      return (0, r.IsTransform)(this.schema) ? this.EncodeTransform(u, this.schema) : this.EncodeSchema(u, this.schema);
    }
  }
  bn.TransformEncodeBuilder = o;
  function i(n) {
    return new t(n);
  }
  return bn;
}
var mm;
function qf() {
  return mm || (mm = 1, function(e) {
    var r = _i && _i.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = _i && _i.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ z$(), e);
  }(_i)), _i;
}
var bi = {}, Qc = {}, _m;
function W$() {
  if (_m) return Qc;
  _m = 1, Object.defineProperty(Qc, "__esModule", { value: !0 }), Qc.Void = t;
  const e = /* @__PURE__ */ le(), r = /* @__PURE__ */ ue();
  function t(o) {
    return (0, e.CreateType)({ [r.Kind]: "Void", type: "void" }, o);
  }
  return Qc;
}
var bm;
function Nf() {
  return bm || (bm = 1, function(e) {
    var r = bi && bi.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = bi && bi.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ W$(), e);
  }(bi)), bi;
}
var ra = {}, $o = {}, Im;
function Gb() {
  if (Im) return $o;
  Im = 1, Object.defineProperty($o, "__esModule", { value: !0 }), $o.JsonTypeBuilder = void 0;
  const e = /* @__PURE__ */ nu(), r = /* @__PURE__ */ Jo(), t = /* @__PURE__ */ xs(), o = /* @__PURE__ */ yf(), i = /* @__PURE__ */ mf(), n = /* @__PURE__ */ bf(), u = /* @__PURE__ */ Of(), c = /* @__PURE__ */ so(), f = /* @__PURE__ */ Pf(), s = /* @__PURE__ */ zr(), l = /* @__PURE__ */ Tf(), a = /* @__PURE__ */ Mr(), p = /* @__PURE__ */ $f(), $ = /* @__PURE__ */ Kr(), w = /* @__PURE__ */ ar(), R = /* @__PURE__ */ Ze(), v = /* @__PURE__ */ cr(), C = /* @__PURE__ */ Rf(), A = /* @__PURE__ */ As(), L = /* @__PURE__ */ xf(), F = /* @__PURE__ */ io(), I = /* @__PURE__ */ jr(), U = /* @__PURE__ */ Ns(), _ = /* @__PURE__ */ wn(), P = /* @__PURE__ */ Ks(), T = /* @__PURE__ */ hs(), y = /* @__PURE__ */ uo(), x = /* @__PURE__ */ Sf(), M = /* @__PURE__ */ vs(), h = /* @__PURE__ */ Ef(), D = /* @__PURE__ */ pn(), z = /* @__PURE__ */ Bs(), X = /* @__PURE__ */ Cf(), ee = /* @__PURE__ */ oo(), G = /* @__PURE__ */ Hr(), Pe = /* @__PURE__ */ qf(), Se = /* @__PURE__ */ xn(), Ce = /* @__PURE__ */ Le(), Ae = /* @__PURE__ */ co(), Ue = /* @__PURE__ */ ws();
  class je {
    // ------------------------------------------------------------------------
    // Modifiers
    // ------------------------------------------------------------------------
    /** `[Json]` Creates a Readonly and Optional property */
    ReadonlyOptional(J) {
      return (0, x.ReadonlyOptional)(J);
    }
    /** `[Json]` Creates a Readonly property */
    Readonly(J, Q) {
      return (0, y.Readonly)(J, Q ?? !0);
    }
    /** `[Json]` Creates a Optional property */
    Optional(J, Q) {
      return (0, _.Optional)(J, Q ?? !0);
    }
    // ------------------------------------------------------------------------
    // Types
    // ------------------------------------------------------------------------
    /** `[Json]` Creates an Any type */
    Any(J) {
      return (0, e.Any)(J);
    }
    /** `[Json]` Creates an Array type */
    Array(J, Q) {
      return (0, r.Array)(J, Q);
    }
    /** `[Json]` Creates a Boolean type */
    Boolean(J) {
      return (0, t.Boolean)(J);
    }
    /** `[Json]` Intrinsic function to Capitalize LiteralString types */
    Capitalize(J, Q) {
      return (0, p.Capitalize)(J, Q);
    }
    /** `[Json]` Creates a Composite object type */
    Composite(J, Q) {
      return (0, o.Composite)(J, Q);
    }
    /** `[JavaScript]` Creates a readonly const type from the given value. */
    Const(J, Q) {
      return (0, i.Const)(J, Q);
    }
    /** `[Json]` Creates a Enum type */
    Enum(J, Q) {
      return (0, n.Enum)(J, Q);
    }
    /** `[Json]` Constructs a type by excluding from unionType all union members that are assignable to excludedMembers */
    Exclude(J, Q, me) {
      return (0, u.Exclude)(J, Q, me);
    }
    /** `[Json]` Creates a Conditional type */
    Extends(J, Q, me, ge, Z) {
      return (0, c.Extends)(J, Q, me, ge, Z);
    }
    /** `[Json]` Constructs a type by extracting from type all union members that are assignable to union */
    Extract(J, Q, me) {
      return (0, f.Extract)(J, Q, me);
    }
    /** `[Json]` Returns an Indexed property type for the given keys */
    Index(J, Q, me) {
      return (0, s.Index)(J, Q, me);
    }
    /** `[Json]` Creates an Integer type */
    Integer(J) {
      return (0, l.Integer)(J);
    }
    /** `[Json]` Creates an Intersect type */
    Intersect(J, Q) {
      return (0, a.Intersect)(J, Q);
    }
    /** `[Json]` Creates a KeyOf type */
    KeyOf(J, Q) {
      return (0, $.KeyOf)(J, Q);
    }
    /** `[Json]` Creates a Literal type */
    Literal(J, Q) {
      return (0, w.Literal)(J, Q);
    }
    /** `[Json]` Intrinsic function to Lowercase LiteralString types */
    Lowercase(J, Q) {
      return (0, p.Lowercase)(J, Q);
    }
    /** `[Json]` Creates a Mapped object type */
    Mapped(J, Q, me) {
      return (0, R.Mapped)(J, Q, me);
    }
    /** `[Json]` Creates a Type Definition Module. */
    Module(J) {
      return (0, L.Module)(J);
    }
    /** `[Json]` Creates a Never type */
    Never(J) {
      return (0, v.Never)(J);
    }
    /** `[Json]` Creates a Not type */
    Not(J, Q) {
      return (0, C.Not)(J, Q);
    }
    /** `[Json]` Creates a Null type */
    Null(J) {
      return (0, A.Null)(J);
    }
    /** `[Json]` Creates a Number type */
    Number(J) {
      return (0, F.Number)(J);
    }
    /** `[Json]` Creates an Object type */
    Object(J, Q) {
      return (0, I.Object)(J, Q);
    }
    /** `[Json]` Constructs a type whose keys are omitted from the given type */
    Omit(J, Q, me) {
      return (0, U.Omit)(J, Q, me);
    }
    /** `[Json]` Constructs a type where all properties are optional */
    Partial(J, Q) {
      return (0, P.Partial)(J, Q);
    }
    /** `[Json]` Constructs a type whose keys are picked from the given type */
    Pick(J, Q, me) {
      return (0, T.Pick)(J, Q, me);
    }
    /** `[Json]` Creates a Record type */
    Record(J, Q, me) {
      return (0, M.Record)(J, Q, me);
    }
    /** `[Json]` Creates a Recursive type */
    Recursive(J, Q) {
      return (0, h.Recursive)(J, Q);
    }
    /** `[Json]` Creates a Ref type. The referenced type must contain a $id */
    Ref(...J) {
      return (0, D.Ref)(J[0], J[1]);
    }
    /** `[Json]` Constructs a type where all properties are required */
    Required(J, Q) {
      return (0, z.Required)(J, Q);
    }
    /** `[Json]` Extracts interior Rest elements from Tuple, Intersect and Union types */
    Rest(J) {
      return (0, X.Rest)(J);
    }
    /** `[Json]` Creates a String type */
    String(J) {
      return (0, ee.String)(J);
    }
    /** `[Json]` Creates a TemplateLiteral type */
    TemplateLiteral(J, Q) {
      return (0, G.TemplateLiteral)(J, Q);
    }
    /** `[Json]` Creates a Transform type */
    Transform(J) {
      return (0, Pe.Transform)(J);
    }
    /** `[Json]` Creates a Tuple type */
    Tuple(J, Q) {
      return (0, Se.Tuple)(J, Q);
    }
    /** `[Json]` Intrinsic function to Uncapitalize LiteralString types */
    Uncapitalize(J, Q) {
      return (0, p.Uncapitalize)(J, Q);
    }
    /** `[Json]` Creates a Union type */
    Union(J, Q) {
      return (0, Ce.Union)(J, Q);
    }
    /** `[Json]` Creates an Unknown type */
    Unknown(J) {
      return (0, Ae.Unknown)(J);
    }
    /** `[Json]` Creates a Unsafe type that will infers as the generic argument T */
    Unsafe(J) {
      return (0, Ue.Unsafe)(J);
    }
    /** `[Json]` Intrinsic function to Uppercase LiteralString types */
    Uppercase(J, Q) {
      return (0, p.Uppercase)(J, Q);
    }
  }
  return $o.JsonTypeBuilder = je, $o;
}
var na = {}, Om;
function Y$() {
  return Om || (Om = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.String = e.ReturnType = e.Rest = e.Required = e.RegExp = e.Ref = e.Recursive = e.Record = e.ReadonlyOptional = e.Readonly = e.Promise = e.Pick = e.Partial = e.Parameters = e.Optional = e.Omit = e.Object = e.Number = e.Null = e.Not = e.Never = e.Module = e.Mapped = e.Literal = e.KeyOf = e.Iterator = e.Uppercase = e.Lowercase = e.Uncapitalize = e.Capitalize = e.Intersect = e.Integer = e.InstanceType = e.Index = e.Function = e.Extract = e.Extends = e.Exclude = e.Enum = e.Date = e.ConstructorParameters = e.Constructor = e.Const = e.Composite = e.Boolean = e.BigInt = e.Awaited = e.AsyncIterator = e.Array = e.Any = void 0, e.Void = e.Unsafe = e.Unknown = e.Union = e.Undefined = e.Uint8Array = e.Tuple = e.Transform = e.TemplateLiteral = e.Symbol = void 0;
    var r = /* @__PURE__ */ nu();
    Object.defineProperty(e, "Any", { enumerable: !0, get: function() {
      return r.Any;
    } });
    var t = /* @__PURE__ */ Jo();
    Object.defineProperty(e, "Array", { enumerable: !0, get: function() {
      return t.Array;
    } });
    var o = /* @__PURE__ */ Zo();
    Object.defineProperty(e, "AsyncIterator", { enumerable: !0, get: function() {
      return o.AsyncIterator;
    } });
    var i = /* @__PURE__ */ Ss();
    Object.defineProperty(e, "Awaited", { enumerable: !0, get: function() {
      return i.Awaited;
    } });
    var n = /* @__PURE__ */ Xo();
    Object.defineProperty(e, "BigInt", { enumerable: !0, get: function() {
      return n.BigInt;
    } });
    var u = /* @__PURE__ */ xs();
    Object.defineProperty(e, "Boolean", { enumerable: !0, get: function() {
      return u.Boolean;
    } });
    var c = /* @__PURE__ */ yf();
    Object.defineProperty(e, "Composite", { enumerable: !0, get: function() {
      return c.Composite;
    } });
    var f = /* @__PURE__ */ mf();
    Object.defineProperty(e, "Const", { enumerable: !0, get: function() {
      return f.Const;
    } });
    var s = /* @__PURE__ */ Qo();
    Object.defineProperty(e, "Constructor", { enumerable: !0, get: function() {
      return s.Constructor;
    } });
    var l = /* @__PURE__ */ _f();
    Object.defineProperty(e, "ConstructorParameters", { enumerable: !0, get: function() {
      return l.ConstructorParameters;
    } });
    var a = /* @__PURE__ */ Es();
    Object.defineProperty(e, "Date", { enumerable: !0, get: function() {
      return a.Date;
    } });
    var p = /* @__PURE__ */ bf();
    Object.defineProperty(e, "Enum", { enumerable: !0, get: function() {
      return p.Enum;
    } });
    var $ = /* @__PURE__ */ Of();
    Object.defineProperty(e, "Exclude", { enumerable: !0, get: function() {
      return $.Exclude;
    } });
    var w = /* @__PURE__ */ so();
    Object.defineProperty(e, "Extends", { enumerable: !0, get: function() {
      return w.Extends;
    } });
    var R = /* @__PURE__ */ Pf();
    Object.defineProperty(e, "Extract", { enumerable: !0, get: function() {
      return R.Extract;
    } });
    var v = /* @__PURE__ */ qi();
    Object.defineProperty(e, "Function", { enumerable: !0, get: function() {
      return v.Function;
    } });
    var C = /* @__PURE__ */ zr();
    Object.defineProperty(e, "Index", { enumerable: !0, get: function() {
      return C.Index;
    } });
    var A = /* @__PURE__ */ jf();
    Object.defineProperty(e, "InstanceType", { enumerable: !0, get: function() {
      return A.InstanceType;
    } });
    var L = /* @__PURE__ */ Tf();
    Object.defineProperty(e, "Integer", { enumerable: !0, get: function() {
      return L.Integer;
    } });
    var F = /* @__PURE__ */ Mr();
    Object.defineProperty(e, "Intersect", { enumerable: !0, get: function() {
      return F.Intersect;
    } });
    var I = /* @__PURE__ */ $f();
    Object.defineProperty(e, "Capitalize", { enumerable: !0, get: function() {
      return I.Capitalize;
    } }), Object.defineProperty(e, "Uncapitalize", { enumerable: !0, get: function() {
      return I.Uncapitalize;
    } }), Object.defineProperty(e, "Lowercase", { enumerable: !0, get: function() {
      return I.Lowercase;
    } }), Object.defineProperty(e, "Uppercase", { enumerable: !0, get: function() {
      return I.Uppercase;
    } });
    var U = /* @__PURE__ */ eu();
    Object.defineProperty(e, "Iterator", { enumerable: !0, get: function() {
      return U.Iterator;
    } });
    var _ = /* @__PURE__ */ Kr();
    Object.defineProperty(e, "KeyOf", { enumerable: !0, get: function() {
      return _.KeyOf;
    } });
    var P = /* @__PURE__ */ ar();
    Object.defineProperty(e, "Literal", { enumerable: !0, get: function() {
      return P.Literal;
    } });
    var T = /* @__PURE__ */ Ze();
    Object.defineProperty(e, "Mapped", { enumerable: !0, get: function() {
      return T.Mapped;
    } });
    var y = /* @__PURE__ */ xf();
    Object.defineProperty(e, "Module", { enumerable: !0, get: function() {
      return y.Module;
    } });
    var x = /* @__PURE__ */ cr();
    Object.defineProperty(e, "Never", { enumerable: !0, get: function() {
      return x.Never;
    } });
    var M = /* @__PURE__ */ Rf();
    Object.defineProperty(e, "Not", { enumerable: !0, get: function() {
      return M.Not;
    } });
    var h = /* @__PURE__ */ As();
    Object.defineProperty(e, "Null", { enumerable: !0, get: function() {
      return h.Null;
    } });
    var D = /* @__PURE__ */ io();
    Object.defineProperty(e, "Number", { enumerable: !0, get: function() {
      return D.Number;
    } });
    var z = /* @__PURE__ */ jr();
    Object.defineProperty(e, "Object", { enumerable: !0, get: function() {
      return z.Object;
    } });
    var X = /* @__PURE__ */ Ns();
    Object.defineProperty(e, "Omit", { enumerable: !0, get: function() {
      return X.Omit;
    } });
    var ee = /* @__PURE__ */ wn();
    Object.defineProperty(e, "Optional", { enumerable: !0, get: function() {
      return ee.Optional;
    } });
    var G = /* @__PURE__ */ Mf();
    Object.defineProperty(e, "Parameters", { enumerable: !0, get: function() {
      return G.Parameters;
    } });
    var Pe = /* @__PURE__ */ Ks();
    Object.defineProperty(e, "Partial", { enumerable: !0, get: function() {
      return Pe.Partial;
    } });
    var Se = /* @__PURE__ */ hs();
    Object.defineProperty(e, "Pick", { enumerable: !0, get: function() {
      return Se.Pick;
    } });
    var Ce = /* @__PURE__ */ Rs();
    Object.defineProperty(e, "Promise", { enumerable: !0, get: function() {
      return Ce.Promise;
    } });
    var Ae = /* @__PURE__ */ uo();
    Object.defineProperty(e, "Readonly", { enumerable: !0, get: function() {
      return Ae.Readonly;
    } });
    var Ue = /* @__PURE__ */ Sf();
    Object.defineProperty(e, "ReadonlyOptional", { enumerable: !0, get: function() {
      return Ue.ReadonlyOptional;
    } });
    var je = /* @__PURE__ */ vs();
    Object.defineProperty(e, "Record", { enumerable: !0, get: function() {
      return je.Record;
    } });
    var he = /* @__PURE__ */ Ef();
    Object.defineProperty(e, "Recursive", { enumerable: !0, get: function() {
      return he.Recursive;
    } });
    var J = /* @__PURE__ */ pn();
    Object.defineProperty(e, "Ref", { enumerable: !0, get: function() {
      return J.Ref;
    } });
    var Q = /* @__PURE__ */ Af();
    Object.defineProperty(e, "RegExp", { enumerable: !0, get: function() {
      return Q.RegExp;
    } });
    var me = /* @__PURE__ */ Bs();
    Object.defineProperty(e, "Required", { enumerable: !0, get: function() {
      return me.Required;
    } });
    var ge = /* @__PURE__ */ Cf();
    Object.defineProperty(e, "Rest", { enumerable: !0, get: function() {
      return ge.Rest;
    } });
    var Z = /* @__PURE__ */ Uf();
    Object.defineProperty(e, "ReturnType", { enumerable: !0, get: function() {
      return Z.ReturnType;
    } });
    var W = /* @__PURE__ */ oo();
    Object.defineProperty(e, "String", { enumerable: !0, get: function() {
      return W.String;
    } });
    var q = /* @__PURE__ */ Cs();
    Object.defineProperty(e, "Symbol", { enumerable: !0, get: function() {
      return q.Symbol;
    } });
    var m = /* @__PURE__ */ Hr();
    Object.defineProperty(e, "TemplateLiteral", { enumerable: !0, get: function() {
      return m.TemplateLiteral;
    } });
    var b = /* @__PURE__ */ qf();
    Object.defineProperty(e, "Transform", { enumerable: !0, get: function() {
      return b.Transform;
    } });
    var S = /* @__PURE__ */ xn();
    Object.defineProperty(e, "Tuple", { enumerable: !0, get: function() {
      return S.Tuple;
    } });
    var V = /* @__PURE__ */ qs();
    Object.defineProperty(e, "Uint8Array", { enumerable: !0, get: function() {
      return V.Uint8Array;
    } });
    var d = /* @__PURE__ */ Us();
    Object.defineProperty(e, "Undefined", { enumerable: !0, get: function() {
      return d.Undefined;
    } });
    var Y = /* @__PURE__ */ Le();
    Object.defineProperty(e, "Union", { enumerable: !0, get: function() {
      return Y.Union;
    } });
    var K = /* @__PURE__ */ co();
    Object.defineProperty(e, "Unknown", { enumerable: !0, get: function() {
      return K.Unknown;
    } });
    var E = /* @__PURE__ */ ws();
    Object.defineProperty(e, "Unsafe", { enumerable: !0, get: function() {
      return E.Unsafe;
    } });
    var ie = /* @__PURE__ */ Nf();
    Object.defineProperty(e, "Void", { enumerable: !0, get: function() {
      return ie.Void;
    } });
  }(na)), na;
}
var Fo = {}, gm;
function J$() {
  if (gm) return Fo;
  gm = 1, Object.defineProperty(Fo, "__esModule", { value: !0 }), Fo.JavaScriptTypeBuilder = void 0;
  const e = /* @__PURE__ */ Gb(), r = /* @__PURE__ */ Zo(), t = /* @__PURE__ */ Ss(), o = /* @__PURE__ */ Xo(), i = /* @__PURE__ */ Qo(), n = /* @__PURE__ */ _f(), u = /* @__PURE__ */ Es(), c = /* @__PURE__ */ qi(), f = /* @__PURE__ */ jf(), s = /* @__PURE__ */ eu(), l = /* @__PURE__ */ Mf(), a = /* @__PURE__ */ Rs(), p = /* @__PURE__ */ Af(), $ = /* @__PURE__ */ Uf(), w = /* @__PURE__ */ Cs(), R = /* @__PURE__ */ qs(), v = /* @__PURE__ */ Us(), C = /* @__PURE__ */ Nf();
  class A extends e.JsonTypeBuilder {
    /** `[JavaScript]` Creates a AsyncIterator type */
    AsyncIterator(F, I) {
      return (0, r.AsyncIterator)(F, I);
    }
    /** `[JavaScript]` Constructs a type by recursively unwrapping Promise types */
    Awaited(F, I) {
      return (0, t.Awaited)(F, I);
    }
    /** `[JavaScript]` Creates a BigInt type */
    BigInt(F) {
      return (0, o.BigInt)(F);
    }
    /** `[JavaScript]` Extracts the ConstructorParameters from the given Constructor type */
    ConstructorParameters(F, I) {
      return (0, n.ConstructorParameters)(F, I);
    }
    /** `[JavaScript]` Creates a Constructor type */
    Constructor(F, I, U) {
      return (0, i.Constructor)(F, I, U);
    }
    /** `[JavaScript]` Creates a Date type */
    Date(F = {}) {
      return (0, u.Date)(F);
    }
    /** `[JavaScript]` Creates a Function type */
    Function(F, I, U) {
      return (0, c.Function)(F, I, U);
    }
    /** `[JavaScript]` Extracts the InstanceType from the given Constructor type */
    InstanceType(F, I) {
      return (0, f.InstanceType)(F, I);
    }
    /** `[JavaScript]` Creates an Iterator type */
    Iterator(F, I) {
      return (0, s.Iterator)(F, I);
    }
    /** `[JavaScript]` Extracts the Parameters from the given Function type */
    Parameters(F, I) {
      return (0, l.Parameters)(F, I);
    }
    /** `[JavaScript]` Creates a Promise type */
    Promise(F, I) {
      return (0, a.Promise)(F, I);
    }
    /** `[JavaScript]` Creates a RegExp type */
    RegExp(F, I) {
      return (0, p.RegExp)(F, I);
    }
    /** `[JavaScript]` Extracts the ReturnType from the given Function type */
    ReturnType(F, I) {
      return (0, $.ReturnType)(F, I);
    }
    /** `[JavaScript]` Creates a Symbol type */
    Symbol(F) {
      return (0, w.Symbol)(F);
    }
    /** `[JavaScript]` Creates a Undefined type */
    Undefined(F) {
      return (0, v.Undefined)(F);
    }
    /** `[JavaScript]` Creates a Uint8Array type */
    Uint8Array(F) {
      return (0, R.Uint8Array)(F);
    }
    /** `[JavaScript]` Creates a Void type */
    Void(F) {
      return (0, C.Void)(F);
    }
  }
  return Fo.JavaScriptTypeBuilder = A, Fo;
}
var Pm;
function Z$() {
  return Pm || (Pm = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.Type = e.JavaScriptTypeBuilder = e.JsonTypeBuilder = void 0;
    var r = /* @__PURE__ */ Gb();
    Object.defineProperty(e, "JsonTypeBuilder", { enumerable: !0, get: function() {
      return r.JsonTypeBuilder;
    } });
    const t = /* @__PURE__ */ Y$(), o = /* @__PURE__ */ J$();
    Object.defineProperty(e, "JavaScriptTypeBuilder", { enumerable: !0, get: function() {
      return o.JavaScriptTypeBuilder;
    } });
    const i = t;
    e.Type = i;
  }(ra)), ra;
}
var jm;
function Hb() {
  return jm || (jm = 1, function(e) {
    var r = ht && ht.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = ht && ht.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(/* @__PURE__ */ l$(), e), t(/* @__PURE__ */ $n(), e), t(/* @__PURE__ */ Be(), e), t(/* @__PURE__ */ _b(), e), t(/* @__PURE__ */ y$(), e), t(/* @__PURE__ */ ko(), e), t(/* @__PURE__ */ to(), e), t(/* @__PURE__ */ Ms(), e), t(/* @__PURE__ */ ue(), e), t(/* @__PURE__ */ nu(), e), t(/* @__PURE__ */ Jo(), e), t(/* @__PURE__ */ Zo(), e), t(/* @__PURE__ */ Ss(), e), t(/* @__PURE__ */ Xo(), e), t(/* @__PURE__ */ xs(), e), t(/* @__PURE__ */ yf(), e), t(/* @__PURE__ */ mf(), e), t(/* @__PURE__ */ Qo(), e), t(/* @__PURE__ */ _f(), e), t(/* @__PURE__ */ Es(), e), t(/* @__PURE__ */ bf(), e), t(/* @__PURE__ */ Of(), e), t(/* @__PURE__ */ so(), e), t(/* @__PURE__ */ Pf(), e), t(/* @__PURE__ */ qi(), e), t(/* @__PURE__ */ zr(), e), t(/* @__PURE__ */ jf(), e), t(/* @__PURE__ */ Tf(), e), t(/* @__PURE__ */ Mr(), e), t(/* @__PURE__ */ eu(), e), t(/* @__PURE__ */ $f(), e), t(/* @__PURE__ */ Kr(), e), t(/* @__PURE__ */ ar(), e), t(/* @__PURE__ */ xf(), e), t(/* @__PURE__ */ Ze(), e), t(/* @__PURE__ */ cr(), e), t(/* @__PURE__ */ Rf(), e), t(/* @__PURE__ */ As(), e), t(/* @__PURE__ */ io(), e), t(/* @__PURE__ */ jr(), e), t(/* @__PURE__ */ Ns(), e), t(/* @__PURE__ */ wn(), e), t(/* @__PURE__ */ Mf(), e), t(/* @__PURE__ */ Ks(), e), t(/* @__PURE__ */ hs(), e), t(/* @__PURE__ */ Rs(), e), t(/* @__PURE__ */ uo(), e), t(/* @__PURE__ */ Sf(), e), t(/* @__PURE__ */ vs(), e), t(/* @__PURE__ */ Ef(), e), t(/* @__PURE__ */ pn(), e), t(/* @__PURE__ */ Af(), e), t(/* @__PURE__ */ Bs(), e), t(/* @__PURE__ */ Cf(), e), t(/* @__PURE__ */ Uf(), e), t(/* @__PURE__ */ V$(), e), t(/* @__PURE__ */ H$(), e), t(/* @__PURE__ */ oo(), e), t(/* @__PURE__ */ Cs(), e), t(/* @__PURE__ */ Hr(), e), t(/* @__PURE__ */ qf(), e), t(/* @__PURE__ */ xn(), e), t(/* @__PURE__ */ qs(), e), t(/* @__PURE__ */ Us(), e), t(/* @__PURE__ */ Le(), e), t(/* @__PURE__ */ co(), e), t(/* @__PURE__ */ ws(), e), t(/* @__PURE__ */ Nf(), e), t(/* @__PURE__ */ Z$(), e);
  }(ht)), ht;
}
var wo = {}, Tm;
function zb() {
  if (Tm) return wo;
  Tm = 1, Object.defineProperty(wo, "__esModule", { value: !0 }), wo.ValidationException = void 0;
  class e {
    /**
     * @param message Overall error message
     * @param details The individual validation errors
     */
    constructor(t, o = []) {
      this.message = t, this.details = o;
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
        for (const o of this.details)
          t += `
 * ` + e.errorToString(o);
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
  return wo.ValidationException = e, wo;
}
var $m;
function fo() {
  return $m || ($m = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.throwInvalidValidate = e.throwInvalidAssert = e.createUnionTypeErrorIterable = e.createUnionTypeError = e.createErrorsIterable = e.adjustErrorMessage = e.DEFAULT_UNKNOWN_TYPE_MESSAGE = e.DEFAULT_OVERALL_MESSAGE = void 0;
    const r = /* @__PURE__ */ Hb(), t = /* @__PURE__ */ Rn(), o = zb();
    e.DEFAULT_OVERALL_MESSAGE = "Invalid value", e.DEFAULT_UNKNOWN_TYPE_MESSAGE = "Object type not recognized";
    const i = "Expected required property";
    function n(a) {
      return a.schema.errorMessage !== void 0 && (a.message = a.schema.errorMessage), a;
    }
    e.adjustErrorMessage = n;
    function u(a) {
      return {
        [Symbol.iterator]: function* () {
          const p = a[Symbol.iterator]();
          let $ = p.next(), w = "???";
          for (; $.value !== void 0; ) {
            const R = $.value, v = R.message;
            R.path !== w && (n(R), R.message != v ? (w = R.path, yield R) : (
              // drop 'required' errors for values that have constraints
              (R.message != i || ["Any", "Unknown"].includes(R.schema[r.Kind])) && (yield R)
            )), $ = p.next();
          }
        }
      };
    }
    e.createErrorsIterable = u;
    function c(a, p) {
      var $;
      return {
        type: t.ValueErrorType.Union,
        path: "",
        schema: a,
        value: p,
        message: ($ = a.errorMessage) !== null && $ !== void 0 ? $ : e.DEFAULT_UNKNOWN_TYPE_MESSAGE
      };
    }
    e.createUnionTypeError = c;
    function f(a) {
      return {
        [Symbol.iterator]: function* () {
          yield a;
        }
      };
    }
    e.createUnionTypeErrorIterable = f;
    function s(a, p) {
      throw n(p), new o.ValidationException(a === void 0 ? e.DEFAULT_OVERALL_MESSAGE : a.replace("{error}", o.ValidationException.errorToString(p)), [p]);
    }
    e.throwInvalidAssert = s;
    function l(a, p) {
      throw new o.ValidationException(a ?? e.DEFAULT_OVERALL_MESSAGE, p instanceof t.ValueErrorIterator ? [...u(p)] : [p]);
    }
    e.throwInvalidValidate = l;
  }(Qs)), Qs;
}
var Fm;
function hf() {
  if (Fm) return yo;
  Fm = 1, Object.defineProperty(yo, "__esModule", { value: !0 }), yo.AbstractValidator = void 0;
  const e = /* @__PURE__ */ iu(), r = fo();
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
      const n = this.testReturningErrors(i);
      if (n === null)
        return null;
      const u = n[Symbol.iterator]().next();
      return u.done ? null : u.value;
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
      const u = this.errors(i)[Symbol.iterator]().next();
      return u.done ? null : u.value;
    }
    cleanCopyOfValue(i, n) {
      if (i.type === "object" && typeof n == "object") {
        const u = {};
        return Object.keys(i.properties).forEach((c) => {
          u[c] = n[c];
        }), u;
      }
      return n;
    }
    cleanValue(i, n) {
      if (i.type === "object" && typeof n == "object") {
        const u = Object.keys(i.properties);
        Object.getOwnPropertyNames(n).forEach((c) => {
          u.includes(c) || delete n[c];
        });
      }
    }
    uncompiledAssert(i, n, u) {
      e.Value.Check(i, n) || (0, r.throwInvalidAssert)(u, e.Value.Errors(i, n).First());
    }
    uncompiledValidate(i, n, u) {
      e.Value.Check(i, n) || (0, r.throwInvalidValidate)(u, e.Value.Errors(i, n));
    }
  }
  return yo.AbstractValidator = t, yo;
}
var xo = {}, wm;
function Kf() {
  if (wm) return xo;
  wm = 1, Object.defineProperty(xo, "__esModule", { value: !0 }), xo.AbstractStandardValidator = void 0;
  const e = hf();
  class r extends e.AbstractValidator {
    /** @inheritdoc */
    constructor(o) {
      super(o);
    }
    /** @inheritdoc */
    assertAndClean(o, i) {
      this.assert(o, i), this.cleanValue(this.schema, o);
    }
    /** @inheritdoc */
    assertAndCleanCopy(o, i) {
      return this.assert(o, i), this.cleanCopyOfValue(this.schema, o);
    }
    /** @inheritdoc */
    validateAndClean(o, i) {
      this.validate(o, i), this.cleanValue(this.schema, o);
    }
    /** @inheritdoc */
    validateAndCleanCopy(o, i) {
      return this.validate(o, i), this.cleanCopyOfValue(this.schema, o);
    }
  }
  return xo.AbstractStandardValidator = r, xo;
}
var Ii = {}, xm;
function ou() {
  if (xm) return Ii;
  xm = 1, Object.defineProperty(Ii, "__esModule", { value: !0 }), Ii.AbstractTypedUnionValidator = Ii.DEFAULT_DISCRIMINANT_KEY = void 0;
  const e = hf();
  Ii.DEFAULT_DISCRIMINANT_KEY = "kind";
  class r extends e.AbstractValidator {
    constructor(o) {
      super(o);
    }
    /** @inheritdoc */
    assert(o, i) {
      this.assertReturningSchema(o, i);
    }
    /** @inheritdoc */
    assertAndClean(o, i) {
      const n = this.assertReturningSchema(o, i);
      this.cleanValue(n, o);
    }
    /** @inheritdoc */
    assertAndCleanCopy(o, i) {
      const n = this.assertReturningSchema(o, i);
      return this.cleanCopyOfValue(n, o);
    }
    /** @inheritdoc */
    validate(o, i) {
      this.validateReturningSchema(o, i);
    }
    /** @inheritdoc */
    validateAndClean(o, i) {
      const n = this.validateReturningSchema(o, i);
      this.cleanValue(n, o);
    }
    /** @inheritdoc */
    validateAndCleanCopy(o, i) {
      const n = this.validateReturningSchema(o, i);
      return this.cleanCopyOfValue(n, o);
    }
    toValueKeyDereference(o) {
      return /^[a-zA-Z_$][a-zA-Z_$0-9]*$/.test(o) ? `value.${o}` : `value['${o.replace(/'/g, "\\'")}']`;
    }
  }
  return Ii.AbstractTypedUnionValidator = r, Ii;
}
var Oi = {}, Ro = {}, Rm;
function Q$() {
  if (Rm) return Ro;
  Rm = 1, Object.defineProperty(Ro, "__esModule", { value: !0 }), Ro.StandardValidator = void 0;
  const e = Kf(), r = /* @__PURE__ */ iu(), t = fo();
  class o extends e.AbstractStandardValidator {
    /** @inheritdoc */
    constructor(n) {
      super(n);
    }
    /** @inheritdoc */
    test(n) {
      return r.Value.Check(this.schema, n);
    }
    /** @inheritdoc */
    assert(n, u) {
      this.uncompiledAssert(this.schema, n, u);
    }
    /** @inheritdoc */
    validate(n, u) {
      this.uncompiledValidate(this.schema, n, u);
    }
    /** @inheritdoc */
    errors(n) {
      return (0, t.createErrorsIterable)(r.Value.Errors(this.schema, n));
    }
  }
  return Ro.StandardValidator = o, Ro;
}
var Xr = {}, gi = {}, _r = {}, Mm;
function X$() {
  if (Mm) return _r;
  Mm = 1, Object.defineProperty(_r, "__esModule", { value: !0 }), _r.TypeCompiler = _r.Policy = _r.TypeCompilerTypeGuardError = _r.TypeCompilerUnknownTypeError = _r.TypeCheck = void 0;
  const e = /* @__PURE__ */ tu(), r = /* @__PURE__ */ Rn(), t = /* @__PURE__ */ ka(), o = /* @__PURE__ */ Be(), i = /* @__PURE__ */ vr(), n = /* @__PURE__ */ ru(), u = /* @__PURE__ */ ue(), c = /* @__PURE__ */ to(), f = /* @__PURE__ */ Kr(), s = /* @__PURE__ */ uf(), l = /* @__PURE__ */ cr(), a = /* @__PURE__ */ pn(), p = /* @__PURE__ */ Je(), $ = /* @__PURE__ */ mb();
  class w {
    constructor(P, T, y, x) {
      this.schema = P, this.references = T, this.checkFunc = y, this.code = x, this.hasTransform = (0, e.HasTransform)(P, T);
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
      return (0, r.Errors)(this.schema, this.references, P);
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
      const T = this.hasTransform ? (0, e.TransformEncode)(this.schema, this.references, P) : P;
      if (!this.checkFunc(T))
        throw new e.TransformEncodeCheckError(this.schema, P, this.Errors(P).First());
      return T;
    }
  }
  _r.TypeCheck = w;
  var R;
  (function(_) {
    function P(M) {
      return M === 36;
    }
    _.DollarSign = P;
    function T(M) {
      return M === 95;
    }
    _.IsUnderscore = T;
    function y(M) {
      return M >= 65 && M <= 90 || M >= 97 && M <= 122;
    }
    _.IsAlpha = y;
    function x(M) {
      return M >= 48 && M <= 57;
    }
    _.IsNumeric = x;
  })(R || (R = {}));
  var v;
  (function(_) {
    function P(M) {
      return M.length === 0 ? !1 : R.IsNumeric(M.charCodeAt(0));
    }
    function T(M) {
      if (P(M))
        return !1;
      for (let h = 0; h < M.length; h++) {
        const D = M.charCodeAt(h);
        if (!(R.IsAlpha(D) || R.IsNumeric(D) || R.DollarSign(D) || R.IsUnderscore(D)))
          return !1;
      }
      return !0;
    }
    function y(M) {
      return M.replace(/'/g, "\\'");
    }
    function x(M, h) {
      return T(h) ? `${M}.${h}` : `${M}['${y(h)}']`;
    }
    _.Encode = x;
  })(v || (v = {}));
  var C;
  (function(_) {
    function P(T) {
      const y = [];
      for (let x = 0; x < T.length; x++) {
        const M = T.charCodeAt(x);
        R.IsNumeric(M) || R.IsAlpha(M) ? y.push(T.charAt(x)) : y.push(`_${M}_`);
      }
      return y.join("").replace(/__/g, "_");
    }
    _.Encode = P;
  })(C || (C = {}));
  var A;
  (function(_) {
    function P(T) {
      return T.replace(/'/g, "\\'");
    }
    _.Escape = P;
  })(A || (A = {}));
  class L extends o.TypeBoxError {
    constructor(P) {
      super("Unknown type"), this.schema = P;
    }
  }
  _r.TypeCompilerUnknownTypeError = L;
  class F extends o.TypeBoxError {
    constructor(P) {
      super("Preflight validation check failed to guard for the given schema"), this.schema = P;
    }
  }
  _r.TypeCompilerTypeGuardError = F;
  var I;
  (function(_) {
    function P(h, D, z) {
      return t.TypeSystemPolicy.ExactOptionalPropertyTypes ? `('${D}' in ${h} ? ${z} : true)` : `(${v.Encode(h, D)} !== undefined ? ${z} : true)`;
    }
    _.IsExactOptionalProperty = P;
    function T(h) {
      return t.TypeSystemPolicy.AllowArrayObject ? `(typeof ${h} === 'object' && ${h} !== null)` : `(typeof ${h} === 'object' && ${h} !== null && !Array.isArray(${h}))`;
    }
    _.IsObjectLike = T;
    function y(h) {
      return t.TypeSystemPolicy.AllowArrayObject ? `(typeof ${h} === 'object' && ${h} !== null && !(${h} instanceof Date) && !(${h} instanceof Uint8Array))` : `(typeof ${h} === 'object' && ${h} !== null && !Array.isArray(${h}) && !(${h} instanceof Date) && !(${h} instanceof Uint8Array))`;
    }
    _.IsRecordLike = y;
    function x(h) {
      return t.TypeSystemPolicy.AllowNaN ? `typeof ${h} === 'number'` : `Number.isFinite(${h})`;
    }
    _.IsNumberLike = x;
    function M(h) {
      return t.TypeSystemPolicy.AllowNullVoid ? `(${h} === undefined || ${h} === null)` : `${h} === undefined`;
    }
    _.IsVoidLike = M;
  })(I || (_r.Policy = I = {}));
  var U;
  return function(_) {
    function P(N) {
      return N[u.Kind] === "Any" || N[u.Kind] === "Unknown";
    }
    function* T(N, ne, B) {
      yield "true";
    }
    function* y(N, ne, B) {
      yield `Array.isArray(${B})`;
      const [pe, oe] = [g("value", "any"), g("acc", "number")];
      (0, p.IsNumber)(N.maxItems) && (yield `${B}.length <= ${N.maxItems}`), (0, p.IsNumber)(N.minItems) && (yield `${B}.length >= ${N.minItems}`);
      const ce = ae(N.items, ne, "value");
      if (yield `${B}.every((${pe}) => ${ce})`, (0, $.IsSchema)(N.contains) || (0, p.IsNumber)(N.minContains) || (0, p.IsNumber)(N.maxContains)) {
        const Me = (0, $.IsSchema)(N.contains) ? N.contains : (0, l.Never)(), ye = ae(Me, ne, "value"), Ar = (0, p.IsNumber)(N.minContains) ? [`(count >= ${N.minContains})`] : [], O = (0, p.IsNumber)(N.maxContains) ? [`(count <= ${N.maxContains})`] : [], j = `const count = value.reduce((${oe}, ${pe}) => ${ye} ? acc + 1 : acc, 0)`, _e = ["(count > 0)", ...Ar, ...O].join(" && ");
        yield `((${pe}) => { ${j}; return ${_e}})(${B})`;
      }
      N.uniqueItems === !0 && (yield `((${pe}) => { const set = new Set(); for(const element of value) { const hashed = hash(element); if(set.has(hashed)) { return false } else { set.add(hashed) } } return true } )(${B})`);
    }
    function* x(N, ne, B) {
      yield `(typeof value === 'object' && Symbol.asyncIterator in ${B})`;
    }
    function* M(N, ne, B) {
      yield `(typeof ${B} === 'bigint')`, (0, p.IsBigInt)(N.exclusiveMaximum) && (yield `${B} < BigInt(${N.exclusiveMaximum})`), (0, p.IsBigInt)(N.exclusiveMinimum) && (yield `${B} > BigInt(${N.exclusiveMinimum})`), (0, p.IsBigInt)(N.maximum) && (yield `${B} <= BigInt(${N.maximum})`), (0, p.IsBigInt)(N.minimum) && (yield `${B} >= BigInt(${N.minimum})`), (0, p.IsBigInt)(N.multipleOf) && (yield `(${B} % BigInt(${N.multipleOf})) === 0`);
    }
    function* h(N, ne, B) {
      yield `(typeof ${B} === 'boolean')`;
    }
    function* D(N, ne, B) {
      yield* k(N.returns, ne, `${B}.prototype`);
    }
    function* z(N, ne, B) {
      yield `(${B} instanceof Date) && Number.isFinite(${B}.getTime())`, (0, p.IsNumber)(N.exclusiveMaximumTimestamp) && (yield `${B}.getTime() < ${N.exclusiveMaximumTimestamp}`), (0, p.IsNumber)(N.exclusiveMinimumTimestamp) && (yield `${B}.getTime() > ${N.exclusiveMinimumTimestamp}`), (0, p.IsNumber)(N.maximumTimestamp) && (yield `${B}.getTime() <= ${N.maximumTimestamp}`), (0, p.IsNumber)(N.minimumTimestamp) && (yield `${B}.getTime() >= ${N.minimumTimestamp}`), (0, p.IsNumber)(N.multipleOfTimestamp) && (yield `(${B}.getTime() % ${N.multipleOfTimestamp}) === 0`);
    }
    function* X(N, ne, B) {
      yield `(typeof ${B} === 'function')`;
    }
    function* ee(N, ne, B) {
      const pe = globalThis.Object.getOwnPropertyNames(N.$defs).reduce((oe, ce) => [...oe, N.$defs[ce]], []);
      yield* k((0, a.Ref)(N.$ref), [...ne, ...pe], B);
    }
    function* G(N, ne, B) {
      yield `Number.isInteger(${B})`, (0, p.IsNumber)(N.exclusiveMaximum) && (yield `${B} < ${N.exclusiveMaximum}`), (0, p.IsNumber)(N.exclusiveMinimum) && (yield `${B} > ${N.exclusiveMinimum}`), (0, p.IsNumber)(N.maximum) && (yield `${B} <= ${N.maximum}`), (0, p.IsNumber)(N.minimum) && (yield `${B} >= ${N.minimum}`), (0, p.IsNumber)(N.multipleOf) && (yield `(${B} % ${N.multipleOf}) === 0`);
    }
    function* Pe(N, ne, B) {
      const pe = N.allOf.map((oe) => ae(oe, ne, B)).join(" && ");
      if (N.unevaluatedProperties === !1) {
        const oe = Er(`${new RegExp((0, f.KeyOfPattern)(N))};`), ce = `Object.getOwnPropertyNames(${B}).every(key => ${oe}.test(key))`;
        yield `(${pe} && ${ce})`;
      } else if ((0, $.IsSchema)(N.unevaluatedProperties)) {
        const oe = Er(`${new RegExp((0, f.KeyOfPattern)(N))};`), ce = `Object.getOwnPropertyNames(${B}).every(key => ${oe}.test(key) || ${ae(N.unevaluatedProperties, ne, `${B}[key]`)})`;
        yield `(${pe} && ${ce})`;
      } else
        yield `(${pe})`;
    }
    function* Se(N, ne, B) {
      yield `(typeof value === 'object' && Symbol.iterator in ${B})`;
    }
    function* Ce(N, ne, B) {
      typeof N.const == "number" || typeof N.const == "boolean" ? yield `(${B} === ${N.const})` : yield `(${B} === '${A.Escape(N.const)}')`;
    }
    function* Ae(N, ne, B) {
      yield "false";
    }
    function* Ue(N, ne, B) {
      yield `(!${ae(N.not, ne, B)})`;
    }
    function* je(N, ne, B) {
      yield `(${B} === null)`;
    }
    function* he(N, ne, B) {
      yield I.IsNumberLike(B), (0, p.IsNumber)(N.exclusiveMaximum) && (yield `${B} < ${N.exclusiveMaximum}`), (0, p.IsNumber)(N.exclusiveMinimum) && (yield `${B} > ${N.exclusiveMinimum}`), (0, p.IsNumber)(N.maximum) && (yield `${B} <= ${N.maximum}`), (0, p.IsNumber)(N.minimum) && (yield `${B} >= ${N.minimum}`), (0, p.IsNumber)(N.multipleOf) && (yield `(${B} % ${N.multipleOf}) === 0`);
    }
    function* J(N, ne, B) {
      yield I.IsObjectLike(B), (0, p.IsNumber)(N.minProperties) && (yield `Object.getOwnPropertyNames(${B}).length >= ${N.minProperties}`), (0, p.IsNumber)(N.maxProperties) && (yield `Object.getOwnPropertyNames(${B}).length <= ${N.maxProperties}`);
      const pe = Object.getOwnPropertyNames(N.properties);
      for (const oe of pe) {
        const ce = v.Encode(B, oe), Me = N.properties[oe];
        if (N.required && N.required.includes(oe))
          yield* k(Me, ne, ce), ((0, s.ExtendsUndefinedCheck)(Me) || P(Me)) && (yield `('${oe}' in ${B})`);
        else {
          const ye = ae(Me, ne, ce);
          yield I.IsExactOptionalProperty(B, oe, ye);
        }
      }
      if (N.additionalProperties === !1)
        if (N.required && N.required.length === pe.length)
          yield `Object.getOwnPropertyNames(${B}).length === ${pe.length}`;
        else {
          const oe = `[${pe.map((ce) => `'${ce}'`).join(", ")}]`;
          yield `Object.getOwnPropertyNames(${B}).every(key => ${oe}.includes(key))`;
        }
      if (typeof N.additionalProperties == "object") {
        const oe = ae(N.additionalProperties, ne, `${B}[key]`), ce = `[${pe.map((Me) => `'${Me}'`).join(", ")}]`;
        yield `(Object.getOwnPropertyNames(${B}).every(key => ${ce}.includes(key) || ${oe}))`;
      }
    }
    function* Q(N, ne, B) {
      yield `(typeof value === 'object' && typeof ${B}.then === 'function')`;
    }
    function* me(N, ne, B) {
      yield I.IsRecordLike(B), (0, p.IsNumber)(N.minProperties) && (yield `Object.getOwnPropertyNames(${B}).length >= ${N.minProperties}`), (0, p.IsNumber)(N.maxProperties) && (yield `Object.getOwnPropertyNames(${B}).length <= ${N.maxProperties}`);
      const [pe, oe] = Object.entries(N.patternProperties)[0], ce = Er(`${new RegExp(pe)}`), Me = ae(oe, ne, "value"), ye = (0, $.IsSchema)(N.additionalProperties) ? ae(N.additionalProperties, ne, B) : N.additionalProperties === !1 ? "false" : "true", Ar = `(${ce}.test(key) ? ${Me} : ${ye})`;
      yield `(Object.entries(${B}).every(([key, value]) => ${Ar}))`;
    }
    function* ge(N, ne, B) {
      const pe = (0, i.Deref)(N, ne);
      if (se.functions.has(N.$ref))
        return yield `${qe(N.$ref)}(${B})`;
      yield* k(pe, ne, B);
    }
    function* Z(N, ne, B) {
      const pe = Er(`${new RegExp(N.source, N.flags)};`);
      yield `(typeof ${B} === 'string')`, (0, p.IsNumber)(N.maxLength) && (yield `${B}.length <= ${N.maxLength}`), (0, p.IsNumber)(N.minLength) && (yield `${B}.length >= ${N.minLength}`), yield `${pe}.test(${B})`;
    }
    function* W(N, ne, B) {
      yield `(typeof ${B} === 'string')`, (0, p.IsNumber)(N.maxLength) && (yield `${B}.length <= ${N.maxLength}`), (0, p.IsNumber)(N.minLength) && (yield `${B}.length >= ${N.minLength}`), N.pattern !== void 0 && (yield `${Er(`${new RegExp(N.pattern)};`)}.test(${B})`), N.format !== void 0 && (yield `format('${N.format}', ${B})`);
    }
    function* q(N, ne, B) {
      yield `(typeof ${B} === 'symbol')`;
    }
    function* m(N, ne, B) {
      yield `(typeof ${B} === 'string')`, yield `${Er(`${new RegExp(N.pattern)};`)}.test(${B})`;
    }
    function* b(N, ne, B) {
      yield `${qe(N.$ref)}(${B})`;
    }
    function* S(N, ne, B) {
      if (yield `Array.isArray(${B})`, N.items === void 0)
        return yield `${B}.length === 0`;
      yield `(${B}.length === ${N.maxItems})`;
      for (let pe = 0; pe < N.items.length; pe++)
        yield `${ae(N.items[pe], ne, `${B}[${pe}]`)}`;
    }
    function* V(N, ne, B) {
      yield `${B} === undefined`;
    }
    function* d(N, ne, B) {
      yield `(${N.anyOf.map((oe) => ae(oe, ne, B)).join(" || ")})`;
    }
    function* Y(N, ne, B) {
      yield `${B} instanceof Uint8Array`, (0, p.IsNumber)(N.maxByteLength) && (yield `(${B}.length <= ${N.maxByteLength})`), (0, p.IsNumber)(N.minByteLength) && (yield `(${B}.length >= ${N.minByteLength})`);
    }
    function* K(N, ne, B) {
      yield "true";
    }
    function* E(N, ne, B) {
      yield I.IsVoidLike(B);
    }
    function* ie(N, ne, B) {
      const pe = se.instances.size;
      se.instances.set(pe, N), yield `kind('${N[u.Kind]}', ${pe}, ${B})`;
    }
    function* k(N, ne, B, pe = !0) {
      const oe = (0, p.IsString)(N.$id) ? [...ne, N] : ne, ce = N;
      if (pe && (0, p.IsString)(N.$id)) {
        const Me = qe(N.$id);
        if (se.functions.has(Me))
          return yield `${Me}(${B})`;
        {
          se.functions.set(Me, "<deferred>");
          const ye = Ke(Me, N, ne, "value", !1);
          return se.functions.set(Me, ye), yield `${Me}(${B})`;
        }
      }
      switch (ce[u.Kind]) {
        case "Any":
          return yield* T();
        case "Array":
          return yield* y(ce, oe, B);
        case "AsyncIterator":
          return yield* x(ce, oe, B);
        case "BigInt":
          return yield* M(ce, oe, B);
        case "Boolean":
          return yield* h(ce, oe, B);
        case "Constructor":
          return yield* D(ce, oe, B);
        case "Date":
          return yield* z(ce, oe, B);
        case "Function":
          return yield* X(ce, oe, B);
        case "Import":
          return yield* ee(ce, oe, B);
        case "Integer":
          return yield* G(ce, oe, B);
        case "Intersect":
          return yield* Pe(ce, oe, B);
        case "Iterator":
          return yield* Se(ce, oe, B);
        case "Literal":
          return yield* Ce(ce, oe, B);
        case "Never":
          return yield* Ae();
        case "Not":
          return yield* Ue(ce, oe, B);
        case "Null":
          return yield* je(ce, oe, B);
        case "Number":
          return yield* he(ce, oe, B);
        case "Object":
          return yield* J(ce, oe, B);
        case "Promise":
          return yield* Q(ce, oe, B);
        case "Record":
          return yield* me(ce, oe, B);
        case "Ref":
          return yield* ge(ce, oe, B);
        case "RegExp":
          return yield* Z(ce, oe, B);
        case "String":
          return yield* W(ce, oe, B);
        case "Symbol":
          return yield* q(ce, oe, B);
        case "TemplateLiteral":
          return yield* m(ce, oe, B);
        case "This":
          return yield* b(ce, oe, B);
        case "Tuple":
          return yield* S(ce, oe, B);
        case "Undefined":
          return yield* V(ce, oe, B);
        case "Union":
          return yield* d(ce, oe, B);
        case "Uint8Array":
          return yield* Y(ce, oe, B);
        case "Unknown":
          return yield* K();
        case "Void":
          return yield* E(ce, oe, B);
        default:
          if (!c.TypeRegistry.Has(ce[u.Kind]))
            throw new L(N);
          return yield* ie(ce, oe, B);
      }
    }
    const se = {
      language: "javascript",
      // target language
      functions: /* @__PURE__ */ new Map(),
      // local functions
      variables: /* @__PURE__ */ new Map(),
      // local variables
      instances: /* @__PURE__ */ new Map()
      // exterior kind instances
    };
    function ae(N, ne, B, pe = !0) {
      return `(${[...k(N, ne, B, pe)].join(" && ")})`;
    }
    function qe(N) {
      return `check_${C.Encode(N)}`;
    }
    function Er(N) {
      const ne = `local_${se.variables.size}`;
      return se.variables.set(ne, `const ${ne} = ${N}`), ne;
    }
    function Ke(N, ne, B, pe, oe = !0) {
      const [ce, Me] = [`
`, (j) => "".padStart(j, " ")], ye = g("value", "any"), Ar = Te("boolean"), O = [...k(ne, B, pe, oe)].map((j) => `${Me(4)}${j}`).join(` &&${ce}`);
      return `function ${N}(${ye})${Ar} {${ce}${Me(2)}return (${ce}${O}${ce}${Me(2)})
}`;
    }
    function g(N, ne) {
      const B = se.language === "typescript" ? `: ${ne}` : "";
      return `${N}${B}`;
    }
    function Te(N) {
      return se.language === "typescript" ? `: ${N}` : "";
    }
    function fr(N, ne, B) {
      const pe = Ke("check", N, ne, "value"), oe = g("value", "any"), ce = Te("boolean"), Me = [...se.functions.values()], ye = [...se.variables.values()], Ar = (0, p.IsString)(N.$id) ? `return function check(${oe})${ce} {
  return ${qe(N.$id)}(value)
}` : `return ${pe}`;
      return [...ye, ...Me, Ar].join(`
`);
    }
    function uu(...N) {
      const ne = { language: "javascript" }, [B, pe, oe] = N.length === 2 && (0, p.IsArray)(N[1]) ? [N[0], N[1], ne] : N.length === 2 && !(0, p.IsArray)(N[1]) ? [N[0], [], N[1]] : N.length === 3 ? [N[0], N[1], N[2]] : N.length === 1 ? [N[0], [], ne] : [null, [], ne];
      if (se.language = oe.language, se.variables.clear(), se.functions.clear(), se.instances.clear(), !(0, $.IsSchema)(B))
        throw new F(B);
      for (const ce of pe)
        if (!(0, $.IsSchema)(ce))
          throw new F(ce);
      return fr(B, pe);
    }
    _.Code = uu;
    function Ds(N, ne = []) {
      const B = uu(N, ne, { language: "javascript" }), pe = globalThis.Function("kind", "format", "hash", B), oe = new Map(se.instances);
      function ce(O, j, _e) {
        if (!c.TypeRegistry.Has(O) || !oe.has(j))
          return !1;
        const sr = c.TypeRegistry.Get(O), Ls = oe.get(j);
        return sr(Ls, _e);
      }
      function Me(O, j) {
        return c.FormatRegistry.Has(O) ? c.FormatRegistry.Get(O)(j) : !1;
      }
      function ye(O) {
        return (0, n.Hash)(O);
      }
      const Ar = pe(ce, Me, ye);
      return new w(N, ne, Ar, B);
    }
    _.Compile = Ds;
  }(U || (_r.TypeCompiler = U = {})), _r;
}
var Sm;
function Wb() {
  return Sm || (Sm = 1, function(e) {
    var r = gi && gi.__createBinding || (Object.create ? function(i, n, u, c) {
      c === void 0 && (c = u);
      var f = Object.getOwnPropertyDescriptor(n, u);
      (!f || ("get" in f ? !n.__esModule : f.writable || f.configurable)) && (f = { enumerable: !0, get: function() {
        return n[u];
      } }), Object.defineProperty(i, c, f);
    } : function(i, n, u, c) {
      c === void 0 && (c = u), i[c] = n[u];
    }), t = gi && gi.__exportStar || function(i, n) {
      for (var u in i) u !== "default" && !Object.prototype.hasOwnProperty.call(n, u) && r(n, i, u);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueErrorIterator = e.ValueErrorType = void 0;
    var o = /* @__PURE__ */ Rn();
    Object.defineProperty(e, "ValueErrorType", { enumerable: !0, get: function() {
      return o.ValueErrorType;
    } }), Object.defineProperty(e, "ValueErrorIterator", { enumerable: !0, get: function() {
      return o.ValueErrorIterator;
    } }), t(/* @__PURE__ */ X$(), e);
  }(gi)), gi;
}
var Em;
function k$() {
  if (Em) return Xr;
  Em = 1;
  var e = Xr && Xr.__classPrivateFieldGet || function(c, f, s, l) {
    if (s === "a" && !l) throw new TypeError("Private accessor was defined without a getter");
    if (typeof f == "function" ? c !== f || !l : !f.has(c)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return s === "m" ? l : s === "a" ? l.call(c) : l ? l.value : f.get(c);
  }, r = Xr && Xr.__classPrivateFieldSet || function(c, f, s, l, a) {
    if (l === "m") throw new TypeError("Private method is not writable");
    if (l === "a" && !a) throw new TypeError("Private accessor was defined without a setter");
    if (typeof f == "function" ? c !== f || !a : !f.has(c)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return l === "a" ? a.call(c, s) : a ? a.value = s : f.set(c, s), s;
  }, t;
  Object.defineProperty(Xr, "__esModule", { value: !0 }), Xr.CompilingStandardValidator = void 0;
  const o = /* @__PURE__ */ Wb(), i = Kf(), n = fo();
  class u extends i.AbstractStandardValidator {
    /** @inheritdoc */
    constructor(f) {
      super(f), t.set(this, void 0);
    }
    /** @inheritdoc */
    test(f) {
      return this.getCompiledType().Check(f);
    }
    /** @inheritdoc */
    assert(f, s) {
      const l = this.getCompiledType();
      l.Check(f) || (0, n.throwInvalidAssert)(s, l.Errors(f).First());
    }
    /** @inheritdoc */
    validate(f, s) {
      const l = this.getCompiledType();
      l.Check(f) || (0, n.throwInvalidValidate)(s, l.Errors(f));
    }
    /** @inheritdoc */
    errors(f) {
      const s = this.getCompiledType();
      return (0, n.createErrorsIterable)(s.Errors(f));
    }
    getCompiledType() {
      return e(this, t, "f") === void 0 && r(this, t, o.TypeCompiler.Compile(this.schema), "f"), e(this, t, "f");
    }
  }
  return Xr.CompilingStandardValidator = u, t = /* @__PURE__ */ new WeakMap(), Xr;
}
var Am;
function eF() {
  return Am || (Am = 1, function(e) {
    var r = Oi && Oi.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Oi && Oi.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(Q$(), e), t(k$(), e);
  }(Oi)), Oi;
}
var Pi = {}, kr = {}, ta = {}, Cm;
function Yb() {
  return Cm || (Cm = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.TypeIdentifyingKeyIndex = e.MESSAGE_MEMBERS_MISSING_KEY = e.MESSAGE_MULTIPLE_MEMBERS_WITH_SAME_KEY = e.MESSAGE_MEMBER_WITH_MULTIPLE_KEYS = e.MESSAGE_OPTIONAL_TYPE_ID_KEY = void 0;
    const r = /* @__PURE__ */ Hb();
    e.MESSAGE_OPTIONAL_TYPE_ID_KEY = "Type identifying key cannot be optional", e.MESSAGE_MEMBER_WITH_MULTIPLE_KEYS = "Union has member with multiple identifying keys", e.MESSAGE_MULTIPLE_MEMBERS_WITH_SAME_KEY = "Union has multiple members with same identifying key", e.MESSAGE_MEMBERS_MISSING_KEY = "Union has members missing identifying keys";
    class t {
      constructor(i) {
        this.schema = i;
      }
      cacheKeys() {
        const i = this.schema.anyOf.length, n = /* @__PURE__ */ new Set();
        this.keyByMemberIndex = new Array(i);
        for (let u = 0; u < i; ++u) {
          const c = this.schema.anyOf[u];
          for (const [f, s] of Object.entries(c.properties))
            if (s.typeIdentifyingKey) {
              if (s[r.Optional] == "Optional")
                throw Error(e.MESSAGE_OPTIONAL_TYPE_ID_KEY);
              if (this.keyByMemberIndex[u] !== void 0)
                throw Error(e.MESSAGE_MEMBER_WITH_MULTIPLE_KEYS);
              if (n.has(f))
                throw Error(e.MESSAGE_MULTIPLE_MEMBERS_WITH_SAME_KEY);
              this.keyByMemberIndex[u] = f, n.add(f);
            }
        }
        if (n.size < i)
          throw this.keyByMemberIndex = void 0, Error(e.MESSAGE_MEMBERS_MISSING_KEY);
      }
    }
    e.TypeIdentifyingKeyIndex = t;
  }(ta)), ta;
}
var Um;
function rF() {
  if (Um) return kr;
  Um = 1;
  var e = kr && kr.__classPrivateFieldSet || function(f, s, l, a, p) {
    if (a === "m") throw new TypeError("Private method is not writable");
    if (a === "a" && !p) throw new TypeError("Private accessor was defined without a setter");
    if (typeof s == "function" ? f !== s || !p : !s.has(f)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return a === "a" ? p.call(f, l) : p ? p.value = l : s.set(f, l), l;
  }, r = kr && kr.__classPrivateFieldGet || function(f, s, l, a) {
    if (l === "a" && !a) throw new TypeError("Private accessor was defined without a getter");
    if (typeof s == "function" ? f !== s || !a : !s.has(f)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return l === "m" ? a : l === "a" ? a.call(f) : a ? a.value : s.get(f);
  }, t;
  Object.defineProperty(kr, "__esModule", { value: !0 }), kr.HeterogeneousUnionValidator = void 0;
  const o = /* @__PURE__ */ iu(), i = ou(), n = fo(), u = Yb();
  class c extends i.AbstractTypedUnionValidator {
    /** @inheritdoc */
    constructor(s) {
      super(s), t.set(this, void 0), e(this, t, new u.TypeIdentifyingKeyIndex(s), "f");
    }
    /** @inheritdoc */
    test(s) {
      const l = this.findSchemaMemberIndex(s);
      return typeof l != "number" ? !1 : o.Value.Check(this.schema.anyOf[l], s);
    }
    /** @inheritdoc */
    errors(s) {
      const l = this.findSchemaMemberIndex(s);
      if (typeof l != "number")
        return (0, n.createUnionTypeErrorIterable)(l);
      const a = this.schema.anyOf[l];
      return (0, n.createErrorsIterable)(o.Value.Errors(a, s));
    }
    assertReturningSchema(s, l) {
      const a = this.findSchemaMemberIndex(s);
      typeof a != "number" && (0, n.throwInvalidAssert)(l, a);
      const p = this.schema.anyOf[a];
      return this.uncompiledAssert(p, s, l), p;
    }
    validateReturningSchema(s, l) {
      const a = this.findSchemaMemberIndex(s);
      typeof a != "number" && (0, n.throwInvalidValidate)(l, a);
      const p = this.schema.anyOf[a];
      return this.uncompiledValidate(p, s, l), p;
    }
    findSchemaMemberIndex(s) {
      if (r(this, t, "f").keyByMemberIndex === void 0 && r(this, t, "f").cacheKeys(), typeof s == "object" && s !== null)
        for (let l = 0; l < this.schema.anyOf.length; ++l) {
          const a = r(this, t, "f").keyByMemberIndex[l];
          if (s[a] !== void 0)
            return l;
        }
      return (0, n.createUnionTypeError)(this.schema, s);
    }
  }
  return kr.HeterogeneousUnionValidator = c, t = /* @__PURE__ */ new WeakMap(), kr;
}
var en = {}, rn = {}, qm;
function Jb() {
  if (qm) return rn;
  qm = 1;
  var e = rn && rn.__classPrivateFieldSet || function(f, s, l, a, p) {
    if (a === "m") throw new TypeError("Private method is not writable");
    if (a === "a" && !p) throw new TypeError("Private accessor was defined without a setter");
    if (typeof s == "function" ? f !== s || !p : !s.has(f)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return a === "a" ? p.call(f, l) : p ? p.value = l : s.set(f, l), l;
  }, r = rn && rn.__classPrivateFieldGet || function(f, s, l, a) {
    if (l === "a" && !a) throw new TypeError("Private accessor was defined without a getter");
    if (typeof s == "function" ? f !== s || !a : !s.has(f)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return l === "m" ? a : l === "a" ? a.call(f) : a ? a.value : s.get(f);
  }, t;
  Object.defineProperty(rn, "__esModule", { value: !0 }), rn.AbstractCompilingTypedUnionValidator = void 0;
  const o = /* @__PURE__ */ iu(), i = /* @__PURE__ */ Wb(), n = ou(), u = fo();
  class c extends n.AbstractTypedUnionValidator {
    /** @inheritdoc */
    constructor(s) {
      super(s), t.set(this, void 0), e(this, t, new Array(s.anyOf.length), "f");
    }
    /** @inheritdoc */
    test(s) {
      const l = this.compiledFindSchemaMemberIndex(s);
      return this.compiledSchemaMemberTest(l, s);
    }
    /** @inheritdoc */
    errors(s) {
      const l = this.compiledFindSchemaMemberIndexOrError(s);
      return typeof l != "number" ? (0, u.createUnionTypeErrorIterable)(l) : (0, u.createErrorsIterable)(o.Value.Errors(this.schema.anyOf[l], s));
    }
    assertReturningSchema(s, l) {
      const a = this.compiledFindSchemaMemberIndexOrError(s);
      typeof a != "number" && (0, u.throwInvalidAssert)(l, a);
      const p = this.schema.anyOf[a];
      return this.compiledSchemaMemberTest(a, s) || (0, u.throwInvalidAssert)(l, o.Value.Errors(p, s).First()), p;
    }
    validateReturningSchema(s, l) {
      const a = this.compiledFindSchemaMemberIndexOrError(s);
      typeof a != "number" && (0, u.throwInvalidValidate)(l, a);
      const p = this.schema.anyOf[a];
      return this.compiledSchemaMemberTest(a, s) || (0, u.throwInvalidValidate)(l, o.Value.Errors(p, s)), p;
    }
    compiledFindSchemaMemberIndexOrError(s) {
      const l = this.compiledFindSchemaMemberIndex(s);
      return l === null ? (0, u.createUnionTypeError)(this.schema, s) : l;
    }
    compiledSchemaMemberTest(s, l) {
      if (s === null)
        return !1;
      if (r(this, t, "f")[s] === void 0) {
        let a = i.TypeCompiler.Compile(this.schema.anyOf[s]).Code();
        a = a.replace("(typeof value === 'object' && value !== null && !Array.isArray(value)) &&", "");
        const p = a.indexOf("function"), $ = a.indexOf("return", p);
        a = "return " + a.substring(a.indexOf("(", $), a.length - 1), r(this, t, "f")[s] = new Function("value", a);
      }
      return r(this, t, "f")[s](l);
    }
  }
  return rn.AbstractCompilingTypedUnionValidator = c, t = /* @__PURE__ */ new WeakMap(), rn;
}
var Nm;
function nF() {
  if (Nm) return en;
  Nm = 1;
  var e = en && en.__classPrivateFieldSet || function(c, f, s, l, a) {
    if (l === "m") throw new TypeError("Private method is not writable");
    if (l === "a" && !a) throw new TypeError("Private accessor was defined without a setter");
    if (typeof f == "function" ? c !== f || !a : !f.has(c)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return l === "a" ? a.call(c, s) : a ? a.value = s : f.set(c, s), s;
  }, r = en && en.__classPrivateFieldGet || function(c, f, s, l) {
    if (s === "a" && !l) throw new TypeError("Private accessor was defined without a getter");
    if (typeof f == "function" ? c !== f || !l : !f.has(c)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return s === "m" ? l : s === "a" ? l.call(c) : l ? l.value : f.get(c);
  }, t, o;
  Object.defineProperty(en, "__esModule", { value: !0 }), en.CompilingHeterogeneousUnionValidator = void 0;
  const i = Jb(), n = Yb();
  class u extends i.AbstractCompilingTypedUnionValidator {
    /** @inheritdoc */
    constructor(f) {
      super(f), t.set(this, void 0), o.set(this, void 0), e(this, t, new n.TypeIdentifyingKeyIndex(f), "f");
    }
    compiledFindSchemaMemberIndex(f) {
      if (r(this, o, "f") === void 0) {
        r(this, t, "f").cacheKeys();
        const s = [
          "return ((typeof value !== 'object' || value === null || Array.isArray(value)) ? null : "
        ];
        for (let l = 0; l < this.schema.anyOf.length; ++l) {
          const a = r(this, t, "f").keyByMemberIndex[l];
          s.push(`${this.toValueKeyDereference(a)} !== undefined ? ${l} : `);
        }
        e(this, o, new Function("value", s.join("") + "null)"), "f");
      }
      return r(this, o, "f").call(this, f);
    }
  }
  return en.CompilingHeterogeneousUnionValidator = u, t = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap(), en;
}
var Mo = {}, hm;
function tF() {
  if (hm) return Mo;
  hm = 1, Object.defineProperty(Mo, "__esModule", { value: !0 }), Mo.TypeIdentifyingKey = void 0;
  function e(r) {
    return Object.assign(Object.assign({}, r), { typeIdentifyingKey: !0 });
  }
  return Mo.TypeIdentifyingKey = e, Mo;
}
var Km;
function iF() {
  return Km || (Km = 1, function(e) {
    var r = Pi && Pi.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Pi && Pi.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(rF(), e), t(nF(), e), t(tF(), e);
  }(Pi)), Pi;
}
var ji = {}, nn = {}, vm;
function oF() {
  if (vm) return nn;
  vm = 1;
  var e = nn && nn.__classPrivateFieldGet || function(c, f, s, l) {
    if (s === "a" && !l) throw new TypeError("Private accessor was defined without a getter");
    if (typeof f == "function" ? c !== f || !l : !f.has(c)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return s === "m" ? l : s === "a" ? l.call(c) : l ? l.value : f.get(c);
  }, r = nn && nn.__classPrivateFieldSet || function(c, f, s, l, a) {
    if (l === "m") throw new TypeError("Private method is not writable");
    if (l === "a" && !a) throw new TypeError("Private accessor was defined without a setter");
    if (typeof f == "function" ? c !== f || !a : !f.has(c)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return l === "a" ? a.call(c, s) : a ? a.value = s : f.set(c, s), s;
  }, t;
  Object.defineProperty(nn, "__esModule", { value: !0 }), nn.DiscriminatedUnionValidator = void 0;
  const o = /* @__PURE__ */ iu(), i = ou(), n = fo();
  class u extends i.AbstractTypedUnionValidator {
    /** @inheritdoc */
    constructor(f) {
      var s;
      super(f), t.set(this, !1), this.discriminantKey = (s = this.schema.discriminantKey) !== null && s !== void 0 ? s : i.DEFAULT_DISCRIMINANT_KEY;
    }
    /** @inheritdoc */
    test(f) {
      const s = this.findSchemaMemberIndex(f);
      return typeof s != "number" ? !1 : o.Value.Check(this.schema.anyOf[s], f);
    }
    /** @inheritdoc */
    errors(f) {
      const s = this.findSchemaMemberIndex(f);
      if (typeof s != "number")
        return (0, n.createUnionTypeErrorIterable)(s);
      const l = this.schema.anyOf[s];
      return (0, n.createErrorsIterable)(o.Value.Errors(l, f));
    }
    assertReturningSchema(f, s) {
      const l = this.findSchemaMemberIndex(f);
      typeof l != "number" && (0, n.throwInvalidAssert)(s, l);
      const a = this.schema.anyOf[l];
      return this.uncompiledAssert(a, f, s), a;
    }
    validateReturningSchema(f, s) {
      const l = this.findSchemaMemberIndex(f);
      typeof l != "number" && (0, n.throwInvalidValidate)(s, l);
      const a = this.schema.anyOf[l];
      return this.uncompiledValidate(a, f, s), a;
    }
    findSchemaMemberIndex(f) {
      if (!e(this, t, "f")) {
        for (const s of this.schema.anyOf)
          if (s.properties[this.discriminantKey] === void 0)
            throw Error(`Discriminant key '${this.discriminantKey}' not present in all members of discriminated union`);
        r(this, t, !0, "f");
      }
      if (typeof f == "object" && f !== null) {
        const s = f[this.discriminantKey];
        if (s !== void 0)
          for (let l = 0; l < this.schema.anyOf.length; ++l) {
            const a = this.schema.anyOf[l].properties[this.discriminantKey];
            if (a !== void 0 && a.const === s)
              return l;
          }
      }
      return (0, n.createUnionTypeError)(this.schema, f);
    }
  }
  return nn.DiscriminatedUnionValidator = u, t = /* @__PURE__ */ new WeakMap(), nn;
}
var tn = {}, Bm;
function uF() {
  if (Bm) return tn;
  Bm = 1;
  var e = tn && tn.__classPrivateFieldSet || function(c, f, s, l, a) {
    if (l === "m") throw new TypeError("Private method is not writable");
    if (l === "a" && !a) throw new TypeError("Private accessor was defined without a setter");
    if (typeof f == "function" ? c !== f || !a : !f.has(c)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return l === "a" ? a.call(c, s) : a ? a.value = s : f.set(c, s), s;
  }, r = tn && tn.__classPrivateFieldGet || function(c, f, s, l) {
    if (s === "a" && !l) throw new TypeError("Private accessor was defined without a getter");
    if (typeof f == "function" ? c !== f || !l : !f.has(c)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return s === "m" ? l : s === "a" ? l.call(c) : l ? l.value : f.get(c);
  }, t, o;
  Object.defineProperty(tn, "__esModule", { value: !0 }), tn.CompilingDiscriminatedUnionValidator = void 0;
  const i = ou(), n = Jb();
  class u extends n.AbstractCompilingTypedUnionValidator {
    /** @inheritdoc */
    constructor(f) {
      var s;
      super(f), t.set(this, void 0), o.set(this, void 0), e(this, t, (s = this.schema.discriminantKey) !== null && s !== void 0 ? s : i.DEFAULT_DISCRIMINANT_KEY, "f");
    }
    compiledFindSchemaMemberIndex(f) {
      if (r(this, o, "f") === void 0) {
        const s = [
          `if (typeof value !== 'object' || value === null || Array.isArray(value)) return null;
          switch (${this.toValueKeyDereference(r(this, t, "f"))}) {
`
        ];
        for (let a = 0; a < this.schema.anyOf.length; ++a) {
          const p = this.schema.anyOf[a].properties[r(this, t, "f")];
          if (p === void 0)
            throw Error(`Discriminant key '${r(this, t, "f")}' not present in all members of discriminated union`);
          const $ = p.const;
          typeof $ == "string" ? s.push(`case '${$.replace(/'/g, "\\'")}': return ${a};
`) : s.push(`case ${$}: return ${a};
`);
        }
        const l = s.join("") + "default: return null; }";
        e(this, o, new Function("value", l), "f");
      }
      return r(this, o, "f").call(this, f);
    }
  }
  return tn.CompilingDiscriminatedUnionValidator = u, t = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap(), tn;
}
var Dm;
function Zb() {
  return Dm || (Dm = 1, function(e) {
    var r = ji && ji.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = ji && ji.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(oF(), e), t(uF(), e);
  }(ji)), ji;
}
var Lm;
function cF() {
  return Lm || (Lm = 1, function(e) {
    var r = Mn && Mn.__createBinding || (Object.create ? function(o, i, n, u) {
      u === void 0 && (u = n);
      var c = Object.getOwnPropertyDescriptor(i, n);
      (!c || ("get" in c ? !i.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return i[n];
      } }), Object.defineProperty(o, u, c);
    } : function(o, i, n, u) {
      u === void 0 && (u = n), o[u] = i[n];
    }), t = Mn && Mn.__exportStar || function(o, i) {
      for (var n in o) n !== "default" && !Object.prototype.hasOwnProperty.call(i, n) && r(i, o, n);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), t(hf(), e), t(Kf(), e), t(ou(), e), t(eF(), e), t(iF(), e), t(Zb(), e), t(zb(), e);
  }(Mn)), Mn;
}
var Vm = cF(), sF = Zb();
class aF extends Vm.StandardValidator {
  cleanCopyOfValue(r, t) {
    if (H_(r)) {
      const o = r;
      if (o.discriminantKey) {
        const n = new sF.DiscriminatedUnionValidator(
          o
        ).validateAndCleanCopy(
          t
        ), u = o.anyOf.find(
          (c) => {
            var f;
            return ((f = c.properties[o.discriminantKey]) == null ? void 0 : f.const) === n[o.discriminantKey];
          }
        );
        return u ? this.cleanNestedObject(u, n) : n;
      } else
        return new Vm.StandardValidator(o).validateAndCleanCopy(
          t
        );
    }
    if (r.type === "object" && typeof t == "object")
      return this.cleanNestedObject(r, t);
    if (r.type === "array" && Array.isArray(t)) {
      const o = r.items;
      return t.map(
        (i) => this.cleanCopyOfValue(o, i)
      );
    }
    return t;
  }
  cleanNestedObject(r, t) {
    if (!r.properties || typeof t != "object" || t === null)
      return t;
    const o = {};
    return Object.keys(r.properties).forEach((i) => {
      var c;
      const n = (c = r.properties) == null ? void 0 : c[i], u = t[i];
      o[i] = this.cleanCopyOfValue(n, u);
    }), o;
  }
}
const Ti = class Ti {
  constructor(r) {
    this.typeBox = r;
  }
  static getInstance(r) {
    return Ti.instance || (Ti.instance = new Ti(r)), Ti.instance;
  }
  /**
   * Asserts that data matches the schema for the given kind.
   *
   * Supports custom validation through schema['validate'] function:
   *
   * ```typescript
   * const EmailSchema = Type.String({
   *   format: 'email',
   *   validate: (value: string) => {
   *     return value.includes('@company.com')
   *   }
   * })
   * ```
   *
   * Custom validation runs before standard TypeBox validation.
   * If custom validation fails, throws error with provided message.
   *
   * @throws {Error} When validation fails
   */
  asserts(r, t, o) {
    const i = this.typeBox.tSchema(r), n = this.createValidator(i);
    try {
      return this.runCustomValidation(i, t, o == null ? void 0 : o.message), n.assert(t, o == null ? void 0 : o.message);
    } catch (u) {
      throw new Error(u);
    }
  }
  /**
   * Create facade for commonly used methods
   */
  assertsDefined(r, t) {
    try {
      return this.asserts(W_, r, {
        message: t ?? "Data should be defined"
      });
    } catch (o) {
      throw new Error(o);
    }
  }
  /**
   * Validates and cleans data according to the schema for the given kind.
   * Removes any properties not defined in the schema.
   *
   * @throws {Error} When validation fails
   */
  parse(r, t, o) {
    const i = this.createValidator(r);
    return this.runCustomValidation(r, t, o == null ? void 0 : o.message), i.validateAndCleanCopy(t);
  }
  /**
   * Parses a value or throws an `AssertError` if invalid
   *
   * Using `Value.Parse` caused circular dep issue inside `@computed`
   *
   * https://github.com/sinclairzx81/typebox?tab=readme-ov-file#parse
   */
  parseDefined(r) {
    if (!Q_(fn, r))
      throw new Error("Data should be defined");
    return r;
  }
  /**
   * Extends typebox `SchemaOptions` with custom `validate` key
   */
  validate(r, t) {
    const o = this.typeBox.tSchema(r), n = this.createValidator(o).test(t);
    return o.validate ? n && o.validate(t) : n;
  }
  /**
   * Validates data against a provided schema
   */
  validateSchema(r, t) {
    const o = this.createValidator(r);
    return this.runCustomValidation(r, t), o.validate(t), t;
  }
  createValidator(r) {
    return new aF(r);
  }
  /**
   * Run custom validation on Typebox schema
   *
   * Type.Object({}, { validate: (data: unknown) => { return true } })
   */
  runCustomValidation(r, t, o) {
    const i = r.validate;
    if (i && !i(t))
      throw new Error(o || "Validation failed");
  }
};
Vs(Ti, "instance");
let fa = Ti;
const $i = class $i {
  constructor(r) {
    this.config = r, this.registerFormats(), this.registerTypes();
  }
  static getInstance(r) {
    return $i.instance || ($i.instance = new $i(r)), $i.instance;
  }
  assertHasRegistry(r) {
    if (!Ma(r[re]))
      throw new Error(`Please register @codelab/${r} to Typebox first`);
  }
  tSchema(r) {
    const t = this.config.schemaKindMap.find(([o]) => o === r);
    if (!t)
      throw console.error("Failed to find schema for kind:", r), console.error(
        "Available schemas:",
        this.config.schemaKindMap.map(([o]) => o)
      ), new Error("Schema not found");
    return t[1];
  }
  registerFormat(r, t) {
    GI(r, t);
  }
  registerFormats() {
    for (const [r, t] of this.config.formatMap)
      this.registerFormat(r, t);
  }
  registerType(r, t) {
    zI(r[re], (o, i) => Q_(t, i));
  }
  registerTypes() {
    for (const [r, t] of this.config.schemaKindMap)
      this.registerType(r, t);
  }
};
Vs($i, "instance");
let da = $i;
const fF = [
  [Q1, X1],
  [z_, Za],
  [rj, nj],
  [J1, Z1],
  [k1, ej],
  [W1, Y1],
  [W_, fn],
  [cj, sj],
  [tj, ij]
], dF = [["ipv4", uj]], lF = da.getInstance({
  formatMap: dF,
  schemaKindMap: fF
}), yF = fa.getInstance(lF), mF = {
  DiscriminatedRef: G1,
  IsUnion: H_,
  Nullish: B1,
  OmitOwner: D1,
  Overwrite: V1,
  RefSchema: Za,
  Serialized: z1,
  TRef: z_
};
export {
  Z1 as AllOrNoneSchema,
  Y1 as AllSchema,
  X1 as AtLeastOneSchema,
  ej as AtMostOneSchema,
  fn as DefinedSchema,
  nj as ExactlyOneSchema,
  ij as Ipv4Schema,
  uj as IsIPv4,
  sj as NoneSchema,
  W1 as TAll,
  J1 as TAllOrNone,
  Q1 as TAtLeastOne,
  k1 as TAtMostOne,
  W_ as TDefined,
  rj as TExactlyOne,
  tj as TIpv4,
  cj as TNone,
  mF as Typebox,
  fa as ValidationService,
  yF as Validator
};
