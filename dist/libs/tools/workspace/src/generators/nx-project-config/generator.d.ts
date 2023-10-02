import type { Tree } from '@nx/devkit';
/**
 * Go through all projects and update the `lint` setting of `project.json`
 */
export declare const nxProjectConfigGenerator: (tree: Tree) => Promise<void>;
export default nxProjectConfigGenerator;
