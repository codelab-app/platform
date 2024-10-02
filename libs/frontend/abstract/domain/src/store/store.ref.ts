import { detach, rootRef } from 'mobx-keystone'

import type { IStoreModel } from './store.model.interface'

export const storeRef = rootRef<IStoreModel>('@codelab/StoreRef', {
  onResolvedValueChange: (ref, newStore, oldStore) => {
    if (oldStore && !newStore) {
      detach(ref)
    }
  },
})
