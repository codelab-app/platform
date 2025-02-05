import type {
  IUserDomainService,
  IUserModel,
} from '@codelab/frontend/abstract/domain'
import type { IUserDto } from '@codelab/shared/abstract/core'

import { computed } from 'mobx'
import { Model, model, objectMap, prop } from 'mobx-keystone'

import { User } from '../store'

const fromDto = (user: IUserDto) => {
  return new UserDomainService({
    user: User.create(user),
  })
}

@model('@codelab/UserDomainService')
export class UserDomainService
  extends Model({
    // Authenticated user
    user: prop<IUserModel>().withSetter(),
    /**
     * Used by getStaticPaths for custom domain routing
     */
    users: prop(() => objectMap<IUserModel>()),
  })
  implements IUserDomainService
{
  static fromDto = fromDto

  @computed
  get preference() {
    return this.user.preferences
  }

  @computed
  get usersList() {
    return [...Object.values(this.users), this.user]
  }
}
