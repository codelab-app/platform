import type { IUser, IUserService } from '@codelab/frontend/abstract/domain'
import { restPlatformClient } from '@codelab/frontend/application/axios'
import type { Auth0IdToken } from '@codelab/shared/abstract/core'
import type { UserWhere } from '@codelab/shared/abstract/types'
import { throwIfUndefined } from '@codelab/shared/utils'
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

const init = (data: Auth0IdToken) => {
  const user = User.fromSession(data)

  return new UserService({
    user,
  })
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
  static init = init

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
  saveUser = _async(function* (this: UserService, data: Auth0IdToken) {
    return yield* _await(restPlatformClient.post('/user/save', data))
  })
}
