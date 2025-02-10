import type {
  Auth0IdToken,
  IPreferenceDto,
  IRole,
  IUserDto,
  IUserSession,
} from '@codelab/shared/abstract/core'

import { JWT_CLAIMS } from '@codelab/shared/abstract/core'
import { preferenceDefault } from '@codelab/shared-domain-module/preference'

export class User implements IUserDto {
  static fromSession({ auth0Id, email, id, roles, username }: IUserSession) {
    return new User({
      auth0Id,
      email,
      id,
      preferences: preferenceDefault,
      roles,
      username,
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
