import { ActionDomainModule } from '@codelab/backend/domain/action'
import { Module } from '@nestjs/common'
import { ActionApplicationController } from './action.application.controller'
import { ActionApplicationService } from './action.application.service'

@Module({
  controllers: [ActionApplicationController],
  imports: [ActionDomainModule],
  providers: [ActionApplicationService],
})
export class ActionApplicationModule {}
