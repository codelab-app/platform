import { Controller, Get, Inject } from '@nestjs/common'
import { CODELAB_LOGGER_PROVIDER, CodelabLogger } from '@codelab/api/logger'

@Controller()
export class AppController {
  constructor(
    @Inject(CODELAB_LOGGER_PROVIDER)
    private readonly logger: CodelabLogger,
  ) {}

  @Get()
  log() {
    this.logger.log({ from: 'userA', to: 'userB' })
  }
}
