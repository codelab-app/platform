import type { IUserDto } from '@codelab/shared-abstract-core'
import type { Nullable } from '@codelab/shared-abstract-types'
import type { ObjectMap } from 'mobx-keystone'

import type { IPreferenceModel } from '../preference'
import type { IUserModel } from './user.model.interface'

export interface IUserDomainService {
  currentUser: IUserModel
  preference: IPreferenceModel
  user: Nullable<IUserModel>
  setCurrentUser(userDto: IUserDto): void
}
