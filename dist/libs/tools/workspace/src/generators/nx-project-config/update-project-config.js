"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectConfig = void 0;
const devkit_1 = require("@nx/devkit");
const ci_lint_config_1 = require("./lint/ci-lint-config");
const add_project_tags_1 = require("./project-tags/add-project-tags");
const project_json_1 = require("./test/project-json");
const lib_tsconfig_1 = require("./tsconfig/lib-tsconfig");
/**
 * Each project needs to output reporters to individual file, and we can't do that as CLI argument, so needs to be done at project level.
 *
 * We loop through each project and add the configurations there at a per-library basis.
 */
const updateProjectConfig = (tree, projectName) => {
    const projectConfig = (0, devkit_1.readProjectConfiguration)(tree, projectName);
    console.log(`Checking for ${projectConfig.name}...`);
    /**
     * Modifies projectConfig here
     */
    // addCiLintConfig(tree, projectConfig)
    (0, ci_lint_config_1.removeCiLintConfig)(tree, projectConfig);
    /**
     * Add the lint pattern to nx.json instead
     */
    // addGraphqlEslintConfig(tree, projectConfig)
    // addGraphqlExtension(tree, projectConfig)
    (0, project_json_1.updateTestConfig)(tree, projectConfig);
    (0, add_project_tags_1.addProjectTags)(tree, projectConfig);
    (0, lib_tsconfig_1.updateLibraryTsconfig)(tree, projectConfig);
    (0, devkit_1.updateProjectConfiguration)(tree, projectName, projectConfig);
};
exports.updateProjectConfig = updateProjectConfig;
//# sourceMappingURL=update-project-config.js.map