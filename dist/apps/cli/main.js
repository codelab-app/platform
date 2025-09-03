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
;// ../../libs/shared/infra/logger/src/logger-types.ts
/**
 * Log level priority mapping
 * Lower numbers = higher verbosity
 */
const LOG_LEVELS = {
    debug: 1,
    error: 4,
    fatal: 5,
    info: 2,
    verbose: 0,
    warn: 3,
};
/**
 * Check if a log level is enabled based on configured threshold
 */
const isLevelEnabled = (currentLevel, configuredLevel) => {
    return LOG_LEVELS[currentLevel] >= LOG_LEVELS[configuredLevel];
};
/**
 * Log levels that should include the data field
 */
const DATA_INCLUSIVE_LEVELS = [
    'verbose',
    'debug',
    'error',
    'fatal',
];
/**
 * Check if data should be included for a given log level
 */
const shouldIncludeData = (level) => {
    return DATA_INCLUSIVE_LEVELS.includes(level);
};

;// ../../libs/shared/infra/logger/src/namespace-validation.ts
/**
 * Shared namespace validation utilities for logger configuration
 */
const NAMESPACE_PATTERNS = {
    ALL: '*',
    EXCLUSION_PREFIX: '-',
    SEPARATOR: ':',
    WILDCARD: '*',
};
/**
 * Parse namespace patterns from string (e.g., "service:*,component:*,-component:debug")
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
 * Parse and separate enabled/disabled namespaces
 */
const parseNamespaceConfig = (namespaceString) => {
    const enabled = new Set();
    const disabled = new Set();
    if (!namespaceString) {
        return { disabled, enabled };
    }
    const namespaces = parseNamespaces(namespaceString);
    for (const namespace of namespaces) {
        if (namespace.startsWith(NAMESPACE_PATTERNS.EXCLUSION_PREFIX)) {
            disabled.add(namespace.substring(1));
        }
        else {
            enabled.add(namespace);
        }
    }
    return { disabled, enabled };
};

;// external "env-var"
const external_env_var_namespaceObject = require("env-var");
;// ../../libs/backend/infra/adapter/logger/src/logger.config.ts



// https://github.com/pinojs/pino/blob/main/docs/api.md#loggerlevels-object
// Map shared LOG_LEVELS to Pino's numeric scale (multiplied by 10)
const levelMapping = {
    values: Object.fromEntries(Object.entries(LOG_LEVELS).map(([level, priority]) => [
        level,
        priority * 10,
    ])),
    labels: Object.fromEntries(Object.entries(LOG_LEVELS).map(([level, priority]) => [
        priority * 10,
        level,
    ])),
};
/**
 * Map from nestjs/our log levels to pino log levels
 * Note: NestJS uses 'log' but we use 'info'
 */
const labelMapping = {
    verbose: 'trace',
    debug: 'debug',
    info: 'info',
    // Map NestJS 'log' to 'info'
    log: 'info',
    warn: 'warn',
    error: 'error',
    fatal: 'fatal',
};
/**
 * Validates API_DEBUG environment variable
 * Uses shared validation logic
 */
const validateApiDebug = (value) => {
    if (!value) {
        // Empty is valid
        return value;
    }
    // Just parse to validate format - actual namespace validation happens at runtime
    parseNamespaces(value);
    return value;
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
            const value = (0,external_env_var_namespaceObject.get)('API_DEBUG').default('').asString();
            // Validate the value
            try {
                validateApiDebug(value);
            }
            catch (error) {
                throw new Error(`Invalid API_DEBUG value: ${error instanceof Error ? error.message : String(error)}`);
            }
            return value;
        },
    };
});

;// ../../libs/backend/infra/adapter/logger/src/nestjs.logger.service.ts


let NestjsLoggerService = class NestjsLoggerService extends common_namespaceObject.Logger {
};
NestjsLoggerService = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Injectable)()
], NestjsLoggerService);


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
    // Special case for @neo4j/graphql namespaces
    if (cleanNamespace.startsWith('@neo4j/graphql')) {
        return true;
    }
    // Check if it starts with a valid module
    const parts = cleanNamespace.split(NAMESPACE_PATTERNS.SEPARATOR);
    const module = parts[0];
    return Object.values(LOGGING_MODULES).includes(module);
};
/**
 * Parse namespace patterns from environment variable
 * Delegates to shared implementation
 */
const logger_constants_parseNamespaces = (namespaceString) => {
    return parseNamespaces(namespaceString);
};
/**
 * Check if a namespace is enabled based on patterns
 * Delegates to shared implementation
 */
