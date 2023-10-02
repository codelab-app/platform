import {
  AuthDomainModule,
  SharedDomainModule,
} from '@codelab/backend/domain/shared'
import { OgmModule } from '@codelab/backend/infra/adapter/neo4j'
import { ValidationModule } from '@codelab/backend/infra/adapter/typebox'
import { Module } from '@nestjs/common'
import { TagRepository } from './repository'

@Module({
  exports: [TagRepository],
  imports: [SharedDomainModule],
  providers: [TagRepository],
})
export class TagDomainModule {}
