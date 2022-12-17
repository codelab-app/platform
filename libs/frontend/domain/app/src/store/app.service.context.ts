import type { IAppService } from '@codelab/frontend/abstract/core'
import { createContext } from 'mobx-keystone'

export const appServiceContext = createContext<IAppService>()

export const getAppService = (self: object) => {
  const appService = appServiceContext.get(self)

  if (!appService) {
    throw new Error('appServiceContext is not defined')
  }

  return appService
}
