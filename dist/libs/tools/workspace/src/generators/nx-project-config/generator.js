"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nxProjectConfigGenerator = void 0;
const devkit_1 = require("@nx/devkit");
const remove_test_targets_1 = require("./jest/remove-test-targets");
const migrate_project_reference_1 = require("./migrate-project-reference");
const migrate_to_inferred_1 = require("./migrate-to-inferred/migrate-to-inferred");
const add_project_tags_1 = require("./project-tags/add-project-tags");
const copy_options_1 = require("./tsconfig/copy-options");
const migrate_to_vite_libs_1 = require("./vite-libs/migrate-to-vite-libs");
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
        if (projectConfig.name === 'codelab' ||
            projectConfig.sourceRoot?.startsWith('libs/tools')) {
            console.log('Skipping project:', projectConfig.name);
            continue;
        }
        if (projectConfig.sourceRoot?.startsWith('libs/shared/infra')) {
            await (0, migrate_to_vite_libs_1.migrateToViteLibs)(tree, projectConfig);
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
        else if (options.migrateToInferred) {
            await (0, migrate_to_inferred_1.migrateToInferred)(tree, projectConfig);
        }
        else {
            (0, add_project_tags_1.addProjectTags)(tree, projectConfig);
            (0, remove_test_targets_1.updateTestTargets)(tree, projectConfig);
            // updateBaseTsconfig(tree, projectConfig)
            // updateLibraryTsconfig(tree, projectConfig)
            if (projectConfig.projectType !== 'application') {
                (0, copy_options_1.copyLibTsconfigToTsconfig)(tree, projectConfig);
            }
        }
        // updateProjectConfiguration(tree, projectName, projectConfig)
    }
    await (0, devkit_1.formatFiles)(tree);
};
exports.nxProjectConfigGenerator = nxProjectConfigGenerator;
exports.default = exports.nxProjectConfigGenerator;
//# sourceMappingURL=generator.js.map