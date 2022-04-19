import { detach, rootRef } from 'mobx-keystone'
import { PropMapBinding } from './prop-map-binding.model'

export const propMapBindingRef = rootRef<PropMapBinding>(
  '@codelab/PropMapBindingRef',
  {
    onResolvedValueChange(ref, newApp, oldApp) {
      if (oldApp && !newApp) {
        detach(ref)
      }
    },
  },
)
