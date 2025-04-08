import {
  builderServiceContext,
  type IApplicationStore,
  type IBuilderService,
  type IRendererService,
  type IRouterService,
  type IRuntimeComponentService,
  type IRuntimeElementService,
  type IRuntimePageService,
  rendererServiceContext,
  routerServiceContext,
  runtimeComponentServiceContext,
  runtimeElementServiceContext,
  runtimePageServiceContext,
} from '@codelab/frontend/abstract/application'
import {
  componentDomainServiceContext,
  type IDomainStore,
  userDomainServiceContext,
} from '@codelab/frontend/abstract/domain'
import {
  BUILDER_SERVICE,
  BuilderService,
} from '@codelab/frontend-application-builder/services'
import {
  RendererService,
  RuntimeComponentService,
  RuntimeElementService,
  RuntimePageService,
} from '@codelab/frontend-application-renderer/services'
import { RouterService } from '@codelab/frontend-application-shared-store/router'
import {
  fromSnapshot,
  Model,
  model,
  prop,
  SnapshotInOf,
  SnapshotOutOf,
} from 'mobx-keystone'

export const createApplicationStore = (
  domainStore: IDomainStore,
  {
    builderServiceSnapshot,
  }: {
    builderServiceSnapshot?: SnapshotInOf<IBuilderService>
  } = {},
) => {
  const builderService = builderServiceSnapshot
    ? fromSnapshot<IBuilderService>(builderServiceSnapshot)
    : new BuilderService({ hoveredNode: null, selectedNode: null })

  @model('@codelab/ApplicationIStore')
  class ApplicationStore
    extends Model({
      builderService: prop<IBuilderService>(() => builderService),
      // add reference to domain store, so that all the models in ApplicationStore
      // can access refs from domain store (elements, components, apps, etc)
      rendererService: prop<IRendererService>(() => new RendererService({})),
      routerService: prop<IRouterService>(() => new RouterService({})),
      runtimeComponentService: prop<IRuntimeComponentService>(
        () => new RuntimeComponentService({}),
      ),
      runtimeElementService: prop<IRuntimeElementService>(
        () => new RuntimeElementService({}),
      ),
      runtimePageService: prop<IRuntimePageService>(
        () => new RuntimePageService({}),
      ),
    })
    implements IApplicationStore
  {
    protected onInit() {
      rendererServiceContext.set(this, this.rendererService)
      runtimeElementServiceContext.set(this, this.runtimeElementService)
      runtimeComponentServiceContext.set(this, this.runtimeComponentService)
      runtimePageServiceContext.set(this, this.runtimePageService)
      routerServiceContext.set(this, this.routerService)
      builderServiceContext.set(this, this.builderService)
      userDomainServiceContext.set(this, domainStore.userDomainService)
      componentDomainServiceContext.set(
        this,
        domainStore.componentDomainService,
      )
    }
  }

  return new ApplicationStore({})
}
