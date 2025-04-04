import type { IRole, IUserDto } from '@codelab/shared/abstract/core'
import type {
  UserCreateInput,
  UserUpdateInput,
} from '@codelab/shared/infra/gqlgen'

import {
  IPreferenceModel,
  type IUserModel,
} from '@codelab/frontend/abstract/domain'
import { Preference } from '@codelab/frontend-domain-preference/store'
import { computed } from 'mobx'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'

const create = (user: IUserDto) => {
  return new User({
    auth0Id: user.auth0Id,
    email: user.email,
    id: user.id,
    name: user.name,
    picture: user.picture,
    preferences: new Preference(user.preferences),
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
    name: prop<string>(),
    picture: prop<string>(),
    preferences: prop<IPreferenceModel>(),
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
      name: this.name,
      picture: this.picture,
      preferences: this.preferences.toJson,
      roles: [...this.roles],
      username: this.username,
    }
  }

  toCreateInput(): UserCreateInput {
    return {
      auth0Id: this.auth0Id,
      email: this.email,
      id: this.id,
      username: this.username,
      name: this.name,
      picture: this.picture,
    }
  }

  toUpdateInput(): UserUpdateInput {
    return {}
  }

  @modelAction
  writeCache({
    auth0Id,
    email,
    id,
    name,
    picture,
    preferences,
    username,
  }: Partial<IUserDto>) {
    this.email = email ?? this.email
    this.auth0Id = auth0Id ?? this.auth0Id
    this.id = id ?? this.id
    this.name = name ?? this.name
    this.picture = picture ?? this.picture
    this.username = username ?? this.username
    this.preferences = preferences
      ? new Preference(preferences)
      : this.preferences

    return this
  }
}
