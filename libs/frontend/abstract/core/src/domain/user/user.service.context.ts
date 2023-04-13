import { createContext } from 'mobx-keystone'
import type { IUserService } from './user.service.interface'

export const userServiceContext = createContext<IUserService>()

export const getUserService = (self: object) => {
  const userService = userServiceContext.get(self)

  if (!userService) {
    throw new Error('userServiceContext is not defined')
  }

  return userService
}
