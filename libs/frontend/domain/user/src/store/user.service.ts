import type { IUser, IUserService } from '@codelab/frontend/abstract/core'
import { httpClient } from '@codelab/frontend/config'
import { throwIfUndefined } from '@codelab/frontend/shared/utils'
import type { IUserDTO } from '@codelab/shared/abstract/core'
import type { UserWhere } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { userApi } from './user.api'
import { User } from './user.model'

const init = (data?: IUserDTO) => {
  // SSR makes it such that user may be undefined
  if (!data) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new UserService({ user: {} as any })
  }

  const user = User.create(data)

  const userService = new UserService({
    user,
  })

  return userService
}

@model('@codelab/UserService')
export class UserService
  extends Model({
    // Authenticated user
    user: prop<IUser>().withSetter(),
    /**
     * Used by getStaticPaths for custom domain routing
     */
    users: prop(() => objectMap<IUser>()),
  })
  implements IUserService
{
  @computed
  get auth0Id() {
    return throwIfUndefined(this.user.auth0Id)
  }

  @computed
  get usersList() {
    return [...Object.values(this.users), this.user]
  }

  @modelFlow
  @transaction
  getOne = _async(function* (this: UserService, where: UserWhere) {
    const {
      users: [user],
    } = yield* _await(userApi.GetUsers({ where }))

    return user
  })

  @modelFlow
  saveUser = _async(function* (this: UserService, data: IUserDTO) {
    return yield* _await(httpClient.post('/user/save', data))
  })

  static init = init
}
