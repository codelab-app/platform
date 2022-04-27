import { createContext, detach, rootRef } from 'mobx-keystone'
import { Component } from './component.model'
import { ComponentService } from './component.service'

export const componentRef = rootRef<Component>('@codelab/ComponentRef', {
  onResolvedValueChange(ref, newComponent, oldComponent) {
    if (oldComponent && !newComponent) {
      detach(ref)
    }
  },
})

// This can be used to access the type store from anywhere inside the mobx-keystone tree
export const componentServiceContext = createContext<ComponentService>()

export const getComponentService = (self: any) => {
  const componentService = componentServiceContext.get(self)

  if (!componentService) {
    throw new Error('componentServiceContext is not set')
  }

  return componentService
}
