import { DgraphModule } from '@codelab/backend/infra'
import { Global, Module, Provider } from '@nestjs/common'
import { PropRepository } from '../prop-repository'
import { IPropRepositoryToken } from '../props-repository.interface'

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
