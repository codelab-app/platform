import type { Nullable } from '@codelab/shared/abstract/types'
import type { ObjectMap } from 'mobx-keystone'
import type { IUser } from './user.interface'

export interface IUserService {
  auth0Id: string
  user: IUser
  users: ObjectMap<IUser>
  usersList: Array<IUser>

  setUser(user: Nullable<IUser>): void
}
