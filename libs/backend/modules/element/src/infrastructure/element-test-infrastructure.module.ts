import { InMemoryRepository } from '@codelab/backend/abstract/core'
import { Module, Provider } from '@nestjs/common'
import {
  IElementRepository,
  IElementRepositoryToken,
} from './element-repository.interface'
import {
  IHooksRepository,
  IHooksRepositoryToken,
} from './hooks-repository.interface'
import {
  IPropMapBindingsRepository,
  IPropMapBindingsRepositoryToken,
} from './prop-map-bindings-repository.interface'
import {
  IPropsRepository,
  IPropsRepositoryToken,
} from './props-repository.interface'

const repositories: Array<Provider> = [
  {
    provide: IElementRepositoryToken,
    useValue: new InMemoryRepository() as IElementRepository,
  },
  {
    provide: IHooksRepositoryToken,
    useValue: new InMemoryRepository() as IHooksRepository,
  },
  {
    provide: IPropMapBindingsRepositoryToken,
    useValue: new InMemoryRepository() as IPropMapBindingsRepository,
  },
  {
    // TODO move this to props module
    provide: IPropsRepositoryToken,
    useValue: new InMemoryRepository() as IPropsRepository,
  },
]

/** Used for unit tests */
@Module({
  imports: [],
  providers: [...repositories],
  exports: [...repositories],
})
export class ElementTestModule {}
