"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processAllProjects = void 0;
const devkit_1 = require("@nx/devkit");
/**
 * Helper function to process all projects in the workspace
 * @param tree - The file system tree
 * @param processProject - Function to process each project
 */
const processAllProjects = async (tree, processProject) => {
    // Get all projects in the workspace
    const projects = (0, devkit_1.getProjects)(tree);
    const projectNames = Array.from(projects.keys());
    console.log(`Found ${projectNames.length} projects to process`);
    // Process each project
    for (const projectName of projectNames) {
        const projectConfig = projects.get(projectName);
        if (projectConfig) {
            console.log(`\nProcessing project: ${projectName}`);
            await processProject(tree, projectName, projectConfig);
        }
    }
    // Format files after all changes
    await (0, devkit_1.formatFiles)(tree);
};
exports.processAllProjects = processAllProjects;
//# sourceMappingURL=process-all-projects.js.map