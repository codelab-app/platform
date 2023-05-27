import { toError } from '@codelab/shared/utils'
import { context, SpanStatusCode, trace } from '@opentelemetry/api'

export const CLI_TRACER = 'cli-tracer'

/**
 * The startActiveSpan function is a utility function that simplifies the process of starting a span, setting it as active in the context, executing a function (synchronously or asynchronously) within the context of that span, and then ending the span.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withTracing = <T, A extends Array<any>>(
  operationName: string,
  callback: (...args: A) => Promise<T>,
) => {
  const tracer = trace.getTracer(CLI_TRACER)

  return (...args: A) => {
    const span = tracer.startSpan(operationName)
    const ctx = trace.setSpan(context.active(), span)

    try {
      const result = context.with(ctx, () => callback(...args))

      // If callback returns a promise, we want to end the span after the promise resolves.
      if (result instanceof Promise) {
        return result.finally(() => span.end())
      }

      return result
    } catch (error) {
      // If an error is thrown, record it in the span and re-throw.
      span.recordException(toError(error))
      span.setStatus({ code: SpanStatusCode.ERROR })

      throw error
    } finally {
      span.end()
    }
  }
}

// export const withTracing = <T, A extends Array<any>>(
//   operationName: string,
//   callback: (...args: A) => Promise<T>,
// ) => {
//   const tracer = trace.getTracer(CLI_TRACER)

//   return (...args: A) =>
//     tracer.startActiveSpan(operationName, async (span) => {
//       try {
//         const result = await callback(...args)

//         return result
//       } catch (error) {
//         span.recordException(toError(error))
//         span.setStatus({ code: SpanStatusCode.ERROR })
//         throw error
//       }
//     })
// }
