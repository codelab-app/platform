import type { IUser } from '@codelab/frontend/abstract/core'
// import { appRef } from '@codelab/frontend/domain/app'
import {
  type Auth0IdToken,
  IRole,
  type IUserDTO,
  JWT_CLAIMS,
} from '@codelab/shared/abstract/core'
// import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, prop } from 'mobx-keystone'

const fromSession = (user: Auth0IdToken) => {
  return new User({
    auth0Id: user.sub,
    email: user.email,
    id: user[JWT_CLAIMS].neo4j_user_id,
    roles: user[JWT_CLAIMS].roles.map((role) => IRole[role]),
    username: user.nickname,
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
  implements IUser
{
  static fromSession = fromSession
}
