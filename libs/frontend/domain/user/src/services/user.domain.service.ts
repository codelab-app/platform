import type {
  IPreferenceModel,
  IUserDomainService,
  IUserModel,
} from '@codelab/frontend-abstract-domain'

import { computed } from 'mobx'
import { Model, model, objectMap, prop } from 'mobx-keystone'

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
  get preference(): IPreferenceModel {
    if (!this.user) {
      throw new Error('User is not set, cannot access preferences')
    }

    // Return user preferences if user exists, otherwise return null
    // This allows callers to handle the null case appropriately
    return this.user.preferences
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
}
