import { type AnyModel, createContext } from 'mobx-keystone'
import type { IComponentDomainService } from './component.domain.service.interface'

// This can be used to access the type store from anywhere inside the mobx-keystone tree
export const componentDomainServiceContext =
  createContext<IComponentDomainService>()

export const getComponentDomainService = (self: AnyModel) => {
  const componentService = componentDomainServiceContext.get(self)

  if (!componentService) {
    throw new Error('componentDomainServiceContext is not set')
  }

  return componentService
}
