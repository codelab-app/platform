import { detach, rootRef } from 'mobx-keystone'
import { PropMapBinding } from './PropMapBinding'

export const propMapBindingRef = rootRef<PropMapBinding>('PropMapBindingRef', {
  onResolvedValueChange(ref, newApp, oldApp) {
    if (oldApp && !newApp) {
      detach(ref)
    }
  },
})
