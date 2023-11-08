import { createContext } from 'mobx-keystone'
import type { IElementDomainService } from './element.domain.service.interface'

export const elementDomainServiceContext =
  createContext<IElementDomainService>()

export const getElementDomainService = (self: object) => {
  const elementService = elementDomainServiceContext.get(self)

  if (!elementService) {
    throw new Error('elementDomainServiceContext is not set')
  }

  return elementService
}
