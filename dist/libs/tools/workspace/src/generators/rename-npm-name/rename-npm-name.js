"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const devkit_1 = require("@nx/devkit");
const process_all_projects_1 = require("../utils/process-all-projects");
const imports_1 = require("./imports");
const path_alias_1 = require("./path-alias/path-alias");
const renameNpmName = async (tree, projectName, projectConfig) => {
    console.log(`Renaming npm name for project: ${projectName}`);
    console.log(`  Source root: ${projectConfig.sourceRoot}`);
    // Update all import paths in the project
    (0, imports_1.updateProjectImports)(tree, projectConfig, (importPath) => {
        const transformedPath = (0, path_alias_1.getPackageNameFromOldAlias)(importPath);
        if (transformedPath !== importPath) {
            console.log(`  Transform: ${importPath} -> ${transformedPath}`);
        }
        return transformedPath;
    });
};
const updateTsConfigPaths = (tree) => {
    console.log('\nUpdating tsconfig.base.json paths...');
    (0, devkit_1.updateJson)(tree, 'tsconfig.base.json', (json) => {
        const paths = json.compilerOptions?.paths || {};
        const updatedPaths = {};
        let updatedCount = 0;
        for (const [oldPath, pathValues] of Object.entries(paths)) {
            const newPath = (0, path_alias_1.getPackageNameFromOldAlias)(oldPath);
            if (newPath !== oldPath) {
                updatedCount++;
                console.log(`  Updating path: ${oldPath} -> ${newPath}`);
            }
            updatedPaths[newPath] = pathValues;
        }
        json.compilerOptions.paths = updatedPaths;
        console.log(`Updated ${updatedCount} path mappings in tsconfig.base.json`);
        return json;
    });
};
const renameNpmNameGenerator = async (tree) => {
    console.log('Starting npm name rename for all projects...');
    await (0, process_all_projects_1.processAllProjects)(tree, renameNpmName);
    // Update tsconfig.base.json paths
    updateTsConfigPaths(tree);
    console.log('\nNpm name rename completed for all projects and tsconfig.base.json!');
};
exports.default = renameNpmNameGenerator;
//# sourceMappingURL=rename-npm-name.js.map