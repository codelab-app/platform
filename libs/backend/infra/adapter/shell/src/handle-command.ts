import type { ArgumentsCamelCase } from 'yargs'

type HandlerFunction<T> = (args: ArgumentsCamelCase<T>) => Promise<void> | void

/**
 * Create an HOC handler so we can have global teardown
 */
export const globalHandler = <T>(
  handler: HandlerFunction<T>,
): HandlerFunction<T> => {
  return async (args: ArgumentsCamelCase<T>) => {
    let exitCode = 0
    try {
      await handler(args)
    } catch (error) {
      console.error(error)
      exitCode = 1
    } finally {
      process.exit(exitCode)
    }
  }
}
