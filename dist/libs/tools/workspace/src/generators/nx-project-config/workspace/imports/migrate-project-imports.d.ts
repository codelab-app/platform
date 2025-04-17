import type { ProjectConfiguration, Tree } from '@nx/devkit';
/**
 * Change all the import paths a project uses
 */
export declare const migrateProjectImports: (tree: Tree, projectConfig: ProjectConfiguration) => Promise<void>;
