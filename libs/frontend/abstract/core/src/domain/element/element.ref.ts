import { detach, rootRef } from 'mobx-keystone'
import type { IElement } from './element.model.interface'

export const elementRef = rootRef<IElement>('@codelab/ElementRef', {
  onResolvedValueChange: (ref, newElement, oldElement) => {
    if (oldElement && !newElement) {
      detach(ref)
    }
  },
})
