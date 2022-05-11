import { IElementService } from '@codelab/shared/abstract/core'
import { createContext } from 'mobx-keystone'

// This can be used to access the type store from anywhere inside the mobx-keystone tree
export const elementServiceContext = createContext<IElementService>()

export const getElementService = (self: any) => {
  const elementService = elementServiceContext.get(self)

  if (!elementService) {
    throw new Error('elementServiceContext is not set')
  }

  return elementService
}
