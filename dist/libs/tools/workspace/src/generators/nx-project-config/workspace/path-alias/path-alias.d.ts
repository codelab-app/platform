import type { PathAlias } from './path-alias.type';
/**
 * Returns the previous alias format
 */
export declare const getPathAliasPackageNames: () => string[];
/**
 * Returns the refactored paths
 */
export declare const getProjectReferencePaths: () => string[];
/**
 * Gets the package path alias when given a project name
 * @param projectName The name of the project
 * @returns The corresponding package path alias
 * @throws Error if project name is not found in the path alias map
 */
export declare const getPackageNameFromProjectName: (projectName: string) => PathAlias;
export declare const getPackageNameFromOldAlias: (oldAlias: string) => string;
