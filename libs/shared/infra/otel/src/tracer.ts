/* eslint-disable @typescript-eslint/no-explicit-any */
import { PromiseCallback } from '@codelab/shared/abstract/types'
import { toError } from '@codelab/shared/utils'
import type { Span } from '@opentelemetry/api'
import { context, SpanStatusCode, trace } from '@opentelemetry/api'

export const CLI_TRACER = 'cli-tracer'

/**
 * The startActiveSpan function is a utility function that simplifies the process of starting a span, setting it as active in the context, executing a function (synchronously or asynchronously) within the context of that span, and then ending the span.
 */
// This function executes the callback and returns the result. If the result is a promise, it ensures the span is ended after the promise resolves.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const executeCallback = <Return, Param extends Array<any>>(
  callback: PromiseCallback<Return, Param>,
  args: Param,
  span: Span,
) => {
  try {
    const result = context.with(context.active(), () => callback(...args))

    return result instanceof Promise ? result.finally(() => span.end()) : result
  } catch (error) {
    recordExceptionAndStatus(span, error)
    throw error
  } finally {
    span.end()
  }
}

// This function records an exception in the given span and sets the status to ERROR.
const recordExceptionAndStatus = (span: Span, error: unknown) => {
  span.recordException(toError(error))
  span.setStatus({ code: SpanStatusCode.ERROR })
}

interface WithTracing {
  <Return, Param extends Array<any>>(
    operationName: string,
    callback: PromiseCallback<Return, Param>,
  ): PromiseCallback<Return, Param>
}

// This is your withTracing function, now using the helper functions above.
export const withTracing: WithTracing = <Return, Param extends Array<any>>(
  operationName: string,
  callback: PromiseCallback<Return, Param>,
) => {
  const tracer = trace.getTracer(CLI_TRACER)

  return async (...args: Param) => {
    const span = tracer.startSpan(operationName)

    trace.setSpan(context.active(), span)

    return executeCallback(callback, args, span)
  }
}

/**
 * Don't use this approach, doesn't work
 */

// export const withTracing = <T, A extends Array<any>>(
//   operationName: string,
//   callback: PromiseCallback<T,A>,
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
