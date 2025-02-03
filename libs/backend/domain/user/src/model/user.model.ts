import type {
  Auth0IdToken,
  IPreferenceDto,
  IUserDto,
} from '@codelab/shared/abstract/core'

import { IRole, JWT_CLAIMS } from '@codelab/shared/abstract/core'
import { preferenceDefault } from '@codelab/shared-domain-module/preference'

export class User implements IUserDto {
  static fromSession({ email, nickname, sub, ...session }: Auth0IdToken) {
    const auth0Id = sub
    const id = session[JWT_CLAIMS].neo4j_user_id
    const roles = session[JWT_CLAIMS].roles.map((role) => IRole[role])

    return new User({
      auth0Id,
      email,
      id,
      preferences: preferenceDefault,
      roles,
      username: nickname,
    })
  }

  auth0Id: string

  email: string

  id: string

  preferences: IPreferenceDto

  roles: Array<IRole>

  username: string

  constructor({
    auth0Id,
    email,
    id,
    preferences,
    roles = [],
    username,
  }: IUserDto) {
    this.id = id
    this.auth0Id = auth0Id
    this.email = email
    this.roles = roles
    this.username = username
    this.preferences = preferences
  }
}

export type IUserModel = typeof User
