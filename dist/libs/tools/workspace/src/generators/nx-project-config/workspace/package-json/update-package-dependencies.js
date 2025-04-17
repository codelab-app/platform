"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePackageDependencies = void 0;
const devkit_1 = require("@nx/devkit");
const project_imports_1 = require("../imports/project-imports");
/**
 * Updates the app to include dependencies to libraries
 */
const updatePackageDependencies = (tree, projectConfig) => {
    console.log('Updating app dependencies');
    const packageJsonPath = (0, devkit_1.joinPathFragments)(projectConfig.root, 'package.json');
    if (!tree.exists(packageJsonPath)) {
        console.log('No package.json found');
        return;
    }
    if (!projectConfig.name) {
        throw new Error('Project name is required');
    }
    console.log(`Analyzing and updating dependencies in ${packageJsonPath}`);
    const packageJson = (0, devkit_1.readJson)(tree, packageJsonPath);
    // Here we want to read each file in this library
    const imports = (0, project_imports_1.getProjectImports)(tree, projectConfig);
    console.log(`Found ${imports.length} @codelab imports in ${projectConfig.name}`);
    console.log('Imports:', JSON.stringify(imports, null, 2));
    // Ensure devDependencies exists
    packageJson.devDependencies = packageJson.devDependencies || {};
    (0, devkit_1.writeJson)(tree, packageJsonPath, packageJson);
    console.log(`Updated dependencies in ${packageJsonPath}`);
};
exports.updatePackageDependencies = updatePackageDependencies;
//# sourceMappingURL=update-package-dependencies.js.map