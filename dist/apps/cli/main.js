/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// external "@nestjs/core"
const core_namespaceObject = require("@nestjs/core");
;// external "tslib"
const external_tslib_namespaceObject = require("tslib");
;// external "chalk"
const external_chalk_namespaceObject = require("chalk");
var external_chalk_default = /*#__PURE__*/__webpack_require__.n(external_chalk_namespaceObject);
;// external "pino"
const external_pino_namespaceObject = require("pino");
var external_pino_default = /*#__PURE__*/__webpack_require__.n(external_pino_namespaceObject);
;// external "pino-pretty"
const external_pino_pretty_namespaceObject = require("pino-pretty");
var external_pino_pretty_default = /*#__PURE__*/__webpack_require__.n(external_pino_pretty_namespaceObject);
;// external "remeda"
const external_remeda_namespaceObject = require("remeda");
;// ../../libs/shared/utils/src/prettify/prettify.ts
const prettifyForConsole = (object) => {
    return JSON.stringify(object, null, 2);
};

;// external "@pinojs/json-colorizer"
const json_colorizer_namespaceObject = require("@pinojs/json-colorizer");
var json_colorizer_default = /*#__PURE__*/__webpack_require__.n(json_colorizer_namespaceObject);
;// ../../libs/shared/infra/logging/src/pino/utils.ts


const formatNestLikeDate = (timestamp) => {
    if (typeof timestamp !== 'number') {
        throw new Error('Timestamp needs to be type number');
    }
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString('en-US', {
        day: '2-digit',
        hour: 'numeric',
        hour12: true,
        minute: '2-digit',
        month: '2-digit',
        second: '2-digit',
        year: 'numeric',
    });
    return formattedDate;
};
const colorize = (object) => {
    // Assuming message is a JSON object. If it's a string, you may not need JSON.stringify
    // Adjust this based on the actual data structure of your messages
    const messageString = typeof object === 'object' ? prettifyForConsole(object) : object;
    return json_colorizer_default()(messageString, {
        colors: {
            BOOLEAN_LITERAL: 'white',
            BRACE: 'white',
            BRACKET: 'white',
            COLON: 'white',
            COMMA: 'white',
            NULL_LITERAL: 'white',
            NUMBER_LITERAL: 'white',
            STRING_KEY: 'white',
            STRING_LITERAL: 'green',
        },
    });
};

;// ../../libs/shared/infra/logging/src/pino/pino-transport.ts





const levelsLabels = (external_pino_default()).levels.labels;
const pinoPrettyStream = external_pino_pretty_default()({
    colorize: true,
    // errorLikeObjectKeys: ['err', 'error'],
    /**
     * We hide them here, since can't control these order. Instead move them to the message
     */
    ignore: 'time,pid,hostname,context,req,res,responseTime,level',
    // levelFirst: false,
    // NestJS-like timestamp
    /**
     * This time appears in front of message, cannot find a way to move it.
     */
    // translateTime: 'SYS:mm/dd/yyyy hh:mm:ss TT',
    messageFormat: (log, messageKey, levelLabel) => {
        // console.log(log, messageKey, levelLabel)
        const message = JSON.parse(log[messageKey]);
        const level = log['level'];
        const hostname = log['hostname'];
        const time = log['time'];
        const pid = log['pid'];
        /**
         * Be careful of `context` and `message`, since `LoggerService.info` has method override
         */
        // const context = log['context']
        const context = message.context;
        const object = message.object;
        /**
         * Pino combines all data into a single object, need to extract user data
         */
        const data = (0,external_remeda_namespaceObject.omit)(log, ['level', 'time', 'hostname', 'pid', 'req', 'msg']);
        return `${external_chalk_default().green('[Pino]')} ${external_chalk_default().green(pid)}  ${external_chalk_default().green('-')} ${external_chalk_default().whiteBright(formatNestLikeDate(time))}     ${external_chalk_default().green(levelsLabels[level]?.toUpperCase())} ${external_chalk_default().yellow(`[${context}]`)}\n${colorize(object)}`;
    },
    // singleLine: false,
    sync: true,
});

;// external "@nestjs/common"
const common_namespaceObject = require("@nestjs/common");
;// external "@nestjs/config"
const config_namespaceObject = require("@nestjs/config");
;// external "nestjs-pino"
const external_nestjs_pino_namespaceObject = require("nestjs-pino");
;// external "env-var"
const external_env_var_namespaceObject = require("env-var");
;// ../../libs/backend/infra/adapter/logger/src/logger.config.ts


const LOGGER_CONFIG_KEY = 'logger';
const loggerConfig = (0,config_namespaceObject.registerAs)(LOGGER_CONFIG_KEY, () => {
    return {
        get level() {
            return external_env_var_namespaceObject.get('API_LOG_LEVEL').default('debug').asString();
        },
        get sentryDsn() {
            return external_env_var_namespaceObject.get('SENTRY_DSN').required().asString();
        },
    };
});

