"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNonbuildablePackageJson = void 0;
const devkit_1 = require("@nx/devkit");
const package_name_1 = require("../path-alias/package-name");
/**
 * Creates package.json files for non-buildable projects
 */
const createNonbuildablePackageJson = (tree, projectConfig) => {
    // Skip if project already has a package.json
    const packageJsonPath = (0, devkit_1.joinPathFragments)(projectConfig.root, 'package.json');
    if (tree.exists(packageJsonPath)) {
        console.log(`Project ${projectConfig.name} already has a package.json file`);
        return;
    }
    const projectName = projectConfig.name;
    console.log(`Creating package.json for ${projectName} (non-buildable library)`);
    if (!projectName) {
        throw new Error('Project name is required');
    }
    // Get the npm package name from the mapping
    const packageName = (0, package_name_1.convertToPackageName)(projectName);
    // Create the package.json content for non-buildable library
    const packageJson = {
        name: packageName,
        // eslint-disable-next-line canonical/sort-keys
        exports: {
            '.': {
                default: './src/index.ts',
                import: './src/index.ts',
                types: './src/index.ts',
            },
        },
    };
    // Write the package.json file
    (0, devkit_1.writeJson)(tree, packageJsonPath, packageJson);
    console.log(`Created package.json for ${projectName}`);
};
exports.createNonbuildablePackageJson = createNonbuildablePackageJson;
//# sourceMappingURL=create-nonbuildable-package-json.js.map