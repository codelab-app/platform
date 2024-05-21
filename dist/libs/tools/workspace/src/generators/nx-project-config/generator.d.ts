import type { Tree } from '@nx/devkit';
import type { EslintGeneratorSchema } from './schema';
/**
 * Go through all projects and update the `lint` setting of `project.json`
 */
export declare const nxProjectConfigGenerator: (tree: Tree, options: EslintGeneratorSchema) => Promise<void>;
export default nxProjectConfigGenerator;
