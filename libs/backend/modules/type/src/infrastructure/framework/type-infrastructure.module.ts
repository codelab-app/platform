import { ITypeRepositoryToken } from '@codelab/backend/abstract/core'
import { DgraphModule } from '@codelab/backend/infra'
import { Global, Module, Provider } from '@nestjs/common'
import { TypeRepository } from '../repository/type/type-repository'

const repositories: Array<Provider> = [
  {
    provide: ITypeRepositoryToken,
    useClass: TypeRepository,
  },
]

@Module({
  imports: [DgraphModule],
  providers: [...repositories],
  exports: [...repositories],
})
@Global()
export class TypeInfrastructureModule {}
