import {
  builderServiceContext,
  rendererServiceContext,
  routerServiceContext,
  runtimeComponentServiceContext,
  runtimeElementServiceContext,
  runtimePageServiceContext,
} from '@codelab/frontend-abstract-application'
import {
  componentDomainServiceContext,
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

export const createApplicationStore = () => {
  const store = applicationStoreFactory({
    context: {
      builderServiceContext,
      componentDomainServiceContext,
      rendererServiceContext,
      routerServiceContext,
      runtimeComponentServiceContext,
      runtimeElementServiceContext,
      runtimePageServiceContext,
      userDomainServiceContext,
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
