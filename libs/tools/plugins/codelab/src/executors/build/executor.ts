import { BuildExecutorSchema } from './schema'

export default async function runExecutor(options: BuildExecutorSchema) {
  console.info('Executor ran for Build', options)

  return {
    success: true,
  }
}
