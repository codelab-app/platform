import { AuthModule } from '@codelab/backend/application/shared'
import {
  Neo4jModule,
  OgmModule,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { ValidationModule } from '@codelab/backend/infra/adapter/typebox'
import { Module } from '@nestjs/common'

@Module({
  exports: [OgmModule, ValidationModule, Neo4jModule, AuthModule],
  imports: [AuthModule, Neo4jModule, OgmModule, ValidationModule],
  providers: [],
})
export class SharedDomainModule {}
