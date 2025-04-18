import type { ProjectConfiguration, Tree } from '@nx/devkit';
/**
 * Migrates project configuration specifics (name, projectType, sourceRoot, tags)
 * from project.json to the 'nx' property within package.json for inferred configuration.
 * @param tree - The file system tree.
 * @param projectConfig - The configuration of the project to migrate.
 */
export declare const migrateToInferred: (tree: Tree, projectConfig: ProjectConfiguration) => Promise<void>;
//# sourceMappingURL=migrate-to-inferred.d.ts.map