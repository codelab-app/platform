import { Module } from '@nestjs/common'
import { StoreRepository } from './repository'

@Module({
  exports: [StoreRepository],
  providers: [StoreRepository],
})
export class StoreDomainModule {}
