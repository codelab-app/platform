import { ResourceDomainModule } from '@codelab/backend/domain/resource'
import { Module } from '@nestjs/common'
import { ResourceApplicationController } from './resource.application.controller'
import { ResourceApplicationService } from './resource.application.service'

@Module({
  controllers: [ResourceApplicationController],
  imports: [ResourceDomainModule],
  providers: [ResourceApplicationService],
})
export class ResourceApplicationModule {}