const logger_constants_isNamespaceEnabled = (namespace, patterns) => {
    return isNamespaceEnabled(namespace, patterns);
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
        this.enabledNamespaces = logger_constants_parseNamespaces(this.config.debug);
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
        this.logWithOptions(level, `${message} (started at ${startTimeFormatted}, took ${durationSecs}s)`, {
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
        return logger_constants_isNamespaceEnabled(context, this.enabledNamespaces);
    }
    shouldIncludeData(level) {
        return shouldIncludeData(level);
    }
    logWithOptions(level, message, options = {}) {
        // Check if logging is enabled for this context
        if (!this.isLoggingEnabled(options.context)) {
            return;
        }
        // Map 'log' to 'info' for our LogLevel type
        const normalizedLevel = level === 'log' ? 'info' : level;
        const mappedLevel = labelMapping[level];
        const logger = this.logger[mappedLevel].bind(this.logger);
        // Include data based on log level
        if (this.shouldIncludeData(normalizedLevel)) {
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
;// ../../libs/backend/infra/adapter/shell/src/handle-command.ts
/**
 * Create an HOC handler so we can have global teardown
 */
const globalHandler = (handler) => {
    return async (args) => {
        let exitCode = 0;
        try {
            await handler(args);
        }
        catch (error) {
            console.error(error);
            exitCode = 1;
        }
        finally {
            process.exit(exitCode);
        }
    };
};

;// external "zx"
const external_zx_namespaceObject = require("zx");
;// ../../libs/backend/infra/adapter/shell/src/shell.ts

// Configure zx to show commands being executed without verbose output
// This logs only the commands, not the output (unless there's an error)
external_zx_namespaceObject.$.verbose = false;
external_zx_namespaceObject.$.log = (entry) => {
    if (entry.kind === 'cmd') {
        console.log(`$ ${entry.cmd}`);
    }
};
/**
 * $ - Standard zx command execution
 *
 * - Captures stdout/stderr for parsing
 * - Any non-zero exit code throws a ProcessOutput error
 * - Error contains full stdout, stderr, and exitCode
 * - Use for commands where you need to process output
 */
const $ = external_zx_namespaceObject.$;
/**
 * $stream - For long-running commands where you want to see output in real-time
 *
 * Use cases:
 * - terraform apply/plan/destroy - see progress as it happens
 * - docker build - see layer progress
 * - npm install - see package download progress
 * - test runners - see test results as they complete
 * - any command that takes > 5 seconds and has progress output
 *
 * Note: Cannot capture output with stdio: 'inherit', so don't use for:
 * - Commands where you need to parse stdout/stderr
 * - Commands where you need the result.stdout value
 *
 * Error handling:
 * - Any non-zero exit code will throw a ProcessOutput error
 * - With stdio: 'inherit', the ProcessOutput will have:
 *   - stdout: '' (empty - output went to terminal)
 *   - stderr: '' (empty - output went to terminal)
 *   - exitCode: null (can't be captured with stdio: 'inherit')
 * - The actual command output is shown in terminal before the error
 *
 * Example:
 *   $stream`terraform apply -auto-approve`
 *   $stream.sync`terraform apply -auto-approve`
 *   $stream.sync({ cwd: 'path/to/dir' })`packer init .`
 *   $stream.syncWithEnv({ FOO: 'bar' })`npm run build`
 */
const $stream = Object.assign(
// Main function for async execution with streaming
(pieces, ...args) => {
    return (0,external_zx_namespaceObject.$)({ stdio: 'inherit' })(pieces, ...args);
}, {
    // Sync method for synchronous execution with streaming
    // Supports both direct template literal and options + template literal
    sync: ((piecesOrOptions, ...args) => {
        // If first arg is a template literal array, execute directly
        if (Array.isArray(piecesOrOptions) && 'raw' in piecesOrOptions) {
            return external_zx_namespaceObject.$.sync({ stdio: 'inherit' })(piecesOrOptions, ...args);
        }
        // If first arg is options object, return a function that accepts template literal
        const options = piecesOrOptions;
        return (pieces, ...templateArgs) => {
            return external_zx_namespaceObject.$.sync({ stdio: 'inherit', ...options })(pieces, ...templateArgs);
        };
    }),
    // Sync with env option - returns a function that accepts template literal
    syncWithEnv: (env) => {
        return (pieces, ...args) => {
            return external_zx_namespaceObject.$.sync({ stdio: 'inherit', env })(pieces, ...args);
        };
    },
});

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
    DIGITALOCEAN_API_TOKEN: process.env['DIGITALOCEAN_API_TOKEN'],
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
    NEXT_PUBLIC_SUPABASE_KEY: process.env['NEXT_PUBLIC_SUPABASE_KEY'],
    NEXT_PUBLIC_SUPABASE_URL: process.env['NEXT_PUBLIC_SUPABASE_URL'],
});

;// ../../libs/shared/config/env/src/services/auth0.ts

/**
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
    }
    get audience() {
        return new URL('api/v2/', this.issuerBaseUrl).toString();
    }
    get domain() {
        return env.get('AUTH0_DOMAIN').required().asString();
    }
    get clientId() {
        return env.get('AUTH0_CLIENT_ID').required().asString();
    }
    get clientSecret() {
        return env.get('AUTH0_CLIENT_SECRET').required().asString();
    }
    get auth0Username() {
        return env.get('AUTH0_E2E_USERNAME').required().asString();
    }
    get auth0Password() {
        return env.get('AUTH0_E2E_PASSWORD').required().asString();
    }
    get issuerBaseUrl() {
        return new URL('/', `https://${this.domain}`).toString();
    }
    get secret() {
        return env.get('AUTH0_SECRET').required().asString();
    }
    get sessionAutoSave() {
        return env.get('AUTH0_SESSION_AUTO_SAVE').required().asBool();
    }
    get baseUrl() {
        return this.endpoint.webHost;
    }
    get m2mClientId() {
        return env.get('AUTH0_M2M_CLIENT_ID').required().asString();
    }
    get m2mClientSecret() {
        return env.get('AUTH0_M2M_CLIENT_SECRET').required().asString();
    }
}

;// ../../libs/shared/config/env/src/services/circleci.ts

class CircleCIEnvVars {
    get ci() {
        return env.get('CI').default('false').asBool();
    }
    get circleCi() {
        return env.get('CIRCLE').default('false').asBool();
    }
}

;// ../../libs/shared/config/env/src/services/digitalocean.ts

class DigitalOceanEnvVars {
    get digitalOceanApiToken() {
        return env.get('DIGITALOCEAN_API_TOKEN').default('').asString();
    }
}

;// ../../libs/shared/config/env/src/services/endpoint.ts

class EndpointEnvVars {
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
        const port = env.get('NEXT_PUBLIC_API_PORT').required().asPortNumber();
        const url = env.get('NEXT_PUBLIC_API_HOSTNAME').required().asUrlObject();
        return new URL(`${url.origin}:${port}`).toString();
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
        return env.get('NEXT_PUBLIC_WEB_HOST').required().asString();
    }
}

;// ../../libs/shared/config/env/src/services/google-analytics.ts

class GoogleAnalyticsEnvVars {
    get id() {
        return env.get('NEXT_PUBLIC_GOOGLE_ANALYTICS').default('').asString();
    }
}

;// ../../libs/shared/config/env/src/services/hotjar.ts

class HotjarEnvVars {
    get id() {
        return env.get('NEXT_PUBLIC_HOTJAR_ID').default('0').asInt();
    }
    get version() {
        return env.get('NEXT_PUBLIC_HOTJAR_VERSION').default('0').asInt();
    }
}

;// ../../libs/shared/config/env/src/services/intercom.ts

class IntercomEnvVars {
    get appId() {
        return env.get('NEXT_PUBLIC_INTERCOM_APP_ID').default('').asString();
    }
}

;// ../../libs/shared/config/env/src/services/mailchimp.ts

class MailchimpEnvVars {
    get apiKey() {
        return env.get('MAILCHIMP_API_KEY').required().asString();
    }
    get listId() {
        return env.get('MAILCHIMP_LIST_ID').required().asString();
    }
    get serverPrefix() {
        return env.get('MAILCHIMP_SERVER_PREFIX').required().asString();
    }
}

;// ../../libs/shared/config/env/src/services/neo4j.ts

class Neo4jEnvVars {
    get password() {
        return env.get('NEO4J_PASSWORD').required().asString();
    }
    get uri() {
        return env.get('NEO4J_URI').required().asUrlString();
    }
    get user() {
        return env.get('NEO4J_USER').required().asString();
    }
}

;// ../../libs/shared/config/env/src/services/node.ts

class NodeEnvVars {
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
        return env
            .get('NODE_ENV')
            .default('development')
            .asEnum(['development', 'production', 'test']);
    }
}

;// ../../libs/shared/config/env/src/services/supabase.ts

class SupabaseEnvVars {
    get key() {
        return env.get('NEXT_PUBLIC_SUPABASE_KEY').default('').asString();
    }
    get url() {
        return env.get('NEXT_PUBLIC_SUPABASE_URL').default('').asString();
    }
}

;// ../../libs/shared/config/env/src/config.ts











/* eslint-disable @typescript-eslint/member-ordering */
/**
 * Env works a bit different in Next.js for the browser, they inline the value by replacing all references process.env with a hard coded value
 *
 * https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#bundling-environment-variables-for-the-browser
 *
 * https://github.com/evanshortiss/env-var/issues/162
 */
class EnvironmentVariables {
    constructor() {
        // Create endpoint first as auth0 depends on it
        Object.defineProperty(this, "endpoint", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new EndpointEnvVars()
        });
        Object.defineProperty(this, "auth0", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Auth0EnvVars(this.endpoint)
        });
        Object.defineProperty(this, "circleci", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new CircleCIEnvVars()
        });
        Object.defineProperty(this, "digitalocean", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new DigitalOceanEnvVars()
        });
        Object.defineProperty(this, "googleAnalytics", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new GoogleAnalyticsEnvVars()
        });
        Object.defineProperty(this, "hotjar", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new HotjarEnvVars()
        });
        Object.defineProperty(this, "intercom", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new IntercomEnvVars()
        });
        Object.defineProperty(this, "mailchimp", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new MailchimpEnvVars()
        });
        Object.defineProperty(this, "neo4j", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Neo4jEnvVars()
        });
        Object.defineProperty(this, "node", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new NodeEnvVars()
        });
        Object.defineProperty(this, "supabase", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new SupabaseEnvVars()
        });
    }
    static getInstance() {
        if (!EnvironmentVariables.instance) {
            EnvironmentVariables.instance = new EnvironmentVariables();
        }
        return EnvironmentVariables.instance;
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
        default: true,
        type: 'boolean',
    },
});

