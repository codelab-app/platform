import type { Tree } from '@nx/devkit';
import type { ProjectConfigGeneratorSchema } from './schema';
/**
 * Factory function to generate a list of available projects for the x-prompt
 * @returns An array of project choices for the dropdown
 * //
 */
export declare const nxProjectConfigGenerator: (tree: Tree, options: ProjectConfigGeneratorSchema) => Promise<void>;
export default nxProjectConfigGenerator;
