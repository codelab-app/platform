"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateProjectReferenceGenerator = void 0;
const process_all_projects_1 = require("../utils/process-all-projects");
const index_1 = require("./index");
/**
 * Generator to migrate all projects to use TypeScript project references
 */
const migrateProjectReferenceGenerator = async (tree, _options) => {
    console.log('Starting migration for all projects in the workspace...');
    await (0, process_all_projects_1.processAllProjects)(tree, async (_, _projectName, projectConfig) => {
        await (0, index_1.migrateProjectReference)(tree, projectConfig);
    });
    console.log('\nMigration completed for all projects in the workspace!');
};
exports.migrateProjectReferenceGenerator = migrateProjectReferenceGenerator;
exports.default = exports.migrateProjectReferenceGenerator;
//# sourceMappingURL=migrate-project-reference.js.map