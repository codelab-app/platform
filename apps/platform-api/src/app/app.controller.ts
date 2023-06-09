import { Controller, Get } from '@nestjs/common'
import { context, trace } from '@opentelemetry/api'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    const tracer = trace.getTracer('nestjs')
    const parentSpan = tracer.startSpan('getHello')

    const response = context.with(
      trace.setSpan(context.active(), parentSpan),
      () => {
        const span = trace.getSpan(context.active())

        if (!span) {
          return
        }

        span.addEvent('invoking getHello')

        console.log(
          'This is a console log message with trace ID:',
          span.spanContext().traceId,
        )

        const result = this.appService.getData()

        span.addEvent('getHello invoked')
        span.end()

        return result
      },
    )

    parentSpan.end()

    return response
  }
}
