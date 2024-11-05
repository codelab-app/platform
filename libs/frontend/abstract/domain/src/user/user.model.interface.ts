import type { IRole, IUser, IUserDto } from '@codelab/shared/abstract/core'

import type { IAppModel } from '../app'
import type { IModel } from '../shared'

export interface IUserModel extends IModel<IUser, IUserModel> {
  auth0Id: string
  email: string
  username: string
  roles: Array<IRole>
  id: string
  setId(id: string): void
}
