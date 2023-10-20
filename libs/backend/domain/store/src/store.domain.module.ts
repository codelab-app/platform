import { SharedDomainModule } from '@codelab/backend/domain/shared/modules'
import { Module } from '@nestjs/common'
import { StoreRepository } from './repository'

@Module({
  exports: [StoreRepository],
  imports: [SharedDomainModule],
  providers: [StoreRepository],
})
export class StoreDomainModule {}
