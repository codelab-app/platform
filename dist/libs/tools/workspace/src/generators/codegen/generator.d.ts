import type { Tree } from '@nx/devkit';
import type { CodegenGeneratorSchema } from './schema';
export declare const codegenGenerator: (tree: Tree, options: CodegenGeneratorSchema) => Promise<void>;
export default codegenGenerator;
