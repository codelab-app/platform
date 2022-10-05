import { createContext } from 'mobx-keystone'
import { DomainService } from './domain.service'

export const domainServiceContext = createContext<DomainService>()

export const getDomainService = (self: object) => {
  const domainService = domainServiceContext.get(self)

  if (!domainService) {
    throw new Error('DomainServiceContext is not set')
  }

  return domainService
}
