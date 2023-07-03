"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTestConfig = void 0;
const tslib_1 = require("tslib");
const has_1 = tslib_1.__importDefault(require("lodash/has"));
const merge_1 = tslib_1.__importDefault(require("lodash/merge"));
const omit_1 = tslib_1.__importDefault(require("lodash/omit"));
const set_1 = tslib_1.__importDefault(require("lodash/set"));
const reporters_1 = require("./reporters");
const updateTestConfig = (tree, projectConfig) => {
    /**
     * Only add if library is already using jest
     */
    if ((0, has_1.default)(projectConfig, 'targets.test')) {
        console.log(`Updating ${projectConfig.name}...`);
        /**
         * First need to add default reporters to developmentto override our jest config for reporters (since those config don't work in CLI, we had to add them to config file)
         */
        (0, merge_1.default)(projectConfig, {
            targets: {
                test: {
                    options: {
                        reporters: ['default'],
                    },
                },
            },
        });
        /**
         * But we need to filter out reporters config, since we will use the jest config
         */
        const testOptions = (0, omit_1.default)(projectConfig.targets?.test, 'options.reporters');
        /**
         * Use set because we want to remove old keys
         */
        (0, set_1.default)(projectConfig, 'targets.test:integration', (0, merge_1.default)({
            configurations: {
                ci: {
                    // outputFile: `tmp/reports/test-integration/${projectConfig.name}.xml`,
                    // reporters: ['default', 'jest-junit'],
                    parallel: 3,
                },
                dev: {
                    reporters: ['default'],
                },
                test: {
                    reporters: ['default'],
                },
            },
            defaultConfiguration: 'dev',
            options: {
                color: true,
                memoryLimit: 8192,
                testPathPattern: ['[i].spec.ts'],
            },
        }, 
        /**
         * First merge with the default test config, this way if migration update test, we can copy it over
         *
         */
        testOptions));
        (0, set_1.default)(projectConfig, 'targets.test:unit', (0, merge_1.default)({
            configurations: {
                ci: {
                /**
                 * Reporter options are not available via CLI
                 *
                 * https://stackoverflow.com/questions/59372493/override-jest-junit-default-output-location
                 */
                // So specs that fail to run will show as errors
                // reportTestSuiteErrors: true,
                // outputFile: `${projectConfig.name}.xml`,
                // reporters: ['default', 'jest-junit'],
                },
                dev: {
                    reporters: ['default'],
                },
                test: {
                    reporters: ['default'],
                },
            },
            defaultConfiguration: 'dev',
            options: {
                color: true,
                memoryLimit: 8192,
                parallel: 3,
                testPathPattern: ['[^i].spec.ts'],
            },
        }, testOptions));
        /**
         * jest reporters options don't work with CLI, so we need to add to jest config
         */
        (0, reporters_1.addReportersToJestConfig)(tree, projectConfig);
    }
};
exports.updateTestConfig = updateTestConfig;
//# sourceMappingURL=test-config.js.map