import { createContext } from 'mobx-keystone'
import type { IAppService } from './app.service.interface'

export const appServiceContext = createContext<IAppService>()

export const getAppService = (self: object) => {
  const appService = appServiceContext.get(self)

  if (!appService) {
    throw new Error('appServiceContext is not defined')
  }

  return appService
}
