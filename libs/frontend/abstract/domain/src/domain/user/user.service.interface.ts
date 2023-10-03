import type { IUser } from '@codelab/frontend/abstract/domain'
import type { Auth0IdToken } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { AxiosResponse } from 'axios'
import type { ObjectMap } from 'mobx-keystone'

export interface IUserService {
  auth0Id: string
  user: IUser
  users: ObjectMap<IUser>
  usersList: Array<IUser>

  saveUser(data: Auth0IdToken): Promise<AxiosResponse>
  setUser(user: Nullable<IUser>): void
}
