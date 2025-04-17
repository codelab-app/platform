"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateProjectImports = void 0;
const package_name_1 = require("../path-alias/package-name");
const project_imports_1 = require("./project-imports");
/**
 * Change all the import paths a project uses
 */
const migrateProjectImports = (tree, projectConfig) => {
    (0, project_imports_1.updateProjectImports)(tree, projectConfig, (importPath) => {
        const transformedPath = (0, package_name_1.convertToPackageName)(importPath);
        return transformedPath;
    });
};
exports.migrateProjectImports = migrateProjectImports;
//# sourceMappingURL=migrate-project-imports.js.map