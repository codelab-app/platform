import type { ProjectConfiguration, Tree } from '@nx/devkit';
/**
 * Output ESLint reporter to tmp library
 */
export declare const addCiLintConfig: (tree: Tree, projectConfig: ProjectConfiguration) => void;
/**
 * We can put these in nx.js instead
 */
export declare const removeCiLintConfig: (tree: Tree, projectConfig: ProjectConfiguration) => void;
