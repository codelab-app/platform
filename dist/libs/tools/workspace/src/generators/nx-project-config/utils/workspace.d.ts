import type { ProjectConfiguration, Tree } from '@nx/devkit';
type ProjectName = string;
export type ProjectMapping = Record<ProjectName, {
    alias: string;
    path: string;
}>;
/**
 * Converts project name to a package.json compatible name with the @codelab prefix
 * @param projectName The Nx project name
 * @returns A formatted package name with @codelab/ prefix
 */
export declare const projectNameToPackageName: (projectName: string) => string;
/**
 * Loops through all projects in the workspace and performs the specified operation on each
 * @param tree The file system tree
 * @param callback Function to execute for each project
 */
export declare const forEachProject: (tree: Tree, callback: (projectName: string, projectConfig: ProjectConfiguration) => void) => void;
export declare const createAliasMapping: (tree: Tree) => ProjectMapping;
/**
 * Saves the project mapping to a file in the workspace
 * @param tree The file system tree
 * @param mapping The project mapping to save
 * @param outputPath The relative path where to save the file (defaults to 'tools/project-mapping.json')
 */
export declare const saveAliasMappingToFile: (tree: Tree, mapping: ProjectMapping, outputPath?: string) => void;
export {};
