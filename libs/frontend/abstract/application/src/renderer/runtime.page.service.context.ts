import { type AnyModel, createContext } from 'mobx-keystone'
import type { IRuntimePageService } from './runtime.page.service.interface'

export const runtimePageServiceContext = createContext<IRuntimePageService>()

export const getRuntimePageService = (self: AnyModel) => {
  const runtimePageService = runtimePageServiceContext.get(self)

  if (!runtimePageService) {
    throw new Error('runtimePageServiceContext is not defined')
  }

  return runtimePageService
}
