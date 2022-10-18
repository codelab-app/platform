import { IPropService } from '@codelab/frontend/abstract/core'
import { detach, rootRef } from 'mobx-keystone'

export const propServiceRef = rootRef<IPropService>('@codelab/PropService', {
  onResolvedValueChange(ref, newPropService, oldPropService) {
    if (newPropService && !oldPropService) {
      detach(ref)
    }
  },
})
