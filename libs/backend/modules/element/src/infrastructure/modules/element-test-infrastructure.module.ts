import {
  IElementRepository,
  IElementRepositoryToken,
  IPropMapBindingsRepository,
  IPropMapBindingsRepositoryToken,
} from '@codelab/backend/abstract/core'
import { InMemoryRepository } from '@codelab/backend/infra'
import { Global, Module, Provider } from '@nestjs/common'
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
