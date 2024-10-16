import { type AnyModel, createContext } from 'mobx-keystone'

import type { IBuilderService } from './builder.service.interface'

export const builderServiceContext = createContext<IBuilderService>()

export const getBuilderService = (self: AnyModel) => {
  const BuilderService = builderServiceContext.get(self)

  if (!BuilderService) {
    throw new Error('builderServiceContext is not defined')
  }

  return BuilderService
}
