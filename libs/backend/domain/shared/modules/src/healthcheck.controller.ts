import { Controller, Get } from '@nestjs/common'

@Controller('healthcheck')
export class HealthcheckController {
  @Get()
  getStatus() {
    console.log('healthcheck')

    return { status: 'ok' }
  }
}
