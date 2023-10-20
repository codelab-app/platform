import { createContext } from 'mobx-keystone'
import type { IResourceService } from './resource.service.interface'

export const resourceServiceContext = createContext<IResourceService>()

export const getResourceService = (self: object) => {
  const resourceService = resourceServiceContext.get(self)

  if (!resourceService) {
    throw new Error('ResourceService context is not defined')
  }

  return resourceService
}
