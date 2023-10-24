import { createContext } from 'mobx-keystone'
import type { IPageDomainService } from './page.domain.service.interface'

export const pageDomainServiceContext = createContext<IPageDomainService>()

export const getPageDomainService = (self: object) => {
  const pageService = pageDomainServiceContext.get(self)

  if (!pageService) {
    throw new Error('pageDomainServiceContext is not defined')
  }

  return pageService
}
