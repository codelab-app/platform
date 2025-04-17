"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateProjectReference = exports.updateProjectTsconfig = exports.updatePackageDependencies = exports.getProjectDependencies = exports.createNonbuildablePackageJson = void 0;
// Import the functions from the separate files
const create_nonbuildable_package_json_1 = require("../workspace/package-json/create-nonbuildable-package-json");
const update_package_dependencies_1 = require("../workspace/package-json/update-package-dependencies");
const update_project_tsconfig_1 = require("./update-project-tsconfig");
// Re-export the functions
var create_nonbuildable_package_json_2 = require("../workspace/package-json/create-nonbuildable-package-json");
Object.defineProperty(exports, "createNonbuildablePackageJson", { enumerable: true, get: function () { return create_nonbuildable_package_json_2.createNonbuildablePackageJson; } });
var get_project_dependencies_1 = require("./get-project-dependencies");
Object.defineProperty(exports, "getProjectDependencies", { enumerable: true, get: function () { return get_project_dependencies_1.getProjectDependencies; } });
var update_package_dependencies_2 = require("../workspace/package-json/update-package-dependencies");
Object.defineProperty(exports, "updatePackageDependencies", { enumerable: true, get: function () { return update_package_dependencies_2.updatePackageDependencies; } });
var update_project_tsconfig_2 = require("./update-project-tsconfig");
Object.defineProperty(exports, "updateProjectTsconfig", { enumerable: true, get: function () { return update_project_tsconfig_2.updateProjectTsconfig; } });
/**
 * Migrates a project to use TypeScript project references
 */
const migrateProjectReference = async (tree, projectConfig) => {
    console.log(`Migrating ${projectConfig.name} to use TypeScript project references`);
    // Step 1: Create package.json for the project (non-buildable only)
    (0, create_nonbuildable_package_json_1.createNonbuildablePackageJson)(tree, projectConfig);
    // Step 2: Update app dependencies
    (0, update_package_dependencies_1.updatePackageDependencies)(tree, projectConfig);
    // Step 3: Update TypeScript configuration
    await (0, update_project_tsconfig_1.updateProjectTsconfig)(tree, projectConfig);
    console.log(`Completed migration for ${projectConfig.name}`);
};
exports.migrateProjectReference = migrateProjectReference;
//# sourceMappingURL=index.js.map