import { type AnyModel, createContext } from 'mobx-keystone'
import type { IAtomDomainService } from './atom.domain.service.interface'

export const atomDomainServiceContext = createContext<IAtomDomainService>()

export const getAtomDomainService = (self: AnyModel) => {
  const atomDomainService = atomDomainServiceContext.get(self)

  if (!atomDomainService) {
    throw new Error('AtomDomainService is not defined')
  }

  return atomDomainService
}
