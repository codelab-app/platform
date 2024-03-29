import type { IUserService } from '@codelab/frontend/abstract/application'
import type { IUserDomainService } from '@codelab/frontend/abstract/domain'
import { restPlatformClient } from '@codelab/frontend/application/axios'
import { User, UserDomainService } from '@codelab/frontend/domain/user'
import type { Auth0IdToken, IUserDto } from '@codelab/shared/abstract/core'
import type { UserWhere } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelFlow,
  prop,
  transaction,
} from 'mobx-keystone'
import { userApi } from './user.api'

const init = (data: Auth0IdToken) => {
  const user = User.fromSession(data)

  return fromDto(user)
}

const fromDto = (user: IUserDto) => {
  return new UserService({
    userDomainService: UserDomainService.fromDto(user),
  })
}

@model('@codelab/UserService')
export class UserService
  extends Model({
    userDomainService: prop<IUserDomainService>(),
  })
  implements IUserService
{
  static fromDto = fromDto

  static init = init

  @computed
  get user() {
    return this.userDomainService.user
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
