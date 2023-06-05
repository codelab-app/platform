"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCiLintConfig = void 0;
const tslib_1 = require("tslib");
const devkit_1 = require("@nx/devkit");
const merge_1 = tslib_1.__importDefault(require("lodash/merge"));
const addCiLintConfig = (tree, projectName) => {
    const projectConfig = (0, devkit_1.readProjectConfiguration)(tree, projectName);
    (0, merge_1.default)(projectConfig, {
        targets: {
            lint: {
                configurations: {
                    ci: {
                        format: 'junit',
                        outputFile: `tmp/reports/lint/${projectConfig.name}.xml`,
                    },
                },
            },
        },
    });
    (0, devkit_1.updateProjectConfiguration)(tree, projectName, projectConfig);
};
exports.addCiLintConfig = addCiLintConfig;
//# sourceMappingURL=update-project-config.js.map