import { IElementService } from '@codelab/frontend/abstract/core'
import { detach, rootRef } from 'mobx-keystone'

export const elementServiceRef = rootRef<IElementService>(
  '@codelab/ElementServiceRef',
  {
    onResolvedValueChange(ref, newElementService, oldElementService) {
      if (oldElementService && !newElementService) {
        detach(ref)
      }
    },
  },
)
