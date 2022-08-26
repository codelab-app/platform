import { IElementLinkService } from '@codelab/shared/abstract/core'
import { createContext } from 'mobx-keystone'

// This can be used to access the type store from anywhere inside the mobx-keystone tree
export const elementLinkServiceContext = createContext<IElementLinkService>()

export const getElementLinkService = (self: any) => {
  const elementLinkService = elementLinkServiceContext.get(self)

  if (!elementLinkService) {
    throw new Error('elementLinkServiceContext not set')
  }

  return elementLinkService
}
