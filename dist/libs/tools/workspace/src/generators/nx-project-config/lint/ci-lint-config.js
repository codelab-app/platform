"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCiLintConfig = void 0;
const tslib_1 = require("tslib");
const merge_1 = tslib_1.__importDefault(require("lodash/merge"));
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
//# sourceMappingURL=ci-lint-config.js.map