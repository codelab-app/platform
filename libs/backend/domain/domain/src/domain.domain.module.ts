import { SharedDomainModule } from '@codelab/backend/domain/shared/modules'
import { Module } from '@nestjs/common'

import { DomainRepository } from './repository'

@Module({
  exports: [DomainRepository],
  imports: [SharedDomainModule],
  providers: [DomainRepository],
})
export class DomainDomainModule {}
