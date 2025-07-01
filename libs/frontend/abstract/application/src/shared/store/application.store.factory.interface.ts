import type { Context } from 'mobx-keystone'

import type { IBuilderService } from '../../builder'
import type {
  IRendererService,
  IRuntimeComponentService,
  IRuntimeElementService,
  IRuntimePageService,
} from '../../renderer'
import type { IRouterService } from '../router.service.interface'
import type { IApplicationStore } from './application.store.interface'

// Import domain services from abstract domain
import type {
  IComponentDomainService,
  IUserDomainService,
} from '@codelab/frontend-abstract-domain'

type MaybeContext<T> = Context<T | undefined>

export interface IApplicationStoreFactoryDto {
  context: Partial<IApplicationStoreContext>
  store: Partial<IApplicationStore>
}

export interface IApplicationStoreContext {
  builderServiceContext: MaybeContext<IBuilderService>
  /**
   * Used in renderer
   */
  componentDomainServiceContext: MaybeContext<IComponentDomainService>
  rendererServiceContext: MaybeContext<IRendererService>
  routerServiceContext: MaybeContext<IRouterService>
  runtimeComponentServiceContext: MaybeContext<IRuntimeComponentService>
  runtimeElementServiceContext: MaybeContext<IRuntimeElementService>
  runtimePageServiceContext: MaybeContext<IRuntimePageService>
  userDomainServiceContext: MaybeContext<IUserDomainService>
}
