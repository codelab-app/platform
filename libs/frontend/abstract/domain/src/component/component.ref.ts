import type { AnyModel, Ref } from 'mobx-keystone'
import { detach, isRefOfType, rootRef } from 'mobx-keystone'
import type { IComponentModel } from './component.model.interface'

/**
 * Moved here because of dependency issue.
 *
 * Component can depend on element, but not the other way around
 */

export const componentRef = rootRef<IComponentModel>('@codelab/ComponentRef', {
  onResolvedValueChange: (ref, newComponent, oldComponent) => {
    if (oldComponent && !newComponent) {
      detach(ref)
    }
  },
})

export const isComponentRef = (
  ref: Ref<AnyModel>,
): ref is Ref<IComponentModel> => isRefOfType(ref, componentRef)

export const isComponent = (
  instance: AnyModel,
): instance is IComponentModel => {
  return instance.$modelType === '@codelab/Component'
}