;// ../../libs/backend/infra/adapter/logger/src/nestjs.logger.service.ts


let NestjsLoggerService = class NestjsLoggerService extends common_namespaceObject.Logger {
};
NestjsLoggerService = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Injectable)()
], NestjsLoggerService);


;// ../../libs/backend/infra/adapter/logger/src/pino.logger.service.ts
var _a, _b, _c;






let PinoLoggerService = class PinoLoggerService extends external_nestjs_pino_namespaceObject.Logger {
    constructor(logger, params, loggerConf) {
        super(logger, {
            ...params,
        });
        Object.defineProperty(this, "logger", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: logger
        });
        Object.defineProperty(this, "loggerConf", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: loggerConf
        });
    }
    /**
     * We follow nestjs param order, which differs from pino param order
     *
     * Watch out for `info()` method override
     */
    log(object = {}, context) {
        /**
         * We can't use this, since cannot control how the object is colorized before printing
         *
         * We combine everything into an object, then convert to string, then recreate the object in the transport
         */
        // this.logger.info(object, message)
        const pinoMessage = {
            context,
            object,
        };
        const message = JSON.stringify(pinoMessage);
        this.logger.info(message);
    }
    logToFile(object = {}, filePath = 'tmp/logs/application.log') {
        console.log('Logging to file...', filePath);
        const childLogger = external_pino_default()({
            transport: {
                options: {
                    destination: filePath,
                    mkdir: true,
                },
                target: 'pino/file',
            },
        });
        const pinoMessage = {
            context: 'FileLogger',
            object,
        };
        childLogger.info(pinoMessage);
    }
};
PinoLoggerService = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Injectable)(),
    (0,external_tslib_namespaceObject.__param)(1, (0,common_namespaceObject.Inject)(external_nestjs_pino_namespaceObject.PARAMS_PROVIDER_TOKEN)),
    (0,external_tslib_namespaceObject.__param)(2, (0,common_namespaceObject.Inject)(loggerConfig.KEY)),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (_a = typeof external_nestjs_pino_namespaceObject.PinoLogger !== "undefined" && external_nestjs_pino_namespaceObject.PinoLogger) === "function" ? _a : Object, typeof (_b = typeof external_nestjs_pino_namespaceObject.Params !== "undefined" && external_nestjs_pino_namespaceObject.Params) === "function" ? _b : Object, typeof (_c = typeof config_namespaceObject.ConfigType !== "undefined" && config_namespaceObject.ConfigType) === "function" ? _c : Object])
], PinoLoggerService);


;// ../../libs/backend/infra/adapter/logger/src/logger.module.ts









let CodelabLoggerModule = class CodelabLoggerModule {
};
CodelabLoggerModule = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Global)(),
    (0,common_namespaceObject.Module)({
        exports: [PinoLoggerService, NestjsLoggerService],
        imports: [
            config_namespaceObject.ConfigModule.forFeature(loggerConfig),
            external_nestjs_pino_namespaceObject.LoggerModule.forRootAsync({
                imports: [config_namespaceObject.ConfigModule.forFeature(loggerConfig)],
                inject: [loggerConfig.KEY],
                useFactory: async (config) => {
                    return {
                        pinoHttp: {
                            // Disable HTTP requests logging
                            autoLogging: false,
                            // Turn of using `API_LOG_LEVEL`
                            enabled: true,
                            level: config.level,
                            /**
                             * https://stackoverflow.com/a/74100511/2159920
                             *
                             * Enable synchronous logging
                             */
                            // stream: pino.destination({
                            //   sync: true,
                            //   // write: (message: string) => {
                            //   //   console.log(colorizer(message))
                            //   // },
                            // }),
                            // Doesn't prefix in front of date
                            // msgPrefix: '[API]',
                            // Set Pino to synchronous mode
                            serializers: {
                                req: (req) => {
                                    // Do omission instead of pick as to document the keys
                                    return (0,external_remeda_namespaceObject.omit)(req, ['id', 'headers']);
                                },
                                // res: (res) => {
                                //   return {
                                //     // Log only specific properties of the response, or return an empty object to exclude all
                                //     statusCode: res.statusCode,
                                //   }
                                // },
                            },
                            stream: pinoPrettyStream,
                            // Prettify and colorize log
                            // transport:
                            //   process.env['NODE_ENV'] !== 'production'
                            //     ? {
                            //         options: transportOptions,
                            //         // target: 'pino-pretty',
                            //         target: require.resolve('./pino-transport'),
                            //       }
                            //     : undefined,
                        },
                    };
                },
            }),
        ],
        providers: [PinoLoggerService, NestjsLoggerService],
    })
], CodelabLoggerModule);


;// ../../libs/shared/abstract/core/src/stage.enum.ts
/**
 * This is the script environment for running processes like CI/CD
 */
