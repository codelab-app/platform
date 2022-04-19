import { IRole } from './role.enum'

export interface IUserDTO {
  id: string
  auth0Id: string
  roles: Array<IRole>
}
