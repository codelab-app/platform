import { detach, rootRef } from 'mobx-keystone'
import type { Element } from './Element'

export const elementRef = rootRef<Element>('ElementRef', {
  onResolvedValueChange(ref, newApp, oldApp) {
    if (oldApp && !newApp) {
      detach(ref)
    }
  },
})
