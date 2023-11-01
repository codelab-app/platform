import { detach, rootRef } from 'mobx-keystone'
import type { IRuntimeActionModel } from './runtime-action.model.interface'

export const runtimeActionRef = rootRef<IRuntimeActionModel>(
  '@codelab/RuntimeActionRef',
  {
    onResolvedValueChange: (ref, newAction, oldAction) => {
      if (oldAction && !newAction) {
        detach(ref)
      }
    },
  },
)
