"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNonbuildablePackageJson = void 0;
const devkit_1 = require("@nx/devkit");
const project_imports_1 = require("../imports/project-imports");
const paths_1 = require("./paths");
const package_dev_dependencies_1 = require("./setter/package-dev-dependencies");
const package_exports_1 = require("./setter/package-exports");
const package_name_1 = require("./setter/package-name");
/**
 * Writes the package.json object to the specified path within the project root.
 */
const writeToPackageJson = (tree, projectRoot, packageJson) => {
    const packageJsonPath = (0, devkit_1.joinPathFragments)(projectRoot, 'package.json');
    console.log(`Writing updated package.json to ${packageJsonPath}`);
    (0, devkit_1.writeJson)(tree, packageJsonPath, packageJson);
};
/**
 * Creates package.json files for non-buildable projects, including dependency analysis
 */
const createNonbuildablePackageJson = (tree, projectConfig) => {
    const projectName = projectConfig.name;
    console.log(`Creating/Updating package.json for ${projectName} (non-buildable library)`);
    if (!projectName) {
        throw new Error('Project name is required');
    }
    // Read existing or create new package.json
    const packageJson = {};
    (0, package_name_1.setPackageJsonName)(packageJson, projectName);
    const allImports = (0, project_imports_1.getProjectImports)(tree, projectConfig);
    console.log(`Found ${allImports.length} potential @codelab imports in ${projectName}`);
    const baseImportPaths = (0, paths_1.getBaseImportPaths)(allImports);
    console.log(`Found ${baseImportPaths.length} unique base @codelab dependencies to add.`);
    const relativeExports = (0, paths_1.getRelativeExports)(allImports, baseImportPaths);
    console.log('Generated Exports Map:', JSON.stringify(relativeExports, null, 2));
    (0, package_exports_1.setPackageJsonExports)(packageJson, relativeExports);
    (0, package_dev_dependencies_1.setDevDependencies)(packageJson, baseImportPaths);
    writeToPackageJson(tree, projectConfig.root, packageJson);
};
exports.createNonbuildablePackageJson = createNonbuildablePackageJson;
//# sourceMappingURL=create-nonbuildable-package-json.js.map