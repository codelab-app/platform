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
    const entry = Object.entries(path_alias_json_1.default).find(([_, value]) => value.name === projectName);
    if (!entry) {
        throw new Error(`Project name "${projectName}" not found in path alias map`);
    }
    return entry[0];
};
exports.getPackageNameFromProjectName = getPackageNameFromProjectName;
//# sourceMappingURL=path-alias.js.map