import { Controller, Get } from '@nestjs/common'

@Controller('healthcheck')
export class HealthcheckController {
  @Get()
  getStatus() {
    return { status: 'ok' }
  }
}
