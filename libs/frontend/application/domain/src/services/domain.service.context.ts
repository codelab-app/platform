import type { IDomainService } from '@codelab/frontend/abstract/application'
import { createContext } from 'mobx-keystone'

export const domainServiceContext = createContext<IDomainService>()

export const getDomainService = (self: object) => {
  const domainService = domainServiceContext.get(self)

  if (!domainService) {
    throw new Error('DomainServiceContext is not set')
  }

  return domainService
}
