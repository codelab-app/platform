import { detach, rootRef } from 'mobx-keystone'
import type { IProp } from './prop.model.interface'

export const propRef = rootRef<IProp>('@codelab/PropRef', {
  onResolvedValueChange: (ref, newProp, oldProp) => {
    if (oldProp && !newProp) {
      detach(ref)
    }
  },
})