var Stage;
(function (Stage) {
    // Remote on CircleCi
    Stage["CI"] = "ci";
    // Local using primary port
    Stage["Dev"] = "dev";
    // DigitalOcean remote
    Stage["Prod"] = "prod";
    // Local using secondary port
    Stage["Test"] = "test";
})(Stage || (Stage = {}));

;// external "path"
const external_path_namespaceObject = require("path");
var external_path_default = /*#__PURE__*/__webpack_require__.n(external_path_namespaceObject);
;// ../../libs/backend/infra/adapter/cli/src/commands/seed/seed.service.ts


let SeedService = class SeedService {
    constructor() {
        Object.defineProperty(this, "command", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'seed'
        });
        Object.defineProperty(this, "describe", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'Parse Ant Design scraped CSV files and seed to application as types'
        });
        this.builder = this.builder.bind(this);
    }
    builder(argv) {
        return argv
            .command('antd', 'Seed Ant Design framework', (_argv) => _argv, async ({ user }) => {
            const owner = user;
            // await new AdminSeederService(owner).seedAntDesign()
        })
            .command('html', 'Seed html', (_argv) => _argv, async ({ user }) => {
            const owner = user;
            // await new AdminSeederService(owner).seedHtml()
        })
            .demandCommand();
    }
    handler() {
        // await new SeedDataService().execute(user)
    }
};
SeedService = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Injectable)(),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [])
], SeedService);


;// external "execa"
const external_execa_namespaceObject = require("execa");
var external_execa_default = /*#__PURE__*/__webpack_require__.n(external_execa_namespaceObject);
;// ../../libs/backend/infra/adapter/shell/src/exec-command.ts

const execCommand = (command) => {
    console.log(`Executing: ${command}`);
    try {
        // Only use shell on CI
        const shell = process.env['CI'] ? true : false;
        return external_execa_default().commandSync(command, {
            shell: true,
            stdio: 'inherit',
        });
    }
    catch (error) {
        console.error(error);
        /**
         * Serve doesn't detect exit code
         *
         *  https://github.com/nrwl/nx/issues/9239
         */
        process.exit(1);
    }
};

;// ../../libs/shared/config/env/src/services/auth0.ts
/* eslint-disable @typescript-eslint/member-ordering */

/* *
 * https://github.com/auth0/nextjs-auth0/issues/383
 */
class Auth0EnvVars {
    constructor(endpoint) {
        Object.defineProperty(this, "endpoint", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: endpoint
        });
        Object.defineProperty(this, "_audience", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_auth0Domain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_clientId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_clientSecret", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_cypressUsername", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_cypressPassword", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_issuerBaseUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_secret", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_sessionAutoSave", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    get audience() {
        return (this._audience ??= new URL('api/v2/', this.issuerBaseUrl).toString());
    }
    get domain() {
        return (this._auth0Domain ??= external_env_var_namespaceObject.get('AUTH0_DOMAIN').required().asString());
    }
    get clientId() {
        return (this._clientId ??= external_env_var_namespaceObject.get('AUTH0_CLIENT_ID').required().asString());
    }
    get clientSecret() {
        return (this._clientSecret ??= external_env_var_namespaceObject.get('AUTH0_CLIENT_SECRET')
            .required()
            .asString());
    }
    get auth0Username() {
        return (this._cypressUsername ??= external_env_var_namespaceObject.get('AUTH0_E2E_USERNAME')
            .required()
            .asString());
    }
    get auth0Password() {
        return (this._cypressPassword ??= external_env_var_namespaceObject.get('AUTH0_E2E_PASSWORD')
            .required()
            .asString());
    }
    get issuerBaseUrl() {
        const issuerBaseUrl = new URL('/', `https://${this.domain}`).toString();
        return (this._issuerBaseUrl ??= issuerBaseUrl);
    }
    get secret() {
        return (this._secret ??= external_env_var_namespaceObject.get('AUTH0_SECRET').required().asString());
    }
    get sessionAutoSave() {
        return (this._sessionAutoSave ??= external_env_var_namespaceObject.get('AUTH0_SESSION_AUTO_SAVE')
            .required()
            .asBool());
    }
    get baseUrl() {
        const auth0baseUrl = this.endpoint.webHost;
        return auth0baseUrl;
    }
}

;// ../../libs/shared/config/env/src/services/circleci.ts

