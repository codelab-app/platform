/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable func-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MaybePromise } from '@codelab/shared/abstract/types'
import { toError } from '@codelab/shared/utils'
import type { SpanOptions } from '@opentelemetry/api'
import { context, SpanStatusCode, trace } from '@opentelemetry/api'
import { setSpan } from '@opentelemetry/api/build/src/trace/context-utils'
import { PLATFORM_TRACER_NAME } from './tracer'

export function Span(name?: string, options: SpanOptions = {}) {
  const tracer = trace.getTracer(PLATFORM_TRACER_NAME)

  return (
    target: any,
    propertyKey: string,
    descriptor?: PropertyDescriptor,
  ) => {
    const originalMethod = descriptor ? descriptor.value : target[propertyKey]

    const wrappedMethod = function (
      this: any,
      ...args: Array<any>
    ): MaybePromise<any> {
      const activeContext = context.active()
      const spanName = name || `${target.constructor.name}.${propertyKey}`

      const spanFunction = tracer.startActiveSpan(
        spanName,
        options,
        activeContext,
        async (span) => {
          try {
            const ctx = setSpan(activeContext, span)

            const result = await context.with(ctx, () =>
              originalMethod.apply(this, args),
            )

            span.end()

            return result
          } catch (error) {
            console.error(error)
            span.recordException(toError(error))
            span.setStatus({ code: SpanStatusCode.ERROR })
            span.end()
            throw error
          }
        },
      )

      return spanFunction
    }

    if (descriptor) {
      descriptor.value = wrappedMethod
    } else {
      target[propertyKey] = wrappedMethod
    }
  }
}
