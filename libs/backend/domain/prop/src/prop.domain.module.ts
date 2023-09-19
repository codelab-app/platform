import { OgmModule } from '@codelab/backend/infra/adapter/neo4j'
import { ValidationModule } from '@codelab/backend/infra/adapter/typebox'
import { Module } from '@nestjs/common'
import { PropRepository } from './repository'

@Module({
  exports: [PropRepository],
  imports: [OgmModule, ValidationModule],
  providers: [PropRepository],
})
export class PropDomainModule {}
