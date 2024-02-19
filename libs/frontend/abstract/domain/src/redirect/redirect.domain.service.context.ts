import { createContext } from 'mobx-keystone'
import type { IRedirectDomainService } from './redirect.domain.service.interface'

export const redirectDomainServiceContext =
  createContext<IRedirectDomainService>()

export const getRedirectDomainService = (self: object) => {
  const redirectService = redirectDomainServiceContext.get(self)

  if (!redirectService) {
    throw new Error('RedirectDomainService context is not defined')
  }

  return redirectService
}
