import { IHookRepositoryToken } from '@codelab/backend/abstract/core'
import { DgraphModule } from '@codelab/backend/infra'
import { Global, Module, Provider } from '@nestjs/common'
import { HookRepository } from '../hook-repository'

const repositories: Array<Provider> = [
  {
    provide: IHookRepositoryToken,
    useClass: HookRepository,
  },
]

@Module({
  imports: [DgraphModule],
  providers: [...repositories],
  exports: [...repositories],
})
@Global()
export class HookInfrastructureModule {}
