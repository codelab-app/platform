"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateProjectReference = exports.updateProjectTsconfig = exports.getProjectDependencies = exports.createNonbuildablePackageJson = void 0;
// Import the functions from the separate files
const create_nonbuildable_package_json_1 = require("../workspace/package-json/create-nonbuildable-package-json");
// Re-export the functions
var create_nonbuildable_package_json_2 = require("../workspace/package-json/create-nonbuildable-package-json");
Object.defineProperty(exports, "createNonbuildablePackageJson", { enumerable: true, get: function () { return create_nonbuildable_package_json_2.createNonbuildablePackageJson; } });
var get_project_dependencies_1 = require("./get-project-dependencies");
Object.defineProperty(exports, "getProjectDependencies", { enumerable: true, get: function () { return get_project_dependencies_1.getProjectDependencies; } });
var update_project_tsconfig_1 = require("./update-project-tsconfig");
Object.defineProperty(exports, "updateProjectTsconfig", { enumerable: true, get: function () { return update_project_tsconfig_1.updateProjectTsconfig; } });
/**
 * Migrates a project to use TypeScript project references
 */
const migrateProjectReference = async (tree, projectConfig) => {
    console.log(`Migrating ${projectConfig.name} to use TypeScript project references`);
    // Step 1: Create package.json for the project (non-buildable only)
    (0, create_nonbuildable_package_json_1.createNonbuildablePackageJson)(tree, projectConfig);
    // Step 3: Update project imports
    // migrateProjectImports(tree, projectConfig)
    // Step 4: Update TypeScript configuration
    // updateProjectTsconfig(tree, projectConfig)
    console.log(`Completed migration for ${projectConfig.name}`);
};
exports.migrateProjectReference = migrateProjectReference;
//# sourceMappingURL=index.js.map