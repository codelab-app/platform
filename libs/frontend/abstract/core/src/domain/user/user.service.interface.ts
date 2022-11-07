import { Nullable } from '@codelab/shared/abstract/types'
import { ObjectMap } from 'mobx-keystone'
import { IUser } from './user.interface'

export interface IUserService {
  users: ObjectMap<IUser>
  user: Nullable<IUser>
  // Get Auth0Id with error checking
  auth0Id: string

  loadUsers(): Promise<void>
  setUser(user: Nullable<IUser>): void
}
