// This can be used to access the type store from anywhere inside the mobx-keystone tree
import { createContext } from 'mobx-keystone'
import { AppService } from './app.service'

export const appServiceContext = createContext<AppService>()

export const getAppService = (self: any) => {
  const appService = appServiceContext.get(self)

  if (!appService) {
    throw new Error('appServiceContext is not defined')
  }

  return appService
}
