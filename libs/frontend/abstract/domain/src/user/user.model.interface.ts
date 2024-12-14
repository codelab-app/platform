import type { IRole, IUserDto } from '@codelab/shared/abstract/core'

import type { IModel } from '../shared'

export interface IUserModel extends IModel<IUserDto, IUserModel> {
  auth0Id: string
  email: string
  id: string
  roles: Array<IRole>
  username: string
  setId(id: string): void
}