class CircleCIEnvVars {
    constructor() {
        // Vercel uses '1'
        // Others may use 'true'
        Object.defineProperty(this, "_ci", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_circleCi", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    get ci() {
        return (this._ci ??= external_env_var_namespaceObject.get('CI').default('false').asBool());
    }
    get circleCi() {
        return (this._circleCi ??= external_env_var_namespaceObject.get('CIRCLE').default('false').asBool());
    }
}

;// ../../libs/shared/config/env/src/services/endpoint.ts

/**
 * https://github.com/evanshortiss/env-var/issues/162
 */
const { get } = external_env_var_namespaceObject.from({
    NEXT_PUBLIC_API_HOSTNAME: process.env['NEXT_PUBLIC_API_HOSTNAME'],
    NEXT_PUBLIC_API_PORT: process.env['NEXT_PUBLIC_API_PORT'],
    NEXT_PUBLIC_BASE_API_PATH: process.env['NEXT_PUBLIC_BASE_API_PATH'],
    NEXT_PUBLIC_WEB_HOST: process.env['NEXT_PUBLIC_WEB_HOST'],
});
class EndpointEnvVars {
    constructor() {
        Object.defineProperty(this, "_apiHost", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_webHost", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    get admin() {
        const exportEndpoint = `${this.baseApiPath}/admin/export`;
        const importEndpoint = `${this.baseApiPath}/admin/import`;
        const resetDatabaseEndpoint = `${this.baseApiPath}/admin/reset-database`;
        const setupDev = `${this.baseApiPath}/admin/setup-dev`;
        return {
            export: new URL(exportEndpoint, this.apiUrl).toString(),
            import: new URL(importEndpoint, this.apiUrl).toString(),
            resetDatabase: new URL(resetDatabaseEndpoint, this.apiUrl).toString(),
            setupDev: new URL(setupDev, this.apiUrl).toString(),
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
        if (this._apiHost) {
            return this._apiHost;
        }
        const port = get('NEXT_PUBLIC_API_PORT').required().asPortNumber();
        const url = get('NEXT_PUBLIC_API_HOSTNAME').required().asUrlObject();
        return (this._apiHost = new URL(`${url.origin}:${port}`).toString());
    }
    get apiUrl() {
        return new URL(this.baseApiPath, this.webHost).toString();
    }
    get app() {
        const exportEndpoint = `${this.baseApiPath}/app/export`;
        const importEndpoint = `${this.baseApiPath}/app/import`;
        return {
            export: new URL(exportEndpoint, this.webHost).toString(),
            import: new URL(importEndpoint, this.webHost).toString(),
        };
    }
    get baseApiPath() {
        return get('NEXT_PUBLIC_BASE_API_PATH').required().asString();
    }
    /**
     * URL is protocol + origin
     */
    get canActivateUrl() {
        return new URL(`${this.baseApiPath}/can-activate`, this.webHost).toString();
    }
    get component() {
        const exportEndpoint = `${this.baseApiPath}/component/export`;
        const importEndpoint = `${this.baseApiPath}/component/import`;
        return {
            export: new URL(exportEndpoint, this.webHost).toString(),
            import: new URL(importEndpoint, this.webHost).toString(),
        };
    }
    get isLocal() {
        return this.webGraphqlUrl.includes('127.0.0.1');
    }
    get regenerate() {
        return new URL(`${this.baseApiPath}/regenerate`, this.apiUrl).toString();
    }
    get user() {
        const saveEndpoint = `${this.baseApiPath}/user/save`;
        return {
            save: new URL(saveEndpoint, this.apiUrl).toString(),
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
        return (this._webHost ??= get('NEXT_PUBLIC_WEB_HOST').required().asString());
    }
}

;// ../../libs/shared/config/env/src/services/google-analytics.ts

class GoogleAnalyticsEnvVars {
    constructor() {
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.id = external_env_var_namespaceObject.get('NEXT_PUBLIC_GOOGLE_ANALYTICS').default('').asString();
    }
}

;// ../../libs/shared/config/env/src/services/hotjar.ts

class HotjarEnvVars {
    constructor() {
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "version", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.id = external_env_var_namespaceObject.get('NEXT_PUBLIC_HOTJAR_ID').default('0').asInt();
        this.version = external_env_var_namespaceObject.get('NEXT_PUBLIC_HOTJAR_VERSION').default('0').asInt();
    }
}

;// ../../libs/shared/config/env/src/services/intercom.ts

class IntercomEnvVars {
    constructor() {
        Object.defineProperty(this, "appId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.appId = external_env_var_namespaceObject.get('NEXT_PUBLIC_INTERCOM_APP_ID').default('').asString();
    }
}

;// ../../libs/shared/config/env/src/services/mailchimp.ts

class MailchimpEnvVars {
    constructor() {
        Object.defineProperty(this, "apiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "listId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "serverPrefix", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.apiKey = external_env_var_namespaceObject.get('MAILCHIMP_API_KEY').required().asString();
        this.listId = external_env_var_namespaceObject.get('MAILCHIMP_LIST_ID').required().asString();
        this.serverPrefix = external_env_var_namespaceObject.get('MAILCHIMP_SERVER_PREFIX').required().asString();
    }
}

;// ../../libs/shared/config/env/src/services/neo4j.ts

class Neo4jEnvVars {
    constructor() {
        Object.defineProperty(this, "_password", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_uri", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_user", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    get password() {
        return (this._password ??= external_env_var_namespaceObject.get('NEO4J_PASSWORD').required().asString());
    }
    get uri() {
        return (this._uri ??= external_env_var_namespaceObject.get('NEO4J_URI').required().asUrlString());
    }
    get user() {
        return (this._user ??= external_env_var_namespaceObject.get('NEO4J_USER').required().asString());
    }
}

;// ../../libs/shared/config/env/src/services/node.ts

class NodeEnvVars {
    constructor() {
        Object.defineProperty(this, "_nodeEnv", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    get isCi() {
        return external_env_var_namespaceObject.get('CI').default('false').asBool();
    }
    get isDevelopment() {
        return this.nodeEnv === 'development';
    }
    get isProduction() {
        return this.nodeEnv === 'production';
    }
    get isTest() {
        return this.nodeEnv === 'test';
    }
    get nodeEnv() {
        return (this._nodeEnv ??= external_env_var_namespaceObject.get('NODE_ENV')
            .default('development')
            .asEnum(['development', 'production', 'test']));
    }
}

;// ../../libs/shared/config/env/src/services/supabase.ts
class SupabaseEnvVars {
    constructor() {
        Object.defineProperty(this, "key", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.key = process.env['NEXT_PUBLIC_SUPABASE_KEY'] || '';
        this.url = process.env['NEXT_PUBLIC_SUPABASE_URL'] || '';
    }
}

;// ../../libs/shared/config/env/src/env.ts










/**
 * Env works a bit different in Next.js for the browser, they inline the value by replacing all references process.env with a hard coded value
 *
 * https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#bundling-environment-variables-for-the-browser
 *
 * https://github.com/evanshortiss/env-var/issues/162
 */
class EnvironmentVariables {
    constructor() {
        Object.defineProperty(this, "_auth0", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_circleci", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_endpoint", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_googleAnalytics", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_hotjar", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_intercom", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_mailchimp", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_neo4j", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_node", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_supabase", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    static getInstance() {
        if (!EnvironmentVariables.instance) {
            EnvironmentVariables.instance = new EnvironmentVariables();
        }
        return EnvironmentVariables.instance;
    }
    get auth0() {
        return (this._auth0 ??= new Auth0EnvVars(this.endpoint));
    }
    get circleci() {
        return (this._circleci ??= new CircleCIEnvVars());
    }
    get endpoint() {
        return (this._endpoint ??= new EndpointEnvVars());
    }
    get googleAnalytics() {
        return (this._googleAnalytics ??= new GoogleAnalyticsEnvVars());
    }
    get hotjar() {
        return (this._hotjar ??= new HotjarEnvVars());
    }
    get intercom() {
        return (this._intercom ??= new IntercomEnvVars());
    }
    get mailchimp() {
        return (this._mailchimp ??= new MailchimpEnvVars());
    }
    get neo4j() {
        return (this._neo4j ??= new Neo4jEnvVars());
    }
    get node() {
        return (this._node ??= new NodeEnvVars());
    }
    get supabase() {
        return (this._supabase ??= new SupabaseEnvVars());
    }
}
const getEnv = () => EnvironmentVariables.getInstance();

;// external "dotenv"
const external_dotenv_namespaceObject = require("dotenv");
var external_dotenv_default = /*#__PURE__*/__webpack_require__.n(external_dotenv_namespaceObject);
;// ../../libs/backend/infra/adapter/cli/src/shared/middleware.ts



/**
 * Used locally to load env for other stages
 */
const loadStageMiddleware = ({ stage }) => {
    if (getEnv().circleci.ci) {
        return;
    }
    external_dotenv_default().config({ override: true, path: '.env' });
    // Load prod env only if not CI
    if (stage === Stage.Prod) {
        external_dotenv_default().config({ override: true, path: '.env.prod' });
    }
    if (stage === Stage.Dev) {
        external_dotenv_default().config({ override: true, path: '.env' });
    }
    if (stage === Stage.Test) {
        external_dotenv_default().config({ override: true, path: '.env.test' });
    }
};

;// ../../libs/backend/infra/adapter/cli/src/shared/options.ts

/**
 * Options used locally
 */
const getStageOptions = (stages) => ({
    stage: {
        choices: stages,
        default: Stage.Dev,
        demandOption: true,
        describe: 'Stage used to load proper `.env`',
        type: 'string',
    },
});
const getAutoApproveOptions = () => ({
    autoApprove: {
        default: false,
        type: 'boolean',
    },
});

;// ../../libs/backend/infra/adapter/cli/src/commands/terraform/terraform.service.ts






let TerraformService = class TerraformService {
    constructor() {
        Object.defineProperty(this, "command", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'terraform'
        });
        Object.defineProperty(this, "describe", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'Terraform commands'
        });
        this.builder = this.builder.bind(this);
    }
    builder(yargv) {
        return (yargv
            .options({
            ...getStageOptions([Stage.Dev, Stage.CI, Stage.Prod, Stage.Test]),
            ...getAutoApproveOptions(),
        })
            .middleware([loadStageMiddleware])
            .command('init', 'terraform init', (argv) => argv, ({ stage }) => {
            // Use `tfswitch` to change to specific versions
            execCommand(`cd infra/terraform/environments/${stage} && ./symlink.sh`);
            execCommand('cd infra/terraform/modules && ./symlink.sh');
            execCommand(`export TF_WORKSPACE=${stage}; terraform -chdir=infra/terraform/environments/${stage} init --upgrade;`);
        })
            .command('plan', 'terraform plan', (argv) => argv, ({ stage }) => {
            execCommand(`export TF_WORKSPACE=${stage}; terraform -chdir=infra/terraform/environments/${stage} plan`);
        })
            /**
             * Import does not use Terraform cloud environment variables
             *
             * https://github.com/hashicorp/terraform/issues/23407
             */
            .command('import', 'terraform import', (argv) => argv, ({ stage }) => {
            execCommand(`export TF_WORKSPACE=${stage}; terraform -chdir=infra/terraform/environments/${stage} import aws_lambda_function.nest_cli nest_cli`);
        })
            .command('apply', 'terraform apply', (argv) => argv, ({ autoApprove, stage }) => {
            const autoApproveFlag = autoApprove ? '-auto-approve' : '';
            // Add export TF_LOG=DEBUG for verbose
            execCommand(`export TF_WORKSPACE=${stage}; terraform -chdir=infra/terraform/environments/${stage} apply ${autoApproveFlag}`);
        })
            .command('validate', 'terraform validate', (argv) => argv, ({ stage }) => {
            execCommand(`export TF_WORKSPACE=${stage}; terraform -chdir=infra/terraform/environments/${stage} validate`);
        })
            .command('destroy', 'terraform destroy', (argv) => argv, ({ stage }) => {
            // `terraform state rm`
            execCommand(`export TF_WORKSPACE=${stage}; terraform -chdir=infra/terraform/environments/${stage} destroy`);
        })
            .command('lint', 'terraform lint', (argv) => argv, ({ stage }) => {
            execCommand(`tflint --config="${process.cwd()}/terraform/.tflint.hcl" --recursive`);
            // execCommand(
            //   `tflint --config="${process.cwd()}/terraform/.tflint.hcl" --chdir=infra/terraform/environments/ci`,
            // )
            // execCommand(
            //   `tflint --config="${process.cwd()}/terraform/.tflint.hcl" --chdir=infra/terraform/environments/dev`,
            // )
            // execCommand(
            //   `tflint --config="${process.cwd()}/terraform/.tflint.hcl" --chdir=infra/terraform/environments/prod`,
            // )
            // execCommand(
            //   `tflint --config="${process.cwd()}/terraform/.tflint.hcl" --chdir=infra/terraform/environments/test`,
            // )
        })
            .demandCommand(1, 'Please provide a task'));
    }
    handler(args) {
        //
    }
};
TerraformService = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Injectable)(),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [])
], TerraformService);


;// ../../libs/backend/infra/adapter/shell/src/handle-command.ts
/**
 * Create an HOC handler so we can have global teardown
 */
const globalHandler = (handler) => {
    return async (args) => {
        try {
            await handler(args);
        }
        catch (error) {
            console.error(error);
            // Need this for finally to execute completely
        }
        finally {
            process.exit(0);
        }
    };
};

;// external "child_process"
const external_child_process_namespaceObject = require("child_process");
;// external "git-changed-files"
const external_git_changed_files_namespaceObject = require("git-changed-files");
var external_git_changed_files_default = /*#__PURE__*/__webpack_require__.n(external_git_changed_files_namespaceObject);
;// external "is-port-reachable"
const external_is_port_reachable_namespaceObject = require("is-port-reachable");
var external_is_port_reachable_default = /*#__PURE__*/__webpack_require__.n(external_is_port_reachable_namespaceObject);
;// ../../libs/backend/infra/adapter/cli/src/shared/utils/tasks.ts
var Tasks;
(function (Tasks) {
    Tasks["Build"] = "build";
    Tasks["Commitlint"] = "commitlint";
    Tasks["E2e"] = "e2e";
    Tasks["GraphqlCodegen"] = "graphql-codegen";
    Tasks["Int"] = "int";
    Tasks["Lint"] = "lint";
    Tasks["Unit"] = "unit";
    Tasks["WorkspaceCodegen"] = "workspace-codegen";
})(Tasks || (Tasks = {}));

;// ../../libs/backend/infra/adapter/cli/src/commands/tasks/tasks.service.ts
var tasks_service_a;






// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error






let TaskService = class TaskService {
    constructor(lazyModuleLoader) {
        Object.defineProperty(this, "lazyModuleLoader", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: lazyModuleLoader
        });
        Object.defineProperty(this, "command", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'tasks'
        });
        Object.defineProperty(this, "describe", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'Run tasks'
        });
        this.builder = this.builder.bind(this);
    }
    builder(yargv) {
        return yargv
            .options(getStageOptions([Stage.Dev, Stage.Test, Stage.CI]))
            .middleware([loadStageMiddleware])
            .command(Tasks.Build, 'Build projects', (argv) => argv, globalHandler(({ stage }) => {
            if (stage === Stage.Test) {
                // Added since many times can't find production build of next during push
                // Maybe related? https://github.com/nrwl/nx/issues/2839
                execCommand('nx affected --target=build -c test');
            }
            if (stage === Stage.CI) {
                // Can't use on CI since no `cli` yet
            }
        }))
            .command(Tasks.Unit, 'Run unit tests', (argv) => argv, globalHandler(({ stage }) => {
            if (stage === Stage.Test) {
                // Added since many times can't find production build of next during push
                // Maybe related? https://github.com/nrwl/nx/issues/2839
                // execCommand(`nx build web -c test`)
                execCommand('nx affected --target=test -c test.unit');
            }
            if (stage === Stage.CI) {
                execCommand('pnpm nx affected --target=test -c ci.unit --ci');
            }
        }))
            .command(Tasks.Int, 'Run integration tests', (argv) => argv, globalHandler(({ stage }) => {
            if (stage === Stage.Test) {
                execCommand('nx affected --target=test -c test.integration --parallel=1');
            }
            if (stage === Stage.CI) {
                execCommand('pnpm nx affected --target=test -c ci.integration --runInBand --ci --parallel=1');
            }
        }))
            .command(Tasks.GraphqlCodegen, 'Run codegen', (argv) => argv, globalHandler(async ({ stage }) => {
            if (stage === Stage.Dev) {
                if (!(await external_is_port_reachable_default()(4000, { host: '127.0.0.1' }))) {
                    console.error('Please start server!');
                    process.exit(0);
                }
                execCommand('pnpm graphql-codegen --config ./scripts/codegen/codegen.ts');
                process.exit(0);
            }
            if (stage === Stage.CI) {
                const startServer = 'nx serve api -c ci';
                const runSpecs = "pnpm wait-on 'tcp:127.0.0.1:4000' && pnpm graphql-codegen --config ./scripts/codegen/codegen.ts && exit 0";
                const runSpecsChildProcess = (0,external_child_process_namespaceObject.spawn)(runSpecs, {
                    detached: true,
                    shell: true,
                    stdio: 'inherit',
                });
                const startServerChildProcess = (0,external_child_process_namespaceObject.spawn)(startServer, {
                    detached: true,
                    shell: true,
                    stdio: 'inherit',
                });
                await new Promise((resolve, reject) => {
                    runSpecsChildProcess.on('exit', async (code) => {
                        if (!startServerChildProcess.pid) {
                            reject(new Error('startServerChildProcess.pid is not defined'));
                            return;
                        }
                        try {
                            process.kill(-startServerChildProcess.pid, 'SIGINT');
                            const { unCommittedFiles } = await external_git_changed_files_default()();
                            console.log('Un-committed files', unCommittedFiles);
                            const containsGeneratedFiles = unCommittedFiles.reduce((_matches, file) => {
                                const filename = external_path_default().basename(file);
                                return (_matches ||
                                    filename.includes('.gen.ts') ||
                                    filename === 'schema.graphql');
                            }, false);
                            if (containsGeneratedFiles) {
                                execCommand('git diff');
                                console.error('Please run codegen!');
                                process.exit(1);
                            }
                            resolve();
                        }
                        catch (error) {
                            console.error(error);
                            reject(error);
                        }
                    });
                    runSpecsChildProcess.on('error', (error) => {
                        reject(error);
                    });
                });
            }
        }))
            .command(Tasks.WorkspaceCodegen, 'Generate workspace', (argv) => argv, globalHandler(async ({ stage }) => {
            if (stage === Stage.CI) {
                execCommand('pnpm nx generate @codelab/tools-workspace:nx-project-config --no-interactive');
                const { unCommittedFiles } = await external_git_changed_files_default()();
                console.log('Un-committed files', unCommittedFiles);
                if (unCommittedFiles.length) {
                    execCommand('git diff');
                    console.error('Please generate workspace!');
                    process.exit(1);
                }
            }
        }))
            .command(Tasks.Lint, 'Lint projects', (argv) => argv, globalHandler(({ stage }) => {
            if (stage === Stage.Test) {
                execCommand('pnpm cross-env TIMING=1 lint-staged');
                execCommand('pnpm ls-lint');
            }
            if (stage === Stage.CI) {
                execCommand('pnpm nx affected --target=lint -c ci');
                // Below breaks cache
                // execCommand(
                //   'pnpm nx affected --target=lint -c ci --rule "unused-imports/no-unused-imports: error"',
                // )
                // https://github.com/nrwl/nx/discussions/8769
                execCommand('pnpm prettier --check "./**/*.{graphql,yaml,json}"');
                execCommand('pnpm ls-lint');
            }
        }))
            .command(`${Tasks.Commitlint} [edit]`, 'Commitlint projects', (argv) => argv, globalHandler(({ edit, stage }) => {
            if (stage === Stage.Test) {
                execCommand(`pnpm --no-install commitlint --edit ${edit}`);
            }
            if (stage === Stage.CI) {
                execCommand('./scripts/lint/commitlint-ci.sh');
            }
        }))
            .demandCommand(1, 'Please provide a task');
    }
    handler() {
        //
    }
};
TaskService = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Injectable)(),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (tasks_service_a = typeof core_namespaceObject.LazyModuleLoader !== "undefined" && core_namespaceObject.LazyModuleLoader) === "function" ? tasks_service_a : Object])
], TaskService);


