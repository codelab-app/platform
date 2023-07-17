import { toError } from '@codelab/shared/utils'
import type { Span } from '@opentelemetry/api'
import { context, SpanStatusCode, trace } from '@opentelemetry/api'
import { setSpan } from '@opentelemetry/api/build/src/trace/context-utils'

export const CLI_TRACER = 'cli-tracer'

export interface Callback<Return> {
  (span: Span): Promise<Return> | Return
}

export const withTracing = <Return>(
  operationName: string,
  callback: Callback<Return>,
  // This keeps the application code separate
  spanCallback?: (span: Span) => void,
) => {
  return async () => {
    const tracer = trace.getTracer(CLI_TRACER)

    return tracer.startActiveSpan(operationName, async (span) => {
      try {
        if (spanCallback) {
          spanCallback(span)
        }

        const result = context.with(setSpan(context.active(), span), () =>
          callback(span),
        )

        if (result instanceof Promise) {
          const awaitedResult = await result

          return awaitedResult
        }

        return result
      } catch (error) {
        console.error(error)
        span.recordException(toError(error))
        span.setStatus({ code: SpanStatusCode.ERROR })
        throw error
      } finally {
        span.end()
      }
    })
  }
}
