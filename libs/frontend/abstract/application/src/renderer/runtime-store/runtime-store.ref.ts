import { detach, rootRef } from 'mobx-keystone'
import type { IRuntimeStoreModel } from './runtime-store.model.interface'

export const runtimeStoreRef = rootRef<IRuntimeStoreModel>(
  '@codelab/RuntimeStoreRef',
  {
    onResolvedValueChange: (ref, newRuntimeStore, oldRuntimeStore) => {
      if (oldRuntimeStore && !newRuntimeStore) {
        detach(ref)
      }
    },
  },
)
