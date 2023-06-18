"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nxProjectConfigGenerator = void 0;
const tslib_1 = require("tslib");
const devkit_1 = require("@nx/devkit");
const update_project_config_1 = require("./update-project-config");
/**
 * Go through all projects and update the `lint` setting of `project.json`
 */
const nxProjectConfigGenerator = (tree, options) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const projects = (0, devkit_1.getProjects)(tree);
    const projectNames = projects.keys();
    for (const projectName of projectNames) {
        (0, update_project_config_1.updateProjectConfig)(tree, projectName);
    }
    // const projectRoot = `libs/${options.name}`
    // addProjectConfiguration(tree, options.name, {
    //   projectType: 'library',
    //   root: projectRoot,
    //   sourceRoot: `${projectRoot}/src`,
    //   targets: {},
    // })
    // generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options)
    yield (0, devkit_1.formatFiles)(tree);
});
exports.nxProjectConfigGenerator = nxProjectConfigGenerator;
exports.default = exports.nxProjectConfigGenerator;
//# sourceMappingURL=generator.js.map