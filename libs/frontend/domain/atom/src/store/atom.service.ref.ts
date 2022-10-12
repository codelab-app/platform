import {
  IAtomService,
  IComponentService,
  IElement,
  IElementService,
} from '@codelab/frontend/abstract/core'
import { detach, rootRef } from 'mobx-keystone'

export const atomServiceRef = rootRef<IAtomService>('@codelab/AtomServiceRef', {
  onResolvedValueChange(ref, newAtomService, oldAtomService) {
    if (newAtomService && !oldAtomService) {
      detach(ref)
    }
  },
})
