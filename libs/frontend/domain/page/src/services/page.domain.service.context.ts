import type { IPageDomainService } from '@codelab/frontend/abstract/domain'
import { createContext } from 'mobx-keystone'

export const pageDomainServiceContext = createContext<IPageDomainService>()

export const getPageDomainService = (self: object) => {
  const pageService = pageDomainServiceContext.get(self)

  if (!pageService) {
    throw new Error('pageDomainServiceContext is not defined')
  }

  return pageService
}
