import { detach, rootRef } from 'mobx-keystone'
import type { IRuntimeStore } from './runtime-store.model.interface'

export const runtimeStoreRef = rootRef<IRuntimeStore>(
  '@codelab/RuntimeStoreRef',
  {
    onResolvedValueChange: (ref, newRuntimeStore, oldRuntimeStore) => {
      if (oldRuntimeStore && !newRuntimeStore) {
        detach(ref)
      }
    },
  },
)
