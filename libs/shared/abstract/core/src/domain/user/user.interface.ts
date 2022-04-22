import { IRole } from './role.enum'

export interface IUser {
  id: string
  auth0Id: string
  roles: Array<IRole>
}
