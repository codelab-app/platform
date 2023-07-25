import type { IEntity } from '@codelab/shared/abstract/types'
import { IsString } from 'class-validator'
import type { IRole } from './role.enum'

/**
 * Create User
 */
export class IUserDTO {
  apps?: Array<IEntity>

  @IsString()
  declare auth0Id: string

  @IsString()
  declare email: string

  @IsString()
  declare id: string

  declare roles: Array<IRole>

  @IsString()
  declare username: string
}

export interface IAuth0Owner {
  owner: IAuth0User
}

export type IAuth0User = Pick<IUserDTO, 'auth0Id'>
