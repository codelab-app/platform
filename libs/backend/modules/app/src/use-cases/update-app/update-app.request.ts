import type { User } from '@codelab/shared/abstract/core'
import { UpdateAppInput } from './update-app.input'

export class UpdateAppRequest {
  declare input: UpdateAppInput

  declare currentUser: User
}
