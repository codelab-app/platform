import type { IBuilderService } from '@codelab/frontend/abstract/core'
import { createContext } from 'mobx-keystone'

export const builderServiceContext = createContext<IBuilderService>()

export const getBuilderService = (self: object) => {
  const builderService = builderServiceContext.get(self)

  if (!builderService) {
    throw new Error('builderServiceContext is not defined')
  }

  return builderService
}
