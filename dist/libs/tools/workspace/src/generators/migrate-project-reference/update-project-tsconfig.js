"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectTsconfig = void 0;
const devkit_1 = require("@nx/devkit");
const posix_1 = require("node:path/posix");
/**
 * Calculate relative path from a project root to the workspace's tsconfig.base.json
 */
const getRelativePathToTsConfigBase = (projectRoot) => {
    const relativePathToRoot = (0, posix_1.relative)(projectRoot, devkit_1.workspaceRoot);
    return (0, posix_1.normalize)(`${relativePathToRoot}/tsconfig.base.json`);
};
/**
 * Updates the tsconfig.json files for a project to use project references
 */
const updateProjectTsconfig = (tree, projectConfig) => {
    const rootTsconfigPath = (0, devkit_1.joinPathFragments)(projectConfig.root, 'tsconfig.json');
    const libTsconfigPath = (0, devkit_1.joinPathFragments)(projectConfig.root, 'tsconfig.lib.json');
    const specTsconfigPath = (0, devkit_1.joinPathFragments)(projectConfig.root, 'tsconfig.spec.json');
    // Skip if project doesn't have a tsconfig.json
    if (!tree.exists(rootTsconfigPath)) {
        console.log(`Project ${projectConfig.name} doesn't have a tsconfig.json file`);
        return;
    }
    // Get the path to tsconfig.base.json relative to the project root
    const relativePathToTsConfigBase = getRelativePathToTsConfigBase(projectConfig.root);
    // Update the root tsconfig.json
    if (tree.exists(rootTsconfigPath)) {
        const rootTsconfig = (0, devkit_1.readJson)(tree, rootTsconfigPath);
        // Clear 'compilerOptions.paths' if it exists
        if (rootTsconfig.compilerOptions?.paths) {
            delete rootTsconfig.compilerOptions.paths;
        }
        // Ensure it extends from the root tsconfig.base.json with proper relative path
        rootTsconfig.extends = relativePathToTsConfigBase;
        // Ensure files is empty array
        rootTsconfig.files = [];
        // Keep existing references instead of clearing them
        // When references property doesn't exist, initialize it as an empty array
        if (!rootTsconfig.references) {
            rootTsconfig.references = [];
        }
        // Per Nx docs: run 'nx sync' to have Nx automatically add the correct references for each project
        // https://nx.dev/recipes/tips-n-tricks/switch-to-workspaces-project-references#update-individual-project-typescript-configuration
        (0, devkit_1.writeJson)(tree, rootTsconfigPath, rootTsconfig);
        console.log(`Updated ${rootTsconfigPath}`);
    }
    // Update tsconfig.lib.json
    if (tree.exists(libTsconfigPath)) {
        const libTsconfig = (0, devkit_1.readJson)(tree, libTsconfigPath);
        // Ensure it extends from the root tsconfig.base.json with proper relative path
        libTsconfig.extends = relativePathToTsConfigBase;
        // Ensure compilerOptions exists
        libTsconfig.compilerOptions = libTsconfig.compilerOptions || {};
        // Set outDir to be local to the project
        libTsconfig.compilerOptions.outDir = './dist';
        // Keep existing references instead of clearing them
        // When references property doesn't exist, initialize it as an empty array
        if (!libTsconfig.references) {
            libTsconfig.references = [];
        }
        // Per Nx docs: run 'nx sync' to have Nx automatically add the correct references for each project
        // https://nx.dev/recipes/tips-n-tricks/switch-to-workspaces-project-references#update-individual-project-typescript-configuration
        (0, devkit_1.writeJson)(tree, libTsconfigPath, libTsconfig);
        console.log(`Updated ${libTsconfigPath}`);
    }
    // Update tsconfig.spec.json
    if (tree.exists(specTsconfigPath)) {
        const specTsconfig = (0, devkit_1.readJson)(tree, specTsconfigPath);
        // Ensure it extends from the root tsconfig.base.json with proper relative path
        specTsconfig.extends = relativePathToTsConfigBase;
        // Ensure compilerOptions exists
        specTsconfig.compilerOptions = specTsconfig.compilerOptions || {};
        // Set outDir to be local to the project
        specTsconfig.compilerOptions.outDir = './out-tsc/spec';
        // Keep existing references instead of clearing them
        // When references property doesn't exist, initialize it as an empty array
        if (!specTsconfig.references) {
            specTsconfig.references = [];
        }
        // Add reference to tsconfig.lib.json if it doesn't exist
        const hasLibReference = specTsconfig.references.some((ref) => ref.path === './tsconfig.lib.json');
        if (!hasLibReference) {
            specTsconfig.references.push({
                path: './tsconfig.lib.json',
            });
        }
        // Per Nx docs: run 'nx sync' to have Nx automatically add the correct references for each project
        // https://nx.dev/recipes/tips-n-tricks/switch-to-workspaces-project-references#update-individual-project-typescript-configuration
        (0, devkit_1.writeJson)(tree, specTsconfigPath, specTsconfig);
        console.log(`Updated ${specTsconfigPath}`);
    }
};
exports.updateProjectTsconfig = updateProjectTsconfig;
//# sourceMappingURL=update-project-tsconfig.js.map