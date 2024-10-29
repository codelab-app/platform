import type { IUser, IUserDto } from '@codelab/shared/abstract/core'
import type {
  UserCreateInput,
  UserDeleteInput,
  UserUpdateInput,
} from '@codelab/shared/infra/gql'

import type { ICacheService, IModel } from '../shared'

export interface IUserModel
  extends ICacheService<IUserDto, IUserModel>,
    IModel<IUser> {
  setId(id: string): void
}
