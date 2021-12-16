import { DgraphModule } from '@codelab/backend/infra'
import { Module, Provider } from '@nestjs/common'
import { ElementRepository } from './element.repository'
import { IElementRepositoryToken } from './element-repository.interface'
import { HooksRepository } from './hooks.repository'
import { IHooksRepositoryToken } from './hooks-repository.interface'
import { PropMapBindingsRepository } from './prop-map-bindings.repository'
import { IPropMapBindingsRepositoryToken } from './prop-map-bindings-repository.interface'
import { PropsRepository } from './props.repository'
import { IPropsRepositoryToken } from './props-repository.interface'

const repositories: Array<Provider> = [
  {
    provide: IElementRepositoryToken,
    useClass: ElementRepository,
  },
  {
    provide: IHooksRepositoryToken,
    useClass: HooksRepository,
  },
  {
    provide: IPropMapBindingsRepositoryToken,
    useClass: PropMapBindingsRepository,
  },
  {
    // TODO move this to props module
    provide: IPropsRepositoryToken,
    useClass: PropsRepository,
  },
]

@Module({
  imports: [DgraphModule],
  providers: [...repositories],
  exports: [...repositories],
})
export class ElementInfrastructureModule {}
