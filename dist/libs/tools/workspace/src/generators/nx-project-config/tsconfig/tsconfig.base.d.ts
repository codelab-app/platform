import type { ProjectConfiguration, Tree } from '@nx/devkit';
/**
 * Wildcard paths drains CPU & battery, so we create paths for import
 */
export declare const updateBaseTsconfig: (tree: Tree, project: ProjectConfiguration) => void;
