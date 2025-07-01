import type {
  IPreferenceModel,
  IUserDomainService,
  IUserModel,
} from '@codelab/frontend-abstract-domain'

import { IUserDto } from '@codelab/shared-abstract-core'
import { computed } from 'mobx'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'

import { User } from '../store'

@model('@codelab/UserDomainService')
export class UserDomainService
  extends Model({
    // Authenticated user - now nullable and initialized as null
    user: prop<IUserModel | null>(null).withSetter(),
    /**
     * Used by getStaticPaths for custom domain routing
     */
    users: prop(() => objectMap<IUserModel>()),
  })
  implements IUserDomainService
{
  @computed
  get currentUser(): IUserModel {
    if (!this.user) {
      throw new Error('User is not available')
    }

    return this.user
  }

  @computed
  get preference(): IPreferenceModel {
    return this.currentUser.preferences
  }

  @computed
  get usersList() {
    const userValues = Object.values(this.users)

    // Only include this.user if it's not null
    if (this.user) {
      return [...userValues, this.user]
    }

    return userValues
  }

  @modelAction
  setCurrentUser(userDto: IUserDto) {
    const user = User.create(userDto)

    this.setUser(user)
  }
}
