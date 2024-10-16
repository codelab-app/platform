import { type AnyModel, createContext } from 'mobx-keystone'

import type { IPageDomainService } from './page.domain.service.interface'

export const pageDomainServiceContext = createContext<IPageDomainService>()

export const getPageDomainService = (self: AnyModel) => {
  const pageDomainService = pageDomainServiceContext.get(self)

  if (!pageDomainService) {
    throw new Error('pageDomainServiceContext is not defined')
  }

  return pageDomainService
}
