import { Module } from '@nestjs/common'
import { Neo4jDriversController } from './neo4j-drivers.controller'
import {
  NEO4J_DRIVER_PROVIDER,
  neo4DriverProvider,
} from './neo4j-drivers.provider'
import { Neo4jDriversService } from './neo4j-drivers.service'

@Module({
  imports: [],
  controllers: [Neo4jDriversController],
  providers: [neo4DriverProvider, Neo4jDriversService],
  exports: [NEO4J_DRIVER_PROVIDER, Neo4jDriversService],
})
export class Neo4jDriversModule {}
