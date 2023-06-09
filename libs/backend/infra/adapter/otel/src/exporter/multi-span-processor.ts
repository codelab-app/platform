import type { Context } from '@opentelemetry/api'
import type {
  ReadableSpan,
  Span,
  SpanProcessor,
} from '@opentelemetry/sdk-trace-base'

export class MultiSpanProcessor implements SpanProcessor {
  private spanProcessors: Array<SpanProcessor>

  constructor(spanProcessors: Array<SpanProcessor>) {
    this.spanProcessors = spanProcessors
  }

  onStart(span: Span, parentContext: Context): void {
    for (const spanProcessor of this.spanProcessors) {
      spanProcessor.onStart(span, parentContext)
    }
  }

  onEnd(span: ReadableSpan): void {
    for (const spanProcessor of this.spanProcessors) {
      spanProcessor.onEnd(span)
    }
  }

  shutdown(): Promise<void> {
    return Promise.all(
      this.spanProcessors.map((spanProcessor) => spanProcessor.shutdown()),
    ).then()
  }

  forceFlush(): Promise<void> {
    return Promise.all(
      this.spanProcessors.map((spanProcessor) => spanProcessor.forceFlush()),
    ).then()
  }
}
