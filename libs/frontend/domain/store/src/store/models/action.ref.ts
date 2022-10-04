import { IAnyAction } from '@codelab/frontend/abstract/core'
import { detach, rootRef } from 'mobx-keystone'

export const actionRef = rootRef<IAnyAction>('@codelab/ActionRef', {
  onResolvedValueChange(ref, newStore, oldStore) {
    if (oldStore && !newStore) {
      detach(ref)
    }
  },
})
