import { IPropRepositoryToken } from '@codelab/backend/abstract/core'
import { DgraphModule } from '@codelab/backend/infra'
import { Global, Module, Provider } from '@nestjs/common'
import { PropRepository } from '../prop-repository'

const repositories: Array<Provider> = [
  {
    provide: IPropRepositoryToken,
    useClass: PropRepository,
  },
]

@Module({
  imports: [DgraphModule],
  providers: [...repositories],
  exports: [...repositories],
})
@Global()
export class PropInfrastructureModule {}
