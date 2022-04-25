import { detach, rootRef } from 'mobx-keystone'
import type { Element } from './element.model'

export const elementRef = rootRef<Element>('@codelab/ElementRef', {
  onResolvedValueChange(ref, newElement, oldElement) {
    if (oldElement && !newElement) {
      detach(ref)
    }
  },
})
