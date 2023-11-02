import type { Ref } from 'mobx-keystone'
import { detach, isRefOfType, rootRef } from 'mobx-keystone'
import type { IRuntimeElementModel } from './runtime-element.model.interface'

export const runtimeElementRef = rootRef<IRuntimeElementModel>(
  '@codelab/RuntimeElementRef',
  {
    onResolvedValueChange: (ref, newElement, oldElement) => {
      if (oldElement && !newElement) {
        detach(ref)
      }
    },
  },
)

export const isRuntimeElementRef = (
  ref: Ref<object>,
): ref is Ref<IRuntimeElementModel> => isRefOfType(ref, runtimeElementRef)
