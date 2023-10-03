import { detach, rootRef } from 'mobx-keystone'
import type { ITypeModel } from './types'

export const typeRef = rootRef<ITypeModel>('@codelab/TypeRef', {
  onResolvedValueChange: (ref, newType, oldType) => {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})
