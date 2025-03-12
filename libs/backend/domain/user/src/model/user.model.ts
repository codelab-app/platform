import type {
  IPreferenceDto,
  IRole,
  IUserDto,
  IUserSession,
} from '@codelab/shared/abstract/core'

import { preferenceDefault } from '@codelab/shared-domain-module/preference'

export class User implements IUserDto {
  static fromSession({
    auth0Id,
    email,
    id,
    name,
    picture,
    roles,
    username,
  }: IUserSession) {
    return new User({
      auth0Id,
      email,
      id,
      name,
      picture,
      preferences: preferenceDefault,
      roles,
      username,
    })
  }

  auth0Id: string

  email: string

  id: string

  name: string

  picture: string

  preferences: IPreferenceDto

  roles: Array<IRole>

  username: string

  constructor({
    auth0Id,
    email,
    id,
    name,
    picture,
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
    this.name = name
    this.picture = picture
  }
}

export type IUserModel = typeof User
