import { detach, rootRef } from 'mobx-keystone'
import type { IApp } from './app.model.interface'

export const appRef = rootRef<IApp>('@codelab/AppRef', {
  onResolvedValueChange: (ref, newApp, oldApp) => {
    if (oldApp && !newApp) {
      detach(ref)
    }
  },
})
