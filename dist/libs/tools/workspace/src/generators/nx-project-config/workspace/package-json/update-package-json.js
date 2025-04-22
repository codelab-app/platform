"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePackageJson = void 0;
const devkit_1 = require("@nx/devkit");
const set_exports_1 = require("./exports/set-exports");
const updatePackageJson = (tree, projectConfig) => {
    const projectName = projectConfig.name;
    console.log(`Updating package.json for ${projectName}`);
    const packageJsonPath = (0, devkit_1.joinPathFragments)(projectConfig.root, 'package.json');
    console.log(`Checking if path exists: ${packageJsonPath}`);
    if (!tree.exists(packageJsonPath)) {
        console.log(`Package.json not found for ${projectName}`);
        return;
    }
    (0, set_exports_1.setExports)(tree, projectConfig);
    // sortExports(tree, projectConfig)
    // const packageJson = readJson(
    //   tree,
    //   joinPathFragments(projectConfig.root, 'package.json'),
    // )
    // writeToPackageJson(tree, projectConfig.root, packageJson)
};
exports.updatePackageJson = updatePackageJson;
//# sourceMappingURL=update-package-json.js.map