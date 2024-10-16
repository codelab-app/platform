import { type AnyModel, createContext } from 'mobx-keystone'

import type { ITypeDomainService } from './type.domain.service.interface'

export const typeDomainServiceContext = createContext<ITypeDomainService>()

export const getTypeDomainService = (self: AnyModel) => {
  const typeService = typeDomainServiceContext.get(self)

  if (!typeService) {
    throw new Error('TypeDomainService is not defined')
  }

  return typeService
}
