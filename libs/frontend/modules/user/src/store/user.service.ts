import { IUserDTO, IUserService } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
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
export class UserService
  extends Model({
    users: prop(() => objectMap<User>()),
    authenticatedUser: prop<Nullable<Ref<User>>>(null),
  })
  implements IUserService
{
  @computed
  get user(): User {
    const user = this.authenticatedUser?.current

    if (!user) {
      throw new Error('User should be authenticated')
    }

    return user
  }

  static init = (data?: IUserDTO) => {
    // SSR makes it such that user may be undefined
    if (!data) {
      return new UserService({})
    }

    const user = User.hydrate(data)
    const users = objectMap([[user.auth0Id, user]])

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
