import type {
  IApplicationStore,
  IApplicationStoreFactoryDto,
  IBuilderService,
  IRendererService,
  IRouterService,
  IRuntimeComponentService,
  IRuntimeElementService,
  IRuntimePageService,
} from '@codelab/frontend-abstract-application'

import {
  componentDomainServiceContext,
  IDomainStore,
  userDomainServiceContext,
} from '@codelab/frontend-abstract-domain'
import { Model, model, prop } from 'mobx-keystone'

/**
 * Create a factory for the application store structure, but only pass in interface for the props.
 * This way we don't get circular dependencies.
 */
export const applicationStoreFactory = (
  { context, store }: IApplicationStoreFactoryDto,
  domainStore: IDomainStore,
) => {
  @model('@codelab/ApplicationStore')
  class ApplicationStore
    extends Model({
      builderService: prop<IBuilderService>(),
      rendererService: prop<IRendererService>(),
      routerService: prop<IRouterService>(),
      runtimeComponentService: prop<IRuntimeComponentService>(),
      runtimeElementService: prop<IRuntimeElementService>(),
      runtimePageService: prop<IRuntimePageService>(),
    })
    implements IApplicationStore
  {
    clear() {
      //
    }

    protected override onInit() {
      context.builderServiceContext.set(this, this.builderService)
      context.rendererServiceContext.set(this, this.rendererService)
      context.routerServiceContext.set(this, this.routerService)
      context.runtimeComponentServiceContext.set(
        this,
        this.runtimeComponentService,
      )
      context.runtimeElementServiceContext.set(this, this.runtimeElementService)
      context.runtimePageServiceContext.set(this, this.runtimePageService)

      /**
       * Need to use existing context on the store
       */
      userDomainServiceContext.set(this, domainStore.userDomainService)

      componentDomainServiceContext.set(
        this,
        domainStore.componentDomainService,
      )
    }
  }

  return new ApplicationStore(store) as IApplicationStore
}
