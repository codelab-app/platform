import type { IRole, IUserDTO } from '@codelab/shared/abstract/core'

export interface IUser extends IUserDTO {
  setId(id: string): void
}
