import type { IUserDto } from '@codelab/shared/abstract/core'

import { type IUserModel } from '@codelab/frontend/abstract/domain'
import { IRole } from '@codelab/shared/abstract/core'
import { UserCreateInput, UserUpdateInput } from '@codelab/shared/infra/gql'
import { computed } from 'mobx'
import { idProp, Model, model, prop } from 'mobx-keystone'

const create = (user: IUserDto) => {
  return new User({
    auth0Id: user.auth0Id,
    email: user.email,
    id: user.id,
    roles: user.roles,
    username: user.username,
  })
}

/**
 * Here we use JwtPayload to hydrate our user model, so we don't require an additional api call to our database
 *
 * auth0Id can be used as the unique key for our database lookup without issue
 */
@model('@codelab/User')
export class User
  extends Model({
    auth0Id: prop<string>(),
    email: prop<string>(),
    id: idProp.withSetter(),
    roles: prop<Array<IRole>>(() => []),
    username: prop<string>(),
  })
  implements IUserModel
{
  static create = create

  @computed
  get toJson() {
    return {
      auth0Id: this.auth0Id,
      email: this.email,
      id: this.id,
      roles: this.roles,
      username: this.username,
    }
  }

  toCreateInput(): UserCreateInput {
    return {
      auth0Id: this.auth0Id,
      email: this.email,
      id: this.id,
      username: this.username,
    }
  }

  toUpdateInput(): UserUpdateInput {
    return {}
  }
}
