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
;// external "@nestjs/common"
const common_namespaceObject = require("@nestjs/common");
;// external "@nestjs/config"
const config_namespaceObject = require("@nestjs/config");
;// external "nestjs-pino"
const external_nestjs_pino_namespaceObject = require("nestjs-pino");
;// external "remeda"
const external_remeda_namespaceObject = require("remeda");
;// external "env-var"
const external_env_var_namespaceObject = require("env-var");
;// ../../libs/backend/infra/adapter/logger/src/logger.config.ts


// https://github.com/pinojs/pino/blob/main/docs/api.md#loggerlevels-object
// Extends `LevelMapping`, but use nestjs values
const levelMapping = {
    values: {
        verbose: 10,
        debug: 20,
        info: 30,
        warn: 40,
        error: 50,
        fatal: 60,
    },
    labels: {
        10: 'verbose',
        20: 'debug',
        30: 'info',
        40: 'warn',
        50: 'error',
        60: 'fatal',
    },
};
/**
 * Map from nestjs log levels to pino log levels
 */
const labelMapping = {
    verbose: 'trace',
    debug: 'debug',
    log: 'info',
    warn: 'warn',
    error: 'error',
    fatal: 'fatal',
};
const loggerConfig = (0,config_namespaceObject.registerAs)('LOGGER_CONFIG', () => {
    return {
        get level() {
            /**
             * https://github.com/iamolegga/nestjs-pino
             */
            return (0,external_env_var_namespaceObject.get)('API_LOG_LEVEL')
                .default('info')
                .asEnum(['verbose', 'debug', 'info', 'warn', 'error', 'fatal']);
        },
        get sentryDsn() {
            return (0,external_env_var_namespaceObject.get)('SENTRY_DSN').required().asString();
        },
        get debug() {
            return (0,external_env_var_namespaceObject.get)('DEBUG').default('').asString();
        },
    };
});

;// ../../libs/backend/infra/adapter/logger/src/nestjs.logger.service.ts


let NestjsLoggerService = class NestjsLoggerService extends common_namespaceObject.Logger {
};
NestjsLoggerService = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Injectable)()
], NestjsLoggerService);


;// external "pino"
const external_pino_namespaceObject = require("pino");
var external_pino_default = /*#__PURE__*/__webpack_require__.n(external_pino_namespaceObject);
;// ../../libs/backend/infra/adapter/logger/src/logger.constants.ts
/**
 * Allowed logging namespace modules for the backend
 */
const LOGGING_MODULES = {
    COMMAND: 'command',
    GRAPHQL: 'graphql',
    NEO4J: 'neo4j',
    REPOSITORY: 'repository',
    SERVICE: 'service',
};
/**
 * Log levels that include the data field
 */
const DATA_INCLUSIVE_LEVELS = [
    'verbose',
    'debug',
    'error',
    'fatal',
];
/**
 * Common namespace patterns
 */
const NAMESPACE_PATTERNS = {
    ALL: '*',
    EXCLUSION_PREFIX: '-',
    SEPARATOR: ':',
    WILDCARD: '*',
};
/**
 * Example namespace configurations
 */
const NAMESPACE_EXAMPLES = {
    ALL_COMMAND: `${LOGGING_MODULES.COMMAND}:*`,
    // Module-level patterns
    ALL_GRAPHQL: `${LOGGING_MODULES.GRAPHQL}:*`,
    ALL_NEO4J: `${LOGGING_MODULES.NEO4J}:*`,
    ALL_REPOSITORY: `${LOGGING_MODULES.REPOSITORY}:*`,
    ALL_SERVICE: `${LOGGING_MODULES.SERVICE}:*`,
    COMMAND_CREATE: `${LOGGING_MODULES.COMMAND}:create`,
    GRAPHQL_RESOLVER: `${LOGGING_MODULES.GRAPHQL}:resolver`,
    // Specific patterns
    NEO4J_QUERY: `${LOGGING_MODULES.NEO4J}:query`,
    // Exclusion patterns
    NO_DEPRECATION: `-${LOGGING_MODULES.NEO4J}:deprecation`,
    REPOSITORY_USER: `${LOGGING_MODULES.REPOSITORY}:user`,
    SERVICE_AUTH: `${LOGGING_MODULES.SERVICE}:auth`,
};
/**
 * Validates if a namespace follows the expected pattern
 */
