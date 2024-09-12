import type { AnyModel, Ref } from 'mobx-keystone'
import { detach, isRefOfType, rootRef } from 'mobx-keystone'
import type { IRuntimePageModel } from './runtime-page.model.interface'

export const runtimePageRef = rootRef<IRuntimePageModel>(
  '@codelab/RuntimePageRef',
  {
    onResolvedValueChange: (ref, newPage, oldPage) => {
      if (oldPage && !newPage) {
        detach(ref)
      }
    },
  },
)

export const isRuntimePageRef = (
  ref: Ref<AnyModel>,
): ref is Ref<IRuntimePageModel> => isRefOfType(ref, runtimePageRef)

export const isRuntimePage = (
  instance: AnyModel,
): instance is IRuntimePageModel =>
  instance.$modelType === '@codelab/RuntimePage'
