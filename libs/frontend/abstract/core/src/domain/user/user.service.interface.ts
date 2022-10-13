import { Nullable } from '@codelab/shared/abstract/types'
import { ObjectMap } from 'mobx-keystone'
import { IAppService } from '../app'
import { ITypeService } from '../type'
import { IUser } from './user.interface'

export interface IUserService {
  users: ObjectMap<IUser>
  user: Nullable<IUser>
  // Get Auth0Id with error checking
  auth0Id: string

  loadUsers(): Promise<void>
  appService: IAppService
  typeService: ITypeService
}
