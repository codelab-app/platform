import type { AnyModel, Ref } from 'mobx-keystone'
import { detach, isRefOfType, rootRef } from 'mobx-keystone'
import type { IRuntimeContainerNodeModel } from './runtime-container-node.model.interface'

export const runtimeContainerNodeRef = rootRef<IRuntimeContainerNodeModel>(
  '@codelab/RuntimeContainerNodeRef',
  {
    onResolvedValueChange: (ref, newContainerNode, oldContainerNode) => {
      if (oldContainerNode && !newContainerNode) {
        detach(ref)
      }
    },
  },
)

export const isRuntimeContainerNodeRef = (
  ref: Ref<object>,
): ref is Ref<IRuntimeContainerNodeModel> =>
  isRefOfType(ref, runtimeContainerNodeRef)

export const isRuntimeContainerNode = (
  instance: AnyModel,
): instance is IRuntimeContainerNodeModel =>
  instance.$modelType === '@codelab/RuntimeContainerNode'
