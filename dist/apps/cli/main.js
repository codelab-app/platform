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
;// external "path"
const external_path_namespaceObject = require("path");
var external_path_default = /*#__PURE__*/__webpack_require__.n(external_path_namespaceObject);
;// external "yargs"
const external_yargs_namespaceObject = require("yargs");
var external_yargs_default = /*#__PURE__*/__webpack_require__.n(external_yargs_namespaceObject);
;// external "yargs/helpers"
const helpers_namespaceObject = require("yargs/helpers");
;// ./src/commands/command.service.ts
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@codelab/backend-infra-adapter-cli'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
var _a, _b;





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
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (_a = typeof Object(function webpackMissingModule() { var e = new Error("Cannot find module '@codelab/backend-infra-adapter-cli'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) !== "undefined" && Object(function webpackMissingModule() { var e = new Error("Cannot find module '@codelab/backend-infra-adapter-cli'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())) === "function" ? _a : Object, typeof (_b = typeof Object(function webpackMissingModule() { var e = new Error("Cannot find module '@codelab/backend-infra-adapter-cli'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) !== "undefined" && Object(function webpackMissingModule() { var e = new Error("Cannot find module '@codelab/backend-infra-adapter-cli'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())) === "function" ? _b : Object])
], CommandService);


;// ./src/commands/command.module.ts
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@codelab/backend-infra-adapter-cli'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
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
            Object(function webpackMissingModule() { var e = new Error("Cannot find module '@codelab/backend-infra-adapter-cli'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()),
            Object(function webpackMissingModule() { var e = new Error("Cannot find module '@codelab/backend-infra-adapter-cli'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()),
        ],
    }),
    (0,external_tslib_namespaceObject.__metadata)("design:paramtypes", [typeof (command_module_a = typeof CommandService !== "undefined" && CommandService) === "function" ? command_module_a : Object])
], CommandModule);


;// ./src/cli.module.ts
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@codelab/backend-infra-adapter-logger'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@codelab/shared-abstract-core'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());







const getEnvFilePath = () => {
    const stageFlagIndex = process.argv.findIndex((arg) => arg === '--stage');
    const stage = process.argv[stageFlagIndex + 1];
    if (!stage) {
        throw new Error('Missing or incorrect --stage flag');
    }
    const envFilePath = (file) => external_path_default().resolve(process.cwd(), 'apps/api', file);
    if (stage === Object(function webpackMissingModule() { var e = new Error("Cannot find module '@codelab/shared-abstract-core'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).Dev) {
        return envFilePath('.env');
    }
    if (stage === Object(function webpackMissingModule() { var e = new Error("Cannot find module '@codelab/shared-abstract-core'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).Test) {
        return envFilePath('.env.test');
    }
    if (stage === Object(function webpackMissingModule() { var e = new Error("Cannot find module '@codelab/shared-abstract-core'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).CI) {
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
            Object(function webpackMissingModule() { var e = new Error("Cannot find module '@codelab/backend-infra-adapter-logger'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()),
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