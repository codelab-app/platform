import { type AnyModel, createContext } from 'mobx-keystone'

import type { IResourceDomainService } from './resource.domain.service.interface'

export const resourceDomainServiceContext =
  createContext<IResourceDomainService>()

export const getResourceDomainService = (self: AnyModel) => {
  const resourceService = resourceDomainServiceContext.get(self)

  if (!resourceService) {
    throw new Error('ResourceDomainService context is not defined')
  }

  return resourceService
}
