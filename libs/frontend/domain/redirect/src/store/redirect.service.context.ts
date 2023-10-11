import type { IRedirectService } from '@codelab/frontend/abstract/domain'
import { createContext } from 'mobx-keystone'

export const redirectServiceContext = createContext<IRedirectService>()

export const getRedirectService = (self: object) => {
  const redirectService = redirectServiceContext.get(self)

  if (!redirectService) {
    throw new Error('redirectServiceContext is not defined')
  }

  return redirectService
}
