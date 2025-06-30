import type { PathAlias } from './path-alias.type';
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
/**
 * The old alias could contain nested subpaths, so we want to be able to remove that before testing for the base package name
 *
 * @param oldAlias Could have subpath included
 */
export declare const getPackageNameFromOldAlias: (oldAlias: string) => string;
