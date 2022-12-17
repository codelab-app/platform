import type { ITypeService } from '@codelab/frontend/abstract/core'
import { detach, rootRef } from 'mobx-keystone'

export const typeServiceRef = rootRef<ITypeService>('@codelab/TypeServiceRef', {
  onResolvedValueChange(ref, newTypeService, oldTypeService) {
    if (oldTypeService && !newTypeService) {
      detach(ref)
    }
  },
})
