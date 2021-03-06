import { BuildExecutorSchema } from './schema'

export default function runExecutor(options: BuildExecutorSchema) {
  console.log('Executor ran for Build', options)

  return {
    success: true,
  }
}
