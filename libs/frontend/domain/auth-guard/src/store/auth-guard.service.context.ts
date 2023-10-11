import type { IAuthGuardService } from '@codelab/frontend/abstract/domain'
import { createContext } from 'mobx-keystone'

export const authGuardServiceContext = createContext<IAuthGuardService>()

export const getAuthGuardService = (self: object) => {
  const authGuardService = authGuardServiceContext.get(self)

  if (!authGuardService) {
    throw new Error('AuthGuardService context is not defined')
  }

  return authGuardService
}
