import { type AnyModel, createContext } from 'mobx-keystone'

import type { IRedirectDomainService } from './redirect.domain.service.interface'

export const redirectDomainServiceContext =
  createContext<IRedirectDomainService>()

export const getRedirectDomainService = (self: AnyModel) => {
  const redirectDomainService = redirectDomainServiceContext.get(self)

  if (!redirectDomainService) {
    throw new Error('RedirectDomainService context is not defined')
  }

  return redirectDomainService
}
