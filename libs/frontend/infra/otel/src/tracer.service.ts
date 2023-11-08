import { flattenWithPrefix } from '@codelab/shared/infra/otel'
import type { AttributeValue, Span } from '@opentelemetry/api'
import { context, trace } from '@opentelemetry/api'
import { Model, model } from 'mobx-keystone'
import { PLATFORM_TRACER_NAME } from './tracer'

/**
 * @deprecated otel not working in browser
 */
@model('@codelab/TracerService')
export class TracerService extends Model({}) {
  public addAttribute(key: string, value: AttributeValue) {
    const span = this.getSpan()

    span?.setAttribute(key, value)
  }

  public addAttributes(object: object) {
    const span = this.getSpan()

    span?.setAttributes(flattenWithPrefix(object))
  }

  public addEvent(name: string, data: unknown) {
    const span = this.getSpan()
    const stringifiedData: { [key: string]: string } = {}

    if (typeof data === 'object' && data !== null) {
      for (const [key, value] of Object.entries(data)) {
        stringifiedData[key] = JSON.stringify(value)
      }
    } else {
      stringifiedData['data'] = JSON.stringify(data)
    }

    span?.addEvent(name, stringifiedData)
  }

  public addJsonAttributes(key: string, object?: object) {
    const span = this.getSpan()

    span?.setAttributes({
      [key]: JSON.stringify(object),
    })
  }

  public endSpan() {
    return this.getSpan()?.end()
  }

  public getSpan(): Span | undefined {
    return trace.getSpan(context.active())
  }

  public getTracer() {
    return trace.getTracer(PLATFORM_TRACER_NAME)
  }

  public startSpan(name: string): Span {
    return this.getTracer().startSpan(name)
  }
}
