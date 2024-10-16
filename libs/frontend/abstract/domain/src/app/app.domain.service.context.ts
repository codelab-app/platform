import { type AnyModel, createContext } from 'mobx-keystone'

import type { IAppDomainService } from './app.domain.service.interface'

export const appDomainServiceContext = createContext<IAppDomainService>()

export const getAppDomainService = (self: AnyModel) => {
  const appDomainService = appDomainServiceContext.get(self)

  if (!appDomainService) {
    throw new Error('appDomainServiceContext is not defined')
  }

  return appDomainService
}
