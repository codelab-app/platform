import type { OnModuleDestroy } from '@nestjs/common'

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { NEO4J_DRIVER_PROVIDER } from './driver/neo4j-driver.constant'
import { Neo4jDriverProvider } from './driver/neo4j-driver.provider'
import { neo4jConfig } from './neo4j.config'
import { DatabaseService } from './services/database.service'
import { Neo4jService } from './services/neo4j.service'

@Module({
  exports: [NEO4J_DRIVER_PROVIDER, Neo4jService, DatabaseService],
  imports: [
    ConfigModule.forRoot({
      ignoreEnvVars: true,
      load: [neo4jConfig],
    }),
  ],
  providers: [Neo4jDriverProvider, Neo4jService, DatabaseService],
})
export class Neo4jModule implements OnModuleDestroy {
  constructor(private neo4jService: Neo4jService) {}

  async onModuleDestroy() {
    await this.neo4jService.driver.close()
  }
}
