import type { Context } from '@opentelemetry/api'
import type {
  ReadableSpan,
  Span,
  SpanProcessor,
} from '@opentelemetry/sdk-trace-base'

export class MultiSpanProcessor implements SpanProcessor {
  constructor(spanProcessors: Array<SpanProcessor>) {
    this.spanProcessors = spanProcessors
  }

  forceFlush(): Promise<void> {
    return Promise.all(
      this.spanProcessors.map((spanProcessor) => spanProcessor.forceFlush()),
    ).then()
  }

  onEnd(span: ReadableSpan): void {
    for (const spanProcessor of this.spanProcessors) {
      spanProcessor.onEnd(span)
    }
  }

  onStart(span: Span, parentContext: Context): void {
    for (const spanProcessor of this.spanProcessors) {
      spanProcessor.onStart(span, parentContext)
    }
  }

  shutdown(): Promise<void> {
    return Promise.all(
      this.spanProcessors.map((spanProcessor) => spanProcessor.shutdown()),
    ).then()
  }

  private spanProcessors: Array<SpanProcessor>
}
