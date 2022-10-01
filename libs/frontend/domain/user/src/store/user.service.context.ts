import { IUserService } from '@codelab/frontend/abstract/core'
import { createContext } from 'mobx-keystone'

export const userServiceContext = createContext<IUserService>()

export const getUserService = (self: any) => {
  const userService = userServiceContext.get(self)

  if (!userService) {
    throw new Error('userServiceContext is not set')
  }

  return userService
}
