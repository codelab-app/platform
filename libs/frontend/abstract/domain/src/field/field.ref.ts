import { detach, rootRef } from 'mobx-keystone'
import type { IFieldModel } from './field.model.interface'

export const fieldRef = rootRef<IFieldModel>('@codelab/FieldRef', {
  onResolvedValueChange: (ref, newType, oldType) => {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})
