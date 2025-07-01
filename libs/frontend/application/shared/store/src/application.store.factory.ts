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
import type {
  IComponentDomainService,
  IUserDomainService,
} from '@codelab/frontend-abstract-domain'

import { Model, model, prop, registerRootStore } from 'mobx-keystone'

/**
 * Create a factory for the application store structure, but only pass in interface for the props.
 * This way we don't get circular dependencies.
 */
export const applicationStoreFactory = ({
  context,
  store,
}: IApplicationStoreFactoryDto) => {
  @model('@codelab/ApplicationStore')
  class ApplicationStore
    extends Model({
      builderService: prop<IBuilderService | undefined>(undefined),
      componentDomainService: prop<IComponentDomainService | undefined>(
        undefined,
      ),
      rendererService: prop<IRendererService | undefined>(undefined),
      routerService: prop<IRouterService | undefined>(undefined),
      runtimeComponentService: prop<IRuntimeComponentService | undefined>(
        undefined,
      ),
      runtimeElementService: prop<IRuntimeElementService | undefined>(
        undefined,
      ),
      runtimePageService: prop<IRuntimePageService | undefined>(undefined),
    })
    implements Partial<IApplicationStore>
  {
    clear() {
      //
    }

    protected override onInit() {
      this.builderService &&
        context.builderServiceContext?.set(this, this.builderService)
      this.rendererService &&
        context.rendererServiceContext?.set(this, this.rendererService)
      this.routerService &&
        context.routerServiceContext?.set(this, this.routerService)
      this.runtimeComponentService &&
        context.runtimeComponentServiceContext?.set(
          this,
          this.runtimeComponentService,
        )
      this.runtimeElementService &&
        context.runtimeElementServiceContext?.set(
          this,
          this.runtimeElementService,
        )
      this.runtimePageService &&
        context.runtimePageServiceContext?.set(this, this.runtimePageService)

      registerRootStore(this)
    }
  }

  return new ApplicationStore(store) as IApplicationStore
}
