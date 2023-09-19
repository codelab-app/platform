import { OgmModule } from '@codelab/backend/infra/adapter/neo4j'
import { ValidationModule } from '@codelab/backend/infra/adapter/typebox'
import { Module } from '@nestjs/common'
import { AtomRepository } from './repository'

@Module({
  exports: [AtomRepository],
  imports: [OgmModule, ValidationModule],
  providers: [AtomRepository],
})
export class AtomDomainModule {}
