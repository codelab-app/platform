import { detach, rootRef } from 'mobx-keystone'

import type { IActionModel } from './action.model.interface'

export const actionRef = rootRef<IActionModel>('@codelab/ActionRef', {
  onResolvedValueChange: (ref, newStore, oldStore) => {
    if (oldStore && !newStore) {
      detach(ref)
    }
  },
})
