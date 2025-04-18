"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setExports = void 0;
const devkit_1 = require("@nx/devkit");
const path_alias_1 = require("../../path-alias/path-alias");
const package_exports_1 = require("../setter/package-exports");
const relative_exports_1 = require("./relative-exports");
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