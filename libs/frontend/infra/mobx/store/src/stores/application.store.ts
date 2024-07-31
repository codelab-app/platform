import {
  type IApplicationStore,
  type IRendererService,
  type IRouterProps,
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
  RendererApplicationService,
  RuntimeComponentService,
  RuntimeElementService,
  RuntimePageService,
} from '@codelab/frontend-application-renderer/services'
import { RouterService } from '@codelab/frontend-application-shared-store/router'
import { Model, model, prop } from 'mobx-keystone'

export const createApplicationStore = (router: IRouterProps) => {
  @model('@codelab/ApplicationIStore')
  class ApplicationStore
    extends Model({
      rendererService: prop<IRendererService>(
        () => new RendererApplicationService({}),
      ),
      routerService: prop<IRouterService>(() => RouterService.init(router)),
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
    }
  }

  return new ApplicationStore({})
}
