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
} from '@codelab/frontend-abstract-application'
import {
  componentDomainServiceContext,
  type IDomainStore,
  userDomainServiceContext,
} from '@codelab/frontend-abstract-domain'
import { BuilderService } from '@codelab/frontend-application-builder/services'
import {
  RendererService,
  RuntimeComponentService,
  RuntimeElementService,
  RuntimePageService,
} from '@codelab/frontend-application-renderer/services'
import { RouterService } from '@codelab/frontend-application-shared-services/router'
import { applicationStoreFactory } from '@codelab/frontend-application-shared-store'
import { Model, model, prop } from 'mobx-keystone'

export const createApplicationStore = () => {
  const store = applicationStoreFactory({
    context: {
      builderServiceContext,
      rendererServiceContext,
      routerServiceContext,
    },
    store: {
      builderService: new BuilderService({
        hoveredNode: null,
        selectedNode: null,
      }),
      rendererService: new RendererService({}),
      routerService: new RouterService({}),
      runtimeComponentService: new RuntimeComponentService({}),
      runtimeElementService: new RuntimeElementService({}),
      runtimePageService: new RuntimePageService({}),
    },
  })

  return store
}
