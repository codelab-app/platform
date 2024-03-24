import type { ITracerService } from '@codelab/frontend/abstract/application'
import { flattenWithPrefix } from '@codelab/shared/infra/otel'
import { isServer } from '@codelab/shared/utils'
import type { AttributeValue, Span } from '@opentelemetry/api'
import { context, trace } from '@opentelemetry/api'
import { Model, model } from 'mobx-keystone'
import { browserAgentInstance } from './newrelic/agent'
import { PLATFORM_TRACER_NAME } from './tracer'
/**
 * @deprecated otel not working in browser
 */
@model('@codelab/TracerService')
export class TracerService extends Model({}) implements ITracerService {
  addAction(name: string, attributes?: object) {
    if (isServer) {
      return
    }

    console.log('addAction', name, browserAgentInstance)

    return browserAgentInstance?.addPageAction(name, attributes)
  }

  addAttribute(key: string, value: AttributeValue) {
    const span = this.getSpan()

    span?.setAttribute(key, value)
  }

  addAttributes(object: object) {
    const span = this.getSpan()

    span?.setAttributes(flattenWithPrefix(object))
  }

  addEvent(name: string, data: unknown) {
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

  addJsonAttributes(key: string, object?: object) {
    const span = this.getSpan()

    span?.setAttributes({
      [key]: JSON.stringify(object),
    })
  }

  endSpan() {
    console.log('end span')

    return this.getSpan()?.end()
  }

  finishAction() {
    if (isServer) {
      return
    }

    console.log('finish action', browserAgentInstance)

    return browserAgentInstance?.finished()
  }

  getSpan(): Span | undefined {
    return trace.getSpan(context.active())
  }

  getTracer() {
    return trace.getTracer(PLATFORM_TRACER_NAME)
  }

  startSpan(name: string): Span {
    console.log('startSpan', name)

    return this.getTracer().startSpan(name)
  }
}
