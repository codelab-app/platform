"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectConfig = void 0;
const devkit_1 = require("@nx/devkit");
const ci_lint_config_1 = require("./lint/ci-lint-config");
const test_config_1 = require("./test/test-config");
/**
 * Each project needs to output reporters to individual file, and we can't do that as CLI argument, so needs to be done at project level.
 *
 * We loop through each project and add the configurations there at a per-library basis.
 */
const updateProjectConfig = (tree, projectName) => {
    const projectConfig = (0, devkit_1.readProjectConfiguration)(tree, projectName);
    console.log(`Checking for ${projectConfig.name}...`);
    (0, ci_lint_config_1.addCiLintConfig)(tree, projectConfig);
    (0, test_config_1.updateTestConfig)(tree, projectConfig);
    (0, devkit_1.updateProjectConfiguration)(tree, projectName, projectConfig);
    // updateLibTsconfig()
};
exports.updateProjectConfig = updateProjectConfig;
//# sourceMappingURL=update-project-config.js.map