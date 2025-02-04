import type { IRole, IUserDto } from '@codelab/shared/abstract/core'

import type { IPreferenceModel } from '../preference'
import type { IModel } from '../shared'

export interface IUserModel extends IModel<IUserDto, IUserModel> {
  auth0Id: string
  email: string
  id: string
  preferences: IPreferenceModel
  roles: Array<IRole>
  username: string
  setId(id: string): void
}
