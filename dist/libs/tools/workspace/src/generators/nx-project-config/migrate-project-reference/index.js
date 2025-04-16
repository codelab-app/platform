"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateProjectReference = exports.updateProjectTsconfig = exports.updatePackageDependencies = exports.getProjectDependencies = exports.createNonbuildableProjectPackageJson = void 0;
// Import the functions from the separate files
const create_nonbuildable_project_package_json_1 = require("./create-nonbuildable-project-package-json");
const update_app_dependencies_1 = require("./update-app-dependencies");
const update_project_tsconfig_1 = require("./update-project-tsconfig");
// Re-export the functions
var create_nonbuildable_project_package_json_2 = require("./create-nonbuildable-project-package-json");
Object.defineProperty(exports, "createNonbuildableProjectPackageJson", { enumerable: true, get: function () { return create_nonbuildable_project_package_json_2.createNonbuildableProjectPackageJson; } });
var get_project_dependencies_1 = require("./get-project-dependencies");
Object.defineProperty(exports, "getProjectDependencies", { enumerable: true, get: function () { return get_project_dependencies_1.getProjectDependencies; } });
var update_app_dependencies_2 = require("./update-app-dependencies");
Object.defineProperty(exports, "updatePackageDependencies", { enumerable: true, get: function () { return update_app_dependencies_2.updatePackageDependencies; } });
var update_project_tsconfig_2 = require("./update-project-tsconfig");
Object.defineProperty(exports, "updateProjectTsconfig", { enumerable: true, get: function () { return update_project_tsconfig_2.updateProjectTsconfig; } });
/**
 * Migrates a project to use TypeScript project references
 */
const migrateProjectReference = async (tree, projectConfig) => {
    console.log(`Migrating ${projectConfig.name} to use TypeScript project references`);
    // Step 1: Create package.json for the project (non-buildable only)
    (0, create_nonbuildable_project_package_json_1.createNonbuildableProjectPackageJson)(tree, projectConfig);
    // Step 2: Update TypeScript configuration
    await (0, update_project_tsconfig_1.updateProjectTsconfig)(tree, projectConfig);
    // Step 3: Update app dependencies
    (0, update_app_dependencies_1.updatePackageDependencies)(tree, projectConfig);
    console.log(`Completed migration for ${projectConfig.name}`);
};
exports.migrateProjectReference = migrateProjectReference;
//# sourceMappingURL=index.js.map