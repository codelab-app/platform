import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { neo4jConfig } from '../neo4j.config'
import { NEO4J_DRIVER_PROVIDER } from './neo4j.constant'
import { Neo4jDriverProvider } from './neo4j.provider'
import { Neo4jService } from './neo4j.service'

@Module({
  exports: [NEO4J_DRIVER_PROVIDER, Neo4jService],
  imports: [
    ConfigModule.forRoot({
      ignoreEnvVars: true,
      load: [neo4jConfig],
    }),
  ],
  providers: [Neo4jDriverProvider, Neo4jService],
})
export class Neo4jModule {}
