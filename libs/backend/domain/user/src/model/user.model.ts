import type { IUser } from '@codelab/backend/abstract/core'
import type { Auth0SessionUser } from '@codelab/shared/abstract/core'
import { IRole, JWT_CLAIMS } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export class User implements IUser {
  id: string

  auth0Id: string

  email: string

  username: string

  roles: Array<IRole> | null

  constructor({ id, auth0Id, email, roles = [], username }: IUser) {
    this.id = id
    this.auth0Id = auth0Id
    this.email = email
    this.roles = roles
    this.username = username
  }

  static fromSession({ sub, email, nickname, ...session }: Auth0SessionUser) {
    const auth0Id = sub
    const roles = session[JWT_CLAIMS].roles

    return new User({
      id: v4(),
      auth0Id,
      email,
      username: nickname,
      // roles: rolesToEnum(roles),
      roles: [IRole.Admin],
    })
  }
}
