var rA = Object.defineProperty;
var iA = (e, n, r) => n in e ? rA(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[n] = r;
var $e = (e, n, r) => iA(e, typeof n != "symbol" ? n + "" : n, r);
import zh from "react";
var oA = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Yh(e) {
  if (e.__esModule) return e;
  var n = e.default;
  if (typeof n == "function") {
    var r = function o() {
      return this instanceof o ? Reflect.construct(n, arguments, this.constructor) : n.apply(this, arguments);
    };
    r.prototype = n.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(e).forEach(function(o) {
    var i = Object.getOwnPropertyDescriptor(e, o);
    Object.defineProperty(r, o, i.get ? i : {
      enumerable: !0,
      get: function() {
        return e[o];
      }
    });
  }), r;
}
var Dc, Yl;
function Up() {
  if (Yl) return Dc;
  Yl = 1;
  class e extends Error {
    constructor(r, ...o) {
      super(`env-var: ${r}`, ...o), Error.captureStackTrace && Error.captureStackTrace(this, e), this.name = "EnvVarError";
    }
  }
  return Dc = e, Dc;
}
var Fc, Jl;
function fa() {
  return Jl || (Jl = 1, Fc = function(n) {
    return n;
  }), Fc;
}
var Uc, Ql;
function aA() {
  if (Ql) return Uc;
  Ql = 1;
  const e = fa();
  return Uc = function(r, o) {
    return o = o || ",", r.length ? e(r).split(o).filter(Boolean) : [];
  }, Uc;
}
var Lc, Zl;
function uA() {
  return Zl || (Zl = 1, Lc = function(n) {
    const r = n.toLowerCase();
    if (r !== "false" && r !== "true")
      throw new Error('should be either "true", "false", "TRUE", or "FALSE"');
    return r !== "false";
  }), Lc;
}
var qc, ey;
function sA() {
  return ey || (ey = 1, qc = function(n) {
    const r = n.toLowerCase();
    if ([
      "false",
      "0",
      "true",
      "1"
    ].indexOf(r) === -1)
      throw new Error('should be either "true", "false", "TRUE", "FALSE", 1, or 0');
    return !(r === "0" || r === "false");
  }), qc;
}
var Kc, ny;
function ef() {
  return ny || (ny = 1, Kc = function(n) {
    const r = parseInt(n, 10);
    if (isNaN(r) || r.toString(10) !== n)
      throw new Error("should be a valid integer");
    return r;
  }), Kc;
}
var Gc, ty;
function Jh() {
  if (ty) return Gc;
  ty = 1;
  const e = ef();
  return Gc = function(r) {
    const o = e(r);
    if (o < 0)
      throw new Error("should be a positive integer");
    return o;
  }, Gc;
}
var Hc, ry;
function cA() {
  if (ry) return Hc;
  ry = 1;
  const e = Jh();
  return Hc = function(r) {
    var o = e(r);
    if (o > 65535)
      throw new Error("cannot assign a port number greater than 65535");
    return o;
  }, Hc;
}
var Vc, iy;
function dA() {
  if (iy) return Vc;
  iy = 1;
  const e = fa();
  return Vc = function(r, o) {
    const i = e(r);
    if (o.indexOf(i) < 0)
      throw new Error(`should be one of [${o.join(", ")}]`);
    return i;
  }, Vc;
}
var Wc, oy;
function nf() {
  return oy || (oy = 1, Wc = function(n) {
    const r = parseFloat(n);
    if (isNaN(r) || isNaN(n))
      throw new Error("should be a valid float");
    return r;
  }), Wc;
}
var kc, ay;
function pA() {
  if (ay) return kc;
  ay = 1;
  const e = nf();
  return kc = function(r) {
    const o = e(r);
    if (o > 0)
      throw new Error("should be a negative float");
    return o;
  }, kc;
}
var Xc, uy;
function fA() {
  if (uy) return Xc;
  uy = 1;
  const e = nf();
  return Xc = function(r) {
    const o = e(r);
    if (o < 0)
      throw new Error("should be a positive float");
    return o;
  }, Xc;
}
var zc, sy;
function lA() {
  if (sy) return zc;
  sy = 1;
  const e = ef();
  return zc = function(r) {
    const o = e(r);
    if (o > 0)
      throw new Error("should be a negative integer");
    return o;
  }, zc;
}
var Yc, cy;
function tf() {
  return cy || (cy = 1, Yc = function(n) {
    try {
      return JSON.parse(n);
    } catch {
      throw new Error("should be valid (parseable) JSON");
    }
  }), Yc;
}
var Jc, dy;
function yA() {
  if (dy) return Jc;
  dy = 1;
  const e = tf();
  return Jc = function(r) {
    var o = e(r);
    if (!Array.isArray(o))
      throw new Error("should be a parseable JSON Array");
    return o;
  }, Jc;
}
var Qc, py;
function mA() {
  if (py) return Qc;
  py = 1;
  const e = tf();
  return Qc = function(r) {
    var o = e(r);
    if (Array.isArray(o))
      throw new Error("should be a parseable JSON Object");
    return o;
  }, Qc;
}
var Zc, fy;
function gA() {
  return fy || (fy = 1, Zc = function(n, r) {
    try {
      RegExp(void 0, r);
    } catch {
      throw new Error("invalid regexp flags");
    }
    try {
      return new RegExp(n, r);
    } catch {
      throw new Error("should be a valid regexp");
    }
  }), Zc;
}
var ed, ly;
function Qh() {
  if (ly) return ed;
  ly = 1;
  const e = fa();
  return ed = function(r) {
    const o = e(r);
    try {
      return new URL(o);
    } catch {
      throw new Error("should be a valid URL");
    }
  }, ed;
}
var nd, yy;
function TA() {
  if (yy) return nd;
  yy = 1;
  const e = Qh();
  return nd = function(r) {
    return e(r).toString();
  }, nd;
}
var td, my;
function _A() {
  if (my) return td;
  my = 1;
  const e = fa(), n = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\u0001-\u0008\u000b\u000c\u000e-\u001f\u0021\u0023-\u005b\u005d-\u007f]|\\[\u0001-\u0009\u000b\u000c\u000e-\u007f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\u0001-\u0008\u000b\u000c\u000e-\u001f\u0021-\u005a\u0053-\u007f]|\\[\u0001-\u0009\u000b\u000c\u000e-\u007f])+)\])$/;
  return td = function(o) {
    const i = e(o);
    if (!n.test(i))
      throw new Error("should be a valid email address");
    return i;
  }, td;
}
var rd, gy;
function Zh() {
  return gy || (gy = 1, rd = {
    asArray: aA(),
    asBoolStrict: uA(),
    asBool: sA(),
    asPortNumber: cA(),
    asEnum: dA(),
    asFloatNegative: pA(),
    asFloatPositive: fA(),
    asFloat: nf(),
    asIntNegative: lA(),
    asIntPositive: Jh(),
    asInt: ef(),
    asJsonArray: yA(),
    asJsonObject: mA(),
    asJson: tf(),
    asRegExp: gA(),
    asString: fa(),
    asUrlObject: Qh(),
    asUrlString: TA(),
    asEmailString: _A()
  }), rd;
}
var id, Ty;
function bA() {
  if (Ty) return id;
  Ty = 1;
  const e = Up(), n = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
  return id = function(o, i, t, a) {
    let u = !1, c = !1, s, p;
    const d = Zh();
    function f(_) {
      a(i, _);
    }
    function T(_, A) {
      let v = `"${i}" ${A}`;
      throw _ && (v = `${v}`), p && (v = `${v}. An example of a valid value would be: ${p}`), new e(v);
    }
    function h(_) {
      return function() {
        let A = o[i];
        if (f(`will be read from the environment using "${_.name}" accessor`), typeof A > "u")
          if (typeof s > "u" && c)
            f("was not found in the environment, but is required to be set"), T(void 0, "is a required variable, but it was not set");
          else if (typeof s < "u")
            f(`was not found in the environment, parsing default value "${s}" instead`), A = s;
          else {
            f("was not found in the environment, but is not required. returning undefined");
            return;
          }
        c && (f("verifying variable value is not an empty string"), A.trim().length === 0 && T(void 0, "is a required variable, but its value was empty")), u && (f("verifying variable is a valid base64 string"), A.match(n) || T(A, "should be a valid base64 string if using convertFromBase64"), f("converting from base64 to utf8 string"), A = Buffer.from(A, "base64").toString());
        const v = [A].concat(Array.prototype.slice.call(arguments));
        try {
          f(`passing value "${A}" to "${_.name}" accessor`);
          const j = _.apply(
            _,
            v
          );
          return f(`parsed successfully, returning ${j}`), j;
        } catch (j) {
          T(A, j.message);
        }
      };
    }
    const I = {
      /**
       * Instructs env-var to first convert the value of the variable from base64
       * when reading it using a function such as asString()
       */
      convertFromBase64: function() {
        return f("marking for base64 conversion"), u = !0, I;
      },
      /**
       * Set a default value for the variable
       * @param {String} value
       */
      default: function(_) {
        if (typeof _ == "number")
          s = _.toString();
        else if (Array.isArray(_) || typeof _ == "object" && _ !== null)
          s = JSON.stringify(_);
        else {
          if (typeof _ != "string")
            throw new e("values passed to default() must be of Number, String, Array, or Object type");
          s = _;
        }
        return f(`setting default value to "${s}"`), I;
      },
      /**
       * Ensures a variable is set in the given environment container. Throws an
       * EnvVarError if the variable is not set or a default is not provided
       * @param {Boolean} required
       */
      required: function(_) {
        return typeof _ > "u" ? (f("marked as required"), c = !0) : (f(`setting required flag to ${_}`), c = _), I;
      },
      /**
       * Set an example value for this variable. If the variable value is not set
       * or is set to an invalid value this example will be show in error output.
       * @param {String} example
       */
      example: function(_) {
        return p = _, I;
      }
    };
    return Object.entries({
      ...d,
      ...t
    }).forEach(([_, A]) => {
      I[_] = h(A);
    }), I;
  }, id;
}
var od, _y;
function hA() {
  return _y || (_y = 1, od = function(n, r) {
    return function(i, t) {
      (!r || !r.match(/prod|production/)) && n(`env-var (${i}): ${t}`);
    };
  }), od;
}
var ad, by;
function IA() {
  if (by) return ad;
  by = 1;
  const e = bA(), n = Up(), r = (i, t, a) => ({
    from: r,
    /**
     * This is the Error class used to generate exceptions. Can be used to identify
     * exceptions and handle them appropriately.
     */
    EnvVarError: Up(),
    /**
     * Returns a variable instance with helper functions, or process.env
     * @param  {String} variableName Name of the environment variable requested
     * @return {Object}
     */
    get: function(u) {
      if (!u)
        return i;
      if (arguments.length > 1)
        throw new n("It looks like you passed more than one argument to env.get(). Since env-var@6.0.0 this is no longer supported. To set a default value use env.get(TARGET).default(DEFAULT)");
      return e(i, u, t || {}, a || function() {
      });
    },
    /**
     * Provides access to the functions that env-var uses to parse
     * process.env strings into valid types requested by the API
     */
    accessors: Zh(),
    /**
     * Provides a default logger that can be used to print logs.
     * This will not print logs in a production environment (checks process.env.NODE_ENV)
     */
    logger: hA()(console.log, i.NODE_ENV)
  });
  function o() {
    try {
      return process.env;
    } catch {
      return {};
    }
  }
  return ad = r(o()), ad;
}
var PA = IA();
const We = PA.from({
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
class OA {
  constructor(n) {
    $e(this, "_audience");
    $e(this, "_auth0Domain");
    $e(this, "_clientId");
    $e(this, "_clientSecret");
    $e(this, "_e2eUsername");
    $e(this, "_e2ePassword");
    $e(this, "_issuerBaseUrl");
    $e(this, "_secret");
    $e(this, "_sessionAutoSave");
    this.endpoint = n;
  }
  get audience() {
    return this._audience ?? (this._audience = new URL(
      "api/v2/",
      this.issuerBaseUrl
    ).toString());
  }
  get domain() {
    return this._auth0Domain ?? (this._auth0Domain = We.get("AUTH0_DOMAIN").required().asString());
  }
  get clientId() {
    return this._clientId ?? (this._clientId = We.get("AUTH0_CLIENT_ID").required().asString());
  }
  get clientSecret() {
    return this._clientSecret ?? (this._clientSecret = We.get("AUTH0_CLIENT_SECRET").required().asString());
  }
  get auth0Username() {
    return this._e2eUsername ?? (this._e2eUsername = We.get("AUTH0_E2E_USERNAME").required().asString());
  }
  get auth0Password() {
    return this._e2ePassword ?? (this._e2ePassword = We.get("AUTH0_E2E_PASSWORD").required().asString());
  }
  get issuerBaseUrl() {
    const n = new URL("/", `https://${this.domain}`).toString();
    return this._issuerBaseUrl ?? (this._issuerBaseUrl = n);
  }
  get secret() {
    return this._secret ?? (this._secret = We.get("AUTH0_SECRET").required().asString());
  }
  get sessionAutoSave() {
    return this._sessionAutoSave ?? (this._sessionAutoSave = We.get("AUTH0_SESSION_AUTO_SAVE").required().asBool());
  }
  get baseUrl() {
    return this.endpoint.webHost;
  }
}
class AA {
  constructor() {
    // Vercel uses '1'
    // Others may use 'true'
    $e(this, "_ci");
    $e(this, "_circleCi");
  }
  get ci() {
    return this._ci ?? (this._ci = We.get("CI").default("false").asBool());
  }
  get circleCi() {
    return this._circleCi ?? (this._circleCi = We.get("CIRCLE").default("false").asBool());
  }
}
class RA {
  constructor() {
    $e(this, "_apiHost");
    $e(this, "_webHost");
  }
  get admin() {
    const n = `${this.baseApiPath}/admin/export`, r = `${this.baseApiPath}/admin/import`, o = `${this.baseApiPath}/admin/reset-database`, i = `${this.baseApiPath}/admin/setup-dev`;
    return {
      export: new URL(n, this.apiUrl).toString(),
      import: new URL(r, this.apiUrl).toString(),
      resetDatabase: new URL(o, this.apiUrl).toString(),
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
    const n = We.get("NEXT_PUBLIC_API_PORT").required().asPortNumber(), r = We.get("NEXT_PUBLIC_API_HOSTNAME").required().asUrlObject();
    return this._apiHost = new URL(`${r.origin}:${n}`).toString();
  }
  get apiUrl() {
    return new URL(this.baseApiPath, this.webHost).toString();
  }
  get app() {
    const n = `${this.baseApiPath}/app/export`, r = `${this.baseApiPath}/app/import`;
    return {
      export: new URL(n, this.webHost).toString(),
      import: new URL(r, this.webHost).toString()
    };
  }
  get baseApiPath() {
    return We.get("NEXT_PUBLIC_BASE_API_PATH").required().asString();
  }
  /**
   * URL is protocol + origin
   */
  get canActivateUrl() {
    return new URL(`${this.baseApiPath}/can-activate`, this.webHost).toString();
  }
  get component() {
    const n = `${this.baseApiPath}/component/export`, r = `${this.baseApiPath}/component/import`;
    return {
      export: new URL(n, this.webHost).toString(),
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
    const n = `${this.baseApiPath}/user/save`;
    return {
      save: new URL(n, this.apiUrl).toString()
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
    return this._webHost ?? (this._webHost = We.get("NEXT_PUBLIC_WEB_HOST").required().asString());
  }
}
class EA {
  constructor() {
    $e(this, "id");
    this.id = We.get("NEXT_PUBLIC_GOOGLE_ANALYTICS").default("").asString();
  }
}
class wA {
  constructor() {
    $e(this, "id");
    $e(this, "version");
    this.id = We.get("NEXT_PUBLIC_HOTJAR_ID").default("0").asInt(), this.version = We.get("NEXT_PUBLIC_HOTJAR_VERSION").default("0").asInt();
  }
}
class SA {
  constructor() {
    $e(this, "appId");
    this.appId = We.get("NEXT_PUBLIC_INTERCOM_APP_ID").default("").asString();
  }
}
class vA {
  constructor() {
    $e(this, "apiKey");
    $e(this, "listId");
    $e(this, "serverPrefix");
    this.apiKey = We.get("MAILCHIMP_API_KEY").required().asString(), this.listId = We.get("MAILCHIMP_LIST_ID").required().asString(), this.serverPrefix = We.get("MAILCHIMP_SERVER_PREFIX").required().asString();
  }
}
class CA {
  constructor() {
    $e(this, "_password");
    $e(this, "_uri");
    $e(this, "_user");
  }
  get password() {
    return this._password ?? (this._password = We.get("NEO4J_PASSWORD").required().asString());
  }
  get uri() {
    return this._uri ?? (this._uri = We.get("NEO4J_URI").required().asUrlString());
  }
  get user() {
    return this._user ?? (this._user = We.get("NEO4J_USER").required().asString());
  }
}
class MA {
  constructor() {
    $e(this, "_nodeEnv");
  }
  get isCi() {
    return We.get("CI").default("false").asBool();
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
    return this._nodeEnv ?? (this._nodeEnv = We.get("NODE_ENV").default("development").asEnum(["development", "production", "test"]));
  }
}
class xA {
  constructor() {
    $e(this, "key");
    $e(this, "url");
    this.key = process.env.NEXT_PUBLIC_SUPABASE_KEY || "", this.url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  }
}
const Di = class Di {
  constructor() {
    $e(this, "_auth0");
    $e(this, "_circleci");
    $e(this, "_endpoint");
    $e(this, "_googleAnalytics");
    $e(this, "_hotjar");
    $e(this, "_intercom");
    $e(this, "_mailchimp");
    $e(this, "_neo4j");
    $e(this, "_node");
    $e(this, "_supabase");
  }
  static getInstance() {
    return Di.instance || (Di.instance = new Di()), Di.instance;
  }
  get auth0() {
    return this._auth0 ?? (this._auth0 = new OA(this.endpoint));
  }
  get circleci() {
    return this._circleci ?? (this._circleci = new AA());
  }
  get endpoint() {
    return this._endpoint ?? (this._endpoint = new RA());
  }
  get googleAnalytics() {
    return this._googleAnalytics ?? (this._googleAnalytics = new EA());
  }
  get hotjar() {
    return this._hotjar ?? (this._hotjar = new wA());
  }
  get intercom() {
    return this._intercom ?? (this._intercom = new SA());
  }
  get mailchimp() {
    return this._mailchimp ?? (this._mailchimp = new vA());
  }
  get neo4j() {
    return this._neo4j ?? (this._neo4j = new CA());
  }
  get node() {
    return this._node ?? (this._node = new MA());
  }
  get supabase() {
    return this._supabase ?? (this._supabase = new xA());
  }
};
$e(Di, "instance");
let Lp = Di;
const $A = () => Lp.getInstance();
function NA(e) {
  return en(e) && !wn(e) && !ya(e) && Symbol.asyncIterator in e;
}
function wn(e) {
  return Array.isArray(e);
}
function eI(e) {
  return typeof e == "bigint";
}
function la(e) {
  return typeof e == "boolean";
}
function rf(e) {
  return e instanceof globalThis.Date;
}
function BA(e) {
  return typeof e == "function";
}
function jA(e) {
  return en(e) && !wn(e) && !ya(e) && Symbol.iterator in e;
}
function DA(e) {
  return e === null;
}
function ht(e) {
  return typeof e == "number";
}
function en(e) {
  return typeof e == "object" && e !== null;
}
function nI(e) {
  return e instanceof globalThis.RegExp;
}
function Je(e) {
  return typeof e == "string";
}
function FA(e) {
  return typeof e == "symbol";
}
function ya(e) {
  return e instanceof globalThis.Uint8Array;
}
function on(e) {
  return e === void 0;
}
function UA(e) {
  return e.map((n) => qs(n));
}
function LA(e) {
  return new Date(e.getTime());
}
function qA(e) {
  return new Uint8Array(e);
}
function KA(e) {
  return new RegExp(e.source, e.flags);
}
function GA(e) {
  const n = {};
  for (const r of Object.getOwnPropertyNames(e))
    n[r] = qs(e[r]);
  for (const r of Object.getOwnPropertySymbols(e))
    n[r] = qs(e[r]);
  return n;
}
function qs(e) {
  return wn(e) ? UA(e) : rf(e) ? LA(e) : ya(e) ? qA(e) : nI(e) ? KA(e) : en(e) ? GA(e) : e;
}
function qn(e) {
  return qs(e);
}
function HA(e, n) {
  return qn(e);
}
function VA(e) {
  return ma(e) && Symbol.asyncIterator in e;
}
function WA(e) {
  return ma(e) && Symbol.iterator in e;
}
function kA(e) {
  return e instanceof Promise;
}
function of(e) {
  return e instanceof Date && Number.isFinite(e.getTime());
}
function XA(e) {
  return e instanceof globalThis.Map;
}
function zA(e) {
  return e instanceof globalThis.Set;
}
function YA(e) {
  return ArrayBuffer.isView(e);
}
function tI(e) {
  return e instanceof globalThis.Uint8Array;
}
function De(e, n) {
  return n in e;
}
function ma(e) {
  return e !== null && typeof e == "object";
}
function ga(e) {
  return Array.isArray(e) && !ArrayBuffer.isView(e);
}
function Ws(e) {
  return e === void 0;
}
function af(e) {
  return e === null;
}
function uf(e) {
  return typeof e == "boolean";
}
function Ui(e) {
  return typeof e == "number";
}
function JA(e) {
  return Number.isInteger(e);
}
function sf(e) {
  return typeof e == "bigint";
}
function Ta(e) {
  return typeof e == "string";
}
function rI(e) {
  return typeof e == "function";
}
function cf(e) {
  return typeof e == "symbol";
}
function QA(e) {
  return sf(e) || uf(e) || af(e) || Ui(e) || Ta(e) || cf(e) || Ws(e);
}
var It;
(function(e) {
  e.InstanceMode = "default", e.ExactOptionalPropertyTypes = !1, e.AllowArrayObject = !1, e.AllowNaN = !1, e.AllowNullVoid = !1;
  function n(a, u) {
    return e.ExactOptionalPropertyTypes ? u in a : a[u] !== void 0;
  }
  e.IsExactOptionalProperty = n;
  function r(a) {
    const u = ma(a);
    return e.AllowArrayObject ? u : u && !ga(a);
  }
  e.IsObjectLike = r;
  function o(a) {
    return r(a) && !(a instanceof Date) && !(a instanceof Uint8Array);
  }
  e.IsRecordLike = o;
  function i(a) {
    return e.AllowNaN ? Ui(a) : Number.isFinite(a);
  }
  e.IsNumberLike = i;
  function t(a) {
    const u = Ws(a);
    return e.AllowNullVoid ? u || a === null : u;
  }
  e.IsVoidLike = t;
})(It || (It = {}));
function ZA(e) {
  return globalThis.Object.freeze(e).map((n) => Ks(n));
}
function eR(e) {
  const n = {};
  for (const r of Object.getOwnPropertyNames(e))
    n[r] = Ks(e[r]);
  for (const r of Object.getOwnPropertySymbols(e))
    n[r] = Ks(e[r]);
  return globalThis.Object.freeze(n);
}
function Ks(e) {
  return wn(e) ? ZA(e) : rf(e) ? e : ya(e) ? e : nI(e) ? e : en(e) ? eR(e) : e;
}
function pe(e, n) {
  const r = n !== void 0 ? { ...n, ...e } : e;
  switch (It.InstanceMode) {
    case "freeze":
      return Ks(r);
    case "clone":
      return qn(r);
    default:
      return r;
  }
}
class Yn extends Error {
  constructor(n) {
    super(n);
  }
}
const tt = Symbol.for("TypeBox.Transform"), _a = Symbol.for("TypeBox.Readonly"), Ot = Symbol.for("TypeBox.Optional"), ks = Symbol.for("TypeBox.Hint"), de = Symbol.for("TypeBox.Kind");
function iI(e) {
  return en(e) && e[_a] === "Readonly";
}
function Gi(e) {
  return en(e) && e[Ot] === "Optional";
}
function oI(e) {
  return Fe(e, "Any");
}
function ba(e) {
  return Fe(e, "Array");
}
function df(e) {
  return Fe(e, "AsyncIterator");
}
function aI(e) {
  return Fe(e, "BigInt");
}
function uI(e) {
  return Fe(e, "Boolean");
}
function Ct(e) {
  return Fe(e, "Computed");
}
function pf(e) {
  return Fe(e, "Constructor");
}
function nR(e) {
  return Fe(e, "Date");
}
function ff(e) {
  return Fe(e, "Function");
}
function Xs(e) {
  return Fe(e, "Integer");
}
function Jn(e) {
  return Fe(e, "Intersect");
}
function lf(e) {
  return Fe(e, "Iterator");
}
function Fe(e, n) {
  return en(e) && de in e && e[de] === n;
}
function sI(e) {
  return la(e) || ht(e) || Je(e);
}
function ha(e) {
  return Fe(e, "Literal");
}
function Hi(e) {
  return Fe(e, "MappedKey");
}
function $n(e) {
  return Fe(e, "MappedResult");
}
function Ia(e) {
  return Fe(e, "Never");
}
function tR(e) {
  return Fe(e, "Not");
}
function rR(e) {
  return Fe(e, "Null");
}
function zs(e) {
  return Fe(e, "Number");
}
function it(e) {
  return Fe(e, "Object");
}
function yf(e) {
  return Fe(e, "Promise");
}
function cI(e) {
  return Fe(e, "Record");
}
function An(e) {
  return Fe(e, "Ref");
}
function dI(e) {
  return Fe(e, "RegExp");
}
function mf(e) {
  return Fe(e, "String");
}
function iR(e) {
  return Fe(e, "Symbol");
}
function Vi(e) {
  return Fe(e, "TemplateLiteral");
}
function oR(e) {
  return Fe(e, "This");
}
function gf(e) {
  return en(e) && tt in e;
}
function bo(e) {
  return Fe(e, "Tuple");
}
function aR(e) {
  return Fe(e, "Undefined");
}
function pn(e) {
  return Fe(e, "Union");
}
function uR(e) {
  return Fe(e, "Uint8Array");
}
function sR(e) {
  return Fe(e, "Unknown");
}
function cR(e) {
  return Fe(e, "Unsafe");
}
function dR(e) {
  return Fe(e, "Void");
}
function pR(e) {
  return en(e) && de in e && Je(e[de]);
}
function bt(e) {
  return oI(e) || ba(e) || uI(e) || aI(e) || df(e) || Ct(e) || pf(e) || nR(e) || ff(e) || Xs(e) || Jn(e) || lf(e) || ha(e) || Hi(e) || $n(e) || Ia(e) || tR(e) || rR(e) || zs(e) || it(e) || yf(e) || cI(e) || An(e) || dI(e) || mf(e) || iR(e) || Vi(e) || oR(e) || bo(e) || aR(e) || pn(e) || uR(e) || sR(e) || cR(e) || dR(e) || pR(e);
}
const fR = [
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
function pI(e) {
  try {
    return new RegExp(e), !0;
  } catch {
    return !1;
  }
}
function Tf(e) {
  if (!Je(e))
    return !1;
  for (let n = 0; n < e.length; n++) {
    const r = e.charCodeAt(n);
    if (r >= 7 && r <= 13 || r === 27 || r === 127)
      return !1;
  }
  return !0;
}
function fI(e) {
  return _f(e) || dn(e);
}
function Do(e) {
  return on(e) || eI(e);
}
function Ve(e) {
  return on(e) || ht(e);
}
function _f(e) {
  return on(e) || la(e);
}
function He(e) {
  return on(e) || Je(e);
}
function lR(e) {
  return on(e) || Je(e) && Tf(e) && pI(e);
}
function yR(e) {
  return on(e) || Je(e) && Tf(e);
}
function lI(e) {
  return on(e) || dn(e);
}
function Gs(e) {
  return en(e) && e[Ot] === "Optional";
}
function Wn(e) {
  return Ue(e, "Any") && He(e.$id);
}
function Wi(e) {
  return Ue(e, "Array") && e.type === "array" && He(e.$id) && dn(e.items) && Ve(e.minItems) && Ve(e.maxItems) && _f(e.uniqueItems) && lI(e.contains) && Ve(e.minContains) && Ve(e.maxContains);
}
function bf(e) {
  return Ue(e, "AsyncIterator") && e.type === "AsyncIterator" && He(e.$id) && dn(e.items);
}
function Ys(e) {
  return Ue(e, "BigInt") && e.type === "bigint" && He(e.$id) && Do(e.exclusiveMaximum) && Do(e.exclusiveMinimum) && Do(e.maximum) && Do(e.minimum) && Do(e.multipleOf);
}
function ki(e) {
  return Ue(e, "Boolean") && e.type === "boolean" && He(e.$id);
}
function mR(e) {
  return Ue(e, "Computed") && Je(e.target) && wn(e.parameters) && e.parameters.every((n) => dn(n));
}
function Js(e) {
  return Ue(e, "Constructor") && e.type === "Constructor" && He(e.$id) && wn(e.parameters) && e.parameters.every((n) => dn(n)) && dn(e.returns);
}
function Qs(e) {
  return Ue(e, "Date") && e.type === "Date" && He(e.$id) && Ve(e.exclusiveMaximumTimestamp) && Ve(e.exclusiveMinimumTimestamp) && Ve(e.maximumTimestamp) && Ve(e.minimumTimestamp) && Ve(e.multipleOfTimestamp);
}
function Zs(e) {
  return Ue(e, "Function") && e.type === "Function" && He(e.$id) && wn(e.parameters) && e.parameters.every((n) => dn(n)) && dn(e.returns);
}
function At(e) {
  return Ue(e, "Integer") && e.type === "integer" && He(e.$id) && Ve(e.exclusiveMaximum) && Ve(e.exclusiveMinimum) && Ve(e.maximum) && Ve(e.minimum) && Ve(e.multipleOf);
}
function yI(e) {
  return en(e) && Object.entries(e).every(([n, r]) => Tf(n) && dn(r));
}
function Xi(e) {
  return Ue(e, "Intersect") && !(Je(e.type) && e.type !== "object") && wn(e.allOf) && e.allOf.every((n) => dn(n) && !IR(n)) && He(e.type) && (_f(e.unevaluatedProperties) || lI(e.unevaluatedProperties)) && He(e.$id);
}
function hf(e) {
  return Ue(e, "Iterator") && e.type === "Iterator" && He(e.$id) && dn(e.items);
}
function Ue(e, n) {
  return en(e) && de in e && e[de] === n;
}
function mI(e) {
  return xt(e) && Je(e.const);
}
function gI(e) {
  return xt(e) && ht(e.const);
}
function TI(e) {
  return xt(e) && la(e.const);
}
function xt(e) {
  return Ue(e, "Literal") && He(e.$id) && gR(e.const);
}
function gR(e) {
  return la(e) || ht(e) || Je(e);
}
function TR(e) {
  return Ue(e, "MappedKey") && wn(e.keys) && e.keys.every((n) => ht(n) || Je(n));
}
function _R(e) {
  return Ue(e, "MappedResult") && yI(e.properties);
}
function $t(e) {
  return Ue(e, "Never") && en(e.not) && Object.getOwnPropertyNames(e.not).length === 0;
}
function fo(e) {
  return Ue(e, "Not") && dn(e.not);
}
function If(e) {
  return Ue(e, "Null") && e.type === "null" && He(e.$id);
}
function On(e) {
  return Ue(e, "Number") && e.type === "number" && He(e.$id) && Ve(e.exclusiveMaximum) && Ve(e.exclusiveMinimum) && Ve(e.maximum) && Ve(e.minimum) && Ve(e.multipleOf);
}
function Xe(e) {
  return Ue(e, "Object") && e.type === "object" && He(e.$id) && yI(e.properties) && fI(e.additionalProperties) && Ve(e.minProperties) && Ve(e.maxProperties);
}
function Pf(e) {
  return Ue(e, "Promise") && e.type === "Promise" && He(e.$id) && dn(e.item);
}
function cn(e) {
  return Ue(e, "Record") && e.type === "object" && He(e.$id) && fI(e.additionalProperties) && en(e.patternProperties) && ((n) => {
    const r = Object.getOwnPropertyNames(n.patternProperties);
    return r.length === 1 && pI(r[0]) && en(n.patternProperties) && dn(n.patternProperties[r[0]]);
  })(e);
}
function bR(e) {
  return Ue(e, "Ref") && He(e.$id) && Je(e.$ref);
}
function ra(e) {
  return Ue(e, "RegExp") && He(e.$id) && Je(e.source) && Je(e.flags) && Ve(e.maxLength) && Ve(e.minLength);
}
function kn(e) {
  return Ue(e, "String") && e.type === "string" && He(e.$id) && Ve(e.minLength) && Ve(e.maxLength) && lR(e.pattern) && yR(e.format);
}
function ia(e) {
  return Ue(e, "Symbol") && e.type === "symbol" && He(e.$id);
}
function oa(e) {
  return Ue(e, "TemplateLiteral") && e.type === "string" && Je(e.pattern) && e.pattern[0] === "^" && e.pattern[e.pattern.length - 1] === "$";
}
function hR(e) {
  return Ue(e, "This") && He(e.$id) && Je(e.$ref);
}
function IR(e) {
  return en(e) && tt in e;
}
function ec(e) {
  return Ue(e, "Tuple") && e.type === "array" && He(e.$id) && ht(e.minItems) && ht(e.maxItems) && e.minItems === e.maxItems && // empty
  (on(e.items) && on(e.additionalItems) && e.minItems === 0 || wn(e.items) && e.items.every((n) => dn(n)));
}
function qi(e) {
  return Ue(e, "Undefined") && e.type === "undefined" && He(e.$id);
}
function Pt(e) {
  return Ue(e, "Union") && He(e.$id) && en(e) && wn(e.anyOf) && e.anyOf.every((n) => dn(n));
}
function Pa(e) {
  return Ue(e, "Uint8Array") && e.type === "Uint8Array" && He(e.$id) && Ve(e.minByteLength) && Ve(e.maxByteLength);
}
function Xn(e) {
  return Ue(e, "Unknown") && He(e.$id);
}
function PR(e) {
  return Ue(e, "Unsafe");
}
function nc(e) {
  return Ue(e, "Void") && e.type === "void" && He(e.$id);
}
function OR(e) {
  return en(e) && de in e && Je(e[de]) && !fR.includes(e[de]);
}
function dn(e) {
  return en(e) && (Wn(e) || Wi(e) || ki(e) || Ys(e) || bf(e) || mR(e) || Js(e) || Qs(e) || Zs(e) || At(e) || Xi(e) || hf(e) || xt(e) || TR(e) || _R(e) || $t(e) || fo(e) || If(e) || On(e) || Xe(e) || Pf(e) || cn(e) || bR(e) || ra(e) || kn(e) || ia(e) || oa(e) || hR(e) || ec(e) || qi(e) || Pt(e) || Pa(e) || Xn(e) || PR(e) || nc(e) || OR(e));
}
const AR = "(true|false)", Us = "(0|[1-9][0-9]*)", _I = "(.*)", RR = "(?!.*)", lo = `^${Us}$`, yo = `^${_I}$`, ER = `^${RR}$`, Of = /* @__PURE__ */ new Map();
function wR(e) {
  return Of.has(e);
}
function SR(e, n) {
  Of.set(e, n);
}
function vR(e) {
  return Of.get(e);
}
const Af = /* @__PURE__ */ new Map();
function tc(e) {
  return Af.has(e);
}
function CR(e, n) {
  Af.set(e, n);
}
function MR(e) {
  return Af.get(e);
}
function xR(e, n) {
  return e.includes(n);
}
function $R(e) {
  return [...new Set(e)];
}
function NR(e, n) {
  return e.filter((r) => n.includes(r));
}
function BR(e, n) {
  return e.reduce((r, o) => NR(r, o), n);
}
function jR(e) {
  return e.length === 1 ? e[0] : e.length > 1 ? BR(e.slice(1), e[0]) : [];
}
function DR(e) {
  const n = [];
  for (const r of e)
    n.push(...r);
  return n;
}
function aa(e) {
  return pe({ [de]: "Any" }, e);
}
function Rf(e, n) {
  return pe({ [de]: "Array", type: "array", items: e }, n);
}
function Ef(e, n) {
  return pe({ [de]: "AsyncIterator", type: "AsyncIterator", items: e }, n);
}
function ke(e, n, r) {
  return pe({ [de]: "Computed", target: e, parameters: n }, r);
}
function FR(e, n) {
  const { [n]: r, ...o } = e;
  return o;
}
function Mn(e, n) {
  return n.reduce((r, o) => FR(r, o), e);
}
function fn(e) {
  return pe({ [de]: "Never", not: {} }, e);
}
function ln(e) {
  return pe({
    [de]: "MappedResult",
    properties: e
  });
}
function wf(e, n, r) {
  return pe({ [de]: "Constructor", type: "Constructor", parameters: e, returns: n }, r);
}
function Oa(e, n, r) {
  return pe({ [de]: "Function", type: "Function", parameters: e, returns: n }, r);
}
function qp(e, n) {
  return pe({ [de]: "Union", anyOf: e }, n);
}
function UR(e) {
  return e.some((n) => Gi(n));
}
function hy(e) {
  return e.map((n) => Gi(n) ? LR(n) : n);
}
function LR(e) {
  return Mn(e, [Ot]);
}
function qR(e, n) {
  return UR(e) ? Yi(qp(hy(e), n)) : qp(hy(e), n);
}
function ho(e, n) {
  return e.length === 1 ? pe(e[0], n) : e.length === 0 ? fn(n) : qR(e, n);
}
function yn(e, n) {
  return e.length === 0 ? fn(n) : e.length === 1 ? pe(e[0], n) : qp(e, n);
}
class Iy extends Yn {
}
function KR(e) {
  return e.replace(/\\\$/g, "$").replace(/\\\*/g, "*").replace(/\\\^/g, "^").replace(/\\\|/g, "|").replace(/\\\(/g, "(").replace(/\\\)/g, ")");
}
function Sf(e, n, r) {
  return e[n] === r && e.charCodeAt(n - 1) !== 92;
}
function _t(e, n) {
  return Sf(e, n, "(");
}
function ua(e, n) {
  return Sf(e, n, ")");
}
function bI(e, n) {
  return Sf(e, n, "|");
}
function GR(e) {
  if (!(_t(e, 0) && ua(e, e.length - 1)))
    return !1;
  let n = 0;
  for (let r = 0; r < e.length; r++)
    if (_t(e, r) && (n += 1), ua(e, r) && (n -= 1), n === 0 && r !== e.length - 1)
      return !1;
  return !0;
}
function HR(e) {
  return e.slice(1, e.length - 1);
}
function VR(e) {
  let n = 0;
  for (let r = 0; r < e.length; r++)
    if (_t(e, r) && (n += 1), ua(e, r) && (n -= 1), bI(e, r) && n === 0)
      return !0;
  return !1;
}
function WR(e) {
  for (let n = 0; n < e.length; n++)
    if (_t(e, n))
      return !0;
  return !1;
}
function kR(e) {
  let [n, r] = [0, 0];
  const o = [];
  for (let t = 0; t < e.length; t++)
    if (_t(e, t) && (n += 1), ua(e, t) && (n -= 1), bI(e, t) && n === 0) {
      const a = e.slice(r, t);
      a.length > 0 && o.push(mo(a)), r = t + 1;
    }
  const i = e.slice(r);
  return i.length > 0 && o.push(mo(i)), o.length === 0 ? { type: "const", const: "" } : o.length === 1 ? o[0] : { type: "or", expr: o };
}
function XR(e) {
  function n(i, t) {
    if (!_t(i, t))
      throw new Iy("TemplateLiteralParser: Index must point to open parens");
    let a = 0;
    for (let u = t; u < i.length; u++)
      if (_t(i, u) && (a += 1), ua(i, u) && (a -= 1), a === 0)
        return [t, u];
    throw new Iy("TemplateLiteralParser: Unclosed group parens in expression");
  }
  function r(i, t) {
    for (let a = t; a < i.length; a++)
      if (_t(i, a))
        return [t, a];
    return [t, i.length];
  }
  const o = [];
  for (let i = 0; i < e.length; i++)
    if (_t(e, i)) {
      const [t, a] = n(e, i), u = e.slice(t, a + 1);
      o.push(mo(u)), i = a;
    } else {
      const [t, a] = r(e, i), u = e.slice(t, a);
      u.length > 0 && o.push(mo(u)), i = a - 1;
    }
  return o.length === 0 ? { type: "const", const: "" } : o.length === 1 ? o[0] : { type: "and", expr: o };
}
function mo(e) {
  return GR(e) ? mo(HR(e)) : VR(e) ? kR(e) : WR(e) ? XR(e) : { type: "const", const: KR(e) };
}
function vf(e) {
  return mo(e.slice(1, e.length - 1));
}
class zR extends Yn {
}
function YR(e) {
  return e.type === "or" && e.expr.length === 2 && e.expr[0].type === "const" && e.expr[0].const === "0" && e.expr[1].type === "const" && e.expr[1].const === "[1-9][0-9]*";
}
function JR(e) {
  return e.type === "or" && e.expr.length === 2 && e.expr[0].type === "const" && e.expr[0].const === "true" && e.expr[1].type === "const" && e.expr[1].const === "false";
}
function QR(e) {
  return e.type === "const" && e.const === ".*";
}
function sa(e) {
  return YR(e) || QR(e) ? !1 : JR(e) ? !0 : e.type === "and" ? e.expr.every((n) => sa(n)) : e.type === "or" ? e.expr.every((n) => sa(n)) : e.type === "const" ? !0 : (() => {
    throw new zR("Unknown expression type");
  })();
}
function hI(e) {
  const n = vf(e.pattern);
  return sa(n);
}
class ZR extends Yn {
}
function* II(e) {
  if (e.length === 1)
    return yield* e[0];
  for (const n of e[0])
    for (const r of II(e.slice(1)))
      yield `${n}${r}`;
}
function* eE(e) {
  return yield* II(e.expr.map((n) => [...rc(n)]));
}
function* nE(e) {
  for (const n of e.expr)
    yield* rc(n);
}
function* tE(e) {
  return yield e.const;
}
function* rc(e) {
  return e.type === "and" ? yield* eE(e) : e.type === "or" ? yield* nE(e) : e.type === "const" ? yield* tE(e) : (() => {
    throw new ZR("Unknown expression");
  })();
}
function Cf(e) {
  const n = vf(e.pattern);
  return sa(n) ? [...rc(n)] : [];
}
function Ze(e, n) {
  return pe({
    [de]: "Literal",
    const: e,
    type: typeof e
  }, n);
}
function PI(e) {
  return pe({ [de]: "Boolean", type: "boolean" }, e);
}
function Mf(e) {
  return pe({ [de]: "BigInt", type: "bigint" }, e);
}
function Io(e) {
  return pe({ [de]: "Number", type: "number" }, e);
}
function ca(e) {
  return pe({ [de]: "String", type: "string" }, e);
}
function* rE(e) {
  const n = e.trim().replace(/"|'/g, "");
  return n === "boolean" ? yield PI() : n === "number" ? yield Io() : n === "bigint" ? yield Mf() : n === "string" ? yield ca() : yield (() => {
    const r = n.split("|").map((o) => Ze(o.trim()));
    return r.length === 0 ? fn() : r.length === 1 ? r[0] : ho(r);
  })();
}
function* iE(e) {
  if (e[1] !== "{") {
    const n = Ze("$"), r = Kp(e.slice(1));
    return yield* [n, ...r];
  }
  for (let n = 2; n < e.length; n++)
    if (e[n] === "}") {
      const r = rE(e.slice(2, n)), o = Kp(e.slice(n + 1));
      return yield* [...r, ...o];
    }
  yield Ze(e);
}
function* Kp(e) {
  for (let n = 0; n < e.length; n++)
    if (e[n] === "$") {
      const r = Ze(e.slice(0, n)), o = iE(e.slice(n));
      return yield* [r, ...o];
    }
  yield Ze(e);
}
function oE(e) {
  return [...Kp(e)];
}
class aE extends Yn {
}
function uE(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function OI(e, n) {
  return Vi(e) ? e.pattern.slice(1, e.pattern.length - 1) : pn(e) ? `(${e.anyOf.map((r) => OI(r, n)).join("|")})` : zs(e) ? `${n}${Us}` : Xs(e) ? `${n}${Us}` : aI(e) ? `${n}${Us}` : mf(e) ? `${n}${_I}` : ha(e) ? `${n}${uE(e.const.toString())}` : uI(e) ? `${n}${AR}` : (() => {
    throw new aE(`Unexpected Kind '${e[de]}'`);
  })();
}
function Py(e) {
  return `^${e.map((n) => OI(n, "")).join("")}$`;
}
function Hs(e) {
  const r = Cf(e).map((o) => Ze(o));
  return ho(r);
}
function AI(e, n) {
  const r = Je(e) ? Py(oE(e)) : Py(e);
  return pe({ [de]: "TemplateLiteral", type: "string", pattern: r }, n);
}
function sE(e) {
  return Cf(e).map((r) => r.toString());
}
function cE(e) {
  const n = [];
  for (const r of e)
    n.push(...Nt(r));
  return n;
}
function dE(e) {
  return [e.toString()];
}
function Nt(e) {
  return [...new Set(Vi(e) ? sE(e) : pn(e) ? cE(e.anyOf) : ha(e) ? dE(e.const) : zs(e) ? ["[number]"] : Xs(e) ? ["[number]"] : [])];
}
function pE(e, n, r) {
  const o = {};
  for (const i of Object.getOwnPropertyNames(n))
    o[i] = ic(e, Nt(n[i]), r);
  return o;
}
function fE(e, n, r) {
  return pE(e, n.properties, r);
}
function lE(e, n, r) {
  const o = fE(e, n, r);
  return ln(o);
}
function RI(e, n) {
  return e.map((r) => EI(r, n));
}
function yE(e) {
  return e.filter((n) => !Ia(n));
}
function mE(e, n) {
  return CI(yE(RI(e, n)));
}
function gE(e) {
  return e.some((n) => Ia(n)) ? [] : e;
}
function TE(e, n) {
  return ho(gE(RI(e, n)));
}
function _E(e, n) {
  return n in e ? e[n] : n === "[number]" ? ho(e) : fn();
}
function bE(e, n) {
  return n === "[number]" ? e : fn();
}
function hE(e, n) {
  return n in e ? e[n] : fn();
}
function EI(e, n) {
  return Jn(e) ? mE(e.allOf, n) : pn(e) ? TE(e.anyOf, n) : bo(e) ? _E(e.items ?? [], n) : ba(e) ? bE(e.items, n) : it(e) ? hE(e.properties, n) : fn();
}
function wI(e, n) {
  return n.map((r) => EI(e, r));
}
function Oy(e, n) {
  return ho(wI(e, n));
}
function ic(e, n, r) {
  if (An(e) || An(n)) {
    const o = "Index types using Ref parameters require both Type and Key to be of TSchema";
    if (!bt(e) || !bt(n))
      throw new Yn(o);
    return ke("Index", [e, n]);
  }
  return $n(n) ? lE(e, n, r) : Hi(n) ? AE(e, n, r) : pe(bt(n) ? Oy(e, Nt(n)) : Oy(e, n), r);
}
function IE(e, n, r) {
  return { [n]: ic(e, [n], qn(r)) };
}
function PE(e, n, r) {
  return n.reduce((o, i) => ({ ...o, ...IE(e, i, r) }), {});
}
function OE(e, n, r) {
  return PE(e, n.keys, r);
}
function AE(e, n, r) {
  const o = OE(e, n, r);
  return ln(o);
}
function xf(e, n) {
  return pe({ [de]: "Iterator", type: "Iterator", items: e }, n);
}
function RE(e) {
  const n = [];
  for (let r in e)
    Gi(e[r]) || n.push(r);
  return n;
}
function EE(e, n) {
  const r = RE(e), o = r.length > 0 ? { [de]: "Object", type: "object", properties: e, required: r } : { [de]: "Object", type: "object", properties: e };
  return pe(o, n);
}
var mn = EE;
function SI(e, n) {
  return pe({ [de]: "Promise", type: "Promise", item: e }, n);
}
function wE(e) {
  return pe(Mn(e, [_a]));
}
function SE(e) {
  return pe({ ...e, [_a]: "Readonly" });
}
function vE(e, n) {
  return n === !1 ? wE(e) : SE(e);
}
function zi(e, n) {
  const r = n ?? !0;
  return $n(e) ? xE(e, r) : vE(e, r);
}
function CE(e, n) {
  const r = {};
  for (const o of globalThis.Object.getOwnPropertyNames(e))
    r[o] = zi(e[o], n);
  return r;
}
function ME(e, n) {
  return CE(e.properties, n);
}
function xE(e, n) {
  const r = ME(e, n);
  return ln(r);
}
function Po(e, n) {
  return pe(e.length > 0 ? { [de]: "Tuple", type: "array", items: e, additionalItems: !1, minItems: e.length, maxItems: e.length } : { [de]: "Tuple", type: "array", minItems: e.length, maxItems: e.length }, n);
}
function vI(e, n) {
  return e in n ? Fn(e, n[e]) : ln(n);
}
function $E(e) {
  return { [e]: Ze(e) };
}
function NE(e) {
  const n = {};
  for (const r of e)
    n[r] = Ze(r);
  return n;
}
function BE(e, n) {
  return xR(n, e) ? $E(e) : NE(n);
}
function jE(e, n) {
  const r = BE(e, n);
  return vI(e, r);
}
function Fo(e, n) {
  return n.map((r) => Fn(e, r));
}
function DE(e, n) {
  const r = {};
  for (const o of globalThis.Object.getOwnPropertyNames(n))
    r[o] = Fn(e, n[o]);
  return r;
}
function Fn(e, n) {
  const r = { ...n };
  return (
    // unevaluated modifier types
    Gi(n) ? Yi(Fn(e, Mn(n, [Ot]))) : iI(n) ? zi(Fn(e, Mn(n, [_a]))) : (
      // unevaluated mapped types
      $n(n) ? vI(e, n.properties) : Hi(n) ? jE(e, n.keys) : (
        // unevaluated types
        pf(n) ? wf(Fo(e, n.parameters), Fn(e, n.returns), r) : ff(n) ? Oa(Fo(e, n.parameters), Fn(e, n.returns), r) : df(n) ? Ef(Fn(e, n.items), r) : lf(n) ? xf(Fn(e, n.items), r) : Jn(n) ? Bt(Fo(e, n.allOf), r) : pn(n) ? yn(Fo(e, n.anyOf), r) : bo(n) ? Po(Fo(e, n.items ?? []), r) : it(n) ? mn(DE(e, n.properties), r) : ba(n) ? Rf(Fn(e, n.items), r) : yf(n) ? SI(Fn(e, n.item), r) : n
      )
    )
  );
}
function FE(e, n) {
  const r = {};
  for (const o of e)
    r[o] = Fn(o, n);
  return r;
}
function UE(e, n, r) {
  const o = bt(e) ? Nt(e) : e, i = n({ [de]: "MappedKey", keys: o }), t = FE(o, i);
  return mn(t, r);
}
function LE(e) {
  return pe(Mn(e, [Ot]));
}
function qE(e) {
  return pe({ ...e, [Ot]: "Optional" });
}
function KE(e, n) {
  return n === !1 ? LE(e) : qE(e);
}
function Yi(e, n) {
  const r = n ?? !0;
  return $n(e) ? VE(e, r) : KE(e, r);
}
function GE(e, n) {
  const r = {};
  for (const o of globalThis.Object.getOwnPropertyNames(e))
    r[o] = Yi(e[o], n);
  return r;
}
function HE(e, n) {
  return GE(e.properties, n);
}
function VE(e, n) {
  const r = HE(e, n);
  return ln(r);
}
function Gp(e, n = {}) {
  const r = e.every((i) => it(i)), o = bt(n.unevaluatedProperties) ? { unevaluatedProperties: n.unevaluatedProperties } : {};
  return pe(n.unevaluatedProperties === !1 || bt(n.unevaluatedProperties) || r ? { ...o, [de]: "Intersect", type: "object", allOf: e } : { ...o, [de]: "Intersect", allOf: e }, n);
}
function WE(e) {
  return e.every((n) => Gi(n));
}
function kE(e) {
  return Mn(e, [Ot]);
}
function Ay(e) {
  return e.map((n) => Gi(n) ? kE(n) : n);
}
function XE(e, n) {
  return WE(e) ? Yi(Gp(Ay(e), n)) : Gp(Ay(e), n);
}
function CI(e, n = {}) {
  if (e.length === 1)
    return pe(e[0], n);
  if (e.length === 0)
    return fn(n);
  if (e.some((r) => gf(r)))
    throw new Error("Cannot intersect transform types");
  return XE(e, n);
}
function Bt(e, n) {
  if (e.length === 1)
    return pe(e[0], n);
  if (e.length === 0)
    return fn(n);
  if (e.some((r) => gf(r)))
    throw new Error("Cannot intersect transform types");
  return Gp(e, n);
}
function Oo(...e) {
  const [n, r] = typeof e[0] == "string" ? [e[0], e[1]] : [e[0].$id, e[1]];
  if (typeof n != "string")
    throw new Yn("Ref: $ref must be a string");
  return pe({ [de]: "Ref", $ref: n }, r);
}
function zE(e, n) {
  return ke("Awaited", [ke(e, n)]);
}
function YE(e) {
  return ke("Awaited", [Oo(e)]);
}
function JE(e) {
  return Bt(MI(e));
}
function QE(e) {
  return yn(MI(e));
}
function ZE(e) {
  return oc(e);
}
function MI(e) {
  return e.map((n) => oc(n));
}
function oc(e, n) {
  return pe(Ct(e) ? zE(e.target, e.parameters) : Jn(e) ? JE(e.allOf) : pn(e) ? QE(e.anyOf) : yf(e) ? ZE(e.item) : An(e) ? YE(e.$ref) : e, n);
}
function xI(e) {
  const n = [];
  for (const r of e)
    n.push(ac(r));
  return n;
}
function ew(e) {
  const n = xI(e);
  return DR(n);
}
function nw(e) {
  const n = xI(e);
  return jR(n);
}
function tw(e) {
  return e.map((n, r) => r.toString());
}
function rw(e) {
  return ["[number]"];
}
function iw(e) {
  return globalThis.Object.getOwnPropertyNames(e);
}
function ow(e) {
  return Hp ? globalThis.Object.getOwnPropertyNames(e).map((r) => r[0] === "^" && r[r.length - 1] === "$" ? r.slice(1, r.length - 1) : r) : [];
}
function ac(e) {
  return Jn(e) ? ew(e.allOf) : pn(e) ? nw(e.anyOf) : bo(e) ? tw(e.items ?? []) : ba(e) ? rw(e.items) : it(e) ? iw(e.properties) : cI(e) ? ow(e.patternProperties) : [];
}
let Hp = !1;
function Ry(e) {
  Hp = !0;
  const n = ac(e);
  return Hp = !1, `^(${n.map((o) => `(${o})`).join("|")})$`;
}
function aw(e, n) {
  return ke("KeyOf", [ke(e, n)]);
}
function uw(e) {
  return ke("KeyOf", [Oo(e)]);
}
function sw(e, n) {
  const r = ac(e), o = cw(r), i = ho(o);
  return pe(i, n);
}
function cw(e) {
  return e.map((n) => n === "[number]" ? Io() : Ze(n));
}
function $f(e, n) {
  return Ct(e) ? aw(e.target, e.parameters) : An(e) ? uw(e.$ref) : $n(e) ? fw(e, n) : sw(e, n);
}
function dw(e, n) {
  const r = {};
  for (const o of globalThis.Object.getOwnPropertyNames(e))
    r[o] = $f(e[o], qn(n));
  return r;
}
function pw(e, n) {
  return dw(e.properties, n);
}
function fw(e, n) {
  const r = pw(e, n);
  return ln(r);
}
function lw(e) {
  const n = [];
  for (const r of e)
    n.push(...ac(r));
  return $R(n);
}
function yw(e) {
  return e.filter((n) => !Ia(n));
}
function mw(e, n) {
  const r = [];
  for (const o of e)
    r.push(...wI(o, [n]));
  return yw(r);
}
function gw(e, n) {
  const r = {};
  for (const o of n)
    r[o] = CI(mw(e, o));
  return r;
}
function Tw(e, n) {
  const r = lw(e), o = gw(e, r);
  return mn(o, n);
}
function $I(e) {
  return pe({ [de]: "Date", type: "Date" }, e);
}
function NI(e) {
  return pe({ [de]: "Null", type: "null" }, e);
}
function BI(e) {
  return pe({ [de]: "Symbol", type: "symbol" }, e);
}
function jI(e) {
  return pe({ [de]: "Undefined", type: "undefined" }, e);
}
function DI(e) {
  return pe({ [de]: "Uint8Array", type: "Uint8Array" }, e);
}
function Nf(e) {
  return pe({ [de]: "Unknown" }, e);
}
function _w(e) {
  return e.map((n) => Bf(n, !1));
}
function bw(e) {
  const n = {};
  for (const r of globalThis.Object.getOwnPropertyNames(e))
    n[r] = zi(Bf(e[r], !1));
  return n;
}
function Ka(e, n) {
  return n === !0 ? e : zi(e);
}
function Bf(e, n) {
  return NA(e) || jA(e) ? Ka(aa(), n) : wn(e) ? zi(Po(_w(e))) : ya(e) ? DI() : rf(e) ? $I() : en(e) ? Ka(mn(bw(e)), n) : BA(e) ? Ka(Oa([], Nf()), n) : on(e) ? jI() : DA(e) ? NI() : FA(e) ? BI() : eI(e) ? Mf() : ht(e) || la(e) || Je(e) ? Ze(e) : mn({});
}
function hw(e, n) {
  return pe(Bf(e, !0), n);
}
function Iw(e, n) {
  return Po(e.parameters, n);
}
function Pw(e, n) {
  if (on(e))
    throw new Error("Enum undefined or empty");
  const r = globalThis.Object.getOwnPropertyNames(e).filter((t) => isNaN(t)).map((t) => e[t]), i = [...new Set(r)].map((t) => Ze(t));
  return yn(i, { ...n, [ks]: "Enum" });
}
class Ow extends Yn {
}
var Q;
(function(e) {
  e[e.Union = 0] = "Union", e[e.True = 1] = "True", e[e.False = 2] = "False";
})(Q || (Q = {}));
function Un(e) {
  return e === Q.False ? e : Q.True;
}
function Ao(e) {
  throw new Ow(e);
}
function nn(e) {
  return $t(e) || Xi(e) || Pt(e) || Xn(e) || Wn(e);
}
function tn(e, n) {
  return $t(n) ? LI() : Xi(n) ? uc(e, n) : Pt(n) ? Df(e, n) : Xn(n) ? HI() : Wn(n) ? jf() : Ao("StructuralRight");
}
function jf(e, n) {
  return Q.True;
}
function Aw(e, n) {
  return Xi(n) ? uc(e, n) : Pt(n) && n.anyOf.some((r) => Wn(r) || Xn(r)) ? Q.True : Pt(n) ? Q.Union : Xn(n) || Wn(n) ? Q.True : Q.Union;
}
function Rw(e, n) {
  return Xn(e) ? Q.False : Wn(e) ? Q.Union : $t(e) ? Q.True : Q.False;
}
function Ew(e, n) {
  return Xe(n) && sc(n) ? Q.True : nn(n) ? tn(e, n) : Wi(n) ? Un(Ge(e.items, n.items)) : Q.False;
}
function ww(e, n) {
  return nn(n) ? tn(e, n) : bf(n) ? Un(Ge(e.items, n.items)) : Q.False;
}
function Sw(e, n) {
  return nn(n) ? tn(e, n) : Xe(n) ? Tn(e, n) : cn(n) ? Kn(e, n) : Ys(n) ? Q.True : Q.False;
}
function FI(e, n) {
  return TI(e) || ki(e) ? Q.True : Q.False;
}
function vw(e, n) {
  return nn(n) ? tn(e, n) : Xe(n) ? Tn(e, n) : cn(n) ? Kn(e, n) : ki(n) ? Q.True : Q.False;
}
function Cw(e, n) {
  return nn(n) ? tn(e, n) : Xe(n) ? Tn(e, n) : Js(n) ? e.parameters.length > n.parameters.length ? Q.False : e.parameters.every((r, o) => Un(Ge(n.parameters[o], r)) === Q.True) ? Un(Ge(e.returns, n.returns)) : Q.False : Q.False;
}
function Mw(e, n) {
  return nn(n) ? tn(e, n) : Xe(n) ? Tn(e, n) : cn(n) ? Kn(e, n) : Qs(n) ? Q.True : Q.False;
}
function xw(e, n) {
  return nn(n) ? tn(e, n) : Xe(n) ? Tn(e, n) : Zs(n) ? e.parameters.length > n.parameters.length ? Q.False : e.parameters.every((r, o) => Un(Ge(n.parameters[o], r)) === Q.True) ? Un(Ge(e.returns, n.returns)) : Q.False : Q.False;
}
function UI(e, n) {
  return xt(e) && ht(e.const) || On(e) || At(e) ? Q.True : Q.False;
}
function $w(e, n) {
  return At(n) || On(n) ? Q.True : nn(n) ? tn(e, n) : Xe(n) ? Tn(e, n) : cn(n) ? Kn(e, n) : Q.False;
}
function uc(e, n) {
  return n.allOf.every((r) => Ge(e, r) === Q.True) ? Q.True : Q.False;
}
function Nw(e, n) {
  return e.allOf.some((r) => Ge(r, n) === Q.True) ? Q.True : Q.False;
}
function Bw(e, n) {
  return nn(n) ? tn(e, n) : hf(n) ? Un(Ge(e.items, n.items)) : Q.False;
}
function jw(e, n) {
  return xt(n) && n.const === e.const ? Q.True : nn(n) ? tn(e, n) : Xe(n) ? Tn(e, n) : cn(n) ? Kn(e, n) : kn(n) ? GI(e) : On(n) ? qI(e) : At(n) ? UI(e) : ki(n) ? FI(e) : Q.False;
}
function LI(e, n) {
  return Q.False;
}
function Dw(e, n) {
  return Q.True;
}
function Ey(e) {
  let [n, r] = [e, 0];
  for (; fo(n); )
    n = n.not, r += 1;
  return r % 2 === 0 ? n : Nf();
}
function Fw(e, n) {
  return fo(e) ? Ge(Ey(e), n) : fo(n) ? Ge(e, Ey(n)) : Ao("Invalid fallthrough for Not");
}
function Uw(e, n) {
  return nn(n) ? tn(e, n) : Xe(n) ? Tn(e, n) : cn(n) ? Kn(e, n) : If(n) ? Q.True : Q.False;
}
function qI(e, n) {
  return gI(e) || On(e) || At(e) ? Q.True : Q.False;
}
function Lw(e, n) {
  return nn(n) ? tn(e, n) : Xe(n) ? Tn(e, n) : cn(n) ? Kn(e, n) : At(n) || On(n) ? Q.True : Q.False;
}
function Rn(e, n) {
  return Object.getOwnPropertyNames(e.properties).length === n;
}
function wy(e) {
  return sc(e);
}
function Sy(e) {
  return Rn(e, 0) || Rn(e, 1) && "description" in e.properties && Pt(e.properties.description) && e.properties.description.anyOf.length === 2 && (kn(e.properties.description.anyOf[0]) && qi(e.properties.description.anyOf[1]) || kn(e.properties.description.anyOf[1]) && qi(e.properties.description.anyOf[0]));
}
function ud(e) {
  return Rn(e, 0);
}
function vy(e) {
  return Rn(e, 0);
}
function qw(e) {
  return Rn(e, 0);
}
function Kw(e) {
  return Rn(e, 0);
}
function Gw(e) {
  return sc(e);
}
function Hw(e) {
  const n = Io();
  return Rn(e, 0) || Rn(e, 1) && "length" in e.properties && Un(Ge(e.properties.length, n)) === Q.True;
}
function Vw(e) {
  return Rn(e, 0);
}
function sc(e) {
  const n = Io();
  return Rn(e, 0) || Rn(e, 1) && "length" in e.properties && Un(Ge(e.properties.length, n)) === Q.True;
}
function Ww(e) {
  const n = Oa([aa()], aa());
  return Rn(e, 0) || Rn(e, 1) && "then" in e.properties && Un(Ge(e.properties.then, n)) === Q.True;
}
function KI(e, n) {
  return Ge(e, n) === Q.False || Gs(e) && !Gs(n) ? Q.False : Q.True;
}
function Tn(e, n) {
  return Xn(e) ? Q.False : Wn(e) ? Q.Union : $t(e) || mI(e) && wy(n) || gI(e) && ud(n) || TI(e) && vy(n) || ia(e) && Sy(n) || Ys(e) && qw(n) || kn(e) && wy(n) || ia(e) && Sy(n) || On(e) && ud(n) || At(e) && ud(n) || ki(e) && vy(n) || Pa(e) && Gw(n) || Qs(e) && Kw(n) || Js(e) && Vw(n) || Zs(e) && Hw(n) ? Q.True : cn(e) && kn(Vp(e)) ? n[ks] === "Record" ? Q.True : Q.False : cn(e) && On(Vp(e)) ? Rn(n, 0) ? Q.True : Q.False : Q.False;
}
function kw(e, n) {
  return nn(n) ? tn(e, n) : cn(n) ? Kn(e, n) : Xe(n) ? (() => {
    for (const r of Object.getOwnPropertyNames(n.properties)) {
      if (!(r in e.properties) && !Gs(n.properties[r]))
        return Q.False;
      if (Gs(n.properties[r]))
        return Q.True;
      if (KI(e.properties[r], n.properties[r]) === Q.False)
        return Q.False;
    }
    return Q.True;
  })() : Q.False;
}
function Xw(e, n) {
  return nn(n) ? tn(e, n) : Xe(n) && Ww(n) ? Q.True : Pf(n) ? Un(Ge(e.item, n.item)) : Q.False;
}
function Vp(e) {
  return lo in e.patternProperties ? Io() : yo in e.patternProperties ? ca() : Ao("Unknown record key pattern");
}
function Wp(e) {
  return lo in e.patternProperties ? e.patternProperties[lo] : yo in e.patternProperties ? e.patternProperties[yo] : Ao("Unable to get record value schema");
}
function Kn(e, n) {
  const [r, o] = [Vp(n), Wp(n)];
  return mI(e) && On(r) && Un(Ge(e, o)) === Q.True ? Q.True : Pa(e) && On(r) || kn(e) && On(r) || Wi(e) && On(r) ? Ge(e, o) : Xe(e) ? (() => {
    for (const i of Object.getOwnPropertyNames(e.properties))
      if (KI(o, e.properties[i]) === Q.False)
        return Q.False;
    return Q.True;
  })() : Q.False;
}
function zw(e, n) {
  return nn(n) ? tn(e, n) : Xe(n) ? Tn(e, n) : cn(n) ? Ge(Wp(e), Wp(n)) : Q.False;
}
function Yw(e, n) {
  const r = ra(e) ? ca() : e, o = ra(n) ? ca() : n;
  return Ge(r, o);
}
function GI(e, n) {
  return xt(e) && Je(e.const) || kn(e) ? Q.True : Q.False;
}
function Jw(e, n) {
  return nn(n) ? tn(e, n) : Xe(n) ? Tn(e, n) : cn(n) ? Kn(e, n) : kn(n) ? Q.True : Q.False;
}
function Qw(e, n) {
  return nn(n) ? tn(e, n) : Xe(n) ? Tn(e, n) : cn(n) ? Kn(e, n) : ia(n) ? Q.True : Q.False;
}
function Zw(e, n) {
  return oa(e) ? Ge(Hs(e), n) : oa(n) ? Ge(e, Hs(n)) : Ao("Invalid fallthrough for TemplateLiteral");
}
function eS(e, n) {
  return Wi(n) && e.items !== void 0 && e.items.every((r) => Ge(r, n.items) === Q.True);
}
function nS(e, n) {
  return $t(e) ? Q.True : Xn(e) ? Q.False : Wn(e) ? Q.Union : Q.False;
}
function tS(e, n) {
  return nn(n) ? tn(e, n) : Xe(n) && sc(n) || Wi(n) && eS(e, n) ? Q.True : ec(n) ? on(e.items) && !on(n.items) || !on(e.items) && on(n.items) ? Q.False : on(e.items) && !on(n.items) || e.items.every((r, o) => Ge(r, n.items[o]) === Q.True) ? Q.True : Q.False : Q.False;
}
function rS(e, n) {
  return nn(n) ? tn(e, n) : Xe(n) ? Tn(e, n) : cn(n) ? Kn(e, n) : Pa(n) ? Q.True : Q.False;
}
function iS(e, n) {
  return nn(n) ? tn(e, n) : Xe(n) ? Tn(e, n) : cn(n) ? Kn(e, n) : nc(n) ? uS(e) : qi(n) ? Q.True : Q.False;
}
function Df(e, n) {
  return n.anyOf.some((r) => Ge(e, r) === Q.True) ? Q.True : Q.False;
}
function oS(e, n) {
  return e.anyOf.every((r) => Ge(r, n) === Q.True) ? Q.True : Q.False;
}
function HI(e, n) {
  return Q.True;
}
function aS(e, n) {
  return $t(n) ? LI() : Xi(n) ? uc(e, n) : Pt(n) ? Df(e, n) : Wn(n) ? jf() : kn(n) ? GI(e) : On(n) ? qI(e) : At(n) ? UI(e) : ki(n) ? FI(e) : Wi(n) ? Rw(e) : ec(n) ? nS(e) : Xe(n) ? Tn(e, n) : Xn(n) ? Q.True : Q.False;
}
function uS(e, n) {
  return qi(e) || qi(e) ? Q.True : Q.False;
}
function sS(e, n) {
  return Xi(n) ? uc(e, n) : Pt(n) ? Df(e, n) : Xn(n) ? HI() : Wn(n) ? jf() : Xe(n) ? Tn(e, n) : nc(n) ? Q.True : Q.False;
}
function Ge(e, n) {
  return (
    // resolvable
    oa(e) || oa(n) ? Zw(e, n) : ra(e) || ra(n) ? Yw(e, n) : fo(e) || fo(n) ? Fw(e, n) : (
      // standard
      Wn(e) ? Aw(e, n) : Wi(e) ? Ew(e, n) : Ys(e) ? Sw(e, n) : ki(e) ? vw(e, n) : bf(e) ? ww(e, n) : Js(e) ? Cw(e, n) : Qs(e) ? Mw(e, n) : Zs(e) ? xw(e, n) : At(e) ? $w(e, n) : Xi(e) ? Nw(e, n) : hf(e) ? Bw(e, n) : xt(e) ? jw(e, n) : $t(e) ? Dw() : If(e) ? Uw(e, n) : On(e) ? Lw(e, n) : Xe(e) ? kw(e, n) : cn(e) ? zw(e, n) : kn(e) ? Jw(e, n) : ia(e) ? Qw(e, n) : ec(e) ? tS(e, n) : Pf(e) ? Xw(e, n) : Pa(e) ? rS(e, n) : qi(e) ? iS(e, n) : Pt(e) ? oS(e, n) : Xn(e) ? aS(e, n) : nc(e) ? sS(e, n) : Ao(`Unknown left type operand '${e[de]}'`)
    )
  );
}
function Aa(e, n) {
  return Ge(e, n);
}
function cS(e, n, r, o, i) {
  const t = {};
  for (const a of globalThis.Object.getOwnPropertyNames(e))
    t[a] = Ff(e[a], n, r, o, qn(i));
  return t;
}
function dS(e, n, r, o, i) {
  return cS(e.properties, n, r, o, i);
}
function pS(e, n, r, o, i) {
  const t = dS(e, n, r, o, i);
  return ln(t);
}
function fS(e, n, r, o) {
  const i = Aa(e, n);
  return i === Q.Union ? yn([r, o]) : i === Q.True ? r : o;
}
function Ff(e, n, r, o, i) {
  return $n(e) ? pS(e, n, r, o, i) : Hi(e) ? pe(gS(e, n, r, o, i)) : pe(fS(e, n, r, o), i);
}
function lS(e, n, r, o, i) {
  return {
    [e]: Ff(Ze(e), n, r, o, qn(i))
  };
}
function yS(e, n, r, o, i) {
  return e.reduce((t, a) => ({ ...t, ...lS(a, n, r, o, i) }), {});
}
function mS(e, n, r, o, i) {
  return yS(e.keys, n, r, o, i);
}
function gS(e, n, r, o, i) {
  const t = mS(e, n, r, o, i);
  return ln(t);
}
function TS(e) {
  return e.allOf.every((n) => cc(n));
}
function _S(e) {
  return e.anyOf.some((n) => cc(n));
}
function bS(e) {
  return !cc(e.not);
}
function cc(e) {
  return e[de] === "Intersect" ? TS(e) : e[de] === "Union" ? _S(e) : e[de] === "Not" ? bS(e) : e[de] === "Undefined";
}
function hS(e, n) {
  return Uf(Hs(e), n);
}
function IS(e, n) {
  const r = e.filter((o) => Aa(o, n) === Q.False);
  return r.length === 1 ? r[0] : yn(r);
}
function Uf(e, n, r = {}) {
  return Vi(e) ? pe(hS(e, n), r) : $n(e) ? pe(AS(e, n), r) : pe(pn(e) ? IS(e.anyOf, n) : Aa(e, n) !== Q.False ? fn() : e, r);
}
function PS(e, n) {
  const r = {};
  for (const o of globalThis.Object.getOwnPropertyNames(e))
    r[o] = Uf(e[o], n);
  return r;
}
function OS(e, n) {
  return PS(e.properties, n);
}
function AS(e, n) {
  const r = OS(e, n);
  return ln(r);
}
function RS(e, n) {
  return Lf(Hs(e), n);
}
function ES(e, n) {
  const r = e.filter((o) => Aa(o, n) !== Q.False);
  return r.length === 1 ? r[0] : yn(r);
}
function Lf(e, n, r) {
  return Vi(e) ? pe(RS(e, n), r) : $n(e) ? pe(vS(e, n), r) : pe(pn(e) ? ES(e.anyOf, n) : Aa(e, n) !== Q.False ? e : fn(), r);
}
function wS(e, n) {
  const r = {};
  for (const o of globalThis.Object.getOwnPropertyNames(e))
    r[o] = Lf(e[o], n);
  return r;
}
function SS(e, n) {
  return wS(e.properties, n);
}
function vS(e, n) {
  const r = SS(e, n);
  return ln(r);
}
function CS(e, n) {
  return pe(e.returns, n);
}
function MS(e) {
  return pe({ [de]: "Integer", type: "integer" }, e);
}
function xS(e, n, r) {
  return {
    [e]: Ro(Ze(e), n, qn(r))
  };
}
function $S(e, n, r) {
  return e.reduce((i, t) => ({ ...i, ...xS(t, n, r) }), {});
}
function NS(e, n, r) {
  return $S(e.keys, n, r);
}
function BS(e, n, r) {
  const o = NS(e, n, r);
  return ln(o);
}
function jS(e) {
  const [n, r] = [e.slice(0, 1), e.slice(1)];
  return [n.toLowerCase(), r].join("");
}
function DS(e) {
  const [n, r] = [e.slice(0, 1), e.slice(1)];
  return [n.toUpperCase(), r].join("");
}
function FS(e) {
  return e.toUpperCase();
}
function US(e) {
  return e.toLowerCase();
}
function LS(e, n, r) {
  const o = vf(e.pattern);
  if (!sa(o))
    return { ...e, pattern: VI(e.pattern, n) };
  const a = [...rc(o)].map((s) => Ze(s)), u = WI(a, n), c = yn(u);
  return AI([c], r);
}
function VI(e, n) {
  return typeof e == "string" ? n === "Uncapitalize" ? jS(e) : n === "Capitalize" ? DS(e) : n === "Uppercase" ? FS(e) : n === "Lowercase" ? US(e) : e : e.toString();
}
function WI(e, n) {
  return e.map((r) => Ro(r, n));
}
function Ro(e, n, r = {}) {
  return (
    // Intrinsic-Mapped-Inference
    Hi(e) ? BS(e, n, r) : (
      // Standard-Inference
      Vi(e) ? LS(e, n, r) : pn(e) ? yn(WI(e.anyOf, n), r) : ha(e) ? Ze(VI(e.const, n), r) : (
        // Default Type
        pe(e, r)
      )
    )
  );
}
function qS(e, n = {}) {
  return Ro(e, "Capitalize", n);
}
function KS(e, n = {}) {
  return Ro(e, "Lowercase", n);
}
function GS(e, n = {}) {
  return Ro(e, "Uncapitalize", n);
}
function HS(e, n = {}) {
  return Ro(e, "Uppercase", n);
}
function VS(e, n, r) {
  const o = {};
  for (const i of globalThis.Object.getOwnPropertyNames(e))
    o[i] = dc(e[i], n, qn(r));
  return o;
}
function WS(e, n, r) {
  return VS(e.properties, n, r);
}
function kS(e, n, r) {
  const o = WS(e, n, r);
  return ln(o);
}
function XS(e, n) {
  return e.map((r) => qf(r, n));
}
function zS(e, n) {
  return e.map((r) => qf(r, n));
}
function YS(e, n) {
  const { [n]: r, ...o } = e;
  return o;
}
function JS(e, n) {
  return n.reduce((r, o) => YS(r, o), e);
}
function QS(e, n) {
  const r = Mn(e, [tt, "$id", "required", "properties"]), o = JS(e.properties, n);
  return mn(o, r);
}
function ZS(e) {
  const n = e.reduce((r, o) => sI(o) ? [...r, Ze(o)] : r, []);
  return yn(n);
}
function qf(e, n) {
  return Jn(e) ? Bt(XS(e.allOf, n)) : pn(e) ? yn(zS(e.anyOf, n)) : it(e) ? QS(e, n) : mn({});
}
function dc(e, n, r) {
  const o = wn(n) ? ZS(n) : n, i = bt(n) ? Nt(n) : n, t = An(e), a = An(n);
  return $n(e) ? kS(e, i, r) : Hi(n) ? rv(e, n, r) : t && a ? ke("Omit", [e, o], r) : !t && a ? ke("Omit", [e, o], r) : t && !a ? ke("Omit", [e, o], r) : pe({ ...qf(e, i), ...r });
}
function ev(e, n, r) {
  return { [n]: dc(e, [n], qn(r)) };
}
function nv(e, n, r) {
  return n.reduce((o, i) => ({ ...o, ...ev(e, i, r) }), {});
}
function tv(e, n, r) {
  return nv(e, n.keys, r);
}
function rv(e, n, r) {
  const o = tv(e, n, r);
  return ln(o);
}
function iv(e, n, r) {
  const o = {};
  for (const i of globalThis.Object.getOwnPropertyNames(e))
    o[i] = pc(e[i], n, qn(r));
  return o;
}
function ov(e, n, r) {
  return iv(e.properties, n, r);
}
function av(e, n, r) {
  const o = ov(e, n, r);
  return ln(o);
}
function uv(e, n) {
  return e.map((r) => Kf(r, n));
}
function sv(e, n) {
  return e.map((r) => Kf(r, n));
}
function cv(e, n) {
  const r = {};
  for (const o of n)
    o in e && (r[o] = e[o]);
  return r;
}
function dv(e, n) {
  const r = Mn(e, [tt, "$id", "required", "properties"]), o = cv(e.properties, n);
  return mn(o, r);
}
function pv(e) {
  const n = e.reduce((r, o) => sI(o) ? [...r, Ze(o)] : r, []);
  return yn(n);
}
function Kf(e, n) {
  return Jn(e) ? Bt(uv(e.allOf, n)) : pn(e) ? yn(sv(e.anyOf, n)) : it(e) ? dv(e, n) : mn({});
}
function pc(e, n, r) {
  const o = wn(n) ? pv(n) : n, i = bt(n) ? Nt(n) : n, t = An(e), a = An(n);
  return $n(e) ? av(e, i, r) : Hi(n) ? mv(e, n, r) : t && a ? ke("Pick", [e, o], r) : !t && a ? ke("Pick", [e, o], r) : t && !a ? ke("Pick", [e, o], r) : pe({ ...Kf(e, i), ...r });
}
function fv(e, n, r) {
  return {
    [n]: pc(e, [n], qn(r))
  };
}
function lv(e, n, r) {
  return n.reduce((o, i) => ({ ...o, ...fv(e, i, r) }), {});
}
function yv(e, n, r) {
  return lv(e, n.keys, r);
}
function mv(e, n, r) {
  const o = yv(e, n, r);
  return ln(o);
}
function gv(e, n) {
  return ke("Partial", [ke(e, n)]);
}
function Tv(e) {
  return ke("Partial", [Oo(e)]);
}
function _v(e) {
  const n = {};
  for (const r of globalThis.Object.getOwnPropertyNames(e))
    n[r] = Yi(e[r]);
  return n;
}
function bv(e) {
  const n = Mn(e, [tt, "$id", "required", "properties"]), r = _v(e.properties);
  return mn(r, n);
}
function Cy(e) {
  return e.map((n) => kI(n));
}
function kI(e) {
  return Ct(e) ? gv(e.target, e.parameters) : An(e) ? Tv(e.$ref) : Jn(e) ? Bt(Cy(e.allOf)) : pn(e) ? yn(Cy(e.anyOf)) : it(e) ? bv(e) : mn({});
}
function Gf(e, n) {
  return $n(e) ? Pv(e, n) : pe({ ...kI(e), ...n });
}
function hv(e, n) {
  const r = {};
  for (const o of globalThis.Object.getOwnPropertyNames(e))
    r[o] = Gf(e[o], qn(n));
  return r;
}
function Iv(e, n) {
  return hv(e.properties, n);
}
function Pv(e, n) {
  const r = Iv(e, n);
  return ln(r);
}
function Ji(e, n, r) {
  return pe({ [de]: "Record", type: "object", patternProperties: { [e]: n } }, r);
}
function Hf(e, n, r) {
  const o = {};
  for (const i of e)
    o[i] = n;
  return mn(o, { ...r, [ks]: "Record" });
}
function Ov(e, n, r) {
  return hI(e) ? Hf(Nt(e), n, r) : Ji(e.pattern, n, r);
}
function Av(e, n, r) {
  return Hf(Nt(yn(e)), n, r);
}
function Rv(e, n, r) {
  return Hf([e.toString()], n, r);
}
function Ev(e, n, r) {
  return Ji(e.source, n, r);
}
function wv(e, n, r) {
  const o = on(e.pattern) ? yo : e.pattern;
  return Ji(o, n, r);
}
function Sv(e, n, r) {
  return Ji(yo, n, r);
}
function vv(e, n, r) {
  return Ji(ER, n, r);
}
function Cv(e, n, r) {
  return Ji(lo, n, r);
}
function Mv(e, n, r) {
  return Ji(lo, n, r);
}
function XI(e, n, r = {}) {
  return Ct(n) ? ke("Record", [e, ke(n.target, n.parameters)], r) : Ct(e) ? ke("Record", [ke(n.target, n.parameters), n], r) : An(e) ? ke("Record", [Oo(e.$ref), n]) : pn(e) ? Av(e.anyOf, n, r) : Vi(e) ? Ov(e, n, r) : ha(e) ? Rv(e.const, n, r) : Xs(e) ? Cv(e, n, r) : zs(e) ? Mv(e, n, r) : dI(e) ? Ev(e, n, r) : mf(e) ? wv(e, n, r) : oI(e) ? Sv(e, n, r) : Ia(e) ? vv(e, n, r) : fn(r);
}
function xv(e, n) {
  return ke("Required", [ke(e, n)]);
}
function $v(e) {
  return ke("Required", [Oo(e)]);
}
function Nv(e) {
  const n = {};
  for (const r of globalThis.Object.getOwnPropertyNames(e))
    n[r] = Mn(e[r], [Ot]);
  return n;
}
function Bv(e) {
  const n = Mn(e, [tt, "$id", "required", "properties"]), r = Nv(e.properties);
  return mn(r, n);
}
function My(e) {
  return e.map((n) => zI(n));
}
function zI(e) {
  return Ct(e) ? xv(e.target, e.parameters) : An(e) ? $v(e.$ref) : Jn(e) ? Bt(My(e.allOf)) : pn(e) ? yn(My(e.anyOf)) : it(e) ? Bv(e) : mn({});
}
function Vf(e, n) {
  return $n(e) ? Fv(e, n) : pe({ ...zI(e), ...n });
}
function jv(e, n) {
  const r = {};
  for (const o of globalThis.Object.getOwnPropertyNames(e))
    r[o] = Vf(e[o], n);
  return r;
}
function Dv(e, n) {
  return jv(e.properties, n);
}
function Fv(e, n) {
  const r = Dv(e, n);
  return ln(r);
}
function Uv(e, n) {
  return n.map((r) => An(r) ? YI(e, r.$ref) : Ln(e, r));
}
function YI(e, n) {
  return n in e ? An(e[n]) ? YI(e, e[n].$ref) : Ln(e, e[n]) : fn();
}
function Lv(e) {
  return oc(e[0]);
}
function qv(e) {
  return ic(e[0], e[1]);
}
function Kv(e) {
  return $f(e[0]);
}
function Gv(e) {
  return Gf(e[0]);
}
function Hv(e) {
  return dc(e[0], e[1]);
}
function Vv(e) {
  return pc(e[0], e[1]);
}
function Wv(e) {
  return XI(e[0], e[1]);
}
function kv(e) {
  return Vf(e[0]);
}
function Xv(e, n, r) {
  const o = Uv(e, r);
  return n === "Awaited" ? Lv(o) : n === "Index" ? qv(o) : n === "KeyOf" ? Kv(o) : n === "Partial" ? Gv(o) : n === "Omit" ? Hv(o) : n === "Pick" ? Vv(o) : n === "Record" ? Wv(o) : n === "Required" ? kv(o) : fn();
}
function zv(e, n) {
  return mn(globalThis.Object.keys(n).reduce((r, o) => ({ ...r, [o]: Ln(e, n[o]) }), {}));
}
function Yv(e, n, r) {
  return wf(Ra(e, n), Ln(e, r));
}
function Jv(e, n, r) {
  return Oa(Ra(e, n), Ln(e, r));
}
function Qv(e, n) {
  return Po(Ra(e, n));
}
function Zv(e, n) {
  return Bt(Ra(e, n));
}
function eC(e, n) {
  return yn(Ra(e, n));
}
function nC(e, n) {
  return Rf(Ln(e, n));
}
function tC(e, n) {
  return Ef(Ln(e, n));
}
function rC(e, n) {
  return xf(Ln(e, n));
}
function Ra(e, n) {
  return n.map((r) => Ln(e, r));
}
function Ln(e, n) {
  return (
    // Modifier Unwrap - Reapplied via CreateType Options
    Gi(n) ? pe(Ln(e, Mn(n, [Ot])), n) : iI(n) ? pe(Ln(e, Mn(n, [_a])), n) : (
      // Traveral
      ba(n) ? pe(nC(e, n.items), n) : df(n) ? pe(tC(e, n.items), n) : Ct(n) ? pe(Xv(e, n.target, n.parameters)) : pf(n) ? pe(Yv(e, n.parameters, n.returns), n) : ff(n) ? pe(Jv(e, n.parameters, n.returns), n) : Jn(n) ? pe(Zv(e, n.allOf), n) : lf(n) ? pe(rC(e, n.items), n) : it(n) ? pe(zv(e, n.properties), n) : bo(n) ? pe(Qv(e, n.items || []), n) : pn(n) ? pe(eC(e, n.anyOf), n) : n
    )
  );
}
function iC(e, n) {
  return n in e ? Ln(e, e[n]) : fn();
}
function oC(e) {
  return globalThis.Object.getOwnPropertyNames(e).reduce((n, r) => ({ ...n, [r]: iC(e, r) }), {});
}
class aC {
  constructor(n) {
    const r = oC(n), o = this.WithIdentifiers(r);
    this.$defs = o;
  }
  /** `[Json]` Imports a Type by Key. */
  Import(n, r) {
    const o = { ...this.$defs, [n]: pe(this.$defs[n], r) };
    return pe({ [de]: "Import", $defs: o, $ref: n });
  }
  // prettier-ignore
  WithIdentifiers(n) {
    return globalThis.Object.getOwnPropertyNames(n).reduce((r, o) => ({ ...r, [o]: { ...n[o], $id: o } }), {});
  }
}
function uC(e) {
  return new aC(e);
}
function sC(e, n) {
  return pe({ [de]: "Not", not: e }, n);
}
function cC(e, n) {
  return Po(e.parameters, n);
}
function dC(e) {
  return zi(Yi(e));
}
let pC = 0;
function fC(e, n = {}) {
  on(n.$id) && (n.$id = `T${pC++}`);
  const r = HA(e({ [de]: "This", $ref: `${n.$id}` }));
  return r.$id = n.$id, pe({ [ks]: "Recursive", ...r }, n);
}
function lC(e, n) {
  const r = Je(e) ? new globalThis.RegExp(e) : e;
  return pe({ [de]: "RegExp", type: "RegExp", source: r.source, flags: r.flags }, n);
}
function yC(e) {
  return Jn(e) ? e.allOf : pn(e) ? e.anyOf : bo(e) ? e.items ?? [] : [];
}
function mC(e) {
  return yC(e);
}
function gC(e, n) {
  return pe(e.returns, n);
}
class TC {
  constructor(n) {
    this.schema = n;
  }
  Decode(n) {
    return new _C(this.schema, n);
  }
}
class _C {
  constructor(n, r) {
    this.schema = n, this.decode = r;
  }
  EncodeTransform(n, r) {
    const t = { Encode: (a) => r[tt].Encode(n(a)), Decode: (a) => this.decode(r[tt].Decode(a)) };
    return { ...r, [tt]: t };
  }
  EncodeSchema(n, r) {
    const o = { Decode: this.decode, Encode: n };
    return { ...r, [tt]: o };
  }
  Encode(n) {
    return gf(this.schema) ? this.EncodeTransform(n, this.schema) : this.EncodeSchema(n, this.schema);
  }
}
function bC(e) {
  return new TC(e);
}
function hC(e = {}) {
  return pe({ [de]: e[de] ?? "Unsafe" }, e);
}
function IC(e) {
  return pe({ [de]: "Void", type: "void" }, e);
}
const PC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Any: aa,
  Array: Rf,
  AsyncIterator: Ef,
  Awaited: oc,
  BigInt: Mf,
  Boolean: PI,
  Capitalize: qS,
  Composite: Tw,
  Const: hw,
  Constructor: wf,
  ConstructorParameters: Iw,
  Date: $I,
  Enum: Pw,
  Exclude: Uf,
  Extends: Ff,
  Extract: Lf,
  Function: Oa,
  Index: ic,
  InstanceType: CS,
  Integer: MS,
  Intersect: Bt,
  Iterator: xf,
  KeyOf: $f,
  Literal: Ze,
  Lowercase: KS,
  Mapped: UE,
  Module: uC,
  Never: fn,
  Not: sC,
  Null: NI,
  Number: Io,
  Object: mn,
  Omit: dc,
  Optional: Yi,
  Parameters: cC,
  Partial: Gf,
  Pick: pc,
  Promise: SI,
  Readonly: zi,
  ReadonlyOptional: dC,
  Record: XI,
  Recursive: fC,
  Ref: Oo,
  RegExp: lC,
  Required: Vf,
  Rest: mC,
  ReturnType: gC,
  String: ca,
  Symbol: BI,
  TemplateLiteral: AI,
  Transform: bC,
  Tuple: Po,
  Uint8Array: DI,
  Uncapitalize: GS,
  Undefined: jI,
  Union: yn,
  Unknown: Nf,
  Unsafe: hC,
  Uppercase: HS,
  Void: IC
}, Symbol.toStringTag, { value: "Module" })), B = PC, OC = (e) => de in e && e[de] === "Union", AC = (e) => B.Optional(B.Union([e, B.Null()])), RC = (e) => B.Omit(e, ["owner"]);
var EC = {
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
const wC = (e, n) => {
  const r = n.properties, o = B.Omit(e, EC.keys(r));
  return B.Composite([o, n]);
};
It.ExactOptionalPropertyTypes = !0;
const JI = {
  [de]: "@codelab/Ref"
}, Wf = B.Object({
  id: B.String()
}), SC = (e) => B.Composite([
  B.Object({
    __typename: B.Literal(`${e}`)
  }),
  B.Object({
    // Add this for easier debugging
    name: B.Optional(B.String())
  }),
  Wf
]), vC = B.Object({
  $modelType: B.Literal("serialized")
}), CC = (e) => B.Composite([vC, e]), MC = {
  [de]: "@codelab/All"
}, xC = B.Array(B.Not(B.Undefined()), { minItems: 1 }), $C = {
  [de]: "@codelab/Defined"
}, Mt = B.Not(
  B.Union([B.Null(), B.Undefined()])
), NC = {
  [de]: "@codelab/AllOrNone"
}, BC = B.Union([
  B.Array(Mt),
  B.Array(B.Not(Mt))
]), jC = {
  [de]: "@codelab/AtLeastOne"
}, DC = B.Array(B.Any(), {
  contains: Mt,
  minContains: 1
}), FC = {
  [de]: "@codelab/AtMostOne"
}, UC = B.Array(
  B.Union([Mt, B.Not(Mt)]),
  {
    validate: (e) => e.filter((r) => !!r).length <= 1
  }
), LC = {
  [de]: "@codelab/ExactlyOne"
}, qC = B.Array(B.Any(), {
  contains: Mt,
  minContains: 1,
  maxContains: 1
}), KC = {
  [de]: "@codelab/Ipv4"
}, GC = B.String({
  format: "ipv4"
}), HC = /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/, VC = (e) => HC.test(e), WC = {
  [de]: "@codelab/None"
}, kC = B.Array(B.Not(Mt));
class XC extends Yn {
  constructor(n) {
    super(`Unable to dereference schema with $id '${n.$ref}'`), this.schema = n;
  }
}
function zC(e, n) {
  const r = n.find((o) => o.$id === e.$ref);
  if (r === void 0)
    throw new XC(e);
  return Ea(r, n);
}
function QI(e, n) {
  return !Ta(e.$id) || n.some((r) => r.$id === e.$id) || n.push(e), n;
}
function Ea(e, n) {
  return e[de] === "This" || e[de] === "Ref" ? zC(e, n) : e;
}
class YC extends Yn {
  constructor(n) {
    super("Unable to hash value"), this.value = n;
  }
}
var xn;
(function(e) {
  e[e.Undefined = 0] = "Undefined", e[e.Null = 1] = "Null", e[e.Boolean = 2] = "Boolean", e[e.Number = 3] = "Number", e[e.String = 4] = "String", e[e.Object = 5] = "Object", e[e.Array = 6] = "Array", e[e.Date = 7] = "Date", e[e.Uint8Array = 8] = "Uint8Array", e[e.Symbol = 9] = "Symbol", e[e.BigInt = 10] = "BigInt";
})(xn || (xn = {}));
let po = BigInt("14695981039346656037");
const [JC, QC] = [BigInt("1099511628211"), BigInt(
  "18446744073709551616"
  /* 2 ^ 64 */
)], ZC = Array.from({ length: 256 }).map((e, n) => BigInt(n)), ZI = new Float64Array(1), eP = new DataView(ZI.buffer), nP = new Uint8Array(ZI.buffer);
function* eM(e) {
  const n = e === 0 ? 1 : Math.ceil(Math.floor(Math.log2(e) + 1) / 8);
  for (let r = 0; r < n; r++)
    yield e >> 8 * (n - 1 - r) & 255;
}
function nM(e) {
  gn(xn.Array);
  for (const n of e)
    go(n);
}
function tM(e) {
  gn(xn.Boolean), gn(e ? 1 : 0);
}
function rM(e) {
  gn(xn.BigInt), eP.setBigInt64(0, e);
  for (const n of nP)
    gn(n);
}
function iM(e) {
  gn(xn.Date), go(e.getTime());
}
function oM(e) {
  gn(xn.Null);
}
function aM(e) {
  gn(xn.Number), eP.setFloat64(0, e);
  for (const n of nP)
    gn(n);
}
function uM(e) {
  gn(xn.Object);
  for (const n of globalThis.Object.getOwnPropertyNames(e).sort())
    go(n), go(e[n]);
}
function sM(e) {
  gn(xn.String);
  for (let n = 0; n < e.length; n++)
    for (const r of eM(e.charCodeAt(n)))
      gn(r);
}
function cM(e) {
  gn(xn.Symbol), go(e.description);
}
function dM(e) {
  gn(xn.Uint8Array);
  for (let n = 0; n < e.length; n++)
    gn(e[n]);
}
function pM(e) {
  return gn(xn.Undefined);
}
function go(e) {
  if (ga(e))
    return nM(e);
  if (uf(e))
    return tM(e);
  if (sf(e))
    return rM(e);
  if (of(e))
    return iM(e);
  if (af(e))
    return oM();
  if (Ui(e))
    return aM(e);
  if (ma(e))
    return uM(e);
  if (Ta(e))
    return sM(e);
  if (cf(e))
    return cM(e);
  if (tI(e))
    return dM(e);
  if (Ws(e))
    return pM();
  throw new YC(e);
}
function gn(e) {
  po = po ^ ZC[e], po = po * JC % QC;
}
function fM(e) {
  return po = BigInt("14695981039346656037"), go(e), po;
}
class lM extends Yn {
  constructor(n) {
    super("Unknown type"), this.schema = n;
  }
}
function yM(e) {
  return e[de] === "Any" || e[de] === "Unknown";
}
function Be(e) {
  return e !== void 0;
}
function mM(e, n, r) {
  return !0;
}
function gM(e, n, r) {
  if (!ga(r) || Be(e.minItems) && !(r.length >= e.minItems) || Be(e.maxItems) && !(r.length <= e.maxItems) || !r.every((t) => sn(e.items, n, t)) || e.uniqueItems === !0 && !function() {
    const t = /* @__PURE__ */ new Set();
    for (const a of r) {
      const u = fM(a);
      if (t.has(u))
        return !1;
      t.add(u);
    }
    return !0;
  }())
    return !1;
  if (!(Be(e.contains) || Ui(e.minContains) || Ui(e.maxContains)))
    return !0;
  const o = Be(e.contains) ? e.contains : fn(), i = r.reduce((t, a) => sn(o, n, a) ? t + 1 : t, 0);
  return !(i === 0 || Ui(e.minContains) && i < e.minContains || Ui(e.maxContains) && i > e.maxContains);
}
function TM(e, n, r) {
  return VA(r);
}
function _M(e, n, r) {
  return !(!sf(r) || Be(e.exclusiveMaximum) && !(r < e.exclusiveMaximum) || Be(e.exclusiveMinimum) && !(r > e.exclusiveMinimum) || Be(e.maximum) && !(r <= e.maximum) || Be(e.minimum) && !(r >= e.minimum) || Be(e.multipleOf) && r % e.multipleOf !== BigInt(0));
}
function bM(e, n, r) {
  return uf(r);
}
function hM(e, n, r) {
  return sn(e.returns, n, r.prototype);
}
function IM(e, n, r) {
  return !(!of(r) || Be(e.exclusiveMaximumTimestamp) && !(r.getTime() < e.exclusiveMaximumTimestamp) || Be(e.exclusiveMinimumTimestamp) && !(r.getTime() > e.exclusiveMinimumTimestamp) || Be(e.maximumTimestamp) && !(r.getTime() <= e.maximumTimestamp) || Be(e.minimumTimestamp) && !(r.getTime() >= e.minimumTimestamp) || Be(e.multipleOfTimestamp) && r.getTime() % e.multipleOfTimestamp !== 0);
}
function PM(e, n, r) {
  return rI(r);
}
function OM(e, n, r) {
  const o = globalThis.Object.values(e.$defs), i = e.$defs[e.$ref];
  return sn(i, [...n, ...o], r);
}
function AM(e, n, r) {
  return !(!JA(r) || Be(e.exclusiveMaximum) && !(r < e.exclusiveMaximum) || Be(e.exclusiveMinimum) && !(r > e.exclusiveMinimum) || Be(e.maximum) && !(r <= e.maximum) || Be(e.minimum) && !(r >= e.minimum) || Be(e.multipleOf) && r % e.multipleOf !== 0);
}
function RM(e, n, r) {
  const o = e.allOf.every((i) => sn(i, n, r));
  if (e.unevaluatedProperties === !1) {
    const i = new RegExp(Ry(e)), t = Object.getOwnPropertyNames(r).every((a) => i.test(a));
    return o && t;
  } else if (bt(e.unevaluatedProperties)) {
    const i = new RegExp(Ry(e)), t = Object.getOwnPropertyNames(r).every((a) => i.test(a) || sn(e.unevaluatedProperties, n, r[a]));
    return o && t;
  } else
    return o;
}
function EM(e, n, r) {
  return WA(r);
}
function wM(e, n, r) {
  return r === e.const;
}
function SM(e, n, r) {
  return !1;
}
function vM(e, n, r) {
  return !sn(e.not, n, r);
}
function CM(e, n, r) {
  return af(r);
}
function MM(e, n, r) {
  return !(!It.IsNumberLike(r) || Be(e.exclusiveMaximum) && !(r < e.exclusiveMaximum) || Be(e.exclusiveMinimum) && !(r > e.exclusiveMinimum) || Be(e.minimum) && !(r >= e.minimum) || Be(e.maximum) && !(r <= e.maximum) || Be(e.multipleOf) && r % e.multipleOf !== 0);
}
function xM(e, n, r) {
  if (!It.IsObjectLike(r) || Be(e.minProperties) && !(Object.getOwnPropertyNames(r).length >= e.minProperties) || Be(e.maxProperties) && !(Object.getOwnPropertyNames(r).length <= e.maxProperties))
    return !1;
  const o = Object.getOwnPropertyNames(e.properties);
  for (const i of o) {
    const t = e.properties[i];
    if (e.required && e.required.includes(i)) {
      if (!sn(t, n, r[i]) || (cc(t) || yM(t)) && !(i in r))
        return !1;
    } else if (It.IsExactOptionalProperty(r, i) && !sn(t, n, r[i]))
      return !1;
  }
  if (e.additionalProperties === !1) {
    const i = Object.getOwnPropertyNames(r);
    return e.required && e.required.length === o.length && i.length === o.length ? !0 : i.every((t) => o.includes(t));
  } else return typeof e.additionalProperties == "object" ? Object.getOwnPropertyNames(r).every((t) => o.includes(t) || sn(e.additionalProperties, n, r[t])) : !0;
}
function $M(e, n, r) {
  return kA(r);
}
function NM(e, n, r) {
  if (!It.IsRecordLike(r) || Be(e.minProperties) && !(Object.getOwnPropertyNames(r).length >= e.minProperties) || Be(e.maxProperties) && !(Object.getOwnPropertyNames(r).length <= e.maxProperties))
    return !1;
  const [o, i] = Object.entries(e.patternProperties)[0], t = new RegExp(o), a = Object.entries(r).every(([s, p]) => t.test(s) ? sn(i, n, p) : !0), u = typeof e.additionalProperties == "object" ? Object.entries(r).every(([s, p]) => t.test(s) ? !0 : sn(e.additionalProperties, n, p)) : !0, c = e.additionalProperties === !1 ? Object.getOwnPropertyNames(r).every((s) => t.test(s)) : !0;
  return a && u && c;
}
function BM(e, n, r) {
  return sn(Ea(e, n), n, r);
}
function jM(e, n, r) {
  const o = new RegExp(e.source, e.flags);
  return Be(e.minLength) && !(r.length >= e.minLength) || Be(e.maxLength) && !(r.length <= e.maxLength) ? !1 : o.test(r);
}
function DM(e, n, r) {
  return !Ta(r) || Be(e.minLength) && !(r.length >= e.minLength) || Be(e.maxLength) && !(r.length <= e.maxLength) || Be(e.pattern) && !new RegExp(e.pattern).test(r) ? !1 : Be(e.format) ? wR(e.format) ? vR(e.format)(r) : !1 : !0;
}
function FM(e, n, r) {
  return cf(r);
}
function UM(e, n, r) {
  return Ta(r) && new RegExp(e.pattern).test(r);
}
function LM(e, n, r) {
  return sn(Ea(e, n), n, r);
}
function qM(e, n, r) {
  if (!ga(r) || e.items === void 0 && r.length !== 0 || r.length !== e.maxItems)
    return !1;
  if (!e.items)
    return !0;
  for (let o = 0; o < e.items.length; o++)
    if (!sn(e.items[o], n, r[o]))
      return !1;
  return !0;
}
function KM(e, n, r) {
  return Ws(r);
}
function GM(e, n, r) {
  return e.anyOf.some((o) => sn(o, n, r));
}
function HM(e, n, r) {
  return !(!tI(r) || Be(e.maxByteLength) && !(r.length <= e.maxByteLength) || Be(e.minByteLength) && !(r.length >= e.minByteLength));
}
function VM(e, n, r) {
  return !0;
}
function WM(e, n, r) {
  return It.IsVoidLike(r);
}
function kM(e, n, r) {
  return tc(e[de]) ? MR(e[de])(e, r) : !1;
}
function sn(e, n, r) {
  const o = Be(e.$id) ? QI(e, n) : n, i = e;
  switch (i[de]) {
    case "Any":
      return mM();
    case "Array":
      return gM(i, o, r);
    case "AsyncIterator":
      return TM(i, o, r);
    case "BigInt":
      return _M(i, o, r);
    case "Boolean":
      return bM(i, o, r);
    case "Constructor":
      return hM(i, o, r);
    case "Date":
      return IM(i, o, r);
    case "Function":
      return PM(i, o, r);
    case "Import":
      return OM(i, o, r);
    case "Integer":
      return AM(i, o, r);
    case "Intersect":
      return RM(i, o, r);
    case "Iterator":
      return EM(i, o, r);
    case "Literal":
      return wM(i, o, r);
    case "Never":
      return SM();
    case "Not":
      return vM(i, o, r);
    case "Null":
      return CM(i, o, r);
    case "Number":
      return MM(i, o, r);
    case "Object":
      return xM(i, o, r);
    case "Promise":
      return $M(i, o, r);
    case "Record":
      return NM(i, o, r);
    case "Ref":
      return BM(i, o, r);
    case "RegExp":
      return jM(i, o, r);
    case "String":
      return DM(i, o, r);
    case "Symbol":
      return FM(i, o, r);
    case "TemplateLiteral":
      return UM(i, o, r);
    case "This":
      return LM(i, o, r);
    case "Tuple":
      return qM(i, o, r);
    case "Undefined":
      return KM(i, o, r);
    case "Union":
      return GM(i, o, r);
    case "Uint8Array":
      return HM(i, o, r);
    case "Unknown":
      return VM();
    case "Void":
      return WM(i, o, r);
    default:
      if (!tc(i[de]))
        throw new lM(i);
      return kM(i, o, r);
  }
}
function tP(...e) {
  return e.length === 3 ? sn(e[0], e[1], e[2]) : sn(e[0], [], e[1]);
}
function XM(e) {
  const n = {};
  for (const r of Object.getOwnPropertyNames(e))
    n[r] = To(e[r]);
  for (const r of Object.getOwnPropertySymbols(e))
    n[r] = To(e[r]);
  return n;
}
function zM(e) {
  return e.map((n) => To(n));
}
function YM(e) {
  return e.slice();
}
function JM(e) {
  return new Map(To([...e.entries()]));
}
function QM(e) {
  return new Set(To([...e.entries()]));
}
function ZM(e) {
  return new Date(e.toISOString());
}
function To(e) {
  if (ga(e))
    return zM(e);
  if (of(e))
    return ZM(e);
  if (YA(e))
    return YM(e);
  if (XA(e))
    return JM(e);
  if (zA(e))
    return QM(e);
  if (ma(e))
    return XM(e);
  if (QA(e))
    return e;
  throw new Error("ValueClone: Unable to clone value");
}
class zn extends Yn {
  constructor(n, r) {
    super(r), this.schema = n;
  }
}
function Le(e) {
  return rI(e) ? e() : To(e);
}
function e0(e, n) {
  return De(e, "default") ? Le(e.default) : {};
}
function n0(e, n) {
  if (e.uniqueItems === !0 && !De(e, "default"))
    throw new zn(e, "Array with the uniqueItems constraint requires a default value");
  if ("contains" in e && !De(e, "default"))
    throw new zn(e, "Array with the contains constraint requires a default value");
  return "default" in e ? Le(e.default) : e.minItems !== void 0 ? Array.from({ length: e.minItems }).map((r) => En(e.items, n)) : [];
}
function t0(e, n) {
  return De(e, "default") ? Le(e.default) : async function* () {
  }();
}
function r0(e, n) {
  return De(e, "default") ? Le(e.default) : BigInt(0);
}
function i0(e, n) {
  return De(e, "default") ? Le(e.default) : !1;
}
function o0(e, n) {
  if (De(e, "default"))
    return Le(e.default);
  {
    const r = En(e.returns, n);
    return typeof r == "object" && !Array.isArray(r) ? class {
      constructor() {
        for (const [o, i] of Object.entries(r)) {
          const t = this;
          t[o] = i;
        }
      }
    } : class {
    };
  }
}
function a0(e, n) {
  return De(e, "default") ? Le(e.default) : e.minimumTimestamp !== void 0 ? new Date(e.minimumTimestamp) : /* @__PURE__ */ new Date();
}
function u0(e, n) {
  return De(e, "default") ? Le(e.default) : () => En(e.returns, n);
}
function s0(e, n) {
  const r = globalThis.Object.values(e.$defs), o = e.$defs[e.$ref];
  return En(o, [...n, ...r]);
}
function c0(e, n) {
  return De(e, "default") ? Le(e.default) : e.minimum !== void 0 ? e.minimum : 0;
}
function d0(e, n) {
  if (De(e, "default"))
    return Le(e.default);
  {
    const r = e.allOf.reduce((o, i) => {
      const t = En(i, n);
      return typeof t == "object" ? { ...o, ...t } : t;
    }, {});
    if (!tP(e, n, r))
      throw new zn(e, "Intersect produced invalid value. Consider using a default value.");
    return r;
  }
}
function p0(e, n) {
  return De(e, "default") ? Le(e.default) : function* () {
  }();
}
function f0(e, n) {
  return De(e, "default") ? Le(e.default) : e.const;
}
function l0(e, n) {
  if (De(e, "default"))
    return Le(e.default);
  throw new zn(e, "Never types cannot be created. Consider using a default value.");
}
function y0(e, n) {
  if (De(e, "default"))
    return Le(e.default);
  throw new zn(e, "Not types must have a default value");
}
function m0(e, n) {
  return De(e, "default") ? Le(e.default) : null;
}
function g0(e, n) {
  return De(e, "default") ? Le(e.default) : e.minimum !== void 0 ? e.minimum : 0;
}
function T0(e, n) {
  if (De(e, "default"))
    return Le(e.default);
  {
    const r = new Set(e.required), o = {};
    for (const [i, t] of Object.entries(e.properties))
      r.has(i) && (o[i] = En(t, n));
    return o;
  }
}
function _0(e, n) {
  return De(e, "default") ? Le(e.default) : Promise.resolve(En(e.item, n));
}
function b0(e, n) {
  const [r, o] = Object.entries(e.patternProperties)[0];
  if (De(e, "default"))
    return Le(e.default);
  if (r === yo || r === lo)
    return {};
  {
    const i = r.slice(1, r.length - 1).split("|"), t = {};
    for (const a of i)
      t[a] = En(o, n);
    return t;
  }
}
function h0(e, n) {
  return De(e, "default") ? Le(e.default) : En(Ea(e, n), n);
}
function I0(e, n) {
  if (De(e, "default"))
    return Le(e.default);
  throw new zn(e, "RegExp types cannot be created. Consider using a default value.");
}
function P0(e, n) {
  if (e.pattern !== void 0) {
    if (De(e, "default"))
      return Le(e.default);
    throw new zn(e, "String types with patterns must specify a default value");
  } else if (e.format !== void 0) {
    if (De(e, "default"))
      return Le(e.default);
    throw new zn(e, "String types with formats must specify a default value");
  } else
    return De(e, "default") ? Le(e.default) : e.minLength !== void 0 ? Array.from({ length: e.minLength }).map(() => " ").join("") : "";
}
function O0(e, n) {
  return De(e, "default") ? Le(e.default) : "value" in e ? Symbol.for(e.value) : Symbol();
}
function A0(e, n) {
  if (De(e, "default"))
    return Le(e.default);
  if (!hI(e))
    throw new zn(e, "Can only create template literals that produce a finite variants. Consider using a default value.");
  return Cf(e)[0];
}
function R0(e, n) {
  if (rP++ > $0)
    throw new zn(e, "Cannot create recursive type as it appears possibly infinite. Consider using a default.");
  return De(e, "default") ? Le(e.default) : En(Ea(e, n), n);
}
function E0(e, n) {
  return De(e, "default") ? Le(e.default) : e.items === void 0 ? [] : Array.from({ length: e.minItems }).map((r, o) => En(e.items[o], n));
}
function w0(e, n) {
  if (De(e, "default"))
    return Le(e.default);
}
function S0(e, n) {
  if (De(e, "default"))
    return Le(e.default);
  if (e.anyOf.length === 0)
    throw new Error("ValueCreate.Union: Cannot create Union with zero variants");
  return En(e.anyOf[0], n);
}
function v0(e, n) {
  return De(e, "default") ? Le(e.default) : e.minByteLength !== void 0 ? new Uint8Array(e.minByteLength) : new Uint8Array(0);
}
function C0(e, n) {
  return De(e, "default") ? Le(e.default) : {};
}
function M0(e, n) {
  if (De(e, "default"))
    return Le(e.default);
}
function x0(e, n) {
  if (De(e, "default"))
    return Le(e.default);
  throw new Error("User defined types must specify a default value");
}
function En(e, n) {
  const r = QI(e, n), o = e;
  switch (o[de]) {
    case "Any":
      return e0(o);
    case "Array":
      return n0(o, r);
    case "AsyncIterator":
      return t0(o);
    case "BigInt":
      return r0(o);
    case "Boolean":
      return i0(o);
    case "Constructor":
      return o0(o, r);
    case "Date":
      return a0(o);
    case "Function":
      return u0(o, r);
    case "Import":
      return s0(o, r);
    case "Integer":
      return c0(o);
    case "Intersect":
      return d0(o, r);
    case "Iterator":
      return p0(o);
    case "Literal":
      return f0(o);
    case "Never":
      return l0(o);
    case "Not":
      return y0(o);
    case "Null":
      return m0(o);
    case "Number":
      return g0(o);
    case "Object":
      return T0(o, r);
    case "Promise":
      return _0(o, r);
    case "Record":
      return b0(o, r);
    case "Ref":
      return h0(o, r);
    case "RegExp":
      return I0(o);
    case "String":
      return P0(o);
    case "Symbol":
      return O0(o);
    case "TemplateLiteral":
      return A0(o);
    case "This":
      return R0(o, r);
    case "Tuple":
      return E0(o, r);
    case "Undefined":
      return w0(o);
    case "Union":
      return S0(o, r);
    case "Uint8Array":
      return v0(o);
    case "Unknown":
      return C0(o);
    case "Void":
      return M0(o);
    default:
      if (!tc(o[de]))
        throw new zn(o, "Unknown type");
      return x0(o);
  }
}
const $0 = 512;
let rP = 0;
function iP(...e) {
  return rP = 0, e.length === 2 ? En(e[0], e[1]) : En(e[0], []);
}
var Gt = {}, Uo = {}, Ht = {}, Vt = {}, et = {}, Wt = {}, Lo = {}, kt = {}, Ne = {}, xy;
function kf() {
  if (xy) return Ne;
  xy = 1, Object.defineProperty(Ne, "__esModule", { value: !0 }), Ne.IsAsyncIterator = e, Ne.IsIterator = n, Ne.IsStandardObject = r, Ne.IsInstanceObject = o, Ne.IsPromise = i, Ne.IsDate = t, Ne.IsMap = a, Ne.IsSet = u, Ne.IsRegExp = c, Ne.IsTypedArray = s, Ne.IsInt8Array = p, Ne.IsUint8Array = d, Ne.IsUint8ClampedArray = f, Ne.IsInt16Array = T, Ne.IsUint16Array = h, Ne.IsInt32Array = I, Ne.IsUint32Array = _, Ne.IsFloat32Array = A, Ne.IsFloat64Array = v, Ne.IsBigInt64Array = j, Ne.IsBigUint64Array = w, Ne.HasPropertyKey = l, Ne.IsObject = R, Ne.IsArray = y, Ne.IsUndefined = P, Ne.IsNull = E, Ne.IsBoolean = b, Ne.IsNumber = x, Ne.IsInteger = N, Ne.IsBigInt = q, Ne.IsString = k, Ne.IsFunction = G, Ne.IsSymbol = Y, Ne.IsValueType = H;
  function e(F) {
    return R(F) && Symbol.asyncIterator in F;
  }
  function n(F) {
    return R(F) && Symbol.iterator in F;
  }
  function r(F) {
    return R(F) && (Object.getPrototypeOf(F) === Object.prototype || Object.getPrototypeOf(F) === null);
  }
  function o(F) {
    return R(F) && !y(F) && G(F.constructor) && F.constructor.name !== "Object";
  }
  function i(F) {
    return F instanceof Promise;
  }
  function t(F) {
    return F instanceof Date && Number.isFinite(F.getTime());
  }
  function a(F) {
    return F instanceof globalThis.Map;
  }
  function u(F) {
    return F instanceof globalThis.Set;
  }
  function c(F) {
    return F instanceof globalThis.RegExp;
  }
  function s(F) {
    return ArrayBuffer.isView(F);
  }
  function p(F) {
    return F instanceof globalThis.Int8Array;
  }
  function d(F) {
    return F instanceof globalThis.Uint8Array;
  }
  function f(F) {
    return F instanceof globalThis.Uint8ClampedArray;
  }
  function T(F) {
    return F instanceof globalThis.Int16Array;
  }
  function h(F) {
    return F instanceof globalThis.Uint16Array;
  }
  function I(F) {
    return F instanceof globalThis.Int32Array;
  }
  function _(F) {
    return F instanceof globalThis.Uint32Array;
  }
  function A(F) {
    return F instanceof globalThis.Float32Array;
  }
  function v(F) {
    return F instanceof globalThis.Float64Array;
  }
  function j(F) {
    return F instanceof globalThis.BigInt64Array;
  }
  function w(F) {
    return F instanceof globalThis.BigUint64Array;
  }
  function l(F, te) {
    return te in F;
  }
  function R(F) {
    return F !== null && typeof F == "object";
  }
  function y(F) {
    return Array.isArray(F) && !ArrayBuffer.isView(F);
  }
  function P(F) {
    return F === void 0;
  }
  function E(F) {
    return F === null;
  }
  function b(F) {
    return typeof F == "boolean";
  }
  function x(F) {
    return typeof F == "number";
  }
  function N(F) {
    return Number.isInteger(F);
  }
  function q(F) {
    return typeof F == "bigint";
  }
  function k(F) {
    return typeof F == "string";
  }
  function G(F) {
    return typeof F == "function";
  }
  function Y(F) {
    return typeof F == "symbol";
  }
  function H(F) {
    return q(F) || b(F) || E(F) || x(F) || k(F) || Y(F) || P(F);
  }
  return Ne;
}
var $y;
function an() {
  return $y || ($y = 1, function(e) {
    var n = kt && kt.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = kt && kt.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ kf(), e);
  }(kt)), kt;
}
var Ny;
function fc() {
  if (Ny) return Lo;
  Ny = 1, Object.defineProperty(Lo, "__esModule", { value: !0 }), Lo.TypeSystemPolicy = void 0;
  const e = /* @__PURE__ */ an();
  var n;
  return function(r) {
    r.InstanceMode = "default", r.ExactOptionalPropertyTypes = !1, r.AllowArrayObject = !1, r.AllowNaN = !1, r.AllowNullVoid = !1;
    function o(c, s) {
      return r.ExactOptionalPropertyTypes ? s in c : c[s] !== void 0;
    }
    r.IsExactOptionalProperty = o;
    function i(c) {
      const s = (0, e.IsObject)(c);
      return r.AllowArrayObject ? s : s && !(0, e.IsArray)(c);
    }
    r.IsObjectLike = i;
    function t(c) {
      return i(c) && !(c instanceof Date) && !(c instanceof Uint8Array);
    }
    r.IsRecordLike = t;
    function a(c) {
      return r.AllowNaN ? (0, e.IsNumber)(c) : Number.isFinite(c);
    }
    r.IsNumberLike = a;
    function u(c) {
      const s = (0, e.IsUndefined)(c);
      return r.AllowNullVoid ? s || c === null : s;
    }
    r.IsVoidLike = u;
  }(n || (Lo.TypeSystemPolicy = n = {})), Lo;
}
var st = {}, Xt = {}, ct = {}, By;
function N0() {
  if (By) return ct;
  By = 1, Object.defineProperty(ct, "__esModule", { value: !0 }), ct.Entries = n, ct.Clear = r, ct.Delete = o, ct.Has = i, ct.Set = t, ct.Get = a;
  const e = /* @__PURE__ */ new Map();
  function n() {
    return new Map(e);
  }
  function r() {
    return e.clear();
  }
  function o(u) {
    return e.delete(u);
  }
  function i(u) {
    return e.has(u);
  }
  function t(u, c) {
    e.set(u, c);
  }
  function a(u) {
    return e.get(u);
  }
  return ct;
}
var dt = {}, jy;
function B0() {
  if (jy) return dt;
  jy = 1, Object.defineProperty(dt, "__esModule", { value: !0 }), dt.Entries = n, dt.Clear = r, dt.Delete = o, dt.Has = i, dt.Set = t, dt.Get = a;
  const e = /* @__PURE__ */ new Map();
  function n() {
    return new Map(e);
  }
  function r() {
    return e.clear();
  }
  function o(u) {
    return e.delete(u);
  }
  function i(u) {
    return e.has(u);
  }
  function t(u, c) {
    e.set(u, c);
  }
  function a(u) {
    return e.get(u);
  }
  return dt;
}
var Dy;
function Eo() {
  return Dy || (Dy = 1, Object.defineProperty(Xt, "__esModule", { value: !0 }), Xt.TypeRegistry = Xt.FormatRegistry = void 0, Xt.FormatRegistry = N0(), Xt.TypeRegistry = B0()), Xt;
}
var zt = {}, Ga = {}, Ha = {}, Va = {}, rn = {}, Fy;
function Nn() {
  if (Fy) return rn;
  Fy = 1, Object.defineProperty(rn, "__esModule", { value: !0 }), rn.HasPropertyKey = e, rn.IsAsyncIterator = n, rn.IsArray = r, rn.IsBigInt = o, rn.IsBoolean = i, rn.IsDate = t, rn.IsFunction = a, rn.IsIterator = u, rn.IsNull = c, rn.IsNumber = s, rn.IsObject = p, rn.IsRegExp = d, rn.IsString = f, rn.IsSymbol = T, rn.IsUint8Array = h, rn.IsUndefined = I;
  function e(_, A) {
    return A in _;
  }
  function n(_) {
    return p(_) && !r(_) && !h(_) && Symbol.asyncIterator in _;
  }
  function r(_) {
    return Array.isArray(_);
  }
  function o(_) {
    return typeof _ == "bigint";
  }
  function i(_) {
    return typeof _ == "boolean";
  }
  function t(_) {
    return _ instanceof globalThis.Date;
  }
  function a(_) {
    return typeof _ == "function";
  }
  function u(_) {
    return p(_) && !r(_) && !h(_) && Symbol.iterator in _;
  }
  function c(_) {
    return _ === null;
  }
  function s(_) {
    return typeof _ == "number";
  }
  function p(_) {
    return typeof _ == "object" && _ !== null;
  }
  function d(_) {
    return _ instanceof globalThis.RegExp;
  }
  function f(_) {
    return typeof _ == "string";
  }
  function T(_) {
    return typeof _ == "symbol";
  }
  function h(_) {
    return _ instanceof globalThis.Uint8Array;
  }
  function I(_) {
    return _ === void 0;
  }
  return rn;
}
var Uy;
function j0() {
  if (Uy) return Va;
  Uy = 1, Object.defineProperty(Va, "__esModule", { value: !0 }), Va.Immutable = a;
  const e = /* @__PURE__ */ Nn();
  function n(u) {
    return globalThis.Object.freeze(u).map((c) => a(c));
  }
  function r(u) {
    return u;
  }
  function o(u) {
    return u;
  }
  function i(u) {
    return u;
  }
  function t(u) {
    const c = {};
    for (const s of Object.getOwnPropertyNames(u))
      c[s] = a(u[s]);
    for (const s of Object.getOwnPropertySymbols(u))
      c[s] = a(u[s]);
    return globalThis.Object.freeze(c);
  }
  function a(u) {
    return e.IsArray(u) ? n(u) : e.IsDate(u) ? u : e.IsUint8Array(u) ? u : e.IsRegExp(u) ? u : e.IsObject(u) ? t(u) : u;
  }
  return Va;
}
var Wa = {}, Ly;
function Bn() {
  if (Ly) return Wa;
  Ly = 1, Object.defineProperty(Wa, "__esModule", { value: !0 }), Wa.Clone = u;
  const e = /* @__PURE__ */ Nn();
  function n(c) {
    return c.map((s) => a(s));
  }
  function r(c) {
    return new Date(c.getTime());
  }
  function o(c) {
    return new Uint8Array(c);
  }
  function i(c) {
    return new RegExp(c.source, c.flags);
  }
  function t(c) {
    const s = {};
    for (const p of Object.getOwnPropertyNames(c))
      s[p] = a(c[p]);
    for (const p of Object.getOwnPropertySymbols(c))
      s[p] = a(c[p]);
    return s;
  }
  function a(c) {
    return e.IsArray(c) ? n(c) : e.IsDate(c) ? r(c) : e.IsUint8Array(c) ? o(c) : e.IsRegExp(c) ? i(c) : e.IsObject(c) ? t(c) : c;
  }
  function u(c) {
    return a(c);
  }
  return Wa;
}
var qy;
function Pe() {
  if (qy) return Ha;
  qy = 1, Object.defineProperty(Ha, "__esModule", { value: !0 }), Ha.CreateType = o;
  const e = /* @__PURE__ */ fc(), n = /* @__PURE__ */ j0(), r = /* @__PURE__ */ Bn();
  function o(i, t) {
    const a = t !== void 0 ? { ...t, ...i } : i;
    switch (e.TypeSystemPolicy.InstanceMode) {
      case "freeze":
        return (0, n.Immutable)(a);
      case "clone":
        return (0, r.Clone)(a);
      default:
        return a;
    }
  }
  return Ha;
}
var Yt = {}, vn = {}, Ky;
function lc() {
  return Ky || (Ky = 1, Object.defineProperty(vn, "__esModule", { value: !0 }), vn.Kind = vn.Hint = vn.OptionalKind = vn.ReadonlyKind = vn.TransformKind = void 0, vn.TransformKind = Symbol.for("TypeBox.Transform"), vn.ReadonlyKind = Symbol.for("TypeBox.Readonly"), vn.OptionalKind = Symbol.for("TypeBox.Optional"), vn.Hint = Symbol.for("TypeBox.Hint"), vn.Kind = Symbol.for("TypeBox.Kind")), vn;
}
var Gy;
function me() {
  return Gy || (Gy = 1, function(e) {
    var n = Yt && Yt.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Yt && Yt.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ lc(), e);
  }(Yt)), Yt;
}
var Hy;
function D0() {
  if (Hy) return Ga;
  Hy = 1, Object.defineProperty(Ga, "__esModule", { value: !0 }), Ga.Unsafe = r;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ me();
  function r(o = {}) {
    return (0, e.CreateType)({ [n.Kind]: o[n.Kind] ?? "Unsafe" }, o);
  }
  return Ga;
}
var Vy;
function yc() {
  return Vy || (Vy = 1, function(e) {
    var n = zt && zt.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = zt && zt.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ D0(), e);
  }(zt)), zt;
}
var Jt = {}, qo = {}, Wy;
function oP() {
  if (Wy) return qo;
  Wy = 1, Object.defineProperty(qo, "__esModule", { value: !0 }), qo.TypeBoxError = void 0;
  class e extends Error {
    constructor(r) {
      super(r);
    }
  }
  return qo.TypeBoxError = e, qo;
}
var ky;
function ze() {
  return ky || (ky = 1, function(e) {
    var n = Jt && Jt.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Jt && Jt.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ oP(), e);
  }(Jt)), Jt;
}
var Xy;
function F0() {
  if (Xy) return st;
  Xy = 1, Object.defineProperty(st, "__esModule", { value: !0 }), st.TypeSystem = st.TypeSystemDuplicateFormat = st.TypeSystemDuplicateTypeKind = void 0;
  const e = /* @__PURE__ */ Eo(), n = /* @__PURE__ */ yc(), r = /* @__PURE__ */ me(), o = /* @__PURE__ */ ze();
  class i extends o.TypeBoxError {
    constructor(c) {
      super(`Duplicate type kind '${c}' detected`);
    }
  }
  st.TypeSystemDuplicateTypeKind = i;
  class t extends o.TypeBoxError {
    constructor(c) {
      super(`Duplicate string format '${c}' detected`);
    }
  }
  st.TypeSystemDuplicateFormat = t;
  var a;
  return function(u) {
    function c(p, d) {
      if (e.TypeRegistry.Has(p))
        throw new i(p);
      return e.TypeRegistry.Set(p, d), (f = {}) => (0, n.Unsafe)({ ...f, [r.Kind]: p });
    }
    u.Type = c;
    function s(p, d) {
      if (e.FormatRegistry.Has(p))
        throw new t(p);
      return e.FormatRegistry.Set(p, d), p;
    }
    u.Format = s;
  }(a || (st.TypeSystem = a = {})), st;
}
var zy;
function Xf() {
  return zy || (zy = 1, function(e) {
    var n = Wt && Wt.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Wt && Wt.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ fc(), e), r(/* @__PURE__ */ F0(), e);
  }(Wt)), Wt;
}
var Qt = {}, ka = {}, Zt = {}, Xa = {}, Yy;
function U0() {
  if (Yy) return Xa;
  Yy = 1, Object.defineProperty(Xa, "__esModule", { value: !0 }), Xa.MappedKey = r;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ me();
  function r(o) {
    return (0, e.CreateType)({
      [n.Kind]: "MappedKey",
      keys: o
    });
  }
  return Xa;
}
var za = {}, Jy;
function aP() {
  if (Jy) return za;
  Jy = 1, Object.defineProperty(za, "__esModule", { value: !0 }), za.MappedResult = r;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ me();
  function r(o) {
    return (0, e.CreateType)({
      [n.Kind]: "MappedResult",
      properties: o
    });
  }
  return za;
}
var Ko = {}, er = {}, Ya = {}, Qy;
function zf() {
  if (Qy) return Ya;
  Qy = 1, Object.defineProperty(Ya, "__esModule", { value: !0 }), Ya.Discard = n;
  function e(r, o) {
    const { [o]: i, ...t } = r;
    return t;
  }
  function n(r, o) {
    return o.reduce((i, t) => e(i, t), r);
  }
  return Ya;
}
var Zy;
function jt() {
  return Zy || (Zy = 1, function(e) {
    var n = er && er.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = er && er.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ zf(), e);
  }(er)), er;
}
var nr = {}, Ja = {}, em;
function L0() {
  if (em) return Ja;
  em = 1, Object.defineProperty(Ja, "__esModule", { value: !0 }), Ja.Array = r;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ me();
  function r(o, i) {
    return (0, e.CreateType)({ [n.Kind]: "Array", type: "array", items: o }, i);
  }
  return Ja;
}
var nm;
function wa() {
  return nm || (nm = 1, function(e) {
    var n = nr && nr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = nr && nr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ L0(), e);
  }(nr)), nr;
}
var tr = {}, Qa = {}, tm;
function q0() {
  if (tm) return Qa;
  tm = 1, Object.defineProperty(Qa, "__esModule", { value: !0 }), Qa.AsyncIterator = r;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ Pe();
  function r(o, i) {
    return (0, n.CreateType)({ [e.Kind]: "AsyncIterator", type: "AsyncIterator", items: o }, i);
  }
  return Qa;
}
var rm;
function Sa() {
  return rm || (rm = 1, function(e) {
    var n = tr && tr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = tr && tr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ q0(), e);
  }(tr)), tr;
}
var rr = {}, Za = {}, im;
function K0() {
  if (im) return Za;
  im = 1, Object.defineProperty(Za, "__esModule", { value: !0 }), Za.Constructor = r;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ me();
  function r(o, i, t) {
    return (0, e.CreateType)({ [n.Kind]: "Constructor", type: "Constructor", parameters: o, returns: i }, t);
  }
  return Za;
}
var om;
function va() {
  return om || (om = 1, function(e) {
    var n = rr && rr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = rr && rr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ K0(), e);
  }(rr)), rr;
}
var ir = {}, eu = {}, am;
function G0() {
  if (am) return eu;
  am = 1, Object.defineProperty(eu, "__esModule", { value: !0 }), eu.Function = r;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ me();
  function r(o, i, t) {
    return (0, e.CreateType)({ [n.Kind]: "Function", type: "Function", parameters: o, returns: i }, t);
  }
  return eu;
}
var um;
function Qi() {
  return um || (um = 1, function(e) {
    var n = ir && ir.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = ir && ir.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ G0(), e);
  }(ir)), ir;
}
var or = {}, nu = {}, ar = {}, ur = {}, tu = {}, sr = {}, sm;
function Dt() {
  return sm || (sm = 1, function(e) {
    var n = sr && sr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = sr && sr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Pe(), e);
  }(sr)), sr;
}
var cm;
function H0() {
  if (cm) return tu;
  cm = 1, Object.defineProperty(tu, "__esModule", { value: !0 }), tu.Computed = r;
  const e = /* @__PURE__ */ Dt(), n = /* @__PURE__ */ lc();
  function r(o, i, t) {
    return (0, e.CreateType)({ [n.Kind]: "Computed", target: o, parameters: i }, t);
  }
  return tu;
}
var dm;
function Ft() {
  return dm || (dm = 1, function(e) {
    var n = ur && ur.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = ur && ur.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ H0(), e);
  }(ur)), ur;
}
var cr = {}, ru = {}, pm;
function V0() {
  if (pm) return ru;
  pm = 1, Object.defineProperty(ru, "__esModule", { value: !0 }), ru.Never = r;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ me();
  function r(o) {
    return (0, e.CreateType)({ [n.Kind]: "Never", not: {} }, o);
  }
  return ru;
}
var fm;
function _n() {
  return fm || (fm = 1, function(e) {
    var n = cr && cr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = cr && cr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ V0(), e);
  }(cr)), cr;
}
var dr = {}, iu = {}, pr = {}, ou = {}, au = {}, Ie = {}, lm;
function qe() {
  if (lm) return Ie;
  lm = 1, Object.defineProperty(Ie, "__esModule", { value: !0 }), Ie.IsReadonly = r, Ie.IsOptional = o, Ie.IsAny = i, Ie.IsArray = t, Ie.IsAsyncIterator = a, Ie.IsBigInt = u, Ie.IsBoolean = c, Ie.IsComputed = s, Ie.IsConstructor = p, Ie.IsDate = d, Ie.IsFunction = f, Ie.IsImport = T, Ie.IsInteger = h, Ie.IsProperties = I, Ie.IsIntersect = _, Ie.IsIterator = A, Ie.IsKindOf = v, Ie.IsLiteralString = j, Ie.IsLiteralNumber = w, Ie.IsLiteralBoolean = l, Ie.IsLiteralValue = R, Ie.IsLiteral = y, Ie.IsMappedKey = P, Ie.IsMappedResult = E, Ie.IsNever = b, Ie.IsNot = x, Ie.IsNull = N, Ie.IsNumber = q, Ie.IsObject = k, Ie.IsPromise = G, Ie.IsRecord = Y, Ie.IsRecursive = H, Ie.IsRef = F, Ie.IsRegExp = te, Ie.IsString = ce, Ie.IsSymbol = Te, Ie.IsTemplateLiteral = Oe, Ie.IsThis = we, Ie.IsTransform = ye, Ie.IsTuple = Ke, Ie.IsUndefined = J, Ie.IsUnion = re, Ie.IsUint8Array = _e, Ie.IsUnknown = Ee, Ie.IsUnsafe = ne, Ie.IsVoid = K, Ie.IsKind = $, Ie.IsSchema = g;
  const e = /* @__PURE__ */ Nn(), n = /* @__PURE__ */ me();
  function r(O) {
    return e.IsObject(O) && O[n.ReadonlyKind] === "Readonly";
  }
  function o(O) {
    return e.IsObject(O) && O[n.OptionalKind] === "Optional";
  }
  function i(O) {
    return v(O, "Any");
  }
  function t(O) {
    return v(O, "Array");
  }
  function a(O) {
    return v(O, "AsyncIterator");
  }
  function u(O) {
    return v(O, "BigInt");
  }
  function c(O) {
    return v(O, "Boolean");
  }
  function s(O) {
    return v(O, "Computed");
  }
  function p(O) {
    return v(O, "Constructor");
  }
  function d(O) {
    return v(O, "Date");
  }
  function f(O) {
    return v(O, "Function");
  }
  function T(O) {
    return v(O, "Import");
  }
  function h(O) {
    return v(O, "Integer");
  }
  function I(O) {
    return e.IsObject(O);
  }
  function _(O) {
    return v(O, "Intersect");
  }
  function A(O) {
    return v(O, "Iterator");
  }
  function v(O, D) {
    return e.IsObject(O) && n.Kind in O && O[n.Kind] === D;
  }
  function j(O) {
    return y(O) && e.IsString(O.const);
  }
  function w(O) {
    return y(O) && e.IsNumber(O.const);
  }
  function l(O) {
    return y(O) && e.IsBoolean(O.const);
  }
  function R(O) {
    return e.IsBoolean(O) || e.IsNumber(O) || e.IsString(O);
  }
  function y(O) {
    return v(O, "Literal");
  }
  function P(O) {
    return v(O, "MappedKey");
  }
  function E(O) {
    return v(O, "MappedResult");
  }
  function b(O) {
    return v(O, "Never");
  }
  function x(O) {
    return v(O, "Not");
  }
  function N(O) {
    return v(O, "Null");
  }
  function q(O) {
    return v(O, "Number");
  }
  function k(O) {
    return v(O, "Object");
  }
  function G(O) {
    return v(O, "Promise");
  }
  function Y(O) {
    return v(O, "Record");
  }
  function H(O) {
    return e.IsObject(O) && n.Hint in O && O[n.Hint] === "Recursive";
  }
  function F(O) {
    return v(O, "Ref");
  }
  function te(O) {
    return v(O, "RegExp");
  }
  function ce(O) {
    return v(O, "String");
  }
  function Te(O) {
    return v(O, "Symbol");
  }
  function Oe(O) {
    return v(O, "TemplateLiteral");
  }
  function we(O) {
    return v(O, "This");
  }
  function ye(O) {
    return e.IsObject(O) && n.TransformKind in O;
  }
  function Ke(O) {
    return v(O, "Tuple");
  }
  function J(O) {
    return v(O, "Undefined");
  }
  function re(O) {
    return v(O, "Union");
  }
  function _e(O) {
    return v(O, "Uint8Array");
  }
  function Ee(O) {
    return v(O, "Unknown");
  }
  function ne(O) {
    return v(O, "Unsafe");
  }
  function K(O) {
    return v(O, "Void");
  }
  function $(O) {
    return e.IsObject(O) && n.Kind in O && e.IsString(O[n.Kind]);
  }
  function g(O) {
    return i(O) || t(O) || c(O) || u(O) || a(O) || s(O) || p(O) || d(O) || f(O) || h(O) || _(O) || A(O) || y(O) || P(O) || E(O) || b(O) || x(O) || N(O) || q(O) || k(O) || G(O) || Y(O) || F(O) || te(O) || ce(O) || Te(O) || Oe(O) || we(O) || Ke(O) || J(O) || re(O) || _e(O) || Ee(O) || ne(O) || K(O) || $(O);
  }
  return Ie;
}
var ym;
function uP() {
  if (ym) return au;
  ym = 1, Object.defineProperty(au, "__esModule", { value: !0 }), au.Optional = c;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ me(), r = /* @__PURE__ */ jt(), o = /* @__PURE__ */ sP(), i = /* @__PURE__ */ qe();
  function t(s) {
    return (0, e.CreateType)((0, r.Discard)(s, [n.OptionalKind]));
  }
  function a(s) {
    return (0, e.CreateType)({ ...s, [n.OptionalKind]: "Optional" });
  }
  function u(s, p) {
    return p === !1 ? t(s) : a(s);
  }
  function c(s, p) {
    const d = p ?? !0;
    return (0, i.IsMappedResult)(s) ? (0, o.OptionalFromMappedResult)(s, d) : u(s, d);
  }
  return au;
}
var mm;
function sP() {
  if (mm) return ou;
  mm = 1, Object.defineProperty(ou, "__esModule", { value: !0 }), ou.OptionalFromMappedResult = i;
  const e = /* @__PURE__ */ un(), n = /* @__PURE__ */ uP();
  function r(t, a) {
    const u = {};
    for (const c of globalThis.Object.getOwnPropertyNames(t))
      u[c] = (0, n.Optional)(t[c], a);
    return u;
  }
  function o(t, a) {
    return r(t.properties, a);
  }
  function i(t, a) {
    const u = o(t, a);
    return (0, e.MappedResult)(u);
  }
  return ou;
}
var gm;
function Ut() {
  return gm || (gm = 1, function(e) {
    var n = pr && pr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = pr && pr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ sP(), e), r(/* @__PURE__ */ uP(), e);
  }(pr)), pr;
}
var uu = {}, Tm;
function cP() {
  if (Tm) return uu;
  Tm = 1, Object.defineProperty(uu, "__esModule", { value: !0 }), uu.IntersectCreate = o;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ me(), r = /* @__PURE__ */ qe();
  function o(i, t = {}) {
    const a = i.every((c) => (0, r.IsObject)(c)), u = (0, r.IsSchema)(t.unevaluatedProperties) ? { unevaluatedProperties: t.unevaluatedProperties } : {};
    return (0, e.CreateType)(t.unevaluatedProperties === !1 || (0, r.IsSchema)(t.unevaluatedProperties) || a ? { ...u, [n.Kind]: "Intersect", type: "object", allOf: i } : { ...u, [n.Kind]: "Intersect", allOf: i }, t);
  }
  return uu;
}
var _m;
function W0() {
  if (_m) return iu;
  _m = 1, Object.defineProperty(iu, "__esModule", { value: !0 }), iu.IntersectEvaluated = d;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ Pe(), r = /* @__PURE__ */ jt(), o = /* @__PURE__ */ _n(), i = /* @__PURE__ */ Ut(), t = /* @__PURE__ */ cP(), a = /* @__PURE__ */ qe();
  function u(f) {
    return f.every((T) => (0, a.IsOptional)(T));
  }
  function c(f) {
    return (0, r.Discard)(f, [e.OptionalKind]);
  }
  function s(f) {
    return f.map((T) => (0, a.IsOptional)(T) ? c(T) : T);
  }
  function p(f, T) {
    return u(f) ? (0, i.Optional)((0, t.IntersectCreate)(s(f), T)) : (0, t.IntersectCreate)(s(f), T);
  }
  function d(f, T = {}) {
    if (f.length === 1)
      return (0, n.CreateType)(f[0], T);
    if (f.length === 0)
      return (0, o.Never)(T);
    if (f.some((h) => (0, a.IsTransform)(h)))
      throw new Error("Cannot intersect transform types");
    return p(f, T);
  }
  return iu;
}
var sd = {}, bm;
function k0() {
  return bm || (bm = 1, Object.defineProperty(sd, "__esModule", { value: !0 })), sd;
}
var su = {}, hm;
function X0() {
  if (hm) return su;
  hm = 1, Object.defineProperty(su, "__esModule", { value: !0 }), su.Intersect = i;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ _n(), r = /* @__PURE__ */ cP(), o = /* @__PURE__ */ qe();
  function i(t, a) {
    if (t.length === 1)
      return (0, e.CreateType)(t[0], a);
    if (t.length === 0)
      return (0, n.Never)(a);
    if (t.some((u) => (0, o.IsTransform)(u)))
      throw new Error("Cannot intersect transform types");
    return (0, r.IntersectCreate)(t, a);
  }
  return su;
}
var Im;
function Gn() {
  return Im || (Im = 1, function(e) {
    var n = dr && dr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = dr && dr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ W0(), e), r(/* @__PURE__ */ k0(), e), r(/* @__PURE__ */ X0(), e);
  }(dr)), dr;
}
var fr = {}, cu = {}, du = {}, Pm;
function dP() {
  if (Pm) return du;
  Pm = 1, Object.defineProperty(du, "__esModule", { value: !0 }), du.UnionCreate = r;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ me();
  function r(o, i) {
    return (0, e.CreateType)({ [n.Kind]: "Union", anyOf: o }, i);
  }
  return du;
}
var Om;
function z0() {
  if (Om) return cu;
  Om = 1, Object.defineProperty(cu, "__esModule", { value: !0 }), cu.UnionEvaluated = d;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ me(), r = /* @__PURE__ */ jt(), o = /* @__PURE__ */ _n(), i = /* @__PURE__ */ Ut(), t = /* @__PURE__ */ dP(), a = /* @__PURE__ */ qe();
  function u(f) {
    return f.some((T) => (0, a.IsOptional)(T));
  }
  function c(f) {
    return f.map((T) => (0, a.IsOptional)(T) ? s(T) : T);
  }
  function s(f) {
    return (0, r.Discard)(f, [n.OptionalKind]);
  }
  function p(f, T) {
    return u(f) ? (0, i.Optional)((0, t.UnionCreate)(c(f), T)) : (0, t.UnionCreate)(c(f), T);
  }
  function d(f, T) {
    return f.length === 1 ? (0, e.CreateType)(f[0], T) : f.length === 0 ? (0, o.Never)(T) : p(f, T);
  }
  return cu;
}
var cd = {}, Am;
function Y0() {
  return Am || (Am = 1, Object.defineProperty(cd, "__esModule", { value: !0 })), cd;
}
var pu = {}, Rm;
function J0() {
  if (Rm) return pu;
  Rm = 1, Object.defineProperty(pu, "__esModule", { value: !0 }), pu.Union = o;
  const e = /* @__PURE__ */ _n(), n = /* @__PURE__ */ Pe(), r = /* @__PURE__ */ dP();
  function o(i, t) {
    return i.length === 0 ? (0, e.Never)(t) : i.length === 1 ? (0, n.CreateType)(i[0], t) : (0, r.UnionCreate)(i, t);
  }
  return pu;
}
var Em;
function Qe() {
  return Em || (Em = 1, function(e) {
    var n = fr && fr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = fr && fr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ z0(), e), r(/* @__PURE__ */ Y0(), e), r(/* @__PURE__ */ J0(), e);
  }(fr)), fr;
}
var fu = {}, lr = {}, yr = {}, mr = {}, wm;
function Yf() {
  if (wm) return mr;
  wm = 1, Object.defineProperty(mr, "__esModule", { value: !0 }), mr.TemplateLiteralParserError = void 0, mr.TemplateLiteralParse = T, mr.TemplateLiteralParseExact = h;
  const e = /* @__PURE__ */ ze();
  class n extends e.TypeBoxError {
  }
  mr.TemplateLiteralParserError = n;
  function r(I) {
    return I.replace(/\\\$/g, "$").replace(/\\\*/g, "*").replace(/\\\^/g, "^").replace(/\\\|/g, "|").replace(/\\\(/g, "(").replace(/\\\)/g, ")");
  }
  function o(I, _, A) {
    return I[_] === A && I.charCodeAt(_ - 1) !== 92;
  }
  function i(I, _) {
    return o(I, _, "(");
  }
  function t(I, _) {
    return o(I, _, ")");
  }
  function a(I, _) {
    return o(I, _, "|");
  }
  function u(I) {
    if (!(i(I, 0) && t(I, I.length - 1)))
      return !1;
    let _ = 0;
    for (let A = 0; A < I.length; A++)
      if (i(I, A) && (_ += 1), t(I, A) && (_ -= 1), _ === 0 && A !== I.length - 1)
        return !1;
    return !0;
  }
  function c(I) {
    return I.slice(1, I.length - 1);
  }
  function s(I) {
    let _ = 0;
    for (let A = 0; A < I.length; A++)
      if (i(I, A) && (_ += 1), t(I, A) && (_ -= 1), a(I, A) && _ === 0)
        return !0;
    return !1;
  }
  function p(I) {
    for (let _ = 0; _ < I.length; _++)
      if (i(I, _))
        return !0;
    return !1;
  }
  function d(I) {
    let [_, A] = [0, 0];
    const v = [];
    for (let w = 0; w < I.length; w++)
      if (i(I, w) && (_ += 1), t(I, w) && (_ -= 1), a(I, w) && _ === 0) {
        const l = I.slice(A, w);
        l.length > 0 && v.push(T(l)), A = w + 1;
      }
    const j = I.slice(A);
    return j.length > 0 && v.push(T(j)), v.length === 0 ? { type: "const", const: "" } : v.length === 1 ? v[0] : { type: "or", expr: v };
  }
  function f(I) {
    function _(j, w) {
      if (!i(j, w))
        throw new n("TemplateLiteralParser: Index must point to open parens");
      let l = 0;
      for (let R = w; R < j.length; R++)
        if (i(j, R) && (l += 1), t(j, R) && (l -= 1), l === 0)
          return [w, R];
      throw new n("TemplateLiteralParser: Unclosed group parens in expression");
    }
    function A(j, w) {
      for (let l = w; l < j.length; l++)
        if (i(j, l))
          return [w, l];
      return [w, j.length];
    }
    const v = [];
    for (let j = 0; j < I.length; j++)
      if (i(I, j)) {
        const [w, l] = _(I, j), R = I.slice(w, l + 1);
        v.push(T(R)), j = l;
      } else {
        const [w, l] = A(I, j), R = I.slice(w, l);
        R.length > 0 && v.push(T(R)), j = l - 1;
      }
    return v.length === 0 ? { type: "const", const: "" } : v.length === 1 ? v[0] : { type: "and", expr: v };
  }
  function T(I) {
    return u(I) ? T(c(I)) : s(I) ? d(I) : p(I) ? f(I) : { type: "const", const: r(I) };
  }
  function h(I) {
    return T(I.slice(1, I.length - 1));
  }
  return mr;
}
var Sm;
function pP() {
  if (Sm) return yr;
  Sm = 1, Object.defineProperty(yr, "__esModule", { value: !0 }), yr.TemplateLiteralFiniteError = void 0, yr.IsTemplateLiteralExpressionFinite = a, yr.IsTemplateLiteralFinite = u;
  const e = /* @__PURE__ */ Yf(), n = /* @__PURE__ */ ze();
  class r extends n.TypeBoxError {
  }
  yr.TemplateLiteralFiniteError = r;
  function o(c) {
    return c.type === "or" && c.expr.length === 2 && c.expr[0].type === "const" && c.expr[0].const === "0" && c.expr[1].type === "const" && c.expr[1].const === "[1-9][0-9]*";
  }
  function i(c) {
    return c.type === "or" && c.expr.length === 2 && c.expr[0].type === "const" && c.expr[0].const === "true" && c.expr[1].type === "const" && c.expr[1].const === "false";
  }
  function t(c) {
    return c.type === "const" && c.const === ".*";
  }
  function a(c) {
    return o(c) || t(c) ? !1 : i(c) ? !0 : c.type === "and" ? c.expr.every((s) => a(s)) : c.type === "or" ? c.expr.every((s) => a(s)) : c.type === "const" ? !0 : (() => {
      throw new r("Unknown expression type");
    })();
  }
  function u(c) {
    const s = (0, e.TemplateLiteralParseExact)(c.pattern);
    return a(s);
  }
  return yr;
}
var gr = {}, vm;
function fP() {
  if (vm) return gr;
  vm = 1, Object.defineProperty(gr, "__esModule", { value: !0 }), gr.TemplateLiteralGenerateError = void 0, gr.TemplateLiteralExpressionGenerate = c, gr.TemplateLiteralGenerate = s;
  const e = /* @__PURE__ */ pP(), n = /* @__PURE__ */ Yf(), r = /* @__PURE__ */ ze();
  class o extends r.TypeBoxError {
  }
  gr.TemplateLiteralGenerateError = o;
  function* i(p) {
    if (p.length === 1)
      return yield* p[0];
    for (const d of p[0])
      for (const f of i(p.slice(1)))
        yield `${d}${f}`;
  }
  function* t(p) {
    return yield* i(p.expr.map((d) => [...c(d)]));
  }
  function* a(p) {
    for (const d of p.expr)
      yield* c(d);
  }
  function* u(p) {
    return yield p.const;
  }
  function* c(p) {
    return p.type === "and" ? yield* t(p) : p.type === "or" ? yield* a(p) : p.type === "const" ? yield* u(p) : (() => {
      throw new o("Unknown expression");
    })();
  }
  function s(p) {
    const d = (0, n.TemplateLiteralParseExact)(p.pattern);
    return (0, e.IsTemplateLiteralExpressionFinite)(d) ? [...c(d)] : [];
  }
  return gr;
}
var lu = {}, Tr = {}, yu = {}, Cm;
function Q0() {
  if (Cm) return yu;
  Cm = 1, Object.defineProperty(yu, "__esModule", { value: !0 }), yu.Literal = r;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ me();
  function r(o, i) {
    return (0, e.CreateType)({
      [n.Kind]: "Literal",
      const: o,
      type: typeof o
    }, i);
  }
  return yu;
}
var Mm;
function In() {
  return Mm || (Mm = 1, function(e) {
    var n = Tr && Tr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Tr && Tr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Q0(), e);
  }(Tr)), Tr;
}
var _r = {}, mu = {}, xm;
function Z0() {
  if (xm) return mu;
  xm = 1, Object.defineProperty(mu, "__esModule", { value: !0 }), mu.Boolean = r;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ Dt();
  function r(o) {
    return (0, n.CreateType)({ [e.Kind]: "Boolean", type: "boolean" }, o);
  }
  return mu;
}
var $m;
function mc() {
  return $m || ($m = 1, function(e) {
    var n = _r && _r.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = _r && _r.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Z0(), e);
  }(_r)), _r;
}
var br = {}, gu = {}, Nm;
function ex() {
  if (Nm) return gu;
  Nm = 1, Object.defineProperty(gu, "__esModule", { value: !0 }), gu.BigInt = r;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ Dt();
  function r(o) {
    return (0, n.CreateType)({ [e.Kind]: "BigInt", type: "bigint" }, o);
  }
  return gu;
}
var Bm;
function Ca() {
  return Bm || (Bm = 1, function(e) {
    var n = br && br.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = br && br.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ ex(), e);
  }(br)), br;
}
var hr = {}, Tu = {}, jm;
function nx() {
  if (jm) return Tu;
  jm = 1, Object.defineProperty(Tu, "__esModule", { value: !0 }), Tu.Number = r;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ me();
  function r(o) {
    return (0, e.CreateType)({ [n.Kind]: "Number", type: "number" }, o);
  }
  return Tu;
}
var Dm;
function wo() {
  return Dm || (Dm = 1, function(e) {
    var n = hr && hr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = hr && hr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ nx(), e);
  }(hr)), hr;
}
var Ir = {}, _u = {}, Fm;
function tx() {
  if (Fm) return _u;
  Fm = 1, Object.defineProperty(_u, "__esModule", { value: !0 }), _u.String = r;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ me();
  function r(o) {
    return (0, e.CreateType)({ [n.Kind]: "String", type: "string" }, o);
  }
  return _u;
}
var Um;
function So() {
  return Um || (Um = 1, function(e) {
    var n = Ir && Ir.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Ir && Ir.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ tx(), e);
  }(Ir)), Ir;
}
var Lm;
function lP() {
  if (Lm) return lu;
  Lm = 1, Object.defineProperty(lu, "__esModule", { value: !0 }), lu.TemplateLiteralSyntax = p;
  const e = /* @__PURE__ */ In(), n = /* @__PURE__ */ mc(), r = /* @__PURE__ */ Ca(), o = /* @__PURE__ */ wo(), i = /* @__PURE__ */ So(), t = /* @__PURE__ */ Qe(), a = /* @__PURE__ */ _n();
  function* u(d) {
    const f = d.trim().replace(/"|'/g, "");
    return f === "boolean" ? yield (0, n.Boolean)() : f === "number" ? yield (0, o.Number)() : f === "bigint" ? yield (0, r.BigInt)() : f === "string" ? yield (0, i.String)() : yield (() => {
      const T = f.split("|").map((h) => (0, e.Literal)(h.trim()));
      return T.length === 0 ? (0, a.Never)() : T.length === 1 ? T[0] : (0, t.UnionEvaluated)(T);
    })();
  }
  function* c(d) {
    if (d[1] !== "{") {
      const f = (0, e.Literal)("$"), T = s(d.slice(1));
      return yield* [f, ...T];
    }
    for (let f = 2; f < d.length; f++)
      if (d[f] === "}") {
        const T = u(d.slice(2, f)), h = s(d.slice(f + 1));
        return yield* [...T, ...h];
      }
    yield (0, e.Literal)(d);
  }
  function* s(d) {
    for (let f = 0; f < d.length; f++)
      if (d[f] === "$") {
        const T = (0, e.Literal)(d.slice(0, f)), h = c(d.slice(f));
        return yield* [T, ...h];
      }
    yield (0, e.Literal)(d);
  }
  function p(d) {
    return [...s(d)];
  }
  return lu;
}
var no = {}, Pr = {}, dd = {}, qm;
function rx() {
  return qm || (qm = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.PatternNeverExact = e.PatternStringExact = e.PatternNumberExact = e.PatternBooleanExact = e.PatternNever = e.PatternString = e.PatternNumber = e.PatternBoolean = void 0, e.PatternBoolean = "(true|false)", e.PatternNumber = "(0|[1-9][0-9]*)", e.PatternString = "(.*)", e.PatternNever = "(?!.*)", e.PatternBooleanExact = `^${e.PatternBoolean}$`, e.PatternNumberExact = `^${e.PatternNumber}$`, e.PatternStringExact = `^${e.PatternString}$`, e.PatternNeverExact = `^${e.PatternNever}$`;
  }(dd)), dd;
}
var Km;
function Ma() {
  return Km || (Km = 1, function(e) {
    var n = Pr && Pr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Pr && Pr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ rx(), e);
  }(Pr)), Pr;
}
var Gm;
function yP() {
  if (Gm) return no;
  Gm = 1, Object.defineProperty(no, "__esModule", { value: !0 }), no.TemplateLiteralPatternError = void 0, no.TemplateLiteralPattern = u;
  const e = /* @__PURE__ */ Ma(), n = /* @__PURE__ */ me(), r = /* @__PURE__ */ ze(), o = /* @__PURE__ */ qe();
  class i extends r.TypeBoxError {
  }
  no.TemplateLiteralPatternError = i;
  function t(c) {
    return c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  function a(c, s) {
    return (0, o.IsTemplateLiteral)(c) ? c.pattern.slice(1, c.pattern.length - 1) : (0, o.IsUnion)(c) ? `(${c.anyOf.map((p) => a(p, s)).join("|")})` : (0, o.IsNumber)(c) ? `${s}${e.PatternNumber}` : (0, o.IsInteger)(c) ? `${s}${e.PatternNumber}` : (0, o.IsBigInt)(c) ? `${s}${e.PatternNumber}` : (0, o.IsString)(c) ? `${s}${e.PatternString}` : (0, o.IsLiteral)(c) ? `${s}${t(c.const.toString())}` : (0, o.IsBoolean)(c) ? `${s}${e.PatternBoolean}` : (() => {
      throw new i(`Unexpected Kind '${c[n.Kind]}'`);
    })();
  }
  function u(c) {
    return `^${c.map((s) => a(s, "")).join("")}$`;
  }
  return no;
}
var bu = {}, Hm;
function ix() {
  if (Hm) return bu;
  Hm = 1, Object.defineProperty(bu, "__esModule", { value: !0 }), bu.TemplateLiteralToUnion = o;
  const e = /* @__PURE__ */ Qe(), n = /* @__PURE__ */ In(), r = /* @__PURE__ */ fP();
  function o(i) {
    const a = (0, r.TemplateLiteralGenerate)(i).map((u) => (0, n.Literal)(u));
    return (0, e.UnionEvaluated)(a);
  }
  return bu;
}
var hu = {}, Vm;
function ox() {
  if (Vm) return hu;
  Vm = 1, Object.defineProperty(hu, "__esModule", { value: !0 }), hu.TemplateLiteral = t;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ lP(), r = /* @__PURE__ */ yP(), o = /* @__PURE__ */ Nn(), i = /* @__PURE__ */ me();
  function t(a, u) {
    const c = (0, o.IsString)(a) ? (0, r.TemplateLiteralPattern)((0, n.TemplateLiteralSyntax)(a)) : (0, r.TemplateLiteralPattern)(a);
    return (0, e.CreateType)({ [i.Kind]: "TemplateLiteral", type: "string", pattern: c }, u);
  }
  return hu;
}
var Wm;
function ot() {
  return Wm || (Wm = 1, function(e) {
    var n = lr && lr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = lr && lr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ pP(), e), r(/* @__PURE__ */ fP(), e), r(/* @__PURE__ */ lP(), e), r(/* @__PURE__ */ Yf(), e), r(/* @__PURE__ */ yP(), e), r(/* @__PURE__ */ ix(), e), r(/* @__PURE__ */ ox(), e);
  }(lr)), lr;
}
var km;
function Jf() {
  if (km) return fu;
  km = 1, Object.defineProperty(fu, "__esModule", { value: !0 }), fu.IndexPropertyKeys = t;
  const e = /* @__PURE__ */ ot(), n = /* @__PURE__ */ qe();
  function r(a) {
    return (0, e.TemplateLiteralGenerate)(a).map((c) => c.toString());
  }
  function o(a) {
    const u = [];
    for (const c of a)
      u.push(...t(c));
    return u;
  }
  function i(a) {
    return [a.toString()];
  }
  function t(a) {
    return [...new Set((0, n.IsTemplateLiteral)(a) ? r(a) : (0, n.IsUnion)(a) ? o(a.anyOf) : (0, n.IsLiteral)(a) ? i(a.const) : (0, n.IsNumber)(a) ? ["[number]"] : (0, n.IsInteger)(a) ? ["[number]"] : [])];
  }
  return fu;
}
var Iu = {}, Xm;
function mP() {
  if (Xm) return Iu;
  Xm = 1, Object.defineProperty(Iu, "__esModule", { value: !0 }), Iu.IndexFromMappedResult = t;
  const e = /* @__PURE__ */ un(), n = /* @__PURE__ */ Jf(), r = /* @__PURE__ */ at();
  function o(a, u, c) {
    const s = {};
    for (const p of Object.getOwnPropertyNames(u))
      s[p] = (0, r.Index)(a, (0, n.IndexPropertyKeys)(u[p]), c);
    return s;
  }
  function i(a, u, c) {
    return o(a, u.properties, c);
  }
  function t(a, u, c) {
    const s = i(a, u, c);
    return (0, e.MappedResult)(s);
  }
  return Iu;
}
var zm;
function Qf() {
  if (zm) return ar;
  zm = 1, Object.defineProperty(ar, "__esModule", { value: !0 }), ar.IndexFromPropertyKey = v, ar.IndexFromPropertyKeys = j, ar.IndexFromComputed = l, ar.Index = R;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ ze(), r = /* @__PURE__ */ Ft(), o = /* @__PURE__ */ _n(), i = /* @__PURE__ */ Gn(), t = /* @__PURE__ */ Qe(), a = /* @__PURE__ */ Jf(), u = /* @__PURE__ */ gP(), c = /* @__PURE__ */ mP(), s = /* @__PURE__ */ qe();
  function p(y, P) {
    return y.map((E) => v(E, P));
  }
  function d(y) {
    return y.filter((P) => !(0, s.IsNever)(P));
  }
  function f(y, P) {
    return (0, i.IntersectEvaluated)(d(p(y, P)));
  }
  function T(y) {
    return y.some((P) => (0, s.IsNever)(P)) ? [] : y;
  }
  function h(y, P) {
    return (0, t.UnionEvaluated)(T(p(y, P)));
  }
  function I(y, P) {
    return P in y ? y[P] : P === "[number]" ? (0, t.UnionEvaluated)(y) : (0, o.Never)();
  }
  function _(y, P) {
    return P === "[number]" ? y : (0, o.Never)();
  }
  function A(y, P) {
    return P in y ? y[P] : (0, o.Never)();
  }
  function v(y, P) {
    return (0, s.IsIntersect)(y) ? f(y.allOf, P) : (0, s.IsUnion)(y) ? h(y.anyOf, P) : (0, s.IsTuple)(y) ? I(y.items ?? [], P) : (0, s.IsArray)(y) ? _(y.items, P) : (0, s.IsObject)(y) ? A(y.properties, P) : (0, o.Never)();
  }
  function j(y, P) {
    return P.map((E) => v(y, E));
  }
  function w(y, P) {
    return (0, t.UnionEvaluated)(j(y, P));
  }
  function l(y, P) {
    return (0, r.Computed)("Index", [y, P]);
  }
  function R(y, P, E) {
    if ((0, s.IsRef)(y) || (0, s.IsRef)(P)) {
      const b = "Index types using Ref parameters require both Type and Key to be of TSchema";
      if (!(0, s.IsSchema)(y) || !(0, s.IsSchema)(P))
        throw new n.TypeBoxError(b);
      return (0, r.Computed)("Index", [y, P]);
    }
    return (0, s.IsMappedResult)(P) ? (0, c.IndexFromMappedResult)(y, P, E) : (0, s.IsMappedKey)(P) ? (0, u.IndexFromMappedKey)(y, P, E) : (0, e.CreateType)((0, s.IsSchema)(P) ? w(y, (0, a.IndexPropertyKeys)(P)) : w(y, P), E);
  }
  return ar;
}
var Ym;
function gP() {
  if (Ym) return nu;
  Ym = 1, Object.defineProperty(nu, "__esModule", { value: !0 }), nu.IndexFromMappedKey = a;
  const e = /* @__PURE__ */ Qf(), n = /* @__PURE__ */ un(), r = /* @__PURE__ */ Bn();
  function o(u, c, s) {
    return { [c]: (0, e.Index)(u, [c], (0, r.Clone)(s)) };
  }
  function i(u, c, s) {
    return c.reduce((p, d) => ({ ...p, ...o(u, d, s) }), {});
  }
  function t(u, c, s) {
    return i(u, c.keys, s);
  }
  function a(u, c, s) {
    const p = t(u, c, s);
    return (0, n.MappedResult)(p);
  }
  return nu;
}
var Jm;
function at() {
  return Jm || (Jm = 1, function(e) {
    var n = or && or.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = or && or.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ gP(), e), r(/* @__PURE__ */ mP(), e), r(/* @__PURE__ */ Jf(), e), r(/* @__PURE__ */ Qf(), e);
  }(or)), or;
}
var Or = {}, Pu = {}, Qm;
function ax() {
  if (Qm) return Pu;
  Qm = 1, Object.defineProperty(Pu, "__esModule", { value: !0 }), Pu.Iterator = r;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ me();
  function r(o, i) {
    return (0, e.CreateType)({ [n.Kind]: "Iterator", type: "Iterator", items: o }, i);
  }
  return Pu;
}
var Zm;
function xa() {
  return Zm || (Zm = 1, function(e) {
    var n = Or && Or.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Or && Or.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ ax(), e);
  }(Or)), Or;
}
var Ar = {}, Go = {}, eg;
function ux() {
  if (eg) return Go;
  eg = 1, Object.defineProperty(Go, "__esModule", { value: !0 }), Go.Object = void 0;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ me(), r = /* @__PURE__ */ qe();
  function o(t) {
    const a = [];
    for (let u in t)
      (0, r.IsOptional)(t[u]) || a.push(u);
    return a;
  }
  function i(t, a) {
    const u = o(t), c = u.length > 0 ? { [n.Kind]: "Object", type: "object", properties: t, required: u } : { [n.Kind]: "Object", type: "object", properties: t };
    return (0, e.CreateType)(c, a);
  }
  return Go.Object = i, Go;
}
var ng;
function jn() {
  return ng || (ng = 1, function(e) {
    var n = Ar && Ar.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Ar && Ar.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ ux(), e);
  }(Ar)), Ar;
}
var Rr = {}, Ou = {}, tg;
function sx() {
  if (tg) return Ou;
  tg = 1, Object.defineProperty(Ou, "__esModule", { value: !0 }), Ou.Promise = r;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ me();
  function r(o, i) {
    return (0, e.CreateType)({ [n.Kind]: "Promise", type: "Promise", item: o }, i);
  }
  return Ou;
}
var rg;
function gc() {
  return rg || (rg = 1, function(e) {
    var n = Rr && Rr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Rr && Rr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ sx(), e);
  }(Rr)), Rr;
}
var Er = {}, Au = {}, Ru = {}, ig;
function TP() {
  if (ig) return Ru;
  ig = 1, Object.defineProperty(Ru, "__esModule", { value: !0 }), Ru.Readonly = c;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ me(), r = /* @__PURE__ */ jt(), o = /* @__PURE__ */ _P(), i = /* @__PURE__ */ qe();
  function t(s) {
    return (0, e.CreateType)((0, r.Discard)(s, [n.ReadonlyKind]));
  }
  function a(s) {
    return (0, e.CreateType)({ ...s, [n.ReadonlyKind]: "Readonly" });
  }
  function u(s, p) {
    return p === !1 ? t(s) : a(s);
  }
  function c(s, p) {
    const d = p ?? !0;
    return (0, i.IsMappedResult)(s) ? (0, o.ReadonlyFromMappedResult)(s, d) : u(s, d);
  }
  return Ru;
}
var og;
function _P() {
  if (og) return Au;
  og = 1, Object.defineProperty(Au, "__esModule", { value: !0 }), Au.ReadonlyFromMappedResult = i;
  const e = /* @__PURE__ */ un(), n = /* @__PURE__ */ TP();
  function r(t, a) {
    const u = {};
    for (const c of globalThis.Object.getOwnPropertyNames(t))
      u[c] = (0, n.Readonly)(t[c], a);
    return u;
  }
  function o(t, a) {
    return r(t.properties, a);
  }
  function i(t, a) {
    const u = o(t, a);
    return (0, e.MappedResult)(u);
  }
  return Au;
}
var ag;
function vo() {
  return ag || (ag = 1, function(e) {
    var n = Er && Er.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Er && Er.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ _P(), e), r(/* @__PURE__ */ TP(), e);
  }(Er)), Er;
}
var wr = {}, Eu = {}, ug;
function cx() {
  if (ug) return Eu;
  ug = 1, Object.defineProperty(Eu, "__esModule", { value: !0 }), Eu.Tuple = r;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ me();
  function r(o, i) {
    return (0, e.CreateType)(o.length > 0 ? { [n.Kind]: "Tuple", type: "array", items: o, additionalItems: !1, minItems: o.length, maxItems: o.length } : { [n.Kind]: "Tuple", type: "array", minItems: o.length, maxItems: o.length }, i);
  }
  return Eu;
}
var sg;
function Lt() {
  return sg || (sg = 1, function(e) {
    var n = wr && wr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = wr && wr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ cx(), e);
  }(wr)), wr;
}
var Sr = {}, Vn = {}, cg;
function dx() {
  if (cg) return Vn;
  cg = 1, Object.defineProperty(Vn, "__esModule", { value: !0 }), Vn.SetIncludes = e, Vn.SetIsSubset = n, Vn.SetDistinct = r, Vn.SetIntersect = o, Vn.SetUnion = i, Vn.SetComplement = t, Vn.SetIntersectMany = u, Vn.SetUnionMany = c;
  function e(s, p) {
    return s.includes(p);
  }
  function n(s, p) {
    return s.every((d) => e(p, d));
  }
  function r(s) {
    return [...new Set(s)];
  }
  function o(s, p) {
    return s.filter((d) => p.includes(d));
  }
  function i(s, p) {
    return [...s, ...p];
  }
  function t(s, p) {
    return s.filter((d) => !p.includes(d));
  }
  function a(s, p) {
    return s.reduce((d, f) => o(d, f), p);
  }
  function u(s) {
    return s.length === 1 ? s[0] : s.length > 1 ? a(s.slice(1), s[0]) : [];
  }
  function c(s) {
    const p = [];
    for (const d of s)
      p.push(...d);
    return p;
  }
  return Vn;
}
var dg;
function Tc() {
  return dg || (dg = 1, function(e) {
    var n = Sr && Sr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Sr && Sr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ dx(), e);
  }(Sr)), Sr;
}
var pg;
function px() {
  if (pg) return Ko;
  pg = 1, Object.defineProperty(Ko, "__esModule", { value: !0 }), Ko.MappedFunctionReturnType = x, Ko.Mapped = N;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ jt(), r = /* @__PURE__ */ wa(), o = /* @__PURE__ */ Sa(), i = /* @__PURE__ */ va(), t = /* @__PURE__ */ Qi(), a = /* @__PURE__ */ at(), u = /* @__PURE__ */ Gn(), c = /* @__PURE__ */ xa(), s = /* @__PURE__ */ In(), p = /* @__PURE__ */ jn(), d = /* @__PURE__ */ Ut(), f = /* @__PURE__ */ gc(), T = /* @__PURE__ */ vo(), h = /* @__PURE__ */ Lt(), I = /* @__PURE__ */ Qe(), _ = /* @__PURE__ */ Tc(), A = /* @__PURE__ */ aP(), v = /* @__PURE__ */ qe();
  function j(q, k) {
    return q in k ? b(q, k[q]) : (0, A.MappedResult)(k);
  }
  function w(q) {
    return { [q]: (0, s.Literal)(q) };
  }
  function l(q) {
    const k = {};
    for (const G of q)
      k[G] = (0, s.Literal)(G);
    return k;
  }
  function R(q, k) {
    return (0, _.SetIncludes)(k, q) ? w(q) : l(k);
  }
  function y(q, k) {
    const G = R(q, k);
    return j(q, G);
  }
  function P(q, k) {
    return k.map((G) => b(q, G));
  }
  function E(q, k) {
    const G = {};
    for (const Y of globalThis.Object.getOwnPropertyNames(k))
      G[Y] = b(q, k[Y]);
    return G;
  }
  function b(q, k) {
    const G = { ...k };
    return (
      // unevaluated modifier types
      (0, v.IsOptional)(k) ? (0, d.Optional)(b(q, (0, n.Discard)(k, [e.OptionalKind]))) : (0, v.IsReadonly)(k) ? (0, T.Readonly)(b(q, (0, n.Discard)(k, [e.ReadonlyKind]))) : (
        // unevaluated mapped types
        (0, v.IsMappedResult)(k) ? j(q, k.properties) : (0, v.IsMappedKey)(k) ? y(q, k.keys) : (
          // unevaluated types
          (0, v.IsConstructor)(k) ? (0, i.Constructor)(P(q, k.parameters), b(q, k.returns), G) : (0, v.IsFunction)(k) ? (0, t.Function)(P(q, k.parameters), b(q, k.returns), G) : (0, v.IsAsyncIterator)(k) ? (0, o.AsyncIterator)(b(q, k.items), G) : (0, v.IsIterator)(k) ? (0, c.Iterator)(b(q, k.items), G) : (0, v.IsIntersect)(k) ? (0, u.Intersect)(P(q, k.allOf), G) : (0, v.IsUnion)(k) ? (0, I.Union)(P(q, k.anyOf), G) : (0, v.IsTuple)(k) ? (0, h.Tuple)(P(q, k.items ?? []), G) : (0, v.IsObject)(k) ? (0, p.Object)(E(q, k.properties), G) : (0, v.IsArray)(k) ? (0, r.Array)(b(q, k.items), G) : (0, v.IsPromise)(k) ? (0, f.Promise)(b(q, k.item), G) : k
        )
      )
    );
  }
  function x(q, k) {
    const G = {};
    for (const Y of q)
      G[Y] = b(Y, k);
    return G;
  }
  function N(q, k, G) {
    const Y = (0, v.IsSchema)(q) ? (0, a.IndexPropertyKeys)(q) : q, H = k({ [e.Kind]: "MappedKey", keys: Y }), F = x(Y, H);
    return (0, p.Object)(F, G);
  }
  return Ko;
}
var fg;
function un() {
  return fg || (fg = 1, function(e) {
    var n = Zt && Zt.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Zt && Zt.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ U0(), e), r(/* @__PURE__ */ aP(), e), r(/* @__PURE__ */ px(), e);
  }(Zt)), Zt;
}
var Ho = {}, vr = {}, wu = {}, lg;
function fx() {
  if (lg) return wu;
  lg = 1, Object.defineProperty(wu, "__esModule", { value: !0 }), wu.Ref = o;
  const e = /* @__PURE__ */ ze(), n = /* @__PURE__ */ Pe(), r = /* @__PURE__ */ me();
  function o(...i) {
    const [t, a] = typeof i[0] == "string" ? [i[0], i[1]] : [i[0].$id, i[1]];
    if (typeof t != "string")
      throw new e.TypeBoxError("Ref: $ref must be a string");
    return (0, n.CreateType)({ [r.Kind]: "Ref", $ref: t }, a);
  }
  return wu;
}
var yg;
function Rt() {
  return yg || (yg = 1, function(e) {
    var n = vr && vr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = vr && vr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ fx(), e);
  }(vr)), vr;
}
var Vo = {}, mg;
function Zf() {
  if (mg) return Vo;
  mg = 1, Object.defineProperty(Vo, "__esModule", { value: !0 }), Vo.KeyOfPropertyKeys = s, Vo.KeyOfPattern = d;
  const e = /* @__PURE__ */ Tc(), n = /* @__PURE__ */ qe();
  function r(f) {
    const T = [];
    for (const h of f)
      T.push(s(h));
    return T;
  }
  function o(f) {
    const T = r(f);
    return (0, e.SetUnionMany)(T);
  }
  function i(f) {
    const T = r(f);
    return (0, e.SetIntersectMany)(T);
  }
  function t(f) {
    return f.map((T, h) => h.toString());
  }
  function a(f) {
    return ["[number]"];
  }
  function u(f) {
    return globalThis.Object.getOwnPropertyNames(f);
  }
  function c(f) {
    return p ? globalThis.Object.getOwnPropertyNames(f).map((h) => h[0] === "^" && h[h.length - 1] === "$" ? h.slice(1, h.length - 1) : h) : [];
  }
  function s(f) {
    return (0, n.IsIntersect)(f) ? o(f.allOf) : (0, n.IsUnion)(f) ? i(f.anyOf) : (0, n.IsTuple)(f) ? t(f.items ?? []) : (0, n.IsArray)(f) ? a(f.items) : (0, n.IsObject)(f) ? u(f.properties) : (0, n.IsRecord)(f) ? c(f.patternProperties) : [];
  }
  let p = !1;
  function d(f) {
    p = !0;
    const T = s(f);
    return p = !1, `^(${T.map((I) => `(${I})`).join("|")})$`;
  }
  return Vo;
}
var gg;
function bP() {
  if (gg) return Ho;
  gg = 1, Object.defineProperty(Ho, "__esModule", { value: !0 }), Ho.KeyOfPropertyKeysToRest = f, Ho.KeyOf = T;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ In(), r = /* @__PURE__ */ wo(), o = /* @__PURE__ */ Ft(), i = /* @__PURE__ */ Rt(), t = /* @__PURE__ */ Zf(), a = /* @__PURE__ */ Qe(), u = /* @__PURE__ */ hP(), c = /* @__PURE__ */ qe();
  function s(h, I) {
    return (0, o.Computed)("KeyOf", [(0, o.Computed)(h, I)]);
  }
  function p(h) {
    return (0, o.Computed)("KeyOf", [(0, i.Ref)(h)]);
  }
  function d(h, I) {
    const _ = (0, t.KeyOfPropertyKeys)(h), A = f(_), v = (0, a.UnionEvaluated)(A);
    return (0, e.CreateType)(v, I);
  }
  function f(h) {
    return h.map((I) => I === "[number]" ? (0, r.Number)() : (0, n.Literal)(I));
  }
  function T(h, I) {
    return (0, c.IsComputed)(h) ? s(h.target, h.parameters) : (0, c.IsRef)(h) ? p(h.$ref) : (0, c.IsMappedResult)(h) ? (0, u.KeyOfFromMappedResult)(h, I) : d(h, I);
  }
  return Ho;
}
var Tg;
function hP() {
  if (Tg) return ka;
  Tg = 1, Object.defineProperty(ka, "__esModule", { value: !0 }), ka.KeyOfFromMappedResult = t;
  const e = /* @__PURE__ */ un(), n = /* @__PURE__ */ bP(), r = /* @__PURE__ */ Bn();
  function o(a, u) {
    const c = {};
    for (const s of globalThis.Object.getOwnPropertyNames(a))
      c[s] = (0, n.KeyOf)(a[s], (0, r.Clone)(u));
    return c;
  }
  function i(a, u) {
    return o(a.properties, u);
  }
  function t(a, u) {
    const c = i(a, u);
    return (0, e.MappedResult)(c);
  }
  return ka;
}
var Su = {}, _g;
function lx() {
  if (_g) return Su;
  _g = 1, Object.defineProperty(Su, "__esModule", { value: !0 }), Su.KeyOfPropertyEntries = r;
  const e = /* @__PURE__ */ Qf(), n = /* @__PURE__ */ Zf();
  function r(o) {
    const i = (0, n.KeyOfPropertyKeys)(o), t = (0, e.IndexFromPropertyKeys)(o, i);
    return i.map((a, u) => [i[u], t[u]]);
  }
  return Su;
}
var bg;
function Qn() {
  return bg || (bg = 1, function(e) {
    var n = Qt && Qt.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Qt && Qt.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ hP(), e), r(/* @__PURE__ */ lx(), e), r(/* @__PURE__ */ Zf(), e), r(/* @__PURE__ */ bP(), e);
  }(Qt)), Qt;
}
var vu = {}, hg;
function el() {
  if (hg) return vu;
  hg = 1, Object.defineProperty(vu, "__esModule", { value: !0 }), vu.ExtendsUndefinedCheck = i;
  const e = /* @__PURE__ */ me();
  function n(t) {
    return t.allOf.every((a) => i(a));
  }
  function r(t) {
    return t.anyOf.some((a) => i(a));
  }
  function o(t) {
    return !i(t.not);
  }
  function i(t) {
    return t[e.Kind] === "Intersect" ? n(t) : t[e.Kind] === "Union" ? r(t) : t[e.Kind] === "Not" ? o(t) : t[e.Kind] === "Undefined";
  }
  return vu;
}
var to = {}, Ig;
function IP() {
  if (Ig) return to;
  Ig = 1, Object.defineProperty(to, "__esModule", { value: !0 }), to.DefaultErrorFunction = r, to.SetErrorFunction = i, to.GetErrorFunction = t;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ SP();
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
  let o = r;
  function i(a) {
    o = a;
  }
  function t() {
    return o;
  }
  return to;
}
var Cr = {}, Mr = {}, Pg;
function yx() {
  if (Pg) return Mr;
  Pg = 1, Object.defineProperty(Mr, "__esModule", { value: !0 }), Mr.TypeDereferenceError = void 0, Mr.Pushref = t, Mr.Deref = a;
  const e = /* @__PURE__ */ ze(), n = /* @__PURE__ */ me(), r = /* @__PURE__ */ kf();
  class o extends e.TypeBoxError {
    constructor(c) {
      super(`Unable to dereference schema with $id '${c.$ref}'`), this.schema = c;
    }
  }
  Mr.TypeDereferenceError = o;
  function i(u, c) {
    const s = c.find((p) => p.$id === u.$ref);
    if (s === void 0)
      throw new o(u);
    return a(s, c);
  }
  function t(u, c) {
    return !(0, r.IsString)(u.$id) || c.some((s) => s.$id === u.$id) || c.push(u), c;
  }
  function a(u, c) {
    return u[n.Kind] === "This" || u[n.Kind] === "Ref" ? i(u, c) : u;
  }
  return Mr;
}
var Og;
function Zn() {
  return Og || (Og = 1, function(e) {
    var n = Cr && Cr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Cr && Cr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ yx(), e);
  }(Cr)), Cr;
}
var xr = {}, ro = {}, Ag;
function mx() {
  if (Ag) return ro;
  Ag = 1, Object.defineProperty(ro, "__esModule", { value: !0 }), ro.ValueHashError = void 0, ro.Hash = E;
  const e = /* @__PURE__ */ an(), n = /* @__PURE__ */ ze();
  class r extends n.TypeBoxError {
    constructor(x) {
      super("Unable to hash value"), this.value = x;
    }
  }
  ro.ValueHashError = r;
  var o;
  (function(b) {
    b[b.Undefined = 0] = "Undefined", b[b.Null = 1] = "Null", b[b.Boolean = 2] = "Boolean", b[b.Number = 3] = "Number", b[b.String = 4] = "String", b[b.Object = 5] = "Object", b[b.Array = 6] = "Array", b[b.Date = 7] = "Date", b[b.Uint8Array = 8] = "Uint8Array", b[b.Symbol = 9] = "Symbol", b[b.BigInt = 10] = "BigInt";
  })(o || (o = {}));
  let i = BigInt("14695981039346656037");
  const [t, a] = [BigInt("1099511628211"), BigInt(
    "18446744073709551616"
    /* 2 ^ 64 */
  )], u = Array.from({ length: 256 }).map((b, x) => BigInt(x)), c = new Float64Array(1), s = new DataView(c.buffer), p = new Uint8Array(c.buffer);
  function* d(b) {
    const x = b === 0 ? 1 : Math.ceil(Math.floor(Math.log2(b) + 1) / 8);
    for (let N = 0; N < x; N++)
      yield b >> 8 * (x - 1 - N) & 255;
  }
  function f(b) {
    P(o.Array);
    for (const x of b)
      y(x);
  }
  function T(b) {
    P(o.Boolean), P(b ? 1 : 0);
  }
  function h(b) {
    P(o.BigInt), s.setBigInt64(0, b);
    for (const x of p)
      P(x);
  }
  function I(b) {
    P(o.Date), y(b.getTime());
  }
  function _(b) {
    P(o.Null);
  }
  function A(b) {
    P(o.Number), s.setFloat64(0, b);
    for (const x of p)
      P(x);
  }
  function v(b) {
    P(o.Object);
    for (const x of globalThis.Object.getOwnPropertyNames(b).sort())
      y(x), y(b[x]);
  }
  function j(b) {
    P(o.String);
    for (let x = 0; x < b.length; x++)
      for (const N of d(b.charCodeAt(x)))
        P(N);
  }
  function w(b) {
    P(o.Symbol), y(b.description);
  }
  function l(b) {
    P(o.Uint8Array);
    for (let x = 0; x < b.length; x++)
      P(b[x]);
  }
  function R(b) {
    return P(o.Undefined);
  }
  function y(b) {
    if ((0, e.IsArray)(b))
      return f(b);
    if ((0, e.IsBoolean)(b))
      return T(b);
    if ((0, e.IsBigInt)(b))
      return h(b);
    if ((0, e.IsDate)(b))
      return I(b);
    if ((0, e.IsNull)(b))
      return _();
    if ((0, e.IsNumber)(b))
      return A(b);
    if ((0, e.IsObject)(b))
      return v(b);
    if ((0, e.IsString)(b))
      return j(b);
    if ((0, e.IsSymbol)(b))
      return w(b);
    if ((0, e.IsUint8Array)(b))
      return l(b);
    if ((0, e.IsUndefined)(b))
      return R();
    throw new r(b);
  }
  function P(b) {
    i = i ^ u[b], i = i * t % a;
  }
  function E(b) {
    return i = BigInt("14695981039346656037"), y(b), i;
  }
  return ro;
}
var Rg;
function $a() {
  return Rg || (Rg = 1, function(e) {
    var n = xr && xr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = xr && xr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ mx(), e);
  }(xr)), xr;
}
var $r = {}, io = {}, Nr = {}, Et = {}, Br = {}, Cu = {}, Eg;
function gx() {
  if (Eg) return Cu;
  Eg = 1, Object.defineProperty(Cu, "__esModule", { value: !0 }), Cu.Any = r;
  const e = /* @__PURE__ */ Dt(), n = /* @__PURE__ */ me();
  function r(o) {
    return (0, e.CreateType)({ [n.Kind]: "Any" }, o);
  }
  return Cu;
}
var wg;
function Na() {
  return wg || (wg = 1, function(e) {
    var n = Br && Br.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Br && Br.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ gx(), e);
  }(Br)), Br;
}
var jr = {}, Mu = {}, Sg;
function Tx() {
  if (Sg) return Mu;
  Sg = 1, Object.defineProperty(Mu, "__esModule", { value: !0 }), Mu.Unknown = r;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ me();
  function r(o) {
    return (0, e.CreateType)({ [n.Kind]: "Unknown" }, o);
  }
  return Mu;
}
var vg;
function Co() {
  return vg || (vg = 1, function(e) {
    var n = jr && jr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = jr && jr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Tx(), e);
  }(jr)), jr;
}
var pt = {}, be = {}, Cg;
function PP() {
  if (Cg) return be;
  Cg = 1, Object.defineProperty(be, "__esModule", { value: !0 }), be.TypeGuardUnknownTypeError = void 0, be.IsReadonly = I, be.IsOptional = _, be.IsAny = A, be.IsArray = v, be.IsAsyncIterator = j, be.IsBigInt = w, be.IsBoolean = l, be.IsComputed = R, be.IsConstructor = y, be.IsDate = P, be.IsFunction = E, be.IsImport = b, be.IsInteger = x, be.IsProperties = N, be.IsIntersect = q, be.IsIterator = k, be.IsKindOf = G, be.IsLiteralString = Y, be.IsLiteralNumber = H, be.IsLiteralBoolean = F, be.IsLiteral = te, be.IsLiteralValue = ce, be.IsMappedKey = Te, be.IsMappedResult = Oe, be.IsNever = we, be.IsNot = ye, be.IsNull = Ke, be.IsNumber = J, be.IsObject = re, be.IsPromise = _e, be.IsRecord = Ee, be.IsRecursive = ne, be.IsRef = K, be.IsRegExp = $, be.IsString = g, be.IsSymbol = O, be.IsTemplateLiteral = D, be.IsThis = V, be.IsTransform = m, be.IsTuple = Z, be.IsUndefined = X, be.IsUnionLiteral = U, be.IsUnion = se, be.IsUint8Array = ue, be.IsUnknown = ge, be.IsUnsafe = oe, be.IsVoid = he, be.IsKind = xe, be.IsSchema = Ce;
  const e = /* @__PURE__ */ Nn(), n = /* @__PURE__ */ me(), r = /* @__PURE__ */ ze();
  class o extends r.TypeBoxError {
  }
  be.TypeGuardUnknownTypeError = o;
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
  function t(S) {
    try {
      return new RegExp(S), !0;
    } catch {
      return !1;
    }
  }
  function a(S) {
    if (!e.IsString(S))
      return !1;
    for (let Se = 0; Se < S.length; Se++) {
      const Ye = S.charCodeAt(Se);
      if (Ye >= 7 && Ye <= 13 || Ye === 27 || Ye === 127)
        return !1;
    }
    return !0;
  }
  function u(S) {
    return p(S) || Ce(S);
  }
  function c(S) {
    return e.IsUndefined(S) || e.IsBigInt(S);
  }
  function s(S) {
    return e.IsUndefined(S) || e.IsNumber(S);
  }
  function p(S) {
    return e.IsUndefined(S) || e.IsBoolean(S);
  }
  function d(S) {
    return e.IsUndefined(S) || e.IsString(S);
  }
  function f(S) {
    return e.IsUndefined(S) || e.IsString(S) && a(S) && t(S);
  }
  function T(S) {
    return e.IsUndefined(S) || e.IsString(S) && a(S);
  }
  function h(S) {
    return e.IsUndefined(S) || Ce(S);
  }
  function I(S) {
    return e.IsObject(S) && S[n.ReadonlyKind] === "Readonly";
  }
  function _(S) {
    return e.IsObject(S) && S[n.OptionalKind] === "Optional";
  }
  function A(S) {
    return G(S, "Any") && d(S.$id);
  }
  function v(S) {
    return G(S, "Array") && S.type === "array" && d(S.$id) && Ce(S.items) && s(S.minItems) && s(S.maxItems) && p(S.uniqueItems) && h(S.contains) && s(S.minContains) && s(S.maxContains);
  }
  function j(S) {
    return G(S, "AsyncIterator") && S.type === "AsyncIterator" && d(S.$id) && Ce(S.items);
  }
  function w(S) {
    return G(S, "BigInt") && S.type === "bigint" && d(S.$id) && c(S.exclusiveMaximum) && c(S.exclusiveMinimum) && c(S.maximum) && c(S.minimum) && c(S.multipleOf);
  }
  function l(S) {
    return G(S, "Boolean") && S.type === "boolean" && d(S.$id);
  }
  function R(S) {
    return G(S, "Computed") && e.IsString(S.target) && e.IsArray(S.parameters) && S.parameters.every((Se) => Ce(Se));
  }
  function y(S) {
    return G(S, "Constructor") && S.type === "Constructor" && d(S.$id) && e.IsArray(S.parameters) && S.parameters.every((Se) => Ce(Se)) && Ce(S.returns);
  }
  function P(S) {
    return G(S, "Date") && S.type === "Date" && d(S.$id) && s(S.exclusiveMaximumTimestamp) && s(S.exclusiveMinimumTimestamp) && s(S.maximumTimestamp) && s(S.minimumTimestamp) && s(S.multipleOfTimestamp);
  }
  function E(S) {
    return G(S, "Function") && S.type === "Function" && d(S.$id) && e.IsArray(S.parameters) && S.parameters.every((Se) => Ce(Se)) && Ce(S.returns);
  }
  function b(S) {
    return G(S, "Import") && e.HasPropertyKey(S, "$defs") && e.IsObject(S.$defs) && N(S.$defs) && e.HasPropertyKey(S, "$ref") && e.IsString(S.$ref) && S.$ref in S.$defs;
  }
  function x(S) {
    return G(S, "Integer") && S.type === "integer" && d(S.$id) && s(S.exclusiveMaximum) && s(S.exclusiveMinimum) && s(S.maximum) && s(S.minimum) && s(S.multipleOf);
  }
  function N(S) {
    return e.IsObject(S) && Object.entries(S).every(([Se, Ye]) => a(Se) && Ce(Ye));
  }
  function q(S) {
    return G(S, "Intersect") && !(e.IsString(S.type) && S.type !== "object") && e.IsArray(S.allOf) && S.allOf.every((Se) => Ce(Se) && !m(Se)) && d(S.type) && (p(S.unevaluatedProperties) || h(S.unevaluatedProperties)) && d(S.$id);
  }
  function k(S) {
    return G(S, "Iterator") && S.type === "Iterator" && d(S.$id) && Ce(S.items);
  }
  function G(S, Se) {
    return e.IsObject(S) && n.Kind in S && S[n.Kind] === Se;
  }
  function Y(S) {
    return te(S) && e.IsString(S.const);
  }
  function H(S) {
    return te(S) && e.IsNumber(S.const);
  }
  function F(S) {
    return te(S) && e.IsBoolean(S.const);
  }
  function te(S) {
    return G(S, "Literal") && d(S.$id) && ce(S.const);
  }
  function ce(S) {
    return e.IsBoolean(S) || e.IsNumber(S) || e.IsString(S);
  }
  function Te(S) {
    return G(S, "MappedKey") && e.IsArray(S.keys) && S.keys.every((Se) => e.IsNumber(Se) || e.IsString(Se));
  }
  function Oe(S) {
    return G(S, "MappedResult") && N(S.properties);
  }
  function we(S) {
    return G(S, "Never") && e.IsObject(S.not) && Object.getOwnPropertyNames(S.not).length === 0;
  }
  function ye(S) {
    return G(S, "Not") && Ce(S.not);
  }
  function Ke(S) {
    return G(S, "Null") && S.type === "null" && d(S.$id);
  }
  function J(S) {
    return G(S, "Number") && S.type === "number" && d(S.$id) && s(S.exclusiveMaximum) && s(S.exclusiveMinimum) && s(S.maximum) && s(S.minimum) && s(S.multipleOf);
  }
  function re(S) {
    return G(S, "Object") && S.type === "object" && d(S.$id) && N(S.properties) && u(S.additionalProperties) && s(S.minProperties) && s(S.maxProperties);
  }
  function _e(S) {
    return G(S, "Promise") && S.type === "Promise" && d(S.$id) && Ce(S.item);
  }
  function Ee(S) {
    return G(S, "Record") && S.type === "object" && d(S.$id) && u(S.additionalProperties) && e.IsObject(S.patternProperties) && ((Se) => {
      const Ye = Object.getOwnPropertyNames(Se.patternProperties);
      return Ye.length === 1 && t(Ye[0]) && e.IsObject(Se.patternProperties) && Ce(Se.patternProperties[Ye[0]]);
    })(S);
  }
  function ne(S) {
    return e.IsObject(S) && n.Hint in S && S[n.Hint] === "Recursive";
  }
  function K(S) {
    return G(S, "Ref") && d(S.$id) && e.IsString(S.$ref);
  }
  function $(S) {
    return G(S, "RegExp") && d(S.$id) && e.IsString(S.source) && e.IsString(S.flags) && s(S.maxLength) && s(S.minLength);
  }
  function g(S) {
    return G(S, "String") && S.type === "string" && d(S.$id) && s(S.minLength) && s(S.maxLength) && f(S.pattern) && T(S.format);
  }
  function O(S) {
    return G(S, "Symbol") && S.type === "symbol" && d(S.$id);
  }
  function D(S) {
    return G(S, "TemplateLiteral") && S.type === "string" && e.IsString(S.pattern) && S.pattern[0] === "^" && S.pattern[S.pattern.length - 1] === "$";
  }
  function V(S) {
    return G(S, "This") && d(S.$id) && e.IsString(S.$ref);
  }
  function m(S) {
    return e.IsObject(S) && n.TransformKind in S;
  }
  function Z(S) {
    return G(S, "Tuple") && S.type === "array" && d(S.$id) && e.IsNumber(S.minItems) && e.IsNumber(S.maxItems) && S.minItems === S.maxItems && // empty
    (e.IsUndefined(S.items) && e.IsUndefined(S.additionalItems) && S.minItems === 0 || e.IsArray(S.items) && S.items.every((Se) => Ce(Se)));
  }
  function X(S) {
    return G(S, "Undefined") && S.type === "undefined" && d(S.$id);
  }
  function U(S) {
    return se(S) && S.anyOf.every((Se) => Y(Se) || H(Se));
  }
  function se(S) {
    return G(S, "Union") && d(S.$id) && e.IsObject(S) && e.IsArray(S.anyOf) && S.anyOf.every((Se) => Ce(Se));
  }
  function ue(S) {
    return G(S, "Uint8Array") && S.type === "Uint8Array" && d(S.$id) && s(S.minByteLength) && s(S.maxByteLength);
  }
  function ge(S) {
    return G(S, "Unknown") && d(S.$id);
  }
  function oe(S) {
    return G(S, "Unsafe");
  }
  function he(S) {
    return G(S, "Void") && S.type === "void" && d(S.$id);
  }
  function xe(S) {
    return e.IsObject(S) && n.Kind in S && e.IsString(S[n.Kind]) && !i.includes(S[n.Kind]);
  }
  function Ce(S) {
    return e.IsObject(S) && (A(S) || v(S) || l(S) || w(S) || j(S) || R(S) || y(S) || P(S) || E(S) || x(S) || q(S) || k(S) || te(S) || Te(S) || Oe(S) || we(S) || ye(S) || Ke(S) || J(S) || re(S) || _e(S) || Ee(S) || K(S) || $(S) || g(S) || O(S) || D(S) || V(S) || Z(S) || X(S) || se(S) || ue(S) || ge(S) || oe(S) || he(S) || xe(S));
  }
  return be;
}
var Mg;
function OP() {
  return Mg || (Mg = 1, Object.defineProperty(pt, "__esModule", { value: !0 }), pt.ValueGuard = pt.TypeGuard = pt.KindGuard = void 0, pt.KindGuard = /* @__PURE__ */ qe(), pt.TypeGuard = /* @__PURE__ */ PP(), pt.ValueGuard = /* @__PURE__ */ Nn()), pt;
}
var xg;
function AP() {
  if (xg) return Et;
  xg = 1, Object.defineProperty(Et, "__esModule", { value: !0 }), Et.ExtendsResult = Et.ExtendsResolverError = void 0, Et.ExtendsCheck = bn;
  const e = /* @__PURE__ */ Na(), n = /* @__PURE__ */ Qi(), r = /* @__PURE__ */ wo(), o = /* @__PURE__ */ So(), i = /* @__PURE__ */ Co(), t = /* @__PURE__ */ ot(), a = /* @__PURE__ */ Ma(), u = /* @__PURE__ */ me(), c = /* @__PURE__ */ ze(), s = /* @__PURE__ */ OP();
  class p extends c.TypeBoxError {
  }
  Et.ExtendsResolverError = p;
  var d;
  (function(C) {
    C[C.Union = 0] = "Union", C[C.True = 1] = "True", C[C.False = 2] = "False";
  })(d || (Et.ExtendsResult = d = {}));
  function f(C) {
    return C === d.False ? C : d.True;
  }
  function T(C) {
    throw new p(C);
  }
  function h(C) {
    return s.TypeGuard.IsNever(C) || s.TypeGuard.IsIntersect(C) || s.TypeGuard.IsUnion(C) || s.TypeGuard.IsUnknown(C) || s.TypeGuard.IsAny(C);
  }
  function I(C, M) {
    return s.TypeGuard.IsNever(M) ? H() : s.TypeGuard.IsIntersect(M) ? q(C, M) : s.TypeGuard.IsUnion(M) ? ie(C, M) : s.TypeGuard.IsUnknown(M) ? fe() : s.TypeGuard.IsAny(M) ? _() : T("StructuralRight");
  }
  function _(C, M) {
    return d.True;
  }
  function A(C, M) {
    return s.TypeGuard.IsIntersect(M) ? q(C, M) : s.TypeGuard.IsUnion(M) && M.anyOf.some((ve) => s.TypeGuard.IsAny(ve) || s.TypeGuard.IsUnknown(ve)) ? d.True : s.TypeGuard.IsUnion(M) ? d.Union : s.TypeGuard.IsUnknown(M) || s.TypeGuard.IsAny(M) ? d.True : d.Union;
  }
  function v(C, M) {
    return s.TypeGuard.IsUnknown(C) ? d.False : s.TypeGuard.IsAny(C) ? d.Union : s.TypeGuard.IsNever(C) ? d.True : d.False;
  }
  function j(C, M) {
    return s.TypeGuard.IsObject(M) && O(M) ? d.True : h(M) ? I(C, M) : s.TypeGuard.IsArray(M) ? f(Ae(C.items, M.items)) : d.False;
  }
  function w(C, M) {
    return h(M) ? I(C, M) : s.TypeGuard.IsAsyncIterator(M) ? f(Ae(C.items, M.items)) : d.False;
  }
  function l(C, M) {
    return h(M) ? I(C, M) : s.TypeGuard.IsObject(M) ? m(C, M) : s.TypeGuard.IsRecord(M) ? ue(C, M) : s.TypeGuard.IsBigInt(M) ? d.True : d.False;
  }
  function R(C, M) {
    return s.TypeGuard.IsLiteralBoolean(C) || s.TypeGuard.IsBoolean(C) ? d.True : d.False;
  }
  function y(C, M) {
    return h(M) ? I(C, M) : s.TypeGuard.IsObject(M) ? m(C, M) : s.TypeGuard.IsRecord(M) ? ue(C, M) : s.TypeGuard.IsBoolean(M) ? d.True : d.False;
  }
  function P(C, M) {
    return h(M) ? I(C, M) : s.TypeGuard.IsObject(M) ? m(C, M) : s.TypeGuard.IsConstructor(M) ? C.parameters.length > M.parameters.length ? d.False : C.parameters.every((ve, hn) => f(Ae(M.parameters[hn], ve)) === d.True) ? f(Ae(C.returns, M.returns)) : d.False : d.False;
  }
  function E(C, M) {
    return h(M) ? I(C, M) : s.TypeGuard.IsObject(M) ? m(C, M) : s.TypeGuard.IsRecord(M) ? ue(C, M) : s.TypeGuard.IsDate(M) ? d.True : d.False;
  }
  function b(C, M) {
    return h(M) ? I(C, M) : s.TypeGuard.IsObject(M) ? m(C, M) : s.TypeGuard.IsFunction(M) ? C.parameters.length > M.parameters.length ? d.False : C.parameters.every((ve, hn) => f(Ae(M.parameters[hn], ve)) === d.True) ? f(Ae(C.returns, M.returns)) : d.False : d.False;
  }
  function x(C, M) {
    return s.TypeGuard.IsLiteral(C) && s.ValueGuard.IsNumber(C.const) || s.TypeGuard.IsNumber(C) || s.TypeGuard.IsInteger(C) ? d.True : d.False;
  }
  function N(C, M) {
    return s.TypeGuard.IsInteger(M) || s.TypeGuard.IsNumber(M) ? d.True : h(M) ? I(C, M) : s.TypeGuard.IsObject(M) ? m(C, M) : s.TypeGuard.IsRecord(M) ? ue(C, M) : d.False;
  }
  function q(C, M) {
    return M.allOf.every((ve) => Ae(C, ve) === d.True) ? d.True : d.False;
  }
  function k(C, M) {
    return C.allOf.some((ve) => Ae(ve, M) === d.True) ? d.True : d.False;
  }
  function G(C, M) {
    return h(M) ? I(C, M) : s.TypeGuard.IsIterator(M) ? f(Ae(C.items, M.items)) : d.False;
  }
  function Y(C, M) {
    return s.TypeGuard.IsLiteral(M) && M.const === C.const ? d.True : h(M) ? I(C, M) : s.TypeGuard.IsObject(M) ? m(C, M) : s.TypeGuard.IsRecord(M) ? ue(C, M) : s.TypeGuard.IsString(M) ? he(C) : s.TypeGuard.IsNumber(M) ? Oe(C) : s.TypeGuard.IsInteger(M) ? x(C) : s.TypeGuard.IsBoolean(M) ? R(C) : d.False;
  }
  function H(C, M) {
    return d.False;
  }
  function F(C, M) {
    return d.True;
  }
  function te(C) {
    let [M, ve] = [C, 0];
    for (; s.TypeGuard.IsNot(M); )
      M = M.not, ve += 1;
    return ve % 2 === 0 ? M : (0, i.Unknown)();
  }
  function ce(C, M) {
    return s.TypeGuard.IsNot(C) ? Ae(te(C), M) : s.TypeGuard.IsNot(M) ? Ae(C, te(M)) : T("Invalid fallthrough for Not");
  }
  function Te(C, M) {
    return h(M) ? I(C, M) : s.TypeGuard.IsObject(M) ? m(C, M) : s.TypeGuard.IsRecord(M) ? ue(C, M) : s.TypeGuard.IsNull(M) ? d.True : d.False;
  }
  function Oe(C, M) {
    return s.TypeGuard.IsLiteralNumber(C) || s.TypeGuard.IsNumber(C) || s.TypeGuard.IsInteger(C) ? d.True : d.False;
  }
  function we(C, M) {
    return h(M) ? I(C, M) : s.TypeGuard.IsObject(M) ? m(C, M) : s.TypeGuard.IsRecord(M) ? ue(C, M) : s.TypeGuard.IsInteger(M) || s.TypeGuard.IsNumber(M) ? d.True : d.False;
  }
  function ye(C, M) {
    return Object.getOwnPropertyNames(C.properties).length === M;
  }
  function Ke(C) {
    return O(C);
  }
  function J(C) {
    return ye(C, 0) || ye(C, 1) && "description" in C.properties && s.TypeGuard.IsUnion(C.properties.description) && C.properties.description.anyOf.length === 2 && (s.TypeGuard.IsString(C.properties.description.anyOf[0]) && s.TypeGuard.IsUndefined(C.properties.description.anyOf[1]) || s.TypeGuard.IsString(C.properties.description.anyOf[1]) && s.TypeGuard.IsUndefined(C.properties.description.anyOf[0]));
  }
  function re(C) {
    return ye(C, 0);
  }
  function _e(C) {
    return ye(C, 0);
  }
  function Ee(C) {
    return ye(C, 0);
  }
  function ne(C) {
    return ye(C, 0);
  }
  function K(C) {
    return O(C);
  }
  function $(C) {
    const M = (0, r.Number)();
    return ye(C, 0) || ye(C, 1) && "length" in C.properties && f(Ae(C.properties.length, M)) === d.True;
  }
  function g(C) {
    return ye(C, 0);
  }
  function O(C) {
    const M = (0, r.Number)();
    return ye(C, 0) || ye(C, 1) && "length" in C.properties && f(Ae(C.properties.length, M)) === d.True;
  }
  function D(C) {
    const M = (0, n.Function)([(0, e.Any)()], (0, e.Any)());
    return ye(C, 0) || ye(C, 1) && "then" in C.properties && f(Ae(C.properties.then, M)) === d.True;
  }
  function V(C, M) {
    return Ae(C, M) === d.False || s.TypeGuard.IsOptional(C) && !s.TypeGuard.IsOptional(M) ? d.False : d.True;
  }
  function m(C, M) {
    return s.TypeGuard.IsUnknown(C) ? d.False : s.TypeGuard.IsAny(C) ? d.Union : s.TypeGuard.IsNever(C) || s.TypeGuard.IsLiteralString(C) && Ke(M) || s.TypeGuard.IsLiteralNumber(C) && re(M) || s.TypeGuard.IsLiteralBoolean(C) && _e(M) || s.TypeGuard.IsSymbol(C) && J(M) || s.TypeGuard.IsBigInt(C) && Ee(M) || s.TypeGuard.IsString(C) && Ke(M) || s.TypeGuard.IsSymbol(C) && J(M) || s.TypeGuard.IsNumber(C) && re(M) || s.TypeGuard.IsInteger(C) && re(M) || s.TypeGuard.IsBoolean(C) && _e(M) || s.TypeGuard.IsUint8Array(C) && K(M) || s.TypeGuard.IsDate(C) && ne(M) || s.TypeGuard.IsConstructor(C) && g(M) || s.TypeGuard.IsFunction(C) && $(M) ? d.True : s.TypeGuard.IsRecord(C) && s.TypeGuard.IsString(U(C)) ? M[u.Hint] === "Record" ? d.True : d.False : s.TypeGuard.IsRecord(C) && s.TypeGuard.IsNumber(U(C)) ? ye(M, 0) ? d.True : d.False : d.False;
  }
  function Z(C, M) {
    return h(M) ? I(C, M) : s.TypeGuard.IsRecord(M) ? ue(C, M) : s.TypeGuard.IsObject(M) ? (() => {
      for (const ve of Object.getOwnPropertyNames(M.properties)) {
        if (!(ve in C.properties) && !s.TypeGuard.IsOptional(M.properties[ve]))
          return d.False;
        if (s.TypeGuard.IsOptional(M.properties[ve]))
          return d.True;
        if (V(C.properties[ve], M.properties[ve]) === d.False)
          return d.False;
      }
      return d.True;
    })() : d.False;
  }
  function X(C, M) {
    return h(M) ? I(C, M) : s.TypeGuard.IsObject(M) && D(M) ? d.True : s.TypeGuard.IsPromise(M) ? f(Ae(C.item, M.item)) : d.False;
  }
  function U(C) {
    return a.PatternNumberExact in C.patternProperties ? (0, r.Number)() : a.PatternStringExact in C.patternProperties ? (0, o.String)() : T("Unknown record key pattern");
  }
  function se(C) {
    return a.PatternNumberExact in C.patternProperties ? C.patternProperties[a.PatternNumberExact] : a.PatternStringExact in C.patternProperties ? C.patternProperties[a.PatternStringExact] : T("Unable to get record value schema");
  }
  function ue(C, M) {
    const [ve, hn] = [U(M), se(M)];
    return s.TypeGuard.IsLiteralString(C) && s.TypeGuard.IsNumber(ve) && f(Ae(C, hn)) === d.True ? d.True : s.TypeGuard.IsUint8Array(C) && s.TypeGuard.IsNumber(ve) || s.TypeGuard.IsString(C) && s.TypeGuard.IsNumber(ve) || s.TypeGuard.IsArray(C) && s.TypeGuard.IsNumber(ve) ? Ae(C, hn) : s.TypeGuard.IsObject(C) ? (() => {
      for (const jc of Object.getOwnPropertyNames(C.properties))
        if (V(hn, C.properties[jc]) === d.False)
          return d.False;
      return d.True;
    })() : d.False;
  }
  function ge(C, M) {
    return h(M) ? I(C, M) : s.TypeGuard.IsObject(M) ? m(C, M) : s.TypeGuard.IsRecord(M) ? Ae(se(C), se(M)) : d.False;
  }
  function oe(C, M) {
    const ve = s.TypeGuard.IsRegExp(C) ? (0, o.String)() : C, hn = s.TypeGuard.IsRegExp(M) ? (0, o.String)() : M;
    return Ae(ve, hn);
  }
  function he(C, M) {
    return s.TypeGuard.IsLiteral(C) && s.ValueGuard.IsString(C.const) || s.TypeGuard.IsString(C) ? d.True : d.False;
  }
  function xe(C, M) {
    return h(M) ? I(C, M) : s.TypeGuard.IsObject(M) ? m(C, M) : s.TypeGuard.IsRecord(M) ? ue(C, M) : s.TypeGuard.IsString(M) ? d.True : d.False;
  }
  function Ce(C, M) {
    return h(M) ? I(C, M) : s.TypeGuard.IsObject(M) ? m(C, M) : s.TypeGuard.IsRecord(M) ? ue(C, M) : s.TypeGuard.IsSymbol(M) ? d.True : d.False;
  }
  function S(C, M) {
    return s.TypeGuard.IsTemplateLiteral(C) ? Ae((0, t.TemplateLiteralToUnion)(C), M) : s.TypeGuard.IsTemplateLiteral(M) ? Ae(C, (0, t.TemplateLiteralToUnion)(M)) : T("Invalid fallthrough for TemplateLiteral");
  }
  function Se(C, M) {
    return s.TypeGuard.IsArray(M) && C.items !== void 0 && C.items.every((ve) => Ae(ve, M.items) === d.True);
  }
  function Ye(C, M) {
    return s.TypeGuard.IsNever(C) ? d.True : s.TypeGuard.IsUnknown(C) ? d.False : s.TypeGuard.IsAny(C) ? d.Union : d.False;
  }
  function Kt(C, M) {
    return h(M) ? I(C, M) : s.TypeGuard.IsObject(M) && O(M) || s.TypeGuard.IsArray(M) && Se(C, M) ? d.True : s.TypeGuard.IsTuple(M) ? s.ValueGuard.IsUndefined(C.items) && !s.ValueGuard.IsUndefined(M.items) || !s.ValueGuard.IsUndefined(C.items) && s.ValueGuard.IsUndefined(M.items) ? d.False : s.ValueGuard.IsUndefined(C.items) && !s.ValueGuard.IsUndefined(M.items) || C.items.every((ve, hn) => Ae(ve, M.items[hn]) === d.True) ? d.True : d.False : d.False;
  }
  function eo(C, M) {
    return h(M) ? I(C, M) : s.TypeGuard.IsObject(M) ? m(C, M) : s.TypeGuard.IsRecord(M) ? ue(C, M) : s.TypeGuard.IsUint8Array(M) ? d.True : d.False;
  }
  function L(C, M) {
    return h(M) ? I(C, M) : s.TypeGuard.IsObject(M) ? m(C, M) : s.TypeGuard.IsRecord(M) ? ue(C, M) : s.TypeGuard.IsVoid(M) ? le(C) : s.TypeGuard.IsUndefined(M) ? d.True : d.False;
  }
  function ie(C, M) {
    return M.anyOf.some((ve) => Ae(C, ve) === d.True) ? d.True : d.False;
  }
  function z(C, M) {
    return C.anyOf.every((ve) => Ae(ve, M) === d.True) ? d.True : d.False;
  }
  function fe(C, M) {
    return d.True;
  }
  function ae(C, M) {
    return s.TypeGuard.IsNever(M) ? H() : s.TypeGuard.IsIntersect(M) ? q(C, M) : s.TypeGuard.IsUnion(M) ? ie(C, M) : s.TypeGuard.IsAny(M) ? _() : s.TypeGuard.IsString(M) ? he(C) : s.TypeGuard.IsNumber(M) ? Oe(C) : s.TypeGuard.IsInteger(M) ? x(C) : s.TypeGuard.IsBoolean(M) ? R(C) : s.TypeGuard.IsArray(M) ? v(C) : s.TypeGuard.IsTuple(M) ? Ye(C) : s.TypeGuard.IsObject(M) ? m(C, M) : s.TypeGuard.IsUnknown(M) ? d.True : d.False;
  }
  function le(C, M) {
    return s.TypeGuard.IsUndefined(C) || s.TypeGuard.IsUndefined(C) ? d.True : d.False;
  }
  function Me(C, M) {
    return s.TypeGuard.IsIntersect(M) ? q(C, M) : s.TypeGuard.IsUnion(M) ? ie(C, M) : s.TypeGuard.IsUnknown(M) ? fe() : s.TypeGuard.IsAny(M) ? _() : s.TypeGuard.IsObject(M) ? m(C, M) : s.TypeGuard.IsVoid(M) ? d.True : d.False;
  }
  function Ae(C, M) {
    return (
      // resolvable
      s.TypeGuard.IsTemplateLiteral(C) || s.TypeGuard.IsTemplateLiteral(M) ? S(C, M) : s.TypeGuard.IsRegExp(C) || s.TypeGuard.IsRegExp(M) ? oe(C, M) : s.TypeGuard.IsNot(C) || s.TypeGuard.IsNot(M) ? ce(C, M) : (
        // standard
        s.TypeGuard.IsAny(C) ? A(C, M) : s.TypeGuard.IsArray(C) ? j(C, M) : s.TypeGuard.IsBigInt(C) ? l(C, M) : s.TypeGuard.IsBoolean(C) ? y(C, M) : s.TypeGuard.IsAsyncIterator(C) ? w(C, M) : s.TypeGuard.IsConstructor(C) ? P(C, M) : s.TypeGuard.IsDate(C) ? E(C, M) : s.TypeGuard.IsFunction(C) ? b(C, M) : s.TypeGuard.IsInteger(C) ? N(C, M) : s.TypeGuard.IsIntersect(C) ? k(C, M) : s.TypeGuard.IsIterator(C) ? G(C, M) : s.TypeGuard.IsLiteral(C) ? Y(C, M) : s.TypeGuard.IsNever(C) ? F() : s.TypeGuard.IsNull(C) ? Te(C, M) : s.TypeGuard.IsNumber(C) ? we(C, M) : s.TypeGuard.IsObject(C) ? Z(C, M) : s.TypeGuard.IsRecord(C) ? ge(C, M) : s.TypeGuard.IsString(C) ? xe(C, M) : s.TypeGuard.IsSymbol(C) ? Ce(C, M) : s.TypeGuard.IsTuple(C) ? Kt(C, M) : s.TypeGuard.IsPromise(C) ? X(C, M) : s.TypeGuard.IsUint8Array(C) ? eo(C, M) : s.TypeGuard.IsUndefined(C) ? L(C, M) : s.TypeGuard.IsUnion(C) ? z(C, M) : s.TypeGuard.IsUnknown(C) ? ae(C, M) : s.TypeGuard.IsVoid(C) ? Me(C, M) : T(`Unknown left type operand '${C[u.Kind]}'`)
      )
    );
  }
  function bn(C, M) {
    return Ae(C, M);
  }
  return Et;
}
var xu = {}, $u = {}, Nu = {}, $g;
function RP() {
  if ($g) return Nu;
  $g = 1, Object.defineProperty(Nu, "__esModule", { value: !0 }), Nu.ExtendsFromMappedResult = t;
  const e = /* @__PURE__ */ un(), n = /* @__PURE__ */ nl(), r = /* @__PURE__ */ Bn();
  function o(a, u, c, s, p) {
    const d = {};
    for (const f of globalThis.Object.getOwnPropertyNames(a))
      d[f] = (0, n.Extends)(a[f], u, c, s, (0, r.Clone)(p));
    return d;
  }
  function i(a, u, c, s, p) {
    return o(a.properties, u, c, s, p);
  }
  function t(a, u, c, s, p) {
    const d = i(a, u, c, s, p);
    return (0, e.MappedResult)(d);
  }
  return Nu;
}
var Ng;
function nl() {
  if (Ng) return $u;
  Ng = 1, Object.defineProperty($u, "__esModule", { value: !0 }), $u.Extends = u;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ Qe(), r = /* @__PURE__ */ AP(), o = /* @__PURE__ */ EP(), i = /* @__PURE__ */ RP(), t = /* @__PURE__ */ qe();
  function a(c, s, p, d) {
    const f = (0, r.ExtendsCheck)(c, s);
    return f === r.ExtendsResult.Union ? (0, n.Union)([p, d]) : f === r.ExtendsResult.True ? p : d;
  }
  function u(c, s, p, d, f) {
    return (0, t.IsMappedResult)(c) ? (0, i.ExtendsFromMappedResult)(c, s, p, d, f) : (0, t.IsMappedKey)(c) ? (0, e.CreateType)((0, o.ExtendsFromMappedKey)(c, s, p, d, f)) : (0, e.CreateType)(a(c, s, p, d), f);
  }
  return $u;
}
var Bg;
function EP() {
  if (Bg) return xu;
  Bg = 1, Object.defineProperty(xu, "__esModule", { value: !0 }), xu.ExtendsFromMappedKey = u;
  const e = /* @__PURE__ */ un(), n = /* @__PURE__ */ In(), r = /* @__PURE__ */ nl(), o = /* @__PURE__ */ Bn();
  function i(c, s, p, d, f) {
    return {
      [c]: (0, r.Extends)((0, n.Literal)(c), s, p, d, (0, o.Clone)(f))
    };
  }
  function t(c, s, p, d, f) {
    return c.reduce((T, h) => ({ ...T, ...i(h, s, p, d, f) }), {});
  }
  function a(c, s, p, d, f) {
    return t(c.keys, s, p, d, f);
  }
  function u(c, s, p, d, f) {
    const T = a(c, s, p, d, f);
    return (0, e.MappedResult)(T);
  }
  return xu;
}
var jg;
function Mo() {
  return jg || (jg = 1, function(e) {
    var n = Nr && Nr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Nr && Nr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ AP(), e), r(/* @__PURE__ */ EP(), e), r(/* @__PURE__ */ RP(), e), r(/* @__PURE__ */ el(), e), r(/* @__PURE__ */ nl(), e);
  }(Nr)), Nr;
}
var Dg;
function wP() {
  if (Dg) return io;
  Dg = 1, Object.defineProperty(io, "__esModule", { value: !0 }), io.ValueCheckUnknownTypeError = void 0, io.Check = $;
  const e = /* @__PURE__ */ Xf(), n = /* @__PURE__ */ Zn(), r = /* @__PURE__ */ $a(), o = /* @__PURE__ */ me(), i = /* @__PURE__ */ Qn(), t = /* @__PURE__ */ Mo(), a = /* @__PURE__ */ Eo(), u = /* @__PURE__ */ ze(), c = /* @__PURE__ */ _n(), s = /* @__PURE__ */ an(), p = /* @__PURE__ */ qe();
  class d extends u.TypeBoxError {
    constructor(O) {
      super("Unknown type"), this.schema = O;
    }
  }
  io.ValueCheckUnknownTypeError = d;
  function f(g) {
    return g[o.Kind] === "Any" || g[o.Kind] === "Unknown";
  }
  function T(g) {
    return g !== void 0;
  }
  function h(g, O, D) {
    return !0;
  }
  function I(g, O, D) {
    if (!(0, s.IsArray)(D) || T(g.minItems) && !(D.length >= g.minItems) || T(g.maxItems) && !(D.length <= g.maxItems) || !D.every((Z) => K(g.items, O, Z)) || g.uniqueItems === !0 && !function() {
      const Z = /* @__PURE__ */ new Set();
      for (const X of D) {
        const U = (0, r.Hash)(X);
        if (Z.has(U))
          return !1;
        Z.add(U);
      }
      return !0;
    }())
      return !1;
    if (!(T(g.contains) || (0, s.IsNumber)(g.minContains) || (0, s.IsNumber)(g.maxContains)))
      return !0;
    const V = T(g.contains) ? g.contains : (0, c.Never)(), m = D.reduce((Z, X) => K(V, O, X) ? Z + 1 : Z, 0);
    return !(m === 0 || (0, s.IsNumber)(g.minContains) && m < g.minContains || (0, s.IsNumber)(g.maxContains) && m > g.maxContains);
  }
  function _(g, O, D) {
    return (0, s.IsAsyncIterator)(D);
  }
  function A(g, O, D) {
    return !(!(0, s.IsBigInt)(D) || T(g.exclusiveMaximum) && !(D < g.exclusiveMaximum) || T(g.exclusiveMinimum) && !(D > g.exclusiveMinimum) || T(g.maximum) && !(D <= g.maximum) || T(g.minimum) && !(D >= g.minimum) || T(g.multipleOf) && D % g.multipleOf !== BigInt(0));
  }
  function v(g, O, D) {
    return (0, s.IsBoolean)(D);
  }
  function j(g, O, D) {
    return K(g.returns, O, D.prototype);
  }
  function w(g, O, D) {
    return !(!(0, s.IsDate)(D) || T(g.exclusiveMaximumTimestamp) && !(D.getTime() < g.exclusiveMaximumTimestamp) || T(g.exclusiveMinimumTimestamp) && !(D.getTime() > g.exclusiveMinimumTimestamp) || T(g.maximumTimestamp) && !(D.getTime() <= g.maximumTimestamp) || T(g.minimumTimestamp) && !(D.getTime() >= g.minimumTimestamp) || T(g.multipleOfTimestamp) && D.getTime() % g.multipleOfTimestamp !== 0);
  }
  function l(g, O, D) {
    return (0, s.IsFunction)(D);
  }
  function R(g, O, D) {
    const V = globalThis.Object.values(g.$defs), m = g.$defs[g.$ref];
    return K(m, [...O, ...V], D);
  }
  function y(g, O, D) {
    return !(!(0, s.IsInteger)(D) || T(g.exclusiveMaximum) && !(D < g.exclusiveMaximum) || T(g.exclusiveMinimum) && !(D > g.exclusiveMinimum) || T(g.maximum) && !(D <= g.maximum) || T(g.minimum) && !(D >= g.minimum) || T(g.multipleOf) && D % g.multipleOf !== 0);
  }
  function P(g, O, D) {
    const V = g.allOf.every((m) => K(m, O, D));
    if (g.unevaluatedProperties === !1) {
      const m = new RegExp((0, i.KeyOfPattern)(g)), Z = Object.getOwnPropertyNames(D).every((X) => m.test(X));
      return V && Z;
    } else if ((0, p.IsSchema)(g.unevaluatedProperties)) {
      const m = new RegExp((0, i.KeyOfPattern)(g)), Z = Object.getOwnPropertyNames(D).every((X) => m.test(X) || K(g.unevaluatedProperties, O, D[X]));
      return V && Z;
    } else
      return V;
  }
  function E(g, O, D) {
    return (0, s.IsIterator)(D);
  }
  function b(g, O, D) {
    return D === g.const;
  }
  function x(g, O, D) {
    return !1;
  }
  function N(g, O, D) {
    return !K(g.not, O, D);
  }
  function q(g, O, D) {
    return (0, s.IsNull)(D);
  }
  function k(g, O, D) {
    return !(!e.TypeSystemPolicy.IsNumberLike(D) || T(g.exclusiveMaximum) && !(D < g.exclusiveMaximum) || T(g.exclusiveMinimum) && !(D > g.exclusiveMinimum) || T(g.minimum) && !(D >= g.minimum) || T(g.maximum) && !(D <= g.maximum) || T(g.multipleOf) && D % g.multipleOf !== 0);
  }
  function G(g, O, D) {
    if (!e.TypeSystemPolicy.IsObjectLike(D) || T(g.minProperties) && !(Object.getOwnPropertyNames(D).length >= g.minProperties) || T(g.maxProperties) && !(Object.getOwnPropertyNames(D).length <= g.maxProperties))
      return !1;
    const V = Object.getOwnPropertyNames(g.properties);
    for (const m of V) {
      const Z = g.properties[m];
      if (g.required && g.required.includes(m)) {
        if (!K(Z, O, D[m]) || ((0, t.ExtendsUndefinedCheck)(Z) || f(Z)) && !(m in D))
          return !1;
      } else if (e.TypeSystemPolicy.IsExactOptionalProperty(D, m) && !K(Z, O, D[m]))
        return !1;
    }
    if (g.additionalProperties === !1) {
      const m = Object.getOwnPropertyNames(D);
      return g.required && g.required.length === V.length && m.length === V.length ? !0 : m.every((Z) => V.includes(Z));
    } else return typeof g.additionalProperties == "object" ? Object.getOwnPropertyNames(D).every((Z) => V.includes(Z) || K(g.additionalProperties, O, D[Z])) : !0;
  }
  function Y(g, O, D) {
    return (0, s.IsPromise)(D);
  }
  function H(g, O, D) {
    if (!e.TypeSystemPolicy.IsRecordLike(D) || T(g.minProperties) && !(Object.getOwnPropertyNames(D).length >= g.minProperties) || T(g.maxProperties) && !(Object.getOwnPropertyNames(D).length <= g.maxProperties))
      return !1;
    const [V, m] = Object.entries(g.patternProperties)[0], Z = new RegExp(V), X = Object.entries(D).every(([ue, ge]) => Z.test(ue) ? K(m, O, ge) : !0), U = typeof g.additionalProperties == "object" ? Object.entries(D).every(([ue, ge]) => Z.test(ue) ? !0 : K(g.additionalProperties, O, ge)) : !0, se = g.additionalProperties === !1 ? Object.getOwnPropertyNames(D).every((ue) => Z.test(ue)) : !0;
    return X && U && se;
  }
  function F(g, O, D) {
    return K((0, n.Deref)(g, O), O, D);
  }
  function te(g, O, D) {
    const V = new RegExp(g.source, g.flags);
    return T(g.minLength) && !(D.length >= g.minLength) || T(g.maxLength) && !(D.length <= g.maxLength) ? !1 : V.test(D);
  }
  function ce(g, O, D) {
    return !(0, s.IsString)(D) || T(g.minLength) && !(D.length >= g.minLength) || T(g.maxLength) && !(D.length <= g.maxLength) || T(g.pattern) && !new RegExp(g.pattern).test(D) ? !1 : T(g.format) ? a.FormatRegistry.Has(g.format) ? a.FormatRegistry.Get(g.format)(D) : !1 : !0;
  }
  function Te(g, O, D) {
    return (0, s.IsSymbol)(D);
  }
  function Oe(g, O, D) {
    return (0, s.IsString)(D) && new RegExp(g.pattern).test(D);
  }
  function we(g, O, D) {
    return K((0, n.Deref)(g, O), O, D);
  }
  function ye(g, O, D) {
    if (!(0, s.IsArray)(D) || g.items === void 0 && D.length !== 0 || D.length !== g.maxItems)
      return !1;
    if (!g.items)
      return !0;
    for (let V = 0; V < g.items.length; V++)
      if (!K(g.items[V], O, D[V]))
        return !1;
    return !0;
  }
  function Ke(g, O, D) {
    return (0, s.IsUndefined)(D);
  }
  function J(g, O, D) {
    return g.anyOf.some((V) => K(V, O, D));
  }
  function re(g, O, D) {
    return !(!(0, s.IsUint8Array)(D) || T(g.maxByteLength) && !(D.length <= g.maxByteLength) || T(g.minByteLength) && !(D.length >= g.minByteLength));
  }
  function _e(g, O, D) {
    return !0;
  }
  function Ee(g, O, D) {
    return e.TypeSystemPolicy.IsVoidLike(D);
  }
  function ne(g, O, D) {
    return a.TypeRegistry.Has(g[o.Kind]) ? a.TypeRegistry.Get(g[o.Kind])(g, D) : !1;
  }
  function K(g, O, D) {
    const V = T(g.$id) ? (0, n.Pushref)(g, O) : O, m = g;
    switch (m[o.Kind]) {
      case "Any":
        return h();
      case "Array":
        return I(m, V, D);
      case "AsyncIterator":
        return _(m, V, D);
      case "BigInt":
        return A(m, V, D);
      case "Boolean":
        return v(m, V, D);
      case "Constructor":
        return j(m, V, D);
      case "Date":
        return w(m, V, D);
      case "Function":
        return l(m, V, D);
      case "Import":
        return R(m, V, D);
      case "Integer":
        return y(m, V, D);
      case "Intersect":
        return P(m, V, D);
      case "Iterator":
        return E(m, V, D);
      case "Literal":
        return b(m, V, D);
      case "Never":
        return x();
      case "Not":
        return N(m, V, D);
      case "Null":
        return q(m, V, D);
      case "Number":
        return k(m, V, D);
      case "Object":
        return G(m, V, D);
      case "Promise":
        return Y(m, V, D);
      case "Record":
        return H(m, V, D);
      case "Ref":
        return F(m, V, D);
      case "RegExp":
        return te(m, V, D);
      case "String":
        return ce(m, V, D);
      case "Symbol":
        return Te(m, V, D);
      case "TemplateLiteral":
        return Oe(m, V, D);
      case "This":
        return we(m, V, D);
      case "Tuple":
        return ye(m, V, D);
      case "Undefined":
        return Ke(m, V, D);
      case "Union":
        return J(m, V, D);
      case "Uint8Array":
        return re(m, V, D);
      case "Unknown":
        return _e();
      case "Void":
        return Ee(m, V, D);
      default:
        if (!a.TypeRegistry.Has(m[o.Kind]))
          throw new d(m);
        return ne(m, V, D);
    }
  }
  function $(...g) {
    return g.length === 3 ? K(g[0], g[1], g[2]) : K(g[0], [], g[1]);
  }
  return io;
}
var Fg;
function Hn() {
  return Fg || (Fg = 1, function(e) {
    var n = $r && $r.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = $r && $r.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ wP(), e);
  }($r)), $r;
}
var Ug;
function SP() {
  if (Ug) return et;
  Ug = 1, Object.defineProperty(et, "__esModule", { value: !0 }), et.ValueErrorIterator = et.ValueErrorsUnknownTypeError = et.ValueErrorType = void 0, et.Errors = V;
  const e = /* @__PURE__ */ Xf(), n = /* @__PURE__ */ Qn(), r = /* @__PURE__ */ Eo(), o = /* @__PURE__ */ el(), i = /* @__PURE__ */ IP(), t = /* @__PURE__ */ ze(), a = /* @__PURE__ */ Zn(), u = /* @__PURE__ */ $a(), c = /* @__PURE__ */ Hn(), s = /* @__PURE__ */ me(), p = /* @__PURE__ */ _n(), d = /* @__PURE__ */ an();
  var f;
  (function(m) {
    m[m.ArrayContains = 0] = "ArrayContains", m[m.ArrayMaxContains = 1] = "ArrayMaxContains", m[m.ArrayMaxItems = 2] = "ArrayMaxItems", m[m.ArrayMinContains = 3] = "ArrayMinContains", m[m.ArrayMinItems = 4] = "ArrayMinItems", m[m.ArrayUniqueItems = 5] = "ArrayUniqueItems", m[m.Array = 6] = "Array", m[m.AsyncIterator = 7] = "AsyncIterator", m[m.BigIntExclusiveMaximum = 8] = "BigIntExclusiveMaximum", m[m.BigIntExclusiveMinimum = 9] = "BigIntExclusiveMinimum", m[m.BigIntMaximum = 10] = "BigIntMaximum", m[m.BigIntMinimum = 11] = "BigIntMinimum", m[m.BigIntMultipleOf = 12] = "BigIntMultipleOf", m[m.BigInt = 13] = "BigInt", m[m.Boolean = 14] = "Boolean", m[m.DateExclusiveMaximumTimestamp = 15] = "DateExclusiveMaximumTimestamp", m[m.DateExclusiveMinimumTimestamp = 16] = "DateExclusiveMinimumTimestamp", m[m.DateMaximumTimestamp = 17] = "DateMaximumTimestamp", m[m.DateMinimumTimestamp = 18] = "DateMinimumTimestamp", m[m.DateMultipleOfTimestamp = 19] = "DateMultipleOfTimestamp", m[m.Date = 20] = "Date", m[m.Function = 21] = "Function", m[m.IntegerExclusiveMaximum = 22] = "IntegerExclusiveMaximum", m[m.IntegerExclusiveMinimum = 23] = "IntegerExclusiveMinimum", m[m.IntegerMaximum = 24] = "IntegerMaximum", m[m.IntegerMinimum = 25] = "IntegerMinimum", m[m.IntegerMultipleOf = 26] = "IntegerMultipleOf", m[m.Integer = 27] = "Integer", m[m.IntersectUnevaluatedProperties = 28] = "IntersectUnevaluatedProperties", m[m.Intersect = 29] = "Intersect", m[m.Iterator = 30] = "Iterator", m[m.Kind = 31] = "Kind", m[m.Literal = 32] = "Literal", m[m.Never = 33] = "Never", m[m.Not = 34] = "Not", m[m.Null = 35] = "Null", m[m.NumberExclusiveMaximum = 36] = "NumberExclusiveMaximum", m[m.NumberExclusiveMinimum = 37] = "NumberExclusiveMinimum", m[m.NumberMaximum = 38] = "NumberMaximum", m[m.NumberMinimum = 39] = "NumberMinimum", m[m.NumberMultipleOf = 40] = "NumberMultipleOf", m[m.Number = 41] = "Number", m[m.ObjectAdditionalProperties = 42] = "ObjectAdditionalProperties", m[m.ObjectMaxProperties = 43] = "ObjectMaxProperties", m[m.ObjectMinProperties = 44] = "ObjectMinProperties", m[m.ObjectRequiredProperty = 45] = "ObjectRequiredProperty", m[m.Object = 46] = "Object", m[m.Promise = 47] = "Promise", m[m.RegExp = 48] = "RegExp", m[m.StringFormatUnknown = 49] = "StringFormatUnknown", m[m.StringFormat = 50] = "StringFormat", m[m.StringMaxLength = 51] = "StringMaxLength", m[m.StringMinLength = 52] = "StringMinLength", m[m.StringPattern = 53] = "StringPattern", m[m.String = 54] = "String", m[m.Symbol = 55] = "Symbol", m[m.TupleLength = 56] = "TupleLength", m[m.Tuple = 57] = "Tuple", m[m.Uint8ArrayMaxByteLength = 58] = "Uint8ArrayMaxByteLength", m[m.Uint8ArrayMinByteLength = 59] = "Uint8ArrayMinByteLength", m[m.Uint8Array = 60] = "Uint8Array", m[m.Undefined = 61] = "Undefined", m[m.Union = 62] = "Union", m[m.Void = 63] = "Void";
  })(f || (et.ValueErrorType = f = {}));
  class T extends t.TypeBoxError {
    constructor(Z) {
      super("Unknown type"), this.schema = Z;
    }
  }
  et.ValueErrorsUnknownTypeError = T;
  function h(m) {
    return m.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  function I(m) {
    return m !== void 0;
  }
  class _ {
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
  et.ValueErrorIterator = _;
  function A(m, Z, X, U, se = []) {
    return {
      type: m,
      schema: Z,
      path: X,
      value: U,
      message: (0, i.GetErrorFunction)()({ errorType: m, path: X, schema: Z, value: U, errors: se }),
      errors: se
    };
  }
  function* v(m, Z, X, U) {
  }
  function* j(m, Z, X, U) {
    if (!(0, d.IsArray)(U))
      return yield A(f.Array, m, X, U);
    I(m.minItems) && !(U.length >= m.minItems) && (yield A(f.ArrayMinItems, m, X, U)), I(m.maxItems) && !(U.length <= m.maxItems) && (yield A(f.ArrayMaxItems, m, X, U));
    for (let ge = 0; ge < U.length; ge++)
      yield* D(m.items, Z, `${X}/${ge}`, U[ge]);
    if (m.uniqueItems === !0 && !function() {
      const ge = /* @__PURE__ */ new Set();
      for (const oe of U) {
        const he = (0, u.Hash)(oe);
        if (ge.has(he))
          return !1;
        ge.add(he);
      }
      return !0;
    }() && (yield A(f.ArrayUniqueItems, m, X, U)), !(I(m.contains) || I(m.minContains) || I(m.maxContains)))
      return;
    const se = I(m.contains) ? m.contains : (0, p.Never)(), ue = U.reduce((ge, oe, he) => D(se, Z, `${X}${he}`, oe).next().done === !0 ? ge + 1 : ge, 0);
    ue === 0 && (yield A(f.ArrayContains, m, X, U)), (0, d.IsNumber)(m.minContains) && ue < m.minContains && (yield A(f.ArrayMinContains, m, X, U)), (0, d.IsNumber)(m.maxContains) && ue > m.maxContains && (yield A(f.ArrayMaxContains, m, X, U));
  }
  function* w(m, Z, X, U) {
    (0, d.IsAsyncIterator)(U) || (yield A(f.AsyncIterator, m, X, U));
  }
  function* l(m, Z, X, U) {
    if (!(0, d.IsBigInt)(U))
      return yield A(f.BigInt, m, X, U);
    I(m.exclusiveMaximum) && !(U < m.exclusiveMaximum) && (yield A(f.BigIntExclusiveMaximum, m, X, U)), I(m.exclusiveMinimum) && !(U > m.exclusiveMinimum) && (yield A(f.BigIntExclusiveMinimum, m, X, U)), I(m.maximum) && !(U <= m.maximum) && (yield A(f.BigIntMaximum, m, X, U)), I(m.minimum) && !(U >= m.minimum) && (yield A(f.BigIntMinimum, m, X, U)), I(m.multipleOf) && U % m.multipleOf !== BigInt(0) && (yield A(f.BigIntMultipleOf, m, X, U));
  }
  function* R(m, Z, X, U) {
    (0, d.IsBoolean)(U) || (yield A(f.Boolean, m, X, U));
  }
  function* y(m, Z, X, U) {
    yield* D(m.returns, Z, X, U.prototype);
  }
  function* P(m, Z, X, U) {
    if (!(0, d.IsDate)(U))
      return yield A(f.Date, m, X, U);
    I(m.exclusiveMaximumTimestamp) && !(U.getTime() < m.exclusiveMaximumTimestamp) && (yield A(f.DateExclusiveMaximumTimestamp, m, X, U)), I(m.exclusiveMinimumTimestamp) && !(U.getTime() > m.exclusiveMinimumTimestamp) && (yield A(f.DateExclusiveMinimumTimestamp, m, X, U)), I(m.maximumTimestamp) && !(U.getTime() <= m.maximumTimestamp) && (yield A(f.DateMaximumTimestamp, m, X, U)), I(m.minimumTimestamp) && !(U.getTime() >= m.minimumTimestamp) && (yield A(f.DateMinimumTimestamp, m, X, U)), I(m.multipleOfTimestamp) && U.getTime() % m.multipleOfTimestamp !== 0 && (yield A(f.DateMultipleOfTimestamp, m, X, U));
  }
  function* E(m, Z, X, U) {
    (0, d.IsFunction)(U) || (yield A(f.Function, m, X, U));
  }
  function* b(m, Z, X, U) {
    const se = globalThis.Object.values(m.$defs), ue = m.$defs[m.$ref];
    yield* D(ue, [...Z, ...se], X, U);
  }
  function* x(m, Z, X, U) {
    if (!(0, d.IsInteger)(U))
      return yield A(f.Integer, m, X, U);
    I(m.exclusiveMaximum) && !(U < m.exclusiveMaximum) && (yield A(f.IntegerExclusiveMaximum, m, X, U)), I(m.exclusiveMinimum) && !(U > m.exclusiveMinimum) && (yield A(f.IntegerExclusiveMinimum, m, X, U)), I(m.maximum) && !(U <= m.maximum) && (yield A(f.IntegerMaximum, m, X, U)), I(m.minimum) && !(U >= m.minimum) && (yield A(f.IntegerMinimum, m, X, U)), I(m.multipleOf) && U % m.multipleOf !== 0 && (yield A(f.IntegerMultipleOf, m, X, U));
  }
  function* N(m, Z, X, U) {
    let se = !1;
    for (const ue of m.allOf)
      for (const ge of D(ue, Z, X, U))
        se = !0, yield ge;
    if (se)
      return yield A(f.Intersect, m, X, U);
    if (m.unevaluatedProperties === !1) {
      const ue = new RegExp((0, n.KeyOfPattern)(m));
      for (const ge of Object.getOwnPropertyNames(U))
        ue.test(ge) || (yield A(f.IntersectUnevaluatedProperties, m, `${X}/${ge}`, U));
    }
    if (typeof m.unevaluatedProperties == "object") {
      const ue = new RegExp((0, n.KeyOfPattern)(m));
      for (const ge of Object.getOwnPropertyNames(U))
        if (!ue.test(ge)) {
          const oe = D(m.unevaluatedProperties, Z, `${X}/${ge}`, U[ge]).next();
          oe.done || (yield oe.value);
        }
    }
  }
  function* q(m, Z, X, U) {
    (0, d.IsIterator)(U) || (yield A(f.Iterator, m, X, U));
  }
  function* k(m, Z, X, U) {
    U !== m.const && (yield A(f.Literal, m, X, U));
  }
  function* G(m, Z, X, U) {
    yield A(f.Never, m, X, U);
  }
  function* Y(m, Z, X, U) {
    D(m.not, Z, X, U).next().done === !0 && (yield A(f.Not, m, X, U));
  }
  function* H(m, Z, X, U) {
    (0, d.IsNull)(U) || (yield A(f.Null, m, X, U));
  }
  function* F(m, Z, X, U) {
    if (!e.TypeSystemPolicy.IsNumberLike(U))
      return yield A(f.Number, m, X, U);
    I(m.exclusiveMaximum) && !(U < m.exclusiveMaximum) && (yield A(f.NumberExclusiveMaximum, m, X, U)), I(m.exclusiveMinimum) && !(U > m.exclusiveMinimum) && (yield A(f.NumberExclusiveMinimum, m, X, U)), I(m.maximum) && !(U <= m.maximum) && (yield A(f.NumberMaximum, m, X, U)), I(m.minimum) && !(U >= m.minimum) && (yield A(f.NumberMinimum, m, X, U)), I(m.multipleOf) && U % m.multipleOf !== 0 && (yield A(f.NumberMultipleOf, m, X, U));
  }
  function* te(m, Z, X, U) {
    if (!e.TypeSystemPolicy.IsObjectLike(U))
      return yield A(f.Object, m, X, U);
    I(m.minProperties) && !(Object.getOwnPropertyNames(U).length >= m.minProperties) && (yield A(f.ObjectMinProperties, m, X, U)), I(m.maxProperties) && !(Object.getOwnPropertyNames(U).length <= m.maxProperties) && (yield A(f.ObjectMaxProperties, m, X, U));
    const se = Array.isArray(m.required) ? m.required : [], ue = Object.getOwnPropertyNames(m.properties), ge = Object.getOwnPropertyNames(U);
    for (const oe of se)
      ge.includes(oe) || (yield A(f.ObjectRequiredProperty, m.properties[oe], `${X}/${h(oe)}`, void 0));
    if (m.additionalProperties === !1)
      for (const oe of ge)
        ue.includes(oe) || (yield A(f.ObjectAdditionalProperties, m, `${X}/${h(oe)}`, U[oe]));
    if (typeof m.additionalProperties == "object")
      for (const oe of ge)
        ue.includes(oe) || (yield* D(m.additionalProperties, Z, `${X}/${h(oe)}`, U[oe]));
    for (const oe of ue) {
      const he = m.properties[oe];
      m.required && m.required.includes(oe) ? (yield* D(he, Z, `${X}/${h(oe)}`, U[oe]), (0, o.ExtendsUndefinedCheck)(m) && !(oe in U) && (yield A(f.ObjectRequiredProperty, he, `${X}/${h(oe)}`, void 0))) : e.TypeSystemPolicy.IsExactOptionalProperty(U, oe) && (yield* D(he, Z, `${X}/${h(oe)}`, U[oe]));
    }
  }
  function* ce(m, Z, X, U) {
    (0, d.IsPromise)(U) || (yield A(f.Promise, m, X, U));
  }
  function* Te(m, Z, X, U) {
    if (!e.TypeSystemPolicy.IsRecordLike(U))
      return yield A(f.Object, m, X, U);
    I(m.minProperties) && !(Object.getOwnPropertyNames(U).length >= m.minProperties) && (yield A(f.ObjectMinProperties, m, X, U)), I(m.maxProperties) && !(Object.getOwnPropertyNames(U).length <= m.maxProperties) && (yield A(f.ObjectMaxProperties, m, X, U));
    const [se, ue] = Object.entries(m.patternProperties)[0], ge = new RegExp(se);
    for (const [oe, he] of Object.entries(U))
      ge.test(oe) && (yield* D(ue, Z, `${X}/${h(oe)}`, he));
    if (typeof m.additionalProperties == "object")
      for (const [oe, he] of Object.entries(U))
        ge.test(oe) || (yield* D(m.additionalProperties, Z, `${X}/${h(oe)}`, he));
    if (m.additionalProperties === !1) {
      for (const [oe, he] of Object.entries(U))
        if (!ge.test(oe))
          return yield A(f.ObjectAdditionalProperties, m, `${X}/${h(oe)}`, he);
    }
  }
  function* Oe(m, Z, X, U) {
    yield* D((0, a.Deref)(m, Z), Z, X, U);
  }
  function* we(m, Z, X, U) {
    if (!(0, d.IsString)(U))
      return yield A(f.String, m, X, U);
    if (I(m.minLength) && !(U.length >= m.minLength) && (yield A(f.StringMinLength, m, X, U)), I(m.maxLength) && !(U.length <= m.maxLength) && (yield A(f.StringMaxLength, m, X, U)), !new RegExp(m.source, m.flags).test(U))
      return yield A(f.RegExp, m, X, U);
  }
  function* ye(m, Z, X, U) {
    if (!(0, d.IsString)(U))
      return yield A(f.String, m, X, U);
    I(m.minLength) && !(U.length >= m.minLength) && (yield A(f.StringMinLength, m, X, U)), I(m.maxLength) && !(U.length <= m.maxLength) && (yield A(f.StringMaxLength, m, X, U)), (0, d.IsString)(m.pattern) && (new RegExp(m.pattern).test(U) || (yield A(f.StringPattern, m, X, U))), (0, d.IsString)(m.format) && (r.FormatRegistry.Has(m.format) ? r.FormatRegistry.Get(m.format)(U) || (yield A(f.StringFormat, m, X, U)) : yield A(f.StringFormatUnknown, m, X, U));
  }
  function* Ke(m, Z, X, U) {
    (0, d.IsSymbol)(U) || (yield A(f.Symbol, m, X, U));
  }
  function* J(m, Z, X, U) {
    if (!(0, d.IsString)(U))
      return yield A(f.String, m, X, U);
    new RegExp(m.pattern).test(U) || (yield A(f.StringPattern, m, X, U));
  }
  function* re(m, Z, X, U) {
    yield* D((0, a.Deref)(m, Z), Z, X, U);
  }
  function* _e(m, Z, X, U) {
    if (!(0, d.IsArray)(U))
      return yield A(f.Tuple, m, X, U);
    if (m.items === void 0 && U.length !== 0)
      return yield A(f.TupleLength, m, X, U);
    if (U.length !== m.maxItems)
      return yield A(f.TupleLength, m, X, U);
    if (m.items)
      for (let se = 0; se < m.items.length; se++)
        yield* D(m.items[se], Z, `${X}/${se}`, U[se]);
  }
  function* Ee(m, Z, X, U) {
    (0, d.IsUndefined)(U) || (yield A(f.Undefined, m, X, U));
  }
  function* ne(m, Z, X, U) {
    if ((0, c.Check)(m, Z, U))
      return;
    const se = m.anyOf.map((ue) => new _(D(ue, Z, X, U)));
    yield A(f.Union, m, X, U, se);
  }
  function* K(m, Z, X, U) {
    if (!(0, d.IsUint8Array)(U))
      return yield A(f.Uint8Array, m, X, U);
    I(m.maxByteLength) && !(U.length <= m.maxByteLength) && (yield A(f.Uint8ArrayMaxByteLength, m, X, U)), I(m.minByteLength) && !(U.length >= m.minByteLength) && (yield A(f.Uint8ArrayMinByteLength, m, X, U));
  }
  function* $(m, Z, X, U) {
  }
  function* g(m, Z, X, U) {
    e.TypeSystemPolicy.IsVoidLike(U) || (yield A(f.Void, m, X, U));
  }
  function* O(m, Z, X, U) {
    r.TypeRegistry.Get(m[s.Kind])(m, U) || (yield A(f.Kind, m, X, U));
  }
  function* D(m, Z, X, U) {
    const se = I(m.$id) ? [...Z, m] : Z, ue = m;
    switch (ue[s.Kind]) {
      case "Any":
        return yield* v();
      case "Array":
        return yield* j(ue, se, X, U);
      case "AsyncIterator":
        return yield* w(ue, se, X, U);
      case "BigInt":
        return yield* l(ue, se, X, U);
      case "Boolean":
        return yield* R(ue, se, X, U);
      case "Constructor":
        return yield* y(ue, se, X, U);
      case "Date":
        return yield* P(ue, se, X, U);
      case "Function":
        return yield* E(ue, se, X, U);
      case "Import":
        return yield* b(ue, se, X, U);
      case "Integer":
        return yield* x(ue, se, X, U);
      case "Intersect":
        return yield* N(ue, se, X, U);
      case "Iterator":
        return yield* q(ue, se, X, U);
      case "Literal":
        return yield* k(ue, se, X, U);
      case "Never":
        return yield* G(ue, se, X, U);
      case "Not":
        return yield* Y(ue, se, X, U);
      case "Null":
        return yield* H(ue, se, X, U);
      case "Number":
        return yield* F(ue, se, X, U);
      case "Object":
        return yield* te(ue, se, X, U);
      case "Promise":
        return yield* ce(ue, se, X, U);
      case "Record":
        return yield* Te(ue, se, X, U);
      case "Ref":
        return yield* Oe(ue, se, X, U);
      case "RegExp":
        return yield* we(ue, se, X, U);
      case "String":
        return yield* ye(ue, se, X, U);
      case "Symbol":
        return yield* Ke(ue, se, X, U);
      case "TemplateLiteral":
        return yield* J(ue, se, X, U);
      case "This":
        return yield* re(ue, se, X, U);
      case "Tuple":
        return yield* _e(ue, se, X, U);
      case "Undefined":
        return yield* Ee(ue, se, X, U);
      case "Union":
        return yield* ne(ue, se, X, U);
      case "Uint8Array":
        return yield* K(ue, se, X, U);
      case "Unknown":
        return yield* $();
      case "Void":
        return yield* g(ue, se, X, U);
      default:
        if (!r.TypeRegistry.Has(ue[s.Kind]))
          throw new T(m);
        return yield* O(ue, se, X, U);
    }
  }
  function V(...m) {
    const Z = m.length === 3 ? D(m[0], m[1], "", m[2]) : D(m[0], [], "", m[1]);
    return new _(Z);
  }
  return et;
}
var Lg;
function qt() {
  return Lg || (Lg = 1, function(e) {
    var n = Vt && Vt.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Vt && Vt.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ SP(), e), r(/* @__PURE__ */ IP(), e);
  }(Vt)), Vt;
}
var Dr = {}, nt = {}, qg;
function _x() {
  if (qg) return nt;
  qg = 1;
  var e = nt && nt.__classPrivateFieldSet || function(d, f, T, h, I) {
    if (h === "m") throw new TypeError("Private method is not writable");
    if (h === "a" && !I) throw new TypeError("Private accessor was defined without a setter");
    if (typeof f == "function" ? d !== f || !I : !f.has(d)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return h === "a" ? I.call(d, T) : I ? I.value = T : f.set(d, T), T;
  }, n = nt && nt.__classPrivateFieldGet || function(d, f, T, h) {
    if (T === "a" && !h) throw new TypeError("Private accessor was defined without a getter");
    if (typeof f == "function" ? d !== f || !h : !f.has(d)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return T === "m" ? h : T === "a" ? h.call(d) : h ? h.value : f.get(d);
  }, r, o, i;
  Object.defineProperty(nt, "__esModule", { value: !0 }), nt.AssertError = void 0, nt.Assert = p;
  const t = /* @__PURE__ */ qt(), a = /* @__PURE__ */ oP(), u = /* @__PURE__ */ wP();
  class c extends a.TypeBoxError {
    constructor(f) {
      const T = f.First();
      super(T === void 0 ? "Invalid Value" : T.message), r.add(this), o.set(this, void 0), e(this, o, f, "f"), this.error = T;
    }
    /** Returns an iterator for each error in this value. */
    Errors() {
      return new t.ValueErrorIterator(n(this, r, "m", i).call(this));
    }
  }
  nt.AssertError = c, o = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakSet(), i = function* () {
    this.error && (yield this.error), yield* n(this, o, "f");
  };
  function s(d, f, T) {
    if (!(0, u.Check)(d, f, T))
      throw new c((0, t.Errors)(d, f, T));
  }
  function p(...d) {
    return d.length === 3 ? s(d[0], d[1], d[2]) : s(d[0], [], d[1]);
  }
  return nt;
}
var Kg;
function tl() {
  return Kg || (Kg = 1, function(e) {
    var n = Dr && Dr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Dr && Dr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ _x(), e);
  }(Dr)), Dr;
}
var Fr = {}, oo = {}, Ur = {}, ao = {}, Lr = {}, Bu = {}, Gg;
function bx() {
  if (Gg) return Bu;
  Gg = 1, Object.defineProperty(Bu, "__esModule", { value: !0 }), Bu.Clone = c;
  const e = /* @__PURE__ */ an();
  function n(s) {
    const p = {};
    for (const d of Object.getOwnPropertyNames(s))
      p[d] = c(s[d]);
    for (const d of Object.getOwnPropertySymbols(s))
      p[d] = c(s[d]);
    return p;
  }
  function r(s) {
    return s.map((p) => c(p));
  }
  function o(s) {
    return s.slice();
  }
  function i(s) {
    return new Map(c([...s.entries()]));
  }
  function t(s) {
    return new Set(c([...s.entries()]));
  }
  function a(s) {
    return new Date(s.toISOString());
  }
  function u(s) {
    return s;
  }
  function c(s) {
    if ((0, e.IsArray)(s))
      return r(s);
    if ((0, e.IsDate)(s))
      return a(s);
    if ((0, e.IsTypedArray)(s))
      return o(s);
    if ((0, e.IsMap)(s))
      return i(s);
    if ((0, e.IsSet)(s))
      return t(s);
    if ((0, e.IsObject)(s))
      return n(s);
    if ((0, e.IsValueType)(s))
      return s;
    throw new Error("ValueClone: Unable to clone value");
  }
  return Bu;
}
var Hg;
function ut() {
  return Hg || (Hg = 1, function(e) {
    var n = Lr && Lr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Lr && Lr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ bx(), e);
  }(Lr)), Lr;
}
var Vg;
function hx() {
  if (Vg) return ao;
  Vg = 1, Object.defineProperty(ao, "__esModule", { value: !0 }), ao.ValueCreateError = void 0, ao.Create = $;
  const e = /* @__PURE__ */ an(), n = /* @__PURE__ */ Hn(), r = /* @__PURE__ */ ut(), o = /* @__PURE__ */ Zn(), i = /* @__PURE__ */ ot(), t = /* @__PURE__ */ Ma(), a = /* @__PURE__ */ Eo(), u = /* @__PURE__ */ me(), c = /* @__PURE__ */ ze(), s = /* @__PURE__ */ kf();
  class p extends c.TypeBoxError {
    constructor(O, D) {
      super(D), this.schema = O;
    }
  }
  ao.ValueCreateError = p;
  function d(g) {
    return (0, s.IsFunction)(g) ? g() : (0, r.Clone)(g);
  }
  function f(g, O) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : {};
  }
  function T(g, O) {
    if (g.uniqueItems === !0 && !(0, e.HasPropertyKey)(g, "default"))
      throw new p(g, "Array with the uniqueItems constraint requires a default value");
    if ("contains" in g && !(0, e.HasPropertyKey)(g, "default"))
      throw new p(g, "Array with the contains constraint requires a default value");
    return "default" in g ? d(g.default) : g.minItems !== void 0 ? Array.from({ length: g.minItems }).map((D) => Ee(g.items, O)) : [];
  }
  function h(g, O) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : async function* () {
    }();
  }
  function I(g, O) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : BigInt(0);
  }
  function _(g, O) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : !1;
  }
  function A(g, O) {
    if ((0, e.HasPropertyKey)(g, "default"))
      return d(g.default);
    {
      const D = Ee(g.returns, O);
      return typeof D == "object" && !Array.isArray(D) ? class {
        constructor() {
          for (const [V, m] of Object.entries(D)) {
            const Z = this;
            Z[V] = m;
          }
        }
      } : class {
      };
    }
  }
  function v(g, O) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : g.minimumTimestamp !== void 0 ? new Date(g.minimumTimestamp) : /* @__PURE__ */ new Date();
  }
  function j(g, O) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : () => Ee(g.returns, O);
  }
  function w(g, O) {
    const D = globalThis.Object.values(g.$defs), V = g.$defs[g.$ref];
    return Ee(V, [...O, ...D]);
  }
  function l(g, O) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : g.minimum !== void 0 ? g.minimum : 0;
  }
  function R(g, O) {
    if ((0, e.HasPropertyKey)(g, "default"))
      return d(g.default);
    {
      const D = g.allOf.reduce((V, m) => {
        const Z = Ee(m, O);
        return typeof Z == "object" ? { ...V, ...Z } : Z;
      }, {});
      if (!(0, n.Check)(g, O, D))
        throw new p(g, "Intersect produced invalid value. Consider using a default value.");
      return D;
    }
  }
  function y(g, O) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : function* () {
    }();
  }
  function P(g, O) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : g.const;
  }
  function E(g, O) {
    if ((0, e.HasPropertyKey)(g, "default"))
      return d(g.default);
    throw new p(g, "Never types cannot be created. Consider using a default value.");
  }
  function b(g, O) {
    if ((0, e.HasPropertyKey)(g, "default"))
      return d(g.default);
    throw new p(g, "Not types must have a default value");
  }
  function x(g, O) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : null;
  }
  function N(g, O) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : g.minimum !== void 0 ? g.minimum : 0;
  }
  function q(g, O) {
    if ((0, e.HasPropertyKey)(g, "default"))
      return d(g.default);
    {
      const D = new Set(g.required), V = {};
      for (const [m, Z] of Object.entries(g.properties))
        D.has(m) && (V[m] = Ee(Z, O));
      return V;
    }
  }
  function k(g, O) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : Promise.resolve(Ee(g.item, O));
  }
  function G(g, O) {
    const [D, V] = Object.entries(g.patternProperties)[0];
    if ((0, e.HasPropertyKey)(g, "default"))
      return d(g.default);
    if (D === t.PatternStringExact || D === t.PatternNumberExact)
      return {};
    {
      const m = D.slice(1, D.length - 1).split("|"), Z = {};
      for (const X of m)
        Z[X] = Ee(V, O);
      return Z;
    }
  }
  function Y(g, O) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : Ee((0, o.Deref)(g, O), O);
  }
  function H(g, O) {
    if ((0, e.HasPropertyKey)(g, "default"))
      return d(g.default);
    throw new p(g, "RegExp types cannot be created. Consider using a default value.");
  }
  function F(g, O) {
    if (g.pattern !== void 0) {
      if ((0, e.HasPropertyKey)(g, "default"))
        return d(g.default);
      throw new p(g, "String types with patterns must specify a default value");
    } else if (g.format !== void 0) {
      if ((0, e.HasPropertyKey)(g, "default"))
        return d(g.default);
      throw new p(g, "String types with formats must specify a default value");
    } else
      return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : g.minLength !== void 0 ? Array.from({ length: g.minLength }).map(() => " ").join("") : "";
  }
  function te(g, O) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : "value" in g ? Symbol.for(g.value) : Symbol();
  }
  function ce(g, O) {
    if ((0, e.HasPropertyKey)(g, "default"))
      return d(g.default);
    if (!(0, i.IsTemplateLiteralFinite)(g))
      throw new p(g, "Can only create template literals that produce a finite variants. Consider using a default value.");
    return (0, i.TemplateLiteralGenerate)(g)[0];
  }
  function Te(g, O) {
    if (K++ > ne)
      throw new p(g, "Cannot create recursive type as it appears possibly infinite. Consider using a default.");
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : Ee((0, o.Deref)(g, O), O);
  }
  function Oe(g, O) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : g.items === void 0 ? [] : Array.from({ length: g.minItems }).map((D, V) => Ee(g.items[V], O));
  }
  function we(g, O) {
    if ((0, e.HasPropertyKey)(g, "default"))
      return d(g.default);
  }
  function ye(g, O) {
    if ((0, e.HasPropertyKey)(g, "default"))
      return d(g.default);
    if (g.anyOf.length === 0)
      throw new Error("ValueCreate.Union: Cannot create Union with zero variants");
    return Ee(g.anyOf[0], O);
  }
  function Ke(g, O) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : g.minByteLength !== void 0 ? new Uint8Array(g.minByteLength) : new Uint8Array(0);
  }
  function J(g, O) {
    return (0, e.HasPropertyKey)(g, "default") ? d(g.default) : {};
  }
  function re(g, O) {
    if ((0, e.HasPropertyKey)(g, "default"))
      return d(g.default);
  }
  function _e(g, O) {
    if ((0, e.HasPropertyKey)(g, "default"))
      return d(g.default);
    throw new Error("User defined types must specify a default value");
  }
  function Ee(g, O) {
    const D = (0, o.Pushref)(g, O), V = g;
    switch (V[u.Kind]) {
      case "Any":
        return f(V);
      case "Array":
        return T(V, D);
      case "AsyncIterator":
        return h(V);
      case "BigInt":
        return I(V);
      case "Boolean":
        return _(V);
      case "Constructor":
        return A(V, D);
      case "Date":
        return v(V);
      case "Function":
        return j(V, D);
      case "Import":
        return w(V, D);
      case "Integer":
        return l(V);
      case "Intersect":
        return R(V, D);
      case "Iterator":
        return y(V);
      case "Literal":
        return P(V);
      case "Never":
        return E(V);
      case "Not":
        return b(V);
      case "Null":
        return x(V);
      case "Number":
        return N(V);
      case "Object":
        return q(V, D);
      case "Promise":
        return k(V, D);
      case "Record":
        return G(V, D);
      case "Ref":
        return Y(V, D);
      case "RegExp":
        return H(V);
      case "String":
        return F(V);
      case "Symbol":
        return te(V);
      case "TemplateLiteral":
        return ce(V);
      case "This":
        return Te(V, D);
      case "Tuple":
        return Oe(V, D);
      case "Undefined":
        return we(V);
      case "Union":
        return ye(V, D);
      case "Uint8Array":
        return Ke(V);
      case "Unknown":
        return J(V);
      case "Void":
        return re(V);
      default:
        if (!a.TypeRegistry.Has(V[u.Kind]))
          throw new p(V, "Unknown type");
        return _e(V);
    }
  }
  const ne = 512;
  let K = 0;
  function $(...g) {
    return K = 0, g.length === 2 ? Ee(g[0], g[1]) : Ee(g[0], []);
  }
  return ao;
}
var Wg;
function rl() {
  return Wg || (Wg = 1, function(e) {
    var n = Ur && Ur.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Ur && Ur.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ hx(), e);
  }(Ur)), Ur;
}
var kg;
function Ix() {
  if (kg) return oo;
  kg = 1, Object.defineProperty(oo, "__esModule", { value: !0 }), oo.ValueCastError = void 0, oo.Cast = E;
  const e = /* @__PURE__ */ an(), n = /* @__PURE__ */ ze(), r = /* @__PURE__ */ me(), o = /* @__PURE__ */ rl(), i = /* @__PURE__ */ Hn(), t = /* @__PURE__ */ ut(), a = /* @__PURE__ */ Zn();
  class u extends n.TypeBoxError {
    constructor(x, N) {
      super(N), this.schema = x;
    }
  }
  oo.ValueCastError = u;
  function c(b, x, N) {
    if (b[r.Kind] === "Object" && typeof N == "object" && !(0, e.IsNull)(N)) {
      const q = b, k = Object.getOwnPropertyNames(N), G = Object.entries(q.properties), [Y, H] = [1 / G.length, G.length];
      return G.reduce((F, [te, ce]) => {
        const Te = ce[r.Kind] === "Literal" && ce.const === N[te] ? H : 0, Oe = (0, i.Check)(ce, x, N[te]) ? Y : 0, we = k.includes(te) ? Y : 0;
        return F + (Te + Oe + we);
      }, 0);
    } else
      return (0, i.Check)(b, x, N) ? 1 : 0;
  }
  function s(b, x, N) {
    const q = b.anyOf.map((Y) => (0, a.Deref)(Y, x));
    let [k, G] = [q[0], 0];
    for (const Y of q) {
      const H = c(Y, x, N);
      H > G && (k = Y, G = H);
    }
    return k;
  }
  function p(b, x, N) {
    if ("default" in b)
      return typeof N == "function" ? b.default : (0, t.Clone)(b.default);
    {
      const q = s(b, x, N);
      return E(q, x, N);
    }
  }
  function d(b, x, N) {
    return (0, i.Check)(b, x, N) ? (0, t.Clone)(N) : (0, o.Create)(b, x);
  }
  function f(b, x, N) {
    return (0, i.Check)(b, x, N) ? N : (0, o.Create)(b, x);
  }
  function T(b, x, N) {
    if ((0, i.Check)(b, x, N))
      return (0, t.Clone)(N);
    const q = (0, e.IsArray)(N) ? (0, t.Clone)(N) : (0, o.Create)(b, x), k = (0, e.IsNumber)(b.minItems) && q.length < b.minItems ? [...q, ...Array.from({ length: b.minItems - q.length }, () => null)] : q, Y = ((0, e.IsNumber)(b.maxItems) && k.length > b.maxItems ? k.slice(0, b.maxItems) : k).map((F) => P(b.items, x, F));
    if (b.uniqueItems !== !0)
      return Y;
    const H = [...new Set(Y)];
    if (!(0, i.Check)(b, x, H))
      throw new u(b, "Array cast produced invalid data due to uniqueItems constraint");
    return H;
  }
  function h(b, x, N) {
    if ((0, i.Check)(b, x, N))
      return (0, o.Create)(b, x);
    const q = new Set(b.returns.required || []), k = function() {
    };
    for (const [G, Y] of Object.entries(b.returns.properties))
      !q.has(G) && N.prototype[G] === void 0 || (k.prototype[G] = P(Y, x, N.prototype[G]));
    return k;
  }
  function I(b, x, N) {
    const q = globalThis.Object.values(b.$defs), k = b.$defs[b.$ref];
    return P(k, [...x, ...q], N);
  }
  function _(b, x, N) {
    const q = (0, o.Create)(b, x), k = (0, e.IsObject)(q) && (0, e.IsObject)(N) ? { ...q, ...N } : N;
    return (0, i.Check)(b, x, k) ? k : (0, o.Create)(b, x);
  }
  function A(b, x, N) {
    throw new u(b, "Never types cannot be cast");
  }
  function v(b, x, N) {
    if ((0, i.Check)(b, x, N))
      return N;
    if (N === null || typeof N != "object")
      return (0, o.Create)(b, x);
    const q = new Set(b.required || []), k = {};
    for (const [G, Y] of Object.entries(b.properties))
      !q.has(G) && N[G] === void 0 || (k[G] = P(Y, x, N[G]));
    if (typeof b.additionalProperties == "object") {
      const G = Object.getOwnPropertyNames(b.properties);
      for (const Y of Object.getOwnPropertyNames(N))
        G.includes(Y) || (k[Y] = P(b.additionalProperties, x, N[Y]));
    }
    return k;
  }
  function j(b, x, N) {
    if ((0, i.Check)(b, x, N))
      return (0, t.Clone)(N);
    if (N === null || typeof N != "object" || Array.isArray(N) || N instanceof Date)
      return (0, o.Create)(b, x);
    const q = Object.getOwnPropertyNames(b.patternProperties)[0], k = b.patternProperties[q], G = {};
    for (const [Y, H] of Object.entries(N))
      G[Y] = P(k, x, H);
    return G;
  }
  function w(b, x, N) {
    return P((0, a.Deref)(b, x), x, N);
  }
  function l(b, x, N) {
    return P((0, a.Deref)(b, x), x, N);
  }
  function R(b, x, N) {
    return (0, i.Check)(b, x, N) ? (0, t.Clone)(N) : (0, e.IsArray)(N) ? b.items === void 0 ? [] : b.items.map((q, k) => P(q, x, N[k])) : (0, o.Create)(b, x);
  }
  function y(b, x, N) {
    return (0, i.Check)(b, x, N) ? (0, t.Clone)(N) : p(b, x, N);
  }
  function P(b, x, N) {
    const q = (0, e.IsString)(b.$id) ? (0, a.Pushref)(b, x) : x, k = b;
    switch (b[r.Kind]) {
      // --------------------------------------------------------------
      // Structural
      // --------------------------------------------------------------
      case "Array":
        return T(k, q, N);
      case "Constructor":
        return h(k, q, N);
      case "Import":
        return I(k, q, N);
      case "Intersect":
        return _(k, q, N);
      case "Never":
        return A(k);
      case "Object":
        return v(k, q, N);
      case "Record":
        return j(k, q, N);
      case "Ref":
        return w(k, q, N);
      case "This":
        return l(k, q, N);
      case "Tuple":
        return R(k, q, N);
      case "Union":
        return y(k, q, N);
      // --------------------------------------------------------------
      // DefaultClone
      // --------------------------------------------------------------
      case "Date":
      case "Symbol":
      case "Uint8Array":
        return d(b, x, N);
      // --------------------------------------------------------------
      // Default
      // --------------------------------------------------------------
      default:
        return f(k, q, N);
    }
  }
  function E(...b) {
    return b.length === 3 ? P(b[0], b[1], b[2]) : P(b[0], [], b[1]);
  }
  return oo;
}
var Xg;
function vP() {
  return Xg || (Xg = 1, function(e) {
    var n = Fr && Fr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Fr && Fr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Ix(), e);
  }(Fr)), Fr;
}
var qr = {}, ju = {}, zg;
function Px() {
  if (zg) return ju;
  zg = 1, Object.defineProperty(ju, "__esModule", { value: !0 }), ju.Clean = v;
  const e = /* @__PURE__ */ Qn(), n = /* @__PURE__ */ Hn(), r = /* @__PURE__ */ ut(), o = /* @__PURE__ */ Zn(), i = /* @__PURE__ */ me(), t = /* @__PURE__ */ an(), a = /* @__PURE__ */ qe();
  function u(j) {
    return (0, a.IsKind)(j) && j[i.Kind] !== "Unsafe";
  }
  function c(j, w, l) {
    return (0, t.IsArray)(l) ? l.map((R) => A(j.items, w, R)) : l;
  }
  function s(j, w, l) {
    const R = globalThis.Object.values(j.$defs), y = j.$defs[j.$ref];
    return A(y, [...w, ...R], l);
  }
  function p(j, w, l) {
    const R = j.unevaluatedProperties, P = j.allOf.map((b) => A(b, w, (0, r.Clone)(l))).reduce((b, x) => (0, t.IsObject)(x) ? { ...b, ...x } : x, {});
    if (!(0, t.IsObject)(l) || !(0, t.IsObject)(P) || !(0, a.IsKind)(R))
      return P;
    const E = (0, e.KeyOfPropertyKeys)(j);
    for (const b of Object.getOwnPropertyNames(l))
      E.includes(b) || (0, n.Check)(R, w, l[b]) && (P[b] = A(R, w, l[b]));
    return P;
  }
  function d(j, w, l) {
    if (!(0, t.IsObject)(l) || (0, t.IsArray)(l))
      return l;
    const R = j.additionalProperties;
    for (const y of Object.getOwnPropertyNames(l)) {
      if ((0, t.HasPropertyKey)(j.properties, y)) {
        l[y] = A(j.properties[y], w, l[y]);
        continue;
      }
      if ((0, a.IsKind)(R) && (0, n.Check)(R, w, l[y])) {
        l[y] = A(R, w, l[y]);
        continue;
      }
      delete l[y];
    }
    return l;
  }
  function f(j, w, l) {
    if (!(0, t.IsObject)(l))
      return l;
    const R = j.additionalProperties, y = Object.getOwnPropertyNames(l), [P, E] = Object.entries(j.patternProperties)[0], b = new RegExp(P);
    for (const x of y) {
      if (b.test(x)) {
        l[x] = A(E, w, l[x]);
        continue;
      }
      if ((0, a.IsKind)(R) && (0, n.Check)(R, w, l[x])) {
        l[x] = A(R, w, l[x]);
        continue;
      }
      delete l[x];
    }
    return l;
  }
  function T(j, w, l) {
    return A((0, o.Deref)(j, w), w, l);
  }
  function h(j, w, l) {
    return A((0, o.Deref)(j, w), w, l);
  }
  function I(j, w, l) {
    if (!(0, t.IsArray)(l))
      return l;
    if ((0, t.IsUndefined)(j.items))
      return [];
    const R = Math.min(l.length, j.items.length);
    for (let y = 0; y < R; y++)
      l[y] = A(j.items[y], w, l[y]);
    return l.length > R ? l.slice(0, R) : l;
  }
  function _(j, w, l) {
    for (const R of j.anyOf)
      if (u(R) && (0, n.Check)(R, w, l))
        return A(R, w, l);
    return l;
  }
  function A(j, w, l) {
    const R = (0, t.IsString)(j.$id) ? (0, o.Pushref)(j, w) : w, y = j;
    switch (y[i.Kind]) {
      case "Array":
        return c(y, R, l);
      case "Import":
        return s(y, R, l);
      case "Intersect":
        return p(y, R, l);
      case "Object":
        return d(y, R, l);
      case "Record":
        return f(y, R, l);
      case "Ref":
        return T(y, R, l);
      case "This":
        return h(y, R, l);
      case "Tuple":
        return I(y, R, l);
      case "Union":
        return _(y, R, l);
      default:
        return l;
    }
  }
  function v(...j) {
    return j.length === 3 ? A(j[0], j[1], j[2]) : A(j[0], [], j[1]);
  }
  return ju;
}
var Yg;
function il() {
  return Yg || (Yg = 1, function(e) {
    var n = qr && qr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = qr && qr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Px(), e);
  }(qr)), qr;
}
var Kr = {}, Du = {}, Jg;
function Ox() {
  if (Jg) return Du;
  Jg = 1, Object.defineProperty(Du, "__esModule", { value: !0 }), Du.Convert = K;
  const e = /* @__PURE__ */ ut(), n = /* @__PURE__ */ Hn(), r = /* @__PURE__ */ Zn(), o = /* @__PURE__ */ me(), i = /* @__PURE__ */ an();
  function t($) {
    return (0, i.IsString)($) && !isNaN($) && !isNaN(parseFloat($));
  }
  function a($) {
    return (0, i.IsBigInt)($) || (0, i.IsBoolean)($) || (0, i.IsNumber)($);
  }
  function u($) {
    return $ === !0 || (0, i.IsNumber)($) && $ === 1 || (0, i.IsBigInt)($) && $ === BigInt("1") || (0, i.IsString)($) && ($.toLowerCase() === "true" || $ === "1");
  }
  function c($) {
    return $ === !1 || (0, i.IsNumber)($) && ($ === 0 || Object.is($, -0)) || (0, i.IsBigInt)($) && $ === BigInt("0") || (0, i.IsString)($) && ($.toLowerCase() === "false" || $ === "0" || $ === "-0");
  }
  function s($) {
    return (0, i.IsString)($) && /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test($);
  }
  function p($) {
    return (0, i.IsString)($) && /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test($);
  }
  function d($) {
    return (0, i.IsString)($) && /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test($);
  }
  function f($) {
    return (0, i.IsString)($) && /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test($);
  }
  function T($) {
    return (0, i.IsString)($) && /^\d\d\d\d-[0-1]\d-[0-3]\d$/i.test($);
  }
  function h($, g) {
    const O = w($);
    return O === g ? O : $;
  }
  function I($, g) {
    const O = l($);
    return O === g ? O : $;
  }
  function _($, g) {
    const O = v($);
    return O === g ? O : $;
  }
  function A($, g) {
    return (0, i.IsString)($.const) ? h(g, $.const) : (0, i.IsNumber)($.const) ? I(g, $.const) : (0, i.IsBoolean)($.const) ? _(g, $.const) : g;
  }
  function v($) {
    return u($) ? !0 : c($) ? !1 : $;
  }
  function j($) {
    const g = (O) => O.split(".")[0];
    return t($) ? BigInt(g($)) : (0, i.IsNumber)($) ? BigInt(Math.trunc($)) : c($) ? BigInt(0) : u($) ? BigInt(1) : $;
  }
  function w($) {
    return (0, i.IsSymbol)($) && $.description !== void 0 ? $.description.toString() : a($) ? $.toString() : $;
  }
  function l($) {
    return t($) ? parseFloat($) : u($) ? 1 : c($) ? 0 : $;
  }
  function R($) {
    return t($) ? parseInt($) : (0, i.IsNumber)($) ? $ | 0 : u($) ? 1 : c($) ? 0 : $;
  }
  function y($) {
    return (0, i.IsString)($) && $.toLowerCase() === "null" ? null : $;
  }
  function P($) {
    return (0, i.IsString)($) && $ === "undefined" ? void 0 : $;
  }
  function E($) {
    return (0, i.IsDate)($) ? $ : (0, i.IsNumber)($) ? new Date($) : u($) ? /* @__PURE__ */ new Date(1) : c($) ? /* @__PURE__ */ new Date(0) : t($) ? new Date(parseInt($)) : p($) ? /* @__PURE__ */ new Date(`1970-01-01T${$}.000Z`) : s($) ? /* @__PURE__ */ new Date(`1970-01-01T${$}`) : f($) ? /* @__PURE__ */ new Date(`${$}.000Z`) : d($) ? new Date($) : T($) ? /* @__PURE__ */ new Date(`${$}T00:00:00.000Z`) : $;
  }
  function b($) {
    return $;
  }
  function x($, g, O) {
    return ((0, i.IsArray)(O) ? O : [O]).map((V) => ne($.items, g, V));
  }
  function N($, g, O) {
    return j(O);
  }
  function q($, g, O) {
    return v(O);
  }
  function k($, g, O) {
    return E(O);
  }
  function G($, g, O) {
    const D = globalThis.Object.values($.$defs), V = $.$defs[$.$ref];
    return ne(V, [...g, ...D], O);
  }
  function Y($, g, O) {
    return R(O);
  }
  function H($, g, O) {
    return $.allOf.reduce((D, V) => ne(V, g, D), O);
  }
  function F($, g, O) {
    return A($, O);
  }
  function te($, g, O) {
    return y(O);
  }
  function ce($, g, O) {
    return l(O);
  }
  function Te($, g, O) {
    if (!(0, i.IsObject)(O))
      return O;
    for (const D of Object.getOwnPropertyNames($.properties))
      (0, i.HasPropertyKey)(O, D) && (O[D] = ne($.properties[D], g, O[D]));
    return O;
  }
  function Oe($, g, O) {
    if (!(0, i.IsObject)(O))
      return O;
    const V = Object.getOwnPropertyNames($.patternProperties)[0], m = $.patternProperties[V];
    for (const [Z, X] of Object.entries(O))
      O[Z] = ne(m, g, X);
    return O;
  }
  function we($, g, O) {
    return ne((0, r.Deref)($, g), g, O);
  }
  function ye($, g, O) {
    return w(O);
  }
  function Ke($, g, O) {
    return (0, i.IsString)(O) || (0, i.IsNumber)(O) ? Symbol(O) : O;
  }
  function J($, g, O) {
    return ne((0, r.Deref)($, g), g, O);
  }
  function re($, g, O) {
    return (0, i.IsArray)(O) && !(0, i.IsUndefined)($.items) ? O.map((V, m) => m < $.items.length ? ne($.items[m], g, V) : V) : O;
  }
  function _e($, g, O) {
    return P(O);
  }
  function Ee($, g, O) {
    for (const D of $.anyOf) {
      const V = ne(D, g, (0, e.Clone)(O));
      if ((0, n.Check)(D, g, V))
        return V;
    }
    return O;
  }
  function ne($, g, O) {
    const D = (0, r.Pushref)($, g), V = $;
    switch ($[o.Kind]) {
      case "Array":
        return x(V, D, O);
      case "BigInt":
        return N(V, D, O);
      case "Boolean":
        return q(V, D, O);
      case "Date":
        return k(V, D, O);
      case "Import":
        return G(V, D, O);
      case "Integer":
        return Y(V, D, O);
      case "Intersect":
        return H(V, D, O);
      case "Literal":
        return F(V, D, O);
      case "Null":
        return te(V, D, O);
      case "Number":
        return ce(V, D, O);
      case "Object":
        return Te(V, D, O);
      case "Record":
        return Oe(V, D, O);
      case "Ref":
        return we(V, D, O);
      case "String":
        return ye(V, D, O);
      case "Symbol":
        return Ke(V, D, O);
      case "This":
        return J(V, D, O);
      case "Tuple":
        return re(V, D, O);
      case "Undefined":
        return _e(V, D, O);
      case "Union":
        return Ee(V, D, O);
      default:
        return O;
    }
  }
  function K(...$) {
    return $.length === 3 ? ne($[0], $[1], $[2]) : ne($[0], [], $[1]);
  }
  return Du;
}
var Qg;
function ol() {
  return Qg || (Qg = 1, function(e) {
    var n = Kr && Kr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Kr && Kr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Ox(), e);
  }(Kr)), Kr;
}
var Gr = {}, Fu = {}, Hr = {}, wt = {}, Zg;
function Ax() {
  if (Zg) return wt;
  Zg = 1, Object.defineProperty(wt, "__esModule", { value: !0 }), wt.TransformDecodeError = wt.TransformDecodeCheckError = void 0, wt.TransformDecode = R;
  const e = /* @__PURE__ */ fc(), n = /* @__PURE__ */ me(), r = /* @__PURE__ */ ze(), o = /* @__PURE__ */ Qn(), i = /* @__PURE__ */ Zn(), t = /* @__PURE__ */ Hn(), a = /* @__PURE__ */ an(), u = /* @__PURE__ */ qe();
  class c extends r.TypeBoxError {
    constructor(P, E, b) {
      super("Unable to decode value as it does not match the expected schema"), this.schema = P, this.value = E, this.error = b;
    }
  }
  wt.TransformDecodeCheckError = c;
  class s extends r.TypeBoxError {
    constructor(P, E, b, x) {
      super(x instanceof Error ? x.message : "Unknown error"), this.schema = P, this.path = E, this.value = b, this.error = x;
    }
  }
  wt.TransformDecodeError = s;
  function p(y, P, E) {
    try {
      return (0, u.IsTransform)(y) ? y[n.TransformKind].Decode(E) : E;
    } catch (b) {
      throw new s(y, P, E, b);
    }
  }
  function d(y, P, E, b) {
    return (0, a.IsArray)(b) ? p(y, E, b.map((x, N) => l(y.items, P, `${E}/${N}`, x))) : p(y, E, b);
  }
  function f(y, P, E, b) {
    if (!(0, a.IsObject)(b) || (0, a.IsValueType)(b))
      return p(y, E, b);
    const x = (0, o.KeyOfPropertyEntries)(y), N = x.map((H) => H[0]), q = { ...b };
    for (const [H, F] of x)
      H in q && (q[H] = l(F, P, `${E}/${H}`, q[H]));
    if (!(0, u.IsTransform)(y.unevaluatedProperties))
      return p(y, E, q);
    const k = Object.getOwnPropertyNames(q), G = y.unevaluatedProperties, Y = { ...q };
    for (const H of k)
      N.includes(H) || (Y[H] = p(G, `${E}/${H}`, Y[H]));
    return p(y, E, Y);
  }
  function T(y, P, E, b) {
    const x = globalThis.Object.values(y.$defs), N = y.$defs[y.$ref], q = y[n.TransformKind], k = { [n.TransformKind]: q, ...N };
    return l(k, [...P, ...x], E, b);
  }
  function h(y, P, E, b) {
    return p(y, E, l(y.not, P, E, b));
  }
  function I(y, P, E, b) {
    if (!(0, a.IsObject)(b))
      return p(y, E, b);
    const x = (0, o.KeyOfPropertyKeys)(y), N = { ...b };
    for (const Y of x)
      (0, a.HasPropertyKey)(N, Y) && ((0, a.IsUndefined)(N[Y]) && (!(0, u.IsUndefined)(y.properties[Y]) || e.TypeSystemPolicy.IsExactOptionalProperty(N, Y)) || (N[Y] = l(y.properties[Y], P, `${E}/${Y}`, N[Y])));
    if (!(0, u.IsSchema)(y.additionalProperties))
      return p(y, E, N);
    const q = Object.getOwnPropertyNames(N), k = y.additionalProperties, G = { ...N };
    for (const Y of q)
      x.includes(Y) || (G[Y] = p(k, `${E}/${Y}`, G[Y]));
    return p(y, E, G);
  }
  function _(y, P, E, b) {
    if (!(0, a.IsObject)(b))
      return p(y, E, b);
    const x = Object.getOwnPropertyNames(y.patternProperties)[0], N = new RegExp(x), q = { ...b };
    for (const H of Object.getOwnPropertyNames(b))
      N.test(H) && (q[H] = l(y.patternProperties[x], P, `${E}/${H}`, q[H]));
    if (!(0, u.IsSchema)(y.additionalProperties))
      return p(y, E, q);
    const k = Object.getOwnPropertyNames(q), G = y.additionalProperties, Y = { ...q };
    for (const H of k)
      N.test(H) || (Y[H] = p(G, `${E}/${H}`, Y[H]));
    return p(y, E, Y);
  }
  function A(y, P, E, b) {
    const x = (0, i.Deref)(y, P);
    return p(y, E, l(x, P, E, b));
  }
  function v(y, P, E, b) {
    const x = (0, i.Deref)(y, P);
    return p(y, E, l(x, P, E, b));
  }
  function j(y, P, E, b) {
    return (0, a.IsArray)(b) && (0, a.IsArray)(y.items) ? p(y, E, y.items.map((x, N) => l(x, P, `${E}/${N}`, b[N]))) : p(y, E, b);
  }
  function w(y, P, E, b) {
    for (const x of y.anyOf) {
      if (!(0, t.Check)(x, P, b))
        continue;
      const N = l(x, P, E, b);
      return p(y, E, N);
    }
    return p(y, E, b);
  }
  function l(y, P, E, b) {
    const x = (0, i.Pushref)(y, P), N = y;
    switch (y[n.Kind]) {
      case "Array":
        return d(N, x, E, b);
      case "Import":
        return T(N, x, E, b);
      case "Intersect":
        return f(N, x, E, b);
      case "Not":
        return h(N, x, E, b);
      case "Object":
        return I(N, x, E, b);
      case "Record":
        return _(N, x, E, b);
      case "Ref":
        return A(N, x, E, b);
      case "Symbol":
        return p(N, E, b);
      case "This":
        return v(N, x, E, b);
      case "Tuple":
        return j(N, x, E, b);
      case "Union":
        return w(N, x, E, b);
      default:
        return p(N, E, b);
    }
  }
  function R(y, P, E) {
    return l(y, P, "", E);
  }
  return wt;
}
var St = {}, eT;
function Rx() {
  if (eT) return St;
  eT = 1, Object.defineProperty(St, "__esModule", { value: !0 }), St.TransformEncodeError = St.TransformEncodeCheckError = void 0, St.TransformEncode = R;
  const e = /* @__PURE__ */ fc(), n = /* @__PURE__ */ me(), r = /* @__PURE__ */ ze(), o = /* @__PURE__ */ Qn(), i = /* @__PURE__ */ Zn(), t = /* @__PURE__ */ Hn(), a = /* @__PURE__ */ an(), u = /* @__PURE__ */ qe();
  class c extends r.TypeBoxError {
    constructor(P, E, b) {
      super("The encoded value does not match the expected schema"), this.schema = P, this.value = E, this.error = b;
    }
  }
  St.TransformEncodeCheckError = c;
  class s extends r.TypeBoxError {
    constructor(P, E, b, x) {
      super(`${x instanceof Error ? x.message : "Unknown error"}`), this.schema = P, this.path = E, this.value = b, this.error = x;
    }
  }
  St.TransformEncodeError = s;
  function p(y, P, E) {
    try {
      return (0, u.IsTransform)(y) ? y[n.TransformKind].Encode(E) : E;
    } catch (b) {
      throw new s(y, P, E, b);
    }
  }
  function d(y, P, E, b) {
    const x = p(y, E, b);
    return (0, a.IsArray)(x) ? x.map((N, q) => l(y.items, P, `${E}/${q}`, N)) : x;
  }
  function f(y, P, E, b) {
    const x = globalThis.Object.values(y.$defs), N = y.$defs[y.$ref], q = y[n.TransformKind], k = { [n.TransformKind]: q, ...N };
    return l(k, [...P, ...x], E, b);
  }
  function T(y, P, E, b) {
    const x = p(y, E, b);
    if (!(0, a.IsObject)(b) || (0, a.IsValueType)(b))
      return x;
    const N = (0, o.KeyOfPropertyEntries)(y), q = N.map((F) => F[0]), k = { ...x };
    for (const [F, te] of N)
      F in k && (k[F] = l(te, P, `${E}/${F}`, k[F]));
    if (!(0, u.IsTransform)(y.unevaluatedProperties))
      return k;
    const G = Object.getOwnPropertyNames(k), Y = y.unevaluatedProperties, H = { ...k };
    for (const F of G)
      q.includes(F) || (H[F] = p(Y, `${E}/${F}`, H[F]));
    return H;
  }
  function h(y, P, E, b) {
    return p(y.not, E, p(y, E, b));
  }
  function I(y, P, E, b) {
    const x = p(y, E, b);
    if (!(0, a.IsObject)(x))
      return x;
    const N = (0, o.KeyOfPropertyKeys)(y), q = { ...x };
    for (const H of N)
      (0, a.HasPropertyKey)(q, H) && ((0, a.IsUndefined)(q[H]) && (!(0, u.IsUndefined)(y.properties[H]) || e.TypeSystemPolicy.IsExactOptionalProperty(q, H)) || (q[H] = l(y.properties[H], P, `${E}/${H}`, q[H])));
    if (!(0, u.IsSchema)(y.additionalProperties))
      return q;
    const k = Object.getOwnPropertyNames(q), G = y.additionalProperties, Y = { ...q };
    for (const H of k)
      N.includes(H) || (Y[H] = p(G, `${E}/${H}`, Y[H]));
    return Y;
  }
  function _(y, P, E, b) {
    const x = p(y, E, b);
    if (!(0, a.IsObject)(b))
      return x;
    const N = Object.getOwnPropertyNames(y.patternProperties)[0], q = new RegExp(N), k = { ...x };
    for (const F of Object.getOwnPropertyNames(b))
      q.test(F) && (k[F] = l(y.patternProperties[N], P, `${E}/${F}`, k[F]));
    if (!(0, u.IsSchema)(y.additionalProperties))
      return k;
    const G = Object.getOwnPropertyNames(k), Y = y.additionalProperties, H = { ...k };
    for (const F of G)
      q.test(F) || (H[F] = p(Y, `${E}/${F}`, H[F]));
    return H;
  }
  function A(y, P, E, b) {
    const x = (0, i.Deref)(y, P), N = l(x, P, E, b);
    return p(y, E, N);
  }
  function v(y, P, E, b) {
    const x = (0, i.Deref)(y, P), N = l(x, P, E, b);
    return p(y, E, N);
  }
  function j(y, P, E, b) {
    const x = p(y, E, b);
    return (0, a.IsArray)(y.items) ? y.items.map((N, q) => l(N, P, `${E}/${q}`, x[q])) : [];
  }
  function w(y, P, E, b) {
    for (const x of y.anyOf) {
      if (!(0, t.Check)(x, P, b))
        continue;
      const N = l(x, P, E, b);
      return p(y, E, N);
    }
    for (const x of y.anyOf) {
      const N = l(x, P, E, b);
      if ((0, t.Check)(y, P, N))
        return p(y, E, N);
    }
    return p(y, E, b);
  }
  function l(y, P, E, b) {
    const x = (0, i.Pushref)(y, P), N = y;
    switch (y[n.Kind]) {
      case "Array":
        return d(N, x, E, b);
      case "Import":
        return f(N, x, E, b);
      case "Intersect":
        return T(N, x, E, b);
      case "Not":
        return h(N, x, E, b);
      case "Object":
        return I(N, x, E, b);
      case "Record":
        return _(N, x, E, b);
      case "Ref":
        return A(N, x, E, b);
      case "This":
        return v(N, x, E, b);
      case "Tuple":
        return j(N, x, E, b);
      case "Union":
        return w(N, x, E, b);
      default:
        return p(N, E, b);
    }
  }
  function R(y, P, E) {
    return l(y, P, "", E);
  }
  return St;
}
var Uu = {}, nT;
function Ex() {
  if (nT) return Uu;
  nT = 1, Object.defineProperty(Uu, "__esModule", { value: !0 }), Uu.HasTransform = w;
  const e = /* @__PURE__ */ Zn(), n = /* @__PURE__ */ me(), r = /* @__PURE__ */ qe(), o = /* @__PURE__ */ an();
  function i(l, R) {
    return (0, r.IsTransform)(l) || v(l.items, R);
  }
  function t(l, R) {
    return (0, r.IsTransform)(l) || v(l.items, R);
  }
  function a(l, R) {
    return (0, r.IsTransform)(l) || v(l.returns, R) || l.parameters.some((y) => v(y, R));
  }
  function u(l, R) {
    return (0, r.IsTransform)(l) || v(l.returns, R) || l.parameters.some((y) => v(y, R));
  }
  function c(l, R) {
    return (0, r.IsTransform)(l) || (0, r.IsTransform)(l.unevaluatedProperties) || l.allOf.some((y) => v(y, R));
  }
  function s(l, R) {
    return (0, r.IsTransform)(l) || v(l.items, R);
  }
  function p(l, R) {
    return (0, r.IsTransform)(l) || v(l.not, R);
  }
  function d(l, R) {
    return (0, r.IsTransform)(l) || Object.values(l.properties).some((y) => v(y, R)) || (0, r.IsSchema)(l.additionalProperties) && v(l.additionalProperties, R);
  }
  function f(l, R) {
    return (0, r.IsTransform)(l) || v(l.item, R);
  }
  function T(l, R) {
    const y = Object.getOwnPropertyNames(l.patternProperties)[0], P = l.patternProperties[y];
    return (0, r.IsTransform)(l) || v(P, R) || (0, r.IsSchema)(l.additionalProperties) && (0, r.IsTransform)(l.additionalProperties);
  }
  function h(l, R) {
    return (0, r.IsTransform)(l) ? !0 : v((0, e.Deref)(l, R), R);
  }
  function I(l, R) {
    return (0, r.IsTransform)(l) ? !0 : v((0, e.Deref)(l, R), R);
  }
  function _(l, R) {
    return (0, r.IsTransform)(l) || !(0, o.IsUndefined)(l.items) && l.items.some((y) => v(y, R));
  }
  function A(l, R) {
    return (0, r.IsTransform)(l) || l.anyOf.some((y) => v(y, R));
  }
  function v(l, R) {
    const y = (0, e.Pushref)(l, R), P = l;
    if (l.$id && j.has(l.$id))
      return !1;
    switch (l.$id && j.add(l.$id), l[n.Kind]) {
      case "Array":
        return i(P, y);
      case "AsyncIterator":
        return t(P, y);
      case "Constructor":
        return a(P, y);
      case "Function":
        return u(P, y);
      case "Intersect":
        return c(P, y);
      case "Iterator":
        return s(P, y);
      case "Not":
        return p(P, y);
      case "Object":
        return d(P, y);
      case "Promise":
        return f(P, y);
      case "Record":
        return T(P, y);
      case "Ref":
        return h(P, y);
      case "This":
        return I(P, y);
      case "Tuple":
        return _(P, y);
      case "Union":
        return A(P, y);
      default:
        return (0, r.IsTransform)(l);
    }
  }
  const j = /* @__PURE__ */ new Set();
  function w(l, R) {
    return j.clear(), v(l, R);
  }
  return Uu;
}
var tT;
function Ba() {
  return tT || (tT = 1, function(e) {
    var n = Hr && Hr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Hr && Hr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Ax(), e), r(/* @__PURE__ */ Rx(), e), r(/* @__PURE__ */ Ex(), e);
  }(Hr)), Hr;
}
var rT;
function wx() {
  if (rT) return Fu;
  rT = 1, Object.defineProperty(Fu, "__esModule", { value: !0 }), Fu.Decode = o;
  const e = /* @__PURE__ */ Ba(), n = /* @__PURE__ */ Hn(), r = /* @__PURE__ */ qt();
  function o(...i) {
    const [t, a, u] = i.length === 3 ? [i[0], i[1], i[2]] : [i[0], [], i[1]];
    if (!(0, n.Check)(t, a, u))
      throw new e.TransformDecodeCheckError(t, u, (0, r.Errors)(t, a, u).First());
    return (0, e.HasTransform)(t, a) ? (0, e.TransformDecode)(t, a, u) : u;
  }
  return Fu;
}
var iT;
function CP() {
  return iT || (iT = 1, function(e) {
    var n = Gr && Gr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Gr && Gr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ wx(), e);
  }(Gr)), Gr;
}
var Vr = {}, Lu = {}, oT;
function Sx() {
  if (oT) return Lu;
  oT = 1, Object.defineProperty(Lu, "__esModule", { value: !0 }), Lu.Default = j;
  const e = /* @__PURE__ */ Hn(), n = /* @__PURE__ */ ut(), r = /* @__PURE__ */ Zn(), o = /* @__PURE__ */ me(), i = /* @__PURE__ */ an(), t = /* @__PURE__ */ qe();
  function a(w, l) {
    const R = (0, i.HasPropertyKey)(w, "default") ? w.default : void 0, y = (0, i.IsFunction)(R) ? R() : (0, n.Clone)(R);
    return (0, i.IsUndefined)(l) ? y : (0, i.IsObject)(l) && (0, i.IsObject)(y) ? Object.assign(y, l) : l;
  }
  function u(w) {
    return (0, t.IsKind)(w) && "default" in w;
  }
  function c(w, l, R) {
    if ((0, i.IsArray)(R)) {
      for (let P = 0; P < R.length; P++)
        R[P] = v(w.items, l, R[P]);
      return R;
    }
    const y = a(w, R);
    if (!(0, i.IsArray)(y))
      return y;
    for (let P = 0; P < y.length; P++)
      y[P] = v(w.items, l, y[P]);
    return y;
  }
  function s(w, l, R) {
    return (0, i.IsDate)(R) ? R : a(w, R);
  }
  function p(w, l, R) {
    const y = globalThis.Object.values(w.$defs), P = w.$defs[w.$ref];
    return v(P, [...l, ...y], R);
  }
  function d(w, l, R) {
    const y = a(w, R);
    return w.allOf.reduce((P, E) => {
      const b = v(E, l, y);
      return (0, i.IsObject)(b) ? { ...P, ...b } : b;
    }, {});
  }
  function f(w, l, R) {
    const y = a(w, R);
    if (!(0, i.IsObject)(y))
      return y;
    const P = Object.getOwnPropertyNames(w.properties);
    for (const E of P) {
      const b = v(w.properties[E], l, y[E]);
      (0, i.IsUndefined)(b) || (y[E] = v(w.properties[E], l, y[E]));
    }
    if (!u(w.additionalProperties))
      return y;
    for (const E of Object.getOwnPropertyNames(y))
      P.includes(E) || (y[E] = v(w.additionalProperties, l, y[E]));
    return y;
  }
  function T(w, l, R) {
    const y = a(w, R);
    if (!(0, i.IsObject)(y))
      return y;
    const P = w.additionalProperties, [E, b] = Object.entries(w.patternProperties)[0], x = new RegExp(E);
    for (const N of Object.getOwnPropertyNames(y))
      x.test(N) && u(b) && (y[N] = v(b, l, y[N]));
    if (!u(P))
      return y;
    for (const N of Object.getOwnPropertyNames(y))
      x.test(N) || (y[N] = v(P, l, y[N]));
    return y;
  }
  function h(w, l, R) {
    return v((0, r.Deref)(w, l), l, a(w, R));
  }
  function I(w, l, R) {
    return v((0, r.Deref)(w, l), l, R);
  }
  function _(w, l, R) {
    const y = a(w, R);
    if (!(0, i.IsArray)(y) || (0, i.IsUndefined)(w.items))
      return y;
    const [P, E] = [w.items, Math.max(w.items.length, y.length)];
    for (let b = 0; b < E; b++)
      b < P.length && (y[b] = v(P[b], l, y[b]));
    return y;
  }
  function A(w, l, R) {
    const y = a(w, R);
    for (const P of w.anyOf) {
      const E = v(P, l, (0, n.Clone)(y));
      if ((0, e.Check)(P, l, E))
        return E;
    }
    return y;
  }
  function v(w, l, R) {
    const y = (0, r.Pushref)(w, l), P = w;
    switch (P[o.Kind]) {
      case "Array":
        return c(P, y, R);
      case "Date":
        return s(P, y, R);
      case "Import":
        return p(P, y, R);
      case "Intersect":
        return d(P, y, R);
      case "Object":
        return f(P, y, R);
      case "Record":
        return T(P, y, R);
      case "Ref":
        return h(P, y, R);
      case "This":
        return I(P, y, R);
      case "Tuple":
        return _(P, y, R);
      case "Union":
        return A(P, y, R);
      default:
        return a(P, R);
    }
  }
  function j(...w) {
    return w.length === 3 ? v(w[0], w[1], w[2]) : v(w[0], [], w[1]);
  }
  return Lu;
}
var aT;
function al() {
  return aT || (aT = 1, function(e) {
    var n = Vr && Vr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Vr && Vr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Sx(), e);
  }(Vr)), Vr;
}
var Wr = {}, pd = {}, Wo = {}, Dn = {}, uT;
function vx() {
  if (uT) return Dn;
  uT = 1, Object.defineProperty(Dn, "__esModule", { value: !0 }), Dn.ValuePointerRootDeleteError = Dn.ValuePointerRootSetError = void 0, Dn.Format = i, Dn.Set = t, Dn.Delete = a, Dn.Has = u, Dn.Get = c;
  const e = /* @__PURE__ */ ze();
  class n extends e.TypeBoxError {
    constructor(p, d, f) {
      super("Cannot set root value"), this.value = p, this.path = d, this.update = f;
    }
  }
  Dn.ValuePointerRootSetError = n;
  class r extends e.TypeBoxError {
    constructor(p, d) {
      super("Cannot delete root value"), this.value = p, this.path = d;
    }
  }
  Dn.ValuePointerRootDeleteError = r;
  function o(s) {
    return s.indexOf("~") === -1 ? s : s.replace(/~1/g, "/").replace(/~0/g, "~");
  }
  function* i(s) {
    if (s === "")
      return;
    let [p, d] = [0, 0];
    for (let f = 0; f < s.length; f++)
      s.charAt(f) === "/" ? (f === 0 || (d = f, yield o(s.slice(p, d))), p = f + 1) : d = f;
    yield o(s.slice(p));
  }
  function t(s, p, d) {
    if (p === "")
      throw new n(s, p, d);
    let [f, T, h] = [null, s, ""];
    for (const I of i(p))
      T[I] === void 0 && (T[I] = {}), f = T, T = T[I], h = I;
    f[h] = d;
  }
  function a(s, p) {
    if (p === "")
      throw new r(s, p);
    let [d, f, T] = [null, s, ""];
    for (const h of i(p)) {
      if (f[h] === void 0 || f[h] === null)
        return;
      d = f, f = f[h], T = h;
    }
    if (Array.isArray(d)) {
      const h = parseInt(T);
      d.splice(h, 1);
    } else
      delete d[T];
  }
  function u(s, p) {
    if (p === "")
      return !0;
    let [d, f, T] = [null, s, ""];
    for (const h of i(p)) {
      if (f[h] === void 0)
        return !1;
      d = f, f = f[h], T = h;
    }
    return Object.getOwnPropertyNames(d).includes(T);
  }
  function c(s, p) {
    if (p === "")
      return s;
    let d = s;
    for (const f of i(p)) {
      if (d[f] === void 0)
        return;
      d = d[f];
    }
    return d;
  }
  return Dn;
}
var sT;
function ul() {
  return sT || (sT = 1, Object.defineProperty(Wo, "__esModule", { value: !0 }), Wo.ValuePointer = void 0, Wo.ValuePointer = /* @__PURE__ */ vx()), Wo;
}
var qu = {}, cT;
function MP() {
  if (cT) return qu;
  cT = 1, Object.defineProperty(qu, "__esModule", { value: !0 }), qu.Equal = a;
  const e = /* @__PURE__ */ an();
  function n(u, c) {
    if (!(0, e.IsObject)(c))
      return !1;
    const s = [...Object.keys(u), ...Object.getOwnPropertySymbols(u)], p = [...Object.keys(c), ...Object.getOwnPropertySymbols(c)];
    return s.length !== p.length ? !1 : s.every((d) => a(u[d], c[d]));
  }
  function r(u, c) {
    return (0, e.IsDate)(c) && u.getTime() === c.getTime();
  }
  function o(u, c) {
    return !(0, e.IsArray)(c) || u.length !== c.length ? !1 : u.every((s, p) => a(s, c[p]));
  }
  function i(u, c) {
    return !(0, e.IsTypedArray)(c) || u.length !== c.length || Object.getPrototypeOf(u).constructor.name !== Object.getPrototypeOf(c).constructor.name ? !1 : u.every((s, p) => a(s, c[p]));
  }
  function t(u, c) {
    return u === c;
  }
  function a(u, c) {
    if ((0, e.IsDate)(u))
      return r(u, c);
    if ((0, e.IsTypedArray)(u))
      return i(u, c);
    if ((0, e.IsArray)(u))
      return o(u, c);
    if ((0, e.IsObject)(u))
      return n(u, c);
    if ((0, e.IsValueType)(u))
      return t(u, c);
    throw new Error("ValueEquals: Unable to compare value");
  }
  return qu;
}
var dT;
function Cx() {
  return dT || (dT = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueDiffError = e.Edit = e.Delete = e.Update = e.Insert = void 0, e.Diff = l, e.Patch = P;
    const n = /* @__PURE__ */ an(), r = /* @__PURE__ */ ul(), o = /* @__PURE__ */ ut(), i = /* @__PURE__ */ MP(), t = /* @__PURE__ */ ze(), a = /* @__PURE__ */ In(), u = /* @__PURE__ */ jn(), c = /* @__PURE__ */ So(), s = /* @__PURE__ */ Co(), p = /* @__PURE__ */ Qe();
    e.Insert = (0, u.Object)({
      type: (0, a.Literal)("insert"),
      path: (0, c.String)(),
      value: (0, s.Unknown)()
    }), e.Update = (0, u.Object)({
      type: (0, a.Literal)("update"),
      path: (0, c.String)(),
      value: (0, s.Unknown)()
    }), e.Delete = (0, u.Object)({
      type: (0, a.Literal)("delete"),
      path: (0, c.String)()
    }), e.Edit = (0, p.Union)([e.Insert, e.Update, e.Delete]);
    class d extends t.TypeBoxError {
      constructor(b, x) {
        super(x), this.value = b;
      }
    }
    e.ValueDiffError = d;
    function f(E, b) {
      return { type: "update", path: E, value: b };
    }
    function T(E, b) {
      return { type: "insert", path: E, value: b };
    }
    function h(E) {
      return { type: "delete", path: E };
    }
    function I(E) {
      if (globalThis.Object.getOwnPropertySymbols(E).length > 0)
        throw new d(E, "Cannot diff objects with symbols");
    }
    function* _(E, b, x) {
      if (I(b), I(x), !(0, n.IsStandardObject)(x))
        return yield f(E, x);
      const N = globalThis.Object.getOwnPropertyNames(b), q = globalThis.Object.getOwnPropertyNames(x);
      for (const k of q)
        (0, n.HasPropertyKey)(b, k) || (yield T(`${E}/${k}`, x[k]));
      for (const k of N)
        (0, n.HasPropertyKey)(x, k) && ((0, i.Equal)(b, x) || (yield* w(`${E}/${k}`, b[k], x[k])));
      for (const k of N)
        (0, n.HasPropertyKey)(x, k) || (yield h(`${E}/${k}`));
    }
    function* A(E, b, x) {
      if (!(0, n.IsArray)(x))
        return yield f(E, x);
      for (let N = 0; N < Math.min(b.length, x.length); N++)
        yield* w(`${E}/${N}`, b[N], x[N]);
      for (let N = 0; N < x.length; N++)
        N < b.length || (yield T(`${E}/${N}`, x[N]));
      for (let N = b.length - 1; N >= 0; N--)
        N < x.length || (yield h(`${E}/${N}`));
    }
    function* v(E, b, x) {
      if (!(0, n.IsTypedArray)(x) || b.length !== x.length || globalThis.Object.getPrototypeOf(b).constructor.name !== globalThis.Object.getPrototypeOf(x).constructor.name)
        return yield f(E, x);
      for (let N = 0; N < Math.min(b.length, x.length); N++)
        yield* w(`${E}/${N}`, b[N], x[N]);
    }
    function* j(E, b, x) {
      b !== x && (yield f(E, x));
    }
    function* w(E, b, x) {
      if ((0, n.IsStandardObject)(b))
        return yield* _(E, b, x);
      if ((0, n.IsArray)(b))
        return yield* A(E, b, x);
      if ((0, n.IsTypedArray)(b))
        return yield* v(E, b, x);
      if ((0, n.IsValueType)(b))
        return yield* j(E, b, x);
      throw new d(b, "Unable to diff value");
    }
    function l(E, b) {
      return [...w("", E, b)];
    }
    function R(E) {
      return E.length > 0 && E[0].path === "" && E[0].type === "update";
    }
    function y(E) {
      return E.length === 0;
    }
    function P(E, b) {
      if (R(b))
        return (0, o.Clone)(b[0].value);
      if (y(b))
        return (0, o.Clone)(E);
      const x = (0, o.Clone)(E);
      for (const N of b)
        switch (N.type) {
          case "insert": {
            r.ValuePointer.Set(x, N.path, N.value);
            break;
          }
          case "update": {
            r.ValuePointer.Set(x, N.path, N.value);
            break;
          }
          case "delete": {
            r.ValuePointer.Delete(x, N.path);
            break;
          }
        }
      return x;
    }
  }(pd)), pd;
}
var pT;
function xP() {
  return pT || (pT = 1, function(e) {
    var n = Wr && Wr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Wr && Wr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Cx(), e);
  }(Wr)), Wr;
}
var kr = {}, Ku = {}, fT;
function Mx() {
  if (fT) return Ku;
  fT = 1, Object.defineProperty(Ku, "__esModule", { value: !0 }), Ku.Encode = o;
  const e = /* @__PURE__ */ Ba(), n = /* @__PURE__ */ Hn(), r = /* @__PURE__ */ qt();
  function o(...i) {
    const [t, a, u] = i.length === 3 ? [i[0], i[1], i[2]] : [i[0], [], i[1]], c = (0, e.HasTransform)(t, a) ? (0, e.TransformEncode)(t, a, u) : u;
    if (!(0, n.Check)(t, a, c))
      throw new e.TransformEncodeCheckError(t, c, (0, r.Errors)(t, a, c).First());
    return c;
  }
  return Ku;
}
var lT;
function $P() {
  return lT || (lT = 1, function(e) {
    var n = kr && kr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = kr && kr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Mx(), e);
  }(kr)), kr;
}
var Xr = {}, yT;
function NP() {
  return yT || (yT = 1, function(e) {
    var n = Xr && Xr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Xr && Xr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ MP(), e);
  }(Xr)), Xr;
}
var zr = {}, uo = {}, mT;
function xx() {
  if (mT) return uo;
  mT = 1, Object.defineProperty(uo, "__esModule", { value: !0 }), uo.ValueMutateError = void 0, uo.Mutate = T;
  const e = /* @__PURE__ */ an(), n = /* @__PURE__ */ ul(), r = /* @__PURE__ */ ut(), o = /* @__PURE__ */ ze();
  function i(h) {
    return (0, e.IsObject)(h) && !(0, e.IsArray)(h);
  }
  class t extends o.TypeBoxError {
    constructor(I) {
      super(I);
    }
  }
  uo.ValueMutateError = t;
  function a(h, I, _, A) {
    if (!i(_))
      n.ValuePointer.Set(h, I, (0, r.Clone)(A));
    else {
      const v = Object.getOwnPropertyNames(_), j = Object.getOwnPropertyNames(A);
      for (const w of v)
        j.includes(w) || delete _[w];
      for (const w of j)
        v.includes(w) || (_[w] = null);
      for (const w of j)
        p(h, `${I}/${w}`, _[w], A[w]);
    }
  }
  function u(h, I, _, A) {
    if (!(0, e.IsArray)(_))
      n.ValuePointer.Set(h, I, (0, r.Clone)(A));
    else {
      for (let v = 0; v < A.length; v++)
        p(h, `${I}/${v}`, _[v], A[v]);
      _.splice(A.length);
    }
  }
  function c(h, I, _, A) {
    if ((0, e.IsTypedArray)(_) && _.length === A.length)
      for (let v = 0; v < _.length; v++)
        _[v] = A[v];
    else
      n.ValuePointer.Set(h, I, (0, r.Clone)(A));
  }
  function s(h, I, _, A) {
    _ !== A && n.ValuePointer.Set(h, I, A);
  }
  function p(h, I, _, A) {
    if ((0, e.IsArray)(A))
      return u(h, I, _, A);
    if ((0, e.IsTypedArray)(A))
      return c(h, I, _, A);
    if (i(A))
      return a(h, I, _, A);
    if ((0, e.IsValueType)(A))
      return s(h, I, _, A);
  }
  function d(h) {
    return (0, e.IsTypedArray)(h) || (0, e.IsValueType)(h);
  }
  function f(h, I) {
    return i(h) && (0, e.IsArray)(I) || (0, e.IsArray)(h) && i(I);
  }
  function T(h, I) {
    if (d(h) || d(I))
      throw new t("Only object and array types can be mutated at the root level");
    if (f(h, I))
      throw new t("Cannot assign due type mismatch of assignable values");
    p(h, "", h, I);
  }
  return uo;
}
var gT;
function BP() {
  return gT || (gT = 1, function(e) {
    var n = zr && zr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = zr && zr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ xx(), e);
  }(zr)), zr;
}
var Yr = {}, fd = {}, TT;
function $x() {
  return TT || (TT = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ParseDefault = e.ParseRegistry = e.ParseError = void 0, e.Parse = f;
    const n = /* @__PURE__ */ ze(), r = /* @__PURE__ */ Ba(), o = /* @__PURE__ */ tl(), i = /* @__PURE__ */ al(), t = /* @__PURE__ */ ol(), a = /* @__PURE__ */ il(), u = /* @__PURE__ */ ut(), c = /* @__PURE__ */ an();
    class s extends n.TypeBoxError {
      constructor(h) {
        super(h);
      }
    }
    e.ParseError = s;
    var p;
    (function(T) {
      const h = /* @__PURE__ */ new Map([
        ["Clone", (v, j, w) => (0, u.Clone)(w)],
        ["Clean", (v, j, w) => (0, a.Clean)(v, j, w)],
        ["Default", (v, j, w) => (0, i.Default)(v, j, w)],
        ["Convert", (v, j, w) => (0, t.Convert)(v, j, w)],
        ["Assert", (v, j, w) => ((0, o.Assert)(v, j, w), w)],
        ["Decode", (v, j, w) => (0, r.HasTransform)(v, j) ? (0, r.TransformDecode)(v, j, w) : w],
        ["Encode", (v, j, w) => (0, r.HasTransform)(v, j) ? (0, r.TransformEncode)(v, j, w) : w]
      ]);
      function I(v) {
        h.delete(v);
      }
      T.Delete = I;
      function _(v, j) {
        h.set(v, j);
      }
      T.Set = _;
      function A(v) {
        return h.get(v);
      }
      T.Get = A;
    })(p || (e.ParseRegistry = p = {})), e.ParseDefault = [
      "Clone",
      "Clean",
      "Default",
      "Convert",
      "Assert",
      "Decode"
    ];
    function d(T, h, I, _) {
      return T.reduce((A, v) => {
        const j = p.Get(v);
        if ((0, c.IsUndefined)(j))
          throw new s(`Unable to find Parse operation '${v}'`);
        return j(h, I, A);
      }, _);
    }
    function f(...T) {
      const [h, I, _, A] = T.length === 4 ? [T[0], T[1], T[2], T[3]] : T.length === 3 ? (0, c.IsArray)(T[0]) ? [T[0], T[1], [], T[2]] : [e.ParseDefault, T[0], T[1], T[2]] : T.length === 2 ? [e.ParseDefault, T[0], [], T[1]] : (() => {
        throw new s("Invalid Arguments");
      })();
      return d(h, I, _, A);
    }
  }(fd)), fd;
}
var _T;
function jP() {
  return _T || (_T = 1, function(e) {
    var n = Yr && Yr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Yr && Yr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ $x(), e);
  }(Yr)), Yr;
}
var ko = {}, ld = {}, bT;
function Nx() {
  return bT || (bT = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.Parse = e.Mutate = e.Hash = e.Equal = e.Encode = e.Edit = e.Patch = e.Diff = e.Default = e.Decode = e.Create = e.Convert = e.Clone = e.Clean = e.Check = e.Cast = e.Assert = e.ValueErrorIterator = e.Errors = void 0;
    var n = /* @__PURE__ */ qt();
    Object.defineProperty(e, "Errors", { enumerable: !0, get: function() {
      return n.Errors;
    } }), Object.defineProperty(e, "ValueErrorIterator", { enumerable: !0, get: function() {
      return n.ValueErrorIterator;
    } });
    var r = /* @__PURE__ */ tl();
    Object.defineProperty(e, "Assert", { enumerable: !0, get: function() {
      return r.Assert;
    } });
    var o = /* @__PURE__ */ vP();
    Object.defineProperty(e, "Cast", { enumerable: !0, get: function() {
      return o.Cast;
    } });
    var i = /* @__PURE__ */ Hn();
    Object.defineProperty(e, "Check", { enumerable: !0, get: function() {
      return i.Check;
    } });
    var t = /* @__PURE__ */ il();
    Object.defineProperty(e, "Clean", { enumerable: !0, get: function() {
      return t.Clean;
    } });
    var a = /* @__PURE__ */ ut();
    Object.defineProperty(e, "Clone", { enumerable: !0, get: function() {
      return a.Clone;
    } });
    var u = /* @__PURE__ */ ol();
    Object.defineProperty(e, "Convert", { enumerable: !0, get: function() {
      return u.Convert;
    } });
    var c = /* @__PURE__ */ rl();
    Object.defineProperty(e, "Create", { enumerable: !0, get: function() {
      return c.Create;
    } });
    var s = /* @__PURE__ */ CP();
    Object.defineProperty(e, "Decode", { enumerable: !0, get: function() {
      return s.Decode;
    } });
    var p = /* @__PURE__ */ al();
    Object.defineProperty(e, "Default", { enumerable: !0, get: function() {
      return p.Default;
    } });
    var d = /* @__PURE__ */ xP();
    Object.defineProperty(e, "Diff", { enumerable: !0, get: function() {
      return d.Diff;
    } }), Object.defineProperty(e, "Patch", { enumerable: !0, get: function() {
      return d.Patch;
    } }), Object.defineProperty(e, "Edit", { enumerable: !0, get: function() {
      return d.Edit;
    } });
    var f = /* @__PURE__ */ $P();
    Object.defineProperty(e, "Encode", { enumerable: !0, get: function() {
      return f.Encode;
    } });
    var T = /* @__PURE__ */ NP();
    Object.defineProperty(e, "Equal", { enumerable: !0, get: function() {
      return T.Equal;
    } });
    var h = /* @__PURE__ */ $a();
    Object.defineProperty(e, "Hash", { enumerable: !0, get: function() {
      return h.Hash;
    } });
    var I = /* @__PURE__ */ BP();
    Object.defineProperty(e, "Mutate", { enumerable: !0, get: function() {
      return I.Mutate;
    } });
    var _ = /* @__PURE__ */ jP();
    Object.defineProperty(e, "Parse", { enumerable: !0, get: function() {
      return _.Parse;
    } });
  }(ld)), ld;
}
var hT;
function Bx() {
  return hT || (hT = 1, Object.defineProperty(ko, "__esModule", { value: !0 }), ko.Value = void 0, ko.Value = /* @__PURE__ */ Nx()), ko;
}
var IT;
function ja() {
  return IT || (IT = 1, function(e) {
    var n = Ht && Ht.__createBinding || (Object.create ? function(t, a, u, c) {
      c === void 0 && (c = u);
      var s = Object.getOwnPropertyDescriptor(a, u);
      (!s || ("get" in s ? !a.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
        return a[u];
      } }), Object.defineProperty(t, c, s);
    } : function(t, a, u, c) {
      c === void 0 && (c = u), t[c] = a[u];
    }), r = Ht && Ht.__exportStar || function(t, a) {
      for (var u in t) u !== "default" && !Object.prototype.hasOwnProperty.call(a, u) && n(a, t, u);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.Value = e.ValueErrorIterator = e.ValueErrorType = void 0;
    var o = /* @__PURE__ */ qt();
    Object.defineProperty(e, "ValueErrorType", { enumerable: !0, get: function() {
      return o.ValueErrorType;
    } }), Object.defineProperty(e, "ValueErrorIterator", { enumerable: !0, get: function() {
      return o.ValueErrorIterator;
    } }), r(/* @__PURE__ */ an(), e), r(/* @__PURE__ */ tl(), e), r(/* @__PURE__ */ vP(), e), r(/* @__PURE__ */ Hn(), e), r(/* @__PURE__ */ il(), e), r(/* @__PURE__ */ ut(), e), r(/* @__PURE__ */ ol(), e), r(/* @__PURE__ */ rl(), e), r(/* @__PURE__ */ CP(), e), r(/* @__PURE__ */ al(), e), r(/* @__PURE__ */ xP(), e), r(/* @__PURE__ */ $P(), e), r(/* @__PURE__ */ NP(), e), r(/* @__PURE__ */ $a(), e), r(/* @__PURE__ */ BP(), e), r(/* @__PURE__ */ jP(), e), r(/* @__PURE__ */ ul(), e), r(/* @__PURE__ */ Ba(), e);
    var i = /* @__PURE__ */ Bx();
    Object.defineProperty(e, "Value", { enumerable: !0, get: function() {
      return i.Value;
    } });
  }(Ht)), Ht;
}
var yd = {}, Jr = {}, Qr = {}, Xo = {}, PT;
function DP() {
  if (PT) return Xo;
  PT = 1, Object.defineProperty(Xo, "__esModule", { value: !0 }), Xo.CloneRest = n, Xo.CloneType = r;
  const e = /* @__PURE__ */ Bn();
  function n(o) {
    return o.map((i) => r(i));
  }
  function r(o, i) {
    return i === void 0 ? (0, e.Clone)(o) : (0, e.Clone)({ ...i, ...o });
  }
  return Xo;
}
var OT;
function jx() {
  return OT || (OT = 1, function(e) {
    var n = Qr && Qr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Qr && Qr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ DP(), e), r(/* @__PURE__ */ Bn(), e);
  }(Qr)), Qr;
}
var Zr = {}, Gu = {}, AT;
function Dx() {
  if (AT) return Gu;
  AT = 1, Object.defineProperty(Gu, "__esModule", { value: !0 }), Gu.Increment = e;
  function e(n) {
    return (parseInt(n) + 1).toString();
  }
  return Gu;
}
var RT;
function Fx() {
  return RT || (RT = 1, function(e) {
    var n = Zr && Zr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Zr && Zr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Dx(), e);
  }(Zr)), Zr;
}
var ei = {}, Hu = {}, ET;
function Ux() {
  if (ET) return Hu;
  ET = 1, Object.defineProperty(Hu, "__esModule", { value: !0 }), Hu.Awaited = f;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ Ft(), r = /* @__PURE__ */ Gn(), o = /* @__PURE__ */ Qe(), i = /* @__PURE__ */ Rt(), t = /* @__PURE__ */ qe();
  function a(T, h) {
    return (0, n.Computed)("Awaited", [(0, n.Computed)(T, h)]);
  }
  function u(T) {
    return (0, n.Computed)("Awaited", [(0, i.Ref)(T)]);
  }
  function c(T) {
    return (0, r.Intersect)(d(T));
  }
  function s(T) {
    return (0, o.Union)(d(T));
  }
  function p(T) {
    return f(T);
  }
  function d(T) {
    return T.map((h) => f(h));
  }
  function f(T, h) {
    return (0, e.CreateType)((0, t.IsComputed)(T) ? a(T.target, T.parameters) : (0, t.IsIntersect)(T) ? c(T.allOf) : (0, t.IsUnion)(T) ? s(T.anyOf) : (0, t.IsPromise)(T) ? p(T.item) : (0, t.IsRef)(T) ? u(T.$ref) : T, h);
  }
  return Hu;
}
var wT;
function _c() {
  return wT || (wT = 1, function(e) {
    var n = ei && ei.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = ei && ei.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Ux(), e);
  }(ei)), ei;
}
var ni = {}, Vu = {}, ST;
function Lx() {
  if (ST) return Vu;
  ST = 1, Object.defineProperty(Vu, "__esModule", { value: !0 }), Vu.Composite = p;
  const e = /* @__PURE__ */ Gn(), n = /* @__PURE__ */ at(), r = /* @__PURE__ */ Qn(), o = /* @__PURE__ */ jn(), i = /* @__PURE__ */ Tc(), t = /* @__PURE__ */ qe();
  function a(d) {
    const f = [];
    for (const T of d)
      f.push(...(0, r.KeyOfPropertyKeys)(T));
    return (0, i.SetDistinct)(f);
  }
  function u(d) {
    return d.filter((f) => !(0, t.IsNever)(f));
  }
  function c(d, f) {
    const T = [];
    for (const h of d)
      T.push(...(0, n.IndexFromPropertyKeys)(h, [f]));
    return u(T);
  }
  function s(d, f) {
    const T = {};
    for (const h of f)
      T[h] = (0, e.IntersectEvaluated)(c(d, h));
    return T;
  }
  function p(d, f) {
    const T = a(d), h = s(d, T);
    return (0, o.Object)(h, f);
  }
  return Vu;
}
var vT;
function sl() {
  return vT || (vT = 1, function(e) {
    var n = ni && ni.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = ni && ni.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Lx(), e);
  }(ni)), ni;
}
var ti = {}, Wu = {}, ri = {}, ku = {}, CT;
function qx() {
  if (CT) return ku;
  CT = 1, Object.defineProperty(ku, "__esModule", { value: !0 }), ku.Date = r;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ Pe();
  function r(o) {
    return (0, n.CreateType)({ [e.Kind]: "Date", type: "Date" }, o);
  }
  return ku;
}
var MT;
function bc() {
  return MT || (MT = 1, function(e) {
    var n = ri && ri.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = ri && ri.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ qx(), e);
  }(ri)), ri;
}
var ii = {}, Xu = {}, xT;
function Kx() {
  if (xT) return Xu;
  xT = 1, Object.defineProperty(Xu, "__esModule", { value: !0 }), Xu.Null = r;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ me();
  function r(o) {
    return (0, e.CreateType)({ [n.Kind]: "Null", type: "null" }, o);
  }
  return Xu;
}
var $T;
function hc() {
  return $T || ($T = 1, function(e) {
    var n = ii && ii.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = ii && ii.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Kx(), e);
  }(ii)), ii;
}
var oi = {}, zu = {}, NT;
function Gx() {
  if (NT) return zu;
  NT = 1, Object.defineProperty(zu, "__esModule", { value: !0 }), zu.Symbol = r;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ me();
  function r(o) {
    return (0, e.CreateType)({ [n.Kind]: "Symbol", type: "symbol" }, o);
  }
  return zu;
}
var BT;
function Ic() {
  return BT || (BT = 1, function(e) {
    var n = oi && oi.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = oi && oi.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Gx(), e);
  }(oi)), oi;
}
var ai = {}, Yu = {}, jT;
function Hx() {
  if (jT) return Yu;
  jT = 1, Object.defineProperty(Yu, "__esModule", { value: !0 }), Yu.Undefined = r;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ me();
  function r(o) {
    return (0, e.CreateType)({ [n.Kind]: "Undefined", type: "undefined" }, o);
  }
  return Yu;
}
var DT;
function Pc() {
  return DT || (DT = 1, function(e) {
    var n = ai && ai.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = ai && ai.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Hx(), e);
  }(ai)), ai;
}
var ui = {}, Ju = {}, FT;
function Vx() {
  if (FT) return Ju;
  FT = 1, Object.defineProperty(Ju, "__esModule", { value: !0 }), Ju.Uint8Array = r;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ me();
  function r(o) {
    return (0, e.CreateType)({ [n.Kind]: "Uint8Array", type: "Uint8Array" }, o);
  }
  return Ju;
}
var UT;
function Oc() {
  return UT || (UT = 1, function(e) {
    var n = ui && ui.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = ui && ui.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Vx(), e);
  }(ui)), ui;
}
var LT;
function Wx() {
  if (LT) return Wu;
  LT = 1, Object.defineProperty(Wu, "__esModule", { value: !0 }), Wu.Const = j;
  const e = /* @__PURE__ */ Na(), n = /* @__PURE__ */ Ca(), r = /* @__PURE__ */ bc(), o = /* @__PURE__ */ Qi(), i = /* @__PURE__ */ In(), t = /* @__PURE__ */ hc(), a = /* @__PURE__ */ jn(), u = /* @__PURE__ */ Ic(), c = /* @__PURE__ */ Lt(), s = /* @__PURE__ */ vo(), p = /* @__PURE__ */ Pc(), d = /* @__PURE__ */ Oc(), f = /* @__PURE__ */ Co(), T = /* @__PURE__ */ Dt(), h = /* @__PURE__ */ Nn();
  function I(w) {
    return w.map((l) => v(l, !1));
  }
  function _(w) {
    const l = {};
    for (const R of globalThis.Object.getOwnPropertyNames(w))
      l[R] = (0, s.Readonly)(v(w[R], !1));
    return l;
  }
  function A(w, l) {
    return l === !0 ? w : (0, s.Readonly)(w);
  }
  function v(w, l) {
    return (0, h.IsAsyncIterator)(w) || (0, h.IsIterator)(w) ? A((0, e.Any)(), l) : (0, h.IsArray)(w) ? (0, s.Readonly)((0, c.Tuple)(I(w))) : (0, h.IsUint8Array)(w) ? (0, d.Uint8Array)() : (0, h.IsDate)(w) ? (0, r.Date)() : (0, h.IsObject)(w) ? A((0, a.Object)(_(w)), l) : (0, h.IsFunction)(w) ? A((0, o.Function)([], (0, f.Unknown)()), l) : (0, h.IsUndefined)(w) ? (0, p.Undefined)() : (0, h.IsNull)(w) ? (0, t.Null)() : (0, h.IsSymbol)(w) ? (0, u.Symbol)() : (0, h.IsBigInt)(w) ? (0, n.BigInt)() : (0, h.IsNumber)(w) || (0, h.IsBoolean)(w) || (0, h.IsString)(w) ? (0, i.Literal)(w) : (0, a.Object)({});
  }
  function j(w, l) {
    return (0, T.CreateType)(v(w, !0), l);
  }
  return Wu;
}
var qT;
function cl() {
  return qT || (qT = 1, function(e) {
    var n = ti && ti.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = ti && ti.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Wx(), e);
  }(ti)), ti;
}
var si = {}, Qu = {}, KT;
function kx() {
  if (KT) return Qu;
  KT = 1, Object.defineProperty(Qu, "__esModule", { value: !0 }), Qu.ConstructorParameters = n;
  const e = /* @__PURE__ */ Lt();
  function n(r, o) {
    return (0, e.Tuple)(r.parameters, o);
  }
  return Qu;
}
var GT;
function dl() {
  return GT || (GT = 1, function(e) {
    var n = si && si.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = si && si.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ kx(), e);
  }(si)), si;
}
var ci = {}, Zu = {}, HT;
function Xx() {
  if (HT) return Zu;
  HT = 1, Object.defineProperty(Zu, "__esModule", { value: !0 }), Zu.Enum = i;
  const e = /* @__PURE__ */ In(), n = /* @__PURE__ */ me(), r = /* @__PURE__ */ Qe(), o = /* @__PURE__ */ Nn();
  function i(t, a) {
    if ((0, o.IsUndefined)(t))
      throw new Error("Enum undefined or empty");
    const u = globalThis.Object.getOwnPropertyNames(t).filter((p) => isNaN(p)).map((p) => t[p]), s = [...new Set(u)].map((p) => (0, e.Literal)(p));
    return (0, r.Union)(s, { ...a, [n.Hint]: "Enum" });
  }
  return Zu;
}
var VT;
function pl() {
  return VT || (VT = 1, function(e) {
    var n = ci && ci.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = ci && ci.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Xx(), e);
  }(ci)), ci;
}
var di = {}, es = {}, ns = {}, ts = {}, WT;
function FP() {
  if (WT) return ts;
  WT = 1, Object.defineProperty(ts, "__esModule", { value: !0 }), ts.ExcludeFromTemplateLiteral = r;
  const e = /* @__PURE__ */ fl(), n = /* @__PURE__ */ ot();
  function r(o, i) {
    return (0, e.Exclude)((0, n.TemplateLiteralToUnion)(o), i);
  }
  return ts;
}
var kT;
function fl() {
  if (kT) return ns;
  kT = 1, Object.defineProperty(ns, "__esModule", { value: !0 }), ns.Exclude = c;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ Qe(), r = /* @__PURE__ */ _n(), o = /* @__PURE__ */ Mo(), i = /* @__PURE__ */ UP(), t = /* @__PURE__ */ FP(), a = /* @__PURE__ */ qe();
  function u(s, p) {
    const d = s.filter((f) => (0, o.ExtendsCheck)(f, p) === o.ExtendsResult.False);
    return d.length === 1 ? d[0] : (0, n.Union)(d);
  }
  function c(s, p, d = {}) {
    return (0, a.IsTemplateLiteral)(s) ? (0, e.CreateType)((0, t.ExcludeFromTemplateLiteral)(s, p), d) : (0, a.IsMappedResult)(s) ? (0, e.CreateType)((0, i.ExcludeFromMappedResult)(s, p), d) : (0, e.CreateType)((0, a.IsUnion)(s) ? u(s.anyOf, p) : (0, o.ExtendsCheck)(s, p) !== o.ExtendsResult.False ? (0, r.Never)() : s, d);
  }
  return ns;
}
var XT;
function UP() {
  if (XT) return es;
  XT = 1, Object.defineProperty(es, "__esModule", { value: !0 }), es.ExcludeFromMappedResult = i;
  const e = /* @__PURE__ */ un(), n = /* @__PURE__ */ fl();
  function r(t, a) {
    const u = {};
    for (const c of globalThis.Object.getOwnPropertyNames(t))
      u[c] = (0, n.Exclude)(t[c], a);
    return u;
  }
  function o(t, a) {
    return r(t.properties, a);
  }
  function i(t, a) {
    const u = o(t, a);
    return (0, e.MappedResult)(u);
  }
  return es;
}
var zT;
function ll() {
  return zT || (zT = 1, function(e) {
    var n = di && di.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = di && di.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ UP(), e), r(/* @__PURE__ */ FP(), e), r(/* @__PURE__ */ fl(), e);
  }(di)), di;
}
var pi = {}, rs = {}, is = {}, os = {}, YT;
function LP() {
  if (YT) return os;
  YT = 1, Object.defineProperty(os, "__esModule", { value: !0 }), os.ExtractFromTemplateLiteral = r;
  const e = /* @__PURE__ */ yl(), n = /* @__PURE__ */ ot();
  function r(o, i) {
    return (0, e.Extract)((0, n.TemplateLiteralToUnion)(o), i);
  }
  return os;
}
var JT;
function yl() {
  if (JT) return is;
  JT = 1, Object.defineProperty(is, "__esModule", { value: !0 }), is.Extract = c;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ Qe(), r = /* @__PURE__ */ _n(), o = /* @__PURE__ */ Mo(), i = /* @__PURE__ */ qP(), t = /* @__PURE__ */ LP(), a = /* @__PURE__ */ qe();
  function u(s, p) {
    const d = s.filter((f) => (0, o.ExtendsCheck)(f, p) !== o.ExtendsResult.False);
    return d.length === 1 ? d[0] : (0, n.Union)(d);
  }
  function c(s, p, d) {
    return (0, a.IsTemplateLiteral)(s) ? (0, e.CreateType)((0, t.ExtractFromTemplateLiteral)(s, p), d) : (0, a.IsMappedResult)(s) ? (0, e.CreateType)((0, i.ExtractFromMappedResult)(s, p), d) : (0, e.CreateType)((0, a.IsUnion)(s) ? u(s.anyOf, p) : (0, o.ExtendsCheck)(s, p) !== o.ExtendsResult.False ? s : (0, r.Never)(), d);
  }
  return is;
}
var QT;
function qP() {
  if (QT) return rs;
  QT = 1, Object.defineProperty(rs, "__esModule", { value: !0 }), rs.ExtractFromMappedResult = i;
  const e = /* @__PURE__ */ un(), n = /* @__PURE__ */ yl();
  function r(t, a) {
    const u = {};
    for (const c of globalThis.Object.getOwnPropertyNames(t))
      u[c] = (0, n.Extract)(t[c], a);
    return u;
  }
  function o(t, a) {
    return r(t.properties, a);
  }
  function i(t, a) {
    const u = o(t, a);
    return (0, e.MappedResult)(u);
  }
  return rs;
}
var ZT;
function ml() {
  return ZT || (ZT = 1, function(e) {
    var n = pi && pi.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = pi && pi.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ qP(), e), r(/* @__PURE__ */ LP(), e), r(/* @__PURE__ */ yl(), e);
  }(pi)), pi;
}
var fi = {}, as = {}, e_;
function zx() {
  if (e_) return as;
  e_ = 1, Object.defineProperty(as, "__esModule", { value: !0 }), as.InstanceType = n;
  const e = /* @__PURE__ */ Pe();
  function n(r, o) {
    return (0, e.CreateType)(r.returns, o);
  }
  return as;
}
var n_;
function gl() {
  return n_ || (n_ = 1, function(e) {
    var n = fi && fi.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = fi && fi.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ zx(), e);
  }(fi)), fi;
}
var li = {}, us = {}, t_;
function Yx() {
  if (t_) return us;
  t_ = 1, Object.defineProperty(us, "__esModule", { value: !0 }), us.Integer = r;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ me();
  function r(o) {
    return (0, e.CreateType)({ [n.Kind]: "Integer", type: "integer" }, o);
  }
  return us;
}
var r_;
function Tl() {
  return r_ || (r_ = 1, function(e) {
    var n = li && li.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = li && li.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Yx(), e);
  }(li)), li;
}
var yi = {}, ss = {}, cs = {}, ds = {}, i_;
function KP() {
  if (i_) return ds;
  i_ = 1, Object.defineProperty(ds, "__esModule", { value: !0 }), ds.IntrinsicFromMappedKey = u;
  const e = /* @__PURE__ */ un(), n = /* @__PURE__ */ xo(), r = /* @__PURE__ */ In(), o = /* @__PURE__ */ Bn();
  function i(c, s, p) {
    return {
      [c]: (0, n.Intrinsic)((0, r.Literal)(c), s, (0, o.Clone)(p))
    };
  }
  function t(c, s, p) {
    return c.reduce((f, T) => ({ ...f, ...i(T, s, p) }), {});
  }
  function a(c, s, p) {
    return t(c.keys, s, p);
  }
  function u(c, s, p) {
    const d = a(c, s, p);
    return (0, e.MappedResult)(d);
  }
  return ds;
}
var o_;
function xo() {
  if (o_) return cs;
  o_ = 1, Object.defineProperty(cs, "__esModule", { value: !0 }), cs.Intrinsic = T;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ ot(), r = /* @__PURE__ */ KP(), o = /* @__PURE__ */ In(), i = /* @__PURE__ */ Qe(), t = /* @__PURE__ */ qe();
  function a(h) {
    const [I, _] = [h.slice(0, 1), h.slice(1)];
    return [I.toLowerCase(), _].join("");
  }
  function u(h) {
    const [I, _] = [h.slice(0, 1), h.slice(1)];
    return [I.toUpperCase(), _].join("");
  }
  function c(h) {
    return h.toUpperCase();
  }
  function s(h) {
    return h.toLowerCase();
  }
  function p(h, I, _) {
    const A = (0, n.TemplateLiteralParseExact)(h.pattern);
    if (!(0, n.IsTemplateLiteralExpressionFinite)(A))
      return { ...h, pattern: d(h.pattern, I) };
    const w = [...(0, n.TemplateLiteralExpressionGenerate)(A)].map((y) => (0, o.Literal)(y)), l = f(w, I), R = (0, i.Union)(l);
    return (0, n.TemplateLiteral)([R], _);
  }
  function d(h, I) {
    return typeof h == "string" ? I === "Uncapitalize" ? a(h) : I === "Capitalize" ? u(h) : I === "Uppercase" ? c(h) : I === "Lowercase" ? s(h) : h : h.toString();
  }
  function f(h, I) {
    return h.map((_) => T(_, I));
  }
  function T(h, I, _ = {}) {
    return (
      // Intrinsic-Mapped-Inference
      (0, t.IsMappedKey)(h) ? (0, r.IntrinsicFromMappedKey)(h, I, _) : (
        // Standard-Inference
        (0, t.IsTemplateLiteral)(h) ? p(h, I, _) : (0, t.IsUnion)(h) ? (0, i.Union)(f(h.anyOf, I), _) : (0, t.IsLiteral)(h) ? (0, o.Literal)(d(h.const, I), _) : (
          // Default Type
          (0, e.CreateType)(h, _)
        )
      )
    );
  }
  return cs;
}
var a_;
function Jx() {
  if (a_) return ss;
  a_ = 1, Object.defineProperty(ss, "__esModule", { value: !0 }), ss.Capitalize = n;
  const e = /* @__PURE__ */ xo();
  function n(r, o = {}) {
    return (0, e.Intrinsic)(r, "Capitalize", o);
  }
  return ss;
}
var ps = {}, u_;
function Qx() {
  if (u_) return ps;
  u_ = 1, Object.defineProperty(ps, "__esModule", { value: !0 }), ps.Lowercase = n;
  const e = /* @__PURE__ */ xo();
  function n(r, o = {}) {
    return (0, e.Intrinsic)(r, "Lowercase", o);
  }
  return ps;
}
var fs = {}, s_;
function Zx() {
  if (s_) return fs;
  s_ = 1, Object.defineProperty(fs, "__esModule", { value: !0 }), fs.Uncapitalize = n;
  const e = /* @__PURE__ */ xo();
  function n(r, o = {}) {
    return (0, e.Intrinsic)(r, "Uncapitalize", o);
  }
  return fs;
}
var ls = {}, c_;
function e$() {
  if (c_) return ls;
  c_ = 1, Object.defineProperty(ls, "__esModule", { value: !0 }), ls.Uppercase = n;
  const e = /* @__PURE__ */ xo();
  function n(r, o = {}) {
    return (0, e.Intrinsic)(r, "Uppercase", o);
  }
  return ls;
}
var d_;
function _l() {
  return d_ || (d_ = 1, function(e) {
    var n = yi && yi.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = yi && yi.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ Jx(), e), r(/* @__PURE__ */ KP(), e), r(/* @__PURE__ */ xo(), e), r(/* @__PURE__ */ Qx(), e), r(/* @__PURE__ */ Zx(), e), r(/* @__PURE__ */ e$(), e);
  }(yi)), yi;
}
var mi = {}, so = {}, co = {}, gi = {}, ys = {}, ms = {}, gs = {}, p_;
function GP() {
  if (p_) return gs;
  p_ = 1, Object.defineProperty(gs, "__esModule", { value: !0 }), gs.OmitFromMappedResult = t;
  const e = /* @__PURE__ */ un(), n = /* @__PURE__ */ bl(), r = /* @__PURE__ */ Bn();
  function o(a, u, c) {
    const s = {};
    for (const p of globalThis.Object.getOwnPropertyNames(a))
      s[p] = (0, n.Omit)(a[p], u, (0, r.Clone)(c));
    return s;
  }
  function i(a, u, c) {
    return o(a.properties, u, c);
  }
  function t(a, u, c) {
    const s = i(a, u, c);
    return (0, e.MappedResult)(s);
  }
  return gs;
}
var f_;
function bl() {
  if (f_) return ms;
  f_ = 1, Object.defineProperty(ms, "__esModule", { value: !0 }), ms.Omit = w;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ zf(), r = /* @__PURE__ */ lc(), o = /* @__PURE__ */ Ft(), i = /* @__PURE__ */ In(), t = /* @__PURE__ */ at(), a = /* @__PURE__ */ Gn(), u = /* @__PURE__ */ Qe(), c = /* @__PURE__ */ jn(), s = /* @__PURE__ */ HP(), p = /* @__PURE__ */ GP(), d = /* @__PURE__ */ qe(), f = /* @__PURE__ */ Nn();
  function T(l, R) {
    return l.map((y) => j(y, R));
  }
  function h(l, R) {
    return l.map((y) => j(y, R));
  }
  function I(l, R) {
    const { [R]: y, ...P } = l;
    return P;
  }
  function _(l, R) {
    return R.reduce((y, P) => I(y, P), l);
  }
  function A(l, R) {
    const y = (0, n.Discard)(l, [r.TransformKind, "$id", "required", "properties"]), P = _(l.properties, R);
    return (0, c.Object)(P, y);
  }
  function v(l) {
    const R = l.reduce((y, P) => (0, d.IsLiteralValue)(P) ? [...y, (0, i.Literal)(P)] : y, []);
    return (0, u.Union)(R);
  }
  function j(l, R) {
    return (0, d.IsIntersect)(l) ? (0, a.Intersect)(T(l.allOf, R)) : (0, d.IsUnion)(l) ? (0, u.Union)(h(l.anyOf, R)) : (0, d.IsObject)(l) ? A(l, R) : (0, c.Object)({});
  }
  function w(l, R, y) {
    const P = (0, f.IsArray)(R) ? v(R) : R, E = (0, d.IsSchema)(R) ? (0, t.IndexPropertyKeys)(R) : R, b = (0, d.IsRef)(l), x = (0, d.IsRef)(R);
    return (0, d.IsMappedResult)(l) ? (0, p.OmitFromMappedResult)(l, E, y) : (0, d.IsMappedKey)(R) ? (0, s.OmitFromMappedKey)(l, R, y) : b && x ? (0, o.Computed)("Omit", [l, P], y) : !b && x ? (0, o.Computed)("Omit", [l, P], y) : b && !x ? (0, o.Computed)("Omit", [l, P], y) : (0, e.CreateType)({ ...j(l, E), ...y });
  }
  return ms;
}
var l_;
function HP() {
  if (l_) return ys;
  l_ = 1, Object.defineProperty(ys, "__esModule", { value: !0 }), ys.OmitFromMappedKey = a;
  const e = /* @__PURE__ */ un(), n = /* @__PURE__ */ bl(), r = /* @__PURE__ */ Bn();
  function o(u, c, s) {
    return { [c]: (0, n.Omit)(u, [c], (0, r.Clone)(s)) };
  }
  function i(u, c, s) {
    return c.reduce((p, d) => ({ ...p, ...o(u, d, s) }), {});
  }
  function t(u, c, s) {
    return i(u, c.keys, s);
  }
  function a(u, c, s) {
    const p = t(u, c, s);
    return (0, e.MappedResult)(p);
  }
  return ys;
}
var y_;
function Ac() {
  return y_ || (y_ = 1, function(e) {
    var n = gi && gi.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = gi && gi.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ HP(), e), r(/* @__PURE__ */ GP(), e), r(/* @__PURE__ */ bl(), e);
  }(gi)), gi;
}
var Ti = {}, Ts = {}, _s = {}, bs = {}, m_;
function VP() {
  if (m_) return bs;
  m_ = 1, Object.defineProperty(bs, "__esModule", { value: !0 }), bs.PickFromMappedResult = t;
  const e = /* @__PURE__ */ un(), n = /* @__PURE__ */ hl(), r = /* @__PURE__ */ Bn();
  function o(a, u, c) {
    const s = {};
    for (const p of globalThis.Object.getOwnPropertyNames(a))
      s[p] = (0, n.Pick)(a[p], u, (0, r.Clone)(c));
    return s;
  }
  function i(a, u, c) {
    return o(a.properties, u, c);
  }
  function t(a, u, c) {
    const s = i(a, u, c);
    return (0, e.MappedResult)(s);
  }
  return bs;
}
var g_;
function hl() {
  if (g_) return _s;
  g_ = 1, Object.defineProperty(_s, "__esModule", { value: !0 }), _s.Pick = j;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ zf(), r = /* @__PURE__ */ Ft(), o = /* @__PURE__ */ Gn(), i = /* @__PURE__ */ In(), t = /* @__PURE__ */ jn(), a = /* @__PURE__ */ Qe(), u = /* @__PURE__ */ at(), c = /* @__PURE__ */ lc(), s = /* @__PURE__ */ qe(), p = /* @__PURE__ */ Nn(), d = /* @__PURE__ */ WP(), f = /* @__PURE__ */ VP();
  function T(w, l) {
    return w.map((R) => v(R, l));
  }
  function h(w, l) {
    return w.map((R) => v(R, l));
  }
  function I(w, l) {
    const R = {};
    for (const y of l)
      y in w && (R[y] = w[y]);
    return R;
  }
  function _(w, l) {
    const R = (0, n.Discard)(w, [c.TransformKind, "$id", "required", "properties"]), y = I(w.properties, l);
    return (0, t.Object)(y, R);
  }
  function A(w) {
    const l = w.reduce((R, y) => (0, s.IsLiteralValue)(y) ? [...R, (0, i.Literal)(y)] : R, []);
    return (0, a.Union)(l);
  }
  function v(w, l) {
    return (0, s.IsIntersect)(w) ? (0, o.Intersect)(T(w.allOf, l)) : (0, s.IsUnion)(w) ? (0, a.Union)(h(w.anyOf, l)) : (0, s.IsObject)(w) ? _(w, l) : (0, t.Object)({});
  }
  function j(w, l, R) {
    const y = (0, p.IsArray)(l) ? A(l) : l, P = (0, s.IsSchema)(l) ? (0, u.IndexPropertyKeys)(l) : l, E = (0, s.IsRef)(w), b = (0, s.IsRef)(l);
    return (0, s.IsMappedResult)(w) ? (0, f.PickFromMappedResult)(w, P, R) : (0, s.IsMappedKey)(l) ? (0, d.PickFromMappedKey)(w, l, R) : E && b ? (0, r.Computed)("Pick", [w, y], R) : !E && b ? (0, r.Computed)("Pick", [w, y], R) : E && !b ? (0, r.Computed)("Pick", [w, y], R) : (0, e.CreateType)({ ...v(w, P), ...R });
  }
  return _s;
}
var T_;
function WP() {
  if (T_) return Ts;
  T_ = 1, Object.defineProperty(Ts, "__esModule", { value: !0 }), Ts.PickFromMappedKey = a;
  const e = /* @__PURE__ */ un(), n = /* @__PURE__ */ hl(), r = /* @__PURE__ */ Bn();
  function o(u, c, s) {
    return {
      [c]: (0, n.Pick)(u, [c], (0, r.Clone)(s))
    };
  }
  function i(u, c, s) {
    return c.reduce((p, d) => ({ ...p, ...o(u, d, s) }), {});
  }
  function t(u, c, s) {
    return i(u, c.keys, s);
  }
  function a(u, c, s) {
    const p = t(u, c, s);
    return (0, e.MappedResult)(p);
  }
  return Ts;
}
var __;
function Rc() {
  return __ || (__ = 1, function(e) {
    var n = Ti && Ti.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Ti && Ti.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ WP(), e), r(/* @__PURE__ */ VP(), e), r(/* @__PURE__ */ hl(), e);
  }(Ti)), Ti;
}
var _i = {}, hs = {}, Is = {}, b_;
function kP() {
  if (b_) return Is;
  b_ = 1, Object.defineProperty(Is, "__esModule", { value: !0 }), Is.Partial = A;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ Ft(), r = /* @__PURE__ */ Ut(), o = /* @__PURE__ */ jn(), i = /* @__PURE__ */ Gn(), t = /* @__PURE__ */ Qe(), a = /* @__PURE__ */ Rt(), u = /* @__PURE__ */ jt(), c = /* @__PURE__ */ me(), s = /* @__PURE__ */ XP(), p = /* @__PURE__ */ qe();
  function d(v, j) {
    return (0, n.Computed)("Partial", [(0, n.Computed)(v, j)]);
  }
  function f(v) {
    return (0, n.Computed)("Partial", [(0, a.Ref)(v)]);
  }
  function T(v) {
    const j = {};
    for (const w of globalThis.Object.getOwnPropertyNames(v))
      j[w] = (0, r.Optional)(v[w]);
    return j;
  }
  function h(v) {
    const j = (0, u.Discard)(v, [c.TransformKind, "$id", "required", "properties"]), w = T(v.properties);
    return (0, o.Object)(w, j);
  }
  function I(v) {
    return v.map((j) => _(j));
  }
  function _(v) {
    return (0, p.IsComputed)(v) ? d(v.target, v.parameters) : (0, p.IsRef)(v) ? f(v.$ref) : (0, p.IsIntersect)(v) ? (0, i.Intersect)(I(v.allOf)) : (0, p.IsUnion)(v) ? (0, t.Union)(I(v.anyOf)) : (0, p.IsObject)(v) ? h(v) : (0, o.Object)({});
  }
  function A(v, j) {
    return (0, p.IsMappedResult)(v) ? (0, s.PartialFromMappedResult)(v, j) : (0, e.CreateType)({ ..._(v), ...j });
  }
  return Is;
}
var h_;
function XP() {
  if (h_) return hs;
  h_ = 1, Object.defineProperty(hs, "__esModule", { value: !0 }), hs.PartialFromMappedResult = t;
  const e = /* @__PURE__ */ un(), n = /* @__PURE__ */ kP(), r = /* @__PURE__ */ Bn();
  function o(a, u) {
    const c = {};
    for (const s of globalThis.Object.getOwnPropertyNames(a))
      c[s] = (0, n.Partial)(a[s], (0, r.Clone)(u));
    return c;
  }
  function i(a, u) {
    return o(a.properties, u);
  }
  function t(a, u) {
    const c = i(a, u);
    return (0, e.MappedResult)(c);
  }
  return hs;
}
var I_;
function Ec() {
  return I_ || (I_ = 1, function(e) {
    var n = _i && _i.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = _i && _i.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ XP(), e), r(/* @__PURE__ */ kP(), e);
  }(_i)), _i;
}
var bi = {}, Ps = {}, P_;
function n$() {
  if (P_) return Ps;
  P_ = 1, Object.defineProperty(Ps, "__esModule", { value: !0 }), Ps.Record = y;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ me(), r = /* @__PURE__ */ Ft(), o = /* @__PURE__ */ _n(), i = /* @__PURE__ */ jn(), t = /* @__PURE__ */ Rt(), a = /* @__PURE__ */ Qe(), u = /* @__PURE__ */ ot(), c = /* @__PURE__ */ Ma(), s = /* @__PURE__ */ at(), p = /* @__PURE__ */ Nn(), d = /* @__PURE__ */ qe();
  function f(P, E, b) {
    return (0, e.CreateType)({ [n.Kind]: "Record", type: "object", patternProperties: { [P]: E } }, b);
  }
  function T(P, E, b) {
    const x = {};
    for (const N of P)
      x[N] = E;
    return (0, i.Object)(x, { ...b, [n.Hint]: "Record" });
  }
  function h(P, E, b) {
    return (0, u.IsTemplateLiteralFinite)(P) ? T((0, s.IndexPropertyKeys)(P), E, b) : f(P.pattern, E, b);
  }
  function I(P, E, b) {
    return T((0, s.IndexPropertyKeys)((0, a.Union)(P)), E, b);
  }
  function _(P, E, b) {
    return T([P.toString()], E, b);
  }
  function A(P, E, b) {
    return f(P.source, E, b);
  }
  function v(P, E, b) {
    const x = (0, p.IsUndefined)(P.pattern) ? c.PatternStringExact : P.pattern;
    return f(x, E, b);
  }
  function j(P, E, b) {
    return f(c.PatternStringExact, E, b);
  }
  function w(P, E, b) {
    return f(c.PatternNeverExact, E, b);
  }
  function l(P, E, b) {
    return f(c.PatternNumberExact, E, b);
  }
  function R(P, E, b) {
    return f(c.PatternNumberExact, E, b);
  }
  function y(P, E, b = {}) {
    return (0, d.IsComputed)(E) ? (0, r.Computed)("Record", [P, (0, r.Computed)(E.target, E.parameters)], b) : (0, d.IsComputed)(P) ? (0, r.Computed)("Record", [(0, r.Computed)(E.target, E.parameters), E], b) : (0, d.IsRef)(P) ? (0, r.Computed)("Record", [(0, t.Ref)(P.$ref), E]) : (0, d.IsUnion)(P) ? I(P.anyOf, E, b) : (0, d.IsTemplateLiteral)(P) ? h(P, E, b) : (0, d.IsLiteral)(P) ? _(P.const, E, b) : (0, d.IsInteger)(P) ? l(P, E, b) : (0, d.IsNumber)(P) ? R(P, E, b) : (0, d.IsRegExp)(P) ? A(P, E, b) : (0, d.IsString)(P) ? v(P, E, b) : (0, d.IsAny)(P) ? j(P, E, b) : (0, d.IsNever)(P) ? w(P, E, b) : (0, o.Never)(b);
  }
  return Ps;
}
var O_;
function wc() {
  return O_ || (O_ = 1, function(e) {
    var n = bi && bi.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = bi && bi.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ n$(), e);
  }(bi)), bi;
}
var hi = {}, Os = {}, As = {}, A_;
function zP() {
  if (A_) return As;
  A_ = 1, Object.defineProperty(As, "__esModule", { value: !0 }), As.Required = _;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ Ft(), r = /* @__PURE__ */ jn(), o = /* @__PURE__ */ Gn(), i = /* @__PURE__ */ Qe(), t = /* @__PURE__ */ Rt(), a = /* @__PURE__ */ me(), u = /* @__PURE__ */ jt(), c = /* @__PURE__ */ YP(), s = /* @__PURE__ */ qe();
  function p(A, v) {
    return (0, n.Computed)("Required", [(0, n.Computed)(A, v)]);
  }
  function d(A) {
    return (0, n.Computed)("Required", [(0, t.Ref)(A)]);
  }
  function f(A) {
    const v = {};
    for (const j of globalThis.Object.getOwnPropertyNames(A))
      v[j] = (0, u.Discard)(A[j], [a.OptionalKind]);
    return v;
  }
  function T(A) {
    const v = (0, u.Discard)(A, [a.TransformKind, "$id", "required", "properties"]), j = f(A.properties);
    return (0, r.Object)(j, v);
  }
  function h(A) {
    return A.map((v) => I(v));
  }
  function I(A) {
    return (0, s.IsComputed)(A) ? p(A.target, A.parameters) : (0, s.IsRef)(A) ? d(A.$ref) : (0, s.IsIntersect)(A) ? (0, o.Intersect)(h(A.allOf)) : (0, s.IsUnion)(A) ? (0, i.Union)(h(A.anyOf)) : (0, s.IsObject)(A) ? T(A) : (0, r.Object)({});
  }
  function _(A, v) {
    return (0, s.IsMappedResult)(A) ? (0, c.RequiredFromMappedResult)(A, v) : (0, e.CreateType)({ ...I(A), ...v });
  }
  return As;
}
var R_;
function YP() {
  if (R_) return Os;
  R_ = 1, Object.defineProperty(Os, "__esModule", { value: !0 }), Os.RequiredFromMappedResult = i;
  const e = /* @__PURE__ */ un(), n = /* @__PURE__ */ zP();
  function r(t, a) {
    const u = {};
    for (const c of globalThis.Object.getOwnPropertyNames(t))
      u[c] = (0, n.Required)(t[c], a);
    return u;
  }
  function o(t, a) {
    return r(t.properties, a);
  }
  function i(t, a) {
    const u = o(t, a);
    return (0, e.MappedResult)(u);
  }
  return Os;
}
var E_;
function Sc() {
  return E_ || (E_ = 1, function(e) {
    var n = hi && hi.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = hi && hi.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ YP(), e), r(/* @__PURE__ */ zP(), e);
  }(hi)), hi;
}
var w_;
function t$() {
  if (w_) return co;
  w_ = 1, Object.defineProperty(co, "__esModule", { value: !0 }), co.FromType = re, co.ComputeType = _e, co.ComputeModuleProperties = Ee;
  const e = /* @__PURE__ */ Dt(), n = /* @__PURE__ */ jt(), r = /* @__PURE__ */ wa(), o = /* @__PURE__ */ _c(), i = /* @__PURE__ */ Sa(), t = /* @__PURE__ */ va(), a = /* @__PURE__ */ at(), u = /* @__PURE__ */ Qi(), c = /* @__PURE__ */ Gn(), s = /* @__PURE__ */ xa(), p = /* @__PURE__ */ Qn(), d = /* @__PURE__ */ jn(), f = /* @__PURE__ */ Ac(), T = /* @__PURE__ */ Rc(), h = /* @__PURE__ */ _n(), I = /* @__PURE__ */ Ec(), _ = /* @__PURE__ */ wc(), A = /* @__PURE__ */ Sc(), v = /* @__PURE__ */ Lt(), j = /* @__PURE__ */ Qe(), w = /* @__PURE__ */ me(), l = /* @__PURE__ */ qe();
  function R(ne, K) {
    return K.map(($) => l.IsRef($) ? y(ne, $.$ref) : re(ne, $));
  }
  function y(ne, K) {
    return K in ne ? l.IsRef(ne[K]) ? y(ne, ne[K].$ref) : re(ne, ne[K]) : (0, h.Never)();
  }
  function P(ne) {
    return (0, o.Awaited)(ne[0]);
  }
  function E(ne) {
    return (0, a.Index)(ne[0], ne[1]);
  }
  function b(ne) {
    return (0, p.KeyOf)(ne[0]);
  }
  function x(ne) {
    return (0, I.Partial)(ne[0]);
  }
  function N(ne) {
    return (0, f.Omit)(ne[0], ne[1]);
  }
  function q(ne) {
    return (0, T.Pick)(ne[0], ne[1]);
  }
  function k(ne) {
    return (0, _.Record)(ne[0], ne[1]);
  }
  function G(ne) {
    return (0, A.Required)(ne[0]);
  }
  function Y(ne, K, $) {
    const g = R(ne, $);
    return K === "Awaited" ? P(g) : K === "Index" ? E(g) : K === "KeyOf" ? b(g) : K === "Partial" ? x(g) : K === "Omit" ? N(g) : K === "Pick" ? q(g) : K === "Record" ? k(g) : K === "Required" ? G(g) : (0, h.Never)();
  }
  function H(ne, K) {
    return (0, d.Object)(globalThis.Object.keys(K).reduce(($, g) => ({ ...$, [g]: re(ne, K[g]) }), {}));
  }
  function F(ne, K, $) {
    return (0, t.Constructor)(J(ne, K), re(ne, $));
  }
  function te(ne, K, $) {
    return (0, u.Function)(J(ne, K), re(ne, $));
  }
  function ce(ne, K) {
    return (0, v.Tuple)(J(ne, K));
  }
  function Te(ne, K) {
    return (0, c.Intersect)(J(ne, K));
  }
  function Oe(ne, K) {
    return (0, j.Union)(J(ne, K));
  }
  function we(ne, K) {
    return (0, r.Array)(re(ne, K));
  }
  function ye(ne, K) {
    return (0, i.AsyncIterator)(re(ne, K));
  }
  function Ke(ne, K) {
    return (0, s.Iterator)(re(ne, K));
  }
  function J(ne, K) {
    return K.map(($) => re(ne, $));
  }
  function re(ne, K) {
    return (
      // Modifier Unwrap - Reapplied via CreateType Options
      l.IsOptional(K) ? (0, e.CreateType)(re(ne, (0, n.Discard)(K, [w.OptionalKind])), K) : l.IsReadonly(K) ? (0, e.CreateType)(re(ne, (0, n.Discard)(K, [w.ReadonlyKind])), K) : (
        // Traveral
        l.IsArray(K) ? (0, e.CreateType)(we(ne, K.items), K) : l.IsAsyncIterator(K) ? (0, e.CreateType)(ye(ne, K.items), K) : l.IsComputed(K) ? (0, e.CreateType)(Y(ne, K.target, K.parameters)) : l.IsConstructor(K) ? (0, e.CreateType)(F(ne, K.parameters, K.returns), K) : l.IsFunction(K) ? (0, e.CreateType)(te(ne, K.parameters, K.returns), K) : l.IsIntersect(K) ? (0, e.CreateType)(Te(ne, K.allOf), K) : l.IsIterator(K) ? (0, e.CreateType)(Ke(ne, K.items), K) : l.IsObject(K) ? (0, e.CreateType)(H(ne, K.properties), K) : l.IsTuple(K) ? (0, e.CreateType)(ce(ne, K.items || []), K) : l.IsUnion(K) ? (0, e.CreateType)(Oe(ne, K.anyOf), K) : K
      )
    );
  }
  function _e(ne, K) {
    return K in ne ? re(ne, ne[K]) : (0, h.Never)();
  }
  function Ee(ne) {
    return globalThis.Object.getOwnPropertyNames(ne).reduce((K, $) => ({ ...K, [$]: _e(ne, $) }), {});
  }
  return co;
}
var S_;
function r$() {
  if (S_) return so;
  S_ = 1, Object.defineProperty(so, "__esModule", { value: !0 }), so.TModule = void 0, so.Module = i;
  const e = /* @__PURE__ */ Dt(), n = /* @__PURE__ */ me(), r = /* @__PURE__ */ t$();
  class o {
    constructor(a) {
      const u = (0, r.ComputeModuleProperties)(a), c = this.WithIdentifiers(u);
      this.$defs = c;
    }
    /** `[Json]` Imports a Type by Key. */
    Import(a, u) {
      const c = { ...this.$defs, [a]: (0, e.CreateType)(this.$defs[a], u) };
      return (0, e.CreateType)({ [n.Kind]: "Import", $defs: c, $ref: a });
    }
    // prettier-ignore
    WithIdentifiers(a) {
      return globalThis.Object.getOwnPropertyNames(a).reduce((u, c) => ({ ...u, [c]: { ...a[c], $id: c } }), {});
    }
  }
  so.TModule = o;
  function i(t) {
    return new o(t);
  }
  return so;
}
var v_;
function Il() {
  return v_ || (v_ = 1, function(e) {
    var n = mi && mi.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = mi && mi.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ r$(), e);
  }(mi)), mi;
}
var Ii = {}, Rs = {}, C_;
function i$() {
  if (C_) return Rs;
  C_ = 1, Object.defineProperty(Rs, "__esModule", { value: !0 }), Rs.Not = r;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ me();
  function r(o, i) {
    return (0, e.CreateType)({ [n.Kind]: "Not", not: o }, i);
  }
  return Rs;
}
var M_;
function Pl() {
  return M_ || (M_ = 1, function(e) {
    var n = Ii && Ii.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Ii && Ii.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ i$(), e);
  }(Ii)), Ii;
}
var Pi = {}, Es = {}, x_;
function o$() {
  if (x_) return Es;
  x_ = 1, Object.defineProperty(Es, "__esModule", { value: !0 }), Es.Parameters = n;
  const e = /* @__PURE__ */ Lt();
  function n(r, o) {
    return (0, e.Tuple)(r.parameters, o);
  }
  return Es;
}
var $_;
function Ol() {
  return $_ || ($_ = 1, function(e) {
    var n = Pi && Pi.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Pi && Pi.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ o$(), e);
  }(Pi)), Pi;
}
var Oi = {}, ws = {}, N_;
function a$() {
  if (N_) return ws;
  N_ = 1, Object.defineProperty(ws, "__esModule", { value: !0 }), ws.ReadonlyOptional = r;
  const e = /* @__PURE__ */ vo(), n = /* @__PURE__ */ Ut();
  function r(o) {
    return (0, e.Readonly)((0, n.Optional)(o));
  }
  return ws;
}
var B_;
function Al() {
  return B_ || (B_ = 1, function(e) {
    var n = Oi && Oi.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Oi && Oi.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ a$(), e);
  }(Oi)), Oi;
}
var Ai = {}, Ss = {}, j_;
function u$() {
  if (j_) return Ss;
  j_ = 1, Object.defineProperty(Ss, "__esModule", { value: !0 }), Ss.Recursive = t;
  const e = /* @__PURE__ */ DP(), n = /* @__PURE__ */ Pe(), r = /* @__PURE__ */ Nn(), o = /* @__PURE__ */ me();
  let i = 0;
  function t(a, u = {}) {
    (0, r.IsUndefined)(u.$id) && (u.$id = `T${i++}`);
    const c = (0, e.CloneType)(a({ [o.Kind]: "This", $ref: `${u.$id}` }));
    return c.$id = u.$id, (0, n.CreateType)({ [o.Hint]: "Recursive", ...c }, u);
  }
  return Ss;
}
var D_;
function Rl() {
  return D_ || (D_ = 1, function(e) {
    var n = Ai && Ai.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Ai && Ai.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ u$(), e);
  }(Ai)), Ai;
}
var Ri = {}, vs = {}, F_;
function s$() {
  if (F_) return vs;
  F_ = 1, Object.defineProperty(vs, "__esModule", { value: !0 }), vs.RegExp = o;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ Nn(), r = /* @__PURE__ */ me();
  function o(i, t) {
    const a = (0, n.IsString)(i) ? new globalThis.RegExp(i) : i;
    return (0, e.CreateType)({ [r.Kind]: "RegExp", type: "RegExp", source: a.source, flags: a.flags }, t);
  }
  return vs;
}
var U_;
function El() {
  return U_ || (U_ = 1, function(e) {
    var n = Ri && Ri.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Ri && Ri.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ s$(), e);
  }(Ri)), Ri;
}
var Ei = {}, Cs = {}, L_;
function c$() {
  if (L_) return Cs;
  L_ = 1, Object.defineProperty(Cs, "__esModule", { value: !0 }), Cs.Rest = r;
  const e = /* @__PURE__ */ qe();
  function n(o) {
    return (0, e.IsIntersect)(o) ? o.allOf : (0, e.IsUnion)(o) ? o.anyOf : (0, e.IsTuple)(o) ? o.items ?? [] : [];
  }
  function r(o) {
    return n(o);
  }
  return Cs;
}
var q_;
function wl() {
  return q_ || (q_ = 1, function(e) {
    var n = Ei && Ei.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Ei && Ei.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ c$(), e);
  }(Ei)), Ei;
}
var wi = {}, Ms = {}, K_;
function d$() {
  if (K_) return Ms;
  K_ = 1, Object.defineProperty(Ms, "__esModule", { value: !0 }), Ms.ReturnType = n;
  const e = /* @__PURE__ */ Pe();
  function n(r, o) {
    return (0, e.CreateType)(r.returns, o);
  }
  return Ms;
}
var G_;
function Sl() {
  return G_ || (G_ = 1, function(e) {
    var n = wi && wi.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = wi && wi.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ d$(), e);
  }(wi)), wi;
}
var Si = {}, md = {}, H_;
function p$() {
  return H_ || (H_ = 1, Object.defineProperty(md, "__esModule", { value: !0 })), md;
}
var gd = {}, V_;
function f$() {
  return V_ || (V_ = 1, Object.defineProperty(gd, "__esModule", { value: !0 })), gd;
}
var W_;
function l$() {
  return W_ || (W_ = 1, function(e) {
    var n = Si && Si.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Si && Si.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ p$(), e), r(/* @__PURE__ */ f$(), e);
  }(Si)), Si;
}
var vi = {}, Td = {}, k_;
function y$() {
  return k_ || (k_ = 1, Object.defineProperty(Td, "__esModule", { value: !0 })), Td;
}
var X_;
function m$() {
  return X_ || (X_ = 1, function(e) {
    var n = vi && vi.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = vi && vi.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ y$(), e);
  }(vi)), vi;
}
var Ci = {}, vt = {}, z_;
function g$() {
  if (z_) return vt;
  z_ = 1, Object.defineProperty(vt, "__esModule", { value: !0 }), vt.TransformEncodeBuilder = vt.TransformDecodeBuilder = void 0, vt.Transform = i;
  const e = /* @__PURE__ */ me(), n = /* @__PURE__ */ qe();
  class r {
    constructor(a) {
      this.schema = a;
    }
    Decode(a) {
      return new o(this.schema, a);
    }
  }
  vt.TransformDecodeBuilder = r;
  class o {
    constructor(a, u) {
      this.schema = a, this.decode = u;
    }
    EncodeTransform(a, u) {
      const p = { Encode: (d) => u[e.TransformKind].Encode(a(d)), Decode: (d) => this.decode(u[e.TransformKind].Decode(d)) };
      return { ...u, [e.TransformKind]: p };
    }
    EncodeSchema(a, u) {
      const c = { Decode: this.decode, Encode: a };
      return { ...u, [e.TransformKind]: c };
    }
    Encode(a) {
      return (0, n.IsTransform)(this.schema) ? this.EncodeTransform(a, this.schema) : this.EncodeSchema(a, this.schema);
    }
  }
  vt.TransformEncodeBuilder = o;
  function i(t) {
    return new r(t);
  }
  return vt;
}
var Y_;
function vl() {
  return Y_ || (Y_ = 1, function(e) {
    var n = Ci && Ci.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Ci && Ci.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ g$(), e);
  }(Ci)), Ci;
}
var Mi = {}, xs = {}, J_;
function T$() {
  if (J_) return xs;
  J_ = 1, Object.defineProperty(xs, "__esModule", { value: !0 }), xs.Void = r;
  const e = /* @__PURE__ */ Pe(), n = /* @__PURE__ */ me();
  function r(o) {
    return (0, e.CreateType)({ [n.Kind]: "Void", type: "void" }, o);
  }
  return xs;
}
var Q_;
function Cl() {
  return Q_ || (Q_ = 1, function(e) {
    var n = Mi && Mi.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Mi && Mi.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ T$(), e);
  }(Mi)), Mi;
}
var _d = {}, zo = {}, Z_;
function JP() {
  if (Z_) return zo;
  Z_ = 1, Object.defineProperty(zo, "__esModule", { value: !0 }), zo.JsonTypeBuilder = void 0;
  const e = /* @__PURE__ */ Na(), n = /* @__PURE__ */ wa(), r = /* @__PURE__ */ mc(), o = /* @__PURE__ */ sl(), i = /* @__PURE__ */ cl(), t = /* @__PURE__ */ pl(), a = /* @__PURE__ */ ll(), u = /* @__PURE__ */ Mo(), c = /* @__PURE__ */ ml(), s = /* @__PURE__ */ at(), p = /* @__PURE__ */ Tl(), d = /* @__PURE__ */ Gn(), f = /* @__PURE__ */ _l(), T = /* @__PURE__ */ Qn(), h = /* @__PURE__ */ In(), I = /* @__PURE__ */ un(), _ = /* @__PURE__ */ _n(), A = /* @__PURE__ */ Pl(), v = /* @__PURE__ */ hc(), j = /* @__PURE__ */ Il(), w = /* @__PURE__ */ wo(), l = /* @__PURE__ */ jn(), R = /* @__PURE__ */ Ac(), y = /* @__PURE__ */ Ut(), P = /* @__PURE__ */ Ec(), E = /* @__PURE__ */ Rc(), b = /* @__PURE__ */ vo(), x = /* @__PURE__ */ Al(), N = /* @__PURE__ */ wc(), q = /* @__PURE__ */ Rl(), k = /* @__PURE__ */ Rt(), G = /* @__PURE__ */ Sc(), Y = /* @__PURE__ */ wl(), H = /* @__PURE__ */ So(), F = /* @__PURE__ */ ot(), te = /* @__PURE__ */ vl(), ce = /* @__PURE__ */ Lt(), Te = /* @__PURE__ */ Qe(), Oe = /* @__PURE__ */ Co(), we = /* @__PURE__ */ yc();
  class ye {
    // ------------------------------------------------------------------------
    // Modifiers
    // ------------------------------------------------------------------------
    /** `[Json]` Creates a Readonly and Optional property */
    ReadonlyOptional(J) {
      return (0, x.ReadonlyOptional)(J);
    }
    /** `[Json]` Creates a Readonly property */
    Readonly(J, re) {
      return (0, b.Readonly)(J, re ?? !0);
    }
    /** `[Json]` Creates a Optional property */
    Optional(J, re) {
      return (0, y.Optional)(J, re ?? !0);
    }
    // ------------------------------------------------------------------------
    // Types
    // ------------------------------------------------------------------------
    /** `[Json]` Creates an Any type */
    Any(J) {
      return (0, e.Any)(J);
    }
    /** `[Json]` Creates an Array type */
    Array(J, re) {
      return (0, n.Array)(J, re);
    }
    /** `[Json]` Creates a Boolean type */
    Boolean(J) {
      return (0, r.Boolean)(J);
    }
    /** `[Json]` Intrinsic function to Capitalize LiteralString types */
    Capitalize(J, re) {
      return (0, f.Capitalize)(J, re);
    }
    /** `[Json]` Creates a Composite object type */
    Composite(J, re) {
      return (0, o.Composite)(J, re);
    }
    /** `[JavaScript]` Creates a readonly const type from the given value. */
    Const(J, re) {
      return (0, i.Const)(J, re);
    }
    /** `[Json]` Creates a Enum type */
    Enum(J, re) {
      return (0, t.Enum)(J, re);
    }
    /** `[Json]` Constructs a type by excluding from unionType all union members that are assignable to excludedMembers */
    Exclude(J, re, _e) {
      return (0, a.Exclude)(J, re, _e);
    }
    /** `[Json]` Creates a Conditional type */
    Extends(J, re, _e, Ee, ne) {
      return (0, u.Extends)(J, re, _e, Ee, ne);
    }
    /** `[Json]` Constructs a type by extracting from type all union members that are assignable to union */
    Extract(J, re, _e) {
      return (0, c.Extract)(J, re, _e);
    }
    /** `[Json]` Returns an Indexed property type for the given keys */
    Index(J, re, _e) {
      return (0, s.Index)(J, re, _e);
    }
    /** `[Json]` Creates an Integer type */
    Integer(J) {
      return (0, p.Integer)(J);
    }
    /** `[Json]` Creates an Intersect type */
    Intersect(J, re) {
      return (0, d.Intersect)(J, re);
    }
    /** `[Json]` Creates a KeyOf type */
    KeyOf(J, re) {
      return (0, T.KeyOf)(J, re);
    }
    /** `[Json]` Creates a Literal type */
    Literal(J, re) {
      return (0, h.Literal)(J, re);
    }
    /** `[Json]` Intrinsic function to Lowercase LiteralString types */
    Lowercase(J, re) {
      return (0, f.Lowercase)(J, re);
    }
    /** `[Json]` Creates a Mapped object type */
    Mapped(J, re, _e) {
      return (0, I.Mapped)(J, re, _e);
    }
    /** `[Json]` Creates a Type Definition Module. */
    Module(J) {
      return (0, j.Module)(J);
    }
    /** `[Json]` Creates a Never type */
    Never(J) {
      return (0, _.Never)(J);
    }
    /** `[Json]` Creates a Not type */
    Not(J, re) {
      return (0, A.Not)(J, re);
    }
    /** `[Json]` Creates a Null type */
    Null(J) {
      return (0, v.Null)(J);
    }
    /** `[Json]` Creates a Number type */
    Number(J) {
      return (0, w.Number)(J);
    }
    /** `[Json]` Creates an Object type */
    Object(J, re) {
      return (0, l.Object)(J, re);
    }
    /** `[Json]` Constructs a type whose keys are omitted from the given type */
    Omit(J, re, _e) {
      return (0, R.Omit)(J, re, _e);
    }
    /** `[Json]` Constructs a type where all properties are optional */
    Partial(J, re) {
      return (0, P.Partial)(J, re);
    }
    /** `[Json]` Constructs a type whose keys are picked from the given type */
    Pick(J, re, _e) {
      return (0, E.Pick)(J, re, _e);
    }
    /** `[Json]` Creates a Record type */
    Record(J, re, _e) {
      return (0, N.Record)(J, re, _e);
    }
    /** `[Json]` Creates a Recursive type */
    Recursive(J, re) {
      return (0, q.Recursive)(J, re);
    }
    /** `[Json]` Creates a Ref type. The referenced type must contain a $id */
    Ref(...J) {
      return (0, k.Ref)(J[0], J[1]);
    }
    /** `[Json]` Constructs a type where all properties are required */
    Required(J, re) {
      return (0, G.Required)(J, re);
    }
    /** `[Json]` Extracts interior Rest elements from Tuple, Intersect and Union types */
    Rest(J) {
      return (0, Y.Rest)(J);
    }
    /** `[Json]` Creates a String type */
    String(J) {
      return (0, H.String)(J);
    }
    /** `[Json]` Creates a TemplateLiteral type */
    TemplateLiteral(J, re) {
      return (0, F.TemplateLiteral)(J, re);
    }
    /** `[Json]` Creates a Transform type */
    Transform(J) {
      return (0, te.Transform)(J);
    }
    /** `[Json]` Creates a Tuple type */
    Tuple(J, re) {
      return (0, ce.Tuple)(J, re);
    }
    /** `[Json]` Intrinsic function to Uncapitalize LiteralString types */
    Uncapitalize(J, re) {
      return (0, f.Uncapitalize)(J, re);
    }
    /** `[Json]` Creates a Union type */
    Union(J, re) {
      return (0, Te.Union)(J, re);
    }
    /** `[Json]` Creates an Unknown type */
    Unknown(J) {
      return (0, Oe.Unknown)(J);
    }
    /** `[Json]` Creates a Unsafe type that will infers as the generic argument T */
    Unsafe(J) {
      return (0, we.Unsafe)(J);
    }
    /** `[Json]` Intrinsic function to Uppercase LiteralString types */
    Uppercase(J, re) {
      return (0, f.Uppercase)(J, re);
    }
  }
  return zo.JsonTypeBuilder = ye, zo;
}
var bd = {}, eb;
function _$() {
  return eb || (eb = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.String = e.ReturnType = e.Rest = e.Required = e.RegExp = e.Ref = e.Recursive = e.Record = e.ReadonlyOptional = e.Readonly = e.Promise = e.Pick = e.Partial = e.Parameters = e.Optional = e.Omit = e.Object = e.Number = e.Null = e.Not = e.Never = e.Module = e.Mapped = e.Literal = e.KeyOf = e.Iterator = e.Uppercase = e.Lowercase = e.Uncapitalize = e.Capitalize = e.Intersect = e.Integer = e.InstanceType = e.Index = e.Function = e.Extract = e.Extends = e.Exclude = e.Enum = e.Date = e.ConstructorParameters = e.Constructor = e.Const = e.Composite = e.Boolean = e.BigInt = e.Awaited = e.AsyncIterator = e.Array = e.Any = void 0, e.Void = e.Unsafe = e.Unknown = e.Union = e.Undefined = e.Uint8Array = e.Tuple = e.Transform = e.TemplateLiteral = e.Symbol = void 0;
    var n = /* @__PURE__ */ Na();
    Object.defineProperty(e, "Any", { enumerable: !0, get: function() {
      return n.Any;
    } });
    var r = /* @__PURE__ */ wa();
    Object.defineProperty(e, "Array", { enumerable: !0, get: function() {
      return r.Array;
    } });
    var o = /* @__PURE__ */ Sa();
    Object.defineProperty(e, "AsyncIterator", { enumerable: !0, get: function() {
      return o.AsyncIterator;
    } });
    var i = /* @__PURE__ */ _c();
    Object.defineProperty(e, "Awaited", { enumerable: !0, get: function() {
      return i.Awaited;
    } });
    var t = /* @__PURE__ */ Ca();
    Object.defineProperty(e, "BigInt", { enumerable: !0, get: function() {
      return t.BigInt;
    } });
    var a = /* @__PURE__ */ mc();
    Object.defineProperty(e, "Boolean", { enumerable: !0, get: function() {
      return a.Boolean;
    } });
    var u = /* @__PURE__ */ sl();
    Object.defineProperty(e, "Composite", { enumerable: !0, get: function() {
      return u.Composite;
    } });
    var c = /* @__PURE__ */ cl();
    Object.defineProperty(e, "Const", { enumerable: !0, get: function() {
      return c.Const;
    } });
    var s = /* @__PURE__ */ va();
    Object.defineProperty(e, "Constructor", { enumerable: !0, get: function() {
      return s.Constructor;
    } });
    var p = /* @__PURE__ */ dl();
    Object.defineProperty(e, "ConstructorParameters", { enumerable: !0, get: function() {
      return p.ConstructorParameters;
    } });
    var d = /* @__PURE__ */ bc();
    Object.defineProperty(e, "Date", { enumerable: !0, get: function() {
      return d.Date;
    } });
    var f = /* @__PURE__ */ pl();
    Object.defineProperty(e, "Enum", { enumerable: !0, get: function() {
      return f.Enum;
    } });
    var T = /* @__PURE__ */ ll();
    Object.defineProperty(e, "Exclude", { enumerable: !0, get: function() {
      return T.Exclude;
    } });
    var h = /* @__PURE__ */ Mo();
    Object.defineProperty(e, "Extends", { enumerable: !0, get: function() {
      return h.Extends;
    } });
    var I = /* @__PURE__ */ ml();
    Object.defineProperty(e, "Extract", { enumerable: !0, get: function() {
      return I.Extract;
    } });
    var _ = /* @__PURE__ */ Qi();
    Object.defineProperty(e, "Function", { enumerable: !0, get: function() {
      return _.Function;
    } });
    var A = /* @__PURE__ */ at();
    Object.defineProperty(e, "Index", { enumerable: !0, get: function() {
      return A.Index;
    } });
    var v = /* @__PURE__ */ gl();
    Object.defineProperty(e, "InstanceType", { enumerable: !0, get: function() {
      return v.InstanceType;
    } });
    var j = /* @__PURE__ */ Tl();
    Object.defineProperty(e, "Integer", { enumerable: !0, get: function() {
      return j.Integer;
    } });
    var w = /* @__PURE__ */ Gn();
    Object.defineProperty(e, "Intersect", { enumerable: !0, get: function() {
      return w.Intersect;
    } });
    var l = /* @__PURE__ */ _l();
    Object.defineProperty(e, "Capitalize", { enumerable: !0, get: function() {
      return l.Capitalize;
    } }), Object.defineProperty(e, "Uncapitalize", { enumerable: !0, get: function() {
      return l.Uncapitalize;
    } }), Object.defineProperty(e, "Lowercase", { enumerable: !0, get: function() {
      return l.Lowercase;
    } }), Object.defineProperty(e, "Uppercase", { enumerable: !0, get: function() {
      return l.Uppercase;
    } });
    var R = /* @__PURE__ */ xa();
    Object.defineProperty(e, "Iterator", { enumerable: !0, get: function() {
      return R.Iterator;
    } });
    var y = /* @__PURE__ */ Qn();
    Object.defineProperty(e, "KeyOf", { enumerable: !0, get: function() {
      return y.KeyOf;
    } });
    var P = /* @__PURE__ */ In();
    Object.defineProperty(e, "Literal", { enumerable: !0, get: function() {
      return P.Literal;
    } });
    var E = /* @__PURE__ */ un();
    Object.defineProperty(e, "Mapped", { enumerable: !0, get: function() {
      return E.Mapped;
    } });
    var b = /* @__PURE__ */ Il();
    Object.defineProperty(e, "Module", { enumerable: !0, get: function() {
      return b.Module;
    } });
    var x = /* @__PURE__ */ _n();
    Object.defineProperty(e, "Never", { enumerable: !0, get: function() {
      return x.Never;
    } });
    var N = /* @__PURE__ */ Pl();
    Object.defineProperty(e, "Not", { enumerable: !0, get: function() {
      return N.Not;
    } });
    var q = /* @__PURE__ */ hc();
    Object.defineProperty(e, "Null", { enumerable: !0, get: function() {
      return q.Null;
    } });
    var k = /* @__PURE__ */ wo();
    Object.defineProperty(e, "Number", { enumerable: !0, get: function() {
      return k.Number;
    } });
    var G = /* @__PURE__ */ jn();
    Object.defineProperty(e, "Object", { enumerable: !0, get: function() {
      return G.Object;
    } });
    var Y = /* @__PURE__ */ Ac();
    Object.defineProperty(e, "Omit", { enumerable: !0, get: function() {
      return Y.Omit;
    } });
    var H = /* @__PURE__ */ Ut();
    Object.defineProperty(e, "Optional", { enumerable: !0, get: function() {
      return H.Optional;
    } });
    var F = /* @__PURE__ */ Ol();
    Object.defineProperty(e, "Parameters", { enumerable: !0, get: function() {
      return F.Parameters;
    } });
    var te = /* @__PURE__ */ Ec();
    Object.defineProperty(e, "Partial", { enumerable: !0, get: function() {
      return te.Partial;
    } });
    var ce = /* @__PURE__ */ Rc();
    Object.defineProperty(e, "Pick", { enumerable: !0, get: function() {
      return ce.Pick;
    } });
    var Te = /* @__PURE__ */ gc();
    Object.defineProperty(e, "Promise", { enumerable: !0, get: function() {
      return Te.Promise;
    } });
    var Oe = /* @__PURE__ */ vo();
    Object.defineProperty(e, "Readonly", { enumerable: !0, get: function() {
      return Oe.Readonly;
    } });
    var we = /* @__PURE__ */ Al();
    Object.defineProperty(e, "ReadonlyOptional", { enumerable: !0, get: function() {
      return we.ReadonlyOptional;
    } });
    var ye = /* @__PURE__ */ wc();
    Object.defineProperty(e, "Record", { enumerable: !0, get: function() {
      return ye.Record;
    } });
    var Ke = /* @__PURE__ */ Rl();
    Object.defineProperty(e, "Recursive", { enumerable: !0, get: function() {
      return Ke.Recursive;
    } });
    var J = /* @__PURE__ */ Rt();
    Object.defineProperty(e, "Ref", { enumerable: !0, get: function() {
      return J.Ref;
    } });
    var re = /* @__PURE__ */ El();
    Object.defineProperty(e, "RegExp", { enumerable: !0, get: function() {
      return re.RegExp;
    } });
    var _e = /* @__PURE__ */ Sc();
    Object.defineProperty(e, "Required", { enumerable: !0, get: function() {
      return _e.Required;
    } });
    var Ee = /* @__PURE__ */ wl();
    Object.defineProperty(e, "Rest", { enumerable: !0, get: function() {
      return Ee.Rest;
    } });
    var ne = /* @__PURE__ */ Sl();
    Object.defineProperty(e, "ReturnType", { enumerable: !0, get: function() {
      return ne.ReturnType;
    } });
    var K = /* @__PURE__ */ So();
    Object.defineProperty(e, "String", { enumerable: !0, get: function() {
      return K.String;
    } });
    var $ = /* @__PURE__ */ Ic();
    Object.defineProperty(e, "Symbol", { enumerable: !0, get: function() {
      return $.Symbol;
    } });
    var g = /* @__PURE__ */ ot();
    Object.defineProperty(e, "TemplateLiteral", { enumerable: !0, get: function() {
      return g.TemplateLiteral;
    } });
    var O = /* @__PURE__ */ vl();
    Object.defineProperty(e, "Transform", { enumerable: !0, get: function() {
      return O.Transform;
    } });
    var D = /* @__PURE__ */ Lt();
    Object.defineProperty(e, "Tuple", { enumerable: !0, get: function() {
      return D.Tuple;
    } });
    var V = /* @__PURE__ */ Oc();
    Object.defineProperty(e, "Uint8Array", { enumerable: !0, get: function() {
      return V.Uint8Array;
    } });
    var m = /* @__PURE__ */ Pc();
    Object.defineProperty(e, "Undefined", { enumerable: !0, get: function() {
      return m.Undefined;
    } });
    var Z = /* @__PURE__ */ Qe();
    Object.defineProperty(e, "Union", { enumerable: !0, get: function() {
      return Z.Union;
    } });
    var X = /* @__PURE__ */ Co();
    Object.defineProperty(e, "Unknown", { enumerable: !0, get: function() {
      return X.Unknown;
    } });
    var U = /* @__PURE__ */ yc();
    Object.defineProperty(e, "Unsafe", { enumerable: !0, get: function() {
      return U.Unsafe;
    } });
    var se = /* @__PURE__ */ Cl();
    Object.defineProperty(e, "Void", { enumerable: !0, get: function() {
      return se.Void;
    } });
  }(bd)), bd;
}
var Yo = {}, nb;
function b$() {
  if (nb) return Yo;
  nb = 1, Object.defineProperty(Yo, "__esModule", { value: !0 }), Yo.JavaScriptTypeBuilder = void 0;
  const e = /* @__PURE__ */ JP(), n = /* @__PURE__ */ Sa(), r = /* @__PURE__ */ _c(), o = /* @__PURE__ */ Ca(), i = /* @__PURE__ */ va(), t = /* @__PURE__ */ dl(), a = /* @__PURE__ */ bc(), u = /* @__PURE__ */ Qi(), c = /* @__PURE__ */ gl(), s = /* @__PURE__ */ xa(), p = /* @__PURE__ */ Ol(), d = /* @__PURE__ */ gc(), f = /* @__PURE__ */ El(), T = /* @__PURE__ */ Sl(), h = /* @__PURE__ */ Ic(), I = /* @__PURE__ */ Oc(), _ = /* @__PURE__ */ Pc(), A = /* @__PURE__ */ Cl();
  class v extends e.JsonTypeBuilder {
    /** `[JavaScript]` Creates a AsyncIterator type */
    AsyncIterator(w, l) {
      return (0, n.AsyncIterator)(w, l);
    }
    /** `[JavaScript]` Constructs a type by recursively unwrapping Promise types */
    Awaited(w, l) {
      return (0, r.Awaited)(w, l);
    }
    /** `[JavaScript]` Creates a BigInt type */
    BigInt(w) {
      return (0, o.BigInt)(w);
    }
    /** `[JavaScript]` Extracts the ConstructorParameters from the given Constructor type */
    ConstructorParameters(w, l) {
      return (0, t.ConstructorParameters)(w, l);
    }
    /** `[JavaScript]` Creates a Constructor type */
    Constructor(w, l, R) {
      return (0, i.Constructor)(w, l, R);
    }
    /** `[JavaScript]` Creates a Date type */
    Date(w = {}) {
      return (0, a.Date)(w);
    }
    /** `[JavaScript]` Creates a Function type */
    Function(w, l, R) {
      return (0, u.Function)(w, l, R);
    }
    /** `[JavaScript]` Extracts the InstanceType from the given Constructor type */
    InstanceType(w, l) {
      return (0, c.InstanceType)(w, l);
    }
    /** `[JavaScript]` Creates an Iterator type */
    Iterator(w, l) {
      return (0, s.Iterator)(w, l);
    }
    /** `[JavaScript]` Extracts the Parameters from the given Function type */
    Parameters(w, l) {
      return (0, p.Parameters)(w, l);
    }
    /** `[JavaScript]` Creates a Promise type */
    Promise(w, l) {
      return (0, d.Promise)(w, l);
    }
    /** `[JavaScript]` Creates a RegExp type */
    RegExp(w, l) {
      return (0, f.RegExp)(w, l);
    }
    /** `[JavaScript]` Extracts the ReturnType from the given Function type */
    ReturnType(w, l) {
      return (0, T.ReturnType)(w, l);
    }
    /** `[JavaScript]` Creates a Symbol type */
    Symbol(w) {
      return (0, h.Symbol)(w);
    }
    /** `[JavaScript]` Creates a Undefined type */
    Undefined(w) {
      return (0, _.Undefined)(w);
    }
    /** `[JavaScript]` Creates a Uint8Array type */
    Uint8Array(w) {
      return (0, I.Uint8Array)(w);
    }
    /** `[JavaScript]` Creates a Void type */
    Void(w) {
      return (0, A.Void)(w);
    }
  }
  return Yo.JavaScriptTypeBuilder = v, Yo;
}
var tb;
function h$() {
  return tb || (tb = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.Type = e.JavaScriptTypeBuilder = e.JsonTypeBuilder = void 0;
    var n = /* @__PURE__ */ JP();
    Object.defineProperty(e, "JsonTypeBuilder", { enumerable: !0, get: function() {
      return n.JsonTypeBuilder;
    } });
    const r = /* @__PURE__ */ _$(), o = /* @__PURE__ */ b$();
    Object.defineProperty(e, "JavaScriptTypeBuilder", { enumerable: !0, get: function() {
      return o.JavaScriptTypeBuilder;
    } });
    const i = r;
    e.Type = i;
  }(_d)), _d;
}
var rb;
function QP() {
  return rb || (rb = 1, function(e) {
    var n = Jr && Jr.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Jr && Jr.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(/* @__PURE__ */ jx(), e), r(/* @__PURE__ */ Dt(), e), r(/* @__PURE__ */ ze(), e), r(/* @__PURE__ */ OP(), e), r(/* @__PURE__ */ Fx(), e), r(/* @__PURE__ */ Ma(), e), r(/* @__PURE__ */ Eo(), e), r(/* @__PURE__ */ Tc(), e), r(/* @__PURE__ */ me(), e), r(/* @__PURE__ */ Na(), e), r(/* @__PURE__ */ wa(), e), r(/* @__PURE__ */ Sa(), e), r(/* @__PURE__ */ _c(), e), r(/* @__PURE__ */ Ca(), e), r(/* @__PURE__ */ mc(), e), r(/* @__PURE__ */ sl(), e), r(/* @__PURE__ */ cl(), e), r(/* @__PURE__ */ va(), e), r(/* @__PURE__ */ dl(), e), r(/* @__PURE__ */ bc(), e), r(/* @__PURE__ */ pl(), e), r(/* @__PURE__ */ ll(), e), r(/* @__PURE__ */ Mo(), e), r(/* @__PURE__ */ ml(), e), r(/* @__PURE__ */ Qi(), e), r(/* @__PURE__ */ at(), e), r(/* @__PURE__ */ gl(), e), r(/* @__PURE__ */ Tl(), e), r(/* @__PURE__ */ Gn(), e), r(/* @__PURE__ */ xa(), e), r(/* @__PURE__ */ _l(), e), r(/* @__PURE__ */ Qn(), e), r(/* @__PURE__ */ In(), e), r(/* @__PURE__ */ Il(), e), r(/* @__PURE__ */ un(), e), r(/* @__PURE__ */ _n(), e), r(/* @__PURE__ */ Pl(), e), r(/* @__PURE__ */ hc(), e), r(/* @__PURE__ */ wo(), e), r(/* @__PURE__ */ jn(), e), r(/* @__PURE__ */ Ac(), e), r(/* @__PURE__ */ Ut(), e), r(/* @__PURE__ */ Ol(), e), r(/* @__PURE__ */ Ec(), e), r(/* @__PURE__ */ Rc(), e), r(/* @__PURE__ */ gc(), e), r(/* @__PURE__ */ vo(), e), r(/* @__PURE__ */ Al(), e), r(/* @__PURE__ */ wc(), e), r(/* @__PURE__ */ Rl(), e), r(/* @__PURE__ */ Rt(), e), r(/* @__PURE__ */ El(), e), r(/* @__PURE__ */ Sc(), e), r(/* @__PURE__ */ wl(), e), r(/* @__PURE__ */ Sl(), e), r(/* @__PURE__ */ l$(), e), r(/* @__PURE__ */ m$(), e), r(/* @__PURE__ */ So(), e), r(/* @__PURE__ */ Ic(), e), r(/* @__PURE__ */ ot(), e), r(/* @__PURE__ */ vl(), e), r(/* @__PURE__ */ Lt(), e), r(/* @__PURE__ */ Oc(), e), r(/* @__PURE__ */ Pc(), e), r(/* @__PURE__ */ Qe(), e), r(/* @__PURE__ */ Co(), e), r(/* @__PURE__ */ yc(), e), r(/* @__PURE__ */ Cl(), e), r(/* @__PURE__ */ h$(), e);
  }(Jr)), Jr;
}
var Jo = {}, ib;
function ZP() {
  if (ib) return Jo;
  ib = 1, Object.defineProperty(Jo, "__esModule", { value: !0 }), Jo.ValidationException = void 0;
  class e {
    /**
     * @param message Overall error message
     * @param details The individual validation errors
     */
    constructor(r, o = []) {
      this.message = r, this.details = o;
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
        for (const o of this.details)
          r += `
 * ` + e.errorToString(o);
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
  return Jo.ValidationException = e, Jo;
}
var ob;
function $o() {
  return ob || (ob = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.throwInvalidValidate = e.throwInvalidAssert = e.createUnionTypeErrorIterable = e.createUnionTypeError = e.createErrorsIterable = e.adjustErrorMessage = e.DEFAULT_UNKNOWN_TYPE_MESSAGE = e.DEFAULT_OVERALL_MESSAGE = void 0;
    const n = /* @__PURE__ */ QP(), r = /* @__PURE__ */ qt(), o = ZP();
    e.DEFAULT_OVERALL_MESSAGE = "Invalid value", e.DEFAULT_UNKNOWN_TYPE_MESSAGE = "Object type not recognized";
    const i = "Expected required property";
    function t(d) {
      return d.schema.errorMessage !== void 0 && (d.message = d.schema.errorMessage), d;
    }
    e.adjustErrorMessage = t;
    function a(d) {
      return {
        [Symbol.iterator]: function* () {
          const f = d[Symbol.iterator]();
          let T = f.next(), h = "???";
          for (; T.value !== void 0; ) {
            const I = T.value, _ = I.message;
            I.path !== h && (t(I), I.message != _ ? (h = I.path, yield I) : (
              // drop 'required' errors for values that have constraints
              (I.message != i || ["Any", "Unknown"].includes(I.schema[n.Kind])) && (yield I)
            )), T = f.next();
          }
        }
      };
    }
    e.createErrorsIterable = a;
    function u(d, f) {
      var T;
      return {
        type: r.ValueErrorType.Union,
        path: "",
        schema: d,
        value: f,
        message: (T = d.errorMessage) !== null && T !== void 0 ? T : e.DEFAULT_UNKNOWN_TYPE_MESSAGE
      };
    }
    e.createUnionTypeError = u;
    function c(d) {
      return {
        [Symbol.iterator]: function* () {
          yield d;
        }
      };
    }
    e.createUnionTypeErrorIterable = c;
    function s(d, f) {
      throw t(f), new o.ValidationException(d === void 0 ? e.DEFAULT_OVERALL_MESSAGE : d.replace("{error}", o.ValidationException.errorToString(f)), [f]);
    }
    e.throwInvalidAssert = s;
    function p(d, f) {
      throw new o.ValidationException(d ?? e.DEFAULT_OVERALL_MESSAGE, f instanceof r.ValueErrorIterator ? [...a(f)] : [f]);
    }
    e.throwInvalidValidate = p;
  }(yd)), yd;
}
var ab;
function Ml() {
  if (ab) return Uo;
  ab = 1, Object.defineProperty(Uo, "__esModule", { value: !0 }), Uo.AbstractValidator = void 0;
  const e = /* @__PURE__ */ ja(), n = $o();
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
      const t = this.testReturningErrors(i);
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
    firstError(i) {
      const a = this.errors(i)[Symbol.iterator]().next();
      return a.done ? null : a.value;
    }
    cleanCopyOfValue(i, t) {
      if (i.type === "object" && typeof t == "object") {
        const a = {};
        return Object.keys(i.properties).forEach((u) => {
          a[u] = t[u];
        }), a;
      }
      return t;
    }
    cleanValue(i, t) {
      if (i.type === "object" && typeof t == "object") {
        const a = Object.keys(i.properties);
        Object.getOwnPropertyNames(t).forEach((u) => {
          a.includes(u) || delete t[u];
        });
      }
    }
    uncompiledAssert(i, t, a) {
      e.Value.Check(i, t) || (0, n.throwInvalidAssert)(a, e.Value.Errors(i, t).First());
    }
    uncompiledValidate(i, t, a) {
      e.Value.Check(i, t) || (0, n.throwInvalidValidate)(a, e.Value.Errors(i, t));
    }
  }
  return Uo.AbstractValidator = r, Uo;
}
var Qo = {}, ub;
function xl() {
  if (ub) return Qo;
  ub = 1, Object.defineProperty(Qo, "__esModule", { value: !0 }), Qo.AbstractStandardValidator = void 0;
  const e = Ml();
  class n extends e.AbstractValidator {
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
  return Qo.AbstractStandardValidator = n, Qo;
}
var xi = {}, sb;
function Da() {
  if (sb) return xi;
  sb = 1, Object.defineProperty(xi, "__esModule", { value: !0 }), xi.AbstractTypedUnionValidator = xi.DEFAULT_DISCRIMINANT_KEY = void 0;
  const e = Ml();
  xi.DEFAULT_DISCRIMINANT_KEY = "kind";
  class n extends e.AbstractValidator {
    constructor(o) {
      super(o);
    }
    /** @inheritdoc */
    assert(o, i) {
      this.assertReturningSchema(o, i);
    }
    /** @inheritdoc */
    assertAndClean(o, i) {
      const t = this.assertReturningSchema(o, i);
      this.cleanValue(t, o);
    }
    /** @inheritdoc */
    assertAndCleanCopy(o, i) {
      const t = this.assertReturningSchema(o, i);
      return this.cleanCopyOfValue(t, o);
    }
    /** @inheritdoc */
    validate(o, i) {
      this.validateReturningSchema(o, i);
    }
    /** @inheritdoc */
    validateAndClean(o, i) {
      const t = this.validateReturningSchema(o, i);
      this.cleanValue(t, o);
    }
    /** @inheritdoc */
    validateAndCleanCopy(o, i) {
      const t = this.validateReturningSchema(o, i);
      return this.cleanCopyOfValue(t, o);
    }
    toValueKeyDereference(o) {
      return /^[a-zA-Z_$][a-zA-Z_$0-9]*$/.test(o) ? `value.${o}` : `value['${o.replace(/'/g, "\\'")}']`;
    }
  }
  return xi.AbstractTypedUnionValidator = n, xi;
}
var $i = {}, Zo = {}, cb;
function I$() {
  if (cb) return Zo;
  cb = 1, Object.defineProperty(Zo, "__esModule", { value: !0 }), Zo.StandardValidator = void 0;
  const e = xl(), n = /* @__PURE__ */ ja(), r = $o();
  class o extends e.AbstractStandardValidator {
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
  return Zo.StandardValidator = o, Zo;
}
var ft = {}, Ni = {}, Cn = {}, db;
function P$() {
  if (db) return Cn;
  db = 1, Object.defineProperty(Cn, "__esModule", { value: !0 }), Cn.TypeCompiler = Cn.Policy = Cn.TypeCompilerTypeGuardError = Cn.TypeCompilerUnknownTypeError = Cn.TypeCheck = void 0;
  const e = /* @__PURE__ */ Ba(), n = /* @__PURE__ */ qt(), r = /* @__PURE__ */ Xf(), o = /* @__PURE__ */ ze(), i = /* @__PURE__ */ Zn(), t = /* @__PURE__ */ $a(), a = /* @__PURE__ */ me(), u = /* @__PURE__ */ Eo(), c = /* @__PURE__ */ Qn(), s = /* @__PURE__ */ el(), p = /* @__PURE__ */ _n(), d = /* @__PURE__ */ Rt(), f = /* @__PURE__ */ an(), T = /* @__PURE__ */ PP();
  class h {
    constructor(P, E, b, x) {
      this.schema = P, this.references = E, this.checkFunc = b, this.code = x, this.hasTransform = (0, e.HasTransform)(P, E);
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
      const E = this.hasTransform ? (0, e.TransformEncode)(this.schema, this.references, P) : P;
      if (!this.checkFunc(E))
        throw new e.TransformEncodeCheckError(this.schema, P, this.Errors(P).First());
      return E;
    }
  }
  Cn.TypeCheck = h;
  var I;
  (function(y) {
    function P(N) {
      return N === 36;
    }
    y.DollarSign = P;
    function E(N) {
      return N === 95;
    }
    y.IsUnderscore = E;
    function b(N) {
      return N >= 65 && N <= 90 || N >= 97 && N <= 122;
    }
    y.IsAlpha = b;
    function x(N) {
      return N >= 48 && N <= 57;
    }
    y.IsNumeric = x;
  })(I || (I = {}));
  var _;
  (function(y) {
    function P(N) {
      return N.length === 0 ? !1 : I.IsNumeric(N.charCodeAt(0));
    }
    function E(N) {
      if (P(N))
        return !1;
      for (let q = 0; q < N.length; q++) {
        const k = N.charCodeAt(q);
        if (!(I.IsAlpha(k) || I.IsNumeric(k) || I.DollarSign(k) || I.IsUnderscore(k)))
          return !1;
      }
      return !0;
    }
    function b(N) {
      return N.replace(/'/g, "\\'");
    }
    function x(N, q) {
      return E(q) ? `${N}.${q}` : `${N}['${b(q)}']`;
    }
    y.Encode = x;
  })(_ || (_ = {}));
  var A;
  (function(y) {
    function P(E) {
      const b = [];
      for (let x = 0; x < E.length; x++) {
        const N = E.charCodeAt(x);
        I.IsNumeric(N) || I.IsAlpha(N) ? b.push(E.charAt(x)) : b.push(`_${N}_`);
      }
      return b.join("").replace(/__/g, "_");
    }
    y.Encode = P;
  })(A || (A = {}));
  var v;
  (function(y) {
    function P(E) {
      return E.replace(/'/g, "\\'");
    }
    y.Escape = P;
  })(v || (v = {}));
  class j extends o.TypeBoxError {
    constructor(P) {
      super("Unknown type"), this.schema = P;
    }
  }
  Cn.TypeCompilerUnknownTypeError = j;
  class w extends o.TypeBoxError {
    constructor(P) {
      super("Preflight validation check failed to guard for the given schema"), this.schema = P;
    }
  }
  Cn.TypeCompilerTypeGuardError = w;
  var l;
  (function(y) {
    function P(q, k, G) {
      return r.TypeSystemPolicy.ExactOptionalPropertyTypes ? `('${k}' in ${q} ? ${G} : true)` : `(${_.Encode(q, k)} !== undefined ? ${G} : true)`;
    }
    y.IsExactOptionalProperty = P;
    function E(q) {
      return r.TypeSystemPolicy.AllowArrayObject ? `(typeof ${q} === 'object' && ${q} !== null)` : `(typeof ${q} === 'object' && ${q} !== null && !Array.isArray(${q}))`;
    }
    y.IsObjectLike = E;
    function b(q) {
      return r.TypeSystemPolicy.AllowArrayObject ? `(typeof ${q} === 'object' && ${q} !== null && !(${q} instanceof Date) && !(${q} instanceof Uint8Array))` : `(typeof ${q} === 'object' && ${q} !== null && !Array.isArray(${q}) && !(${q} instanceof Date) && !(${q} instanceof Uint8Array))`;
    }
    y.IsRecordLike = b;
    function x(q) {
      return r.TypeSystemPolicy.AllowNaN ? `typeof ${q} === 'number'` : `Number.isFinite(${q})`;
    }
    y.IsNumberLike = x;
    function N(q) {
      return r.TypeSystemPolicy.AllowNullVoid ? `(${q} === undefined || ${q} === null)` : `${q} === undefined`;
    }
    y.IsVoidLike = N;
  })(l || (Cn.Policy = l = {}));
  var R;
  return function(y) {
    function P(L) {
      return L[a.Kind] === "Any" || L[a.Kind] === "Unknown";
    }
    function* E(L, ie, z) {
      yield "true";
    }
    function* b(L, ie, z) {
      yield `Array.isArray(${z})`;
      const [fe, ae] = [S("value", "any"), S("acc", "number")];
      (0, f.IsNumber)(L.maxItems) && (yield `${z}.length <= ${L.maxItems}`), (0, f.IsNumber)(L.minItems) && (yield `${z}.length >= ${L.minItems}`);
      const le = oe(L.items, ie, "value");
      if (yield `${z}.every((${fe}) => ${le})`, (0, T.IsSchema)(L.contains) || (0, f.IsNumber)(L.minContains) || (0, f.IsNumber)(L.maxContains)) {
        const Me = (0, T.IsSchema)(L.contains) ? L.contains : (0, p.Never)(), Ae = oe(Me, ie, "value"), bn = (0, f.IsNumber)(L.minContains) ? [`(count >= ${L.minContains})`] : [], C = (0, f.IsNumber)(L.maxContains) ? [`(count <= ${L.maxContains})`] : [], M = `const count = value.reduce((${ae}, ${fe}) => ${Ae} ? acc + 1 : acc, 0)`, ve = ["(count > 0)", ...bn, ...C].join(" && ");
        yield `((${fe}) => { ${M}; return ${ve}})(${z})`;
      }
      L.uniqueItems === !0 && (yield `((${fe}) => { const set = new Set(); for(const element of value) { const hashed = hash(element); if(set.has(hashed)) { return false } else { set.add(hashed) } } return true } )(${z})`);
    }
    function* x(L, ie, z) {
      yield `(typeof value === 'object' && Symbol.asyncIterator in ${z})`;
    }
    function* N(L, ie, z) {
      yield `(typeof ${z} === 'bigint')`, (0, f.IsBigInt)(L.exclusiveMaximum) && (yield `${z} < BigInt(${L.exclusiveMaximum})`), (0, f.IsBigInt)(L.exclusiveMinimum) && (yield `${z} > BigInt(${L.exclusiveMinimum})`), (0, f.IsBigInt)(L.maximum) && (yield `${z} <= BigInt(${L.maximum})`), (0, f.IsBigInt)(L.minimum) && (yield `${z} >= BigInt(${L.minimum})`), (0, f.IsBigInt)(L.multipleOf) && (yield `(${z} % BigInt(${L.multipleOf})) === 0`);
    }
    function* q(L, ie, z) {
      yield `(typeof ${z} === 'boolean')`;
    }
    function* k(L, ie, z) {
      yield* ue(L.returns, ie, `${z}.prototype`);
    }
    function* G(L, ie, z) {
      yield `(${z} instanceof Date) && Number.isFinite(${z}.getTime())`, (0, f.IsNumber)(L.exclusiveMaximumTimestamp) && (yield `${z}.getTime() < ${L.exclusiveMaximumTimestamp}`), (0, f.IsNumber)(L.exclusiveMinimumTimestamp) && (yield `${z}.getTime() > ${L.exclusiveMinimumTimestamp}`), (0, f.IsNumber)(L.maximumTimestamp) && (yield `${z}.getTime() <= ${L.maximumTimestamp}`), (0, f.IsNumber)(L.minimumTimestamp) && (yield `${z}.getTime() >= ${L.minimumTimestamp}`), (0, f.IsNumber)(L.multipleOfTimestamp) && (yield `(${z}.getTime() % ${L.multipleOfTimestamp}) === 0`);
    }
    function* Y(L, ie, z) {
      yield `(typeof ${z} === 'function')`;
    }
    function* H(L, ie, z) {
      const fe = globalThis.Object.getOwnPropertyNames(L.$defs).reduce((ae, le) => [...ae, L.$defs[le]], []);
      yield* ue((0, d.Ref)(L.$ref), [...ie, ...fe], z);
    }
    function* F(L, ie, z) {
      yield `Number.isInteger(${z})`, (0, f.IsNumber)(L.exclusiveMaximum) && (yield `${z} < ${L.exclusiveMaximum}`), (0, f.IsNumber)(L.exclusiveMinimum) && (yield `${z} > ${L.exclusiveMinimum}`), (0, f.IsNumber)(L.maximum) && (yield `${z} <= ${L.maximum}`), (0, f.IsNumber)(L.minimum) && (yield `${z} >= ${L.minimum}`), (0, f.IsNumber)(L.multipleOf) && (yield `(${z} % ${L.multipleOf}) === 0`);
    }
    function* te(L, ie, z) {
      const fe = L.allOf.map((ae) => oe(ae, ie, z)).join(" && ");
      if (L.unevaluatedProperties === !1) {
        const ae = xe(`${new RegExp((0, c.KeyOfPattern)(L))};`), le = `Object.getOwnPropertyNames(${z}).every(key => ${ae}.test(key))`;
        yield `(${fe} && ${le})`;
      } else if ((0, T.IsSchema)(L.unevaluatedProperties)) {
        const ae = xe(`${new RegExp((0, c.KeyOfPattern)(L))};`), le = `Object.getOwnPropertyNames(${z}).every(key => ${ae}.test(key) || ${oe(L.unevaluatedProperties, ie, `${z}[key]`)})`;
        yield `(${fe} && ${le})`;
      } else
        yield `(${fe})`;
    }
    function* ce(L, ie, z) {
      yield `(typeof value === 'object' && Symbol.iterator in ${z})`;
    }
    function* Te(L, ie, z) {
      typeof L.const == "number" || typeof L.const == "boolean" ? yield `(${z} === ${L.const})` : yield `(${z} === '${v.Escape(L.const)}')`;
    }
    function* Oe(L, ie, z) {
      yield "false";
    }
    function* we(L, ie, z) {
      yield `(!${oe(L.not, ie, z)})`;
    }
    function* ye(L, ie, z) {
      yield `(${z} === null)`;
    }
    function* Ke(L, ie, z) {
      yield l.IsNumberLike(z), (0, f.IsNumber)(L.exclusiveMaximum) && (yield `${z} < ${L.exclusiveMaximum}`), (0, f.IsNumber)(L.exclusiveMinimum) && (yield `${z} > ${L.exclusiveMinimum}`), (0, f.IsNumber)(L.maximum) && (yield `${z} <= ${L.maximum}`), (0, f.IsNumber)(L.minimum) && (yield `${z} >= ${L.minimum}`), (0, f.IsNumber)(L.multipleOf) && (yield `(${z} % ${L.multipleOf}) === 0`);
    }
    function* J(L, ie, z) {
      yield l.IsObjectLike(z), (0, f.IsNumber)(L.minProperties) && (yield `Object.getOwnPropertyNames(${z}).length >= ${L.minProperties}`), (0, f.IsNumber)(L.maxProperties) && (yield `Object.getOwnPropertyNames(${z}).length <= ${L.maxProperties}`);
      const fe = Object.getOwnPropertyNames(L.properties);
      for (const ae of fe) {
        const le = _.Encode(z, ae), Me = L.properties[ae];
        if (L.required && L.required.includes(ae))
          yield* ue(Me, ie, le), ((0, s.ExtendsUndefinedCheck)(Me) || P(Me)) && (yield `('${ae}' in ${z})`);
        else {
          const Ae = oe(Me, ie, le);
          yield l.IsExactOptionalProperty(z, ae, Ae);
        }
      }
      if (L.additionalProperties === !1)
        if (L.required && L.required.length === fe.length)
          yield `Object.getOwnPropertyNames(${z}).length === ${fe.length}`;
        else {
          const ae = `[${fe.map((le) => `'${le}'`).join(", ")}]`;
          yield `Object.getOwnPropertyNames(${z}).every(key => ${ae}.includes(key))`;
        }
      if (typeof L.additionalProperties == "object") {
        const ae = oe(L.additionalProperties, ie, `${z}[key]`), le = `[${fe.map((Me) => `'${Me}'`).join(", ")}]`;
        yield `(Object.getOwnPropertyNames(${z}).every(key => ${le}.includes(key) || ${ae}))`;
      }
    }
    function* re(L, ie, z) {
      yield `(typeof value === 'object' && typeof ${z}.then === 'function')`;
    }
    function* _e(L, ie, z) {
      yield l.IsRecordLike(z), (0, f.IsNumber)(L.minProperties) && (yield `Object.getOwnPropertyNames(${z}).length >= ${L.minProperties}`), (0, f.IsNumber)(L.maxProperties) && (yield `Object.getOwnPropertyNames(${z}).length <= ${L.maxProperties}`);
      const [fe, ae] = Object.entries(L.patternProperties)[0], le = xe(`${new RegExp(fe)}`), Me = oe(ae, ie, "value"), Ae = (0, T.IsSchema)(L.additionalProperties) ? oe(L.additionalProperties, ie, z) : L.additionalProperties === !1 ? "false" : "true", bn = `(${le}.test(key) ? ${Me} : ${Ae})`;
      yield `(Object.entries(${z}).every(([key, value]) => ${bn}))`;
    }
    function* Ee(L, ie, z) {
      const fe = (0, i.Deref)(L, ie);
      if (ge.functions.has(L.$ref))
        return yield `${he(L.$ref)}(${z})`;
      yield* ue(fe, ie, z);
    }
    function* ne(L, ie, z) {
      const fe = xe(`${new RegExp(L.source, L.flags)};`);
      yield `(typeof ${z} === 'string')`, (0, f.IsNumber)(L.maxLength) && (yield `${z}.length <= ${L.maxLength}`), (0, f.IsNumber)(L.minLength) && (yield `${z}.length >= ${L.minLength}`), yield `${fe}.test(${z})`;
    }
    function* K(L, ie, z) {
      yield `(typeof ${z} === 'string')`, (0, f.IsNumber)(L.maxLength) && (yield `${z}.length <= ${L.maxLength}`), (0, f.IsNumber)(L.minLength) && (yield `${z}.length >= ${L.minLength}`), L.pattern !== void 0 && (yield `${xe(`${new RegExp(L.pattern)};`)}.test(${z})`), L.format !== void 0 && (yield `format('${L.format}', ${z})`);
    }
    function* $(L, ie, z) {
      yield `(typeof ${z} === 'symbol')`;
    }
    function* g(L, ie, z) {
      yield `(typeof ${z} === 'string')`, yield `${xe(`${new RegExp(L.pattern)};`)}.test(${z})`;
    }
    function* O(L, ie, z) {
      yield `${he(L.$ref)}(${z})`;
    }
    function* D(L, ie, z) {
      if (yield `Array.isArray(${z})`, L.items === void 0)
        return yield `${z}.length === 0`;
      yield `(${z}.length === ${L.maxItems})`;
      for (let fe = 0; fe < L.items.length; fe++)
        yield `${oe(L.items[fe], ie, `${z}[${fe}]`)}`;
    }
    function* V(L, ie, z) {
      yield `${z} === undefined`;
    }
    function* m(L, ie, z) {
      yield `(${L.anyOf.map((ae) => oe(ae, ie, z)).join(" || ")})`;
    }
    function* Z(L, ie, z) {
      yield `${z} instanceof Uint8Array`, (0, f.IsNumber)(L.maxByteLength) && (yield `(${z}.length <= ${L.maxByteLength})`), (0, f.IsNumber)(L.minByteLength) && (yield `(${z}.length >= ${L.minByteLength})`);
    }
    function* X(L, ie, z) {
      yield "true";
    }
    function* U(L, ie, z) {
      yield l.IsVoidLike(z);
    }
    function* se(L, ie, z) {
      const fe = ge.instances.size;
      ge.instances.set(fe, L), yield `kind('${L[a.Kind]}', ${fe}, ${z})`;
    }
    function* ue(L, ie, z, fe = !0) {
      const ae = (0, f.IsString)(L.$id) ? [...ie, L] : ie, le = L;
      if (fe && (0, f.IsString)(L.$id)) {
        const Me = he(L.$id);
        if (ge.functions.has(Me))
          return yield `${Me}(${z})`;
        {
          ge.functions.set(Me, "<deferred>");
          const Ae = Ce(Me, L, ie, "value", !1);
          return ge.functions.set(Me, Ae), yield `${Me}(${z})`;
        }
      }
      switch (le[a.Kind]) {
        case "Any":
          return yield* E();
        case "Array":
          return yield* b(le, ae, z);
        case "AsyncIterator":
          return yield* x(le, ae, z);
        case "BigInt":
          return yield* N(le, ae, z);
        case "Boolean":
          return yield* q(le, ae, z);
        case "Constructor":
          return yield* k(le, ae, z);
        case "Date":
          return yield* G(le, ae, z);
        case "Function":
          return yield* Y(le, ae, z);
        case "Import":
          return yield* H(le, ae, z);
        case "Integer":
          return yield* F(le, ae, z);
        case "Intersect":
          return yield* te(le, ae, z);
        case "Iterator":
          return yield* ce(le, ae, z);
        case "Literal":
          return yield* Te(le, ae, z);
        case "Never":
          return yield* Oe();
        case "Not":
          return yield* we(le, ae, z);
        case "Null":
          return yield* ye(le, ae, z);
        case "Number":
          return yield* Ke(le, ae, z);
        case "Object":
          return yield* J(le, ae, z);
        case "Promise":
          return yield* re(le, ae, z);
        case "Record":
          return yield* _e(le, ae, z);
        case "Ref":
          return yield* Ee(le, ae, z);
        case "RegExp":
          return yield* ne(le, ae, z);
        case "String":
          return yield* K(le, ae, z);
        case "Symbol":
          return yield* $(le, ae, z);
        case "TemplateLiteral":
          return yield* g(le, ae, z);
        case "This":
          return yield* O(le, ae, z);
        case "Tuple":
          return yield* D(le, ae, z);
        case "Undefined":
          return yield* V(le, ae, z);
        case "Union":
          return yield* m(le, ae, z);
        case "Uint8Array":
          return yield* Z(le, ae, z);
        case "Unknown":
          return yield* X();
        case "Void":
          return yield* U(le, ae, z);
        default:
          if (!u.TypeRegistry.Has(le[a.Kind]))
            throw new j(L);
          return yield* se(le, ae, z);
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
    function oe(L, ie, z, fe = !0) {
      return `(${[...ue(L, ie, z, fe)].join(" && ")})`;
    }
    function he(L) {
      return `check_${A.Encode(L)}`;
    }
    function xe(L) {
      const ie = `local_${ge.variables.size}`;
      return ge.variables.set(ie, `const ${ie} = ${L}`), ie;
    }
    function Ce(L, ie, z, fe, ae = !0) {
      const [le, Me] = [`
`, (M) => "".padStart(M, " ")], Ae = S("value", "any"), bn = Se("boolean"), C = [...ue(ie, z, fe, ae)].map((M) => `${Me(4)}${M}`).join(` &&${le}`);
      return `function ${L}(${Ae})${bn} {${le}${Me(2)}return (${le}${C}${le}${Me(2)})
}`;
    }
    function S(L, ie) {
      const z = ge.language === "typescript" ? `: ${ie}` : "";
      return `${L}${z}`;
    }
    function Se(L) {
      return ge.language === "typescript" ? `: ${L}` : "";
    }
    function Ye(L, ie, z) {
      const fe = Ce("check", L, ie, "value"), ae = S("value", "any"), le = Se("boolean"), Me = [...ge.functions.values()], Ae = [...ge.variables.values()], bn = (0, f.IsString)(L.$id) ? `return function check(${ae})${le} {
  return ${he(L.$id)}(value)
}` : `return ${fe}`;
      return [...Ae, ...Me, bn].join(`
`);
    }
    function Kt(...L) {
      const ie = { language: "javascript" }, [z, fe, ae] = L.length === 2 && (0, f.IsArray)(L[1]) ? [L[0], L[1], ie] : L.length === 2 && !(0, f.IsArray)(L[1]) ? [L[0], [], L[1]] : L.length === 3 ? [L[0], L[1], L[2]] : L.length === 1 ? [L[0], [], ie] : [null, [], ie];
      if (ge.language = ae.language, ge.variables.clear(), ge.functions.clear(), ge.instances.clear(), !(0, T.IsSchema)(z))
        throw new w(z);
      for (const le of fe)
        if (!(0, T.IsSchema)(le))
          throw new w(le);
      return Ye(z, fe);
    }
    y.Code = Kt;
    function eo(L, ie = []) {
      const z = Kt(L, ie, { language: "javascript" }), fe = globalThis.Function("kind", "format", "hash", z), ae = new Map(ge.instances);
      function le(C, M, ve) {
        if (!u.TypeRegistry.Has(C) || !ae.has(M))
          return !1;
        const hn = u.TypeRegistry.Get(C), jc = ae.get(M);
        return hn(jc, ve);
      }
      function Me(C, M) {
        return u.FormatRegistry.Has(C) ? u.FormatRegistry.Get(C)(M) : !1;
      }
      function Ae(C) {
        return (0, t.Hash)(C);
      }
      const bn = fe(le, Me, Ae);
      return new h(L, ie, bn, z);
    }
    y.Compile = eo;
  }(R || (Cn.TypeCompiler = R = {})), Cn;
}
var pb;
function eO() {
  return pb || (pb = 1, function(e) {
    var n = Ni && Ni.__createBinding || (Object.create ? function(i, t, a, u) {
      u === void 0 && (u = a);
      var c = Object.getOwnPropertyDescriptor(t, a);
      (!c || ("get" in c ? !t.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return t[a];
      } }), Object.defineProperty(i, u, c);
    } : function(i, t, a, u) {
      u === void 0 && (u = a), i[u] = t[a];
    }), r = Ni && Ni.__exportStar || function(i, t) {
      for (var a in i) a !== "default" && !Object.prototype.hasOwnProperty.call(t, a) && n(t, i, a);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueErrorIterator = e.ValueErrorType = void 0;
    var o = /* @__PURE__ */ qt();
    Object.defineProperty(e, "ValueErrorType", { enumerable: !0, get: function() {
      return o.ValueErrorType;
    } }), Object.defineProperty(e, "ValueErrorIterator", { enumerable: !0, get: function() {
      return o.ValueErrorIterator;
    } }), r(/* @__PURE__ */ P$(), e);
  }(Ni)), Ni;
}
var fb;
function O$() {
  if (fb) return ft;
  fb = 1;
  var e = ft && ft.__classPrivateFieldGet || function(u, c, s, p) {
    if (s === "a" && !p) throw new TypeError("Private accessor was defined without a getter");
    if (typeof c == "function" ? u !== c || !p : !c.has(u)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return s === "m" ? p : s === "a" ? p.call(u) : p ? p.value : c.get(u);
  }, n = ft && ft.__classPrivateFieldSet || function(u, c, s, p, d) {
    if (p === "m") throw new TypeError("Private method is not writable");
    if (p === "a" && !d) throw new TypeError("Private accessor was defined without a setter");
    if (typeof c == "function" ? u !== c || !d : !c.has(u)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return p === "a" ? d.call(u, s) : d ? d.value = s : c.set(u, s), s;
  }, r;
  Object.defineProperty(ft, "__esModule", { value: !0 }), ft.CompilingStandardValidator = void 0;
  const o = /* @__PURE__ */ eO(), i = xl(), t = $o();
  class a extends i.AbstractStandardValidator {
    /** @inheritdoc */
    constructor(c) {
      super(c), r.set(this, void 0);
    }
    /** @inheritdoc */
    test(c) {
      return this.getCompiledType().Check(c);
    }
    /** @inheritdoc */
    assert(c, s) {
      const p = this.getCompiledType();
      p.Check(c) || (0, t.throwInvalidAssert)(s, p.Errors(c).First());
    }
    /** @inheritdoc */
    validate(c, s) {
      const p = this.getCompiledType();
      p.Check(c) || (0, t.throwInvalidValidate)(s, p.Errors(c));
    }
    /** @inheritdoc */
    errors(c) {
      const s = this.getCompiledType();
      return (0, t.createErrorsIterable)(s.Errors(c));
    }
    getCompiledType() {
      return e(this, r, "f") === void 0 && n(this, r, o.TypeCompiler.Compile(this.schema), "f"), e(this, r, "f");
    }
  }
  return ft.CompilingStandardValidator = a, r = /* @__PURE__ */ new WeakMap(), ft;
}
var lb;
function A$() {
  return lb || (lb = 1, function(e) {
    var n = $i && $i.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = $i && $i.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(I$(), e), r(O$(), e);
  }($i)), $i;
}
var Bi = {}, lt = {}, hd = {}, yb;
function nO() {
  return yb || (yb = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.TypeIdentifyingKeyIndex = e.MESSAGE_MEMBERS_MISSING_KEY = e.MESSAGE_MULTIPLE_MEMBERS_WITH_SAME_KEY = e.MESSAGE_MEMBER_WITH_MULTIPLE_KEYS = e.MESSAGE_OPTIONAL_TYPE_ID_KEY = void 0;
    const n = /* @__PURE__ */ QP();
    e.MESSAGE_OPTIONAL_TYPE_ID_KEY = "Type identifying key cannot be optional", e.MESSAGE_MEMBER_WITH_MULTIPLE_KEYS = "Union has member with multiple identifying keys", e.MESSAGE_MULTIPLE_MEMBERS_WITH_SAME_KEY = "Union has multiple members with same identifying key", e.MESSAGE_MEMBERS_MISSING_KEY = "Union has members missing identifying keys";
    class r {
      constructor(i) {
        this.schema = i;
      }
      cacheKeys() {
        const i = this.schema.anyOf.length, t = /* @__PURE__ */ new Set();
        this.keyByMemberIndex = new Array(i);
        for (let a = 0; a < i; ++a) {
          const u = this.schema.anyOf[a];
          for (const [c, s] of Object.entries(u.properties))
            if (s.typeIdentifyingKey) {
              if (s[n.Optional] == "Optional")
                throw Error(e.MESSAGE_OPTIONAL_TYPE_ID_KEY);
              if (this.keyByMemberIndex[a] !== void 0)
                throw Error(e.MESSAGE_MEMBER_WITH_MULTIPLE_KEYS);
              if (t.has(c))
                throw Error(e.MESSAGE_MULTIPLE_MEMBERS_WITH_SAME_KEY);
              this.keyByMemberIndex[a] = c, t.add(c);
            }
        }
        if (t.size < i)
          throw this.keyByMemberIndex = void 0, Error(e.MESSAGE_MEMBERS_MISSING_KEY);
      }
    }
    e.TypeIdentifyingKeyIndex = r;
  }(hd)), hd;
}
var mb;
function R$() {
  if (mb) return lt;
  mb = 1;
  var e = lt && lt.__classPrivateFieldSet || function(c, s, p, d, f) {
    if (d === "m") throw new TypeError("Private method is not writable");
    if (d === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof s == "function" ? c !== s || !f : !s.has(c)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return d === "a" ? f.call(c, p) : f ? f.value = p : s.set(c, p), p;
  }, n = lt && lt.__classPrivateFieldGet || function(c, s, p, d) {
    if (p === "a" && !d) throw new TypeError("Private accessor was defined without a getter");
    if (typeof s == "function" ? c !== s || !d : !s.has(c)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return p === "m" ? d : p === "a" ? d.call(c) : d ? d.value : s.get(c);
  }, r;
  Object.defineProperty(lt, "__esModule", { value: !0 }), lt.HeterogeneousUnionValidator = void 0;
  const o = /* @__PURE__ */ ja(), i = Da(), t = $o(), a = nO();
  class u extends i.AbstractTypedUnionValidator {
    /** @inheritdoc */
    constructor(s) {
      super(s), r.set(this, void 0), e(this, r, new a.TypeIdentifyingKeyIndex(s), "f");
    }
    /** @inheritdoc */
    test(s) {
      const p = this.findSchemaMemberIndex(s);
      return typeof p != "number" ? !1 : o.Value.Check(this.schema.anyOf[p], s);
    }
    /** @inheritdoc */
    errors(s) {
      const p = this.findSchemaMemberIndex(s);
      if (typeof p != "number")
        return (0, t.createUnionTypeErrorIterable)(p);
      const d = this.schema.anyOf[p];
      return (0, t.createErrorsIterable)(o.Value.Errors(d, s));
    }
    assertReturningSchema(s, p) {
      const d = this.findSchemaMemberIndex(s);
      typeof d != "number" && (0, t.throwInvalidAssert)(p, d);
      const f = this.schema.anyOf[d];
      return this.uncompiledAssert(f, s, p), f;
    }
    validateReturningSchema(s, p) {
      const d = this.findSchemaMemberIndex(s);
      typeof d != "number" && (0, t.throwInvalidValidate)(p, d);
      const f = this.schema.anyOf[d];
      return this.uncompiledValidate(f, s, p), f;
    }
    findSchemaMemberIndex(s) {
      if (n(this, r, "f").keyByMemberIndex === void 0 && n(this, r, "f").cacheKeys(), typeof s == "object" && s !== null)
        for (let p = 0; p < this.schema.anyOf.length; ++p) {
          const d = n(this, r, "f").keyByMemberIndex[p];
          if (s[d] !== void 0)
            return p;
        }
      return (0, t.createUnionTypeError)(this.schema, s);
    }
  }
  return lt.HeterogeneousUnionValidator = u, r = /* @__PURE__ */ new WeakMap(), lt;
}
var yt = {}, mt = {}, gb;
function tO() {
  if (gb) return mt;
  gb = 1;
  var e = mt && mt.__classPrivateFieldSet || function(c, s, p, d, f) {
    if (d === "m") throw new TypeError("Private method is not writable");
    if (d === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof s == "function" ? c !== s || !f : !s.has(c)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return d === "a" ? f.call(c, p) : f ? f.value = p : s.set(c, p), p;
  }, n = mt && mt.__classPrivateFieldGet || function(c, s, p, d) {
    if (p === "a" && !d) throw new TypeError("Private accessor was defined without a getter");
    if (typeof s == "function" ? c !== s || !d : !s.has(c)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return p === "m" ? d : p === "a" ? d.call(c) : d ? d.value : s.get(c);
  }, r;
  Object.defineProperty(mt, "__esModule", { value: !0 }), mt.AbstractCompilingTypedUnionValidator = void 0;
  const o = /* @__PURE__ */ ja(), i = /* @__PURE__ */ eO(), t = Da(), a = $o();
  class u extends t.AbstractTypedUnionValidator {
    /** @inheritdoc */
    constructor(s) {
      super(s), r.set(this, void 0), e(this, r, new Array(s.anyOf.length), "f");
    }
    /** @inheritdoc */
    test(s) {
      const p = this.compiledFindSchemaMemberIndex(s);
      return this.compiledSchemaMemberTest(p, s);
    }
    /** @inheritdoc */
    errors(s) {
      const p = this.compiledFindSchemaMemberIndexOrError(s);
      return typeof p != "number" ? (0, a.createUnionTypeErrorIterable)(p) : (0, a.createErrorsIterable)(o.Value.Errors(this.schema.anyOf[p], s));
    }
    assertReturningSchema(s, p) {
      const d = this.compiledFindSchemaMemberIndexOrError(s);
      typeof d != "number" && (0, a.throwInvalidAssert)(p, d);
      const f = this.schema.anyOf[d];
      return this.compiledSchemaMemberTest(d, s) || (0, a.throwInvalidAssert)(p, o.Value.Errors(f, s).First()), f;
    }
    validateReturningSchema(s, p) {
      const d = this.compiledFindSchemaMemberIndexOrError(s);
      typeof d != "number" && (0, a.throwInvalidValidate)(p, d);
      const f = this.schema.anyOf[d];
      return this.compiledSchemaMemberTest(d, s) || (0, a.throwInvalidValidate)(p, o.Value.Errors(f, s)), f;
    }
    compiledFindSchemaMemberIndexOrError(s) {
      const p = this.compiledFindSchemaMemberIndex(s);
      return p === null ? (0, a.createUnionTypeError)(this.schema, s) : p;
    }
    compiledSchemaMemberTest(s, p) {
      if (s === null)
        return !1;
      if (n(this, r, "f")[s] === void 0) {
        let d = i.TypeCompiler.Compile(this.schema.anyOf[s]).Code();
        d = d.replace("(typeof value === 'object' && value !== null && !Array.isArray(value)) &&", "");
        const f = d.indexOf("function"), T = d.indexOf("return", f);
        d = "return " + d.substring(d.indexOf("(", T), d.length - 1), n(this, r, "f")[s] = new Function("value", d);
      }
      return n(this, r, "f")[s](p);
    }
  }
  return mt.AbstractCompilingTypedUnionValidator = u, r = /* @__PURE__ */ new WeakMap(), mt;
}
var Tb;
function E$() {
  if (Tb) return yt;
  Tb = 1;
  var e = yt && yt.__classPrivateFieldSet || function(u, c, s, p, d) {
    if (p === "m") throw new TypeError("Private method is not writable");
    if (p === "a" && !d) throw new TypeError("Private accessor was defined without a setter");
    if (typeof c == "function" ? u !== c || !d : !c.has(u)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return p === "a" ? d.call(u, s) : d ? d.value = s : c.set(u, s), s;
  }, n = yt && yt.__classPrivateFieldGet || function(u, c, s, p) {
    if (s === "a" && !p) throw new TypeError("Private accessor was defined without a getter");
    if (typeof c == "function" ? u !== c || !p : !c.has(u)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return s === "m" ? p : s === "a" ? p.call(u) : p ? p.value : c.get(u);
  }, r, o;
  Object.defineProperty(yt, "__esModule", { value: !0 }), yt.CompilingHeterogeneousUnionValidator = void 0;
  const i = tO(), t = nO();
  class a extends i.AbstractCompilingTypedUnionValidator {
    /** @inheritdoc */
    constructor(c) {
      super(c), r.set(this, void 0), o.set(this, void 0), e(this, r, new t.TypeIdentifyingKeyIndex(c), "f");
    }
    compiledFindSchemaMemberIndex(c) {
      if (n(this, o, "f") === void 0) {
        n(this, r, "f").cacheKeys();
        const s = [
          "return ((typeof value !== 'object' || value === null || Array.isArray(value)) ? null : "
        ];
        for (let p = 0; p < this.schema.anyOf.length; ++p) {
          const d = n(this, r, "f").keyByMemberIndex[p];
          s.push(`${this.toValueKeyDereference(d)} !== undefined ? ${p} : `);
        }
        e(this, o, new Function("value", s.join("") + "null)"), "f");
      }
      return n(this, o, "f").call(this, c);
    }
  }
  return yt.CompilingHeterogeneousUnionValidator = a, r = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap(), yt;
}
var ea = {}, _b;
function w$() {
  if (_b) return ea;
  _b = 1, Object.defineProperty(ea, "__esModule", { value: !0 }), ea.TypeIdentifyingKey = void 0;
  function e(n) {
    return Object.assign(Object.assign({}, n), { typeIdentifyingKey: !0 });
  }
  return ea.TypeIdentifyingKey = e, ea;
}
var bb;
function S$() {
  return bb || (bb = 1, function(e) {
    var n = Bi && Bi.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Bi && Bi.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(R$(), e), r(E$(), e), r(w$(), e);
  }(Bi)), Bi;
}
var ji = {}, gt = {}, hb;
function v$() {
  if (hb) return gt;
  hb = 1;
  var e = gt && gt.__classPrivateFieldGet || function(u, c, s, p) {
    if (s === "a" && !p) throw new TypeError("Private accessor was defined without a getter");
    if (typeof c == "function" ? u !== c || !p : !c.has(u)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return s === "m" ? p : s === "a" ? p.call(u) : p ? p.value : c.get(u);
  }, n = gt && gt.__classPrivateFieldSet || function(u, c, s, p, d) {
    if (p === "m") throw new TypeError("Private method is not writable");
    if (p === "a" && !d) throw new TypeError("Private accessor was defined without a setter");
    if (typeof c == "function" ? u !== c || !d : !c.has(u)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return p === "a" ? d.call(u, s) : d ? d.value = s : c.set(u, s), s;
  }, r;
  Object.defineProperty(gt, "__esModule", { value: !0 }), gt.DiscriminatedUnionValidator = void 0;
  const o = /* @__PURE__ */ ja(), i = Da(), t = $o();
  class a extends i.AbstractTypedUnionValidator {
    /** @inheritdoc */
    constructor(c) {
      var s;
      super(c), r.set(this, !1), this.discriminantKey = (s = this.schema.discriminantKey) !== null && s !== void 0 ? s : i.DEFAULT_DISCRIMINANT_KEY;
    }
    /** @inheritdoc */
    test(c) {
      const s = this.findSchemaMemberIndex(c);
      return typeof s != "number" ? !1 : o.Value.Check(this.schema.anyOf[s], c);
    }
    /** @inheritdoc */
    errors(c) {
      const s = this.findSchemaMemberIndex(c);
      if (typeof s != "number")
        return (0, t.createUnionTypeErrorIterable)(s);
      const p = this.schema.anyOf[s];
      return (0, t.createErrorsIterable)(o.Value.Errors(p, c));
    }
    assertReturningSchema(c, s) {
      const p = this.findSchemaMemberIndex(c);
      typeof p != "number" && (0, t.throwInvalidAssert)(s, p);
      const d = this.schema.anyOf[p];
      return this.uncompiledAssert(d, c, s), d;
    }
    validateReturningSchema(c, s) {
      const p = this.findSchemaMemberIndex(c);
      typeof p != "number" && (0, t.throwInvalidValidate)(s, p);
      const d = this.schema.anyOf[p];
      return this.uncompiledValidate(d, c, s), d;
    }
    findSchemaMemberIndex(c) {
      if (!e(this, r, "f")) {
        for (const s of this.schema.anyOf)
          if (s.properties[this.discriminantKey] === void 0)
            throw Error(`Discriminant key '${this.discriminantKey}' not present in all members of discriminated union`);
        n(this, r, !0, "f");
      }
      if (typeof c == "object" && c !== null) {
        const s = c[this.discriminantKey];
        if (s !== void 0)
          for (let p = 0; p < this.schema.anyOf.length; ++p) {
            const d = this.schema.anyOf[p].properties[this.discriminantKey];
            if (d !== void 0 && d.const === s)
              return p;
          }
      }
      return (0, t.createUnionTypeError)(this.schema, c);
    }
  }
  return gt.DiscriminatedUnionValidator = a, r = /* @__PURE__ */ new WeakMap(), gt;
}
var Tt = {}, Ib;
function C$() {
  if (Ib) return Tt;
  Ib = 1;
  var e = Tt && Tt.__classPrivateFieldSet || function(u, c, s, p, d) {
    if (p === "m") throw new TypeError("Private method is not writable");
    if (p === "a" && !d) throw new TypeError("Private accessor was defined without a setter");
    if (typeof c == "function" ? u !== c || !d : !c.has(u)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return p === "a" ? d.call(u, s) : d ? d.value = s : c.set(u, s), s;
  }, n = Tt && Tt.__classPrivateFieldGet || function(u, c, s, p) {
    if (s === "a" && !p) throw new TypeError("Private accessor was defined without a getter");
    if (typeof c == "function" ? u !== c || !p : !c.has(u)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return s === "m" ? p : s === "a" ? p.call(u) : p ? p.value : c.get(u);
  }, r, o;
  Object.defineProperty(Tt, "__esModule", { value: !0 }), Tt.CompilingDiscriminatedUnionValidator = void 0;
  const i = Da(), t = tO();
  class a extends t.AbstractCompilingTypedUnionValidator {
    /** @inheritdoc */
    constructor(c) {
      var s;
      super(c), r.set(this, void 0), o.set(this, void 0), e(this, r, (s = this.schema.discriminantKey) !== null && s !== void 0 ? s : i.DEFAULT_DISCRIMINANT_KEY, "f");
    }
    compiledFindSchemaMemberIndex(c) {
      if (n(this, o, "f") === void 0) {
        const s = [
          `if (typeof value !== 'object' || value === null || Array.isArray(value)) return null;
          switch (${this.toValueKeyDereference(n(this, r, "f"))}) {
`
        ];
        for (let d = 0; d < this.schema.anyOf.length; ++d) {
          const f = this.schema.anyOf[d].properties[n(this, r, "f")];
          if (f === void 0)
            throw Error(`Discriminant key '${n(this, r, "f")}' not present in all members of discriminated union`);
          const T = f.const;
          typeof T == "string" ? s.push(`case '${T.replace(/'/g, "\\'")}': return ${d};
`) : s.push(`case ${T}: return ${d};
`);
        }
        const p = s.join("") + "default: return null; }";
        e(this, o, new Function("value", p), "f");
      }
      return n(this, o, "f").call(this, c);
    }
  }
  return Tt.CompilingDiscriminatedUnionValidator = a, r = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap(), Tt;
}
var Pb;
function rO() {
  return Pb || (Pb = 1, function(e) {
    var n = ji && ji.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = ji && ji.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(v$(), e), r(C$(), e);
  }(ji)), ji;
}
var Ob;
function M$() {
  return Ob || (Ob = 1, function(e) {
    var n = Gt && Gt.__createBinding || (Object.create ? function(o, i, t, a) {
      a === void 0 && (a = t);
      var u = Object.getOwnPropertyDescriptor(i, t);
      (!u || ("get" in u ? !i.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
        return i[t];
      } }), Object.defineProperty(o, a, u);
    } : function(o, i, t, a) {
      a === void 0 && (a = t), o[a] = i[t];
    }), r = Gt && Gt.__exportStar || function(o, i) {
      for (var t in o) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && n(i, o, t);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(Ml(), e), r(xl(), e), r(Da(), e), r(A$(), e), r(S$(), e), r(rO(), e), r(ZP(), e);
  }(Gt)), Gt;
}
M$();
rO();
const Fi = class Fi {
  constructor(n) {
    this.config = n, this.registerFormats(), this.registerTypes();
  }
  static getInstance(n) {
    return Fi.instance || (Fi.instance = new Fi(n)), Fi.instance;
  }
  assertHasRegistry(n) {
    if (!tc(n[de]))
      throw new Error(`Please register @codelab/${n} to Typebox first`);
  }
  tSchema(n) {
    const r = this.config.schemaKindMap.find(([o]) => o === n);
    if (!r)
      throw console.error("Failed to find schema for kind:", n), console.error(
        "Available schemas:",
        this.config.schemaKindMap.map(([o]) => o)
      ), new Error("Schema not found");
    return r[1];
  }
  registerFormat(n, r) {
    SR(n, r);
  }
  registerFormats() {
    for (const [n, r] of this.config.formatMap)
      this.registerFormat(n, r);
  }
  registerType(n, r) {
    CR(n[de], (o, i) => tP(r, i));
  }
  registerTypes() {
    for (const [n, r] of this.config.schemaKindMap)
      this.registerType(n, r);
  }
};
$e(Fi, "instance");
let kp = Fi;
const x$ = [
  [jC, DC],
  [JI, Wf],
  [LC, qC],
  [NC, BC],
  [FC, UC],
  [MC, xC],
  [$C, Mt],
  [WC, kC],
  [KC, GC]
], $$ = [["ipv4", VC]];
kp.getInstance({
  formatMap: $$,
  schemaKindMap: x$
});
const ee = {
  DiscriminatedRef: SC,
  IsUnion: OC,
  Nullish: AC,
  OmitOwner: RC,
  Overwrite: wC,
  RefSchema: Wf,
  Serialized: CC,
  TRef: JI
}, No = B.Object({
  data: B.String(),
  id: B.String()
});
var N$ = Object.defineProperty, B$ = (e, n, r) => n in e ? N$(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[n] = r, j$ = (e, n, r) => B$(e, n + "", r), Bo = /* @__PURE__ */ ((e) => (e.ApiAction = "ApiAction", e.CodeAction = "CodeAction", e))(Bo || {}), $l = /* @__PURE__ */ ((e) => (e.AntDesignAffix = "AntDesignAffix", e.AntDesignAlert = "AntDesignAlert", e.AntDesignAnchor = "AntDesignAnchor", e.AntDesignAutoComplete = "AntDesignAutoComplete", e.AntDesignAvatar = "AntDesignAvatar", e.AntDesignBackTop = "AntDesignBackTop", e.AntDesignBadge = "AntDesignBadge", e.AntDesignBreadcrumb = "AntDesignBreadcrumb", e.AntDesignButton = "AntDesignButton", e.AntDesignCalendar = "AntDesignCalendar", e.AntDesignCard = "AntDesignCard", e.AntDesignCardMeta = "AntDesignCardMeta", e.AntDesignCarousel = "AntDesignCarousel", e.AntDesignCascader = "AntDesignCascader", e.AntDesignCheckbox = "AntDesignCheckbox", e.AntDesignCheckboxGroup = "AntDesignCheckboxGroup", e.AntDesignCollapse = "AntDesignCollapse", e.AntDesignConfigProvider = "AntDesignConfigProvider", e.AntDesignDatePicker = "AntDesignDatePicker", e.AntDesignDescriptions = "AntDesignDescriptions", e.AntDesignDivider = "AntDesignDivider", e.AntDesignDrawer = "AntDesignDrawer", e.AntDesignDropdown = "AntDesignDropdown", e.AntDesignDropdownButton = "AntDesignDropdownButton", e.AntDesignEmpty = "AntDesignEmpty", e.AntDesignForm = "AntDesignForm", e.AntDesignFormErrorList = "AntDesignFormErrorList", e.AntDesignFormItem = "AntDesignFormItem", e.AntDesignFormList = "AntDesignFormList", e.AntDesignFormProvider = "AntDesignFormProvider", e.AntDesignGridCol = "AntDesignGridCol", e.AntDesignGridRow = "AntDesignGridRow", e.AntDesignIcon = "AntDesignIcon", e.AntDesignImage = "AntDesignImage", e.AntDesignInput = "AntDesignInput", e.AntDesignInputNumber = "AntDesignInputNumber", e.AntDesignInputSearch = "AntDesignInputSearch", e.AntDesignInputTextArea = "AntDesignInputTextArea", e.AntDesignLayout = "AntDesignLayout", e.AntDesignLayoutContent = "AntDesignLayoutContent", e.AntDesignLayoutFooter = "AntDesignLayoutFooter", e.AntDesignLayoutHeader = "AntDesignLayoutHeader", e.AntDesignLayoutSider = "AntDesignLayoutSider", e.AntDesignList = "AntDesignList", e.AntDesignListItem = "AntDesignListItem", e.AntDesignListItemMeta = "AntDesignListItemMeta", e.AntDesignMentions = "AntDesignMentions", e.AntDesignMenu = "AntDesignMenu", e.AntDesignMessage = "AntDesignMessage", e.AntDesignModal = "AntDesignModal", e.AntDesignNotification = "AntDesignNotification", e.AntDesignPagination = "AntDesignPagination", e.AntDesignPopconfirm = "AntDesignPopconfirm", e.AntDesignPopover = "AntDesignPopover", e.AntDesignProgress = "AntDesignProgress", e.AntDesignRadioGroup = "AntDesignRadioGroup", e.AntDesignRate = "AntDesignRate", e.AntDesignResult = "AntDesignResult", e.AntDesignSegmented = "AntDesignSegmented", e.AntDesignSelect = "AntDesignSelect", e.AntDesignSkeleton = "AntDesignSkeleton", e.AntDesignSlider = "AntDesignSlider", e.AntDesignSpace = "AntDesignSpace", e.AntDesignSpin = "AntDesignSpin", e.AntDesignStatistic = "AntDesignStatistic", e.AntDesignSteps = "AntDesignSteps", e.AntDesignSwitch = "AntDesignSwitch", e.AntDesignTable = "AntDesignTable", e.AntDesignTabs = "AntDesignTabs", e.AntDesignTag = "AntDesignTag", e.AntDesignTimePicker = "AntDesignTimePicker", e.AntDesignTimeline = "AntDesignTimeline", e.AntDesignTooltip = "AntDesignTooltip", e.AntDesignTransfer = "AntDesignTransfer", e.AntDesignTree = "AntDesignTree", e.AntDesignTreeSelect = "AntDesignTreeSelect", e.AntDesignTypographyParagraph = "AntDesignTypographyParagraph", e.AntDesignTypographyText = "AntDesignTypographyText", e.AntDesignTypographyTitle = "AntDesignTypographyTitle", e.AntDesignUpload = "AntDesignUpload", e.ExternalComponent = "ExternalComponent", e.GridLayout = "GridLayout", e.HookGraphqlMutation = "HookGraphqlMutation", e.HookGraphqlQuery = "HookGraphqlQuery", e.HookQueryConfig = "HookQueryConfig", e.HookQueryLambda = "HookQueryLambda", e.HookQueryPage = "HookQueryPage", e.HookQueryPages = "HookQueryPages", e.HookRecoilState = "HookRecoilState", e.HookRouter = "HookRouter", e.HtmlA = "HtmlA", e.HtmlAbbr = "HtmlAbbr", e.HtmlArea = "HtmlArea", e.HtmlArticle = "HtmlArticle", e.HtmlAside = "HtmlAside", e.HtmlAudio = "HtmlAudio", e.HtmlB = "HtmlB", e.HtmlBase = "HtmlBase", e.HtmlBdo = "HtmlBdo", e.HtmlBlockquote = "HtmlBlockquote", e.HtmlBr = "HtmlBr", e.HtmlButton = "HtmlButton", e.HtmlCanvas = "HtmlCanvas", e.HtmlCaption = "HtmlCaption", e.HtmlCite = "HtmlCite", e.HtmlCode = "HtmlCode", e.HtmlCol = "HtmlCol", e.HtmlData = "HtmlData", e.HtmlDatalist = "HtmlDatalist", e.HtmlDetails = "HtmlDetails", e.HtmlDfn = "HtmlDfn", e.HtmlDialog = "HtmlDialog", e.HtmlDiv = "HtmlDiv", e.HtmlDl = "HtmlDl", e.HtmlEm = "HtmlEm", e.HtmlEmbed = "HtmlEmbed", e.HtmlFieldset = "HtmlFieldset", e.HtmlFooter = "HtmlFooter", e.HtmlForm = "HtmlForm", e.HtmlH1 = "HtmlH1", e.HtmlH2 = "HtmlH2", e.HtmlH3 = "HtmlH3", e.HtmlH4 = "HtmlH4", e.HtmlH5 = "HtmlH5", e.HtmlH6 = "HtmlH6", e.HtmlHead = "HtmlHead", e.HtmlHeader = "HtmlHeader", e.HtmlHr = "HtmlHr", e.HtmlI = "HtmlI", e.HtmlIframe = "HtmlIframe", e.HtmlImg = "HtmlImg", e.HtmlInput = "HtmlInput", e.HtmlKbd = "HtmlKbd", e.HtmlLabel = "HtmlLabel", e.HtmlLegend = "HtmlLegend", e.HtmlLi = "HtmlLi", e.HtmlLink = "HtmlLink", e.HtmlMain = "HtmlMain", e.HtmlMap = "HtmlMap", e.HtmlMark = "HtmlMark", e.HtmlMath = "HtmlMath", e.HtmlMeta = "HtmlMeta", e.HtmlMeter = "HtmlMeter", e.HtmlNav = "HtmlNav", e.HtmlNoscript = "HtmlNoscript", e.HtmlObject = "HtmlObject", e.HtmlOl = "HtmlOl", e.HtmlOptgroup = "HtmlOptgroup", e.HtmlOption = "HtmlOption", e.HtmlOutput = "HtmlOutput", e.HtmlP = "HtmlP", e.HtmlPicture = "HtmlPicture", e.HtmlPre = "HtmlPre", e.HtmlProgress = "HtmlProgress", e.HtmlQ = "HtmlQ", e.HtmlRuby = "HtmlRuby", e.HtmlS = "HtmlS", e.HtmlSamp = "HtmlSamp", e.HtmlScript = "HtmlScript", e.HtmlSection = "HtmlSection", e.HtmlSelect = "HtmlSelect", e.HtmlSmall = "HtmlSmall", e.HtmlSource = "HtmlSource", e.HtmlSpan = "HtmlSpan", e.HtmlStrong = "HtmlStrong", e.HtmlStyle = "HtmlStyle", e.HtmlSub = "HtmlSub", e.HtmlSup = "HtmlSup", e.HtmlTable = "HtmlTable", e.HtmlTd = "HtmlTd", e.HtmlTextarea = "HtmlTextarea", e.HtmlTh = "HtmlTh", e.HtmlTime = "HtmlTime", e.HtmlTitle = "HtmlTitle", e.HtmlTr = "HtmlTr", e.HtmlTrack = "HtmlTrack", e.HtmlU = "HtmlU", e.HtmlUl = "HtmlUl", e.HtmlVar = "HtmlVar", e.HtmlVideo = "HtmlVideo", e.HtmlWbr = "HtmlWbr", e.LexicalEditor = "LexicalEditor", e.MuiAccordion = "MuiAccordion", e.MuiAccordionActions = "MuiAccordionActions", e.MuiAccordionDetails = "MuiAccordionDetails", e.MuiAccordionSummary = "MuiAccordionSummary", e.MuiAlert = "MuiAlert", e.MuiAlertTitle = "MuiAlertTitle", e.MuiAppBar = "MuiAppBar", e.MuiAutocomplete = "MuiAutocomplete", e.MuiAvatar = "MuiAvatar", e.MuiAvatarGroup = "MuiAvatarGroup", e.MuiBackdrop = "MuiBackdrop", e.MuiBadge = "MuiBadge", e.MuiBadgeUnstyled = "MuiBadgeUnstyled", e.MuiBottomNavigation = "MuiBottomNavigation", e.MuiBottomNavigationAction = "MuiBottomNavigationAction", e.MuiBox = "MuiBox", e.MuiBreadcrumbs = "MuiBreadcrumbs", e.MuiButton = "MuiButton", e.MuiButtonBase = "MuiButtonBase", e.MuiButtonGroup = "MuiButtonGroup", e.MuiButtonUnstyled = "MuiButtonUnstyled", e.MuiCalendarPicker = "MuiCalendarPicker", e.MuiCalendarPickerSkeleton = "MuiCalendarPickerSkeleton", e.MuiCard = "MuiCard", e.MuiCardActionArea = "MuiCardActionArea", e.MuiCardActions = "MuiCardActions", e.MuiCardContent = "MuiCardContent", e.MuiCardHeader = "MuiCardHeader", e.MuiCardMedia = "MuiCardMedia", e.MuiCheckbox = "MuiCheckbox", e.MuiChip = "MuiChip", e.MuiCircularProgress = "MuiCircularProgress", e.MuiClickAwayListener = "MuiClickAwayListener", e.MuiClockPicker = "MuiClockPicker", e.MuiCollapse = "MuiCollapse", e.MuiContainer = "MuiContainer", e.MuiCssBaseline = "MuiCssBaseline", e.MuiDataGrid = "MuiDataGrid", e.MuiDatePicker = "MuiDatePicker", e.MuiDateRangePicker = "MuiDateRangePicker", e.MuiDateRangePickerDay = "MuiDateRangePickerDay", e.MuiDateTimePicker = "MuiDateTimePicker", e.MuiDesktopDatePicker = "MuiDesktopDatePicker", e.MuiDesktopDateRangePicker = "MuiDesktopDateRangePicker", e.MuiDesktopDateTimePicker = "MuiDesktopDateTimePicker", e.MuiDesktopTimePicker = "MuiDesktopTimePicker", e.MuiDialog = "MuiDialog", e.MuiDialogActions = "MuiDialogActions", e.MuiDialogContent = "MuiDialogContent", e.MuiDialogContentText = "MuiDialogContentText", e.MuiDialogTitle = "MuiDialogTitle", e.MuiDivider = "MuiDivider", e.MuiDrawer = "MuiDrawer", e.MuiFab = "MuiFab", e.MuiFade = "MuiFade", e.MuiFilledInput = "MuiFilledInput", e.MuiFormControl = "MuiFormControl", e.MuiFormControlLabel = "MuiFormControlLabel", e.MuiFormControlUnstyled = "MuiFormControlUnstyled", e.MuiFormGroup = "MuiFormGroup", e.MuiFormHelperText = "MuiFormHelperText", e.MuiFormLabel = "MuiFormLabel", e.MuiGlobalStyles = "MuiGlobalStyles", e.MuiGrid = "MuiGrid", e.MuiGridColDef = "MuiGridColDef", e.MuiGrow = "MuiGrow", e.MuiHidden = "MuiHidden", e.MuiIcon = "MuiIcon", e.MuiIconButton = "MuiIconButton", e.MuiImageList = "MuiImageList", e.MuiImageListItem = "MuiImageListItem", e.MuiImageListItemBar = "MuiImageListItemBar", e.MuiInput = "MuiInput", e.MuiInputAdornment = "MuiInputAdornment", e.MuiInputBase = "MuiInputBase", e.MuiInputLabel = "MuiInputLabel", e.MuiLinearProgress = "MuiLinearProgress", e.MuiLink = "MuiLink", e.MuiList = "MuiList", e.MuiListItem = "MuiListItem", e.MuiListItemAvatar = "MuiListItemAvatar", e.MuiListItemButton = "MuiListItemButton", e.MuiListItemIcon = "MuiListItemIcon", e.MuiListItemSecondaryAction = "MuiListItemSecondaryAction", e.MuiListItemText = "MuiListItemText", e.MuiListSubheader = "MuiListSubheader", e.MuiLoadingButton = "MuiLoadingButton", e.MuiMasonry = "MuiMasonry", e.MuiMasonryItem = "MuiMasonryItem", e.MuiMenu = "MuiMenu", e.MuiMenuItem = "MuiMenuItem", e.MuiMenuList = "MuiMenuList", e.MuiMobileDatePicker = "MuiMobileDatePicker", e.MuiMobileDateRangePicker = "MuiMobileDateRangePicker", e.MuiMobileDateTimePicker = "MuiMobileDateTimePicker", e.MuiMobileStepper = "MuiMobileStepper", e.MuiMobileTimePicker = "MuiMobileTimePicker", e.MuiModal = "MuiModal", e.MuiModalUnstyled = "MuiModalUnstyled", e.MuiMonthPicker = "MuiMonthPicker", e.MuiNativeSelect = "MuiNativeSelect", e.MuiNoSsr = "MuiNoSsr", e.MuiOutlinedInput = "MuiOutlinedInput", e.MuiPagination = "MuiPagination", e.MuiPaginationItem = "MuiPaginationItem", e.MuiPaper = "MuiPaper", e.MuiPickersDay = "MuiPickersDay", e.MuiPopover = "MuiPopover", e.MuiPopper = "MuiPopper", e.MuiPortal = "MuiPortal", e.MuiRadio = "MuiRadio", e.MuiRadioGroup = "MuiRadioGroup", e.MuiRating = "MuiRating", e.MuiScopedCssBaseline = "MuiScopedCssBaseline", e.MuiSelect = "MuiSelect", e.MuiSkeleton = "MuiSkeleton", e.MuiSlide = "MuiSlide", e.MuiSlider = "MuiSlider", e.MuiSliderUnstyled = "MuiSliderUnstyled", e.MuiSnackbar = "MuiSnackbar", e.MuiSnackbarContent = "MuiSnackbarContent", e.MuiSpeedDial = "MuiSpeedDial", e.MuiSpeedDialAction = "MuiSpeedDialAction", e.MuiSpeedDialIcon = "MuiSpeedDialIcon", e.MuiStack = "MuiStack", e.MuiStaticDatePicker = "MuiStaticDatePicker", e.MuiStaticDateRangePicker = "MuiStaticDateRangePicker", e.MuiStaticDateTimePicker = "MuiStaticDateTimePicker", e.MuiStaticTimePicker = "MuiStaticTimePicker", e.MuiStep = "MuiStep", e.MuiStepButton = "MuiStepButton", e.MuiStepConnector = "MuiStepConnector", e.MuiStepContent = "MuiStepContent", e.MuiStepIcon = "MuiStepIcon", e.MuiStepLabel = "MuiStepLabel", e.MuiStepper = "MuiStepper", e.MuiSvgIcon = "MuiSvgIcon", e.MuiSwipeableDrawer = "MuiSwipeableDrawer", e.MuiSwitch = "MuiSwitch", e.MuiSwitchUnstyled = "MuiSwitchUnstyled", e.MuiTab = "MuiTab", e.MuiTabContext = "MuiTabContext", e.MuiTabList = "MuiTabList", e.MuiTabPanel = "MuiTabPanel", e.MuiTabScrollButton = "MuiTabScrollButton", e.MuiTable = "MuiTable", e.MuiTableBody = "MuiTableBody", e.MuiTableCell = "MuiTableCell", e.MuiTableContainer = "MuiTableContainer", e.MuiTableFooter = "MuiTableFooter", e.MuiTableHead = "MuiTableHead", e.MuiTablePagination = "MuiTablePagination", e.MuiTableRow = "MuiTableRow", e.MuiTableSortLabel = "MuiTableSortLabel", e.MuiTabs = "MuiTabs", e.MuiTextField = "MuiTextField", e.MuiTextareaAutosize = "MuiTextareaAutosize", e.MuiTimePicker = "MuiTimePicker", e.MuiTimeline = "MuiTimeline", e.MuiTimelineConnector = "MuiTimelineConnector", e.MuiTimelineContent = "MuiTimelineContent", e.MuiTimelineDot = "MuiTimelineDot", e.MuiTimelineItem = "MuiTimelineItem", e.MuiTimelineOppositeContent = "MuiTimelineOppositeContent", e.MuiTimelineSeparator = "MuiTimelineSeparator", e.MuiToggleButton = "MuiToggleButton", e.MuiToggleButtonGroup = "MuiToggleButtonGroup", e.MuiToolbar = "MuiToolbar", e.MuiTooltip = "MuiTooltip", e.MuiTreeItem = "MuiTreeItem", e.MuiTreeView = "MuiTreeView", e.MuiTypography = "MuiTypography", e.MuiUnstableTrapFocus = "MuiUnstableTrapFocus", e.MuiYearPicker = "MuiYearPicker", e.MuiZoom = "MuiZoom", e.NextLink = "NextLink", e.Query = "Query", e.ReactFragment = "ReactFragment", e.Script = "Script", e.State = "State", e.Text = "Text", e.TextList = "TextList", e))($l || {}), iO = /* @__PURE__ */ ((e) => (e.Desktop = "Desktop", e.MobileLandscape = "MobileLandscape", e.MobilePortrait = "MobilePortrait", e.Tablet = "Tablet", e))(iO || {}), oO = /* @__PURE__ */ ((e) => (e.Css = "Css", e.CssInJs = "CssInJs", e.Graphql = "Graphql", e.Javascript = "Javascript", e.Json = "Json", e.Typescript = "Typescript", e))(oO || {}), aO = /* @__PURE__ */ ((e) => (e.Css = "CSS", e.Component = "Component", e.Node = "Node", e.Page = "Page", e.Props = "Props", e.PropsInspector = "PropsInspector", e.PropsMap = "PropsMap", e.PropsTransformation = "PropsTransformation", e))(aO || {}), uO = /* @__PURE__ */ ((e) => (e.AllElements = "AllElements", e.ChildrenOnly = "ChildrenOnly", e.DescendantsOnly = "DescendantsOnly", e.ExcludeDescendantsElements = "ExcludeDescendantsElements", e))(uO || {}), sO = /* @__PURE__ */ ((e) => (e.InternalServerError = "InternalServerError", e.NotFound = "NotFound", e.Provider = "Provider", e.Regular = "Regular", e))(sO || {}), cO = /* @__PURE__ */ ((e) => (e.Boolean = "Boolean", e.Integer = "Integer", e.Number = "Number", e.String = "String", e))(cO || {}), dO = /* @__PURE__ */ ((e) => (e.Page = "Page", e.Url = "Url", e))(dO || {}), Nl = /* @__PURE__ */ ((e) => (e.GraphQl = "GraphQl", e.Rest = "Rest", e))(Nl || {}), pO = /* @__PURE__ */ ((e) => (e.Admin = "Admin", e.User = "User", e))(pO || {}), je = /* @__PURE__ */ ((e) => (e.ActionType = "ActionType", e.AppType = "AppType", e.ArrayType = "ArrayType", e.CodeMirrorType = "CodeMirrorType", e.ElementType = "ElementType", e.EnumType = "EnumType", e.InterfaceType = "InterfaceType", e.LambdaType = "LambdaType", e.PageType = "PageType", e.PrimitiveType = "PrimitiveType", e.ReactNodeType = "ReactNodeType", e.RenderPropType = "RenderPropType", e.RichTextType = "RichTextType", e.UnionType = "UnionType", e))(je || {});
class W extends String {
  constructor(n, r) {
    super(n), j$(this, "__apiType"), this.value = n, this.__meta__ = r;
  }
  toString() {
    return this.value;
  }
}
new W(`
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
new W(`
    fragment Owner on User {
  id
}
    `, { fragmentName: "Owner" });
new W(`
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
new W(`
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
new W(`
    fragment Prop on Prop {
  data
  id
}
    `, { fragmentName: "Prop" });
new W(`
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
new W(`
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
new W(`
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
new W(`
    fragment TagPreview on Tag {
  id
  name
  owner {
    id
  }
}
    `, { fragmentName: "TagPreview" });
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
    fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
    `, { fragmentName: "EnumTypeValue" });
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
    fragment HookProp on Prop {
  data
  id
}
    `, { fragmentName: "HookProp" });
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
    mutation CreateApps($input: [AppCreateInput!]!) {
  createApps(input: $input) {
    apps {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation UpdateApps($where: AppWhere!, $update: AppUpdateInput!) {
  updateApps(update: $update, where: $where) {
    apps {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation DeleteApps($where: AppWhere!, $delete: AppDeleteInput) {
  deleteApps(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `);
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
    mutation DeleteAtoms($where: AtomWhere!, $delete: AtomDeleteInput) {
  deleteAtoms(where: $where, delete: $delete) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new W(`
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
new W(`
    mutation UpdateAtoms($where: AtomWhere, $update: AtomUpdateInput) {
  updateAtoms(update: $update, where: $where) {
    atoms {
      __typename
      id
    }
  }
}
    `);
new W(`
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
new W(`
    mutation CreateAuthGuards($input: [AuthGuardCreateInput!]!) {
  createAuthGuards(input: $input) {
    authGuards {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation UpdateAuthGuard($where: AuthGuardWhere, $update: AuthGuardUpdateInput) {
  updateAuthGuards(update: $update, where: $where) {
    authGuards {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation DeleteAuthGuards($where: AuthGuardWhere, $delete: AuthGuardDeleteInput) {
  deleteAuthGuards(where: $where, delete: $delete) {
    nodesDeleted
  }
}
    `);
new W(`
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
new W(`
    mutation DeleteComponents($where: ComponentWhere, $delete: ComponentDeleteInput) {
  deleteComponents(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `);
new W(`
    mutation UpdateComponents($where: ComponentWhere, $update: ComponentUpdateInput) {
  updateComponents(update: $update, where: $where) {
    components {
      __typename
      id
    }
  }
}
    `);
new W(`
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
new W(`
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
new W(`
    mutation CreateDomains($input: [DomainCreateInput!]!) {
  createDomains(input: $input) {
    domains {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation UpdateDomains($where: DomainWhere!, $update: DomainUpdateInput!) {
  updateDomains(update: $update, where: $where) {
    domains {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation DeleteDomains($where: DomainWhere!) {
  deleteDomains(where: $where) {
    nodesDeleted
  }
}
    `);
new W(`
    mutation CreateElements($input: [ElementCreateInput!]!) {
  createElements(input: $input) {
    elements {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation DeleteElements($where: ElementWhere!, $delete: ElementDeleteInput) {
  deleteElements(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `);
new W(`
    mutation UpdateElements($where: ElementWhere, $update: ElementUpdateInput) {
  updateElements(update: $update, where: $where) {
    elements {
      __typename
      id
    }
  }
}
    `);
new W(`
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
new W(`
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
new W(`
    mutation DeleteHooks($where: HookWhere!) {
  deleteHooks(where: $where) {
    nodesDeleted
  }
}
    `);
new W(`
    mutation CreateFields($input: [FieldCreateInput!]!) {
  createFields(input: $input) {
    fields {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation UpdateFields($where: FieldWhere!, $update: FieldUpdateInput!) {
  updateFields(update: $update, where: $where) {
    fields {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation DeleteFields($where: FieldWhere!) {
  deleteFields(where: $where) {
    nodesDeleted
  }
}
    `);
new W(`
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
new W(`
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
new W(`
    mutation DeletePages($where: PageWhere, $delete: PageDeleteInput) {
  deletePages(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `);
new W(`
    mutation UpdatePages($where: PageWhere, $update: PageUpdateInput) {
  updatePages(update: $update, where: $where) {
    pages {
      __typename
      id
    }
  }
}
    `);
new W(`
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
new W(`
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
new W(`
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
new W(`
    mutation DeletePreferences($where: PreferenceWhere, $delete: PreferenceDeleteInput) {
  deletePreferences(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `);
new W(`
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
new W(`
    mutation UpdatePreferences($where: PreferenceWhere, $update: PreferenceUpdateInput) {
  updatePreferences(update: $update, where: $where) {
    preferences {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation CreateProps($input: [PropCreateInput!]!) {
  createProps(input: $input) {
    props {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation UpdateProps($where: PropWhere, $update: PropUpdateInput) {
  updateProps(update: $update, where: $where) {
    props {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation DeleteProps($where: PropWhere!) {
  deleteProps(where: $where) {
    nodesDeleted
  }
}
    `);
new W(`
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
new W(`
    mutation CreateRedirects($input: [RedirectCreateInput!]!) {
  createRedirects(input: $input) {
    redirects {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation DeleteRedirects($where: RedirectWhere, $delete: RedirectDeleteInput) {
  deleteRedirects(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `);
new W(`
    mutation UpdateRedirects($where: RedirectWhere, $update: RedirectUpdateInput) {
  updateRedirects(update: $update, where: $where) {
    redirects {
      __typename
      id
    }
  }
}
    `);
new W(`
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
new W(`
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
new W(`
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
new W(`
    mutation CreateResources($input: [ResourceCreateInput!]!) {
  createResources(input: $input) {
    resources {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation UpdateResources($where: ResourceWhere, $update: ResourceUpdateInput) {
  updateResources(update: $update, where: $where) {
    resources {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation DeleteResources($where: ResourceWhere, $delete: ResourceDeleteInput) {
  deleteResources(where: $where, delete: $delete) {
    nodesDeleted
  }
}
    `);
new W(`
    mutation CreateCodeActions($input: [CodeActionCreateInput!]!) {
  createCodeActions(input: $input) {
    codeActions {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation CreateApiActions($input: [ApiActionCreateInput!]!) {
  createApiActions(input: $input) {
    apiActions {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation DeleteCodeActions($where: CodeActionWhere!, $delete: CodeActionDeleteInput) {
  deleteCodeActions(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new W(`
    mutation DeleteApiActions($where: ApiActionWhere!, $delete: ApiActionDeleteInput) {
  deleteApiActions(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new W(`
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
new W(`
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
new W(`
    mutation DeleteStores($where: StoreWhere, $delete: StoreDeleteInput) {
  deleteStores(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `);
new W(`
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
new W(`
    mutation UpdateStores($where: StoreWhere, $update: StoreUpdateInput) {
  updateStores(update: $update, where: $where) {
    stores {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation UpdateCodeActions($update: CodeActionUpdateInput, $where: CodeActionWhere) {
  updateCodeActions(update: $update, where: $where) {
    codeActions {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation UpdateApiActions($update: ApiActionUpdateInput, $where: ApiActionWhere) {
  updateApiActions(update: $update, where: $where) {
    apiActions {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation CreateTags($input: [TagCreateInput!]!) {
  createTags(input: $input) {
    tags {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation UpdateTags($where: TagWhere!, $update: TagUpdateInput!) {
  updateTags(update: $update, where: $where) {
    tags {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation DeleteTags($where: TagWhere!) {
  deleteTags(where: $where) {
    nodesDeleted
  }
}
    `);
new W(`
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
new W(`
    mutation CreatePrimitiveTypes($input: [PrimitiveTypeCreateInput!]!) {
  types: createPrimitiveTypes(input: $input) {
    types: primitiveTypes {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation CreateArrayTypes($input: [ArrayTypeCreateInput!]!) {
  types: createArrayTypes(input: $input) {
    types: arrayTypes {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation CreateUnionTypes($input: [UnionTypeCreateInput!]!) {
  types: createUnionTypes(input: $input) {
    types: unionTypes {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation CreateInterfaceTypes($input: [InterfaceTypeCreateInput!]!) {
  types: createInterfaceTypes(input: $input) {
    types: interfaceTypes {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation CreateElementTypes($input: [ElementTypeCreateInput!]!) {
  types: createElementTypes(input: $input) {
    types: elementTypes {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation CreateRenderPropTypes($input: [RenderPropTypeCreateInput!]!) {
  types: createRenderPropTypes(input: $input) {
    types: renderPropTypes {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation CreateReactNodeTypes($input: [ReactNodeTypeCreateInput!]!) {
  types: createReactNodeTypes(input: $input) {
    types: reactNodeTypes {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation CreateEnumTypes($input: [EnumTypeCreateInput!]!) {
  types: createEnumTypes(input: $input) {
    types: enumTypes {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation CreateLambdaTypes($input: [LambdaTypeCreateInput!]!) {
  types: createLambdaTypes(input: $input) {
    types: lambdaTypes {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation CreatePageTypes($input: [PageTypeCreateInput!]!) {
  types: createPageTypes(input: $input) {
    types: pageTypes {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation CreateAppTypes($input: [AppTypeCreateInput!]!) {
  types: createAppTypes(input: $input) {
    types: appTypes {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation CreateRichTextTypes($input: [RichTextTypeCreateInput!]!) {
  types: createRichTextTypes(input: $input) {
    types: richTextTypes {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation CreateActionTypes($input: [ActionTypeCreateInput!]!) {
  types: createActionTypes(input: $input) {
    types: actionTypes {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation CreateCodeMirrorTypes($input: [CodeMirrorTypeCreateInput!]!) {
  types: createCodeMirrorTypes(input: $input) {
    types: codeMirrorTypes {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation DeletePrimitiveTypes($delete: PrimitiveTypeDeleteInput, $where: PrimitiveTypeWhere) {
  deletePrimitiveTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new W(`
    mutation DeleteArrayTypes($delete: ArrayTypeDeleteInput, $where: ArrayTypeWhere) {
  deleteArrayTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new W(`
    mutation DeleteReactNodeTypes($delete: ReactNodeTypeDeleteInput, $where: ReactNodeTypeWhere) {
  deleteReactNodeTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new W(`
    mutation DeleteUnionTypes($delete: UnionTypeDeleteInput, $where: UnionTypeWhere) {
  deleteUnionTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new W(`
    mutation DeleteInterfaceTypes($delete: InterfaceTypeDeleteInput, $where: InterfaceTypeWhere) {
  deleteInterfaceTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new W(`
    mutation DeleteElementTypes($delete: ElementTypeDeleteInput, $where: ElementTypeWhere) {
  deleteElementTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new W(`
    mutation DeleteRenderPropTypes($delete: RenderPropTypeDeleteInput, $where: RenderPropTypeWhere) {
  deleteRenderPropTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new W(`
    mutation DeleteRichTextTypes($delete: RichTextTypeDeleteInput, $where: RichTextTypeWhere) {
  deleteRichTextTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new W(`
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
new W(`
    mutation DeleteLambdaTypes($delete: LambdaTypeDeleteInput, $where: LambdaTypeWhere) {
  deleteLambdaTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new W(`
    mutation DeletePageTypes($delete: PageTypeDeleteInput, $where: PageTypeWhere) {
  deletePageTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new W(`
    mutation DeleteAppTypes($delete: AppTypeDeleteInput, $where: AppTypeWhere) {
  deleteAppTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new W(`
    mutation DeleteActionTypes($delete: ActionTypeDeleteInput, $where: ActionTypeWhere) {
  deleteActionTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new W(`
    mutation DeleteCodeMirrorTypes($delete: CodeMirrorTypeDeleteInput, $where: CodeMirrorTypeWhere) {
  deleteCodeMirrorTypes(delete: $delete, where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `);
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
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
new W(`
    query InterfaceForm_GetApps($options: AppOptions, $where: AppWhere) {
  apps(options: $options, where: $where) {
    id
    name
  }
}
    `);
new W(`
    query InterfaceForm_GetAtoms($options: AtomOptions, $where: AtomWhere) {
  atoms(options: $options, where: $where) {
    id
    name
    type
  }
}
    `);
new W(`
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
new W(`
    query InterfaceForm_GetStores($options: StoreOptions, $where: StoreWhere) {
  stores(options: $options, where: $where) {
    id
    name
  }
}
    `);
new W(`
    query InterfaceForm_GetResource($options: ResourceOptions, $where: ResourceWhere) {
  resources(options: $options, where: $where) {
    id
    name
  }
}
    `);
new W(`
    query InterfaceForm_GetPages($options: PageOptions, $where: PageWhere) {
  pages(options: $options, where: $where) {
    id
    name
  }
}
    `);
new W(`
    query IsTypeDescendantOf($descendantTypeId: ID!, $parentTypeId: ID!) {
  isTypeDescendantOf(
    descendantTypeId: $descendantTypeId
    parentTypeId: $parentTypeId
  )
}
    `);
new W(`
    query GetTypeReferences($typeId: ID!) {
  getTypeReferences(typeId: $typeId) {
    label
    name
  }
}
    `);
new W(`
    mutation UpdatePrimitiveTypes($update: PrimitiveTypeUpdateInput, $where: PrimitiveTypeWhere) {
  types: updatePrimitiveTypes(update: $update, where: $where) {
    types: primitiveTypes {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation UpdateArrayTypes($update: ArrayTypeUpdateInput, $where: ArrayTypeWhere) {
  types: updateArrayTypes(update: $update, where: $where) {
    types: arrayTypes {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation UpdateUnionTypes($update: UnionTypeUpdateInput, $where: UnionTypeWhere) {
  types: updateUnionTypes(update: $update, where: $where) {
    types: unionTypes {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation UpdateInterfaceTypes($update: InterfaceTypeUpdateInput, $where: InterfaceTypeWhere) {
  types: updateInterfaceTypes(update: $update, where: $where) {
    types: interfaceTypes {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation UpdateReactNodeTypes($update: ReactNodeTypeUpdateInput, $where: ReactNodeTypeWhere) {
  types: updateReactNodeTypes(update: $update, where: $where) {
    types: reactNodeTypes {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation UpdateElementTypes($update: ElementTypeUpdateInput, $where: ElementTypeWhere) {
  types: updateElementTypes(update: $update, where: $where) {
    types: elementTypes {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation UpdateRenderPropTypes($update: RenderPropTypeUpdateInput, $where: RenderPropTypeWhere) {
  types: updateRenderPropTypes(update: $update, where: $where) {
    types: renderPropTypes {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation UpdateEnumTypes($update: EnumTypeUpdateInput, $where: EnumTypeWhere) {
  types: updateEnumTypes(update: $update, where: $where) {
    types: enumTypes {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation UpdateLambdaTypes($update: LambdaTypeUpdateInput, $where: LambdaTypeWhere) {
  types: updateLambdaTypes(update: $update, where: $where) {
    types: lambdaTypes {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation UpdatePageTypes($update: PageTypeUpdateInput, $where: PageTypeWhere) {
  types: updatePageTypes(update: $update, where: $where) {
    types: pageTypes {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation UpdateAppTypes($update: AppTypeUpdateInput, $where: AppTypeWhere) {
  types: updateAppTypes(update: $update, where: $where) {
    types: appTypes {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation UpdateRichTextTypes($update: RichTextTypeUpdateInput, $where: RichTextTypeWhere) {
  types: updateRichTextTypes(update: $update, where: $where) {
    types: richTextTypes {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation UpdateActionTypes($update: ActionTypeUpdateInput, $where: ActionTypeWhere) {
  types: updateActionTypes(update: $update, where: $where) {
    types: actionTypes {
      __typename
      id
    }
  }
}
    `);
new W(`
    mutation UpdateCodeMirrorTypes($update: CodeMirrorTypeUpdateInput, $where: CodeMirrorTypeWhere) {
  types: updateCodeMirrorTypes(update: $update, where: $where) {
    types: codeMirrorTypes {
      __typename
      id
    }
  }
}
    `);
new W(`
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
new W(`
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
new W(`
    mutation DeleteUsers($where: UserWhere!) {
  deleteUsers(where: $where) {
    nodesDeleted
  }
}
    `);
new W(`
    mutation UpdateUsers($where: UserWhere!, $update: UserUpdateInput!) {
  updateUsers(update: $update, where: $where) {
    users {
      __typename
      id
    }
  }
}
    `);
const D$ = ee.DiscriminatedRef(Bo.ApiAction), F$ = ee.DiscriminatedRef(Bo.CodeAction), Ab = B.Union([
  D$,
  F$
]), fO = B.Object({
  id: B.String(),
  name: B.String(),
  store: ee.RefSchema,
  type: B.Enum(Bo)
}), lO = B.Composite([
  fO,
  B.Object({
    __typename: B.Literal(`${Bo.ApiAction}`),
    config: No,
    errorAction: ee.Nullish(Ab),
    resource: ee.RefSchema,
    successAction: ee.Nullish(Ab)
  })
]), U$ = lO, yO = B.Composite([
  fO,
  B.Object({
    __typename: B.Literal(`${Bo.CodeAction}`),
    code: B.String()
  })
]), L$ = yO;
B.Union(
  [lO, yO],
  {
    discriminantKey: "__typename",
    errorMessage: "Unknown action type name"
  }
);
const q$ = B.Union([U$, L$], {
  discriminantKey: "__typename",
  errorMessage: "Unknown action type name"
}), vc = B.Object({
  api: ee.Nullish(ee.RefSchema),
  // Sync with dto since some nested may need to match for extending
  data: B.Record(B.String(), B.Any()),
  id: B.String()
});
var Fa = /* @__PURE__ */ ((e) => (e.Atom = "Atom", e.Component = "Component", e))(Fa || {});
const K$ = B.Union(
  [
    ee.DiscriminatedRef(
      "Atom"
      /* Atom */
    ),
    ee.DiscriminatedRef(
      "Component"
      /* Component */
    )
  ],
  { discriminantKey: "__typename" }
), Cc = B.Object({
  childMapperComponent: ee.Nullish(ee.RefSchema),
  childMapperPreviousSibling: ee.Nullish(ee.RefSchema),
  childMapperPropKey: ee.Nullish(B.String()),
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
  closestContainerNode: ee.RefSchema,
  compositeKey: ee.Nullish(B.String()),
  firstChild: ee.Nullish(ee.RefSchema),
  id: B.String(),
  name: B.String(),
  nextSibling: ee.Nullish(ee.RefSchema),
  page: ee.Nullish(ee.RefSchema),
  parentComponent: ee.Nullish(ee.RefSchema),
  parentElement: ee.Nullish(ee.RefSchema),
  postRenderActions: ee.Nullish(B.Array(ee.RefSchema)),
  preRenderActions: ee.Nullish(B.Array(ee.RefSchema)),
  prevSibling: ee.Nullish(ee.RefSchema),
  // Treat element as aggregate, so we include prop data here
  props: No,
  renderForEachPropKey: ee.Nullish(B.String()),
  renderIfExpression: ee.Nullish(B.String()),
  renderType: B.Omit(K$, ["name"]),
  style: ee.Nullish(B.String()),
  tailwindClassNames: ee.Nullish(B.Array(B.String()))
});
B.Composite([
  B.Object({
    /**
     * We have renderType here
     */
    // Can't use `IAtomType` due to circular import issue
    atom: B.Optional(B.Enum($l)),
    // Name of the Component
    component: B.Optional(B.String()),
    propsData: B.Optional(B.Object({}))
  }),
  B.Pick(Cc, [
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
const G$ = B.Object({
  ...Cc.properties,
  props: No
});
B.Object({
  ...Cc.properties,
  props: vc
});
const H$ = B.Object({
  activeConfigPaneTab: B.Enum(aO),
  builderBreakpointType: B.Enum(iO),
  builderWidth: B.Number(),
  id: B.String()
});
B.Object({
  apps: B.Optional(B.Array(ee.RefSchema)),
  auth0Id: B.String(),
  email: B.String(),
  id: B.String(),
  name: B.String(),
  picture: B.String(),
  preferences: H$,
  roles: B.Array(B.Enum(pO)),
  username: B.String()
});
const mO = B.Object({
  owner: ee.RefSchema
}), V$ = B.Composite([
  mO,
  B.Object({
    __typename: B.Literal(`${Fa.Atom}`),
    api: ee.RefSchema,
    externalCssSource: ee.Nullish(B.String()),
    externalJsSource: ee.Nullish(B.String()),
    externalSourceType: ee.Nullish(B.String()),
    icon: ee.Nullish(B.String()),
    id: B.String(),
    name: B.String(),
    requiredParents: B.Optional(B.Array(ee.RefSchema)),
    suggestedChildren: B.Optional(B.Array(ee.RefSchema)),
    tags: B.Optional(B.Array(ee.RefSchema)),
    type: B.Enum($l)
  })
]), W$ = B.Literal(
  `${je}`
);
B.Transform(W$).Decode((e) => je[e]).Encode((e) => e);
B.Object({
  __typename: B.String(),
  id: B.String(),
  kind: B.Enum(je),
  name: B.String()
});
const Sn = (e) => B.Object({
  /**
   * Needs to be optional since our Neo4j OGM returns only optional
   */
  __typename: B.Literal(e),
  id: B.String(),
  kind: B.Enum(je),
  name: B.String(),
  owner: ee.RefSchema
}), k$ = Sn(`${je.ActionType}`), gO = B.Union(
  [
    ee.DiscriminatedRef(`${je.ActionType}`),
    ee.DiscriminatedRef(`${je.AppType}`),
    ee.DiscriminatedRef(`${je.ArrayType}`),
    ee.DiscriminatedRef(`${je.CodeMirrorType}`),
    ee.DiscriminatedRef(`${je.ElementType}`),
    ee.DiscriminatedRef(`${je.EnumType}`),
    ee.DiscriminatedRef(`${je.InterfaceType}`),
    ee.DiscriminatedRef(`${je.LambdaType}`),
    ee.DiscriminatedRef(`${je.PageType}`),
    ee.DiscriminatedRef(`${je.PrimitiveType}`),
    ee.DiscriminatedRef(`${je.ReactNodeType}`),
    ee.DiscriminatedRef(`${je.RenderPropType}`),
    ee.DiscriminatedRef(`${je.RichTextType}`),
    ee.DiscriminatedRef(`${je.UnionType}`)
  ],
  { discriminantKey: "__typename", errorMessage: "Unknown type" }
), X$ = Sn(`${je.AppType}`), z$ = B.Composite([
  Sn(`${je.ArrayType}`),
  B.Object({
    itemType: B.Optional(gO)
  })
]);
B.Object({
  __typename: B.Literal(`${je}`),
  id: B.String(),
  kind: B.Enum(je),
  name: B.String(),
  owner: ee.RefSchema
});
const Y$ = B.Composite([
  Sn(`${je.CodeMirrorType}`),
  B.Object({
    language: B.Enum(oO)
  })
]), J$ = B.Composite([
  Sn(`${je.ElementType}`),
  B.Object({
    elementKind: B.Enum(uO)
  })
]), Q$ = B.Object({
  id: B.String(),
  key: B.String(),
  value: B.String()
}), Z$ = B.Composite([
  Sn(`${je.EnumType}`),
  B.Object({
    allowedValues: B.Array(Q$)
  })
]), TO = B.Composite([
  Sn(`${je.InterfaceType}`),
  B.Object({
    fields: B.Optional(B.Array(ee.RefSchema, { default: [] }))
  })
]);
ee.DiscriminatedRef(
  je.InterfaceType
);
const eN = B.Composite([
  Sn(`${je.LambdaType}`)
]), nN = B.Composite([
  Sn(`${je.PageType}`)
]), tN = B.Composite([
  Sn(`${je.PrimitiveType}`),
  B.Object({
    primitiveKind: B.Enum(cO)
  })
]), rN = B.Composite([
  Sn(`${je.ReactNodeType}`)
]), iN = B.Composite([
  Sn(`${je.RenderPropType}`)
]), oN = B.Composite([
  Sn(`${je.RichTextType}`)
]), aN = B.Composite([
  Sn(`${je.UnionType}`),
  B.Object({
    typesOfUnionType: B.Array(gO)
  })
]), _O = [
  k$,
  X$,
  z$,
  Y$,
  J$,
  Z$,
  TO,
  eN,
  nN,
  tN,
  rN,
  iN,
  oN,
  aN
];
B.Union(_O, {
  discriminantKey: "__typename",
  errorMessage: "Unknown type"
});
const _o = (e) => B.Omit(e, ["owner"]), bO = B.Union(
  _O.map(_o),
  {
    discriminantKey: "__typename",
    errorMessage: "Unknown type"
  }
), hO = B.Object({
  api: ee.RefSchema,
  defaultValues: ee.Nullish(B.Any()),
  description: ee.Nullish(B.String()),
  fieldType: ee.RefSchema,
  id: B.String(),
  key: B.String(),
  name: ee.Nullish(B.String()),
  nextSibling: ee.Nullish(ee.RefSchema),
  prevSibling: ee.Nullish(ee.RefSchema),
  validationRules: ee.Nullish(B.Any())
});
B.Omit(hO, ["owner"]);
const uN = B.Composite([
  B.Omit(TO, ["fields"]),
  B.Object({
    fields: B.Array(hO)
  })
]), Bl = B.Composite([
  B.Object({
    types: B.Array(bO)
  }),
  _o(uN)
]), sN = B.Composite([
  B.Object({
    __typename: B.Literal(`${Fa.Atom}`)
  }),
  V$
]), cN = B.Object({
  api: Bl,
  atom: _o(sN)
}), dN = B.Object({
  actions: B.Optional(B.Array(ee.RefSchema)),
  api: ee.RefSchema,
  component: ee.Nullish(ee.RefSchema),
  id: B.String(),
  name: B.String(),
  page: ee.Nullish(ee.RefSchema)
}), pN = B.Composite([
  B.Omit(dN, ["component", "page"]),
  B.Object({
    actions: B.Array(ee.RefSchema),
    api: ee.RefSchema
  })
]), IO = B.Object({
  actions: B.Array(q$),
  api: Bl,
  store: pN
}), PO = B.Object({
  __typename: B.Literal(`${Fa.Component}`),
  api: ee.RefSchema,
  id: B.String(),
  name: B.String(),
  owner: ee.RefSchema,
  props: No,
  rootElement: ee.RefSchema,
  store: ee.RefSchema
}), OO = B.Object({
  api: Bl,
  component: _o(PO),
  elements: B.Array(Cc),
  store: IO
});
B.Object({
  ...PO.properties,
  __typename: B.Literal(`${Fa.Component}`),
  props: vc,
  slug: B.String()
});
const AO = B.Object({
  children: B.Optional(B.Array(ee.RefSchema)),
  // This is computed property
  descendants: B.Optional(B.Array(ee.RefSchema)),
  id: B.String(),
  name: B.String(),
  owner: ee.RefSchema,
  parent: ee.Nullish(ee.RefSchema)
}), fN = AO;
B.Omit(AO, ["owner"]);
B.Object({
  atoms: B.Array(cN),
  components: B.Array(OO),
  // resources: Array<IResourceOutputDto>
  systemTypes: B.Array(bO),
  tags: B.Array(fN)
});
const RO = B.Object({
  adminDataPath: B.String({
    default: "./data/export-v3"
  }),
  download: B.Optional(
    B.Boolean({
      default: !1
      // description: 'Saves to codebase if not downloading',
    })
  )
  // includeAdminData: Type.Optional(Type.Boolean({ default: true })),
  // includeUserData: Type.Optional(Type.Boolean()),
  // userDataPath: Type.Optional(Type.String()),
});
iP(RO);
const lN = B.Pick(RO, ["adminDataPath"]);
iP(lN);
const yN = B.Object({
  app: ee.RefSchema,
  /**
   * https://stackoverflow.com/a/74650249/2159920
   *
   * domainConfig: { misconfigured: boolean } | undefined
   */
  domainConfig: B.Union([
    B.Object({
      misconfigured: B.Boolean()
    }),
    B.Undefined()
  ]),
  id: B.String(),
  name: B.String()
}), EO = yN, wO = B.Object({
  app: ee.RefSchema,
  /**
   * a pre-computed descendant elements ids
   */
  elements: B.Optional(B.Array(ee.RefSchema)),
  id: B.String(),
  kind: B.Enum(sO),
  name: B.String(),
  // The container element of the page
  pageContentContainer: ee.Nullish(ee.RefSchema),
  redirect: ee.Nullish(ee.RefSchema),
  rootElement: ee.RefSchema,
  store: ee.RefSchema,
  urlPattern: B.String()
}), mN = B.Object({
  elements: B.Array(G$),
  page: wO,
  store: IO
}), gN = B.Composite([
  wO,
  B.Object({
    slug: B.String()
  })
]), SO = B.Object({
  config: No,
  id: B.String(),
  name: B.String(),
  owner: ee.RefSchema,
  type: B.Enum(Nl)
});
B.Object({
  config: vc,
  id: B.String(),
  name: B.String(),
  owner: ee.RefSchema,
  type: B.Enum(Nl)
});
const TN = B.Object({
  headers: B.Optional(B.String()),
  url: B.String()
});
B.Object({
  ...SO.properties,
  config: TN
});
var vO = /* @__PURE__ */ ((e) => (e.DELETE = "DELETE", e.GET = "GET", e.HEAD = "HEAD", e.OPTION = "OPTION", e.PATCH = "PATCH", e.POST = "POST", e.PUT = "PUT", e))(vO || {}), CO = /* @__PURE__ */ ((e) => (e.ArrayBuffer = "arraybuffer", e.Blob = "blob", e.Document = "document", e.Json = "json", e.Stream = "stream", e.Text = "text", e))(CO || {});
const _N = B.Object({
  body: ee.Nullish(B.String()),
  headers: ee.Nullish(B.String()),
  method: B.Enum(vO),
  queryParams: ee.Nullish(B.String()),
  responseType: B.Enum(CO),
  urlSegment: B.String()
}), bN = B.Object({
  headers: ee.Nullish(B.String()),
  query: B.String(),
  variables: ee.Nullish(B.String())
});
B.Object({
  data: ee.Nullish(B.Any()),
  error: ee.Nullish(B.Any()),
  headers: ee.Nullish(B.Record(B.String(), B.Any())),
  status: ee.Nullish(B.Number()),
  statusText: ee.Nullish(B.String())
});
B.Union([
  _N,
  bN
]);
const MO = B.Object({
  ...mO.properties,
  domains: B.Optional(B.Array(ee.RefSchema)),
  id: B.String(),
  name: B.String(),
  pages: B.Optional(B.Array(ee.RefSchema))
});
B.Object({
  app: _o(MO),
  components: B.Array(OO),
  domains: B.Array(EO),
  pages: B.Array(mN),
  resources: B.Array(_o(SO))
});
B.Object({
  ...MO.properties,
  domains: B.Optional(B.Array(EO)),
  pages: B.Optional(B.Array(gN))
});
const hN = B.Object({
  config: No,
  id: B.String(),
  name: B.String(),
  owner: ee.RefSchema,
  resource: ee.RefSchema,
  responseTransformer: B.String()
});
B.Object({
  ...hN.properties,
  config: vc
});
B.Object({
  authGuard: ee.RefSchema,
  id: B.String(),
  source: ee.RefSchema,
  targetPage: ee.Nullish(ee.RefSchema),
  targetType: B.Enum(dO),
  targetUrl: ee.Nullish(B.String())
});
B.Object({
  authorization: ee.Nullish(B.String()),
  domain: B.String(),
  pageUrlPattern: B.String()
});
var Ls = { exports: {} }, IN = Ls.exports, Rb;
function PN() {
  return Rb || (Rb = 1, function(e, n) {
    (function(r, o, i) {
      e.exports = i(), e.exports.default = i();
    })("slugify", IN, function() {
      var r = JSON.parse(`{"$":"dollar","%":"percent","&":"and","<":"less",">":"greater","|":"or","¢":"cent","£":"pound","¤":"currency","¥":"yen","©":"(c)","ª":"a","®":"(r)","º":"o","À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","þ":"th","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Č":"C","č":"c","Ď":"D","ď":"d","Đ":"DJ","đ":"dj","Ē":"E","ē":"e","Ė":"E","ė":"e","Ę":"e","ę":"e","Ě":"E","ě":"e","Ğ":"G","ğ":"g","Ģ":"G","ģ":"g","Ĩ":"I","ĩ":"i","Ī":"i","ī":"i","Į":"I","į":"i","İ":"I","ı":"i","Ķ":"k","ķ":"k","Ļ":"L","ļ":"l","Ľ":"L","ľ":"l","Ł":"L","ł":"l","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","Ō":"O","ō":"o","Ő":"O","ő":"o","Œ":"OE","œ":"oe","Ŕ":"R","ŕ":"r","Ř":"R","ř":"r","Ś":"S","ś":"s","Ş":"S","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","Ť":"T","ť":"t","Ũ":"U","ũ":"u","Ū":"u","ū":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","Ə":"E","ƒ":"f","Ơ":"O","ơ":"o","Ư":"U","ư":"u","ǈ":"LJ","ǉ":"lj","ǋ":"NJ","ǌ":"nj","Ș":"S","ș":"s","Ț":"T","ț":"t","ə":"e","˚":"o","Ά":"A","Έ":"E","Ή":"H","Ί":"I","Ό":"O","Ύ":"Y","Ώ":"W","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ϊ":"I","Ϋ":"Y","ά":"a","έ":"e","ή":"h","ί":"i","ΰ":"y","α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","ς":"s","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ϊ":"i","ϋ":"y","ό":"o","ύ":"y","ώ":"w","Ё":"Yo","Ђ":"DJ","Є":"Ye","І":"I","Ї":"Yi","Ј":"J","Љ":"LJ","Њ":"NJ","Ћ":"C","Џ":"DZ","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"U","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya","а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sh","ъ":"u","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","ё":"yo","ђ":"dj","є":"ye","і":"i","ї":"yi","ј":"j","љ":"lj","њ":"nj","ћ":"c","ѝ":"u","џ":"dz","Ґ":"G","ґ":"g","Ғ":"GH","ғ":"gh","Қ":"KH","қ":"kh","Ң":"NG","ң":"ng","Ү":"UE","ү":"ue","Ұ":"U","ұ":"u","Һ":"H","һ":"h","Ә":"AE","ә":"ae","Ө":"OE","ө":"oe","Ա":"A","Բ":"B","Գ":"G","Դ":"D","Ե":"E","Զ":"Z","Է":"E'","Ը":"Y'","Թ":"T'","Ժ":"JH","Ի":"I","Լ":"L","Խ":"X","Ծ":"C'","Կ":"K","Հ":"H","Ձ":"D'","Ղ":"GH","Ճ":"TW","Մ":"M","Յ":"Y","Ն":"N","Շ":"SH","Չ":"CH","Պ":"P","Ջ":"J","Ռ":"R'","Ս":"S","Վ":"V","Տ":"T","Ր":"R","Ց":"C","Փ":"P'","Ք":"Q'","Օ":"O''","Ֆ":"F","և":"EV","ء":"a","آ":"aa","أ":"a","ؤ":"u","إ":"i","ئ":"e","ا":"a","ب":"b","ة":"h","ت":"t","ث":"th","ج":"j","ح":"h","خ":"kh","د":"d","ذ":"th","ر":"r","ز":"z","س":"s","ش":"sh","ص":"s","ض":"dh","ط":"t","ظ":"z","ع":"a","غ":"gh","ف":"f","ق":"q","ك":"k","ل":"l","م":"m","ن":"n","ه":"h","و":"w","ى":"a","ي":"y","ً":"an","ٌ":"on","ٍ":"en","َ":"a","ُ":"u","ِ":"e","ْ":"","٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","پ":"p","چ":"ch","ژ":"zh","ک":"k","گ":"g","ی":"y","۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9","฿":"baht","ა":"a","ბ":"b","გ":"g","დ":"d","ე":"e","ვ":"v","ზ":"z","თ":"t","ი":"i","კ":"k","ლ":"l","მ":"m","ნ":"n","ო":"o","პ":"p","ჟ":"zh","რ":"r","ს":"s","ტ":"t","უ":"u","ფ":"f","ქ":"k","ღ":"gh","ყ":"q","შ":"sh","ჩ":"ch","ც":"ts","ძ":"dz","წ":"ts","ჭ":"ch","ხ":"kh","ჯ":"j","ჰ":"h","Ṣ":"S","ṣ":"s","Ẁ":"W","ẁ":"w","Ẃ":"W","ẃ":"w","Ẅ":"W","ẅ":"w","ẞ":"SS","Ạ":"A","ạ":"a","Ả":"A","ả":"a","Ấ":"A","ấ":"a","Ầ":"A","ầ":"a","Ẩ":"A","ẩ":"a","Ẫ":"A","ẫ":"a","Ậ":"A","ậ":"a","Ắ":"A","ắ":"a","Ằ":"A","ằ":"a","Ẳ":"A","ẳ":"a","Ẵ":"A","ẵ":"a","Ặ":"A","ặ":"a","Ẹ":"E","ẹ":"e","Ẻ":"E","ẻ":"e","Ẽ":"E","ẽ":"e","Ế":"E","ế":"e","Ề":"E","ề":"e","Ể":"E","ể":"e","Ễ":"E","ễ":"e","Ệ":"E","ệ":"e","Ỉ":"I","ỉ":"i","Ị":"I","ị":"i","Ọ":"O","ọ":"o","Ỏ":"O","ỏ":"o","Ố":"O","ố":"o","Ồ":"O","ồ":"o","Ổ":"O","ổ":"o","Ỗ":"O","ỗ":"o","Ộ":"O","ộ":"o","Ớ":"O","ớ":"o","Ờ":"O","ờ":"o","Ở":"O","ở":"o","Ỡ":"O","ỡ":"o","Ợ":"O","ợ":"o","Ụ":"U","ụ":"u","Ủ":"U","ủ":"u","Ứ":"U","ứ":"u","Ừ":"U","ừ":"u","Ử":"U","ử":"u","Ữ":"U","ữ":"u","Ự":"U","ự":"u","Ỳ":"Y","ỳ":"y","Ỵ":"Y","ỵ":"y","Ỷ":"Y","ỷ":"y","Ỹ":"Y","ỹ":"y","–":"-","‘":"'","’":"'","“":"\\"","”":"\\"","„":"\\"","†":"+","•":"*","…":"...","₠":"ecu","₢":"cruzeiro","₣":"french franc","₤":"lira","₥":"mill","₦":"naira","₧":"peseta","₨":"rupee","₩":"won","₪":"new shequel","₫":"dong","€":"euro","₭":"kip","₮":"tugrik","₯":"drachma","₰":"penny","₱":"peso","₲":"guarani","₳":"austral","₴":"hryvnia","₵":"cedi","₸":"kazakhstani tenge","₹":"indian rupee","₺":"turkish lira","₽":"russian ruble","₿":"bitcoin","℠":"sm","™":"tm","∂":"d","∆":"delta","∑":"sum","∞":"infinity","♥":"love","元":"yuan","円":"yen","﷼":"rial","ﻵ":"laa","ﻷ":"laa","ﻹ":"lai","ﻻ":"la"}`), o = JSON.parse('{"bg":{"Й":"Y","Ц":"Ts","Щ":"Sht","Ъ":"A","Ь":"Y","й":"y","ц":"ts","щ":"sht","ъ":"a","ь":"y"},"de":{"Ä":"AE","ä":"ae","Ö":"OE","ö":"oe","Ü":"UE","ü":"ue","ß":"ss","%":"prozent","&":"und","|":"oder","∑":"summe","∞":"unendlich","♥":"liebe"},"es":{"%":"por ciento","&":"y","<":"menor que",">":"mayor que","|":"o","¢":"centavos","£":"libras","¤":"moneda","₣":"francos","∑":"suma","∞":"infinito","♥":"amor"},"fr":{"%":"pourcent","&":"et","<":"plus petit",">":"plus grand","|":"ou","¢":"centime","£":"livre","¤":"devise","₣":"franc","∑":"somme","∞":"infini","♥":"amour"},"pt":{"%":"porcento","&":"e","<":"menor",">":"maior","|":"ou","¢":"centavo","∑":"soma","£":"libra","∞":"infinito","♥":"amor"},"uk":{"И":"Y","и":"y","Й":"Y","й":"y","Ц":"Ts","ц":"ts","Х":"Kh","х":"kh","Щ":"Shch","щ":"shch","Г":"H","г":"h"},"vi":{"Đ":"D","đ":"d"},"da":{"Ø":"OE","ø":"oe","Å":"AA","å":"aa","%":"procent","&":"og","|":"eller","$":"dollar","<":"mindre end",">":"større end"},"nb":{"&":"og","Å":"AA","Æ":"AE","Ø":"OE","å":"aa","æ":"ae","ø":"oe"},"it":{"&":"e"},"nl":{"&":"en"},"sv":{"&":"och","Å":"AA","Ä":"AE","Ö":"OE","å":"aa","ä":"ae","ö":"oe"}}');
      function i(t, a) {
        if (typeof t != "string")
          throw new Error("slugify: string argument expected");
        a = typeof a == "string" ? { replacement: a } : a || {};
        var u = o[a.locale] || {}, c = a.replacement === void 0 ? "-" : a.replacement, s = a.trim === void 0 ? !0 : a.trim, p = t.normalize().split("").reduce(function(d, f) {
          var T = u[f];
          return T === void 0 && (T = r[f]), T === void 0 && (T = f), T === c && (T = " "), d + T.replace(a.remove || /[^\w\s$*_+~.()'"!\-:@]+/g, "");
        }, "");
        return a.strict && (p = p.replace(/[^A-Za-z0-9\s]/g, "")), s && (p = p.trim()), p = p.replace(/\s+/g, c), a.lower && (p = p.toLowerCase()), p;
      }
      return i.extend = function(t) {
        Object.assign(r, t);
      }, i;
    });
  }(Ls)), Ls.exports;
}
PN();
var Id = {}, Eb;
function ON() {
  if (Eb) return Id;
  Eb = 1;
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
  Id.getTokens = function(o, i = {}) {
    let t;
    if (i.pretty) {
      const c = typeof o == "string" ? JSON.parse(o) : o;
      t = JSON.stringify(c, null, 2);
    } else
      t = typeof o == "string" ? o : JSON.stringify(o);
    let a = [], u;
    do {
      u = !1;
      for (let c = 0; c < e.length; c++) {
        const s = e[c].regex.exec(t);
        if (s) {
          a.push({ type: e[c].tokenType, value: s[0] }), t = t.substring(s[0].length), u = !0;
          break;
        }
      }
    } while (n(t, u));
    return a;
  };
  function n(r, o) {
    return (r || {}).length > 0 && o;
  }
  return Id;
}
var Pd = {}, Re = {};
const AN = {}, RN = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AN
}, Symbol.toStringTag, { value: "Module" })), EN = /* @__PURE__ */ Yh(RN);
var wb;
function wN() {
  if (wb) return Re;
  wb = 1, Object.defineProperty(Re, "__esModule", { value: !0 });
  var e = EN;
  function n(oe) {
    if (oe && oe.__esModule) return oe;
    var he = /* @__PURE__ */ Object.create(null);
    return oe && Object.keys(oe).forEach(function(xe) {
      if (xe !== "default") {
        var Ce = Object.getOwnPropertyDescriptor(oe, xe);
        Object.defineProperty(he, xe, Ce.get ? Ce : {
          enumerable: !0,
          get: function() {
            return oe[xe];
          }
        });
      }
    }), he.default = oe, Object.freeze(he);
  }
  var r = /* @__PURE__ */ n(e);
  const {
    env: o = {},
    argv: i = [],
    platform: t = ""
  } = typeof process > "u" ? {} : process, a = "NO_COLOR" in o || i.includes("--no-color"), u = "FORCE_COLOR" in o || i.includes("--color"), c = t === "win32", s = o.TERM === "dumb", p = r && r.isatty && r.isatty(1) && o.TERM && !s, d = "CI" in o && ("GITHUB_ACTIONS" in o || "GITLAB_CI" in o || "CIRCLECI" in o), f = !a && (u || c && !s || p || d), T = (oe, he, xe, Ce, S = he.substring(0, oe) + Ce, Se = he.substring(oe + xe.length), Ye = Se.indexOf(xe)) => S + (Ye < 0 ? Se : T(Ye, Se, xe, Ce)), h = (oe, he, xe, Ce, S) => oe < 0 ? xe + he + Ce : xe + T(oe, he, Ce, S) + Ce, I = (oe, he, xe = oe, Ce = oe.length + 1) => (S) => S || !(S === "" || S === void 0) ? h(
    ("" + S).indexOf(he, Ce),
    S,
    oe,
    he,
    xe
  ) : "", _ = (oe, he, xe) => I(`\x1B[${oe}m`, `\x1B[${he}m`, xe), A = {
    reset: _(0, 0),
    bold: _(1, 22, "\x1B[22m\x1B[1m"),
    dim: _(2, 22, "\x1B[22m\x1B[2m"),
    italic: _(3, 23),
    underline: _(4, 24),
    inverse: _(7, 27),
    hidden: _(8, 28),
    strikethrough: _(9, 29),
    black: _(30, 39),
    red: _(31, 39),
    green: _(32, 39),
    yellow: _(33, 39),
    blue: _(34, 39),
    magenta: _(35, 39),
    cyan: _(36, 39),
    white: _(37, 39),
    gray: _(90, 39),
    bgBlack: _(40, 49),
    bgRed: _(41, 49),
    bgGreen: _(42, 49),
    bgYellow: _(43, 49),
    bgBlue: _(44, 49),
    bgMagenta: _(45, 49),
    bgCyan: _(46, 49),
    bgWhite: _(47, 49),
    blackBright: _(90, 39),
    redBright: _(91, 39),
    greenBright: _(92, 39),
    yellowBright: _(93, 39),
    blueBright: _(94, 39),
    magentaBright: _(95, 39),
    cyanBright: _(96, 39),
    whiteBright: _(97, 39),
    bgBlackBright: _(100, 49),
    bgRedBright: _(101, 49),
    bgGreenBright: _(102, 49),
    bgYellowBright: _(103, 49),
    bgBlueBright: _(104, 49),
    bgMagentaBright: _(105, 49),
    bgCyanBright: _(106, 49),
    bgWhiteBright: _(107, 49)
  }, v = ({ useColor: oe = f } = {}) => oe ? A : Object.keys(A).reduce(
    (he, xe) => ({ ...he, [xe]: String }),
    {}
  ), {
    reset: j,
    bold: w,
    dim: l,
    italic: R,
    underline: y,
    inverse: P,
    hidden: E,
    strikethrough: b,
    black: x,
    red: N,
    green: q,
    yellow: k,
    blue: G,
    magenta: Y,
    cyan: H,
    white: F,
    gray: te,
    bgBlack: ce,
    bgRed: Te,
    bgGreen: Oe,
    bgYellow: we,
    bgBlue: ye,
    bgMagenta: Ke,
    bgCyan: J,
    bgWhite: re,
    blackBright: _e,
    redBright: Ee,
    greenBright: ne,
    yellowBright: K,
    blueBright: $,
    magentaBright: g,
    cyanBright: O,
    whiteBright: D,
    bgBlackBright: V,
    bgRedBright: m,
    bgGreenBright: Z,
    bgYellowBright: X,
    bgBlueBright: U,
    bgMagentaBright: se,
    bgCyanBright: ue,
    bgWhiteBright: ge
  } = v();
  return Re.bgBlack = ce, Re.bgBlackBright = V, Re.bgBlue = ye, Re.bgBlueBright = U, Re.bgCyan = J, Re.bgCyanBright = ue, Re.bgGreen = Oe, Re.bgGreenBright = Z, Re.bgMagenta = Ke, Re.bgMagentaBright = se, Re.bgRed = Te, Re.bgRedBright = m, Re.bgWhite = re, Re.bgWhiteBright = ge, Re.bgYellow = we, Re.bgYellowBright = X, Re.black = x, Re.blackBright = _e, Re.blue = G, Re.blueBright = $, Re.bold = w, Re.createColors = v, Re.cyan = H, Re.cyanBright = O, Re.dim = l, Re.gray = te, Re.green = q, Re.greenBright = ne, Re.hidden = E, Re.inverse = P, Re.isColorSupported = f, Re.italic = R, Re.magenta = Y, Re.magentaBright = g, Re.red = N, Re.redBright = Ee, Re.reset = j, Re.strikethrough = b, Re.underline = y, Re.white = F, Re.whiteBright = D, Re.yellow = k, Re.yellowBright = K, Re;
}
var Sb;
function SN() {
  if (Sb) return Pd;
  Sb = 1;
  const e = wN(), n = {
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
  return Pd.colorize = function(o, i = {}) {
    const t = i.colors || {};
    return o.reduce((a, u) => {
      const c = t[u.type] || n[u.type], s = c && e[c];
      return a + (s ? s(u.value) : u.value);
    }, "");
  }, Pd;
}
var Od, vb;
function vN() {
  if (vb) return Od;
  vb = 1;
  const e = ON(), n = SN();
  return Od = function(o, i) {
    return n.colorize(e.getTokens(o, i), i);
  }, Od;
}
vN();
class CN {
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
const MN = new CN();
var $s = { exports: {} }, Ad = {}, Rd = {}, Cb;
function Mc() {
  return Cb || (Cb = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function n(X, U) {
      for (var se in U) Object.defineProperty(X, se, {
        enumerable: !0,
        get: U[se]
      });
    }
    n(e, {
      ACTION_SUFFIX: function() {
        return d;
      },
      APP_DIR_ALIAS: function() {
        return G;
      },
      CACHE_ONE_YEAR: function() {
        return y;
      },
      DOT_NEXT_ALIAS: function() {
        return q;
      },
      ESLINT_DEFAULT_DIRS: function() {
        return O;
      },
      GSP_NO_RETURNED_VALUE: function() {
        return _e;
      },
      GSSP_COMPONENT_MEMBER_ERROR: function() {
        return K;
      },
      GSSP_NO_RETURNED_VALUE: function() {
        return Ee;
      },
      INFINITE_CACHE: function() {
        return P;
      },
      INSTRUMENTATION_HOOK_FILENAME: function() {
        return x;
      },
      MATCHED_PATH_HEADER: function() {
        return i;
      },
      MIDDLEWARE_FILENAME: function() {
        return E;
      },
      MIDDLEWARE_LOCATION_REGEXP: function() {
        return b;
      },
      NEXT_BODY_SUFFIX: function() {
        return h;
      },
      NEXT_CACHE_IMPLICIT_TAG_ID: function() {
        return R;
      },
      NEXT_CACHE_REVALIDATED_TAGS_HEADER: function() {
        return _;
      },
      NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER: function() {
        return A;
      },
      NEXT_CACHE_SOFT_TAG_MAX_LENGTH: function() {
        return l;
      },
      NEXT_CACHE_TAGS_HEADER: function() {
        return I;
      },
      NEXT_CACHE_TAG_MAX_ITEMS: function() {
        return j;
      },
      NEXT_CACHE_TAG_MAX_LENGTH: function() {
        return w;
      },
      NEXT_DATA_SUFFIX: function() {
        return f;
      },
      NEXT_INTERCEPTION_MARKER_PREFIX: function() {
        return o;
      },
      NEXT_META_SUFFIX: function() {
        return T;
      },
      NEXT_QUERY_PARAM_PREFIX: function() {
        return r;
      },
      NEXT_RESUME_HEADER: function() {
        return v;
      },
      NON_STANDARD_NODE_ENV: function() {
        return $;
      },
      PAGES_DIR_ALIAS: function() {
        return N;
      },
      PRERENDER_REVALIDATE_HEADER: function() {
        return t;
      },
      PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER: function() {
        return a;
      },
      PUBLIC_DIR_MIDDLEWARE_CONFLICT: function() {
        return Oe;
      },
      ROOT_DIR_ALIAS: function() {
        return k;
      },
      RSC_ACTION_CLIENT_WRAPPER_ALIAS: function() {
        return Te;
      },
      RSC_ACTION_ENCRYPTION_ALIAS: function() {
        return ce;
      },
      RSC_ACTION_PROXY_ALIAS: function() {
        return F;
      },
      RSC_ACTION_VALIDATE_ALIAS: function() {
        return H;
      },
      RSC_CACHE_WRAPPER_ALIAS: function() {
        return te;
      },
      RSC_MOD_REF_PROXY_ALIAS: function() {
        return Y;
      },
      RSC_PREFETCH_SUFFIX: function() {
        return u;
      },
      RSC_SEGMENTS_DIR_SUFFIX: function() {
        return c;
      },
      RSC_SEGMENT_SUFFIX: function() {
        return s;
      },
      RSC_SUFFIX: function() {
        return p;
      },
      SERVER_PROPS_EXPORT_ERROR: function() {
        return re;
      },
      SERVER_PROPS_GET_INIT_PROPS_CONFLICT: function() {
        return ye;
      },
      SERVER_PROPS_SSG_CONFLICT: function() {
        return Ke;
      },
      SERVER_RUNTIME: function() {
        return D;
      },
      SSG_FALLBACK_EXPORT_ERROR: function() {
        return g;
      },
      SSG_GET_INITIAL_PROPS_CONFLICT: function() {
        return we;
      },
      STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR: function() {
        return J;
      },
      UNSTABLE_REVALIDATE_RENAME_ERROR: function() {
        return ne;
      },
      WEBPACK_LAYERS: function() {
        return m;
      },
      WEBPACK_RESOURCE_QUERIES: function() {
        return Z;
      }
    });
    const r = "nxtP", o = "nxtI", i = "x-matched-path", t = "x-prerender-revalidate", a = "x-prerender-revalidate-if-generated", u = ".prefetch.rsc", c = ".segments", s = ".segment.rsc", p = ".rsc", d = ".action", f = ".json", T = ".meta", h = ".body", I = "x-next-cache-tags", _ = "x-next-revalidated-tags", A = "x-next-revalidate-tag-token", v = "next-resume", j = 128, w = 256, l = 1024, R = "_N_T_", y = 31536e3, P = 4294967294, E = "middleware", b = `(?:src/)?${E}`, x = "instrumentation", N = "private-next-pages", q = "private-dot-next", k = "private-next-root-dir", G = "private-next-app-dir", Y = "private-next-rsc-mod-ref-proxy", H = "private-next-rsc-action-validate", F = "private-next-rsc-server-reference", te = "private-next-rsc-cache-wrapper", ce = "private-next-rsc-action-encryption", Te = "private-next-rsc-action-client-wrapper", Oe = "You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict", we = "You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps", ye = "You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.", Ke = "You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps", J = "can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props", re = "pages with `getServerSideProps` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export", _e = "Your `getStaticProps` function did not return an object. Did you forget to add a `return`?", Ee = "Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?", ne = "The `unstable_revalidate` property is available for general use.\nPlease use `revalidate` instead.", K = "can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member", $ = 'You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env', g = "Pages with `fallback` enabled in `getStaticPaths` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export", O = [
      "app",
      "pages",
      "components",
      "lib",
      "src"
    ], D = {
      edge: "edge",
      experimentalEdge: "experimental-edge",
      nodejs: "nodejs"
    }, V = {
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
    }, m = {
      ...V,
      GROUP: {
        builtinReact: [
          V.reactServerComponents,
          V.actionBrowser
        ],
        serverOnly: [
          V.reactServerComponents,
          V.actionBrowser,
          V.instrument,
          V.middleware
        ],
        neutralTarget: [
          // pages api
          V.apiNode,
          V.apiEdge
        ],
        clientOnly: [
          V.serverSideRendering,
          V.appPagesBrowser
        ],
        bundled: [
          V.reactServerComponents,
          V.actionBrowser,
          V.serverSideRendering,
          V.appPagesBrowser,
          V.shared,
          V.instrument,
          V.middleware
        ],
        appPages: [
          // app router pages and layouts
          V.reactServerComponents,
          V.serverSideRendering,
          V.appPagesBrowser,
          V.actionBrowser
        ]
      }
    }, Z = {
      edgeSSREntry: "__next_edge_ssr_entry__",
      metadata: "__next_metadata__",
      metadataRoute: "__next_metadata_route__",
      metadataImageMeta: "__next_metadata_image_meta__"
    };
  }(Rd)), Rd;
}
var Ed = {}, wd = {}, Mb;
function xc() {
  return Mb || (Mb = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function n(_, A) {
      for (var v in A) Object.defineProperty(_, v, {
        enumerable: !0,
        get: A[v]
      });
    }
    n(e, {
      AppRenderSpan: function() {
        return c;
      },
      AppRouteRouteHandlersSpan: function() {
        return d;
      },
      BaseServerSpan: function() {
        return r;
      },
      LoadComponentsSpan: function() {
        return o;
      },
      LogSpanAllowList: function() {
        return I;
      },
      MiddlewareSpan: function() {
        return T;
      },
      NextNodeServerSpan: function() {
        return t;
      },
      NextServerSpan: function() {
        return i;
      },
      NextVanillaSpanAllowlist: function() {
        return h;
      },
      NodeSpan: function() {
        return p;
      },
      RenderSpan: function() {
        return u;
      },
      ResolveMetadataSpan: function() {
        return f;
      },
      RouterSpan: function() {
        return s;
      },
      StartServerSpan: function() {
        return a;
      }
    });
    var r = /* @__PURE__ */ function(_) {
      return _.handleRequest = "BaseServer.handleRequest", _.run = "BaseServer.run", _.pipe = "BaseServer.pipe", _.getStaticHTML = "BaseServer.getStaticHTML", _.render = "BaseServer.render", _.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", _.renderToResponse = "BaseServer.renderToResponse", _.renderToHTML = "BaseServer.renderToHTML", _.renderError = "BaseServer.renderError", _.renderErrorToResponse = "BaseServer.renderErrorToResponse", _.renderErrorToHTML = "BaseServer.renderErrorToHTML", _.render404 = "BaseServer.render404", _;
    }(r || {}), o = /* @__PURE__ */ function(_) {
      return _.loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", _.loadComponents = "LoadComponents.loadComponents", _;
    }(o || {}), i = /* @__PURE__ */ function(_) {
      return _.getRequestHandler = "NextServer.getRequestHandler", _.getServer = "NextServer.getServer", _.getServerRequestHandler = "NextServer.getServerRequestHandler", _.createServer = "createServer.createServer", _;
    }(i || {}), t = /* @__PURE__ */ function(_) {
      return _.compression = "NextNodeServer.compression", _.getBuildId = "NextNodeServer.getBuildId", _.createComponentTree = "NextNodeServer.createComponentTree", _.clientComponentLoading = "NextNodeServer.clientComponentLoading", _.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", _.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", _.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", _.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", _.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", _.sendRenderResult = "NextNodeServer.sendRenderResult", _.proxyRequest = "NextNodeServer.proxyRequest", _.runApi = "NextNodeServer.runApi", _.render = "NextNodeServer.render", _.renderHTML = "NextNodeServer.renderHTML", _.imageOptimizer = "NextNodeServer.imageOptimizer", _.getPagePath = "NextNodeServer.getPagePath", _.getRoutesManifest = "NextNodeServer.getRoutesManifest", _.findPageComponents = "NextNodeServer.findPageComponents", _.getFontManifest = "NextNodeServer.getFontManifest", _.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", _.getRequestHandler = "NextNodeServer.getRequestHandler", _.renderToHTML = "NextNodeServer.renderToHTML", _.renderError = "NextNodeServer.renderError", _.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", _.render404 = "NextNodeServer.render404", _.startResponse = "NextNodeServer.startResponse", _.route = "route", _.onProxyReq = "onProxyReq", _.apiResolver = "apiResolver", _.internalFetch = "internalFetch", _;
    }(t || {}), a = /* @__PURE__ */ function(_) {
      return _.startServer = "startServer.startServer", _;
    }(a || {}), u = /* @__PURE__ */ function(_) {
      return _.getServerSideProps = "Render.getServerSideProps", _.getStaticProps = "Render.getStaticProps", _.renderToString = "Render.renderToString", _.renderDocument = "Render.renderDocument", _.createBodyResult = "Render.createBodyResult", _;
    }(u || {}), c = /* @__PURE__ */ function(_) {
      return _.renderToString = "AppRender.renderToString", _.renderToReadableStream = "AppRender.renderToReadableStream", _.getBodyResult = "AppRender.getBodyResult", _.fetch = "AppRender.fetch", _;
    }(c || {}), s = /* @__PURE__ */ function(_) {
      return _.executeRoute = "Router.executeRoute", _;
    }(s || {}), p = /* @__PURE__ */ function(_) {
      return _.runHandler = "Node.runHandler", _;
    }(p || {}), d = /* @__PURE__ */ function(_) {
      return _.runHandler = "AppRouteRouteHandlers.runHandler", _;
    }(d || {}), f = /* @__PURE__ */ function(_) {
      return _.generateMetadata = "ResolveMetadata.generateMetadata", _.generateViewport = "ResolveMetadata.generateViewport", _;
    }(f || {}), T = /* @__PURE__ */ function(_) {
      return _.execute = "Middleware.execute", _;
    }(T || {});
    const h = [
      "Middleware.execute",
      "BaseServer.handleRequest",
      "Render.getServerSideProps",
      "Render.getStaticProps",
      "AppRender.fetch",
      "AppRender.getBodyResult",
      "Render.renderDocument",
      "Node.runHandler",
      "AppRouteRouteHandlers.runHandler",
      "ResolveMetadata.generateMetadata",
      "ResolveMetadata.generateViewport",
      "NextNodeServer.createComponentTree",
      "NextNodeServer.findPageComponents",
      "NextNodeServer.getLayoutOrPageModule",
      "NextNodeServer.startResponse",
      "NextNodeServer.clientComponentLoading"
    ], I = [
      "NextNodeServer.findPageComponents",
      "NextNodeServer.createComponentTree",
      "NextNodeServer.clientComponentLoading"
    ];
  }(wd)), wd;
}
var Sd = {}, vd = {}, xb;
function xN() {
  return xb || (xb = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "isThenable", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    function n(r) {
      return r !== null && typeof r == "object" && "then" in r && typeof r.then == "function";
    }
  }(vd)), vd;
}
var $N = typeof globalThis == "object" ? globalThis : typeof self == "object" ? self : typeof window == "object" ? window : typeof global == "object" ? global : {}, Li = "1.9.0", $b = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
function NN(e) {
  var n = /* @__PURE__ */ new Set([e]), r = /* @__PURE__ */ new Set(), o = e.match($b);
  if (!o)
    return function() {
      return !1;
    };
  var i = {
    major: +o[1],
    minor: +o[2],
    patch: +o[3],
    prerelease: o[4]
  };
  if (i.prerelease != null)
    return function(c) {
      return c === e;
    };
  function t(u) {
    return r.add(u), !1;
  }
  function a(u) {
    return n.add(u), !0;
  }
  return function(c) {
    if (n.has(c))
      return !0;
    if (r.has(c))
      return !1;
    var s = c.match($b);
    if (!s)
      return t(c);
    var p = {
      major: +s[1],
      minor: +s[2],
      patch: +s[3],
      prerelease: s[4]
    };
    return p.prerelease != null || i.major !== p.major ? t(c) : i.major === 0 ? i.minor === p.minor && i.patch <= p.patch ? a(c) : t(c) : i.minor <= p.minor ? a(c) : t(c);
  };
}
var BN = NN(Li), jN = Li.split(".")[0], da = Symbol.for("opentelemetry.js.api." + jN), pa = $N;
function Ua(e, n, r, o) {
  var i;
  o === void 0 && (o = !1);
  var t = pa[da] = (i = pa[da]) !== null && i !== void 0 ? i : {
    version: Li
  };
  if (!o && t[e]) {
    var a = new Error("@opentelemetry/api: Attempted duplicate registration of API: " + e);
    return r.error(a.stack || a.message), !1;
  }
  if (t.version !== Li) {
    var a = new Error("@opentelemetry/api: Registration of version v" + t.version + " for " + e + " does not match previously registered API v" + Li);
    return r.error(a.stack || a.message), !1;
  }
  return t[e] = n, r.debug("@opentelemetry/api: Registered a global for " + e + " v" + Li + "."), !0;
}
function Ki(e) {
  var n, r, o = (n = pa[da]) === null || n === void 0 ? void 0 : n.version;
  if (!(!o || !BN(o)))
    return (r = pa[da]) === null || r === void 0 ? void 0 : r[e];
}
function La(e, n) {
  n.debug("@opentelemetry/api: Unregistering a global for " + e + " v" + Li + ".");
  var r = pa[da];
  r && delete r[e];
}
var DN = function(e, n) {
  var r = typeof Symbol == "function" && e[Symbol.iterator];
  if (!r) return e;
  var o = r.call(e), i, t = [], a;
  try {
    for (; (n === void 0 || n-- > 0) && !(i = o.next()).done; ) t.push(i.value);
  } catch (u) {
    a = { error: u };
  } finally {
    try {
      i && !i.done && (r = o.return) && r.call(o);
    } finally {
      if (a) throw a.error;
    }
  }
  return t;
}, FN = function(e, n, r) {
  if (r || arguments.length === 2) for (var o = 0, i = n.length, t; o < i; o++)
    (t || !(o in n)) && (t || (t = Array.prototype.slice.call(n, 0, o)), t[o] = n[o]);
  return e.concat(t || Array.prototype.slice.call(n));
}, UN = (
  /** @class */
  function() {
    function e(n) {
      this._namespace = n.namespace || "DiagComponentLogger";
    }
    return e.prototype.debug = function() {
      for (var n = [], r = 0; r < arguments.length; r++)
        n[r] = arguments[r];
      return na("debug", this._namespace, n);
    }, e.prototype.error = function() {
      for (var n = [], r = 0; r < arguments.length; r++)
        n[r] = arguments[r];
      return na("error", this._namespace, n);
    }, e.prototype.info = function() {
      for (var n = [], r = 0; r < arguments.length; r++)
        n[r] = arguments[r];
      return na("info", this._namespace, n);
    }, e.prototype.warn = function() {
      for (var n = [], r = 0; r < arguments.length; r++)
        n[r] = arguments[r];
      return na("warn", this._namespace, n);
    }, e.prototype.verbose = function() {
      for (var n = [], r = 0; r < arguments.length; r++)
        n[r] = arguments[r];
      return na("verbose", this._namespace, n);
    }, e;
  }()
);
function na(e, n, r) {
  var o = Ki("diag");
  if (o)
    return r.unshift(n), o[e].apply(o, FN([], DN(r), !1));
}
var Pn;
(function(e) {
  e[e.NONE = 0] = "NONE", e[e.ERROR = 30] = "ERROR", e[e.WARN = 50] = "WARN", e[e.INFO = 60] = "INFO", e[e.DEBUG = 70] = "DEBUG", e[e.VERBOSE = 80] = "VERBOSE", e[e.ALL = 9999] = "ALL";
})(Pn || (Pn = {}));
function LN(e, n) {
  e < Pn.NONE ? e = Pn.NONE : e > Pn.ALL && (e = Pn.ALL), n = n || {};
  function r(o, i) {
    var t = n[o];
    return typeof t == "function" && e >= i ? t.bind(n) : function() {
    };
  }
  return {
    error: r("error", Pn.ERROR),
    warn: r("warn", Pn.WARN),
    info: r("info", Pn.INFO),
    debug: r("debug", Pn.DEBUG),
    verbose: r("verbose", Pn.VERBOSE)
  };
}
var qN = function(e, n) {
  var r = typeof Symbol == "function" && e[Symbol.iterator];
  if (!r) return e;
  var o = r.call(e), i, t = [], a;
  try {
    for (; (n === void 0 || n-- > 0) && !(i = o.next()).done; ) t.push(i.value);
  } catch (u) {
    a = { error: u };
  } finally {
    try {
      i && !i.done && (r = o.return) && r.call(o);
    } finally {
      if (a) throw a.error;
    }
  }
  return t;
}, KN = function(e, n, r) {
  if (r || arguments.length === 2) for (var o = 0, i = n.length, t; o < i; o++)
    (t || !(o in n)) && (t || (t = Array.prototype.slice.call(n, 0, o)), t[o] = n[o]);
  return e.concat(t || Array.prototype.slice.call(n));
}, GN = "diag", rt = (
  /** @class */
  function() {
    function e() {
      function n(i) {
        return function() {
          for (var t = [], a = 0; a < arguments.length; a++)
            t[a] = arguments[a];
          var u = Ki("diag");
          if (u)
            return u[i].apply(u, KN([], qN(t), !1));
        };
      }
      var r = this, o = function(i, t) {
        var a, u, c;
        if (t === void 0 && (t = { logLevel: Pn.INFO }), i === r) {
          var s = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
          return r.error((a = s.stack) !== null && a !== void 0 ? a : s.message), !1;
        }
        typeof t == "number" && (t = {
          logLevel: t
        });
        var p = Ki("diag"), d = LN((u = t.logLevel) !== null && u !== void 0 ? u : Pn.INFO, i);
        if (p && !t.suppressOverrideMessage) {
          var f = (c = new Error().stack) !== null && c !== void 0 ? c : "<failed to generate stacktrace>";
          p.warn("Current logger will be overwritten from " + f), d.warn("Current logger will overwrite one already registered from " + f);
        }
        return Ua("diag", d, r, !0);
      };
      r.setLogger = o, r.disable = function() {
        La(GN, r);
      }, r.createComponentLogger = function(i) {
        return new UN(i);
      }, r.verbose = n("verbose"), r.debug = n("debug"), r.info = n("info"), r.warn = n("warn"), r.error = n("error");
    }
    return e.instance = function() {
      return this._instance || (this._instance = new e()), this._instance;
    }, e;
  }()
), HN = function(e, n) {
  var r = typeof Symbol == "function" && e[Symbol.iterator];
  if (!r) return e;
  var o = r.call(e), i, t = [], a;
  try {
    for (; (n === void 0 || n-- > 0) && !(i = o.next()).done; ) t.push(i.value);
  } catch (u) {
    a = { error: u };
  } finally {
    try {
      i && !i.done && (r = o.return) && r.call(o);
    } finally {
      if (a) throw a.error;
    }
  }
  return t;
}, VN = function(e) {
  var n = typeof Symbol == "function" && Symbol.iterator, r = n && e[n], o = 0;
  if (r) return r.call(e);
  if (e && typeof e.length == "number") return {
    next: function() {
      return e && o >= e.length && (e = void 0), { value: e && e[o++], done: !e };
    }
  };
  throw new TypeError(n ? "Object is not iterable." : "Symbol.iterator is not defined.");
}, WN = (
  /** @class */
  function() {
    function e(n) {
      this._entries = n ? new Map(n) : /* @__PURE__ */ new Map();
    }
    return e.prototype.getEntry = function(n) {
      var r = this._entries.get(n);
      if (r)
        return Object.assign({}, r);
    }, e.prototype.getAllEntries = function() {
      return Array.from(this._entries.entries()).map(function(n) {
        var r = HN(n, 2), o = r[0], i = r[1];
        return [o, i];
      });
    }, e.prototype.setEntry = function(n, r) {
      var o = new e(this._entries);
      return o._entries.set(n, r), o;
    }, e.prototype.removeEntry = function(n) {
      var r = new e(this._entries);
      return r._entries.delete(n), r;
    }, e.prototype.removeEntries = function() {
      for (var n, r, o = [], i = 0; i < arguments.length; i++)
        o[i] = arguments[i];
      var t = new e(this._entries);
      try {
        for (var a = VN(o), u = a.next(); !u.done; u = a.next()) {
          var c = u.value;
          t._entries.delete(c);
        }
      } catch (s) {
        n = { error: s };
      } finally {
        try {
          u && !u.done && (r = a.return) && r.call(a);
        } finally {
          if (n) throw n.error;
        }
      }
      return t;
    }, e.prototype.clear = function() {
      return new e();
    }, e;
  }()
), kN = Symbol("BaggageEntryMetadata"), XN = rt.instance();
function zN(e) {
  return e === void 0 && (e = {}), new WN(new Map(Object.entries(e)));
}
function YN(e) {
  return typeof e != "string" && (XN.error("Cannot create baggage metadata from unknown type: " + typeof e), e = ""), {
    __TYPE__: kN,
    toString: function() {
      return e;
    }
  };
}
function jl(e) {
  return Symbol.for(e);
}
var JN = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(n) {
      var r = this;
      r._currentContext = n ? new Map(n) : /* @__PURE__ */ new Map(), r.getValue = function(o) {
        return r._currentContext.get(o);
      }, r.setValue = function(o, i) {
        var t = new e(r._currentContext);
        return t._currentContext.set(o, i), t;
      }, r.deleteValue = function(o) {
        var i = new e(r._currentContext);
        return i._currentContext.delete(o), i;
      };
    }
    return e;
  }()
), xO = new JN(), Cd = [
  { n: "error", c: "error" },
  { n: "warn", c: "warn" },
  { n: "info", c: "info" },
  { n: "debug", c: "debug" },
  { n: "verbose", c: "trace" }
], QN = (
  /** @class */
  /* @__PURE__ */ function() {
    function e() {
      function n(o) {
        return function() {
          for (var i = [], t = 0; t < arguments.length; t++)
            i[t] = arguments[t];
          if (console) {
            var a = console[o];
            if (typeof a != "function" && (a = console.log), typeof a == "function")
              return a.apply(console, i);
          }
        };
      }
      for (var r = 0; r < Cd.length; r++)
        this[Cd[r].n] = n(Cd[r].c);
    }
    return e;
  }()
), Zi = /* @__PURE__ */ function() {
  var e = function(n, r) {
    return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(o, i) {
      o.__proto__ = i;
    } || function(o, i) {
      for (var t in i) Object.prototype.hasOwnProperty.call(i, t) && (o[t] = i[t]);
    }, e(n, r);
  };
  return function(n, r) {
    if (typeof r != "function" && r !== null)
      throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
    e(n, r);
    function o() {
      this.constructor = n;
    }
    n.prototype = r === null ? Object.create(r) : (o.prototype = r.prototype, new o());
  };
}(), ZN = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.createGauge = function(n, r) {
      return sB;
    }, e.prototype.createHistogram = function(n, r) {
      return cB;
    }, e.prototype.createCounter = function(n, r) {
      return uB;
    }, e.prototype.createUpDownCounter = function(n, r) {
      return dB;
    }, e.prototype.createObservableGauge = function(n, r) {
      return fB;
    }, e.prototype.createObservableCounter = function(n, r) {
      return pB;
    }, e.prototype.createObservableUpDownCounter = function(n, r) {
      return lB;
    }, e.prototype.addBatchObservableCallback = function(n, r) {
    }, e.prototype.removeBatchObservableCallback = function(n) {
    }, e;
  }()
), $c = (
  /** @class */
  /* @__PURE__ */ function() {
    function e() {
    }
    return e;
  }()
), eB = (
  /** @class */
  function(e) {
    Zi(n, e);
    function n() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return n.prototype.add = function(r, o) {
    }, n;
  }($c)
), nB = (
  /** @class */
  function(e) {
    Zi(n, e);
    function n() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return n.prototype.add = function(r, o) {
    }, n;
  }($c)
), tB = (
  /** @class */
  function(e) {
    Zi(n, e);
    function n() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return n.prototype.record = function(r, o) {
    }, n;
  }($c)
), rB = (
  /** @class */
  function(e) {
    Zi(n, e);
    function n() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return n.prototype.record = function(r, o) {
    }, n;
  }($c)
), Dl = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.addCallback = function(n) {
    }, e.prototype.removeCallback = function(n) {
    }, e;
  }()
), iB = (
  /** @class */
  function(e) {
    Zi(n, e);
    function n() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return n;
  }(Dl)
), oB = (
  /** @class */
  function(e) {
    Zi(n, e);
    function n() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return n;
  }(Dl)
), aB = (
  /** @class */
  function(e) {
    Zi(n, e);
    function n() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return n;
  }(Dl)
), $O = new ZN(), uB = new eB(), sB = new tB(), cB = new rB(), dB = new nB(), pB = new iB(), fB = new oB(), lB = new aB();
function yB() {
  return $O;
}
var Xp;
(function(e) {
  e[e.INT = 0] = "INT", e[e.DOUBLE = 1] = "DOUBLE";
})(Xp || (Xp = {}));
var NO = {
  get: function(e, n) {
    if (e != null)
      return e[n];
  },
  keys: function(e) {
    return e == null ? [] : Object.keys(e);
  }
}, BO = {
  set: function(e, n, r) {
    e != null && (e[n] = r);
  }
}, mB = function(e, n) {
  var r = typeof Symbol == "function" && e[Symbol.iterator];
  if (!r) return e;
  var o = r.call(e), i, t = [], a;
  try {
    for (; (n === void 0 || n-- > 0) && !(i = o.next()).done; ) t.push(i.value);
  } catch (u) {
    a = { error: u };
  } finally {
    try {
      i && !i.done && (r = o.return) && r.call(o);
    } finally {
      if (a) throw a.error;
    }
  }
  return t;
}, gB = function(e, n, r) {
  if (r || arguments.length === 2) for (var o = 0, i = n.length, t; o < i; o++)
    (t || !(o in n)) && (t || (t = Array.prototype.slice.call(n, 0, o)), t[o] = n[o]);
  return e.concat(t || Array.prototype.slice.call(n));
}, TB = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.active = function() {
      return xO;
    }, e.prototype.with = function(n, r, o) {
      for (var i = [], t = 3; t < arguments.length; t++)
        i[t - 3] = arguments[t];
      return r.call.apply(r, gB([o], mB(i), !1));
    }, e.prototype.bind = function(n, r) {
      return r;
    }, e.prototype.enable = function() {
      return this;
    }, e.prototype.disable = function() {
      return this;
    }, e;
  }()
), _B = function(e, n) {
  var r = typeof Symbol == "function" && e[Symbol.iterator];
  if (!r) return e;
  var o = r.call(e), i, t = [], a;
  try {
    for (; (n === void 0 || n-- > 0) && !(i = o.next()).done; ) t.push(i.value);
  } catch (u) {
    a = { error: u };
  } finally {
    try {
      i && !i.done && (r = o.return) && r.call(o);
    } finally {
      if (a) throw a.error;
    }
  }
  return t;
}, bB = function(e, n, r) {
  if (r || arguments.length === 2) for (var o = 0, i = n.length, t; o < i; o++)
    (t || !(o in n)) && (t || (t = Array.prototype.slice.call(n, 0, o)), t[o] = n[o]);
  return e.concat(t || Array.prototype.slice.call(n));
}, Md = "context", hB = new TB(), Nc = (
  /** @class */
  function() {
    function e() {
    }
    return e.getInstance = function() {
      return this._instance || (this._instance = new e()), this._instance;
    }, e.prototype.setGlobalContextManager = function(n) {
      return Ua(Md, n, rt.instance());
    }, e.prototype.active = function() {
      return this._getContextManager().active();
    }, e.prototype.with = function(n, r, o) {
      for (var i, t = [], a = 3; a < arguments.length; a++)
        t[a - 3] = arguments[a];
      return (i = this._getContextManager()).with.apply(i, bB([n, r, o], _B(t), !1));
    }, e.prototype.bind = function(n, r) {
      return this._getContextManager().bind(n, r);
    }, e.prototype._getContextManager = function() {
      return Ki(Md) || hB;
    }, e.prototype.disable = function() {
      this._getContextManager().disable(), La(Md, rt.instance());
    }, e;
  }()
), Vs;
(function(e) {
  e[e.NONE = 0] = "NONE", e[e.SAMPLED = 1] = "SAMPLED";
})(Vs || (Vs = {}));
var Fl = "0000000000000000", Ul = "00000000000000000000000000000000", jO = {
  traceId: Ul,
  spanId: Fl,
  traceFlags: Vs.NONE
}, ta = (
  /** @class */
  function() {
    function e(n) {
      n === void 0 && (n = jO), this._spanContext = n;
    }
    return e.prototype.spanContext = function() {
      return this._spanContext;
    }, e.prototype.setAttribute = function(n, r) {
      return this;
    }, e.prototype.setAttributes = function(n) {
      return this;
    }, e.prototype.addEvent = function(n, r) {
      return this;
    }, e.prototype.addLink = function(n) {
      return this;
    }, e.prototype.addLinks = function(n) {
      return this;
    }, e.prototype.setStatus = function(n) {
      return this;
    }, e.prototype.updateName = function(n) {
      return this;
    }, e.prototype.end = function(n) {
    }, e.prototype.isRecording = function() {
      return !1;
    }, e.prototype.recordException = function(n, r) {
    }, e;
  }()
), Ll = jl("OpenTelemetry Context Key SPAN");
function ql(e) {
  return e.getValue(Ll) || void 0;
}
function IB() {
  return ql(Nc.getInstance().active());
}
function Kl(e, n) {
  return e.setValue(Ll, n);
}
function PB(e) {
  return e.deleteValue(Ll);
}
function OB(e, n) {
  return Kl(e, new ta(n));
}
function DO(e) {
  var n;
  return (n = ql(e)) === null || n === void 0 ? void 0 : n.spanContext();
}
var AB = /^([0-9a-f]{32})$/i, RB = /^[0-9a-f]{16}$/i;
function FO(e) {
  return AB.test(e) && e !== Ul;
}
function UO(e) {
  return RB.test(e) && e !== Fl;
}
function Gl(e) {
  return FO(e.traceId) && UO(e.spanId);
}
function EB(e) {
  return new ta(e);
}
var xd = Nc.getInstance(), LO = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.startSpan = function(n, r, o) {
      o === void 0 && (o = xd.active());
      var i = !!(r != null && r.root);
      if (i)
        return new ta();
      var t = o && DO(o);
      return wB(t) && Gl(t) ? new ta(t) : new ta();
    }, e.prototype.startActiveSpan = function(n, r, o, i) {
      var t, a, u;
      if (!(arguments.length < 2)) {
        arguments.length === 2 ? u = r : arguments.length === 3 ? (t = r, u = o) : (t = r, a = o, u = i);
        var c = a ?? xd.active(), s = this.startSpan(n, t, c), p = Kl(c, s);
        return xd.with(p, u, void 0, s);
      }
    }, e;
  }()
);
function wB(e) {
  return typeof e == "object" && typeof e.spanId == "string" && typeof e.traceId == "string" && typeof e.traceFlags == "number";
}
var SB = new LO(), qO = (
  /** @class */
  function() {
    function e(n, r, o, i) {
      this._provider = n, this.name = r, this.version = o, this.options = i;
    }
    return e.prototype.startSpan = function(n, r, o) {
      return this._getTracer().startSpan(n, r, o);
    }, e.prototype.startActiveSpan = function(n, r, o, i) {
      var t = this._getTracer();
      return Reflect.apply(t.startActiveSpan, t, arguments);
    }, e.prototype._getTracer = function() {
      if (this._delegate)
        return this._delegate;
      var n = this._provider.getDelegateTracer(this.name, this.version, this.options);
      return n ? (this._delegate = n, this._delegate) : SB;
    }, e;
  }()
), vB = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.getTracer = function(n, r, o) {
      return new LO();
    }, e;
  }()
), CB = new vB(), zp = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.getTracer = function(n, r, o) {
      var i;
      return (i = this.getDelegateTracer(n, r, o)) !== null && i !== void 0 ? i : new qO(this, n, r, o);
    }, e.prototype.getDelegate = function() {
      var n;
      return (n = this._delegate) !== null && n !== void 0 ? n : CB;
    }, e.prototype.setDelegate = function(n) {
      this._delegate = n;
    }, e.prototype.getDelegateTracer = function(n, r, o) {
      var i;
      return (i = this._delegate) === null || i === void 0 ? void 0 : i.getTracer(n, r, o);
    }, e;
  }()
), Yp;
(function(e) {
  e[e.NOT_RECORD = 0] = "NOT_RECORD", e[e.RECORD = 1] = "RECORD", e[e.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
})(Yp || (Yp = {}));
var Jp;
(function(e) {
  e[e.INTERNAL = 0] = "INTERNAL", e[e.SERVER = 1] = "SERVER", e[e.CLIENT = 2] = "CLIENT", e[e.PRODUCER = 3] = "PRODUCER", e[e.CONSUMER = 4] = "CONSUMER";
})(Jp || (Jp = {}));
var Qp;
(function(e) {
  e[e.UNSET = 0] = "UNSET", e[e.OK = 1] = "OK", e[e.ERROR = 2] = "ERROR";
})(Qp || (Qp = {}));
var Zp = "[_0-9a-z-*/]", MB = "[a-z]" + Zp + "{0,255}", xB = "[a-z0-9]" + Zp + "{0,240}@[a-z]" + Zp + "{0,13}", $B = new RegExp("^(?:" + MB + "|" + xB + ")$"), NB = /^[ -~]{0,255}[!-~]$/, BB = /,|=/;
function jB(e) {
  return $B.test(e);
}
function DB(e) {
  return NB.test(e) && !BB.test(e);
}
var Nb = 32, FB = 512, Bb = ",", jb = "=", UB = (
  /** @class */
  function() {
    function e(n) {
      this._internalState = /* @__PURE__ */ new Map(), n && this._parse(n);
    }
    return e.prototype.set = function(n, r) {
      var o = this._clone();
      return o._internalState.has(n) && o._internalState.delete(n), o._internalState.set(n, r), o;
    }, e.prototype.unset = function(n) {
      var r = this._clone();
      return r._internalState.delete(n), r;
    }, e.prototype.get = function(n) {
      return this._internalState.get(n);
    }, e.prototype.serialize = function() {
      var n = this;
      return this._keys().reduce(function(r, o) {
        return r.push(o + jb + n.get(o)), r;
      }, []).join(Bb);
    }, e.prototype._parse = function(n) {
      n.length > FB || (this._internalState = n.split(Bb).reverse().reduce(function(r, o) {
        var i = o.trim(), t = i.indexOf(jb);
        if (t !== -1) {
          var a = i.slice(0, t), u = i.slice(t + 1, o.length);
          jB(a) && DB(u) && r.set(a, u);
        }
        return r;
      }, /* @__PURE__ */ new Map()), this._internalState.size > Nb && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, Nb))));
    }, e.prototype._keys = function() {
      return Array.from(this._internalState.keys()).reverse();
    }, e.prototype._clone = function() {
      var n = new e();
      return n._internalState = new Map(this._internalState), n;
    }, e;
  }()
);
function LB(e) {
  return new UB(e);
}
var KO = Nc.getInstance(), GO = rt.instance(), qB = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.getMeter = function(n, r, o) {
      return $O;
    }, e;
  }()
), KB = new qB(), $d = "metrics", GB = (
  /** @class */
  function() {
    function e() {
    }
    return e.getInstance = function() {
      return this._instance || (this._instance = new e()), this._instance;
    }, e.prototype.setGlobalMeterProvider = function(n) {
      return Ua($d, n, rt.instance());
    }, e.prototype.getMeterProvider = function() {
      return Ki($d) || KB;
    }, e.prototype.getMeter = function(n, r, o) {
      return this.getMeterProvider().getMeter(n, r, o);
    }, e.prototype.disable = function() {
      La($d, rt.instance());
    }, e;
  }()
), HO = GB.getInstance(), HB = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.inject = function(n, r) {
    }, e.prototype.extract = function(n, r) {
      return n;
    }, e.prototype.fields = function() {
      return [];
    }, e;
  }()
), Hl = jl("OpenTelemetry Baggage Key");
function VO(e) {
  return e.getValue(Hl) || void 0;
}
function VB() {
  return VO(Nc.getInstance().active());
}
function WB(e, n) {
  return e.setValue(Hl, n);
}
function kB(e) {
  return e.deleteValue(Hl);
}
var Nd = "propagation", XB = new HB(), zB = (
  /** @class */
  function() {
    function e() {
      this.createBaggage = zN, this.getBaggage = VO, this.getActiveBaggage = VB, this.setBaggage = WB, this.deleteBaggage = kB;
    }
    return e.getInstance = function() {
      return this._instance || (this._instance = new e()), this._instance;
    }, e.prototype.setGlobalPropagator = function(n) {
      return Ua(Nd, n, rt.instance());
    }, e.prototype.inject = function(n, r, o) {
      return o === void 0 && (o = BO), this._getGlobalPropagator().inject(n, r, o);
    }, e.prototype.extract = function(n, r, o) {
      return o === void 0 && (o = NO), this._getGlobalPropagator().extract(n, r, o);
    }, e.prototype.fields = function() {
      return this._getGlobalPropagator().fields();
    }, e.prototype.disable = function() {
      La(Nd, rt.instance());
    }, e.prototype._getGlobalPropagator = function() {
      return Ki(Nd) || XB;
    }, e;
  }()
), WO = zB.getInstance(), Bd = "trace", YB = (
  /** @class */
  function() {
    function e() {
      this._proxyTracerProvider = new zp(), this.wrapSpanContext = EB, this.isSpanContextValid = Gl, this.deleteSpan = PB, this.getSpan = ql, this.getActiveSpan = IB, this.getSpanContext = DO, this.setSpan = Kl, this.setSpanContext = OB;
    }
    return e.getInstance = function() {
      return this._instance || (this._instance = new e()), this._instance;
    }, e.prototype.setGlobalTracerProvider = function(n) {
      var r = Ua(Bd, this._proxyTracerProvider, rt.instance());
      return r && this._proxyTracerProvider.setDelegate(n), r;
    }, e.prototype.getTracerProvider = function() {
      return Ki(Bd) || this._proxyTracerProvider;
    }, e.prototype.getTracer = function(n, r) {
      return this.getTracerProvider().getTracer(n, r);
    }, e.prototype.disable = function() {
      La(Bd, rt.instance()), this._proxyTracerProvider = new zp();
    }, e;
  }()
), kO = YB.getInstance();
const JB = {
  context: KO,
  diag: GO,
  metrics: HO,
  propagation: WO,
  trace: kO
}, QB = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DiagConsoleLogger: QN,
  get DiagLogLevel() {
    return Pn;
  },
  INVALID_SPANID: Fl,
  INVALID_SPAN_CONTEXT: jO,
  INVALID_TRACEID: Ul,
  ProxyTracer: qO,
  ProxyTracerProvider: zp,
  ROOT_CONTEXT: xO,
  get SamplingDecision() {
    return Yp;
  },
  get SpanKind() {
    return Jp;
  },
  get SpanStatusCode() {
    return Qp;
  },
  get TraceFlags() {
    return Vs;
  },
  get ValueType() {
    return Xp;
  },
  baggageEntryMetadataFromString: YN,
  context: KO,
  createContextKey: jl,
  createNoopMeter: yB,
  createTraceState: LB,
  default: JB,
  defaultTextMapGetter: NO,
  defaultTextMapSetter: BO,
  diag: GO,
  isSpanContextValid: Gl,
  isValidSpanId: UO,
  isValidTraceId: FO,
  metrics: HO,
  propagation: WO,
  trace: kO
}, Symbol.toStringTag, { value: "Module" })), Db = /* @__PURE__ */ Yh(QB);
var jd = { exports: {} }, Fb;
function ZB() {
  return Fb || (Fb = 1, (() => {
    var e = { 491: (i, t, a) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.ContextAPI = void 0;
      const u = a(223), c = a(172), s = a(930), p = "context", d = new u.NoopContextManager();
      class f {
        constructor() {
        }
        static getInstance() {
          return this._instance || (this._instance = new f()), this._instance;
        }
        setGlobalContextManager(h) {
          return (0, c.registerGlobal)(p, h, s.DiagAPI.instance());
        }
        active() {
          return this._getContextManager().active();
        }
        with(h, I, _, ...A) {
          return this._getContextManager().with(h, I, _, ...A);
        }
        bind(h, I) {
          return this._getContextManager().bind(h, I);
        }
        _getContextManager() {
          return (0, c.getGlobal)(p) || d;
        }
        disable() {
          this._getContextManager().disable(), (0, c.unregisterGlobal)(p, s.DiagAPI.instance());
        }
      }
      t.ContextAPI = f;
    }, 930: (i, t, a) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.DiagAPI = void 0;
      const u = a(56), c = a(912), s = a(957), p = a(172), d = "diag";
      class f {
        constructor() {
          function h(A) {
            return function(...v) {
              const j = (0, p.getGlobal)("diag");
              if (j)
                return j[A](...v);
            };
          }
          const I = this, _ = (A, v = { logLevel: s.DiagLogLevel.INFO }) => {
            var j, w, l;
            if (A === I) {
              const P = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
              return I.error((j = P.stack) !== null && j !== void 0 ? j : P.message), !1;
            }
            typeof v == "number" && (v = { logLevel: v });
            const R = (0, p.getGlobal)("diag"), y = (0, c.createLogLevelDiagLogger)((w = v.logLevel) !== null && w !== void 0 ? w : s.DiagLogLevel.INFO, A);
            if (R && !v.suppressOverrideMessage) {
              const P = (l = new Error().stack) !== null && l !== void 0 ? l : "<failed to generate stacktrace>";
              R.warn(`Current logger will be overwritten from ${P}`), y.warn(`Current logger will overwrite one already registered from ${P}`);
            }
            return (0, p.registerGlobal)("diag", y, I, !0);
          };
          I.setLogger = _, I.disable = () => {
            (0, p.unregisterGlobal)(d, I);
          }, I.createComponentLogger = (A) => new u.DiagComponentLogger(A), I.verbose = h("verbose"), I.debug = h("debug"), I.info = h("info"), I.warn = h("warn"), I.error = h("error");
        }
        static instance() {
          return this._instance || (this._instance = new f()), this._instance;
        }
      }
      t.DiagAPI = f;
    }, 653: (i, t, a) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.MetricsAPI = void 0;
      const u = a(660), c = a(172), s = a(930), p = "metrics";
      class d {
        constructor() {
        }
        static getInstance() {
          return this._instance || (this._instance = new d()), this._instance;
        }
        setGlobalMeterProvider(T) {
          return (0, c.registerGlobal)(p, T, s.DiagAPI.instance());
        }
        getMeterProvider() {
          return (0, c.getGlobal)(p) || u.NOOP_METER_PROVIDER;
        }
        getMeter(T, h, I) {
          return this.getMeterProvider().getMeter(T, h, I);
        }
        disable() {
          (0, c.unregisterGlobal)(p, s.DiagAPI.instance());
        }
      }
      t.MetricsAPI = d;
    }, 181: (i, t, a) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.PropagationAPI = void 0;
      const u = a(172), c = a(874), s = a(194), p = a(277), d = a(369), f = a(930), T = "propagation", h = new c.NoopTextMapPropagator();
      class I {
        constructor() {
          this.createBaggage = d.createBaggage, this.getBaggage = p.getBaggage, this.getActiveBaggage = p.getActiveBaggage, this.setBaggage = p.setBaggage, this.deleteBaggage = p.deleteBaggage;
        }
        static getInstance() {
          return this._instance || (this._instance = new I()), this._instance;
        }
        setGlobalPropagator(A) {
          return (0, u.registerGlobal)(T, A, f.DiagAPI.instance());
        }
        inject(A, v, j = s.defaultTextMapSetter) {
          return this._getGlobalPropagator().inject(A, v, j);
        }
        extract(A, v, j = s.defaultTextMapGetter) {
          return this._getGlobalPropagator().extract(A, v, j);
        }
        fields() {
          return this._getGlobalPropagator().fields();
        }
        disable() {
          (0, u.unregisterGlobal)(T, f.DiagAPI.instance());
        }
        _getGlobalPropagator() {
          return (0, u.getGlobal)(T) || h;
        }
      }
      t.PropagationAPI = I;
    }, 997: (i, t, a) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.TraceAPI = void 0;
      const u = a(172), c = a(846), s = a(139), p = a(607), d = a(930), f = "trace";
      class T {
        constructor() {
          this._proxyTracerProvider = new c.ProxyTracerProvider(), this.wrapSpanContext = s.wrapSpanContext, this.isSpanContextValid = s.isSpanContextValid, this.deleteSpan = p.deleteSpan, this.getSpan = p.getSpan, this.getActiveSpan = p.getActiveSpan, this.getSpanContext = p.getSpanContext, this.setSpan = p.setSpan, this.setSpanContext = p.setSpanContext;
        }
        static getInstance() {
          return this._instance || (this._instance = new T()), this._instance;
        }
        setGlobalTracerProvider(I) {
          const _ = (0, u.registerGlobal)(f, this._proxyTracerProvider, d.DiagAPI.instance());
          return _ && this._proxyTracerProvider.setDelegate(I), _;
        }
        getTracerProvider() {
          return (0, u.getGlobal)(f) || this._proxyTracerProvider;
        }
        getTracer(I, _) {
          return this.getTracerProvider().getTracer(I, _);
        }
        disable() {
          (0, u.unregisterGlobal)(f, d.DiagAPI.instance()), this._proxyTracerProvider = new c.ProxyTracerProvider();
        }
      }
      t.TraceAPI = T;
    }, 277: (i, t, a) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.deleteBaggage = t.setBaggage = t.getActiveBaggage = t.getBaggage = void 0;
      const u = a(491), s = (0, a(780).createContextKey)("OpenTelemetry Baggage Key");
      function p(h) {
        return h.getValue(s) || void 0;
      }
      t.getBaggage = p;
      function d() {
        return p(u.ContextAPI.getInstance().active());
      }
      t.getActiveBaggage = d;
      function f(h, I) {
        return h.setValue(s, I);
      }
      t.setBaggage = f;
      function T(h) {
        return h.deleteValue(s);
      }
      t.deleteBaggage = T;
    }, 993: (i, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.BaggageImpl = void 0;
      class a {
        constructor(c) {
          this._entries = c ? new Map(c) : /* @__PURE__ */ new Map();
        }
        getEntry(c) {
          const s = this._entries.get(c);
          if (s)
            return Object.assign({}, s);
        }
        getAllEntries() {
          return Array.from(this._entries.entries()).map(([c, s]) => [c, s]);
        }
        setEntry(c, s) {
          const p = new a(this._entries);
          return p._entries.set(c, s), p;
        }
        removeEntry(c) {
          const s = new a(this._entries);
          return s._entries.delete(c), s;
        }
        removeEntries(...c) {
          const s = new a(this._entries);
          for (const p of c)
            s._entries.delete(p);
          return s;
        }
        clear() {
          return new a();
        }
      }
      t.BaggageImpl = a;
    }, 830: (i, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.baggageEntryMetadataSymbol = void 0, t.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
    }, 369: (i, t, a) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.baggageEntryMetadataFromString = t.createBaggage = void 0;
      const u = a(930), c = a(993), s = a(830), p = u.DiagAPI.instance();
      function d(T = {}) {
        return new c.BaggageImpl(new Map(Object.entries(T)));
      }
      t.createBaggage = d;
      function f(T) {
        return typeof T != "string" && (p.error(`Cannot create baggage metadata from unknown type: ${typeof T}`), T = ""), { __TYPE__: s.baggageEntryMetadataSymbol, toString() {
          return T;
        } };
      }
      t.baggageEntryMetadataFromString = f;
    }, 67: (i, t, a) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.context = void 0;
      const u = a(491);
      t.context = u.ContextAPI.getInstance();
    }, 223: (i, t, a) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.NoopContextManager = void 0;
      const u = a(780);
      class c {
        active() {
          return u.ROOT_CONTEXT;
        }
        with(p, d, f, ...T) {
          return d.call(f, ...T);
        }
        bind(p, d) {
          return d;
        }
        enable() {
          return this;
        }
        disable() {
          return this;
        }
      }
      t.NoopContextManager = c;
    }, 780: (i, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.ROOT_CONTEXT = t.createContextKey = void 0;
      function a(c) {
        return Symbol.for(c);
      }
      t.createContextKey = a;
      class u {
        constructor(s) {
          const p = this;
          p._currentContext = s ? new Map(s) : /* @__PURE__ */ new Map(), p.getValue = (d) => p._currentContext.get(d), p.setValue = (d, f) => {
            const T = new u(p._currentContext);
            return T._currentContext.set(d, f), T;
          }, p.deleteValue = (d) => {
            const f = new u(p._currentContext);
            return f._currentContext.delete(d), f;
          };
        }
      }
      t.ROOT_CONTEXT = new u();
    }, 506: (i, t, a) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.diag = void 0;
      const u = a(930);
      t.diag = u.DiagAPI.instance();
    }, 56: (i, t, a) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.DiagComponentLogger = void 0;
      const u = a(172);
      class c {
        constructor(d) {
          this._namespace = d.namespace || "DiagComponentLogger";
        }
        debug(...d) {
          return s("debug", this._namespace, d);
        }
        error(...d) {
          return s("error", this._namespace, d);
        }
        info(...d) {
          return s("info", this._namespace, d);
        }
        warn(...d) {
          return s("warn", this._namespace, d);
        }
        verbose(...d) {
          return s("verbose", this._namespace, d);
        }
      }
      t.DiagComponentLogger = c;
      function s(p, d, f) {
        const T = (0, u.getGlobal)("diag");
        if (T)
          return f.unshift(d), T[p](...f);
      }
    }, 972: (i, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.DiagConsoleLogger = void 0;
      const a = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
      class u {
        constructor() {
          function s(p) {
            return function(...d) {
              if (console) {
                let f = console[p];
                if (typeof f != "function" && (f = console.log), typeof f == "function")
                  return f.apply(console, d);
              }
            };
          }
          for (let p = 0; p < a.length; p++)
            this[a[p].n] = s(a[p].c);
        }
      }
      t.DiagConsoleLogger = u;
    }, 912: (i, t, a) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.createLogLevelDiagLogger = void 0;
      const u = a(957);
      function c(s, p) {
        s < u.DiagLogLevel.NONE ? s = u.DiagLogLevel.NONE : s > u.DiagLogLevel.ALL && (s = u.DiagLogLevel.ALL), p = p || {};
        function d(f, T) {
          const h = p[f];
          return typeof h == "function" && s >= T ? h.bind(p) : function() {
          };
        }
        return { error: d("error", u.DiagLogLevel.ERROR), warn: d("warn", u.DiagLogLevel.WARN), info: d("info", u.DiagLogLevel.INFO), debug: d("debug", u.DiagLogLevel.DEBUG), verbose: d("verbose", u.DiagLogLevel.VERBOSE) };
      }
      t.createLogLevelDiagLogger = c;
    }, 957: (i, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.DiagLogLevel = void 0, function(a) {
        a[a.NONE = 0] = "NONE", a[a.ERROR = 30] = "ERROR", a[a.WARN = 50] = "WARN", a[a.INFO = 60] = "INFO", a[a.DEBUG = 70] = "DEBUG", a[a.VERBOSE = 80] = "VERBOSE", a[a.ALL = 9999] = "ALL";
      }(t.DiagLogLevel || (t.DiagLogLevel = {}));
    }, 172: (i, t, a) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.unregisterGlobal = t.getGlobal = t.registerGlobal = void 0;
      const u = a(200), c = a(521), s = a(130), p = c.VERSION.split(".")[0], d = Symbol.for(`opentelemetry.js.api.${p}`), f = u._globalThis;
      function T(_, A, v, j = !1) {
        var w;
        const l = f[d] = (w = f[d]) !== null && w !== void 0 ? w : { version: c.VERSION };
        if (!j && l[_]) {
          const R = new Error(`@opentelemetry/api: Attempted duplicate registration of API: ${_}`);
          return v.error(R.stack || R.message), !1;
        }
        if (l.version !== c.VERSION) {
          const R = new Error(`@opentelemetry/api: Registration of version v${l.version} for ${_} does not match previously registered API v${c.VERSION}`);
          return v.error(R.stack || R.message), !1;
        }
        return l[_] = A, v.debug(`@opentelemetry/api: Registered a global for ${_} v${c.VERSION}.`), !0;
      }
      t.registerGlobal = T;
      function h(_) {
        var A, v;
        const j = (A = f[d]) === null || A === void 0 ? void 0 : A.version;
        if (!(!j || !(0, s.isCompatible)(j)))
          return (v = f[d]) === null || v === void 0 ? void 0 : v[_];
      }
      t.getGlobal = h;
      function I(_, A) {
        A.debug(`@opentelemetry/api: Unregistering a global for ${_} v${c.VERSION}.`);
        const v = f[d];
        v && delete v[_];
      }
      t.unregisterGlobal = I;
    }, 130: (i, t, a) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.isCompatible = t._makeCompatibilityCheck = void 0;
      const u = a(521), c = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
      function s(p) {
        const d = /* @__PURE__ */ new Set([p]), f = /* @__PURE__ */ new Set(), T = p.match(c);
        if (!T)
          return () => !1;
        const h = { major: +T[1], minor: +T[2], patch: +T[3], prerelease: T[4] };
        if (h.prerelease != null)
          return function(v) {
            return v === p;
          };
        function I(A) {
          return f.add(A), !1;
        }
        function _(A) {
          return d.add(A), !0;
        }
        return function(v) {
          if (d.has(v))
            return !0;
          if (f.has(v))
            return !1;
          const j = v.match(c);
          if (!j)
            return I(v);
          const w = { major: +j[1], minor: +j[2], patch: +j[3], prerelease: j[4] };
          return w.prerelease != null || h.major !== w.major ? I(v) : h.major === 0 ? h.minor === w.minor && h.patch <= w.patch ? _(v) : I(v) : h.minor <= w.minor ? _(v) : I(v);
        };
      }
      t._makeCompatibilityCheck = s, t.isCompatible = s(u.VERSION);
    }, 886: (i, t, a) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.metrics = void 0;
      const u = a(653);
      t.metrics = u.MetricsAPI.getInstance();
    }, 901: (i, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.ValueType = void 0, function(a) {
        a[a.INT = 0] = "INT", a[a.DOUBLE = 1] = "DOUBLE";
      }(t.ValueType || (t.ValueType = {}));
    }, 102: (i, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.createNoopMeter = t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t.NOOP_OBSERVABLE_GAUGE_METRIC = t.NOOP_OBSERVABLE_COUNTER_METRIC = t.NOOP_UP_DOWN_COUNTER_METRIC = t.NOOP_HISTOGRAM_METRIC = t.NOOP_COUNTER_METRIC = t.NOOP_METER = t.NoopObservableUpDownCounterMetric = t.NoopObservableGaugeMetric = t.NoopObservableCounterMetric = t.NoopObservableMetric = t.NoopHistogramMetric = t.NoopUpDownCounterMetric = t.NoopCounterMetric = t.NoopMetric = t.NoopMeter = void 0;
      class a {
        constructor() {
        }
        createHistogram(A, v) {
          return t.NOOP_HISTOGRAM_METRIC;
        }
        createCounter(A, v) {
          return t.NOOP_COUNTER_METRIC;
        }
        createUpDownCounter(A, v) {
          return t.NOOP_UP_DOWN_COUNTER_METRIC;
        }
        createObservableGauge(A, v) {
          return t.NOOP_OBSERVABLE_GAUGE_METRIC;
        }
        createObservableCounter(A, v) {
          return t.NOOP_OBSERVABLE_COUNTER_METRIC;
        }
        createObservableUpDownCounter(A, v) {
          return t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
        }
        addBatchObservableCallback(A, v) {
        }
        removeBatchObservableCallback(A) {
        }
      }
      t.NoopMeter = a;
      class u {
      }
      t.NoopMetric = u;
      class c extends u {
        add(A, v) {
        }
      }
      t.NoopCounterMetric = c;
      class s extends u {
        add(A, v) {
        }
      }
      t.NoopUpDownCounterMetric = s;
      class p extends u {
        record(A, v) {
        }
      }
      t.NoopHistogramMetric = p;
      class d {
        addCallback(A) {
        }
        removeCallback(A) {
        }
      }
      t.NoopObservableMetric = d;
      class f extends d {
      }
      t.NoopObservableCounterMetric = f;
      class T extends d {
      }
      t.NoopObservableGaugeMetric = T;
      class h extends d {
      }
      t.NoopObservableUpDownCounterMetric = h, t.NOOP_METER = new a(), t.NOOP_COUNTER_METRIC = new c(), t.NOOP_HISTOGRAM_METRIC = new p(), t.NOOP_UP_DOWN_COUNTER_METRIC = new s(), t.NOOP_OBSERVABLE_COUNTER_METRIC = new f(), t.NOOP_OBSERVABLE_GAUGE_METRIC = new T(), t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new h();
      function I() {
        return t.NOOP_METER;
      }
      t.createNoopMeter = I;
    }, 660: (i, t, a) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.NOOP_METER_PROVIDER = t.NoopMeterProvider = void 0;
      const u = a(102);
      class c {
        getMeter(p, d, f) {
          return u.NOOP_METER;
        }
      }
      t.NoopMeterProvider = c, t.NOOP_METER_PROVIDER = new c();
    }, 200: function(i, t, a) {
      var u = this && this.__createBinding || (Object.create ? function(s, p, d, f) {
        f === void 0 && (f = d), Object.defineProperty(s, f, { enumerable: !0, get: function() {
          return p[d];
        } });
      } : function(s, p, d, f) {
        f === void 0 && (f = d), s[f] = p[d];
      }), c = this && this.__exportStar || function(s, p) {
        for (var d in s) d !== "default" && !Object.prototype.hasOwnProperty.call(p, d) && u(p, s, d);
      };
      Object.defineProperty(t, "__esModule", { value: !0 }), c(a(46), t);
    }, 651: (i, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t._globalThis = void 0, t._globalThis = typeof globalThis == "object" ? globalThis : oA;
    }, 46: function(i, t, a) {
      var u = this && this.__createBinding || (Object.create ? function(s, p, d, f) {
        f === void 0 && (f = d), Object.defineProperty(s, f, { enumerable: !0, get: function() {
          return p[d];
        } });
      } : function(s, p, d, f) {
        f === void 0 && (f = d), s[f] = p[d];
      }), c = this && this.__exportStar || function(s, p) {
        for (var d in s) d !== "default" && !Object.prototype.hasOwnProperty.call(p, d) && u(p, s, d);
      };
      Object.defineProperty(t, "__esModule", { value: !0 }), c(a(651), t);
    }, 939: (i, t, a) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.propagation = void 0;
      const u = a(181);
      t.propagation = u.PropagationAPI.getInstance();
    }, 874: (i, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.NoopTextMapPropagator = void 0;
      class a {
        inject(c, s) {
        }
        extract(c, s) {
          return c;
        }
        fields() {
          return [];
        }
      }
      t.NoopTextMapPropagator = a;
    }, 194: (i, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.defaultTextMapSetter = t.defaultTextMapGetter = void 0, t.defaultTextMapGetter = { get(a, u) {
        if (a != null)
          return a[u];
      }, keys(a) {
        return a == null ? [] : Object.keys(a);
      } }, t.defaultTextMapSetter = { set(a, u, c) {
        a != null && (a[u] = c);
      } };
    }, 845: (i, t, a) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.trace = void 0;
      const u = a(997);
      t.trace = u.TraceAPI.getInstance();
    }, 403: (i, t, a) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.NonRecordingSpan = void 0;
      const u = a(476);
      class c {
        constructor(p = u.INVALID_SPAN_CONTEXT) {
          this._spanContext = p;
        }
        spanContext() {
          return this._spanContext;
        }
        setAttribute(p, d) {
          return this;
        }
        setAttributes(p) {
          return this;
        }
        addEvent(p, d) {
          return this;
        }
        setStatus(p) {
          return this;
        }
        updateName(p) {
          return this;
        }
        end(p) {
        }
        isRecording() {
          return !1;
        }
        recordException(p, d) {
        }
      }
      t.NonRecordingSpan = c;
    }, 614: (i, t, a) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.NoopTracer = void 0;
      const u = a(491), c = a(607), s = a(403), p = a(139), d = u.ContextAPI.getInstance();
      class f {
        startSpan(I, _, A = d.active()) {
          if (!!(_ != null && _.root))
            return new s.NonRecordingSpan();
          const j = A && (0, c.getSpanContext)(A);
          return T(j) && (0, p.isSpanContextValid)(j) ? new s.NonRecordingSpan(j) : new s.NonRecordingSpan();
        }
        startActiveSpan(I, _, A, v) {
          let j, w, l;
          if (arguments.length < 2)
            return;
          arguments.length === 2 ? l = _ : arguments.length === 3 ? (j = _, l = A) : (j = _, w = A, l = v);
          const R = w ?? d.active(), y = this.startSpan(I, j, R), P = (0, c.setSpan)(R, y);
          return d.with(P, l, void 0, y);
        }
      }
      t.NoopTracer = f;
      function T(h) {
        return typeof h == "object" && typeof h.spanId == "string" && typeof h.traceId == "string" && typeof h.traceFlags == "number";
      }
    }, 124: (i, t, a) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.NoopTracerProvider = void 0;
      const u = a(614);
      class c {
        getTracer(p, d, f) {
          return new u.NoopTracer();
        }
      }
      t.NoopTracerProvider = c;
    }, 125: (i, t, a) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.ProxyTracer = void 0;
      const u = a(614), c = new u.NoopTracer();
      class s {
        constructor(d, f, T, h) {
          this._provider = d, this.name = f, this.version = T, this.options = h;
        }
        startSpan(d, f, T) {
          return this._getTracer().startSpan(d, f, T);
        }
        startActiveSpan(d, f, T, h) {
          const I = this._getTracer();
          return Reflect.apply(I.startActiveSpan, I, arguments);
        }
        _getTracer() {
          if (this._delegate)
            return this._delegate;
          const d = this._provider.getDelegateTracer(this.name, this.version, this.options);
          return d ? (this._delegate = d, this._delegate) : c;
        }
      }
      t.ProxyTracer = s;
    }, 846: (i, t, a) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.ProxyTracerProvider = void 0;
      const u = a(125), c = a(124), s = new c.NoopTracerProvider();
      class p {
        getTracer(f, T, h) {
          var I;
          return (I = this.getDelegateTracer(f, T, h)) !== null && I !== void 0 ? I : new u.ProxyTracer(this, f, T, h);
        }
        getDelegate() {
          var f;
          return (f = this._delegate) !== null && f !== void 0 ? f : s;
        }
        setDelegate(f) {
          this._delegate = f;
        }
        getDelegateTracer(f, T, h) {
          var I;
          return (I = this._delegate) === null || I === void 0 ? void 0 : I.getTracer(f, T, h);
        }
      }
      t.ProxyTracerProvider = p;
    }, 996: (i, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.SamplingDecision = void 0, function(a) {
        a[a.NOT_RECORD = 0] = "NOT_RECORD", a[a.RECORD = 1] = "RECORD", a[a.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
      }(t.SamplingDecision || (t.SamplingDecision = {}));
    }, 607: (i, t, a) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.getSpanContext = t.setSpanContext = t.deleteSpan = t.setSpan = t.getActiveSpan = t.getSpan = void 0;
      const u = a(780), c = a(403), s = a(491), p = (0, u.createContextKey)("OpenTelemetry Context Key SPAN");
      function d(A) {
        return A.getValue(p) || void 0;
      }
      t.getSpan = d;
      function f() {
        return d(s.ContextAPI.getInstance().active());
      }
      t.getActiveSpan = f;
      function T(A, v) {
        return A.setValue(p, v);
      }
      t.setSpan = T;
      function h(A) {
        return A.deleteValue(p);
      }
      t.deleteSpan = h;
      function I(A, v) {
        return T(A, new c.NonRecordingSpan(v));
      }
      t.setSpanContext = I;
      function _(A) {
        var v;
        return (v = d(A)) === null || v === void 0 ? void 0 : v.spanContext();
      }
      t.getSpanContext = _;
    }, 325: (i, t, a) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.TraceStateImpl = void 0;
      const u = a(564), c = 32, s = 512, p = ",", d = "=";
      class f {
        constructor(h) {
          this._internalState = /* @__PURE__ */ new Map(), h && this._parse(h);
        }
        set(h, I) {
          const _ = this._clone();
          return _._internalState.has(h) && _._internalState.delete(h), _._internalState.set(h, I), _;
        }
        unset(h) {
          const I = this._clone();
          return I._internalState.delete(h), I;
        }
        get(h) {
          return this._internalState.get(h);
        }
        serialize() {
          return this._keys().reduce((h, I) => (h.push(I + d + this.get(I)), h), []).join(p);
        }
        _parse(h) {
          h.length > s || (this._internalState = h.split(p).reverse().reduce((I, _) => {
            const A = _.trim(), v = A.indexOf(d);
            if (v !== -1) {
              const j = A.slice(0, v), w = A.slice(v + 1, _.length);
              (0, u.validateKey)(j) && (0, u.validateValue)(w) && I.set(j, w);
            }
            return I;
          }, /* @__PURE__ */ new Map()), this._internalState.size > c && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, c))));
        }
        _keys() {
          return Array.from(this._internalState.keys()).reverse();
        }
        _clone() {
          const h = new f();
          return h._internalState = new Map(this._internalState), h;
        }
      }
      t.TraceStateImpl = f;
    }, 564: (i, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.validateValue = t.validateKey = void 0;
      const a = "[_0-9a-z-*/]", u = `[a-z]${a}{0,255}`, c = `[a-z0-9]${a}{0,240}@[a-z]${a}{0,13}`, s = new RegExp(`^(?:${u}|${c})$`), p = /^[ -~]{0,255}[!-~]$/, d = /,|=/;
      function f(h) {
        return s.test(h);
      }
      t.validateKey = f;
      function T(h) {
        return p.test(h) && !d.test(h);
      }
      t.validateValue = T;
    }, 98: (i, t, a) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.createTraceState = void 0;
      const u = a(325);
      function c(s) {
        return new u.TraceStateImpl(s);
      }
      t.createTraceState = c;
    }, 476: (i, t, a) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.INVALID_SPAN_CONTEXT = t.INVALID_TRACEID = t.INVALID_SPANID = void 0;
      const u = a(475);
      t.INVALID_SPANID = "0000000000000000", t.INVALID_TRACEID = "00000000000000000000000000000000", t.INVALID_SPAN_CONTEXT = { traceId: t.INVALID_TRACEID, spanId: t.INVALID_SPANID, traceFlags: u.TraceFlags.NONE };
    }, 357: (i, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.SpanKind = void 0, function(a) {
        a[a.INTERNAL = 0] = "INTERNAL", a[a.SERVER = 1] = "SERVER", a[a.CLIENT = 2] = "CLIENT", a[a.PRODUCER = 3] = "PRODUCER", a[a.CONSUMER = 4] = "CONSUMER";
      }(t.SpanKind || (t.SpanKind = {}));
    }, 139: (i, t, a) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.wrapSpanContext = t.isSpanContextValid = t.isValidSpanId = t.isValidTraceId = void 0;
      const u = a(476), c = a(403), s = /^([0-9a-f]{32})$/i, p = /^[0-9a-f]{16}$/i;
      function d(I) {
        return s.test(I) && I !== u.INVALID_TRACEID;
      }
      t.isValidTraceId = d;
      function f(I) {
        return p.test(I) && I !== u.INVALID_SPANID;
      }
      t.isValidSpanId = f;
      function T(I) {
        return d(I.traceId) && f(I.spanId);
      }
      t.isSpanContextValid = T;
      function h(I) {
        return new c.NonRecordingSpan(I);
      }
      t.wrapSpanContext = h;
    }, 847: (i, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.SpanStatusCode = void 0, function(a) {
        a[a.UNSET = 0] = "UNSET", a[a.OK = 1] = "OK", a[a.ERROR = 2] = "ERROR";
      }(t.SpanStatusCode || (t.SpanStatusCode = {}));
    }, 475: (i, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.TraceFlags = void 0, function(a) {
        a[a.NONE = 0] = "NONE", a[a.SAMPLED = 1] = "SAMPLED";
      }(t.TraceFlags || (t.TraceFlags = {}));
    }, 521: (i, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.VERSION = void 0, t.VERSION = "1.6.0";
    } }, n = {};
    function r(i) {
      var t = n[i];
      if (t !== void 0)
        return t.exports;
      var a = n[i] = { exports: {} }, u = !0;
      try {
        e[i].call(a.exports, a, a.exports, r), u = !1;
      } finally {
        u && delete n[i];
      }
      return a.exports;
    }
    typeof r < "u" && (r.ab = __dirname + "/");
    var o = {};
    (() => {
      var i = o;
      Object.defineProperty(i, "__esModule", { value: !0 }), i.trace = i.propagation = i.metrics = i.diag = i.context = i.INVALID_SPAN_CONTEXT = i.INVALID_TRACEID = i.INVALID_SPANID = i.isValidSpanId = i.isValidTraceId = i.isSpanContextValid = i.createTraceState = i.TraceFlags = i.SpanStatusCode = i.SpanKind = i.SamplingDecision = i.ProxyTracerProvider = i.ProxyTracer = i.defaultTextMapSetter = i.defaultTextMapGetter = i.ValueType = i.createNoopMeter = i.DiagLogLevel = i.DiagConsoleLogger = i.ROOT_CONTEXT = i.createContextKey = i.baggageEntryMetadataFromString = void 0;
      var t = r(369);
      Object.defineProperty(i, "baggageEntryMetadataFromString", { enumerable: !0, get: function() {
        return t.baggageEntryMetadataFromString;
      } });
      var a = r(780);
      Object.defineProperty(i, "createContextKey", { enumerable: !0, get: function() {
        return a.createContextKey;
      } }), Object.defineProperty(i, "ROOT_CONTEXT", { enumerable: !0, get: function() {
        return a.ROOT_CONTEXT;
      } });
      var u = r(972);
      Object.defineProperty(i, "DiagConsoleLogger", { enumerable: !0, get: function() {
        return u.DiagConsoleLogger;
      } });
      var c = r(957);
      Object.defineProperty(i, "DiagLogLevel", { enumerable: !0, get: function() {
        return c.DiagLogLevel;
      } });
      var s = r(102);
      Object.defineProperty(i, "createNoopMeter", { enumerable: !0, get: function() {
        return s.createNoopMeter;
      } });
      var p = r(901);
      Object.defineProperty(i, "ValueType", { enumerable: !0, get: function() {
        return p.ValueType;
      } });
      var d = r(194);
      Object.defineProperty(i, "defaultTextMapGetter", { enumerable: !0, get: function() {
        return d.defaultTextMapGetter;
      } }), Object.defineProperty(i, "defaultTextMapSetter", { enumerable: !0, get: function() {
        return d.defaultTextMapSetter;
      } });
      var f = r(125);
      Object.defineProperty(i, "ProxyTracer", { enumerable: !0, get: function() {
        return f.ProxyTracer;
      } });
      var T = r(846);
      Object.defineProperty(i, "ProxyTracerProvider", { enumerable: !0, get: function() {
        return T.ProxyTracerProvider;
      } });
      var h = r(996);
      Object.defineProperty(i, "SamplingDecision", { enumerable: !0, get: function() {
        return h.SamplingDecision;
      } });
      var I = r(357);
      Object.defineProperty(i, "SpanKind", { enumerable: !0, get: function() {
        return I.SpanKind;
      } });
      var _ = r(847);
      Object.defineProperty(i, "SpanStatusCode", { enumerable: !0, get: function() {
        return _.SpanStatusCode;
      } });
      var A = r(475);
      Object.defineProperty(i, "TraceFlags", { enumerable: !0, get: function() {
        return A.TraceFlags;
      } });
      var v = r(98);
      Object.defineProperty(i, "createTraceState", { enumerable: !0, get: function() {
        return v.createTraceState;
      } });
      var j = r(139);
      Object.defineProperty(i, "isSpanContextValid", { enumerable: !0, get: function() {
        return j.isSpanContextValid;
      } }), Object.defineProperty(i, "isValidTraceId", { enumerable: !0, get: function() {
        return j.isValidTraceId;
      } }), Object.defineProperty(i, "isValidSpanId", { enumerable: !0, get: function() {
        return j.isValidSpanId;
      } });
      var w = r(476);
      Object.defineProperty(i, "INVALID_SPANID", { enumerable: !0, get: function() {
        return w.INVALID_SPANID;
      } }), Object.defineProperty(i, "INVALID_TRACEID", { enumerable: !0, get: function() {
        return w.INVALID_TRACEID;
      } }), Object.defineProperty(i, "INVALID_SPAN_CONTEXT", { enumerable: !0, get: function() {
        return w.INVALID_SPAN_CONTEXT;
      } });
      const l = r(67);
      Object.defineProperty(i, "context", { enumerable: !0, get: function() {
        return l.context;
      } });
      const R = r(506);
      Object.defineProperty(i, "diag", { enumerable: !0, get: function() {
        return R.diag;
      } });
      const y = r(886);
      Object.defineProperty(i, "metrics", { enumerable: !0, get: function() {
        return y.metrics;
      } });
      const P = r(939);
      Object.defineProperty(i, "propagation", { enumerable: !0, get: function() {
        return P.propagation;
      } });
      const E = r(845);
      Object.defineProperty(i, "trace", { enumerable: !0, get: function() {
        return E.trace;
      } }), i.default = { context: l.context, diag: R.diag, metrics: y.metrics, propagation: P.propagation, trace: E.trace };
    })(), jd.exports = o;
  })()), jd.exports;
}
var Ub;
function Vl() {
  return Ub || (Ub = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function n(l, R) {
      for (var y in R) Object.defineProperty(l, y, {
        enumerable: !0,
        get: R[y]
      });
    }
    n(e, {
      BubbledError: function() {
        return d;
      },
      SpanKind: function() {
        return s;
      },
      SpanStatusCode: function() {
        return c;
      },
      getTracer: function() {
        return w;
      },
      isBubbledError: function() {
        return f;
      }
    });
    const r = xc(), o = xN();
    let i;
    if (process.env.NEXT_RUNTIME === "edge")
      i = Db;
    else
      try {
        i = Db;
      } catch {
        i = ZB();
      }
    const { context: t, propagation: a, trace: u, SpanStatusCode: c, SpanKind: s, ROOT_CONTEXT: p } = i;
    class d extends Error {
      constructor(R, y) {
        super(), this.bubble = R, this.result = y;
      }
    }
    function f(l) {
      return typeof l != "object" || l === null ? !1 : l instanceof d;
    }
    const T = (l, R) => {
      f(R) && R.bubble ? l.setAttribute("next.bubble", !0) : (R && l.recordException(R), l.setStatus({
        code: c.ERROR,
        message: R == null ? void 0 : R.message
      })), l.end();
    }, h = /* @__PURE__ */ new Map(), I = i.createContextKey("next.rootSpanId");
    let _ = 0;
    const A = () => _++, v = {
      set(l, R, y) {
        l.push({
          key: R,
          value: y
        });
      }
    };
    class j {
      /**
      * Returns an instance to the trace with configured name.
      * Since wrap / trace can be defined in any place prior to actual trace subscriber initialization,
      * This should be lazily evaluated.
      */
      getTracerInstance() {
        return u.getTracer("next.js", "0.0.1");
      }
      getContext() {
        return t;
      }
      getTracePropagationData() {
        const R = t.active(), y = [];
        return a.inject(R, y, v), y;
      }
      getActiveScopeSpan() {
        return u.getSpan(t == null ? void 0 : t.active());
      }
      withPropagatedContext(R, y, P) {
        const E = t.active();
        if (u.getSpanContext(E))
          return y();
        const b = a.extract(E, R, P);
        return t.with(b, y);
      }
      trace(...R) {
        var y;
        const [P, E, b] = R, { fn: x, options: N } = typeof E == "function" ? {
          fn: E,
          options: {}
        } : {
          fn: b,
          options: {
            ...E
          }
        }, q = N.spanName ?? P;
        if (!r.NextVanillaSpanAllowlist.includes(P) && process.env.NEXT_OTEL_VERBOSE !== "1" || N.hideSpan)
          return x();
        let k = this.getSpanContext((N == null ? void 0 : N.parentSpan) ?? this.getActiveScopeSpan()), G = !1;
        k ? (y = u.getSpanContext(k)) != null && y.isRemote && (G = !0) : (k = (t == null ? void 0 : t.active()) ?? p, G = !0);
        const Y = A();
        return N.attributes = {
          "next.span_name": q,
          "next.span_type": P,
          ...N.attributes
        }, t.with(k.setValue(I, Y), () => this.getTracerInstance().startActiveSpan(q, N, (H) => {
          const F = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0, te = () => {
            h.delete(Y), F && process.env.NEXT_OTEL_PERFORMANCE_PREFIX && r.LogSpanAllowList.includes(P || "") && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-${(P.split(".").pop() || "").replace(/[A-Z]/g, (ce) => "-" + ce.toLowerCase())}`, {
              start: F,
              end: performance.now()
            });
          };
          G && h.set(Y, new Map(Object.entries(N.attributes ?? {})));
          try {
            if (x.length > 1)
              return x(H, (Te) => T(H, Te));
            const ce = x(H);
            return (0, o.isThenable)(ce) ? ce.then((Te) => (H.end(), Te)).catch((Te) => {
              throw T(H, Te), Te;
            }).finally(te) : (H.end(), te(), ce);
          } catch (ce) {
            throw T(H, ce), te(), ce;
          }
        }));
      }
      wrap(...R) {
        const y = this, [P, E, b] = R.length === 3 ? R : [
          R[0],
          {},
          R[1]
        ];
        return !r.NextVanillaSpanAllowlist.includes(P) && process.env.NEXT_OTEL_VERBOSE !== "1" ? b : function() {
          let x = E;
          typeof x == "function" && typeof b == "function" && (x = x.apply(this, arguments));
          const N = arguments.length - 1, q = arguments[N];
          if (typeof q == "function") {
            const k = y.getContext().bind(t.active(), q);
            return y.trace(P, x, (G, Y) => (arguments[N] = function(H) {
              return Y == null || Y(H), k.apply(this, arguments);
            }, b.apply(this, arguments)));
          } else
            return y.trace(P, x, () => b.apply(this, arguments));
        };
      }
      startSpan(...R) {
        const [y, P] = R, E = this.getSpanContext((P == null ? void 0 : P.parentSpan) ?? this.getActiveScopeSpan());
        return this.getTracerInstance().startSpan(y, P, E);
      }
      getSpanContext(R) {
        return R ? u.setSpan(t.active(), R) : void 0;
      }
      getRootSpanAttributes() {
        const R = t.active().getValue(I);
        return h.get(R);
      }
      setRootSpanAttribute(R, y) {
        const P = t.active().getValue(I), E = h.get(P);
        E && E.set(R, y);
      }
    }
    const w = (() => {
      const l = new j();
      return () => l;
    })();
  }(Sd)), Sd;
}
var Dd = {}, Ns = { exports: {} }, Lb;
function XO() {
  return Lb || (Lb = 1, function(e, n) {
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    function r(a, u) {
      for (var c in u) Object.defineProperty(a, c, {
        enumerable: !0,
        get: u[c]
      });
    }
    r(n, {
      DynamicServerError: function() {
        return i;
      },
      isDynamicServerError: function() {
        return t;
      }
    });
    const o = "DYNAMIC_SERVER_USAGE";
    class i extends Error {
      constructor(u) {
        super("Dynamic server usage: " + u), this.description = u, this.digest = o;
      }
    }
    function t(a) {
      return typeof a != "object" || a === null || !("digest" in a) || typeof a.digest != "string" ? !1 : a.digest === o;
    }
    (typeof n.default == "function" || typeof n.default == "object" && n.default !== null) && typeof n.default.__esModule > "u" && (Object.defineProperty(n.default, "__esModule", { value: !0 }), Object.assign(n.default, n), e.exports = n.default);
  }(Ns, Ns.exports)), Ns.exports;
}
var Bs = { exports: {} }, qb;
function ej() {
  return qb || (qb = 1, function(e, n) {
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    function r(a, u) {
      for (var c in u) Object.defineProperty(a, c, {
        enumerable: !0,
        get: u[c]
      });
    }
    r(n, {
      StaticGenBailoutError: function() {
        return i;
      },
      isStaticGenBailoutError: function() {
        return t;
      }
    });
    const o = "NEXT_STATIC_GEN_BAILOUT";
    class i extends Error {
      constructor(...u) {
        super(...u), this.code = o;
      }
    }
    function t(a) {
      return typeof a != "object" || a === null || !("code" in a) ? !1 : a.code === o;
    }
    (typeof n.default == "function" || typeof n.default == "object" && n.default !== null) && typeof n.default.__esModule > "u" && (Object.defineProperty(n.default, "__esModule", { value: !0 }), Object.assign(n.default, n), e.exports = n.default);
  }(Bs, Bs.exports)), Bs.exports;
}
var Fd = {}, Ud = {}, Ld = {}, Kb;
function zO() {
  return Kb || (Kb = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function n(c, s) {
      for (var p in s) Object.defineProperty(c, p, {
        enumerable: !0,
        get: s[p]
      });
    }
    n(e, {
      bindSnapshot: function() {
        return a;
      },
      createAsyncLocalStorage: function() {
        return t;
      },
      createSnapshot: function() {
        return u;
      }
    });
    const r = Object.defineProperty(new Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", {
      value: "E504",
      enumerable: !1,
      configurable: !0
    });
    class o {
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
      static bind(s) {
        return s;
      }
    }
    const i = typeof globalThis < "u" && globalThis.AsyncLocalStorage;
    function t() {
      return i ? new i() : new o();
    }
    function a(c) {
      return i ? i.bind(c) : o.bind(c);
    }
    function u() {
      return i ? i.snapshot() : function(c, ...s) {
        return c(...s);
      };
    }
  }(Ld)), Ld;
}
var Gb;
function nj() {
  return Gb || (Gb = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "workUnitAsyncStorageInstance", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const r = (0, zO().createAsyncLocalStorage)();
  }(Ud)), Ud;
}
var js = { exports: {} }, Hb;
function tj() {
  return Hb || (Hb = 1, function(e, n) {
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    function r(j, w) {
      for (var l in w) Object.defineProperty(j, l, {
        enumerable: !0,
        get: w[l]
      });
    }
    r(n, {
      ACTION_HEADER: function() {
        return i;
      },
      FLIGHT_HEADERS: function() {
        return f;
      },
      NEXT_DID_POSTPONE_HEADER: function() {
        return I;
      },
      NEXT_HMR_REFRESH_HASH_COOKIE: function() {
        return s;
      },
      NEXT_HMR_REFRESH_HEADER: function() {
        return c;
      },
      NEXT_IS_PRERENDER_HEADER: function() {
        return v;
      },
      NEXT_REWRITTEN_PATH_HEADER: function() {
        return _;
      },
      NEXT_REWRITTEN_QUERY_HEADER: function() {
        return A;
      },
      NEXT_ROUTER_PREFETCH_HEADER: function() {
        return a;
      },
      NEXT_ROUTER_SEGMENT_PREFETCH_HEADER: function() {
        return u;
      },
      NEXT_ROUTER_STALE_TIME_HEADER: function() {
        return h;
      },
      NEXT_ROUTER_STATE_TREE_HEADER: function() {
        return t;
      },
      NEXT_RSC_UNION_QUERY: function() {
        return T;
      },
      NEXT_URL: function() {
        return p;
      },
      RSC_CONTENT_TYPE_HEADER: function() {
        return d;
      },
      RSC_HEADER: function() {
        return o;
      }
    });
    const o = "RSC", i = "Next-Action", t = "Next-Router-State-Tree", a = "Next-Router-Prefetch", u = "Next-Router-Segment-Prefetch", c = "Next-HMR-Refresh", s = "__next_hmr_refresh_hash__", p = "Next-Url", d = "text/x-component", f = [
      o,
      t,
      a,
      c,
      u
    ], T = "_rsc", h = "x-nextjs-stale-time", I = "x-nextjs-postponed", _ = "x-nextjs-rewritten-path", A = "x-nextjs-rewritten-query", v = "x-nextjs-prerender";
    (typeof n.default == "function" || typeof n.default == "object" && n.default !== null) && typeof n.default.__esModule > "u" && (Object.defineProperty(n.default, "__esModule", { value: !0 }), Object.assign(n.default, n), e.exports = n.default);
  }(js, js.exports)), js.exports;
}
var Vb;
function jo() {
  return Vb || (Vb = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function n(p, d) {
      for (var f in d) Object.defineProperty(p, f, {
        enumerable: !0,
        get: d[f]
      });
    }
    n(e, {
      getDraftModeProviderForCacheScope: function() {
        return s;
      },
      getExpectedRequestStore: function() {
        return i;
      },
      getHmrRefreshHash: function() {
        return c;
      },
      getPrerenderResumeDataCache: function() {
        return a;
      },
      getRenderResumeDataCache: function() {
        return u;
      },
      throwForMissingRequestStore: function() {
        return t;
      },
      workUnitAsyncStorage: function() {
        return r.workUnitAsyncStorageInstance;
      }
    });
    const r = nj(), o = tj();
    function i(p) {
      const d = r.workUnitAsyncStorageInstance.getStore();
      switch (d || t(p), d.type) {
        case "request":
          return d;
        case "prerender":
        case "prerender-ppr":
        case "prerender-legacy":
          throw Object.defineProperty(new Error(`\`${p}\` cannot be called inside a prerender. This is a bug in Next.js.`), "__NEXT_ERROR_CODE", {
            value: "E401",
            enumerable: !1,
            configurable: !0
          });
        case "cache":
          throw Object.defineProperty(new Error(`\`${p}\` cannot be called inside "use cache". Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
            value: "E37",
            enumerable: !1,
            configurable: !0
          });
        case "unstable-cache":
          throw Object.defineProperty(new Error(`\`${p}\` cannot be called inside unstable_cache. Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
            value: "E69",
            enumerable: !1,
            configurable: !0
          });
        default:
          return d;
      }
    }
    function t(p) {
      throw Object.defineProperty(new Error(`\`${p}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", {
        value: "E251",
        enumerable: !1,
        configurable: !0
      });
    }
    function a(p) {
      return p.type === "prerender" || p.type === "prerender-ppr" ? p.prerenderResumeDataCache : null;
    }
    function u(p) {
      return p.type !== "prerender-legacy" && p.type !== "cache" && p.type !== "unstable-cache" ? p.type === "request" ? p.renderResumeDataCache : p.prerenderResumeDataCache : null;
    }
    function c(p, d) {
      var f;
      if (p.dev)
        return d.type === "cache" || d.type === "prerender" ? d.hmrRefreshHash : d.type === "request" ? (f = d.cookies.get(o.NEXT_HMR_REFRESH_HASH_COOKIE)) == null ? void 0 : f.value : void 0;
    }
    function s(p, d) {
      if (p.isDraftMode)
        switch (d.type) {
          case "cache":
          case "unstable-cache":
          case "request":
            return d.draftMode;
          default:
            return;
        }
    }
  }(Fd)), Fd;
}
var qd = {}, Kd = {}, Wb;
function rj() {
  return Wb || (Wb = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "workAsyncStorageInstance", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const r = (0, zO().createAsyncLocalStorage)();
  }(Kd)), Kd;
}
var kb;
function qa() {
  return kb || (kb = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "workAsyncStorage", {
      enumerable: !0,
      get: function() {
        return n.workAsyncStorageInstance;
      }
    });
    const n = rj();
  }(qd)), qd;
}
var Gd = {}, Xb;
function YO() {
  return Xb || (Xb = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function n(c, s) {
      for (var p in s) Object.defineProperty(c, p, {
        enumerable: !0,
        get: s[p]
      });
    }
    n(e, {
      isHangingPromiseRejectionError: function() {
        return r;
      },
      makeHangingPromise: function() {
        return a;
      }
    });
    function r(c) {
      return typeof c != "object" || c === null || !("digest" in c) ? !1 : c.digest === o;
    }
    const o = "HANGING_PROMISE_REJECTION";
    class i extends Error {
      constructor(s) {
        super(`During prerendering, ${s} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${s} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context.`), this.expression = s, this.digest = o;
      }
    }
    const t = /* @__PURE__ */ new WeakMap();
    function a(c, s) {
      if (c.aborted)
        return Promise.reject(new i(s));
      {
        const p = new Promise((d, f) => {
          const T = f.bind(null, new i(s));
          let h = t.get(c);
          if (h)
            h.push(T);
          else {
            const I = [
              T
            ];
            t.set(c, I), c.addEventListener("abort", () => {
              for (let _ = 0; _ < I.length; _++)
                I[_]();
            }, {
              once: !0
            });
          }
        });
        return p.catch(u), p;
      }
    }
    function u() {
    }
  }(Gd)), Gd;
}
var Hd = {}, zb;
function ij() {
  return zb || (zb = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function n(t, a) {
      for (var u in a) Object.defineProperty(t, u, {
        enumerable: !0,
        get: a[u]
      });
    }
    n(e, {
      METADATA_BOUNDARY_NAME: function() {
        return r;
      },
      OUTLET_BOUNDARY_NAME: function() {
        return i;
      },
      VIEWPORT_BOUNDARY_NAME: function() {
        return o;
      }
    });
    const r = "__next_metadata_boundary__", o = "__next_viewport_boundary__", i = "__next_outlet_boundary__";
  }(Hd)), Hd;
}
var Vd = {}, Yb;
function Bc() {
  return Yb || (Yb = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function n(a, u) {
      for (var c in u) Object.defineProperty(a, c, {
        enumerable: !0,
        get: u[c]
      });
    }
    n(e, {
      atLeastOneTask: function() {
        return i;
      },
      scheduleImmediate: function() {
        return o;
      },
      scheduleOnNextTick: function() {
        return r;
      },
      waitAtLeastOneReactRenderTask: function() {
        return t;
      }
    });
    const r = (a) => {
      Promise.resolve().then(() => {
        process.env.NEXT_RUNTIME === "edge" ? setTimeout(a, 0) : process.nextTick(a);
      });
    }, o = (a) => {
      process.env.NEXT_RUNTIME === "edge" ? setTimeout(a, 0) : setImmediate(a);
    };
    function i() {
      return new Promise((a) => o(a));
    }
    function t() {
      return process.env.NEXT_RUNTIME === "edge" ? new Promise((a) => setTimeout(a, 0)) : new Promise((a) => setImmediate(a));
    }
  }(Vd)), Vd;
}
var Jb;
function Wl() {
  return Jb || (Jb = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function n(K, $) {
      for (var g in $) Object.defineProperty(K, g, {
        enumerable: !0,
        get: $[g]
      });
    }
    n(e, {
      Postpone: function() {
        return P;
      },
      abortAndThrowOnSynchronousRequestDataAccess: function() {
        return R;
      },
      abortOnSynchronousPlatformIOAccess: function() {
        return w;
      },
      accessedDynamicData: function() {
        return Y;
      },
      annotateDynamicAccess: function() {
        return Oe;
      },
      consumeDynamicAccess: function() {
        return H;
      },
      createDynamicTrackingState: function() {
        return f;
      },
      createDynamicValidationState: function() {
        return T;
      },
      createHangingInputAbortSignal: function() {
        return Te;
      },
      createPostponedAbortSignal: function() {
        return ce;
      },
      formatDynamicAPIAccesses: function() {
        return F;
      },
      getFirstDynamicReason: function() {
        return h;
      },
      isDynamicPostpone: function() {
        return x;
      },
      isPrerenderInterruptedError: function() {
        return G;
      },
      markCurrentScopeAsDynamic: function() {
        return I;
      },
      postponeWithTracking: function() {
        return E;
      },
      throwIfDisallowedDynamic: function() {
        return ne;
      },
      throwToInterruptStaticGeneration: function() {
        return A;
      },
      trackAllowedDynamicAccess: function() {
        return _e;
      },
      trackDynamicDataInDynamicRender: function() {
        return v;
      },
      trackFallbackParamAccessed: function() {
        return _;
      },
      trackSynchronousPlatformIOAccessInDev: function() {
        return l;
      },
      trackSynchronousRequestDataAccessInDev: function() {
        return y;
      },
      useDynamicRouteParams: function() {
        return we;
      }
    });
    const r = /* @__PURE__ */ p(zh), o = XO(), i = ej(), t = jo(), a = qa(), u = YO(), c = ij(), s = Bc();
    function p(K) {
      return K && K.__esModule ? K : {
        default: K
      };
    }
    const d = typeof r.default.unstable_postpone == "function";
    function f(K) {
      return {
        isDebugDynamicAccesses: K,
        dynamicAccesses: [],
        syncDynamicExpression: void 0,
        syncDynamicErrorWithStack: null
      };
    }
    function T() {
      return {
        hasSuspendedDynamic: !1,
        hasDynamicMetadata: !1,
        hasDynamicViewport: !1,
        hasSyncDynamicErrors: !1,
        dynamicErrors: []
      };
    }
    function h(K) {
      var $;
      return ($ = K.dynamicAccesses[0]) == null ? void 0 : $.expression;
    }
    function I(K, $, g) {
      if (!($ && ($.type === "cache" || $.type === "unstable-cache")) && !(K.forceDynamic || K.forceStatic)) {
        if (K.dynamicShouldError)
          throw Object.defineProperty(new i.StaticGenBailoutError(`Route ${K.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${g}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
            value: "E553",
            enumerable: !1,
            configurable: !0
          });
        if ($)
          if ($.type === "prerender-ppr")
            E(K.route, g, $.dynamicTracking);
          else if ($.type === "prerender-legacy") {
            $.revalidate = 0;
            const O = Object.defineProperty(new o.DynamicServerError(`Route ${K.route} couldn't be rendered statically because it used ${g}. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
              value: "E550",
              enumerable: !1,
              configurable: !0
            });
            throw K.dynamicUsageDescription = g, K.dynamicUsageStack = O.stack, O;
          } else process.env.NODE_ENV === "development" && $ && $.type === "request" && ($.usedDynamic = !0);
      }
    }
    function _(K, $) {
      const g = t.workUnitAsyncStorage.getStore();
      !g || g.type !== "prerender-ppr" || E(K.route, $, g.dynamicTracking);
    }
    function A(K, $, g) {
      const O = Object.defineProperty(new o.DynamicServerError(`Route ${$.route} couldn't be rendered statically because it used \`${K}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
        value: "E558",
        enumerable: !1,
        configurable: !0
      });
      throw g.revalidate = 0, $.dynamicUsageDescription = K, $.dynamicUsageStack = O.stack, O;
    }
    function v(K, $) {
      if ($) {
        if ($.type === "cache" || $.type === "unstable-cache")
          return;
        ($.type === "prerender" || $.type === "prerender-legacy") && ($.revalidate = 0), process.env.NODE_ENV === "development" && $.type === "request" && ($.usedDynamic = !0);
      }
    }
    function j(K, $, g) {
      const O = `Route ${K} needs to bail out of prerendering at this point because it used ${$}.`, D = k(O);
      g.controller.abort(D);
      const V = g.dynamicTracking;
      V && V.dynamicAccesses.push({
        // When we aren't debugging, we don't need to create another error for the
        // stack trace.
        stack: V.isDebugDynamicAccesses ? new Error().stack : void 0,
        expression: $
      });
    }
    function w(K, $, g, O) {
      const D = O.dynamicTracking;
      D && D.syncDynamicErrorWithStack === null && (D.syncDynamicExpression = $, D.syncDynamicErrorWithStack = g), j(K, $, O);
    }
    function l(K) {
      K.prerenderPhase = !1;
    }
    function R(K, $, g, O) {
      if (O.controller.signal.aborted === !1) {
        const V = O.dynamicTracking;
        V && V.syncDynamicErrorWithStack === null && (V.syncDynamicExpression = $, V.syncDynamicErrorWithStack = g, O.validating === !0 && (V.syncDynamicLogged = !0)), j(K, $, O);
      }
      throw k(`Route ${K} needs to bail out of prerendering at this point because it used ${$}.`);
    }
    const y = l;
    function P({ reason: K, route: $ }) {
      const g = t.workUnitAsyncStorage.getStore(), O = g && g.type === "prerender-ppr" ? g.dynamicTracking : null;
      E($, K, O);
    }
    function E(K, $, g) {
      te(), g && g.dynamicAccesses.push({
        // When we aren't debugging, we don't need to create another error for the
        // stack trace.
        stack: g.isDebugDynamicAccesses ? new Error().stack : void 0,
        expression: $
      }), r.default.unstable_postpone(b(K, $));
    }
    function b(K, $) {
      return `Route ${K} needs to bail out of prerendering at this point because it used ${$}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
    }
    function x(K) {
      return typeof K == "object" && K !== null && typeof K.message == "string" ? N(K.message) : !1;
    }
    function N(K) {
      return K.includes("needs to bail out of prerendering at this point because it used") && K.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error");
    }
    if (N(b("%%%", "^^^")) === !1)
      throw Object.defineProperty(new Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", {
        value: "E296",
        enumerable: !1,
        configurable: !0
      });
    const q = "NEXT_PRERENDER_INTERRUPTED";
    function k(K) {
      const $ = Object.defineProperty(new Error(K), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: !1,
        configurable: !0
      });
      return $.digest = q, $;
    }
    function G(K) {
      return typeof K == "object" && K !== null && K.digest === q && "name" in K && "message" in K && K instanceof Error;
    }
    function Y(K) {
      return K.length > 0;
    }
    function H(K, $) {
      return K.dynamicAccesses.push(...$.dynamicAccesses), K.dynamicAccesses;
    }
    function F(K) {
      return K.filter(($) => typeof $.stack == "string" && $.stack.length > 0).map(({ expression: $, stack: g }) => (g = g.split(`
`).slice(4).filter((O) => !(O.includes("node_modules/next/") || O.includes(" (<anonymous>)") || O.includes(" (node:"))).join(`
`), `Dynamic API Usage Debug - ${$}:
${g}`));
    }
    function te() {
      if (!d)
        throw Object.defineProperty(new Error("Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js"), "__NEXT_ERROR_CODE", {
          value: "E224",
          enumerable: !1,
          configurable: !0
        });
    }
    function ce(K) {
      te();
      const $ = new AbortController();
      try {
        r.default.unstable_postpone(K);
      } catch (g) {
        $.abort(g);
      }
      return $.signal;
    }
    function Te(K) {
      const $ = new AbortController();
      return K.cacheSignal ? K.cacheSignal.inputReady().then(() => {
        $.abort();
      }) : (0, s.scheduleOnNextTick)(() => $.abort()), $.signal;
    }
    function Oe(K, $) {
      const g = $.dynamicTracking;
      g && g.dynamicAccesses.push({
        stack: g.isDebugDynamicAccesses ? new Error().stack : void 0,
        expression: K
      });
    }
    function we(K) {
      const $ = a.workAsyncStorage.getStore();
      if ($ && $.isStaticGeneration && $.fallbackRouteParams && $.fallbackRouteParams.size > 0) {
        const g = t.workUnitAsyncStorage.getStore();
        g && (g.type === "prerender" ? r.default.use((0, u.makeHangingPromise)(g.renderSignal, K)) : g.type === "prerender-ppr" ? E($.route, K, g.dynamicTracking) : g.type === "prerender-legacy" && A(K, $, g));
      }
    }
    const ye = /\n\s+at Suspense \(<anonymous>\)/, Ke = new RegExp(`\\n\\s+at ${c.METADATA_BOUNDARY_NAME}[\\n\\s]`), J = new RegExp(`\\n\\s+at ${c.VIEWPORT_BOUNDARY_NAME}[\\n\\s]`), re = new RegExp(`\\n\\s+at ${c.OUTLET_BOUNDARY_NAME}[\\n\\s]`);
    function _e(K, $, g, O, D) {
      if (!re.test($))
        if (Ke.test($)) {
          g.hasDynamicMetadata = !0;
          return;
        } else if (J.test($)) {
          g.hasDynamicViewport = !0;
          return;
        } else if (ye.test($)) {
          g.hasSuspendedDynamic = !0;
          return;
        } else if (O.syncDynamicErrorWithStack || D.syncDynamicErrorWithStack) {
          g.hasSyncDynamicErrors = !0;
          return;
        } else {
          const V = `Route "${K}": A component accessed data, headers, params, searchParams, or a short-lived cache without a Suspense boundary nor a "use cache" above it. We don't have the exact line number added to error messages yet but you can see which component in the stack below. See more info: https://nextjs.org/docs/messages/next-prerender-missing-suspense`, m = Ee(V, $);
          g.dynamicErrors.push(m);
          return;
        }
    }
    function Ee(K, $) {
      const g = Object.defineProperty(new Error(K), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: !1,
        configurable: !0
      });
      return g.stack = "Error: " + K + $, g;
    }
    function ne(K, $, g, O) {
      let D, V, m;
      if (g.syncDynamicErrorWithStack ? (D = g.syncDynamicErrorWithStack, V = g.syncDynamicExpression, m = g.syncDynamicLogged === !0) : O.syncDynamicErrorWithStack ? (D = O.syncDynamicErrorWithStack, V = O.syncDynamicExpression, m = O.syncDynamicLogged === !0) : (D = null, V = void 0, m = !1), $.hasSyncDynamicErrors && D)
        throw m || console.error(D), new i.StaticGenBailoutError();
      const Z = $.dynamicErrors;
      if (Z.length) {
        for (let X = 0; X < Z.length; X++)
          console.error(Z[X]);
        throw new i.StaticGenBailoutError();
      }
      if (!$.hasSuspendedDynamic) {
        if ($.hasDynamicMetadata)
          throw D ? (console.error(D), Object.defineProperty(new i.StaticGenBailoutError(`Route "${K}" has a \`generateMetadata\` that could not finish rendering before ${V} was used. Follow the instructions in the error for this expression to resolve.`), "__NEXT_ERROR_CODE", {
            value: "E608",
            enumerable: !1,
            configurable: !0
          })) : Object.defineProperty(new i.StaticGenBailoutError(`Route "${K}" has a \`generateMetadata\` that depends on Request data (\`cookies()\`, etc...) or external data (\`fetch(...)\`, etc...) but the rest of the route was static or only used cached data (\`"use cache"\`). If you expected this route to be prerenderable update your \`generateMetadata\` to not use Request data and only use cached external data. Otherwise, add \`await connection()\` somewhere within this route to indicate explicitly it should not be prerendered.`), "__NEXT_ERROR_CODE", {
            value: "E534",
            enumerable: !1,
            configurable: !0
          });
        if ($.hasDynamicViewport)
          throw D ? (console.error(D), Object.defineProperty(new i.StaticGenBailoutError(`Route "${K}" has a \`generateViewport\` that could not finish rendering before ${V} was used. Follow the instructions in the error for this expression to resolve.`), "__NEXT_ERROR_CODE", {
            value: "E573",
            enumerable: !1,
            configurable: !0
          })) : Object.defineProperty(new i.StaticGenBailoutError(`Route "${K}" has a \`generateViewport\` that depends on Request data (\`cookies()\`, etc...) or external data (\`fetch(...)\`, etc...) but the rest of the route was static or only used cached data (\`"use cache"\`). If you expected this route to be prerenderable update your \`generateViewport\` to not use Request data and only use cached external data. Otherwise, add \`await connection()\` somewhere within this route to indicate explicitly it should not be prerendered.`), "__NEXT_ERROR_CODE", {
            value: "E590",
            enumerable: !1,
            configurable: !0
          });
      }
    }
  }(Dd)), Dd;
}
var Wd = {}, kd = {}, Qb;
function JO() {
  return Qb || (Qb = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "cloneResponse", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    function n(r) {
      if (!r.body)
        return [
          r,
          r
        ];
      const [o, i] = r.body.tee(), t = new Response(o, {
        status: r.status,
        statusText: r.statusText,
        headers: r.headers
      });
      Object.defineProperty(t, "url", {
        value: r.url
      });
      const a = new Response(i, {
        status: r.status,
        statusText: r.statusText,
        headers: r.headers
      });
      return Object.defineProperty(a, "url", {
        value: r.url
      }), [
        t,
        a
      ];
    }
  }(kd)), kd;
}
var Xd = {}, Zb;
function oj() {
  return Zb || (Zb = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "InvariantError", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    class n extends Error {
      constructor(o, i) {
        super("Invariant: " + (o.endsWith(".") ? o : o + ".") + " This is a bug in Next.js.", i), this.name = "InvariantError";
      }
    }
  }(Xd)), Xd;
}
var eh;
function aj() {
  return eh || (eh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "createDedupeFetch", {
      enumerable: !0,
      get: function() {
        return c;
      }
    });
    const n = /* @__PURE__ */ t(zh), r = JO(), o = oj();
    function i(s) {
      if (typeof WeakMap != "function") return null;
      var p = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new WeakMap();
      return (i = function(f) {
        return f ? d : p;
      })(s);
    }
    function t(s, p) {
      if (s && s.__esModule)
        return s;
      if (s === null || typeof s != "object" && typeof s != "function")
        return {
          default: s
        };
      var d = i(p);
      if (d && d.has(s))
        return d.get(s);
      var f = {
        __proto__: null
      }, T = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var h in s)
        if (h !== "default" && Object.prototype.hasOwnProperty.call(s, h)) {
          var I = T ? Object.getOwnPropertyDescriptor(s, h) : null;
          I && (I.get || I.set) ? Object.defineProperty(f, h, I) : f[h] = s[h];
        }
      return f.default = s, d && d.set(s, f), f;
    }
    const a = '["GET",[],null,"follow",null,null,null,null]';
    function u(s) {
      return JSON.stringify([
        s.method,
        Array.from(s.headers.entries()),
        s.mode,
        s.redirect,
        s.credentials,
        s.referrer,
        s.referrerPolicy,
        s.integrity
      ]);
    }
    function c(s) {
      const p = n.cache(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars -- url is the cache key
        (d) => []
      );
      return function(f, T) {
        if (T && T.signal)
          return s(f, T);
        let h, I;
        if (typeof f == "string" && !T)
          I = a, h = f;
        else {
          const j = typeof f == "string" || f instanceof URL ? new Request(f, T) : f;
          if (j.method !== "GET" && j.method !== "HEAD" || j.keepalive)
            return s(f, T);
          I = u(j), h = j.url;
        }
        const _ = p(h);
        for (let j = 0, w = _.length; j < w; j += 1) {
          const [l, R] = _[j];
          if (l === I)
            return R.then(() => {
              const y = _[j][2];
              if (!y) throw Object.defineProperty(new o.InvariantError("No cached response"), "__NEXT_ERROR_CODE", {
                value: "E579",
                enumerable: !1,
                configurable: !0
              });
              const [P, E] = (0, r.cloneResponse)(y);
              return _[j][2] = E, P;
            });
        }
        const A = s(f, T), v = [
          I,
          A,
          null
        ];
        return _.push(v), A.then((j) => {
          const [w, l] = (0, r.cloneResponse)(j);
          return v[2] = l, w;
        });
      };
    }
  }(Wd)), Wd;
}
var zd = {}, Yd = {}, Jd = {}, nh;
function kl() {
  return nh || (nh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "DetachedPromise", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    class n {
      constructor() {
        let o, i;
        this.promise = new Promise((t, a) => {
          o = t, i = a;
        }), this.resolve = o, this.reject = i;
      }
    }
  }(Jd)), Jd;
}
var th;
function uj() {
  return th || (th = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "Batcher", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const n = kl();
    class r {
      constructor(i, t = (a) => a()) {
        this.cacheKeyFn = i, this.schedulerFn = t, this.pending = /* @__PURE__ */ new Map();
      }
      static create(i) {
        return new r(i == null ? void 0 : i.cacheKeyFn, i == null ? void 0 : i.schedulerFn);
      }
      /**
      * Wraps a function in a promise that will be resolved or rejected only once
      * for a given key. This will allow multiple calls to the function to be
      * made, but only one will be executed at a time. The result of the first
      * call will be returned to all callers.
      *
      * @param key the key to use for the cache
      * @param fn the function to wrap
      * @returns a promise that resolves to the result of the function
      */
      async batch(i, t) {
        const a = this.cacheKeyFn ? await this.cacheKeyFn(i) : i;
        if (a === null)
          return t(a, Promise.resolve);
        const u = this.pending.get(a);
        if (u) return u;
        const { promise: c, resolve: s, reject: p } = new n.DetachedPromise();
        return this.pending.set(a, c), this.schedulerFn(async () => {
          try {
            const d = await t(a, s);
            s(d);
          } catch (d) {
            p(d);
          } finally {
            this.pending.delete(a);
          }
        }), c;
      }
    }
  }(Yd)), Yd;
}
var Qd = {}, Zd = {}, rh;
function QO() {
  return rh || (rh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function n(i, t) {
      for (var a in t) Object.defineProperty(i, a, {
        enumerable: !0,
        get: t[a]
      });
    }
    n(e, {
      CachedRouteKind: function() {
        return r;
      },
      IncrementalCacheKind: function() {
        return o;
      }
    });
    var r = /* @__PURE__ */ function(i) {
      return i.APP_PAGE = "APP_PAGE", i.APP_ROUTE = "APP_ROUTE", i.PAGES = "PAGES", i.FETCH = "FETCH", i.REDIRECT = "REDIRECT", i.IMAGE = "IMAGE", i;
    }({}), o = /* @__PURE__ */ function(i) {
      return i.APP_PAGE = "APP_PAGE", i.APP_ROUTE = "APP_ROUTE", i.PAGES = "PAGES", i.FETCH = "FETCH", i.IMAGE = "IMAGE", i;
    }({});
  }(Zd)), Zd;
}
var ep = {}, np = {}, tp = {}, ih;
function sj() {
  return ih || (ih = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "ENCODED_TAGS", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const n = {
      // opening tags do not have the closing `>` since they can contain other attributes such as `<body className=''>`
      OPENING: {
        // <html
        HTML: new Uint8Array([
          60,
          104,
          116,
          109,
          108
        ]),
        // <body
        BODY: new Uint8Array([
          60,
          98,
          111,
          100,
          121
        ])
      },
      CLOSED: {
        // </head>
        HEAD: new Uint8Array([
          60,
          47,
          104,
          101,
          97,
          100,
          62
        ]),
        // </body>
        BODY: new Uint8Array([
          60,
          47,
          98,
          111,
          100,
          121,
          62
        ]),
        // </html>
        HTML: new Uint8Array([
          60,
          47,
          104,
          116,
          109,
          108,
          62
        ]),
        // </body></html>
        BODY_AND_HTML: new Uint8Array([
          60,
          47,
          98,
          111,
          100,
          121,
          62,
          60,
          47,
          104,
          116,
          109,
          108,
          62
        ])
      }
    };
  }(tp)), tp;
}
var rp = {}, oh;
function cj() {
  return oh || (oh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function n(t, a) {
      for (var u in a) Object.defineProperty(t, u, {
        enumerable: !0,
        get: a[u]
      });
    }
    n(e, {
      indexOfUint8Array: function() {
        return r;
      },
      isEquivalentUint8Arrays: function() {
        return o;
      },
      removeFromUint8Array: function() {
        return i;
      }
    });
    function r(t, a) {
      if (a.length === 0) return 0;
      if (t.length === 0 || a.length > t.length) return -1;
      for (let u = 0; u <= t.length - a.length; u++) {
        let c = !0;
        for (let s = 0; s < a.length; s++)
          if (t[u + s] !== a[s]) {
            c = !1;
            break;
          }
        if (c)
          return u;
      }
      return -1;
    }
    function o(t, a) {
      if (t.length !== a.length) return !1;
      for (let u = 0; u < t.length; u++)
        if (t[u] !== a[u]) return !1;
      return !0;
    }
    function i(t, a) {
      const u = r(t, a);
      if (u === 0) return t.subarray(a.length);
      if (u > -1) {
        const c = new Uint8Array(t.length - a.length);
        return c.set(t.slice(0, u)), c.set(t.slice(u + a.length), u), c;
      } else
        return t;
    }
  }(rp)), rp;
}
var Ds = { exports: {} }, ah;
function dj() {
  return ah || (ah = 1, function(e, n) {
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), Object.defineProperty(n, "MISSING_ROOT_TAGS_ERROR", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const r = "NEXT_MISSING_ROOT_TAGS";
    (typeof n.default == "function" || typeof n.default == "object" && n.default !== null) && typeof n.default.__esModule > "u" && (Object.defineProperty(n.default, "__esModule", { value: !0 }), Object.assign(n.default, n), e.exports = n.default);
  }(Ds, Ds.exports)), Ds.exports;
}
var uh;
function pj() {
  return uh || (uh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function n(G, Y) {
      for (var H in Y) Object.defineProperty(G, H, {
        enumerable: !0,
        get: Y[H]
      });
    }
    n(e, {
      chainStreams: function() {
        return d;
      },
      continueDynamicHTMLResume: function() {
        return q;
      },
      continueDynamicPrerender: function() {
        return x;
      },
      continueFizzStream: function() {
        return b;
      },
      continueStaticPrerender: function() {
        return N;
      },
      createBufferedTransformStream: function() {
        return _;
      },
      createDocumentClosingStream: function() {
        return k;
      },
      createRootLayoutValidatorStream: function() {
        return P;
      },
      renderToInitialFizzStream: function() {
        return A;
      },
      streamFromBuffer: function() {
        return T;
      },
      streamFromString: function() {
        return f;
      },
      streamToBuffer: function() {
        return h;
      },
      streamToString: function() {
        return I;
      }
    });
    const r = Vl(), o = xc(), i = kl(), t = Bc(), a = sj(), u = cj(), c = dj();
    function s() {
    }
    const p = new TextEncoder();
    function d(...G) {
      if (G.length === 0)
        throw Object.defineProperty(new Error("Invariant: chainStreams requires at least one stream"), "__NEXT_ERROR_CODE", {
          value: "E437",
          enumerable: !1,
          configurable: !0
        });
      if (G.length === 1)
        return G[0];
      const { readable: Y, writable: H } = new TransformStream();
      let F = G[0].pipeTo(H, {
        preventClose: !0
      }), te = 1;
      for (; te < G.length - 1; te++) {
        const Te = G[te];
        F = F.then(() => Te.pipeTo(H, {
          preventClose: !0
        }));
      }
      const ce = G[te];
      return F = F.then(() => ce.pipeTo(H)), F.catch(s), Y;
    }
    function f(G) {
      return new ReadableStream({
        start(Y) {
          Y.enqueue(p.encode(G)), Y.close();
        }
      });
    }
    function T(G) {
      return new ReadableStream({
        start(Y) {
          Y.enqueue(G), Y.close();
        }
      });
    }
    async function h(G) {
      const Y = G.getReader(), H = [];
      for (; ; ) {
        const { done: F, value: te } = await Y.read();
        if (F)
          break;
        H.push(te);
      }
      return Buffer.concat(H);
    }
    async function I(G, Y) {
      const H = new TextDecoder("utf-8", {
        fatal: !0
      });
      let F = "";
      for await (const te of G) {
        if (Y != null && Y.aborted)
          return F;
        F += H.decode(te, {
          stream: !0
        });
      }
      return F += H.decode(), F;
    }
    function _() {
      let G = [], Y = 0, H;
      const F = (te) => {
        if (H) return;
        const ce = new i.DetachedPromise();
        H = ce, (0, t.scheduleImmediate)(() => {
          try {
            const Te = new Uint8Array(Y);
            let Oe = 0;
            for (let we = 0; we < G.length; we++) {
              const ye = G[we];
              Te.set(ye, Oe), Oe += ye.byteLength;
            }
            G.length = 0, Y = 0, te.enqueue(Te);
          } catch {
          } finally {
            H = void 0, ce.resolve();
          }
        });
      };
      return new TransformStream({
        transform(te, ce) {
          G.push(te), Y += te.byteLength, F(ce);
        },
        flush() {
          if (H)
            return H.promise;
        }
      });
    }
    function A({ ReactDOMServer: G, element: Y, streamOptions: H }) {
      return (0, r.getTracer)().trace(o.AppRenderSpan.renderToReadableStream, async () => G.renderToReadableStream(Y, H));
    }
    function v(G) {
      let Y = !1, H = !1;
      return new TransformStream({
        async transform(F, te) {
          H = !0;
          const ce = await G();
          if (Y) {
            if (ce) {
              const Te = p.encode(ce);
              te.enqueue(Te);
            }
            te.enqueue(F);
          } else {
            const Te = (0, u.indexOfUint8Array)(F, a.ENCODED_TAGS.CLOSED.HEAD);
            if (Te !== -1) {
              if (ce) {
                const Oe = p.encode(ce), we = new Uint8Array(F.length + Oe.length);
                we.set(F.slice(0, Te)), we.set(Oe, Te), we.set(F.slice(Te), Te + Oe.length), te.enqueue(we);
              } else
                te.enqueue(F);
              Y = !0;
            } else
              ce && te.enqueue(p.encode(ce)), te.enqueue(F), Y = !0;
          }
        },
        async flush(F) {
          if (H) {
            const te = await G();
            te && F.enqueue(p.encode(te));
          }
        }
      });
    }
    function j(G) {
      let Y = !1, H;
      const F = (te) => {
        const ce = new i.DetachedPromise();
        H = ce, (0, t.scheduleImmediate)(() => {
          try {
            te.enqueue(p.encode(G));
          } catch {
          } finally {
            H = void 0, ce.resolve();
          }
        });
      };
      return new TransformStream({
        transform(te, ce) {
          ce.enqueue(te), !Y && (Y = !0, F(ce));
        },
        flush(te) {
          if (H) return H.promise;
          Y || te.enqueue(p.encode(G));
        }
      });
    }
    function w(G) {
      let Y = null, H = !1;
      async function F(te) {
        if (Y)
          return;
        const ce = G.getReader();
        await (0, t.atLeastOneTask)();
        try {
          for (; ; ) {
            const { done: Te, value: Oe } = await ce.read();
            if (Te) {
              H = !0;
              return;
            }
            te.enqueue(Oe);
          }
        } catch (Te) {
          te.error(Te);
        }
      }
      return new TransformStream({
        transform(te, ce) {
          ce.enqueue(te), Y || (Y = F(ce));
        },
        flush(te) {
          if (!H)
            return Y || F(te);
        }
      });
    }
    const l = "</body></html>";
    function R() {
      let G = !1;
      return new TransformStream({
        transform(Y, H) {
          if (G)
            return H.enqueue(Y);
          const F = (0, u.indexOfUint8Array)(Y, a.ENCODED_TAGS.CLOSED.BODY_AND_HTML);
          if (F > -1) {
            if (G = !0, Y.length === a.ENCODED_TAGS.CLOSED.BODY_AND_HTML.length)
              return;
            const te = Y.slice(0, F);
            if (H.enqueue(te), Y.length > a.ENCODED_TAGS.CLOSED.BODY_AND_HTML.length + F) {
              const ce = Y.slice(F + a.ENCODED_TAGS.CLOSED.BODY_AND_HTML.length);
              H.enqueue(ce);
            }
          } else
            H.enqueue(Y);
        },
        flush(Y) {
          Y.enqueue(a.ENCODED_TAGS.CLOSED.BODY_AND_HTML);
        }
      });
    }
    function y() {
      return new TransformStream({
        transform(G, Y) {
          (0, u.isEquivalentUint8Arrays)(G, a.ENCODED_TAGS.CLOSED.BODY_AND_HTML) || (0, u.isEquivalentUint8Arrays)(G, a.ENCODED_TAGS.CLOSED.BODY) || (0, u.isEquivalentUint8Arrays)(G, a.ENCODED_TAGS.CLOSED.HTML) || (G = (0, u.removeFromUint8Array)(G, a.ENCODED_TAGS.CLOSED.BODY), G = (0, u.removeFromUint8Array)(G, a.ENCODED_TAGS.CLOSED.HTML), Y.enqueue(G));
        }
      });
    }
    function P() {
      let G = !1, Y = !1;
      return new TransformStream({
        async transform(H, F) {
          !G && (0, u.indexOfUint8Array)(H, a.ENCODED_TAGS.OPENING.HTML) > -1 && (G = !0), !Y && (0, u.indexOfUint8Array)(H, a.ENCODED_TAGS.OPENING.BODY) > -1 && (Y = !0), F.enqueue(H);
        },
        flush(H) {
          const F = [];
          G || F.push("html"), Y || F.push("body"), F.length && H.enqueue(p.encode(`<html id="__next_error__">
            <template
              data-next-error-message="Missing ${F.map((te) => `<${te}>`).join(F.length > 1 ? " and " : "")} tags in the root layout.
Read more at https://nextjs.org/docs/messages/missing-root-layout-tags""
              data-next-error-digest="${c.MISSING_ROOT_TAGS_ERROR}"
              data-next-error-stack=""
            ></template>
          `));
        }
      });
    }
    function E(G, Y) {
      let H = G;
      for (const F of Y)
        F && (H = H.pipeThrough(F));
      return H;
    }
    async function b(G, { suffix: Y, inlinedDataStream: H, isStaticGeneration: F, getServerInsertedHTML: te, getServerInsertedMetadata: ce, validateRootLayout: Te }) {
      const Oe = Y ? Y.split(l, 1)[0] : null;
      return F && "allReady" in G && await G.allReady, E(G, [
        // Buffer everything to avoid flushing too frequently
        _(),
        // Insert generated metadata
        v(ce),
        // Insert suffix content
        Oe != null && Oe.length > 0 ? j(Oe) : null,
        // Insert the inlined data (Flight data, form state, etc.) stream into the HTML
        H ? w(H) : null,
        // Validate the root layout for missing html or body tags
        Te ? P() : null,
        // Close tags should always be deferred to the end
        R(),
        // Special head insertions
        // TODO-APP: Insert server side html to end of head in app layout rendering, to avoid
        // hydration errors. Remove this once it's ready to be handled by react itself.
        v(te)
      ]);
    }
    async function x(G, { getServerInsertedHTML: Y, getServerInsertedMetadata: H }) {
      return G.pipeThrough(_()).pipeThrough(y()).pipeThrough(v(Y)).pipeThrough(v(H));
    }
    async function N(G, { inlinedDataStream: Y, getServerInsertedHTML: H, getServerInsertedMetadata: F }) {
      return G.pipeThrough(_()).pipeThrough(v(H)).pipeThrough(v(F)).pipeThrough(w(Y)).pipeThrough(R());
    }
    async function q(G, { inlinedDataStream: Y, getServerInsertedHTML: H, getServerInsertedMetadata: F }) {
      return G.pipeThrough(_()).pipeThrough(v(H)).pipeThrough(v(F)).pipeThrough(w(Y)).pipeThrough(R());
    }
    function k() {
      return f(l);
    }
  }(np)), np;
}
var ip = {}, op = {}, ap = {}, sh;
function fj() {
  return sh || (sh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function n(u, c) {
      for (var s in c) Object.defineProperty(u, s, {
        enumerable: !0,
        get: c[s]
      });
    }
    n(e, {
      NEXT_REQUEST_META: function() {
        return r;
      },
      addRequestMeta: function() {
        return t;
      },
      getRequestMeta: function() {
        return o;
      },
      removeRequestMeta: function() {
        return a;
      },
      setRequestMeta: function() {
        return i;
      }
    });
    const r = Symbol.for("NextInternalRequestMeta");
    function o(u, c) {
      const s = u[r] || {};
      return typeof c == "string" ? s[c] : s;
    }
    function i(u, c) {
      return u[r] = c, c;
    }
    function t(u, c, s) {
      const p = o(u);
      return p[c] = s, i(u, p);
    }
    function a(u, c) {
      const s = o(u);
      return delete s[c], i(u, s);
    }
  }(ap)), ap;
}
var up = {}, ch;
function ZO() {
  return ch || (ch = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function n(c, s) {
      for (var p in s) Object.defineProperty(c, p, {
        enumerable: !0,
        get: s[p]
      });
    }
    n(e, {
      fromNodeOutgoingHttpHeaders: function() {
        return o;
      },
      normalizeNextQueryParam: function() {
        return u;
      },
      splitCookiesString: function() {
        return i;
      },
      toNodeOutgoingHttpHeaders: function() {
        return t;
      },
      validateURL: function() {
        return a;
      }
    });
    const r = Mc();
    function o(c) {
      const s = new Headers();
      for (let [p, d] of Object.entries(c)) {
        const f = Array.isArray(d) ? d : [
          d
        ];
        for (let T of f)
          typeof T > "u" || (typeof T == "number" && (T = T.toString()), s.append(p, T));
      }
      return s;
    }
    function i(c) {
      var s = [], p = 0, d, f, T, h, I;
      function _() {
        for (; p < c.length && /\s/.test(c.charAt(p)); )
          p += 1;
        return p < c.length;
      }
      function A() {
        return f = c.charAt(p), f !== "=" && f !== ";" && f !== ",";
      }
      for (; p < c.length; ) {
        for (d = p, I = !1; _(); )
          if (f = c.charAt(p), f === ",") {
            for (T = p, p += 1, _(), h = p; p < c.length && A(); )
              p += 1;
            p < c.length && c.charAt(p) === "=" ? (I = !0, p = h, s.push(c.substring(d, T)), d = p) : p = T + 1;
          } else
            p += 1;
        (!I || p >= c.length) && s.push(c.substring(d, c.length));
      }
      return s;
    }
    function t(c) {
      const s = {}, p = [];
      if (c)
        for (const [d, f] of c.entries())
          d.toLowerCase() === "set-cookie" ? (p.push(...i(f)), s[d] = p.length === 1 ? p[0] : p) : s[d] = f;
      return s;
    }
    function a(c) {
      try {
        return String(new URL(String(c)));
      } catch (s) {
        throw Object.defineProperty(new Error(`URL is malformed "${String(c)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, {
          cause: s
        }), "__NEXT_ERROR_CODE", {
          value: "E61",
          enumerable: !1,
          configurable: !0
        });
      }
    }
    function u(c) {
      const s = [
        r.NEXT_QUERY_PARAM_PREFIX,
        r.NEXT_INTERCEPTION_MARKER_PREFIX
      ];
      for (const p of s)
        if (c !== p && c.startsWith(p))
          return c.substring(p.length);
      return null;
    }
  }(up)), up;
}
var sp = {}, cp = {}, dp = {}, dh;
function lj() {
  return dh || (dh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "detectDomainLocale", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    function n(r, o, i) {
      if (r) {
        i && (i = i.toLowerCase());
        for (const u of r) {
          var t, a;
          const c = (t = u.domain) == null ? void 0 : t.split(":", 1)[0].toLowerCase();
          if (o === c || i === u.defaultLocale.toLowerCase() || (a = u.locales) != null && a.some((s) => s.toLowerCase() === i))
            return u;
        }
      }
    }
  }(dp)), dp;
}
var pp = {}, fp = {}, ph;
function yj() {
  return ph || (ph = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "removeTrailingSlash", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    function n(r) {
      return r.replace(/\/$/, "") || "/";
    }
  }(fp)), fp;
}
var lp = {}, yp = {}, fh;
function Xl() {
  return fh || (fh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "parsePath", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    function n(r) {
      const o = r.indexOf("#"), i = r.indexOf("?"), t = i > -1 && (o < 0 || i < o);
      return t || o > -1 ? {
        pathname: r.substring(0, t ? i : o),
        query: t ? r.substring(i, o > -1 ? o : void 0) : "",
        hash: o > -1 ? r.slice(o) : ""
      } : {
        pathname: r,
        query: "",
        hash: ""
      };
    }
  }(yp)), yp;
}
var lh;
function eA() {
  return lh || (lh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "addPathPrefix", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const n = Xl();
    function r(o, i) {
      if (!o.startsWith("/") || !i)
        return o;
      const { pathname: t, query: a, hash: u } = (0, n.parsePath)(o);
      return "" + i + t + a + u;
    }
  }(lp)), lp;
}
var mp = {}, yh;
function mj() {
  return yh || (yh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "addPathSuffix", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const n = Xl();
    function r(o, i) {
      if (!o.startsWith("/") || !i)
        return o;
      const { pathname: t, query: a, hash: u } = (0, n.parsePath)(o);
      return "" + t + i + a + u;
    }
  }(mp)), mp;
}
var gp = {}, Tp = {}, mh;
function zl() {
  return mh || (mh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "pathHasPrefix", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const n = Xl();
    function r(o, i) {
      if (typeof o != "string")
        return !1;
      const { pathname: t } = (0, n.parsePath)(o);
      return t === i || t.startsWith(i + "/");
    }
  }(Tp)), Tp;
}
var gh;
function gj() {
  return gh || (gh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "addLocale", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const n = eA(), r = zl();
    function o(i, t, a, u) {
      if (!t || t === a) return i;
      const c = i.toLowerCase();
      return !u && ((0, r.pathHasPrefix)(c, "/api") || (0, r.pathHasPrefix)(c, "/" + t.toLowerCase())) ? i : (0, n.addPathPrefix)(i, "/" + t);
    }
  }(gp)), gp;
}
var Th;
function Tj() {
  return Th || (Th = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "formatNextPathnameInfo", {
      enumerable: !0,
      get: function() {
        return t;
      }
    });
    const n = yj(), r = eA(), o = mj(), i = gj();
    function t(a) {
      let u = (0, i.addLocale)(a.pathname, a.locale, a.buildId ? void 0 : a.defaultLocale, a.ignorePrefix);
      return (a.buildId || !a.trailingSlash) && (u = (0, n.removeTrailingSlash)(u)), a.buildId && (u = (0, o.addPathSuffix)((0, r.addPathPrefix)(u, "/_next/data/" + a.buildId), a.pathname === "/" ? "index.json" : ".json")), u = (0, r.addPathPrefix)(u, a.basePath), !a.buildId && a.trailingSlash ? u.endsWith("/") ? u : (0, o.addPathSuffix)(u, "/") : (0, n.removeTrailingSlash)(u);
    }
  }(pp)), pp;
}
var _p = {}, _h;
function _j() {
  return _h || (_h = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "getHostname", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    function n(r, o) {
      let i;
      if (o != null && o.host && !Array.isArray(o.host))
        i = o.host.toString().split(":", 1)[0];
      else if (r.hostname)
        i = r.hostname;
      else return;
      return i.toLowerCase();
    }
  }(_p)), _p;
}
var bp = {}, hp = {}, bh;
function bj() {
  return bh || (bh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "normalizeLocalePath", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const n = /* @__PURE__ */ new WeakMap();
    function r(o, i) {
      if (!i) return {
        pathname: o
      };
      let t = n.get(i);
      t || (t = i.map((p) => p.toLowerCase()), n.set(i, t));
      let a;
      const u = o.split("/", 2);
      if (!u[1]) return {
        pathname: o
      };
      const c = u[1].toLowerCase(), s = t.indexOf(c);
      return s < 0 ? {
        pathname: o
      } : (a = i[s], o = o.slice(a.length + 1) || "/", {
        pathname: o,
        detectedLocale: a
      });
    }
  }(hp)), hp;
}
var Ip = {}, hh;
function hj() {
  return hh || (hh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "removePathPrefix", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const n = zl();
    function r(o, i) {
      if (!(0, n.pathHasPrefix)(o, i))
        return o;
      const t = o.slice(i.length);
      return t.startsWith("/") ? t : "/" + t;
    }
  }(Ip)), Ip;
}
var Ih;
function Ij() {
  return Ih || (Ih = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "getNextPathnameInfo", {
      enumerable: !0,
      get: function() {
        return i;
      }
    });
    const n = bj(), r = hj(), o = zl();
    function i(t, a) {
      var u;
      const { basePath: c, i18n: s, trailingSlash: p } = (u = a.nextConfig) != null ? u : {}, d = {
        pathname: t,
        trailingSlash: t !== "/" ? t.endsWith("/") : p
      };
      c && (0, o.pathHasPrefix)(d.pathname, c) && (d.pathname = (0, r.removePathPrefix)(d.pathname, c), d.basePath = c);
      let f = d.pathname;
      if (d.pathname.startsWith("/_next/data/") && d.pathname.endsWith(".json")) {
        const h = d.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/"), I = h[0];
        d.buildId = I, f = h[1] !== "index" ? "/" + h.slice(1).join("/") : "/", a.parseData === !0 && (d.pathname = f);
      }
      if (s) {
        let h = a.i18nProvider ? a.i18nProvider.analyze(d.pathname) : (0, n.normalizeLocalePath)(d.pathname, s.locales);
        d.locale = h.detectedLocale;
        var T;
        d.pathname = (T = h.pathname) != null ? T : d.pathname, !h.detectedLocale && d.buildId && (h = a.i18nProvider ? a.i18nProvider.analyze(f) : (0, n.normalizeLocalePath)(f, s.locales), h.detectedLocale && (d.locale = h.detectedLocale));
      }
      return d;
    }
  }(bp)), bp;
}
var Ph;
function Pj() {
  return Ph || (Ph = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "NextURL", {
      enumerable: !0,
      get: function() {
        return c;
      }
    });
    const n = lj(), r = Tj(), o = _j(), i = Ij(), t = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
    function a(s, p) {
      return new URL(String(s).replace(t, "localhost"), p && String(p).replace(t, "localhost"));
    }
    const u = Symbol("NextURLInternal");
    class c {
      constructor(p, d, f) {
        let T, h;
        typeof d == "object" && "pathname" in d || typeof d == "string" ? (T = d, h = f || {}) : h = f || d || {}, this[u] = {
          url: a(p, T ?? h.base),
          options: h,
          basePath: ""
        }, this.analyze();
      }
      analyze() {
        var p, d, f, T, h;
        const I = (0, i.getNextPathnameInfo)(this[u].url.pathname, {
          nextConfig: this[u].options.nextConfig,
          parseData: !process.env.__NEXT_NO_MIDDLEWARE_URL_NORMALIZE,
          i18nProvider: this[u].options.i18nProvider
        }), _ = (0, o.getHostname)(this[u].url, this[u].options.headers);
        this[u].domainLocale = this[u].options.i18nProvider ? this[u].options.i18nProvider.detectDomainLocale(_) : (0, n.detectDomainLocale)((d = this[u].options.nextConfig) == null || (p = d.i18n) == null ? void 0 : p.domains, _);
        const A = ((f = this[u].domainLocale) == null ? void 0 : f.defaultLocale) || ((h = this[u].options.nextConfig) == null || (T = h.i18n) == null ? void 0 : T.defaultLocale);
        this[u].url.pathname = I.pathname, this[u].defaultLocale = A, this[u].basePath = I.basePath ?? "", this[u].buildId = I.buildId, this[u].locale = I.locale ?? A, this[u].trailingSlash = I.trailingSlash;
      }
      formatPathname() {
        return (0, r.formatNextPathnameInfo)({
          basePath: this[u].basePath,
          buildId: this[u].buildId,
          defaultLocale: this[u].options.forceLocale ? void 0 : this[u].defaultLocale,
          locale: this[u].locale,
          pathname: this[u].url.pathname,
          trailingSlash: this[u].trailingSlash
        });
      }
      formatSearch() {
        return this[u].url.search;
      }
      get buildId() {
        return this[u].buildId;
      }
      set buildId(p) {
        this[u].buildId = p;
      }
      get locale() {
        return this[u].locale ?? "";
      }
      set locale(p) {
        var d, f;
        if (!this[u].locale || !(!((f = this[u].options.nextConfig) == null || (d = f.i18n) == null) && d.locales.includes(p)))
          throw Object.defineProperty(new TypeError(`The NextURL configuration includes no locale "${p}"`), "__NEXT_ERROR_CODE", {
            value: "E597",
            enumerable: !1,
            configurable: !0
          });
        this[u].locale = p;
      }
      get defaultLocale() {
        return this[u].defaultLocale;
      }
      get domainLocale() {
        return this[u].domainLocale;
      }
      get searchParams() {
        return this[u].url.searchParams;
      }
      get host() {
        return this[u].url.host;
      }
      set host(p) {
        this[u].url.host = p;
      }
      get hostname() {
        return this[u].url.hostname;
      }
      set hostname(p) {
        this[u].url.hostname = p;
      }
      get port() {
        return this[u].url.port;
      }
      set port(p) {
        this[u].url.port = p;
      }
      get protocol() {
        return this[u].url.protocol;
      }
      set protocol(p) {
        this[u].url.protocol = p;
      }
      get href() {
        const p = this.formatPathname(), d = this.formatSearch();
        return `${this.protocol}//${this.host}${p}${d}${this.hash}`;
      }
      set href(p) {
        this[u].url = a(p), this.analyze();
      }
      get origin() {
        return this[u].url.origin;
      }
      get pathname() {
        return this[u].url.pathname;
      }
      set pathname(p) {
        this[u].url.pathname = p;
      }
      get hash() {
        return this[u].url.hash;
      }
      set hash(p) {
        this[u].url.hash = p;
      }
      get search() {
        return this[u].url.search;
      }
      set search(p) {
        this[u].url.search = p;
      }
      get password() {
        return this[u].url.password;
      }
      set password(p) {
        this[u].url.password = p;
      }
      get username() {
        return this[u].url.username;
      }
      set username(p) {
        this[u].url.username = p;
      }
      get basePath() {
        return this[u].basePath;
      }
      set basePath(p) {
        this[u].basePath = p.startsWith("/") ? p : `/${p}`;
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
        return new c(String(this), this[u].options);
      }
    }
  }(cp)), cp;
}
var Pp = {}, Oh;
function Oj() {
  return Oh || (Oh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function n(t, a) {
      for (var u in a) Object.defineProperty(t, u, {
        enumerable: !0,
        get: a[u]
      });
    }
    n(e, {
      PageSignatureError: function() {
        return r;
      },
      RemovedPageError: function() {
        return o;
      },
      RemovedUAError: function() {
        return i;
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
    class o extends Error {
      constructor() {
        super("The request.page has been deprecated in favour of `URLPattern`.\n  Read more: https://nextjs.org/docs/messages/middleware-request-page\n  ");
      }
    }
    class i extends Error {
      constructor() {
        super("The request.ua has been removed in favour of `userAgent` function.\n  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent\n  ");
      }
    }
  }(Pp)), Pp;
}
var Op = {}, Ap, Ah;
function Aj() {
  if (Ah) return Ap;
  Ah = 1;
  var e = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, o = Object.prototype.hasOwnProperty, i = (l, R) => {
    for (var y in R)
      e(l, y, { get: R[y], enumerable: !0 });
  }, t = (l, R, y, P) => {
    if (R && typeof R == "object" || typeof R == "function")
      for (let E of r(R))
        !o.call(l, E) && E !== y && e(l, E, { get: () => R[E], enumerable: !(P = n(R, E)) || P.enumerable });
    return l;
  }, a = (l) => t(e({}, "__esModule", { value: !0 }), l), u = {};
  i(u, {
    RequestCookies: () => A,
    ResponseCookies: () => v,
    parseCookie: () => s,
    parseSetCookie: () => p,
    stringifyCookie: () => c
  }), Ap = a(u);
  function c(l) {
    var R;
    const y = [
      "path" in l && l.path && `Path=${l.path}`,
      "expires" in l && (l.expires || l.expires === 0) && `Expires=${(typeof l.expires == "number" ? new Date(l.expires) : l.expires).toUTCString()}`,
      "maxAge" in l && typeof l.maxAge == "number" && `Max-Age=${l.maxAge}`,
      "domain" in l && l.domain && `Domain=${l.domain}`,
      "secure" in l && l.secure && "Secure",
      "httpOnly" in l && l.httpOnly && "HttpOnly",
      "sameSite" in l && l.sameSite && `SameSite=${l.sameSite}`,
      "partitioned" in l && l.partitioned && "Partitioned",
      "priority" in l && l.priority && `Priority=${l.priority}`
    ].filter(Boolean), P = `${l.name}=${encodeURIComponent((R = l.value) != null ? R : "")}`;
    return y.length === 0 ? P : `${P}; ${y.join("; ")}`;
  }
  function s(l) {
    const R = /* @__PURE__ */ new Map();
    for (const y of l.split(/; */)) {
      if (!y)
        continue;
      const P = y.indexOf("=");
      if (P === -1) {
        R.set(y, "true");
        continue;
      }
      const [E, b] = [y.slice(0, P), y.slice(P + 1)];
      try {
        R.set(E, decodeURIComponent(b ?? "true"));
      } catch {
      }
    }
    return R;
  }
  function p(l) {
    if (!l)
      return;
    const [[R, y], ...P] = s(l), {
      domain: E,
      expires: b,
      httponly: x,
      maxage: N,
      path: q,
      samesite: k,
      secure: G,
      partitioned: Y,
      priority: H
    } = Object.fromEntries(
      P.map(([te, ce]) => [
        te.toLowerCase().replace(/-/g, ""),
        ce
      ])
    ), F = {
      name: R,
      value: decodeURIComponent(y),
      domain: E,
      ...b && { expires: new Date(b) },
      ...x && { httpOnly: !0 },
      ...typeof N == "string" && { maxAge: Number(N) },
      path: q,
      ...k && { sameSite: T(k) },
      ...G && { secure: !0 },
      ...H && { priority: I(H) },
      ...Y && { partitioned: !0 }
    };
    return d(F);
  }
  function d(l) {
    const R = {};
    for (const y in l)
      l[y] && (R[y] = l[y]);
    return R;
  }
  var f = ["strict", "lax", "none"];
  function T(l) {
    return l = l.toLowerCase(), f.includes(l) ? l : void 0;
  }
  var h = ["low", "medium", "high"];
  function I(l) {
    return l = l.toLowerCase(), h.includes(l) ? l : void 0;
  }
  function _(l) {
    if (!l)
      return [];
    var R = [], y = 0, P, E, b, x, N;
    function q() {
      for (; y < l.length && /\s/.test(l.charAt(y)); )
        y += 1;
      return y < l.length;
    }
    function k() {
      return E = l.charAt(y), E !== "=" && E !== ";" && E !== ",";
    }
    for (; y < l.length; ) {
      for (P = y, N = !1; q(); )
        if (E = l.charAt(y), E === ",") {
          for (b = y, y += 1, q(), x = y; y < l.length && k(); )
            y += 1;
          y < l.length && l.charAt(y) === "=" ? (N = !0, y = x, R.push(l.substring(P, b)), P = y) : y = b + 1;
        } else
          y += 1;
      (!N || y >= l.length) && R.push(l.substring(P, l.length));
    }
    return R;
  }
  var A = class {
    constructor(l) {
      this._parsed = /* @__PURE__ */ new Map(), this._headers = l;
      const R = l.get("cookie");
      if (R) {
        const y = s(R);
        for (const [P, E] of y)
          this._parsed.set(P, { name: P, value: E });
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
    get(...l) {
      const R = typeof l[0] == "string" ? l[0] : l[0].name;
      return this._parsed.get(R);
    }
    getAll(...l) {
      var R;
      const y = Array.from(this._parsed);
      if (!l.length)
        return y.map(([E, b]) => b);
      const P = typeof l[0] == "string" ? l[0] : (R = l[0]) == null ? void 0 : R.name;
      return y.filter(([E]) => E === P).map(([E, b]) => b);
    }
    has(l) {
      return this._parsed.has(l);
    }
    set(...l) {
      const [R, y] = l.length === 1 ? [l[0].name, l[0].value] : l, P = this._parsed;
      return P.set(R, { name: R, value: y }), this._headers.set(
        "cookie",
        Array.from(P).map(([E, b]) => c(b)).join("; ")
      ), this;
    }
    /**
     * Delete the cookies matching the passed name or names in the request.
     */
    delete(l) {
      const R = this._parsed, y = Array.isArray(l) ? l.map((P) => R.delete(P)) : R.delete(l);
      return this._headers.set(
        "cookie",
        Array.from(R).map(([P, E]) => c(E)).join("; ")
      ), y;
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
      return [...this._parsed.values()].map((l) => `${l.name}=${encodeURIComponent(l.value)}`).join("; ");
    }
  }, v = class {
    constructor(l) {
      this._parsed = /* @__PURE__ */ new Map();
      var R, y, P;
      this._headers = l;
      const E = (P = (y = (R = l.getSetCookie) == null ? void 0 : R.call(l)) != null ? y : l.get("set-cookie")) != null ? P : [], b = Array.isArray(E) ? E : _(E);
      for (const x of b) {
        const N = p(x);
        N && this._parsed.set(N.name, N);
      }
    }
    /**
     * {@link https://wicg.github.io/cookie-store/#CookieStore-get CookieStore#get} without the Promise.
     */
    get(...l) {
      const R = typeof l[0] == "string" ? l[0] : l[0].name;
      return this._parsed.get(R);
    }
    /**
     * {@link https://wicg.github.io/cookie-store/#CookieStore-getAll CookieStore#getAll} without the Promise.
     */
    getAll(...l) {
      var R;
      const y = Array.from(this._parsed.values());
      if (!l.length)
        return y;
      const P = typeof l[0] == "string" ? l[0] : (R = l[0]) == null ? void 0 : R.name;
      return y.filter((E) => E.name === P);
    }
    has(l) {
      return this._parsed.has(l);
    }
    /**
     * {@link https://wicg.github.io/cookie-store/#CookieStore-set CookieStore#set} without the Promise.
     */
    set(...l) {
      const [R, y, P] = l.length === 1 ? [l[0].name, l[0].value, l[0]] : l, E = this._parsed;
      return E.set(R, w({ name: R, value: y, ...P })), j(E, this._headers), this;
    }
    /**
     * {@link https://wicg.github.io/cookie-store/#CookieStore-delete CookieStore#delete} without the Promise.
     */
    delete(...l) {
      const [R, y] = typeof l[0] == "string" ? [l[0]] : [l[0].name, l[0]];
      return this.set({ ...y, name: R, value: "", expires: /* @__PURE__ */ new Date(0) });
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
      return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
    }
    toString() {
      return [...this._parsed.values()].map(c).join("; ");
    }
  };
  function j(l, R) {
    R.delete("set-cookie");
    for (const [, y] of l) {
      const P = c(y);
      R.append("set-cookie", P);
    }
  }
  function w(l = { name: "", value: "" }) {
    return typeof l.expires == "number" && (l.expires = new Date(l.expires)), l.maxAge && (l.expires = new Date(Date.now() + l.maxAge * 1e3)), (l.path === null || l.path === void 0) && (l.path = "/"), l;
  }
  return Ap;
}
var Rh;
function Rj() {
  return Rh || (Rh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function n(o, i) {
      for (var t in i) Object.defineProperty(o, t, {
        enumerable: !0,
        get: i[t]
      });
    }
    n(e, {
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
    const r = Aj();
  }(Op)), Op;
}
var Eh;
function Ej() {
  return Eh || (Eh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function n(c, s) {
      for (var p in s) Object.defineProperty(c, p, {
        enumerable: !0,
        get: s[p]
      });
    }
    n(e, {
      INTERNALS: function() {
        return a;
      },
      NextRequest: function() {
        return u;
      }
    });
    const r = Pj(), o = ZO(), i = Oj(), t = Rj(), a = Symbol("internal request");
    class u extends Request {
      constructor(s, p = {}) {
        const d = typeof s != "string" && "url" in s ? s.url : String(s);
        (0, o.validateURL)(d), process.env.NEXT_RUNTIME !== "edge" && p.body && p.duplex !== "half" && (p.duplex = "half"), s instanceof Request ? super(s, p) : super(d, p);
        const f = new r.NextURL(d, {
          headers: (0, o.toNodeOutgoingHttpHeaders)(this.headers),
          nextConfig: p.nextConfig
        });
        this[a] = {
          cookies: new t.RequestCookies(this.headers),
          nextUrl: f,
          url: process.env.__NEXT_NO_MIDDLEWARE_URL_NORMALIZE ? d : f.toString()
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
        throw new i.RemovedPageError();
      }
      /**
      * @deprecated
      * `ua` has been removed in favour of \`userAgent\` function.
      * Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
      */
      get ua() {
        throw new i.RemovedUAError();
      }
      get url() {
        return this[a].url;
      }
    }
  }(sp)), sp;
}
var Rp = {}, wh;
function wj() {
  return wh || (wh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function n(a, u) {
      for (var c in u) Object.defineProperty(a, c, {
        enumerable: !0,
        get: u[c]
      });
    }
    n(e, {
      isNodeNextRequest: function() {
        return i;
      },
      isNodeNextResponse: function() {
        return t;
      },
      isWebNextRequest: function() {
        return r;
      },
      isWebNextResponse: function() {
        return o;
      }
    });
    const r = (a) => process.env.NEXT_RUNTIME === "edge", o = (a) => process.env.NEXT_RUNTIME === "edge", i = (a) => process.env.NEXT_RUNTIME !== "edge", t = (a) => process.env.NEXT_RUNTIME !== "edge";
  }(Rp)), Rp;
}
var Sh;
function Sj() {
  return Sh || (Sh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function n(d, f) {
      for (var T in f) Object.defineProperty(d, T, {
        enumerable: !0,
        get: f[T]
      });
    }
    n(e, {
      NextRequestAdapter: function() {
        return p;
      },
      ResponseAborted: function() {
        return u;
      },
      ResponseAbortedName: function() {
        return a;
      },
      createAbortController: function() {
        return c;
      },
      signalFromNodeResponse: function() {
        return s;
      }
    });
    const r = fj(), o = ZO(), i = Ej(), t = wj(), a = "ResponseAborted";
    class u extends Error {
      constructor(...f) {
        super(...f), this.name = a;
      }
    }
    function c(d) {
      const f = new AbortController();
      return d.once("close", () => {
        d.writableFinished || f.abort(new u());
      }), f;
    }
    function s(d) {
      const { errored: f, destroyed: T } = d;
      if (f || T)
        return AbortSignal.abort(f ?? new u());
      const { signal: h } = c(d);
      return h;
    }
    class p {
      static fromBaseNextRequest(f, T) {
        if (
          // The type check here ensures that `req` is correctly typed, and the
          // environment variable check provides dead code elimination.
          process.env.NEXT_RUNTIME === "edge" && (0, t.isWebNextRequest)(f)
        )
          return p.fromWebNextRequest(f);
        if (
          // The type check here ensures that `req` is correctly typed, and the
          // environment variable check provides dead code elimination.
          process.env.NEXT_RUNTIME !== "edge" && (0, t.isNodeNextRequest)(f)
        )
          return p.fromNodeNextRequest(f, T);
        throw Object.defineProperty(new Error("Invariant: Unsupported NextRequest type"), "__NEXT_ERROR_CODE", {
          value: "E345",
          enumerable: !1,
          configurable: !0
        });
      }
      static fromNodeNextRequest(f, T) {
        let h = null;
        f.method !== "GET" && f.method !== "HEAD" && f.body && (h = f.body);
        let I;
        if (f.url.startsWith("http"))
          I = new URL(f.url);
        else {
          const _ = (0, r.getRequestMeta)(f, "initURL");
          !_ || !_.startsWith("http") ? I = new URL(f.url, "http://n") : I = new URL(f.url, _);
        }
        return new i.NextRequest(I, {
          method: f.method,
          headers: (0, o.fromNodeOutgoingHttpHeaders)(f.headers),
          duplex: "half",
          signal: T,
          // geo
          // ip
          // nextConfig
          // body can not be passed if request was aborted
          // or we get a Request body was disturbed error
          ...T.aborted ? {} : {
            body: h
          }
        });
      }
      static fromWebNextRequest(f) {
        let T = null;
        return f.method !== "GET" && f.method !== "HEAD" && (T = f.body), new i.NextRequest(f.url, {
          method: f.method,
          headers: (0, o.fromNodeOutgoingHttpHeaders)(f.headers),
          duplex: "half",
          signal: f.request.signal,
          // geo
          // ip
          // nextConfig
          // body can not be passed if request was aborted
          // or we get a Request body was disturbed error
          ...f.request.signal.aborted ? {} : {
            body: T
          }
        });
      }
    }
  }(op)), op;
}
var Ep = {}, vh;
function vj() {
  return vh || (vh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function n(u, c) {
      for (var s in c) Object.defineProperty(u, s, {
        enumerable: !0,
        get: c[s]
      });
    }
    n(e, {
      getClientComponentLoaderMetrics: function() {
        return a;
      },
      wrapClientComponentLoader: function() {
        return t;
      }
    });
    let r = 0, o = 0, i = 0;
    function t(u) {
      return "performance" in globalThis ? {
        require: (...c) => {
          const s = performance.now();
          r === 0 && (r = s);
          try {
            return i += 1, u.__next_app__.require(...c);
          } finally {
            o += performance.now() - s;
          }
        },
        loadChunk: (...c) => {
          const s = performance.now(), p = u.__next_app__.loadChunk(...c);
          return p.finally(() => {
            o += performance.now() - s;
          }), p;
        }
      } : u.__next_app__;
    }
    function a(u = {}) {
      const c = r === 0 ? void 0 : {
        clientComponentLoadStart: r,
        clientComponentLoadTimes: o,
        clientComponentLoadCount: i
      };
      return u.reset && (r = 0, o = 0, i = 0), c;
    }
  }(Ep)), Ep;
}
var Ch;
function Cj() {
  return Ch || (Ch = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function n(p, d) {
      for (var f in d) Object.defineProperty(p, f, {
        enumerable: !0,
        get: d[f]
      });
    }
    n(e, {
      isAbortError: function() {
        return u;
      },
      pipeToNodeResponse: function() {
        return s;
      }
    });
    const r = Sj(), o = kl(), i = Vl(), t = xc(), a = vj();
    function u(p) {
      return (p == null ? void 0 : p.name) === "AbortError" || (p == null ? void 0 : p.name) === r.ResponseAbortedName;
    }
    function c(p, d) {
      let f = !1, T = new o.DetachedPromise();
      function h() {
        T.resolve();
      }
      p.on("drain", h), p.once("close", () => {
        p.off("drain", h), T.resolve();
      });
      const I = new o.DetachedPromise();
      return p.once("finish", () => {
        I.resolve();
      }), new WritableStream({
        write: async (_) => {
          if (!f) {
            if (f = !0, "performance" in globalThis && process.env.NEXT_OTEL_PERFORMANCE_PREFIX) {
              const A = (0, a.getClientComponentLoaderMetrics)();
              A && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-client-component-loading`, {
                start: A.clientComponentLoadStart,
                end: A.clientComponentLoadStart + A.clientComponentLoadTimes
              });
            }
            p.flushHeaders(), (0, i.getTracer)().trace(t.NextNodeServerSpan.startResponse, {
              spanName: "start response"
            }, () => {
            });
          }
          try {
            const A = p.write(_);
            "flush" in p && typeof p.flush == "function" && p.flush(), A || (await T.promise, T = new o.DetachedPromise());
          } catch (A) {
            throw p.end(), Object.defineProperty(new Error("failed to write chunk to response", {
              cause: A
            }), "__NEXT_ERROR_CODE", {
              value: "E321",
              enumerable: !1,
              configurable: !0
            });
          }
        },
        abort: (_) => {
          p.writableFinished || p.destroy(_);
        },
        close: async () => {
          if (d && await d, !p.writableFinished)
            return p.end(), I.promise;
        }
      });
    }
    async function s(p, d, f) {
      try {
        const { errored: T, destroyed: h } = d;
        if (T || h) return;
        const I = (0, r.createAbortController)(d), _ = c(d, f);
        await p.pipeTo(_, {
          signal: I.signal
        });
      } catch (T) {
        if (u(T)) return;
        throw Object.defineProperty(new Error("failed to pipe response", {
          cause: T
        }), "__NEXT_ERROR_CODE", {
          value: "E180",
          enumerable: !1,
          configurable: !0
        });
      }
    }
  }(ip)), ip;
}
var Mh;
function Mj() {
  return Mh || (Mh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const n = pj(), r = Cj();
    class o {
      /**
      * Creates a new RenderResult instance from a static response.
      *
      * @param value the static response value
      * @returns a new RenderResult instance
      */
      static fromStatic(t) {
        return new o(t, {
          metadata: {}
        });
      }
      constructor(t, { contentType: a, waitUntil: u, metadata: c }) {
        this.response = t, this.contentType = a, this.metadata = c, this.waitUntil = u;
      }
      assignMetadata(t) {
        Object.assign(this.metadata, t);
      }
      /**
      * Returns true if the response is null. It can be null if the response was
      * not found or was already sent.
      */
      get isNull() {
        return this.response === null;
      }
      /**
      * Returns false if the response is a string. It can be a string if the page
      * was prerendered. If it's not, then it was generated dynamically.
      */
      get isDynamic() {
        return typeof this.response != "string";
      }
      toUnchunkedBuffer(t = !1) {
        if (this.response === null)
          throw Object.defineProperty(new Error("Invariant: null responses cannot be unchunked"), "__NEXT_ERROR_CODE", {
            value: "E274",
            enumerable: !1,
            configurable: !0
          });
        if (typeof this.response != "string") {
          if (!t)
            throw Object.defineProperty(new Error("Invariant: dynamic responses cannot be unchunked. This is a bug in Next.js"), "__NEXT_ERROR_CODE", {
              value: "E81",
              enumerable: !1,
              configurable: !0
            });
          return (0, n.streamToBuffer)(this.readable);
        }
        return Buffer.from(this.response);
      }
      toUnchunkedString(t = !1) {
        if (this.response === null)
          throw Object.defineProperty(new Error("Invariant: null responses cannot be unchunked"), "__NEXT_ERROR_CODE", {
            value: "E274",
            enumerable: !1,
            configurable: !0
          });
        if (typeof this.response != "string") {
          if (!t)
            throw Object.defineProperty(new Error("Invariant: dynamic responses cannot be unchunked. This is a bug in Next.js"), "__NEXT_ERROR_CODE", {
              value: "E81",
              enumerable: !1,
              configurable: !0
            });
          return (0, n.streamToString)(this.readable);
        }
        return this.response;
      }
      /**
      * Returns the response if it is a stream, or throws an error if it is a
      * string.
      */
      get readable() {
        if (this.response === null)
          throw Object.defineProperty(new Error("Invariant: null responses cannot be streamed"), "__NEXT_ERROR_CODE", {
            value: "E14",
            enumerable: !1,
            configurable: !0
          });
        if (typeof this.response == "string")
          throw Object.defineProperty(new Error("Invariant: static responses cannot be streamed"), "__NEXT_ERROR_CODE", {
            value: "E151",
            enumerable: !1,
            configurable: !0
          });
        return Buffer.isBuffer(this.response) ? (0, n.streamFromBuffer)(this.response) : Array.isArray(this.response) ? (0, n.chainStreams)(...this.response) : this.response;
      }
      /**
      * Chains a new stream to the response. This will convert the response to an
      * array of streams if it is not already one and will add the new stream to
      * the end. When this response is piped, all of the streams will be piped
      * one after the other.
      *
      * @param readable The new stream to chain
      */
      chain(t) {
        if (this.response === null)
          throw Object.defineProperty(new Error("Invariant: response is null. This is a bug in Next.js"), "__NEXT_ERROR_CODE", {
            value: "E258",
            enumerable: !1,
            configurable: !0
          });
        let a;
        typeof this.response == "string" ? a = [
          (0, n.streamFromString)(this.response)
        ] : Array.isArray(this.response) ? a = this.response : Buffer.isBuffer(this.response) ? a = [
          (0, n.streamFromBuffer)(this.response)
        ] : a = [
          this.response
        ], a.push(t), this.response = a;
      }
      /**
      * Pipes the response to a writable stream. This will close/cancel the
      * writable stream if an error is encountered. If this doesn't throw, then
      * the writable stream will be closed or aborted.
      *
      * @param writable Writable stream to pipe the response to
      */
      async pipeTo(t) {
        try {
          await this.readable.pipeTo(t, {
            // We want to close the writable stream ourselves so that we can wait
            // for the waitUntil promise to resolve before closing it. If an error
            // is encountered, we'll abort the writable stream if we swallowed the
            // error.
            preventClose: !0
          }), this.waitUntil && await this.waitUntil, await t.close();
        } catch (a) {
          if ((0, r.isAbortError)(a)) {
            await t.abort(a);
            return;
          }
          throw a;
        }
      }
      /**
      * Pipes the response to a node response. This will close/cancel the node
      * response if an error is encountered.
      *
      * @param res
      */
      async pipeToNodeResponse(t) {
        await (0, r.pipeToNodeResponse)(this.readable, t, this.waitUntil);
      }
    }
  }(ep)), ep;
}
var wp = {}, xh;
function xj() {
  return xh || (xh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "RouteKind", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    var n = /* @__PURE__ */ function(r) {
      return r.PAGES = "PAGES", r.PAGES_API = "PAGES_API", r.APP_PAGE = "APP_PAGE", r.APP_ROUTE = "APP_ROUTE", r.IMAGE = "IMAGE", r;
    }({});
  }(wp)), wp;
}
var $h;
function $j() {
  return $h || ($h = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function n(s, p) {
      for (var d in p) Object.defineProperty(s, d, {
        enumerable: !0,
        get: p[d]
      });
    }
    n(e, {
      fromResponseCacheEntry: function() {
        return a;
      },
      routeKindToIncrementalCacheKind: function() {
        return c;
      },
      toResponseCacheEntry: function() {
        return u;
      }
    });
    const r = QO(), o = /* @__PURE__ */ t(Mj()), i = xj();
    function t(s) {
      return s && s.__esModule ? s : {
        default: s
      };
    }
    async function a(s) {
      var p, d;
      return {
        ...s,
        value: ((p = s.value) == null ? void 0 : p.kind) === r.CachedRouteKind.PAGES ? {
          kind: r.CachedRouteKind.PAGES,
          html: await s.value.html.toUnchunkedString(!0),
          pageData: s.value.pageData,
          headers: s.value.headers,
          status: s.value.status
        } : ((d = s.value) == null ? void 0 : d.kind) === r.CachedRouteKind.APP_PAGE ? {
          kind: r.CachedRouteKind.APP_PAGE,
          html: await s.value.html.toUnchunkedString(!0),
          postponed: s.value.postponed,
          rscData: s.value.rscData,
          headers: s.value.headers,
          status: s.value.status,
          segmentData: s.value.segmentData
        } : s.value
      };
    }
    async function u(s) {
      var p, d;
      return s ? {
        isMiss: s.isMiss,
        isStale: s.isStale,
        cacheControl: s.cacheControl,
        isFallback: s.isFallback,
        value: ((p = s.value) == null ? void 0 : p.kind) === r.CachedRouteKind.PAGES ? {
          kind: r.CachedRouteKind.PAGES,
          html: o.default.fromStatic(s.value.html),
          pageData: s.value.pageData,
          headers: s.value.headers,
          status: s.value.status
        } : ((d = s.value) == null ? void 0 : d.kind) === r.CachedRouteKind.APP_PAGE ? {
          kind: r.CachedRouteKind.APP_PAGE,
          html: o.default.fromStatic(s.value.html),
          rscData: s.value.rscData,
          headers: s.value.headers,
          status: s.value.status,
          postponed: s.value.postponed,
          segmentData: s.value.segmentData
        } : s.value
      } : null;
    }
    function c(s) {
      switch (s) {
        case i.RouteKind.PAGES:
          return r.IncrementalCacheKind.PAGES;
        case i.RouteKind.APP_PAGE:
          return r.IncrementalCacheKind.APP_PAGE;
        case i.RouteKind.IMAGE:
          return r.IncrementalCacheKind.IMAGE;
        case i.RouteKind.APP_ROUTE:
          return r.IncrementalCacheKind.APP_ROUTE;
        default:
          throw Object.defineProperty(new Error(`Unexpected route kind ${s}`), "__NEXT_ERROR_CODE", {
            value: "E64",
            enumerable: !1,
            configurable: !0
          });
      }
    }
  }(Qd)), Qd;
}
var Nh;
function nA() {
  return Nh || (Nh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return t;
      }
    });
    const n = uj(), r = Bc(), o = $j();
    i(QO(), e);
    function i(a, u) {
      return Object.keys(a).forEach(function(c) {
        c !== "default" && !Object.prototype.hasOwnProperty.call(u, c) && Object.defineProperty(u, c, {
          enumerable: !0,
          get: function() {
            return a[c];
          }
        });
      }), a;
    }
    class t {
      constructor(u) {
        this.batcher = n.Batcher.create({
          // Ensure on-demand revalidate doesn't block normal requests, it should be
          // safe to run an on-demand revalidate for the same key as a normal request.
          cacheKeyFn: ({ key: s, isOnDemandRevalidate: p }) => `${s}-${p ? "1" : "0"}`,
          // We wait to do any async work until after we've added our promise to
          // `pendingResponses` to ensure that any any other calls will reuse the
          // same promise until we've fully finished our work.
          schedulerFn: r.scheduleOnNextTick
        });
        const c = "minimalMode";
        this[c] = u;
      }
      async get(u, c, s) {
        if (!u)
          return c({
            hasResolved: !1,
            previousCacheEntry: null
          });
        const { incrementalCache: p, isOnDemandRevalidate: d = !1, isFallback: f = !1, isRoutePPREnabled: T = !1 } = s, h = await this.batcher.batch({
          key: u,
          isOnDemandRevalidate: d
        }, async (I, _) => {
          var A;
          if (this.minimalMode && ((A = this.previousCacheItem) == null ? void 0 : A.key) === I && this.previousCacheItem.expiresAt > Date.now())
            return this.previousCacheItem.entry;
          const v = (0, o.routeKindToIncrementalCacheKind)(s.routeKind);
          let j = !1, w = null;
          try {
            if (w = this.minimalMode ? null : await p.get(u, {
              kind: v,
              isRoutePPREnabled: s.isRoutePPREnabled,
              isFallback: f
            }), w && !d && (_(w), j = !0, !w.isStale || s.isPrefetch))
              return null;
            const l = await c({
              hasResolved: j,
              previousCacheEntry: w,
              isRevalidating: !0
            });
            if (!l)
              return this.minimalMode && (this.previousCacheItem = void 0), null;
            const R = await (0, o.fromResponseCacheEntry)({
              ...l,
              isMiss: !w
            });
            return R ? (!d && !j && (_(R), j = !0), R.cacheControl && (this.minimalMode ? this.previousCacheItem = {
              key: I,
              entry: R,
              expiresAt: Date.now() + 1e3
            } : await p.set(u, R.value, {
              cacheControl: R.cacheControl,
              isRoutePPREnabled: T,
              isFallback: f
            })), R) : (this.minimalMode && (this.previousCacheItem = void 0), null);
          } catch (l) {
            if (w != null && w.cacheControl) {
              const R = Math.min(Math.max(w.cacheControl.revalidate || 3, 3), 30), y = w.cacheControl.expire === void 0 ? void 0 : Math.max(R + 3, w.cacheControl.expire);
              await p.set(u, w.value, {
                cacheControl: {
                  revalidate: R,
                  expire: y
                },
                isRoutePPREnabled: T,
                isFallback: f
              });
            }
            if (j)
              return console.error(l), null;
            throw l;
          }
        });
        return (0, o.toResponseCacheEntry)(h);
      }
    }
  }(zd)), zd;
}
var Bh;
function tA() {
  return Bh || (Bh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function n(j, w) {
      for (var l in w) Object.defineProperty(j, l, {
        enumerable: !0,
        get: w[l]
      });
    }
    n(e, {
      NEXT_PATCH_SYMBOL: function() {
        return f;
      },
      createPatchedFetcher: function() {
        return A;
      },
      patchFetch: function() {
        return v;
      },
      validateRevalidate: function() {
        return h;
      },
      validateTags: function() {
        return I;
      }
    });
    const r = xc(), o = Vl(), i = Mc(), t = Wl(), a = YO(), u = aj(), c = nA(), s = Bc(), p = JO(), d = process.env.NEXT_RUNTIME === "edge", f = Symbol.for("next-patch");
    function T() {
      return globalThis[f] === !0;
    }
    function h(j, w) {
      try {
        let l;
        if (j === !1)
          l = i.INFINITE_CACHE;
        else if (typeof j == "number" && !isNaN(j) && j > -1)
          l = j;
        else if (typeof j < "u")
          throw Object.defineProperty(new Error(`Invalid revalidate value "${j}" on "${w}", must be a non-negative number or false`), "__NEXT_ERROR_CODE", {
            value: "E179",
            enumerable: !1,
            configurable: !0
          });
        return l;
      } catch (l) {
        if (l instanceof Error && l.message.includes("Invalid revalidate"))
          throw l;
        return;
      }
    }
    function I(j, w) {
      const l = [], R = [];
      for (let y = 0; y < j.length; y++) {
        const P = j[y];
        if (typeof P != "string" ? R.push({
          tag: P,
          reason: "invalid type, must be a string"
        }) : P.length > i.NEXT_CACHE_TAG_MAX_LENGTH ? R.push({
          tag: P,
          reason: `exceeded max length of ${i.NEXT_CACHE_TAG_MAX_LENGTH}`
        }) : l.push(P), l.length > i.NEXT_CACHE_TAG_MAX_ITEMS) {
          console.warn(`Warning: exceeded max tag count for ${w}, dropped tags:`, j.slice(y).join(", "));
          break;
        }
      }
      if (R.length > 0) {
        console.warn(`Warning: invalid tags passed to ${w}: `);
        for (const { tag: y, reason: P } of R)
          console.log(`tag: "${y}" ${P}`);
      }
      return l;
    }
    function _(j, w) {
      var l;
      if (!j || (l = j.requestEndedState) != null && l.ended) return;
      const R = (!!process.env.NEXT_DEBUG_BUILD || process.env.NEXT_SSG_FETCH_METRICS === "1") && j.isStaticGeneration, y = process.env.NODE_ENV === "development";
      // The only time we want to track fetch metrics outside of development is when
      // we are performing a static generation & we are in debug mode.
      !R && !y || (j.fetchMetrics ?? (j.fetchMetrics = []), j.fetchMetrics.push({
        ...w,
        end: performance.timeOrigin + performance.now(),
        idx: j.nextFetchId || 0
      }));
    }
    function A(j, { workAsyncStorage: w, workUnitAsyncStorage: l }) {
      const R = async (y, P) => {
        var E, b;
        let x;
        try {
          x = new URL(y instanceof Request ? y.url : y), x.username = "", x.password = "";
        } catch {
          x = void 0;
        }
        const N = (x == null ? void 0 : x.href) ?? "", q = (P == null || (E = P.method) == null ? void 0 : E.toUpperCase()) || "GET", k = (P == null || (b = P.next) == null ? void 0 : b.internal) === !0, G = process.env.NEXT_OTEL_FETCH_DISABLED === "1", Y = k ? void 0 : performance.timeOrigin + performance.now(), H = w.getStore(), F = l.getStore();
        let te = F && F.type === "prerender" ? F.cacheSignal : null;
        te && te.beginRead();
        const ce = (0, o.getTracer)().trace(k ? r.NextNodeServerSpan.internalFetch : r.AppRenderSpan.fetch, {
          hideSpan: G,
          kind: o.SpanKind.CLIENT,
          spanName: [
            "fetch",
            q,
            N
          ].filter(Boolean).join(" "),
          attributes: {
            "http.url": N,
            "http.method": q,
            "net.peer.name": x == null ? void 0 : x.hostname,
            "net.peer.port": (x == null ? void 0 : x.port) || void 0
          }
        }, async () => {
          var Te;
          if (k || !H || H.isDraftMode)
            return j(y, P);
          const Oe = y && typeof y == "object" && typeof y.method == "string", we = (L) => (P == null ? void 0 : P[L]) || (Oe ? y[L] : null);
          let ye;
          const Ke = (L) => {
            var ie, z, fe;
            return typeof (P == null || (ie = P.next) == null ? void 0 : ie[L]) < "u" ? P == null || (z = P.next) == null ? void 0 : z[L] : Oe ? (fe = y.next) == null ? void 0 : fe[L] : void 0;
          };
          let J = Ke("revalidate");
          const re = I(Ke("tags") || [], `fetch ${y.toString()}`), _e = F && (F.type === "cache" || F.type === "prerender" || F.type === "prerender-ppr" || F.type === "prerender-legacy") ? F : void 0;
          if (_e && Array.isArray(re)) {
            const L = _e.tags ?? (_e.tags = []);
            for (const ie of re)
              L.includes(ie) || L.push(ie);
          }
          const Ee = F == null ? void 0 : F.implicitTags, ne = F && F.type === "unstable-cache" ? "force-no-store" : H.fetchCache, K = !!H.isUnstableNoStore;
          let $ = we("cache"), g = "", O;
          typeof $ == "string" && typeof J < "u" && // revalidate: 0 and cache: force-cache
          ($ === "force-cache" && J === 0 || // revalidate: >0 or revalidate: false and cache: no-store
          $ === "no-store" && (J > 0 || J === !1)) && (O = `Specified "cache: ${$}" and "revalidate: ${J}", only one should be specified.`, $ = void 0, J = void 0);
          const D = (
            // fetch config itself signals not to cache
            $ === "no-cache" || $ === "no-store" || // the fetch isn't explicitly caching and the segment level cache config signals not to cache
            // note: `pageFetchCacheMode` is also set by being in an unstable_cache context.
            ne === "force-no-store" || ne === "only-no-store"
          ), V = !ne && !$ && !J && H.forceDynamic;
          // force-cache was specified without a revalidate value. We set the revalidate value to false
          // which will signal the cache to not revalidate
          $ === "force-cache" && typeof J > "u" ? J = !1 : (
            // if we are inside of "use cache"/"unstable_cache"
            // we shouldn't set the revalidate to 0 as it's overridden
            // by the cache context
            (F == null ? void 0 : F.type) !== "cache" && (D || V) && (J = 0)
          ), ($ === "no-cache" || $ === "no-store") && (g = `cache: ${$}`), ye = h(J, H.route);
          const m = we("headers"), Z = typeof (m == null ? void 0 : m.get) == "function" ? m : new Headers(m || {}), X = Z.get("authorization") || Z.get("cookie"), U = ![
            "get",
            "head"
          ].includes(((Te = we("method")) == null ? void 0 : Te.toLowerCase()) || "get"), se = (
            // eslint-disable-next-line eqeqeq
            ne == null && // eslint-disable-next-line eqeqeq
            ($ == null || // when considering whether to opt into the default "no-cache" fetch semantics,
            // a "default" cache config should be treated the same as no cache config
            $ === "default") && // eslint-disable-next-line eqeqeq
            J == null
          ), ue = (
            // this condition is hit for null/undefined
            // eslint-disable-next-line eqeqeq
            se && // we disable automatic no caching behavior during build time SSG so that we can still
            // leverage the fetch cache between SSG workers
            !H.isPrerendering || (X || U) && _e && _e.revalidate === 0
          );
          if (se && F !== void 0 && F.type === "prerender")
            return te && (te.endRead(), te = null), (0, a.makeHangingPromise)(F.renderSignal, "fetch()");
          switch (ne) {
            case "force-no-store": {
              g = "fetchCache = force-no-store";
              break;
            }
            case "only-no-store": {
              if ($ === "force-cache" || typeof ye < "u" && ye > 0)
                throw Object.defineProperty(new Error(`cache: 'force-cache' used on fetch for ${N} with 'export const fetchCache = 'only-no-store'`), "__NEXT_ERROR_CODE", {
                  value: "E448",
                  enumerable: !1,
                  configurable: !0
                });
              g = "fetchCache = only-no-store";
              break;
            }
            case "only-cache": {
              if ($ === "no-store")
                throw Object.defineProperty(new Error(`cache: 'no-store' used on fetch for ${N} with 'export const fetchCache = 'only-cache'`), "__NEXT_ERROR_CODE", {
                  value: "E521",
                  enumerable: !1,
                  configurable: !0
                });
              break;
            }
            case "force-cache": {
              (typeof J > "u" || J === 0) && (g = "fetchCache = force-cache", ye = i.INFINITE_CACHE);
              break;
            }
          }
          if (typeof ye > "u" ? ne === "default-cache" && !K ? (ye = i.INFINITE_CACHE, g = "fetchCache = default-cache") : ne === "default-no-store" ? (ye = 0, g = "fetchCache = default-no-store") : K ? (ye = 0, g = "noStore call") : ue ? (ye = 0, g = "auto no cache") : (g = "auto cache", ye = _e ? _e.revalidate : i.INFINITE_CACHE) : g || (g = `revalidate: ${ye}`), // when force static is configured we don't bail from
          // `revalidate: 0` values
          !(H.forceStatic && ye === 0) && // we don't consider autoNoCache to switch to dynamic for ISR
          !ue && // If the revalidate value isn't currently set or the value is less
          // than the current revalidate value, we should update the revalidate
          // value.
          _e && ye < _e.revalidate) {
            if (ye === 0) {
              if (F && F.type === "prerender")
                return te && (te.endRead(), te = null), (0, a.makeHangingPromise)(F.renderSignal, "fetch()");
              (0, t.markCurrentScopeAsDynamic)(H, F, `revalidate: 0 fetch ${y} ${H.route}`);
            }
            _e && J === ye && (_e.revalidate = ye);
          }
          const ge = typeof ye == "number" && ye > 0;
          let oe;
          const { incrementalCache: he } = H, xe = (F == null ? void 0 : F.type) === "request" || (F == null ? void 0 : F.type) === "cache" ? F : void 0;
          if (he && (ge || xe != null && xe.serverComponentsHmrCache))
            try {
              oe = await he.generateCacheKey(N, Oe ? y : P);
            } catch {
              console.error("Failed to generate cache key for", y);
            }
          const Ce = H.nextFetchId ?? 1;
          H.nextFetchId = Ce + 1;
          let S = () => Promise.resolve();
          const Se = async (L, ie) => {
            const z = [
              "cache",
              "credentials",
              "headers",
              "integrity",
              "keepalive",
              "method",
              "mode",
              "redirect",
              "referrer",
              "referrerPolicy",
              "window",
              "duplex",
              // don't pass through signal when revalidating
              ...L ? [] : [
                "signal"
              ]
            ];
            if (Oe) {
              const ae = y, le = {
                body: ae._ogBody || ae.body
              };
              for (const Me of z)
                le[Me] = ae[Me];
              y = new Request(ae.url, le);
            } else if (P) {
              const { _ogBody: ae, body: le, signal: Me, ...Ae } = P;
              P = {
                ...Ae,
                body: ae || le,
                signal: L ? void 0 : Me
              };
            }
            const fe = {
              ...P,
              next: {
                ...P == null ? void 0 : P.next,
                fetchType: "origin",
                fetchIdx: Ce
              }
            };
            return j(y, fe).then(async (ae) => {
              if (!L && Y && _(H, {
                start: Y,
                url: N,
                cacheReason: ie || g,
                cacheStatus: ye === 0 || ie ? "skip" : "miss",
                cacheWarning: O,
                status: ae.status,
                method: fe.method || "GET"
              }), ae.status === 200 && he && oe && (ge || xe != null && xe.serverComponentsHmrCache)) {
                const le = ye >= i.INFINITE_CACHE ? i.CACHE_ONE_YEAR : ye;
                if (F && F.type === "prerender") {
                  const Me = await ae.arrayBuffer(), Ae = {
                    headers: Object.fromEntries(ae.headers.entries()),
                    body: Buffer.from(Me).toString("base64"),
                    status: ae.status,
                    url: ae.url
                  };
                  return await he.set(oe, {
                    kind: c.CachedRouteKind.FETCH,
                    data: Ae,
                    revalidate: le
                  }, {
                    fetchCache: !0,
                    fetchUrl: N,
                    fetchIdx: Ce,
                    tags: re
                  }), await S(), new Response(Me, {
                    headers: ae.headers,
                    status: ae.status,
                    statusText: ae.statusText
                  });
                } else {
                  const [Me, Ae] = (0, p.cloneResponse)(ae);
                  return Me.arrayBuffer().then(async (bn) => {
                    var C;
                    const M = Buffer.from(bn), ve = {
                      headers: Object.fromEntries(Me.headers.entries()),
                      body: M.toString("base64"),
                      status: Me.status,
                      url: Me.url
                    };
                    xe == null || (C = xe.serverComponentsHmrCache) == null || C.set(oe, ve), ge && await he.set(oe, {
                      kind: c.CachedRouteKind.FETCH,
                      data: ve,
                      revalidate: le
                    }, {
                      fetchCache: !0,
                      fetchUrl: N,
                      fetchIdx: Ce,
                      tags: re
                    });
                  }).catch((bn) => console.warn("Failed to set fetch cache", y, bn)).finally(S), Ae;
                }
              }
              return await S(), ae;
            }).catch((ae) => {
              throw S(), ae;
            });
          };
          let Ye, Kt = !1, eo = !1;
          if (oe && he) {
            let L;
            if (xe != null && xe.isHmrRefresh && xe.serverComponentsHmrCache && (L = xe.serverComponentsHmrCache.get(oe), eo = !0), ge && !L) {
              S = await he.lock(oe);
              const ie = H.isOnDemandRevalidate ? null : await he.get(oe, {
                kind: c.IncrementalCacheKind.FETCH,
                revalidate: ye,
                fetchUrl: N,
                fetchIdx: Ce,
                tags: re,
                softTags: Ee == null ? void 0 : Ee.tags
              });
              if (se && F && F.type === "prerender" && await (0, s.waitAtLeastOneReactRenderTask)(), ie ? await S() : Ye = "cache-control: no-cache (hard refresh)", ie != null && ie.value && ie.value.kind === c.CachedRouteKind.FETCH)
                if (H.isRevalidate && ie.isStale)
                  Kt = !0;
                else {
                  if (ie.isStale && (H.pendingRevalidates ?? (H.pendingRevalidates = {}), !H.pendingRevalidates[oe])) {
                    const z = Se(!0).then(async (fe) => ({
                      body: await fe.arrayBuffer(),
                      headers: fe.headers,
                      status: fe.status,
                      statusText: fe.statusText
                    })).finally(() => {
                      H.pendingRevalidates ?? (H.pendingRevalidates = {}), delete H.pendingRevalidates[oe || ""];
                    });
                    z.catch(console.error), H.pendingRevalidates[oe] = z;
                  }
                  L = ie.value.data;
                }
            }
            if (L) {
              Y && _(H, {
                start: Y,
                url: N,
                cacheReason: g,
                cacheStatus: eo ? "hmr" : "hit",
                cacheWarning: O,
                status: L.status || 200,
                method: (P == null ? void 0 : P.method) || "GET"
              });
              const ie = new Response(Buffer.from(L.body, "base64"), {
                headers: L.headers,
                status: L.status
              });
              return Object.defineProperty(ie, "url", {
                value: L.url
              }), ie;
            }
          }
          if (H.isStaticGeneration && P && typeof P == "object") {
            const { cache: L } = P;
            if (d && delete P.cache, L === "no-store") {
              if (F && F.type === "prerender")
                return te && (te.endRead(), te = null), (0, a.makeHangingPromise)(F.renderSignal, "fetch()");
              (0, t.markCurrentScopeAsDynamic)(H, F, `no-store fetch ${y} ${H.route}`);
            }
            const ie = "next" in P, { next: z = {} } = P;
            if (typeof z.revalidate == "number" && _e && z.revalidate < _e.revalidate) {
              if (z.revalidate === 0) {
                if (F && F.type === "prerender")
                  return (0, a.makeHangingPromise)(F.renderSignal, "fetch()");
                (0, t.markCurrentScopeAsDynamic)(H, F, `revalidate: 0 fetch ${y} ${H.route}`);
              }
              (!H.forceStatic || z.revalidate !== 0) && (_e.revalidate = z.revalidate);
            }
            ie && delete P.next;
          }
          if (oe && Kt) {
            const L = oe;
            H.pendingRevalidates ?? (H.pendingRevalidates = {});
            let ie = H.pendingRevalidates[L];
            if (ie) {
              const fe = await ie;
              return new Response(fe.body, {
                headers: fe.headers,
                status: fe.status,
                statusText: fe.statusText
              });
            }
            const z = Se(!0, Ye).then(p.cloneResponse);
            return ie = z.then(async (fe) => {
              const ae = fe[0];
              return {
                body: await ae.arrayBuffer(),
                headers: ae.headers,
                status: ae.status,
                statusText: ae.statusText
              };
            }).finally(() => {
              var fe;
              (fe = H.pendingRevalidates) != null && fe[L] && delete H.pendingRevalidates[L];
            }), ie.catch(() => {
            }), H.pendingRevalidates[L] = ie, z.then((fe) => fe[1]);
          } else
            return Se(!1, Ye);
        });
        if (te)
          try {
            return await ce;
          } finally {
            te && te.endRead();
          }
        return ce;
      };
      return R.__nextPatched = !0, R.__nextGetStaticStore = () => w, R._nextOriginalFetch = j, globalThis[f] = !0, R;
    }
    function v(j) {
      if (T()) return;
      const w = (0, u.createDedupeFetch)(globalThis.fetch);
      globalThis.fetch = A(w, j);
    }
  }(Ed)), Ed;
}
var jh;
function Nj() {
  return jh || (jh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "unstable_cache", {
      enumerable: !0,
      get: function() {
        return c;
      }
    });
    const n = Mc(), r = tA(), o = qa(), i = jo(), t = nA();
    let a = 0;
    async function u(s, p, d, f, T, h, I) {
      await p.set(d, {
        kind: t.CachedRouteKind.FETCH,
        data: {
          headers: {},
          // TODO: handle non-JSON values?
          body: JSON.stringify(s),
          status: 200,
          url: ""
        },
        revalidate: typeof T != "number" ? n.CACHE_ONE_YEAR : T
      }, {
        fetchCache: !0,
        tags: f,
        fetchIdx: h,
        fetchUrl: I
      });
    }
    function c(s, p, d = {}) {
      if (d.revalidate === 0)
        throw Object.defineProperty(new Error(`Invariant revalidate: 0 can not be passed to unstable_cache(), must be "false" or "> 0" ${s.toString()}`), "__NEXT_ERROR_CODE", {
          value: "E57",
          enumerable: !1,
          configurable: !0
        });
      const f = d.tags ? (0, r.validateTags)(d.tags, `unstable_cache ${s.toString()}`) : [];
      (0, r.validateRevalidate)(d.revalidate, `unstable_cache ${s.name || s.toString()}`);
      const T = `${s.toString()}-${Array.isArray(p) && p.join(",")}`;
      return async (...I) => {
        const _ = o.workAsyncStorage.getStore(), A = i.workUnitAsyncStorage.getStore(), v = (_ == null ? void 0 : _.incrementalCache) || globalThis.__incrementalCache;
        if (!v)
          throw Object.defineProperty(new Error(`Invariant: incrementalCache missing in unstable_cache ${s.toString()}`), "__NEXT_ERROR_CODE", {
            value: "E469",
            enumerable: !1,
            configurable: !0
          });
        const j = v, w = A && A.type === "prerender" ? A.cacheSignal : null;
        w && w.beginRead();
        try {
          const l = A && A.type === "request" ? A : void 0, R = (l == null ? void 0 : l.url.pathname) ?? (_ == null ? void 0 : _.route) ?? "", y = new URLSearchParams((l == null ? void 0 : l.url.search) ?? ""), E = [
            ...y.keys()
          ].sort((Y, H) => Y.localeCompare(H)).map((Y) => `${Y}=${y.get(Y)}`).join("&"), b = `${T}-${JSON.stringify(I)}`, x = await j.generateCacheKey(b), N = `unstable_cache ${R}${E.length ? "?" : ""}${E} ${s.name ? ` ${s.name}` : x}`, q = (_ ? _.nextFetchId : a) ?? 1, k = A == null ? void 0 : A.implicitTags, G = {
            type: "unstable-cache",
            phase: "render",
            implicitTags: k,
            draftMode: A && _ && (0, i.getDraftModeProviderForCacheScope)(_, A)
          };
          if (_) {
            if (_.nextFetchId = q + 1, A && (A.type === "cache" || A.type === "prerender" || A.type === "prerender-ppr" || A.type === "prerender-legacy")) {
              typeof d.revalidate == "number" && (A.revalidate < d.revalidate || (A.revalidate = d.revalidate));
              const F = A.tags;
              if (F === null)
                A.tags = f.slice();
              else
                for (const te of f)
                  F.includes(te) || F.push(te);
            }
            if (
              // when we are nested inside of other unstable_cache's
              // we should bypass cache similar to fetches
              !(A && A.type === "unstable-cache") && _.fetchCache !== "force-no-store" && !_.isOnDemandRevalidate && !j.isOnDemandRevalidate && !_.isDraftMode
            ) {
              const F = await j.get(x, {
                kind: t.IncrementalCacheKind.FETCH,
                revalidate: d.revalidate,
                tags: f,
                softTags: k == null ? void 0 : k.tags,
                fetchIdx: q,
                fetchUrl: N
              });
              if (F && F.value)
                if (F.value.kind !== t.CachedRouteKind.FETCH)
                  console.error(`Invariant invalid cacheEntry returned for ${b}`);
                else {
                  const te = F.value.data.body !== void 0 ? JSON.parse(F.value.data.body) : void 0;
                  return F.isStale && (_.pendingRevalidates || (_.pendingRevalidates = {}), _.pendingRevalidates[b] = i.workUnitAsyncStorage.run(G, s, ...I).then((ce) => u(ce, j, x, f, d.revalidate, q, N)).catch((ce) => console.error(`revalidating cache with key: ${b}`, ce))), te;
                }
            }
            const H = await i.workUnitAsyncStorage.run(G, s, ...I);
            return _.isDraftMode || u(H, j, x, f, d.revalidate, q, N), H;
          } else {
            if (a += 1, !j.isOnDemandRevalidate) {
              const H = await j.get(x, {
                kind: t.IncrementalCacheKind.FETCH,
                revalidate: d.revalidate,
                tags: f,
                fetchIdx: q,
                fetchUrl: N,
                softTags: k == null ? void 0 : k.tags
              });
              if (H && H.value) {
                if (H.value.kind !== t.CachedRouteKind.FETCH)
                  console.error(`Invariant invalid cacheEntry returned for ${b}`);
                else if (!H.isStale)
                  return H.value.data.body !== void 0 ? JSON.parse(H.value.data.body) : void 0;
              }
            }
            const Y = await i.workUnitAsyncStorage.run(G, s, ...I);
            return u(Y, j, x, f, d.revalidate, q, N), Y;
          }
        } finally {
          w && w.endRead();
        }
      };
    }
  }(Ad)), Ad;
}
var Sp = {}, vp = {}, Cp = {}, Dh;
function Bj() {
  return Dh || (Dh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function n(t, a) {
      for (var u in a) Object.defineProperty(t, u, {
        enumerable: !0,
        get: a[u]
      });
    }
    n(e, {
      getSortedRouteObjects: function() {
        return i;
      },
      getSortedRoutes: function() {
        return o;
      }
    });
    class r {
      insert(a) {
        this._insert(a.split("/").filter(Boolean), [], !1);
      }
      smoosh() {
        return this._smoosh();
      }
      _smoosh(a) {
        a === void 0 && (a = "/");
        const u = [
          ...this.children.keys()
        ].sort();
        this.slugName !== null && u.splice(u.indexOf("[]"), 1), this.restSlugName !== null && u.splice(u.indexOf("[...]"), 1), this.optionalRestSlugName !== null && u.splice(u.indexOf("[[...]]"), 1);
        const c = u.map((s) => this.children.get(s)._smoosh("" + a + s + "/")).reduce((s, p) => [
          ...s,
          ...p
        ], []);
        if (this.slugName !== null && c.push(...this.children.get("[]")._smoosh(a + "[" + this.slugName + "]/")), !this.placeholder) {
          const s = a === "/" ? "/" : a.slice(0, -1);
          if (this.optionalRestSlugName != null)
            throw Object.defineProperty(new Error('You cannot define a route with the same specificity as a optional catch-all route ("' + s + '" and "' + s + "[[..." + this.optionalRestSlugName + ']]").'), "__NEXT_ERROR_CODE", {
              value: "E458",
              enumerable: !1,
              configurable: !0
            });
          c.unshift(s);
        }
        return this.restSlugName !== null && c.push(...this.children.get("[...]")._smoosh(a + "[..." + this.restSlugName + "]/")), this.optionalRestSlugName !== null && c.push(...this.children.get("[[...]]")._smoosh(a + "[[..." + this.optionalRestSlugName + "]]/")), c;
      }
      _insert(a, u, c) {
        if (a.length === 0) {
          this.placeholder = !1;
          return;
        }
        if (c)
          throw Object.defineProperty(new Error("Catch-all must be the last part of the URL."), "__NEXT_ERROR_CODE", {
            value: "E392",
            enumerable: !1,
            configurable: !0
          });
        let s = a[0];
        if (s.startsWith("[") && s.endsWith("]")) {
          let f = function(T, h) {
            if (T !== null && T !== h)
              throw Object.defineProperty(new Error("You cannot use different slug names for the same dynamic path ('" + T + "' !== '" + h + "')."), "__NEXT_ERROR_CODE", {
                value: "E337",
                enumerable: !1,
                configurable: !0
              });
            u.forEach((I) => {
              if (I === h)
                throw Object.defineProperty(new Error('You cannot have the same slug name "' + h + '" repeat within a single dynamic path'), "__NEXT_ERROR_CODE", {
                  value: "E247",
                  enumerable: !1,
                  configurable: !0
                });
              if (I.replace(/\W/g, "") === s.replace(/\W/g, ""))
                throw Object.defineProperty(new Error('You cannot have the slug names "' + I + '" and "' + h + '" differ only by non-word symbols within a single dynamic path'), "__NEXT_ERROR_CODE", {
                  value: "E499",
                  enumerable: !1,
                  configurable: !0
                });
            }), u.push(h);
          }, p = s.slice(1, -1), d = !1;
          if (p.startsWith("[") && p.endsWith("]") && (p = p.slice(1, -1), d = !0), p.startsWith("…"))
            throw Object.defineProperty(new Error("Detected a three-dot character ('…') at ('" + p + "'). Did you mean ('...')?"), "__NEXT_ERROR_CODE", {
              value: "E147",
              enumerable: !1,
              configurable: !0
            });
          if (p.startsWith("...") && (p = p.substring(3), c = !0), p.startsWith("[") || p.endsWith("]"))
            throw Object.defineProperty(new Error("Segment names may not start or end with extra brackets ('" + p + "')."), "__NEXT_ERROR_CODE", {
              value: "E421",
              enumerable: !1,
              configurable: !0
            });
          if (p.startsWith("."))
            throw Object.defineProperty(new Error("Segment names may not start with erroneous periods ('" + p + "')."), "__NEXT_ERROR_CODE", {
              value: "E288",
              enumerable: !1,
              configurable: !0
            });
          if (c)
            if (d) {
              if (this.restSlugName != null)
                throw Object.defineProperty(new Error('You cannot use both an required and optional catch-all route at the same level ("[...' + this.restSlugName + ']" and "' + a[0] + '" ).'), "__NEXT_ERROR_CODE", {
                  value: "E299",
                  enumerable: !1,
                  configurable: !0
                });
              f(this.optionalRestSlugName, p), this.optionalRestSlugName = p, s = "[[...]]";
            } else {
              if (this.optionalRestSlugName != null)
                throw Object.defineProperty(new Error('You cannot use both an optional and required catch-all route at the same level ("[[...' + this.optionalRestSlugName + ']]" and "' + a[0] + '").'), "__NEXT_ERROR_CODE", {
                  value: "E300",
                  enumerable: !1,
                  configurable: !0
                });
              f(this.restSlugName, p), this.restSlugName = p, s = "[...]";
            }
          else {
            if (d)
              throw Object.defineProperty(new Error('Optional route parameters are not yet supported ("' + a[0] + '").'), "__NEXT_ERROR_CODE", {
                value: "E435",
                enumerable: !1,
                configurable: !0
              });
            f(this.slugName, p), this.slugName = p, s = "[]";
          }
        }
        this.children.has(s) || this.children.set(s, new r()), this.children.get(s)._insert(a.slice(1), u, c);
      }
      constructor() {
        this.placeholder = !0, this.children = /* @__PURE__ */ new Map(), this.slugName = null, this.restSlugName = null, this.optionalRestSlugName = null;
      }
    }
    function o(t) {
      const a = new r();
      return t.forEach((u) => a.insert(u)), a.smoosh();
    }
    function i(t, a) {
      const u = {}, c = [];
      for (let p = 0; p < t.length; p++) {
        const d = a(t[p]);
        u[d] = p, c[p] = d;
      }
      return o(c).map((p) => t[u[p]]);
    }
  }(Cp)), Cp;
}
var Mp = {}, xp = {}, $p = {}, Np = {}, Fh;
function jj() {
  return Fh || (Fh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "ensureLeadingSlash", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    function n(r) {
      return r.startsWith("/") ? r : "/" + r;
    }
  }(Np)), Np;
}
var Bp = {}, Uh;
function Dj() {
  return Uh || (Uh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function n(u, c) {
      for (var s in c) Object.defineProperty(u, s, {
        enumerable: !0,
        get: c[s]
      });
    }
    n(e, {
      DEFAULT_SEGMENT_KEY: function() {
        return a;
      },
      PAGE_SEGMENT_KEY: function() {
        return t;
      },
      addSearchParamsIfPageSegment: function() {
        return i;
      },
      isGroupSegment: function() {
        return r;
      },
      isParallelRouteSegment: function() {
        return o;
      }
    });
    function r(u) {
      return u[0] === "(" && u.endsWith(")");
    }
    function o(u) {
      return u.startsWith("@") && u !== "@children";
    }
    function i(u, c) {
      if (u.includes(t)) {
        const p = JSON.stringify(c);
        return p !== "{}" ? t + "?" + p : t;
      }
      return u;
    }
    const t = "__PAGE__", a = "__DEFAULT__";
  }(Bp)), Bp;
}
var Lh;
function Fj() {
  return Lh || (Lh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function n(a, u) {
      for (var c in u) Object.defineProperty(a, c, {
        enumerable: !0,
        get: u[c]
      });
    }
    n(e, {
      normalizeAppPath: function() {
        return i;
      },
      normalizeRscURL: function() {
        return t;
      }
    });
    const r = jj(), o = Dj();
    function i(a) {
      return (0, r.ensureLeadingSlash)(a.split("/").reduce((u, c, s, p) => !c || (0, o.isGroupSegment)(c) || c[0] === "@" || (c === "page" || c === "route") && s === p.length - 1 ? u : u + "/" + c, ""));
    }
    function t(a) {
      return a.replace(
        /\.rsc($|\?)/,
        // $1 ensures `?` is preserved
        "$1"
      );
    }
  }($p)), $p;
}
var qh;
function Uj() {
  return qh || (qh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function n(a, u) {
      for (var c in u) Object.defineProperty(a, c, {
        enumerable: !0,
        get: u[c]
      });
    }
    n(e, {
      INTERCEPTION_ROUTE_MARKERS: function() {
        return o;
      },
      extractInterceptionRouteInformation: function() {
        return t;
      },
      isInterceptionRouteAppPath: function() {
        return i;
      }
    });
    const r = Fj(), o = [
      "(..)(..)",
      "(.)",
      "(..)",
      "(...)"
    ];
    function i(a) {
      return a.split("/").find((u) => o.find((c) => u.startsWith(c))) !== void 0;
    }
    function t(a) {
      let u, c, s;
      for (const p of a.split("/"))
        if (c = o.find((d) => p.startsWith(d)), c) {
          [u, s] = a.split(c, 2);
          break;
        }
      if (!u || !c || !s)
        throw Object.defineProperty(new Error("Invalid interception route: " + a + ". Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>"), "__NEXT_ERROR_CODE", {
          value: "E269",
          enumerable: !1,
          configurable: !0
        });
      switch (u = (0, r.normalizeAppPath)(u), c) {
        case "(.)":
          u === "/" ? s = "/" + s : s = u + "/" + s;
          break;
        case "(..)":
          if (u === "/")
            throw Object.defineProperty(new Error("Invalid interception route: " + a + ". Cannot use (..) marker at the root level, use (.) instead."), "__NEXT_ERROR_CODE", {
              value: "E207",
              enumerable: !1,
              configurable: !0
            });
          s = u.split("/").slice(0, -1).concat(s).join("/");
          break;
        case "(...)":
          s = "/" + s;
          break;
        case "(..)(..)":
          const p = u.split("/");
          if (p.length <= 2)
            throw Object.defineProperty(new Error("Invalid interception route: " + a + ". Cannot use (..)(..) marker at the root level or one level up."), "__NEXT_ERROR_CODE", {
              value: "E486",
              enumerable: !1,
              configurable: !0
            });
          s = p.slice(0, -2).concat(s).join("/");
          break;
        default:
          throw Object.defineProperty(new Error("Invariant: unexpected marker"), "__NEXT_ERROR_CODE", {
            value: "E112",
            enumerable: !1,
            configurable: !0
          });
      }
      return {
        interceptingRoute: u,
        interceptedRoute: s
      };
    }
  }(xp)), xp;
}
var Kh;
function Lj() {
  return Kh || (Kh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "isDynamicRoute", {
      enumerable: !0,
      get: function() {
        return i;
      }
    });
    const n = Uj(), r = /\/[^/]*\[[^/]+\][^/]*(?=\/|$)/, o = /\/\[[^/]+\](?=\/|$)/;
    function i(t, a) {
      return a === void 0 && (a = !0), (0, n.isInterceptionRouteAppPath)(t) && (t = (0, n.extractInterceptionRouteInformation)(t).interceptedRoute), a ? o.test(t) : r.test(t);
    }
  }(Mp)), Mp;
}
var Gh;
function qj() {
  return Gh || (Gh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function n(i, t) {
      for (var a in t) Object.defineProperty(i, a, {
        enumerable: !0,
        get: t[a]
      });
    }
    n(e, {
      getSortedRouteObjects: function() {
        return r.getSortedRouteObjects;
      },
      getSortedRoutes: function() {
        return r.getSortedRoutes;
      },
      isDynamicRoute: function() {
        return o.isDynamicRoute;
      }
    });
    const r = Bj(), o = Lj();
  }(vp)), vp;
}
var Hh;
function Fs() {
  return Hh || (Hh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function n(T, h) {
      for (var I in h) Object.defineProperty(T, I, {
        enumerable: !0,
        get: h[I]
      });
    }
    n(e, {
      revalidatePath: function() {
        return d;
      },
      revalidateTag: function() {
        return c;
      },
      unstable_expirePath: function() {
        return s;
      },
      unstable_expireTag: function() {
        return p;
      }
    });
    const r = Wl(), o = qj(), i = Mc(), t = qa(), a = jo(), u = XO();
    function c(T) {
      return f([
        T
      ], `revalidateTag ${T}`);
    }
    function s(T, h) {
      if (T.length > i.NEXT_CACHE_SOFT_TAG_MAX_LENGTH) {
        console.warn(`Warning: expirePath received "${T}" which exceeded max length of ${i.NEXT_CACHE_SOFT_TAG_MAX_LENGTH}. See more info here https://nextjs.org/docs/app/api-reference/functions/unstable_expirePath`);
        return;
      }
      let I = `${i.NEXT_CACHE_IMPLICIT_TAG_ID}${T}`;
      return h ? I += `${I.endsWith("/") ? "" : "/"}${h}` : (0, o.isDynamicRoute)(T) && console.warn(`Warning: a dynamic page path "${T}" was passed to "expirePath", but the "type" parameter is missing. This has no effect by default, see more info here https://nextjs.org/docs/app/api-reference/functions/unstable_expirePath`), f([
        I
      ], `unstable_expirePath ${T}`);
    }
    function p(...T) {
      return f(T, `unstable_expireTag ${T.join(", ")}`);
    }
    function d(T, h) {
      if (T.length > i.NEXT_CACHE_SOFT_TAG_MAX_LENGTH) {
        console.warn(`Warning: revalidatePath received "${T}" which exceeded max length of ${i.NEXT_CACHE_SOFT_TAG_MAX_LENGTH}. See more info here https://nextjs.org/docs/app/api-reference/functions/revalidatePath`);
        return;
      }
      let I = `${i.NEXT_CACHE_IMPLICIT_TAG_ID}${T}`;
      return h ? I += `${I.endsWith("/") ? "" : "/"}${h}` : (0, o.isDynamicRoute)(T) && console.warn(`Warning: a dynamic page path "${T}" was passed to "revalidatePath", but the "type" parameter is missing. This has no effect by default, see more info here https://nextjs.org/docs/app/api-reference/functions/revalidatePath`), f([
        I
      ], `revalidatePath ${T}`);
    }
    function f(T, h) {
      const I = t.workAsyncStorage.getStore();
      if (!I || !I.incrementalCache)
        throw Object.defineProperty(new Error(`Invariant: static generation store missing in ${h}`), "__NEXT_ERROR_CODE", {
          value: "E263",
          enumerable: !1,
          configurable: !0
        });
      const _ = a.workUnitAsyncStorage.getStore();
      if (_) {
        if (_.type === "cache")
          throw Object.defineProperty(new Error(`Route ${I.route} used "${h}" inside a "use cache" which is unsupported. To ensure revalidation is performed consistently it must always happen outside of renders and cached functions. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
            value: "E181",
            enumerable: !1,
            configurable: !0
          });
        if (_.type === "unstable-cache")
          throw Object.defineProperty(new Error(`Route ${I.route} used "${h}" inside a function cached with "unstable_cache(...)" which is unsupported. To ensure revalidation is performed consistently it must always happen outside of renders and cached functions. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
            value: "E306",
            enumerable: !1,
            configurable: !0
          });
        if (_.phase === "render")
          throw Object.defineProperty(new Error(`Route ${I.route} used "${h}" during render which is unsupported. To ensure revalidation is performed consistently it must always happen outside of renders and cached functions. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
            value: "E7",
            enumerable: !1,
            configurable: !0
          });
        if (_.type === "prerender") {
          const A = Object.defineProperty(new Error(`Route ${I.route} used ${h} without first calling \`await connection()\`.`), "__NEXT_ERROR_CODE", {
            value: "E406",
            enumerable: !1,
            configurable: !0
          });
          (0, r.abortAndThrowOnSynchronousRequestDataAccess)(I.route, h, A, _);
        } else if (_.type === "prerender-ppr")
          (0, r.postponeWithTracking)(I.route, h, _.dynamicTracking);
        else if (_.type === "prerender-legacy") {
          _.revalidate = 0;
          const A = Object.defineProperty(new u.DynamicServerError(`Route ${I.route} couldn't be rendered statically because it used \`${h}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
            value: "E558",
            enumerable: !1,
            configurable: !0
          });
          throw I.dynamicUsageDescription = h, I.dynamicUsageStack = A.stack, A;
        } else process.env.NODE_ENV === "development" && _ && _.type === "request" && (_.usedDynamic = !0);
      }
      I.pendingRevalidatedTags || (I.pendingRevalidatedTags = []);
      for (const A of T)
        I.pendingRevalidatedTags.includes(A) || I.pendingRevalidatedTags.push(A);
      I.pathWasRevalidated = !0;
    }
  }(Sp)), Sp;
}
var jp = {}, Vh;
function Kj() {
  return Vh || (Vh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "unstable_noStore", {
      enumerable: !0,
      get: function() {
        return i;
      }
    });
    const n = qa(), r = jo(), o = Wl();
    function i() {
      const t = "unstable_noStore()", a = n.workAsyncStorage.getStore(), u = r.workUnitAsyncStorage.getStore();
      if (a) {
        if (a.forceStatic)
          return;
        a.isUnstableNoStore = !0, u && u.type === "prerender" || (0, o.markCurrentScopeAsDynamic)(a, u, t);
      } else return;
    }
  }(jp)), jp;
}
var Dp = {}, Wh;
function Gj() {
  return Wh || (Wh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "cacheLife", {
      enumerable: !0,
      get: function() {
        return i;
      }
    });
    const n = qa(), r = jo();
    function o(t) {
      if (t.stale !== void 0) {
        if (t.stale === !1)
          throw Object.defineProperty(new Error("Pass `Infinity` instead of `false` if you want to cache on the client forever without checking with the server."), "__NEXT_ERROR_CODE", {
            value: "E407",
            enumerable: !1,
            configurable: !0
          });
        if (typeof t.stale != "number")
          throw Object.defineProperty(new Error("The stale option must be a number of seconds."), "__NEXT_ERROR_CODE", {
            value: "E308",
            enumerable: !1,
            configurable: !0
          });
      }
      if (t.revalidate !== void 0) {
        if (t.revalidate === !1)
          throw Object.defineProperty(new Error("Pass `Infinity` instead of `false` if you do not want to revalidate by time."), "__NEXT_ERROR_CODE", {
            value: "E104",
            enumerable: !1,
            configurable: !0
          });
        if (typeof t.revalidate != "number")
          throw Object.defineProperty(new Error("The revalidate option must be a number of seconds."), "__NEXT_ERROR_CODE", {
            value: "E233",
            enumerable: !1,
            configurable: !0
          });
      }
      if (t.expire !== void 0) {
        if (t.expire === !1)
          throw Object.defineProperty(new Error("Pass `Infinity` instead of `false` if you want to cache on the server forever without checking with the origin."), "__NEXT_ERROR_CODE", {
            value: "E658",
            enumerable: !1,
            configurable: !0
          });
        if (typeof t.expire != "number")
          throw Object.defineProperty(new Error("The expire option must be a number of seconds."), "__NEXT_ERROR_CODE", {
            value: "E3",
            enumerable: !1,
            configurable: !0
          });
      }
      if (t.revalidate !== void 0 && t.expire !== void 0 && t.revalidate > t.expire)
        throw Object.defineProperty(new Error("If providing both the revalidate and expire options, the expire option must be greater than the revalidate option. The expire option indicates how many seconds from the start until it can no longer be used."), "__NEXT_ERROR_CODE", {
          value: "E656",
          enumerable: !1,
          configurable: !0
        });
      if (t.stale !== void 0 && t.expire !== void 0 && t.stale > t.expire)
        throw Object.defineProperty(new Error("If providing both the stale and expire options, the expire option must be greater than the stale option. The expire option indicates how many seconds from the start until it can no longer be used."), "__NEXT_ERROR_CODE", {
          value: "E655",
          enumerable: !1,
          configurable: !0
        });
    }
    function i(t) {
      if (!process.env.__NEXT_USE_CACHE)
        throw Object.defineProperty(new Error("cacheLife() is only available with the experimental.useCache config."), "__NEXT_ERROR_CODE", {
          value: "E627",
          enumerable: !1,
          configurable: !0
        });
      const a = r.workUnitAsyncStorage.getStore();
      if (!a || a.type !== "cache")
        throw Object.defineProperty(new Error('cacheLife() can only be called inside a "use cache" function.'), "__NEXT_ERROR_CODE", {
          value: "E250",
          enumerable: !1,
          configurable: !0
        });
      if (typeof t == "string") {
        const u = n.workAsyncStorage.getStore();
        if (!u)
          throw Object.defineProperty(new Error("cacheLife() can only be called during App Router rendering at the moment."), "__NEXT_ERROR_CODE", {
            value: "E94",
            enumerable: !1,
            configurable: !0
          });
        if (!u.cacheLifeProfiles)
          throw Object.defineProperty(new Error("cacheLifeProfiles should always be provided. This is a bug in Next.js."), "__NEXT_ERROR_CODE", {
            value: "E294",
            enumerable: !1,
            configurable: !0
          });
        const c = u.cacheLifeProfiles[t];
        if (c === void 0)
          throw u.cacheLifeProfiles[t.trim()] ? Object.defineProperty(new Error(`Unknown cacheLife profile "${t}" is not configured in next.config.js
Did you mean "${t.trim()}" without the spaces?`), "__NEXT_ERROR_CODE", {
            value: "E16",
            enumerable: !1,
            configurable: !0
          }) : Object.defineProperty(new Error(`Unknown cacheLife profile "${t}" is not configured in next.config.js
module.exports = {
  experimental: {
    cacheLife: {
      "${t}": ...
    }
  }
}`), "__NEXT_ERROR_CODE", {
            value: "E137",
            enumerable: !1,
            configurable: !0
          });
        t = c;
      } else {
        if (typeof t != "object" || t === null || Array.isArray(t))
          throw Object.defineProperty(new Error("Invalid cacheLife() option. Either pass a profile name or object."), "__NEXT_ERROR_CODE", {
            value: "E110",
            enumerable: !1,
            configurable: !0
          });
        o(t);
      }
      t.revalidate !== void 0 && (a.explicitRevalidate === void 0 || a.explicitRevalidate > t.revalidate) && (a.explicitRevalidate = t.revalidate), t.expire !== void 0 && (a.explicitExpire === void 0 || a.explicitExpire > t.expire) && (a.explicitExpire = t.expire), t.stale !== void 0 && (a.explicitStale === void 0 || a.explicitStale > t.stale) && (a.explicitStale = t.stale);
    }
  }(Dp)), Dp;
}
var Fp = {}, kh;
function Hj() {
  return kh || (kh = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "cacheTag", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const n = jo(), r = tA();
    function o(...i) {
      if (!process.env.__NEXT_USE_CACHE)
        throw Object.defineProperty(new Error("cacheTag() is only available with the experimental.useCache config."), "__NEXT_ERROR_CODE", {
          value: "E628",
          enumerable: !1,
          configurable: !0
        });
      const t = n.workUnitAsyncStorage.getStore();
      if (!t || t.type !== "cache")
        throw Object.defineProperty(new Error('cacheTag() can only be called inside a "use cache" function.'), "__NEXT_ERROR_CODE", {
          value: "E177",
          enumerable: !1,
          configurable: !0
        });
      const a = (0, r.validateTags)(i, "cacheTag()");
      t.tags ? t.tags.push(...a) : t.tags = a;
    }
  }(Fp)), Fp;
}
var Xh;
function Vj() {
  return Xh || (Xh = 1, function(e, n) {
    const r = {
      unstable_cache: Nj().unstable_cache,
      revalidateTag: Fs().revalidateTag,
      revalidatePath: Fs().revalidatePath,
      unstable_expireTag: Fs().unstable_expireTag,
      unstable_expirePath: Fs().unstable_expirePath,
      unstable_noStore: Kj().unstable_noStore,
      unstable_cacheLife: Gj().cacheLife,
      unstable_cacheTag: Hj().cacheTag
    };
    e.exports = r, n.unstable_cache = r.unstable_cache, n.revalidatePath = r.revalidatePath, n.revalidateTag = r.revalidateTag, n.unstable_expireTag = r.unstable_expireTag, n.unstable_expirePath = r.unstable_expirePath, n.unstable_noStore = r.unstable_noStore, n.unstable_cacheLife = r.unstable_cacheLife, n.unstable_cacheTag = r.unstable_cacheTag;
  }($s, $s.exports)), $s.exports;
}
var Wj = Vj();
const kj = async (e, n) => {
  const { auth0Instance: r } = await import("./index-DabRpp8G.js"), o = await r.getSession(), i = {
    ...n.headers,
    Authorization: `Bearer ${o == null ? void 0 : o.tokenSet.accessToken}`
    // 'X-ID-TOKEN': session?.user['idToken'] ?? '',
  }, t = await fetch(e, {
    ...n,
    headers: i
  });
  if (!t.ok) {
    const a = await t.text();
    throw console.error(a), new Error(a);
  }
  return t;
}, Yj = async (e, n, r) => {
  var a;
  const o = await kj($A().endpoint.webGraphqlUrl, {
    body: JSON.stringify({
      query: e,
      variables: n
    }),
    headers: {
      Accept: "application/graphql-response+json",
      "Content-Type": "application/json"
    },
    method: "POST"
  }).then((u) => (r != null && r.revalidateTags && r.revalidateTags.forEach((c) => Wj.revalidateTag(c)), u)), { data: i, errors: t } = await o.json();
  if (t && t.length)
    throw MN.debug(e, n, t), new Error((a = t[0]) == null ? void 0 : a.message);
  return i;
};
export {
  qa as a,
  jo as b,
  zO as c,
  ej as d,
  Wl as e,
  YO as f,
  Bc as g,
  XO as h,
  Pj as i,
  ZO as j,
  oj as k,
  Ej as l,
  $A as m,
  PA as n,
  Yj as o,
  Rj as r,
  kj as s
};
