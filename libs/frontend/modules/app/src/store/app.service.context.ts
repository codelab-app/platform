// This can be used to access the type store from anywhere inside the mobx-keystone tree
import { IAppService } from '@codelab/shared/abstract/core'
import { createContext } from 'mobx-keystone'

export const appServiceContext = createContext<IAppService>()

export const getAppService = (self: any) => {
  const appService = appServiceContext.get(self)

  if (!appService) {
    throw new Error('appServiceContext is not defined')
  }

  return appService
}
