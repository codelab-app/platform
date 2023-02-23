import type { IRole } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IApp } from '../app'
import type { IUserDTO } from './user.dto.interface'

export interface IUser extends ICacheService<IUserDTO, IUser> {
  // Mobx class requires an id, so we'll use the auth0Id here
  id: string
  setId(id: string): void
  auth0Id: string
  username: string
  roles: Array<IRole>
  apps: Array<Ref<IApp>>
}

// export type IUserRef = string

export type IAuth0Id = string
