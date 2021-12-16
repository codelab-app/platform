import { InMemoryRepository } from '@codelab/backend/infra'
import { Global, Module, Provider } from '@nestjs/common'
import {
  IHookRepository,
  IHookRepositoryToken,
} from '../hook-repository.interface'

const repositories: Array<Provider> = [
  {
    provide: IHookRepositoryToken,
    useValue: new InMemoryRepository() as IHookRepository,
  },
]

/** Use for unit tests */
@Global()
@Module({
  imports: [],
  providers: [...repositories],
  exports: [...repositories],
})
export class HookTestInfrastructureModule {}
