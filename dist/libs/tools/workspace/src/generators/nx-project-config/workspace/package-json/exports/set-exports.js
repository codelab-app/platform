"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setExports = exports.sortExports = void 0;
const devkit_1 = require("@nx/devkit");
const path_alias_1 = require("../../path-alias/path-alias");
const package_exports_1 = require("../setter/package-exports");
const relative_exports_1 = require("./relative-exports");
/**
 * Sorts the third level properties in exports to follow the order: import, types, default
 */
const sortExports = (tree, projectConfig) => {
    const projectName = projectConfig.name;
    const packageJsonPath = (0, devkit_1.joinPathFragments)(projectConfig.root, 'package.json');
    console.log(`Sorting exports for ${projectName}`);
    if (!tree.exists(packageJsonPath)) {
        console.log(`Package.json not found for ${projectName}`);
        return;
    }
    const packageJson = (0, devkit_1.readJson)(tree, packageJsonPath);
    // Process each second-level key (e.g., ".", "./components")
    const exports = packageJson.exports;
    // Check if exports exists before processing
    if (!exports) {
        console.log(`No exports found for ${projectName}`);
        return;
    }
    // Create a new sorted exports object
    const sortedExports = {};
    Object.keys(exports).forEach((exportKey) => {
        const exportObj = exports[exportKey];
        if (typeof exportObj === 'object' && exportObj !== null) {
            // Create a new object with the desired order
            sortedExports[exportKey] = {
                ...(exportObj.import && { import: exportObj.import }),
                ...(exportObj.types && { types: exportObj.types }),
                ...(exportObj.default && { default: exportObj.default }),
            };
        }
        else {
            // If it's not an object, keep it as is
            sortedExports[exportKey] = exportObj;
        }
    });
    // Replace the original exports with the sorted one
    packageJson.exports = sortedExports;
    // Write the updated package.json back to file
    (0, devkit_1.writeJson)(tree, packageJsonPath, packageJson);
};
exports.sortExports = sortExports;
const setExports = (tree, projectConfig) => {
    const projectName = projectConfig.name;
    const packageJsonPath = (0, devkit_1.joinPathFragments)(projectConfig.root, 'package.json');
    console.log(`Setting exports for ${projectName}`);
    if (!projectName) {
        throw new Error('Project name is required');
    }
    const packageName = (0, path_alias_1.getPackageNameFromProjectName)(projectName);
    const relativeExports = (0, relative_exports_1.getRelativeExports)(packageName);
    const packageJson = (0, devkit_1.readJson)(tree, packageJsonPath);
    console.log('exports', relativeExports);
    (0, package_exports_1.setPackageJsonExports)(packageJson, relativeExports);
    (0, devkit_1.writeJson)(tree, packageJsonPath, packageJson);
};
exports.setExports = setExports;
//# sourceMappingURL=set-exports.js.map