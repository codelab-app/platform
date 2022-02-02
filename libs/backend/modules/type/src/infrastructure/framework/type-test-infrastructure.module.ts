import {
  ITypeNeo4jRepositoryToken,
  ITypeRepository,
  ITypeRepositoryToken,
} from '@codelab/backend/abstract/core'
import { Neo4jModule } from '@codelab/backend/infra'
import { Global, Module, Provider } from '@nestjs/common'
import { TypeInMemoryRepository } from '../repository/tests/TypeInMemoryRepository'
import { TypeNeo4jRepository } from '../repository/type/type.neo4j.repository'

const repositories: Array<Provider> = [
  {
    provide: ITypeRepositoryToken,
    useValue: new TypeInMemoryRepository() as ITypeRepository,
  },
  // {
  //   provide: ITypeNeo4jRepositoryToken,
  //   useClass: TypeNeo4jRepository,
  // },
]

/** Use for unit tests */
@Module({
  imports: [],
  providers: [...repositories],
  exports: [...repositories],
})
@Global()
export class TypeTestInfrastructureModule {}
