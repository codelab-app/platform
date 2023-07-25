import { Global, Module } from '@nestjs/common'
import { NEO4J_DRIVER_PROVIDER } from './neo4j.constant'
import { Neo4jDriverProvider } from './neo4j.provider'
import { Neo4jService } from './neo4j.service'

@Global()
@Module({
  exports: [NEO4J_DRIVER_PROVIDER, Neo4jService],
  providers: [Neo4jDriverProvider, Neo4jService],
})
export class Neo4jModule {}
