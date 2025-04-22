var Ks = Object.defineProperty;
var Zs = (t, e, r) => e in t ? Ks(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var D = (t, e, r) => Zs(t, typeof e != "symbol" ? e + "" : e, r);
var Qr = function(t, e) {
  return Qr = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
    r.__proto__ = n;
  } || function(r, n) {
    for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (r[i] = n[i]);
  }, Qr(t, e);
};
function he(t, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  Qr(t, e);
  function r() {
    this.constructor = t;
  }
  t.prototype = e === null ? Object.create(e) : (r.prototype = e.prototype, new r());
}
var y = function() {
  return y = Object.assign || function(e) {
    for (var r, n = 1, i = arguments.length; n < i; n++) {
      r = arguments[n];
      for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (e[a] = r[a]);
    }
    return e;
  }, y.apply(this, arguments);
};
function ve(t, e) {
  var r = {};
  for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e.indexOf(n) < 0 && (r[n] = t[n]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, n = Object.getOwnPropertySymbols(t); i < n.length; i++)
      e.indexOf(n[i]) < 0 && Object.prototype.propertyIsEnumerable.call(t, n[i]) && (r[n[i]] = t[n[i]]);
  return r;
}
function _e(t, e, r, n) {
  function i(a) {
    return a instanceof r ? a : new r(function(s) {
      s(a);
    });
  }
  return new (r || (r = Promise))(function(a, s) {
    function o(f) {
      try {
        c(n.next(f));
      } catch (d) {
        s(d);
      }
    }
    function u(f) {
      try {
        c(n.throw(f));
      } catch (d) {
        s(d);
      }
    }
    function c(f) {
      f.done ? a(f.value) : i(f.value).then(o, u);
    }
    c((n = n.apply(t, e || [])).next());
  });
}
function we(t, e) {
  var r = { label: 0, sent: function() {
    if (a[0] & 1) throw a[1];
    return a[1];
  }, trys: [], ops: [] }, n, i, a, s;
  return s = { next: o(0), throw: o(1), return: o(2) }, typeof Symbol == "function" && (s[Symbol.iterator] = function() {
    return this;
  }), s;
  function o(c) {
    return function(f) {
      return u([c, f]);
    };
  }
  function u(c) {
    if (n) throw new TypeError("Generator is already executing.");
    for (; s && (s = 0, c[0] && (r = 0)), r; ) try {
      if (n = 1, i && (a = c[0] & 2 ? i.return : c[0] ? i.throw || ((a = i.return) && a.call(i), 0) : i.next) && !(a = a.call(i, c[1])).done) return a;
      switch (i = 0, a && (c = [c[0] & 2, a.value]), c[0]) {
        case 0:
        case 1:
          a = c;
          break;
        case 4:
          return r.label++, { value: c[1], done: !1 };
        case 5:
          r.label++, i = c[1], c = [0];
          continue;
        case 7:
          c = r.ops.pop(), r.trys.pop();
          continue;
        default:
          if (a = r.trys, !(a = a.length > 0 && a[a.length - 1]) && (c[0] === 6 || c[0] === 2)) {
            r = 0;
            continue;
          }
          if (c[0] === 3 && (!a || c[1] > a[0] && c[1] < a[3])) {
            r.label = c[1];
            break;
          }
          if (c[0] === 6 && r.label < a[1]) {
            r.label = a[1], a = c;
            break;
          }
          if (a && r.label < a[2]) {
            r.label = a[2], r.ops.push(c);
            break;
          }
          a[2] && r.ops.pop(), r.trys.pop();
          continue;
      }
      c = e.call(t, r);
    } catch (f) {
      c = [6, f], i = 0;
    } finally {
      n = a = 0;
    }
    if (c[0] & 5) throw c[1];
    return { value: c[0] ? c[1] : void 0, done: !0 };
  }
}
function re(t, e, r) {
  if (r || arguments.length === 2) for (var n = 0, i = e.length, a; n < i; n++)
    (a || !(n in e)) && (a || (a = Array.prototype.slice.call(e, 0, n)), a[n] = e[n]);
  return t.concat(a || Array.prototype.slice.call(e));
}
var Zt = "Invariant Violation", zn = Object.setPrototypeOf, eo = zn === void 0 ? function(t, e) {
  return t.__proto__ = e, t;
} : zn, Oa = (
  /** @class */
  function(t) {
    he(e, t);
    function e(r) {
      r === void 0 && (r = Zt);
      var n = t.call(this, typeof r == "number" ? Zt + ": " + r + " (see https://github.com/apollographql/invariant-packages)" : r) || this;
      return n.framesToPop = 1, n.name = Zt, eo(n, e.prototype), n;
    }
    return e;
  }(Error)
);
function Ce(t, e) {
  if (!t)
    throw new Oa(e);
}
var Ta = ["debug", "log", "warn", "error", "silent"], to = Ta.indexOf("log");
function kt(t) {
  return function() {
    if (Ta.indexOf(t) >= to) {
      var e = console[t] || console.log;
      return e.apply(console, arguments);
    }
  };
}
(function(t) {
  t.debug = kt("debug"), t.log = kt("log"), t.warn = kt("warn"), t.error = kt("error");
})(Ce || (Ce = {}));
var gn = "3.12.3";
function fe(t) {
  try {
    return t();
  } catch {
  }
}
const zr = fe(function() {
  return globalThis;
}) || fe(function() {
  return window;
}) || fe(function() {
  return self;
}) || fe(function() {
  return global;
}) || // We don't expect the Function constructor ever to be invoked at runtime, as
// long as at least one of globalThis, window, self, or global is defined, so
// we are under no obligation to make it easy for static analysis tools to
// detect syntactic usage of the Function constructor. If you think you can
// improve your static analysis to detect this obfuscation, think again. This
// is an arms race you cannot win, at least not in JavaScript.
fe(function() {
  return fe.constructor("return this")();
});
var Wn = /* @__PURE__ */ new Map();
function Wr(t) {
  var e = Wn.get(t) || 1;
  return Wn.set(t, e + 1), "".concat(t, ":").concat(e, ":").concat(Math.random().toString(36).slice(2));
}
function Ia(t, e) {
  e === void 0 && (e = 0);
  var r = Wr("stringifyForDisplay");
  return JSON.stringify(t, function(n, i) {
    return i === void 0 ? r : i;
  }, e).split(JSON.stringify(r)).join("<undefined>");
}
function Nt(t) {
  return function(e) {
    for (var r = [], n = 1; n < arguments.length; n++)
      r[n - 1] = arguments[n];
    if (typeof e == "number") {
      var i = e;
      e = bn(i), e || (e = En(i, r), r = []);
    }
    t.apply(void 0, [e].concat(r));
  };
}
var k = Object.assign(function(e, r) {
  for (var n = [], i = 2; i < arguments.length; i++)
    n[i - 2] = arguments[i];
  e || Ce(e, bn(r, n) || En(r, n));
}, {
  debug: Nt(Ce.debug),
  log: Nt(Ce.log),
  warn: Nt(Ce.warn),
  error: Nt(Ce.error)
});
function ie(t) {
  for (var e = [], r = 1; r < arguments.length; r++)
    e[r - 1] = arguments[r];
  return new Oa(bn(t, e) || En(t, e));
}
var $n = Symbol.for("ApolloErrorMessageHandler_" + gn);
function ka(t) {
  if (typeof t == "string")
    return t;
  try {
    return Ia(t, 2).slice(0, 1e3);
  } catch {
    return "<non-serializable>";
  }
}
function bn(t, e) {
  if (e === void 0 && (e = []), !!t)
    return zr[$n] && zr[$n](t, e.map(ka));
}
function En(t, e) {
  if (e === void 0 && (e = []), !!t)
    return "An error occurred! For more details, see the full error text at https://go.apollo.dev/c/err#".concat(encodeURIComponent(JSON.stringify({
      version: gn,
      message: t,
      args: e.map(ka)
    })));
}
function At(t, e) {
  if (!!!t)
    throw new Error(e);
}
function ro(t) {
  return typeof t == "object" && t !== null;
}
function no(t, e) {
  if (!!!t)
    throw new Error(
      "Unexpected invariant triggered."
    );
}
const io = /\r\n|[\n\r]/g;
function $r(t, e) {
  let r = 0, n = 1;
  for (const i of t.body.matchAll(io)) {
    if (typeof i.index == "number" || no(!1), i.index >= e)
      break;
    r = i.index + i[0].length, n += 1;
  }
  return {
    line: n,
    column: e + 1 - r
  };
}
function ao(t) {
  return Na(
    t.source,
    $r(t.source, t.start)
  );
}
function Na(t, e) {
  const r = t.locationOffset.column - 1, n = "".padStart(r) + t.body, i = e.line - 1, a = t.locationOffset.line - 1, s = e.line + a, o = e.line === 1 ? r : 0, u = e.column + o, c = `${t.name}:${s}:${u}
`, f = n.split(/\r\n|[\n\r]/g), d = f[i];
  if (d.length > 120) {
    const l = Math.floor(u / 80), h = u % 80, v = [];
    for (let m = 0; m < d.length; m += 80)
      v.push(d.slice(m, m + 80));
    return c + Hn([
      [`${s} |`, v[0]],
      ...v.slice(1, l + 1).map((m) => ["|", m]),
      ["|", "^".padStart(h)],
      ["|", v[l + 1]]
    ]);
  }
  return c + Hn([
    // Lines specified like this: ["prefix", "string"],
    [`${s - 1} |`, f[i - 1]],
    [`${s} |`, d],
    ["|", "^".padStart(u)],
    [`${s + 1} |`, f[i + 1]]
  ]);
}
function Hn(t) {
  const e = t.filter(([n, i]) => i !== void 0), r = Math.max(...e.map(([n]) => n.length));
  return e.map(([n, i]) => n.padStart(r) + (i ? " " + i : "")).join(`
`);
}
function so(t) {
  const e = t[0];
  return e == null || "kind" in e || "length" in e ? {
    nodes: e,
    source: t[1],
    positions: t[2],
    path: t[3],
    originalError: t[4],
    extensions: t[5]
  } : e;
}
class _n extends Error {
  /**
   * An array of `{ line, column }` locations within the source GraphQL document
   * which correspond to this error.
   *
   * Errors during validation often contain multiple locations, for example to
   * point out two things with the same name. Errors during execution include a
   * single location, the field which produced the error.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */
  /**
   * An array describing the JSON-path into the execution response which
   * corresponds to this error. Only included for errors during execution.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */
  /**
   * An array of GraphQL AST Nodes corresponding to this error.
   */
  /**
   * The source GraphQL document for the first location of this error.
   *
   * Note that if this Error represents more than one node, the source may not
   * represent nodes after the first node.
   */
  /**
   * An array of character offsets within the source GraphQL document
   * which correspond to this error.
   */
  /**
   * The original error thrown from a field resolver during execution.
   */
  /**
   * Extension fields to add to the formatted error.
   */
  /**
   * @deprecated Please use the `GraphQLErrorOptions` constructor overload instead.
   */
  constructor(e, ...r) {
    var n, i, a;
    const { nodes: s, source: o, positions: u, path: c, originalError: f, extensions: d } = so(r);
    super(e), this.name = "GraphQLError", this.path = c ?? void 0, this.originalError = f ?? void 0, this.nodes = Gn(
      Array.isArray(s) ? s : s ? [s] : void 0
    );
    const l = Gn(
      (n = this.nodes) === null || n === void 0 ? void 0 : n.map((v) => v.loc).filter((v) => v != null)
    );
    this.source = o ?? (l == null || (i = l[0]) === null || i === void 0 ? void 0 : i.source), this.positions = u ?? (l == null ? void 0 : l.map((v) => v.start)), this.locations = u && o ? u.map((v) => $r(o, v)) : l == null ? void 0 : l.map((v) => $r(v.source, v.start));
    const h = ro(
      f == null ? void 0 : f.extensions
    ) ? f == null ? void 0 : f.extensions : void 0;
    this.extensions = (a = d ?? h) !== null && a !== void 0 ? a : /* @__PURE__ */ Object.create(null), Object.defineProperties(this, {
      message: {
        writable: !0,
        enumerable: !0
      },
      name: {
        enumerable: !1
      },
      nodes: {
        enumerable: !1
      },
      source: {
        enumerable: !1
      },
      positions: {
        enumerable: !1
      },
      originalError: {
        enumerable: !1
      }
    }), f != null && f.stack ? Object.defineProperty(this, "stack", {
      value: f.stack,
      writable: !0,
      configurable: !0
    }) : Error.captureStackTrace ? Error.captureStackTrace(this, _n) : Object.defineProperty(this, "stack", {
      value: Error().stack,
      writable: !0,
      configurable: !0
    });
  }
  get [Symbol.toStringTag]() {
    return "GraphQLError";
  }
  toString() {
    let e = this.message;
    if (this.nodes)
      for (const r of this.nodes)
        r.loc && (e += `

` + ao(r.loc));
    else if (this.source && this.locations)
      for (const r of this.locations)
        e += `

` + Na(this.source, r);
    return e;
  }
  toJSON() {
    const e = {
      message: this.message
    };
    return this.locations != null && (e.locations = this.locations), this.path != null && (e.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (e.extensions = this.extensions), e;
  }
}
function Gn(t) {
  return t === void 0 || t.length === 0 ? void 0 : t;
}
function X(t, e, r) {
  return new _n(`Syntax Error: ${r}`, {
    source: t,
    positions: [e]
  });
}
class oo {
  /**
   * The character offset at which this Node begins.
   */
  /**
   * The character offset at which this Node ends.
   */
  /**
   * The Token at which this Node begins.
   */
  /**
   * The Token at which this Node ends.
   */
  /**
   * The Source document the AST represents.
   */
  constructor(e, r, n) {
    this.start = e.start, this.end = r.end, this.startToken = e, this.endToken = r, this.source = n;
  }
  get [Symbol.toStringTag]() {
    return "Location";
  }
  toJSON() {
    return {
      start: this.start,
      end: this.end
    };
  }
}
class Da {
  /**
   * The kind of Token.
   */
  /**
   * The character offset at which this Node begins.
   */
  /**
   * The character offset at which this Node ends.
   */
  /**
   * The 1-indexed line number on which this Token appears.
   */
  /**
   * The 1-indexed column number at which this Token begins.
   */
  /**
   * For non-punctuation tokens, represents the interpreted value of the token.
   *
   * Note: is undefined for punctuation tokens, but typed as string for
   * convenience in the parser.
   */
  /**
   * Tokens exist as nodes in a double-linked-list amongst all tokens
   * including ignored tokens. <SOF> is always the first node and <EOF>
   * the last.
   */
  constructor(e, r, n, i, a, s) {
    this.kind = e, this.start = r, this.end = n, this.line = i, this.column = a, this.value = s, this.prev = null, this.next = null;
  }
  get [Symbol.toStringTag]() {
    return "Token";
  }
  toJSON() {
    return {
      kind: this.kind,
      value: this.value,
      line: this.line,
      column: this.column
    };
  }
}
const xa = {
  Name: [],
  Document: ["definitions"],
  OperationDefinition: [
    "name",
    "variableDefinitions",
    "directives",
    "selectionSet"
  ],
  VariableDefinition: ["variable", "type", "defaultValue", "directives"],
  Variable: ["name"],
  SelectionSet: ["selections"],
  Field: ["alias", "name", "arguments", "directives", "selectionSet"],
  Argument: ["name", "value"],
  FragmentSpread: ["name", "directives"],
  InlineFragment: ["typeCondition", "directives", "selectionSet"],
  FragmentDefinition: [
    "name",
    // Note: fragment variable definitions are deprecated and will removed in v17.0.0
    "variableDefinitions",
    "typeCondition",
    "directives",
    "selectionSet"
  ],
  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ["values"],
  ObjectValue: ["fields"],
  ObjectField: ["name", "value"],
  Directive: ["name", "arguments"],
  NamedType: ["name"],
  ListType: ["type"],
  NonNullType: ["type"],
  SchemaDefinition: ["description", "directives", "operationTypes"],
  OperationTypeDefinition: ["type"],
  ScalarTypeDefinition: ["description", "name", "directives"],
  ObjectTypeDefinition: [
    "description",
    "name",
    "interfaces",
    "directives",
    "fields"
  ],
  FieldDefinition: ["description", "name", "arguments", "type", "directives"],
  InputValueDefinition: [
    "description",
    "name",
    "type",
    "defaultValue",
    "directives"
  ],
  InterfaceTypeDefinition: [
    "description",
    "name",
    "interfaces",
    "directives",
    "fields"
  ],
  UnionTypeDefinition: ["description", "name", "directives", "types"],
  EnumTypeDefinition: ["description", "name", "directives", "values"],
  EnumValueDefinition: ["description", "name", "directives"],
  InputObjectTypeDefinition: ["description", "name", "directives", "fields"],
  DirectiveDefinition: ["description", "name", "arguments", "locations"],
  SchemaExtension: ["directives", "operationTypes"],
  ScalarTypeExtension: ["name", "directives"],
  ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
  InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
  UnionTypeExtension: ["name", "directives", "types"],
  EnumTypeExtension: ["name", "directives", "values"],
  InputObjectTypeExtension: ["name", "directives", "fields"]
}, uo = new Set(Object.keys(xa));
function Jn(t) {
  const e = t == null ? void 0 : t.kind;
  return typeof e == "string" && uo.has(e);
}
var Fe;
(function(t) {
  t.QUERY = "query", t.MUTATION = "mutation", t.SUBSCRIPTION = "subscription";
})(Fe || (Fe = {}));
var Hr;
(function(t) {
  t.QUERY = "QUERY", t.MUTATION = "MUTATION", t.SUBSCRIPTION = "SUBSCRIPTION", t.FIELD = "FIELD", t.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", t.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", t.INLINE_FRAGMENT = "INLINE_FRAGMENT", t.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", t.SCHEMA = "SCHEMA", t.SCALAR = "SCALAR", t.OBJECT = "OBJECT", t.FIELD_DEFINITION = "FIELD_DEFINITION", t.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", t.INTERFACE = "INTERFACE", t.UNION = "UNION", t.ENUM = "ENUM", t.ENUM_VALUE = "ENUM_VALUE", t.INPUT_OBJECT = "INPUT_OBJECT", t.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})(Hr || (Hr = {}));
var T;
(function(t) {
  t.NAME = "Name", t.DOCUMENT = "Document", t.OPERATION_DEFINITION = "OperationDefinition", t.VARIABLE_DEFINITION = "VariableDefinition", t.SELECTION_SET = "SelectionSet", t.FIELD = "Field", t.ARGUMENT = "Argument", t.FRAGMENT_SPREAD = "FragmentSpread", t.INLINE_FRAGMENT = "InlineFragment", t.FRAGMENT_DEFINITION = "FragmentDefinition", t.VARIABLE = "Variable", t.INT = "IntValue", t.FLOAT = "FloatValue", t.STRING = "StringValue", t.BOOLEAN = "BooleanValue", t.NULL = "NullValue", t.ENUM = "EnumValue", t.LIST = "ListValue", t.OBJECT = "ObjectValue", t.OBJECT_FIELD = "ObjectField", t.DIRECTIVE = "Directive", t.NAMED_TYPE = "NamedType", t.LIST_TYPE = "ListType", t.NON_NULL_TYPE = "NonNullType", t.SCHEMA_DEFINITION = "SchemaDefinition", t.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", t.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", t.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", t.FIELD_DEFINITION = "FieldDefinition", t.INPUT_VALUE_DEFINITION = "InputValueDefinition", t.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", t.UNION_TYPE_DEFINITION = "UnionTypeDefinition", t.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", t.ENUM_VALUE_DEFINITION = "EnumValueDefinition", t.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", t.DIRECTIVE_DEFINITION = "DirectiveDefinition", t.SCHEMA_EXTENSION = "SchemaExtension", t.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", t.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", t.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", t.UNION_TYPE_EXTENSION = "UnionTypeExtension", t.ENUM_TYPE_EXTENSION = "EnumTypeExtension", t.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension";
})(T || (T = {}));
function Gr(t) {
  return t === 9 || t === 32;
}
function gt(t) {
  return t >= 48 && t <= 57;
}
function Aa(t) {
  return t >= 97 && t <= 122 || // A-Z
  t >= 65 && t <= 90;
}
function Ra(t) {
  return Aa(t) || t === 95;
}
function co(t) {
  return Aa(t) || gt(t) || t === 95;
}
function fo(t) {
  var e;
  let r = Number.MAX_SAFE_INTEGER, n = null, i = -1;
  for (let s = 0; s < t.length; ++s) {
    var a;
    const o = t[s], u = lo(o);
    u !== o.length && (n = (a = n) !== null && a !== void 0 ? a : s, i = s, s !== 0 && u < r && (r = u));
  }
  return t.map((s, o) => o === 0 ? s : s.slice(r)).slice(
    (e = n) !== null && e !== void 0 ? e : 0,
    i + 1
  );
}
function lo(t) {
  let e = 0;
  for (; e < t.length && Gr(t.charCodeAt(e)); )
    ++e;
  return e;
}
function ho(t, e) {
  const r = t.replace(/"""/g, '\\"""'), n = r.split(/\r\n|[\n\r]/g), i = n.length === 1, a = n.length > 1 && n.slice(1).every((h) => h.length === 0 || Gr(h.charCodeAt(0))), s = r.endsWith('\\"""'), o = t.endsWith('"') && !s, u = t.endsWith("\\"), c = o || u, f = (
    // add leading and trailing new lines only if it improves readability
    !i || t.length > 70 || c || a || s
  );
  let d = "";
  const l = i && Gr(t.charCodeAt(0));
  return (f && !l || a) && (d += `
`), d += r, (f || c) && (d += `
`), '"""' + d + '"""';
}
var _;
(function(t) {
  t.SOF = "<SOF>", t.EOF = "<EOF>", t.BANG = "!", t.DOLLAR = "$", t.AMP = "&", t.PAREN_L = "(", t.PAREN_R = ")", t.SPREAD = "...", t.COLON = ":", t.EQUALS = "=", t.AT = "@", t.BRACKET_L = "[", t.BRACKET_R = "]", t.BRACE_L = "{", t.PIPE = "|", t.BRACE_R = "}", t.NAME = "Name", t.INT = "Int", t.FLOAT = "Float", t.STRING = "String", t.BLOCK_STRING = "BlockString", t.COMMENT = "Comment";
})(_ || (_ = {}));
class po {
  /**
   * The previously focused non-ignored token.
   */
  /**
   * The currently focused non-ignored token.
   */
  /**
   * The (1-indexed) line containing the current token.
   */
  /**
   * The character offset at which the current line begins.
   */
  constructor(e) {
    const r = new Da(_.SOF, 0, 0, 0, 0);
    this.source = e, this.lastToken = r, this.token = r, this.line = 1, this.lineStart = 0;
  }
  get [Symbol.toStringTag]() {
    return "Lexer";
  }
  /**
   * Advances the token stream to the next non-ignored token.
   */
  advance() {
    return this.lastToken = this.token, this.token = this.lookahead();
  }
  /**
   * Looks ahead and returns the next non-ignored token, but does not change
   * the state of Lexer.
   */
  lookahead() {
    let e = this.token;
    if (e.kind !== _.EOF)
      do
        if (e.next)
          e = e.next;
        else {
          const r = vo(this, e.end);
          e.next = r, r.prev = e, e = r;
        }
      while (e.kind === _.COMMENT);
    return e;
  }
}
function yo(t) {
  return t === _.BANG || t === _.DOLLAR || t === _.AMP || t === _.PAREN_L || t === _.PAREN_R || t === _.SPREAD || t === _.COLON || t === _.EQUALS || t === _.AT || t === _.BRACKET_L || t === _.BRACKET_R || t === _.BRACE_L || t === _.PIPE || t === _.BRACE_R;
}
function rt(t) {
  return t >= 0 && t <= 55295 || t >= 57344 && t <= 1114111;
}
function Qt(t, e) {
  return Ca(t.charCodeAt(e)) && Pa(t.charCodeAt(e + 1));
}
function Ca(t) {
  return t >= 55296 && t <= 56319;
}
function Pa(t) {
  return t >= 56320 && t <= 57343;
}
function Le(t, e) {
  const r = t.source.body.codePointAt(e);
  if (r === void 0)
    return _.EOF;
  if (r >= 32 && r <= 126) {
    const n = String.fromCodePoint(r);
    return n === '"' ? `'"'` : `"${n}"`;
  }
  return "U+" + r.toString(16).toUpperCase().padStart(4, "0");
}
function J(t, e, r, n, i) {
  const a = t.line, s = 1 + r - t.lineStart;
  return new Da(e, r, n, a, s, i);
}
function vo(t, e) {
  const r = t.source.body, n = r.length;
  let i = e;
  for (; i < n; ) {
    const a = r.charCodeAt(i);
    switch (a) {
      // Ignored ::
      //   - UnicodeBOM
      //   - WhiteSpace
      //   - LineTerminator
      //   - Comment
      //   - Comma
      //
      // UnicodeBOM :: "Byte Order Mark (U+FEFF)"
      //
      // WhiteSpace ::
      //   - "Horizontal Tab (U+0009)"
      //   - "Space (U+0020)"
      //
      // Comma :: ,
      case 65279:
      // <BOM>
      case 9:
      // \t
      case 32:
      // <space>
      case 44:
        ++i;
        continue;
      // LineTerminator ::
      //   - "New Line (U+000A)"
      //   - "Carriage Return (U+000D)" [lookahead != "New Line (U+000A)"]
      //   - "Carriage Return (U+000D)" "New Line (U+000A)"
      case 10:
        ++i, ++t.line, t.lineStart = i;
        continue;
      case 13:
        r.charCodeAt(i + 1) === 10 ? i += 2 : ++i, ++t.line, t.lineStart = i;
        continue;
      // Comment
      case 35:
        return mo(t, i);
      // Token ::
      //   - Punctuator
      //   - Name
      //   - IntValue
      //   - FloatValue
      //   - StringValue
      //
      // Punctuator :: one of ! $ & ( ) ... : = @ [ ] { | }
      case 33:
        return J(t, _.BANG, i, i + 1);
      case 36:
        return J(t, _.DOLLAR, i, i + 1);
      case 38:
        return J(t, _.AMP, i, i + 1);
      case 40:
        return J(t, _.PAREN_L, i, i + 1);
      case 41:
        return J(t, _.PAREN_R, i, i + 1);
      case 46:
        if (r.charCodeAt(i + 1) === 46 && r.charCodeAt(i + 2) === 46)
          return J(t, _.SPREAD, i, i + 3);
        break;
      case 58:
        return J(t, _.COLON, i, i + 1);
      case 61:
        return J(t, _.EQUALS, i, i + 1);
      case 64:
        return J(t, _.AT, i, i + 1);
      case 91:
        return J(t, _.BRACKET_L, i, i + 1);
      case 93:
        return J(t, _.BRACKET_R, i, i + 1);
      case 123:
        return J(t, _.BRACE_L, i, i + 1);
      case 124:
        return J(t, _.PIPE, i, i + 1);
      case 125:
        return J(t, _.BRACE_R, i, i + 1);
      // StringValue
      case 34:
        return r.charCodeAt(i + 1) === 34 && r.charCodeAt(i + 2) === 34 ? So(t, i) : bo(t, i);
    }
    if (gt(a) || a === 45)
      return go(t, i, a);
    if (Ra(a))
      return Oo(t, i);
    throw X(
      t.source,
      i,
      a === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : rt(a) || Qt(r, i) ? `Unexpected character: ${Le(t, i)}.` : `Invalid character: ${Le(t, i)}.`
    );
  }
  return J(t, _.EOF, n, n);
}
function mo(t, e) {
  const r = t.source.body, n = r.length;
  let i = e + 1;
  for (; i < n; ) {
    const a = r.charCodeAt(i);
    if (a === 10 || a === 13)
      break;
    if (rt(a))
      ++i;
    else if (Qt(r, i))
      i += 2;
    else
      break;
  }
  return J(
    t,
    _.COMMENT,
    e,
    i,
    r.slice(e + 1, i)
  );
}
function go(t, e, r) {
  const n = t.source.body;
  let i = e, a = r, s = !1;
  if (a === 45 && (a = n.charCodeAt(++i)), a === 48) {
    if (a = n.charCodeAt(++i), gt(a))
      throw X(
        t.source,
        i,
        `Invalid number, unexpected digit after 0: ${Le(
          t,
          i
        )}.`
      );
  } else
    i = er(t, i, a), a = n.charCodeAt(i);
  if (a === 46 && (s = !0, a = n.charCodeAt(++i), i = er(t, i, a), a = n.charCodeAt(i)), (a === 69 || a === 101) && (s = !0, a = n.charCodeAt(++i), (a === 43 || a === 45) && (a = n.charCodeAt(++i)), i = er(t, i, a), a = n.charCodeAt(i)), a === 46 || Ra(a))
    throw X(
      t.source,
      i,
      `Invalid number, expected digit but got: ${Le(
        t,
        i
      )}.`
    );
  return J(
    t,
    s ? _.FLOAT : _.INT,
    e,
    i,
    n.slice(e, i)
  );
}
function er(t, e, r) {
  if (!gt(r))
    throw X(
      t.source,
      e,
      `Invalid number, expected digit but got: ${Le(
        t,
        e
      )}.`
    );
  const n = t.source.body;
  let i = e + 1;
  for (; gt(n.charCodeAt(i)); )
    ++i;
  return i;
}
function bo(t, e) {
  const r = t.source.body, n = r.length;
  let i = e + 1, a = i, s = "";
  for (; i < n; ) {
    const o = r.charCodeAt(i);
    if (o === 34)
      return s += r.slice(a, i), J(t, _.STRING, e, i + 1, s);
    if (o === 92) {
      s += r.slice(a, i);
      const u = r.charCodeAt(i + 1) === 117 ? r.charCodeAt(i + 2) === 123 ? Eo(t, i) : _o(t, i) : wo(t, i);
      s += u.value, i += u.size, a = i;
      continue;
    }
    if (o === 10 || o === 13)
      break;
    if (rt(o))
      ++i;
    else if (Qt(r, i))
      i += 2;
    else
      throw X(
        t.source,
        i,
        `Invalid character within String: ${Le(
          t,
          i
        )}.`
      );
  }
  throw X(t.source, i, "Unterminated string.");
}
function Eo(t, e) {
  const r = t.source.body;
  let n = 0, i = 3;
  for (; i < 12; ) {
    const a = r.charCodeAt(e + i++);
    if (a === 125) {
      if (i < 5 || !rt(n))
        break;
      return {
        value: String.fromCodePoint(n),
        size: i
      };
    }
    if (n = n << 4 | ht(a), n < 0)
      break;
  }
  throw X(
    t.source,
    e,
    `Invalid Unicode escape sequence: "${r.slice(
      e,
      e + i
    )}".`
  );
}
function _o(t, e) {
  const r = t.source.body, n = Yn(r, e + 2);
  if (rt(n))
    return {
      value: String.fromCodePoint(n),
      size: 6
    };
  if (Ca(n) && r.charCodeAt(e + 6) === 92 && r.charCodeAt(e + 7) === 117) {
    const i = Yn(r, e + 8);
    if (Pa(i))
      return {
        value: String.fromCodePoint(n, i),
        size: 12
      };
  }
  throw X(
    t.source,
    e,
    `Invalid Unicode escape sequence: "${r.slice(e, e + 6)}".`
  );
}
function Yn(t, e) {
  return ht(t.charCodeAt(e)) << 12 | ht(t.charCodeAt(e + 1)) << 8 | ht(t.charCodeAt(e + 2)) << 4 | ht(t.charCodeAt(e + 3));
}
function ht(t) {
  return t >= 48 && t <= 57 ? t - 48 : t >= 65 && t <= 70 ? t - 55 : t >= 97 && t <= 102 ? t - 87 : -1;
}
function wo(t, e) {
  const r = t.source.body;
  switch (r.charCodeAt(e + 1)) {
    case 34:
      return {
        value: '"',
        size: 2
      };
    case 92:
      return {
        value: "\\",
        size: 2
      };
    case 47:
      return {
        value: "/",
        size: 2
      };
    case 98:
      return {
        value: "\b",
        size: 2
      };
    case 102:
      return {
        value: "\f",
        size: 2
      };
    case 110:
      return {
        value: `
`,
        size: 2
      };
    case 114:
      return {
        value: "\r",
        size: 2
      };
    case 116:
      return {
        value: "	",
        size: 2
      };
  }
  throw X(
    t.source,
    e,
    `Invalid character escape sequence: "${r.slice(
      e,
      e + 2
    )}".`
  );
}
function So(t, e) {
  const r = t.source.body, n = r.length;
  let i = t.lineStart, a = e + 3, s = a, o = "";
  const u = [];
  for (; a < n; ) {
    const c = r.charCodeAt(a);
    if (c === 34 && r.charCodeAt(a + 1) === 34 && r.charCodeAt(a + 2) === 34) {
      o += r.slice(s, a), u.push(o);
      const f = J(
        t,
        _.BLOCK_STRING,
        e,
        a + 3,
        // Return a string of the lines joined with U+000A.
        fo(u).join(`
`)
      );
      return t.line += u.length - 1, t.lineStart = i, f;
    }
    if (c === 92 && r.charCodeAt(a + 1) === 34 && r.charCodeAt(a + 2) === 34 && r.charCodeAt(a + 3) === 34) {
      o += r.slice(s, a), s = a + 1, a += 4;
      continue;
    }
    if (c === 10 || c === 13) {
      o += r.slice(s, a), u.push(o), c === 13 && r.charCodeAt(a + 1) === 10 ? a += 2 : ++a, o = "", s = a, i = a;
      continue;
    }
    if (rt(c))
      ++a;
    else if (Qt(r, a))
      a += 2;
    else
      throw X(
        t.source,
        a,
        `Invalid character within String: ${Le(
          t,
          a
        )}.`
      );
  }
  throw X(t.source, a, "Unterminated string.");
}
function Oo(t, e) {
  const r = t.source.body, n = r.length;
  let i = e + 1;
  for (; i < n; ) {
    const a = r.charCodeAt(i);
    if (co(a))
      ++i;
    else
      break;
  }
  return J(
    t,
    _.NAME,
    e,
    i,
    r.slice(e, i)
  );
}
const To = 10, Fa = 2;
function wn(t) {
  return zt(t, []);
}
function zt(t, e) {
  switch (typeof t) {
    case "string":
      return JSON.stringify(t);
    case "function":
      return t.name ? `[function ${t.name}]` : "[function]";
    case "object":
      return Io(t, e);
    default:
      return String(t);
  }
}
function Io(t, e) {
  if (t === null)
    return "null";
  if (e.includes(t))
    return "[Circular]";
  const r = [...e, t];
  if (ko(t)) {
    const n = t.toJSON();
    if (n !== t)
      return typeof n == "string" ? n : zt(n, r);
  } else if (Array.isArray(t))
    return Do(t, r);
  return No(t, r);
}
function ko(t) {
  return typeof t.toJSON == "function";
}
function No(t, e) {
  const r = Object.entries(t);
  return r.length === 0 ? "{}" : e.length > Fa ? "[" + xo(t) + "]" : "{ " + r.map(
    ([i, a]) => i + ": " + zt(a, e)
  ).join(", ") + " }";
}
function Do(t, e) {
  if (t.length === 0)
    return "[]";
  if (e.length > Fa)
    return "[Array]";
  const r = Math.min(To, t.length), n = t.length - r, i = [];
  for (let a = 0; a < r; ++a)
    i.push(zt(t[a], e));
  return n === 1 ? i.push("... 1 more item") : n > 1 && i.push(`... ${n} more items`), "[" + i.join(", ") + "]";
}
function xo(t) {
  const e = Object.prototype.toString.call(t).replace(/^\[object /, "").replace(/]$/, "");
  if (e === "Object" && typeof t.constructor == "function") {
    const r = t.constructor.name;
    if (typeof r == "string" && r !== "")
      return r;
  }
  return e;
}
const Ao = globalThis.process && // eslint-disable-next-line no-undef
process.env.NODE_ENV === "production", Ro = (
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  Ao ? function(e, r) {
    return e instanceof r;
  } : function(e, r) {
    if (e instanceof r)
      return !0;
    if (typeof e == "object" && e !== null) {
      var n;
      const i = r.prototype[Symbol.toStringTag], a = (
        // We still need to support constructor's name to detect conflicts with older versions of this library.
        Symbol.toStringTag in e ? e[Symbol.toStringTag] : (n = e.constructor) === null || n === void 0 ? void 0 : n.name
      );
      if (i === a) {
        const s = wn(e);
        throw new Error(`Cannot use ${i} "${s}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`);
      }
    }
    return !1;
  }
);
class La {
  constructor(e, r = "GraphQL request", n = {
    line: 1,
    column: 1
  }) {
    typeof e == "string" || At(!1, `Body must be a string. Received: ${wn(e)}.`), this.body = e, this.name = r, this.locationOffset = n, this.locationOffset.line > 0 || At(
      !1,
      "line in locationOffset is 1-indexed and must be positive."
    ), this.locationOffset.column > 0 || At(
      !1,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function Co(t) {
  return Ro(t, La);
}
function Po(t, e) {
  return new Fo(t, e).parseDocument();
}
class Fo {
  constructor(e, r = {}) {
    const n = Co(e) ? e : new La(e);
    this._lexer = new po(n), this._options = r, this._tokenCounter = 0;
  }
  /**
   * Converts a name lex token into a name parse node.
   */
  parseName() {
    const e = this.expectToken(_.NAME);
    return this.node(e, {
      kind: T.NAME,
      value: e.value
    });
  }
  // Implements the parsing rules in the Document section.
  /**
   * Document : Definition+
   */
  parseDocument() {
    return this.node(this._lexer.token, {
      kind: T.DOCUMENT,
      definitions: this.many(
        _.SOF,
        this.parseDefinition,
        _.EOF
      )
    });
  }
  /**
   * Definition :
   *   - ExecutableDefinition
   *   - TypeSystemDefinition
   *   - TypeSystemExtension
   *
   * ExecutableDefinition :
   *   - OperationDefinition
   *   - FragmentDefinition
   *
   * TypeSystemDefinition :
   *   - SchemaDefinition
   *   - TypeDefinition
   *   - DirectiveDefinition
   *
   * TypeDefinition :
   *   - ScalarTypeDefinition
   *   - ObjectTypeDefinition
   *   - InterfaceTypeDefinition
   *   - UnionTypeDefinition
   *   - EnumTypeDefinition
   *   - InputObjectTypeDefinition
   */
  parseDefinition() {
    if (this.peek(_.BRACE_L))
      return this.parseOperationDefinition();
    const e = this.peekDescription(), r = e ? this._lexer.lookahead() : this._lexer.token;
    if (r.kind === _.NAME) {
      switch (r.value) {
        case "schema":
          return this.parseSchemaDefinition();
        case "scalar":
          return this.parseScalarTypeDefinition();
        case "type":
          return this.parseObjectTypeDefinition();
        case "interface":
          return this.parseInterfaceTypeDefinition();
        case "union":
          return this.parseUnionTypeDefinition();
        case "enum":
          return this.parseEnumTypeDefinition();
        case "input":
          return this.parseInputObjectTypeDefinition();
        case "directive":
          return this.parseDirectiveDefinition();
      }
      if (e)
        throw X(
          this._lexer.source,
          this._lexer.token.start,
          "Unexpected description, descriptions are supported only on type definitions."
        );
      switch (r.value) {
        case "query":
        case "mutation":
        case "subscription":
          return this.parseOperationDefinition();
        case "fragment":
          return this.parseFragmentDefinition();
        case "extend":
          return this.parseTypeSystemExtension();
      }
    }
    throw this.unexpected(r);
  }
  // Implements the parsing rules in the Operations section.
  /**
   * OperationDefinition :
   *  - SelectionSet
   *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
   */
  parseOperationDefinition() {
    const e = this._lexer.token;
    if (this.peek(_.BRACE_L))
      return this.node(e, {
        kind: T.OPERATION_DEFINITION,
        operation: Fe.QUERY,
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet()
      });
    const r = this.parseOperationType();
    let n;
    return this.peek(_.NAME) && (n = this.parseName()), this.node(e, {
      kind: T.OPERATION_DEFINITION,
      operation: r,
      name: n,
      variableDefinitions: this.parseVariableDefinitions(),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    });
  }
  /**
   * OperationType : one of query mutation subscription
   */
  parseOperationType() {
    const e = this.expectToken(_.NAME);
    switch (e.value) {
      case "query":
        return Fe.QUERY;
      case "mutation":
        return Fe.MUTATION;
      case "subscription":
        return Fe.SUBSCRIPTION;
    }
    throw this.unexpected(e);
  }
  /**
   * VariableDefinitions : ( VariableDefinition+ )
   */
  parseVariableDefinitions() {
    return this.optionalMany(
      _.PAREN_L,
      this.parseVariableDefinition,
      _.PAREN_R
    );
  }
  /**
   * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
   */
  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: T.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(_.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(_.EQUALS) ? this.parseConstValueLiteral() : void 0,
      directives: this.parseConstDirectives()
    });
  }
  /**
   * Variable : $ Name
   */
  parseVariable() {
    const e = this._lexer.token;
    return this.expectToken(_.DOLLAR), this.node(e, {
      kind: T.VARIABLE,
      name: this.parseName()
    });
  }
  /**
   * ```
   * SelectionSet : { Selection+ }
   * ```
   */
  parseSelectionSet() {
    return this.node(this._lexer.token, {
      kind: T.SELECTION_SET,
      selections: this.many(
        _.BRACE_L,
        this.parseSelection,
        _.BRACE_R
      )
    });
  }
  /**
   * Selection :
   *   - Field
   *   - FragmentSpread
   *   - InlineFragment
   */
  parseSelection() {
    return this.peek(_.SPREAD) ? this.parseFragment() : this.parseField();
  }
  /**
   * Field : Alias? Name Arguments? Directives? SelectionSet?
   *
   * Alias : Name :
   */
  parseField() {
    const e = this._lexer.token, r = this.parseName();
    let n, i;
    return this.expectOptionalToken(_.COLON) ? (n = r, i = this.parseName()) : i = r, this.node(e, {
      kind: T.FIELD,
      alias: n,
      name: i,
      arguments: this.parseArguments(!1),
      directives: this.parseDirectives(!1),
      selectionSet: this.peek(_.BRACE_L) ? this.parseSelectionSet() : void 0
    });
  }
  /**
   * Arguments[Const] : ( Argument[?Const]+ )
   */
  parseArguments(e) {
    const r = e ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(_.PAREN_L, r, _.PAREN_R);
  }
  /**
   * Argument[Const] : Name : Value[?Const]
   */
  parseArgument(e = !1) {
    const r = this._lexer.token, n = this.parseName();
    return this.expectToken(_.COLON), this.node(r, {
      kind: T.ARGUMENT,
      name: n,
      value: this.parseValueLiteral(e)
    });
  }
  parseConstArgument() {
    return this.parseArgument(!0);
  }
  // Implements the parsing rules in the Fragments section.
  /**
   * Corresponds to both FragmentSpread and InlineFragment in the spec.
   *
   * FragmentSpread : ... FragmentName Directives?
   *
   * InlineFragment : ... TypeCondition? Directives? SelectionSet
   */
  parseFragment() {
    const e = this._lexer.token;
    this.expectToken(_.SPREAD);
    const r = this.expectOptionalKeyword("on");
    return !r && this.peek(_.NAME) ? this.node(e, {
      kind: T.FRAGMENT_SPREAD,
      name: this.parseFragmentName(),
      directives: this.parseDirectives(!1)
    }) : this.node(e, {
      kind: T.INLINE_FRAGMENT,
      typeCondition: r ? this.parseNamedType() : void 0,
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    });
  }
  /**
   * FragmentDefinition :
   *   - fragment FragmentName on TypeCondition Directives? SelectionSet
   *
   * TypeCondition : NamedType
   */
  parseFragmentDefinition() {
    const e = this._lexer.token;
    return this.expectKeyword("fragment"), this._options.allowLegacyFragmentVariables === !0 ? this.node(e, {
      kind: T.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      variableDefinitions: this.parseVariableDefinitions(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    }) : this.node(e, {
      kind: T.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    });
  }
  /**
   * FragmentName : Name but not `on`
   */
  parseFragmentName() {
    if (this._lexer.token.value === "on")
      throw this.unexpected();
    return this.parseName();
  }
  // Implements the parsing rules in the Values section.
  /**
   * Value[Const] :
   *   - [~Const] Variable
   *   - IntValue
   *   - FloatValue
   *   - StringValue
   *   - BooleanValue
   *   - NullValue
   *   - EnumValue
   *   - ListValue[?Const]
   *   - ObjectValue[?Const]
   *
   * BooleanValue : one of `true` `false`
   *
   * NullValue : `null`
   *
   * EnumValue : Name but not `true`, `false` or `null`
   */
  parseValueLiteral(e) {
    const r = this._lexer.token;
    switch (r.kind) {
      case _.BRACKET_L:
        return this.parseList(e);
      case _.BRACE_L:
        return this.parseObject(e);
      case _.INT:
        return this.advanceLexer(), this.node(r, {
          kind: T.INT,
          value: r.value
        });
      case _.FLOAT:
        return this.advanceLexer(), this.node(r, {
          kind: T.FLOAT,
          value: r.value
        });
      case _.STRING:
      case _.BLOCK_STRING:
        return this.parseStringLiteral();
      case _.NAME:
        switch (this.advanceLexer(), r.value) {
          case "true":
            return this.node(r, {
              kind: T.BOOLEAN,
              value: !0
            });
          case "false":
            return this.node(r, {
              kind: T.BOOLEAN,
              value: !1
            });
          case "null":
            return this.node(r, {
              kind: T.NULL
            });
          default:
            return this.node(r, {
              kind: T.ENUM,
              value: r.value
            });
        }
      case _.DOLLAR:
        if (e)
          if (this.expectToken(_.DOLLAR), this._lexer.token.kind === _.NAME) {
            const n = this._lexer.token.value;
            throw X(
              this._lexer.source,
              r.start,
              `Unexpected variable "$${n}" in constant value.`
            );
          } else
            throw this.unexpected(r);
        return this.parseVariable();
      default:
        throw this.unexpected();
    }
  }
  parseConstValueLiteral() {
    return this.parseValueLiteral(!0);
  }
  parseStringLiteral() {
    const e = this._lexer.token;
    return this.advanceLexer(), this.node(e, {
      kind: T.STRING,
      value: e.value,
      block: e.kind === _.BLOCK_STRING
    });
  }
  /**
   * ListValue[Const] :
   *   - [ ]
   *   - [ Value[?Const]+ ]
   */
  parseList(e) {
    const r = () => this.parseValueLiteral(e);
    return this.node(this._lexer.token, {
      kind: T.LIST,
      values: this.any(_.BRACKET_L, r, _.BRACKET_R)
    });
  }
  /**
   * ```
   * ObjectValue[Const] :
   *   - { }
   *   - { ObjectField[?Const]+ }
   * ```
   */
  parseObject(e) {
    const r = () => this.parseObjectField(e);
    return this.node(this._lexer.token, {
      kind: T.OBJECT,
      fields: this.any(_.BRACE_L, r, _.BRACE_R)
    });
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */
  parseObjectField(e) {
    const r = this._lexer.token, n = this.parseName();
    return this.expectToken(_.COLON), this.node(r, {
      kind: T.OBJECT_FIELD,
      name: n,
      value: this.parseValueLiteral(e)
    });
  }
  // Implements the parsing rules in the Directives section.
  /**
   * Directives[Const] : Directive[?Const]+
   */
  parseDirectives(e) {
    const r = [];
    for (; this.peek(_.AT); )
      r.push(this.parseDirective(e));
    return r;
  }
  parseConstDirectives() {
    return this.parseDirectives(!0);
  }
  /**
   * ```
   * Directive[Const] : @ Name Arguments[?Const]?
   * ```
   */
  parseDirective(e) {
    const r = this._lexer.token;
    return this.expectToken(_.AT), this.node(r, {
      kind: T.DIRECTIVE,
      name: this.parseName(),
      arguments: this.parseArguments(e)
    });
  }
  // Implements the parsing rules in the Types section.
  /**
   * Type :
   *   - NamedType
   *   - ListType
   *   - NonNullType
   */
  parseTypeReference() {
    const e = this._lexer.token;
    let r;
    if (this.expectOptionalToken(_.BRACKET_L)) {
      const n = this.parseTypeReference();
      this.expectToken(_.BRACKET_R), r = this.node(e, {
        kind: T.LIST_TYPE,
        type: n
      });
    } else
      r = this.parseNamedType();
    return this.expectOptionalToken(_.BANG) ? this.node(e, {
      kind: T.NON_NULL_TYPE,
      type: r
    }) : r;
  }
  /**
   * NamedType : Name
   */
  parseNamedType() {
    return this.node(this._lexer.token, {
      kind: T.NAMED_TYPE,
      name: this.parseName()
    });
  }
  // Implements the parsing rules in the Type Definition section.
  peekDescription() {
    return this.peek(_.STRING) || this.peek(_.BLOCK_STRING);
  }
  /**
   * Description : StringValue
   */
  parseDescription() {
    if (this.peekDescription())
      return this.parseStringLiteral();
  }
  /**
   * ```
   * SchemaDefinition : Description? schema Directives[Const]? { OperationTypeDefinition+ }
   * ```
   */
  parseSchemaDefinition() {
    const e = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("schema");
    const n = this.parseConstDirectives(), i = this.many(
      _.BRACE_L,
      this.parseOperationTypeDefinition,
      _.BRACE_R
    );
    return this.node(e, {
      kind: T.SCHEMA_DEFINITION,
      description: r,
      directives: n,
      operationTypes: i
    });
  }
  /**
   * OperationTypeDefinition : OperationType : NamedType
   */
  parseOperationTypeDefinition() {
    const e = this._lexer.token, r = this.parseOperationType();
    this.expectToken(_.COLON);
    const n = this.parseNamedType();
    return this.node(e, {
      kind: T.OPERATION_TYPE_DEFINITION,
      operation: r,
      type: n
    });
  }
  /**
   * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
   */
  parseScalarTypeDefinition() {
    const e = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("scalar");
    const n = this.parseName(), i = this.parseConstDirectives();
    return this.node(e, {
      kind: T.SCALAR_TYPE_DEFINITION,
      description: r,
      name: n,
      directives: i
    });
  }
  /**
   * ObjectTypeDefinition :
   *   Description?
   *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
   */
  parseObjectTypeDefinition() {
    const e = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("type");
    const n = this.parseName(), i = this.parseImplementsInterfaces(), a = this.parseConstDirectives(), s = this.parseFieldsDefinition();
    return this.node(e, {
      kind: T.OBJECT_TYPE_DEFINITION,
      description: r,
      name: n,
      interfaces: i,
      directives: a,
      fields: s
    });
  }
  /**
   * ImplementsInterfaces :
   *   - implements `&`? NamedType
   *   - ImplementsInterfaces & NamedType
   */
  parseImplementsInterfaces() {
    return this.expectOptionalKeyword("implements") ? this.delimitedMany(_.AMP, this.parseNamedType) : [];
  }
  /**
   * ```
   * FieldsDefinition : { FieldDefinition+ }
   * ```
   */
  parseFieldsDefinition() {
    return this.optionalMany(
      _.BRACE_L,
      this.parseFieldDefinition,
      _.BRACE_R
    );
  }
  /**
   * FieldDefinition :
   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
   */
  parseFieldDefinition() {
    const e = this._lexer.token, r = this.parseDescription(), n = this.parseName(), i = this.parseArgumentDefs();
    this.expectToken(_.COLON);
    const a = this.parseTypeReference(), s = this.parseConstDirectives();
    return this.node(e, {
      kind: T.FIELD_DEFINITION,
      description: r,
      name: n,
      arguments: i,
      type: a,
      directives: s
    });
  }
  /**
   * ArgumentsDefinition : ( InputValueDefinition+ )
   */
  parseArgumentDefs() {
    return this.optionalMany(
      _.PAREN_L,
      this.parseInputValueDef,
      _.PAREN_R
    );
  }
  /**
   * InputValueDefinition :
   *   - Description? Name : Type DefaultValue? Directives[Const]?
   */
  parseInputValueDef() {
    const e = this._lexer.token, r = this.parseDescription(), n = this.parseName();
    this.expectToken(_.COLON);
    const i = this.parseTypeReference();
    let a;
    this.expectOptionalToken(_.EQUALS) && (a = this.parseConstValueLiteral());
    const s = this.parseConstDirectives();
    return this.node(e, {
      kind: T.INPUT_VALUE_DEFINITION,
      description: r,
      name: n,
      type: i,
      defaultValue: a,
      directives: s
    });
  }
  /**
   * InterfaceTypeDefinition :
   *   - Description? interface Name Directives[Const]? FieldsDefinition?
   */
  parseInterfaceTypeDefinition() {
    const e = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("interface");
    const n = this.parseName(), i = this.parseImplementsInterfaces(), a = this.parseConstDirectives(), s = this.parseFieldsDefinition();
    return this.node(e, {
      kind: T.INTERFACE_TYPE_DEFINITION,
      description: r,
      name: n,
      interfaces: i,
      directives: a,
      fields: s
    });
  }
  /**
   * UnionTypeDefinition :
   *   - Description? union Name Directives[Const]? UnionMemberTypes?
   */
  parseUnionTypeDefinition() {
    const e = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("union");
    const n = this.parseName(), i = this.parseConstDirectives(), a = this.parseUnionMemberTypes();
    return this.node(e, {
      kind: T.UNION_TYPE_DEFINITION,
      description: r,
      name: n,
      directives: i,
      types: a
    });
  }
  /**
   * UnionMemberTypes :
   *   - = `|`? NamedType
   *   - UnionMemberTypes | NamedType
   */
  parseUnionMemberTypes() {
    return this.expectOptionalToken(_.EQUALS) ? this.delimitedMany(_.PIPE, this.parseNamedType) : [];
  }
  /**
   * EnumTypeDefinition :
   *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
   */
  parseEnumTypeDefinition() {
    const e = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("enum");
    const n = this.parseName(), i = this.parseConstDirectives(), a = this.parseEnumValuesDefinition();
    return this.node(e, {
      kind: T.ENUM_TYPE_DEFINITION,
      description: r,
      name: n,
      directives: i,
      values: a
    });
  }
  /**
   * ```
   * EnumValuesDefinition : { EnumValueDefinition+ }
   * ```
   */
  parseEnumValuesDefinition() {
    return this.optionalMany(
      _.BRACE_L,
      this.parseEnumValueDefinition,
      _.BRACE_R
    );
  }
  /**
   * EnumValueDefinition : Description? EnumValue Directives[Const]?
   */
  parseEnumValueDefinition() {
    const e = this._lexer.token, r = this.parseDescription(), n = this.parseEnumValueName(), i = this.parseConstDirectives();
    return this.node(e, {
      kind: T.ENUM_VALUE_DEFINITION,
      description: r,
      name: n,
      directives: i
    });
  }
  /**
   * EnumValue : Name but not `true`, `false` or `null`
   */
  parseEnumValueName() {
    if (this._lexer.token.value === "true" || this._lexer.token.value === "false" || this._lexer.token.value === "null")
      throw X(
        this._lexer.source,
        this._lexer.token.start,
        `${Dt(
          this._lexer.token
        )} is reserved and cannot be used for an enum value.`
      );
    return this.parseName();
  }
  /**
   * InputObjectTypeDefinition :
   *   - Description? input Name Directives[Const]? InputFieldsDefinition?
   */
  parseInputObjectTypeDefinition() {
    const e = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("input");
    const n = this.parseName(), i = this.parseConstDirectives(), a = this.parseInputFieldsDefinition();
    return this.node(e, {
      kind: T.INPUT_OBJECT_TYPE_DEFINITION,
      description: r,
      name: n,
      directives: i,
      fields: a
    });
  }
  /**
   * ```
   * InputFieldsDefinition : { InputValueDefinition+ }
   * ```
   */
  parseInputFieldsDefinition() {
    return this.optionalMany(
      _.BRACE_L,
      this.parseInputValueDef,
      _.BRACE_R
    );
  }
  /**
   * TypeSystemExtension :
   *   - SchemaExtension
   *   - TypeExtension
   *
   * TypeExtension :
   *   - ScalarTypeExtension
   *   - ObjectTypeExtension
   *   - InterfaceTypeExtension
   *   - UnionTypeExtension
   *   - EnumTypeExtension
   *   - InputObjectTypeDefinition
   */
  parseTypeSystemExtension() {
    const e = this._lexer.lookahead();
    if (e.kind === _.NAME)
      switch (e.value) {
        case "schema":
          return this.parseSchemaExtension();
        case "scalar":
          return this.parseScalarTypeExtension();
        case "type":
          return this.parseObjectTypeExtension();
        case "interface":
          return this.parseInterfaceTypeExtension();
        case "union":
          return this.parseUnionTypeExtension();
        case "enum":
          return this.parseEnumTypeExtension();
        case "input":
          return this.parseInputObjectTypeExtension();
      }
    throw this.unexpected(e);
  }
  /**
   * ```
   * SchemaExtension :
   *  - extend schema Directives[Const]? { OperationTypeDefinition+ }
   *  - extend schema Directives[Const]
   * ```
   */
  parseSchemaExtension() {
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("schema");
    const r = this.parseConstDirectives(), n = this.optionalMany(
      _.BRACE_L,
      this.parseOperationTypeDefinition,
      _.BRACE_R
    );
    if (r.length === 0 && n.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: T.SCHEMA_EXTENSION,
      directives: r,
      operationTypes: n
    });
  }
  /**
   * ScalarTypeExtension :
   *   - extend scalar Name Directives[Const]
   */
  parseScalarTypeExtension() {
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("scalar");
    const r = this.parseName(), n = this.parseConstDirectives();
    if (n.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: T.SCALAR_TYPE_EXTENSION,
      name: r,
      directives: n
    });
  }
  /**
   * ObjectTypeExtension :
   *  - extend type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend type Name ImplementsInterfaces? Directives[Const]
   *  - extend type Name ImplementsInterfaces
   */
  parseObjectTypeExtension() {
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("type");
    const r = this.parseName(), n = this.parseImplementsInterfaces(), i = this.parseConstDirectives(), a = this.parseFieldsDefinition();
    if (n.length === 0 && i.length === 0 && a.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: T.OBJECT_TYPE_EXTENSION,
      name: r,
      interfaces: n,
      directives: i,
      fields: a
    });
  }
  /**
   * InterfaceTypeExtension :
   *  - extend interface Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend interface Name ImplementsInterfaces? Directives[Const]
   *  - extend interface Name ImplementsInterfaces
   */
  parseInterfaceTypeExtension() {
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("interface");
    const r = this.parseName(), n = this.parseImplementsInterfaces(), i = this.parseConstDirectives(), a = this.parseFieldsDefinition();
    if (n.length === 0 && i.length === 0 && a.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: T.INTERFACE_TYPE_EXTENSION,
      name: r,
      interfaces: n,
      directives: i,
      fields: a
    });
  }
  /**
   * UnionTypeExtension :
   *   - extend union Name Directives[Const]? UnionMemberTypes
   *   - extend union Name Directives[Const]
   */
  parseUnionTypeExtension() {
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("union");
    const r = this.parseName(), n = this.parseConstDirectives(), i = this.parseUnionMemberTypes();
    if (n.length === 0 && i.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: T.UNION_TYPE_EXTENSION,
      name: r,
      directives: n,
      types: i
    });
  }
  /**
   * EnumTypeExtension :
   *   - extend enum Name Directives[Const]? EnumValuesDefinition
   *   - extend enum Name Directives[Const]
   */
  parseEnumTypeExtension() {
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("enum");
    const r = this.parseName(), n = this.parseConstDirectives(), i = this.parseEnumValuesDefinition();
    if (n.length === 0 && i.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: T.ENUM_TYPE_EXTENSION,
      name: r,
      directives: n,
      values: i
    });
  }
  /**
   * InputObjectTypeExtension :
   *   - extend input Name Directives[Const]? InputFieldsDefinition
   *   - extend input Name Directives[Const]
   */
  parseInputObjectTypeExtension() {
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("input");
    const r = this.parseName(), n = this.parseConstDirectives(), i = this.parseInputFieldsDefinition();
    if (n.length === 0 && i.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: T.INPUT_OBJECT_TYPE_EXTENSION,
      name: r,
      directives: n,
      fields: i
    });
  }
  /**
   * ```
   * DirectiveDefinition :
   *   - Description? directive @ Name ArgumentsDefinition? `repeatable`? on DirectiveLocations
   * ```
   */
  parseDirectiveDefinition() {
    const e = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("directive"), this.expectToken(_.AT);
    const n = this.parseName(), i = this.parseArgumentDefs(), a = this.expectOptionalKeyword("repeatable");
    this.expectKeyword("on");
    const s = this.parseDirectiveLocations();
    return this.node(e, {
      kind: T.DIRECTIVE_DEFINITION,
      description: r,
      name: n,
      arguments: i,
      repeatable: a,
      locations: s
    });
  }
  /**
   * DirectiveLocations :
   *   - `|`? DirectiveLocation
   *   - DirectiveLocations | DirectiveLocation
   */
  parseDirectiveLocations() {
    return this.delimitedMany(_.PIPE, this.parseDirectiveLocation);
  }
  /*
   * DirectiveLocation :
   *   - ExecutableDirectiveLocation
   *   - TypeSystemDirectiveLocation
   *
   * ExecutableDirectiveLocation : one of
   *   `QUERY`
   *   `MUTATION`
   *   `SUBSCRIPTION`
   *   `FIELD`
   *   `FRAGMENT_DEFINITION`
   *   `FRAGMENT_SPREAD`
   *   `INLINE_FRAGMENT`
   *
   * TypeSystemDirectiveLocation : one of
   *   `SCHEMA`
   *   `SCALAR`
   *   `OBJECT`
   *   `FIELD_DEFINITION`
   *   `ARGUMENT_DEFINITION`
   *   `INTERFACE`
   *   `UNION`
   *   `ENUM`
   *   `ENUM_VALUE`
   *   `INPUT_OBJECT`
   *   `INPUT_FIELD_DEFINITION`
   */
  parseDirectiveLocation() {
    const e = this._lexer.token, r = this.parseName();
    if (Object.prototype.hasOwnProperty.call(Hr, r.value))
      return r;
    throw this.unexpected(e);
  }
  // Core parsing utility functions
  /**
   * Returns a node that, if configured to do so, sets a "loc" field as a
   * location object, used to identify the place in the source that created a
   * given parsed object.
   */
  node(e, r) {
    return this._options.noLocation !== !0 && (r.loc = new oo(
      e,
      this._lexer.lastToken,
      this._lexer.source
    )), r;
  }
  /**
   * Determines if the next token is of a given kind
   */
  peek(e) {
    return this._lexer.token.kind === e;
  }
  /**
   * If the next token is of the given kind, return that token after advancing the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */
  expectToken(e) {
    const r = this._lexer.token;
    if (r.kind === e)
      return this.advanceLexer(), r;
    throw X(
      this._lexer.source,
      r.start,
      `Expected ${Ma(e)}, found ${Dt(r)}.`
    );
  }
  /**
   * If the next token is of the given kind, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalToken(e) {
    return this._lexer.token.kind === e ? (this.advanceLexer(), !0) : !1;
  }
  /**
   * If the next token is a given keyword, advance the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */
  expectKeyword(e) {
    const r = this._lexer.token;
    if (r.kind === _.NAME && r.value === e)
      this.advanceLexer();
    else
      throw X(
        this._lexer.source,
        r.start,
        `Expected "${e}", found ${Dt(r)}.`
      );
  }
  /**
   * If the next token is a given keyword, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalKeyword(e) {
    const r = this._lexer.token;
    return r.kind === _.NAME && r.value === e ? (this.advanceLexer(), !0) : !1;
  }
  /**
   * Helper function for creating an error when an unexpected lexed token is encountered.
   */
  unexpected(e) {
    const r = e ?? this._lexer.token;
    return X(
      this._lexer.source,
      r.start,
      `Unexpected ${Dt(r)}.`
    );
  }
  /**
   * Returns a possibly empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  any(e, r, n) {
    this.expectToken(e);
    const i = [];
    for (; !this.expectOptionalToken(n); )
      i.push(r.call(this));
    return i;
  }
  /**
   * Returns a list of parse nodes, determined by the parseFn.
   * It can be empty only if open token is missing otherwise it will always return non-empty list
   * that begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  optionalMany(e, r, n) {
    if (this.expectOptionalToken(e)) {
      const i = [];
      do
        i.push(r.call(this));
      while (!this.expectOptionalToken(n));
      return i;
    }
    return [];
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  many(e, r, n) {
    this.expectToken(e);
    const i = [];
    do
      i.push(r.call(this));
    while (!this.expectOptionalToken(n));
    return i;
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list may begin with a lex token of delimiterKind followed by items separated by lex tokens of tokenKind.
   * Advances the parser to the next lex token after last item in the list.
   */
  delimitedMany(e, r) {
    this.expectOptionalToken(e);
    const n = [];
    do
      n.push(r.call(this));
    while (this.expectOptionalToken(e));
    return n;
  }
  advanceLexer() {
    const { maxTokens: e } = this._options, r = this._lexer.advance();
    if (e !== void 0 && r.kind !== _.EOF && (++this._tokenCounter, this._tokenCounter > e))
      throw X(
        this._lexer.source,
        r.start,
        `Document contains more that ${e} tokens. Parsing aborted.`
      );
  }
}
function Dt(t) {
  const e = t.value;
  return Ma(t.kind) + (e != null ? ` "${e}"` : "");
}
function Ma(t) {
  return yo(t) ? `"${t}"` : t;
}
function Lo(t) {
  return `"${t.replace(Mo, qo)}"`;
}
const Mo = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function qo(t) {
  return jo[t.charCodeAt(0)];
}
const jo = [
  "\\u0000",
  "\\u0001",
  "\\u0002",
  "\\u0003",
  "\\u0004",
  "\\u0005",
  "\\u0006",
  "\\u0007",
  "\\b",
  "\\t",
  "\\n",
  "\\u000B",
  "\\f",
  "\\r",
  "\\u000E",
  "\\u000F",
  "\\u0010",
  "\\u0011",
  "\\u0012",
  "\\u0013",
  "\\u0014",
  "\\u0015",
  "\\u0016",
  "\\u0017",
  "\\u0018",
  "\\u0019",
  "\\u001A",
  "\\u001B",
  "\\u001C",
  "\\u001D",
  "\\u001E",
  "\\u001F",
  "",
  "",
  '\\"',
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 2F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 3F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 4F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "\\\\",
  "",
  "",
  "",
  // 5F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 6F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "\\u007F",
  "\\u0080",
  "\\u0081",
  "\\u0082",
  "\\u0083",
  "\\u0084",
  "\\u0085",
  "\\u0086",
  "\\u0087",
  "\\u0088",
  "\\u0089",
  "\\u008A",
  "\\u008B",
  "\\u008C",
  "\\u008D",
  "\\u008E",
  "\\u008F",
  "\\u0090",
  "\\u0091",
  "\\u0092",
  "\\u0093",
  "\\u0094",
  "\\u0095",
  "\\u0096",
  "\\u0097",
  "\\u0098",
  "\\u0099",
  "\\u009A",
  "\\u009B",
  "\\u009C",
  "\\u009D",
  "\\u009E",
  "\\u009F"
], Wt = Object.freeze({});
function le(t, e, r = xa) {
  const n = /* @__PURE__ */ new Map();
  for (const p of Object.values(T))
    n.set(p, Vo(e, p));
  let i, a = Array.isArray(t), s = [t], o = -1, u = [], c = t, f, d;
  const l = [], h = [];
  do {
    o++;
    const p = o === s.length, E = p && u.length !== 0;
    if (p) {
      if (f = h.length === 0 ? void 0 : l[l.length - 1], c = d, d = h.pop(), E)
        if (a) {
          c = c.slice();
          let w = 0;
          for (const [S, O] of u) {
            const N = S - w;
            O === null ? (c.splice(N, 1), w++) : c[N] = O;
          }
        } else {
          c = Object.defineProperties(
            {},
            Object.getOwnPropertyDescriptors(c)
          );
          for (const [w, S] of u)
            c[w] = S;
        }
      o = i.index, s = i.keys, u = i.edits, a = i.inArray, i = i.prev;
    } else if (d) {
      if (f = a ? o : s[o], c = d[f], c == null)
        continue;
      l.push(f);
    }
    let b;
    if (!Array.isArray(c)) {
      var v, m;
      Jn(c) || At(!1, `Invalid AST Node: ${wn(c)}.`);
      const w = p ? (v = n.get(c.kind)) === null || v === void 0 ? void 0 : v.leave : (m = n.get(c.kind)) === null || m === void 0 ? void 0 : m.enter;
      if (b = w == null ? void 0 : w.call(e, c, f, d, l, h), b === Wt)
        break;
      if (b === !1) {
        if (!p) {
          l.pop();
          continue;
        }
      } else if (b !== void 0 && (u.push([f, b]), !p))
        if (Jn(b))
          c = b;
        else {
          l.pop();
          continue;
        }
    }
    if (b === void 0 && E && u.push([f, c]), p)
      l.pop();
    else {
      var g;
      i = {
        inArray: a,
        index: o,
        keys: s,
        edits: u,
        prev: i
      }, a = Array.isArray(c), s = a ? c : (g = r[c.kind]) !== null && g !== void 0 ? g : [], o = -1, u = [], d && h.push(d), d = c;
    }
  } while (i !== void 0);
  return u.length !== 0 ? u[u.length - 1][1] : t;
}
function Vo(t, e) {
  const r = t[e];
  return typeof r == "object" ? r : typeof r == "function" ? {
    enter: r,
    leave: void 0
  } : {
    enter: t.enter,
    leave: t.leave
  };
}
function qa(t) {
  return le(t, Bo);
}
const Uo = 80, Bo = {
  Name: {
    leave: (t) => t.value
  },
  Variable: {
    leave: (t) => "$" + t.name
  },
  // Document
  Document: {
    leave: (t) => I(t.definitions, `

`)
  },
  OperationDefinition: {
    leave(t) {
      const e = F("(", I(t.variableDefinitions, ", "), ")"), r = I(
        [
          t.operation,
          I([t.name, e]),
          I(t.directives, " ")
        ],
        " "
      );
      return (r === "query" ? "" : r + " ") + t.selectionSet;
    }
  },
  VariableDefinition: {
    leave: ({ variable: t, type: e, defaultValue: r, directives: n }) => t + ": " + e + F(" = ", r) + F(" ", I(n, " "))
  },
  SelectionSet: {
    leave: ({ selections: t }) => ce(t)
  },
  Field: {
    leave({ alias: t, name: e, arguments: r, directives: n, selectionSet: i }) {
      const a = F("", t, ": ") + e;
      let s = a + F("(", I(r, ", "), ")");
      return s.length > Uo && (s = a + F(`(
`, Rt(I(r, `
`)), `
)`)), I([s, I(n, " "), i], " ");
    }
  },
  Argument: {
    leave: ({ name: t, value: e }) => t + ": " + e
  },
  // Fragments
  FragmentSpread: {
    leave: ({ name: t, directives: e }) => "..." + t + F(" ", I(e, " "))
  },
  InlineFragment: {
    leave: ({ typeCondition: t, directives: e, selectionSet: r }) => I(
      [
        "...",
        F("on ", t),
        I(e, " "),
        r
      ],
      " "
    )
  },
  FragmentDefinition: {
    leave: ({ name: t, typeCondition: e, variableDefinitions: r, directives: n, selectionSet: i }) => (
      // or removed in the future.
      `fragment ${t}${F("(", I(r, ", "), ")")} on ${e} ${F("", I(n, " "), " ")}` + i
    )
  },
  // Value
  IntValue: {
    leave: ({ value: t }) => t
  },
  FloatValue: {
    leave: ({ value: t }) => t
  },
  StringValue: {
    leave: ({ value: t, block: e }) => e ? ho(t) : Lo(t)
  },
  BooleanValue: {
    leave: ({ value: t }) => t ? "true" : "false"
  },
  NullValue: {
    leave: () => "null"
  },
  EnumValue: {
    leave: ({ value: t }) => t
  },
  ListValue: {
    leave: ({ values: t }) => "[" + I(t, ", ") + "]"
  },
  ObjectValue: {
    leave: ({ fields: t }) => "{" + I(t, ", ") + "}"
  },
  ObjectField: {
    leave: ({ name: t, value: e }) => t + ": " + e
  },
  // Directive
  Directive: {
    leave: ({ name: t, arguments: e }) => "@" + t + F("(", I(e, ", "), ")")
  },
  // Type
  NamedType: {
    leave: ({ name: t }) => t
  },
  ListType: {
    leave: ({ type: t }) => "[" + t + "]"
  },
  NonNullType: {
    leave: ({ type: t }) => t + "!"
  },
  // Type System Definitions
  SchemaDefinition: {
    leave: ({ description: t, directives: e, operationTypes: r }) => F("", t, `
`) + I(["schema", I(e, " "), ce(r)], " ")
  },
  OperationTypeDefinition: {
    leave: ({ operation: t, type: e }) => t + ": " + e
  },
  ScalarTypeDefinition: {
    leave: ({ description: t, name: e, directives: r }) => F("", t, `
`) + I(["scalar", e, I(r, " ")], " ")
  },
  ObjectTypeDefinition: {
    leave: ({ description: t, name: e, interfaces: r, directives: n, fields: i }) => F("", t, `
`) + I(
      [
        "type",
        e,
        F("implements ", I(r, " & ")),
        I(n, " "),
        ce(i)
      ],
      " "
    )
  },
  FieldDefinition: {
    leave: ({ description: t, name: e, arguments: r, type: n, directives: i }) => F("", t, `
`) + e + (Xn(r) ? F(`(
`, Rt(I(r, `
`)), `
)`) : F("(", I(r, ", "), ")")) + ": " + n + F(" ", I(i, " "))
  },
  InputValueDefinition: {
    leave: ({ description: t, name: e, type: r, defaultValue: n, directives: i }) => F("", t, `
`) + I(
      [e + ": " + r, F("= ", n), I(i, " ")],
      " "
    )
  },
  InterfaceTypeDefinition: {
    leave: ({ description: t, name: e, interfaces: r, directives: n, fields: i }) => F("", t, `
`) + I(
      [
        "interface",
        e,
        F("implements ", I(r, " & ")),
        I(n, " "),
        ce(i)
      ],
      " "
    )
  },
  UnionTypeDefinition: {
    leave: ({ description: t, name: e, directives: r, types: n }) => F("", t, `
`) + I(
      ["union", e, I(r, " "), F("= ", I(n, " | "))],
      " "
    )
  },
  EnumTypeDefinition: {
    leave: ({ description: t, name: e, directives: r, values: n }) => F("", t, `
`) + I(["enum", e, I(r, " "), ce(n)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description: t, name: e, directives: r }) => F("", t, `
`) + I([e, I(r, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description: t, name: e, directives: r, fields: n }) => F("", t, `
`) + I(["input", e, I(r, " "), ce(n)], " ")
  },
  DirectiveDefinition: {
    leave: ({ description: t, name: e, arguments: r, repeatable: n, locations: i }) => F("", t, `
`) + "directive @" + e + (Xn(r) ? F(`(
`, Rt(I(r, `
`)), `
)`) : F("(", I(r, ", "), ")")) + (n ? " repeatable" : "") + " on " + I(i, " | ")
  },
  SchemaExtension: {
    leave: ({ directives: t, operationTypes: e }) => I(
      ["extend schema", I(t, " "), ce(e)],
      " "
    )
  },
  ScalarTypeExtension: {
    leave: ({ name: t, directives: e }) => I(["extend scalar", t, I(e, " ")], " ")
  },
  ObjectTypeExtension: {
    leave: ({ name: t, interfaces: e, directives: r, fields: n }) => I(
      [
        "extend type",
        t,
        F("implements ", I(e, " & ")),
        I(r, " "),
        ce(n)
      ],
      " "
    )
  },
  InterfaceTypeExtension: {
    leave: ({ name: t, interfaces: e, directives: r, fields: n }) => I(
      [
        "extend interface",
        t,
        F("implements ", I(e, " & ")),
        I(r, " "),
        ce(n)
      ],
      " "
    )
  },
  UnionTypeExtension: {
    leave: ({ name: t, directives: e, types: r }) => I(
      [
        "extend union",
        t,
        I(e, " "),
        F("= ", I(r, " | "))
      ],
      " "
    )
  },
  EnumTypeExtension: {
    leave: ({ name: t, directives: e, values: r }) => I(["extend enum", t, I(e, " "), ce(r)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name: t, directives: e, fields: r }) => I(["extend input", t, I(e, " "), ce(r)], " ")
  }
};
function I(t, e = "") {
  var r;
  return (r = t == null ? void 0 : t.filter((n) => n).join(e)) !== null && r !== void 0 ? r : "";
}
function ce(t) {
  return F(`{
`, Rt(I(t, `
`)), `
}`);
}
function F(t, e, r = "") {
  return e != null && e !== "" ? t + e + r : "";
}
function Rt(t) {
  return F("  ", t.replace(/\n/g, `
  `));
}
function Xn(t) {
  var e;
  return (e = t == null ? void 0 : t.some((r) => r.includes(`
`))) !== null && e !== void 0 ? e : !1;
}
function Kn(t) {
  return t.kind === T.FIELD || t.kind === T.FRAGMENT_SPREAD || t.kind === T.INLINE_FRAGMENT;
}
function Ot(t, e) {
  var r = t.directives;
  return !r || !r.length ? !0 : Wo(r).every(function(n) {
    var i = n.directive, a = n.ifArgument, s = !1;
    return a.value.kind === "Variable" ? (s = e && e[a.value.name.value], k(s !== void 0, 78, i.name.value)) : s = a.value.value, i.name.value === "skip" ? !s : s;
  });
}
function bt(t, e, r) {
  var n = new Set(t), i = n.size;
  return le(e, {
    Directive: function(a) {
      if (n.delete(a.name.value) && (!r || !n.size))
        return Wt;
    }
  }), r ? !n.size : n.size < i;
}
function Qo(t) {
  return t && bt(["client", "export"], t, !0);
}
function zo(t) {
  var e = t.name.value;
  return e === "skip" || e === "include";
}
function Wo(t) {
  var e = [];
  return t && t.length && t.forEach(function(r) {
    if (zo(r)) {
      var n = r.arguments, i = r.name.value;
      k(n && n.length === 1, 79, i);
      var a = n[0];
      k(a.name && a.name.value === "if", 80, i);
      var s = a.value;
      k(s && (s.kind === "Variable" || s.kind === "BooleanValue"), 81, i), e.push({ directive: r, ifArgument: a });
    }
  }), e;
}
function $o(t) {
  var e, r, n = (e = t.directives) === null || e === void 0 ? void 0 : e.find(function(a) {
    var s = a.name;
    return s.value === "unmask";
  });
  if (!n)
    return "mask";
  var i = (r = n.arguments) === null || r === void 0 ? void 0 : r.find(function(a) {
    var s = a.name;
    return s.value === "mode";
  });
  return globalThis.__DEV__ !== !1 && i && (i.value.kind === T.VARIABLE ? globalThis.__DEV__ !== !1 && k.warn(82) : i.value.kind !== T.STRING ? globalThis.__DEV__ !== !1 && k.warn(83) : i.value.value !== "migrate" && globalThis.__DEV__ !== !1 && k.warn(84, i.value.value)), i && "value" in i.value && i.value.value === "migrate" ? "migrate" : "unmask";
}
const Ho = () => /* @__PURE__ */ Object.create(null), { forEach: Go, slice: Zn } = Array.prototype, { hasOwnProperty: Jo } = Object.prototype;
class be {
  constructor(e = !0, r = Ho) {
    this.weakness = e, this.makeData = r;
  }
  lookup() {
    return this.lookupArray(arguments);
  }
  lookupArray(e) {
    let r = this;
    return Go.call(e, (n) => r = r.getChildTrie(n)), Jo.call(r, "data") ? r.data : r.data = this.makeData(Zn.call(e));
  }
  peek() {
    return this.peekArray(arguments);
  }
  peekArray(e) {
    let r = this;
    for (let n = 0, i = e.length; r && n < i; ++n) {
      const a = r.mapFor(e[n], !1);
      r = a && a.get(e[n]);
    }
    return r && r.data;
  }
  remove() {
    return this.removeArray(arguments);
  }
  removeArray(e) {
    let r;
    if (e.length) {
      const n = e[0], i = this.mapFor(n, !1), a = i && i.get(n);
      a && (r = a.removeArray(Zn.call(e, 1)), !a.data && !a.weak && !(a.strong && a.strong.size) && i.delete(n));
    } else
      r = this.data, delete this.data;
    return r;
  }
  getChildTrie(e) {
    const r = this.mapFor(e, !0);
    let n = r.get(e);
    return n || r.set(e, n = new be(this.weakness, this.makeData)), n;
  }
  mapFor(e, r) {
    return this.weakness && Yo(e) ? this.weak || (r ? this.weak = /* @__PURE__ */ new WeakMap() : void 0) : this.strong || (r ? this.strong = /* @__PURE__ */ new Map() : void 0);
  }
}
function Yo(t) {
  switch (typeof t) {
    case "object":
      if (t === null)
        break;
    // Fall through to return true...
    case "function":
      return !0;
  }
  return !1;
}
var Xo = fe(function() {
  return navigator.product;
}) == "ReactNative", qe = typeof WeakMap == "function" && !(Xo && !global.HermesInternal), Sn = typeof WeakSet == "function", ja = typeof Symbol == "function" && typeof Symbol.for == "function", $t = ja && Symbol.asyncIterator;
fe(function() {
  return window.document.createElement;
});
fe(function() {
  return navigator.userAgent.indexOf("jsdom") >= 0;
});
function W(t) {
  return t !== null && typeof t == "object";
}
function Ko(t, e) {
  var r = e, n = [];
  t.definitions.forEach(function(a) {
    if (a.kind === "OperationDefinition")
      throw ie(
        85,
        a.operation,
        a.name ? " named '".concat(a.name.value, "'") : ""
      );
    a.kind === "FragmentDefinition" && n.push(a);
  }), typeof r > "u" && (k(n.length === 1, 86, n.length), r = n[0].name.value);
  var i = y(y({}, t), { definitions: re([
    {
      kind: "OperationDefinition",
      // OperationTypeNode is an enum
      operation: "query",
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: {
              kind: "Name",
              value: r
            }
          }
        ]
      }
    }
  ], t.definitions, !0) });
  return i;
}
function nt(t) {
  t === void 0 && (t = []);
  var e = {};
  return t.forEach(function(r) {
    e[r.name.value] = r;
  }), e;
}
function Ht(t, e) {
  switch (t.kind) {
    case "InlineFragment":
      return t;
    case "FragmentSpread": {
      var r = t.name.value;
      if (typeof e == "function")
        return e(r);
      var n = e && e[r];
      return k(n, 87, r), n || null;
    }
    default:
      return null;
  }
}
function Zo(t) {
  var e = !0;
  return le(t, {
    FragmentSpread: function(r) {
      if (e = !!r.directives && r.directives.some(function(n) {
        return n.name.value === "unmask";
      }), !e)
        return Wt;
    }
  }), e;
}
function eu() {
}
class Jr {
  constructor(e = 1 / 0, r = eu) {
    this.max = e, this.dispose = r, this.map = /* @__PURE__ */ new Map(), this.newest = null, this.oldest = null;
  }
  has(e) {
    return this.map.has(e);
  }
  get(e) {
    const r = this.getNode(e);
    return r && r.value;
  }
  get size() {
    return this.map.size;
  }
  getNode(e) {
    const r = this.map.get(e);
    if (r && r !== this.newest) {
      const { older: n, newer: i } = r;
      i && (i.older = n), n && (n.newer = i), r.older = this.newest, r.older.newer = r, r.newer = null, this.newest = r, r === this.oldest && (this.oldest = i);
    }
    return r;
  }
  set(e, r) {
    let n = this.getNode(e);
    return n ? n.value = r : (n = {
      key: e,
      value: r,
      newer: null,
      older: this.newest
    }, this.newest && (this.newest.newer = n), this.newest = n, this.oldest = this.oldest || n, this.map.set(e, n), n.value);
  }
  clean() {
    for (; this.oldest && this.map.size > this.max; )
      this.delete(this.oldest.key);
  }
  delete(e) {
    const r = this.map.get(e);
    return r ? (r === this.newest && (this.newest = r.older), r === this.oldest && (this.oldest = r.newer), r.newer && (r.newer.older = r.older), r.older && (r.older.newer = r.newer), this.map.delete(e), this.dispose(r.value, e), !0) : !1;
  }
}
function Yr() {
}
const tu = Yr, ru = typeof WeakRef < "u" ? WeakRef : function(t) {
  return { deref: () => t };
}, nu = typeof WeakMap < "u" ? WeakMap : Map, iu = typeof FinalizationRegistry < "u" ? FinalizationRegistry : function() {
  return {
    register: Yr,
    unregister: Yr
  };
}, au = 10024;
class jt {
  constructor(e = 1 / 0, r = tu) {
    this.max = e, this.dispose = r, this.map = new nu(), this.newest = null, this.oldest = null, this.unfinalizedNodes = /* @__PURE__ */ new Set(), this.finalizationScheduled = !1, this.size = 0, this.finalize = () => {
      const n = this.unfinalizedNodes.values();
      for (let i = 0; i < au; i++) {
        const a = n.next().value;
        if (!a)
          break;
        this.unfinalizedNodes.delete(a);
        const s = a.key;
        delete a.key, a.keyRef = new ru(s), this.registry.register(s, a, a);
      }
      this.unfinalizedNodes.size > 0 ? queueMicrotask(this.finalize) : this.finalizationScheduled = !1;
    }, this.registry = new iu(this.deleteNode.bind(this));
  }
  has(e) {
    return this.map.has(e);
  }
  get(e) {
    const r = this.getNode(e);
    return r && r.value;
  }
  getNode(e) {
    const r = this.map.get(e);
    if (r && r !== this.newest) {
      const { older: n, newer: i } = r;
      i && (i.older = n), n && (n.newer = i), r.older = this.newest, r.older.newer = r, r.newer = null, this.newest = r, r === this.oldest && (this.oldest = i);
    }
    return r;
  }
  set(e, r) {
    let n = this.getNode(e);
    return n ? n.value = r : (n = {
      key: e,
      value: r,
      newer: null,
      older: this.newest
    }, this.newest && (this.newest.newer = n), this.newest = n, this.oldest = this.oldest || n, this.scheduleFinalization(n), this.map.set(e, n), this.size++, n.value);
  }
  clean() {
    for (; this.oldest && this.size > this.max; )
      this.deleteNode(this.oldest);
  }
  deleteNode(e) {
    e === this.newest && (this.newest = e.older), e === this.oldest && (this.oldest = e.newer), e.newer && (e.newer.older = e.older), e.older && (e.older.newer = e.newer), this.size--;
    const r = e.key || e.keyRef && e.keyRef.deref();
    this.dispose(e.value, r), e.keyRef ? this.registry.unregister(e) : this.unfinalizedNodes.delete(e), r && this.map.delete(r);
  }
  delete(e) {
    const r = this.map.get(e);
    return r ? (this.deleteNode(r), !0) : !1;
  }
  scheduleFinalization(e) {
    this.unfinalizedNodes.add(e), this.finalizationScheduled || (this.finalizationScheduled = !0, queueMicrotask(this.finalize));
  }
}
var tr = /* @__PURE__ */ new WeakSet();
function Va(t) {
  t.size <= (t.max || -1) || tr.has(t) || (tr.add(t), setTimeout(function() {
    t.clean(), tr.delete(t);
  }, 100));
}
var Ua = function(t, e) {
  var r = new jt(t, e);
  return r.set = function(n, i) {
    var a = jt.prototype.set.call(this, n, i);
    return Va(this), a;
  }, r;
}, su = function(t, e) {
  var r = new Jr(t, e);
  return r.set = function(n, i) {
    var a = Jr.prototype.set.call(this, n, i);
    return Va(this), a;
  }, r;
}, ou = Symbol.for("apollo.cacheSize"), me = y({}, zr[ou]), Ae = {};
function Ba(t, e) {
  Ae[t] = e;
}
var uu = globalThis.__DEV__ !== !1 ? hu : void 0, cu = globalThis.__DEV__ !== !1 ? du : void 0, fu = globalThis.__DEV__ !== !1 ? Qa : void 0;
function lu() {
  var t = {
    parser: 1e3,
    canonicalStringify: 1e3,
    print: 2e3,
    "documentTransform.cache": 2e3,
    "queryManager.getDocumentInfo": 2e3,
    "PersistedQueryLink.persistedQueryHashes": 2e3,
    "fragmentRegistry.transform": 2e3,
    "fragmentRegistry.lookup": 1e3,
    "fragmentRegistry.findFragmentSpreads": 4e3,
    "cache.fragmentQueryDocuments": 1e3,
    "removeTypenameFromVariables.getVariableDefinitions": 2e3,
    "inMemoryCache.maybeBroadcastWatch": 5e3,
    "inMemoryCache.executeSelectionSet": 5e4,
    "inMemoryCache.executeSubSelectedArray": 1e4
  };
  return Object.fromEntries(Object.entries(t).map(function(e) {
    var r = e[0], n = e[1];
    return [
      r,
      me[r] || n
    ];
  }));
}
function hu() {
  var t, e, r, n, i;
  if (globalThis.__DEV__ === !1)
    throw new Error("only supported in development mode");
  return {
    limits: lu(),
    sizes: y({ print: (t = Ae.print) === null || t === void 0 ? void 0 : t.call(Ae), parser: (e = Ae.parser) === null || e === void 0 ? void 0 : e.call(Ae), canonicalStringify: (r = Ae.canonicalStringify) === null || r === void 0 ? void 0 : r.call(Ae), links: Kr(this.link), queryManager: {
      getDocumentInfo: this.queryManager.transformCache.size,
      documentTransforms: Wa(this.queryManager.documentTransform)
    } }, (i = (n = this.cache).getMemoryInternals) === null || i === void 0 ? void 0 : i.call(n))
  };
}
function Qa() {
  return {
    cache: {
      fragmentQueryDocuments: Se(this.getFragmentDoc)
    }
  };
}
function du() {
  var t = this.config.fragments;
  return y(y({}, Qa.apply(this)), { addTypenameDocumentTransform: Wa(this.addTypenameTransform), inMemoryCache: {
    executeSelectionSet: Se(this.storeReader.executeSelectionSet),
    executeSubSelectedArray: Se(this.storeReader.executeSubSelectedArray),
    maybeBroadcastWatch: Se(this.maybeBroadcastWatch)
  }, fragmentRegistry: {
    findFragmentSpreads: Se(t == null ? void 0 : t.findFragmentSpreads),
    lookup: Se(t == null ? void 0 : t.lookup),
    transform: Se(t == null ? void 0 : t.transform)
  } });
}
function pu(t) {
  return !!t && "dirtyKey" in t;
}
function Se(t) {
  return pu(t) ? t.size : void 0;
}
function za(t) {
  return t != null;
}
function Wa(t) {
  return Xr(t).map(function(e) {
    return { cache: e };
  });
}
function Xr(t) {
  return t ? re(re([
    Se(t == null ? void 0 : t.performWork)
  ], Xr(t == null ? void 0 : t.left), !0), Xr(t == null ? void 0 : t.right), !0).filter(za) : [];
}
function Kr(t) {
  var e;
  return t ? re(re([
    (e = t == null ? void 0 : t.getMemoryInternals) === null || e === void 0 ? void 0 : e.call(t)
  ], Kr(t == null ? void 0 : t.left), !0), Kr(t == null ? void 0 : t.right), !0).filter(za) : [];
}
var Te = Object.assign(function(e) {
  return JSON.stringify(e, yu);
}, {
  reset: function() {
    ze = new su(
      me.canonicalStringify || 1e3
      /* defaultCacheSizes.canonicalStringify */
    );
  }
});
globalThis.__DEV__ !== !1 && Ba("canonicalStringify", function() {
  return ze.size;
});
var ze;
Te.reset();
function yu(t, e) {
  if (e && typeof e == "object") {
    var r = Object.getPrototypeOf(e);
    if (r === Object.prototype || r === null) {
      var n = Object.keys(e);
      if (n.every(vu))
        return e;
      var i = JSON.stringify(n), a = ze.get(i);
      if (!a) {
        n.sort();
        var s = JSON.stringify(n);
        a = ze.get(s) || n, ze.set(i, a), ze.set(s, a);
      }
      var o = Object.create(r);
      return a.forEach(function(u) {
        o[u] = e[u];
      }), o;
    }
  }
  return e;
}
function vu(t, e, r) {
  return e === 0 || r[e - 1] <= t;
}
function He(t) {
  return { __ref: String(t) };
}
function q(t) {
  return !!(t && typeof t == "object" && typeof t.__ref == "string");
}
function mu(t) {
  return W(t) && t.kind === "Document" && Array.isArray(t.definitions);
}
function gu(t) {
  return t.kind === "StringValue";
}
function bu(t) {
  return t.kind === "BooleanValue";
}
function Eu(t) {
  return t.kind === "IntValue";
}
function _u(t) {
  return t.kind === "FloatValue";
}
function wu(t) {
  return t.kind === "Variable";
}
function Su(t) {
  return t.kind === "ObjectValue";
}
function Ou(t) {
  return t.kind === "ListValue";
}
function Tu(t) {
  return t.kind === "EnumValue";
}
function Iu(t) {
  return t.kind === "NullValue";
}
function Ke(t, e, r, n) {
  if (Eu(r) || _u(r))
    t[e.value] = Number(r.value);
  else if (bu(r) || gu(r))
    t[e.value] = r.value;
  else if (Su(r)) {
    var i = {};
    r.fields.map(function(s) {
      return Ke(i, s.name, s.value, n);
    }), t[e.value] = i;
  } else if (wu(r)) {
    var a = (n || {})[r.name.value];
    t[e.value] = a;
  } else if (Ou(r))
    t[e.value] = r.values.map(function(s) {
      var o = {};
      return Ke(o, e, s, n), o[e.value];
    });
  else if (Tu(r))
    t[e.value] = r.value;
  else if (Iu(r))
    t[e.value] = null;
  else
    throw ie(96, e.value, r.kind);
}
function ku(t, e) {
  var r = null;
  t.directives && (r = {}, t.directives.forEach(function(i) {
    r[i.name.value] = {}, i.arguments && i.arguments.forEach(function(a) {
      var s = a.name, o = a.value;
      return Ke(r[i.name.value], s, o, e);
    });
  }));
  var n = null;
  return t.arguments && t.arguments.length && (n = {}, t.arguments.forEach(function(i) {
    var a = i.name, s = i.value;
    return Ke(n, a, s, e);
  })), $a(t.name.value, n, r);
}
var Nu = [
  "connection",
  "include",
  "skip",
  "client",
  "rest",
  "export",
  "nonreactive"
], ot = Te, $a = Object.assign(function(t, e, r) {
  if (e && r && r.connection && r.connection.key)
    if (r.connection.filter && r.connection.filter.length > 0) {
      var n = r.connection.filter ? r.connection.filter : [];
      n.sort();
      var i = {};
      return n.forEach(function(o) {
        i[o] = e[o];
      }), "".concat(r.connection.key, "(").concat(ot(i), ")");
    } else
      return r.connection.key;
  var a = t;
  if (e) {
    var s = ot(e);
    a += "(".concat(s, ")");
  }
  return r && Object.keys(r).forEach(function(o) {
    Nu.indexOf(o) === -1 && (r[o] && Object.keys(r[o]).length ? a += "@".concat(o, "(").concat(ot(r[o]), ")") : a += "@".concat(o));
  }), a;
}, {
  setStringify: function(t) {
    var e = ot;
    return ot = t, e;
  }
});
function Gt(t, e) {
  if (t.arguments && t.arguments.length) {
    var r = {};
    return t.arguments.forEach(function(n) {
      var i = n.name, a = n.value;
      return Ke(r, i, a, e);
    }), r;
  }
  return null;
}
function ge(t) {
  return t.alias ? t.alias.value : t.name.value;
}
function Zr(t, e, r) {
  for (var n, i = 0, a = e.selections; i < a.length; i++) {
    var s = a[i];
    if (Ie(s)) {
      if (s.name.value === "__typename")
        return t[ge(s)];
    } else n ? n.push(s) : n = [s];
  }
  if (typeof t.__typename == "string")
    return t.__typename;
  if (n)
    for (var o = 0, u = n; o < u.length; o++) {
      var s = u[o], c = Zr(t, Ht(s, r).selectionSet, r);
      if (typeof c == "string")
        return c;
    }
}
function Ie(t) {
  return t.kind === "Field";
}
function Du(t) {
  return t.kind === "InlineFragment";
}
function it(t) {
  k(t && t.kind === "Document", 88);
  var e = t.definitions.filter(function(r) {
    return r.kind !== "FragmentDefinition";
  }).map(function(r) {
    if (r.kind !== "OperationDefinition")
      throw ie(89, r.kind);
    return r;
  });
  return k(e.length <= 1, 90, e.length), t;
}
function Me(t) {
  return it(t), t.definitions.filter(function(e) {
    return e.kind === "OperationDefinition";
  })[0];
}
function Ct(t) {
  return t.definitions.filter(function(e) {
    return e.kind === "OperationDefinition" && !!e.name;
  }).map(function(e) {
    return e.name.value;
  })[0] || null;
}
function at(t) {
  return t.definitions.filter(function(e) {
    return e.kind === "FragmentDefinition";
  });
}
function Ha(t) {
  var e = Me(t);
  return k(e && e.operation === "query", 91), e;
}
function Ga(t) {
  k(t.kind === "Document", 92), k(t.definitions.length <= 1, 93);
  var e = t.definitions[0];
  return k(e.kind === "FragmentDefinition", 94), e;
}
function st(t) {
  it(t);
  for (var e, r = 0, n = t.definitions; r < n.length; r++) {
    var i = n[r];
    if (i.kind === "OperationDefinition") {
      var a = i.operation;
      if (a === "query" || a === "mutation" || a === "subscription")
        return i;
    }
    i.kind === "FragmentDefinition" && !e && (e = i);
  }
  if (e)
    return e;
  throw ie(95);
}
function On(t) {
  var e = /* @__PURE__ */ Object.create(null), r = t && t.variableDefinitions;
  return r && r.length && r.forEach(function(n) {
    n.defaultValue && Ke(e, n.variable.name, n.defaultValue);
  }), e;
}
let Z = null;
const ei = {};
let xu = 1;
const Au = () => class {
  constructor() {
    this.id = [
      "slot",
      xu++,
      Date.now(),
      Math.random().toString(36).slice(2)
    ].join(":");
  }
  hasValue() {
    for (let e = Z; e; e = e.parent)
      if (this.id in e.slots) {
        const r = e.slots[this.id];
        if (r === ei)
          break;
        return e !== Z && (Z.slots[this.id] = r), !0;
      }
    return Z && (Z.slots[this.id] = ei), !1;
  }
  getValue() {
    if (this.hasValue())
      return Z.slots[this.id];
  }
  withValue(e, r, n, i) {
    const a = {
      __proto__: null,
      [this.id]: e
    }, s = Z;
    Z = { parent: s, slots: a };
    try {
      return r.apply(i, n);
    } finally {
      Z = s;
    }
  }
  // Capture the current context and wrap a callback function so that it
  // reestablishes the captured context when called.
  static bind(e) {
    const r = Z;
    return function() {
      const n = Z;
      try {
        return Z = r, e.apply(this, arguments);
      } finally {
        Z = n;
      }
    };
  }
  // Immediately run a callback function without any captured context.
  static noContext(e, r, n) {
    if (Z) {
      const i = Z;
      try {
        return Z = null, e.apply(n, r);
      } finally {
        Z = i;
      }
    } else
      return e.apply(n, r);
  }
};
function ti(t) {
  try {
    return t();
  } catch {
  }
}
const rr = "@wry/context:Slot", Ru = (
  // Prefer globalThis when available.
  // https://github.com/benjamn/wryware/issues/347
  ti(() => globalThis) || // Fall back to global, which works in Node.js and may be converted by some
  // bundlers to the appropriate identifier (window, self, ...) depending on the
  // bundling target. https://github.com/endojs/endo/issues/576#issuecomment-1178515224
  ti(() => global) || // Otherwise, use a dummy host that's local to this module. We used to fall
  // back to using the Array constructor as a namespace, but that was flagged in
  // https://github.com/benjamn/wryware/issues/347, and can be avoided.
  /* @__PURE__ */ Object.create(null)
), ri = Ru, Jt = ri[rr] || // Earlier versions of this package stored the globalKey property on the Array
// constructor, so we check there as well, to prevent Slot class duplication.
Array[rr] || function(t) {
  try {
    Object.defineProperty(ri, rr, {
      value: t,
      enumerable: !1,
      writable: !1,
      // When it was possible for globalHost to be the Array constructor (a
      // legacy Slot dedup strategy), it was important for the property to be
      // configurable:true so it could be deleted. That does not seem to be as
      // important when globalHost is the global object, but I don't want to
      // cause similar problems again, and configurable:true seems safest.
      // https://github.com/endojs/endo/issues/576#issuecomment-1178274008
      configurable: !0
    });
  } finally {
    return t;
  }
}(Au()), { bind: Ol, noContext: Tl } = Jt, Yt = new Jt(), { hasOwnProperty: Cu } = Object.prototype, Tn = Array.from || function(t) {
  const e = [];
  return t.forEach((r) => e.push(r)), e;
};
function In(t) {
  const { unsubscribe: e } = t;
  typeof e == "function" && (t.unsubscribe = void 0, e());
}
const Et = [], Pu = 100;
function Ze(t, e) {
  if (!t)
    throw new Error(e || "assertion failure");
}
function Ja(t, e) {
  const r = t.length;
  return (
    // Unknown values are not equal to each other.
    r > 0 && // Both values must be ordinary (or both exceptional) to be equal.
    r === e.length && // The underlying value or exception must be the same.
    t[r - 1] === e[r - 1]
  );
}
function Ya(t) {
  switch (t.length) {
    case 0:
      throw new Error("unknown value");
    case 1:
      return t[0];
    case 2:
      throw t[1];
  }
}
function Xa(t) {
  return t.slice(0);
}
class Xt {
  constructor(e) {
    this.fn = e, this.parents = /* @__PURE__ */ new Set(), this.childValues = /* @__PURE__ */ new Map(), this.dirtyChildren = null, this.dirty = !0, this.recomputing = !1, this.value = [], this.deps = null, ++Xt.count;
  }
  peek() {
    if (this.value.length === 1 && !ke(this))
      return ni(this), this.value[0];
  }
  // This is the most important method of the Entry API, because it
  // determines whether the cached this.value can be returned immediately,
  // or must be recomputed. The overall performance of the caching system
  // depends on the truth of the following observations: (1) this.dirty is
  // usually false, (2) this.dirtyChildren is usually null/empty, and thus
  // (3) valueGet(this.value) is usually returned without recomputation.
  recompute(e) {
    return Ze(!this.recomputing, "already recomputing"), ni(this), ke(this) ? Fu(this, e) : Ya(this.value);
  }
  setDirty() {
    this.dirty || (this.dirty = !0, Ka(this), In(this));
  }
  dispose() {
    this.setDirty(), ns(this), kn(this, (e, r) => {
      e.setDirty(), is(e, this);
    });
  }
  forget() {
    this.dispose();
  }
  dependOn(e) {
    e.add(this), this.deps || (this.deps = Et.pop() || /* @__PURE__ */ new Set()), this.deps.add(e);
  }
  forgetDeps() {
    this.deps && (Tn(this.deps).forEach((e) => e.delete(this)), this.deps.clear(), Et.push(this.deps), this.deps = null);
  }
}
Xt.count = 0;
function ni(t) {
  const e = Yt.getValue();
  if (e)
    return t.parents.add(e), e.childValues.has(t) || e.childValues.set(t, []), ke(t) ? es(e, t) : ts(e, t), e;
}
function Fu(t, e) {
  return ns(t), Yt.withValue(t, Lu, [t, e]), qu(t, e) && Mu(t), Ya(t.value);
}
function Lu(t, e) {
  t.recomputing = !0;
  const { normalizeResult: r } = t;
  let n;
  r && t.value.length === 1 && (n = Xa(t.value)), t.value.length = 0;
  try {
    if (t.value[0] = t.fn.apply(null, e), r && n && !Ja(n, t.value))
      try {
        t.value[0] = r(t.value[0], n[0]);
      } catch {
      }
  } catch (i) {
    t.value[1] = i;
  }
  t.recomputing = !1;
}
function ke(t) {
  return t.dirty || !!(t.dirtyChildren && t.dirtyChildren.size);
}
function Mu(t) {
  t.dirty = !1, !ke(t) && Za(t);
}
function Ka(t) {
  kn(t, es);
}
function Za(t) {
  kn(t, ts);
}
function kn(t, e) {
  const r = t.parents.size;
  if (r) {
    const n = Tn(t.parents);
    for (let i = 0; i < r; ++i)
      e(n[i], t);
  }
}
function es(t, e) {
  Ze(t.childValues.has(e)), Ze(ke(e));
  const r = !ke(t);
  if (!t.dirtyChildren)
    t.dirtyChildren = Et.pop() || /* @__PURE__ */ new Set();
  else if (t.dirtyChildren.has(e))
    return;
  t.dirtyChildren.add(e), r && Ka(t);
}
function ts(t, e) {
  Ze(t.childValues.has(e)), Ze(!ke(e));
  const r = t.childValues.get(e);
  r.length === 0 ? t.childValues.set(e, Xa(e.value)) : Ja(r, e.value) || t.setDirty(), rs(t, e), !ke(t) && Za(t);
}
function rs(t, e) {
  const r = t.dirtyChildren;
  r && (r.delete(e), r.size === 0 && (Et.length < Pu && Et.push(r), t.dirtyChildren = null));
}
function ns(t) {
  t.childValues.size > 0 && t.childValues.forEach((e, r) => {
    is(t, r);
  }), t.forgetDeps(), Ze(t.dirtyChildren === null);
}
function is(t, e) {
  e.parents.delete(t), t.childValues.delete(e), rs(t, e);
}
function qu(t, e) {
  if (typeof t.subscribe == "function")
    try {
      In(t), t.unsubscribe = t.subscribe.apply(null, e);
    } catch {
      return t.setDirty(), !1;
    }
  return !0;
}
const ju = {
  setDirty: !0,
  dispose: !0,
  forget: !0
  // Fully remove parent Entry from LRU cache and computation graph
};
function as(t) {
  const e = /* @__PURE__ */ new Map();
  function r(n) {
    const i = Yt.getValue();
    if (i) {
      let a = e.get(n);
      a || e.set(n, a = /* @__PURE__ */ new Set()), i.dependOn(a);
    }
  }
  return r.dirty = function(i, a) {
    const s = e.get(i);
    if (s) {
      const o = a && Cu.call(ju, a) ? a : "setDirty";
      Tn(s).forEach((u) => u[o]()), e.delete(i), In(s);
    }
  }, r;
}
let ii;
function Vu(...t) {
  return (ii || (ii = new be(typeof WeakMap == "function"))).lookupArray(t);
}
const nr = /* @__PURE__ */ new Set();
function _t(t, { max: e = Math.pow(2, 16), keyArgs: r, makeCacheKey: n = Vu, normalizeResult: i, subscribe: a, cache: s = Jr } = /* @__PURE__ */ Object.create(null)) {
  const o = typeof s == "function" ? new s(e, (l) => l.dispose()) : s, u = function() {
    const l = n.apply(null, r ? r.apply(null, arguments) : arguments);
    if (l === void 0)
      return t.apply(null, arguments);
    let h = o.get(l);
    h || (o.set(l, h = new Xt(t)), h.normalizeResult = i, h.subscribe = a, h.forget = () => o.delete(l));
    const v = h.recompute(Array.prototype.slice.call(arguments));
    return o.set(l, h), nr.add(o), Yt.hasValue() || (nr.forEach((m) => m.clean()), nr.clear()), v;
  };
  Object.defineProperty(u, "size", {
    get: () => o.size,
    configurable: !1,
    enumerable: !1
  }), Object.freeze(u.options = {
    max: e,
    keyArgs: r,
    makeCacheKey: n,
    normalizeResult: i,
    subscribe: a,
    cache: o
  });
  function c(l) {
    const h = l && o.get(l);
    h && h.setDirty();
  }
  u.dirtyKey = c, u.dirty = function() {
    c(n.apply(null, arguments));
  };
  function f(l) {
    const h = l && o.get(l);
    if (h)
      return h.peek();
  }
  u.peekKey = f, u.peek = function() {
    return f(n.apply(null, arguments));
  };
  function d(l) {
    return l ? o.delete(l) : !1;
  }
  return u.forgetKey = d, u.forget = function() {
    return d(n.apply(null, arguments));
  }, u.makeCacheKey = n, u.getKey = r ? function() {
    return n.apply(null, r.apply(null, arguments));
  } : n, Object.freeze(u);
}
function Uu(t) {
  return t;
}
var ss = (
  /** @class */
  function() {
    function t(e, r) {
      r === void 0 && (r = /* @__PURE__ */ Object.create(null)), this.resultCache = Sn ? /* @__PURE__ */ new WeakSet() : /* @__PURE__ */ new Set(), this.transform = e, r.getCacheKey && (this.getCacheKey = r.getCacheKey), this.cached = r.cache !== !1, this.resetCache();
    }
    return t.prototype.getCacheKey = function(e) {
      return [e];
    }, t.identity = function() {
      return new t(Uu, { cache: !1 });
    }, t.split = function(e, r, n) {
      return n === void 0 && (n = t.identity()), Object.assign(new t(
        function(i) {
          var a = e(i) ? r : n;
          return a.transformDocument(i);
        },
        // Reasonably assume both `left` and `right` transforms handle their own caching
        { cache: !1 }
      ), { left: r, right: n });
    }, t.prototype.resetCache = function() {
      var e = this;
      if (this.cached) {
        var r = new be(qe);
        this.performWork = _t(t.prototype.performWork.bind(this), {
          makeCacheKey: function(n) {
            var i = e.getCacheKey(n);
            if (i)
              return k(Array.isArray(i), 77), r.lookupArray(i);
          },
          max: me["documentTransform.cache"],
          cache: jt
        });
      }
    }, t.prototype.performWork = function(e) {
      return it(e), this.transform(e);
    }, t.prototype.transformDocument = function(e) {
      if (this.resultCache.has(e))
        return e;
      var r = this.performWork(e);
      return this.resultCache.add(r), r;
    }, t.prototype.concat = function(e) {
      var r = this;
      return Object.assign(new t(
        function(n) {
          return e.transformDocument(r.transformDocument(n));
        },
        // Reasonably assume both transforms handle their own caching
        { cache: !1 }
      ), {
        left: this,
        right: e
      });
    }, t;
  }()
), pt, Tt = Object.assign(function(t) {
  var e = pt.get(t);
  return e || (e = qa(t), pt.set(t, e)), e;
}, {
  reset: function() {
    pt = new Ua(
      me.print || 2e3
      /* defaultCacheSizes.print */
    );
  }
});
Tt.reset();
globalThis.__DEV__ !== !1 && Ba("print", function() {
  return pt ? pt.size : 0;
});
var $ = Array.isArray;
function de(t) {
  return Array.isArray(t) && t.length > 0;
}
var ai = {
  kind: T.FIELD,
  name: {
    kind: T.NAME,
    value: "__typename"
  }
};
function os(t, e) {
  return !t || t.selectionSet.selections.every(function(r) {
    return r.kind === T.FRAGMENT_SPREAD && os(e[r.name.value], e);
  });
}
function Bu(t) {
  return os(Me(t) || Ga(t), nt(at(t))) ? null : t;
}
function Qu(t) {
  var e = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  return t.forEach(function(n) {
    n && (n.name ? e.set(n.name, n) : n.test && r.set(n.test, n));
  }), function(n) {
    var i = e.get(n.name.value);
    return !i && r.size && r.forEach(function(a, s) {
      s(n) && (i = a);
    }), i;
  };
}
function si(t) {
  var e = /* @__PURE__ */ new Map();
  return function(n) {
    n === void 0 && (n = t);
    var i = e.get(n);
    return i || e.set(n, i = {
      // Variable and fragment spread names used directly within this
      // operation or fragment definition, as identified by key. These sets
      // will be populated during the first traversal of the document in
      // removeDirectivesFromDocument below.
      variables: /* @__PURE__ */ new Set(),
      fragmentSpreads: /* @__PURE__ */ new Set()
    }), i;
  };
}
function us(t, e) {
  it(e);
  for (var r = si(""), n = si(""), i = function(p) {
    for (var E = 0, b = void 0; E < p.length && (b = p[E]); ++E)
      if (!$(b)) {
        if (b.kind === T.OPERATION_DEFINITION)
          return r(b.name && b.name.value);
        if (b.kind === T.FRAGMENT_DEFINITION)
          return n(b.name.value);
      }
    return globalThis.__DEV__ !== !1 && k.error(97), null;
  }, a = 0, s = e.definitions.length - 1; s >= 0; --s)
    e.definitions[s].kind === T.OPERATION_DEFINITION && ++a;
  var o = Qu(t), u = function(p) {
    return de(p) && p.map(o).some(function(E) {
      return E && E.remove;
    });
  }, c = /* @__PURE__ */ new Map(), f = !1, d = {
    enter: function(p) {
      if (u(p.directives))
        return f = !0, null;
    }
  }, l = le(e, {
    // These two AST node types share the same implementation, defined above.
    Field: d,
    InlineFragment: d,
    VariableDefinition: {
      enter: function() {
        return !1;
      }
    },
    Variable: {
      enter: function(p, E, b, w, S) {
        var O = i(S);
        O && O.variables.add(p.name.value);
      }
    },
    FragmentSpread: {
      enter: function(p, E, b, w, S) {
        if (u(p.directives))
          return f = !0, null;
        var O = i(S);
        O && O.fragmentSpreads.add(p.name.value);
      }
    },
    FragmentDefinition: {
      enter: function(p, E, b, w) {
        c.set(JSON.stringify(w), p);
      },
      leave: function(p, E, b, w) {
        var S = c.get(JSON.stringify(w));
        if (p === S)
          return p;
        if (
          // This logic applies only if the document contains one or more
          // operations, since removing all fragments from a document containing
          // only fragments makes the document useless.
          a > 0 && p.selectionSet.selections.every(function(O) {
            return O.kind === T.FIELD && O.name.value === "__typename";
          })
        )
          return n(p.name.value).removed = !0, f = !0, null;
      }
    },
    Directive: {
      leave: function(p) {
        if (o(p))
          return f = !0, null;
      }
    }
  });
  if (!f)
    return e;
  var h = function(p) {
    return p.transitiveVars || (p.transitiveVars = new Set(p.variables), p.removed || p.fragmentSpreads.forEach(function(E) {
      h(n(E)).transitiveVars.forEach(function(b) {
        p.transitiveVars.add(b);
      });
    })), p;
  }, v = /* @__PURE__ */ new Set();
  l.definitions.forEach(function(p) {
    p.kind === T.OPERATION_DEFINITION ? h(r(p.name && p.name.value)).fragmentSpreads.forEach(function(E) {
      v.add(E);
    }) : p.kind === T.FRAGMENT_DEFINITION && // If there are no operations in the document, then all fragment
    // definitions count as usages of their own fragment names. This heuristic
    // prevents accidentally removing all fragment definitions from the
    // document just because it contains no operations that use the fragments.
    a === 0 && !n(p.name.value).removed && v.add(p.name.value);
  }), v.forEach(function(p) {
    h(n(p)).fragmentSpreads.forEach(function(E) {
      v.add(E);
    });
  });
  var m = function(p) {
    return !!// A fragment definition will be removed if there are no spreads that refer
    // to it, or the fragment was explicitly removed because it had no fields
    // other than __typename.
    (!v.has(p) || n(p).removed);
  }, g = {
    enter: function(p) {
      if (m(p.name.value))
        return null;
    }
  };
  return Bu(le(l, {
    // If the fragment is going to be removed, then leaving any dangling
    // FragmentSpread nodes with the same name would be a mistake.
    FragmentSpread: g,
    // This is where the fragment definition is actually removed.
    FragmentDefinition: g,
    OperationDefinition: {
      leave: function(p) {
        if (p.variableDefinitions) {
          var E = h(
            // If an operation is anonymous, we use the empty string as its key.
            r(p.name && p.name.value)
          ).transitiveVars;
          if (E.size < p.variableDefinitions.length)
            return y(y({}, p), { variableDefinitions: p.variableDefinitions.filter(function(b) {
              return E.has(b.variable.name.value);
            }) });
        }
      }
    }
  }));
}
var Nn = Object.assign(function(t) {
  return le(t, {
    SelectionSet: {
      enter: function(e, r, n) {
        if (!(n && n.kind === T.OPERATION_DEFINITION)) {
          var i = e.selections;
          if (i) {
            var a = i.some(function(o) {
              return Ie(o) && (o.name.value === "__typename" || o.name.value.lastIndexOf("__", 0) === 0);
            });
            if (!a) {
              var s = n;
              if (!(Ie(s) && s.directives && s.directives.some(function(o) {
                return o.name.value === "export";
              })))
                return y(y({}, e), { selections: re(re([], i, !0), [ai], !1) });
            }
          }
        }
      }
    }
  });
}, {
  added: function(t) {
    return t === ai;
  }
});
function zu(t) {
  var e = st(t), r = e.operation;
  if (r === "query")
    return t;
  var n = le(t, {
    OperationDefinition: {
      enter: function(i) {
        return y(y({}, i), { operation: "query" });
      }
    }
  });
  return n;
}
function cs(t) {
  it(t);
  var e = us([
    {
      test: function(r) {
        return r.name.value === "client";
      },
      remove: !0
    }
  ], t);
  return e;
}
function Wu(t) {
  return it(t), le(t, {
    FragmentSpread: function(e) {
      var r;
      if (!(!((r = e.directives) === null || r === void 0) && r.some(function(n) {
        return n.name.value === "unmask";
      })))
        return y(y({}, e), { directives: re(re([], e.directives || [], !0), [
          {
            kind: T.DIRECTIVE,
            name: { kind: T.NAME, value: "nonreactive" }
          }
        ], !1) });
    }
  });
}
var $u = Object.prototype.hasOwnProperty;
function oi() {
  for (var t = [], e = 0; e < arguments.length; e++)
    t[e] = arguments[e];
  return Kt(t);
}
function Kt(t) {
  var e = t[0] || {}, r = t.length;
  if (r > 1)
    for (var n = new Ne(), i = 1; i < r; ++i)
      e = n.merge(e, t[i]);
  return e;
}
var Hu = function(t, e, r) {
  return this.merge(t[r], e[r]);
}, Ne = (
  /** @class */
  function() {
    function t(e) {
      e === void 0 && (e = Hu), this.reconciler = e, this.isObject = W, this.pastCopies = /* @__PURE__ */ new Set();
    }
    return t.prototype.merge = function(e, r) {
      for (var n = this, i = [], a = 2; a < arguments.length; a++)
        i[a - 2] = arguments[a];
      return W(r) && W(e) ? (Object.keys(r).forEach(function(s) {
        if ($u.call(e, s)) {
          var o = e[s];
          if (r[s] !== o) {
            var u = n.reconciler.apply(n, re([
              e,
              r,
              s
            ], i, !1));
            u !== o && (e = n.shallowCopyForMerge(e), e[s] = u);
          }
        } else
          e = n.shallowCopyForMerge(e), e[s] = r[s];
      }), e) : r;
    }, t.prototype.shallowCopyForMerge = function(e) {
      return W(e) && (this.pastCopies.has(e) || (Array.isArray(e) ? e = e.slice(0) : e = y({ __proto__: Object.getPrototypeOf(e) }, e), this.pastCopies.add(e))), e;
    }, t;
  }()
);
function Gu(t, e) {
  var r = typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r) return (r = r.call(t)).next.bind(r);
  if (Array.isArray(t) || (r = Ju(t)) || e) {
    r && (t = r);
    var n = 0;
    return function() {
      return n >= t.length ? { done: !0 } : { done: !1, value: t[n++] };
    };
  }
  throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ju(t, e) {
  if (t) {
    if (typeof t == "string") return ui(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return ui(t, e);
  }
}
function ui(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++)
    n[r] = t[r];
  return n;
}
function ci(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
  }
}
function Dn(t, e, r) {
  return e && ci(t.prototype, e), r && ci(t, r), Object.defineProperty(t, "prototype", { writable: !1 }), t;
}
var xn = function() {
  return typeof Symbol == "function";
}, An = function(t) {
  return xn() && !!Symbol[t];
}, Rn = function(t) {
  return An(t) ? Symbol[t] : "@@" + t;
};
xn() && !An("observable") && (Symbol.observable = Symbol("observable"));
var Yu = Rn("iterator"), en = Rn("observable"), fs = Rn("species");
function Vt(t, e) {
  var r = t[e];
  if (r != null) {
    if (typeof r != "function") throw new TypeError(r + " is not a function");
    return r;
  }
}
function ut(t) {
  var e = t.constructor;
  return e !== void 0 && (e = e[fs], e === null && (e = void 0)), e !== void 0 ? e : B;
}
function Xu(t) {
  return t instanceof B;
}
function et(t) {
  et.log ? et.log(t) : setTimeout(function() {
    throw t;
  });
}
function Pt(t) {
  Promise.resolve().then(function() {
    try {
      t();
    } catch (e) {
      et(e);
    }
  });
}
function ls(t) {
  var e = t._cleanup;
  if (e !== void 0 && (t._cleanup = void 0, !!e))
    try {
      if (typeof e == "function")
        e();
      else {
        var r = Vt(e, "unsubscribe");
        r && r.call(e);
      }
    } catch (n) {
      et(n);
    }
}
function tn(t) {
  t._observer = void 0, t._queue = void 0, t._state = "closed";
}
function Ku(t) {
  var e = t._queue;
  if (e) {
    t._queue = void 0, t._state = "ready";
    for (var r = 0; r < e.length && (hs(t, e[r].type, e[r].value), t._state !== "closed"); ++r)
      ;
  }
}
function hs(t, e, r) {
  t._state = "running";
  var n = t._observer;
  try {
    var i = Vt(n, e);
    switch (e) {
      case "next":
        i && i.call(n, r);
        break;
      case "error":
        if (tn(t), i) i.call(n, r);
        else throw r;
        break;
      case "complete":
        tn(t), i && i.call(n);
        break;
    }
  } catch (a) {
    et(a);
  }
  t._state === "closed" ? ls(t) : t._state === "running" && (t._state = "ready");
}
function ir(t, e, r) {
  if (t._state !== "closed") {
    if (t._state === "buffering") {
      t._queue.push({
        type: e,
        value: r
      });
      return;
    }
    if (t._state !== "ready") {
      t._state = "buffering", t._queue = [{
        type: e,
        value: r
      }], Pt(function() {
        return Ku(t);
      });
      return;
    }
    hs(t, e, r);
  }
}
var Zu = /* @__PURE__ */ function() {
  function t(r, n) {
    this._cleanup = void 0, this._observer = r, this._queue = void 0, this._state = "initializing";
    var i = new ec(this);
    try {
      this._cleanup = n.call(void 0, i);
    } catch (a) {
      i.error(a);
    }
    this._state === "initializing" && (this._state = "ready");
  }
  var e = t.prototype;
  return e.unsubscribe = function() {
    this._state !== "closed" && (tn(this), ls(this));
  }, Dn(t, [{
    key: "closed",
    get: function() {
      return this._state === "closed";
    }
  }]), t;
}(), ec = /* @__PURE__ */ function() {
  function t(r) {
    this._subscription = r;
  }
  var e = t.prototype;
  return e.next = function(n) {
    ir(this._subscription, "next", n);
  }, e.error = function(n) {
    ir(this._subscription, "error", n);
  }, e.complete = function() {
    ir(this._subscription, "complete");
  }, Dn(t, [{
    key: "closed",
    get: function() {
      return this._subscription._state === "closed";
    }
  }]), t;
}(), B = /* @__PURE__ */ function() {
  function t(r) {
    if (!(this instanceof t)) throw new TypeError("Observable cannot be called as a function");
    if (typeof r != "function") throw new TypeError("Observable initializer must be a function");
    this._subscriber = r;
  }
  var e = t.prototype;
  return e.subscribe = function(n) {
    return (typeof n != "object" || n === null) && (n = {
      next: n,
      error: arguments[1],
      complete: arguments[2]
    }), new Zu(n, this._subscriber);
  }, e.forEach = function(n) {
    var i = this;
    return new Promise(function(a, s) {
      if (typeof n != "function") {
        s(new TypeError(n + " is not a function"));
        return;
      }
      function o() {
        u.unsubscribe(), a();
      }
      var u = i.subscribe({
        next: function(c) {
          try {
            n(c, o);
          } catch (f) {
            s(f), u.unsubscribe();
          }
        },
        error: s,
        complete: a
      });
    });
  }, e.map = function(n) {
    var i = this;
    if (typeof n != "function") throw new TypeError(n + " is not a function");
    var a = ut(this);
    return new a(function(s) {
      return i.subscribe({
        next: function(o) {
          try {
            o = n(o);
          } catch (u) {
            return s.error(u);
          }
          s.next(o);
        },
        error: function(o) {
          s.error(o);
        },
        complete: function() {
          s.complete();
        }
      });
    });
  }, e.filter = function(n) {
    var i = this;
    if (typeof n != "function") throw new TypeError(n + " is not a function");
    var a = ut(this);
    return new a(function(s) {
      return i.subscribe({
        next: function(o) {
          try {
            if (!n(o)) return;
          } catch (u) {
            return s.error(u);
          }
          s.next(o);
        },
        error: function(o) {
          s.error(o);
        },
        complete: function() {
          s.complete();
        }
      });
    });
  }, e.reduce = function(n) {
    var i = this;
    if (typeof n != "function") throw new TypeError(n + " is not a function");
    var a = ut(this), s = arguments.length > 1, o = !1, u = arguments[1], c = u;
    return new a(function(f) {
      return i.subscribe({
        next: function(d) {
          var l = !o;
          if (o = !0, !l || s)
            try {
              c = n(c, d);
            } catch (h) {
              return f.error(h);
            }
          else
            c = d;
        },
        error: function(d) {
          f.error(d);
        },
        complete: function() {
          if (!o && !s) return f.error(new TypeError("Cannot reduce an empty sequence"));
          f.next(c), f.complete();
        }
      });
    });
  }, e.concat = function() {
    for (var n = this, i = arguments.length, a = new Array(i), s = 0; s < i; s++)
      a[s] = arguments[s];
    var o = ut(this);
    return new o(function(u) {
      var c, f = 0;
      function d(l) {
        c = l.subscribe({
          next: function(h) {
            u.next(h);
          },
          error: function(h) {
            u.error(h);
          },
          complete: function() {
            f === a.length ? (c = void 0, u.complete()) : d(o.from(a[f++]));
          }
        });
      }
      return d(n), function() {
        c && (c.unsubscribe(), c = void 0);
      };
    });
  }, e.flatMap = function(n) {
    var i = this;
    if (typeof n != "function") throw new TypeError(n + " is not a function");
    var a = ut(this);
    return new a(function(s) {
      var o = [], u = i.subscribe({
        next: function(f) {
          if (n)
            try {
              f = n(f);
            } catch (l) {
              return s.error(l);
            }
          var d = a.from(f).subscribe({
            next: function(l) {
              s.next(l);
            },
            error: function(l) {
              s.error(l);
            },
            complete: function() {
              var l = o.indexOf(d);
              l >= 0 && o.splice(l, 1), c();
            }
          });
          o.push(d);
        },
        error: function(f) {
          s.error(f);
        },
        complete: function() {
          c();
        }
      });
      function c() {
        u.closed && o.length === 0 && s.complete();
      }
      return function() {
        o.forEach(function(f) {
          return f.unsubscribe();
        }), u.unsubscribe();
      };
    });
  }, e[en] = function() {
    return this;
  }, t.from = function(n) {
    var i = typeof this == "function" ? this : t;
    if (n == null) throw new TypeError(n + " is not an object");
    var a = Vt(n, en);
    if (a) {
      var s = a.call(n);
      if (Object(s) !== s) throw new TypeError(s + " is not an object");
      return Xu(s) && s.constructor === i ? s : new i(function(o) {
        return s.subscribe(o);
      });
    }
    if (An("iterator") && (a = Vt(n, Yu), a))
      return new i(function(o) {
        Pt(function() {
          if (!o.closed) {
            for (var u = Gu(a.call(n)), c; !(c = u()).done; ) {
              var f = c.value;
              if (o.next(f), o.closed) return;
            }
            o.complete();
          }
        });
      });
    if (Array.isArray(n))
      return new i(function(o) {
        Pt(function() {
          if (!o.closed) {
            for (var u = 0; u < n.length; ++u)
              if (o.next(n[u]), o.closed) return;
            o.complete();
          }
        });
      });
    throw new TypeError(n + " is not observable");
  }, t.of = function() {
    for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
      i[a] = arguments[a];
    var s = typeof this == "function" ? this : t;
    return new s(function(o) {
      Pt(function() {
        if (!o.closed) {
          for (var u = 0; u < i.length; ++u)
            if (o.next(i[u]), o.closed) return;
          o.complete();
        }
      });
    });
  }, Dn(t, null, [{
    key: fs,
    get: function() {
      return this;
    }
  }]), t;
}();
xn() && Object.defineProperty(B, Symbol("extensions"), {
  value: {
    symbol: en,
    hostReportError: et
  },
  configurable: !0
});
function tc(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function rc(t) {
  var e, r = t.Symbol;
  if (typeof r == "function")
    if (r.observable)
      e = r.observable;
    else {
      typeof r.for == "function" ? e = r.for("https://github.com/benlesh/symbol-observable") : e = r("https://github.com/benlesh/symbol-observable");
      try {
        r.observable = e;
      } catch {
      }
    }
  else
    e = "@@observable";
  return e;
}
var Be;
typeof self < "u" ? Be = self : typeof window < "u" ? Be = window : typeof global < "u" ? Be = global : typeof module < "u" ? Be = module : Be = Function("return this")();
rc(Be);
var fi = B.prototype, li = "@@observable";
fi[li] || (fi[li] = function() {
  return this;
});
function nc(t) {
  return t.catch(function() {
  }), t;
}
var ic = Object.prototype.toString;
function ds(t) {
  return rn(t);
}
function rn(t, e) {
  switch (ic.call(t)) {
    case "[object Array]": {
      if (e = e || /* @__PURE__ */ new Map(), e.has(t))
        return e.get(t);
      var r = t.slice(0);
      return e.set(t, r), r.forEach(function(i, a) {
        r[a] = rn(i, e);
      }), r;
    }
    case "[object Object]": {
      if (e = e || /* @__PURE__ */ new Map(), e.has(t))
        return e.get(t);
      var n = Object.create(Object.getPrototypeOf(t));
      return e.set(t, n), Object.keys(t).forEach(function(i) {
        n[i] = rn(t[i], e);
      }), n;
    }
    default:
      return t;
  }
}
function ac(t) {
  var e = /* @__PURE__ */ new Set([t]);
  return e.forEach(function(r) {
    W(r) && sc(r) === r && Object.getOwnPropertyNames(r).forEach(function(n) {
      W(r[n]) && e.add(r[n]);
    });
  }), t;
}
function sc(t) {
  if (globalThis.__DEV__ !== !1 && !Object.isFrozen(t))
    try {
      Object.freeze(t);
    } catch (e) {
      if (e instanceof TypeError)
        return null;
      throw e;
    }
  return t;
}
function Ut(t) {
  return globalThis.__DEV__ !== !1 && ac(t), t;
}
function yt(t, e, r) {
  var n = [];
  t.forEach(function(i) {
    return i[e] && n.push(i);
  }), n.forEach(function(i) {
    return i[e](r);
  });
}
function ar(t, e, r) {
  return new B(function(n) {
    var i = {
      // Normally we would initialize promiseQueue to Promise.resolve(), but
      // in this case, for backwards compatibility, we need to be careful to
      // invoke the first callback synchronously.
      then: function(u) {
        return new Promise(function(c) {
          return c(u());
        });
      }
    };
    function a(u, c) {
      return function(f) {
        if (u) {
          var d = function() {
            return n.closed ? (
              /* will be swallowed */
              0
            ) : u(f);
          };
          i = i.then(d, d).then(function(l) {
            return n.next(l);
          }, function(l) {
            return n.error(l);
          });
        } else
          n[c](f);
      };
    }
    var s = {
      next: a(e, "next"),
      error: a(r, "error"),
      complete: function() {
        i.then(function() {
          return n.complete();
        });
      }
    }, o = t.subscribe(s);
    return function() {
      return o.unsubscribe();
    };
  });
}
function ps(t) {
  function e(r) {
    Object.defineProperty(t, r, { value: B });
  }
  return ja && Symbol.species && e(Symbol.species), e("@@species"), t;
}
function hi(t) {
  return t && typeof t.then == "function";
}
var Qe = (
  /** @class */
  function(t) {
    he(e, t);
    function e(r) {
      var n = t.call(this, function(i) {
        return n.addObserver(i), function() {
          return n.removeObserver(i);
        };
      }) || this;
      return n.observers = /* @__PURE__ */ new Set(), n.promise = new Promise(function(i, a) {
        n.resolve = i, n.reject = a;
      }), n.handlers = {
        next: function(i) {
          n.sub !== null && (n.latest = ["next", i], n.notify("next", i), yt(n.observers, "next", i));
        },
        error: function(i) {
          var a = n.sub;
          a !== null && (a && setTimeout(function() {
            return a.unsubscribe();
          }), n.sub = null, n.latest = ["error", i], n.reject(i), n.notify("error", i), yt(n.observers, "error", i));
        },
        complete: function() {
          var i = n, a = i.sub, s = i.sources, o = s === void 0 ? [] : s;
          if (a !== null) {
            var u = o.shift();
            u ? hi(u) ? u.then(function(c) {
              return n.sub = c.subscribe(n.handlers);
            }, n.handlers.error) : n.sub = u.subscribe(n.handlers) : (a && setTimeout(function() {
              return a.unsubscribe();
            }), n.sub = null, n.latest && n.latest[0] === "next" ? n.resolve(n.latest[1]) : n.resolve(), n.notify("complete"), yt(n.observers, "complete"));
          }
        }
      }, n.nextResultListeners = /* @__PURE__ */ new Set(), n.cancel = function(i) {
        n.reject(i), n.sources = [], n.handlers.error(i);
      }, n.promise.catch(function(i) {
      }), typeof r == "function" && (r = [new B(r)]), hi(r) ? r.then(function(i) {
        return n.start(i);
      }, n.handlers.error) : n.start(r), n;
    }
    return e.prototype.start = function(r) {
      this.sub === void 0 && (this.sources = Array.from(r), this.handlers.complete());
    }, e.prototype.deliverLastMessage = function(r) {
      if (this.latest) {
        var n = this.latest[0], i = r[n];
        i && i.call(r, this.latest[1]), this.sub === null && n === "next" && r.complete && r.complete();
      }
    }, e.prototype.addObserver = function(r) {
      this.observers.has(r) || (this.deliverLastMessage(r), this.observers.add(r));
    }, e.prototype.removeObserver = function(r) {
      this.observers.delete(r) && this.observers.size < 1 && this.handlers.complete();
    }, e.prototype.notify = function(r, n) {
      var i = this.nextResultListeners;
      i.size && (this.nextResultListeners = /* @__PURE__ */ new Set(), i.forEach(function(a) {
        return a(r, n);
      }));
    }, e.prototype.beforeNext = function(r) {
      var n = !1;
      this.nextResultListeners.add(function(i, a) {
        n || (n = !0, r(i, a));
      });
    }, e;
  }(B)
);
ps(Qe);
function Ge(t) {
  return "incremental" in t;
}
function oc(t) {
  return "hasNext" in t && "data" in t;
}
function uc(t) {
  return Ge(t) || oc(t);
}
function cc(t) {
  return W(t) && "payload" in t;
}
function ys(t, e) {
  var r = t, n = new Ne();
  return Ge(e) && de(e.incremental) && e.incremental.forEach(function(i) {
    for (var a = i.data, s = i.path, o = s.length - 1; o >= 0; --o) {
      var u = s[o], c = !isNaN(+u), f = c ? [] : {};
      f[u] = a, a = f;
    }
    r = n.merge(r, a);
  }), r;
}
function Ft(t) {
  var e = nn(t);
  return de(e);
}
function nn(t) {
  var e = de(t.errors) ? t.errors.slice(0) : [];
  return Ge(t) && de(t.incremental) && t.incremental.forEach(function(r) {
    r.errors && e.push.apply(e, r.errors);
  }), e;
}
function tt() {
  for (var t = [], e = 0; e < arguments.length; e++)
    t[e] = arguments[e];
  var r = /* @__PURE__ */ Object.create(null);
  return t.forEach(function(n) {
    n && Object.keys(n).forEach(function(i) {
      var a = n[i];
      a !== void 0 && (r[i] = a);
    });
  }), r;
}
function sr(t, e) {
  return tt(t, e, e.variables && {
    variables: tt(y(y({}, t && t.variables), e.variables))
  });
}
function or(t) {
  return new B(function(e) {
    e.error(t);
  });
}
var vs = function(t, e, r) {
  var n = new Error(r);
  throw n.name = "ServerError", n.response = t, n.statusCode = t.status, n.result = e, n;
};
function fc(t) {
  for (var e = [
    "query",
    "operationName",
    "variables",
    "extensions",
    "context"
  ], r = 0, n = Object.keys(t); r < n.length; r++) {
    var i = n[r];
    if (e.indexOf(i) < 0)
      throw ie(46, i);
  }
  return t;
}
function lc(t, e) {
  var r = y({}, t), n = function(a) {
    typeof a == "function" ? r = y(y({}, r), a(r)) : r = y(y({}, r), a);
  }, i = function() {
    return y({}, r);
  };
  return Object.defineProperty(e, "setContext", {
    enumerable: !1,
    value: n
  }), Object.defineProperty(e, "getContext", {
    enumerable: !1,
    value: i
  }), e;
}
function hc(t) {
  var e = {
    variables: t.variables || {},
    extensions: t.extensions || {},
    operationName: t.operationName,
    query: t.query
  };
  return e.operationName || (e.operationName = typeof e.query != "string" ? Ct(e.query) || void 0 : ""), e;
}
function dc(t, e) {
  var r = y({}, t), n = new Set(Object.keys(t));
  return le(e, {
    Variable: function(i, a, s) {
      s && s.kind !== "VariableDefinition" && n.delete(i.name.value);
    }
  }), n.forEach(function(i) {
    delete r[i];
  }), r;
}
function di(t, e) {
  return e ? e(t) : B.of();
}
function ct(t) {
  return typeof t == "function" ? new je(t) : t;
}
function xt(t) {
  return t.request.length <= 1;
}
var je = (
  /** @class */
  function() {
    function t(e) {
      e && (this.request = e);
    }
    return t.empty = function() {
      return new t(function() {
        return B.of();
      });
    }, t.from = function(e) {
      return e.length === 0 ? t.empty() : e.map(ct).reduce(function(r, n) {
        return r.concat(n);
      });
    }, t.split = function(e, r, n) {
      var i = ct(r), a = ct(n || new t(di)), s;
      return xt(i) && xt(a) ? s = new t(function(o) {
        return e(o) ? i.request(o) || B.of() : a.request(o) || B.of();
      }) : s = new t(function(o, u) {
        return e(o) ? i.request(o, u) || B.of() : a.request(o, u) || B.of();
      }), Object.assign(s, { left: i, right: a });
    }, t.execute = function(e, r) {
      return e.request(lc(r.context, hc(fc(r)))) || B.of();
    }, t.concat = function(e, r) {
      var n = ct(e);
      if (xt(n))
        return globalThis.__DEV__ !== !1 && k.warn(38, n), n;
      var i = ct(r), a;
      return xt(i) ? a = new t(function(s) {
        return n.request(s, function(o) {
          return i.request(o) || B.of();
        }) || B.of();
      }) : a = new t(function(s, o) {
        return n.request(s, function(u) {
          return i.request(u, o) || B.of();
        }) || B.of();
      }), Object.assign(a, { left: n, right: i });
    }, t.prototype.split = function(e, r, n) {
      return this.concat(t.split(e, r, n || new t(di)));
    }, t.prototype.concat = function(e) {
      return t.concat(this, e);
    }, t.prototype.request = function(e, r) {
      throw ie(39);
    }, t.prototype.onError = function(e, r) {
      if (r && r.error)
        return r.error(e), !1;
      throw e;
    }, t.prototype.setOnError = function(e) {
      return this.onError = e, this;
    }, t;
  }()
), pc = je.split, an = je.execute;
function yc(t) {
  var e, r = t[Symbol.asyncIterator]();
  return e = {
    next: function() {
      return r.next();
    }
  }, e[Symbol.asyncIterator] = function() {
    return this;
  }, e;
}
function vc(t) {
  var e = null, r = null, n = !1, i = [], a = [];
  function s(d) {
    if (!r) {
      if (a.length) {
        var l = a.shift();
        if (Array.isArray(l) && l[0])
          return l[0]({ value: d, done: !1 });
      }
      i.push(d);
    }
  }
  function o(d) {
    r = d;
    var l = a.slice();
    l.forEach(function(h) {
      h[1](d);
    }), !e || e();
  }
  function u() {
    n = !0;
    var d = a.slice();
    d.forEach(function(l) {
      l[0]({ value: void 0, done: !0 });
    }), !e || e();
  }
  e = function() {
    e = null, t.removeListener("data", s), t.removeListener("error", o), t.removeListener("end", u), t.removeListener("finish", u), t.removeListener("close", u);
  }, t.on("data", s), t.on("error", o), t.on("end", u), t.on("finish", u), t.on("close", u);
  function c() {
    return new Promise(function(d, l) {
      if (r)
        return l(r);
      if (i.length)
        return d({ value: i.shift(), done: !1 });
      if (n)
        return d({ value: void 0, done: !0 });
      a.push([d, l]);
    });
  }
  var f = {
    next: function() {
      return c();
    }
  };
  return $t && (f[Symbol.asyncIterator] = function() {
    return this;
  }), f;
}
function mc(t) {
  var e = !1, r = {
    next: function() {
      return e ? Promise.resolve({
        value: void 0,
        done: !0
      }) : (e = !0, new Promise(function(n, i) {
        t.then(function(a) {
          n({ value: a, done: !1 });
        }).catch(i);
      }));
    }
  };
  return $t && (r[Symbol.asyncIterator] = function() {
    return this;
  }), r;
}
function pi(t) {
  var e = {
    next: function() {
      return t.read();
    }
  };
  return $t && (e[Symbol.asyncIterator] = function() {
    return this;
  }), e;
}
function gc(t) {
  return !!t.body;
}
function bc(t) {
  return !!t.getReader;
}
function Ec(t) {
  return !!($t && t[Symbol.asyncIterator]);
}
function _c(t) {
  return !!t.stream;
}
function wc(t) {
  return !!t.arrayBuffer;
}
function Sc(t) {
  return !!t.pipe;
}
function Oc(t) {
  var e = t;
  if (gc(t) && (e = t.body), Ec(e))
    return yc(e);
  if (bc(e))
    return pi(e.getReader());
  if (_c(e))
    return pi(e.stream().getReader());
  if (wc(e))
    return mc(e.arrayBuffer());
  if (Sc(e))
    return vc(e);
  throw new Error("Unknown body type for responseIterator. Please pass a streamable response.");
}
var Cn = Symbol();
function Tc(t) {
  return t.extensions ? Array.isArray(t.extensions[Cn]) : !1;
}
function ms(t) {
  return t.hasOwnProperty("graphQLErrors");
}
var Ic = function(t) {
  var e = re(re(re([], t.graphQLErrors, !0), t.clientErrors, !0), t.protocolErrors, !0);
  return t.networkError && e.push(t.networkError), e.map(function(r) {
    return W(r) && r.message || "Error message not found.";
  }).join(`
`);
}, Oe = (
  /** @class */
  function(t) {
    he(e, t);
    function e(r) {
      var n = r.graphQLErrors, i = r.protocolErrors, a = r.clientErrors, s = r.networkError, o = r.errorMessage, u = r.extraInfo, c = t.call(this, o) || this;
      return c.name = "ApolloError", c.graphQLErrors = n || [], c.protocolErrors = i || [], c.clientErrors = a || [], c.networkError = s || null, c.message = o || Ic(c), c.extraInfo = u, c.cause = re(re(re([
        s
      ], n || [], !0), i || [], !0), a || [], !0).find(function(f) {
        return !!f;
      }) || null, c.__proto__ = e.prototype, c;
    }
    return e;
  }(Error)
), yi = Object.prototype.hasOwnProperty;
function kc(t, e) {
  return _e(this, void 0, void 0, function() {
    var r, n, i, a, s, o, u, c, f, d, l, h, v, m, g, p, E, b, w, S, O, N, A, L;
    return we(this, function(j) {
      switch (j.label) {
        case 0:
          if (TextDecoder === void 0)
            throw new Error("TextDecoder must be defined in the environment: please import a polyfill.");
          r = new TextDecoder("utf-8"), n = (L = t.headers) === null || L === void 0 ? void 0 : L.get("content-type"), i = "boundary=", a = n != null && n.includes(i) ? n == null ? void 0 : n.substring((n == null ? void 0 : n.indexOf(i)) + i.length).replace(/['"]/g, "").replace(/\;(.*)/gm, "").trim() : "-", s = `\r
--`.concat(a), o = "", u = Oc(t), c = !0, j.label = 1;
        case 1:
          return c ? [4, u.next()] : [3, 3];
        case 2:
          for (f = j.sent(), d = f.value, l = f.done, h = typeof d == "string" ? d : r.decode(d), v = o.length - s.length + 1, c = !l, o += h, m = o.indexOf(s, v); m > -1; ) {
            if (g = void 0, N = [
              o.slice(0, m),
              o.slice(m + s.length)
            ], g = N[0], o = N[1], p = g.indexOf(`\r
\r
`), E = Nc(g.slice(0, p)), b = E["content-type"], b && b.toLowerCase().indexOf("application/json") === -1)
              throw new Error("Unsupported patch content type: application/json is required.");
            if (w = g.slice(p), w) {
              if (S = gs(t, w), Object.keys(S).length > 1 || "data" in S || "incremental" in S || "errors" in S || "payload" in S)
                if (cc(S)) {
                  if (O = {}, "payload" in S) {
                    if (Object.keys(S).length === 1 && S.payload === null)
                      return [
                        2
                        /*return*/
                      ];
                    O = y({}, S.payload);
                  }
                  "errors" in S && (O = y(y({}, O), { extensions: y(y({}, "extensions" in O ? O.extensions : null), (A = {}, A[Cn] = S.errors, A)) })), e(O);
                } else
                  e(S);
              else if (
                // If the chunk contains only a "hasNext: false", we can call
                // observer.complete() immediately.
                Object.keys(S).length === 1 && "hasNext" in S && !S.hasNext
              )
                return [
                  2
                  /*return*/
                ];
            }
            m = o.indexOf(s);
          }
          return [3, 1];
        case 3:
          return [
            2
            /*return*/
          ];
      }
    });
  });
}
function Nc(t) {
  var e = {};
  return t.split(`
`).forEach(function(r) {
    var n = r.indexOf(":");
    if (n > -1) {
      var i = r.slice(0, n).trim().toLowerCase(), a = r.slice(n + 1).trim();
      e[i] = a;
    }
  }), e;
}
function gs(t, e) {
  if (t.status >= 300) {
    var r = function() {
      try {
        return JSON.parse(e);
      } catch {
        return e;
      }
    };
    vs(t, r(), "Response not successful: Received status code ".concat(t.status));
  }
  try {
    return JSON.parse(e);
  } catch (i) {
    var n = i;
    throw n.name = "ServerParseError", n.response = t, n.statusCode = t.status, n.bodyText = e, n;
  }
}
function Dc(t, e) {
  t.result && t.result.errors && t.result.data && e.next(t.result), e.error(t);
}
function xc(t) {
  return function(e) {
    return e.text().then(function(r) {
      return gs(e, r);
    }).then(function(r) {
      return !Array.isArray(r) && !yi.call(r, "data") && !yi.call(r, "errors") && vs(e, r, "Server response was missing for query '".concat(Array.isArray(t) ? t.map(function(n) {
        return n.operationName;
      }) : t.operationName, "'.")), r;
    });
  };
}
var sn = function(t, e) {
  var r;
  try {
    r = JSON.stringify(t);
  } catch (i) {
    var n = ie(42, e, i.message);
    throw n.parseError = i, n;
  }
  return r;
}, Ac = {
  includeQuery: !0,
  includeExtensions: !1,
  preserveHeaderCase: !1
}, Rc = {
  // headers are case insensitive (https://stackoverflow.com/a/5259004)
  accept: "*/*",
  // The content-type header describes the type of the body of the request, and
  // so it typically only is sent with requests that actually have bodies. One
  // could imagine that Apollo Client would remove this header when constructing
  // a GET request (which has no body), but we historically have not done that.
  // This means that browsers will preflight all Apollo Client requests (even
  // GET requests). Apollo Server's CSRF prevention feature (introduced in
  // AS3.7) takes advantage of this fact and does not block requests with this
  // header. If you want to drop this header from GET requests, then you should
  // probably replace it with a `apollo-require-preflight` header, or servers
  // with CSRF prevention enabled might block your GET request. See
  // https://www.apollographql.com/docs/apollo-server/security/cors/#preventing-cross-site-request-forgery-csrf
  // for more details.
  "content-type": "application/json"
}, Cc = {
  method: "POST"
}, Pc = {
  http: Ac,
  headers: Rc,
  options: Cc
}, Fc = function(t, e) {
  return e(t);
};
function Lc(t, e) {
  for (var r = [], n = 2; n < arguments.length; n++)
    r[n - 2] = arguments[n];
  var i = {}, a = {};
  r.forEach(function(d) {
    i = y(y(y({}, i), d.options), { headers: y(y({}, i.headers), d.headers) }), d.credentials && (i.credentials = d.credentials), a = y(y({}, a), d.http);
  }), i.headers && (i.headers = Mc(i.headers, a.preserveHeaderCase));
  var s = t.operationName, o = t.extensions, u = t.variables, c = t.query, f = { operationName: s, variables: u };
  return a.includeExtensions && (f.extensions = o), a.includeQuery && (f.query = e(c, Tt)), {
    options: i,
    body: f
  };
}
function Mc(t, e) {
  if (!e) {
    var r = {};
    return Object.keys(Object(t)).forEach(function(a) {
      r[a.toLowerCase()] = t[a];
    }), r;
  }
  var n = {};
  Object.keys(Object(t)).forEach(function(a) {
    n[a.toLowerCase()] = {
      originalName: a,
      value: t[a]
    };
  });
  var i = {};
  return Object.keys(n).forEach(function(a) {
    i[n[a].originalName] = n[a].value;
  }), i;
}
var qc = function(t) {
  if (!t && typeof fetch > "u")
    throw ie(40);
}, jc = function(t, e) {
  var r = t.getContext(), n = r.uri;
  return n || (typeof e == "function" ? e(t) : e || "/graphql");
};
function Vc(t, e) {
  var r = [], n = function(d, l) {
    r.push("".concat(d, "=").concat(encodeURIComponent(l)));
  };
  if ("query" in e && n("query", e.query), e.operationName && n("operationName", e.operationName), e.variables) {
    var i = void 0;
    try {
      i = sn(e.variables, "Variables map");
    } catch (d) {
      return { parseError: d };
    }
    n("variables", i);
  }
  if (e.extensions) {
    var a = void 0;
    try {
      a = sn(e.extensions, "Extensions map");
    } catch (d) {
      return { parseError: d };
    }
    n("extensions", a);
  }
  var s = "", o = t, u = t.indexOf("#");
  u !== -1 && (s = t.substr(u), o = t.substr(0, u));
  var c = o.indexOf("?") === -1 ? "?" : "&", f = o + c + r.join("&") + s;
  return { newURI: f };
}
var vi = fe(function() {
  return fetch;
}), Uc = function(t) {
  t === void 0 && (t = {});
  var e = t.uri, r = e === void 0 ? "/graphql" : e, n = t.fetch, i = t.print, a = i === void 0 ? Fc : i, s = t.includeExtensions, o = t.preserveHeaderCase, u = t.useGETForQueries, c = t.includeUnusedVariables, f = c === void 0 ? !1 : c, d = ve(t, ["uri", "fetch", "print", "includeExtensions", "preserveHeaderCase", "useGETForQueries", "includeUnusedVariables"]);
  globalThis.__DEV__ !== !1 && qc(n || vi);
  var l = {
    http: { includeExtensions: s, preserveHeaderCase: o },
    options: d.fetchOptions,
    credentials: d.credentials,
    headers: d.headers
  };
  return new je(function(h) {
    var v = jc(h, r), m = h.getContext(), g = {};
    if (m.clientAwareness) {
      var p = m.clientAwareness, E = p.name, b = p.version;
      E && (g["apollographql-client-name"] = E), b && (g["apollographql-client-version"] = b);
    }
    var w = y(y({}, g), m.headers), S = {
      http: m.http,
      options: m.fetchOptions,
      credentials: m.credentials,
      headers: w
    };
    if (bt(["client"], h.query)) {
      var O = cs(h.query);
      if (!O)
        return or(new Error("HttpLink: Trying to send a client-only query to the server. To send to the server, ensure a non-client field is added to the query or set the `transformOptions.removeClientFields` option to `true`."));
      h.query = O;
    }
    var N = Lc(h, a, Pc, l, S), A = N.options, L = N.body;
    L.variables && !f && (L.variables = dc(L.variables, h.query));
    var j;
    !A.signal && typeof AbortController < "u" && (j = new AbortController(), A.signal = j.signal);
    var se = function(C) {
      return C.kind === "OperationDefinition" && C.operation === "mutation";
    }, pe = function(C) {
      return C.kind === "OperationDefinition" && C.operation === "subscription";
    }, G = pe(st(h.query)), ue = bt(["defer"], h.query);
    if (u && !h.query.definitions.some(se) && (A.method = "GET"), ue || G) {
      A.headers = A.headers || {};
      var R = "multipart/mixed;";
      G && ue && globalThis.__DEV__ !== !1 && k.warn(41), G ? R += "boundary=graphql;subscriptionSpec=1.0,application/json" : ue && (R += "deferSpec=20220824,application/json"), A.headers.accept = R;
    }
    if (A.method === "GET") {
      var U = Vc(v, L), x = U.newURI, P = U.parseError;
      if (P)
        return or(P);
      v = x;
    } else
      try {
        A.body = sn(L, "Payload");
      } catch (C) {
        return or(C);
      }
    return new B(function(C) {
      var ee = n || fe(function() {
        return fetch;
      }) || vi, M = C.next.bind(C);
      return ee(v, A).then(function(ne) {
        var ye;
        h.setContext({ response: ne });
        var xe = (ye = ne.headers) === null || ye === void 0 ? void 0 : ye.get("content-type");
        return xe !== null && /^multipart\/mixed/i.test(xe) ? kc(ne, M) : xc(h)(ne).then(M);
      }).then(function() {
        j = void 0, C.complete();
      }).catch(function(ne) {
        j = void 0, Dc(ne, C);
      }), function() {
        j && j.abort();
      };
    });
  });
}, bs = (
  /** @class */
  function(t) {
    he(e, t);
    function e(r) {
      r === void 0 && (r = {});
      var n = t.call(this, Uc(r).request) || this;
      return n.options = r, n;
    }
    return e;
  }(je)
);
const { toString: mi, hasOwnProperty: Bc } = Object.prototype, gi = Function.prototype.toString, on = /* @__PURE__ */ new Map();
function Q(t, e) {
  try {
    return un(t, e);
  } finally {
    on.clear();
  }
}
function un(t, e) {
  if (t === e)
    return !0;
  const r = mi.call(t), n = mi.call(e);
  if (r !== n)
    return !1;
  switch (r) {
    case "[object Array]":
      if (t.length !== e.length)
        return !1;
    // Fall through to object case...
    case "[object Object]": {
      if (Ei(t, e))
        return !0;
      const i = bi(t), a = bi(e), s = i.length;
      if (s !== a.length)
        return !1;
      for (let o = 0; o < s; ++o)
        if (!Bc.call(e, i[o]))
          return !1;
      for (let o = 0; o < s; ++o) {
        const u = i[o];
        if (!un(t[u], e[u]))
          return !1;
      }
      return !0;
    }
    case "[object Error]":
      return t.name === e.name && t.message === e.message;
    case "[object Number]":
      if (t !== t)
        return e !== e;
    // Fall through to shared +a === +b case...
    case "[object Boolean]":
    case "[object Date]":
      return +t == +e;
    case "[object RegExp]":
    case "[object String]":
      return t == `${e}`;
    case "[object Map]":
    case "[object Set]": {
      if (t.size !== e.size)
        return !1;
      if (Ei(t, e))
        return !0;
      const i = t.entries(), a = r === "[object Map]";
      for (; ; ) {
        const s = i.next();
        if (s.done)
          break;
        const [o, u] = s.value;
        if (!e.has(o) || a && !un(u, e.get(o)))
          return !1;
      }
      return !0;
    }
    case "[object Uint16Array]":
    case "[object Uint8Array]":
    // Buffer, in Node.js.
    case "[object Uint32Array]":
    case "[object Int32Array]":
    case "[object Int8Array]":
    case "[object Int16Array]":
    case "[object ArrayBuffer]":
      t = new Uint8Array(t), e = new Uint8Array(e);
    // Fall through...
    case "[object DataView]": {
      let i = t.byteLength;
      if (i === e.byteLength)
        for (; i-- && t[i] === e[i]; )
          ;
      return i === -1;
    }
    case "[object AsyncFunction]":
    case "[object GeneratorFunction]":
    case "[object AsyncGeneratorFunction]":
    case "[object Function]": {
      const i = gi.call(t);
      return i !== gi.call(e) ? !1 : !Wc(i, zc);
    }
  }
  return !1;
}
function bi(t) {
  return Object.keys(t).filter(Qc, t);
}
function Qc(t) {
  return this[t] !== void 0;
}
const zc = "{ [native code] }";
function Wc(t, e) {
  const r = t.length - e.length;
  return r >= 0 && t.indexOf(e, r) === r;
}
function Ei(t, e) {
  let r = on.get(t);
  if (r) {
    if (r.has(e))
      return !0;
  } else
    on.set(t, r = /* @__PURE__ */ new Set());
  return r.add(e), !1;
}
function Es(t, e, r, n) {
  var i = e.data, a = ve(e, ["data"]), s = r.data, o = ve(r, ["data"]);
  return Q(a, o) && Lt(st(t).selectionSet, i, s, {
    fragmentMap: nt(at(t)),
    variables: n
  });
}
function Lt(t, e, r, n) {
  if (e === r)
    return !0;
  var i = /* @__PURE__ */ new Set();
  return t.selections.every(function(a) {
    if (i.has(a) || (i.add(a), !Ot(a, n.variables)) || _i(a))
      return !0;
    if (Ie(a)) {
      var s = ge(a), o = e && e[s], u = r && r[s], c = a.selectionSet;
      if (!c)
        return Q(o, u);
      var f = Array.isArray(o), d = Array.isArray(u);
      if (f !== d)
        return !1;
      if (f && d) {
        var l = o.length;
        if (u.length !== l)
          return !1;
        for (var h = 0; h < l; ++h)
          if (!Lt(c, o[h], u[h], n))
            return !1;
        return !0;
      }
      return Lt(c, o, u, n);
    } else {
      var v = Ht(a, n.fragmentMap);
      if (v)
        return _i(v) ? !0 : Lt(
          v.selectionSet,
          // Notice that we reuse the same aResult and bResult values here,
          // since the fragment ...spread does not specify a field name, but
          // consists of multiple fields (within the fragment's selection set)
          // that should be applied to the current result value(s).
          e,
          r,
          n
        );
    }
  });
}
function _i(t) {
  return !!t.directives && t.directives.some($c);
}
function $c(t) {
  return t.name.value === "nonreactive";
}
var _s = qe ? WeakMap : Map, ws = Sn ? WeakSet : Set, Pn = new Jt(), wi = !1;
function Ss() {
  wi || (wi = !0, globalThis.__DEV__ !== !1 && k.warn(52));
}
function Os(t, e, r) {
  return Pn.withValue(!0, function() {
    var n = dt(t, e, r, !1);
    return Object.isFrozen(t) && Ut(n), n;
  });
}
function Hc(t, e) {
  if (e.has(t))
    return e.get(t);
  var r = Array.isArray(t) ? [] : /* @__PURE__ */ Object.create(null);
  return e.set(t, r), r;
}
function dt(t, e, r, n, i) {
  var a, s = r.knownChanged, o = Hc(t, r.mutableTargets);
  if (Array.isArray(t)) {
    for (var u = 0, c = Array.from(t.entries()); u < c.length; u++) {
      var f = c[u], d = f[0], l = f[1];
      if (l === null) {
        o[d] = null;
        continue;
      }
      var h = dt(l, e, r, n, globalThis.__DEV__ !== !1 ? "".concat(i || "", "[").concat(d, "]") : void 0);
      s.has(h) && s.add(o), o[d] = h;
    }
    return s.has(o) ? o : t;
  }
  for (var v = 0, m = e.selections; v < m.length; v++) {
    var g = m[v], p = void 0;
    if (n && s.add(o), g.kind === T.FIELD) {
      var E = ge(g), b = g.selectionSet;
      if (p = o[E] || t[E], p === void 0)
        continue;
      if (b && p !== null) {
        var h = dt(t[E], b, r, n, globalThis.__DEV__ !== !1 ? "".concat(i || "", ".").concat(E) : void 0);
        s.has(h) && (p = h);
      }
      globalThis.__DEV__ === !1 && (o[E] = p), globalThis.__DEV__ !== !1 && (n && E !== "__typename" && // either the field is not present in the memo object
      // or it has a `get` descriptor, not a `value` descriptor
      // => it is a warning accessor and we can overwrite it
      // with another accessor
      !(!((a = Object.getOwnPropertyDescriptor(o, E)) === null || a === void 0) && a.value) ? Object.defineProperty(o, E, Gc(E, p, i || "", r.operationName, r.operationType)) : (delete o[E], o[E] = p));
    }
    if (g.kind === T.INLINE_FRAGMENT && (!g.typeCondition || r.cache.fragmentMatches(g, t.__typename)) && (p = dt(t, g.selectionSet, r, n, i)), g.kind === T.FRAGMENT_SPREAD) {
      var w = g.name.value, S = r.fragmentMap[w] || (r.fragmentMap[w] = r.cache.lookupFragment(w));
      k(S, 47, w);
      var O = $o(g);
      O !== "mask" && (p = dt(t, S.selectionSet, r, O === "migrate", i));
    }
    s.has(p) && s.add(o);
  }
  return "__typename" in t && !("__typename" in o) && (o.__typename = t.__typename), Object.keys(o).length !== Object.keys(t).length && s.add(o), s.has(o) ? o : t;
}
function Gc(t, e, r, n, i) {
  var a = function() {
    return Pn.getValue() || (globalThis.__DEV__ !== !1 && k.warn(48, n ? "".concat(i, " '").concat(n, "'") : "anonymous ".concat(i), "".concat(r, ".").concat(t).replace(/^\./, "")), a = function() {
      return e;
    }), e;
  };
  return {
    get: function() {
      return a();
    },
    set: function(s) {
      a = function() {
        return s;
      };
    },
    enumerable: !0,
    configurable: !0
  };
}
function Ts(t, e, r, n) {
  if (!r.fragmentMatches)
    return globalThis.__DEV__ !== !1 && Ss(), t;
  var i = e.definitions.filter(function(s) {
    return s.kind === T.FRAGMENT_DEFINITION;
  });
  typeof n > "u" && (k(i.length === 1, 49, i.length), n = i[0].name.value);
  var a = i.find(function(s) {
    return s.name.value === n;
  });
  return k(!!a, 50, n), t == null || Q(t, {}) ? t : Os(t, a.selectionSet, {
    operationType: "fragment",
    operationName: a.name.value,
    fragmentMap: nt(at(e)),
    cache: r,
    mutableTargets: new _s(),
    knownChanged: new ws()
  });
}
function Jc(t, e, r) {
  var n;
  if (!r.fragmentMatches)
    return globalThis.__DEV__ !== !1 && Ss(), t;
  var i = Me(e);
  return k(i, 51), t == null ? t : Os(t, i.selectionSet, {
    operationType: i.operation,
    operationName: (n = i.name) === null || n === void 0 ? void 0 : n.value,
    fragmentMap: nt(at(e)),
    cache: r,
    mutableTargets: new _s(),
    knownChanged: new ws()
  });
}
var Is = (
  /** @class */
  function() {
    function t() {
      this.assumeImmutableResults = !1, this.getFragmentDoc = _t(Ko, {
        max: me["cache.fragmentQueryDocuments"] || 1e3,
        cache: jt
      });
    }
    return t.prototype.lookupFragment = function(e) {
      return null;
    }, t.prototype.batch = function(e) {
      var r = this, n = typeof e.optimistic == "string" ? e.optimistic : e.optimistic === !1 ? null : void 0, i;
      return this.performTransaction(function() {
        return i = e.update(r);
      }, n), i;
    }, t.prototype.recordOptimisticTransaction = function(e, r) {
      this.performTransaction(e, r);
    }, t.prototype.transformDocument = function(e) {
      return e;
    }, t.prototype.transformForLink = function(e) {
      return e;
    }, t.prototype.identify = function(e) {
    }, t.prototype.gc = function() {
      return [];
    }, t.prototype.modify = function(e) {
      return !1;
    }, t.prototype.readQuery = function(e, r) {
      return r === void 0 && (r = !!e.optimistic), this.read(y(y({}, e), { rootId: e.id || "ROOT_QUERY", optimistic: r }));
    }, t.prototype.watchFragment = function(e) {
      var r = this, n = e.fragment, i = e.fragmentName, a = e.from, s = e.optimistic, o = s === void 0 ? !0 : s, u = ve(e, ["fragment", "fragmentName", "from", "optimistic"]), c = this.getFragmentDoc(n, i), f = typeof a > "u" || typeof a == "string" ? a : this.identify(a), d = !!e[Symbol.for("apollo.dataMasking")];
      if (globalThis.__DEV__ !== !1) {
        var l = i || Ga(n).name.value;
        f || globalThis.__DEV__ !== !1 && k.warn(1, l);
      }
      var h = y(y({}, u), { returnPartialData: !0, id: f, query: c, optimistic: o }), v;
      return new B(function(m) {
        return r.watch(y(y({}, h), { immediate: !0, callback: function(g) {
          var p = d ? Ts(g.result, n, r, i) : g.result;
          if (
            // Always ensure we deliver the first result
            !(v && Es(c, { data: v == null ? void 0 : v.result }, { data: p }))
          ) {
            var E = {
              data: p,
              complete: !!g.complete
            };
            g.missing && (E.missing = Kt(g.missing.map(function(b) {
              return b.missing;
            }))), v = y(y({}, g), { result: p }), m.next(E);
          }
        } }));
      });
    }, t.prototype.readFragment = function(e, r) {
      return r === void 0 && (r = !!e.optimistic), this.read(y(y({}, e), { query: this.getFragmentDoc(e.fragment, e.fragmentName), rootId: e.id, optimistic: r }));
    }, t.prototype.writeQuery = function(e) {
      var r = e.id, n = e.data, i = ve(e, ["id", "data"]);
      return this.write(Object.assign(i, {
        dataId: r || "ROOT_QUERY",
        result: n
      }));
    }, t.prototype.writeFragment = function(e) {
      var r = e.id, n = e.data, i = e.fragment, a = e.fragmentName, s = ve(e, ["id", "data", "fragment", "fragmentName"]);
      return this.write(Object.assign(s, {
        query: this.getFragmentDoc(i, a),
        dataId: r,
        result: n
      }));
    }, t.prototype.updateQuery = function(e, r) {
      return this.batch({
        update: function(n) {
          var i = n.readQuery(e), a = r(i);
          return a == null ? i : (n.writeQuery(y(y({}, e), { data: a })), a);
        }
      });
    }, t.prototype.updateFragment = function(e, r) {
      return this.batch({
        update: function(n) {
          var i = n.readFragment(e), a = r(i);
          return a == null ? i : (n.writeFragment(y(y({}, e), { data: a })), a);
        }
      });
    }, t;
  }()
);
globalThis.__DEV__ !== !1 && (Is.prototype.getMemoryInternals = fu);
var ks = (
  /** @class */
  function(t) {
    he(e, t);
    function e(r, n, i, a) {
      var s, o = t.call(this, r) || this;
      if (o.message = r, o.path = n, o.query = i, o.variables = a, Array.isArray(o.path)) {
        o.missing = o.message;
        for (var u = o.path.length - 1; u >= 0; --u)
          o.missing = (s = {}, s[o.path[u]] = o.missing, s);
      } else
        o.missing = o.path;
      return o.__proto__ = e.prototype, o;
    }
    return e;
  }(Error)
), Y = Object.prototype.hasOwnProperty;
function ft(t) {
  return t == null;
}
function Ns(t, e) {
  var r = t.__typename, n = t.id, i = t._id;
  if (typeof r == "string" && (e && (e.keyObject = ft(n) ? ft(i) ? void 0 : { _id: i } : { id: n }), ft(n) && !ft(i) && (n = i), !ft(n)))
    return "".concat(r, ":").concat(typeof n == "number" || typeof n == "string" ? n : JSON.stringify(n));
}
var Ds = {
  dataIdFromObject: Ns,
  addTypename: !0,
  resultCaching: !0,
  // Thanks to the shouldCanonizeResults helper, this should be the only line
  // you have to change to reenable canonization by default in the future.
  canonizeResults: !1
};
function Yc(t) {
  return tt(Ds, t);
}
function xs(t) {
  var e = t.canonizeResults;
  return e === void 0 ? Ds.canonizeResults : e;
}
function Xc(t, e) {
  return q(e) ? t.get(e.__ref, "__typename") : e && e.__typename;
}
var As = /^[_a-z][_0-9a-z]*/i;
function De(t) {
  var e = t.match(As);
  return e ? e[0] : t;
}
function cn(t, e, r) {
  return W(e) ? $(e) ? e.every(function(n) {
    return cn(t, n, r);
  }) : t.selections.every(function(n) {
    if (Ie(n) && Ot(n, r)) {
      var i = ge(n);
      return Y.call(e, i) && (!n.selectionSet || cn(n.selectionSet, e[i], r));
    }
    return !0;
  }) : !1;
}
function We(t) {
  return W(t) && !q(t) && !$(t);
}
function Kc() {
  return new Ne();
}
function Rs(t, e) {
  var r = nt(at(t));
  return {
    fragmentMap: r,
    lookupFragment: function(n) {
      var i = r[n];
      return !i && e && (i = e.lookup(n)), i || null;
    }
  };
}
var Mt = /* @__PURE__ */ Object.create(null), ur = function() {
  return Mt;
}, Si = /* @__PURE__ */ Object.create(null), wt = (
  /** @class */
  function() {
    function t(e, r) {
      var n = this;
      this.policies = e, this.group = r, this.data = /* @__PURE__ */ Object.create(null), this.rootIds = /* @__PURE__ */ Object.create(null), this.refs = /* @__PURE__ */ Object.create(null), this.getFieldValue = function(i, a) {
        return Ut(q(i) ? n.get(i.__ref, a) : i && i[a]);
      }, this.canRead = function(i) {
        return q(i) ? n.has(i.__ref) : typeof i == "object";
      }, this.toReference = function(i, a) {
        if (typeof i == "string")
          return He(i);
        if (q(i))
          return i;
        var s = n.policies.identify(i)[0];
        if (s) {
          var o = He(s);
          return a && n.merge(s, i), o;
        }
      };
    }
    return t.prototype.toObject = function() {
      return y({}, this.data);
    }, t.prototype.has = function(e) {
      return this.lookup(e, !0) !== void 0;
    }, t.prototype.get = function(e, r) {
      if (this.group.depend(e, r), Y.call(this.data, e)) {
        var n = this.data[e];
        if (n && Y.call(n, r))
          return n[r];
      }
      if (r === "__typename" && Y.call(this.policies.rootTypenamesById, e))
        return this.policies.rootTypenamesById[e];
      if (this instanceof Ee)
        return this.parent.get(e, r);
    }, t.prototype.lookup = function(e, r) {
      if (r && this.group.depend(e, "__exists"), Y.call(this.data, e))
        return this.data[e];
      if (this instanceof Ee)
        return this.parent.lookup(e, r);
      if (this.policies.rootTypenamesById[e])
        return /* @__PURE__ */ Object.create(null);
    }, t.prototype.merge = function(e, r) {
      var n = this, i;
      q(e) && (e = e.__ref), q(r) && (r = r.__ref);
      var a = typeof e == "string" ? this.lookup(i = e) : e, s = typeof r == "string" ? this.lookup(i = r) : r;
      if (s) {
        k(typeof i == "string", 2);
        var o = new Ne(ef).merge(a, s);
        if (this.data[i] = o, o !== a && (delete this.refs[i], this.group.caching)) {
          var u = /* @__PURE__ */ Object.create(null);
          a || (u.__exists = 1), Object.keys(s).forEach(function(c) {
            if (!a || a[c] !== o[c]) {
              u[c] = 1;
              var f = De(c);
              f !== c && !n.policies.hasKeyArgs(o.__typename, f) && (u[f] = 1), o[c] === void 0 && !(n instanceof Ee) && delete o[c];
            }
          }), u.__typename && !(a && a.__typename) && // Since we return default root __typename strings
          // automatically from store.get, we don't need to dirty the
          // ROOT_QUERY.__typename field if merged.__typename is equal
          // to the default string (usually "Query").
          this.policies.rootTypenamesById[i] === o.__typename && delete u.__typename, Object.keys(u).forEach(function(c) {
            return n.group.dirty(i, c);
          });
        }
      }
    }, t.prototype.modify = function(e, r) {
      var n = this, i = this.lookup(e);
      if (i) {
        var a = /* @__PURE__ */ Object.create(null), s = !1, o = !0, u = {
          DELETE: Mt,
          INVALIDATE: Si,
          isReference: q,
          toReference: this.toReference,
          canRead: this.canRead,
          readField: function(c, f) {
            return n.policies.readField(typeof c == "string" ? {
              fieldName: c,
              from: f || He(e)
            } : c, { store: n });
          }
        };
        if (Object.keys(i).forEach(function(c) {
          var f = De(c), d = i[c];
          if (d !== void 0) {
            var l = typeof r == "function" ? r : r[c] || r[f];
            if (l) {
              var h = l === ur ? Mt : l(Ut(d), y(y({}, u), { fieldName: f, storeFieldName: c, storage: n.getStorage(e, c) }));
              if (h === Si)
                n.group.dirty(e, c);
              else if (h === Mt && (h = void 0), h !== d && (a[c] = h, s = !0, d = h, globalThis.__DEV__ !== !1)) {
                var v = function(S) {
                  if (n.lookup(S.__ref) === void 0)
                    return globalThis.__DEV__ !== !1 && k.warn(3, S), !0;
                };
                if (q(h))
                  v(h);
                else if (Array.isArray(h))
                  for (var m = !1, g = void 0, p = 0, E = h; p < E.length; p++) {
                    var b = E[p];
                    if (q(b)) {
                      if (m = !0, v(b))
                        break;
                    } else if (typeof b == "object" && b) {
                      var w = n.policies.identify(b)[0];
                      w && (g = b);
                    }
                    if (m && g !== void 0) {
                      globalThis.__DEV__ !== !1 && k.warn(4, g);
                      break;
                    }
                  }
              }
            }
            d !== void 0 && (o = !1);
          }
        }), s)
          return this.merge(e, a), o && (this instanceof Ee ? this.data[e] = void 0 : delete this.data[e], this.group.dirty(e, "__exists")), !0;
      }
      return !1;
    }, t.prototype.delete = function(e, r, n) {
      var i, a = this.lookup(e);
      if (a) {
        var s = this.getFieldValue(a, "__typename"), o = r && n ? this.policies.getStoreFieldName({ typename: s, fieldName: r, args: n }) : r;
        return this.modify(e, o ? (i = {}, i[o] = ur, i) : ur);
      }
      return !1;
    }, t.prototype.evict = function(e, r) {
      var n = !1;
      return e.id && (Y.call(this.data, e.id) && (n = this.delete(e.id, e.fieldName, e.args)), this instanceof Ee && this !== r && (n = this.parent.evict(e, r) || n), (e.fieldName || n) && this.group.dirty(e.id, e.fieldName || "__exists")), n;
    }, t.prototype.clear = function() {
      this.replace(null);
    }, t.prototype.extract = function() {
      var e = this, r = this.toObject(), n = [];
      return this.getRootIdSet().forEach(function(i) {
        Y.call(e.policies.rootTypenamesById, i) || n.push(i);
      }), n.length && (r.__META = { extraRootIds: n.sort() }), r;
    }, t.prototype.replace = function(e) {
      var r = this;
      if (Object.keys(this.data).forEach(function(a) {
        e && Y.call(e, a) || r.delete(a);
      }), e) {
        var n = e.__META, i = ve(e, ["__META"]);
        Object.keys(i).forEach(function(a) {
          r.merge(a, i[a]);
        }), n && n.extraRootIds.forEach(this.retain, this);
      }
    }, t.prototype.retain = function(e) {
      return this.rootIds[e] = (this.rootIds[e] || 0) + 1;
    }, t.prototype.release = function(e) {
      if (this.rootIds[e] > 0) {
        var r = --this.rootIds[e];
        return r || delete this.rootIds[e], r;
      }
      return 0;
    }, t.prototype.getRootIdSet = function(e) {
      return e === void 0 && (e = /* @__PURE__ */ new Set()), Object.keys(this.rootIds).forEach(e.add, e), this instanceof Ee ? this.parent.getRootIdSet(e) : Object.keys(this.policies.rootTypenamesById).forEach(e.add, e), e;
    }, t.prototype.gc = function() {
      var e = this, r = this.getRootIdSet(), n = this.toObject();
      r.forEach(function(s) {
        Y.call(n, s) && (Object.keys(e.findChildRefIds(s)).forEach(r.add, r), delete n[s]);
      });
      var i = Object.keys(n);
      if (i.length) {
        for (var a = this; a instanceof Ee; )
          a = a.parent;
        i.forEach(function(s) {
          return a.delete(s);
        });
      }
      return i;
    }, t.prototype.findChildRefIds = function(e) {
      if (!Y.call(this.refs, e)) {
        var r = this.refs[e] = /* @__PURE__ */ Object.create(null), n = this.data[e];
        if (!n)
          return r;
        var i = /* @__PURE__ */ new Set([n]);
        i.forEach(function(a) {
          q(a) && (r[a.__ref] = !0), W(a) && Object.keys(a).forEach(function(s) {
            var o = a[s];
            W(o) && i.add(o);
          });
        });
      }
      return this.refs[e];
    }, t.prototype.makeCacheKey = function() {
      return this.group.keyMaker.lookupArray(arguments);
    }, t;
  }()
), Cs = (
  /** @class */
  function() {
    function t(e, r) {
      r === void 0 && (r = null), this.caching = e, this.parent = r, this.d = null, this.resetCaching();
    }
    return t.prototype.resetCaching = function() {
      this.d = this.caching ? as() : null, this.keyMaker = new be(qe);
    }, t.prototype.depend = function(e, r) {
      if (this.d) {
        this.d(cr(e, r));
        var n = De(r);
        n !== r && this.d(cr(e, n)), this.parent && this.parent.depend(e, r);
      }
    }, t.prototype.dirty = function(e, r) {
      this.d && this.d.dirty(
        cr(e, r),
        // When storeFieldName === "__exists", that means the entity identified
        // by dataId has either disappeared from the cache or was newly added,
        // so the result caching system would do well to "forget everything it
        // knows" about that object. To achieve that kind of invalidation, we
        // not only dirty the associated result cache entry, but also remove it
        // completely from the dependency graph. For the optimism implementation
        // details, see https://github.com/benjamn/optimism/pull/195.
        r === "__exists" ? "forget" : "setDirty"
      );
    }, t;
  }()
);
function cr(t, e) {
  return e + "#" + t;
}
function Oi(t, e) {
  vt(t) && t.group.depend(e, "__exists");
}
(function(t) {
  var e = (
    /** @class */
    function(r) {
      he(n, r);
      function n(i) {
        var a = i.policies, s = i.resultCaching, o = s === void 0 ? !0 : s, u = i.seed, c = r.call(this, a, new Cs(o)) || this;
        return c.stump = new Zc(c), c.storageTrie = new be(qe), u && c.replace(u), c;
      }
      return n.prototype.addLayer = function(i, a) {
        return this.stump.addLayer(i, a);
      }, n.prototype.removeLayer = function() {
        return this;
      }, n.prototype.getStorage = function() {
        return this.storageTrie.lookupArray(arguments);
      }, n;
    }(t)
  );
  t.Root = e;
})(wt || (wt = {}));
var Ee = (
  /** @class */
  function(t) {
    he(e, t);
    function e(r, n, i, a) {
      var s = t.call(this, n.policies, a) || this;
      return s.id = r, s.parent = n, s.replay = i, s.group = a, i(s), s;
    }
    return e.prototype.addLayer = function(r, n) {
      return new e(r, this, n, this.group);
    }, e.prototype.removeLayer = function(r) {
      var n = this, i = this.parent.removeLayer(r);
      return r === this.id ? (this.group.caching && Object.keys(this.data).forEach(function(a) {
        var s = n.data[a], o = i.lookup(a);
        o ? s ? s !== o && Object.keys(s).forEach(function(u) {
          Q(s[u], o[u]) || n.group.dirty(a, u);
        }) : (n.group.dirty(a, "__exists"), Object.keys(o).forEach(function(u) {
          n.group.dirty(a, u);
        })) : n.delete(a);
      }), i) : i === this.parent ? this : i.addLayer(this.id, this.replay);
    }, e.prototype.toObject = function() {
      return y(y({}, this.parent.toObject()), this.data);
    }, e.prototype.findChildRefIds = function(r) {
      var n = this.parent.findChildRefIds(r);
      return Y.call(this.data, r) ? y(y({}, n), t.prototype.findChildRefIds.call(this, r)) : n;
    }, e.prototype.getStorage = function() {
      for (var r = this.parent; r.parent; )
        r = r.parent;
      return r.getStorage.apply(
        r,
        // @ts-expect-error
        arguments
      );
    }, e;
  }(wt)
), Zc = (
  /** @class */
  function(t) {
    he(e, t);
    function e(r) {
      return t.call(this, "EntityStore.Stump", r, function() {
      }, new Cs(r.group.caching, r.group)) || this;
    }
    return e.prototype.removeLayer = function() {
      return this;
    }, e.prototype.merge = function(r, n) {
      return this.parent.merge(r, n);
    }, e;
  }(Ee)
);
function ef(t, e, r) {
  var n = t[r], i = e[r];
  return Q(n, i) ? n : i;
}
function vt(t) {
  return !!(t instanceof wt && t.group.caching);
}
function tf(t) {
  return W(t) ? $(t) ? t.slice(0) : y({ __proto__: Object.getPrototypeOf(t) }, t) : t;
}
var Ti = (
  /** @class */
  function() {
    function t() {
      this.known = new (Sn ? WeakSet : Set)(), this.pool = new be(qe), this.passes = /* @__PURE__ */ new WeakMap(), this.keysByJSON = /* @__PURE__ */ new Map(), this.empty = this.admit({});
    }
    return t.prototype.isKnown = function(e) {
      return W(e) && this.known.has(e);
    }, t.prototype.pass = function(e) {
      if (W(e)) {
        var r = tf(e);
        return this.passes.set(r, e), r;
      }
      return e;
    }, t.prototype.admit = function(e) {
      var r = this;
      if (W(e)) {
        var n = this.passes.get(e);
        if (n)
          return n;
        var i = Object.getPrototypeOf(e);
        switch (i) {
          case Array.prototype: {
            if (this.known.has(e))
              return e;
            var a = e.map(this.admit, this), s = this.pool.lookupArray(a);
            return s.array || (this.known.add(s.array = a), globalThis.__DEV__ !== !1 && Object.freeze(a)), s.array;
          }
          case null:
          case Object.prototype: {
            if (this.known.has(e))
              return e;
            var o = Object.getPrototypeOf(e), u = [o], c = this.sortedKeys(e);
            u.push(c.json);
            var f = u.length;
            c.sorted.forEach(function(h) {
              u.push(r.admit(e[h]));
            });
            var s = this.pool.lookupArray(u);
            if (!s.object) {
              var d = s.object = Object.create(o);
              this.known.add(d), c.sorted.forEach(function(h, v) {
                d[h] = u[f + v];
              }), globalThis.__DEV__ !== !1 && Object.freeze(d);
            }
            return s.object;
          }
        }
      }
      return e;
    }, t.prototype.sortedKeys = function(e) {
      var r = Object.keys(e), n = this.pool.lookupArray(r);
      if (!n.keys) {
        r.sort();
        var i = JSON.stringify(r);
        (n.keys = this.keysByJSON.get(i)) || this.keysByJSON.set(i, n.keys = { sorted: r, json: i });
      }
      return n.keys;
    }, t;
  }()
);
function Ii(t) {
  return [
    t.selectionSet,
    t.objectOrReference,
    t.context,
    // We split out this property so we can pass different values
    // independently without modifying options.context itself.
    t.context.canonizeResults
  ];
}
var rf = (
  /** @class */
  function() {
    function t(e) {
      var r = this;
      this.knownResults = new (qe ? WeakMap : Map)(), this.config = tt(e, {
        addTypename: e.addTypename !== !1,
        canonizeResults: xs(e)
      }), this.canon = e.canon || new Ti(), this.executeSelectionSet = _t(function(n) {
        var i, a = n.context.canonizeResults, s = Ii(n);
        s[3] = !a;
        var o = (i = r.executeSelectionSet).peek.apply(i, s);
        return o ? a ? y(y({}, o), {
          // If we previously read this result without canonizing it, we can
          // reuse that result simply by canonizing it now.
          result: r.canon.admit(o.result)
        }) : o : (Oi(n.context.store, n.enclosingRef.__ref), r.execSelectionSetImpl(n));
      }, {
        max: this.config.resultCacheMaxSize || me["inMemoryCache.executeSelectionSet"] || 5e4,
        keyArgs: Ii,
        // Note that the parameters of makeCacheKey are determined by the
        // array returned by keyArgs.
        makeCacheKey: function(n, i, a, s) {
          if (vt(a.store))
            return a.store.makeCacheKey(n, q(i) ? i.__ref : i, a.varString, s);
        }
      }), this.executeSubSelectedArray = _t(function(n) {
        return Oi(n.context.store, n.enclosingRef.__ref), r.execSubSelectedArrayImpl(n);
      }, {
        max: this.config.resultCacheMaxSize || me["inMemoryCache.executeSubSelectedArray"] || 1e4,
        makeCacheKey: function(n) {
          var i = n.field, a = n.array, s = n.context;
          if (vt(s.store))
            return s.store.makeCacheKey(i, a, s.varString);
        }
      });
    }
    return t.prototype.resetCanon = function() {
      this.canon = new Ti();
    }, t.prototype.diffQueryAgainstStore = function(e) {
      var r = e.store, n = e.query, i = e.rootId, a = i === void 0 ? "ROOT_QUERY" : i, s = e.variables, o = e.returnPartialData, u = o === void 0 ? !0 : o, c = e.canonizeResults, f = c === void 0 ? this.config.canonizeResults : c, d = this.config.cache.policies;
      s = y(y({}, On(Ha(n))), s);
      var l = He(a), h = this.executeSelectionSet({
        selectionSet: st(n).selectionSet,
        objectOrReference: l,
        enclosingRef: l,
        context: y({ store: r, query: n, policies: d, variables: s, varString: Te(s), canonizeResults: f }, Rs(n, this.config.fragments))
      }), v;
      if (h.missing && (v = [
        new ks(nf(h.missing), h.missing, n, s)
      ], !u))
        throw v[0];
      return {
        result: h.result,
        complete: !v,
        missing: v
      };
    }, t.prototype.isFresh = function(e, r, n, i) {
      if (vt(i.store) && this.knownResults.get(e) === n) {
        var a = this.executeSelectionSet.peek(
          n,
          r,
          i,
          // If result is canonical, then it could only have been previously
          // cached by the canonizing version of executeSelectionSet, so we can
          // avoid checking both possibilities here.
          this.canon.isKnown(e)
        );
        if (a && e === a.result)
          return !0;
      }
      return !1;
    }, t.prototype.execSelectionSetImpl = function(e) {
      var r = this, n = e.selectionSet, i = e.objectOrReference, a = e.enclosingRef, s = e.context;
      if (q(i) && !s.policies.rootTypenamesById[i.__ref] && !s.store.has(i.__ref))
        return {
          result: this.canon.empty,
          missing: "Dangling reference to missing ".concat(i.__ref, " object")
        };
      var o = s.variables, u = s.policies, c = s.store, f = c.getFieldValue(i, "__typename"), d = [], l, h = new Ne();
      this.config.addTypename && typeof f == "string" && !u.rootIdsByTypename[f] && d.push({ __typename: f });
      function v(b, w) {
        var S;
        return b.missing && (l = h.merge(l, (S = {}, S[w] = b.missing, S))), b.result;
      }
      var m = new Set(n.selections);
      m.forEach(function(b) {
        var w, S;
        if (Ot(b, o))
          if (Ie(b)) {
            var O = u.readField({
              fieldName: b.name.value,
              field: b,
              variables: s.variables,
              from: i
            }, s), N = ge(b);
            O === void 0 ? Nn.added(b) || (l = h.merge(l, (w = {}, w[N] = "Can't find field '".concat(b.name.value, "' on ").concat(q(i) ? i.__ref + " object" : "object " + JSON.stringify(i, null, 2)), w))) : $(O) ? O.length > 0 && (O = v(r.executeSubSelectedArray({
              field: b,
              array: O,
              enclosingRef: a,
              context: s
            }), N)) : b.selectionSet ? O != null && (O = v(r.executeSelectionSet({
              selectionSet: b.selectionSet,
              objectOrReference: O,
              enclosingRef: q(O) ? O : a,
              context: s
            }), N)) : s.canonizeResults && (O = r.canon.pass(O)), O !== void 0 && d.push((S = {}, S[N] = O, S));
          } else {
            var A = Ht(b, s.lookupFragment);
            if (!A && b.kind === T.FRAGMENT_SPREAD)
              throw ie(10, b.name.value);
            A && u.fragmentMatches(A, f) && A.selectionSet.selections.forEach(m.add, m);
          }
      });
      var g = Kt(d), p = { result: g, missing: l }, E = s.canonizeResults ? this.canon.admit(p) : Ut(p);
      return E.result && this.knownResults.set(E.result, n), E;
    }, t.prototype.execSubSelectedArrayImpl = function(e) {
      var r = this, n = e.field, i = e.array, a = e.enclosingRef, s = e.context, o, u = new Ne();
      function c(f, d) {
        var l;
        return f.missing && (o = u.merge(o, (l = {}, l[d] = f.missing, l))), f.result;
      }
      return n.selectionSet && (i = i.filter(s.store.canRead)), i = i.map(function(f, d) {
        return f === null ? null : $(f) ? c(r.executeSubSelectedArray({
          field: n,
          array: f,
          enclosingRef: a,
          context: s
        }), d) : n.selectionSet ? c(r.executeSelectionSet({
          selectionSet: n.selectionSet,
          objectOrReference: f,
          enclosingRef: q(f) ? f : a,
          context: s
        }), d) : (globalThis.__DEV__ !== !1 && af(s.store, n, f), f);
      }), {
        result: s.canonizeResults ? this.canon.admit(i) : i,
        missing: o
      };
    }, t;
  }()
);
function nf(t) {
  try {
    JSON.stringify(t, function(e, r) {
      if (typeof r == "string")
        throw r;
      return r;
    });
  } catch (e) {
    return e;
  }
}
function af(t, e, r) {
  if (!e.selectionSet) {
    var n = /* @__PURE__ */ new Set([r]);
    n.forEach(function(i) {
      W(i) && (k(
        !q(i),
        11,
        Xc(t, i),
        e.name.value
      ), Object.values(i).forEach(n.add, n));
    });
  }
}
var Fn = new Jt(), ki = /* @__PURE__ */ new WeakMap();
function mt(t) {
  var e = ki.get(t);
  return e || ki.set(t, e = {
    vars: /* @__PURE__ */ new Set(),
    dep: as()
  }), e;
}
function Ni(t) {
  mt(t).vars.forEach(function(e) {
    return e.forgetCache(t);
  });
}
function sf(t) {
  mt(t).vars.forEach(function(e) {
    return e.attachCache(t);
  });
}
function of(t) {
  var e = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set(), n = function(a) {
    if (arguments.length > 0) {
      if (t !== a) {
        t = a, e.forEach(function(u) {
          mt(u).dep.dirty(n), uf(u);
        });
        var s = Array.from(r);
        r.clear(), s.forEach(function(u) {
          return u(t);
        });
      }
    } else {
      var o = Fn.getValue();
      o && (i(o), mt(o).dep(n));
    }
    return t;
  };
  n.onNextChange = function(a) {
    return r.add(a), function() {
      r.delete(a);
    };
  };
  var i = n.attachCache = function(a) {
    return e.add(a), mt(a).vars.add(n), n;
  };
  return n.forgetCache = function(a) {
    return e.delete(a);
  }, n;
}
function uf(t) {
  t.broadcastWatches && t.broadcastWatches();
}
var Di = /* @__PURE__ */ Object.create(null);
function Ln(t) {
  var e = JSON.stringify(t);
  return Di[e] || (Di[e] = /* @__PURE__ */ Object.create(null));
}
function xi(t) {
  var e = Ln(t);
  return e.keyFieldsFn || (e.keyFieldsFn = function(r, n) {
    var i = function(s, o) {
      return n.readField(o, s);
    }, a = n.keyObject = Mn(t, function(s) {
      var o = Je(
        n.storeObject,
        s,
        // Using context.readField to extract paths from context.storeObject
        // allows the extraction to see through Reference objects and respect
        // custom read functions.
        i
      );
      return o === void 0 && r !== n.storeObject && Y.call(r, s[0]) && (o = Je(r, s, Fs)), k(o !== void 0, 5, s.join("."), r), o;
    });
    return "".concat(n.typename, ":").concat(JSON.stringify(a));
  });
}
function Ai(t) {
  var e = Ln(t);
  return e.keyArgsFn || (e.keyArgsFn = function(r, n) {
    var i = n.field, a = n.variables, s = n.fieldName, o = Mn(t, function(c) {
      var f = c[0], d = f.charAt(0);
      if (d === "@") {
        if (i && de(i.directives)) {
          var l = f.slice(1), h = i.directives.find(function(p) {
            return p.name.value === l;
          }), v = h && Gt(h, a);
          return v && Je(
            v,
            // If keyPath.length === 1, this code calls extractKeyPath with an
            // empty path, which works because it uses directiveArgs as the
            // extracted value.
            c.slice(1)
          );
        }
        return;
      }
      if (d === "$") {
        var m = f.slice(1);
        if (a && Y.call(a, m)) {
          var g = c.slice(0);
          return g[0] = m, Je(a, g);
        }
        return;
      }
      if (r)
        return Je(r, c);
    }), u = JSON.stringify(o);
    return (r || u !== "{}") && (s += ":" + u), s;
  });
}
function Mn(t, e) {
  var r = new Ne();
  return Ps(t).reduce(function(n, i) {
    var a, s = e(i);
    if (s !== void 0) {
      for (var o = i.length - 1; o >= 0; --o)
        s = (a = {}, a[i[o]] = s, a);
      n = r.merge(n, s);
    }
    return n;
  }, /* @__PURE__ */ Object.create(null));
}
function Ps(t) {
  var e = Ln(t);
  if (!e.paths) {
    var r = e.paths = [], n = [];
    t.forEach(function(i, a) {
      $(i) ? (Ps(i).forEach(function(s) {
        return r.push(n.concat(s));
      }), n.length = 0) : (n.push(i), $(t[a + 1]) || (r.push(n.slice(0)), n.length = 0));
    });
  }
  return e.paths;
}
function Fs(t, e) {
  return t[e];
}
function Je(t, e, r) {
  return r = r || Fs, Ls(e.reduce(function n(i, a) {
    return $(i) ? i.map(function(s) {
      return n(s, a);
    }) : i && r(i, a);
  }, t));
}
function Ls(t) {
  return W(t) ? $(t) ? t.map(Ls) : Mn(Object.keys(t).sort(), function(e) {
    return Je(t, e);
  }) : t;
}
function fn(t) {
  return t.args !== void 0 ? t.args : t.field ? Gt(t.field, t.variables) : null;
}
var cf = function() {
}, Ri = function(t, e) {
  return e.fieldName;
}, Ci = function(t, e, r) {
  var n = r.mergeObjects;
  return n(t, e);
}, Pi = function(t, e) {
  return e;
}, ff = (
  /** @class */
  function() {
    function t(e) {
      this.config = e, this.typePolicies = /* @__PURE__ */ Object.create(null), this.toBeAdded = /* @__PURE__ */ Object.create(null), this.supertypeMap = /* @__PURE__ */ new Map(), this.fuzzySubtypes = /* @__PURE__ */ new Map(), this.rootIdsByTypename = /* @__PURE__ */ Object.create(null), this.rootTypenamesById = /* @__PURE__ */ Object.create(null), this.usingPossibleTypes = !1, this.config = y({ dataIdFromObject: Ns }, e), this.cache = this.config.cache, this.setRootTypename("Query"), this.setRootTypename("Mutation"), this.setRootTypename("Subscription"), e.possibleTypes && this.addPossibleTypes(e.possibleTypes), e.typePolicies && this.addTypePolicies(e.typePolicies);
    }
    return t.prototype.identify = function(e, r) {
      var n, i = this, a = r && (r.typename || ((n = r.storeObject) === null || n === void 0 ? void 0 : n.__typename)) || e.__typename;
      if (a === this.rootTypenamesById.ROOT_QUERY)
        return ["ROOT_QUERY"];
      var s = r && r.storeObject || e, o = y(y({}, r), { typename: a, storeObject: s, readField: r && r.readField || function() {
        var d = qn(arguments, s);
        return i.readField(d, {
          store: i.cache.data,
          variables: d.variables
        });
      } }), u, c = a && this.getTypePolicy(a), f = c && c.keyFn || this.config.dataIdFromObject;
      return Pn.withValue(!0, function() {
        for (; f; ) {
          var d = f(y(y({}, e), s), o);
          if ($(d))
            f = xi(d);
          else {
            u = d;
            break;
          }
        }
      }), u = u ? String(u) : void 0, o.keyObject ? [u, o.keyObject] : [u];
    }, t.prototype.addTypePolicies = function(e) {
      var r = this;
      Object.keys(e).forEach(function(n) {
        var i = e[n], a = i.queryType, s = i.mutationType, o = i.subscriptionType, u = ve(i, ["queryType", "mutationType", "subscriptionType"]);
        a && r.setRootTypename("Query", n), s && r.setRootTypename("Mutation", n), o && r.setRootTypename("Subscription", n), Y.call(r.toBeAdded, n) ? r.toBeAdded[n].push(u) : r.toBeAdded[n] = [u];
      });
    }, t.prototype.updateTypePolicy = function(e, r) {
      var n = this, i = this.getTypePolicy(e), a = r.keyFields, s = r.fields;
      function o(u, c) {
        u.merge = typeof c == "function" ? c : c === !0 ? Ci : c === !1 ? Pi : u.merge;
      }
      o(i, r.merge), i.keyFn = // Pass false to disable normalization for this typename.
      a === !1 ? cf : $(a) ? xi(a) : typeof a == "function" ? a : i.keyFn, s && Object.keys(s).forEach(function(u) {
        var c = n.getFieldPolicy(e, u, !0), f = s[u];
        if (typeof f == "function")
          c.read = f;
        else {
          var d = f.keyArgs, l = f.read, h = f.merge;
          c.keyFn = // Pass false to disable argument-based differentiation of
          // field identities.
          d === !1 ? Ri : $(d) ? Ai(d) : typeof d == "function" ? d : c.keyFn, typeof l == "function" && (c.read = l), o(c, h);
        }
        c.read && c.merge && (c.keyFn = c.keyFn || Ri);
      });
    }, t.prototype.setRootTypename = function(e, r) {
      r === void 0 && (r = e);
      var n = "ROOT_" + e.toUpperCase(), i = this.rootTypenamesById[n];
      r !== i && (k(!i || i === e, 6, e), i && delete this.rootIdsByTypename[i], this.rootIdsByTypename[r] = n, this.rootTypenamesById[n] = r);
    }, t.prototype.addPossibleTypes = function(e) {
      var r = this;
      this.usingPossibleTypes = !0, Object.keys(e).forEach(function(n) {
        r.getSupertypeSet(n, !0), e[n].forEach(function(i) {
          r.getSupertypeSet(i, !0).add(n);
          var a = i.match(As);
          (!a || a[0] !== i) && r.fuzzySubtypes.set(i, new RegExp(i));
        });
      });
    }, t.prototype.getTypePolicy = function(e) {
      var r = this;
      if (!Y.call(this.typePolicies, e)) {
        var n = this.typePolicies[e] = /* @__PURE__ */ Object.create(null);
        n.fields = /* @__PURE__ */ Object.create(null);
        var i = this.supertypeMap.get(e);
        !i && this.fuzzySubtypes.size && (i = this.getSupertypeSet(e, !0), this.fuzzySubtypes.forEach(function(s, o) {
          if (s.test(e)) {
            var u = r.supertypeMap.get(o);
            u && u.forEach(function(c) {
              return i.add(c);
            });
          }
        })), i && i.size && i.forEach(function(s) {
          var o = r.getTypePolicy(s), u = o.fields, c = ve(o, ["fields"]);
          Object.assign(n, c), Object.assign(n.fields, u);
        });
      }
      var a = this.toBeAdded[e];
      return a && a.length && a.splice(0).forEach(function(s) {
        r.updateTypePolicy(e, s);
      }), this.typePolicies[e];
    }, t.prototype.getFieldPolicy = function(e, r, n) {
      if (e) {
        var i = this.getTypePolicy(e).fields;
        return i[r] || n && (i[r] = /* @__PURE__ */ Object.create(null));
      }
    }, t.prototype.getSupertypeSet = function(e, r) {
      var n = this.supertypeMap.get(e);
      return !n && r && this.supertypeMap.set(e, n = /* @__PURE__ */ new Set()), n;
    }, t.prototype.fragmentMatches = function(e, r, n, i) {
      var a = this;
      if (!e.typeCondition)
        return !0;
      if (!r)
        return !1;
      var s = e.typeCondition.name.value;
      if (r === s)
        return !0;
      if (this.usingPossibleTypes && this.supertypeMap.has(s))
        for (var o = this.getSupertypeSet(r, !0), u = [o], c = function(v) {
          var m = a.getSupertypeSet(v, !1);
          m && m.size && u.indexOf(m) < 0 && u.push(m);
        }, f = !!(n && this.fuzzySubtypes.size), d = !1, l = 0; l < u.length; ++l) {
          var h = u[l];
          if (h.has(s))
            return o.has(s) || (d && globalThis.__DEV__ !== !1 && k.warn(7, r, s), o.add(s)), !0;
          h.forEach(c), f && // Start checking fuzzy subtypes only after exhausting all
          // non-fuzzy subtypes (after the final iteration of the loop).
          l === u.length - 1 && // We could wait to compare fragment.selectionSet to result
          // after we verify the supertype, but this check is often less
          // expensive than that search, and we will have to do the
          // comparison anyway whenever we find a potential match.
          cn(e.selectionSet, n, i) && (f = !1, d = !0, this.fuzzySubtypes.forEach(function(v, m) {
            var g = r.match(v);
            g && g[0] === r && c(m);
          }));
        }
      return !1;
    }, t.prototype.hasKeyArgs = function(e, r) {
      var n = this.getFieldPolicy(e, r, !1);
      return !!(n && n.keyFn);
    }, t.prototype.getStoreFieldName = function(e) {
      var r = e.typename, n = e.fieldName, i = this.getFieldPolicy(r, n, !1), a, s = i && i.keyFn;
      if (s && r)
        for (var o = {
          typename: r,
          fieldName: n,
          field: e.field || null,
          variables: e.variables
        }, u = fn(e); s; ) {
          var c = s(u, o);
          if ($(c))
            s = Ai(c);
          else {
            a = c || n;
            break;
          }
        }
      return a === void 0 && (a = e.field ? ku(e.field, e.variables) : $a(n, fn(e))), a === !1 ? n : n === De(a) ? a : n + ":" + a;
    }, t.prototype.readField = function(e, r) {
      var n = e.from;
      if (n) {
        var i = e.field || e.fieldName;
        if (i) {
          if (e.typename === void 0) {
            var a = r.store.getFieldValue(n, "__typename");
            a && (e.typename = a);
          }
          var s = this.getStoreFieldName(e), o = De(s), u = r.store.getFieldValue(n, s), c = this.getFieldPolicy(e.typename, o, !1), f = c && c.read;
          if (f) {
            var d = Fi(this, n, e, r, r.store.getStorage(q(n) ? n.__ref : n, s));
            return Fn.withValue(this.cache, f, [
              u,
              d
            ]);
          }
          return u;
        }
      }
    }, t.prototype.getReadFunction = function(e, r) {
      var n = this.getFieldPolicy(e, r, !1);
      return n && n.read;
    }, t.prototype.getMergeFunction = function(e, r, n) {
      var i = this.getFieldPolicy(e, r, !1), a = i && i.merge;
      return !a && n && (i = this.getTypePolicy(n), a = i && i.merge), a;
    }, t.prototype.runMergeFunction = function(e, r, n, i, a) {
      var s = n.field, o = n.typename, u = n.merge;
      return u === Ci ? Ms(i.store)(e, r) : u === Pi ? r : (i.overwrite && (e = void 0), u(e, r, Fi(
        this,
        // Unlike options.readField for read functions, we do not fall
        // back to the current object if no foreignObjOrRef is provided,
        // because it's not clear what the current object should be for
        // merge functions: the (possibly undefined) existing object, or
        // the incoming object? If you think your merge function needs
        // to read sibling fields in order to produce a new value for
        // the current field, you might want to rethink your strategy,
        // because that's a recipe for making merge behavior sensitive
        // to the order in which fields are written into the cache.
        // However, readField(name, ref) is useful for merge functions
        // that need to deduplicate child objects and references.
        void 0,
        {
          typename: o,
          fieldName: s.name.value,
          field: s,
          variables: i.variables
        },
        i,
        a || /* @__PURE__ */ Object.create(null)
      )));
    }, t;
  }()
);
function Fi(t, e, r, n, i) {
  var a = t.getStoreFieldName(r), s = De(a), o = r.variables || n.variables, u = n.store, c = u.toReference, f = u.canRead;
  return {
    args: fn(r),
    field: r.field || null,
    fieldName: s,
    storeFieldName: a,
    variables: o,
    isReference: q,
    toReference: c,
    storage: i,
    cache: t.cache,
    canRead: f,
    readField: function() {
      return t.readField(qn(arguments, e, o), n);
    },
    mergeObjects: Ms(n.store)
  };
}
function qn(t, e, r) {
  var n = t[0], i = t[1], a = t.length, s;
  return typeof n == "string" ? s = {
    fieldName: n,
    // Default to objectOrReference only when no second argument was
    // passed for the from parameter, not when undefined is explicitly
    // passed as the second argument.
    from: a > 1 ? i : e
  } : (s = y({}, n), Y.call(s, "from") || (s.from = e)), globalThis.__DEV__ !== !1 && s.from === void 0 && globalThis.__DEV__ !== !1 && k.warn(8, Ia(Array.from(t))), s.variables === void 0 && (s.variables = r), s;
}
function Ms(t) {
  return function(r, n) {
    if ($(r) || $(n))
      throw ie(9);
    if (W(r) && W(n)) {
      var i = t.getFieldValue(r, "__typename"), a = t.getFieldValue(n, "__typename"), s = i && a && i !== a;
      if (s)
        return n;
      if (q(r) && We(n))
        return t.merge(r.__ref, n), r;
      if (We(r) && q(n))
        return t.merge(r, n.__ref), n;
      if (We(r) && We(n))
        return y(y({}, r), n);
    }
    return n;
  };
}
function fr(t, e, r) {
  var n = "".concat(e).concat(r), i = t.flavors.get(n);
  return i || t.flavors.set(n, i = t.clientOnly === e && t.deferred === r ? t : y(y({}, t), { clientOnly: e, deferred: r })), i;
}
var lf = (
  /** @class */
  function() {
    function t(e, r, n) {
      this.cache = e, this.reader = r, this.fragments = n;
    }
    return t.prototype.writeToStore = function(e, r) {
      var n = this, i = r.query, a = r.result, s = r.dataId, o = r.variables, u = r.overwrite, c = Me(i), f = Kc();
      o = y(y({}, On(c)), o);
      var d = y(y({ store: e, written: /* @__PURE__ */ Object.create(null), merge: function(h, v) {
        return f.merge(h, v);
      }, variables: o, varString: Te(o) }, Rs(i, this.fragments)), { overwrite: !!u, incomingById: /* @__PURE__ */ new Map(), clientOnly: !1, deferred: !1, flavors: /* @__PURE__ */ new Map() }), l = this.processSelectionSet({
        result: a || /* @__PURE__ */ Object.create(null),
        dataId: s,
        selectionSet: c.selectionSet,
        mergeTree: { map: /* @__PURE__ */ new Map() },
        context: d
      });
      if (!q(l))
        throw ie(12, a);
      return d.incomingById.forEach(function(h, v) {
        var m = h.storeObject, g = h.mergeTree, p = h.fieldNodeSet, E = He(v);
        if (g && g.map.size) {
          var b = n.applyMerges(g, E, m, d);
          if (q(b))
            return;
          m = b;
        }
        if (globalThis.__DEV__ !== !1 && !d.overwrite) {
          var w = /* @__PURE__ */ Object.create(null);
          p.forEach(function(N) {
            N.selectionSet && (w[N.name.value] = !0);
          });
          var S = function(N) {
            return w[De(N)] === !0;
          }, O = function(N) {
            var A = g && g.map.get(N);
            return !!(A && A.info && A.info.merge);
          };
          Object.keys(m).forEach(function(N) {
            S(N) && !O(N) && hf(E, m, N, d.store);
          });
        }
        e.merge(v, m);
      }), e.retain(l.__ref), l;
    }, t.prototype.processSelectionSet = function(e) {
      var r = this, n = e.dataId, i = e.result, a = e.selectionSet, s = e.context, o = e.mergeTree, u = this.cache.policies, c = /* @__PURE__ */ Object.create(null), f = n && u.rootTypenamesById[n] || Zr(i, a, s.fragmentMap) || n && s.store.get(n, "__typename");
      typeof f == "string" && (c.__typename = f);
      var d = function() {
        var b = qn(arguments, c, s.variables);
        if (q(b.from)) {
          var w = s.incomingById.get(b.from.__ref);
          if (w) {
            var S = u.readField(y(y({}, b), { from: w.storeObject }), s);
            if (S !== void 0)
              return S;
          }
        }
        return u.readField(b, s);
      }, l = /* @__PURE__ */ new Set();
      this.flattenFields(
        a,
        i,
        // This WriteContext will be the default context value for fields returned
        // by the flattenFields method, but some fields may be assigned a modified
        // context, depending on the presence of @client and other directives.
        s,
        f
      ).forEach(function(b, w) {
        var S, O = ge(w), N = i[O];
        if (l.add(w), N !== void 0) {
          var A = u.getStoreFieldName({
            typename: f,
            fieldName: w.name.value,
            field: w,
            variables: b.variables
          }), L = Li(o, A), j = r.processFieldValue(
            N,
            w,
            // Reset context.clientOnly and context.deferred to their default
            // values before processing nested selection sets.
            w.selectionSet ? fr(b, !1, !1) : b,
            L
          ), se = void 0;
          w.selectionSet && (q(j) || We(j)) && (se = d("__typename", j));
          var pe = u.getMergeFunction(f, w.name.value, se);
          pe ? L.info = {
            // TODO Check compatibility against any existing childTree.field?
            field: w,
            typename: f,
            merge: pe
          } : Mi(o, A), c = b.merge(c, (S = {}, S[A] = j, S));
        } else globalThis.__DEV__ !== !1 && !b.clientOnly && !b.deferred && !Nn.added(w) && // If the field has a read function, it may be a synthetic field or
        // provide a default value, so its absence from the written data should
        // not be cause for alarm.
        !u.getReadFunction(f, w.name.value) && globalThis.__DEV__ !== !1 && k.error(13, ge(w), i);
      });
      try {
        var h = u.identify(i, {
          typename: f,
          selectionSet: a,
          fragmentMap: s.fragmentMap,
          storeObject: c,
          readField: d
        }), v = h[0], m = h[1];
        n = n || v, m && (c = s.merge(c, m));
      } catch (b) {
        if (!n)
          throw b;
      }
      if (typeof n == "string") {
        var g = He(n), p = s.written[n] || (s.written[n] = []);
        if (p.indexOf(a) >= 0 || (p.push(a), this.reader && this.reader.isFresh(i, g, a, s)))
          return g;
        var E = s.incomingById.get(n);
        return E ? (E.storeObject = s.merge(E.storeObject, c), E.mergeTree = ln(E.mergeTree, o), l.forEach(function(b) {
          return E.fieldNodeSet.add(b);
        })) : s.incomingById.set(n, {
          storeObject: c,
          // Save a reference to mergeTree only if it is not empty, because
          // empty MergeTrees may be recycled by maybeRecycleChildMergeTree and
          // reused for entirely different parts of the result tree.
          mergeTree: Bt(o) ? void 0 : o,
          fieldNodeSet: l
        }), g;
      }
      return c;
    }, t.prototype.processFieldValue = function(e, r, n, i) {
      var a = this;
      return !r.selectionSet || e === null ? globalThis.__DEV__ !== !1 ? ds(e) : e : $(e) ? e.map(function(s, o) {
        var u = a.processFieldValue(s, r, n, Li(i, o));
        return Mi(i, o), u;
      }) : this.processSelectionSet({
        result: e,
        selectionSet: r.selectionSet,
        context: n,
        mergeTree: i
      });
    }, t.prototype.flattenFields = function(e, r, n, i) {
      i === void 0 && (i = Zr(r, e, n.fragmentMap));
      var a = /* @__PURE__ */ new Map(), s = this.cache.policies, o = new be(!1);
      return function u(c, f) {
        var d = o.lookup(
          c,
          // Because we take inheritedClientOnly and inheritedDeferred into
          // consideration here (in addition to selectionSet), it's possible for
          // the same selection set to be flattened more than once, if it appears
          // in the query with different @client and/or @directive configurations.
          f.clientOnly,
          f.deferred
        );
        d.visited || (d.visited = !0, c.selections.forEach(function(l) {
          if (Ot(l, n.variables)) {
            var h = f.clientOnly, v = f.deferred;
            if (
              // Since the presence of @client or @defer on this field can only
              // cause clientOnly or deferred to become true, we can skip the
              // forEach loop if both clientOnly and deferred are already true.
              !(h && v) && de(l.directives) && l.directives.forEach(function(p) {
                var E = p.name.value;
                if (E === "client" && (h = !0), E === "defer") {
                  var b = Gt(p, n.variables);
                  (!b || b.if !== !1) && (v = !0);
                }
              }), Ie(l)
            ) {
              var m = a.get(l);
              m && (h = h && m.clientOnly, v = v && m.deferred), a.set(l, fr(n, h, v));
            } else {
              var g = Ht(l, n.lookupFragment);
              if (!g && l.kind === T.FRAGMENT_SPREAD)
                throw ie(14, l.name.value);
              g && s.fragmentMatches(g, i, r, n.variables) && u(g.selectionSet, fr(n, h, v));
            }
          }
        }));
      }(e, n), a;
    }, t.prototype.applyMerges = function(e, r, n, i, a) {
      var s, o = this;
      if (e.map.size && !q(n)) {
        var u = (
          // Items in the same position in different arrays are not
          // necessarily related to each other, so when incoming is an array
          // we process its elements as if there was no existing data.
          !$(n) && // Likewise, existing must be either a Reference or a StoreObject
          // in order for its fields to be safe to merge with the fields of
          // the incoming object.
          (q(r) || We(r)) ? r : void 0
        ), c = n;
        u && !a && (a = [q(u) ? u.__ref : u]);
        var f, d = function(l, h) {
          return $(l) ? typeof h == "number" ? l[h] : void 0 : i.store.getFieldValue(l, String(h));
        };
        e.map.forEach(function(l, h) {
          var v = d(u, h), m = d(c, h);
          if (m !== void 0) {
            a && a.push(h);
            var g = o.applyMerges(l, v, m, i, a);
            g !== m && (f = f || /* @__PURE__ */ new Map(), f.set(h, g)), a && k(a.pop() === h);
          }
        }), f && (n = $(c) ? c.slice(0) : y({}, c), f.forEach(function(l, h) {
          n[h] = l;
        }));
      }
      return e.info ? this.cache.policies.runMergeFunction(r, n, e.info, i, a && (s = i.store).getStorage.apply(s, a)) : n;
    }, t;
  }()
), qs = [];
function Li(t, e) {
  var r = t.map;
  return r.has(e) || r.set(e, qs.pop() || { map: /* @__PURE__ */ new Map() }), r.get(e);
}
function ln(t, e) {
  if (t === e || !e || Bt(e))
    return t;
  if (!t || Bt(t))
    return e;
  var r = t.info && e.info ? y(y({}, t.info), e.info) : t.info || e.info, n = t.map.size && e.map.size, i = n ? /* @__PURE__ */ new Map() : t.map.size ? t.map : e.map, a = { info: r, map: i };
  if (n) {
    var s = new Set(e.map.keys());
    t.map.forEach(function(o, u) {
      a.map.set(u, ln(o, e.map.get(u))), s.delete(u);
    }), s.forEach(function(o) {
      a.map.set(o, ln(e.map.get(o), t.map.get(o)));
    });
  }
  return a;
}
function Bt(t) {
  return !t || !(t.info || t.map.size);
}
function Mi(t, e) {
  var r = t.map, n = r.get(e);
  n && Bt(n) && (qs.push(n), r.delete(e));
}
var qi = /* @__PURE__ */ new Set();
function hf(t, e, r, n) {
  var i = function(d) {
    var l = n.getFieldValue(d, r);
    return typeof l == "object" && l;
  }, a = i(t);
  if (a) {
    var s = i(e);
    if (s && !q(a) && !Q(a, s) && !Object.keys(a).every(function(d) {
      return n.getFieldValue(s, d) !== void 0;
    })) {
      var o = n.getFieldValue(t, "__typename") || n.getFieldValue(e, "__typename"), u = De(r), c = "".concat(o, ".").concat(u);
      if (!qi.has(c)) {
        qi.add(c);
        var f = [];
        !$(a) && !$(s) && [a, s].forEach(function(d) {
          var l = n.getFieldValue(d, "__typename");
          typeof l == "string" && !f.includes(l) && f.push(l);
        }), globalThis.__DEV__ !== !1 && k.warn(15, u, o, f.length ? "either ensure all objects of type " + f.join(" and ") + " have an ID or a custom merge function, or " : "", c, y({}, a), y({}, s));
      }
    }
  }
}
var js = (
  /** @class */
  function(t) {
    he(e, t);
    function e(r) {
      r === void 0 && (r = {});
      var n = t.call(this) || this;
      return n.watches = /* @__PURE__ */ new Set(), n.addTypenameTransform = new ss(Nn), n.assumeImmutableResults = !0, n.makeVar = of, n.txCount = 0, n.config = Yc(r), n.addTypename = !!n.config.addTypename, n.policies = new ff({
        cache: n,
        dataIdFromObject: n.config.dataIdFromObject,
        possibleTypes: n.config.possibleTypes,
        typePolicies: n.config.typePolicies
      }), n.init(), n;
    }
    return e.prototype.init = function() {
      var r = this.data = new wt.Root({
        policies: this.policies,
        resultCaching: this.config.resultCaching
      });
      this.optimisticData = r.stump, this.resetResultCache();
    }, e.prototype.resetResultCache = function(r) {
      var n = this, i = this.storeReader, a = this.config.fragments;
      this.storeWriter = new lf(this, this.storeReader = new rf({
        cache: this,
        addTypename: this.addTypename,
        resultCacheMaxSize: this.config.resultCacheMaxSize,
        canonizeResults: xs(this.config),
        canon: r ? void 0 : i && i.canon,
        fragments: a
      }), a), this.maybeBroadcastWatch = _t(function(s, o) {
        return n.broadcastWatch(s, o);
      }, {
        max: this.config.resultCacheMaxSize || me["inMemoryCache.maybeBroadcastWatch"] || 5e3,
        makeCacheKey: function(s) {
          var o = s.optimistic ? n.optimisticData : n.data;
          if (vt(o)) {
            var u = s.optimistic, c = s.id, f = s.variables;
            return o.makeCacheKey(
              s.query,
              // Different watches can have the same query, optimistic
              // status, rootId, and variables, but if their callbacks are
              // different, the (identical) result needs to be delivered to
              // each distinct callback. The easiest way to achieve that
              // separation is to include c.callback in the cache key for
              // maybeBroadcastWatch calls. See issue #5733.
              s.callback,
              Te({ optimistic: u, id: c, variables: f })
            );
          }
        }
      }), (/* @__PURE__ */ new Set([this.data.group, this.optimisticData.group])).forEach(function(s) {
        return s.resetCaching();
      });
    }, e.prototype.restore = function(r) {
      return this.init(), r && this.data.replace(r), this;
    }, e.prototype.extract = function(r) {
      return r === void 0 && (r = !1), (r ? this.optimisticData : this.data).extract();
    }, e.prototype.read = function(r) {
      var n = r.returnPartialData, i = n === void 0 ? !1 : n;
      try {
        return this.storeReader.diffQueryAgainstStore(y(y({}, r), { store: r.optimistic ? this.optimisticData : this.data, config: this.config, returnPartialData: i })).result || null;
      } catch (a) {
        if (a instanceof ks)
          return null;
        throw a;
      }
    }, e.prototype.write = function(r) {
      try {
        return ++this.txCount, this.storeWriter.writeToStore(this.data, r);
      } finally {
        !--this.txCount && r.broadcast !== !1 && this.broadcastWatches();
      }
    }, e.prototype.modify = function(r) {
      if (Y.call(r, "id") && !r.id)
        return !1;
      var n = r.optimistic ? this.optimisticData : this.data;
      try {
        return ++this.txCount, n.modify(r.id || "ROOT_QUERY", r.fields);
      } finally {
        !--this.txCount && r.broadcast !== !1 && this.broadcastWatches();
      }
    }, e.prototype.diff = function(r) {
      return this.storeReader.diffQueryAgainstStore(y(y({}, r), { store: r.optimistic ? this.optimisticData : this.data, rootId: r.id || "ROOT_QUERY", config: this.config }));
    }, e.prototype.watch = function(r) {
      var n = this;
      return this.watches.size || sf(this), this.watches.add(r), r.immediate && this.maybeBroadcastWatch(r), function() {
        n.watches.delete(r) && !n.watches.size && Ni(n), n.maybeBroadcastWatch.forget(r);
      };
    }, e.prototype.gc = function(r) {
      var n;
      Te.reset(), Tt.reset(), this.addTypenameTransform.resetCache(), (n = this.config.fragments) === null || n === void 0 || n.resetCaches();
      var i = this.optimisticData.gc();
      return r && !this.txCount && (r.resetResultCache ? this.resetResultCache(r.resetResultIdentities) : r.resetResultIdentities && this.storeReader.resetCanon()), i;
    }, e.prototype.retain = function(r, n) {
      return (n ? this.optimisticData : this.data).retain(r);
    }, e.prototype.release = function(r, n) {
      return (n ? this.optimisticData : this.data).release(r);
    }, e.prototype.identify = function(r) {
      if (q(r))
        return r.__ref;
      try {
        return this.policies.identify(r)[0];
      } catch (n) {
        globalThis.__DEV__ !== !1 && k.warn(n);
      }
    }, e.prototype.evict = function(r) {
      if (!r.id) {
        if (Y.call(r, "id"))
          return !1;
        r = y(y({}, r), { id: "ROOT_QUERY" });
      }
      try {
        return ++this.txCount, this.optimisticData.evict(r, this.data);
      } finally {
        !--this.txCount && r.broadcast !== !1 && this.broadcastWatches();
      }
    }, e.prototype.reset = function(r) {
      var n = this;
      return this.init(), Te.reset(), r && r.discardWatches ? (this.watches.forEach(function(i) {
        return n.maybeBroadcastWatch.forget(i);
      }), this.watches.clear(), Ni(this)) : this.broadcastWatches(), Promise.resolve();
    }, e.prototype.removeOptimistic = function(r) {
      var n = this.optimisticData.removeLayer(r);
      n !== this.optimisticData && (this.optimisticData = n, this.broadcastWatches());
    }, e.prototype.batch = function(r) {
      var n = this, i = r.update, a = r.optimistic, s = a === void 0 ? !0 : a, o = r.removeOptimistic, u = r.onWatchUpdated, c, f = function(l) {
        var h = n, v = h.data, m = h.optimisticData;
        ++n.txCount, l && (n.data = n.optimisticData = l);
        try {
          return c = i(n);
        } finally {
          --n.txCount, n.data = v, n.optimisticData = m;
        }
      }, d = /* @__PURE__ */ new Set();
      return u && !this.txCount && this.broadcastWatches(y(y({}, r), { onWatchUpdated: function(l) {
        return d.add(l), !1;
      } })), typeof s == "string" ? this.optimisticData = this.optimisticData.addLayer(s, f) : s === !1 ? f(this.data) : f(), typeof o == "string" && (this.optimisticData = this.optimisticData.removeLayer(o)), u && d.size ? (this.broadcastWatches(y(y({}, r), { onWatchUpdated: function(l, h) {
        var v = u.call(this, l, h);
        return v !== !1 && d.delete(l), v;
      } })), d.size && d.forEach(function(l) {
        return n.maybeBroadcastWatch.dirty(l);
      })) : this.broadcastWatches(r), c;
    }, e.prototype.performTransaction = function(r, n) {
      return this.batch({
        update: r,
        optimistic: n || n !== null
      });
    }, e.prototype.transformDocument = function(r) {
      return this.addTypenameToDocument(this.addFragmentsToDocument(r));
    }, e.prototype.fragmentMatches = function(r, n) {
      return this.policies.fragmentMatches(r, n);
    }, e.prototype.lookupFragment = function(r) {
      var n;
      return ((n = this.config.fragments) === null || n === void 0 ? void 0 : n.lookup(r)) || null;
    }, e.prototype.broadcastWatches = function(r) {
      var n = this;
      this.txCount || this.watches.forEach(function(i) {
        return n.maybeBroadcastWatch(i, r);
      });
    }, e.prototype.addFragmentsToDocument = function(r) {
      var n = this.config.fragments;
      return n ? n.transform(r) : r;
    }, e.prototype.addTypenameToDocument = function(r) {
      return this.addTypename ? this.addTypenameTransform.transformDocument(r) : r;
    }, e.prototype.broadcastWatch = function(r, n) {
      var i = r.lastDiff, a = this.diff(r);
      n && (r.optimistic && typeof n.optimistic == "string" && (a.fromOptimisticTransaction = !0), n.onWatchUpdated && n.onWatchUpdated.call(this, r, a, i) === !1) || (!i || !Q(i.result, a.result)) && r.callback(r.lastDiff = a, i);
    }, e;
  }(Is)
);
globalThis.__DEV__ !== !1 && (js.prototype.getMemoryInternals = cu);
var V;
(function(t) {
  t[t.loading = 1] = "loading", t[t.setVariables = 2] = "setVariables", t[t.fetchMore = 3] = "fetchMore", t[t.refetch = 4] = "refetch", t[t.poll = 6] = "poll", t[t.ready = 7] = "ready", t[t.error = 8] = "error";
})(V || (V = {}));
function St(t) {
  return t ? t < 7 : !1;
}
var ji = Object.assign, df = Object.hasOwnProperty, hn = (
  /** @class */
  function(t) {
    he(e, t);
    function e(r) {
      var n = r.queryManager, i = r.queryInfo, a = r.options, s = t.call(this, function(g) {
        try {
          var p = g._subscription._observer;
          p && !p.error && (p.error = pf);
        } catch {
        }
        var E = !s.observers.size;
        s.observers.add(g);
        var b = s.last;
        return b && b.error ? g.error && g.error(b.error) : b && b.result && g.next && g.next(s.maskResult(b.result)), E && s.reobserve().catch(function() {
        }), function() {
          s.observers.delete(g) && !s.observers.size && s.tearDownQuery();
        };
      }) || this;
      s.observers = /* @__PURE__ */ new Set(), s.subscriptions = /* @__PURE__ */ new Set(), s.queryInfo = i, s.queryManager = n, s.waitForOwnResult = lr(a.fetchPolicy), s.isTornDown = !1, s.subscribeToMore = s.subscribeToMore.bind(s), s.maskResult = s.maskResult.bind(s);
      var o = n.defaultOptions.watchQuery, u = o === void 0 ? {} : o, c = u.fetchPolicy, f = c === void 0 ? "cache-first" : c, d = a.fetchPolicy, l = d === void 0 ? f : d, h = a.initialFetchPolicy, v = h === void 0 ? l === "standby" ? f : l : h;
      s.options = y(y({}, a), {
        // Remember the initial options.fetchPolicy so we can revert back to this
        // policy when variables change. This information can also be specified
        // (or overridden) by providing options.initialFetchPolicy explicitly.
        initialFetchPolicy: v,
        // This ensures this.options.fetchPolicy always has a string value, in
        // case options.fetchPolicy was not provided.
        fetchPolicy: l
      }), s.queryId = i.queryId || n.generateQueryId();
      var m = Me(s.query);
      return s.queryName = m && m.name && m.name.value, s;
    }
    return Object.defineProperty(e.prototype, "query", {
      // The `query` computed property will always reflect the document transformed
      // by the last run query. `this.options.query` will always reflect the raw
      // untransformed query to ensure document transforms with runtime conditionals
      // are run on the original document.
      get: function() {
        return this.lastQuery || this.options.query;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "variables", {
      // Computed shorthand for this.options.variables, preserved for
      // backwards compatibility.
      /**
       * An object containing the variables that were provided for the query.
       */
      get: function() {
        return this.options.variables;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.result = function() {
      var r = this;
      return new Promise(function(n, i) {
        var a = {
          next: function(o) {
            n(o), r.observers.delete(a), r.observers.size || r.queryManager.removeQuery(r.queryId), setTimeout(function() {
              s.unsubscribe();
            }, 0);
          },
          error: i
        }, s = r.subscribe(a);
      });
    }, e.prototype.resetDiff = function() {
      this.queryInfo.resetDiff();
    }, e.prototype.getCurrentFullResult = function(r) {
      r === void 0 && (r = !0);
      var n = this.getLastResult(!0), i = this.queryInfo.networkStatus || n && n.networkStatus || V.ready, a = y(y({}, n), { loading: St(i), networkStatus: i }), s = this.options.fetchPolicy, o = s === void 0 ? "cache-first" : s;
      if (
        // These fetch policies should never deliver data from the cache, unless
        // redelivering a previously delivered result.
        !(lr(o) || // If this.options.query has @client(always: true) fields, we cannot
        // trust diff.result, since it was read from the cache without running
        // local resolvers (and it's too late to run resolvers now, since we must
        // return a result synchronously).
        this.queryManager.getDocumentInfo(this.query).hasForcedResolvers)
      ) if (this.waitForOwnResult)
        this.queryInfo.updateWatch();
      else {
        var u = this.queryInfo.getDiff();
        (u.complete || this.options.returnPartialData) && (a.data = u.result), Q(a.data, {}) && (a.data = void 0), u.complete ? (delete a.partial, u.complete && a.networkStatus === V.loading && (o === "cache-first" || o === "cache-only") && (a.networkStatus = V.ready, a.loading = !1)) : a.partial = !0, globalThis.__DEV__ !== !1 && !u.complete && !this.options.partialRefetch && !a.loading && !a.data && !a.error && Us(u.missing);
      }
      return r && this.updateLastResult(a), a;
    }, e.prototype.getCurrentResult = function(r) {
      return r === void 0 && (r = !0), this.maskResult(this.getCurrentFullResult(r));
    }, e.prototype.isDifferentFromLastResult = function(r, n) {
      if (!this.last)
        return !0;
      var i = this.queryManager.getDocumentInfo(this.query), a = this.queryManager.dataMasking, s = a ? i.nonReactiveQuery : this.query, o = a || i.hasNonreactiveDirective ? !Es(s, this.last.result, r, this.variables) : !Q(this.last.result, r);
      return o || n && !Q(this.last.variables, n);
    }, e.prototype.getLast = function(r, n) {
      var i = this.last;
      if (i && i[r] && (!n || Q(i.variables, this.variables)))
        return i[r];
    }, e.prototype.getLastResult = function(r) {
      return this.getLast("result", r);
    }, e.prototype.getLastError = function(r) {
      return this.getLast("error", r);
    }, e.prototype.resetLastResults = function() {
      delete this.last, this.isTornDown = !1;
    }, e.prototype.resetQueryStoreErrors = function() {
      this.queryManager.resetErrors(this.queryId);
    }, e.prototype.refetch = function(r) {
      var n, i = {
        // Always disable polling for refetches.
        pollInterval: 0
      }, a = this.options.fetchPolicy;
      if (a === "cache-and-network" ? i.fetchPolicy = a : a === "no-cache" ? i.fetchPolicy = "no-cache" : i.fetchPolicy = "network-only", globalThis.__DEV__ !== !1 && r && df.call(r, "variables")) {
        var s = Ha(this.query), o = s.variableDefinitions;
        (!o || !o.some(function(u) {
          return u.variable.name.value === "variables";
        })) && globalThis.__DEV__ !== !1 && k.warn(
          21,
          r,
          ((n = s.name) === null || n === void 0 ? void 0 : n.value) || s
        );
      }
      return r && !Q(this.options.variables, r) && (i.variables = this.options.variables = y(y({}, this.options.variables), r)), this.queryInfo.resetLastWrite(), this.reobserve(i, V.refetch);
    }, e.prototype.fetchMore = function(r) {
      var n = this, i = y(y({}, r.query ? r : y(y(y(y({}, this.options), { query: this.options.query }), r), { variables: y(y({}, this.options.variables), r.variables) })), {
        // The fetchMore request goes immediately to the network and does
        // not automatically write its result to the cache (hence no-cache
        // instead of network-only), because we allow the caller of
        // fetchMore to provide an updateQuery callback that determines how
        // the data gets written to the cache.
        fetchPolicy: "no-cache"
      });
      i.query = this.transformDocument(i.query);
      var a = this.queryManager.generateQueryId();
      this.lastQuery = r.query ? this.transformDocument(this.options.query) : i.query;
      var s = this.queryInfo, o = s.networkStatus;
      s.networkStatus = V.fetchMore, i.notifyOnNetworkStatusChange && this.observe();
      var u = /* @__PURE__ */ new Set(), c = r == null ? void 0 : r.updateQuery, f = this.options.fetchPolicy !== "no-cache";
      return f || k(c, 22), this.queryManager.fetchQuery(a, i, V.fetchMore).then(function(d) {
        if (n.queryManager.removeQuery(a), s.networkStatus === V.fetchMore && (s.networkStatus = o), f)
          n.queryManager.cache.batch({
            update: function(v) {
              var m = r.updateQuery;
              m ? v.updateQuery({
                query: n.query,
                variables: n.variables,
                returnPartialData: !0,
                optimistic: !1
              }, function(g) {
                return m(g, {
                  fetchMoreResult: d.data,
                  variables: i.variables
                });
              }) : v.writeQuery({
                query: i.query,
                variables: i.variables,
                data: d.data
              });
            },
            onWatchUpdated: function(v) {
              u.add(v.query);
            }
          });
        else {
          var l = n.getLast("result"), h = c(l.data, {
            fetchMoreResult: d.data,
            variables: i.variables
          });
          n.reportResult(y(y({}, l), { data: h }), n.variables);
        }
        return n.maskResult(d);
      }).finally(function() {
        f && !u.has(n.query) && Vs(n);
      });
    }, e.prototype.subscribeToMore = function(r) {
      var n = this, i = this.queryManager.startGraphQLSubscription({
        query: r.document,
        variables: r.variables,
        context: r.context
      }).subscribe({
        next: function(a) {
          var s = r.updateQuery;
          s && n.updateQuery(function(o, u) {
            var c = u.variables;
            return s(o, {
              subscriptionData: a,
              variables: c
            });
          });
        },
        error: function(a) {
          if (r.onError) {
            r.onError(a);
            return;
          }
          globalThis.__DEV__ !== !1 && k.error(23, a);
        }
      });
      return this.subscriptions.add(i), function() {
        n.subscriptions.delete(i) && i.unsubscribe();
      };
    }, e.prototype.setOptions = function(r) {
      return this.reobserve(r);
    }, e.prototype.silentSetOptions = function(r) {
      var n = tt(this.options, r || {});
      ji(this.options, n);
    }, e.prototype.setVariables = function(r) {
      return Q(this.variables, r) ? this.observers.size ? this.result() : Promise.resolve() : (this.options.variables = r, this.observers.size ? this.reobserve({
        // Reset options.fetchPolicy to its original value.
        fetchPolicy: this.options.initialFetchPolicy,
        variables: r
      }, V.setVariables) : Promise.resolve());
    }, e.prototype.updateQuery = function(r) {
      var n = this.queryManager, i = n.cache.diff({
        query: this.options.query,
        variables: this.variables,
        returnPartialData: !0,
        optimistic: !1
      }).result, a = r(i, {
        variables: this.variables
      });
      a && (n.cache.writeQuery({
        query: this.options.query,
        data: a,
        variables: this.variables
      }), n.broadcastQueries());
    }, e.prototype.startPolling = function(r) {
      this.options.pollInterval = r, this.updatePolling();
    }, e.prototype.stopPolling = function() {
      this.options.pollInterval = 0, this.updatePolling();
    }, e.prototype.applyNextFetchPolicy = function(r, n) {
      if (n.nextFetchPolicy) {
        var i = n.fetchPolicy, a = i === void 0 ? "cache-first" : i, s = n.initialFetchPolicy, o = s === void 0 ? a : s;
        a === "standby" || (typeof n.nextFetchPolicy == "function" ? n.fetchPolicy = n.nextFetchPolicy(a, {
          reason: r,
          options: n,
          observable: this,
          initialFetchPolicy: o
        }) : r === "variables-changed" ? n.fetchPolicy = o : n.fetchPolicy = n.nextFetchPolicy);
      }
      return n.fetchPolicy;
    }, e.prototype.fetch = function(r, n, i) {
      return this.queryManager.setObservableQuery(this), this.queryManager.fetchConcastWithInfo(this.queryId, r, n, i);
    }, e.prototype.updatePolling = function() {
      var r = this;
      if (!this.queryManager.ssrMode) {
        var n = this, i = n.pollingInfo, a = n.options.pollInterval;
        if (!a || !this.hasObservers()) {
          i && (clearTimeout(i.timeout), delete this.pollingInfo);
          return;
        }
        if (!(i && i.interval === a)) {
          k(a, 24);
          var s = i || (this.pollingInfo = {});
          s.interval = a;
          var o = function() {
            var c, f;
            r.pollingInfo && (!St(r.queryInfo.networkStatus) && !(!((f = (c = r.options).skipPollAttempt) === null || f === void 0) && f.call(c)) ? r.reobserve({
              // Most fetchPolicy options don't make sense to use in a polling context, as
              // users wouldn't want to be polling the cache directly. However, network-only and
              // no-cache are both useful for when the user wants to control whether or not the
              // polled results are written to the cache.
              fetchPolicy: r.options.initialFetchPolicy === "no-cache" ? "no-cache" : "network-only"
            }, V.poll).then(u, u) : u());
          }, u = function() {
            var c = r.pollingInfo;
            c && (clearTimeout(c.timeout), c.timeout = setTimeout(o, c.interval));
          };
          u();
        }
      }
    }, e.prototype.updateLastResult = function(r, n) {
      n === void 0 && (n = this.variables);
      var i = this.getLastError();
      return i && this.last && !Q(n, this.last.variables) && (i = void 0), this.last = y({ result: this.queryManager.assumeImmutableResults ? r : ds(r), variables: n }, i ? { error: i } : null);
    }, e.prototype.reobserveAsConcast = function(r, n) {
      var i = this;
      this.isTornDown = !1;
      var a = (
        // Refetching uses a disposable Concast to allow refetches using different
        // options/variables, without permanently altering the options of the
        // original ObservableQuery.
        n === V.refetch || // The fetchMore method does not actually call the reobserve method, but,
        // if it did, it would definitely use a disposable Concast.
        n === V.fetchMore || // Polling uses a disposable Concast so the polling options (which force
        // fetchPolicy to be "network-only" or "no-cache") won't override the original options.
        n === V.poll
      ), s = this.options.variables, o = this.options.fetchPolicy, u = tt(this.options, r || {}), c = a ? (
        // Disposable Concast fetches receive a shallow copy of this.options
        // (merged with newOptions), leaving this.options unmodified.
        u
      ) : ji(this.options, u), f = this.transformDocument(c.query);
      this.lastQuery = f, a || (this.updatePolling(), r && r.variables && !Q(r.variables, s) && // Don't mess with the fetchPolicy if it's currently "standby".
      c.fetchPolicy !== "standby" && // If we're changing the fetchPolicy anyway, don't try to change it here
      // using applyNextFetchPolicy. The explicit options.fetchPolicy wins.
      (c.fetchPolicy === o || // A `nextFetchPolicy` function has even higher priority, though,
      // so in that case `applyNextFetchPolicy` must be called.
      typeof c.nextFetchPolicy == "function") && (this.applyNextFetchPolicy("variables-changed", c), n === void 0 && (n = V.setVariables))), this.waitForOwnResult && (this.waitForOwnResult = lr(c.fetchPolicy));
      var d = function() {
        i.concast === v && (i.waitForOwnResult = !1);
      }, l = c.variables && y({}, c.variables), h = this.fetch(c, n, f), v = h.concast, m = h.fromLink, g = {
        next: function(p) {
          Q(i.variables, l) && (d(), i.reportResult(p, l));
        },
        error: function(p) {
          Q(i.variables, l) && (ms(p) || (p = new Oe({ networkError: p })), d(), i.reportError(p, l));
        }
      };
      return !a && (m || !this.concast) && (this.concast && this.observer && this.concast.removeObserver(this.observer), this.concast = v, this.observer = g), v.addObserver(g), v;
    }, e.prototype.reobserve = function(r, n) {
      return nc(this.reobserveAsConcast(r, n).promise.then(this.maskResult));
    }, e.prototype.resubscribeAfterError = function() {
      for (var r = [], n = 0; n < arguments.length; n++)
        r[n] = arguments[n];
      var i = this.last;
      this.resetLastResults();
      var a = this.subscribe.apply(this, r);
      return this.last = i, a;
    }, e.prototype.observe = function() {
      this.reportResult(
        // Passing false is important so that this.getCurrentResult doesn't
        // save the fetchMore result as this.lastResult, causing it to be
        // ignored due to the this.isDifferentFromLastResult check in
        // this.reportResult.
        this.getCurrentFullResult(!1),
        this.variables
      );
    }, e.prototype.reportResult = function(r, n) {
      var i = this.getLastError(), a = this.isDifferentFromLastResult(r, n);
      (i || !r.partial || this.options.returnPartialData) && this.updateLastResult(r, n), (i || a) && yt(this.observers, "next", this.maskResult(r));
    }, e.prototype.reportError = function(r, n) {
      var i = y(y({}, this.getLastResult()), { error: r, errors: r.graphQLErrors, networkStatus: V.error, loading: !1 });
      this.updateLastResult(i, n), yt(this.observers, "error", this.last.error = r);
    }, e.prototype.hasObservers = function() {
      return this.observers.size > 0;
    }, e.prototype.tearDownQuery = function() {
      this.isTornDown || (this.concast && this.observer && (this.concast.removeObserver(this.observer), delete this.concast, delete this.observer), this.stopPolling(), this.subscriptions.forEach(function(r) {
        return r.unsubscribe();
      }), this.subscriptions.clear(), this.queryManager.stopQuery(this.queryId), this.observers.clear(), this.isTornDown = !0);
    }, e.prototype.transformDocument = function(r) {
      return this.queryManager.transform(r);
    }, e.prototype.maskResult = function(r) {
      return r && "data" in r ? y(y({}, r), { data: this.queryManager.maskOperation({
        document: this.query,
        data: r.data,
        fetchPolicy: this.options.fetchPolicy,
        id: this.queryId
      }) }) : r;
    }, e;
  }(B)
);
ps(hn);
function Vs(t) {
  var e = t.options, r = e.fetchPolicy, n = e.nextFetchPolicy;
  return r === "cache-and-network" || r === "network-only" ? t.reobserve({
    fetchPolicy: "cache-first",
    // Use a temporary nextFetchPolicy function that replaces itself with the
    // previous nextFetchPolicy value and returns the original fetchPolicy.
    nextFetchPolicy: function(i, a) {
      return this.nextFetchPolicy = n, typeof this.nextFetchPolicy == "function" ? this.nextFetchPolicy(i, a) : r;
    }
  }) : t.reobserve();
}
function pf(t) {
  globalThis.__DEV__ !== !1 && k.error(25, t.message, t.stack);
}
function Us(t) {
  globalThis.__DEV__ !== !1 && t && globalThis.__DEV__ !== !1 && k.debug(26, t);
}
function lr(t) {
  return t === "network-only" || t === "no-cache" || t === "standby";
}
var $e = new (qe ? WeakMap : Map)();
function hr(t, e) {
  var r = t[e];
  typeof r == "function" && (t[e] = function() {
    return $e.set(
      t,
      // The %1e15 allows the count to wrap around to 0 safely every
      // quadrillion evictions, so there's no risk of overflow. To be
      // clear, this is more of a pedantic principle than something
      // that matters in any conceivable practical scenario.
      ($e.get(t) + 1) % 1e15
    ), r.apply(this, arguments);
  });
}
function Vi(t) {
  t.notifyTimeout && (clearTimeout(t.notifyTimeout), t.notifyTimeout = void 0);
}
var dr = (
  /** @class */
  function() {
    function t(e, r) {
      r === void 0 && (r = e.generateQueryId()), this.queryId = r, this.listeners = /* @__PURE__ */ new Set(), this.document = null, this.lastRequestId = 1, this.stopped = !1, this.dirty = !1, this.observableQuery = null;
      var n = this.cache = e.cache;
      $e.has(n) || ($e.set(n, 0), hr(n, "evict"), hr(n, "modify"), hr(n, "reset"));
    }
    return t.prototype.init = function(e) {
      var r = e.networkStatus || V.loading;
      return this.variables && this.networkStatus !== V.loading && !Q(this.variables, e.variables) && (r = V.setVariables), Q(e.variables, this.variables) || (this.lastDiff = void 0), Object.assign(this, {
        document: e.document,
        variables: e.variables,
        networkError: null,
        graphQLErrors: this.graphQLErrors || [],
        networkStatus: r
      }), e.observableQuery && this.setObservableQuery(e.observableQuery), e.lastRequestId && (this.lastRequestId = e.lastRequestId), this;
    }, t.prototype.reset = function() {
      Vi(this), this.dirty = !1;
    }, t.prototype.resetDiff = function() {
      this.lastDiff = void 0;
    }, t.prototype.getDiff = function() {
      var e = this.getDiffOptions();
      if (this.lastDiff && Q(e, this.lastDiff.options))
        return this.lastDiff.diff;
      this.updateWatch(this.variables);
      var r = this.observableQuery;
      if (r && r.options.fetchPolicy === "no-cache")
        return { complete: !1 };
      var n = this.cache.diff(e);
      return this.updateLastDiff(n, e), n;
    }, t.prototype.updateLastDiff = function(e, r) {
      this.lastDiff = e ? {
        diff: e,
        options: r || this.getDiffOptions()
      } : void 0;
    }, t.prototype.getDiffOptions = function(e) {
      var r;
      return e === void 0 && (e = this.variables), {
        query: this.document,
        variables: e,
        returnPartialData: !0,
        optimistic: !0,
        canonizeResults: (r = this.observableQuery) === null || r === void 0 ? void 0 : r.options.canonizeResults
      };
    }, t.prototype.setDiff = function(e) {
      var r = this, n, i = this.lastDiff && this.lastDiff.diff;
      e && !e.complete && (!((n = this.observableQuery) === null || n === void 0) && n.getLastError()) || (this.updateLastDiff(e), !this.dirty && !Q(i && i.result, e && e.result) && (this.dirty = !0, this.notifyTimeout || (this.notifyTimeout = setTimeout(function() {
        return r.notify();
      }, 0))));
    }, t.prototype.setObservableQuery = function(e) {
      var r = this;
      e !== this.observableQuery && (this.oqListener && this.listeners.delete(this.oqListener), this.observableQuery = e, e ? (e.queryInfo = this, this.listeners.add(this.oqListener = function() {
        var n = r.getDiff();
        n.fromOptimisticTransaction ? e.observe() : Vs(e);
      })) : delete this.oqListener);
    }, t.prototype.notify = function() {
      var e = this;
      Vi(this), this.shouldNotify() && this.listeners.forEach(function(r) {
        return r(e);
      }), this.dirty = !1;
    }, t.prototype.shouldNotify = function() {
      if (!this.dirty || !this.listeners.size)
        return !1;
      if (St(this.networkStatus) && this.observableQuery) {
        var e = this.observableQuery.options.fetchPolicy;
        if (e !== "cache-only" && e !== "cache-and-network")
          return !1;
      }
      return !0;
    }, t.prototype.stop = function() {
      if (!this.stopped) {
        this.stopped = !0, this.reset(), this.cancel(), this.cancel = t.prototype.cancel;
        var e = this.observableQuery;
        e && e.stopPolling();
      }
    }, t.prototype.cancel = function() {
    }, t.prototype.updateWatch = function(e) {
      var r = this;
      e === void 0 && (e = this.variables);
      var n = this.observableQuery;
      if (!(n && n.options.fetchPolicy === "no-cache")) {
        var i = y(y({}, this.getDiffOptions(e)), { watcher: this, callback: function(a) {
          return r.setDiff(a);
        } });
        (!this.lastWatch || !Q(i, this.lastWatch)) && (this.cancel(), this.cancel = this.cache.watch(this.lastWatch = i));
      }
    }, t.prototype.resetLastWrite = function() {
      this.lastWrite = void 0;
    }, t.prototype.shouldWrite = function(e, r) {
      var n = this.lastWrite;
      return !(n && // If cache.evict has been called since the last time we wrote this
      // data into the cache, there's a chance writing this result into
      // the cache will repair what was evicted.
      n.dmCount === $e.get(this.cache) && Q(r, n.variables) && Q(e.data, n.result.data));
    }, t.prototype.markResult = function(e, r, n, i) {
      var a = this, s = new Ne(), o = de(e.errors) ? e.errors.slice(0) : [];
      if (this.reset(), "incremental" in e && de(e.incremental)) {
        var u = ys(this.getDiff().result, e);
        e.data = u;
      } else if ("hasNext" in e && e.hasNext) {
        var c = this.getDiff();
        e.data = s.merge(c.result, e.data);
      }
      this.graphQLErrors = o, n.fetchPolicy === "no-cache" ? this.updateLastDiff({ result: e.data, complete: !0 }, this.getDiffOptions(n.variables)) : i !== 0 && (dn(e, n.errorPolicy) ? this.cache.performTransaction(function(f) {
        if (a.shouldWrite(e, n.variables))
          f.writeQuery({
            query: r,
            data: e.data,
            variables: n.variables,
            overwrite: i === 1
          }), a.lastWrite = {
            result: e,
            variables: n.variables,
            dmCount: $e.get(a.cache)
          };
        else if (a.lastDiff && a.lastDiff.diff.complete) {
          e.data = a.lastDiff.diff.result;
          return;
        }
        var d = a.getDiffOptions(n.variables), l = f.diff(d);
        !a.stopped && Q(a.variables, n.variables) && a.updateWatch(n.variables), a.updateLastDiff(l, d), l.complete && (e.data = l.result);
      }) : this.lastWrite = void 0);
    }, t.prototype.markReady = function() {
      return this.networkError = null, this.networkStatus = V.ready;
    }, t.prototype.markError = function(e) {
      return this.networkStatus = V.error, this.lastWrite = void 0, this.reset(), e.graphQLErrors && (this.graphQLErrors = e.graphQLErrors), e.networkError && (this.networkError = e.networkError), e;
    }, t;
  }()
);
function dn(t, e) {
  e === void 0 && (e = "none");
  var r = e === "ignore" || e === "all", n = !Ft(t);
  return !n && r && t.data && (n = !0), n;
}
var yf = Object.prototype.hasOwnProperty, Ui = /* @__PURE__ */ Object.create(null), vf = (
  /** @class */
  function() {
    function t(e) {
      var r = this;
      this.clientAwareness = {}, this.queries = /* @__PURE__ */ new Map(), this.fetchCancelFns = /* @__PURE__ */ new Map(), this.transformCache = new Ua(
        me["queryManager.getDocumentInfo"] || 2e3
        /* defaultCacheSizes["queryManager.getDocumentInfo"] */
      ), this.queryIdCounter = 1, this.requestIdCounter = 1, this.mutationIdCounter = 1, this.inFlightLinkObservables = new be(!1), this.noCacheWarningsByQueryId = /* @__PURE__ */ new Set();
      var n = new ss(
        function(a) {
          return r.cache.transformDocument(a);
        },
        // Allow the apollo cache to manage its own transform caches
        { cache: !1 }
      );
      this.cache = e.cache, this.link = e.link, this.defaultOptions = e.defaultOptions, this.queryDeduplication = e.queryDeduplication, this.clientAwareness = e.clientAwareness, this.localState = e.localState, this.ssrMode = e.ssrMode, this.assumeImmutableResults = e.assumeImmutableResults, this.dataMasking = e.dataMasking;
      var i = e.documentTransform;
      this.documentTransform = i ? n.concat(i).concat(n) : n, this.defaultContext = e.defaultContext || /* @__PURE__ */ Object.create(null), (this.onBroadcast = e.onBroadcast) && (this.mutationStore = /* @__PURE__ */ Object.create(null));
    }
    return t.prototype.stop = function() {
      var e = this;
      this.queries.forEach(function(r, n) {
        e.stopQueryNoBroadcast(n);
      }), this.cancelPendingFetches(ie(27));
    }, t.prototype.cancelPendingFetches = function(e) {
      this.fetchCancelFns.forEach(function(r) {
        return r(e);
      }), this.fetchCancelFns.clear();
    }, t.prototype.mutate = function(e) {
      return _e(this, arguments, void 0, function(r) {
        var n, i, a, s, o, u, c, f = r.mutation, d = r.variables, l = r.optimisticResponse, h = r.updateQueries, v = r.refetchQueries, m = v === void 0 ? [] : v, g = r.awaitRefetchQueries, p = g === void 0 ? !1 : g, E = r.update, b = r.onQueryUpdated, w = r.fetchPolicy, S = w === void 0 ? ((u = this.defaultOptions.mutate) === null || u === void 0 ? void 0 : u.fetchPolicy) || "network-only" : w, O = r.errorPolicy, N = O === void 0 ? ((c = this.defaultOptions.mutate) === null || c === void 0 ? void 0 : c.errorPolicy) || "none" : O, A = r.keepRootFields, L = r.context;
        return we(this, function(j) {
          switch (j.label) {
            case 0:
              return k(f, 28), k(S === "network-only" || S === "no-cache", 29), n = this.generateMutationId(), f = this.cache.transformForLink(this.transform(f)), i = this.getDocumentInfo(f).hasClientExports, d = this.getVariables(f, d), i ? [4, this.localState.addExportedVariables(f, d, L)] : [3, 2];
            case 1:
              d = j.sent(), j.label = 2;
            case 2:
              return a = this.mutationStore && (this.mutationStore[n] = {
                mutation: f,
                variables: d,
                loading: !0,
                error: null
              }), s = l && this.markMutationOptimistic(l, {
                mutationId: n,
                document: f,
                variables: d,
                fetchPolicy: S,
                errorPolicy: N,
                context: L,
                updateQueries: h,
                update: E,
                keepRootFields: A
              }), this.broadcastQueries(), o = this, [2, new Promise(function(se, pe) {
                return ar(o.getObservableFromLink(f, y(y({}, L), { optimisticResponse: s ? l : void 0 }), d, {}, !1), function(G) {
                  if (Ft(G) && N === "none")
                    throw new Oe({
                      graphQLErrors: nn(G)
                    });
                  a && (a.loading = !1, a.error = null);
                  var ue = y({}, G);
                  return typeof m == "function" && (m = m(ue)), N === "ignore" && Ft(ue) && delete ue.errors, o.markMutationResult({
                    mutationId: n,
                    result: ue,
                    document: f,
                    variables: d,
                    fetchPolicy: S,
                    errorPolicy: N,
                    context: L,
                    update: E,
                    updateQueries: h,
                    awaitRefetchQueries: p,
                    refetchQueries: m,
                    removeOptimistic: s ? n : void 0,
                    onQueryUpdated: b,
                    keepRootFields: A
                  });
                }).subscribe({
                  next: function(G) {
                    o.broadcastQueries(), (!("hasNext" in G) || G.hasNext === !1) && se(y(y({}, G), { data: o.maskOperation({
                      document: f,
                      data: G.data,
                      fetchPolicy: S,
                      id: n
                    }) }));
                  },
                  error: function(G) {
                    a && (a.loading = !1, a.error = G), s && o.cache.removeOptimistic(n), o.broadcastQueries(), pe(G instanceof Oe ? G : new Oe({
                      networkError: G
                    }));
                  }
                });
              })];
          }
        });
      });
    }, t.prototype.markMutationResult = function(e, r) {
      var n = this;
      r === void 0 && (r = this.cache);
      var i = e.result, a = [], s = e.fetchPolicy === "no-cache";
      if (!s && dn(i, e.errorPolicy)) {
        if (Ge(i) || a.push({
          result: i.data,
          dataId: "ROOT_MUTATION",
          query: e.document,
          variables: e.variables
        }), Ge(i) && de(i.incremental)) {
          var o = r.diff({
            id: "ROOT_MUTATION",
            // The cache complains if passed a mutation where it expects a
            // query, so we transform mutations and subscriptions to queries
            // (only once, thanks to this.transformCache).
            query: this.getDocumentInfo(e.document).asQuery,
            variables: e.variables,
            optimistic: !1,
            returnPartialData: !0
          }), u = void 0;
          o.result && (u = ys(o.result, i)), typeof u < "u" && (i.data = u, a.push({
            result: u,
            dataId: "ROOT_MUTATION",
            query: e.document,
            variables: e.variables
          }));
        }
        var c = e.updateQueries;
        c && this.queries.forEach(function(d, l) {
          var h = d.observableQuery, v = h && h.queryName;
          if (!(!v || !yf.call(c, v))) {
            var m = c[v], g = n.queries.get(l), p = g.document, E = g.variables, b = r.diff({
              query: p,
              variables: E,
              returnPartialData: !0,
              optimistic: !1
            }), w = b.result, S = b.complete;
            if (S && w) {
              var O = m(w, {
                mutationResult: i,
                queryName: p && Ct(p) || void 0,
                queryVariables: E
              });
              O && a.push({
                result: O,
                dataId: "ROOT_QUERY",
                query: p,
                variables: E
              });
            }
          }
        });
      }
      if (a.length > 0 || (e.refetchQueries || "").length > 0 || e.update || e.onQueryUpdated || e.removeOptimistic) {
        var f = [];
        if (this.refetchQueries({
          updateCache: function(d) {
            s || a.forEach(function(m) {
              return d.write(m);
            });
            var l = e.update, h = !uc(i) || Ge(i) && !i.hasNext;
            if (l) {
              if (!s) {
                var v = d.diff({
                  id: "ROOT_MUTATION",
                  // The cache complains if passed a mutation where it expects a
                  // query, so we transform mutations and subscriptions to queries
                  // (only once, thanks to this.transformCache).
                  query: n.getDocumentInfo(e.document).asQuery,
                  variables: e.variables,
                  optimistic: !1,
                  returnPartialData: !0
                });
                v.complete && (i = y(y({}, i), { data: v.result }), "incremental" in i && delete i.incremental, "hasNext" in i && delete i.hasNext);
              }
              h && l(d, i, {
                context: e.context,
                variables: e.variables
              });
            }
            !s && !e.keepRootFields && h && d.modify({
              id: "ROOT_MUTATION",
              fields: function(m, g) {
                var p = g.fieldName, E = g.DELETE;
                return p === "__typename" ? m : E;
              }
            });
          },
          include: e.refetchQueries,
          // Write the final mutation.result to the root layer of the cache.
          optimistic: !1,
          // Remove the corresponding optimistic layer at the same time as we
          // write the final non-optimistic result.
          removeOptimistic: e.removeOptimistic,
          // Let the caller of client.mutate optionally determine the refetching
          // behavior for watched queries after the mutation.update function runs.
          // If no onQueryUpdated function was provided for this mutation, pass
          // null instead of undefined to disable the default refetching behavior.
          onQueryUpdated: e.onQueryUpdated || null
        }).forEach(function(d) {
          return f.push(d);
        }), e.awaitRefetchQueries || e.onQueryUpdated)
          return Promise.all(f).then(function() {
            return i;
          });
      }
      return Promise.resolve(i);
    }, t.prototype.markMutationOptimistic = function(e, r) {
      var n = this, i = typeof e == "function" ? e(r.variables, { IGNORE: Ui }) : e;
      return i === Ui ? !1 : (this.cache.recordOptimisticTransaction(function(a) {
        try {
          n.markMutationResult(y(y({}, r), { result: { data: i } }), a);
        } catch (s) {
          globalThis.__DEV__ !== !1 && k.error(s);
        }
      }, r.mutationId), !0);
    }, t.prototype.fetchQuery = function(e, r, n) {
      return this.fetchConcastWithInfo(e, r, n).concast.promise;
    }, t.prototype.getQueryStore = function() {
      var e = /* @__PURE__ */ Object.create(null);
      return this.queries.forEach(function(r, n) {
        e[n] = {
          variables: r.variables,
          networkStatus: r.networkStatus,
          networkError: r.networkError,
          graphQLErrors: r.graphQLErrors
        };
      }), e;
    }, t.prototype.resetErrors = function(e) {
      var r = this.queries.get(e);
      r && (r.networkError = void 0, r.graphQLErrors = []);
    }, t.prototype.transform = function(e) {
      return this.documentTransform.transformDocument(e);
    }, t.prototype.getDocumentInfo = function(e) {
      var r = this.transformCache;
      if (!r.has(e)) {
        var n = {
          // TODO These three calls (hasClientExports, shouldForceResolvers, and
          // usesNonreactiveDirective) are performing independent full traversals
          // of the transformed document. We should consider merging these
          // traversals into a single pass in the future, though the work is
          // cached after the first time.
          hasClientExports: Qo(e),
          hasForcedResolvers: this.localState.shouldForceResolvers(e),
          hasNonreactiveDirective: bt(["nonreactive"], e),
          nonReactiveQuery: Wu(e),
          clientQuery: this.localState.clientQuery(e),
          serverQuery: us([
            { name: "client", remove: !0 },
            { name: "connection" },
            { name: "nonreactive" },
            { name: "unmask" }
          ], e),
          defaultVars: On(Me(e)),
          // Transform any mutation or subscription operations to query operations
          // so we can read/write them from/to the cache.
          asQuery: y(y({}, e), { definitions: e.definitions.map(function(i) {
            return i.kind === "OperationDefinition" && i.operation !== "query" ? y(y({}, i), { operation: "query" }) : i;
          }) })
        };
        r.set(e, n);
      }
      return r.get(e);
    }, t.prototype.getVariables = function(e, r) {
      return y(y({}, this.getDocumentInfo(e).defaultVars), r);
    }, t.prototype.watchQuery = function(e) {
      var r = this.transform(e.query);
      e = y(y({}, e), { variables: this.getVariables(r, e.variables) }), typeof e.notifyOnNetworkStatusChange > "u" && (e.notifyOnNetworkStatusChange = !1);
      var n = new dr(this), i = new hn({
        queryManager: this,
        queryInfo: n,
        options: e
      });
      return i.lastQuery = r, this.queries.set(i.queryId, n), n.init({
        document: r,
        observableQuery: i,
        variables: i.variables
      }), i;
    }, t.prototype.query = function(e, r) {
      var n = this;
      r === void 0 && (r = this.generateQueryId()), k(e.query, 30), k(e.query.kind === "Document", 31), k(!e.returnPartialData, 32), k(!e.pollInterval, 33);
      var i = this.transform(e.query);
      return this.fetchQuery(r, y(y({}, e), { query: i })).then(function(a) {
        return a && y(y({}, a), { data: n.maskOperation({
          document: i,
          data: a.data,
          fetchPolicy: e.fetchPolicy,
          id: r
        }) });
      }).finally(function() {
        return n.stopQuery(r);
      });
    }, t.prototype.generateQueryId = function() {
      return String(this.queryIdCounter++);
    }, t.prototype.generateRequestId = function() {
      return this.requestIdCounter++;
    }, t.prototype.generateMutationId = function() {
      return String(this.mutationIdCounter++);
    }, t.prototype.stopQueryInStore = function(e) {
      this.stopQueryInStoreNoBroadcast(e), this.broadcastQueries();
    }, t.prototype.stopQueryInStoreNoBroadcast = function(e) {
      var r = this.queries.get(e);
      r && r.stop();
    }, t.prototype.clearStore = function(e) {
      return e === void 0 && (e = {
        discardWatches: !0
      }), this.cancelPendingFetches(ie(34)), this.queries.forEach(function(r) {
        r.observableQuery ? r.networkStatus = V.loading : r.stop();
      }), this.mutationStore && (this.mutationStore = /* @__PURE__ */ Object.create(null)), this.cache.reset(e);
    }, t.prototype.getObservableQueries = function(e) {
      var r = this;
      e === void 0 && (e = "active");
      var n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Set();
      return Array.isArray(e) && e.forEach(function(s) {
        typeof s == "string" ? i.set(s, !1) : mu(s) ? i.set(r.transform(s), !1) : W(s) && s.query && a.add(s);
      }), this.queries.forEach(function(s, o) {
        var u = s.observableQuery, c = s.document;
        if (u) {
          if (e === "all") {
            n.set(o, u);
            return;
          }
          var f = u.queryName, d = u.options.fetchPolicy;
          if (d === "standby" || e === "active" && !u.hasObservers())
            return;
          (e === "active" || f && i.has(f) || c && i.has(c)) && (n.set(o, u), f && i.set(f, !0), c && i.set(c, !0));
        }
      }), a.size && a.forEach(function(s) {
        var o = Wr("legacyOneTimeQuery"), u = r.getQuery(o).init({
          document: s.query,
          variables: s.variables
        }), c = new hn({
          queryManager: r,
          queryInfo: u,
          options: y(y({}, s), { fetchPolicy: "network-only" })
        });
        k(c.queryId === o), u.setObservableQuery(c), n.set(o, c);
      }), globalThis.__DEV__ !== !1 && i.size && i.forEach(function(s, o) {
        s || globalThis.__DEV__ !== !1 && k.warn(typeof o == "string" ? 35 : 36, o);
      }), n;
    }, t.prototype.reFetchObservableQueries = function(e) {
      var r = this;
      e === void 0 && (e = !1);
      var n = [];
      return this.getObservableQueries(e ? "all" : "active").forEach(function(i, a) {
        var s = i.options.fetchPolicy;
        i.resetLastResults(), (e || s !== "standby" && s !== "cache-only") && n.push(i.refetch()), r.getQuery(a).setDiff(null);
      }), this.broadcastQueries(), Promise.all(n);
    }, t.prototype.setObservableQuery = function(e) {
      this.getQuery(e.queryId).setObservableQuery(e);
    }, t.prototype.startGraphQLSubscription = function(e) {
      var r = this, n = e.query, i = e.variables, a = e.fetchPolicy, s = e.errorPolicy, o = s === void 0 ? "none" : s, u = e.context, c = u === void 0 ? {} : u, f = e.extensions, d = f === void 0 ? {} : f;
      n = this.transform(n), i = this.getVariables(n, i);
      var l = function(v) {
        return r.getObservableFromLink(n, c, v, d).map(function(m) {
          a !== "no-cache" && (dn(m, o) && r.cache.write({
            query: n,
            result: m.data,
            dataId: "ROOT_SUBSCRIPTION",
            variables: v
          }), r.broadcastQueries());
          var g = Ft(m), p = Tc(m);
          if (g || p) {
            var E = {};
            if (g && (E.graphQLErrors = m.errors), p && (E.protocolErrors = m.extensions[Cn]), o === "none" || p)
              throw new Oe(E);
          }
          return o === "ignore" && delete m.errors, m;
        });
      };
      if (this.getDocumentInfo(n).hasClientExports) {
        var h = this.localState.addExportedVariables(n, i, c).then(l);
        return new B(function(v) {
          var m = null;
          return h.then(function(g) {
            return m = g.subscribe(v);
          }, v.error), function() {
            return m && m.unsubscribe();
          };
        });
      }
      return l(i);
    }, t.prototype.stopQuery = function(e) {
      this.stopQueryNoBroadcast(e), this.broadcastQueries();
    }, t.prototype.stopQueryNoBroadcast = function(e) {
      this.stopQueryInStoreNoBroadcast(e), this.removeQuery(e);
    }, t.prototype.removeQuery = function(e) {
      this.fetchCancelFns.delete(e), this.queries.has(e) && (this.getQuery(e).stop(), this.queries.delete(e));
    }, t.prototype.broadcastQueries = function() {
      this.onBroadcast && this.onBroadcast(), this.queries.forEach(function(e) {
        return e.notify();
      });
    }, t.prototype.getLocalState = function() {
      return this.localState;
    }, t.prototype.getObservableFromLink = function(e, r, n, i, a) {
      var s = this, o;
      a === void 0 && (a = (o = r == null ? void 0 : r.queryDeduplication) !== null && o !== void 0 ? o : this.queryDeduplication);
      var u, c = this.getDocumentInfo(e), f = c.serverQuery, d = c.clientQuery;
      if (f) {
        var l = this, h = l.inFlightLinkObservables, v = l.link, m = {
          query: f,
          variables: n,
          operationName: Ct(f) || void 0,
          context: this.prepareContext(y(y({}, r), { forceFetch: !a })),
          extensions: i
        };
        if (r = m.context, a) {
          var g = Tt(f), p = Te(n), E = h.lookup(g, p);
          if (u = E.observable, !u) {
            var b = new Qe([
              an(v, m)
            ]);
            u = E.observable = b, b.beforeNext(function() {
              h.remove(g, p);
            });
          }
        } else
          u = new Qe([
            an(v, m)
          ]);
      } else
        u = new Qe([B.of({ data: {} })]), r = this.prepareContext(r);
      return d && (u = ar(u, function(w) {
        return s.localState.runResolvers({
          document: d,
          remoteResult: w,
          context: r,
          variables: n
        });
      })), u;
    }, t.prototype.getResultsFromLink = function(e, r, n) {
      var i = e.lastRequestId = this.generateRequestId(), a = this.cache.transformForLink(n.query);
      return ar(this.getObservableFromLink(a, n.context, n.variables), function(s) {
        var o = nn(s), u = o.length > 0, c = n.errorPolicy;
        if (i >= e.lastRequestId) {
          if (u && c === "none")
            throw e.markError(new Oe({
              graphQLErrors: o
            }));
          e.markResult(s, a, n, r), e.markReady();
        }
        var f = {
          data: s.data,
          loading: !1,
          networkStatus: V.ready
        };
        return u && c === "none" && (f.data = void 0), u && c !== "ignore" && (f.errors = o, f.networkStatus = V.error), f;
      }, function(s) {
        var o = ms(s) ? s : new Oe({ networkError: s });
        throw i >= e.lastRequestId && e.markError(o), o;
      });
    }, t.prototype.fetchConcastWithInfo = function(e, r, n, i) {
      var a = this;
      n === void 0 && (n = V.loading), i === void 0 && (i = r.query);
      var s = this.getVariables(i, r.variables), o = this.getQuery(e), u = this.defaultOptions.watchQuery, c = r.fetchPolicy, f = c === void 0 ? u && u.fetchPolicy || "cache-first" : c, d = r.errorPolicy, l = d === void 0 ? u && u.errorPolicy || "none" : d, h = r.returnPartialData, v = h === void 0 ? !1 : h, m = r.notifyOnNetworkStatusChange, g = m === void 0 ? !1 : m, p = r.context, E = p === void 0 ? {} : p, b = Object.assign({}, r, {
        query: i,
        variables: s,
        fetchPolicy: f,
        errorPolicy: l,
        returnPartialData: v,
        notifyOnNetworkStatusChange: g,
        context: E
      }), w = function(L) {
        b.variables = L;
        var j = a.fetchQueryByPolicy(o, b, n);
        return (
          // If we're in standby, postpone advancing options.fetchPolicy using
          // applyNextFetchPolicy.
          b.fetchPolicy !== "standby" && // The "standby" policy currently returns [] from fetchQueryByPolicy, so
          // this is another way to detect when nothing was done/fetched.
          j.sources.length > 0 && o.observableQuery && o.observableQuery.applyNextFetchPolicy("after-fetch", r), j
        );
      }, S = function() {
        return a.fetchCancelFns.delete(e);
      };
      this.fetchCancelFns.set(e, function(L) {
        S(), setTimeout(function() {
          return O.cancel(L);
        });
      });
      var O, N;
      if (this.getDocumentInfo(b.query).hasClientExports)
        O = new Qe(this.localState.addExportedVariables(b.query, b.variables, b.context).then(w).then(function(L) {
          return L.sources;
        })), N = !0;
      else {
        var A = w(b.variables);
        N = A.fromLink, O = new Qe(A.sources);
      }
      return O.promise.then(S, S), {
        concast: O,
        fromLink: N
      };
    }, t.prototype.refetchQueries = function(e) {
      var r = this, n = e.updateCache, i = e.include, a = e.optimistic, s = a === void 0 ? !1 : a, o = e.removeOptimistic, u = o === void 0 ? s ? Wr("refetchQueries") : void 0 : o, c = e.onQueryUpdated, f = /* @__PURE__ */ new Map();
      i && this.getObservableQueries(i).forEach(function(l, h) {
        f.set(h, {
          oq: l,
          lastDiff: r.getQuery(h).getDiff()
        });
      });
      var d = /* @__PURE__ */ new Map();
      return n && this.cache.batch({
        update: n,
        // Since you can perform any combination of cache reads and/or writes in
        // the cache.batch update function, its optimistic option can be either
        // a boolean or a string, representing three distinct modes of
        // operation:
        //
        // * false: read/write only the root layer
        // * true: read/write the topmost layer
        // * string: read/write a fresh optimistic layer with that ID string
        //
        // When typeof optimistic === "string", a new optimistic layer will be
        // temporarily created within cache.batch with that string as its ID. If
        // we then pass that same string as the removeOptimistic option, we can
        // make cache.batch immediately remove the optimistic layer after
        // running the updateCache function, triggering only one broadcast.
        //
        // However, the refetchQueries method accepts only true or false for its
        // optimistic option (not string). We interpret true to mean a temporary
        // optimistic layer should be created, to allow efficiently rolling back
        // the effect of the updateCache function, which involves passing a
        // string instead of true as the optimistic option to cache.batch, when
        // refetchQueries receives optimistic: true.
        //
        // In other words, we are deliberately not supporting the use case of
        // writing to an *existing* optimistic layer (using the refetchQueries
        // updateCache function), since that would potentially interfere with
        // other optimistic updates in progress. Instead, you can read/write
        // only the root layer by passing optimistic: false to refetchQueries,
        // or you can read/write a brand new optimistic layer that will be
        // automatically removed by passing optimistic: true.
        optimistic: s && u || !1,
        // The removeOptimistic option can also be provided by itself, even if
        // optimistic === false, to remove some previously-added optimistic
        // layer safely and efficiently, like we do in markMutationResult.
        //
        // If an explicit removeOptimistic string is provided with optimistic:
        // true, the removeOptimistic string will determine the ID of the
        // temporary optimistic layer, in case that ever matters.
        removeOptimistic: u,
        onWatchUpdated: function(l, h, v) {
          var m = l.watcher instanceof dr && l.watcher.observableQuery;
          if (m) {
            if (c) {
              f.delete(m.queryId);
              var g = c(m, h, v);
              return g === !0 && (g = m.refetch()), g !== !1 && d.set(m, g), g;
            }
            c !== null && f.set(m.queryId, { oq: m, lastDiff: v, diff: h });
          }
        }
      }), f.size && f.forEach(function(l, h) {
        var v = l.oq, m = l.lastDiff, g = l.diff, p;
        if (c) {
          if (!g) {
            var E = v.queryInfo;
            E.reset(), g = E.getDiff();
          }
          p = c(v, g, m);
        }
        (!c || p === !0) && (p = v.refetch()), p !== !1 && d.set(v, p), h.indexOf("legacyOneTimeQuery") >= 0 && r.stopQueryNoBroadcast(h);
      }), u && this.cache.removeOptimistic(u), d;
    }, t.prototype.maskOperation = function(e) {
      var r, n, i, a = e.document, s = e.data;
      if (globalThis.__DEV__ !== !1) {
        var o = e.fetchPolicy, u = e.id, c = (r = Me(a)) === null || r === void 0 ? void 0 : r.operation, f = ((n = c == null ? void 0 : c[0]) !== null && n !== void 0 ? n : "o") + u;
        this.dataMasking && o === "no-cache" && !Zo(a) && !this.noCacheWarningsByQueryId.has(f) && (this.noCacheWarningsByQueryId.add(f), globalThis.__DEV__ !== !1 && k.warn(
          37,
          (i = Ct(a)) !== null && i !== void 0 ? i : "Unnamed ".concat(c ?? "operation")
        ));
      }
      return this.dataMasking ? Jc(s, a, this.cache) : s;
    }, t.prototype.maskFragment = function(e) {
      var r = e.data, n = e.fragment, i = e.fragmentName;
      return this.dataMasking ? Ts(r, n, this.cache, i) : r;
    }, t.prototype.fetchQueryByPolicy = function(e, r, n) {
      var i = this, a = r.query, s = r.variables, o = r.fetchPolicy, u = r.refetchWritePolicy, c = r.errorPolicy, f = r.returnPartialData, d = r.context, l = r.notifyOnNetworkStatusChange, h = e.networkStatus;
      e.init({
        document: a,
        variables: s,
        networkStatus: n
      });
      var v = function() {
        return e.getDiff();
      }, m = function(w, S) {
        S === void 0 && (S = e.networkStatus || V.loading);
        var O = w.result;
        globalThis.__DEV__ !== !1 && !f && !Q(O, {}) && Us(w.missing);
        var N = function(A) {
          return B.of(y({ data: A, loading: St(S), networkStatus: S }, w.complete ? null : { partial: !0 }));
        };
        return O && i.getDocumentInfo(a).hasForcedResolvers ? i.localState.runResolvers({
          document: a,
          remoteResult: { data: O },
          context: d,
          variables: s,
          onlyRunForcedResolvers: !0
        }).then(function(A) {
          return N(A.data || void 0);
        }) : c === "none" && S === V.refetch && Array.isArray(w.missing) ? N(void 0) : N(O);
      }, g = o === "no-cache" ? 0 : n === V.refetch && u !== "merge" ? 1 : 2, p = function() {
        return i.getResultsFromLink(e, g, {
          query: a,
          variables: s,
          context: d,
          fetchPolicy: o,
          errorPolicy: c
        });
      }, E = l && typeof h == "number" && h !== n && St(n);
      switch (o) {
        default:
        case "cache-first": {
          var b = v();
          return b.complete ? {
            fromLink: !1,
            sources: [m(b, e.markReady())]
          } : f || E ? {
            fromLink: !0,
            sources: [m(b), p()]
          } : { fromLink: !0, sources: [p()] };
        }
        case "cache-and-network": {
          var b = v();
          return b.complete || f || E ? {
            fromLink: !0,
            sources: [m(b), p()]
          } : { fromLink: !0, sources: [p()] };
        }
        case "cache-only":
          return {
            fromLink: !1,
            sources: [m(v(), e.markReady())]
          };
        case "network-only":
          return E ? {
            fromLink: !0,
            sources: [m(v()), p()]
          } : { fromLink: !0, sources: [p()] };
        case "no-cache":
          return E ? {
            fromLink: !0,
            // Note that queryInfo.getDiff() for no-cache queries does not call
            // cache.diff, but instead returns a { complete: false } stub result
            // when there is no queryInfo.diff already defined.
            sources: [m(e.getDiff()), p()]
          } : { fromLink: !0, sources: [p()] };
        case "standby":
          return { fromLink: !1, sources: [] };
      }
    }, t.prototype.getQuery = function(e) {
      return e && !this.queries.has(e) && this.queries.set(e, new dr(this, e)), this.queries.get(e);
    }, t.prototype.prepareContext = function(e) {
      e === void 0 && (e = {});
      var r = this.localState.prepareContext(e);
      return y(y(y({}, this.defaultContext), r), { clientAwareness: this.clientAwareness });
    }, t;
  }()
), mf = (
  /** @class */
  function() {
    function t(e) {
      var r = e.cache, n = e.client, i = e.resolvers, a = e.fragmentMatcher;
      this.selectionsToResolveCache = /* @__PURE__ */ new WeakMap(), this.cache = r, n && (this.client = n), i && this.addResolvers(i), a && this.setFragmentMatcher(a);
    }
    return t.prototype.addResolvers = function(e) {
      var r = this;
      this.resolvers = this.resolvers || {}, Array.isArray(e) ? e.forEach(function(n) {
        r.resolvers = oi(r.resolvers, n);
      }) : this.resolvers = oi(this.resolvers, e);
    }, t.prototype.setResolvers = function(e) {
      this.resolvers = {}, this.addResolvers(e);
    }, t.prototype.getResolvers = function() {
      return this.resolvers || {};
    }, t.prototype.runResolvers = function(e) {
      return _e(this, arguments, void 0, function(r) {
        var n = r.document, i = r.remoteResult, a = r.context, s = r.variables, o = r.onlyRunForcedResolvers, u = o === void 0 ? !1 : o;
        return we(this, function(c) {
          return n ? [2, this.resolveDocument(n, i.data, a, s, this.fragmentMatcher, u).then(function(f) {
            return y(y({}, i), { data: f.result });
          })] : [2, i];
        });
      });
    }, t.prototype.setFragmentMatcher = function(e) {
      this.fragmentMatcher = e;
    }, t.prototype.getFragmentMatcher = function() {
      return this.fragmentMatcher;
    }, t.prototype.clientQuery = function(e) {
      return bt(["client"], e) && this.resolvers ? e : null;
    }, t.prototype.serverQuery = function(e) {
      return cs(e);
    }, t.prototype.prepareContext = function(e) {
      var r = this.cache;
      return y(y({}, e), {
        cache: r,
        // Getting an entry's cache key is useful for local state resolvers.
        getCacheKey: function(n) {
          return r.identify(n);
        }
      });
    }, t.prototype.addExportedVariables = function(e) {
      return _e(this, arguments, void 0, function(r, n, i) {
        return n === void 0 && (n = {}), i === void 0 && (i = {}), we(this, function(a) {
          return r ? [2, this.resolveDocument(r, this.buildRootValueFromCache(r, n) || {}, this.prepareContext(i), n).then(function(s) {
            return y(y({}, n), s.exportedVariables);
          })] : [2, y({}, n)];
        });
      });
    }, t.prototype.shouldForceResolvers = function(e) {
      var r = !1;
      return le(e, {
        Directive: {
          enter: function(n) {
            if (n.name.value === "client" && n.arguments && (r = n.arguments.some(function(i) {
              return i.name.value === "always" && i.value.kind === "BooleanValue" && i.value.value === !0;
            }), r))
              return Wt;
          }
        }
      }), r;
    }, t.prototype.buildRootValueFromCache = function(e, r) {
      return this.cache.diff({
        query: zu(e),
        variables: r,
        returnPartialData: !0,
        optimistic: !1
      }).result;
    }, t.prototype.resolveDocument = function(e, r) {
      return _e(this, arguments, void 0, function(n, i, a, s, o, u) {
        var c, f, d, l, h, v, m, g, p, E, b;
        return a === void 0 && (a = {}), s === void 0 && (s = {}), o === void 0 && (o = function() {
          return !0;
        }), u === void 0 && (u = !1), we(this, function(w) {
          return c = st(n), f = at(n), d = nt(f), l = this.collectSelectionsToResolve(c, d), h = c.operation, v = h ? h.charAt(0).toUpperCase() + h.slice(1) : "Query", m = this, g = m.cache, p = m.client, E = {
            fragmentMap: d,
            context: y(y({}, a), { cache: g, client: p }),
            variables: s,
            fragmentMatcher: o,
            defaultOperationType: v,
            exportedVariables: {},
            selectionsToResolve: l,
            onlyRunForcedResolvers: u
          }, b = !1, [2, this.resolveSelectionSet(c.selectionSet, b, i, E).then(function(S) {
            return {
              result: S,
              exportedVariables: E.exportedVariables
            };
          })];
        });
      });
    }, t.prototype.resolveSelectionSet = function(e, r, n, i) {
      return _e(this, void 0, void 0, function() {
        var a, s, o, u, c, f = this;
        return we(this, function(d) {
          return a = i.fragmentMap, s = i.context, o = i.variables, u = [n], c = function(l) {
            return _e(f, void 0, void 0, function() {
              var h, v;
              return we(this, function(m) {
                return !r && !i.selectionsToResolve.has(l) ? [
                  2
                  /*return*/
                ] : Ot(l, o) ? Ie(l) ? [2, this.resolveField(l, r, n, i).then(function(g) {
                  var p;
                  typeof g < "u" && u.push((p = {}, p[ge(l)] = g, p));
                })] : (Du(l) ? h = l : (h = a[l.name.value], k(h, 19, l.name.value)), h && h.typeCondition && (v = h.typeCondition.name.value, i.fragmentMatcher(n, v, s)) ? [2, this.resolveSelectionSet(h.selectionSet, r, n, i).then(function(g) {
                  u.push(g);
                })] : [
                  2
                  /*return*/
                ]) : [
                  2
                  /*return*/
                ];
              });
            });
          }, [2, Promise.all(e.selections.map(c)).then(function() {
            return Kt(u);
          })];
        });
      });
    }, t.prototype.resolveField = function(e, r, n, i) {
      return _e(this, void 0, void 0, function() {
        var a, s, o, u, c, f, d, l, h, v = this;
        return we(this, function(m) {
          return n ? (a = i.variables, s = e.name.value, o = ge(e), u = s !== o, c = n[o] || n[s], f = Promise.resolve(c), (!i.onlyRunForcedResolvers || this.shouldForceResolvers(e)) && (d = n.__typename || i.defaultOperationType, l = this.resolvers && this.resolvers[d], l && (h = l[u ? s : o], h && (f = Promise.resolve(
            // In case the resolve function accesses reactive variables,
            // set cacheSlot to the current cache instance.
            Fn.withValue(this.cache, h, [
              n,
              Gt(e, a),
              i.context,
              { field: e, fragmentMap: i.fragmentMap }
            ])
          )))), [2, f.then(function(g) {
            var p, E;
            if (g === void 0 && (g = c), e.directives && e.directives.forEach(function(w) {
              w.name.value === "export" && w.arguments && w.arguments.forEach(function(S) {
                S.name.value === "as" && S.value.kind === "StringValue" && (i.exportedVariables[S.value.value] = g);
              });
            }), !e.selectionSet || g == null)
              return g;
            var b = (E = (p = e.directives) === null || p === void 0 ? void 0 : p.some(function(w) {
              return w.name.value === "client";
            })) !== null && E !== void 0 ? E : !1;
            if (Array.isArray(g))
              return v.resolveSubSelectedArray(e, r || b, g, i);
            if (e.selectionSet)
              return v.resolveSelectionSet(e.selectionSet, r || b, g, i);
          })]) : [2, null];
        });
      });
    }, t.prototype.resolveSubSelectedArray = function(e, r, n, i) {
      var a = this;
      return Promise.all(n.map(function(s) {
        if (s === null)
          return null;
        if (Array.isArray(s))
          return a.resolveSubSelectedArray(e, r, s, i);
        if (e.selectionSet)
          return a.resolveSelectionSet(e.selectionSet, r, s, i);
      }));
    }, t.prototype.collectSelectionsToResolve = function(e, r) {
      var n = function(s) {
        return !Array.isArray(s);
      }, i = this.selectionsToResolveCache;
      function a(s) {
        if (!i.has(s)) {
          var o = /* @__PURE__ */ new Set();
          i.set(s, o), le(s, {
            Directive: function(u, c, f, d, l) {
              u.name.value === "client" && l.forEach(function(h) {
                n(h) && Kn(h) && o.add(h);
              });
            },
            FragmentSpread: function(u, c, f, d, l) {
              var h = r[u.name.value];
              k(h, 20, u.name.value);
              var v = a(h);
              v.size > 0 && (l.forEach(function(m) {
                n(m) && Kn(m) && o.add(m);
              }), o.add(u), v.forEach(function(m) {
                o.add(m);
              }));
            }
          });
        }
        return i.get(s);
      }
      return a(e);
    }, t;
  }()
), Bi = !1, Bs = (
  /** @class */
  function() {
    function t(e) {
      var r = this, n;
      if (this.resetStoreCallbacks = [], this.clearStoreCallbacks = [], !e.cache)
        throw ie(16);
      var i = e.uri, a = e.credentials, s = e.headers, o = e.cache, u = e.documentTransform, c = e.ssrMode, f = c === void 0 ? !1 : c, d = e.ssrForceFetchDelay, l = d === void 0 ? 0 : d, h = e.connectToDevTools, v = e.queryDeduplication, m = v === void 0 ? !0 : v, g = e.defaultOptions, p = e.defaultContext, E = e.assumeImmutableResults, b = E === void 0 ? o.assumeImmutableResults : E, w = e.resolvers, S = e.typeDefs, O = e.fragmentMatcher, N = e.name, A = e.version, L = e.devtools, j = e.dataMasking, se = e.link;
      se || (se = i ? new bs({ uri: i, credentials: a, headers: s }) : je.empty()), this.link = se, this.cache = o, this.disableNetworkFetches = f || l > 0, this.queryDeduplication = m, this.defaultOptions = g || /* @__PURE__ */ Object.create(null), this.typeDefs = S, this.devtoolsConfig = y(y({}, L), { enabled: (n = L == null ? void 0 : L.enabled) !== null && n !== void 0 ? n : h }), this.devtoolsConfig.enabled === void 0 && (this.devtoolsConfig.enabled = globalThis.__DEV__ !== !1), l && setTimeout(function() {
        return r.disableNetworkFetches = !1;
      }, l), this.watchQuery = this.watchQuery.bind(this), this.query = this.query.bind(this), this.mutate = this.mutate.bind(this), this.watchFragment = this.watchFragment.bind(this), this.resetStore = this.resetStore.bind(this), this.reFetchObservableQueries = this.reFetchObservableQueries.bind(this), this.version = gn, this.localState = new mf({
        cache: o,
        client: this,
        resolvers: w,
        fragmentMatcher: O
      }), this.queryManager = new vf({
        cache: this.cache,
        link: this.link,
        defaultOptions: this.defaultOptions,
        defaultContext: p,
        documentTransform: u,
        queryDeduplication: m,
        ssrMode: f,
        dataMasking: !!j,
        clientAwareness: {
          name: N,
          version: A
        },
        localState: this.localState,
        assumeImmutableResults: b,
        onBroadcast: this.devtoolsConfig.enabled ? function() {
          r.devToolsHookCb && r.devToolsHookCb({
            action: {},
            state: {
              queries: r.queryManager.getQueryStore(),
              mutations: r.queryManager.mutationStore || {}
            },
            dataWithOptimisticResults: r.cache.extract(!0)
          });
        } : void 0
      }), this.devtoolsConfig.enabled && this.connectToDevTools();
    }
    return t.prototype.connectToDevTools = function() {
      if (!(typeof window > "u")) {
        var e = window, r = Symbol.for("apollo.devtools");
        (e[r] = e[r] || []).push(this), e.__APOLLO_CLIENT__ = this, !Bi && globalThis.__DEV__ !== !1 && (Bi = !0, window.document && window.top === window.self && /^(https?|file):$/.test(window.location.protocol) && setTimeout(function() {
          if (!window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__) {
            var n = window.navigator, i = n && n.userAgent, a = void 0;
            typeof i == "string" && (i.indexOf("Chrome/") > -1 ? a = "https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm" : i.indexOf("Firefox/") > -1 && (a = "https://addons.mozilla.org/en-US/firefox/addon/apollo-developer-tools/")), a && globalThis.__DEV__ !== !1 && k.log("Download the Apollo DevTools for a better development experience: %s", a);
          }
        }, 1e4));
      }
    }, Object.defineProperty(t.prototype, "documentTransform", {
      /**
       * The `DocumentTransform` used to modify GraphQL documents before a request
       * is made. If a custom `DocumentTransform` is not provided, this will be the
       * default document transform.
       */
      get: function() {
        return this.queryManager.documentTransform;
      },
      enumerable: !1,
      configurable: !0
    }), t.prototype.stop = function() {
      this.queryManager.stop();
    }, t.prototype.watchQuery = function(e) {
      return this.defaultOptions.watchQuery && (e = sr(this.defaultOptions.watchQuery, e)), this.disableNetworkFetches && (e.fetchPolicy === "network-only" || e.fetchPolicy === "cache-and-network") && (e = y(y({}, e), { fetchPolicy: "cache-first" })), this.queryManager.watchQuery(e);
    }, t.prototype.query = function(e) {
      return this.defaultOptions.query && (e = sr(this.defaultOptions.query, e)), k(e.fetchPolicy !== "cache-and-network", 17), this.disableNetworkFetches && e.fetchPolicy === "network-only" && (e = y(y({}, e), { fetchPolicy: "cache-first" })), this.queryManager.query(e);
    }, t.prototype.mutate = function(e) {
      return this.defaultOptions.mutate && (e = sr(this.defaultOptions.mutate, e)), this.queryManager.mutate(e);
    }, t.prototype.subscribe = function(e) {
      var r = this, n = this.queryManager.generateQueryId();
      return this.queryManager.startGraphQLSubscription(e).map(function(i) {
        return y(y({}, i), { data: r.queryManager.maskOperation({
          document: e.query,
          data: i.data,
          fetchPolicy: e.fetchPolicy,
          id: n
        }) });
      });
    }, t.prototype.readQuery = function(e, r) {
      return r === void 0 && (r = !1), this.cache.readQuery(e, r);
    }, t.prototype.watchFragment = function(e) {
      var r;
      return this.cache.watchFragment(y(y({}, e), (r = {}, r[Symbol.for("apollo.dataMasking")] = this.queryManager.dataMasking, r)));
    }, t.prototype.readFragment = function(e, r) {
      return r === void 0 && (r = !1), this.cache.readFragment(e, r);
    }, t.prototype.writeQuery = function(e) {
      var r = this.cache.writeQuery(e);
      return e.broadcast !== !1 && this.queryManager.broadcastQueries(), r;
    }, t.prototype.writeFragment = function(e) {
      var r = this.cache.writeFragment(e);
      return e.broadcast !== !1 && this.queryManager.broadcastQueries(), r;
    }, t.prototype.__actionHookForDevTools = function(e) {
      this.devToolsHookCb = e;
    }, t.prototype.__requestRaw = function(e) {
      return an(this.link, e);
    }, t.prototype.resetStore = function() {
      var e = this;
      return Promise.resolve().then(function() {
        return e.queryManager.clearStore({
          discardWatches: !1
        });
      }).then(function() {
        return Promise.all(e.resetStoreCallbacks.map(function(r) {
          return r();
        }));
      }).then(function() {
        return e.reFetchObservableQueries();
      });
    }, t.prototype.clearStore = function() {
      var e = this;
      return Promise.resolve().then(function() {
        return e.queryManager.clearStore({
          discardWatches: !0
        });
      }).then(function() {
        return Promise.all(e.clearStoreCallbacks.map(function(r) {
          return r();
        }));
      });
    }, t.prototype.onResetStore = function(e) {
      var r = this;
      return this.resetStoreCallbacks.push(e), function() {
        r.resetStoreCallbacks = r.resetStoreCallbacks.filter(function(n) {
          return n !== e;
        });
      };
    }, t.prototype.onClearStore = function(e) {
      var r = this;
      return this.clearStoreCallbacks.push(e), function() {
        r.clearStoreCallbacks = r.clearStoreCallbacks.filter(function(n) {
          return n !== e;
        });
      };
    }, t.prototype.reFetchObservableQueries = function(e) {
      return this.queryManager.reFetchObservableQueries(e);
    }, t.prototype.refetchQueries = function(e) {
      var r = this.queryManager.refetchQueries(e), n = [], i = [];
      r.forEach(function(s, o) {
        n.push(o), i.push(s);
      });
      var a = Promise.all(i);
      return a.queries = n, a.results = i, a.catch(function(s) {
        globalThis.__DEV__ !== !1 && k.debug(18, s);
      }), a;
    }, t.prototype.getObservableQueries = function(e) {
      return e === void 0 && (e = "active"), this.queryManager.getObservableQueries(e);
    }, t.prototype.extract = function(e) {
      return this.cache.extract(e);
    }, t.prototype.restore = function(e) {
      return this.cache.restore(e);
    }, t.prototype.addResolvers = function(e) {
      this.localState.addResolvers(e);
    }, t.prototype.setResolvers = function(e) {
      this.localState.setResolvers(e);
    }, t.prototype.getResolvers = function() {
      return this.localState.getResolvers();
    }, t.prototype.setLocalStateFragmentMatcher = function(e) {
      this.localState.setFragmentMatcher(e);
    }, t.prototype.setLink = function(e) {
      this.link = this.queryManager.link = e;
    }, Object.defineProperty(t.prototype, "defaultContext", {
      get: function() {
        return this.queryManager.defaultContext;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }()
);
globalThis.__DEV__ !== !1 && (Bs.prototype.getMemoryInternals = uu);
function gf(t) {
  return W(t) && "code" in t && "reason" in t;
}
function bf(t) {
  var e;
  return W(t) && ((e = t.target) === null || e === void 0 ? void 0 : e.readyState) === WebSocket.CLOSED;
}
var Ef = (
  /** @class */
  function(t) {
    he(e, t);
    function e(r) {
      var n = t.call(this) || this;
      return n.client = r, n;
    }
    return e.prototype.request = function(r) {
      var n = this;
      return new B(function(i) {
        return n.client.subscribe(y(y({}, r), { query: Tt(r.query) }), {
          next: i.next.bind(i),
          complete: i.complete.bind(i),
          error: function(a) {
            if (a instanceof Error)
              return i.error(a);
            var s = gf(a);
            return s || bf(a) ? i.error(
              // reason will be available on clean closes
              new Error("Socket closed".concat(s ? " with event ".concat(a.code) : "").concat(s ? " ".concat(a.reason) : ""))
            ) : i.error(new Oe({
              graphQLErrors: Array.isArray(a) ? a : [a]
            }));
          }
          // casting around a wrong type in graphql-ws, which incorrectly expects `Sink<ExecutionResult>`
        });
      });
    }, e;
  }(je)
), pr, Qi;
function pn() {
  if (Qi) return pr;
  Qi = 1;
  class t extends Error {
    constructor(r, ...n) {
      super(`env-var: ${r}`, ...n), Error.captureStackTrace && Error.captureStackTrace(this, t), this.name = "EnvVarError";
    }
  }
  return pr = t, pr;
}
var yr, zi;
function It() {
  return zi || (zi = 1, yr = function(e) {
    return e;
  }), yr;
}
var vr, Wi;
function _f() {
  if (Wi) return vr;
  Wi = 1;
  const t = It();
  return vr = function(r, n) {
    return n = n || ",", r.length ? t(r).split(n).filter(Boolean) : [];
  }, vr;
}
var mr, $i;
function wf() {
  return $i || ($i = 1, mr = function(e) {
    const r = e.toLowerCase();
    if (r !== "false" && r !== "true")
      throw new Error('should be either "true", "false", "TRUE", or "FALSE"');
    return r !== "false";
  }), mr;
}
var gr, Hi;
function Sf() {
  return Hi || (Hi = 1, gr = function(e) {
    const r = e.toLowerCase();
    if ([
      "false",
      "0",
      "true",
      "1"
    ].indexOf(r) === -1)
      throw new Error('should be either "true", "false", "TRUE", "FALSE", 1, or 0');
    return !(r === "0" || r === "false");
  }), gr;
}
var br, Gi;
function jn() {
  return Gi || (Gi = 1, br = function(e) {
    const r = parseInt(e, 10);
    if (isNaN(r) || r.toString(10) !== e)
      throw new Error("should be a valid integer");
    return r;
  }), br;
}
var Er, Ji;
function Qs() {
  if (Ji) return Er;
  Ji = 1;
  const t = jn();
  return Er = function(r) {
    const n = t(r);
    if (n < 0)
      throw new Error("should be a positive integer");
    return n;
  }, Er;
}
var _r, Yi;
function Of() {
  if (Yi) return _r;
  Yi = 1;
  const t = Qs();
  return _r = function(r) {
    var n = t(r);
    if (n > 65535)
      throw new Error("cannot assign a port number greater than 65535");
    return n;
  }, _r;
}
var wr, Xi;
function Tf() {
  if (Xi) return wr;
  Xi = 1;
  const t = It();
  return wr = function(r, n) {
    const i = t(r);
    if (n.indexOf(i) < 0)
      throw new Error(`should be one of [${n.join(", ")}]`);
    return i;
  }, wr;
}
var Sr, Ki;
function Vn() {
  return Ki || (Ki = 1, Sr = function(e) {
    const r = parseFloat(e);
    if (isNaN(r) || isNaN(e))
      throw new Error("should be a valid float");
    return r;
  }), Sr;
}
var Or, Zi;
function If() {
  if (Zi) return Or;
  Zi = 1;
  const t = Vn();
  return Or = function(r) {
    const n = t(r);
    if (n > 0)
      throw new Error("should be a negative float");
    return n;
  }, Or;
}
var Tr, ea;
function kf() {
  if (ea) return Tr;
  ea = 1;
  const t = Vn();
  return Tr = function(r) {
    const n = t(r);
    if (n < 0)
      throw new Error("should be a positive float");
    return n;
  }, Tr;
}
var Ir, ta;
function Nf() {
  if (ta) return Ir;
  ta = 1;
  const t = jn();
  return Ir = function(r) {
    const n = t(r);
    if (n > 0)
      throw new Error("should be a negative integer");
    return n;
  }, Ir;
}
var kr, ra;
function Un() {
  return ra || (ra = 1, kr = function(e) {
    try {
      return JSON.parse(e);
    } catch {
      throw new Error("should be valid (parseable) JSON");
    }
  }), kr;
}
var Nr, na;
function Df() {
  if (na) return Nr;
  na = 1;
  const t = Un();
  return Nr = function(r) {
    var n = t(r);
    if (!Array.isArray(n))
      throw new Error("should be a parseable JSON Array");
    return n;
  }, Nr;
}
var Dr, ia;
function xf() {
  if (ia) return Dr;
  ia = 1;
  const t = Un();
  return Dr = function(r) {
    var n = t(r);
    if (Array.isArray(n))
      throw new Error("should be a parseable JSON Object");
    return n;
  }, Dr;
}
var xr, aa;
function Af() {
  return aa || (aa = 1, xr = function(e, r) {
    try {
      RegExp(void 0, r);
    } catch {
      throw new Error("invalid regexp flags");
    }
    try {
      return new RegExp(e, r);
    } catch {
      throw new Error("should be a valid regexp");
    }
  }), xr;
}
var Ar, sa;
function zs() {
  if (sa) return Ar;
  sa = 1;
  const t = It();
  return Ar = function(r) {
    const n = t(r);
    try {
      return new URL(n);
    } catch {
      throw new Error("should be a valid URL");
    }
  }, Ar;
}
var Rr, oa;
function Rf() {
  if (oa) return Rr;
  oa = 1;
  const t = zs();
  return Rr = function(r) {
    return t(r).toString();
  }, Rr;
}
var Cr, ua;
function Cf() {
  if (ua) return Cr;
  ua = 1;
  const t = It(), e = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\u0001-\u0008\u000b\u000c\u000e-\u001f\u0021\u0023-\u005b\u005d-\u007f]|\\[\u0001-\u0009\u000b\u000c\u000e-\u007f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\u0001-\u0008\u000b\u000c\u000e-\u001f\u0021-\u005a\u0053-\u007f]|\\[\u0001-\u0009\u000b\u000c\u000e-\u007f])+)\])$/;
  return Cr = function(n) {
    const i = t(n);
    if (!e.test(i))
      throw new Error("should be a valid email address");
    return i;
  }, Cr;
}
var Pr, ca;
function Ws() {
  return ca || (ca = 1, Pr = {
    asArray: _f(),
    asBoolStrict: wf(),
    asBool: Sf(),
    asPortNumber: Of(),
    asEnum: Tf(),
    asFloatNegative: If(),
    asFloatPositive: kf(),
    asFloat: Vn(),
    asIntNegative: Nf(),
    asIntPositive: Qs(),
    asInt: jn(),
    asJsonArray: Df(),
    asJsonObject: xf(),
    asJson: Un(),
    asRegExp: Af(),
    asString: It(),
    asUrlObject: zs(),
    asUrlString: Rf(),
    asEmailString: Cf()
  }), Pr;
}
var Fr, fa;
function Pf() {
  if (fa) return Fr;
  fa = 1;
  const t = pn(), e = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
  return Fr = function(n, i, a, s) {
    let o = !1, u = !1, c, f;
    const d = Ws();
    function l(g) {
      s(i, g);
    }
    function h(g, p) {
      let E = `"${i}" ${p}`;
      throw g && (E = `${E}`), f && (E = `${E}. An example of a valid value would be: ${f}`), new t(E);
    }
    function v(g) {
      return function() {
        let p = n[i];
        if (l(`will be read from the environment using "${g.name}" accessor`), typeof p > "u")
          if (typeof c > "u" && u)
            l("was not found in the environment, but is required to be set"), h(void 0, "is a required variable, but it was not set");
          else if (typeof c < "u")
            l(`was not found in the environment, parsing default value "${c}" instead`), p = c;
          else {
            l("was not found in the environment, but is not required. returning undefined");
            return;
          }
        u && (l("verifying variable value is not an empty string"), p.trim().length === 0 && h(void 0, "is a required variable, but its value was empty")), o && (l("verifying variable is a valid base64 string"), p.match(e) || h(p, "should be a valid base64 string if using convertFromBase64"), l("converting from base64 to utf8 string"), p = Buffer.from(p, "base64").toString());
        const E = [p].concat(Array.prototype.slice.call(arguments));
        try {
          l(`passing value "${p}" to "${g.name}" accessor`);
          const b = g.apply(
            g,
            E
          );
          return l(`parsed successfully, returning ${b}`), b;
        } catch (b) {
          h(p, b.message);
        }
      };
    }
    const m = {
      /**
       * Instructs env-var to first convert the value of the variable from base64
       * when reading it using a function such as asString()
       */
      convertFromBase64: function() {
        return l("marking for base64 conversion"), o = !0, m;
      },
      /**
       * Set a default value for the variable
       * @param {String} value
       */
      default: function(g) {
        if (typeof g == "number")
          c = g.toString();
        else if (Array.isArray(g) || typeof g == "object" && g !== null)
          c = JSON.stringify(g);
        else {
          if (typeof g != "string")
            throw new t("values passed to default() must be of Number, String, Array, or Object type");
          c = g;
        }
        return l(`setting default value to "${c}"`), m;
      },
      /**
       * Ensures a variable is set in the given environment container. Throws an
       * EnvVarError if the variable is not set or a default is not provided
       * @param {Boolean} required
       */
      required: function(g) {
        return typeof g > "u" ? (l("marked as required"), u = !0) : (l(`setting required flag to ${g}`), u = g), m;
      },
      /**
       * Set an example value for this variable. If the variable value is not set
       * or is set to an invalid value this example will be show in error output.
       * @param {String} example
       */
      example: function(g) {
        return f = g, m;
      }
    };
    return Object.entries({
      ...d,
      ...a
    }).forEach(([g, p]) => {
      m[g] = v(p);
    }), m;
  }, Fr;
}
var Lr, la;
function Ff() {
  return la || (la = 1, Lr = function(e, r) {
    return function(i, a) {
      (!r || !r.match(/prod|production/)) && e(`env-var (${i}): ${a}`);
    };
  }), Lr;
}
var Mr, ha;
function Lf() {
  if (ha) return Mr;
  ha = 1;
  const t = Pf(), e = pn(), r = (i, a, s) => ({
    from: r,
    /**
     * This is the Error class used to generate exceptions. Can be used to identify
     * exceptions and handle them appropriately.
     */
    EnvVarError: pn(),
    /**
     * Returns a variable instance with helper functions, or process.env
     * @param  {String} variableName Name of the environment variable requested
     * @return {Object}
     */
    get: function(o) {
      if (!o)
        return i;
      if (arguments.length > 1)
        throw new e("It looks like you passed more than one argument to env.get(). Since env-var@6.0.0 this is no longer supported. To set a default value use env.get(TARGET).default(DEFAULT)");
      return t(i, o, a || {}, s || function() {
      });
    },
    /**
     * Provides access to the functions that env-var uses to parse
     * process.env strings into valid types requested by the API
     */
    accessors: Ws(),
    /**
     * Provides a default logger that can be used to print logs.
     * This will not print logs in a production environment (checks process.env.NODE_ENV)
     */
    logger: Ff()(console.log, i.NODE_ENV)
  });
  function n() {
    try {
      return process.env;
    } catch {
      return {};
    }
  }
  return Mr = r(n()), Mr;
}
var Mf = Lf();
const z = Mf.from({
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
class qf {
  constructor(e) {
    D(this, "_audience");
    D(this, "_auth0Domain");
    D(this, "_clientId");
    D(this, "_clientSecret");
    D(this, "_e2eUsername");
    D(this, "_e2ePassword");
    D(this, "_issuerBaseUrl");
    D(this, "_secret");
    D(this, "_sessionAutoSave");
    this.endpoint = e;
  }
  get audience() {
    return this._audience ?? (this._audience = new URL(
      "api/v2/",
      this.issuerBaseUrl
    ).toString());
  }
  get domain() {
    return this._auth0Domain ?? (this._auth0Domain = z.get("AUTH0_DOMAIN").required().asString());
  }
  get clientId() {
    return this._clientId ?? (this._clientId = z.get("AUTH0_CLIENT_ID").required().asString());
  }
  get clientSecret() {
    return this._clientSecret ?? (this._clientSecret = z.get("AUTH0_CLIENT_SECRET").required().asString());
  }
  get auth0Username() {
    return this._e2eUsername ?? (this._e2eUsername = z.get("AUTH0_E2E_USERNAME").required().asString());
  }
  get auth0Password() {
    return this._e2ePassword ?? (this._e2ePassword = z.get("AUTH0_E2E_PASSWORD").required().asString());
  }
  get issuerBaseUrl() {
    const e = new URL("/", `https://${this.domain}`).toString();
    return this._issuerBaseUrl ?? (this._issuerBaseUrl = e);
  }
  get secret() {
    return this._secret ?? (this._secret = z.get("AUTH0_SECRET").required().asString());
  }
  get sessionAutoSave() {
    return this._sessionAutoSave ?? (this._sessionAutoSave = z.get("AUTH0_SESSION_AUTO_SAVE").required().asBool());
  }
  get baseUrl() {
    return this.endpoint.webHost;
  }
}
class jf {
  constructor() {
    // Vercel uses '1'
    // Others may use 'true'
    D(this, "_ci");
    D(this, "_circleCi");
  }
  get ci() {
    return this._ci ?? (this._ci = z.get("CI").default("false").asBool());
  }
  get circleCi() {
    return this._circleCi ?? (this._circleCi = z.get("CIRCLE").default("false").asBool());
  }
}
class Vf {
  constructor() {
    D(this, "_apiHost");
    D(this, "_webHost");
  }
  get admin() {
    const e = `${this.baseApiPath}/admin/export`, r = `${this.baseApiPath}/admin/import`, n = `${this.baseApiPath}/admin/reset-database`, i = `${this.baseApiPath}/admin/setup-dev`;
    return {
      export: new URL(e, this.apiUrl).toString(),
      import: new URL(r, this.apiUrl).toString(),
      resetDatabase: new URL(n, this.apiUrl).toString(),
      setupDev: new URL(i, this.apiUrl).toString()
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
    const e = z.get("NEXT_PUBLIC_API_PORT").required().asPortNumber(), r = z.get("NEXT_PUBLIC_API_HOSTNAME").required().asUrlObject();
    return this._apiHost = new URL(`${r.origin}:${e}`).toString();
  }
  get apiUrl() {
    return new URL(this.baseApiPath, this.webHost).toString();
  }
  get app() {
    const e = `${this.baseApiPath}/app/export`, r = `${this.baseApiPath}/app/import`;
    return {
      export: new URL(e, this.webHost).toString(),
      import: new URL(r, this.webHost).toString()
    };
  }
  get baseApiPath() {
    return z.get("NEXT_PUBLIC_BASE_API_PATH").required().asString();
  }
  /**
   * URL is protocol + origin
   */
  get canActivateUrl() {
    return new URL(`${this.baseApiPath}/can-activate`, this.webHost).toString();
  }
  get component() {
    const e = `${this.baseApiPath}/component/export`, r = `${this.baseApiPath}/component/import`;
    return {
      export: new URL(e, this.webHost).toString(),
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
    const e = `${this.baseApiPath}/user/save`;
    return {
      save: new URL(e, this.apiUrl).toString()
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
    return this._webHost ?? (this._webHost = z.get("NEXT_PUBLIC_WEB_HOST").required().asString());
  }
}
class Uf {
  constructor() {
    D(this, "id");
    this.id = z.get("NEXT_PUBLIC_GOOGLE_ANALYTICS").default("").asString();
  }
}
class Bf {
  constructor() {
    D(this, "id");
    D(this, "version");
    this.id = z.get("NEXT_PUBLIC_HOTJAR_ID").default("0").asInt(), this.version = z.get("NEXT_PUBLIC_HOTJAR_VERSION").default("0").asInt();
  }
}
class Qf {
  constructor() {
    D(this, "appId");
    this.appId = z.get("NEXT_PUBLIC_INTERCOM_APP_ID").default("").asString();
  }
}
class zf {
  constructor() {
    D(this, "apiKey");
    D(this, "listId");
    D(this, "serverPrefix");
    this.apiKey = z.get("MAILCHIMP_API_KEY").required().asString(), this.listId = z.get("MAILCHIMP_LIST_ID").required().asString(), this.serverPrefix = z.get("MAILCHIMP_SERVER_PREFIX").required().asString();
  }
}
class Wf {
  constructor() {
    D(this, "_password");
    D(this, "_uri");
    D(this, "_user");
  }
  get password() {
    return this._password ?? (this._password = z.get("NEO4J_PASSWORD").required().asString());
  }
  get uri() {
    return this._uri ?? (this._uri = z.get("NEO4J_URI").required().asUrlString());
  }
  get user() {
    return this._user ?? (this._user = z.get("NEO4J_USER").required().asString());
  }
}
class $f {
  constructor() {
    D(this, "_nodeEnv");
  }
  get isCi() {
    return z.get("CI").default("false").asBool();
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
    return this._nodeEnv ?? (this._nodeEnv = z.get("NODE_ENV").default("development").asEnum(["development", "production", "test"]));
  }
}
class Hf {
  constructor() {
    D(this, "key");
    D(this, "url");
    this.key = process.env.NEXT_PUBLIC_SUPABASE_KEY || "", this.url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  }
}
const Pe = class Pe {
  constructor() {
    D(this, "_auth0");
    D(this, "_circleci");
    D(this, "_endpoint");
    D(this, "_googleAnalytics");
    D(this, "_hotjar");
    D(this, "_intercom");
    D(this, "_mailchimp");
    D(this, "_neo4j");
    D(this, "_node");
    D(this, "_supabase");
  }
  static getInstance() {
    return Pe.instance || (Pe.instance = new Pe()), Pe.instance;
  }
  get auth0() {
    return this._auth0 ?? (this._auth0 = new qf(this.endpoint));
  }
  get circleci() {
    return this._circleci ?? (this._circleci = new jf());
  }
  get endpoint() {
    return this._endpoint ?? (this._endpoint = new Vf());
  }
  get googleAnalytics() {
    return this._googleAnalytics ?? (this._googleAnalytics = new Uf());
  }
  get hotjar() {
    return this._hotjar ?? (this._hotjar = new Bf());
  }
  get intercom() {
    return this._intercom ?? (this._intercom = new Qf());
  }
  get mailchimp() {
    return this._mailchimp ?? (this._mailchimp = new zf());
  }
  get neo4j() {
    return this._neo4j ?? (this._neo4j = new Wf());
  }
  get node() {
    return this._node ?? (this._node = new $f());
  }
  get supabase() {
    return this._supabase ?? (this._supabase = new Hf());
  }
};
D(Pe, "instance");
let yn = Pe;
const Gf = () => yn.getInstance();
function ae(t) {
  return t === null ? "null" : Array.isArray(t) ? "array" : typeof t;
}
function Re(t) {
  return ae(t) === "object";
}
function Jf(t) {
  return Array.isArray(t) && // must be at least one error
  t.length > 0 && // error has at least a message
  t.every((e) => "message" in e);
}
function da(t, e) {
  return t.length < 124 ? t : e;
}
const Yf = "graphql-transport-ws";
var oe;
(function(t) {
  t[t.InternalServerError = 4500] = "InternalServerError", t[t.InternalClientError = 4005] = "InternalClientError", t[t.BadRequest = 4400] = "BadRequest", t[t.BadResponse = 4004] = "BadResponse", t[t.Unauthorized = 4401] = "Unauthorized", t[t.Forbidden = 4403] = "Forbidden", t[t.SubprotocolNotAcceptable = 4406] = "SubprotocolNotAcceptable", t[t.ConnectionInitialisationTimeout = 4408] = "ConnectionInitialisationTimeout", t[t.ConnectionAcknowledgementTimeout = 4504] = "ConnectionAcknowledgementTimeout", t[t.SubscriberAlreadyExists = 4409] = "SubscriberAlreadyExists", t[t.TooManyInitialisationRequests = 4429] = "TooManyInitialisationRequests";
})(oe || (oe = {}));
var H;
(function(t) {
  t.ConnectionInit = "connection_init", t.ConnectionAck = "connection_ack", t.Ping = "ping", t.Pong = "pong", t.Subscribe = "subscribe", t.Next = "next", t.Error = "error", t.Complete = "complete";
})(H || (H = {}));
function $s(t) {
  if (!Re(t))
    throw new Error(`Message is expected to be an object, but got ${ae(t)}`);
  if (!t.type)
    throw new Error("Message is missing the 'type' property");
  if (typeof t.type != "string")
    throw new Error(`Message is expects the 'type' property to be a string, but got ${ae(t.type)}`);
  switch (t.type) {
    case H.ConnectionInit:
    case H.ConnectionAck:
    case H.Ping:
    case H.Pong: {
      if (t.payload != null && !Re(t.payload))
        throw new Error(`"${t.type}" message expects the 'payload' property to be an object or nullish or missing, but got "${t.payload}"`);
      break;
    }
    case H.Subscribe: {
      if (typeof t.id != "string")
        throw new Error(`"${t.type}" message expects the 'id' property to be a string, but got ${ae(t.id)}`);
      if (!t.id)
        throw new Error(`"${t.type}" message requires a non-empty 'id' property`);
      if (!Re(t.payload))
        throw new Error(`"${t.type}" message expects the 'payload' property to be an object, but got ${ae(t.payload)}`);
      if (typeof t.payload.query != "string")
        throw new Error(`"${t.type}" message payload expects the 'query' property to be a string, but got ${ae(t.payload.query)}`);
      if (t.payload.variables != null && !Re(t.payload.variables))
        throw new Error(`"${t.type}" message payload expects the 'variables' property to be a an object or nullish or missing, but got ${ae(t.payload.variables)}`);
      if (t.payload.operationName != null && ae(t.payload.operationName) !== "string")
        throw new Error(`"${t.type}" message payload expects the 'operationName' property to be a string or nullish or missing, but got ${ae(t.payload.operationName)}`);
      if (t.payload.extensions != null && !Re(t.payload.extensions))
        throw new Error(`"${t.type}" message payload expects the 'extensions' property to be a an object or nullish or missing, but got ${ae(t.payload.extensions)}`);
      break;
    }
    case H.Next: {
      if (typeof t.id != "string")
        throw new Error(`"${t.type}" message expects the 'id' property to be a string, but got ${ae(t.id)}`);
      if (!t.id)
        throw new Error(`"${t.type}" message requires a non-empty 'id' property`);
      if (!Re(t.payload))
        throw new Error(`"${t.type}" message expects the 'payload' property to be an object, but got ${ae(t.payload)}`);
      break;
    }
    case H.Error: {
      if (typeof t.id != "string")
        throw new Error(`"${t.type}" message expects the 'id' property to be a string, but got ${ae(t.id)}`);
      if (!t.id)
        throw new Error(`"${t.type}" message requires a non-empty 'id' property`);
      if (!Jf(t.payload))
        throw new Error(`"${t.type}" message expects the 'payload' property to be an array of GraphQL errors, but got ${JSON.stringify(t.payload)}`);
      break;
    }
    case H.Complete: {
      if (typeof t.id != "string")
        throw new Error(`"${t.type}" message expects the 'id' property to be a string, but got ${ae(t.id)}`);
      if (!t.id)
        throw new Error(`"${t.type}" message requires a non-empty 'id' property`);
      break;
    }
    default:
      throw new Error(`Invalid message 'type' property "${t.type}"`);
  }
  return t;
}
function Xf(t, e) {
  return $s(typeof t == "string" ? JSON.parse(t, e) : t);
}
function lt(t, e) {
  return $s(t), JSON.stringify(t, e);
}
var Ye = function(t) {
  return this instanceof Ye ? (this.v = t, this) : new Ye(t);
}, Kf = function(t, e, r) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var n = r.apply(t, e || []), i, a = [];
  return i = {}, s("next"), s("throw"), s("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function s(l) {
    n[l] && (i[l] = function(h) {
      return new Promise(function(v, m) {
        a.push([l, h, v, m]) > 1 || o(l, h);
      });
    });
  }
  function o(l, h) {
    try {
      u(n[l](h));
    } catch (v) {
      d(a[0][3], v);
    }
  }
  function u(l) {
    l.value instanceof Ye ? Promise.resolve(l.value.v).then(c, f) : d(a[0][2], l);
  }
  function c(l) {
    o("next", l);
  }
  function f(l) {
    o("throw", l);
  }
  function d(l, h) {
    l(h), a.shift(), a.length && o(a[0][0], a[0][1]);
  }
};
function Zf(t) {
  const {
    url: e,
    connectionParams: r,
    lazy: n = !0,
    onNonLazyError: i = console.error,
    lazyCloseTimeout: a = 0,
    keepAlive: s = 0,
    disablePong: o,
    connectionAckWaitTimeout: u = 0,
    retryAttempts: c = 5,
    retryWait: f = async function(U) {
      let x = 1e3;
      for (let P = 0; P < U; P++)
        x *= 2;
      await new Promise((P) => setTimeout(P, x + // add random timeout from 300ms to 3s
      Math.floor(Math.random() * 2700 + 300)));
    },
    shouldRetry: d = qr,
    isFatalConnectionProblem: l,
    on: h,
    webSocketImpl: v,
    /**
     * Generates a v4 UUID to be used as the ID using `Math`
     * as the random number generator. Supply your own generator
     * in case you need more uniqueness.
     *
     * Reference: https://gist.github.com/jed/982883
     */
    generateID: m = function() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (U) => {
        const x = Math.random() * 16 | 0;
        return (U == "x" ? x : x & 3 | 8).toString(16);
      });
    },
    jsonMessageReplacer: g,
    jsonMessageReviver: p
  } = t;
  let E;
  if (v) {
    if (!tl(v))
      throw new Error("Invalid WebSocket implementation provided");
    E = v;
  } else typeof WebSocket < "u" ? E = WebSocket : typeof global < "u" ? E = global.WebSocket || // @ts-expect-error: Support more browsers
  global.MozWebSocket : typeof window < "u" && (E = window.WebSocket || // @ts-expect-error: Support more browsers
  window.MozWebSocket);
  if (!E)
    throw new Error("WebSocket implementation missing; on Node you can `import WebSocket from 'ws';` and pass `webSocketImpl: WebSocket` to `createClient`");
  const b = E, w = (() => {
    const R = /* @__PURE__ */ (() => {
      const x = {};
      return {
        on(P, C) {
          return x[P] = C, () => {
            delete x[P];
          };
        },
        emit(P) {
          var C;
          "id" in P && ((C = x[P.id]) === null || C === void 0 || C.call(x, P));
        }
      };
    })(), U = {
      connecting: h != null && h.connecting ? [h.connecting] : [],
      opened: h != null && h.opened ? [h.opened] : [],
      connected: h != null && h.connected ? [h.connected] : [],
      ping: h != null && h.ping ? [h.ping] : [],
      pong: h != null && h.pong ? [h.pong] : [],
      message: h != null && h.message ? [R.emit, h.message] : [R.emit],
      closed: h != null && h.closed ? [h.closed] : [],
      error: h != null && h.error ? [h.error] : []
    };
    return {
      onMessage: R.on,
      on(x, P) {
        const C = U[x];
        return C.push(P), () => {
          C.splice(C.indexOf(P), 1);
        };
      },
      emit(x, ...P) {
        for (const C of [...U[x]])
          C(...P);
      }
    };
  })();
  function S(R) {
    const U = [
      // errors are fatal and more critical than close events, throw them first
      w.on("error", (x) => {
        U.forEach((P) => P()), R(x);
      }),
      // closes can be graceful and not fatal, throw them second (if error didnt throw)
      w.on("closed", (x) => {
        U.forEach((P) => P()), R(x);
      })
    ];
  }
  let O, N = 0, A, L = !1, j = 0, se = !1;
  async function pe() {
    clearTimeout(A);
    const [R, U] = await (O ?? (O = new Promise((C, ee) => (async () => {
      if (L) {
        if (await f(j), !N)
          return O = void 0, ee({ code: 1e3, reason: "All Subscriptions Gone" });
        j++;
      }
      w.emit("connecting", L);
      const M = new b(typeof e == "function" ? await e() : e, Yf);
      let ne, ye;
      function xe() {
        isFinite(s) && s > 0 && (clearTimeout(ye), ye = setTimeout(() => {
          M.readyState === b.OPEN && (M.send(lt({ type: H.Ping })), w.emit("ping", !1, void 0));
        }, s));
      }
      S((te) => {
        O = void 0, clearTimeout(ne), clearTimeout(ye), ee(te), te instanceof pa && (M.close(4499, "Terminated"), M.onerror = null, M.onclose = null);
      }), M.onerror = (te) => w.emit("error", te), M.onclose = (te) => w.emit("closed", te), M.onopen = async () => {
        try {
          w.emit("opened", M);
          const te = typeof r == "function" ? await r() : r;
          if (M.readyState !== b.OPEN)
            return;
          M.send(lt(te ? {
            type: H.ConnectionInit,
            payload: te
          } : {
            type: H.ConnectionInit
            // payload is completely absent if not provided
          }, g)), isFinite(u) && u > 0 && (ne = setTimeout(() => {
            M.close(oe.ConnectionAcknowledgementTimeout, "Connection acknowledgement timeout");
          }, u)), xe();
        } catch (te) {
          w.emit("error", te), M.close(oe.InternalClientError, da(te instanceof Error ? te.message : new Error(te).message, "Internal client error"));
        }
      };
      let Ve = !1;
      M.onmessage = ({ data: te }) => {
        try {
          const K = Xf(te, p);
          if (w.emit("message", K), K.type === "ping" || K.type === "pong") {
            w.emit(K.type, !0, K.payload), K.type === "pong" ? xe() : o || (M.send(lt(K.payload ? {
              type: H.Pong,
              payload: K.payload
            } : {
              type: H.Pong
              // payload is completely absent if not provided
            })), w.emit("pong", !1, K.payload));
            return;
          }
          if (Ve)
            return;
          if (K.type !== H.ConnectionAck)
            throw new Error(`First message cannot be of type ${K.type}`);
          clearTimeout(ne), Ve = !0, w.emit("connected", M, K.payload, L), L = !1, j = 0, C([
            M,
            new Promise((_l, Xs) => S(Xs))
          ]);
        } catch (K) {
          M.onmessage = null, w.emit("error", K), M.close(oe.BadResponse, da(K instanceof Error ? K.message : new Error(K).message, "Bad response"));
        }
      };
    })())));
    R.readyState === b.CLOSING && await U;
    let x = () => {
    };
    const P = new Promise((C) => x = C);
    return [
      R,
      x,
      Promise.race([
        // wait for
        P.then(() => {
          if (!N) {
            const C = () => R.close(1e3, "Normal Closure");
            isFinite(a) && a > 0 ? A = setTimeout(() => {
              R.readyState === b.OPEN && C();
            }, a) : C();
          }
        }),
        // or
        U
      ])
    ];
  }
  function G(R) {
    if (qr(R) && (el(R.code) || [
      oe.InternalServerError,
      oe.InternalClientError,
      oe.BadRequest,
      oe.BadResponse,
      oe.Unauthorized,
      // CloseCode.Forbidden, might grant access out after retry
      oe.SubprotocolNotAcceptable,
      // CloseCode.ConnectionInitialisationTimeout, might not time out after retry
      // CloseCode.ConnectionAcknowledgementTimeout, might not time out after retry
      oe.SubscriberAlreadyExists,
      oe.TooManyInitialisationRequests
      // 4499, // Terminated, probably because the socket froze, we want to retry
    ].includes(R.code)))
      throw R;
    if (se)
      return !1;
    if (qr(R) && R.code === 1e3)
      return N > 0;
    if (!c || j >= c || !d(R) || l != null && l(R))
      throw R;
    return L = !0;
  }
  n || (async () => {
    for (N++; ; )
      try {
        const [, , R] = await pe();
        await R;
      } catch (R) {
        try {
          if (!G(R))
            return;
        } catch (U) {
          return i == null ? void 0 : i(U);
        }
      }
  })();
  function ue(R, U) {
    const x = m(R);
    let P = !1, C = !1, ee = () => {
      N--, P = !0;
    };
    return (async () => {
      for (N++; ; )
        try {
          const [M, ne, ye] = await pe();
          if (P)
            return ne();
          const xe = w.onMessage(x, (Ve) => {
            switch (Ve.type) {
              case H.Next: {
                U.next(Ve.payload);
                return;
              }
              case H.Error: {
                C = !0, P = !0, U.error(Ve.payload), ee();
                return;
              }
              case H.Complete: {
                P = !0, ee();
                return;
              }
            }
          });
          M.send(lt({
            id: x,
            type: H.Subscribe,
            payload: R
          }, g)), ee = () => {
            !P && M.readyState === b.OPEN && M.send(lt({
              id: x,
              type: H.Complete
            }, g)), N--, P = !0, ne();
          }, await ye.finally(xe);
          return;
        } catch (M) {
          if (!G(M))
            return;
        }
    })().then(() => {
      C || U.complete();
    }).catch((M) => {
      U.error(M);
    }), () => {
      P || ee();
    };
  }
  return {
    on: w.on,
    subscribe: ue,
    iterate(R) {
      const U = [], x = {
        done: !1,
        error: null,
        resolve: () => {
        }
      }, P = ue(R, {
        next(ee) {
          U.push(ee), x.resolve();
        },
        error(ee) {
          x.done = !0, x.error = ee, x.resolve();
        },
        complete() {
          x.done = !0, x.resolve();
        }
      }), C = function() {
        return Kf(this, arguments, function* () {
          for (; ; ) {
            for (U.length || (yield Ye(new Promise((ne) => x.resolve = ne))); U.length; )
              yield yield Ye(U.shift());
            if (x.error)
              throw x.error;
            if (x.done)
              return yield Ye(void 0);
          }
        });
      }();
      return C.throw = async (ee) => (x.done || (x.done = !0, x.error = ee, x.resolve()), { done: !0, value: void 0 }), C.return = async () => (P(), { done: !0, value: void 0 }), C;
    },
    async dispose() {
      if (se = !0, O) {
        const [R] = await O;
        R.close(1e3, "Normal Closure");
      }
    },
    terminate() {
      O && w.emit("closed", new pa());
    }
  };
}
class pa extends Error {
  constructor() {
    super(...arguments), this.name = "TerminatedCloseEvent", this.message = "4499: Terminated", this.code = 4499, this.reason = "Terminated", this.wasClean = !1;
  }
}
function qr(t) {
  return Re(t) && "code" in t && "reason" in t;
}
function el(t) {
  return [
    1e3,
    1001,
    1006,
    1005,
    1012,
    1013,
    1014
    // Bad Gateway
  ].includes(t) ? !1 : t >= 1e3 && t <= 1999;
}
function tl(t) {
  return typeof t == "function" && "constructor" in t && "CLOSED" in t && "CLOSING" in t && "CONNECTING" in t && "OPEN" in t;
}
var jr, ya;
function rl() {
  return ya || (ya = 1, jr = function() {
    throw new Error(
      "ws does not work in the browser. Browser clients must use the native WebSocket object"
    );
  }), jr;
}
var nl = rl();
const il = /* @__PURE__ */ tc(nl), Hs = ({
  environment: t = "browser"
  /* Browser */
} = {}) => {
  const e = () => z.get("NEXT_PUBLIC_API_PORT").required().asPortNumber(), r = new bs({
    uri: `http://127.0.0.1:${e()}/api/v1/graphql`
  }), n = new Ef(
    Zf({
      url: `ws://127.0.0.1:${e()}/api/v1/graphql`,
      webSocketImpl: t === "node" ? il : void 0
    })
  ), i = pc(
    ({ query: a }) => {
      const s = st(a);
      return s.kind === "OperationDefinition" && s.operation === "subscription";
    },
    n,
    r
  );
  return new Bs({
    cache: new js(),
    link: i
  });
}, Il = () => Hs({
  environment: "node"
  /* Node */
}), kl = () => Hs({
  environment: "browser"
  /* Browser */
});
class Xe extends Error {
  constructor(r, n) {
    const i = `${Xe.extractMessage(r)}: ${JSON.stringify({
      response: r,
      request: n
    })}`;
    super(i);
    D(this, "response");
    D(this, "request");
    Object.setPrototypeOf(this, Xe.prototype), this.response = r, this.request = n, typeof Error.captureStackTrace == "function" && Error.captureStackTrace(this, Xe);
  }
  static extractMessage(r) {
    var n, i;
    return ((i = (n = r.errors) == null ? void 0 : n[0]) == null ? void 0 : i.message) ?? `GraphQL Error (Code: ${String(r.status)})`;
  }
}
const va = (t) => t.toUpperCase(), Vr = (t) => typeof t == "function" ? t() : t, Gs = (t, e) => t.map((r, n) => [r, e[n]]), Ue = (t) => {
  let e = {};
  return t instanceof Headers ? e = al(t) : Array.isArray(t) ? t.forEach(([r, n]) => {
    r && n !== void 0 && (e[r] = n);
  }) : t && (e = t), e;
}, al = (t) => {
  const e = {};
  return t.forEach((r, n) => {
    e[n] = r;
  }), e;
}, sl = (t) => {
  try {
    const e = t();
    return ol(e) ? e.catch((r) => ma(r)) : e;
  } catch (e) {
    return ma(e);
  }
}, ma = (t) => t instanceof Error ? t : new Error(String(t)), ol = (t) => typeof t == "object" && t !== null && "then" in t && typeof t.then == "function" && "catch" in t && typeof t.catch == "function" && "finally" in t && typeof t.finally == "function", Bn = (t) => {
  throw new Error(`Unhandled case: ${String(t)}`);
}, qt = (t) => typeof t == "object" && t !== null && !Array.isArray(t), ul = (t, e) => t.documents ? t : {
  documents: t,
  requestHeaders: e,
  signal: void 0
}, cl = (t, e, r) => t.query ? t : {
  query: t,
  variables: e,
  requestHeaders: r,
  signal: void 0
}, ga = "Accept", vn = "Content-Type", mn = "application/json", Js = "application/graphql-response+json", ba = (t) => t.replace(/([\s,]|#[^\n\r]+)+/g, " ").trim(), fl = (t) => {
  const e = t.toLowerCase();
  return e.includes(Js) || e.includes(mn);
}, Ea = (t) => {
  try {
    if (Array.isArray(t))
      return {
        _tag: "Batch",
        executionResults: t.map(_a)
      };
    if (qt(t))
      return {
        _tag: "Single",
        executionResult: _a(t)
      };
    throw new Error(`Invalid execution result: result is not object or array. 
Got:
${String(t)}`);
  } catch (e) {
    return e;
  }
}, _a = (t) => {
  if (typeof t != "object" || t === null)
    throw new Error("Invalid execution result: result is not object");
  let e, r, n;
  if ("errors" in t) {
    if (!qt(t.errors) && !Array.isArray(t.errors))
      throw new Error("Invalid execution result: errors is not plain object OR array");
    e = t.errors;
  }
  if ("data" in t) {
    if (!qt(t.data) && t.data !== null)
      throw new Error("Invalid execution result: data is not plain object");
    r = t.data;
  }
  if ("extensions" in t) {
    if (!qt(t.extensions))
      throw new Error("Invalid execution result: extensions is not plain object");
    n = t.extensions;
  }
  return {
    data: r,
    errors: e,
    extensions: n
  };
}, ll = (t) => t._tag === "Batch" ? t.executionResults.some(wa) : wa(t.executionResult), wa = (t) => Array.isArray(t.errors) ? t.errors.length > 0 : !!t.errors, Ys = (t) => typeof t == "object" && t !== null && "kind" in t && t.kind === T.OPERATION_DEFINITION, hl = (t) => {
  var n;
  let e;
  const r = t.definitions.filter(Ys);
  return r.length === 1 && (e = (n = r[0].name) == null ? void 0 : n.value), e;
}, dl = (t) => {
  let e = !1;
  const r = t.definitions.filter(Ys);
  return r.length === 1 && (e = r[0].operation === Fe.MUTATION), e;
}, Ur = (t, e) => {
  const r = typeof t == "string" ? t : qa(t);
  let n = !1, i;
  if (e)
    return { expression: r, isMutation: n, operationName: i };
  const a = sl(() => typeof t == "string" ? Po(t) : t);
  return a instanceof Error ? { expression: r, isMutation: n, operationName: i } : (i = hl(a), n = dl(a), { expression: r, operationName: i, isMutation: n });
}, Qn = JSON, Br = async (t) => {
  const e = {
    ...t,
    method: t.request._tag === "Single" ? t.request.document.isMutation ? "POST" : va(t.method ?? "post") : t.request.hasMutations ? "POST" : va(t.method ?? "post"),
    fetchOptions: {
      ...t.fetchOptions,
      errorPolicy: t.fetchOptions.errorPolicy ?? "none"
    }
  }, n = await yl(e.method)(e);
  if (!n.ok)
    return new Xe({ status: n.status, headers: n.headers }, {
      query: t.request._tag === "Single" ? t.request.document.expression : t.request.query,
      variables: t.request.variables
    });
  const i = await pl(n, t.fetchOptions.jsonSerializer ?? Qn);
  if (i instanceof Error)
    throw i;
  const a = {
    status: n.status,
    headers: n.headers
  };
  if (ll(i) && e.fetchOptions.errorPolicy === "none") {
    const s = i._tag === "Batch" ? { ...i.executionResults, ...a } : {
      ...i.executionResult,
      ...a
    };
    return new Xe(s, {
      query: t.request._tag === "Single" ? t.request.document.expression : t.request.query,
      variables: t.request.variables
    });
  }
  switch (i._tag) {
    case "Single":
      return {
        ...a,
        ...Sa(e)(i.executionResult)
      };
    case "Batch":
      return {
        ...a,
        data: i.executionResults.map(Sa(e))
      };
    default:
      Bn(i);
  }
}, Sa = (t) => (e) => ({
  extensions: e.extensions,
  data: e.data,
  errors: t.fetchOptions.errorPolicy === "all" ? e.errors : void 0
}), pl = async (t, e) => {
  const r = t.headers.get(vn), n = await t.text();
  return r && fl(r) ? Ea(e.parse(n)) : Ea(n);
}, yl = (t) => async (e) => {
  const r = new Headers(e.headers);
  let n = null, i;
  r.has(ga) || r.set(ga, [Js, mn].join(", ")), t === "POST" ? (i = (e.fetchOptions.jsonSerializer ?? Qn).stringify(vl(e)), typeof i == "string" && !r.has(vn) && r.set(vn, mn)) : n = ml(e);
  const a = { method: t, headers: r, body: i, ...e.fetchOptions };
  let s = new URL(e.url), o = a;
  if (e.middleware) {
    const c = await Promise.resolve(e.middleware({
      ...a,
      url: e.url,
      operationName: e.request._tag === "Single" ? e.request.document.operationName : void 0,
      variables: e.request.variables
    })), { url: f, ...d } = c;
    s = new URL(f), o = d;
  }
  return n && n.forEach((c, f) => {
    s.searchParams.append(f, c);
  }), await (e.fetch ?? fetch)(s, o);
}, vl = (t) => {
  switch (t.request._tag) {
    case "Single":
      return {
        query: t.request.document.expression,
        variables: t.request.variables,
        operationName: t.request.document.operationName
      };
    case "Batch":
      return Gs(t.request.query, t.request.variables ?? []).map(([e, r]) => ({
        query: e,
        variables: r
      }));
    default:
      throw Bn(t.request);
  }
}, ml = (t) => {
  var n;
  const e = t.fetchOptions.jsonSerializer ?? Qn, r = new URLSearchParams();
  switch (t.request._tag) {
    case "Single":
      return r.append("query", ba(t.request.document.expression)), t.request.variables && r.append("variables", e.stringify(t.request.variables)), t.request.document.operationName && r.append("operationName", t.request.document.operationName), r;
    case "Batch": {
      const i = ((n = t.request.variables) == null ? void 0 : n.map((o) => e.stringify(o))) ?? [], a = t.request.query.map(ba), s = Gs(a, i).map(([o, u]) => ({
        query: o,
        variables: u
      }));
      return r.append("query", e.stringify(s)), r;
    }
    default:
      throw Bn(t.request);
  }
};
class gl {
  constructor(e, r = {}) {
    D(this, "url");
    D(this, "requestConfig");
    /**
     * Send a GraphQL query to the server.
     */
    D(this, "rawRequest", async (...e) => {
      const [r, n, i] = e, a = cl(r, n, i), { headers: s, fetch: o = globalThis.fetch, method: u = "POST", requestMiddleware: c, responseMiddleware: f, excludeOperationName: d, ...l } = this.requestConfig, { url: h } = this;
      a.signal !== void 0 && (l.signal = a.signal);
      const v = Ur(a.query, d), m = await Br({
        url: h,
        request: {
          _tag: "Single",
          document: v,
          variables: a.variables
        },
        headers: {
          ...Ue(Vr(s)),
          ...Ue(a.requestHeaders)
        },
        fetch: o,
        method: u,
        fetchOptions: l,
        middleware: c
      });
      if (f && await f(m, {
        operationName: v.operationName,
        variables: n,
        url: this.url
      }), m instanceof Error)
        throw m;
      return m;
    });
    this.url = e, this.requestConfig = r;
  }
  async request(e, ...r) {
    const [n, i] = r, a = bl(e, n, i), { headers: s, fetch: o = globalThis.fetch, method: u = "POST", requestMiddleware: c, responseMiddleware: f, excludeOperationName: d, ...l } = this.requestConfig, { url: h } = this;
    a.signal !== void 0 && (l.signal = a.signal);
    const v = Ur(a.document, d), m = await Br({
      url: h,
      request: {
        _tag: "Single",
        document: v,
        variables: a.variables
      },
      headers: {
        ...Ue(Vr(s)),
        ...Ue(a.requestHeaders)
      },
      fetch: o,
      method: u,
      fetchOptions: l,
      middleware: c
    });
    if (f && await f(m, {
      operationName: v.operationName,
      variables: a.variables,
      url: this.url
    }), m instanceof Error)
      throw m;
    return m.data;
  }
  async batchRequests(e, r) {
    const n = ul(e, r), { headers: i, excludeOperationName: a, ...s } = this.requestConfig;
    n.signal !== void 0 && (s.signal = n.signal);
    const o = n.documents.map(({ document: l }) => Ur(l, a)), u = o.map(({ expression: l }) => l), c = o.some(({ isMutation: l }) => l), f = n.documents.map(({ variables: l }) => l), d = await Br({
      url: this.url,
      request: {
        _tag: "Batch",
        operationName: void 0,
        query: u,
        hasMutations: c,
        variables: f
      },
      headers: {
        ...Ue(Vr(i)),
        ...Ue(n.requestHeaders)
      },
      fetch: this.requestConfig.fetch ?? globalThis.fetch,
      method: this.requestConfig.method || "POST",
      fetchOptions: s,
      middleware: this.requestConfig.requestMiddleware
    });
    if (this.requestConfig.responseMiddleware && await this.requestConfig.responseMiddleware(d, {
      operationName: void 0,
      variables: f,
      url: this.url
    }), d instanceof Error)
      throw d;
    return d.data;
  }
  setHeaders(e) {
    return this.requestConfig.headers = e, this;
  }
  /**
   * Attach a header to the client. All subsequent requests will have this header.
   */
  setHeader(e, r) {
    const { headers: n } = this.requestConfig;
    return n ? n[e] = r : this.requestConfig.headers = { [e]: r }, this;
  }
  /**
   * Change the client endpoint. All subsequent requests will send to this endpoint.
   */
  setEndpoint(e) {
    return this.url = e, this;
  }
}
const bl = (t, e, r) => t.document ? t : {
  document: t,
  variables: e,
  requestHeaders: r,
  signal: void 0
}, El = Gf().endpoint.apiGraphqlUrl, Nl = new gl(El.toString(), {
  errorPolicy: "all",
  // fetch: async (...args) => {
  //   // Only import node-fetch on the server side
  //   if (typeof window === 'undefined') {
  //     const { nodeFetch } = await import('./node-fetch')
  //     return nodeFetch(...args)
  //   }
  //   // Use native fetch on the client side
  //   return fetch(...args)
  // },
  headers: {
    Connection: "keep-alive",
    "Keep-Alive": "timeout=120, max=1000"
  },
  keepalive: !0,
  responseMiddleware: (t) => {
    t instanceof Error && console.error(t);
  }
});
export {
  kl as browserApolloClient,
  Hs as createApolloClient,
  Nl as graphqlClient,
  Il as nodeApolloClient
};