const isValidNamespace = (namespace) => {
    if (!namespace || namespace.trim() === '') {
        return false;
    }
    // Remove exclusion prefix if present
    const cleanNamespace = namespace.startsWith(NAMESPACE_PATTERNS.EXCLUSION_PREFIX)
        ? namespace.substring(1)
        : namespace;
    // Check if it's a wildcard
    if (cleanNamespace === NAMESPACE_PATTERNS.ALL) {
        return true;
    }
    // Check if it starts with a valid module
    const parts = cleanNamespace.split(NAMESPACE_PATTERNS.SEPARATOR);
    const module = parts[0];
    return Object.values(LOGGING_MODULES).includes(module);
};
/**
 * Parse namespace patterns from environment variable
 */
const parseNamespaces = (namespaceString) => {
    if (!namespaceString) {
        return [];
    }
    return namespaceString
        .split(',')
        .map((ns) => ns.trim())
        .filter((ns) => ns.length > 0);
};
/**
 * Check if a namespace is enabled based on patterns
 */
const isNamespaceEnabled = (namespace, patterns) => {
    if (!patterns.length) {
        return false;
    }
    let isEnabled = false;
    for (const pattern of patterns) {
        // Handle exclusion patterns
        if (pattern.startsWith(NAMESPACE_PATTERNS.EXCLUSION_PREFIX)) {
            const excludePattern = pattern.substring(1);
            if (matchesPattern(namespace, excludePattern)) {
                return false;
            }
        }
        else if (matchesPattern(namespace, pattern)) {
            isEnabled = true;
        }
    }
    return isEnabled;
};
/**
 * Check if a namespace matches a pattern (with wildcard support)
 */
const matchesPattern = (namespace, pattern) => {
    // Direct match
    if (namespace === pattern || pattern === NAMESPACE_PATTERNS.ALL) {
        return true;
    }
    // Convert pattern to regex
    const regexPattern = pattern
        .split(NAMESPACE_PATTERNS.WILDCARD)
        .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        .join('.*');
    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(namespace);
};

;// ../../libs/backend/infra/adapter/logger/src/pino/pino.logger.service.ts
var _a, _b;







/**
 * Don't use super, but rather from `logger`
 */