;// ../../libs/backend/infra/adapter/cli/src/commands/docker/docker.service.ts







let DockerService = class DockerService {
    constructor() {
        Object.defineProperty(this, "command", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'docker'
        });
        Object.defineProperty(this, "describe", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'Docker commands'
        });
        // Middleware to fetch Docker tag version
        Object.defineProperty(this, "fetchDockerTagVersion", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (args) => {
                const dockerTagVersion = args['dockerTagVersion'] ||
                    (0,external_env_var_namespaceObject.get)('DOCKER_TAG_VERSION').default('latest').asString();
                args['dockerTagVersion'] = dockerTagVersion;
            }
        });
        this.builder = this.builder.bind(this);
    }
    builder(yargv) {
        return yargv
            .options({
            ...getStageOptions([Stage.Dev, Stage.CI, Stage.Prod, Stage.Test]),
        })
            .middleware([loadStageMiddleware, this.fetchDockerTagVersion])
            .command('build [service]', 'Build Docker images using Docker Bake', (argv) => argv
            .positional('service', {
            describe: 'Service to build (api, landing, web, sites). Omit to build all',
            type: 'string',
            choices: ['api', 'landing', 'web', 'sites'],
        })
            .option('push', {
            describe: 'Push images to registry after building',
            type: 'boolean',
            default: false,
        })
            .option('dockerTagVersion', {
            alias: 'tag',
            describe: 'Docker tag version',
            type: 'string',
        }), globalHandler(({ dockerTagVersion, push, service }) => {
            const pushFlag = push ? '--push' : '';
            const targets = service ? [service] : [];
            const env = { ...process.env, DOCKER_TAG_VERSION: dockerTagVersion };
            if (pushFlag) {
                $stream.syncWithEnv(env) `docker buildx bake --file .docker/docker-bake.hcl ${pushFlag} ${targets}`;
            }
            else {
                $stream.syncWithEnv(env) `docker buildx bake --file .docker/docker-bake.hcl ${targets}`;
            }
        }))
            .command('push [service]', 'Push Docker images to registry', (argv) => argv
            .positional('service', {
            describe: 'Service to push (api, landing, web, sites). Omit to push all',
            type: 'string',
            choices: ['api', 'landing', 'web', 'sites'],
        })
            .option('dockerTagVersion', {
            alias: 'tag',
            describe: 'Docker tag version',
            type: 'string',
        }), globalHandler(({ dockerTagVersion, service }) => {
            const targets = service ? [service] : [];
            const env = { ...process.env, DOCKER_TAG_VERSION: dockerTagVersion };
            $stream.syncWithEnv(env) `docker buildx bake --file .docker/docker-bake.hcl --push ${targets}`;
        }))
            .command('cleanup', 'Clean up old Docker images from DigitalOcean registry (keeps last 3 versions)', (argv) => argv, globalHandler(() => {
            const repositories = ['api', 'landing', 'web', 'sites'];
            const keepLastN = 3;
            for (const repo of repositories) {
                console.log(`\nProcessing repository: ${repo}`);
                // Get all tags sorted by date (newest first), excluding 'latest'
                const result = $.sync `doctl registry repository list-tags ${repo} --format Tag,UpdatedAt --no-header | grep -v "^latest" | sort -k2 -r || true`;
                const output = result.stdout.trim();
                if (!output) {
                    console.log(`No tags found for ${repo}`);
                    continue;
                }
                const tagLines = output.split('\n').filter(Boolean);
                if (tagLines.length <= keepLastN) {
                    console.log(`Repository has ${tagLines.length} tags, keeping all (minimum: ${keepLastN})`);
                    continue;
                }
                // Tags to delete (skip the first keepLastN)
                const tagsToDelete = tagLines
                    .slice(keepLastN)
                    .map((line) => line.split(/\s+/)[0])
                    .filter(Boolean);
                if (tagsToDelete.length > 0) {
                    console.log(`Deleting ${tagsToDelete.length} old tags from ${repo}...`);
                    $stream.sync `doctl registry repository delete-tag ${repo} ${tagsToDelete} --force`;
                    console.log(`Deleted ${tagsToDelete.length} tags from ${repo}`);
                }
            }
            // Start garbage collection
            console.log('\nStarting garbage collection to reclaim space...');
            $stream.sync `doctl registry garbage-collection start --include-untagged-manifests --force`;
            console.log('Garbage collection started');
        }))
            .demandCommand(1, 'Please provide a task');
    }
    handler() {
        //
    }
};
DockerService = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Injectable)(),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [])
], DockerService);


