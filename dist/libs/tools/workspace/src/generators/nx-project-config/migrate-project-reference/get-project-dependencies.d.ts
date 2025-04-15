import { Tree, ProjectConfiguration } from '@nx/devkit';
/**
 * Helper function to get a project's dependencies
 */
export declare const getProjectDependencies: (tree: Tree, projectConfig: ProjectConfiguration) => Promise<string[]>;
