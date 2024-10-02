import type { Nullable } from '@codelab/shared/abstract/types'
import type { ObjectMap } from 'mobx-keystone'

import type { IUserModel } from './user.model.interface'

export interface IUserDomainService {
  user: IUserModel
  users: ObjectMap<IUserModel>
  usersList: Array<IUserModel>

  setUser(user: Nullable<IUserModel>): void
}
