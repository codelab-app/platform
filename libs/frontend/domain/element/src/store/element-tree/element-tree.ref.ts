import type { IElementTree } from '@codelab/frontend/abstract/core'
import { detach, rootRef } from 'mobx-keystone'

export const elementTreeRef = rootRef<IElementTree>('@codelab/ElementTreeRef', {
  onResolvedValueChange: (ref, newType, oldType) => {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})
