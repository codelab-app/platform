import { Nullable } from '@codelab/shared/abstract/types'
import { ObjectMap, Ref } from 'mobx-keystone'
import { IUser } from './user.interface'

export interface IUserService {
  users: ObjectMap<IUser>
  authenticatedUser: Nullable<Ref<IUser>>
  user?: IUser
}
