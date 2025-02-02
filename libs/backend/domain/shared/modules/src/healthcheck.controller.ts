import { Controller, Get } from '@nestjs/common'
import * as Sentry from '@sentry/nestjs'

@Controller('healthcheck')
export class HealthcheckController {
  /**
   * Not working likely due to same module as SentryModule
   */
  @Get()
  getStatus() {
    Sentry.startSpan({ name: 'healthcheck-sentry' }, () => {
      console.log('healthcheck sentry')
    })

    return { status: 'ok' }
  }
}
