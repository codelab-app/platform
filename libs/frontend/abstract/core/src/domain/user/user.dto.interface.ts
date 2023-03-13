import type { IRole } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'

export interface IUserDTO {
  apps?: Array<IEntity>
  auth0Id: string
  email: string
  id: string
  roles: Array<IRole>
  username: string
}
