import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { User } from '@codelab/shared/abstract/core'
import { UpdateUserInput } from './update-user.input'

export class UpdateUserRequest implements WithCurrentUserRequest {
  declare input: UpdateUserInput

  declare currentUser: User
}
