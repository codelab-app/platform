import type { ProjectConfiguration, Tree } from '@nx/devkit';
/**
 * Removes the 'targets' property from the 'nx' object in package.json
 * @param tree - The file system tree.
 * @param packageJsonPath - Path to the package.json file.
 */
export declare const removeTargetsFromNx: (tree: Tree, packageJsonPath: string) => void;
/**
 * Migrates project configuration specifics (name, projectType, sourceRoot, tags)
 * from project.json to the 'nx' property within package.json for inferred configuration.
 * Also removes 'targets' property from the 'nx' object if it exists.
 * This function is idempotent and can be safely run multiple times.
 * @param tree - The file system tree.
 * @param projectConfig - The configuration of the project to migrate.
 */
export declare const migrateToInferred: (tree: Tree, projectConfig: ProjectConfiguration) => Promise<void>;
