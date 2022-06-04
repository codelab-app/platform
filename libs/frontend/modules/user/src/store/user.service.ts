import { throwIfUndefined } from '@codelab/frontend/shared/utils'
import { IUser, IUserDTO, IUserService } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelFlow,
  objectMap,
  prop,
} from 'mobx-keystone'
import { userApi } from './user.api'
import { User } from './user.model'

const init = (data?: IUserDTO) => {
  // SSR makes it such that user may be undefined
  if (!data) {
    return new UserService({})
  }

  const user = User.hydrate(data)

  return new UserService({
    user,
  })
}

@model('@codelab/UserService')
export class UserService
  extends Model({
    // Authenticated user
    user: prop<Nullable<IUser>>(null).withSetter(),
    /**
     * Used by getStaticPaths for custom domain routing
     */
    users: prop(() => objectMap<IUser>()),
  })
  implements IUserService
{
  static init = init

  @computed
  get auth0Id() {
    return throwIfUndefined(this.user?.auth0Id)
  }

  @modelFlow
  loadUsers = _async(function* (this: UserService) {
    const { users } = yield* _await(userApi.GetUsers())

    users.map((user) => {
      this.users.set(user.id, User.hydrate(user))
    })

    return
  })
}
