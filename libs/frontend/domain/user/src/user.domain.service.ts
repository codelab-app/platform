import type {
  IUserDomainService,
  IUserModel,
} from '@codelab/frontend/abstract/domain'
import type { IUserDTO } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import { Model, model, objectMap, prop } from 'mobx-keystone'
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
  get usersList() {
    return [...Object.values(this.users), this.user]
  }
}
