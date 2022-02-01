import { IAtomRepositoryToken } from '@codelab/backend/abstract/core'
import { DgraphModule } from '@codelab/backend/infra'
import { Global, Module, Provider } from '@nestjs/common'
import { AtomRepository } from '../repositories/atom.repository'

const repositories: Array<Provider> = [
  {
    provide: IAtomRepositoryToken,
    useClass: AtomRepository,
  },
]

@Module({
  imports: [DgraphModule],
  providers: [...repositories],
  exports: [...repositories],
})
@Global()
export class AtomInfrastructureModule {}
