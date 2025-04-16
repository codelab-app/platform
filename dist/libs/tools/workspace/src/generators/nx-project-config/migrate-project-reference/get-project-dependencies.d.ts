import type { ProjectConfiguration, Tree } from '@nx/devkit';
/**
 * Helper function to get a project's dependencies
 */
export declare const getProjectDependencies: (tree: Tree, projectConfig: ProjectConfiguration) => Promise<Array<string>>;
