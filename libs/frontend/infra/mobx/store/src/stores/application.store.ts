import type {
  IAtomModel,
  IComponentModel,
  ITagModel,
  ITypeModel,
} from '@codelab/frontend/abstract/domain'

import {
  builderServiceContext,
  type IApplicationStore,
  IBuilderService,
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
import { BuilderService } from '@codelab/frontend-application-builder/services'
import {
  RendererService,
  RuntimeComponentService,
  RuntimeElementService,
  RuntimePageService,
} from '@codelab/frontend-application-renderer/services'
import { PaginationService } from '@codelab/frontend-application-shared-store/pagination'
import { RouterService } from '@codelab/frontend-application-shared-store/router'
import { Model, model, prop } from 'mobx-keystone'

export const createApplicationStore = (router: IRouterProps) => {
  @model('@codelab/ApplicationIStore')
  class ApplicationStore
    extends Model({
      builderService: prop<IBuilderService>(
        () => new BuilderService({ hoveredNode: null, selectedNode: null }),
      ),
      pagination: prop(() => ({
        atomPagination: new PaginationService<IAtomModel>({}),
        componentPagination: new PaginationService<IComponentModel>({}),
        tagPagination: new PaginationService<ITagModel>({}),
        typePagination: new PaginationService<ITypeModel>({}),
      })),
      // add reference to domain store, so that all the models in ApplicationStore
      // can access refs from domain store (elements, components, apps, etc)
      rendererService: prop<IRendererService>(() => new RendererService({})),
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
      builderServiceContext.set(this, this.builderService)
    }
  }

  return new ApplicationStore({})
}
