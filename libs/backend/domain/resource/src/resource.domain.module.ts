import { SharedDomainModule } from '@codelab/backend/domain/shared/modules'
import { Module } from '@nestjs/common'

import { ResourceRepository } from './repository'

@Module({
  exports: [ResourceRepository],
  imports: [SharedDomainModule],
  providers: [ResourceRepository],
})
export class ResourceDomainModule {}
