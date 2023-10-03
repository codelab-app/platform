import type { IAtomService } from '@codelab/frontend/abstract/domain'
import { detach, rootRef } from 'mobx-keystone'

export const atomServiceRef = rootRef<IAtomService>('@codelab/AtomServiceRef', {
  onResolvedValueChange: (ref, newAtomService, oldAtomService) => {
    if (newAtomService && !oldAtomService) {
      detach(ref)
    }
  },
})
