import type { ProjectConfiguration, Tree } from '@nx/devkit';
/**
 * Get all imports from a project
 */
export declare const getProjectImports: (tree: Tree, projectConfig: ProjectConfiguration) => Array<string>;
