import { Role } from '@codelab/backend/abstract/codegen'
import type { Auth0IdToken, IUserDTO } from '@codelab/shared/abstract/core'
import { IRole, JWT_CLAIMS } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export class User implements IUserDTO {
  static fromSession({ email, nickname, sub, ...session }: Auth0IdToken) {
    const auth0Id = sub
    const roles = session[JWT_CLAIMS].roles.map((role) => IRole[role])

    return new User({
      auth0Id,
      email,
      id: v4(),
      roles,
      username: nickname,
    })
  }

  auth0Id: string

  email: string

  id: string

  roles: Array<IRole>

  username: string

  constructor({ auth0Id, email, id, roles = [], username }: IUserDTO) {
    this.id = id
    this.auth0Id = auth0Id
    this.email = email
    this.roles = roles
    this.username = username
  }
}

export type IUserModel = typeof User
