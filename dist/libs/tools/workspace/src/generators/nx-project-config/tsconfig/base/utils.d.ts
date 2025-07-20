import { type ProjectConfiguration, type Tree } from '@nx/devkit';
type ObjectLike = Record<string, unknown>;
export declare const sortKeys: (object: ObjectLike) => ObjectLike;
/**
 *
 * @param project
 * @param relativePathFromProjectSourceRoot `services` in `src/services` or `use-cases/create-app` in ` in `src/uses-cases/create-app`
 * @returns
 */
export declare const getModuleAlias: (project: ProjectConfiguration, relativePathFromProjectSourceRoot: string) => string;
export declare const appendTsconfigPath: (tree: Tree, project: ProjectConfiguration, moduleAlias: string, targetPath: string) => void;
export declare const removeTsconfigPath: (tree: Tree, moduleAlias: string) => void;
export {};
