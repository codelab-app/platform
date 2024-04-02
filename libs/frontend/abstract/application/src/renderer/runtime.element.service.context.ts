import { createContext } from 'mobx-keystone'
import type { IRuntimeElementService } from './runtime.element.service.interface'

export const runtimeElementServiceContext =
  createContext<IRuntimeElementService>()

export const getRuntimeElementService = (self: object) => {
  const runtimeElementService = runtimeElementServiceContext.get(self)

  if (!runtimeElementService) {
    throw new Error('runtimeElementServiceContext is not defined')
  }

  return runtimeElementService
}
