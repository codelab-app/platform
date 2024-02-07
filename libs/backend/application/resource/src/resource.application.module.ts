import { ResourceDomainModule } from '@codelab/backend/domain/resource'
import { Module } from '@nestjs/common'
import { ExportResourcesHandler } from './use-case'

@Module({
  controllers: [],
  exports: [ExportResourcesHandler],
  imports: [ResourceDomainModule],
  providers: [ExportResourcesHandler],
})
export class ResourceApplicationModule {}