let PinoLoggerService = class PinoLoggerService extends external_nestjs_pino_namespaceObject.Logger {
    constructor(logger, params, config) {
        super(logger, {
            ...params,
        });
        Object.defineProperty(this, "logger", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: logger
        });
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: config
        });
        Object.defineProperty(this, "enabledNamespaces", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "operationCounter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        this.enabledNamespaces = parseNamespaces(this.config.debug);
    }
    async executeWithTiming(message, fn, options, level = 'debug') {
        const context = options?.context ?? undefined;
        const isEnabled = this.isLoggingEnabled(context);
        // If logging is disabled, just execute the function
        if (!isEnabled) {
            return await fn();
        }
        const startTime = Date.now();
        const result = await fn();
        const endTime = Date.now();
        const durationMs = endTime - startTime;
        const durationSecs = (durationMs / 1000).toFixed(2);
        const data = options?.data ?? {};
        // Format start time for display
        const startTimeFormatted = new Date(startTime).toLocaleTimeString('en-US', {
            fractionalSecondDigits: 3,
            hour: 'numeric',
            hour12: true,
            minute: '2-digit',
            second: '2-digit',
        });
        // Pass data and context as separate properties in LogOptions
        this[level](`${message} (started at ${startTimeFormatted}, took ${durationSecs}s)`, {
            context,
            data: {
                ...data,
            },
            durationSecs,
            timing: {
                completedAt: new Date(endTime).toISOString(),
                durationMs,
                startedAt: new Date(startTime).toISOString(),
            },
        });
        return result;
    }
    async debugWithTiming(message, fn, options) {
        return this.executeWithTiming(message, fn, options, 'debug');
    }
    async verboseWithTiming(message, fn, options) {
        return this.executeWithTiming(message, fn, options, 'verbose');
    }
    /**
     * Determines if logging is enabled based on context and configured namespaces.
     *
     * Behavior:
     * - If no namespaces are configured (DEBUG env var is empty), all logs without context are shown
     * - If namespaces are configured:
     *   - Logs without context are always shown (no filtering applied)
     *   - Logs with context are filtered based on enabled namespaces
     *
     * This allows decorators like @LogClassMethod that don't pass context to always log,
     * while still filtering logs that explicitly set a context.
     *
     * @param context - Optional context to check against enabled namespaces
     * @returns true if logging should proceed, false if it should be filtered out
     */
    isLoggingEnabled(context) {
        // If no context provided, always allow logging
        // This ensures decorators like @LogClassMethod work without modification
        if (!context) {
            return true;
        }
        // If no namespaces configured, disable all logs with context
        if (!this.enabledNamespaces.length) {
            return false;
        }
        // Check if the specific context is enabled
        return isNamespaceEnabled(context, this.enabledNamespaces);
    }
    shouldIncludeData(level) {
        // Include data for verbose, debug, error, and fatal levels
        return (level === 'verbose' ||
            level === 'debug' ||
            level === 'error' ||
            level === 'fatal');
    }
    logWithOptions(level, message, options = {}) {
        // Check if logging is enabled for this context
        if (!this.isLoggingEnabled(options.context)) {
            return;
        }
        const mappedLevel = labelMapping[level];
        const logger = this.logger[mappedLevel].bind(this.logger);
        // Include data based on log level
        if (this.shouldIncludeData(level)) {
            logger({ msg: message, ...options });
        }
        else {
            logger({
                msg: message,
                ...(0,external_remeda_namespaceObject.omit)(options, ['data']),
            });
        }
    }
    log(message, options) {
        this.logWithOptions('log', message, options);
    }
    /**
     * If we specify 2 params format, the second param will be under `context` no matter what
     *
     * debug('Hello', 'World') -> DEBUG: Hello /n context: "World"
     * debug('Hello', 'World', '!') -> DEBUG: Hello /n context: "!"
     *
     * If we use single object, we have more control
     *
     * debug({ msg: 'Hello', context: 'World', data: '!' }) -> DEBUG
     *
     *
     * @param message
     * @param options
     */
    debug(message, options) {
        this.logWithOptions('debug', message, options);
    }
    verbose(message, options) {
        this.logWithOptions('verbose', message, options);
    }
    warn(message, options) {
        this.logWithOptions('warn', message, options);
    }
    error(message, options) {
        this.logWithOptions('error', message, options);
    }
    fatal(message, options) {
        this.logWithOptions('fatal', message, options);
    }
    logToFile(object = {}, filePath = 'tmp/logs/application.log') {
        this.log('Logging to file...', {
            context: 'FileLogger',
            data: { filePath },
        });
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
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (_a = typeof external_nestjs_pino_namespaceObject.PinoLogger !== "undefined" && external_nestjs_pino_namespaceObject.PinoLogger) === "function" ? _a : Object, typeof (_b = typeof external_nestjs_pino_namespaceObject.Params !== "undefined" && external_nestjs_pino_namespaceObject.Params) === "function" ? _b : Object, Object])
], PinoLoggerService);


;// external "pino-pretty"
const external_pino_pretty_namespaceObject = require("pino-pretty");
var external_pino_pretty_default = /*#__PURE__*/__webpack_require__.n(external_pino_pretty_namespaceObject);
;// ../../libs/backend/infra/adapter/logger/src/pino/pino-transport.ts

/**
 * https://github.com/pinojs/pino-pretty/issues/504
 */
