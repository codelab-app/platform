import type { ProjectConfiguration, Tree } from '@nx/devkit';
/**
 * Creates package.json files for non-buildable projects, including dependency analysis
 */
export declare const createNonbuildablePackageJson: (tree: Tree, projectConfig: ProjectConfiguration) => void;
