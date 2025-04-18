import type { ProjectConfiguration, Tree } from '@nx/devkit';
/**
 * Moves compilerOptions from tsconfig.json to tsconfig.lib.json for a project.
 */
export declare const copyLibTsconfigToTsconfig: (tree: Tree, project: ProjectConfiguration) => void;
