import { detach, rootRef } from 'mobx-keystone'
import type { IField } from './field.interface'

export const fieldRef = rootRef<IField>('@codelab/FieldRef', {
  onResolvedValueChange: (ref, newType, oldType) => {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})
