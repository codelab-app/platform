import { createContext } from 'mobx-keystone'
import type { IBuilderDomainService } from './builder.domain.service.interface'

export const builderDomainServiceContext =
  createContext<IBuilderDomainService>()

export const getBuilderDomainService = (self: object) => {
  const builderDomainService = builderDomainServiceContext.get(self)

  if (!builderDomainService) {
    throw new Error('builderServiceContext is not defined')
  }

  return builderDomainService
}
