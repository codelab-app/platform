import { createContext } from 'mobx-keystone'
import type { IStoreDomainService } from './store.domain.service.interface'

export const storeDomainServiceContext = createContext<IStoreDomainService>()

export const getStoreDomainService = (self: object) => {
  const storeDomainService = storeDomainServiceContext.get(self)

  if (!storeDomainService) {
    throw new Error('storeDomainServiceContext is not defined')
  }

  return storeDomainService
}
