import type { OnModuleDestroy } from '@nestjs/common'

import { CodelabLoggerModule } from '@codelab/backend-infra-adapter-logger'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { neo4jConfig } from './neo4j.config'
import { Neo4jService, Neo4jTrackingService } from './services'
import { DatabaseService } from './services/database.service'

@Module({
  exports: [Neo4jService, DatabaseService, Neo4jTrackingService],
  imports: [
    ConfigModule.forRoot({
      ignoreEnvVars: true,
      load: [neo4jConfig],
    }),
    CodelabLoggerModule,
  ],
  providers: [Neo4jService, DatabaseService, Neo4jTrackingService],
})
export class Neo4jModule implements OnModuleDestroy {
  constructor(private neo4jService: Neo4jService) {}

  async onModuleDestroy() {
    /**
     * Graphql subscriptions engine will close first, since GraphqlModule imports Neo4jModule
     *
     * But in case we import Neo4jModule without using GraphqlModule such as testing, we can close it here as well
     */
    await this.neo4jService.close()
  }
}
