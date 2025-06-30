"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLintConfig = void 0;
const checkLintConfig = (tree, projectConfig) => {
    console.log('Checking lint target...');
    if (!projectConfig.targets) {
        projectConfig.targets = {};
    }
    if (!projectConfig.targets['lint']) {
        projectConfig.targets['lint'] = {
            executor: '@nx/eslint:lint',
        };
    }
    const lintTarget = projectConfig.targets['lint'];
    return lintTarget.executor === '@nx/eslint:lint';
};
exports.checkLintConfig = checkLintConfig;
//# sourceMappingURL=check-lint-config.js.map