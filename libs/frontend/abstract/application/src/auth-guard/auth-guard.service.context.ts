import { createContext } from 'mobx-keystone'
import type { IAuthGuardService } from './auth-guard.service.interface'

export const authGuardServiceContext = createContext<IAuthGuardService>()

export const getAuthGuardService = (self: object) => {
  const authGuardService = authGuardServiceContext.get(self)

  if (!authGuardService) {
    throw new Error('AuthGuardService context is not defined')
  }

  return authGuardService
}
