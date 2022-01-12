import { InMemoryRepository } from '@codelab/backend/infra'
import { Global, Module, Provider } from '@nestjs/common'
import {
  IElementRepository,
  IElementRepositoryToken,
} from '../repositories/abstract/element-repository.interface'
import {
  IPropMapBindingsRepository,
  IPropMapBindingsRepositoryToken,
} from '../repositories/abstract/prop-map-binding-repository.interface'
import { ElementInMemoryRepository } from '../repositories/in-memory/element-in-memory-repository'

const repositories: Array<Provider> = [
  {
    provide: IElementRepositoryToken,
    useValue: new ElementInMemoryRepository() as IElementRepository,
  },
  {
    provide: IPropMapBindingsRepositoryToken,
    useValue: new InMemoryRepository() as IPropMapBindingsRepository,
  },
]

/** Used for unit tests */
@Module({
  imports: [],
  providers: [...repositories],
  exports: [...repositories],
})
@Global()
export class ElementTestInfrastructureModule {}
