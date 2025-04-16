"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAppDependencies = void 0;
const devkit_1 = require("@nx/devkit");
/**
 * Updates the app to include dependencies to libraries
 */
const updateAppDependencies = (tree, projectConfig) => {
    // Only update for app projects (not libraries)
    if (projectConfig.projectType !== 'application') {
        return;
    }
    const packageJsonPath = (0, devkit_1.joinPathFragments)(projectConfig.root, 'package.json');
    if (!tree.exists(packageJsonPath)) {
        return;
    }
    console.log(`Updating dependencies in ${packageJsonPath}`);
    const packageJson = (0, devkit_1.readJson)(tree, packageJsonPath);
    // Ensure devDependencies exists
    packageJson.devDependencies = packageJson.devDependencies || {};
    // Add workspace libraries as devDependencies with * version
    const projects = (0, devkit_1.getProjects)(tree);
    for (const [projectName, project] of projects.entries()) {
        // Skip applications and the current project
        if (project.projectType === 'application' ||
            projectName === projectConfig.name) {
            continue;
        }
        // Add the library to devDependencies
        packageJson.devDependencies[projectName] = '*';
    }
    (0, devkit_1.writeJson)(tree, packageJsonPath, packageJson);
    console.log(`Updated dependencies in ${packageJsonPath}`);
};
exports.updateAppDependencies = updateAppDependencies;
//# sourceMappingURL=update-app-dependencies.js.map