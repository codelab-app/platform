import { toError } from '@codelab/shared/utils'
import { context, SpanStatusCode, trace } from '@opentelemetry/api'

export const CLI_TRACER = 'cli-tracer'

/**
 * The startActiveSpan function is a utility function that simplifies the process of starting a span, setting it as active in the context, executing a function (synchronously or asynchronously) within the context of that span, and then ending the span.
 */
export const withTracing = <T, F extends (() => Promise<T>) | (() => T)>(
  operationName: string,
  callback: F,
): Promise<T> => {
  const tracer = trace.getTracer(CLI_TRACER)

  return tracer.startActiveSpan(operationName, async (span): Promise<T> => {
    try {
      const result = callback()

      if (result instanceof Promise) {
        return await result
      }

      return result
    } catch (error) {
      span.recordException(toError(error))
      span.setStatus({ code: SpanStatusCode.ERROR })
      throw error
    } finally {
      span.end()
    }
  })
}

// Below is same meaning
// export const withTracing = async (
//   operation: string,
//   callback: () => Promise<void>,
// ) => {
//   // using the service name passed to registerOTel
//   const tracer = trace.getTracer(CLI_TRACER)
//   const span = tracer.startSpan(operation)
//   const contextWithSpan = trace.setSpan(context.active(), span)

//   try {
//     await context.with(contextWithSpan, async () => {
//       await callback()
//     })
//     span.end()
//   } catch (error) {
//     span.recordException(toError(error))
//     span.setStatus({ code: SpanStatusCode.ERROR })
//     span.end()
//     throw error
//   }
// }
