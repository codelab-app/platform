import { IComponent, IComponentService } from '@codelab/frontend/abstract/core'
import { createContext, detach, rootRef } from 'mobx-keystone'

/**
 * Moved here because of dependency issue.
 *
 * Component can depend on element, but not the other way around
 */

export const componentRef = rootRef<IComponent>('@codelab/ComponentRef', {
  onResolvedValueChange(ref, newComponent, oldComponent) {
    if (oldComponent && !newComponent) {
      detach(ref)
    }
  },
})

// This can be used to access the type store from anywhere inside the mobx-keystone tree
export const componentServiceContext = createContext<IComponentService>()

export const getComponentService = (self: any) => {
  const componentService = componentServiceContext.get(self)

  if (!componentService) {
    throw new Error('componentServiceContext is not set')
  }

  return componentService
}
