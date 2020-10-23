import { Module } from '@nestjs/common'
import {
  NEO4J_DATABASE_PROVIDER,
  neo4DatabaseProvider,
} from './neo4j-database.provider'

@Module({
  providers: [neo4DatabaseProvider],
  exports: [NEO4J_DATABASE_PROVIDER],
})
export class Neo4jDatabaseModule {}
