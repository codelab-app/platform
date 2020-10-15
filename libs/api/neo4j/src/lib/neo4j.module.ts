import { Module } from '@nestjs/common'
import { Neo4jController } from './neo4j.controller'
import { NEO4J_DRIVER_PROVIDER, neo4DriverProvider } from './neo4j.provider'
import { Neo4jService } from './neo4j.service'

@Module({
  imports: [],
  controllers: [Neo4jController],
  providers: [neo4DriverProvider, Neo4jService],
  exports: [NEO4J_DRIVER_PROVIDER, Neo4jService],
})
export class Neo4jModule {}
