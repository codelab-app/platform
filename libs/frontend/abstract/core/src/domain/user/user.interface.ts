import type { IRole } from '@codelab/shared/abstract/core'
// import type { Ref } from 'mobx-keystone'
// import type { IApp } from '../app'

export interface IUser {
  // apps: Array<Ref<IApp>>
  auth0Id: string
  id: string
  roles: Array<IRole>
  username: string

  setId(id: string): void
}

export interface IOwnerSchema {
  owner: IAuth0Owner
}

export type IAuth0Owner = Pick<IUser, 'auth0Id'>
