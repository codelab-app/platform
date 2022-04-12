import { Role } from './role.enum'

export interface IUser {
  id: string
  auth0Id: string
  roles: Array<Role>
}
