import { OgmModule } from '@codelab/backend/infra/adapter/neo4j'
import { Module } from '@nestjs/common'
import { ElementRepository } from './repository'

@Module({
  exports: [ElementRepository],
  imports: [OgmModule],
  providers: [ElementRepository],
})
export class ElementDomainModule {}
