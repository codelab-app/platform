"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDevDependencies = void 0;
/**
 * Updates the devDependencies field in a package.json object.
 *
 * @param packageJson - The package.json object to modify.
 * @param baseImportPaths - An array of unique base import paths to add as dependencies.
 */
const setDevDependencies = (packageJson, baseImportPaths) => {
    // Ensure devDependencies exists
    packageJson.devDependencies = packageJson.devDependencies || {};
    console.log('Updating devDependencies...');
    // Add each unique base import path as a devDependency
    for (const basePath of baseImportPaths) {
        if (!packageJson.devDependencies[basePath]) {
            packageJson.devDependencies[basePath] = 'workspace:*';
            console.log(`Added ${basePath}@workspace:* to devDependencies`);
        }
        else {
            console.log(`Dependency ${basePath} already exists in devDependencies.`);
        }
    }
    console.log('Finished updating devDependencies.');
};
exports.setDevDependencies = setDevDependencies;
//# sourceMappingURL=package-dev-dependencies.js.map