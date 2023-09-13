import { AuthModule } from '@codelab/backend/application/service'
import { OgmModule } from '@codelab/backend/infra/adapter/neo4j'
import { ValidationModule } from '@codelab/backend/infra/adapter/typebox'
import { Module } from '@nestjs/common'
import { TagRepository } from './repository'

@Module({
  exports: [TagRepository],
  imports: [OgmModule, AuthModule, ValidationModule],
  providers: [TagRepository],
})
export class TagDomainModule {}
