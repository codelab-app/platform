import { OGMModule } from '@codelab/backend/infra/adapter/neo4j'
import { Module } from '@nestjs/common'
import { AtomRepository } from './repository'

@Module({
  exports: [AtomRepository],
  imports: [OGMModule],
  providers: [AtomRepository],
})
export class AtomDomainModule {}
