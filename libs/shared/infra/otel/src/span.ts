import type { Span } from '@opentelemetry/api'
import { context, trace } from '@opentelemetry/api'

export const startTracingSpan = (
  tracerName: string,
  spanName: string,
): Span => {
  const tracer = trace.getTracer(tracerName)
  const span = tracer.startSpan(spanName)
  const spanContext = trace.setSpan(context.active(), span)

  return span
}
