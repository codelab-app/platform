import type { ProjectConfiguration, Tree } from '@nx/devkit';
/**
 * Helper function to process all projects in the workspace
 * @param tree - The file system tree
 * @param processProject - Function to process each project
 */
export declare const processAllProjects: (tree: Tree, processProject: (tree: Tree, projectName: string, projectConfig: ProjectConfiguration) => Promise<void> | void) => Promise<void>;
