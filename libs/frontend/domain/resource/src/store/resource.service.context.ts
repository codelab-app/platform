import type { IResourceService } from '@codelab/frontend/abstract/core'
import { createContext } from 'mobx-keystone'

export const resourceServiceContext = createContext<IResourceService>()

export const getResourceService = (self: object) => {
  const resourceService = resourceServiceContext.get(self)

  if (!resourceService) {
    throw new Error('ResourceService context is not defined')
  }

  return resourceService
}
