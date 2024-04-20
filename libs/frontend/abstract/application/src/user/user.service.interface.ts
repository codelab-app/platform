import type {
  IUserDomainService,
  IUserModel,
} from '@codelab/frontend/abstract/domain'
import type { Auth0IdToken } from '@codelab/shared/abstract/core'
import type { AxiosResponse } from 'axios'
import type { IUserPreferenceService } from './user-preference.service.interface'

export interface IUserService {
  user: IUserModel
  userDomainService: IUserDomainService
  userPreferenceService: IUserPreferenceService

  saveUser(data: Auth0IdToken): Promise<AxiosResponse>
}
