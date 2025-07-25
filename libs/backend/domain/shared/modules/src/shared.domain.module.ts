import { AuthDomainModule } from '@codelab/backend-domain-shared-auth'
import { Neo4jModule } from '@codelab/backend-infra-adapter-neo4j-driver'
import { Module } from '@nestjs/common'

@Module({
  exports: [AuthDomainModule, Neo4jModule],
  imports: [AuthDomainModule, Neo4jModule],
})
export class SharedDomainModule {}
