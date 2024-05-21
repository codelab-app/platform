"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nxProjectConfigGenerator = void 0;
const devkit_1 = require("@nx/devkit");
const update_project_config_1 = require("./update-project-config");
/**
 * Go through all projects and update the `lint` setting of `project.json`
 */
const nxProjectConfigGenerator = async (tree, options) => {
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
    await (0, devkit_1.formatFiles)(tree);
};
exports.nxProjectConfigGenerator = nxProjectConfigGenerator;
exports.default = exports.nxProjectConfigGenerator;
//# sourceMappingURL=generator.js.map