import type { IUser } from '@codelab/backend/abstract/core'
import type { Auth0SessionUser, IRole } from '@codelab/shared/abstract/core'
import { JWT_CLAIMS } from '@codelab/shared/abstract/core'
import { rolesToEnum } from '@codelab/shared/domain/mapper'

export class User implements IUser {
  id: string

  auth0Id: string

  email: string

  username: string

  roles: Array<IRole> | undefined | null

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
      id: auth0Id,
      auth0Id,
      email,
      username: nickname,
      roles: rolesToEnum(roles),
    })
  }
}
