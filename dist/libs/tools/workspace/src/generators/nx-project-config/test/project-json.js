"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTestConfig = void 0;
const tslib_1 = require("tslib");
const has_1 = tslib_1.__importDefault(require("lodash/has"));
const merge_1 = tslib_1.__importDefault(require("lodash/merge"));
const pick_1 = tslib_1.__importDefault(require("lodash/pick"));
const set_1 = tslib_1.__importDefault(require("lodash/set"));
const updateTestConfig = (tree, projectConfig) => {
    /**
     * Only add if library is already using jest
     */
    if ((0, has_1.default)(projectConfig, 'targets.test')) {
        // console.log(`Updating ${projectConfig.name}...`)
        /**
         * But we need to filter out reporters config, since we will use the jest config
         */
        const testConfiguration = (0, pick_1.default)(projectConfig.targets?.test, [
            'executor',
            'outputs',
            'options.jestConfig',
        ]);
        /**
         * Use set because we want to remove old keys
         */
        (0, set_1.default)(projectConfig, 'targets.test:integration', (0, merge_1.default)({
            defaultConfiguration: 'dev',
            options: {
                memoryLimit: 8192,
                color: true,
                testPathPattern: ['i.spec.ts'],
                runInBand: true,
            },
            configurations: {
                dev: {
                    reporters: ['default'],
                },
                test: {
                    reporters: ['default'],
                },
                ci: {
                    parallel: 3,
                },
            },
        }, 
        /**
         * First merge with the default test config, this way if migration update test, we can copy it over
         *
         */
        testConfiguration));
        (0, set_1.default)(projectConfig, 'targets.test:unit', (0, merge_1.default)({
            defaultConfiguration: 'dev',
            options: {
                color: true,
                memoryLimit: 8192,
                parallel: 3,
                testPathIgnorePatterns: ['i.spec.ts'],
            },
            configurations: {
                dev: {
                    reporters: ['default'],
                },
                test: {
                    reporters: ['default'],
                },
                ci: {},
            },
        }, testConfiguration));
        /**
         * Add default reporters to development to override our jest config for reporters (since those config don't work in CLI, we had to add them to config file)
         */
        (0, merge_1.default)(projectConfig, {
            targets: {
                test: {
                    options: {
                        runInBand: true,
                        reporters: ['default'],
                    },
                },
            },
        });
        /**
         * jest reporters options don't work with CLI, so we need to add to jest config
         */
        // updateJestConfig(tree, projectConfig)
    }
};
exports.updateTestConfig = updateTestConfig;
//# sourceMappingURL=project-json.js.map