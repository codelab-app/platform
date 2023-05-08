import type { IRole } from '@codelab/shared/abstract/core'

export interface IUser {
  auth0Id: string
  id: string
  roles: Array<IRole>
  username: string

  setId(id: string): void
}
