"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageJsonNameFromMapping = exports.convertToNpmPackageName = exports.getPackageJsonNameFromProjectName = void 0;
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
const convertToNpmPackageName = (projectName) => {
    // If the path already starts with @codelab-codegen, return it as is
    if (projectName.startsWith('@codelab-codegen/')) {
        return projectName;
    }
    // For paths that match the pattern @codelab/frontend-application-*/... with segments after /src/
    // These are paths that point to directories under src/ and should maintain their slash structure
    if (projectName.match(/@codelab\/frontend-application-[^/]+\/[^/]+/)) {
        return projectName;
    }
    // For paths in the format @codelab/backend-infra-adapter/something
    // These should be transformed to @codelab/backend-infra-adapter-something
    if (projectName.match(/@codelab\/[^/]+-[^/]+-[^/]+\/[^/]+/)) {
        const parts = projectName.split('/');
        const prefix = parts[0] + '/' + parts[1];
        const suffix = parts.slice(2).join('-');
        return `${prefix}-${suffix}`;
    }
    // Standard @codelab/ paths with multiple slashes should convert all slashes to hyphens
    if (projectName.startsWith('@codelab/') && projectName.includes('/')) {
        const withoutPrefix = projectName.replace('@codelab/', '');
        return `@codelab/${withoutPrefix.replace(/\//g, '-')}`;
    }
    // For simple paths that include a single slash but don't match above patterns
    if (projectName.includes('/') && !projectName.startsWith('@')) {
        return projectName.replace('/', '-');
    }
    // Return the original name for anything else
    return projectName;
};
exports.convertToNpmPackageName = convertToNpmPackageName;
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