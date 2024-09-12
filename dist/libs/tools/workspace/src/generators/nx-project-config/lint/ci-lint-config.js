"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCiLintConfig = exports.addCiLintConfig = void 0;
/**
 * Output ESLint reporter to tmp library
 */
const addCiLintConfig = (tree, projectConfig) => {
    Object.assign(projectConfig, {
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
    if (projectConfig.targets?.lint?.configurations) {
        delete projectConfig.targets.lint.configurations;
    }
    console.log('After', projectConfig);
};
exports.removeCiLintConfig = removeCiLintConfig;
//# sourceMappingURL=ci-lint-config.js.map