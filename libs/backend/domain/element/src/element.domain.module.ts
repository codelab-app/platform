import { OgmModule } from '@codelab/backend/infra/adapter/neo4j'
import { ValidationModule } from '@codelab/backend/infra/adapter/typebox'
import { Module } from '@nestjs/common'
import { ElementRepository } from './repository'

@Module({
  exports: [ElementRepository],
  imports: [OgmModule, ValidationModule],
  providers: [ElementRepository],
})
export class ElementDomainModule {}
