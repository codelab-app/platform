import { User } from '@codelab/modules/user'

export class UpdateAppRequest {
  declare title?: string

  declare id: string

  declare user: User
}
