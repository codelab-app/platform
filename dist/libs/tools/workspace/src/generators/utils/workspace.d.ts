import type { Tree } from '@nx/devkit';
export interface ProjectMapping {
    [projectName: string]: {
        alias: string;
        path: string;
    };
}
export declare const createAliasMapping: (tree: Tree) => ProjectMapping;
