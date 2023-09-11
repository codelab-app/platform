import type { IUserDTO } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { AxiosResponse } from 'axios'
import type { ObjectMap } from 'mobx-keystone'
import type { IUser } from './user.interface'

export interface IUserService {
  auth0Id: string
  user: IUser
  users: ObjectMap<IUser>
  usersList: Array<IUser>

  saveUser(data: Pick<IUserDTO, 'auth0Id'>): Promise<AxiosResponse>
  setUser(user: Nullable<IUser>): void
}
