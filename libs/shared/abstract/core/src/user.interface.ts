import type { IEntity } from '@codelab/shared/abstract/types'
import type { IRole } from './role.enum'

export interface IUserDTO {
  apps?: Array<IEntity>
  auth0Id: string
  email: string
  id: string
  roles: Array<IRole>
  username: string
}

export interface IOwner {
  owner: IAuth0Owner
}

export type IAuth0Owner = Pick<IUserDTO, 'auth0Id'>
