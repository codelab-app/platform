import { detach, rootRef } from 'mobx-keystone'
import type { IType } from './types'

export const typeRef = rootRef<IType>('@codelab/TypeRef', {
  onResolvedValueChange: (ref, newType, oldType) => {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})
