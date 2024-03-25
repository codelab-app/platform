import type { Span } from '@opentelemetry/api'

export interface ITracerService {
  addAction(name: string, attributes?: object): void
  endSpan(): void
  finishAction(): void
  startSpan(name: string): Span
}
