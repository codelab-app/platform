import type { Tree } from '@nx/devkit';
/**
 * Update all imports from all files in a directory
 */
export declare const updateProjectImports: (tree: Tree, sourceRoot: string) => Record<string, Array<string>>;
