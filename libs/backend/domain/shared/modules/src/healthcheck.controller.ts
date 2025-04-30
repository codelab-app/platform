import { Controller, Get } from '@nestjs/common'

@Controller('healthcheck')
export class HealthcheckController {
  /**
   * Not working likely due to same module as SentryModule
   */
  @Get()
  getStatus() {
    console.log('healthcheck sentry')

    return { status: 'ok' }
  }
}
