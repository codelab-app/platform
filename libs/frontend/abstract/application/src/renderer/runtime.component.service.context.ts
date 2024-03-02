import { createContext } from 'mobx-keystone'
import type { IRuntimeComponentService } from './runtime.component.service.interface'

export const runtimeComponentServiceContext =
  createContext<IRuntimeComponentService>()

export const getRuntimeComponentService = (self: object) => {
  const runtimeComponentService = runtimeComponentServiceContext.get(self)

  if (!runtimeComponentService) {
    throw new Error('runtimeComponentServiceContext is not defined')
  }

  return runtimeComponentService
}
