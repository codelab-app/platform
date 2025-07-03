import type { IDomainStore } from '@codelab/frontend-abstract-domain'

import {
  builderServiceContext,
  rendererServiceContext,
  routerServiceContext,
  runtimeComponentServiceContext,
  runtimeElementServiceContext,
  runtimePageServiceContext,
} from '@codelab/frontend-abstract-application'
import { BuilderService } from '@codelab/frontend-application-builder/services'
import {
  RendererService,
  RuntimeComponentService,
  RuntimeElementService,
  RuntimePageService,
} from '@codelab/frontend-application-renderer/services'
import { RouterService } from '@codelab/frontend-application-shared-services/router'
import { applicationStoreFactory } from '@codelab/frontend-application-shared-store'

export const createApplicationStore = (domainStore: IDomainStore) => {
  const store = applicationStoreFactory(
    {
      context: {
        builderServiceContext,
        rendererServiceContext,
        routerServiceContext,
        runtimeComponentServiceContext,
        runtimeElementServiceContext,
        runtimePageServiceContext,
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
    },
    domainStore,
  )

  return store
}
