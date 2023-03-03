import isNil from 'lodash/isNil'
import type { Ref } from 'mobx-keystone'
import { createContext, detach, isRefOfType, rootRef } from 'mobx-keystone'
import type { IAtom } from '../atom'
import type { IElement, IElementRenderType } from '../element'
import type { IComponent } from './component.model.interface'
import type { IComponentService } from './component.service.interface'

/**
 * Moved here because of dependency issue.
 *
 * Component can depend on element, but not the other way around
 */

export const componentRef = rootRef<IComponent>('@codelab/ComponentRef', {
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

/**
 * Used for determining the RenderType of an element
 */
export const isComponentRenderTypeRef = (
  node: IElementRenderType | null,
): node is Ref<IComponent> => {
  return !isNil(node) && isRefOfType(node, componentRef)
}

