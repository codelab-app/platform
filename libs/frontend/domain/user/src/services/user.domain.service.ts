import type {
  IPreferenceModel,
  IUserDomainService,
  IUserModel,
} from '@codelab/frontend-abstract-domain'
import type { IUserDto } from '@codelab/shared-abstract-core'

import { computed } from 'mobx'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'

import { User } from '../store'

@model('@codelab/UserDomainService')
export class UserDomainService
  extends Model({
    // Authenticated user - now nullable and initialized as null
    user: prop<IUserModel | null>(null).withSetter(),
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

  @modelAction
  setCurrentUser(userDto: IUserDto) {
    const user = User.create(userDto)

    this.setUser(user)
  }
}
