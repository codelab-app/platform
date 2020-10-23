import { Controller, Get, Inject } from '@nestjs/common'
import {
  CODELAB_LOGGER_PROVIDER,
  CodelabLogger,
} from '@codelab/api/providers/logger'
import { GrpcPropsClientService } from '@codelab/api/services/props'

@Controller()
export class AppController {
  constructor(
    @Inject(CODELAB_LOGGER_PROVIDER)
    private readonly logger: CodelabLogger,
    private readonly propsService: GrpcPropsClientService,
  ) {}

  @Get()
  log() {
    this.logger.log({ from: 'userA', to: 'userB' })
  }

  @Get('props')
  props() {
    return this.propsService.create()
  }
}
