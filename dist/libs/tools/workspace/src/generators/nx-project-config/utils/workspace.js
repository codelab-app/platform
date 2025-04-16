"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveAliasMappingToFile = exports.createAliasMapping = exports.forEachProject = exports.projectNameToPackageName = void 0;
const devkit_1 = require("@nx/devkit");
const utils_1 = require("../migrate-project-reference/utils");
/**
 * Converts project name to a package.json compatible name with the @codelab prefix
 * @param projectName The Nx project name
 * @returns A formatted package name with @codelab/ prefix
 */
const projectNameToPackageName = (projectName) => {
    return `@codelab/${projectName}`;
};
exports.projectNameToPackageName = projectNameToPackageName;
/**
 * Loops through all projects in the workspace and performs the specified operation on each
 * @param tree The file system tree
 * @param callback Function to execute for each project
 */
const forEachProject = (tree, callback) => {
    const projects = (0, devkit_1.getProjects)(tree);
    projects.forEach((projectConfig, projectName) => {
        callback(projectName, projectConfig);
    });
};
exports.forEachProject = forEachProject;
/**
 * Creates a mapping of project names to their paths and aliases
 * @param tree The file system tree
 * @returns An object mapping project names to their paths and aliases
 */
// Cache for project mapping
let projectMappingCache = null;
const createAliasMapping = (tree) => {
    // Return cached mapping if available
    if (projectMappingCache) {
        return projectMappingCache;
    }
    const projects = (0, devkit_1.getProjects)(tree);
    const projectMapping = {};
    for (const [projectName, projectConfig] of projects) {
        projectMapping[projectName] = {
            alias: (0, utils_1.getPackageJsonNameFromProjectName)(projectName),
            path: projectConfig.root,
        };
    }
    // projects.forEach((projectConfig, projectName) => {
    //   // Use the project name directly as the alias
    // })
    // Cache the result
    projectMappingCache = projectMapping;
    return projectMapping;
};
exports.createAliasMapping = createAliasMapping;
/**
 * Saves the project mapping to a file in the workspace
 * @param tree The file system tree
 * @param mapping The project mapping to save
 * @param outputPath The relative path where to save the file (defaults to 'tools/project-mapping.json')
 */
const saveAliasMappingToFile = (tree, mapping, outputPath = 'tools/project-mapping.json') => {
    const content = JSON.stringify(mapping, null, 2);
    // Check if file exists and create directory if needed
    const dir = outputPath.substring(0, outputPath.lastIndexOf('/'));
    if (dir && !tree.exists(dir)) {
        tree.write(dir + '/.gitkeep', '');
    }
    // Write the mapping to file
    tree.write(outputPath, content);
    console.log(`Project mapping saved to ${outputPath}`);
};
exports.saveAliasMappingToFile = saveAliasMappingToFile;
//# sourceMappingURL=workspace.js.map