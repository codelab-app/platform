import type {
  IUser,
  IUserDomainService,
} from '@codelab/frontend/abstract/domain'
import type { Auth0IdToken } from '@codelab/shared/abstract/core'
import type { AxiosResponse } from 'axios'

export interface IUserService {
  user: IUser
  userDomainService: IUserDomainService

  saveUser(data: Auth0IdToken): Promise<AxiosResponse>
}
