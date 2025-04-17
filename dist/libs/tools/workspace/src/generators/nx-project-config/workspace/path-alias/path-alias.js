"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageNameFromProjectName = void 0;
const tslib_1 = require("tslib");
const path_alias_json_1 = tslib_1.__importDefault(require("./path-alias.json"));
/**
 * Gets the package path alias when given a project name
 * @param projectName The name of the project
 * @returns The corresponding package path alias
 * @throws Error if project name is not found in the path alias map
 */
const getPackageNameFromProjectName = (projectName) => {
    const pathAliasMapData = path_alias_json_1.default;
    for (const [alias, details] of Object.entries(pathAliasMapData)) {
        if (details.name === projectName) {
            // Return the expected alias
            return details.expected;
        }
    }
    // If the loop completes without finding a match, throw an error
    throw new Error(`Project name "${projectName}" not found in path alias map`);
};
exports.getPackageNameFromProjectName = getPackageNameFromProjectName;
//# sourceMappingURL=path-alias.js.map