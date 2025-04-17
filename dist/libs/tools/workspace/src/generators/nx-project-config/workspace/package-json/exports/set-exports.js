"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setExports = void 0;
const devkit_1 = require("@nx/devkit");
const project_imports_1 = require("../../imports/project-imports");
const path_alias_1 = require("../../path-alias/path-alias");
const paths_1 = require("../paths");
const package_exports_1 = require("../setter/package-exports");
const relative_exports_1 = require("./relative-exports");
const setExports = (tree, projectConfig) => {
    const projectName = projectConfig.name;
    console.log(`Setting exports for ${projectName}`);
    if (!projectName) {
        throw new Error('Project name is required');
    }
    const allImports = (0, project_imports_1.getProjectImports)(tree, projectConfig).map((importPath) => (0, path_alias_1.getPackageNameFromOldAlias)(importPath));
    const baseImportPaths = (0, paths_1.getBaseImportPaths)(allImports);
    const packageName = (0, path_alias_1.getPackageNameFromProjectName)(projectName);
    const relativeExports = (0, relative_exports_1.getRelativeExports)(allImports, baseImportPaths, packageName);
    const packageJson = (0, devkit_1.readJson)(tree, (0, devkit_1.joinPathFragments)(projectConfig.root, 'package.json'));
    (0, package_exports_1.setPackageJsonExports)(packageJson, relativeExports);
};
exports.setExports = setExports;
//# sourceMappingURL=set-exports.js.map