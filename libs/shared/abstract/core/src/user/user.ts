import { Role } from './role.enum'

export interface User {
  // Dgraph uid
  id: string
  auth0Id: string
  roles: Array<Role>
}
