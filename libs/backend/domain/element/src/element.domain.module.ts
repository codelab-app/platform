import { OGMModule } from '@codelab/backend/infra/adapter/neo4j'
import { Module } from '@nestjs/common'
import { ElementRepository } from './repository'

@Module({
  exports: [ElementRepository],
  imports: [OGMModule],
  providers: [ElementRepository],
})
export class ElementDomainModule {}
