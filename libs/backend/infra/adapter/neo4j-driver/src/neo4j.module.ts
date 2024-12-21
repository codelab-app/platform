import type { OnModuleDestroy } from '@nestjs/common'

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { neo4jConfig } from './neo4j.config'
import { Neo4jService } from './services'
import { DatabaseService } from './services/database.service'

@Module({
  exports: [Neo4jService, DatabaseService],
  imports: [
    ConfigModule.forRoot({
      ignoreEnvVars: true,
      load: [neo4jConfig],
    }),
  ],
  providers: [Neo4jService, DatabaseService],
})
export class Neo4jModule implements OnModuleDestroy {
  constructor(private neo4jService: Neo4jService) {}

  async onModuleDestroy() {
    /**
     * Graphql subscriptions engine will close first, since GraphqlModule imports Neo4jModule
     *
     * But in case we import Neo4jModule without using GraphqlModule such as testing, we can close it her as well
     */
    await this.neo4jService.close()
  }
}
