import { Module } from '@nestjs/common'
import { ExportResourceHandler } from './use-case'
import { ResourceDomainModule } from '@codelab/backend/domain/resource'

@Module({
  controllers: [],
  exports: [ExportResourceHandler],
  imports: [ResourceDomainModule],
  providers: [ExportResourceHandler],
})
export class ResourceApplicationModule {}
