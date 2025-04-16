import type { Tree } from '@nx/devkit';
import type { ProjectConfigGeneratorSchema } from './schema';
/**
 * Go through all projects and update the `lint` setting of `project.json`
 */
export declare const nxProjectConfigGenerator: (tree: Tree, options: ProjectConfigGeneratorSchema) => Promise<void>;
export default nxProjectConfigGenerator;
