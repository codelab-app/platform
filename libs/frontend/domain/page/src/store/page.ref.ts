import type { IPage } from '@codelab/frontend/abstract/core'
import { detach, rootRef } from 'mobx-keystone'

export const pageRef = rootRef<IPage>('@codelab/PageRef', {
  onResolvedValueChange: (ref, newPage, oldPage) => {
    if (oldPage && !newPage) {
      detach(ref)
    }
  },
})
