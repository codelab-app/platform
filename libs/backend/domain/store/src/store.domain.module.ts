import { OgmModule } from '@codelab/backend/infra/adapter/neo4j'
import { ValidationModule } from '@codelab/backend/infra/adapter/typebox'
import { Module } from '@nestjs/common'
import { StoreRepository } from './repository'

@Module({
  exports: [StoreRepository],
  imports: [OgmModule, ValidationModule],
  providers: [StoreRepository],
})
export class StoreDomainModule {}
