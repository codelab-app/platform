import { type AnyModel, createContext } from 'mobx-keystone'

import type { IElementDomainService } from './lambda.domain.service.interface'

export const elementDomainServiceContext =
  createContext<IElementDomainService>()

export const getLambdaDomainService = (self: AnyModel) => {
  const elementService = elementDomainServiceContext.get(self)

  if (!elementService) {
    throw new Error('elementDomainServiceContext is not set')
  }

  return elementService
}
