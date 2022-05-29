import { IStore, IStoreService } from '@codelab/shared/abstract/core'
import { createContext, detach, rootRef } from 'mobx-keystone'

/**
 * Moved here because of dependency issue.
 */

export const storeRef = rootRef<IStore>('@codelab/StoreRef', {
  onResolvedValueChange(ref, newStore, oldStore) {
    if (oldStore && !newStore) {
      detach(ref)
    }
  },
})

// This can be used to access the type store from anywhere inside the mobx-keystone tree
export const storeServiceContext = createContext<IStoreService>()

export const getStoreService = (self: any) => {
  const storeService = storeServiceContext.get(self)

  if (!storeService) {
    throw new Error('storeServiceContext is not set')
  }

  return storeService
}
