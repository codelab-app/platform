import { flattenWithPrefix, TRACER_NAME } from '@codelab/shared/infra/otel'
import { Injectable } from '@nestjs/common'
import type { AttributeValue, Span } from '@opentelemetry/api'
import { context, trace } from '@opentelemetry/api'

@Injectable()
export class TraceService {
  public getTracer() {
    return trace.getTracer(TRACER_NAME)
  }

  public getSpan(): Span | undefined {
    return trace.getSpan(context.active())
  }

  public startSpan(name: string): Span {
    return this.getTracer().startSpan(name)
  }

  public addAttribute(key: string, value: AttributeValue) {
    const span = this.getSpan()

    span?.setAttribute(key, value)
  }

  public addAttributes(object: object) {
    const span = this.getSpan()

    span?.setAttributes(flattenWithPrefix(object))
  }
}
