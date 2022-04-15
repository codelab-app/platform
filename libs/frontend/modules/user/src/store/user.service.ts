import { IUserDTO } from '@codelab/shared/abstract/core'
import {
  createContext,
  Model,
  model,
  objectMap,
  prop,
  Ref,
} from 'mobx-keystone'
import { User, userRef } from './user.model'

@model('@codelab/UserService')
export class UserService extends Model({
  users: prop(() => objectMap<User>()),
  authenticatedUser: prop<Ref<User>>(),
}) {
  static init = (data: IUserDTO) => {
    const user = User.hydrate(data)
    const users = objectMap([[user.id, user]])

    return new UserService({
      users,
      authenticatedUser: userRef(user),
    })
  }
}

export const userServiceContext = createContext<UserService>()

export const getUserService = (self: any) => {
  const userService = userServiceContext.get(self)

  if (!userService) {
    throw new Error('userServiceContext is not set')
  }

  return userService
}
