import { detach, rootRef } from 'mobx-keystone'

import type { IPropModel } from './prop.model.interface'

export const propRef = rootRef<IPropModel>('@codelab/PropRef', {
  onResolvedValueChange: (ref, newProp, oldProp) => {
    if (oldProp && !newProp) {
      detach(ref)
    }
  },
})
