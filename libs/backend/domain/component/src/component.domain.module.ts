import { OgmModule } from '@codelab/backend/infra/adapter/neo4j'
import { ValidationModule } from '@codelab/backend/infra/adapter/typebox'
import { Module } from '@nestjs/common'
import { ComponentRepository } from './repository'

@Module({
  exports: [ComponentRepository],
  imports: [OgmModule, ValidationModule],
  providers: [ComponentRepository],
})
export class ComponentDomainModule {}
