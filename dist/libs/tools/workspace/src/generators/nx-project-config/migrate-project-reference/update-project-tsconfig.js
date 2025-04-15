"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectTsconfig = void 0;
const devkit_1 = require("@nx/devkit");
const get_project_dependencies_1 = require("./get-project-dependencies");
/**
 * Updates the tsconfig.json files for a project to use project references
 */
const updateProjectTsconfig = async (tree, projectConfig) => {
    const rootTsconfigPath = (0, devkit_1.joinPathFragments)(projectConfig.root, 'tsconfig.json');
    const libTsconfigPath = (0, devkit_1.joinPathFragments)(projectConfig.root, 'tsconfig.lib.json');
    const specTsconfigPath = (0, devkit_1.joinPathFragments)(projectConfig.root, 'tsconfig.spec.json');
    // Skip if project doesn't have a tsconfig.json
    if (!tree.exists(rootTsconfigPath)) {
        console.log(`Project ${projectConfig.name} doesn't have a tsconfig.json file`);
        return;
    }
    // Get project dependencies
    const dependencies = await (0, get_project_dependencies_1.getProjectDependencies)(tree, projectConfig);
    // Update the root tsconfig.json
    if (tree.exists(rootTsconfigPath)) {
        const rootTsconfig = (0, devkit_1.readJson)(tree, rootTsconfigPath);
        // Clear 'compilerOptions.paths' if it exists
        if (rootTsconfig.compilerOptions?.paths) {
            delete rootTsconfig.compilerOptions.paths;
        }
        // Ensure it extends from the root tsconfig.base.json
        rootTsconfig.extends = '../../tsconfig.base.json';
        // Ensure files is empty array
        rootTsconfig.files = [];
        // Update references
        rootTsconfig.references = [
            ...dependencies.map((dep) => ({ path: (0, devkit_1.normalizePath)(dep) })),
        ];
        // Add references to the project's other tsconfig files
        if (tree.exists(libTsconfigPath)) {
            rootTsconfig.references.push({ path: './tsconfig.lib.json' });
        }
        if (tree.exists(specTsconfigPath)) {
            rootTsconfig.references.push({ path: './tsconfig.spec.json' });
        }
        (0, devkit_1.writeJson)(tree, rootTsconfigPath, rootTsconfig);
        console.log(`Updated ${rootTsconfigPath}`);
    }
    // Update tsconfig.lib.json
    if (tree.exists(libTsconfigPath)) {
        const libTsconfig = (0, devkit_1.readJson)(tree, libTsconfigPath);
        // Ensure it extends from the root tsconfig.base.json
        libTsconfig.extends = '../../tsconfig.base.json';
        // Ensure compilerOptions exists
        libTsconfig.compilerOptions = libTsconfig.compilerOptions || {};
        // Set outDir to be local to the project
        libTsconfig.compilerOptions.outDir = './out-tsc/lib';
        // Set composite and declaration to true
        libTsconfig.compilerOptions.composite = true;
        libTsconfig.compilerOptions.declaration = true;
        // Update references to include project dependencies' tsconfig.lib.json files
        libTsconfig.references = dependencies.map((dep) => ({
            path: (0, devkit_1.normalizePath)(`${dep}/tsconfig.lib.json`),
        }));
        (0, devkit_1.writeJson)(tree, libTsconfigPath, libTsconfig);
        console.log(`Updated ${libTsconfigPath}`);
    }
    // Update tsconfig.spec.json
    if (tree.exists(specTsconfigPath)) {
        const specTsconfig = (0, devkit_1.readJson)(tree, specTsconfigPath);
        // Ensure it extends from the root tsconfig.base.json
        specTsconfig.extends = '../../tsconfig.base.json';
        // Ensure compilerOptions exists
        specTsconfig.compilerOptions = specTsconfig.compilerOptions || {};
        // Set outDir to be local to the project
        specTsconfig.compilerOptions.outDir = './out-tsc/spec';
        // Reference only this project's tsconfig.lib.json
        specTsconfig.references = [{ path: './tsconfig.lib.json' }];
        (0, devkit_1.writeJson)(tree, specTsconfigPath, specTsconfig);
        console.log(`Updated ${specTsconfigPath}`);
    }
};
exports.updateProjectTsconfig = updateProjectTsconfig;
//# sourceMappingURL=update-project-tsconfig.js.map