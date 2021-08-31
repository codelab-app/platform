import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import type { User } from '@codelab/shared/abstract/core'
import { DeleteUserInput } from './delete-user.input'

export class DeleteUserRequest implements WithCurrentUserRequest {
  declare input: DeleteUserInput

  declare currentUser: User
}
