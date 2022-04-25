// This can be used to access the type store from anywhere inside the mobx-keystone tree
import { createContext } from 'mobx-keystone'
import { TypeService } from './type.service'

export const typeServiceContext = createContext<TypeService>()

export const getTypeService = (self: object) => {
  const typeService = typeServiceContext.get(self)

  if (!typeService) {
    throw new Error('TypeService is not defined')
  }

  return typeService
}
