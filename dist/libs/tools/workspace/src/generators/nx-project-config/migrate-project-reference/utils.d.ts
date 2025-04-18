import type { Tree } from '@nx/devkit';
/**
 * Interface for the project information in the mapping
 */
export interface ProjectInfo {
    path: string;
    projectName: string;
}
/**
 * Interface for the project path mapping file structure
 */
export interface ProjectPathMapping {
    aliasToProject: Record<string, ProjectInfo>;
    mappedAliases: number;
    missingProjects: Array<{
        alias: string;
        path: string;
        reason: string;
    }>;
    projectToAliases: Record<string, Array<string>>;
    timestamp: string;
    totalAliases: number;
}
/**
 * Gets npm package name from the project mapping
 * Throws an error if the mapping file doesn't exist or if the project is not found in the mapping
 */
export declare const getPackageJsonNameFromProjectName: (projectName: string) => string;
/**
 * Gets npm package name from the project mapping
 * Throws an error if the mapping file doesn't exist or if the project is not found in the mapping
 */
export declare const getPackageJsonNameFromMapping: (tree: Tree, projectName: string) => string;
