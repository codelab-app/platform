import { IStoreService } from '@codelab/frontend/abstract/core'
import { createContext } from 'mobx-keystone'

// This can be used to access the type store from anywhere inside the mobx-keystone tree
export const storeServiceContext = createContext<IStoreService>()

export const getStoreService = (self: object) => {
  const storeService = storeServiceContext.get(self)

  if (!storeService) {
    throw new Error('storeServiceContext is not set')
  }

  return storeService
}
