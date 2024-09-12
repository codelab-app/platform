import type { AnyModel, Ref } from 'mobx-keystone'
import { detach, isRefOfType, rootRef } from 'mobx-keystone'
import type { IRuntimeComponentModel } from './runtime-component.model.interface'

export const runtimeComponentRef = rootRef<IRuntimeComponentModel>(
  '@codelab/RuntimeComponentRef',
  {
    onResolvedValueChange: (ref, newComponent, oldComponent) => {
      if (oldComponent && !newComponent) {
        detach(ref)
      }
    },
  },
)

export const isRuntimeComponentRef = (
  ref: Ref<AnyModel>,
): ref is Ref<IRuntimeComponentModel> => isRefOfType(ref, runtimeComponentRef)

export const isRuntimeComponent = (
  instance: AnyModel,
): instance is IRuntimeComponentModel =>
  instance.$modelType === '@codelab/RuntimeComponent'
