import { detach, rootRef } from 'mobx-keystone'
import type { IAuthGuardModel } from './auth-guard.model.interface'

export const authGuardRef = rootRef<IAuthGuardModel>('@codelab/AuthGuardRef', {
  onResolvedValueChange: (ref, newAuthGuard, oldAuthGuard) => {
    if (oldAuthGuard && !newAuthGuard) {
      detach(ref)
    }
  },
})
