import type {
  UserCreateInput,
  UserDeleteInput,
  UserUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IUser, IUserDTO } from '@codelab/shared/abstract/core'
import type { IModel } from '../shared'

export interface IUserModel
  extends IUserDTO,
    IModel<UserCreateInput, UserUpdateInput, UserDeleteInput, IUser> {
  setId(id: string): void
}
