import type { Tree } from '@nx/devkit';
import type { MigrateProjectReferenceGeneratorSchema } from './schema';
/**
 * Generator to migrate all projects to use TypeScript project references
 */
export declare const migrateProjectReferenceGenerator: (tree: Tree, _options: MigrateProjectReferenceGeneratorSchema) => Promise<void>;
export default migrateProjectReferenceGenerator;