;// external "yargs"
const external_yargs_namespaceObject = require("yargs");
var external_yargs_default = /*#__PURE__*/__webpack_require__.n(external_yargs_namespaceObject);
;// external "yargs/helpers"
const helpers_namespaceObject = require("yargs/helpers");
;// ./src/commands/command.service.ts
var command_service_a, command_service_b, command_service_c;





let CommandService = class CommandService {
    constructor(
    // private readonly scrapeAntdService: ScrapeAntdService,
    // private readonly scrapeHtmlService: ScrapeHtmlService,
    terraformService, taskService, seedService) {
        Object.defineProperty(this, "terraformService", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: terraformService
        });
        Object.defineProperty(this, "taskService", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: taskService
        });
        Object.defineProperty(this, "seedService", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: seedService
        });
    }
    exec() {
        /**
         * --runtimeArgs doesn't allow positional args, so we pass as single string then convert back to positional
         */
        const args = (0,helpers_namespaceObject.hideBin)(process.argv);
        // const args = hideBin(process.argv)[0]?.split(' ')
        void external_yargs_default()(args)
            .scriptName('cli')
            /**
             * These scripts could act on different deployment environment, so we group under `data`
             */
            // .command(this.seedService)
            /**
             * These scripts don't require env to be explicitly set
             */
            .command(this.taskService)
            /**
             * This uses puppeteer to scrape the API documentation as CSV file
             */
            // .command('scrape', 'Antd / Html', (argv) =>
            //   argv.command(this.scrapeAntdService).command(this.scrapeHtmlService),
            // )
            /**
             * Terraform
             */
            .command(this.terraformService)
            .demandCommand(1)
            // Must add this to throw error for unknown arguments
            .strict().argv;
    }
};
CommandService = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Injectable)(),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (command_service_a = typeof TerraformService !== "undefined" && TerraformService) === "function" ? command_service_a : Object, typeof (command_service_b = typeof TaskService !== "undefined" && TaskService) === "function" ? command_service_b : Object, typeof (command_service_c = typeof SeedService !== "undefined" && SeedService) === "function" ? command_service_c : Object])
], CommandService);


