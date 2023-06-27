import { Controller, Get } from '@nestjs/common'
import { context, trace } from '@opentelemetry/api'

@Controller()
export class AppController {
  @Get('graphql')
  randomNumber() {
    return Math.random() * 100
  }
  // @Get()
  // getData() {
  //   const tracer = trace.getTracer('nestjs')
  //   const parentSpan = tracer.startSpan('getHello')

  //   const response = context.with(
  //     trace.setSpan(context.active(), parentSpan),
  //     () => {
  //       const span = trace.getSpan(context.active())

  //       if (!span) {
  //         return
  //       }

  //       span.addEvent('invoking getHello')

  //       console.log(
  //         'This is a console log message with trace ID:',
  //         span.spanContext().traceId,
  //       )

  //       span.addEvent('getHello invoked')
  //       span.end()
  //     },
  //   )

  //   parentSpan.end()

  //   return response
  // }
}
