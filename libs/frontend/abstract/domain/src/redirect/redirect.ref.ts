import { detach, rootRef } from 'mobx-keystone'
import type { IRedirectModel } from './redirect.model.interface'

export const redirectRef = rootRef<IRedirectModel>('@codelab/RedirectRef', {
  onResolvedValueChange: (ref, newRedirect, oldRedirect) => {
    if (oldRedirect && !newRedirect) {
      detach(ref)
    }
  },
})
