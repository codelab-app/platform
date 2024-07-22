import { createContext } from 'mobx-keystone'
import type { IUserDomainService } from './user.domain.service.interface'

export const userDomainServiceContext = createContext<IUserDomainService>()

export const getUserDomainService = (self: object) => {
  const userDomainService = userDomainServiceContext.get(self)

  if (!userDomainService) {
    throw new Error('userDomainServiceContext is not defined')
  }

  return userDomainService
}
