// This can be used to access the type store from anywhere inside the mobx-keystone tree
import { createContext } from 'mobx-keystone'
import type { TypeService } from './type.service'

export const typeServiceContext = createContext<TypeService>()

export const getTypeServiceFromContext = (thisModel: object) => {
  const typeStore = typeServiceContext.get(thisModel)

  if (!typeStore) {
    throw new Error('TypeService context is not defined')
  }

  return typeStore
}
