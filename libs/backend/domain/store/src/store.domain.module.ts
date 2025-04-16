import { SharedDomainModule } from '@codelab/backend-domain-shared-modules'
import { Module } from '@nestjs/common'

import { StoreRepository } from './repository'
import { StoreDomainService } from './service'

@Module({
  exports: [StoreRepository, StoreDomainService],
  imports: [SharedDomainModule],
  providers: [StoreRepository, StoreDomainService],
})
export class StoreDomainModule {}
