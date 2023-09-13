import type { MaybePromise } from '@codelab/shared/abstract/types'
import { toError } from '@codelab/shared/utils'
import type { Context, Span } from '@opentelemetry/api'
import { context, SpanStatusCode, trace } from '@opentelemetry/api'
import { setSpan } from '@opentelemetry/api/build/src/trace/context-utils'

type Callback<Return> = (span: Span) => Return

/**
 * Re-used by frontend and backend
 */
export const withTracerActiveSpan =
  (tracerName: string) =>
  <T>(
    operationName: string,
    callback: Callback<MaybePromise<T>>,
    /**
     * Allow explicit context so concurrency doesn't mess up the nesting
     */
    parentContext?: Context,
  ): MaybePromise<T> => {
    const activeContext = parentContext ?? context.active()

    return trace
      .getTracer(tracerName)
      .startActiveSpan(operationName, {}, activeContext, async (span) => {
        try {
          // Create a new context with the current span, linking it to the current context
          const ctx = setSpan(activeContext, span)
          // Execute the callback within the context that includes the new span
          // const result = context.with(ctx, () => callback(span))
          /**
           * Inspired by https://github.com/open-telemetry/opentelemetry-js/issues/2951#issuecomment-1214587378
           */
          const boundFunction = context.bind(ctx, callback)
          const result = boundFunction(span)

          if (result instanceof Promise) {
            return result
              .then((value) => {
                span.end()

                return value
              })
              .catch((error) => {
                console.error(error)
                span.recordException(toError(error))
                span.setStatus({ code: SpanStatusCode.ERROR })
                span.end()
                throw error
              })
          } else {
            span.end()
          }

          return result
        } catch (error) {
          console.error(error)
          span.recordException(toError(error))
          span.setStatus({ code: SpanStatusCode.ERROR })
          throw error
        }
      })
  }
