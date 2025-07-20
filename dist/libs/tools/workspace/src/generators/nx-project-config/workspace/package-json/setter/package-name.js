"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPackageJsonName = void 0;
const path_alias_1 = require("../../../../rename-npm-name/path-alias/path-alias");
/**
 * Sets the name property in a package.json object based on the project name.
 *
 * @param packageJson - The package.json object to modify.
 * @param projectName - The name of the project.
 */
const setPackageJsonName = (packageJson, projectName) => {
    if (!projectName) {
        throw new Error('Project name is required for setting package name');
    }
    const packageName = (0, path_alias_1.getPackageNameFromProjectName)(projectName);
    packageJson.name = packageName;
    console.log(`Set package.json name to: ${packageName}`);
};
exports.setPackageJsonName = setPackageJsonName;
//# sourceMappingURL=package-name.js.map