;// ../../libs/backend/infra/adapter/cli/src/commands/packer/packer.types.ts
var PackerImage;
(function (PackerImage) {
    PackerImage["Api"] = "api";
    PackerImage["Base"] = "base";
    PackerImage["ConsulServer"] = "consul-server";
    PackerImage["Grafana"] = "grafana";
    PackerImage["Landing"] = "landing";
    PackerImage["Neo4j"] = "neo4j";
    PackerImage["Sites"] = "sites";
    PackerImage["Web"] = "web";
})(PackerImage || (PackerImage = {}));

;// ../../libs/backend/infra/adapter/cli/src/commands/packer/packer.service.ts






let PackerService = class PackerService {
    constructor() {
        Object.defineProperty(this, "command", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'packer'
        });
        Object.defineProperty(this, "describe", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'Packer commands for building machine images'
        });
        // Reusable middleware functions
        Object.defineProperty(this, "fetchConsulEncryptKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (args) => {
                console.log('Fetching CONSUL_ENCRYPT_KEY from prod-packer workspace...');
                const result = $.sync({
                    cwd: 'infra/terraform/environments/prod-packer',
                }) `terraform output -raw consul_encrypt_key`;
                args['consulEncryptKey'] = result.stdout.trim();
                console.log('✓ CONSUL_ENCRYPT_KEY fetched successfully');
            }
        });
        Object.defineProperty(this, "fetchDigitalOceanToken", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (args) => {
                const digitaloceanApiToken = (0,external_env_var_namespaceObject.get)('DIGITALOCEAN_API_TOKEN')
                    .required()
                    .asString();
                args['digitaloceanApiToken'] = digitaloceanApiToken;
            }
        });
        Object.defineProperty(this, "packerDir", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'infra/packer'
        });
        this.builder = this.builder.bind(this);
    }
    builder(yargv) {
        return yargv
            .command('build [images..]', 'Build Packer images', (argv) => argv
            .middleware(this.fetchDigitalOceanToken)
            .middleware(this.fetchConsulEncryptKey)
            .positional('images', {
            describe: 'Images to build (defaults to all)',
            type: 'string',
            array: true,
            choices: Object.values(PackerImage),
            default: Object.values(PackerImage),
        }), globalHandler(({ consulEncryptKey, digitaloceanApiToken, images }) => {
            const imageDir = (0,external_path_namespaceObject.join)(this.packerDir, 'images');
            // Set up cleanup handler for Ctrl+C
            const cleanup = () => {
                this.cleanupDroplets(digitaloceanApiToken);
                this.cleanupSnapshots(images, digitaloceanApiToken);
            };
            try {
                $stream.sync `cd ${imageDir} && packer init .`;
                // Check if base image is in the list and needs to be built first
                const hasBase = images.includes(PackerImage.Base);
                const otherImages = images.filter((img) => img !== PackerImage.Base);
                if (hasBase) {
                    // Build base image first
                    console.log('Building base image first...');
                    this.createImages([PackerImage.Base], imageDir, consulEncryptKey, digitaloceanApiToken);
                }
                // Build remaining images in parallel
                this.createImages(otherImages, imageDir, consulEncryptKey, digitaloceanApiToken);
            }
            finally {
                cleanup();
            }
        }))
            .command('validate [images..]', 'Validate Packer templates', (argv) => argv
            .middleware(this.fetchDigitalOceanToken)
            .middleware(this.fetchConsulEncryptKey)
            .positional('images', {
            describe: 'Images to validate (defaults to all)',
            type: 'string',
            array: true,
            choices: Object.values(PackerImage),
            default: Object.values(PackerImage),
        }), globalHandler(({ consulEncryptKey, digitaloceanApiToken, images }) => {
            const servicesDir = (0,external_path_namespaceObject.join)(this.packerDir, 'images');
            // Initialize once for all validations
            $stream.sync({ cwd: servicesDir }) `packer init .`;
            // Build the -only flag for validation
            const onlyFlags = images
                .map((image) => {
                return `digitalocean.${image}`;
            })
                .join(',');
            console.log(`Validating ${images.length} image(s)...`);
            // Validate all requested images at once
            $stream.sync `cd ${servicesDir} && packer validate -only='${onlyFlags}' -var digitalocean_api_token=${digitaloceanApiToken} -var consul_encrypt_key=${consulEncryptKey} .`;
        }))
            .command('list-images', 'List Packer-built images in DigitalOcean', (argv) => argv, globalHandler(() => {
            $stream.sync `doctl compute image list --public=false | grep "codelab-.*-base"`;
        }))
            .command('init', 'Initialize Packer configuration', (argv) => argv, globalHandler(() => {
            // Initialize the images directory
            const servicesDir = (0,external_path_namespaceObject.join)(this.packerDir, 'images');
            $stream.sync({ cwd: servicesDir }) `packer init .`;
        }))
            .command('fmt', 'Format Packer configuration files', (argv) => argv.options({
            check: {
                describe: 'Check if files are formatted (exit 1 if not)',
                type: 'boolean',
                default: false,
            },
        }), globalHandler(({ check }) => {
            if (check) {
                $stream.sync `packer fmt -check ${this.packerDir}`;
            }
            else {
                $stream.sync `packer fmt ${this.packerDir}`;
            }
        }))
            .command('get-latest-snapshot', 'Get the latest snapshot ID', (argv) => argv.middleware(this.fetchDigitalOceanToken).option('service', {
            describe: 'Service name (default: base)',
            type: 'string',
            default: 'base',
        }), globalHandler(({ digitaloceanApiToken, service }) => {
            const pattern = `codelab-${service}`;
            const result = $.sync({
                verbose: false,
                env: {
                    ...process.env,
                    DIGITALOCEAN_API_TOKEN: digitaloceanApiToken,
                },
            }) `doctl compute snapshot list --format ID,Name,CreatedAt --no-header | grep ${pattern} | sort -k3 -r | head -1 | awk '{print $1}'`;
            const output = result.stdout.trim();
            if (!output) {
                console.error(`Error: No snapshot found for service: ${service}`);
                process.exit(1);
            }
            // Output JSON format for Packer's external data source
            console.log(JSON.stringify({ id: output }));
        }))
            .command('cleanup', 'Clean up old Packer snapshots (keeps only latest)', (argv) => argv.middleware(this.fetchDigitalOceanToken), globalHandler(({ digitaloceanApiToken }) => {
            this.cleanupSnapshots(Object.values(PackerImage), digitaloceanApiToken);
        }))
            .demandCommand(1, 'Please provide a command');
    }
    handler(_args) {
        // Handler implementation if needed
    }
    /**
     * Create Packer images
     */
    createImages(images, imageDir, consulEncryptKey, digitaloceanApiToken) {
        $stream.sync `cd ${imageDir} && packer build -only='${images
            .map((img) => `digitalocean.${img}`)
            .join(',')}' -var digitalocean_api_token=${digitaloceanApiToken} -var consul_encrypt_key=${consulEncryptKey} .`;
    }
    /**
     * Clean up old snapshots for given images
     */
    cleanupSnapshots(images, digitaloceanApiToken) {
        // Get all snapshots once
        const allSnapshots = $.sync({
            verbose: false,
            env: { ...process.env, DIGITALOCEAN_API_TOKEN: digitaloceanApiToken },
        }) `doctl compute snapshot list --format ID,Name --no-header`;
        const snapshotLines = allSnapshots.stdout
            .trim()
            .split('\n')
            .filter((line) => line);
        // Group snapshots by image type and collect old ones to delete
        const idsToDelete = images.flatMap((image) => snapshotLines
            .filter((line) => line.includes(`codelab-${image}-`))
            .sort((a, b) => b.localeCompare(a)) // Sort by name descending (newest first)
            .slice(1) // Skip the first (newest) one
            .map((line) => line.split(/\s+/)[0]));
        // Delete all snapshots in a single command
        if (idsToDelete.length > 0) {
            console.log(`Deleting ${idsToDelete.length} old snapshots: ${idsToDelete.join(' ')}`);
            $.sync({
                env: { ...process.env, DIGITALOCEAN_API_TOKEN: digitaloceanApiToken },
            }) `doctl compute snapshot delete ${idsToDelete.join(' ')} --force || true`;
        }
        console.log('\nCurrent snapshots:');
        const pattern = images.map((img) => `codelab-${img}-`).join('\\|');
        $.sync({
            env: { ...process.env, DIGITALOCEAN_API_TOKEN: digitaloceanApiToken },
        }) `doctl compute snapshot list --format Name,Size,CreatedAt | grep "${pattern}" || true`;
    }
    /**
     * Clean up Packer droplets
     */
    cleanupDroplets(digitaloceanApiToken) {
        $.sync({
            env: { ...process.env, DIGITALOCEAN_API_TOKEN: digitaloceanApiToken },
        }) `doctl compute droplet list --format ID,Name --no-header | grep "packer-" | awk '{print $1}' | xargs -I {} doctl compute droplet delete {} --force 2>/dev/null || true`;
    }
};
PackerService = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Injectable)(),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [])
], PackerService);


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
        })
            .middleware([loadStageMiddleware])
            .command('init', 'terraform init', (argv) => argv, globalHandler(({ stage }) => {
            // Use `tfswitch` to change to specific versions
            $stream.sync({
                cwd: `infra/terraform/environments/${stage}`,
            }) `./symlink.sh`;
            $stream.sync({ cwd: 'infra/terraform/modules' }) `./symlink.sh`;
            const env = { ...process.env, TF_WORKSPACE: stage };
            $stream.syncWithEnv(env) `terraform -chdir=infra/terraform/environments/${stage} init --upgrade`;
        }))
            .command('plan', 'terraform plan', (argv) => argv.option('tag', {
            describe: 'Docker tag version',
            type: 'string',
        }), globalHandler(({ stage, tag }) => {
            const env = {
                ...process.env,
                TF_WORKSPACE: stage,
                ...(tag && { DOCKER_TAG_VERSION: tag }),
            };
            $stream.syncWithEnv(env) `terraform -chdir=infra/terraform/environments/${stage} plan`;
        }))
            /**
             * Import does not use Terraform cloud environment variables
             *
             * https://github.com/hashicorp/terraform/issues/23407
             */
            .command('import', 'terraform import', (argv) => argv, globalHandler(({ stage }) => {
            const env = { ...process.env, TF_WORKSPACE: stage };
            $stream.syncWithEnv(env) `terraform -chdir=infra/terraform/environments/${stage} import aws_lambda_function.nest_cli nest_cli`;
        }))
            .command('apply', 'terraform apply', (argv) => argv
            .option('tag', {
            describe: 'Docker tag version',
            type: 'string',
        })
            .option('autoApprove', {
            describe: 'Automatically approve terraform changes',
            type: 'boolean',
            default: true,
        }), globalHandler(({ autoApprove, stage, tag }) => {
            const autoApproveFlag = autoApprove ? '-auto-approve' : '';
            const tfDir = `infra/terraform/environments/${stage}`;
            let consulAddr;
            // Only prod stage requires consul two-stage apply
            if (stage === 'prod') {
                /**
                 * Two-stage Terraform apply to solve the Consul provider bootstrap problem:
                 *
                 * Problem: The Consul provider needs the Consul server's IP address, but the server
                 * doesn't exist until Terraform creates it. Providers are initialized before resources
                 * are created, causing a chicken-and-egg problem.
                 *
                 * Solution: Apply in two stages:
                 * 1. Create Consul server first using -target
                 * 2. Set CONSUL_HTTP_ADDR environment variable with the server's IP
                 * 3. Apply remaining resources (Consul provider now has correct address)
                 */
                // Stage 1: Create Consul server infrastructure only
                this.applyConsulInfrastructure(stage, tfDir, autoApproveFlag, tag);
                // Get Consul server IP and configure environment
                const consulIP = this.getConsulServerIP();
                consulAddr = `${consulIP}:8500`;
            }
            // Apply terraform with or without consul address
            this.applyTerraform(stage, tfDir, autoApproveFlag, tag, consulAddr);
            console.log('✨ Terraform apply completed successfully');
        }))
            .command('validate', 'terraform validate', (argv) => argv, globalHandler(({ stage }) => {
            const env = { ...process.env, TF_WORKSPACE: stage };
            $stream.syncWithEnv(env) `terraform -chdir=infra/terraform/environments/${stage} validate`;
        }))
            .command('destroy', 'terraform destroy', (argv) => argv, globalHandler(({ stage }) => {
            // `terraform state rm`
            const env = { ...process.env, TF_WORKSPACE: stage };
            $stream.syncWithEnv(env) `terraform -chdir=infra/terraform/environments/${stage} destroy`;
        }))
            .command('lint', 'terraform lint', (argv) => argv, globalHandler(() => {
            const cwd = process.cwd();
            $stream.sync `tflint --config="${cwd}/terraform/.tflint.hcl" --recursive`;
            // exec(
            //   `tflint --config="${process.cwd()}/terraform/.tflint.hcl" --chdir=infra/terraform/environments/ci`,
            // )
            // exec(
            //   `tflint --config="${process.cwd()}/terraform/.tflint.hcl" --chdir=infra/terraform/environments/dev`,
            // )
            // exec(
            //   `tflint --config="${process.cwd()}/terraform/.tflint.hcl" --chdir=infra/terraform/environments/prod`,
            // )
            // exec(
            //   `tflint --config="${process.cwd()}/terraform/.tflint.hcl" --chdir=infra/terraform/environments/test`,
            // )
        }))
            .demandCommand(1, 'Please provide a task'));
    }
    handler() {
        //
    }
    // Helper methods for two-stage Terraform apply
    applyConsulInfrastructure(stage, tfDir, autoApproveFlag, tag) {
        console.log('🔧 Stage 1/2: Creating Consul server infrastructure...');
        const env = {
            ...process.env,
            TF_WORKSPACE: stage,
            ...(tag && { DOCKER_TAG_VERSION: tag }),
        };
        $stream.syncWithEnv(env) `terraform -chdir=${tfDir} apply -target=module.consul ${autoApproveFlag}`;
    }
    applyTerraform(stage, tfDir, autoApproveFlag, tag, consulAddr) {
        if (consulAddr) {
            console.log('🚀 Stage 2/2: Applying remaining infrastructure and configuration...');
            console.log(`Setting CONSUL_HTTP_ADDR=${consulAddr}`);
        }
        const env = {
            ...process.env,
            TF_WORKSPACE: stage,
            ...(tag && { DOCKER_TAG_VERSION: tag }),
            ...(consulAddr && { CONSUL_HTTP_ADDR: consulAddr }),
        };
        $stream.syncWithEnv(env) `terraform -chdir=${tfDir} apply ${autoApproveFlag}`;
    }
    getConsulServerIP() {
        console.log('🔍 Retrieving Consul server IP address...');
        // Use doctl to get the Consul server's public IP by droplet name
        const result = $.sync `doctl compute droplet get consul-server --format PublicIPv4 --no-header`;
        const consulIP = result.stdout.trim();
        if (!consulIP) {
            throw new Error('Failed to retrieve Consul server IP address from DigitalOcean');
        }
        console.log(`✅ Consul server IP: ${consulIP}`);
        return consulIP;
    }
};
TerraformService = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Injectable)(),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [])
], TerraformService);


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

