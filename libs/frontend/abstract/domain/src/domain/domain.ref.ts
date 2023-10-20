import { detach, rootRef } from 'mobx-keystone'
import type { IDomainModel } from './domain.model.interface'

export const domainRef = rootRef<IDomainModel>('@codelab/DomainRef', {
  onResolvedValueChange: (ref, newApp, oldApp) => {
    if (oldApp && !newApp) {
      detach(ref)
    }
  },
})
