import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { User } from '@codelab/shared/abstract/core'
import { MoveElementInput } from './move-element.input'

export class MoveElementRequest implements WithCurrentUserRequest {
  declare input: MoveElementInput

  declare currentUser: User
}
