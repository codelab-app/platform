import { Module } from '@nestjs/common'
import { GraphqlNodeModule } from '../graphql'
import { Neo4jNodeController } from './neo4j-node.controller'
import { Neo4jNodeService } from './neo4j-node.service'
import { Neo4jSchemaService } from './neo4j-schema.service'
import { NEO4J_DRIVERS_PROVIDER, neo4DriversProvider } from './neo4j.provider'

@Module({
  imports: [GraphqlNodeModule],
  controllers: [Neo4jNodeController],
  providers: [Neo4jNodeService, neo4DriversProvider, Neo4jSchemaService],
  exports: [NEO4J_DRIVERS_PROVIDER, Neo4jSchemaService],
})
export class Neo4jNodeModule {}
