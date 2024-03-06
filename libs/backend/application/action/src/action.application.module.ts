import { Module } from '@nestjs/common'
import { ActionApplicationController } from './action.application.controller'
import { ActionApplicationService } from './action.application.service'
import { ActionDomainModule } from '@codelab/backend/domain/action'

@Module({
  imports: [ActionDomainModule],
  controllers: [ActionApplicationController],
  providers: [ActionApplicationService],
})
export class ActionApplicationModule {}
