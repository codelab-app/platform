"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectDependencies = void 0;
const devkit_1 = require("@nx/devkit");
/**
 * Helper function to get a project's dependencies
 */
const getProjectDependencies = async (tree, projectConfig) => {
    // Use a simpler approach to find dependencies - just check all projects
    // and add them to the dependencies list if they might be used
    const dependencies = [];
    const projects = (0, devkit_1.getProjects)(tree);
    // We'll assume for now that all libraries could be dependencies
    // In a real implementation, you would use the project graph to get actual dependencies
    for (const [projectName, project] of projects.entries()) {
        // Skip applications and the current project
        if (project.projectType === 'application' ||
            projectName === projectConfig.name) {
            continue;
        }
        dependencies.push(project.root);
    }
    return dependencies;
};
exports.getProjectDependencies = getProjectDependencies;
//# sourceMappingURL=get-project-dependencies.js.map