import { OGMModule } from '@codelab/backend/infra/adapter/neo4j'
import { Module } from '@nestjs/common'
import { PropRepository } from './repository'

@Module({
  exports: [PropRepository],
  imports: [OGMModule],
  providers: [PropRepository],
})
export class PropDomainModule {}
