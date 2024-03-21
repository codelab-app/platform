import type { AttributeValue, Span } from '@opentelemetry/api'

export interface ITracerService {
  endSpan(): void
  startSpan(name: string): Span
}
