import { detach, rootRef } from 'mobx-keystone'
import type { IStore } from './store.model.interface'

export const storeRef = rootRef<IStore>('@codelab/StoreRef', {
  onResolvedValueChange: (ref, newStore, oldStore) => {
    if (oldStore && !newStore) {
      detach(ref)
    }
  },
})
