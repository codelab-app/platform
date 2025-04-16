import type { ProjectConfiguration, Tree } from '@nx/devkit';
export { createNonbuildableProjectPackageJson } from './create-nonbuildable-project-package-json';
export { getProjectDependencies } from './get-project-dependencies';
export { updatePackageDependencies } from './update-app-dependencies';
export { updateProjectTsconfig } from './update-project-tsconfig';
/**
 * Migrates a project to use TypeScript project references
 */
export declare const migrateProjectReference: (tree: Tree, projectConfig: ProjectConfiguration) => Promise<void>;
