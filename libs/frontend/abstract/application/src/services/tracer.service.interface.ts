import type { ObjectLike } from '@codelab/shared/abstract/types'
import type { Span } from '@opentelemetry/api'

export interface ITracerService {
  addAction(name: string, attributes?: ObjectLike): void
  endSpan(): void
  finishAction(): void
  startSpan(name: string): Span
}
