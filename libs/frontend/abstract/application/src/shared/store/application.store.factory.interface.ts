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

type MaybeContext<T> = Context<T | undefined>

export interface IApplicationStoreFactoryDto {
  context: IApplicationStoreContext
  store: IApplicationStore
}

export interface IApplicationStoreContext {
  builderServiceContext: MaybeContext<IBuilderService>
  rendererServiceContext: MaybeContext<IRendererService>
  routerServiceContext: MaybeContext<IRouterService>
  runtimeComponentServiceContext: MaybeContext<IRuntimeComponentService>
  runtimeElementServiceContext: MaybeContext<IRuntimeElementService>
  runtimePageServiceContext: MaybeContext<IRuntimePageService>
}
