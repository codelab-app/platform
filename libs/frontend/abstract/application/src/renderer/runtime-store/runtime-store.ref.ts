import type { AnyModel, Ref } from 'mobx-keystone'
import { detach, isRefOfType, rootRef } from 'mobx-keystone'
import type { IRuntimeStoreModel } from './runtime-store.model.interface'

export const runtimeStoreRef = rootRef<IRuntimeStoreModel>(
  '@codelab/RuntimeStoreRef',
  {
    onResolvedValueChange: (ref, newRuntimeStore, oldRuntimeStore) => {
      if (oldRuntimeStore && !newRuntimeStore) {
        detach(ref)
      }
    },
  },
)

export const isRuntimeStoreRef = (
  ref: Ref<object>,
): ref is Ref<IRuntimeStoreModel> => isRefOfType(ref, runtimeStoreRef)

export const isRuntimeStore = (
  instance: AnyModel,
): instance is IRuntimeStoreModel => {
  return instance.$modelType === '@codelab/RuntimeStore'
}
