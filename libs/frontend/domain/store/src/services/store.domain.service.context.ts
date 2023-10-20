import type { IStoreDomainService } from '@codelab/frontend/abstract/domain'
import { createContext } from 'mobx-keystone'

// This can be used to access the type store from anywhere inside the mobx-keystone tree
export const storeDomainServiceContext = createContext<IStoreDomainService>()

export const getStoreDomainService = (self: object) => {
  const storeService = storeDomainServiceContext.get(self)

  if (!storeService) {
    throw new Error('storeDomainServiceContext is not set')
  }

  return storeService
}
