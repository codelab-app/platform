import type { BuildExecutorSchema } from './schema'

const runExecutor = async (options: BuildExecutorSchema) => {
  console.log('Executor ran for Build', options)

  return {
    success: true,
  }
}

export default runExecutor
