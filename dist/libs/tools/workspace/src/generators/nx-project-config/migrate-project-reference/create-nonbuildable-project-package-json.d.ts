import type { ProjectConfiguration, Tree } from '@nx/devkit';
/**
 * Creates package.json files for non-buildable projects
 */
export declare const createNonbuildableProjectPackageJson: (tree: Tree, projectConfig: ProjectConfiguration) => void;
