import type { AnyModel, Ref } from 'mobx-keystone'
import { createContext, detach, isRefOfType, rootRef } from 'mobx-keystone'
import type { IComponentModel } from './component.model.interface'
import type { IComponentService } from './component.service.interface'

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

// This can be used to access the type store from anywhere inside the mobx-keystone tree
export const componentServiceContext = createContext<IComponentService>()

export const getComponentService = (self: object) => {
  const componentService = componentServiceContext.get(self)

  if (!componentService) {
    throw new Error('componentServiceContext is not set')
  }

  return componentService
}

export const isComponentRef = (ref: Ref<object>): ref is Ref<IComponentModel> =>
  isRefOfType(ref, componentRef)

export const isComponent = (
  instance: AnyModel,
): instance is IComponentModel => {
  return instance.$modelType === '@codelab/Component'
}
