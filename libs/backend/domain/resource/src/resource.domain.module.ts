import { Module } from '@nestjs/common'
import { ResourceRepository } from './repository'
import { SharedDomainModule } from '@codelab/backend/domain/shared/modules'

@Module({
  exports: [ResourceRepository],
  imports: [SharedDomainModule],
  providers: [ResourceRepository],
})
export class ResourceDomainModule {}
