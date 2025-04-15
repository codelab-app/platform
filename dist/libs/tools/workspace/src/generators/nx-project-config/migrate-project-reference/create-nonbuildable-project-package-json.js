"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNonbuildableProjectPackageJson = void 0;
const devkit_1 = require("@nx/devkit");
/**
 * Creates package.json files for non-buildable projects
 */
const createNonbuildableProjectPackageJson = (tree, projectConfig) => {
    // Skip if project already has a package.json
    const packageJsonPath = (0, devkit_1.joinPathFragments)(projectConfig.root, 'package.json');
    if (tree.exists(packageJsonPath)) {
        console.log(`Project ${projectConfig.name} already has a package.json file`);
        return;
    }
    const projectName = projectConfig.name;
    console.log(`Creating package.json for ${projectName} (non-buildable library)`);
    // Create the package.json content for non-buildable library
    const packageJson = {
        name: projectName,
        exports: {
            '.': {
                types: './src/index.ts',
                import: './src/index.ts',
                default: './src/index.ts',
            },
        },
    };
    // Write the package.json file
    (0, devkit_1.writeJson)(tree, packageJsonPath, packageJson);
    console.log(`Created package.json for ${projectName}`);
};
exports.createNonbuildableProjectPackageJson = createNonbuildableProjectPackageJson;
//# sourceMappingURL=create-nonbuildable-project-package-json.js.map