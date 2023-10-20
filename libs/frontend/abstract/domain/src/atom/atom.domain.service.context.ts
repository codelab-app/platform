import { createContext } from 'mobx-keystone'
import type { IAtomDomainService } from './atom.domain.service.interface'

export const atomDomainServiceContext = createContext<IAtomDomainService>()

export const getAtomDomainService = (self: object) => {
  const atomService = atomDomainServiceContext.get(self)

  if (!atomService) {
    throw new Error('AtomDomainService is not defined')
  }

  return atomService
}
