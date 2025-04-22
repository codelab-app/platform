var we = Object.defineProperty;
var Te = (t, r, e) => r in t ? we(t, r, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[r] = e;
var s = (t, r, e) => Te(t, typeof r != "symbol" ? r + "" : r, e);
var U, K;
function z() {
  if (K) return U;
  K = 1;
  class t extends Error {
    constructor(e, ...n) {
      super(`env-var: ${e}`, ...n), Error.captureStackTrace && Error.captureStackTrace(this, t), this.name = "EnvVarError";
    }
  }
  return U = t, U;
}
var P, Z;
function d() {
  return Z || (Z = 1, P = function(r) {
    return r;
  }), P;
}
var b, Q;
function Ne() {
  if (Q) return b;
  Q = 1;
  const t = d();
  return b = function(e, n) {
    return n = n || ",", e.length ? t(e).split(n).filter(Boolean) : [];
  }, b;
}
var R, ee;
function Le() {
  return ee || (ee = 1, R = function(r) {
    const e = r.toLowerCase();
    if (e !== "false" && e !== "true")
      throw new Error('should be either "true", "false", "TRUE", or "FALSE"');
    return e !== "false";
  }), R;
}
var w, re;
function me() {
  return re || (re = 1, w = function(r) {
    const e = r.toLowerCase();
    if ([
      "false",
      "0",
      "true",
      "1"
    ].indexOf(e) === -1)
      throw new Error('should be either "true", "false", "TRUE", "FALSE", 1, or 0');
    return !(e === "0" || e === "false");
  }), w;
}
var T, te;
function W() {
  return te || (te = 1, T = function(r) {
    const e = parseInt(r, 10);
    if (isNaN(e) || e.toString(10) !== r)
      throw new Error("should be a valid integer");
    return e;
  }), T;
}
var N, ne;
function Ie() {
  if (ne) return N;
  ne = 1;
  const t = W();
  return N = function(e) {
    const n = t(e);
    if (n < 0)
      throw new Error("should be a positive integer");
    return n;
  }, N;
}
var L, se;
function Oe() {
  if (se) return L;
  se = 1;
  const t = Ie();
  return L = function(e) {
    var n = t(e);
    if (n > 65535)
      throw new Error("cannot assign a port number greater than 65535");
    return n;
  }, L;
}
var m, ie;
function qe() {
  if (ie) return m;
  ie = 1;
  const t = d();
  return m = function(e, n) {
    const o = t(e);
    if (n.indexOf(o) < 0)
      throw new Error(`should be one of [${n.join(", ")}]`);
    return o;
  }, m;
}
var O, ae;
function k() {
  return ae || (ae = 1, O = function(r) {
    const e = parseFloat(r);
    if (isNaN(e) || isNaN(r))
      throw new Error("should be a valid float");
    return e;
  }), O;
}
var q, oe;
function Ce() {
  if (oe) return q;
  oe = 1;
  const t = k();
  return q = function(e) {
    const n = t(e);
    if (n > 0)
      throw new Error("should be a negative float");
    return n;
  }, q;
}
var C, ue;
function He() {
  if (ue) return C;
  ue = 1;
  const t = k();
  return C = function(e) {
    const n = t(e);
    if (n < 0)
      throw new Error("should be a positive float");
    return n;
  }, C;
}
var H, ce;
function Be() {
  if (ce) return H;
  ce = 1;
  const t = W();
  return H = function(e) {
    const n = t(e);
    if (n > 0)
      throw new Error("should be a negative integer");
    return n;
  }, H;
}
var B, le;
function Y() {
  return le || (le = 1, B = function(r) {
    try {
      return JSON.parse(r);
    } catch {
      throw new Error("should be valid (parseable) JSON");
    }
  }), B;
}
var y, ge;
function ye() {
  if (ge) return y;
  ge = 1;
  const t = Y();
  return y = function(e) {
    var n = t(e);
    if (!Array.isArray(n))
      throw new Error("should be a parseable JSON Array");
    return n;
  }, y;
}
var V, Ee;
function Ve() {
  if (Ee) return V;
  Ee = 1;
  const t = Y();
  return V = function(e) {
    var n = t(e);
    if (Array.isArray(n))
      throw new Error("should be a parseable JSON Object");
    return n;
  }, V;
}
var $, _e;
function $e() {
  return _e || (_e = 1, $ = function(r, e) {
    try {
      RegExp(void 0, e);
    } catch {
      throw new Error("invalid regexp flags");
    }
    try {
      return new RegExp(r, e);
    } catch {
      throw new Error("should be a valid regexp");
    }
  }), $;
}
var M, fe;
function Ue() {
  if (fe) return M;
  fe = 1;
  const t = d();
  return M = function(e) {
    const n = t(e);
    try {
      return new URL(n);
    } catch {
      throw new Error("should be a valid URL");
    }
  }, M;
}
var J, he;
function Me() {
  if (he) return J;
  he = 1;
  const t = Ue();
  return J = function(e) {
    return t(e).toString();
  }, J;
}
var D, ve;
function Je() {
  if (ve) return D;
  ve = 1;
  const t = d(), r = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\u0001-\u0008\u000b\u000c\u000e-\u001f\u0021\u0023-\u005b\u005d-\u007f]|\\[\u0001-\u0009\u000b\u000c\u000e-\u007f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\u0001-\u0008\u000b\u000c\u000e-\u001f\u0021-\u005a\u0053-\u007f]|\\[\u0001-\u0009\u000b\u000c\u000e-\u007f])+)\])$/;
  return D = function(n) {
    const o = t(n);
    if (!r.test(o))
      throw new Error("should be a valid email address");
    return o;
  }, D;
}
var X, de;
function Pe() {
  return de || (de = 1, X = {
    asArray: Ne(),
    asBoolStrict: Le(),
    asBool: me(),
    asPortNumber: Oe(),
    asEnum: qe(),
    asFloatNegative: Ce(),
    asFloatPositive: He(),
    asFloat: k(),
    asIntNegative: Be(),
    asIntPositive: Ie(),
    asInt: W(),
    asJsonArray: ye(),
    asJsonObject: Ve(),
    asJson: Y(),
    asRegExp: $e(),
    asString: d(),
    asUrlObject: Ue(),
    asUrlString: Me(),
    asEmailString: Je()
  }), X;
}
var x, pe;
function De() {
  if (pe) return x;
  pe = 1;
  const t = z(), r = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
  return x = function(n, o, f, S) {
    let h = !1, v = !1, l, I;
    const be = Pe();
    function c(i) {
      S(o, i);
    }
    function p(i, u) {
      let g = `"${o}" ${u}`;
      throw i && (g = `${g}`), I && (g = `${g}. An example of a valid value would be: ${I}`), new t(g);
    }
    function Re(i) {
      return function() {
        let u = n[o];
        if (c(`will be read from the environment using "${i.name}" accessor`), typeof u > "u")
          if (typeof l > "u" && v)
            c("was not found in the environment, but is required to be set"), p(void 0, "is a required variable, but it was not set");
          else if (typeof l < "u")
            c(`was not found in the environment, parsing default value "${l}" instead`), u = l;
          else {
            c("was not found in the environment, but is not required. returning undefined");
            return;
          }
        v && (c("verifying variable value is not an empty string"), u.trim().length === 0 && p(void 0, "is a required variable, but its value was empty")), h && (c("verifying variable is a valid base64 string"), u.match(r) || p(u, "should be a valid base64 string if using convertFromBase64"), c("converting from base64 to utf8 string"), u = Buffer.from(u, "base64").toString());
        const g = [u].concat(Array.prototype.slice.call(arguments));
        try {
          c(`passing value "${u}" to "${i.name}" accessor`);
          const A = i.apply(
            i,
            g
          );
          return c(`parsed successfully, returning ${A}`), A;
        } catch (A) {
          p(u, A.message);
        }
      };
    }
    const _ = {
      /**
       * Instructs env-var to first convert the value of the variable from base64
       * when reading it using a function such as asString()
       */
      convertFromBase64: function() {
        return c("marking for base64 conversion"), h = !0, _;
      },
      /**
       * Set a default value for the variable
       * @param {String} value
       */
      default: function(i) {
        if (typeof i == "number")
          l = i.toString();
        else if (Array.isArray(i) || typeof i == "object" && i !== null)
          l = JSON.stringify(i);
        else {
          if (typeof i != "string")
            throw new t("values passed to default() must be of Number, String, Array, or Object type");
          l = i;
        }
        return c(`setting default value to "${l}"`), _;
      },
      /**
       * Ensures a variable is set in the given environment container. Throws an
       * EnvVarError if the variable is not set or a default is not provided
       * @param {Boolean} required
       */
      required: function(i) {
        return typeof i > "u" ? (c("marked as required"), v = !0) : (c(`setting required flag to ${i}`), v = i), _;
      },
      /**
       * Set an example value for this variable. If the variable value is not set
       * or is set to an invalid value this example will be show in error output.
       * @param {String} example
       */
      example: function(i) {
        return I = i, _;
      }
    };
    return Object.entries({
      ...be,
      ...f
    }).forEach(([i, u]) => {
      _[i] = Re(u);
    }), _;
  }, x;
}
var j, Ae;
function Xe() {
  return Ae || (Ae = 1, j = function(r, e) {
    return function(o, f) {
      (!e || !e.match(/prod|production/)) && r(`env-var (${o}): ${f}`);
    };
  }), j;
}
var F, Se;
function xe() {
  if (Se) return F;
  Se = 1;
  const t = De(), r = z(), e = (o, f, S) => ({
    from: e,
    /**
     * This is the Error class used to generate exceptions. Can be used to identify
     * exceptions and handle them appropriately.
     */
    EnvVarError: z(),
    /**
     * Returns a variable instance with helper functions, or process.env
     * @param  {String} variableName Name of the environment variable requested
     * @return {Object}
     */
    get: function(h) {
      if (!h)
        return o;
      if (arguments.length > 1)
        throw new r("It looks like you passed more than one argument to env.get(). Since env-var@6.0.0 this is no longer supported. To set a default value use env.get(TARGET).default(DEFAULT)");
      return t(o, h, f || {}, S || function() {
      });
    },
    /**
     * Provides access to the functions that env-var uses to parse
     * process.env strings into valid types requested by the API
     */
    accessors: Pe(),
    /**
     * Provides a default logger that can be used to print logs.
     * This will not print logs in a production environment (checks process.env.NODE_ENV)
     */
    logger: Xe()(console.log, o.NODE_ENV)
  });
  function n() {
    try {
      return process.env;
    } catch {
      return {};
    }
  }
  return F = e(n()), F;
}
var je = xe();
const a = je.from({
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
class Fe {
  constructor(r) {
    s(this, "_audience");
    s(this, "_auth0Domain");
    s(this, "_clientId");
    s(this, "_clientSecret");
    s(this, "_e2eUsername");
    s(this, "_e2ePassword");
    s(this, "_issuerBaseUrl");
    s(this, "_secret");
    s(this, "_sessionAutoSave");
    this.endpoint = r;
  }
  get audience() {
    return this._audience ?? (this._audience = new URL(
      "api/v2/",
      this.issuerBaseUrl
    ).toString());
  }
  get domain() {
    return this._auth0Domain ?? (this._auth0Domain = a.get("AUTH0_DOMAIN").required().asString());
  }
  get clientId() {
    return this._clientId ?? (this._clientId = a.get("AUTH0_CLIENT_ID").required().asString());
  }
  get clientSecret() {
    return this._clientSecret ?? (this._clientSecret = a.get("AUTH0_CLIENT_SECRET").required().asString());
  }
  get auth0Username() {
    return this._e2eUsername ?? (this._e2eUsername = a.get("AUTH0_E2E_USERNAME").required().asString());
  }
  get auth0Password() {
    return this._e2ePassword ?? (this._e2ePassword = a.get("AUTH0_E2E_PASSWORD").required().asString());
  }
  get issuerBaseUrl() {
    const r = new URL("/", `https://${this.domain}`).toString();
    return this._issuerBaseUrl ?? (this._issuerBaseUrl = r);
  }
  get secret() {
    return this._secret ?? (this._secret = a.get("AUTH0_SECRET").required().asString());
  }
  get sessionAutoSave() {
    return this._sessionAutoSave ?? (this._sessionAutoSave = a.get("AUTH0_SESSION_AUTO_SAVE").required().asBool());
  }
  get baseUrl() {
    return this.endpoint.webHost;
  }
}
class ze {
  constructor() {
    // Vercel uses '1'
    // Others may use 'true'
    s(this, "_ci");
    s(this, "_circleCi");
  }
  get ci() {
    return this._ci ?? (this._ci = a.get("CI").default("false").asBool());
  }
  get circleCi() {
    return this._circleCi ?? (this._circleCi = a.get("CIRCLE").default("false").asBool());
  }
}
class Ge {
  constructor() {
    s(this, "_apiHost");
    s(this, "_webHost");
  }
  get admin() {
    const r = `${this.baseApiPath}/admin/export`, e = `${this.baseApiPath}/admin/import`, n = `${this.baseApiPath}/admin/reset-database`, o = `${this.baseApiPath}/admin/setup-dev`;
    return {
      export: new URL(r, this.apiUrl).toString(),
      import: new URL(e, this.apiUrl).toString(),
      resetDatabase: new URL(n, this.apiUrl).toString(),
      setupDev: new URL(o, this.apiUrl).toString()
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
    const r = a.get("NEXT_PUBLIC_API_PORT").required().asPortNumber(), e = a.get("NEXT_PUBLIC_API_HOSTNAME").required().asUrlObject();
    return this._apiHost = new URL(`${e.origin}:${r}`).toString();
  }
  get apiUrl() {
    return new URL(this.baseApiPath, this.webHost).toString();
  }
  get app() {
    const r = `${this.baseApiPath}/app/export`, e = `${this.baseApiPath}/app/import`;
    return {
      export: new URL(r, this.webHost).toString(),
      import: new URL(e, this.webHost).toString()
    };
  }
  get baseApiPath() {
    return a.get("NEXT_PUBLIC_BASE_API_PATH").required().asString();
  }
  /**
   * URL is protocol + origin
   */
  get canActivateUrl() {
    return new URL(`${this.baseApiPath}/can-activate`, this.webHost).toString();
  }
  get component() {
    const r = `${this.baseApiPath}/component/export`, e = `${this.baseApiPath}/component/import`;
    return {
      export: new URL(r, this.webHost).toString(),
      import: new URL(e, this.webHost).toString()
    };
  }
  get isLocal() {
    return this.webGraphqlUrl.includes("127.0.0.1");
  }
  get regenerate() {
    return new URL(`${this.baseApiPath}/regenerate`, this.apiUrl).toString();
  }
  get user() {
    const r = `${this.baseApiPath}/user/save`;
    return {
      save: new URL(r, this.apiUrl).toString()
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
    return this._webHost ?? (this._webHost = a.get("NEXT_PUBLIC_WEB_HOST").required().asString());
  }
}
class We {
  constructor() {
    s(this, "id");
    this.id = a.get("NEXT_PUBLIC_GOOGLE_ANALYTICS").default("").asString();
  }
}
class ke {
  constructor() {
    s(this, "id");
    s(this, "version");
    this.id = a.get("NEXT_PUBLIC_HOTJAR_ID").default("0").asInt(), this.version = a.get("NEXT_PUBLIC_HOTJAR_VERSION").default("0").asInt();
  }
}
class Ye {
  constructor() {
    s(this, "appId");
    this.appId = a.get("NEXT_PUBLIC_INTERCOM_APP_ID").default("").asString();
  }
}
class Ke {
  constructor() {
    s(this, "apiKey");
    s(this, "listId");
    s(this, "serverPrefix");
    this.apiKey = a.get("MAILCHIMP_API_KEY").required().asString(), this.listId = a.get("MAILCHIMP_LIST_ID").required().asString(), this.serverPrefix = a.get("MAILCHIMP_SERVER_PREFIX").required().asString();
  }
}
class Ze {
  constructor() {
    s(this, "_password");
    s(this, "_uri");
    s(this, "_user");
  }
  get password() {
    return this._password ?? (this._password = a.get("NEO4J_PASSWORD").required().asString());
  }
  get uri() {
    return this._uri ?? (this._uri = a.get("NEO4J_URI").required().asUrlString());
  }
  get user() {
    return this._user ?? (this._user = a.get("NEO4J_USER").required().asString());
  }
}
class Qe {
  constructor() {
    s(this, "_nodeEnv");
  }
  get isCi() {
    return a.get("CI").default("false").asBool();
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
    return this._nodeEnv ?? (this._nodeEnv = a.get("NODE_ENV").default("development").asEnum(["development", "production", "test"]));
  }
}
class er {
  constructor() {
    s(this, "key");
    s(this, "url");
    this.key = process.env.NEXT_PUBLIC_SUPABASE_KEY || "", this.url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  }
}
const E = class E {
  constructor() {
    s(this, "_auth0");
    s(this, "_circleci");
    s(this, "_endpoint");
    s(this, "_googleAnalytics");
    s(this, "_hotjar");
    s(this, "_intercom");
    s(this, "_mailchimp");
    s(this, "_neo4j");
    s(this, "_node");
    s(this, "_supabase");
  }
  static getInstance() {
    return E.instance || (E.instance = new E()), E.instance;
  }
  get auth0() {
    return this._auth0 ?? (this._auth0 = new Fe(this.endpoint));
  }
  get circleci() {
    return this._circleci ?? (this._circleci = new ze());
  }
  get endpoint() {
    return this._endpoint ?? (this._endpoint = new Ge());
  }
  get googleAnalytics() {
    return this._googleAnalytics ?? (this._googleAnalytics = new We());
  }
  get hotjar() {
    return this._hotjar ?? (this._hotjar = new ke());
  }
  get intercom() {
    return this._intercom ?? (this._intercom = new Ye());
  }
  get mailchimp() {
    return this._mailchimp ?? (this._mailchimp = new Ke());
  }
  get neo4j() {
    return this._neo4j ?? (this._neo4j = new Ze());
  }
  get node() {
    return this._node ?? (this._node = new Qe());
  }
  get supabase() {
    return this._supabase ?? (this._supabase = new er());
  }
};
s(E, "instance");
let G = E;
const tr = () => G.getInstance(), nr = "Body";
export {
  nr as ROOT_ELEMENT_NAME,
  a as env,
  tr as getEnv
};
