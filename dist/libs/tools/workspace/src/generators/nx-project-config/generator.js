"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nxProjectConfigGenerator = void 0;
const devkit_1 = require("@nx/devkit");
const remove_test_targets_1 = require("./jest/remove-test-targets");
const migrate_project_reference_1 = require("./migrate-project-reference");
const add_project_tags_1 = require("./project-tags/add-project-tags");
const tsconfig_base_1 = require("./tsconfig/base/tsconfig.base");
/**
 * Factory function to generate a list of available projects for the x-prompt
 * @returns An array of project choices for the dropdown
 * //
 */
const nxProjectConfigGenerator = async (tree, options) => {
    const projects = (0, devkit_1.getProjects)(tree);
    // If projectName is specified, only process that project
    const projectNames = options.projectName
        ? [options.projectName]
        : [...projects.keys()];
    for (const projectName of projectNames) {
        const projectConfig = (0, devkit_1.readProjectConfiguration)(tree, projectName);
        console.log(`Checking for ${projectConfig.name}...`);
        console.log('-----------------');
        if (projectConfig.projectType === 'application') {
            console.log('Skipping application project:', projectConfig.name);
            continue;
        }
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
        // updateJestConfig(tree, projectConfig)
        // Migrate project to use TypeScript project references
        if (options.migrateToProjectReferences) {
            await (0, migrate_project_reference_1.migrateProjectReference)(tree, projectConfig);
        }
        else {
            (0, add_project_tags_1.addProjectTags)(tree, projectConfig);
            (0, remove_test_targets_1.updateTestTargets)(tree, projectConfig);
            (0, tsconfig_base_1.updateBaseTsconfig)(tree, projectConfig);
            // updateLibraryTsconfig(tree, projectConfig)
        }
        (0, devkit_1.updateProjectConfiguration)(tree, projectName, projectConfig);
    }
    await (0, devkit_1.formatFiles)(tree);
};
exports.nxProjectConfigGenerator = nxProjectConfigGenerator;
exports.default = exports.nxProjectConfigGenerator;
//# sourceMappingURL=generator.js.map