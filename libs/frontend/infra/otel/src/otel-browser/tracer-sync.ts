import { toError } from '@codelab/shared/utils'
import type { Context, Span } from '@opentelemetry/api'
import { context, SpanStatusCode, trace } from '@opentelemetry/api'
import { initializeWebTraceProvider } from './otel-browser.provider'

type Callback<Return> = (span: Span) => Return

/**
 * Re-used by frontend and backend
 */
export const withTracerActiveSpanSync =
  (tracerName: string) =>
  <T>(
    operationName: string,
    callback: Callback<T>,
    /**
     * Allow explicit context so concurrency doesn't mess up the nesting
     */
    parentContext?: Context,
  ): T => {
    const provider = initializeWebTraceProvider()
    const activeContext = parentContext ?? context.active()

    return provider
      .getTracer(tracerName)
      .startActiveSpan(operationName, {}, activeContext, (span) => {
        try {
          // Create a new context with the current span, linking it to the current context
          const ctx = trace.setSpan(activeContext, span)
          // Execute the callback within the context that includes the new span
          // const result = context.with(ctx, () => callback(span))
          /**
           * Inspired by https://github.com/open-telemetry/opentelemetry-js/issues/2951#issuecomment-1214587378
           */
          const boundFunction = context.bind(ctx, callback)
          const result = boundFunction(span)

          span.end()

          return result
        } catch (error) {
          console.error(error)
          span.recordException(toError(error))
          span.setStatus({ code: SpanStatusCode.ERROR })
          throw error
        }
      })
  }

export const withTracerSpan = withTracerActiveSpanSync('platform')
