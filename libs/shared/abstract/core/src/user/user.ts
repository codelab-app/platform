import { Role } from './role.enum'

export interface User {
  id: string
  roles: Array<Role>
}
