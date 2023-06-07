/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PromiseCallback } from '@codelab/shared/abstract/types'
import { toError } from '@codelab/shared/utils'
import type { Span } from '@opentelemetry/api'
import { context, SpanStatusCode, trace } from '@opentelemetry/api'

//
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
    const result = context.with(setSpan(context.active(), span), () =>
      callback(...args),
    )

    if (result instanceof Promise) {
      return result.finally(() => {
        return span.end()
      })
    } else {
      span.end()

      return result
    }
  } catch (error) {
    recordExceptionAndStatus(span, error)
    throw error
  }
}

// This function records an exception in the given span and sets the status to ERROR.
const recordExceptionAndStatus = (span: Span, error: unknown) => {
  span.recordException(toError(error))
  span.setStatus({ code: SpanStatusCode.ERROR })
}

interface WithTracing {
  <Return, Param extends Array<any>>(
    /**
     * Name of the span
     */
    operationName: string,
    /**
     * The function we are measuring
     */
    callback: PromiseCallback<Return, Param>,
    /**
     * Allows us to add attributes to span
     */
    spanCallback?: (span: Span) => void,
  ): PromiseCallback<Return, Param>
}

// This is your withTracing function, now using the helper functions above.
export const withTracing: WithTracing = <Return, Param extends Array<any>>(
  operationName: string,
  callback: PromiseCallback<Return, Param>,
  spanCallback?: (span: Span) => void,
) => {
  return async (...args: Param) => {
    const tracer = trace.getTracer(CLI_TRACER)

    return tracer.startActiveSpan(operationName, async (span) => {
      try {
        if (spanCallback) {
          spanCallback(span)
        }

        const result = await executeCallback(callback, args, span)

        return result
      } finally {
        span.end()
      }
    })
  }
}
