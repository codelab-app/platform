import { type AnyModel, createContext } from 'mobx-keystone'
import type { IUserDomainService } from './user.domain.service.interface'

export const userDomainServiceContext = createContext<IUserDomainService>()

export const getUserDomainService = (self: AnyModel) => {
  const userService = userDomainServiceContext.get(self)

  if (!userService) {
    throw new Error('userDomainServiceContext is not defined')
  }

  return userService
}
