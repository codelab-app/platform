import { SharedDomainModule } from '@codelab/backend/domain/shared'
import { OgmModule } from '@codelab/backend/infra/adapter/neo4j'
import { ValidationModule } from '@codelab/backend/infra/adapter/typebox'
import { Module } from '@nestjs/common'
import { AtomRepository } from './repository'

@Module({
  exports: [AtomRepository],
  imports: [SharedDomainModule],
  providers: [AtomRepository],
})
export class AtomDomainModule {}
