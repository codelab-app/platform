import type {
  IUserDomainService,
  IUserModel,
  IUserPreferenceModel,
} from '@codelab/frontend/abstract/domain'
import type { Auth0IdToken } from '@codelab/shared/abstract/core'
import type { AxiosResponse } from 'axios'

export interface IUserService {
  preferences: IUserPreferenceModel
  user: IUserModel
  userDomainService: IUserDomainService

  saveUser(data: Auth0IdToken): Promise<AxiosResponse>
}
