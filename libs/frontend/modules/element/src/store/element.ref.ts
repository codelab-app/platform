import { detach, rootRef } from 'mobx-keystone'
import type { Element } from './element.model'

export const elementRef = rootRef<Element>('ElementRef', {
  onResolvedValueChange(ref, newApp, oldApp) {
    if (oldApp && !newApp) {
      detach(ref)
    }
  },
})
