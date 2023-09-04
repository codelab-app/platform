import { OGMModule } from '@codelab/backend/infra/adapter/neo4j'
import { Module } from '@nestjs/common'
import { TagRepository } from './repository'

@Module({
  exports: [TagRepository],
  imports: [OGMModule],
  providers: [TagRepository],
})
export class TagDomainModule {}
