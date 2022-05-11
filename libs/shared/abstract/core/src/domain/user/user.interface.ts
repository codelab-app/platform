import { IRole } from './role.enum'

export interface IUser {
  // Mobx class requires an id, so we'll use the auth0Id here
  id: string
  auth0Id: string
  roles: Array<IRole>
}

// export type IUserRef = string

export type IAuth0Id = string
