import type {
  IUser,
  IUserDomainService,
} from '@codelab/frontend/abstract/domain'
import type { Auth0IdToken, IUserDTO } from '@codelab/shared/abstract/core'
import { throwIfUndefined } from '@codelab/shared/utils'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { User } from './store'

const fromDto = (user: IUserDTO) => {
  return new UserDomainService({
    user: new User(user),
  })
}

@model('@codelab/UserDomainService')
export class UserDomainService
  extends Model({
    // Authenticated user
    user: prop<IUser>().withSetter(),
    /**
     * Used by getStaticPaths for custom domain routing
     */
    users: prop(() => objectMap<IUser>()),
  })
  implements IUserDomainService
{
  static fromDto = fromDto

  @computed
  get usersList() {
    return [...Object.values(this.users), this.user]
  }
}
