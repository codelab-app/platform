import { OGMModule } from '@codelab/backend/infra/adapter/neo4j'
import { Module } from '@nestjs/common'
import { ComponentRepository } from './repository'

@Module({
  exports: [ComponentRepository],
  imports: [OGMModule],
  providers: [ComponentRepository],
})
export class ComponentDomainModule {}
