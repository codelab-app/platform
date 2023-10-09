import { otelSDK } from '@codelab/backend/infra/adapter/otel'
import { trace } from '@opentelemetry/api'
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
    } catch (error) {
      console.error(error)
      // Need this for finally to execute completely
    } finally {
      process.exit(0)
      // otelSDK
      //   .shutdown()
      //   .then(
      //     () => console.log('Opentelemetry shut down successfully'),
      //     (err) => console.log('Error shutting down SDK', err),
      //   )
      //   .finally(() => process.exit(0))
    }
  }
}
