import { detach, rootRef } from 'mobx-keystone'
import type { IRuntimeElementModel } from './runtime-element.model.interface'

export const runtimeElementRef = rootRef<IRuntimeElementModel>(
  '@codelab/RuntimeElementRef',
  {
    onResolvedValueChange: (ref, newElement, oldElement) => {
      if (oldElement && !newElement) {
        detach(ref)
      }
    },
  },
)
