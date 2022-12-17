// This can be used to access the type store from anywhere inside the mobx-keystone tree
import type { ITypeService } from '@codelab/frontend/abstract/core'
import { createContext } from 'mobx-keystone'

export const typeServiceContext = createContext<ITypeService>()

export const getTypeService = (self: object) => {
  const typeService = typeServiceContext.get(self)

  if (!typeService) {
    throw new Error('TypeService is not defined')
  }

  return typeService
}
