import type {
  UserCreateInput,
  UserDeleteInput,
  UserUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IUser, IUserDto } from '@codelab/shared/abstract/core'
import type { IModel } from '../shared'

export interface IUserModel
  extends IUserDto,
    IModel<UserCreateInput, UserUpdateInput, UserDeleteInput, IUser> {
  setId(id: string): void
}
