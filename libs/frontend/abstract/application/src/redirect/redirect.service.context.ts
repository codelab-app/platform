import { createContext } from 'mobx-keystone'
import type { IRedirectService } from './redirect.service.interface'

export const redirectServiceContext = createContext<IRedirectService>()

export const getRedirectService = (self: object) => {
  const redirectService = redirectServiceContext.get(self)

  if (!redirectService) {
    throw new Error('RedirectService context is not defined')
  }

  return redirectService
}
