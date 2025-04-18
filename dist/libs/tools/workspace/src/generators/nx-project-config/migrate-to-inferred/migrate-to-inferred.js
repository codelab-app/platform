"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateToInferred = void 0;
const devkit_1 = require("@nx/devkit");
const path_1 = require("path");
/**
 * Migrates project configuration specifics (name, projectType, sourceRoot, tags)
 * from project.json to the 'nx' property within package.json for inferred configuration.
 * @param tree - The file system tree.
 * @param projectConfig - The configuration of the project to migrate.
 */
const migrateToInferred = async (tree, projectConfig) => {
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
    packageJson.nx = {
        name: projectConfig.name,
        projectType: projectConfig.projectType,
        sourceRoot: projectConfig.sourceRoot,
        tags: projectConfig.tags ?? [],
    };
    (0, devkit_1.writeJson)(tree, packageJsonPath, packageJson);
    // Delete the original project.json file
    const projectJsonPath = (0, path_1.join)(projectConfig.root, 'project.json');
    if (tree.exists(projectJsonPath)) {
        tree.delete(projectJsonPath);
        console.log(`Deleted original project.json for ${projectConfig.name}`);
    }
    else {
        console.warn(`Could not find project.json to delete for ${projectConfig.name} at ${projectJsonPath}`);
    }
    // Optional removal comments are no longer relevant as project.json is deleted
    // // Optional: Remove these properties from project.json if desired,
    // // although Nx inference might make this unnecessary depending on plugin configuration.
    // // delete projectConfig.name; // Name might still be needed in project.json depending on setup
    // // delete projectConfig.projectType;
    // // delete projectConfig.sourceRoot;
    // // delete projectConfig.tags;
    // // updateProjectConfiguration(tree, projectConfig.name!, projectConfig); // Be cautious if removing name
    console.log(`Migrated nx configuration to package.json for ${projectConfig.name}`);
};
exports.migrateToInferred = migrateToInferred;
//# sourceMappingURL=migrate-to-inferred.js.map