const prettyOptions = {
    colorize: true,
    // Make this nest.js compatible
    customLevels: {
        verbose: 10,
        debug: 20,
        info: 30,
        warn: 40,
        error: 50,
        fatal: 60,
    },
    // errorLikeObjectKeys: ['err', 'error'],
    /**
     * Yes, Pino automatically adds req and res objects to the logs when used with nestjs-pino because it's designed to work as HTTP middleware by default.
     *
     * These keys are added by `this.logger.assign()`
     */
    // ignore: 'time,pid,hostname,context,req,res,responseTime,level',
    ignore: 'pid,hostname,req,res',
    // levelFirst: false,
    // NestJS-like timestamp
    /**
     * This time appears in front of message, cannot find a way to move it.
     *
     * Pino emphasizes machine readability, so it uses single json line
     */
    // translateTime: 'SYS:mm/dd/yyyy hh:mm:ss TT',
    // messageFormat: (log, messageKey, levelLabel) => {
    //   // console.log(log, messageKey, levelLabel)
    //   const message = JSON.parse(log[messageKey] as string) as LogOptions
    //   const level = log['level'] as number
    //   const hostname = log['hostname']
    //   const time = log['time']
    //   const pid = log['pid']
    //   /**
    //    * Be careful of `context` and `message`, since `LoggerService.info` has method override
    //    */
    //   // const context = log['context']
    //   const context = message.context
    //   const object = message.object ?? {}
    //   /**
    //    * Pino combines all data into a single object, need to extract user data
    //    */
    //   const data = omit(log, ['level', 'time', 'hostname', 'pid', 'req', 'msg'])
    //   return `${chalk.green('[Pino]')} ${chalk.green(pid)}  ${chalk.green(
    //     '-',
    //   )} ${chalk.whiteBright(formatNestLikeDate(time))}     ${chalk.green(
    //     levelsLabels[level]?.toUpperCase(),
    //   )} ${chalk.yellow(`[${context}]`)}\n${colorize(object)}`
    // },
    // singleLine: true,
    sync: true,
    // translateTime: 'SYS:standard',
    translateTime: 'SYS:h:MM:ss TT',
};
const pinoPrettyStream = external_pino_pretty_default()(prettyOptions);

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
                            customLevels: levelMapping.values,
                            // Force synchronous logging at the transport level
                            // customLogLevel: (req, res, err) => {
                            //   // Return default level if no specific conditions are met
                            //   return 'verbose'
                            // },
                            // Turn off using `API_LOG_LEVEL`
                            enabled: true,
                            // Doesn't prefix in front of date
                            // msgPrefix: '[API]',
                            // Set Pino to synchronous mode
                            // formatters: {
                            //   bindings: (bindings) => {
                            //     return {
                            //       ...bindings,
                            //       pid: bindings['pid'],
                            //     }
                            //   },
                            // },
                            level: config.level,
                            mixin: (context) => {
                                return context;
                            },
                            serializers: {
                                /**
                                 * Request object is automatically added to the log by nestjs-pino
                                 */
                                req: (req) => {
                                    // Use omit instead of pick so we know what keys are being removed
                                    return (0,external_remeda_namespaceObject.omit)(req, [
                                        'id',
                                        'headers',
                                        'remoteAddress',
                                        'remotePort',
                                    ]);
                                },
                                // res: (res) => {
                                //   return {
                                //     // Log only specific properties of the response, or return an empty object to exclude all
                                //     statusCode: res.statusCode,
                                //   }
                                // },
                            },
                            /**
                             * You are using both a transport and a destination. You can't have a both (we should probably throw) the transport logic is inherently asynchronous, as it ran off thread. If you want synchronous pretty printing, you should just use it as a stream.
                             */
                            stream: pinoPrettyStream,
                            // transport: {
                            //   options: prettyOptions,
                            //   target: 'pino-pretty',
                            // },
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

;// ../../libs/shared/config/env/src/env.ts

/**
 * https://github.com/evanshortiss/env-var/issues/162
 *
 * `process.env` access must be static and not dynamic, due to how Next.js compiles envs
 */
