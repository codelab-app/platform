import type { Nullable } from '@codelab/shared-abstract-types'
import type { ObjectMap } from 'mobx-keystone'

import type { IPreferenceModel } from '../preference'
import type { IUserModel } from './user.model.interface'

export interface IUserDomainService {
  preference: Nullable<IPreferenceModel>
  user: Nullable<IUserModel>
  users: ObjectMap<IUserModel>
  usersList: Array<IUserModel>
  setUser(user: IUserModel): void
}
