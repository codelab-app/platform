import type { BuildExecutorSchema } from './schema';
declare const runExecutor: (options: BuildExecutorSchema) => Promise<{
    success: boolean;
}>;
export default runExecutor;