const env = (0,external_env_var_namespaceObject.from)({
    AUTH0_CLIENT_ID: process.env['AUTH0_CLIENT_ID'],
    AUTH0_CLIENT_SECRET: process.env['AUTH0_CLIENT_SECRET'],
    AUTH0_DOMAIN: process.env['AUTH0_DOMAIN'],
    AUTH0_E2E_PASSWORD: process.env['AUTH0_E2E_PASSWORD'],
    AUTH0_E2E_USERNAME: process.env['AUTH0_E2E_USERNAME'],
    AUTH0_M2M_CLIENT_ID: process.env['AUTH0_M2M_CLIENT_ID'],
    AUTH0_M2M_CLIENT_SECRET: process.env['AUTH0_M2M_CLIENT_SECRET'],
    AUTH0_SECRET: process.env['AUTH0_SECRET'],
    AUTH0_SESSION_AUTO_SAVE: process.env['AUTH0_SESSION_AUTO_SAVE'],
    CI: process.env['CI'],
    CIRCLE: process.env['CIRCLE'],
    E2E: process.env['E2E'],
    MAILCHIMP_API_KEY: process.env['MAILCHIMP_API_KEY'],
    MAILCHIMP_LIST_ID: process.env['MAILCHIMP_LIST_ID'],
    MAILCHIMP_SERVER_PREFIX: process.env['MAILCHIMP_SERVER_PREFIX'],
    NEO4J_PASSWORD: process.env['NEO4J_PASSWORD'],
    NEO4J_URI: process.env['NEO4J_URI'],
    NEO4J_USER: process.env['NEO4J_USER'],
    NEXT_PUBLIC_API_HOSTNAME: process.env['NEXT_PUBLIC_API_HOSTNAME'],
    NEXT_PUBLIC_API_PORT: process.env['NEXT_PUBLIC_API_PORT'],
    NEXT_PUBLIC_BASE_API_PATH: process.env['NEXT_PUBLIC_BASE_API_PATH'],
    NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env['NEXT_PUBLIC_GOOGLE_ANALYTICS'],
    NEXT_PUBLIC_HOTJAR_ID: process.env['NEXT_PUBLIC_HOTJAR_ID'],
    NEXT_PUBLIC_HOTJAR_VERSION: process.env['NEXT_PUBLIC_HOTJAR_VERSION'],
    NEXT_PUBLIC_INTERCOM_APP_ID: process.env['NEXT_PUBLIC_INTERCOM_APP_ID'],
    NEXT_PUBLIC_WEB_HOST: process.env['NEXT_PUBLIC_WEB_HOST'],
    NODE_ENV: process.env['NODE_ENV'],
});

