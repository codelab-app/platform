import type { ITypeDomainService } from '@codelab/frontend/abstract/domain'
import { createContext } from 'mobx-keystone'

export const typeDomainServiceContext = createContext<ITypeDomainService>()

export const getTypeDomainService = (self: object) => {
  const typeService = typeDomainServiceContext.get(self)

  if (!typeService) {
    throw new Error('TypeDomainService is not defined')
  }

  return typeService
}
