import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { User } from '@codelab/shared/abstract/core'
import { DeleteElementInput } from './delete-element.input'

export class DeleteElementRequest implements WithCurrentUserRequest {
  declare input: DeleteElementInput

  declare currentUser: User
}
