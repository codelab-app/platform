"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCiLintConfig = exports.addCiLintConfig = void 0;
const tslib_1 = require("tslib");
const merge_1 = tslib_1.__importDefault(require("lodash/merge"));
const unset_1 = tslib_1.__importDefault(require("lodash/unset"));
/**
 * Output ESLint reporter to tmp library
 */
const addCiLintConfig = (tree, projectConfig) => {
    (0, merge_1.default)(projectConfig, {
        targets: {
            lint: {
                configurations: {
                    ci: {
                        format: 'junit',
                        outputFile: `tmp/reports/lint/${projectConfig.name}.xml`,
                        quiet: true,
                    },
                },
            },
        },
    });
};
exports.addCiLintConfig = addCiLintConfig;
/**
 * We can put these in nx.js instead
 */
const removeCiLintConfig = (tree, projectConfig) => {
    console.log('Before', projectConfig);
    (0, unset_1.default)(projectConfig, 'targets.lint.configurations');
    console.log('After', projectConfig);
};
exports.removeCiLintConfig = removeCiLintConfig;
//# sourceMappingURL=ci-lint-config.js.map