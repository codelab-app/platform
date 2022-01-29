import {
  IPropRepository,
  IPropRepositoryToken,
} from '@codelab/backend/abstract/core'
import { InMemoryRepository } from '@codelab/backend/infra'
import { IProp } from '@codelab/shared/abstract/core'
import { Global, Module, Provider } from '@nestjs/common'

const repositories: Array<Provider> = [
  {
    provide: IPropRepositoryToken,
    useValue: new InMemoryRepository<IProp>() as IPropRepository,
  },
]

/** Use for unit tests */
@Global()
@Module({
  imports: [],
  providers: [...repositories],
  exports: [...repositories],
})
export class PropTestInfrastructureModule {}
