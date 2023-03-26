import { detach, rootRef } from 'mobx-keystone'
import type { IElementTree } from '../element-tree.interface.model'

export const elementTreeRef = rootRef<IElementTree>('@codelab/ElementTreeRef', {
  onResolvedValueChange: (ref, newType, oldType) => {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})
