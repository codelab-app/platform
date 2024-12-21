import type { OnModuleDestroy } from '@nestjs/common'

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { Neo4jDriverService } from './driver'
import { neo4jConfig } from './neo4j.config'
import { DatabaseService } from './services/database.service'

@Module({
  exports: [Neo4jDriverService, DatabaseService],
  imports: [
    ConfigModule.forRoot({
      ignoreEnvVars: true,
      load: [neo4jConfig],
    }),
  ],
  providers: [Neo4jDriverService, DatabaseService],
})
export class Neo4jModule implements OnModuleDestroy {
  constructor(private neo4jDriverService: Neo4jDriverService) {}

  async onModuleDestroy() {
    await this.neo4jDriverService.close()
  }
}
