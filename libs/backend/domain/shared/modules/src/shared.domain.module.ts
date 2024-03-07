import { AuthDomainModule } from '@codelab/backend/domain/shared/auth'
import { Neo4jModule, OgmModule } from '@codelab/backend/infra/adapter/neo4j'
import { OtelModule } from '@codelab/backend/infra/adapter/otel'
import { ValidationModule } from '@codelab/backend/infra/adapter/typebox'
import { Module } from '@nestjs/common'

@Module({
  exports: [
    OgmModule,
    ValidationModule,
    Neo4jModule,
    AuthDomainModule,
    OtelModule,
  ],
  imports: [
    AuthDomainModule,
    Neo4jModule,
    OgmModule,
    ValidationModule,
    OtelModule,
  ],
})
export class SharedDomainModule {}
