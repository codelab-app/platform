import { Controller, Get, Inject } from '@nestjs/common'
import { AppService } from './app.service'
import {
  CODELAB_LOGGER_PROVIDER,
  CodelabLogger,
} from '@codelab/api/providers/logger'

@Controller()
export class AppController {
  constructor(
    @Inject(CODELAB_LOGGER_PROVIDER)
    private readonly logger: CodelabLogger,
    private appService: AppService,
  ) {}

  @Get()
  log() {
    // this.logger.log({ from: 'userA', to: 'userB' })
  }
}
