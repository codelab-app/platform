import {
  ITypeRepository,
  ITypeRepositoryToken,
} from '@codelab/backend/abstract/core'
import { Global, Module, Provider } from '@nestjs/common'
import { TypeInMemoryRepository } from '../repository/tests/TypeInMemoryRepository'

const repositories: Array<Provider> = [
  {
    provide: ITypeRepositoryToken,
    useValue: new TypeInMemoryRepository() as ITypeRepository,
  },
]

/** Use for unit tests */
@Module({
  imports: [],
  providers: [...repositories],
  exports: [...repositories],
})
@Global()
export class TypeTestInfrastructureModule {}