// eslint-disable-next-line @typescript-eslint/consistent-type-imports





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
                $stream.sync `nx affected --target=build -c test`;
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
                // $`nx build web -c test`
                $stream.sync `nx affected --target=test -c test.unit`;
            }
            if (stage === Stage.CI) {
                this.logger.log('Running unit tests', {
                    context: 'TaskService',
                    data: { stage },
                });
                $stream.sync `pnpm nx affected --target=test -c ci.unit --ci`;
            }
        }))
            .command(Tasks.Int, 'Run integration tests', (argv) => argv, globalHandler(({ stage }) => {
            if (stage === Stage.Test) {
                this.logger.log('Running integration tests', {
                    context: 'TaskService',
                    data: { stage },
                });
                $stream.sync `nx affected --target=test -c test.integration --parallel=1`;
            }
            if (stage === Stage.CI) {
                this.logger.log('Running integration tests', {
                    context: 'TaskService',
                    data: { stage },
                });
                $stream.sync `pnpm nx affected --target=test -c ci.integration --runInBand --ci --parallel=1`;
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
                // Use spawn for streaming output
                const codegenProcess = (0,external_child_process_namespaceObject.spawn)('pnpm', ['graphql-codegen', '--config', './scripts/codegen/codegen.ts'], {
                    stdio: 'inherit',
                    shell: true,
                });
                await new Promise((resolve, reject) => {
                    codegenProcess.on('exit', (code) => {
                        if (code === 0) {
                            resolve();
                        }
                        else {
                            reject(new Error(`Codegen failed with code ${code}`));
                        }
                    });
                    codegenProcess.on('error', reject);
                });
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
                                $stream.sync `git diff`;
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
                $stream.sync `pnpm cpack`;
                this.logger.log('Generating workspace', {
                    context: 'TaskService',
                    data: { stage },
                });
                $stream.sync `pnpm nx generate @codelab/tools-workspace:nx-project-config --no-interactive`;
                const { unCommittedFiles } = await external_git_changed_files_default()();
                this.logger.log('Checking workspace uncommitted files', {
                    context: 'TaskService',
                    data: { unCommittedFiles },
                });
                if (unCommittedFiles.length) {
                    $stream.sync `git diff`;
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
                $stream.sync `pnpm cross-env TIMING=1 lint-staged`;
            }
            if (stage === Stage.CI) {
                this.logger.log('Running lint', {
                    context: 'TaskService',
                    data: { stage },
                });
                $stream.sync `pnpm nx affected --target=lint -c ci`;
                // Below breaks cache
                // $`pnpm nx affected --target=lint -c ci --rule "unused-imports/no-unused-imports: error"`
                // https://github.com/nrwl/nx/discussions/8769
                $stream.sync `pnpm prettier --check "./**/*.{graphql,yaml,json}"`;
            }
            $stream.sync `pnpm ls-lint`;
        }))
            .command(`${Tasks.Commitlint} [edit]`, 'Commitlint projects', (argv) => argv, globalHandler(({ edit, stage }) => {
            if (stage === Stage.Test) {
                this.logger.log('Running commitlint', {
                    context: 'TaskService',
                    data: { edit, stage },
                });
                $.sync `pnpm --no-install commitlint --edit ${edit}`;
            }
            if (stage === Stage.CI) {
                this.logger.log('Running commitlint', {
                    context: 'TaskService',
                    data: { stage },
                });
                $.sync `./scripts/lint/commitlint-ci.sh`;
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
var command_service_a, command_service_b, _c, _d;





let CommandService = class CommandService {
    constructor(dockerService, packerService, 
    // private readonly scrapeAntdService: ScrapeAntdService,
    // private readonly scrapeHtmlService: ScrapeHtmlService,
    terraformService, taskService) {
        Object.defineProperty(this, "dockerService", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: dockerService
        });
        Object.defineProperty(this, "packerService", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: packerService
        });
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
            // Add global stage option that's required
            .option('stage', {
            alias: 's',
            describe: 'Deployment stage',
            type: 'string',
            choices: ['dev', 'test', 'ci', 'prod'],
            demandOption: true,
            global: true,
        })
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
             * Docker - Build and push images
             */
            .command(this.dockerService)
            /**
             * Packer - Machine image builder
             */
            .command(this.packerService)
            /**
             * Terraform
             */
            .command(this.terraformService)
            .demandCommand(1)
            // Must add this to throw error for unknown arguments
            .strict()
            .showHelpOnFail(true)
            .exitProcess(true) // Ensure yargs exits the process
            .parse();
    }
};
CommandService = (0,external_tslib_namespaceObject.__decorate)([
    (0,common_namespaceObject.Injectable)(),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (command_service_a = typeof DockerService !== "undefined" && DockerService) === "function" ? command_service_a : Object, typeof (command_service_b = typeof PackerService !== "undefined" && PackerService) === "function" ? command_service_b : Object, typeof (_c = typeof TerraformService !== "undefined" && TerraformService) === "function" ? _c : Object, typeof (_d = typeof TaskService !== "undefined" && TaskService) === "function" ? _d : Object])
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
            DockerService,
            PackerService,
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
    const cliEnvFilePath = (file) => external_path_default().resolve(process.cwd(), 'apps/cli', file);
    if (stage === Stage.Dev || stage === 'dev') {
        return envFilePath('.env');
    }
    if (stage === Stage.Test || stage === 'test') {
        return envFilePath('.env.test');
    }
    if (stage === Stage.CI || stage === 'ci') {
        return '';
    }
    // For prod stage, use CLI's .env file for packer/terraform commands
    if (stage === 'prod') {
        return cliEnvFilePath('.env');
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
        // logger: process.env.DEBUG ? ['error', 'warn'] : false,
        logger: ['error'],
    });
    await app.init();
};
void bootstrap();

var __webpack_export_target__ = exports;
for(var __webpack_i__ in __webpack_exports__) __webpack_export_target__[__webpack_i__] = __webpack_exports__[__webpack_i__];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;