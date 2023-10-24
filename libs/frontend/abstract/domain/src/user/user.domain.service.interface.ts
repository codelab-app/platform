import type { Nullable } from '@codelab/shared/abstract/types'
import type { ObjectMap } from 'mobx-keystone'
import type { IUser } from './user.interface'

export interface IUserDomainService {
  user: IUser
  users: ObjectMap<IUser>
  usersList: Array<IUser>

  setUser(user: Nullable<IUser>): void
}
