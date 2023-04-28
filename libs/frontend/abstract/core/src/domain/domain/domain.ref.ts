import { detach, rootRef } from 'mobx-keystone'
import type { IDomain } from './domain.model.interface'

export const domainRef = rootRef<IDomain>('@codelab/DomainRef', {
  onResolvedValueChange: (ref, newApp, oldApp) => {
    if (oldApp && !newApp) {
      detach(ref)
    }
  },
})
