import { Module } from '@nestjs/common'
import { ActionApplicationController } from './action.application.controller'
import { ActionApplicationService } from './action.application.service'
import { ActionDomainModule } from '@codelab/backend/domain/action'
import { CodelabLoggerModule } from '@codelab/backend/infra/adapter/logger'

@Module({
  imports: [ActionDomainModule, CodelabLoggerModule],
  controllers: [ActionApplicationController],
  providers: [ActionApplicationService],
})
export class ActionApplicationModule {}
