import { type ProjectConfiguration, type Tree } from '@nx/devkit';
/**
 * Sorts the third level properties in exports to follow the order: import, types, default
 */
export declare const sortExports: (tree: Tree, projectConfig: ProjectConfiguration) => void;
export declare const setPackageJsonExports: (tree: Tree, projectConfig: ProjectConfiguration) => void;
