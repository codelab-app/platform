import { OgmModule } from '@codelab/backend/infra/adapter/neo4j'
import { Module } from '@nestjs/common'
import { PropRepository } from './repository'

@Module({
  exports: [PropRepository],
  imports: [OgmModule],
  providers: [PropRepository],
})
export class PropDomainModule {}
