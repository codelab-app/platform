import {
  DatabaseRegistry,
  DatabaseType,
  DrivineModule,
  DrivineModuleOptions,
} from '@liberation-data/drivine'
import { Global, Module } from '@nestjs/common'

@Global()
@Module({
  imports: [
    DrivineModule.withOptions(<DrivineModuleOptions>{
      connectionProviders: [
        DatabaseRegistry.getInstance()
          .builder()
          .withProperties({
            databaseType: DatabaseType.NEO4J,
            host: 'localhost',
            port: 7687,
            userName: 'neo4j',
            password: 'test',
          })
          .register(),
      ],
    }),
  ],
  exports: [],
})
export class Neo4jModule {}
