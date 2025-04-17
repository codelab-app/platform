"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageJsonNameFromMapping = exports.getPackageJsonNameFromProjectName = void 0;
const workspace_1 = require("../utils/workspace");
/**
 * Gets npm package name from the project mapping
 * Throws an error if the mapping file doesn't exist or if the project is not found in the mapping
 */
const getPackageJsonNameFromProjectName = (projectName) => {
    const slashCount = (projectName.match(/\//g) || []).length;
    if (slashCount > 1) {
        throw new Error(`Project name "${projectName}" contains multiple slashes. Only one slash is allowed.`);
    }
    return `@codelab/${projectName}`;
};
exports.getPackageJsonNameFromProjectName = getPackageJsonNameFromProjectName;
/**
 * Gets npm package name from the project mapping
 * Throws an error if the mapping file doesn't exist or if the project is not found in the mapping
 */
const getPackageJsonNameFromMapping = (tree, projectName) => {
    // Get project mapping
    const aliasMap = (0, workspace_1.createAliasMapping)(tree);
    // Find the entry where the project name matches
    for (const [key, value] of Object.entries(aliasMap)) {
        if (key === projectName) {
            return value.alias;
        }
    }
    throw new Error(`Project ${projectName} not found in mapping`);
};
exports.getPackageJsonNameFromMapping = getPackageJsonNameFromMapping;
//# sourceMappingURL=utils.js.map