import { createContext } from 'mobx-keystone'
import type { IComponentApplicationService } from './component.application.service.interface'

// This can be used to access the type store from anywhere inside the mobx-keystone tree
export const componentServiceContext =
  createContext<IComponentApplicationService>()

export const getComponentService = (self: object) => {
  const componentService = componentServiceContext.get(self)

  if (!componentService) {
    throw new Error('componentServiceContext is not set')
  }

  return componentService
}
