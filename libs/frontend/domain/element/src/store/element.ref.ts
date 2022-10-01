import { IElement } from '@codelab/frontend/abstract/core'
import { detach, rootRef } from 'mobx-keystone'

export const elementRef = rootRef<IElement>('@codelab/ElementRef', {
  onResolvedValueChange(ref, newElement, oldElement) {
    if (oldElement && !newElement) {
      detach(ref)
    }
  },
})
