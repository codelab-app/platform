"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nxProjectConfigGenerator = void 0;
const devkit_1 = require("@nx/devkit");
const update_jest_config_1 = require("./jest/update-jest-config");
const add_project_tags_1 = require("./project-tags/add-project-tags");
const tsconfig_lib_1 = require("./tsconfig/lib/tsconfig.lib");
/**
 * Go through all projects and update the `lint` setting of `project.json`
 */
const nxProjectConfigGenerator = async (tree, options) => {
    const projects = (0, devkit_1.getProjects)(tree);
    const projectNames = projects.keys();
    for (const projectName of projectNames) {
        const projectConfig = (0, devkit_1.readProjectConfiguration)(tree, projectName);
        console.log(`Checking for ${projectConfig.name}...`);
        console.log('-----------------');
        /**
         * Modifies projectConfig here
         */
        // addCiLintConfig(tree, projectConfig)
        // removeCiLintConfig(tree, projectConfig)
        /**
         * Migrate use different configuration for `test` target, as opposed to creating separate targets, for better extensibility
         *
         * Downside is creating extra `*.env` files
         */
        // migrateToConfigBasedTest(tree, projectConfig)
        /**
         * Add the lint pattern to nx.json instead
         */
        // addGraphqlEslintConfig(tree, projectConfig)
        // addGraphqlExtension(tree, projectConfig)
        // removeGraphqlEslintConfig(tree, projectConfig)
        // checkLintConfig(tree, projectConfig)
        (0, update_jest_config_1.updateJestConfig)(tree, projectConfig);
        (0, add_project_tags_1.addProjectTags)(tree, projectConfig);
        // updateBaseTsconfig(tree, projectConfig)
        (0, tsconfig_lib_1.updateLibraryTsconfig)(tree, projectConfig);
        (0, devkit_1.updateProjectConfiguration)(tree, projectName, projectConfig);
    }
    await (0, devkit_1.formatFiles)(tree);
};
exports.nxProjectConfigGenerator = nxProjectConfigGenerator;
exports.default = exports.nxProjectConfigGenerator;
//# sourceMappingURL=generator.js.map