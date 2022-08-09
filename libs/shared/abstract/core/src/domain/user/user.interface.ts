import { Nullable } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import { IApp } from '../app'
import { IRole } from './role.enum'

export interface IUser {
  // Mobx class requires an id, so we'll use the auth0Id here
  id: string
  auth0Id: string
  username: string
  roles: Array<IRole>
  apps: Array<Ref<IApp>>
  curAppId: Nullable<string>
  curPageId: Nullable<string>
  setCurAppId(appId: string): void
  setCurPageId(pageId: string): void
  // apps: ObjectMap<IApp>
}

// export type IUserRef = string

export type IAuth0Id = string
