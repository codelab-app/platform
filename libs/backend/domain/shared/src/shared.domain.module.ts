import { AuthModule } from '@codelab/backend/application/shared'
import {
  Neo4jModule,
  OgmModule,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { OtelModule } from '@codelab/backend/infra/adapter/otel'
import { ValidationModule } from '@codelab/backend/infra/adapter/typebox'
import { Module } from '@nestjs/common'

@Module({
  exports: [OgmModule, ValidationModule, Neo4jModule, AuthModule, OtelModule],
  imports: [AuthModule, Neo4jModule, OgmModule, ValidationModule, OtelModule],
  providers: [],
})
export class SharedDomainModule {}
