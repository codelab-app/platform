import type { Tree } from '@nx/devkit';
/**
 * @deprecated Not used since it's impossible to break up each module to its own types, too much dependency
 */
export declare const codegen: (tree: Tree, projectName: string) => Promise<void>;
