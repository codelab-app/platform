import {
  ITypeNeo4jRepositoryToken,
  ITypeRepositoryToken,
} from '@codelab/backend/abstract/core'
import { DgraphModule, Neo4jModule } from '@codelab/backend/infra'
import {
  DatabaseRegistry,
  DatabaseType,
  DrivineModule,
  DrivineModuleOptions,
} from '@liberation-data/drivine'
import { Global, Module, Provider } from '@nestjs/common'
import { TypeNeo4jRepository } from '../repository/type/type.neo4j.repository'
import { TypeRepository } from '../repository/type/type-repository'

const repositories: Array<Provider> = [
  {
    provide: ITypeRepositoryToken,
    useClass: TypeRepository,
  },
  {
    provide: ITypeNeo4jRepositoryToken,
    useClass: TypeNeo4jRepository,
  },
]

@Module({
  imports: [
    DgraphModule,
    /**
     * TODO: @Global Neo4jModule not working
     *
     * May have to create dynamic module and inject repository providers there
     */
    // Neo4jModule,
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
  providers: [...repositories],
  exports: [...repositories],
})
@Global()
export class TypeInfrastructureModule {}
