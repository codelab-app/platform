import { PropDomainModule } from '@codelab/backend/domain/prop'
import { ResourceDomainModule } from '@codelab/backend/domain/resource'
import { CodelabLoggerModule } from '@codelab/backend/infra/adapter/logger'
import { Module } from '@nestjs/common'
import { ResourceApplicationController } from './resource.application.controller'
import { ResourceApplicationService } from './resource.application.service'

@Module({
  controllers: [ResourceApplicationController],
  imports: [ResourceDomainModule, PropDomainModule, CodelabLoggerModule],
  providers: [ResourceApplicationService],
})
export class ResourceApplicationModule {}
