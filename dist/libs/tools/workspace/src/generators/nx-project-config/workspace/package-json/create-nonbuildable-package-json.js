"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeToPackageJson = exports.createNonbuildablePackageJson = void 0;
const devkit_1 = require("@nx/devkit");
const project_imports_1 = require("../imports/project-imports");
const path_alias_1 = require("../path-alias/path-alias");
const relative_exports_1 = require("./exports/relative-exports");
const paths_1 = require("./paths");
const package_dev_dependencies_1 = require("./setter/package-dev-dependencies");
const package_exports_1 = require("./setter/package-exports");
const package_name_1 = require("./setter/package-name");
/**
 * Creates package.json files for non-buildable projects, including dependency analysis
 */
const createNonbuildablePackageJson = (tree, projectConfig) => {
    const projectName = projectConfig.name;
    console.log(`Creating/Updating package.json for ${projectName} (non-buildable library)`);
    if (!projectName) {
        throw new Error('Project name is required');
    }
    const packageJsonPath = (0, devkit_1.joinPathFragments)(projectConfig.root, 'package.json');
    console.log(`Checking if path exists: ${packageJsonPath}`);
    if (tree.exists(packageJsonPath)) {
        console.log(`Package.json already exists for ${projectName}`);
        return;
    }
    const packageJson = {};
    const packageName = (0, path_alias_1.getPackageNameFromProjectName)(projectName);
    (0, package_name_1.setPackageJsonName)(packageJson, projectName);
    // Get transformed imports
    console.log('Getting project imports');
    const allImports = (0, project_imports_1.getProjectImports)(tree, projectConfig).map((importPath) => (0, path_alias_1.getPackageNameFromOldAlias)(importPath));
    console.log(`Found ${allImports.length} potential @codelab imports in ${projectName}`);
    const baseImportPaths = (0, paths_1.getBaseImportPaths)(allImports);
    console.log(`Found ${baseImportPaths.length} unique base @codelab dependencies to add.`);
    // Save import data
    // saveImportData(tree, projectConfig.root, allImports, baseImportPaths)
    const relativeExports = (0, relative_exports_1.getRelativeExports)(packageName);
    console.log('Generated Exports Map:', JSON.stringify(relativeExports, null, 2));
    (0, package_exports_1.setPackageJsonExports)(packageJson, relativeExports);
    (0, package_dev_dependencies_1.setDevDependencies)(packageJson, baseImportPaths);
    (0, exports.writeToPackageJson)(tree, projectConfig.root, packageJson);
};
exports.createNonbuildablePackageJson = createNonbuildablePackageJson;
/**
 * Writes the package.json object to the specified path within the project root.
 */
const writeToPackageJson = (tree, projectRoot, packageJson) => {
    const packageJsonPath = (0, devkit_1.joinPathFragments)(projectRoot, 'package.json');
    console.log(`Writing updated package.json to ${packageJsonPath}`);
    (0, devkit_1.writeJson)(tree, packageJsonPath, packageJson);
};
exports.writeToPackageJson = writeToPackageJson;
//# sourceMappingURL=create-nonbuildable-package-json.js.map