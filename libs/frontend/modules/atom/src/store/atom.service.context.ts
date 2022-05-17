// This can be used to access the type store from anywhere inside the mobx-keystone tree
import { IAtomService } from '@codelab/shared/abstract/core'
import { createContext } from 'mobx-keystone'

export const atomServiceContext = createContext<IAtomService>()

export const getAtomService = (self: any) => {
  const atomService = atomServiceContext.get(self)

  if (!atomService) {
    throw new Error('atomServiceContext is not defined')
  }

  return atomService
}
