import { detach, rootRef } from 'mobx-keystone'

import type { IAppModel } from './app.model.interface'

export const appRef = rootRef<IAppModel>('@codelab/AppRef', {
  onResolvedValueChange: (ref, newApp, oldApp) => {
    if (oldApp && !newApp) {
      detach(ref)
    }
  },
})
