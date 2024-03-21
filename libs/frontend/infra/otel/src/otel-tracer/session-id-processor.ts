import type { Context } from '@opentelemetry/api'
import type {
  ReadableSpan,
  Span,
  SpanProcessor,
} from '@opentelemetry/sdk-trace-web'
import { AttributeNames } from './enums/attribute-names'
import SessionGateway from './gateways/session.gateway'

const { userId } = SessionGateway.getSession()

export class SessionIdProcessor implements SpanProcessor {
  forceFlush(): Promise<void> {
    return Promise.resolve()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  onEnd(span: ReadableSpan): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onStart(span: Span, parentContext: Context): void {
    span.setAttribute(AttributeNames.SESSION_ID, userId)
  }

  shutdown(): Promise<void> {
    return Promise.resolve()
  }
}