;// ../../libs/shared/config/env/src/services/auth0.ts

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
        Object.defineProperty(this, "_e2eUsername", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_e2ePassword", {
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
        Object.defineProperty(this, "_m2mClientId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_m2mClientSecret", {
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
        return (this._auth0Domain ??= env.get('AUTH0_DOMAIN').required().asString());
    }
    get clientId() {
        return (this._clientId ??= env.get('AUTH0_CLIENT_ID').required().asString());
    }
    get clientSecret() {
        return (this._clientSecret ??= env
            .get('AUTH0_CLIENT_SECRET')
            .required()
            .asString());
    }
    get auth0Username() {
        return (this._e2eUsername ??= env
            .get('AUTH0_E2E_USERNAME')
            .required()
            .asString());
    }
    get auth0Password() {
        return (this._e2ePassword ??= env
            .get('AUTH0_E2E_PASSWORD')
            .required()
            .asString());
    }
    get issuerBaseUrl() {
        const issuerBaseUrl = new URL('/', `https://${this.domain}`).toString();
        return (this._issuerBaseUrl ??= issuerBaseUrl);
    }
    get secret() {
        return (this._secret ??= env.get('AUTH0_SECRET').required().asString());
    }
    get sessionAutoSave() {
        return (this._sessionAutoSave ??= env
            .get('AUTH0_SESSION_AUTO_SAVE')
            .required()
            .asBool());
    }
    get baseUrl() {
        const auth0baseUrl = this.endpoint.webHost;
        return auth0baseUrl;
    }
    get m2mClientId() {
        return (this._m2mClientId ??= env
            .get('AUTH0_M2M_CLIENT_ID')
            .required()
            .asString());
    }
    get m2mClientSecret() {
        return (this._m2mClientSecret ??= env
            .get('AUTH0_M2M_CLIENT_SECRET')
            .required()
            .asString());
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
        return (this._ci ??= env.get('CI').default('false').asBool());
    }
    get circleCi() {
        return (this._circleCi ??= env.get('CIRCLE').default('false').asBool());
    }
}

;// ../../libs/shared/config/env/src/services/endpoint.ts

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
        const port = env.get('NEXT_PUBLIC_API_PORT').required().asPortNumber();
        const url = env.get('NEXT_PUBLIC_API_HOSTNAME').required().asUrlObject();
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
        return env.get('NEXT_PUBLIC_BASE_API_PATH').required().asString();
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
        return (this._webHost ??= env
            .get('NEXT_PUBLIC_WEB_HOST')
            .required()
            .asString());
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
        this.id = env.get('NEXT_PUBLIC_GOOGLE_ANALYTICS').default('').asString();
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
        this.id = env.get('NEXT_PUBLIC_HOTJAR_ID').default('0').asInt();
        this.version = env.get('NEXT_PUBLIC_HOTJAR_VERSION').default('0').asInt();
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
        this.appId = env.get('NEXT_PUBLIC_INTERCOM_APP_ID').default('').asString();
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
        this.apiKey = env.get('MAILCHIMP_API_KEY').required().asString();
        this.listId = env.get('MAILCHIMP_LIST_ID').required().asString();
        this.serverPrefix = env.get('MAILCHIMP_SERVER_PREFIX').required().asString();
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
        return (this._password ??= env.get('NEO4J_PASSWORD').required().asString());
    }
    get uri() {
        return (this._uri ??= env.get('NEO4J_URI').required().asUrlString());
    }
    get user() {
        return (this._user ??= env.get('NEO4J_USER').required().asString());
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
        return env.get('CI').default('false').asBool();
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
        return (this._nodeEnv ??= env
            .get('NODE_ENV')
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

;// ../../libs/shared/config/env/src/config.ts










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
    constructor(logger) {
        Object.defineProperty(this, "logger", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: logger
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
                this.logger.log('Building projects', {
                    context: 'TaskService',
                    data: { stage },
                });
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
                this.logger.log('Running unit tests', {
                    context: 'TaskService',
                    data: { stage },
                });
                execCommand('pnpm nx affected --target=test -c ci.unit --ci');
            }
        }))
            .command(Tasks.Int, 'Run integration tests', (argv) => argv, globalHandler(({ stage }) => {
            if (stage === Stage.Test) {
                this.logger.log('Running integration tests', {
                    context: 'TaskService',
                    data: { stage },
                });
                execCommand('nx affected --target=test -c test.integration --parallel=1');
            }
            if (stage === Stage.CI) {
                this.logger.log('Running integration tests', {
                    context: 'TaskService',
                    data: { stage },
                });
                execCommand('pnpm nx affected --target=test -c ci.integration --runInBand --ci --parallel=1');
            }
        }))
            .command(Tasks.GraphqlCodegen, 'Run codegen', (argv) => argv, globalHandler(async ({ stage }) => {
            if (stage === Stage.Dev) {
                this.logger.log('Running codegen', {
                    context: 'TaskService',
                    data: { stage },
                });
                if (!(await external_is_port_reachable_default()(4000, { host: '127.0.0.1' }))) {
                    this.logger.error('Server not reachable', {
                        context: 'TaskService',
                        data: { port: 4000 },
                    });
                    process.exit(0);
                }
                execCommand('pnpm graphql-codegen --config ./scripts/codegen/codegen.ts');
                process.exit(0);
            }
            if (stage === Stage.CI) {
                this.logger.log('Running codegen', {
                    context: 'TaskService',
                    data: { stage },
                });
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
                            this.logger.error('Server process pid not defined', {
                                context: 'TaskService',
                                data: { pid: startServerChildProcess.pid },
                            });
                            reject(new Error('startServerChildProcess.pid is not defined'));
                            return;
                        }
                        try {
                            process.kill(-startServerChildProcess.pid, 'SIGINT');
                            const { unCommittedFiles } = await external_git_changed_files_default()();
                            this.logger.log('Checking uncommitted files', {
                                context: 'TaskService',
                                data: { unCommittedFiles },
                            });
                            const containsGeneratedFiles = unCommittedFiles.reduce((_matches, file) => {
                                const filename = external_path_default().basename(file);
                                return (_matches ||
                                    filename.includes('.gen.ts') ||
                                    filename === 'schema.graphql');
                            }, false);
                            if (containsGeneratedFiles) {
                                execCommand('git diff');
                                this.logger.error('Generated files not committed', {
                                    context: 'TaskService',
                                    data: { containsGeneratedFiles },
                                });
                                process.exit(1);
                            }
                            resolve();
                        }
                        catch (error) {
                            this.logger.error('Error in codegen process', {
                                context: 'TaskService',
                                data: { error },
                            });
                            reject(error);
                        }
                    });
                    runSpecsChildProcess.on('error', (error) => {
                        this.logger.error('Error in specs process', {
                            context: 'TaskService',
                            data: { error },
                        });
                        reject(error);
                    });
                });
            }
        }))
            .command(Tasks.WorkspaceCodegen, 'Generate workspace', (argv) => argv, globalHandler(async ({ stage }) => {
            if (stage === Stage.CI) {
                this.logger.log('Running Circleci pack', {
                    context: 'TaskService',
                    data: { stage },
                });
                execCommand('pnpm cpack');
                this.logger.log('Generating workspace', {
                    context: 'TaskService',
                    data: { stage },
                });
                execCommand('pnpm nx generate @codelab/tools-workspace:nx-project-config --no-interactive');
                const { unCommittedFiles } = await external_git_changed_files_default()();
                this.logger.log('Checking workspace uncommitted files', {
                    context: 'TaskService',
                    data: { unCommittedFiles },
                });
                if (unCommittedFiles.length) {
                    execCommand('git diff');
                    this.logger.error('Workspace changes not committed', {
                        context: 'TaskService',
                        data: { unCommittedFiles },
                    });
                    process.exit(1);
                }
            }
        }))
            .command(Tasks.Lint, 'Lint projects', (argv) => argv, globalHandler(({ stage }) => {
            if (stage === Stage.Test) {
                this.logger.log('Running lint', {
                    context: 'TaskService',
                    data: { stage },
                });
                execCommand('pnpm cross-env TIMING=1 lint-staged');
            }
            if (stage === Stage.CI) {
                this.logger.log('Running lint', {
                    context: 'TaskService',
                    data: { stage },
                });
                execCommand('pnpm nx affected --target=lint -c ci');
                // Below breaks cache
                // execCommand(
                //   'pnpm nx affected --target=lint -c ci --rule "unused-imports/no-unused-imports: error"',
                // )
                // https://github.com/nrwl/nx/discussions/8769
                execCommand('pnpm prettier --check "./**/*.{graphql,yaml,json}"');
            }
            execCommand('pnpm ls-lint');
        }))
            .command(`${Tasks.Commitlint} [edit]`, 'Commitlint projects', (argv) => argv, globalHandler(({ edit, stage }) => {
            if (stage === Stage.Test) {
                this.logger.log('Running commitlint', {
                    context: 'TaskService',
                    data: { edit, stage },
                });
                execCommand(`pnpm --no-install commitlint --edit ${edit}`);
            }
            if (stage === Stage.CI) {
                this.logger.log('Running commitlint', {
                    context: 'TaskService',
                    data: { stage },
                });
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
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (tasks_service_a = typeof PinoLoggerService !== "undefined" && PinoLoggerService) === "function" ? tasks_service_a : Object])
], TaskService);


;// external "yargs"
const external_yargs_namespaceObject = require("yargs");
var external_yargs_default = /*#__PURE__*/__webpack_require__.n(external_yargs_namespaceObject);
;// external "yargs/helpers"
const helpers_namespaceObject = require("yargs/helpers");
;// ./src/commands/command.service.ts
var command_service_a, command_service_b;





let CommandService = class CommandService {
    constructor(
    // private readonly scrapeAntdService: ScrapeAntdService,
    // private readonly scrapeHtmlService: ScrapeHtmlService,
    terraformService, taskService) {
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
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (command_service_a = typeof TerraformService !== "undefined" && TerraformService) === "function" ? command_service_a : Object, typeof (command_service_b = typeof TaskService !== "undefined" && TaskService) === "function" ? command_service_b : Object])
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
            // SeedService,
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
for(var __webpack_i__ in __webpack_exports__) __webpack_export_target__[__webpack_i__] = __webpack_exports__[__webpack_i__];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;