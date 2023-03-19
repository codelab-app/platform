import type { IType } from '@codelab/frontend/abstract/core'
import { detach, rootRef } from 'mobx-keystone'

export const typeRef = rootRef<IType>('@codelab/TypeRef', {
  onResolvedValueChange: (ref, newType, oldType) => {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})
