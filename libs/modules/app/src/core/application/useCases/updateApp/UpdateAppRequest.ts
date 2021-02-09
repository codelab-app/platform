import { User } from '@codelab/modules/user'

export class UpdateAppRequest {
  declare title: string

  declare appId: string

  declare user: User
}
