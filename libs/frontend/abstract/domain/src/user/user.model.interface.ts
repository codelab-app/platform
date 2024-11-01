import type {
  IApp,
  IRole,
  IUser,
  IUserDto,
} from '@codelab/shared/abstract/core'
import type {
  UserCreateInput,
  UserDeleteInput,
  UserUpdateInput,
} from '@codelab/shared/infra/gql'
import type { Ref } from 'mobx-keystone'

import type { IAppModel } from '../app'
import type { ICacheService, IModel } from '../shared'

export interface IUserModel
  extends ICacheService<IUserDto, IUserModel>,
    IModel<IUser> {
  // apps: Array<Ref<IAppModel>>
  auth0Id: string
  email: string
  id: string
  roles: Array<IRole>
  username: string
  setId(id: string): void
}
