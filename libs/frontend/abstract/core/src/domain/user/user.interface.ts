import type { IRole } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { IApp } from '../app'

export interface IUser {
  id: string
  auth0Id: string
  username: string
  roles: Array<IRole>
  apps: Array<Ref<IApp>>

  setId(id: string): void
}

export interface IOwnerSchema {
  owner: IAuth0Owner
}

export type IAuth0Owner = Pick<IUser, 'auth0Id'>
