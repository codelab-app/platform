import { detach, rootRef } from 'mobx-keystone'
import type { ElementModel } from './ElementModel'

export const elementRef = rootRef<ElementModel>('ElementRef', {
  onResolvedValueChange(ref, newApp, oldApp) {
    if (oldApp && !newApp) {
      detach(ref)
    }
  },
})