;// ./src/commands/command.module.ts
var command_module_a;




let CommandModule = class CommandModule {
    constructor(commandService) {
        Object.defineProperty(this, "commandService", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: commandService
        });
    }
    onModuleInit() {
        this.commandService.exec();
    }
};
CommandModule = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Module)({
        exports: [CommandService],
        imports: [],
        providers: [
            CommandService,
            SeedService,
            // ScrapeAntdService,
            // ScrapeHtmlService,
            TerraformService,
            TaskService,
        ],
    }),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (command_module_a = typeof CommandService !== "undefined" && CommandService) === "function" ? command_module_a : Object])
], CommandModule);


;// ./src/cli.module.ts







const getEnvFilePath = () => {
    const stageFlagIndex = process.argv.findIndex((arg) => arg === '--stage');
    const stage = process.argv[stageFlagIndex + 1];
    if (!stage) {
        throw new Error('Missing or incorrect --stage flag');
    }
    const envFilePath = (file) => external_path_default().resolve(process.cwd(), 'apps/api', file);
    if (stage === Stage.Dev) {
        return envFilePath('.env');
    }
    if (stage === Stage.Test) {
        return envFilePath('.env.test');
    }
    if (stage === Stage.CI) {
        return '';
    }
};
let CliModule = class CliModule {
};
CliModule = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Module)({
        controllers: [],
        imports: [
            config_namespaceObject.ConfigModule.forRoot({
                envFilePath: getEnvFilePath(),
            }),
            CommandModule,
            CodelabLoggerModule,
        ],
        providers: [],
    })
], CliModule);


;// ./src/main.ts


const bootstrap = async () => {
    const app = await core_namespaceObject.NestFactory.createApplicationContext(CliModule, {
        logger: false,
    });
    await app.init();
};
void bootstrap();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;