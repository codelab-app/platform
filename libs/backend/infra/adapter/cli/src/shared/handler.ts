import { otelSDK } from '@codelab/backend/infra/adapter/otel'
import type { ArgumentsCamelCase } from 'yargs'

type HandlerFunction<T> = (args: ArgumentsCamelCase<T>) => Promise<void> | void

/**
 * Create an HOC handler so we can have global teardown
 */
export const globalHandler = <T>(
  handler: HandlerFunction<T>,
): HandlerFunction<T> => {
  return async (args: ArgumentsCamelCase<T>) => {
    try {
      await handler(args)
    } catch (error: unknown) {
      console.log(error)
      throw new Error('CLI failed')
      // Need this for finally to execute completely
    } finally {
      otelSDK
        .shutdown()
        .then(
          () => console.log('Opentelemetry shut down successfully'),
          (err) => console.log('Error shutting down SDK', err),
        )
        .finally(() => process.exit(0))
    }
  }
}
