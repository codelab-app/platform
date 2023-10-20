import type { ITypeService } from '@codelab/frontend/abstract/application'
import { createContext } from 'mobx-keystone'

export const typeServiceContext = createContext<ITypeService>()

export const getTypeService = (self: object) => {
  const typeService = typeServiceContext.get(self)

  if (!typeService) {
    throw new Error('TypeService is not defined')
  }

  return typeService
}
