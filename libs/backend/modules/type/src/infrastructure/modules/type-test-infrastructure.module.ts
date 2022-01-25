import { Global, Module, Provider } from '@nestjs/common'
import { TypeInMemoryRepository } from '../repository/tests/TypeInMemoryRepository'
import {
  ITypeRepository,
  ITypeRepositoryToken,
} from '../repository/type/type-repository.interface'

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
