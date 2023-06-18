import type { Tree } from '@nx/devkit';
/**
 * Each project needs to output reporters to individual file, and we can't do that as CLI argument, so needs to be done at project level.
 *
 * We loop through each project and add the configurations there at a per-library basis.
 */
export declare const updateProjectConfig: (tree: Tree, projectName: string) => void;
