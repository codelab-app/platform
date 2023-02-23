import type { Nullable } from '@codelab/shared/abstract/types'
import type { ObjectMap } from 'mobx-keystone'
import type { IUser } from './user.interface'

export interface IUserService {
  users: ObjectMap<IUser>
  user: Nullable<IUser>
  auth0Id: string
  setUser(user: Nullable<IUser>): void
}
