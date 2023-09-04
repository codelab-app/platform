import { OgmModule } from '@codelab/backend/infra/adapter/neo4j'
import { Module } from '@nestjs/common'
import { StoreRepository } from './repository'

@Module({
  exports: [StoreRepository],
  imports: [OgmModule],
  providers: [StoreRepository],
})
export class StoreDomainModule {}
