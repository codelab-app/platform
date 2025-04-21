"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateToInferred = exports.removeTargetsFromNx = void 0;
const devkit_1 = require("@nx/devkit");
const path_1 = require("path");
/**
 * Removes the 'targets' property from the 'nx' object in package.json
 * @param tree - The file system tree.
 * @param packageJsonPath - Path to the package.json file.
 */
const removeTargetsFromNx = (tree, packageJsonPath) => {
    if (!tree.exists(packageJsonPath)) {
        console.warn(`No package.json found at ${packageJsonPath}`);
        return;
    }
    const packageJson = (0, devkit_1.readJson)(tree, packageJsonPath);
    if (packageJson.nx && packageJson.nx.targets) {
        // Create a new nx object without the targets property
        const { targets, ...restOfNx } = packageJson.nx;
        // If restOfNx is empty after removing targets, delete the entire nx property
        if (Object.keys(restOfNx).length === 0) {
            delete packageJson.nx;
        }
        else {
            packageJson.nx = restOfNx;
        }
        (0, devkit_1.writeJson)(tree, packageJsonPath, packageJson);
        console.log(`Removed 'targets' from nx in ${packageJsonPath}`);
    }
    else {
        console.log(`No 'targets' found in nx property at ${packageJsonPath}`);
    }
};
exports.removeTargetsFromNx = removeTargetsFromNx;
/**
 * Migrates project configuration specifics (name, projectType, sourceRoot, tags)
 * from project.json to the 'nx' property within package.json for inferred configuration.
 * Also removes 'targets' property from the 'nx' object if it exists.
 * This function is idempotent and can be safely run multiple times.
 * @param tree - The file system tree.
 * @param projectConfig - The configuration of the project to migrate.
 */
const migrateToInferred = async (tree, projectConfig) => {
    console.log('Migrating to inferred configuration!!!');
    // Ensure project name exists before proceeding
    if (!projectConfig.name) {
        console.warn(`Skipping migration for project with missing name at root: ${projectConfig.root}`);
        return;
    }
    const packageJsonPath = (0, path_1.join)(projectConfig.root, 'package.json');
    if (!tree.exists(packageJsonPath)) {
        console.warn(`Skipping migration for ${projectConfig.name}: package.json not found at ${packageJsonPath}`);
        return;
    }
    const packageJson = (0, devkit_1.readJson)(tree, packageJsonPath);
    console.log('packageJson', packageJson);
    // Safely remove the 'targets' property from 'nx' if it exists
    if (packageJson.nx && packageJson.nx.targets) {
        // Create a new nx object without the targets property
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { targets, ...restOfNx } = packageJson.nx;
        // If restOfNx is empty after removing targets, delete the entire nx property
        if (Object.keys(restOfNx).length === 0) {
            delete packageJson.nx;
        }
        else {
            packageJson.nx = restOfNx;
        }
        console.log(`Removed 'targets' from nx in ${packageJsonPath}`);
    }
    else {
        console.log(`No 'targets' found in nx property at ${packageJsonPath}`);
    }
    console.log('removed', packageJson);
    (0, devkit_1.writeJson)(tree, packageJsonPath, packageJson);
    console.log(`Migrated nx configuration to package.json for ${projectConfig.name}`);
};
exports.migrateToInferred = migrateToInferred;
//# sourceMappingURL=migrate-to-inferred.js.map