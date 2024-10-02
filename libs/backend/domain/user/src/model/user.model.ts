import type { Auth0IdToken, IUserDto } from '@codelab/shared/abstract/core'

import { IRole, JWT_CLAIMS } from '@codelab/shared/abstract/core'

export class User implements IUserDto {
  static fromSession({ email, nickname, sub, ...session }: Auth0IdToken) {
    const auth0Id = sub
    const id = session[JWT_CLAIMS].neo4j_user_id
    const roles = session[JWT_CLAIMS].roles.map((role) => IRole[role])

    return new User({
      auth0Id,
      email,
      id,
      roles,
      username: nickname,
    })
  }

  auth0Id: string

  email: string

  id: string

  roles: Array<IRole>

  username: string

  constructor({ auth0Id, email, id, roles = [], username }: IUserDto) {
    this.id = id
    this.auth0Id = auth0Id
    this.email = email
    this.roles = roles
    this.username = username
  }
}

export type IUserModel = typeof User
