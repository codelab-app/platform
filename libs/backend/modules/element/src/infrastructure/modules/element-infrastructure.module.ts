import {
  IElementRepositoryToken,
  IPropMapBindingsRepositoryToken,
} from '@codelab/backend/abstract/core'
import { DgraphModule } from '@codelab/backend/infra'
import { Global, Module, Provider } from '@nestjs/common'
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
