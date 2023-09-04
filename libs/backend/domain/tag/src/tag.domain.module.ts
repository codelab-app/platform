import { OgmModule } from '@codelab/backend/infra/adapter/neo4j'
import { Module } from '@nestjs/common'
import { TagRepository } from './repository'

@Module({
  exports: [TagRepository],
  imports: [OgmModule],
  providers: [TagRepository],
})
export class TagDomainModule {}
