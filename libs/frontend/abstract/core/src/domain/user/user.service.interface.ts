import type { Nullable } from '@codelab/shared/abstract/types'
import type { ObjectMap } from 'mobx-keystone'
import type { IUser } from './user.interface'

export interface IUserService {
  auth0Id: string
  user: Nullable<IUser>
  users: ObjectMap<IUser>

  setUser(user: Nullable<IUser>): void
}
