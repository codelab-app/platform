import { DgraphModule } from '@codelab/backend/infra'
import { Global, Module, Provider } from '@nestjs/common'
import { IElementRepositoryToken } from '../repositories/abstract/element-repository.interface'
import { IPropMapBindingsRepositoryToken } from '../repositories/abstract/prop-map-binding-repository.interface'
import { ElementRepository } from '../repositories/dgraph/element-repository'
import { PropMapBindingRepository } from '../repositories/dgraph/prop-map-binding-repository'

const repositories: Array<Provider> = [
  {
    provide: IElementRepositoryToken,
    useClass: ElementRepository,
  },
  {
    provide: IPropMapBindingsRepositoryToken,
    useClass: PropMapBindingRepository,
  },
]

@Module({
  imports: [DgraphModule],
  providers: [...repositories],
  exports: [...repositories],
})
@Global() // Needs to be global in order to be picked up by ElementCoreModule
export class ElementInfrastructureModule {}
