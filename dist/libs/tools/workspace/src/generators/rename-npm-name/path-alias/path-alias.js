"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageNameFromOldAlias = exports.getPackageNameFromProjectName = exports.getProjectReferencePaths = void 0;
const tslib_1 = require("tslib");
const path_alias_json_1 = tslib_1.__importDefault(require("./path-alias.json"));
/**
 * Returns the refactored paths
 */
const getProjectReferencePaths = () => {
    return Object.values(path_alias_json_1.default).map((details) => details.expected);
};
exports.getProjectReferencePaths = getProjectReferencePaths;
/**
 * Gets the package path alias when given a project name
 * @param projectName The name of the project
 * @returns The corresponding package path alias
 * @throws Error if project name is not found in the path alias map
 */
const getPackageNameFromProjectName = (projectName) => {
    for (const [alias, details] of Object.entries(path_alias_json_1.default)) {
        if (details.name === projectName) {
            // Return the expected alias
            return details.expected;
        }
    }
    // If the loop completes without finding a match, throw an error
    console.log(`Project name "${projectName}" not found in path alias map`);
    return projectName;
};
exports.getPackageNameFromProjectName = getPackageNameFromProjectName;
/**
 * The old alias could contain nested subpaths, so we want to be able to remove that before testing for the base package name
 *
 * @param oldAlias Could have subpath included
 */
const getPackageNameFromOldAlias = (oldAlias) => {
    // First check if it's in the map
    for (const [alias, details] of Object.entries(path_alias_json_1.default)) {
        if (oldAlias.startsWith(alias)) {
            // Extract the subpath (everything after the base alias)
            const subpath = oldAlias.slice(alias.length);
            // Return the expected alias + any subpath
            return details.expected + subpath;
        }
    }
    // If no match found and it starts with @codelab, throw error
    if (oldAlias.startsWith('@codelab')) {
        throw new Error(`Alias "${oldAlias}" not found in path alias map`);
    }
    return oldAlias;
};
exports.getPackageNameFromOldAlias = getPackageNameFromOldAlias;
//# sourceMappingURL=path-alias.js.map