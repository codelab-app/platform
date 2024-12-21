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
    await this.neo4jService.close()
  }
}
