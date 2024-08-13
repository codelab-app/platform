"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nxProjectConfigGenerator = void 0;
const devkit_1 = require("@nx/devkit");
const remove_graphql_eslint_config_1 = require("./eslint/remove-graphql-eslint-config");
const add_project_tags_1 = require("./project-tags/add-project-tags");
const project_json_1 = require("./test/project-json");
const tsconfig_base_1 = require("./tsconfig-base/tsconfig.base");
const tsconfig_lib_1 = require("./tsconfig-lib/tsconfig.lib");
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
         * Add the lint pattern to nx.json instead
         */
        // addGraphqlEslintConfig(tree, projectConfig)
        // addGraphqlExtension(tree, projectConfig)
        (0, remove_graphql_eslint_config_1.removeGraphqlEslintConfig)(tree, projectConfig);
        (0, project_json_1.updateTestConfig)(tree, projectConfig);
        (0, add_project_tags_1.addProjectTags)(tree, projectConfig);
        (0, tsconfig_base_1.updateBaseTsconfig)(tree, projectConfig);
        (0, tsconfig_lib_1.updateLibraryTsconfig)(tree, projectConfig);
        (0, devkit_1.updateProjectConfiguration)(tree, projectName, projectConfig);
    }
    // const projectRoot = `libs/${options.name}`
    // addProjectConfiguration(tree, options.name, {
    //   projectType: 'library',
    //   root: projectRoot,
    //   sourceRoot: `${projectRoot}/src`,
    //   targets: {},
    // })
    // generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options)
    await (0, devkit_1.formatFiles)(tree);
};
exports.nxProjectConfigGenerator = nxProjectConfigGenerator;
exports.default = exports.nxProjectConfigGenerator;
//# sourceMappingURL=generator.js.map