import { Tree, ProjectConfiguration } from '@nx/devkit';
/**
 * Updates the tsconfig.json files for a project to use project references
 */
export declare const updateProjectTsconfig: (tree: Tree, projectConfig: ProjectConfiguration) => Promise<void>;
