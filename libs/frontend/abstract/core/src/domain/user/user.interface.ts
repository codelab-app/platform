import type { IRole } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IApp } from '../app'
import type { IUserDTO } from './user.dto.interface'

export interface IUser extends ICacheService<IUserDTO, IUser> {
  id: string
  setId(id: string): void
  auth0Id: string
  username: string
  roles: Array<IRole>
  apps: Array<Ref<IApp>>
}

export type IAuth0Owner = Pick<IUser, 'auth0Id'>
