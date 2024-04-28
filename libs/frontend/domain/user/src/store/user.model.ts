import type { IUserModel } from '@codelab/frontend/abstract/domain'
import type { Auth0IdToken, IUserDto } from '@codelab/shared/abstract/core'
import { IRole, JWT_CLAIMS } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import { idProp, Model, model, prop } from 'mobx-keystone'

const fromSession = (user: Auth0IdToken): IUserDto => {
  return {
    auth0Id: user.sub,
    email: user.email,
    id: user[JWT_CLAIMS].neo4j_user_id,
    roles: user[JWT_CLAIMS].roles.map((role) => IRole[role]),
    username: user.nickname,
  }
}

const create = (user: IUserDto) => {
  return new User({
    auth0Id: user.auth0Id,
    email: user.email,
    id: user.id,
    preferences: {},
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
    preferences: prop<Record<string, unknown>>(),
    roles: prop<Array<IRole>>(() => []),
    username: prop<string>(),
  })
  implements IUserModel
{
  static create = create

  static fromSession = fromSession

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

  toCreateInput() {
    return {
      auth0Id: this.auth0Id,
      email: this.email,
      id: this.id,
      username: this.username,
    }
  }

  toUpdateInput() {
    return {
      preferences: JSON.stringify(this.preferences),
    }
  }
}
