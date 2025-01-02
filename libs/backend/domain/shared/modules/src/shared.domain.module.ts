import { AuthDomainModule } from '@codelab/backend/domain/shared/auth'
import { ValidationModule } from '@codelab/backend/infra/adapter/validation'
import { Neo4jModule } from '@codelab/backend-infra-adapter/neo4j-driver'
import { Module } from '@nestjs/common'

@Module({
  exports: [AuthDomainModule, Neo4jModule, ValidationModule],
  imports: [AuthDomainModule, Neo4jModule, ValidationModule],
})
export class SharedDomainModule {}
