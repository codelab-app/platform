import { createContext } from 'mobx-keystone'
import type { IBuilderService } from './builder.service.interface'

export const builderServiceContext = createContext<IBuilderService>()

export const getBuilderService = (self: object) => {
  const builderService = builderServiceContext.get(self)

  if (!builderService) {
    throw new Error('builderServiceContext is not defined')
  }

  return builderService
}
