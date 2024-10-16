import { type AnyModel, createContext } from 'mobx-keystone'

import type { IRuntimeElementService } from './runtime.element.service.interface'

export const runtimeElementServiceContext =
  createContext<IRuntimeElementService>()

export const getRuntimeElementService = (self: AnyModel) => {
  const runtimeElementService = runtimeElementServiceContext.get(self)

  if (!runtimeElementService) {
    throw new Error('runtimeElementServiceContext is not defined')
  }

  return runtimeElementService
}
