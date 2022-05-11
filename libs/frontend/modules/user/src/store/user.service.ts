import { throwIfUndefined } from '@codelab/frontend/shared/utils'
import { IUser, IUserDTO, IUserService } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import { createContext, Model, model, prop } from 'mobx-keystone'
import { User } from './user.model'

@model('@codelab/UserService')
export class UserService
  extends Model({
    // Authenticated user
    user: prop<Nullable<IUser>>(null).withSetter(),
  })
  implements IUserService
{
  @computed
  get auth0Id() {
    return throwIfUndefined(this.user?.auth0Id)
  }

  static init = (data?: IUserDTO) => {
    // SSR makes it such that user may be undefined
    if (!data) {
      return new UserService({})
    }

    const user = User.hydrate(data)

    return new UserService({
      user,
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
