import { createContext } from 'mobx-keystone'
import type { IDomainDomainService } from './domain.domain.service.interface'

export const domainDomainServiceContext = createContext<IDomainDomainService>()

export const getDomainDomainService = (self: object) => {
  const domainDomainService = domainDomainServiceContext.get(self)

  if (!domainDomainService) {
    throw new Error('domainDomainServiceContext is not defined')
  }

  return domainDomainService
}
