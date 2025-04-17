import type { ProjectConfiguration, Tree } from '@nx/devkit';
/**
 * Creates package.json files for non-buildable projects
 */
export declare const createNonbuildablePackageJson: (tree: Tree, projectConfig: ProjectConfiguration) => void;
