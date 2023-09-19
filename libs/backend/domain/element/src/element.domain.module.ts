import { SharedDomainModule } from '@codelab/backend/domain/shared'
import { OgmModule } from '@codelab/backend/infra/adapter/neo4j'
import { ValidationModule } from '@codelab/backend/infra/adapter/typebox'
import { Module } from '@nestjs/common'
import { ElementRepository } from './repository'

@Module({
  exports: [ElementRepository],
  imports: [SharedDomainModule],
  providers: [ElementRepository],
})
export class ElementDomainModule {}
