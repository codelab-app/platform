import { detach, rootRef } from 'mobx-keystone'
import type { IAction } from './action.interface'

export const actionRef = rootRef<IAction>('@codelab/ActionRef', {
  onResolvedValueChange: (ref, newStore, oldStore) => {
    if (oldStore && !newStore) {
      detach(ref)
    }
  },
})
