import { IPropMapBinding } from '@codelab/frontend/abstract/core'
import { detach, rootRef } from 'mobx-keystone'

export const propMapBindingRef = rootRef<IPropMapBinding>(
  '@codelab/PropMapBindingRef',
  {
    onResolvedValueChange(ref, newApp, oldApp) {
      if (oldApp && !newApp) {
        detach(ref)
      }
    },
  },
)
