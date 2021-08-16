import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { User } from '@codelab/shared/abstract/core'
import { UpdateElementInput } from './update-element.input'

export class UpdateElementRequest implements WithCurrentUserRequest {
  declare input: UpdateElementInput

  declare currentUser: User
}
