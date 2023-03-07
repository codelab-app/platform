import type { IApp } from '@codelab/frontend/abstract/core'
import { detach, rootRef } from 'mobx-keystone'

export const appRef = rootRef<IApp>('@codelab/AppRef', {
  onResolvedValueChange: (ref, newApp, oldApp) => {
    if (oldApp && !newApp) {
      detach(ref)
    }
  },
})
