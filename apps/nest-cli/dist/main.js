/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(3), exports);
tslib_1.__exportStar(__webpack_require__(4), exports);
tslib_1.__exportStar(__webpack_require__(6), exports);


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MultiSpanProcessor = void 0;
class MultiSpanProcessor {
    constructor(spanProcessors) {
        Object.defineProperty(this, "spanProcessors", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.spanProcessors = spanProcessors;
    }
    onStart(span, parentContext) {
        for (const spanProcessor of this.spanProcessors) {
            spanProcessor.onStart(span, parentContext);
        }
    }
    onEnd(span) {
        for (const spanProcessor of this.spanProcessors) {
            spanProcessor.onEnd(span);
        }
    }
    shutdown() {
        return Promise.all(this.spanProcessors.map((spanProcessor) => spanProcessor.shutdown())).then();
    }
    forceFlush() {
        return Promise.all(this.spanProcessors.map((spanProcessor) => spanProcessor.forceFlush())).then();
    }
}
exports.MultiSpanProcessor = MultiSpanProcessor;


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OpenTelemetryModuleConfig = void 0;
const nestjs_otel_1 = __webpack_require__(5);
exports.OpenTelemetryModuleConfig = nestjs_otel_1.OpenTelemetryModule.forRoot({
// metrics: {
//   // Includes Host Metrics
//   apiMetrics: {
//     // Includes api metrics
//     defaultAttributes: {
//       // You can set default labels for api metrics
//       custom: 'label',
//     },
//     enable: true,
//     // You can ignore specific routes (See https://docs.nestjs.com/middleware#excluding-routes for options)
//     ignoreRoutes: ['/favicon.ico'],
//     // Records metrics for all URLs, even undefined ones
//     ignoreUndefinedRoutes: false,
//   },
//   hostMetrics: true,
// },
});


/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("nestjs-otel");

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.otelSDK = void 0;
const exporter_trace_otlp_http_1 = __webpack_require__(7);
const resources_1 = __webpack_require__(8);
const sdk_node_1 = __webpack_require__(9);
const sdk_trace_base_1 = __webpack_require__(10);
const semantic_conventions_1 = __webpack_require__(11);
const multi_span_processor_1 = __webpack_require__(3);
exports.otelSDK = new sdk_node_1.NodeSDK({
    // instrumentations: [new NestInstrumentation()],
    resource: new resources_1.Resource({
        [semantic_conventions_1.SemanticResourceAttributes.SERVICE_NAME]: 'platform-api',
    }),
    spanProcessor: new multi_span_processor_1.MultiSpanProcessor([
        new sdk_trace_base_1.SimpleSpanProcessor(new sdk_trace_base_1.ConsoleSpanExporter()),
        new sdk_trace_base_1.SimpleSpanProcessor(new exporter_trace_otlp_http_1.OTLPTraceExporter()),
    ]),
    /**
     * Not needed, trace exporter is passed as param to span processor
     */
    // traceExporter: new ConsoleSpanExporter(),
});
process.on('SIGTERM', () => {
    exports.otelSDK
        .shutdown()
        .then(() => console.log('SDK shut down successfully'), (err) => console.log('Error shutting down SDK', err))
        .finally(() => process.exit(0));
});


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@opentelemetry/exporter-trace-otlp-http");

/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("@opentelemetry/resources");

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("@opentelemetry/sdk-node");

/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("@opentelemetry/sdk-trace-base");

/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("@opentelemetry/semantic-conventions");

/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(1);
const logger_1 = __webpack_require__(14);
const otel_1 = __webpack_require__(2);
const bull_1 = __webpack_require__(19);
const common_1 = __webpack_require__(16);
const command_module_1 = __webpack_require__(20);
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [],
        imports: [
            command_module_1.CommandModule,
            logger_1.CodelabLoggerModule,
            otel_1.OpenTelemetryModuleConfig,
            bull_1.BullModule.forRoot({
                redis: {
                    host: 'localhost',
                    port: 6379,
                },
            }),
            // Need to import in module that uses the queue
            // BullModule.registerQueue({
            //   name: 'import-admin-data',
            // }),
        ],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(15), exports);
tslib_1.__exportStar(__webpack_require__(18), exports);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CodelabLoggerModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(16);
const nestjs_pino_1 = __webpack_require__(17);
const logger_service_1 = __webpack_require__(18);
let CodelabLoggerModule = class CodelabLoggerModule {
};
CodelabLoggerModule = tslib_1.__decorate([
    (0, common_1.Module)({
        exports: [logger_service_1.CodelabLogger],
        imports: [nestjs_pino_1.LoggerModule.forRoot()],
        providers: [logger_service_1.CodelabLogger],
    })
], CodelabLoggerModule);
exports.CodelabLoggerModule = CodelabLoggerModule;


/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 17 */
/***/ ((module) => {

module.exports = require("nestjs-pino");

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CodelabLogger = void 0;
const common_1 = __webpack_require__(16);
// export const loggerOptions: LoggerOptions = {
//   formatters: {
//     level: (label) => {
//       return { level: label }
//     },
//     // Workaround for PinoInstrumentation (does not support latest version yet)
//     log: (object) => {
//       const span = trace.getSpan(context.active())
//       if (!span) {
//         return { ...object }
//       }
//       const spanContext = trace.getSpan(context.active())?.spanContext()
//       if (!spanContext) {
//         return { ...object }
//       }
//       const { spanId, traceId } = spanContext
//       return { ...object, spanId, traceId }
//     },
//   },
//   level: 'info',
//   // prettifier: process.env.NODE_ENV === 'local' ? require('pino-pretty') : false,
// }
class CodelabLogger extends common_1.ConsoleLogger {
}
exports.CodelabLogger = CodelabLogger;
// export class CodelabLogger extends Logger implements LoggerService {}


/***/ }),
/* 19 */
/***/ ((module) => {

module.exports = require("@nestjs/bull");

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommandModule = void 0;
const tslib_1 = __webpack_require__(1);
const admin_1 = __webpack_require__(21);
const cli_1 = __webpack_require__(655);
const bull_1 = __webpack_require__(19);
const common_1 = __webpack_require__(16);
const command_service_1 = __webpack_require__(720);
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
CommandModule = tslib_1.__decorate([
    (0, common_1.Module)({
        exports: [command_service_1.CommandService],
        imports: [
            bull_1.BullModule.registerQueue({
                name: 'import-admin-data',
            }),
        ],
        providers: [
            command_service_1.CommandService,
            cli_1.ImportService,
            admin_1.ImportAdminDataService,
            cli_1.TerraformService,
        ],
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof command_service_1.CommandService !== "undefined" && command_service_1.CommandService) === "function" ? _a : Object])
], CommandModule);
exports.CommandModule = CommandModule;


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(22), exports);
tslib_1.__exportStar(__webpack_require__(581), exports);


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(23), exports);


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminSeederService = void 0;
const tslib_1 = __webpack_require__(1);
const service_1 = __webpack_require__(24);
const type_1 = __webpack_require__(83);
const seed_1 = __webpack_require__(567);
const seed_2 = __webpack_require__(575);
const use_case_1 = __webpack_require__(581);
class AdminSeederService extends service_1.AuthService {
    seedAntDesign() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const fields = (atoms) => tslib_1.__awaiter(this, void 0, void 0, function* () { return new type_1.ExtractAntDesignFieldsService(this.owner).execute(atoms); });
            yield new use_case_1.SeedFrameworkService(this.owner).execute({
                atoms: seed_2.antdAtomData,
                fields,
                tags: seed_1.antdTagTree,
            });
        });
    }
    seedHtml() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const fields = (atoms) => tslib_1.__awaiter(this, void 0, void 0, function* () { return new type_1.ExtractHtmlFieldsService(this.owner).execute(atoms); });
            yield new use_case_1.SeedFrameworkService(this.owner).execute({
                atoms: seed_2.htmlAtomData,
                fields,
                tags: seed_1.htmlTagTree,
            });
        });
    }
}
exports.AdminSeederService = AdminSeederService;


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(25), exports);


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(26), exports);
tslib_1.__exportStar(__webpack_require__(27), exports);


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = exports.AuthUseCase = void 0;
const use_case_1 = __webpack_require__(27);
/**
 * For authenticated user
 */
class AuthUseCase extends use_case_1.UseCase {
    constructor(owner) {
        super();
        Object.defineProperty(this, "owner", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: owner
        });
    }
}
exports.AuthUseCase = AuthUseCase;
class AuthService {
    constructor(owner) {
        Object.defineProperty(this, "owner", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: owner
        });
    }
}
exports.AuthService = AuthService;


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UseCase = void 0;
const otel_1 = __webpack_require__(28);
class UseCase {
    constructor() {
        // tracer = trace.getTracer(CLI_TRACER)
        Object.defineProperty(this, "execute", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (0, otel_1.withTracing)(`${this.constructor.name}.execute()`, (request) => {
                const result = this._execute(request);
                return result instanceof Promise ? result : Promise.resolve(result);
            })
        });
    }
}
exports.UseCase = UseCase;


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(29), exports);
tslib_1.__exportStar(__webpack_require__(32), exports);
tslib_1.__exportStar(__webpack_require__(34), exports);


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerCustomOTel = void 0;
const exporter_trace_otlp_http_1 = __webpack_require__(7);
const instrumentation_nestjs_core_1 = __webpack_require__(30);
const resources_1 = __webpack_require__(8);
const sdk_node_1 = __webpack_require__(9);
const sdk_trace_node_1 = __webpack_require__(31);
const semantic_conventions_1 = __webpack_require__(11);
/**
 * Custom setup code for CLI, since the vercel wrapper from `@vercel/otel` uses ESM, and we have to use CommonJS require.
 */
const registerCustomOTel = (serviceName) => {
    console.log('Initializing OpenTelemetry...');
    // const collectorOptions = {
    //   // an optional limit on pending requests
    //   concurrencyLimit: 10,
    //   // an optional object containing custom headers to be sent with each request
    //   headers: {},
    //   // url is optional and can be omitted - default is http://localhost:4318/v1/traces
    //   url: '<opentelemetry-collector-url>',
    // }
    const sdk = new sdk_node_1.NodeSDK({
        instrumentations: [new instrumentation_nestjs_core_1.NestInstrumentation()],
        resource: new resources_1.Resource({
            [semantic_conventions_1.SemanticResourceAttributes.SERVICE_NAME]: serviceName,
        }),
        /**
         * The OTLPTraceExporter without any configuration parameters will default to sending data to localhost on port 4317 using the http/protobuf protocol.
         *
         * {
         *  endpoint: 'http://localhost:4317',
         *  protocol: 'http/protobuf',
         *  }
         */
        spanProcessor: new sdk_trace_node_1.SimpleSpanProcessor(new exporter_trace_otlp_http_1.OTLPTraceExporter()),
        // traceExporter: new ConsoleSpanExporter(),
    });
    sdk.start();
    return sdk;
};
exports.registerCustomOTel = registerCustomOTel;


/***/ }),
/* 30 */
/***/ ((module) => {

module.exports = require("@opentelemetry/instrumentation-nestjs-core");

/***/ }),
/* 31 */
/***/ ((module) => {

module.exports = require("@opentelemetry/sdk-trace-node");

/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.startTracingSpan = void 0;
const api_1 = __webpack_require__(33);
const startTracingSpan = (tracerName, spanName) => {
    const tracer = api_1.trace.getTracer(tracerName);
    const span = tracer.startSpan(spanName);
    const spanContext = api_1.trace.setSpan(api_1.context.active(), span);
    return span;
};
exports.startTracingSpan = startTracingSpan;


/***/ }),
/* 33 */
/***/ ((module) => {

module.exports = require("@opentelemetry/api");

/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.withTracing = exports.CLI_TRACER = void 0;
const tslib_1 = __webpack_require__(1);
const utils_1 = __webpack_require__(35);
const api_1 = __webpack_require__(33);
const context_utils_1 = __webpack_require__(82);
//
exports.CLI_TRACER = 'cli-tracer';
/**
 * The startActiveSpan function is a utility function that simplifies the process of starting a span, setting it as active in the context, executing a function (synchronously or asynchronously) within the context of that span, and then ending the span.
 */
// This function executes the callback and returns the result. If the result is a promise, it ensures the span is ended after the promise resolves.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const executeCallback = (callback, args, span) => {
    try {
        const result = api_1.context.with((0, context_utils_1.setSpan)(api_1.context.active(), span), () => callback(...args));
        if (result instanceof Promise) {
            return result.finally(() => {
                return span.end();
            });
        }
        else {
            span.end();
            return result;
        }
    }
    catch (error) {
        recordExceptionAndStatus(span, error);
        throw error;
    }
};
// This function records an exception in the given span and sets the status to ERROR.
const recordExceptionAndStatus = (span, error) => {
    span.recordException((0, utils_1.toError)(error));
    span.setStatus({ code: api_1.SpanStatusCode.ERROR });
};
// This is your withTracing function, now using the helper functions above.
const withTracing = (operationName, callback, spanCallback) => {
    return (...args) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const tracer = api_1.trace.getTracer(exports.CLI_TRACER);
        return tracer.startActiveSpan(operationName, (span) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            try {
                if (spanCallback) {
                    spanCallback(span);
                }
                const result = yield executeCallback(callback, args, span);
                return result;
            }
            finally {
                span.end();
            }
        }));
    });
};
exports.withTracing = withTracing;


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(36), exports);
tslib_1.__exportStar(__webpack_require__(37), exports);
tslib_1.__exportStar(__webpack_require__(39), exports);
tslib_1.__exportStar(__webpack_require__(45), exports);
tslib_1.__exportStar(__webpack_require__(47), exports);
tslib_1.__exportStar(__webpack_require__(49), exports);
tslib_1.__exportStar(__webpack_require__(56), exports);
tslib_1.__exportStar(__webpack_require__(60), exports);
tslib_1.__exportStar(__webpack_require__(66), exports);
tslib_1.__exportStar(__webpack_require__(73), exports);
tslib_1.__exportStar(__webpack_require__(78), exports);
tslib_1.__exportStar(__webpack_require__(81), exports);


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports) => {


// export const assert = (
//   condition: boolean,
//   errorMessage = 'An assert error was thrown',
// ) => {
//   if (!condition) {
//     throw new Error(errorMessage)
//   }
// }
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.assertIsDefined = void 0;
const assertIsDefined = (val) => {
    if (val === undefined || val === null) {
        throw new Error(`Expected 'val' to be defined, but received ${val}`);
    }
};
exports.assertIsDefined = assertIsDefined;


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(38), exports);


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TTLCache = void 0;
class TTLCache {
    constructor(ttl) {
        Object.defineProperty(this, "ttl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ttl
        });
        Object.defineProperty(this, "cache", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
    }
    set(key, value) {
        this.cache.set(key, {
            expiresAt: Date.now() + this.ttl,
            value,
        });
    }
    get(key) {
        const entry = this.cache.get(key);
        if (entry && Date.now() < entry.expiresAt) {
            return entry.value;
        }
        this.cache.delete(key);
        return undefined;
    }
    clear() {
        this.cache.clear();
    }
    size() {
        return this.cache.size;
    }
}
exports.TTLCache = TTLCache;


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(40), exports);
tslib_1.__exportStar(__webpack_require__(42), exports);
tslib_1.__exportStar(__webpack_require__(41), exports);
tslib_1.__exportStar(__webpack_require__(44), exports);


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.entityIdSet = void 0;
const extract_id_1 = __webpack_require__(41);
const entityIdSet = (entities) => new Set(entities.map(extract_id_1.extractId));
exports.entityIdSet = entityIdSet;


/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.extractId = void 0;
const extractId = (entity) => entity.id;
exports.extractId = extractId;


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.entityRecordById = exports.entityMapById = exports.entityToIdAndEntity = void 0;
const tslib_1 = __webpack_require__(1);
const keyBy_1 = tslib_1.__importDefault(__webpack_require__(43));
const entityToIdAndEntity = (entity) => [entity.id, entity];
exports.entityToIdAndEntity = entityToIdAndEntity;
const entityMapById = (entities) => new Map((entities === null || entities === void 0 ? void 0 : entities.length) ? entities.map(exports.entityToIdAndEntity) : []);
exports.entityMapById = entityMapById;
const entityRecordById = (entities) => ((entities === null || entities === void 0 ? void 0 : entities.length) ? (0, keyBy_1.default)(entities, 'id') : {});
exports.entityRecordById = entityRecordById;


/***/ }),
/* 43 */
/***/ ((module) => {

module.exports = require("lodash/keyBy");

/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkIfValidUUID = void 0;
/* Check if string is valid UUID */
const checkIfValidUUID = (str) => {
    if (!str) {
        return false;
    }
    // Regular expression to check if string is a valid UUID
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    return regexExp.test(str.toString());
};
exports.checkIfValidUUID = checkIfValidUUID;


/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(46), exports);


/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isServer = void 0;
exports.isServer = typeof window === 'undefined';


/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(48), exports);


/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toError = void 0;
const toError = (error) => {
    if (typeof error === 'string') {
        return error;
    }
    if (error instanceof Error) {
        return { message: error.message, name: error.name, stack: error.stack };
    }
    return String(error);
};
exports.toError = toError;


/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(50), exports);
tslib_1.__exportStar(__webpack_require__(55), exports);


/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.filterEmptyStrings = void 0;
const tslib_1 = __webpack_require__(1);
const isArray_1 = tslib_1.__importDefault(__webpack_require__(51));
const isObject_1 = tslib_1.__importDefault(__webpack_require__(52));
const isObjectLike_1 = tslib_1.__importDefault(__webpack_require__(53));
const pickBy_1 = tslib_1.__importDefault(__webpack_require__(54));
const filterEmptyStrings = (data) => (0, isObject_1.default)(data)
    ? (0, pickBy_1.default)(data, (value, key) => {
        if ((0, isArray_1.default)(value)) {
            return value.map(exports.filterEmptyStrings);
        }
        if ((0, isObjectLike_1.default)(value)) {
            return (0, exports.filterEmptyStrings)(value);
        }
        return value !== '';
    })
    : data;
exports.filterEmptyStrings = filterEmptyStrings;


/***/ }),
/* 51 */
/***/ ((module) => {

module.exports = require("lodash/isArray");

/***/ }),
/* 52 */
/***/ ((module) => {

module.exports = require("lodash/isObject");

/***/ }),
/* 53 */
/***/ ((module) => {

module.exports = require("lodash/isObjectLike");

/***/ }),
/* 54 */
/***/ ((module) => {

module.exports = require("lodash/pickBy");

/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isNonNullable = void 0;
const isNonNullable = (value) => Boolean(value);
exports.isNonNullable = isNonNullable;


/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(57), exports);
tslib_1.__exportStar(__webpack_require__(59), exports);


/***/ }),
/* 57 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cLog = void 0;
const tslib_1 = __webpack_require__(1);
const util = tslib_1.__importStar(__webpack_require__(58));
const cLog = (...objects) => {
    objects.forEach((obj) => console.log(util.inspect(obj, { colors: true, depth: null, showHidden: false })));
};
exports.cLog = cLog;


/***/ }),
/* 58 */
/***/ ((module) => {

module.exports = require("util");

/***/ }),
/* 59 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.logSection = exports.logTask = void 0;
const tslib_1 = __webpack_require__(1);
const util_1 = tslib_1.__importDefault(__webpack_require__(58));
const logTask = (task, label = '', data) => {
    if (data) {
        return console.debug(`[${task}]:`, label, util_1.default.inspect(data, false, null, true));
    }
    return console.debug(`[${task}]:`, label);
};
exports.logTask = logTask;
const logSection = (task) => {
    console.log('---------------------');
    console.log(`${task}...`);
    console.log('---------------------');
};
exports.logSection = logSection;


/***/ }),
/* 60 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(61), exports);
tslib_1.__exportStar(__webpack_require__(62), exports);


/***/ }),
/* 61 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 62 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mapDeep = void 0;
const tslib_1 = __webpack_require__(1);
const isArray_1 = tslib_1.__importDefault(__webpack_require__(51));
const isObjectLike_1 = tslib_1.__importDefault(__webpack_require__(53));
const map_1 = tslib_1.__importDefault(__webpack_require__(63));
const toPairsIn_1 = tslib_1.__importDefault(__webpack_require__(64));
const mobx_keystone_1 = __webpack_require__(65);
const is_server_1 = __webpack_require__(46);
const isReactNode = (obj) => Boolean(obj === null || obj === void 0 ? void 0 : obj['$$typeof']);
const isMobxModel = (obj) => Boolean(obj === null || obj === void 0 ? void 0 : obj[mobx_keystone_1.modelTypeKey]);
const isHtmlNode = (obj) => is_server_1.isServer ? false : obj instanceof HTMLElement;
const isCyclic = (obj) => ((0, isObjectLike_1.default)(obj) && isReactNode(obj)) || isMobxModel(obj) || isHtmlNode(obj);
const mapDeep = (obj, valueMapper, keyMapper = (value, key) => key, key = '') => {
    obj = valueMapper(obj, key);
    return isCyclic(obj)
        ? obj
        : (0, isArray_1.default)(obj)
            ? (0, map_1.default)(obj, (innerObj, index) => (0, exports.mapDeep)(innerObj, valueMapper, keyMapper, index))
            : (0, isObjectLike_1.default)(obj)
                ? (0, toPairsIn_1.default)(obj)
                    .map(([_key, _value]) => {
                    const mappedKey = keyMapper(_value, _key);
                    const mappedValue = (0, isObjectLike_1.default)(_value)
                        ? (0, exports.mapDeep)(_value, valueMapper, keyMapper, mappedKey)
                        : valueMapper(_value, _key);
                    return {
                        [mappedKey]: mappedValue,
                    };
                })
                    .reduce((acc, cur) => (Object.assign(Object.assign({}, acc), cur)), {})
                : valueMapper(obj, '');
};
exports.mapDeep = mapDeep;


/***/ }),
/* 63 */
/***/ ((module) => {

module.exports = require("lodash/map");

/***/ }),
/* 64 */
/***/ ((module) => {

module.exports = require("lodash/toPairsIn");

/***/ }),
/* 65 */
/***/ ((module) => {

module.exports = require("mobx-keystone");

/***/ }),
/* 66 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(67), exports);
tslib_1.__exportStar(__webpack_require__(69), exports);


/***/ }),
/* 67 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mergeProps = void 0;
const tslib_1 = __webpack_require__(1);
const mergeWith_1 = tslib_1.__importDefault(__webpack_require__(68));
const propsCustomizer = (value, srcValue, key) => {
    if (key === 'className') {
        return `${value || ''} ${srcValue || ''}`;
    }
    return undefined;
};
/**
 *  Deep merges a list of props together, the latter props have priority over the prior ones in case of conflict
 * The following edge cases are handled:
 *
 * - Merging className strings together
 */
const mergeProps = (...propsArray) => {
    return propsArray.reduce((mergedProps, nextProps) => {
        return (0, mergeWith_1.default)(mergedProps, nextProps, propsCustomizer);
    }, {});
};
exports.mergeProps = mergeProps;


/***/ }),
/* 68 */
/***/ ((module) => {

module.exports = require("lodash/mergeWith");

/***/ }),
/* 69 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.propSafeStringify = void 0;
const tslib_1 = __webpack_require__(1);
const isArray_1 = tslib_1.__importDefault(__webpack_require__(51));
const isFunction_1 = tslib_1.__importDefault(__webpack_require__(70));
const isObjectLike_1 = tslib_1.__importDefault(__webpack_require__(53));
const isPlainObject_1 = tslib_1.__importDefault(__webpack_require__(71));
const pickBy_1 = tslib_1.__importDefault(__webpack_require__(54));
const react_1 = tslib_1.__importDefault(__webpack_require__(72));
const propSafeStringify = (props, maskFunctions = true) => {
    const obj = (0, pickBy_1.default)(props, (value, key) => !key.startsWith('_'));
    const cache = new WeakMap();
    const replacer = (key, value) => {
        if (key === 'children' && (0, isObjectLike_1.default)(value)) {
            return;
        }
        // handle ReactNodeType
        if (react_1.default.isValidElement(value)) {
            return 'React element';
        }
        if ((0, isObjectLike_1.default)(value)) {
            if (!(0, isArray_1.default)(value) && !(0, isPlainObject_1.default)(value)) {
                return `${value.constructor.name} instance`;
            }
            // Duplicate reference found, discard key
            if (cache.get(value)) {
                return;
            }
            // Store value in our collection
            cache.set(value, true);
        }
        if (maskFunctions && (0, isFunction_1.default)(value)) {
            return 'function';
        }
        return value;
    };
    const result = JSON.stringify(obj, replacer, 4);
    return result;
};
exports.propSafeStringify = propSafeStringify;


/***/ }),
/* 70 */
/***/ ((module) => {

module.exports = require("lodash/isFunction");

/***/ }),
/* 71 */
/***/ ((module) => {

module.exports = require("lodash/isPlainObject");

/***/ }),
/* 72 */
/***/ ((module) => {

module.exports = require("react");

/***/ }),
/* 73 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(74), exports);
tslib_1.__exportStar(__webpack_require__(75), exports);
tslib_1.__exportStar(__webpack_require__(76), exports);
tslib_1.__exportStar(__webpack_require__(77), exports);


/***/ }),
/* 74 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cdnEsmRegex = void 0;
// accepts a cdn url for es modules from popular cdn providers
exports.cdnEsmRegex = /https?:\/\/(?:cdn\.)?(?:[\w-]+\.)+[\w-]+\/(?:[\w@%.-]+\/)*?[^/@]+@[^/]+\/\+\w+/;


/***/ }),
/* 75 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hexadecimalRegex = void 0;
exports.hexadecimalRegex = /^0[xX][0-9a-fA-F]+$/;


/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.singlySpacedTitleCaseWithNumbersRegex = void 0;
exports.singlySpacedTitleCaseWithNumbersRegex = /^[A-Z][a-z0-9]*(?: ([A-Z][a-z0-9]*|[0-9]+))*$/g;


/***/ }),
/* 77 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.uuidRegex = void 0;
exports.uuidRegex = /[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}/g;


/***/ }),
/* 78 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(79), exports);
tslib_1.__exportStar(__webpack_require__(80), exports);


/***/ }),
/* 79 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.extractName = exports.createUniqueName = void 0;
const regex_1 = __webpack_require__(73);
/**
 * Names should only be unique under the parent; however, neo4j @unique
 * constraint makes them unique globally. hence we need to append the
 * parent id to allow same name under different parents.
 */
const createUniqueName = (name, prefix) => `${prefix}-${name}`;
exports.createUniqueName = createUniqueName;
/**
 * To reverse what createUniqueName did.
 */
const extractName = (uniqueName) => uniqueName.replace(regex_1.uuidRegex, '').substring(1);
exports.extractName = extractName;


/***/ }),
/* 80 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.capitalizeFirstLetter = exports.stripQuotes = exports.compoundCaseToTitleCase = void 0;
/**
 * Implementation of camelCaseToTitleCase & PascalCaseToTitleCase are the same, so we give them a common name
 * @param input
 */
const compoundCaseToTitleCase = (input) => input
    // insert a space before all caps
    .replace(/\B([A-Z])\B/g, (str) => ` ${str}`)
    // uppercase the first character
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
exports.compoundCaseToTitleCase = compoundCaseToTitleCase;
// export const toPascalCase = (value: string) =>
//   v.chain(value).camelCase().capitalize().value()
// export const toCamelCase = (value: string) => v.chain(value).camelCase().value()
// export const toTitleCase = (value: string) => v.titleCase(value)
// export const toKebabCase = (value: string) => v.chain(value).kebabCase().value()
const stripQuotes = (value) => value.replace(/['"]/g, '');
exports.stripQuotes = stripQuotes;
const capitalizeFirstLetter = (value) => value.charAt(0).toUpperCase() + value.slice(1);
exports.capitalizeFirstLetter = capitalizeFirstLetter;
// export const startsWithCapital = (word: string) =>
//   word.charAt(0) === word.charAt(0).toUpperCase()


/***/ }),
/* 81 */
/***/ ((__unused_webpack_module, exports) => {


/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 82 */
/***/ ((module) => {

module.exports = require("@opentelemetry/api/build/src/trace/context-utils");

/***/ }),
/* 83 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(84), exports);
tslib_1.__exportStar(__webpack_require__(131), exports);
tslib_1.__exportStar(__webpack_require__(133), exports);
tslib_1.__exportStar(__webpack_require__(138), exports);
tslib_1.__exportStar(__webpack_require__(306), exports);


/***/ }),
/* 84 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(85), exports);


/***/ }),
/* 85 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.systemTypesData = void 0;
const core_1 = __webpack_require__(86);
const uuid_1 = __webpack_require__(130);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// type WithRequiredKey<T, K extends keyof T> = T extends object
//   ? Overwrite<T, Required<Pick<T, K>>>
//   : never
// type SystemTypes = Record<
//   | Exclude<
//       ITypeKind,
//       | ITypeKind.AppType
//       | ITypeKind.ArrayType
//       | ITypeKind.CodeMirrorType
//       | ITypeKind.ElementType
//       | ITypeKind.EnumType
//       | ITypeKind.InterfaceType
//       | ITypeKind.LambdaType
//       | ITypeKind.PageType
//       | ITypeKind.PrimitiveType
//       | ITypeKind.UnionType
//     >
//   | IPrimitiveTypeKind,
//   WithRequiredKey<ITypeDTO, '__typename'>
// >
/**
 * Difficult to type this function, we just let it infer
 */
const systemTypesData = (owner) => ({
    /**
     * PrimitiveTypes
     */
    [core_1.IPrimitiveTypeKind.String]: {
        __typename: `${core_1.ITypeKind.PrimitiveType}`,
        id: (0, uuid_1.v4)(),
        kind: core_1.ITypeKind.PrimitiveType,
        name: core_1.IPrimitiveTypeKind.String,
        owner,
        primitiveKind: core_1.IPrimitiveTypeKind.String,
    },
    [core_1.IPrimitiveTypeKind.Boolean]: {
        __typename: `${core_1.ITypeKind.PrimitiveType}`,
        id: (0, uuid_1.v4)(),
        kind: core_1.ITypeKind.PrimitiveType,
        name: core_1.IPrimitiveTypeKind.Boolean,
        owner,
        primitiveKind: core_1.IPrimitiveTypeKind.Boolean,
    },
    [core_1.IPrimitiveTypeKind.Number]: {
        __typename: `${core_1.ITypeKind.PrimitiveType}`,
        id: (0, uuid_1.v4)(),
        kind: core_1.ITypeKind.PrimitiveType,
        name: core_1.IPrimitiveTypeKind.Number,
        owner,
        primitiveKind: core_1.IPrimitiveTypeKind.Number,
    },
    [core_1.IPrimitiveTypeKind.Integer]: {
        __typename: `${core_1.ITypeKind.PrimitiveType}`,
        id: (0, uuid_1.v4)(),
        kind: core_1.ITypeKind.PrimitiveType,
        name: core_1.IPrimitiveTypeKind.Integer,
        owner,
        primitiveKind: core_1.IPrimitiveTypeKind.Integer,
    },
    /**
     * Other types
     */
    [core_1.ITypeKind.ReactNodeType]: {
        __typename: `${core_1.ITypeKind.ReactNodeType}`,
        id: (0, uuid_1.v4)(),
        kind: core_1.ITypeKind.ReactNodeType,
        name: core_1.ITypeKind.ReactNodeType,
        owner,
    },
    [core_1.ITypeKind.RenderPropType]: {
        __typename: `${core_1.ITypeKind.RenderPropType}`,
        id: (0, uuid_1.v4)(),
        kind: core_1.ITypeKind.RenderPropType,
        name: core_1.ITypeKind.RenderPropType,
        owner,
    },
    [core_1.ITypeKind.ActionType]: {
        __typename: `${core_1.ITypeKind.ActionType}`,
        id: (0, uuid_1.v4)(),
        kind: core_1.ITypeKind.ActionType,
        name: core_1.ITypeKind.ActionType,
        owner,
    },
});
exports.systemTypesData = systemTypesData;


/***/ }),
/* 86 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(87), exports);
tslib_1.__exportStar(__webpack_require__(90), exports);
tslib_1.__exportStar(__webpack_require__(91), exports);
tslib_1.__exportStar(__webpack_require__(92), exports);
tslib_1.__exportStar(__webpack_require__(93), exports);
tslib_1.__exportStar(__webpack_require__(94), exports);
tslib_1.__exportStar(__webpack_require__(95), exports);
tslib_1.__exportStar(__webpack_require__(96), exports);
tslib_1.__exportStar(__webpack_require__(97), exports);
tslib_1.__exportStar(__webpack_require__(98), exports);
tslib_1.__exportStar(__webpack_require__(99), exports);
tslib_1.__exportStar(__webpack_require__(100), exports);
tslib_1.__exportStar(__webpack_require__(101), exports);
tslib_1.__exportStar(__webpack_require__(102), exports);
tslib_1.__exportStar(__webpack_require__(103), exports);
tslib_1.__exportStar(__webpack_require__(104), exports);
tslib_1.__exportStar(__webpack_require__(105), exports);
tslib_1.__exportStar(__webpack_require__(106), exports);
tslib_1.__exportStar(__webpack_require__(107), exports);
tslib_1.__exportStar(__webpack_require__(109), exports);
tslib_1.__exportStar(__webpack_require__(111), exports);
tslib_1.__exportStar(__webpack_require__(112), exports);
tslib_1.__exportStar(__webpack_require__(113), exports);
tslib_1.__exportStar(__webpack_require__(128), exports);
tslib_1.__exportStar(__webpack_require__(129), exports);


/***/ }),
/* 87 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.assertIsActionKind = exports.IActionKind = void 0;
const codegen_1 = __webpack_require__(88);
Object.defineProperty(exports, "IActionKind", ({ enumerable: true, get: function () { return codegen_1.ActionKind; } }));
const assertIsActionKind = (actual, expected) => {
    if (actual !== expected) {
        throw new Error('ActionKind does not match');
    }
};
exports.assertIsActionKind = assertIsActionKind;


/***/ }),
/* 88 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(89), exports);


/***/ }),
/* 89 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypeKind = exports.SortDirection = exports.Role = exports.ResourceType = exports.RenderTypeKind = exports.PrimitiveTypeKind = exports.PageKind = exports.ElementTypeKind = exports.CodeMirrorLanguage = exports.AtomType = exports.ActionKind = void 0;
var ActionKind;
(function (ActionKind) {
    /** Action responsible for fetching data from a resource */
    ActionKind["ApiAction"] = "ApiAction";
    /** Action with custom code */
    ActionKind["CodeAction"] = "CodeAction";
})(ActionKind = exports.ActionKind || (exports.ActionKind = {}));
var AtomType;
(function (AtomType) {
    AtomType["AntDesignAffix"] = "AntDesignAffix";
    AtomType["AntDesignAlert"] = "AntDesignAlert";
    AtomType["AntDesignAnchor"] = "AntDesignAnchor";
    AtomType["AntDesignAnchorLink"] = "AntDesignAnchorLink";
    AtomType["AntDesignAutoComplete"] = "AntDesignAutoComplete";
    AtomType["AntDesignAvatar"] = "AntDesignAvatar";
    AtomType["AntDesignBackTop"] = "AntDesignBackTop";
    AtomType["AntDesignBadge"] = "AntDesignBadge";
    AtomType["AntDesignBreadcrumb"] = "AntDesignBreadcrumb";
    AtomType["AntDesignBreadcrumbItem"] = "AntDesignBreadcrumbItem";
    AtomType["AntDesignBreadcrumbSeparator"] = "AntDesignBreadcrumbSeparator";
    AtomType["AntDesignButton"] = "AntDesignButton";
    AtomType["AntDesignCalendar"] = "AntDesignCalendar";
    AtomType["AntDesignCard"] = "AntDesignCard";
    AtomType["AntDesignCardGrid"] = "AntDesignCardGrid";
    AtomType["AntDesignCardMeta"] = "AntDesignCardMeta";
    AtomType["AntDesignCarousel"] = "AntDesignCarousel";
    AtomType["AntDesignCascader"] = "AntDesignCascader";
    AtomType["AntDesignCheckbox"] = "AntDesignCheckbox";
    AtomType["AntDesignCheckboxGroup"] = "AntDesignCheckboxGroup";
    AtomType["AntDesignCollapse"] = "AntDesignCollapse";
    AtomType["AntDesignCollapsePanel"] = "AntDesignCollapsePanel";
    AtomType["AntDesignComment"] = "AntDesignComment";
    AtomType["AntDesignConfigProvider"] = "AntDesignConfigProvider";
    AtomType["AntDesignDatePicker"] = "AntDesignDatePicker";
    AtomType["AntDesignDescriptions"] = "AntDesignDescriptions";
    AtomType["AntDesignDescriptionsItem"] = "AntDesignDescriptionsItem";
    AtomType["AntDesignDivider"] = "AntDesignDivider";
    AtomType["AntDesignDrawer"] = "AntDesignDrawer";
    AtomType["AntDesignDropdown"] = "AntDesignDropdown";
    AtomType["AntDesignDropdownButton"] = "AntDesignDropdownButton";
    AtomType["AntDesignEmpty"] = "AntDesignEmpty";
    AtomType["AntDesignForm"] = "AntDesignForm";
    AtomType["AntDesignFormErrorList"] = "AntDesignFormErrorList";
    AtomType["AntDesignFormItem"] = "AntDesignFormItem";
    AtomType["AntDesignFormList"] = "AntDesignFormList";
    AtomType["AntDesignFormProvider"] = "AntDesignFormProvider";
    AtomType["AntDesignGridCol"] = "AntDesignGridCol";
    AtomType["AntDesignGridRow"] = "AntDesignGridRow";
    AtomType["AntDesignIcon"] = "AntDesignIcon";
    AtomType["AntDesignImage"] = "AntDesignImage";
    AtomType["AntDesignInput"] = "AntDesignInput";
    AtomType["AntDesignInputNumber"] = "AntDesignInputNumber";
    AtomType["AntDesignLayout"] = "AntDesignLayout";
    AtomType["AntDesignLayoutContent"] = "AntDesignLayoutContent";
    AtomType["AntDesignLayoutFooter"] = "AntDesignLayoutFooter";
    AtomType["AntDesignLayoutHeader"] = "AntDesignLayoutHeader";
    AtomType["AntDesignLayoutSider"] = "AntDesignLayoutSider";
    AtomType["AntDesignList"] = "AntDesignList";
    AtomType["AntDesignListItem"] = "AntDesignListItem";
    AtomType["AntDesignListItemMeta"] = "AntDesignListItemMeta";
    AtomType["AntDesignMentions"] = "AntDesignMentions";
    AtomType["AntDesignMentionsOption"] = "AntDesignMentionsOption";
    AtomType["AntDesignMenu"] = "AntDesignMenu";
    AtomType["AntDesignMessage"] = "AntDesignMessage";
    AtomType["AntDesignModal"] = "AntDesignModal";
    AtomType["AntDesignNotification"] = "AntDesignNotification";
    AtomType["AntDesignPagination"] = "AntDesignPagination";
    AtomType["AntDesignPopconfirm"] = "AntDesignPopconfirm";
    AtomType["AntDesignPopover"] = "AntDesignPopover";
    AtomType["AntDesignProgress"] = "AntDesignProgress";
    AtomType["AntDesignRadio"] = "AntDesignRadio";
    AtomType["AntDesignRadioGroup"] = "AntDesignRadioGroup";
    AtomType["AntDesignRate"] = "AntDesignRate";
    AtomType["AntDesignResult"] = "AntDesignResult";
    AtomType["AntDesignSegmented"] = "AntDesignSegmented";
    AtomType["AntDesignSelect"] = "AntDesignSelect";
    AtomType["AntDesignSelectOption"] = "AntDesignSelectOption";
    AtomType["AntDesignSkeleton"] = "AntDesignSkeleton";
    AtomType["AntDesignSlider"] = "AntDesignSlider";
    AtomType["AntDesignSpace"] = "AntDesignSpace";
    AtomType["AntDesignSpin"] = "AntDesignSpin";
    AtomType["AntDesignStatistic"] = "AntDesignStatistic";
    AtomType["AntDesignSteps"] = "AntDesignSteps";
    AtomType["AntDesignStepsStep"] = "AntDesignStepsStep";
    AtomType["AntDesignSwitch"] = "AntDesignSwitch";
    AtomType["AntDesignTable"] = "AntDesignTable";
    AtomType["AntDesignTabs"] = "AntDesignTabs";
    AtomType["AntDesignTabsTabPane"] = "AntDesignTabsTabPane";
    AtomType["AntDesignTag"] = "AntDesignTag";
    AtomType["AntDesignTimePicker"] = "AntDesignTimePicker";
    AtomType["AntDesignTimeline"] = "AntDesignTimeline";
    AtomType["AntDesignTimelineItem"] = "AntDesignTimelineItem";
    AtomType["AntDesignTooltip"] = "AntDesignTooltip";
    AtomType["AntDesignTransfer"] = "AntDesignTransfer";
    AtomType["AntDesignTree"] = "AntDesignTree";
    AtomType["AntDesignTreeSelect"] = "AntDesignTreeSelect";
    AtomType["AntDesignTypographyParagraph"] = "AntDesignTypographyParagraph";
    AtomType["AntDesignTypographyText"] = "AntDesignTypographyText";
    AtomType["AntDesignTypographyTitle"] = "AntDesignTypographyTitle";
    AtomType["AntDesignUpload"] = "AntDesignUpload";
    AtomType["ExternalComponent"] = "ExternalComponent";
    AtomType["GridLayout"] = "GridLayout";
    AtomType["HookGraphqlMutation"] = "HookGraphqlMutation";
    AtomType["HookGraphqlQuery"] = "HookGraphqlQuery";
    AtomType["HookQueryConfig"] = "HookQueryConfig";
    AtomType["HookQueryLambda"] = "HookQueryLambda";
    AtomType["HookQueryPage"] = "HookQueryPage";
    AtomType["HookQueryPages"] = "HookQueryPages";
    AtomType["HookRecoilState"] = "HookRecoilState";
    AtomType["HookRouter"] = "HookRouter";
    AtomType["HtmlA"] = "HtmlA";
    AtomType["HtmlAbbr"] = "HtmlAbbr";
    AtomType["HtmlArea"] = "HtmlArea";
    AtomType["HtmlArticle"] = "HtmlArticle";
    AtomType["HtmlAside"] = "HtmlAside";
    AtomType["HtmlAudio"] = "HtmlAudio";
    AtomType["HtmlB"] = "HtmlB";
    AtomType["HtmlBase"] = "HtmlBase";
    AtomType["HtmlBdo"] = "HtmlBdo";
    AtomType["HtmlBlockquote"] = "HtmlBlockquote";
    AtomType["HtmlBr"] = "HtmlBr";
    AtomType["HtmlButton"] = "HtmlButton";
    AtomType["HtmlCanvas"] = "HtmlCanvas";
    AtomType["HtmlCaption"] = "HtmlCaption";
    AtomType["HtmlCite"] = "HtmlCite";
    AtomType["HtmlCode"] = "HtmlCode";
    AtomType["HtmlCol"] = "HtmlCol";
    AtomType["HtmlData"] = "HtmlData";
    AtomType["HtmlDatalist"] = "HtmlDatalist";
    AtomType["HtmlDetails"] = "HtmlDetails";
    AtomType["HtmlDfn"] = "HtmlDfn";
    AtomType["HtmlDialog"] = "HtmlDialog";
    AtomType["HtmlDiv"] = "HtmlDiv";
    AtomType["HtmlDl"] = "HtmlDl";
    AtomType["HtmlEm"] = "HtmlEm";
    AtomType["HtmlEmbed"] = "HtmlEmbed";
    AtomType["HtmlFieldset"] = "HtmlFieldset";
    AtomType["HtmlFooter"] = "HtmlFooter";
    AtomType["HtmlForm"] = "HtmlForm";
    AtomType["HtmlH1"] = "HtmlH1";
    AtomType["HtmlH2"] = "HtmlH2";
    AtomType["HtmlH3"] = "HtmlH3";
    AtomType["HtmlH4"] = "HtmlH4";
    AtomType["HtmlH5"] = "HtmlH5";
    AtomType["HtmlH6"] = "HtmlH6";
    AtomType["HtmlHead"] = "HtmlHead";
    AtomType["HtmlHeader"] = "HtmlHeader";
    AtomType["HtmlHr"] = "HtmlHr";
    AtomType["HtmlI"] = "HtmlI";
    AtomType["HtmlIframe"] = "HtmlIframe";
    AtomType["HtmlImg"] = "HtmlImg";
    AtomType["HtmlInput"] = "HtmlInput";
    AtomType["HtmlKbd"] = "HtmlKbd";
    AtomType["HtmlLabel"] = "HtmlLabel";
    AtomType["HtmlLegend"] = "HtmlLegend";
    AtomType["HtmlLi"] = "HtmlLi";
    AtomType["HtmlLink"] = "HtmlLink";
    AtomType["HtmlMain"] = "HtmlMain";
    AtomType["HtmlMap"] = "HtmlMap";
    AtomType["HtmlMark"] = "HtmlMark";
    AtomType["HtmlMath"] = "HtmlMath";
    AtomType["HtmlMeta"] = "HtmlMeta";
    AtomType["HtmlMeter"] = "HtmlMeter";
    AtomType["HtmlNav"] = "HtmlNav";
    AtomType["HtmlNoscript"] = "HtmlNoscript";
    AtomType["HtmlObject"] = "HtmlObject";
    AtomType["HtmlOl"] = "HtmlOl";
    AtomType["HtmlOptgroup"] = "HtmlOptgroup";
    AtomType["HtmlOption"] = "HtmlOption";
    AtomType["HtmlOutput"] = "HtmlOutput";
    AtomType["HtmlP"] = "HtmlP";
    AtomType["HtmlParam"] = "HtmlParam";
    AtomType["HtmlPicture"] = "HtmlPicture";
    AtomType["HtmlPre"] = "HtmlPre";
    AtomType["HtmlProgress"] = "HtmlProgress";
    AtomType["HtmlQ"] = "HtmlQ";
    AtomType["HtmlRuby"] = "HtmlRuby";
    AtomType["HtmlS"] = "HtmlS";
    AtomType["HtmlSamp"] = "HtmlSamp";
    AtomType["HtmlScript"] = "HtmlScript";
    AtomType["HtmlSection"] = "HtmlSection";
    AtomType["HtmlSelect"] = "HtmlSelect";
    AtomType["HtmlSmall"] = "HtmlSmall";
    AtomType["HtmlSource"] = "HtmlSource";
    AtomType["HtmlSpan"] = "HtmlSpan";
    AtomType["HtmlStrong"] = "HtmlStrong";
    AtomType["HtmlStyle"] = "HtmlStyle";
    AtomType["HtmlSub"] = "HtmlSub";
    AtomType["HtmlSup"] = "HtmlSup";
    AtomType["HtmlSvg"] = "HtmlSvg";
    AtomType["HtmlTable"] = "HtmlTable";
    AtomType["HtmlTd"] = "HtmlTd";
    AtomType["HtmlTemplate"] = "HtmlTemplate";
    AtomType["HtmlTextarea"] = "HtmlTextarea";
    AtomType["HtmlTh"] = "HtmlTh";
    AtomType["HtmlTime"] = "HtmlTime";
    AtomType["HtmlTitle"] = "HtmlTitle";
    AtomType["HtmlTr"] = "HtmlTr";
    AtomType["HtmlTrack"] = "HtmlTrack";
    AtomType["HtmlU"] = "HtmlU";
    AtomType["HtmlUl"] = "HtmlUl";
    AtomType["HtmlVar"] = "HtmlVar";
    AtomType["HtmlVideo"] = "HtmlVideo";
    AtomType["HtmlWbr"] = "HtmlWbr";
    AtomType["MuiAccordion"] = "MuiAccordion";
    AtomType["MuiAccordionActions"] = "MuiAccordionActions";
    AtomType["MuiAccordionDetails"] = "MuiAccordionDetails";
    AtomType["MuiAccordionSummary"] = "MuiAccordionSummary";
    AtomType["MuiAlert"] = "MuiAlert";
    AtomType["MuiAlertTitle"] = "MuiAlertTitle";
    AtomType["MuiAppBar"] = "MuiAppBar";
    AtomType["MuiAutocomplete"] = "MuiAutocomplete";
    AtomType["MuiAvatar"] = "MuiAvatar";
    AtomType["MuiAvatarGroup"] = "MuiAvatarGroup";
    AtomType["MuiBackdrop"] = "MuiBackdrop";
    AtomType["MuiBadge"] = "MuiBadge";
    AtomType["MuiBadgeUnstyled"] = "MuiBadgeUnstyled";
    AtomType["MuiBottomNavigation"] = "MuiBottomNavigation";
    AtomType["MuiBottomNavigationAction"] = "MuiBottomNavigationAction";
    AtomType["MuiBox"] = "MuiBox";
    AtomType["MuiBreadcrumbs"] = "MuiBreadcrumbs";
    AtomType["MuiButton"] = "MuiButton";
    AtomType["MuiButtonBase"] = "MuiButtonBase";
    AtomType["MuiButtonGroup"] = "MuiButtonGroup";
    AtomType["MuiButtonUnstyled"] = "MuiButtonUnstyled";
    AtomType["MuiCalendarPicker"] = "MuiCalendarPicker";
    AtomType["MuiCalendarPickerSkeleton"] = "MuiCalendarPickerSkeleton";
    AtomType["MuiCard"] = "MuiCard";
    AtomType["MuiCardActionArea"] = "MuiCardActionArea";
    AtomType["MuiCardActions"] = "MuiCardActions";
    AtomType["MuiCardContent"] = "MuiCardContent";
    AtomType["MuiCardHeader"] = "MuiCardHeader";
    AtomType["MuiCardMedia"] = "MuiCardMedia";
    AtomType["MuiCheckbox"] = "MuiCheckbox";
    AtomType["MuiChip"] = "MuiChip";
    AtomType["MuiCircularProgress"] = "MuiCircularProgress";
    AtomType["MuiClickAwayListener"] = "MuiClickAwayListener";
    AtomType["MuiClockPicker"] = "MuiClockPicker";
    AtomType["MuiCollapse"] = "MuiCollapse";
    AtomType["MuiContainer"] = "MuiContainer";
    AtomType["MuiCssBaseline"] = "MuiCssBaseline";
    AtomType["MuiDataGrid"] = "MuiDataGrid";
    AtomType["MuiDatePicker"] = "MuiDatePicker";
    AtomType["MuiDateRangePicker"] = "MuiDateRangePicker";
    AtomType["MuiDateRangePickerDay"] = "MuiDateRangePickerDay";
    AtomType["MuiDateTimePicker"] = "MuiDateTimePicker";
    AtomType["MuiDesktopDatePicker"] = "MuiDesktopDatePicker";
    AtomType["MuiDesktopDateRangePicker"] = "MuiDesktopDateRangePicker";
    AtomType["MuiDesktopDateTimePicker"] = "MuiDesktopDateTimePicker";
    AtomType["MuiDesktopTimePicker"] = "MuiDesktopTimePicker";
    AtomType["MuiDialog"] = "MuiDialog";
    AtomType["MuiDialogActions"] = "MuiDialogActions";
    AtomType["MuiDialogContent"] = "MuiDialogContent";
    AtomType["MuiDialogContentText"] = "MuiDialogContentText";
    AtomType["MuiDialogTitle"] = "MuiDialogTitle";
    AtomType["MuiDivider"] = "MuiDivider";
    AtomType["MuiDrawer"] = "MuiDrawer";
    AtomType["MuiFab"] = "MuiFab";
    AtomType["MuiFade"] = "MuiFade";
    AtomType["MuiFilledInput"] = "MuiFilledInput";
    AtomType["MuiFormControl"] = "MuiFormControl";
    AtomType["MuiFormControlLabel"] = "MuiFormControlLabel";
    AtomType["MuiFormControlUnstyled"] = "MuiFormControlUnstyled";
    AtomType["MuiFormGroup"] = "MuiFormGroup";
    AtomType["MuiFormHelperText"] = "MuiFormHelperText";
    AtomType["MuiFormLabel"] = "MuiFormLabel";
    AtomType["MuiGlobalStyles"] = "MuiGlobalStyles";
    AtomType["MuiGrid"] = "MuiGrid";
    AtomType["MuiGridColDef"] = "MuiGridColDef";
    AtomType["MuiGrow"] = "MuiGrow";
    AtomType["MuiHidden"] = "MuiHidden";
    AtomType["MuiIcon"] = "MuiIcon";
    AtomType["MuiIconButton"] = "MuiIconButton";
    AtomType["MuiImageList"] = "MuiImageList";
    AtomType["MuiImageListItem"] = "MuiImageListItem";
    AtomType["MuiImageListItemBar"] = "MuiImageListItemBar";
    AtomType["MuiInput"] = "MuiInput";
    AtomType["MuiInputAdornment"] = "MuiInputAdornment";
    AtomType["MuiInputBase"] = "MuiInputBase";
    AtomType["MuiInputLabel"] = "MuiInputLabel";
    AtomType["MuiLinearProgress"] = "MuiLinearProgress";
    AtomType["MuiLink"] = "MuiLink";
    AtomType["MuiList"] = "MuiList";
    AtomType["MuiListItem"] = "MuiListItem";
    AtomType["MuiListItemAvatar"] = "MuiListItemAvatar";
    AtomType["MuiListItemButton"] = "MuiListItemButton";
    AtomType["MuiListItemIcon"] = "MuiListItemIcon";
    AtomType["MuiListItemSecondaryAction"] = "MuiListItemSecondaryAction";
    AtomType["MuiListItemText"] = "MuiListItemText";
    AtomType["MuiListSubheader"] = "MuiListSubheader";
    AtomType["MuiLoadingButton"] = "MuiLoadingButton";
    AtomType["MuiMasonry"] = "MuiMasonry";
    AtomType["MuiMasonryItem"] = "MuiMasonryItem";
    AtomType["MuiMenu"] = "MuiMenu";
    AtomType["MuiMenuItem"] = "MuiMenuItem";
    AtomType["MuiMenuList"] = "MuiMenuList";
    AtomType["MuiMobileDatePicker"] = "MuiMobileDatePicker";
    AtomType["MuiMobileDateRangePicker"] = "MuiMobileDateRangePicker";
    AtomType["MuiMobileDateTimePicker"] = "MuiMobileDateTimePicker";
    AtomType["MuiMobileStepper"] = "MuiMobileStepper";
    AtomType["MuiMobileTimePicker"] = "MuiMobileTimePicker";
    AtomType["MuiModal"] = "MuiModal";
    AtomType["MuiModalUnstyled"] = "MuiModalUnstyled";
    AtomType["MuiMonthPicker"] = "MuiMonthPicker";
    AtomType["MuiNativeSelect"] = "MuiNativeSelect";
    AtomType["MuiNoSsr"] = "MuiNoSsr";
    AtomType["MuiOutlinedInput"] = "MuiOutlinedInput";
    AtomType["MuiPagination"] = "MuiPagination";
    AtomType["MuiPaginationItem"] = "MuiPaginationItem";
    AtomType["MuiPaper"] = "MuiPaper";
    AtomType["MuiPickersDay"] = "MuiPickersDay";
    AtomType["MuiPopover"] = "MuiPopover";
    AtomType["MuiPopper"] = "MuiPopper";
    AtomType["MuiPortal"] = "MuiPortal";
    AtomType["MuiRadio"] = "MuiRadio";
    AtomType["MuiRadioGroup"] = "MuiRadioGroup";
    AtomType["MuiRating"] = "MuiRating";
    AtomType["MuiScopedCssBaseline"] = "MuiScopedCssBaseline";
    AtomType["MuiSelect"] = "MuiSelect";
    AtomType["MuiSkeleton"] = "MuiSkeleton";
    AtomType["MuiSlide"] = "MuiSlide";
    AtomType["MuiSlider"] = "MuiSlider";
    AtomType["MuiSliderUnstyled"] = "MuiSliderUnstyled";
    AtomType["MuiSnackbar"] = "MuiSnackbar";
    AtomType["MuiSnackbarContent"] = "MuiSnackbarContent";
    AtomType["MuiSpeedDial"] = "MuiSpeedDial";
    AtomType["MuiSpeedDialAction"] = "MuiSpeedDialAction";
    AtomType["MuiSpeedDialIcon"] = "MuiSpeedDialIcon";
    AtomType["MuiStack"] = "MuiStack";
    AtomType["MuiStaticDatePicker"] = "MuiStaticDatePicker";
    AtomType["MuiStaticDateRangePicker"] = "MuiStaticDateRangePicker";
    AtomType["MuiStaticDateTimePicker"] = "MuiStaticDateTimePicker";
    AtomType["MuiStaticTimePicker"] = "MuiStaticTimePicker";
    AtomType["MuiStep"] = "MuiStep";
    AtomType["MuiStepButton"] = "MuiStepButton";
    AtomType["MuiStepConnector"] = "MuiStepConnector";
    AtomType["MuiStepContent"] = "MuiStepContent";
    AtomType["MuiStepIcon"] = "MuiStepIcon";
    AtomType["MuiStepLabel"] = "MuiStepLabel";
    AtomType["MuiStepper"] = "MuiStepper";
    AtomType["MuiSvgIcon"] = "MuiSvgIcon";
    AtomType["MuiSwipeableDrawer"] = "MuiSwipeableDrawer";
    AtomType["MuiSwitch"] = "MuiSwitch";
    AtomType["MuiSwitchUnstyled"] = "MuiSwitchUnstyled";
    AtomType["MuiTab"] = "MuiTab";
    AtomType["MuiTabContext"] = "MuiTabContext";
    AtomType["MuiTabList"] = "MuiTabList";
    AtomType["MuiTabPanel"] = "MuiTabPanel";
    AtomType["MuiTabScrollButton"] = "MuiTabScrollButton";
    AtomType["MuiTable"] = "MuiTable";
    AtomType["MuiTableBody"] = "MuiTableBody";
    AtomType["MuiTableCell"] = "MuiTableCell";
    AtomType["MuiTableContainer"] = "MuiTableContainer";
    AtomType["MuiTableFooter"] = "MuiTableFooter";
    AtomType["MuiTableHead"] = "MuiTableHead";
    AtomType["MuiTablePagination"] = "MuiTablePagination";
    AtomType["MuiTableRow"] = "MuiTableRow";
    AtomType["MuiTableSortLabel"] = "MuiTableSortLabel";
    AtomType["MuiTabs"] = "MuiTabs";
    AtomType["MuiTextField"] = "MuiTextField";
    AtomType["MuiTextareaAutosize"] = "MuiTextareaAutosize";
    AtomType["MuiTimePicker"] = "MuiTimePicker";
    AtomType["MuiTimeline"] = "MuiTimeline";
    AtomType["MuiTimelineConnector"] = "MuiTimelineConnector";
    AtomType["MuiTimelineContent"] = "MuiTimelineContent";
    AtomType["MuiTimelineDot"] = "MuiTimelineDot";
    AtomType["MuiTimelineItem"] = "MuiTimelineItem";
    AtomType["MuiTimelineOppositeContent"] = "MuiTimelineOppositeContent";
    AtomType["MuiTimelineSeparator"] = "MuiTimelineSeparator";
    AtomType["MuiToggleButton"] = "MuiToggleButton";
    AtomType["MuiToggleButtonGroup"] = "MuiToggleButtonGroup";
    AtomType["MuiToolbar"] = "MuiToolbar";
    AtomType["MuiTooltip"] = "MuiTooltip";
    AtomType["MuiTreeItem"] = "MuiTreeItem";
    AtomType["MuiTreeView"] = "MuiTreeView";
    AtomType["MuiTypography"] = "MuiTypography";
    AtomType["MuiUnstableTrapFocus"] = "MuiUnstableTrapFocus";
    AtomType["MuiYearPicker"] = "MuiYearPicker";
    AtomType["MuiZoom"] = "MuiZoom";
    AtomType["Query"] = "Query";
    AtomType["ReactFragment"] = "ReactFragment";
    AtomType["Script"] = "Script";
    AtomType["State"] = "State";
    AtomType["Text"] = "Text";
    AtomType["TextList"] = "TextList";
})(AtomType = exports.AtomType || (exports.AtomType = {}));
var CodeMirrorLanguage;
(function (CodeMirrorLanguage) {
    CodeMirrorLanguage["Css"] = "Css";
    CodeMirrorLanguage["CssInJs"] = "CssInJs";
    CodeMirrorLanguage["Graphql"] = "Graphql";
    CodeMirrorLanguage["Javascript"] = "Javascript";
    CodeMirrorLanguage["Json"] = "Json";
    CodeMirrorLanguage["Typescript"] = "Typescript";
})(CodeMirrorLanguage = exports.CodeMirrorLanguage || (exports.CodeMirrorLanguage = {}));
var ElementTypeKind;
(function (ElementTypeKind) {
    ElementTypeKind["AllElements"] = "AllElements";
    ElementTypeKind["ChildrenOnly"] = "ChildrenOnly";
    ElementTypeKind["DescendantsOnly"] = "DescendantsOnly";
    ElementTypeKind["ExcludeDescendantsElements"] = "ExcludeDescendantsElements";
})(ElementTypeKind = exports.ElementTypeKind || (exports.ElementTypeKind = {}));
var PageKind;
(function (PageKind) {
    PageKind["InternalServerError"] = "InternalServerError";
    PageKind["NotFound"] = "NotFound";
    PageKind["Provider"] = "Provider";
    PageKind["Regular"] = "Regular";
})(PageKind = exports.PageKind || (exports.PageKind = {}));
var PrimitiveTypeKind;
(function (PrimitiveTypeKind) {
    PrimitiveTypeKind["Boolean"] = "Boolean";
    PrimitiveTypeKind["Integer"] = "Integer";
    PrimitiveTypeKind["Number"] = "Number";
    PrimitiveTypeKind["String"] = "String";
})(PrimitiveTypeKind = exports.PrimitiveTypeKind || (exports.PrimitiveTypeKind = {}));
var RenderTypeKind;
(function (RenderTypeKind) {
    RenderTypeKind["Atom"] = "Atom";
    RenderTypeKind["Component"] = "Component";
})(RenderTypeKind = exports.RenderTypeKind || (exports.RenderTypeKind = {}));
var ResourceType;
(function (ResourceType) {
    ResourceType["GraphQL"] = "GraphQL";
    ResourceType["Rest"] = "Rest";
})(ResourceType = exports.ResourceType || (exports.ResourceType = {}));
var Role;
(function (Role) {
    Role["Admin"] = "Admin";
    Role["User"] = "User";
})(Role = exports.Role || (exports.Role = {}));
var SortDirection;
(function (SortDirection) {
    /** Sort by field values in ascending order. */
    SortDirection["ASC"] = "ASC";
    /** Sort by field values in descending order. */
    SortDirection["DESC"] = "DESC";
})(SortDirection = exports.SortDirection || (exports.SortDirection = {}));
var TypeKind;
(function (TypeKind) {
    TypeKind["ActionType"] = "ActionType";
    TypeKind["AppType"] = "AppType";
    TypeKind["ArrayType"] = "ArrayType";
    TypeKind["CodeMirrorType"] = "CodeMirrorType";
    TypeKind["ElementType"] = "ElementType";
    TypeKind["EnumType"] = "EnumType";
    TypeKind["InterfaceType"] = "InterfaceType";
    TypeKind["LambdaType"] = "LambdaType";
    TypeKind["PageType"] = "PageType";
    TypeKind["PrimitiveType"] = "PrimitiveType";
    TypeKind["ReactNodeType"] = "ReactNodeType";
    TypeKind["RenderPropType"] = "RenderPropType";
    TypeKind["UnionType"] = "UnionType";
})(TypeKind = exports.TypeKind || (exports.TypeKind = {}));


/***/ }),
/* 90 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 91 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 92 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 93 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IAtomType = exports.__AtomType = void 0;
const codegen_1 = __webpack_require__(88);
Object.defineProperty(exports, "IAtomType", ({ enumerable: true, get: function () { return codegen_1.AtomType; } }));
/**
 * We create the enum here then import into Neo4j graphql schema so we can get linting
 *
 *  @deprecated We have to use the copy from codegen, otherwise they don't match up
 */
var __AtomType;
(function (__AtomType) {
    // Ant Design
    __AtomType["AntDesignAffix"] = "AntDesignAffix";
    __AtomType["AntDesignAlert"] = "AntDesignAlert";
    __AtomType["AntDesignAnchor"] = "AntDesignAnchor";
    __AtomType["AntDesignAnchorLink"] = "AntDesignAnchorLink";
    __AtomType["AntDesignAutoComplete"] = "AntDesignAutoComplete";
    __AtomType["AntDesignAvatar"] = "AntDesignAvatar";
    __AtomType["AntDesignBackTop"] = "AntDesignBackTop";
    __AtomType["AntDesignBadge"] = "AntDesignBadge";
    __AtomType["AntDesignBreadcrumb"] = "AntDesignBreadcrumb";
    __AtomType["AntDesignBreadcrumbItem"] = "AntDesignBreadcrumbItem";
    __AtomType["AntDesignCard"] = "AntDesignCard";
    __AtomType["AntDesignCardGrid"] = "AntDesignCardGrid";
    __AtomType["AntDesignBreadcrumbSeparator"] = "AntDesignBreadcrumbSeparator";
    __AtomType["AntDesignButton"] = "AntDesignButton";
    __AtomType["AntDesignCalendar"] = "AntDesignCalendar";
    __AtomType["AntDesignCollapsePanel"] = "AntDesignCollapsePanel";
    __AtomType["AntDesignComment"] = "AntDesignComment";
    __AtomType["AntDesignConfigProvider"] = "AntDesignConfigProvider";
    __AtomType["AntDesignDatePicker"] = "AntDesignDatePicker";
    __AtomType["AntDesignDescriptions"] = "AntDesignDescriptions";
    __AtomType["AntDesignCheckbox"] = "AntDesignCheckbox";
    __AtomType["AntDesignCheckboxGroup"] = "AntDesignCheckboxGroup";
    __AtomType["AntDesignCollapse"] = "AntDesignCollapse";
    __AtomType["AntDesignDropdown"] = "AntDesignDropdown";
    __AtomType["AntDesignCardMeta"] = "AntDesignCardMeta";
    __AtomType["AntDesignForm"] = "AntDesignForm";
    __AtomType["AntDesignFormErrorList"] = "AntDesignFormErrorList";
    __AtomType["AntDesignFormItem"] = "AntDesignFormItem";
    __AtomType["AntDesignDivider"] = "AntDesignDivider";
    __AtomType["AntDesignDrawer"] = "AntDesignDrawer";
    __AtomType["AntDesignFormProvider"] = "AntDesignFormProvider";
    __AtomType["AntDesignDropdownButton"] = "AntDesignDropdownButton";
    __AtomType["AntDesignEmpty"] = "AntDesignEmpty";
    __AtomType["AntDesignImage"] = "AntDesignImage";
    __AtomType["AntDesignDescriptionsItem"] = "AntDesignDescriptionsItem";
    __AtomType["AntDesignFormList"] = "AntDesignFormList";
    __AtomType["AntDesignCascader"] = "AntDesignCascader";
    __AtomType["AntDesignLayoutFooter"] = "AntDesignLayoutFooter";
    __AtomType["AntDesignLayoutHeader"] = "AntDesignLayoutHeader";
    __AtomType["AntDesignLayoutSider"] = "AntDesignLayoutSider";
    __AtomType["AntDesignIcon"] = "AntDesignIcon";
    __AtomType["AntDesignInput"] = "AntDesignInput";
    __AtomType["AntDesignInputNumber"] = "AntDesignInputNumber";
    __AtomType["AntDesignLayout"] = "AntDesignLayout";
    __AtomType["AntDesignLayoutContent"] = "AntDesignLayoutContent";
    __AtomType["AntDesignMentionsOption"] = "AntDesignMentionsOption";
    __AtomType["AntDesignMenu"] = "AntDesignMenu";
    __AtomType["AntDesignGridRow"] = "AntDesignGridRow";
    __AtomType["AntDesignList"] = "AntDesignList";
    __AtomType["AntDesignListItem"] = "AntDesignListItem";
    __AtomType["AntDesignMessage"] = "AntDesignMessage";
    __AtomType["AntDesignMentions"] = "AntDesignMentions";
    __AtomType["AntDesignGridCol"] = "AntDesignGridCol";
    __AtomType["AntDesignProgress"] = "AntDesignProgress";
    __AtomType["AntDesignNotification"] = "AntDesignNotification";
    __AtomType["AntDesignRadio"] = "AntDesignRadio";
    __AtomType["AntDesignListItemMeta"] = "AntDesignListItemMeta";
    __AtomType["AntDesignPagination"] = "AntDesignPagination";
    __AtomType["AntDesignPopconfirm"] = "AntDesignPopconfirm";
    __AtomType["AntDesignPopover"] = "AntDesignPopover";
    __AtomType["AntDesignResult"] = "AntDesignResult";
    __AtomType["AntDesignModal"] = "AntDesignModal";
    __AtomType["AntDesignSegmented"] = "AntDesignSegmented";
    __AtomType["AntDesignRadioGroup"] = "AntDesignRadioGroup";
    __AtomType["AntDesignRate"] = "AntDesignRate";
    __AtomType["AntDesignStatistic"] = "AntDesignStatistic";
    __AtomType["AntDesignSteps"] = "AntDesignSteps";
    __AtomType["AntDesignSelectOption"] = "AntDesignSelectOption";
    __AtomType["AntDesignSkeleton"] = "AntDesignSkeleton";
    __AtomType["AntDesignSlider"] = "AntDesignSlider";
    __AtomType["AntDesignSpace"] = "AntDesignSpace";
    __AtomType["AntDesignSpin"] = "AntDesignSpin";
    __AtomType["AntDesignTag"] = "AntDesignTag";
    __AtomType["AntDesignSelect"] = "AntDesignSelect";
    __AtomType["AntDesignStepsStep"] = "AntDesignStepsStep";
    __AtomType["AntDesignSwitch"] = "AntDesignSwitch";
    __AtomType["AntDesignTable"] = "AntDesignTable";
    __AtomType["AntDesignTabs"] = "AntDesignTabs";
    __AtomType["AntDesignTabsTabPane"] = "AntDesignTabsTabPane";
    __AtomType["AntDesignTreeSelect"] = "AntDesignTreeSelect";
    __AtomType["AntDesignTimeline"] = "AntDesignTimeline";
    __AtomType["AntDesignTimelineItem"] = "AntDesignTimelineItem";
    __AtomType["AntDesignTooltip"] = "AntDesignTooltip";
    __AtomType["AntDesignTransfer"] = "AntDesignTransfer";
    __AtomType["AntDesignTree"] = "AntDesignTree";
    __AtomType["AntDesignTimePicker"] = "AntDesignTimePicker";
    __AtomType["AntDesignTypographyParagraph"] = "AntDesignTypographyParagraph";
    __AtomType["AntDesignTypographyText"] = "AntDesignTypographyText";
    __AtomType["AntDesignTypographyTitle"] = "AntDesignTypographyTitle";
    __AtomType["AntDesignUpload"] = "AntDesignUpload";
    __AtomType["AntDesignCarousel"] = "AntDesignCarousel";
    //
    // MUI
    //
    __AtomType["MuiAccordion"] = "MuiAccordion";
    __AtomType["MuiAccordionActions"] = "MuiAccordionActions";
    __AtomType["MuiAccordionDetails"] = "MuiAccordionDetails";
    __AtomType["MuiAccordionSummary"] = "MuiAccordionSummary";
    __AtomType["MuiAlert"] = "MuiAlert";
    __AtomType["MuiAlertTitle"] = "MuiAlertTitle";
    __AtomType["MuiAppBar"] = "MuiAppBar";
    __AtomType["MuiAutocomplete"] = "MuiAutocomplete";
    __AtomType["MuiAvatar"] = "MuiAvatar";
    __AtomType["MuiAvatarGroup"] = "MuiAvatarGroup";
    __AtomType["MuiBackdrop"] = "MuiBackdrop";
    __AtomType["MuiBadge"] = "MuiBadge";
    __AtomType["MuiBadgeUnstyled"] = "MuiBadgeUnstyled";
    __AtomType["MuiBottomNavigation"] = "MuiBottomNavigation";
    __AtomType["MuiBottomNavigationAction"] = "MuiBottomNavigationAction";
    __AtomType["MuiBox"] = "MuiBox";
    __AtomType["MuiBreadcrumbs"] = "MuiBreadcrumbs";
    __AtomType["MuiButton"] = "MuiButton";
    __AtomType["MuiButtonBase"] = "MuiButtonBase";
    __AtomType["MuiButtonGroup"] = "MuiButtonGroup";
    __AtomType["MuiButtonUnstyled"] = "MuiButtonUnstyled";
    __AtomType["MuiCalendarPicker"] = "MuiCalendarPicker";
    __AtomType["MuiCalendarPickerSkeleton"] = "MuiCalendarPickerSkeleton";
    __AtomType["MuiCard"] = "MuiCard";
    __AtomType["MuiCardActionArea"] = "MuiCardActionArea";
    __AtomType["MuiCardActions"] = "MuiCardActions";
    __AtomType["MuiCardContent"] = "MuiCardContent";
    __AtomType["MuiCardHeader"] = "MuiCardHeader";
    __AtomType["MuiCardMedia"] = "MuiCardMedia";
    __AtomType["MuiCheckbox"] = "MuiCheckbox";
    __AtomType["MuiChip"] = "MuiChip";
    __AtomType["MuiCircularProgress"] = "MuiCircularProgress";
    __AtomType["MuiClickAwayListener"] = "MuiClickAwayListener";
    __AtomType["MuiClockPicker"] = "MuiClockPicker";
    __AtomType["MuiCollapse"] = "MuiCollapse";
    __AtomType["MuiContainer"] = "MuiContainer";
    __AtomType["MuiCssBaseline"] = "MuiCssBaseline";
    __AtomType["MuiDataGrid"] = "MuiDataGrid";
    __AtomType["MuiGridColDef"] = "MuiGridColDef";
    __AtomType["MuiDatePicker"] = "MuiDatePicker";
    __AtomType["MuiDateRangePicker"] = "MuiDateRangePicker";
    __AtomType["MuiDateRangePickerDay"] = "MuiDateRangePickerDay";
    __AtomType["MuiDateTimePicker"] = "MuiDateTimePicker";
    __AtomType["MuiDesktopDatePicker"] = "MuiDesktopDatePicker";
    __AtomType["MuiDesktopDateRangePicker"] = "MuiDesktopDateRangePicker";
    __AtomType["MuiDesktopDateTimePicker"] = "MuiDesktopDateTimePicker";
    __AtomType["MuiDesktopTimePicker"] = "MuiDesktopTimePicker";
    __AtomType["MuiDialog"] = "MuiDialog";
    __AtomType["MuiDialogActions"] = "MuiDialogActions";
    __AtomType["MuiDialogContent"] = "MuiDialogContent";
    __AtomType["MuiDialogContentText"] = "MuiDialogContentText";
    __AtomType["MuiDialogTitle"] = "MuiDialogTitle";
    __AtomType["MuiDivider"] = "MuiDivider";
    __AtomType["MuiDrawer"] = "MuiDrawer";
    __AtomType["MuiFab"] = "MuiFab";
    __AtomType["MuiFade"] = "MuiFade";
    __AtomType["MuiFilledInput"] = "MuiFilledInput";
    __AtomType["MuiFormControl"] = "MuiFormControl";
    __AtomType["MuiFormControlLabel"] = "MuiFormControlLabel";
    __AtomType["MuiFormControlUnstyled"] = "MuiFormControlUnstyled";
    __AtomType["MuiFormGroup"] = "MuiFormGroup";
    __AtomType["MuiFormHelperText"] = "MuiFormHelperText";
    __AtomType["MuiFormLabel"] = "MuiFormLabel";
    __AtomType["MuiGlobalStyles"] = "MuiGlobalStyles";
    __AtomType["MuiGrid"] = "MuiGrid";
    __AtomType["MuiGrow"] = "MuiGrow";
    __AtomType["MuiHidden"] = "MuiHidden";
    __AtomType["MuiIcon"] = "MuiIcon";
    __AtomType["MuiIconButton"] = "MuiIconButton";
    __AtomType["MuiImageList"] = "MuiImageList";
    __AtomType["MuiImageListItem"] = "MuiImageListItem";
    __AtomType["MuiImageListItemBar"] = "MuiImageListItemBar";
    __AtomType["MuiInput"] = "MuiInput";
    __AtomType["MuiInputAdornment"] = "MuiInputAdornment";
    __AtomType["MuiInputBase"] = "MuiInputBase";
    __AtomType["MuiInputLabel"] = "MuiInputLabel";
    __AtomType["MuiLinearProgress"] = "MuiLinearProgress";
    __AtomType["MuiLink"] = "MuiLink";
    __AtomType["MuiList"] = "MuiList";
    __AtomType["MuiListItem"] = "MuiListItem";
    __AtomType["MuiListItemAvatar"] = "MuiListItemAvatar";
    __AtomType["MuiListItemButton"] = "MuiListItemButton";
    __AtomType["MuiListItemIcon"] = "MuiListItemIcon";
    __AtomType["MuiListItemSecondaryAction"] = "MuiListItemSecondaryAction";
    __AtomType["MuiListItemText"] = "MuiListItemText";
    __AtomType["MuiListSubheader"] = "MuiListSubheader";
    __AtomType["MuiLoadingButton"] = "MuiLoadingButton";
    __AtomType["MuiMasonry"] = "MuiMasonry";
    __AtomType["MuiMasonryItem"] = "MuiMasonryItem";
    __AtomType["MuiMenu"] = "MuiMenu";
    __AtomType["MuiMenuItem"] = "MuiMenuItem";
    __AtomType["MuiMenuList"] = "MuiMenuList";
    __AtomType["MuiMobileDatePicker"] = "MuiMobileDatePicker";
    __AtomType["MuiMobileDateRangePicker"] = "MuiMobileDateRangePicker";
    __AtomType["MuiMobileDateTimePicker"] = "MuiMobileDateTimePicker";
    __AtomType["MuiMobileStepper"] = "MuiMobileStepper";
    __AtomType["MuiMobileTimePicker"] = "MuiMobileTimePicker";
    __AtomType["MuiModal"] = "MuiModal";
    __AtomType["MuiModalUnstyled"] = "MuiModalUnstyled";
    __AtomType["MuiMonthPicker"] = "MuiMonthPicker";
    __AtomType["MuiNativeSelect"] = "MuiNativeSelect";
    __AtomType["MuiNoSsr"] = "MuiNoSsr";
    __AtomType["MuiOutlinedInput"] = "MuiOutlinedInput";
    __AtomType["MuiPagination"] = "MuiPagination";
    __AtomType["MuiPaginationItem"] = "MuiPaginationItem";
    __AtomType["MuiPaper"] = "MuiPaper";
    __AtomType["MuiPickersDay"] = "MuiPickersDay";
    __AtomType["MuiPopover"] = "MuiPopover";
    __AtomType["MuiPopper"] = "MuiPopper";
    __AtomType["MuiPortal"] = "MuiPortal";
    __AtomType["MuiRadio"] = "MuiRadio";
    __AtomType["MuiRadioGroup"] = "MuiRadioGroup";
    __AtomType["MuiRating"] = "MuiRating";
    __AtomType["MuiScopedCssBaseline"] = "MuiScopedCssBaseline";
    __AtomType["MuiSelect"] = "MuiSelect";
    __AtomType["MuiSkeleton"] = "MuiSkeleton";
    __AtomType["MuiSlide"] = "MuiSlide";
    __AtomType["MuiSlider"] = "MuiSlider";
    __AtomType["MuiSliderUnstyled"] = "MuiSliderUnstyled";
    __AtomType["MuiSnackbar"] = "MuiSnackbar";
    __AtomType["MuiSnackbarContent"] = "MuiSnackbarContent";
    __AtomType["MuiSpeedDial"] = "MuiSpeedDial";
    __AtomType["MuiSpeedDialAction"] = "MuiSpeedDialAction";
    __AtomType["MuiSpeedDialIcon"] = "MuiSpeedDialIcon";
    __AtomType["MuiStack"] = "MuiStack";
    __AtomType["MuiStaticDatePicker"] = "MuiStaticDatePicker";
    __AtomType["MuiStaticDateRangePicker"] = "MuiStaticDateRangePicker";
    __AtomType["MuiStaticDateTimePicker"] = "MuiStaticDateTimePicker";
    __AtomType["MuiStaticTimePicker"] = "MuiStaticTimePicker";
    __AtomType["MuiStep"] = "MuiStep";
    __AtomType["MuiStepButton"] = "MuiStepButton";
    __AtomType["MuiStepConnector"] = "MuiStepConnector";
    __AtomType["MuiStepContent"] = "MuiStepContent";
    __AtomType["MuiStepIcon"] = "MuiStepIcon";
    __AtomType["MuiStepLabel"] = "MuiStepLabel";
    __AtomType["MuiStepper"] = "MuiStepper";
    __AtomType["MuiSvgIcon"] = "MuiSvgIcon";
    __AtomType["MuiSwipeableDrawer"] = "MuiSwipeableDrawer";
    __AtomType["MuiSwitch"] = "MuiSwitch";
    __AtomType["MuiSwitchUnstyled"] = "MuiSwitchUnstyled";
    __AtomType["MuiTab"] = "MuiTab";
    __AtomType["MuiTabContext"] = "MuiTabContext";
    __AtomType["MuiTabList"] = "MuiTabList";
    __AtomType["MuiTabPanel"] = "MuiTabPanel";
    __AtomType["MuiTabScrollButton"] = "MuiTabScrollButton";
    __AtomType["MuiTable"] = "MuiTable";
    __AtomType["MuiTableBody"] = "MuiTableBody";
    __AtomType["MuiTableCell"] = "MuiTableCell";
    __AtomType["MuiTableContainer"] = "MuiTableContainer";
    __AtomType["MuiTableFooter"] = "MuiTableFooter";
    __AtomType["MuiTableHead"] = "MuiTableHead";
    __AtomType["MuiTablePagination"] = "MuiTablePagination";
    __AtomType["MuiTableRow"] = "MuiTableRow";
    __AtomType["MuiTableSortLabel"] = "MuiTableSortLabel";
    __AtomType["MuiTabs"] = "MuiTabs";
    __AtomType["MuiTextField"] = "MuiTextField";
    __AtomType["MuiTextareaAutosize"] = "MuiTextareaAutosize";
    __AtomType["MuiTimePicker"] = "MuiTimePicker";
    __AtomType["MuiTimeline"] = "MuiTimeline";
    __AtomType["MuiTimelineConnector"] = "MuiTimelineConnector";
    __AtomType["MuiTimelineContent"] = "MuiTimelineContent";
    __AtomType["MuiTimelineDot"] = "MuiTimelineDot";
    __AtomType["MuiTimelineItem"] = "MuiTimelineItem";
    __AtomType["MuiTimelineOppositeContent"] = "MuiTimelineOppositeContent";
    __AtomType["MuiTimelineSeparator"] = "MuiTimelineSeparator";
    __AtomType["MuiToggleButton"] = "MuiToggleButton";
    __AtomType["MuiToggleButtonGroup"] = "MuiToggleButtonGroup";
    __AtomType["MuiToolbar"] = "MuiToolbar";
    __AtomType["MuiTooltip"] = "MuiTooltip";
    __AtomType["MuiTreeItem"] = "MuiTreeItem";
    __AtomType["MuiTreeView"] = "MuiTreeView";
    __AtomType["MuiTypography"] = "MuiTypography";
    __AtomType["MuiUnstableTrapFocus"] = "MuiUnstableTrapFocus";
    __AtomType["MuiYearPicker"] = "MuiYearPicker";
    __AtomType["MuiZoom"] = "MuiZoom";
    //
    // Custom:
    //
    // TODO: need to remove
    __AtomType["Query"] = "Query";
    __AtomType["TextList"] = "TextList";
    __AtomType["Text"] = "Text";
    __AtomType["Script"] = "Script";
    __AtomType["State"] = "State";
    __AtomType["GridLayout"] = "GridLayout";
    // Hook
    __AtomType["HookGraphqlQuery"] = "HookGraphqlQuery";
    __AtomType["HookGraphqlMutation"] = "HookGraphqlMutation";
    __AtomType["HookRecoilState"] = "HookRecoilState";
    __AtomType["HookRouter"] = "HookRouter";
    __AtomType["HookQueryLambda"] = "HookQueryLambda";
    __AtomType["HookQueryConfig"] = "HookQueryConfig";
    __AtomType["HookQueryPages"] = "HookQueryPages";
    __AtomType["HookQueryPage"] = "HookQueryPage";
    // React
    __AtomType["ReactFragment"] = "ReactFragment";
    __AtomType["HtmlA"] = "HtmlA";
    __AtomType["HtmlAbbr"] = "HtmlAbbr";
    __AtomType["HtmlArea"] = "HtmlArea";
    __AtomType["HtmlArticle"] = "HtmlArticle";
    __AtomType["HtmlAside"] = "HtmlAside";
    __AtomType["HtmlAudio"] = "HtmlAudio";
    __AtomType["HtmlB"] = "HtmlB";
    __AtomType["HtmlBase"] = "HtmlBase";
    __AtomType["HtmlBdo"] = "HtmlBdo";
    __AtomType["HtmlBlockquote"] = "HtmlBlockquote";
    __AtomType["HtmlBr"] = "HtmlBr";
    __AtomType["HtmlButton"] = "HtmlButton";
    __AtomType["HtmlCanvas"] = "HtmlCanvas";
    __AtomType["HtmlCite"] = "HtmlCite";
    __AtomType["HtmlCode"] = "HtmlCode";
    __AtomType["HtmlCol"] = "HtmlCol";
    __AtomType["HtmlDl"] = "HtmlDl";
    __AtomType["HtmlData"] = "HtmlData";
    __AtomType["HtmlDatalist"] = "HtmlDatalist";
    __AtomType["HtmlDetails"] = "HtmlDetails";
    __AtomType["HtmlDfn"] = "HtmlDfn";
    __AtomType["HtmlDialog"] = "HtmlDialog";
    __AtomType["HtmlDiv"] = "HtmlDiv";
    __AtomType["HtmlEm"] = "HtmlEm";
    __AtomType["HtmlEmbed"] = "HtmlEmbed";
    __AtomType["HtmlFieldset"] = "HtmlFieldset";
    __AtomType["HtmlFooter"] = "HtmlFooter";
    __AtomType["HtmlForm"] = "HtmlForm";
    __AtomType["HtmlH1"] = "HtmlH1";
    __AtomType["HtmlH2"] = "HtmlH2";
    __AtomType["HtmlH3"] = "HtmlH3";
    __AtomType["HtmlH4"] = "HtmlH4";
    __AtomType["HtmlH5"] = "HtmlH5";
    __AtomType["HtmlH6"] = "HtmlH6";
    __AtomType["HtmlHead"] = "HtmlHead";
    __AtomType["HtmlHeader"] = "HtmlHeader";
    __AtomType["HtmlHr"] = "HtmlHr";
    __AtomType["HtmlI"] = "HtmlI";
    __AtomType["HtmlIframe"] = "HtmlIframe";
    __AtomType["HtmlImg"] = "HtmlImg";
    __AtomType["HtmlInput"] = "HtmlInput";
    __AtomType["HtmlKbd"] = "HtmlKbd";
    __AtomType["HtmlLabel"] = "HtmlLabel";
    __AtomType["HtmlLegend"] = "HtmlLegend";
    __AtomType["HtmlLi"] = "HtmlLi";
    __AtomType["HtmlLink"] = "HtmlLink";
    __AtomType["HtmlMain"] = "HtmlMain";
    __AtomType["HtmlMath"] = "HtmlMath";
    __AtomType["HtmlMark"] = "HtmlMark";
    __AtomType["HtmlMap"] = "HtmlMap";
    __AtomType["HtmlMeta"] = "HtmlMeta";
    __AtomType["HtmlMeter"] = "HtmlMeter";
    __AtomType["HtmlNav"] = "HtmlNav";
    __AtomType["HtmlNoscript"] = "HtmlNoscript";
    __AtomType["HtmlOl"] = "HtmlOl";
    __AtomType["HtmlObject"] = "HtmlObject";
    __AtomType["HtmlOptgroup"] = "HtmlOptgroup";
    __AtomType["HtmlOption"] = "HtmlOption";
    __AtomType["HtmlOutput"] = "HtmlOutput";
    __AtomType["HtmlP"] = "HtmlP";
    __AtomType["HtmlParam"] = "HtmlParam";
    __AtomType["HtmlPicture"] = "HtmlPicture";
    __AtomType["HtmlPre"] = "HtmlPre";
    __AtomType["HtmlProgress"] = "HtmlProgress";
    __AtomType["HtmlQ"] = "HtmlQ";
    __AtomType["HtmlRuby"] = "HtmlRuby";
    __AtomType["HtmlS"] = "HtmlS";
    __AtomType["HtmlSamp"] = "HtmlSamp";
    __AtomType["HtmlScript"] = "HtmlScript";
    __AtomType["HtmlSection"] = "HtmlSection";
    __AtomType["HtmlSelect"] = "HtmlSelect";
    __AtomType["HtmlSmall"] = "HtmlSmall";
    __AtomType["HtmlSource"] = "HtmlSource";
    __AtomType["HtmlSpan"] = "HtmlSpan";
    __AtomType["HtmlStrong"] = "HtmlStrong";
    __AtomType["HtmlStyle"] = "HtmlStyle";
    __AtomType["HtmlSub"] = "HtmlSub";
    __AtomType["HtmlSup"] = "HtmlSup";
    __AtomType["HtmlSvg"] = "HtmlSvg";
    __AtomType["HtmlTable"] = "HtmlTable";
    __AtomType["HtmlCaption"] = "HtmlCaption";
    __AtomType["HtmlTd"] = "HtmlTd";
    __AtomType["HtmlTh"] = "HtmlTh";
    __AtomType["HtmlTr"] = "HtmlTr";
    __AtomType["HtmlTemplate"] = "HtmlTemplate";
    __AtomType["HtmlTextarea"] = "HtmlTextarea";
    __AtomType["HtmlTime"] = "HtmlTime";
    __AtomType["HtmlTitle"] = "HtmlTitle";
    __AtomType["HtmlTrack"] = "HtmlTrack";
    __AtomType["HtmlU"] = "HtmlU";
    __AtomType["HtmlUl"] = "HtmlUl";
    __AtomType["HtmlVar"] = "HtmlVar";
    __AtomType["HtmlVideo"] = "HtmlVideo";
    __AtomType["HtmlWbr"] = "HtmlWbr";
    // External dynamic component
    __AtomType["ExternalComponent"] = "ExternalComponent";
})(__AtomType = exports.__AtomType || (exports.__AtomType = {}));


/***/ }),
/* 94 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ICodeMirrorLanguage = void 0;
const codegen_1 = __webpack_require__(88);
Object.defineProperty(exports, "ICodeMirrorLanguage", ({ enumerable: true, get: function () { return codegen_1.CodeMirrorLanguage; } }));


/***/ }),
/* 95 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 96 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.elementTypeMap = exports.IElementTypeKind = exports.__ElementTypeKind = void 0;
const codegen_1 = __webpack_require__(88);
Object.defineProperty(exports, "IElementTypeKind", ({ enumerable: true, get: function () { return codegen_1.ElementTypeKind; } }));
/**
 * Used to import to schema, we create in ts context so we can get type checking
 *
 * @deprecated
 */
var __ElementTypeKind;
(function (__ElementTypeKind) {
    /**
     * Pick any element in the current tree
     */
    __ElementTypeKind["AllElements"] = "AllElements";
    /**
     * Pick any element from the children of the current element
     */
    __ElementTypeKind["ChildrenOnly"] = "ChildrenOnly";
    /**
     * Pick any element from the descendants of the current element
     */
    __ElementTypeKind["DescendantsOnly"] = "DescendantsOnly";
    /**
     * Pick parents and siblings of parents of elements (used to move element)
     */
    __ElementTypeKind["ExcludeDescendantsElements"] = "ExcludeDescendantsElements";
})(__ElementTypeKind = exports.__ElementTypeKind || (exports.__ElementTypeKind = {}));
const elementTypeMap = (elementType) => codegen_1.ElementTypeKind[elementType];
exports.elementTypeMap = elementTypeMap;


/***/ }),
/* 97 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DOMAIN_GRAPHQL_ERROR_CODES = void 0;
exports.DOMAIN_GRAPHQL_ERROR_CODES = {
    DOMAIN_EXIST: 'DOMAIN_EXIST',
};


/***/ }),
/* 98 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 99 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JWT_CLAIMS = void 0;
exports.JWT_CLAIMS = `https://api.codelab.app/jwt/claims`;


/***/ }),
/* 100 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 101 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IPageKindName = exports.IPageKind = exports.__PageKind = void 0;
const codegen_1 = __webpack_require__(88);
Object.defineProperty(exports, "IPageKind", ({ enumerable: true, get: function () { return codegen_1.PageKind; } }));
/**
 * We create the enum here then import into Neo4j graphql schema so we can get linting
 *
 *  @deprecated We have to use the copy from codegen, otherwise they don't match up
 */
var __PageKind;
(function (__PageKind) {
    __PageKind["Provider"] = "Provider";
    __PageKind["InternalServerError"] = "InternalServerError";
    __PageKind["NotFound"] = "NotFound";
    __PageKind["Regular"] = "Regular";
})(__PageKind = exports.__PageKind || (exports.__PageKind = {}));
var IPageKindName;
(function (IPageKindName) {
    IPageKindName["Provider"] = "_app";
    IPageKindName["InternalServerError"] = "500";
    IPageKindName["NotFound"] = "404";
})(IPageKindName = exports.IPageKindName || (exports.IPageKindName = {}));


/***/ }),
/* 102 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IPrimitiveTypeKind = void 0;
const codegen_1 = __webpack_require__(88);
Object.defineProperty(exports, "IPrimitiveTypeKind", ({ enumerable: true, get: function () { return codegen_1.PrimitiveTypeKind; } }));


/***/ }),
/* 103 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 104 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IRenderTypeKind = exports.__RenderTypeKind = void 0;
const codegen_1 = __webpack_require__(88);
Object.defineProperty(exports, "IRenderTypeKind", ({ enumerable: true, get: function () { return codegen_1.RenderTypeKind; } }));
/**
 *  @deprecated We have to use the copy from codegen, otherwise they don't match up
 */
var __RenderTypeKind;
(function (__RenderTypeKind) {
    __RenderTypeKind["Atom"] = "Atom";
    __RenderTypeKind["Component"] = "Component";
})(__RenderTypeKind = exports.__RenderTypeKind || (exports.__RenderTypeKind = {}));


/***/ }),
/* 105 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IResourceType = void 0;
const codegen_1 = __webpack_require__(88);
Object.defineProperty(exports, "IResourceType", ({ enumerable: true, get: function () { return codegen_1.ResourceType; } }));


/***/ }),
/* 106 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IRole = void 0;
/**
 * Auth0 post registration hook only works for database, social login can't assign a role.
 *
 * We don't set a role for regular users
 */
const codegen_1 = __webpack_require__(88);
Object.defineProperty(exports, "IRole", ({ enumerable: true, get: function () { return codegen_1.Role; } }));


/***/ }),
/* 107 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(108), exports);


/***/ }),
/* 108 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 109 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(110), exports);


/***/ }),
/* 110 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 111 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 112 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 113 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(114), exports);
tslib_1.__exportStar(__webpack_require__(115), exports);
tslib_1.__exportStar(__webpack_require__(116), exports);
tslib_1.__exportStar(__webpack_require__(117), exports);
tslib_1.__exportStar(__webpack_require__(118), exports);
tslib_1.__exportStar(__webpack_require__(119), exports);
tslib_1.__exportStar(__webpack_require__(120), exports);
tslib_1.__exportStar(__webpack_require__(121), exports);
tslib_1.__exportStar(__webpack_require__(122), exports);
tslib_1.__exportStar(__webpack_require__(123), exports);
tslib_1.__exportStar(__webpack_require__(124), exports);
tslib_1.__exportStar(__webpack_require__(125), exports);
tslib_1.__exportStar(__webpack_require__(126), exports);
tslib_1.__exportStar(__webpack_require__(127), exports);


/***/ }),
/* 114 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 115 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 116 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 117 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 118 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 119 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 120 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 121 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 122 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 123 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 124 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 125 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 126 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 127 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 128 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.assertIsTypeKind = exports.ITypeKind = void 0;
const codegen_1 = __webpack_require__(88);
Object.defineProperty(exports, "ITypeKind", ({ enumerable: true, get: function () { return codegen_1.TypeKind; } }));
const assertIsTypeKind = (actual, expected) => {
    if (actual !== expected) {
        throw new Error('TypeKind does not match');
    }
};
exports.assertIsTypeKind = assertIsTypeKind;


/***/ }),
/* 129 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 130 */
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),
/* 131 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(132), exports);


/***/ }),
/* 132 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AntDesignTypeMapper = void 0;
const core_1 = __webpack_require__(86);
const parser_1 = __webpack_require__(133);
class AntDesignTypeMapper {
}
Object.defineProperty(AntDesignTypeMapper, "mapPrimitiveType", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (value) => {
        switch (value) {
            case 'boolean':
                return core_1.IPrimitiveTypeKind.Boolean;
            case 'string':
                return core_1.IPrimitiveTypeKind.String;
            case 'number':
                return core_1.IPrimitiveTypeKind.Number;
            case 'integer':
                return core_1.IPrimitiveTypeKind.Integer;
            default:
                throw new Error('Invalid value');
        }
    }
});
Object.defineProperty(AntDesignTypeMapper, "mapType", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (field) => {
        if ((0, parser_1.isEnumType)(field.type)) {
            return { kind: core_1.ITypeKind.EnumType };
        }
        if ((0, parser_1.isReactNodeType)(field.type)) {
            return { kind: core_1.ITypeKind.ReactNodeType };
        }
        if ((0, parser_1.isRenderPropType)(field.type)) {
            return { kind: core_1.ITypeKind.RenderPropType };
        }
        if ((0, parser_1.isUnionType)(field.type)) {
            return { kind: core_1.ITypeKind.UnionType };
        }
        if ((0, parser_1.isPrimitiveType)(field.type)) {
            return { kind: core_1.ITypeKind.PrimitiveType };
        }
        if ((0, parser_1.isActionType)(field.type)) {
            return { kind: core_1.ITypeKind.ActionType };
        }
        if ((0, parser_1.isInterfaceType)(field.type)) {
            return { kind: core_1.ITypeKind.InterfaceType };
        }
        console.log('Cannot map Ant Design type', field);
        return null;
    }
});
exports.AntDesignTypeMapper = AntDesignTypeMapper;


/***/ }),
/* 133 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(134), exports);
tslib_1.__exportStar(__webpack_require__(135), exports);
tslib_1.__exportStar(__webpack_require__(137), exports);


/***/ }),
/* 134 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderPropRegexes = exports.reactNodeTypeRegex = exports.interfaceTypeRegex = exports.stripBracketsRegex = exports.containsInterfaceTypeRegex = exports.primitiveTypesRegex = exports.unionTypeRegex = exports.functionTypeRegex = exports.es5FnReturnReactNode = exports.arrowFnReturnReactNode = void 0;
exports.arrowFnReturnReactNode = /^\(.+\).+=>.+ReactNode$/;
exports.es5FnReturnReactNode = /^function(.+): ReactNode$/;
/**
 * These are used to match for types we want to ignore for union types
 */
const arrayTypeRegex = /(\[.+\]|<.+>)/;
/**
 * Use non greedy for () matching
 *
 * (^function\(.*?\)) - function()
 * ((\(.*?\)) => [any|boolean]) - () => any
 */
exports.functionTypeRegex = 
// /(^function\(.*?\))|((\(.*?\)) => [any|boolean|void])/
/(^function\(.*?\))|((\(.*?\)) => \w)/;
// export const unionTypeRegex = /(function|=>|<|[?.;]|[[]])/
exports.unionTypeRegex = /\|/;
// export const skippedTypeRegex = new RegExp(
//   `/${arrayTypeRegex}|${functionTypeRegex}/`,
// )
exports.primitiveTypesRegex = /^(boolean|number|string|integer)$/;
exports.containsInterfaceTypeRegex = /\{.+\}/;
/**
 * {left?: ReactNode, right?: ReactNode}
 * ->
 * left?: ReactNode, right?: ReactNode
 *
 * (?:\{) - Non-capturing {
 * (.*)   - Match everything
 * (?:\}) - Non-capturing }
 */
exports.stripBracketsRegex = /(?:\{)(.*)(?:\})/;
/* *
 * Used for single items
 */
exports.interfaceTypeRegex = /^\{.+}$/;
/**
 * : ReactNode|HTMLElement
 * => ReactNode|HTMLElement
 * ReactNode
 */
exports.reactNodeTypeRegex = /(([:|=>] (ReactNode|HTMLElement))|ReactNode)/;
exports.renderPropRegexes = [exports.arrowFnReturnReactNode, exports.es5FnReturnReactNode];


/***/ }),
/* 135 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseSeparators = exports.extractObjectFromString = void 0;
const tslib_1 = __webpack_require__(1);
const utils_1 = __webpack_require__(35);
const merge_1 = tslib_1.__importDefault(__webpack_require__(136));
const matchers_1 = __webpack_require__(134);
/**
 * {left?: ReactNode, right?: ReactNode}
 * ->
 * left: ReactNode, right: ReactNode
 * @param object
 */
const extractObjectFromString = (object) => {
    var _a, _b;
    const objectWithoutBraces = (_a = object.match(matchers_1.stripBracketsRegex)) === null || _a === void 0 ? void 0 : _a[1];
    return ((_b = objectWithoutBraces === null || objectWithoutBraces === void 0 ? void 0 : objectWithoutBraces.split(',').map((keyValueStrings) => {
        const keyValueData = keyValueStrings
            // Split by key value colon
            .split(':')
            // Trim and replace optional types
            .map((val) => val.trim().replace('?', ''));
        const key = keyValueData[0];
        const value = keyValueData[1];
        return { [`${key}`]: value };
    }).reduce(merge_1.default)) !== null && _b !== void 0 ? _b : {});
};
exports.extractObjectFromString = extractObjectFromString;
/**
 * Convert type string to array of types
 *
 * "'error' | 'warning'" -> ['error', 'warning']
 */
const parseSeparators = (field) => {
    const processedField = (0, utils_1.stripQuotes)(field.type);
    return processedField.split('|').map((value) => value.trim());
};
exports.parseSeparators = parseSeparators;


/***/ }),
/* 136 */
/***/ ((module) => {

module.exports = require("lodash/merge");

/***/ }),
/* 137 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.unionContainsInterfaceType = exports.isInterfaceType = exports.isRenderPropType = exports.isActionType = exports.isReactNodeType = exports.isUnionType = exports.isEnumType = exports.isPrimitiveType = void 0;
const matchers_1 = __webpack_require__(134);
const isPrimitiveType = (fieldType) => {
    return matchers_1.primitiveTypesRegex.test(fieldType);
};
exports.isPrimitiveType = isPrimitiveType;
/**
 * Some enum fields in Ant Design docs don't have CODE block, but uses `'` instead, so we can't rely on `isEnum` anymore
 *
 * Input.status = 'error' | 'warning'
 *
 * Make sure it isn't an interface first, then check for `|`. Some interfaces have `|` in them
 *
 * @param field
 */
const isEnumType = (fieldType) => {
    if (matchers_1.interfaceTypeRegex.test(fieldType)) {
        return false;
    }
    return matchers_1.unionTypeRegex.test(fieldType);
};
exports.isEnumType = isEnumType;
const isUnionType = (fieldType) => {
    return matchers_1.unionTypeRegex.test(fieldType) && !matchers_1.interfaceTypeRegex.test(fieldType);
};
exports.isUnionType = isUnionType;
const isReactNodeType = (fieldType) => {
    return matchers_1.reactNodeTypeRegex.test(fieldType);
};
exports.isReactNodeType = isReactNodeType;
const isActionType = (fieldType) => {
    return matchers_1.functionTypeRegex.test(fieldType);
};
exports.isActionType = isActionType;
// ReactNode is also render props
const isRenderPropType = (fieldType) => {
    return matchers_1.renderPropRegexes.some((regex) => regex.test(fieldType));
};
exports.isRenderPropType = isRenderPropType;
const isInterfaceType = (fieldType) => {
    return matchers_1.interfaceTypeRegex.test(fieldType);
};
exports.isInterfaceType = isInterfaceType;
/**
 * See if `boolean | { loading: true }` contains a nested interface
 */
const unionContainsInterfaceType = (fieldType) => {
    // We use `||` since we only need 1 to have a nested interface
    return (matchers_1.containsInterfaceTypeRegex.test(fieldType) ||
        // We don't want to parse edge cases yet
        !matchers_1.functionTypeRegex.test(fieldType));
};
exports.unionContainsInterfaceType = unionContainsInterfaceType;


/***/ }),
/* 138 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(139), exports);


/***/ }),
/* 139 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypeSeederService = void 0;
const tslib_1 = __webpack_require__(1);
const type_1 = __webpack_require__(140);
class TypeSeederService {
    constructor() {
        Object.defineProperty(this, "fieldRepository", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new type_1.FieldRepository()
        });
    }
    seedFields(fields) {
        var _a, fields_1, fields_1_1;
        var _b, e_1, _c, _d;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                for (_a = true, fields_1 = tslib_1.__asyncValues(fields); fields_1_1 = yield fields_1.next(), _b = fields_1_1.done, !_b;) {
                    _d = fields_1_1.value;
                    _a = false;
                    try {
                        const field = _d;
                        yield this.fieldRepository.save(field, {
                            // Save by composite key
                            api: {
                                id: field.api.id,
                            },
                            key: field.key,
                        });
                    }
                    finally {
                        _a = true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_a && !_b && (_c = fields_1.return)) yield _c.call(fields_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
    /**
     * This way let's us
     */
    seedTypes(types, owner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield Promise.all(Object.values(types).map((type) => tslib_1.__awaiter(this, void 0, void 0, function* () { return yield type_1.TypeFactory.save(Object.assign(Object.assign({}, type), { owner }), { name: type.name }); })));
        });
    }
}
exports.TypeSeederService = TypeSeederService;


/***/ }),
/* 140 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(141), exports);
tslib_1.__exportStar(__webpack_require__(143), exports);
tslib_1.__exportStar(__webpack_require__(155), exports);


/***/ }),
/* 141 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(142), exports);


/***/ }),
/* 142 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypeFactory = void 0;
const tslib_1 = __webpack_require__(1);
const core_1 = __webpack_require__(86);
const model_1 = __webpack_require__(143);
const array_type_model_1 = __webpack_require__(146);
const repository_1 = __webpack_require__(155);
/**
 * Used for dynamic data when we don't know what type we are creating
 */
class TypeFactory {
    static save(type, where) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!type.__typename) {
                throw new Error('__typename must be provided');
            }
            /**
             * Type narrow using discriminated union
             */
            switch (type.__typename) {
                case core_1.ITypeKind.PrimitiveType: {
                    const primitiveType = new model_1.PrimitiveType(type);
                    return (yield new repository_1.PrimitiveTypeRepository().save(primitiveType, where));
                }
                case core_1.ITypeKind.EnumType: {
                    const enumType = new model_1.EnumType(type);
                    return (yield new repository_1.EnumTypeRepository().save(enumType, where));
                }
                case core_1.ITypeKind.InterfaceType: {
                    const interfaceType = new model_1.InterfaceType(type);
                    return (yield new repository_1.InterfaceTypeRepository().save(interfaceType, where));
                }
                case core_1.ITypeKind.ReactNodeType: {
                    const reactNodeType = new model_1.ReactNodeType(type);
                    return (yield new repository_1.ReactNodeTypeRepository().save(reactNodeType, where));
                }
                case core_1.ITypeKind.RenderPropType: {
                    const renderPropType = new model_1.RenderPropType(type);
                    return (yield new repository_1.RenderPropTypeRepository().save(renderPropType, where));
                }
                case core_1.ITypeKind.ActionType: {
                    const actionType = new model_1.ActionType(type);
                    return (yield new repository_1.ActionTypeRepository().save(actionType, where));
                }
                case core_1.ITypeKind.UnionType: {
                    const unionType = new model_1.UnionType(type);
                    return (yield new repository_1.UnionTypeRepository().save(unionType, where));
                }
                case core_1.ITypeKind.ArrayType: {
                    const arrayType = new array_type_model_1.ArrayType(type);
                    return (yield new repository_1.ArrayTypeRepository().save(arrayType, where));
                }
                default: {
                    console.log('Data:', type);
                    throw new Error('No type factory found');
                }
            }
        });
    }
}
exports.TypeFactory = TypeFactory;


/***/ }),
/* 143 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(144), exports);
tslib_1.__exportStar(__webpack_require__(146), exports);
tslib_1.__exportStar(__webpack_require__(147), exports);
tslib_1.__exportStar(__webpack_require__(148), exports);
tslib_1.__exportStar(__webpack_require__(149), exports);
tslib_1.__exportStar(__webpack_require__(151), exports);
tslib_1.__exportStar(__webpack_require__(152), exports);
tslib_1.__exportStar(__webpack_require__(153), exports);
tslib_1.__exportStar(__webpack_require__(154), exports);


/***/ }),
/* 144 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActionType = void 0;
const core_1 = __webpack_require__(86);
const base_type_model_1 = __webpack_require__(145);
class ActionType extends base_type_model_1.BaseType {
    constructor({ id, owner }) {
        super({ id, kind: core_1.ITypeKind.ActionType, name: core_1.ITypeKind.ActionType, owner });
    }
}
exports.ActionType = ActionType;


/***/ }),
/* 145 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseType = void 0;
class BaseType {
    constructor({ id, kind, name, owner }) {
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "kind", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "owner", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.id = id;
        this.name = name;
        this.kind = kind;
        this.owner = owner;
    }
    assertCreateFailed(data) {
        if (!data[0]) {
            throw new Error('Create failed');
        }
        return data[0];
    }
}
exports.BaseType = BaseType;


/***/ }),
/* 146 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArrayType = void 0;
const core_1 = __webpack_require__(86);
const base_type_model_1 = __webpack_require__(145);
class ArrayType extends base_type_model_1.BaseType {
    constructor({ id, itemType, name, owner }) {
        super({ id, kind: core_1.ITypeKind.ArrayType, name, owner });
        this.itemType = itemType;
    }
}
exports.ArrayType = ArrayType;


/***/ }),
/* 147 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EnumType = void 0;
const core_1 = __webpack_require__(86);
const utils_1 = __webpack_require__(35);
const base_type_model_1 = __webpack_require__(145);
class EnumType extends base_type_model_1.BaseType {
    constructor({ allowedValues, id, name, owner }) {
        super({ id, kind: core_1.ITypeKind.EnumType, name, owner });
        Object.defineProperty(this, "allowedValues", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.allowedValues = allowedValues;
    }
    static compositeName(atom, field) {
        return `${atom.name} ${(0, utils_1.compoundCaseToTitleCase)(field.key)} Enum`;
    }
}
exports.EnumType = EnumType;


/***/ }),
/* 148 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Field = void 0;
const utils_1 = __webpack_require__(35);
class Field {
    constructor({ api, defaultValues = null, description = null, fieldType, id, key, name = null, nextSibling = null, prevSibling = null, validationRules = null, }) {
        Object.defineProperty(this, "api", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "defaultValues", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "fieldType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "key", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "validationRules", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "nextSibling", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "prevSibling", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.api = { id: api.id };
        this.defaultValues = defaultValues;
        this.description = description;
        this.fieldType = { id: fieldType.id };
        this.id = id;
        this.key = key;
        this.name = name;
        this.validationRules = validationRules;
        this.nextSibling = nextSibling;
        this.prevSibling = prevSibling;
    }
    /**
     * Used to get composite key, fieldKey is
     */
    static compositeKey(apiName, fieldKey) {
        return `${apiName}-${fieldKey}`;
    }
    static create({ api, fieldType, id, key }) {
        return new Field({
            api,
            fieldType,
            id,
            key,
            name: (0, utils_1.compoundCaseToTitleCase)(key),
        });
    }
}
exports.Field = Field;


/***/ }),
/* 149 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InterfaceType = void 0;
const core_1 = __webpack_require__(86);
const uuid_1 = __webpack_require__(130);
const voca_1 = __webpack_require__(150);
const base_type_model_1 = __webpack_require__(145);
class InterfaceType extends base_type_model_1.BaseType {
    constructor({ fields, id, name, owner }) {
        super({ id, kind: core_1.ITypeKind.InterfaceType, name, owner });
        Object.defineProperty(this, "fields", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.fields = fields;
    }
    static getApiName({ name }, field) {
        return (field === null || field === void 0 ? void 0 : field.key) ? `${name} ${(0, voca_1.capitalize)(field.key)} API` : `${name} API`;
    }
    /**
     * Make create data from atom name
     */
    static createFromAtomName(name, owner) {
        return new InterfaceType({
            fields: [],
            id: (0, uuid_1.v4)(),
            kind: core_1.ITypeKind.InterfaceType,
            name: InterfaceType.getApiName({ name }),
            owner,
        });
    }
}
exports.InterfaceType = InterfaceType;


/***/ }),
/* 150 */
/***/ ((module) => {

module.exports = require("voca");

/***/ }),
/* 151 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrimitiveType = void 0;
const core_1 = __webpack_require__(86);
const base_type_model_1 = __webpack_require__(145);
class PrimitiveType extends base_type_model_1.BaseType {
    constructor({ id, name, owner, primitiveKind }) {
        super({
            id,
            kind: core_1.ITypeKind.PrimitiveType,
            name,
            owner,
        });
        Object.defineProperty(this, "__typename", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: core_1.ITypeKind.PrimitiveType
        });
        Object.defineProperty(this, "primitiveKind", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.primitiveKind = primitiveKind;
    }
}
exports.PrimitiveType = PrimitiveType;


/***/ }),
/* 152 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReactNodeType = void 0;
const core_1 = __webpack_require__(86);
const base_type_model_1 = __webpack_require__(145);
class ReactNodeType extends base_type_model_1.BaseType {
    constructor({ id, owner }) {
        super({
            id,
            kind: core_1.ITypeKind.ReactNodeType,
            name: core_1.ITypeKind.ReactNodeType,
            owner,
        });
    }
}
exports.ReactNodeType = ReactNodeType;


/***/ }),
/* 153 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RenderPropType = void 0;
const core_1 = __webpack_require__(86);
const base_type_model_1 = __webpack_require__(145);
class RenderPropType extends base_type_model_1.BaseType {
    constructor({ id, owner }) {
        super({
            id,
            kind: core_1.ITypeKind.RenderPropType,
            name: core_1.ITypeKind.RenderPropType,
            owner,
        });
    }
}
exports.RenderPropType = RenderPropType;


/***/ }),
/* 154 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UnionType = void 0;
const core_1 = __webpack_require__(86);
const utils_1 = __webpack_require__(35);
const base_type_model_1 = __webpack_require__(145);
class UnionType extends base_type_model_1.BaseType {
    constructor({ id, name, owner, typesOfUnionType }) {
        super({ id, kind: core_1.ITypeKind.UnionType, name, owner });
        Object.defineProperty(this, "typesOfUnionType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.typesOfUnionType = typesOfUnionType;
    }
    static compositeName(atom, field) {
        return `${atom.name} ${(0, utils_1.compoundCaseToTitleCase)(field.key)} Union API`;
    }
}
exports.UnionType = UnionType;


/***/ }),
/* 155 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(156), exports);
tslib_1.__exportStar(__webpack_require__(298), exports);
tslib_1.__exportStar(__webpack_require__(299), exports);
tslib_1.__exportStar(__webpack_require__(300), exports);
tslib_1.__exportStar(__webpack_require__(301), exports);
tslib_1.__exportStar(__webpack_require__(302), exports);
tslib_1.__exportStar(__webpack_require__(303), exports);
tslib_1.__exportStar(__webpack_require__(304), exports);
tslib_1.__exportStar(__webpack_require__(305), exports);


/***/ }),
/* 156 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActionTypeRepository = void 0;
const tslib_1 = __webpack_require__(1);
const neo4j_1 = __webpack_require__(157);
const core_1 = __webpack_require__(287);
const mapper_1 = __webpack_require__(289);
class ActionTypeRepository extends core_1.AbstractRepository {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "ActionType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: neo4j_1.Repository.instance.ActionType
        });
    }
    _find(where) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield (yield this.ActionType).find({
                selectionSet: neo4j_1.exportActionTypeSelectionSet,
                where,
            });
        });
    }
    _add(actionTypes) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.ActionType).create({
                input: actionTypes.map((_a) => {
                    var { __typename, owner } = _a, actionType = tslib_1.__rest(_a, ["__typename", "owner"]);
                    return (Object.assign(Object.assign({}, actionType), { owner: (0, mapper_1.connectAuth0Owner)(owner) }));
                }),
                selectionSet: `{ actionTypes ${neo4j_1.exportActionTypeSelectionSet} }`,
            })).actionTypes;
        });
    }
    _update(_a, where) {
        var { __typename, id, name, owner } = _a, actionType = tslib_1.__rest(_a, ["__typename", "id", "name", "owner"]);
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.ActionType).update({
                selectionSet: `{ actionTypes ${neo4j_1.exportActionTypeSelectionSet} }`,
                update: { name },
                where,
            })).actionTypes[0];
        });
    }
}
exports.ActionTypeRepository = ActionTypeRepository;


/***/ }),
/* 157 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(158), exports);
tslib_1.__exportStar(__webpack_require__(174), exports);
tslib_1.__exportStar(__webpack_require__(177), exports);
tslib_1.__exportStar(__webpack_require__(205), exports);
tslib_1.__exportStar(__webpack_require__(259), exports);
tslib_1.__exportStar(__webpack_require__(241), exports);


/***/ }),
/* 158 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(159), exports);
tslib_1.__exportStar(__webpack_require__(161), exports);
tslib_1.__exportStar(__webpack_require__(164), exports);
tslib_1.__exportStar(__webpack_require__(168), exports);


/***/ }),
/* 159 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDescendantComponentIds = void 0;
const tslib_1 = __webpack_require__(1);
const getDescendantComponentIds_cypher_1 = tslib_1.__importDefault(__webpack_require__(160));
exports.getDescendantComponentIds = getDescendantComponentIds_cypher_1.default;


/***/ }),
/* 160 */
/***/ ((module) => {

module.exports = "CALL apoc.path.subgraphAll(\n  this,\n  {\n    relationshipFilter: 'COMPONENT_ROOT|<TREE_FIRST_CHILD|<NODE_SIBLING|RENDER_COMPONENT_TYPE'\n  }\n) YIELD nodes AS descendants\n\nUNWIND descendants AS descendant\n  WITH descendant\n    WHERE 'Component' IN LABELS(descendant)\n\nRETURN collect(DISTINCT descendant.id)\n";

/***/ }),
/* 161 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDescendantsCypher = exports.duplicateElement = void 0;
const tslib_1 = __webpack_require__(1);
const duplicateElement_cypher_1 = tslib_1.__importDefault(__webpack_require__(162));
exports.duplicateElement = duplicateElement_cypher_1.default;
const getDescendants_cypher_1 = tslib_1.__importDefault(__webpack_require__(163));
exports.getDescendantsCypher = getDescendants_cypher_1.default;


/***/ }),
/* 162 */
/***/ ((module) => {

module.exports = "MATCH (parentNode:Element)-[rootLink:PARENT_OF_ELEMENT]->(element:Element {id: $elementId})\n\nCALL apoc.path.subgraphAll(\n    element,\n    { relationshipFilter: 'PARENT_OF_ELEMENT>|PROPS_OF_ELEMENT>|HOOKS_OF_ELEMENT>|RENDER_ATOM_TYPE>' }\n) YIELD nodes, relationships\n\nCALL apoc.refactor.cloneSubgraph(\n    nodes + [parentNode],\n    relationships + [rootLink],\n    {\n        skipProperties:['id'],\n        standinNodes:[[parentNode,parentNode]]\n    }\n) YIELD input, output as createdNode, error\n\nSET createdNode.id = apoc.create.uuid()\n\nRETURN collect(createdNode.id) as ids\n";

/***/ }),
/* 163 */
/***/ ((module) => {

module.exports = "MATCH (rootElement: Element {id: $rootId})\nOPTIONAL MATCH (firstChild: Element)-[:TREE_FIRST_CHILD]->(rootElement)\n\n// For root Element, we get all descendants\nCALL apoc.path.subgraphAll(\n  firstChild,\n  { relationshipFilter: '<TREE_FIRST_CHILD|<NODE_SIBLING|RENDER_COMPONENT_TYPE>' }\n) YIELD nodes AS descendants\n\n// Get isRoot by checking if parent exists\n// CALL {\n//   WITH element\n//   RETURN NOT exists( (:Tag)-[:CHILDREN]->(tag:Tag { id: tag.id }) ) as has_no_parent\n// }\n\n// Need to filter out root node\nRETURN [node IN descendants WHERE node.id <> rootElement.id], rootElement {.*}\n";

/***/ }),
/* 164 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tagIsRoot = exports.tagDescendants = exports.getTagGraphs = void 0;
const tslib_1 = __webpack_require__(1);
const getTagGraphs_cypher_1 = tslib_1.__importDefault(__webpack_require__(165));
exports.getTagGraphs = getTagGraphs_cypher_1.default;
const tagDescendants_cypher_1 = tslib_1.__importDefault(__webpack_require__(166));
exports.tagDescendants = tagDescendants_cypher_1.default;
const tagIsRoot_cypher_1 = tslib_1.__importDefault(__webpack_require__(167));
exports.tagIsRoot = tagIsRoot_cypher_1.default;


/***/ }),
/* 165 */
/***/ ((module) => {

module.exports = "MATCH (tags:Tag)\n\nUNWIND tags AS tag\n\n// For each Tag, we get all descendants\nCALL apoc.path.subgraphAll(\n  tag,\n  { relationshipFilter: '>CHILDREN' }\n) YIELD nodes AS descendants\n\n// Get isRoot by checking if parent exists\nCALL {\n  WITH tag\n  RETURN NOT exists( (:Tag)-[:CHILDREN]->(tag:Tag {id: tag.id}) ) as has_no_parent\n}\n\n// Need to filter out root node by getting disjunction\nRETURN tag {.*, isRoot: has_no_parent },\n  apoc.coll.disjunction(\n    [node IN descendants | node.id],\n    [tag.id]\n  )\n";

/***/ }),
/* 166 */
/***/ ((module) => {

module.exports = "Match (tag:Tag {id: $rootId})\n\n// For root Element, we get all descendants\nCALL apoc.path.subgraphAll(\n  tag,\n  { relationshipFilter: '>CHILDREN' }\n) YIELD nodes AS descendants\n\n// Need to filter out root node\nRETURN [node IN descendants WHERE node.id <> tag.id], tag {.*}\n";

/***/ }),
/* 167 */
/***/ ((module) => {

module.exports = "RETURN NOT exists((:Tag)-[:CHILDREN]->({ id: $this.id }))\n";

/***/ }),
/* 168 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isTypeDescendantOf = exports.getTypeReferences = exports.getTypeDescendantsOGM = exports.getTypeDescendants = exports.getBaseTypes = void 0;
const tslib_1 = __webpack_require__(1);
const getBaseTypes_cypher_1 = tslib_1.__importDefault(__webpack_require__(169));
exports.getBaseTypes = getBaseTypes_cypher_1.default;
const getTypeDescendants_cypher_1 = tslib_1.__importDefault(__webpack_require__(170));
exports.getTypeDescendants = getTypeDescendants_cypher_1.default;
const getTypeDescendantsOGM_cypher_1 = tslib_1.__importDefault(__webpack_require__(171));
exports.getTypeDescendantsOGM = getTypeDescendantsOGM_cypher_1.default;
const getTypeReferences_cypher_1 = tslib_1.__importDefault(__webpack_require__(172));
exports.getTypeReferences = getTypeReferences_cypher_1.default;
const isTypeDescendantOf_cypher_1 = tslib_1.__importDefault(__webpack_require__(173));
exports.isTypeDescendantOf = isTypeDescendantOf_cypher_1.default;


/***/ }),
/* 169 */
/***/ ((module) => {

module.exports = "WITH '(?i).*' + $name + '.*' AS name\n\nMATCH (type:Type)\nWHERE type.name =~ name\nWITH name, count(type) as totalCount\n\nMATCH (type:Type)-[:OWNED_BY]-(owner:User)\nWHERE type.name =~ name\nRETURN type, owner, totalCount\n\nORDER by type.name\nSKIP $skip\nLIMIT $limit\n";

/***/ }),
/* 170 */
/***/ ((module) => {

module.exports = "//\n// Different parameters are injected based on the context.\n//\n// - `this` is used in graphql @cypher context\n// - `$this` is used in JS session driver context\n//\n// coalesce() returns the first non-null value\n//\n// https://neo4j.com/labs/apoc/4.0/graph-querying/expand-subgraph/#expand-subgraph-relationship-filters\n//\n// >FIELD_TYPE is so we can get the end node of the field\nCALL apoc.path.subgraphAll(\n  this,\n  {\n    relationshipFilter: '>ARRAY_ITEM_TYPE|>UNION_TYPE_CHILD|>INTERFACE_FIELD|>FIELD_TYPE',\n    labelFilter: '>Type|>Field'\n  }\n) YIELD nodes\n\nRETURN [node in nodes | node.id]\n";

/***/ }),
/* 171 */
/***/ ((module) => {

module.exports = "//\n// Different parameters are injected based on the context.\n//\n// - `this` is used in graphql @cypher context\n// - `$this` is used in JS session driver context\n//\n// coalesce() returns the first non-null value\n//\n\nMATCH (type:InterfaceType {id: $id})\n\nCALL apoc.path.subgraphAll(\n  type,\n  {\n    relationshipFilter: '>ARRAY_ITEM_TYPE|>UNION_TYPE_CHILD|>INTERFACE_FIELD|>FIELD_TYPE',\n    labelFilter: '>TYPE|>FIELD'\n  }\n) YIELD nodes\n\nRETURN [node in nodes | { id: node.id, kind: node.kind, name: node.name }]\n";

/***/ }),
/* 172 */
/***/ ((module) => {

module.exports = "MATCH (this {id: $typeId })<-[:ARRAY_ITEM_TYPE|INTERFACE_FIELD|UNION_TYPE_CHILD|ATOM_API]-(t)\nRETURN {name: t.name, label: labels(t)[0]}\n";

/***/ }),
/* 173 */
/***/ ((module) => {

module.exports = "MATCH\n  (parentType {id: $parentTypeId})-[r:ARRAY_ITEM_TYPE|UNION_TYPE_CHILD|INTERFACE_FIELD*0..]->\n  (descendantType {id: $descendantTypeId})\n  WHERE labels(descendantType)[0] ENDS WITH 'Type'\n\nRETURN count(descendantType) > 0 as isDescendant\n";

/***/ }),
/* 174 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(175), exports);


/***/ }),
/* 175 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultDirectives = void 0;
// Directives taken from the neo4j docs and the generated sdql schema
const client_1 = __webpack_require__(176);
// Adding them here helps ide autocompletion and error checking for gql segments
exports.defaultDirectives = (0, client_1.gql) `
  """
  Informs @neo4j/graphql of node metadata
  """
  directive @node(
    """
    Map the GraphQL type to a custom Neo4j node label
    """
    label: String
    """
    Map the GraphQL type to match additional Neo4j node labels
    """
    labels: [String]
  ) on OBJECT

  """
  Instructs @neo4j/graphql to invoke the specified callback function when updating or creating the properties on a node or relationship.
  """
  enum CallbackOperation {
    CREATE
    UPDATE
  }

  directive @callback(
    """
    Which events to invoke the callback on.
    """
    operations: [CallbackOperation!]! = [CREATE, UPDATE]
    """
    The name of the callback function.
    """
    name: String!
  ) on FIELD_DEFINITION

  """
  Indicates that the field is an identifier for the object type. By default; autogenerated, and has a unique node property constraint in the database.
  """
  directive @id(
    autogenerate: Boolean! = true
    unique: Boolean! = true
  ) on FIELD_DEFINITION

  enum TimestampOperation {
    CREATE
    UPDATE
  }

  """
  Instructs @neo4j/graphql to generate timestamps on particular events, which will be available as the value of the specified field.
  """
  directive @timestamp(
    """
    Which events to generate timestamps on. Defaults to both create and update.
    """
    operations: [TimestampOperation!]! = [CREATE, UPDATE]
  ) on FIELD_DEFINITION

  """
  Instructs @neo4j/graphql to run the specified Cypher statement in order to resolve the value of the field to which the directive is applied.
  """
  directive @cypher(
    """
    The Cypher statement to run which returns a value of the same type composition as the field definition on which the directive is applied.
    """
    statement: String!
  ) on FIELD_DEFINITION

  """
  Instructs @neo4j/graphql to only include a field in generated input type for creating, and in the object type within which the directive is applied.
  """
  directive @readonly on FIELD_DEFINITION

  enum ExcludeOperation {
    CREATE
    READ
    UPDATE
    DELETE
  }

  """
  Instructs @neo4j/graphql to exclude the specified operations from query and mutation generation. If used without an argument, no queries or mutations will be generated for this type.
  """
  directive @exclude(
    operations: [ExcludeOperation!]! = [CREATE, READ, UPDATE, DELETE]
  ) on OBJECT

  """
  Int | Float | String | Boolean | ID | DateTime
  """
  scalar Scalar

  """
  Instructs @neo4j/graphql to set the specified value as the default value in the CreateInput type for the object type in which this directive is used.
  """
  directive @default(
    """
    The default value to use. Must be a scalar type and must match the type of the field with which this directive decorates.
    """
    value: Scalar!
  ) on FIELD_DEFINITION

  """
  Informs @neo4j/graphql that there should be a uniqueness constraint in the database for the decorated field.
  """
  directive @unique(
    """
    The name which should be used for this constraint. By default; type name, followed by an underscore, followed by the field name.
    """
    constraintName: String
  ) on FIELD_DEFINITION

  enum DIRECTION {
    IN
    OUT
  }

  directive @relationship(
    type: String
    properties: String
    direction: DIRECTION
  ) on FIELD_DEFINITION
`;


/***/ }),
/* 176 */
/***/ ((module) => {

module.exports = require("@apollo/client");

/***/ }),
/* 177 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(178), exports);
tslib_1.__exportStar(__webpack_require__(199), exports);
tslib_1.__exportStar(__webpack_require__(204), exports);
tslib_1.__exportStar(__webpack_require__(285), exports);
tslib_1.__exportStar(__webpack_require__(286), exports);


/***/ }),
/* 178 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDriver = void 0;
const tslib_1 = __webpack_require__(1);
const config_1 = __webpack_require__(179);
const neo4j_driver_1 = tslib_1.__importDefault(__webpack_require__(198));
const defaultOptions = () => ({
    password: (0, config_1.getEnv)().neo4j.password,
    uri: (0, config_1.getEnv)().neo4j.uri,
    username: (0, config_1.getEnv)().neo4j.user,
});
// Keep a single driver instance if possible
let driver;
const getDriver = () => {
    const { password, uri, username } = defaultOptions();
    return (driver !== null && driver !== void 0 ? driver : (driver = neo4j_driver_1.default.driver(uri, neo4j_driver_1.default.auth.basic(username, password))));
};
exports.getDriver = getDriver;


/***/ }),
/* 179 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(180), exports);
tslib_1.__exportStar(__webpack_require__(183), exports);


/***/ }),
/* 180 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(181), exports);


/***/ }),
/* 181 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.reactAtoms = exports.codelabAtoms = exports.htmlAtoms = exports.antdAtoms = void 0;
const core_1 = __webpack_require__(86);
const object_typed_1 = __webpack_require__(182);
const getAtomTypes = (prefix) => object_typed_1.ObjectTyped.entries(core_1.IAtomType)
    .filter(([keys, values]) => keys.includes(prefix))
    .map(([keys, values]) => values);
exports.antdAtoms = getAtomTypes('AntDesign');
exports.htmlAtoms = getAtomTypes('Html');
exports.codelabAtoms = getAtomTypes('Codelab');
exports.reactAtoms = getAtomTypes('React');


/***/ }),
/* 182 */
/***/ ((module) => {

module.exports = require("object-typed");

/***/ }),
/* 183 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(184), exports);
tslib_1.__exportStar(__webpack_require__(197), exports);


/***/ }),
/* 184 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getEnv = void 0;
const auth0_1 = __webpack_require__(185);
const circleci_1 = __webpack_require__(187);
const google_analytics_1 = __webpack_require__(188);
const graphql_1 = __webpack_require__(189);
const hotjar_1 = __webpack_require__(190);
const intercom_1 = __webpack_require__(191);
const mailchimp_1 = __webpack_require__(192);
const neo4j_1 = __webpack_require__(193);
const node_1 = __webpack_require__(194);
const supabase_1 = __webpack_require__(195);
const vercel_1 = __webpack_require__(196);
class EnvironmentVariables {
    constructor() {
        Object.defineProperty(this, "_mailchimp", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
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
        Object.defineProperty(this, "_neo4j", {
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
        Object.defineProperty(this, "_vercel", {
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
        Object.defineProperty(this, "_graphql", {
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
    get mailchimp() {
        var _a;
        return ((_a = this._mailchimp) !== null && _a !== void 0 ? _a : (this._mailchimp = new mailchimp_1.MailchimpEnvVars()));
    }
    get auth0() {
        var _a;
        return ((_a = this._auth0) !== null && _a !== void 0 ? _a : (this._auth0 = new auth0_1.Auth0EnvVars(this.graphql)));
    }
    get circleci() {
        var _a;
        return ((_a = this._circleci) !== null && _a !== void 0 ? _a : (this._circleci = new circleci_1.CircleCIEnvVars()));
    }
    get googleAnalytics() {
        var _a;
        return ((_a = this._googleAnalytics) !== null && _a !== void 0 ? _a : (this._googleAnalytics = new google_analytics_1.GoogleAnalyticsEnvVars()));
    }
    get hotjar() {
        var _a;
        return ((_a = this._hotjar) !== null && _a !== void 0 ? _a : (this._hotjar = new hotjar_1.HotjarEnvVars()));
    }
    get intercom() {
        var _a;
        return ((_a = this._intercom) !== null && _a !== void 0 ? _a : (this._intercom = new intercom_1.IntercomEnvVars()));
    }
    get neo4j() {
        var _a;
        return ((_a = this._neo4j) !== null && _a !== void 0 ? _a : (this._neo4j = new neo4j_1.Neo4jEnvVars()));
    }
    get supabase() {
        var _a;
        return ((_a = this._supabase) !== null && _a !== void 0 ? _a : (this._supabase = new supabase_1.SupabaseEnvVars()));
    }
    get vercel() {
        var _a;
        return ((_a = this._vercel) !== null && _a !== void 0 ? _a : (this._vercel = new vercel_1.VercelEnvVars()));
    }
    get node() {
        var _a;
        return ((_a = this._node) !== null && _a !== void 0 ? _a : (this._node = new node_1.NodeEnvVars()));
    }
    get graphql() {
        var _a;
        return ((_a = this._graphql) !== null && _a !== void 0 ? _a : (this._graphql = new graphql_1.GraphQLEnvVars(this.vercel)));
    }
}
const getEnv = () => EnvironmentVariables.getInstance();
exports.getEnv = getEnv;


/***/ }),
/* 185 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Auth0EnvVars = void 0;
const tslib_1 = __webpack_require__(1);
/* eslint-disable @typescript-eslint/member-ordering */
const env = tslib_1.__importStar(__webpack_require__(186));
/* *
 * https://github.com/auth0/nextjs-auth0/issues/383
 *
 * `isVercel` is runtime
 * `isVercelPreview` is build-time
 */
class Auth0EnvVars {
    constructor(graphql) {
        Object.defineProperty(this, "graphql", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: graphql
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
        Object.defineProperty(this, "_audience", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    get clientId() {
        var _a;
        return ((_a = this._clientId) !== null && _a !== void 0 ? _a : (this._clientId = env.get('AUTH0_CLIENT_ID').required().asString()));
    }
    get clientSecret() {
        var _a;
        return ((_a = this._clientSecret) !== null && _a !== void 0 ? _a : (this._clientSecret = env
            .get('AUTH0_CLIENT_SECRET')
            .required()
            .asString()));
    }
    get cypressUsername() {
        var _a;
        return ((_a = this._cypressUsername) !== null && _a !== void 0 ? _a : (this._cypressUsername = env
            .get('AUTH0_CYPRESS_USERNAME')
            .required()
            .asString()));
    }
    get cypressPassword() {
        var _a;
        return ((_a = this._cypressPassword) !== null && _a !== void 0 ? _a : (this._cypressPassword = env
            .get('AUTH0_CYPRESS_PASSWORD')
            .required()
            .asString()));
    }
    get issuerBaseUrl() {
        var _a;
        return ((_a = this._issuerBaseUrl) !== null && _a !== void 0 ? _a : (this._issuerBaseUrl = env
            .get('AUTH0_ISSUER_BASE_URL')
            .required()
            .asString()));
    }
    get secret() {
        var _a;
        return ((_a = this._secret) !== null && _a !== void 0 ? _a : (this._secret = env.get('AUTH0_SECRET').required().asString()));
    }
    get audience() {
        var _a;
        return ((_a = this._audience) !== null && _a !== void 0 ? _a : (this._audience = env.get('AUTH0_AUDIENCE').required().asString()));
    }
    get baseUrl() {
        const auth0baseUrl = this.graphql.nextPublicPlatformHost;
        const protocol = this.graphql.isLocal ? 'http' : 'https';
        const baseUrl = `${protocol}://${auth0baseUrl}`;
        return baseUrl;
    }
}
exports.Auth0EnvVars = Auth0EnvVars;


/***/ }),
/* 186 */
/***/ ((module) => {

module.exports = require("env-var");

/***/ }),
/* 187 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CircleCIEnvVars = void 0;
const tslib_1 = __webpack_require__(1);
const env = tslib_1.__importStar(__webpack_require__(186));
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
        var _a;
        return ((_a = this._ci) !== null && _a !== void 0 ? _a : (this._ci = env.get('CI').default('false').asBool()));
    }
    get circleCi() {
        var _a;
        return ((_a = this._circleCi) !== null && _a !== void 0 ? _a : (this._circleCi = env.get('CIRCLE').default('false').asBool()));
    }
}
exports.CircleCIEnvVars = CircleCIEnvVars;


/***/ }),
/* 188 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleAnalyticsEnvVars = void 0;
const tslib_1 = __webpack_require__(1);
const env = tslib_1.__importStar(__webpack_require__(186));
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
exports.GoogleAnalyticsEnvVars = GoogleAnalyticsEnvVars;


/***/ }),
/* 189 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GraphQLEnvVars = void 0;
class GraphQLEnvVars {
    constructor(vercel) {
        Object.defineProperty(this, "vercel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: vercel
        });
        Object.defineProperty(this, "_nextPublicPlatformHost", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    get isLocal() {
        return this.nextPublicPlatformHost.includes('127.0.0.1');
    }
    /**
     * This is used before module is initialized, so we must access process.env
     */
    get nextPublicPlatformHost() {
        const nextPublicPlatformHost = process.env['NEXT_PUBLIC_PLATFORM_HOST'];
        if (!nextPublicPlatformHost) {
            throw new Error('Missing "NEXT_PUBLIC_PLATFORM_HOST"');
        }
        return nextPublicPlatformHost;
        // return (this._nextPublicPlatformHost ??= env
        //   .get('NEXT_PUBLIC_PLATFORM_HOST')
        //   .required()
        //   .asString())
    }
    get graphqlApiHost() {
        if (this.vercel.isVercelPreview) {
            const url = this.vercel.nextPublicVercelUrl;
            if (!url) {
                throw new Error('Invalid Vercel url');
            }
            return url;
        }
        return this.nextPublicPlatformHost;
    }
    get graphqlApiOrigin() {
        return `${this.protocol}://${this.graphqlApiHost}/api/graphql`;
    }
    get protocol() {
        return this.isLocal ? 'http' : 'https';
    }
}
exports.GraphQLEnvVars = GraphQLEnvVars;


/***/ }),
/* 190 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HotjarEnvVars = void 0;
const tslib_1 = __webpack_require__(1);
const env = tslib_1.__importStar(__webpack_require__(186));
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
exports.HotjarEnvVars = HotjarEnvVars;


/***/ }),
/* 191 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IntercomEnvVars = void 0;
const tslib_1 = __webpack_require__(1);
const env = tslib_1.__importStar(__webpack_require__(186));
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
exports.IntercomEnvVars = IntercomEnvVars;


/***/ }),
/* 192 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MailchimpEnvVars = void 0;
const tslib_1 = __webpack_require__(1);
const env = tslib_1.__importStar(__webpack_require__(186));
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
        console.log(process.env['MAILCHIMP_API_KEY']);
        this.apiKey = env.get('MAILCHIMP_API_KEY').required().asString();
        this.listId = env.get('MAILCHIMP_LIST_ID').required().asString();
        this.serverPrefix = env.get('MAILCHIMP_SERVER_PREFIX').required().asString();
    }
}
exports.MailchimpEnvVars = MailchimpEnvVars;


/***/ }),
/* 193 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Neo4jEnvVars = void 0;
const tslib_1 = __webpack_require__(1);
const env = tslib_1.__importStar(__webpack_require__(186));
class Neo4jEnvVars {
    constructor() {
        Object.defineProperty(this, "password", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "uri", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "user", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.password = env.get('NEO4J_PASSWORD').required().asString();
        this.uri = env.get('NEO4J_URI').required().asUrlString();
        this.user = env.get('NEO4J_USER').required().asString();
    }
}
exports.Neo4jEnvVars = Neo4jEnvVars;


/***/ }),
/* 194 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NodeEnvVars = void 0;
class NodeEnvVars {
    constructor() {
        Object.defineProperty(this, "_nodeEnv", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    get nodeEnv() {
        var _a;
        return ((_a = this._nodeEnv) !== null && _a !== void 0 ? _a : (this._nodeEnv = process.env['NODE_ENV']));
        // return (this._nodeEnv ??= env
        //   .get('NODE_ENV')
        //   .default('development')
        //   .asEnum(['development', 'production', 'test']))
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
}
exports.NodeEnvVars = NodeEnvVars;


/***/ }),
/* 195 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SupabaseEnvVars = void 0;
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
exports.SupabaseEnvVars = SupabaseEnvVars;


/***/ }),
/* 196 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VercelEnvVars = void 0;
const tslib_1 = __webpack_require__(1);
const env = tslib_1.__importStar(__webpack_require__(186));
class VercelEnvVars {
    constructor() {
        Object.defineProperty(this, "_vercelAccessToken", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_vercelProjectId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_vercelTeamId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_vercelEnv", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_nextPublicVercelEnv", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_nextPublicVercelUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_vercel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "apiUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'https://api.vercel.com'
        });
    }
    get vercelAccessToken() {
        var _a;
        return ((_a = this._vercelAccessToken) !== null && _a !== void 0 ? _a : (this._vercelAccessToken = env
            .get('VERCEL_ACCESS_TOKEN')
            .required()
            .asString()));
    }
    get vercelProjectId() {
        var _a;
        return ((_a = this._vercelProjectId) !== null && _a !== void 0 ? _a : (this._vercelProjectId = env
            .get('VERCEL_PROJECT_ID')
            .required()
            .asString()));
    }
    get vercelTeamId() {
        var _a;
        return ((_a = this._vercelTeamId) !== null && _a !== void 0 ? _a : (this._vercelTeamId = env
            .get('VERCEL_TEAM_ID')
            .required()
            .asString()));
    }
    get vercelEnv() {
        var _a;
        return ((_a = this._vercelEnv) !== null && _a !== void 0 ? _a : (this._vercelEnv = env
            .get('VERCEL_ENV')
            .asEnum(['development', 'preview', 'production'])));
    }
    get nextPublicVercelEnv() {
        var _a;
        return ((_a = this._nextPublicVercelEnv) !== null && _a !== void 0 ? _a : (this._nextPublicVercelEnv = env
            .get('NEXT_PUBLIC_VERCEL_ENV')
            .asEnum(['development', 'preview', 'production'])));
    }
    get nextPublicVercelUrl() {
        var _a;
        return ((_a = this._nextPublicVercelUrl) !== null && _a !== void 0 ? _a : (this._nextPublicVercelUrl = env
            .get('NEXT_PUBLIC_VERCEL_URL')
            .asString()));
    }
    get vercel() {
        var _a;
        return ((_a = this._vercel) !== null && _a !== void 0 ? _a : (this._vercel = env.get('VERCEL').default('false').asBool()));
    }
    projectApiUrl(apiVer = '9') {
        return `${this.apiUrl}/v${apiVer}/projects/${this.vercelProjectId}`;
    }
    getBaseHeaders() {
        return {
            Authorization: `Bearer ${this.vercelAccessToken}`,
            'Content-Type': 'application/json',
        };
    }
    get teamIdParam() {
        return `teamId=${this.vercelTeamId}`;
    }
    domainApiUrl(apiVer = '6') {
        return `${this.apiUrl}/v${apiVer}/domains`;
    }
    get isVercel() {
        return this.vercel || Boolean(this.nextPublicVercelEnv);
    }
    /**
     * Should be true only for preview environment, not for production
     */
    get isVercelPreview() {
        return (this.vercelEnv === 'preview' || this.nextPublicVercelEnv === 'preview');
    }
    get isProduction() {
        return (this.vercelEnv === 'production' ||
            this.nextPublicVercelEnv === 'production');
    }
}
exports.VercelEnvVars = VercelEnvVars;


/***/ }),
/* 197 */
/***/ ((__unused_webpack_module, exports) => {


/* eslint-disable canonical/sort-keys */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ENV_VARS = void 0;
exports.ENV_VARS = {
    VERCEL_ENV: 'VERCEL_ENV',
    NEXT_PUBLIC_VERCEL_ENV: 'NEXT_PUBLIC_VERCEL_ENV',
    NEXT_PUBLIC_PLATFORM_HOST: 'NEXT_PUBLIC_PLATFORM_HOST',
    // Auth0
    AUTH0_AUDIENCE: 'AUTH0_AUDIENCE',
    AUTH0_ISSUER_BASE_URL: 'AUTH0_ISSUER_BASE_URL',
    AUTH0_CLIENT_ID: 'AUTH0_CLIENT_ID',
    AUTH0_CLIENT_SECRET: 'AUTH0_CLIENT_SECRET',
    AUTH0_SECRET: 'AUTH0_SECRET',
    // Auth0 user
    AUTH0_CYPRESS_USERNAME: 'AUTH0_CYPRESS_USERNAME',
    AUTH0_CYPRESS_PASSWORD: 'AUTH0_CYPRESS_PASSWORD',
    // CI
    CI: 'CI',
    // System
    NODE_ENV: 'NODE_ENV',
};


/***/ }),
/* 198 */
/***/ ((module) => {

module.exports = require("neo4j-driver");

/***/ }),
/* 199 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateOgmTypes = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_ogm_1 = __webpack_require__(200);
const fs = tslib_1.__importStar(__webpack_require__(201));
const path = tslib_1.__importStar(__webpack_require__(202));
const prettier = tslib_1.__importStar(__webpack_require__(203));
const ogm_1 = __webpack_require__(204);
const generateOgmTypes = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const outFile = path.resolve(process.cwd(), 'libs/backend/abstract/codegen', 'src/ogm-types.gen.ts');
    const output = yield (0, graphql_ogm_1.generate)({
        noWrite: true,
        ogm: yield (0, ogm_1.getOgm)(),
        outFile,
    })
        .then((data) => {
        console.info('OGM type generated!');
        return data;
    })
        .catch((error) => console.error(`[generateOgmTypes] ${JSON.stringify(error, null, 2)}`));
    // Get prettier config
    const options = yield prettier.resolveConfig(outFile);
    // Format
    const formatted = prettier.format(`${output}`, Object.assign(Object.assign({}, options), { filepath: outFile }));
    /**
     * Save to abstract folder as well for exporting just the interfaces
     */
    fs.writeFileSync(outFile, formatted);
});
exports.generateOgmTypes = generateOgmTypes;


/***/ }),
/* 200 */
/***/ ((module) => {

module.exports = require("@neo4j/graphql-ogm");

/***/ }),
/* 201 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 202 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 203 */
/***/ ((module) => {

module.exports = require("prettier");

/***/ }),
/* 204 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getOgm = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_ogm_1 = __webpack_require__(200);
const resolver_1 = __webpack_require__(205);
const schema_1 = __webpack_require__(259);
const driver_1 = __webpack_require__(178);
// Keep a single OGM instance
let ogm;
const getOgm = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (!ogm) {
        ogm = new graphql_ogm_1.OGM({
            config: {
                enableRegex: true,
            },
            driver: (0, driver_1.getDriver)(),
            resolvers: resolver_1.pureResolvers,
            typeDefs: schema_1.typeDefs,
        });
    }
    yield ogm.init();
    return ogm;
});
exports.getOgm = getOgm;


/***/ }),
/* 205 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(206), exports);
tslib_1.__exportStar(__webpack_require__(236), exports);


/***/ }),
/* 206 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(207), exports);


/***/ }),
/* 207 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pureResolvers = void 0;
const merge_1 = __webpack_require__(208);
const app_1 = __webpack_require__(209);
const domain_1 = __webpack_require__(214);
const element_1 = __webpack_require__(225);
const page_1 = __webpack_require__(228);
const type_1 = __webpack_require__(232);
exports.pureResolvers = (0, merge_1.mergeResolvers)([
    app_1.appResolver,
    domain_1.domainResolver,
    element_1.elementResolver,
    page_1.pageResolver,
    type_1.typeResolver,
]);


/***/ }),
/* 208 */
/***/ ((module) => {

module.exports = require("@graphql-tools/merge");

/***/ }),
/* 209 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(210), exports);


/***/ }),
/* 210 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.appResolver = void 0;
const app_name_1 = __webpack_require__(211);
const app_slug_1 = __webpack_require__(212);
exports.appResolver = {
    App: {
        name: app_name_1.name,
        slug: app_slug_1.slug,
    },
};


/***/ }),
/* 211 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.name = void 0;
/**
 * `_compoundName` contains format `userId-name`, which allows page name to be unique across users.
 *
 * We can compute name by replacing the ID
 */
const name = (app) => {
    return app._compoundName.replace(`${app.owner.auth0Id}-`, '');
};
exports.name = name;


/***/ }),
/* 212 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.slug = void 0;
const tslib_1 = __webpack_require__(1);
const slugify_1 = tslib_1.__importDefault(__webpack_require__(213));
const app_name_1 = __webpack_require__(211);
/**
 * Takes the name and slugify it
 */
const slug = (app, args, context, info) => {
    // Only need source, but pass rest in to satisfy resolver interface
    return (0, slugify_1.default)((0, app_name_1.name)(app, args, context, info));
};
exports.slug = slug;


/***/ }),
/* 213 */
/***/ ((module) => {

module.exports = require("voca/slugify");

/***/ }),
/* 214 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(215), exports);


/***/ }),
/* 215 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.domainResolver = void 0;
const domain_config_1 = __webpack_require__(216);
const project_domain_1 = __webpack_require__(224);
exports.domainResolver = {
    Domain: {
        domainConfig: domain_config_1.domainConfig,
        projectDomain: project_domain_1.projectDomain,
    },
};


/***/ }),
/* 216 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.domainConfig = void 0;
const tslib_1 = __webpack_require__(1);
const vercel_1 = __webpack_require__(217);
const domainConfig = ({ name, }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const res = yield vercel_1.vercelApis.domain.getDomainConfig(name);
    // await handleAPIError(res, 'getConfig - vercel')
    if (!res.ok) {
        return { misconfigured: false };
    }
    return yield res.json();
});
exports.domainConfig = domainConfig;


/***/ }),
/* 217 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(218), exports);
tslib_1.__exportStar(__webpack_require__(223), exports);


/***/ }),
/* 218 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PROJECT_NOT_FOUND = exports.domainApis = void 0;
const add_domain_1 = __webpack_require__(219);
const get_domain_config_1 = __webpack_require__(220);
const get_project_domain_1 = __webpack_require__(221);
Object.defineProperty(exports, "PROJECT_NOT_FOUND", ({ enumerable: true, get: function () { return get_project_domain_1.PROJECT_NOT_FOUND; } }));
exports.domainApis = {
    //  addDomain is still needed because it is used when importing domains and apps
    addDomain: add_domain_1.addDomain,
    getDomainConfig: get_domain_config_1.getDomainConfig,
    getProjectDomain: get_project_domain_1.getProjectDomain,
};


/***/ }),
/* 219 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addDomain = void 0;
const config_1 = __webpack_require__(179);
const addDomain = (name) => {
    const { getBaseHeaders, projectApiUrl, teamIdParam } = (0, config_1.getEnv)().vercel;
    const url = `${projectApiUrl()}/domains?${teamIdParam}`;
    return fetch(url, {
        body: JSON.stringify({
            method: 'add',
            name,
        }),
        headers: getBaseHeaders(),
        method: 'POST',
    });
};
exports.addDomain = addDomain;


/***/ }),
/* 220 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDomainConfig = void 0;
const config_1 = __webpack_require__(179);
/**
 * https://vercel.com/docs/rest-api#endpoints/domains/get-a-domain-s-configuration
 *
 * @param name
 */
const getDomainConfig = (name) => {
    const { domainApiUrl, getBaseHeaders, teamIdParam } = (0, config_1.getEnv)().vercel;
    const url = `${domainApiUrl()}/${name}/config?${teamIdParam}`;
    return fetch(url, {
        headers: getBaseHeaders(),
        method: 'GET',
    });
};
exports.getDomainConfig = getDomainConfig;


/***/ }),
/* 221 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getProjectDomain = exports.PROJECT_NOT_FOUND = void 0;
const tslib_1 = __webpack_require__(1);
const config_1 = __webpack_require__(179);
const cross_fetch_1 = tslib_1.__importDefault(__webpack_require__(222));
exports.PROJECT_NOT_FOUND = 404;
/**
 * https://vercel.com/docs/rest-api#endpoints/projects/get-a-project-domain
 *
 * 400 - One of the provided values in the request query is invalid.
 * 404 - Project not found
 */
const getProjectDomain = (name) => {
    const { getBaseHeaders, projectApiUrl, teamIdParam } = (0, config_1.getEnv)().vercel;
    const url = `${projectApiUrl()}/domains/${name}?${teamIdParam}`;
    return (0, cross_fetch_1.default)(url, {
        headers: getBaseHeaders(),
        method: 'GET',
    });
};
exports.getProjectDomain = getProjectDomain;


/***/ }),
/* 222 */
/***/ ((module) => {

module.exports = require("cross-fetch");

/***/ }),
/* 223 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.vercelApis = void 0;
const domain_1 = __webpack_require__(218);
exports.vercelApis = {
    domain: domain_1.domainApis,
};


/***/ }),
/* 224 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.projectDomain = void 0;
const tslib_1 = __webpack_require__(1);
const vercel_1 = __webpack_require__(217);
const projectDomain = ({ name }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const res = yield vercel_1.vercelApis.domain.getProjectDomain(name);
    // await handleAPIError(res, 'getProjectDomain - vercel')
    if (!res.ok) {
        return { verified: false };
    }
    return yield res.json();
});
exports.projectDomain = projectDomain;


/***/ }),
/* 225 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(226), exports);


/***/ }),
/* 226 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.elementResolver = void 0;
const render_type_1 = __webpack_require__(227);
exports.elementResolver = {
    Element: {
        renderType: render_type_1.renderType,
    },
    Mutation: {},
    Query: {},
};


/***/ }),
/* 227 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderType = void 0;
const core_1 = __webpack_require__(86);
const renderType = (element) => {
    const { renderAtomType, renderComponentType } = element;
    if (renderAtomType === null || renderAtomType === void 0 ? void 0 : renderAtomType.id) {
        return {
            id: renderAtomType.id,
            kind: core_1.IRenderTypeKind.Atom,
        };
    }
    if (renderComponentType === null || renderComponentType === void 0 ? void 0 : renderComponentType.id) {
        return {
            id: renderComponentType.id,
            kind: core_1.IRenderTypeKind.Component,
        };
    }
    return null;
};
exports.renderType = renderType;


/***/ }),
/* 228 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(229), exports);


/***/ }),
/* 229 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pageResolver = void 0;
const page_name_1 = __webpack_require__(230);
const page_slug_1 = __webpack_require__(231);
exports.pageResolver = {
    Mutation: {},
    Page: {
        name: page_name_1.name,
        slug: page_slug_1.slug,
    },
    Query: {},
};


/***/ }),
/* 230 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.name = void 0;
/**
 * `_compoundName` contains format `appId-name`, which allows page name to be unique across users.
 *
 * We can compute name by replacing the ID
 */
const name = (page) => {
    return page._compoundName.replace(`${page.app.id}-`, '');
};
exports.name = name;


/***/ }),
/* 231 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.slug = void 0;
const tslib_1 = __webpack_require__(1);
const slugify_1 = tslib_1.__importDefault(__webpack_require__(213));
const page_name_1 = __webpack_require__(230);
/**
 * Takes the name and slugify it
 */
const slug = (page, args, context, info) => {
    // Only need source, but pass rest in to satisfy resolver interface
    return (0, slugify_1.default)((0, page_name_1.name)(page, args, context, info));
};
exports.slug = slug;


/***/ }),
/* 232 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(233), exports);


/***/ }),
/* 233 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.typeResolver = void 0;
const query_1 = __webpack_require__(234);
exports.typeResolver = {
    IBaseType: {
        __resolveType: (type) => type.kind,
    },
    Mutation: {},
    Query: {
        baseTypes: query_1.baseTypes,
    },
};


/***/ }),
/* 234 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(235), exports);


/***/ }),
/* 235 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.baseTypes = void 0;
const tslib_1 = __webpack_require__(1);
const neo4j_driver_1 = __webpack_require__(198);
const cypher_1 = __webpack_require__(158);
const infra_1 = __webpack_require__(177);
const baseTypes = (_, params) => (0, infra_1.withReadTransaction)((txn) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const { options } = params;
    const limit = (_a = options === null || options === void 0 ? void 0 : options.limit) !== null && _a !== void 0 ? _a : 99999;
    const skip = (_b = options === null || options === void 0 ? void 0 : options.offset) !== null && _b !== void 0 ? _b : 0;
    const name = (_d = (_c = options === null || options === void 0 ? void 0 : options.where) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : '';
    const { records: getTypesRecords } = yield txn.run(cypher_1.getBaseTypes, {
        limit: (0, neo4j_driver_1.int)(limit),
        name,
        skip: (0, neo4j_driver_1.int)(skip),
    });
    const totalCountRecord = (_e = getTypesRecords[0]) === null || _e === void 0 ? void 0 : _e.get('totalCount');
    const totalCount = totalCountRecord ? (0, neo4j_driver_1.int)(totalCountRecord).toNumber() : 0;
    const items = getTypesRecords.map((record) => {
        const type = record.get('type').properties;
        const owner = record.get('owner').properties;
        return Object.assign(Object.assign({}, type), { __typename: 'BaseType', owner });
    });
    return {
        items,
        totalCount,
    };
}));
exports.baseTypes = baseTypes;


/***/ }),
/* 236 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolvers = void 0;
const merge_1 = __webpack_require__(208);
const ogm_resolvers_1 = __webpack_require__(237);
const pure_resolvers_1 = __webpack_require__(207);
exports.resolvers = (0, merge_1.mergeResolvers)([
    pure_resolvers_1.pureResolvers,
    ogm_resolvers_1.ogmResolvers,
]);


/***/ }),
/* 237 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ogmResolvers = void 0;
const merge_1 = __webpack_require__(208);
const element_1 = __webpack_require__(238);
const tag_1 = __webpack_require__(256);
/**
 * These can't be used by OGM itself, since they can cause circular dependencies.
 */
exports.ogmResolvers = (0, merge_1.mergeResolvers)([
    element_1.elementResolver,
    tag_1.tagResolver,
]);


/***/ }),
/* 238 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(239), exports);


/***/ }),
/* 239 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.elementResolver = void 0;
const descedant_elements_1 = __webpack_require__(240);
exports.elementResolver = {
    Element: {
        descendantElements: descedant_elements_1.descendantElementsFieldResolver,
    },
    Mutation: {},
    Query: {},
};


/***/ }),
/* 240 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.descendantElementsFieldResolver = void 0;
const tslib_1 = __webpack_require__(1);
const cypher_1 = __webpack_require__(158);
const infra_1 = __webpack_require__(177);
const selectionSet_1 = __webpack_require__(241);
const descendantElementsFieldResolver = (parent) => (0, infra_1.withReadTransaction)((txn) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const Element = yield infra_1.Repository.instance.Element;
    /**
     * We can still use the same query, but we get ID from context instead
     */
    const { records } = yield txn.run(cypher_1.getDescendantsCypher, {
        rootId: parent.id,
    });
    const descendants = (yield Promise.all((_a = records[0]) === null || _a === void 0 ? void 0 : _a.get(0).map((descendant) => {
        const id = descendant.properties.id;
        const element = Element.find({
            selectionSet: selectionSet_1.elementSelectionSet,
            where: { id },
        });
        return element;
    }))).flat();
    return descendants;
}));
exports.descendantElementsFieldResolver = descendantElementsFieldResolver;


/***/ }),
/* 241 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(242), exports);
tslib_1.__exportStar(__webpack_require__(243), exports);
tslib_1.__exportStar(__webpack_require__(245), exports);
tslib_1.__exportStar(__webpack_require__(249), exports);
tslib_1.__exportStar(__webpack_require__(253), exports);
tslib_1.__exportStar(__webpack_require__(250), exports);
tslib_1.__exportStar(__webpack_require__(248), exports);
tslib_1.__exportStar(__webpack_require__(254), exports);
tslib_1.__exportStar(__webpack_require__(251), exports);
tslib_1.__exportStar(__webpack_require__(255), exports);
tslib_1.__exportStar(__webpack_require__(252), exports);
tslib_1.__exportStar(__webpack_require__(246), exports);
tslib_1.__exportStar(__webpack_require__(247), exports);
tslib_1.__exportStar(__webpack_require__(244), exports);


/***/ }),
/* 242 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exportApiActionSelectionSet = exports.exportCodeActionSelectionSet = exports.actionSelectionSet = exports.codeActionSelectionSet = exports.apiActionSelectionSet = void 0;
const baseActionSelectionSet = `
  __typename
  id
  name
  type
`;
const edgeSelectionProperties = `
  ... on CodeAction {
    id
    name
  }
  ... on ApiAction {
    id
    name
  }
`;
exports.apiActionSelectionSet = `
  ${baseActionSelectionSet}
  successAction {
    ${edgeSelectionProperties}
  }
  errorAction {
    ${edgeSelectionProperties}
  }
  resource {
    id
  }
  config {
    data
    id
  }
`;
exports.codeActionSelectionSet = `
  ${baseActionSelectionSet}
  code
`;
exports.actionSelectionSet = `
  {
    ... on CodeAction {
        ${exports.codeActionSelectionSet}
    }
    ... on ApiAction {
        ${exports.apiActionSelectionSet}
    }
  }
`;
exports.exportCodeActionSelectionSet = `{
  ${baseActionSelectionSet}
  code
}`;
exports.exportApiActionSelectionSet = `{
  ${baseActionSelectionSet}
  successAction {
    ${edgeSelectionProperties}
  }
  errorAction {
    ${edgeSelectionProperties}
  }
  resource {
    id
  }
  config {
    data
    id
  }
}`;


/***/ }),
/* 243 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exportAppSelectionSet = exports.appSelectionSet = exports.baseAppSelectionSet = void 0;
const user_selection_set_1 = __webpack_require__(244);
exports.baseAppSelectionSet = `
  __typename
  id
  name
  slug
  domains {
    id
    name
    app {
      id
    }
  }
`;
exports.appSelectionSet = `{
  ${exports.baseAppSelectionSet}
  ${user_selection_set_1.ownerFieldSelectionSet}
}`;
exports.exportAppSelectionSet = `{
  ${exports.baseAppSelectionSet}

}`;


/***/ }),
/* 244 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ownerFieldSelectionSet = exports.userSelectionSet = void 0;
exports.userSelectionSet = `{
  id
  auth0Id
  username
  email
  roles
}`;
exports.ownerFieldSelectionSet = `
  owner {
    auth0Id
  }
`;


/***/ }),
/* 245 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exportAtomSelectionSet = exports.atomSelectionSet = void 0;
const tag_selection_set_1 = __webpack_require__(246);
const type_selection_set_1 = __webpack_require__(247);
const user_selection_set_1 = __webpack_require__(244);
exports.atomSelectionSet = `{
  id
  name
  type
  api
    ${type_selection_set_1.interfaceTypeSelectionSet}
  icon
  ${user_selection_set_1.ownerFieldSelectionSet}
  tags
    ${tag_selection_set_1.tagSelectionSet}
  suggestedChildren {
    id
    name
    type
  }
  requiredParents {
    id
    name
    type
  }
  externalCssSource
  externalJsSource
  externalSourceType
}`;
exports.exportAtomSelectionSet = `{
  id
  name
  type
  api {
    id
  }
  icon
  tags
    ${tag_selection_set_1.exportTagSelectionSet}
  suggestedChildren {
    id
    name
    type
  }
  requiredParents {
    id
    name
    type
  }
  externalCssSource
  externalJsSource
  externalSourceType
}`;


/***/ }),
/* 246 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exportTagSelectionSet = exports.tagSelectionSet = void 0;
const user_selection_set_1 = __webpack_require__(244);
/**
 * Need `name` for `parent` & `children` as lookup key, since id can change during import/export
 */
exports.tagSelectionSet = `{
  id
  name
  parent {
    id
    name
  }
  children {
    id
    name
  }
  ${user_selection_set_1.ownerFieldSelectionSet}
}`;
exports.exportTagSelectionSet = `{
  id
  name
  parent {
    id
    name
  }
  children {
    id
    name
  }
}`;


/***/ }),
/* 247 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exportInterfaceTypeWithFieldsSelectionSet = exports.interfaceTypeSelectionSet = exports.exportUnionTypeSelectionSet = exports.exportInterfaceTypeSelectionSet = exports.exportEnumTypeSelectionSet = exports.exportArrayTypeSelectionSet = exports.exportActionTypeSelectionSet = exports.exportRenderPropTypeSelectionSet = exports.exportReactNodeTypeSelectionSet = exports.exportPrimitiveTypeSelectionSet = exports.baseTypeSelection = void 0;
const field_selection_set_1 = __webpack_require__(248);
const user_selection_set_1 = __webpack_require__(244);
/**
 * We omit user during export, since this creates a non-reproducible file if exported from different accounts
 */
const exportBaseTypeSelection = `
  __typename
  id
  kind
  name
`;
exports.baseTypeSelection = `
  __typename
  id
  kind
  name
  ${user_selection_set_1.ownerFieldSelectionSet}
`;
exports.exportPrimitiveTypeSelectionSet = `{
  ${exportBaseTypeSelection}
  primitiveKind
}`;
exports.exportReactNodeTypeSelectionSet = `{
  ${exportBaseTypeSelection}
}`;
exports.exportRenderPropTypeSelectionSet = `{
  ${exportBaseTypeSelection}
}`;
exports.exportActionTypeSelectionSet = `{
  ${exportBaseTypeSelection}
}`;
exports.exportArrayTypeSelectionSet = `{
  ${exportBaseTypeSelection}
  itemType {
    id
    kind
  }
}`;
exports.exportEnumTypeSelectionSet = `{
  ${exportBaseTypeSelection}
  allowedValues {
    id
    key
    value
  }
}`;
exports.exportInterfaceTypeSelectionSet = `{
  ${exportBaseTypeSelection}
  fields {
    id
  }
}`;
exports.exportUnionTypeSelectionSet = `{
  ${exportBaseTypeSelection}
  descendantTypesIds
  typesOfUnionType {
    ... on IBaseType {
      ${exportBaseTypeSelection}
    }
  }
}`;
exports.interfaceTypeSelectionSet = `{
  ${exports.baseTypeSelection}
  fields
    ${field_selection_set_1.fieldSelectionSet}
}`;
exports.exportInterfaceTypeWithFieldsSelectionSet = `{
  ${exportBaseTypeSelection}
  fields
    ${field_selection_set_1.fieldSelectionSet}
}`;


/***/ }),
/* 248 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exportFieldSelectionSet = exports.fieldSelectionSet = void 0;
exports.fieldSelectionSet = `{
  id
  key
  name
  description
  validationRules
  defaultValues
  prevSibling {
    id
  }
  nextSibling {
    id
  }
  fieldType {
    __typename
    id
    kind
    name
  }
  api {
    id
  }
}`;
exports.exportFieldSelectionSet = `{
  id
  key
  name
  description
  validationRules
  defaultValues
  fieldType {
    __typename
    id
    kind
    name
  }
  api {
    id
  }
}`;


/***/ }),
/* 249 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exportComponentSelectionSet = exports.componentSelectionSet = void 0;
const element_selection_set_1 = __webpack_require__(250);
const prop_selection_set_1 = __webpack_require__(251);
const store_selection_set_1 = __webpack_require__(252);
const type_selection_set_1 = __webpack_require__(247);
const user_selection_set_1 = __webpack_require__(244);
exports.componentSelectionSet = `{
  id
  name
  rootElement
    ${element_selection_set_1.elementSelectionSet}
  ${user_selection_set_1.ownerFieldSelectionSet}
  props
    ${prop_selection_set_1.propSelectionSet}
  store {
    ${store_selection_set_1.storeSelectionSet}
  }
  api
    ${type_selection_set_1.interfaceTypeSelectionSet}
  childrenContainerElement {
    id
  }
  keyGenerator
}`;
exports.exportComponentSelectionSet = `{
  id
  name
  rootElement
    ${element_selection_set_1.exportElementSelectionSet}
  props
    ${prop_selection_set_1.propSelectionSet}
  store {
    ${store_selection_set_1.exportStoreSelectionSet}
  }
  api
    ${type_selection_set_1.exportInterfaceTypeWithFieldsSelectionSet}
  childrenContainerElement {
    id
  }
  keyGenerator
}`;


/***/ }),
/* 250 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exportElementSelectionSet = exports.elementSelectionSet = void 0;
const atom_selection_set_1 = __webpack_require__(245);
const prop_selection_set_1 = __webpack_require__(251);
const baseElementSelectionSet = `
  id
  name
  customCss
  guiCss
  parentComponent {
    id
    name
  }
  renderComponentType {
    id
    name
  }
  renderType {
    id
    kind
  }
  parent {
    id
  }
  prevSibling {
    id
  }
  nextSibling {
    id
  }
  firstChild {
    id
  }
  props
    ${prop_selection_set_1.propSelectionSet}
  renderForEachPropKey
  renderIfExpression
  propTransformationJs
  preRenderAction {
    id
  }
  postRenderAction {
    id
  }
`;
exports.elementSelectionSet = `{
  ${baseElementSelectionSet}
  renderAtomType
    ${atom_selection_set_1.atomSelectionSet}
}`;
exports.exportElementSelectionSet = `{
  ${baseElementSelectionSet}
  renderAtomType {
    id
    name
  }
}`;


/***/ }),
/* 251 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.propSelectionSet = void 0;
exports.propSelectionSet = `{
  id
  data
}`;


/***/ }),
/* 252 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exportStoreSelectionSet = exports.storeSelectionSet = void 0;
const action_selection_set_1 = __webpack_require__(242);
const type_selection_set_1 = __webpack_require__(247);
exports.storeSelectionSet = `
  id
  name
  api
    ${type_selection_set_1.interfaceTypeSelectionSet}
  actions
    ${action_selection_set_1.actionSelectionSet}
`;
exports.exportStoreSelectionSet = `
  id
  name
  api
    ${type_selection_set_1.exportInterfaceTypeWithFieldsSelectionSet}
  actions
    ${action_selection_set_1.actionSelectionSet}
`;


/***/ }),
/* 253 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.domainSelection = void 0;
exports.domainSelection = `
  id
  name
  app {
    id
  }
`;


/***/ }),
/* 254 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exportPageSelectionSet = exports.pageSelectionSet = exports.basePageSelectionSet = void 0;
const store_selection_set_1 = __webpack_require__(252);
exports.basePageSelectionSet = `
  app {
    id
  }
  id
  name
  slug
  kind
  rootElement {
    id
    name
  }
  pageContentContainer {
    id
    name
  }
  url
`;
exports.pageSelectionSet = `{
  ${exports.basePageSelectionSet}
  store {
    ${store_selection_set_1.storeSelectionSet}
  }
}`;
exports.exportPageSelectionSet = `{
  ${exports.basePageSelectionSet}
  store {
     ${store_selection_set_1.exportStoreSelectionSet}
  }
}`;


/***/ }),
/* 255 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resourceSelectionSet = void 0;
exports.resourceSelectionSet = `{ 
  id
  type
  name
  config {
    id
    data
  }
}
`;


/***/ }),
/* 256 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(257), exports);


/***/ }),
/* 257 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tagResolver = void 0;
const tag_descendants_1 = __webpack_require__(258);
exports.tagResolver = {
    Mutation: {},
    Query: {},
    Tag: {
        descendants: tag_descendants_1.descendants,
    },
};


/***/ }),
/* 258 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.descendants = void 0;
const tslib_1 = __webpack_require__(1);
const cypher_1 = __webpack_require__(158);
const infra_1 = __webpack_require__(177);
const selectionSet_1 = __webpack_require__(241);
const descendants = (parent) => (0, infra_1.withReadTransaction)((txn) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const Tag = yield infra_1.Repository.instance.Tag;
    /**
     * We can still use the same query, but we get ID from context instead
     */
    const { records } = yield txn.run(cypher_1.tagDescendants, { rootId: parent.id });
    return (yield Promise.all((_a = records[0]) === null || _a === void 0 ? void 0 : _a.get(0).map((descendant) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const id = descendant.properties.id;
        const tag = yield Tag.find({
            selectionSet: selectionSet_1.tagSelectionSet,
            where: { id },
        });
        return tag;
    })))).flat();
}));
exports.descendants = descendants;


/***/ }),
/* 259 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(260), exports);
tslib_1.__exportStar(__webpack_require__(263), exports);


/***/ }),
/* 260 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSchema = void 0;
const core_1 = __webpack_require__(86);
const config_1 = __webpack_require__(179);
const graphql_1 = __webpack_require__(261);
const graphql_plugin_auth_1 = __webpack_require__(262);
const type_defs_1 = __webpack_require__(263);
/**
 * `.` -> `\\.`
 */
const escapeDotPathKeys = (key) => {
    return key.replace(/\./g, '\\.');
};
/**
 * Your web app has a session (that’s the cookie) used to verify the user.
 *
 * Your M2M app is using a M2M cookie, since there is no session or user.
 *
 * This is kind of a fuzzy case: the “backend” serves as both a backend to your web app AND an API for your M2M app.
 *
 * You can configure your middleware to respect both the session and the token
 *
 * https://community.auth0.com/t/authenticating-users-and-m2m-with-same-middleware/77369/5
 */
const getSchema = (driver, resolvers) => new graphql_1.Neo4jGraphQL({
    config: {
        enableRegex: true,
    },
    driver,
    plugins: {
        /**
         * JWK (JSON Web Key) - allows applications to retrieve public keys programmatically
         *
         * PEM (Privacy Enhanced Mail ) - Certificate of Base 64 encoded public key certificate
         *
         * - The JWK contains the public certificate in addition to other claims about the key.
         *
         * https://community.auth0.com/t/jwk-vs-pem-what-is-the-difference/61927
         */
        auth: new graphql_plugin_auth_1.Neo4jGraphQLAuthJWKSPlugin({
            jwksEndpoint: new URL('.well-known/jwks.json', (0, config_1.getEnv)().auth0.issuerBaseUrl).href,
            /**
             * Use "dot path" since our roles path is nested
             *
             * https://githubmemory.com/repo/neo4j/graphql/issues/241
             *
             * Found out that we need to `Use \\. if you have a . in the key.`
             */
            rolesPath: `${escapeDotPathKeys(core_1.JWT_CLAIMS)}.roles`,
        }),
    },
    resolvers,
    typeDefs: type_defs_1.typeDefs,
});
exports.getSchema = getSchema;


/***/ }),
/* 261 */
/***/ ((module) => {

module.exports = require("@neo4j/graphql");

/***/ }),
/* 262 */
/***/ ((module) => {

module.exports = require("@neo4j/graphql-plugin-auth");

/***/ }),
/* 263 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.typeDefs = void 0;
const client_1 = __webpack_require__(176);
const graphql_1 = __webpack_require__(264);
const common_schema_1 = __webpack_require__(265);
const action_schema_1 = __webpack_require__(266);
const admin_schema_1 = __webpack_require__(268);
const app_schema_1 = __webpack_require__(269);
const atom_schema_1 = __webpack_require__(270);
const component_schema_1 = __webpack_require__(271);
const domain_schema_1 = __webpack_require__(272);
const element_schema_1 = __webpack_require__(273);
const hook_schema_1 = __webpack_require__(274);
const page_schema_1 = __webpack_require__(275);
const prop_schema_1 = __webpack_require__(276);
const resource_schema_1 = __webpack_require__(277);
const store_schema_1 = __webpack_require__(279);
const tag_schema_1 = __webpack_require__(280);
const user_schema_1 = __webpack_require__(281);
const type_1 = __webpack_require__(282);
exports.typeDefs = (0, graphql_1.print)((0, client_1.gql) `
  ${admin_schema_1.adminSchema}
  ${common_schema_1.commonSchema}
  ${admin_schema_1.adminSchema}
  ${user_schema_1.userSchema}
  ${app_schema_1.appSchema}
  ${type_1.fieldSchema}
  ${atom_schema_1.atomSchema}
  ${page_schema_1.pageSchema}
  ${type_1.typeSchema}
  ${tag_schema_1.tagSchema}
  ${element_schema_1.elementSchema}
  ${prop_schema_1.propSchema}
  ${hook_schema_1.hookSchema}
  ${component_schema_1.componentSchema}
  ${admin_schema_1.adminSchema}
  ${store_schema_1.storeSchema}
  ${action_schema_1.actionSchema}
  ${resource_schema_1.resourceSchema}
  ${domain_schema_1.domainSchema}
`);


/***/ }),
/* 264 */
/***/ ((module) => {

module.exports = require("graphql");

/***/ }),
/* 265 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.commonSchema = void 0;
const client_1 = __webpack_require__(176);
exports.commonSchema = (0, client_1.gql) `
  scalar JSON
  scalar JSONObject
`;


/***/ }),
/* 266 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.actionSchema = void 0;
const graphql_request_1 = __webpack_require__(267);
exports.actionSchema = (0, graphql_request_1.gql) `
  enum ActionKind {
    """
    Action with custom code
    """
    CodeAction

    """
    Action responsible for fetching data from a resource
    """
    ApiAction
  }

  interface BaseAction {
    id: ID! @id(autogenerate: false)
    name: String!
    type: ActionKind! @readonly
    store: Store! @relationship(type: "STORE_ACTION", direction: IN)
    element: Element @relationship(type: "ELEMENT_ACTION", direction: OUT)
  }

  type CodeAction implements BaseAction {
    id: ID!
    name: String!
    type: ActionKind! @default(value: CodeAction)
    store: Store!
    element: Element

    """
    Code to run when action is triggered
    """
    code: String!
  }

  type ApiAction implements BaseAction {
    id: ID!
    name: String!
    type: ActionKind! @default(value: ApiAction)
    store: Store!
    element: Element

    """
    Response handlers
    """
    successAction: AnyAction
      @relationship(type: "SUCCESS_ACTION", direction: OUT)
    errorAction: AnyAction @relationship(type: "ERROR_ACTION", direction: OUT)

    """
    Resource to fetch data from
    """
    resource: Resource! @relationship(type: "RESOURCE_ACTION", direction: OUT)
    config: Prop! @relationship(type: "ACTION_CONFIG", direction: OUT)
  }

  union AnyAction = ApiAction | CodeAction
`;


/***/ }),
/* 267 */
/***/ ((module) => {

module.exports = require("graphql-request");

/***/ }),
/* 268 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.adminSchema = void 0;
const client_1 = __webpack_require__(176);
exports.adminSchema = (0, client_1.gql) `
  type ResetDatabaseMutationResponse @exclude {
    success: Boolean
  }

  type Mutation {
    # Delete all nodes except for the user
    resetDatabase: ResetDatabaseMutationResponse
      @cypher(
        statement: """
        MATCH (n)
        WHERE NOT n:User
        DETACH DELETE n
        RETURN { success:true }
        """
      )
  }
`;


/***/ }),
/* 269 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.appSchema = void 0;
const client_1 = __webpack_require__(176);
exports.appSchema = (0, client_1.gql) `
  type App implements WithOwner {
    id: ID! @id(autogenerate: false)
    owner: User!
    # auth0Id-name format to make it unique across user
    _compoundName: String! @unique
    name: String! @customResolver(requires: ["id", "_compoundName"])
    slug: String! @customResolver(requires: ["id", "_compoundName"])
    pages: [Page!]! @relationship(type: "PAGES", direction: OUT)
    domains: [Domain!]! @relationship(type: "APP_DOMAIN", direction: IN)
  }

  extend type App
    @auth(
      rules: [
        {
          operations: [CREATE, UPDATE, DELETE]
          roles: ["User"]
          where: { owner: { auth0Id: "$jwt.sub" } }
          allow: { owner: { auth0Id: "$jwt.sub" } }
          bind: { owner: { auth0Id: "$jwt.sub" } }
        }
        {
          operations: [CREATE, UPDATE, DELETE]
          roles: ["Admin"]
          bind: { owner: { auth0Id: "$jwt.sub" } }
        }
      ]
    )
`;


/***/ }),
/* 270 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.atomSchema = void 0;
const client_1 = __webpack_require__(176);
const core_1 = __webpack_require__(86);
const atomTypeSchema = `enum AtomType {
  ${Object.values(core_1.__AtomType).join('\n')}
}`;
exports.atomSchema = (0, client_1.gql) `
  ${atomTypeSchema}

  type Atom implements WithOwner {
    id: ID! @id(autogenerate: false)
    owner: User!
    type: AtomType!
    name: String! @unique
    tags: [Tag!]! @relationship(type: "TAGS_WITH", direction: OUT)
    api: InterfaceType! @relationship(type: "ATOM_API", direction: OUT)
    icon: String
    externalJsSource: String
    externalCssSource: String
    externalSourceType: String @unique
    requiredParents: [Atom!]!
      @relationship(type: "REQUIRED_PARRENTS", direction: OUT)
    suggestedChildren: [Atom!]!
      @relationship(type: "ALLOWED_CHILDREN", direction: OUT)
  }

  extend type Atom
    @auth(
      rules: [
        {
          operations: [UPDATE, CREATE, DELETE]
          roles: ["User"]
          where: { owner: { auth0Id: "$jwt.sub" } }
          bind: { owner: { auth0Id: "$jwt.sub" } }
        }
        {
          operations: [UPDATE, CREATE, DELETE]
          roles: ["Admin"]
          bind: { owner: { auth0Id: "$jwt.sub" } }
        }
      ]
    )
`;


/***/ }),
/* 271 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.componentSchema = void 0;
const client_1 = __webpack_require__(176);
exports.componentSchema = (0, client_1.gql) `
  type Component implements WithOwner {
    id: ID! @id(autogenerate: false)
    name: String!
    rootElement: Element! @relationship(type: "COMPONENT_ROOT", direction: OUT)
    api: InterfaceType! @relationship(type: "COMPONENT_API", direction: OUT)
    owner: User!
    store: Store! @relationship(type: "STORE_OF_COMPONENT", direction: IN)
    props: Prop! @relationship(type: "PROPS_OF_COMPONENT", direction: OUT)

    # Function to extract a unique key from component input
    keyGenerator: String

    # This is the slot where prop children is rendered in the component instance
    # We may want multiple slots in the future
    childrenContainerElement: Element!
      @relationship(type: "CHILDREN_CONTAINER_ELEMENT", direction: OUT)
  }

  extend type Component
    @auth(
      rules: [
        { operations: [CONNECT, DISCONNECT], roles: ["Admin", "User"] }
        {
          operations: [UPDATE, CREATE, DELETE]
          roles: ["User"]
          where: { owner: { auth0Id: "$jwt.sub" } }
          bind: { owner: { auth0Id: "$jwt.sub" } }
        }
        {
          operations: [UPDATE, CREATE, DELETE]
          roles: ["Admin"]
          bind: { owner: { auth0Id: "$jwt.sub" } }
        }
      ]
    )
`;


/***/ }),
/* 272 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.domainSchema = void 0;
const client_1 = __webpack_require__(176);
exports.domainSchema = (0, client_1.gql) `
  # Copied from generated schema
  type DeleteInfo @exclude {
    bookmark: String
    nodesDeleted: Int!
    relationshipsDeleted: Int!
  }

  type VercelDomainConfig @exclude {
    misconfigured: Boolean!
  }

  type VercelProjectDomain @exclude {
    verified: Boolean!
  }

  type Domain {
    id: ID! @id(autogenerate: false)
    name: String!
    app: App! @relationship(type: "APP_DOMAIN", direction: OUT)
    domainConfig: VercelDomainConfig!
    projectDomain: VercelProjectDomain!
  }

  # We need custom resolvers to interact with Vercel API, @callback doesn't work for delete
  type Mutation {
    createDomains(input: [DomainCreateInput!]!): CreateDomainsMutationResponse!
    updateDomains(
      where: DomainWhere!
      update: DomainUpdateInput!
    ): UpdateDomainsMutationResponse!
    deleteDomains(id: String!): DeleteInfo!
  }
`;


/***/ }),
/* 273 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.elementSchema = void 0;
const client_1 = __webpack_require__(176);
const core_1 = __webpack_require__(86);
const renderTypeKindSchema = `enum RenderTypeKind {
  ${Object.values(core_1.__RenderTypeKind).join('\n')}
}`;
exports.elementSchema = (0, client_1.gql) `
  ${renderTypeKindSchema}

  # Create this to match frontend
  type RenderType @exclude {
    id: ID!
    kind: RenderTypeKind!
  }

  type Element {
    id: ID! @id(autogenerate: false)
    name: String!
    nextSibling: Element @relationship(type: "NODE_SIBLING", direction: IN)
    prevSibling: Element @relationship(type: "NODE_SIBLING", direction: OUT)
    firstChild: Element @relationship(type: "TREE_FIRST_CHILD", direction: IN)
    parent: Element @relationship(type: "TREE_FIRST_CHILD", direction: OUT)
    # Used for reverse lookup to see whether element is detached
    page: Page @relationship(type: "ROOT_PAGE_ELEMENT", direction: IN)
    props: Prop! @relationship(type: "PROPS_OF_ELEMENT", direction: OUT)

    # element is the rootElement for this component
    parentComponent: Component
      @relationship(type: "COMPONENT_ROOT", direction: IN)
    # Used for the css the user types it manually using the integrated code editor. This is
    # a pure css string.
    customCss: String
    # Used for the css set by the styling UI. This is a stringified json object of the form:
    # {[prop: string]: string}, where the prop is a css property and the value is its value.
    guiCss: String
    propTransformationJs: String
    renderForEachPropKey: String
    renderIfExpression: String

    preRenderAction: BaseAction
      @relationship(type: "ELEMENT_ACTION", direction: OUT)
    postRenderAction: BaseAction
      @relationship(type: "ELEMENT_ACTION", direction: OUT)

    # Type of element to render, could be either a component or atom
    renderComponentType: Component
      @relationship(type: "RENDER_COMPONENT_TYPE", direction: OUT)
    renderAtomType: Atom @relationship(type: "RENDER_ATOM_TYPE", direction: OUT)
    renderType: RenderType

    # This is a custom field resolver
    descendantElements: [Element!]!
  }
`;


/***/ }),
/* 274 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hookSchema = void 0;
const client_1 = __webpack_require__(176);
exports.hookSchema = (0, client_1.gql) `
  type Hook {
    id: ID! @id
    type: AtomType!
    config: Prop! @relationship(type: "CONFIG_OF_HOOK", direction: OUT)
    element: Element! @relationship(type: "HOOKS_OF_ELEMENT", direction: IN)
  }
`;


/***/ }),
/* 275 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pageSchema = void 0;
const client_1 = __webpack_require__(176);
const core_1 = __webpack_require__(86);
const pageKindSchema = `enum PageKind {
  ${Object.values(core_1.__PageKind).join('\n')}
}`;
exports.pageSchema = (0, client_1.gql) `
  ${pageKindSchema}

  type Page {
    id: ID! @id(autogenerate: false)
    # appId-name format to make it unique across apps
    _compoundName: String! @unique
    name: String! @customResolver(requires: ["id", "_compoundName"])
    slug: String! @customResolver(requires: ["id", "_compoundName"])
    # The root of the elementTree
    rootElement: Element!
      @relationship(type: "ROOT_PAGE_ELEMENT", direction: OUT)
    app: App! @relationship(type: "PAGES", direction: IN)

    store: Store! @relationship(type: "STORE_OF_PAGE", direction: IN)
    #getServerSideProps: String
    # this is an element on _app page tree inside of which child pages content is rendered
    # default is root "Body" element, but can be changed using dropdown on Page Inspector tab
    pageContentContainer: Element
      @relationship(type: "CHILD_PAGE_CONTAINER_ELEMENT", direction: OUT)
    kind: PageKind!
    # when the app will be deployed - the page will be available on this URL
    url: String!
  }

  extend type Page
    @auth(
      rules: [
        {
          operations: [CREATE, UPDATE, DELETE]
          roles: ["User"]
          where: { app: { owner: { auth0Id: "$jwt.sub" } } }
          allow: { app: { owner: { auth0Id: "$jwt.sub" } } }
        }
        { operations: [CREATE, UPDATE, DELETE], roles: ["Admin"] }
      ]
    )
`;


/***/ }),
/* 276 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.propSchema = void 0;
const client_1 = __webpack_require__(176);
exports.propSchema = (0, client_1.gql) `
  type Prop {
    id: ID! @id(autogenerate: false)
    data: String!
  }
`;


/***/ }),
/* 277 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resourceSchema = void 0;
const tslib_1 = __webpack_require__(1);
const client_1 = __webpack_require__(176);
const values_1 = tslib_1.__importDefault(__webpack_require__(278));
var ResourceType;
(function (ResourceType) {
    ResourceType["GraphQL"] = "GraphQL";
    ResourceType["Rest"] = "Rest";
})(ResourceType || (ResourceType = {}));
exports.resourceSchema = (0, client_1.gql) `
  enum ResourceType {${(0, values_1.default)(ResourceType).join('\n')}}

  type Resource implements WithOwner {
    id: ID! @id(autogenerate: false)
    type: ResourceType!
    name: String!
    config: Prop! @relationship(type: "RESOURCE_CONFIG", direction: OUT)
    owner: User!
  }

  extend type Resource
  @auth(
    rules: [
      { operations: [CONNECT, DISCONNECT], roles: ["Admin", "User"] }
      {
        operations: [UPDATE, CREATE, DELETE]
        roles: ["User"]
        where: { owner: { auth0Id: "$jwt.sub" } }
        bind: { owner: { auth0Id: "$jwt.sub" } }
      }
      {
        operations: [UPDATE, CREATE, DELETE]
        roles: ["Admin"]
        bind: { owner: { auth0Id: "$jwt.sub" } }
      }
    ]
  )
`;


/***/ }),
/* 278 */
/***/ ((module) => {

module.exports = require("lodash/values");

/***/ }),
/* 279 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.storeSchema = void 0;
const client_1 = __webpack_require__(176);
exports.storeSchema = (0, client_1.gql) `
  type Store {
    id: ID! @id(autogenerate: false)
    name: String!
    api: InterfaceType! @relationship(type: "STORE_STATE_API", direction: OUT)
    actions: [AnyAction!]! @relationship(type: "STORE_ACTION", direction: OUT)
    component: Component
      @relationship(type: "STORE_OF_COMPONENT", direction: OUT)
    page: Page @relationship(type: "STORE_OF_PAGE", direction: OUT)
  }
`;


/***/ }),
/* 280 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tagSchema = void 0;
const client_1 = __webpack_require__(176);
const cypher_1 = __webpack_require__(158);
exports.tagSchema = (0, client_1.gql) `
  type Tag {
    id: ID! @id(autogenerate: false)
    name: String! @unique
    # Could have multiple roots, just all different trees
    isRoot: Boolean
      @cypher(statement: """${cypher_1.tagIsRoot}""")
    parent: Tag @relationship(type: "CHILDREN", direction: IN)
    children: [Tag!]! @relationship(type: "CHILDREN", direction: OUT)
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    atoms: [Atom!]! @relationship(type: "TAGS_WITH", direction: IN)

    # This is a custom resolver
    descendants: [Tag!]!
  }

  extend type Tag
    @auth(
      rules: [
        {
          operations: [UPDATE, CREATE, DELETE]
          roles: ["Admin"]
          bind: { owner: { auth0Id: "$jwt.sub" } }
        }
        {
          roles: ["User"]
          operations: [UPDATE, CREATE, DELETE]
          where: { owner: { auth0Id: "$jwt.sub" } }
          bind: { owner: { auth0Id: "$jwt.sub" } }
        }
      ]
    )
`;


/***/ }),
/* 281 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.userSchema = void 0;
const client_1 = __webpack_require__(176);
exports.userSchema = (0, client_1.gql) `
  enum Role {
    User
    Admin
  }

  interface WithOwner {
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
  }

  type User @exclude(operations: [UPDATE]) {
    id: ID! @id(autogenerate: false)
    auth0Id: String! @unique
    email: String!
    username: String! @unique
    types: [BaseType!]! @relationship(type: "OWNED_BY", direction: IN)
    apps: [App!]! @relationship(type: "OWNED_BY", direction: IN)
    elements: [Element!]! @relationship(type: "OWNED_BY", direction: IN)
    components: [Component!]! @relationship(type: "OWNED_BY", direction: IN)
    atoms: [Atom!]! @relationship(type: "OWNED_BY", direction: IN)
    # Some issue using required array of enum, can't add using []! signature
    # roles: [Role!] @default(value: User)
    roles: [Role!]
    tags: [Tag!]! @relationship(type: "OWNED_BY", direction: IN)
  }

  #  extend type User
  #    @auth(
  #      rules: [
  #        {
  #          operations: [CREATE, UPDATE]
  #          roles: ["User"]
  #          where: { auth0Id: "$jwt.sub" }
  #          bind: { auth0Id: "$jwt.sub" }
  #        }
  #        {
  #          operations: [UPDATE, CREATE, DELETE]
  #          roles: ["Admin"]
  #          #          where: { auth0Id: "$jwt.sub" }
  #          #          bind: { auth0Id: "$jwt.sub" }
  #        }
  #      ]
  #    )
`;


/***/ }),
/* 282 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(283), exports);
tslib_1.__exportStar(__webpack_require__(284), exports);


/***/ }),
/* 283 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fieldSchema = void 0;
const client_1 = __webpack_require__(176);
exports.fieldSchema = (0, client_1.gql) `
  type Field {
    id: ID!
    key: String!
    name: String
    nextSibling: Field @relationship(type: "FIELD_NEXT_SIBLING", direction: IN)
    prevSibling: Field @relationship(type: "FIELD_PREV_SIBLING", direction: OUT)
    description: String
    validationRules: String
    defaultValues: String
    fieldType: IBaseType! @relationship(type: "FIELD_TYPE", direction: OUT)
    # API the field belongs to
    api: InterfaceType! @relationship(type: "INTERFACE_FIELD", direction: IN)
  }
`;


/***/ }),
/* 284 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.typeSchema = void 0;
const client_1 = __webpack_require__(176);
const core_1 = __webpack_require__(86);
const type_1 = __webpack_require__(168);
const elementTypeTypeKindSchema = `enum ElementTypeKind {
  ${Object.values(core_1.__ElementTypeKind).join('\n')}
}`;
exports.typeSchema = (0, client_1.gql) `
  enum TypeKind {
    PrimitiveType
    EnumType
    ArrayType
    InterfaceType
    LambdaType
    ElementType
    RenderPropType
    ReactNodeType
    UnionType
    CodeMirrorType
    PageType
    AppType
    ActionType
  }

  type TypeReference {
    """
    The name of the resource referencing the type
    """
    name: String!
    """
    The type of resource - Atom, InterfaceType, etc.
    """
    label: String!
  }

  input BaseTypesWhere {
    name: String
  }

  input GetBaseTypesOptions {
    limit: Int
    offset: Int
    where: BaseTypesWhere
  }

  type GetBaseTypesReturn {
    items: [BaseType!]!
    totalCount: Int!
  }

  type Query {
    """
    Does a recursive check to see if the parent type (parentTypeId) contains the descendant type (descendantTypeId) at any level of nesting. Useful for checking for recursion
    """
    isTypeDescendantOf(parentTypeId: ID!, descendantTypeId: ID!): Boolean
      @cypher(statement: """${type_1.isTypeDescendantOf}""")

    """
    Returns a list of all Type and Atom entities that reference the type with the given id
    This could be different types of relationships like Atom-Api, ArrayType-itemType, InterfaceType-field, UnionType-unionTypeChild
    """
    getTypeReferences(typeId: ID!): [TypeReference!]
      @cypher(statement: """${type_1.getTypeReferences}""")

    baseTypes(
      options: GetBaseTypesOptions
    ): GetBaseTypesReturn!
  }

  interface IBaseType {
    id: ID! @id(autogenerate: false)
    kind: TypeKind! @readonly
    name: String!
    # fields: [Field!]! @relationship(type: "FIELD_TYPE", direction: OUT)
    # we don't need an @auth here, because the User's @auth already declares rules for connect/disconnect
    owner: User!
      @relationship(
        type: "OWNED_BY",
        direction: OUT
      )
  }

  # for defining returning data only
  type BaseType implements IBaseType @exclude(operations: [CREATE, READ, UPDATE, DELETE]) {
    id: ID!
    kind: TypeKind!
    name: String! @unique
    owner: User!
  }

  # https://github.com/neo4j/graphql/issues/1105
  extend interface IBaseType
  @auth(
    rules: [
      {
        operations: [UPDATE, CREATE, DELETE]
        roles: ["User"]
        where: { owner: { auth0Id: "$jwt.sub" } }
        bind: { owner: { auth0Id: "$jwt.sub" } }
      }
      {
          operations: [UPDATE, CREATE, DELETE]
          roles: ["Admin"]
          # Admin can access all types, so no need for where
          # where: { owner: { auth0Id: "$jwt.sub" } }
          bind: { owner: { auth0Id: "$jwt.sub" } }
      }
    ]
  )

  interface WithDescendants {
    descendantTypesIds: [ID!]!
        @cypher(statement: """${type_1.getTypeDescendants}""")
  }

  """
  Base atomic building block of the type system. Represents primitive types - String, Integer, Float, Boolean
  """
  type PrimitiveType implements IBaseType @node(labels: ["Type", "PrimitiveType"])  {
    id: ID!
    kind: TypeKind! @default(value: PrimitiveType)
    name: String! @unique
    owner: User!
    # There seems to be an issue with the unique constrain right now https://github.com/neo4j/graphql/issues/915
    primitiveKind: PrimitiveTypeKind! @unique
  }

  enum PrimitiveTypeKind {
    String
    Integer
    Boolean
    Number
  }

  """
  ArrayType Allows defining a variable number of items of a given type.
  Contains a reference to another type which is the array item type.
  """
  type ArrayType implements IBaseType & WithDescendants @node(labels: ["Type", "ArrayType"]) {
    id: ID!
    kind: TypeKind! @default(value: ArrayType)
    name: String!
    owner: User!
    # ArrayTypes can be shared between components/atoms
    fieldRefs: [Field!]! @relationship(type: "FIELD_TYPE", direction: IN)
    descendantTypesIds: [ID!]!
    itemType: IBaseType!
      @relationship(
        type: "ARRAY_ITEM_TYPE",
        direction: OUT,
      )
  }

  """
  Allows picking one of a set of types
  """
  type UnionType implements IBaseType & WithDescendants @node(labels: ["Type", "UnionType"]) {
    id: ID!
    kind: TypeKind! @default(value: UnionType)
    name: String! @unique
    owner: User!
    descendantTypesIds: [ID!]!
    typesOfUnionType: [AnyType!]!
      @relationship(
        type: "UNION_TYPE_CHILD",
        direction: OUT,
      )
  }



  """
  Represents an object type with multiple fields
  """
  type InterfaceType implements IBaseType & WithDescendants @node(labels: ["Type", "InterfaceType"]) {
    id: ID!
    kind: TypeKind! @default(value: InterfaceType)
    name: String!
    owner: User!
    # InterfaceTypes can be shared between components/atoms
    fieldRefs: [Field!]! @relationship(type: "FIELD_TYPE", direction: IN)
    descendantTypesIds: [ID!]!
    # List of atoms that have this interface as their api type
    apiOfAtoms: [Atom!]!
      @relationship(
        type: "ATOM_API",
        direction: IN
      )
    # Fields are defined as a set of list to other types
    fields: [Field!]!
      @relationship(
        type: "INTERFACE_FIELD",
        direction: OUT
      )  }

  """
  Allows picking an element from the current tree
  Is passed to the rendered element as a React node
  Prop values for this type have the shape of TypedProp in order to
  be distinguished from other element types.
  Comparison between different element types:
  - RenderPropType: Component select box, results it '(props) => ReactNode' value
  - ReactNodeType: Component select box, results it 'ReactNode' value
  - ElementType: Current tree element select box, results it 'ReactNode' value
  """
  type ElementType implements IBaseType @node(labels: ["Type", "ElementType"])  {
    id: ID!
    kind: TypeKind! @default(value: ElementType)
    name: String!
    owner: User!
    """
    Allows scoping the type of element to only descendants, children or all elements
    """
    elementKind: ElementTypeKind!
  }

  """
  Allows picking a Component from the list of components.
  It is passed to the rendered element as a function that takes props as input
  and returns a React element: '(props) => ReactNode'
  Prop values for this type have the shape of TypedProp in order to
  be distinguished from other element types.
  Comparison between different element types:
  - RenderPropType: Component select box, results it '(props) => ReactNode' value
  - ReactNodeType: Component select box, results it 'ReactNode' value
  - ElementType: Current tree element select box, results it 'ReactNode' value
  """
  type RenderPropType implements IBaseType @node(labels: ["Type", "RenderPropType"]) {
    id: ID!
    kind: TypeKind! @default(value: RenderPropType)
    name: String! @unique
    owner: User!
  }

  """
  Allows picking a Component from the list of components.
  It is passed to the rendered element as a React node: \`ReactNode\`
  Prop values for this type have the shape of TypedProp in order to
  be distinguished from other element types.
  Comparison between different element types:
  - RenderPropType: Component select box, results it '(props) => ReactNode' value
  - ReactNodeType: Component select box, results it 'ReactNode' value
  - ElementType: Current tree element select box, results it 'ReactNode' value
  """
  type ReactNodeType implements IBaseType @node(labels: ["Type", "ReactNodeType"]) {
    id: ID!
    kind: TypeKind! @default(value: ReactNodeType)
    name: String! @unique
    owner: User!
  }

  ${elementTypeTypeKindSchema}

  """
  Allows choosing one of a set of allowed values.
  The value gets passed to the render pipe as a Enum Type Value id.
  The actual value must be de-referenced by the id.
  """
  type EnumType implements IBaseType @node(labels: ["Type", "EnumType"]) {
    id: ID!
    kind: TypeKind! @default(value: EnumType)
    name: String!
    owner: User!
    # Allows reverse lookup and get all api's enums
    # EnumTypes can be shared between components/atoms
    fieldRefs: [Field!]! @relationship(type: "FIELD_TYPE", direction: IN)
    allowedValues: [EnumTypeValue!]!
      @relationship(
        type: "ALLOWED_VALUE",
        direction: OUT,
      )
  }

  type EnumTypeValue {
    enumType: EnumType @relationship(type: "ALLOWED_VALUE", direction: IN)
    id: ID!
    key: String!
    value: String!
  }

  """
  Allows picking a lambda
  """
  type LambdaType implements IBaseType @node(labels: ["Type", "LambdaType"]) {
    id: ID!
    kind: TypeKind! @default(value: LambdaType)
    name: String!
    owner: User!
  }

  """
  Allows picking a page from the list of pages
  """
  type PageType implements IBaseType @node(labels: ["Type", "PageType"]) {
    id: ID!
    kind: TypeKind! @default(value: PageType)
    name: String!
    owner: User!
  }

  """
  Allows picking a app from the list of apps
  """
  type AppType implements IBaseType @node(labels: ["Type", "AppType"]) {
    id: ID!
    kind: TypeKind! @default(value: AppType)
    name: String!
    owner: User!
  }

  """
  Allows picking a action from the list of actions
  """
  type ActionType implements IBaseType @node(labels: ["Type", "ActionType"]) {
    id: ID!
    kind: TypeKind! @default(value: ActionType)
    name: String! @unique
    owner: User!
  }

  """
  Allows editing the value using a code mirror editor
  """
  type CodeMirrorType implements IBaseType @node(labels: ["Type", "CodeMirrorType"]) {
    id: ID!
    kind: TypeKind! @default(value: CodeMirrorType)
    name: String!
    owner: User!
    language: CodeMirrorLanguage!
  }

  enum CodeMirrorLanguage {
    Typescript
    Javascript
    Css
    Json
    Graphql
    CssInJs
  }

  union AnyType =
    PrimitiveType |
    ArrayType |
    UnionType |
    InterfaceType |
    ElementType |
    RenderPropType |
    ReactNodeType |
    EnumType |
    LambdaType |
    PageType |
    AppType |
    ActionType |
    CodeMirrorType
`;


/***/ }),
/* 285 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Repository = void 0;
const tslib_1 = __webpack_require__(1);
const ogm_1 = __webpack_require__(204);
class Repository {
    constructor() {
        Object.defineProperty(this, "user", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        //
        // App
        //
        Object.defineProperty(this, "app", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "domain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "page", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        //
        // Store
        //
        Object.defineProperty(this, "store", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "apiAction", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "codeAction", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "resource", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        //
        // Component
        //
        Object.defineProperty(this, "atom", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "element", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "prop", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "component", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tag", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        //
        // Types
        //
        Object.defineProperty(this, "field", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "interfaceType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "primitiveType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "unionType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "arrayType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "enumType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "enumTypeValue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "lambdaType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "appType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "actionType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "renderPropType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "reactNodeType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "pageType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "codeMirrorType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "elementType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "getOgmInstance", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (inst, name) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const ogm = yield (0, ogm_1.getOgm)();
                if (!inst) {
                    return ogm.model(name);
                }
                return inst;
            })
        });
        if (Repository._instance) {
            throw new Error('Use Repository.instance instead of new.');
        }
        Repository._instance = this;
    }
    static get instance() {
        var _a;
        return ((_a = Repository._instance) !== null && _a !== void 0 ? _a : (Repository._instance = new Repository()));
    }
    get User() {
        return (() => tslib_1.__awaiter(this, void 0, void 0, function* () { var _a; return ((_a = this.user) !== null && _a !== void 0 ? _a : (this.user = yield this.getOgmInstance(this.user, 'User'))); }))();
    }
    //
    // App
    //
    get App() {
        return (() => tslib_1.__awaiter(this, void 0, void 0, function* () { var _a; return ((_a = this.app) !== null && _a !== void 0 ? _a : (this.app = yield this.getOgmInstance(this.app, 'App'))); }))();
    }
    get Domain() {
        return (() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            return ((_a = this.domain) !== null && _a !== void 0 ? _a : (this.domain = yield this.getOgmInstance(this.domain, 'Domain')));
        }))();
    }
    get Page() {
        return (() => tslib_1.__awaiter(this, void 0, void 0, function* () { var _a; return ((_a = this.page) !== null && _a !== void 0 ? _a : (this.page = yield this.getOgmInstance(this.page, 'Page'))); }))();
    }
    //
    // Store
    //
    get Store() {
        return (() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            return ((_a = this.store) !== null && _a !== void 0 ? _a : (this.store = yield this.getOgmInstance(this.store, 'Store')));
        }))();
    }
    get ApiAction() {
        return (() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            return ((_a = this.apiAction) !== null && _a !== void 0 ? _a : (this.apiAction = yield this.getOgmInstance(this.apiAction, 'ApiAction')));
        }))();
    }
    get CodeAction() {
        return (() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            return ((_a = this.codeAction) !== null && _a !== void 0 ? _a : (this.codeAction = yield this.getOgmInstance(this.codeAction, 'CodeAction')));
        }))();
    }
    get Resource() {
        return (() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            return ((_a = this.resource) !== null && _a !== void 0 ? _a : (this.resource = yield this.getOgmInstance(this.resource, 'Resource')));
        }))();
    }
    //
    // Component
    //
    get Atom() {
        return (() => tslib_1.__awaiter(this, void 0, void 0, function* () { var _a; return ((_a = this.atom) !== null && _a !== void 0 ? _a : (this.atom = yield this.getOgmInstance(this.atom, 'Atom'))); }))();
    }
    get Element() {
        return (() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            return ((_a = this.element) !== null && _a !== void 0 ? _a : (this.element = yield this.getOgmInstance(this.element, 'Element')));
        }))();
    }
    get Prop() {
        return (() => tslib_1.__awaiter(this, void 0, void 0, function* () { var _a; return ((_a = this.prop) !== null && _a !== void 0 ? _a : (this.prop = yield this.getOgmInstance(this.prop, 'Prop'))); }))();
    }
    get Component() {
        return (() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            return ((_a = this.component) !== null && _a !== void 0 ? _a : (this.component = yield this.getOgmInstance(this.component, 'Component')));
        }))();
    }
    get Tag() {
        return (() => tslib_1.__awaiter(this, void 0, void 0, function* () { var _a; return ((_a = this.tag) !== null && _a !== void 0 ? _a : (this.tag = yield this.getOgmInstance(this.tag, 'Tag'))); }))();
    }
    //
    // Types
    //
    get Field() {
        return (() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            return ((_a = this.field) !== null && _a !== void 0 ? _a : (this.field = yield this.getOgmInstance(this.field, 'Field')));
        }))();
    }
    get InterfaceType() {
        return (() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            return ((_a = this.interfaceType) !== null && _a !== void 0 ? _a : (this.interfaceType = yield this.getOgmInstance(this.interfaceType, 'InterfaceType')));
        }))();
    }
    get PrimitiveType() {
        return (() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            return ((_a = this.primitiveType) !== null && _a !== void 0 ? _a : (this.primitiveType = yield this.getOgmInstance(this.primitiveType, 'PrimitiveType')));
        }))();
    }
    get UnionType() {
        return (() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            return ((_a = this.unionType) !== null && _a !== void 0 ? _a : (this.unionType = yield this.getOgmInstance(this.unionType, 'UnionType')));
        }))();
    }
    get ArrayType() {
        return (() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            return ((_a = this.arrayType) !== null && _a !== void 0 ? _a : (this.arrayType = yield this.getOgmInstance(this.arrayType, 'ArrayType')));
        }))();
    }
    get EnumType() {
        return (() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            return ((_a = this.enumType) !== null && _a !== void 0 ? _a : (this.enumType = yield this.getOgmInstance(this.enumType, 'EnumType')));
        }))();
    }
    get EnumTypeValue() {
        return (() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            return ((_a = this.enumTypeValue) !== null && _a !== void 0 ? _a : (this.enumTypeValue = yield this.getOgmInstance(this.enumTypeValue, 'EnumTypeValue')));
        }))();
    }
    get LambdaType() {
        return (() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            return ((_a = this.lambdaType) !== null && _a !== void 0 ? _a : (this.lambdaType = yield this.getOgmInstance(this.lambdaType, 'LambdaType')));
        }))();
    }
    get AppType() {
        return (() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            return ((_a = this.appType) !== null && _a !== void 0 ? _a : (this.appType = yield this.getOgmInstance(this.appType, 'AppType')));
        }))();
    }
    get ActionType() {
        return (() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            return ((_a = this.actionType) !== null && _a !== void 0 ? _a : (this.actionType = yield this.getOgmInstance(this.actionType, 'ActionType')));
        }))();
    }
    get RenderPropType() {
        return (() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            return ((_a = this.renderPropType) !== null && _a !== void 0 ? _a : (this.renderPropType = yield this.getOgmInstance(this.renderPropType, 'RenderPropType')));
        }))();
    }
    get ReactNodeType() {
        return (() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            return ((_a = this.reactNodeType) !== null && _a !== void 0 ? _a : (this.reactNodeType = yield this.getOgmInstance(this.reactNodeType, 'ReactNodeType')));
        }))();
    }
    get PageType() {
        return (() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            return ((_a = this.pageType) !== null && _a !== void 0 ? _a : (this.pageType = yield this.getOgmInstance(this.pageType, 'PageType')));
        }))();
    }
    get CodeMirrorType() {
        return (() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            return ((_a = this.codeMirrorType) !== null && _a !== void 0 ? _a : (this.codeMirrorType = yield this.getOgmInstance(this.codeMirrorType, 'CodeMirrorType')));
        }))();
    }
    get ElementType() {
        return (() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            return ((_a = this.elementType) !== null && _a !== void 0 ? _a : (this.elementType = yield this.getOgmInstance(this.elementType, 'ElementType')));
        }))();
    }
}
exports.Repository = Repository;


/***/ }),
/* 286 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.withWriteTransaction = exports.withReadTransaction = void 0;
const tslib_1 = __webpack_require__(1);
const driver_1 = __webpack_require__(178);
const withReadTransaction = (readTransaction) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const driver = (0, driver_1.getDriver)();
    const session = driver.session();
    return session
        .readTransaction((txn) => readTransaction(txn))
        .catch((error) => {
        console.error(error);
        throw error;
    })
        .finally(() => session.close());
});
exports.withReadTransaction = withReadTransaction;
const withWriteTransaction = (writeTransaction) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const driver = (0, driver_1.getDriver)();
    const session = driver.session();
    return session
        .writeTransaction((txn) => writeTransaction(txn))
        .catch((error) => {
        console.error(error);
        throw error;
    })
        .finally(() => session.close());
});
exports.withWriteTransaction = withWriteTransaction;


/***/ }),
/* 287 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(288), exports);


/***/ }),
/* 288 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbstractRepository = void 0;
const tslib_1 = __webpack_require__(1);
const otel_1 = __webpack_require__(28);
const utils_1 = __webpack_require__(35);
class AbstractRepository {
    // Set default TTL to 60 seconds
    constructor(ttl = 60000) {
        Object.defineProperty(this, "findOneCache", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "findCache", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.findOneCache = new utils_1.TTLCache(ttl);
        this.findCache = new utils_1.TTLCache(ttl);
    }
    findOne(where) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const cacheKey = JSON.stringify(where);
            const cachedValue = this.findOneCache.get(cacheKey);
            if (cachedValue !== undefined) {
                return cachedValue;
            }
            const result = (yield this.find(where))[0];
            this.findOneCache.set(cacheKey, result);
            return result;
        });
    }
    find(where) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const cacheKey = JSON.stringify(where);
            const cachedValue = this.findCache.get(cacheKey);
            if (cachedValue !== undefined) {
                return cachedValue;
            }
            const results = yield this._find(where);
            this.findCache.set(cacheKey, results);
            return results;
        });
    }
    add(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield (0, otel_1.withTracing)(`${this.constructor.name}.add()`, () => this._add(data), (span) => {
                var _a;
                const attributes = (_a = data[0]) !== null && _a !== void 0 ? _a : {};
                span.setAttributes(attributes);
            })();
        });
    }
    /**
     * We disallow updating of ID, since it disallows us from keying a where search by name, and having consistent ID.
     *
     * Say we created some DTO data that is keyed by name, but with a generated ID. After finding existing record and performing update, we will actually update the ID as we ll.
     */
    update(data, where) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // console.debug(`Updating ${this.constructor.name}`, data, { where })
            const model = yield (0, otel_1.withTracing)(`${this.constructor.name}.update()`, () => this._update(data, where), (span) => {
                const attributes = data;
                span.setAttributes(attributes);
            })();
            if (!model) {
                throw new Error('Model not updated');
            }
            return model;
        });
    }
    /**
     * Upsert behavior, uses data id by default for upsert. If `where` clause is specified, then it overrides id
     *
     * @param where
     */
    save(data, where) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, otel_1.withTracing)(`${this.constructor.name}.save()`, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const computedWhere = this.getWhere(data, where);
                if (yield this.exists(data, computedWhere)) {
                    return this.update(data, computedWhere);
                }
                const results = (yield this.add([data]))[0];
                if (!results) {
                    throw new Error('Save failed');
                }
                return results;
            }), (span) => {
                const attributes = data;
                span.setAttributes(attributes);
            })();
        });
    }
    exists(data, where) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, otel_1.withTracing)(`${this.constructor.name}.exists()`, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const results = yield this.findOne(where);
                return Boolean(results);
            }))();
        });
    }
    /**
     * Specifying a `where` clause overrides the  id
     */
    getWhere(data, where) {
        return where ? where : { id: data.id };
    }
}
exports.AbstractRepository = AbstractRepository;


/***/ }),
/* 289 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(290), exports);
tslib_1.__exportStar(__webpack_require__(296), exports);


/***/ }),
/* 290 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(291), exports);
tslib_1.__exportStar(__webpack_require__(293), exports);
tslib_1.__exportStar(__webpack_require__(294), exports);
tslib_1.__exportStar(__webpack_require__(295), exports);
tslib_1.__exportStar(__webpack_require__(292), exports);


/***/ }),
/* 291 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.connectAuth0Owner = exports.connectNode = exports.connectNodeIds = exports.connectNodeId = void 0;
const where_1 = __webpack_require__(292);
/**
 * The default way to connect is assumed to be by id's
 */
const connectNodeId = (id) => (0, exports.connectNode)('id', id);
exports.connectNodeId = connectNodeId;
const connectNodeIds = (ids = []) => ({
    connect: ids.map((id) => (0, where_1.whereNodeId)(id)),
});
exports.connectNodeIds = connectNodeIds;
const connectNode = (key, value) => value
    ? {
        connect: (0, where_1.whereNode)(key, value),
    }
    : undefined;
exports.connectNode = connectNode;
const connectAuth0Owner = ({ auth0Id }) => (0, exports.connectNode)('auth0Id', auth0Id);
exports.connectAuth0Owner = connectAuth0Owner;


/***/ }),
/* 292 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.whereManyAll = exports.whereAll = exports.whereMaybeNode = exports.whereNode = exports.whereMaybeNodeIds = exports.whereMaybeNodeId = exports.whereNullableNodeIds = exports.whereNullableNodeId = exports.whereNodeIds = exports.whereNodeId = void 0;
const whereNodeId = (id) => (0, exports.whereNode)('id', id);
exports.whereNodeId = whereNodeId;
const whereNodeIds = (ids) => ids.map((id) => (0, exports.whereNodeId)(id));
exports.whereNodeIds = whereNodeIds;
/**
 * Trying this version out before combining, so we don't break others
 */
const whereNullableNodeId = (id) => id ? (0, exports.whereNodeId)(id) : null;
exports.whereNullableNodeId = whereNullableNodeId;
const whereNullableNodeIds = (ids) => ids ? (0, exports.whereNodeIds)(ids) : null;
exports.whereNullableNodeIds = whereNullableNodeIds;
/**
 * Not sure if we should use `null` or `undefined`
 */
const whereMaybeNodeId = (id) => id ? (0, exports.whereNodeId)(id) : undefined;
exports.whereMaybeNodeId = whereMaybeNodeId;
const whereMaybeNodeIds = (ids) => ids ? (0, exports.whereNodeIds)(ids) : undefined;
exports.whereMaybeNodeIds = whereMaybeNodeIds;
/**
 * Where node
 */
const whereNode = (key, value) => ({
    where: {
        node: {
            [key]: value,
        },
    },
});
exports.whereNode = whereNode;
const whereMaybeNode = (key, value) => value
    ? {
        where: {
            node: {
                [key]: value,
            },
        },
    }
    : undefined;
exports.whereMaybeNode = whereMaybeNode;
/**
 * Used for disconnecting everything
 */
const whereAll = () => ({ where: {} });
exports.whereAll = whereAll;
const whereManyAll = () => [{ where: {} }];
exports.whereManyAll = whereManyAll;


/***/ }),
/* 293 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.disconnectManyAll = exports.disconnectAll = exports.disconnectNode = exports.disconnectNodeIds = exports.disconnectNodeId = void 0;
const where_1 = __webpack_require__(292);
/**
 * Disconnect nodes
 */
const disconnectNodeId = (id) => (0, exports.disconnectNode)('id', id);
exports.disconnectNodeId = disconnectNodeId;
const disconnectNodeIds = (ids = []) => ({
    disconnect: ids.map((id) => (0, where_1.whereNodeId)(id)),
});
exports.disconnectNodeIds = disconnectNodeIds;
const disconnectNode = (key, value) => ({
    disconnect: value ? (0, where_1.whereNode)(key, value) : { where: {} },
});
exports.disconnectNode = disconnectNode;
/**
 * Disconnect all
 */
const disconnectAll = () => ({
    disconnect: (0, where_1.whereAll)(),
});
exports.disconnectAll = disconnectAll;
const disconnectManyAll = () => ({
    disconnect: (0, where_1.whereManyAll)(),
});
exports.disconnectManyAll = disconnectManyAll;


/***/ }),
/* 294 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createNode = void 0;
const createNode = (node) => ({
    create: {
        node,
    },
});
exports.createNode = createNode;


/***/ }),
/* 295 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.reconnectNodeIds = exports.reconnectNode = exports.reconnectNodeId = void 0;
const connect_1 = __webpack_require__(291);
const disconnect_1 = __webpack_require__(293);
/**
 * This disconnects all edges first
 */
const reconnectNodeId = (id) => (Object.assign(Object.assign({}, (0, connect_1.connectNodeId)(id)), (0, disconnect_1.disconnectAll)()));
exports.reconnectNodeId = reconnectNodeId;
const reconnectNode = (key, id) => (Object.assign(Object.assign({}, (0, connect_1.connectNode)(key, id)), (0, disconnect_1.disconnectAll)()));
exports.reconnectNode = reconnectNode;
const reconnectNodeIds = (ids) => {
    const connects = ids === null || ids === void 0 ? void 0 : ids.map((id) => (Object.assign({}, (0, connect_1.connectNodeIds)([id]))));
    return [(0, disconnect_1.disconnectManyAll)(), ...(connects !== null && connects !== void 0 ? connects : [])];
};
exports.reconnectNodeIds = reconnectNodeIds;


/***/ }),
/* 296 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(297), exports);


/***/ }),
/* 297 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getInterfaceName = exports.getApiName = exports.makeAllTypes = void 0;
const core_1 = __webpack_require__(86);
const utils_1 = __webpack_require__(35);
const makeAllTypes = (input) => Object.values(core_1.ITypeKind)
    .map((kind) => ({ [kind]: input }))
    .reduce((all, current) => (Object.assign(Object.assign({}, all), current)), {});
exports.makeAllTypes = makeAllTypes;
const getApiName = (name) => {
    return `${name} API`;
};
exports.getApiName = getApiName;
const getInterfaceName = (type) => `${(0, utils_1.compoundCaseToTitleCase)(type)} API`;
exports.getInterfaceName = getInterfaceName;
// export const makeFieldsCreateInput = (type: ICreateTypeDTO) => {
//   return {
//     connect: type.fields.map((f) => ({
//       where: { node: { id: f.type.id } },
//       edge: { name: f.name, description: f.description, key: f.key },
//     })),
//   }
// }


/***/ }),
/* 298 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArrayTypeRepository = void 0;
const tslib_1 = __webpack_require__(1);
const neo4j_1 = __webpack_require__(157);
const core_1 = __webpack_require__(287);
const mapper_1 = __webpack_require__(289);
class ArrayTypeRepository extends core_1.AbstractRepository {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "ArrayType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: neo4j_1.Repository.instance.ArrayType
        });
    }
    _find(where) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield (yield this.ArrayType).find({
                selectionSet: neo4j_1.exportArrayTypeSelectionSet,
                where,
            });
        });
    }
    _add(primitiveTypes) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.ArrayType).create({
                input: primitiveTypes.map((_a) => {
                    var { __typename, itemType, owner } = _a, type = tslib_1.__rest(_a, ["__typename", "itemType", "owner"]);
                    return (Object.assign(Object.assign({}, type), { itemType: (0, mapper_1.connectNodeId)(itemType === null || itemType === void 0 ? void 0 : itemType.id), owner: (0, mapper_1.connectAuth0Owner)(owner) }));
                }),
                selectionSet: `{ arrayTypes ${neo4j_1.exportArrayTypeSelectionSet} }`,
            })).arrayTypes;
        });
    }
    _update(_a, where) {
        var { __typename, id, itemType, name, owner } = _a, primitiveType = tslib_1.__rest(_a, ["__typename", "id", "itemType", "name", "owner"]);
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.ArrayType).update({
                selectionSet: `{ arrayTypes ${neo4j_1.exportArrayTypeSelectionSet} }`,
                update: {
                    itemType: (0, mapper_1.reconnectNodeId)(itemType === null || itemType === void 0 ? void 0 : itemType.id),
                    name,
                },
                where,
            })).arrayTypes[0];
        });
    }
}
exports.ArrayTypeRepository = ArrayTypeRepository;


/***/ }),
/* 299 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EnumTypeRepository = void 0;
const tslib_1 = __webpack_require__(1);
const neo4j_1 = __webpack_require__(157);
const core_1 = __webpack_require__(287);
const mapper_1 = __webpack_require__(289);
class EnumTypeRepository extends core_1.AbstractRepository {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "EnumType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: neo4j_1.Repository.instance.EnumType
        });
    }
    _find(where) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield (yield this.EnumType).find({
                selectionSet: neo4j_1.exportEnumTypeSelectionSet,
                where,
            });
        });
    }
    _add(enumTypes) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.EnumType).create({
                input: enumTypes.map((_a) => {
                    var { __typename, allowedValues, owner } = _a, enumType = tslib_1.__rest(_a, ["__typename", "allowedValues", "owner"]);
                    return (Object.assign(Object.assign({}, enumType), { allowedValues: this.mapCreateEnumTypeValues(allowedValues), owner: (0, mapper_1.connectAuth0Owner)(owner) }));
                }),
                selectionSet: `{ enumTypes ${neo4j_1.exportEnumTypeSelectionSet} }`,
            })).enumTypes;
        });
    }
    _update(_a, where) {
        var { __typename, allowedValues, id, name, owner } = _a, enumType = tslib_1.__rest(_a, ["__typename", "allowedValues", "id", "name", "owner"]);
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.EnumType).update({
                selectionSet: `{ enumTypes ${neo4j_1.exportEnumTypeSelectionSet} }`,
                update: {
                    allowedValues: this.mapUpdateEnumTypeValues(allowedValues),
                    name,
                },
                where,
            })).enumTypes[0];
        });
    }
    mapCreateEnumTypeValues(enumTypeValues) {
        return {
            create: enumTypeValues.map((enumTypeValue) => ({
                node: Object.assign({}, enumTypeValue),
            })),
        };
    }
    mapUpdateEnumTypeValues(enumTypeValues) {
        return enumTypeValues.map((_a) => {
            var { id } = _a, enumTypeValue = tslib_1.__rest(_a, ["id"]);
            return (Object.assign(Object.assign({}, (0, mapper_1.whereNodeId)(id)), { update: {
                    node: enumTypeValue,
                } }));
        });
    }
}
exports.EnumTypeRepository = EnumTypeRepository;


/***/ }),
/* 300 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FieldRepository = void 0;
const tslib_1 = __webpack_require__(1);
const neo4j_1 = __webpack_require__(157);
const core_1 = __webpack_require__(287);
const mapper_1 = __webpack_require__(289);
class FieldRepository extends core_1.AbstractRepository {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "Field", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: neo4j_1.Repository.instance.Field
        });
    }
    _find(where = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield (yield this.Field).find({
                selectionSet: neo4j_1.fieldSelectionSet,
                where,
            });
        });
    }
    _add(fields) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.Field).create({
                input: fields.map((_a) => {
                    var _b, _c;
                    var { api, fieldType } = _a, field = tslib_1.__rest(_a, ["api", "fieldType"]);
                    return (Object.assign(Object.assign({}, field), { api: (0, mapper_1.connectNodeId)(api.id), fieldType: (0, mapper_1.connectNodeId)(fieldType.id), nextSibling: (0, mapper_1.connectNodeId)((_b = field.nextSibling) === null || _b === void 0 ? void 0 : _b.id), prevSibling: (0, mapper_1.connectNodeId)((_c = field.prevSibling) === null || _c === void 0 ? void 0 : _c.id) }));
                }),
            })).fields;
        });
    }
    /**
     * For update, we can't assume if fields exist or not.
     *
     * Scenario: Say a field was deleted, then we run a seeder, we would have to create for the deleted field
     */
    _update(_a, where) {
        var _b, _c;
        var { api, fieldType, id } = _a, field = tslib_1.__rest(_a, ["api", "fieldType", "id"]);
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.Field).update({
                update: Object.assign(Object.assign({}, field), { api: (0, mapper_1.reconnectNodeId)(api.id), fieldType: (0, mapper_1.reconnectNodeId)(fieldType.id), nextSibling: (0, mapper_1.reconnectNodeId)((_b = field.nextSibling) === null || _b === void 0 ? void 0 : _b.id), prevSibling: (0, mapper_1.reconnectNodeId)((_c = field.prevSibling) === null || _c === void 0 ? void 0 : _c.id) }),
                where,
            })).fields[0];
        });
    }
}
exports.FieldRepository = FieldRepository;


/***/ }),
/* 301 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InterfaceTypeRepository = void 0;
const tslib_1 = __webpack_require__(1);
const neo4j_1 = __webpack_require__(157);
const core_1 = __webpack_require__(287);
const mapper_1 = __webpack_require__(289);
class InterfaceTypeRepository extends core_1.AbstractRepository {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "InterfaceType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: neo4j_1.Repository.instance.InterfaceType
        });
        /**
         * Don't update fields in interface. If done here, would have to assume the fields exist or not.
         *
         * Different logic exists for field update or creation here
         */
        // private mapUpdateFields(
        //   fields: Array<IField>,
        // ): InterfaceTypeFieldsUpdateFieldInput {
        //   return {
        //     create: fields.map(({ api, fieldType, ...field }) => ({
        //       node: {
        //         ...field,
        //         fieldType: connectNode(fieldType.id),
        //       },
        //     })),
        //   }
        // }
    }
    _find(where = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield (yield this.InterfaceType).find({
                selectionSet: neo4j_1.interfaceTypeSelectionSet,
                where,
            });
        });
    }
    /**
     * If interface doesn't exist, we can safely assume that fields don't exist as well. So fields will always be created.
     *
     * Even if interface was deleted & fields are not, it is no harm to leave those old fields un-attached. We could run a clean up process for un-attached fields
     */
    _add(interfaceTypes) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.InterfaceType).create({
                input: interfaceTypes.map((_a) => {
                    var { __typename, fields, owner } = _a, interfaceType = tslib_1.__rest(_a, ["__typename", "fields", "owner"]);
                    return (Object.assign(Object.assign({}, interfaceType), { 
                        // fields: this.mapCreateFields(fields),
                        fields: (0, mapper_1.connectNodeIds)(fields.map(({ id }) => id)), owner: (0, mapper_1.connectAuth0Owner)(owner) }));
                }),
                selectionSet: `{ interfaceTypes ${neo4j_1.interfaceTypeSelectionSet} }`,
            })).interfaceTypes;
        });
    }
    /**
     * For update, we can't assume if fields exist or not.
     *
     * Scenario: Say a field was deleted, then we run a seeder, we would have to create for the deleted field
     */
    _update(_a, where) {
        var { __typename, fields, id, name, owner } = _a, data = tslib_1.__rest(_a, ["__typename", "fields", "id", "name", "owner"]);
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.InterfaceType).update({
                selectionSet: `{ interfaceTypes ${neo4j_1.interfaceTypeSelectionSet} }`,
                update: {
                    name,
                    // fields: this.mapUpdateFields(fields),
                },
                where,
            })).interfaceTypes[0];
        });
    }
    mapCreateFields(fields) {
        return {
            create: fields.map((_a) => {
                var { api, fieldType, nextSibling, prevSibling } = _a, field = tslib_1.__rest(_a, ["api", "fieldType", "nextSibling", "prevSibling"]);
                return ({
                    node: Object.assign(Object.assign({}, field), { fieldType: (0, mapper_1.connectNodeId)(fieldType.id), nextSibling: (0, mapper_1.connectNodeId)(nextSibling === null || nextSibling === void 0 ? void 0 : nextSibling.id), prevSibling: (0, mapper_1.connectNodeId)(prevSibling === null || prevSibling === void 0 ? void 0 : prevSibling.id) }),
                });
            }),
        };
    }
}
exports.InterfaceTypeRepository = InterfaceTypeRepository;


/***/ }),
/* 302 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrimitiveTypeRepository = void 0;
const tslib_1 = __webpack_require__(1);
const neo4j_1 = __webpack_require__(157);
const core_1 = __webpack_require__(287);
const mapper_1 = __webpack_require__(289);
class PrimitiveTypeRepository extends core_1.AbstractRepository {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "PrimitiveType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: neo4j_1.Repository.instance.PrimitiveType
        });
    }
    _find(where) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield (yield this.PrimitiveType).find({
                selectionSet: neo4j_1.exportPrimitiveTypeSelectionSet,
                where,
            });
        });
    }
    _add(primitiveTypes) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.PrimitiveType).create({
                input: primitiveTypes.map((_a) => {
                    var { __typename, owner } = _a, type = tslib_1.__rest(_a, ["__typename", "owner"]);
                    return (Object.assign(Object.assign({}, type), { owner: (0, mapper_1.connectAuth0Owner)(owner) }));
                }),
                selectionSet: `{ primitiveTypes ${neo4j_1.exportPrimitiveTypeSelectionSet} }`,
            })).primitiveTypes;
        });
    }
    _update({ __typename, id, name, owner, primitiveKind }, where) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.PrimitiveType).update({
                selectionSet: `{ primitiveTypes ${neo4j_1.exportPrimitiveTypeSelectionSet} }`,
                update: { name },
                where,
            })).primitiveTypes[0];
        });
    }
}
exports.PrimitiveTypeRepository = PrimitiveTypeRepository;


/***/ }),
/* 303 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReactNodeTypeRepository = void 0;
const tslib_1 = __webpack_require__(1);
const neo4j_1 = __webpack_require__(157);
const core_1 = __webpack_require__(287);
const mapper_1 = __webpack_require__(289);
class ReactNodeTypeRepository extends core_1.AbstractRepository {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "ReactNodeType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: neo4j_1.Repository.instance.ReactNodeType
        });
    }
    _find(where) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield (yield this.ReactNodeType).find({
                selectionSet: neo4j_1.exportReactNodeTypeSelectionSet,
                where,
            });
        });
    }
    _add(reactNodeTypes) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.ReactNodeType).create({
                input: reactNodeTypes.map((_a) => {
                    var { __typename, owner } = _a, reactNodeType = tslib_1.__rest(_a, ["__typename", "owner"]);
                    return (Object.assign(Object.assign({}, reactNodeType), { owner: (0, mapper_1.connectAuth0Owner)(owner) }));
                }),
                selectionSet: `{ reactNodeTypes ${neo4j_1.exportReactNodeTypeSelectionSet} }`,
            })).reactNodeTypes;
        });
    }
    _update({ __typename, id, name, owner }, where) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.ReactNodeType).update({
                selectionSet: `{ reactNodeTypes ${neo4j_1.exportReactNodeTypeSelectionSet} }`,
                update: { name },
                where,
            })).reactNodeTypes[0];
        });
    }
}
exports.ReactNodeTypeRepository = ReactNodeTypeRepository;


/***/ }),
/* 304 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RenderPropTypeRepository = void 0;
const tslib_1 = __webpack_require__(1);
const neo4j_1 = __webpack_require__(157);
const core_1 = __webpack_require__(287);
const mapper_1 = __webpack_require__(289);
class RenderPropTypeRepository extends core_1.AbstractRepository {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "RenderPropType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: neo4j_1.Repository.instance.RenderPropType
        });
    }
    _find(where) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield (yield this.RenderPropType).find({
                selectionSet: neo4j_1.exportRenderPropTypeSelectionSet,
                where,
            });
        });
    }
    _add(renderPropTypes) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.RenderPropType).create({
                input: renderPropTypes.map((_a) => {
                    var { __typename, owner } = _a, renderPropType = tslib_1.__rest(_a, ["__typename", "owner"]);
                    return (Object.assign(Object.assign({}, renderPropType), { owner: (0, mapper_1.connectAuth0Owner)(owner) }));
                }),
                selectionSet: `{ renderPropTypes ${neo4j_1.exportRenderPropTypeSelectionSet} }`,
            })).renderPropTypes;
        });
    }
    _update({ __typename, id, name, owner }, where) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.RenderPropType).update({
                selectionSet: `{ renderPropTypes ${neo4j_1.exportRenderPropTypeSelectionSet} }`,
                update: { name },
                where,
            })).renderPropTypes[0];
        });
    }
}
exports.RenderPropTypeRepository = RenderPropTypeRepository;


/***/ }),
/* 305 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UnionTypeRepository = void 0;
const tslib_1 = __webpack_require__(1);
const neo4j_1 = __webpack_require__(157);
const core_1 = __webpack_require__(287);
const mapper_1 = __webpack_require__(289);
class UnionTypeRepository extends core_1.AbstractRepository {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "UnionType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: neo4j_1.Repository.instance.UnionType
        });
    }
    _find(where) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield (yield this.UnionType).find({
                selectionSet: neo4j_1.exportUnionTypeSelectionSet,
                where,
            });
        });
    }
    _add(unionTypes) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.UnionType).create({
                input: unionTypes.map((_a) => {
                    var { __typename, owner, typesOfUnionType } = _a, type = tslib_1.__rest(_a, ["__typename", "owner", "typesOfUnionType"]);
                    const connectIds = typesOfUnionType.map(({ id }) => id);
                    return Object.assign(Object.assign({}, type), { owner: (0, mapper_1.connectAuth0Owner)(owner), typesOfUnionType: {
                            ArrayType: (0, mapper_1.connectNodeIds)(connectIds),
                            EnumType: (0, mapper_1.connectNodeIds)(connectIds),
                            InterfaceType: (0, mapper_1.connectNodeIds)(connectIds),
                            PrimitiveType: (0, mapper_1.connectNodeIds)(connectIds),
                            ReactNodeType: (0, mapper_1.connectNodeIds)(connectIds),
                            RenderPropType: (0, mapper_1.connectNodeIds)(connectIds),
                        } });
                }),
                selectionSet: `{ unionTypes ${neo4j_1.exportUnionTypeSelectionSet} }`,
            })).unionTypes;
        });
    }
    _update({ id, name, typesOfUnionType }, where) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const connectIds = typesOfUnionType.map(({ id: typeId }) => typeId);
            return (yield (yield this.UnionType).update({
                selectionSet: `{ unionTypes ${neo4j_1.exportUnionTypeSelectionSet} }`,
                update: {
                    id,
                    name,
                    typesOfUnionType: {
                        ArrayType: [(0, mapper_1.connectNodeIds)(connectIds)],
                        EnumType: [(0, mapper_1.connectNodeIds)(connectIds)],
                        InterfaceType: [(0, mapper_1.connectNodeIds)(connectIds)],
                        PrimitiveType: [(0, mapper_1.connectNodeIds)(connectIds)],
                        ReactNodeType: [(0, mapper_1.connectNodeIds)(connectIds)],
                        RenderPropType: [(0, mapper_1.connectNodeIds)(connectIds)],
                    },
                },
                where,
            })).unionTypes[0];
        });
    }
}
exports.UnionTypeRepository = UnionTypeRepository;


/***/ }),
/* 306 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(307), exports);
tslib_1.__exportStar(__webpack_require__(315), exports);
tslib_1.__exportStar(__webpack_require__(562), exports);
tslib_1.__exportStar(__webpack_require__(565), exports);


/***/ }),
/* 307 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(308), exports);
tslib_1.__exportStar(__webpack_require__(312), exports);
tslib_1.__exportStar(__webpack_require__(313), exports);
tslib_1.__exportStar(__webpack_require__(314), exports);


/***/ }),
/* 308 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exportAdminTypes = void 0;
const tslib_1 = __webpack_require__(1);
const codegen_1 = __webpack_require__(309);
const neo4j_1 = __webpack_require__(157);
const core_1 = __webpack_require__(86);
const sort_1 = __webpack_require__(311);
/**
 * These are types created by the admin, mostly types related to an atom.
 *
 * We export api separately since those can be it's own file
 */
const exportAdminTypes = (props = {}) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const EnumType = yield neo4j_1.Repository.instance.EnumType;
    const InterfaceType = yield neo4j_1.Repository.instance.InterfaceType;
    const Field = yield neo4j_1.Repository.instance.Field;
    const Array = yield neo4j_1.Repository.instance.ArrayType;
    const UnionType = yield neo4j_1.Repository.instance.UnionType;
    /**
     * UnionTypes
     */
    const unionTypes = yield UnionType.find({
        options: {
            sort: [{ name: codegen_1.SortDirection.Asc }],
        },
        selectionSet: neo4j_1.exportUnionTypeSelectionSet,
        where: {
            id_IN: (_a = props.apiFields) === null || _a === void 0 ? void 0 : _a.map((field) => field.fieldType.id),
        },
    });
    /**
     * Array
     */
    const arrayTypes = yield Array.find({
        options: {
            sort: [{ name: codegen_1.SortDirection.Asc }],
        },
        selectionSet: neo4j_1.exportArrayTypeSelectionSet,
        where: {
            fieldRefsConnection: {
                node: {
                    apiConnection: {
                        node: {
                            id: props.apiId,
                        },
                    },
                },
            },
        },
    });
    /**
     * Find interface types of the array types' items
     */
    const arrayInterfaceItemTypes = yield InterfaceType.find({
        options: {
            sort: [{ name: codegen_1.SortDirection.Asc }],
        },
        selectionSet: neo4j_1.exportInterfaceTypeSelectionSet,
        where: {
            id_IN: arrayTypes
                .filter((arrayType) => arrayType.itemType.kind === core_1.ITypeKind.InterfaceType)
                .map((arrayType) => arrayType.itemType.id),
        },
    });
    /**
     * Enum
     */
    const enumTypes = (yield EnumType.find({
        options: {
            sort: [{ name: codegen_1.SortDirection.Asc }],
        },
        selectionSet: neo4j_1.exportEnumTypeSelectionSet,
        where: props.apiId
            ? {
                fieldRefsConnection: {
                    node: {
                        apiConnection: {
                            node: {
                                id: props.apiId,
                            },
                        },
                    },
                },
            }
            : undefined,
    })).map((type) => (Object.assign(Object.assign({}, type), { allowedValues: type.allowedValues.sort((a, b) => a.key.toString().localeCompare(b.key)) })));
    /**
     * Get dependent types of top level atom API
     */
    const firstLevelInterfaceTypes = (0, sort_1.sortInterfaceTypesFields)(yield InterfaceType.find({
        options: {
            sort: [{ name: codegen_1.SortDirection.Asc }],
        },
        selectionSet: neo4j_1.exportInterfaceTypeSelectionSet,
        where: {
            OR: [
                // Find api 1 level deep
                {
                    fieldRefsConnection: {
                        node: { apiConnection: { node: { id: props.apiId } } },
                    },
                },
                // Find api 2 levels deep
                // This is too slow
                // {
                //   fieldConnection: {
                //     node: {
                //       apiConnection: {
                //         node: {
                //           fieldConnection: {
                //             node: { apiConnection: { node: { id: props.apiId } } },
                //           },
                //         },
                //       },
                //     },
                //   },
                // },
            ],
        },
    }));
    const secondLevelInterfaceTypes = (0, sort_1.sortInterfaceTypesFields)(yield InterfaceType.find({
        options: {
            sort: [{ name: codegen_1.SortDirection.Asc }],
        },
        selectionSet: neo4j_1.exportInterfaceTypeSelectionSet,
        where: {
            fieldRefsConnection: {
                node: {
                    apiConnection: {
                        node: {
                            id_IN: firstLevelInterfaceTypes.map((api) => api.id),
                        },
                    },
                },
            },
        },
    }));
    /**
     * Get all fields related to interface type
     */
    const fields = yield Field.find({
        options: {
            sort: [{ key: codegen_1.SortDirection.Asc }],
        },
        selectionSet: neo4j_1.exportFieldSelectionSet,
        where: {
            api: {
                id_IN: [
                    ...firstLevelInterfaceTypes,
                    ...secondLevelInterfaceTypes,
                    ...arrayInterfaceItemTypes,
                ].map((api) => api.id),
            },
        },
    });
    const types = [
        ...enumTypes,
        ...firstLevelInterfaceTypes,
        ...secondLevelInterfaceTypes,
        ...arrayInterfaceItemTypes,
        ...arrayTypes,
        ...unionTypes,
    ];
    const withSubTypes = types.filter((type) => type.kind === core_1.ITypeKind.InterfaceType ||
        type.kind === core_1.ITypeKind.ArrayType);
    if (!withSubTypes.length) {
        return {
            fields,
            types: types.flat(),
        };
    }
    /**
     * Get all subtypes of interface types and array types
     */
    const subTypes = yield Promise.all(withSubTypes.map((subType) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        return yield (0, exports.exportAdminTypes)({
            apiFields: fields.filter((field) => field.fieldType.id === subType.id),
            apiId: subType.id,
        });
    })));
    /**
     * Here we create the interface dependency tree order
     *
     * Further to the front are closer to the leaf.
     *
     * Subtypes are included first so that they can be referenced in the parent type
     */
    return {
        fields: [...subTypes.map((value) => value.fields).flat(), ...fields],
        types: [...subTypes.map((subType) => subType.types).flat(), ...types],
    };
});
exports.exportAdminTypes = exportAdminTypes;


/***/ }),
/* 309 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(310), exports);


/***/ }),
/* 310 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypeKind = exports.SortDirection = exports.Role = exports.ResourceType = exports.RenderTypeKind = exports.PrimitiveTypeKind = exports.PageKind = exports.ElementTypeKind = exports.CodeMirrorLanguage = exports.AtomType = exports.ActionKind = void 0;
var ActionKind;
(function (ActionKind) {
    /** Action with custom code */
    ActionKind["CodeAction"] = "CodeAction";
    /** Action responsible for fetching data from a resource */
    ActionKind["ApiAction"] = "ApiAction";
})(ActionKind = exports.ActionKind || (exports.ActionKind = {}));
var AtomType;
(function (AtomType) {
    AtomType["AntDesignAffix"] = "AntDesignAffix";
    AtomType["AntDesignAlert"] = "AntDesignAlert";
    AtomType["AntDesignAnchor"] = "AntDesignAnchor";
    AtomType["AntDesignAnchorLink"] = "AntDesignAnchorLink";
    AtomType["AntDesignAutoComplete"] = "AntDesignAutoComplete";
    AtomType["AntDesignAvatar"] = "AntDesignAvatar";
    AtomType["AntDesignBackTop"] = "AntDesignBackTop";
    AtomType["AntDesignBadge"] = "AntDesignBadge";
    AtomType["AntDesignBreadcrumb"] = "AntDesignBreadcrumb";
    AtomType["AntDesignBreadcrumbItem"] = "AntDesignBreadcrumbItem";
    AtomType["AntDesignCard"] = "AntDesignCard";
    AtomType["AntDesignCardGrid"] = "AntDesignCardGrid";
    AtomType["AntDesignBreadcrumbSeparator"] = "AntDesignBreadcrumbSeparator";
    AtomType["AntDesignButton"] = "AntDesignButton";
    AtomType["AntDesignCalendar"] = "AntDesignCalendar";
    AtomType["AntDesignCollapsePanel"] = "AntDesignCollapsePanel";
    AtomType["AntDesignComment"] = "AntDesignComment";
    AtomType["AntDesignConfigProvider"] = "AntDesignConfigProvider";
    AtomType["AntDesignDatePicker"] = "AntDesignDatePicker";
    AtomType["AntDesignDescriptions"] = "AntDesignDescriptions";
    AtomType["AntDesignCheckbox"] = "AntDesignCheckbox";
    AtomType["AntDesignCheckboxGroup"] = "AntDesignCheckboxGroup";
    AtomType["AntDesignCollapse"] = "AntDesignCollapse";
    AtomType["AntDesignDropdown"] = "AntDesignDropdown";
    AtomType["AntDesignCardMeta"] = "AntDesignCardMeta";
    AtomType["AntDesignForm"] = "AntDesignForm";
    AtomType["AntDesignFormErrorList"] = "AntDesignFormErrorList";
    AtomType["AntDesignFormItem"] = "AntDesignFormItem";
    AtomType["AntDesignDivider"] = "AntDesignDivider";
    AtomType["AntDesignDrawer"] = "AntDesignDrawer";
    AtomType["AntDesignFormProvider"] = "AntDesignFormProvider";
    AtomType["AntDesignDropdownButton"] = "AntDesignDropdownButton";
    AtomType["AntDesignEmpty"] = "AntDesignEmpty";
    AtomType["AntDesignImage"] = "AntDesignImage";
    AtomType["AntDesignDescriptionsItem"] = "AntDesignDescriptionsItem";
    AtomType["AntDesignFormList"] = "AntDesignFormList";
    AtomType["AntDesignCascader"] = "AntDesignCascader";
    AtomType["AntDesignLayoutFooter"] = "AntDesignLayoutFooter";
    AtomType["AntDesignLayoutHeader"] = "AntDesignLayoutHeader";
    AtomType["AntDesignLayoutSider"] = "AntDesignLayoutSider";
    AtomType["AntDesignIcon"] = "AntDesignIcon";
    AtomType["AntDesignInput"] = "AntDesignInput";
    AtomType["AntDesignInputNumber"] = "AntDesignInputNumber";
    AtomType["AntDesignLayout"] = "AntDesignLayout";
    AtomType["AntDesignLayoutContent"] = "AntDesignLayoutContent";
    AtomType["AntDesignMentionsOption"] = "AntDesignMentionsOption";
    AtomType["AntDesignMenu"] = "AntDesignMenu";
    AtomType["AntDesignGridRow"] = "AntDesignGridRow";
    AtomType["AntDesignList"] = "AntDesignList";
    AtomType["AntDesignListItem"] = "AntDesignListItem";
    AtomType["AntDesignMessage"] = "AntDesignMessage";
    AtomType["AntDesignMentions"] = "AntDesignMentions";
    AtomType["AntDesignGridCol"] = "AntDesignGridCol";
    AtomType["AntDesignProgress"] = "AntDesignProgress";
    AtomType["AntDesignNotification"] = "AntDesignNotification";
    AtomType["AntDesignRadio"] = "AntDesignRadio";
    AtomType["AntDesignListItemMeta"] = "AntDesignListItemMeta";
    AtomType["AntDesignPagination"] = "AntDesignPagination";
    AtomType["AntDesignPopconfirm"] = "AntDesignPopconfirm";
    AtomType["AntDesignPopover"] = "AntDesignPopover";
    AtomType["AntDesignResult"] = "AntDesignResult";
    AtomType["AntDesignModal"] = "AntDesignModal";
    AtomType["AntDesignSegmented"] = "AntDesignSegmented";
    AtomType["AntDesignRadioGroup"] = "AntDesignRadioGroup";
    AtomType["AntDesignRate"] = "AntDesignRate";
    AtomType["AntDesignStatistic"] = "AntDesignStatistic";
    AtomType["AntDesignSteps"] = "AntDesignSteps";
    AtomType["AntDesignSelectOption"] = "AntDesignSelectOption";
    AtomType["AntDesignSkeleton"] = "AntDesignSkeleton";
    AtomType["AntDesignSlider"] = "AntDesignSlider";
    AtomType["AntDesignSpace"] = "AntDesignSpace";
    AtomType["AntDesignSpin"] = "AntDesignSpin";
    AtomType["AntDesignTag"] = "AntDesignTag";
    AtomType["AntDesignSelect"] = "AntDesignSelect";
    AtomType["AntDesignStepsStep"] = "AntDesignStepsStep";
    AtomType["AntDesignSwitch"] = "AntDesignSwitch";
    AtomType["AntDesignTable"] = "AntDesignTable";
    AtomType["AntDesignTabs"] = "AntDesignTabs";
    AtomType["AntDesignTabsTabPane"] = "AntDesignTabsTabPane";
    AtomType["AntDesignTreeSelect"] = "AntDesignTreeSelect";
    AtomType["AntDesignTimeline"] = "AntDesignTimeline";
    AtomType["AntDesignTimelineItem"] = "AntDesignTimelineItem";
    AtomType["AntDesignTooltip"] = "AntDesignTooltip";
    AtomType["AntDesignTransfer"] = "AntDesignTransfer";
    AtomType["AntDesignTree"] = "AntDesignTree";
    AtomType["AntDesignTimePicker"] = "AntDesignTimePicker";
    AtomType["AntDesignTypographyParagraph"] = "AntDesignTypographyParagraph";
    AtomType["AntDesignTypographyText"] = "AntDesignTypographyText";
    AtomType["AntDesignTypographyTitle"] = "AntDesignTypographyTitle";
    AtomType["AntDesignUpload"] = "AntDesignUpload";
    AtomType["AntDesignCarousel"] = "AntDesignCarousel";
    AtomType["MuiAccordion"] = "MuiAccordion";
    AtomType["MuiAccordionActions"] = "MuiAccordionActions";
    AtomType["MuiAccordionDetails"] = "MuiAccordionDetails";
    AtomType["MuiAccordionSummary"] = "MuiAccordionSummary";
    AtomType["MuiAlert"] = "MuiAlert";
    AtomType["MuiAlertTitle"] = "MuiAlertTitle";
    AtomType["MuiAppBar"] = "MuiAppBar";
    AtomType["MuiAutocomplete"] = "MuiAutocomplete";
    AtomType["MuiAvatar"] = "MuiAvatar";
    AtomType["MuiAvatarGroup"] = "MuiAvatarGroup";
    AtomType["MuiBackdrop"] = "MuiBackdrop";
    AtomType["MuiBadge"] = "MuiBadge";
    AtomType["MuiBadgeUnstyled"] = "MuiBadgeUnstyled";
    AtomType["MuiBottomNavigation"] = "MuiBottomNavigation";
    AtomType["MuiBottomNavigationAction"] = "MuiBottomNavigationAction";
    AtomType["MuiBox"] = "MuiBox";
    AtomType["MuiBreadcrumbs"] = "MuiBreadcrumbs";
    AtomType["MuiButton"] = "MuiButton";
    AtomType["MuiButtonBase"] = "MuiButtonBase";
    AtomType["MuiButtonGroup"] = "MuiButtonGroup";
    AtomType["MuiButtonUnstyled"] = "MuiButtonUnstyled";
    AtomType["MuiCalendarPicker"] = "MuiCalendarPicker";
    AtomType["MuiCalendarPickerSkeleton"] = "MuiCalendarPickerSkeleton";
    AtomType["MuiCard"] = "MuiCard";
    AtomType["MuiCardActionArea"] = "MuiCardActionArea";
    AtomType["MuiCardActions"] = "MuiCardActions";
    AtomType["MuiCardContent"] = "MuiCardContent";
    AtomType["MuiCardHeader"] = "MuiCardHeader";
    AtomType["MuiCardMedia"] = "MuiCardMedia";
    AtomType["MuiCheckbox"] = "MuiCheckbox";
    AtomType["MuiChip"] = "MuiChip";
    AtomType["MuiCircularProgress"] = "MuiCircularProgress";
    AtomType["MuiClickAwayListener"] = "MuiClickAwayListener";
    AtomType["MuiClockPicker"] = "MuiClockPicker";
    AtomType["MuiCollapse"] = "MuiCollapse";
    AtomType["MuiContainer"] = "MuiContainer";
    AtomType["MuiCssBaseline"] = "MuiCssBaseline";
    AtomType["MuiDataGrid"] = "MuiDataGrid";
    AtomType["MuiGridColDef"] = "MuiGridColDef";
    AtomType["MuiDatePicker"] = "MuiDatePicker";
    AtomType["MuiDateRangePicker"] = "MuiDateRangePicker";
    AtomType["MuiDateRangePickerDay"] = "MuiDateRangePickerDay";
    AtomType["MuiDateTimePicker"] = "MuiDateTimePicker";
    AtomType["MuiDesktopDatePicker"] = "MuiDesktopDatePicker";
    AtomType["MuiDesktopDateRangePicker"] = "MuiDesktopDateRangePicker";
    AtomType["MuiDesktopDateTimePicker"] = "MuiDesktopDateTimePicker";
    AtomType["MuiDesktopTimePicker"] = "MuiDesktopTimePicker";
    AtomType["MuiDialog"] = "MuiDialog";
    AtomType["MuiDialogActions"] = "MuiDialogActions";
    AtomType["MuiDialogContent"] = "MuiDialogContent";
    AtomType["MuiDialogContentText"] = "MuiDialogContentText";
    AtomType["MuiDialogTitle"] = "MuiDialogTitle";
    AtomType["MuiDivider"] = "MuiDivider";
    AtomType["MuiDrawer"] = "MuiDrawer";
    AtomType["MuiFab"] = "MuiFab";
    AtomType["MuiFade"] = "MuiFade";
    AtomType["MuiFilledInput"] = "MuiFilledInput";
    AtomType["MuiFormControl"] = "MuiFormControl";
    AtomType["MuiFormControlLabel"] = "MuiFormControlLabel";
    AtomType["MuiFormControlUnstyled"] = "MuiFormControlUnstyled";
    AtomType["MuiFormGroup"] = "MuiFormGroup";
    AtomType["MuiFormHelperText"] = "MuiFormHelperText";
    AtomType["MuiFormLabel"] = "MuiFormLabel";
    AtomType["MuiGlobalStyles"] = "MuiGlobalStyles";
    AtomType["MuiGrid"] = "MuiGrid";
    AtomType["MuiGrow"] = "MuiGrow";
    AtomType["MuiHidden"] = "MuiHidden";
    AtomType["MuiIcon"] = "MuiIcon";
    AtomType["MuiIconButton"] = "MuiIconButton";
    AtomType["MuiImageList"] = "MuiImageList";
    AtomType["MuiImageListItem"] = "MuiImageListItem";
    AtomType["MuiImageListItemBar"] = "MuiImageListItemBar";
    AtomType["MuiInput"] = "MuiInput";
    AtomType["MuiInputAdornment"] = "MuiInputAdornment";
    AtomType["MuiInputBase"] = "MuiInputBase";
    AtomType["MuiInputLabel"] = "MuiInputLabel";
    AtomType["MuiLinearProgress"] = "MuiLinearProgress";
    AtomType["MuiLink"] = "MuiLink";
    AtomType["MuiList"] = "MuiList";
    AtomType["MuiListItem"] = "MuiListItem";
    AtomType["MuiListItemAvatar"] = "MuiListItemAvatar";
    AtomType["MuiListItemButton"] = "MuiListItemButton";
    AtomType["MuiListItemIcon"] = "MuiListItemIcon";
    AtomType["MuiListItemSecondaryAction"] = "MuiListItemSecondaryAction";
    AtomType["MuiListItemText"] = "MuiListItemText";
    AtomType["MuiListSubheader"] = "MuiListSubheader";
    AtomType["MuiLoadingButton"] = "MuiLoadingButton";
    AtomType["MuiMasonry"] = "MuiMasonry";
    AtomType["MuiMasonryItem"] = "MuiMasonryItem";
    AtomType["MuiMenu"] = "MuiMenu";
    AtomType["MuiMenuItem"] = "MuiMenuItem";
    AtomType["MuiMenuList"] = "MuiMenuList";
    AtomType["MuiMobileDatePicker"] = "MuiMobileDatePicker";
    AtomType["MuiMobileDateRangePicker"] = "MuiMobileDateRangePicker";
    AtomType["MuiMobileDateTimePicker"] = "MuiMobileDateTimePicker";
    AtomType["MuiMobileStepper"] = "MuiMobileStepper";
    AtomType["MuiMobileTimePicker"] = "MuiMobileTimePicker";
    AtomType["MuiModal"] = "MuiModal";
    AtomType["MuiModalUnstyled"] = "MuiModalUnstyled";
    AtomType["MuiMonthPicker"] = "MuiMonthPicker";
    AtomType["MuiNativeSelect"] = "MuiNativeSelect";
    AtomType["MuiNoSsr"] = "MuiNoSsr";
    AtomType["MuiOutlinedInput"] = "MuiOutlinedInput";
    AtomType["MuiPagination"] = "MuiPagination";
    AtomType["MuiPaginationItem"] = "MuiPaginationItem";
    AtomType["MuiPaper"] = "MuiPaper";
    AtomType["MuiPickersDay"] = "MuiPickersDay";
    AtomType["MuiPopover"] = "MuiPopover";
    AtomType["MuiPopper"] = "MuiPopper";
    AtomType["MuiPortal"] = "MuiPortal";
    AtomType["MuiRadio"] = "MuiRadio";
    AtomType["MuiRadioGroup"] = "MuiRadioGroup";
    AtomType["MuiRating"] = "MuiRating";
    AtomType["MuiScopedCssBaseline"] = "MuiScopedCssBaseline";
    AtomType["MuiSelect"] = "MuiSelect";
    AtomType["MuiSkeleton"] = "MuiSkeleton";
    AtomType["MuiSlide"] = "MuiSlide";
    AtomType["MuiSlider"] = "MuiSlider";
    AtomType["MuiSliderUnstyled"] = "MuiSliderUnstyled";
    AtomType["MuiSnackbar"] = "MuiSnackbar";
    AtomType["MuiSnackbarContent"] = "MuiSnackbarContent";
    AtomType["MuiSpeedDial"] = "MuiSpeedDial";
    AtomType["MuiSpeedDialAction"] = "MuiSpeedDialAction";
    AtomType["MuiSpeedDialIcon"] = "MuiSpeedDialIcon";
    AtomType["MuiStack"] = "MuiStack";
    AtomType["MuiStaticDatePicker"] = "MuiStaticDatePicker";
    AtomType["MuiStaticDateRangePicker"] = "MuiStaticDateRangePicker";
    AtomType["MuiStaticDateTimePicker"] = "MuiStaticDateTimePicker";
    AtomType["MuiStaticTimePicker"] = "MuiStaticTimePicker";
    AtomType["MuiStep"] = "MuiStep";
    AtomType["MuiStepButton"] = "MuiStepButton";
    AtomType["MuiStepConnector"] = "MuiStepConnector";
    AtomType["MuiStepContent"] = "MuiStepContent";
    AtomType["MuiStepIcon"] = "MuiStepIcon";
    AtomType["MuiStepLabel"] = "MuiStepLabel";
    AtomType["MuiStepper"] = "MuiStepper";
    AtomType["MuiSvgIcon"] = "MuiSvgIcon";
    AtomType["MuiSwipeableDrawer"] = "MuiSwipeableDrawer";
    AtomType["MuiSwitch"] = "MuiSwitch";
    AtomType["MuiSwitchUnstyled"] = "MuiSwitchUnstyled";
    AtomType["MuiTab"] = "MuiTab";
    AtomType["MuiTabContext"] = "MuiTabContext";
    AtomType["MuiTabList"] = "MuiTabList";
    AtomType["MuiTabPanel"] = "MuiTabPanel";
    AtomType["MuiTabScrollButton"] = "MuiTabScrollButton";
    AtomType["MuiTable"] = "MuiTable";
    AtomType["MuiTableBody"] = "MuiTableBody";
    AtomType["MuiTableCell"] = "MuiTableCell";
    AtomType["MuiTableContainer"] = "MuiTableContainer";
    AtomType["MuiTableFooter"] = "MuiTableFooter";
    AtomType["MuiTableHead"] = "MuiTableHead";
    AtomType["MuiTablePagination"] = "MuiTablePagination";
    AtomType["MuiTableRow"] = "MuiTableRow";
    AtomType["MuiTableSortLabel"] = "MuiTableSortLabel";
    AtomType["MuiTabs"] = "MuiTabs";
    AtomType["MuiTextField"] = "MuiTextField";
    AtomType["MuiTextareaAutosize"] = "MuiTextareaAutosize";
    AtomType["MuiTimePicker"] = "MuiTimePicker";
    AtomType["MuiTimeline"] = "MuiTimeline";
    AtomType["MuiTimelineConnector"] = "MuiTimelineConnector";
    AtomType["MuiTimelineContent"] = "MuiTimelineContent";
    AtomType["MuiTimelineDot"] = "MuiTimelineDot";
    AtomType["MuiTimelineItem"] = "MuiTimelineItem";
    AtomType["MuiTimelineOppositeContent"] = "MuiTimelineOppositeContent";
    AtomType["MuiTimelineSeparator"] = "MuiTimelineSeparator";
    AtomType["MuiToggleButton"] = "MuiToggleButton";
    AtomType["MuiToggleButtonGroup"] = "MuiToggleButtonGroup";
    AtomType["MuiToolbar"] = "MuiToolbar";
    AtomType["MuiTooltip"] = "MuiTooltip";
    AtomType["MuiTreeItem"] = "MuiTreeItem";
    AtomType["MuiTreeView"] = "MuiTreeView";
    AtomType["MuiTypography"] = "MuiTypography";
    AtomType["MuiUnstableTrapFocus"] = "MuiUnstableTrapFocus";
    AtomType["MuiYearPicker"] = "MuiYearPicker";
    AtomType["MuiZoom"] = "MuiZoom";
    AtomType["Query"] = "Query";
    AtomType["TextList"] = "TextList";
    AtomType["Text"] = "Text";
    AtomType["Script"] = "Script";
    AtomType["State"] = "State";
    AtomType["GridLayout"] = "GridLayout";
    AtomType["HookGraphqlQuery"] = "HookGraphqlQuery";
    AtomType["HookGraphqlMutation"] = "HookGraphqlMutation";
    AtomType["HookRecoilState"] = "HookRecoilState";
    AtomType["HookRouter"] = "HookRouter";
    AtomType["HookQueryLambda"] = "HookQueryLambda";
    AtomType["HookQueryConfig"] = "HookQueryConfig";
    AtomType["HookQueryPages"] = "HookQueryPages";
    AtomType["HookQueryPage"] = "HookQueryPage";
    AtomType["ReactFragment"] = "ReactFragment";
    AtomType["HtmlA"] = "HtmlA";
    AtomType["HtmlAbbr"] = "HtmlAbbr";
    AtomType["HtmlArea"] = "HtmlArea";
    AtomType["HtmlArticle"] = "HtmlArticle";
    AtomType["HtmlAside"] = "HtmlAside";
    AtomType["HtmlAudio"] = "HtmlAudio";
    AtomType["HtmlB"] = "HtmlB";
    AtomType["HtmlBase"] = "HtmlBase";
    AtomType["HtmlBdo"] = "HtmlBdo";
    AtomType["HtmlBlockquote"] = "HtmlBlockquote";
    AtomType["HtmlBr"] = "HtmlBr";
    AtomType["HtmlButton"] = "HtmlButton";
    AtomType["HtmlCanvas"] = "HtmlCanvas";
    AtomType["HtmlCite"] = "HtmlCite";
    AtomType["HtmlCode"] = "HtmlCode";
    AtomType["HtmlCol"] = "HtmlCol";
    AtomType["HtmlDl"] = "HtmlDl";
    AtomType["HtmlData"] = "HtmlData";
    AtomType["HtmlDatalist"] = "HtmlDatalist";
    AtomType["HtmlDetails"] = "HtmlDetails";
    AtomType["HtmlDfn"] = "HtmlDfn";
    AtomType["HtmlDialog"] = "HtmlDialog";
    AtomType["HtmlDiv"] = "HtmlDiv";
    AtomType["HtmlEm"] = "HtmlEm";
    AtomType["HtmlEmbed"] = "HtmlEmbed";
    AtomType["HtmlFieldset"] = "HtmlFieldset";
    AtomType["HtmlFooter"] = "HtmlFooter";
    AtomType["HtmlForm"] = "HtmlForm";
    AtomType["HtmlH1"] = "HtmlH1";
    AtomType["HtmlH2"] = "HtmlH2";
    AtomType["HtmlH3"] = "HtmlH3";
    AtomType["HtmlH4"] = "HtmlH4";
    AtomType["HtmlH5"] = "HtmlH5";
    AtomType["HtmlH6"] = "HtmlH6";
    AtomType["HtmlHead"] = "HtmlHead";
    AtomType["HtmlHeader"] = "HtmlHeader";
    AtomType["HtmlHr"] = "HtmlHr";
    AtomType["HtmlI"] = "HtmlI";
    AtomType["HtmlIframe"] = "HtmlIframe";
    AtomType["HtmlImg"] = "HtmlImg";
    AtomType["HtmlInput"] = "HtmlInput";
    AtomType["HtmlKbd"] = "HtmlKbd";
    AtomType["HtmlLabel"] = "HtmlLabel";
    AtomType["HtmlLegend"] = "HtmlLegend";
    AtomType["HtmlLi"] = "HtmlLi";
    AtomType["HtmlLink"] = "HtmlLink";
    AtomType["HtmlMain"] = "HtmlMain";
    AtomType["HtmlMath"] = "HtmlMath";
    AtomType["HtmlMark"] = "HtmlMark";
    AtomType["HtmlMap"] = "HtmlMap";
    AtomType["HtmlMeta"] = "HtmlMeta";
    AtomType["HtmlMeter"] = "HtmlMeter";
    AtomType["HtmlNav"] = "HtmlNav";
    AtomType["HtmlNoscript"] = "HtmlNoscript";
    AtomType["HtmlOl"] = "HtmlOl";
    AtomType["HtmlObject"] = "HtmlObject";
    AtomType["HtmlOptgroup"] = "HtmlOptgroup";
    AtomType["HtmlOption"] = "HtmlOption";
    AtomType["HtmlOutput"] = "HtmlOutput";
    AtomType["HtmlP"] = "HtmlP";
    AtomType["HtmlParam"] = "HtmlParam";
    AtomType["HtmlPicture"] = "HtmlPicture";
    AtomType["HtmlPre"] = "HtmlPre";
    AtomType["HtmlProgress"] = "HtmlProgress";
    AtomType["HtmlQ"] = "HtmlQ";
    AtomType["HtmlRuby"] = "HtmlRuby";
    AtomType["HtmlS"] = "HtmlS";
    AtomType["HtmlSamp"] = "HtmlSamp";
    AtomType["HtmlScript"] = "HtmlScript";
    AtomType["HtmlSection"] = "HtmlSection";
    AtomType["HtmlSelect"] = "HtmlSelect";
    AtomType["HtmlSmall"] = "HtmlSmall";
    AtomType["HtmlSource"] = "HtmlSource";
    AtomType["HtmlSpan"] = "HtmlSpan";
    AtomType["HtmlStrong"] = "HtmlStrong";
    AtomType["HtmlStyle"] = "HtmlStyle";
    AtomType["HtmlSub"] = "HtmlSub";
    AtomType["HtmlSup"] = "HtmlSup";
    AtomType["HtmlSvg"] = "HtmlSvg";
    AtomType["HtmlTable"] = "HtmlTable";
    AtomType["HtmlCaption"] = "HtmlCaption";
    AtomType["HtmlTd"] = "HtmlTd";
    AtomType["HtmlTh"] = "HtmlTh";
    AtomType["HtmlTr"] = "HtmlTr";
    AtomType["HtmlTemplate"] = "HtmlTemplate";
    AtomType["HtmlTextarea"] = "HtmlTextarea";
    AtomType["HtmlTime"] = "HtmlTime";
    AtomType["HtmlTitle"] = "HtmlTitle";
    AtomType["HtmlTrack"] = "HtmlTrack";
    AtomType["HtmlU"] = "HtmlU";
    AtomType["HtmlUl"] = "HtmlUl";
    AtomType["HtmlVar"] = "HtmlVar";
    AtomType["HtmlVideo"] = "HtmlVideo";
    AtomType["HtmlWbr"] = "HtmlWbr";
    AtomType["ExternalComponent"] = "ExternalComponent";
})(AtomType = exports.AtomType || (exports.AtomType = {}));
var CodeMirrorLanguage;
(function (CodeMirrorLanguage) {
    CodeMirrorLanguage["Typescript"] = "Typescript";
    CodeMirrorLanguage["Javascript"] = "Javascript";
    CodeMirrorLanguage["Css"] = "Css";
    CodeMirrorLanguage["Json"] = "Json";
    CodeMirrorLanguage["Graphql"] = "Graphql";
    CodeMirrorLanguage["CssInJs"] = "CssInJs";
})(CodeMirrorLanguage = exports.CodeMirrorLanguage || (exports.CodeMirrorLanguage = {}));
var ElementTypeKind;
(function (ElementTypeKind) {
    ElementTypeKind["AllElements"] = "AllElements";
    ElementTypeKind["ChildrenOnly"] = "ChildrenOnly";
    ElementTypeKind["DescendantsOnly"] = "DescendantsOnly";
    ElementTypeKind["ExcludeDescendantsElements"] = "ExcludeDescendantsElements";
})(ElementTypeKind = exports.ElementTypeKind || (exports.ElementTypeKind = {}));
var PageKind;
(function (PageKind) {
    PageKind["Provider"] = "Provider";
    PageKind["InternalServerError"] = "InternalServerError";
    PageKind["NotFound"] = "NotFound";
    PageKind["Regular"] = "Regular";
})(PageKind = exports.PageKind || (exports.PageKind = {}));
var PrimitiveTypeKind;
(function (PrimitiveTypeKind) {
    PrimitiveTypeKind["String"] = "String";
    PrimitiveTypeKind["Integer"] = "Integer";
    PrimitiveTypeKind["Boolean"] = "Boolean";
    PrimitiveTypeKind["Number"] = "Number";
})(PrimitiveTypeKind = exports.PrimitiveTypeKind || (exports.PrimitiveTypeKind = {}));
var RenderTypeKind;
(function (RenderTypeKind) {
    RenderTypeKind["Atom"] = "Atom";
    RenderTypeKind["Component"] = "Component";
})(RenderTypeKind = exports.RenderTypeKind || (exports.RenderTypeKind = {}));
var ResourceType;
(function (ResourceType) {
    ResourceType["GraphQl"] = "GraphQL";
    ResourceType["Rest"] = "Rest";
})(ResourceType = exports.ResourceType || (exports.ResourceType = {}));
var Role;
(function (Role) {
    Role["User"] = "User";
    Role["Admin"] = "Admin";
})(Role = exports.Role || (exports.Role = {}));
var SortDirection;
(function (SortDirection) {
    /** Sort by field values in ascending order. */
    SortDirection["Asc"] = "ASC";
    /** Sort by field values in descending order. */
    SortDirection["Desc"] = "DESC";
})(SortDirection = exports.SortDirection || (exports.SortDirection = {}));
var TypeKind;
(function (TypeKind) {
    TypeKind["PrimitiveType"] = "PrimitiveType";
    TypeKind["EnumType"] = "EnumType";
    TypeKind["ArrayType"] = "ArrayType";
    TypeKind["InterfaceType"] = "InterfaceType";
    TypeKind["LambdaType"] = "LambdaType";
    TypeKind["ElementType"] = "ElementType";
    TypeKind["RenderPropType"] = "RenderPropType";
    TypeKind["ReactNodeType"] = "ReactNodeType";
    TypeKind["UnionType"] = "UnionType";
    TypeKind["CodeMirrorType"] = "CodeMirrorType";
    TypeKind["PageType"] = "PageType";
    TypeKind["AppType"] = "AppType";
    TypeKind["ActionType"] = "ActionType";
})(TypeKind = exports.TypeKind || (exports.TypeKind = {}));


/***/ }),
/* 311 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sortInterfaceTypesFields = void 0;
const sortInterfaceTypesFields = (interfaceTypes) => {
    return interfaceTypes.map((interfaceType) => (Object.assign(Object.assign({}, interfaceType), { fields: interfaceType.fields.sort((a, b) => (a.id > b.id ? 1 : -1)) })));
};
exports.sortInterfaceTypesFields = sortInterfaceTypesFields;


/***/ }),
/* 312 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exportAtomApis = void 0;
const tslib_1 = __webpack_require__(1);
const codegen_1 = __webpack_require__(309);
const neo4j_1 = __webpack_require__(157);
const sort_1 = __webpack_require__(311);
/**
 * These are types created by the admin, mostly types related to an atom.
 *
 * We export api separately since those can be it's own file
 */
const exportAtomApis = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    /**
     * Get all interfaces that are connected to atoms, here we don't do dependent types since Ant Design atoms don't have them (at least I haven't seen any)
     *
     * We will go through dependent types for user interfaces however
     */
    const InterfaceType = yield neo4j_1.Repository.instance.InterfaceType;
    const interfaceTypes = yield InterfaceType.find({
        options: {
            sort: [{ name: codegen_1.SortDirection.Asc }],
        },
        selectionSet: neo4j_1.exportInterfaceTypeSelectionSet,
        // Where it is assigned to atom
        where: {
            apiOfAtomsAggregate: {
                count_GTE: 0,
            },
        },
    });
    /**
     * Get all fields related to interface type
     */
    const Field = yield neo4j_1.Repository.instance.Field;
    const fields = yield Field.find({
        options: {
            sort: [{ key: codegen_1.SortDirection.Asc }],
        },
        selectionSet: neo4j_1.exportFieldSelectionSet,
        where: {
            api: {
                id_IN: interfaceTypes.map((api) => api.id),
            },
        },
    });
    /**
     * Here we create the interface dependency tree order
     *
     * Further to the front are closer to the leaf.
     */
    return { fields, types: (0, sort_1.sortInterfaceTypesFields)(interfaceTypes) };
});
exports.exportAtomApis = exportAtomApis;


/***/ }),
/* 313 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exportSystemTypes = void 0;
const tslib_1 = __webpack_require__(1);
const codegen_1 = __webpack_require__(309);
const neo4j_1 = __webpack_require__(157);
/**
 * These are required system types that other types reference
 */
const exportSystemTypes = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    /**
     * Export all primitive types
     */
    const PrimitiveType = yield neo4j_1.Repository.instance.PrimitiveType;
    const primitiveTypes = yield PrimitiveType.find({
        options: {
            sort: [{ name: codegen_1.SortDirection.Asc }],
        },
        selectionSet: neo4j_1.exportPrimitiveTypeSelectionSet,
    });
    /**
     * React Node Type
     */
    const ReactNodeType = yield neo4j_1.Repository.instance.ReactNodeType;
    // Only 1 here
    const reactNodeTypes = yield ReactNodeType.find({
        options: {
            sort: [{ name: codegen_1.SortDirection.Asc }],
        },
        selectionSet: neo4j_1.exportReactNodeTypeSelectionSet,
    });
    /**
     * Render Props Type
     */
    const RenderPropType = yield neo4j_1.Repository.instance.RenderPropType;
    // Only 1 here
    const renderPropTypes = yield RenderPropType.find({
        options: {
            sort: [{ name: codegen_1.SortDirection.Asc }],
        },
        selectionSet: neo4j_1.exportRenderPropTypeSelectionSet,
    });
    /**
     * ActionType
     */
    const ActionType = yield neo4j_1.Repository.instance.ActionType;
    const actionTypes = yield ActionType.find({
        options: {
            sort: [{ name: codegen_1.SortDirection.Asc }],
        },
        selectionSet: neo4j_1.exportActionTypeSelectionSet,
    });
    /**
     * Here we create the interface dependency tree order
     *
     * Further to the front are closer to the leaf.
     */
    return {
        fields: [],
        types: [
            ...primitiveTypes,
            ...renderPropTypes,
            ...reactNodeTypes,
            ...actionTypes,
        ],
    };
});
exports.exportSystemTypes = exportSystemTypes;


/***/ }),
/* 314 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exportUserTypes = void 0;
const tslib_1 = __webpack_require__(1);
const neo4j_1 = __webpack_require__(157);
const core_1 = __webpack_require__(86);
const exportUserTypes = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    /**
     * Export types
     */
    var _a, _b;
    /**
     * Export all types
     *
     * Go through each interface, then grab all descendant ids of it
     */
    const InterfaceType = yield neo4j_1.Repository.instance.InterfaceType;
    const interfaceTypes = yield InterfaceType.find({
        selectionSet: neo4j_1.exportInterfaceTypeSelectionSet,
        where: {
            apiOfAtomsAggregate: {
                count: 0,
            },
        },
    });
    /**
     * Here we create the interface dependency tree order
     *
     * Further to the front are closer to the leaf.
     */
    let dependentTypes = [];
    for (const interfaceType of interfaceTypes) {
        const driver = (0, neo4j_1.getDriver)();
        const session = driver.session();
        const results = yield session.run(neo4j_1.getTypeDescendantsOGM, {
            id: interfaceType.id,
        });
        // We pass in a single id, so only get 1 record, for each record, we want the first column
        const descendants = [
            ...((_b = (_a = results.records[0]) === null || _a === void 0 ? void 0 : _a.values()) !== null && _b !== void 0 ? _b : []),
        ][0];
        // We only get interface type descendants, since other types are pushed in front of interfaces
        const interfaceDescendants = descendants.filter((type) => type.kind === core_1.ITypeKind.InterfaceType);
        dependentTypes = [...interfaceDescendants, ...dependentTypes];
    }
    // Here we get all the types that needs to be added
    const orderedInterfaceTypes = dependentTypes
        .map((type) => {
        return interfaceTypes.find((interfaceType) => interfaceType.id === type.id);
    })
        .filter((type) => Boolean(type));
    // TODO: Need to fix type here
    return {
        fields: [],
        types: [...orderedInterfaceTypes],
    };
});
exports.exportUserTypes = exportUserTypes;


/***/ }),
/* 315 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(316), exports);


/***/ }),
/* 316 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExtractAntDesignFieldsService = void 0;
const tslib_1 = __webpack_require__(1);
const service_1 = __webpack_require__(24);
const type_1 = __webpack_require__(140);
const utils_1 = __webpack_require__(35);
const find_1 = tslib_1.__importDefault(__webpack_require__(317));
const uuid_1 = __webpack_require__(130);
const antd_type_adapter_service_1 = __webpack_require__(318);
const read_ant_design_apis_1 = __webpack_require__(541);
/**
 * Here we want to parse the CSV files from Ant Design and seed it as atoms
 *
 * We don't map the existing ids here
 */
class ExtractAntDesignFieldsService extends service_1.AuthUseCase {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "antdDataFolder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: `${process.cwd()}/data/antd-v5/`
        });
        Object.defineProperty(this, "fieldRepository", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new type_1.FieldRepository()
        });
    }
    /**
     * Extract data to be used for seeding, these data have already been mapped with correct ID for upsert
     */
    _execute(atoms) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const antDesignApis = yield (0, read_ant_design_apis_1.readAntDesignApis)(this.antdDataFolder);
            const fieldsByAtom = [];
            for (const atom of atoms) {
                const antDesignApi = (0, find_1.default)(antDesignApis, (api) => api.atom.name === atom.name.replace('AntDesign', '').toLowerCase());
                if (!antDesignApi) {
                    continue;
                }
                const fields = yield this.transformFields(atom, antDesignApi.fields);
                fieldsByAtom.push(...fields);
            }
            return fieldsByAtom;
        });
    }
    transformFields(atom, atomFields) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = [];
            for (const field of atomFields) {
                const existingOrNewField = yield this.createOrUpdateField(atom, field);
                if (existingOrNewField) {
                    result.push(existingOrNewField);
                }
            }
            return result;
        });
    }
    createOrUpdateField(atom, field) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const existingField = yield this.fieldRepository.findOne({
                api: {
                    id: atom.api.id,
                },
                key: field.property,
            });
            if (existingField) {
                return existingField;
            }
            const fieldTypeDTO = yield new antd_type_adapter_service_1.AntdTypeAdapterService({
                atom,
                field: {
                    key: field.property,
                },
                owner: this.owner,
            }).execute({ type: field.type });
            if (!fieldTypeDTO) {
                return undefined;
            }
            const type = yield type_1.TypeFactory.save(Object.assign(Object.assign({}, fieldTypeDTO), { owner: this.owner }), { name: fieldTypeDTO.name });
            return type_1.Field.create({
                api: { id: atom.api.id },
                defaultValues: null,
                description: field.description,
                fieldType: type,
                id: (0, uuid_1.v4)(),
                key: field.property,
                name: (0, utils_1.compoundCaseToTitleCase)(field.property),
            });
        });
    }
}
exports.ExtractAntDesignFieldsService = ExtractAntDesignFieldsService;


/***/ }),
/* 317 */
/***/ ((module) => {

module.exports = require("lodash/find");

/***/ }),
/* 318 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AntdTypeAdapterService = void 0;
const default_type_adapter_service_1 = __webpack_require__(319);
class AntdTypeAdapterService extends default_type_adapter_service_1.DefaultTypeAdapterService {
}
exports.AntdTypeAdapterService = AntdTypeAdapterService;


/***/ }),
/* 319 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DefaultTypeAdapterService = void 0;
const tslib_1 = __webpack_require__(1);
const service_1 = __webpack_require__(24);
const type_1 = __webpack_require__(140);
const utils_1 = __webpack_require__(320);
const core_1 = __webpack_require__(86);
const uuid_1 = __webpack_require__(130);
const parser_1 = __webpack_require__(133);
/**
 * Transform a string representation to the actual type
 *
 * - Will check if string format maps to a type
 *
 */
class DefaultTypeAdapterService extends service_1.AuthUseCase {
    constructor({ atom, field, owner }) {
        super(owner);
        Object.defineProperty(this, "primitiveTypeRepository", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new type_1.PrimitiveTypeRepository()
        });
        Object.defineProperty(this, "actionTypeRepository", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new type_1.ActionTypeRepository()
        });
        Object.defineProperty(this, "reactNodeTypeRepository", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new type_1.ReactNodeTypeRepository()
        });
        Object.defineProperty(this, "renderPropTypeRepository", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new type_1.RenderPropTypeRepository()
        });
        Object.defineProperty(this, "atom", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "field", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "reactNodeTypeRegex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: /(([:|=>] (ReactNode|HTMLElement))|ReactNode)/
        });
        Object.defineProperty(this, "renderPropTypeRegexes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [parser_1.arrowFnReturnReactNode, parser_1.es5FnReturnReactNode]
        });
        Object.defineProperty(this, "booleanTypeRegex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: /^boolean$/
        });
        Object.defineProperty(this, "stringTypeRegex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: /^string$/
        });
        Object.defineProperty(this, "numberTypeRegex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: /^number$/
        });
        Object.defineProperty(this, "integerTypeRegex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: /^integer$/
        });
        /**
         * This pattern ensures that it will match any string that starts with a { and ends with a }, even if there are multiple lines or nested objects within the interface type. The [\s\S]* part of the regex pattern matches any character, including whitespace and non-whitespace characters, zero or more times.
         */
        Object.defineProperty(this, "interfaceTypeRegex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: /^\{[\s\S]*}$/
        });
        Object.defineProperty(this, "containsInterfaceTypeRegex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: /{[\s\S]*}/
        });
        Object.defineProperty(this, "unionTypeRegex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: /\|/
        });
        Object.defineProperty(this, "actionTypeRegex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: /(^function\(.*?\))|((\(.*?\)) => \w)/
        });
        this.atom = atom;
        this.field = field;
    }
    _execute({ type }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const typeChecks = [
                {
                    check: this.isEnumType.bind(this),
                    transform: this.enumType.bind(this),
                },
                {
                    check: this.isReactNodeType.bind(this),
                    transform: this.reactNodeType.bind(this),
                },
                {
                    check: this.isRenderPropType.bind(this),
                    transform: this.renderPropType.bind(this),
                },
                {
                    check: this.isActionType.bind(this),
                    transform: this.actionType.bind(this),
                },
                {
                    check: this.isStringType.bind(this),
                    transform: this.stringType.bind(this),
                },
                {
                    check: this.isBooleanType.bind(this),
                    transform: this.booleanType.bind(this),
                },
                {
                    check: this.isNumberType.bind(this),
                    transform: this.numberType.bind(this),
                },
                {
                    check: this.isIntegerType.bind(this),
                    transform: this.integerType.bind(this),
                },
                {
                    check: this.isInterfaceType.bind(this),
                    transform: this.interfaceType.bind(this),
                },
                {
                    check: this.isUnionType.bind(this),
                    transform: this.unionType.bind(this),
                },
            ];
            const matchingTypeChecks = typeChecks.filter(({ check }) => check(type));
            if (matchingTypeChecks.length === 0) {
                console.warn(`No matching type check found for type: ${type}. Consider improving the code to handle this case.`);
                return;
            }
            if (matchingTypeChecks.length > 1) {
                const matchedKinds = matchingTypeChecks.map(({ transform }) => transform.name);
                console.error(`More than one type check matched for type: ${type}. The type checks should be mutually exclusive. Matched kinds: ${matchedKinds.join(', ')}`);
                throw new Error(`More than one type check matched for type: ${type}. The type checks should be mutually exclusive.`);
            }
            return yield ((_a = matchingTypeChecks[0]) === null || _a === void 0 ? void 0 : _a.transform(type));
        });
    }
    isNumberType(type) {
        return this.numberTypeRegex.test(type);
    }
    isStringType(type) {
        return this.stringTypeRegex.test(type);
    }
    /**
     * Must be a union type if contains a nested interface type
     */
    isEnumType(type) {
        if (this.containsInterfaceTypeRegex.test(type)) {
            return false;
        }
        return this.unionTypeRegex.test(type);
    }
    isBooleanType(type) {
        return this.booleanTypeRegex.test(type);
    }
    isActionType(type) {
        return this.actionTypeRegex.test(type);
    }
    isIntegerType(type) {
        return this.integerTypeRegex.test(type);
    }
    isUnionType(type) {
        return this.unionTypeRegex.test(type) && !this.interfaceTypeRegex.test(type);
    }
    isInterfaceType(type) {
        return this.interfaceTypeRegex.test(type);
    }
    isRenderPropType(type) {
        return this.renderPropTypeRegexes.some((regex) => regex.test(type));
    }
    actionType() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, utils_1.throwIfUndefined)(yield this.actionTypeRepository.findOne({ name: core_1.ITypeKind.ActionType }));
        });
    }
    reactNodeType() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, utils_1.throwIfUndefined)(yield this.reactNodeTypeRepository.findOne({
                name: core_1.ITypeKind.ReactNodeType,
            }));
        });
    }
    renderPropType() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, utils_1.throwIfUndefined)(yield this.renderPropTypeRepository.findOne({
                name: core_1.ITypeKind.RenderPropType,
            }));
        });
    }
    interfaceType() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const interfaceType = {
                __typename: core_1.ITypeKind.InterfaceType,
                fields: [],
                id: (0, uuid_1.v4)(),
                kind: core_1.ITypeKind.InterfaceType,
                name: type_1.InterfaceType.getApiName(this.atom, {
                    key: this.field.key,
                }),
                owner: this.owner,
            };
            return yield type_1.TypeFactory.save(interfaceType);
        });
    }
    booleanType() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, utils_1.throwIfUndefined)(yield this.primitiveTypeRepository.findOne({
                name: core_1.IPrimitiveTypeKind.Boolean,
            }));
        });
    }
    stringType() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, utils_1.throwIfUndefined)(yield this.primitiveTypeRepository.findOne({
                name: core_1.IPrimitiveTypeKind.String,
            }));
        });
    }
    numberType() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, utils_1.throwIfUndefined)(yield this.primitiveTypeRepository.findOne({
                name: core_1.IPrimitiveTypeKind.Number,
            }));
        });
    }
    integerType() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, utils_1.throwIfUndefined)(yield this.primitiveTypeRepository.findOne({
                name: core_1.IPrimitiveTypeKind.Integer,
            }));
        });
    }
    unionType(type) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const typesOfUnionType = (0, parser_1.parseSeparators)({ type });
            const mappedTypesOfUnionType = (yield Promise.all(typesOfUnionType.map((typeOfUnionType) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                return yield new DefaultTypeAdapterService({
                    atom: this.atom,
                    field: this.field,
                    owner: this.owner,
                }).execute({
                    type: typeOfUnionType,
                });
            })))).filter((typeOfUnionType) => Boolean(typeOfUnionType));
            // Create nested types
            yield Promise.all(mappedTypesOfUnionType.map((_a) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                var typeOfUnionType = tslib_1.__rest(_a, []);
                return yield type_1.TypeFactory.save(Object.assign(Object.assign({}, typeOfUnionType), { owner: this.owner }));
            })));
            const unionType = {
                __typename: core_1.ITypeKind.UnionType,
                id: (0, uuid_1.v4)(),
                kind: core_1.ITypeKind.UnionType,
                name: type_1.UnionType.compositeName(this.atom, {
                    key: this.field.key,
                }),
                owner: this.owner,
                // These need to exist already
                typesOfUnionType: mappedTypesOfUnionType,
            };
            return yield type_1.TypeFactory.save(unionType);
        });
    }
    enumType(type) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const values = (0, parser_1.parseSeparators)({ type });
            const enumType = {
                __typename: core_1.ITypeKind.EnumType,
                allowedValues: values.map((value) => ({
                    id: (0, uuid_1.v4)(),
                    key: value,
                    value: value,
                })),
                id: (0, uuid_1.v4)(),
                kind: core_1.ITypeKind.EnumType,
                name: type_1.EnumType.compositeName(this.atom, {
                    key: this.field.key,
                }),
                owner: this.owner,
            };
            return yield type_1.TypeFactory.save(enumType);
        });
    }
    isReactNodeType(type) {
        return this.reactNodeTypeRegex.test(type);
    }
}
exports.DefaultTypeAdapterService = DefaultTypeAdapterService;


/***/ }),
/* 320 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(321), exports);
tslib_1.__exportStar(__webpack_require__(322), exports);
tslib_1.__exportStar(__webpack_require__(323), exports);
tslib_1.__exportStar(__webpack_require__(324), exports);
tslib_1.__exportStar(__webpack_require__(326), exports);
tslib_1.__exportStar(__webpack_require__(328), exports);
tslib_1.__exportStar(__webpack_require__(330), exports);
tslib_1.__exportStar(__webpack_require__(331), exports);
tslib_1.__exportStar(__webpack_require__(332), exports);
tslib_1.__exportStar(__webpack_require__(334), exports);
tslib_1.__exportStar(__webpack_require__(343), exports);
tslib_1.__exportStar(__webpack_require__(344), exports);
tslib_1.__exportStar(__webpack_require__(345), exports);
tslib_1.__exportStar(__webpack_require__(533), exports);
tslib_1.__exportStar(__webpack_require__(534), exports);
tslib_1.__exportStar(__webpack_require__(535), exports);
tslib_1.__exportStar(__webpack_require__(536), exports);
tslib_1.__exportStar(__webpack_require__(537), exports);
tslib_1.__exportStar(__webpack_require__(538), exports);
tslib_1.__exportStar(__webpack_require__(539), exports);
tslib_1.__exportStar(__webpack_require__(540), exports);


/***/ }),
/* 321 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.callbackWithParams = void 0;
const tslib_1 = __webpack_require__(1);
const isFunction_1 = tslib_1.__importDefault(__webpack_require__(70));
const callbackWithParams = (callbacks, param) => {
    const callbacksArray = Array.isArray(callbacks) ? callbacks : [callbacks];
    callbacksArray.forEach((cb) => {
        if ((0, isFunction_1.default)(cb)) {
            cb(param);
        }
    });
};
exports.callbackWithParams = callbackWithParams;


/***/ }),
/* 322 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.clearCacheForKey = exports.cachedWithTTL = void 0;
const tslib_1 = __webpack_require__(1);
const utils_1 = __webpack_require__(35);
// Create a map to store cache instances for each cache key
const cacheMap = new Map();
/**
 * @param segmentCacheKey The key indicates a cache segment. Can be used to clear cache for a specific key.
 * @param ttl Time until cache is reset in milliseconds. Default is 5 minutes.
 */
const cachedWithTTL = (segmentCacheKey, ttl = 5 * 60 * 1000) => {
    return (target, propertyKey, descriptor) => {
        if (typeof (descriptor === null || descriptor === void 0 ? void 0 : descriptor.initializer) !== 'function') {
            throw new Error("Can't decorate property without 'initializer'");
        }
        const originalInitializer = descriptor.initializer;
        descriptor.initializer = function () {
            // Get or create cache for this cacheKey
            let cache = cacheMap.get(segmentCacheKey);
            if (!cache) {
                cache = new utils_1.TTLCache(ttl);
                cacheMap.set(segmentCacheKey, cache);
            }
            const originalMethod = originalInitializer.call(this);
            return (...args) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const cacheKey = JSON.stringify(args);
                const cachedValue = cache === null || cache === void 0 ? void 0 : cache.get(cacheKey);
                if (cachedValue !== undefined) {
                    console.log(`Take value from cache segment ${segmentCacheKey}:`, cachedValue);
                    return cachedValue;
                }
                const result = yield originalMethod.apply(this, args);
                cache === null || cache === void 0 ? void 0 : cache.set(cacheKey, result);
                return result;
            });
        };
    };
};
exports.cachedWithTTL = cachedWithTTL;
/**
 * @param segmentCacheKey The a single key or array of keys used as a cache segments.
 * All the records in the specified segments will be cleared.
 */
const clearCacheForKey = (segmentCacheKey) => {
    return (target, propertyKey, descriptor) => {
        if (typeof (descriptor === null || descriptor === void 0 ? void 0 : descriptor.initializer) !== 'function') {
            throw new Error("Can't decorate property without 'initializer'");
        }
        const originalInitializer = descriptor.initializer;
        descriptor.initializer = function () {
            const originalMethod = originalInitializer.call(this);
            return (...args) => {
                const cacheKeys = Array.isArray(segmentCacheKey)
                    ? segmentCacheKey
                    : [segmentCacheKey];
                cacheKeys.forEach((cacheKey) => {
                    const cacheSegment = cacheMap.get(cacheKey);
                    if (cacheSegment) {
                        console.log(`Deleting cache segment ${cacheKey} with ${cacheSegment.size()} records`);
                        cacheSegment.clear();
                        cacheMap.delete(cacheKey);
                    }
                });
                return originalMethod.apply(this, args);
            };
        };
    };
};
exports.clearCacheForKey = clearCacheForKey;


/***/ }),
/* 323 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.copyTextToClipboard = void 0;
const tslib_1 = __webpack_require__(1);
const copyTextToClipboard = (text) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line no-restricted-globals
    yield navigator.clipboard.writeText(text);
});
exports.copyTextToClipboard = copyTextToClipboard;


/***/ }),
/* 324 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.dynamicLoader = void 0;
const tslib_1 = __webpack_require__(1);
const dynamic_1 = tslib_1.__importDefault(__webpack_require__(325));
const react_1 = tslib_1.__importDefault(__webpack_require__(72));
/**
 * a workaround for : https://github.com/vercel/next.js/issues/4957
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dynamicLoader = (loadingFn) => (0, dynamic_1.default)(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const result = yield loadingFn();
    const Component = 'default' in result ? result.default : result;
    return react_1.default.forwardRef((props, ref) => react_1.default.createElement(Component, Object.assign(Object.assign({}, props), { ref: props.forwardedRef })));
}), { ssr: false });
exports.dynamicLoader = dynamicLoader;


/***/ }),
/* 325 */
/***/ ((module) => {

module.exports = require("next/dynamic");

/***/ }),
/* 326 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.extractErrorMessage = void 0;
const tslib_1 = __webpack_require__(1);
const isObjectLike_1 = tslib_1.__importDefault(__webpack_require__(53));
const isString_1 = tslib_1.__importDefault(__webpack_require__(327));
const extractErrorMessage = (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
error) => {
    var _a;
    if (!error) {
        return '';
    }
    console.error(JSON.stringify(error));
    if ((0, isString_1.default)(error)) {
        return error;
    }
    if (Array.isArray(error)) {
        return error.map(exports.extractErrorMessage).join('\n');
    }
    if ((0, isObjectLike_1.default)(error)) {
        if (error.error) {
            return (0, exports.extractErrorMessage)(error.error);
        }
        if (error.errors) {
            return (0, exports.extractErrorMessage)(error.errors);
        }
        //
        if (error.response) {
            return (0, exports.extractErrorMessage)(error.response);
        }
        //
        // if (e.data) {
        //   return extractErrorMessage(e.data)
        // }
        //
        if (error.message) {
            return (0, exports.extractErrorMessage)(error.message);
        }
        if ((_a = error.extensions) === null || _a === void 0 ? void 0 : _a.response) {
            return `[${error.extensions.response.message}]: ${error.extensions.response.error}`;
            // return e.graphQLErrors[0].extensions
            //   ? `[${e.message}]: ${
            //       (e.graphQLErrors[0].extensions.response as any)?.error
            //     }`
            //   : e.message
        }
    }
    return JSON.stringify(error);
};
exports.extractErrorMessage = extractErrorMessage;


/***/ }),
/* 327 */
/***/ ((module) => {

module.exports = require("lodash/isString");

/***/ }),
/* 328 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(329), exports);


/***/ }),
/* 329 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.extractFirstGraphQlErrorCode = void 0;
const extractFirstGraphQlErrorCode = (error) => { var _a, _b; return (_b = (_a = error.graphQLErrors[0]) === null || _a === void 0 ? void 0 : _a.extensions) === null || _b === void 0 ? void 0 : _b.code; };
exports.extractFirstGraphQlErrorCode = extractFirstGraphQlErrorCode;


/***/ }),
/* 330 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InlineFormService = void 0;
const tslib_1 = __webpack_require__(1);
const mobx_keystone_1 = __webpack_require__(65);
let InlineFormService = class InlineFormService extends (0, mobx_keystone_1.Model)(() => ({
    isOpen: (0, mobx_keystone_1.prop)(false),
    metadata: (0, mobx_keystone_1.prop)(null),
})) {
    open(...args) {
        var _a;
        this.isOpen = true;
        if (args.length > 0) {
            this.metadata = (_a = args[0]) !== null && _a !== void 0 ? _a : null;
        }
    }
    close() {
        this.isOpen = false;
        this.metadata = null;
    }
};
tslib_1.__decorate([
    mobx_keystone_1.modelAction,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], InlineFormService.prototype, "open", null);
tslib_1.__decorate([
    mobx_keystone_1.modelAction,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], InlineFormService.prototype, "close", null);
InlineFormService = tslib_1.__decorate([
    (0, mobx_keystone_1.model)('@codelab/InlineFormService')
], InlineFormService);
exports.InlineFormService = InlineFormService;


/***/ }),
/* 331 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModalService = void 0;
const tslib_1 = __webpack_require__(1);
const mobx_keystone_1 = __webpack_require__(65);
let ModalService = class ModalService extends (0, mobx_keystone_1.Model)(() => ({
    isOpen: (0, mobx_keystone_1.prop)(false),
    metadata: (0, mobx_keystone_1.prop)(null),
})) {
    open(...args) {
        var _a;
        this.isOpen = true;
        if (args.length > 0) {
            this.metadata = (_a = args[0]) !== null && _a !== void 0 ? _a : null;
        }
    }
    close() {
        this.isOpen = false;
        this.metadata = null;
    }
};
tslib_1.__decorate([
    mobx_keystone_1.modelAction,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ModalService.prototype, "open", null);
tslib_1.__decorate([
    mobx_keystone_1.modelAction,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ModalService.prototype, "close", null);
ModalService = tslib_1.__decorate([
    (0, mobx_keystone_1.model)('@codelab/ModalService')
], ModalService);
exports.ModalService = ModalService;


/***/ }),
/* 332 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createNotificationHandler = exports.useNotify = exports.notify = void 0;
const tslib_1 = __webpack_require__(1);
const antd_1 = __webpack_require__(333);
const isFunction_1 = tslib_1.__importDefault(__webpack_require__(70));
const isString_1 = tslib_1.__importDefault(__webpack_require__(327));
const extract_error_message_1 = __webpack_require__(326);
const defaultOptions = {
    type: 'error',
};
const notify = (options, event = undefined) => {
    const { content, title, type } = Object.assign(Object.assign({}, defaultOptions), options);
    let titleString = '';
    let contentString = '';
    if ((0, isString_1.default)(title)) {
        titleString = title;
    }
    else if ((0, isFunction_1.default)(title)) {
        titleString = title(event);
    }
    else if (type === 'error') {
        titleString = 'Error';
    }
    if ((0, isString_1.default)(content)) {
        contentString = content;
    }
    else if ((0, isFunction_1.default)(content)) {
        contentString = content(event);
    }
    else if (type === 'error') {
        contentString = (0, extract_error_message_1.extractErrorMessage)(event);
    }
    antd_1.notification[type || 'info']({
        description: contentString,
        message: titleString,
        placement: 'topRight',
    });
    if (type === 'warning') {
        console.warn(titleString, contentString);
    }
    else if (type === 'error') {
        console.error(titleString, contentString);
    }
    else {
        console.log(titleString, contentString);
    }
};
exports.notify = notify;
const useNotify = (success, error) => {
    const onSuccess = () => (0, exports.notify)(Object.assign(Object.assign({}, success), { type: 'success' }));
    const onError = (_error) => {
        console.error(_error);
        (0, exports.notify)(Object.assign(Object.assign({}, error), { content: error.content || (0, extract_error_message_1.extractErrorMessage)(_error), type: 'error' }));
    };
    return { onError, onSuccess };
};
exports.useNotify = useNotify;
/**
 * Returns a function that can be used as standalone notification function:
 * const notify = getNotificationHandler({...options})
 * notify({...someEvent})
 *
 * Or as an error handler directly
 * e.g.:
 *  .catch(getNotificationHandler({...options}))
 */
const createNotificationHandler = (options = defaultOptions) => (event = undefined) => {
    (0, exports.notify)(options, event);
};
exports.createNotificationHandler = createNotificationHandler;


/***/ }),
/* 333 */
/***/ ((module) => {

module.exports = require("antd");

/***/ }),
/* 334 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(335), exports);
tslib_1.__exportStar(__webpack_require__(336), exports);
tslib_1.__exportStar(__webpack_require__(339), exports);


/***/ }),
/* 335 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.extractTableQueries = void 0;
/**
 * Used with paginationService to extract page, pageSize, and filter properties from the url params
 * @param router NextRouter
 * @param filterTypes key-value pair for the filter properties and their types for parsing from string
 * @returns An object that contains the page, pageSize, and filter object
 */
const extractTableQueries = (router, filterTypes = {}) => {
    const page = router.query.page
        ? parseInt(router.query.page.toString())
        : undefined;
    const pageSize = router.query.pageSize
        ? parseInt(router.query.pageSize.toString())
        : undefined;
    // Url param values are transformed with the types provided in the filterTypes
    const filter = Object.entries(filterTypes).reduce((acc, [key, type]) => {
        if (router.query[key]) {
            let value = router.query[key];
            if (type === 'number') {
                value = Number(value);
            }
            if (type === 'boolean') {
                value = value === 'true';
            }
            acc[key] = value;
        }
        return acc;
    }, {});
    return {
        filter,
        page,
        pageSize,
    };
};
exports.extractTableQueries = extractTableQueries;


/***/ }),
/* 336 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaginationService = void 0;
const tslib_1 = __webpack_require__(1);
const sortBy_1 = tslib_1.__importDefault(__webpack_require__(337));
const mobx_1 = __webpack_require__(338);
const mobx_keystone_1 = __webpack_require__(65);
let PaginationService = class PaginationService extends (0, mobx_keystone_1.Model)(() => ({
    currentPage: (0, mobx_keystone_1.prop)(1).withSetter(),
    dataRefs: (0, mobx_keystone_1.prop)(() => (0, mobx_keystone_1.objectMap)()),
    filter: (0, mobx_keystone_1.prop)(() => ({})).withSetter(),
    isLoading: (0, mobx_keystone_1.prop)(false),
    pageSize: (0, mobx_keystone_1.prop)(20).withSetter(),
    totalItems: (0, mobx_keystone_1.prop)(0),
})) {
    constructor() {
        super(...arguments);
        /**
         * This can't be passed as props when creating a PaginationService instance so this has to be initialized in the `onAttachedToRootStore` of the service using this
         */
        Object.defineProperty(this, "getDataFn", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (page, pageSize, filter) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                return ({
                    items: [],
                    totalItems: 0,
                });
            })
        });
        Object.defineProperty(this, "getData", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (0, mobx_keystone_1._async)(function* () {
                this.isLoading = true;
                const { items, totalItems } = yield* (0, mobx_keystone_1._await)(this.getDataFn(this.currentPage, this.pageSize, this.filter));
                this.totalItems = totalItems;
                this.dataRefs.clear();
                items.forEach((type) => {
                    this.dataRefs.set(type.id, paginationServiceRef(type.id));
                });
                this.isLoading = false;
                return items;
            })
        });
    }
    get data() {
        return (0, sortBy_1.default)(Array.from(this.dataRefs.values()), (ref) => ref.current.name.toLowerCase()).map((ref) => ref.current);
    }
};
tslib_1.__decorate([
    mobx_1.computed,
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [])
], PaginationService.prototype, "data", null);
tslib_1.__decorate([
    mobx_keystone_1.modelFlow,
    tslib_1.__metadata("design:type", Object)
], PaginationService.prototype, "getData", void 0);
PaginationService = tslib_1.__decorate([
    (0, mobx_keystone_1.model)('@codelab/PaginationService')
], PaginationService);
exports.PaginationService = PaginationService;
const paginationServiceRef = (0, mobx_keystone_1.rootRef)('@codelab/PaginationServiceRef', {
    onResolvedValueChange: (ref, newComponent, oldComponent) => {
        if (oldComponent && !newComponent) {
            (0, mobx_keystone_1.detach)(ref);
        }
    },
});


/***/ }),
/* 337 */
/***/ ((module) => {

module.exports = require("lodash/sortBy");

/***/ }),
/* 338 */
/***/ ((module) => {

module.exports = require("mobx");

/***/ }),
/* 339 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useTablePagination = void 0;
const tslib_1 = __webpack_require__(1);
const debounce_1 = tslib_1.__importDefault(__webpack_require__(340));
const isMatch_1 = tslib_1.__importDefault(__webpack_require__(341));
const router_1 = __webpack_require__(342);
const react_1 = tslib_1.__importStar(__webpack_require__(72));
const extract_table_queries_1 = __webpack_require__(335);
const useTablePagination = ({ filterTypes, paginationService, pathname, }) => {
    const router = (0, router_1.useRouter)();
    const { filter, page = 1, pageSize = 20, } = (0, extract_table_queries_1.extractTableQueries)(router, filterTypes);
    const handleChange = react_1.default.useRef((0, debounce_1.default)(({ newFilter = paginationService.filter, newPage = paginationService.currentPage, newPageSize = paginationService.pageSize, }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const goBackToFirstPage = newPageSize !== paginationService.pageSize ||
            !(0, isMatch_1.default)(newFilter, paginationService.filter);
        paginationService.setCurrentPage(goBackToFirstPage ? 1 : newPage);
        paginationService.setPageSize(newPageSize);
        paginationService.setFilter(newFilter);
        void paginationService.getData();
        yield router.push({
            pathname,
            query: Object.assign(Object.assign({}, paginationService.filter), { page: paginationService.currentPage, pageSize: paginationService.pageSize }),
        }, undefined, { shallow: true });
    }), 500)).current;
    (0, react_1.useEffect)(() => {
        paginationService.setCurrentPage(page);
        paginationService.setPageSize(pageSize);
        paginationService.setFilter(filter);
        void paginationService.getData();
    }, []);
    const pagination = {
        current: paginationService.currentPage,
        onChange: (newPage, newPageSize) => handleChange({ newPage, newPageSize }),
        pageSize: paginationService.pageSize,
        position: ['bottomCenter'],
        showSizeChanger: true,
        total: paginationService.totalItems,
    };
    return {
        data: paginationService.data,
        filter,
        handleChange,
        isLoading: paginationService.isLoading,
        page,
        pageSize,
        pagination,
    };
};
exports.useTablePagination = useTablePagination;


/***/ }),
/* 340 */
/***/ ((module) => {

module.exports = require("lodash/debounce");

/***/ }),
/* 341 */
/***/ ((module) => {

module.exports = require("lodash/isMatch");

/***/ }),
/* 342 */
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),
/* 343 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.runMiddleware = void 0;
const runMiddleware = (req, res, fn) => {
    return new Promise((resolve, reject) => {
        return fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
};
exports.runMiddleware = runMiddleware;


/***/ }),
/* 344 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/**
 * https://frontend-devops.com/blog/pipe-serverside-props-in-nextjs
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ssrPipe = void 0;
const tslib_1 = __webpack_require__(1);
const ssrPipe = (...functions) => (input) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const parsedObject = JSON.parse(JSON.stringify(input));
    return {
        props: yield functions.reduce((chain, func) => chain.then(func), Promise.resolve(parsedObject)),
    };
});
exports.ssrPipe = ssrPipe;


/***/ }),
/* 345 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getByExpression = exports.replaceStateInProps = exports.evaluateExpression = exports.stripStateExpression = exports.isSingleStateExpression = exports.hasStateExpression = void 0;
const tslib_1 = __webpack_require__(1);
const core_1 = __webpack_require__(346);
const utils_1 = __webpack_require__(35);
const isString_1 = tslib_1.__importDefault(__webpack_require__(327));
const hasStateExpression = (str) => (0, isString_1.default)(str) &&
    str.includes(core_1.STATE_PATH_TEMPLATE_START) &&
    str.includes(core_1.STATE_PATH_TEMPLATE_END);
exports.hasStateExpression = hasStateExpression;
const isSingleStateExpression = (str) => str.startsWith(core_1.STATE_PATH_TEMPLATE_START) &&
    str.endsWith(core_1.STATE_PATH_TEMPLATE_END);
exports.isSingleStateExpression = isSingleStateExpression;
const stripStateExpression = (expression) => expression.substring(2, expression.length - 2).trim();
exports.stripStateExpression = stripStateExpression;
const evaluateExpression = (expression, state, componentProps = {}) => {
    try {
        const code = `return ${(0, exports.stripStateExpression)(expression)}`;
        // eslint-disable-next-line no-new-func
        return new Function('component', code).call(state, componentProps);
    }
    catch (error) {
        console.log(error);
        return expression;
    }
};
exports.evaluateExpression = evaluateExpression;
const replaceStateInProps = (props, state = {}, componentProps = {}) => (0, utils_1.mapDeep)(props, 
// value mapper
(value, key) => (0, isString_1.default)(value) ? (0, exports.getByExpression)(value, state, componentProps) : value, 
// key mapper
(value, key) => ((0, isString_1.default)(key)
    ? (0, exports.getByExpression)(key, state, componentProps)
    : key));
exports.replaceStateInProps = replaceStateInProps;
const getByExpression = (key, state, componentProps = {}) => {
    if (!(0, exports.hasStateExpression)(key)) {
        return key;
    }
    /**
     * return typed value for : {{expression}}
     */
    if ((0, exports.isSingleStateExpression)(key)) {
        return (0, exports.evaluateExpression)(key, state, componentProps);
    }
    /**
     * return string value for : [text1]? {{expression1}} [text2]? {{expression2}}...
     */
    return key.replace(core_1.STATE_PATH_TEMPLATE_REGEX, (value) => (0, exports.evaluateExpression)(value, state, componentProps));
};
exports.getByExpression = getByExpression;


/***/ }),
/* 346 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(347), exports);
tslib_1.__exportStar(__webpack_require__(348), exports);
tslib_1.__exportStar(__webpack_require__(521), exports);
tslib_1.__exportStar(__webpack_require__(523), exports);
tslib_1.__exportStar(__webpack_require__(525), exports);
tslib_1.__exportStar(__webpack_require__(530), exports);


/***/ }),
/* 347 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CUSTOM_TEXT_PROP_KEY = exports.WORD_BEFORE_DOT_REGEX = exports.LAST_WORD_AFTER_DOT_REGEX = exports.STATE_PATH_TEMPLATE_REGEX = exports.STATE_PATH_TEMPLATE_END_REGEX = exports.STATE_PATH_TEMPLATE_END = exports.STATE_PATH_TEMPLATE_START_OPEN_REGEX = exports.STATE_PATH_TEMPLATE_START_REGEX = exports.STATE_PATH_TEMPLATE_START = exports.ROOT_ELEMENT_NAME = exports.ROOT_RENDER_CONTAINER_ID = exports.DATA_GRID = exports.BINDING_WILDCARD = exports.BUILDER_NONE_CLASS_NAME = exports.BUILDER_CONTAINER_ID = exports.DATA_ELEMENT_ID = exports.DATASET_ELEMENT_ID = exports.DATA_COMPONENT_ID = exports.DATASET_COMPONENT_ID = void 0;
/**
 * <div data-component-id="0" />
 *
 * becomes
 *
 * node.dataset.componentId
 */
exports.DATASET_COMPONENT_ID = 'componentId';
exports.DATA_COMPONENT_ID = 'data-component-id';
exports.DATASET_ELEMENT_ID = 'elementId';
exports.DATA_ELEMENT_ID = 'data-element-id';
exports.BUILDER_CONTAINER_ID = 'Builder';
exports.BUILDER_NONE_CLASS_NAME = 'Builder-none';
exports.BINDING_WILDCARD = '*';
exports.DATA_GRID = 'DATA-GRID';
exports.ROOT_RENDER_CONTAINER_ID = 'render-root';
exports.ROOT_ELEMENT_NAME = 'Body';
exports.STATE_PATH_TEMPLATE_START = '{{';
exports.STATE_PATH_TEMPLATE_START_REGEX = /\{\{/g;
// start bracket that is not closed with }}
exports.STATE_PATH_TEMPLATE_START_OPEN_REGEX = /\{\{(?!(.+)?}})/g;
exports.STATE_PATH_TEMPLATE_END = '}}';
exports.STATE_PATH_TEMPLATE_END_REGEX = /}}/g;
exports.STATE_PATH_TEMPLATE_REGEX = /\{\{[^}]+}}/g;
exports.LAST_WORD_AFTER_DOT_REGEX = /\.\w+$/;
exports.WORD_BEFORE_DOT_REGEX = /\w*(\.)?/;
exports.CUSTOM_TEXT_PROP_KEY = 'customText';
// export const DEFAULT_GET_SERVER_SIDE_PROPS = `async function (context) {
//     return {
//       props: {},
//       redirect: undefined,
//       notFound: false,
//     }
//   }`


/***/ }),
/* 348 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(349), exports);
tslib_1.__exportStar(__webpack_require__(369), exports);
tslib_1.__exportStar(__webpack_require__(371), exports);
tslib_1.__exportStar(__webpack_require__(378), exports);
tslib_1.__exportStar(__webpack_require__(386), exports);
tslib_1.__exportStar(__webpack_require__(389), exports);
tslib_1.__exportStar(__webpack_require__(394), exports);
tslib_1.__exportStar(__webpack_require__(401), exports);
tslib_1.__exportStar(__webpack_require__(407), exports);
tslib_1.__exportStar(__webpack_require__(426), exports);
tslib_1.__exportStar(__webpack_require__(448), exports);
tslib_1.__exportStar(__webpack_require__(417), exports);
tslib_1.__exportStar(__webpack_require__(450), exports);
tslib_1.__exportStar(__webpack_require__(456), exports);
tslib_1.__exportStar(__webpack_require__(463), exports);
tslib_1.__exportStar(__webpack_require__(469), exports);
tslib_1.__exportStar(__webpack_require__(475), exports);
tslib_1.__exportStar(__webpack_require__(481), exports);
tslib_1.__exportStar(__webpack_require__(513), exports);
tslib_1.__exportStar(__webpack_require__(519), exports);


/***/ }),
/* 349 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(350), exports);
tslib_1.__exportStar(__webpack_require__(351), exports);
tslib_1.__exportStar(__webpack_require__(352), exports);
tslib_1.__exportStar(__webpack_require__(353), exports);
tslib_1.__exportStar(__webpack_require__(354), exports);
tslib_1.__exportStar(__webpack_require__(355), exports);
tslib_1.__exportStar(__webpack_require__(356), exports);
tslib_1.__exportStar(__webpack_require__(357), exports);
tslib_1.__exportStar(__webpack_require__(367), exports);
tslib_1.__exportStar(__webpack_require__(368), exports);


/***/ }),
/* 350 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 351 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 352 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 353 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.actionRef = void 0;
const mobx_keystone_1 = __webpack_require__(65);
exports.actionRef = (0, mobx_keystone_1.rootRef)('@codelab/ActionRef', {
    onResolvedValueChange: (ref, newStore, oldStore) => {
        if (oldStore && !newStore) {
            (0, mobx_keystone_1.detach)(ref);
        }
    },
});


/***/ }),
/* 354 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 355 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 356 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 357 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(358), exports);
tslib_1.__exportStar(__webpack_require__(364), exports);


/***/ }),
/* 358 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(359), exports);
tslib_1.__exportStar(__webpack_require__(360), exports);
tslib_1.__exportStar(__webpack_require__(361), exports);


/***/ }),
/* 359 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 360 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 361 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(362), exports);
tslib_1.__exportStar(__webpack_require__(363), exports);


/***/ }),
/* 362 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 363 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpResponseType = exports.HttpMethod = void 0;
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["DELETE"] = "DELETE";
    HttpMethod["GET"] = "GET";
    HttpMethod["HEAD"] = "HEAD";
    HttpMethod["OPTION"] = "OPTION";
    HttpMethod["PATCH"] = "PATCH";
    HttpMethod["POST"] = "POST";
    HttpMethod["PUT"] = "PUT";
})(HttpMethod = exports.HttpMethod || (exports.HttpMethod = {}));
var HttpResponseType;
(function (HttpResponseType) {
    HttpResponseType["ArrayBuffer"] = "arraybuffer";
    HttpResponseType["Blob"] = "blob";
    HttpResponseType["Document"] = "document";
    HttpResponseType["Json"] = "json";
    HttpResponseType["Stream"] = "stream";
    HttpResponseType["Text"] = "text";
})(HttpResponseType = exports.HttpResponseType || (exports.HttpResponseType = {}));


/***/ }),
/* 364 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(365), exports);
tslib_1.__exportStar(__webpack_require__(366), exports);


/***/ }),
/* 365 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 366 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 367 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 368 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 369 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(370), exports);


/***/ }),
/* 370 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 371 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(372), exports);
tslib_1.__exportStar(__webpack_require__(373), exports);
tslib_1.__exportStar(__webpack_require__(374), exports);
tslib_1.__exportStar(__webpack_require__(375), exports);
tslib_1.__exportStar(__webpack_require__(376), exports);
tslib_1.__exportStar(__webpack_require__(377), exports);


/***/ }),
/* 372 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 373 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 374 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.appRef = void 0;
const mobx_keystone_1 = __webpack_require__(65);
exports.appRef = (0, mobx_keystone_1.rootRef)('@codelab/AppRef', {
    onResolvedValueChange: (ref, newApp, oldApp) => {
        if (oldApp && !newApp) {
            (0, mobx_keystone_1.detach)(ref);
        }
    },
});


/***/ }),
/* 375 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 376 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getAppService = exports.appServiceContext = void 0;
const mobx_keystone_1 = __webpack_require__(65);
exports.appServiceContext = (0, mobx_keystone_1.createContext)();
const getAppService = (self) => {
    const appService = exports.appServiceContext.get(self);
    if (!appService) {
        throw new Error('appServiceContext is not defined');
    }
    return appService;
};
exports.getAppService = getAppService;


/***/ }),
/* 377 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 378 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(379), exports);
tslib_1.__exportStar(__webpack_require__(380), exports);
tslib_1.__exportStar(__webpack_require__(381), exports);
tslib_1.__exportStar(__webpack_require__(382), exports);
tslib_1.__exportStar(__webpack_require__(383), exports);
tslib_1.__exportStar(__webpack_require__(384), exports);
tslib_1.__exportStar(__webpack_require__(385), exports);


/***/ }),
/* 379 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 380 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isAtomDTO = void 0;
const isAtomDTO = (atom) => {
    return atom !== undefined && atom !== null;
};
exports.isAtomDTO = isAtomDTO;


/***/ }),
/* 381 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isAtomInstance = exports.atomRef = void 0;
const mobx_keystone_1 = __webpack_require__(65);
exports.atomRef = (0, mobx_keystone_1.rootRef)('@codelab/AtomRef', {
    onResolvedValueChange: (ref, newAtom, oldAtom) => {
        if (oldAtom && !newAtom) {
            (0, mobx_keystone_1.detach)(ref);
        }
    },
});
/**
 * used for determining the renderType of an element
 */
const isAtomInstance = (atom) => {
    return (atom === null || atom === void 0 ? void 0 : atom.$modelType) === '@codelab/AtomRef';
};
exports.isAtomInstance = isAtomInstance;


/***/ }),
/* 382 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 383 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 384 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 385 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isAtomTypeForTest = exports.filterNotHookType = exports.hookTypes = void 0;
const core_1 = __webpack_require__(86);
exports.hookTypes = new Set([
    core_1.IAtomType.HookGraphqlQuery,
    core_1.IAtomType.HookGraphqlMutation,
    core_1.IAtomType.HookQueryPage,
    core_1.IAtomType.HookQueryPages,
    core_1.IAtomType.HookRecoilState,
    core_1.IAtomType.HookQueryConfig,
    core_1.IAtomType.HookQueryLambda,
    core_1.IAtomType.HookRouter,
]);
const filterNotHookType = (atom) => !exports.hookTypes.has(atom);
exports.filterNotHookType = filterNotHookType;
const isAtomTypeForTest = (atom) => [core_1.IAtomType.AntDesignButton, core_1.IAtomType.AntDesignCard].includes(atom);
exports.isAtomTypeForTest = isAtomTypeForTest;


/***/ }),
/* 386 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(387), exports);


/***/ }),
/* 387 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveRefOrThrow = exports.refSchema = void 0;
const zod_1 = __webpack_require__(388);
/**
 * A reference to another entity.
 */
exports.refSchema = zod_1.z.object({
    id: zod_1.z.string(),
});
const resolveRefOrThrow = (ref, errorFactory) => {
    if (!ref.id || Object.keys(ref).length === 1) {
        throw errorFactory ? errorFactory() : new Error("Can't resolve ref");
    }
    return ref;
};
exports.resolveRefOrThrow = resolveRefOrThrow;


/***/ }),
/* 388 */
/***/ ((module) => {

module.exports = require("zod");

/***/ }),
/* 389 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(390), exports);
tslib_1.__exportStar(__webpack_require__(391), exports);
tslib_1.__exportStar(__webpack_require__(392), exports);
tslib_1.__exportStar(__webpack_require__(393), exports);


/***/ }),
/* 390 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultBuilderWidthBreakPoints = exports.DragPosition = exports.BuilderDndType = exports.BuilderWidthBreakPoints = void 0;
var BuilderWidthBreakPoints;
(function (BuilderWidthBreakPoints) {
    BuilderWidthBreakPoints["Desktop"] = "desktop";
    BuilderWidthBreakPoints["Mobile"] = "mobile";
    BuilderWidthBreakPoints["MobileVertical"] = "mobile-vertical";
    BuilderWidthBreakPoints["TabletHorizontal"] = "tablet-horizontal";
})(BuilderWidthBreakPoints = exports.BuilderWidthBreakPoints || (exports.BuilderWidthBreakPoints = {}));
var BuilderDndType;
(function (BuilderDndType) {
    BuilderDndType["CreateElement"] = "CreateElement";
    BuilderDndType["MoveElement"] = "MoveElement";
})(BuilderDndType = exports.BuilderDndType || (exports.BuilderDndType = {}));
var DragPosition;
(function (DragPosition) {
    DragPosition["After"] = "After";
    DragPosition["Before"] = "Before";
    DragPosition["Inside"] = "Inside";
})(DragPosition = exports.DragPosition || (exports.DragPosition = {}));
exports.defaultBuilderWidthBreakPoints = {
    [BuilderWidthBreakPoints.Mobile]: { default: 320, max: 479, min: 240 },
    [BuilderWidthBreakPoints.MobileVertical]: {
        default: 568,
        max: 767,
        min: 480,
    },
    [BuilderWidthBreakPoints.TabletHorizontal]: {
        default: 768,
        max: 991,
        min: 768,
    },
    // -1 means automatically set the value for this field to the max available space
    [BuilderWidthBreakPoints.Desktop]: { default: 992, max: 1920, min: 992 },
};


/***/ }),
/* 391 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getBuilderService = exports.builderServiceContext = void 0;
const mobx_keystone_1 = __webpack_require__(65);
exports.builderServiceContext = (0, mobx_keystone_1.createContext)();
const getBuilderService = (self) => {
    const builderService = exports.builderServiceContext.get(self);
    if (!builderService) {
        throw new Error('builderServiceContext is not defined');
    }
    return builderService;
};
exports.getBuilderService = getBuilderService;


/***/ }),
/* 392 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 393 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 394 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(395), exports);
tslib_1.__exportStar(__webpack_require__(396), exports);
tslib_1.__exportStar(__webpack_require__(397), exports);
tslib_1.__exportStar(__webpack_require__(399), exports);
tslib_1.__exportStar(__webpack_require__(400), exports);


/***/ }),
/* 395 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 396 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isComponentDTO = void 0;
const isComponentDTO = (component) => {
    return component !== undefined && component !== null;
};
exports.isComponentDTO = isComponentDTO;


/***/ }),
/* 397 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isComponentModel = exports.isComponentInstance = exports.getComponentService = exports.componentServiceContext = exports.componentRef = void 0;
const tslib_1 = __webpack_require__(1);
const isNil_1 = tslib_1.__importDefault(__webpack_require__(398));
const mobx_keystone_1 = __webpack_require__(65);
/**
 * Moved here because of dependency issue.
 *
 * Component can depend on element, but not the other way around
 */
exports.componentRef = (0, mobx_keystone_1.rootRef)('@codelab/ComponentRef', {
    onResolvedValueChange: (ref, newComponent, oldComponent) => {
        if (oldComponent && !newComponent) {
            (0, mobx_keystone_1.detach)(ref);
        }
    },
});
// This can be used to access the type store from anywhere inside the mobx-keystone tree
exports.componentServiceContext = (0, mobx_keystone_1.createContext)();
const getComponentService = (self) => {
    const componentService = exports.componentServiceContext.get(self);
    if (!componentService) {
        throw new Error('componentServiceContext is not set');
    }
    return componentService;
};
exports.getComponentService = getComponentService;
/**
 * Used for determining the RenderType of an element
 */
const isComponentInstance = (node) => {
    return !(0, isNil_1.default)(node) && (0, mobx_keystone_1.isRefOfType)(node, exports.componentRef);
};
exports.isComponentInstance = isComponentInstance;
const isComponentModel = (model) => {
    return (!(0, isNil_1.default)(model) &&
        // `IComponent` is mobx model type
        model[mobx_keystone_1.modelTypeKey] === '@codelab/Component');
};
exports.isComponentModel = isComponentModel;


/***/ }),
/* 398 */
/***/ ((module) => {

module.exports = require("lodash/isNil");

/***/ }),
/* 399 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 400 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 401 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(402), exports);
tslib_1.__exportStar(__webpack_require__(403), exports);
tslib_1.__exportStar(__webpack_require__(404), exports);
tslib_1.__exportStar(__webpack_require__(405), exports);
tslib_1.__exportStar(__webpack_require__(406), exports);


/***/ }),
/* 402 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 403 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 404 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.domainRef = void 0;
const mobx_keystone_1 = __webpack_require__(65);
exports.domainRef = (0, mobx_keystone_1.rootRef)('@codelab/DomainRef', {
    onResolvedValueChange: (ref, newApp, oldApp) => {
        if (oldApp && !newApp) {
            (0, mobx_keystone_1.detach)(ref);
        }
    },
});


/***/ }),
/* 405 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 406 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 407 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(408), exports);
tslib_1.__exportStar(__webpack_require__(409), exports);
tslib_1.__exportStar(__webpack_require__(410), exports);
tslib_1.__exportStar(__webpack_require__(411), exports);
tslib_1.__exportStar(__webpack_require__(412), exports);
tslib_1.__exportStar(__webpack_require__(413), exports);
tslib_1.__exportStar(__webpack_require__(414), exports);
tslib_1.__exportStar(__webpack_require__(415), exports);
tslib_1.__exportStar(__webpack_require__(424), exports);
tslib_1.__exportStar(__webpack_require__(425), exports);


/***/ }),
/* 408 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 409 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 410 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isElementRef = exports.elementRef = void 0;
const tslib_1 = __webpack_require__(1);
const isNil_1 = tslib_1.__importDefault(__webpack_require__(398));
const mobx_keystone_1 = __webpack_require__(65);
exports.elementRef = (0, mobx_keystone_1.rootRef)('@codelab/ElementRef', {
    onResolvedValueChange: (ref, newElement, oldElement) => {
        if (oldElement && !newElement) {
            (0, mobx_keystone_1.detach)(ref);
        }
    },
});
/**
 * Used for determining which node type is in the page tree
 */
const isElementRef = (node) => {
    return !(0, isNil_1.default)(node) && (0, mobx_keystone_1.isRefOfType)(node, exports.elementRef);
};
exports.isElementRef = isElementRef;


/***/ }),
/* 411 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 412 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getElementService = exports.elementServiceContext = void 0;
const mobx_keystone_1 = __webpack_require__(65);
// This can be used to access the type store from anywhere inside the mobx-keystone tree
exports.elementServiceContext = (0, mobx_keystone_1.createContext)();
const getElementService = (self) => {
    const elementService = exports.elementServiceContext.get(self);
    if (!elementService) {
        throw new Error('elementServiceContext is not set');
    }
    return elementService;
};
exports.getElementService = getElementService;


/***/ }),
/* 413 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 414 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 415 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(416), exports);
tslib_1.__exportStar(__webpack_require__(423), exports);


/***/ }),
/* 416 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ElementTree = void 0;
const tslib_1 = __webpack_require__(1);
const mobx_1 = __webpack_require__(338);
const mobx_keystone_1 = __webpack_require__(65);
const page_1 = __webpack_require__(417);
const element_service_context_1 = __webpack_require__(412);
/**
 * ElementTree is a mobx store that holds the tree of elements.
 * It is used as a local observable store for a tree of elements.
 * It doesn't handle remote data, use elementService for that
 *
 * ElementTree is just a required data structure for RenderService to work. The end goal is to render elements on a page, so we move this under RenderService
 */
let ElementTree = class ElementTree extends (0, mobx_keystone_1.Model)({
    id: mobx_keystone_1.idProp,
    rootElement: (0, mobx_keystone_1.prop)().withSetter(),
}) {
    /**
     * All elements within the tree
     */
    get elements() {
        return [
            this.rootElement.current,
            ...this.rootElement.current.descendantElements,
        ];
    }
    get elementService() {
        return (0, element_service_context_1.getElementService)(this);
    }
    element(id) {
        return this.elements.find((element) => element.id === id);
    }
    /**
     * Get all descendant elements of current subRoot
     */
    descendants(subRoot) {
        const descendants = [];
        (0, mobx_keystone_1.walkTree)(subRoot, (node) => {
            descendants.push(node);
        }, 
        // Walks from root to children
        mobx_keystone_1.WalkTreeMode.ParentFirst);
        return descendants;
    }
    getPathFromRoot(selectedElement) {
        var _a;
        const path = [];
        if (!(0, page_1.isElementPageNodeRef)(selectedElement)) {
            return [selectedElement.current.id];
        }
        let currentElement = selectedElement.maybeCurrent;
        while (currentElement) {
            path.push(currentElement.id);
            currentElement = (_a = currentElement.parent) === null || _a === void 0 ? void 0 : _a.current;
        }
        return path.reverse();
    }
};
tslib_1.__decorate([
    mobx_1.computed,
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [])
], ElementTree.prototype, "elements", null);
tslib_1.__decorate([
    mobx_1.computed,
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [])
], ElementTree.prototype, "elementService", null);
tslib_1.__decorate([
    mobx_keystone_1.modelAction,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mobx_keystone_1.Ref !== "undefined" && mobx_keystone_1.Ref) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ElementTree.prototype, "descendants", null);
ElementTree = tslib_1.__decorate([
    (0, mobx_keystone_1.model)('@codelab/ElementTree')
], ElementTree);
exports.ElementTree = ElementTree;


/***/ }),
/* 417 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(418), exports);
tslib_1.__exportStar(__webpack_require__(419), exports);
tslib_1.__exportStar(__webpack_require__(420), exports);
tslib_1.__exportStar(__webpack_require__(421), exports);
tslib_1.__exportStar(__webpack_require__(422), exports);


/***/ }),
/* 418 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 419 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 420 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pageRef = exports.isElementPageNode = exports.isElementPageNodeRef = exports.isComponentPageNode = exports.isComponentPageNodeRef = void 0;
const tslib_1 = __webpack_require__(1);
const isNil_1 = tslib_1.__importDefault(__webpack_require__(398));
const mobx_keystone_1 = __webpack_require__(65);
const component_1 = __webpack_require__(394);
const element_1 = __webpack_require__(407);
/**
 * Used for determining the type of a page node
 */
const isComponentPageNodeRef = (node) => {
    return !(0, isNil_1.default)(node) && (0, mobx_keystone_1.isRefOfType)(node, component_1.componentRef);
};
exports.isComponentPageNodeRef = isComponentPageNodeRef;
const isComponentPageNode = (node) => {
    return (!(0, isNil_1.default)(node) &&
        // `IComponent` is mobx model type
        node[mobx_keystone_1.modelTypeKey] === '@codelab/Component');
};
exports.isComponentPageNode = isComponentPageNode;
/**
 * Used for determining the type of a page node
 */
const isElementPageNodeRef = (node) => {
    return !(0, isNil_1.default)(node) && (0, mobx_keystone_1.isRefOfType)(node, element_1.elementRef);
};
exports.isElementPageNodeRef = isElementPageNodeRef;
const isElementPageNode = (node) => {
    return (!(0, isNil_1.default)(node) &&
        // `IComponent` is mobx model type
        node[mobx_keystone_1.modelTypeKey] === '@codelab/Element');
};
exports.isElementPageNode = isElementPageNode;
exports.pageRef = (0, mobx_keystone_1.rootRef)('@codelab/PageRef', {
    onResolvedValueChange: (ref, newPage, oldPage) => {
        if (oldPage && !newPage) {
            (0, mobx_keystone_1.detach)(ref);
        }
    },
});


/***/ }),
/* 421 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 422 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 423 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.elementTreeRef = void 0;
const mobx_keystone_1 = __webpack_require__(65);
exports.elementTreeRef = (0, mobx_keystone_1.rootRef)('@codelab/ElementTreeRef', {
    onResolvedValueChange: (ref, newType, oldType) => {
        if (oldType && !newType) {
            (0, mobx_keystone_1.detach)(ref);
        }
    },
});


/***/ }),
/* 424 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 425 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 426 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(427), exports);
tslib_1.__exportStar(__webpack_require__(445), exports);
tslib_1.__exportStar(__webpack_require__(446), exports);
tslib_1.__exportStar(__webpack_require__(447), exports);


/***/ }),
/* 427 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(428), exports);
tslib_1.__exportStar(__webpack_require__(430), exports);
tslib_1.__exportStar(__webpack_require__(431), exports);
tslib_1.__exportStar(__webpack_require__(433), exports);
tslib_1.__exportStar(__webpack_require__(435), exports);
tslib_1.__exportStar(__webpack_require__(438), exports);
tslib_1.__exportStar(__webpack_require__(440), exports);
tslib_1.__exportStar(__webpack_require__(443), exports);


/***/ }),
/* 428 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(429), exports);


/***/ }),
/* 429 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GraphqlHookConfigSchema = void 0;
const zod_1 = __webpack_require__(388);
exports.GraphqlHookConfigSchema = zod_1.z.object({
    dataKey: zod_1.z.string().optional().nullable(),
    graphqlBody: zod_1.z.string().min(1),
    graphqlUrl: zod_1.z.string().min(1).url(),
});


/***/ }),
/* 430 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HookConfigSchema = void 0;
const zod_1 = __webpack_require__(388);
const graphql_1 = __webpack_require__(428);
const page_1 = __webpack_require__(431);
const pages_1 = __webpack_require__(433);
const query_config_1 = __webpack_require__(435);
const query_lambda_1 = __webpack_require__(438);
const recoil_1 = __webpack_require__(440);
exports.HookConfigSchema = zod_1.z.union([
    graphql_1.GraphqlHookConfigSchema,
    query_config_1.QueryConfigHookConfigSchema,
    page_1.QueryPageHookConfigSchema,
    pages_1.QueryPagesHookConfigSchema,
    recoil_1.RecoilStateHookConfigSchema,
    query_lambda_1.QueryLambdaHookConfigSchema,
]);


/***/ }),
/* 431 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(432), exports);


/***/ }),
/* 432 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QueryPageHookConfigSchema = void 0;
const zod_1 = __webpack_require__(388);
exports.QueryPageHookConfigSchema = zod_1.z.object({
    pageId: zod_1.z.string().min(1),
});


/***/ }),
/* 433 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(434), exports);


/***/ }),
/* 434 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QueryPagesHookConfigSchema = void 0;
const zod_1 = __webpack_require__(388);
// export interface IQueryPagesHookConfig {
//   __typename: 'QueryPagesHookConfig'
//   appId: string
// }
exports.QueryPagesHookConfigSchema = zod_1.z.object({
    appId: zod_1.z.string().min(1),
});


/***/ }),
/* 435 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(436), exports);
tslib_1.__exportStar(__webpack_require__(437), exports);


/***/ }),
/* 436 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QueryConfigHookConfigSchema = void 0;
const zod_1 = __webpack_require__(388);
const query_method_enum_1 = __webpack_require__(437);
// export interface IQueryHookConfig {
//   __typename: 'QueryHookConfig'
//   queryKey: string
//   url?: string
//   body?: string
//   method?: QueryMethod
//   lambdaId?: string
// }
/**
 * Either a lambdaId, or url/body/method are required
 *
 * Use simple type so we can implement
 */
exports.QueryConfigHookConfigSchema = zod_1.z.object({
    body: zod_1.z.string().optional().nullable(),
    method: zod_1.z.nativeEnum(query_method_enum_1.QueryMethod).optional().nullable(),
    queryKey: zod_1.z.string().min(1),
    url: zod_1.z.string().url().optional().nullable(),
});


/***/ }),
/* 437 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QueryMethod = void 0;
var QueryMethod;
(function (QueryMethod) {
    QueryMethod["Delete"] = "Delete";
    QueryMethod["Get"] = "Get";
    QueryMethod["Head"] = "Head";
    QueryMethod["Link"] = "Link";
    QueryMethod["Options"] = "Options";
    QueryMethod["Patch"] = "Patch";
    QueryMethod["Post"] = "Post";
    QueryMethod["Purge"] = "Purge";
    QueryMethod["Put"] = "Put";
    QueryMethod["Unlink"] = "Unlink";
})(QueryMethod = exports.QueryMethod || (exports.QueryMethod = {}));


/***/ }),
/* 438 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(439), exports);


/***/ }),
/* 439 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QueryLambdaHookConfigSchema = void 0;
const zod_1 = __webpack_require__(388);
exports.QueryLambdaHookConfigSchema = zod_1.z.object({
    lambdaId: zod_1.z.string(),
    queryKey: zod_1.z.string().min(1),
});


/***/ }),
/* 440 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(441), exports);
tslib_1.__exportStar(__webpack_require__(442), exports);


/***/ }),
/* 441 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PersistenceType = void 0;
var PersistenceType;
(function (PersistenceType) {
    PersistenceType["LocalStorage"] = "LocalStorage";
    PersistenceType["NotPersisted"] = "NotPersisted";
    PersistenceType["SessionStorage"] = "SessionStorage";
})(PersistenceType = exports.PersistenceType || (exports.PersistenceType = {}));


/***/ }),
/* 442 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RecoilStateHookConfigSchema = void 0;
const zod_1 = __webpack_require__(388);
const persistence_type_enum_1 = __webpack_require__(441);
// export interface IRecoilStateHookConfig {
//   __typename: 'RecoilStateHookConfig'
//   stateKey: string
//   defaultValue?: string
//   persisted: PersistenceType
// }
exports.RecoilStateHookConfigSchema = zod_1.z.object({
    defaultValue: zod_1.z.string().optional().nullable(),
    persisted: zod_1.z.nativeEnum(persistence_type_enum_1.PersistenceType),
    stateKey: zod_1.z.string().min(1),
});


/***/ }),
/* 443 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(444), exports);


/***/ }),
/* 444 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RouterConfigSchema = void 0;
const zod_1 = __webpack_require__(388);
exports.RouterConfigSchema = zod_1.z.object({});


/***/ }),
/* 445 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HookDiscriminator = void 0;
/**
 * Used as __typename to discriminate between types
 */
var HookDiscriminator;
(function (HookDiscriminator) {
    HookDiscriminator["GraphqlHookConfig"] = "GraphqlHookConfig";
    HookDiscriminator["QueryHookConfig"] = "QueryHookConfig";
    HookDiscriminator["QueryPageHookConfig"] = "QueryPageHookConfig";
    HookDiscriminator["QueryPagesHookConfig"] = "QueryPagesHookConfig";
    HookDiscriminator["RecoilStateHookConfig"] = "RecoilStateHookConfig";
    HookDiscriminator["RouterHookConfig"] = "RouterHookConfig";
})(HookDiscriminator = exports.HookDiscriminator || (exports.HookDiscriminator = {}));


/***/ }),
/* 446 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 447 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 448 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(449), exports);


/***/ }),
/* 449 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LambdaSchema = void 0;
const zod_1 = __webpack_require__(388);
exports.LambdaSchema = zod_1.z.object({
    body: zod_1.z.string(),
    id: zod_1.z.string().default(''),
    name: zod_1.z.string(),
    ownerId: zod_1.z.string(),
});


/***/ }),
/* 450 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(451), exports);
tslib_1.__exportStar(__webpack_require__(452), exports);
tslib_1.__exportStar(__webpack_require__(453), exports);
tslib_1.__exportStar(__webpack_require__(454), exports);
tslib_1.__exportStar(__webpack_require__(455), exports);


/***/ }),
/* 451 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 452 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 453 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.propRef = void 0;
const mobx_keystone_1 = __webpack_require__(65);
exports.propRef = (0, mobx_keystone_1.rootRef)('@codelab/PropRef', {
    onResolvedValueChange: (ref, newProp, oldProp) => {
        if (oldProp && !newProp) {
            (0, mobx_keystone_1.detach)(ref);
        }
    },
});


/***/ }),
/* 454 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 455 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 456 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(457), exports);
tslib_1.__exportStar(__webpack_require__(458), exports);
tslib_1.__exportStar(__webpack_require__(459), exports);
tslib_1.__exportStar(__webpack_require__(460), exports);
tslib_1.__exportStar(__webpack_require__(461), exports);
tslib_1.__exportStar(__webpack_require__(462), exports);


/***/ }),
/* 457 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RendererTab = void 0;
var RendererTab;
(function (RendererTab) {
    RendererTab["Component"] = "Component";
    RendererTab["Page"] = "Page";
})(RendererTab = exports.RendererTab || (exports.RendererTab = {}));


/***/ }),
/* 458 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRenderService = exports.renderServiceContext = void 0;
const mobx_keystone_1 = __webpack_require__(65);
exports.renderServiceContext = (0, mobx_keystone_1.createContext)();
const getRenderService = (self) => {
    const renderService = exports.renderServiceContext.get(self);
    if (!renderService) {
        throw new Error('renderServiceContext is not defined');
    }
    return renderService;
};
exports.getRenderService = getRenderService;


/***/ }),
/* 459 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 460 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RendererType = void 0;
var RendererType;
(function (RendererType) {
    RendererType["ComponentBuilder"] = "component-builder";
    RendererType["PageBuilder"] = "page-builder";
    RendererType["Preview"] = "preview";
})(RendererType = exports.RendererType || (exports.RendererType = {}));


/***/ }),
/* 461 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.rendererRef = exports.getRendererId = void 0;
const mobx_keystone_1 = __webpack_require__(65);
const getRendererId = (id) => `${id}.renderer`;
exports.getRendererId = getRendererId;
exports.rendererRef = (0, mobx_keystone_1.rootRef)('@codelab/RendererRef', {
    onResolvedValueChange: (ref, newRenderer, oldRenderer) => {
        if (oldRenderer && !newRenderer) {
            (0, mobx_keystone_1.detach)(ref);
        }
    },
});


/***/ }),
/* 462 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 463 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(464), exports);
tslib_1.__exportStar(__webpack_require__(465), exports);
tslib_1.__exportStar(__webpack_require__(466), exports);
tslib_1.__exportStar(__webpack_require__(467), exports);
tslib_1.__exportStar(__webpack_require__(468), exports);


/***/ }),
/* 464 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 465 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 466 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resourceRef = void 0;
const mobx_keystone_1 = __webpack_require__(65);
exports.resourceRef = (0, mobx_keystone_1.rootRef)('@codelab/ResourceRef', {
    onResolvedValueChange: (ref, newResource, oldResource) => {
        if (oldResource && !newResource) {
            (0, mobx_keystone_1.detach)(ref);
        }
    },
});


/***/ }),
/* 467 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 468 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 469 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(470), exports);
tslib_1.__exportStar(__webpack_require__(471), exports);
tslib_1.__exportStar(__webpack_require__(472), exports);
tslib_1.__exportStar(__webpack_require__(473), exports);
tslib_1.__exportStar(__webpack_require__(474), exports);


/***/ }),
/* 470 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 471 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 472 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.storeRef = void 0;
const mobx_keystone_1 = __webpack_require__(65);
exports.storeRef = (0, mobx_keystone_1.rootRef)('@codelab/StoreRef', {
    onResolvedValueChange: (ref, newStore, oldStore) => {
        if (oldStore && !newStore) {
            (0, mobx_keystone_1.detach)(ref);
        }
    },
});


/***/ }),
/* 473 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 474 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 475 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(476), exports);
tslib_1.__exportStar(__webpack_require__(477), exports);
tslib_1.__exportStar(__webpack_require__(478), exports);
tslib_1.__exportStar(__webpack_require__(479), exports);
tslib_1.__exportStar(__webpack_require__(480), exports);


/***/ }),
/* 476 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 477 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 478 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 479 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 480 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 481 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(482), exports);
tslib_1.__exportStar(__webpack_require__(488), exports);
tslib_1.__exportStar(__webpack_require__(489), exports);
tslib_1.__exportStar(__webpack_require__(490), exports);
tslib_1.__exportStar(__webpack_require__(491), exports);
tslib_1.__exportStar(__webpack_require__(492), exports);
tslib_1.__exportStar(__webpack_require__(493), exports);
tslib_1.__exportStar(__webpack_require__(494), exports);
tslib_1.__exportStar(__webpack_require__(495), exports);
tslib_1.__exportStar(__webpack_require__(496), exports);
tslib_1.__exportStar(__webpack_require__(497), exports);
tslib_1.__exportStar(__webpack_require__(498), exports);


/***/ }),
/* 482 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(483), exports);
tslib_1.__exportStar(__webpack_require__(484), exports);
tslib_1.__exportStar(__webpack_require__(485), exports);
tslib_1.__exportStar(__webpack_require__(486), exports);
tslib_1.__exportStar(__webpack_require__(487), exports);


/***/ }),
/* 483 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 484 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 485 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fieldRef = void 0;
const mobx_keystone_1 = __webpack_require__(65);
exports.fieldRef = (0, mobx_keystone_1.rootRef)('@codelab/FieldRef', {
    onResolvedValueChange: (ref, newType, oldType) => {
        if (oldType && !newType) {
            (0, mobx_keystone_1.detach)(ref);
        }
    },
});


/***/ }),
/* 486 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 487 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 488 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 489 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NumberValidationRules = exports.StringValidationRules = exports.GeneralValidationRules = void 0;
var GeneralValidationRules;
(function (GeneralValidationRules) {
    GeneralValidationRules["Nullable"] = "nullable";
})(GeneralValidationRules = exports.GeneralValidationRules || (exports.GeneralValidationRules = {}));
var StringValidationRules;
(function (StringValidationRules) {
    StringValidationRules["MaxLength"] = "maxLength";
    StringValidationRules["MinLength"] = "minLength";
    StringValidationRules["Pattern"] = "pattern";
})(StringValidationRules = exports.StringValidationRules || (exports.StringValidationRules = {}));
var NumberValidationRules;
(function (NumberValidationRules) {
    NumberValidationRules["ExclusiveMaximum"] = "exclusiveMaximum";
    NumberValidationRules["ExclusiveMinimum"] = "exclusiveMinimum";
    NumberValidationRules["Maximum"] = "maximum";
    NumberValidationRules["Minimum"] = "minimum";
    NumberValidationRules["MultipleOf"] = "multipleOf";
})(NumberValidationRules = exports.NumberValidationRules || (exports.NumberValidationRules = {}));


/***/ }),
/* 490 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isTypedProp = void 0;
const tslib_1 = __webpack_require__(1);
const isPlainObject_1 = tslib_1.__importDefault(__webpack_require__(71));
const isString_1 = tslib_1.__importDefault(__webpack_require__(327));
const isTypedProp = (prop) => {
    return (0, isPlainObject_1.default)(prop) && 'type' in prop && (0, isString_1.default)(prop['type']);
};
exports.isTypedProp = isTypedProp;


/***/ }),
/* 491 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 492 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 493 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 494 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.typeRef = void 0;
const mobx_keystone_1 = __webpack_require__(65);
exports.typeRef = (0, mobx_keystone_1.rootRef)('@codelab/TypeRef', {
    onResolvedValueChange: (ref, newType, oldType) => {
        if (oldType && !newType) {
            (0, mobx_keystone_1.detach)(ref);
        }
    },
});


/***/ }),
/* 495 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 496 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 497 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 498 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(499), exports);
tslib_1.__exportStar(__webpack_require__(500), exports);
tslib_1.__exportStar(__webpack_require__(501), exports);
tslib_1.__exportStar(__webpack_require__(502), exports);
tslib_1.__exportStar(__webpack_require__(503), exports);
tslib_1.__exportStar(__webpack_require__(504), exports);
tslib_1.__exportStar(__webpack_require__(505), exports);
tslib_1.__exportStar(__webpack_require__(506), exports);
tslib_1.__exportStar(__webpack_require__(507), exports);
tslib_1.__exportStar(__webpack_require__(508), exports);
tslib_1.__exportStar(__webpack_require__(509), exports);
tslib_1.__exportStar(__webpack_require__(510), exports);
tslib_1.__exportStar(__webpack_require__(511), exports);
tslib_1.__exportStar(__webpack_require__(512), exports);


/***/ }),
/* 499 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 500 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 501 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 502 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 503 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 504 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 505 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 506 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 507 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 508 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 509 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 510 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 511 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 512 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 513 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(514), exports);
tslib_1.__exportStar(__webpack_require__(515), exports);
tslib_1.__exportStar(__webpack_require__(516), exports);
tslib_1.__exportStar(__webpack_require__(517), exports);
tslib_1.__exportStar(__webpack_require__(518), exports);


/***/ }),
/* 514 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isUser = exports.isAdminSession = exports.isAdmin = void 0;
const core_1 = __webpack_require__(86);
const isAdmin = (user) => {
    return Boolean(user && user.roles.includes(core_1.IRole.Admin));
};
exports.isAdmin = isAdmin;
const isAdminSession = (session) => {
    return session[core_1.JWT_CLAIMS].roles.includes(core_1.IRole.Admin);
};
exports.isAdminSession = isAdminSession;
const isUser = (user) => {
    return Boolean(user && user.roles.includes(core_1.IRole.User));
};
exports.isUser = isUser;


/***/ }),
/* 515 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 516 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.userRef = void 0;
const mobx_keystone_1 = __webpack_require__(65);
exports.userRef = (0, mobx_keystone_1.rootRef)('@codelab/UserRef', {
    onResolvedValueChange: (ref, newUser, oldUser) => {
        if (oldUser && !newUser) {
            (0, mobx_keystone_1.detach)(ref);
        }
    },
});


/***/ }),
/* 517 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getUserService = exports.userServiceContext = void 0;
const mobx_keystone_1 = __webpack_require__(65);
exports.userServiceContext = (0, mobx_keystone_1.createContext)();
const getUserService = (self) => {
    const userService = exports.userServiceContext.get(self);
    if (!userService) {
        throw new Error('userServiceContext is not defined');
    }
    return userService;
};
exports.getUserService = getUserService;


/***/ }),
/* 518 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 519 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(520), exports);


/***/ }),
/* 520 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 521 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(522), exports);


/***/ }),
/* 522 */
/***/ ((__unused_webpack_module, exports) => {


/**
 * This is our representation of what kind of ReactComponent to use
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 523 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(524), exports);


/***/ }),
/* 524 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PAGE_ID = exports.APP_ID = void 0;
exports.APP_ID = 'appId';
exports.PAGE_ID = 'pageId';


/***/ }),
/* 525 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(526), exports);
tslib_1.__exportStar(__webpack_require__(527), exports);
tslib_1.__exportStar(__webpack_require__(528), exports);
tslib_1.__exportStar(__webpack_require__(529), exports);


/***/ }),
/* 526 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 527 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 528 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 529 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 530 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(531), exports);
tslib_1.__exportStar(__webpack_require__(532), exports);


/***/ }),
/* 531 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 532 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 533 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.throwIfUndefined = void 0;
const throwIfUndefined = (value) => {
    if (value === undefined) {
        throw new Error('Value should not be undefined');
    }
    /**
     * Cast away undefined
     */
    return value;
};
exports.throwIfUndefined = throwIfUndefined;


/***/ }),
/* 534 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tryParse = void 0;
const tryParse = (str) => {
    try {
        return JSON.parse(str || '{}');
    }
    catch (error) {
        console.log(error);
        return str;
    }
};
exports.tryParse = tryParse;


/***/ }),
/* 535 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tryStringify = void 0;
const tryStringify = (object) => {
    try {
        return JSON.stringify(object || {});
    }
    catch (error) {
        console.log(error);
        return object;
    }
};
exports.tryStringify = tryStringify;


/***/ }),
/* 536 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isNotNull = void 0;
const isNotNull = (input) => {
    return input !== null;
};
exports.isNotNull = isNotNull;


/***/ }),
/* 537 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useDebouncedState = void 0;
const react_1 = __webpack_require__(72);
const useDebouncedState = (delay, initialValue = undefined) => {
    // State and setters for debounced value
    const [value, setValue] = (0, react_1.useState)(initialValue);
    const [debouncedValue, setDebouncedValue] = (0, react_1.useState)(initialValue);
    (0, react_1.useEffect)(() => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        // Cancel the timeout if value changes (also on delay change or unmount)
        // This is how we prevent debounced value from updating if value is changed ...
        // .. within the delay period. Timeout gets cleared and restarted.
        return () => {
            clearTimeout(handler);
        };
    }, 
    // Only re-call effect if value or delay changes
    [value, delay]);
    return [debouncedValue, setValue];
};
exports.useDebouncedState = useDebouncedState;


/***/ }),
/* 538 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useOnClickOutside = void 0;
const react_1 = __webpack_require__(72);
const useOnClickOutside = (ref, handler, deps) => {
    // Ensure that the handler won't change each render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handlerCb = (0, react_1.useCallback)(handler, deps);
    (0, react_1.useEffect)(() => {
        const listener = (error) => {
            if (!ref.current || ref.current.contains(error.target)) {
                return;
            }
            handlerCb(error);
        };
        document.addEventListener('mousedown', listener, true);
        document.addEventListener('touchstart', listener, true);
        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handlerCb]);
};
exports.useOnClickOutside = useOnClickOutside;


/***/ }),
/* 539 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.usePrevious = void 0;
// https://usehooks.com/usePrevious/
const react_1 = __webpack_require__(72);
const usePrevious = (value) => {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = (0, react_1.useRef)();
    // Store current value in ref
    (0, react_1.useEffect)(() => {
        ref.current = value;
    }, 
    // Only re-run if value changes
    [value]);
    // Return previous value (happens before update in useEffect above)
    return ref.current;
};
exports.usePrevious = usePrevious;


/***/ }),
/* 540 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useScroll = void 0;
/**
 * useScroll React custom hook
 * Usage:
 *    const { scrollX, scrollY, scrollDirection } = useScroll();
 * Original Source: https://gist.github.com/joshuacerbito/ea318a6a7ca4336e9fadb9ae5bbb87f4
 */
const utils_1 = __webpack_require__(35);
const react_1 = __webpack_require__(72);
const EmptySSRRect = {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
};
const useScroll = () => {
    const [lastScrollTop, setLastScrollTop] = (0, react_1.useState)(0);
    const [bodyOffset, setBodyOffset] = (0, react_1.useState)(utils_1.isServer ? EmptySSRRect : document.body.getBoundingClientRect());
    const [scrollY, setScrollY] = (0, react_1.useState)(bodyOffset.top);
    const [scrollX, setScrollX] = (0, react_1.useState)(bodyOffset.left);
    const [scrollDirection, setScrollDirection] = (0, react_1.useState)();
    const listener = () => {
        setBodyOffset(utils_1.isServer ? EmptySSRRect : document.body.getBoundingClientRect());
        setScrollY(-bodyOffset.top);
        setScrollX(bodyOffset.left);
        setScrollDirection(lastScrollTop > -bodyOffset.top ? 'down' : 'up');
        setLastScrollTop(-bodyOffset.top);
    };
    (0, react_1.useEffect)(() => {
        window.addEventListener('scroll', listener, true);
        return () => {
            window.removeEventListener('scroll', listener, true);
        };
    });
    return {
        scrollDirection,
        scrollX,
        scrollY,
    };
};
exports.useScroll = useScroll;


/***/ }),
/* 541 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.readAntDesignApis = void 0;
const tslib_1 = __webpack_require__(1);
const core_1 = __webpack_require__(542);
const fs_1 = tslib_1.__importDefault(__webpack_require__(201));
const path_1 = tslib_1.__importDefault(__webpack_require__(202));
const readAntDesignApis = (folder) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const jsonFiles = fs_1.default.readdirSync(folder);
    const apis = [];
    for (const file of jsonFiles) {
        const filePath = path_1.default.resolve(folder, file);
        const fileContent = fs_1.default.readFileSync(filePath, 'utf8');
        const apisData = JSON.parse(fileContent);
        apisData.forEach((data) => core_1.AntDesignApiSchema.parse(data));
        apis.push(...apisData);
    }
    return apis;
});
exports.readAntDesignApis = readAntDesignApis;


/***/ }),
/* 542 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(543), exports);
tslib_1.__exportStar(__webpack_require__(544), exports);
tslib_1.__exportStar(__webpack_require__(545), exports);
tslib_1.__exportStar(__webpack_require__(546), exports);
tslib_1.__exportStar(__webpack_require__(547), exports);
tslib_1.__exportStar(__webpack_require__(548), exports);
tslib_1.__exportStar(__webpack_require__(549), exports);
tslib_1.__exportStar(__webpack_require__(550), exports);
tslib_1.__exportStar(__webpack_require__(551), exports);
tslib_1.__exportStar(__webpack_require__(552), exports);
tslib_1.__exportStar(__webpack_require__(553), exports);
tslib_1.__exportStar(__webpack_require__(554), exports);
tslib_1.__exportStar(__webpack_require__(559), exports);
tslib_1.__exportStar(__webpack_require__(560), exports);


/***/ }),
/* 543 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 544 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 545 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 546 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 547 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 548 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 549 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 550 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 551 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 552 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 553 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AntDesignFieldSchema = void 0;
const zod_1 = __webpack_require__(388);
exports.AntDesignFieldSchema = zod_1.z.object({
    defaultValue: zod_1.z.string(),
    description: zod_1.z.string(),
    property: zod_1.z.string(),
    type: zod_1.z.string(),
    version: zod_1.z.string(),
});


/***/ }),
/* 554 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(555), exports);
tslib_1.__exportStar(__webpack_require__(556), exports);
tslib_1.__exportStar(__webpack_require__(557), exports);
tslib_1.__exportStar(__webpack_require__(558), exports);


/***/ }),
/* 555 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IAntdCategoryTag = void 0;
/**
 * This is a flat list to have a central place to refer to the label
 */
var IAntdCategoryTag;
(function (IAntdCategoryTag) {
    IAntdCategoryTag["AntDesignGeneral"] = "AntDesignGeneral";
    IAntdCategoryTag["AntDesignTypography"] = "AntDesignTypography";
    IAntdCategoryTag["AntDesignLayout"] = "AntDesignLayout";
    IAntdCategoryTag["AntDesignGrid"] = "AntDesignGrid";
    IAntdCategoryTag["AntDesignNavigation"] = "AntDesignNavigation";
    IAntdCategoryTag["AntDesignDataEntry"] = "Data Entry";
    IAntdCategoryTag["AntDesignDataDisplay"] = "Data Display";
    IAntdCategoryTag["AntDesignFeedback"] = "AntDesignFeedback";
    IAntdCategoryTag["AntDesignOther"] = "AntDesignOther";
})(IAntdCategoryTag = exports.IAntdCategoryTag || (exports.IAntdCategoryTag = {}));


/***/ }),
/* 556 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IHtmlCategoryTag = void 0;
/**
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories
 *
 * We separate the category tags from the actual HTML for better separation, we can create the relationship in the tree
 */
var IHtmlCategoryTag;
(function (IHtmlCategoryTag) {
    IHtmlCategoryTag["HtmlFlow"] = "HtmlFlow";
    IHtmlCategoryTag["HtmlHeading"] = "HtmlHeading";
    IHtmlCategoryTag["HtmlSectioning"] = "HtmlSectioning";
    IHtmlCategoryTag["HtmlEmbedded"] = "HtmlEmbedded";
    IHtmlCategoryTag["HtmlPhrasing"] = "HtmlPhrasing";
    IHtmlCategoryTag["HtmlInteractive"] = "HtmlInteractive";
    IHtmlCategoryTag["HtmlMetadata"] = "HtmlMetadata";
})(IHtmlCategoryTag = exports.IHtmlCategoryTag || (exports.IHtmlCategoryTag = {}));


/***/ }),
/* 557 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IReactCategoryTag = void 0;
var IReactCategoryTag;
(function (IReactCategoryTag) {
    IReactCategoryTag["ReactFragment"] = "React.Fragment";
})(IReactCategoryTag = exports.IReactCategoryTag || (exports.IReactCategoryTag = {}));


/***/ }),
/* 558 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 559 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AntDesignApiSchema = void 0;
const zod_1 = __webpack_require__(388);
const field_interface_1 = __webpack_require__(553);
/**
 * An atom can have more than one api
 */
exports.AntDesignApiSchema = zod_1.z.object({
    /**
     * This is the AntDesign components
     */
    atom: zod_1.z.object({
        api: zod_1.z.string(),
        name: zod_1.z.string(),
    }),
    fields: zod_1.z.array(field_interface_1.AntDesignFieldSchema),
});


/***/ }),
/* 560 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(561), exports);


/***/ }),
/* 561 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 562 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(563), exports);


/***/ }),
/* 563 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExtractHtmlFieldsService = void 0;
const tslib_1 = __webpack_require__(1);
const service_1 = __webpack_require__(24);
const type_1 = __webpack_require__(140);
const utils_1 = __webpack_require__(35);
const fs_1 = __webpack_require__(201);
const path_1 = tslib_1.__importDefault(__webpack_require__(202));
const uuid_1 = __webpack_require__(130);
const html_type_adapter_service_1 = __webpack_require__(564);
class ExtractHtmlFieldsService extends service_1.AuthUseCase {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "htmlDataFolder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: `${process.cwd()}/data/html/`
        });
        Object.defineProperty(this, "fieldRepository", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new type_1.FieldRepository()
        });
    }
    _execute(atoms) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const htmlAttributesByName = JSON.parse((0, fs_1.readFileSync)(path_1.default.resolve(this.htmlDataFolder, 'html.json'), 'utf8'));
            return atoms.reduce((accFieldsPromise, atom) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                // Convert HtmlA to a
                const htmlName = atom.name.toLowerCase().replace('html', '');
                const htmlFields = htmlAttributesByName[htmlName];
                if (!htmlFields) {
                    console.log(htmlName);
                    process.exit(0);
                    return yield accFieldsPromise;
                }
                const fields = yield this.transformFields(atom, htmlFields);
                return [...(yield accFieldsPromise), ...fields];
            }), Promise.resolve([]));
        });
    }
    transformFields(atom, fields) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return fields.reduce((accFields, field) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const existingOrNewField = yield this.createOrUpdateField(atom, field);
                if (!existingOrNewField) {
                    return [...(yield accFields)];
                }
                return [...(yield accFields), existingOrNewField];
            }), Promise.resolve([]));
        });
    }
    createOrUpdateField(atom, field) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const existingField = yield this.fieldRepository.findOne({
                api: {
                    id: atom.api.id,
                },
                key: field.key,
            });
            if (existingField) {
                return existingField;
            }
            const fieldTypeDTO = yield new html_type_adapter_service_1.HtmlTypeAdapterService({
                atom,
                field: {
                    key: field.key,
                },
                owner: this.owner,
            }).execute({ type: field.type });
            if (!fieldTypeDTO) {
                return undefined;
            }
            const type = yield type_1.TypeFactory.save(Object.assign(Object.assign({}, fieldTypeDTO), { owner: this.owner }), { name: fieldTypeDTO.name });
            return type_1.Field.create({
                api: { id: atom.api.id },
                defaultValues: null,
                description: '',
                fieldType: type,
                id: (0, uuid_1.v4)(),
                key: field.key,
                name: (0, utils_1.compoundCaseToTitleCase)(field.key),
            });
        });
    }
}
exports.ExtractHtmlFieldsService = ExtractHtmlFieldsService;


/***/ }),
/* 564 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HtmlTypeAdapterService = void 0;
const default_type_adapter_service_1 = __webpack_require__(319);
class HtmlTypeAdapterService extends default_type_adapter_service_1.DefaultTypeAdapterService {
}
exports.HtmlTypeAdapterService = HtmlTypeAdapterService;


/***/ }),
/* 565 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(566), exports);


/***/ }),
/* 566 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SeedEmptyApiService = void 0;
const tslib_1 = __webpack_require__(1);
const service_1 = __webpack_require__(24);
const type_1 = __webpack_require__(140);
/**
 * Seed empty API from atom names
 */
class SeedEmptyApiService extends service_1.AuthUseCase {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "interfaceTypeRepository", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new type_1.InterfaceTypeRepository()
        });
    }
    /**
     * Create empty interfaces from Ant Design atom name
     */
    _execute(atoms) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const existingInterfaceTypes = new Map((yield this.interfaceTypeRepository.find()).map((interfaceType) => [
                interfaceType.name,
                interfaceType,
            ]));
            yield Promise.all(atoms.map((name) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                // Want to get atom api y atom name
                const interfaceType = type_1.InterfaceType.createFromAtomName(name, this.owner);
                // Search existing interface type
                const existingInterfaceType = existingInterfaceTypes.get(interfaceType.name);
                // Keep same ID if exists
                if (existingInterfaceType) {
                    interfaceType.id = existingInterfaceType.id;
                }
                yield this.interfaceTypeRepository.save(Object.assign(Object.assign({}, interfaceType), { owner: this.owner }));
            })));
        });
    }
}
exports.SeedEmptyApiService = SeedEmptyApiService;


/***/ }),
/* 567 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(568), exports);


/***/ }),
/* 568 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(569), exports);
tslib_1.__exportStar(__webpack_require__(571), exports);
tslib_1.__exportStar(__webpack_require__(573), exports);


/***/ }),
/* 569 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(570), exports);


/***/ }),
/* 570 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.antdTagTree = void 0;
const core_1 = __webpack_require__(542);
const core_2 = __webpack_require__(86);
/**
 * This contains hierarchical tag data for Ant Design
 */
exports.antdTagTree = {
    [core_1.IAntdCategoryTag.AntDesignGeneral]: [
        core_2.IAtomType.AntDesignButton,
        core_2.IAtomType.AntDesignIcon,
        {
            [core_1.IAntdCategoryTag.AntDesignTypography]: [
                core_2.IAtomType.AntDesignTypographyText,
                core_2.IAtomType.AntDesignTypographyTitle,
                core_2.IAtomType.AntDesignTypographyParagraph,
            ],
        },
    ],
    [core_1.IAntdCategoryTag.AntDesignLayout]: [
        core_2.IAtomType.AntDesignDivider,
        {
            [core_1.IAntdCategoryTag.AntDesignGrid]: [
                core_2.IAtomType.AntDesignGridRow,
                core_2.IAtomType.AntDesignGridCol,
            ],
        },
        {
            [core_2.IAtomType.AntDesignLayout]: [
                core_2.IAtomType.AntDesignLayoutContent,
                core_2.IAtomType.AntDesignLayoutFooter,
                core_2.IAtomType.AntDesignLayoutHeader,
                core_2.IAtomType.AntDesignLayoutSider,
            ],
        },
        core_2.IAtomType.AntDesignSpace,
    ],
    [core_1.IAntdCategoryTag.AntDesignNavigation]: [
        core_2.IAtomType.AntDesignAffix,
        {
            [core_2.IAtomType.AntDesignBreadcrumb]: [
                core_2.IAtomType.AntDesignBreadcrumbItem,
                core_2.IAtomType.AntDesignBreadcrumbSeparator,
            ],
        },
        { [core_2.IAtomType.AntDesignDropdown]: [core_2.IAtomType.AntDesignDropdownButton] },
        core_2.IAtomType.AntDesignMenu,
        core_2.IAtomType.AntDesignPagination,
        { [core_2.IAtomType.AntDesignSteps]: [core_2.IAtomType.AntDesignStepsStep] },
    ],
    [core_1.IAntdCategoryTag.AntDesignDataEntry]: [
        core_2.IAtomType.AntDesignAutoComplete,
        core_2.IAtomType.AntDesignCascader,
        { [core_2.IAtomType.AntDesignCheckbox]: [core_2.IAtomType.AntDesignCheckboxGroup] },
        core_2.IAtomType.AntDesignDatePicker,
        {
            [core_2.IAtomType.AntDesignForm]: [
                core_2.IAtomType.AntDesignFormItem,
                core_2.IAtomType.AntDesignFormList,
                core_2.IAtomType.AntDesignFormErrorList,
                core_2.IAtomType.AntDesignFormProvider,
            ],
        },
        core_2.IAtomType.AntDesignInput,
        core_2.IAtomType.AntDesignInputNumber,
        { [core_2.IAtomType.AntDesignMentions]: [core_2.IAtomType.AntDesignMentionsOption] },
        { [core_2.IAtomType.AntDesignRadio]: [core_2.IAtomType.AntDesignRadioGroup] },
        core_2.IAtomType.AntDesignRate,
        { [core_2.IAtomType.AntDesignSelect]: [core_2.IAtomType.AntDesignSelectOption] },
        core_2.IAtomType.AntDesignSlider,
        core_2.IAtomType.AntDesignSwitch,
        core_2.IAtomType.AntDesignTimePicker,
        core_2.IAtomType.AntDesignTransfer,
        core_2.IAtomType.AntDesignTreeSelect,
        core_2.IAtomType.AntDesignUpload,
    ],
    [core_1.IAntdCategoryTag.AntDesignDataDisplay]: [
        core_2.IAtomType.AntDesignAvatar,
        core_2.IAtomType.AntDesignBadge,
        core_2.IAtomType.AntDesignComment,
        { [core_2.IAtomType.AntDesignCollapse]: [core_2.IAtomType.AntDesignCollapsePanel] },
        core_2.IAtomType.AntDesignCarousel,
        {
            [core_2.IAtomType.AntDesignCard]: [
                core_2.IAtomType.AntDesignCardGrid,
                core_2.IAtomType.AntDesignCardMeta,
            ],
        },
        core_2.IAtomType.AntDesignCalendar,
        {
            [core_2.IAtomType.AntDesignDescriptions]: [core_2.IAtomType.AntDesignDescriptionsItem],
        },
        core_2.IAtomType.AntDesignEmpty,
        core_2.IAtomType.AntDesignImage,
        {
            [core_2.IAtomType.AntDesignList]: [
                { [core_2.IAtomType.AntDesignListItem]: [core_2.IAtomType.AntDesignListItemMeta] },
            ],
        },
        core_2.IAtomType.AntDesignPopover,
        core_2.IAtomType.AntDesignSegmented,
        core_2.IAtomType.AntDesignStatistic,
        core_2.IAtomType.AntDesignTree,
        core_2.IAtomType.AntDesignTooltip,
        { [core_2.IAtomType.AntDesignTimeline]: [core_2.IAtomType.AntDesignTimelineItem] },
        core_2.IAtomType.AntDesignTag,
        { [core_2.IAtomType.AntDesignTabs]: [core_2.IAtomType.AntDesignTabsTabPane] },
        core_2.IAtomType.AntDesignTable,
    ],
    [core_1.IAntdCategoryTag.AntDesignFeedback]: [
        core_2.IAtomType.AntDesignAlert,
        core_2.IAtomType.AntDesignDrawer,
        core_2.IAtomType.AntDesignModal,
        core_2.IAtomType.AntDesignMessage,
        core_2.IAtomType.AntDesignNotification,
        core_2.IAtomType.AntDesignProgress,
        core_2.IAtomType.AntDesignPopconfirm,
        core_2.IAtomType.AntDesignResult,
        core_2.IAtomType.AntDesignSpin,
        core_2.IAtomType.AntDesignSkeleton,
    ],
    [core_1.IAntdCategoryTag.AntDesignOther]: [
        { [core_2.IAtomType.AntDesignAnchor]: [core_2.IAtomType.AntDesignAnchorLink] },
        core_2.IAtomType.AntDesignBackTop,
        core_2.IAtomType.AntDesignConfigProvider,
    ],
};


/***/ }),
/* 571 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(572), exports);


/***/ }),
/* 572 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.htmlTagTree = void 0;
const core_1 = __webpack_require__(542);
const core_2 = __webpack_require__(86);
/**
 * Taken from here https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories
 */
exports.htmlTagTree = {
    [core_1.IHtmlCategoryTag.HtmlSectioning]: [
        core_2.IAtomType.HtmlArticle,
        core_2.IAtomType.HtmlAside,
        core_2.IAtomType.HtmlNav,
        core_2.IAtomType.HtmlSection,
    ],
    [core_1.IHtmlCategoryTag.HtmlHeading]: [
        core_2.IAtomType.HtmlH1,
        core_2.IAtomType.HtmlH2,
        core_2.IAtomType.HtmlH3,
        core_2.IAtomType.HtmlH4,
        core_2.IAtomType.HtmlH5,
        core_2.IAtomType.HtmlH6,
    ],
    [core_1.IHtmlCategoryTag.HtmlPhrasing]: [
        core_2.IAtomType.HtmlAbbr,
        core_2.IAtomType.HtmlB,
        core_2.IAtomType.HtmlBdo,
        core_2.IAtomType.HtmlBr,
        core_2.IAtomType.HtmlCanvas,
        core_2.IAtomType.HtmlCite,
        core_2.IAtomType.HtmlCode,
        core_2.IAtomType.HtmlData,
        core_2.IAtomType.HtmlDatalist,
        core_2.IAtomType.HtmlDfn,
        core_2.IAtomType.HtmlEm,
        core_2.IAtomType.HtmlEmbed,
        core_2.IAtomType.HtmlI,
        core_2.IAtomType.HtmlIframe,
        core_2.IAtomType.HtmlInput,
        core_2.IAtomType.HtmlKbd,
        core_2.IAtomType.HtmlLabel,
        core_2.IAtomType.HtmlMark,
        core_2.IAtomType.HtmlMath,
        core_2.IAtomType.HtmlMeter,
        core_2.IAtomType.HtmlNoscript,
        core_2.IAtomType.HtmlObject,
        core_2.IAtomType.HtmlOutput,
        core_2.IAtomType.HtmlPicture,
        core_2.IAtomType.HtmlProgress,
        core_2.IAtomType.HtmlQ,
        core_2.IAtomType.HtmlRuby,
        core_2.IAtomType.HtmlS,
        core_2.IAtomType.HtmlSamp,
        core_2.IAtomType.HtmlScript,
        core_2.IAtomType.HtmlSelect,
        core_2.IAtomType.HtmlSmall,
        core_2.IAtomType.HtmlSpan,
        core_2.IAtomType.HtmlStrong,
        core_2.IAtomType.HtmlSub,
        core_2.IAtomType.HtmlSup,
        core_2.IAtomType.HtmlSvg,
        core_2.IAtomType.HtmlTextarea,
        core_2.IAtomType.HtmlTime,
        core_2.IAtomType.HtmlU,
        core_2.IAtomType.HtmlVar,
        core_2.IAtomType.HtmlVideo,
        core_2.IAtomType.HtmlWbr,
    ],
    [core_1.IHtmlCategoryTag.HtmlEmbedded]: [
        core_2.IAtomType.HtmlAudio,
        core_2.IAtomType.HtmlCanvas,
        core_2.IAtomType.HtmlEmbed,
        core_2.IAtomType.HtmlIframe,
        core_2.IAtomType.HtmlImg,
        core_2.IAtomType.HtmlMath,
        core_2.IAtomType.HtmlObject,
        core_2.IAtomType.HtmlPicture,
        core_2.IAtomType.HtmlSvg,
        core_2.IAtomType.HtmlVideo,
    ],
    [core_1.IHtmlCategoryTag.HtmlInteractive]: [
        core_2.IAtomType.HtmlA,
        core_2.IAtomType.HtmlButton,
        core_2.IAtomType.HtmlDetails,
        core_2.IAtomType.HtmlEmbed,
        core_2.IAtomType.HtmlIframe,
        core_2.IAtomType.HtmlLabel,
        core_2.IAtomType.HtmlSelect,
        core_2.IAtomType.HtmlTextarea,
    ],
    [core_1.IHtmlCategoryTag.HtmlMetadata]: [
        core_2.IAtomType.HtmlBase,
        core_2.IAtomType.HtmlHead,
        core_2.IAtomType.HtmlLink,
        core_2.IAtomType.HtmlMeta,
        core_2.IAtomType.HtmlStyle,
        core_2.IAtomType.HtmlTitle,
    ],
    // Treat this as `Other`
    [core_1.IHtmlCategoryTag.HtmlFlow]: [
        core_2.IAtomType.HtmlArea,
        core_2.IAtomType.HtmlDl,
        core_2.IAtomType.HtmlDialog,
        core_2.IAtomType.HtmlDiv,
        core_2.IAtomType.HtmlFieldset,
        core_2.IAtomType.HtmlFooter,
        core_2.IAtomType.HtmlForm,
        core_2.IAtomType.HtmlHeader,
        core_2.IAtomType.HtmlHr,
        core_2.IAtomType.HtmlLegend,
        core_2.IAtomType.HtmlLi,
        core_2.IAtomType.HtmlMain,
        core_2.IAtomType.HtmlMap,
        core_2.IAtomType.HtmlOl,
        core_2.IAtomType.HtmlOptgroup,
        core_2.IAtomType.HtmlOption,
        core_2.IAtomType.HtmlP,
        core_2.IAtomType.HtmlPre,
        core_2.IAtomType.HtmlParam,
        core_2.IAtomType.HtmlBlockquote,
        core_2.IAtomType.HtmlSource,
        core_2.IAtomType.HtmlTable,
        core_2.IAtomType.HtmlCaption,
        core_2.IAtomType.HtmlTd,
        core_2.IAtomType.HtmlTh,
        core_2.IAtomType.HtmlTr,
        core_2.IAtomType.HtmlTemplate,
        core_2.IAtomType.HtmlTrack,
        core_2.IAtomType.HtmlUl,
    ],
};


/***/ }),
/* 573 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(574), exports);


/***/ }),
/* 574 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.reactTagTree = void 0;
const core_1 = __webpack_require__(542);
exports.reactTagTree = {
    [core_1.IReactCategoryTag.ReactFragment]: [],
};


/***/ }),
/* 575 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(576), exports);


/***/ }),
/* 576 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(577), exports);
tslib_1.__exportStar(__webpack_require__(578), exports);
tslib_1.__exportStar(__webpack_require__(579), exports);
tslib_1.__exportStar(__webpack_require__(580), exports);


/***/ }),
/* 577 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.antdAtomData = void 0;
const core_1 = __webpack_require__(542);
const core_2 = __webpack_require__(86);
/**
 * Assign all data that is related to the atom here
 */
// TODO: remove the partial in key
// https://www.learn-codes.net/javascript/typescript-typescript-types-key-value-enum/
exports.antdAtomData = {
    //
    // Antd:
    //
    [core_2.IAtomType.AntDesignAffix]: {
        file: 'Affix',
        icon: core_2.IAtomType.AntDesignAffix,
        tag: core_2.IAtomType.AntDesignAffix,
    },
    [core_2.IAtomType.AntDesignAlert]: {
        file: 'Alert--Alert.ErrorBoundary',
        icon: core_2.IAtomType.AntDesignAlert,
        tag: core_2.IAtomType.AntDesignAlert,
    },
    [core_2.IAtomType.AntDesignAnchor]: {
        file: 'Anchor--Anchor Props',
        icon: core_2.IAtomType.AntDesignAnchor,
        tag: core_2.IAtomType.AntDesignAnchor,
    },
    [core_2.IAtomType.AntDesignAnchorLink]: {
        file: 'Anchor--Link Props',
        icon: core_2.IAtomType.AntDesignAnchorLink,
        tag: core_2.IAtomType.AntDesignAnchorLink,
    },
    [core_2.IAtomType.AntDesignAvatar]: {
        file: 'Avatar',
        icon: core_2.IAtomType.AntDesignAvatar,
        tag: core_2.IAtomType.AntDesignAvatar,
    },
    // 'Avatar--Avatar.Group (4.5.0+)': IAtomType.AntDesignAvatar,
    [core_2.IAtomType.AntDesignBackTop]: {
        file: 'BackTop',
        icon: core_2.IAtomType.AntDesignBackTop,
        tag: core_2.IAtomType.AntDesignBackTop,
    },
    [core_2.IAtomType.AntDesignBadge]: {
        file: 'Badge',
        icon: core_2.IAtomType.AntDesignBadge,
        tag: core_2.IAtomType.AntDesignBadge,
    },
    // 'Badge--Badge.Ribbon (4.5.0+)': IAtomType.AntDesignBadge,
    [core_2.IAtomType.AntDesignBreadcrumb]: {
        file: 'Breadcrumb',
        icon: core_2.IAtomType.AntDesignBreadcrumb,
        tag: core_2.IAtomType.AntDesignBreadcrumb,
    },
    [core_2.IAtomType.AntDesignBreadcrumbItem]: {
        file: 'Breadcrumb--Breadcrumb.Item',
        icon: core_2.IAtomType.AntDesignBreadcrumb,
        tag: core_2.IAtomType.AntDesignBreadcrumbItem,
    },
    [core_2.IAtomType.AntDesignBreadcrumbSeparator]: {
        // file: 'Breadcrumb--Breadcrumb.Separator',
        file: null,
        icon: core_2.IAtomType.AntDesignBreadcrumb,
        tag: core_2.IAtomType.AntDesignBreadcrumbSeparator,
    },
    [core_2.IAtomType.AntDesignButton]: {
        file: 'Button',
        icon: core_2.IAtomType.AntDesignButton,
        tag: core_2.IAtomType.AntDesignButton,
    },
    [core_2.IAtomType.AntDesignCalendar]: {
        file: 'Calendar',
        icon: core_2.IAtomType.AntDesignCalendar,
        tag: core_2.IAtomType.AntDesignCalendar,
    },
    [core_2.IAtomType.AntDesignCard]: {
        file: 'Card',
        icon: core_2.IAtomType.AntDesignCard,
        tag: core_2.IAtomType.AntDesignCard,
    },
    [core_2.IAtomType.AntDesignCardGrid]: {
        file: 'Card--Card.Grid',
        icon: core_2.IAtomType.AntDesignCard,
        tag: core_2.IAtomType.AntDesignCardGrid,
    },
    [core_2.IAtomType.AntDesignCardMeta]: {
        file: 'Card--Card.Meta',
        icon: core_2.IAtomType.AntDesignCard,
        tag: core_2.IAtomType.AntDesignCardMeta,
    },
    [core_2.IAtomType.AntDesignAutoComplete]: {
        file: null,
        icon: core_2.IAtomType.AntDesignAutoComplete,
        tag: core_2.IAtomType.AntDesignAutoComplete,
    },
    [core_2.IAtomType.AntDesignCascader]: {
        // file: Cascader--showSearch',
        file: null,
        icon: core_2.IAtomType.AntDesignCascader,
        tag: core_2.IAtomType.AntDesignCascader,
    },
    [core_2.IAtomType.AntDesignCheckbox]: {
        file: 'Checkbox--Props',
        icon: core_2.IAtomType.AntDesignCheckbox,
        tag: core_2.IAtomType.AntDesignCheckbox,
    },
    [core_2.IAtomType.AntDesignCheckboxGroup]: {
        file: 'Checkbox--Props',
        icon: core_2.IAtomType.AntDesignCheckbox,
        tag: core_2.IAtomType.AntDesignCheckboxGroup,
    },
    [core_2.IAtomType.AntDesignCarousel]: {
        file: null,
        icon: core_2.IAtomType.AntDesignCarousel,
        tag: core_2.IAtomType.AntDesignCarousel,
    },
    [core_2.IAtomType.AntDesignCollapse]: {
        file: 'Collapse',
        icon: core_2.IAtomType.AntDesignCollapse,
        tag: core_2.IAtomType.AntDesignCollapse,
    },
    [core_2.IAtomType.AntDesignCollapsePanel]: {
        file: 'Collapse--Collapse.Panel',
        icon: core_2.IAtomType.AntDesignCollapse,
        tag: core_2.IAtomType.AntDesignCollapsePanel,
    },
    [core_2.IAtomType.AntDesignComment]: {
        file: 'Comment',
        icon: core_2.IAtomType.AntDesignComment,
        tag: core_2.IAtomType.AntDesignComment,
    },
    [core_2.IAtomType.AntDesignConfigProvider]: {
        file: 'ConfigProvider',
        icon: core_2.IAtomType.AntDesignConfigProvider,
        tag: core_2.IAtomType.AntDesignConfigProvider,
    },
    [core_2.IAtomType.AntDesignDatePicker]: {
        file: 'DatePicker',
        icon: core_2.IAtomType.AntDesignDatePicker,
        tag: core_2.IAtomType.AntDesignDatePicker,
    },
    // 'DatePicker--Common API': IAtomType.AntDesignDatePicker,
    // 'DatePicker--DatePicker[picker=month]': IAtomType.AntDesignDatePicker,
    // 'DatePicker--DatePicker[picker=quarter]': IAtomType.AntDesignDatePicker,
    // 'DatePicker--DatePicker[picker=week]': IAtomType.AntDesignDatePicker,
    // 'DatePicker--DatePicker[picker=year]': IAtomType.AntDesignDatePicker,
    // 'DatePicker--RangePicker': IAtomType.AntDesignDatePicker,
    [core_2.IAtomType.AntDesignDescriptions]: {
        file: 'Descriptions',
        icon: core_2.IAtomType.AntDesignDescriptions,
        tag: core_2.IAtomType.AntDesignDescriptions,
    },
    [core_2.IAtomType.AntDesignDescriptionsItem]: {
        file: 'Descriptions--DescriptionItem',
        icon: core_2.IAtomType.AntDesignDescriptions,
        tag: core_2.IAtomType.AntDesignDescriptionsItem,
    },
    [core_2.IAtomType.AntDesignDivider]: {
        file: 'Divider',
        icon: core_2.IAtomType.AntDesignDivider,
        tag: core_2.IAtomType.AntDesignDivider,
    },
    [core_2.IAtomType.AntDesignDrawer]: {
        file: 'Drawer',
        icon: core_2.IAtomType.AntDesignDrawer,
        tag: core_2.IAtomType.AntDesignDrawer,
    },
    [core_2.IAtomType.AntDesignMessage]: {
        file: null,
        icon: core_2.IAtomType.AntDesignMessage,
        tag: core_2.IAtomType.AntDesignMessage,
    },
    [core_2.IAtomType.AntDesignDropdown]: {
        file: 'Dropdown',
        icon: core_2.IAtomType.AntDesignDropdown,
        tag: core_2.IAtomType.AntDesignDropdown,
    },
    [core_2.IAtomType.AntDesignDropdownButton]: {
        // file: 'Dropdown--Dropdown.Button',
        file: null,
        icon: core_2.IAtomType.AntDesignDropdown,
        tag: core_2.IAtomType.AntDesignDropdown,
    },
    [core_2.IAtomType.AntDesignEmpty]: {
        file: 'Empty',
        icon: core_2.IAtomType.AntDesignEmpty,
        tag: core_2.IAtomType.AntDesignEmpty,
    },
    [core_2.IAtomType.AntDesignForm]: {
        file: 'Form',
        icon: core_2.IAtomType.AntDesignForm,
        suggestedChildren: [core_2.IAtomType.AntDesignFormItem],
        tag: core_2.IAtomType.AntDesignForm,
    },
    [core_2.IAtomType.AntDesignFormItem]: {
        file: 'Form--Item',
        icon: core_2.IAtomType.AntDesignForm,
        suggestedChildren: [
            core_2.IAtomType.AntDesignInput,
            core_2.IAtomType.AntDesignButton,
            core_2.IAtomType.AntDesignCheckbox,
            core_2.IAtomType.AntDesignRadioGroup,
        ],
        tag: core_2.IAtomType.AntDesignFormItem,
    },
    [core_2.IAtomType.AntDesignFormList]: {
        file: null,
        icon: core_2.IAtomType.AntDesignForm,
        tag: core_2.IAtomType.AntDesignFormList,
    },
    [core_2.IAtomType.AntDesignFormErrorList]: {
        file: null,
        icon: core_2.IAtomType.AntDesignForm,
        tag: core_2.IAtomType.AntDesignFormErrorList,
    },
    [core_2.IAtomType.AntDesignFormProvider]: {
        file: null,
        icon: core_2.IAtomType.AntDesignForm,
        tag: core_2.IAtomType.AntDesignFormProvider,
    },
    // 'Form--FormInstance': IAtomType.AntDesignForm,
    [core_2.IAtomType.AntDesignGridCol]: {
        file: 'Grid--Col',
        icon: 'Grid',
        tag: core_2.IAtomType.AntDesignGridCol,
    },
    [core_2.IAtomType.AntDesignGridRow]: {
        file: 'Grid--Row',
        icon: 'Grid',
        tag: core_2.IAtomType.AntDesignGridRow,
    },
    [core_2.IAtomType.AntDesignIcon]: {
        file: 'Icon--Common Icon',
        icon: core_2.IAtomType.AntDesignIcon,
        tag: core_2.IAtomType.AntDesignIcon,
    },
    // 'Icon--Custom Icon': IAtomType.AntDesignIcon,
    // Image: IAtomType.AntDesignImage,
    [core_2.IAtomType.AntDesignInput]: {
        file: 'Input',
        icon: core_2.IAtomType.AntDesignInput,
        tag: core_2.IAtomType.AntDesignInput,
    },
    [core_2.IAtomType.AntDesignInputNumber]: {
        file: null,
        icon: core_2.IAtomType.AntDesignInputNumber,
        tag: core_2.IAtomType.AntDesignInputNumber,
    },
    // 'Input--Input.TextArea': IAtomType.AntDesignInput,
    [core_2.IAtomType.AntDesignLayout]: {
        file: 'Layout',
        icon: core_2.IAtomType.AntDesignLayout,
        tag: core_2.IAtomType.AntDesignLayout,
    },
    [core_2.IAtomType.AntDesignLayoutFooter]: {
        file: null,
        icon: core_2.IAtomType.AntDesignLayout,
        tag: core_2.IAtomType.AntDesignLayoutFooter,
    },
    [core_2.IAtomType.AntDesignLayoutHeader]: {
        file: null,
        icon: core_2.IAtomType.AntDesignLayout,
        tag: core_2.IAtomType.AntDesignLayoutHeader,
    },
    [core_2.IAtomType.AntDesignLayoutContent]: {
        file: null,
        icon: core_2.IAtomType.AntDesignLayoutContent,
        tag: core_2.IAtomType.AntDesignLayoutContent,
    },
    [core_2.IAtomType.AntDesignLayoutSider]: {
        file: 'Layout--Layout.Sider',
        icon: core_2.IAtomType.AntDesignLayout,
        tag: core_2.IAtomType.AntDesignLayoutSider,
    },
    [core_2.IAtomType.AntDesignList]: {
        file: 'List',
        icon: core_2.IAtomType.AntDesignList,
        tag: core_2.IAtomType.AntDesignList,
    },
    [core_2.IAtomType.AntDesignListItem]: {
        file: 'List--List.Item',
        icon: core_2.IAtomType.AntDesignList,
        tag: core_2.IAtomType.AntDesignListItem,
    },
    [core_2.IAtomType.AntDesignListItemMeta]: {
        file: 'List--List.Item.Meta',
        icon: core_2.IAtomType.AntDesignList,
        tag: core_2.IAtomType.AntDesignListItemMeta,
    },
    // 'List--List grid props': IAtomType.AntDesignList,
    // 'List--pagination': IAtomType.AntDesignList,
    [core_2.IAtomType.AntDesignMentions]: {
        file: 'Mentions--Mention',
        icon: core_2.IAtomType.AntDesignMentions,
        tag: core_2.IAtomType.AntDesignMentions,
    },
    [core_2.IAtomType.AntDesignMentionsOption]: {
        file: 'Mentions--Option',
        icon: core_2.IAtomType.AntDesignMentions,
        tag: core_2.IAtomType.AntDesignMentionsOption,
    },
    [core_2.IAtomType.AntDesignMenu]: {
        file: 'Menu',
        icon: core_2.IAtomType.AntDesignMenu,
        tag: core_2.IAtomType.AntDesignMenu,
    },
    [core_2.IAtomType.AntDesignPagination]: {
        file: 'Pagination',
        icon: core_2.IAtomType.AntDesignPagination,
        tag: core_2.IAtomType.AntDesignPagination,
    },
    [core_2.IAtomType.AntDesignPopconfirm]: {
        file: 'Popconfirm',
        icon: core_2.IAtomType.AntDesignPopconfirm,
        tag: core_2.IAtomType.AntDesignPopconfirm,
    },
    [core_2.IAtomType.AntDesignPopover]: {
        file: 'Popover',
        icon: core_2.IAtomType.AntDesignPopover,
        tag: core_2.IAtomType.AntDesignPopover,
    },
    [core_2.IAtomType.AntDesignSegmented]: {
        file: 'Popover',
        icon: core_2.IAtomType.AntDesignSegmented,
        tag: core_2.IAtomType.AntDesignSegmented,
    },
    [core_2.IAtomType.AntDesignStatistic]: {
        file: null,
        icon: core_2.IAtomType.AntDesignStatistic,
        tag: core_2.IAtomType.AntDesignStatistic,
    },
    [core_2.IAtomType.AntDesignProgress]: {
        file: 'Progress--type=circle',
        icon: core_2.IAtomType.AntDesignProgress,
        tag: core_2.IAtomType.AntDesignProgress,
    },
    [core_2.IAtomType.AntDesignRadio]: {
        file: 'Radio--Radio_Radio.Button',
        icon: core_2.IAtomType.AntDesignRadio,
        tag: core_2.IAtomType.AntDesignRadio,
    },
    [core_2.IAtomType.AntDesignRadioGroup]: {
        file: 'Radio--RadioGroup',
        icon: core_2.IAtomType.AntDesignRadio,
        tag: core_2.IAtomType.AntDesignRadioGroup,
    },
    [core_2.IAtomType.AntDesignRate]: {
        file: null,
        icon: core_2.IAtomType.AntDesignRate,
        tag: core_2.IAtomType.AntDesignRate,
    },
    [core_2.IAtomType.AntDesignResult]: {
        file: 'Result',
        icon: core_2.IAtomType.AntDesignResult,
        tag: core_2.IAtomType.AntDesignResult,
    },
    // 'Select--OptGroup props': IAtomType.AntDesignSelect,
    [core_2.IAtomType.AntDesignSelect]: {
        file: 'Select--Select props',
        icon: core_2.IAtomType.AntDesignSelect,
        tag: core_2.IAtomType.AntDesignSelect,
    },
    [core_2.IAtomType.AntDesignSelectOption]: {
        file: 'Select--Option props',
        icon: core_2.IAtomType.AntDesignSelect,
        tag: core_2.IAtomType.AntDesignSelectOption,
    },
    [core_2.IAtomType.AntDesignSkeleton]: {
        file: 'Skeleton',
        icon: core_2.IAtomType.AntDesignSkeleton,
        tag: core_2.IAtomType.AntDesignSkeleton,
    },
    [core_2.IAtomType.AntDesignSlider]: {
        file: 'Slider--range',
        icon: core_2.IAtomType.AntDesignSlider,
        tag: core_2.IAtomType.AntDesignSlider,
    },
    [core_2.IAtomType.AntDesignSwitch]: {
        file: null,
        icon: core_2.IAtomType.AntDesignSwitch,
        tag: core_2.IAtomType.AntDesignSwitch,
    },
    [core_2.IAtomType.AntDesignTimePicker]: {
        file: null,
        icon: core_2.IAtomType.AntDesignTimePicker,
        tag: core_2.IAtomType.AntDesignTimePicker,
    },
    [core_2.IAtomType.AntDesignTransfer]: {
        file: null,
        icon: core_2.IAtomType.AntDesignTransfer,
        tag: core_2.IAtomType.AntDesignTransfer,
    },
    [core_2.IAtomType.AntDesignSpace]: {
        file: 'Space',
        icon: core_2.IAtomType.AntDesignSpace,
        tag: core_2.IAtomType.AntDesignSpace,
    },
    [core_2.IAtomType.AntDesignSpin]: {
        file: 'Spin',
        icon: core_2.IAtomType.AntDesignSpin,
        tag: core_2.IAtomType.AntDesignSpin,
    },
    [core_2.IAtomType.AntDesignSteps]: {
        file: 'Steps',
        icon: core_2.IAtomType.AntDesignSteps,
        tag: core_2.IAtomType.AntDesignSteps,
    },
    [core_2.IAtomType.AntDesignStepsStep]: {
        file: 'Steps--Steps.Step',
        icon: core_2.IAtomType.AntDesignSteps,
        tag: core_2.IAtomType.AntDesignStepsStep,
    },
    [core_2.IAtomType.AntDesignTable]: {
        file: 'Table',
        icon: core_2.IAtomType.AntDesignTable,
        tag: core_2.IAtomType.AntDesignTable,
    },
    // 'Table--Column': IAtomType.AntDesignTable,
    // 'Table--ColumnGroup': IAtomType.AntDesignTable,
    // 'Table--expandable': IAtomType.AntDesignTable,
    // 'Table--pagination': IAtomType.AntDesignTable,
    // 'Table--rowSelection': IAtomType.AntDesignTable,
    // 'Table--scroll': IAtomType.AntDesignTable,
    // 'Table--selection': IAtomType.AntDesignTable,
    [core_2.IAtomType.AntDesignTabs]: {
        file: 'Tabs',
        icon: core_2.IAtomType.AntDesignTabs,
        tag: core_2.IAtomType.AntDesignTabs,
    },
    [core_2.IAtomType.AntDesignTabsTabPane]: {
        file: 'Tabs--Tabs.TabPane',
        icon: core_2.IAtomType.AntDesignTabs,
        tag: core_2.IAtomType.AntDesignTabsTabPane,
    },
    [core_2.IAtomType.AntDesignTag]: {
        file: 'Tag',
        icon: core_2.IAtomType.AntDesignTag,
        tag: core_2.IAtomType.AntDesignTag,
    },
    // 'Tag--Tag.CheckableTag': IAtomType.AntDesignTag,
    [core_2.IAtomType.AntDesignTimeline]: {
        file: 'Timeline',
        icon: core_2.IAtomType.AntDesignTimeline,
        tag: core_2.IAtomType.AntDesignTimeline,
    },
    [core_2.IAtomType.AntDesignTimelineItem]: {
        file: 'Timeline--Timeline.Item',
        icon: core_2.IAtomType.AntDesignTimeline,
        tag: core_2.IAtomType.AntDesignTimelineItem,
    },
    // 'TimePicker--RangePicker': IAtomType.AntDesignTimePicker,
    [core_2.IAtomType.AntDesignTooltip]: {
        file: 'Tooltip--Common API',
        icon: core_2.IAtomType.AntDesignTooltip,
        tag: core_2.IAtomType.AntDesignTooltip,
    },
    // 'Transfer--Render Props': IAtomType.AntDesignTransfer,
    // 'Tree--DirectoryTree props': IAtomType.AntDesignTree,
    [core_2.IAtomType.AntDesignTree]: {
        file: 'Tree--Tree props',
        icon: core_2.IAtomType.AntDesignTree,
        tag: core_2.IAtomType.AntDesignTree,
    },
    [core_2.IAtomType.AntDesignTreeSelect]: {
        file: 'TreeSelect--Tree props',
        icon: core_2.IAtomType.AntDesignTreeSelect,
        tag: core_2.IAtomType.AntDesignTreeSelect,
    },
    // 'Typography--copyable': IAtomType.AntDesignTypography,
    // 'Typography--editable': IAtomType.AntDesignTypography,
    // 'Typography--ellipsis': IAtomType.AntDesignTypography,
    [core_2.IAtomType.AntDesignTypographyParagraph]: {
        file: 'Typography--Typography.Paragraph',
        icon: core_1.IAntdCategoryTag.AntDesignTypography,
        tag: core_2.IAtomType.AntDesignTypographyParagraph,
    },
    [core_2.IAtomType.AntDesignTypographyText]: {
        file: 'Typography--Typography.Text',
        icon: core_1.IAntdCategoryTag.AntDesignTypography,
        tag: core_2.IAtomType.AntDesignTypographyText,
    },
    [core_2.IAtomType.AntDesignTypographyTitle]: {
        file: 'Typography--Typography.Title',
        icon: core_1.IAntdCategoryTag.AntDesignTypography,
        tag: core_2.IAtomType.AntDesignTypographyText,
    },
    [core_2.IAtomType.AntDesignUpload]: {
        file: 'Upload--UploadFile',
        icon: core_2.IAtomType.AntDesignUpload,
        tag: core_2.IAtomType.AntDesignUpload,
    },
    [core_2.IAtomType.AntDesignImage]: {
        file: 'Image',
        icon: core_2.IAtomType.AntDesignImage,
        tag: core_2.IAtomType.AntDesignImage,
    },
    [core_2.IAtomType.AntDesignModal]: {
        file: 'Modal',
        icon: core_2.IAtomType.AntDesignModal,
        tag: core_2.IAtomType.AntDesignModal,
    },
    [core_2.IAtomType.AntDesignNotification]: {
        file: null,
        icon: core_2.IAtomType.AntDesignNotification,
        tag: core_2.IAtomType.AntDesignNotification,
    },
    //
    // Custom components:
    //
    // [IAtomType.Query]: {
    //   file: 'Query',
    //   tag: null,
    //   icon: null,
    // },
    // [IAtomType.TextList]: {
    //   file: 'TextList',
    //   tag: null,
    //   icon: null,
    // },
    // [IAtomType.Text]: {
    //   file: 'Text',
    //   tag: null,
    //   icon: null,
    // },
    // [IAtomType.State]: {
    //   file: 'State',
    //   tag: null,
    //   icon: null,
    // },
};


/***/ }),
/* 578 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.atomsData = void 0;
const antd_atom_data_1 = __webpack_require__(577);
const html_atom_data_1 = __webpack_require__(579);
const react_atom_data_1 = __webpack_require__(580);
// Colocate here
exports.atomsData = Object.assign(Object.assign(Object.assign({}, html_atom_data_1.htmlAtomData), antd_atom_data_1.antdAtomData), react_atom_data_1.reactAtomData);


/***/ }),
/* 579 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.htmlAtomData = void 0;
const core_1 = __webpack_require__(86);
exports.htmlAtomData = {
    [core_1.IAtomType.HtmlA]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlA,
    },
    [core_1.IAtomType.HtmlArea]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlArea,
    },
    [core_1.IAtomType.HtmlAside]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlAside,
    },
    [core_1.IAtomType.HtmlAudio]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlAudio,
    },
    [core_1.IAtomType.HtmlBase]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlBase,
    },
    [core_1.IAtomType.HtmlBr]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlBr,
    },
    [core_1.IAtomType.HtmlButton]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlButton,
    },
    [core_1.IAtomType.HtmlCanvas]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlCanvas,
    },
    [core_1.IAtomType.HtmlCode]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlCode,
    },
    [core_1.IAtomType.HtmlCol]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlCol,
    },
    [core_1.IAtomType.HtmlDl]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlDl,
    },
    [core_1.IAtomType.HtmlData]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlData,
    },
    [core_1.IAtomType.HtmlDatalist]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlDatalist,
    },
    [core_1.IAtomType.HtmlDetails]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlDetails,
    },
    [core_1.IAtomType.HtmlDialog]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlDialog,
    },
    [core_1.IAtomType.HtmlDiv]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlDiv,
    },
    [core_1.IAtomType.HtmlEm]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlEm,
    },
    [core_1.IAtomType.HtmlEmbed]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlEmbed,
    },
    [core_1.IAtomType.HtmlFieldset]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlFieldset,
    },
    [core_1.IAtomType.HtmlFooter]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlFooter,
    },
    [core_1.IAtomType.HtmlForm]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlForm,
    },
    [core_1.IAtomType.HtmlH1]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlH1,
    },
    [core_1.IAtomType.HtmlH2]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlH2,
    },
    [core_1.IAtomType.HtmlH3]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlH3,
    },
    [core_1.IAtomType.HtmlH4]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlH4,
    },
    [core_1.IAtomType.HtmlH5]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlH5,
    },
    [core_1.IAtomType.HtmlH6]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlH6,
    },
    [core_1.IAtomType.HtmlHead]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlHead,
    },
    [core_1.IAtomType.HtmlHeader]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlHeader,
    },
    [core_1.IAtomType.HtmlHr]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlHr,
    },
    [core_1.IAtomType.HtmlI]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlI,
    },
    [core_1.IAtomType.HtmlIframe]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlIframe,
    },
    [core_1.IAtomType.HtmlImg]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlImg,
    },
    [core_1.IAtomType.HtmlInput]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlInput,
    },
    [core_1.IAtomType.HtmlLabel]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlLabel,
    },
    [core_1.IAtomType.HtmlLegend]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlLegend,
    },
    [core_1.IAtomType.HtmlLi]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlLi,
    },
    [core_1.IAtomType.HtmlLink]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlLink,
    },
    [core_1.IAtomType.HtmlMain]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlMain,
    },
    [core_1.IAtomType.HtmlMap]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlMap,
    },
    [core_1.IAtomType.HtmlMeta]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlMeta,
    },
    [core_1.IAtomType.HtmlMeter]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlMeter,
    },
    [core_1.IAtomType.HtmlNav]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlNav,
    },
    [core_1.IAtomType.HtmlOl]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlOl,
    },
    [core_1.IAtomType.HtmlObject]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlObject,
    },
    [core_1.IAtomType.HtmlOptgroup]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlOptgroup,
    },
    [core_1.IAtomType.HtmlOption]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlOption,
    },
    [core_1.IAtomType.HtmlOutput]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlOutput,
    },
    [core_1.IAtomType.HtmlP]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlP,
    },
    [core_1.IAtomType.HtmlParam]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlParam,
    },
    [core_1.IAtomType.HtmlPicture]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlPicture,
    },
    [core_1.IAtomType.HtmlPre]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlPre,
    },
    [core_1.IAtomType.HtmlProgress]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlProgress,
    },
    [core_1.IAtomType.HtmlBlockquote]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlBlockquote,
    },
    [core_1.IAtomType.HtmlS]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlS,
    },
    [core_1.IAtomType.HtmlSection]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlSection,
    },
    [core_1.IAtomType.HtmlSelect]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlSelect,
    },
    [core_1.IAtomType.HtmlSmall]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlSmall,
    },
    [core_1.IAtomType.HtmlSource]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlSource,
    },
    [core_1.IAtomType.HtmlSpan]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlSpan,
    },
    [core_1.IAtomType.HtmlStrong]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlStrong,
    },
    [core_1.IAtomType.HtmlStyle]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlStyle,
    },
    [core_1.IAtomType.HtmlSub]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlSub,
    },
    [core_1.IAtomType.HtmlSup]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlSup,
    },
    [core_1.IAtomType.HtmlTable]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlTable,
    },
    [core_1.IAtomType.HtmlCaption]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlCaption,
    },
    [core_1.IAtomType.HtmlTd]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlTd,
    },
    [core_1.IAtomType.HtmlTh]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlTh,
    },
    [core_1.IAtomType.HtmlTr]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlTr,
    },
    [core_1.IAtomType.HtmlTemplate]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlTemplate,
    },
    [core_1.IAtomType.HtmlTextarea]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlTextarea,
    },
    [core_1.IAtomType.HtmlTime]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlTime,
    },
    [core_1.IAtomType.HtmlTitle]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlTitle,
    },
    [core_1.IAtomType.HtmlTrack]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlTrack,
    },
    [core_1.IAtomType.HtmlUl]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlUl,
    },
    [core_1.IAtomType.HtmlVideo]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlVideo,
    },
    [core_1.IAtomType.HtmlAbbr]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlAbbr,
    },
    [core_1.IAtomType.HtmlArticle]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlArticle,
    },
    [core_1.IAtomType.HtmlB]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlB,
    },
    [core_1.IAtomType.HtmlBdo]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlBdo,
    },
    [core_1.IAtomType.HtmlCite]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlCite,
    },
    [core_1.IAtomType.HtmlDfn]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlDfn,
    },
    [core_1.IAtomType.HtmlKbd]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlKbd,
    },
    [core_1.IAtomType.HtmlMark]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlMark,
    },
    [core_1.IAtomType.HtmlMath]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlMath,
    },
    [core_1.IAtomType.HtmlNoscript]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlNoscript,
    },
    [core_1.IAtomType.HtmlQ]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlQ,
    },
    [core_1.IAtomType.HtmlRuby]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlRuby,
    },
    [core_1.IAtomType.HtmlSamp]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlSamp,
    },
    [core_1.IAtomType.HtmlScript]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlScript,
    },
    [core_1.IAtomType.HtmlSvg]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlSvg,
    },
    [core_1.IAtomType.HtmlU]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlU,
    },
    [core_1.IAtomType.HtmlVar]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlVar,
    },
    [core_1.IAtomType.HtmlWbr]: {
        file: null,
        icon: null,
        tag: core_1.IAtomType.HtmlWbr,
    },
};


/***/ }),
/* 580 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.reactAtomData = void 0;
const core_1 = __webpack_require__(542);
const core_2 = __webpack_require__(86);
/**
 * Assign all data that is related to react atoms here
 */
exports.reactAtomData = {
    [core_2.IAtomType.ReactFragment]: {
        file: 'ReactFragment',
        tag: core_1.IReactCategoryTag.ReactFragment,
    },
};


/***/ }),
/* 581 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(582), exports);
tslib_1.__exportStar(__webpack_require__(619), exports);
tslib_1.__exportStar(__webpack_require__(649), exports);
tslib_1.__exportStar(__webpack_require__(653), exports);


/***/ }),
/* 582 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExportAdminDataService = void 0;
const tslib_1 = __webpack_require__(1);
const atom_1 = __webpack_require__(583);
const component_1 = __webpack_require__(599);
const service_1 = __webpack_require__(24);
const tag_1 = __webpack_require__(609);
const type_1 = __webpack_require__(83);
const util_1 = __webpack_require__(614);
const filter_1 = tslib_1.__importDefault(__webpack_require__(617));
const find_1 = tslib_1.__importDefault(__webpack_require__(317));
const path_1 = tslib_1.__importDefault(__webpack_require__(202));
const data_paths_1 = __webpack_require__(618);
/**
 * This service should save the files as well, since admin data is all located in the same location
 */
class ExportAdminDataService extends service_1.UseCase {
    constructor(
    // Allow base directory override for testing purpose
    DATA_EXPORT_PATH = path_1.default.resolve('./data/export')) {
        super();
        Object.defineProperty(this, "dataPaths", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.dataPaths = new data_paths_1.DataPaths(DATA_EXPORT_PATH);
    }
    _execute() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const systemTypes = yield (0, type_1.exportSystemTypes)();
            const atoms = yield this.extractAtomsData();
            const tags = yield (0, tag_1.exportTags)();
            const components = yield this.extractComponentsData();
            const exportData = {
                atoms,
                components,
                systemTypes,
                tags,
            };
            this.exportData = exportData;
            return this;
        });
    }
    getData() {
        return {
            atoms: this.exportData.atoms,
            systemTypes: this.exportData.systemTypes,
            tags: this.exportData.tags,
        };
    }
    /**
     * Allows us to save to filesystem if we choose to
     *
     * (await new ExportAdminDataService().execute()).save()
     */
    saveAsFiles() {
        for (const { api, atom, fields, types } of this.exportData.atoms) {
            (0, util_1.saveFormattedFile)(path_1.default.resolve(this.dataPaths.ATOMS_PATH, `${atom.name}.json`), {
                api,
                atom,
                fields,
                types,
            });
        }
        (0, util_1.saveFormattedFile)(this.dataPaths.TAGS_FILE_PATH, this.exportData.tags);
        (0, util_1.saveFormattedFile)(this.dataPaths.SYSTEM_TYPES_FILE_PATH, this.exportData.systemTypes);
        for (const componentData of this.exportData.components) {
            this.saveComponentAsFile(componentData);
        }
        return this.getData();
    }
    extractAtomsData() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const atoms = yield (0, atom_1.exportAtoms)();
            const apis = yield (0, type_1.exportAtomApis)();
            return Promise.all(atoms.map((atom) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                /**
                 * Get the interface by id
                 */
                const api = (0, find_1.default)(apis.types, { id: atom.api.id });
                const apiFields = (0, filter_1.default)(apis.fields, { api: { id: atom.api.id } });
                const { fields = [], types } = yield (0, type_1.exportAdminTypes)({
                    apiFields,
                    apiId: atom.api.id,
                });
                if (!api) {
                    throw new Error('Missing api');
                }
                return {
                    api,
                    atom,
                    fields: [...apiFields, ...fields],
                    types,
                };
            })));
        });
    }
    extractComponentsData(where) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const componentsData = yield (0, component_1.exportComponents)(where);
            const apis = yield (0, type_1.exportAtomApis)();
            return Promise.all(componentsData.map((componentData) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const api = (0, find_1.default)(apis.types, { id: componentData.component.api.id });
                if (!api) {
                    throw new Error('Missing api');
                }
                const apiFields = (0, filter_1.default)(apis.fields, {
                    api: { id: componentData.component.api.id },
                });
                const { fields = [], types } = yield (0, type_1.exportAdminTypes)({
                    apiFields,
                    apiId: componentData.component.api.id,
                });
                return {
                    component: componentData.component,
                    descendantElements: componentData.descendantElements,
                    fields,
                    types,
                };
            })));
        });
    }
    exportComponent(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const componentsData = yield this.extractComponentsData({ id });
            if (componentsData[0]) {
                this.saveComponentAsFile(componentsData[0]);
            }
        });
    }
    saveComponentAsFile(componentData) {
        const { component, descendantElements, fields, types } = componentData;
        // Component name can have spaces, which can cause issues with file names
        const name = component.name.replace(/ /g, '');
        (0, util_1.saveFormattedFile)(path_1.default.resolve(this.dataPaths.COMPONENTS_PATH, `${name}.json`), {
            component,
            descendantElements,
            fields,
            types,
        });
    }
}
exports.ExportAdminDataService = ExportAdminDataService;


/***/ }),
/* 583 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(584), exports);


/***/ }),
/* 584 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(585), exports);
tslib_1.__exportStar(__webpack_require__(586), exports);
tslib_1.__exportStar(__webpack_require__(592), exports);


/***/ }),
/* 585 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exportAtoms = void 0;
const tslib_1 = __webpack_require__(1);
const codegen_1 = __webpack_require__(309);
const neo4j_1 = __webpack_require__(157);
const exportAtoms = (props = {}) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const Atom = yield neo4j_1.Repository.instance.Atom;
    return ((yield Atom.find({
        options: {
            sort: [{ name: codegen_1.SortDirection.Asc }],
        },
        selectionSet: neo4j_1.exportAtomSelectionSet,
        where: props.where,
    }))
        // Sort nested properties, since we can't do this with OGM
        .map((atom) => (Object.assign(Object.assign({}, atom), { suggestedChildren: atom.suggestedChildren.sort((a, b) => a.name.localeCompare(b.name)), tags: atom.tags.map((tag) => (Object.assign(Object.assign({}, tag), { children: tag.children.sort((a, b) => a.name.localeCompare(b.name)) }))) }))));
});
exports.exportAtoms = exportAtoms;


/***/ }),
/* 586 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImportAtomsService = void 0;
const tslib_1 = __webpack_require__(1);
const service_1 = __webpack_require__(24);
const atom_1 = __webpack_require__(587);
const utils_1 = __webpack_require__(35);
class ImportAtomsService extends service_1.UseCase {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "atomRepository", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new atom_1.AtomRepository()
        });
    }
    _execute(atoms) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            (0, utils_1.logSection)('Importing Atoms');
            /**
             * Create all atoms but omit `suggestedChildren`, since that is required
             */
            yield Promise.all(atoms.map(
            // Omit `suggestedChildren`, since it requires all atoms to be added first
            (_a) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                var { suggestedChildren } = _a, atom = tslib_1.__rest(_a, ["suggestedChildren"]);
                return yield this.atomRepository.save(atom);
            })));
            /**
             * Here we assign  suggestedChildren, since all atoms must be created first
             */
            yield Promise.all(atoms.map((atom) => tslib_1.__awaiter(this, void 0, void 0, function* () { return yield this.atomRepository.save(atom); })));
        });
    }
}
exports.ImportAtomsService = ImportAtomsService;


/***/ }),
/* 587 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(588), exports);
tslib_1.__exportStar(__webpack_require__(590), exports);


/***/ }),
/* 588 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(589), exports);


/***/ }),
/* 589 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Atom = void 0;
class Atom {
    constructor({ api, externalCssSource, externalJsSource, externalSourceType, icon, id, name, owner, requiredParents = [], suggestedChildren = [], tags = [], type, }) {
        Object.defineProperty(this, "icon", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "externalCssSource", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "externalJsSource", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "externalSourceType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "api", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "requiredParents", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "suggestedChildren", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "owner", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.id = id;
        this.externalJsSource = externalJsSource;
        this.externalCssSource = externalCssSource;
        this.externalSourceType = externalSourceType;
        this.name = name;
        this.icon = icon;
        this.type = type;
        this.api = api;
        this.tags = tags;
        this.requiredParents = requiredParents;
        this.suggestedChildren = suggestedChildren;
        this.owner = owner;
    }
}
exports.Atom = Atom;


/***/ }),
/* 590 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(591), exports);


/***/ }),
/* 591 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AtomRepository = void 0;
const tslib_1 = __webpack_require__(1);
const neo4j_1 = __webpack_require__(157);
const core_1 = __webpack_require__(287);
const mapper_1 = __webpack_require__(289);
class AtomRepository extends core_1.AbstractRepository {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "Atom", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: neo4j_1.Repository.instance.Atom
        });
    }
    _find(where = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield (yield this.Atom).find({
                selectionSet: neo4j_1.atomSelectionSet,
                where,
            });
        });
    }
    /**
     * We only deal with connecting/disconnecting relationships, actual items should exist already
     */
    _add(atoms) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.Atom).create({
                input: atoms.map((_a) => {
                    var { api, owner, requiredParents = [], suggestedChildren = [], tags } = _a, atom = tslib_1.__rest(_a, ["api", "owner", "requiredParents", "suggestedChildren", "tags"]);
                    return (Object.assign(Object.assign({}, atom), { api: (0, mapper_1.connectNodeId)(api.id), owner: (0, mapper_1.connectAuth0Owner)(owner), requiredParents: (0, mapper_1.connectNodeIds)(requiredParents.map((parent) => parent.id)), suggestedChildren: (0, mapper_1.connectNodeIds)(suggestedChildren.map((child) => child.id)), tags: (0, mapper_1.connectNodeIds)(tags === null || tags === void 0 ? void 0 : tags.map((tag) => tag.id)) }));
                }),
            })).atoms;
        });
    }
    _update(_a, where) {
        var { api, id, owner, requiredParents = [], suggestedChildren = [], tags } = _a, atom = tslib_1.__rest(_a, ["api", "id", "owner", "requiredParents", "suggestedChildren", "tags"]);
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.Atom).update({
                update: Object.assign(Object.assign({}, atom), { api: (0, mapper_1.reconnectNodeId)(api.id), requiredParents: (0, mapper_1.whereNodeIds)(requiredParents.map((parent) => parent.id)), suggestedChildren: (0, mapper_1.whereNodeIds)(suggestedChildren.map((child) => child.id)), tags: (0, mapper_1.reconnectNodeIds)(tags === null || tags === void 0 ? void 0 : tags.map((tag) => tag.id)) }),
                where,
            })).atoms[0];
        });
    }
}
exports.AtomRepository = AtomRepository;


/***/ }),
/* 592 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(593), exports);


/***/ }),
/* 593 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SeedAtomsService = void 0;
const tslib_1 = __webpack_require__(1);
const service_1 = __webpack_require__(24);
const atom_1 = __webpack_require__(587);
const tag_1 = __webpack_require__(594);
const type_1 = __webpack_require__(140);
const core_1 = __webpack_require__(86);
const object_typed_1 = __webpack_require__(182);
const uuid_1 = __webpack_require__(130);
class SeedAtomsService extends service_1.AuthUseCase {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "atomRepository", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new atom_1.AtomRepository()
        });
        Object.defineProperty(this, "interfaceTypeRepository", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new type_1.InterfaceTypeRepository()
        });
        Object.defineProperty(this, "tagRepository", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new tag_1.TagRepository()
        });
    }
    _execute(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const atoms = yield this.createAtomsData(data);
            /**
             * Create all atoms but omit `suggestedChildren`, since that is required
             */
            yield Promise.all(atoms.map(
            // Omit `suggestedChildren`, since it requires all atoms to be added first
            (_a) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                var { suggestedChildren } = _a, atom = tslib_1.__rest(_a, ["suggestedChildren"]);
                return yield this.atomRepository.save(atom, { name: atom.name });
            })));
            /**
             * Here we assign suggestedChildren, since all atoms must be created first
             */
            yield Promise.all(atoms.map((atom) => tslib_1.__awaiter(this, void 0, void 0, function* () { return yield this.atomRepository.save(atom, { name: atom.name }); })));
            return atoms;
        });
    }
    /**
     * Assume all tags have already been created
     */
    createAtomsData(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const existingInterfaceTypes = new Map((yield this.interfaceTypeRepository.find()).map((interfaceType) => [
                interfaceType.name,
                interfaceType,
            ]));
            return yield Promise.all(object_typed_1.ObjectTyped.entries(data).map(([atomType, atomData]) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                // Search api by name
                const existingApi = existingInterfaceTypes.get(type_1.InterfaceType.getApiName({ name: atomType }));
                if (!existingApi) {
                    console.log(atomData);
                    throw new Error('Atom API should exist already');
                }
                // Get tags by name, they always match up
                const existingTag = yield this.tagRepository.findOne({
                    name: atomData.tag,
                });
                if (!existingTag) {
                    console.log(atomData);
                    throw new Error('Tag should exist already');
                }
                return {
                    api: existingApi,
                    icon: atomData.icon,
                    id: (0, uuid_1.v4)(),
                    name: atomType,
                    owner: this.owner,
                    tags: [existingTag],
                    type: core_1.IAtomType[atomType],
                };
            })));
        });
    }
}
exports.SeedAtomsService = SeedAtomsService;


/***/ }),
/* 594 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(595), exports);
tslib_1.__exportStar(__webpack_require__(597), exports);


/***/ }),
/* 595 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(596), exports);


/***/ }),
/* 596 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Tag = void 0;
class Tag {
    constructor({ children = [], descendants = [], id, name, owner, parent = null, }) {
        Object.defineProperty(this, "owner", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "children", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "parent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "descendants", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.id = id;
        this.name = name;
        this.children = children;
        this.parent = parent;
        this.owner = owner;
        this.descendants = descendants;
    }
}
exports.Tag = Tag;


/***/ }),
/* 597 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(598), exports);


/***/ }),
/* 598 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TagRepository = void 0;
const tslib_1 = __webpack_require__(1);
const neo4j_1 = __webpack_require__(157);
const core_1 = __webpack_require__(287);
const mapper_1 = __webpack_require__(289);
class TagRepository extends core_1.AbstractRepository {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "Tag", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: neo4j_1.Repository.instance.Tag
        });
    }
    _find(where = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield (yield this.Tag).find({
                selectionSet: neo4j_1.tagSelectionSet,
                where,
            });
        });
    }
    /**
     * If parent or children exists, then we should connect them
     */
    _add(tags) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.Tag).create({
                input: tags.map((_a) => {
                    var _b;
                    var { descendants, owner } = _a, tag = tslib_1.__rest(_a, ["descendants", "owner"]);
                    return (Object.assign(Object.assign({}, tag), { children: (0, mapper_1.connectNodeIds)(tag.children.map((child) => child.id)), owner: (0, mapper_1.connectAuth0Owner)(owner), parent: (0, mapper_1.connectNodeId)((_b = tag.parent) === null || _b === void 0 ? void 0 : _b.id) }));
                }),
            })).tags;
        });
    }
    _update(_a, where) {
        var { children, descendants, id, owner, parent } = _a, tag = tslib_1.__rest(_a, ["children", "descendants", "id", "owner", "parent"]);
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Get existing tag so we know what to connect/disconnect
            const existing = yield this.findOne(where);
            if (!existing) {
                return undefined;
            }
            /**
             * Parent
             */
            const parentTagToConnect = parent === null || parent === void 0 ? void 0 : parent.id;
            const childrenTagsToConnect = children.map((_tag) => _tag.id);
            return (yield (yield this.Tag).update({
                update: Object.assign(Object.assign({}, tag), { parent: (0, mapper_1.reconnectNodeId)(parentTagToConnect) }),
                where,
            })).tags[0];
        });
    }
}
exports.TagRepository = TagRepository;


/***/ }),
/* 599 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(600), exports);


/***/ }),
/* 600 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(601), exports);


/***/ }),
/* 601 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exportComponents = void 0;
const tslib_1 = __webpack_require__(1);
const element_1 = __webpack_require__(602);
const neo4j_1 = __webpack_require__(157);
const exportComponents = (where) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const Component = yield neo4j_1.Repository.instance.Component;
    const components = yield Component.find({
        selectionSet: neo4j_1.exportComponentSelectionSet,
        where,
    });
    return Promise.all(components.map((component) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const descendantElements = yield (0, element_1.getElementWithDescendants)(component.rootElement.id);
        return {
            component,
            descendantElements,
        };
    })));
});
exports.exportComponents = exportComponents;


/***/ }),
/* 602 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(603), exports);
tslib_1.__exportStar(__webpack_require__(605), exports);


/***/ }),
/* 603 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(604), exports);


/***/ }),
/* 604 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Element = void 0;
class Element {
    constructor({ id, name, props }) {
        Object.defineProperty(this, "customCss", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "firstChild", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "guiCss", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "nextSibling", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "page", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "parent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "parentComponent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "postRenderAction", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "preRenderAction", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "prevSibling", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "propTransformationJs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "props", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "renderForEachPropKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "renderIfExpression", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "renderType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.id = id;
        this.name = name;
        this.props = props;
    }
}
exports.Element = Element;


/***/ }),
/* 605 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(606), exports);
tslib_1.__exportStar(__webpack_require__(607), exports);
tslib_1.__exportStar(__webpack_require__(608), exports);


/***/ }),
/* 606 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ElementRepository = void 0;
const tslib_1 = __webpack_require__(1);
const neo4j_1 = __webpack_require__(157);
const core_1 = __webpack_require__(287);
const mapper_1 = __webpack_require__(289);
class ElementRepository extends core_1.AbstractRepository {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "Element", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: neo4j_1.Repository.instance.Element
        });
    }
    _find(where = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield (yield this.Element).find({
                selectionSet: neo4j_1.elementSelectionSet,
                where,
            });
        });
    }
    /**
     * We only deal with connecting/disconnecting relationships, actual items should exist already
     */
    _add(elements) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.Element).create({
                input: elements.map(({ id, name, props }) => ({
                    id,
                    name,
                    props: (0, mapper_1.connectNodeId)(props.id),
                })),
            })).elements;
        });
    }
    _update({ id, name, props }, where) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.Element).update({
                update: {
                    id,
                    name,
                    props: (0, mapper_1.reconnectNodeId)(props.id),
                },
                where,
            })).elements[0];
        });
    }
}
exports.ElementRepository = ElementRepository;


/***/ }),
/* 607 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateImportedElement = exports.importElementInitial = void 0;
const tslib_1 = __webpack_require__(1);
const neo4j_1 = __webpack_require__(157);
const mapper_1 = __webpack_require__(289);
const utils_1 = __webpack_require__(35);
/**
 * Creates the element without prop map bindings and without parent/children connections
 */
const label = (element) => {
    var _a, _b, _c;
    return element.name ||
        ((_a = element.renderAtomType) === null || _a === void 0 ? void 0 : _a.name) ||
        (element.renderAtomType
            ? (0, utils_1.compoundCaseToTitleCase)(element.renderAtomType.type)
            : undefined) ||
        ((_b = element.parentComponent) === null || _b === void 0 ? void 0 : _b.name) ||
        ((_c = element.renderComponentType) === null || _c === void 0 ? void 0 : _c.name);
};
const importElementInitial = (element) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const Element = yield neo4j_1.Repository.instance.Element;
    const existing = yield Element.find({
        where: {
            id: element.id,
        },
    });
    if (!existing.length) {
        console.log(`Creating ${label(element)}`);
        const { elements: [newElement], } = yield Element.create({
            input: [
                {
                    customCss: element.customCss,
                    guiCss: element.guiCss,
                    id: element.id,
                    name: element.name,
                    postRenderAction: (0, mapper_1.connectNodeId)((_a = element.postRenderAction) === null || _a === void 0 ? void 0 : _a.id),
                    preRenderAction: (0, mapper_1.connectNodeId)((_b = element.preRenderAction) === null || _b === void 0 ? void 0 : _b.id),
                    props: {
                        create: {
                            node: { data: element.props.data, id: element.props.id },
                        },
                    },
                    propTransformationJs: element.propTransformationJs,
                    renderAtomType: element.renderAtomType
                        ? {
                            connect: {
                                where: {
                                    node: {
                                        OR: [
                                            { id: element.renderAtomType.id },
                                            { name: element.renderAtomType.name },
                                        ],
                                    },
                                },
                            },
                        }
                        : undefined,
                    renderForEachPropKey: element.renderForEachPropKey,
                    renderIfExpression: element.renderIfExpression,
                },
            ],
        });
        if (!newElement) {
            throw new Error('Element not created');
        }
        return newElement;
    }
    // console.log(`Updating ${label(element)}`)
    const { elements: [newElement], } = yield Element.update({
        update: {
            name: element.name,
        },
        where: {
            id: element.id,
        },
    });
    if (!newElement) {
        throw new Error('Element not created');
    }
    return newElement;
});
exports.importElementInitial = importElementInitial;
/**
 * Updates the imported element with prop map bindings, parent/children connections and props after we have imported all the elements, so we can reference them
 */
// TODO: update CLI to support the new elment-parent structure
const updateImportedElement = (element) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e, _f, _g, _h;
    const Element = yield neo4j_1.Repository.instance.Element;
    // if (element.props) {
    // replace all references in props
    // for (const [key, value] of idMap.entries()) {
    //   element.props.data = element.props.data.replace(
    //     new RegExp(key, 'g'),
    //     value,
    //   )
    // }
    // }
    yield Element.update({
        update: {
            firstChild: (0, mapper_1.connectNodeId)((_c = element.firstChild) === null || _c === void 0 ? void 0 : _c.id),
            nextSibling: (0, mapper_1.connectNodeId)((_d = element.nextSibling) === null || _d === void 0 ? void 0 : _d.id),
            parent: (0, mapper_1.connectNodeId)((_e = element.parent) === null || _e === void 0 ? void 0 : _e.id),
            parentComponent: (0, mapper_1.connectNodeId)((_f = element.parentComponent) === null || _f === void 0 ? void 0 : _f.id),
            prevSibling: (0, mapper_1.connectNodeId)((_g = element.prevSibling) === null || _g === void 0 ? void 0 : _g.id),
            props: {
                update: { node: { data: element.props.data } },
            },
            renderComponentType: (0, mapper_1.connectNodeId)((_h = element.renderComponentType) === null || _h === void 0 ? void 0 : _h.id),
        },
        where: { id: element.id },
    });
});
exports.updateImportedElement = updateImportedElement;


/***/ }),
/* 608 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getElementWithDescendants = void 0;
const tslib_1 = __webpack_require__(1);
const neo4j_1 = __webpack_require__(157);
const getElementWithDescendants = (rootId) => (0, neo4j_1.withReadTransaction)((txn) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const Element = yield neo4j_1.Repository.instance.Element;
    const { records } = yield txn.run(neo4j_1.getDescendantsCypher, { rootId });
    const descendants = (_a = records[0]) === null || _a === void 0 ? void 0 : _a.get(0);
    const descendantIds = descendants.map(({ properties }) => properties.id);
    return yield Element.find({
        selectionSet: neo4j_1.exportElementSelectionSet,
        where: { id_IN: [rootId, ...descendantIds] },
    });
}));
exports.getElementWithDescendants = getElementWithDescendants;


/***/ }),
/* 609 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(610), exports);


/***/ }),
/* 610 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(611), exports);
tslib_1.__exportStar(__webpack_require__(612), exports);


/***/ }),
/* 611 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exportTags = void 0;
const tslib_1 = __webpack_require__(1);
const codegen_1 = __webpack_require__(309);
const neo4j_1 = __webpack_require__(157);
const exportTags = (props = {}) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const Tag = yield neo4j_1.Repository.instance.Tag;
    return ((yield Tag.find({
        options: {
            sort: [{ name: codegen_1.SortDirection.Asc }],
        },
        selectionSet: neo4j_1.exportTagSelectionSet,
        where: props.where,
    }))
        // Sort children values
        .map((tag) => (Object.assign(Object.assign({}, tag), { children: tag.children.sort((a, b) => a.name.localeCompare(b.name)) }))));
});
exports.exportTags = exportTags;


/***/ }),
/* 612 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SeedTagsService = void 0;
const tslib_1 = __webpack_require__(1);
const service_1 = __webpack_require__(24);
const tag_1 = __webpack_require__(594);
const uniqBy_1 = tslib_1.__importDefault(__webpack_require__(613));
const object_typed_1 = __webpack_require__(182);
const uuid_1 = __webpack_require__(130);
class SeedTagsService extends service_1.AuthUseCase {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "tagRepository", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new tag_1.TagRepository()
        });
    }
    _execute(tagTree) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tags = (0, uniqBy_1.default)(yield this.createTagsData(tagTree), (tag) => tag.name);
            /**
             * Omit parent and children since they need to be created first
             */
            yield Promise.all(tags.map((_b) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                var { children, parent } = _b, tag = tslib_1.__rest(_b, ["children", "parent"]);
                return yield this.tagRepository.save(Object.assign(Object.assign({}, tag), { children: [], owner: this.owner }), { name: tag.name });
            })));
            /**
             * set parent and children after all tags are created
             */
            yield Promise.all(tags.map((tag) => tslib_1.__awaiter(this, void 0, void 0, function* () { return yield this.tagRepository.save(tag, { name: tag.name }); })));
        });
    }
    /**
     * Here we want to flatten the hierarchical data
     */
    createTagsData(tagTree) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const existingTags = new Map((yield this.tagRepository.find()).map((tag) => [tag.name, tag]));
            const tagData = yield Promise.all(SeedTagsService.createTagTreeData(tagTree)
                .flatMap((node) => SeedTagsService.flattenTagTree(node))
                .map((node) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                var _b;
                const existingTag = existingTags.get(node.name);
                return Object.assign(Object.assign({}, node), { id: (_b = existingTag === null || existingTag === void 0 ? void 0 : existingTag.id) !== null && _b !== void 0 ? _b : (0, uuid_1.v4)() });
            })));
            const tagDataMap = new Map(tagData.map((tag) => [tag.name, tag]));
            return tagData.map((tag) => {
                const parent = tag.parent ? tagDataMap.get(tag.parent) : null;
                return {
                    children: tag.children.map((child) => {
                        const childTag = tagDataMap.get(child.name);
                        if (!childTag) {
                            throw new Error('Missing child tag');
                        }
                        return {
                            id: childTag.id,
                            name: childTag.name,
                        };
                    }),
                    descendants: [],
                    id: tag.id,
                    name: tag.name,
                    owner: this.owner,
                    parent: parent ? { id: parent.id, name: parent.name } : undefined,
                };
            });
        });
    }
}
_a = SeedTagsService;
/**
 * Generate parent/children by inference via object nested relationship
 */
Object.defineProperty(SeedTagsService, "createTagTreeData", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (tagTreeData) => Object.entries(tagTreeData).flatMap(([tagKey, tagNode]) => [
        SeedTagsService.parseTagNode({ [tagKey]: tagNode }, null),
    ])
});
/**
 * Function to parse our custom tag structure that is optimized for easy manual editing
 */
Object.defineProperty(SeedTagsService, "parseTagNode", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (node, parent) => {
        // if (!node) {
        //   throw new Error('Missing node')
        // }
        // Meaning have children
        if (node instanceof Object) {
            const tagNode = object_typed_1.ObjectTyped.entries(node)[0];
            if (!tagNode) {
                throw new Error('Tag node invalid');
            }
            const [name, values] = tagNode;
            return {
                children: (values !== null && values !== void 0 ? values : []).map((value) => _a.parseTagNode(value, name)),
                name,
                parent,
            };
        }
        // No children
        return {
            children: [],
            name: node,
            parent,
        };
    }
});
Object.defineProperty(SeedTagsService, "flattenTagTree", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (node) => {
        return node.children.map(_a.flattenTagTree).reduce((tagTree, tagNodes) => {
            return [...tagTree, ...tagNodes];
        }, [
            {
                children: node.children,
                name: node.name,
                parent: node.parent,
            },
        ]);
    }
});
exports.SeedTagsService = SeedTagsService;


/***/ }),
/* 613 */
/***/ ((module) => {

module.exports = require("lodash/uniqBy");

/***/ }),
/* 614 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(615), exports);


/***/ }),
/* 615 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.saveFormattedFile = void 0;
const tslib_1 = __webpack_require__(1);
const fs_1 = tslib_1.__importDefault(__webpack_require__(201));
const os_1 = __webpack_require__(616);
const path = tslib_1.__importStar(__webpack_require__(202));
const saveFormattedFile = (outputFilePath, data) => {
    if (!outputFilePath.endsWith('.json')) {
        throw new Error('Output path must end with .json');
    }
    const json = JSON.stringify(data, null, 2);
    const exportPath = path.resolve('./', outputFilePath);
    fs_1.default.mkdirSync(path.dirname(exportPath), { recursive: true });
    fs_1.default.writeFileSync(exportPath, json);
    fs_1.default.appendFileSync(exportPath, os_1.EOL, 'utf8');
};
exports.saveFormattedFile = saveFormattedFile;


/***/ }),
/* 616 */
/***/ ((module) => {

module.exports = require("os");

/***/ }),
/* 617 */
/***/ ((module) => {

module.exports = require("lodash/filter");

/***/ }),
/* 618 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DataPaths = void 0;
const tslib_1 = __webpack_require__(1);
const path_1 = tslib_1.__importDefault(__webpack_require__(202));
class DataPaths {
    constructor(
    // Allow base directory override for testing purpose
    DATA_PATH = path_1.default.resolve('./data/export')) {
        Object.defineProperty(this, "DATA_PATH", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: DATA_PATH
        });
    }
    get SYSTEM_TYPES_FILE_PATH() {
        return path_1.default.resolve(this.DATA_PATH, './system/types/system-types.json');
    }
    get ATOMS_PATH() {
        return path_1.default.resolve(this.DATA_PATH, './admin/atoms');
    }
    get TAGS_FILE_PATH() {
        return path_1.default.resolve(this.DATA_PATH, './admin/tags/tags.json');
    }
    get COMPONENTS_PATH() {
        return path_1.default.resolve(this.DATA_PATH, './admin/components');
    }
}
exports.DataPaths = DataPaths;


/***/ }),
/* 619 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(620), exports);


/***/ }),
/* 620 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImportAdminDataService = void 0;
const tslib_1 = __webpack_require__(1);
const service_1 = __webpack_require__(24);
const app_1 = __webpack_require__(621);
const type_1 = __webpack_require__(140);
const otel_1 = __webpack_require__(28);
const bull_1 = __webpack_require__(19);
const common_1 = __webpack_require__(16);
const bull_2 = __webpack_require__(647);
const fs_1 = tslib_1.__importDefault(__webpack_require__(201));
const pick_1 = tslib_1.__importDefault(__webpack_require__(648));
const path_1 = tslib_1.__importDefault(__webpack_require__(202));
const data_paths_1 = __webpack_require__(618);
/**
 * During `save`, we'll want to replace the owner with the current
 */
let ImportAdminDataService = class ImportAdminDataService extends service_1.UseCase {
    constructor(importQueue) {
        super();
        Object.defineProperty(this, "importQueue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: importQueue
        });
        // tagRepository = new TagRepository()
        // atomRepository = new AtomRepository()
        // fieldRepository = new FieldRepository()
        // interfaceTypeRepository = new InterfaceTypeRepository()
        Object.defineProperty(this, "dataPaths", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "exportedAdminData", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "DATA_PATH", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: path_1.default.resolve('./data/export')
        });
        this.dataPaths = new data_paths_1.DataPaths(this.DATA_PATH);
        this.exportedAdminData = this.getMergedData;
    }
    _execute(owner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /**
             * System types must be seeded first, so other types can reference it
             */
            yield (0, otel_1.withTracing)('import-system-types', () => this.importSystemTypes(owner))();
            // await withTracing('import-tags', () => this.importTags(owner))()
            // await withTracing('import-atoms', () => this.importAtoms(owner))()
            // await withTracing('import-components', () => this.importComponents(owner))()
        });
    }
    importSystemTypes(owner) {
        var _a, e_1, _b, _c;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { types } = JSON.parse(fs_1.default.readFileSync(this.dataPaths.SYSTEM_TYPES_FILE_PATH, 'utf8'));
            try {
                for (var _d = true, types_1 = tslib_1.__asyncValues(types), types_1_1; types_1_1 = yield types_1.next(), _a = types_1_1.done, !_a;) {
                    _c = types_1_1.value;
                    _d = false;
                    try {
                        const type = _c;
                        const data = Object.assign(Object.assign({}, type), { owner });
                        console.log('import queue');
                        const job = yield this.importQueue.add(data);
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = types_1.return)) yield _b.call(types_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
    importAtoms(owner) {
        var _a, e_2, _b, _c;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                for (var _d = true, _e = tslib_1.__asyncValues(this.exportedAdminData.atoms), _f; _f = yield _e.next(), _a = _f.done, !_a;) {
                    _c = _f.value;
                    _d = false;
                    try {
                        const atomData = _c;
                        yield (0, otel_1.withTracing)('import-atom', () => this.importAtom(atomData, owner), (span) => {
                            const attributes = (0, pick_1.default)(atomData.atom, ['name']);
                            span.setAttributes(attributes);
                        })();
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
        });
    }
    importAtom({ api, atom, fields, types }, owner) {
        var _a, types_2, types_2_1, _b, fields_1, fields_1_1;
        var _c, e_3, _d, _e, _f, e_4, _g, _h;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                // Create types first so they can be referenced
                for (_a = true, types_2 = tslib_1.__asyncValues(types); types_2_1 = yield types_2.next(), _c = types_2_1.done, !_c;) {
                    _e = types_2_1.value;
                    _a = false;
                    try {
                        const type = _e;
                        yield type_1.TypeFactory.save(Object.assign(Object.assign({}, type), { owner }));
                    }
                    finally {
                        _a = true;
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (!_a && !_c && (_d = types_2.return)) yield _d.call(types_2);
                }
                finally { if (e_3) throw e_3.error; }
            }
            // Then api's
            yield type_1.TypeFactory.save(Object.assign(Object.assign({}, api), { owner }));
            try {
                // Finally fields
                for (_b = true, fields_1 = tslib_1.__asyncValues(fields); fields_1_1 = yield fields_1.next(), _f = fields_1_1.done, !_f;) {
                    _h = fields_1_1.value;
                    _b = false;
                    try {
                        const field = _h;
                    }
                    finally {
                        _b = true;
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (!_b && !_f && (_g = fields_1.return)) yield _g.call(fields_1);
                }
                finally { if (e_4) throw e_4.error; }
            }
        });
    }
    importTags(owner) {
        var _a, e_5, _b, _c;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                for (var _d = true, _e = tslib_1.__asyncValues(this.exportedAdminData.tags), _f; _f = yield _e.next(), _a = _f.done, !_a;) {
                    _c = _f.value;
                    _d = false;
                    try {
                        const tag = _c;
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                }
                finally { if (e_5) throw e_5.error; }
            }
        });
    }
    importComponents(owner) {
        var _a, e_6, _b, _c, _d, e_7, _e, _f, _g, e_8, _h, _j, _k, e_9, _l, _m;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const componentsExportData = this.exportedAdminData.components;
            try {
                for (var _o = true, componentsExportData_1 = tslib_1.__asyncValues(componentsExportData), componentsExportData_1_1; componentsExportData_1_1 = yield componentsExportData_1.next(), _a = componentsExportData_1_1.done, !_a;) {
                    _c = componentsExportData_1_1.value;
                    _o = false;
                    try {
                        const { descendantElements, fields, types, } = _c;
                        try {
                            for (var _p = true, types_3 = (e_7 = void 0, tslib_1.__asyncValues(types)), types_3_1; types_3_1 = yield types_3.next(), _d = types_3_1.done, !_d;) {
                                _f = types_3_1.value;
                                _p = false;
                                try {
                                    const type = _f;
                                }
                                finally {
                                    _p = true;
                                }
                            }
                        }
                        catch (e_7_1) { e_7 = { error: e_7_1 }; }
                        finally {
                            try {
                                if (!_p && !_d && (_e = types_3.return)) yield _e.call(types_3);
                            }
                            finally { if (e_7) throw e_7.error; }
                        }
                        try {
                            for (var _q = true, fields_2 = (e_8 = void 0, tslib_1.__asyncValues(fields)), fields_2_1; fields_2_1 = yield fields_2.next(), _g = fields_2_1.done, !_g;) {
                                _j = fields_2_1.value;
                                _q = false;
                                try {
                                    const field = _j;
                                }
                                finally {
                                    _q = true;
                                }
                            }
                        }
                        catch (e_8_1) { e_8 = { error: e_8_1 }; }
                        finally {
                            try {
                                if (!_q && !_g && (_h = fields_2.return)) yield _h.call(fields_2);
                            }
                            finally { if (e_8) throw e_8.error; }
                        }
                        try {
                            for (var _r = true, descendantElements_1 = (e_9 = void 0, tslib_1.__asyncValues(descendantElements)), descendantElements_1_1; descendantElements_1_1 = yield descendantElements_1.next(), _k = descendantElements_1_1.done, !_k;) {
                                _m = descendantElements_1_1.value;
                                _r = false;
                                try {
                                    const element = _m;
                                }
                                finally {
                                    _r = true;
                                }
                            }
                        }
                        catch (e_9_1) { e_9 = { error: e_9_1 }; }
                        finally {
                            try {
                                if (!_r && !_k && (_l = descendantElements_1.return)) yield _l.call(descendantElements_1);
                            }
                            finally { if (e_9) throw e_9.error; }
                        }
                    }
                    finally {
                        _o = true;
                    }
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (!_o && !_a && (_b = componentsExportData_1.return)) yield _b.call(componentsExportData_1);
                }
                finally { if (e_6) throw e_6.error; }
            }
            const components = componentsExportData.map((item) => item.component);
            yield (0, app_1.createComponents)(components, owner);
        });
    }
    /**
     * Extract all the api's from atom file
     */
    get getMergedData() {
        const atomFilenames = fs_1.default
            .readdirSync(this.dataPaths.ATOMS_PATH)
            .filter((filename) => path_1.default.extname(filename) === '.json');
        const componentFilenames = fs_1.default
            .readdirSync(this.dataPaths.COMPONENTS_PATH)
            .filter((filename) => path_1.default.extname(filename) === '.json');
        // T ag data is all in single file
        const tags = JSON.parse(fs_1.default.readFileSync(this.dataPaths.TAGS_FILE_PATH, 'utf8'));
        const systemTypes = JSON.parse(fs_1.default.readFileSync(this.dataPaths.SYSTEM_TYPES_FILE_PATH, 'utf8'));
        const components = componentFilenames.map((filename) => {
            const content = fs_1.default.readFileSync(path_1.default.resolve(this.dataPaths.COMPONENTS_PATH, filename), 'utf8');
            return JSON.parse(content);
        });
        return atomFilenames.reduce((adminData, filename) => {
            const content = fs_1.default.readFileSync(`${this.dataPaths.ATOMS_PATH}/${filename}`, 'utf8');
            const atomExport = JSON.parse(content.toString());
            adminData.atoms.push(atomExport);
            return adminData;
        }, { atoms: [], components, systemTypes, tags });
    }
};
ImportAdminDataService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, bull_1.InjectQueue)('import-admin-data')),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof bull_2.Queue !== "undefined" && bull_2.Queue) === "function" ? _a : Object])
], ImportAdminDataService);
exports.ImportAdminDataService = ImportAdminDataService;


/***/ }),
/* 621 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(622), exports);
tslib_1.__exportStar(__webpack_require__(624), exports);


/***/ }),
/* 622 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(623), exports);


/***/ }),
/* 623 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.App = void 0;
class App {
    constructor({ domains, id, name, owner, pages }) {
        Object.defineProperty(this, "domains", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "pages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "owner", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.id = id;
        this.name = name;
        this.owner = owner;
        this.domains = domains;
        this.pages = pages;
    }
}
exports.App = App;


/***/ }),
/* 624 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(625), exports);
tslib_1.__exportStar(__webpack_require__(646), exports);


/***/ }),
/* 625 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getAppComponents = exports.getAppPages = exports.createComponents = exports.createApp = exports.AppRepository = void 0;
const tslib_1 = __webpack_require__(1);
const component_1 = __webpack_require__(626);
const element_1 = __webpack_require__(602);
const page_1 = __webpack_require__(629);
const prop_1 = __webpack_require__(635);
const store_1 = __webpack_require__(640);
const type_1 = __webpack_require__(140);
const neo4j_1 = __webpack_require__(157);
const core_1 = __webpack_require__(287);
const mapper_1 = __webpack_require__(289);
const utils_1 = __webpack_require__(35);
const flatMap_1 = tslib_1.__importDefault(__webpack_require__(634));
const map_1 = tslib_1.__importDefault(__webpack_require__(63));
const omit_1 = tslib_1.__importDefault(__webpack_require__(645));
const validate_1 = __webpack_require__(646);
class AppRepository extends core_1.AbstractRepository {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "App", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: neo4j_1.Repository.instance.App
        });
    }
    _find(where = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield (yield this.App).find({
                selectionSet: neo4j_1.appSelectionSet,
                where,
            });
        });
    }
    /**
     * We only deal with connecting/disconnecting relationships, actual items should exist already
     */
    _add(apps) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.App).create({
                input: apps.map(({ id, name, owner, pages }) => ({
                    _compoundName: (0, utils_1.createUniqueName)(name, owner.auth0Id),
                    id,
                    owner: (0, mapper_1.connectAuth0Owner)(owner),
                    pages: (0, mapper_1.connectNodeIds)(pages === null || pages === void 0 ? void 0 : pages.map((page) => page.id)),
                })),
            })).apps;
        });
    }
    _update({ name, owner, pages }, where) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.App).update({
                update: {
                    _compoundName: (0, utils_1.createUniqueName)(name, owner.auth0Id),
                    pages: (0, mapper_1.reconnectNodeIds)(pages === null || pages === void 0 ? void 0 : pages.map((page) => page.id)).map((input) => (Object.assign(Object.assign({}, input), { 
                        // overriding disconnect from reconnectNodeIds because it disconnects everythin
                        // including the pages connected in previous items of the input array. This causes
                        // the transaction to register only the last page being connected in the input array
                        // TODO: Check it it's the case for other places using reconnectNodeIds and if so update it.
                        disconnect: [
                            {
                                where: {
                                    NOT: {
                                        node: {
                                            id_IN: pages === null || pages === void 0 ? void 0 : pages.map((page) => page.id),
                                        },
                                    },
                                },
                            },
                        ] }))),
                },
                where,
            })).apps[0];
        });
    }
}
exports.AppRepository = AppRepository;
const createApp = (app, owner) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    (0, utils_1.cLog)((0, omit_1.default)(app, ['pages']));
    const fieldRepository = new type_1.FieldRepository();
    const storeRepository = new store_1.StoreRepository();
    const interfaceTypeRepository = new type_1.InterfaceTypeRepository();
    const pageRepository = new page_1.PageRepository();
    const appRepository = new AppRepository();
    const App = yield neo4j_1.Repository.instance.App;
    const { pages } = app;
    yield (0, validate_1.validate)(pages);
    const existing = yield appRepository.findOne({ id: app.id });
    if (existing) {
        console.log('Deleting app/pages before re-creating...');
        yield App.delete({
            delete: {
                pages: [{ where: {} }],
            },
            where: {
                id: app.id,
            },
        });
    }
    for (const { elements, store } of pages) {
        for (const element of elements) {
            yield (0, element_1.importElementInitial)(element);
        }
        for (const element of elements) {
            yield (0, element_1.updateImportedElement)(element);
        }
        const interfaceTypeExist = yield interfaceTypeRepository.findOne({
            id: store.api.id,
        });
        interfaceTypeExist
            ? yield interfaceTypeRepository.update(Object.assign(Object.assign({}, store.api), { fields: [] }), { id: store.api.id })
            : yield interfaceTypeRepository.add([Object.assign(Object.assign({}, store.api), { fields: [], owner })]);
        for (const field of store.api.fields) {
            const fieldExist = yield fieldRepository.findOne({ id: field.id });
            fieldExist
                ? yield fieldRepository.update(field, { id: field.id })
                : yield fieldRepository.add([field]);
        }
        yield storeRepository
            .add([store])
            .catch(() => storeRepository.update(store, { id: store.id }));
    }
    const pagesData = app.pages.map((_a) => {
        var { elements } = _a, props = tslib_1.__rest(_a, ["elements"]);
        return (Object.assign(Object.assign({}, props), { app: { id: app.id } }));
    });
    console.log('Creating new app...');
    yield appRepository.add([Object.assign(Object.assign({}, app), { owner, pages: [] })]);
    yield pageRepository.add(pagesData);
    console.log('Creating actions...');
    // await importActions(app.store.actions, app.store.id)
    return app;
});
exports.createApp = createApp;
const createComponents = (components, owner) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const fieldRepository = new type_1.FieldRepository();
    const propRepository = new prop_1.PropRepository();
    const storeRepository = new store_1.StoreRepository();
    const interfaceTypeRepository = new type_1.InterfaceTypeRepository();
    for (const component of components) {
        const isExist = (0, component_1.findComponent)({ id: component.id });
        if ((yield isExist).length > 0) {
            return;
        }
        else {
            yield interfaceTypeRepository.add([
                Object.assign(Object.assign({}, component.store.api), { fields: [], owner }),
                Object.assign(Object.assign({}, component.api), { fields: [], owner }),
            ]);
            yield fieldRepository.add(component.api.fields);
            yield fieldRepository.add(component.store.api.fields);
            yield storeRepository.add([component.store]);
            yield propRepository.add([component.props]);
            yield (0, component_1.createComponent)(component, owner);
        }
    }
});
exports.createComponents = createComponents;
/**
 * Gather all pages, elements and components
 */
const getAppPages = (app) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const Page = yield neo4j_1.Repository.instance.Page;
    const pages = yield Page.find({
        selectionSet: neo4j_1.exportPageSelectionSet,
        where: { app: { id: app.id } },
    });
    const pagesData = yield Promise.all(pages.map((page) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const { elements } = yield (0, page_1.getPageData)(page);
        const { id, kind, name, pageContentContainer, rootElement, store, url } = page;
        return Object.assign({ elements, id: id, kind: kind, name: name, rootElement: {
                id: rootElement.id,
                name: rootElement.name,
            }, store,
            url }, (pageContentContainer ? { pageContentContainer } : {}));
    })));
    return pagesData;
});
exports.getAppPages = getAppPages;
// export component of the app
const getAppComponents = (app) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const pageRepository = new page_1.PageRepository();
    const pages = yield pageRepository.find({ app: { id: app.id } });
    const componentPromises = (0, map_1.default)(pages, (page) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const { components } = yield (0, page_1.getPageData)(page);
        return components;
    }));
    const components = yield Promise.all(componentPromises).then((result) => (0, flatMap_1.default)(result));
    return { components };
});
exports.getAppComponents = getAppComponents;


/***/ }),
/* 626 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(627), exports);


/***/ }),
/* 627 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(628), exports);


/***/ }),
/* 628 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.findComponent = exports.createComponent = void 0;
const tslib_1 = __webpack_require__(1);
const neo4j_1 = __webpack_require__(157);
const mapper_1 = __webpack_require__(289);
const createComponent = (component, owner) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const Component = yield neo4j_1.Repository.instance.Component;
    const { components: [newComponent], } = yield Component.create({
        input: [
            {
                api: (0, mapper_1.connectNodeId)(component.api.id),
                childrenContainerElement: (0, mapper_1.connectNodeId)(component.childrenContainerElement.id),
                id: component.id,
                name: component.name,
                owner: (0, mapper_1.connectAuth0Owner)(owner),
                props: (0, mapper_1.connectNodeId)(component.props.id),
                rootElement: (0, mapper_1.connectNodeId)(component.rootElement.id),
                store: (0, mapper_1.connectNodeId)(component.store.id),
            },
        ],
    });
    if (!newComponent) {
        throw new Error('Component not created');
    }
    return newComponent;
});
exports.createComponent = createComponent;
const findComponent = (where) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const Component = yield neo4j_1.Repository.instance.Component;
    const components = yield Component.find({
        selectionSet: neo4j_1.componentSelectionSet,
        where,
    });
    return components;
});
exports.findComponent = findComponent;


/***/ }),
/* 629 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(630), exports);
tslib_1.__exportStar(__webpack_require__(632), exports);


/***/ }),
/* 630 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(631), exports);


/***/ }),
/* 631 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Page = void 0;
class Page {
    constructor({ app, 
    // descendentElements,
    id, kind, name, pageContentContainer, rootElement, store, url, }) {
        Object.defineProperty(this, "app", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // descendentElements?: Array<IEntity> | undefined
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "kind", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "pageContentContainer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "rootElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "store", {
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
        this.id = id;
        this.app = app;
        // this.descendentElements = descendentElements
        this.kind = kind;
        this.name = name;
        this.pageContentContainer = pageContentContainer;
        this.rootElement = rootElement;
        this.store = store;
        this.url = url;
    }
}
exports.Page = Page;


/***/ }),
/* 632 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(633), exports);


/***/ }),
/* 633 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getPageData = exports.PageRepository = void 0;
const tslib_1 = __webpack_require__(1);
const element_1 = __webpack_require__(602);
const neo4j_1 = __webpack_require__(157);
const core_1 = __webpack_require__(287);
const mapper_1 = __webpack_require__(289);
const utils_1 = __webpack_require__(35);
const flatMap_1 = tslib_1.__importDefault(__webpack_require__(634));
class PageRepository extends core_1.AbstractRepository {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "Page", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: neo4j_1.Repository.instance.Page
        });
    }
    _find(where = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield (yield this.Page).find({
                selectionSet: neo4j_1.pageSelectionSet,
                where,
            });
        });
    }
    /**
     * We only deal with connecting/disconnecting relationships, actual items should exist already
     */
    _add(pages) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.Page).create({
                input: pages.map(({ app, id, kind, name, pageContentContainer, rootElement, store, url, }) => ({
                    _compoundName: (0, utils_1.createUniqueName)(name, app.id),
                    app: (0, mapper_1.connectNodeId)(app.id),
                    id,
                    kind,
                    pageContentContainer: (0, mapper_1.connectNodeId)(pageContentContainer === null || pageContentContainer === void 0 ? void 0 : pageContentContainer.id),
                    rootElement: (0, mapper_1.connectNodeId)(rootElement.id),
                    store: (0, mapper_1.connectNodeId)(store.id),
                    url,
                })),
            })).pages;
        });
    }
    _update({ app, name, pageContentContainer, rootElement, url }, where) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.Page).update({
                update: {
                    _compoundName: (0, utils_1.createUniqueName)(name, app.id),
                    app: (0, mapper_1.reconnectNodeId)(app.id),
                    pageContentContainer: (0, mapper_1.reconnectNodeId)(pageContentContainer === null || pageContentContainer === void 0 ? void 0 : pageContentContainer.id),
                    rootElement: (0, mapper_1.reconnectNodeId)(rootElement.id),
                    url,
                },
                where,
            })).pages[0];
        });
    }
}
exports.PageRepository = PageRepository;
const getPageData = (page) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const Component = yield neo4j_1.Repository.instance.Component;
    const elements = yield (0, element_1.getElementWithDescendants)(page.rootElement.id);
    const componentIds = (0, flatMap_1.default)(elements, (element) => {
        var _a, _b;
        return [
            (_a = element.parentComponent) === null || _a === void 0 ? void 0 : _a.id,
            (_b = element.renderComponentType) === null || _b === void 0 ? void 0 : _b.id,
            ...(element.props.data.match(utils_1.uuidRegex) || []),
        ];
    }).filter((element) => Boolean(element));
    const components = yield Component.find({
        selectionSet: neo4j_1.exportComponentSelectionSet,
        where: { id_IN: componentIds },
    });
    for (const { rootElement } of components) {
        const componentDescendants = yield (0, element_1.getElementWithDescendants)(rootElement.id);
        elements.push(...componentDescendants);
    }
    return { components, elements };
});
exports.getPageData = getPageData;


/***/ }),
/* 634 */
/***/ ((module) => {

module.exports = require("lodash/flatMap");

/***/ }),
/* 635 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(636), exports);
tslib_1.__exportStar(__webpack_require__(638), exports);


/***/ }),
/* 636 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(637), exports);


/***/ }),
/* 637 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Prop = void 0;
class Prop {
    constructor({ api, data, id }) {
        Object.defineProperty(this, "api", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.id = id;
        this.api = api;
        this.data = data;
    }
}
exports.Prop = Prop;


/***/ }),
/* 638 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(639), exports);


/***/ }),
/* 639 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PropRepository = void 0;
const tslib_1 = __webpack_require__(1);
const neo4j_1 = __webpack_require__(157);
const core_1 = __webpack_require__(287);
class PropRepository extends core_1.AbstractRepository {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "Prop", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: neo4j_1.Repository.instance.Prop
        });
    }
    _find(where = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield (yield this.Prop).find({
                selectionSet: neo4j_1.propSelectionSet,
                where,
            });
        });
    }
    /**
     * We only deal with connecting/disconnecting relationships, actual items should exist already
     */
    _add(apps) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.Prop).create({
                input: apps.map(({ data = '', id }) => ({
                    data,
                    id,
                })),
            })).props;
        });
    }
    _update({ data, id }, where) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.Prop).update({
                update: {
                    data,
                },
                where,
            })).props[0];
        });
    }
}
exports.PropRepository = PropRepository;


/***/ }),
/* 640 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(641), exports);
tslib_1.__exportStar(__webpack_require__(643), exports);


/***/ }),
/* 641 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(642), exports);


/***/ }),
/* 642 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Store = void 0;
const type_1 = __webpack_require__(140);
const core_1 = __webpack_require__(86);
const uuid_1 = __webpack_require__(130);
class Store {
    constructor({ api, id, name }) {
        Object.defineProperty(this, "actions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "api", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.api = api;
        this.id = id;
        this.name = name;
    }
    static create(owner, name) {
        const api = new type_1.InterfaceType({
            fields: [],
            id: (0, uuid_1.v4)(),
            kind: core_1.ITypeKind.InterfaceType,
            name: `${name} API`,
            owner,
        });
        return new Store({
            api,
            id: (0, uuid_1.v4)(),
            name,
        });
    }
}
exports.Store = Store;


/***/ }),
/* 643 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(644), exports);


/***/ }),
/* 644 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StoreRepository = void 0;
const tslib_1 = __webpack_require__(1);
const neo4j_1 = __webpack_require__(157);
const core_1 = __webpack_require__(287);
const mapper_1 = __webpack_require__(289);
class StoreRepository extends core_1.AbstractRepository {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "Store", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: neo4j_1.Repository.instance.Store
        });
    }
    _find(where = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield (yield this.Store).find({
                selectionSet: neo4j_1.storeSelectionSet,
                where,
            });
        });
    }
    /**
     * We only deal with connecting/disconnecting relationships, actual items should exist already
     */
    _add(stores) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.Store).create({
                input: stores.map(({ api, id, name }) => ({
                    api: (0, mapper_1.connectNodeId)(api.id),
                    id,
                    name,
                })),
            })).stores;
        });
    }
    _update({ api, id, name }, where) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.Store).update({
                update: {
                    name,
                },
                where,
            })).stores[0];
        });
    }
}
exports.StoreRepository = StoreRepository;


/***/ }),
/* 645 */
/***/ ((module) => {

module.exports = require("lodash/omit");

/***/ }),
/* 646 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validate = void 0;
const tslib_1 = __webpack_require__(1);
const neo4j_1 = __webpack_require__(157);
const flatMap_1 = tslib_1.__importDefault(__webpack_require__(634));
const validate = (pages) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const Atoms = yield neo4j_1.Repository.instance.Atom;
    let allAtomIds = (0, flatMap_1.default)(pages, (page) => page.elements
        .map((element) => { var _a; return (_a = element.renderAtomType) === null || _a === void 0 ? void 0 : _a.id; })
        .filter(Boolean));
    let allAtomNames = (0, flatMap_1.default)(pages, (page) => page.elements
        .map((element) => { var _a; return (_a = element.renderAtomType) === null || _a === void 0 ? void 0 : _a.name; })
        .filter(Boolean));
    allAtomIds = [...new Set(allAtomIds)];
    allAtomNames = [...new Set(allAtomNames)];
    const foundAtoms = yield Atoms.find({
        where: { OR: [{ id_IN: allAtomIds }, { name_IN: allAtomNames }] },
    });
    if (foundAtoms.length !== allAtomIds.length) {
        const foundAtomsSet = new Set(foundAtoms.map((atom) => atom.name));
        const notFound = allAtomNames.filter((name) => !foundAtomsSet.has(name));
        throw new Error(`Can't find Atoms with names "${notFound.join('", "')}"`);
    }
});
exports.validate = validate;


/***/ }),
/* 647 */
/***/ ((module) => {

module.exports = require("bull");

/***/ }),
/* 648 */
/***/ ((module) => {

module.exports = require("lodash/pick");

/***/ }),
/* 649 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(650), exports);


/***/ }),
/* 650 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.scrapeAntDesignData = void 0;
const tslib_1 = __webpack_require__(1);
__webpack_require__(651);
const util_1 = __webpack_require__(614);
const path_1 = tslib_1.__importDefault(__webpack_require__(202));
const puppeteer_1 = tslib_1.__importDefault(__webpack_require__(652));
const BASE_URL = 'https://ant.design/components/';
const outputDirectory = './data/antd-v5';
const getComponentApiData = (browser, component) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const componentUrl = `${BASE_URL}${component}`;
    const componentPage = yield browser.newPage();
    yield componentPage.goto(componentUrl);
    // Inject jQuery into the page
    yield componentPage.addScriptTag({
        path: 'node_modules/jquery/dist/jquery.min.js',
    });
    return yield componentPage.evaluate((name) => {
        const apiTables = Array.from($('table.component-api-table'));
        return apiTables.map((table) => {
            const apiTitle = $(table)
                .closest('.dumi-default-table')
                .prev('h3, h4')
                .text();
            const rows = Array.from($(table).find('tbody tr'));
            const fields = rows.map((row) => {
                var _a, _b, _c, _d, _e;
                const rowData = Array.from($(row).find('td')).map((cell) => cell.textContent);
                return {
                    defaultValue: (_a = rowData[4]) !== null && _a !== void 0 ? _a : '',
                    description: (_b = rowData[1]) !== null && _b !== void 0 ? _b : '',
                    property: (_c = rowData[0]) !== null && _c !== void 0 ? _c : '',
                    type: (_d = rowData[2]) !== null && _d !== void 0 ? _d : '',
                    version: (_e = rowData[3]) !== null && _e !== void 0 ? _e : '',
                };
            });
            return {
                atom: {
                    api: apiTitle,
                    name,
                },
                fields,
            };
        });
    }, component);
});
const scrapeAntDesignData = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch({ headless: 'new' });
    const overviewPage = yield browser.newPage();
    yield overviewPage.goto(`${BASE_URL}overview`, { waitUntil: 'networkidle2' });
    // Inject jQuery into the page
    yield overviewPage.addScriptTag({
        path: 'node_modules/jquery/dist/jquery.min.js',
    });
    overviewPage.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
    const components = yield overviewPage.evaluate(() => {
        const sidebarLinks = Array.from($('section.main-menu-inner .ant-menu-item a'));
        return sidebarLinks
            .map((link) => { var _a; return ((_a = $(link).attr('href')) === null || _a === void 0 ? void 0 : _a.replace('/components/', '')) || ''; })
            .filter((link) => link !== 'overview');
        // .slice(0, 3)
    });
    for (const [index, component] of components.entries()) {
        console.log(`Fetching component data: ${component} (${index + 1}/${components.length})...`);
        const apiData = yield getComponentApiData(browser, component);
        (0, util_1.saveFormattedFile)(path_1.default.join(outputDirectory, `${component}.json`), apiData);
    }
    yield browser.close();
    console.log('Scraping completed. The data has been saved to the "data/antd-v5" directory.');
});
exports.scrapeAntDesignData = scrapeAntDesignData;


/***/ }),
/* 651 */
/***/ ((module) => {

module.exports = require("jquery");

/***/ }),
/* 652 */
/***/ ((module) => {

module.exports = require("puppeteer");

/***/ }),
/* 653 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(654), exports);


/***/ }),
/* 654 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SeedFrameworkService = void 0;
const tslib_1 = __webpack_require__(1);
const atom_1 = __webpack_require__(583);
const service_1 = __webpack_require__(24);
const tag_1 = __webpack_require__(609);
const type_1 = __webpack_require__(83);
const object_typed_1 = __webpack_require__(182);
/**
 * A framework is like Ant Design,  Material UI, or even HTML itself.
 *
 * It contains atoms, api's, tags
 */
class SeedFrameworkService extends service_1.AuthUseCase {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "seeder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new type_1.TypeSeederService()
        });
    }
    _execute(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.seedSystemTypes();
            yield this.seedTags(data.tags);
            yield this.seedEmptyApi(object_typed_1.ObjectTyped.keys(data.atoms));
            const atoms = yield this.seedAtoms(data.atoms);
            yield this.seedFields(yield data.fields(atoms));
        });
    }
    seedSystemTypes() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const types = Object.values((0, type_1.systemTypesData)(this.owner));
            return yield this.seeder.seedTypes(types, this.owner);
        });
    }
    seedAtoms(atoms) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new atom_1.SeedAtomsService(this.owner).execute(atoms);
        });
    }
    seedTags(tags) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new tag_1.SeedTagsService(this.owner).execute(tags);
        });
    }
    seedEmptyApi(atoms) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new type_1.SeedEmptyApiService(this.owner).execute(atoms);
        });
    }
    seedFields(fields) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.seeder.seedFields(fields);
        });
    }
}
exports.SeedFrameworkService = SeedFrameworkService;


/***/ }),
/* 655 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(656), exports);


/***/ }),
/* 656 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(657), exports);
tslib_1.__exportStar(__webpack_require__(666), exports);
tslib_1.__exportStar(__webpack_require__(703), exports);
tslib_1.__exportStar(__webpack_require__(704), exports);
tslib_1.__exportStar(__webpack_require__(708), exports);
tslib_1.__exportStar(__webpack_require__(709), exports);
tslib_1.__exportStar(__webpack_require__(710), exports);
tslib_1.__exportStar(__webpack_require__(711), exports);
tslib_1.__exportStar(__webpack_require__(719), exports);


/***/ }),
/* 657 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.graphqlCodegen = void 0;
const tslib_1 = __webpack_require__(1);
const core_1 = __webpack_require__(658);
const typescriptPlugin = tslib_1.__importStar(__webpack_require__(659));
const typescriptOperationsPlugin = tslib_1.__importStar(__webpack_require__(660));
const graphql_file_loader_1 = __webpack_require__(661);
const load_1 = __webpack_require__(662);
const url_loader_1 = __webpack_require__(663);
const fs_1 = tslib_1.__importDefault(__webpack_require__(201));
const graphql_1 = __webpack_require__(264);
const matched_files_1 = __webpack_require__(664);
const graphqlCodegen = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    // Schema
    const schema = yield (0, load_1.loadSchema)('http://127.0.0.1:3000/api/graphql', {
        loaders: [new url_loader_1.UrlLoader()],
    });
    // const schema = await loadSchema('your-schema.graphql', {
    //   loaders: [new GraphQLFileLoader()],
    // })
    // Documents - this is an example, you might need to adjust according to your file structure
    const documents = yield (0, load_1.loadDocuments)(yield (0, matched_files_1.documentFiles)(), {
        loaders: [new graphql_file_loader_1.GraphQLFileLoader()],
    });
    console.log(documents);
    // Call the codegen function
    const output = yield (0, core_1.codegen)({
        config: {
            defaultScalarType: 'unknown',
            gqlImport: 'graphql-tag#gql',
            inlineFragmentTypes: 'combine',
            namingConvention: {
                enumValues: 'keep',
            },
            scalars: {
                _Any: 'any',
                DateTime: 'string',
                Int64: 'number',
                JSON: 'Record<string, any>',
                JSONObject: 'Record<string, any>',
                uuid: 'string',
                Void: 'void',
            },
            skipTypename: true,
            strictScalars: true,
        },
        documents,
        filename: 'graphql.gen.ts',
        pluginMap: {
            typescript: typescriptPlugin,
            typescriptOperations: typescriptOperationsPlugin,
            // typescriptGraphqlRequest: typescriptGraphqlRequestPlugin,
        },
        plugins: [
            { typescript: {} },
            { typescriptOperations: {} },
            // { typescriptGraphqlRequestPlugin: {} },
        ],
        schema: (0, graphql_1.parse)((0, graphql_1.printSchema)(schema)),
    });
    // Write output to a file
    fs_1.default.writeFileSync('API.ts', output);
    // console.log(out)
});
exports.graphqlCodegen = graphqlCodegen;


/***/ }),
/* 658 */
/***/ ((module) => {

module.exports = require("@graphql-codegen/core");

/***/ }),
/* 659 */
/***/ ((module) => {

module.exports = require("@graphql-codegen/typescript");

/***/ }),
/* 660 */
/***/ ((module) => {

module.exports = require("@graphql-codegen/typescript-operations");

/***/ }),
/* 661 */
/***/ ((module) => {

module.exports = require("@graphql-tools/graphql-file-loader");

/***/ }),
/* 662 */
/***/ ((module) => {

module.exports = require("@graphql-tools/load");

/***/ }),
/* 663 */
/***/ ((module) => {

module.exports = require("@graphql-tools/url-loader");

/***/ }),
/* 664 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.documentFiles = void 0;
const tslib_1 = __webpack_require__(1);
const globby_1 = tslib_1.__importDefault(__webpack_require__(665));
const documentFiles = () => globby_1.default.sync('**/*.graphql', { gitignore: true });
exports.documentFiles = documentFiles;


/***/ }),
/* 665 */
/***/ ((module) => {

module.exports = require("globby");

/***/ }),
/* 666 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exportCommand = void 0;
const tslib_1 = __webpack_require__(1);
const admin_1 = __webpack_require__(21);
const user_1 = __webpack_require__(667);
const neo4j_1 = __webpack_require__(157);
const util_1 = __webpack_require__(614);
const inquirer_1 = tslib_1.__importDefault(__webpack_require__(691));
const yargs_1 = tslib_1.__importDefault(__webpack_require__(692));
const command_1 = __webpack_require__(693);
const path_args_1 = __webpack_require__(696);
const select_user_1 = __webpack_require__(702);
const stage_1 = __webpack_require__(695);
/**
 * Entry point for all export. Show users a list of questions such as
 *
 * - Which apps to export, can select none as well
 * - Whether to include types
 *
 */
exports.exportCommand = {
    builder: (argv) => argv
        .options(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, path_args_1.skipUserDataOption), path_args_1.skipSeedDataOption), path_args_1.userDataPathOption), path_args_1.seedDataPathOption), (0, command_1.getStageOptions)([stage_1.Stage.Dev, stage_1.Stage.Test])))
        .middleware([command_1.loadStageMiddleware]),
    command: 'export',
    describe: 'Export user data',
    handler: ({ seedDataPath, skipSeedData, skipUserData, userDataPath, }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const App = yield neo4j_1.Repository.instance.App;
        const apps = yield App.find();
        const shouldSkipSeedData = skipSeedData !== undefined
            ? skipSeedData
            : !(yield inquirer_1.default.prompt([
                {
                    default: false,
                    message: 'Would you like to export seed data?',
                    name: 'confirm',
                    type: 'confirm',
                },
            ])).confirm;
        const shouldSkipUserData = skipUserData !== undefined
            ? skipUserData
            : !(yield inquirer_1.default.prompt([
                {
                    default: false,
                    message: 'Would you like to export user data?',
                    name: 'confirm',
                    type: 'confirm',
                },
            ])).confirm;
        // Exit early if no apps to export
        if (!shouldSkipUserData && !apps.length) {
            console.log('No app exists');
            yargs_1.default.exit(0, null);
        }
        if (!shouldSkipSeedData) {
            ;
            (yield new admin_1.ExportAdminDataService().execute()).saveAsFiles();
        }
        if (!shouldSkipUserData) {
            const { selectedAppId, selectedAuth0Id } = yield inquirer_1.default.prompt([
                yield (0, select_user_1.selectUserPrompt)(),
                {
                    choices: apps.map((app) => ({
                        name: app.name,
                        value: app.id,
                    })),
                    message: 'Select which app to export',
                    name: 'selectedApp',
                    type: 'list',
                },
            ]);
            const exportedUserData = yield (0, user_1.exportUserData)({
                id: selectedAppId,
            });
            yield (0, util_1.saveFormattedFile)(`${selectedAuth0Id}-${Date.now()}.json`, exportedUserData);
        }
        yargs_1.default.exit(0, null);
    }),
};


/***/ }),
/* 667 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(668), exports);


/***/ }),
/* 668 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(669), exports);
tslib_1.__exportStar(__webpack_require__(689), exports);


/***/ }),
/* 669 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exportUserData = void 0;
const tslib_1 = __webpack_require__(1);
const app_1 = __webpack_require__(670);
const resource_1 = __webpack_require__(682);
const type_1 = __webpack_require__(83);
const exportUserData = (where) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const appsData = yield (0, app_1.exportApps)(where);
    // TODO: Need to export only types used by app
    const typesData = yield (0, type_1.exportUserTypes)();
    const resourcesData = yield (0, resource_1.exportResources)();
    const components = yield (0, app_1.exportComponents)(where);
    const exportData = Object.assign({ apps: appsData, components, resources: resourcesData }, typesData);
    return exportData;
});
exports.exportUserData = exportUserData;


/***/ }),
/* 670 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(671), exports);


/***/ }),
/* 671 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(672), exports);
tslib_1.__exportStar(__webpack_require__(673), exports);
tslib_1.__exportStar(__webpack_require__(674), exports);
tslib_1.__exportStar(__webpack_require__(681), exports);


/***/ }),
/* 672 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exportApps = void 0;
const tslib_1 = __webpack_require__(1);
const app_1 = __webpack_require__(621);
const exportApps = (where) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const appRepository = new app_1.AppRepository();
    const apps = yield appRepository.find(where);
    return apps.reduce((appsData, app) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const pagesData = yield (0, app_1.getAppPages)(app);
        const appExport = {
            domains: app.domains,
            id: app.id,
            name: app.name,
            pages: pagesData,
            slug: app.slug,
        };
        return [...(yield appsData), appExport];
    }), Promise.resolve([]));
});
exports.exportApps = exportApps;


/***/ }),
/* 673 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exportComponents = void 0;
const tslib_1 = __webpack_require__(1);
const app_1 = __webpack_require__(621);
const flatMap_1 = tslib_1.__importDefault(__webpack_require__(634));
const uniqBy_1 = tslib_1.__importDefault(__webpack_require__(613));
const exportComponents = (where) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const appRepository = new app_1.AppRepository();
    const apps = yield appRepository.find(where);
    const components = yield Promise.all(apps.map((app) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        return (yield (0, app_1.getAppComponents)(app)).components;
    })));
    const uniqueComponents = (0, uniqBy_1.default)((0, flatMap_1.default)(components), 'id');
    return uniqueComponents;
});
exports.exportComponents = exportComponents;


/***/ }),
/* 674 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.importApps = void 0;
const tslib_1 = __webpack_require__(1);
const domain_1 = __webpack_require__(675);
const app_1 = __webpack_require__(621);
const utils_1 = __webpack_require__(35);
const importApps = (apps = [], owner) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    (0, utils_1.logSection)('Importing App');
    for (const app of apps) {
        const importedApp = yield (0, app_1.createApp)(app, owner);
        (0, utils_1.logTask)('Imported App', importedApp.name);
        try {
            for (var _d = true, _e = (e_1 = void 0, tslib_1.__asyncValues(app.domains)), _f; _f = yield _e.next(), _a = _f.done, !_a;) {
                _c = _f.value;
                _d = false;
                try {
                    const domain = _c;
                    yield (0, domain_1.importDomains)(domain);
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
});
exports.importApps = importApps;


/***/ }),
/* 675 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(676), exports);


/***/ }),
/* 676 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(677), exports);


/***/ }),
/* 677 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.importDomains = void 0;
const tslib_1 = __webpack_require__(1);
const domain_1 = __webpack_require__(678);
const utils_1 = __webpack_require__(35);
const importDomains = (domain) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    (0, utils_1.logSection)('Importing Domains');
    const newDomainAdded = yield (0, domain_1.addVercelDomain)(domain);
    if (!newDomainAdded) {
        console.log(`No domain information was found for domain: ${domain}`);
        return;
    }
    /**
     * Create inside our own database
     */
    return yield (0, domain_1.createDomainIfNotExist)(domain);
});
exports.importDomains = importDomains;


/***/ }),
/* 678 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(679), exports);


/***/ }),
/* 679 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(680), exports);


/***/ }),
/* 680 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createDomainIfNotExist = exports.addVercelDomain = exports.logAPIError = void 0;
const tslib_1 = __webpack_require__(1);
const neo4j_1 = __webpack_require__(157);
const vercel_1 = __webpack_require__(217);
const mapper_1 = __webpack_require__(289);
const utils_1 = __webpack_require__(35);
/**
 * If response is 200, we log error & return false
 */
const logAPIError = (res, requestName) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (res.status !== 200) {
        let parsedBody = {};
        try {
            parsedBody = yield res.json();
            // eslint-disable-next-line no-empty
        }
        catch (_a) { }
        console.error(`[${requestName}] Fail to make request. Response: ${JSON.stringify(parsedBody, null, 2)}`);
        return false;
    }
    return true;
});
exports.logAPIError = logAPIError;
/**
 * Add Vercel domain if doesn't already exist.
 *
 * @return throws if due to error
 */
const addVercelDomain = (domain) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const getProjectDomainResponse = yield vercel_1.vercelApis.domain.getProjectDomain(domain.name);
    /**
     * Add domain if project not found
     */
    if (getProjectDomainResponse.status === vercel_1.PROJECT_NOT_FOUND) {
        const addDomainResponse = yield vercel_1.vercelApis.domain.addDomain(domain.name);
        return yield (0, exports.logAPIError)(addDomainResponse, 'addDomain');
    }
    return yield (0, exports.logAPIError)(getProjectDomainResponse, 'getProjectDomain');
});
exports.addVercelDomain = addVercelDomain;
const createDomainIfNotExist = (domain) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const Domain = yield neo4j_1.Repository.instance.Domain;
    const idExisting = yield Domain.find({
        where: {
            name: domain.name,
        },
    });
    if (idExisting.length) {
        console.error(`Domain ${domain.name} already exists`);
        return;
    }
    (0, utils_1.logTask)('Create Domain', domain.name, domain);
    yield Domain.create({
        input: [
            {
                app: (0, mapper_1.connectNodeId)(domain.app.id),
                id: domain.id,
                name: domain.name,
            },
        ],
    });
});
exports.createDomainIfNotExist = createDomainIfNotExist;


/***/ }),
/* 681 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.importComponents = void 0;
const tslib_1 = __webpack_require__(1);
const app_1 = __webpack_require__(621);
const element_1 = __webpack_require__(602);
const utils_1 = __webpack_require__(35);
const importComponents = (components, apps, owner) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    (0, utils_1.logSection)('Importing components');
    yield (0, app_1.createComponents)(components, owner);
    // after all the components and elements are created,
    // we can link the element's renderComponentType
    for (const app of apps) {
        for (const page of app.pages) {
            for (const element of page.elements) {
                if (element.renderComponentType === null) {
                    continue;
                }
                yield (0, element_1.updateImportedElement)(element);
            }
        }
    }
});
exports.importComponents = importComponents;


/***/ }),
/* 682 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(683), exports);


/***/ }),
/* 683 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(684), exports);
tslib_1.__exportStar(__webpack_require__(685), exports);


/***/ }),
/* 684 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exportResources = void 0;
const tslib_1 = __webpack_require__(1);
const neo4j_1 = __webpack_require__(157);
const exportResources = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const Resource = yield neo4j_1.Repository.instance.Resource;
    return yield Resource.find({
        selectionSet: neo4j_1.resourceSelectionSet,
    });
});
exports.exportResources = exportResources;


/***/ }),
/* 685 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.importResources = void 0;
const tslib_1 = __webpack_require__(1);
const resource_1 = __webpack_require__(686);
const utils_1 = __webpack_require__(35);
const importResources = (resources = [], owner) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    (0, utils_1.logSection)('Importing Resource');
    for (const resource of resources) {
        const importedResource = yield (0, resource_1.createResource)(resource, owner);
        (0, utils_1.logTask)('Imported Resource', resource.name);
        console.info(`Imported resource with id ${importedResource === null || importedResource === void 0 ? void 0 : importedResource.id}`);
    }
});
exports.importResources = importResources;


/***/ }),
/* 686 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(687), exports);


/***/ }),
/* 687 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(688), exports);


/***/ }),
/* 688 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createResource = void 0;
const tslib_1 = __webpack_require__(1);
const neo4j_1 = __webpack_require__(157);
const mapper_1 = __webpack_require__(289);
const createResource = (resource, owner) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const Resource = yield neo4j_1.Repository.instance.Resource;
    const existing = yield Resource.find({
        where: { id: resource.id },
    });
    if (existing.length) {
        console.log('Deleting resource before re-creating...');
        yield Resource.delete({
            where: { id: resource.id },
        });
    }
    const input = {
        config: {
            create: { node: { data: resource.config.data, id: resource.config.id } },
        },
        id: resource.id,
        name: resource.name,
        owner: (0, mapper_1.connectAuth0Owner)(owner),
        type: resource.type,
    };
    const { resources: [createdResource], } = yield Resource.create({
        input: [input],
    });
    return createdResource;
});
exports.createResource = createResource;


/***/ }),
/* 689 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.importUserData = void 0;
const tslib_1 = __webpack_require__(1);
__webpack_require__(690);
const app_1 = __webpack_require__(670);
const resource_1 = __webpack_require__(682);
const importUserData = (data, owner) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { apps, components, resources } = data;
    yield (0, resource_1.importResources)(resources, owner);
    yield (0, app_1.importApps)(apps, owner);
    yield (0, app_1.importComponents)(components, apps, owner);
});
exports.importUserData = importUserData;


/***/ }),
/* 690 */
/***/ ((module) => {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 691 */
/***/ ((module) => {

module.exports = require("inquirer");

/***/ }),
/* 692 */
/***/ ((module) => {

module.exports = require("yargs");

/***/ }),
/* 693 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loadStageMiddleware = exports.getStageOptions = void 0;
const tslib_1 = __webpack_require__(1);
const config_1 = __webpack_require__(179);
const dotenv_1 = tslib_1.__importDefault(__webpack_require__(694));
const stage_1 = __webpack_require__(695);
/**
 * Options used locally
 */
const getStageOptions = (stages) => ({
    stage: {
        choices: stages,
        default: stage_1.Stage.Dev,
        demandOption: true,
        describe: 'Stage used to load proper `.env`',
        type: 'string',
    },
});
exports.getStageOptions = getStageOptions;
/**
 * Used locally to load env for other stages
 */
const loadStageMiddleware = ({ stage }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if ((0, config_1.getEnv)().circleci.ci) {
        return;
    }
    // Load prod env only if not CI
    if (stage === stage_1.Stage.Prod) {
        dotenv_1.default.config({ override: true, path: '.env.prod' });
    }
    if (stage === stage_1.Stage.Dev) {
        dotenv_1.default.config({ override: true, path: '.env' });
    }
    if (stage === stage_1.Stage.Test) {
        dotenv_1.default.config({ override: true, path: '.env.test' });
    }
});
exports.loadStageMiddleware = loadStageMiddleware;


/***/ }),
/* 694 */
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),
/* 695 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Stage = void 0;
/**
 * This is the script environment for running processes like CI/CD
 */
var Stage;
(function (Stage) {
    // Remote on CircleCi
    Stage["CI"] = "ci";
    // Local using primary port
    Stage["Dev"] = "dev";
    // Vercel remote
    Stage["Prod"] = "prod";
    // Local using secondary port
    Stage["Test"] = "test";
})(Stage = exports.Stage || (exports.Stage = {}));


/***/ }),
/* 696 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.selectUser = exports.upsertUserMiddleware = exports.assignUserOption = exports.skipSeedDataOption = exports.skipUserDataOption = exports.userDataPathOption = exports.seedDataPathOption = void 0;
const tslib_1 = __webpack_require__(1);
const codegen_1 = __webpack_require__(309);
const user_1 = __webpack_require__(697);
const config_1 = __webpack_require__(179);
const inquirer_1 = tslib_1.__importDefault(__webpack_require__(691));
const uuid_1 = __webpack_require__(130);
const select_user_1 = __webpack_require__(702);
const stage_1 = __webpack_require__(695);
exports.seedDataPathOption = {
    seedDataPath: {
        alias: 'seed',
        describe: 'File path of the seed data to be exported',
        // demandOption: true,
        type: 'string',
        // default: defaultSeedFilePath,
    },
};
exports.userDataPathOption = {
    userDataPath: {
        alias: 'user',
        describe: 'File path of the user data to be exported',
        // demandOption: true,
        type: 'string',
    },
};
exports.skipUserDataOption = {
    skipUserData: {
        // alias: 's',
        describe: 'Skip user data',
        type: 'boolean',
    },
};
exports.skipSeedDataOption = {
    skipSeedData: {
        // alias: 's',
        describe: 'Skip seed data',
        type: 'boolean',
    },
};
exports.assignUserOption = {
    email: {
        alias: 'e',
        describe: 'Email of the user to assign to',
        type: 'string',
    },
};
const upsertUserMiddleware = ({ stage }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    /**
     * This may cause errors. The auth0Id may not match up
     *
     * Perform upsert here
     */
    if (stage === stage_1.Stage.Dev) {
        const userRepository = new user_1.UserRepository();
        const user = new user_1.User({
            auth0Id: (0, uuid_1.v4)(),
            email: (0, config_1.getEnv)().auth0.cypressUsername,
            id: (0, uuid_1.v4)(),
            roles: [codegen_1.Role.Admin],
            username: 'Codelab',
        });
        yield userRepository.save(user, { email: user.email });
    }
});
exports.upsertUserMiddleware = upsertUserMiddleware;
const selectUser = (argv) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const email = argv['email'];
    const userRepository = new user_1.UserRepository();
    const selectedAuth0Id = email
        ? (_a = (yield userRepository.findOne({ email }))) === null || _a === void 0 ? void 0 : _a.auth0Id
        : (yield inquirer_1.default.prompt([yield (0, select_user_1.selectUserPrompt)()])).selectedAuth0Id;
    if (!selectedAuth0Id) {
        throw new Error('User not found!');
    }
    const user = { auth0Id: selectedAuth0Id };
    argv['user'] = user;
});
exports.selectUser = selectUser;


/***/ }),
/* 697 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(698), exports);
tslib_1.__exportStar(__webpack_require__(700), exports);


/***/ }),
/* 698 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(699), exports);


/***/ }),
/* 699 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const tslib_1 = __webpack_require__(1);
const codegen_1 = __webpack_require__(309);
const core_1 = __webpack_require__(86);
const uuid_1 = __webpack_require__(130);
class User {
    constructor({ auth0Id, email, id, roles = [], username }) {
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "auth0Id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "email", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "username", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "roles", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.id = id;
        this.auth0Id = auth0Id;
        this.email = email;
        this.roles = roles;
        this.username = username;
    }
    static fromSession(_a) {
        var { email, nickname, sub } = _a, session = tslib_1.__rest(_a, ["email", "nickname", "sub"]);
        const auth0Id = sub;
        const roles = session[core_1.JWT_CLAIMS].roles;
        return new User({
            auth0Id,
            email,
            id: (0, uuid_1.v4)(),
            roles: [codegen_1.Role.Admin],
            username: nickname,
        });
    }
}
exports.User = User;


/***/ }),
/* 700 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(701), exports);


/***/ }),
/* 701 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRepository = void 0;
const tslib_1 = __webpack_require__(1);
const neo4j_1 = __webpack_require__(157);
const core_1 = __webpack_require__(287);
class UserRepository extends core_1.AbstractRepository {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "User", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: neo4j_1.Repository.instance.User
        });
    }
    _find(where) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield (yield this.User).find({
                selectionSet: neo4j_1.userSelectionSet,
                where,
            });
        });
    }
    _add(users) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.User).create({
                input: users.map((_a) => {
                    var { apps } = _a, user = tslib_1.__rest(_a, ["apps"]);
                    return (Object.assign({}, user));
                }),
            })).users;
        });
    }
    _update(_a, where) {
        var { apps, id } = _a, user = tslib_1.__rest(_a, ["apps", "id"]);
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield (yield this.User).update({
                update: Object.assign({}, user),
                where,
            })).users[0];
        });
    }
}
exports.UserRepository = UserRepository;


/***/ }),
/* 702 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.selectUserPrompt = void 0;
const tslib_1 = __webpack_require__(1);
const neo4j_1 = __webpack_require__(157);
const selectUserPrompt = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const User = yield neo4j_1.Repository.instance.User;
    const users = yield User.find();
    return {
        choices: users.map((user) => ({
            name: user.email,
            value: user.auth0Id,
        })),
        message: 'Select which user to be owner of the app',
        name: 'selectedAuth0Id',
        type: 'list',
    };
});
exports.selectUserPrompt = selectUserPrompt;


/***/ }),
/* 703 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImportService = void 0;
const tslib_1 = __webpack_require__(1);
const admin_1 = __webpack_require__(21);
const neo4j_1 = __webpack_require__(157);
const common_1 = __webpack_require__(16);
const fs_1 = tslib_1.__importDefault(__webpack_require__(201));
const inquirer_1 = tslib_1.__importDefault(__webpack_require__(691));
const path_1 = tslib_1.__importDefault(__webpack_require__(202));
const command_1 = __webpack_require__(693);
const path_args_1 = __webpack_require__(696);
const select_user_1 = __webpack_require__(702);
const stage_1 = __webpack_require__(695);
let ImportService = class ImportService {
    constructor(importAdminDataService) {
        Object.defineProperty(this, "importAdminDataService", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: importAdminDataService
        });
        Object.defineProperty(this, "command", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'import'
        });
        Object.defineProperty(this, "describe", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'Import user data'
        });
        Object.defineProperty(this, "handler", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.execute
        });
    }
    builder(argv) {
        return argv
            .options(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, path_args_1.assignUserOption), path_args_1.skipUserDataOption), path_args_1.skipSeedDataOption), path_args_1.userDataPathOption), path_args_1.seedDataPathOption), (0, command_1.getStageOptions)([stage_1.Stage.Dev, stage_1.Stage.Test])))
            .middleware([
            command_1.loadStageMiddleware,
            path_args_1.upsertUserMiddleware,
            // Issue with inferring option
        ]);
    }
    // handler = this.execute.bind(this)
    execute({ email, seedDataPath, skipSeedData, skipUserData, }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const User = yield neo4j_1.Repository.instance.User;
            const selectedAuth0Id = email
                ? (_a = (yield User.find({ where: { email } }))[0]) === null || _a === void 0 ? void 0 : _a.auth0Id
                : (yield inquirer_1.default.prompt([yield (0, select_user_1.selectUserPrompt)()])).selectedAuth0Id;
            const shouldSkipSeedData = skipSeedData !== undefined
                ? skipSeedData
                : !(yield inquirer_1.default.prompt([
                    {
                        default: false,
                        message: 'Would you like to import seed data?',
                        name: 'confirm',
                        type: 'confirm',
                    },
                ])).confirm;
            const shouldSkipUserData = skipUserData !== undefined
                ? skipUserData
                : !(yield inquirer_1.default.prompt([
                    {
                        default: false,
                        message: 'Would you like to import user data?',
                        name: 'confirm',
                        type: 'confirm',
                    },
                ])).confirm;
            /**
             * Seed atoms & types for the project
             */
            if (!shouldSkipSeedData) {
                yield this.importAdminDataService.execute({ auth0Id: selectedAuth0Id });
            }
            // If we specified a file for import
            if (!shouldSkipUserData) {
                const inputFilePath = seedDataPath !== undefined
                    ? seedDataPath
                    : (yield inquirer_1.default.prompt([
                        {
                            message: 'Enter a path to import from, relative to ./',
                            name: 'inputFilePath',
                            type: 'input',
                        },
                    ])).inputFilePath;
                const json = fs_1.default.readFileSync(path_1.default.resolve(process.cwd(), inputFilePath), 'utf8');
                const userData = JSON.parse(json);
                console.log('import user data');
                // await importUserData(userData, { auth0Id: selectedAuth0Id })
            }
        });
    }
};
ImportService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof admin_1.ImportAdminDataService !== "undefined" && admin_1.ImportAdminDataService) === "function" ? _a : Object])
], ImportService);
exports.ImportService = ImportService;


/***/ }),
/* 704 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resetCommand = void 0;
const tslib_1 = __webpack_require__(1);
const admin_1 = __webpack_require__(705);
const neo4j_1 = __webpack_require__(157);
const command_1 = __webpack_require__(693);
const stage_1 = __webpack_require__(695);
exports.resetCommand = {
    builder: (argv) => argv
        .options(Object.assign({}, (0, command_1.getStageOptions)([
        stage_1.Stage.Dev,
        stage_1.Stage.Test,
        // Stage.Prod
    ])))
        .middleware([command_1.loadStageMiddleware]),
    command: 'reset',
    describe: 'Reset database',
    handler: () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        return yield new admin_1.AdminService((0, neo4j_1.getDriver)()).reset({ close: true });
    }),
};


/***/ }),
/* 705 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(706), exports);


/***/ }),
/* 706 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(707), exports);


/***/ }),
/* 707 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminService = void 0;
const tslib_1 = __webpack_require__(1);
class AdminService {
    constructor(driver) {
        Object.defineProperty(this, "driver", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: driver
        });
    }
    reset({ close } = { close: false }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const driver = this.driver;
            const session = driver.session();
            try {
                /**
                 * https://aura.support.neo4j.com/hc/en-us/articles/4412131924883-How-to-wipe-out-delete-all-the-content-in-a-Neo4j-AuraDB-Instance-
                 */
                const result = yield session.executeWrite((tx) => tx.run('MATCH (n) DETACH DELETE n'));
                // console.log('result', result)
            }
            finally {
                yield session.close();
            }
            // Don't close since it doesn't work for jest specs
            if (close) {
                return yield driver.close();
            }
        });
    }
}
exports.AdminService = AdminService;


/***/ }),
/* 708 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.scrapeAntdCommand = void 0;
const tslib_1 = __webpack_require__(1);
const admin_1 = __webpack_require__(21);
exports.scrapeAntdCommand = {
    command: 'antd',
    describe: 'Scrape props data from Ant Design as CSV files',
    handler: () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        yield (0, admin_1.scrapeAntDesignData)();
    }),
};


/***/ }),
/* 709 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.scrapeHtmlCommand = void 0;
const tslib_1 = __webpack_require__(1);
const admin_1 = __webpack_require__(21);
exports.scrapeHtmlCommand = {
    command: 'html',
    describe: 'Scrape html data from https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes',
    handler: () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        yield (0, admin_1.scrapeAntDesignData)();
    }),
};


/***/ }),
/* 710 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.seedCommand = void 0;
const tslib_1 = __webpack_require__(1);
const admin_1 = __webpack_require__(21);
const command_1 = __webpack_require__(693);
const path_args_1 = __webpack_require__(696);
const stage_1 = __webpack_require__(695);
exports.seedCommand = {
    builder: (argv) => argv
        .options(Object.assign(Object.assign({}, (0, command_1.getStageOptions)([stage_1.Stage.Dev, stage_1.Stage.Test])), path_args_1.assignUserOption))
        .middleware([command_1.loadStageMiddleware, path_args_1.upsertUserMiddleware, path_args_1.selectUser])
        .command('antd', 'Seed Ant Design framework', (_argv) => _argv, ({ user }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const owner = user;
        yield new admin_1.AdminSeederService(owner).seedAntDesign();
        process.exit(0);
    }))
        .command('html', 'Seed html', (_argv) => _argv, ({ user }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const owner = user;
        yield new admin_1.AdminSeederService(owner).seedHtml();
        process.exit(0);
    }))
        .demandCommand(),
    command: 'seed',
    describe: 'Parse Ant Design scraped CSV files and seed to application as types',
    handler: ({ email }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        // await new SeedDataService().execute(user)
    }),
};


/***/ }),
/* 711 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tasksCommand = void 0;
const tslib_1 = __webpack_require__(1);
const neo4j_1 = __webpack_require__(157);
const shell_1 = __webpack_require__(712);
const child_process_1 = __webpack_require__(715);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const git_changed_files_1 = tslib_1.__importDefault(__webpack_require__(716));
const is_port_reachable_1 = tslib_1.__importDefault(__webpack_require__(717));
const path_1 = tslib_1.__importDefault(__webpack_require__(202));
const command_1 = __webpack_require__(693);
const stage_1 = __webpack_require__(695);
const tasks_1 = __webpack_require__(718);
/**
 * We require this since execCommand creates a new process and any env set before that doesn't apply
 */
const NX_TEST = 'npx env-cmd -f .env.test nx';
exports.tasksCommand = {
    builder: (yargv) => yargv
        .options((0, command_1.getStageOptions)([stage_1.Stage.Dev, stage_1.Stage.Test, stage_1.Stage.CI]))
        .command(tasks_1.Tasks.Build, 'Build projects', (argv) => argv, ({ stage }) => {
        if (stage === stage_1.Stage.Test) {
            // Added since many times can't find production build of next during push
            // Maybe related? https://github.com/nrwl/nx/issues/2839
            (0, shell_1.execCommand)(`${NX_TEST} build platform -c test`);
        }
        if (stage === stage_1.Stage.CI) {
            (0, shell_1.execCommand)(`nx build platform -c ci`);
        }
    })
        .command(tasks_1.Tasks.Unit, 'Run unit tests', (argv) => argv, ({ stage }) => {
        if (stage === stage_1.Stage.Test) {
            // Added since many times can't find production build of next during push
            // Maybe related? https://github.com/nrwl/nx/issues/2839
            // execCommand(`${NX_TEST} build platform -c test`)
            (0, shell_1.execCommand)(`${NX_TEST} affected --target=test --testPathPattern="[^i].spec.ts" --memoryLimit=8192 --color`);
        }
        if (stage === stage_1.Stage.CI) {
            (0, shell_1.execCommand)('npx nx affected --target=test --testPathPattern="[^i].spec.ts" --color --parallel=3 --verbose --reporters=default --reporters=jest-junit');
        }
    })
        .command(tasks_1.Tasks.Int, 'Run integration tests', (argv) => argv, ({ stage }) => {
        if (stage === stage_1.Stage.Test) {
            (0, shell_1.execCommand)(`${NX_TEST} affected --target=test --testPathPattern="[i].spec.ts" --memoryLimit=8192 --color`);
        }
        if (stage === stage_1.Stage.CI) {
            (0, shell_1.execCommand)('npx nx affected --target=test --testPathPattern="[i].spec.ts" --color --parallel=4 --reporters=default --reporters=jest-junit --verbose');
        }
    })
        .command(tasks_1.Tasks.Codegen, 'Run codegen', (argv) => argv.fail((msg, err) => console.log(msg, err)), ({ stage }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        if (stage === stage_1.Stage.Dev) {
            if (!(yield (0, is_port_reachable_1.default)(3000, { host: '127.0.0.1' }))) {
                console.error('Please start server!');
                process.exit(0);
            }
            (0, shell_1.execCommand)('yarn graphql-codegen');
            // await graphqlCodegen()
            yield (0, neo4j_1.generateOgmTypes)();
            process.exit(0);
        }
        if (stage === stage_1.Stage.CI) {
            const startServer = `nx serve-test platform -c ci`;
            const runSpecs = `npx wait-on 'http://127.0.0.1:3000' && yarn graphql-codegen && exit 0`;
            const runSpecsChildProcess = (0, child_process_1.spawn)(runSpecs, {
                detached: true,
                shell: true,
                stdio: 'inherit',
            });
            const startServerChildProcess = (0, child_process_1.spawn)(startServer, {
                detached: true,
                shell: true,
                stdio: 'inherit',
            });
            runSpecsChildProcess.on('exit', (code) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
                if (startServerChildProcess.pid) {
                    yield (0, neo4j_1.generateOgmTypes)();
                    try {
                        process.kill(-startServerChildProcess.pid, 'SIGINT');
                    }
                    catch (error) {
                        console.error(error);
                    }
                }
                const { unCommittedFiles } = yield (0, git_changed_files_1.default)();
                console.log('Un-committed files', unCommittedFiles);
                const containsGeneratedFiles = unCommittedFiles.reduce((_matches, file) => {
                    const filename = path_1.default.basename(file);
                    return (_matches ||
                        filename.includes('.gen.ts') ||
                        filename === 'schema.graphql');
                }, false);
                if (containsGeneratedFiles) {
                    (0, shell_1.execCommand)('git diff');
                    console.error('Please run codegen!');
                    process.exit(1);
                }
            }));
        }
    }))
        .command(tasks_1.Tasks.E2e, 'Run e2e tests', (argv) => argv, ({ stage }) => {
        if (stage === stage_1.Stage.Test) {
            (0, shell_1.execCommand)(`${NX_TEST} run platform-e2e:e2e:test `);
        }
        if (stage === stage_1.Stage.Dev) {
            (0, shell_1.execCommand)(`${NX_TEST} run platform-e2e:e2e:dev`);
        }
        if (stage === stage_1.Stage.CI) {
            // Using `affected` here causes CircleCI parallel specs to not work
            // execCommand(`npx nx affected --target=e2e -c ci`)
            (0, shell_1.execCommand)(`npx nx run platform-e2e:e2e:ci --verbose`);
        }
    })
        .command(tasks_1.Tasks.Lint, 'Lint projects', (argv) => argv, ({ stage }) => {
        if (stage === stage_1.Stage.Test) {
            (0, shell_1.execCommand)(`yarn cross-env TIMING=1 lint-staged`);
            (0, shell_1.execCommand)(`npx ls-lint`);
        }
        if (stage === stage_1.Stage.CI) {
            (0, shell_1.execCommand)(`npx nx affected --target=lint --parallel=3 --verbose -c ci`);
            // https://github.com/nrwl/nx/discussions/8769
            (0, shell_1.execCommand)(`npx prettier --check "./**/*.{graphql,yaml,json}"`);
            // execCommand(
            //   `yarn madge --circular apps libs --extensions ts,tsx,js,jsx`,
            // )
            (0, shell_1.execCommand)(`npx ls-lint`);
        }
    })
        .command(`${tasks_1.Tasks.Commitlint} [edit]`, 'Commitlint projects', (argv) => argv, ({ edit, stage }) => {
        if (stage === stage_1.Stage.Test) {
            (0, shell_1.execCommand)(`npx --no-install commitlint --edit ${edit}`);
        }
        if (stage === stage_1.Stage.CI) {
            (0, shell_1.execCommand)(`./scripts/lint/commitlint-ci.sh`);
        }
    })
        .demandCommand(1, 'Please provide a task'),
    command: 'tasks',
    describe: 'Run tasks',
    handler: () => {
        //
    },
};


/***/ }),
/* 712 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(713), exports);


/***/ }),
/* 713 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.execCommand = void 0;
const tslib_1 = __webpack_require__(1);
const execa_1 = tslib_1.__importDefault(__webpack_require__(714));
const execCommand = (command) => {
    try {
        execa_1.default.commandSync(command, {
            shell: true,
            stdio: 'inherit',
        });
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};
exports.execCommand = execCommand;


/***/ }),
/* 714 */
/***/ ((module) => {

module.exports = require("execa");

/***/ }),
/* 715 */
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),
/* 716 */
/***/ ((module) => {

module.exports = require("git-changed-files");

/***/ }),
/* 717 */
/***/ ((module) => {

module.exports = require("is-port-reachable");

/***/ }),
/* 718 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Tasks = void 0;
var Tasks;
(function (Tasks) {
    Tasks["Build"] = "build";
    Tasks["Codegen"] = "codegen";
    Tasks["Commitlint"] = "commitlint";
    Tasks["E2e"] = "e2e";
    Tasks["Int"] = "int";
    Tasks["Lint"] = "lint";
    Tasks["Unit"] = "unit";
})(Tasks = exports.Tasks || (exports.Tasks = {}));


/***/ }),
/* 719 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TerraformService = void 0;
const tslib_1 = __webpack_require__(1);
const shell_1 = __webpack_require__(712);
const common_1 = __webpack_require__(16);
const command_1 = __webpack_require__(693);
const stage_1 = __webpack_require__(695);
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
    }
    builder(yargv) {
        return yargv
            .options(Object.assign({}, (0, command_1.getStageOptions)([stage_1.Stage.Dev, stage_1.Stage.CI, stage_1.Stage.Prod, stage_1.Stage.Test])))
            .command('init', 'terraform init', (argv) => argv, ({ stage }) => {
            (0, shell_1.execCommand)(`cd terraform/environments/${stage} && ./symlink.sh`);
            (0, shell_1.execCommand)(`cd terraform/modules && ./symlink.sh`);
            return (0, shell_1.execCommand)(`cd terraform; export TF_WORKSPACE=${stage}; terraform -chdir=environments/${stage} init;`);
        })
            .command('plan', 'terraform plan', (argv) => argv, ({ stage }) => {
            return (0, shell_1.execCommand)(`cd terraform; export TF_WORKSPACE=${stage}; terraform -chdir=environments/${stage} plan`);
        })
            .command('apply', 'terraform apply', (argv) => argv, ({ stage }) => {
            const autoApprove = stage === stage_1.Stage.Prod ? '-auto-approve' : '';
            return (0, shell_1.execCommand)(`cd terraform; export TF_WORKSPACE=${stage}; terraform -chdir=environments/${stage} apply ${autoApprove}`);
        })
            .command('validate', 'terraform validate', (argv) => argv, ({ stage }) => {
            return (0, shell_1.execCommand)(`cd terraform; export TF_WORKSPACE=${stage}; terraform -chdir=environments/${stage} validate`);
        })
            .command('destroy', 'terraform destroy', (argv) => argv, ({ stage }) => {
            return (0, shell_1.execCommand)(`cd terraform; export TF_WORKSPACE=${stage}; terraform -chdir=environments/${stage} destroy`);
        })
            .demandCommand(1, 'Please provide a task');
    }
    handler() {
        //
    }
};
TerraformService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], TerraformService);
exports.TerraformService = TerraformService;


/***/ }),
/* 720 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommandService = void 0;
const tslib_1 = __webpack_require__(1);
const cli_1 = __webpack_require__(655);
const common_1 = __webpack_require__(16);
const yargs_1 = tslib_1.__importDefault(__webpack_require__(692));
const helpers_1 = __webpack_require__(721);
let CommandService = class CommandService {
    constructor(importService, terraformService) {
        Object.defineProperty(this, "importService", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: importService
        });
        Object.defineProperty(this, "terraformService", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: terraformService
        });
    }
    exec() {
        // this.importService.execute.bind(this)
        void (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
            .scriptName('cli')
            /**
             * These scripts could act on different deployment environment, so we group under `data`
             */
            .command(cli_1.seedCommand)
            .command(cli_1.resetCommand)
            .command(this.importService)
            .command(cli_1.exportCommand)
            /**
             * These scripts don't require env to be explicitly set
             */
            .command(cli_1.tasksCommand)
            /**
             * This uses puppeteer to scrape the API documentation as CSV file
             */
            // .command(scrapeCommand)
            .command('scrape', 'Antd / Html', (argv) => argv.command(cli_1.scrapeAntdCommand).command(cli_1.scrapeHtmlCommand))
            /**
             * Terraform
             */
            .command(this.terraformService)
            .demandCommand(1, 'Please provide a command')
            // Must add this to throw error for unknown arguments
            .strict().argv;
        console.log('Done! Please press Ctrl+C');
    }
};
CommandService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof cli_1.ImportService !== "undefined" && cli_1.ImportService) === "function" ? _a : Object, typeof (_b = typeof cli_1.TerraformService !== "undefined" && cli_1.TerraformService) === "function" ? _b : Object])
], CommandService);
exports.CommandService = CommandService;


/***/ }),
/* 721 */
/***/ ((module) => {

module.exports = require("yargs/helpers");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
// Must be imported first
// eslint-disable-next-line simple-import-sort/imports
const otel_1 = __webpack_require__(2);
const core_1 = __webpack_require__(12);
const app_module_1 = __webpack_require__(13);
const bootstrap = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield otel_1.otelSDK.start();
    const app = yield core_1.NestFactory.createApplicationContext(app_module_1.AppModule, {
    // logger: false,
    });
    yield app.init();
    // await app.close()
});
void bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map