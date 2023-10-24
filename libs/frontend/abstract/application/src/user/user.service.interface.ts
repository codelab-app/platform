import type {
  IUser,
  IUserDomainService,
} from '@codelab/frontend/abstract/domain'
import type { Auth0IdToken } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { AxiosResponse } from 'axios'
import type { ObjectMap } from 'mobx-keystone'

export interface IUserService {
  user: IUser
  userDomainService: IUserDomainService

  saveUser(data: Auth0IdToken): Promise<AxiosResponse>
}
