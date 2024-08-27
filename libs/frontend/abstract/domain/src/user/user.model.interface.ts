import type { IUser, IUserDto } from '@codelab/shared/abstract/core'
import type {
  UserCreateInput,
  UserDeleteInput,
  UserUpdateInput,
} from '@codelab/shared/infra/gql'
import type { IModel } from '../shared'
import type { IUserPreferenceModel } from './user-preference.model.interface'

export interface IUserModel
  extends IUserDto,
    IModel<UserCreateInput, UserUpdateInput, UserDeleteInput, IUser> {
  preferences: IUserPreferenceModel
  setId(id: string): void
}
